// "Extract with AI" dialog of the Houses tab (Views/DocAi/_ExtractWithAiModal.cshtml, Controllers/DocAi/DocAiController.cs).
// Choose a PDF -> AUTO -> a read-only manifest or bill of lading. Phase 1 only reads: Compare (against the operation's houses) comes in phase 2 and stays disabled.
// States: empty | chosen | reading | done | failed.

var DocAiExtract_IntentId = null;
var DocAiExtract_Uploading = false;
var DocAiExtract_Generation = 0;
var DocAiExtract_State = "empty";
var DocAiExtract_Doc = null;            // what the server last said about the document (DocAiController.Describe)
var DocAiExtract_PollTimer = null;
var DocAiExtract_PollUntil = 0;
var DocAiExtract_MaxBytes = 20 * 1024 * 1024;
// Loading messages shown one after another while a document is read, in the order the work happens
// (receive -> read -> recognise -> find -> extract -> check -> prepare); the last one stays until the read ends.
var DocAiExtract_LoadingMessages = [
    "Uploading your document...",
    "Reading your document...",
    "Identifying the document type...",
    "Finding Bills of Lading in your document...",
    "Extracting your bill details...",
    "Checking containers and totals...",
    "Preparing your results...",
    "This is taking longer than usual. We're still preparing your results."
];
var DocAiExtract_LoadingInterval = 5000;
var DocAiExtract_LoadingStep = 0;
var DocAiExtract_LoadingTimer = null;

function DocAiExtract_Open() {
    DocAiUsage_State();
    DocAiExtract_Generation++;
    var pOperationID = $("#hOperationID").val();
    if (pOperationID == undefined || pOperationID == "" || pOperationID == "0") {
        swal("Sorry", "Save the operation first.");
        return;
    }
    DocAiExtract_StopPolling();
    DocAiExtract_ClearFile();
    DocAiExtract_Doc = null;

    DocAiExtract_Render("empty");
    jQuery("#DocAiExtractModal").modal("show");      // jQuery, not $: like the rest of the solution, where $ can be another copy without Bootstrap

    // reopen on the operation's newest document, if it has one
    var generation = DocAiExtract_Generation;
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/DocAi/Latest",
        data: { pOperationID: pOperationID },
        dataType: "json",
        success: function (pDoc) { if (generation != DocAiExtract_Generation) return; if (pDoc && pDoc.exists) DocAiExtract_Show(pDoc); },
        error: function () { if (generation != DocAiExtract_Generation) return; /* the dialog still works for a new file */ }
    });
}

function DocAiExtract_FileChosen(pInput) {
    var file = pInput.files && pInput.files.length > 0 ? pInput.files[0] : null;
    if (file == null) return;
    DocAiExtract_IntentId = DocAiExtract_NewIntentId();
    DocAiExtract_Generation++;
    var extension = file.name.split(".").pop().toLowerCase();
    if ($.inArray(extension, ["pdf"]) < 0) {
        swal("Sorry", "Choose a PDF bill of lading or cargo manifest.");
        DocAiExtract_ClearFile();
        return;
    }
    if (file.size > DocAiExtract_MaxBytes) {
        swal("Sorry", "The file is over 20 MB.");
        DocAiExtract_ClearFile();
        return;
    }
    DocAiExtract_StopPolling();
    $("#txtDocAiFileName").val(DocAiExtract_SingleLine(file.name));
    DocAiExtract_Doc = null;

    DocAiExtract_Render("chosen");
}

function DocAiExtract_Remove() {
    DocAiExtract_Generation++;
    DocAiExtract_StopPolling();
    DocAiExtract_ClearFile();
    DocAiExtract_Doc = null;

    DocAiExtract_Render("empty");
}

function DocAiExtract_Read() {
    if (DocAiExtract_Uploading) return;
    DocAiExtract_Generation++;
    var input = document.getElementById("fileDocAi");
    if (!input.files || input.files.length == 0) {
        swal("Sorry", "Choose the file again, then click Read.");
        return;
    }
    if (!DocAiExtract_IntentId) DocAiExtract_IntentId = DocAiExtract_NewIntentId();
    var formData = new FormData();
    formData.append("clientRequestId", DocAiExtract_IntentId);
    formData.append("file", input.files[0]);
    formData.append("pOperationID", $("#hOperationID").val());

    DocAiExtract_Render("reading");
    var generation = DocAiExtract_Generation;
    DocAiExtract_Uploading = true;
    $.ajax({
        complete: function () { DocAiExtract_Uploading = false; DocAiUsage_State(); },
        type: "POST",
        url: strServerURL + "/api/DocAi/Read",
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (pDoc) { if (generation != DocAiExtract_Generation) return; DocAiExtract_Show(pDoc); },
        error: function (jqXHR) { if (generation != DocAiExtract_Generation) return; DocAiExtract_ShowError(jqXHR); }
    });
}

// One answer of the server: draw it, and keep polling while the document is being read.
function DocAiExtract_Show(pDoc) {
    if (pDoc.state == "done" && pDoc.resultType != "bill-of-lading.v1" && pDoc.resultType != "cargo-manifest.v1" && pDoc.resultType != "bill-of-lading-list.v1")
        pDoc = { state: "failed", localId: pDoc.localId, fileName: pDoc.fileName };
    if (pDoc.errorCode == "QUOTA_EXHAUSTED") DocAiExtract_IntentId = null; // next Read is a new submission after renewal
    DocAiExtract_Doc = pDoc;
    if (pDoc.fileName && $("#txtDocAiFileName").val() == "") $("#txtDocAiFileName").val(DocAiExtract_SingleLine(pDoc.fileName));
    if (pDoc.state == "done") {
        DocAiExtract_StopPolling();
        DocAiUsage_State();
        DocAiExtract_Render("done");
    }
    else if (pDoc.state == "failed") {
        DocAiExtract_StopPolling();
        DocAiUsage_State();
        DocAiExtract_Render("failed");
    }
    else {
        DocAiExtract_Render("reading");
        DocAiExtract_StartPolling();
    }
}

function DocAiExtract_ShowError(jqXHR) {
    var message = null;
    try { message = JSON.parse(jqXHR.responseText).message; } catch (e) { }
    DocAiExtract_Doc = { state: "failed", errorMessage: message };
    DocAiExtract_StopPolling();
    DocAiExtract_Render("failed");
}

function DocAiExtract_StartPolling() {
    if (DocAiExtract_PollTimer != null) return;
    DocAiExtract_PollUntil = new Date().getTime() + 3 * 60 * 1000;    // 3 minutes, then the user comes back later
    DocAiExtract_PollTimer = setInterval(DocAiExtract_Poll, 2500);
}

function DocAiExtract_StopPolling() {
    if (DocAiExtract_PollTimer != null) clearInterval(DocAiExtract_PollTimer);
    DocAiExtract_PollTimer = null;
}

