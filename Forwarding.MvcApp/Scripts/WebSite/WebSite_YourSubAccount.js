$(document).ready(function () {
    debugger;
    if (pDefaults == undefined) {
        LoadDefaults("/api/Defaults/LoadAll", "WHERE 1=1", function () { glbCallingControl = "AccountStatement"; SubAccountLedger_Print("PrintInReportBody"); });
    }

});

function SubAccountLedger_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
    else
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
}
function SubAccountLedger_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function SubAccountLedger_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function SubAccountLedger_slSubAccountGroupChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WebSite_YourSubAccount/SubAccountGroupChanged"
        , { pSubAccountID: $("#slSubAccountGroup").val() }
        , function (pData) {
            var pAccount = pData[0];
            var pSubAccount = pData[1];
            FillListFromObject(null, 4, "<--Select-->", "slSubAccount", pSubAccount, null);
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 5/*Name*/, null);
            FillDivWithCheckboxes("divCbSubAccount", pSubAccount, "nameCbSubAccount", 4, null);
            FadePageCover(false);
        }
        , null);
}
function SubAccountLedger_Print(pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID  //pLoggedUser.SubAccountID
        : pSubAccountIDList = pLoggedUser.SubAccountID );
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pCurrencyID = $("#slCurrency").val()
    //if (pSubAccountIDList == "" && ($("#cbIsByCostCenter").prop("checked")) == false && ($("#cbIsCostCenterSummary").prop("checked")) == false && ($("#cbIsCostCenterProfit").prop("checked")) == false)
    //    swal("Sorry", "Please, select at least one subaccount.");
    //else if (pCostCenterIDList == "" && ($("#cbIsGroupByCostCenter").prop("checked")
    //    || $("#cbIsByCostCenter").prop("checked") || $("#cbIsCostCenterSummary").prop("checked") || $("#cbIsCostCenterProfit").prop("checked")))
    //    swal("Sorry", "Please, select at least one cost center.");
    //else if (pCurrencyID == "" && ($("#cbIsByCurrency").prop("checked") ||
    //    $("#cbIsClientStatmentEn").prop("checked") || $("#cbIsClientStatmentAr").prop("checked")
    //    || $("#cbIsAgentStatmentEn").prop("checked") || $("#cbIsAgentStatmentAr").prop("checked")
    //    || $("#cbIsSupplierStatementEn").prop("checked")
    //))
    //    swal("Sorry", "Please, select currency.");
    if(1==1) {
        FadePageCover(true);

        if ($("#cbIsByCostCenter").prop("checked"))
            pSubAccountIDList = null

        var pIsSubAccountStatment;
        if ($("#cbIsClientStatmentEn").prop("checked") || $("#cbIsClientStatmentAr").prop("checked"))
            pIsSubAccountStatment = true;
        else
            pIsSubAccountStatment = false;


        var pIsAgentSubAccountStatment;
        if ($("#cbIsAgentStatmentEn").prop("checked") || $("#cbIsAgentStatmentAr").prop("checked"))
            pIsAgentSubAccountStatment = true;
        else
            pIsAgentSubAccountStatment = false;

        var pIsSupplierSubAccountStatement;
        if ($("#cbIsSupplierStatementEn").prop("checked"))
            pIsSupplierSubAccountStatement = 1;
        else
            pIsSupplierSubAccountStatement = 0;

        var pParametersWithValues = {
            pSubAccountIDList: pSubAccountIDList
            , pAccountIDList: pAccountIDList
            , pCostCenterIDList: pCostCenterIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pPostStatus: $("#slStatus").val()
            , pIsGroupedByCostCenter: $("#cbIsDetails").prop("checked") ? false : true
            , pIsByCurrency: $("#cbIsByCurrency").prop("checked") ? true : false
            , pIsSubAccountStatment: pIsSubAccountStatment
            , pIsAgentSubAccountStatment: pIsAgentSubAccountStatment
            , pCurrencyID: pCurrencyID
            , pIsCostCenterSummary: $("#cbIsCostCenterSummary").prop("checked") ? true : false
            , pIsCostCenterProfit: $("#cbIsCostCenterProfit").prop("checked") ? true : false
            , pIsSupplierSubAccountStatement
        };
        CallPOSTFunctionWithParameters("/api/WebSite_YourSubAccount/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
                    if ($("#cbIsDetails").prop("checked"))
                        SubAccountLedger_Print_Detailed_OneEgypt(pData, pOutputTo);
                    else if ($("#cbIsGroupByCostCenter").prop("checked"))
                        SubAccountLedger_Print_GroupByCC_OneEgypt(pData, pOutputTo);
                }
                else { //otherCompanies
                    if ($("#cbIsDetails").prop("checked"))
                        SubAccountLedger_Print_Detailed(pData, pOutputTo);
                    else if ($("#cbIsGroupByCostCenter").prop("checked"))
                        SubAccountLedger_Print_GroupByCC(pData, pOutputTo);
                    else if ($("#cbIsByCostCenter").prop("checked"))
                        SubAccountLedger_Print_ByCC(pData, pOutputTo);
                    else if ($("#cbIsByCurrency").prop("checked"))
                        SubAccountLedger_Print_DetailedByCurrency(pData, pOutputTo);
                    else if ($("#cbIsClientStatmentEn").prop("checked") || $("#cbIsAgentStatmentEn").prop("checked"))
                        SubAccountLedger_Print_ClientStatmentEn(pData, pOutputTo);
                    else if ($("#cbIsClientStatmentAr").prop("checked") || $("#cbIsAgentStatmentAr").prop("checked"))
                        SubAccountLedger_Print_ClientStatmentAr(pData, pOutputTo);
                    else if ($("#cbIsCostCenterSummary").prop("checked"))
                        SubAccountLedger_Print_ByCC_Summary(pData, pOutputTo);
                    else if ($("#cbIsCostCenterProfit").prop("checked"))
                        SubAccountLedger_Print_ByCC_Profit(pData, pOutputTo);
                    else if ($("#cbIsSupplierStatementEn").prop("checked"))
                        SubAccountLedger_Print_SupplierStatementEn(pData, pOutputTo);
                }
            }
            , null);
    }
}
function SubAccountLedger_Print_Detailed_OneEgypt(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
        pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
        pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance$' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'FBalance' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
        if ($("#cbShowSubAccount").prop("checked"))
            pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pTblRows != null)
        var pPreviousRowFBalanceD = 0; //final balance $
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pTblRows, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '12' : '12') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td style="text-align:center;" class="">' + item.OpeningBalanceCurrency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' $' + '&emsp;&emsp;&emsp; ' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + FBalanceD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                    if ($("#cbShowSubAccount").prop("checked"))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description2 + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    }//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
        var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalCredit");
        var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="3" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalForeignCurDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalForeignCurCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#cbShowSubAccount").prop("checked"))
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + ArrSubAccountIDList[j]);
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';


        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "SubAccount Ledger", true);
        }
    }

    FadePageCover(false);
}
function SubAccountLedger_Print_GroupByCC_OneEgypt(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Journal Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'FBalance$' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'FBalance' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'SubAccount : ' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenter, function (i, item) {
                if (item.SubAccountID == ArrSubAccountIDList[j]
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
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
                        var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            ? (item.LocalDebit / item.CuNow)
                            : item.Debit
                        );
                        var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            ? (item.LocalCredit / item.CuNow)
                            : item.Credit
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
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + FBalanceD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
    } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {

        var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
        var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
        var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
        var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="3" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
        else { //Excel
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
        }
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalForeignCurDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalForeignCurCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

    } //of looping through CostCenters
    if (pOutputTo == "Excel") {
        var ReportExcelSumCurrencyByCC = "";
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                ReportExcelSumCurrencyByCC = '             <tr class="">';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '             </tr>';
                $.each(pTblRowsGroupByCostCenterSum, function (z, rowSum) {
                    if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
                        ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                        ReportExcelSumCurrencyByCC += '             <tr class="">';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '             </tr>';
                    }
                });
                /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
                $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                ReportExcelSumCurrencyByCC = '';
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
            }//for (var j = 0; j < ArrSubAccountIDList.length; j++)
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            //if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
            ReportHTML += '             </table>';


            /*****************************Creating table tblSumCurrencyByCC****************************************/
            ReportHTML += '             <div class="col-xs-12"></div>';
            ReportHTML += '                 <div class="col-xs-4">';
            ReportHTML += '                     <table id="tblSumCurrencyByCC' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="m-t table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '                         </tbody>';
            $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                if (//ArrSubAccountIDList[j] == item.SubAccount_ID &&
                    ArrCostCenterIDList[k] == item.CostCenter_ID) {
                    ReportHTML += '             <tr class="">';
                    ReportHTML += '                  <td class="">' + item.FinalBalance + '</td>';
                    ReportHTML += '                  <td class="">' + item.Currency_Code + '</td>';
                    ReportHTML += '             </tr>';
                }
            });
            ReportHTML += '                         </tbody>';
            ReportHTML += '                     </table>';
            ReportHTML += '                 </div>';
            ReportHTML += '             <div class="col-xs-4"></div>';
            /*****************************EOF Creating table tblSumCurrencyByCC****************************************/


            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, pReportTitle, true);
        }
    }
    FadePageCover(false);
}

