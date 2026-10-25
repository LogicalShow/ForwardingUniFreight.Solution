//Start Auto Filter
$(document).ready(function () {
    $("#slAccount").css({ "width": "100%" }).select2();
    $("#slSubAccount").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter

function PS_PaymentsTemp_BindTableRows(pPayments) {
    debugger;
    
    GetListWithCurrency(null, "/api/PS_PaymentsTemp/LoadAllCurrencyByName", "not null", "slHideCurrency");
    //GetListWithCurrency(null, "/api/Payments/LoadAllCurrencyByName", "null", "slBankChargesCurrency");
    //GetListWithCurrency(null, "/api/Payments/LoadAllCurrencyByName", "null", "slRefundCurrency");
    //GetListWithBankByCurrencyID("1", "/api/SL_Payments/LoadAllBanksByName", "null", "slHideBanks");
   // GetListWithSafes(null, "/api/SL_Payments/LoadAllSafesByName", "null", "slHideSafes");
    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/LoadAllBanksByName", { pBankID: "1" }
        , function (pData) {
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slHideBanks", pData[0], null);
        }
        , null);

    //GetListWithSafes(null, "/api/Payments/LoadAllSafesByName", "null", "slHideSafes");
    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/LoadAllSafesByName", { pSafeID: "1" }
        , function (pData) {
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slHideSafes", pData[0], null);
        }
        , null);
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' ></i> <span >" + "Copy" + "</span>";

    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    ClearAllTableRows("tblPayments");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
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
                    + "<td class='supplirtID' val='" + item.supplierID + "'>" + item.Name + "</td>"
                    + "<td class='TotalPayment' >" + item.TotalPayment + "</td>"
                    //+ "<td class='UserID' val='" + item.UserID + "'>" + item.Username + "</td>"
                     + "<td class='CashCode'>" + (item.CashCode == 0 ? "" : item.CashCode) + "</td>"
                + "<td class='chequeCode'>" + (item.chequeCode == 0 ? "" : item.chequeCode) + "</td>"
                + "<td class='RefNo'>" + (item.RefNo == 0 ? "" : item.RefNo) + "</td>"

                    + "<td class='Notes' >" + item.Notes + "</td>"
                    + "<td class='Print'><a href='' data-toggle='modal' onclick='PaymentTax_Print(" + item.ID + ");' class='btn btn-xs btn-rounded btn-lightblue float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print Tax</span></a></td>"
                    + "<td class='Print'><a href='' data-toggle='modal' onclick='Payment_Print(" + item.ID + ");' class='btn btn-xs btn-rounded btn-lightblue float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print</span></a></td>"
                    //+ "<td class=' " + ($("#hf_CanAdd").val() == 1 ? "" : " hide ") + "'><a data-toggle='modal' onclick='Payments_Copy(" + item.ID + ");' " + copyControlsText + "</a></td>"
                   + "<td class='hide'><a href='#PaymentsModal' data-toggle='modal' onclick='Payments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPayments", "ID");
    CheckAllCheckbox("ID");

   // Users_GetList("null", "null")

   

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
    GetListWithUsers(pYearID, "/api/PS_PaymentsTemp/LoadAllUsersByName", pSelectTxt, "slUserID");
}

function PaymentsTempSearch_LoadingWithPaging(pPageNo, pPageSize) {
    debugger;
    $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());
    var pWhereClause = Payment_Search_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());

    //var pOrderBy = "ID DESC";
    var pOrderBy;
    pOrderBy = "ID DESC";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PS_PaymentsTemp_BindTableRows(JSON.parse(pData[0])); });


    FadePageCover(true);
    $(".btn-Options").addClass("hide");
  //  LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/PS_PaymentsTemp/LoadWithPaging", pWhereClause, pPageNo, pPageSize, function (pTableRows) { PS_PaymentsTemp_BindTableRows(pTableRows); });
}
function Payment_Search_GetWhereClause() {
    var pWhereClause = "";
    if ($("#txtSearchCode").val().trim() == "" && $("#txtsearchPaymentDate").val().trim() == "" && $("#txtsearchClientID").val().trim() == "" && $("#txtsearchPaymentNotes").val().trim() == "") {
        pWhereClause = "where Code LIKE N'%" + "" + "%' "
                    + " OR PaymentDate = '" + "'"
                    + " OR Name LIKE N'%" + "" + "%' "
                    + " OR Notes LIKE N'%" + "" + "%' ";
    } else if ($("#txtsearchPaymentDate").val() != "") {
        pWhereClause = " where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
                    + " And PaymentDate = '" + ConvertDateFormat($("#txtsearchPaymentDate").val().trim()) + "'"
                    + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
                    + " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
    } else {
        pWhereClause = "where Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
                    + " And Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
                    + " And Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
    }
    return pWhereClause;
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
var pClientIDNew = 0;

function InvoiceSerialSearch() {
    pCurrencyIDNew = 0
    pClientIDNew = 0;

    debugger;
    if ($("#txtInvoiceSerialSearch").val() != "") {
        var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
        // + " OR PaymentDate LIKE N'%" + $("#txtsearchPaymentDate").val().trim() + "%' "
        // + " OR Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
        // + " OR Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
        //+ " OR Username LIKE N'%" + $('#slsearchUserID option:selected').val() + "%' ";
        debugger;
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, 1, $('#select-page-size').val().trim(), function (pTableRows) {
            counter = 1;
            pClientIDNew = pTableRows.length > 0 ? (pTableRows)[0].SupplierID : 0;
            pCurrencyIDNew = pTableRows.length > 0 ? (pTableRows)[0].CurrencyID : 0;
            Currency_GetListnew(pTableRows.length > 0 ? (pTableRows)[0].CurrencyID : null, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");

            PaymentsSearchInvoices_BindTableRows(pTableRows);

            $("#slSearchClient").val(pClientIDNew);
            //Start Auto Filter
            $("#slSearchClient").trigger("change");

            //End Auto Filter
            /////////////Fill DebitCreditNote
            var pWhereClauseDC = "";
            if (pClientIDNew != 0 && pCurrencyIDNew != 0 && $("#txtIDCNotesSerialSearch").val().trim() != "") {
                pWhereClauseDC = " Where Serial ='" + $("#txtIDCNotesSerialSearch").val().trim() + "' ";
                pWhereClauseDC += " AND SupplierID = " + pClientIDNew;
                pWhereClauseDC += " AND CurrencyID = " + pCurrencyIDNew;
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
            }
            else {
                pWhereClauseDC = " Where Serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
                pWhereClauseDC += " AND SupplierID = " + pClientIDNew;
                pWhereClauseDC += " AND CurrencyID = " + pCurrencyIDNew;
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

            }

        });
        //Clients_GetList(pWhereClause, "not null");
        // Currency_GetList(pCurrencyIDNew, "not null");
        $("#slSearchCurrency").removeAttr("disabled");
    }
    else {
        var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
        pWhereClause += " AND SupplierID = " + $("#slSearchClient").val();
        pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
        counter = 1;
        // + " OR PaymentDate LIKE N'%" + $("#txtsearchPaymentDate").val().trim() + "%' "
        // + " OR Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
        // + " OR Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
        //+ " OR Username LIKE N'%" + $('#slsearchUserID option:selected').val() + "%' ";
        debugger;
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, 1, $('#select-page-size').val().trim(), function (pTableRows) {

            //pCurrencyIDNew = 0;
            pCurrencyIDNew = $("#slSearchCurrency").val().trim();
            Currency_GetListnew(pCurrencyIDNew, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");
            //Clients_GetList(pCurrencyIDNew, "null");
           // $("#slSearchCurrency").val("");
            PaymentsSearchInvoices_BindTableRows(pTableRows);

            /////////////Fill DebitCreditNote
            var pWhereClauseDC = "";

            if ($("#slSearchClient").val().trim() != "" && $("#slSearchCurrency").val().trim() != "" && $("#txtIDCNotesSerialSearch").val().trim() != "") {
                pWhereClauseDC = " Where Serial ='" + $("#txtIDCNotesSerialSearch").val().trim() + "' ";
                pWhereClauseDC += " AND SupplierID = " + $("#slSearchClient").val();
                pWhereClauseDC += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
            }
            else {
                pWhereClauseDC = " Where Serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
                pWhereClauseDC += " AND SupplierID = " + $("#slSearchClient").val();
                pWhereClauseDC += " AND CurrencyID = " + $("#slSearchCurrency").val().trim();
                LoadWithPagingWithWhereClause("div-Pager3", "select-page-size3", "spn-first-page-row3", "spn-last-page-row3", "spn-total-count3", "div-Text-Total3", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClauseDC, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

            }


        });
        //Clients_GetList(pWhereClause, "not null");
        // Currency_GetList(pCurrencyIDNew, "not null");
        $("#slSearchCurrency").removeAttr("disabled");
    }

  
    //if ($("#txtInvoiceSerialSearch").val() != "") {
    //    //$('#select2-slSearchClient-container').prop('disabled', false);
    //    $("#txtBillNo").val("");
    //    $("#txtClientName").val("");
    //    $("#slSearchClient").removeAttr("disabled");
    //    var pWhereClause = " where InvoiceNoManual = " + $("#txtInvoiceSerialSearch").val().trim();
                        
    //    Clients_GetList(pWhereClause, "not null");
    //    setTimeout(function () {
    //        $("#slSearchClient").change();
    //    }, 300);

    //}
   
   

   
}
function InvoiceDbtCrdtNotesSerialSearch() {
    debugger;
    var pWhereClause = "";
    var pWhereClauseDbtCrdtNotes = "";
    var pWhereClause2 = " Where InvoiceNo LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
    if ($("#txtInvoiceSerialSearch").val().trim() == "" && $("#slSearchClient").val() == 0) {
        pWhereClauseDbtCrdtNotes = " Where serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
        ClearAllTableRows("tblInvoices");
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClauseDbtCrdtNotes, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) {
            pCurrencyIDNew = (pTableRows)[0].CurrencyID;
            Currency_GetListnew((pTableRows)[0].CurrencyID, "not null");
            GetDefaultExchangeRateNew();

            Safes_GetList(pCurrencyIDNew, "null");
            Banks_GetList(pCurrencyIDNew, "null");
            PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows);
        });
        Clients_GetList(pWhereClause2, "not null");
    }
    //if ($("#txtInvoiceSerialSearch").val().trim() != "") {
    //    pWhereClauseDbtCrdtNotes += " Where serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
    //    pWhereClauseDbtCrdtNotes += " and InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
    //    pWhereClauseDbtCrdtNotes += " AND ClientID = " + $("#slSearchClient").val() ;
    //    pWhereClause += " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
    //    pWhereClause += " AND ClientID = " + $("#slSearchClient").val();

    //    ClearAllTableRows("tblInvoices");
    //   // LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
    //    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDbtCrdtNotes, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) {
    //        pCurrencyIDNew = (pTableRows)[0].CurrencyID;
    //        Currency_GetListnew((pTableRows)[0].CurrencyID, "not null");
    //        GetDefaultExchangeRateNew();

    //        Safes_GetList(pCurrencyIDNew, "null");
    //        Banks_GetList(pCurrencyIDNew, "null");
    //        PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows);
    //    });
    //}

    //if ($("#txtInvoiceSerialSearch").val().trim() != "" && $("#slSearchClient").val() != 0) {
    //    pWhereClauseDbtCrdtNotes += " Where serial LIKE N'%" + $("#txtIDCNotesSerialSearch").val().trim() + "%' ";
    //    pWhereClauseDbtCrdtNotes += " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
    //    pWhereClauseDbtCrdtNotes += " AND ClientID = " + $("#slSearchClient").val();
    //    pWhereClause += " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
    //    pWhereClause += " Where InvoiceNo LIKE N'%" + $("#txtInvoiceSerialSearch").val().trim() + "%' ";
    //    pWhereClause += " AND ClientID = " + $("#slSearchClient").val();
    //    ClearAllTableRows("tblInvoices");
    //    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
    //    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Payments/LoadInvoicesDbtCrdtNote", pWhereClauseDbtCrdtNotes, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) {
    //        pCurrencyIDNew = (pTableRows)[0].CurrencyID;
    //        Currency_GetListnew((pTableRows)[0].CurrencyID, "not null");
    //        GetDefaultExchangeRateNew();

    //        Safes_GetList(pCurrencyIDNew, "null");
    //        Banks_GetList(pCurrencyIDNew, "null");
    //        PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows);
    //    });
    //}
    
}

function ClientNameSearch() {
    debugger;
    if ($("#txtClientName").val() != "") {
        //$('#select2-slSearchClient-container').prop('disabled', false);
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
function GetDefaultExchangeRate() {
    if (CurrencyID == 0) {
        CurrencyID = $("#slSearchCurrency option:selected").val() != "-1" ? $("#slSearchCurrency option:selected").val() : 0
    }
    // CurrencyID = CurrencyID != 0 ? $("#slSearchCurrency option:selected").val() != "-1" ? $("#slSearchCurrency option:selected").val() : CurrencyID;

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
function GetListCurrencyWithCodeAndExchangeRate(pID, pStrFnName, pStrFirstRow, pWhereClauseCurrencyDetails, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClauseCurrencyDetails: pWhereClauseCurrencyDetails },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //ClearAllOptions(pSlName);
            //var option = "";
            //option = '<option value="0" MasterDataExchangeRate="">' + pStrFirstRow + '</option>';
            // Bind Data
            //return JSON.parse(data[0]);
            $.each(JSON.parse(data[0]), function (i, item) {
                if (callback != null && callback != undefined) //the data here is bool(pRecordsExist) and used as a flag for no records in reports //for Generate_MAWBs then data is string(return empty string if OK and returns MAWBSuffix if exists)
                    callback(item.ExchangeRate);

                //    if (pID != null && pID != undefined) //in case of editing
                //        if (pID == item.ID)
                //            option += '<option value="' + item.ID + '" ExchangeRate="' + item.ExchangeRate + '" selected >' + item.Code + '</option>';
                //        else
                //            option += '<option value="' + item.ID + '" ExchangeRate="' + item.ExchangeRate + '">' + item.Code + '</option>';
                //    else
                //        if ($("#hDefaultCurrencyID").val() == item.ID)
                //            option += '<option value="' + item.ID + '" ExchangeRate="1" selected >' + item.Code + '</option>';
                //        else
                //            option += '<option value="' + item.ID + '" ExchangeRate="' + item.ExchangeRate + '">' + item.Code + '</option>';
                FadePageCover(false);

            });
            if (JSON.parse(data[0]).length == 0) {
                if (callback != null && callback != undefined) //the data here is bool(pRecordsExist) and used as a flag for no records in reports //for Generate_MAWBs then data is string(return empty string if OK and returns MAWBSuffix if exists)
                    callback(0);
            }
            //$("#" + pSlName).append(option);



        },
        error: function (jqXHR, exception) {
            FadePageCover(false);
            swal("Oops!", "Please, contact your technical support! GetListCurrencyWithCodeAndExchangeRate in mainapp.master.js", "error");
        }
    });
}
function Payments_LoadingWithPaging() {
    debugger;
    var pWhereClause = PS_PaymentsTemp_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());

    //var pOrderBy = "ID DESC";
    var pOrderBy;
    pOrderBy = "ID DESC";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PS_PaymentsTemp_BindTableRows(JSON.parse(pData[0])); });


   // LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/PS_PaymentsTemp/LoadWithPaging", pWhereClause, "1", $('#select-page-size1').val().trim(), function (pTableRows) { Payments_BindTableRows(pTableRows); });


}

function PS_PaymentsTemp_GetWhereClause() {
    var pWhereClause = "where 1=1";
    if ($("#txtSearchCode").val().trim() != "")
    {
        pWhereClause +="and Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%' "
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
    if ($("#txtsearchVouchercash").val().trim() != "") {
        pWhereClause += " And CashCode LIKE N'%" + $("#txtsearchVouchercash").val().trim() + "%' "
    }
    if ($("#txtsearchVouchercheque").val().trim() != "") {
        pWhereClause += " And chequeCode LIKE N'%" + $("#txtsearchVouchercheque").val().trim() + "%' ";
    }
    if ($("#txtRefNo").val().trim() != "") {
        pWhereClause += " And RefNo LIKE N'%" + $("#txtRefNo").val().trim() + "%' ";
    }

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
function PS_PaymentsTemp_DeleteList() {
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

            DeleteListFunction("/api/PS_PaymentsTemp/Delete", { "pPaymentIDs": PaymentIDs }, function () { Payments_LoadingWithPaging(); });
        });
 }

//function Payments_GetWhereClause() {
//    var pWhereClause = "WHERE PaymentsType=" + glbFormCalled + "\n";
//    pWhereClause += " AND PaymentsDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND PaymentsDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";
//    if ($("#txtSearchCode").val().trim() != "")
//        pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
//    if ($("#slSearchSafe").val() != 0)
//        pWhereClause += " AND SafeID = " + $("#slSearchSafe").val() + "\n";
//    if ($("#txtSearchTotal").val().trim() != "")
//        pWhereClause += " AND TotalAfterTax = " + $("#txtSearchTotal").val().trim() + "\n";
//    if ($("#slSearchCurrency").val() != 0)
//        pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val() + "\n";
//    if ($("#txtSearchChargedPerson").val().trim() != "")
//        pWhereClause += " AND ChargedPerson LIKE N'%" + $("#txtSearchChargedPerson").val().trim() + "%'" + "\n";
//    if ($("#txtSearchNotes").val().trim() != "")
//        pWhereClause += " AND Notes LIKE N'%" + $("#txtSearchNotes").val().trim() + "%'" + "\n";
//    if ($("#slSearchCashOrCharge").val() == 10)
//        pWhereClause += " AND IsCash = 1" + "\n";
//    if ($("#slSearchCashOrCharge").val() == 20)
//        pWhereClause += " AND IsCash = 0" + "\n";
//    if ($("#slSearchStatus").val() == 10)
//        pWhereClause += " AND Approved = 1" + "\n";
//    if ($("#slSearchStatus").val() == 20)
//        pWhereClause += " AND Approved = 0" + "\n";
//    return pWhereClause;
//}
function PS_PaymentsTemp_ClearAllControls() {
    pCurrencyIDNew = 0;
    $("#txtBillNo").val("");
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

    TotalCost = 0;
    TotalPaid = 0;

    $("#txtTotalCost").val("");
    $("#txtTotalPaid").val("");
}
//function Payments_FillControls(pID) {
//    debugger;
//    ClearAll("#PaymentsModal");
//    if (!$("#cbApproved" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
//        Payments_EnableDisableEditing(1); //Enable
//    else
//        Payments_EnableDisableEditing(2); //Disable

//    $("#tblDetails tbody").html("");
//    FadePageCover(true);
//    var tr = $("#tblPayments tr[ID='" + pID + "']");
//    $("#hID").val(pID);

//    $("#lblShown").html("<span> : </span><span> " + $(tr).find("td.Code").text() + "</span>");
//    $("#txtCode").val($(tr).find("td.Code").text());
//    $("#txtPaymentsDate").val($(tr).find("td.PaymentsDate").text());
//    $("#slSafe").val($(tr).find("td.SafeID").text());

//    $("#slTax").val($(tr).find("td.TaxID").text());
//    $("#slTax2").val($(tr).find("td.TaxID2").text());
//    $("#txtTaxValue").val($(tr).find("td.TaxValue").text());
//    $("#txtTaxValue2").val($(tr).find("td.TaxValue2").text());

//    $("#slInvoice").val($(tr).find("td.InvoiceID").text());
//    $("#slCurrency").val($(tr).find("td.CurrencyID").text());
//    $("#txtExchangeRate").val($(tr).find("td.ExchangeRate").text());
//    if ($(tr).find("td.CurrencyID").text() == $("#hDefaultCurrencyID").val())
//        $("#txtExchangeRate").attr("disabled", "disabled");
//    else
//        $("#txtExchangeRate").removeAttr("disabled");
//    $("#txtChargedPerson").val($(tr).find("td.ChargedPerson").text());

//    $("#txtNotes").val($(tr).find("td.Notes").text());
//    if ($("#cbIsCash" + pID).prop("checked"))
//        $("#cbIsCash").prop("checked", true);
//    else
//        $("#cbIsCharge").prop("checked", true);
//    $("#lblTotal").html("<span> : </span><span>" + $(tr).find("td.Total").text() + "</span>");
//    $("#lblTotalAfterTax").html("<span> : </span><span>" + $(tr).find("td.TotalAfterTax").text() + "</span>");
//    //$("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

//    //$("#btnSave").attr("onclick", "Currencies_Update(false);");
//    //$("#btnSaveandNew").attr("onclick", "Currencies_Update(true);");

