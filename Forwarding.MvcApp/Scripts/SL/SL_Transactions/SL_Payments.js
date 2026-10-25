//Start Auto Filter
$(document).ready(function () {
    $("#slAccount").css({ "width": "100%" }).select2();
    $("#slSearchClient").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    debugger;
    var WhereClause = "Where 1=1";
    strLoadWithPagingFunctionName = "/api/SL_Payments/LoadWithPaging";
    LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim()
        , function (pTableRows) {
            $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());
            Payments_BindTableRows(pTableRows);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

        });
});
//End Auto Filter


function Payments_BindTableRows(pPayments) {
    debugger;


    Fill_SelectInput("/api/SL_Payments/LoadAllCurrencyByName", "ID", "Code", TranslateString("SelectFromMenu"), "#slHideCurrency", "");
   // GetListWithCurrency(null, "/api/SL_Payments/LoadAllCurrencyByName", "not null", "slHideCurrency");

   
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' ></i> <span >" + "Copy" + "</span>";

    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    ClearAllTableRows("tblPayments");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pPayments, function (i, item) {
        AppendRowtoTable("tblPayments",
            //("<tr ID='" + item.ID + "' ondblclick='Payments_FillControls(" + item.ID + ");'>"
            //("<tr ID='" + item.ID + "'>"
            ("<tr>"
                    //+ "<td class='ID'> <input " + (item.Approved ? " disabled='disabled'" : "name='Delete'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='PaymentDate '>" + GetDateWithFormatMDY(item.PaymentDate) + "</td>"
                    + "<td class='ClientID' val='" + item.ClientID + "'>" + item.Name + "</td>"
                    + "<td class='TotalPayment' >" + item.TotalPayment + "</td>"
                    //+ "<td class='UserID' val='" + item.UserID + "'>" + item.Username + "</td>"
                     + "<td class='CashCode'>" + (item.CashCode == 0 ? "" : item.CashCode) + "</td>"
                    + "<td class='chequeCode'>" + (item.chequeCode == 0 ? "" : item.chequeCode) + "</td>"
                    + "<td class='Notes' >" + item.Notes + "</td>"
                    + "<td class='Print'><a href='' data-toggle='modal' onclick='Payment_Print(" + item.ID + ");' class='btn btn-xs btn-rounded btn-lightblue float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print</span></a></td>"
                    //+ "<td class=' " + ($("#hf_CanAdd").val() == 1 ? "" : " hide ") + "'><a data-toggle='modal' onclick='Payments_Copy(" + item.ID + ");' " + copyControlsText + "</a></td>"
                   + "<td class='hide'><a href='#PaymentsModal' data-toggle='modal' onclick='Payments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPayments", "ID");
    CheckAllCheckbox("ID");

    Users_GetList("null", "null")

   

    //HighlightText("#tblPayments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function Users_GetList(pYearID, pSelectTxt) {
    debugger;
    GetListWithUsers(pYearID, "/api/SL_Payments/LoadAllUsersByName", pSelectTxt, "slUserID");
}

function PaymentsSearch_LoadingWithPaging(pPageNo, pPageSize) {
    debugger;
    $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());
    var pWhereClause = "";
    if ($("#txtSearchCode").val().trim() == "" && $("#txtsearchPaymentDate").val().trim() == "" && $("#txtsearchClientID").val().trim() == "" && $("#txtsearchPaymentNotes").val().trim() == "") {
        pWhereClause = " Code LIKE N'%" + "" + "%' "
                    + " OR PaymentDate = '" + "'"
                    + " OR Name LIKE N'%" + "" + "%' "
                    + " OR Notes LIKE N'%" + "" + "%' ";
    } else {
        pWhereClause = " Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
                    + " And PaymentDate = '" + ConvertDateFormat(getTodaysDateInddMMyyyyFormat()) + "'"
                    + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
                    + " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
    }

    FadePageCover(true);
    $(".btn-Options").addClass("hide");
    LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/SL_Payments/LoadWithPaging", pWhereClause, pPageNo, pPageSize, function (pTableRows) { Payments_BindTableRows(pTableRows); });
}

function BillNoSearch()
{
    debugger;
    if ($("#txtBillNo").val() != "") {
        //$('#select2-slSearchClient-container').prop('disabled', false);
        $("#txtInvoiceSerialSearch").val("");
        $("#txtClientName").val("");
        $("#slSearchClient").removeAttr("disabled");
        var pWhereClause = " where BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
                        
        Clients_GetList(pWhereClause, "not null");
        setTimeout(function () {
            $("#slSearchClient").change();
        }, 300);
       
    }
}
var pCurrencyIDNew = 0;
function InvoiceSerialSearch() {
    pCurrencyIDNew = 0
    pClientIDNew = 0;
    debugger;
    if ($("#txtInvoiceSerialSearch").val().trim() != "") {
        var pWhereClause = " Where InvoiceNo = N'" + $("#txtInvoiceSerialSearch").val().trim() + "' ";


        // + " OR PaymentDate LIKE N'%" + $("#txtsearchPaymentDate").val().trim() + "%' "
        // + " OR Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
        // + " OR Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
        //+ " OR Username LIKE N'%" + $('#slsearchUserID option:selected').val() + "%' ";
        debugger;
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, 1, $('#select-page-size').val().trim(), function (pTableRows) {
            counter = 1;
            pCurrencyIDNew = pTableRows.length > 0 ? (pTableRows)[0].CurrencyID : 0;
            pClientIDNew = pTableRows.length > 0 ? (pTableRows)[0].ClientID : 0;

            Currency_GetListnew(pTableRows.length > 0 ? (pTableRows)[0].CurrencyID : null, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");

            PaymentsSearchInvoices_BindTableRows(pTableRows);

            $("#slSearchClient").val(pClientIDNew);
            //Start Auto Filter
            $("#slSearchClient").trigger("change");

            //End Auto Filter
            // Clients_GetList(pWhereClause, "not null");
            /////////////Fill DebitCreditNote
            var pWhereClauseDC = "";
            if (pClientIDNew != 0 && pCurrencyIDNew != 0 && $("#txtIDCNotesSerialSearch").val().trim() != "") {
                pWhereClauseDC = " Where Serial ='" + $("#txtIDCNotesSerialSearch").val().trim() + "' ";
                pWhereClauseDC += " AND ClientID = " + pClientIDNew;
                pWhereClauseDC += " AND CurrencyID = " + pCurrencyIDNew;
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
            }
            else {
                pWhereClauseDC = " Where Serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
                pWhereClauseDC += " AND ClientID = " + pClientIDNew;
                pWhereClauseDC += " AND CurrencyID = " + pCurrencyIDNew;
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

            }
        });

        // Currency_GetList(pCurrencyIDNew, "not null");
        $("#slSearchCurrency").removeAttr("disabled");
    }
    else {
        var pWhereClause = " Where InvoiceNo = N'" + $("#txtInvoiceSerialSearch").val().trim() + "' ";

        counter = 1;
        pWhereClause += " AND ClientID = " + $("#slSearchClient").val();
        pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
        // + " OR PaymentDate LIKE N'%" + $("#txtsearchPaymentDate").val().trim() + "%' "
        // + " OR Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
        // + " OR Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
        //+ " OR Username LIKE N'%" + $('#slsearchUserID option:selected').val() + "%' ";
        debugger;
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, 1, $('#select-page-size').val().trim(), function (pTableRows) {

            //pCurrencyIDNew = 0;
            pCurrencyIDNew = $("#slSearchCurrency").val().trim();
            Currency_GetListnew(pCurrencyIDNew, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");
            //Clients_GetList(pCurrencyIDNew, "null");
            //$("#slSearchCurrency").val("");
            PaymentsSearchInvoices_BindTableRows(pTableRows);


            /////////////Fill DebitCreditNote
            var pWhereClauseDC = "";

            if ($("#slSearchClient").val().trim() != "" && $("#slSearchCurrency").val().trim() != "" && $("#txtIDCNotesSerialSearch").val().trim() != "") {
                pWhereClauseDC = " Where Serial ='" + $("#txtIDCNotesSerialSearch").val().trim() + "' ";
                pWhereClauseDC += " AND ClientID = " + $("#slSearchClient").val();
                pWhereClauseDC += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
            }
            else {
                pWhereClauseDC = " Where Serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
                pWhereClauseDC += " AND ClientID = " + $("#slSearchClient").val();
                pWhereClauseDC += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

            }

        });

        //Clients_GetList(pWhereClause, "not null");
        // Currency_GetList(pCurrencyIDNew, "not null");
        $("#slSearchCurrency").removeAttr("disabled");
    }

}
function InvoiceDbtCrdtNotesSerialSearch() {
    debugger;
    var pWhereClause = "";
    var pWhereClauseDbtCrdtNotes = "";
    var pWhereClause2 = " Where InvoiceNo LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
    if ($("#txtInvoiceSerialSearch").val().trim() == "" && $("#slSearchClient").val() == 0) {
        pWhereClauseDbtCrdtNotes = " Where serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
        ClearAllTableRows("tblInvoices");
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDbtCrdtNotes, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) {
            pCurrencyIDNew = (pTableRows)[0].CurrencyID;
            Currency_GetListnew((pTableRows)[0].CurrencyID, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");
            PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows);
        });
        Clients_GetList(pWhereClause2, "not null");
    }    
}

function ClientNameSearch() {
    debugger;
    if ($("#txtClientName").val() != "") {
        $("#txtBillNo").val("");
        $("#txtInvoiceSerialSearch").val("");
        $("#slSearchClient").removeAttr("disabled");
        $("#slSearchCurrency").attr("disabled", "disabled");
        var pWhereClause = " where Name LIKE N'%" + $("#txtClientName").val().trim() + "%' ";
        Clients_GetList(pWhereClause, "null");
    }
}

$("#txtPaymentDate").datepicker().on('changeDate'
       , function () {
           if ($("#slSearchCurrency option:selected").val() != "")
           {
               GetDefaultExchangeRate()
           }
       });
