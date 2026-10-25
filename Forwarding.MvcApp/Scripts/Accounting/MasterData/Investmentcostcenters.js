var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00;
var _TotalExpenses = 0.00;
var _TotalTaxes = 0.00;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
//#region Public
function SL_HideShowEditBtns(IsApproved , HasTransactions)
{
    debugger;
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;
    if (IsApproved == true || HasTransactions == true ) {
        $('.Edit-btn').addClass('hide');
        $('.Edit-input').prop('disabled', true);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', true);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', true);
        $("#tblWasataDetails").find("input,button,textarea,select").prop('disabled', true);
    }
    else {
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', false);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', false);
        $("#tblWasataDetails").find("input,button,textarea,select").prop('disabled', false);

    }
}

function RecalculateExchangeRate()
{
    var currencyid =  $('#slCurrencyID').val();
    $.ajax({
        type: "GET",
        url: strServerURL + "api/SL_Invoices/IntializeData",
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
    debugger;
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    WasataDetailsRowsCounter = 0;

    _IsApproved = false;
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    $('#tblWasataDetails > tbody').html('');

    $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
    $("#hID").val("");
    $('#txtInvoiceNo').val("Auto");
    $('#slClientID').val("0");
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
    $('#lblTotalTaxesItem').text("0.00");

    

   // $('#txtDiscount').inputmask('decimal', { digits: 2 });
    $('#txtDiscount').val('0');
    $.ajax({
        type: "GET",
        url: strServerURL + "api/Investmentcostcenters/IntializeData",
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

function SL_ClientDbtCrdtNotes_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SL_InvoicesModal", null);
    $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
    _IsApproved = false;
    _HasTransactions = false;
    _JVID = 0;
    IntializeData();

}

function LoadInvoiceDetails()
{
    debugger;
    LoadAll("/api/ClientDbtCrdtNotes/LoadDetails", "where DbtCrdtNoteID = " + $('#hID').val(), function (pTabelRows) {
        SL_DbtCrdtNotes_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


        setTimeout(function () {
            //CalculateAll();
            SL_HideShowEditBtns(_IsApproved, _HasTransactions);
    }, 300);

    });
}
function PrintInvoice(InvID)
{
    debugger;
    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    //LoadAll("/api/SL_Reports/LoadInvoiceDetails", "where ID = " + InvID, function (data) {
    LoadAll("/api/ClientDbtCrdtNotes/Print", InvID, function (data) {

        var pReportTitle = "Invoice";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
       

      
       // console.log(_Details);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var TotalExpenses = 0.00;
        var TotalTaxes = 0.00;
        var _InvCode = "";
        var _InvDate = "";
        var _InvCustomer = "";
        var _InvNotes = "";
        var _InvDiscount = "";
        var _InvCurrency = "";
        var _InvTotal = 0;
        var _BankName = "";
        var _Acc_Number = "";
        var _Address = "";
        var _SwiftCode = "";

       

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>Description</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass +'">Unit Price</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass +'">Quantity</th>';
        pTablesHTML += '<th>Amount</th>';
        pTablesHTML += '<th>Notes</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item)
        {
            var name = '';
            TotalAmount = parseFloat(TotalAmount + item.Amount);
            if (item.D_ItemID != null &&  item.D_ItemID != 0)
            {
                name = item.Amount;
                HasItems = true;
            }
            else
            {
                name = item.Amount;
            }
            
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.Name).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Name).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Name).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.DbtCrdtNoteDate);
                _InvCode = item.Code;
                _InvCustomer = item.Name;
                _InvNotes = item.Notes;
                _InvCurrency = item.ExpensesNme;
                _InvTotal = item.JobNumber;
            }
        });
        pTablesHTML += '</tbody></table>';

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      
        //if ($(_Expenses).length > 0)
        //{
        //    pTablesHTML += '<div class="row">';
        //    pTablesHTML += '<div class="col-xs-12">';
        //    pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
        //    pTablesHTML += '<caption><b>Expenses</b></caption>';
        //    pTablesHTML += '<thead>';
        //    pTablesHTML += '<th>Desc</th>';
        //    pTablesHTML += '<th>Amount</th>';
        //    pTablesHTML += '</thead>';
        //    pTablesHTML += '<tbody>';
        //    //hExportedTable
        //    $(_Expenses).each(function (i, item) {
        //        TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount );
        //        pTablesHTML += '<tr>';
        //        pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
        //        pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
        //        pTablesHTML += '</tr>';

        //        if ($(_Expenses).length - 1 == i) {
        //            _InvDate = GetDateFromServer(item.InvoiceDate);
        //            _InvCode = item.InvoiceNo;
        //            _InvCustomer = item.CustomerName;
        //            _InvNotes = item.Notes;
        //            _InvCurrency = item.CurrencyCode;
        //            _InvTotal = item.TotalPrice;
        //            _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
        //            pTablesHTML += '<tr>';
        //            pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">EXP.. : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
        //            pTablesHTML += '</tr>';
        //        }
        //    });
        //    pTablesHTML += '</tbody></table>';
        //    pTablesHTML += '</div></div>';
        //}
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        //if ($(_Taxes).length > 0) {
        //    pTablesHTML += '<div class="row">';
        //    pTablesHTML += '<div class="col-xs-12">';
        //    pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
        //    pTablesHTML += '<caption><b>Taxes</b></caption>';
        //    pTablesHTML += '<thead>';
        //    pTablesHTML += '<th>Tax</th>';
        //    pTablesHTML += '<th>Amount</th>';
        //    pTablesHTML += '</thead>';
        //    pTablesHTML += '<tbody>';
        //    //hExportedTable
        //    $(_Taxes).each(function (i, item) {
        //        TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
        //        pTablesHTML += '<tr>';
        //        pTablesHTML += '<td>' + item.Name + '</td>';
        //        pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
        //        pTablesHTML += '</tr>';

        //        if ($(_Taxes).length - 1 == i)
        //        {
        //            pTablesHTML += '<tr>';
        //            pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">Taxes : ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
        //            pTablesHTML += '</tr>';
        //        }



        //    });
        //    pTablesHTML += '</tbody></table>';
        //    pTablesHTML += '</div>';
        //    pTablesHTML += '</div>';
        //}
        ////xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        

        //************** TOTAL Summary *************************
        pTablesHTML += '<div class="row" >';
        pTablesHTML += '<div class="col-xs-8"><b>';
        pTablesHTML += _Details.Code + "<br>";
        pTablesHTML += (_InvNotes == "0" ? "" : _InvNotes)
        pTablesHTML += '</b></div>';
        pTablesHTML += '<div class="col-xs-4 "  >';
        pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
        if (parseFloat( _InvDiscount ) > 0)
        pTablesHTML += "<b> Discount : " + _InvDiscount + "</b><br>";
        pTablesHTML += "<b> Total : " + _InvTotal + " " + _InvCurrency + "</b><br>";
        //pTablesHTML += " <b style='text-decoration: underline overline;'>" + toWords_WithFractionNumbers(_InvTotal.toFixed(2)) + " " + _InvCurrency + "</b>";
        pTablesHTML += "</div>";

        pTablesHTML += '</div>';
        pTablesHTML += '</div>';
        ReportHTML += "<br/>";
        pTablesHTML += "<br/>";
     
        //**************** Footer *******************************

        //pTablesHTML += '<div class="row" >';

        //pTablesHTML += '<div class="col-xs-12"><b>';
        //pTablesHTML += '<div class="col-xs-6"><b>';
        //    pTablesHTML += '<table id="tblfooter1" style="" class="table table-striped text-sm table-bordered" >';
        //    pTablesHTML += '<tbody>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td colspan="2">' + 'OTHER COMMENTS :' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Payment Terms :' + '</td>';
        //    pTablesHTML += '<td>' + 'Credit period is 7 days from receiving the invoice' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Banking charges:' + '</td>';
        //    pTablesHTML += '<td>' + 'invoice amount excluding and banking charges' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '</tbody></table>';
        //pTablesHTML += '</div>';


        //pTablesHTML += '<div class="col-xs-6"><b>';
        //    pTablesHTML += '<table id="tblfooter2" style="" class="table table-striped text-sm table-bordered" >';
        //    pTablesHTML += '<tbody>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td colspan="2">' + 'Tax Details' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Commercial Register:' + '</td>';
        //    pTablesHTML += '<td>' + '10717' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Tax Card:' + '</td>';
        //    pTablesHTML += '<td>' + '202-606-384' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Tax ID:' + '</td>';
        //    pTablesHTML += '<td>' + '5-01462-555-00-00' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '</tbody></table>';
        //pTablesHTML += '</div>';
        //pTablesHTML += '</div>';

        //pTablesHTML += '<div class="col-xs-12"><b>';
        //pTablesHTML += '<div class="col-xs-7"><b>';
        //    pTablesHTML += '<table id="tblfooter2" style="" class="table table-striped text-sm table-bordered" >';
        //    pTablesHTML += '<tbody>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td colspan="2">' + 'Payment Details :' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Company Name :' + '</td>';
        //    pTablesHTML += '<td>' + '" Safina Shipping Agency "' + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Bank Name :' + '</td>'; 
        //    pTablesHTML += '<td>' + _BankName + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Bank Account No. :' + '</td>';
        //    pTablesHTML += '<td>' + _Acc_Number + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Bank Branch Address :' + '</td>';
        //    pTablesHTML += '<td>' + _Address + '</td>';
        //    pTablesHTML += '</tr>';
        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + 'Swift Code' + '</td>';
        //    pTablesHTML += '<td>' + _SwiftCode + '</td>';
        //    pTablesHTML += '</tr>';

        //    pTablesHTML += '</tbody></table>';
        //pTablesHTML += '</div>';

        //pTablesHTML += '<div class="col-xs-5"><b>';
        //pTablesHTML += "<b style='float:left'> Except Forgetfulness And error</b><br>";
        //pTablesHTML += '</div>';

        //pTablesHTML += '</div>';
        //pTablesHTML += '<div class="col-xs-12"><b>';

        //pTablesHTML += '<div class="col-xs-6"><b>';
        //pTablesHTML += "<b style='float:right'> Accountant</b><br>"
        //pTablesHTML += '</div>';

        //pTablesHTML += '<div class="col-xs-6"><b>';
        //pTablesHTML += "<b style='float:left'> Accounting Manager</b><br>";
        //pTablesHTML += '</div>';

        //pTablesHTML += '</div>';
        //pTablesHTML += '</div>';

        ////*******************************************************

        //$('#hExportedTable').html(pTablesHTML);

        //if (!HasItems)
        //{
        //    $('.ForItems').addClass('hide');

        //}


         
        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';


        ReportHTML += '                 <div class="col-xs-6"><b>Company: </b> ' + _InvCustomer + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>Inv NO: </b> ' + _InvCode + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>Inv.Date: </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-6"><b>Printed On :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
  
        ReportHTML += "<br/>";

        //if ($('#slInvoiceType').val() == 1) {
        //    $(_Wasata).each(function (i, item)
        //    {
        //        ReportHTML += '         <body style="background-color:white;">';
        //        //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';
        //        //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + _InvCustomer + ' No. ' + _InvCustomer + '</h3></div>';

        //        //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

        //        ReportHTML += '             <div style="clear:both;"></div>';

        //        ReportHTML += '             <div class="col-xs-12">'
        //        ReportHTML += '                 <table class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
        //        ReportHTML += '                     <thead>';
        //        ReportHTML += '                         <td>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Customer Name :</b> ' + item.Name + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Vessel :</b> ' + item.Vessel_Name + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Port Name :</b> ' + item.Name + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Arrival Date :</b> ' + item.IssueDate + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>DisCharge Port :</b> ' + item.Name + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Bill Account No :</b> ' + item.BillCount + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Bill Number :</b> ' + item.BillNo + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Cargo Weight: ' + '</b>' + item.Cargo + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>from : ' + '</b>' + item.FromMr + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Voyage No : ' + '</b>' + item.VoyageNo + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Delivery Voyage No : ' + '</b>' + item.VoyageNo + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Navigation Line : ' + '</b>' + item.CargoName + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Cargo Descreption : ' + '</b>' + item.Name + '</div>';
        //        ReportHTML += '                             <div class="col-xs-2 text-left"><b>Job Number : ' + '</b>' + item.JobNumber + '</div>';
        //        ReportHTML += '                         </td>';
        //        ReportHTML += '                     </thead>';
        //        ReportHTML += '                 </table>';
        //        ReportHTML += '             </div>';

        //        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
        //        ReportHTML += '             <div class="col-xs-12">';
        //        ReportHTML += '             </div>';
        //        //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';

        //        ReportHTML += '             </div>';

        //        ReportHTML += '         </body>';
        //    });

        //}
        //    //  ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';

        //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
      //  ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
        ReportHTML += '                         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
    });
}
function SL_ClientDbtCrdtNotes_BindTableRows(pTabelRows) {
    debugger;

    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(pTabelRows, function (i, item) {


        debugger;
        AppendRowtoTable("tblItems",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
               + " <td class='btn-lightblue' style='font-size:15px;'> C </td>"
                + "<td class='ID hide'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
               // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button input name='Delete' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) +item.CostCenterPercentageID+ ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

               + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                + "<td class='CostCenterName' val='" + item.CostCenterName + "'>" + "<input tag='" + item.CostCenterName + "'   type='text' class='input_CostCenterName input-sm  col-sm'>" + "</td>"
                + "<td class='Part' val='" + item.Part + "'>" + "<input tag='" + item.Part + "'   type='text' class='input_Part input-sm  col-sm'>" + "</td>"
                + "<td class='PartRatio' val='" + item.PartRatio + "'>" + "<input tag='" + item.PartRatio + "'   type='text' class='input_PartRatio input-sm  col-sm'>" + "</td>"
                + "<td class='Value' val='" + item.Value + "'>" + "<input tag='" + item.Value + "'   type='text' class='input_Value input-sm  col-sm'>" + "</td>"

               //+ "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                + "</tr>"));

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;

    });
    setTimeout(function () {
        FillItemsData();
       // CalculateFinalAmount();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);
}

function SL_ClientDbtCrdtNotes_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#SL_InvoicesModal").modal("show");
    SL_Invoices_FillControls(pID);
}

//function SL_Invoices_LoadingWithPaging() {
//    debugger;
//    var WhereClause = "Where 1=1";

//    if ($('#txtInvoiceNo_Filter').val().trim() != "")
//    {
//        WhereClause += " AND InvoiceNo LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
//    }
//    if ($('#txtTotalPrice_Filter').val().trim() != "") {
//        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
//    }
//    if ($('#slClients_Filter').val().trim() != "0") {
//        WhereClause += " AND ClientID = " + $('#slClients_Filter').val() + "";
//    }
//    if ($('#slCurrency_Filter').val().trim() != "0") {
//        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
//    }
//    if ($('#txtFromDate_Filter').val().trim() != "") {
//        WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
//    }
//    if ($('#txtToDate_Filter').val().trim() != "") {
//        WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
//    }

//    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ClientDbtCrdtNotes/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_ClientDbtCrdtNotes_BindTableRows(pTabelRows); SL_ClientDbtCrdtNotes_ClearAllControls(); });
//    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
//}
function SL_ClientDbtCrdtNotes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_Invoices') != "")
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
                DeleteListFunction("/api/ClientDbtCrdtNotes/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
            });
}
//after pressing edit, this function fills the data
function SL_Invoices_FillControls(pID) {
    debugger;
    ClearAll("#SL_InvoicesModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);
    var tr = $("#tblSL_Invoices > tbody > tr[ID='" + pID + "']");
    $("#txtNo").val($(tr).find("td.Code").attr('val'));
    $("#txtDate").val($(tr).find("td.DbtCrdtNoteDate").attr('val'));
    $("#slClientID").val($(tr).find("td.ClientID").attr('val'));
    $("#slInvoice").val($(tr).find("td.InvoiceID").attr('val'));
    $("#slDisbursementJobs").val($(tr).find("td.DisbursementJob_ID").attr('val'));

    debugger;
    if ($(tr).find("td.DisbursementJob_ID").attr('val') !=0) {
        $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $(tr).find("td.DisbursementJob_ID").attr('val') }, function (Result) {
            if (Result.length > 0) {
                debugger;
                $.each(JSON.parse(Result), function (i, item) {
                    AHMED = item.JobNumber;
                    $("#txtJobVessel_Name").val(item.Vessel_Name);
                    $("#txtJobClient_Name").val(item.Client_Name);
                }
            );
            }
        });
    }
   

    $("#txtSerial").val($(tr).find("td.Serial").attr('val'));
    $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
    $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
    debugger;
   
    if ($(tr).find("td.IsDbt").attr('val') == "true") {
       
        $("#cbIsCredit").prop("checked", true);
    }
    else {
        $("#cbIsDebit").prop("checked", true);
    }

    _JVID = ($(tr).find("td.JVID").attr('val') * 1);
       $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);
   

}
var _IsApproved = false;
function GetInsertUpdateParameters()
{
    debugger;
    //var CostCenterGroupsID = $('#slCostCenterGroupsID').val();
    var CostCenterID = $('#slCostCenterID').val();
    var CostCenterID2 = $('#slCostCenterID2').val();
    var CostCenterID3 = $('#slCostCenterID3').val();
    //var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    return {
        //pID: ID,
        pCostCenterID: CostCenterID,
        pCostCenterID2: CostCenterID2,
        pCostCenterID3: CostCenterID3
        //pCostCenterGroupsID: CostCenterGroupsID
    };


}
var listOfIDs = "";
function GetAllSelectedIDs(ID) {
    debugger;
        listOfIDs += ((listOfIDs == "") ? "" : ",") + (ID);
        return listOfIDs;
        CalculateFinalAmount();
}
function SL_Invoices_Save(pSaveandAddNew)
{
    debugger;
    var _Suceess = true;
    //check if Percentage equal 100
    //if ($('#lblTotalItems_S').text() * 1 != 100) {
    //    swal('Excuse me', 'Percentage must be 100%', 'warning');
    //    _Suceess = false;
    //}

    //check if CostCenter Repeated
    //var arrayOfItems = new Array();
    //$("#tblItems>tbody>tr").each(function (i, tr) {
    //    var objItem = new Object();
    //    objItem.ID = $(tr).find('td.ID').find('.selectservice').val();
    //    if (arrayOfItems.includes($(tr).find('td.ID').find('.selectservice').val())) {
    //        swal('Cost Center already exist', $(tr).find("td.CostCenterName").attr('val'), 'warning');
    //        _Suceess = false;
    //    }
    //    else {
    //        arrayOfItems.push($(tr).find('td.ID').find('.selectservice').val());
    //    }
        
    //});
    //insert
    if (_Suceess == true) {
        InsertUpdateFunctionAndReturnID("form", "/api/Investmentcostcenters/Save",
                GetInsertUpdateParameters()
                , pSaveandAddNew, null, 1, function () {
        var ListOfListOfObject = [];
        debugger;
        //GetAllSelectedIDsAsString(function () {
        ListOfListOfObject.push(SetArrayOfItems());
        // ListOfListOfObject.push(SetArrayOfTaxes());
        InsertUpdateListOfObject("/api/Investmentcostcenters/InsertItems",
        ListOfListOfObject
        , pSaveandAddNew, "SL_InvoicesModal", function (message) {
            debugger;
            //$.ajax({
            //    type: "GET",
            //    url: "/api/Investmentcostcenters/deleteAllIDs",
            //    data: { pWhereClause: listOfIDs },
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (Result) {
            //        SL_Invoices_ClearAllControls();
                    if (message[0] == true) {
                        swal("Success", "Saved successfully");
                    }
            //    }
            //});
        });
        

        });
GetTotalPart();
        //InsertUpdateFunctionAndReturnID("form", "/api/CostCenterPercentage/Save",
        //    GetInsertUpdateParameters()
        //    , pSaveandAddNew, null, '#hID', function () {
        //        // swal($('#hID').val());, 

        //});

    }
}
function SL_Invoices_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);

    $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    ClearAllTableRows("tblItems");
    //$('#slCostCenterGroupsID option:selected').val("-1");
    //$('#slCostCenterID option:selected').val("-1");
    //$("#slCostCenterGroupsID option:selected").text() == "Select Client"
    //$("#slCostCenterID option:selected").text() == "Select CostCenter"
    $.ajax({
        type: "GET",
        url: strServerURL + "api/Investmentcostcenters/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pOnlyCurrency: false },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {

            Fill_SelectInputAfterLoadData(d[0], 'CostCenterGroupID', 'CostCenterGroupName', 'Select Client', '#slCostCenterGroupsID', '');
            //-------
            // Fill_SelectInputAfterLoadData(d[1], 'ID', 'CostCenterName', '<-- ALL CostCenter -->', '#slCostCenterID_Filter', '');
            Fill_SelectInputAfterLoadData(d[1], 'RealCostCenterCode', 'CostCenterName', 'SELECT CostCenter', '#slCostCenterID', '');
            Fill_SelectInputAfterLoadData(d[1], 'RealCostCenterCode', 'CostCenterName', 'SELECT CostCenter', '#slCostCenterID2', '');
            Fill_SelectInputAfterLoadData(d[1], 'RealCostCenterCode', 'CostCenterName', 'SELECT CostCenter', '#slCostCenterID3', '');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

 

}
function DeleteIDs(callback) {
    debugger;
    $("#tblItems>tbody>tr").each(function (i, tr) {

        $.ajax({
            type: "GET",
            url: "/api/Investmentcostcenters/deleteAllIDs",
            data: { pWhereClause: $(tr).find("td.ID").attr('val') },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Result) {

                if (i == $("#tblItems>tbody>tr").length - 1) {
                    if (callback != null && callback != undefined)
                        callback();
                }


            }
        });

    });
}
function SL_Invoices_Delete() {
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
            InsertUpdateFunction("form", "/api/ClientDbtCrdtNotes/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "SL_InvoicesModal", function (data) {
                    if (data[1].trim() == '') {
                        SL_Invoices_LoadingWithPaging();
                        IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}
var ItemsRowsCounter = 0;

//function AddNewCostCentersRow(pItems) {
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    ItemsRowsCounter = 0;
//    ClearAllTableRows("tblItems");
//    $.each(JSON.parse(pItems), function (i, item) {
      
        
//            debugger;
//            AppendRowtoTable("tblItems",
//                ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.CostCenterPercentageID + "'>"
//                    + " <td class='btn-lightblue' style='font-size:15px;'> C </td>"
//                    + "<td class='CostCenterPercentageID hide'> <input name='Delete' type='checkbox' value='" + item.CostCenterPercentageID + "' /></td>"
//                  //  + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button'onclick='GetAllSelectedIDs(" + (item.CostCenterPercentageID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + item.CostCenterPercentageID+");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.CostCenterPercentageID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='CalculateFinalAmount();' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

//                   // + "<td class='ID' val='" + item.ID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
//                    + "<td class='ID' val='" + item.ID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

//                    //+ "<td class='StoreID' val='" + 0+ "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
//                   // + "<td class='QuantityInStore' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
//                    + "<td class='Percentage' val='" + item.Percentage + "'>" + "<input tag='" + item.Percentage + "'   type='text' onchange='CalculateFinalAmount()' class='input_quantity input-sm  col-sm'>" + "</td>"
//                   + "<td class='CostCenterGroupID hide' val='" + item.CostCenterGroupID + "'>" + item.CostCenterGroupID + "</td>"
//                     + "<td class='CostCenterName hide' val='" + item.CostCenterName + "'>" + item.CostCenterName + "</td>"

//                   //+ "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
//                    + "</tr>"));
        
//        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
//        ItemsRowsCounter++;

//    });
//    setTimeout(function () {
//        FillItemsData();
//        CalculateFinalAmount();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

   
//}
//$('#slCostCenterGroupsID').on('change', function () {
//    debugger;
//    $.getJSON("/api/CostCenterPercentage/LoadWithWhereClauseCostCenters", { pWhereClause: $(this).val() }, function (pItems) {
//        if (pItems.length > 0) {
//            debugger;
//            AddNewCostCentersRow(pItems);
//        }

//    });
   
//});


//function AddNewCostCentersRow2(pItems) {
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    //ItemsRowsCounter = 0;
//  //  ClearAllTableRows("tblItems");
//    $.each(JSON.parse(pItems), function (i, item) {


//        debugger;
//        AppendRowtoTable("tblItems",
//    ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.CostCenterPercentageID + "'>"
//        + " <td class='btn-lightblue' style='font-size:15px;'> C </td>"
//        + "<td class='CostCenterPercentageID hide'> <input name='Delete' type='checkbox' value='" + item.CostCenterPercentageID + "' /></td>"
//      //  + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button'onclick='GetAllSelectedIDs(" + (item.CostCenterPercentageID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + item.CostCenterPercentageID+");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//        + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.CostCenterPercentageID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

//       // + "<td class='ID' val='" + item.ID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
//        + "<td class='ID' val='" + item.ID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

//        //+ "<td class='StoreID' val='" + 0+ "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
//       // + "<td class='QuantityInStore' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
//        + "<td class='Percentage' val='" + item.Percentage + "'>" + "<input tag='" + item.Percentage + "'   type='text' onchange='CalculateFinalAmount()' class='input_quantity input-sm  col-sm'>" + "</td>"
//       + "<td class='CostCenterGroupID hide' val='" + item.CostCenterGroupID + "'>" + item.CostCenterGroupID + "</td>"
//       + "<td class='CostCenterName hide' val='" + item.CostCenterName + "'>" + item.CostCenterName + "</td>"

//       //+ "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
//        + "</tr>"));

//        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
//        ItemsRowsCounter++;
//    });
//    setTimeout(function () {
//        FillItemsData();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

//    CalculateFinalAmount();
//}
//var id = 0;
//$('#btn-NewAddCostCenter').on('click', function () {
//    debugger;
//    $.getJSON("/api/CostCenterPercentage/A_CostCenter_ByRealCode", { pWhereClause: $('#slCostCenterID').val() }, function (pItems) {
//        if (pItems.length > 0) {
//            debugger;
//            AddNewCostCentersRow2(pItems);
//            count = 1;
//            id = $('#slCostCenterID').val();
//        }

//    });
//});
function CalculateFinalAmount()
{
    var _Amount = 0;
    debugger;
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        _Amount += $(tr).find('td.Percentage').find('.input_quantity').val() * 1;
    });
    $('#lblTotalItems_S').text(parseFloat(_Amount));
}
function AddNewItemsRow()
{
    debugger;
    // ClearAllTableRows("tblItems");
    //GetTotalCS();
        AppendRowtoTable("tblItems",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> C </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='CostCenterID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                //+ "<td class='Percentage' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateFinalAmount()'  class='input_quantity input-sm  col-sm'>" + "</td>"
                //+ "<td class='CostCenterID' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"

                + "<td class='CostCenterName' val='" + "0" + "'>" + "<input   type='text' class='input_CostCenterName input-sm  col-sm'>" + "</td>"
                + "<td class='Part' val='" + "0" + "'>" + "" + "<input   type='text' onchange='GetPartRatio($(this))' class='input_Part input-sm  col-sm'>" + "</td>"
                + "<td class='PartRatio' val='" + "0" + "'>" + "" + "<input   type='text' class='input_PartRatio input-sm  col-sm'>" + "</td>"
                + "<td class='Value' val='" + "0" + "'>" + "" + "<input   type='text' class='input_Value input-sm  col-sm'>" + "</td>"

                + "</tr>"));

    
    ItemsRowsCounter++;


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