//    jQuery("#PaymentsModal").modal("show");
//    CallGETFunctionWithParameters("/api/Payments/GetPaymentsDetails"
//        , {
//            pPageNumber: 1
//            , pPageSize: 9999
//            , pWhereClausePaymentsDetails: "WHERE PaymentsID=" + pID
//            , pOrderBy: "Account_Name"
//        }
//        , function (pData) {
//            Details_BindTableRows(JSON.parse(pData[0]));
//            FadePageCover(false);
//        }
//        , null);

//    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
//        $("#lblShown").reverseChildren();
//        $("#lblTotal").reverseChildren();
//        $("#lblTotalAfterTax").reverseChildren();
//        //$("#lblDebitCreditDifference").reverseChildren();
//        $(".swapChildrenClass:not(.reversed)").reverseChildren();
//    }
//}
//function Payments_Save() {
//    debugger;
//    if ($("#txtExchangeRate").val() == 0)
//        swal("Sorry", "Exchange rate can not be 0.");
//    else if ($("#tblDetails tbody tr").length == 0)
//        swal("Sorry", "You must enter details.");
//    else if (ValidateForm("form", "PaymentsModal")) {
//        FadePageCover(true);
//        Payments_CalculateTotal();
//        var pParametersWithValues = {
//            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
//            , pCode: $("#txtCode").val().trim().toUpperCase()
//            , pPaymentsDate: ConvertDateFormat($("#txtPaymentsDate").val())
//            , pSafeID: $("#slSafe").val()
//            , pCurrencyID: $("#slCurrency").val()
//            , pExchangeRate: $("#txtExchangeRate").val()
//            , pChargedPerson: $("#txtChargedPerson").val().trim() == "" ? "0" : $("#txtChargedPerson").val().trim().toUpperCase()
//            , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
//            , pTaxID: ($("#slTax").val() != 0 && $("#txtTaxValue").val() != 0 ? $("#slTax").val() : 0)
//            , pTaxValue: ($("#slTax").val() != 0 && $("#txtTaxValue").val() != 0 ? $("#txtTaxValue").val() : 0)
//            , pTaxSign: (
//                            ($("#slTax option:selected").attr("IsDebitAccount") == 1
//                                && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//                            )
//                            || ($("#slTax option:selected").attr("IsDebitAccount") == 0
//                                && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//                            )
//                         )
//                         ? -1 : 1
//            , pTaxID2: ($("#slTax2").val() != 0 && $("#txtTaxValue2").val() != 0 ? $("#slTax2").val() : 0)
//            , pTaxValue2: ($("#slTax2").val() != 0 && $("#txtTaxValue2").val() != 0 ? $("#txtTaxValue2").val() : 0)
//            , pTaxSign2: (
//                            ($("#slTax2 option:selected").attr("IsDebitAccount") == 1
//                                && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//                            )
//                            || ($("#slTax2 option:selected").attr("IsDebitAccount") == 0
//                                && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//                            )
//                         )
//                         ? -1 : 1
//            , pTotal: parseFloat($("#lblTotal").text().replace(":", ""))
//            , pTotalAfterTax: parseFloat($("#lblTotalAfterTax").text().replace(":", ""))
//            , pIsAGInvoice: false
//            , pAGInvType_ID: 000
//            , pInv_No: 000
//            , pInvoiceID: 000
//            , pJVID1: 000
//            , pJVID2: 000
//            , pJVID3: 000
//            , pJVID4: 000
//            , pSalesManID: 000
//            , pforwOperationID: 000
//            , pIsCustomClearance: false
//            , pTransType_ID: 000
//            , pPaymentsType: glbFormCalled
//            , pIsCash: ($("#cbIsCash").prop("checked") && glbFormCalled == constPaymentsCashOut) ? true : false
//            , pIsCheque: false
//            , pPrintDate: "01/01/1900"
//            , pChequeNo: 000
//            , pChequeDate: "01/01/1900"
//            , pBankID: 000
//            , pOtherSideBankName: 0
//            , pCollectionDate: "01/01/1900"
//            , pCollectionExpense: 000
//                        , pDiscountTaxID: 0
//            , pDiscountTaxValue: 0
//            , pDiscountTaxID2: 0
//            , pDiscountTaxValue2: 0
//        };
//        CallGETFunctionWithParameters("/api/Payments/PaymentsHeader_Save", pParametersWithValues
//            , function (pData) {
//                var pMessageReturned = pData[0];
//                if (pMessageReturned == "") {
//                    swal("Success", "Saved successfully.");
//                    jQuery("#PaymentsModal").modal("hide");
//                    Payments_LoadingWithPaging();
//                    //FadePageCover(false); //called in LoadWithPaging
//                }
//                else {
//                    swal("Sorry", pMessageReturned);
//                    FadePageCover(false);
//                }
//            }
//            , null);
//    }
//}
//function Payments_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
//    if (pOption == 1) {
//        $("#btnSave").removeAttr("disabled");
//        $("#btnSaveandNew").removeAttr("disabled");
//        $("#btn-AddDetails").removeAttr("disabled");
//        $("#btn-DeleteDetails").removeAttr("disabled");
//        $("#btnSaveDetails").removeAttr("disabled");
//        $("#btnSaveandNewDetails").removeAttr("disabled");
//    }
//    else {
//        $("#btnSave").attr("disabled", "disabled");
//        $("#btnSaveandNew").attr("disabled", "disabled");
//        $("#btn-AddDetails").attr("disabled", "disabled");
//        $("#btn-DeleteDetails").attr("disabled", "disabled");
//        $("#btnSaveDetails").attr("disabled", "disabled");
//        $("#btnSaveandNewDetails").attr("disabled", "disabled");
//    }
//}
//function Payments_GetCodeAndSetCurrency() {
//    debugger;
//    if ($("#hID").val() == 0 || $("#hID").val() == "") { //i.e. insert
//        if ($("#slSafe").val() == 0)
//            $("#txtCode").val("");
//        else {
//            var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
//            FadePageCover(true);
//            CallGETFunctionWithParameters("/api/Payments/GetCode"
//                , {
//                    pSafeID: $("#slSafe").val()
//                    , pBankID: 0
//                    , pDate: ConvertDateFormat(pFormattedTodaysDate)
//                    , pPaymentsType: glbFormCalled
//                }
//                , function (pData) {
//                    $("#txtCode").val(pData[0]);
//                    $("#slCurrency").val($("#slSafe option:selected").attr("CurrencyID"));
//                    Payments_CurrencyChanged("slCurrency", "txtExchangeRate", "");
//                    //FadePageCover(false); //called in Payments_CurrencyChanged()
//                }
//                , null);
//        }
//    }
//    else { //Update so just adjust currency
//        $("#slCurrency").val($("#slSafe option:selected").attr("CurrencyID"));
//        Payments_CurrencyChanged("slCurrency", "txtExchangeRate", "");
//    }
//}
//function Payments_CalculateTotal() {
//    debugger;
//    //Total = Sum of all rows + Sum of positive Taxes
//    //TotalAfterTax = For In-Paymentss  then (Total + Sum or Diff. of all Taxes) 
//    var pTaxValue = ($("#txtTaxValue").val() == "" || $("#slTax").val() == 0 ? 0 : $("#txtTaxValue").val());
//    var pTaxValue2 = ($("#txtTaxValue2").val() == "" || $("#slTax2").val() == 0 ? 0 : $("#txtTaxValue2").val());
//    if (
//            ($("#slTax option:selected").attr("IsDebitAccount") == 1
//                && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//            )
//            || ($("#slTax option:selected").attr("IsDebitAccount") == 0
//                && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//            )
//        )
//        pTaxValue = pTaxValue * -1;
//    if (
//            ($("#slTax2 option:selected").attr("IsDebitAccount") == 1
//                && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//            )
//            || ($("#slTax2 option:selected").attr("IsDebitAccount") == 0
//                && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//            )
//        )
//        pTaxValue2 = pTaxValue2 * -1;
//    var pTotal = 0;
//    var pTotalAfterTax = 0;
//    pTotal = GetColumnSum("tblDetails", "Value");
//    pTotalAfterTax = pTotal;
//    pTotal += (parseFloat(parseFloat(pTaxValue).toFixed(2) > 0 ? parseFloat(pTaxValue).toFixed(2) : 0))
//        + (parseFloat(parseFloat(pTaxValue2).toFixed(2) > 0 ? parseFloat(pTaxValue2).toFixed(2) : 0));
//    pTotalAfterTax += parseFloat(pTaxValue) + parseFloat(pTaxValue2);

//    $("#lblTotal").html("<span> : </span><span>" + parseFloat(pTotal).toFixed(2) + "</span>");
//    $("#lblTotalAfterTax").html("<span> : </span><span>" + parseFloat(pTotalAfterTax).toFixed(2) + "</span>");
//    //$("#lblDebitCreditDifference").html("<span> : </span><span>" + (parseFloat(pTotalAfterTax) - parseFloat(pTotal)).toFixed(2) + "</span>");
//    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
//        $("#lblTotal").reverseChildren();
//        $("#lblTotalAfterTax").reverseChildren();
//    }
//}
//function Payments_CurrencyChanged(pCurrencyControlID, pExchangeRateControlID, pRowID) {
//    debugger;
//    FadePageCover(true);
//    GetListCurrencyWithCodeAndExchangeRateAttr_ERP(null, "/api/Currencies/LoadCurrencyDetails"
//        , null/*1st Row*/, "slCurrencyDetails"
//        , ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtPaymentsDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
//            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtPaymentsDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
//            + " ORDER BY CODE"
//          )
//        , function () {
//            if ($("#" + pCurrencyControlID + pRowID).val() == $("#hDefaultCurrencyID").val()) {
//                $("#" + pExchangeRateControlID + pRowID).attr("disabled", "disabled");
//                $("#" + pExchangeRateControlID + pRowID).val(1);
//            }
//            else {
//                $("#" + pExchangeRateControlID + pRowID).removeAttr("disabled");
//                $("#slCurrencyDetails").val($("#" + pCurrencyControlID + pRowID).val());
//                if ($("#slCurrencyDetails option:selected").attr("ExchangeRate") == undefined)
//                    $("#" + pExchangeRateControlID + pRowID).val("");
//                else
//                    $("#" + pExchangeRateControlID + pRowID).val($("#slCurrencyDetails option:selected").attr("ExchangeRate"));
//            }
//            FadePageCover(false);
//        });

//}
//function Payments_DeleteList() {
//    debugger;
//    var pSelectedIDs = GetAllSelectedIDsAsString('tblPayments', 'Delete');
//    if (pSelectedIDs != "")
//        swal({
//            title: "Are you sure?",
//            text: "The selected records will be deleted permanently!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            closeOnConfirm: true
//        },
//        function () {
//            FadePageCover(true);
//            CallGETFunctionWithParameters("/api/Payments/Delete"
//                , { pDeletedIDs: pSelectedIDs, pCheckFiscalClosed: true }
//                , function (pData) {
//                    if (!pData[0]) {
//                        showDeleteFailMessage = true;
//                        strDeleteFailMessage = "One or more Paymentss are not deleted because fiscal year is closed or date is frozen.";
//                    }
//                    Payments_LoadingWithPaging();
//                }
//                , null);
//        });
//}
/****************************************Details*********************************************/
//function Details_BindTableRows(pTableRows) {
//    debugger;
//    ClearAllTableRows("tblDetails");
//    $.each(pTableRows, function (i, item) {
//        AppendRowtoTable("tblDetails",
//            ("<tr ID='" + item.ID + "' "
//                + (" ondblclick='Details_FillControls(" + item.ID + ");' ")
//                + ">"
//                    + "<td class='DetailsID'> <input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
//                    + "<td class='Value'>" + item.Value + "</td>"
//                    + "<td class='Description'>" + (item.Description == 0 ? "" : item.Description) + "</td>"
//                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
//                    + "<td class='AccountName'>" + (item.Account_Name + " - " + item.Account_Number) + "</td>"
//                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
//                    + "<td class='SubAccountName'>" + (item.SubAccountID == 0 ? "" : (item.SubAccount_Name + " - " + item.SubAccount_Number)) + "</td>"
//                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
//                    + "<td class='CostCenterName'>" + (item.CostCenterID == 0 ? "" : (item.CostCenterName + " - " + item.CostCenterNumber)) + "</td>"
//                    + "<td class='Documented'> <input id=cbDocumented" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsDocumented ? " checked='checked' " : "") + " /></td>"
//                    //+ "<td class='InvoiceNo " + (glbFormCalled == constPaymentsCashIn ? "" : "hide") + "'>" + (item.InvoiceID == 0 ? "" : item.InvoiceNo) + "</td>"
//                    + "<td class='hide'><a href='#DetailsModal' data-toggle='modal' onclick='Details_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
//    });
//    //ApplyPermissions();
//    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
//    CheckAllCheckbox("HeaderDeleteDetailsID");
//    //HighlightText("#tblDetails>tbody>tr", $("#txt-Search").val().trim());
//    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
//        swal(strSorry, strDeleteFailMessage);
//        showDeleteFailMessage = false;
//    }
//}
//function Details_ClearAllControls() {
//    debugger;
//    if ($("#txtExchangeRate").val() == 0)
//        swal("Sorry", "Exchange rate can not be 0.");
//    else if (ValidateForm("form", "PaymentsModal")) {
//        ClearAll("#DetailsModal");
//        //Start Auto Filter
//        $("#slAccount").trigger("change");
//        $("#slSubAccount").trigger("change");
//        //End Auto Filter
//        jQuery("#DetailsModal").modal("show");
//    }
//}
//function Details_FillControls(pDetailsID) {
//    debugger;
//    if ($("#txtExchangeRate").val() == 0)
//        swal("Sorry", "Exchange rate can not be 0");
//    else if (ValidateForm("form", "PaymentsModal")) {
//        ClearAll("#DetailsModal");
//        $("#lblDetails").html($("#lblShown").html());

//        var tr = $("#tblDetails tr[ID='" + pDetailsID + "']");

//        $("#lblDetails").html($("#lblShown").html());
//        $("#hDetailsID").val(pDetailsID);
//        $("#txtValue").val($(tr).find("td.Value").text());
//        $("#txtDescription").val($(tr).find("td.Description").text());
//        $("#slAccount").val($(tr).find("td.AccountID").text());
//        //Start Auto Filter
//        $("#slAccount").trigger("change");
//        $("#slSubAccount").trigger("change");
//        //End Auto Filter

//        Details_FillSlSubAccount("slSubAccount", $(tr).find("td.SubAccountID").text());


//        $("#slCostCenter").val($(tr).find("td.CostCenterID").text());
//        $("#cbIsDocumented").prop("checked", $("#cbIsDocumented" + pDetailsID).prop("checked"));
//        jQuery("#DetailsModal").modal("show");
//    }
//}
//function Details_Save(pSaveAndNew) {
//    debugger;
//    if ($("#txtValue").val() == 0)
//        swal("Sorry", "Value can not be 0.");
//    else if (ValidateForm("form", "DetailsModal")) {
//        FadePageCover(true);
//        var pParametersWithValues = {
//            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
//            , pCode: $("#txtCode").val().trim().toUpperCase()
//            , pPaymentsDate: ConvertDateFormat($("#txtPaymentsDate").val())
//            , pSafeID: $("#slSafe").val()
//            , pCurrencyID: $("#slCurrency").val()
//            , pExchangeRate: $("#txtExchangeRate").val()
//            , pChargedPerson: $("#txtChargedPerson").val().trim() == "" ? "0" : $("#txtChargedPerson").val().trim().toUpperCase()
//            , pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
//            , pTaxID: ($("#slTax").val() != 0 && $("#txtTaxValue").val() != 0 ? $("#slTax").val() : 0)
//            , pTaxValue: ($("#slTax").val() != 0 && $("#txtTaxValue").val() != 0 ? $("#txtTaxValue").val() : 0)
//            , pTaxSign: ($("#slTax option:selected").attr("IsDebitAccount") == 1
//                            && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//                         )
//                         ||
//                         ($("#slTax option:selected").attr("IsDebitAccount") == 0
//                             && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//                         )
//                         ? -1 : 1
//            , pTaxID2: ($("#slTax2").val() != 0 && $("#txtTaxValue2").val() != 0 ? $("#slTax2").val() : 0)
//            , pTaxValue2: ($("#slTax2").val() != 0 && $("#txtTaxValue2").val() != 0 ? $("#txtTaxValue2").val() : 0)
//            , pTaxSign2: ($("#slTax2 option:selected").attr("IsDebitAccount") == 1
//                            && (glbFormCalled == constPaymentsCashIn || glbFormCalled == constPaymentsChequeIn)
//                         )
//                        ||
//                         ($("#slTax2 option:selected").attr("IsDebitAccount") == 0
//                             && (glbFormCalled == constPaymentsCashOut || glbFormCalled == constPaymentsChequeOut)
//                         )
//                         ? -1 : 1
//            , pTotal: parseFloat($("#lblTotal").text().replace(":", "")) //will be update in controller
//            , pTotalAfterTax: parseFloat($("#lblTotalAfterTax").text().replace(":", "")) //will be update in controller
//            , pIsAGInvoice: false
//            , pAGInvType_ID: 000
//            , pInv_No: 000
//            , pInvoiceID: 000
//            , pJVID1: 000
//            , pJVID2: 000
//            , pJVID3: 000
//            , pJVID4: 000
//            , pSalesManID: 000
//            , pforwOperationID: 000
//            , pIsCustomClearance: false
//            , pTransType_ID: 000
//            , pPaymentsType: glbFormCalled
//            , pIsCash: ($("#cbIsCash").prop("checked") && glbFormCalled == constPaymentsCashOut) ? true : false
//            , pIsCheque: false
//            , pPrintDate: "01/01/1900"
//            , pChequeNo: 000
//            , pChequeDate: "01/01/1900"
//            , pBankID: 000
//            , pOtherSideBankName: 0
//            , pCollectionDate: "01/01/1900"
//            , pCollectionExpense: 000
//              , pDiscountTaxID: 0
//            , pDiscountTaxValue: 0
//            , pDiscountTaxID2: 0
//            , pDiscountTaxValue2: 0
//            //Details Data
//            , pDetailsID: $("#hDetailsID").val() == "" ? 0 : $("#hDetailsID").val()
//            , pValue: $("#txtValue").val()
//            , pDescription: $("#txtDescription").val().trim() == "" ? 0 : $("#txtDescription").val().trim().toUpperCase()
//            , pAccountID: $("#slAccount").val()
//            , pSubAccountID: $("#slSubAccount").val()
//            , pCostCenterID: $("#slCostCenter").val()
//            , pIsDocumented: $("#cbIsDocumented").prop("checked")
//            , pDetailsInvoiceID: 000
//        };
//        CallGETFunctionWithParameters("/api/Payments/PaymentsDetails_Save", pParametersWithValues
//            , function (pData) {
//                var pMessageReturned = pData[0];
//                if (pMessageReturned == "") {
//                    var pPaymentsID = pData[1];
//                    var pDetails = JSON.parse(pData[2]);
//                    $("#hID").val(pPaymentsID);
//                    Details_BindTableRows(pDetails);
//                    Payments_CalculateTotal();
//                    $("#lblShown").html("<span> : </span><span> " + $("#txtCode").val().trim() + "</span>");
//                    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
//                        $("#lblShown").reverseChildren();
//                    swal("Success", "Saved successfully.");
//                    Payments_LoadingWithPaging();
//                    if (pSaveAndNew)
//                        Details_ClearAllControls();
//                    else
//                        jQuery("#DetailsModal").modal("hide");
//                    //FadePageCover(false); //called in LoadWithPaging
//                }
//                else {
//                    swal("Sorry", pMessageReturned);
//                    FadePageCover(false);
//                }
//            }
//            , null);
//    }
//}
//function Details_FillSlSubAccount(pSlName, pSubAccountID) {
//    debugger;
//    if ($("#slAccount").val() == 0) //No Account is selected so just empty subaccounts
//        $("#slSubAccount").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
//    else {
//        FadePageCover(true);
//        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
//            , {
//                pLanguage: $("[id$='hf_ChangeLanguage']").val()
//                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccount").val()
//                , pOrderBy: "Name"
//            }
//            , function (pData) {
//                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
//                //Start Auto Filter
//                $("#" + pSlName).trigger("change");
//                //End Auto Filter
//                FadePageCover(false);
//            }
//            , null);
//    }
//}
//function Details_DeleteList() {
//    debugger;
//    var pDeletedDetailsIDs = GetAllSelectedIDsAsString('tblDetails', 'Delete');
//    if (pDeletedDetailsIDs.split(',').length == $("#tblDetails tbody tr").length)
//        swal("Sorry", "A Payments can not remain without details.");
//    else if (pDeletedDetailsIDs != "")
//        swal({
//            title: "Are you sure?",
//            text: "The selected records will be deleted permanently!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            closeOnConfirm: true
//        },
//        //callback function in case of confirm delete
//        function () {
//            FadePageCover(true);
//            CallGETFunctionWithParameters("/api/Payments/Details_Delete"
//                , { pDeletedDetailsIDs: pDeletedDetailsIDs, pPaymentsID: $("#hID").val() }
//                , function (pData) {
//                    var pMessageReturned = pData[2];
//                    if (pData[2] == "") {
//                        Details_BindTableRows(JSON.parse(pData[1]));
//                        if (pData[0])
//                            swal("Success", "Deleted successfully.");
//                        else
//                            swal("Sorry", strDeleteFailMessage);
//                        Payments_CalculateTotal();
//                        Payments_LoadingWithPaging();
//                        //FadePageCover(false); //called in LoadWithPaging
//                    }
//                    else {
//                        swal("Sorry", pMessageReturned);
//                        FadePageCover(false);
//                    }

