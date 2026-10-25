

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00000;
var _TotalItemsTax = 0.00000;

var _TotalExpenses = 0.00000;
var _TotalTaxes = 0.00000;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

//**************************************
var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val();
    CheckIfAllLoading();

    $('#txtEntitlementDays').inputmask('decimal', { digits: 0 });
    
});


function IntializePage() {
    FadePageCover(true);

    var WhereClause = " Where ISNULL(vwPS_Invoices.IsDeleted , 0) = 0";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Invoices/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Invoices_BindTableRows(pTabelRows); });
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- ALL Supplier -->', '#slSupplier_Filter', '');
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Supplier -->', '#slSupplierID', '');
            //-------
            Fill_SelectInputAfterLoadData(d[1], 'ID', 'Code', '<-- ALL CURRENCIES -->', '#slCurrency_Filter', '');
            Fill_SelectInputAfterLoadData_WithAttr(d[1], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            //-------
            Fill_SelectInputAfterLoadData_WithAttr(d[2], 'ID', 'Name', null, '#slPaymentMethodID', '', 'Name');
            //------
            Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- SELECT STORE -->', '#slStores', '');
            //------
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'CostCenterName', '<-- SELECT CostCenter  -->', '#slCostCenter_ID', '');
            //------
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[5], 'ID', 'Name', '<----------- ITEMS ---------->', '#hidden_slItems', '', 'Price,ItemUnits');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[6], 'ID', 'Name', '<-- SELECT TAXES  -->', '#hidden_slTaxes', '', 'CurrentPercentage,IsDebitAccount');
            Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<---------- SERVICES -------->', '#hidden_slServices', '');
            Fill_SelectInputAfterLoadData(d[8], 'ID', 'Name', '<-- SELECT EXPENSES  -->', '#hidden_slExpenses', '');
            Fill_SelectInputAfterLoadData(d[12], 'ID', 'BarCode', '<-- SELECT BarCode  -->', '#hidden_BarCode', '');


            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            //*******
            Fill_SelectInputAfterLoadData_WithAttr(d[10], 'ID', 'Name', null, '#slPaymentTermID', '', 'Name');

            Fill_SelectInputAfterLoadData_WithAttr(d[11], 'ID', 'Name', null, '#slBranches', '', 'Name');



            $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());

            //$("#txtInvoiceDate").datepicker({
            //    onSelect: function (dateText) {
            //         console.log("Selected date: " + dateText + "; input's current value: " + this.value);

            //    }
            //});


            $("#txtInvoiceDate").datepicker().on('changeDate'
                , function () {
                    $(this).datepicker('hide');
                    RecalculateExchangeRate();

                });
            $("#txtInvoiceDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });





            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}



function CheckIfAllLoading() {
    if (typeof $('#slSupplierID option') === "undefined" || $('#slSupplierID option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}



//#region Public
function PS_HideShowEditBtns(IsApproved, HasTransactions) {
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;


    SetHideShowForCheckedCB_Related();
    

    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
        $('#txtDate').prop('disabled', false);
        $('#slTransaction').prop('disabled', false);
        $('#slPurchasingOrder').prop('disabled', false);
        $('#slSupplyOrder').prop('disabled', false);
        $('#btnGetItems').removeClass('hide');
        $("#cbIsFromTrans").prop('disabled', false);
        $("#cbIsFromManual").prop('disabled', false);
        $("#cbIsFromPurchasingOrder").prop('disabled', false);
        $("#cbIsFromSupplyOrder").prop('disabled', false);
        $('#slPaymentMethodID').val("50");


        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', false);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', false);
        SetHideShowForCheckedCB_Related();

    }
    else // is [ Update ]
    {
        // $('#txtDate').prop('disabled', true);
        $('#txtDate').prop('disabled', true);
        $('#slTransaction').prop('disabled', true);
        $('#slPurchasingOrder').prop('disabled', true);
        $('#slSupplyOrder').prop('disabled', true);
        $('#btnGetItems').addClass('hide');

        $("#cbIsFromTrans").prop('disabled', true);
        $("#cbIsFromManual").prop('disabled', true);
        $("#cbIsFromPurchasingOrder").prop('disabled', true);
        $("#cbIsFromSupplyOrder").prop('disabled', true);






        if ($("#hf_CanEdit").val() != 1 || $('#htxtIsApproved').val() == 'true' || $('#htxtHasTransactions').val() == 'true') {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
            $("#tblExpenses").find("input,button,textarea,select").prop('disabled', true);
            $("#tblTaxes").find("input,button,textarea,select").prop('disabled', true);
        }
        else {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
            $("#tblExpenses").find("input,button,textarea,select").prop('disabled', false);
            $("#tblTaxes").find("input,button,textarea,select").prop('disabled', false);
        }
    }
    SetHideShowForCheckedCB_Related();
    $('.selectunit').prop('disabled', true);
    $('.inputtaxvalue').prop('disabled', true);
    $('.inputtaxamount ').prop('disabled', true);
    // $('.inputtaxamount ').prop('disabled', true);


}


function SetHideShowForCheckedCB_Related() {

    
    if ($("#cbIsFromTrans").is(":checked")) {
        $("#tblItems").find("input,button,textarea,select").not('.input_unitprice,.selectservice').prop('disabled', true);
        $(".C_IsManual").addClass("hide");
        $(".C_IsFromPurchasingOrder").addClass("hide");
        $(".C_IsFromSupplyOrder").addClass("hide");
        $(".C_IsFromTrans").removeClass("hide");
        $('#slPurchasingOrder').val("0");
        $('#slSupplyOrder').val("0");
        $('#slSupplierID').val($('#slTransaction option:selected').attr('SupplierID'));
        if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") {
            $('#txtInvoiceDate').val(GetDateFromServer($('#slTransaction').find('option:selected').attr('TransactionDate')));
        }
        $('#slSupplierID').prop('disabled', true);
        $('#slCurrencyID').prop('disabled', false);
        $('#slPaymentTermID').prop('disabled', false);
    }
    else if ($("#cbIsFromPurchasingOrder").is(":checked"))
    {
        $("#tblItems").find("input,button,textarea,select").not('.selectstore,.input_discount,.inputnotes,.selectservice').prop('disabled', true);
        $(".C_IsManual").addClass("hide");
        $(".C_IsFromTrans").addClass("hide");
        $(".C_IsFromSupplyOrder").addClass("hide");
        $(".C_IsFromPurchasingOrder").removeClass("hide");

        $('#slSupplyOrder').val("0");
        $('#slTransaction').val("0");
        $('#slSupplierID').val($('#slPurchasingOrder option:selected').attr('SupplierID'));
        $('#slCurrencyID').val($('#slPurchasingOrder option:selected').attr('CurrencyID'));


        if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") {
            $('#txtInvoiceDate').val(GetDateFromServer($('#slPurchasingOrder').find('option:selected').attr('PurchasingOrderDate')));
        }
        $('#slSupplierID').prop('disabled', true);
        $('#slCurrencyID').prop('disabled', true);
        $('#slPaymentTermID').prop('disabled', false);
    }
    else if ($("#cbIsFromSupplyOrder").is(":checked")) {
        $("#tblItems").find("input,button,textarea,select").not('.selectstore,.input_discount,.inputnotes,.selectservice').prop('disabled', true);
        $(".C_IsManual").addClass("hide");
        $(".C_IsFromTrans").addClass("hide");
        $(".C_IsFromSupplyOrder").removeClass("hide");
        $(".C_IsFromPurchasingOrder").addClass("hide");

        $('#slPurchasingOrder').val("0");
        $('#slTransaction').val("0");
        $('#slSupplierID').val($('#slSupplyOrder option:selected').attr('SupplierID'));
        $('#slCurrencyID').val($('#slSupplyOrder option:selected').attr('CurrencyID'));
        $('#slPaymentTermID').val($('#slSupplyOrder option:selected').attr('PaymentTermID'));

        if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") {
            $('#txtInvoiceDate').val(GetDateFromServer($('#slSupplyOrder').find('option:selected').attr('PurchasingSupplyDate')));
        }
        $('#slSupplierID').prop('disabled', true);
        $('#slCurrencyID').prop('disabled', true);
        $('#slPaymentTermID').prop('disabled', true);
    }
    else {
        $(".C_IsManual").removeClass("hide");
        $(".C_IsFromTrans").addClass("hide");
        $(".C_IsFromPurchasingOrder").addClass("hide");

        $('#slTransaction').val("0");
        $('#slPurchasingOrder').val("0");
        $('#slSupplierID').prop('disabled', false);
        $('#slCurrencyID').prop('disabled', false);
        $('#slPaymentTermID').prop('disabled', false);
    }


}




function RecalculateExchangeRate() {
    var currencyid = $('#slCurrencyID').val();
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "") {
        $('#hID').val("0")

    }


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
            // Fill_SelectInputAfterLoadData(d[1] , 'ID' , 'Code' , 'Select Good Receipt Note' , '#slTransaction', $('#hID').val());
            CalculateAll();
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}

function IntializeData(callback) {
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    _IsApproved = false;
    //console.log("hid " + );
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "") {
        $('#hID').val("0");
    }


    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
    // $("#hID").val("");
    $('#txtInvoiceNo').val("Auto");
    $('#slSupplierID').val("0");
    $('#txtDiscount').val("0");
    $('#slDiscountType').val('10');
    $('#cbDiscountBeforeTax').prop('checked', false);
    $('#lblDiscountValue').text("0.00000");
    $('#lblDiscountPercentage').text("0.00000");
    $('#lblNetPriceValue').text("0.00000");
    $('#lblPriceValue').text("0.00000");
    $('#lblLocalPriceValue').text("0.00000");
    $('#lblTotalItems').text("0.00000");
    $('#lblTotalExpenses').text("0.00000");
    $('#lblTotalTaxes').text("0.00000");
    $('#txtDiscount').inputmask('decimal', { digits: 5 });
    $('#txtDiscount').val('0');
    $('#slBranches').val(pLoggedUser.BranchID);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Code', 'Select Good Receipt Note', '#slTransaction', $('#hID').val(), 'SupplierID,TransactionDate,Notes');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[2], 'ID', 'PurchasingOrderNo', 'Select Purchasing Order ', '#slPurchasingOrder', $('#hID').val(), 'SupplierID,PurchasingOrderDate,Notes,CurrencyID');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[3], 'ID', 'PurchasingSupplyNo', 'Select Supply Order ', '#slSupplyOrder', $('#hID').val(), 'SupplierID,PurchasingSupplyDate,Notes,CurrencyID,PaymentTermID');


            FadePageCover(false);


            if (typeof callback !== "undefined") {
                callback();

            }


        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}
