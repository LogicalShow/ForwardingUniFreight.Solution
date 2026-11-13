// "Extract with AI" dialog of the Houses tab (Views/DocAi/_ExtractWithAiModal.cshtml, Controllers/DocAi/DocAiController.cs).
// Choose a PDF -> AUTO -> review the extracted bills and confirm customer references.
// States: empty | chosen | reading | done | failed.

var DocAiExtract_IntentId = null;
var DocAiExtract_Uploading = false;
var DocAiExtract_Generation = 0;
var DocAiExtract_State = "empty";
var DocAiExtract_Doc = null;            // what the server last said about the document (DocAiController.Describe)
var DocAiExtract_PollTimer = null;
var DocAiExtract_PollStarted = 0;
var DocAiExtract_PollActive = false;
var DocAiExtract_PollRequest = null;
var DocAiExtract_PollGeneration = 0;
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
    if (pDoc.state == "done" && pDoc.resultType != "bill-of-lading.v1" && pDoc.resultType != "cargo-manifest.v1")
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
    if (!DocAiExtract_PollActive || DocAiExtract_PollGeneration != DocAiExtract_Generation) {
        DocAiExtract_StopPolling();
        DocAiExtract_PollActive = true;
        DocAiExtract_PollGeneration = DocAiExtract_Generation;
        DocAiExtract_PollStarted = new Date().getTime();
    }
    DocAiExtract_SchedulePoll();
}

function DocAiExtract_PollDelay() {
    var elapsed = new Date().getTime() - DocAiExtract_PollStarted;
    return elapsed < 60000 ? 5000 : elapsed < 180000 ? 10000 : 30000;
}

function DocAiExtract_SchedulePoll() {
    if (!DocAiExtract_PollActive || document.hidden || DocAiExtract_PollRequest || DocAiExtract_PollTimer != null) return;
    DocAiExtract_PollTimer = setTimeout(function () {
        DocAiExtract_PollTimer = null;
        DocAiExtract_Poll();
    }, DocAiExtract_PollDelay());
}

function DocAiExtract_StopPolling() {
    DocAiExtract_PollActive = false;
    if (DocAiExtract_PollTimer != null) clearTimeout(DocAiExtract_PollTimer);
    DocAiExtract_PollTimer = null;
    // Keep the outstanding request until complete, even across generations.
}

function DocAiExtract_Poll() {
    if (!DocAiExtract_PollActive || DocAiExtract_PollGeneration != DocAiExtract_Generation
        || !$("#DocAiExtractModal").hasClass("in") || DocAiExtract_Doc == null || !DocAiExtract_Doc.localId) {
        DocAiExtract_StopPolling();
        return;
    }
    if (document.hidden || DocAiExtract_PollRequest) return;
    var localId = DocAiExtract_Doc.localId;
    var generation = DocAiExtract_Generation;
    var request = {};
    DocAiExtract_PollRequest = request;
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/DocAi/Status",
        timeout: 45000, // the server refresh has a 30 s budget; a broken connection must also complete
        data: { pOperationID: $("#hOperationID").val(), pLocalId: localId },
        dataType: "json",
        success: function (pDoc) { if (generation != DocAiExtract_Generation || !DocAiExtract_Doc || localId != DocAiExtract_Doc.localId) return; if (DocAiExtract_PollActive && pDoc && pDoc.localId == localId) DocAiExtract_Show(pDoc); },
        error: function () { if (generation != DocAiExtract_Generation || !DocAiExtract_Doc || localId != DocAiExtract_Doc.localId) return; /* complete schedules the retry */ },
        complete: function () {
            if (DocAiExtract_PollRequest === request) DocAiExtract_PollRequest = null;
            DocAiExtract_SchedulePoll();
        }
    });
}

function DocAiExtract_ReadingStatus() {
    if (DocAiExtract_Doc && DocAiExtract_Doc.sendState == "waiting to send") {
        if (DocAiExtract_Doc.nextSubmitAt) {
            var time = new Date(DocAiExtract_Doc.nextSubmitAt);
            return "Saved. " + (DocAiExtract_Doc.errorCode == "NETWORK" ? "DocAi isn't reachable; next attempt at " : "Waiting to send; next attempt at ")
                + (isNaN(time.getTime()) ? DocAiExtract_SingleLine(DocAiExtract_Doc.nextSubmitAt) : time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }))
                + ". You can close this dialog; your document is saved.";
        }
        return "Saved. Waiting to send your document. You can close this dialog; your document is saved.";
    }
    if (DocAiExtract_PollActive && new Date().getTime() - DocAiExtract_PollStarted >= 180000)
        return "We're still reading your document. Your result will appear here when ready.";
    // Users see progress only; how the result arrives (webhook or polling) is not shown to them.
    return DocAiExtract_LoadingMessages[DocAiExtract_LoadingStep];
}

function DocAiExtract_StartLoadingMessages() {
    DocAiExtract_StopLoadingMessages();
    DocAiExtract_LoadingStep = 0;
    var generation = DocAiExtract_Generation;
    DocAiExtract_LoadingTimer = setInterval(function () {
        if (generation != DocAiExtract_Generation) return;
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
    debugger;
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
            + "Open View Details to review each bill of lading. Low-confidence values are marked in orange.";
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
    if (typeof DocAiReview_Element == "function") return DocAiReview_Element(doc);
    return DocAiExtract_Node("div", "Review is unavailable. Close the dialog and try again.", "alert alert-danger");
}

// Adapters retain original field paths for warning and metadata ownership.
jQuery(document).on("hide.bs.modal", "#DocAiExtractModal", function () { DocAiExtract_Generation++; DocAiExtract_StopPolling(); DocAiExtract_StopLoadingMessages(); });
jQuery(document).on("visibilitychange", function () {
    if (DocAiExtract_PollTimer != null) clearTimeout(DocAiExtract_PollTimer);
    DocAiExtract_PollTimer = null;
    if (!document.hidden && DocAiExtract_PollActive) DocAiExtract_Poll();
});

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
