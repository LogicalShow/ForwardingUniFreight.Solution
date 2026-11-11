// UI-only sample data for the "Extract with AI" dialog (Scripts/DocAi/DocAiExtract.js) while the DocAi backend
// is not in this solution: the /api/DocAi/* calls are answered in the browser and never reach the server.
// A Read "takes" DocAiDemo_ReadSeconds so every loading message can be seen. By file name:
//   contains "fail"   -> the read fails
//   contains "single" -> one bill of lading (the original read-only view)
//   anything else     -> 4 bills of lading for the review flow (Scripts/DocAi/DocAiReview.js)
// Delete this file (and its line in Operations.js) when the real DocAi controller is added.

var DocAiDemo_ReadSeconds = 40;   // 8 loading messages, 5 s apart: the last one appears at 35 s
var DocAiDemo_Docs = {};
var DocAiDemo_Count = 0;

function DocAiDemo_Field(path, name, value, confidence, flags) {
    return { path: path, name: name, value: value, rawText: value, confidence: confidence == null ? 0.97 : confidence, page: 1, flags: flags || [] };
}

function DocAiDemo_BillOfLading() {
    var header = [
        ["billOfLadingNumber", "DEMO-BL-240518"], ["issueDate", "2026-10-28"], ["placeOfIssue", "Alexandria"],
        ["shipperName", "Al Baraka for Import & Export"], ["shipperAddress", "12 El Horreya Rd, Alexandria, Egypt"],
        ["consigneeName", "Agility Egypt for Shipping and Freight"], ["consigneeAddress", "5 Port Said St, Cairo, Egypt"],
        ["notifyParty", "Same as consignee"], ["vesselName", "MSC AURORA"], ["voyageNumber", "AU245E"],
        ["portOfLoading", "Shanghai, CN"], ["portOfDischarge", "Alexandria, EG"],
        ["description", "Spare parts for industrial machines"], ["hsCode", "8483.40"], ["packages", "120 cartons"],
        ["totalGrossWeightKg", "18,450.00"], ["bookingNumber", "BK7731902"], ["freightTerms", "Freight Prepaid"]
    ].map(function (f) {
        return DocAiDemo_Field(f[0], f[0], f[1], f[0] == "hsCode" ? 0.62 : null, f[0] == "hsCode" ? ["LOW_CONFIDENCE"] : null);
    });
    var containers = [
        ["MSCU4820117", "SL-55120", "40HC", "70", "10,800.00", "62.40"],
        ["MSCU4820233", "SL-55121", "20GP", "50", "7,650.00", "28.10"]
    ].map(function (c, i) {
        var p = "containers[" + i + "].";
        return { fields: [
            DocAiDemo_Field(p + "containerNumber", "containerNumber", c[0]), DocAiDemo_Field(p + "sealNumber", "sealNumber", c[1]),
            DocAiDemo_Field(p + "containerType", "containerType", c[2]), DocAiDemo_Field(p + "packages", "packages", c[3]),
            DocAiDemo_Field(p + "grossWeightKg", "grossWeightKg", c[4]), DocAiDemo_Field(p + "measurementCbm", "measurementCbm", c[5])
        ] };
    });
    return { header: header, containers: containers, flags: [{ path: "hsCode", value: "LOW_CONFIDENCE" }] };
}

// Review flow sample: each bill exercises a different mix of the three matching modes
// ("found": matched automatically, "suggestions": closest records with one pre-selected, "notFound": pick from all records).
function DocAiDemo_Containers(prefix, count, packages, weights) {
    var list = [];
    for (var i = 0; i < count; i++)
        list.push({ containerNumber: prefix + (2248701 + i * 7307), sealNumber: String(3121901 + i * 11), containerType: "20' DV",
                    packages: packages, grossWeightKg: weights[i % weights.length], measurementCbm: "72.00" });
    list[0].containerNumber = prefix == "ECNU" ? "BSIU3252045" : list[0].containerNumber;
    return list;
}

