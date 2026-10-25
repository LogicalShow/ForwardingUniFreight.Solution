function AccountLedger_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function CostCenterLedger_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}

function BranchLedger_cbCheckAllBranchChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}

function ChangeOption() {
    debugger;
    if($('#cbIsDetails').prop('checked'))
        $("#cbWithOtherSide").parent().removeClass("hide");
    else
        $("#cbWithOtherSide").parent().addClass("hide");
}


function AccountLedger_cbCheckAllJournalTypesChanged() {
    debugger;
    if ($("#cbCheckAllJournalTypes").prop("checked"))
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", true);
    else
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", false);
}
function AccountLedger_Print(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pJournalTypeIDList = $("#cbCheckAllJournalTypes").prop("checked")
                                ? "-1"
                                : GetAllSelectedIDsAsStringWithNameAttr("nameCbJournalType");
    var pBranchIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");
   
    if (pAccountIDList == "" || pJournalTypeIDList == "")
        swal("Sorry", "Please, select at least one account and one journal type.");
    else if (pCostCenterIDList == "" && $("#cbIsGroupByCostCenter").prop("checked"))
        swal("Sorry", "Please, select at least one cost center.");
    else if (pBranchIDList == "" && $("#cbIsGroupByBranch").prop("checked"))
        swal("Sorry", "Please, select at least one Branch.");
    else {

        if ($("#cbCheckAllCostCenters").prop("checked"))
            pCostCenterIDList = '-1'

        if ($("#cbCheckAllAccounts").prop("checked") && $('#slAccountsGroups').val() == "0" )
            pAccountIDList = '-1'

        if ($("#cbCheckAllBranch").prop("checked") || pBranchIDList == '')
            pBranchIDList = '-1'

        FadePageCover(true);
        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pBranchIDList: pBranchIDList
            , pCostCenterIDList: pCostCenterIDList
            , pJournalTypeIDList: pJournalTypeIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pPostStatus: $("#slStatus").val()
            , pIsGroupByCostCenter: $("#cbIsGroupByCostCenter").prop("checked")
            , pIsGroupByBranch: $("#cbIsGroupByBranch").prop("checked")
            , pWithOtherSide:  $('#cbWithOtherSide').prop('checked')
        };
        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
                    if ($("#cbIsDetails").prop("checked"))
                        AccountLedger_Print_Detailed_OneEgypt(pData, pOutputTo);
                    else if ($("#cbIsGroupByCostCenter").prop("checked"))
                        AccountLedger_Print_GroupByCC_OneEgypt(pData, pOutputTo);
                    else if ($("#cbIsGroupByBranch").prop("checked"))
                        AccountLedger_Print_GroupByBranch_OneEgypt(pData, pOutputTo);
                }
                else { //otherCompanies
                    if ($("#cbIsDetails").prop("checked"))
                        AccountLedger_Print_Detailed(pData, pOutputTo);
                    else if ($("#cbIsGroupByCostCenter").prop("checked"))
                        AccountLedger_Print_GroupByCC(pData, pOutputTo);
                    else if ($("#cbIsGroupByBranch").prop("checked"))
                        AccountLedger_Print_GroupByBranch(pData, pOutputTo);
                }
            }
            , null);
    }
}
function AccountLedger_Print_Detailed_OneEgypt(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
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
        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance' + '</th>';
        if ($("#cbShowSubAccount").prop("checked"))
            pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pAccountLedger != null)
        var pPreviousRowFBalanceD = 0; //final balance $
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pAccountLedger, function (i, item) {
            if (item.Account_ID == ArrAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + '&emsp;&emsp;&emsp; ' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                    }
                    pTablesHTML += '             </tr>';
                    pIsOpenBalanceRowAdded = true;
                    pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                    pPreviousRowFBalance = item.Opening_Balance;
                }
                if (item.ID/*JV_ID*/ != 0) { //add normal row
                    /******************Get ForeigCur final balance************************/
                    debugger;
                    var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                ? (item.LocalDebit / item.CuNow)
                                : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                                );
                    var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                ? (item.LocalCredit / item.CuNow)
                                : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                                );
                    var fBalD = Deb - Cre;
                    var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                    pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                    /******************Get LocalCur final balance************************/
                    var fBal = item.LocalDebit - item.LocalCredit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + FBalanceD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    if ($("#cbShowSubAccount").prop("checked"))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j])
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Deb");
        var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
        var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="3" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + 'Totals: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        if ($("#cbShowSubAccount").prop("checked"))
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrAccountIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
           // if (i > 0)
                ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';

        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}