function SL_InvoicesDetails_DeleteList() {
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
                DeleteListFunction("/api/SL_Invoices/DeleteItems", { "pSL_InvoicesDetailsIDs": GetAllSelectedIDsAsString('tblSL_InvoicesDetails') }, function () { SL_InvoicesDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(RowNumber,ID) {
    debugger;
    if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
        // CalculateAll();
        GetPartRatio();

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
                CalculateFinalAmount();
              //  CalculateAll();
            });
      
    }

}



function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData()
{
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        //$(tr).find('td.ID ').find('.selectitem').val($(tr).find('td.ID ').find('.selectitem').attr('tag'));
        $(tr).find('td.CostCenterID ').find('.selectservice').val($(tr).find('td.CostCenterID ').find('.selectservice').attr('tag'));
       //$(tr).find('td.CostCenterID ').find('.selectCostCenter').val($(tr).find('td.CostCenterID ').find('.selectCostCenter').attr('tag'));
       $(tr).find('td.CostCenterName ').find('.input_CostCenterName').val($(tr).find('td.CostCenterName ').find('.input_CostCenterName').attr('tag'));
        //$(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
       $(tr).find('td.Part').find('.input_Part').val($(tr).find('td.Part ').find('.input_Part').attr('tag'));
       $(tr).find('td.PartRatio').find('.input_PartRatio').val($(tr).find('td.PartRatio ').find('.input_PartRatio').attr('tag'));

        // $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
       $(tr).find('td.Value ').find('.input_Value').val($(tr).find('td.Value ').find('.input_Value').attr('tag'));
    });
    setTimeout(function () {
        FillComboDet()//();
        , GetTotalPart()
        , GetTotalCS();
    }, 30);
}
function FillComboDet()
{
    debugger;
    $.getJSON("/api/Investmentcostcenters/FillComboDet", { pWhereClause : " where 1 = 1" }, function (Result) {
        if (Result) {
            //var pJVsHeader = JSON.parse(Result[0])
            $("#txtCostCenterID1").val(Result[0])
            $("#txtCostCenterID2").val(Result[1])
            $("#txtCostCenterID3").val(Result[2])

            $("#slCostCenterID").val(Result[3])
            $("#slCostCenterID2").val(Result[4])
            $("#slCostCenterID3").val(Result[5])
        }

    });
}
var TotalCS = 0;