function DocAiExtract_Poll() {
    if (!$("#DocAiExtractModal").hasClass("in") || DocAiExtract_Doc == null || !DocAiExtract_Doc.localId) {
        DocAiExtract_StopPolling();
        return;
    }
    if (new Date().getTime() > DocAiExtract_PollUntil) {
        DocAiExtract_StopPolling();
        DocAiExtract_StopLoadingMessages();
        $("#pDocAiStatus").attr("class", "m-t-sm m-b-sm text-muted")
            .text("Still reading. Close the dialog and open it again in a few minutes.");
        return;
    }
    var localId = DocAiExtract_Doc.localId;
    var generation = DocAiExtract_Generation;
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/DocAi/Status",
        data: { pOperationID: $("#hOperationID").val(), pLocalId: localId },
        dataType: "json",
        success: function (pDoc) { if (generation != DocAiExtract_Generation || !DocAiExtract_Doc || localId != DocAiExtract_Doc.localId) return; if (DocAiExtract_PollTimer != null) DocAiExtract_Show(pDoc); },
        error: function () { if (generation != DocAiExtract_Generation || !DocAiExtract_Doc || localId != DocAiExtract_Doc.localId) return; /* try again on the next tick */ }
    });
}

function DocAiExtract_ReadingStatus() {
    return DocAiExtract_LoadingMessages[DocAiExtract_LoadingStep]
        + (DocAiExtract_Doc && DocAiExtract_Doc.remotePolling === false ? " Waiting for the webhook (polling is off)." : "");
}

function DocAiExtract_StartLoadingMessages() {
    DocAiExtract_StopLoadingMessages();
    DocAiExtract_LoadingStep = 0;
    DocAiExtract_LoadingTimer = setInterval(function () {
        if (DocAiExtract_State != "reading" || DocAiExtract_LoadingStep >= DocAiExtract_LoadingMessages.length - 1) {
            DocAiExtract_StopLoadingMessages();
            return;
        }
        DocAiExtract_LoadingStep++;
        DocAiExtract_ShowReadingStatus();
        if (DocAiExtract_LoadingStep >= DocAiExtract_LoadingMessages.length - 1) DocAiExtract_StopLoadingMessages();
    }, DocAiExtract_LoadingInterval);
}

// The current loading message, centered in the dialog with a spinner (the same icon as the Reading... button).
function DocAiExtract_ShowReadingStatus() {
    var status = document.getElementById("pDocAiStatus");
    if (!status) return;
    status.className = "m-t m-b text-muted text-center";
    while (status.firstChild) status.removeChild(status.firstChild);
    status.appendChild(DocAiExtract_Node("i", null, "fa fa-spinner fa-spin"));
    status.appendChild(document.createTextNode(" " + DocAiExtract_ReadingStatus()));
}

function DocAiExtract_StopLoadingMessages() {
    if (DocAiExtract_LoadingTimer != null) clearInterval(DocAiExtract_LoadingTimer);
    DocAiExtract_LoadingTimer = null;
}

function DocAiExtract_NewIntentId() {
    var bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    var hex = Array.prototype.map.call(bytes, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
}

function DocAiExtract_ClearFile() {
    DocAiExtract_IntentId = null;
    $("#fileDocAi").val("");
    $("#txtDocAiFileName").val("");
}

function DocAiExtract_FailureMessage(doc) {
    var code = doc && doc.errorCode != null ? String(doc.errorCode) : "";
    switch (code) {
        case "QUOTA_EXHAUSTED": return DocAiUsage_QuotaText(doc);
        case "UNCLASSIFIED": return "This file is not a bill of lading or a cargo manifest.";
        case "TOO_MANY_PAGES":
            return "This file has too many pages for AI extraction."
                + (doc.errorMessage ? " (" + doc.errorMessage + ")" : "");
        case "FILE_TOO_LARGE": case "HTTP_413": case "413":
            return "This file is too large for AI extraction.";
        case "UNSUPPORTED_FILE_TYPE": case "HTTP_415": case "415":
            return "This file type is not supported for AI extraction.";
        case "INVALID_DOCUMENT": return "This document could not be read for AI extraction.";
        default: return "AI extraction failed. Please try again later." + (code ? " (" + code + ")" : "");
    }
}

function DocAiExtract_Render(pState) {
    var wasReading = DocAiExtract_State == "reading";
    DocAiExtract_State = pState;
    var reading = pState == "reading";
    if (reading && !wasReading) DocAiExtract_StartLoadingMessages();   // polling re-renders "reading": keep the current message
    else if (!reading) DocAiExtract_StopLoadingMessages();
    var hasFile = $("#txtDocAiFileName").val() != "";
    var chosen = document.getElementById("fileDocAi").files.length > 0;

    // The labels come from App_Resources through the button's data-label-* attributes (Views/DocAi/_ExtractWithAiModal.cshtml).
    var readButton = $("#btnDocAiRead").prop("disabled", reading || !chosen);
    readButton.empty().append($("<i></i>").addClass(reading ? "fa fa-spinner fa-spin" : "fa fa-magic"))
        .append(document.createTextNode("\u00a0" + (readButton.attr(reading ? "data-label-reading" : "data-label-read") || (reading ? "Reading..." : "Read"))));
    $("#btnDocAiRemove").toggleClass("hide", !hasFile).prop("disabled", reading);
    $("#lblDocAiChooseFile").toggleClass("disabled", reading);
    $("#fileDocAi").prop("disabled", reading);
    $("#btnDocAiCompare").prop("disabled", true);         // phase 2

    var manifest = DocAiExtract_Doc && DocAiExtract_Doc.resultType == "cargo-manifest.v1";
    var status = "", statusClass = "text-muted";
    if (pState == "chosen") status = "Ready to read.";
    else if (reading) status = DocAiExtract_ReadingStatus();
    else if (pState == "done")
        status = (DocAiExtract_Doc && DocAiExtract_Doc.completedAt ? "Read on " + DocAiExtract_Doc.completedAt + ". " : "")
            + (DocAiExtract_Doc.resultType == "bill-of-lading-list.v1" ? "Open View Details to validate each bill of lading."   // Scripts/DocAi/DocAiReview.js
               : (manifest ? "Cargo manifest: read-only. " : "Bill of lading: read-only. ") + "Low-confidence values are marked in orange.");
    else if (pState == "failed") {
        statusClass = "text-danger";
        status = DocAiExtract_FailureMessage(DocAiExtract_Doc);
    }
    DocAiUsage_Replace("docAiQuotaContact", pState == "failed" && DocAiExtract_Doc && DocAiExtract_Doc.errorCode == "QUOTA_EXHAUSTED" ? DocAiUsage_Contact(DocAiUsage_Support()) : null);
    var skippedNotice = DocAiUsage_SkippedNotice(DocAiExtract_Doc);
    if (skippedNotice) status += " " + skippedNotice.textContent;
    var notice = DocAiExtract_ModelChangedNotice(DocAiExtract_Doc);
    if (notice) status += " " + notice.textContent;
    $("#pDocAiStatus").attr("class", "m-t-sm m-b-sm " + statusClass).text(status);
    if (reading) DocAiExtract_ShowReadingStatus();
    $("#btnDocAiCompare").toggleClass("hide", !!manifest);
    var details = document.getElementById("divDocAiDetails");
    var previousManifest = details.firstChild;
    if (manifest && pState == "done" && previousManifest && previousManifest.className == "docai-manifest"
        && previousManifest.children[1] && !previousManifest.children[1].hidden)
        $("#pDocAiStatus").text(status + " Results refreshed. Returned to list.");
    while (details.firstChild) details.removeChild(details.firstChild);
    $("#DocAiExtractModal .modal-footer, #pDocAiStatus").add($("#txtDocAiFileName").closest(".row")).removeClass("hide");   // DocAiReview.js hides them on its own screens
    if (pState == "done" && DocAiExtract_Doc)
        details.appendChild(DocAiExtract_DetailsElement(DocAiExtract_Doc));
}

// Extracted values are assigned only via textContent or input.value, never parsed as HTML.
function DocAiExtract_SingleLine(value) {
    return String(value).replace(/\s*(?:\r\n|\r|\n)\s*/g, ", ");
}

function DocAiExtract_Node(tag, text, className) {
    var node = document.createElement(tag);
    if (text != null) node.textContent = String(text);
    if (className) node.className = className;
    return node;
}

// Model ids and mapping descriptions are always text nodes, including hostile service data.
function DocAiExtract_ModelChangedNotice(doc) {
    if (!doc || doc.runReason !== "ModelChanged" || (doc.changes && doc.changes.rereadSkipped == "QUOTA_EXHAUSTED")) return null;
    var changes = doc.changes || {}, reasons = [];
    function model(change, label) {
        if (change) reasons.push(label + " changed (" + (change.oldModelId == null ? "unknown" : String(change.oldModelId))
            + " \u2192 " + (change.newModelId == null ? "unknown" : String(change.newModelId)) + ")");
    }
    model(changes.classifier, "the classifier");
    model(changes.extractModel, "the extraction model");
    if (changes.mapping === true) reasons.push("the field mapping changed");
    return DocAiExtract_Node("p", "Read again because " + (reasons.length ? reasons.join("; ") : "the model changed") + ".", "text-info");
}

function DocAiExtract_DetailsElement(doc) {
    if (doc.details && doc.resultType == "bill-of-lading-list.v1" && typeof DocAiReview_Element == "function") return DocAiReview_Element(doc);
    return doc.details ? DocAiExtract_ResultElement(doc) : DocAiExtract_Node("div");
}

// Adapters retain original field paths for warning and metadata ownership.
function DocAiExtract_ManifestBillView(header, bill) {
    return { fields: bill.fields, routing: header, containers: bill.containers,
        routingTitle: "Voyage & Routing (manifest values)",
        cargo: ["description", "packages", "grossWeight", "bookingNumber", "hsCode", "packageType", "issueDate", "containerCount"],
        containerFields: ["containerNumber", "sealNumber", "containerType", "packages", "grossWeight", "description"],
        containerHeadings: ["#", "Container number", "Seal", "Type", "Packages", "Gross weight", "Description", "Warnings"] };
}
function DocAiExtract_BlView(details) {
    return { fields: details.header, routing: details.header, containers: details.containers,
        routingTitle: "Voyage & Routing",
        cargo: ["description", "hsCode", "packages", "totalGrossWeightKg", "bookingNumber"],
        containerFields: ["containerNumber", "sealNumber", "containerType", "packages", "grossWeightKg", "measurementCbm"],
        containerHeadings: ["#", "Container number", "Seal", "Type", "Packages", "Gross weight (kg)", "Measurement (CBM)", "Warnings"] };
}

function DocAiExtract_Label(name) {
    var labels = { billOfLadingNumber: "B/L number", hsCode: "HS code", totalGrossWeightKg: "Total gross weight (kg)",
        grossWeightKg: "Gross weight (kg)", measurementCbm: "Measurement (CBM)" };
    return labels[name] || String(name).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, function (c) { return c.toUpperCase(); });
}