function AccountLedger_Print_GroupByCC_OneEgypt(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'FBalance$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'FBalance' + '</th>';
            //if ($("#cbShowSubAccount").prop("checked"))
            //    pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of Account and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + 'Account : ' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                //if ($("#cbShowSubAccount").prop("checked"))
                //    pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';
                pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pAccountLedger, function (i, item) {
                if (item.Account_ID == ArrAccountIDList[j]
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '9' : '9') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td class="" style="text-align:center;">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + '&emsp;&emsp;&emsp; ' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                            //if ($("#cbShowSubAccount").prop("checked"))
                            //    pTablesHTML += '                     <td class="" style="text-align:center;">' + '' + '</td>';//SubAccount
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;
                        var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                    ? (item.LocalDebit / item.CuNow)
                                    : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                                    );
                        var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                    ? (item.LocalCredit / item.CuNow)
                                    : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                                    );
                        var fBalD = Deb - Cre;
                        var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + FBalanceD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        //if ($("#cbShowSubAccount").prop("checked"))
                        //    pTablesHTML += '                     <td class="" style="text-align:center;">' + item.SubAccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.Account_ID == ArrAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrAccountIDList.length; j++)
    } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Deb");
            var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalCredit");
            var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel")
                pRowTotalsHTML += '                                <td class="" colspan="2" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
            else { //Excel
                pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '' + '</td>';
                pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + 'Totals: ' + '</td>';
            }
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
            //if ($("#cbShowSubAccount").prop("checked"))
            //    pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
            if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody").append(pRowTotalsHTML);
        } //of looping through Accounts
    } //of looping through CostCenters
    if (pOutputTo == "Excel") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrAccountIDList.length; j++)
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''));
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
               // if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '')).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            } //of for (var j = 0; j < ArrAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';

        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}

function AccountLedger_Print_GroupByBranch_OneEgypt(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pBranchIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
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
        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance' + '</th>';
        if ($("#cbShowSubAccount").prop("checked"))
            pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pAccountLedger != null)
        var pPreviousRowFBalanceD = 0; //final balance $
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pAccountLedger, function (i, item) {
            if (item.Account_ID == ArrAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + '&emsp;&emsp;&emsp; ' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                    }
                    pTablesHTML += '             </tr>';
                    pIsOpenBalanceRowAdded = true;
                    pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                    pPreviousRowFBalance = item.Opening_Balance;
                }
                if (item.ID/*JV_ID*/ != 0) { //add normal row
                    /******************Get ForeigCur final balance************************/
                    debugger;
                    var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                ? (item.LocalDebit / item.CuNow)
                                : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                                );
                    var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                                ? (item.LocalCredit / item.CuNow)
                                : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                                );
                    var fBalD = Deb - Cre;
                    var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                    pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                    /******************Get LocalCur final balance************************/
                    var fBal = item.LocalDebit - item.LocalCredit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + FBalanceD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    if ($("#cbShowSubAccount").prop("checked"))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j])
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Deb");
        var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
        var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="3" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '' + '</td>';
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + 'Totals: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalForeignCurCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        if ($("#cbShowSubAccount").prop("checked"))
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td class="" style="text-align:center;">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrAccountIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            // if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';

        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}


