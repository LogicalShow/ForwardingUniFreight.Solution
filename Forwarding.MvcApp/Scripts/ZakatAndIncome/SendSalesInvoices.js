$(document).ready(function () {

    $('#div-search-option').keydown(function (e) {
        if (e.keyCode == 13) {
            // TRCK_Trailers_LoadingWithPaging();
        }
    });
    $("#txtToDate_Forwarding").val(getTodaysDateInddMMyyyyFormat());
    var CurrentMonth = parseInt(getTodaysDateInddMMyyyyFormat().split('/')[1]);
    $("#txtFromDate_Forwarding").val((getTodaysDateInddMMyyyyFormat().split('/')[0]) + "/" + (((CurrentMonth > 1 ? (CurrentMonth - 1) : 12)).toString().padStart(2, '0')) + "/" + (CurrentMonth = 1 ? 2024 : (getTodaysDateInddMMyyyyFormat().split('/')[2]) ) );
});

function SubmitForwardingInvoice()
{
    debugger;
    if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 1)//Invoices And Debit And Credit
    {
        swal("Sorry", "برجاء أختيار مردودات المبيعات  او الفواتير");
    }
    else if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 2)//Invoices
    {
        if (GetAllSelectedIDsAsString('tblSL_Invoices') != "")
            swal({
                title: "Are you sure?",
                text: "The selected invoices will be Submitted to zatca!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Submit!",
                closeOnConfirm: true
            },
                //callback function in case of confirm delete
                function () {
                    var URL = "/api/SendSalesInvoices/SendInvoicesToZatcaAsync";
                    var invoiceModule = $("input[name='nameInvoiceModule']:checked").attr("value");

                    if (invoiceModule == 1)
                        URL = "/api/SendSalesInvoices/SendInvoicesToZatcaAsync";
                    else if (invoiceModule == 2)
                        URL = "/api/SendSalesInvoices/SendInvoicesToZatcaAsync";
                    else if (invoiceModule == 3)
                        URL = "/api/SendSalesInvoices/SendSalesInvoicesToZatcaAsync";
                    if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") != 1) {
                        swal("Sorry", " برجاء اختيار الفواتير التي لم ترسل")
                    }
                    else
                        if (GetAllSelectedIDsAsString('tblSL_Invoices') != "") {
                            FadePageCover(true);
                            swal("Wait", "جاري ارسال الفواتير الأن");
                            debugger;
                            CallGETFunctionWithParameters(URL,//"/api/SendSalesInvoices/SendInvoicesToZatcaAsync",
                                {
                                    InvoicesIDs: GetAllSelectedIDsAsString('tblSL_Invoices'),
                                    LoginURL: "http://92.205.162.170:5000/api/users/login",
                                    reportInvoiceURL: "http://92.205.162.170:5000/api/reportInvoice",
                                    WhereClause: GetWhereClause()
                                }
                                , function (pData) {
                                    debugger;
                                    FadePageCover(false);
                                    if (pData[1] == 1) {
                                        //SL_Invoices_BindTableRows(JSON.parse(pData[0]));
                                        swal("Success", "Invoice Submitted successfully.");
                                        SubmitInvoice_LoadingWithPaging_Forwarding(' ID ASC');
                                    }
                                    else
                                        swal("Sorry", "There Is Something Error.");
                                }, null);
                        }
                });
        else
            swal("Sorry", "Please select number of invoices firstly.");
    }
    else if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 3)//debit and credit
    {
        debugger;
        if (GetAllSelectedIDsAsString('tblSL_Invoices') != "") {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/SendDebitAndCredit/SendDebitAndCreditToZatcaAsync",
                {
                    InvoicesIDs: GetAllSelectedIDsAsString('tblSL_Invoices'),
                    LoginURL: "http://92.205.162.170:5000/api/users/login",
                    reportInvoiceURL: "http://92.205.162.170:5000/api/reportInvoice",
                    WhereClause: GetWhereClause()
                }
                , function (pData) {
                    debugger;
                    FadePageCover(false);
                    if (pData[1] == 1) {
                        //SubmittedSL_Invoices_BindTableRows(JSON.parse(pData[0]));
                        SubmitInvoice_LoadingWithPaging_Forwarding(' ID ASC');
                        swal("Success", "Invoice Submitted successfully.");
                    }
                    else
                        swal("Sorry", "There Is Something Error.");
                }, null);
        }
    }
}
function addCommas(number)
{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// TRCK_Trailers Region ---------------------------------------------------------------
// Bind TRCK_Trailers Table Rows
function GetWithPagingData()
{
    debugger;
    //var URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
    //var invoiceModule = $("input[name='nameInvoiceModule']:checked").attr("value");

    //if (invoiceModule == 1)
    //    URL = "/api/SendSalesInvoices/LoadWithpaging_SearchByInvoiceNumber";
    //else if (invoiceModule == 2)
    //    URL = "/api/SendSalesInvoices/LoadWithpaging_SearchByInvoiceNumber_Trucking";
    //else if (invoiceModule == 3)
    //    URL = "/api/SendSalesInvoices/LoadWithpaging_SearchByInvoiceNumber_Sales";
    //return URL;

    if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1)
    {
        var URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
        var invoiceModule = $("input[name='nameInvoiceModule']:checked").attr("value");

        if (invoiceModule == 1)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
        else if (invoiceModule == 2)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Trucking";
        else if (invoiceModule == 3)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Sales";

        var strInvoiceModules = "";
        strInvoiceModules = GetInvoiceModules();

        if (strInvoiceModules == "") { }
        else
            URL = "/api/SendSalesInvoices/SearchByInvoicesModules";

        return URL;
    }
}

