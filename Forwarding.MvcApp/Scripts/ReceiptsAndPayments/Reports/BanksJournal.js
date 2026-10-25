function BanksJournal_cbCheckAllBanksChanged() {
    debugger;
    if ($("#cbCheckAllBanks").prop("checked"))
        $("#divCbBank input[name=nameCbBank]").prop("checked", true);
    else
        $("#divCbBank input[name=nameCbBank]").prop("checked", false);
}
function BanksJournal_cbCheckAllCurrencyChanged() {
    debugger;
    if ($("#cbCheckAllCurrency").prop("checked"))
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", true);
    else
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", false);
}
function BanksJournal_Print(pOutputTo) {
    debugger;
    var pBankIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBank");
    var pCurrencyIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCurrency");
    if (pBankIDList == "" || pCurrencyIDList == "")
        swal("Sorry", "Please, select at least one bank and one currency.");
    else {
        FadePageCover(true);

        var collected = -1;

        if ($('#cbIsCollected').is(':checked'))
        {
            collected = 1;
        }

        console.log(collected);
        var pParametersWithValues = {
            pBankIDList: pBankIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pCurrencyIDList: pCurrencyIDList
            , pPostStatus: $("#slStatus").val()
            , pShowRevaluateEntry: false
            , Collected: collected
        };
        CallGETFunctionWithParameters("/api/BanksJournal/GetPrintedData", pParametersWithValues
            , function (pData) {
                var pDefaultsHeader = JSON.parse(pData[0]);
                var pBanksJournal = JSON.parse(pData[1]);
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                var pFormattedPrintTime = getTime();
                var ArrBankIDList = pBankIDList.split(',');
                var ArrCurrencyIDList = pCurrencyIDList.split(',');
                //pDescriptionOfGoods.replace(/\n/g, "<br />")
                //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
                //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
                var pTablesHTML = "";
                for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                    for (var j = 0; j < ArrBankIDList.length; j++) {
                        var pIsOpenBalanceRowAdded = false;
                        pTablesHTML += '             <table id="tblBanksJournal' + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        pTablesHTML += '                 <thead class="" style="">';
                        pTablesHTML += '                     <th class="">' + TranslateString("No") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("Date") + '</thb>';
                        pTablesHTML += '                     <th class="">' + TranslateString("TransType") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("ChequeNo") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("ChargedPerson") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("Notes") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("Debit") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("Credit") + '</th>';
                        pTablesHTML += '                     <th class="">' + TranslateString("Balance") + '</th>';
                        pTablesHTML += '                 </thead>';
                        pTablesHTML += '                 <tbody>';

                        if (pOutputTo == "Excel") { //to add the name of bank and currency for the excel files
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + TranslateString("Bank") + $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                 </tr>';
                        }
                        //if (pBanksJournal != null)
                        var pPreviousRowBalance = 0;
                        $.each(pBanksJournal, function (i, item) {
                            if (item.Bank_Name.trim() == $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim()
                                && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()) {
                                /******************Get Columns with conditions************************/
                                //debugger;
                                var Debit = (item.InOut ? item.Amount : 0);
                                var Credit = (!item.InOut ? item.Amount : 0);
                                var Balance = pPreviousRowBalance + parseFloat(Debit) - parseFloat(Credit);
                                pPreviousRowBalance = Balance; //To be used in the next row
                                /******************Add the row************************/
                                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                                if (pOutputTo != "Excel")
                                    pTablesHTML += '                     <td style="text-align:center;" class="CurrencyCode hide">' + item.Currency_Code.trim() + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoucherNo + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + ConvertDateFormat(GetDateWithFormatMDY(item.ChequeDate)) + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Type + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.ChequeNo == 0 ? "" : item.ChequeNo) + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="Debit">' + Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="Credit">' + Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="Balance">' + Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '                 </tr>';
                            } //of if (item.Bank_Name.trim() == $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim()
                            //        && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim())
                        });
                        pTablesHTML += '                 </tbody>';
                        pTablesHTML += '             </table>';
                    }//of for (var j = 0; j < ArrBankIDList.length; j++)
                }//of for looping through Currencies
                $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

                /*********************Append table summaries*************************/
                //debugger;
                for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                    for (var j = 0; j < ArrBankIDList.length; j++) {
                        var pTotalDebit = GetColumnSum("tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Debit");
                        var pTotalCredit = GetColumnSum("tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Credit");
                        var pFinalBalance = $("#tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.Balance").text();
                        var pFinalBalanceCurrency = $("#tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.CurrencyCode").text();
                        var pRowTotalsHTML = "";
                        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b>' + TranslateString("TotalDebitAndCredit") + '</b></td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                        pRowTotalsHTML += '                            </tr>';
                        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b>' + TranslateString("EndBalance") + '</b></td>';
                        //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + (isNaN(parseFloat(pFinalBalance)) ? 0 : parseFloat(pFinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pFinalBalanceCurrency + '</td>';
                        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pFinalBalance + ' ' + pFinalBalanceCurrency + '</td>';
                        pRowTotalsHTML += '                            </tr>';
                        $("#tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody").append(pRowTotalsHTML);
                    } //of looping through Banks
                } //of looping through Currencies

                var Suppress = $("#cbSuppressForZeroes").prop("checked");
                if (pOutputTo == "Excel")
                {
                    
                    //for (var j = 0; j < ArrBankIDList.length; j++)
                    //    for (var k = 0; k < ArrCurrencyIDList.length; k++)
                    //        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()
                    //            , $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim());

                    var No = 1;
                    var ExcelName = "";
                    var ReportHTML = '';
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                        ReportHTML += '<html>';
                    }
                    else {
                        ReportHTML += '<html dir="rtl">';
                    }
                    ReportHTML += '     <head><title>' + TranslateString("BankJournal") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
             
                    for (var j = 0; j < ArrBankIDList.length; j++) {
                        for (var k = 0; k < ArrCurrencyIDList.length; k++) {

                            var CurrentRows = pBanksJournal.filter(x=> x.Bank_Name == $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                            if (!Suppress || CurrentRows.length > 0) {
                                ExcelName = ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim();
                                ReportHTML += '         <div id="Reportbody' + ExcelName + '">';
                                // if (i > 0)
                                ReportHTML += '         <div class="break"></div>';
                                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + TranslateString("BankJournal") + '</u></b>' + '</div>';
                                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                                }
                                else {
                                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                                    ReportHTML += '             </div>';
                                }
                                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                                ReportHTML += '             <div class="col-xs-12"><h4><b>' + TranslateString("Bank") + '</b>' + $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>'
                                //ReportHTML += pTablesHTML; //Add table html in the next lines
                                ReportHTML += '             <table id="tblBanksJournal' + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                                ReportHTML += '             ' + $("#tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()).html();
                                ReportHTML += '             </table>';
                                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBanksJournal.length + '</div>';
                                ReportHTML += '         </div>';
                                No = No + 1;
                            }
                        } //of looping through Currencies
                    } //of for (var j = 0; j < ArrBankIDList.length; j++) {
             
                    ReportHTML += '         </body>';
                    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //ReportHTML += '     </footer>';
                    ReportHTML += '</html>';

                    $("#hExportedTable").html(ReportHTML);

                    //for (var h = 1; h <= No; h++) {
                    //    $("#Reportbody"+h).table2excel({
                    //        exclude: ".excludeThisClass",
                    //        name: "Sheet 1",
                    //        // filename: "Bank" //do not include extension
                    //        filename: "Bank" + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ' ' + getTodaysDateInddMMyyyyFormat() + ' ' + getTime()
                    //    });
                    //}
                    for (var j = 0; j < ArrBankIDList.length; j++) {
                        for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                            var CurrentRows = pBanksJournal.filter(x=> x.Bank_Name == $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                            if (!Suppress || CurrentRows.length > 0) {
                                debugger;
                                ExcelName = ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim();
                                var FileName =  $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() + "-" +  $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ' ' + getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
                                $("#Reportbody" + ExcelName).table2excel({
                                    exclude: ".excludeThisClass",
                                    name: "Sheet 1",
                                    // filename: "Bank" //do not include extension
                                    filename: FileName
                                });
                            }
                        }
                    }


                }
                else {
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                        ReportHTML += '<html>';
                    }
                    else {
                        ReportHTML += '<html dir="rtl">';
                    }
                    ReportHTML += '     <head><title>' + TranslateString("BankJournal") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    for (var j = 0; j < ArrBankIDList.length; j++) {
                        for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                            //if (i > 0)
                            var CurrentRows = pBanksJournal.filter(x=> x.Bank_Name == $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                            if (!Suppress || CurrentRows.length > 0) {
                                ReportHTML += '         <div class="break"></div>';
                                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + TranslateString("BankJournal") + '</u></b>' + '</div>';
                                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                                }
                                else {
                                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                                    ReportHTML += '             </div>';
                                }
                                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                                ReportHTML += '             <div class="col-xs-12"><h4><b>' + TranslateString("Bank") + '</b>' + $("#divCbBank input[name=nameCbBank][value=" + ArrBankIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>'
                                //ReportHTML += pTablesHTML; //Add table html in the next lines
                                ReportHTML += '             <table id="tblBanksJournal' + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                                ReportHTML += '             ' + $("#tblBanksJournal" + ArrBankIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()).html();
                                ReportHTML += '             </table>';
                                if (pDefaults.UnEditableCompanyName == 'ACS') {
                                    ReportHTML += '             <div class="row" style="font-size: 20px;">';
                                    //ReportHTML += '                 <div class="col-xs-1  " ></div>';
                                    ReportHTML += '                 <div class="col-xs-2  " ></div>';
                                    ReportHTML += '                 <div class="col-xs-3  " ><div class="col-xs-11" style="height:100px;border:1px solid #000;text-align: center;font-size:medium;"><b> المدير المالي  </b></div></div>';
                                    ReportHTML += '                 <div class="col-xs-3  " ><div class="col-xs-11" style="height:100px;border:1px solid #000;text-align: center;font-size:medium;"><b>مدير الحسابات </b> </div></div>';
                                    ReportHTML += '                 <div class="col-xs-3  " ><div class="col-xs-11" style="height:100px;border:1px solid #000;text-align: center;font-size:medium;"><b>أمين الخزينة </b> </div></div>';
                                    ReportHTML += '                 <div class="col-xs-1  " ></div>';
                                    //ReportHTML += '                 <div class="col-xs-2  " ></div>';
                                    ReportHTML += '                 </div>';
                                }
                                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBanksJournal.length + '</div>';
                            } //of looping through Currencies
                        }
                    } //of for (var j = 0; j < ArrBankIDList.length; j++) {
                    ReportHTML += '         <body>';
                    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }

                FadePageCover(false);
            }
            , null);
    }
}