function AccountLedger_Print_Detailed(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[2]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
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
            if ($("#cbShowSubAccount").prop("checked"))
                pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
           if( $('#cbWithOtherSide').prop('checked'))
                pTablesHTML += '                     <th class="">' + 'Other Side' + '</th>';

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

                            if ($('#cbWithOtherSide').prop('checked'))
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '14' : '13') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                                else
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '13' : '12') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';


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
                            if ($("#cbShowSubAccount").prop("checked"))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                            if(  $('#cbWithOtherSide').prop('checked'))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//OtherSide
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get final balance************************/
                        //  debugger;
                        var Deb = item.Debit;
                        var Cre = item.Credit;
                        var fBalD = Deb - Cre;
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td class="" style="text-align:center;">' + '<a href="#" onclick="JournalVoucher_Print(' + item.ID + ', event'  + ');" >' + '<span>' + '&emsp;' + item.JVNo + '</span>' + '</td></a> ';
                       // pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '<a href="#" onclick="PrintVoucherAndInvoice(' + item.TransID + ',' + item.TransType + ');" >' + '<span>' + '&emsp;' + item.ReceiptNo + '</span>' + '</td></a> ';

                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                        if ($('#cbWithOtherSide').prop('checked'))
                          pTablesHTML += '                     <td style="text-align:center;" class="">' + item.OtherSide + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.Account_ID == ArrAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }
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
            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
           if( $('#cbWithOtherSide').prop('checked'))
                      pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
                    (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
                   // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                    '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        } //for (var j = 0; j < ArrAccountIDList.length; j++)
    }