function SubAccountLedger_Print_Detailed(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            if ($("#cbShowSubAccount").prop("checked"))
                pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pTblRows != null)
            //var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRows, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '12' : '12') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            if ($("#cbShowSubAccount").prop("checked"))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        //pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeignCur final balance************************/
                        debugger;
                        //var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                        //            );
                        //var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description2 + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="8" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }


            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    }
    else {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الحساب الرئيسي' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
            pTablesHTML += '                     <th class="">' + 'عملة' + '</th>';
            pTablesHTML += '                     <th class="">' + 'معدل التغير' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
            pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
            if ($("#cbShowSubAccount").prop("checked"))
                pTablesHTML += '                     <th class="">' + 'الحساب التحليلي' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pTblRows != null)
            //var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRows, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '12' : '12') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            if ($("#cbShowSubAccount").prop("checked"))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        //pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeignCur final balance************************/
                        debugger;
                        //var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                        //            );
                        //var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description2 + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="8" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'إجمالي المدين والدائن' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }


            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRows.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
            if (!Suppress || CurrentRows.length > 0)
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + ArrSubAccountIDList[j]);
        }
    }
    else {


        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblRows.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
                if (!Suppress || CurrentRows.length > 0) {
                    if (j > 0)
                        ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-12"></div>';
                    // ReportHTML += '                 <div class="col-xs-4">';   
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrency' + ArrSubAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                        if (ArrSubAccountIDList[j] == item.SubAccount_ID) {
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
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblRows.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
                if (!Suppress || CurrentRows.length > 0) {
                    if (j > 0)
                        ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ التحليلي</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب التحليلي : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-12"></div>';
                    // ReportHTML += '                 <div class="col-xs-4">';   
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrency' + ArrSubAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCurrencySum, function (i, item) {
                        if (ArrSubAccountIDList[j] == item.SubAccount_ID) {
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
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "حساب الأستاذ التحليلي", true);
        }

    }

    FadePageCover(false);
}
function SubAccountLedger_Print_GroupByCC(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                var pIsOpenBalanceRowAdded = false;
                pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTablesHTML += '                 <thead class="" style="">';
                pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Journal Date' + '</th>';
                pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
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
                if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'SubAccount : ' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                    pTablesHTML += '                 </tr>';
                }
                var pPreviousRowFBalanceD = 0; //final balance $
                var pPreviousRowFBalance = 0; //final balance Local Cur
                $.each(pTblRowsGroupByCostCenter, function (i, item) {
                    if (item.SubAccountID == ArrSubAccountIDList[j]
                        && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            if (pOutputTo != "Excel") {
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '11') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                                pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            }
                            else { //Excel
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            }
                            pTablesHTML += '             </tr>';
                            pIsOpenBalanceRowAdded = true;
                            pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                            pPreviousRowFBalance = item.Opening_Balance;
                        }
                        if (item.ID/*JV_ID*/ != 0) { //add normal row
                            /******************Get ForeigCur final balance************************/
                            debugger;
                            //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            //            ? (item.LocalDebit / item.CuNow)
                            //            : item.Debit
                            //            );
                            //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            //            ? (item.LocalCredit / item.CuNow)
                            //            : item.Credit
                            //            );
                            //var fBalD = Deb - Cre;
                            //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                            //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                            /******************Get LocalCur final balance************************/
                            var fBal = item.LocalDebit - item.LocalCredit;
                            var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                            pPreviousRowFBalance = FBalance; //To be used in the next row
                            /******************Add the row************************/
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        } //normal rows
                    } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                    //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
                });
                pTablesHTML += '                 </tbody>';
                pTablesHTML += '             </table>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
                //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
                var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
                var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
                //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
                var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel") {
                    pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""> &emsp;' + '</td>';
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
                }
                else { //Excel            
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
                }
                pRowTotalsHTML += '                            </tr>';
                $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
            } //of looping through SubAccounts
        } //of looping through CostCenters
    }
    else {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                var pIsOpenBalanceRowAdded = false;
                pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTablesHTML += '                 <thead class="" style="">';
                pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
                pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
                pTablesHTML += '                     <th class="">' + 'رقم الايصال' + '</th>';
                pTablesHTML += '                     <th class="">' + 'الحساب' + '</th>';
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
                if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الحساب التحليلي : ' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
                    pTablesHTML += '                 </tr>';
                }
                var pPreviousRowFBalanceD = 0; //final balance $
                var pPreviousRowFBalance = 0; //final balance Local Cur
                $.each(pTblRowsGroupByCostCenter, function (i, item) {
                    if (item.SubAccountID == ArrSubAccountIDList[j]
                        && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            if (pOutputTo != "Excel") {
                                pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '11') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                                pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            }
                            else { //Excel
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            }
                            pTablesHTML += '             </tr>';
                            pIsOpenBalanceRowAdded = true;
                            pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                            pPreviousRowFBalance = item.Opening_Balance;
                        }
                        if (item.ID/*JV_ID*/ != 0) { //add normal row
                            /******************Get ForeigCur final balance************************/
                            debugger;
                            //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            //            ? (item.LocalDebit / item.CuNow)
                            //            : item.Debit
                            //            );
                            //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                            //            ? (item.LocalCredit / item.CuNow)
                            //            : item.Credit
                            //            );
                            //var fBalD = Deb - Cre;
                            //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                            //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                            /******************Get LocalCur final balance************************/
                            var fBal = item.LocalDebit - item.LocalCredit;
                            var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                            pPreviousRowFBalance = FBalance; //To be used in the next row
                            /******************Add the row************************/
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        } //normal rows
                    } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                    //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
                });
                pTablesHTML += '                 </tbody>';
                pTablesHTML += '             </table>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
                //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
                var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
                var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
                //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
                var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel") {
                    pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""> &emsp;' + '</td>';
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
                }
                else { //Excel            
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'إجمالي المدين والدائن' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
                }
                pRowTotalsHTML += '                            </tr>';
                $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
            } //of looping through SubAccounts
        } //of looping through CostCenters
    }
    if (pOutputTo == "Excel") {
        var ReportExcelSumCurrencyByCC = "";
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {

                var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {
                    /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                    ReportExcelSumCurrencyByCC = '             <tr class="">';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ReportExcelSumCurrencyByCC += '             </tr>';
                    $.each(pTblRowsGroupByCostCenterSum, function (z, rowSum) {
                        if (ArrSubAccountIDList[j] == rowSum.SubAccount_ID && ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                            ReportExcelSumCurrencyByCC += '             <tr class="">';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                            ReportExcelSumCurrencyByCC += '             </tr>';
                        }
                    });
                    /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
                    $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                    ReportExcelSumCurrencyByCC = '';
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

                }
            }//for (var j = 0; j < ArrSubAccountIDList.length; j++)
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';


            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                    debugger;
                    var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                    if (!Suppress || CureentRows.length > 0) {

                        //if (i > 0)
                        ReportHTML += '         <div class="break"></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                        ReportHTML += '             </table>';


                        /*****************************Creating table tblSumCurrencyByCC****************************************/
                        // ReportHTML += '             <div class="col-xs-4"></div>';
                        ReportHTML += '                 <div class="col-xs-12">';
                        ReportHTML += '                     <table id="tblSumCurrencyByCC' + ArrSubAccountIDList[j] + "-"
                            + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                            + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                        ReportHTML += '                         </tbody>';
                        $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                            if (ArrSubAccountIDList[j] == item.SubAccount_ID && ArrCostCenterIDList[k] == item.CostCenter_ID) {
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

                        /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                    }
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';
                } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';


            ReportHTML += '     <head><title>' + 'حساب الأستاذ التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                    debugger;
                    var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                    if (!Suppress || CureentRows.length > 0) {

                        //if (i > 0)
                        ReportHTML += '         <div class="break"></div>';
                        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ التحليلي</u></b>' + '</div>';
                        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        ReportHTML += '             </div>';
                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب التحليلي : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                        //ReportHTML += pTablesHTML; //Add table html in the next lines
                        ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                        ReportHTML += '             </table>';


                        /*****************************Creating table tblSumCurrencyByCC****************************************/
                        // ReportHTML += '             <div class="col-xs-4"></div>';
                        ReportHTML += '                 <div class="col-xs-12">';
                        ReportHTML += '                     <table id="tblSumCurrencyByCC' + ArrSubAccountIDList[j] + "-"
                            + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                            + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                        ReportHTML += '                         </tbody>';
                        $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                            if (ArrSubAccountIDList[j] == item.SubAccount_ID && ArrCostCenterIDList[k] == item.CostCenter_ID) {
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

                        /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                    }
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';
                } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "SubAccount Ledger", true);
        }
    }
    FadePageCover(false);
}
function SubAccountLedger_Print_ByCC(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الحساب' + '</th>';
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
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenter, function (i, item) {
                if (item.SubAccountID == 0
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;
                        //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : item.Debit
                        //            );
                        //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : item.Credit
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'إجمالي المدين والدائن' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
    }
    else {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Journal Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
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
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenter, function (i, item) {
                if (item.SubAccountID == 0
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;
                        //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : item.Debit
                        //            );
                        //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : item.Credit
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
    }
    if (pOutputTo == "Excel") {
        var ReportExcelSumCurrencyByCC = "";
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == "" && x.CostCenterID == ArrCostCenterIDList[k]));
            if (!Suppress || CureentRows.length > 0) {
                /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                ReportExcelSumCurrencyByCC = '             <tr class="">';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                ReportExcelSumCurrencyByCC += '             </tr>';
                $.each(pTblRowsGroupByCostCenterSum, function (z, rowSum) {
                    if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
                        ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                        ReportExcelSumCurrencyByCC += '             <tr class="">';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                        ReportExcelSumCurrencyByCC += '             </tr>';
                    }
                });
                /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
                $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                ReportExcelSumCurrencyByCC = '';
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

            }
        }
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';


            ReportHTML += '     <head><title>' + 'Cost Center' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == 0 && x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cost Center</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                        if (item.SubAccount_ID == 0 && ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';


            ReportHTML += '     <head><title>' + 'مركز التكلفة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenter.filter(x => (x.SubAccountID == 0 && x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>مركز التكلفة</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                        if (item.SubAccount_ID == 0 && ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';

                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Cost Center", true);
        }
    }
    FadePageCover(false);
}
function SubAccountLedger_Print_DetailedByCurrency(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);
    var pTblRowsByCurrency = JSON.parse(pData[5]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JVType_Name' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
            // pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pTblRows != null)
            //var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsByCurrency, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            // pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //  pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            if ($("#cbShowSubAccount").prop("checked"))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        //pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0 && item.SubAccountName != "") { //add normal row
                        /******************Get ForeignCur final balance************************/
                        debugger;
                        //var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                        //            );
                        //var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.Debit - item.Credit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        //    pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        // pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.Debit - item.Credit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }


            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    }
    else {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
            pTablesHTML += '                     <th class="">' + 'نوع القيد' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الحساب الرئيسي' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
            pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
            pTablesHTML += '                     <th class="">' + 'معدل التغير' + '</th>';
            // pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pTblRows != null)
            //var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsByCurrency, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            // pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //  pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            if ($("#cbShowSubAccount").prop("checked"))
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        //pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0 && item.SubAccountName != "") { //add normal row
                        /******************Get ForeignCur final balance************************/
                        debugger;
                        //var Deb = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Debit)
                        //            );
                        //var Cre = ((item.Currency_Code == $("#hDefaultCurrencyCode").val() && item.Journal_Name != "ZZZ")
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : (item.Journal_Name == "ZZZ" ? 0 : item.Credit)
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.Debit - item.Credit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        //    pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';//FBalanceD
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                        // pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.Debit - item.Credit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                        pTablesHTML += '                 </tr>';
                    } //normal rows
                } //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
        }//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //var pTotalForeignCurDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Debit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Credit");
            //var pSummaryForeignCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                if ($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }


            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRowsByCurrency.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + ArrSubAccountIDList[j]);
            }

        }
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblRowsByCurrency.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
                if (!Suppress || CurrentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    //ReportHTML += '             <div class="col-xs-12"></div>';
                    //// ReportHTML += '                 <div class="col-xs-4">';   
                    //ReportHTML += '                 <div class="col-xs-12">';
                    //ReportHTML += '                     <table id="tblSumCurrency' + ArrSubAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '                         </tbody>';
                    //$.each(pTblRowsGroupByCurrencySum, function (i, item) {
                    //    if (ArrSubAccountIDList[j] == item.SubAccount_ID) {
                    //        ReportHTML += '             <tr class="">';
                    //        ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                    //        ReportHTML += '             </tr>';
                    //    }
                    //});
                    //ReportHTML += '                         </tbody>';
                    //ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblRowsByCurrency.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
                if (!Suppress || CurrentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ التحليلي</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب التحليلي : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    //ReportHTML += '             <div class="col-xs-12"></div>';
                    //// ReportHTML += '                 <div class="col-xs-4">';   
                    //ReportHTML += '                 <div class="col-xs-12">';
                    //ReportHTML += '                     <table id="tblSumCurrency' + ArrSubAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '                         </tbody>';
                    //$.each(pTblRowsGroupByCurrencySum, function (i, item) {
                    //    if (ArrSubAccountIDList[j] == item.SubAccount_ID) {
                    //        ReportHTML += '             <tr class="">';
                    //        ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                    //        ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                    //        ReportHTML += '             </tr>';
                    //    }
                    //});
                    //ReportHTML += '                         </tbody>';
                    //ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Sub Account Ledger", true);
        }

    }

    FadePageCover(false);
}
function SubAccountLedger_Print_ClientStatmentEn(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pLoggedUser.SubAccountID
        : pLoggedUser.SubAccountID);
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);
    var pTblRowsByCurrency = JSON.parse(pData[5]);
    var pTblClientStatment = JSON.parse(pData[6]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.toString().split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    var IsAgent = $("#cbIsAgentStatmentEn").prop("checked");

    var CurrencyID = $("#slCurrency").val();
    // &nbsp;
    //;&emsp
    var pTablesHTML = "";
    var pTablesHeaderHTML = "";
    if ($("#hDefaultUnEditableCompanyName").val() == "FRE" || pDefaults.UnEditableCompanyName == "WAV") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {

            var CurrentClient = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
            if (CurrentClient.length > 0) {
                pTablesHeaderHTML += '   <div id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '">';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><h3><b>' + ' FREIGHT WORLD AL OFI ESTABLISHMENT ' + '</b></h3>' + '</div>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + ' VAT NO. : 300252169400003' + '</b>' + '</div>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><h3><b>' + CurrentClient[0].ClientName + '</b></h3>' + '</div>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + ' Ledger Account ' + '</b>' + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'NAME OF AGENT :' : 'NAME OF CLIENT:') + '</b>' + CurrentClient[0].ClientName + '</div>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + CurrentClient[0].ClientAddress + '</b>' + '</div>';
                pTablesHeaderHTML += '     <br>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + 'VAT NO. :' + '</b>' + CurrentClient[0].VATNumber + '</div>';
                pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + $("#txtFromDate").val() + ' to ' + $("#txtToDate").val() + '</b>' + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'Phone And Fax :' + '</b>' + CurrentClient[0].PhonesAndFaxes + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'E-MAIL :' + '</b>' + CurrentClient[0].ClientEMail + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ACCOUNT NUMBER :' + '</b>' + CurrentClient[0].ClientNo + '</div>';

                //pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + 'The following statement shows your accounts with us at ' + pFormattedTodaysDate + '</b>' + '</div>';
                //pTablesHeaderHTML += '             <div style="text-align:center;" class="col-xs-12"><b>' + ' we are kindly asking you to remit to our bank account mention hereunder' + '</b>' + '</div>';
                pTablesHeaderHTML += '     <br>';

                pTablesHeaderHTML += '  </div>';
            }
            $("#hExportdiv").html(pTablesHeaderHTML);

            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';


            pTablesHTML += ' <tr> ';
            pTablesHTML += '                     <th class="col-xs-1">' + 'Date' + '</th>';
            pTablesHTML += '                     <th class="col-xs-3">' + 'Particulars' + '</th>';
            pTablesHTML += '                     <th class="col-xs-1">' + 'Vch Type' + '</th>';
            pTablesHTML += '                     <th class="col-xs-1">' + 'Vch No.' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Balance' + '</th>';
            pTablesHTML += ' </tr> ';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';

            var pPreviousRowFBalance = 0;
            $.each(pTblClientStatment, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j] && item.Currency_ID == CurrencyID) {
                    pTablesHTML += '             </tr>';
                    debugger;
                    /******************Get LocalCur final balance************************/
                    var fBal = item.Debit - item.Credit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);;
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.InvoiceNo.split("-", 5)).join("-") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVTypeName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo.split("/")[0] + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                 </tr>';

                } //normal rows
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';

        }
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/

        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            var pSummaryTotalDBTBalance = 0;
            var pSummaryTotalCRTBalance = 0;
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';

            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + "" + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + "" + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';
            pRowTotalsHTML += '                            </tr>';

            //pTablesHTML += '                 <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  Balance  </b>' + '</td>';
            ////pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> Debit Balance Due To You </b>' + '</td>';
            //pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + $("#slCurrency").find('option:selected').text().trim() + '</td>';
            //pRowTotalsHTML += '                 </tr>';

            pRowTotalsHTML += '                 <br>';

            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>    </b>' + '</td>';
            pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b>  </b>' + '</td>';
            //pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + $("#slCurrency").find('option:selected').text().trim() + '</td>';
            pRowTotalsHTML += '                 </tr>';
            //pTablesHTML += '                 <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>    </b>' + '</td>';
            //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  </b>' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            //pRowTotalsHTML += '                 </tr>';

            if (pSummaryLocalCurBalance < 1) {


                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  Closing Balance </b>' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  </b>' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance * -1 + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                 </tr>';

                pSummaryTotalDBTBalance = parseFloat($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text().replace(',', '').replace(',', '')) == "" ? 0 : parseFloat($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text().replace(',', '').replace(',', '')) + parseFloat(pTotalLocalDebit) * -1;

                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>    </b>' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  </b>' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryTotalDBTBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                 </tr>';
            }
            else {
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  Closing Balance  </b>' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  </b>' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryLocalCurBalance + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                 </tr>';

                pSummaryTotalCRTBalance = parseFloat($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text().replace(',', '').replace(',', '')) == "" ? 0 : parseFloat($("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text().replace(',', '').replace(',', '')) + parseFloat(pTotalLocalCredit);

                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>    </b>' + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  </b>' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryTotalCRTBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                pRowTotalsHTML += '                 </tr>';
            }
            pRowTotalsHTML += '                            <tr colspan="3" class="" style="font-size:95%; ">';
            //pRowTotalsHTML += '                                <td style="text-align:center; border-left: 2px solid white !important; border-right: 1px solid white !important; border-bottom: 1px solid white !important;" class="">' + toWords_WithFractionNumbers(Math.abs(pPreviousRowFBalance.toFixed(2))) + ' ' + $("#slCurrency").find('option:selected').text().trim() + ' ONLY' + '</td>';
            pRowTotalsHTML += '                 </tr>';

            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);

        }
        if (pOutputTo == "Excel") {
            var ReportHTML = '';
            var a = [];
            $.each(ArrSubAccountIDList, function (j, item) {

                var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
                if (CurrentRows.length > 0) {
                    ReportHTML = '';
                    ReportHTML += '         <div id="ReportBody">';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                    ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    ReportHTML += '                 </div>';
                    var $table = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "");
                    $table.table2excel({
                        exclude: ".noExl",
                        name: "sheet",
                        filename: pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j])[0].ClientName + "_SubAccountLedger_EN_" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                        preserveColors: false // set to true if you want background colors and font colors preserved
                    });
                }
            });


        }
        else {

            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html> ';
            ReportHTML += '     <head><title> ' + (' Statement of Account') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ////ReportHTML += '     <head><title> ' + (IsAgent ? '  Agent Statment' : '  Client Statment') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '   <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {

                var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
                if (CurrentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    if ($('#cbHeaderLogo').is(':checked'))
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div><br>';
                    //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines

                    //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                    //ReportHTML += '             </table>';
                    ReportHTML += '';//<h2><center>' + ('Statement of Account') + '</center> </h2>
                    //ReportHTML += '<h2><center>'+ (IsAgent ? '  Agent Statment' :' Client Statment') + '</center> </h2>';
                    ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                    //ReportHTML += ' <br> ';
                    //ReportHTML += ' <div class="col-xs-12"> The account is to be considered confirm if receive no remarks within 15 days from this date </div>';
                    //ReportHTML += ' <br> ';
                    //ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Accounting Manager</b></h5> </div>';
                    //ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Auditing Manager</b></h5> </div>';
                    //ReportHTML += ' <br> ';
                    //ReportHTML += ' <br> ';
                    //ReportHTML += ' <br> ';
                    //ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                    //ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is Available upon request </div>';
                    //ReportHTML += '                 </div>';
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Statment Of Account", true);
            }
        }

        FadePageCover(false);
    }
    else if ($("#hDefaultUnEditableCompanyName").val() == "SAF") {
        SubAccountLedger_Print_ClientStatmentEn_Safina(pData, pOutputTo);
    }
    else {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {

            var CurrentClient = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
            if (CurrentClient.length > 0) {
                pTablesHeaderHTML += '   <div id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '">';
                pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ('Messrs,') + '</b>' + CurrentClient[0].ClientName + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'NAME OF AGENT :' : 'NAME OF CLIENT:') + '</b>' + CurrentClient[0].ClientName + '</div>';
                pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ADDRESS :' + '</b>' + CurrentClient[0].ClientAddress + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'Phone And Fax :' + '</b>' + CurrentClient[0].PhonesAndFaxes + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'E-MAIL :' + '</b>' + CurrentClient[0].ClientEMail + '</div>';
                //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ACCOUNT NUMBER :' + '</b>' + CurrentClient[0].ClientNo + '</div>';
                pTablesHeaderHTML += '     <br>';
                pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' Dear Sirs,' + '</b>' + '</div>';
                pTablesHeaderHTML += '     <br>';
                pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'The following statement shows your accounts with us at ' + pFormattedTodaysDate + '</b>' + '</div>';
                pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' we are kindly asking you to remit to our bank account mention hereunder' + '</b>' + '</div>';
                pTablesHeaderHTML += '     <br>';

                pTablesHeaderHTML += '  </div>';
            }
            $("#hExportdiv").html(pTablesHeaderHTML);

            pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';


            pTablesHTML += ' <tr> ';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Date' + '</th>';
            pTablesHTML += '                     <th class="col-xs-4">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="col-xs-2">' + 'Balance' + '</th>';
            pTablesHTML += ' </tr> ';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';

            var pPreviousRowFBalance = 0;
            $.each(pTblClientStatment, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j] && item.Currency_ID == CurrencyID) {
                    pTablesHTML += '             </tr>';

                    /******************Get LocalCur final balance************************/
                    var fBal = item.Debit - item.Credit;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);;
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                 </tr>';

                } //normal rows
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';

        }
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';

            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';
            pRowTotalsHTML += '                            </tr>';

            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b>  Balance  </b>' + '</td>';
            //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> Debit Balance Due To You </b>' + '</td>';
            pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + $("#slCurrency").find('option:selected').text().trim() + '</td>';
            //pRowTotalsHTML += '                 </tr>';



            //pRowTotalsHTML += '                            <tr colspan="3" class="" style="font-size:95%; ">';
            //pRowTotalsHTML += '                                <td style="text-align:center; border-left: 2px solid white !important; border-right: 1px solid white !important; border-bottom: 1px solid white !important;" class="">' + toWords_WithFractionNumbers(Math.abs(pPreviousRowFBalance.toFixed(2))) + ' ' + $("#slCurrency").find('option:selected').text().trim() + ' ONLY' + '</td>';
            //pRowTotalsHTML += '                 </tr>';

            $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);

        }
        if (pOutputTo == "Excel") {
            var ReportHTML = '';
            var a = [];
            $.each(ArrSubAccountIDList, function (j, item) {

                var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
                if (CurrentRows.length > 0) {
                    ReportHTML = '';
                    ReportHTML += '         <div id="ReportBody">';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                    ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    ReportHTML += '                 </div>';
                    var $table = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "");
                    $table.table2excel({
                        exclude: ".noExl",
                        name: "sheet",
                        filename: pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j])[0].ClientName + "_SubAccountLedger_EN_" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                        preserveColors: false // set to true if you want background colors and font colors preserved
                    });
                }
            });


        }
        else {

            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html> ';
            ReportHTML += '     <head><title> ' + (' Statement of Account') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ////ReportHTML += '     <head><title> ' + (IsAgent ? '  Agent Statment' : '  Client Statment') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '   <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {

                var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
                if (CurrentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    if ($('#cbHeaderLogo').is(':checked') || $("#hDefaultUnEditableCompanyName").val() == "DGL")
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div><br>';
                    //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines

                    //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                    //ReportHTML += '             </table>';
                    ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                    //ReportHTML += '<h2><center>'+ (IsAgent ? '  Agent Statment' :' Client Statment') + '</center> </h2>';
                    ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                    ReportHTML += ' <br> ';
                    ReportHTML += ' <div class="col-xs-12"> The account is to be considered confirm if receive no remarks within 15 days from this date </div>';
                    ReportHTML += ' <br> ';
                    ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Accounting Manager</b></h5> </div>';
                    ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Auditing Manager</b></h5> </div>';
                    ReportHTML += ' <br> ';
                    ReportHTML += ' <br> ';
                    ReportHTML += ' <br> ';
                    debugger;
                    if ($("#hDefaultUnEditableCompanyName").val() != "SAF" && $("#hDefaultUnEditableCompanyName").val() != "NIL") {
                        ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                        ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is available upon request </div>';
                    }

                    ReportHTML += '                 </div>';
                    if ($("#hDefaultUnEditableCompanyName").val() == "DGL") {
                        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        //ReportHTML += '     </footer>';
                    }
                    //    ReportHTML += '             <div class="col-xs-4"></div>';
                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';

            if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                ReportHTML += '         <div class="row text-center small">' + ' All financial transactions (payments / receipts / transfers) must be handled with only the company financial department and the company not responsible for any transactions that are otherwise.  ' + '</div>';
                ReportHTML += '         <div class="row text-center small">' + '  جميع المعاملات المالية (المدفوعات/المقبوضات/التحويلات) يجب ان تتم مع الادارة المالية للشركة فقط ، والشركة ليست مسؤولة عن اى من المعاملات التى هى على خلاف ذلك	' + '</div>';

                ReportHTML += '         <div class="row b-b b-dark m-t-n-xxs" style="clear:both;"></div>'; //This is line

                ReportHTML += '         <div class="row text-center small">' + '  Nile Logistics International L.L.C	' + '</div>';
                ReportHTML += '         <div class="row text-center small">' + '  Address : 4 Eltahrir st., Square 1130Sheraton HeliopolisCairo 11361-Egypt  ' + '</div>';
                ReportHTML += '         <div class="row text-center small">' + '  Email : accounting@nilelogistics.com TEL:+202 2269 2714Fax:+202 2269 2719 ' + '</div>';

                ReportHTML += '     </footer>';
            }

            ReportHTML += '</html>';

            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Statment Of Account", true);
            }

        }

        FadePageCover(false);
    }


}
function SubAccountLedger_Print_ClientStatmentAr(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);
    var pTblRowsByCurrency = JSON.parse(pData[5]);
    var pTblClientStatment = JSON.parse(pData[6]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    var CurrencyID = $("#slCurrency").val();
    var CurrencyCode = $("#slCurrency").find('option:selected').text().trim();

    var IsAgent = $("#cbIsAgentStatmentAr").prop("checked");

    // &nbsp;
    //;&emsp
    var pTablesHTML = "";
    var pTablesHeaderHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {

        var CurrentClient = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
        if (CurrentClient.length > 0) {
            pTablesHeaderHTML += '   <div id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '">';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'الوكيل:' : 'العميل:') + '</b>' + ((CurrentClient[0].ArabicName == "" || CurrentClient[0].ArabicName == null || CurrentClient[0].ArabicName == "'NULL'") ? CurrentClient[0].ClientName : CurrentClient[0].ArabicName) + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'العنوان :' + '</b>' + CurrentClient[0].ClientAddress + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'الفاكس والهاتف :' + '</b>' + CurrentClient[0].PhonesAndFaxes + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'البريد الإلكتروني :' + '</b>' + CurrentClient[0].ClientEMail + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'كود الوكيل:' : 'كود العميل:') + '</b>' + CurrentClient[0].ClientNo + '</div>';
            pTablesHeaderHTML += '     <br>';
            // pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' Dear Sirs,' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';

            pTablesHeaderHTML += '  <div class="col-xs-6"><b>' + 'التاريخ:' + pFormattedTodaysDate + '</b>' + '</div>';
            pTablesHeaderHTML += '  <div class="col-xs-6"><b>' + 'العملة:' + CurrencyCode + '</b>' + '</div>';
            // pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'The following statement shows your accounts with us at ' + pFormattedTodaysDate + '</b>' + '</div>';
            // pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' we are kindly asking you to remit to our bank account mention hereunder' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';

            pTablesHeaderHTML += '  </div>';
        }
        $("#hExportdiv").html(pTablesHeaderHTML);

        pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';


        pTablesHTML += ' <tr> ';
        pTablesHTML += '                     <th class="col-xs-2">' + 'التاريخ' + '</th>';

        pTablesHTML += '                     <th class="col-xs-4">' + 'البيان' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'مدين' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'دائن' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'الرصيد' + '</th>';
        pTablesHTML += ' </tr> ';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';

        var pPreviousRowFBalance = 0;
        $.each(pTblClientStatment, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j] && item.Currency_ID == CurrencyID) {
                pTablesHTML += '             </tr>';
                debugger;
                /******************Get LocalCur final balance************************/
                var fBal = item.Debit - item.Credit;
                var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);;
                pPreviousRowFBalance = FBalance; //To be used in the next row
                /******************Add the row************************/
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                pTablesHTML += '                 </tr>';

            } //normal rows
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';

    }

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    debugger;
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
        var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
        var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';

        pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                            </tr>';

        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        if (IsAgent)
            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> الرصيد </b>' + '</td>';
        else
            pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> الرصيد </b>' + '</td>';

        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + CurrencyCode + '</td>';
        pRowTotalsHTML += '                 </tr>';



        pRowTotalsHTML += '                            <tr colspan="3" class="" style="font-size:95%; ">';
        //  pRowTotalsHTML += '                                <td style="text-align:center; border-left: 2px solid white !important; border-right: 1px solid white !important; border-bottom: 1px solid white !important;" class="">' + toWords_WithFractionNumbers(pSummaryLocalCurBalance) + ' ' + $("#slCurrency").find('option:selected').text().trim() + ' ONLY' + '</td>';
        pRowTotalsHTML += '                 </tr>';

        $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);

    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            // var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html dir="rtl"> ';
            ReportHTML += '     <head><title> ' + (IsAgent ? '  كشف حساب وكيل' : '  كشف حساب عميل') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '   <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
                if (CurrentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';

                    //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'إلى تاريخ : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'من تاريخ : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'تاريخ الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines

                    //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                    //ReportHTML += '             </table>';
                    ReportHTML += '<h2><center>' + (IsAgent ? '  كشف حساب وكيل' : '  كشف حساب عميل') + '</center> </h2>';
                    ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                    ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                    ReportHTML += '             </table>';
                    //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                    ReportHTML += ' <br> ';
                    ReportHTML += ' <div class="col-xs-12"><h4> ملحوظة </h4></div>';
                    if (IsAgent == true)
                        ReportHTML += ' <div class="col-xs-12"> اذا لم يتم الرد خلال خمسة عشر يوما من تاريخه يتعبر مصادقه منكم على صحه المبلغ والموضح عاليه </div>';

                    else
                        ReportHTML += ' <div class="col-xs-12"> اذا لم يتم الرد خلال خمسة عشر يوما من تاريخه يتعبر مصادقه منكم على صحه المبلغ المستحق عليكم والموضح عاليه </div>';


                    ReportHTML += ' <br> ';
                    ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> مدير الحسابات</b></h5> </div>';
                    ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b>مدير المراجعه</b></h5> </div>';
                    ReportHTML += ' <br> ';
                    ReportHTML += ' <br> ';
                    ReportHTML += ' <br> ';
                    //ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                    //ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is Available upon request </div>';
                    ReportHTML += '                 </div>';
                    //    ReportHTML += '             <div class="col-xs-4"></div>';


                    var $table = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "");
                    $table.table2excel({
                        exclude: ".noExl",
                        name: "sheet",
                        filename: pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j])[0].ClientName + "_SubAccountLedger_AR_" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                        preserveColors: false // set to true if you want background colors and font colors preserved
                    });



                }
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
            //mywindow.document.write(ReportHTML);
            //mywindow.document.close();

        }
    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html dir="rtl"> ';
        ReportHTML += '     <head><title> ' + (IsAgent ? '  كشف حساب وكيل' : '  كشف حساب عميل') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '   <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            debugger;
            var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
            if (CurrentRows.length > 0) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                if ($('#cbHeaderLogo').is(':checked') || $("#hDefaultUnEditableCompanyName").val() == "DGL")
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div><br>';
                //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'إلى تاريخ : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'من تاريخ : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'تاريخ الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines

                //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '             </table>';
                ReportHTML += '<h2><center>' + (IsAgent ? '  كشف حساب وكيل' : '  كشف حساب عميل') + '</center> </h2>';
                ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                ReportHTML += ' <br> ';
                ReportHTML += ' <div class="col-xs-12"><h4> ملحوظة </h4></div>';
                if (IsAgent == true)
                    ReportHTML += ' <div class="col-xs-12"> اذا لم يتم الرد خلال خمسة عشر يوما من تاريخه يتعبر مصادقه منكم على صحه المبلغ والموضح عاليه </div>';

                else
                    ReportHTML += ' <div class="col-xs-12"> اذا لم يتم الرد خلال خمسة عشر يوما من تاريخه يتعبر مصادقه منكم على صحه المبلغ المستحق عليكم والموضح عاليه </div>';


                ReportHTML += ' <br> ';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> مدير الحسابات</b></h5> </div>';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b>مدير المراجعه</b></h5> </div>';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                //ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                //ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is Available upon request </div>';
                ReportHTML += '                 </div>';
                //    ReportHTML += '             <div class="col-xs-4"></div>';
                if ($("#hDefaultUnEditableCompanyName").val() == "DGL") {
                    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //ReportHTML += '     </footer>';
                }
            }
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '         <div class="row text-center small">' + ' All financial transactions (payments / receipts / transfers) must be handled with only the company financial department and the company not responsible for any transactions that are otherwise.  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  جميع المعاملات المالية (المدفوعات/المقبوضات/التحويلات) يجب ان تتم مع الادارة المالية للشركة فقط ، والشركة ليست مسؤولة عن اى من المعاملات التى هى على خلاف ذلك	' + '</div>';

            ReportHTML += '         <div class="row b-b b-dark m-t-n-xxs" style="clear:both;"></div>'; //This is line

            ReportHTML += '         <div class="row text-center small">' + '  Nile Logistics International L.L.C	' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Address : 4 Eltahrir st., Square 1130Sheraton HeliopolisCairo 11361-Egypt  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Email : accounting@nilelogistics.com TEL:+202 2269 2714Fax:+202 2269 2719 ' + '</div>';
            ReportHTML += '     </footer>';
        }

        ReportHTML += '</html>';

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, (IsAgent ? '  كشف حساب وكيل' : '  كشف حساب عميل'), true);
        }
    }

    FadePageCover(false);
}
function SubAccountLedger_Print_ByCC_Summary(pData, pOutputTo) {
    debugger;
    console.log("SubAccountLedger_Print_ByCC_Summary");
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');
    var pTblRowsGroupByCostCenterSummary = JSON.parse(pData[7]);
    var pTblRowsGroupByCostCenterSummarySum = JSON.parse(pData[8]);
    var pAccountLinkTblRowsGroupByCostCenterID = JSON.parse(pData[10]);
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '          <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 

            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';








            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur

            var AccountLinkDebitTotal = 0.0;
            var AccountLinkCreditTotal = 0.0;

            $.each(pTblRowsGroupByCostCenterSummary, function (i, item) {
                if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '6' : '6') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';


                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '6' : '6') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;
                        //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : item.Debit
                        //            );
                        //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : item.Credit
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        if ((item.LocalDebit != 0 || item.LocalCredit != 0)) {
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        }
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)


        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="4" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //no transactions within this period, so final balance is the open balance
                if ($("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)
                    pRowTotalsHTML += '                                <td colspan=1 style="text-align:center;" class="">' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="1"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
        if (pOutputTo == "Excel") {
            //var ReportExcelSumCurrencyByCC = "";
            //for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            //    var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x=> (x.CostCenterID == ArrCostCenterIDList[k]));
            //    if (!Suppress || CureentRows.length > 0) {
            //        /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
            //        ReportExcelSumCurrencyByCC = '             <tr class="">';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '             </tr>';
            //        $.each(pTblRowsGroupByCostCenterSummarySum, function (z, rowSum) {
            //            if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
            //                ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
            //                ReportExcelSumCurrencyByCC += '             <tr class="">';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '             </tr>';
            //            }
            //        });
            //        /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
            //        $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
            //        ReportExcelSumCurrencyByCC = '';
            //        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

            //    }
            //}
            //-----------------------------------

            var ReportHTML = '';
            //ReportHTML += '<html>';


            //ReportHTML += '     <head><title>' + 'Cost Center' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            //ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    //ReportHTML += '         <div class="break"></div>';
                    ////ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cost Center</u></b>' + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ////ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    //ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    ////ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '        <div id="ReportBody">     <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSummarySum, function (i, item) {
                        if (ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';

                    //ReportHTML += pAccountLinkSummaryhtmltbl;
                    ReportHTML += '                 </div>';

                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                $("#hExportedTable").html(ReportHTML);
                //  $("#hExportedTable").html(ReportHTML);
                var $table = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name = nameCbCostCenter][value = " + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
                $('#ReportBody').table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: $("#divCbCostCenter input[name = nameCbCostCenter][value = " + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + ".xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }


        }//if (pOutputTo == "Excel")

        else {
            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            var pAccountLinkSummaryhtmltbl = "";
            ReportHTML += '<html>';


            ReportHTML += '     <head><title>' + 'Cost Center' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cost Center</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/
                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';

                    $.each(pTblRowsGroupByCostCenterSummarySum, function (i, item) {
                        if (ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';



                    /*****************************Creating table pAccountLinkSummaryhtmltbl****************************************/
                    ReportHTML += '                 <div class="col-xs-12">';
                    pAccountLinkSummaryhtmltbl = "";

                    AccountLinkDebitTotal = 0;
                    AccountLinkCreditTotal = 0;

                    pAccountLinkSummaryhtmltbl += '       <br>         <table id="tblAccountLinkSummary' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    pAccountLinkSummaryhtmltbl += '               <thead class="" style="">';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'Account' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'Debit' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'Credit' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'Balance' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                 </thead>';
                    pAccountLinkSummaryhtmltbl += '                 <tbody>';

                    $(pAccountLinkTblRowsGroupByCostCenterID).each(function (i, item) {
                        //     if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        if (ArrCostCenterIDList[k] == item.CostCenterID) {
                            // element == this
                            pAccountLinkSummaryhtmltbl += '          <tr>       <td style="text-align:center;" class="">' + item.Name + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + item.TotalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + item.TotalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + (item.TotalDebit - item.TotalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td></tr>';

                            AccountLinkDebitTotal += item.TotalDebit;
                            AccountLinkCreditTotal += item.TotalCredit;
                            console.log(item.TotalDebit);
                            console.log(item.TotalCredit);

                        }
                    });

                    console.log(AccountLinkDebitTotal);
                    console.log(AccountLinkCreditTotal);
                    pAccountLinkSummaryhtmltbl += '          <tr>       <td style="text-align:center;" class="">' + "<b>Total</b>" + '</td>';
                    pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + AccountLinkDebitTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pAccountLinkSummaryhtmltbl += '   `              <td style="text-align:center;" class="">' + AccountLinkCreditTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + (AccountLinkDebitTotal - AccountLinkCreditTotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td></tr>';
                    pAccountLinkSummaryhtmltbl += '                 </tbody>';
                    pAccountLinkSummaryhtmltbl += '             </table>';

                    console.log(pAccountLinkSummaryhtmltbl);
                    // pTablesHTML = pTablesHTML + pAccountLinkSummaryhtmltbl;
                    ReportHTML += pAccountLinkSummaryhtmltbl;
                    ReportHTML += '                 </div>';

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Cost Center", true);
            }
        }
    }
    else {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '          <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 

            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'الحساب' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
            pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
            pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';








            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur

            var AccountLinkDebitTotal = 0.0;
            var AccountLinkCreditTotal = 0.0;

            $.each(pTblRowsGroupByCostCenterSummary, function (i, item) {
                if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '6' : '6') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';


                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '6' : '6') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        pTablesHTML += '             </tr>';
                        pIsOpenBalanceRowAdded = true;
                        pPreviousRowFBalanceD = item.OpeningBalanceCurrency;
                        pPreviousRowFBalance = item.Opening_Balance;
                    }
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;
                        //var Deb = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalDebit / item.CuNow)
                        //            : item.Debit
                        //            );
                        //var Cre = (item.Currency_Code == $("#hDefaultCurrencyCode").val()
                        //            ? (item.LocalCredit / item.CuNow)
                        //            : item.Credit
                        //            );
                        //var fBalD = Deb - Cre;
                        //var FBalanceD = parseFloat(fBalD) + parseFloat(pPreviousRowFBalanceD);
                        //pPreviousRowFBalanceD = FBalanceD; //To be used in the next row
                        /******************Get LocalCur final balance************************/
                        var fBal = item.LocalDebit - item.LocalCredit;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        if ((item.LocalDebit != 0 || item.LocalCredit != 0)) {
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                            //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                            pTablesHTML += '                 </tr>';
                        }
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
                //   && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)


        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
        //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="4" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //no transactions within this period, so final balance is the open balance
                if ($("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)
                    pRowTotalsHTML += '                                <td colspan=1 style="text-align:center;" class="">' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="1"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'إجمالي المدين والدائن' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
        if (pOutputTo == "Excel") {
            //var ReportExcelSumCurrencyByCC = "";
            //for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            //    var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x=> (x.CostCenterID == ArrCostCenterIDList[k]));
            //    if (!Suppress || CureentRows.length > 0) {
            //        /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
            //        ReportExcelSumCurrencyByCC = '             <tr class="">';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //        ReportExcelSumCurrencyByCC += '             </tr>';
            //        $.each(pTblRowsGroupByCostCenterSummarySum, function (z, rowSum) {
            //            if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
            //                ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
            //                ReportExcelSumCurrencyByCC += '             <tr class="">';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
            //                ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
            //                ReportExcelSumCurrencyByCC += '             </tr>';
            //            }
            //        });
            //        /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
            //        $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
            //        ReportExcelSumCurrencyByCC = '';
            //        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

            //    }
            //}
            //-----------------------------------

            var ReportHTML = '';
            //ReportHTML += '<html>';


            //ReportHTML += '     <head><title>' + 'Cost Center' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            //ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    //ReportHTML += '         <div class="break"></div>';
                    ////ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cost Center</u></b>' + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ////ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    //ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    ////ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '        <div id="ReportBody">     <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSummarySum, function (i, item) {
                        if (ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';

                    //ReportHTML += pAccountLinkSummaryhtmltbl;
                    ReportHTML += '                 </div>';

                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                $("#hExportedTable").html(ReportHTML);
                //  $("#hExportedTable").html(ReportHTML);
                var $table = $("#tblSubAccountLedger" + $("#divCbCostCenter input[name = nameCbCostCenter][value = " + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
                $('#ReportBody').table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: $("#divCbCostCenter input[name = nameCbCostCenter][value = " + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + ".xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }


        }//if (pOutputTo == "Excel")

        else {
            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            var pAccountLinkSummaryhtmltbl = "";
            ReportHTML += '<html dir="rtl">';


            ReportHTML += '     <head><title>' + 'مركز التكلفة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterSummary.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>مركز التكلفة</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/
                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    // ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC'
                        + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')
                        + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 

                    ReportHTML += '                         </tbody>';

                    $.each(pTblRowsGroupByCostCenterSummarySum, function (i, item) {
                        if (ArrCostCenterIDList[k] == item.CostCenter_ID) {
                            ReportHTML += '             <tr class="">';
                            ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
                            ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
                            ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
                            ReportHTML += '                  <td class="col-xs-1 ">' + '</td>';
                            ReportHTML += '             </tr>';
                        }
                    });
                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';



                    /*****************************Creating table pAccountLinkSummaryhtmltbl****************************************/
                    ReportHTML += '                 <div class="col-xs-12">';
                    pAccountLinkSummaryhtmltbl = "";

                    AccountLinkDebitTotal = 0;
                    AccountLinkCreditTotal = 0;

                    pAccountLinkSummaryhtmltbl += '       <br>         <table id="tblAccountLinkSummary' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    pAccountLinkSummaryhtmltbl += '               <thead class="" style="">';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'الحساب' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'مدين' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'دائن' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                     <th class="">' + 'الرصيد' + '</th>';
                    pAccountLinkSummaryhtmltbl += '                 </thead>';
                    pAccountLinkSummaryhtmltbl += '                 <tbody>';

                    $(pAccountLinkTblRowsGroupByCostCenterID).each(function (i, item) {
                        //     if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        if (ArrCostCenterIDList[k] == item.CostCenterID) {
                            // element == this
                            pAccountLinkSummaryhtmltbl += '          <tr>       <td style="text-align:center;" class="">' + item.Name + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + item.TotalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + item.TotalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + (item.TotalDebit - item.TotalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td></tr>';

                            AccountLinkDebitTotal += item.TotalDebit;
                            AccountLinkCreditTotal += item.TotalCredit;
                            console.log(item.TotalDebit);
                            console.log(item.TotalCredit);

                        }
                    });

                    console.log(AccountLinkDebitTotal);
                    console.log(AccountLinkCreditTotal);
                    pAccountLinkSummaryhtmltbl += '          <tr>       <td style="text-align:center;" class="">' + "<b>الإجمالي</b>" + '</td>';
                    pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + AccountLinkDebitTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pAccountLinkSummaryhtmltbl += '   `              <td style="text-align:center;" class="">' + AccountLinkCreditTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pAccountLinkSummaryhtmltbl += '                 <td style="text-align:center;" class="">' + (AccountLinkDebitTotal - AccountLinkCreditTotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td></tr>';
                    pAccountLinkSummaryhtmltbl += '                 </tbody>';
                    pAccountLinkSummaryhtmltbl += '             </table>';

                    console.log(pAccountLinkSummaryhtmltbl);
                    // pTablesHTML = pTablesHTML + pAccountLinkSummaryhtmltbl;
                    ReportHTML += pAccountLinkSummaryhtmltbl;
                    ReportHTML += '                 </div>';

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';


            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "مركز التكلفة", true);
            }
        }
    }
    FadePageCover(false);
}
function SubAccountLedger_Print_ByCC_Profit(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');
    var pTblRowsGroupByCostCenterSummary = JSON.parse(pData[7]);
    var pTblRowsGroupByCostCenterSummarySum = JSON.parse(pData[8]);
    var pTblRowsGroupByCostCenterProfit = JSON.parse(pData[9]);


    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Payables' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Receivables' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenterProfit, function (i, item) {
                if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;

                        /******************Add the row************************/
                        if ((item.LocalDebit != 0 || item.LocalCredit != 0)) {
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Name + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Payables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Receivables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                 </tr>';
                        }
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pSummaryLocalCurBalance = pTotalLocalCredit - pTotalLocalDebit;
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            pRowTotalsHTML += '                            <tr>';
            pRowTotalsHTML += '                                <td colspan="3"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance.toFixed(2) + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
        if (pOutputTo == "Excel") {
            var ReportExcelSumCurrencyByCC = "";
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                var CureentRows = pTblRowsGroupByCostCenterProfit.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {
                    ///*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                    ////ReportExcelSumCurrencyByCC = '             <tr class="">';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '             </tr>';
                    ////$.each(pTblRowsGroupByCostCenterSummarySum, function (z, rowSum) {
                    ////    if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
                    ////        ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                    ////        ReportExcelSumCurrencyByCC += '             <tr class="">';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '             </tr>';
                    ////    }
                    ////});
                    ///*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
                    //$("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                    // ReportExcelSumCurrencyByCC = '';
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

                }
            }
        }//if (pOutputTo == "Excel")

        else {
            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';


            ReportHTML += '     <head><title>' + 'Cost Center' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterProfit.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Cost Center</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Cost Center", true);
            }
        }
    }
    else {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'الحساب' + '</th>';
            pTablesHTML += '                     <th class="">' + 'الدفع' + '</th>';
            pTablesHTML += '                     <th class="">' + 'التحصيل' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenterProfit, function (i, item) {
                if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (item.ID/*JV_ID*/ != 0) { //add normal row
                        /******************Get ForeigCur final balance************************/
                        debugger;

                        /******************Add the row************************/
                        if ((item.LocalDebit != 0 || item.LocalCredit != 0)) {
                            pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Name + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Payables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Receivables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '                 </tr>';
                        }
                    } //normal rows
                } //of if (item.SubAccountID == ArrSubAccountIDList[j]
            });
            pTablesHTML += '                 </tbody>';
            pTablesHTML += '             </table>';
            //of for (var j = 0; j < ArrSubAccountIDList.length; j++)
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pSummaryLocalCurBalance = pTotalLocalCredit - pTotalLocalDebit;
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td colspan="1" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

            }
            else { //Excel

                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'إجمالي المدين والدائن' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            pRowTotalsHTML += '                            <tr>';
            pRowTotalsHTML += '                                <td colspan="3"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance.toFixed(2) + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);

        } //of looping through CostCenters
        if (pOutputTo == "Excel") {
            var ReportExcelSumCurrencyByCC = "";
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                var CureentRows = pTblRowsGroupByCostCenterProfit.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {
                    ///*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                    ////ReportExcelSumCurrencyByCC = '             <tr class="">';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////ReportExcelSumCurrencyByCC += '             </tr>';
                    ////$.each(pTblRowsGroupByCostCenterSummarySum, function (z, rowSum) {
                    ////    if (//ArrSubAccountIDList[j] == rowSum.SubAccount_ID &&
                    ////        ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                    ////        ReportExcelSumCurrencyByCC += '             <tr class="">';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                    ////        ReportExcelSumCurrencyByCC += '             </tr>';
                    ////    }
                    ////});
                    ///*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/
                    //$("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                    // ReportExcelSumCurrencyByCC = '';
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

                }
            }
        }//if (pOutputTo == "Excel")

        else {
            var mywindow = null;
            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html dir="rtl">';


            ReportHTML += '     <head><title>' + 'مركز التكلفة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {

                debugger;
                var CureentRows = pTblRowsGroupByCostCenterProfit.filter(x => (x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {

                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>مركز التكلفة</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblSubAccountLedger' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblSubAccountLedger" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************EOF Creating table tblSumCurrencyByCC****************************************/

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';

            } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';


            if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else if (pOutputTo == "PrintInReportBody") {
                $('#ReportBody').html(ReportHTML)
            }
            else {
                SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "مركز التكلفة", true);
            }
        }
    }
    FadePageCover(false);
}

function SubAccountLedger_Print_ClientStatmentEn_Safina(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);
    var pTblRowsByCurrency = JSON.parse(pData[5]);
    var pTblClientStatment = JSON.parse(pData[6]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    var IsAgent = $("#cbIsAgentStatmentEn").prop("checked");

    var CurrencyID = $("#slCurrency").val();
    // &nbsp;
    //;&emsp
    var pTablesHTML = "";
    var pTablesHeaderHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {

        var CurrentClient = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
        if (CurrentClient.length > 0) {
            pTablesHeaderHTML += '   <div id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '">';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ('Messrs,') + '</b>' + CurrentClient[0].ClientName + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'NAME OF AGENT :' : 'NAME OF CLIENT:') + '</b>' + CurrentClient[0].ClientName + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ADDRESS :' + '</b>' + CurrentClient[0].ClientAddress + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'Phone And Fax :' + '</b>' + CurrentClient[0].PhonesAndFaxes + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'E-MAIL :' + '</b>' + CurrentClient[0].ClientEMail + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ACCOUNT NUMBER :' + '</b>' + CurrentClient[0].ClientNo + '</div>';
            pTablesHeaderHTML += '     <br>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' Dear Sirs,' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'The following statement shows your accounts with us at ' + pFormattedTodaysDate + '</b>' + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' we are kindly asking you to remit to our bank account mention hereunder' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';

            pTablesHeaderHTML += '  </div>';
        }
        $("#hExportdiv").html(pTablesHeaderHTML);

        pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';


        pTablesHTML += ' <tr> ';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Date' + '</th>';
        // pTablesHTML += '                     <th class="col-xs-4">' + 'Description' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Invoice no' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Receipt no' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Debit' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Credit' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Balance' + '</th>';
        pTablesHTML += ' </tr> ';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';

        var pPreviousRowFBalance = 0;
        $.each(pTblClientStatment, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j] && item.Currency_ID == CurrencyID) {
                pTablesHTML += '             </tr>';
                debugger;
                /******************Get LocalCur final balance************************/
                var fBal = item.Debit - item.Credit;
                var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);;
                pPreviousRowFBalance = FBalance; //To be used in the next row
                /******************Add the row************************/
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                pTablesHTML += '                 </tr>';

            } //normal rows
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';

    }
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
        var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
        var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';

        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                            </tr>';

        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class=""><b>  Balance  </b>' + '</td>';
        //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> Debit Balance Due To You </b>' + '</td>';
        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + $("#slCurrency").find('option:selected').text().trim() + '</td>';
        //pRowTotalsHTML += '                 </tr>';



        //pRowTotalsHTML += '                            <tr colspan="3" class="" style="font-size:95%; ">';
        //pRowTotalsHTML += '                                <td style="text-align:center; border-left: 2px solid white !important; border-right: 1px solid white !important; border-bottom: 1px solid white !important;" class="">' + toWords_WithFractionNumbers(Math.abs(pPreviousRowFBalance.toFixed(2))) + ' ' + $("#slCurrency").find('option:selected').text().trim() + ' ONLY' + '</td>';
        //pRowTotalsHTML += '                 </tr>';

        $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);

    }
    if (pOutputTo == "Excel") {
        var ReportHTML = '';
        var a = [];
        $.each(ArrSubAccountIDList, function (j, item) {
            var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
            if (CurrentRows.length > 0) {
                ReportHTML = '';
                ReportHTML += '         <div id="ReportBody">';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                ReportHTML += '                 </div>';
                var $table = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "");
                $table.table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j])[0].ClientName + "_SubAccountLedger_EN_" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }
        });


    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html> ';
        ReportHTML += '     <head><title> ' + (' Statement of Account') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ////ReportHTML += '     <head><title> ' + (IsAgent ? '  Agent Statment' : '  Client Statment') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '   <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
            if (CurrentRows.length > 0) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                if ($('#cbHeaderLogo').is(':checked') || $("#hDefaultUnEditableCompanyName").val() == "DGL")
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div><br>';
                //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines

                //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '             </table>';
                ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                //ReportHTML += '<h2><center>'+ (IsAgent ? '  Agent Statment' :' Client Statment') + '</center> </h2>';
                ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                ReportHTML += ' <br> ';
                ReportHTML += ' <div class="col-xs-12"> The account is to be considered confirm if receive no remarks within 15 days from this date </div>';
                ReportHTML += ' <br> ';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Accounting Manager</b></h5> </div>';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Auditing Manager</b></h5> </div>';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                debugger;

                if ($("#hDefaultUnEditableCompanyName").val() != "SAF" && $("#hDefaultUnEditableCompanyName").val() != "NIL") {
                    ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                    ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is available upon request </div>';
                }

                ReportHTML += '                 </div>';
                if ($("#hDefaultUnEditableCompanyName").val() == "DGL") {
                    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //ReportHTML += '     </footer>';
                }
                //    ReportHTML += '             <div class="col-xs-4"></div>';
            }
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         <body>';

        if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '         <div class="row text-center small">' + ' All financial transactions (payments / receipts / transfers) must be handled with only the company financial department and the company not responsible for any transactions that are otherwise.  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  جميع المعاملات المالية (المدفوعات/المقبوضات/التحويلات) يجب ان تتم مع الادارة المالية للشركة فقط ، والشركة ليست مسؤولة عن اى من المعاملات التى هى على خلاف ذلك	' + '</div>';

            ReportHTML += '         <div class="row b-b b-dark m-t-n-xxs" style="clear:both;"></div>'; //This is line

            ReportHTML += '         <div class="row text-center small">' + '  Nile Logistics International L.L.C	' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Address : 4 Eltahrir st., Square 1130Sheraton HeliopolisCairo 11361-Egypt  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Email : accounting@nilelogistics.com TEL:+202 2269 2714Fax:+202 2269 2719 ' + '</div>';

            ReportHTML += '     </footer>';
        }

        ReportHTML += '</html>';


        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Statment of Account", true);
        }
    }

    FadePageCover(false);
}
function SubAccountLedger_Print_SupplierStatementEn(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = (glbCallingControl == "AccountStatement"
        ? pSubAccountIDList = pLoggedUser.SubAccountID
        : pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount"));
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsGroupByCurrencySum = JSON.parse(pData[4]);
    var pTblRowsByCurrency = JSON.parse(pData[5]);
    var pTblClientStatment = JSON.parse(pData[6]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    var IsAgent = $("#cbIsAgentStatmentEn").prop("checked");

    var CurrencyID = $("#slCurrency").val();
    // &nbsp;
    //;&emsp
    var pTablesHTML = "";
    var pTablesHeaderHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {

        var CurrentClient = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j]);
        if (CurrentClient.length > 0) {
            pTablesHeaderHTML += '   <div id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '">';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ('Messrs,') + '</b>' + CurrentClient[0].ClientName + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + (IsAgent ? 'NAME OF AGENT :' : 'NAME OF CLIENT:') + '</b>' + CurrentClient[0].ClientName + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ADDRESS :' + '</b>' + CurrentClient[0].ClientAddress + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'Phone And Fax :' + '</b>' + CurrentClient[0].PhonesAndFaxes + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'E-MAIL :' + '</b>' + CurrentClient[0].ClientEMail + '</div>';
            //pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'ACCOUNT NUMBER :' + '</b>' + CurrentClient[0].ClientNo + '</div>';
            pTablesHeaderHTML += '     <br>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' Dear Sirs,' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + 'The following statement shows your accounts with us at ' + pFormattedTodaysDate + '</b>' + '</div>';
            pTablesHeaderHTML += '             <div class="col-xs-12"><b>' + ' we are kindly asking you to remit to our bank account mention hereunder' + '</b>' + '</div>';
            pTablesHeaderHTML += '     <br>';

            pTablesHeaderHTML += '  </div>';
        }
        $("#hExportdiv").html(pTablesHeaderHTML);

        pTablesHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';


        pTablesHTML += ' <tr> ';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Date' + '</th>';
        // pTablesHTML += '                     <th class="col-xs-4">' + 'Description' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Invoice no' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Receipt no' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Debit' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Credit' + '</th>';
        pTablesHTML += '                     <th class="col-xs-2">' + 'Balance' + '</th>';
        pTablesHTML += ' </tr> ';
        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';

        var pPreviousRowFBalance = 0;
        $.each(pTblClientStatment, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j] && item.Currency_ID == CurrencyID) {
                pTablesHTML += '             </tr>';
                debugger;
                /******************Get LocalCur final balance************************/
                var fBal = item.Debit - item.Credit;
                var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);;
                pPreviousRowFBalance = FBalance; //To be used in the next row
                /******************Add the row************************/
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                pTablesHTML += '                 </tr>';

            } //normal rows
        });
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';

    }
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    /*********************Append table summaries*************************/
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pTotalLocalDebit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Deb");
        var pTotalLocalCredit = GetColumnSum("tblSubAccountLedger" + ArrSubAccountIDList[j], "Cre");
        var pSummaryLocalCurBalance = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';

        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';
        pRowTotalsHTML += '                            </tr>';

        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class=""><b>  Balance  </b>' + '</td>';
        //pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b> Debit Balance Due To You </b>' + '</td>';
        pRowTotalsHTML += '                                <td colspan="3" style="text-align:center;" class="">' + pSummaryLocalCurBalance + ' ' + $("#slCurrency").find('option:selected').text().trim() + '</td>';
        //pRowTotalsHTML += '                 </tr>';



        //pRowTotalsHTML += '                            <tr colspan="3" class="" style="font-size:95%; ">';
        //pRowTotalsHTML += '                                <td style="text-align:center; border-left: 2px solid white !important; border-right: 1px solid white !important; border-bottom: 1px solid white !important;" class="">' + toWords_WithFractionNumbers(Math.abs(pPreviousRowFBalance.toFixed(2))) + ' ' + $("#slCurrency").find('option:selected').text().trim() + ' ONLY' + '</td>';
        //pRowTotalsHTML += '                 </tr>';

        $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);

    }
    if (pOutputTo == "Excel") {
        var ReportHTML = '';
        var a = [];
        $.each(ArrSubAccountIDList, function (j, item) {
            var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
            if (CurrentRows.length > 0) {
                ReportHTML = '';
                ReportHTML += '         <div id="ReportBody">';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                ReportHTML += '                 </div>';
                var $table = $("#tblSubAccountLedger" + ArrSubAccountIDList[j] + "");
                $table.table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j])[0].ClientName + "_SubAccountLedger_EN_" + getTodaysDateInddMMyyyyFormat() + ".xls", // do include extension
                    preserveColors: false // set to true if you want background colors and font colors preserved
                });
            }
        });


    }
    else {

        var mywindow = null;
        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html> ';
        ReportHTML += '     <head><title> ' + (' Statement of Account') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ////ReportHTML += '     <head><title> ' + (IsAgent ? '  Agent Statment' : '  Client Statment') + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '   <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblClientStatment.filter(x => x.SubAccount_ID == ArrSubAccountIDList[j] && x.Currency_ID == CurrencyID);
            if (CurrentRows.length > 0) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                if ($('#cbHeaderLogo').is(':checked') || $("#hDefaultUnEditableCompanyName").val() == "DGL")
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div><br>';
                //   ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4>' + '</div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines

                //ReportHTML += '             <table id="tblSubAccountLedgerHeader' + ArrSubAccountIDList[j] + '" class=" " style="">';  //style="border:solid #000 !Important;" 
                //ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '             </table>';
                ReportHTML += '<h2><center>' + ('Statement of Account') + '</center> </h2>';
                //ReportHTML += '<h2><center>'+ (IsAgent ? '  Agent Statment' :' Client Statment') + '</center> </h2>';
                ReportHTML += '             ' + $("#tblSubAccountLedgerHeader" + ArrSubAccountIDList[j]).html();

                ReportHTML += '             <table id="tblSubAccountLedger' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountLedger" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //  ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';

                ReportHTML += ' <br> ';
                ReportHTML += ' <div class="col-xs-12"> The account is to be considered confirm if receive no remarks within 15 days from this date </div>';
                ReportHTML += ' <br> ';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Accounting Manager</b></h5> </div>';
                ReportHTML += '<div class="col-xs-6" style="text-align:center"><h5><b> Auditing Manager</b></h5> </div>';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                ReportHTML += ' <br> ';
                debugger;

                if ($("#hDefaultUnEditableCompanyName").val() != "SAF" && $("#hDefaultUnEditableCompanyName").val() != "NIL") {
                    ReportHTML += ' <div class="col-xs-12" > All business is transacted  in accordance with our standard trading condition including the company`s liability </div>';
                    ReportHTML += ' <div class="col-xs-12" >and include jurisdiction place copy is available upon request </div>';
                }

                ReportHTML += '                 </div>';
                if ($("#hDefaultUnEditableCompanyName").val() == "DGL") {
                    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    //ReportHTML += '     </footer>';
                }
                //    ReportHTML += '             <div class="col-xs-4"></div>';
            }
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         <body>';

        if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '         <div class="row text-center small">' + ' All financial transactions (payments / receipts / transfers) must be handled with only the company financial department and the company not responsible for any transactions that are otherwise.  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  جميع المعاملات المالية (المدفوعات/المقبوضات/التحويلات) يجب ان تتم مع الادارة المالية للشركة فقط ، والشركة ليست مسؤولة عن اى من المعاملات التى هى على خلاف ذلك	' + '</div>';

            ReportHTML += '         <div class="row b-b b-dark m-t-n-xxs" style="clear:both;"></div>'; //This is line

            ReportHTML += '         <div class="row text-center small">' + '  Nile Logistics International L.L.C	' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Address : 4 Eltahrir st., Square 1130Sheraton HeliopolisCairo 11361-Egypt  ' + '</div>';
            ReportHTML += '         <div class="row text-center small">' + '  Email : accounting@nilelogistics.com TEL:+202 2269 2714Fax:+202 2269 2719 ' + '</div>';

            ReportHTML += '     </footer>';
        }

        ReportHTML += '</html>';

        if (pOutputTo != "Email" && pOutputTo != "PrintInReportBody") {
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
        else if (pOutputTo == "PrintInReportBody") {
            $('#ReportBody').html(ReportHTML)
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, "Statment of Account", true);
        }

    }

    FadePageCover(false);
}