function GetTotalCS()
{
    debugger;
    LoadAll("/api/Investmentcostcenters/GetTotalCS", "WHere 1=1",function (Result) {
        if (Result) {
            TotalCS = JSON.parse(Result[0])
            //$("#txtCostCenterID1").val(Result[0])
        }
    });
}
function GetTotalPart() {
    
    debugger;
    var _Amount = 0;

    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        _Amount += ($(tr).find('td.Part').find('.input_Part').val() * 1);

    });
    $('#lblTotalItems_S').text(_Amount.toFixed(2));

}
function GetPartRatio(ITEM) {
    debugger;
    
    
    var PartRatio = 0;
    var Value = 0;
var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(ITEM).closest('tr');
    debugger;
    GetTotalPart();
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        if ($('#lblTotalItems_S').text() != "" || $('#lblTotalItems_S').text() != "Undefiend" || $('#lblTotalItems_S').text() != 0) {
            GetTotalPart();
           
            PartRatio = ($(tr).find('td.Part').find('.input_Part').val() / $('#lblTotalItems_S').text());
            $(tr).find('td.PartRatio input[type="text"]').val(PartRatio);

            Value = TotalCS * $(tr).find('td.PartRatio input[type="text"]').val();
            $(tr).find('td.Value input[type="text"]').val(Value);
        }
        else {
            GetTotalPart();
            PartRatio = ($(tr).find('td.Part').find('.input_Part').val() / 1);
            $(tr).find('td.PartRatio input[type="text"]').val();
            $(tr).find('td.Value input[type="text"]').val(Value);

        }
    });
    //$(tr).find('td.PartRatio input[type="text"]').val(PartRatio);
    //$(tr).find('td.Value input[type="text"]').val(TotalCS * $(tr).find('td.PartRatio input[type="text"]').val(PartRatio));
}
//function GetTaxRate(ITEM) {
//    debugger;
//    var tr = null;
//    if ($(ITEM).is('tr'))
//        tr = ITEM;
//    else
//        tr = $(ITEM).closest('tr');

