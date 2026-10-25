

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00;
var _TotalExpenses = 0.00;
var _TotalTaxes = 0.00;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
var printControlsTextNew = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print Tax" + "</span>";
var printControlsTextJV = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' ></i> <span>" + TranslateString("PrintJV") + "</span>";


//**************************************

//Start Auto Filter
$(document).ready(function () {
    $("#slSupplierID").css({ "width": "100%" }).select2();
    $("#slSupplier_Filter").css({ "width": "100%" }).select2();

    //$('select.select2-hidden-accessible').select2({ dropdownParent: $('select.select2-hidden-accessible').closest('div.modal') });

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter


//#region Public
function PS_HideShowEditBtns(IsApproved, HasTransactions)
{
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;
    if (IsApproved == true || HasTransactions == true) {
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

function RecalculateExchangeRate()
{
    var currencyid =  $('#slCurrencyID').val();
    $.ajax({
        type: "GET",
        url: strServerURL + "api/PS_InvoicesTemp/IntializeData",
        data: { pDate: ConvertDateFormat( $('#txtInvoiceDate').val() ) , pOnlyCurrency: true },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
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

function IntializeData()
{
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    _IsApproved = false;
    _HasTransactions = false;
    $('#btnPrint2').addClass('hide');
    $('#btnPrintTax').addClass('hide');

    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
    $("#hID").val("");
    $('#txtInvoiceNo').val("Auto");
    $('#slSupplierID').val("0");
    $('#slSupplier_Filter').val("0");
    $("#slSupplier_Filter").trigger("change");

    $('#cbRatio').prop('checked', false);
    $('#cbRatioVat').prop('checked', false);
    $('#txtVat').val("0");
    $('#txtDiscountAmount').val("0");

    $('#txtDiscount').val("0");
    $('#slDiscountType').val('10');
    $('#cbDiscountBeforeTax').prop('checked', false);
    $('#lblDiscountValue').text("0.00");
    $('#lblDiscountPercentage').text("0.00");
    $('#lblNetPriceValue').text("0.00");
    $('#lblPriceValue').text("0.00");
    $('#lblLocalPriceValue').text("0.00");
    $('#lblTotalItems').text("0.00");
    $('#lblTotalExpenses').text("0.00");
    $('#lblTotalTaxes').text("0.00");
    $('#txtDiscount').inputmask('decimal', { digits: 2 });
    $('#txtDiscount').val('0');
    $.ajax({
        type: "GET",
        url: strServerURL + "api/PS_InvoicesTemp/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pOnlyCurrency: true },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function PS_InvoicesTemp_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PS_InvoicesTempModal", null);
    $("#btnSave").attr("onclick", "PS_InvoicesTemp_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_InvoicesTemp_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
    $('#btnPrintTax').addClass('hide');
    $("#txtSupplierInvoiceNo").removeAttr("disabled");

    $('#slSupplierID').val("0");
    $("#slSupplierID").trigger("change");


    _IsApproved = false;
    _HasTransactions = false;
    _JVID = 0;
    IntializeData();

}

function LoadInvoiceDetails()
{
    debugger;
    LoadAll("/api/PS_InvoicesTemp/LoadDetails", "where InvoiceID = " + $('#hID').val(), function (pTabelRows) {
        FadePageCover(true);
        PS_InvoicesTempDetails_BindTableRows(pTabelRows[0]);
        //PS_InvoicesTempExpenses_BindTableRows(pTabelRows[1]);
        //PS_InvoicesTempTaxes_BindTableRows(pTabelRows[2]);


        setTimeout(function () {
            CalculateAll();
            PS_HideShowEditBtns(_IsApproved, _HasTransactions);
    }, 300);

    });
}

function PrintInvoiceTax(InvID)
{
    if (InvID == 0)
        InvID = $('#hID').val();
    if (InvID !=0) {
        var arr_Keys = new Array();
        var arr_Vlaues = new Array();

        arr_Keys.push("PSInvoiceID");
        arr_Vlaues.push(InvID);
        var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Vlaues: arr_Vlaues
               , pTitle: "Purchase Invoice Tax Receipt"
                , pReportName: "Rep_PurchaseInvoiceTaxReceipt"
            };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;
    }
   
}

function PrintInvoice(InvID)
{
    if (InvID == 0)
        InvID = $('#hID').val();

    var arr_Keys = new Array();
    var arr_Vlaues = new Array();
    arr_Keys.push("InvoiceID");

    arr_Vlaues.push(InvID);
    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Vlaues: arr_Vlaues
           , pTitle: "Purshase Invoice"
            , pReportName: "Rep_PS_Invoice_Print"
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
    //$('#hExportedTable').html('');
    //LoadAll("/api/PS_Reports/LoadInvoiceDetails", "where ID = " + InvID , function (data) {
    //    var pReportTitle = "PS.Invoice";
    //    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    //    var _Details = JSON.parse(data[0]);
    //    var _Expenses = JSON.parse(data[1]);
    //    var _Taxes = JSON.parse(data[2]);
    //    var _Default = JSON.parse(data[3]);
    //    console.log(_Details);
    //    console.log(_Expenses);
    //    console.log(_Taxes);
    //    //****************** fill html table *************************************************
    //    var pTablesHTML = "";
    //    var ItemsCellsClass = "ForItems";
    //    var HasItems = false;
    //    var TotalAmount = 0.00;
    //    var TotalExpenses = 0.00;
    //    var TotalTaxes = 0.00;
    //    var _InvCode = "";
    //    var _SupplierInvNo = ""
    //    var _InvDate = "";
    //    var _InvSupplier = "";
    //    var _InvNotes = "";
    //    var _InvDiscount = "";
    //    var _InvCurrency = "";
    //    var _InvTotal = 0;
    //    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    //    pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
    //    pTablesHTML += '<thead>';
    //    pTablesHTML += '<th>Item</th>';
    //    pTablesHTML += '<th class="' + ItemsCellsClass +'">Unit Price</th>';
    //    pTablesHTML += '<th class="' + ItemsCellsClass +'">Quantity</th>';
    //    pTablesHTML += '<th>Quantity</th>';
    //    pTablesHTML += '<th>Unit Price</th>';
    //    pTablesHTML += '<th>Price</th>';
    //    pTablesHTML += '<th>CostCenter</th>';

    //    pTablesHTML += '<th>Notes</th>';
    //    pTablesHTML += '</thead>';
    //    pTablesHTML += '<tbody>';

    //    //hExportedTable
    //    $(_Details).each(function (i, item)
    //    {
    //        var name = '';
    //        TotalAmount = parseFloat(TotalAmount + item.D_Total);
    //        if (item.D_ItemID != null &&  item.D_ItemID != 0)
    //        {
    //            name = item.D_ItemName;
    //            HasItems = true;
    //        }
    //        else
    //        {
    //            name = item.D_ServiceName;
    //        }
            
    //        pTablesHTML += '<tr>';
    //        pTablesHTML += '<td>' + name + '</td>';
    //        pTablesHTML += '<td>' + parseFloat(item.D_Price).toFixed(2) + '</td>';
    //        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
    //        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Total).toFixed(2) + '</td>';
    //        pTablesHTML += '<td>' + item.D_UnitPrice + '</td>';
    //        pTablesHTML += '<td>' + item.D_Total + '</td>';
    //        pTablesHTML += '<td>' + item.D_CostCenter + '</td>';

    //        pTablesHTML += '<td>' + item.D_Notes + '</td>';
    //        pTablesHTML += '</tr>';

    //        if ($(_Details).length - 1 == i) {

    //            _InvDate = GetDateFromServer(item.InvoiceDate);
    //            _InvCode = item.InvoiceNo;
    //            _InvSupplier = item.SupplierName;
    //            _InvNotes = item.Notes;
    //            _InvCurrency = item.CurrencyCode;
    //            _InvTotal = item.TotalPrice;
    //            _SupplierInvNo = item.SupplierInvoiceNo;
    //            _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
    //            pTablesHTML += '<tr>';
    //            pTablesHTML += '<td colspan="6"><b style="float:right; border:solid 1px;">Total : ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
    //            pTablesHTML += '</tr>';
    //        }
    //    });
    //    pTablesHTML += '</tbody></table>';
    //    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx        

    //    //************** TOTAL Summary *************************
    //    pTablesHTML += '<div class="row" >';
    //    pTablesHTML += '<div class="col-xs-8"><b>';
    //    //pTablesHTML += _Default.PurchaseInvoicesComments + "<br>";
    //    //pTablesHTML += (_InvNotes == "0" ? "" : _InvNotes)
    //    pTablesHTML += '</b></div>';
    //    pTablesHTML += '<div class="col-xs-4 "  >';
    //    pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
    //    if (parseFloat( _InvDiscount ) > 0)
    //    pTablesHTML += "<b> Discount : " + _InvDiscount + "</b><br>";
    //    pTablesHTML += "<b> Total : " + _InvTotal + " " + _InvCurrency + "</b><br>";
    //    pTablesHTML += " <b style='text-decoration: underline overline;'>" + toWords_WithFractionNumbers(_InvTotal.toFixed(2)) + " " + _InvCurrency + "</b>";
    //    pTablesHTML += "</div>";

    //    pTablesHTML += '</div>';
    //    pTablesHTML += '</div>';
     
    //    //**************** Footer *******************************
    
    //    $('#hExportedTable').html(pTablesHTML);

    //    if (!HasItems)
    //    {
    //        $('.ForItems').addClass('hide');

    //    }


         
    //    debugger;
    //    var mywindow = window.open('', '_blank');
    //    var ReportHTML = '';
    //    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    //    ReportHTML += '<html>';
    //    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    //    ReportHTML += '         <body id="" style="background-color:white;">';

    //    ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
    //    ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    //    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div> </br>';
    //    ReportHTML += '         <div id="Reportbody">';
    //    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';
    //    ReportHTML += "         <div class='float-center text-left' style=''>";
    //    ReportHTML += '         <div class="col-xs-12 text-left text-ul m-t-n">';
    //    ReportHTML += '                 <div class="col-xs-6"><b>Inv NO: </b> ' + _InvCode + '</div>';
    //    ReportHTML += '                 <div class="col-xs-6"><b>Inv.Date: </b> ' + _InvDate + '</div>';
    //    ReportHTML += '         </div>';
    //    ReportHTML += '         </div>' + '</br>';
    //    ReportHTML += "         <div class='float-center text-left' style=''>";
    //    ReportHTML += '         <div class="col-xs-12 text-left text-ul m-t-n">';
    //    ReportHTML += '                 <div class="col-xs-6"><b>Supplier : </b> ' + _InvSupplier + '</div>';
    //    ReportHTML += '                 <div class="col-xs-6"><b>Currency : </b> ' + _InvCurrency + '</div>';
    //    ReportHTML += '         </div>';
    //    ReportHTML += '         </div>' + '</br>';;
    //    ReportHTML += "         <div class='float-center text-left' style=''>";
    //    ReportHTML += '         <div class="col-xs-12 text-left text-ul m-t-n">';

    //    ReportHTML += '                 <div class="col-xs-6"><b>Supplier Inv NO : </b> ' + _SupplierInvNo + '</div>';
    //    ReportHTML += '                 <div class="col-xs-6"><b>Printed On :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
    //    ReportHTML += '         </div>';
    //    ReportHTML += '         </div>' + '</br>';;
    //    ReportHTML += "         <div class='float-center text-left' style=''>";
    //    ReportHTML += '         <div class="col-xs-12 text-left text-ul m-t-n">';

    //    ReportHTML += '                 <div class="col-xs-6"><b>Notes : </b> ' + _InvNotes + '</div>';
    //    ReportHTML += '         </div>';
    //    ReportHTML += '         </div>' + '</br>';;

    //    ReportHTML += '         <div> &nbsp; </div>';
    //    ReportHTML += $('#hExportedTable').html();
    //    ReportHTML += '         </div>';

    //    ReportHTML += '         </body>';
    //    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    //    ReportHTML += '     </footer>';

    //    ReportHTML += '</html>';
    //    mywindow.document.write(ReportHTML);
    //    // $("#hExportedTable").html(ReportHTML);
    //    mywindow.document.close();
    //});
}

//#endregion Public

//#region Header
function PS_InvoicesTemp_BindTableRows(pPS_InvoicesTemp) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_InvoicesTemp");
    $.each(pPS_InvoicesTemp, function (i, item)
    {
        debugger;
        var disable = "";
        if (item.IsApproved == true || item.TransactionsCount > 0) {
            disable = "disabled = disabled";
        }

        if (item.TransactionsCount > 0) {
            _HasTransactions = true;

        }
        var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_InvoicesTemp",
            ("<tr ID='" + item.ID + "' ondblclick='PS_InvoicesTemp_EditByDblClick(" + item.ID + " , " + item.IsApproved + " , " + _HasTransactions + "); '>"
                + "<td class='ID'> <input " + disable +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='SupplierInvoiceNo' val='" + item.SupplierInvoiceNo + "'>" + item.SupplierInvoiceNo + "</td>"
                + "<td class='InvoiceNoManual hide' val='" + item.InvoiceNoManual + "'>" + item.InvoiceNoManual + "</td>"
               // + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='InvoiceDate' val='" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"


                
                 + "<td class='DueDate hide' val='" + GetDateFromServer(item.DueDate) + "'>" + GetDateFromServer(item.DueDate) + "</td>"
                + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.SupplierName + "</td>"
                + "<td class='TotalBeforTax hide' val='" + item.TotalBeforTax + "'>" + item.TotalBeforTax + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsApproved hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsApproved ? " checked='checked' " : "") + " /></td>"

                + "<td class='TotalPrice' val='" + item.TotalPrice + "'>" + item.TotalPrice + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode  + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Discount hide' val='" + item.Discount + "'>" + item.Discount + "</td>"
                + "<td class='DiscountPercentage hide' val='" + item.DiscountPercentage + "'>" + item.DiscountPercentage + "</td>"
                + "<td class='DepartementID hide' val='" + item.DepartementID + "'>" + item.DepartementID + "</td>"
                + "<td class='SalesManID hide' val='" + item.SalesManID + "'>" + item.SalesManID + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenter_ID + "</td>"
                + "<td class='PaymentMethodID hide' val='" + item.PaymentMethodID + "'>" + item.PaymentMethodID + "</td>"
                + "<td class='ISDiscountBeforeTax val=" + item.ISDiscountBeforeTax +" hide'> <input type='checkbox' disabled='disabled' val='" + (item.ISDiscountBeforeTax == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='DiscountType val=" + item.DiscountType + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.DiscountType == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsCalc val=" + item.IsCalc + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsCalc == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='isVatRatio val=" + item.isVatRatio + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.isVatRatio == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='VatAmount hide' val='" + item.VatAmount + "'>" + item.VatAmount + "</td>"
                + "<td class='DiscountAmount hide' val='" + item.DiscountAmount + "'>" + item.DiscountAmount + "</td>"

                + "<td class='OrderID hide' val='" + item.OrderID + "'>" + item.OrderID + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='LocalTotalBeforeTax hide' val='" + item.LocalTotalBeforeTax + "'>" + item.LocalTotalBeforeTax + "</td>"
                + "<td class='LocalTotal hide' val='" + item.LocalTotal + "'>" + item.LocalTotal + "</td>"
                + "<td class='TaxType hide' val='" + item.TaxType + "'>" + item.TaxType + "</td>"
                + "<td class='DisbursementJob_ID hide' val='" + item.DisbursementJob_ID + "'>" + item.DisbursementJob_ID + "</td>"


                + "<td class='hPS_InvoicesTemp hide'><a href='#PS_InvoicesTempModal' data-toggle='modal' onclick='PS_InvoicesTemp_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='pPS_InvoicesTemp'><a href='#' onclick='PrintInvoiceTax(" + item.ID + ");' " + printControlsTextNew + "</a></td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
                + "<td class='Print hide'><a href='' data-toggle='modal' onclick='JournalVoucher_Print(" + item.JVID + ");' " + printControlsTextJV + "</a></td>"

                + "<td class='pPS_InvoicesTemp'><a href='#' onclick='PrintInvoice(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_InvoicesTemp", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_InvoicesTemp>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function JournalVoucher_Print(pID) {
    debugger;

    if (pID == 0) //pID=0 this means print is pressed from modal
    {
        pID = $("#hID").val();
    }
    var arr_Keys = new Array();
    var arr_Vlaues = new Array();
    arr_Keys.push("ID");
    arr_Vlaues.push(pID);

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Vlaues: arr_Vlaues
        , pTitle: "Journal Vouchers"
        , pReportName: "Rep_JVPrint"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintBySingleID?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

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

function PS_InvoicesTemp_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    debugger;
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    $('#btnPrintTax').removeClass('hide');

    jQuery("#PS_InvoicesTempModal").modal("show");
    PS_InvoicesTemp_FillControls(pID);
}

function PS_InvoicesTemp_LoadingWithPaging() {
   
    debugger;
    var pWhereClause = PS_InvoicesTemp_GetWhereClause();

    var pPageSize = $('#select-page-size').val();
    //var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageNumber = 1;


    //var pOrderBy = "ID DESC";
    var pOrderBy;
    pOrderBy = "ID,InvoiceNo DESC";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PS_InvoicesTemp_BindTableRows(JSON.parse(pData[0])); });

   // LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_InvoicesTemp/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_InvoicesTemp_BindTableRows(pTabelRows); PS_InvoicesTemp_ClearAllControls(); });
    HighlightText("#tblPS_InvoicesTemp>tbody>tr", $("#txt-Search").val().trim());
}

function PS_InvoicesTemp_GetWhereClause() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) <> 1";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
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

    return WhereClause;
}

function PS_InvoicesTemp_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPS_InvoicesTemp') != "")
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
                DeleteListFunction("/api/PS_InvoicesTemp/Delete", { "pPS_InvoicesTempIDs": GetAllSelectedIDsAsString('tblPS_InvoicesTemp') }, function () { PS_InvoicesTemp_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/PS_InvoicesTemp/Delete", { "pPS_InvoicesTempIDs": GetAllSelectedIDsAsString('tblPS_InvoicesTemp') }, function () { PS_InvoicesTemp_LoadingWithPaging(); });
}
function PS_Invoice_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btnSaveandNew").removeAttr("disabled");
        //$("#btn-AddDetails").removeAttr("disabled");
        //$("#btn-DeleteDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btnSaveandNew").attr("disabled", "disabled");
        //$("#btn-AddDetails").attr("disabled", "disabled");
        //$("#btn-DeleteDetails").attr("disabled", "disabled");
    }
}
//after pressing edit, this function fills the data
function PS_InvoicesTemp_FillControls(pID) {
    debugger;
    if (!$("#cbPosted" + pID).prop("checked") /*&& !$("#cbIsSysJv" + pID).prop("checked")*/ && $("#hf_CanEdit").val() == "1")
        PS_Invoice_EnableDisableEditing(1); //Enable
    else
        PS_Invoice_EnableDisableEditing(2); //Disable
    ClearAll("#PS_InvoicesTempModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btnPrintTax').removeClass('hide');

    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);
    var tr = $("#tblPS_InvoicesTemp > tbody > tr[ID='" + pID + "']");
    $("#txtInvoiceNo").val($(tr).find("td.InvoiceNo").attr('val'));
    $("#txtSupplierInvoiceNo").val($(tr).find("td.SupplierInvoiceNo").attr('val'));
    $("#txtInvoiceDate").val($(tr).find("td.InvoiceDate").attr('val'));
    $("#txtDueDate").val($(tr).find("td.DueDate").attr('val'));

    $("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
    $("#slSupplierID").trigger("change");

    $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
    $("#slPaymentMethodID").val($(tr).find("td.PaymentMethodID").attr('val'));
    $("#slCostCenter_ID").val($(tr).find("td.CostCenter_ID").attr('val'));
    $("#slDepartmentID").val($(tr).find("td.DepartementID").attr('val'));

    $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
    $("#txtDiscount").val($(tr).find("td.DiscountPercentage").attr('val'));
    $("#lblDiscountValue").text($(tr).find("td.Discount").attr('val'));
    $("#lblDiscountPercentage").text($(tr).find("td.DiscountPercentage").attr('val'));
    $("#lblNetPriceValue").text($(tr).find("td.TotalBeforTax").attr('val'));
    $("#lblPriceValue").text($(tr).find("td.TotalPrice").attr('val'));
    $("#lblLocalPriceValue").text($(tr).find("td.LocalTotal").attr('val'));
    $('#slDiscountType').val("10");
    $('#cbDiscountBeforeTax').prop('checked', $(tr).find("td.ISDiscountBeforeTax input:checkbox").is(":checked"));
    $('#cbRatio').prop('checked', $(tr).find("td.DiscountType input:checkbox").is(":checked"));
    $('#cbCalcTax').prop('checked', $(tr).find("td.IsCalc input:checkbox").is(":checked"));
    $('#cbRatioVat').prop('checked', $(tr).find("td.isVatRatio input:checkbox").is(":checked"));
    $("#txtVat").val($(tr).find("td.VatAmount").attr('val'));
    $("#txtDiscountAmount").val($(tr).find("td.DiscountAmount").attr('val'));

    $("#slTaxType").val($(tr).find("td.TaxType").attr('val'));
    $("#slDisbursementJobs").val($(tr).find("td.DisbursementJob_ID").attr('val'));


    $("#txtSupplierInvoiceNo").attr("disabled", "disabled");

    _JVID = ($(tr).find("td.JVID").attr('val') * 1);
    $("#btnSave").attr("onclick", "PS_InvoicesTemp_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_InvoicesTemp_Save(true);");
    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);
}




function GetInsertUpdateParameters()
{
    var TaxType = $('#slTaxType').val();
    var InvoiceNo = (($('#txtInvoiceNo').val() == "" || $('#txtInvoiceNo').val() == "Auto") ? "0" : $('#txtInvoiceNo').val());
    var SupplierInvoiceNo = (($('#txtSupplierInvoiceNo').val() == "" || $('#txtSupplierInvoiceNo').val() == "Auto") ? "0" : $('#txtSupplierInvoiceNo').val());
    var InvoiceDate = ConvertDateFormat($('#txtInvoiceDate').val());
    var DueDate = ConvertDateFormat($('#txtInvoiceDate').val());

    var QuotationID = 0;
    var SupplierID = $('#slSupplierID').val();
    var TotalBeforTax = $('#lblNetPriceValue').text()=="" ? "0" : $('#lblNetPriceValue').text();
    var TotalPrice = $('#lblPriceValue').text() == "" ? "0" : $('#lblPriceValue').text();
    var Discount = $('#lblDiscountValue').text() == "" ? "0" : $('#lblDiscountValue').text();
    var DiscountAmount = $('#txtDiscountAmount').val() == "" ? "0" : $('#txtDiscountAmount').val();

    var DiscountPercentage = $('#lblDiscountPercentage').text() == "" ? "0" : $('#lblDiscountPercentage').text();
    var Notes = $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val();
    var DepartmentID = 0;
    var SalesManID = 0;
    var CostCenter_ID = "0";
    var PaymentMethodID = "0";
    var IsApproved = _IsApproved;
    var ISDiscountBeforeTax = $('#cbDiscountBeforeTax').is(':checked');
    var ISRatio = $('#cbRatio').is(':checked') ? true : false;
    var ISCalc = $('#cbCalcTax').is(':checked') ? true : false;
    var isVatRatio = $('#cbRatioVat').is(':checked') ? true : false;
    var VatAmount = $('#txtVat').val().trim();
    var InvoiceNoManual = 0;
    var OrderID = 0;
    var JVID = _JVID;
    var CurrencyID = $('#slCurrencyID').val() == "" ? "0" : $('#slCurrencyID').val();
    var ExchangeRate = $('#slCurrencyID option:selected').attr('exchangerate')== "" ? "0" : $('#slCurrencyID option:selected').attr('exchangerate');
    var LocalTotalBeforeTax = ($('#lblNetPriceValue').text() * 1) * ($('#slCurrencyID option:selected').attr('exchangerate') * 1);
    var LocalTotal = $('#lblLocalPriceValue').text() == "" ? "0" : $('#lblLocalPriceValue').text();
    var IsDeleted = 0;
   // var TaxesAmount = $('#lblTotalTaxes').text() == "" ? "0" : $('#lblTotalTaxes').text();
    var TaxesAmount = $('#lblTotalTaxesItem').text() == "" ? "0" : $('#lblTotalTaxesItem').text();

    var ItemsAmount = $('#lblTotalItems_I').text() == "" ? "0" :$('#lblTotalTaxes').text(); //GetTotalItemsOnly();
    var ServicesAmount = $('#lblTotalItems_S').text() == "" ? "0" : $('#lblTotalTaxes').text(); //GetTotalServicesOnly();
    var ExpensesAmount = $('#lblTotalExpenses').text() == "" ? "0" : $('#lblTotalTaxes').text();
    var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    var JobID = ($('#slDisbursementJobs').val() == "" || $('#slDisbursementJobs').val() == "0" || $('#slDisbursementJobs').val() == null) ? 0 : $('#slDisbursementJobs').val();
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
        pIsApproved: IsApproved,
        pISDiscountBeforeTax: ISDiscountBeforeTax,
        pISRatio: ISRatio,
        pISCalc: ISCalc,
        pInvoiceNoManual: InvoiceNoManual,
        pOrderID: OrderID,
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
        pExpensesAmount: ExpensesAmount,
        pTaxType: TaxType,
        pDueDate: DueDate,
        pJobID: JobID,
        pVatAmount: VatAmount,
        pisVatRatio: isVatRatio,
        pDiscountAmount: DiscountAmount

    };


}
function PS_InvoicesTemp_Save(pSaveandAddNew) {
    // Disable save buttons to prevent multiple clicks
    $("#btnSave, #btnSaveandNew").prop("disabled", true);

    IsInsert = true;
    var _Suceess = true;

    if (parseFloat($('#txtDiscount').val().trim()) > 0 && $("#slTaxType").val() == "1") {
        swal('Excuse me', 'You must Select Tax With Holding Type', 'warning');
        _Suceess = false;
        $("#btnSave, #btnSaveandNew").prop("disabled", false); // Re-enable if validation fails
    }
    if ($('#slSupplierID').val() == "0") {
        swal('Excuse me', 'You must Select Supplier', 'warning');
        _Suceess = false;
        $("#btnSave, #btnSaveandNew").prop("disabled", false);
    }

    if ($('#txtSupplierInvoiceNo').val() == "" || $('#txtSupplierInvoiceNo').val() == "Auto") {
        swal('Excuse me', 'You must Select Supplier Invoice No.', 'warning');
        _Suceess = false;
        $("#btnSave, #btnSaveandNew").prop("disabled", false);
    }
    if (
        ($('#lblDiscountValue').text() * 1 < 0 || $('#lblDiscountValue').text() == "") ||
        ($('#lblDiscountPercentage').text() * 1 < 0 || $('#lblDiscountPercentage').text() == "") ||
        ($('#lblNetPriceValue').text() * 1 < 0 || $('#lblNetPriceValue').text() == "") ||
        ($('#lblPriceValue').text() * 1 < 0 || $('#lblPriceValue').text() == "") ||
        ($('#lblLocalPriceValue').text() * 1 < 0 || $('#lblLocalPriceValue').text() == "")
    ) {
        swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
        _Suceess = false;
        $("#btnSave, #btnSaveandNew").prop("disabled", false);
    }


    if ($('#tblItems > tbody > tr').length == 0) {
        swal('Excuse me', 'You must Select Service', 'warning');
        _Suceess = false;
        $("#btnSave, #btnSaveandNew").prop("disabled", false);
    }
    else {
        AccountIDs = "";
        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ServiceID').find('.selectservice').val());


                var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var discount = $(tr).find('td.Discount').find('.input_discount').val();
                var UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();


                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                    swal('Excuse me', 'Fill  Services', 'warning');
                    _Suceess = false;
                    $("#btnSave, #btnSaveandNew").prop("disabled", false);
                    return false;
                }
                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
                    swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    _Suceess = false;
                    $("#btnSave, #btnSaveandNew").prop("disabled", false);
                    return false;
                }
                if (discount.trim() == "" || discount.trim() == "0" || discount == null) {
                    $(tr).find('td.Discount').find('.input_discount').val("0");
                }
                if (UnitPrice.trim() == "" || UnitPrice.trim() == "0" || UnitPrice == null) {
                    swal('Excuse me', 'Insert Services Price', 'warning');
                    _Suceess = false;
                    $("#btnSave, #btnSaveandNew").prop("disabled", false);
                    return false;
                }
                if (parseFloat(UnitPrice.trim()) < parseFloat(discount.trim())) {
                    swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
                    _Suceess = false;
                    $("#btnSave, #btnSaveandNew").prop("disabled", false);
                    return false;
                }

            });
        }
    }

    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/PS_InvoicesTemp/CheckForSupplierInvoiceNo",
            data: { pSupplierInvoiceNo: $('#txtSupplierInvoiceNo').val().trim(), pID: ($('#hID').val() == "" || $('#hID').val() == "0") ? 0 : $('#hID').val(), pSupplierID: $('#slSupplierID').val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData[0] != "[]" && ($('#hID').val() == "" || $('#hID').val() == "0")) {
                    swal("Sorry", "Supplier Invoice Number Already Exist");
                    $("#btnSave, #btnSaveandNew").prop("disabled", false);
                }
                else {
                    setTimeout(function () {
                        InsertUpdateFunctionAndReturnID("form", "/api/PS_InvoicesTemp/Save",
                            GetInsertUpdateParameters()
                            , pSaveandAddNew, null, '#hID', function () {
                                var ListOfListOfObject = [];
                                ListOfListOfObject.push(SetArrayOfItems());
                                debugger;
                                InsertUpdateListOfObject("/api/PS_InvoicesTemp/InsertItems",
                                    ListOfListOfObject
                                    , pSaveandAddNew, "PS_InvoicesTempModal", function (message) {
                                        debugger;
                                        $.ajax({
                                            type: "GET",
                                            url: "/api/PS_InvoicesTemp/deleteAllSelectedDetailesIDs",
                                            data: { pWhereClause: listOfIDs },
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            success: function (Result) {
                                                // Re-enable buttons after successful save
                                                $("#btnSave, #btnSaveandNew").prop("disabled", false);
                                            }
                                        });
                                        debugger;
                                        setTimeout(function () {
                                            debugger;
                                            PS_InvoicesTemp_LoadingWithPaging();
                                            IntializeData();
                                        }, 300);
                                    });
                            });
                    }, 30);
                }
            },
            error: function () {
                $("#btnSave, #btnSaveandNew").prop("disabled", false);
            }
        });
    } else {
        $("#btnSave, #btnSaveandNew").prop("disabled", false);
    }
}
//function PS_InvoicesTemp_Save(pSaveandAddNew) {
//    IsInsert = true;
//    var _Suceess = true;