function DocAiDemo_BillList() {
    var bills = [
        { blNumber: "ALS580274MUN", issueDate: "22/09/2026",
          shipperName: "ALEX JET FOR SUPPLIES", shipperAddress: "19.5 Km Matrouh Road, Zamzam Street, Al Amriya, Alexandria, Egypt",
          consigneeName: "EMIRATES MINERAL (INDIA) LLP", consigneeAddress: "S.N. 88P4, National Highway 27, Virvadarka, Dist. Morbi, Gujarat, India",
          notifyParty: "SAME AS CONSIGNEE", vesselName: "SSL BRAHMAPUTRA", voyageNumber: "939E",
          portOfLoading: "Al Sokhna, Egypt", portOfDischarge: "Mundra, India", pol: "EGSOK", pod: "INMUN", bookingNumber: "HB260922-03",
          hsCode: "2521.00.90", packages: "16 Bulk", grossWeight: "445,310.000 Kgs", freightTerms: "FREIGHT PREPAID",
          containers: DocAiDemo_Containers("ECNU", 10, "1,080", ["27,795", "27,795", "27,795", "27,850", "27,790", "27,900", "27,765", "27,720", "27,790", "27,780"]),
          matching: {
              customer: { mode: "suggestions", candidates: ["ALEX JET SUPPLIES CO.", "ALEX JET TRADING", "ALEX SUPPLIES & SERVICES"] },
              agent: { mode: "found", match: "AGILITY EGYPT FOR SHIPPING AND FREIGHT" },
              vessel: { mode: "found", match: "SSL BRAHMAPUTRA" } } },
        { blNumber: "ISTH25110458", issueDate: "18/10/2026",
          shipperName: "Nile Textiles International", shipperAddress: "Industrial Zone 3, 10th of Ramadan City, Egypt",
          consigneeName: "Al Baraka for Import & Export", consigneeAddress: "King Fahd Road, Jeddah, Saudi Arabia",
          notifyParty: "SAME AS CONSIGNEE", vesselName: "MSC AURORA", voyageNumber: "AU245E",
          portOfLoading: "Alexandria, Egypt", portOfDischarge: "Jeddah, Saudi Arabia", pol: "EGLY", pod: "SAJD", bookingNumber: "BK7731902",
          hsCode: "5208.12", packages: "120 Cartons", grossWeight: "18,450.000 Kgs", freightTerms: "FREIGHT COLLECT",
          containers: DocAiDemo_Containers("MSCU", 2, "60", ["9,225"]),
          matching: {
              customer: { mode: "found", match: "NILE TEXTILES INTERNATIONAL" },
              agent: { mode: "suggestions", candidates: ["GULF AGENCY COMPANY", "GULF SHIPPING AGENCIES"] },
              vessel: { mode: "notFound" } } },
        { blNumber: "ISTH25110459", issueDate: "18/10/2026",
          shipperName: "Delta Industrial Supplies", shipperAddress: "El Obour City, Cairo, Egypt",
          consigneeName: "Gulf Trading Company", consigneeAddress: "Al Balad, Jeddah, Saudi Arabia",
          notifyParty: "Gulf Trading Company", vesselName: "MSC AURORA", voyageNumber: "AU245E",
          portOfLoading: "Alexandria, Egypt", portOfDischarge: "Jeddah, Saudi Arabia", pol: "EGLY", pod: "SAJD", bookingNumber: "BK7731915",
          hsCode: "8483.40", packages: "48 Pallets", grossWeight: "12,300.000 Kgs", freightTerms: "FREIGHT PREPAID",
          containers: DocAiDemo_Containers("MSCU", 1, "48", ["12,300"]),
          matching: {
              customer: { mode: "notFound" },
              agent: { mode: "found", match: "AGILITY EGYPT FOR SHIPPING AND FREIGHT" },
              vessel: { mode: "found", match: "MSC AURORA" } } },
        { blNumber: "ISTH25110460", issueDate: "19/10/2026",
          shipperName: "Alexandria Packaging", shipperAddress: "Borg El Arab Industrial Zone, Alexandria, Egypt",
          consigneeName: "Red Sea Logistics", consigneeAddress: "Industrial City, Yanbu, Saudi Arabia",
          notifyParty: "SAME AS CONSIGNEE", vesselName: "MSC AURORA", voyageNumber: "AU245E",
          portOfLoading: "Alexandria, Egypt", portOfDischarge: "Jeddah, Saudi Arabia", pol: "EGLY", pod: "SAJD", bookingNumber: "BK7731928",
          hsCode: "4819.10", packages: "300 Bales", grossWeight: "21,060.000 Kgs", freightTerms: "FREIGHT PREPAID",
          containers: DocAiDemo_Containers("MSCU", 3, "100", ["7,020"]),
          matching: {
              customer: { mode: "suggestions", candidates: ["ALEXANDRIA PACKAGING CO.", "ALEX PACK FOR INDUSTRY"] },
              agent: { mode: "notFound" },
              vessel: { mode: "suggestions", candidates: ["MSC AURORA", "MSC AURELIA"] } } }
    ];
    // fieldInfo: how sure the read was about a value (0..1) and the page it came from. The review screens mark values
    // below 80% (DocAiReview_LowConfidence); the 0.97 and 0.80 entries are here to show that those are not marked.
    bills[0].fieldInfo = { shipperName: { confidence: 0.97, page: 1 }, consigneeAddress: { confidence: 0.74, page: 1 },
                           portOfDischarge: { confidence: 0.8, page: 1 }, hsCode: { confidence: 0.62, page: 2 } };
    bills[0].containers[1].fieldInfo = { sealNumber: { confidence: 0.71, page: 2 } };
    bills[0].containers[3].fieldInfo = { grossWeightKg: { confidence: 0.665, page: 2 }, containerNumber: { confidence: 0.99, page: 2 } };
    bills[1].fieldInfo = { voyageNumber: { confidence: 0.78, page: 3 }, grossWeight: { confidence: 0.55, page: 3 } };
    bills[1].containers[0].fieldInfo = { containerNumber: { confidence: 0.58, page: 3 }, measurementCbm: { confidence: 0.79, page: 3 } };
    bills[3].fieldInfo = { notifyParty: { confidence: 0.69, page: 5 } };
    return {
        bills: bills,
        directory: {   // "Search all" lists: every record the user can pick when nothing matches
            customer: ["ALEX JET INTERNATIONAL", "ALEX JET SUPPLIES CO.", "ALEX JET TRADING", "ALEX SUPPLIES & SERVICES", "ALEXANDRIA PACKAGING CO.",
                     "ALEX PACK FOR INDUSTRY", "DELTA INDUSTRIAL SUPPLIES CO.", "DELTA TRADING GROUP", "NILE TEXTILES INTERNATIONAL"],
            agent: ["AGILITY EGYPT FOR SHIPPING AND FREIGHT", "GULF AGENCY COMPANY", "GULF SHIPPING AGENCIES", "RED SEA SHIPPING AGENCY"],
            vessel: ["MSC AURELIA", "MSC AURORA", "MSC AURORA II", "SSL BRAHMAPUTRA", "SSL GANGA"]
        }
    };
}

