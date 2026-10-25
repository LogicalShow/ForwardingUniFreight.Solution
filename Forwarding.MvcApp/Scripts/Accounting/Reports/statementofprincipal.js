//Start Auto Filter
$(document).ready(function () {
    $("#slSubAccountGroup").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter
function statementofprincipal_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
    else
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
}
function statementofprincipal_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function statementofprincipal_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function IncomeStatement_cbCheckAllActivityPortChanged() {
    debugger;
    if ($("#cbCheckAllActivityPorts").prop("checked")) {
        $("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", true);
        pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");

        CallGETActivityJobWithParameters();
    }
    else
        $("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", false);
    pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
    CallGETActivityJobWithParameters();
}

function IncomeStatement_cbCheckAllActivityCenterChanged() {
    debugger;
    if ($("#cbCheckAllActivityCenters").prop("checked")) {
        $("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", true);
        pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
        CallGETActivityJobWithParameters();
    }
    else
        $("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", false);
    pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
    CallGETActivityJobWithParameters();
}
function IncomeStatement_cbCheckAllActivityJobChanged() {
    //debugger;
    //$(".checkbox").change(function () {
    //    if (this.checked) {
    //        var pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
    //    }
    //});
    debugger;
    if ($("#cbCheckAllActivityJobs").prop("checked")) {
        $("#divCbActivityJob input[name=nameCbActivityJob]").prop("checked", true);
        var pActivityJobIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityJob");
    }
    else {
        $("#divCbActivityJob input[name=nameCbActivityJob]").prop("checked", false);
        var pActivityJobIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityJob");
    }
}
function statementofprincipal_slSubAccountGroupChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/statementofprincipal/SubAccountGroupChanged"
        , { pSubAccountID: $("#slSubAccountGroup").val() }
        , function (pData) {
            var pAccount = pData[0];
            var pSubAccount = pData[1];
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 5/*Name*/, null);
            FillDivWithCheckboxes("divCbSubAccount", pSubAccount, "nameCbSubAccount", 4, null);
            FadePageCover(false);
        }
        , null);
}
function IncomeStatement_DivCheckActivityJobChanged() {
    debugger;
    if ($(":checked")) {
        //$("#divCbActivityJob input[name=nameCbActivityJob]").prop("checked", true);
        pActivityJobIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityJob");
    }
    else
        //$("#divCbActivityJob input[name=nameCbActivityJob]").prop("checked", false);
        pActivityJobIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityJob");
}
function IncomeStatement_DivCheckActivityPortChanged() {
    debugger;
    if ($(":checked")) {
        pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
        CallGETActivityJobWithParameters();
    }
    else
        pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
    CallGETActivityJobWithParameters();
}
function IncomeStatement_DivCheckActivityCentersChanged() {
    debugger;
    if ($(":checked")) {
        pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
        CallGETActivityJobWithParameters();
    }
    else
        pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
    CallGETActivityJobWithParameters();
}
function CallGETActivityJobWithParameters() {


    $.ajax({
        type: "GET",
        url: strServerURL + "api/IncomeStatementByActivityCenter/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
        data: { pActivityCenterIDs: pActivityCenterIDs, pActivityPortIDs: pActivityPortIDs },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (pActivityJob) {
            FillDivWithCheckboxes("divCbActivityJob", pActivityJob, "nameCbActivityJob", 2/*EnName*/, null);

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function statementofprincipal_Print(pOutputTo) {
    debugger;
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    //var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    //var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    //var pCurrencyID = $("#slCurrency").val();
    //var pJobIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityJob");


    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSubAccount");
    var pSubAccountIDList = $("#slSubAccountGroup").val();

    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount");
    var pCurrency = $("#slCurrency").val();
    var pSuppressReverseJVs = $("#cbSuppressReverseJVs").prop("checked") ? "1" : "0";
    pAccountIDList = "-1";
   
    if (pCurrency == "0")
        swal("Sorry", "Please, select Currency.");


    else if (pSubAccountIDList == "")
        swal("Sorry", "Please, select at least one subaccount.");
    else if (pSubAccountIDList == "")
        swal("Sorry", "Please, select at least one subaccount.");
    
    //else if (pJobIDs == "" && $("#cbIsGroupByJob").prop("checked"))
    //    swal("Sorry", "Please, select Jobs.");
    else {

            var arr_Keys = new Array();
            var arr_Vlaues = new Array();
            arr_Keys.push("SubAccount_IDs");
            arr_Keys.push("AccountIDs");
            arr_Keys.push("From_Date");
            arr_Keys.push("To_Date");
            arr_Keys.push("CurrencyID");
            arr_Keys.push("SuppressReverseJVs");


            arr_Vlaues.push(pSubAccountIDList);
            arr_Vlaues.push(pAccountIDList);
            arr_Vlaues.push(pFromDate);
            arr_Vlaues.push(pToDate);
            arr_Vlaues.push(pCurrency);
            arr_Vlaues.push(pSuppressReverseJVs);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Vlaues: arr_Vlaues
                , pTitle: "statement of a/c for principal"
                , pReportName: pOutputTo == "Print" ? "Rep_A_Clientstatementofprincipal" : "Rep_A_ClientstatementofprincipalExcel"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
}
function statementofprincipal_Print_Detailed_OneEgypt(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
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
        pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';
        pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
        pTablesHTML += '                     <th class="">' + 'JV Date' + '</thb>';
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
        var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
        var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalCredit");
        var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
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
        if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
        pRowTotalsHTML += '                            </tr>';
        $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrSubAccountIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j]);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
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
function statementofprincipal_Print_GroupByCC_OneEgypt(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
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
            pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Journal Date' + '</thb>';
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
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
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
            if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pSummaryForeignCurBalance + ' $' + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + pSummaryLocalCurBalance + ' ' + $("#hDefaultCurrencyCode").val() + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
        } //of looping through SubAccounts
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
                    if (ArrSubAccountIDList[j] == rowSum.SubAccount_ID && ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
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
                $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);
                ReportExcelSumCurrencyByCC = '';
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
            }//for (var j = 0; j < ArrSubAccountIDList.length; j++)
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                ReportHTML += '             </table>';


                /*****************************Creating table tblSumCurrencyByCC****************************************/
                ReportHTML += '             <div class="col-xs-4"></div>';
                ReportHTML += '                 <div class="col-xs-4">';
                ReportHTML += '                     <table id="tblSumCurrencyByCC' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="m-t table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '                         </tbody>';
                $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                    if (ArrSubAccountIDList[j] == item.SubAccount_ID && ArrCostCenterIDList[k] == item.CostCenter_ID) {
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
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

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

function statementofprincipal_Print_Detailed(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';

        if (pOutputTo != "Excel") {
            pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
            if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
          

            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</thb>';
            pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JobNumber' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
            pTablesHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
            pTablesHTML += '                     <th class="">' + 'UserCreate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'DateCreate' + '</th>';

            pTablesHTML += '                     <th class="">' + 'UserUpdate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'DateUpdate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'DepartementName' + '</th>';
            pTablesHTML += '                     <th class="">' + 'InvoiceNo' + '</th>';


            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';

        }

        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pTblRows != null)
        //var pPreviousRowFBalanceD = 0; //final balance $
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pTblRows, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)

                    if (pOutputTo != "Excel") {
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '19' : '19') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '             </tr>';
                    }
                    else { //Excel

                        var DebitOpening = 0;
                        var CreditOpening = 0;

                        var OpeningBalance = parseFloat(item.Opening_Balance);
                        if (OpeningBalance < 0)
                            CreditOpening = (item.Opening_Balance * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        if (OpeningBalance > 0)
                            DebitOpening = item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        if (DebitOpening != 0 || CreditOpening != 0) {
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' +
                            item.SubAccountName // $("#divCbSubAccount input[name=nameCbSubAccount][value=" + item.SubAccount_ID + "]").siblings().text().trim()
                            + '</td>';//SubAccount
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';

                            pTablesHTML += '                     <td style="text-align:center;" class="">' + DebitOpening + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + CreditOpening + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'Opening Balance' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


                          //  pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '             </tr>';
                        }

                    }

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
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';

                    if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';

                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description2 + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JobNumber + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Vessel_Name + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoyageNumber + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserCreate + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DateCreate + '</td>';

                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserUpdate + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DateUpdate + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DepartementName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';




                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance

                    if (pOutputTo != "Excel")
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
        //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
        //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalCredit");
        //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pSummaryLocalCurBalance_Posted = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
        var pRowTotalsHTML = "";

        if (pOutputTo != "Excel") {
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td colspan="16" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
            if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + 'Posted: ' + pSummaryLocalCurBalance_Posted + '</td>';

            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
        }
        else { //Excel
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            //else
            //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + 'Posted: ' + pSummaryLocalCurBalance_Posted + '</td>';
        }


        $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        //for (var j = 0; j < ArrSubAccountIDList.length; j++)
        //    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j]);

        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sub Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub Account Ledger</u></b>' + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
        // ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <table id="">';
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</th>';
        ReportHTML += '                     <th class="">' + 'To : ' + '</b>' + $("#txtToDate").val() + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        ReportHTML += '             <table id="tblstatementofprincipal">';  //style="border:solid #000 !Important;" 
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'Main Acc' + '</th>';

        ReportHTML += '                     <th class="">' + 'SubAccount' + '</th>';

        ReportHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Description' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV No.' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV Date' + '</thb>';
        ReportHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
        ReportHTML += '                     <th class="">' + 'Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Cur' + '</th>';
        ReportHTML += '                     <th class="">' + 'ExRate' + '</th>';
        ReportHTML += '                     <th class="">' + 'Documented' + '</th>';
        ReportHTML += '                    <th class="">' + 'JobNumber' + '</th>';
        ReportHTML += '                    <th class="">' + 'Vessel_Name' + '</th>';
        ReportHTML += '                    <th class="">' + 'VoyageNumber' + '</th>';
        ReportHTML += '                    <th class="">' + 'UserCreate' + '</th>';
        ReportHTML += '                    <th class="">' + 'DateCreate' + '</th>';

        ReportHTML += '                    <th class="">' + 'UserUpdate' + '</th>';
        ReportHTML += '                    <th class="">' + 'DateUpdate' + '</th>';
        ReportHTML += '                    <th class="">' + 'DepartementName' + '</th>';
        ReportHTML += '                    <th class="">' + 'InvoiceNo' + '</th>';




        ReportHTML += '                     <th class="">' + 'Balance' + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';

        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRows.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                //  if (i > 0)
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';
                // ReportHTML += '   <tr> ';
                //ReportHTML += '<th>' + 'From :' + '</td>';
                //ReportHTML += '<th>' + $("#txtFromDate").val() + '</td>';
                //ReportHTML += '<th>' + 'To :' + '</td>';
                //ReportHTML += '<th>' + $("#txtToDate").val() + '</td>';

                //ReportHTML += '<th>' + 'SubAccount Name :' + '</td>';
                //ReportHTML += '<th>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</td>';
                //  ReportHTML += '';
                //  ReportHTML += '</tr>';



                //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        // $("#Reportbody").tblToExcel("Account Ledger");

        var filename = "Sub Account Ledger " + pFormattedTodaysDate + ' ' + pFormattedPrintTime;

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: filename//do not include extension
        });
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRows.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        }
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
function statementofprincipal_Print_GroupByJob(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
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
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Journal Date' + '</thb>';
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
                //pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' +'' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                 </tr>';
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
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';
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
            //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';


                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)   //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td  colspan="2" style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td  colspan="2" style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            else { //Excel
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)   //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }
            pRowTotalsHTML += '                            </tr>';
            $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
        } //of looping through SubAccounts
    } //of looping through CostCenters
    if (pOutputTo == "Excel") {
        var ReportExcelSumCurrencyByCC = "";
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                var CureentRows = pTblRowsGroupByCostCenter.filter(x=> (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
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
                    ReportExcelSumCurrencyByCC += '             </tr>';
                    $.each(pTblRowsGroupByCostCenterSum, function (z, rowSum) {
                        if (ArrSubAccountIDList[j] == rowSum.SubAccount_ID && ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
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

                    $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);

                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Sub Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div id="Reportbody">';
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub Account Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '   <tr> ';
                    ReportHTML += '<th>' + 'From :' + '</th>';
                    ReportHTML += '<th>' + $("#txtFromDate").val() + '</th>';
                    ReportHTML += '<th>' + 'To :' + '</th>';
                    ReportHTML += '<th>' + $("#txtToDate").val() + '</th>';
                    ReportHTML += '</tr>';

                    ReportHTML += '   <tr> ';
                    ReportHTML += '<th>' + 'SubAccount : ' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</th>';
                    //ReportHTML += '<th>' + 'SubAccount Name :' + '</th>';
                    ReportHTML += '<th>' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html(); + '</th>';
                    ReportHTML += '';
                    ReportHTML += '</tr>';



                    //style="border:solid #000 !Important;" 
                    //  ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '<tr></tr>';
                    ReportHTML += '<tr></tr>';
                    ReportHTML += '<tr></tr>';
                    ReportHTML += '             </table>';
                    /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/

                    //ReportExcelSumCurrencyByCC = '';
                    //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

                }//for (var j = 0; j < ArrSubAccountIDList.length; j++)
            }
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        // $("#Reportbody").tblToExcel("Account Ledger");


        var filename = "Sub Account Ledger By CostCenter" + pFormattedTodaysDate + ' ' + pFormattedPrintTime;
        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: filename//do not include extension
        });
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {


                var CureentRows = pTblRowsGroupByCostCenter.filter(x=> (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="m-t table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                        if (ArrSubAccountIDList[j] == item.SubAccount_ID && ArrCostCenterIDList[k] == item.CostCenter_ID) {
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

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

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

function statementofprincipal_Print_GroupByCC(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
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
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            if (pOutputTo != "Excel") {
                pTablesHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Journal Date' + '</thb>';
                pTablesHTML += '                     <th class="">' + 'Account' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
                pTablesHTML += '                     <th class="">' + 'JobNumber' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
                pTablesHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
                pTablesHTML += '                     <th class="">' + 'UserCreate' + '</th>';
                pTablesHTML += '                     <th class="">' + 'UserUpdate' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            }
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            if (pOutputTo == "Excel") { //to add the name of SubAccount and CostCenter for the excel files
                //pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' +'' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                //pTablesHTML += '                 </tr>';
            }
            var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsGroupByCostCenter, function (i, item) {
                if (item.SubAccountID == ArrSubAccountIDList[j]
                    && item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '10' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '             </tr>';
                        }
                        else { //Excel
                            var DebitOpening = 0;
                            var CreditOpening = 0;

                            var OpeningBalance = parseFloat(item.Opening_Balance);
                            if (OpeningBalance < 0)
                                CreditOpening = (item.Opening_Balance * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            if (OpeningBalance > 0)
                                DebitOpening = item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            if (DebitOpening != 0 || CreditOpening != 0) {
                                pTablesHTML += '             <tr class="" style="font-size:95%;">';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenterName + '</td>';
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
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';

                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '             </tr>';
                            }
                        }

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
                        if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                        {
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenterName + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                        }
                         

                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                        //pTablesHTML += '                     <td style="text-align:center;">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JobNumber + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Vessel_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoyageNumber + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserCreate + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserUpdate + '</td>';

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
            //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
            var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalDebit");
            var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "LocalCredit");
            //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
            var pRowTotalsHTML = "";

            if (pOutputTo != "Excel") {
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="12" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';


                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)   //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td  colspan="2" style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td  colspan="2" style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
                pRowTotalsHTML += '                            </tr>';
                $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
            }
            else { //Excel
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

                //if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1)   //no transactions within this period, so final balance is the open balance
                //    pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                //else
                //    pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                //        + '</td>';
            }

        } //of looping through SubAccounts
    } //of looping through CostCenters
    if (pOutputTo == "Excel") {


        var ReportExcelSumCurrencyByCC = "";

        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sub Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <table id="">';
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</th>';
        ReportHTML += '                     <th class="">' + 'To : ' + '</b>' + $("#txtToDate").val() + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        ReportHTML += '             <table id="tblstatementofprincipalCostCenter">';  //style="border:solid #000 !Important;" 
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'CostCenter' + '</th>';
        ReportHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        ReportHTML += '                     <th class="">' + 'JournalNo.' + '</th>';
        ReportHTML += '                     <th class="">' + 'Journal Date' + '</thb>';
        ReportHTML += '                     <th class="">' + 'Account' + '</th>';
        ReportHTML += '                     <th class="">' + 'Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Cur' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Documented' + '</th>';
        ReportHTML += '                     <th class="">' + 'JobNumber' + '</th>';
        ReportHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
        ReportHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
        ReportHTML += '                     <th class="">' + 'UserCreate' + '</th>';
        ReportHTML += '                     <th class="">' + 'UserUpdate' + '</th>';

        ReportHTML += '                     <th class="">' + 'Description' + '</th>';
        ReportHTML += '                     <th class="">' + 'Balance' + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';
        for (var k = 0; k < ArrCostCenterIDList.length; k++)
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                var CureentRows = pTblRowsGroupByCostCenter.filter(x=> (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                if (CureentRows.length > 0) {
                    /*****************************Appending rows for Excel SumCurrencyByCC****************************************/
                    //ReportExcelSumCurrencyByCC = '             <tr class="">';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //ReportExcelSumCurrencyByCC += '             </tr>';
                    //$.each(pTblRowsGroupByCostCenterSum, function (z, rowSum) {
                    //    if (ArrSubAccountIDList[j] == rowSum.SubAccount_ID && ArrCostCenterIDList[k] == rowSum.CostCenter_ID) {
                    //        ReportExcelSumCurrencyByCC += '             <tr class="">';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.FinalBalance + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + rowSum.Currency_Code + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '                  <td class="">' + '' + '</td>';
                    //        ReportExcelSumCurrencyByCC += '             </tr>';
                    //    }
                    //});

                    //$("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(ReportExcelSumCurrencyByCC);


                    // ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub Account Ledger</u></b>' + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ////ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    //ReportHTML += '   <tr> ';
                    //ReportHTML += '<th>' + 'From :' + '</th>';
                    //ReportHTML += '<th>' + $("#txtFromDate").val() + '</th>';
                    //ReportHTML += '<th>' + 'To :' + '</th>';
                    //ReportHTML += '<th>' + $("#txtToDate").val() + '</th>';
                    //ReportHTML += '</tr>';

                //    ReportHTML += '   <tr> ';
                    //ReportHTML += '<th>' + 'SubAccount : ' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</th>';
                    //ReportHTML += '<th>' + 'SubAccount Name :' + '</th>';
                    ReportHTML +=
                        $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '';
                  //  ReportHTML += '</tr>';



                    //style="border:solid #000 !Important;" 
                    //  ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    //ReportHTML += '<tr></tr>';
                    //ReportHTML += '<tr></tr>';
                    //ReportHTML += '<tr></tr>';
                    ReportHTML += '             </table>';
                    /*****************************EOF Appending rows for Excel SumCurrencyByCC****************************************/

                    //ReportExcelSumCurrencyByCC = '';
                    //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));

                }//for (var j = 0; j < ArrSubAccountIDList.length; j++)
            }
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        // $("#Reportbody").tblToExcel("Account Ledger");


        var filename = "Sub Account Ledger By CostCenter" + pFormattedTodaysDate + ' ' + pFormattedPrintTime;
        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: filename//do not include extension
        });
    }//if (pOutputTo == "Excel")

    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {


                var CureentRows = pTblRowsGroupByCostCenter.filter(x=> (x.SubAccountID == ArrSubAccountIDList[j] && x.CostCenterID == ArrCostCenterIDList[k]));
                if (!Suppress || CureentRows.length > 0) {
                    //if (i > 0)
                    ReportHTML += '         <div class="break"></div>';
                    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';


                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-4"></div>';
                    ReportHTML += '                 <div class="col-xs-12">';
                    ReportHTML += '                     <table id="tblSumCurrencyByCC' + ArrSubAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="m-t table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         </tbody>';
                    $.each(pTblRowsGroupByCostCenterSum, function (i, item) {
                        if (ArrSubAccountIDList[j] == item.SubAccount_ID && ArrCostCenterIDList[k] == item.CostCenter_ID) {
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

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRowsGroupByCostCenter.length + '</div>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        } //for (var k = 0; k < ArrCostCenterIDList.length; k++)

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
function statementofprincipal_Print_DetailedByCurrency(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsByCurrency = JSON.parse(pData[4]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTablesHTML = "";
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        var pIsOpenBalanceRowAdded = false;
        pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTablesHTML += '                 <thead class="" style="">';

        if (pOutputTo != "Excel") {
            pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
            if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';


            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</thb>';
            pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JobNumber' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
            pTablesHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
            pTablesHTML += '                     <th class="">' + 'UserCreate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'DateCreate' + '</th>';

            pTablesHTML += '                     <th class="">' + 'UserUpdate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'DateUpdate' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';

        }

        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';
        //if (pTblRows != null)
        //var pPreviousRowFBalanceD = 0; //final balance $
        var pPreviousRowFBalance = 0; //final balance Local Cur
        $.each(pTblRowsByCurrency, function (i, item) {
            if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)

                    if (pOutputTo != "Excel") {
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '19' : '19') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                        pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '             </tr>';
                    }
                    else { //Excel

                        var DebitOpening = 0;
                        var CreditOpening = 0;

                        var OpeningBalance = parseFloat(item.Opening_Balance);
                        if (OpeningBalance < 0)
                            CreditOpening = (item.Opening_Balance * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        if (OpeningBalance > 0)
                            DebitOpening = item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        if (DebitOpening != 0 || CreditOpening != 0) {
                            pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' +
                            item.SubAccountName // $("#divCbSubAccount input[name=nameCbSubAccount][value=" + item.SubAccount_ID + "]").siblings().text().trim()
                            + '</td>';//SubAccount
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';

                            pTablesHTML += '                     <td style="text-align:center;" class="">' + DebitOpening + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + CreditOpening + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'Opening Balance' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            //  pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTablesHTML += '             </tr>';
                        }

                    }

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
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.AccountName + '</td>';

                    if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';

                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Description2 + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Documented">' + '--' + '</td>';//FBalanceD
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JobNumber + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Vessel_Name + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoyageNumber + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserCreate + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DateCreate + '</td>';

                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserUpdate + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DateUpdate + '</td>';


                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance

                    if (pOutputTo != "Excel")
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
        //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
        //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
        var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalDebit");
        var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "LocalCredit");
        //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
        var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pSummaryLocalCurBalance_Posted = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
        var pRowTotalsHTML = "";

        if (pOutputTo != "Excel") {
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pRowTotalsHTML += '                                <td colspan="16" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
            if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            else
                pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + 'Posted: ' + pSummaryLocalCurBalance_Posted + '</td>';

            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
        }
        else { //Excel
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            //if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
            //else
            //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') + 'Posted: ' + pSummaryLocalCurBalance_Posted + '</td>';
        }


        $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        //for (var j = 0; j < ArrSubAccountIDList.length; j++)
        //    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j]);

        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sub Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub Account Ledger</u></b>' + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
        // ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <table id="">';
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</th>';
        ReportHTML += '                     <th class="">' + 'To : ' + '</b>' + $("#txtToDate").val() + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        ReportHTML += '             <table id="tblstatementofprincipal">';  //style="border:solid #000 !Important;" 
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'Main Acc' + '</th>';

        ReportHTML += '                     <th class="">' + 'SubAccount' + '</th>';

        ReportHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Description' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV No.' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV Date' + '</thb>';
        ReportHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
        ReportHTML += '                     <th class="">' + 'Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Cur' + '</th>';
        ReportHTML += '                     <th class="">' + 'ExRate' + '</th>';
        ReportHTML += '                     <th class="">' + 'Documented' + '</th>';
        ReportHTML += '                    <th class="">' + 'JobNumber' + '</th>';
        ReportHTML += '                    <th class="">' + 'Vessel_Name' + '</th>';
        ReportHTML += '                    <th class="">' + 'VoyageNumber' + '</th>';
        ReportHTML += '                    <th class="">' + 'UserCreate' + '</th>';
        ReportHTML += '                    <th class="">' + 'DateCreate' + '</th>';

        ReportHTML += '                    <th class="">' + 'UserUpdate' + '</th>';
        ReportHTML += '                    <th class="">' + 'DateUpdate' + '</th>';


        ReportHTML += '                     <th class="">' + 'Balance' + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';

        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRowsByCurrency.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                //  if (i > 0)
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';
                // ReportHTML += '   <tr> ';
                //ReportHTML += '<th>' + 'From :' + '</td>';
                //ReportHTML += '<th>' + $("#txtFromDate").val() + '</td>';
                //ReportHTML += '<th>' + 'To :' + '</td>';
                //ReportHTML += '<th>' + $("#txtToDate").val() + '</td>';

                //ReportHTML += '<th>' + 'SubAccount Name :' + '</td>';
                //ReportHTML += '<th>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</td>';
                //  ReportHTML += '';
                //  ReportHTML += '</tr>';



                //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        // $("#Reportbody").tblToExcel("Account Ledger");

        var filename = "Sub Account Ledger " + pFormattedTodaysDate + ' ' + pFormattedPrintTime;

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: filename//do not include extension
        });
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRowsByCurrency.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
                ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            } //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        }
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

function statementofprincipal_Print_DetailedByCurrency(pData, pOutputTo) {
    debugger;
    //if ($("#slSubAccount option:selected").text().split(': ')[1].substring(0, 1) == "4")
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    //var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);
    var pTblRowsGroupByCostCenter = JSON.parse(pData[2]);
    var pTblRowsGroupByCostCenterSum = JSON.parse(pData[3]);
    var pTblRowsByCurrency = JSON.parse(pData[4]);
    //var pTblRowsByCurrency = JSON.parse(pData[5]);

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
            pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            if (pOutputTo != "Excel") {
                pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
                pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
                pTablesHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
                pTablesHTML += '                     <th class="">' + 'JVType_Name' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Main Acc' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
                pTablesHTML += '                     <th class="">' + 'ExRate' + '</th>';
                pTablesHTML += '                     <th class="">' + 'LocDebit' + '</th>';
                pTablesHTML += '                     <th class="">' + 'LocCredit' + '</th>';
                // pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
                pTablesHTML += '                     <th class="">' + 'JobNumber' + '</th>';
                pTablesHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
                pTablesHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
                pTablesHTML += '                     <th class="">' + 'UserCreate' + '</th>';
                pTablesHTML += '                     <th class="">' + 'UserUpdate' + '</th>';
                pTablesHTML += '                     <th class="">' + 'DepartementName' + '</th>';
                pTablesHTML += '                     <th class="">' + 'InvoiceNo' + '</th>';


                pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            }
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pTblRows != null)
            //var pPreviousRowFBalanceD = 0; //final balance $
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pTblRowsByCurrency, function (i, item) {
                if (item.SubAccount_ID == ArrSubAccountIDList[j]) {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        //pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '17' : '17') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
                            pTablesHTML += '                 <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        }
                        else { //Excel
                            var DebitOpening = 0;
                            var CreditOpening = 0;
                            var LocDebitOpening = 0;
                            var LocCreditOpening = 0;
                            var Rate = 0;
                            Rate = parseFloat(item.ExchangeRate);
                            var OpeningBalance = parseFloat(item.Opening_Balance);
                            if (OpeningBalance < 0)
                            {
                                CreditOpening = (item.Opening_Balance * -1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                LocCreditOpening = (OpeningBalance * Rate) * -1
                            }
                               
                            if (OpeningBalance > 0)
                            {
                                DebitOpening = item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                LocDebitOpening = OpeningBalance * Rate
                            }
                            //pTablesHTML += '             <tr class="" style="font-size:95%;">';
                            if (DebitOpening != 0 || CreditOpening != 0) {
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';// $("#divCbSubAccount input[name=nameCbSubAccount][value=" + item.SubAccount_ID + "]").siblings().text().trim()
                                //SubAccount
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + 'Opening Balance:' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Debit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Credit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.LocalDebit + '</td>';
                                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.LocalCredit + '</td>';

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
                        if ($("#cbShowSubAccount").prop("checked") || pOutputTo == "Excel")
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';

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
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';

                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JobNumber + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Vessel_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.VoyageNumber + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserCreate + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.UserUpdate + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.DepartementName + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.InvoiceNo + '</td>';



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
            //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
            var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
            //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'Totals</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="7" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="7"  style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td colspan="7"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';

                if ($("#cbShowSubAccount").prop("checked"))
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                pRowTotalsHTML += '                            </tr>';
                $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
            }
            else { //Excel
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Total Debit and Credit' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                ////pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                ////pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                //if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                //else
                //    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                //        + '</td>';
            }

        }
    }
    else {
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            pTablesHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
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
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '15' : '15') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
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
            //var pTotalForeignCurDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
            //var pTotalForeignCurCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");
            var pTotalLocalDebit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Deb");
            var pTotalLocalCredit = GetColumnSum("tblstatementofprincipal" + ArrSubAccountIDList[j], "Cre");

            //var pSummaryForeignCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalanceD").text();
            var pSummaryLocalCurBalance = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text();
            var pSummaryLocalCurBalance_Posted = $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:last td.Posted").text();
            var pRowTotalsHTML = "";
            pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
            if (pOutputTo != "Excel") {

                pRowTotalsHTML += '                                <td colspan="5" style="text-align:center;" class=""><b><u>' + 'الإجمالي</u></b> &emsp;' + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pRowTotalsHTML += '                                <td colspan="2" style="text-align:center;" class=""><b><u>' + '</u></b> &emsp;' + '</td>';

                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
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
                if ($("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance + (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') //+ 'Posted: ' + pSummaryLocalCurBalance_Posted
                        + '</td>';
            }


            if ($("#cbShowSubAccount").prop("checked"))
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
            pRowTotalsHTML += '                            </tr>';
            $("#tblstatementofprincipal" + ArrSubAccountIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    }
    if (pOutputTo == "Excel") {

        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sub Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <table id="">';
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</th>';
        ReportHTML += '                     <th class="">' + 'To : ' + '</b>' + $("#txtToDate").val() + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        ReportHTML += '             <table id="tblstatementofprincipal">';  //style="border:solid #000 !Important;" 
        ReportHTML += '                 <thead class="" style="">';
        ReportHTML += '                     <th class="">' + 'SubAccount' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV No.' + '</th>';
        ReportHTML += '                     <th class="">' + 'JV Date' + '</th>';
        ReportHTML += '                     <th class="">' + 'ReceiptNo' + '</th>';
        ReportHTML += '                     <th class="">' + 'JVType_Name' + '</th>';
        ReportHTML += '                     <th class="">' + 'Main Acc' + '</th>';
        ReportHTML += '                     <th class="">' + 'Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Credit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Cur' + '</th>';
        ReportHTML += '                     <th class="">' + 'ExRate' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc..Debit' + '</th>';
        ReportHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        // pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
        ReportHTML += '                     <th class="">' + 'Description' + '</th>';
        ReportHTML += '                     <th class="">' + 'JobNumber' + '</th>';
        ReportHTML += '                     <th class="">' + 'Vessel_Name' + '</th>';
        ReportHTML += '                     <th class="">' + 'VoyageNumber' + '</th>';
        ReportHTML += '                     <th class="">' + 'UserCreate' + '</th>';
        ReportHTML += '                     <th class="">' + 'UserUpdate' + '</th>';
        ReportHTML += '                     <th class="">' + 'DepartementName' + '</th>';
        ReportHTML += '                     <th class="">' + 'InvoiceNo' + '</th>';



        ReportHTML += '                     <th class="">' + 'Balance' + '</th>';
        ReportHTML += '                  </thead>';
        ReportHTML += '                  </table>';

        for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            var CurrentRows = pTblRowsByCurrency.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
            if ( CurrentRows.length > 0) {
                //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblstatementofprincipal" + ArrSubAccountIDList[j]);
                //ReportHTML += '         <div class="break"></div>';
                ////ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub Account Ledger</u></b>' + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ////ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '<b> ' + $("#slCurrency").find('option:selected').text().trim() + '</b>  ' + '</h4></div>';
                ////ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';
                //ReportHTML += '   <tr> ';
                //ReportHTML += '<th>' + 'From :' + '</td>';
                //ReportHTML += '<th>' + $("#txtFromDate").val() + '</td>';
                //ReportHTML += '<th>' + 'To :' + '</td>';
                //ReportHTML += '<th>' + $("#txtToDate").val() + '</td>';

                //ReportHTML += '<th>' + 'SubAccount Name :' + '</td>';
                //ReportHTML += '<th>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</td>';
                //ReportHTML += '';
                //ReportHTML += '</tr>';



                //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                //ReportHTML += '<tr></tr>';
                ReportHTML += '             </table>';
            }

        }
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        // $("#Reportbody").tblToExcel("Account Ledger");

        var filename = "Sub Account Ledger By Currency" + pFormattedTodaysDate + ' ' + pFormattedPrintTime;

        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: filename//do not include extension
        });
    }
    else {

        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrSubAccountIDList.length; j++) {
                debugger;
                var CurrentRows = pTblRowsByCurrency.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
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
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
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
                var CurrentRows = pTblRowsByCurrency.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j] && (x.SubAccountName != "" || x.Opening_Balance != 0));
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
                    ReportHTML += '             <table id="tblstatementofprincipal' + ArrSubAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblstatementofprincipal" + ArrSubAccountIDList[j]).html();
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
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}