//    if (parseFloat($('#txtDiscount').val().trim()) > 0 && $("#slTaxType").val() == "1") {
//        swal('Excuse me', 'You must Select Tax With Holding Type', 'warning');
//        _Suceess = false;
//    }
//    if ($('#slSupplierID').val() == "0") {
//        swal('Excuse me', 'You must Select Supplier', 'warning');
//        _Suceess = false;
//    }

//    if ($('#txtSupplierInvoiceNo').val() == "" || $('#txtSupplierInvoiceNo').val() == "Auto") {
//        swal('Excuse me', 'You must Select Supplier Invoice No.', 'warning');
//        _Suceess = false;
//    }
//    if (
//        ($('#lblDiscountValue').text() * 1 < 0 || $('#lblDiscountValue').text() == "") ||
//            ($('#lblDiscountPercentage').text() * 1 < 0 || $('#lblDiscountPercentage').text() == "") ||
//            ($('#lblNetPriceValue').text() * 1 < 0 || $('#lblNetPriceValue').text() == "") ||
//            ($('#lblPriceValue').text() * 1 < 0 || $('#lblPriceValue').text() == "") ||
//        ($('#lblLocalPriceValue').text() * 1 < 0 || $('#lblLocalPriceValue').text() == "")
//    ) {
//        swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
//        _Suceess = false;