else{
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
        pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
        pTablesHTML += '                     <th class="">' + 'نوع القيد' + '</th>';
        pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مركز التكلفة' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
        pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
        pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
        pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
        if ($("#cbShowSubAccount").prop("checked"))
            pTablesHTML += '                     <th class="">' + 'الحساب التحليلي' + '</th>';
        if ($('#cbWithOtherSide').prop('checked'))
            pTablesHTML += '                     <th class="">' + 'الاطراف الاخرى' + '</th>';
        pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
        pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pAccountLedger != null)
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pAccountLedger, function (i, item) {
            if (item.Account_ID == ArrAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {


                        if ($('#cbWithOtherSide').prop('checked'))
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '14' : '13') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                        else
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '13' : '12') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';


                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي:' + '</td>';
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
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        if ($('#cbWithOtherSide').prop('checked'))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//OtherSide
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    pTablesHTML += '             </tr>';
                    pIsOpenBalanceRowAdded = true;
                    pPreviousRowFBalance = item.Opening_Balance;
                }
                if (item.ID/*JV_ID*/ != 0) { //add normal row
                    /******************Get final balance************************/
                    //  debugger;
                    var Deb = item.Debit;
                    var Cre = item.Credit;
                    var fBalD = Deb - Cre;
                    /******************Get LocalCur final balance************************/
                    var fBal = item.LocalDebit - item.LocalCredit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo+ '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                    if ($("#cbShowSubAccount").prop("checked"))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    if ($('#cbWithOtherSide').prop('checked'))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.OtherSide + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j])
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    }
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
            pRowTotalsHTML += '                                <td class="" colspan="8" style="text-align:center;"><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الإجمالي: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if (pOutputTo == "Excel")
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#cbShowSubAccount").prop("checked"))
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($('#cbWithOtherSide').prop('checked'))
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance +
                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
               // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    } //for (var j = 0; j < ArrAccountIDList.length; j++)
    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

    
    if (pOutputTo == "Excel") {
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '         <div id="Reportbody">';
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
                if (!Suppress || CurrentRows.length > 0) {
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

                    ReportHTML += '                     <table id="tblHeader' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         <tbody>';
                    if (j > 0) {
                        ReportHTML += '             </tr>';
                        ReportHTML += '             <tr class="">';
                        ReportHTML += '             </tr>';
                        ReportHTML += '             <tr class="">';
                        ReportHTML += '             </tr>';
                    }
                    ReportHTML += '             <tr class="">';

                    ReportHTML += '             <tr class="">';
                    ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4> </td>';
                    ReportHTML += '             </tr>';
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';

                  //  ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-12"></div>';
                    // ReportHTML += '                 <div class="col-xs-4">';   
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         <tbody>';
                    $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                        if (ArrAccountIDList[j] == item.Account_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                }
            } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
            ReportHTML += '         </div>';
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';


        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '         <div id="Reportbody">';
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
                if (!Suppress || CurrentRows.length > 0) {
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ</u></b>' + '</div>';

                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    //ReportHTML += '             <div class="col-xs-6 "></div>';
                    //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب:  ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-12"></div>';
                    // ReportHTML += '                 <div class="col-xs-4">';   
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         <tbody>';
                    $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                        if (ArrAccountIDList[j] == item.Account_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                }
            } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
            ReportHTML += '         </div>';
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }

        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

        $("#hExportedTable").html(ReportHTML);

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: " Account Ledger " + pFormattedTodaysDate //do not include extension
        });
        //for (var j = 0; j < ArrAccountIDList.length; j++)
        //{
        //    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
        //    if (!Suppress || CurrentRows.length > 0) {
        //        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
        //    }
        //}
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en"){
            ReportHTML += '<html>';
            ReportHTML += '     <head>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML +=  '</head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                /*****************************Creating table tblSumCurrencyByCC****************************************/
                ReportHTML += '             <div class="col-xs-12"></div>';
                // ReportHTML += '                 <div class="col-xs-4">';   
                ReportHTML += '                 <div class="col-xs-12">';
                ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '                         <tbody>';
                $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                    if (ArrAccountIDList[j] == item.Account_ID) {
                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                        ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                        ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                        ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                        ReportHTML += '             </tr>';
                    }
                });
                ReportHTML += '                         </tbody>';
                ReportHTML += '                     </table>';
                ReportHTML += '                 </div>';
            }
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
    else{
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts; 
            ReportHTML += '</head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ</u></b>' + '</div>';
                
                ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                //ReportHTML += '             <div class="col-xs-6 "></div>';
                //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
                ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             </div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب:  ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                /*****************************Creating table tblSumCurrencyByCC****************************************/
                ReportHTML += '             <div class="col-xs-12"></div>';
                // ReportHTML += '                 <div class="col-xs-4">';   
                ReportHTML += '                 <div class="col-xs-12">';
                ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '                         <tbody>';
                $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                    if (ArrAccountIDList[j] == item.Account_ID) {
                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                        ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                        ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                        ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                        ReportHTML += '             </tr>';
                    }
                });
                ReportHTML += '                         </tbody>';
                ReportHTML += '                     </table>';
                ReportHTML += '                 </div>';
            }
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        }

        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}