function ClearApprovedIsHasTransactions() {
    //_IsApproved = false;
    //_HasTransactions = false;
    $('#htxtIsApproved').val('false');
    $('#htxtHasTransactions').val('false');
    PS_HideShowEditBtns(false);
}
function PS_Invoices_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PS_InvoicesModal", null);
    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");
    $('#hID').val("0");
    $("#btnSave").attr("onclick", "PS_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_Invoices_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
    $('#slPaymentMethodID').val("50");
    //_IsApproved = false;
    //_HasTransactions = false;
    _JVID = 0;


    var IsStartManual = IsNull($('#hReadySlOptions option[value="2030"]').attr("OptionValue"), "false");
    if (IsStartManual == "true")
        $("#cbIsFromTrans").prop("checked", false);
    else
        $("#cbIsFromTrans").prop("checked", true);


    IntializeData(function () { /*PS_HideShowEditBtns(false);*/ });

}
function LoadInvoiceDetails(TypeName) {
    debugger;

    if (TypeName == "cbIsFromTrans")
    {
        $('#txtNotes').val($('#slTransaction option:selected').attr('Notes'));
        LoadAll("/api/PS_Invoices/LoadDetails", "where '**LoadItemsFromTrans**'='**LoadItemsFromTrans**' and  TransactionID = " + $('#slTransaction').val(), function (pTabelRows) {
            PS_InvoicesDetails_BindTableRows(pTabelRows[0]);
            // PS_InvoicesExpenses_BindTableRows(pTabelRows[1]);
            //  PS_InvoicesTaxes_BindTableRows(pTabelRows[2]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
                }, 300);
                setTimeout(function () {
                    CalculateAll();

                }, 1000);
            }, 1500);
            //setTimeout(function ()
            //{
            //    CalculateAll();
            //    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
            //}, 300);

        });
    }
    else if (TypeName == "cbIsFromPurchasingOrder") {
        $('#txtNotes').val($('#slPurchasingOrder option:selected').attr('Notes'));
        LoadAll("/api/PS_Invoices/LoadDetails", "where '**LoadItemsFromPurchasingOrder**'='**LoadItemsFromPurchasingOrder**' and  PS_PurchasingOrdersID = " + $('#slPurchasingOrder').val(), function (pTabelRows) {
            PS_InvoicesDetails_BindTableRows(pTabelRows[0]);
            // PS_InvoicesExpenses_BindTableRows(pTabelRows[1]);
            //  PS_InvoicesTaxes_BindTableRows(pTabelRows[2]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
                }, 300);
                setTimeout(function () {
                    CalculateAll();

                }, 1000);
            }, 1500);
            //setTimeout(function ()
            //{
            //    CalculateAll();
            //    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
            //}, 300);

        });
    }
    else if (TypeName == "cbIsFromSupplyOrder") {
        $('#txtNotes').val($('#slSupplyOrder option:selected').attr('Notes'));
        LoadAll("/api/PS_Invoices/LoadDetails", "where '**LoadItemsFromSupplyOrder**'='**LoadItemsFromSupplyOrder**' and  PS_SupplyOrdersID = " + $('#slSupplyOrder').val(), function (pTabelRows) {
            PS_InvoicesDetails_BindTableRows(pTabelRows[0]);
            // PS_InvoicesExpenses_BindTableRows(pTabelRows[1]);
            //  PS_InvoicesTaxes_BindTableRows(pTabelRows[2]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
                }, 300);
                setTimeout(function () {
                    CalculateAll();

                }, 1000);
            }, 1500);
            //setTimeout(function ()
            //{
            //    CalculateAll();
            //    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
            //}, 300);

        });
    }
    else {
        LoadAll("/api/PS_Invoices/LoadDetails", "where ID = " + $('#hID').val(), function (pTabelRows) {
            PS_InvoicesDetails_BindTableRows(pTabelRows[0]);
            PS_InvoicesExpenses_BindTableRows(pTabelRows[1]);
            PS_InvoicesTaxes_BindTableRows(pTabelRows[2]);
            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved, _HasTransactions);
                }, 300);
                setTimeout(function () {
                    CalculateAll();

                }, 1000);
            }, 1500);

        });
    }

}


function PrintInvoice(InvID) {

    FadePageCover(true)


    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_Reports/LoadInvoiceDetails", "where ID = " + InvID, function (data) {
        var pReportTitle = "Invoice - فــــاتورة";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        var _Expenses = JSON.parse(data[1]);
        var _Taxes = JSON.parse(data[2]);
        var _Default = JSON.parse(data[3]);
        console.log(_Details);
        console.log(_Expenses);
        console.log(_Taxes);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var TotalExpenses = 0.00;
        var TotalTaxes = 0.00;
        var _InvCode = "";
        var _SupplierInvNo = ""
        var _InvDate = "";
        var _InvSupplier = "";
        var _InvNotes = "";
        var _InvDiscount = "";
        var _InvCurrency = "";
        var _InvTotal = 0;

        var _PurchasingOrder = "";
        var _SupplyOrder = "";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '"> ' + (lang == "ar" ? "سعر الوحدة" : "Unit Price") + '</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "القيمة" : "Amount") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") + '</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item) {
            var name = '';
            TotalAmount = parseFloat(TotalAmount + item.D_Total);
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.D_Price).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Total).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.InvoiceDate);
                _InvCode = item.InvoiceNo;
                _PurchasingOrder = item.PurchasingOrderInfo;
                _SupplyOrder = item.PurchasingSupplyInfo;
                _InvSupplier = item.SupplierName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _SupplierInvNo = item.SupplierInvoiceNo;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") + ' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        if ($(_Expenses).length > 0) {
            pTablesHTML += '<div class="row">';
            pTablesHTML += '<div class="col-xs-12">';
            pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
            pTablesHTML += '<caption><b>' + (lang == "ar" ? " المصاريف " : " Expenses ") + '</b></caption>';
            pTablesHTML += '<thead>';
            pTablesHTML += '<th>' + (lang == "ar" ? " البند " : " Item ") + '</th>';
            pTablesHTML += '<th>' + (lang == "ar" ? " القيمة " : " Amount ") + '</th>';
            pTablesHTML += '</thead>';
            pTablesHTML += '<tbody>';
            //hExportedTable
            $(_Expenses).each(function (i, item) {
                TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount);
                pTablesHTML += '<tr>';
                pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
                pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
                pTablesHTML += '</tr>';

                if ($(_Expenses).length - 1 == i) {
                    _InvDate = GetDateFromServer(item.InvoiceDate);
                    _InvCode = item.InvoiceNo;
                    _InvSupplier = item.SupplierName;
                    _InvNotes = item.Notes;
                    _InvCurrency = item.CurrencyCode;
                    _InvTotal = item.TotalPrice;
                    _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )";
                    _SupplierInvNo = item.SupplierInvoiceNo;
                    pTablesHTML += '<tr>';
                    pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " قيمة المصروفات " : " Expenses Amount ") + ' : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                    pTablesHTML += '</tr>';
                }
            });
            pTablesHTML += '</tbody></table>';
            pTablesHTML += '</div></div>';
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        if ($(_Taxes).length > 0) {
            pTablesHTML += '<div class="row">';
            pTablesHTML += '<div class="col-xs-12">';
            pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
            pTablesHTML += '<caption><b>' + (lang == "ar" ? " الضرائب " : " Taxes ") + '</b></caption>';
            pTablesHTML += '<thead>';
            pTablesHTML += '<th>' + (lang == "ar" ? " الضريبة " : " Tax ") + '</th>';
            pTablesHTML += '<th>' + (lang == "ar" ? " القيمة " : " Amount ") + '</th>';
            pTablesHTML += '</thead>';
            pTablesHTML += '<tbody>';
            //hExportedTable
            $(_Taxes).each(function (i, item) {
                TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
                pTablesHTML += '<tr>';
                pTablesHTML += '<td>' + item.Name + '</td>';
                pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
                pTablesHTML += '</tr>';

                //if ($(_Taxes).length - 1 == i) {
                //    pTablesHTML += '<tr>';
                //    pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">Taxes : ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                //    pTablesHTML += '</tr>';
                //}



            });
            pTablesHTML += '</tbody></table>';
            pTablesHTML += '</div>';
            pTablesHTML += '</div>';
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


        //************** TOTAL Summary *************************
        pTablesHTML += '<div class="row" >';
        pTablesHTML += '<div class="col-xs-8"><b>';
        pTablesHTML += (IsNull(_Default.PurchaseInvoicesComments, "0") == "0" ? "" : _Default.PurchaseInvoicesComments) + "<br>";
        pTablesHTML += (_InvNotes == "0" ? "" : _InvNotes)
        pTablesHTML += '</b></div>';
        pTablesHTML += '<div class="col-xs-4 "  >';
        pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
        if (parseFloat(_InvDiscount) > 0)
            pTablesHTML += '<b> ' + (lang == "ar" ? " الخصم " : " Discount ") + ' : ' + _InvDiscount + '</b><br>';
        pTablesHTML += '<b> ' + (lang == "ar" ? " المجموع " : " Total ") + ' : ' + _InvTotal.toFixed(2) + ' ' + _InvCurrency + '</b><br>';
        pTablesHTML += " <b style='text-decoration: underline overline;'>" + (lang == "ar" ? "  " : toWords_WithFractionNumbers(_InvTotal.toFixed(2)) + " " + _InvCurrency) + "</b>";
        pTablesHTML += "</div>";

        pTablesHTML += '</div>';
        pTablesHTML += '</div>';

        //**************** Footer *******************************
        //pTablesHTML += '<div class="row">';
        //pTablesHTML += '<div class="col-xs-6">';
        //pTablesHTML += '<hr><table id="tblfooter" style="" class="table table-striped text-sm table-bordered" >';
        ////pTablesHTML += '<thead>';
        ////pTablesHTML += '<th></th>';
        ////pTablesHTML += '<th></th>';
        ////pTablesHTML += '</thead>';
        //pTablesHTML += '<tbody>';

        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td colspan="2">' + 'Bank Details' + '</td>';
        //pTablesHTML += '</tr>';



        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Bank Name' + '</td>';
        //pTablesHTML += '<td>' + _Default.BankName + '</td>';
        //pTablesHTML += '</tr>';
        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Branch' + '</td>';
        //pTablesHTML += '<td>' + _Default.BankAddress + '</td>';
        //pTablesHTML += '</tr>'

        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Account Name' + '</td>';
        //pTablesHTML += '<td>' + _Default.AccountName + '</td>';
        //pTablesHTML += '</tr>';


        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Account Number' + '</td>';
        //pTablesHTML += '<td>' + _Default.AccountNumber + '</td>';
        //pTablesHTML += '</tr>';




        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Swift Code' + '</td>';
        //pTablesHTML += '<td>' + _Default.SwiftCode + '</td>';
        //pTablesHTML += '</tr>';

        //pTablesHTML += '</tbody></table></div></div>';
        //pTablesHTML += '<div class="row">';
        //pTablesHTML += '<div class="col-xs-6">';
        //pTablesHTML += '<table id="tblfooter1" style="" class="table table-striped text-sm table-bordered" >';
        ////pTablesHTML += '<thead>';
        ////pTablesHTML += '<th></th>';
        ////pTablesHTML += '<th></th>';
        ////pTablesHTML += '</thead>';
        //pTablesHTML += '<tbody>';
        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'VAT ID Number' + '</td>';
        //pTablesHTML += '<td>' + _Default.VatIDNo + '</td>';
        //pTablesHTML += '</tr>';



        //pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + 'Commerical Reg No' + '</td>';
        //pTablesHTML += '<td>' + _Default.CommericalRegNo + '</td>';
        //pTablesHTML += '</tr>';
        //pTablesHTML += '</tbody></table>';
        //pTablesHTML += '</div>';
        //pTablesHTML += '</div>';
        //*******************************************************

        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems) {
            $('.ForItems').addClass('hide');

        }



        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html ' + (lang == "ar" ? 'dir="rtl"' : '') + '>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';
        ReportHTML += '                 <div class="col-xs-6"><b>' + (lang == "ar" ? " المورد " : " Supplier ") + ' : </b> ' + _InvSupplier + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? " رقم الفاتورة " : " Invoice No ") + ' : </b> ' + _InvCode + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? " أمر الشراء " : " Purchasing Order ") + ' : </b> ' + _PurchasingOrder + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? " أمر توريد " : " Supply Order ") + ' : </b> ' + _SupplyOrder + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم فاتورة المورد" : " Supplier Invoice No ") + ' </b> ' + _SupplierInvNo + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ الفاتورة " : " Invoice Date ") + ': </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-6"><b>' + (lang == "ar" ? "  الطباعة " : " Print on ") + ' :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
        FadePageCover(false)
    });
}