jQuery(document).on("hide.bs.modal", "#DocAiExtractModal", function () { DocAiExtract_Generation++; DocAiExtract_StopPolling(); DocAiExtract_StopLoadingMessages(); });

// Display-only counterpart of DocAi.Domain.ManifestNumberParser. Keep decimal sums
// as digit strings so binary floating point cannot invent a linked total.
function DocAiExtract_ManifestNumber(text) {
    if (text == null || String(text).length > 256) return null;
    var m = /^\s*[A-Za-z]*\s*([0-9]+(?:[.,\s][0-9]+)*)\s*[A-Za-z]*\s*$/.exec(String(text));
    if (!m) return null;
    var token = m[1];
    if (/\s/.test(token) && !/^[0-9]{1,3}(?:\s[0-9]{3})+(?:[.,][0-9]+)?$/.test(token)) return null;
    token = token.replace(/\s/g, "");
    function groups(t, sep) { var ps = t.split(sep); return ps[0].length >= 1 && ps[0].length <= 3 && ps.slice(1).every(function (p) { return p.length == 3; }); }
    var dot = token.lastIndexOf('.'), comma = token.lastIndexOf(','), sep, parts;
    if (dot >= 0 && comma >= 0) {
        sep = dot > comma ? '.' : ','; var thousands = sep == '.' ? ',' : '.';
        parts = token.split(sep);
        if (parts.length != 2 || !groups(parts[0], thousands)) return null;
        token = parts[0].split(thousands).join('') + '.' + parts[1];
    } else if (dot >= 0 || comma >= 0) {
        sep = dot >= 0 ? '.' : ','; parts = token.split(sep);
        if (parts.length > 2 || parts[1].length == 3) {
            if (!groups(token, sep)) return null;
            token = token.split(sep).join('');
        } else token = token.replace(sep, '.');
    }
    return DocAiExtract_ManifestDecimal(token);
}
function DocAiExtract_ManifestDecimal(token) {
    var parts = token.split('.'), whole = parts[0].replace(/^0+(?=[0-9])/, ''), fraction = (parts[1] || '').replace(/0+$/, '');
    var max = '79228162514264337593543950335';
    var digits = (whole + fraction).replace(/^0+/, '') || '0';
    // Beyond exact System.Decimal precision, leave display unverified rather than round.
    if (fraction.length > 28 || digits.length > max.length || digits.length == max.length && digits > max) return null;
    return whole + (fraction ? '.' + fraction : '');
}
function DocAiExtract_ManifestAdd(a, b) {
    if (a == null || b == null) return null;
    var ap = a.split('.'), bp = b.split('.'), scale = Math.max((ap[1] || '').length, (bp[1] || '').length);
    function digits(p) { var f = p[1] || ''; while (f.length < scale) f += '0'; return p[0] + f; }
    var x = digits(ap), y = digits(bp), i = x.length - 1, j = y.length - 1, carry = 0, result = '';
    while (i >= 0 || j >= 0 || carry) { var n = (i >= 0 ? +x[i--] : 0) + (j >= 0 ? +y[j--] : 0) + carry; result = n % 10 + result; carry = Math.floor(n / 10); }
    while (result.length <= scale) result = '0' + result;
    return DocAiExtract_ManifestDecimal(scale ? result.slice(0, -scale) + '.' + result.slice(-scale) : result);
}