function SubmitInvoice_LoadingWithPaging_Forwarding(OrderBy, ArrowId, PageNumber) {
    debugger;
    $(".fa-sort-down").css({
        'color': ''
    });
    $(".fa-sort-up").css({
        'color': ''
    });
    $("#" + ArrowId + "").css({
        'color': 'yellow'
    });
    var strInvoiceModules = "";
    var strInvoiceModules = GetInvoiceModules();
    if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 3)//Debit And Credit
    {
        if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1)//Not Sent
            LoadDebitAndCreditData(OrderBy, ArrowId, PageNumber);
        else if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 2)//Sent
        {
            LoadSubmittedDebitAndCreditData(OrderBy, ArrowId, PageNumber);
        }
    }
    else if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 2)//INVOICES
    {
        if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1 || $("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == "")//Not Sent
        {
            LoadInvoicesData(OrderBy, ArrowId, PageNumber);
        }
        else if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 2)//Sent
        {
            LoadSubmittedInvoicesData(OrderBy, ArrowId, PageNumber);
        }
    }
    else if ($("input[name='nameSendDebitAndCredit']:checked").prop("value") == 1)//INVOICES and Debit and credit
    {
        if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1 || $("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == "")//Not Sent
        {
            LoadInvoices_Debit_CreditData(OrderBy, ArrowId, PageNumber);
        }
        else if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 2)//Sent
        {
            LoadSubmittedInvoices_Debit_CreditData(OrderBy, ArrowId, PageNumber);
        }
    }
}

function LoadInvoicesData(OrderBy, ArrowId, PageNumber)
{
    debugger;
    {
        var strInvoiceModules = "";
        var strInvoiceModules = GetInvoiceModules();
        var URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
        var invoiceModule = $("input[name='nameInvoiceModule']:checked").attr("value");

        if (invoiceModule == 1)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
        else if (invoiceModule == 2)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Trucking";
        else if (invoiceModule == 3)
            URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Sales";

        if (strInvoiceModules == "") { }
        else
            URL = "/api/SendSalesInvoices/SearchByInvoicesModules";

        FadePageCover(true);
        var pPageSize = $('#select-page-size').val();
        var pPageNumber = (PageNumber > 0 ? PageNumber : ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()));
        var pWhereClause = GetWhereClause();
        var pControllerParameters = {
            WhereClause: pWhereClause,
            InvoiceModules: strInvoiceModules,
            pageNumber: pPageNumber,
            pageSize: pPageSize,
            OrderBy: OrderBy
        };
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", URL, pWhereClause, OrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
            SL_Invoices_BindTableRows(JSON.parse(pData[0]));

            $("#txt-TotalAmountBeforeTax").val(addCommas(parseFloat(pData[2]).toFixed(2)));
            $("#txt-TaxAmount").val(addCommas((parseFloat(pData[3]) + parseFloat((pData[4]))).toFixed(2)) );
            $("#txt-TotalAmountAfterTax").val(addCommas(parseFloat(pData[5]).toFixed(2)));

        });
    }
}

function LoadSubmittedInvoicesData(OrderBy, ArrowId, PageNumber)
{
    debugger;
    var strInvoiceModules = "";
    var strInvoiceModules = GetInvoiceModules();
    FadePageCover(true);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = (PageNumber > 0 ? PageNumber : ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()));
    var pWhereClause = GetWhereClause();
    var pControllerParameters = {
        WhereClause: pWhereClause,
        InvoiceModules: strInvoiceModules,
        pageNumber: pPageNumber,
        pageSize: pPageSize,
        OrderBy: OrderBy
    };
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SubmittedInvoices/SearchByInvoiceNumberByInvoiceModule", pWhereClause, OrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        SL_Invoices_BindTableRows(JSON.parse(pData[0]),"Submitted");

        $("#txt-TotalAmountBeforeTax").val(addCommas(pData[2].toFixed(2)));
        $("#txt-TaxAmount").val(addCommas((parseFloat(pData[3]) - parseFloat(pData[2])).toFixed(2)));
        $("#txt-TotalAmountAfterTax").val(addCommas(pData[3].toFixed(2)));
    });
}

function GetInvoiceModules()
{ 
    var strInvoiceModules = "";
    var ListInvoiceModules = $('input[name="nameInvoiceModule"]:checked').map(function () {
        if ($(this).val() == "")
            return "1,2,3";
        else if ($(this).val() != "")
            return $(this).val();

    }).get();

    if (ListInvoiceModules.length > 0) {
        strInvoiceModules = ListInvoiceModules.join(', ');
    }
    return strInvoiceModules;
}

