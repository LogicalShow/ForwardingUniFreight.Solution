

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00000;
var _TotalExpenses = 0.00000;
var _TotalTaxes = 0.00000;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
var printQuotationSummaryText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print Quotations Summary" + "</span>";

//**************************************
var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val() 
    CheckIfAllLoading();
});

function PrintPurchasingRequest(InvID) {

    FadePageCover(true)


    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_PurchasingRequest/LoadDetails", "where ID = " + InvID, function (data) {
        var pReportTitle = " Purchasing Request - طلب شراء ";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var _InvDate = "";
        var _InvCurrency = "";

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';
       
        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الوحدة" : "Unit") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") + '</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item) {
            var name = '';
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + item.D_UnitName + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';


            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.RequestDate);
                _InvCode = item.RequestNo;
                _InvNotes = item.Notes;

                _InvBranch = item.BranchName;
                _InvDepartment = item.DepartmentName;
                _InvCreator = item.CreatorName;


                //pTablesHTML += '<tr>';
                //pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") + ' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                //pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';




        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems)
        {
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

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم الطلب " : "  Request No ") + ': </b> ' + _InvCode + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ طلب " : "  Date ") + ': </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  الطلب مقدم من " : "  Request From ") + ': </b> ' + _InvCreator + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  فرع " : "  Branch ") + ': </b> ' + _InvBranch + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  قسم " : "  Department ") + ': </b> ' + _InvDepartment + '</div>';


        

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

function CheckIfAllLoading() {
    if (typeof $('#slDepartments option') === "undefined" || $('#slDepartments option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

function IntializePage() {
    debugger;
    var WhereClause = " Where ISNULL(vwPS_PurchasingRequest.IsDeleted , 0) = 0";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingRequest/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingRequest_BindTableRows(pTabelRows); });
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingRequest/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
            //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- ALL Supplier -->', '#slSupplier_Filter', '');
            ////-------
            //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Supplier -->', '#slSupplierID', '');
            //-------
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'CostCenterName', '<-- SELECT CostCenter  -->', '#slCostCenter_ID', '');
            //------
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[5], 'ID', 'Name', '<----------- ITEMS ---------->', '#hidden_slItems', '', 'Price,ItemUnits');
            //-------
            Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<---------- SERVICES -------->', '#hidden_slServices', '');
            //-------
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            //*******
            $('#txtRequestDate').val(getTodaysDateInddMMyyyyFormat());

            $("#txtRequestDate").datepicker().on('changeDate'
                , function () {
                    $(this).datepicker('hide');
                   // RecalculateExchangeRate();

                });
            $("#txtRequestDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });

            Fill_SelectInputAfterLoadData(d[10], 'ID', 'Name', '<-- SELECT Branch -->', '#slBranches', '');
            Fill_SelectInputAfterLoadData(d[11], 'ID', 'Name', '<-- SELECT Branch -->', '#slDepartments', '');



            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}

//#region Public
function PS_HideShowEditBtns(IsApproved, HasTransactions)
{
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;

    

    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0")
    { // is [ New ]
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
    }
    else // is [ Update ]
    {

        if ($("#hf_CanEdit").val() != 1 || $('#htxtIsApproved').val() == 'true' ) {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', true);

        }
        else {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', false);

        }
    }

    $('.selectunit').prop('disabled', true);
    //$('.inputtaxvalue').prop('disabled', true);
   // $('.inputtaxamount ').prop('disabled', true);
    // $('.inputtaxamount ').prop('disabled', true);


}

function RecalculateExchangeRate()
{
    var currencyid = $('#slCurrencyID').val();
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0")

    }


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingRequest/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtRequestDate').val()), pID : $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d)
        {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
           // Fill_SelectInputAfterLoadData(d[1] , 'ID' , 'Code' , 'Select Good Receipt Note' , '#slTransaction', $('#hID').val());
            CalculateAll();
            FadePageCover(false);
        },
        error: function (jqXHR, exception)
        {
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
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0");
    }


    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');

    $('#txtRequestDate').val(getTodaysDateInddMMyyyyFormat());

    $('#txtRequestNo').val("Auto");
    $('#slSupplierID').val("0");

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingRequest/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Code', 'Select Good Receipt Note', '#slTransaction', $('#hID').val(), 'SupplierID,TransactionDate,Notes');
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
          
