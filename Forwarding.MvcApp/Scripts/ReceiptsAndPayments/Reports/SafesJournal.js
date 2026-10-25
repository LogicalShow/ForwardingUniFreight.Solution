
function SafesJournal_cbCheckAllSafesChanged() {
    debugger;
    if ($("#cbCheckAllSafes").prop("checked"))
        $("#divCbSafe input[name=nameCbSafe]").prop("checked", true);
    else
        $("#divCbSafe input[name=nameCbSafe]").prop("checked", false);
}
function SafesJournal_cbCheckAllCurrencyChanged() {
    debugger;
    if ($("#cbCheckAllCurrency").prop("checked"))
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", true);
    else
        $("#divCbCurrency input[name=nameCbCurrency]").prop("checked", false);
}
function SafesJournal_Print(pOutputTo) {
    debugger;
    var pSafeIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSafe");
    var pCurrencyIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCurrency");
    if (pSafeIDList == "" || pCurrencyIDList == "")
        swal("Sorry", "Please, select at least one safe and one currency.");
    else {
        FadePageCover(true);

        var pAddFleetData = $("#cbAddFleet").prop("checked");
        var pParametersWithValues = {
            pSafeIDList: pSafeIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pCurrencyIDList: pCurrencyIDList
            , pPostStatus: $("#slStatus").val()
            , pShowRevaluateEntry: false
            , pAddFleetData: $("#cbAddFleet").prop("checked")
        };
        CallGETFunctionWithParameters("/api/SafesJournal/GetPrintedData", pParametersWithValues
            , function (pData) {

                if (pAddFleetData) {
                    SafesJournal_Print_Mesco(pOutputTo, pData);
                }
                else {

                    var pDefaultsHeader = JSON.parse(pData[0]);
                    var pSafesJournal = JSON.parse(pData[1]);
                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    var pFormattedPrintTime = getTime();
                    var ArrSafeIDList = pSafeIDList.split(',');
                    var ArrCurrencyIDList = pCurrencyIDList.split(',');
                    //pDescriptionOfGoods.replace(/\n/g, "<br />")
                    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
                    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

                    var pTablesHTML = "";
                    for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                        for (var j = 0; j < ArrSafeIDList.length; j++) {
                            var pIsOpenBalanceRowAdded = false;
                            pTablesHTML += '             <table id="tblSafesJournal' + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                            pTablesHTML += '                 <thead class="" style="">';
                            pTablesHTML += '                     <th class="">' + TranslateString("No") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("Date") + '</thb>';
                            pTablesHTML += '                     <th class="">' + TranslateString("TransType") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("ChargedPerson") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("Notes") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("Debit") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("Credit") + '</th>';
                            pTablesHTML += '                     <th class="">' + TranslateString("Balance") + '</th>';
                            pTablesHTML += '                 </thead>';
                            pTablesHTML += '                 <tbody>';

                            if (pOutputTo == "Excel") { //to add the name of Safe and currency for the excel files
                                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + TranslateString("Safe") + $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                 </tr>';
                            }
                            //if (pSafesJournal != null)
                            var pPreviousRowBalance = 0;
                            $.each(pSafesJournal, function (i, item) {
                                if (item.Safe_Name.trim() == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim()
                                    && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()) {
                                    /******************Get Columns with conditions************************/
                                    debugger;
                                    var Debit = (item.InOut ? item.Amount : 0);
                                    var Credit = (!item.InOut ? item.Amount : 0);
                                    var Balance = pPreviousRowBalance + parseFloat(Debit) - parseFloat(Credit);
                                    pPreviousRowBalance = Balance; //To be used in the next row
                                    /******************Add the row************************/
                                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                                    if (pOutputTo != "Excel")
                                        pTablesHTML += '                     <td style="text-align:center;" class="CurrencyCode hide">' + item.Currency_Code.trim() + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoucherNo + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="">' + ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate)) + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Type + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="Debit">' + Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="Credit">' + Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                    pTablesHTML += '                     <td style="text-align:center;" class="Balance">' + Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                    pTablesHTML += '                 </tr>';
                                } //of if (item.Safe_Name.trim() == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim()
                                //        && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim())
                            });
                            pTablesHTML += '                 </tbody>';
                            pTablesHTML += '             </table>';

                        }//of for (var j = 0; j < ArrSafeIDList.length; j++)
                    }//of for looping through Currencies
                    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

                    var Suppress = $("#cbSuppressForZeroes").prop("checked");
                    /*********************Append table summaries*************************/
                    debugger;
                    for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                        for (var j = 0; j < ArrSafeIDList.length; j++) {
                            var pTotalDebit = GetColumnSum("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Debit");
                            var pTotalCredit = GetColumnSum("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Credit");
                            var pFinalBalance = $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.Balance").text();
                            var pFinalBalanceCurrency = $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.CurrencyCode").text();
                            var pRowTotalsHTML = "";
                            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
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
                            pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b>' + TranslateString("EndBalance") + '</b></td>';
                            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + (isNaN(parseFloat(pFinalBalance)) ? 0 : parseFloat(pFinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pFinalBalanceCurrency + '</td>';
                            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pFinalBalance + ' ' + pFinalBalanceCurrency + '</td>';
                            pRowTotalsHTML += '                            </tr>';
                            $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody").append(pRowTotalsHTML);
                        } //of Looping through Safes
                    } //of looping through Currencies
                    if (pOutputTo == "Excel") {
                        for (var j = 0; j < ArrSafeIDList.length; j++)
                            for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                                var CurrentRows = pSafesJournal.filter(x => x.Safe_Name == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                                if (!Suppress || CurrentRows.length > 0) {
                                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()
                                        , $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim());
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
                        ReportHTML += '     <head><title>' + TranslateString("SafeJournal") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        for (var j = 0; j < ArrSafeIDList.length; j++) {
                            for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                                //if (i > 0)

                                var CurrentRows = pSafesJournal.filter(x => x.Safe_Name == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                                if (!Suppress || CurrentRows.length > 0) {
                                    ReportHTML += '         <div class="break"></div>';
                                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + TranslateString("SafeJournal") + '</u></b>' + '</div>';
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
                                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + TranslateString("Safe") + '</b>' + $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>'
                                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                                    ReportHTML += '             <table id="tblSafesJournal' + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                                    ReportHTML += '             ' + $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()).html();
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

                                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSafesJournal.length + '</div>';
                                } //of looping through Currencies
                            }
                        } //of for (var j = 0; j < ArrSafeIDList.length; j++) {
                        ReportHTML += '         <body>';
                        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                }
                FadePageCover(false);
            }
            , null);
    }
}
function SafesJournal_Print_Mesco(pOutputTo, pData) {

    var pSafeIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSafe");
    var pCurrencyIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCurrency");
    var pAddFleetData = $("#cbAddFleet").prop("checked");

        var pDefaultsHeader = JSON.parse(pData[0]);
        var pSafesJournal = JSON.parse(pData[1]);
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var ArrSafeIDList = pSafeIDList.split(',');
        var ArrCurrencyIDList = pCurrencyIDList.split(',');
        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

        var pTablesHTML = "";
        for (var k = 0; k < ArrCurrencyIDList.length; k++) {
            for (var j = 0; j < ArrSafeIDList.length; j++) {
                var pIsOpenBalanceRowAdded = false;
                pTablesHTML += '             <table id="tblSafesJournal' + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTablesHTML += '                 <thead class="" style="">';
        
                pTablesHTML += '                     <th class="">' + "" + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("No") + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("Date") + '</thb>';
                pTablesHTML += '                     <th class="">' + TranslateString("TransType") + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("ChargedPerson") + '</th>';
                pTablesHTML += '                     <th class="">' + "PO" + '</th>';
                pTablesHTML += '                     <th class="">' + "InvoiceNo" + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("Notes") + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("Debit") + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("Credit") + '</th>';
                pTablesHTML += '                     <th class="">' + TranslateString("Balance") + '</th>';
                pTablesHTML += '                 </thead>';
                pTablesHTML += '                 <tbody>';

                if (pOutputTo == "Excel") { //to add the name of Safe and currency for the excel files
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                    pTablesHTML += '                     <td class="">' + "" + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + TranslateString("Safe") + $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
                //if (pSafesJournal != null)
                var pPreviousRowBalance = 0;
                $.each(pSafesJournal, function (i, item) {
                    if (item.Safe_Name.trim() == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim()
                        && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()) {
                        /******************Get Columns with conditions************************/
                        debugger;
                        var Debit = (item.InOut ? item.Amount : 0);
                        var Credit = (!item.InOut ? item.Amount : 0);
                        var Balance = pPreviousRowBalance + parseFloat(Debit) - parseFloat(Credit);
                        pPreviousRowBalance = Balance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel")
                            pTablesHTML += '                     <td style="text-align:center;" class="CurrencyCode hide">' + item.Currency_Code.trim() + '</td>';
                  
                        pTablesHTML += '                     <td class="">' + item.SystemName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoucherNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate)) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Type + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.PO == 0 ? "" : item.PO) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.InvoiceNo == 0 ? "" : item.InvoiceNo) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Debit">' + Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Credit">' + Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Balance">' + Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //of if (item.Safe_Name.trim() == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim()
                    //        && item.Currency_Code.trim() == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim())
                });
                pTablesHTML += '                 </tbody>';
                pTablesHTML += '             </table>';

            }//of for (var j = 0; j < ArrSafeIDList.length; j++)
        }//of for looping through Currencies
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var Suppress = $("#cbSuppressForZeroes").prop("checked");
        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCurrencyIDList.length; k++) {
            for (var j = 0; j < ArrSafeIDList.length; j++) {
                var pTotalDebit = GetColumnSum("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Debit");
                var pTotalCredit = GetColumnSum("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim(), "Credit");
                var pFinalBalance = $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.Balance").text();
                var pFinalBalanceCurrency = $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody tr:last td.CurrencyCode").text();
                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
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
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b>' + TranslateString("EndBalance") + '</b></td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + (isNaN(parseFloat(pFinalBalance)) ? 0 : parseFloat(pFinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' ' + pFinalBalanceCurrency + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pFinalBalance + ' ' + pFinalBalanceCurrency + '</td>';
                pRowTotalsHTML += '                            </tr>';
                $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + " tbody").append(pRowTotalsHTML);
            } //of Looping through Safes
        } //of looping through Currencies
        if (pOutputTo == "Excel") {
            for (var j = 0; j < ArrSafeIDList.length; j++)
                for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                    debugger;
                    var CurrentRows = pSafesJournal.filter(x => x.Safe_Name == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                    if (!Suppress || CurrentRows.length > 0) {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()
                            , $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim());
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
            ReportHTML += '     <head><title>' + TranslateString("SafeJournal") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSafeIDList.length; j++) {
                for (var k = 0; k < ArrCurrencyIDList.length; k++) {
                    //if (i > 0)

                    var CurrentRows = pSafesJournal.filter(x => x.Safe_Name == $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() && x.Currency_Code == $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() && x.Amount != 0);
                    if (!Suppress || CurrentRows.length > 0) {
                        ReportHTML += '         <div class="break"></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + TranslateString("SafeJournal") + '</u></b>' + '</div>';
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
                        ReportHTML += '             <div class="col-xs-12"><h4><b>' + TranslateString("Safe") + '</b>' + $("#divCbSafe input[name=nameCbSafe][value=" + ArrSafeIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>'
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblSafesJournal' + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim() + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblSafesJournal" + ArrSafeIDList[j] + "-" + $("#divCbCurrency input[name=nameCbCurrency][value=" + ArrCurrencyIDList[k] + "]").siblings().text().trim()).html();
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

                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSafesJournal.length + '</div>';
                    } //of looping through Currencies
                }
            } //of for (var j = 0; j < ArrSafeIDList.length; j++) {
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    
}
function ExportExcelPaymentOrderReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentOrderReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Payment Order Report"
        , pReportName: "MescoPaymentOrderReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}

function ExportExcelPaymentRequestReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentRequestReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Payment Request Report"
        , pReportName: "MescoPaymentRequestReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}
function ExportExcelCashReceiveReport() {
    debugger;
    FadePageCover(true);
    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("dummy");

    var pParametersWithValues =
    {
        query: "select * from vwMescoPaymentOrderReport order by ID desc"
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Cash Receive Report"
        , pReportName: "MescoCashReceiveReport"
        , pReportType: "Excel"
    };

    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    var win = window.open(url, "_blank");
    win.close;
    if (win) {
        win.addEventListener('beforeunload', function (event) {
            FadePageCover(false);
        });
    }
}