function AccountLedger_Print_GroupByBranch(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pBranchIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');
    var ArrBranchIDList = pBranchIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var k = 0; k < ArrBranchIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var pIsOpenBalanceRowAdded = false;
                pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTablesHTML += '                 <thead class="" style="">';
                pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
                pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
                pTablesHTML += '                 </thead>';
                pTablesHTML += '                 <tbody>';
                if (pOutputTo == "Excel") { //to add the name of Account and CostCenter for the excel files
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'Account : ' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
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
                var pPreviousRowFBalance = 0; //final balance Local Cur
                $.each(pAccountLedger, function (i, item) {
                    if (item.Account_ID == ArrAccountIDList[j]
                        && item.BranchName.trim() == $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim()) {
                        if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            if (pOutputTo != "Excel") {
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '9' : '9') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                                pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                            }
                            else { //Excel
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalanceD
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalance
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
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        } //normal rows
                    } //of if (item.Account_ID == ArrAccountIDList[j]
                    //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
                });
                pTablesHTML += '                 </tbody>';
                pTablesHTML += '             </table>';
            }//of for (var j = 0; j < ArrAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrBranchIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                //var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Deb");
                //var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Cre");
                var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalDebit");
                var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalCredit");
                //var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text();
                var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text();
                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel")
                    pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
                else { //Excel
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
                }
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b><u>' + 'Balance: ' + '</b></u></td>';
                if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                pRowTotalsHTML += '                            </tr>';
                $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody").append(pRowTotalsHTML);
            } //of looping through Accounts
        } //of looping through CostCenters
    }
    else {
        for (var k = 0; k < ArrBranchList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var pIsOpenBalanceRowAdded = false;
                pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTablesHTML += '                 <thead class="" style="">';
                pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
                pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
                pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
                pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
                pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
                pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
                pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
                pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
                pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
                pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
                pTablesHTML += '                 </thead>';
                pTablesHTML += '                 <tbody>';
                if (pOutputTo == "Excel") { //to add the name of Account and CostCenter for the excel files
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الحساب : ' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
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
                var pPreviousRowFBalance = 0; //final balance Local Cur
                $.each(pAccountLedger, function (i, item) {
                    if (item.Account_ID == ArrAccountIDList[j]
                        && item.BranchName.trim() == $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchList[k] + "]").siblings().text().trim()) {
                        if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            if (pOutputTo != "Excel") {
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '9' : '9') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                                pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                            }
                            else { //Excel
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalanceD
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalance
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
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        } //normal rows
                    } //of if (item.Account_ID == ArrAccountIDList[j]
                    //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
                });
                pTablesHTML += '                 </tbody>';
                pTablesHTML += '             </table>';
            }//of for (var j = 0; j < ArrAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrBranchIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                //var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Deb");
                //var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Cre");
                var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalDebit");
                var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalCredit");
                //var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text();
                var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text();
                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel")
                    pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
                else { //Excel
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الإجمالي: ' + '</td>';
                }
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b><u>' + 'الرصيد: ' + '</b></u></td>';
                if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                pRowTotalsHTML += '                            </tr>';
                $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody").append(pRowTotalsHTML);
            } //of looping through Accounts
        } //of looping through CostCenters
    }
    if (pOutputTo == "Excel") {
        for (var k = 0; k < ArrBranchIDList.length; k++)
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
                    x.BranchName.trim() == $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim());
                if (!Suppress || CurrentRows.length > 0) {
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''));
                }
            }
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrBranchIDList.length; k++) {
                for (var j = 0; j < ArrAccountIDList.length; j++) {
                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
        x.BranchName.trim() == $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim());
                    if (!Suppress || CurrentRows.length > 0) {
                        // if (i > 0)
                        ReportHTML += '         <div class="break"></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '')).html();
                        ReportHTML += '             </table>';
                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                    }
                } //of for (var j = 0; j < ArrAccountIDList.length; j++)
            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrBranchIDList.length; k++) {
                for (var j = 0; j < ArrAccountIDList.length; j++) {
                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
        x.BranchName.trim() == $("#divCbBranch input[name=nameCbBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim());
                    if (!Suppress || CurrentRows.length > 0) {
                        // if (i > 0)
                        ReportHTML += '         <div class="break"></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ</u></b>' + '</div>';
                        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                        //ReportHTML += '             <div class="col-xs-6 "></div>';
                        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
                        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        ReportHTML += '             </div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbBranch input[name=nameBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbBranch input[name=nameBranch][value=" + ArrBranchIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '')).html();
                        ReportHTML += '             </table>';
                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                    }
                } //of for (var j = 0; j < ArrAccountIDList.length; j++)
            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }


        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}