//                }
//                , null);
//        });
//}


//function Payments_Copy(pIDToCopy) {
//    debugger;
//    FadePageCover(true);
//    var pParametersWithValues = {
//        pIDToCopy: pIDToCopy
//        //LoadWithPaging Parameters
//        , pIsLoadArrayOfObjects: false
//        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
//        , pWhereClause: Payments_GetWhereClause()
//        , pPageSize: $('#select-page-size').val()
//        , pPageNumber: 1 //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
//        , pOrderBy: "ID DESC"
//    }                               
//    CallGETFunctionWithParameters("/api/Payments/Copy"
//        , pParametersWithValues
//        , function (pData) {
//            if (pData[0] == "") {
//                Payments_BindTableRows(JSON.parse(pData[1]));
//                swal("Success", "Saved successfully.");
//                FadePageCover(false);
//            }
//            else {
//                swal("Sorry", pData[0]);
//                FadePageCover(false);
//            }
//        }
//        , null);
//}



////////////////////////////////////// Search Invoices /////////////////////////////////////////////////
/*
-- =============================================
-- Author:		Mohamed A. Abd Elmougood
-- Create date: 02.13.2018
-- Description:	Search Invoices Java-script File
-- =============================================
*/
AutoComplete();
var strDateFormat = 'dd/mm/yyyy';

function Search_Init() {
    debugger;
    GetListWithCurrency(null, "/api/PS_PaymentsTemp/LoadAllCurrencyByName", "not null", "slHideCurrency");
    PS_PaymentsTemp_ClearAllControls();
//if ($("#slHideCurrency").html() != "" && $("#slHideBanks").html() != "" && $("#slHideSafes").html() != "") {
    if ($("#slHideCurrency").html() != "") {
        //document.documentElement.scrollTop = 0;
        jQuery("#PaymentsModal").modal("show");

        ClearAllTableRows("tblCheque");
        ClearAllTableRows("tblCash");
        ClearAllTableRows("tblDeposite");
        ClearAllTableRows("tblTransfer");
        DepositeRows = 1;
        TransferRows = 1;
        ChequeRows = 1;
        CashRows = 1;

    //setTimeout(function () {
        Cash_BindTableRows();
        Cheque_BindTableRows();
        Deposite_BindTableRows();
        Transfer_BindTableRows();

    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slCashTax1", "ID", "Name", "IsDebitAccount = 0");
    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slChequeTax1", "ID", "Name", "IsDebitAccount = 0");

        //GetListComboWithName(null, "/api/Taxes/LoadAll", "not null", "slCashTax1", "ID", "Name");
        //GetListComboWithName(null, "/api/Taxes/LoadAll", "not null", "slChequeTax1", "ID", "Name");

    //}, 1500);
        // GetListComboWithName(null, "/api/Taxes/LoadAll", "not null", "slCashTax", "ID", "Name");$('#slSearchCurrency').change(function () {

       // var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
        var pWhereClause = "";

               // + " OR PaymentDate LIKE N'%" + $("#txtsearchPaymentDate").val().trim() + "%' "
               // + " OR Name LIKE N'%" + $("#txtsearchClientID").val().trim() + "%' "
               // + " OR Notes LIKE N'%" + $("#txtsearchPaymentNotes").val().trim() + "%' ";
    //+ " OR Username LIKE N'%" + $('#slsearchUserID option:selected').val() + "%' ";
    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
   // LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
    var pWhereClause="where 1=1"

    //Clients_GetList(pWhereClause, "null");
    $.ajax({
        type: "GET",
            url: strServerURL + "api/PS_InvoicesTemp/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pOnlyCurrency: false },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- Select Supplier -->', '#slSearchClient', '');

        }
    });
   }
}

function GetListComboWithNameAndWhereClauses(pID, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName, WhereClauses, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClause: WhereClauses, pOrderBy: pTableID },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pSelectTxt != "null") {
                option = '<option value="">' + TranslateString("SelectFromMenu") + '</option>';
            }

            // Bind Data
            $.each(JSON.parse(data), function (i, item) {
                if (pID != null && pID != undefined) //in case of editing
                    if (pID == item[pTableID])
                        option += '<option value="' + item[pTableID] + '" selected >' + item[pColumnName] + '</option>';
                    else
                        option += '<option value="' + item[pTableID] + '">' + item[pColumnName] + '</option>';
                else
                    option += '<option value="' + item[pTableID] + '">' + item[pColumnName] + '</option>';
            });


            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();

        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support! GetListComboWithName in mainapp.master.js", "error");
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
                    //+ "<td class='InvoiceType hide'>" + item.InvoiceTypeName + "</td>"
                    //+ "<td class='IsFreightInvoice hide'>" + (item.IsFreightInvoice ? 1 : 0) + "</td>"
                    //+ "<td class='IsStorageInvoice hide'>" + (item.IsStorageInvoice ? 1 : 0) + "</td>"
                    //+ "<td class='IsDemurrageInvoice hide'>" + (item.IsDemurrageInvoice ? 1 : 0) + "</td>"
                   // + "<td class='InvoiceNo'>" + item.InvoiceNo + "</td>"
                    + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
            + "<td class='InvoiceNo text-overflow-150' title='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
            + "<td class='Type text-overflow-150' title='" + item.Type + "'>" + item.Type + "</td>"

                    + "<td class='supplierName text-overflow-150' title='" + item.supplierName + "'>" + item.supplierName + "</td>"
                    //+ "<td class='VesselName text-overflow-150' title='" + item.VesselName + "'>" + item.VesselName + "</td>"
                  //  + "<td class='VoyageNumber text-overflow-150' title='" + item.VoyageNumber + "'>" + item.VoyageNumber + "</td>"
                   // + "<td class='IsAudited' val='" + item.IsAudited + "'>" + IsDefault_GetICON(item.IsAudited) + "</td>"
                  //  + "<td class='IsPaid' val='" + item.IsPaid + "'>" + IsDefault_GetICON(item.IsPaid) + "</td>"
                  //  + "<td class='PortCode'>" + item.PortCode + "</td>"
                    //+ "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                    + "<td class='TotalPrice align-right' style='text-align: right;'>" + item.Currency + " " + item.TotalPrice + "</td>"
                    + "<td class='PaidAmount'>" + item.PaidAmount + "</td>"
            + "<td class='RemainAmount'>" + item.RemainAmount + "</td>"
            + "<td class='isPurchase hide'>" + (item.Type =="Purchase" ? true : false ) + "</td>"

                   // + "<td class='TotalPrice align-right' style='text-align: right;'>" + item.TotalPrice + "</td>"
                    //+ "<td class='Qty'>" + "<input tag='" + item.Qty + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                     //+ "<td class='Qty' val='" + item.Qty + "'>" + "<input   disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    //+ "<td class='Qty' val='" + item.Qty + "'>" + item.Qty + "<input val='" + item.Qty + "'   disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'  disabled='disabled' type='text' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
            + "<td class='AmountOnly' hidden >" + item.Qty + "</td>"
            + "<td class='AmountTextCurrency' hidden >" + item.Currency + "</td>"
                    + "<td class='Choose'> <input id='txtChoose' type='checkbox' disabled onchange='SelectRowInTable(" + i + ");'/></td>"
                    //+ "<td class='Remarks'>" + item.Remarks + "</td>"
                    + "</tr>"));

        //if (CurrencyID != "") {
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
                        //+ "<td class='IsDbt' val='" + item.Qty + "'>"+ <input name='Delete' type='checkbox' disabled value='" + item.IsDbt + "' /></td>"
                        + "<td class='IsDbt hide' val='" + item.IsDbt + "'>" + IsDefault_GetICON(item.IsDbt) + "</td>"
                        + "<td class='BdtCrdt'>" + item.BdtCrdt + "</td>"

                        //+ "<td class='InvoiceType hide'>" + item.InvoiceTypeName + "</td>"
                        //+ "<td class='IsFreightInvoice hide'>" + (item.IsFreightInvoice ? 1 : 0) + "</td>"
                        //+ "<td class='IsStorageInvoice hide'>" + (item.IsStorageInvoice ? 1 : 0) + "</td>"
                        //+ "<td class='IsDemurrageInvoice hide'>" + (item.IsDemurrageInvoice ? 1 : 0) + "</td>"
                       // + "<td class='InvoiceNo'>" + item.InvoiceNo + "</td>"
                        + "<td class='DbtCrdtNoteDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DbtCrdtNoteDate)) + "</td>"
                        + "<td class='InvoiceNo text-overflow-150' title='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                        + "<td class='supplierName text-overflow-150' title='" + item.supplierName + "'>" + item.supplierName + "</td>"
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
                    // + "<td class='IsDbt' > <input id='txtChoose' type='checkbox' disabled onchange='SelectRowInTableDCNotes(" + i + ");'/></td>"
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
                if ($(tr).find('td.Qty').find('.input_quantity').val() > parseFloat($(tr).find('td.RemainAmount').text())) {
                    swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
                    return false;
                }
                debugger;
                if ($(tr).find("td.IsDbt").attr('val') == "false") {
                    TotalPaid -= $(tr).find('td.Qty').find('.input_quantity').val() * 1;

                }
                else {
                    TotalPaid += $(tr).find('td.Qty').find('.input_quantity').val() * 1;
                }
            }
        });


        $("#txtTotalPaid").val(Math.abs(TotalPaid));

}
var counter = 0;
function chSearchClient() {
    debugger;
    if ($("#slSearchClient").val() != "") {
        $("#slSearchCurrency").removeAttr("disabled");
    } else {
        $("#slSearchCurrency").attr("disabled", "disabled");
    }
    if (0 == 0) {
        var pWhereClause = "";
        if ($("#txtBillNo").val().trim() != "" && $("#txtInvoiceSerialSearch").val().trim() != "") {
            pWhereClause = " Where supplierName = '" + ($("#slSearchClient option:selected").text() == "Select Supplier" ? "" : $("#slSearchClient option:selected").text()) + "'"
                             + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim()
                             + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
        } else if ($("#txtBillNo").val().trim() != "") {
            pWhereClause = " Where supplierName = '" + ($("#slSearchClient option:selected").text() == "Select Supplier" ? "" : $("#slSearchClient option:selected").text()) + "'"
                         + " And BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' ";
        } else if ($("#txtInvoiceSerialSearch").val().trim() != "") {
            pWhereClause = " Where supplierName = '" + ($("#slSearchClient option:selected").text() == "Select Supplier" ? "" : $("#slSearchClient option:selected").text()) + "'"
                         + " And InvoiceSerial = " + $("#txtInvoiceSerialSearch").val().trim();
        } else
            pWhereClause = " Where supplierName = '" + ($("#slSearchClient option:selected").text() == "Select Supplier" ? "" : $("#slSearchClient option:selected").text()) + "'";

        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClause, "1", $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });
        Currency_GetList(null, "null");


    }

}
var TotalCost = 0;
var InvoicesExchangeRate = 0;
function SelectRowInTable(pRowIndex) {   
    debugger;
    if (($($('#tblInvoices tbody tr')[pRowIndex]).find('#txtChoose').is(":checked"))) {
       //if (($($('#tblInvoices tbody tr')[pRowIndex]).find('#txtChoose').is(":checked")) && $($('#tblInvoices tbody tr')[pRowIndex]).find('.Type').text() != "Tramp") {

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
function chSearchCurrency() {
    debugger;
    if ($("#slSearchCurrency option:selected").val() != "" && $("#txtPaymentDate").val() != "") {
        GetDefaultExchangeRate();
    }

    if ($("#slSearchClient option:selected").text() != "Select Supplier" && $("#slSearchCurrency option:selected").val() != "") {
        //var pWhereClause = " Where ClientName = '" + ($("#slSearchClient option:selected").text() == "Select Client" ? "" : $("#slSearchClient option:selected").text()) + "'"
        //                 + " And Currency = '" + $("#slSearchCurrency option:selected").text() + "'";
        var pWhereClause = " Where supplierID = '" + ($("#slSearchClient option:selected").val() == "Select Supplier" ? "" : $("#slSearchClient option:selected").val()) + "'"
            + " And Currency = '" + $("#slSearchCurrency option:selected").text() + "'";
        CurrencyID = $("#slSearchCurrency option:selected").val();
        loadWithPagingWithParmWhere(pWhereClause);
    } else if ($("#slSearchCurrency option:selected").val() == "") {
        var pWhereClause = " Where supplierID = '" + ($("#slSearchClient option:selected").val() == "Select Supplier" ? "" : $("#slSearchClient option:selected").val()) + "'"
        loadWithPagingWithParmWhere(pWhereClause);
    } else {
        var pWhereClause = " Where Currency = '" + $("#slSearchCurrency option:selected").text() + "'";
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
    var ClientName1 = $("#slSearchClient option:selected").text();
    var ClientName2 = $("#txtClientName").val();
    if (ClientName1 == "Select Supplier" || ClientName1 == "<--Select-->" || ClientName1 == "" && ClientName2 != "") {
        ClientName = ClientName2;
    } else if (ClientName2 == "" && ClientName1 != "" && ClientName1 != "Select Supplier") {
        ClientName = ClientName1;
    } else {
        ClientName = ClientName2;
        $("#slSearchCurrency").attr("disabled", "disabled");
    }
    var pWhereClause = " Where BillNumber LIKE N'%" + $("#txtBillNo").val().trim() + "%' "
                    + " And supplierName LIKE N'%" + ClientName + "%' "
                    + " And Currency LIKE N'%" + currency + "%' ";
                
    CurrencyID = $("#slSearchCurrency option:selected").val();
    loadWithPagingWithParmWhere(pWhereClause);
}


function Search_LoadingWithPaging(pPageNo, pPageSize) {

    var currency = $("#slSearchCurrency option:selected").val() != "" ? $("#slSearchCurrency option:selected").text() : "";
    //var pWhereClause = " Where InvoiceNo LIKE N'%" + $("#txtBillNo").val().trim() + "%' "
    //                    " And supplierName LIKE N'%" + ($("#slSearchClient option:selected").text() == "Select Client" ? "" : $("#slSearchClient option:selected").text()) + "%' "
    //                  // + " And Currency LIKE N'%" + currency + "%' ";
   var pWhereClause = " Where supplierID = '" + ($("#slSearchClient option:selected").val() == "Select Supplier" ? "" : $("#slSearchClient option:selected").val()) + "'"
                                        + " And Currency = '" + $("#slSearchCurrency option:selected").text() + "'";

                        FadePageCover(true);
    $(".btn-Options").addClass("hide");
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, pPageNo, pPageSize, function (pTabelRows) { PaymentsSearchInvoices_BindTableRows(pTabelRows); });
}

function loadWithPagingWithParmWhere(pWhereClause)
{
    debugger;
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoices", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoices_BindTableRows(pTableRows); });
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PaymentsTemp/LoadInvoicesDbtCrdtNote", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTableRows) { PaymentsSearchInvoicesDbtCrdtNotes_BindTableRows(pTableRows); });

}

function Currency_GetList(pCurrencyID, pSelectTxt) {
    debugger;
    GetListWithCurrency(pCurrencyID, "/api/PS_PaymentsTemp/LoadAllCurrencyByName", pSelectTxt, "slSearchCurrency");
}
function GetListWithCurrency(pCurrencyID, pStrFnName, pSelectTxt, pSlName, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pCurrencyID: "ID" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            ClearAllOptions(pSlName);
            var option = "";
            if (pSelectTxt == "null") {
                option = '<option value="-1">' + TranslateString("SelectFromMenu") + '</option>';
            }

            // Bind Data
            $.each(JSON.parse(data), function (i, item) {
                //if (pBillNo != null && pBillNo != undefined) //in case of editing
                //    option += '<option value="' + item.CurrencyID + '">' + item.CurrencyCode + '</option>';

                if (pCurrencyID != null && pCurrencyID != undefined) //in case of editing
                    if (pCurrencyID == item.CurrencyID)
                        option += '<option value="' + item.CurrencyID + '" selected >' + item.CurrencyCode + '</option>';
                    else
                        option += '<option value="' + item.CurrencyID + '">' + item.CurrencyCode + '</option>';
                else
                    option += '<option value="' + item.CurrencyID + '">' + item.CurrencyCode + '</option>';
            });


            $("#" + pSlName).append(option);

            if (callback != null && callback != undefined)
                callback();

        },
        error: function (jqXHR, exception) {
            swal("Oops!", "Please, contact your technical support! GetListWithCurrency in mainapp.master.js", "error");
        }
    });
}

function Currency_GetListnew(pCurrencyID, pSelectTxt) {
    debugger;
    GetListWithCurrencyID(pCurrencyID, "/api/PS_PaymentsTemp/LoadAllCurrencyByName", pSelectTxt, "slSearchCurrency");
}