function PS_PurchasingRequest_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PS_PurchasingRequestModal", null);
    $('#hID').val("0");
    $("#btnSave").attr("onclick", "PS_PurchasingRequest_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_PurchasingRequest_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtRequestNo').val("Auto");
    $('#txtRequestNoManual').prop("disabled" , false);
   //('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
   //('#slPaymentMethodID').val("50");
    //_IsApproved = false;
    //_HasTransactions = false;
    _JVID = 0;


    //var IsStartManual = IsNull($('#hReadySlOptions option[value="2030"]').attr("OptionValue"), "false");
    //if (IsStartManual == "true")
    //    $("#cbIsFromTrans").prop("checked", false);
    //else
    //    $("#cbIsFromTrans").prop("checked", true);


    IntializeData(function () { /*PS_HideShowEditBtns(false);*/ });
   
}
function LoadInvoiceDetails()
{
    debugger;

        LoadAll("/api/PS_PurchasingRequest/LoadDetails", "where ID = " + $('#hID').val(), function (pTabelRows)
        {
            PS_PurchasingRequestDetails_BindTableRows(pTabelRows[0]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved);
                }, 300);

            }, 1500);

        });
    
   
}


function PrintRequest(InvID) {

    FadePageCover(true)


    if (1 != 1) {

    

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
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") +'</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '"> ' + (lang == "ar" ? "سعر الوحدة" : "Unit Price") +'</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") +'</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "القيمة" : "Amount") +'</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") +'</th>';
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
            pTablesHTML += '<td>' + "" /*item.D_Notes*/ + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.RequestDate);
                _InvCode = item.RequestNo;
                _InvSupplier = item.SupplierName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _SupplierInvNo = item.SupplierRequestNo;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") +' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        if ($(_Expenses).length > 0) {
            pTablesHTML += '<div class="row">';
            pTablesHTML += '<div class="col-xs-12">';
            pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
            pTablesHTML += '<caption><b>' + (lang == "ar" ? " المصاريف " : " Expenses ") +'</b></caption>';
            pTablesHTML += '<thead>';
            pTablesHTML += '<th>' + (lang == "ar" ? " البند " : " Item ") +'</th>';
            pTablesHTML += '<th>' + (lang == "ar" ? " القيمة " : " Amount ") +'</th>';
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
                    _InvDate = GetDateFromServer(item.RequestDate);
                    _InvCode = item.RequestNo;
                    _InvSupplier = item.SupplierName;
                    _InvNotes = item.Notes;
                    _InvCurrency = item.CurrencyCode;
                    _InvTotal = item.TotalPrice;
                    _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )";
                    _SupplierInvNo = item.SupplierRequestNo;
                    pTablesHTML += '<tr>';
                    pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " قيمة المصروفات " : " Expenses Amount ") +' : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
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
        pTablesHTML += _Default.PurchaseInvoicesComments + "<br>";
        pTablesHTML += (_InvNotes == "0" ? "" : _InvNotes)
        pTablesHTML += '</b></div>';
        pTablesHTML += '<div class="col-xs-4 "  >';
        pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
        if (parseFloat(_InvDiscount) > 0)
            pTablesHTML += '<b> ' + (lang == "ar" ? " الخصم " : " Discount ") + ' : ' + _InvDiscount.toFixed(2) + '</b><br>';
        pTablesHTML += '<b> ' + (lang == "ar" ? " المجموع " : " Total ") + ' : ' + _InvTotal.toFixed(2) + ' ' + _InvCurrency + '</b><br>';
        pTablesHTML += " <b style='text-decoration: underline overline;'>" + (lang == "ar" ? "  " : toWords_WithFractionNumbers(_InvTotal.toFixed(2)) + " " + _InvCurrency ) +  "</b>";
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
}

//#endregion Public