function AccountLedger_Print_GroupByCC(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of Account and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'Account : ' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
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
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pAccountLedger, function (i, item) {
                if (item.Account_ID == ArrAccountIDList[j]
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '9' : '9') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalanceD
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalance
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
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.Account_ID == ArrAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrAccountIDList.length; j++)
    } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel")
                pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
            }
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b><u>' + 'Balance: ' + '</b></u></td>';
            if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody").append(pRowTotalsHTML);
        } //of looping through Accounts
    } //of looping through CostCenters
}
else{
for (var k = 0; k < ArrCostCenterIDList.length; k++) {
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
        pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
        pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
        pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
        pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
        pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
        pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
        pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        if (pOutputTo == "Excel") { //to add the name of Account and CostCenter for the excel files
            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الحساب : ' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
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
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pAccountLedger, function (i, item) {
            if (item.Account_ID == ArrAccountIDList[j]
                && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '9' : '9') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//FBalance
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
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j]
            //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    }//of for (var j = 0; j < ArrAccountIDList.length; j++)
} //for (var k = 0; k < ArrCostCenterIDList.length; k++)
$("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

/*********************Append table summaries*************************/
debugger;
for (var k = 0; k < ArrCostCenterIDList.length; k++) {
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        //var pTotalForeignCurDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Deb");
        //var pTotalForeignCurCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "Cre");
        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''), "LocalCredit");
        //var pSummaryForeignCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الإجمالي: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class=""><b><u>' + 'الرصيد: ' + '</b></u></td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '') + " tbody").append(pRowTotalsHTML);
    } //of looping through Accounts
} //of looping through CostCenters
}
    if (pOutputTo == "Excel") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
                    x.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim());
                if (!Suppress || CurrentRows.length > 0) {
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, ''));
                }
            }
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
    x.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim());
                if (!Suppress || CurrentRows.length > 0) {
                    // if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '')).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                }
            } //of for (var j = 0; j < ArrAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
else{
            ReportHTML += '<html dir="rtl">';
    ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
x.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim());
            if (!Suppress || CurrentRows.length > 0) {
                // if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ</u></b>' + '</div>';
                ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                //ReportHTML += '             <div class="col-xs-6 "></div>';
                //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
                ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             </div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.&]/g, '')).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        } //of for (var j = 0; j < ArrAccountIDList.length; j++)
    } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
    ReportHTML += '         <body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    //ReportHTML += '     </footer>';
    ReportHTML += '</html>';
    }


        if (pOutputTo != "Email") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, 'Account Ledger', true);
        }
    }

    FadePageCover(false);
}

