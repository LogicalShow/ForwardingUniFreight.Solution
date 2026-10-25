
function SubmitInvoice_LoadingWithPaging_Forwarding(OrderBy, ArrowId) {
    debugger;
    var URL = "/api/ZakatAndIncomeReport/GetTaxAmounts";
    CallGETFunctionWithParameters(URL, { WhereClause: GetWhereClause(), InvoiceModule: GetInvoiceModule() }
        , function (pData) {
            debugger;
            FadePageCover(false);
            $("#txt-TotalAmountBeforeTax").val(pData[0]);
            $("#txt-TaxAmount").val(pData[1]);
            $("#txt-TotalAmountAfterTax").val(pData[2]);
            //SL_Invoices_BindTableRows(JSON.parse(pData[0]));
        }, null);
}

function GetWhereClause() {
    debugger;
    var WhereClause = " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND ID>=11173 and PartnerName <>'0' ";
    if ($('input[name="nameInvoiceModule"]:checked').attr("value") == 3)
        WhereClause = " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND ID>=90 and PartnerName <>'0' ";

    //if ($("#slInvoiceType_Forwarding").val() != "0" && $("#slInvoiceType_Forwarding").val() != 0) {
    //    WhereClause += " AND InvoiceTypeID = " + $("#slInvoiceType_Forwarding").val();
    //}
    var InvoiceTypes = $('input[name="nameInvoiceType"]:checked').map(function () {
        return $(this).val();
    }).get();

    if (InvoiceTypes.length > 0) {
        var strInvoiceTypes = InvoiceTypes.join(', ');
        WhereClause += " AND InvoiceTypeID IN( " + strInvoiceTypes + ")";
    }
    //if ($("#slBranch_Forwarding").val() != "0" && $("#slBranch_Forwarding").val() != 0) {
    //    WhereClause += " AND BranchID = " + $("#slBranch_Forwarding").val();
    //}
    var Branches = $('input[name="nameBranch"]:checked').map(function () {
        return $(this).val();
    }).get();

    if (Branches.length > 0) {
        var strBranches = Branches.join(', ');
        WhereClause += " AND BranchID IN( " + strBranches + ")";
    }

    if ($("#slCurrency_Filter").val() != "0" && $("#slCurrency_Filter").val() != 0) {
        WhereClause += " AND CurrencyID = " + $("#slCurrency_Filter").val();
    }
    if ($("#slClients_Filter").val() != "0" && $("#slClients_Filter").val() != 0) {
        WhereClause += " AND PartnerID = " + $("#slClients_Filter").val();
    }
    if ($("#slInvoiceType_Forwarding").val() != "0" && $("#slInvoiceType_Forwarding").val() != 0) {
        WhereClause += " AND InvoiceTypeID = " + $("#slInvoiceType_Forwarding").val();
    }
    if ($('#txtFromDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
    }
    if ($('#txtToDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
    }
    if ($("#txt-SearchForwarding").val() != "") {
        WhereClause += " AND InvoiceNumber = " + $("#txt-SearchForwarding").val();
    }

    var TaxValue = $("input[name='nameTaxes']:checked").attr("value");
    if (TaxValue == 1)
        WhereClause += " AND ( ISNULL(TaxAmount,0) > 0 OR ISNULL(Items15PercTaxAmount,0) > 0 ) ";
    else if (TaxValue == 2)
        WhereClause += " AND ( ISNULL(TaxAmount,0) = 0 AND ISNULL(Items15PercTaxAmount,0) = 0 )";


    var SentOrNotSentToZatza = $("input[name='nameSentOrNotSentToZatza']:checked").attr("value");
    if (SentOrNotSentToZatza == 1)//Not Sent
        WhereClause += "  AND ID NOT IN ( SELECT ResponseToSubmitInvoice.InvoiceID FROM ResponseToSubmitInvoice) ";
    else if (SentOrNotSentToZatza == 2)//Sent
        WhereClause += "  AND ID IN ( SELECT ResponseToSubmitInvoice.InvoiceID FROM ResponseToSubmitInvoice) ";
    else { }

    var ApprovedValue = $("input[name='nameApproved']:checked").attr("value");
    if (ApprovedValue == 1)
        WhereClause += " AND IsApproved = 1";
    else if (ApprovedValue == 2)
        WhereClause += " AND ISNULL(IsApproved,0) = 0";

    if ($("#slQuotationMarks").val() == 1)
        WhereClause += " AND ISNULL(PreviousDays,0) > " + $("#txt-PreviousDays").val() + "";
    else if ($("#slQuotationMarks").val() == 2)
        WhereClause += " AND ISNULL(PreviousDays,0) < " + $("#txt-PreviousDays").val() + "";
    else if ($("#slQuotationMarks").val() == 3)
        WhereClause += " AND ISNULL(PreviousDays,0) = " + $("#txt-PreviousDays").val() + "";
    else if ($("#slQuotationMarks").val() == 4)
        WhereClause += " AND ISNULL(PreviousDays,0) != " + $("#txt-PreviousDays").val() + "";
    else if ($("#slQuotationMarks").val() == 5)
        WhereClause += " AND ISNULL(PreviousDays,0) >= " + $("#txt-PreviousDays").val() + "";
    else if ($("#slQuotationMarks").val() == 6)
        WhereClause += " AND ISNULL(PreviousDays,0) <= " + $("#txt-PreviousDays").val() + "";

    return WhereClause;
}

function GetInvoiceModule() {
    debugger;

    var ModuleID = $("input[name='nameInvoiceModule']:checked").attr("value");
    if (ModuleID == 1)
        InvoiceModule = "Operations";
    else if (ModuleID == 2)
        InvoiceModule = "Trucking";
    else if (ModuleID == 3)
        InvoiceModule = "Sales";
    return InvoiceModule;
}