//    }


//    if ($('#tblItems > tbody > tr').length == 0) {
//        swal('Excuse me', 'You must Select Service', 'warning');
//        _Suceess = false;
//    }
//    else {
//        AccountIDs="";
//        if ($('#tblItems > tbody > tr').length > 0) {

//            $($('#tblItems > tbody > tr')).each(function (i, tr) {
//                debugger;
//                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ServiceID').find('.selectservice').val());


//                var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
//                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
//                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
//                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
//                var discount = $(tr).find('td.Discount').find('.input_discount').val();
//                var UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();


//                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
//                    swal('Excuse me', 'Fill  Services', 'warning');
//                    _Suceess = false;
//                    return false;
//                }
//                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
//                    swal('Excuse me', 'Fill All Items Quantity', 'warning');
//                    _Suceess = false;
//                    return false;
//                }
//                if (discount.trim() == "" || discount.trim() == "0" || discount == null) {
//                    $(tr).find('td.Discount').find('.input_discount').val("0");
//                }
//                if (UnitPrice.trim() == "" || UnitPrice.trim() == "0" || UnitPrice == null) {
//                    swal('Excuse me', 'Insert Services Price', 'warning');
//                    _Suceess = false;
//                    return false;
//                }
//                if (parseFloat(UnitPrice.trim()) < parseFloat(discount.trim())) {
//                    swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
//                    _Suceess = false;
//                    return false;
//                }