function AccountLedger_Excel(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pJournalTypeIDList = "-1";
    if (pCostCenterIDList == "")
        pCostCenterIDList = "-1";

    if (pAccountIDList == "" || pJournalTypeIDList == "")
        swal("Sorry", "Please, select at least one account and one journal type.");
    else if (pCostCenterIDList == "" && $("#cbIsGroupByCostCenter").prop("checked"))
        swal("Sorry", "Please, select at least one cost center.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pBranchIDList: -1
            , pCostCenterIDList: pCostCenterIDList
            , pJournalTypeIDList: pJournalTypeIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pPostStatus: $("#slStatus").val()
            , pIsGroupByCostCenter: $("#cbIsGroupByCostCenter").prop("checked")
            , pIsGroupByBranch: $("#cbIsGroupByBranch").prop("checked")
        };
        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
            , function (pData) {
                //otherCompanies
                if ($("#cbIsGroupByCostCenter").prop("checked"))
                    AccountLedger_Print_GroupByCC(pData, pOutputTo);
                else
                    AccountLedger_Print_DetailedExcel(pData, pOutputTo);

            }
            , null);
    }
}
function AccountLedger_Print_DetailedExcel(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[2]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
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
        pTablesHTML += '                     <th class="">' + 'Ex.Rate' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
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
                        pTablesHTML += '                 <td class="" colspan=' + ('15') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
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
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                    }
                    pTablesHTML += '             </tr>';
                    pIsOpenBalanceRowAdded = true;
                    pPreviousRowFBalance = item.Opening_Balance;
                }
                if (item.ID/*JV_ID*/ != 0) { //add normal row
                    /******************Get final balance************************/
                    //  debugger;
                    var Deb = item.Debit;
                    var Cre = item.Credit;
                    var fBalD = Deb - Cre;
                    /******************Get LocalCur final balance************************/
                    var fBal = item.LocalDebit - item.LocalCredit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
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
            pRowTotalsHTML += '                                <td class="" colspan="9" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
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
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
               // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    } //for (var j = 0; j < ArrAccountIDList.length; j++)
}
else{
for (var j = 0; j < ArrAccountIDList.length; j++) {
    var pIsOpenBalanceRowAdded = false;
    pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTablesHTML += '                 <thead class="" style="">';
    pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
    pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
    pTablesHTML += '                     <th class="">' + 'نوع القيد' + '</th>';
    pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مركز التكلفة' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
    pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
    pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
    pTablesHTML += '                     <th class="">' + 'معدل التغير' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
    pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
    pTablesHTML += '                     <th class="">' + 'الحساب التحليلي' + '</th>';
    pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
    pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
    pTablesHTML += '                 </thead>';
    pTablesHTML += '                 <tbody>';
    //if (pAccountLedger != null)
    var pPreviousRowFBalance = 0; //final balance Local Cur
    $.each(pAccountLedger, function (i, item) {
        if (item.Account_ID == ArrAccountIDList[j]) {
            if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                pTablesHTML += '             <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel") {
                    pTablesHTML += '                 <td class="" colspan=' + ('15') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                    pTablesHTML += '                 <td class="" style="text-align:center;">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                }
                else { //Excel
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
                }
                pTablesHTML += '             </tr>';
                pIsOpenBalanceRowAdded = true;
                pPreviousRowFBalance = item.Opening_Balance;
            }
            if (item.ID/*JV_ID*/ != 0) { //add normal row
                /******************Get final balance************************/
                //  debugger;
                var Deb = item.Debit;
                var Cre = item.Credit;
                var fBalD = Deb - Cre;
                /******************Get LocalCur final balance************************/
                var fBal = item.LocalDebit - item.LocalCredit;
                var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                pPreviousRowFBalance = FBalance; //To be used in the next row
                /******************Add the row************************/
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
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
        pRowTotalsHTML += '                                <td class="" colspan="9" style="text-align:center;"><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
    else { //Excel
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
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
    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
    if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
        pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
    else
        pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance +
            (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
           // 'Posted: ' + pSummaryLocalCurBalance_Posted +
            '</td>';
    pRowTotalsHTML += '                            </tr>';
    $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
} //for (var j = 0; j < ArrAccountIDList.length; j++)
}

    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);

                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                ReportHTML += '<html>';

                ReportHTML += '     <head><title>' + 'Account Ledger' + '</title></head>';
                ReportHTML += '         <body">';
                ReportHTML += '         <div id="ReportBody">';

                ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '                         <tbody>';
                ReportHTML += '             <tr class="">';
                ReportHTML += '                  <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</td>';
                ReportHTML += '                 <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</td>';
                ReportHTML += '                  <td class="col-xs-7 " ><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</td>';
                ReportHTML += '             </tr>';
                ReportHTML += '                         </tbody>';
                ReportHTML += '                     </table>';


                for (var j = 0; j < ArrAccountIDList.length; j++) {
                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
                    if (!Suppress || CurrentRows.length > 0) {
                        ReportHTML += '         <div class="break"></div>';
                        ReportHTML += '                     <table id="tblHeader' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '                         <tbody>';
                        if (j > 0) {
                            ReportHTML += '             </tr>';
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '             </tr>';
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '             </tr>';
                        }
                        ReportHTML += '             <tr class="">';

                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4> </td>';
                        ReportHTML += '             </tr>';
                        ReportHTML += '                         </tbody>';
                        ReportHTML += '                     </table>';

                        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                        //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        // ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                        ReportHTML += '             </table>';
                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                        /*****************************Creating table tblSumCurrencyByCC****************************************/
                        ReportHTML += '             <div class="col-xs-12"></div>';
                        // ReportHTML += '                 <div class="col-xs-4">';   
                        ReportHTML += '                 <div class="col-xs-12">';
                        ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '                         <tbody>';
                        $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                            if (ArrAccountIDList[j] == item.Account_ID) {
                                ReportHTML += '             <tr class="">';
                                ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                                ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                                ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                                ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                                ReportHTML += '             </tr>';
                            }
                        });
                        ReportHTML += '                         </tbody>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';
                    }
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '         <div class="break"></div>';
                } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
                ReportHTML += '         </div>';
                ReportHTML += '         <body>';
                ReportHTML += '</html>';
            }
            else{
                    ReportHTML += '<html dir="rtl">';

                ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title></head>';
                ReportHTML += '         <body">';
                ReportHTML += '         <div id="ReportBody">';

                ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '                         <tbody>';
                ReportHTML += '             <tr class="">';
                ReportHTML += '                  <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'من : ' + '</b>' + $("#txtFromDate").val() + '</td>';
                ReportHTML += '                 <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'إلي : ' + '</b>' + $("#txtToDate").val() + '</td>';
                ReportHTML += '                  <td class="col-xs-7 " ><b>' + 'تمت الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</td>';
                ReportHTML += '             </tr>';
                ReportHTML += '                         </tbody>';
                ReportHTML += '                     </table>';


                for (var j = 0; j < ArrAccountIDList.length; j++) {
                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
                    if (!Suppress || CurrentRows.length > 0) {
                        ReportHTML += '         <div class="break"></div>';
                        ReportHTML += '                     <table id="tblHeader' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '                         <tbody>';
                        if (j > 0) {
                            ReportHTML += '             </tr>';
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '             </tr>';
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '             </tr>';
                        }
                        ReportHTML += '             <tr class="">';

                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + 'الحساب : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4> </td>';
                        ReportHTML += '             </tr>';
                        ReportHTML += '                         </tbody>';
                        ReportHTML += '                     </table>';

                        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                        //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        // ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                        ReportHTML += '             </table>';
                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                        /*****************************Creating table tblSumCurrencyByCC****************************************/
                        ReportHTML += '             <div class="col-xs-12"></div>';
                        // ReportHTML += '                 <div class="col-xs-4">';   
                        ReportHTML += '                 <div class="col-xs-12">';
                        ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '                         <tbody>';
                        $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                            if (ArrAccountIDList[j] == item.Account_ID) {
                                ReportHTML += '             <tr class="">';
                                ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                                ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                                ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                                ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                                ReportHTML += '             </tr>';
                            }
                        });
                        ReportHTML += '                         </tbody>';
                        ReportHTML += '                     </table>';
                        ReportHTML += '                 </div>';
                    }
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '         <div class="break"></div>';
                } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
                ReportHTML += '         </div>';
                ReportHTML += '         <body>';
                ReportHTML += '</html>';
            }

                $("#hExportedTable").html(ReportHTML);

                var $table = $("#ReportBody");
                $table.table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: "AccountLedger" + ".xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }
        }
    }


    FadePageCover(false);
}
function FillAccounts() {
    debugger;
    CallGETFunctionWithParameters("/api/AccountLedger/FillSearchAccountControls"
        , { WhereCondition: "Where IsMain=0 and Account_Number like " + "'" + $('#slAccountsGroups').val() + "%'" }
        , function (pData) {
            var pAccount = pData[0];
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 4/*NameAndCode*/, null);
            FadePageCover(false);
            //if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        }
        , null);

}

function PrintVoucherAndInvoice(ID, type) {
    debugger
    if (type==1) {
        Invoices_Print(ID, 3, 'Print', 0);
    }
    else if (type ==2){
        Voucher_Print(ID);
    }
}
var AddScripts = '';
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/SubReportFunction.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/AccountLedger.js"></script>';
AddScripts += '<script src="/Scripts/ReceiptsAndPayments/Transactions/CashVoucher.js"></script>';
AddScripts += '<script src="/Scripts/ReceiptsAndPayments/Transactions/ChequeVoucher.js"></script>';