//#endregion Public

//#region Header
function PS_Invoices_BindTableRows(pPS_Invoices) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    ClearAllTableRows("tblPS_Invoices");
    $.each(pPS_Invoices, function (i, item) {
        debugger;
        var disable = "";
        if (item.IsApproved == true || (item.TransactionsCount > 0 && pDefaults.UnEditableCompanyName != "EGL")) {
            disable = "disabled = disabled";
        }




        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_Invoices",
            ("<tr ID='" + item.ID + "' ondblclick='PS_Invoices_EditByDblClick(" + item.ID + " , " + item.IsApproved + " , " + _HasTransactions + "); '>"
                + "<td class='ID'> <input " + disable + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='SupplierInvoiceNo' val='" + item.SupplierInvoiceNo + "'>" + item.SupplierInvoiceNo + "</td>"
                + "<td class='InvoiceNoManual hide' val='" + item.InvoiceNoManual + "'>" + item.InvoiceNoManual + "</td>"
                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.SupplierName + "</td>"
                + "<td class='TotalBeforTax hide' val='" + item.TotalBeforTax + "'>" + item.TotalBeforTax + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TotalPrice' val='" + item.TotalPrice + "'>" + item.TotalPrice + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Discount hide' val='" + item.Discount + "'>" + item.Discount + "</td>"
                + "<td class='DiscountPercentage hide' val='" + item.DiscountPercentage + "'>" + item.DiscountPercentage + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='SalesManID hide' val='" + item.SalesManID + "'>" + item.SalesManID + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenter_ID + "</td>"
                + "<td class='PaymentMethodID hide' val='" + item.PaymentMethodID + "'>" + item.PaymentMethodID + "</td>"
                + "<td class='ISDiscountBeforeTax val=" + item.ISDiscountBeforeTax + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.ISDiscountBeforeTax == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='OrderID hide' val='" + item.OrderID + "'>" + item.PurchasingOrderInfo + "</td>"
                + "<td class='SupplyOrderID hide' val='" + item.SupplyOrderID + "'>" + item.PurchasingSupplyInfo + "</td>"
                + "<td class='PaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchName + "</td>"

                + "<td class='IsFixedDiscount hide' val='" + item.IsFixedDiscount + "'>" + item.IsFixedDiscount + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='LocalTotalBeforeTax hide' val='" + item.LocalTotalBeforeTax + "'>" + item.LocalTotalBeforeTax + "</td>"
                + "<td class='LocalTotal hide' val='" + item.LocalTotal + "'>" + item.LocalTotal + "</td>"
                + "<td class='IsFromTrans hide' val='" + item.IsFromTrans + "'>" + item.IsFromTrans + "</td>"
                + "<td class='TransactionID hide' val='" + item.TransactionID + "'>" + item.TransactionID + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.TransactionID + "</td>"
                + "<td class='hPS_Invoices hide'><a href='#PS_InvoicesModal' data-toggle='modal' onclick='PS_Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"

                + "<td class='pPS_Invoices'><a href='#' onclick='PrintInvoice(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_Invoices", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_JournalVouchers";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//JournalVouchers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/JournalVouchers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_JournalVouchers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_JournalVouchers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_JournalVouchers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}

function PS_Invoices_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#PS_InvoicesModal").modal("show");

    if (pHasTransactions == true) {
        _HasTransactions = true;
        $('#htxtHasTransactions').val("true");
    }
    else {
        _HasTransactions = false;
        $('#htxtHasTransactions').val("false");
    }

    //-----------------------------------------------------------------------------------------
    if (pIsApproved == true || pIsApproved == "true") {
        $('#htxtIsApproved').val("true");
        console.log("$('#htxtIsApproved').val('true');")
    }
    else {
        $('#htxtIsApproved').val("false");
        console.log("$('#htxtIsApproved').val('false');")
    }
    PS_Invoices_FillControls(pID);
}

function PS_Invoices_LoadingWithPaging() {
    debugger;
    var WhereClause = " Where ISNULL(vwPS_Invoices.IsDeleted , 0) = 0 ";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo = '" + $('#txtInvoiceNo_Filter').val() + "'";
    }
    if ($('#txtSupplierInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND SupplierInvoiceNo LIKE '%" + $('#txtSupplierInvoiceNo_Filter').val() + "%'";
    }
    if ($('#txtTotalPrice_Filter').val().trim() != "") {
        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    }
    if ($('#slSupplier_Filter').val().trim() != "0") {
        WhereClause += " AND SupplierID = " + $('#slSupplier_Filter').val() + "";
    }
    if ($('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Invoices/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Invoices_BindTableRows(pTabelRows); PS_Invoices_ClearAllControls(); });
    HighlightText("#tblPS_Invoices>tbody>tr", $("#txt-Search").val().trim());
}




function PS_Invoices_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPS_Invoices') != "") {
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
                $.ajax({
                    type: "GET",
                    url: "/api/PS_Invoices/Delete",
                    data: { pPS_InvoicesIDs: GetAllSelectedIDsAsString('tblPS_Invoices') },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data[0] == true) {
                            PS_Invoices_LoadingWithPaging
                        }
                        else if (data[1] == false) {
                            swal("Cannot Delete", "Invoice link with asset", "warning");

                        }
                    }
                });

                //InsertUpdateFunction("form", "/api/PS_Invoices/Delete",
                //    { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblPS_Invoices') }
                //    , false, "PS_InvoicesModal", function (data) {
                //        if (data[0] == 'true') {
                //            PS_Invoices_LoadingWithPaging
                //        }
                //        else if (data[1] == 'false') {
                //            swal("Cannot Delete", "Invoice link with asset", "warning");

                //        }

                //    });

            });
            //    DeleteListFunction("/api/PS_Invoices/Delete", { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblPS_Invoices') }, function (data) {
            //        if (data[0] == 'true') {
            //            PS_Invoices_LoadingWithPaging
            //        }
            //        else if (data[1] == 'false') {
            //            swal("Cannot Delete","Invoice link with asset", "warning");

            //        }
                    
                  
            //    });
            //});

       
    }
    //DeleteListFunction("/api/PS_Invoices/Delete", { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblPS_Invoices') }, function () { PS_Invoices_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PS_Invoices_FillControls(pID) {
    debugger;
    ClearAll("#PS_InvoicesModal", null);
    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);


    IntializeData(function () {
        setTimeout(function () {
            var tr = $("#tblPS_Invoices > tbody > tr[ID='" + pID + "']");
            FadePageCover(true);
            $("#txtEntitlementDays").val($(tr).find("td.EntitlementDays").attr('val'));
            $("#txtInvoiceNo").val($(tr).find("td.InvoiceNo").attr('val'));
            $("#txtSupplierInvoiceNo").val($(tr).find("td.SupplierInvoiceNo").attr('val'));
            $("#txtInvoiceDate").val($(tr).find("td.InvoiceDate").attr('val'));
            $("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
            $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
            $("#slPaymentMethodID").val($(tr).find("td.PaymentMethodID").attr('val'));
            $("#slCostCenter_ID").val($(tr).find("td.CostCenter_ID").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));

            $("#slBranches").val($(tr).find("td.BranchID").attr('val'));
            
            //---------------------------------------------------------------------------------------------------------------------------------------
            $("#cbIsFromTrans").prop("checked", (IsNull($(tr).find("td.IsFromTrans").attr('val'), 'false') == 'false' ? false : true));
            if ($(tr).find("td.IsFixedDiscount").attr('val') == true || $(tr).find("td.IsFixedDiscount").attr('val') == "true") {
                $("#txtDiscount").val($(tr).find("td.Discount").attr('val'));
                $('#slDiscountType').val("20");
            }
            else {
                $("#txtDiscount").val($(tr).find("td.DiscountPercentage").attr('val'));
                $('#slDiscountType').val("10");

            }

            $("#lblDiscountValue").text($(tr).find("td.Discount").attr('val'));
            $("#lblDiscountPercentage").text($(tr).find("td.DiscountPercentage").attr('val'));
            $("#lblNetPriceValue").text($(tr).find("td.TotalBeforTax").attr('val'));
            $("#lblPriceValue").text($(tr).find("td.TotalPrice").attr('val'));
            $("#lblLocalPriceValue").text($(tr).find("td.LocalTotal").attr('val'));
            //--------------------------------------------------------------------------------------------------------------------------------------------
           // $("#slTransaction").val($(tr).find("td.TransactionID").attr('val'));

            if (IsNull($(tr).find("td.OrderID").attr('val'), "0") != "0") {
                $("#slTransaction").val("0");
                $("#slPurchasingOrder").val($(tr).find("td.OrderID").attr('val'));
                $("#slSupplyOrder").val("0");
                $('#cbIsFromSupplyOrder').prop('checked', false);
                $('#cbIsFromManual').prop('checked', false);
                $('#cbIsFromTrans').prop('checked', false);
                $('#cbIsFromPurchasingOrder').prop('checked', true);
            }
            else if (IsNull($(tr).find("td.SupplyOrderID").attr('val'), "0") != "0") {
                $("#slTransaction").val("0");
                $("#slPurchasingOrder").val("0");
                $("#slSupplyOrder").val($(tr).find("td.SupplyOrderID").attr('val'));
                $('#cbIsFromSupplyOrder').prop('checked', true);
                $('#cbIsFromManual').prop('checked', false);
                $('#cbIsFromTrans').prop('checked', false);
                $('#cbIsFromPurchasingOrder').prop('checked', false);
            }
            else if (IsNull($(tr).find("td.TransactionID").attr('val'), "0") != "0") {
                $("#slTransaction").val($(tr).find("td.TransactionID").attr('val'));
                $("#slPurchasingOrder").val("0");
                $("#slSupplyOrder").val("0");
                $('#cbIsFromSupplyOrder').prop('checked', false);
                $('#cbIsFromManual').prop('checked', false);
                $('#cbIsFromTrans').prop('checked', true);
                $('#cbIsFromPurchasingOrder').prop('checked', false);
            }
            else
            {
                $("#slPurchasingOrder").val("0");
                $("#slTransaction").val("0");
                $("#slSupplyOrder").val("0");
                $('#cbIsFromSupplyOrder').prop('checked', false);
                $('#cbIsFromManual').prop('checked', true);
                $('#cbIsFromTrans').prop('checked', false);
                $('#cbIsFromPurchasingOrder').prop('checked', false);
            }
            //--------------------------------------------------------------------------------------------------------------------------------------------
            $('#cbDiscountBeforeTax').prop('checked', $(tr).find("td.ISDiscountBeforeTax input:checkbox").is(":checked"));
            _JVID = ($(tr).find("td.JVID").attr('val') * 1);

            $("#btnSave").attr("onclick", "PS_Invoices_Save(false);");
            $("#btnSaveandNew").attr("onclick", "PS_Invoices_Save(true);");
            FadePageCover(false)
        }, 1000);
        setTimeout(function () {
            LoadInvoiceDetails("cbIsFromManual");
        }, 1000);

    });

}




