function JournalVoucher_Print(pID, event) {
    debugger;

    if (event != undefined)
      event.preventDefault();

    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();


    var pParametersWithValues = {
        pJournalVoucherIDForPrinting: pID
    };

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

        }
        , null);
}
function AccountLedger_Print(pAccountID, pFromDate, pToDate, pAccountName, event) {
    debugger;

    if (event != undefined)
        event.preventDefault();

    var pOutputTo = 'Print';
    var pAccountIDList = pAccountID;    //GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = -1;//GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    if (pAccountIDList == "")
        swal("Sorry", "Please, select at least one account .");
    else {
        //FadePageCover(true);

        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pCostCenterIDList: -1   // pCostCenterIDList
            , pJournalTypeIDList: -1  //pJournalTypeIDList
            , pFromDate: pFromDate // $("#txtFromDate").val()
            , pToDate: pToDate //$("#txtToDate").val()
            , pPostStatus: -1  //$("#slStatus").val()
            , pIsGroupByCostCenter: false   //$("#cbIsByCostCenter").prop("checked")
            , pIsGroupByBranch: false
            , pWithOtherSide: false
            , pBranchIDList: -1
        };
        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
            , function (pData) {
                AccountLedger_Print_Detailed(pData, pOutputTo, pAccountIDList, pFromDate, pToDate, pAccountName);
            }
            , null);
    }
}
function AccountLedger_Print_Detailed(pData, pOutputTo, pAccountID, pFromDate, pToDate, pAccountName) {
    debugger;
    //var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = -1;//GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");


    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = new Array();
    ArrAccountIDList.push(pAccountID);//pAccountIDList.split(',');

    var ShowSubAccount = 0;

    var Suppress = 0;// $("#cbSuppressForZeroes").prop("checked");
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
        pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
        pTablesHTML += '                     <th class="">' + 'JV Type' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
        if (ShowSubAccount)
            pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pAccountLedger != null)
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pAccountLedger, function (i, item) {
            if (item.Account_ID == ArrAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                 <td class="" colspan=' + (ShowSubAccount ? '13' : '12') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                        if (ShowSubAccount)
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    pTablesHTML += '             </tr>';
                    pIsOpenBalanceRowAdded = true;
                    pPreviousRowFBalance = item.Opening_Balance;
                }
                if (item.ID/*JV_ID*/ != 0) { //add normal row
                    /******************Get final balance************************/
                    debugger;
                    var Deb = item.Debit;
                    var Cre = item.Credit;
                    var fBalD = Deb - Cre;
                    /******************Get LocalCur final balance************************/
                    var fBal = item.LocalDebit - item.LocalCredit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    // pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td class="" style="text-align:center;">' + '<a href="#" onclick="JournalVoucher_Print(' + item.ID + ', event'  + ');" >' + '<span>' + '&emsp;' + item.JVNo + '</span>' + '</td></a> ';

                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '<a href="#" onclick="PrintVoucherAndInvoice(' + item.TransID + ',' + item.TransType + ');" >' + '<span>' + '&emsp;' + item.ReceiptNo + '</span>' + '</td></a> ';

                    // pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                    if (ShowSubAccount)
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j])
        });
        //pTablesHTML += '                 </tbody>';
        //pTablesHTML += '             </table>';
    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="8" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if (pOutputTo == "Excel")
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if (ShowSubAccount)
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
                // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                '</td>';
        pRowTotalsHTML += '                            </tr>';
        //$("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);

        pTablesHTML += pRowTotalsHTML;
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    } //for (var j = 0; j < ArrAccountIDList.length; j++)
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x => x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
            }
        }
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        // ReportHTML += "   <div id='hExportedTable' class='hide'></div>";
        ReportHTML += '     <head>';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';

        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x => x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + pFromDate + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + pToDate + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>'
                    + pAccountName
                    + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                // ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += pTablesHTML;//  ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                //ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         </body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}