function GetDefaultExchangeRateNew() {
    debugger;
    var CurrencyID = pCurrencyIDNew;

    var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
    + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
    + " AND ID = " + CurrencyID
    + " ORDER BY CODE"
  );
    GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
 , null/*1st Row*/
 , whereCondition
 , function (pData) {
     debugger;
     $("#txtInvoicesExchangeRate").val(pData);
     $("#txtInvoicesExchangeRate").removeAttr("disabled");
 });
}
function GetDefaultExchangeRate()
{
    debugger;
    var CurrencyID = $("#slSearchCurrency option:selected").val();

    var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
    + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
    + " AND ID = " + CurrencyID
    + " ORDER BY CODE"
  );
    GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
 , null/*1st Row*/
 , whereCondition
 , function (pData) {
     debugger;
     $("#txtInvoicesExchangeRate").val(pData);
     $("#txtInvoicesExchangeRate").removeAttr("disabled");
 });
}

function Payments_LoadingWithPaging() {
    debugger;

    debugger;
    //var pWhereClause = SL_Payment_GetWhereClause();
    //var pPageSize = $('#select-page-size').val();
    //var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());

    ////var pOrderBy = "ID DESC";
    //var pOrderBy;
    //pOrderBy = "ID DESC";

    //var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Payments_BindTableRows(JSON.parse(pData[0])); });


    //LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/SL_Payments/LoadWithPaging", pWhereClause, "1", $('#select-page-size1').val().trim(), function (pTableRows) { Payments_BindTableRows(pTableRows); });


    var WhereClause = "Where 1=1";
    strLoadWithPagingFunctionName = "/api/SL_Payments/LoadWithPaging";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim()
        , function (pTableRows) {
            $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());
            Payments_BindTableRows(pTableRows);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

        });

}
function SL_Payment_GetWhereClause() {
    debugger;
    var pWhereClause = "where 1=1";
    if ($("#txtSearchCode").val().trim() != "") {
        pWhereClause += "and Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
    }
    if ($("#txtsearchPaymentDate").val().trim() != "") {
        pWhereClause += " And PaymentDate = '" + ConvertDateFormat($("#txtsearchPaymentDate").val().trim()) + "'"
    }
    if ($("#txtsearchClientID").val().trim() != "") {
        pWhereClause += " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
    }
    if ($("#txtsearchPaymentNotes").val().trim() != "") {
        pWhereClause += " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' "
    }
    //if ($("#txtsearchVouchercash").val().trim() != "") {
    //    pWhereClause += " And CashCode LIKE N'%" + $("#txtsearchVouchercash").val().trim() + "%' "
    //}
    //if ($("#txtsearchVouchercheque").val().trim() != "") {
    //    pWhereClause += " And chequeCode LIKE N'%" + $("#txtsearchVouchercheque").val().trim() + "%' ";
    //}
    //var pWhereClause = "";
    //if ($("#txtSearchCode").val().trim() == "" && $("#txtsearchPaymentDate").val().trim() == "" && $("#txtsearchClientID").val().trim() == "" && $("#txtsearchPaymentNotes").val().trim() == "" && $("#txtsearchVouchercash").val().trim() == "" && $("#txtsearchVouchercheque").val().trim() == "") {
    //    pWhereClause = "where Code LIKE N'%" + "" + "%' "
    //                + " OR PaymentDate = '" + "'"
    //                + " OR Name LIKE N'%" + "" + "%' "
    //                + " OR Notes LIKE N'%" + "" + "%' ";
    //} else if ($("#txtsearchPaymentDate").val() != "") {
    //    pWhereClause = " where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
    //                + " And PaymentDate = '" + ConvertDateFormat($("#txtsearchPaymentDate").val().trim()) + "'"
    //                + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
    //                + " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' "
    //                + " And CashCode LIKE N'%" + $("#txtsearchVouchercash").val().trim() + "%' "
    //                + " And chequeCode LIKE N'%" + $("#txtsearchVouchercheque").val().trim() + "%' ";
    //}
    //else if ($("#txtsearchVouchercash").val() != "") {
    //    pWhereClause = "where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
    //                + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
    //                + " And CashCode LIKE N'%" + $("#txtsearchVouchercash").val().trim() + "%' ";
    //}

    //else if ($("#txtsearchVouchercheque").val() != "") {
    //    pWhereClause = "where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
    //                + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
    //                + " And chequeCode LIKE N'%" + $("#txtsearchVouchercheque").val().trim() + "%' ";
    //}
    //else {
    //    pWhereClause = "where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
    //                + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
    //                + " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
    //}
    return pWhereClause;
}
function Payments_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayments', 'Delete') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            debugger
            var PaymentIDs = GetAllSelectedIDsAsString('tblPayments', 'Delete');

            DeleteListFunction("/api/SL_Payments/Delete", { "pPaymentIDs": PaymentIDs }, function () { Payments_LoadingWithPaging(); });
        });
 }

function Payments_ClearAllControls() {
    pCurrencyIDNew = 0;
    $("#txtBillNo").val("");
    $("#txtInvoiceSerialSearch").val("");
    $("#txtIDCNotesSerialSearch").val("");
    $("#slSearchClient").empty();
  //  $("#slSearchClient").attr("disabled", "disabled");
    $("#slSearchCurrency").empty();
    $("#slSearchCurrency").attr("disabled", "disabled");
    $("#txtClientName").val(""); 

    $("#txtBankChargesAmount").val("0");
    $("#txtRefundAmount").val("0");
    $('#slBankChargesCurrency option:selected').val("-1");
    $('#slRefundCurrency option:selected').val("-1");

    $("#txtPaymentDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtPaymentDate").removeClass('validation-error');
    
    $("#txtInvoicesExchangeRate").val("");
    $("#txtInvoicesExchangeRate").removeClass('validation-error');
    $("#txtInvoicesExchangeRate").attr("disabled", "disabled");

    $("txtInvoiceSerialSearch").val("");
    
    $("#DivSlClientGroup").addClass('hide');
    counter = 0;
    TotalCost = 0;
    TotalPaid = 0;

    $("#txtTotalCost").val("");
    $("#txtTotalPaid").val("");
}

AutoComplete();
var strDateFormat = 'dd/mm/yyyy';

function Search_Init() {
    debugger;
    Payments_ClearAllControls();
    //if ($("#slHideCurrency").html() != "" && $("#slHideBanks").html() != "" && $("#slHideSafes").html() != "") {
    if ($("#slHideCurrency").html() != "") {
        //document.documentElement.scrollTop = 0;
        jQuery("#PaymentsModal").modal("show");

    ClearAllTableRows("tblCheque");
    ClearAllTableRows("tblCash");
    ChequeRows = 1;
    CashRows = 1;
    debugger;
    //setTimeout(function () {
        Cash_BindTableRows();
        Cheque_BindTableRows(); 
       // GetListComboWithName(null, "/api/TaxeTypes/LoadAll", "not null", "slCashTax1", "ID", "Name");
       // GetListComboWithName(null, "/api/TaxeTypes/LoadAll", "not null", "slChequeTax1", "ID", "Name");
        //LoadAll(string pOrderBy)
        $.ajax({
            type: "GET",
            url: strServerURL + "/api/TaxeTypes/LoadAll",
            data: { pOrderBy: " ID "},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                //IntializeData()
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slCashTax1', '');
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slChequeTax1', '');

            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });





    //}, 1500);
        // GetListComboWithName(null, "/api/Taxes/LoadAll", "not null", "slCashTax", "ID", "Name");$('#slSearchCurrency').change(function () {

       // var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
        var pWhereClause = "";

    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { debugger; PaymentsSearchInvoices_BindTableRows(pTableRows); });
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { debugger; PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
    var pWhereClause="where 1=1"
    $.ajax({
        type: "GET",
            url: strServerURL + "api/SL_Invoices/IntializeData",
            data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slSearchClient', '');

        }
    });
    }
}

function GetListCurrencyWithCodeAndExchangeRate(pID, pStrFnName, pStrFirstRow, pWhereClauseCurrencyDetails, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClauseCurrencyDetails: pWhereClauseCurrencyDetails },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(JSON.parse(data[0]), function (i, item) {
                if (callback != null && callback != undefined) //the data here is bool(pRecordsExist) and used as a flag for no records in reports //for Generate_MAWBs then data is string(return empty string if OK and returns MAWBSuffix if exists)
                    callback(item.ExchangeRate);
                FadePageCover(false);

            });
            if (JSON.parse(data[0]).length == 0) {
                if (callback != null && callback != undefined) //the data here is bool(pRecordsExist) and used as a flag for no records in reports //for Generate_MAWBs then data is string(return empty string if OK and returns MAWBSuffix if exists)
                    callback(0);
            }
        },
        error: function (jqXHR, exception) {
            FadePageCover(false);
            swal("Oops!", "Please, contact your technical support! GetListCurrencyWithCodeAndExchangeRate in mainapp.master.js", "error");
        }
    });
}