function GetInsertUpdateParameters() {
    var InvoiceNo = (($('#txtInvoiceNo').val() == "" || $('#txtInvoiceNo').val() == "Auto") ? "0" : $('#txtInvoiceNo').val());
    var SupplierInvoiceNo = (($('#txtSupplierInvoiceNo').val() == "" || $('#txtSupplierInvoiceNo').val() == "Auto") ? "0" : $('#txtSupplierInvoiceNo').val());
    var InvoiceDate = ConvertDateFormat($('#txtInvoiceDate').val());
    var QuotationID = 0;
    var SupplierID = $('#slSupplierID').val();
    var TotalBeforTax = $('#lblNetPriceValue').text();
    var TotalPrice = $('#lblPriceValue').text();
    var Discount = $('#lblDiscountValue').text();
    var DiscountPercentage = $('#lblDiscountPercentage').text();
    var Notes = ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val());
    var DepartmentID = 0;
    var SalesManID = 0;
    var CostCenter_ID = $('#slCostCenter_ID').val();
    var PaymentMethodID = $('#slPaymentMethodID').val();
    var PaymentTermID = $('#slPaymentTermID').val();
    var IsApproved = _IsApproved;
    var ISDiscountBeforeTax = $('#cbDiscountBeforeTax').is(':checked');
    var IsFixedDiscount = ($('#slDiscountType').val() == "10" ? false : true);
    var InvoiceNoManual = 0;
    var OrderID = ($('#cbIsFromPurchasingOrder').is(":checked") ? $('#slPurchasingOrder').val() : 0);
    var SupplyOrderID = ($('#cbIsFromSupplyOrder').is(":checked") ? $('#slSupplyOrder').val() : 0);
    var JVID = _JVID;
    var CurrencyID = $('#slCurrencyID').val();
    var ExchangeRate = $('#slCurrencyID option:selected').attr('exchangerate');
    var LocalTotalBeforeTax = ($('#lblNetPriceValue').text() * 1) * ($('#slCurrencyID option:selected').attr('exchangerate') * 1);
    var LocalTotal = $('#lblLocalPriceValue').text();
    var IsDeleted = false;
    var TaxesAmount = $('#lblTotalTaxes').text();
    var ItemsAmount = $('#lblTotalItems_I').text() //GetTotalItemsOnly();
    var ServicesAmount = $('#lblTotalItems_S').text() //GetTotalServicesOnly();
    var ExpensesAmount = $('#lblTotalExpenses').text();
    var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    var IsFromTrans = $('#cbIsFromTrans').is(":checked");
    var TransactionID = $("#slTransaction").val();
    var BranchID = IsNull( $("#slBranches").val() , 0);
    var EntitlementDays = IsNull( $("#txtEntitlementDays").val() , "0" );
    return {
        pID: ID,
        pInvoiceNo: InvoiceNo,
        pInvoiceDate: InvoiceDate,
        pQuotationID: QuotationID,
        pSupplierID: SupplierID,
        pTotalBeforTax: TotalBeforTax,
        pTotalPrice: TotalPrice,
        pDiscount: Discount,
        pDiscountPercentage: DiscountPercentage,
        pNotes: Notes,
        pDepartmentID: DepartmentID,
        pSalesManID: SalesManID,
        pCostCenter_ID: CostCenter_ID,
        pPaymentMethodID: PaymentMethodID,
        pPaymentTermID: PaymentTermID,
        pIsApproved: $('#htxtIsApproved').val(),
        pISDiscountBeforeTax: ISDiscountBeforeTax,
        pInvoiceNoManual: InvoiceNoManual,
        pOrderID: OrderID,
        pSupplyOrderID: SupplyOrderID,
        pJVID: JVID,
        pCurrencyID: CurrencyID,
        pExchangeRate: ExchangeRate,
        pLocalTotalBeforeTax: LocalTotalBeforeTax,
        pLocalTotal: LocalTotal,
        pIsDeleted: IsDeleted,
        pSupplierInvoiceNo: SupplierInvoiceNo,
        pTaxesAmount: TaxesAmount,
        pItemsAmount: ItemsAmount,
        pServicesAmount: ServicesAmount,
        pExpensesAmount: ExpensesAmount, pIsFixedDiscount: IsFixedDiscount, pIsFromTrans: IsFromTrans, pTransactionID: TransactionID, pEntitlementDays: EntitlementDays, pBranchID: BranchID
    };


}