function GetInvoicesSentOrNotSent()
{ 
    var strInvoiceModules = "";
    var ListInvoiceModules = $('input[name="nameSentOrNotSentToZatza"]:checked').map(function () {
        return $(this).val();
    }).get();

    if (ListInvoiceModules.length > 0) {
        strInvoiceModules = ListInvoiceModules.join(', ');
    }
    return strInvoiceModules;
}

$('input[name="nameBranch"]').change(function () {
    debugger;
    if ($(this).attr("value") == "") {
        $('input[name="nameBranch"]').prop("checked", false);
        $('input[name="nameBranch"][value=""]').prop("checked", true);

    }
    else if ($('input[name="nameBranch"][value=""]').prop("checked"))
    {
        $('input[name="nameBranch"][value=""]').prop("checked", false);
    }
});

$('input[name="nameInvoiceType"]').change(function () {
    debugger;
    if ($(this).attr("value") == "") {
        $('input[name="nameInvoiceType"]').prop("checked", false);
        $('input[name="nameInvoiceType"][value=""]').prop("checked", true);

    }
    else if ($('input[name="nameInvoiceType"][value=""]').prop("checked")) {
        $('input[name="nameInvoiceType"][value=""]').prop("checked", false);
    }
});

$('input[name="nameInvoiceModule"]').change(function () {
    debugger;
    if ($(this).attr("value") == "") {
        $('input[name="nameInvoiceModule"]').prop("checked", false);
        $('input[name="nameInvoiceModule"][value=""]').prop("checked", true);
    }
    else if ($('input[name="nameInvoiceModule"][value=""]').prop("checked")) {
        $('input[name="nameInvoiceModule"][value=""]').prop("checked", false);
    }
});