// Navigation and warning state live in this document's DOM closure.
function DocAiExtract_ResultElement(doc) {
    var d = doc.details, root = DocAiExtract_Node("div", null, "docai-manifest");
    var generation = DocAiExtract_Generation, localId = doc.localId;
    var list = DocAiExtract_Node("div"), detail = DocAiExtract_Node("div"), entries = [], origin = null, scroll = 0;
    var flags = {}, unmatched = [], lowPaths = {};
    (d.flags || []).forEach(function (f) {
        var path = f.path || "";
        (flags[path] || (flags[path] = [])).push(f.value);
        if (f.value == "LOW_CONFIDENCE") lowPaths[path] = true;
    });
    function collect(rows) { (rows || []).forEach(function (f) { (f.flags || []).forEach(function (r) { var rs = flags[f.path] || (flags[f.path] = []); if (rs.indexOf(r) < 0) rs.push(r); }); }); }
    collect(d.header);
    (d.containers || []).forEach(function (c) { collect(c.fields); });
    (d.billsOfLading || []).concat(d.unidentifiedBillsOfLading || []).forEach(function (b) { collect(b.fields); (b.containers || []).forEach(function (c) { collect(c.fields); }); });
    (d.unassignedContainers || []).forEach(function (c) { collect(c.fields); });
    function under(path, prefix) { return path == prefix || path.indexOf(prefix + ".") == 0 || path.indexOf(prefix + "[") == 0; }
    function reasons(prefix) {
        var found = [];
        Object.keys(flags).forEach(function (path) { if (under(path, prefix)) flags[path].forEach(function (r) { if (found.indexOf(r) < 0) found.push(r); }); });
        return found.map(function (r) { return r == "ROW_MERGED" ? "A wrapped line was merged into this B/L \u2014 check the merged values." : r; });
    }
    function field(group, name) { return (group || []).filter(function (f) { return f.name == name; })[0]; }
    function value(f) { return !f || f.value == null || String(f.value).trim() == "" ? "\u2014" : String(f.value); }
    function metadata(f) {
        if (!f) return "No extracted value.";
        var parts = [];
        if (f.rawText != null) parts.push("Original: " + f.rawText);
        if (f.confidence != null) parts.push("Confidence: " + f.confidence);
        if (f.page != null) parts.push("Page: " + f.page);
        return parts.concat(f.flags || [], flags[f.path] || []).join("; ") || "Extracted value.";
    }
    function label(name) {
        if (name == "containerCount") return "Containers (stated)";
        var host = document.getElementById && document.getElementById("divDocAiDetails");
        return host && host.getAttribute("data-label-" + name) || DocAiExtract_Label(name);
    }
    function info(parent, text) {
        var target = DocAiExtract_Node("button", "\u24d8", "btn btn-link btn-xs docai-info");
        target.type = "button"; target.title = text; target.setAttribute("aria-label", text);
        var note = DocAiExtract_Node("span", text, "docai-field-note"); note.hidden = true;
        target.setAttribute("aria-expanded", "false");
        target.onclick = function () { note.hidden = !note.hidden; target.setAttribute("aria-expanded", String(!note.hidden)); };
        parent.appendChild(target); parent.appendChild(note);
    }
    function cell(parent, f) {
        var low = f && ((f.flags || []).indexOf("LOW_CONFIDENCE") >= 0 || (flags[f.path] || []).indexOf("LOW_CONFIDENCE") >= 0);
        var td = DocAiExtract_Node("td", DocAiExtract_SingleLine(value(f)) + (low ? " \u26a0" : ""), low ? "text-warning docai-value" : "docai-value");
        td.title = value(f) + "; " + metadata(f); if (f) td.setAttribute("data-field-path", f.path);
        parent.appendChild(td); return td;
    }
    function control(parent, rows, name, prefix, nested, caption) {
        var f = field(rows, name), box = DocAiExtract_Node("div", null, nested ? "docai-field" : "col-sm-6 docai-field");
        var id = "docai-manifest-" + prefix + "-" + name;
        var lbl = DocAiExtract_Node("label", caption || label(name)); lbl.setAttribute("for", id); box.appendChild(lbl);
        info(box, metadata(f));
        var multiline = name == "description" || name == "notifyParty" || name == "shipperAddress" || name == "consigneeAddress";
        var input = DocAiExtract_Node(multiline ? "textarea" : "input", null, "form-control input-sm");
        input.id = id; input.readOnly = true; input.value = multiline ? value(f) : DocAiExtract_SingleLine(value(f)); input.title = metadata(f);
        if (f) { input.setAttribute("data-field-path", f.path); if ((f.flags || []).indexOf("LOW_CONFIDENCE") >= 0 || (flags[f.path] || []).indexOf("LOW_CONFIDENCE") >= 0) { input.className += " text-warning"; lbl.textContent += " \u26a0"; } }
        if (f && (flags[f.path] || []).indexOf("ROW_MERGED") >= 0) {
            input.className += " text-warning";
            if (lbl.textContent.indexOf("\u26a0") < 0) lbl.textContent += " \u26a0";
            info(box, "Merged from a continuation row");
        }
        box.appendChild(input); parent.appendChild(box);
        var address = name == "shipperName" ? "shipperAddress" : name == "consigneeName" ? "consigneeAddress" : null;
        if (address && value(field(rows, address)) != "\u2014") control(box, rows, address, prefix, true);
    }
    function card(parent, title, rows, names, prefix) {
        var box = DocAiExtract_Node("section", null, "panel panel-default"); box.appendChild(DocAiExtract_Node("h5", title));
        var grid = DocAiExtract_Node("div", null, "row"); names.forEach(function (n) { if (n != "placeOfDelivery" || value(field(rows, n)) != "\u2014") control(grid, rows, n, prefix); }); box.appendChild(grid); parent.appendChild(box);
    }
    function table(parent, headings) {
        var wrap = DocAiExtract_Node("div", null, "docai-table-scroll");
        var tbl = DocAiExtract_Node("table", null, "table table-hover text-sm");
        var head = DocAiExtract_Node("thead"), tr = DocAiExtract_Node("tr");
        headings.forEach(function (h) { var th = DocAiExtract_Node("th", h); th.setAttribute("scope", "col"); tr.appendChild(th); });
        head.appendChild(tr); tbl.appendChild(head); var body = DocAiExtract_Node("tbody"); tbl.appendChild(body); wrap.appendChild(tbl); parent.appendChild(wrap);
        return { body: body, wrap: wrap };
    }
    function containers(parent, groups, view) {
        view = view || DocAiExtract_ManifestBillView([], {});
        var t = table(parent, view.containerHeadings);
        (groups || []).forEach(function (c, i) {
            var tr = DocAiExtract_Node("tr", null, "docai-container"); tr.appendChild(DocAiExtract_Node("td", i + 1));
            view.containerFields.forEach(function (n) { cell(tr, field(c.fields, n)); });
            var rs = c.fields && c.fields.length ? reasons(c.fields[0].path.replace(/\.[^.]+$/, "")) : [];
            if (c.associationMethod == "position") rs.push("Linked by position in the document. Check this association.");
            var td = DocAiExtract_Node("td", rs.length ? "\u26a0" : "\u2014", "text-warning"); if (rs.length) info(td, rs.join("; ")); tr.appendChild(td); t.body.appendChild(tr);
        });
    }
    // The single readonly detail renderer for both adapters.
    function detailForm(detail, view) {
        card(detail, "Parties", view.fields, ["shipperName", "consigneeName", "notifyParty"], "bill");
        card(detail, view.routingTitle, view.routing, ["vesselName", "voyageNumber", "portOfLoading", "portOfDischarge"], "routing");
        card(detail, "Cargo Details", view.fields, view.cargo, "cargo");
        card(detail, "Freight & Terms", view.fields, ["freightTerms"], "terms");
        detail.appendChild(DocAiExtract_Node("h5", "Containers (" + (view.containers || []).length + ")")); containers(detail, view.containers, view);
    }
    if (doc.resultType == "bill-of-lading.v1") {
        var view = DocAiExtract_BlView(d);
        var strip = DocAiExtract_Node("section", null, "panel panel-default docai-detail-header");
        strip.appendChild(DocAiExtract_Node("h4", "Bill of Lading Details"));
        control(strip, view.fields, "billOfLadingNumber", "bill");
        ["issueDate", "placeOfIssue"].forEach(function (name) {
            if (value(field(view.fields, name)) != "\u2014") control(strip, view.fields, name, "issue", false, name == "issueDate" ? "Date of issue" : "Place of issue");
        });
        root.appendChild(strip);
        var summary = [];
        Object.keys(flags).forEach(function (path) { summary.push(path + ": " + flags[path].join(", ")); });
        root.appendChild(DocAiExtract_Node("p", summary.length ? summary.join("; ") : "No flags.", summary.length ? "text-warning docai-flags" : "text-muted docai-flags"));
        detailForm(root, view);
        return root;
    }
    (d.billsOfLading || []).forEach(function (b, i) { entries.push({ bill: b, path: "billsOfLading[" + i + "]", missing: false }); });
    (d.unidentifiedBillsOfLading || []).forEach(function (b, i) { entries.push({ bill: b, path: "unidentifiedBillsOfLading[" + i + "]", missing: true }); });
    function shown(n) { return n == null ? "\u2014" : n; }
    entries.forEach(function (e) { e.reasons = reasons(e.path).filter(function (r) { return r != "TOTALS_UNVERIFIED" && r != "TOTALS_MISMATCH"; });
        e.mismatch = reasons(e.path).indexOf("TOTALS_MISMATCH") >= 0;
        e.unverified = reasons(e.path).indexOf("TOTALS_UNVERIFIED") >= 0;
        e.linked = { containerCount: String((e.bill.containers || []).length) };
        ["packages", "grossWeight"].forEach(function (name) {
            var sum = "0", cs = e.bill.containers || [];
            cs.forEach(function (c) { var f = field(c.fields, name); sum = DocAiExtract_ManifestAdd(sum, DocAiExtract_ManifestNumber(f && f.value)); });
            e.linked[name] = cs.length || field(e.bill.fields, "containerCount") ? sum : null;
        });
        if (e.mismatch) e.reasons.push("Totals do not match the linked containers (containers " + e.linked.containerCount + "/" + value(field(e.bill.fields, "containerCount"))
            + ", packages " + value(field(e.bill.fields, "packages")) + " vs " + shown(e.linked.packages)
            + ", gross " + value(field(e.bill.fields, "grossWeight")) + " vs " + shown(e.linked.grossWeight) + ")"); if ((e.bill.containers || []).some(function (c) { return c.associationMethod == "position"; })) e.reasons.push("Linked by position in the document. Check this association."); });
    // Index projected field flags too, including older results without a global flag array.
    function indexFields(rows) { (rows || []).forEach(function (f) { if ((f.flags || []).indexOf("LOW_CONFIDENCE") >= 0) lowPaths[f.path] = true; }); }
    indexFields(d.header); entries.forEach(function (e) { indexFields(e.bill.fields); (e.bill.containers || []).forEach(function (c) { indexFields(c.fields); }); });
    (d.unassignedContainers || []).forEach(function (c) { indexFields(c.fields); });
    var presented = {};
    function present(rows, names) { (rows || []).forEach(function (f) { if (names.indexOf(f.name) >= 0) presented[f.path] = true; }); }
    var containerNames = ["containerNumber", "sealNumber", "containerType", "packages", "grossWeight", "description"];
    present(d.header, ["carrierName", "vesselName", "voyageNumber", "portOfLoading", "portOfDischarge", "manifestDate", "placeOfDelivery"]);
    entries.forEach(function (e) {
        presented[e.path] = true;
        present(e.bill.fields, ["billOfLadingNumber", "shipperName", "consigneeName", "shipperAddress", "consigneeAddress", "notifyParty", "description", "packages", "grossWeight", "bookingNumber", "freightTerms", "hsCode", "packageType", "issueDate", "containerCount"]);
        (e.bill.containers || []).forEach(function (c, i) { presented[e.path + ".containers[" + i + "]"] = true; present(c.fields, containerNames); });
    });
    (d.unassignedContainers || []).forEach(function (c, i) { presented["unassignedContainers[" + i + "]"] = true; present(c.fields, containerNames); });
    Object.keys(flags).forEach(function (path) { if (!presented[path]) unmatched.push(path + ": " + flags[path].join("; ")); });
    var total = (d.unassignedContainers || []).length;
    entries.forEach(function (e) { total += (e.bill.containers || []).length; });
    card(list, "Manifest summary", d.header, ["carrierName", "vesselName", "voyageNumber", "portOfLoading", "portOfDischarge", "manifestDate", "placeOfDelivery"], "header");
    var counts = DocAiExtract_Node("p", "B/Ls: " + (d.billsOfLading || []).length + " | Containers: " + total + " | Unidentified rows: " + (d.unidentifiedBillsOfLading || []).length + " | Unassigned containers: " + (d.unassignedContainers || []).length, "docai-counts"); list.appendChild(counts);
    list.appendChild(DocAiExtract_Node("p", "\u26a0 " + Object.keys(lowPaths).length + " low-confidence fields", "text-warning"));
    var bills = table(list, ["#", "B/L No.", label("shipperName"), label("consigneeName"), "Packages", "Gross weight", "Containers", "Warnings", "Action"]);
    function valid() { return generation == DocAiExtract_Generation && (!DocAiExtract_Doc || DocAiExtract_Doc === doc && localId == DocAiExtract_Doc.localId); }
    function button(parent, text, action) { var btn = DocAiExtract_Node("button", text, "btn btn-default btn-sm"); btn.type = "button"; btn.onclick = action; parent.appendChild(btn); return btn; }
    function open(index, source) {
        if (!valid() || index < 0 || index >= entries.length) return;
        if (source) { origin = source; scroll = bills.wrap.scrollTop; }
        while (detail.firstChild) detail.removeChild(detail.firstChild);
        list.hidden = true; detail.hidden = false;
        var e = entries[index], b = e.bill;
        var heading = DocAiExtract_Node("h4", e.missing ? "No B/L no." : value(field(b.fields, "billOfLadingNumber"))); heading.tabIndex = -1; detail.appendChild(heading);
        if (e.missing) detail.appendChild(DocAiExtract_Node("p", "Source row index: " + b.sourceIndex));
        if (e.reasons.length) detail.appendChild(DocAiExtract_Node("p", e.reasons.join("; "), "text-warning"));
        detailForm(detail, DocAiExtract_ManifestBillView(d.header, b));
        var totals = "Stated: " + value(field(b.fields, "containerCount")) + " containers \u00b7 " + value(field(b.fields, "packages")) + " pkgs \u00b7 " + value(field(b.fields, "grossWeight"))
            + " kg \u2014 Linked: " + e.linked.containerCount + " \u00b7 " + shown(e.linked.packages) + " \u00b7 " + shown(e.linked.grossWeight);
        detail.appendChild(DocAiExtract_Node("p", totals + (e.unverified ? " (Totals unverified)" : ""), "docai-totals " + (e.mismatch ? "text-warning" : e.unverified ? "text-info" : "text-muted")));
        button(detail, "Back to list", function () { if (!valid()) return; detail.hidden = true; list.hidden = false; bills.wrap.scrollTop = scroll; if (origin) origin.focus(); });
        button(detail, "Previous", function () { open(index - 1); }).disabled = index == 0;
        button(detail, "Next BL", function () { open(index + 1); }).disabled = index == entries.length - 1;
        var status = DocAiExtract_Node("p", "Showing BL " + (index + 1) + " of " + entries.length); status.setAttribute("aria-live", "polite"); detail.appendChild(status); heading.focus();
    }
    entries.forEach(function (e, i) {
        var tr = DocAiExtract_Node("tr", null, "docai-bill" + (e.missing ? " docai-unidentified" : "")); tr.tabIndex = 0;
        tr.appendChild(DocAiExtract_Node("td", i + 1)); var number = cell(tr, e.missing ? null : field(e.bill.fields, "billOfLadingNumber"));
        if (e.missing) number.appendChild(DocAiExtract_Node("span", "No B/L no.", "label label-warning"));
        ["shipperName", "consigneeName", "packages", "grossWeight"].forEach(function (n) { cell(tr, field(e.bill.fields, n)); });
        var stated = field(e.bill.fields, "containerCount"), count = e.linked.containerCount;
        var countMismatch = stated && DocAiExtract_ManifestNumber(stated.value) != null && DocAiExtract_ManifestNumber(stated.value) != count;
        tr.appendChild(DocAiExtract_Node("td", count + (value(stated) != "\u2014" ? " / " + value(stated) : ""), countMismatch ? "text-warning" : ""));
        var warning = DocAiExtract_Node("td", e.reasons.length ? "\u26a0" : "\u2014", "text-warning"); if (e.reasons.length) info(warning, e.reasons.join("; ")); tr.appendChild(warning);
        var action = DocAiExtract_Node("td"); var view = button(action, "View", function () { open(i, view); }); tr.appendChild(action);
        tr.ondblclick = function () { open(i, view); };
        tr.onkeydown = function (event) { if (event.target === tr && (event.key == "Enter" || event.keyCode == 13)) { event.preventDefault(); open(i, view); } };
        bills.body.appendChild(tr);
    });
    list.appendChild(DocAiExtract_Node("h5", "Unassigned containers (" + (d.unassignedContainers || []).length + "): Not assigned to a B/L")); containers(list, d.unassignedContainers);
    if (unmatched.length) { var notes = DocAiExtract_Node("details"); notes.appendChild(DocAiExtract_Node("summary", "Review notes")); unmatched.forEach(function (n) { notes.appendChild(DocAiExtract_Node("p", n, "text-warning")); }); list.appendChild(notes); }
    detail.hidden = true; root.appendChild(list); root.appendChild(detail); return root;
}