//    debugger;
//    if (TotalCS > 0) {
//        //var TaxRate = (100 * parseFloat($(tr).find('td.TaxValue input[type="text"]').val())) / (parseFloat($(tr).find('td.Net input[type="text"]').val()))
//        //$(tr).find('td.Rate input[type="text"]').val(TaxRate);
//        $(tr).find('td.NetBalance input[type="text"]').val(parseFloat($(tr).find('td.Net input[type="text"]').val()) - parseFloat($(tr).find('td.TaxValue input[type="text"]').val()));

//    }
//    else {
//        //$(tr).find('td.Value input[type="text"]').val("0");
//        $(tr).find('td.Rate input[type="text"]').val("0");
//        $(tr).find('td.NetBalance input[type="text"]').val(parseFloat($(tr).find('td.Net input[type="text"]').val()) - parseFloat($(tr).find('td.TaxValue input[type="text"]').val()));

//    }

//}
function SL_DbtCrdtNotes_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item)
    {

            debugger;
            AppendRowtoTable("tblItems",
                ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> C </td>"
                    + "<td class='ID hide'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
                   // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button input name='Delete' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) +item.CostCenterPercentageID+ ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "'type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

                   + "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.CostCenterID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                    + "<td class='CostCenterName' val='" + item.CostCenterName + "'>" + "<input tag='" + item.CostCenterName + "'   type='text' class='input_CostCenterName input-sm  col-sm'>" + "</td>"
                    + "<td class='Part' val='" + item.Part + "'>" + "<input tag='" + item.Part + "'   type='text' class='input_Part input-sm  col-sm'>" + "</td>"
                    + "<td class='PartRatio' val='" + item.PartRatio + "'>" + "<input tag='" + item.PartRatio + "'   type='text' class='input_PartRatio input-sm  col-sm'>" + "</td>"
                    + "<td class='Value' val='" + item.Value + "'>" + "<input tag='" + item.Value + "'   type='text' class='input_Value input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        
      //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
       // $("#tblItems").find("select").attr('onchange', 'CalculateAll();');
     //   $("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');
        
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
      //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}

function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/ClientDbtCrdtNotes/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Invoices_BindTableRows(pTabelRows); SL_Invoices_ClearAllControls(); });
    // HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";



