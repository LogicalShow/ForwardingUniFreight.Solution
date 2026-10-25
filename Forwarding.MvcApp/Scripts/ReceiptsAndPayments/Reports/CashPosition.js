

function CashPosition_Print(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pCurrencyID: $("#slCurrency").val() == "" ? "-1" : $("#slCurrency").val()
        , pIsCash: $("#slIsCash").val()
        , pDate: $("#txtToDate").val()
        , pHideZeroes: $("#cbSuppressForZeroes").prop("checked")
    };
    CallPOSTFunctionWithParameters("/api/CashPosition/GetPrintedData", pParametersWithValues
        , function (pData) {
            CashPosition_Print_Detailed(pData, pOutputTo);
        }
        , null);
}

function CashPosition_Print_Detailed(pData, pOutputTo) {
    debugger;

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();


    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {

        pTablesHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'Account Name' + '</th>';

        // array of currency codes -----------
        var result = [];
        // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
        result.push("EGP", "USD", "EUR");
        //array 2 of AccountName
        var result2 = [];
        // fill currency codes --------------
        $.each(pTblRows, function (i, item) {
            if ($.inArray(item.Currency_Code, result) == -1)
                result.push(item.Currency_Code);
            if ($.inArray(item.AccountName, result2) == -1)
                result2.push(item.AccountName);
        });



        //for (var result, i = 0; result = result[i++];) {
        //    pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        //}
        for (var i = 0; i < result.length; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        }

        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';


        pTablesHTML += '             </tr>';



        debugger;

        /******************Add the row************************/
        for (var j = 0; j < result2.length; j++) {

            var CurrenctSubAccount = pTblRows.filter(x => x.AccountName == result2[j]);


            var isFirst = false;

            if (CurrenctSubAccount.length > 0) {

                pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                $.each(CurrenctSubAccount, function (i, item) {
                    if (isFirst == false) {
                        isFirst = true;
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';

                        for (var j = 0; j < result.length; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x => x.Currency_Code == result[j]);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balance == null ? 0 : CurrentRow[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }
                    }

                    pTablesHTML += '                 </tr>';

                });
            }



        }
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<u><b>" + "Total :" + "</u></b>" + '</td>';
        for (var j = 0; j < result.length; j++) {
            var CureentCurrencyRows = pTblRows.filter(x => x.Currency_Code == result[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        pTablesHTML += '                 </tr>';

        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
        //of for (var j = 0; j < result2.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    } else {
        pTablesHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'إسم الحساب' + '</th>';

        // array of currency codes -----------
        var result = [];
        // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
        result.push("EGP", "USD", "EUR");
        //array 2 of AccountName
        var result2 = [];
        // fill currency codes --------------
        $.each(pTblRows, function (i, item) {
            if ($.inArray(item.Currency_Code, result) == -1)
                result.push(item.Currency_Code);
            if ($.inArray(item.AccountName, result2) == -1)
                result2.push(item.AccountName);
        });



        //for (var result, i = 0; result = result[i++];) {
        //    pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        //}
        for (var i = 0; i < result.length; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        }

        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';


        pTablesHTML += '             </tr>';



        debugger;

        /******************Add the row************************/
        for (var j = 0; j < result2.length; j++) {

            var CurrenctSubAccount = pTblRows.filter(x => x.AccountName == result2[j]);


            var isFirst = false;

            if (CurrenctSubAccount.length > 0) {

                pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                $.each(CurrenctSubAccount, function (i, item) {
                    if (isFirst == false) {
                        isFirst = true;
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';

                        for (var j = 0; j < result.length; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x => x.Currency_Code == result[j]);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balance == null ? 0 : CurrentRow[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }
                    }

                    pTablesHTML += '                 </tr>';

                });
            }



        }
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<u><b>" + "الإجمالي :" + "</u></b>" + '</td>';
        for (var j = 0; j < result.length; j++) {
            var CureentCurrencyRows = pTblRows.filter(x => x.Currency_Code == result[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        pTablesHTML += '                 </tr>';

        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
        //of for (var j = 0; j < result2.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    }

    /*********************Append table summaries*************************/
    debugger;
    if (pOutputTo == "Excel") {
        // ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCashPosition");
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Cash Position' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '         <div id="Reportbody">';
            //for (var j = 0; j < result2.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cash Position</u></b>' + '</div>';
            // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + result2[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblCashPosition").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < result2.length; j++) {
            ReportHTML += '         </div>';
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
            $("#hExportedTable").html(ReportHTML);
            $("#Reportbody").table2excel({
                exclude: ".excludeThisClass",
                name: "Sheet 1",
                filename: "Cash Position" //do not include extension
            });
        } else {
            ReportHTML += '<html dir = "rtl">';
            ReportHTML += '     <head><title>' + 'يومية الموقف المالي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '         <div id="Reportbody">';
            //for (var j = 0; j < result2.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>يومية الموقف المالي</u></b>' + '</div>';
            // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'إلي : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'تاريخ الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + result2[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblCashPosition").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < result2.length; j++) {
            ReportHTML += '         </div>';
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
            $("#hExportedTable").html(ReportHTML);
            $("#Reportbody").table2excel({
                exclude: ".excludeThisClass",
                name: "Sheet 1",
                filename: "Cash Position" //do not include extension
            });
        }

    } else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Cash Position' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';

            //for (var j = 0; j < result2.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cash Position</u></b>' + '</div>';
            // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + result2[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblCashPosition").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < result2.length; j++) {
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir = "rtl">';
            ReportHTML += '     <head><title>' + 'يومية الموقف المالي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';

            //for (var j = 0; j < result2.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>يومية الموقف المالي</u></b>' + '</div>';
            // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'تاريخ الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + result2[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblCashPosition").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < result2.length; j++) {
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
        }

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}


function CashPosition_PrintSummary(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pParametersWithValues = {
        pCurrencyID: $("#slCurrency").val() == "" ? "-1" : $("#slCurrency").val()
        , pIsCash: $("#slIsCash").val()
        , pDate: $("#txtToDate").val()
        , pHideZeroes: $("#cbSuppressForZeroes").prop("checked")
    };
    CallPOSTFunctionWithParameters("/api/CashPosition/GetPrintedDataSummary", pParametersWithValues
        , function (pData) {
            CashPosition_Print_Summary(pData, pOutputTo);
        }
        , null);
}

function CashPosition_Print_Summary(pData, pOutputTo) {
    debugger;

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows_Cash = JSON.parse(pData[1]);
    var pTblRows_Banks = JSON.parse(pData[2]);
    var BankAcounts = JSON.parse(pData[3]);
    var BankInnerAcounts = JSON.parse(pData[4]);

    var IsDebitAndCredit = $("#cbIsDetailsByTotalInAndOut").prop("checked");

    debugger;
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();


    var pTablesHTML = "";

    pTablesHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTablesHTML += '                 <thead class="" style="">';
    pTablesHTML += '                     <th class="">' + 'Account Name' + '</th>';

    // array of currency codes -----------
    var Currencies = [];
    // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
    Currencies.push("EGP", "USD", "EUR", "GBP");
    // fill currency codes --------------
    $.each(pTblRows_Cash, function (i, item) {
        if ($.inArray(item.Currency_Code, Currencies) == -1)
            Currencies.push(item.Currency_Code);
    });



    for (var i = 0; i < Currencies.length; i++) {
        pTablesHTML += '                     <th class="">' + Currencies[i] + '</th>';
    }

    pTablesHTML += '                 </thead>';
    pTablesHTML += '                 <tbody>';


    pTablesHTML += '             </tr>';



    debugger;



    /***************************** Cash Start ****************************/
    let CurrenciesTotalForCash = Array.from({ length: Currencies.length }, () => 0);
    let CurrenciesDebitForCash = Array.from({ length: Currencies.length }, () => 0);
    let CurrenciesCreditForCash = Array.from({ length: Currencies.length }, () => 0);

    if (!IsDebitAndCredit) {
        // Total Row
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + "Total Cash :" + "</b>" + '</td>';
        for (var j = 0; j < Currencies.length; j++) {
            var CureentCurrencyRows = pTblRows_Cash.filter(x => x.Currency_Code == Currencies[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            })
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

            CurrenciesTotalForCash[j] += Total;
        }
        pTablesHTML += '                 </tr>';
    } else {
        // Debit Row In
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + "Cash (In):" + "</b>" + '</td>';
        for (var j = 0; j < Currencies.length; j++) {
            var CureentCurrencyRows = pTblRows_Cash.filter(x => x.Currency_Code == Currencies[j]);
            var Debit = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Debit = Debit + parseFloat(item.Debit);
            })
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

            CurrenciesDebitForCash[j] += Debit;
        }
        pTablesHTML += '                 </tr>';

        // Credit Row Out
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + "Cash (Out):" + "</b>" + '</td>';
        for (var j = 0; j < Currencies.length; j++) {
            var CureentCurrencyRows = pTblRows_Cash.filter(x => x.Currency_Code == Currencies[j]);
            var Credit = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Credit = Credit + parseFloat(item.Credit);
            })
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

            CurrenciesCreditForCash[j] += Credit;
        }
        pTablesHTML += '                 </tr>';

    }
    

    /***************************** Cash End ****************************/




    /***************************** Banks Start ****************************/

    pTablesHTML += '<tr class="" style="font-size:95%;"> <td colspan="1" style="text-align:center;" class=""></td>' + ('<td></td>'.repeat(Currencies.length)) + '</tr>'
    pTablesHTML += '<tr class="" style="font-size:95%;"> <td colspan="1" style="text-align:center;" class=""><u><b>Banks</b></u></td>' + ('<td></td>'.repeat(Currencies.length)) + '</tr>'

    // for every BankAcounts find all BankInnerAcounts that has Parent_ID=BankAcounts[i]
    // then for every currency >> find sum(Balance) for all pTblRows_Banks that has the same Currency_ID and AccountID as 

    debugger;

    let CurrenciesTotalForBanks = Array.from({ length: Currencies.length }, () => 0);
    let CurrenciesDebitForBanks = Array.from({ length: Currencies.length }, () => 0);
    let CurrenciesCreditForBanks = Array.from({ length: Currencies.length }, () => 0);

    for (let i = 0; i < BankAcounts.length; i++) {
        debugger;
        let CurrentBankAccountID = BankAcounts[i].ID;
        let CurrentBankAccountName = BankAcounts[i].Account_Name;

        let ChildBankInnerAccounts = BankInnerAcounts.filter(InnerAccount => InnerAccount.Parent_ID == CurrentBankAccountID);
        let ChildBankInnerAccounts_IDArray = ChildBankInnerAccounts.map(x => x.ID);

        // Calculate Total for this bank, because if zero and $("#cbSuppressForZeroes").prop("checked") then continue loop without draing
        let TotalForThisBank = 0;
        for (var j = 0; j < Currencies.length; j++) {
            var CureentCurrencyRows = pTblRows_Banks.filter(x => x.Currency_Code == Currencies[j] && (ChildBankInnerAccounts_IDArray.includes(x.AccountID) || CurrentBankAccountID == x.AccountID));
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            })

            TotalForThisBank += Total;
        }



        if (TotalForThisBank == 0 && $("#cbSuppressForZeroes").prop("checked")) {
            continue;
        } else {
            debugger;
            if (!IsDebitAndCredit) {
                // Total Row
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + (CurrentBankAccountName) + "</b>" + '</td>';
                for (var j = 0; j < Currencies.length; j++) {
                    var CureentCurrencyRows = pTblRows_Banks.filter(x => x.Currency_Code == Currencies[j] && (ChildBankInnerAccounts_IDArray.includes(x.AccountID) || CurrentBankAccountID == x.AccountID));
                    var Total = 0.000;
                    $.each(CureentCurrencyRows, function (i, item) {
                        Total = Total + parseFloat(item.Balance);
                    })
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

                    CurrenciesTotalForBanks[j] += Total;
                }
                pTablesHTML += '                 </tr>';
            } else {
                // Debit Row In
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + (CurrentBankAccountName) + " (In)</b>" + '</td>';
                for (var j = 0; j < Currencies.length; j++) {
                    var CureentCurrencyRows = pTblRows_Banks.filter(x => x.Currency_Code == Currencies[j] && (ChildBankInnerAccounts_IDArray.includes(x.AccountID) || CurrentBankAccountID == x.AccountID));
                    var Debit = 0.000;
                    $.each(CureentCurrencyRows, function (i, item) {
                        Debit = Debit + parseFloat(item.Debit);
                    })
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

                    CurrenciesDebitForBanks[j] += Debit;
                }
                pTablesHTML += '                 </tr>';

                // Credit Row Out
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + (CurrentBankAccountName) + " (Out)</b>" + '</td>';
                for (var j = 0; j < Currencies.length; j++) {
                    var CureentCurrencyRows = pTblRows_Banks.filter(x => x.Currency_Code == Currencies[j] && (ChildBankInnerAccounts_IDArray.includes(x.AccountID) || CurrentBankAccountID == x.AccountID));
                    var Credit = 0.000;
                    $.each(CureentCurrencyRows, function (i, item) {
                        Credit = Credit + parseFloat(item.Credit);
                    })
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

                    CurrenciesCreditForBanks[j] += Credit;
                }
                pTablesHTML += '                 </tr>';
            }
            
        }


    }

    /***************************** Banks End ****************************/


    if (IsDebitAndCredit) {
        CurrenciesTotalForCash = CurrenciesDebitForCash.map((num, idx) => num - CurrenciesCreditForCash[idx]);
        CurrenciesTotalForBanks = CurrenciesDebitForBanks.map((num, idx) => num - CurrenciesCreditForBanks[idx]);
    }


    // Total for Banks
    pTablesHTML += '<tr class="" style="font-size:95%;"> <td colspan="1" style="text-align:center;" class=""></td>' + ('<td></td>'.repeat(Currencies.length)) + '</tr>'
    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + "Total for Banks :" + "</b>" + '</td>';
    for (var j = 0; j < CurrenciesTotalForBanks.length; j++) {
        pTablesHTML += '                     <td style="text-align:center;" class="">' + CurrenciesTotalForBanks[j].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    }
    pTablesHTML += '                 </tr>';


    

    let CurrenciesTotalForAll = CurrenciesTotalForCash.map((num, idx) => num + CurrenciesTotalForBanks[idx]);

    // Total for All
    pTablesHTML += '<tr class="" style="font-size:95%;"> <td colspan="1" style="text-align:center;" class=""></td>' + ('<td></td>'.repeat(Currencies.length)) + '</tr>'
    pTablesHTML += '<tr class="" style="font-size:95%;"> <td colspan="1" style="text-align:center;" class=""></td>' + ('<td></td>'.repeat(Currencies.length)) + '</tr>'
    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                     <td colspan="1" style="text-align:center;" class="">' + "<b>" + "Total for All :" + "</b>" + '</td>';
    for (var j = 0; j < CurrenciesTotalForBanks.length; j++) {
        pTablesHTML += '                     <td style="text-align:center;" class="">' + CurrenciesTotalForAll[j].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    }
    pTablesHTML += '                 </tr>';





    pTablesHTML += '                 </tbody>';
    pTablesHTML += '             </table>';

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately











    /*********************Append table summaries*************************/
    debugger;
    if (pOutputTo == "Excel") {
        // ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCashPosition");
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Cash Position' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cash Position</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblCashPosition").html();
        ReportHTML += '             </table>';
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: "Cash Position" //do not include extension
        });

    } else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Cash Position' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';

        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cash Position</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        ReportHTML += '             <table id="tblCashPosition' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblCashPosition").html();
        ReportHTML += '             </table>';
        ReportHTML += '         <body>';
        ReportHTML += '</html>';

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}