//            });
//        }

//        //-------------------------------------------------------------------------------------------------
//        //if ($('#tblExpenses > tbody > tr').length > 0)
//        //{

//        //    $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
//        //        debugger;
//        //        var expensesid = $(tr).find('td.ExpensesID').find('.selectExpenses').val();
//        //        var expensesamount = $(tr).find('td.Amount').find('.inputamount').val();
//        //        if (expensesid.trim() == "" || expensesid.trim() == "0" || expensesid == null)
//        //        {
//        //            swal('Excuse me', 'Fill All Expenses', 'warning');
//        //            _Suceess = false;
//        //            return false;
//        //        }
//        //        if (expensesamount.trim() == "" || expensesamount.trim() == "0" || expensesamount == null)
//        //        {
//        //            swal('Excuse me', 'Insert Expenses Amount', 'warning');
//        //            _Suceess = false;
//        //            return false;
//        //        }

//        //    });
//        //}
//        //--------------------------------------------------------------------------------------------------
//        //if ($('#tblTaxes > tbody > tr').length > 0)
//        //{

//        //    $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
//        //        debugger;
//        //        var taxid = $(tr).find('td.TaxID').find('.selectTaxes').val();
//        //        if (taxid.trim() == "" || taxid.trim() == "0" || taxid == null) {
//        //            swal('Excuse me', 'Fill All Taxes', 'warning');
//        //            _Suceess = false;
//        //            return false;
//        //        }

//        //    });
//        //}

//    }



//    if (_Suceess == true) {
//        $.ajax({
//            type: "GET",
//            url: "/api/PS_InvoicesTemp/CheckForSupplierInvoiceNo",
//            data: { pSupplierInvoiceNo: $('#txtSupplierInvoiceNo').val().trim(), pID: ($('#hID').val() == "" || $('#hID').val() == "0") ? 0 : $('#hID').val(), pSupplierID: $('#slSupplierID').val()},
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (pData) {
//                if (pData[0] != "[]" && ($('#hID').val() == "" || $('#hID').val() == "0")) {
//                    swal("Sorry", "Supplier Invoice Number Already Exist");
//                }
//                else {
//                        setTimeout(function () {

//                            InsertUpdateFunctionAndReturnID("form", "/api/PS_InvoicesTemp/Save",
//                                GetInsertUpdateParameters()
//                                , pSaveandAddNew, null, '#hID', function () {
//                                    // swal($('#hID').val());
//                                    var ListOfListOfObject = [];
//                                    ListOfListOfObject.push(SetArrayOfItems());
//                                    debugger;
//                                   // ListOfListOfObject.push(SetArrayOfExpenses());
//                                   // ListOfListOfObject.push(SetArrayOfTaxes());
//                                    debugger;
//                                            debugger;
//                                            debugger;
//                                            InsertUpdateListOfObject("/api/PS_InvoicesTemp/InsertItems",
//                                                ListOfListOfObject
//                                                , pSaveandAddNew, "PS_InvoicesTempModal", function (message) {
//                                                    debugger;
//                                                    $.ajax({
//                                                        type: "GET",
//                                                        url: "/api/PS_InvoicesTemp/deleteAllSelectedDetailesIDs",
//                                                        data: { pWhereClause: listOfIDs },
//                                                        contentType: "application/json; charset=utf-8",
//                                                        dataType: "json",
//                                                        success: function (Result) {

//                                                        }
//                                                    });
//                                                    debugger;
//                                                    //PrintInvoice($('#hID').val());
//                                                    setTimeout(function () {
//                                                        debugger;
//                                                        PS_InvoicesTemp_LoadingWithPaging();
//                                                        IntializeData();
//                                                        //jQuery("#SL_InvoicesModal").modal("hide");
//                                                    }, 300);

//                                                });

//                                });

//                        }, 30);
                    
//                }
//            }
//        });
//    }
//}


function PS_InvoicesTemp_Delete() {
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
        function ()
        {
            InsertUpdateFunction("form", "/api/PS_InvoicesTemp/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "PS_InvoicesTempModal", function (data) {
                    if (data[1].trim() == '') {
                        PS_InvoicesTemp_LoadingWithPaging();
                        IntializeData();
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

function AddNewItemsRow(type)
{
    debugger;
    if (type == 1) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                //+ "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"


                + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
               // + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                //+ "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"


                + "<td class='StoreID hide' val='" + "0" + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore hide' val='" + "0" + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                + "<td class='Discount hide' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                + "<td class='Qty ' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                + "<td class='CostCenterID' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                + "<td class='DepartementID' val='" + "0" + "'>" + "<select id='Department-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectDepartment'>" + $('#slDepartmentID').html() + "</select>" + "</td>"
                + "<td class='Isexempt' style='width:1%;'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' type='checkbox' value=''></td>"

                + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='TaxRatio hide' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty()' disabled='disabled' class='input_Ratio input-sm  col-sm'>" + "</td>"
                + "<td class='TaxRatio ' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty();' onchange='CalculateAll()'  class='input_Ratio input-sm  col-sm'>" + "</td>"
                + "<td class='WHTRatio ' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty();' onchange='CalculateAll()'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"

                + "<td class='TaxID hide' val='" + "0" + "'>" + "<input   type='text'  disabled='disabled' class='input_TaxID input-sm  col-sm'>" + "</td>"

                + "</tr>"));



    }
    else
    {
        AppendRowtoTable("tblItems",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                //+ " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
               // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

                // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                //+ "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                //+ "<td class='ServiceID' style='width:20%;min-width: 250px;' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='ServiceID' style='width:20%;min-width: 250px;' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

                + "<td class='StoreID hide' val='" + "0" + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore hide' val='" + "0" + "'>" + "<button disabled='disabled' id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateAll()' class='input_unitprice input-sm  col-sm'>" + "</td>"
                + "<td class='Discount hide' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' onKeyUp='CalculateUnitQty()' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                + "<td class='CostCenterID' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                + "<td class='DepartementID' val='" + "0" + "'>" + "<select id='Department-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectDepartment'>" + $('#slDepartmentID').html() + "</select>" + "</td>"
                + "<td class='Isexempt' style='width:1%;'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' type='checkbox' value=''></td>"

                + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='TaxRatio ' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty();' onchange='CalculateAll()'  class='input_Ratio input-sm  col-sm'>" + "</td>"
                + "<td class='WHTRatio ' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty();' onchange='CalculateAll()'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"

                + "<td class='TaxRatio hide' val='" + "0" + "'>" + "<input   type='text'  onKeyUp='CalculateUnitQty()' onchange='CalculateAll()' disabled='disabled' class='input_Ratio input-sm  col-sm'>" + "</td>"
                + "<td class='TaxID hide' val='" + "0" + "'>" + "<input   type='text'  disabled='disabled' class='input_TaxID input-sm  col-sm'>" + "</td>"

                + "</tr>"));



    }

    $("#tblItems select").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });

    //('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
    ItemsRowsCounter++;
   // $("#tblItems").find("select").attr('onchange', 'CalculateAll();');
    //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');




}
     
function CalculateUnitQty() {
    var TotalItemsPrice = 0.00;
    var TotalTaxesPrice = 0.00;
    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {

            TotalItemsPrice = ((TotalItemsPrice * 1) + (GetItemAmount(tr_items) * 1)).toFixed(2);

            $('#lblTotalItems').text(TotalItemsPrice);
        });
    }
    if (true) {

    }
}

function CopyStores() {
    if ($('#tblItems > tbody > tr[tag="item"]').length > 0)
    {


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


function PS_InvoicesTempDetails_DeleteList() {
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
                DeleteListFunction("/api/PS_InvoicesTemp/DeleteItems", { "pPS_InvoicesTempDetailsIDs": GetAllSelectedIDsAsString('tblPS_InvoicesTempDetails') }, function () { PS_InvoicesTempDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(RowNumber, ID) {

    if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
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
                $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                GetAllSelectedIDs(ID);
                CalculateAll();
            });

    }

}

var listOfIDs = "";
function GetAllSelectedIDs(ID) {
    debugger;
    listOfIDs += ((listOfIDs == "") ? "" : ",") + (ID);
    return listOfIDs;
    CalculateFinalAmount();
}


function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData()
{
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
        $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
        $(tr).find('td.DepartementID ').find('.selectDepartment').val($(tr).find('td.DepartementID ').find('.selectDepartment').attr('tag'));

        $(tr).find('td.TaxRatio').find('.input_Ratio').val($(tr).find('td.TaxRatio ').find('.input_Ratio').attr('tag'));
        $(tr).find('td.WHTRatio').find('.input_WHTRatio').val($(tr).find('td.WHTRatio ').find('.input_WHTRatio').attr('tag'));

        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
        $(tr).find('td.TaxID').find('.input_TaxID').val($(tr).find('td.TaxID ').find('.input_TaxID').attr('tag'));

    });
    $("#tblItems select").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });

    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}