function SetArrayOfItems()
{
    debugger;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        var objItem = new Object(); 
        //objItem.CostCenterPercentageID = $(tr).attr('value') == "undefined" ? "0" : $(tr).attr('value');
        objItem.ID = 0;
        objItem.CostCenterID = 0;
        objItem.CostCenterName = $(tr).find('td.CostCenterName').find('.input_CostCenterName').val() == "" ? "0" : $(tr).find('td.CostCenterName').find('.input_CostCenterName').val();
        objItem.Part = $(tr).find('td.Part').find('.input_Part').val() == "" ? "0" : $(tr).find('td.Part').find('.input_Part').val();
        objItem.PartRatio = $(tr).find('td.PartRatio').find('.input_PartRatio').val() == "" ? "0" : $(tr).find('td.PartRatio').find('.input_PartRatio').val();
        objItem.Value = $(tr).find('td.Value').find('.input_Value').val() == "" ? "0" : $(tr).find('td.Value').find('.input_Value').val();
    arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}
var TaxID = 0;


function SetArrayOfTaxes(callback)
{
    debugger;
    
   // var arrayOfItems = new Array();
    //if ($('#tblTaxes > tbody > tr').length > 0) {
    //    $("#tblTaxes>tbody>tr").each(function (i, tr) {
    //        debugger;
    //        var objItem = new Object();
    //        objItem.ID = $(tr).attr('value');
    //        objItem.TaxID = $(tr).find("td.TaxID").attr('val');
    //        objItem.TaxValue = $(tr).find("td.TaxValue").attr('val');
    //        objItem.TaxAmount = $(tr).find("td.TaxAmount").attr('val');
    //        objItem.InvoiceID = $(tr).find("td.InvoiceID").attr('val');
    //        objItem.IsPercentage = true;
    //        arrayOfItems.push(objItem);
    //    });
    //    return arrayOfItems;
    //}
    //else {
       
        var arrayOfItems = new Array();
        $("#tblItems>tbody>tr").each(function (i, tr) {
            var objItem = new Object();
            debugger;
           
            // setTimeout(function () {
            debugger;
            //$.getJSON("/api/SL_Invoices/GetListTaxRatio", { pWhereClause: id }, function (Result) {
            //    if (Result.length > 0) {
            //        debugger;
            //        TaxID = JSON.parse(Result[1]);
            //    }

            //});

            $.ajax({
                type: "GET",
                url: "/api/SL_Invoices/deleteFromInvoiceTaxes",
                data: { pWhereClause: $('#hID').val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Result) {
                    $.ajax({
                        type: "GET",
                        url: "/api/SL_Invoices/GetListTaxRatio",
                        data: { pWhereClause: $(tr).find('td.ServiceID  select').find('option:selected').val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (Result) {
                            if (Result.length > 0) {
                                debugger;
                                TaxID = JSON.parse(Result[1]);
                                objItem.ID = 0;
                                objItem.TaxID = TaxID;
                                objItem.TaxValue = $(tr).find('td.TaxRatio input[type="text"]').val();
                                objItem.TaxAmount = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * $(tr).find('td.Qty').find('.input_quantity').val());
                                objItem.InvoiceID = $('#hID').val();
                                objItem.IsPercentage = true;
                                arrayOfItems.push(objItem);

                                console.log(TaxID);
                                console.log(Result[1]);
                                console.log(objItem.TaxID);
                                console.log($(tr).attr('value'));

                                if (i == $("#tblItems>tbody>tr").length - 1) {
                                    if (callback != null && callback != undefined)
                                        callback();
                                }

                            }
                        },
                        error: function (jqXHR, exception) {

                            FadePageCover(false);
                            swal("Oops!", "Please, contact your technical support! GetListAsCheckboxes in mainapp.master.js", "error");
                        }
                    });
                }
            });

              //  }, 300);
               

                  
    
        });
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
function FillWasataDetails() {
    debugger;
    
    //$($('#tblWasataDetails > tbody > tr')).each(function (i, tr) {
    //    $(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
    //    $(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));

    //});
    $($('#tblWasataDetails > tbody > tr')).each(function (i, tr) {
        //$(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
        //$(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));
        if ($('#slInvoiceType').val() == 1) {
            $('#wasata').show()
        }
        $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $('#slDisbursementJobs').val() }, function (Result) {
            if (Result.length > 0) {
                debugger;
                $.each(JSON.parse(Result), function (i, item) {
                    AHMED = item.JobNumber;
                    $("#txtJobVessel_Name").val(item.Vessel_Name);
                    $("#txtJobClient_Name").val(item.Client_Name);
                    $("#txtNotes").val(item.Client_Name + " job no : " + item.JobNumber);
                    $("#txtShip").val(item.Vessel_Name);
                    $("#txtShippingPort").val(item.ETA_Port_Name);
                    $("#txtDisCharcgePort").val(item.ETA_Port_Name);
                    $("#txtArrivalDate").val(item.ATA);
                    $("#txtCargoDesc").val(item.CargoName);
                    $("#txtTonWeight").val(item.CargoQuantity);


                    $("#txtBillCount").val($(tr).find("td.BillCount").text());
                    $("#txtBillNo").val($(tr).find("td.BillNo").text());
                    $("#txtCargo").val($(tr).find("td.Cargo").text());
                    $("#txtVoyageeNo").val($(tr).find("td.VoyageNo").text());
                    $("#txtLine").val($(tr).find("td.Line").text());
                    $("#txtFrieght").val($(tr).find("td.Fright").text());
                    $("#txtVoucherDate").val($(tr).find("td.VoucherDate").text('val'));
                    $("#txtDeleveryNo").val($(tr).find("td.DeliveryVoucher").text());
                }


            );
            }

        });
       

    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
//function SL_InvoicesWasataDetails_BindTableRows(pItems) {
//    WasataDetailsRowsCounter = 0;
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    ClearAllTableRows("tblWasataDetails");
//    $.each(JSON.parse(pItems), function (i, item) {

//        AppendRowtoTable("tblWasataDetails",
//            ("<tr isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + item.ID + "'>"
//              +"<td class='WasataDetailID'>" + item.WasataDetailID + "</td>"
//               + "<td class='InvoiceID'>" + item.InvoiceID + "</td>"
//               + "<td class='BillCount'>" + item.BillCount + "</td>"
//               + "<td class='BillNo'>" + item.BillNo + "</td>"
//               + "<td class='Cargo'>" + item.Cargo + "</td>"
//               + "<td class='VoyageNo'>" + item.VoyageNo + "</td>"
//               + "<td class='Line'>" + item.Line + "</td>"
//               + "<td class='Fright'>" + item.Fright + "</td>"
//               + "<td class='VoucherDate'>" + item.VoucherDate + "</td>"
//               + "<td class='DeliveryVoucher'>" + item.DeliveryVoucher + "</td>"
//                + "</tr>"));

//        WasataDetailsRowsCounter++;
//       // $('#tblWasataDetails > tbody > tr').find('td.Fright > input').inputmask('decimal', { digits: 2 });

//    });
//    ApplyPermissions();
//    BindAllCheckboxonTable("tblWasataDetails", "WasataDetailID");
//    CheckAllCheckbox("WasataDetailID");
//    setTimeout(function () {
//        FillWasataDetails();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

//}
//function DeleteExpenses(RowsNo) {

//    if ($("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
//        $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
//        ExpensesRowsCounter = ExpensesRowsCounter - 1;
//        CalculateAll();

//    }
//    else {
//        swal({
//            title: "Are you sure?",
//            text: "The selected records will be deleted permanently!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            closeOnConfirm: true
//        },
//            //callback function in case of success
//            function () {
//                $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
//                ExpensesRowsCounter = ExpensesRowsCounter - 1;
//                CalculateAll();
//            });

//    }

//}

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

            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
    TaxesRowsCounter++;
}
function FillTaxesData() {
    debugger;
    $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
        $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
        $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));
        $(tr).find('td.InvoiceID ').find($(tr).find("td.InvoiceID").attr('val'));
        
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
//function SL_InvoicesTaxes_BindTableRows(pItems)
//{
//    TaxesRowsCounter = 0;
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    ClearAllTableRows("tblTaxes");
//    $.each(JSON.parse(pItems), function (i, item) {