function PS_Invoices_Save(pSaveandAddNew) {
    IsInsert = true;
    var _Suceess = true;

    FadePageCover(true);

    if ($('#slSupplierID').val() == "0") {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me'), (lang == "ar" ? 'من فضلك اختر المورد' : 'You must Select Supplier'), 'warning');
        FadePageCover(false)
        _Suceess = false;
    }
    else if ($('#cbIsFromPurchasingOrder').is(':checked') && IsNull($('#slPurchasingOrder').val(), "0") == "0") {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me'), (lang == "ar" ? 'من فضلك اختر أمر الشراء' : 'You must Select Purchase Order'), 'warning');
        FadePageCover(false)
        _Suceess = false;

    }
    else if ($('#cbIsFromSupplyOrder').is(':checked') && IsNull($('#slSupplyOrder').val(), "0") == "0") {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me'), (lang == "ar" ? 'من فضلك اختر أمر التوريد' : 'You must Select Supply Order'), 'warning');
        FadePageCover(false)
        _Suceess = false;

    }
    else if ($('#cbIsFromTrans').is(':checked') && IsNull($('#slTransaction').val(), "0") == "0") {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me'), (lang == "ar" ? 'من فضلك اختر العملية' : 'You must Select Transaction'), 'warning');
        FadePageCover(false)
        _Suceess = false;

    }


    if (
        ($('#lblDiscountValue').text() * 1 < 0 || $('#lblDiscountValue').text() == "") ||
        ($('#lblDiscountPercentage').text() * 1 < 0 || $('#lblDiscountPercentage').text() == "") ||
        ($('#lblNetPriceValue').text() * 1 < 0 || $('#lblNetPriceValue').text() == "") ||
        ($('#lblPriceValue').text() * 1 < 0 || $('#lblPriceValue').text() == "") ||
        ($('#lblLocalPriceValue').text() * 1 < 0 || $('#lblLocalPriceValue').text() == "")
    ) {
        //swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');

        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'لا يمكن ادخال قيمة/سعر بالسالب او فارغة' : 'Cannot Insert Negative or empty Amount'), 'warning');
        FadePageCover(false)
        _Suceess = false;

    }


    if ($('#tblItems > tbody > tr').length == 0)//&& $('#tbExpenses > tbody > tr').length == 0)
    {
        // swal('Excuse me', 'You must insert Items or Services', 'warning');
        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب ادخال الاصناف او الخدمات' : 'You must insert Items or Services'), 'warning');
        FadePageCover(false)
        _Suceess = false;
    }
    else {
        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
                var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var discount = $(tr).find('td.Discount').find('.input_discount').val();
                var UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();
                var ItemUnitID = $(tr).find('td.UnitID').find('.selectunit').val();
                if ((storeid.trim() == "" || storeid.trim() == "0" || storeid == null) && $(tr).attr('tag') == "item") {
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب ادخال المخازن' : 'Fill All Stores'), 'warning');

                    //  swal('Excuse me', 'Fill All Stores', 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((itemid.trim() == "" || itemid.trim() == "0" || itemid == null) && $(tr).attr('tag') == "item") {
                    // swal('Excuse me', 'Fill  Items', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill  Items'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((ItemUnitID == null || ItemUnitID.trim() == "" || ItemUnitID.trim() == "0") && $(tr).attr('tag') == "item") {
                    // swal('Excuse me', 'Fill  Items Units', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الوحدات' : 'Fill  Items Units'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                    // swal('Excuse me', 'Fill  Services', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الخدمات' : 'Fill   Services'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
                    // swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل الكميات' : 'Fill All Items Quantity'), 'warning');
                    //  Services
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (discount.trim() == "" || discount.trim() == "0" || discount == null) {
                    $(tr).find('td.Discount').find('.input_discount').val("0");
                }
                if (UnitPrice.trim() == "" || UnitPrice.trim() == "0" || UnitPrice == null) {
                    // swal('Excuse me', 'Insert Services Price', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل الاسعار' : 'Insert Services Price'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (parseFloat(UnitPrice.trim()) < parseFloat(discount.trim())) {
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'لا يمكن ادخال اسعار سالبة او فارغة' : 'Cannot Insert Negative or empty Amount'), 'warning');
                    // swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }

            });
        }

        //-------------------------------------------------------------------------------------------------
        if ($('#tblExpenses > tbody > tr').length > 0) {

            $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
                debugger;
                var expensesid = $(tr).find('td.ExpensesID').find('.selectExpenses').val();
                var expensesamount = $(tr).find('td.Amount').find('.inputamount').val();
                if (expensesid.trim() == "" || expensesid.trim() == "0" || expensesid == null) {
                    //  swal('Excuse me', 'Fill All Expenses', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل المصروفات' : 'Fill All Expenses'), 'warning');

                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (expensesamount.trim() == "" || expensesamount.trim() == "0" || expensesamount == null) {
                    // swal('Excuse me', 'Insert Expenses Amount', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل قيمة المصروفات' : 'Insert Expenses Amount'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }

            });
        }
        //--------------------------------------------------------------------------------------------------
        if ($('#tblTaxes > tbody > tr').length > 0) {

            $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
                debugger;
                var taxid = $(tr).find('td.TaxID').find('.selectTaxes').val();
                if (taxid.trim() == "" || taxid.trim() == "0" || taxid == null) {
                    // swal('Excuse me', 'Fill All Taxes', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل قيمة الضرائب' : 'Fill All Taxes'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }

            });
        }

    }

  //  console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        FadePageCover(true)
        setTimeout(function () {
            FadePageCover(true)
            InsertUpdateFunctionAndReturnID_Special("form", "/api/PS_Invoices/Save",
                GetInsertUpdateParameters()
                , pSaveandAddNew, null, '#hID', function () {
                    // if (data[0] != 0) { 
                    // swal($('#hID').val());
                    var ListOfListOfObject = [];
                    ListOfListOfObject.push(SetArrayOfItems());
                    ListOfListOfObject.push(SetArrayOfExpenses());
                    ListOfListOfObject.push(SetArrayOfTaxes());
                    InsertUpdateListOfObject("/api/PS_Invoices/InsertItems",
                        ListOfListOfObject
                        , pSaveandAddNew, "PS_InvoicesModal", function (data2) {
                            FadePageCover(true)
                            setTimeout(function () {
                                ID = $('#hID').val();
                                

                                if ($("#cbIsFromTrans").is(":checked")) {
                                    FadePageCover(true)
                                    InsertUpdateFunction3("form", "/api/PS_Invoices/InsertItems",
                                        JSON.stringify(SetArrayOfTrans())
                                        , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                                            // $('#txtCode').val(Code[1]);
                                            //PrintTransaction();

                                            console.log(Code[0]);
                                            setTimeout(function () {
                                                //SC_Transactions_LoadingWithPaging();
                                                ////  IntializeData();
                                                //ClearAllTableRows('tblItems');
                                                //all_has_store = false;
                                                FadePageCover(true)
                                                PrintInvoice($('#hID').val());
                                                PS_Invoices_LoadingWithPaging();

                                               

                                            }, 500);

                                        });

                                }
                                else {

                                    PrintInvoice($('#hID').val());
                                    PS_Invoices_LoadingWithPaging();
                                }
                                if (pDefaults.UnEditableCompanyName == "AKS" ||pDefaults.UnEditableCompanyName == "EGL" || pDefaults.UnEditableCompanyName == "KADI" || pDefaults.UnEditableCompanyName == "KDS") {
                                    if (data2[2]==1) {
                                        jQuery("#ReadyUnreadyModal").modal("show");

                                    }
                                 
                                }

                                //  IntializeData();
                            }, 300);

                        });
                    // }
                });

        }, 30);
    }
}
var ID = 0;
var type = 0;
function ReadyUnReady(ptype) {
    debugger;
    type = ptype;
    if (ptype!=1) {
        FadePageCover(true);
        var ApproveEndPoint = "/api/PS_Invoices/ReadyUnReady";
        CallGETFunctionWithParameters(ApproveEndPoint
            , { "pID": ID, "PReceiverUsers": 4, "pType": type }
            , function (pData) {
                jQuery("#ReadyUnreadyModal").modal("hide");
                FadePageCover(false);
                jQuery('#CheckboxesListModal').modal('hide')

            }
        );
    }
    else {
        Approve_Notify();

    }

}
function AlarmUsers_PSInvoice() {
    debugger;
    //FadePageCover(true);
    var IsRedirectError = false;
    var IsIncludedInCombinedPaymentRequest = false;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one receptionist.");
    else {
        debugger;
        FadePageCover(true);
        var ApproveEndPoint = "/api/PS_Invoices/ReadyUnReady";
        CallGETFunctionWithParameters(ApproveEndPoint
            , { "pID": ID, "PReceiverUsers": pSelectedItemsIDs, "pType": type }
            , function (pData) {
                jQuery("#ReadyUnreadyModal").modal("hide");
                FadePageCover(false);
                jQuery('#CheckboxesListModal').modal('hide')

            }
        );
    }

}

function ReadyUnReadyNotify() {
    debugger;
    Approve_Notify();
    if (type==1) {
        $.ajax({
            type: "GET",
            url: "/api/PS_Invoices/ReadyUnReady",
            data: { pID: ID, pType:1},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                    jQuery("#ReadyUnreadyModal").modal("hide");
            }
        });
        //PrintInvoice($('#hID').val());
       
    }
    else {
        $.ajax({
            type: "GET",
            url: "/api/PS_Invoices/ReadyUnReady",
            data: { pID: ID, pType:2},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {
                    jQuery("#ReadyUnreadyModal").modal("hide");
                
            }
        });
        //PrintInvoice($('#hID').val());
        
    }
    
}
function Approve_Notify(pID) {
    debugger;
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    //jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Users/LoadAll";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = " WHERE IsInactive=0 ";
    pWhereClause += " ORDER BY Name ";

    debugger;
    FadePageCover(true);

    //Get Users ID

    jQuery("#CheckboxesListModal").modal("show");
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            FadePageCover(false);
        });


}

function InsertUpdateFunctionAndReturnID_Special(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, phID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "GET",
            url: strServerURL + pFunctionName,
            data: pParametersWithValues,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data != 0) {
                        $(phID).val(data[0]);
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                //  $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else //data[0] = false
                        //swal(strSorry, strUniqueFailInsertUpdateMessage, "warning");
                        swal(strSorry, data[1]);
                }
                else {
                    if (data != 0) {
                        $(phID).val(data);
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                // $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, "the date must >= Good Receipt Note Date    [OR]    [Is Approved]");
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}
function PS_Invoices_Delete() {
    swal({
        title: "Are you sure?",
        text: "This Transaction will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            InsertUpdateFunction("form", "/api/PS_Invoices/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "PS_InvoicesModal", function (data) {
                    if (data[1].trim() == '') {
                        PS_Invoices_LoadingWithPaging();
                        //IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else if (data[1].trim() == '') {
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}





//#endregion Header


//#region Details


var ItemsRowsCounter = 0;

function AddNewItemsRow(type) {
    if (type == 1) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + "0" + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this);GetLastThreePurshaseInvoicesByItemIDForModal(this);GetWH_PackageTypeBarCode(' + (ItemsRowsCounter + 1) + ',this)');' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='StoreID' val='" + "0" + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input    type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                + "<td class='Discount' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                + "<td class='CostCenterID hide' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

                //+ "<td class='BarCode ' val='" + "0" + "'>" + "<select disabled='disabled' id='BarCode-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectBarCode'>" + $('#hidden_BarCode').html() + "</select>" + "</td>"" + maxDetailsIDInTable + ',' + 3 + "
               //+ "<td class='BarCode'  val=''><select id='hidden_BarCode" + (ItemsRowsCounter + 1) + "' onchange='' class='controlStyle hidden_BarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + $('#hidden_BarCode').html() + "</select></td>"
                + "<td class='BarCode'  val=''><select id='slBarCode" + (ItemsRowsCounter + 1) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"
                + "<td class='Isexempt' style='width:1%;'><input id='cbIsexempt" + (ItemsRowsCounter + 1)  + "' type='checkbox' value=''></td>"

                + "</tr>"));



    }
    else {
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='StoreID' val='" + "0" + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button disabled='disabled' id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                + "<td class='Discount' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                + "<td class='CostCenterID hide' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='BarCode'  val=''><select id='slBarCode" + (ItemsRowsCounter + 1) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"
                + "<td class='Isexempt' style='width:1%;'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' onchange='CalculateAll()' type='checkbox' value=''></td>"

                + "</tr>"));

    }
    $('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 5 });
    $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
    
    $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);GetLastThreePurshaseInvoicesByItemIDForModal(this);GetWH_PackageTypeBarCode( "' + (ItemsRowsCounter + 1) + '",this)');
    $("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');
    $("#tblItems").find("input").attr('onchange', 'CalculateAll();');


    ItemsRowsCounter++;



}

