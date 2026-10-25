function PostingVouchersReportTax_BindTableRows(pVoucher) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblVoucher");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

    $.each(pVoucher, function (i, item) {
        AppendRowtoTable("tblVoucher",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='VoucherDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.VoucherDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate))) + "</td>"
                    + "<td class='SafeID hide'>" + item.SafeID + "</td>"
                    + "<td class='SafeName'>" + (item.SafeID == 0 ? "" : item.SafeName) + "</td>"
                    + "<td class='Total'>" + item.Total + "</td>"
                    + "<td class='TotalAfterTax hide'>" + item.TotalAfterTax + "</td>"
                    + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='CurrencyCode'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='ChargedPerson'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='ExchangeRate hide'>" + item.ExchangeRate + "</td>"

                    + "<td class='TaxID hide'>" + item.TaxID + "</td>"
                    + "<td class='TaxID2 hide'>" + item.TaxID2 + "</td>"
                    + "<td class='TaxValue hide'>" + item.TaxValue + "</td>"
                    + "<td class='TaxValue2 hide'>" + item.TaxValue2 + "</td>"

                    + "<td class='InvoiceID hide'>" + item.SafeID + "</td>"
                    + "<td class='InvoiceNo hide'>" + (item.InvoiceID == 0 ? "" : item.InvoiceNo) + "</td>"
                    + "<td class='IsCash hide" + (glbFormCalled == constVoucherCashOut ? "" : " hide ") + "'> <input id=cbIsCash" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsCash ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Approved hide'> <input id=cbApproved" + item.ID + " type='checkbox' disabled='disabled' " + (item.Approved ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Posted hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Posted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Print'><a href='' data-toggle='modal' onclick='Voucher_Print(" + item.ID + ");' " + printControlsText + "</a></td>"

                    //+ "<td class='hide'><a href='#VoucherModal' data-toggle='modal' onclick='Voucher_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblVoucher", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblVoucher>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Voucher_Print(pID) {
    debugger;
    if (pID == 0) //pID=0 this means print is pressed from modal
        pID = $("#hID").val();
    if (pID == "")
        swal("Sorry", "Please, save before printing.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Voucher/GetPrintedData"
            , { pVoucherIDToPrint: pID }
            , function (pData) {
                if ($("#hDefaultUnEditableCompanyName").val() == "FAI") {
                    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
                    var pVoucherHeader = JSON.parse(pData[0]);
                    var pVoucherDetails = JSON.parse(pData[1]);
                    var pVoucherOperation = JSON.parse(pData[2]);
                    var pVoucherInvItem = JSON.parse(pData[3]);
                    var InvoiceNumber = "undefined";
                    $.each(pVoucherInvItem, function (j, item) {
                        InvoiceNumber = item.InvoiceNumber;

                    });
                    debugger;
                    //
                    if (InvoiceNumber = "" || InvoiceNumber == 0 || InvoiceNumber == null || InvoiceNumber == "undefined") {
                        if (pVoucherHeader.VoucherType == 10)
                            PrintFairtransNoInv(pData);
                        else
                            PrintDefault(pData);
                    }
                    else {
                        PrintFairtrans(pData);
                    }

                }
                else {
                    PrintDefault(pData);
                }
                FadePageCover(false);
            }
            , function () {
                if ($("#hDefaultUnEditableCompanyName").val() == "SAF")
                    Voucher_LoadingWithPaging();
                else
                    null
            }
            );
    }
}
function PrintDefault(pData) {
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pVoucherHeader = JSON.parse(pData[0]);
    var pVoucherDetails = JSON.parse(pData[1]);
    var pVoucherOperation = JSON.parse(pData[2]);
    var mywindow = window.open('', '_blank');

    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
    }
    ReportHTML += '     <head><title>' + TranslateString("Payment") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + TranslateString("No") + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else  {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("ReceiptDate") + ':' + '</span></b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Name") + ':' + '</span></b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Safe") + ':' + '</span></b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Total") + ':' + '</span></b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("TotalAfterTax") + ':' + '</span></b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Only") + ':' + '</span></b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 "><b>' + TranslateString("Notes") + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>' + TranslateString("Operations") + ' </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>' + TranslateString("OperationCode") + '</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>' + TranslateString("PaymentDetails") + '</b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>' + TranslateString("Description") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("Amount") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("Account") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("SubAccount") + '</th>';
    ReportHTML += '                             <th class="">' + TranslateString("CostCenter") + '</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    $.each(pVoucherDetails, function (i, item) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (item.Description == 0 ? "" : item.Description) + '</td>';
        ReportHTML += '                         <td>' + item.Value + '</td>';
        ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>' + TranslateString("TOTALAMOUNTONLY") + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + ' </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("Receiver") + '<br><br>' + TranslateString("Name") + '<br>' + TranslateString("No") + '<br>' + TranslateString("Signature") + ' </div></b></div>';
    ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();

}
function PrintFairtrans(pData) {
    debugger;
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pVoucherHeader = JSON.parse(pData[0]);
    var pVoucherDetails = JSON.parse(pData[1]);
    var pVoucherOperation = JSON.parse(pData[2]);
    var pVoucherInvItem = JSON.parse(pData[3]);

    var mywindow = window.open('', '_blank');

    var ReportHTML = '';
    var ItemTotal = 0;
    var InvoiceNumber = '';
    var OperationNo = '';
    var BLNumber = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>Payment</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    //ReportHTML += '                             <th>Amount</th>';
    //ReportHTML += '                             <th>Account</th>';
    //ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Amount</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    //if ($.each(pVoucherInvItem.length - 1 == i)) {
    //    ItemTotal = item.SaleAmount
    //}
    ItemTotal = 0;
    $.each(pVoucherDetails, function (j, item2) {
        //if ($(pVoucherDetails).length -1 == j) {
        ItemTotal += item2.Value;
        //}
    });

    $.each(pVoucherInvItem, function (i, item) {

        if (i == 0) {
            ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
            //<b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '
            ReportHTML += '                         <td> <b> Invoice NO: ' + '</b>' + item.InvoiceNumber + '<b>' + ' Operation No:' + '</b>' + item.OperationNo + '<b>' + ' B\L NO:' + '</b>' + item.BLNumber + '</td>';
            //ReportHTML += '                         <td>' + ItemTotal + '</td>';
            //ReportHTML += '                         <td>' +""+ '</td>';
            //ReportHTML += '                         <td>' + "" + '</td>';
            ReportHTML += '                         <td class="">' + ItemTotal + '</td>';
            ReportHTML += '                     </tr>';
        }
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        //ReportHTML += '                         <td > ' + pVoucherHeader.TaxValue + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        ReportHTML += '                         <td class="">' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        //ReportHTML += '                         <td >' + pVoucherHeader.TaxValue2 + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        ReportHTML += '                         <td class="">' + pVoucherHeader.TaxValue2 + '</td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    ReportHTML += '                 <div class="col-xs-12  float-Left" ><b><div class="col-xs-2" style="height:80px;border:1px solid #000;">Stamp<br> </div></b></div>';
    ReportHTML += '                 <div class="col-xs-6  float-right" style="font-size:150%;">' + '  لا يعتد بهذا الإيصال إلا إذا كان مختوما بختم الشركة  ' + '</div>';
    ReportHTML += '    <br>'
    //ReportHTML += '     <div class="col-xs-12 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لا يعتد بهذا الإيصال إلا إذا كان مختوما بختم الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '    <br>'
    ReportHTML += '             <div class="col-xs-12 text-center"> <br> </div>';
    ReportHTML += '             <hr class="col-xs-12 text-center" style="border:none; border-top:1px dashed #000; ">';
    //////////////////////////////////////////////////////////////////////////////////

    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    //ReportHTML += '                             <th>Amount</th>';
    //ReportHTML += '                             <th>Account</th>';
    //ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Amount</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    //if ($.each(pVoucherInvItem.length - 1 == i)) {
    //    ItemTotal = item.SaleAmount
    //}
    ItemTotal = 0;
    $.each(pVoucherDetails, function (j, item2) {
        //if ($(pVoucherDetails).length -1 == j) {
        ItemTotal += item2.Value;
        //}
    });
    $.each(pVoucherInvItem, function (i, item) {

        if (i == 0) {
            ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
            //<b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '
            ReportHTML += '                         <td> <b> Invoice NO: ' + '</b>' + item.InvoiceNumber + '<b>' + ' Operation No:' + '</b>' + item.OperationNo + '<b>' + ' B\L NO:' + '</b>' + item.BLNumber + '</td>';
            //ReportHTML += '                         <td>' + ItemTotal + '</td>';
            //ReportHTML += '                         <td>' +""+ '</td>';
            //ReportHTML += '                         <td>' + "" + '</td>';
            ReportHTML += '                         <td class="">' + ItemTotal + '</td>';
            ReportHTML += '                     </tr>';
        }
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        //ReportHTML += '                         <td > ' + pVoucherHeader.TaxValue + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        ReportHTML += '                         <td class="">' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        //ReportHTML += '                         <td >' + pVoucherHeader.TaxValue2 + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        //ReportHTML += '                         <td>' + "" + '</td>';
        ReportHTML += '                         <td class="">' + pVoucherHeader.TaxValue2 + '</td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=2>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    ReportHTML += '                 <div class="col-xs-12  float-Left" ><b><div class="col-xs-2" style="height:80px;border:1px solid #000;">Stamp<br> </div></b></div>';
    ReportHTML += '                 <div class="col-xs-6  float-right" style="font-size:150%;">' + '  لا يعتد بهذا الإيصال إلا إذا كان مختوما بختم الشركة  ' + '</div>';
    ReportHTML += '    <br>'
    //ReportHTML += '     <div class="col-xs-12 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ReportHTML += '             <div class="col-xs-12 text-center break" > <br> </div>';
    //ReportHTML += '     <head><title>Payment</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;font-size:115%; " >';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n "><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    //ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    ReportHTML += '                             <th>Amount</th>';
    ReportHTML += '                             <th>Account</th>';
    ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Cost Center</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;

    //$.each(pVoucherDetails, function (j, item2) {
    //    //if ($(pVoucherDetails).length -1 == j) {
    //    ItemTotal += item2.Value;
    //    //}
    //});
    ItemTotal = 0;
    $.each(pVoucherInvItem, function (j, item) {

        //if (i == 0) {
        InvoiceNumber = item.InvoiceNumber;
        OperationNo = item.OperationNo;
        BLNumber = item.BLNumber;
        //ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ////<b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '
        //ReportHTML += '                         <td> <b> Invoice NO: ' + '</b>' + item.InvoiceNumber + '<b>' + ' Operation No:' + '</b>' + item.OperationNo + '<b>' + ' B\L NO:' + '</b>' + item.BLNumber + '</td>';
        //ReportHTML += '                         <td>' + ItemTotal + '</td>';
        //ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        //ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        //ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        ////ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        //ReportHTML += '                     </tr>';
        //}
    });
    $.each(pVoucherDetails, function (i, item) {
        if (i == 0) {
            ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
            //<b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '
            ReportHTML += '                         <td> <b> Invoice NO: ' + '</b>' + InvoiceNumber + '<b>' + ' Operation No:' + '</b>' + OperationNo + '<b>' + ' B\L NO:' + '</b>' + BLNumber + '</td>';
            ReportHTML += '                         <td>' + pVoucherHeader.TotalAfterTax + '</td>';
            ReportHTML += '                         <td>' + item.Account_Name + '</td>';
            ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
            ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
            //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
            ReportHTML += '                     </tr>';
        }
    });
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';

    //--------------------------------------------------------------------------------------------------------
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Items Invoice</th>';
    ReportHTML += '                             <th>Amount</th>';
    //ReportHTML += '                             <th>Account</th>';
    //ReportHTML += '                             <th>Sub Account</th>';
    //ReportHTML += '                             <th class="">Cost Center</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    $.each(pVoucherInvItem, function (i, item) {

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + item.ItemName + '</td>';
        ReportHTML += '                         <td>' + item.SaleAmount + '</td>';
        //ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        //ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        //ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });

    //if (pVoucherInvItem.TaxAmount != 0) {
    //    ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
    //    ReportHTML += '                         <td>' + (pVoucherInvItem.TaxPercentage == 0 ? "" : pVoucherInvItem.TaxPercentage) + '</td>';
    //    ReportHTML += '                         <td>' + pVoucherInvItem.TaxAmount + '</td>';
    //    //ReportHTML += '                         <td></td>';
    //    //ReportHTML += '                         <td></td>';
    //    //ReportHTML += '                         <td class=""></td>';
    //    //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
    //    ReportHTML += '                     </tr>';
    //}
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td></td>';
        //ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    //--------------------------------------------------------------------------------------------------------

    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Receiver<br><br>Name:<br>ID No:<br>Signature:  </div></b></div>';
    //ReportHTML += '     <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ////ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    ////ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    ////if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    ////    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    ////ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ///////////////////////////////////////////////////////////////////////////////////////////////
    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();

}

function PrintFairtransNoInv(pData) {
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pVoucherHeader = JSON.parse(pData[0]);
    var pVoucherDetails = JSON.parse(pData[1]);
    var pVoucherOperation = JSON.parse(pData[2]);
    var mywindow = window.open('', '_blank');

    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>Payment</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    ReportHTML += '                             <th>Amount</th>';
    ReportHTML += '                             <th>Account</th>';
    ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Cost Center</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    $.each(pVoucherDetails, function (i, item) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (item.Description == 0 ? "" : item.Description) + '</td>';
        ReportHTML += '                         <td>' + item.Value + '</td>';
        ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    ReportHTML += '                 <div class="col-xs-6  float-Left" ><b><div class="col-xs-2" style="height:80px;border:1px solid #000;">Stamp<br> </div></b></div>';
    ReportHTML += '                 <div class="col-xs-6  float-right" style="font-size:150%;">' + '  لا يعتد بهذا الإيصال إلا إذا كان مختوما بختم الشركه  ' + '</div>';
    ReportHTML += '    <br>'
    //ReportHTML += '     <div class="col-xs-12 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '    <br>'
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ReportHTML += '             <div class="col-xs-12 text-center"> <br> </div>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    ReportHTML += '                             <th>Amount</th>';
    ReportHTML += '                             <th>Account</th>';
    ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Cost Center</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    $.each(pVoucherDetails, function (i, item) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (item.Description == 0 ? "" : item.Description) + '</td>';
        ReportHTML += '                         <td>' + item.Value + '</td>';
        ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-12  float-Left" ><b><div class="col-xs-2" style="height:80px;border:1px solid #000;">Stamp<br> </div></b></div>';
    //ReportHTML += '    <br>'
    //ReportHTML += '     <div class="col-xs-12 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    ReportHTML += '             <div class="col-xs-12 text-center break" > <br> </div>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + ' No. ' + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 30) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن إستلام شيكات' + '</h3></div>';
    }
    else if (pVoucherHeader.VoucherType == 40) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف شيكات' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Voucher Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Name: ' + '</b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Safe: ' + '</b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total: ' + '</b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-6 text-left"><b>Total After Tax: ' + '</b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 text-left"><b>Only: ' + '</b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 text-left"><b>Notes: ' + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Operations  : </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>Operation Code</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>Description</th>';
    ReportHTML += '                             <th>Amount</th>';
    ReportHTML += '                             <th>Account</th>';
    ReportHTML += '                             <th>Sub Account</th>';
    ReportHTML += '                             <th class="">Cost Center</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    $.each(pVoucherDetails, function (i, item) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (item.Description == 0 ? "" : item.Description) + '</td>';
        ReportHTML += '                         <td>' + item.Value + '</td>';
        ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        ReportHTML += '                         <td>' + (item.SubAccount_Name == 0 ? "" : item.SubAccount_Name) + '</td>';
        ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Prepared By </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Reviewed By</div></div></div>';
    //ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">Approved By</div></b></div>';
    //ReportHTML += '                 <div class="col-xs-12  float-Left" ><b><div class="col-xs-2" style="height:80px;border:1px solid #000;">Stamp<br> </div></b></div>';
    //ReportHTML += '    <br>'
    //ReportHTML += '     <div class="col-xs-12 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();

}


function PostingVouchersReportTax_LoadingWithPaging() {
    debugger;
    var pWhereClause = PostingVouchersReportTax_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PostingVouchersReportTax_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblVoucher>tbody>tr", $("#txt-Search").val().trim());
}
function PostingVouchersReportTax_GetWhereClause() {
    var pWhereClause = "WHERE Posted = 1 and IsLiner <> 1 and VoucherType=" + $("#slSearchVoucherType").val() + "\n";
    pWhereClause += " AND VoucherDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND VoucherDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";
    if (glbFormCalled == constFrmPosting) {
        pWhereClause += "AND Posted=1";
    }
    else if (glbFormCalled == constFrmUnPosting) {
        pWhereClause += "AND Posted=1 ";
    }
    if ($("#txtSearchCode").val().trim() != "")
        pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
    if ($("#slSearchSafe").val() != 0)
        pWhereClause += " AND SafeID = " + $("#slSearchSafe").val() + "\n";
    if ($("#txtSearchTotal").val().trim() != "")
        pWhereClause += " AND TotalAfterTax = " + $("#txtSearchTotal").val().trim() + "\n";
    if ($("#slSearchCurrency").val() != 0)
        pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val() + "\n";
    if ($("#txtSearchChargedPerson").val().trim() != "")
        pWhereClause += " AND ChargedPerson LIKE N'%" + $("#txtSearchChargedPerson").val().trim() + "%'" + "\n";
    if ($("#txtSearchNotes").val().trim() != "")
        pWhereClause += " AND Notes LIKE N'%" + $("#txtSearchNotes").val().trim() + "%'" + "\n";
    if ($("#slSearchCashOrCharge").val() == 10)
        pWhereClause += " AND IsCash = 1" + "\n";
    if ($("#slSearchCashOrCharge").val() == 20)
        pWhereClause += " AND IsCash = 0" + "\n";
    if ($("#slSearchStatus").val() == 10)
        pWhereClause += " AND Approved = 1" + "\n";
    if ($("#slSearchStatus").val() == 20)
        pWhereClause += " AND Approved = 0" + "\n";


    //var LinkUserAndSafes = $('#hReadySlOptions option[value="55"]').attr("OptionValue");//LinkUserAndSafes
    //if (LinkUserAndSafes == "true") {
    //    pWhereClause = " INNER JOIN VW_Sec_UserSafes US ON SafeID = US._SafeID " + "\n" + pWhereClause + "\n" + " AND US._UserID";
    //}

    return pWhereClause;
}
function PostingVouchersReportTax_cbIsJVDateChanged() {
    //debugger;
    //if ($("#cbIsJVDate").prop("checked")) {
    //    $("#txtJVDate").removeAttr("disabled");
    //}
    //else {
    //    $("#txtJVDate").attr("disabled", "disabled");
    //    $("#txtJVDate").val(getTodaysDateInddMMyyyyFormat());
    //}
}
function PostingVouchersReportTax_PostOrUnpostList(pValue) { //pValue 1:Post, 2:Unpost
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblVoucher', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Voucher/SetPostField"
            , {
                pSelectedIDs: pSelectedIDs
                , pGivenDate: ConvertDateFormat($("#txtJVDate").val().trim())
                , pValue: pValue
                , pUseGivenDate: (pValue == 1 ? $("#cbIsJVDate").prop("checked") : false)
            }
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    if (pData[1] != undefined && pData[1] != "")
                        strDeleteFailMessage = pData[1];
                    else
                        strDeleteFailMessage = "One or more Vouchers can not be posted/unposted because fiscal year is closed or date is frozen.";
                }
                else
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                PostingVouchersReportTax_LoadingWithPaging(pData[0]);
            }
            , null);
    }
}