function DocAiDemo_Usage() {
    return {
        available: true, asOfUtc: new Date().toISOString(), quotaMode: "Prepaid", status: "Ok",
        granted: 1000, used: 300, reserved: 20, remaining: 680, warningAtPages: 100,
        lastTopUp: { recordedAtUtc: "2026-10-01T12:00:00Z", pages: 1000 },
        submittedTodayPages: 12, dailyCap: 200, chargedTodayPages: 10,
        months: [{ month: "2026-11", chargedDocuments: 4, chargedPages: 12 }, { month: "2026-10", chargedDocuments: 96, chargedPages: 288 }],
        recentDocuments: [{ fileName: "DEMO-BL-240518.pdf", pages: 1, user: "Demo user", createdAt: "2026-11-03 10:15", status: "Completed" }]
    };
}

// GET parameters are in the URL by the time a transport runs; the POST sends FormData.
function DocAiDemo_Param(options, name) {
    if (options.data && options.data.get) return options.data.get(name);
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(options.url + "&" + (typeof options.data == "string" ? options.data : ""));
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
}

function DocAiDemo_Status(doc) {
    if (new Date().getTime() < doc.readyAt) return { state: "reading", localId: doc.localId, fileName: doc.fileName };
    if (doc.fail) return { state: "failed", localId: doc.localId, fileName: doc.fileName, errorCode: "DEMO_FAILURE" };
    var single = /single/i.test(doc.fileName);
    return { state: "done", localId: doc.localId, fileName: doc.fileName, resultType: single ? "bill-of-lading.v1" : "bill-of-lading-list.v1",
             completedAt: new Date(doc.readyAt).toLocaleString(), details: single ? DocAiDemo_BillOfLading() : DocAiDemo_BillList() };
}

function DocAiDemo_Answer(options) {
    var action = /\/api\/DocAi\/(\w+)/i.exec(options.url)[1].toLowerCase();
    var operationId = DocAiDemo_Param(options, "pOperationID") || "0";
    if (action == "read") {
        var file = options.data && options.data.get ? options.data.get("file") : null;
        var name = file && file.name ? file.name : "document.pdf";
        var doc = { localId: "demo-" + (++DocAiDemo_Count), fileName: name, fail: /fail/i.test(name),
                    readyAt: new Date().getTime() + DocAiDemo_ReadSeconds * 1000 };
        DocAiDemo_Docs[operationId] = doc;
        return DocAiDemo_Status(doc);
    }
    if (action == "status") {
        var current = DocAiDemo_Docs[operationId];
        return current && current.localId == DocAiDemo_Param(options, "pLocalId") ? DocAiDemo_Status(current) : { state: "failed" };
    }
    if (action == "latest") return DocAiDemo_Docs[operationId] ? jQuery.extend({ exists: true }, DocAiDemo_Status(DocAiDemo_Docs[operationId])) : { exists: false };
    if (action == "usage") return DocAiDemo_Usage();
    if (action == "usagestate") return { available: true, status: "Ok", remaining: 680 };
    return null;
}

function DocAiDemo_Install(jq) {
    if (!jq || !jq.ajaxTransport || jq.DocAiDemoInstalled) return;
    jq.DocAiDemoInstalled = true;
    jq.ajaxTransport("+*", function (options) {
        if (!/\/api\/DocAi\//i.test(options.url)) return;
        var timer = null;
        return {
            send: function (headers, complete) {
                timer = setTimeout(function () {
                    var body = DocAiDemo_Answer(options);
                    if (body == null) complete(404, "Not Found", { text: "{}" });
                    else complete(200, "success", { text: JSON.stringify(body) });
                }, 300);
            },
            abort: function () { clearTimeout(timer); }
        };
    });
}

DocAiDemo_Install(window.jQuery);
DocAiDemo_Install(window.$);     // $ can be another copy of jQuery in this solution