function GetWH_PackageTypeBarCode(RowID, ItemSelect) {
    debugger;
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        //var tr = $(ItemSelect).closest("tr");
        //var SelectUnit = $(tr).find("select.selectunit");
        //var UnitID = $(tr).find("td.UnitID").attr("val");
        //var ItemID = $(tr).find('td.ItemID .selectitem').val();

    var ItemID = $("#Item-" + RowID).val();


        var pParametersWithValues = {
            pPurchaseItemID: ItemID
           
        };
        CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadPackageTypeBarCode", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                if (pDefaults.UnEditableCompanyName == 'GHA') {
                   //FillListFromObject_BarCode(null, 10, "<--Select-->", ($("#BarCode-" + RowID)), pData[0], null);

                    FillListFromObject_BarCode(null, 10, "<--Select-->", ("slBarCode" + RowID), pData[0], null);
                    //Fill_SelectInputAfterLoadData_WithMultiAttr(pData[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#hidden_BarCode', '', 'BarCode');


                    //$("#slPayable" + ID).css({ "width": "100%" }).select2();
                }
               

                FadePageCover(false);
            }
            , null);

    }
    //else {
    //    $('#slChargeType' + ID).html($('#slChargeType').html());
    //}


    debugger;


}

function FillListFromObject_BarCode(pID, pCodeOrName, pStrFirstRow, pSlName, pData, callback) {
    ClearAllOptions(pSlName);
    debugger;
    var option = "";
    if (pStrFirstRow != "" && pStrFirstRow != null)
        option = '<option value="">' + pStrFirstRow + '</option>';
    // Bind Data
    $.each(JSON.parse(pData), function (i, item) {
        if (pID != null && pID != undefined) //in case of editing
            if (pID == item.ID)
                option += '<option ID=' + item.ID + ' value="' + item.ID + '" selected >' + item.BarCode + '</option>';
            else
                option += '<option ID=' + item.ID + ' value="' + item.ID + '">' + item.BarCode + '</option>';
        else
            option += '<option ID=' + item.ID + ' value="' + item.ID + '">' + item.BarCode + '</option>';
    });

    $("#" + pSlName).append(option);
    if (callback != null && callback != undefined)
        callback();

}
function GetItemPrice(ItemSelect) {
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        $(tr).find('td.UnitPrice input[type="text"]').val(($(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1 /*/ ExchangeRate * 1*/));
    }
}
function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");


        var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

        //if (UnitID == 0 || UnitID == "0")
        //  {
        var a = Units.indexOf("-1");
        $(SelectUnit).val(Units[a - 1]);

        //    }
    }
}
function CopyStores() {
    if ($('#tblItems > tbody > tr[tag="item"]').length > 0) {


        $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
            //selectstore
            $(tr).find('td.StoreID ').find('.selectstore').val($('#slStores').val());

        });
    }
}

function CopyCostCenter() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectcostcenter').val($('#slCostCenter_ID').val());
    }






}


function PS_InvoicesDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblItems') != "")
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
                DeleteListFunction("/api/PS_Invoices/DeleteItems", { "pPS_InvoicesDetailsIDs": GetAllSelectedIDsAsString('tblPS_InvoicesDetails') }, function () { PS_InvoicesDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
        CalculateAll();
    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected  will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                $(This).closest('tr').remove();
                CalculateAll();
            });
    }
    //if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
    //    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //    ItemsRowsCounter = ItemsRowsCounter - 1;


    //}
    //else {
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //        //callback function in case of success
    //        function () {
    //            $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //            ItemsRowsCounter = ItemsRowsCounter - 1;
    //            CalculateAll();
    //        });

    //}

}



function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData() {


    if ($('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
        $($('#tblItems > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
            $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
            $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
            $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
            $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
            $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
            $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
            $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
            $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
            //$(tr).find('td.BarCode ').find('.slBarCode').val($(tr).find('td.BarCode ').find('.slBarCode').attr('tag'));

            //FILTER BARCODE

            var pRowIndex = $(tr).find('td.isDefault').find('.selectisDefault').attr('tag');

            var pParametersWithValues = {
                pPurchaseItemID: $(tr).find('td.ItemID ').find('.selectitem').attr('tag')

            };
            CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadPackageTypeBarCode", pParametersWithValues
                , function (pData) {
                    var dd = pData[0];
                    if (pDefaults.UnEditableCompanyName == 'GHA') {
                        //FillListFromObject_BarCode(null, 10, "<--Select-->", ($("#BarCode-" + RowID)), pData[0], null);

                        FillListFromObject_BarCode(null, 10, "<--Select-->", ("slBarCode" + pRowIndex), pData[0], null);
                        //Fill_SelectInputAfterLoadData_WithMultiAttr(pData[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#hidden_BarCode', '', 'BarCode');
                        $(tr).find('td.BarCode ').find('.slBarCode').val($(tr).find('td.BarCode ').find('.slBarCode').attr('tag'));

                        //$("#slPayable" + ID).css({ "width": "100%" }).select2();
                    }


                    FadePageCover(false);
                }
                , null);
        // }

            if ($('#tblItems > tbody > tr').length - 1 == i) {

                // CalculateAll();
                FadePageCover(false)
            }


          

        });


    }, 100);

}

function PS_InvoicesDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)) {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (IsNull($('#hID').val(), "0") == "0" ? 0 : (typeof item.D_ID === 'undefined' ? "0" : item.D_ID)) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + (IsNull($('#hID').val(), "0") == "0" ? 0 : (typeof item.D_ID === 'undefined' ? "0" : item.D_ID))  + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='isDefault hide' val='" + true + "'> <input type='checkbox'  id ='isDefault-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectisDefault'/></td>"

                    + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='UnitPrice' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_UnitPrice) : item.AveragePrice) + "'>" + "<input tag='" + (typeof item.AveragePrice === 'undefined' ? (item.D_UnitPrice) : item.AveragePrice) + "'  type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='Discount' val='" + (typeof item.D_Discount === 'undefined' ? "0" : item.D_Discount) + "'>" + "<input tag='" + item.D_Discount + "'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Price' val='" + 0 + "'>" + 0 + "</td>"
                    + "<td class='CostCenterID hide' val='" + (typeof item.D_CostCenterID === 'undefined' ? "0" : item.D_CostCenterID) + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.D_CostCenterID === 'undefined' ? "0" : item.D_CostCenterID) + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

                    + "<td class='BarCode' style='min-width: 108px' val=''><select tag='" + (item.BarCode == 0 ? "" : item.BarCode) + "' id='slBarCode" + (ItemsRowsCounter + 1) + "' style='width:100%;'  class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + $('#hidden_BarCode').html() + "</select></td>"
                    //+ "<td class='BarCode'  val=''><select id='slBarCode" + (ItemsRowsCounter + 1) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"
                    + "<td class='Isexempt'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' " + (item.Isexempt == true ? 'checked' : '') + " type='checkbox' value='" + item.Isexempt + "'></td>"

                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (IsNull($('#hID').val(), "0") == "0" ? 0 : item.D_ID) + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + (IsNull($('#hID').val(), "0") == "0" ? 0 : item.D_ID)+ "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + item.D_ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.D_ServiceID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + 0 + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + item.D_QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='UnitPrice' val='" + item.D_UnitPrice + "'>" + "<input tag='" + item.D_UnitPrice + "' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='Discount' val='" + item.D_Discount + "'>" + "<input tag='" + item.D_Discount + "'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Price' val='" + item.D_Price + "'>" + item.D_Price + "</td>"
                    + "<td class='CostCenterID hide' val='" + item.D_CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.D_CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.D_Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='Isexempt'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' " + (item.Isexempt == true ? 'checked' : '') + " type='checkbox' value='" + item.Isexempt + "'></td>"

                    + "</tr>"));
        }
        $('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 5 });
        $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
        $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);GetWH_PackageTypeBarCode( "' + (ItemsRowsCounter + 1) + '",this)');
        $("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');
        $("#tblItems").find("input").attr('onchange', 'CalculateAll();');


        ItemsRowsCounter++;

        //---------------------------------------------------------------------------------

        if (JSON.parse(pItems).length - 1 == i) {
            FillItemsData();
        }



    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {

    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}

function GetItemQuantityInStore(Calculate_btn) {
    FadePageCover(true);
    var tr = $(Calculate_btn).closest('tr');
    //  $(Calculate_btn).siblings('.span_quantity').attr('counter')
    var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
    var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();

    if (storeid.trim() == "0" || itemid.trim() == "0") {

        swal('Excuse me', 'select Item and Store', 'warning');
        FadePageCover(false);
    }
    else {
        //GetItemQuantityInStore(string pItemID , string pStoreID , DateTime pDate)
        $.ajax({
            type: "Get",
            url: "/api/SC_Transactions/CalculateItemQuantityInStore",
            data: { pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pTransactionID: "0" },
            dataType: "json",
            success: function (r) {
                // $(tr).find('.QuantityInStore').html();
                $(tr).find('.QuantityInStore').find('.span_quantity').html("&nbsp;&nbsp;&nbsp;<b>" + r[0] + "</b>");
                FadePageCover(false);
                //span_quantity
            }
        });
    }

}




function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/PS_Invoices/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Invoices/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Invoices_BindTableRows(pTabelRows); PS_Invoices_ClearAllControls(); });
    // HighlightText("#tblPS_Invoices>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";



