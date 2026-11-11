// Review flow of the "Extract with AI" dialog for a read that found several bills of lading (resultType "bill-of-lading-list.v1").
// Phase 1: the list of bills -> View Details.
// Phase 2: the bill's details (validation) -> Proceed -> Customer -> Review -> Confirm.
// Each matching step has three modes: "found" (matched automatically), "suggestions" (closest records, the first one
// pre-selected, or Not Found -> search all) and "notFound" (search all records). Front end only: nothing is saved.
// Values are assigned only via textContent (DocAiExtract_Node), never parsed as HTML.

var DocAiReview_Steps = [
    { key: "customer", title: "Customer", short: "Customer", noun: "customer", plural: "customers", source: "shipperName" }
    // Agent and Vessel steps removed for now. To restore, add back:
    // { key: "agent", title: "Agent", short: "Agent", noun: "agent", plural: "agents", source: null },
    // { key: "vessel", title: "Vessel", short: "Vessel", noun: "vessel", plural: "vessels", source: "vesselName" }
];
var DocAiReview_LowConfidence = 0.8;    // values read with a confidence below this get the "Low confidence" badge
var DocAiReview_State = {};    // per document (localId): the choices and validated bills survive a redraw

function DocAiReview_Element(doc) {
    var root = DocAiExtract_Node("div", null, "docai-review");
    var data = doc.details || {}, bills = data.bills || [], directory = data.directory || {};
    var state = DocAiReview_State[doc.localId] || (DocAiReview_State[doc.localId] = { choices: {}, validated: {} });
    var generation = DocAiExtract_Generation;
    var node = DocAiExtract_Node;

    function valid() { return generation == DocAiExtract_Generation; }
    function clear() { while (root.firstChild) root.removeChild(root.firstChild); }
    // The review screens (list included) have their own actions: the dialog's Close / Read footer stays hidden on them.
    function dialogFooter(on) { jQuery("#DocAiExtractModal .modal-footer").toggleClass("hide", !on); }
    // The upload row and its status line belong to the list; a bill's own screens hide them.
    function uploadArea(on) { jQuery("#txtDocAiFileName").closest(".row").add("#pDocAiStatus").toggleClass("hide", !on); }
    function top() { jQuery("#DocAiExtractModal").scrollTop(0); }
    function button(parent, text, icon, className, action) {
        var btn = node("button", null, className); btn.type = "button";
        if (icon) { btn.appendChild(node("i", null, "fa " + icon)); btn.appendChild(document.createTextNode(" ")); }
        btn.appendChild(document.createTextNode(text));
        btn.onclick = function () { if (valid()) action(); };
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
    function list(notice) {
        clear(); dialogFooter(false); uploadArea(true);
        if (notice) root.appendChild(node("div", notice, "alert alert-success"));
        var wrap = node("div", null, "docai-table-scroll"), table = node("table", null, "table table-hover text-sm");
        var head = node("thead"), tr = node("tr");
        ["HBL", "Shipper", "Consignee", "POL", "POD", "Action"].forEach(function (h) { var th = node("th", h); th.setAttribute("scope", "col"); tr.appendChild(th); });
        head.appendChild(tr); table.appendChild(head);
        var body = node("tbody"); table.appendChild(body);
        bills.forEach(function (b, i) {
            var row = node("tr");
            [b.blNumber, b.shipperName, b.consigneeName, b.pol, b.pod].forEach(function (v) { row.appendChild(node("td", v)); });
            var action = node("td");
            button(action, "View Details", "fa-eye", "btn btn-link btn-sm", function () { details(i); });
            if (state.validated[i]) action.appendChild(node("span", "Completed", "label label-success"));
            row.appendChild(action);
            row.ondblclick = function () { if (valid()) details(i); };
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
                var td = node("td", c[key], key == "containerNumber" ? "font-bold" : null);
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
                if (valid() && page - 1 != index) details(page - 1);
            }
        });
    }

    function details(index) {
        clear(); top(); dialogFooter(false); uploadArea(false);
        billDetails(root, bills[index]);
        footer(index, function (right) {
            pager(right.parentNode, index);
            button(right, "Back", null, "btn btn-default btn-sm", function () { list(); });
            button(right, "Proceed", null, "btn btn-primary btn-sm m-l-xs", function () { step(index, 0); });
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
        (directory[s.key] || []).forEach(function (name) { var o = node("option", name); o.value = name; select.appendChild(o); });
        select.value = picked || "";
        box.appendChild(select); parent.appendChild(box);
        jQuery(select).on("change", function () { if (valid()) onChange(select.value || null); });
        if (jQuery.fn.select2)
            jQuery(select).css({ "width": "100%" }).select2({ dropdownParent: jQuery("#DocAiExtractModal"), placeholder: "Select a " + s.noun });
    }

    function step(index, n) {
        clear(); top(); dialogFooter(false); uploadArea(false);
        var s = DocAiReview_Steps[n], m = matching(bills[index], s), current = choice(index, s), continueButton = null;
        var extracted = s.source ? bills[index][s.source] : null;
        function refresh() { if (continueButton) continueButton.disabled = !current.value; }

        var body = panel(root, (m.mode == "found" ? s.short : "Match " + s.title) + " · Step " + (n + 1) + " of " + DocAiReview_Steps.length, trail(n));
        if (m.mode == "found") {
            var found = node("div", null, "alert alert-info m-b-none");
            var h = node("h4", null, "m-t-none"); h.appendChild(node("i", null, "fa fa-check-circle-o")); h.appendChild(document.createTextNode(" " + s.short + " found"));
            found.appendChild(h);
            found.appendChild(node("div", s.short + " name", "text-sm"));
            found.appendChild(node("div", m.match, "font-bold"));
            body.appendChild(found);
        } else {
            var suggestions = m.mode == "suggestions" && m.candidates && m.candidates.length;
            body.appendChild(node("h4", suggestions ? "No exact " + s.noun + " match found" : "No " + s.noun + " match found", "m-t-none"));
            body.appendChild(node("p", (extracted ? "Read from the B/L: " + extracted + ". " : "")
                + (suggestions ? "No " + s.noun + " has the same name. Choose one of the closest " + s.plural + ", or select Not Found."
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
                    radio.type = "radio"; radio.name = "rbDocAiReview-" + s.key; radio.value = name == null ? "" : name;
                    radio.checked = name == null ? current.how == "search" : current.how == "suggested" && current.value == name;
                    radio.onchange = function () {
                        if (!valid()) return;
                        if (name == null) { current.value = null; current.how = "search"; showSearch(true); }
                        else { current.value = name; current.how = "suggested"; showSearch(false); }
                        refresh();
                    };
                    label.appendChild(radio); label.appendChild(document.createTextNode(" " + (name == null ? "Not Found" : name)));
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
            r.appendChild(node("td", s.source ? b[s.source] : "—"));
            r.appendChild(node("td", c.value));
            var how = node("td"); how.appendChild(node("span", howText(c.how), c.how == "found" ? "label label-success" : c.how == "suggested" ? "label label-info" : "label label-warning"));
            r.appendChild(how); tbody.appendChild(r);
        });
        body.appendChild(table);

        billDetails(root, b);
        footer(index, function (right) {
            button(right, "Back", null, "btn btn-default btn-sm", function () { step(index, DocAiReview_Steps.length - 1); });
            button(right, "Confirm", "fa-check", "btn btn-primary btn-sm m-l-xs", function () {
                state.validated[index] = true;
                list();
                top();
            });
        });
    }

    list();
    return root;
}