//#region Header
function PS_PurchasingRequest_BindTableRows(pPS_PurchasingRequest) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_PurchasingRequest");
    $.each(pPS_PurchasingRequest, function (i, item) {
        debugger;
        var disable = "";
        if (item.IsApproved == true) {
            disable = "disabled = disabled";
        }




        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_PurchasingRequest",
            ("<tr ID='" + item.ID + "' ondblclick='PS_PurchasingRequest_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); '>"
                + "<td class='ID'> <input " + disable + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RequestNo' val='" + item.RequestNo + "'>" + item.RequestNo + "</td>"
                + "<td class='RequestNoManual' val='" + item.RequestNoManual + "'>" + item.RequestNoManual + "</td>"
                + "<td class='RequestDate' val='" + GetDateFromServer(item.RequestDate) + "'>" + GetDateFromServer(item.RequestDate) + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='CostCenter_ID ' val='" + item.CostCenter_ID + "'>" + item.CostCenterName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"

                + "<td class='CreatedUserID hide' val='"  + item.CreatedUserID + "'>" + item.CreatedUserID + "</td>"
                + "<td class='EditedByUserID hide' val='" + item.EditedByUserID + "'>" + item.EditedByUserID + "</td>"
                + "<td class='ApprovedUserID hide' val='" + item.ApprovedUserID + "'>" + item.ApprovedUserID + "</td>"
                + "<td class='CreatedDate hide' val='" + GetDateFromServer(item.CreatedDate) + "'>" + GetDateFromServer(item.CreatedDate) + "</td>"
                + "<td class='EditedDate hide' val='"     + GetDateFromServer(item.EditedDate) + "'>" + GetDateFromServer(item.EditedDate) + "</td>"
                + "<td class='ApprovedDate hide' val='"   + GetDateFromServer(item.ApprovedDate) + "'>" + GetDateFromServer(item.ApprovedDate) + "</td>"

                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"


                + "<td class='hPS_PurchasingRequest hide'><a href='#PS_PurchasingRequestModal' data-toggle='modal' onclick='PS_PurchasingRequest_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"

                
                + "<td class='pPS_PurchasingRequest'><a href='#' onclick='PrintRequestQuotationsSummary(" + item.ID + ");' " + printQuotationSummaryText + "</a></td>"
                + "<td class='pPS_PurchasingRequest'><a href='#' onclick='PrintPurchasingRequest(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_PurchasingRequest", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_PurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function PS_PurchasingRequest_EditByDblClick(pID, pIsApproved, pHasTransactions)
{
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#PS_PurchasingRequestModal").modal("show");

    if (pHasTransactions == true)
    {
        _HasTransactions = true;
        $('#htxtHasTransactions').val("true");
    }
    else
    {
        _HasTransactions = false;
        $('#htxtHasTransactions').val("false");
    }

    //-----------------------------------------------------------------------------------------
    if (pIsApproved == true || pIsApproved == "true")
    {
        $('#htxtIsApproved').val("true");
        console.log("$('#htxtIsApproved').val('true');")
    }
    else
    {
        $('#htxtIsApproved').val("false");
        console.log("$('#htxtIsApproved').val('false');")
    }
    PS_PurchasingRequest_FillControls(pID);
}
function PrintRequestQuotationsSummary(pID) {

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");
    arr_Values.push(IsNull(pID, "0"));


    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: 'Request Quotations Summary'
            , pReportName: 'PS_RequestQuotations'
        };
    }
    else {
        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: 'Request Quotations Summary'
            , pReportName: 'PS_RequestQuotations'
        };
    }
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}
function PS_PurchasingRequest_LoadingWithPaging()
{
    debugger;
    var WhereClause = " Where ISNULL(vwPS_PurchasingRequest.IsDeleted , 0) = 0 ";

    if ($('#txtRequestNo_Filter').val().trim() != "") {
        WhereClause += " AND RequestNo = '" + $('#txtRequestNo_Filter').val() + "'";
    }
    //if ($('#txtSupplierRequestNo_Filter').val().trim() != "") {
    //    WhereClause += " AND SupplierRequestNo LIKE '%" + $('#txtSupplierRequestNo_Filter').val() + "%'";
    //}
    //if ($('#txtTotalPrice_Filter').val().trim() != "") {
    //    WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    //}
    //if ($('#slSupplier_Filter').val().trim() != "0") {
    //    WhereClause += " AND SupplierID = " + $('#slSuppliers_Filter').val() + "";
    //}
    //if ($('#slCurrency_Filter').val().trim() != "0") {
    //    WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    //}
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingRequest/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingRequest_BindTableRows(pTabelRows); PS_PurchasingRequest_ClearAllControls(); });
    HighlightText("#tblPS_PurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
}