function PaymentsSearchInvoices_BindTableRows(pInvoices) {
    ClearAllTableRows("tblInvoices");
    $("#txtTotalCost").val("");
    TotalCost = 0;

    $.each(pInvoices, function (i, item) {
        debugger;
        AppendRowtoTable("tblInvoices",
        ("<tr Invoiceid='" + item.ID + "' class='" + ((item.IsDeleted == true) ? "deleted-row" : "") + "'>"
                    + "<td class='InvoiceID' hidden>" + item.ID + "</td>"
                    + "<td class='InvoiceNoManual'>" + item.InvoiceNoManual + "</td>"
                    + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                    + "<td class='InvoiceNo text-overflow-150' title='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                    + "<td class='ClientName text-overflow-150' title='" + item.ClientName + "'>" + item.ClientName + "</td>"
                    + "<td class='TotalPrice align-right' style='text-align: right;'>" + item.Currency + " " + item.TotalPrice + "</td>"
                    + "<td class='PaidAmount'>" + item.PaidAmount + "</td>"
                    + "<td class='RemainAmount'>" + item.RemainAmount + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'  disabled='disabled' type='text' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='AmountOnly' hidden >" + item.Qty + "</td>"
                    + "<td class='AmountTextCurrency' hidden >" + item.Currency + "</td>"
                    + "<td class='Choose'> <input id='txtChoose' type='checkbox' disabled onchange='SelectRowInTable(" + i + ");'/></td>"
                    + "</tr>"));

        //if ($("#slSearchCurrency").val() != "-1" && $("#slSearchCurrency").val() != 0 && $("#slSearchCurrency").val() != null || pCurrencyIDNew != 0) {
        //    $($('#tblInvoices tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
        //}
        if ($("#slSearchCurrency").val() != "-1" && $("#slSearchCurrency").val() != 0 && $("#slSearchCurrency").val() != null || pCurrencyIDNew != 0) {
            $($('#tblInvoices tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
        }
    
    });
    setTimeout(function () {
        FillItemsData();
        //  PS_HideShowEditBtns(_IsApproved);
    }, 300);
}
    function PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pInvoices) {
        ClearAllTableRows("tblInvoicesDbtCrdtNotes");
        $("#txtTotalCost").val("");
        TotalCost = 0;

        $.each(pInvoices, function (i, item) {
            debugger;
            AppendRowtoTable("tblInvoicesDbtCrdtNotes",
            ("<tr InvoiceID='" + item.ID + "' class='" + ((item.IsDeleted == true) ? "deleted-row" : "") + "'>"
                        + "<td class='InvoiceID' hidden>" + item.ID + "</td>"
                        + "<td class='Serial'>" + item.Serial + "</td>"
                        + "<td class='IsDbt' val='" + item.IsDbt + "'>" + IsDefault_GetICON(item.IsDbt) + "</td>"
                        //+ "<td class='InvoiceType hide'>" + item.InvoiceTypeName + "</td>"
                        //+ "<td class='IsFreightInvoice hide'>" + (item.IsFreightInvoice ? 1 : 0) + "</td>"
                        //+ "<td class='IsStorageInvoice hide'>" + (item.IsStorageInvoice ? 1 : 0) + "</td>"
                        //+ "<td class='IsDemurrageInvoice hide'>" + (item.IsDemurrageInvoice ? 1 : 0) + "</td>"
                       // + "<td class='InvoiceNo'>" + item.InvoiceNo + "</td>"
                        + "<td class='DbtCrdtNoteDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DbtCrdtNoteDate)) + "</td>"
                        + "<td class='InvoiceNo text-overflow-150' title='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                        + "<td class='ClientName text-overflow-150' title='" + item.ClientName + "'>" + item.ClientName + "</td>"
                        //+ "<td class='VesselName text-overflow-150' title='" + item.VesselName + "'>" + item.VesselName + "</td>"
                      //  + "<td class='VoyageNumber text-overflow-150' title='" + item.VoyageNumber + "'>" + item.VoyageNumber + "</td>"
                       // + "<td class='IsAudited' val='" + item.IsAudited + "'>" + IsDefault_GetICON(item.IsAudited) + "</td>"
                      //  + "<td class='IsPaid' val='" + item.IsPaid + "'>" + IsDefault_GetICON(item.IsPaid) + "</td>"
                      //  + "<td class='PortCode'>" + item.PortCode + "</td>"
                        //+ "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                        + "<td class='TotalAmount align-right' style='text-align: right;'>" + item.Currency + " " + item.TotalAmount + "</td>"
                        + "<td class='PaidAmount'>" + item.PaidAmount + "</td>"
                        + "<td class='RemainAmount'>" + item.RemainAmount + "</td>"
                       // + "<td class='TotalPrice align-right' style='text-align: right;'>" + item.TotalPrice + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'  disabled='disabled' type='text' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"

                + "<td class='AmountOnly' hidden >" + item.Qty + "</td>"
                + "<td class='AmountTextCurrency' hidden >" + item.Currency + "</td>"
                        + "<td class='Choose'> <input id='txtChoose' type='checkbox' disabled onchange='SelectRowInTableDCNotes(" + i + ");'/></td>"
                        //+ "<td class='Remarks'>" + item.Remarks + "</td>"
                        + "</tr>"));

            //if (CurrencyID != "") {
            //    $($('#tblInvoicesDbtCrdtNotes tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
            //}
            if ($("#slSearchCurrency").val() != "-1" && $("#slSearchCurrency").val() != 0 && $("#slSearchCurrency").val() != null || pCurrencyIDNew !=0) {
                $($('#tblInvoicesDbtCrdtNotes tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
            }
        });
        setTimeout(function () {
            FillItemsData();
            //  PS_HideShowEditBtns(_IsApproved);
        }, 300);
    debugger;
    if (CurrencyID == "" && pCurrencyIDNew ==0) {
        Currency_GetList(null, "null");
    } else {
        //Currency_GetList(CurrencyID, "null");
        CurrencyID = "";

    }

  
  

    BindAllCheckboxonTable("tblInvoicesDbtCrdtNotes", "InvoiceID");
    CheckAllCheckbox("ID");
    FadePageCover(false);
    }

    function FillItemsData() {
        $($('#tblInvoices > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        });
        $($('#tblInvoicesDbtCrdtNotes > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        });
        //setTimeout(function () {
        //    CalculateAll();
        //}, 30);
    }
    var TotalPaid = 0;
    function CalculateAll() {
        debugger
        var discount
        TotalPaid = 0;
        $($('#tblInvoices > tbody > tr')).each(function (i, tr) {
            if ($($('#tblInvoices tbody tr')[i]).find('#txtChoose').is(":checked")) {
                debugger;
                if (parseFloat($(tr).find('td.Qty').find('.input_quantity').val()) > parseFloat($(tr).find('td.RemainAmount').text())) {
                    swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
                    return false;
                }
                TotalPaid += $(tr).find('td.Qty').find('.input_quantity').val() * 1;
            }
        });
        $($('#tblInvoicesDbtCrdtNotes > tbody > tr')).each(function (i, tr) {
            if ($($('#tblInvoicesDbtCrdtNotes tbody tr')[i]).find('#txtChoose').is(":checked")) {
                debugger;
                if ($(tr).find('td.Qty').find('.input_quantity').val() > $(tr).find('td.RemainAmount').text()) {
                    swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
                    return false;
                }
              //  TotalPaid += $(tr).find('td.Qty').find('.input_quantity').val() * 1;
                if ($(tr).find("td.IsDbt").attr('val') == "false") {
                    TotalPaid += $(tr).find('td.Qty').find('.input_quantity').val() * 1;

                }
                else {
                    TotalPaid -= $(tr).find('td.Qty').find('.input_quantity').val() * 1;
                }
            }
        });


        $("#txtTotalPaid").val(TotalPaid);

}

//function chSearchClient()
//{
//    debugger;
//    if ($("#slSearchClient").val() != "") {
//        $("#slSearchCurrency").removeAttr("disabled");
//    } else {
//        $("#slSearchCurrency").attr("disabled", "disabled");
//    }

//    var pWhereClause = "";
//    if ($("#txtBillNo").val().trim() != "" && $("#txtInvoiceSerialSearch").val().trim() != "") {
//        pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%'"
//                         + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim()
//                         + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
//    } else if ($("#txtBillNo").val().trim() != "") {
//        pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%'"
//                     + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
//    } else if ($("#txtInvoiceSerialSearch").val().trim() != "") {
//        pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%'"
//                     + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim();
//    } else
//        pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%'";

//    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
//    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });


//}
    var counter = 0;

    function chSearchClient() {
        //$('#slSearchClient').change(function () {
        debugger;
        if ($("#slSearchClient").val() != "") {
            $("#slSearchCurrency").removeAttr("disabled");
        } else {
            $("#slSearchCurrency").attr("disabled", "disabled");
        }
        if (counter == 0) {
            $("#txtInvoiceSerialSearch").val("");
            $("#txtIDCNotesSerialSearch").val("");

            var pWhereClause = "";
            if ($("#txtBillNo").val().trim() != "" && $("#txtInvoiceSerialSearch").val().trim() != "") {
                //  pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text() == "Select Client" ? "" : $("#slSearchClient option:selected").text()) + "'"
                pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%' "
                                 + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim()
                                 + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
            } else if ($("#txtBillNo").val().trim() != "") {
                pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%' "
                             + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
            } else if ($("#txtInvoiceSerialSearch").val().trim() != "") {
                pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%' "
                             + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim();
            } else
                pWhereClause = " Where ClientName LIKE N'%" + ($("#slSearchClient option:selected").text().trim() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%' ";

            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
            LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

        }

    }
//});
var TotalCost = 0;
var InvoicesExchangeRate = 0;
function SelectRowInTable(pRowIndex) {   
    debugger;
    if (($($('#tblInvoices tbody tr')[pRowIndex]).find('#txtChoose').is(":checked"))) {
        $($('#tblInvoices tbody tr')[pRowIndex]).find('.input_quantity').removeAttr("disabled");
    }
    else {
        
        $($('#tblInvoices tbody tr')[pRowIndex]).find('.input_quantity').attr("disabled", "disabled");
    }
    //.removeClass('red')
    if ($("#txtPaymentDate").val() != "") {
        if ($($('#tblInvoices tbody tr')[pRowIndex]).find('#txtChoose').is(":checked")) {
            $("#tblInvoices tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "#00c7f7"); //#fd7979 #ccc
            TotalCost += parseFloat($($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text());

            InvoicesExchangeRate = 0;
            if ($("#txtPaymentDate").val() != "") {
                $("#txtPaymentDate").removeClass('validation-error');
                var CurrencyID = $("#slSearchCurrency option:selected").val()

                var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " AND ID = " + CurrencyID
                + " ORDER BY CODE"
              );
                GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
             , null/*1st Row*/
             , whereCondition
             , function (pData) {
                 debugger;
                 InvoicesExchangeRate = pData;
             });
            }
        } else {
            $("#tblInvoices tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "white");
            TotalCost -= parseFloat($($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text());
        }
        $("#txtTotalCost").val(TotalCost + " " + $($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountTextCurrency').text());
    } else {
        $($('#tblInvoices tbody tr')[pRowIndex]).find('#txtChoose').prop("checked", false);
        swal("Error", "Please, Enter Payment Date");
        $("#txtPaymentDate").addClass('validation-error');
    }
    CalculateAll();
}

function SelectRowInTableDCNotes(pRowIndex) {
    debugger;
    if (($($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('#txtChoose').is(":checked"))) {
        $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.input_quantity').removeAttr("disabled");
    }
    else {

        $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.input_quantity').attr("disabled", "disabled");
    }
    //.removeClass('red')
    if ($("#txtPaymentDate").val() != "") {
        if ($($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('#txtChoose').is(":checked")) {
            $("#tblInvoicesDbtCrdtNotes tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "#00c7f7"); //#fd7979 #ccc
            TotalCost += parseFloat($($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.AmountOnly').text());

            InvoicesExchangeRate = 0;
            if ($("#txtPaymentDate").val() != "") {
                $("#txtPaymentDate").removeClass('validation-error');
                var CurrencyID = $("#slSearchCurrency option:selected").val()

                var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " AND ID = " + CurrencyID
                + " ORDER BY CODE"
              );
                GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
             , null/*1st Row*/
             , whereCondition
             , function (pData) {
                 debugger;
                 InvoicesExchangeRate = pData;
             });
            }
        } else {
            $("#tblInvoicesDbtCrdtNotes tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "white");
            TotalCost -= parseFloat($($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.AmountOnly').text());
        }
        $("#txtTotalCost").val(TotalCost + " " + $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('.AmountTextCurrency').text());
    } else {
        $($('#tblInvoicesDbtCrdtNotes tbody tr')[pRowIndex]).find('#txtChoose').prop("checked", false);
        swal("Error", "Please, Enter Payment Date");
        $("#txtPaymentDate").addClass('validation-error');
    }
    CalculateAll()
}

var CurrencyID = "";
function chSearchCurrency()
{
    debugger;
    if ($("#slSearchCurrency option:selected").val() != "" && $("#txtPaymentDate").val() != "") {
        GetDefaultExchangeRate();
    }
    $("#txtInvoiceSerialSearch").val("");
    $("#txtIDCNotesSerialSearch").val("");
    if ($("#slSearchClient option:selected").text() != "Select Client" && $("#slSearchCurrency option:selected").val() != "") {
        //var pWhereClause = " Where ClientName = '" + ($("#slSearchClient option:selected").text() == "Select Client" ? "" : $("#slSearchClient option:selected").text()) + "'"
        //                 + " And Currency = '" + $("#slSearchCurrency option:selected").text() + "'";
        var pWhereClause = " Where ClientID = '" + ($("#slSearchClient option:selected").val() == "Select Client" ? "" : $("#slSearchClient option:selected").val()) + "'"
                      + " And Currency = '" + $("#slSearchCurrency option:selected").text().trim() + "'";
        CurrencyID = $("#slSearchCurrency option:selected").val();
        loadWithPagingWithParmWhere(pWhereClause);
    } else if ($("#slSearchCurrency option:selected").val() == "") {
        var pWhereClause = " Where ClientID LIKE N'%" + ($("#slSearchClient option:selected").val() == "Select Client" ? "" : $("#slSearchClient option:selected").val().trim()) + + "%' "
        loadWithPagingWithParmWhere(pWhereClause);
    } else {
        var pWhereClause = " Where Currency LIKE N'%" + $("#slSearchCurrency option:selected").text().trim() + + "%' ";
        loadWithPagingWithParmWhere(pWhereClause);
    }
    //GetListWithBankByCurrencyID("1", "/api/SL_Payments/LoadAllBanksByName", "null", "slHideBanks");
    Safes_GetList(CurrencyID, "null");
    Banks_GetList(CurrencyID, "null");
}

function SearchInvoice_Click() {
    debugger;
    var ClientName = "";
    var currency = $("#slSearchCurrency option:selected").val() != "" ? $("#slSearchCurrency option:selected").text() : "";
    var ClientName1 = $("#slSearchClient option:selected").text().trim() ;
    var ClientName2 = $("#txtClientName").val().trim() ;
    if (ClientName1 == "Select Client" || ClientName1 == "<--Select-->" || ClientName1 == "" && ClientName2 != "") {
        ClientName = ClientName2;
    } else if (ClientName2 == "" && ClientName1 != "" && ClientName1 != "Select Client") {
        ClientName = ClientName1;
    } else {
        ClientName = ClientName2;
        $("#slSearchCurrency").attr("disabled", "disabled");
    }
    var pWhereClause = " Where BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' "
        + " And ClientName LIKE N'%" + (ClientName).trim() + "%' "
                    + " And Currency LIKE N'%" + (currency).trim() + "%' ";
                
    CurrencyID = $("#slSearchCurrency option:selected").val();
    loadWithPagingWithParmWhere(pWhereClause);
}


function Search_LoadingWithPaging(pPageNo, pPageSize) {

    var currency = $("#slSearchCurrency option:selected").val() != "" ? $("#slSearchCurrency option:selected").text() : "";
    var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtBillNo").val().trim() + "%' "
                       + " And ClientName LIKE N'%" + ($("#slSearchClient option:selected").text() == "Select Client" ? "" : $("#slSearchClient option:selected").text().trim()) + "%' "
    // + " And Currency LIKE N'%" + currency + "%' ";
    FadePageCover(true);
    $(".btn-Options").addClass("hide");
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, pPageNo, pPageSize, function (pTabelRows) { PaymentsSearchInvoices_BindTableRows(pTabelRows); });
}

function loadWithPagingWithParmWhere(pWhereClause)
{
    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

}

function Currency_GetList(pCurrencyID, pSelectTxt) {
    debugger;
   // GetListWithCurrency(pCurrencyID, "/api/SL_Payments/LoadAllCurrencyByName", pSelectTxt, "slSearchCurrency");
    Fill_SelectInput("/api/SL_Payments/LoadAllCurrencyByName", "ID", "Code", TranslateString("SelectFromMenu"), "#slSearchCurrency", pCurrencyID);
}
function Currency_GetListnew(pCurrencyID, pSelectTxt) {
    debugger;
   // GetListWithCurrencyID(pCurrencyID, "/api/SL_Payments/LoadAllCurrencyByName", pSelectTxt, "slSearchCurrency");
    Fill_SelectInput("/api/SL_Payments/LoadAllCurrencyByName", "ID", "Code", TranslateString("SelectFromMenu"), "#slSearchCurrency", pCurrencyID);

}
function GetListWithUsers(pUserID, pStrFnName, pSelectTxt, pSlName, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pOrderBy: "ID" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pSelectTxt == "null") {
                option = '<option value="">' + TranslateString("SelectFromMenu") + '</option>';
            }
            $.each(JSON.parse(data), function (i, item) {
                if (pUserID != null && pUserID != undefined) //in case of editing
                    if (pUserID == item.ID)
                        option += '<option value="' + item.ID + '" selected >' + item.Username + '</option>';
                    else
                        option += '<option value="' + item.ID + '">' + item.Username + '</option>';
                else
                    option += '<option value="' + item.ID + '">' + item.Username + '</option>';
            });

            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();

        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support! GetListWithName in mainapp.master.js", "error");
        }
    });
}
function Clients_GetList(pBillNo, pSelectTxt) {
    debugger;
    GetListWithClients(pBillNo, "/api/SL_Payments/LoadAllClientsByName", pSelectTxt, "slSearchClient");
}
function SearchInvoices_DeleteInvoice() {
    swal({
        title: "Are you sure?", text: "You want to delete Invoice No." + $(".selected-row").find("td.InvoiceSerial").text() + " !",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D0D0D0",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
    }, function () {
        $.ajax({
            type: "GET",
            url: strServerURL + "api/SearchInvoice/DeleteInvoice",
            data: { pInvoiceID: $(".selected-row").attr("invoiceid") },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

            },
            error: function (jqXHR, exception) {
                swal("Oops!", "Please, contact your technical support!  this is LoadWithPagingWithWhereClause in mainapp.master !", "error");
                FadePageCover(false);
            }
        });
    });
}


function Cash_BindTableRows() {
    debugger;
    if (CashRows == 1)
        ClearAllTableRows("tblCash");
    debugger;
    AppendRowtoTable("tblCash",
    ("<tr>"
                + "<td class='CashSafe" + CashRows + "' ' ><select id='slCashSafe" + CashRows + "' onChange='ChangeSafe(" + CashRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"
        + "<td class='CashCurrency" + CashRows + "' ' ><select id='slCashCurrency" + CashRows + "'  disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"
        + "<td class='ExchangeRate" + CashRows + "' ><input type='number' id='txtCashExchangeRate" + CashRows + "'  data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "<td class='CashAmount" + CashRows + "' ' ><input type='number' id='txtCashAmount" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                //+ "<td class='CashTax" + CashRows + "' ' ><select id='slCashTax" + CashRows + "'  data-required='false'  class='form-control m-b' tabindex='4'></select></td>"
                + "<td class='CashTax" + CashRows + "' ' ><select id='slCashTax" + CashRows + "'  onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"

                + "<td class='CashTaxValue" + CashRows + "' ' ><input type='text' id='txtCashTaxValue" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"

                + "<td class='CashNotes" + CashRows + "' ' ><input type='text' id='txtCashNotes" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "</tr>"));

   // setTimeout(function () {
        $('#slCashSafe' + CashRows).html($("#slHideSafes").html());
        $("#slCashCurrency" + CashRows).html($("#slHideCurrency").html());
   // }, 300);
   
    CashRows++;

    //BindAllCheckboxonTable("tblCash", "Cashid");
    //CheckAllCheckbox("ID");
    FadePageCover(false);

}

function ChangeSafe(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {
    
        $("#txtPaymentDate").removeClass('validation-error');
        CashExchangeRate = 0;
        if ($("#slCashSafe" + pSelectID + " option:selected").val() == "")
            $("#slCashCurrency" + pSelectID + "").val("1");
        else
            $("#slCashCurrency" + pSelectID + "").val($("#slCashSafe" + pSelectID + " option:selected").attr("SafeDefaultCurrencyID"));
        debugger;
        GetExchangeRate(pSelectID, 10)
        setTimeout(function () {
         
                $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);
            
            FadePageCover(false);
        }, 500);
    } else {
        $("#slCashSafe" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}


//function ChangeCashExchangeRate(pSelectID) {

//}


var CashRows = 1; 
function AddNewCashRow() {
    debugger;
    Cash_BindTableRows()
}

function Cheque_BindTableRows() {
    debugger;
    if (ChequeRows == 1)
        ClearAllTableRows("tblCheque");
    debugger;
    AppendRowtoTable("tblCheque",
    ("<tr>"
                + "<td class='ChequeBank" + ChequeRows + "' ' ><select id='slChequeBank" + ChequeRows + "' onChange='ChangeBank(" + ChequeRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
                + "<td class='ChequeCurrency" + ChequeRows + "' ><select id='slChequeCurrency" + ChequeRows + "' disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
                + "<td class='ExchangeRate" + ChequeRows + "' ><input type='number' id='txtChequeExchangeRate" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "<td class='Deposit'> <input id='txtDeposit' type='checkbox' onClick='ChangeDeposit(" + ChequeRows + ");' /></td>"
                + "<td class='ChequeAmount" + ChequeRows + "' ><input type='number' id='txtChequeAmount" + ChequeRows + "' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "<td class='ChequeNo" + ChequeRows + "' ><input type='text' id='txtChequeNo" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
               // + "<td class='ChequeTax" + CashRows + "' ' ><select id='slChequeTax" + CashRows + "'  data-required='false'  class='form-control m-b' tabindex='4'></select></td>"
               // + "<td class='ChequeTax" + CashRows + "' ' ><select id='slChequeTax" + CashRows + "'  onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"
                + "<td class='ChequeTax" + ChequeRows + "' ><select id='slChequeTax" + ChequeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"


               //+ "<td class='ChequeTaxValue" + CashRows + "' ' ><input type='text' id='txtChequeTaxValue" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "<td class='ChequeTaxValue" + ChequeRows + "' ><input type='number' id='txtChequeTaxValue" + ChequeRows + "' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"


               + "<td class='ChequeDate" + ChequeRows + "'   ><input id='txtChequeDate" + ChequeRows + "' tabindex='20' type='date' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'  style='background-color:white; cursor:text;' data-required='false' class='form-control datepicker-input input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' /></td>"
                + "<td class='ChequeNotes" + ChequeRows + "' ><input type='text' id='txtChequeNotes" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
                + "</tr>"));

   // setTimeout(function () {
        //console.log($("#slHideBanks").html());
        $('#slChequeBank' + ChequeRows).html($("#slHideBanks").html());
        $("#slChequeCurrency" + ChequeRows).html($("#slHideCurrency").html());
    //}, 300);

    ChequeRows++;

    //BindAllCheckboxonTable("tblCheque", "Cashid");
    //CheckAllCheckbox("ID");
    FadePageCover(false);

}

function ChangeDeposit(pSelectID) {
    debugger;
    if ($("#txtDeposit" + pSelectID).is(':checked') && $("#slChequeBank" + pSelectID).val() != "" ) {
        $("#txtBankChargesAmount").attr("disabled", "disabled");
        $("#txtBankChargesAmount").val("0");
    } else if (!$("#txtDeposit" + pSelectID).is(':checked') && $("#slChequeBank" + pSelectID).val() != "") {
        $("#txtBankChargesAmount").removeAttr("disabled");
    }
}

function ChangeBank(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {
        var ValidateCashAmount = parseInt($("#txtCashExchangeRate1").val() == "" ? "0" : $("#txtCashExchangeRate1").val()) * parseInt($("#txtCashAmount1").val() == "" ? "0" : $("#txtCashAmount1").val());
        var ValidateInvoicesAmount = parseInt($("#txtInvoicesExchangeRate").val() == "" ? "0" : $("#txtInvoicesExchangeRate").val()) * parseInt($("#txtTotalCost").val() == "" ? "0" : $("#txtTotalCost").val());
        if ($("#slChequeBank1 option:selected").val() != "" && ValidateCashAmount < ValidateInvoicesAmount) {
            $("#txtBankChargesAmount").removeAttr("disabled");
            $("#txtRefundAmount").removeAttr("disabled");
        } else
        {
            $("#txtBankChargesAmount").attr("disabled", "disabled");
            $("#txtRefundAmount").attr("disabled", "disabled");
        }
      
        $("#txtPaymentDate").removeClass('validation-error');
        ChequeExchangeRate = 0;
        if ($("#slChequeBank" + pSelectID + " option:selected").val() == "")
            $("#slChequeCurrency" + pSelectID + "").val("1");
        else
            $("#slChequeCurrency" + pSelectID + "").val($("#slChequeBank" + pSelectID + " option:selected").attr("BankDefaultCurrencyID"));
        debugger;
        GetExchangeRate(pSelectID, 30)
        setTimeout(function () {
        
                $("#txtChequeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
            
            FadePageCover(false);
        }, 500);
    }
    else {
        $("#slChequeBank" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}


var ChequeRows = 1;
function AddNewChequeRow() {
    debugger;
    Cheque_BindTableRows()
}


function Safes_GetList(pSafeID, pSelectTxt) {
    debugger;

  //  GetListWithSafesByCurrencyID(pCurrencyID, "/api/SL_Payments/LoadAllSafesByName", pSelectTxt, "slCashSafe1");


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SL_Payments/LoadAllSafesByName",
        data: { pSafeID: pSafeID  },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], "SafeID", "SafeName", "Select  Safe", "#slCashSafe1", '', 'SafeDefaultCurrencyID')
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });


    

}

function Banks_GetList(pBankID, pSelectTxt)
{
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SL_Payments/LoadAllBanksByName",
        data: { pBankID: pBankID },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], "BankID", "BankName", "Select Bank", "#slChequeBank1", '', 'BankDefaultCurrencyID')

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
    
}


function GetExchangeRate(pSelectID, pVoucherType) {
    debugger;
    FadePageCover(true);
    var CurrencyID = pVoucherType == 10 ? $('#slCashCurrency' + pSelectID + ' option:selected').val() : $('#slChequeCurrency' + pSelectID + ' option:selected').val();
    var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
            + " AND ID = " + CurrencyID
            + " ORDER BY CODE"
          )
    GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
        , null/*1st Row*/
        , whereCondition
        , function (pData) {
            debugger;
            if (pVoucherType == 10)
                CashExchangeRate = pData;
            else
                ChequeExchangeRate = pData;
            debugger;

        });

}



function GenerateCode(pSelectID, pVoucherType)
{
    debugger;
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    CallGETFunctionWithParameters("/api/Voucher/GetCode"
            , {
               
                pSafeID: pVoucherType == 10 ? $('#slCashSafe' + pSelectID + ' option:selected').val() : 0
                , pBankID: pVoucherType == 30 ? $('#slChequeBank' + pSelectID + ' option:selected').val() : 0
                , pDate: ConvertDateFormat(pFormattedTodaysDate)
                , pVoucherType: pVoucherType
            }
            , function (pData) {
                debugger;
                if (pVoucherType == 10)
                    Cashcode = pData[0];
                else
                    Chequecode = pData[0];
               // if ($("#hID").val() == 0 || $("#hID").val() == "") //in case of update then dont update VoucherCode
                    //return pData[0]
                
            }
            , null);
}

var CashExchangeRate = 0;

var ChequeExchangeRate = 0;

function Payments_Save()
{
    debugger;
    FadePageCover(true)
    if ($("#slSearchClient option:selected").val() != "" && $("#slSearchCurrency option:selected").val() != "") {
        if ($("#txtPaymentDate").val() != "") {
            $("#txtPaymentDate").removeClass('validation-error');



            ValidateCashForm();
            ValidateChequeForm();
            if (ChequeBoolEdit == false || CashBoolEdit == false) {
            }else{
                if (CashBool || ChequeBool) {
                    var AccountID = "";
                    var SubAccountID = "";
                    var pWhereClause =  parseInt($("#slSearchClient option:selected").attr("value"));

                    //Get AccountID & SubAccountID
                    $.getJSON('/api/SL_Payments/GetAccountIDAndSubAccountID', { pClientID: pWhereClause }, function (Result) {
                        debugger;
                        if (JSON.parse(Result).length != 0) {
                            AccountID = JSON.parse(Result)[0].AccountID;
                            SubAccountID = JSON.parse(Result)[0].SubAccountID;
                        }


                        if (AccountID != "" && SubAccountID != "" && $("#hLoggedUserID").val() != -1) {


                            if (CheckPaymentMoney() == "1") {
                                returned_value = "0";
                                debugger;


                                //Save A_Payments & A_PaymentInvoices
                                var pParametersWithValuesVoucherPayments = {

                                    pClientID: $('#slSearchClient option:selected').val()
                                   , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
                                   , pPaymentNotes: ($("#txtCashNotes1").val() == "" ? "" : $("#txtCashNotes1").val()) + " " + ($("#txtChequeNotes1").val() == "" ? "" : $("#txtChequeNotes1").val())
                                   , pTotalCost: $("#txtTotalPaid").val()
                                   , pPaymentCurrencyID: $('#slSearchCurrency option:selected').val()
                                   , pPaymentAmount: parseFloat($("#txtTotalCost").val() == "" ? 0 : $("#txtTotalCost").val())
                                   , pPaymentExchangeRate: InvoicesExchangeRate
                                   , pInvoicesIDs: InvoicesIDs
                                    , pInvoicesDCNotesIDs: InvoicesDCNotesIDs
                                    , PInvoicesAmounts: InvoicesAmounts
                                    , PInvoicesRremain: InvoicesRremain
                                    , PInvoicesDCNotesAmounts: InvoicesDCNotesAmounts
                                    , PInvoicesDCNotesRremain: InvoicesDCNotesRremain
                                   , pBankChargesAmount: $("#txtBankChargesAmount").val()
                                   , pBankChargesCurrency: $('#slChequeCurrency1 option:selected').val()
                                   , pRefundAmount: $("#txtRefundAmount").val()
                                   , pRefundCurrency: $('#slChequeCurrency1 option:selected').val()
                                };
                                debugger;
                                //FadePageCover(true);
                                CallGETFunctionWithParameters("/api/SL_Payments/InsertA_PaymentsAndA_PaymentInvoices", pParametersWithValuesVoucherPayments
                                    , function (pData) {
                                        FadePageCover(false);
                               debugger;
                               //InvoicesIDs = "";
                               if (pData == true) {


                                   if (CashBool || ValidateCashForm()) {
                                       //Save All Cash Rows
                                       for (var i = 1 ; i < CashRows ; i++) {
                                           //If Cash Save Correct
                                           Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);

                                       }
                                   } else {
                                       debugger;
                                       if (ChequeBool || ValidateChequeForm()) {
                                           var ValidateCashAmount = parseInt($("#txtCashExchangeRate1").val() == "" ? "0" : $("#txtCashExchangeRate1").val()) * parseInt($("#txtCashAmount1").val() == "" ? "0" : $("#txtCashAmount1").val());
                                           var ValidateInvoicesAmount = parseInt($("#txtInvoicesExchangeRate").val() == "" ? "0" : $("#txtInvoicesExchangeRate").val()) * parseInt($("#txtTotalCost").val() == "" ? "0" : $("#txtTotalCost").val());
                                           if (ValidateCashAmount < ValidateInvoicesAmount) {
                                               //Save All Cheque Rows
                                               for (var i = 1 ; i < ChequeRows ; i++) {
                                                   Details_ChequeSave(i, 30, ChequeExchangeRate, AccountID, SubAccountID);
                                               }
                                           } 
                                       }

                                   }


                               }
                               else {
                                   swal("Sorry", "");
                                   FadePageCover(false);
                               }
                           }
                           , null);

                            }




                        }
                        else {
                            swal("Sorry", "Please Link This Client By Acount And SubAcount");
                            FadePageCover(false);
                        }
                    });
                } else {
                    swal("Error", "Please, Complete Payment Type");
                    FadePageCover(false);
                }
            }
        } else {
            swal("Error", "Please, Enter Payment Date");
            FadePageCover(false);
            $("#txtPaymentDate").addClass('validation-error');
        }
    }
    else {
        swal("Error", "Please, Select Specific Client And Currency");
        FadePageCover(false);
    }
        
}


var CashBool = false;
var CashBoolEdit = true;
function ValidateCashForm()
{
    debugger;
    CashBool = true;
    CashBoolEdit = true;
    for (var i = 1 ; i < CashRows ; i++) {
        if ($("#slCashSafe" + i).val() == "") {
            $("#slCashSafe" + i).addClass('validation-error');
            CashBool = false;
            FadePageCover(false);
        }
        else
            $("#slCashSafe" + i).removeClass('validation-error');

        if ($("#txtCashAmount" + i).val() == ""){
            $("#txtCashAmount" + i).addClass('validation-error');
            FadePageCover(false);
            CashBool = false;
        }
        else
            $("#txtCashAmount" + i).removeClass('validation-error');

        if ($("#txtCashExchangeRate" + i).val() == "0" || $("#txtCashExchangeRate" + i).val() == "") {
            $("#txtCashExchangeRate" + i).addClass('validation-error');
            FadePageCover(false);
            CashBool = false;
        }
        else
            $("#txtCashExchangeRate" + i).removeClass('validation-error');

        if (($("#slCashSafe" + i).val() != "0" &&  $("#slCashSafe" + i).val() != "" ) && CashBool == false) {
            swal("Error", "Please, Complete Cash Payment If You Need Pay By Cash");
            FadePageCover(false);
            CashBoolEdit = false;
        }

        //if ($("#txtCashNotes" + i).val() == "") {
        //    $("#txtCashNotes" + i).addClass('validation-error');
        //    bool = false;
        //}
        //else
        //    $("#txtCashNotes" + i).removeClass('validation-error');
    }
    return CashBool;
}

var ChequeBool = false;
var ChequeBoolEdit = true;
function ValidateChequeForm() {
    debugger;
    ChequeBool = true;
    ChequeBoolEdit = true;
    for (var i = 1 ; i < ChequeRows ; i++) {
        if ($("#slChequeBank" + i).val() == "") {
            $("#slChequeBank" + i).addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#slChequeBank" + i).removeClass('validation-error');

        if ($("#txtChequeNo" + i).val() == "") {
            $("#txtChequeNo" + i).addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtChequeNo" + i).removeClass('validation-error');

        if ($("#txtChequeDate" + i).val() == "") {
            $("#txtChequeDate" + i).addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtChequeDate" + i).removeClass('validation-error');

        if ($("#txtChequeAmount" + i).val() == "") {
            $("#txtChequeAmount" + i).addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtChequeAmount" + i).removeClass('validation-error');

        if ($("#txtChequeExchangeRate" + i).val() == "0" || $("#txtChequeExchangeRate" + i).val() == "") {
            $("#txtChequeExchangeRate" + i).addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtChequeExchangeRate" + i).removeClass('validation-error');

        if (($("#slChequeBank" + i).val() != "0" &&  $("#slChequeBank" + i).val() != "") && ChequeBool == false) {
            swal("Error", "Please, Complete Cheque Payment If You Need Pay By Cheque");
            FadePageCover(false);
            ChequeBoolEdit = false;
        }
        if (parseInt($("#txtBankChargesAmount").val()) > parseInt($("#txtChequeAmount" + i).val())) {
            $("#txtBankChargesAmount").addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtBankChargesAmount").removeClass('validation-error');

        if (parseInt($("#txtRefundAmount").val()) > parseInt($("#txtChequeAmount" + i).val())) {
            $("#txtRefundAmount").addClass('validation-error');
            FadePageCover(false);
            ChequeBool = false;
        } else
            $("#txtRefundAmount").removeClass('validation-error');

        //if ($("#txtChequeNotes" + i).val() == "") {
        //    $("#txtChequeNotes" + i).addClass('validation-error');
        //    bool = false;
        //} else
        //    $("#txtChequeNotes" + i).removeClass('validation-error');

    }
    return ChequeBool;
}

function Details_CashSave(pSelectID, pVoucherType, ExchangeRate, AccountID, SubAccountID) {
    debugger;
    FadePageCover(true)

    var res = ($("#txtCashNotes" + pSelectID + "").val().trim() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val().trim()).replace(/[/\\?&%	*:|"<>.]/g, ' ')

    var pParametersWithValuesVoucherPayments = {
        pID: 0
          //, pClientID: $('#slSearchClient option:selected').val()
          //, pCode: code
          , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
          , pSafeID:  $('#slCashSafe' + pSelectID + ' option:selected').val()
          , pBankID: 0
          , pCurrencyID: $('#slCashCurrency' + pSelectID + ' option:selected').val()
          , pExchangeRate: ExchangeRate
          , pChargedPerson: $("#slSearchClient option:selected").text().trim() 
          , pAmount: $("#txtCashAmount" + pSelectID + "").val()
          , pNotes: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val())
          , pPaymentNotes: res
          , pChequeNo: $("#txtChequeNo" + pSelectID + "").val() == "" ? 0 : $("#txtChequeNo" + pSelectID + "").val()
          , pChequeDate: $("#txtChequeDate" + pSelectID + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + pSelectID + "").val()).split("-").reverse().join("/"))
          , pVoucherType: pVoucherType
          , pIsChequeOrDeposit: false  ////Cheque Or Deposite
          , pTaxID: $('#slCashTax' + pSelectID + ' option:selected').val() == "" ? 0 : $('#slCashTax' + pSelectID + ' option:selected').val()
          , pTaxValue: $("#txtCashTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtCashTaxValue" + pSelectID + "").val()
          , pTaxSign: 1
          , pTaxID2: 0
          , pTaxValue2: 0
          , pTaxSign2: 1
          , pDiscountTaxID: 0
          , pDiscountTaxValue: 0
          , pDiscountTaxID2: 0
          , pDiscountTaxValue2: 0
          , pTotal: ($("#txtCashAmount" + pSelectID + "").val()*1)+ ($("#txtCashTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtCashTaxValue" + pSelectID + "").val() * 1)
          , pTotalAfterTax: ($("#txtCashAmount" + pSelectID + "").val() * 1) + ($("#txtCashTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtCashTaxValue" + pSelectID + "").val() * 1)
          , pIsAGInvoice: false
          , pAGInvType_ID: 000
          , pInv_No: 000
          , pInvoiceID: 000
          , pJVID1: 000
          , pJVID2: 000
          , pJVID3: 000
          , pJVID4: 000
          , pSalesManID: 000
          , pforwOperationID: 000
          , pIsCustomClearance: false
          , pTransType_ID: 000
          , pIsCash:  true
          , pIsCheque: false
          , pPrintDate: "01/01/1900"
          , pDiscountTaxID: 0
          , pDiscountTaxValue: 0
          , pDiscountTaxID2: 0
          , pDiscountTaxValue2: 0
          , pOtherSideBankName: "0"
          , pCollectionDate: "01/01/1900"
          , pCollectionExpense: 000
        //Details Data
          , pDetailsID: 0
          , pValue: $("#txtCashAmount" + pSelectID + "").val()
          , pDescription: res
          , pAccountID: AccountID
          , pSubAccountID: SubAccountID
          , pCostCenterID: 0
          , pIsDocumented: false
          , pDetailsInvoiceID: 000
          , pInvoicesIDs: InvoicesIDs

          , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
          , pClientID: $("#slSearchClient option:selected").attr("value")
        //InvoicesIDs
        //Bank Charges Data 
        , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()
     
    };

    debugger;
    ////Save In VoucherPayments Table
    CallPOSTFunctionWithParameters("/api/SL_Payments/Insert", pParametersWithValuesVoucherPayments
            , function (pData) {
                debugger;
                FadePageCover(false)
                //InvoicesIDs = "";
                if (pData[0] == true) {

                    if (ChequeBool == false) {
                        var CashCurrencyID = $('#slCashCurrency' + pSelectID + ' option:selected').val();
                        var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                        if (CashCurrencyID != PaymentCurrencyID) {
                            //Insert in A_JV & A_JVDetails
                            CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                              , function (pData) {
                                  debugger;
                                  InvoicesIDs = "";
                                  if (pData == true) {

                                      swal("Success", "Saved successfully.");
                                      FadePageCover(false);
                                      $("#txtSearchCode").val("");
                                      $("#txtsearchClientID").val("")
                                      $("#txtsearchPaymentNotes").val("");
                                      $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                      Payments_LoadingWithPaging();
                                      jQuery("#PaymentsModal").modal("hide");
                                  }
                                  else {

                                      swal("Sorry", "");
                                      FadePageCover(false);
                                  }
                              }, null);
                        } else {
                            CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                              , function (pData) {
                                  debugger;
                                  InvoicesIDs = "";
                                  if (pData == true) {

                                      swal("Success", "Saved successfully.");
                                      FadePageCover(false);
                                      $("#txtSearchCode").val(""); 
                                      $("#txtsearchClientID").val("")
                                      $("#txtsearchPaymentNotes").val("");
                                      $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                      Payments_LoadingWithPaging();
                                      jQuery("#PaymentsModal").modal("hide");
                                  }
                                  else {

                                      swal("Sorry", "");
                                      FadePageCover(false);
                                  }
                              }, null);
                        }
                    } else {
                        debugger;
                        if (ChequeBool || ValidateChequeForm()) {
                            var ValidateCashAmount = parseInt($("#txtCashExchangeRate1").val() == "" ? "0" : $("#txtCashExchangeRate1").val()) * parseInt($("#txtCashAmount1").val() == "" ? "0" : $("#txtCashAmount1").val());
                            var ValidateInvoicesAmount = parseInt($("#txtInvoicesExchangeRate").val() == "" ? "0" : $("#txtInvoicesExchangeRate").val()) * parseInt($("#txtTotalPaid").val() == "" ? "0" : $("#txtTotalPaid").val());
                            if (ValidateCashAmount < ValidateInvoicesAmount) {
                                //Save All Cheque Rows
                                for (var i = 1 ; i < ChequeRows ; i++) {
                                    Details_ChequeSave(i, 30, ChequeExchangeRate, AccountID, SubAccountID);
                                }
                            } else {
                                var CashCurrencyID = CashBool == true ? $('#slCashCurrency' + pSelectID + ' option:selected').val() : "-1";
                                var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                                if (CashCurrencyID != PaymentCurrencyID && CashCurrencyID != "-1") {
                                    //Insert in A_JV & A_JVDetails
                                    CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                                      , function (pData) {
                                          debugger;
                                          InvoicesIDs = "";
                                          if (pData == true) {

                                              swal("Success", "Saved successfully.");
                                              FadePageCover(false);
                                              $("#txtSearchCode").val("");
                                              $("#txtsearchClientID").val("")
                                              $("#txtsearchPaymentNotes").val("");
                                              $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                              Payments_LoadingWithPaging();
                                              jQuery("#PaymentsModal").modal("hide");
                                          }
                                          else {

                                              swal("Sorry", "");
                                              FadePageCover(false);
                                          }
                                      }
                          , null);
                                } else  {
                                    //Insert in A_JV & A_JVDetails
                                    CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                                      , function (pData) {
                                          debugger;
                                          InvoicesIDs = "";
                                          if (pData == true) {

                                              swal("Success", "Saved successfully.");
                                              FadePageCover(false);
                                              Payments_LoadingWithPaging();
                                              jQuery("#PaymentsModal").modal("hide");
                                          }
                                          else {

                                              swal("Sorry", "");
                                              FadePageCover(false);
                                          }
                                      }
                                          , null);
                                }
                            }
                        }
                       
                    }
                }
                else {
                    swal("Sorry", "");
                    FadePageCover(false);
                }
         
            }, null);
  
}

function Details_ChequeSave(pSelectID, pVoucherType, ExchangeRate, AccountID, SubAccountID) {
    debugger;
    FadePageCover(true);

    var res = ($("#txtChequeNotes" + pSelectID + "").val().trim() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val().trim()).replace(/[/\\?&%	*:|"<>.]/g, ' ')


    var pParametersWithValuesVoucherPayments = {
           pID: 0
          //, pClientID: $('#slSearchClient option:selected').val()
          //, pCode: code
          , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
          , pSafeID: 0
          , pBankID: $('#slChequeBank' + pSelectID + ' option:selected').val() == "" ? 0 : $('#slChequeBank' + pSelectID + ' option:selected').val()
          , pCurrencyID: $('#slChequeCurrency' + pSelectID + ' option:selected').val()
          , pExchangeRate: ExchangeRate
          , pChargedPerson: $("#slSearchClient option:selected").text().trim() 
          , pAmount: $("#txtChequeAmount" + pSelectID + "").val()
          , pNotes: res
          , pPaymentNotes: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val()) + " " + ($("#txtChequeNotes" + pSelectID + "").val() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val())
          , pChequeNo: ($("#txtChequeNo" + pSelectID + "").val().trim() == "" ? "" : $("#txtChequeNo" + pSelectID + "").val().trim()).replace(/[/\\?&%	*:|"<>.]/g, ' ')
          , pChequeDate: $("#txtChequeDate" + pSelectID + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + pSelectID + "").val()).split("-").reverse().join("/"))
          , pVoucherType: pVoucherType
          , pIsChequeOrDeposit: $("#tblCheque  tbody tr").find("#txtDeposit").is(":checked") == true ? true : false  ////Cheque Or Deposite
          , pTaxID: $('#slChequeTax' + pSelectID + ' option:selected').val() == "" ? 0 :$('#slChequeTax' + pSelectID + ' option:selected').val()
          , pTaxValue: $("#txtChequeTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtChequeTaxValue" + pSelectID + "").val()
          , pTaxSign: 1
          , pTaxID2:0
          , pTaxValue2: 0
          , pTaxSign2: 1
          , pDiscountTaxID: 0
          , pDiscountTaxValue: 0
          , pDiscountTaxID2: 0
          , pDiscountTaxValue2: 0
          , pTotal: ($("#txtChequeAmount" + pSelectID + "").val() * 1) + ($("#txtChequeTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtChequeTaxValue" + pSelectID + "").val() * 1)
          , pTotalAfterTax: ($("#txtChequeAmount" + pSelectID + "").val() * 1) + ($("#txtChequeTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtChequeTaxValue" + pSelectID + "").val() * 1)
          , pIsAGInvoice: false
          , pAGInvType_ID: 000
          , pInv_No: 000
          , pInvoiceID: 000
          , pJVID1: 000
          , pJVID2: 000
          , pJVID3: 000
          , pJVID4: 000
          , pSalesManID: 000
          , pforwOperationID: 000
          , pIsCustomClearance: false
          , pTransType_ID: 000
          , pIsCash: false
          , pIsCheque: $("#tblCheque  tbody tr").find("#txtDeposit").is(":checked") == true ? false : true  ////Cheque Or Deposite
          , pPrintDate: "01/01/1900"
          
          , pOtherSideBankName: "0"
          , pCollectionDate: "01/01/1900"
          , pCollectionExpense: 000
        //Details Data
          , pDetailsID: 0
          , pValue: ($("#txtChequeAmount" + pSelectID + "").val())
          , pDescription: res
          , pAccountID: AccountID
          , pSubAccountID: SubAccountID
          , pCostCenterID: 0
          , pIsDocumented: false
          , pDetailsInvoiceID: 000
          , pInvoicesIDs: InvoicesIDs

          , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
          , pClientID: $("#slSearchClient option:selected").attr("value")
        //InvoicesIDs
        //Bank Charges Data 
        , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()
      
    };

    debugger;
    ////Save In VoucherPayments Table
    CallPOSTFunctionWithParameters("/api/SL_Payments/Insert", pParametersWithValuesVoucherPayments
            , function (pData) {
                debugger;
                FadePageCover(false);
                //InvoicesIDs = "";
                if (pData[0] == true) {

                    var CashCurrencyID = CashBool == true ? $('#slCashCurrency' + pSelectID + ' option:selected').val() : "-1"
                    var ChequeCurrencyID = $('#slChequeCurrency' + pSelectID + ' option:selected').val();
                    var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                    if (CashCurrencyID != PaymentCurrencyID && CashCurrencyID != "-1"  || ChequeCurrencyID != PaymentCurrencyID) {
                        //Insert in A_JV & A_JVDetails
                        CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                          , function (pData) {
                              debugger;
                              InvoicesIDs = "";
                              if (pData == true) {

                                  swal("Success", "Saved successfully.");
                                  FadePageCover(false);
                                  $("#txtSearchCode").val("");
                                  $("#txtsearchClientID").val("")
                                  $("#txtsearchPaymentNotes").val("");
                                  $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                  Payments_LoadingWithPaging();
                                  jQuery("#PaymentsModal").modal("hide");
                              }
                              else {

                                  swal("Sorry", "");
                                  FadePageCover(false);
                              }
                          }
              , null);
                    } else if (CashCurrencyID == PaymentCurrencyID && CashCurrencyID != "-1" && ChequeCurrencyID == PaymentCurrencyID || CashCurrencyID == "-1" && ChequeCurrencyID == PaymentCurrencyID)
                    {
                        //Insert in A_JV & A_JVDetails
                        CallGETFunctionWithParameters("/api/SL_Payments/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
                          , function (pData) {
                              debugger;
                              InvoicesIDs = "";
                              if (pData == true) {

                                  swal("Success", "Saved successfully.");
                                  FadePageCover(false);
                                  Payments_LoadingWithPaging();
                                  jQuery("#PaymentsModal").modal("hide");
                              }
                              else {

                                  swal("Sorry", "");
                                  FadePageCover(false);
                              }
                          }
                              , null);
                    }
                }
                else {

                    swal("Sorry", "");
                    FadePageCover(false);
                }
                //FirstCall = 1;
            }
            , null);
}

var InvoicesIDs = "";
var InvoicesDCNotesIDs = "";
var InvoicesAmounts = "";
var InvoicesRremain = "";
var InvoicesDCNotesAmounts = "";
var InvoicesDCNotesRremain = "";

var returned_value = "0";
function CheckPaymentMoney()
{
    debugger;
    var VouchersTotalMoney = 0;
    //$("#tblInvoices  tbody tr").each(function () {
    //    if ($(this).find("#txtChoose").is(":checked") == true)
    //      //  VouchersTotalMoney += parseFloat($(this).find(".AmountOnly").text() == "" ? 0 : $(this).find(".AmountOnly").text());
    //        VouchersTotalMoney += $("#txtTotalPaid").val() == "" ? 0 : $("#txtTotalPaid").val();

    $("#tblInvoices  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            // VouchersTotalMoney += parseFloat($(this).find(".AmountOnly").text() == "" ? 0 : $(this).find(".AmountOnly").text());
            VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val());



    });
    $("#tblInvoicesDbtCrdtNotes  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val());


    });
    if (VouchersTotalMoney != 0) {
        debugger;
        InvoicesIDs = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "InvoiceID", "txtChoose");
        InvoicesAmounts = GetTableCellsAsStringWhenCellISCheckedInputCheck("tblInvoices", "Qty", "txtChoose");
        InvoicesRremain = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "RemainAmount", "txtChoose");
        InvoicesDCNotesIDs = GetTableCellsAsStringWhenCellISChecked("tblInvoicesDbtCrdtNotes", "InvoiceID", "txtChoose");
        InvoicesDCNotesAmounts = GetTableCellsAsStringWhenCellISCheckedInputCheck("tblInvoicesDbtCrdtNotes", "Qty", "txtChoose");
        InvoicesDCNotesRremain = GetTableCellsAsStringWhenCellISChecked("tblInvoicesDbtCrdtNotes", "RemainAmount", "txtChoose");
       
        var EgpVouchersTotalMoney = 0;
   

        if (InvoicesExchangeRate == 0)
            InvoicesExchangeRate = $("#txtInvoicesExchangeRate").val() == "" ? 0 : parseFloat($("#txtInvoicesExchangeRate").val());

        EgpVouchersTotalMoney = VouchersTotalMoney * InvoicesExchangeRate;
        //setTimeout(function () {
            if (EgpVouchersTotalMoney != 0) {
                $("#txtInvoicesExchangeRate").removeClass('validation-error');

                var cashTotalMoney = 0;
                var EgpcashTotalMoney = 0;
                for (var i = 1 ; i < CashRows ; i++) {
                    $("#tblCash  tbody tr").each(function () {
                        cashTotalMoney += parseFloat($(this).find("#txtCashAmount" + i).val() == "" ? 0 : $(this).find("#txtCashAmount" + i).val());
                        EgpcashTotalMoney += cashTotalMoney * parseFloat($("#txtCashExchangeRate" + i).val() == "" ? 0 : $("#txtCashExchangeRate" + i).val());
                        if (CashExchangeRate == 0) {
                            CashExchangeRate = parseFloat($("#txtCashExchangeRate" + i + "").val());
                        }
                    });

                }

                var ChequeTotalMoney = 0;
                var EgpChequeTotalMoney = 0;
                for (var i = 1 ; i < ChequeRows ; i++) {
                    $("#tblCheque  tbody tr").each(function () {
                        ChequeTotalMoney += parseFloat($(this).find("#txtChequeAmount" + i).val() == "" ? 0 : $(this).find("#txtChequeAmount" + i).val());
                        EgpChequeTotalMoney += ChequeTotalMoney * parseFloat($("#txtChequeExchangeRate" + i).val() == "" ? 0 : $("#txtChequeExchangeRate" + i).val());
                        if (ChequeExchangeRate == 0) {
                            ChequeExchangeRate = parseFloat($("#txtChequeExchangeRate" + i + "").val());
                        }
                    });

                }

                EgpPaymentTotalMoney = parseFloat(EgpcashTotalMoney) + parseFloat(EgpChequeTotalMoney);

                if (EgpPaymentTotalMoney == EgpVouchersTotalMoney) {
                    returned_value = "1";

                }
                else {
                    swal("Sorry", "The Amount Paid Is not Equal The Value Of The Vouchers");
                    returned_value = "0";
                }
                debugger;
                if (parseFloat($("#txtTotalPaid").val()) <= 0) {
                    swal("Sorry", "The Amount Paid Must More Than 0");
                    returned_value = "0";

                }
            } else {
                swal("Sorry", "Please, Enter Exchange Rate For Invoices");
                
                $("#txtInvoicesExchangeRate").removeAttr("disabled");
                $("#txtInvoicesExchangeRate").addClass('validation-error');
                returned_value = "0";
            }
        //}, 1000);
    }
    else {
        swal("Error", "No Voucher Selected");
        returned_value = "0";
    }
    return returned_value;
}

function GetTableCellsAsStringWhenCellISChecked(pTableID, pClassName, pCellID)
{
    debugger;
    var listOfValues = "";
    $('#' + pTableID + ' tbody tr').each(function () {
        if ($(this).find('#' + pCellID).is(":checked") == true)
            listOfValues += ((listOfValues == "") ? "" : ",") + $(this).find('.' + pClassName).text();
    });

    return listOfValues;
}


function GetTableCellsAsStringWhenCellISCheckedInputCheck(pTableID, pClassName, pCellID) {
    debugger;
    var listOfValues = "";
    $('#' + pTableID + ' tbody tr').each(function () {
        if ($(this).find('#' + pCellID).is(":checked") == true)
            listOfValues += ((listOfValues == "") ? "" : ",") + $(this).find("td." + pClassName).find("input[type = text ]").val();
    });

    return listOfValues;
}


function GetAllSelectedIDsAsStringWithNameAttrRPT(pCheckboxNameAttr) {
    debugger;
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : "*") + ($(this).attr('value'));
    });
    return listOfIDs;
}
function ClientGroups_GetList() {
    debugger;
    CallGETFunctionWithParameters("/api/SL_Payments/LoadAllClientsGroupsByName", {}
        , function (pData) {
            FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slClientGroup", pData[0], null);
            $("#DivSlClientGroup").removeClass('hide');
        }, null);

}