function Clients_GetList(pBillNo, pSelectTxt) {
    debugger;
    GetListWithClients(pBillNo, "/api/PS_PaymentsTemp/LoadAllClientsByName", pSelectTxt, "slSearchClient");
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
    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slCashTax" + CashRows, "ID", "Name", "IsDebitAccount = 1");
    if (CashRows == 1)
        ClearAllTableRows("tblCash");
    debugger;
    AppendRowtoTable("tblCash",
        ("<tr counter='" + CashRows + "' value='" + 0 + "'>"
            + "<td counter='" + CashRows + "'> <button id='btn-DeleteDetails-" + CashRows + "' type='button' onclick='DeleteItems(" + CashRows + "," + (1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + CashRows + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

            + "<td class='CashSafe" + CashRows + "' ' ><select id='slCashSafe" + CashRows + "' onChange='ChangeSafe(" + CashRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='CashCurrency" + CashRows + "' ' ><select id='slCashCurrency" + CashRows + "'  disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='ExchangeRate" + CashRows + "' ><input type='number' id='txtCashExchangeRate" + CashRows + "'disabled  data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='NewExchangeRate" + CashRows + "' ><input type='number' id='txtNewCashExchangeRate" + CashRows + "'  data-required='false' class='input-sm form-control' tabindex='5'/></td>"

            + "<td class='CashAmount" + CashRows + "' ' ><input type='number' id='txtCashAmount" + CashRows + "'onChange='CashTotalAfterTax(" + CashRows + ");CalculatExtraAmount();' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='CashTax" + CashRows + "' ' ><select id='slCashTax" + CashRows + "'  onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'  class='form-control m-b' tabindex='1'></select></td>"

            + "<td class='CashTaxValue" + CashRows + "' ' ><input type='number' id='txtCashTaxValue" + CashRows + "'onChange='CashTotalAfterTax(" + CashRows + ");' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='CashTotalAfterTax" + CashRows + "' ' ><input type='number' id='txtCashTotalAfterTax" + CashRows + "'onChange='CashTotalAfterTax(" + CashRows + ");' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
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

//function ChangeSafe(pSelectID) {
//    debugger;
//    if ($("#txtPaymentDate").val() != "") {
    
//        $("#txtPaymentDate").removeClass('validation-error');
//        CashExchangeRate = 0;
//        if ($("#slCashSafe" + pSelectID + " option:selected").val() == "")
//            $("#slCashCurrency" + pSelectID + "").val("1");
//        else
//            $("#slCashCurrency" + pSelectID + "").val($("#slCashSafe" + pSelectID + " option:selected").attr("name"));
//        debugger;
//        GetExchangeRate(pSelectID, 10)
//        setTimeout(function () {
         
//                $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);
            
//            FadePageCover(false);
//        }, 500);
//    } else {
//        $("#slCashSafe" + pSelectID + " option:eq(0)").prop('selected', true);
//        swal("Error!", "Please, Enter Payment Date First");
//        $("#txtPaymentDate").addClass('validation-error');
//    }
//}
function ChangeSafe(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {

        $("#txtPaymentDate").removeClass('validation-error');
        CashExchangeRate = 0;
        if ($("#slCashSafe" + pSelectID + " option:selected").val() == "")
            $("#slCashCurrency" + pSelectID + "").val("1");
        else
            $("#slCashCurrency" + pSelectID + "").val($("#slCashSafe" + pSelectID + " option:selected").attr("name"));
        debugger;
        // GetExchangeRate(pSelectID, 10, 1)
        ////////
        FadePageCover(true);
        var CurrencyID = $('#slCashCurrency' + pSelectID + ' option:selected').val();
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

                CashExchangeRate = pData;
                $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);
                $("#txtNewCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);
                FadePageCover(false);

                debugger;

            });

        /////////
        //setTimeout(function () {

        //    $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);
        //    $("#txtNewCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);


        //    FadePageCover(false);
        //}, 500);
    } else {
        $("#slCashSafe" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}
function CashTotalAfterTax(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {


        setTimeout(function () {

            $("#txtCashTotalAfterTax" + pSelectID + "").val($("#txtCashAmount" + pSelectID + "").val() - $("#txtCashTaxValue" + pSelectID + "").val());

            // $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);

            FadePageCover(false);
        }, 500);
    }
}
function ChequeTotalAfterTax(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {


        setTimeout(function () {
            $("#txtChequeTotalAfterTax" + pSelectID + "").val($("#txtChequeAmount" + pSelectID + "").val() - $("#txtChequeTaxValue" + pSelectID + "").val());

            // $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);

            FadePageCover(false);
        }, 500);
    }
}
function DepositeTotalAfterTax(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {


        setTimeout(function () {
            $("#txtDepositeTotalAfterTax" + pSelectID + "").val($("#txtDepositeAmount" + pSelectID + "").val() - $("#txtDepositeTaxValue" + pSelectID + "").val());

            // $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);

            FadePageCover(false);
        }, 500);
    }
}
function TransferTotalAfterTax(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {


        setTimeout(function () {
            $("#txtTransferTotalAfterTax" + pSelectID + "").val($("#txtTransferAmount" + pSelectID + "").val() - $("#txtTransferTaxValue" + pSelectID + "").val());

            // $("#txtCashExchangeRate" + pSelectID + "").val(CashExchangeRate == 0 ? 0 : CashExchangeRate);

            FadePageCover(false);
        }, 500);
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
    //GetListComboWithNameAndWhereClauses(null, "/api/Payments/GetcheqyeType", "null", "slChequeType" + ChequeRows, "ID", "Name", "");
    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slChequeTax" + ChequeRows, "ID", "Name", "IsDebitAccount = 1");

    if (ChequeRows == 1)
        ClearAllTableRows("tblCheque");
    debugger;
    AppendRowtoTable("tblCheque",
        ("<tr counter='" + ChequeRows + "' value='" + 0 + "'>"
            + "<td counter='" + ChequeRows + "'> <button id='btn-DeleteDetails-" + ChequeRows + "' type='button' onclick='DeleteItems(" + ChequeRows + "," + (2) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + ChequeRows + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ChequeBank" + ChequeRows + "'' ><select id='slChequeBank" + ChequeRows + "' onChange='ChangeBank(" + ChequeRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='ChequeCurrency" + ChequeRows + "' ><select id='slChequeCurrency" + ChequeRows + "' disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='ExchangeRate" + ChequeRows + "' ><input type='number' id='txtChequeExchangeRate" + ChequeRows + "'disabled data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='NewExchangeRate" + ChequeRows + "' ><input type='number' id='txtNewChequeExchangeRate" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='5'/></td>"

            + "<td class='BankRecived" + ChequeRows + "' ><input type='text' id='txtBankRecived" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            //  + "<td class='ChequeType" + ChequeRows + "'  style='width:10%;'><select id='slChequeType" + ChequeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            //+ "<td class='Deposit'> <input id='txtDeposit' type='checkbox' onClick='ChangeDeposit(" + ChequeRows + ");' /></td>"
            + "<td class='ChequeAmount" + ChequeRows + "' ><input type='number' id='txtChequeAmount" + ChequeRows + "'onChange='ChequeTotalAfterTax(" + ChequeRows + ");CalculatExtraAmount();' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ChequeNo" + ChequeRows + "' ><input type='number' id='txtChequeNo" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ChequeTax" + ChequeRows + "'  style='width:10%;'><select id='slChequeTax" + ChequeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"


            //+ "<td class='ChequeTaxValue" + CashRows + "' ' ><input type='text' id='txtChequeTaxValue" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ChequeTaxValue" + ChequeRows + "' ><input type='number' id='txtChequeTaxValue" + ChequeRows + "'onChange='ChequeTotalAfterTax(" + ChequeRows + ");' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ChequeTotalAfterTax" + ChequeRows + "' ' ><input type='number' id='txtChequeTotalAfterTax" + ChequeRows + "'onChange='ChequeTotalAfterTax(" + ChequeRows + ");' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ChequeDate" + ChequeRows + "'   ><input id='txtChequeDate" + ChequeRows + "' tabindex='20' type='date' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'  style='background-color:white; cursor:text;' data-required='false' class='form-control datepicker-input input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' /></td>"
            + "<td class='ChequeNotes" + ChequeRows + "' ><input type='text' id='txtChequeNotes" + ChequeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "</tr>"));

    // setTimeout(function () {
    //console.log($("#slHideBanks").html());
    $('#slChequeBank' + ChequeRows).html($("#slHideBanks").html());
    $("#slChequeCurrency" + ChequeRows).html($("#slHideCurrency").html());
    $("#slChequeType" + ChequeRows).html($("#slHideCheyqType").html());

    //}, 300);

    ChequeRows++;

    //BindAllCheckboxonTable("tblCheque", "Cashid");
    //CheckAllCheckbox("ID");
    FadePageCover(false);

}

var DepositeRows = 1;
function AddNewDepositeRow() {
    debugger;
    Deposite_BindTableRows()
}
function Deposite_BindTableRows() {
    debugger;
    //GetListComboWithNameAndWhereClauses(null, "/api/Payments/GetcheqyeType", "null", "slChequeType" + ChequeRows, "ID", "Name", "");
    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slDepositeTax" + DepositeRows, "ID", "Name", "IsDebitAccount = 1");

    if (DepositeRows == 1)
        ClearAllTableRows("tblDeposite");
    debugger;
    AppendRowtoTable("tblDeposite",
        ("<tr counter='" + DepositeRows + "' value='" + 0 + "'>"
            + "<td counter='" + DepositeRows + "'> <button id='btn-DeleteDetails-" + DepositeRows + "' type='button' onclick='DeleteItems(" + DepositeRows + "," + (3) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + DepositeRows + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='DepositeBank" + DepositeRows + "'' ><select id='slDepositeBank" + DepositeRows + "' onChange='ChangeBankDeposite(" + DepositeRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='DepositeCurrency" + DepositeRows + "' ><select id='slDepositeCurrency" + DepositeRows + "' disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='DepositeExchangeRate" + DepositeRows + "' ><input type='number' id='txtDepositeExchangeRate" + DepositeRows + "'disabled data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='NewDepositeExchangeRate" + DepositeRows + "' ><input type='number' id='txtNewDepositeExchangeRate" + DepositeRows + "' data-required='false' class='input-sm form-control' tabindex='5'/></td>"

            //+ "<td class='BankRecived" + DepositeRows + "' ><input type='text' id='txtBankRecived" + DepositeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            //  + "<td class='ChequeType" + ChequeRows + "'  style='width:10%;'><select id='slChequeType" + ChequeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            //+ "<td class='Deposit'> <input id='txtDeposit' type='checkbox' onClick='ChangeDeposit(" + ChequeRows + ");' /></td>"
            + "<td class='DepositeChequeAmount" + DepositeRows + "' ><input type='number' id='txtDepositeAmount" + DepositeRows + "'onChange='DepositeTotalAfterTax(" + DepositeRows + ");CalculatExtraAmount();' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='ReferenceNo" + DepositeRows + "' ><input type='text' id='txtReferenceNo" + DepositeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='DepositeTax" + DepositeRows + "'  style='width:10%;'><select id='slDepositeTax" + DepositeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"


            //+ "<td class='ChequeTaxValue" + CashRows + "' ' ><input type='text' id='txtChequeTaxValue" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='DepositeChequeTaxValue" + DepositeRows + "' ><input type='number' id='txtDepositeTaxValue" + DepositeRows + "'onChange='DepositeTotalAfterTax(" + DepositeRows + ");' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='DepositeChequeTotalAfterTax" + DepositeRows + "' ' ><input type='number' id='txtDepositeTotalAfterTax" + DepositeRows + "'onChange='DepositeTotalAfterTax(" + DepositeRows + ");' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='DepositeChequeDate" + DepositeRows + "'   ><input id='txtDepositeDate" + DepositeRows + "' tabindex='20' type='date' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'  style='background-color:white; cursor:text;' data-required='false' class='form-control datepicker-input input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' /></td>"
            + "<td class='DepositeChequeNotes" + DepositeRows + "' ><input type='text' id='txtDepositeNotes" + DepositeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "</tr>"));

    // setTimeout(function () {
    //console.log($("#slHideBanks").html());
    $('#slDepositeBank' + DepositeRows).html($("#slHideBanks").html());
    $("#slDepositeCurrency" + DepositeRows).html($("#slHideCurrency").html());

    //}, 300);

    DepositeRows++;

    //BindAllCheckboxonTable("tblCheque", "Cashid");
    //CheckAllCheckbox("ID");
    FadePageCover(false);

}

var TransferRows = 1;
function AddNewTransferRow() {
    debugger;
    Transfer_BindTableRows()
}
function Transfer_BindTableRows() {
    debugger;
    //GetListComboWithNameAndWhereClauses(null, "/api/Payments/GetcheqyeType", "null", "slChequeType" + ChequeRows, "ID", "Name", "");
    GetListComboWithNameAndWhereClauses(null, "/api/TaxeTypes/LoadAll", "not null", "slTransferTax" + TransferRows, "ID", "Name", "IsDebitAccount = 1");

    if (TransferRows == 1)
        ClearAllTableRows("tblTransfer");
    debugger;
    AppendRowtoTable("tblTransfer",
        ("<tr counter='" + TransferRows + "' value='" + 0 + "'>"
            + "<td counter='" + TransferRows + "'> <button id='btn-DeleteDetails-" + TransferRows + "' type='button' onclick='DeleteItems(" + TransferRows + "," + (4) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + TransferRows + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TransferBank" + TransferRows + "'' ><select id='slTransferBank" + TransferRows + "' onChange='ChangeBankTransfer(" + TransferRows + ");' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='TransferCurrency" + TransferRows + "' ><select id='slTransferCurrency" + TransferRows + "' disabled onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            + "<td class='TransferExchangeRate" + TransferRows + "' ><input type='number' id='txtTransferExchangeRate" + TransferRows + "'disabled data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='NewTransferExchangeRate" + TransferRows + "' ><input type='number' id='txtNewTransferExchangeRate" + TransferRows + "' data-required='false' class='input-sm form-control' tabindex='5'/></td>"

            //+ "<td class='BankRecived" + DepositeRows + "' ><input type='text' id='txtBankRecived" + DepositeRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            //  + "<td class='ChequeType" + ChequeRows + "'  style='width:10%;'><select id='slChequeType" + ChequeRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"
            //+ "<td class='Deposit'> <input id='txtDeposit' type='checkbox' onClick='ChangeDeposit(" + ChequeRows + ");' /></td>"
            + "<td class='TransferChequeAmount" + TransferRows + "' ><input type='number' id='txtTransferAmount" + TransferRows + "'onChange='TransferTotalAfterTax(" + TransferRows + ");CalculatExtraAmount();' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='SwiftCode" + TransferRows + "' ><input type='text' id='txtSwiftCode" + TransferRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='TransferTax" + TransferRows + "'  style='width:10%;'><select id='slTransferTax" + TransferRows + "' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false' class='form-control m-b' tabindex='1'></select></td>"


            //+ "<td class='ChequeTaxValue" + CashRows + "' ' ><input type='text' id='txtChequeTaxValue" + CashRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='TransferChequeTaxValue" + TransferRows + "' ><input type='number' id='txtTransferTaxValue" + TransferRows + "'onChange='TransferTotalAfterTax(" + TransferRows + ");' autofocus data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='TransferChequeTotalAfterTax" + TransferRows + "' ' ><input type='number' id='txtTransferTotalAfterTax" + TransferRows + "'onChange='TransferTotalAfterTax(" + TransferRows + ");' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "<td class='TransferChequeDate" + TransferRows + "'   ><input id='txtTransferDate" + TransferRows + "' tabindex='20' type='date' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'  style='background-color:white; cursor:text;' data-required='false' class='form-control datepicker-input input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' /></td>"
            + "<td class='TransferChequeNotes" + TransferRows + "' ><input type='text' id='txtTransferNotes" + TransferRows + "' data-required='false' class='input-sm form-control' tabindex='4'/></td>"
            + "</tr>"));

    // setTimeout(function () {
    //console.log($("#slHideBanks").html());
    $('#slTransferBank' + TransferRows).html($("#slHideBanks").html());
    $("#slTransferCurrency" + TransferRows).html($("#slHideCurrency").html());

    //}, 300);

    TransferRows++;

    //BindAllCheckboxonTable("tblCheque", "Cashid");
    //CheckAllCheckbox("ID");
    FadePageCover(false);

}
var TotalExtra = 0;
function CalculatExtraAmount() {
    debugger
    TotalExtra = 0;

    var cashTotalMoney = 0;
    var EgpcashTotalMoney = 0;
    for (var i = 1; i <= CashRows; i++) {
        if ($("#slCashSafe" + i).val() != undefined && $("#txtCashAmount" + i).val() != undefined && $("#txtNewCashExchangeRate" + i).val() != undefined) {
            cashTotalMoney = 0;
            //$("#tblCash  tbody tr").each(function () {
            cashTotalMoney = parseFloat($("#txtCashAmount" + i).val() == "" ? 0 : $("#txtCashAmount" + i).val());
            EgpcashTotalMoney += cashTotalMoney * parseFloat($("#txtNewCashExchangeRate" + i).val() == "" ? 0 : $("#txtNewCashExchangeRate" + i).val());
            if (CashExchangeRate == 0) {
                CashExchangeRate = parseFloat($("#txtNewCashExchangeRate" + i + "").val());
            }
            //});
        }


    }

    var ChequeTotalMoney = 0;
    var EgpChequeTotalMoney = 0;
    for (var i = 1; i <= ChequeRows; i++) {
        if ($('#slChequeBank' + i).val() != undefined && $("#txtChequeAmount" + i).val() != undefined && $("#txtNewChequeExchangeRate" + i).val() != undefined) {
            ChequeTotalMoney = 0;
            ChequeTotalMoney = parseFloat($("#txtChequeAmount" + i).val() == "" ? 0 : $("#txtChequeAmount" + i).val());
            EgpChequeTotalMoney += ChequeTotalMoney * parseFloat($("#txtNewChequeExchangeRate" + i).val() == "" ? 0 : $("#txtNewChequeExchangeRate" + i).val());

        }
    }
    var DepositeTotalMoney = 0;
    var EgpDepositeTotalMoney = 0;
    for (var i = 1; i <= DepositeRows; i++) {
        if ($("#slDepositeBank" + i).val() != undefined && $("#txtDepositeAmount" + i).val() != undefined && $("#txtNewDepositeExchangeRate" + i).val() != undefined) {

            DepositeTotalMoney = 0;
            DepositeTotalMoney = parseFloat($("#txtDepositeAmount" + i).val() == "" ? 0 : $("#txtDepositeAmount" + i).val());
            EgpDepositeTotalMoney += DepositeTotalMoney * parseFloat($("#txtNewDepositeExchangeRate" + i).val() == "" ? 0 : $("#txtNewDepositeExchangeRate" + i).val());
        }
    }
    var TransferTotalMoney = 0;
    var EgpTransferTotalMoney = 0;
    for (var i = 1; i <= TransferRows; i++) {
        if ($('#slTransferBank' + i).val() != undefined && $("#txtTransferAmount" + i).val() != undefined && $("#txtNewTransferExchangeRate" + i).val() != undefined) {
            TransferTotalMoney = 0;
            TransferTotalMoney = parseFloat($("#txtTransferAmount" + i).val() == "" ? 0 : $("#txtTransferAmount" + i).val());
            EgpTransferTotalMoney += TransferTotalMoney * parseFloat($("#txtNewTransferExchangeRate" + i).val() == "" ? 0 : $("#txtNewTransferExchangeRate" + i).val());
        }
    }
    TotalExtra = EgpcashTotalMoney + EgpChequeTotalMoney + EgpDepositeTotalMoney + EgpTransferTotalMoney;

    if ($("#cbIsExtra").prop("checked")) {
        if ($("#slSearchCurrency option:selected").val() == "1") {
            TotalExtra = TotalExtra - ($("#txtTotalPaid").val() == "" ? 0 : $("#txtTotalPaid").val());
            $("#txtExtraAmount").val(TotalExtra.toFixed(2));
        }
        else if ($("#slSearchCurrency option:selected").val() != "1") {
            TotalExtra = TotalExtra / ($("#txtInvoicesExchangeRate").val() == "" ? "0" : $("#txtInvoicesExchangeRate").val())
            TotalExtra = TotalExtra - ($("#txtTotalPaid").val() == "" ? 0 : $("#txtTotalPaid").val());
            $("#txtExtraAmount").val(TotalExtra.toFixed(2));

        }
    }
    else {
        $("#txtExtraAmount").val("0");
    }
    if (TotalExtra < 0) {
        $("#txtExtraAmount").val("0");
    }

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
            $("#slChequeCurrency" + pSelectID + "").val($("#slChequeBank" + pSelectID + " option:selected").attr("name"));
        debugger;
        GetExchangeRate(pSelectID, 30)
        setTimeout(function () {
        
                $("#txtChequeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
                $("#txtNewChequeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);

            FadePageCover(false);
        }, 500);
    }
    else {
        $("#slChequeBank" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}

function ChangeBankDeposite(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {
        $("#txtPaymentDate").removeClass('validation-error');
        ChequeExchangeRate = 0;
        if ($("#slDepositeBank" + pSelectID + " option:selected").val() == "")
            $("#slDepositeCurrency" + pSelectID + "").val("1");
        else
            $("#slDepositeCurrency" + pSelectID + "").val($("#slDepositeBank" + pSelectID + " option:selected").attr("name"));
        debugger;
        // GetExchangeRate(pSelectID, 30, 3)
        ////////
        FadePageCover(true);
        var CurrencyID = $('#slDepositeCurrency' + pSelectID + ' option:selected').val();
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

                ChequeExchangeRate = pData;
                $("#txtDepositeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
                $("#txtNewDepositeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
                FadePageCover(false);

                debugger;
            });
        //setTimeout(function () {

        //    $("#txtDepositeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
        //    $("#txtNewDepositeExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);


        //    FadePageCover(false);
        //}, 500);
    }
    else {
        $("#slDepositeBank" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}

function ChangeBankTransfer(pSelectID) {
    debugger;
    if ($("#txtPaymentDate").val() != "") {
        $("#txtPaymentDate").removeClass('validation-error');
        ChequeExchangeRate = 0;
        if ($("#slTransferBank" + pSelectID + " option:selected").val() == "")
            $("#slTransferCurrency" + pSelectID + "").val("1");
        else
            $("#slTransferCurrency" + pSelectID + "").val($("#slTransferBank" + pSelectID + " option:selected").attr("name"));
        debugger;
        // GetExchangeRate(pSelectID, 30, 4)
        ////////
        FadePageCover(true);
        var CurrencyID = $('#slTransferCurrency' + pSelectID + ' option:selected').val();
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

                ChequeExchangeRate = pData;
                $("#txtTransferExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
                $("#txtNewTransferExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
                FadePageCover(false);

                debugger;
            });
        //setTimeout(function () {

        //    $("#txtTransferExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);
        //    $("#txtNewTransferExchangeRate" + pSelectID + "").val(ChequeExchangeRate == 0 ? 0 : ChequeExchangeRate);

        //    FadePageCover(false);
        //}, 500);
    }
    else {
        $("#slTransferBank" + pSelectID + " option:eq(0)").prop('selected', true);
        swal("Error!", "Please, Enter Payment Date First");
        $("#txtPaymentDate").addClass('validation-error');
    }
}


var ChequeRows = 1;
function AddNewChequeRow() {
    debugger;
    Cheque_BindTableRows()
}


function Safes_GetList(pCurrencyID, pSelectTxt) {
    debugger;
    // GetListWithSafes(pCurrencyID, "/api/Payments/LoadAllSafesByName", pSelectTxt, "slHideSafes");
    //GetListWithSafesByCurrencyID(pCurrencyID, "/api/Payments/LoadAllSafesByName", pSelectTxt, "slCashSafe1");
    //CallGETFunctionWithParameters("/api/Payments/LoadAllSafesByName", { pSafeID: "1" }
    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/LoadAllSafesByName", { pSafeID: pCurrencyID }

        , function (pData) {
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slCashSafe1", pData[0], null);
        }
        , null);

}

function Banks_GetList(pBankID, pSelectTxt) {
    debugger;

    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/LoadAllBanksByName", { pBankID: pBankID }
        , function (pData) {
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slChequeBank1", pData[0], null);
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slDepositeBank1", pData[0], null);
            FillListFromObject(null, 21/*pCodeOrName*/, "<--Select-->", "slTransferBank1", pData[0], null);

        }
        , null);
    // GetListComboWithNameAndWhereClauses(pBankID, "/api/Payments/LoadAllBanksByName", "null", "slBank", "ID", "Name", "");

    // GetListWithBanks(pBankID, "/api/Payments/LoadAllBanksByName", pSelectTxt, "slHideBanks");
    // GetListWithBankByCurrencyID(pBankID, "/api/Payments/LoadAllBanksByName", pSelectTxt, "slChequeBank1");

}
//function Safes_GetList(pCurrencyID, pSelectTxt) {
//    debugger;
//    GetListWithSafes(pCurrencyID, "/api/Payments/LoadAllSafesByName", pSelectTxt, "slCashSafe");
//}

//function Banks_GetList(pBankID, pSelectTxt) {
//    debugger;
//    GetListWithBanks(pBankID, "/api/Payments/LoadAllBanksByName", pSelectTxt, "slChequeBank");
//}

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
var InvoicesAmounts = "";
var InvoicesRremain = "";
function Payments_Save() {
    $.getJSON('/api/PS_PaymentsTemp/CheckFiscalYear', { pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val()), pCurrencyID: $("#slSearchCurrency option:selected").val() }, function (pResult) {
        debugger;
        if (pResult[0] == false) {
            _Suceess = false;
            swal('Excuse me', pResult[1]);
        }
        else {
            debugger;
            if ($("#slSearchClient option:selected").val() != "" && $("#slSearchCurrency option:selected").val() != "") {
                if ($("#txtPaymentDate").val() != "") {
                    $("#txtPaymentDate").removeClass('validation-error');
                    ValidateCashForm();
                    ValidateChequeForm();
                    ValidateDepositeForm();
                    ValidateTransferForm();

                    if (ChequeBoolEdit == false || CashBoolEdit == false || DepositeBoolEdit == false || TransferBoolEdit == false) {
                    } else {
                        if (CashBool || ChequeBool || DepositeBool || TransferBool) {
                            var AccountID = "";
                            var SubAccountID = "";
                            var pWhereClause = parseInt($("#slSearchClient option:selected").attr("value"));

                            //Get AccountID & SubAccountID
                            $.getJSON('/api/PS_PaymentsTemp/GetAccountIDAndSubAccountID', { pClientID: pWhereClause }, function (Result) {
                                debugger;
                                if (JSON.parse(Result).length != 0) {
                                    AccountID = JSON.parse(Result)[0].AccountID;
                                    SubAccountID = JSON.parse(Result)[0].SubAccountID;
                                }


                                if (AccountID != "" && SubAccountID != "" && $("#hLoggedUserID").val() != -1) {
                                    InvoicesIDs = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "InvoiceID", "txtChoose");
                                    InvoicesAmounts = GetTableCellsAsStringWhenCellISCheckedInputCheck("tblInvoices", "Qty", "txtChoose");
                                    InvoicesRremain = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "RemainAmount", "txtChoose");
                                    InvoicesDCNotesIDs = GetTableCellsAsStringWhenCellISChecked("tblInvoicesDbtCrdtNotes", "InvoiceID", "txtChoose");
                                    InvoicesisPurchase = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "isPurchase", "txtChoose");


                                    InvoicesDCNotesAmounts = GetTableCellsAsStringWhenCellISCheckedInputCheck("tblInvoicesDbtCrdtNotes", "Qty", "txtChoose");
                                    InvoicesDCNotesRremain = GetTableCellsAsStringWhenCellISChecked("tblInvoicesDbtCrdtNotes", "RemainAmount", "txtChoose");

                                    if (CheckPaymentMoneyCheck() == true) {
                                        swal({
                                            title: "Are you sure?",
                                            text: "The Amount Paid Is More Than The Value Of The Vouchers!",
                                            type: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "Yes, Complete!",
                                            closeOnConfirm: true
                                        },
                                            //callback function in case of success
                                            function () {
                                                debugger
                                                if (CheckPaymentMoney() == "1") {
                                                    returned_value = "0";
                                                    debugger;
                                                    //cash prameters
                                                    var pSafeIDListCash = "";
                                                    var pCurrencyIDListCash = "";
                                                    var pExchangeRateListCash = "";
                                                    var pNewExchangeRateListCash = "";
                                                    var pAmountListCash = "";
                                                    var pPaymentNotesListCash = "";
                                                    var pChequeNoListCash = "";

                                                    var pTaxIDListCash = "";
                                                    var pTaxValueListCash = "";
                                                    var pTotalListCash = "";
                                                    var pTotalAfterTaxListCash = "";
                                                    //details cash parameters
                                                    var pValueListCash = "";
                                                    var pDescriptionListCash = "";

                                                    //cheque prameters
                                                    var pBankIDListCheque = "";
                                                    var pCurrencyIDListCheque = "";
                                                    var pExchangeRateListCheque = "";
                                                    var pNewExchangeRateListCheque = "";
                                                    var pAmountListCheque = "";
                                                    var pPaymentNotesListCheque = "";
                                                    var pChequeNoListCheque = "";
                                                    var pChequeDateListCheque = "";
                                                    var pTaxIDListCheque = "";
                                                    var pTaxValueListCheque = "";
                                                    var pTotalListCheque = "";
                                                    var pTotalAfterTaxListCheque = "";
                                                    var pOtherSideBankName = "";
                                                    var pChequeDateList = "";
                                                    //details cheque parameters
                                                    var pValueListCheque = "";
                                                    var pDescriptionListCheque = "";
                                                    //deposite prameters
                                                    var pBankIDListDeposite = "";
                                                    var pCurrencyIDListDeposite = "";
                                                    var pExchangeRateListDeposite = "";
                                                    var pNewExchangeRateListDeposite = "";
                                                    var pAmountListDeposite = "";
                                                    var pPaymentNotesListDeposite = "";
                                                    var pReferenceNoListDeposite = "";
                                                    var pChequeDateListDeposite = "";
                                                    var pTaxIDListDeposite = "";
                                                    var pTaxValueListDeposite = "";
                                                    var pTotalListDeposite = "";
                                                    var pTotalAfterTaxListDeposite = "";
                                                    var pReferenceNo = "";
                                                    var pDepositeDateList = "";
                                                    //details deposite parameters
                                                    var pValueListDeposite = "";
                                                    var pDescriptionListDeposite = "";
                                                    //Transfer prameters
                                                    var pBankIDListTransfer = "";
                                                    var pCurrencyIDListTransfer = "";
                                                    var pExchangeRateListTransfer = "";
                                                    var pNewExchangeRateListTransfer = "";
                                                    var pAmountListTransfer = "";
                                                    var pPaymentNotesListTransfer = "";
                                                    var pSwiftCodeListTransfer = "";
                                                    var pChequeDateListTransfer = "";
                                                    var pTaxIDListTransfer = "";
                                                    var pTaxValueListTransfer = "";
                                                    var pTotalListTransfer = "";
                                                    var pTotalAfterTaxListTransfer = "";
                                                    var pSwiftCode = "";
                                                    var pTransferDateList = "";

                                                    //details Transfer parameters
                                                    var pValueListTransfer = "";
                                                    var pDescriptionListTransfer = "";
                                                    //   $('#btnSave').attr('disabled', 'disabled');

                                                    if (CashBool || ValidateCashForm()) {

                                                        for (var i = 1; i < CashRows; i++) {
                                                            if ($('#slCashSafe' + i + ' option:selected').val() != undefined && $("#txtCashAmount" + i + "").val() != undefined) {
                                                                pSafeIDListCash += ((pSafeIDListCash == "") ? "" : ",") + ($('#slCashSafe' + i + ' option:selected').val() == "" ? "0" : $('#slCashSafe' + i + ' option:selected').val());
                                                                pCurrencyIDListCash += ((pCurrencyIDListCash == "") ? "" : ",") + ($('#slCashCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slCashCurrency' + i + ' option:selected').val());
                                                                pExchangeRateListCash += ((pExchangeRateListCash == "") ? "" : ",") + ($("#txtCashExchangeRate" + i + "").val() == "" ? "0" : $("#txtCashExchangeRate" + i + "").val());
                                                                pNewExchangeRateListCash += ((pNewExchangeRateListCash == "") ? "" : ",") + ($("#txtNewCashExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewCashExchangeRate" + i + "").val());
                                                                pAmountListCash += ((pAmountListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                                pPaymentNotesListCash += ((pPaymentNotesListCash == "") ? "" : ",") + ($("#txtCashNotes" + i + "").val() == "" ? "0" : $("#txtCashNotes" + i + "").val());
                                                                //pChequeNoListCash += ((pChequeNoListCash == "") ? "" : ",") + ($("#ChequeNo" + i + "").val() == "" ? "0" : $("#pChequeNo" + i + "").val());
                                                                //pChequeDateListCash += ((pChequeDateListCash == "") ? "" : ",") + ($("#txtChequeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + i + "").val()).split("-").reverse().join("/")));
                                                                pTaxIDListCash += ((pTaxIDListCash == "") ? "" : ",") + ($('#slCashTax' + i + ' option:selected').val() == "" ? "0" : $('#slCashTax' + i + ' option:selected').val());
                                                                pTaxValueListCash += ((pTaxValueListCash == "") ? "" : ",") + ($("#txtCashTaxValue" + i + "").val() == "" ? "0" : $("#txtCashTaxValue" + i + "").val());
                                                                pTotalListCash += ((pTotalListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                                pTotalAfterTaxListCash += ((pTotalAfterTaxListCash == "") ? "" : ",") + (($("#txtCashAmount" + i + "").val() * 1) - ($("#txtCashTaxValue" + i + "").val() == "" ? 0 : $("#txtCashTaxValue" + i + "").val() * 1));
                                                                pValueListCash += ((pValueListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                                pDescriptionListCash += ((pDescriptionListCash == "") ? "" : ",") + ($("#txtCashNotes" + i + "").val() == "" ? "0" : $("#txtCashNotes" + i + "").val());
                                                                // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                            }
                                                        }
                                                    }

                                                    if (ChequeBool || ValidateChequeForm()) {

                                                        for (var i = 1; i < ChequeRows; i++) {
                                                            if ($('#slChequeBank' + i + ' option:selected').val() != undefined && $("#txtChequeAmount" + i + "").val() != undefined) {
                                                                pBankIDListCheque += ((pBankIDListCheque == "") ? "" : ",") + ($('#slChequeBank' + i + ' option:selected').val() == "" ? "0" : $('#slChequeBank' + i + ' option:selected').val());
                                                                pCurrencyIDListCheque += ((pCurrencyIDListCheque == "") ? "" : ",") + ($('#slChequeCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slChequeCurrency' + i + ' option:selected').val());
                                                                pExchangeRateListCheque += ((pExchangeRateListCheque == "") ? "" : ",") + ($("#txtChequeExchangeRate" + i + "").val() == "" ? "0" : $("#txtChequeExchangeRate" + i + "").val());
                                                                pNewExchangeRateListCheque += ((pNewExchangeRateListCheque == "") ? "" : ",") + ($("#txtNewChequeExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewChequeExchangeRate" + i + "").val());
                                                                pAmountListCheque += ((pAmountListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                                pPaymentNotesListCheque += ((pPaymentNotesListCheque == "") ? "" : ",") + ($("#txtChequeNotes" + i + "").val() == "" ? "0" : $("#txtChequeNotes" + i + "").val());
                                                                pChequeNoListCheque += ((pChequeNoListCheque == "") ? "" : ",") + ($("#txtChequeNo" + i + "").val() == "" ? "0" : $("#txtChequeNo" + i + "").val());
                                                                pChequeDateList += ((pChequeDateList == "") ? "" : ",") + ($("#txtChequeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + i + "").val()).split("-").reverse().join("/")));
                                                                pTaxIDListCheque += ((pTaxIDListCheque == "") ? "" : ",") + ($('#slChequeTax' + i + ' option:selected').val() == "" ? "0" : $('#slChequeTax' + i + ' option:selected').val());
                                                                pTaxValueListCheque += ((pTaxValueListCheque == "") ? "" : ",") + ($("#txtChequeTaxValue" + i + "").val() == "" ? "0" : $("#txtChequeTaxValue" + i + "").val());
                                                                pTotalListCheque += ((pTotalListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                                pTotalAfterTaxListCheque += ((pTotalAfterTaxListCheque == "") ? "" : ",") + (($("#txtChequeAmount" + i + "").val() * 1) - ($("#txtChequeTaxValue" + i + "").val() == "" ? 0 : $("#txtChequeTaxValue" + i + "").val() * 1));
                                                                pValueListCheque += ((pValueListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                                pDescriptionListCheque += ((pDescriptionListCheque == "") ? "" : ",") + ($("#txtChequeNotes" + i + "").val() == "" ? "0" : $("#txtChequeNotes" + i + "").val());
                                                                pOtherSideBankName += ((pOtherSideBankName == "") ? "" : ",") + ($("#txtBankRecived" + i + "").val() == "" ? "0" : $("#txtBankRecived" + i + "").val());

                                                                // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                            }
                                                        }
                                                    }
                                                    if (DepositeBool || ValidateDepositeForm()) {

                                                        for (var i = 1; i < DepositeRows; i++) {
                                                            if ($('#slDepositeBank' + i + ' option:selected').val() != undefined && $("#txtDepositeAmount" + i + "").val() != undefined) {
                                                                pBankIDListDeposite += ((pBankIDListDeposite == "") ? "" : ",") + ($('#slDepositeBank' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeBank' + i + ' option:selected').val());
                                                                pCurrencyIDListDeposite += ((pCurrencyIDListDeposite == "") ? "" : ",") + ($('#slDepositeCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeCurrency' + i + ' option:selected').val());
                                                                pExchangeRateListDeposite += ((pExchangeRateListDeposite == "") ? "" : ",") + ($("#txtDepositeExchangeRate" + i + "").val() == "" ? "0" : $("#txtDepositeExchangeRate" + i + "").val());
                                                                pNewExchangeRateListDeposite += ((pNewExchangeRateListDeposite == "") ? "" : ",") + ($("#txtNewDepositeExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewDepositeExchangeRate" + i + "").val());
                                                                pAmountListDeposite += ((pAmountListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                                pPaymentNotesListDeposite += ((pPaymentNotesListDeposite == "") ? "" : ",") + ($("#txtDepositeNotes" + i + "").val() == "" ? "0" : $("#txtDepositeNotes" + i + "").val());
                                                                pReferenceNoListDeposite += ((pReferenceNoListDeposite == "") ? "" : ",") + ($("#txtReferenceNo" + i + "").val() == "" ? "0" : $("#txtReferenceNo" + i + "").val());
                                                                pDepositeDateList += ((pDepositeDateList == "") ? "" : ",") + ($("#txtDepositeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtDepositeDate" + i + "").val()).split("-").reverse().join("/")));
                                                                pTaxIDListDeposite += ((pTaxIDListDeposite == "") ? "" : ",") + ($('#slDepositeTax' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeTax' + i + ' option:selected').val());
                                                                pTaxValueListDeposite += ((pTaxValueListDeposite == "") ? "" : ",") + ($("#txtDepositeTaxValue" + i + "").val() == "" ? "0" : $("#txtDepositeTaxValue" + i + "").val());
                                                                pTotalListDeposite += ((pTotalListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                                pTotalAfterTaxListDeposite += ((pTotalAfterTaxListDeposite == "") ? "" : ",") + (($("#txtDepositeAmount" + i + "").val() * 1) - ($("#txtDepositeTaxValue" + i + "").val() == "" ? 0 : $("#txtDepositeTaxValue" + i + "").val() * 1));
                                                                pValueListDeposite += ((pValueListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                                pDescriptionListDeposite += ((pDescriptionListDeposite == "") ? "" : ",") + ($("#txtDepositeNotes" + i + "").val() == "" ? "0" : $("#txtDepositeNotes" + i + "").val());
                                                                pReferenceNo += ((pReferenceNo == "") ? "" : ",") + ($("#txtReferenceNo" + i + "").val() == "" ? "0" : $("#txtReferenceNo" + i + "").val());

                                                                // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                            }
                                                        }
                                                    }
                                                    if (TransferBool || ValidateTransferForm()) {

                                                        for (var i = 1; i < TransferRows; i++) {
                                                            if ($('#slTransferBank' + i + ' option:selected').val() != undefined && $("#txtTransferAmount" + i + "").val() != undefined) {
                                                                pBankIDListTransfer += ((pBankIDListTransfer == "") ? "" : ",") + ($('#slTransferBank' + i + ' option:selected').val() == "" ? "0" : $('#slTransferBank' + i + ' option:selected').val());
                                                                pCurrencyIDListTransfer += ((pCurrencyIDListTransfer == "") ? "" : ",") + ($('#slTransferCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slTransferCurrency' + i + ' option:selected').val());
                                                                pExchangeRateListTransfer += ((pExchangeRateListTransfer == "") ? "" : ",") + ($("#txtTransferExchangeRate" + i + "").val() == "" ? "0" : $("#txtTransferExchangeRate" + i + "").val());
                                                                pNewExchangeRateListTransfer += ((pNewExchangeRateListTransfer == "") ? "" : ",") + ($("#txtNewTransferExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewTransferExchangeRate" + i + "").val());
                                                                pAmountListTransfer += ((pAmountListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                                pPaymentNotesListTransfer += ((pPaymentNotesListTransfer == "") ? "" : ",") + ($("#txtTransferNotes" + i + "").val() == "" ? "0" : $("#txtTransferNotes" + i + "").val());
                                                                pSwiftCodeListTransfer += ((pSwiftCodeListTransfer == "") ? "" : ",") + ($("#txtSwiftCode" + i + "").val() == "" ? "0" : $("#txtSwiftCode" + i + "").val());
                                                                pTransferDateList += ((pTransferDateList == "") ? "" : ",") + ($("#txtTransferDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtTransferDate" + i + "").val()).split("-").reverse().join("/")));
                                                                pTaxIDListTransfer += ((pTaxIDListTransfer == "") ? "" : ",") + ($('#slTransferTax' + i + ' option:selected').val() == "" ? "0" : $('#slTransferTax' + i + ' option:selected').val());
                                                                pTaxValueListTransfer += ((pTaxValueListTransfer == "") ? "" : ",") + ($("#txtTransferTaxValue" + i + "").val() == "" ? "0" : $("#txtTransferTaxValue" + i + "").val());
                                                                pTotalListTransfer += ((pTotalListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                                pTotalAfterTaxListTransfer += ((pTotalAfterTaxListTransfer == "") ? "" : ",") + (($("#txtTransferAmount" + i + "").val() * 1) - ($("#txtTransferTaxValue" + i + "").val() == "" ? 0 : $("#txtTransferTaxValue" + i + "").val() * 1));
                                                                pValueListTransfer += ((pValueListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                                pDescriptionListTransfer += ((pDescriptionListTransfer == "") ? "" : ",") + ($("#txtTransferNotes" + i + "").val() == "" ? "0" : $("#txtTransferNotes" + i + "").val());
                                                                pSwiftCode += ((pSwiftCode == "") ? "" : ",") + ($("#txtSwiftCode" + i + "").val() == "" ? "0" : $("#txtSwiftCode" + i + "").val());

                                                            }

                                                            // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);

                                                        }
                                                    }
                                                    ////
                                                    //Save Payments & A_PaymentInvoices
                                                    var pParametersWithValuesVoucherPayments = {

                                                        pClientID: $('#slSearchClient option:selected').val()
                                                        , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
                                                        , pPaymentNotes: ($("#txtCashNotes1").val() == "" ? "" : $("#txtCashNotes1").val()) + " " + ($("#txtChequeNotes1").val() == "" ? "" : $("#txtChequeNotes1").val())
                                                        , pTotalCost: $("#txtTotalPaid").val()
                                                        , pPaymentCurrencyID: $('#slSearchCurrency option:selected').val()
                                                        , pPaymentAmount: parseFloat($("#txtTotalPaid").val() == "" ? 0 : $("#txtTotalPaid").val())
                                                        , pPaymentExchangeRate: $("#txtInvoicesExchangeRate").val() == "" ? 0 : parseFloat($("#txtInvoicesExchangeRate").val())
                                                        , pInvoicesIDs: InvoicesIDs
                                                        , pBankChargesAmount: $("#txtBankChargesAmount").val()
                                                        , pBankChargesCurrency: $('#slChequeCurrency1 option:selected').val()
                                                        , pRefundAmount: $("#txtRefundAmount").val()
                                                        , pRefundCurrency: $('#slChequeCurrency1 option:selected').val()
                                                        , pIsAGInvoice: false
                                                        , pPrintDate: "01/01/1900"
                                                        , pCollectionDate: "01/01/1900"
                                                        , pAccountID: AccountID
                                                        , pSubAccountID: SubAccountID
                                                        , pCostCenterID: 0
                                                        , pIsDocumented: false
                                                        , pDetailsInvoiceID: 000
                                                        , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
                                                        , pClientID: $("#slSearchClient option:selected").attr("value")
                                                        , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()
                                                        , pVoucherTypeCash: 20
                                                        , pSafeIDListCash: pSafeIDListCash
                                                        , pCurrencyIDListCash: pCurrencyIDListCash
                                                        , pExchangeRateListCash: pExchangeRateListCash
                                                        , pNewExchangeRateListCash: pNewExchangeRateListCash

                                                        , pAmountListCash: pAmountListCash
                                                        , pPaymentNotesListCash: pPaymentNotesListCash
                                                        , pTaxIDListCash: pTaxIDListCash
                                                        , pTaxValueListCash: pTaxValueListCash
                                                        , pTotalListCash: pTotalListCash
                                                        , pTotalAfterTaxListCash: pTotalAfterTaxListCash
                                                        , pValueListCash: pValueListCash
                                                        , pDescriptionListCash: pDescriptionListCash
                                                        , pVoucherTypeCheque: 40
                                                        , pBankIDListCheque: pBankIDListCheque
                                                        , pCurrencyIDListCheque: pCurrencyIDListCheque
                                                        , pExchangeRateListCheque: pExchangeRateListCheque
                                                        , pNewExchangeRateListCheque: pNewExchangeRateListCheque

                                                        , pAmountListCheque: pAmountListCheque
                                                        , pPaymentNotesListCheque: pPaymentNotesListCheque
                                                        , pTaxIDListCheque: pTaxIDListCheque
                                                        , pTaxValueListCheque: pTaxValueListCheque
                                                        , pTotalListCheque: pTotalListCheque
                                                        , pTotalAfterTaxListCheque: pTotalAfterTaxListCheque
                                                        , pValueListCheque: pValueListCheque
                                                        , pDescriptionListCheque: pDescriptionListCheque
                                                        , pChequeNoListCheque: pChequeNoListCheque
                                                        , pVoucherTypeDeposite: 40
                                                        , pBankIDListDeposite: pBankIDListDeposite
                                                        , pCurrencyIDListDeposite: pCurrencyIDListDeposite
                                                        , pExchangeRateListDeposite: pExchangeRateListDeposite
                                                        , pNewExchangeRateListDeposite: pNewExchangeRateListDeposite

                                                        , pAmountListDeposite: pAmountListDeposite
                                                        , pPaymentNotesListDeposite: pPaymentNotesListDeposite
                                                        , pTaxIDListDeposite: pTaxIDListDeposite
                                                        , pTaxValueListDeposite: pTaxValueListDeposite
                                                        , pTotalListDeposite: pTotalListDeposite
                                                        , pTotalAfterTaxListDeposite: pTotalAfterTaxListDeposite
                                                        , pValueListDeposite: pValueListDeposite
                                                        , pDescriptionListDeposite: pDescriptionListDeposite
                                                        , pReferenceNoListDeposite: pReferenceNoListDeposite
                                                        , pVoucherTypeTransfer: 40
                                                        , pBankIDListTransfer: pBankIDListTransfer
                                                        , pCurrencyIDListTransfer: pCurrencyIDListTransfer
                                                        , pExchangeRateListTransfer: pExchangeRateListTransfer
                                                        , pNewExchangeRateListTransfer: pNewExchangeRateListTransfer

                                                        , pAmountListTransfer: pAmountListTransfer
                                                        , pPaymentNotesListTransfer: pPaymentNotesListTransfer
                                                        , pTaxIDListTransfer: pTaxIDListTransfer
                                                        , pTaxValueListTransfer: pTaxValueListTransfer
                                                        , pTotalListTransfer: pTotalListTransfer
                                                        , pTotalAfterTaxListTransfer: pTotalAfterTaxListTransfer
                                                        , pValueListTransfer: pValueListTransfer
                                                        , pDescriptionListTransfer: pDescriptionListTransfer
                                                        , pSwiftCodeListTransfer: pSwiftCodeListTransfer
                                                        , PInvoicesAmounts: InvoicesAmounts
                                                        , PInvoicesRremain: InvoicesRremain
                                                        , pInvoicesDCNotesIDs: InvoicesDCNotesIDs
                                                        , PInvoicesDCNotesAmounts: InvoicesDCNotesAmounts
                                                        , PInvoicesDCNotesRremain: InvoicesDCNotesRremain
                                                        , PInvoicesisPurchase: InvoicesisPurchase


                                                        , pOtherSideBankName: pOtherSideBankName
                                                        , pReferenceNo: pReferenceNo
                                                        , pSwiftCode: pSwiftCode
                                                        , pChequeDateList: pChequeDateList
                                                        , pDepositeDateList: pDepositeDateList
                                                        , pTransferDateList: pTransferDateList
                                                        , pChargedPerson: $("#slSearchClient option:selected").text()
                                                        , pExtraAmount: parseFloat($("#txtExtraAmount").val() == "" ? 0 : $("#txtExtraAmount").val())
                                                        , pIsExtra: $("#cbIsExtra").prop("checked") ? true : false
                                                    };
                                                    debugger;
                                                    $.getJSON('/api/PS_PaymentsTemp/CheckFromRefNo', {
                                                        pReferenceNo: pReferenceNo, pSwiftCode: pSwiftCode
                                                    }, function (pResult) {
                                                        debugger;
                                                        if (pResult[0] == false) {
                                                            _Suceess = false;
                                                            swal('Excuse me', pResult[1]);
                                                        }
                                                        else {
                                                    //FadePageCover(true);
                                                    CallPOSTFunctionWithParameters("/api/PS_PaymentsTemp/Insert", pParametersWithValuesVoucherPayments
                                                        , function (pData) {
                                                            debugger;
                                                            //InvoicesIDs = "";
                                                            if (pData[0] == true) {
                                                                swal("Success", "Saved successfully.");
                                                                FadePageCover(false);
                                                                $("#txtSearchCode").val("");
                                                                $("#txtsearchClientID").val("")
                                                                $("#txtsearchPaymentNotes").val("");
                                                                $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                                                Payments_LoadingWithPaging();
                                                                jQuery("#PaymentsModal").modal("hide");
                                                                Payment_Print(pData[2]);

                                                            }
                                                            else {
                                                                swal("Sorry", "");
                                                                FadePageCover(false);
                                                            }
                                                        }
                                                        , null);
                                                       }
                                                   });
                                                }
                                            });
                                    }
                                    else {


                                        if (CheckPaymentMoney() == "1") {
                                            returned_value = "0";
                                            debugger;
                                            //cash prameters
                                            var pSafeIDListCash = "";
                                            var pCurrencyIDListCash = "";
                                            var pExchangeRateListCash = "";
                                            var pNewExchangeRateListCash = "";
                                            var pAmountListCash = "";
                                            var pPaymentNotesListCash = "";
                                            var pChequeNoListCash = "";

                                            var pTaxIDListCash = "";
                                            var pTaxValueListCash = "";
                                            var pTotalListCash = "";
                                            var pTotalAfterTaxListCash = "";
                                            //details cash parameters
                                            var pValueListCash = "";
                                            var pDescriptionListCash = "";

                                            //cheque prameters
                                            var pBankIDListCheque = "";
                                            var pCurrencyIDListCheque = "";
                                            var pExchangeRateListCheque = "";
                                            var pNewExchangeRateListCheque = "";
                                            var pAmountListCheque = "";
                                            var pPaymentNotesListCheque = "";
                                            var pChequeNoListCheque = "";
                                            var pChequeDateListCheque = "";
                                            var pTaxIDListCheque = "";
                                            var pTaxValueListCheque = "";
                                            var pTotalListCheque = "";
                                            var pTotalAfterTaxListCheque = "";
                                            var pOtherSideBankName = "";
                                            var pChequeDateList = "";
                                            //details cheque parameters
                                            var pValueListCheque = "";
                                            var pDescriptionListCheque = "";
                                            //deposite prameters
                                            var pBankIDListDeposite = "";
                                            var pCurrencyIDListDeposite = "";
                                            var pExchangeRateListDeposite = "";
                                            var pNewExchangeRateListDeposite = "";
                                            var pAmountListDeposite = "";
                                            var pPaymentNotesListDeposite = "";
                                            var pReferenceNoListDeposite = "";
                                            var pChequeDateListDeposite = "";
                                            var pTaxIDListDeposite = "";
                                            var pTaxValueListDeposite = "";
                                            var pTotalListDeposite = "";
                                            var pTotalAfterTaxListDeposite = "";
                                            var pReferenceNo = "";
                                            var pDepositeDateList = "";
                                            //details deposite parameters
                                            var pValueListDeposite = "";
                                            var pDescriptionListDeposite = "";
                                            //Transfer prameters
                                            var pBankIDListTransfer = "";
                                            var pCurrencyIDListTransfer = "";
                                            var pExchangeRateListTransfer = "";
                                            var pNewExchangeRateListTransfer = "";
                                            var pAmountListTransfer = "";
                                            var pPaymentNotesListTransfer = "";
                                            var pSwiftCodeListTransfer = "";
                                            var pChequeDateListTransfer = "";
                                            var pTaxIDListTransfer = "";
                                            var pTaxValueListTransfer = "";
                                            var pTotalListTransfer = "";
                                            var pTotalAfterTaxListTransfer = "";
                                            var pSwiftCode = "";
                                            var pTransferDateList = "";

                                            //details Transfer parameters
                                            var pValueListTransfer = "";
                                            var pDescriptionListTransfer = "";
                                            //   $('#btnSave').attr('disabled', 'disabled');

                                            if (CashBool || ValidateCashForm()) {

                                                for (var i = 1; i < CashRows; i++) {
                                                    if ($('#slCashSafe' + i + ' option:selected').val() != undefined && $("#txtCashAmount" + i + "").val() != undefined) {
                                                        pSafeIDListCash += ((pSafeIDListCash == "") ? "" : ",") + ($('#slCashSafe' + i + ' option:selected').val() == "" ? "0" : $('#slCashSafe' + i + ' option:selected').val());
                                                        pCurrencyIDListCash += ((pCurrencyIDListCash == "") ? "" : ",") + ($('#slCashCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slCashCurrency' + i + ' option:selected').val());
                                                        pExchangeRateListCash += ((pExchangeRateListCash == "") ? "" : ",") + ($("#txtCashExchangeRate" + i + "").val() == "" ? "0" : $("#txtCashExchangeRate" + i + "").val());
                                                        pNewExchangeRateListCash += ((pNewExchangeRateListCash == "") ? "" : ",") + ($("#txtNewCashExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewCashExchangeRate" + i + "").val());
                                                        pAmountListCash += ((pAmountListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                        pPaymentNotesListCash += ((pPaymentNotesListCash == "") ? "" : ",") + ($("#txtCashNotes" + i + "").val() == "" ? "0" : $("#txtCashNotes" + i + "").val());
                                                        //pChequeNoListCash += ((pChequeNoListCash == "") ? "" : ",") + ($("#ChequeNo" + i + "").val() == "" ? "0" : $("#pChequeNo" + i + "").val());
                                                        //pChequeDateListCash += ((pChequeDateListCash == "") ? "" : ",") + ($("#txtChequeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + i + "").val()).split("-").reverse().join("/")));
                                                        pTaxIDListCash += ((pTaxIDListCash == "") ? "" : ",") + ($('#slCashTax' + i + ' option:selected').val() == "" ? "0" : $('#slCashTax' + i + ' option:selected').val());
                                                        pTaxValueListCash += ((pTaxValueListCash == "") ? "" : ",") + ($("#txtCashTaxValue" + i + "").val() == "" ? "0" : $("#txtCashTaxValue" + i + "").val());
                                                        pTotalListCash += ((pTotalListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                        pTotalAfterTaxListCash += ((pTotalAfterTaxListCash == "") ? "" : ",") + (($("#txtCashAmount" + i + "").val() * 1) - ($("#txtCashTaxValue" + i + "").val() == "" ? 0 : $("#txtCashTaxValue" + i + "").val() * 1));
                                                        pValueListCash += ((pValueListCash == "") ? "" : ",") + ($("#txtCashAmount" + i + "").val() == "" ? "0" : $("#txtCashAmount" + i + "").val());
                                                        pDescriptionListCash += ((pDescriptionListCash == "") ? "" : ",") + ($("#txtCashNotes" + i + "").val() == "" ? "0" : $("#txtCashNotes" + i + "").val());
                                                        // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                    }
                                                }
                                            }

                                            if (ChequeBool || ValidateChequeForm()) {

                                                for (var i = 1; i < ChequeRows; i++) {
                                                    if ($('#slChequeBank' + i + ' option:selected').val() != undefined && $("#txtChequeAmount" + i + "").val() != undefined) {
                                                        pBankIDListCheque += ((pBankIDListCheque == "") ? "" : ",") + ($('#slChequeBank' + i + ' option:selected').val() == "" ? "0" : $('#slChequeBank' + i + ' option:selected').val());
                                                        pCurrencyIDListCheque += ((pCurrencyIDListCheque == "") ? "" : ",") + ($('#slChequeCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slChequeCurrency' + i + ' option:selected').val());
                                                        pExchangeRateListCheque += ((pExchangeRateListCheque == "") ? "" : ",") + ($("#txtChequeExchangeRate" + i + "").val() == "" ? "0" : $("#txtChequeExchangeRate" + i + "").val());
                                                        pNewExchangeRateListCheque += ((pNewExchangeRateListCheque == "") ? "" : ",") + ($("#txtNewChequeExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewChequeExchangeRate" + i + "").val());
                                                        pAmountListCheque += ((pAmountListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                        pPaymentNotesListCheque += ((pPaymentNotesListCheque == "") ? "" : ",") + ($("#txtChequeNotes" + i + "").val() == "" ? "0" : $("#txtChequeNotes" + i + "").val());
                                                        pChequeNoListCheque += ((pChequeNoListCheque == "") ? "" : ",") + ($("#txtChequeNo" + i + "").val() == "" ? "0" : $("#txtChequeNo" + i + "").val());
                                                        pChequeDateList += ((pChequeDateList == "") ? "" : ",") + ($("#txtChequeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + i + "").val()).split("-").reverse().join("/")));
                                                        pTaxIDListCheque += ((pTaxIDListCheque == "") ? "" : ",") + ($('#slChequeTax' + i + ' option:selected').val() == "" ? "0" : $('#slChequeTax' + i + ' option:selected').val());
                                                        pTaxValueListCheque += ((pTaxValueListCheque == "") ? "" : ",") + ($("#txtChequeTaxValue" + i + "").val() == "" ? "0" : $("#txtChequeTaxValue" + i + "").val());
                                                        pTotalListCheque += ((pTotalListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                        pTotalAfterTaxListCheque += ((pTotalAfterTaxListCheque == "") ? "" : ",") + (($("#txtChequeAmount" + i + "").val() * 1) - ($("#txtChequeTaxValue" + i + "").val() == "" ? 0 : $("#txtChequeTaxValue" + i + "").val() * 1));
                                                        pValueListCheque += ((pValueListCheque == "") ? "" : ",") + ($("#txtChequeAmount" + i + "").val() == "" ? "0" : $("#txtChequeAmount" + i + "").val());
                                                        pDescriptionListCheque += ((pDescriptionListCheque == "") ? "" : ",") + ($("#txtChequeNotes" + i + "").val() == "" ? "0" : $("#txtChequeNotes" + i + "").val());
                                                        pOtherSideBankName += ((pOtherSideBankName == "") ? "" : ",") + ($("#txtBankRecived" + i + "").val() == "" ? "0" : $("#txtBankRecived" + i + "").val());

                                                        // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                    }
                                                }
                                            }
                                            if (DepositeBool || ValidateDepositeForm()) {

                                                for (var i = 1; i < DepositeRows; i++) {
                                                    if ($('#slDepositeBank' + i + ' option:selected').val() != undefined && $("#txtDepositeAmount" + i + "").val() != undefined) {
                                                        pBankIDListDeposite += ((pBankIDListDeposite == "") ? "" : ",") + ($('#slDepositeBank' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeBank' + i + ' option:selected').val());
                                                        pCurrencyIDListDeposite += ((pCurrencyIDListDeposite == "") ? "" : ",") + ($('#slDepositeCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeCurrency' + i + ' option:selected').val());
                                                        pExchangeRateListDeposite += ((pExchangeRateListDeposite == "") ? "" : ",") + ($("#txtDepositeExchangeRate" + i + "").val() == "" ? "0" : $("#txtDepositeExchangeRate" + i + "").val());
                                                        pNewExchangeRateListDeposite += ((pNewExchangeRateListDeposite == "") ? "" : ",") + ($("#txtNewDepositeExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewDepositeExchangeRate" + i + "").val());
                                                        pAmountListDeposite += ((pAmountListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                        pPaymentNotesListDeposite += ((pPaymentNotesListDeposite == "") ? "" : ",") + ($("#txtDepositeNotes" + i + "").val() == "" ? "0" : $("#txtDepositeNotes" + i + "").val());
                                                        pReferenceNoListDeposite += ((pReferenceNoListDeposite == "") ? "" : ",") + ($("#txtReferenceNo" + i + "").val() == "" ? "0" : $("#txtReferenceNo" + i + "").val());
                                                        pDepositeDateList += ((pDepositeDateList == "") ? "" : ",") + ($("#txtDepositeDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtDepositeDate" + i + "").val()).split("-").reverse().join("/")));
                                                        pTaxIDListDeposite += ((pTaxIDListDeposite == "") ? "" : ",") + ($('#slDepositeTax' + i + ' option:selected').val() == "" ? "0" : $('#slDepositeTax' + i + ' option:selected').val());
                                                        pTaxValueListDeposite += ((pTaxValueListDeposite == "") ? "" : ",") + ($("#txtDepositeTaxValue" + i + "").val() == "" ? "0" : $("#txtDepositeTaxValue" + i + "").val());
                                                        pTotalListDeposite += ((pTotalListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                        pTotalAfterTaxListDeposite += ((pTotalAfterTaxListDeposite == "") ? "" : ",") + (($("#txtDepositeAmount" + i + "").val() * 1) - ($("#txtDepositeTaxValue" + i + "").val() == "" ? 0 : $("#txtDepositeTaxValue" + i + "").val() * 1));
                                                        pValueListDeposite += ((pValueListDeposite == "") ? "" : ",") + ($("#txtDepositeAmount" + i + "").val() == "" ? "0" : $("#txtDepositeAmount" + i + "").val());
                                                        pDescriptionListDeposite += ((pDescriptionListDeposite == "") ? "" : ",") + ($("#txtDepositeNotes" + i + "").val() == "" ? "0" : $("#txtDepositeNotes" + i + "").val());
                                                        pReferenceNo += ((pReferenceNo == "") ? "" : ",") + ($("#txtReferenceNo" + i + "").val() == "" ? "0" : $("#txtReferenceNo" + i + "").val());

                                                        // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);
                                                    }
                                                }
                                            }
                                            if (TransferBool || ValidateTransferForm()) {

                                                for (var i = 1; i < TransferRows; i++) {
                                                    if ($('#slTransferBank' + i + ' option:selected').val() != undefined && $("#txtTransferAmount" + i + "").val() != undefined) {
                                                        pBankIDListTransfer += ((pBankIDListTransfer == "") ? "" : ",") + ($('#slTransferBank' + i + ' option:selected').val() == "" ? "0" : $('#slTransferBank' + i + ' option:selected').val());
                                                        pCurrencyIDListTransfer += ((pCurrencyIDListTransfer == "") ? "" : ",") + ($('#slTransferCurrency' + i + ' option:selected').val() == "" ? "0" : $('#slTransferCurrency' + i + ' option:selected').val());
                                                        pExchangeRateListTransfer += ((pExchangeRateListTransfer == "") ? "" : ",") + ($("#txtTransferExchangeRate" + i + "").val() == "" ? "0" : $("#txtTransferExchangeRate" + i + "").val());
                                                        pNewExchangeRateListTransfer += ((pNewExchangeRateListTransfer == "") ? "" : ",") + ($("#txtNewTransferExchangeRate" + i + "").val() == "" ? "0" : $("#txtNewTransferExchangeRate" + i + "").val());
                                                        pAmountListTransfer += ((pAmountListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                        pPaymentNotesListTransfer += ((pPaymentNotesListTransfer == "") ? "" : ",") + ($("#txtTransferNotes" + i + "").val() == "" ? "0" : $("#txtTransferNotes" + i + "").val());
                                                        pSwiftCodeListTransfer += ((pSwiftCodeListTransfer == "") ? "" : ",") + ($("#txtSwiftCode" + i + "").val() == "" ? "0" : $("#txtSwiftCode" + i + "").val());
                                                        pTransferDateList += ((pTransferDateList == "") ? "" : ",") + ($("#txtTransferDate" + i + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtTransferDate" + i + "").val()).split("-").reverse().join("/")));
                                                        pTaxIDListTransfer += ((pTaxIDListTransfer == "") ? "" : ",") + ($('#slTransferTax' + i + ' option:selected').val() == "" ? "0" : $('#slTransferTax' + i + ' option:selected').val());
                                                        pTaxValueListTransfer += ((pTaxValueListTransfer == "") ? "" : ",") + ($("#txtTransferTaxValue" + i + "").val() == "" ? "0" : $("#txtTransferTaxValue" + i + "").val());
                                                        pTotalListTransfer += ((pTotalListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                        pTotalAfterTaxListTransfer += ((pTotalAfterTaxListTransfer == "") ? "" : ",") + (($("#txtTransferAmount" + i + "").val() * 1) - ($("#txtTransferTaxValue" + i + "").val() == "" ? 0 : $("#txtTransferTaxValue" + i + "").val() * 1));
                                                        pValueListTransfer += ((pValueListTransfer == "") ? "" : ",") + ($("#txtTransferAmount" + i + "").val() == "" ? "0" : $("#txtTransferAmount" + i + "").val());
                                                        pDescriptionListTransfer += ((pDescriptionListTransfer == "") ? "" : ",") + ($("#txtTransferNotes" + i + "").val() == "" ? "0" : $("#txtTransferNotes" + i + "").val());
                                                        pSwiftCode += ((pSwiftCode == "") ? "" : ",") + ($("#txtSwiftCode" + i + "").val() == "" ? "0" : $("#txtSwiftCode" + i + "").val());

                                                    }

                                                    // Details_CashSave(i, 10, CashExchangeRate, AccountID, SubAccountID);

                                                }
                                            }
                                            ////
                                            //Save Payments & A_PaymentInvoices
                                            var pParametersWithValuesVoucherPayments = {

                                                pClientID: $('#slSearchClient option:selected').val()
                                                , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
                                                , pPaymentNotes: ($("#txtCashNotes1").val() == "" ? "" : $("#txtCashNotes1").val()) + " " + ($("#txtChequeNotes1").val() == "" ? "" : $("#txtChequeNotes1").val())
                                                , pTotalCost: $("#txtTotalPaid").val()
                                                , pPaymentCurrencyID: $('#slSearchCurrency option:selected').val()
                                                , pPaymentAmount: parseFloat($("#txtTotalPaid").val() == "" ? 0 : $("#txtTotalPaid").val())
                                                , pPaymentExchangeRate: $("#txtInvoicesExchangeRate").val() == "" ? 0 : parseFloat($("#txtInvoicesExchangeRate").val())
                                                , pInvoicesIDs: InvoicesIDs
                                                , pBankChargesAmount: $("#txtBankChargesAmount").val()
                                                , pBankChargesCurrency: $('#slChequeCurrency1 option:selected').val()
                                                , pRefundAmount: $("#txtRefundAmount").val()
                                                , pRefundCurrency: $('#slChequeCurrency1 option:selected').val()
                                                , pIsAGInvoice: false
                                                , pPrintDate: "01/01/1900"
                                                , pCollectionDate: "01/01/1900"
                                                , pAccountID: AccountID
                                                , pSubAccountID: SubAccountID
                                                , pCostCenterID: 0
                                                , pIsDocumented: false
                                                , pDetailsInvoiceID: 000
                                                , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
                                                , pClientID: $("#slSearchClient option:selected").attr("value")
                                                , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()
                                                , pVoucherTypeCash: 20
                                                , pSafeIDListCash: pSafeIDListCash
                                                , pCurrencyIDListCash: pCurrencyIDListCash
                                                , pExchangeRateListCash: pExchangeRateListCash
                                                , pNewExchangeRateListCash: pNewExchangeRateListCash

                                                , pInvoicesDCNotesIDs: InvoicesDCNotesIDs
                                                , PInvoicesDCNotesAmounts: InvoicesDCNotesAmounts
                                                , PInvoicesDCNotesRremain: InvoicesDCNotesRremain
                                                , PInvoicesisPurchase: InvoicesisPurchase


                                                , pAmountListCash: pAmountListCash
                                                , pPaymentNotesListCash: pPaymentNotesListCash
                                                , pTaxIDListCash: pTaxIDListCash
                                                , pTaxValueListCash: pTaxValueListCash
                                                , pTotalListCash: pTotalListCash
                                                , pTotalAfterTaxListCash: pTotalAfterTaxListCash
                                                , pValueListCash: pValueListCash
                                                , pDescriptionListCash: pDescriptionListCash
                                                , pVoucherTypeCheque: 40
                                                , pBankIDListCheque: pBankIDListCheque
                                                , pCurrencyIDListCheque: pCurrencyIDListCheque
                                                , pExchangeRateListCheque: pExchangeRateListCheque
                                                , pNewExchangeRateListCheque: pNewExchangeRateListCheque

                                                , pAmountListCheque: pAmountListCheque
                                                , pPaymentNotesListCheque: pPaymentNotesListCheque
                                                , pTaxIDListCheque: pTaxIDListCheque
                                                , pTaxValueListCheque: pTaxValueListCheque
                                                , pTotalListCheque: pTotalListCheque
                                                , pTotalAfterTaxListCheque: pTotalAfterTaxListCheque
                                                , pValueListCheque: pValueListCheque
                                                , pDescriptionListCheque: pDescriptionListCheque
                                                , pChequeNoListCheque: pChequeNoListCheque
                                                , pVoucherTypeDeposite: 40
                                                , pBankIDListDeposite: pBankIDListDeposite
                                                , pCurrencyIDListDeposite: pCurrencyIDListDeposite
                                                , pExchangeRateListDeposite: pExchangeRateListDeposite
                                                , pNewExchangeRateListDeposite: pNewExchangeRateListDeposite

                                                , pAmountListDeposite: pAmountListDeposite
                                                , pPaymentNotesListDeposite: pPaymentNotesListDeposite
                                                , pTaxIDListDeposite: pTaxIDListDeposite
                                                , pTaxValueListDeposite: pTaxValueListDeposite
                                                , pTotalListDeposite: pTotalListDeposite
                                                , pTotalAfterTaxListDeposite: pTotalAfterTaxListDeposite
                                                , pValueListDeposite: pValueListDeposite
                                                , pDescriptionListDeposite: pDescriptionListDeposite
                                                , pReferenceNoListDeposite: pReferenceNoListDeposite
                                                , pVoucherTypeTransfer: 40
                                                , pBankIDListTransfer: pBankIDListTransfer
                                                , pCurrencyIDListTransfer: pCurrencyIDListTransfer
                                                , pExchangeRateListTransfer: pExchangeRateListTransfer
                                                , pNewExchangeRateListTransfer: pNewExchangeRateListTransfer

                                                , pAmountListTransfer: pAmountListTransfer
                                                , pPaymentNotesListTransfer: pPaymentNotesListTransfer
                                                , pTaxIDListTransfer: pTaxIDListTransfer
                                                , pTaxValueListTransfer: pTaxValueListTransfer
                                                , pTotalListTransfer: pTotalListTransfer
                                                , pTotalAfterTaxListTransfer: pTotalAfterTaxListTransfer
                                                , pValueListTransfer: pValueListTransfer
                                                , pDescriptionListTransfer: pDescriptionListTransfer
                                                , pSwiftCodeListTransfer: pSwiftCodeListTransfer
                                                , PInvoicesAmounts: InvoicesAmounts
                                                , PInvoicesRremain: InvoicesRremain
                                                , pOtherSideBankName: pOtherSideBankName
                                                , pReferenceNo: pReferenceNo
                                                , pSwiftCode: pSwiftCode
                                                , pChequeDateList: pChequeDateList
                                                , pDepositeDateList: pDepositeDateList
                                                , pTransferDateList: pTransferDateList
                                                , pChargedPerson: $("#slSearchClient option:selected").text()
                                                , pExtraAmount: parseFloat($("#txtExtraAmount").val() == "" ? 0 : $("#txtExtraAmount").val())
                                                , pIsExtra: $("#cbIsExtra").prop("checked") ? true : false
                                            };
                                            debugger;

                                            $.getJSON('/api/PS_PaymentsTemp/CheckFromRefNo', {
                                                pReferenceNo: pReferenceNo, pSwiftCode: pSwiftCode
                                            }, function (pResult) {
                                                debugger;
                                                if (pResult[0] == false) {
                                                    _Suceess = false;
                                                    swal('Excuse me', pResult[1]);
                                                }
                                                else {
                                            //FadePageCover(true);
                                            CallPOSTFunctionWithParameters("/api/PS_PaymentsTemp/Insert", pParametersWithValuesVoucherPayments
                                                , function (pData) {
                                                    debugger;
                                                    //InvoicesIDs = "";
                                                    if (pData[0] == true) {
                                                        swal("Success", "Saved successfully.");
                                                        FadePageCover(false);
                                                        $("#txtSearchCode").val("");
                                                        $("#txtsearchClientID").val("")
                                                        $("#txtsearchPaymentNotes").val("");
                                                        $("#txtsearchPaymentDate").val(getTodaysDateInddMMyyyyFormat());

                                                        Payments_LoadingWithPaging();
                                                        jQuery("#PaymentsModal").modal("hide");
                                                        Payment_Print(pData[2]);

                                                    }
                                                    else {
                                                        swal("Sorry", "");
                                                        FadePageCover(false);
                                                    }
                                                }
                                                , null);
                                                    }
                                            });
                                        }


                                    }

                                } else {
                                    swal("Sorry", "Please Link Client");
                                    //if ($("#slClientGroup option:selected").text() == "" ) {
                                    //    swal("Sorry", "Please Select Client Group To Link This Client By Acount And SubAcount");
                                    //    //swal("Sorry", "Please Link This Client By Acount And SubAcount");
                                    //    ClientGroups_GetList();
                                    //} else if ($("#slClientGroup option:selected").val() == 0)
                                    //    swal("Sorry", "Please, select client Group");
                                    //else {
                                    //    debugger;
                                    //    PaymentsShipLinkClients_Save();
                                    //}
                                }
                            });
                        } else {
                            swal("Error", "Please, Complete Payment Type");
                        }
                    }
                } else {
                    swal("Error", "Please, Enter Payment Date");
                    $("#txtPaymentDate").addClass('validation-error');
                }
            }
            else {
                swal("Error", "Please, Select Specific Client And Currency");
            }
        }
    });
}

function DeleteItems(RowNumber, type) {
    debugger;
    if (type == 1) {
        if ($("#tblCash > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
            $("#tblCash > tbody > tr[counter='" + RowNumber + "']").remove();
            CashRows = CashRows - 1;

        }
        else {
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
                    debugger;
                    $("#tblCash > tbody > tr[counter='" + RowNumber + "']").remove();
                    CashRows = CashRows - 1;

                });

        }
    }
    else if (type == 2) {
        if ($("#tblCheque > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
            $("#tblCheque > tbody > tr[counter='" + RowNumber + "']").remove();
            ChequeRows = ChequeRows - 1;

        }
        else {
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
                    debugger;
                    $("#tblCheque > tbody > tr[counter='" + RowNumber + "']").remove();
                    DepositeRows = DepositeRows - 1;

                });

        }
    }
    else if (type == 3) {
        if ($("#tblDeposite > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
            $("#tblDeposite > tbody > tr[counter='" + RowNumber + "']").remove();
            ChequeRows = ChequeRows - 1;

        }
        else {
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
                    debugger;
                    $("#tblDeposite > tbody > tr[counter='" + RowNumber + "']").remove();
                    DepositeRows = DepositeRows - 1;

                });

        }
    }
    else if (type == 4) {
        if ($("#tblTransfer > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
            $("#tblTransfer > tbody > tr[counter='" + RowNumber + "']").remove();
            TransferRows = TransferRows - 1;

        }
        else {
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
                    debugger;
                    $("#tblTransfer > tbody > tr[counter='" + RowNumber + "']").remove();
                    TransferRows = TransferRows - 1;

                });

        }
    }

}

var CashBool = false;
var CashBoolEdit = true;
function ValidateCashForm() {
    debugger;
    CashBool = true;
    CashBoolEdit = true;
    for (var i = 1; i < CashRows; i++) {
        //for (var k = 1; k < CashRows; k++) {
        //    if($("#slCashSafe" + i).val()==$("#slCashSafe" + k).val() && i != k)
        //    {
        //        swal("Error", "Error, Safe In Cash Rebeated");
        //        CashBoolEdit = false;
        //    }
        //}
        if ($("#slCashSafe" + i).val() != "0" && $("#slCashSafe" + i).val() != "") {
            if ($("#slCashSafe" + i).val() == "0") {
                $("#slCashSafe" + i).addClass('validation-error');
                CashBool = false;
            }
            else
                $("#slCashSafe" + i).removeClass('validation-error');

            if ($("#txtCashAmount" + i).val() == "") {
                $("#txtCashAmount" + i).addClass('validation-error');
                CashBool = false;
            }
            else
                $("#txtCashAmount" + i).removeClass('validation-error');

            if ($("#txtCashExchangeRate" + i).val() == "0" || $("#txtCashExchangeRate" + i).val() == "") {
                $("#txtCashExchangeRate" + i).addClass('validation-error');
                CashBool = false;
            }
            else
                $("#txtCashExchangeRate" + i).removeClass('validation-error');

            if ($("#slCashSafe" + i).val() != "0" && CashBool == false) {
                swal("Error", "Please, Complete Cash Payment If You Need Pay By Cash");
                CashBoolEdit = false;
            }


            //if ($("#txtCashNotes" + i).val() == "") {
            //    $("#txtCashNotes" + i).addClass('validation-error');
            //    bool = false;
            //}
            //else
            //    $("#txtCashNotes" + i).removeClass('validation-error');
        }

    }
    return CashBool;
}

var ChequeBool = false;
var ChequeBoolEdit = true;
function ValidateChequeForm() {
    debugger;
    ChequeBool = true;
    ChequeBoolEdit = true;
    var RebeatedSafe = 0;
    for (var i = 1; i < ChequeRows; i++) {
        //for (var k = 1; k < ChequeRows; k++) {
        //    if ($("#slChequeBank" + i).val() == $("#slChequeBank" + k).val() && i != k) {
        //        swal("Error", "Error, Bank In Cheque Rebeated");
        //        ChequeBoolEdit = false;
        //    }
        //}
        if ($("#slChequeBank" + i).val() != "0" && $("#slChequeBank" + i).val() != "") {
            if ($("#slChequeBank" + i).val() == "0") {
                $("#slChequeBank" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#slChequeBank" + i).removeClass('validation-error');

            if ($("#txtChequeNo" + i).val() == "") {
                $("#txtChequeNo" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtChequeNo" + i).removeClass('validation-error');

            if ($("#txtChequeDate" + i).val() == "") {
                $("#txtChequeDate" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtChequeDate" + i).removeClass('validation-error');

            if ($("#txtChequeAmount" + i).val() == "") {
                $("#txtChequeAmount" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtChequeAmount" + i).removeClass('validation-error');

            if ($("#txtChequeExchangeRate" + i).val() == "0" || $("#txtChequeExchangeRate" + i).val() == "") {
                $("#txtChequeExchangeRate" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtChequeExchangeRate" + i).removeClass('validation-error');

            if ($("#slChequeBank" + i).val() != "0" && ChequeBool == false) {
                swal("Error", "Please, Complete Cheque Payment If You Need Pay By Cheque");
                ChequeBoolEdit = false;
            }

            if ($("#txtBankRecived" + i).val() == "0" || $("#txtBankRecived" + i).val() == "") {
                $("#txtBankRecived" + i).addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtBankRecived" + i).removeClass('validation-error');


            if (parseInt($("#txtBankChargesAmount").val()) > parseInt($("#txtChequeAmount" + i).val())) {
                $("#txtBankChargesAmount").addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtBankChargesAmount").removeClass('validation-error');

            if (parseInt($("#txtRefundAmount").val()) > parseInt($("#txtChequeAmount" + i).val())) {
                $("#txtRefundAmount").addClass('validation-error');
                ChequeBool = false;
            } else
                $("#txtRefundAmount").removeClass('validation-error');

            //if ($("#txtChequeNotes" + i).val() == "") {
            //    $("#txtChequeNotes" + i).addClass('validation-error');
            //    bool = false;
            //} else
            //    $("#txtChequeNotes" + i).removeClass('validation-error');
        }


    }
    return ChequeBool;
}
var DepositeBool = false;
var DepositeBoolEdit = true;
function ValidateDepositeForm() {
    debugger;
    DepositeBool = true;
    DepositeBoolEdit = true;
    for (var i = 1; i < DepositeRows; i++) {
        //for (var k = 1; k < DepositeRows; k++) {
        //    if ($("#slDepositeBank" + i).val() == $("#slDepositeBank" + k).val() && i != k) {
        //        swal("Error", "Error, Bank In Deposite Rebeated");
        //        DepositeBoolEdit = false;
        //    }
        //}
        if ($("#slDepositeBank" + i).val() != "0" && $("#slDepositeBank" + i).val() != "") {
            if ($("#slDepositeBank" + i).val() == "0") {
                $("#slDepositeBank" + i).addClass('validation-error');
                DepositeBool = false;
            } else
                $("#slDepositeBank" + i).removeClass('validation-error');

            if ($("#txtDepositeNo" + i).val() == "") {
                $("#txtDepositeNo" + i).addClass('validation-error');
                DepositeBool = false;
            } else
                $("#txtDepositeNo" + i).removeClass('validation-error');

            if ($("#txtDepositeDate" + i).val() == "") {
                $("#txtDepositeDate" + i).addClass('validation-error');
                DepositeBool = false;
            } else
                $("#txtDepositeDate" + i).removeClass('validation-error');

            if ($("#txtDepositeAmount" + i).val() == "") {
                $("#txtDepositeAmount" + i).addClass('validation-error');
                DepositeBool = false;
            } else
                $("#txtDepositeAmount" + i).removeClass('validation-error');

            if ($("#txtDepositeExchangeRate" + i).val() == "0" || $("#txtDepositeExchangeRate" + i).val() == "") {
                $("#txtDepositeExchangeRate" + i).addClass('validation-error');
                DepositeBool = false;
            } else
                $("#txtDepositeExchangeRate" + i).removeClass('validation-error');

            if ($("#slDepositeBank" + i).val() != "0" && DepositeBool == false) {
                swal("Error", "Please, Complete Cheque Payment If You Need Pay By Cheque");
                DepositeBoolEdit = false;
            }


            //if ($("#txtChequeNotes" + i).val() == "") {
            //    $("#txtChequeNotes" + i).addClass('validation-error');
            //    bool = false;
            //} else
            //    $("#txtChequeNotes" + i).removeClass('validation-error');
        }
    }
    return DepositeBool;
}
var TransferBool = false;
var TransferBoolEdit = true;
function ValidateTransferForm() {
    debugger;
    TransferBool = true;
    TransferBoolEdit = true;
    var RebeatedSafe = 0;
    for (var i = 1; i < TransferRows; i++) {
        //for (var k = 1; k < TransferRows; k++) {
        //    if ($("#slTransferBank" + i).val() == $("#slTransferBank" + k).val() && i != k) {
        //        swal("Error", "Error, Bank In Transfer Rebeated");
        //        TransferBoolEdit = false;
        //    }
        //}
        if ($("#slTransferBank" + i).val() != "0" && $("#slTransferBank" + i).val() != "") {
            if ($("#slTransferBank" + i).val() == "0") {
                $("#slTransferBank" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#slTransferBank" + i).removeClass('validation-error');

            if ($("#txtTransferNo" + i).val() == "") {
                $("#txtTransferNo" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#txtTransferNo" + i).removeClass('validation-error');

            if ($("#txtTransferDate" + i).val() == "") {
                $("#txtTransferDate" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#txtDepositeDate" + i).removeClass('validation-error');

            if ($("#txtTransferAmount" + i).val() == "") {
                $("#txtTransferAmount" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#txtTransferAmount" + i).removeClass('validation-error');

            if ($("#txtTransferExchangeRate" + i).val() == "0" || $("#txtTransferExchangeRate" + i).val() == "") {
                $("#txtTransferExchangeRate" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#txtTransferExchangeRate" + i).removeClass('validation-error');

            if ($("#slTransferBank" + i).val() != "0" && TransferBool == false) {
                swal("Error", "Please, Complete Cheque Payment If You Need Pay By Cheque");
                TransferBoolEdit = false;
            }

            if ($("#txtSwiftCode" + i).val() == "") {
                $("#txtSwiftCode" + i).addClass('validation-error');
                TransferBool = false;
            } else
                $("#txtSwiftCode" + i).removeClass('validation-error');
            //if ($("#txtChequeNotes" + i).val() == "") {
            //    $("#txtChequeNotes" + i).addClass('validation-error');
            //    bool = false;
            //} else
            //    $("#txtChequeNotes" + i).removeClass('validation-error');
        }
    }
    return TransferBool;
}

function Details_CashSave(pSelectID, pVoucherType, ExchangeRate, AccountID, SubAccountID) {
    debugger;

    var pParametersWithValuesVoucherPayments = {
        pID: 0
        //, pClientID: $('#slSearchClient option:selected').val()
        //, pCode: code
        , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
        , pSafeID: $('#slCashSafe' + pSelectID + ' option:selected').val()
        , pBankID: 0
        , pCurrencyID: $('#slCashCurrency' + pSelectID + ' option:selected').val()
        , pExchangeRate: ExchangeRate
        , pChargedPerson: $("#slSearchClient option:selected").text()
        , pAmount: $("#txtCashAmount" + pSelectID + "").val()
        , pNotes: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val())
        , pPaymentNotes: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val()) + " " + ($("#txtChequeNotes" + pSelectID + "").val() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val())
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
        , pTotal: $("#txtCashAmount" + pSelectID + "").val()
        , pTotalAfterTax: ($("#txtCashAmount" + pSelectID + "").val() * 1) - ($("#txtCashTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtCashTaxValue" + pSelectID + "").val() * 1)
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
        , pIsCash: true
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
        , pDescription: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val())
        , pAccountID: AccountID
        , pSubAccountID: SubAccountID
        , pCostCenterID: 0
        , pIsDocumented: false
        , pDetailsInvoiceID: 000
        , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
        , pClientID: $("#slSearchClient option:selected").attr("value")
        //InvoicesIDs
        , pInvoicesIDs: InvoicesIDs
        //Bank Charges Data 
        , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()

    };

    debugger;
    ////Save In VoucherPayments Table
    CallPOSTFunctionWithParameters("/api/PS_PaymentsTemp/Insert", pParametersWithValuesVoucherPayments
        , function (pData) {
            debugger;
            //InvoicesIDs = "";
            if (pData[0] == true) {

                if (ChequeBool == false) {
                    var CashCurrencyID = $('#slCashCurrency' + pSelectID + ' option:selected').val();
                    var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                    if (CashCurrencyID != PaymentCurrencyID) {
                        //Insert in A_JV & A_JVDetails
                        CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: true }
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
                        CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
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
                                }
                            }, null);
                    }
                } else {
                    debugger;
                    if (ChequeBool || ValidateChequeForm()) {
                        var ValidateCashAmount = parseInt($("#txtCashExchangeRate1").val() == "" ? "0" : $("#txtCashExchangeRate1").val()) * parseInt($("#txtCashAmount1").val() == "" ? "0" : $("#txtCashAmount1").val());
                        var ValidateInvoicesAmount = parseInt($("#txtInvoicesExchangeRate").val() == "" ? "0" : $("#txtInvoicesExchangeRate").val()) * parseInt($("#txtTotalCost").val() == "" ? "0" : $("#txtTotalCost").val());
                        if (ValidateCashAmount < ValidateInvoicesAmount) {
                            //Save All Cheque Rows
                            for (var i = 1; i < ChequeRows; i++) {
                                Details_ChequeSave(i, 30, ChequeExchangeRate, AccountID, SubAccountID);
                            }
                        } else {
                            var CashCurrencyID = CashBool == true ? $('#slCashCurrency' + pSelectID + ' option:selected').val() : "-1";
                            var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                            if (CashCurrencyID != PaymentCurrencyID && CashCurrencyID != "-1") {
                                //Insert in A_JV & A_JVDetails
                                CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: true }
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
                                //} else if (CashCurrencyID == PaymentCurrencyID && CashCurrencyID != "-1" && ChequeCurrencyID == PaymentCurrencyID || CashCurrencyID == "-1" && ChequeCurrencyID == PaymentCurrencyID) {
                            } else {
                                //Insert in A_JV & A_JVDetails
                                CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
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
                swal("Sorry", pData[1]);
                //swal("Sorry", "");
                FadePageCover(false);
            }

        }, null);

}

function Details_ChequeSave(pSelectID, pVoucherType, ExchangeRate, AccountID, SubAccountID) {
    debugger;

    var pParametersWithValuesVoucherPayments = {
        pID: 0
        //, pClientID: $('#slSearchClient option:selected').val()
        //, pCode: code
        , pVoucherDate: ConvertDateFormat($("#txtPaymentDate").val())
        , pSafeID: 0
        , pBankID: $('#slChequeBank' + pSelectID + ' option:selected').val() == "" ? 0 : $('#slChequeBank' + pSelectID + ' option:selected').val()
        , pCurrencyID: $('#slChequeCurrency' + pSelectID + ' option:selected').val()
        , pExchangeRate: ExchangeRate
        , pChargedPerson: $("#slSearchClient option:selected").text()
        , pAmount: $("#txtChequeAmount" + pSelectID + "").val()
        , pNotes: ($("#txtChequeNotes" + pSelectID + "").val() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val())
        , pPaymentNotes: ($("#txtCashNotes" + pSelectID + "").val() == "" ? "" : $("#txtCashNotes" + pSelectID + "").val()) + " " + ($("#txtChequeNotes" + pSelectID + "").val() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val())
        , pChequeNo: $("#txtChequeNo" + pSelectID + "").val() == "" ? 0 : $("#txtChequeNo" + pSelectID + "").val()
        , pChequeDate: $("#txtChequeDate" + pSelectID + "").val() == "" ? "01/01/1900" : ConvertDateFormat(($("#txtChequeDate" + pSelectID + "").val()).split("-").reverse().join("/"))
        , pVoucherType: pVoucherType
        , pIsChequeOrDeposit: $("#tblCheque  tbody tr").find("#txtDeposit").is(":checked") == true ? true : false  ////Cheque Or Deposite
        , pTaxID: $('#slChequeTax' + pSelectID + ' option:selected').val() == "" ? 0 : $('#slChequeTax' + pSelectID + ' option:selected').val()
        , pTaxValue: $("#txtChequeTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtChequeTaxValue" + pSelectID + "").val()
        , pTaxSign: 1
        , pTaxID2: 0
        , pTaxValue2: 0
        , pTaxSign2: 1
        , pTotal: $("#txtChequeAmount" + pSelectID + "").val()
        , pTotalAfterTax: ($("#txtChequeAmount" + pSelectID + "").val() * 1) - ($("#txtChequeTaxValue" + pSelectID + "").val() == "" ? 0 : $("#txtChequeTaxValue" + pSelectID + "").val() * 1)
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
        , pDiscountTaxID: 0
        , pDiscountTaxValue: 0
        , pDiscountTaxID2: 0
        , pDiscountTaxValue2: 0
        , pOtherSideBankName: "0"
        , pCollectionDate: "01/01/1900"
        , pCollectionExpense: 000
        //Details Data
        , pDetailsID: 0
        , pValue: ($("#txtChequeAmount" + pSelectID + "").val())
        , pDescription: ($("#txtChequeNotes" + pSelectID + "").val() == "" ? "" : $("#txtChequeNotes" + pSelectID + "").val())
        , pAccountID: AccountID
        , pSubAccountID: SubAccountID
        , pCostCenterID: 0
        , pIsDocumented: false
        , pDetailsInvoiceID: 000
        , pRefund: $("#txtRefundAmount").val() == "" ? "0" : $("#txtRefundAmount").val()
        , pClientID: $("#slSearchClient option:selected").attr("value")
        //InvoicesIDs
        , pInvoicesIDs: InvoicesIDs
        //Bank Charges Data 
        , pCollectionExpensesList: $("#txtBankChargesAmount").val() == "0" ? "0" : $("#txtBankChargesAmount").val()

    };

    debugger;
    ////Save In VoucherPayments Table
    CallPOSTFunctionWithParameters("/api/PS_PaymentsTemp/Insert", pParametersWithValuesVoucherPayments
        , function (pData) {
            debugger;
            //InvoicesIDs = "";
            if (pData[0] == true) {

                var CashCurrencyID = CashBool == true ? $('#slCashCurrency' + pSelectID + ' option:selected').val() : "-1"
                var ChequeCurrencyID = $('#slChequeCurrency' + pSelectID + ' option:selected').val();
                var PaymentCurrencyID = $('#slSearchCurrency option:selected').val();
                if (CashCurrencyID != PaymentCurrencyID && CashCurrencyID != "-1" || ChequeCurrencyID != PaymentCurrencyID) {
                    //Insert in A_JV & A_JVDetails
                    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: true }
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
                } else if (CashCurrencyID == PaymentCurrencyID && CashCurrencyID != "-1" && ChequeCurrencyID == PaymentCurrencyID || CashCurrencyID == "-1" && ChequeCurrencyID == PaymentCurrencyID) {
                    //Insert in A_JV & A_JVDetails
                    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/InsertA_JVAndA_JVDetails", { pInvoicesIDs: InvoicesIDs, pCheck: false }
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
                swal("Sorry", pData[1]);
                // swal("Sorry", "");
                FadePageCover(false);
            }
            //FirstCall = 1;
        }
        , null);
}

var InvoicesIDs = "";
var InvoicesDCNotesIDs = "";
var InvoicesisPurchase = "";

var InvoicesAmounts = "";
var InvoicesRremain = "";
var InvoicesDCNotesAmounts = "";
var InvoicesDCNotesRremain = "";

var returned_value = "0";
var returned_valueCheck = false;


function CheckPaymentMoney() {
    debugger;
    var VouchersTotalMoney = 0;
    $("#tblInvoices  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val());
    });
    $("#tblInvoicesDbtCrdtNotes  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            if ($(this).find("td.IsDbt").attr('val') == "false") {
                VouchersTotalMoney -= parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val()) * 1;

            }
            else {
                VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val()) * 1;
            }

    });

    if (VouchersTotalMoney != 0) {
        debugger;
        InvoicesIDs = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "InvoiceID", "txtChoose");

        var EgpVouchersTotalMoney = 0;


        if (InvoicesExchangeRate == 0)
            InvoicesExchangeRate = $("#txtInvoicesExchangeRate").val() == "" ? 0 : parseFloat($("#txtInvoicesExchangeRate").val());

        EgpVouchersTotalMoney = VouchersTotalMoney * InvoicesExchangeRate;
        //setTimeout(function () {
        if (EgpVouchersTotalMoney != 0) {
            $("#txtInvoicesExchangeRate").removeClass('validation-error');

            var cashTotalMoney = 0;
            var EgpcashTotalMoney = 0;
            for (var i = 1; i <= CashRows; i++) {
                if ($("#slCashSafe" + i).val() != undefined && $("#txtCashAmount" + i).val() != undefined && $("#txtNewCashExchangeRate" + i).val() != undefined) {
                    cashTotalMoney = 0;
                    //$("#tblCash  tbody tr").each(function () {
                    cashTotalMoney = parseFloat($("#txtCashAmount" + i).val() == "" ? 0 : $("#txtCashAmount" + i).val());
                    EgpcashTotalMoney += cashTotalMoney * parseFloat($("#txtNewCashExchangeRate" + i).val() == "" ? 0 : $("#txtNewCashExchangeRate" + i).val());
                    if (CashExchangeRate == 0) {
                        CashExchangeRate = parseFloat($("#txtNewCashExchangeRate" + i + "").val());
                    }
                    //});
                }


            }

            var ChequeTotalMoney = 0;
            var EgpChequeTotalMoney = 0;
            for (var i = 1; i <= ChequeRows; i++) {
                if ($('#slChequeBank' + i).val() != undefined && $("#txtChequeAmount" + i).val() != undefined && $("#txtNewChequeExchangeRate" + i).val() != undefined) {
                    ChequeTotalMoney = 0;
                    ChequeTotalMoney = parseFloat($("#txtChequeAmount" + i).val() == "" ? 0 : $("#txtChequeAmount" + i).val());
                    EgpChequeTotalMoney += ChequeTotalMoney * parseFloat($("#txtNewChequeExchangeRate" + i).val() == "" ? 0 : $("#txtNewChequeExchangeRate" + i).val());
                    if (ChequeExchangeRate == 0) {
                        ChequeExchangeRate = parseFloat($("#txtNewChequeExchangeRate" + i + "").val());
                    }
                }
            }
            var DepositeTotalMoney = 0;
            var EgpDepositeTotalMoney = 0;
            for (var i = 1; i <= DepositeRows; i++) {
                if ($("#slDepositeBank" + i).val() != undefined && $("#txtDepositeAmount" + i).val() != undefined && $("#txtNewDepositeExchangeRate" + i).val() != undefined) {

                    DepositeTotalMoney = 0;
                    DepositeTotalMoney = parseFloat($("#txtDepositeAmount" + i).val() == "" ? 0 : $("#txtDepositeAmount" + i).val());
                    EgpDepositeTotalMoney += DepositeTotalMoney * parseFloat($("#txtNewDepositeExchangeRate" + i).val() == "" ? 0 : $("#txtNewDepositeExchangeRate" + i).val());
                }
            }
            var TransferTotalMoney = 0;
            var EgpTransferTotalMoney = 0;
            for (var i = 1; i <= TransferRows; i++) {
                if ($('#slTransferBank' + i).val() != undefined && $("#txtTransferAmount" + i).val() != undefined && $("#txtNewTransferExchangeRate" + i).val() != undefined) {
                    TransferTotalMoney = 0;
                    TransferTotalMoney = parseFloat($("#txtTransferAmount" + i).val() == "" ? 0 : $("#txtTransferAmount" + i).val());
                    EgpTransferTotalMoney += TransferTotalMoney * parseFloat($("#txtNewTransferExchangeRate" + i).val() == "" ? 0 : $("#txtNewTransferExchangeRate" + i).val());


                }
            }
            EgpPaymentTotalMoney = EgpcashTotalMoney + EgpChequeTotalMoney + EgpDepositeTotalMoney + EgpTransferTotalMoney;

            // if (EgpPaymentTotalMoney >= EgpVouchersTotalMoney) {
            //    if (EgpPaymentTotalMoney == EgpVouchersTotalMoney) {

            if (parseFloat((EgpPaymentTotalMoney).toFixed(2)) >= parseFloat(EgpVouchersTotalMoney.toFixed(2))) {
                returned_value = "1";

            }
            else {
                swal("Sorry", "The Amount Paid Is Less Than The Value Of The Vouchers");
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
var InvoicesIDsCheck = "";

function CheckPaymentMoneyCheck() {
    debugger;
    var VouchersTotalMoney = 0;
    $("#tblInvoices  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val());
    });
    $("#tblInvoicesDbtCrdtNotes  tbody tr").each(function () {
        if ($(this).find("#txtChoose").is(":checked") == true)
            if ($(this).find("td.IsDbt").attr('val') == "false") {
                VouchersTotalMoney -= parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val()) * 1;

            }
            else {
                VouchersTotalMoney += parseFloat($(this).find('.input_quantity').val() == "" ? 0 : $(this).find('.input_quantity').val()) * 1;
            }

    });

    if (VouchersTotalMoney != 0) {
        debugger;
        InvoicesIDsCheck = GetTableCellsAsStringWhenCellISChecked("tblInvoices", "InvoiceID", "txtChoose");

        var EgpVouchersTotalMoney = 0;


        if (InvoicesExchangeRate == 0)
            InvoicesExchangeRate = $("#txtInvoicesExchangeRate").val() == "" ? 0 : parseFloat($("#txtInvoicesExchangeRate").val());

        EgpVouchersTotalMoney = VouchersTotalMoney * InvoicesExchangeRate;
        //setTimeout(function () {
        if (EgpVouchersTotalMoney != 0) {
            $("#txtInvoicesExchangeRate").removeClass('validation-error');

            var cashTotalMoney = 0;
            var EgpcashTotalMoney = 0;
            for (var i = 1; i <= CashRows; i++) {
                if ($("#slCashSafe" + i).val() != undefined && $("#txtCashAmount" + i).val() != undefined && $("#txtNewCashExchangeRate" + i).val() != undefined) {
                    cashTotalMoney = 0;
                    //$("#tblCash  tbody tr").each(function () {
                    cashTotalMoney = parseFloat($("#txtCashAmount" + i).val() == "" ? 0 : $("#txtCashAmount" + i).val());
                    EgpcashTotalMoney += cashTotalMoney * parseFloat($("#txtNewCashExchangeRate" + i).val() == "" ? 0 : $("#txtNewCashExchangeRate" + i).val());
                    if (CashExchangeRate == 0) {
                        CashExchangeRate = parseFloat($("#txtNewCashExchangeRate" + i + "").val());
                    }
                    //});
                }


            }

            var ChequeTotalMoney = 0;
            var EgpChequeTotalMoney = 0;
            for (var i = 1; i <= ChequeRows; i++) {
                if ($('#slChequeBank' + i).val() != undefined && $("#txtChequeAmount" + i).val() != undefined && $("#txtNewChequeExchangeRate" + i).val() != undefined) {
                    ChequeTotalMoney = 0;
                    ChequeTotalMoney = parseFloat($("#txtChequeAmount" + i).val() == "" ? 0 : $("#txtChequeAmount" + i).val());
                    EgpChequeTotalMoney += ChequeTotalMoney * parseFloat($("#txtNewChequeExchangeRate" + i).val() == "" ? 0 : $("#txtNewChequeExchangeRate" + i).val());
                    if (ChequeExchangeRate == 0) {
                        ChequeExchangeRate = parseFloat($("#txtNewChequeExchangeRate" + i + "").val());
                    }
                }
            }
            var DepositeTotalMoney = 0;
            var EgpDepositeTotalMoney = 0;
            for (var i = 1; i <= DepositeRows; i++) {
                if ($("#slDepositeBank" + i).val() != undefined && $("#txtDepositeAmount" + i).val() != undefined && $("#txtNewDepositeExchangeRate" + i).val() != undefined) {

                    DepositeTotalMoney = 0;
                    DepositeTotalMoney = parseFloat($("#txtDepositeAmount" + i).val() == "" ? 0 : $("#txtDepositeAmount" + i).val());
                    EgpDepositeTotalMoney += DepositeTotalMoney * parseFloat($("#txtNewDepositeExchangeRate" + i).val() == "" ? 0 : $("#txtNewDepositeExchangeRate" + i).val());
                }
            }
            var TransferTotalMoney = 0;
            var EgpTransferTotalMoney = 0;
            for (var i = 1; i <= TransferRows; i++) {
                if ($('#slTransferBank' + i).val() != undefined && $("#txtTransferAmount" + i).val() != undefined && $("#txtNewTransferExchangeRate" + i).val() != undefined) {
                    TransferTotalMoney = 0;
                    TransferTotalMoney = parseFloat($("#txtTransferAmount" + i).val() == "" ? 0 : $("#txtTransferAmount" + i).val());
                    EgpTransferTotalMoney += TransferTotalMoney * parseFloat($("#txtNewTransferExchangeRate" + i).val() == "" ? 0 : $("#txtNewTransferExchangeRate" + i).val());


                }
            }
            EgpPaymentTotalMoney = EgpcashTotalMoney + EgpChequeTotalMoney + EgpDepositeTotalMoney + EgpTransferTotalMoney;

            // if (EgpPaymentTotalMoney >= EgpVouchersTotalMoney) {
            //    if (EgpPaymentTotalMoney == EgpVouchersTotalMoney) {

            if (parseFloat((EgpPaymentTotalMoney).toFixed(2)) > parseFloat(EgpVouchersTotalMoney.toFixed(2))) {

                returned_valueCheck = true;


            }
            else {
                returned_valueCheck = false;

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
    return returned_valueCheck;
}


function ClientGroups_GetList() {
    debugger;
    CallGETFunctionWithParameters("/api/PS_PaymentsTemp/LoadAllClientsGroupsByName", {}
        , function (pData) {
            FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slClientGroup", pData[0], null);
            $("#DivSlClientGroup").removeClass('hide');
        }, null);

}

function PaymentsShipLinkClients_Save() {
    debugger;
    var pSelectedID = $("#slSearchClient option:selected").attr("value");
    if (pSelectedID == "")
        swal("Sorry", "Please, select Supplier.");

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
function PaymentTax_Print(pID) {
    debugger;

    //CallGETFunctionWithParameters("/api/PS_PaymentsTemp/GetPrintedDataRep"
    //           , { pID: pID })


    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("PaymentID");
    arr_Values.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Purshase Payment Tax"
        , pReportName: "Rep_PurchasePaymentTaxReceipt"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
    }
function Payment_Print(pID) {
    debugger;

     //CallGETFunctionWithParameters("/api/PS_PaymentsTemp/GetPrintedDataRep"
     //           , { pID: pID })

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("PaymentID");
    arr_Values.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Payment"
        , pReportName: "Rep_PS_Payment"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}

function GetTableCellsAsStringWhenCellISChecked(pTableID, pClassName, pCellID) {
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