function PS_PurchasingRequest_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPS_PurchasingRequest') != "")
    {
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
                DeleteListFunction("/api/PS_PurchasingRequest/Delete", { "pPS_PurchasingRequestIDs": GetAllSelectedIDsAsString('tblPS_PurchasingRequest') }, function () { PS_PurchasingRequest_LoadingWithPaging(); });
            });
    }
    //DeleteListFunction("/api/PS_PurchasingRequest/Delete", { "pPS_PurchasingRequestIDs": GetAllSelectedIDsAsString('tblPS_PurchasingRequest') }, function () { PS_PurchasingRequest_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PS_PurchasingRequest_FillControls(pID) {
    debugger;
    ClearAll("#PS_PurchasingRequestModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);


    IntializeData(function () {
        setTimeout(function () {
            var tr = $("#tblPS_PurchasingRequest > tbody > tr[ID='" + pID + "']");
            FadePageCover(true)
        //$("#txtEntitlementDays").val($(tr).find("td.EntitlementDays").attr('val'));
        //
        //$("#txtSupplierRequestNo").val($(tr).find("td.SupplierRequestNo").attr('val'));
        //$("#txtRequestDate").val($(tr).find("td.RequestDate").attr('val'));
        //$("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
        //$("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
        //$("#slPaymentMethodID").val($(tr).find("td.PaymentMethodID").attr('val'));
        //$("#slCostCenter_ID").val($(tr).find("td.CostCenter_ID").attr('val'));
            

            $("#txtRequestNo").val($(tr).find("td.RequestNo").attr('val'));
            $("#slDepartments").val($(tr).find("td.DepartmentID").attr('val'));
            $("#txtRequestNoManual").val($(tr).find("td.RequestNoManual").attr('val'));
            $("#slBranches").val($(tr).find("td.BranchID").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));


            window.CreatedUserID = $(tr).find("td.CreatedUserID").attr('val');
            window.EditedByUserID = $(tr).find("td.EditedByUserID").attr('val');
            window.ApprovedUserID = $(tr).find("td.ApprovedUserID").attr('val');
            window.CreatedDate = $(tr).find("td.CreatedDate").attr('val');
            window.EditedDate = $(tr).find("td.EditedDate").attr('val');
            window.ApprovedDate = $(tr).find("td.ApprovedDate").attr('val');
            


        $("#btnSave").attr("onclick", "PS_PurchasingRequest_Save(false);");
            $("#btnSaveandNew").attr("onclick", "PS_PurchasingRequest_Save(true);");
            FadePageCover(false)
        }, 1000);
        setTimeout(function () {
            LoadInvoiceDetails(false);
        }, 1000);

    });
  
}




function GetInsertUpdateParameters()
{
    var RequestNo = (($('#txtRequestNo').val() == "" || $('#txtRequestNo').val() == "Auto") ? "0" : $('#txtRequestNo').val());
    var RequestNoManual = (($('#txtRequestNoManual').val() == "" || $('#txtRequestNoManual').val() == "Auto") ? "0" : $('#txtRequestNoManual').val());
    var RequestDate = ConvertDateFormat($('#txtRequestDate').val());
    var Notes = ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val());
    var DepartmentID = IsNull($('#slDepartments').val(), "0");
    var BranchID = IsNull($('#slBranches').val(), "0");
    var CostCenter_ID = IsNull($('#slCostCenter_ID').val() , "0");
    var IsApproved = _IsApproved;
    var IsDeleted = false;

    var ID = IsNull($('#hID').val(), "0");




    return {
        "pID": ID,
        "pRequestNo" : RequestNo,
        "pRequestDate": RequestDate,
        "pNotes": Notes,
        "pBranchID": BranchID,
        "pDepartmentID": DepartmentID,
        "pCostCenter_ID": CostCenter_ID,
        "pIsApproved": $('#htxtIsApproved').val(),
        "pRequestNoManual": RequestNoManual,
        "pIsDeleted": IsDeleted,
        "pCreatedUserID": (IsNull($('#hID').val() , "0") == "0" ? "0" :  window.CreatedUserID) ,
        "pEditedByUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" :window.EditedByUserID ),
        "pApprovedUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" : window.ApprovedUserID),
        "pCreatedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat( window.CreatedDate)),
        "pEditedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.EditedDate) ),
            "pApprovedDate" : (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.ApprovedDate) )
    };
}