function SetArrayOfItems() {
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
        objItem.Price = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
        objItem.Discount = IsNull($(tr).find('td.Discount').find('.input_discount').val(), "0");
        objItem.TotalPrice = $(tr).find('td.Price').text();
        objItem.StoreID = (IsNull($(tr).find('td.ItemID').find('.selectitem').val(), "0") == "0" ? "0" : $(tr).find('td.StoreID').find('.selectstore').val());
        objItem.InvoiceID = $('#hID').val();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = IsNull($(tr).find('td.Qty').find('.input_quantity').val(), "1");
        objItem.RemainQuantity = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();
        objItemCostCenterID = $(tr).find('td.CostCenterID').find('.selectcostcenter').val();


        objItem.ItemQty = IsNull($(tr).find('td.Qty').find('.input_quantity').val(), "1");
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val();
        objItem.UnitFactor = 0;

        objItem.PartnerRemainedQty = 0;

        objItem.BarCode = ($(tr).find('td.BarCode').find('.slBarCode').val() == undefined || $(tr).find('td.BarCode').find('.slBarCode').val() == null) ? "0" : $(tr).find('td.BarCode').find('.slBarCode').val();
        objItem.Isexempt = $("#cbIsexempt" + $(tr).attr('counter')).prop("checked");

        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}

function SetArrayOfTrans() {
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = "0";
        objItem.TransactionID = $('#slTransaction').val();
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.StoreID = $(tr).find('td.StoreID').find('.selectstore').val();
        objItem.ReturnedQty = "0";
        objItem.CurrencyID = $('#slCurrencyID').val();
        objItem.ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = "0";
        objItem.SubAccountID = "0";
        objItem.OriginalQty = "0";
        objItem.ParentID = "0";
        objItem.AveragePrice = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
        objItem.TransactionDate = ConvertDateFormat(GetDateFromServer($('#slTransaction').find('option:selected').attr('TransactionDate')));
        objItem.QtyFactor = "1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "10";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = $(tr).find('td.Qty').find('.input_quantity').val();// quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty').find('.input_quantity').val(); // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        objItem.AvaliableQty = 0;
        objItem.P_Percentage = 0;
        objItem.P_Density = 0;
        objItem.ToStoreID = 0;
        objItem.P_LiterCost = 0;
        objItem.P_ExpectedQty = 0;
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


function SetArrayOfExpenses() {
    var arrayOfItems = new Array();
    $("#tblExpenses>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.InvoiceID = $('#hID').val();
        objItem.ExpensesID = $(tr).find('td.ExpensesID').find('.selectExpenses').val();
        objItem.Amount = $(tr).find('td.Amount').find('.inputamount').val();
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


function SetArrayOfTaxes() {
    var arrayOfItems = new Array();
    $("#tblTaxes>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.TaxID = $(tr).find('td.TaxID').find('.selectTaxes').val();
        objItem.TaxValue = $(tr).find('td.TaxValue').find('.inputtaxvalue').val();
        objItem.TaxAmount = $(tr).find('td.TaxAmount').find('.inputtaxamount').val();
        objItem.InvoiceID = $('#hID').val();
        objItem.IsPercentage = true;
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}




var all_has_store = false;



function GetItemAmount(ITEM) {
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');
    var ItemPrice = 0;
    console.log($(tr).attr('tag'));
    // if ($(tr).attr('tag') == 'item')
    //    ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    //else
    ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();


    var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    var quantity = $(tr).find('td.Qty input[type="text"]').val();
    var discount = $(tr).find('td.Discount input[type="text"]').val();


    //if ($(tr).attr('tag') == 'item')
    //{
    //    if (ItemPrice * 1 <= 0)
    //    {
    //        $(tr).find('td.UnitPrice input[type="text"]').val(($(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1 /*/ ExchangeRate * 1*/));
    //    }
    //    else
    //    {
    //        //----- -----------
    //        $(tr).find('td.UnitPrice input[type="text"]').val((ItemPrice * 1 /*/ ExchangeRate * 1*/));
    //        //----- ------------
    //    }
    //    ItemPrice = (ItemPrice * 1  )// / ExchangeRate * 1);

    //}



    // if ($(tr).attr('tag') == 'item')



    if (discount.trim() == "" || discount.trim() == "0")
        ItemPrice = ItemPrice;
    else
        ItemPrice = (ItemPrice * 1) - (discount * 1);
    //-----------------------
    var TotalPrice = 0;
    if (quantity.trim() == "" || quantity.trim() == "0") {
        $(tr).find('td.Qty input[type="text"]').val(1)
        TotalPrice = (1) * (ItemPrice * 1);
    }
    else
        TotalPrice = (quantity * 1) * (ItemPrice * 1);
    //--------------------

    // + "<td class='UnitPrice' val='" + "0" + "'>" + "<input disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
    if ($(tr).attr('tag') == 'item')
        $(tr).find('td.Price').html((TotalPrice).toFixed(5));
    else
        $(tr).find('td.Price').html((TotalPrice * 1).toFixed(5));

    if (!$(ITEM).is('tr'))
        CalculateTotalItems();




    return $(tr).find('td.Price').text();

}
function GetItemAmountTax(ITEM) {
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');

    var total = 0;


    if ($('#cbIsexempt' + $(tr).attr('counter')).is(':checked') == false) {
        total = $(tr).find('td.Price').text() * 1;
    }

    return total;

}


function CalculateTotalItems() {
    debugger;
    _TotalItems = 0.00000;

    if ($('#tblItems > tbody > tr').length == 0)
        $('#lblTotalItems').text('0.00000')
    $('#tblItems > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00;
        
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00000).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);

        if ($('#tblItems > tbody > tr').length - 1 == (i)) {
            $('#lblTotalItems').text(_TotalItems.toFixed(5));

        }
    });
}


function GetTotalItemsOnly() {
    _TotalItems = 0.00;
    if ($('#tblItems > tbody > tr[tag="item"]').length <= 0)
        $('#lblTotalItems_I').text("0.00000");
    $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
        var tr_Total = 0.00000;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00000).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="item"]').length - 1 == (i)) {
            $('#lblTotalItems_I').text(_TotalItems.toFixed(5));
        }
    });
}
function GetTotalServicesOnly() {
    _TotalItems = 0.00000;
    if ($('#tblItems > tbody > tr[tag="service"]').length <= 0)
        $('#lblTotalItems_S').text("0.00000");
    $('#tblItems > tbody > tr[tag="service"]').each(function (i, tr) {
        var tr_Total = 0.00000;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00000).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="service"]').length - 1 == (i)) {
            $('#lblTotalItems_S').text(_TotalItems.toFixed(5));
        }
    });
}

//#endregion Details

//#region Expenses

var ExpensesRowsCounter = 0;

function AddNewExpensesRow() {
    debugger;
    AppendRowtoTable("tblExpenses",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-info' style='font-size:15px;'> E </td>"
            + "<td class='ID hide'> <input  name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ExpensesID ' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Expense-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
            + "<td class='Amount ' val='" + "0" + "'>" + "<input   onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
            + "</tr>"));

    ExpensesRowsCounter++;
    $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', { digits: 5 });
}

function FillExpensesData() {


    if ($('#tblExpenses > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
        $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
            $(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));

            if ($('#tblExpenses > tbody > tr').length - 1 == i) {

                //CalculateAll();
                FadePageCover(false)
            }
        });


    }, 100);
}
function PS_InvoicesExpenses_BindTableRows(pItems) {
    ExpensesRowsCounter = 0;
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblExpenses");
    $.each(JSON.parse(pItems), function (i, item) {

        AppendRowtoTable("tblExpenses",
            ("<tr ID='" + item.InvoiceExpencesID + "' isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + item.InvoiceExpencesID + "'>"
                + " <td class='btn-info' style='font-size:15px;'> E </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button tag='" + item.ID + "'  id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ExpensesID ' val='" + item.ExpensesID + "'>" + "<select onchange='CalculateAll();' id='Expense-" + (ExpensesRowsCounter + 1) + "' tag='" + item.ExpensesID + "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                + "<td class='Amount ' val='" + item.InvExpensesAmount + "'>" + "<input tag='" + item.InvExpensesAmount + "'  onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
                + "</tr>"));

        ExpensesRowsCounter++;
        $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', { digits: 5 });


        if (JSON.parse(pItems).length - 1 == i) {
            FillExpensesData();
        }
    });

    //setTimeout(function () {

    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}

function CalculateTotalExpenses(callback) {
    debugger
    _TotalExpenses = 0.00;
    if ($('#tblExpenses > tbody > tr').length == 0) {
        $('#lblTotalExpenses').text('0.00')

        if (typeof callback === "function")
            callback();
    }
    $('#tblExpenses > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.Amount > input').val() != "" && $(tr).find('td.Amount > input').val() != null && $(tr).find('td.Amount > input').val() != "undefined")
            tr_Total = ($(tr).find('td.Amount > input').val() * 1.00).toFixed(5);
        _TotalExpenses = (_TotalExpenses + tr_Total * 1);
        if ($('#tblExpenses > tbody > tr').length - 1 == (i)) {
            $('#lblTotalExpenses').text(_TotalExpenses.toFixed(5));


            if (typeof callback === "function")
                callback();

        }
    });




}





function DeleteExpenses(RowsNo) {

    if ($("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
        $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
        ExpensesRowsCounter = ExpensesRowsCounter - 1;
        CalculateAll();

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
                $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
                ExpensesRowsCounter = ExpensesRowsCounter - 1;
                CalculateAll();
            });

    }

}

//#endregion Expenses

//#region Taxes

var TaxesRowsCounter = 0;

function AddNewTaxesRow() {
    debugger;
    AppendRowtoTable("tblTaxes",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-success' style='font-size:15px;'> T </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TaxID' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
            + "<td class='TaxValue' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
            + "<td class='TaxAmount' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
            + "<td class='IsPercentage hide' val='true'>true</td>"
            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });
    TaxesRowsCounter++;
}
function FillTaxesData() {


    if ($('#tblTaxes > tbody > tr').length > 0)
        FadePageCover(true)


    setTimeout(function () {
        $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
            $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
            $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
            $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));


            if ($('#tblTaxes > tbody > tr').length - 1 == i) {

                // CalculateAll();
                FadePageCover(false)
            }


        });


    }, 100);
}
function PS_InvoicesTaxes_BindTableRows(pItems) {
    TaxesRowsCounter = 0;
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblTaxes");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblTaxes",
            ("<tr ID='" + item.InvoiceTaxesID + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.InvoiceTaxesID + "'>"
                + " <td class='btn-success' style='font-size:15px;'> T </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
                + "<td class='IsPercentage hide' val='true'>true</td>"
                + "</tr>"));
        $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });
        TaxesRowsCounter++;

        if (JSON.parse(pItems).length - 1 == i) {
            FillTaxesData();
        }

    });

    //setTimeout(function () {

    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}