function PS_InvoicesTempDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item)
    {
        if (item.ItemID != null && item.ItemID != 0 ) {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID ' val='" + item.ItemID + "'>" + "<select  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + item.ItemID + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    //+ "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

                    + "<td class='StoreID hide' val='" + item.StoreID + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + item.StoreID + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore hide' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='UnitPrice' val='" + item.UnitPrice + "'>" + "<input tag='" + item.UnitPrice +"'   disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='Discount hide' val='" + item.Discount + "'>" + "<input tag='" + item.Discount +"'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty +"'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Price' val='" + item.Price + "'>" + item.Price + "</td>"
                    + "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='DepartementID' val='" + item.DepartementID + "'>" + "<select id='Department-" + (ItemsRowsCounter + 1) + "' tag='" + item.DepartementID + "' class='input-sm  col-sm selectDepartment'>" + $('#slDepartmentID').html() + "</select>" + "</td>"
                    + "<td class='Isexempt'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' " + (item.Isexempt == true ? 'checked' : '') + " type='checkbox' value='" + item.Isexempt + "'></td>"

                    + "<td class='Notes hide' val='" + item.Notes + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='TaxRatio' val='" + item.TaxRatio + "'>" + "<input tag='" + item.TaxRatio + "' onchange='CalculateAll()'  type='text' disabled='disabled' class='input_Ratio input-sm  col-sm'>" + "</td>"
                    + "<td class='WHTRatio ' val='" + item.WHTRatio + "'>" + "<input tag='" + item.WHTRatio + "'   onchange='CalculateAll()'  type='text'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"

                    + "<td class='TaxID hide' val='" + item.TaxID + "'>" + "<input tag='" + item.TaxID + "'   type='text' disabled='disabled' class='input_TaxID input-sm  col-sm'>" + "</td>"

                   + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                    //+ " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' style='width:20%;min-width: 350px;' val='" + 0+ "'>" + "<select  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                   // + "<td class='ServiceID' val='" + item.ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ServiceID + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    //+ "<td class='ServiceID' style='width:20%;min-width: 250px;' val='" + item.ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ServiceID + "'onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' style='width:20%;min-width: 250px;' val='" + item.ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ServiceID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"


                    + "<td class='StoreID hide' val='" + 0 + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore hide' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='UnitPrice' val='" + item.UnitPrice + "'>" + "<input tag='" + item.UnitPrice + "' type='text' onchange='CalculateAll()'class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='Discount hide' val='" + item.Discount + "'>" + "<input tag='" + item.Discount + "'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                    + "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "'   type='text' onKeyUp='CalculateUnitQty()' onchange='CalculateAll()' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Price' val='" + item.Price + "'>" + item.Price + "</td>"
                    + "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='DepartementID' val='" + item.DepartementID + "'>" + "<select id='Department-" + (ItemsRowsCounter + 1) + "' tag='" + item.DepartementID + "' class='input-sm  col-sm selectDepartment'>" + $('#slDepartmentID').html() + "</select>" + "</td>"
                    + "<td class='Isexempt'><input id='cbIsexempt" + (ItemsRowsCounter + 1) + "' " + (item.Isexempt == true ? 'checked' : '') + " type='checkbox' value='" + item.Isexempt + "'></td>"

                    + "<td class='Notes hide' val='" + item.Notes + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='TaxRatio' val='" + item.TaxRatio + "'>" + "<input tag='" + item.TaxRatio + "' onchange='CalculateAll()'  type='text' disabled='disabled' class='input_Ratio input-sm  col-sm'>" + "</td>"
                    + "<td class='WHTRatio ' val='" + item.WHTRatio + "'>" + "<input tag='" + item.WHTRatio + "'   onchange='CalculateAll()'  type='text'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"

                    + "<td class='TaxID hide' val='" + item.TaxID + "'>" + "<input tag='" + item.TaxID + "'   type='text' disabled='disabled' class='input_TaxID input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }
       // $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
      //  $("#tblItems").find("select").attr('onchange', 'CalculateAll();');
       // $("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');
        
    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function ()
    {
        FillItemsData();
      //  PS_HideShowEditBtns(_IsApproved);
    }, 300);

}
function GetRatio(ITEM) {
    debugger;
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(ITEM).closest('tr');
    var ItemPrice = 0;
    var ItemID = 0;
    console.log($(tr).attr('tag'))
    if ($(tr).attr('tag') == 'item')
        ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();
    //ItemID = $(tr).find('td.ServiceID select').val();
    // ItemID = $(tr).find('td.ServiceID').val();
    ItemID = $(tr).find('td.ServiceID  select').find('option:selected').val();
    // ItemID = $(tr).find("td.ServiceID").text();
    //var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    //var quantity = $(tr).find('td.Qty input[type="text"]').val();
    //var discount = $(tr).find('td.Discount input[type="text"]').val();
    debugger;
    $.getJSON("/api/SL_Invoices/GetListTaxRatio", { pWhereClause: $(tr).find('td.ServiceID  select').find('option:selected').val() }, function (Result) {
        if (Result[0] > 0) {
            debugger;
            $(tr).find('td.TaxRatio input[type="text"]').val(JSON.parse(Result[0]));
            $(tr).find('td.TaxID input[type="text"]').val(JSON.parse(Result[1]));
        } else {
            $(tr).find('td.TaxRatio input[type="text"]').val("0");
            $(tr).find('td.TaxID input[type="text"]').val("0");

        }

    });

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
            data: { pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pTransactionID:"0" },
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
    LoadAll("/api/PS_InvoicesTemp/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_InvoicesTemp/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_InvoicesTemp_BindTableRows(pTabelRows); PS_InvoicesTemp_ClearAllControls(); });
    // HighlightText("#tblPS_InvoicesTemp>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";


var AccountIDs = "";
function GetAllSelectedIDsJob(ID) {
    debugger;
    AccountIDs += ((AccountIDs == "") ? "" : ",") + (ID);
    return AccountIDs;

}
function SetArrayOfItems()
{
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
    var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.ItemID = 0;//$(tr).find('td.ItemID').find('.selectitem').val();
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
        objItem.Price =  ($(tr).find('td.UnitPrice').find('.input_unitprice').val()*1) -($(tr).find('td.Discount ').find('.input_discount').val() *1) ;
        objItem.Discount =  $(tr).find('td.Discount').find('.input_discount').val();
        objItem.TotalPrice =  $(tr).find('td.Price').text();
        objItem.StoreID = 0;//$(tr).find('td.StoreID').find('.selectstore').val();
        objItem.InvoiceID = $('#hID').val();
        objItem.Notes =  $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.RemainQuantity = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();
        objItem.CostCenterID = $(tr).find('td.CostCenterID').find('.selectcostcenter').val();
        objItem.DepartementID =0;

        objItem.TaxRatio = $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim() == "undefined" ? "0" : $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim() == "" ? "0" : $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim()
        objItem.WHTRatio = $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim() == "undefined" ? "0" : $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim() == "" ? "0" : $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim()

        objItem.TaxID = ($(tr).find('td.TaxID').find('.input_TaxID').val() == undefined || $(tr).find('td.TaxID').find('.input_TaxID').val() == null || $(tr).find('td.TaxID').find('.input_TaxID').val() == "") ? 0 : $(tr).find('td.TaxID').find('.input_TaxID').val();
        objItem.Isexempt = $("#cbIsexempt" + $(tr).attr('counter')).prop("checked");

    //GetAllSelectedIDs($(tr).find('td.ServiceID').find('.selectservice').val());
    arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


function SetArrayOfExpenses()
{
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
function SetArrayOfTaxes(callback) {
    debugger;
    var arrayOfItems = new Array();
    if ($('#cbCalcTax').is(':checked')) {
        debugger;

        $("#tblItems>tbody>tr").each(function (i, tr) {
            var objItem = new Object();
            debugger;
            debugger;

            //$.ajax({
            //    type: "GET",
            //    url: "/api/SL_Invoices/deleteFromInvoiceTaxes",
            //    data: { pWhereClause: $('#hID').val() },
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (Result) {
            //$.ajax({
            //    type: "GET",
            //    url: "/api/SL_Invoices/GetListTaxRatio",
            //    data: { pWhereClause: $(tr).find('td.ServiceID  select').find('option:selected').val() },
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (Result) {
            //        if (Result[1] > 0) {
                        debugger;
                       // TaxID = JSON.parse(Result[1]);
                        objItem.ID = 0;
                        objItem.TaxID = $(tr).find('td.TaxID input[type="text"]').val();
                        objItem.TaxValue = $(tr).find('td.TaxRatio input[type="text"]').val();
                        objItem.TaxAmount = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * $(tr).find('td.Qty').find('.input_quantity').val()) * ($(tr).find('td.TaxRatio input[type="text"]').val()) / 100;
                        objItem.InvoiceID = $('#hID').val();
                        objItem.IsPercentage = true;
                        arrayOfItems.push(objItem);

                        //console.log(TaxID);
                        //console.log(Result[1]);
                        console.log(objItem.TaxID);
                        console.log($(tr).attr('value'));

                        if (i == $("#tblItems>tbody>tr").length - 1) {
                            if (callback != null && callback != undefined)
                                callback();
                        }

            //        }
            //        //else {
            //        //    swal("Oops!", "Please, contact your technical support! GetListAsCheckboxes in mainapp.master.js", "error");

            //        //}
            //    },
            //    error: function (jqXHR, exception) {

            //        FadePageCover(false);
            //        swal("Oops!", "Please, contact your technical support! GetListAsCheckboxes in mainapp.master.js", "error");
            //    }
            //});
            //    }
            //});

            //  }, 300);




        });
        debugger;

    }
    return arrayOfItems;
    //}
    //debugger;
    //var arrayOfItems = new Array();
    //var TaxID;
    //$("#tblTaxes>tbody>tr").each(function (i, tr) {
    //    debugger;
    //    var objItem = new Object();
    //    objItem.ID = $(tr).attr('value');
    //    objItem.TaxID = $(tr).find('td.TaxID').find('.selectTaxes').val(); 
    //    objItem.TaxValue = $(tr).find('td.TaxValue').find('.inputtaxvalue').val(); 
    //    objItem.TaxAmount = $(tr).find('td.TaxAmount').find('.inputtaxamount').val(); 
    //    objItem.InvoiceID = $('#hID').val();
    //    objItem.IsPercentage = true;
    //   arrayOfItems.push(objItem);
    //});
    //return arrayOfItems;
}



var all_has_store = false;



function GetItemAmount(ITEM)
{
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');
    var ItemPrice = 0;
    console.log($(tr).attr('tag'))
    if ($(tr).attr('tag') == 'item')
        ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();


    var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    var quantity = $(tr).find('td.Qty input[type="text"]').val();
    var discount = $(tr).find('td.Discount input[type="text"]').val();


    if ($(tr).attr('tag') == 'item')
    {
        $(tr).find('td.UnitPrice input[type="text"]').val((ItemPrice * 1 / ExchangeRate * 1));
        ItemPrice = (ItemPrice * 1 / ExchangeRate * 1);
    }

    
   


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
        $(tr).find('td.Price').html((TotalPrice).toFixed(2));
    else
        $(tr).find('td.Price').html((TotalPrice * 1).toFixed(2));

    if (!$(ITEM).is('tr'))
        CalculateTotalItems();




    return $(tr).find('td.Price').text();

}


function CalculateTotalItems()
{
    _TotalItems = 0.00;
    if ($('#tblItems > tbody > tr').length == 0)
        $('#lblTotalItems').text('0.00')
    $('#tblItems > tbody > tr').each(function (i, tr)
    {
         var tr_Total = 0.00;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text()*1.00).toFixed(2);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr').length - 1 == (i))
        {
            $('#lblTotalItems').text(_TotalItems.toFixed(2));

        }
    });
}

function GetTotalItemsOnly() {
    _TotalItems = 0.00;
    if ($('#tblItems > tbody > tr[tag="item"]').length <= 0)
        $('#lblTotalItems_I').text("0.00");
    $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00).toFixed(2);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="item"]').length - 1 == (i)) {
            $('#lblTotalItems_I').text(_TotalItems.toFixed(2));
        }
    });
}
function GetTotalServicesOnly() {
    _TotalItems = 0.00;
    if ($('#tblItems > tbody > tr[tag="service"]').length <= 0)
        $('#lblTotalItems_S').text("0.00");
    $('#tblItems > tbody > tr[tag="service"]').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00).toFixed(2);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="service"]').length - 1 == (i)) {
            $('#lblTotalItems_S').text(_TotalItems.toFixed(2));
        }
    });
}



