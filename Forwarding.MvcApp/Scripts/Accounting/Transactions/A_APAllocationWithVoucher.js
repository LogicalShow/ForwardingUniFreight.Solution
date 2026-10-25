function  A_APAllocationWithVoucher_Initialize()
{
    debugger;

    Allocation_LoadingWithPaging();
    $("#slCurrency").html($("#hReadySlCurrencies").html());

    CallGETFunctionWithParameters("/api/A_APAllocationWithVoucher/ARAllocationWithVoucher_Partners", { pIsLoadArrayOfObjects: true }
    , function (pData) {
        // FillListFromObject(null, 2/*pCodeOrName*/, "All PartnerTypes"/*"Select Pay. Type"*/, "slClient", pData[2], null);
        FillListFromObject(null, 2/*pCodeOrName*/, "All PartnerTypes"/*"Select Pay. Type"*/, "slPartnerType", pData[1], null);
        FadePageCover(false);
    }
    , null);


}
function ARAllocation_PartnerTypeChanged() {

    debugger;
    $("#slPartner").html("<option value=''><--All--></option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/A_APAllocationWithVoucher/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slClient", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}
//Start Auto Filter
$(document).ready(function () {
    $("#slClient").css({ "width": "100%" }).select2();
    $("#slSubAccount").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter


function A_APAllocationWithVoucher_BindTableRows(pJVTypes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblPayments");
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print Voucher") + "</span>";
    var printControlsText2 = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print JV") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblPayments",
        ("<tr>"
                    //+ "<td class='ID'> <input " + (item.Approved ? " disabled='disabled'" : "name='Delete'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Date '>" + GetDateWithFormatMDY(item.Date) + "</td>"
                    + "<td class='PartnerTypeName'>" + item.PartnerTypeName + "</td>"
                    + "<td class='PartnerID' val='" + item.PartnerID + "'>" + item.PartnerName + "</td>"
                   
                   + "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                    + "<td class='invTotalPaid' >" + item.VoucherTotalPaid + "</td>"
                   + "<td class='Print'><a href='' data-toggle='modal' onclick='Payment_Print(" + item.ID + ");' class='btn btn-xs btn-rounded btn-lightblue float-right'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>Print</span></a></td>"
                   + "<td class='hide'><a href='#AllocationModal' data-toggle='modal' onclick='Payments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPayments", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPayments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Payment_Print(pID) {
    var chequeType = 0;
    var cashType = 0;
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("PaymentID");
    arr_Values.push(pID);

    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
           , pTitle: "Allocation"
            , pReportName: "Rep_A_Payment_AllocationPayable"
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function Allocation_ClearAllControls(callback) {
    ClearAll("#AllocationModal");

    $("#btnSave").attr("onclick", "Allocation_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Allocation_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);


    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function SetArrayOfPayment() {
    debugger;
    var arrayOfItems = new Array();
    var objItem = new Object();

    objItem.ID = 0;
    objItem.Code = 0;
    objItem.Date = ConvertDateFormat($("#txtDate").val())
    objItem.ClientID = $("#slClient").val()
    CurrencyID.$("#slCurrency").val()
    arrayOfItems.push(objItem);

    return arrayOfItems;
}
function SetArrayOfInvoices() {
    debugger;
    var arrayOfItems = new Array();
    $("#tblInvoices>tbody>tr").each(function (i, tr) {
        if ($(this).find("#txtChoose" + $(tr).find('td.ID').text()).is(":checked") == true) {
            var objItem = new Object();
            objItem.ID = 0;
            objItem.AllocationPaymentID = $('#hID').val();
            objItem.InvoiceHeaderID = $(tr).find('td.ID').text();
            objItem.InvoiceHeaderNo = $(tr).find('td.code').text();
            objItem.Date = ConvertDateFormat($('#txtDate').val());
            objItem.Paid = $(tr).find('td.Qty').find('.input_quantity').val()
            arrayOfItems.push(objItem);
        }
    });
    return arrayOfItems;
}
function SetArrayOfVoucher() {
    debugger;
    var arrayOfItems = new Array();
    $("#tblA_Voucher>tbody>tr").each(function (i, tr) {
        if ($(this).find("#txtChoose" + $(tr).find('td.ID').text()).is(":checked") == true) {
            var objItem = new Object();
            objItem.ID = 0;
            objItem.AllocationPaymentID = $('#hID').val();
            objItem.VoucherID = $(tr).find('td.ID').text();
            objItem.VoucherType = $(tr).find('td.VoucherType').text();
            objItem.Date = ConvertDateFormat($('#txtDate').val());
            objItem.Paid = $(tr).find('td.Qty').find('.input_quantity').val()
            arrayOfItems.push(objItem);
        }
    });
    return arrayOfItems;
}

function Allocation_Insert(pSaveandAddNew) {
    debugger;
    var _Suceess = true;

    //CheckIfInvoiceSameCurrency
    var result = [];
    var Currency;
    var Total = 0;
    var Count = 0;
    $('#tblInvoices  > tbody > tr').each(function (i, tr) {
        if ($($('#tblInvoices tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
            Count++;
            Currency = $(tr).find('td.AmountTextCurrency').text();
            var Cost = $(tr).find('td.Qty').find('.input_quantity').val();
            Total += parseFloat(Cost); 
            if ($.inArray(Currency, result) == -1)
                result.push(Currency);
        }
    });

    var result2 = [];
    var Currency2;
    var Total2 =0;
    var Count2 = 0;

    $('#lblTotalAllocationVoucher').html('');
    $('#tblA_Voucher  > tbody > tr').each(function (i, tr) {
        if ($($('#tblA_Voucher tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
            Count2++;
            Currency2 = $(tr).find('td.AmountTextCurrency').text();
            var Cost = $(tr).find('td.Qty').find('.input_quantity').val();
            Total2 += parseFloat(Cost); 
            if ($.inArray(Currency2, result2) == -1)
                result2.push(Currency2);
        }
    });
    if ( Count == 0) {
        swal('Excuse me', 'Choose Invoices to allocate', 'warning');
        return false;
    }
    if ((Count2 > 1 || Count2 == 0) && pDefaults.UnEditableCompanyName != "3NL") {
        swal('Excuse me', 'choose one voucher only', 'warning');
        return false;
    }
    if (Currency2 == "EGP" && $('#txtVoucherExchangeRate').val() != 1) {
        swal('Excuse me', 'Voucher ExchangeRate must equal 1', 'warning');
        return false;
    }
    if ($('#slPartnerType').val() == '' || $('#slPartnerType').val() == 0)
    {
        swal('Excuse me', 'Choose Partner Type', 'warning');
        return false;
    }
    if ($('#slClient').val() == '' || $('#slClient').val() == 0) {
        swal('Excuse me', 'Choose Partner Name', 'warning');
        return false;
    }
    if ($('#txtVoucherExchangeRate').val() == 0 || $('#txtVoucherExchangeRate').val() == '')
    {
        swal('Excuse me', 'Enter ExchangeRate', 'warning');
        return false;
    }
    if (result[0] == result2[0] && Total.toFixed(2) != Total2.toFixed(2))
    {
        swal('Excuse me', 'The total invoices must equal to the total of the vouchers', 'warning');
        return false;
    }
    if ($('#txtTotalDiff').val() != 0 && result[0] != result2[0]) {
        swal('Excuse me', 'The total invoices must be less than or equal to the total of the vouchers', 'warning');
        return false;
    }
    if ($("#txtDate").val() == "") {
        $("#txtDate").addClass('validation-error');
        return false;
    }
   
    $('#btnSave').attr('disabled', 'disabled');


    var pInvoiceID_List = "";
    var pInvoiceNo_List = "";
    var pInvoicePaid_List = "";
    var pPyableDebitTypeList = "";


    $("#tblInvoices>tbody>tr").each(function (i, tr) {
        if ($(this).find("#txtChoose" + $(tr).find('td.ID').text()).is(":checked") == true) {

            pInvoiceID_List += ((pInvoiceID_List == "") ? "" : ",") + $(tr).find('td.ID').text();
            pInvoiceNo_List += ((pInvoiceNo_List == "") ? "" : ",") + $(tr).find('td.Code').text();
            pInvoicePaid_List += ((pInvoicePaid_List == "") ? "" : ",") + $(tr).find('td.Qty').find('.input_quantity').val();
            pPyableDebitTypeList += ((pPyableDebitTypeList == "") ? "" : ",") + $(tr).find('td.PyableDebitType').text();


        }
    });

    var pVoucherID_List = "";
    var pVoucherType_List = "";
    var pVoucherPaid_List = "";

    $("#tblA_Voucher>tbody>tr").each(function (i, tr) {
        if ($(this).find("#txtChoose" + $(tr).find('td.ID').text()).is(":checked") == true) {

            pVoucherID_List += ((pVoucherID_List == "") ? "" : ",") + $(tr).find('td.ID').text();
            pVoucherType_List += ((pVoucherType_List == "") ? "" : ",") + $(tr).find('td.VoucherType').text();
            pVoucherPaid_List += ((pVoucherPaid_List == "") ? "" : ",") + $(tr).find('td.Qty').find('.input_quantity').val();

        }
    });

    var pParametersWithValues = {
        pID: 0 //$("#hID").val() == "" ? 0 : $("#hID").val()
     , pCode: 0
     , pDate: ConvertDateFormat($("#txtDate").val())
        , pClientID: $("#slClient").val()
        , pPartnerTypeID: $("#slPartnerType").val()
     , pCurrencyID: $("#slCurrency").val()
     , pVoucherExchangeRate: $("#txtVoucherExchangeRate").val() == '' ? 0 : $("#txtVoucherExchangeRate").val()
     , pInvoiceExchangeRate: $("#txtInvoiceExchangeRate").val() == '' ? 0 : $("#txtInvoiceExchangeRate").val()
     , pProfitAmount: $("#txtCurrencyProfit").val() == '' ? 0 : $("#txtCurrencyProfit").val()
     , pLossAmount: $("#txtCurrencyLoss").val() == '' ? 0 : $("#txtCurrencyLoss").val()
        , pInvoiceID_List: pInvoiceID_List
        , pInvoiceNo_List: pInvoiceNo_List
        , pInvoicePaid_List: pInvoicePaid_List
        , pVoucherID_List: pVoucherID_List
        , pVoucherType_List: pVoucherType_List
        , pVoucherPaid_List: pVoucherPaid_List
        , pPyableDebitTypeList: pPyableDebitTypeList

    };
    CallPOSTFunctionWithParameters("/api/A_APAllocationWithVoucher/Save", pParametersWithValues
       , function (pData) {
           if (pData[0] == '') {
                       swal("Success", "Saved successfully.");
                       FadePageCover(false);
                       jQuery("#AllocationModal").modal("hide");
                       Allocation_LoadingWithPaging();
                       if (pData[1] != '')
                           JournalVoucher_Print(pData[1]);
                   }
                   else {
               swal("Sorry", pData);
                       FadePageCover(false);
                   }

       }, null);
}
function Allocation_DeleteList() {
    debugger;
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
        function () {
            pSelectedIDs = GetAllSelectedIDsAsString('tblPayments', 'Delete');
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/A_APAllocationWithVoucher/Delete"
            , { pDeletedIDs: pSelectedIDs }
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = "error.";
                }
                Allocation_LoadingWithPaging();
              }, null);

            //DeleteListFunction("/api/A_APAllocationWithVoucher/Delete", { "pPaymentIDs": GetAllSelectedIDsAsString('tblPayments', 'Delete') }, function () {
            //    Allocation_LoadingWithPaging();
            //});
        });
}
function loadWithPagingWithParmWhere(pWhereClause, pWhereClauseVoucher) {
    debugger;
    LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/A_APAllocationWithVoucher/LoadInvoices", pWhereClause, 1, 99999, function (pTableRows) { PaymentsAllocationpayable_BindTableRows(pTableRows); });
    LoadWithPagingWithWhereClause("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", "/api/A_APAllocationWithVoucher/LoadVoucher", pWhereClauseVoucher, 1, 99999, function (pTableRows) {
        PaymentsA_Voucherpayable_BindTableRows(JSON.parse(pTableRows[0]));
        $('#lblAvailableAmounts').html(pTableRows[2]);
    });

}

function FillItemsData() {
    $($('#tblInvoices > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
    });
    $($('#tblA_Voucher > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
    });
}
function CheckAllClick()
{
    debugger;
    var Check = $('#cb-CheckAllInvoices').prop('checked')
    $('#tblInvoices  > tbody > tr').each(function (i, tr) {
        $($('#tblInvoices tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).prop('checked', Check)
        SelectRowInTable(i);
        });
}
function SelectRowInTable(pRowIndex) {
    debugger;
    if (($($('#tblInvoices tbody tr')[pRowIndex]).find('.input_Choose').is(":checked"))) {
        $($('#tblInvoices tbody tr')[pRowIndex]).find('.input_quantity').removeAttr("disabled");
    }
    else {

        $($('#tblInvoices tbody tr')[pRowIndex]).find('.input_quantity').attr("disabled", "disabled");
    }
    if ($("#txtDate").val() != "") {
        if ($($('#tblInvoices tbody tr')[pRowIndex]).find('.input_Choose').is(":checked")) {
            $("#tblInvoices tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "#00c7f7"); //#fd7979 #ccc
            TotalCost += parseFloat($($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text());
        } else {
            $("#tblInvoices tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "white");
            TotalCost -= parseFloat($($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblInvoices tbody tr')[pRowIndex]).find('.AmountOnly').text());
        }
    } else {
        $($('#tblInvoices tbody tr')[pRowIndex]).find('.input_Choose').prop("checked", false);
        swal("Error", "Please, Enter Payment Date");
        $("#txtDate").addClass('validation-error');
    }
    CalculateAll();

}
function SelectRowInVoucher(pRowIndex) {
    debugger;
    if (($($('#tblA_Voucher tbody tr')[pRowIndex]).find('.input_Choose').is(":checked"))) {
        $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.input_quantity').removeAttr("disabled");
    }
    else {

        $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.input_quantity').attr("disabled", "disabled");
    }
    //.removeClass('red')
    if ($("#txtDate").val() != "") {
        if ($($('#tblA_Voucher tbody tr')[pRowIndex]).find('.input_Choose').is(":checked")) {
            $("#tblA_Voucher tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "#00c7f7"); //#fd7979 #ccc
            TotalCost += parseFloat($($('#tblA_Voucher tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.AmountOnly').text());
        } else {
            $("#tblInvoicesDbtCrdtNotes tbody tr:nth-child(" + (pRowIndex + 1) + ")").css("background", "white");
            TotalCost -= parseFloat($($('#tblA_Voucher tbody tr')[pRowIndex]).find('.AmountOnly').text() == "" ? 0 : $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.AmountOnly').text());
        }
        $("#txtTotalCost").val(TotalCost + " " + $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.AmountTextCurrency').text());
    } else {
        $($('#tblA_Voucher tbody tr')[pRowIndex]).find('.input_Choose').prop("checked", false);
        swal("Error", "Please, Enter Payment Date");
        $("#txtDate").addClass('validation-error');
    }
    CalculateAll()
}

//$('#slClient').change(function () {
//    debugger;


//});

function  LoadData()
{
    if ($("#slClient").val() != "" && $("#slClient").val() != 0) {
        $("#slCurrency").removeAttr("disabled");
    } else {
        $("#slCurrency").attr("disabled", "disabled");
    }
    if ($("#slClient option:selected").text() != "" && $("#slClient option:selected").val() != ""
        && $("#slCurrency option:selected").val() != "" && $("#slCurrency option:selected").val() != 0
        ) {
        var pWhereClause = " Where PartnerID = '" + ($("#slClient option:selected").val() == "" ? "" : $("#slClient option:selected").val()) + "'"
                     + " And PartnerTypeID = '" + $("#slPartnerType option:selected").val() + "'"
                     + " And CurrencyID = '" + $("#slCurrency option:selected").val() + "'";
        var pWhereClauseVoucher = " Where Rmaining > 0 and Client_ID = '" + ($("#slClient option:selected").val() == "" ? "" : $("#slClient option:selected").val()) + "'";
        CurrencyID = $("#slCurrency option:selected").val();
        loadWithPagingWithParmWhere(pWhereClause, pWhereClauseVoucher);
    }
}

var CurrencyID = "";

function GetDefaultExchangeRate() {
    debugger;
    var CurrencyID = $("#slCurrency option:selected").val();

    var whereCondition = ("WHERE '" + GetDateWithFormatyyyyMMdd($("#txtDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
    + " AND '" + GetDateWithFormatyyyyMMdd($("#txtDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
    + " AND ID = " + CurrencyID
    + " ORDER BY CODE"
  );
    GetListCurrencyWithCodeAndExchangeRate(null, "/api/Currencies/LoadCurrencyDetails"
 , null/*1st Row*/
 , whereCondition
 , function (pData) {
     debugger;
     //$("#txtInvoicesExchangeRate").val(pData);
 });
}
function OpenNew() {
    ClearAllTableRows("tblInvoices");
    $("#txtTotalPaid").val("");
    TotalCost = 0;
    ClearAllTableRows("tblA_Voucher");
    $("#txtTotalVoucherPaid").val("");


    TotalCost = 0;
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $("#slClient").val("0");
    //Start Auto Filter
    $("#slClient").trigger("change");

    //End Auto Filter
}
function Allocation_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#AllocationModal", null);
    $('#lblTotalAllocation').html('');
    $('#lblTotalAllocationVoucher').html('');
    $('#lblAvailableAmounts').html('');

    $("#btnSave").attr("onclick", "Allocation_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Allocation_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    ClearAllTableRows("tblInvoices");
    $("#txtTotalPaid").val("");
    TotalCost = 0;
    ClearAllTableRows("tblA_Voucher");
    $("#txtTotalVoucherPaid").val("");
    TotalCost = 0;
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $("#slClient").val("0");
    //Start Auto Filter
    $("#slClient").trigger("change");

    //End Auto Filter
    $('#btnSave').removeAttr('disabled');
}
function InvoiceSearch() {
    debugger;
    var pWhereClause = "";
    if ($("#slClient option:selected").text() != "" && $("#slClient option:selected").val() != "0") {
        pWhereClause = "where 1=1"
         + " And PartnerTypeID = '" + $("#slPartnerType option:selected").val() + "'";
        pWhereClause += " and PartnerID = '" + ($("#slClient option:selected").val() == "" ? "" : $("#slClient option:selected").val()) + "'";

        if ($("#txtSearchInoice").val().trim() != "") {
            pWhereClause += " And InvoiceNumber LIKE N'%" + $("#txtSearchInoice").val().trim() + "%' "
        }
    }
    else if ($("#txtSearchInoice").val().trim() != "") {
        pWhereClause += " where 1=1 AND Code LIKE N'%" + $("#txtSearchInoice").val().trim() + "%' "
    }
    if (pWhereClause != "") {
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_APAllocationWithVoucher/LoadInvoices", pWhereClause, 1, 99999, function (pTableRows) { PaymentsAllocationpayable_BindTableRows(pTableRows); });

    }
}
function VoucherSearch() {
    if ($("#slClient option:selected").text() != "" && $("#slClient option:selected").val() != "0") {
        var pWhereClause = "where 1=1"
         + " And PartnerTypeID = '" + $("#slPartnerType option:selected").val() + "'";
        pWhereClause += " and Client_ID = '" + ($("#slClient option:selected").val() == "" ? "" : $("#slClient option:selected").val()) + "'";
        if ($("#txtSearchVouchers").val().trim() != "") {
            pWhereClause += " And Code LIKE N'%" + $("#txtSearchVouchers").val().trim() + "%' "
        }
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_APAllocationWithVoucher/LoadVoucher", pWhereClause, 1, 99999, function (pTableRows)
        {
            PaymentsA_Voucherpayable_BindTableRows(JSON.parse(pTableRows[0]));          
        });

    }
}
function PaymentsAllocationpayable_BindTableRows(pInvoices) {
    ClearAllTableRows("tblInvoices");
    $("#txtTotalPaid").val("");
    $('#lblTotalAllocation').html('');
    TotalCost = 0;

    $.each(pInvoices, function (i, item) {
        debugger;
        AppendRowtoTable("tblInvoices",

        ("<tr  style = 'display:block; ' Invoiceid='" + item.ID + "' class='" + ((item.IsDeleted == true) ? "deleted-row" : "") + "'>"
                    + "<td class='ID' hidden>" + item.ID + "</td>"
                    + "<td class='OperationCode'>" + item.OperationCode + "</td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                   // + "<td class='SupplierInvoiceNo'>" + item.SupplierInvoiceNo + "</td>"
                    + "<td class='PyableDebit'>" + item.PyableDebit + "</td>"
                    + "<td class='PyableDebitType hide'>" + item.PyableDebitType + "</td>"

                   // + "<td class='PyableDebitType hide' val='" + item.PyableDebitType + "'>" + "<input tag='" + item.PyableDebitType + "'  disabled='disabled' type='text'  size='16' class='input_PyableDebitType input-sm  col-sm'>" + "</td>"

                   // + "<td class='InvoiceTypeName'>" + item.InvoiceTypeName + "</td>"
                    + "<td class='Date'>" + ConvertDateFormat(GetDateWithFormatMDY(item.Date)) + "</td>"

                    + "<td class='ClientName text-overflow-150' title='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
                   // + "<td class='DebitCreditNotes_NO text-overflow-150 hide' title='" + item.DebitCreditNotes_NO + "'>" + item.DebitCreditNotes_NO + "</td>"
                    //+ "<td class='InvoiceType text-overflow-150' title='" + item.InvoiceType + "'>" + item.InvoiceType + "</td>"
                   + "<td class='InvoiceTotal align-right' style=''>" + item.CurrencyCode + " " + item.InvoiceTotal + "</td>"
                    + "<td class='ExchangeRate'>" + item.ExchangeRate + "</td>"
                    + "<td class='PaidAmount'>" + item.PaidAmount + "</td>"
                    + "<td class='RemainAmount'>" + item.RemainingAmount + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'  disabled='disabled' type='text'  size='16' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='AmountOnly' hidden >" + 0 + "</td>"
                    + "<td class='AmountTextCurrency' hidden >" + item.CurrencyCode + "</td>"
                    + "<td class='Choose'> <input id='txtChoose" + item.ID + "' type='checkbox' name='Delete' class='input_Choose'   onchange='SelectRowInTable(" + i + ");'/></td>"
                    + "</tr>"));

        //    if ($("#slCurrency").val() != "-1" && $("#slCurrency").val() != 0 && $("#slCurrency").val() != null) {
        //$($('#tblInvoices tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
        //    }


    });
    setTimeout(function () {
        FillItemsData();
    }, 300);
}
function PaymentsA_Voucherpayable_BindTableRows(pInvoices) {
    ClearAllTableRows("tblA_Voucher");
    $("#txtTotalVoucherPaid").val("");
    $('#lblTotalAllocationVoucher').html('');

    TotalCost = 0;

    $.each(pInvoices, function (i, item) {
        debugger;
        AppendRowtoTable("tblA_Voucher",
        ("<tr ID='" + item.ID + "' class='" + ((item.IsDeleted == true) ? "deleted-row" : "") + "'>"
                    + "<td class='ID' hidden>" + item.ID + "</td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='VoucherDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate)) + "</td>"
                    + "<td class='ChequeNo text-overflow-150' title='" + item.ChequeNo + "'>" + item.ChequeNo + "</td>"
                    + "<td class='VoucherType text-overflow-150' title='" + item.VoucherType + "'>" + item.VoucherType + "</td>"
                    + "<td class='Total align-right' style=''>" + item.CurrencyCode + " " + item.Total + "</td>"
                    + "<td class='PaidAmount align-right' style=''>" + item.PaidAmount + "</td>"
                    + "<td class='CurrencyID hide' style=''>" + item.CurrencyID + "</td>"
                  //  + "<td class='ExchangeRate' style=''>" + item.ExchangeRate + "</td>"

                    + "<td class='Rmaining'>" + item.Rmaining + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'  disabled='disabled' type='text' size='7' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='AmountOnly' hidden >" + item.Qty + "</td>"
                    + "<td class='AmountTextCurrency' hidden >" + item.CurrencyCode + "</td>"
                    + "<td class='Choose'> <input id='txtChoose" + item.ID + "' type='checkbox' name='Delete' class='input_Choose'   onchange='SelectRowInVoucher(" + i + ");'/></td>"
                    + "</tr>"));
        // if ($("#slCurrency").val() != "-1" && $("#slCurrency").val() != 0 && $("#slCurrency").val() != null) {
       // $($('#tblA_Voucher tbody tr')[i]).find('#txtChoose').removeAttr("disabled");
        //  }
    });
    setTimeout(function () {
        FillItemsData();
    }, 300);
    debugger;
    //if (CurrencyID == "" && pCurrencyIDNew == 0) {
    //    Currency_GetList(null, "null");
    //} else {
    //    CurrencyID = "";
    //}
    BindAllCheckboxonTable("tblA_Voucher", "ID");
    CheckAllCheckbox("ID");
    FadePageCover(false);
}
var TotalPaid = 0;
var TotalVoucherPaid = 0;
var TotalCost = 0;
function CalculateAll() {
    debugger
    var discount
    TotalPaid = 0;
   

    var result = [];
    var Currency;

    $('#lblTotalAllocationVoucher').html();
    $('#lblTotalAllocation').html('');

    Currency = $("#slCurrency option:selected").text();
    if ($.inArray(Currency, result) == -1)
        result.push(Currency);

   // $('#tblInvoices  > tbody > tr').each(function (i, tr) {
    //$('#tblInvoices'  + ' td').find('input[name="Delete"]:checked').each(function (i, tr) {
    //    if ($($('#tblInvoices tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
    //        Currency = $(tr).find('td.AmountTextCurrency').text();
    //        if ($.inArray(Currency, result) == -1)
    //            result.push(Currency);
    //    }
    //});

    for (var j = 0; j < result.length; j++) {
        var Total = 0;
      $('#tblInvoices  > tbody > tr').each(function (i, tr) {
            if ($($('#tblInvoices tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {

                if ($(tr).find('td.Qty').find('.input_quantity').val() != 0 && result[j] == $(tr).find('td.AmountTextCurrency').text()) {
                    var Cost = $(tr).find('td.Qty').find('.input_quantity').val();
                    Total += parseFloat(Cost);  // .replace(/\b0+/g, "")
                }

                if (parseFloat($(tr).find('td.Qty').find('.input_quantity').val()) > parseFloat($(tr).find('td.RemainAmount').text())) {
                    swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
                    $(tr).find('td.Qty').find('.input_quantity').val("0")

                }
                TotalPaid += parseFloat($(tr).find('td.Qty').find('.input_quantity').val()) * parseFloat($(tr).find('td.ExchangeRate').text());

            }
        });
        $('#lblTotalAllocation').append(result[j] + ": ");
        $('#lblTotalAllocation').append(Total.toFixed(2));
        $('#lblTotalAllocation').append(' ');
    }

    //$($('#tblInvoices > tbody > tr')).each(function (i, tr) {
    //        debugger;
    //        if (parseFloat($(tr).find('td.Qty').find('.input_quantity').val()) > parseFloat($(tr).find('td.RemainAmount').text())) {
    //            swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
    //            $(tr).find('td.Qty').find('.input_quantity').val("0")

    //        }
    //        TotalPaid +=  parseFloat($(tr).find('td.Qty').find('.input_quantity').val()) *  parseFloat( $(tr).find('td.ExchangeRate').text() );
    //    }
    //});

    //if(result.length > 0 && $('#txtInvoiceExchangeRate').val() != '' )
    //{
    //    TotalPaid = TotalPaid * $('#txtInvoiceExchangeRate').val() ;
    //}

    $("#txtTotalPaid").val(TotalPaid.toFixed(2));
   
    // ---------------------------------------------------lblTotalAllocationVoucher-------------------------------------------------------

    TotalVoucherPaid = 0;


    var result2 = [];
    var Currency2;

    $('#lblTotalAllocationVoucher').html('');

    $('#tblA_Voucher' + ' td').find('input[name="Delete"]:checked').each(function () {
        Currency2 = $(this).closest('tr').find('td.AmountTextCurrency').text(); //$(tr).find('td.AmountTextCurrency').text();
                if ($.inArray(Currency2, result2) == -1)
                    result2.push(Currency2);
    });
    //$('#tblA_Voucher  > tbody > tr').each(function (i, tr) {
    //    if ($($('#tblA_Voucher tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
    //        Currency2 = $(tr).find('td.AmountTextCurrency').text();
    //        if ($.inArray(Currency2, result2) == -1)
    //            result2.push(Currency2);
    //    }
    //});

    for (var j = 0; j < result2.length; j++) {
        var Total = 0;
        $('#tblA_Voucher  > tbody > tr').each(function (i, tr) {

            if ($($('#tblA_Voucher tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
                if ($(tr).find('td.Qty').find('.input_quantity').val() != 0 && result2[j] == $(tr).find('td.AmountTextCurrency').text()) {
                    var Cost = $(tr).find('td.Qty').find('.input_quantity').val();
                    Total += parseFloat(Cost);  // .replace(/\b0+/g, "")
                }


            }
        });
        $('#lblTotalAllocationVoucher').append(result2[j] + ": ");
        $('#lblTotalAllocationVoucher').append(Total.toFixed(2));
        $('#lblTotalAllocationVoucher').append(' ');
    }

    $($('#tblA_Voucher > tbody > tr')).each(function (i, tr) {
        if ($($('#tblA_Voucher tbody tr')[i]).find('#txtChoose' + $(tr).find('td.ID').text()).is(":checked")) {
            debugger;
            if ($(tr).find('td.Qty').find('.input_quantity').val() > parseFloat($(tr).find('td.Rmaining').text())) {
                swal('Excuse me', 'Amount Must Less Than Or Equal Remain Amount ', 'warning');
                $(tr).find('td.Qty').find('.input_quantity').val("0")

            }

            TotalVoucherPaid +=  parseFloat($(tr).find('td.Qty').find('.input_quantity').val()); //$(tr).find('td.ExchangeRate').text() ;

        }
    });

    if(result2.length > 0 && $('#txtVoucherExchangeRate').val() != '' )
    {
        TotalVoucherPaid = TotalVoucherPaid * parseFloat( $('#txtVoucherExchangeRate').val() );
    }
    
    $("#txtTotalVoucherPaid").val(TotalVoucherPaid);

    //$('#txtTotalDiff').val(TotalPaid-TotalVoucherPaid
    //    - ($('#txtCurrencyProfit').val() == '' ? 0 : parseFloat($('#txtCurrencyProfit').val()))
    //    + ($('#txtCurrencyLoss').val() == '' ? 0 : parseFloat($('#txtCurrencyLoss').val())));

    $('#txtTotalDiff').val((TotalPaid.toFixed(2) - TotalVoucherPaid.toFixed(2) 
        - ($('#txtCurrencyProfit').val() == '' ? 0 : parseFloat($('#txtCurrencyProfit').val()))
        + ($('#txtCurrencyLoss').val() == '' ? 0 : parseFloat($('#txtCurrencyLoss').val()))).toFixed(2));


}
function Allocation_LoadingWithPaging() {
    debugger;
    var pWhereClause = AllocationInvoice_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    //var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageNumber = 1;
    var strLoadWithPagingFunctionName = "/api/A_APAllocationWithVoucher/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { A_APAllocationWithVoucher_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPayments>tbody>tr", $("#txt-Search").val().trim());
}
function AllocationInvoice_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code ='" + $("#txt-Search").val().trim() + "'"

                                                          + " OR PartnerName LIKE N'%" + $("#txt-Search").val().trim() + "%' "));
}

function JournalVoucher_Print(pJVID) {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pID = pJVID

    var pParametersWithValues = {
        pJournalVoucherIDForPrinting: pID
    };
    FadePageCover(true);
    //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1)
    CallGETFunctionWithParameters("/api/JournalVouchers/GetJournalVoucherDataForPrinting", pParametersWithValues
        , function (pData) {
            if (pData[0]) {


                var pJVHeader = JSON.parse(pData[1]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);

                var result = [];
                var Currency;
                // fill currency codes --------------
                $.each(pJVItems, function (i, item) {
                    Currency = item.Code;
                    if ($.inArray(Currency, result) == -1)
                        result.push(Currency);
                });

                var ReportHTMLCurrenyTotal = "";
                ReportHTMLCurrenyTotal += '     <br>';
                ReportHTMLCurrenyTotal += '     <body>';

                ReportHTMLCurrenyTotal += '         <table id="tblPrintJVCurrencyTotal" style="max-width:300px;" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTMLCurrenyTotal += '             <thead>';
                ReportHTMLCurrenyTotal += '                 <tr>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTMLCurrenyTotal += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTMLCurrenyTotal += '                 </tr>';
                ReportHTMLCurrenyTotal += '             </thead>';
                ReportHTMLCurrenyTotal += '             <tbody>';

                for (var j = 0; j < result.length ; j++) {
                    var TotalDebit = 0;
                    var TotalCredit = 0;
                    $.each(pJVItems, function (i, item) {
                        if (result[j] == item.Code) {
                            var Debit = item.Debit;
                            var Credit = item.Credit;
                            TotalDebit += parseFloat(Debit);  // .replace(/\b0+/g, "")
                            TotalCredit += parseFloat(Credit);  // .replace(/\b0+/g, "")
                        }
                    });

                    ReportHTMLCurrenyTotal += '                 <tr style="font-size:95%;">';
                    ReportHTMLCurrenyTotal += '                     <td class="text-center">' + result[j] + '</td>';
                    ReportHTMLCurrenyTotal += '                     <td class="text-center">' + TotalDebit.toFixed(2) + '</td>';
                    ReportHTMLCurrenyTotal += '                     <td class="text-center">' + TotalCredit.toFixed(2) + '</td>';
                    ReportHTMLCurrenyTotal += '                 </tr>';

                }
                ReportHTMLCurrenyTotal += '             </tbody>';
                ReportHTMLCurrenyTotal += '         </table>';
                ReportHTMLCurrenyTotal += '     </body>';

                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';
                }
                else {
                    ReportHTML += '<html dir="rtl">';
                }
                ReportHTML += '     <head><title>' + TranslateString("PrintJV") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                if (pDefaults.UnEditableCompanyName == 'ELC' || pDefaults.UnEditableCompanyName == 'KDI') {
                    ReportHTML += '     <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="header"/></div>';
                    ReportHTML += '     <div class="row text-center"><br></div>';
                }
                else
                    ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';

                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + TranslateString("JournalVouchers") + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pJVHeader.JVNo + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     </ br>';

                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JvNo") + '        : ' + pJVHeader.JVNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("UserName") + '    : ' + pJVHeader.UserName + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVDate") + '     : ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pJVHeader.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pJVHeader.JVDate))) + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JournalType") + ' : ' + pJVHeader.Journal_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("JVType") + '      : ' + pJVHeader.JVType_Name + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-6 m-l-n ">' + '<b><span class="float-left">' + TranslateString("ReceiptNo") + '   : ' + pJVHeader.ReceiptNo + '</span></b></div>';
                ReportHTML += '     <div class="col-xs-12 m-l-n ">' + '<b><span class="float-left">' + TranslateString("Notes") + '       : ' + (pJVHeader.RemarksHeader == 0 ? "" : pJVHeader.RemarksHeader) + '</span></b></div>';

                //ReportHTML += '     <body style="background-color:white;">';
                ReportHTML += '     <br>';
                ReportHTML += '     <body>';

                ReportHTML += '         <table id="tblPrintJVItems" class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                ReportHTML += '             <thead>';
                ReportHTML += '                 <tr>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                ReportHTML += '                     <th class="text-center">' + TranslateString("Documented") + '</th>';
                ReportHTML += '                 </tr>';
                ReportHTML += '             </thead>';
                ReportHTML += '             <tbody>';
                var Counter = 0;
                $.each(pJVItems, function (i, item) {
                    debugger;
                    ReportHTML += '                 <tr style="font-size:95%;">';
                    ReportHTML += '                     <td class="text-center">' + (item.AccountName == 0 ? '' : item.AccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.subAccountName == 0 ? '' : item.subAccountName) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.CostCenter == 0 ? "" : item.CostCenter) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Debit == 0 ? "" : item.Debit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Credit == 0 ? "" : item.Credit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.Code + '</td>';
                    ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';
                    ReportHTML += '                     <td class="text-center">' + '<input  disabled="disabled" type="checkbox" ' + (item.isDocumented == true ? "checked" : "") + '></td>';

                    ReportHTML += '                 </tr>';
                });
                ReportHTML += '             </tbody>';
                ReportHTML += '         </table>';
                ReportHTML += '     </body>';


                ReportHTML += '<div class="col-xs-6  text-right">' + '<b>  ' + TranslateString("Total") + ' : </b>' + pJVHeader.TotalDebit + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
                ReportHTML += '<div class="col-xs-6 text-left" style=" padding-bottom: 10px;">' + toWords(pJVHeader.TotalDebit) + '</div>';
                //if ($("#cbPrintLogo").prop("checked")) {
                //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //    ReportHTML += '     </footer>';
                //}

                ReportHTML += ReportHTMLCurrenyTotal;


                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;  padding-top: 10px;">';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + '</br> </br>' + (pJVHeader.UserName != 0 ? pJVHeader.UserName : '') + '</div></b></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
                ReportHTML += '                 <div class="col-xs-4  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
                ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + FormattedTodaysDate + '</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';



                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    swal("Sorry", "Connection failed. Please try again.");
                }
                else {
                    swal("معذرة", "فشل الإتصال، حاول مرة أخري.");
                }
            }
            FadePageCover(false);
        }
        , null);
}
function PrintAll(pJVID) {
    //////////////Journal Voucher
    debugger;
    if (pJVID != "" || pJVID != "0") {
        var arr_Keys = new Array();
        var arr_Vlaues = new Array();
        arr_Keys.push("ID");
        arr_Vlaues.push(pJVID);

        var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Vlaues: arr_Vlaues
               , pTitle: "Journal Vouchers"
                , pReportName: "Rep_JVPrint"
            };
        var win = window.open("", "_blank");
        //var url = '/ReportMainClass/PrintBySingleID?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

        var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;
    }

    ////////////////////

}