//        debugger;
//        AppendRowtoTable("tblTaxes",
//            ("<tr isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.ID + "'>"
//                + " <td class='btn-success' style='font-size:15px;'> T </td>"
//                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
//                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteTaxes(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID  + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
//                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
//                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
//               + "<td class='InvoiceID' val='" + item.InvoiceID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.InvoiceID + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"

//               + "<td class='IsPercentage hide' val='true'>true</td>"
//                + "</tr>"));
//       // $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
//        TaxesRowsCounter++;

//    });

//    setTimeout(function () {
//        FillTaxesData();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

//}
//function DeleteTaxes(RowsNo) {

//    if ($("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
//        $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
//        TaxesRowsCounter = TaxesRowsCounter - 1;
//        CalculateAll();

//    }
//    else {
//        swal({
//            title: "Are you sure?",
//            text: "The selected records will be deleted permanently!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            closeOnConfirm: true
//        },
//            //callback function in case of success
//            function () {
//                $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
//                TaxesRowsCounter = TaxesRowsCounter - 1;
//                CalculateAll();
//            });

//    }

//}
//function CalculateTotalTaxes()
//{

//    debugger
//    _TotalTaxes = 0.00;
//    if ($('#tblTaxes > tbody > tr').length == 0)
//        $('#lblTotalTaxes').text('0.00')
//    $('#tblTaxes > tbody > tr').each(function (i, tr) {
//        var tr_Total = 0.00;
//        if ($(tr).find('td.TaxAmount > input').val() != "" && $(tr).find('td.TaxAmount > input').val() != null && $(tr).find('td.TaxAmount > input').val() != "undefined")
//            tr_Total = ($(tr).find('td.TaxAmount > input').val() * 1.00).toFixed(2);
//        _TotalTaxes = (_TotalTaxes + tr_Total * 1);
//        if ($('#tblTaxes > tbody > tr').length - 1 == (i))
//        {

//            $('#lblTotalTaxes').text(_TotalTaxes.toFixed(2));

//        }
//    });

//}
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
                        //        $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");

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


$('#slInvoiceType').on('change', function () {
    debugger;
    if ($('#slInvoiceType').val() == 1)
    {
        $('#wasata').show()
    }
    else
    {
        $('#wasata').hide()
    }
   
});
var AHMED=0;
$('#slDisbursementJobs').on('change', function () {
    debugger;
    $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $(this).val() }, function (Result) {
        if (Result.length > 0) {
            debugger;
            $.each(JSON.parse(Result), function (i, item) {
                AHMED = item.JobNumber;
                $("#txtJobVessel_Name").val(item.Vessel_Name);
                $("#txtJobClient_Name").val(item.Client_Name);
                $("#txtNotes").val(item.Client_Name +" job no : "+item.JobNumber);
              
            }


        );}
            
    });

});