//#endregion Details

//#region Expenses

var ExpensesRowsCounter = 0;

function AddNewExpensesRow() {
    debugger;
    AppendRowtoTable("tblExpenses",
        ("<tr isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-info' style='font-size:15px;'> E </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteExpenses(" + (ExpensesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ExpensesID ' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Expense-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
            + "<td class='Amount ' val='" + "0" + "'>" + "<input   onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
            + "</tr>"));

    ExpensesRowsCounter++;
    $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', {digits:2});
}

function FillExpensesData()
{
    $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
        $(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));

    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function PS_InvoicesTempExpenses_BindTableRows(pItems) {
    ExpensesRowsCounter = 0;
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblExpenses");
    $.each(JSON.parse(pItems), function (i, item) {
    
        AppendRowtoTable("tblExpenses",
            ("<tr isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + item.ID + "'>"
                + " <td class='btn-info' style='font-size:15px;'> E </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteExpenses(" + (ExpensesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ExpensesID ' val='" + item.ExpensesID + "'>" + "<select onchange='CalculateAll();' id='Expense-" + (ExpensesRowsCounter + 1) + "' tag='" + item.ExpensesID+ "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                + "<td class='Amount ' val='" + item.Amount + "'>" + "<input tag='" + item.Amount +"'  onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
                + "</tr>"));
      
        ExpensesRowsCounter++;
        $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', { digits: 2 });

    });

    setTimeout(function () {
        FillExpensesData();
        //  PS_HideShowEditBtns(_IsApproved);
    }, 300);

}

function CalculateTotalExpenses(callback)
{
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
            tr_Total = ($(tr).find('td.Amount > input').val() * 1.00).toFixed(2);
        _TotalExpenses = (_TotalExpenses + tr_Total * 1);
        if ($('#tblExpenses > tbody > tr').length - 1 == (i)) {
            $('#lblTotalExpenses').text(_TotalExpenses.toFixed(2));


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
        ("<tr isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-success' style='font-size:15px;'> T </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteTaxes(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TaxID' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
            + "<td class='TaxValue' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
            + "<td class='TaxAmount' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
            + "<td class='IsPercentage hide' val='true'>true</td>"
            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
    TaxesRowsCounter++;
}
function FillTaxesData() {
    $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
        $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
        $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function PS_InvoicesTempTaxes_BindTableRows(pItems)
{
    TaxesRowsCounter = 0;
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblTaxes");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblTaxes",
            ("<tr isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.ID + "'>"
                + " <td class='btn-success' style='font-size:15px;'> T </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteTaxes(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID  + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
                + "<td class='IsPercentage hide' val='true'>true</td>"
                + "</tr>"));
        $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
        TaxesRowsCounter++;

    });

    setTimeout(function () {
        FillTaxesData();
        //  PS_HideShowEditBtns(_IsApproved);
    }, 300);

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

function GetTaxAmount(Tax)
{
    var tr = null;
    if ($(Tax).is('tr'))
        tr = Tax;
        else 
     tr = $(Tax).closest('tr');
    var TaxValue = 0;
    TaxValue = $(tr).find('td.TaxID  select').find('option:selected').attr('currentpercentage') * 1;
    $(tr).find('td.TaxValue').val(TaxValue);

    var ItemAmount = $('#lblTotalItems').text()*1;
    var ItemExpenses = $('#lblTotalExpenses').text()*1;
    var Total = ItemAmount + ItemExpenses;
    //$(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(2));
    if ($('#cbDiscountBeforeTax').is(':checked')) {
        if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

            if ($('#slDiscountType').val() == "10") //%
            {
                var Discount = (Total * 1 * ($('#txtDiscount').val() / 100));
                $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(2));
            }
            else {
                var Discount = $('#txtDiscount').val() * 1;
                $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(2));

            }
        }
    }
    else {
        $(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(2));
    }
    $(tr).find('td.TaxValue > input').val(TaxValue.toFixed(2));

    if (!$(Tax).is('tr'))
    CalculateTotalTaxes();



    return $(tr).find('td.TaxAmount > input').val();




}



function CalculateTotalTaxes()
{

    debugger
    _TotalTaxes = 0.00;
    if ($('#tblTaxes > tbody > tr').length == 0)
        $('#lblTotalTaxes').text('0.00')
    $('#tblTaxes > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.TaxAmount > input').val() != "" && $(tr).find('td.TaxAmount > input').val() != null && $(tr).find('td.TaxAmount > input').val() != "undefined")
            tr_Total = ($(tr).find('td.TaxAmount > input').val() * 1.00).toFixed(2);
        _TotalTaxes = (_TotalTaxes + tr_Total * 1);
        if ($('#tblTaxes > tbody > tr').length - 1 == (i))
        {

            $('#lblTotalTaxes').text(_TotalTaxes.toFixed(2));

        }
    });

}

//#endregion Taxes

//#region Calculate

function GetItemTaxAmount(ITEM) {
    debugger;
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');

    var ItemPrice = 0;
    var ItemID = 0;
    var discountAmount = 0;
    if ($(tr).attr('tag') == 'item')
        ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();


    var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    var quantity = $(tr).find('td.Qty input[type="text"]').val();
    var discount = $(tr).find('td.WHTRatio input[type="text"]').val();

    var discountLine = 0;
    var discountRatio = 0;
    var discountAmountLine = 0;
    var TotalLine=0
    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {         
            TotalLine += (GetItemAmount(tr_items) * 1);
        });
       
    }

    if ($(tr).attr('tag') == 'item') {
        $(tr).find('td.UnitPrice input[type="text"]').val((ItemPrice * 1 / ExchangeRate * 1));

        ItemPrice = (ItemPrice * 1 / ExchangeRate * 1);

    }
    discountLine = $('#txtDiscountAmount').val().trim() * 1;
    if (discountLine != "" && discountLine != 0 && discountLine != "0") {
        discountRatio = discountLine / TotalLine * 100;
        discountAmountLine =( discountRatio * ItemPrice )/100;

    }

    //if (discount.trim() == "" || discount.trim() == "0")
    //    ItemPrice = ItemPrice;
    //else {
    //    discountAmount = discount * 1 * ItemPrice /100;
    //    ItemPrice = (ItemPrice * 1) - (discountAmount * 1);
    //}

    //-----------------------
    var TotalPrice = 0;
    if (quantity.trim() == "" || quantity.trim() == "0") {
        $(tr).find('td.Qty input[type="text"]').val(1)
        TotalPrice = ((1) * (ItemPrice * 1)).toFixed(2);
    }
    else
        TotalPrice = ((quantity * 1) * (ItemPrice * 1)).toFixed(2);
    //--------------------

    if ($(tr).attr('tag') == 'item')
        $(tr).find('td.Price').html((TotalPrice).toFixed(2));

    else
        $(tr).find('td.Price').html((TotalPrice * 1).toFixed(2));

    var ItemTax = 0;
    var TaxRatio = 0;

    TaxRatio = $(tr).find('td.TaxRatio  input[type="text"]').val();
    ItemTax = (((TotalPrice - discountAmountLine) * TaxRatio) / 100).toFixed(2);
    //ItemTax = (((TotalPrice - discountLine) * TaxRatio) / 100).toFixed(2);


    if (!$(ITEM).is('tr'))
        CalculateAll();

    return ItemTax;

}
function GetItemWHTAmount(ITEM) {
    debugger;
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');

    var ItemPrice = 0;
    var ItemID = 0;

    var discountLine = 0;
    var discountRatio = 0;
    var discountAmountLine = 0;
    var TotalLine = 0
    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {
            TotalLine += (GetItemAmount(tr_items) * 1);
        });

    }

    if ($(tr).attr('tag') == 'item')
        ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();

    discountLine = $('#txtDiscountAmount').val().trim() * 1;
    if (discountLine != "" && discountLine != 0 && discountLine != "0") {
        discountRatio = discountLine / TotalLine * 100;
        discountAmountLine = (discountRatio * ItemPrice) / 100;

    }


    var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    var quantity = $(tr).find('td.Qty input[type="text"]').val();
    var discount = $(tr).find('td.Discount input[type="text"]').val();


    if ($(tr).attr('tag') == 'item') {
        $(tr).find('td.UnitPrice input[type="text"]').val((ItemPrice * 1 / ExchangeRate * 1));

        ItemPrice = (ItemPrice * 1 / ExchangeRate * 1);

    }

    if (discount.trim() == "" || discount.trim() == "0")
        ItemPrice = ItemPrice;
    else
        ItemPrice = (ItemPrice * 1) - (discount * 1);
    //-----------------------
    var TotalPrice = 0;
    if (quantity.trim() == "" || quantity.trim() == "0") {
        $(tr).find('td.Qty input[type="text"]').val(1)
        TotalPrice = ((1) * (ItemPrice * 1)).toFixed(2);
    }
    else
        TotalPrice = ((quantity * 1) * (ItemPrice * 1)).toFixed(2);
    //--------------------

    if ($(tr).attr('tag') == 'item')
        $(tr).find('td.Price').html((TotalPrice).toFixed(2));

    else
        $(tr).find('td.Price').html((TotalPrice * 1).toFixed(2));

    var ItemTax = 0;
    var TaxRatio = 0;

    TaxRatio = $(tr).find('td.WHTRatio   input[type="text"]').val();
    ItemTax = (((TotalPrice - discountAmountLine) * TaxRatio) / 100).toFixed(2);
    //ItemTax = (((TotalPrice - discountLine) * TaxRatio) / 100).toFixed(2);


    if (!$(ITEM).is('tr'))
        CalculateAll();

    return ItemTax;

}