function AccountLedgerByCurrencySubReport_Print( pAccountID, pFromDate, pToDate,
    pAccountName, pCostCenterID, pCostCenterName, pCurrencyCode, pBranche_IDs
    , pJVTypeIDList, pJournalTypeIDList, pCurrencyID, pSubAccountID) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");


    FadePageCover(true);

    var pParametersWithValues = {
        pAccountIDList:  pAccountID 
        , pCostCenterIDList:  pCostCenterID 
        , pJournalTypeIDList: pJournalTypeIDList
        , pFromDate: pFromDate
        , pToDate: pToDate
        , pPostStatus: "-1"
        //, pShowRevaluateEntry: false
        , pCurr: pCurrencyID
        , pBranche_IDs: pBranche_IDs
        , pJVTypeIDList: pJVTypeIDList
        , pByTotals: false
        , pSubAccountID: pSubAccountID
    };
    CallGETFunctionWithParameters("/api/AccountLedgerByCurrency/GetPrintedData", pParametersWithValues
        , function (pData) {
            AccountLedger_PrintSub_DetailedByCostCenter(pData, pAccountID, pFromDate, pToDate,
                pAccountName, pCostCenterID, pCostCenterName, pCurrencyCode, pSubAccountID);
        }
        , null);

}

function AccountLedger_PrintSub_DetailedByCostCenter(pData,  pAccountID, pFromDate, pToDate,
    pAccountName, pCostCenterID, pCostCenterName, pCurrencyCode,pSubAccountID) {
    debugger;


    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    //var ArrAccountIDList = pAccountIDList.split(',');
    //var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var ArrAccountIDList = new Array();
    ArrAccountIDList.push(pAccountID);//pAccountIDList.split(',');

    var ArrCostCenterIDList = new Array();
    ArrCostCenterIDList.push(pCostCenterID);

    var Suppress = false;

    var pTablesHTML = "";
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + pCostCenterName + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pAccountLedger != null)
            var pPreviousRowFBalance = 0; //final balance Local Cur
           
            $.each(pAccountLedger, function (i, item) {
                // if (item.Account_ID == ArrAccountIDList[j])
                if (item.Account_ID == ArrAccountIDList[j] && item.CostCenter.trim() == pCostCenterName) {

                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        //pTablesHTML += '             <tr class="" style="font-size:95%;">';
                   
                        //    pTablesHTML += '                 <td class="" colspan=' + (1 == 1 ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';

                        //    pTablesHTML += '                 <td class="" colspan=' + (1 == 1 ? '11' : '10') + ' style="text-align:center;">' + item.Opening_Balance + '</td>';

                     
                        //pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                       // pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get final balance************************/
                        debugger;
                        var Deb = item.Debit;
                        var Cre = item.Credit;
                        var fBalD = Deb - Cre;
                        /******************Get LocalCur final balance************************/
                        //var fBal = item.LocalDebit - item.LocalCredit;
                        //var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        //pPreviousRowFBalance = FBalance; //To be used in the next row
                        var fBal = fBalD;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td class="" style="text-align:center;">' + '<a href="#" onclick="JournalVoucher_Print(' + item.ID + ', event'+ ');" >' + '<span>' + '&emsp;' + item.JVNo + '</span>' + '</td></a> ';
                      //  pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';

                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows


                } //of if (item.Account_ID == ArrAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrAccountIDList.length; j++)
    }

    var mywindow = window.open('', '_blank');
    var ReportHTML = '';


    ReportHTML += '<html>';
    // ReportHTML += "   <div id='hExportedTable' class='hide'></div>";
    ReportHTML += '     <head>';
    ReportHTML += AddScripts;
    ReportHTML += '</head>';
    ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
    ReportHTML += AddScripts;
    ReportHTML += '</head>';
    ReportHTML += '         <body style="background-color:white;">';
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x => x.Account_ID == ArrAccountIDList[j] &&  x.CostCenter.trim() == pCostCenterName);
            if (!Suppress || CurrentRows.length > 0) {
                // if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + pFromDate + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + pToDate + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' +   pAccountName
                    + " (" + pCostCenterName + ")"
                    + " " + pCurrencyCode + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += pTablesHTML;// 
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        }
    }
    ReportHTML += '         <body>';



    mywindow.document.write(ReportHTML);
    mywindow.document.close();


    FadePageCover(false);
}