function DeleteTaxes(RowsNo) {

    if ($("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
        $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
        TaxesRowsCounter = TaxesRowsCounter - 1;
        CalculateAll();

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
                $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
                TaxesRowsCounter = TaxesRowsCounter - 1;
                CalculateAll();
            });

    }

}

function GetTaxAmount(Tax) {
    debugger;
    var tr = null;
    if ($(Tax).is('tr'))
        tr = Tax;
    else
        tr = $(Tax).closest('tr');
    var TaxValue = 0;
    TaxValue = $(tr).find('td.TaxID  select').find('option:selected').attr('currentpercentage') * 1;
    $(tr).find('td.TaxValue').val(TaxValue);

    var tr_Total = 0.00;
    $('#tblItems > tbody > tr').each(function (i, tr2) {
        
        if ($('#cbIsexempt' + $(tr2).attr('counter')).is(':checked') == false) {
            if ($(tr2).find('td.Price').text() != "" && $(tr2).find('td.Price').text() != null && $(tr2).find('td.Price').text() != "undefined")
                tr_Total = (tr_Total * 1 + $(tr2).find('td.Price').text() * 1.00000).toFixed(5);

        }
        if ($('#tblItems > tbody > tr').length - 1 == i) {
            var ItemAmount = tr_Total // $('#lblTotalItems').text() * 1;
            var ItemExpenses = 0;//$('#lblTotalExpenses').text() * 1;
            var Total = ItemAmount + ItemExpenses;


            if ($('#cbDiscountBeforeTax').is(':checked')) {
                if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

                    if ($('#slDiscountType').val() == "10") //%
                    {
                        var Discount = (Total * 1 * ($('#txtDiscount').val() / 100));
                        $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));
                    }
                    else {
                        var Discount = $('#txtDiscount').val() * 1;
                        $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));

                    }
                }
            }
            else {
                $(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(5));
            }


            $(tr).find('td.TaxValue > input').val(TaxValue.toFixed(5));

            if (!$(Tax).is('tr'))
                CalculateTotalTaxes();



            // return $(tr).find('td.TaxAmount > input').val();


        }
      
       
    });


    return ($(tr).find('td.TaxAmount > input').val() * 1.00000 * ($(tr).find('td.TaxID  select').find('option:selected').attr('isdebitaccount') == "false" ? -1 : 1));


}



function CalculateTotalTaxes() {

    debugger
    _TotalTaxes = 0.00000;
    if ($('#tblTaxes > tbody > tr').length == 0)
        $('#lblTotalTaxes').text('0.00000')
    $('#tblTaxes > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00000;
        if ($(tr).find('td.TaxAmount > input').val() != "" && $(tr).find('td.TaxAmount > input').val() != null && $(tr).find('td.TaxAmount > input').val() != "undefined")
            tr_Total = ($(tr).find('td.TaxAmount > input').val() * 1.00000).toFixed(5);
        _TotalTaxes = (_TotalTaxes + tr_Total * 1);
        if ($('#tblTaxes > tbody > tr').length - 1 == (i)) {

            $('#lblTotalTaxes').text(_TotalTaxes.toFixed(5));

        }
    });

}

//#endregion Taxes

//#region Calculate




function CalculateAll(THIS) {
    debugger;
    SetItemUnit(THIS);
    GetItemPrice(THIS);


    FadePageCover(true);
    var TotalItemsPrice = 0.00000;
    var TotalTaxesPrice = 0.00000;
    var _TotalItemsTax = 0.00000;

    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {

            TotalItemsPrice = ((TotalItemsPrice * 1) + (GetItemAmount(tr_items) * 1)).toFixed(5);
            //_TotalItemsTax = ((_TotalItemsTax * 1) + (GetItemAmountTax(tr_items) * 1)).toFixed(5);


            $('#lblTotalItems').text(TotalItemsPrice);

            if ($('#tblItems > tbody > tr').length - 1 == i_items) {

                CalculateTotalExpenses(function () {

                    if ($('#tblTaxes> tbody > tr').length > 0) {
                        $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {
                            TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(5);
                            if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
                                $('#lblTotalTaxes').text(TotalTaxesPrice);
                                CalculateFinalAmount();
                                // $('#lblNetPriceValue').text($('#lblTotalItems').text());
                                FadePageCover(false);

                            }
                        });
                    }
                    else {

                        $('#lblTotalTaxes').text('0.00');
                        CalculateFinalAmount();
                        FadePageCover(false);
                    }

                });

            }





        });

    }
    else {
        $('#lblTotalItems').text('0.00000')
        CalculateTotalExpenses(function () {

            if ($('#tblTaxes> tbody > tr').length > 0) {
                $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {

                    TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(5);
                    if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
                        $('#lblTotalTaxes').text(TotalTaxesPrice);
                        CalculateFinalAmount();
                        FadePageCover(false);
                    }
                });
            }
            else {

                $('#lblTotalTaxes').text('0.00000');
                CalculateFinalAmount();

                FadePageCover(false);
            }

        });



    }

}







function CalculateFinalAmount() {

    $('#lblNetPriceValue').text(($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1).toFixed(5));

    if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

        if ($('#slDiscountType').val() == "10") //%
        {
            if ($('#cbDiscountBeforeTax').is(':checked')) {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1; //+ $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100));
                var _DiscountPercentage = $('#txtDiscount').val();
                var _FinalAmount = (_Amount - _DiscountValue) + ($('#lblTotalTaxes').text() * 1);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);


            }
            else {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100));
                var _DiscountPercentage = $('#txtDiscount').val();
                var _FinalAmount = (_Amount - _DiscountValue);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);
            }
        }
        else //F
        {
            if ($('#cbDiscountBeforeTax').is(':checked')) {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1; //+ $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = ($('#txtDiscount').val());
                var _DiscountPercentage = ($('#txtDiscount').val() * 1 * 100) / _Amount;
                //-----
                var _FinalAmount = (_Amount - _DiscountValue) + ($('#lblTotalTaxes').text() * 1);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');

                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);

            }
            else {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = ($('#txtDiscount').val());
                var _DiscountPercentage = ($('#txtDiscount').val() * 1 * 100) / _Amount;
                var _FinalAmount = (_Amount - _DiscountValue);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);
            }

        }






    }
    else {
        var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
        var _DiscountValue = '0.00000';
        var _DiscountPercentage = '0.00000';
        var _FinalAmount = (_Amount);
        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);

    }

}


function FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate) {
    GetTotalItemsOnly();
    GetTotalServicesOnly();
    console.log(_Amount);
    console.log(_DiscountValue);
    console.log(_DiscountPercentage);
    console.log(_FinalAmount);
    console.log(_ExchangeRate);
    $('#lblPriceValue').text(parseFloat(_FinalAmount).toFixed(5));
    $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(5));
    $('#lblDiscountPercentage').text(parseFloat(_DiscountPercentage).toFixed(5));
    $('#lblLocalPriceValue').text((parseFloat((_FinalAmount * 1 * _ExchangeRate * 1)).toFixed(5) /** parseFloat((_ExchangeRate * 1)).toFixed(2)*/));
}

//#endregion Calculate






















// calling this function for update





function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {

                        swal(strSorry, data[1]);
                        //try {
                        //    if (insert == true) {
                        //        $('#hID').val(data[2]);
                        //        $("#btnSave").attr("onclick", "PS_Invoices_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "PS_Invoices_Save(true);");

                        //    }
                        //}
                        //catch
                        //{

                        //}

                    }

                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}


function InsertUpdateFunction3(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    console.log(pParametersWithValues);
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {
                        //  swal(strSorry, data[1]);

                        //  CallbackHeaderData();


                    }
                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}


function GetLastThreePurshaseInvoicesByItemIDForModal(ItemSelect) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var ItemIDs = "";
    if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem") || $(ItemSelect).is(".client"))) {
        ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");

        $("#tblItems tbody tr").each(function (i, tr) {

            var ItemID = $(tr).find('td.ItemID .selectitem').val();
            //var pParametersWithValues = {
            //    pItemID: ItemID
            //};
            //CallGETFunctionWithParameters("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pParametersWithValues
            //       , function (pData) {
            //           GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData);

            //       }
            //       , null);


            var pWhereClause = ItemID;
            var pOrderBy = " ID ";
            LoadWithPagingForModal("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
                 , function (pData) {
                     GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData); //TaxeTypes_ClearAllControls();
                     ItemIDs = ItemID + ",";

                     //strBindTableRowsFunctionName = "Customers_BindTableRows";
                 });



        });




    }


}
function GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData) {
    debugger;
    if ($('#hReadySlOptions option[value="2037"]').attr("OptionValue") == "true") {
        $('#isErp').show()

        //ClearAllTableRows("tblCustomerNetwork");
        // $("#tblGetLastThreePurshaseInvoicesByItemID tbody tr").html("");
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        $.each(pData, function (i, item) {
            AppendRowtoTable("tblGetLastThreePurshaseInvoicesByItemID",
                ("<tr ID='" + item.ID + "'>"
                    //("<tr ID='" + item.ID + "'>"
                    + "<td class='ItemName'>" + item.ItemName + "</td>"
                    + "<td class='InvoiceDate'>" + item.InvoiceDate + "</td>"
                    + "<td class='UnitPrice'>" + item.UnitPrice + "</td>"
                    + "<td class='Qty'>" + item.UnitPrice + "</td>"

                     + "<td class='InvoiceDate2'>" + item.InvoiceDate2 + "</td>"
                    + "<td class='UnitPrice2'>" + item.UnitPrice2 + "</td>"
                    + "<td class='Qty2'>" + item.UnitPrice2 + "</td>"

                     + "<td class='InvoiceDate3'>" + item.InvoiceDate3 + "</td>"
                    + "<td class='UnitPrice3'>" + item.UnitPrice3 + "</td>"
                    + "<td class='Qty3'>" + item.Qty3 + "</td></tr>"));
        });
        debugger;
        ApplyPermissions();
    }
    else {
        $('#isErp').hide()
    }

}