function CalculateAll() {
    debugger;
    FadePageCover(true);
    var TotalItemsPrice = 0.00;
    var TotalTaxesPrice = 0.00;
    var TotalWHT = 0.00;
    var TotalNetValue = 0.00;
    var TotalLine = 0.00;
    var TotalLineTax = 0.00;



    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {
            TotalLine = 0;
            TotalLineTax = 0;


            TotalLine = (GetItemAmount(tr_items) * 1);

            TotalItemsPrice = ((TotalItemsPrice * 1) + (TotalLine * 1)).toFixed(2);
            //TotalItemsPrice = ((TotalItemsPrice * 1) + (GetItemAmount(tr_items) * 1)).toFixed(2);

            TotalLineTax = (GetItemTaxAmount(tr_items) * 1);
            TotalTaxesPrice = ((TotalTaxesPrice * 1) + (TotalLineTax * 1)).toFixed(2);
            // TotalTaxesPrice = ((TotalTaxesPrice * 1) + (GetItemTaxAmount(tr_items) * 1)).toFixed(2);


            TotalWHT = ((TotalWHT * 1) + (GetItemWHTAmount(tr_items) * 1)).toFixed(2);


            //TotalNetValue += ((TotalLine * 1 - TotalWHT * 1) + (TotalLineTax*1)).toFixed(2)*1;
        });

        $('#lblTotalItems').text(TotalItemsPrice);
        $('#lblNetPriceValue').text(TotalItemsPrice);

        $('#lblTotalTaxesItem').text(TotalTaxesPrice);



        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');



        //var _DiscountValue = 0;
        //_DiscountValue = $('#txtDiscountAmount').val().trim() * 1;
        var _DiscountAmount = $('#txtDiscountAmount').val().trim() * 1;

        //if ($('#cbRatio').prop('checked'))
        //    _DiscountValue = ((parseFloat(TotalItemsPrice) * parseFloat(_DiscountPercentage)) / 100).toFixed(2);
        //else
        //    _DiscountValue = $('#txtDiscount').val().trim() * 1;

        _DiscountValue = TotalWHT;

        $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(2));

        //TotalNetValue = (parseFloat(TotalItemsPrice) + parseFloat(TotalTaxesPrice) - parseFloat(_DiscountValue)).toFixed(2);
        TotalNetValue = (parseFloat(TotalItemsPrice - _DiscountAmount) + parseFloat(TotalTaxesPrice) - parseFloat(_DiscountValue)).toFixed(2);


        $('#lblPriceValue').text(TotalNetValue);
        $('#lblLocalPriceValue').text((parseFloat((TotalNetValue * 1)).toFixed(2) * parseFloat((_ExchangeRate * 1))).toFixed(2));

        $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(2));
        //$('#lblDiscountPercentage').text(parseFloat(_DiscountPercentage).toFixed(2));
    }
    else {
        $('#lblTotalItems').text('0.00');
        $('#lblTotalTaxesItem').text('0.00');
        $('#lblDiscountValue').text('0.00');
        $('#lblPriceValue').text('0.00');
        $('#lblLocalPriceValue').text('0.00');
        $('#lblDiscountValue').text('0.00');
        //$('#lblDiscountPercentage').text('0.00');
    }

    FadePageCover(false);
}


//function CalculateAll() {
//    debugger;
//    FadePageCover(true);
//    var TotalItemsPrice = 0.00;
//    var TotalTaxesPrice = 0.00;
//    if ($('#tblItems > tbody > tr').length > 0) {
//        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {

//            TotalItemsPrice = ((TotalItemsPrice * 1) + (GetItemAmount(tr_items) * 1)).toFixed(2);

//            $('#lblTotalItems').text(TotalItemsPrice);

//            if ($('#tblItems > tbody > tr').length - 1 == i_items) {

//                CalculateTotalExpenses(function () {

//                    if ($('#tblTaxes> tbody > tr').length > 0) {
//                        $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {

//                            TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(2);
//                            if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
//                                $('#lblTotalTaxes').text(TotalTaxesPrice);
//                                CalculateFinalAmount();
//                                // $('#lblNetPriceValue').text($('#lblTotalItems').text());
//                                FadePageCover(false);

//                            }
//                        });
//                    }
//                    else {

//                        $('#lblTotalTaxes').text('0.00');
//                        CalculateFinalAmount();
//                        FadePageCover(false);
//                    }

//                });

//            }





//        });

//    }
//    else {
//        $('#lblTotalItems').text('0.00')
//        CalculateTotalExpenses(function () {

//            if ($('#tblTaxes> tbody > tr').length > 0) {
//                $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {

//                    TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(2);
//                    if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
//                        $('#lblTotalTaxes').text(TotalTaxesPrice);
//                        CalculateFinalAmount();
//                        FadePageCover(false);
//                    }
//                });
//            }
//            else {

//                $('#lblTotalTaxes').text('0.00');
//                CalculateFinalAmount();

//                FadePageCover(false);
//            }

//        });



//    }

//}

function CalculateFinalAmount() {
    debugger;
    $('#lblNetPriceValue').text(($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1).toFixed(2));
    //  $('#lblTotalTaxes').text(($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1).toFixed(2));
    GetTotalServicesOnly();

    // if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {




    if ($('#cbRatio').is(':checked') == false && $('#cbRatioVat').is(':checked') == false) {
        var _AmountTax = 0;
        var _TotalForTax = 0;
        //$($('#tblItems > tbody > tr')).each(function (i, tr) {
        //    _AmountTax += ($(tr).find('td.TaxRatio').find('.input_Ratio').val() * ($(tr).find('td.Qty').find('.input_quantity').val() * $(tr).find('td.UnitPrice').find('.input_unitprice').val()) / 100);

        //});
        _AmountTax = $('#txtVat').val().trim() * 1;
        //var _DiscountValue = $('#txtDiscount').val().trim() * $('#lblNetPriceValue').text() / 100;
        var _DiscountValue = $('#txtDiscount').val().trim() * 1;

        // var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1) / 100;
        var _Amount = ($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1);
        // var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100))-_AmountTax;
        var _DiscountPercentage = $('#txtDiscount').val();
        var _FinalAmount = (_Amount + _AmountTax) - _DiscountPercentage;

        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        var _taxTotal = (_AmountTax);
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate, _taxTotal);


    }
    else if ($('#cbRatio').is(':checked') == true && $('#cbRatioVat').is(':checked') == true) {
        var _AmountTax = 0;
        var _TotalForTax = 0;

        debugger;
        $($('#tblItems > tbody > tr')).each(function (i, tr) {
            _TotalForTax += ($(tr).find('td.Qty').find('.input_quantity').val() * $(tr).find('td.UnitPrice').find('.input_unitprice').val());

        });
        _AmountTax = (($('#txtVat').val().trim() * 1) * _TotalForTax) / 100;
        //_AmountTax = $('#txtVat').val().trim();
        var _DiscountValue = $('#txtDiscount').val().trim() * $('#lblNetPriceValue').text() / 100;
        // var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1) / 100;
        var _Amount = ($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1);
        // var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100))-_AmountTax;
        var _DiscountPercentage = $('#txtDiscount').val();
        var _FinalAmount = (_Amount + _AmountTax) - _DiscountValue;
        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        var _taxTotal = (_AmountTax);
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate, _taxTotal);
    }
    else if ($('#cbRatio').is(':checked') == true && $('#cbRatioVat').is(':checked') == false) {
        var _AmountTax = 0;
        var _TotalForTax = 0;

        debugger;
        //$($('#tblItems > tbody > tr')).each(function (i, tr) {
        //    _TotalForTax += ($(tr).find('td.Qty').find('.input_quantity').val() * $(tr).find('td.UnitPrice').find('.input_unitprice').val());

        //});
        _AmountTax = ($('#txtVat').val().trim() * 1);
        //_AmountTax = $('#txtVat').val().trim();
        var _DiscountValue = $('#txtDiscount').val().trim() * $('#lblNetPriceValue').text() / 100;
        // var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1) / 100;
        var _Amount = ($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1);
        // var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100))-_AmountTax;
        var _DiscountPercentage = $('#txtDiscount').val();
        var _FinalAmount = (_Amount + _AmountTax) - _DiscountValue;
        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        var _taxTotal = (_AmountTax);
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate, _taxTotal);
    }
    else if ($('#cbRatio').is(':checked') == false && $('#cbRatioVat').is(':checked') == true) {
        var _AmountTax = 0;
        var _TotalForTax = 0;
        debugger;
        $($('#tblItems > tbody > tr')).each(function (i, tr) {
            _TotalForTax += ($(tr).find('td.Qty').find('.input_quantity').val() * $(tr).find('td.UnitPrice').find('.input_unitprice').val());

        });
        _AmountTax = (($('#txtVat').val().trim() * 1) * _TotalForTax) / 100;
        //var _DiscountValue = $('#txtDiscount').val().trim() * $('#lblNetPriceValue').text() / 100;
        var _DiscountValue = $('#txtDiscount').val().trim() * 1;

        // var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1) / 100;
        var _Amount = ($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1);
        // var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100))-_AmountTax;
        var _DiscountPercentage = $('#txtDiscount').val();
        var _FinalAmount = (_Amount + _AmountTax) - _DiscountPercentage;

        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        var _taxTotal = (_AmountTax);
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate, _taxTotal);
    }
}


function FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate, _taxTotal) {
    debugger;
    GetTotalItemsOnly();
    GetTotalServicesOnly();
    console.log(_Amount);
    console.log(_DiscountValue);
    console.log(_DiscountPercentage);
    console.log(_FinalAmount);
    console.log(_ExchangeRate);
    console.log(_taxTotal);
    $('#lblPriceValue').text(parseFloat(_FinalAmount).toFixed(2));
    $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(2));
    $('#lblDiscountPercentage').text(parseFloat(_DiscountPercentage).toFixed(2));
    $('#lblLocalPriceValue').text((parseFloat((_FinalAmount * 1)).toFixed(2) * parseFloat((_ExchangeRate * 1)).toFixed(2)));
    //$('#lblTotalTaxesItem').text(parseFloat(_taxTotal).toFixed(2) * parseFloat((_ExchangeRate * 1)).toFixed(2));
    $('#lblTotalTaxesItem').text(parseFloat(_taxTotal).toFixed(2));

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
                        //        $("#btnSave").attr("onclick", "PS_InvoicesTemp_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "PS_InvoicesTemp_Save(true);");

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
var AHMED = 0;
$('#slDisbursementJobs').on('change', function () {
    debugger;
    $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $(this).val() }, function (Result) {
        if (Result.length > 0) {
            debugger;
            $.each(JSON.parse(Result), function (i, item) {
                AHMED = item.JobNumber;
                $("#txtNotes").val(item.Client_Name + " job no : " + item.JobNumber);

            }


        );
        }

    });

});

function JobSearch() {
    debugger;
    if ($("#txtExchangeRate").val() == 0)
        swal("Sorry", "Exchange rate can not be 0.");
    else if (ValidateForm("form", "VoucherModal")) {
        ClearAll("#div-JobModel");
        jQuery("#div-JobModel").modal("show");
        PortJob_Inti();
    }
}
function PortJob_Inti() {
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "JobNumber";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                     FillListFromObject(null, 16/*pName*/, "Select Vessel", "SlVessel_IDS", pData[3], null);
                     FillListFromObject(null, 2/*pName*/, "Select Client", "SlClient", pData[2], null);
                     FillListFromObject(null, 18/*pName*/, "Select Port Name", "SlPortName", pData[4], null);
                 });
}