function PaymentsShipLinkClients_Save() {
    debugger;
    var pSelectedID = $("#slSearchClient option:selected").attr("value");
    if (pSelectedID == "")
        swal("Sorry", "Please, select client.");

    else {
        FadePageCover(true);

        CallGETFunctionWithParameters("/api/ShipLinkClients/Save"
            , {
                pSelectedIDs: pSelectedID
                , pClientGroupID: $("#slClientGroup").val()
            }
            , function (pData) {
                if (pData[0]) {
                    swal("Success", "Client Link successfully");
                    Payments_Save();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

    //function Payment_Print(pID) {
    //    debugger;

//}

function Payment_Print(pID) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("PaymentID");
    arr_Values.push(pID);

    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
           , pTitle: "Sales Payment"
            , pReportName: "Rep_SL_Payment"
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}

function PaymentsByDate_Print() {
    debugger;
    FadePageCover(true);

    pWhereClause = " PaymentDate = '" + ConvertDateFormat($("#txtsearchPaymentDate").val()) + "'";

    CallGETFunctionWithParameters("/api/Payments/GetPaymentsByDate_Printed"
                , { pWhereClauseToPrint: pWhereClause }
        , function (pData) {
            debugger;
            var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
            var pFormattedPrintTime = getTime();

            var pPayments = JSON.parse(pData[0]);
            var pTotalAmount = JSON.parse(pData[1]);
        

            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>PaymentReceipt</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
  
            ReportHTML += '         <div class="break"></div>';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
       
            ReportHTML += '             <div class="col-xs-12 m text-ul"><h4><b>Payments</b></h4>' + '</div>'; 

            ReportHTML += '             <div class="col-xs-12">';
            ReportHTML += '                 <table id="tblPayments" class="table table-striped b-t b-light text-sm table-bordered">'; // table-hover
            //ReportHTML += '                     <thead>';
            ReportHTML += '                         <tr>';


            ReportHTML += '                         <th >Code</th>';
            ReportHTML += '                         <th >Payment Date</th>';
            ReportHTML += '                         <th >Client Name</th>';
            ReportHTML += '                         <th >Total</th>';
            ReportHTML += '                         <th >Note</th>';
            //ReportHTML += '                     </thead>';

            $.each(pPayments, function (i, item) {
                ReportHTML += '                     <tr class="input-md" style="font-size:90%; " >';

                ReportHTML += '                     <td>' + item.Code + '</td>';
                ReportHTML += '                     <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) + '</td>';
                ReportHTML += '                     <td>' + item.Name + '</td>';
                ReportHTML += '                     <td>' + item.TotalCost + '</td>';
                ReportHTML += '                     <td>' + item.Notes + '</td>';


                ReportHTML += '                     </tr>';


            });

            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '             </div>';
            
            ReportHTML += '             <div class="col-xs-12 m text-ul"><h4><b>Finances</b></h4>' + '</div>';
            ReportHTML += '             <div class="col-xs-6">';

            ReportHTML += '                 <table id="tblTotalAmount" border=0 class="table table-striped b-t b-light text-sm table-bordered" text-sm">'; // table-hover
            //ReportHTML += '                     <thead>';
            ReportHTML += '                         <tr >';

            ReportHTML += '                         <td ></td>';
            ReportHTML += '                         <th scope="col">EGP</th>';
            ReportHTML += '                         <th scope="col">USD</th>';
            ReportHTML += '                         <th scope="col">EUR</th>';
         
           
            debugger;
            var cash = pTotalAmount[0].Cash.split(',');
            var Cheque = pTotalAmount[0].Cheque.split(',');
            var Deposite = pTotalAmount[0].Deposite.split(',');
            var Total = pTotalAmount[0].Total.split(',');
            //$.each(pTotalAmount, function (i, item) {
            ReportHTML += '                     <tr class="input-md" style="font-size:90%; " > <th scope="row">' + cash[0] + '</td> <td>' + cash[1] + '</td> <td>' + cash[2] + '</td> <td>' + cash[3] + '</td></tr>';

            ReportHTML += '                     <tr class="input-md" style="font-size:90%; " > <th scope="row">' + Cheque[0] + '</td> <td>' + Cheque[1] + '</td> <td>' + Cheque[2] + '</td> <td>' + Cheque[3] + '</td></tr>';

            ReportHTML += '                     <tr class="input-md" style="font-size:90%; " > <th scope="row">' + Deposite[0] + '</td> <td>' + Deposite[1] + '</td> <td>' + Deposite[2] + '</td> <td>' + Deposite[3] + '</td></tr>';

            ReportHTML += '                     <tr class="input-md" style="font-size:90%; " > <th scope="row">' + Total[0] + '</td> <td>' + Total[1] + '</td> <td>' + Total[2] + '</td> <td>' + Total[3] + '</td></tr>';

            //ReportHTML += '                     <tr class="input-md" style="font-size:90%; " >';
                //ReportHTML += '                     <td></td>';
                //ReportHTML += '                     <td>' + item.Cash + '</td>';
                //ReportHTML += '                     <td>' + item.Cheque + '</td>';
                //ReportHTML += '                     <td>' + item.Deposite + '</td>';
                //ReportHTML += '                     </tr>';


            //});

            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            ReportHTML += '             </div>';
            ReportHTML += '             </div>';

            ReportHTML += '              <div class="col-xs-8 text-center"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';

            ReportHTML += '         </body>';

            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();

            FadePageCover(false);
        }
        , null);
}