function GetWhereClause()
{
    debugger;
    var InvModuleValues = GetInvoiceModules();
    var InvSent_NotSent_All = GetInvoicesSentOrNotSent();
    var WhereClause = " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0 and PartnerName <>'0' "; // " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND ID>=11173 and PartnerName <>'0' "; 
    
    if ((InvModuleValues).includes('3'))
        WhereClause = " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0 and InvoiceDate > '2024-06-01' and PartnerName <>'0' ";//" Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND ID>=90 and InvoiceDate > '2024-06-01' and PartnerName <>'0' ";

    if (InvSent_NotSent_All == "")
        WhereClause = " Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND InvoiceDate > '2024-06-01' and PartnerName <>'0' ";//" Where 1=1 AND  InvoiceTypeID<>21 AND ISNULL(IsDeleted , 0) = 0  AND ID>= " + (((InvModuleValues).includes('3')) ? "90" : "11173") + " and InvoiceDate > '2024-06-01' and PartnerName <>'0' ";
    else if (InvSent_NotSent_All == 2)
        WhereClause = " Where 1=1 ";

    if (InvSent_NotSent_All == 2)
    {
        if (InvModuleValues == '3')
            WhereClause = " Where InvoiceTypeID IN( 3 )";
    }
    var InvoiceTypes = $('input[name="nameInvoiceType"]:checked').map(function () {
        if ($(this).val() != "")
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
        if ($(this).val() != "")
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
    if (InvSent_NotSent_All == 2)//Invoices Sent
    {
        if ($('#txtFromDate_Forwarding').val().trim() != "") {
            WhereClause += " AND CONVERT(date , InvoiceSentDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
        }
        if ($('#txtToDate_Forwarding').val().trim() != "") {
            WhereClause += " AND CONVERT(date , InvoiceSentDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
        }
        if ($("input[name='nameInvoiceSentStatus']:checked").prop("value") == 1) {
            WhereClause += " AND ISNULL(IsValidPortal,1) = 1";
        }
        if ($("input[name='nameInvoiceSentStatus']:checked").prop("value") == 2) {
            WhereClause += " AND ISNULL(IsValidPortal,1) > 1";
        }
    }
    else
    {
        if ($('#txtFromDate_Forwarding').val().trim() != "") {
            WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
        }
        if ($('#txtToDate_Forwarding').val().trim() != "") {
            WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
        }
    }
   
    if ($("#txt-SearchForwarding").val() != "") {
        WhereClause += " AND InvoiceNumber = " + $("#txt-SearchForwarding").val();
    }
    var TaxValue = $("input[name='nameTaxes']:checked").attr("value");
    if (InvSent_NotSent_All == 2)
    {

    }
    else
    {
        if (TaxValue == 1)
            WhereClause += " AND ( ISNULL(TaxAmount,0) > 0 OR ISNULL(Items15PercTaxAmount,0) > 0 ) ";
        else if (TaxValue == 2)
            WhereClause += " AND ( ISNULL(TaxAmount,0) = 0 AND ISNULL(Items15PercTaxAmount,0) = 0 )";
    }
    var ApprovedValue = $("input[name='nameApproved']:checked").attr("value");
    if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1)//Not Sent
    {
        if (ApprovedValue == 1)
            WhereClause += " AND IsApproved = 1";
        else if (ApprovedValue == 2)
            WhereClause += " AND ISNULL(IsApproved,0) = 0";
    }
    else
    {
        if (ApprovedValue == 2)
            WhereClause += " AND ISNULL(IsApproved,0) = 0";
    }

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

function GetWhereClause_Submitted() {
    debugger;
    var WhereClause = " Where 1=1 ";
    if ($("#slInvoiceType_Forwarding").val() != "0" && $("#slInvoiceType_Forwarding").val() != 0) {
        WhereClause += " AND InvoiceTypeID = " + $("#slInvoiceType_Forwarding").val();
    }
    if ($("#slBranch_Forwarding").val() != "0" && $("#slBranch_Forwarding").val() != 0) {
        WhereClause += " AND BranchID = " + $("#slBranch_Forwarding").val();
    }
    if ($("#slCurrency_Filter").val() != "0" && $("#slCurrency_Filter").val() != 0) {
        WhereClause += " AND CurrencyID = " + $("#slCurrency_Filter").val();
    }
    if ($("#slClients_Filter").val() != "0" && $("#slClients_Filter").val() != 0) {
        WhereClause += " AND ClientID = " + $("#slClients_Filter").val();
    }
    if ($('#txtFromDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceSentDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
    }
    if ($('#txtToDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceSentDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
    }
    if ($("#txt-SearchForwarding").val() != "") {
        WhereClause += " AND InvoiceNumber = " + $("#txt-SearchForwarding").val();
    }
    return WhereClause;
}
function SL_Invoices_BindTableRows(pSL_Invoices) {
    debugger;
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var SentOrNotSent = $("input[name='nameSentOrNotSentToZatza']:checked").attr("value");
    if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 1)//Not Sent
        $("#ApprovingDate_SendingDate").text("تاريخ الاعتماد ");
    else if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == 2)// Sent
        $("#ApprovingDate_SendingDate").text("تاريخ الارسال ");
    else if ($("input[name='nameSentOrNotSentToZatza']:checked").attr("value") == "")// Sent AND Not Sent
        $("#ApprovingDate_SendingDate").text("تاريخ الارسال / الاعتماد ");

    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item) {
       //InvoiceTypeName,OperationCode,BranchName,PartnerName,BillNo
        if (item.PartnerName == "0" || item.PartnerName == 0) { }
        else {
            if (GetInvoicesSentOrNotSent() == 2)//Sent
            {
                $("#ApprovingDate_SendingDate").text("تاريخ الارسال ");
                if ($("input[name='nameTaxes']:checked").attr("value") == 2)//غير ضريبية
                {
                    if (((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)) == 0)
                        AppendRowtoTable("tblSL_Invoices",//Amount,AmountWithoutVAT,TaxPercentage,TaxAmount,InvoiceNumber,InvoiceDate
                            ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); ' style='" + (item.PreviousDays <= 7 ? "background-color: #c7ffc7;" : (item.PreviousDays <= 10 ? "background-color: #ffe0a8;" : (item.PreviousDays > 10 ? "background-color: #ffe0e0;" : ""))) + "'>"
                                + "<td class='ID'> <input name='Delete' type='checkbox'" + (item.IsApproved == true ? '' : 'disabled') + " value='" + item.ID + "' /></td>"
                                + "<td class='Serial'>" + (i + 1) + "</td>"
                                + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                                //+ "<td class='BillNo' val='" + item.BillNo + "'>" + item.BillNo + "</td>"
                                + "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
                                + "<td class='TotalBeforTax' val='" + item.AmountWithoutVAT + "'>" + addCommas(item.AmountWithoutVAT) + "</td>"
                                + "<td class='VATamount " + (GetInvoicesSentOrNotSent() == 1 ? "" : " hide") + "' val='" + ((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "'>" + addCommas((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "</td>"
                                + "<td class='SubmittedVATamount " + (GetInvoicesSentOrNotSent() == 2 ? "" : " hide") + "' val='" + ((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)) + "'>" + addCommas((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)).toFixed(2) + "</td>"
                                + "<td class='Amount' val='" + item.Amount + "'>" + addCommas(item.Amount) + "</td>"
                                + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                                + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
                                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + (GetDateFromServer(item.InvoiceDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceDate)) + "</td>"
                                + "<td class='PreviousDays' val='" + item.PreviousDays + "'>" + (item.PreviousDays == undefined ? "" : item.PreviousDays) + "</td>"
                                + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
                                + "<td class='ClientID' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == undefined ? item.ClientName : item.PartnerName) + "</td>"
                                + "<td class='VATNumber' val='" + item.TaxNumber + "'>" + (item.TaxNumber == undefined ? item.TaxNumber : item.TaxNumber) + "</td>"
                                + "<td class='ApprovingDate' val='" + GetDateFromServer(item.ApprovingDate) + "'>" + (item.ApprovingDate == undefined ? (GetDateFromServer(item.InvoiceSentDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceSentDate)) : (GetDateFromServer(item.ApprovingDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.ApprovingDate))) + "</td>"
                                + "<td class='FailedReason'>" + item.InvoiceStatus +" </td>"
                                //+ "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                                //+ "<td class='btn btn-xs btn-rounded btn-info float-right'>" + "<i class='fa fa-print' style='padding-left: 5px;''></i><a onclick='PrintKDLInvoice(" + item.ID + ",false,false);'> طباعة </a></td> "
                                + "<td class=''>" + "<a onclick='PrintKDLInvoice(" + (SentOrNotSent == 2 ? item.InvoiceID : item.ID)+ "," + item.IsTruckingInvoice +",false);' " + printControlsText + "</a></td>"//   + "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Email"' + ");' " + emailControlsText + "</a>"
                                //IsApproved, InvoiceDate,PartnerName,BranchName,InvoiceDate,InvoiceTypeName,CurrencyCode,Amount,TaxAmount,Items15PercTaxAmount,AmountWithoutVAT,InvoiceNumber,OperationCode,
                                + "</tr>"
                            ));
                }
                else
                    AppendRowtoTable("tblSL_Invoices",//Amount,AmountWithoutVAT,TaxPercentage,TaxAmount,InvoiceNumber,InvoiceDate
                        ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); ' style='" + (item.PreviousDays <= 7 ? "background-color: #c7ffc7;" : (item.PreviousDays <= 10 ? "background-color: #ffe0a8;" : (item.PreviousDays > 10 ? "background-color: #ffe0e0;" : ""))) + "'>"
                            + "<td class='ID'> <input name='Delete' type='checkbox'" + (item.IsApproved == true ? '' : 'disabled') + " value='" + item.ID + "' /></td>"
                            + "<td class='Serial'>" + (i + 1) + "</td>"
                            + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                            //+ "<td class='BillNo' val='" + item.BillNo + "'>" + item.BillNo + "</td>"
                            + "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
                            + "<td class='TotalBeforTax' val='" + item.AmountWithoutVAT + "'>" + addCommas(item.AmountWithoutVAT) + "</td>"
                            + "<td class='VATamount " + (GetInvoicesSentOrNotSent() == 1 ? "" : " hide") + "' val='" + ((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "'>" + addCommas((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "</td>"
                            + "<td class='SubmittedVATamount " + (GetInvoicesSentOrNotSent() == 2 ? "" : " hide") + "' val='" + ((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)) + "'>" + addCommas(((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)).toFixed(2)) + "</td>"
                            + "<td class='Amount' val='" + item.Amount + "'>" + addCommas(item.Amount) + "</td>"
                            + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                            + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
                            + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + (GetDateFromServer(item.InvoiceDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceDate)) + "</td>"
                            + "<td class='PreviousDays' val='" + item.PreviousDays + "'>" + (item.PreviousDays == undefined ? "" : item.PreviousDays) + "</td>"
                            + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
                            + "<td class='ClientID' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == undefined ? item.ClientName : item.PartnerName) + "</td>"
                            + "<td class='VATNumber' val='" + item.TaxNumber + "'>" + (item.TaxNumber == undefined ? item.TaxNumber : item.TaxNumber) + "</td>"
                            + "<td class='ApprovingDate' val='" + GetDateFromServer(item.ApprovingDate) + "'>" + (item.ApprovingDate == undefined ? (GetDateFromServer(item.InvoiceSentDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceSentDate)) : (GetDateFromServer(item.ApprovingDate) == "01/01/1900" ? "" : GetDateFromServer(item.ApprovingDate))) + "</td>"
                            + "<td class='FailedReason'> " + item.InvoiceStatus +"</td>"
                            //+ "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                            //+ "<td class='btn btn-xs btn-rounded btn-info float-right'>" + "<i class='fa fa-print' style='padding-left: 5px;''></i><a onclick='PrintKDLInvoice(" + item.ID + ",false,false);'> طباعة </a></td> "
                            + "<td class=''>" + "<a onclick='PrintKDLInvoice(" + (SentOrNotSent == 2 ? item.InvoiceID : item.ID) + "," + item.IsTruckingInvoice +",false);' " + printControlsText + "</a></td>"//   + "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Email"' + ");' " + emailControlsText + "</a>"
                            //IsApproved, InvoiceDate,PartnerName,BranchName,InvoiceDate,InvoiceTypeName,CurrencyCode,Amount,TaxAmount,Items15PercTaxAmount,AmountWithoutVAT,InvoiceNumber,OperationCode,
                            + "</tr>"
                        ));
            }
            else//Not Sent
            {
                $("#ApprovingDate_SendingDate").text("تاريخ الاعتماد ");
                AppendRowtoTable("tblSL_Invoices",//Amount,AmountWithoutVAT,TaxPercentage,TaxAmount,InvoiceNumber,InvoiceDate
                    ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); ' style='" + (item.PreviousDays <= 7 ? "background-color: #c7ffc7;" : (item.PreviousDays <= 10 ? "background-color: #ffe0a8;" : (item.PreviousDays > 10 ? "background-color: #ffe0e0;" : ""))) + "'>"
                        + "<td class='ID'> <input name='Delete' type='checkbox'" + (item.IsApproved == true ? '' : 'disabled') + " value='" + item.ID + "' /></td>"
                        + "<td class='Serial'>" + (i + 1) + "</td>"
                        + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                        //+ "<td class='BillNo' val='" + item.BillNo + "'>" + item.BillNo + "</td>"
                        + "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
                        + "<td class='TotalBeforTax' val='" + item.AmountWithoutVAT + "'>" + addCommas(item.AmountWithoutVAT) + "</td>"
                        + "<td class='VATamount " + (GetInvoicesSentOrNotSent() == 1 ? "" : " hide") + "' val='" + ((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "'>" + addCommas((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "</td>"
                        + "<td class='SubmittedVATamount " + (GetInvoicesSentOrNotSent() == 2 ? "" : " hide") + "' val='" + ((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)) + "'>" + addCommas(((item.Amount == null ? 0 : item.Amount) - (item.AmountWithoutVAT == null ? 0 : item.AmountWithoutVAT)).toFixed(2)) + "</td>"
                        + "<td class='Amount' val='" + item.Amount + "'>" + addCommas(item.Amount) + "</td>"
                        + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                        + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
                        + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + (GetDateFromServer(item.InvoiceDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceDate)) + "</td>"
                        + "<td class='PreviousDays' val='" + item.PreviousDays + "'>" + (item.PreviousDays == undefined ? "" : item.PreviousDays) + "</td>"
                        + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
                        + "<td class='ClientID' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == undefined ? item.ClientName : item.PartnerName) + "</td>"
                        + "<td class='VATNumber' val='" + item.VATNumber + "'>" + (item.VATNumber == undefined ? item.VATNumber : item.VATNumber) + "</td>"
                        + "<td class='ApprovingDate' val='" + GetDateFromServer(item.ApprovingDate) + "'>" + (item.ApprovingDate == undefined ? (GetDateFromServer(item.InvoiceSentDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.InvoiceSentDate)) : (GetDateFromServer(item.ApprovingDate) == "01/01/1900" ? "" : ConvertToDateTimeDMYT(item.ApprovingDate))) + "</td>"
                        + "<td class='FailedReason'> </td>"
                        //+ "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                        //+ "<td class='btn btn-xs btn-rounded btn-info float-right'>" + "<i class='fa fa-print' style='padding-left: 5px;''></i><a onclick='PrintKDLInvoice(" + item.ID + ",false,false);'> طباعة </a></td> "
                        + "<td class=''>" + "<a onclick='PrintKDLInvoice(" + item.ID + "," + item.IsTruckingInvoice +",false);' " + printControlsText + "</a></td>"//   + "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Email"' + ");' " + emailControlsText + "</a>"
                        //IsApproved, InvoiceDate,PartnerName,BranchName,InvoiceDate,InvoiceTypeName,CurrencyCode,Amount,TaxAmount,Items15PercTaxAmount,AmountWithoutVAT,InvoiceNumber,OperationCode,
                        + "</tr>"
                    ));
            }
           
        }

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function InvoiceSales_DrawReport(pOutputTo)
{
    debugger;
    var URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
    var invoiceModule = $("input[name='nameInvoiceModule']:checked").attr("value");

    if (invoiceModule == 1)
        URL = "/api/SendSalesInvoices/SearchByInvoiceNumber";
    else if (invoiceModule == 2)
        URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Trucking";
    else if (invoiceModule == 3)
        URL = "/api/SendSalesInvoices/SearchByInvoiceNumber_Sales";
    
    var strInvoiceModules = "";
    var strInvoiceModules = GetInvoiceModules();

    if (strInvoiceModules == "") { }
    else
        URL = "/api/SendSalesInvoices/SearchByInvoicesModules";
    var pWhereClause = GetWhereClause();
    var pControllerParameters = {
        WhereClause: pWhereClause,
        InvoiceModules: strInvoiceModules,
        pageNumber: 1,
        pageSize: 1000,
        OrderBy: " ID ASC" 
    };
    
    FadePageCover(true);
    CallGETFunctionWithParameters(URL, pControllerParameters//{ WhereClause: GetWhereClause(), pageNumber: 1, pageSize: 1000, OrderBy: " ID ASC" }
        , function (pData) {
            debugger;
            var pReportRows = JSON.parse(pData[0]);
            var pReportTitle = "فواتير المبيعات";
            var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
            var pTablesHTML = "";
            pTablesHTML += '                         <table id="tblvwTaxationOfSales" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
            pTablesHTML += '                                     <th>  م </th>';
            pTablesHTML += '                                     <th> رمز المعاملة</th>';
            pTablesHTML += '                                     <th> رقم الفاتورة</th>';
            pTablesHTML += '                                     <th>المبلغ قبل الضريبة </th>';
            pTablesHTML += '                                     <th>مبلغ الضريبة </th>';
            pTablesHTML += '                                     <th>المبلغ بعد الضريبة </th>';
            pTablesHTML += '                                     <th> العملة</th>';
            pTablesHTML += '                                     <th>نوع الفاتورة</th>';
            pTablesHTML += '                                     <th>تاريخ الفاتورة</th>';
            pTablesHTML += '                                     <th>الفرع</th>';
            pTablesHTML += '                                     <th>عميل</th>';
            pTablesHTML += '                                     <th>معتمد</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';

            $.each((pReportRows), function (i, item) {
                pTablesHTML += '<tr>';
                pTablesHTML += "    <td class='Serial'>" + (i+1) + "</td>";
                pTablesHTML += "    <td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>";
                pTablesHTML += "    <td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>";
                pTablesHTML += "    <td class='TotalBeforTax' val='" + item.AmountWithoutVAT + "'>" + item.AmountWithoutVAT + "</td>"
                pTablesHTML += "    <td class='TotalAfterTax' val='" + ((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "'>" + ((item.TaxAmount == null ? 0 : item.TaxAmount) + (item.Items15PercTaxAmount == null ? 0 : item.Items15PercTaxAmount)) + "</td>"
                pTablesHTML += "    <td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
                pTablesHTML += "    <td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>";
                pTablesHTML += "    <td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>";
                pTablesHTML += "    <td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>";
                pTablesHTML += "    <td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>";
                pTablesHTML += "    <td class='ClientID' val='" + item.OperationPartnerID + "'>" + item.PartnerName + "</td>";
                pTablesHTML += "<td class='IsApproved'> " + (item.IsApproved == true ? 'APPROVED' : 'NOT-APPROVED') + "</td>";
                //OperationCode InvoiceNumber TaxAmount Items15PercTaxAmount Amount CurrencyCode InvoiceTypeName InvoiceDate BranchName PartnerName IsApproved
                pTablesHTML += '</tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            pTablesHTML += '                         <table id="tblTaxTotals" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
            pTablesHTML += '                                     <th> الاجمالي قبل الضريبة  </th>';
            pTablesHTML += '                                     <th> قيمة الضريبة  </th>';
            pTablesHTML += '                                     <th> الاجمالي بعد الضريبة </th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            pTablesHTML += '                                <tr>';
            pTablesHTML += "                                <td class='AmountWithoutVAT' val='" + pData[2] + "'>" + pData[2] + "</td>";
            pTablesHTML += "                                <td class='TotalAmount' val='" + ((pData[3] == null ? 0 : pData[3]) + (pData[4] == null ? 0 : pData[4])) + "'>" + ((pData[3] == null ? 0 : pData[3]) + (pData[4] == null ? 0 : pData[4])) + "</td>"
            pTablesHTML += "                                <td class='TotalAmount' val='" + pData[5] + "'>" + pData[5] + "</td>"
            pTablesHTML += '                                </tr>';
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';


            $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
            if (pOutputTo == "Excel") {
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body id="" style="background-color:white;">';
                // ReportHTML += '<style> table>thead>th{font-size:11.0pt;color:white;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5;} </style>';
                ReportHTML += '         <div id="Reportbody">';
                ReportHTML += pTablesHTML;
                ReportHTML += '         </div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                ReportHTML += '     </footer>';

                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                // $("#Reportbody").tblToExcel(pReportTitle);
                // $("#Reportbody").tblToExcel("Account Ledger");

                $("#Reportbody").table2excel({
                    exclude: ".excludeThisClass",
                    name: "Sheet 1",
                    filename: "الإقرار الضريبي للمبيعات" //do not include extension
                });

            }
            else {
                debugger;
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body id="" style="background-color:white;">';
                ReportHTML += '         <div id="Reportbody">';
                ReportHTML += pTablesHTML;
                ReportHTML += '         </div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                ReportHTML += '     </footer>';
                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                if (pOutputTo == "PrintInReportBody")
                    $("#ReportBody").html(ReportHTML);
                else {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
            }

            FadePageCover(false);
        }, null);

}

function LoadDebitAndCreditData(OrderBy, ArrowId, PageNumber)
{
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SendDebitAndCredit/SearchByInvoiceNumber", { pPageNumber: 1, pPageSize: $('#select-page-size').val(), pWhereClause: GetWhereClauseDebitAndCredit() }
        , function (pData) { 
            debugger;
            FadePageCover(false);
            SendDebitAndCredit_BindTableRows(JSON.parse(pData[0]));
            
            $("#txt-TotalAmountBeforeTax").val(addCommas(parseFloat(pData[2]).toFixed(2)));
            $("#txt-TaxAmount").val(addCommas(parseFloat(pData[3]).toFixed(2) ));
            $("#txt-TotalAmountAfterTax").val(addCommas(parseFloat(pData[4]).toFixed(2)));

        }, null);
}
function LoadSubmittedDebitAndCreditData(OrderBy, ArrowId, PageNumber)
{
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SubmittedDebitAndCredit/SearchByInvoiceNumber", { pPageNumber: 1, pPageSize: $('#select-page-size').val(), pWhereClause: GetWhereClauseDebitAndCredit() }
    , function (pData) {
        debugger;
        FadePageCover(false);
        SubmittedDebitAndCredit_BindTableRows(JSON.parse(pData[0]));

        }, null);

}

function GetWhereClauseDebitAndCredit()
{
    debugger;
    var WhereClause = " Where 1=1 ";
    if ($("#slInvoiceType_Forwarding").val() != "0" && $("#slInvoiceType_Forwarding").val() != 0) {
        WhereClause += " AND InvoiceTypeID = " + $("#slInvoiceType_Forwarding").val();
    }
    if ($("#slBranch_Forwarding").val() != "0" && $("#slBranch_Forwarding").val() != 0) {
        WhereClause += "AND BranchName IN( SELECT ISNULL(NAME,'') FROM Branches AS b2 WHERE ID = " + $("#slBranch_Forwarding").val() + ")";
    }
    if ($("#slCurrency_Filter").val() != "0" && $("#slCurrency_Filter").val() != 0) {
        WhereClause += " AND CurrencyID = " + $("#slCurrency_Filter").val();
    }
    if ($("#slClients_Filter").val() != "0" && $("#slClients_Filter").val() != 0) {
        WhereClause += " AND ClientID = " + $("#slClients_Filter").val();
    }
    if ($('#txtFromDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , dateTimeIssued ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
    }
    if ($('#txtToDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , dateTimeIssued) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
    }
    if ($("#txt-SearchForwarding").val() != "") {
        WhereClause += " AND InvoiceNumber = " + $("#txt-SearchForwarding").val();
    }
    return WhereClause;
}
function SendDebitAndCredit_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item) {
        debugger;
        AppendRowtoTable("tblSL_Invoices",
            ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + "); '>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Serial'>" + (i + 1) + "</td>"
                + "<td class='OperationCode'></td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='AmountWithoutVAT' val='" + item.AmountWithoutVAT + "'>" + item.AmountWithoutVAT + "</td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + item.TaxAmount + "</td>"
                + "<td class='TotalAmount' val='" + item.TotalAmount + "'>" + item.TotalAmount + "</td>"
                + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                + "<td class='DebitOrCredit'>" + item.DebitOrCredit + "</td>"
                + "<td class='dateTimeIssued' val='" + GetDateFromServer(item.dateTimeIssued) + "'>" + GetDateFromServer(item.dateTimeIssued) + "</td>"
                + "<td class='PreviousDays'></td>"
                + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
                + "<td class='ClientID'>" + item.Supplier_ClientName + "</td>"
                + "<td class='VATNumber'>" + item.VATNumber + "</td>"
                + "<td class='ApprovingDate'></td>"
                + "<td class='SubmissionStatus'></td>"
                + "<td></td>"
            ));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function SubmittedDebitAndCredit_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item) {
        debugger;
        AppendRowtoTable("tblSL_Invoices",
            ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + "); '>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Serial'>" + (i + 1) + "</td>"
                + "<td class='OperationCode' val='" + item.OperationCode + "'>" + (item.OperationCode == undefined ? "" : item.OperationCode) + "</td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='AmountWithoutVAT' val='" + item.AmountWithoutVAT + "'>" + item.AmountWithoutVAT + "</td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + item.TaxAmount + "</td>"
                + "<td class='TotalAmount' val='" + item.TotalAmount + "'>" + item.TotalAmount + "</td>"
                + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                + "<td class='DebitOrCredit'>" + item.DebitOrCredit + "</td>"
                + "<td class='dateTimeIssued' val='" + GetDateFromServer(item.dateTimeIssued) + "'>" + GetDateFromServer(item.dateTimeIssued) + "</td>"
                + "<td class='PreviousDays'></td>"
                + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
                + "<td class='ClientID'>" + item.Supplier_ClientName + "</td>"
                + "<td class='VATNumber'>" + item.VATNumber + "</td>"
                + "<td class='InvoiceSentDate'>" + (GetDateFromServer(item.InvoiceSentDate) == '01/01/1900' ? "" : ConvertToDateTimeDMYT(item.InvoiceSentDate)) + "</td>"
                + "<td class='SubmissionStatus'>CLEARED</td>"
                + "<td></td>"
            ));


            //AppendRowtoTable("tblSL_Invoices",
            //    ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + "); '>"
            //        + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
            //        + "<td class='ClientID'>" + item.ClientName + "</td>"
            //        + "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
            //        + "<td class='TotalBeforTax hide' val='" + item.AmountWithoutVAT + "'>" + item.AmountWithoutVAT + "</td>"
            //        + "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
            //        + "<td class='InvoiceStatus'>" + item.Invoice Status + "</td>"
            //        + "<td class='FailedReason'> </td>"
            //        + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
            //        + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
            //        + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
            //        + "<td class='InvoiceSentDate'>" + (GetDateFromServer(item.InvoiceSentDate) == '01/01/1900' ? "" : GetDateFromServer(item.InvoiceSentDate)) + "</td>"
            //        + "<td class='CreationUserName' val='" + item.CreationUserName + "'>" + (item.CreationUserName == "0" ? "" : item.CreationUserName) + "</td>"
            //        + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"
            //        + "</tr>"
            //    ));


    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function ConvertToDateTimeDMYT(inputDate) {
    if (inputDate == undefined || inputDate == "undefined" || inputDate == "" || inputDate == null) { return GetDateFromServer(inputDate) }
    else {
        let dateString = inputDate;// '/Date(1732711689000)/';

        // Extract the timestamp using a regular expression
        let timestamp = parseInt(dateString.match(/\d+/)[0], 10);

        // Convert the timestamp to a Date object
        let date = new Date(timestamp);

        // Format the date manually
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let seconds = String(date.getSeconds()).padStart(2, '0');
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format

        let formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
        console.log(formattedDate);
        return formattedDate;
    }
}