//The coming functions are used in Reports --> Account Reports --> Account Statement to print SubAccount Ledger with less options
/************************************AccountStatement**********************************************/
function AccountStatement_Print() {
    debugger;

}



var arr_Values = new Array();

function SendAsEmail() {
    debugger;
    arr_Values = [];
    ReportName = "SubAccount Ledger";

    arr_Values.push($("#txtFromDate").val());
    arr_Values.push($("#txtToDate").val());
    arr_Values.push($("#hDefaultUnEditableCompanyName").val());
    arr_Values.push($("#slCurrency").val());
    arr_Values.push($("#slCurrency option:selected").text());
    arr_Values.push($("#slSubAccountGroup").val());
    arr_Values.push($("#slSubAccountGroup option:selected").text());
    arr_Values.push(pLoggedUser.SubAccountID);
    arr_Values.push($("#slSubAccount option:selected").text());
    arr_Values.push($("#cbIsClientStatmentEn").prop("checked"));
    arr_Values.push($("#cbIsAgentStatmentEn").prop("checked"));
    arr_Values.push($("#cbIsDetails").prop("checked"));
    arr_Values.push($("#cbHeaderLogo").prop("checked"));
    arr_Values.push($("#cbSuppressForZeroes").prop("checked"));




    var pParametersWithValues =
    {
        arr_Values: arr_Values
        , pTitle: "SubAccount Ledger"
        , pReportName: ReportName
    };

    //********************
    //***** For show Link Report Now
    //*********************
    var win = window.open("", "_blank");
    var url = '/GlobalReports/ViewOperAccountStatement?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    win.location = url;
    //******

    //********************
    //***** For Send Email
    //*********************
    //var url = '/GlobalReports/ViewOperAccountStatement?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    //SendUrlEmail_General("Invoices Report", $('#txtToEmail').val(), null, $('#btn-Email').attr('BaseUrl') + url, "Invoices Report", null);
    ////******


    FadePageCover(false);



}