function PortJob_BindTableRows(pTableRows) {


    debugger;
    $("#hl-menu-DASJobs").parent().addClass("active");
    ClearAllTableRows("tblJobs");
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblJobs",
                    ("<tr ID='" + item.DisbursementJob_ID + "' ondblclick='PortJob_EditByDblClick(" + item.DisbursementJob_ID + ");'>"

                    + "<td class='DisbursementJob_ID hide'> <input name='Delete' id='" + item.DisbursementJob_ID + "' type='checkbox' value='" + item.DisbursementJob_ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='InquiryNumber hide' style=text-transform:uppercase' >" + item.InquiryNumber + "</td>"
                     + "<td class='JobNumber' style=text-transform:uppercase' >" + item.JobNumber + "</td>"
                    + "<td class='IssueDate' style=text-transform:uppercase' >" + ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) + "</td>"
                    + "<td class='OwnerName' style=text-transform:uppercase' >" + item.OwnerName + "</td>"
                    + "<td class='Vessel_Name text-overflow-150' title='" + item.Vessel_Name + "'>" + item.Vessel_Name + "</td>"
                    + "<td class='ETA_PortName' style=text-transform:uppercase' >" + item.ETA_PortName + "</td>"
                  // + "<td class='Vessel_Name' style=text-transform:uppercase' >" + item.Vessel_Name + "</td>"
                    + "<td class='JobType' style=text-transform:uppercase' >" + item.JobType + "</td>"
                    + "<td class='Voyage hide' style=text-transform:uppercase' >" + item.VoyageNumber + "</td>"
                    + "<td class='CharterName hide' style=text-transform:uppercase' >" + item.CharterName + "</td>"
                    + "<td class='NominatoreName hide' style=text-transform:uppercase' >" + item.NominatoreName + "</td>"
                    + "<td class='CargoOperatorName hide' style=text-transform:uppercase' >" + item.CargoOperatorName + "</td>"
                    //+ "<td class=''><a href='#InvoiceTemplateModalCopy' data-toggle='modal' onclick='CopyTemplate(" + item.ID + "," + item.IsDefault + "," + item.PortID + "," + item.IsClosed + ", " + item.InvoiceTypeID + ");' " + " class='btn btn-xs btn-rounded btn-lightblue' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>" + "</a></td>"

                    ///////////////sherif
                    //+ "<td class=''><a href='#' data-toggle='modal' onclick='InvoiceTemplate_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJobs", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteJobID");
    //HighlightText("#tblJobs>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PortJob_EditByDblClick(jobID) {
    debugger;
    $("#slDisbursementJobs").val(jobID);
    $.getJSON("/api/Voucher/GetListJobNotes", { pWhereClause: jobID }, function (Result) {
        if (Result) {
            debugger;
            $("#txtNotes").val(Result[0]);

        }

    });
    jQuery("#div-JobModel").modal("hide");
}
function portJobs_LoadingWithPaging() {
    debugger;
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = PortJob_GetWhereClause();
    var pOrderBy = "Estimation_ID";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                 });
}

function PortJob_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 and IsClosed=0  ";
    // var pWhereClause = " WHERE 1=1 and JobType='P' and IsClosed=0  ";
    if ($("#txJobNumberSrch").val().trim() != "") {
        pWhereClause += " and JobNumber like N'%" + $("#txJobNumberSrch").val().trim() + "%' ";
    }
    if ($("#txtJobTypeSrch").val().trim() != "") {
        pWhereClause += " and JobType like N'%" + $("#txtJobTypeSrch").val().trim() + "%' ";
    }
    if ($("#SlVessel_IDS").val() != 0) {
        pWhereClause += " and Vessel_ID=" + $("#SlVessel_IDS").val();
    }
    if ($("#SlClient").val() != 0) {
        pWhereClause += " and OwnerID=" + $("#SlClient").val();
    }
    if ($("#SlPortName").val() != 0) {
        pWhereClause += " and ETA_Port_ID=" + $("#SlPortName").val();
    }
    if ($("#cbIsDateFilter").prop('checked') == true) {
        if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != "") {

            pWhereClause += " and cast( IssueDate as date) between '" + ConvertDateFormat($("#txtFromDate").val()) + "' and ";
            pWhereClause += "  '" + ConvertDateFormat($("#txtToDate").val()) + "' ";
        }
    }

    return pWhereClause;
}

function PortBtnSearchJob_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 and IsClosed=0  ";
    // var pWhereClause = " WHERE 1=1 and JobType='P' and IsClosed=0  ";
    if ($("#txJobNumberSrch").val().trim() != "") {
        pWhereClause += " and txJobNumberSrch like N'%" + $("#txJobNumberSrch").val().trim() + "%' ";
    }
    if ($("#txtJobTypeSrch").val().trim() != "") {
        pWhereClause += " and JobType like N'%" + $("#txtJobTypeSrch").val().trim() + "%' ";
    }
    if ($("#SlVessel_IDS").val() != 0) {
        pWhereClause += " and Vessel_ID=" + $("#SlVessel_IDS").val();
    }
    if ($("#SlClient").val() != 0) {
        pWhereClause += " and OwnerID=" + $("#SlClient").val();
    }
    if ($("#SlPortName").val() != 0) {
        pWhereClause += " and ETA_Port_ID=" + $("#SlPortName").val();
    }
    if ($("#cbIsDateFilter").prop('checked') == true) {
        if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != "") {

            pWhereClause += " and cast( IssueDate as date) between '" + ConvertDateFormat($("#txtFromDate").val()) + "' and ";
            pWhereClause += "  '" + ConvertDateFormat($("#txtToDate").val()) + "' ";
        }
    }

    return pWhereClause;
}

function PortJob_ClearAllControls() {
    debugger;
    ClearAll("#JobModal");
    $("#liJob").siblings().removeClass("active");
    $("#liJob").addClass("active");
    $("#divJob").siblings().removeClass("active");
    $("#divJob").addClass("active");

    $("#btnSave").attr("onclick", "PortJob_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
}

function PortJobSearch_LoadingWithPaging(pPageNo, pPageSize) {
    debugger;


    var pWhereClause = PortBtnSearchJob_GetWhereClause();
    var pPageSize = $('#select-page-size1').val();
    var pPageNumber = pPageNo;
    var pOrderBy;
    pOrderBy = "JobNumber";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNo, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PortJob_BindTableRows(JSON.parse(pData[0])); });

}

$('input[type=checkbox][name=cbIsDateFilter]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#txtFromDate").removeAttr("disabled");
        $("#txtToDate").removeAttr("disabled");
    }
    else {
        $("#txtFromDate").attr("disabled", "disabled");
        $("#txtToDate").attr("disabled", "disabled");
    }
});

function PortJob_BtnSearchInti() {
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "JobNumber";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                     FillListFromObject(null, 16/*pName*/, "Select Vessel", "SlVessel_IDS", pData[3], null);
                     FillListFromObject(null, 2/*pName*/, "Select Client", "SlClient", pData[2], null);
                     FillListFromObject(null, 18/*pName*/, "Select Port Name", "SlPortName", pData[4], null);
                 });
}


function UploadExcel() {
    debugger;

    //  else {
    // Checking whether FormData is available in browser
    if (window.FormData !== undefined) {

        FadePageCover(true);

        var fileUpload = $("#excelfile").get(0);
        //var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        // Create FormData object
        var fileData = new FormData();

        // Looping over all files and add it to FormData object
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }



        var pParametersWithValues = {
           File: fileData
        };


        //,JSON.stringify(pParametersWithValues)
        $.ajax({
            url: '/Purchasing/UploadInvoicesFiles',
            type: "POST",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            data: fileData,
            success: function (result) {
                if (result != 'File Uploaded Successfully!') {
                    FadePageCover(false);
                    $('#excelfile').val("");
                    //  swal(strSorry, result);
                    alert(result);
                }
                else {
                    //alert(result);
                    jQuery("#I_ExcelModal").modal("hide");
                    ClearAll("#I_ExcelModal");
                    $('#excelfile').val("");

                     PS_InvoicesTemp_LoadingWithPaging();
                    swal("Success", "Saved successfully.");
                }

            },
            error: function (err) {
                alert(err.statusText);
                // swal(strSorry, err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
    // }


}



function SetWithHolding() {
    if ($("#slTaxType").val()!="1") {
        if ($("#slTaxType").val() == "2") {
            $('#txtDiscount').val("3");
            $('#cbRatio').prop('checked', true);
            CalculateAll();
        }
        else if ($("#slTaxType").val() == "3") {
            $('#txtDiscount').val("1");
            $('#cbRatio').prop('checked', true);
            CalculateAll();


        }
        else if ($("#slTaxType").val() == "4") {
            $('#txtDiscount').val("5");
            $('#cbRatio').prop('checked', true);
            CalculateAll();


        }
    }
}
function UploadExcel() {
    debugger;

    //  else {
    // Checking whether FormData is available in browser
    if (window.FormData !== undefined) {

        FadePageCover(true);

        var fileUpload = $("#excelfile").get(0);
        //var fileUpload = $("#FileUpload1").get(0);
        var files = fileUpload.files;

        // Create FormData object
        var fileData = new FormData();

        // Looping over all files and add it to FormData object
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object
        //fileData.append('pJournal_ID', 1);
        //fileData.append('pJVType_ID', 1);
        //fileData.append('pReceiptNo', 1);
        //fileData.append('pRemarksHeader', 1);
        //fileData.append('pJVDate', ConvertDateFormat($("#txtFromDate_Filter").val()));

        //var pParametersWithValues = {
        //    //HeaderData
        //    pID: ($("#hID").val() == "" ? 0 : $("#hID").val())
        //    , pJVNo: $("#txtJVNo").val().trim().toUpperCase()
        //    , pJVDate: ConvertDateFormat($("#txtJVDate").val())
        //    , pTotalDebit: 0.0
        //    , pTotalCredit: 0.0
        //    , pJournal_ID: $("#slJournalType").val()
        //    , pJVType_ID: $("#slJVType").val()
        //    , pReceiptNo: ($("#txtReceiptNo").val().trim() == "" ? "0" : $("#txtReceiptNo").val().trim().toUpperCase())
        //    , pRemarksHeader: ($("#txtRemarksHeader").val() == "" ? "0" : $("#txtRemarksHeader").val().trim().toUpperCase())
        //    , pDeleted: false
        //    , pPosted: false
        //    , File: fileData
        //};


        //,JSON.stringify(pParametersWithValues)
        $.ajax({
            url: '/Accounting/UploadInvoicesFromExcel',
            type: "POST",
            contentType: false, // Not to set any content header
            processData: false, // Not to process data
            data: fileData,
            success: function (result) {
                if (result != 'Invoices uploaded and saved successfully.') {
                    FadePageCover(false);
                    $('#excelfile').val("");
                    $('#tblExcel').html('');
                    //  swal(strSorry, result);
                    PS_InvoicesTemp_LoadingWithPaging();

                    //alert(result);
                    swal(strSorry, result);
                }
                else {
                    //alert(result);
                    jQuery("#I_ExcelModal").modal("hide");
                    jQuery("#PS_InvoicesTempModal").modal("hide");
                    ClearAll("#PS_InvoicesTempModal");
                    ClearAll("#I_ExcelModal");
                    $('#excelfile').val("");
                    $('#tblExcel').html('');

                    PS_InvoicesTemp_LoadingWithPaging();
                    swal("Success", "Saved successfully.");
                }

            },
            error: function (err) {
                alert(err.statusText);
                // swal(strSorry, err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }
    // }


}