function PS_PurchasingRequest_Save(pSaveandAddNew) {
    IsInsert = true;
    var _Suceess = true;

    FadePageCover(true)
    
    if (IsNull($('#slBranches').val(), "0") == "0" || IsNull($('#slDepartments').val(), "0") == "0" ) {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me') , (lang == "ar" ? 'من فضلك اختر القسم او الفرع': 'You must Select Departments or Branches')  , 'warning');
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
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var ItemUnitID = $(tr).find('td.UnitID').find('.selectunit').val();

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


            });
        }


    }

   // console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        FadePageCover(true)
        setTimeout(function () {
            debugger
            FadePageCover(true)
            PostInsertUpdateFunction("form", "/api/PS_PurchasingRequest/Save", GetInsertUpdateParameters(), pSaveandAddNew, null,

                function (res) {
                    // if (data[0] != 0) { 
                    // swal($('#hID').val());
                    $('#hID').val(res[1])
                    var ListOfListOfObject = [];
                    ListOfListOfObject.push(SetArrayOfItems());

                    InsertUpdateListOfObject("/api/PS_PurchasingRequest/InsertItems",
                        ListOfListOfObject
                        , pSaveandAddNew, "PS_PurchasingRequestModal", function (data) {
                            FadePageCover(true)
                            setTimeout(function () {
                                PrintPurchasingRequest(res[1]);
                                PS_PurchasingRequest_LoadingWithPaging();
                            }, 300);

                        });
                });


        }, 30);
    }
}

function InsertUpdateFunctionAndReturnID_Special(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, phID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: JSON.stringify( pParametersWithValues),
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
function PS_PurchasingRequest_Delete() {
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
            InsertUpdateFunction("form", "/api/PS_PurchasingRequest/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "PS_PurchasingRequestModal", function (data) {
                    if (data[1].trim() == '') {
                        PS_PurchasingRequest_LoadingWithPaging();
                        //IntializeData();
                        ClearAllTableRows('tblItems');
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
                + "<td class='ItemID ' val='" + "0" + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
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
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));

    }
    //$('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 5 });
    $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
    ItemsRowsCounter++;
   // $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);');
    //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');




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


function PS_PurchasingRequestDetails_DeleteList()
{
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
                DeleteListFunction("/api/PS_PurchasingRequest/Delete", { "pPS_PurchasingRequestDetailsIDs": GetAllSelectedIDsAsString('tblPS_PurchasingRequestDetails') }, function () { PS_PurchasingRequestDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
       // CalculateAll();
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
               // CalculateAll();
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


   if( $('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));

        if ($('#tblItems > tbody > tr').length - 1 == i) {

           // CalculateAll();
            FadePageCover(false)
        }

    });
   

    }, 100);

}
function PS_PurchasingRequestDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)  )
        {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID)  + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID)+ "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + item.D_ID + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.D_ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID) + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID) + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.D_Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }

        $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
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






function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/PS_PurchasingRequest/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingRequest/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingRequest_BindTableRows(pTabelRows); PS_PurchasingRequest_ClearAllControls(); });
    // HighlightText("#tblPS_PurchasingRequest>tbody>tr", $("#txt-Search").val().trim());
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
        objItem.RequestID = $('#hID').val();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = IsNull($(tr).find('td.Qty').find('.input_quantity').val() , "1");
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val();
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}






var all_has_store = false;



//#endregion Details
























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
                        //        $("#btnSave").attr("onclick", "PS_PurchasingRequest_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "PS_PurchasingRequest_Save(true);");

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


