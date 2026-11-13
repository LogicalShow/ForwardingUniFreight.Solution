// Server-backed review screens. Server text is rendered only through DocAiExtract_Node/textContent.
var DocAiReview_Steps = [
    { key: "customer", title: "Customer", short: "Customer", noun: "customer", plural: "customers" }
    // Agent and Vessel steps removed for now. To restore, add back:
    // { key: "agent", title: "Agent", short: "Agent", noun: "agent", plural: "agents", source: null },
    // { key: "vessel", title: "Vessel", short: "Vessel", noun: "vessel", plural: "vessels", source: "vesselName" }
];
var DocAiReview_LowConfidence = 0.8;    // values read with a confidence below this get the "Low confidence" badge


function DocAiReview_Element(doc) {
    var root = DocAiExtract_Node("div", null, "docai-review");
    var data = doc.details || {}, bills = [];
    var state = { choices: {} }, busy = false, screen = 0;
    var generation = DocAiExtract_Generation;
    var node = DocAiExtract_Node;

    function valid() { return generation == DocAiExtract_Generation; }
    function clear() { screen++; while (root.firstChild) root.removeChild(root.firstChild); }
    function disabled(on) {
        busy = on;
        Array.prototype.forEach.call(root.getElementsByTagName("button"), function (b) { if (on) { b.reviewWasDisabled = b.disabled; b.disabled = true; } else b.disabled = !!b.reviewWasDisabled; });
    }
    function error(e, starting) {
        if (starting) { clear(); dialogFooter(true); }
        var alert = node("div", null, "alert alert-danger");
        alert.appendChild(node("div", e.Message || "Review is unavailable. Try again."));
        (e.ValidationErrors || []).forEach(function (v) { alert.appendChild(node("div", v.Message)); });
        root.insertBefore(alert, root.firstChild);
        if (!starting && ["BILL_REVIEW_VERSION_CHANGED", "MASTER_CONTEXT_CHANGED", "REFERENCES_ALREADY_CONFIRMED"].indexOf(e.Code) >= 0)
            loadList([e.Message].concat((e.ValidationErrors || []).map(function (v) { return v.Message; })).join(" "), true);
    }
    function request(action, body, done, starting, failure) {
        if (!valid() || busy) return;
        var view = screen;
        disabled(true);
        return jQuery.ajax({ url: strServerURL + "/api/DocumentReview/" + action,
            type: body == null ? "GET" : "POST", contentType: "application/json; charset=utf-8", dataType: "json", timeout: 30000,
            data: body == null ? undefined : JSON.stringify(body),
            success: function (response) {
                if (!valid() || view != screen) return;
                disabled(false);
                if (response && response.Error) { error(response.Error, starting); if (failure) failure(); }
                else if (response && response.Data != null) done(response.Data);
                else { error({}, starting); if (failure) failure(); }
            },
            error: function (xhr) {
                if (!valid() || view != screen) return;
                disabled(false); error((xhr.responseJSON || {}).Error || {}, starting); if (failure) failure();
            }
        });
    }
    function name(option) { return option ? option.Name || option.LocalName || String(option.Id) : "\u2014"; }
    function loadList(notice, danger) {
        request("CreateDocumentReview", { AIDocumentExtractionID: doc.localId }, function (summary) {
            state.choices = {};
            bills = (summary.BillReviews || []).map(function (b) {
                return { id: b.BillReviewId, billIndex: b.BillIndex, version: b.Version, status: b.ReviewStatus,
                    blNumber: b.BillOfLadingNumber, shipperName: b.ShipperName, consigneeName: b.ConsigneeName,
                    pol: b.PortOfLoading, pod: b.PortOfDischarge, containerCount: b.ContainerCount };
            });
            list(notice, danger);
        }, true);
    }
    function fields(rows, mapping) {
        var result = {};
        (rows || []).forEach(function (f) { result[mapping[f.name] || f.name] = { confidence: f.confidence, page: f.page }; });
        return result;
    }
    function mapBill(detail, summary) {
        var b = detail.Bill, aliases = { billOfLadingNumber: "blNumber", issueDate: "issueDate", totalGrossWeightKg: "grossWeight", grossWeight: "grossWeight" };
        var source = doc.resultType == "cargo-manifest.v1"
            ? (data.billsOfLading || []).concat(data.unidentifiedBillsOfLading || [])[summary.billIndex] || {}
            : { fields: data.header, containers: data.containers };
        summary.version = detail.Version; summary.status = detail.ReviewStatus;
        summary.issues = detail.Issues || []; summary.readable = !!b;
        if (!b) return summary;
        var map = { blNumber: "BillOfLadingNumber", issueDate: "DateOfIssue", shipperName: "ShipperName", shipperAddress: "ShipperAddress",
            consigneeName: "ConsigneeName", consigneeAddress: "ConsigneeAddress", notifyParty: "NotifyParty", vesselName: "VesselName",
            voyageNumber: "VoyageNumber", portOfLoading: "PortOfLoading", portOfDischarge: "PortOfDischarge", bookingNumber: "BookingNumber",
            hsCode: "HSCode", freightTerms: "FreightTerms", grossWeight: "TotalGrossWeightKg" };
        Object.keys(map).forEach(function (key) { summary[key] = b[map[key]]; });
        summary.fieldInfo = fields(source.fields, aliases);
        if (doc.resultType == "cargo-manifest.v1") {
            var header = fields(data.header, aliases);
            ["vesselName", "voyageNumber", "portOfLoading", "portOfDischarge"].forEach(function (key) { summary.fieldInfo[key] = header[key]; });
        }
        summary.containers = (b.Containers || []).map(function (c, i) {
            var info = fields(((source.containers || [])[i] || {}).fields, { grossWeight: "grossWeightKg" });
            return { containerNumber: c.ContainerNo, sealNumber: c.SealNo, containerType: c.Type, packages: c.Packages,
                grossWeightKg: c.GrossWeightKg, measurementCbm: c.MeasurementCbm, fieldInfo: info };
        });
        var packages = summary.containers.map(function (c) { return c.packages; });
        summary.packages = packages.length && packages.every(function (v) { return v != null; })
            ? packages.reduce(function (a, v) { return a + Number(v); }, 0) : null;
        return summary;
    }
    // The review screens (list included) have their own actions: the dialog's Close / Read footer stays hidden on them.
    function dialogFooter(on) { jQuery("#DocAiExtractModal .modal-footer").toggleClass("hide", !on); }
    // The upload row and its status line belong to the list; a bill's own screens hide them.
    function uploadArea(on) { jQuery("#txtDocAiFileName").closest(".row").add("#pDocAiStatus").toggleClass("hide", !on); }
    function top() { jQuery("#DocAiExtractModal").scrollTop(0); }
    function button(parent, text, icon, className, action) {
        var btn = node("button", null, className); btn.type = "button";
        if (icon) { btn.appendChild(node("i", null, "fa " + icon)); btn.appendChild(document.createTextNode(" ")); }
        btn.appendChild(document.createTextNode(text));
        btn.onclick = function () { if (valid() && !busy && !btn.disabled) action(); };
        parent.appendChild(btn); return btn;
    }
    function panel(parent, title, extra) {
        var section = node("section", null, "panel panel-default");
        var header = node("header", null, "panel-heading font-bold");
        header.appendChild(document.createTextNode(title));
        if (extra) header.appendChild(extra);
        section.appendChild(header);
        var body = node("div", null, "panel-body"); section.appendChild(body);
        parent.appendChild(section); return body;
    }
    // Low-confidence icon (orange text-warning, like the single-bill view); the hover text gives the exact
    // confidence and the source page. info: { confidence: 0..1, page: n } from the bill's / container's fieldInfo.
    function lowMark(info) {
        if (!info || info.confidence == null || !(Number(info.confidence) < DocAiReview_LowConfidence)) return null;
        var mark = node("span", null, "text-warning m-l-xs docai-review-low");
        mark.appendChild(node("i", null, "fa fa-exclamation-triangle"));
        mark.title = "Low confidence: " + Math.round(Number(info.confidence) * 1000) / 10 + "%" + (info.page != null ? ", page " + info.page : "");
        mark.setAttribute("aria-label", mark.title);   // icon only: the text is in the hover / screen-reader label
        return mark;
    }
    function value(parent, label, text, className, info) {
        var box = node("div", null, className || "col-sm-6"), mark = lowMark(info);
        var caption = node("div", label, "text-muted text-sm"); if (mark) caption.appendChild(mark);
        box.appendChild(caption);
        box.appendChild(node("p", text == null || String(text).trim() == "" ? "—" : text, "font-bold docai-review-value"));
        parent.appendChild(box); return box;
    }
    function footer(index, buttons) {
        var bar = node("div", null, "clearfix m-t-sm docai-review-footer");
        bar.appendChild(node("span", "Showing BL " + (index + 1) + " of " + bills.length, "pull-left text-muted text-sm m-t-xs"));
        var right = node("div", null, "pull-right"); bar.appendChild(right);
        buttons(right);
        root.appendChild(bar);
    }

    // ---- choices -------------------------------------------------------------------------------------------
    function matching(bill, step) { return (bill.matching || {})[step.key] || { mode: "notFound" }; }
    function choice(index, step) {
        var key = index + "." + step.key;
        if (!state.choices[key]) {
            var m = matching(bills[index], step);
            state.choices[key] = m.mode == "found" ? { value: m.match, how: "found" }
                : m.mode == "suggestions" && m.candidates && m.candidates.length ? { value: m.candidates[0], how: "suggested" }
                : { value: null, how: "search" };
        }
        return state.choices[key];
    }
    function howText(how) {
        return how == "found" ? "Matched automatically" : how == "suggested" ? "Closest match" : "Selected from all";
    }

    // ---- phase 1: the bills ----------------------------------------------------------------------------------
    function list(notice, danger) {
        clear(); dialogFooter(false); uploadArea(true);
        if (!bills.length) root.appendChild(node("div", "No bills to review.", "alert alert-info"));
        if (notice) root.appendChild(node("div", notice, danger ? "alert alert-danger" : "alert alert-success"));
        var wrap = node("div", null, "docai-table-scroll"), table = node("table", null, "table table-hover text-sm");
        var head = node("thead"), tr = node("tr");
        ["HBL", "Shipper", "Consignee", "POL", "POD", "Action"].forEach(function (h) { var th = node("th", h); th.setAttribute("scope", "col"); tr.appendChild(th); });
        head.appendChild(tr); table.appendChild(head);
        var body = node("tbody"); table.appendChild(body);
        bills.forEach(function (b, i) {
            var row = node("tr");
            [b.blNumber, b.shipperName, b.consigneeName, b.pol, b.pod].forEach(function (v) { row.appendChild(node("td", v == null || v === "" ? "\u2014" : v)); });
            var action = node("td");
            button(action, "View Details", "fa-eye", "btn btn-link btn-sm", function () { details(i); });
            if (b.status == "ReferencesConfirmed") action.appendChild(node("span", "Completed", "label label-success"));
            row.appendChild(action);
            row.ondblclick = function () { if (valid() && !busy) details(i); };
            body.appendChild(row);
        });
        wrap.appendChild(table); root.appendChild(wrap);
    }

    // ---- phase 2: the bill's details, read-only ----------------------------------------------------------------
    function billDetails(parent, b) {
        var info = b.fieldInfo || {};   // per field: { confidence, page }
        var strip = node("section", null, "panel panel-default"), body = node("div", null, "panel-body clearfix");
        var title = node("h4", null, "pull-left m-t-sm");
        title.appendChild(node("i", null, "fa fa-file-text-o")); title.appendChild(document.createTextNode(" Bill of Lading Details"));
        body.appendChild(title);
        var ids = node("div", null, "pull-right row docai-review-ids");
        value(ids, "BL number", b.blNumber, "col-xs-7", info.blNumber); value(ids, "Date of issue", b.issueDate, "col-xs-5", info.issueDate);
        body.appendChild(ids); strip.appendChild(body); parent.appendChild(strip);

        var row1 = node("div", null, "row"), left = node("div", null, "col-sm-6"), right = node("div", null, "col-sm-6");
        var parties = node("div", null, "row");
        value(parties, "Shipper", b.shipperName, null, info.shipperName); value(parties, "Consignee", b.consigneeName, null, info.consigneeName);
        value(parties, "Shipper address", b.shipperAddress, null, info.shipperAddress); value(parties, "Consignee address", b.consigneeAddress, null, info.consigneeAddress);
        value(parties, "Notify party", b.notifyParty, null, info.notifyParty);
        panel(left, "Parties").appendChild(parties);
        var voyage = node("div", null, "row");
        value(voyage, "Vessel name", b.vesselName, null, info.vesselName); value(voyage, "Voyage no.", b.voyageNumber, null, info.voyageNumber);
        value(voyage, "Port of loading", b.portOfLoading, null, info.portOfLoading); value(voyage, "Port of discharge", b.portOfDischarge, null, info.portOfDischarge);
        value(voyage, "Booking number", b.bookingNumber, null, info.bookingNumber);
        panel(right, "Voyage & Routing").appendChild(voyage);
        row1.appendChild(left); row1.appendChild(right); parent.appendChild(row1);

        var row2 = node("div", null, "row"), left2 = node("div", null, "col-sm-6"), right2 = node("div", null, "col-sm-6");
        var cargo = node("div", null, "row");
        value(cargo, "HS code", b.hsCode, "col-sm-4", info.hsCode); value(cargo, "Packages", b.packages, "col-sm-4", info.packages); value(cargo, "Gross weight", b.grossWeight, "col-sm-4", info.grossWeight);
        panel(left2, "Cargo Details").appendChild(cargo);
        var terms = node("div", null, "row");
        value(terms, "Freight terms", b.freightTerms, null, info.freightTerms);
        panel(right2, "Freight & Terms").appendChild(terms);
        row2.appendChild(left2); row2.appendChild(right2); parent.appendChild(row2);

        var containers = b.containers || [];
        var count = node("span", containers.length + " Containers", "badge bg-info m-l-sm");
        var cBody = panel(parent, "Containers", count);
        var wrap = node("div", null, "docai-table-scroll"), table = node("table", null, "table table-hover text-sm m-b-none");
        var head = node("thead"), tr = node("tr");
        ["#", "Container number", "Seal number", "Type", "Packages", "Gross weight (kgs)", "Measurement"].forEach(function (h) { var th = node("th", h); th.setAttribute("scope", "col"); tr.appendChild(th); });
        head.appendChild(tr); table.appendChild(head);
        var body2 = node("tbody"); table.appendChild(body2);
        containers.forEach(function (c, i) {
            var r = node("tr"); r.appendChild(node("td", i + 1));
            ["containerNumber", "sealNumber", "containerType", "packages", "grossWeightKg", "measurementCbm"].forEach(function (key) {
                var mark = lowMark((c.fieldInfo || {})[key]);
                var td = node("td", c[key] == null ? "\u2014" : c[key], key == "containerNumber" ? "font-bold" : null);
                if (mark) td.appendChild(mark);
                r.appendChild(td);
            });
            body2.appendChild(r);
        });
        wrap.appendChild(table); cBody.appendChild(wrap);
    }

    // Pager between the bills' details, built like the solution's other pagers (InitiPaging in mainapp.master.js):
    // the bootstrap-paginator plugin, size "small" -> 1 2 3 4 5 > >>.
    function pager(bar, index) {
        var jq = jQuery.fn.bootstrapPaginator ? jQuery : $;
        if (bills.length < 2 || !jq.fn.bootstrapPaginator) return;
        var wrap = node("div", null, "docai-review-pager"), div = node("div");   // the plugin resets its own element's classes
        wrap.appendChild(div);
        bar.insertBefore(wrap, bar.lastChild);   // after "Showing BL x of n", before the buttons
        jq(div).bootstrapPaginator({
            size: "small",
            currentPage: index + 1,
            totalPages: bills.length,
            onPageClicked: function (e, originalEvent, type, page) {
                if (originalEvent && originalEvent.preventDefault) originalEvent.preventDefault();
                if (valid() && !busy && page - 1 != index) details(page - 1);
            }
        });
    }

    function details(index) {
        request("GetBillReview/" + encodeURIComponent(bills[index].id), null, function (detail) {
            var bill = mapBill(detail, bills[index]);
            clear(); top(); dialogFooter(false); uploadArea(false);
            if (bill.issues.length) {
                var issues = node("div", null, "alert alert-danger");
                bill.issues.forEach(function (issue) { issues.appendChild(node("div", issue.Message)); }); root.appendChild(issues);
            }
            if (bill.readable) billDetails(root, bill);
            else if (!bill.issues.length) root.appendChild(node("div", "This bill could not be read.", "alert alert-danger"));
            footer(index, function (right) {
                pager(right.parentNode, index);
                button(right, "Back", null, "btn btn-default btn-sm", function () { list(); });
                var proceed = button(right, "Proceed", null, "btn btn-primary btn-sm m-l-xs", function () { resolve(index); });
                proceed.disabled = !bill.readable || bill.issues.length > 0 || bill.status == "ReferencesConfirmed";
            });
        });
    }
    function resolve(index) {
        var bill = bills[index];
        request("ResolveReferences", { BillReviewId: bill.id, ExpectedVersion: bill.version, Role: "Customer" }, function (r) {
            bill.version = r.Version;
            bill.searchValue = r.SearchValue; bill.sourceParty = r.SourceParty;
            bill.matching = { customer: { mode: r.Match ? "found" : (r.Candidates || []).length ? "suggestions" : "notFound",
                match: r.Match, candidates: r.Candidates || [], method: r.ResolutionMethod } };
            delete state.choices[index + ".customer"];
            step(index, 0);
        });
    }

    // ---- matching steps --------------------------------------------------------------------------------------
    function trail(current) {
        var span = node("span", null, "pull-right text-muted text-sm font-normal");
        DocAiReview_Steps.map(function (s) { return s.title; }).concat(["Review"]).forEach(function (t, i) {
            if (i) span.appendChild(document.createTextNode(" → "));
            span.appendChild(node(i == current ? "strong" : "span", t));
        });
        return span;
    }

    function searchAll(parent, index, s, picked, onChange) {
        var box = node("div", null, "form-group m-t-sm m-b-none docai-review-search");
        var id = "slDocAiReview-" + s.key;
        var label = node("label", "Search all " + s.plural); label.setAttribute("for", id); box.appendChild(label);
        box.appendChild(node("p", "Search existing " + s.plural + " and select one to continue.", "text-muted text-sm m-b-xs"));
        var select = node("select", null, "form-control input-sm"); select.id = id;
        var empty = node("option", "Select a " + s.noun); empty.value = ""; select.appendChild(empty);
        box.appendChild(select); parent.appendChild(box);
        var query = 0, searchTimer, searchView = screen, searching = false;
        function searchingNow(on) { if (searching != on) { searching = on; disabled(on); } }
        function search(text, page, done, failed) {
            if (!valid() || searchView != screen || text.length < 2) return;
            searchingNow(true);
            var ticket = ++query, view = screen;
            return jQuery.ajax({ url: strServerURL + "/api/DocumentReview/SearchCustomers", type: "POST",
                contentType: "application/json; charset=utf-8", dataType: "json", timeout: 30000,
                data: JSON.stringify({ BillReviewId: bills[index].id, SearchText: text, Page: page, PageSize: 20 }),
                success: function (r) {
                    if (!valid() || view != screen || ticket != query) return;
                    searchingNow(false);
                    if (r.Error) { error(r.Error); if (failed) failed(); } else done(r.Data || { Customers: [] });
                }, error: function (xhr) {
                    if (!valid() || view != screen || ticket != query) return;
                    searchingNow(false); error((xhr.responseJSON || {}).Error || {}); if (failed) failed();
                } });
        }
        var jq = (window.$ && $.fn && $.fn.select2) ? $ : (jQuery.fn.select2 ? jQuery : null);
        (jq || jQuery)(select).on("change", function () {
            if (!valid() || busy) return;
            var option = select.options[select.selectedIndex];
            onChange(select.value ? { Id: Number(select.value), Name: option.textContent } : null);
        });
        if (picked) { var o = node("option", name(picked)); o.value = picked.Id; o.selected = true; select.appendChild(o); }
        if (jq) {
            jq(select).css({ width: "100%" }).select2({ dropdownParent: jq("#DocAiExtractModal"), minimumInputLength: 2, placeholder: "Select a customer",
                ajax: { delay: 300, transport: function (params, success, failure) {
                    return search(params.data.term || "", params.data.page || 1, function (r) {
                        success({ results: (r.Customers || []).map(function (c) { return { id: c.Id, text: name(c) }; }), pagination: { more: !!r.HasMore } });
                    }, failure);
                }, processResults: function (r) { return r; } } });
        } else {
            var input = node("input", null, "form-control input-sm"); input.type = "text"; input.placeholder = "Type at least 2 characters";
            box.insertBefore(input, select);
            var nextPage = 1, searchText = "";
            var more = button(box, "More customers", null, "btn btn-link btn-sm hide", function () { fetchPage(); });
            function fetchPage() {
                search(searchText, nextPage, function (r) {
                    (r.Customers || []).forEach(function (c) { var o = node("option", name(c)); o.value = c.Id; select.appendChild(o); });
                    nextPage++; more.className = "btn btn-link btn-sm" + (r.HasMore ? "" : " hide");
                });
            }
            input.oninput = function () {
                if (!valid() || searchView != screen) return;
                query++; searchingNow(false); clearTimeout(searchTimer); onChange(null);
                while (select.children.length > 1) select.removeChild(select.lastChild);
                more.className = "btn btn-link btn-sm hide";
                if (input.value.trim().length < 2) return;
                searchText = input.value.trim(); nextPage = 1; more.className = "btn btn-link btn-sm hide";
                searchTimer = setTimeout(fetchPage, 300);
            };
        }
    }

    function step(index, n) {
        clear(); top(); dialogFooter(false); uploadArea(false);
        var s = DocAiReview_Steps[n], m = matching(bills[index], s), current = choice(index, s), continueButton = null;
        var extracted = bills[index].searchValue;
        function refresh() { if (continueButton) continueButton.disabled = !current.value; }

        var body = panel(root, (m.mode == "found" ? s.short : "Match " + s.title) + " · Step " + (n + 1) + " of " + DocAiReview_Steps.length, trail(n));
        body.appendChild(node("p", "Read from the B/L: " + (extracted || "\u2014") + " (" + (bills[index].sourceParty || "Customer") + ")", "text-muted"));
        if (m.mode == "found") {
            var found = node("div", null, "alert alert-info m-b-none");
            var h = node("h4", null, "m-t-none"); h.appendChild(node("i", null, "fa fa-check-circle-o")); h.appendChild(document.createTextNode(" " + s.short + " found"));
            found.appendChild(h);
            found.appendChild(node("div", s.short + " name", "text-sm"));
            found.appendChild(node("div", name(m.match), "font-bold"));
            body.appendChild(found);
        } else {
            var suggestions = m.mode == "suggestions" && m.candidates && m.candidates.length;
            body.appendChild(node("h4", suggestions ? "No exact " + s.noun + " match found" : "No " + s.noun + " match found", "m-t-none"));
            body.appendChild(node("p", (suggestions ? "No " + s.noun + " has the same name. Choose one of the closest " + s.plural + ", or select Not Found."
                               : "No " + s.noun + " is close to this name. Search all " + s.plural + " and select one to continue."), "text-muted"));
            var searchHost = node("div");
            function showSearch(on) {
                while (searchHost.firstChild) searchHost.removeChild(searchHost.firstChild);
                if (on) searchAll(searchHost, index, s, current.how == "search" ? current.value : null, function (v) {
                    current.value = v; current.how = "search"; refresh();
                });
            }
            if (suggestions) {
                body.appendChild(node("div", "Closest " + s.plural, "font-bold m-b-xs"));
                var group = node("div", null, "docai-review-options");
                m.candidates.concat([null]).forEach(function (name, i) {
                    var label = node("label", null, "m-l"), radio = node("input");
                    radio.type = "radio"; radio.name = "rbDocAiReview-" + s.key; radio.value = name == null ? "" : name.Id;
                    radio.checked = name == null ? current.how == "search" : current.how == "suggested" && current.value == name;
                    radio.onchange = function () {
                        if (!valid() || busy) return;
                        if (name == null) { current.value = null; current.how = "search"; showSearch(true); }
                        else { current.value = name; current.how = "suggested"; showSearch(false); }
                        refresh();
                    };
                    label.appendChild(radio); label.appendChild(document.createTextNode(" " + (name == null ? "Not Found" : (name.Name || name.LocalName || name.Id))));
                    group.appendChild(label); group.appendChild(node("br"));
                });
                body.appendChild(group);
                body.appendChild(searchHost);
                showSearch(current.how == "search");
            } else {
                body.appendChild(searchHost);
                showSearch(true);
            }
        }

        billDetails(root, bills[index]);
        footer(index, function (right) {
            button(right, "Back", null, "btn btn-default btn-sm", function () { if (n == 0) details(index); else step(index, n - 1); });
            continueButton = button(right, n < DocAiReview_Steps.length - 1 ? "Continue" : "Review", null, "btn btn-primary btn-sm m-l-xs", function () {
                if (n < DocAiReview_Steps.length - 1) step(index, n + 1); else review(index);
            });
        });
        refresh();
    }

    // ---- review ------------------------------------------------------------------------------------------------
    function review(index) {
        clear(); top(); dialogFooter(false); uploadArea(false);
        var b = bills[index];
        var body = panel(root, "Review · BL " + b.blNumber, trail(DocAiReview_Steps.length));
        body.appendChild(node("p", "Check the matches for this bill of lading, then confirm.", "text-muted"));
        var table = node("table", null, "table text-sm m-b-none"), head = node("thead"), tr = node("tr");
        ["", "From the B/L", "Selected", "How"].forEach(function (h) { tr.appendChild(node("th", h)); });
        head.appendChild(tr); table.appendChild(head);
        var tbody = node("tbody"); table.appendChild(tbody);
        DocAiReview_Steps.forEach(function (s) {
            var c = choice(index, s), r = node("tr");
            r.appendChild(node("td", s.title, "font-bold"));
            r.appendChild(node("td", b.searchValue || "\u2014"));
            r.appendChild(node("td", name(c.value)));
            var how = node("td"); how.appendChild(node("span", howText(c.how), c.how == "found" ? "label label-success" : c.how == "suggested" ? "label label-info" : "label label-warning"));
            r.appendChild(how); tbody.appendChild(r);
        });
        body.appendChild(table);

        billDetails(root, b);
        footer(index, function (right) {
            button(right, "Back", null, "btn btn-default btn-sm", function () { step(index, DocAiReview_Steps.length - 1); });
            button(right, "Confirm", "fa-check", "btn btn-primary btn-sm m-l-xs", function () {
                var c = choice(index, DocAiReview_Steps[0]), m = matching(b, DocAiReview_Steps[0]);
                request("ConfirmReferences", { BillReviewId: b.id, ExpectedVersion: b.version, RememberAlias: true,
                    ReferenceSelections: [{ Role: "Customer", Id: c.value.Id,
                        ResolutionMethod: c.how == "found" ? m.method : c.how == "suggested" ? "SuggestedSelection" : "ManualSelection" }] },
                    function () { loadList("References confirmed successfully."); top(); });
            });
        });
    }

    dialogFooter(false); uploadArea(true);
    loadList();
    return root;
}