// New usage strings live together so a localized dictionary can replace them later.
var DocAiUsage_Text = {
    unavailable: "Usage is currently unavailable. Try again later.", loading: "Loading usage...",
    asOf: "Updated {0}", unlimited: "Unlimited plan",
    pagesRemaining: "pages remaining", granted: "of {0} granted", used: "Used", reserved: "Reserved", remaining: "Remaining",
    submittedTitle: "Submitted today", submittedOf: "of {0} pages", dailyReset: "Daily limit resets at midnight UTC",
    topUpTitle: "Last top-up", topUpPages: "{0} pages", noTopUp: "No top-up yet",
    unlimitedTotals: "Used: {0} pages / This month: {1} pages / Today: {2} pages (UTC day)",
    low: "Your AI page balance is almost finished: {0} pages left (warning at {1}). Contact {2} to renew.",
    exhausted: "Your AI page balance is exhausted. Contact {0} to renew or add pages.",
    toolbarExhausted: "AI page balance is exhausted. Contact {0} to renew.",
    toolbarLow: "AI page balance is almost finished: {0} pages left.",
    quota: "This document needs {0} pages, but only {1} are left. Contact {2} to renew.",
    quotaUnknown: "AI page balance is exhausted. Contact {0} to renew.",
    skipped: "Showing the previous result: the page balance is not enough to re-read it with the updated model.",
    months: "Monthly usage", monthColumns: ["Month", "Documents", "Pages"],
    recent: "Recent documents", recentColumns: ["File", "Pages", "User", "Date", "Status"],
    recentUnavailable: "Recent documents are currently unavailable.", empty: "No documents yet.",
    previousTitle: "Read the B/L data from a document"
};
function DocAiUsage_Format(key, values) {
    return DocAiUsage_Text[key].replace(/\{(\d+)\}/g, function (_, i) { return String(values[i] == null ? "?" : values[i]); });
}
function DocAiUsage_Support() {
    var modal = document.getElementById("DocAiUsageModal");
    function attr(key) { return modal ? modal.getAttribute("data-support-" + key) : null; }
    return { name: attr("name") || "IST", email: attr("email"), phone: attr("phone"), url: attr("url") };
}
function DocAiUsage_Link(value) {
    return typeof value == "string" && /^(https:\/\/|mailto:|tel:)/i.test(value.trim()) ? value.trim() : null;
}
// The message already names the support team; the block only adds working contact links (none: no block).
function DocAiUsage_Contact(support) {
    var root = DocAiExtract_Node("div", support.name || "IST", "docai-support"), links = 0;
    [[support.email, "mailto:"], [support.phone, "tel:"], [support.url, ""]].forEach(function (pair) {
        if (!pair[0]) return;
        var href = DocAiUsage_Link(pair[1] + pair[0]);
        if (!href) return;
        root.appendChild(DocAiExtract_Node("br"));
        var a = DocAiExtract_Node("a", pair[0]); a.setAttribute("href", href); root.appendChild(a); links++;
    });
    return links ? root : null;
}
function DocAiUsage_Banner(usage, support) {
    if (!usage || usage.quotaMode == "Unlimited" || usage.available === false || (usage.status != "Low" && usage.status != "Exhausted")) return null;
    var low = usage.status == "Low";
    var root = DocAiExtract_Node("div", DocAiUsage_Format(low ? "low" : "exhausted",
        low ? [usage.remaining, usage.warningAtPages, support.name] : [support.name]), "alert " + (low ? "alert-warning" : "alert-danger"));
    var contact = DocAiUsage_Contact(support); if (contact) root.appendChild(contact); return root;
}
function DocAiUsage_Replace(id, node) {
    var target = document.getElementById(id);
    if (!target) return;
    while (target.firstChild) target.removeChild(target.firstChild);
    if (node) target.appendChild(node);
}
function DocAiUsage_QuotaText(doc) {
    var q = doc.quota, support = DocAiUsage_Support();
    return q ? DocAiUsage_Format("quota", [q.requiredPages, q.availablePages, support.name]) : DocAiUsage_Format("quotaUnknown", [support.name]);
}
// Like ModelChanged: only C10's explicit submission binding carries this metadata.
function DocAiUsage_SkippedNotice(doc) {
    return doc && doc.changes && doc.changes.rereadSkipped == "QUOTA_EXHAUSTED"
        ? DocAiExtract_Node("p", DocAiUsage_Text.skipped, "text-info") : null;
}
function DocAiUsage_Toolbar(usage) {
    var exhausted = !!usage && usage.available === true && usage.status == "Exhausted";
    var low = !!usage && usage.available === true && usage.status == "Low";
    var note = exhausted ? DocAiUsage_Format("toolbarExhausted", [DocAiUsage_Support().name])
        : low ? DocAiUsage_Format("toolbarLow", [usage.remaining]) : "";
    $("#btnDocAiExtract").prop("disabled", exhausted).attr("title", exhausted ? note : ($("#btnDocAiExtract").attr("data-default-title") || DocAiUsage_Text.previousTitle));
    $("#docAiUsageNote").attr("class", exhausted ? "text-danger" : "text-warning").text(note);
    DocAiUsage_Replace("docAiExtractUsageBanner", DocAiUsage_Banner(usage, DocAiUsage_Support()));
}
var DocAiUsage_StateGeneration = 0;
function DocAiUsage_State() {
    if (!document.getElementById("btnDocAiUsage")) return;
    var generation = ++DocAiUsage_StateGeneration;
    $.ajax({ type: "GET", url: strServerURL + "/api/DocAi/UsageState", dataType: "json", cache: false,
        success: function (usage) { if (generation == DocAiUsage_StateGeneration) DocAiUsage_Toolbar(usage); },
        error: function () { if (generation == DocAiUsage_StateGeneration) DocAiUsage_Toolbar(null); } });
}
var DocAiUsage_MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function DocAiUsage_Number(value) {
    var n = Number(value); return value == null || isNaN(n) ? "?" : n.toLocaleString("en-US");
}
// pPart: "date" (Oct 1, 2026), "time" (3:00 PM) or nothing (Nov 8, 2026, 4:19 PM).
function DocAiUsage_Date(value, pPart) {
    var date = new Date(value); if (isNaN(date.getTime())) return "?";
    var dateText = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    var timeText = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return pPart == "date" ? dateText : pPart == "time" ? timeText : dateText + ", " + timeText;
}
// "2026-11" -> "November 2026"; "2026-11-03 10:15" -> "Nov 3, 2026 \u00b7 10:15"; anything else is shown as sent.
function DocAiUsage_MonthName(value) {
    var m = /^(\d{4})-(\d{2})$/.exec(value || ""); return m ? DocAiUsage_MonthNames[Number(m[2]) - 1] + " " + m[1] : value;
}
function DocAiUsage_DocDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}:\d{2})/.exec(value || "");
    return m ? DocAiUsage_MonthNames[Number(m[2]) - 1].slice(0, 3) + " " + Number(m[3]) + ", " + m[1] + " \u00b7 " + m[4] : value;
}
// Cells are text, or a DOM node (status label).
function DocAiUsage_Table(headings, rows) {
    var wrapper = DocAiExtract_Node("div", null, "table-responsive docai-usage-table"), table = DocAiExtract_Node("table", null, "table table-striped b-t b-light text-sm table-hover");
    var head = DocAiExtract_Node("thead"), tr = DocAiExtract_Node("tr"), body = DocAiExtract_Node("tbody");
    headings.forEach(function (h) { tr.appendChild(DocAiExtract_Node("th", h, "text-sm")); }); head.appendChild(tr); table.appendChild(head);
    rows.forEach(function (row) {
        var r = DocAiExtract_Node("tr");
        row.forEach(function (value) {
            var td = DocAiExtract_Node("td");
            if (value && value.nodeType) td.appendChild(value); else td.textContent = value == null ? "?" : String(value);
            r.appendChild(td);
        });
        body.appendChild(r);
    });
    table.appendChild(body); wrapper.appendChild(table); return wrapper;
}
function DocAiUsage_StatusLabel(status) {
    var kind = /complete|done|success/i.test(status) ? "success" : /fail|error/i.test(status) ? "danger" : "default";
    return DocAiExtract_Node("span", status == null ? "?" : status, "label label-" + kind);
}
// parts: [value, extra progress-bar class, label]; the theme's grey bar background stands for what is left.
function DocAiUsage_Bar(className, parts, total) {
    var bar = DocAiExtract_Node("div", null, className);
    parts.forEach(function (p) {
        var n = Math.max(0, Number(p[0]) || 0), seg = DocAiExtract_Node("div", null, p[1] ? "progress-bar " + p[1] : "progress-bar");
        seg.style.width = (total ? Math.min(100, n / total * 100) : 0) + "%";
        seg.setAttribute("role", "progressbar"); seg.setAttribute("aria-valuenow", n); seg.setAttribute("aria-valuemin", 0); seg.setAttribute("aria-valuemax", total);
        if (p[2]) seg.setAttribute("aria-label", p[2]);
        bar.appendChild(seg);
    });
    return bar;
}
function DocAiUsage_Card(title, valueNodes, extraNodes) {
    var col = DocAiExtract_Node("div", null, "col-sm-6 m-b-sm"), card = DocAiExtract_Node("div", null, "docai-usage-card");
    card.appendChild(DocAiExtract_Node("div", title, "text-muted"));
    var value = DocAiExtract_Node("div", null, "m-t-sm");
    valueNodes.forEach(function (n) { value.appendChild(n); }); card.appendChild(value);
    extraNodes.forEach(function (n) { card.appendChild(n); });
    col.appendChild(card); return col;
}
function DocAiUsage_Element(u) {
    var root = DocAiExtract_Node("div");
    if (!u || u.available !== true) { root.appendChild(DocAiExtract_Node("p", DocAiUsage_Text.unavailable, "text-muted")); return root; }
    var banner = DocAiUsage_Banner(u, u.support || DocAiUsage_Support());
    if (banner) root.appendChild(banner);
    var months = u.months || [];
    if (u.quotaMode == "Unlimited") {
        root.appendChild(DocAiExtract_Node("h3", DocAiUsage_Text.unlimited, "font-bold"));
        var currentMonth = String(u.asOfUtc).slice(0, 7), thisMonth = 0;
        months.forEach(function (m) { if (m.month == currentMonth) thisMonth = m.chargedPages; });
        root.appendChild(DocAiExtract_Node("p", DocAiUsage_Format("unlimitedTotals", [u.used, thisMonth, u.chargedTodayPages])));
    } else {
        // Balance: "680 pages remaining ... of 1,000 granted", bar, legend
        var headline = DocAiExtract_Node("div", null, "clearfix");
        headline.appendChild(DocAiExtract_Node("span", DocAiUsage_Format("granted", [DocAiUsage_Number(u.granted)]), "pull-right text-muted m-t"));
        headline.appendChild(DocAiExtract_Node("span", DocAiUsage_Number(u.remaining), "docai-usage-big"));
        headline.appendChild(DocAiExtract_Node("span", DocAiUsage_Text.pagesRemaining, "text-muted"));
        root.appendChild(headline);
        var bars = { used: "", reserved: "progress-bar-warning" };   // the theme's own progress-bar colours
        root.appendChild(DocAiUsage_Bar("progress", [[u.used, bars.used, DocAiUsage_Text.used], [u.reserved, bars.reserved, DocAiUsage_Text.reserved]], Math.max(0, Number(u.granted) || 0)));
        var legend = DocAiExtract_Node("div", null, "text-sm");
        ["used", "reserved", "remaining"].forEach(function (key, i) {
            var entry = DocAiExtract_Node("span", null, i ? "m-l" : null), dot = DocAiExtract_Node("span", null, "docai-usage-dot");
            dot.className += " docai-usage-dot-" + key; entry.appendChild(dot);
            entry.appendChild(document.createTextNode(DocAiUsage_Text[key] + " "));
            entry.appendChild(DocAiExtract_Node("b", DocAiUsage_Number(u[key])));
            legend.appendChild(entry);
        });
        root.appendChild(legend);
        // Cards: Submitted today / Last top-up
        var cards = DocAiExtract_Node("div", null, "row m-t");
        cards.appendChild(DocAiUsage_Card(DocAiUsage_Text.submittedTitle,
            [DocAiExtract_Node("span", DocAiUsage_Number(u.submittedTodayPages), "h4 font-bold"),
             DocAiExtract_Node("span", " " + DocAiUsage_Format("submittedOf", [DocAiUsage_Number(u.dailyCap)]), "text-muted")],
            [DocAiUsage_Bar("progress docai-usage-thin", [[u.submittedTodayPages, bars.used]], Math.max(0, Number(u.dailyCap) || 0)),
             DocAiExtract_Node("div", DocAiUsage_Text.dailyReset, "text-muted")]));
        cards.appendChild(DocAiUsage_Card(DocAiUsage_Text.topUpTitle,
            u.lastTopUp ? [DocAiExtract_Node("span", DocAiUsage_Format("topUpPages", [DocAiUsage_Number(u.lastTopUp.pages)]), "h4 font-bold text-success")]
                        : [DocAiExtract_Node("span", DocAiUsage_Text.noTopUp, "text-muted")],
            u.lastTopUp ? [DocAiExtract_Node("div", DocAiUsage_Date(u.lastTopUp.recordedAtUtc, "date") + " \u00b7 " + DocAiUsage_Date(u.lastTopUp.recordedAtUtc, "time"), "text-muted m-t-sm")] : []));
        root.appendChild(cards);
    }
    root.appendChild(DocAiExtract_Node("hr"));
    root.appendChild(DocAiExtract_Node("h4", DocAiUsage_Text.months, "font-bold"));
    root.appendChild(DocAiUsage_Table(DocAiUsage_Text.monthColumns, months.map(function (m) { return [DocAiUsage_MonthName(m.month), DocAiUsage_Number(m.chargedDocuments), DocAiUsage_Number(m.chargedPages)]; })));
    root.appendChild(DocAiExtract_Node("h4", DocAiUsage_Text.recent, "font-bold m-t-lg"));
    if (!u.recentDocuments) root.appendChild(DocAiExtract_Node("p", DocAiUsage_Text.recentUnavailable));
    else if (!u.recentDocuments.length) root.appendChild(DocAiExtract_Node("p", DocAiUsage_Text.empty));
    else root.appendChild(DocAiUsage_Table(DocAiUsage_Text.recentColumns, u.recentDocuments.map(function (d) { return [d.fileName, d.pages, d.user, DocAiUsage_DocDate(d.createdAt), DocAiUsage_StatusLabel(d.status)]; })));
    return root;
}
var DocAiUsage_RefreshGeneration = 0;
function DocAiUsage_Open() {
    // Title and Refresh come from App_Resources in Views/DocAi/_AiUsageModal.cshtml.
    jQuery("#DocAiUsageModal").modal("show"); DocAiUsage_Refresh();
}
function DocAiUsage_Refresh() {
    var generation = ++DocAiUsage_RefreshGeneration;
    DocAiUsage_Replace("docAiUsageBody", DocAiExtract_Node("p", DocAiUsage_Text.loading));
    $("#docAiUsageAsOf").text("");
    $.ajax({ type: "GET", url: strServerURL + "/api/DocAi/Usage", dataType: "json", cache: false,
        success: function (usage) {
            if (generation != DocAiUsage_RefreshGeneration) return;
            DocAiUsage_Replace("docAiUsageBody", DocAiUsage_Element(usage));
            $("#docAiUsageAsOf").text(usage.available ? DocAiUsage_Format("asOf", [DocAiUsage_Date(usage.asOfUtc)]) : "");
        }, error: function () { if (generation == DocAiUsage_RefreshGeneration) DocAiUsage_Replace("docAiUsageBody", DocAiUsage_Element(null)); } });
}
jQuery(document).on("hidden.bs.modal", "#DocAiUsageModal", function () { DocAiUsage_State(); });
jQuery(document).on("click", "#stepsShipments", function () { DocAiUsage_State(); });
if (document.getElementById && document.getElementById("btnDocAiUsage")) DocAiUsage_State();
