
function TrialBalance_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}

function TrialBalance_cbCheckAllCostCenterChanged() {
    debugger;
    if ($("#cbCheckAllCostCenter").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}

function TrialBalance_cbCheckAllBranchChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}

function TrialBalance_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}

function TrialBalance_ReportType_Changed() {
    debugger;
    if ($("#cbIsByCostCenter").prop("checked")) {
        $("#secCostCenter").removeClass("hide");
        $("#divCbCostCenter").removeClass("hide");
    }
    else {
        $("#secCostCenter").addClass("hide");
        $("#divCbCostCenter").addClass("hide");
    }



    if ($("#cbIsByCostCenter").prop("checked") || $("#cbIsNetBalance").prop("checked")) {
        $("#lblLevelOne").addClass("hide");
    }
    else {
        $("#lblLevelOne").removeClass("hide");
    }
}
function TrialBalance_Print(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");

    if (pBranche_IDs == "")
        pBranche_IDs = "-1";

    if (pAccountIDList == "")
        swal("Sorry", "Please, select at least one account.");
    else if ($("#cbIsByCostCenter").prop("checked") && pCostCenterIDList == "")
        swal("Sorry", "Please, select at least one cost center.");
    else if ($("#cbIsByCurrency").prop("checked") && $("#slCurrency").val() == "")
        swal("Sorry", "Please, select Currency.");
    else {
        FadePageCover(true);
        if ($("#cbCheckAllAccounts").prop("checked") && $("#slAccountsGroups").val() =="0")
            pAccountIDList = "-1";

        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pCostCenter_IDs: $("#cbIsByCostCenter").prop("checked") ? $("#cbCheckAllCostCenters").prop("checked") ? "-1" : pCostCenterIDList : "0"
            , pPostStatus: $("#slStatus").val()
            , pAccLevel: $("#slAccountLevel").val()
            , pBranche_IDs: pBranche_IDs
            , pCurrency: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
            , pisCheck: $("#cbIsByCurrency").prop("checked") ? 1 : 2
            , pWithSubAccount: $("#cbWithSubAccount").prop("checked") ? true : false
            //, pAccLevel: $("#cbLevelOne").prop("checked") ? "1" : "0"
        };
        CallGETFunctionWithParameters("/api/TrialBalance/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#cbWithSubAccount").prop("checked"))
                    TrialBalance_Draw_FinalBalanceWithSubAccount(pData, pOutputTo);
                else if ($("#cbIsFinalBalance").prop("checked"))
                    TrialBalance_Draw_FinalBalance(pData, pOutputTo);
                else if ($("#cbIsNetBalance").prop("checked"))
                    TrialBalance_Draw_NetBalance(pData, pOutputTo);
                else if ($("#cbIsByCostCenter").prop("checked"))
                    TrialBalance_Draw_ByCostCenter(pData, pOutputTo);
                else if ($("#cbIsTotal").prop("checked"))
                    TrialBalance_Draw_Total(pData, pOutputTo);
                else if ($("#cbIsDetailed").prop("checked"))
                    TrialBalance_Draw_DetailedBalance(pData, pOutputTo)
                else if ($("#cbIsByCurrency").prop("checked"))
                    TrialBalance_Draw_FinalBalanceByCurrency(pData, pOutputTo);
            }
            , null);
    }
}
function TrialBalance_Draw_FinalBalanceByCurrency(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var WithoutMainAccount = $("#cbWithoutMainAccount").prop("checked");
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = "";
    pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
    pTableHTML += ' <thead class="" style="">'
    if (pOutputTo != "Excel") {
        pTableHTML += ' <tr class="" style="">';
        pTableHTML += ' <th class="" rowspan=2>' + 'Account Number' + '</th>';
        pTableHTML += ' <th class="" rowspan=2>' + 'Account Name' + '</th>';
        pTableHTML += ' <th class="" colspan=2>' + 'Opening Balance' + '</th>';
        pTableHTML += ' <th class="" colspan=2>' + 'Transactions' + '</th>';
        pTableHTML += ' <th class="" colspan=2>' + 'Closed Balance' + '</th>';
        pTableHTML += ' </tr>'
        pTableHTML += ' <tr class="" style="">';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
    }
    else { //Excel
        pTableHTML += ' <tr class="" style="">';
        pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
        pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Credit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Credit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Debit' + '</th>';
        pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Credit' + '</th>';
    }
    pTableHTML += ' </tr>';
    pTableHTML += ' </thead>';
    pTableHTML += ' <tbody>';
    if (pTrialBalance != null)
        $.each(pTrialBalance, function (i, item) {
            if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                if (WithoutMainAccount && item.IsMain && pOutputTo == "Excel") { }
                else {
                    pTableHTML += ' <tr class="' + (WithoutMainAccount && item.IsMain ? ' hide ' : '') + '" style="font-size:95%;">';
                    pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Number.toString() + ' ' + '</td>';
                    pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classOpenDebit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? item.OpenningDbt - item.OpenningCrdt : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classOpenCredit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? item.OpenningCrdt - item.OpenningDbt : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.IsMain == 0 ? 'classTransactionDebit' : '') + '" style="' + financialAlign + '">' + item.TotalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.IsMain == 0 ? 'classTransactionCredit' : '') + '" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classClosedDebit' : '') + '" style="' + financialAlign + '">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classClosedCredit' : '') + '" style="' + financialAlign + '">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines are not shown in Excel coz col header count is less that their order
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            }
        });
    pTableHTML += ' </tbody>';
    pTableHTML += ' </table>';
    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
    var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
    var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
    var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
    var fTotalCloseBalDbt = GetColumnSum("tblTrialBalance", "classClosedDebit");
    var fTotalCloseBalCrdt = GetColumnSum("tblTrialBalance", "classClosedCredit");
    pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += ' <td style="text-align:center;" class=""></td>';
    pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCloseBalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCloseBalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += ' </tr>';
    $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += ' <body style="background-color:white;">';
        ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
        ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Final)</u></b>' + '</div>';
        ReportHTML += ' <div class="col-xs-2"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += ' <div class="col-xs-2"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += ' <div class="col-xs-2"><b>' + 'Currency : ' + '</b>' + $("#slCurrency").find('option:selected').text().trim() + '</div>'
        ReportHTML += ' <div class="col-xs-4"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += ' <div class="col-xs-3"><b>' + 'Printed By : ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
        ReportHTML += ' ' + $("#tblTrialBalance").html();
        ReportHTML += ' </table>';
        //ReportHTML += ' <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records : ' + '</b>' + pTrialBalance.length + '</div>';
        ReportHTML += ' </body>';
        //ReportHTML += ' <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += ' <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += ' </footer>';
        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}
//not used(i left it just to make it easy if requested)
function TrialBalance_Draw_Detailed(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += '             <table id="tblTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        /*********************************Table & Excel Headers****************************/
        pTableHTML += '                 <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="" rowspan=2>' + 'Account' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'Opening Balance' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'Transactions' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'Closed Balance' + '</th>';
            pTableHTML += '                 </tr>'
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
        }
        else { //Excel Header
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="">' + 'Account' + '</th>';
            pTableHTML += '                     <th class="">' + 'Opening Balance Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Opening Balance Credit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Transactions Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Transactions Credit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Closed Balance Debit' + '</th>';
            pTableHTML += '                     <th class="">' + 'Closed Balance Credit' + '</th>';
        }
        pTableHTML += '                 </tr>';
        pTableHTML += '                 </thead>';
        /******************************EOF Table & Excel Headers****************************/
        pTableHTML += '                 <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {


                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    //pTableHTML += '                     <td class="OpenningDbt hide" style="text-align:left;">' + item.OpenningDbt + '</td>'; TotalCrdt
                    //pTableHTML += '                     <td class="OpenningDbt hide" style="text-align:left;">' + item.OpenningDbt + '</td>'; TotalCrdt
                    //  pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                    + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                    + '<span><br>'
                    + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name
                    + '</span>'
                    + '</td></a> ';
                    pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt > item.OpenningCrdt ? item.OpenningDbt - item.OpenningCrdt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + (item.OpenningDbt < item.OpenningCrdt ? item.OpenningCrdt - item.OpenningDbt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines to sum totals
                    if (pOutputTo != "Excel") { //hide in Excel
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    }
                    pTableHTML += '                 </tr>';
                }
            });

        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                         </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    else {
        pTableHTML += '             <table id="tblTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        /*********************************Table & Excel Headers****************************/
        pTableHTML += '                 <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="" rowspan=2>' + 'الحساب' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'الحركات' + '</th>';
            pTableHTML += '                     <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
            pTableHTML += '                 </tr>'
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
            pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
            pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
            pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
        }
        else { //Excel Header
            pTableHTML += '                 <tr class="" style="">';
            pTableHTML += '                     <th class="">' + 'الحساب' + '</th>';
            pTableHTML += '                     <th class="">' + 'الرصيد الإفتتاحي(مدين)' + '</th>';
            pTableHTML += '                     <th class="">' + 'الرصيد الإفتتاحي(دائن)' + '</th>';
            pTableHTML += '                     <th class="">' + 'الحركات(مدين)' + '</th>';
            pTableHTML += '                     <th class="">' + 'الحركات(دائن)' + '</th>';
            pTableHTML += '                     <th class="">' + 'الرصيد الختامي(مدين)' + '</th>';
            pTableHTML += '                     <th class="">' + 'الرصيد الختامي(دائن)' + '</th>';
        }
        pTableHTML += '                 </tr>';
        pTableHTML += '                 </thead>';
        /******************************EOF Table & Excel Headers****************************/
        pTableHTML += '                 <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {


                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    //pTableHTML += '                     <td class="OpenningDbt hide" style="text-align:left;">' + item.OpenningDbt + '</td>'; TotalCrdt
                    //pTableHTML += '                     <td class="OpenningDbt hide" style="text-align:left;">' + item.OpenningDbt + '</td>'; TotalCrdt
                    //  pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                    + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event'  + ');" >'
                    + '<span><br>'
                    + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name
                    + '</span>'
                    + '</td></a> ';
                    pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt > item.OpenningCrdt ? item.OpenningDbt - item.OpenningCrdt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + (item.OpenningDbt < item.OpenningCrdt ? item.OpenningCrdt - item.OpenningDbt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines to sum totals
                    if (pOutputTo != "Excel") { //hide in Excel
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(دائن)' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(مدين)' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'الإجمالي(دائن)' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                        pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'الإجمالي(مدين)' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    }
                    pTableHTML += '                 </tr>';
                }
            });

        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                         </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += "   <div id='hExportedTable' class='hide'></div>";
            ReportHTML += '     <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';

            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblTrialBalance").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

            ReportHTML += '         </body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';

            ReportHTML += '     <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';

            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة</u></b>' + '</div>';
            ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             </div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblTrialBalance").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

            ReportHTML += '         </body>';
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
function TrialBalance_Draw_FinalBalance(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = " ";

    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Closed Balance' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Credit' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Number || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Name || '') + '</span></td>';
                    }

                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classOpenDebit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classOpenCredit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classTransactionDebit' : '') + '" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classTransactionCredit' : '') + '" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classClosedDebit' : '') + '" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == -1 ? 'classClosedCredit' : '') + '" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    if (item.AccLevel == 1) {
                        pTableHTML += ' <td class="classOpenDebit hide" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.0000000000') + '</td>';
                        pTableHTML += ' <td class="classOpenCredit hide" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.0000000000') + '</td>';
                        pTableHTML += ' <td class="classTransactionDebit hide" style="' + financialAlign + '">' + item.TotalDbt.toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classTransactionCredit hide" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classClosedDebit hide" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.0000000000') + '</td>';
                        pTableHTML += ' <td class="classClosedCredit hide" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.0000000000') + '</td>';
                    }
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalClosedBalDbt = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fTotalClosedBalCrdt = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    } else {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي (مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي (دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي (مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي (دائن)' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Number || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Name || '') + '</span></td>';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي دائن' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي مدين' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'إجمالي الدائن' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'إجمالي المدين' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalClosedBalDbt = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fTotalClosedBalCrdt = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }

    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    } else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Final)</u></b></div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-6 text-right"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        } else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += ' <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (الختامي)</u></b></div>';
            ReportHTML += ' <div dir="rtl" class="col-xs-12">';
            ReportHTML += ' <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة: ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'من: ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' </div>';
            ReportHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}
function TrialBalance_Draw_NetBalance(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = "";

    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Closed Balance' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel Header
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Credit' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    if (item.IsMain == 0) {
                        pTableHTML += ' <tr class="' + (item.IsMain ? ' hide ' : '') + '" style="font-size:95%;">';
                        if (pOutputTo == 'Excel') {
                            pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                            pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                        } else {
                            pTableHTML += ' <td class="" style="text-align:left;">' +
                                '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                                + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                                '<span>' + (item.Account_Number || '') + '</span></td>';
                            pTableHTML += ' <td class="" style="text-align:left;">' +
                                '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                                + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                                '<span>' + (item.Account_Name || '') + '</span></td>';
                        }
                        pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt.toFixed(2) + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt.toFixed(2) + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'CloseTotalDbt' : '') + ' hide" style="text-align:left;">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'CloseTotalCrdt' : '') + ' hide" style="text-align:left;">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' </tr>';
                    }
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalClosedDebit = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fTotalClosedCredit = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    } else {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel Header
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي(دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات (مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات (دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي(دائن)' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    if (item.IsMain == 0) {
                        pTableHTML += ' <tr class="' + (item.IsMain ? ' hide ' : '') + '" style="font-size:95%;">';
                        if (pOutputTo == 'Excel') {
                            pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                            pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                        } else {
                            pTableHTML += ' <td class="" style="text-align:left;">' +
                                '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                                + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                                '<span>' + (item.Account_Number || '') + '</span></td>';
                            pTableHTML += ' <td class="" style="text-align:left;">' +
                                '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                                + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >' +
                                '<span>' + (item.Account_Name || '') + '</span></td>';
                        }
                        pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'الإفتتاحي(دائن)' : '') + ' hide" style="text-align:left;">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'الإفتتاحي(مدين)' : '') + ' hide" style="text-align:left;">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'الإجمالي(دائن)' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt.toFixed(2) + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'الإجمالي(مدين)' : '') + ' hide" style="text-align:left;">' + item.TotalDbt.toFixed(2) + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'إجمالي الختامي(مدين)' : '') + ' hide" style="text-align:left;">' + ((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' <td class="' + (1 == 1 ? 'إجمالي الختامي(دائن)' : '') + ' hide" style="text-align:left;">' + ((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2) : '0.00') + '</td>';
                        pTableHTML += ' </tr>';
                    }
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalClosedDebit = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fTotalClosedCredit = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }

    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    } else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Net)</u></b></div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-6 text-right"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        } else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += ' <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (الصافي)</u></b></div>';
            ReportHTML += ' <div dir="rtl" class="col-xs-12">';
            ReportHTML += ' <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة: ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'من: ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' </div>';
            ReportHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}
function TrialBalance_Draw_ByCostCenter(pData, pOutputTo) {
    debugger;
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();

    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTotalOpenDebit_AllTables = 0;
    var pTotalOpenCredit_AllTables = 0;
    var pTotalTransactionDebit_AllTables = 0;
    var pTotalTransactionCredit_AllTables = 0;
    var pTotalClosedDebit_AllTables = 0;
    var pTotalClosedCredit_AllTables = 0;

    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            pTableHTML += '             <table id="tblTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            if (pOutputTo != "Excel") {
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="" rowspan=2>' + 'Account' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'Opening Balance' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'Transactions' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'Closed Balance' + '</th>';
                pTableHTML += '                 </tr>'
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Credit' + '</th>';
            }
            else { //Excel
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="">' + 'Account' + '</th>';
                pTableHTML += '                     <th class="">' + 'Opening Balance Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Opening Balance Credit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Transactions Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Transactions Credit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Closed Balance Debit' + '</th>';
                pTableHTML += '                     <th class="">' + 'Closed Balance Credit' + '</th>';
            }
            pTableHTML += '                 </tr>';
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pTrialBalance != null)
                $.each(pTrialBalance, function (i, item) {
                    if (item.CostCenter_ID == ArrCostCenterIDList[j]) {



                        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            //pTableHTML += '                     <td style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ////the next lines are not shown in Excel coz col header count is less that their order
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                            pTableHTML += '                 </tr>';
                        }
                    } //of if (item.CostCenter_ID == ArrCostCenterIDList[j])
                });

            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';
        } //of for (var j = 0; j < ArrCostCenterIDList.length; j++)
        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            var pTotalOpenDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classOpenDebit");
            var pTotalOpenCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classOpenCredit");
            var pTotalTransactionDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classTransactionDebit");
            var pTotalTransactionCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classTransactionCredit");
            var pTotalClosedDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classClosedDebit");
            var pTotalClosedCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classClosedCredit");

            var pRowTotalsHTML = "";
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                         </tr>';
            //$("#tblTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
            pTotalOpenDebit_AllTables += pTotalOpenDebit;
            pTotalOpenCredit_AllTables += pTotalOpenCredit;
            pTotalTransactionDebit_AllTables += pTotalTransactionDebit;
            pTotalTransactionCredit_AllTables += pTotalTransactionCredit;
            pTotalClosedDebit_AllTables += pTotalClosedDebit;
            pTotalClosedCredit_AllTables += pTotalClosedCredit;
            //Add Total of all tables to the last table (just to the last table)
            if (j + 1 == ArrCostCenterIDList.length) {
                pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                             <td style="text-align:right;" class=""><b>' + '' + '</td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                         </tr>';

                pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                         </tr>';
                $("#tblTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
            }
        } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
    }
        //if language is arabic
    else {
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            pTableHTML += '             <table id="tblTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            if (pOutputTo != "Excel") {
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="" rowspan=2>' + 'الحساب' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'الحركات' + '</th>';
                pTableHTML += '                     <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
                pTableHTML += '                 </tr>'
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
                pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
                pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
                pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
                pTableHTML += '                     <th class="">' + 'مدين' + '</th>';
                pTableHTML += '                     <th class="">' + 'دائن' + '</th>';
            }
            else { //Excel
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="">' + 'الحساب' + '</th>';
                pTableHTML += '                     <th class="">' + 'الرصيد الإفتتاحي(مدين)' + '</th>';
                pTableHTML += '                     <th class="">' + 'الرصيد الإفتتاحي(دائن)' + '</th>';
                pTableHTML += '                     <th class="">' + 'الحركات(مدين)' + '</th>';
                pTableHTML += '                     <th class="">' + 'الحركات(دائن)' + '</th>';
                pTableHTML += '                     <th class="">' + 'الرصيد الختامي(مدين)' + '</th>';
                pTableHTML += '                     <th class="">' + 'الرصيد الختامي(دائن)' + '</th>';
            }
            pTableHTML += '                 </tr>';
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pTrialBalance != null)
                $.each(pTrialBalance, function (i, item) {
                    if (item.CostCenter_ID == ArrCostCenterIDList[j]) {



                        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            //pTableHTML += '                     <td style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            ////the next lines are not shown in Excel coz col header count is less that their order
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                            //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                            pTableHTML += '                 </tr>';
                        }
                    } //of if (item.CostCenter_ID == ArrCostCenterIDList[j])
                });

            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';
        } //of for (var j = 0; j < ArrCostCenterIDList.length; j++)
        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            var pTotalOpenDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classOpenDebit");
            var pTotalOpenCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classOpenCredit");
            var pTotalTransactionDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classTransactionDebit");
            var pTotalTransactionCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classTransactionCredit");
            var pTotalClosedDebit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classClosedDebit");
            var pTotalClosedCredit = GetColumnSum("tblTrialBalance" + ArrCostCenterIDList[j], "classClosedCredit");

            var pRowTotalsHTML = "";
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                         </tr>';
            //$("#tblTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
            pTotalOpenDebit_AllTables += pTotalOpenDebit;
            pTotalOpenCredit_AllTables += pTotalOpenCredit;
            pTotalTransactionDebit_AllTables += pTotalTransactionDebit;
            pTotalTransactionCredit_AllTables += pTotalTransactionCredit;
            pTotalClosedDebit_AllTables += pTotalClosedDebit;
            pTotalClosedCredit_AllTables += pTotalClosedCredit;
            //Add Total of all tables to the last table (just to the last table)
            if (j + 1 == ArrCostCenterIDList.length) {
                pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                             <td style="text-align:right;" class=""><b>' + '' + '</td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
                pRowTotalsHTML += '                         </tr>';

                pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
                pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit_AllTables.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pRowTotalsHTML += '                         </tr>';
                $("#tblTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
            }
        } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
    }
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrCostCenterIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance" + ArrCostCenterIDList[j]);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            //if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (مركز التكلفة)</u></b>' + '</div>';
            ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             </div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'مركز التكلفة : ' + '</b>' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblTrialBalance" + ArrCostCenterIDList[j]).html();
            ReportHTML += '             </table>';
        } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

        ReportHTML += '         </body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
else {
     ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
    ReportHTML += AddScripts;
    ReportHTML += '</head>';
    ReportHTML += '         <body style="background-color:white;">';
    for (var j = 0; j < ArrCostCenterIDList.length; j++) {
        //if (i > 0)
        ReportHTML += '         <div class="break"></div>';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (By Cost Center)</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Cost Center : ' + '</b>' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[j] + "]").siblings().text().trim() + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblTrialBalance" + ArrCostCenterIDList[j]).html();
        ReportHTML += '             </table>';
    } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

    ReportHTML += '         </body>';
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
function TrialBalance_Draw_Total(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
        pTableHTML += ' <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance' + '</th>';
            pTableHTML += ' </tr>'
        }
        else { //Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance' + '</th>';
        }
        pTableHTML += ' </tr>';
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Number + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Number
                            + '</span>'
                            + '</td></a> ';
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Name
                            + '</span>'
                            + '</td></a> ';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + (item.TotalDbt - item.TotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + (((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines are not shown in Excel coz col header count is less that their order
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (fTotalOpenBalDbt - fTotalOpenBalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (fTotalDbt - fTotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + ((parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)) - (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    else {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
        pTableHTML += ' <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي' + '</th>';
            pTableHTML += ' </tr>'
        }
        else { //Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي' + '</th>';
        }
        pTableHTML += ' </tr>';
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Number + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Number
                            + '</span>'
                            + '</td></a> ';
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Name
                            + '</span>'
                            + '</td></a> ';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + (item.TotalDbt - item.TotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + (((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines are not shown in Excel coz col header count is less that their order
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(دائن)' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(مدين)' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإجمالي(دائن)' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإجمالي(مدين)' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (fTotalOpenBalDbt - fTotalOpenBalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (fTotalDbt - fTotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + ((parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)) - (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += " <div id='hExportedTable' class='hide'></div>";
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Total)</u></b>' + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += ' <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += ' <div class="col-xs-6 text-right"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += ' <div class="col-xs-3"><b>' + 'Printed By : ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            //ReportHTML += ' <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records : ' + '</b>' + pTrialBalance.length + '</div>';
            ReportHTML += ' </body>';
            //ReportHTML += ' <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += ' <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += ' </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += ' <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (الإجمالي)</u></b>' + '</div>';
            ReportHTML += ' <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += ' <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة: ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'من: ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' </div>';
            //ReportHTML += ' <div class="col-xs-3"><b>' + 'Printed By : ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            //ReportHTML += ' <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records : ' + '</b>' + pTrialBalance.length + '</div>';
            ReportHTML += ' </body>';
            //ReportHTML += ' <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += ' <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += ' </footer>';
            ReportHTML += '</html>';
        }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}
function TrialBalance_Draw_DetailedBalance(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
        pTableHTML += ' <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Closed Balance' + '</th>';
            pTableHTML += ' </tr>'
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
        }
        else { //Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Credit' + '</th>';
        }
        pTableHTML += ' </tr>';
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Number + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Number
                            + '</span>'
                            + '</td></a> ';
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Name
                            + '</span>'
                            + '</td></a> ';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + (item.TotalDbt + item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + (item.TotalCrdt + item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines are not shown in Excel coz col header count is less that their order
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    else {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
        pTableHTML += ' <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
            pTableHTML += ' </tr>'
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
        }
        else { //Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي(دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي(دائن)' + '</th>';
        }
        pTableHTML += ' </tr>';
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null)
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Number + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Number
                            + '</span>'
                            + '</td></a> ';
                        pTableHTML += ' <td class="" style="text-align:left;">'
                            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name + "'" + ', event' + ');" >'
                            + '<span><br>'
                            + item.Account_Name
                            + '</span>'
                            + '</td></a> ';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + (item.TotalDbt + item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + (item.TotalCrdt + item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    //the next lines are not shown in Excel coz col header count is less that their order
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(دائن)' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإفتتاحي(مدين)' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإجمالي(دائن)' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'الإجمالي(مدين)' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "TotalCrdt");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "OpenningCrdt");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "TotalDbt");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "OpenningDbt");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';

        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += " <div id='hExportedTable' class='hide'></div>";
            ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Detailed)</u></b>' + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += ' <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += ' <div class="col-xs-6 text-right"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += ' <div class="col-xs-3"><b>' + 'Printed By : ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            //ReportHTML += ' <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records : ' + '</b>' + pTrialBalance.length + '</div>';
            ReportHTML += ' </body>';
            //ReportHTML += ' <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += ' <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += ' </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += " <div id='hExportedTable' class='hide'></div>";
            ReportHTML += ' <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (التفصيلي)</u></b>' + '</div>';
            ReportHTML += ' <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += ' <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة: ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'من: ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' </div>';
            //ReportHTML += ' <div class="col-xs-3"><b>' + 'Printed By : ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">'; //style="border:solid #000 !Important;"
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            //ReportHTML += ' <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records : ' + '</b>' + pTrialBalance.length + '</div>';
            ReportHTML += ' </body>';
            //ReportHTML += ' <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += ' <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += ' </footer>';
            ReportHTML += '</html>';
        }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}

function TrialBalance_Draw_FinalBalanceWithSubAccount(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");
    var isAlignChecked = $("#cbAlign").prop("checked");
    var financialAlign = isAlignChecked ? "text-align:right;" : "text-align:center;";
    var pTableHTML = " ";

    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Sub Account Number' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'Sub Account Name' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Opening Balance' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Transactions' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'Closed Balance' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Credit' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Account Name' + '</th>';
            pTableHTML += ' <th class="">' + 'Sub Account Number' + '</th>';
            pTableHTML += ' <th class="">' + 'Sub Account Name' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Opening Balance Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Transactions Credit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Debit' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'Closed Balance Credit' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.SubAccount_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.SubAccount_Name || '') + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + (item.Account_Number + ' - ' + item.Account_Name) + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Number || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + (item.Account_Number + ' - ' + item.Account_Name) + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Name || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            (item.SubAccount_ID == 0 ? '' : (item.SubAccount_Number || '')) + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            (item.SubAccount_ID == 0 ? '' : (item.SubAccount_Name || '')) + '</td>';
                    }
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classOpenDebit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classOpenCredit' : '') + '" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classTransactionDebit' : '') + '" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classTransactionCredit' : '') + '" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classClosedDebit' : '') + '" style="' + financialAlign + '">' + (((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'classClosedCredit' : '') + '" style="' + financialAlign + '">' + (((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fClosedDebit = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fClosedCredit = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Sub Account Number
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Sub Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    } else {
        pTableHTML += ' <table id="tblTrialBalance" class="table table-striped text-sm table-bordered" style="">';
        pTableHTML += ' <thead class="" style="">';
        if (pOutputTo != "Excel") {
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" rowspan=2>' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'رقم الحساب الفرعي' + '</th>';
            pTableHTML += ' <th class="" rowspan=2>' + 'اسم الحساب الفرعي' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الإفتتاحي' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الحركات' + '</th>';
            pTableHTML += ' <th class="" colspan=2>' + 'الرصيد الختامي' + '</th>';
            pTableHTML += ' </tr>';
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'مدين' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'دائن' + '</th>';
            pTableHTML += ' </tr>';
        } else { // Excel
            pTableHTML += ' <tr class="" style="">';
            pTableHTML += ' <th class="">' + 'رقم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب' + '</th>';
            pTableHTML += ' <th class="">' + 'رقم الحساب الفرعي' + '</th>';
            pTableHTML += ' <th class="">' + 'اسم الحساب الفرعي' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي (مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الإفتتاحي (دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الحركات(دائن)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي (مدين)' + '</th>';
            pTableHTML += ' <th class="" style="' + financialAlign + '">' + 'الرصيد الختامي (دائن)' + '</th>';
            pTableHTML += ' </tr>';
        }
        pTableHTML += ' </thead>';
        pTableHTML += ' <tbody>';
        if (pTrialBalance != null) {
            $.each(pTrialBalance, function (i, item) {
                if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0) == false) {
                    pTableHTML += ' <tr class="" style="font-size:95%;">';
                    if (pOutputTo == 'Excel') {
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.Account_Name || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.SubAccount_Number || '') + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' + (item.SubAccount_Name || '') + '</td>';
                    } else {
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + (item.Account_Number + ' - ' + item.Account_Name) + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Number || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + (item.Account_Number + ' - ' + item.Account_Name) + "'" + ', event' + ');" >' +
                            '<span>' + (item.Account_Name || '') + '</span></td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            (item.SubAccount_ID == 0 ? '' : (item.SubAccount_Number || '')) + '</td>';
                        pTableHTML += ' <td class="" style="text-align:left;">' +
                            (item.SubAccount_ID == 0 ? '' : (item.SubAccount_Name || '')) + '</td>';
                    }
                    pTableHTML += ' <td class="classOpenDebit" style="' + financialAlign + '">' + (item.OpenningDbt > item.OpenningCrdt ? (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classOpenCredit" style="' + financialAlign + '">' + (item.OpenningDbt < item.OpenningCrdt ? (item.OpenningCrdt - item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classTransactionDebit" style="' + financialAlign + '">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classTransactionCredit" style="' + financialAlign + '">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += ' <td class="classClosedDebit" style="' + financialAlign + '">' + (((item.TotalCrdt + item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="classClosedCredit" style="' + financialAlign + '">' + (((item.TotalCrdt + item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.00') + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 && item.SubAccount_ID == 0 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 && item.SubAccount_ID == 0 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 && item.SubAccount_ID == 0 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    pTableHTML += ' <td class="' + (item.AccLevel == 1 && item.SubAccount_ID == 0 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += ' </tr>';
                }
            });
        }
        pTableHTML += ' </tbody>';
        pTableHTML += ' </table>';
        $("#hExportedTable").html(pTableHTML);
        debugger;
        // Totals row
        var pRowTotalsHTML = "";
        var fTotalCrdt = GetColumnSum("tblTrialBalance", "classTransactionCredit");
        var fTotalOpenBalCrdt = GetColumnSum("tblTrialBalance", "classOpenCredit");
        var fTotalDbt = GetColumnSum("tblTrialBalance", "classTransactionDebit");
        var fTotalOpenBalDbt = GetColumnSum("tblTrialBalance", "classOpenDebit");
        var fClosedDebit = GetColumnSum("tblTrialBalance", "classClosedDebit");
        var fClosedCredit = GetColumnSum("tblTrialBalance", "classClosedCredit");
        pRowTotalsHTML += ' <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b></td>';
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Account Name
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Sub Account Number
        pRowTotalsHTML += ' <td style="text-align:right;" class=""></td>'; // Empty Sub Account Name
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fClosedDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' <td style="' + financialAlign + '" class=""><b>' + fClosedCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += ' </tr>';
        $("#tblTrialBalance tbody").append(pRowTotalsHTML);
    }

    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance");
    } else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += " <div id='hExportedTable' class='hide'></div>";
            ReportHTML += ' <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-left"><img style="height: 65px; width: 325px;" src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Trial Balance (Final)</u></b>' + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-6 text-right"><b>' + 'Printed at : ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        } else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += ' <head><title>' + 'ميزان المراجعة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += ' <body style="background-color:white;">';
            ReportHTML += ' <div class="col-xs-12 text-left"><img style="height: 65px; width: 325px;" src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += ' <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة (الختامي)</u></b>' + '</div>';
            ReportHTML += ' <div dir="rtl" class="col-xs-12 " >';
            ReportHTML += ' <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة: ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'إلي: ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += ' <div class="col-xs-3 "><b>' + 'من: ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += ' </div>';
            ReportHTML += ' <table id="tblTrialBalance' + '" class="table table-striped text-sm table-bordered" style="">';
            ReportHTML += ' ' + $("#tblTrialBalance").html();
            ReportHTML += ' </table>';
            ReportHTML += ' </body>';
            ReportHTML += '</html>';
        }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    FadePageCover(false);
}
function FillAccounts() {
    debugger;
    FadePageCover(true);
    var WhereConditions = "Where IsMain=0 " + ($('#slAccountsGroups').val().trim() == "0" ? "" : " and Parent_ID = " + $('#slAccountsGroups').val() + "") + "";
    console.log(WhereConditions)
    CallGETFunctionWithParameters("/api/TrialBalance/FillAccounts"
        , { WhereCondition: WhereConditions }
        , function (pData) {
            var pAccount = pData[0];
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 4/*NameAndCode*/, null);
            FadePageCover(false);
        }
        , null);

}
//function AccountLedger_Print(pOutputTo) {
//    debugger;
//    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
//    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
//    var pJournalTypeIDList = "-1";
//    if (pCostCenterIDList == "")
//        pCostCenterIDList = "-1";
//    if (pAccountIDList == "" || pJournalTypeIDList == "")
//        swal("Sorry", "Please, select at least one account and one journal type.");
//    else if (pCostCenterIDList == "" && $("#cbIsByCostCenter").prop("checked"))
//        swal("Sorry", "Please, select at least one cost center.");
//    else {
//        FadePageCover(true);
//        var pParametersWithValues = {
//            pAccountIDList: pAccountIDList
//            , pCostCenterIDList: pCostCenterIDList
//            , pJournalTypeIDList: pJournalTypeIDList
//            , pFromDate: $("#txtFromDate").val()
//            , pToDate: $("#txtToDate").val()
//            , pPostStatus: $("#slStatus").val()
//            , pIsGroupByCostCenter: $("#cbIsByCostCenter").prop("checked")
//        };
//        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
//            , function (pData) {
//                //otherCompanies
//                if ($("#cbIsByCostCenter").prop("checked"))
//                    AccountLedger_Print_GroupByCC(pData, pOutputTo);
//                else
//                    AccountLedger_Print_Detailed(pData, pOutputTo);
//            }
//            , null);
//    }
//}
//function AccountLedger_Print_Detailed(pData, pOutputTo) {
//    debugger;
//    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
//    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

//    var pDefaultsHeader = JSON.parse(pData[0]);
//    var pAccountLedger = JSON.parse(pData[1]);
//    var pTblRowsGroupByCurrencySum = JSON.parse(pData[2]);

//    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
//    var pFormattedPrintTime = getTime();
//    var ArrAccountIDList = pAccountIDList.split(',');

//    var Suppress = $("#cbSuppressForZeroes").prop("checked");
//    var pTablesHTML = "";
//    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
//    for (var j = 0; j < ArrAccountIDList.length; j++) {
//        var pIsOpenBalanceRowAdded = false;
//        pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
//        pTablesHTML += '                 <thead class="" style="">';
//        pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'JV Type' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Ex.Rate' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
//        pTablesHTML += '                 </thead>';
//        pTablesHTML += '                 <tbody>';
//        //if (pAccountLedger != null)
//        var pPreviousRowFBalance = 0; //final balance Local Cur
//        $.each(pAccountLedger, function (i, item) {
//            if (item.Account_ID == ArrAccountIDList[j]) {
//                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
//                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
//                    if (pOutputTo != "Excel") {
//                        pTablesHTML += '                 <td class="" colspan=' + ( '15') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
//                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
//                    }
//                    else { //Excel
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
//                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
//                    }
//                    pTablesHTML += '             </tr>';
//                    pIsOpenBalanceRowAdded = true;
//                    pPreviousRowFBalance = item.Opening_Balance;
//                }
//                if (item.ID/*JV_ID*/ != 0) { //add normal row
//                    /******************Get final balance************************/
//                    //  debugger;
//                    var Deb = item.Debit;
//                    var Cre = item.Credit;
//                    var fBalD = Deb - Cre;
//                    /******************Get LocalCur final balance************************/
//                    var fBal = item.LocalDebit - item.LocalCredit;
//                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
//                    pPreviousRowFBalance = FBalance; //To be used in the next row
//                    /******************Add the row************************/
//                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code  + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' +  item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
//                    pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
//                    pTablesHTML += '                 </tr>';
//                } //normal rows
//            } //of if (item.Account_ID == ArrAccountIDList[j])
//        });
//        pTablesHTML += '                 </tbody>';
//        pTablesHTML += '             </table>';
//    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

//    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

//    /*********************Append table summaries*************************/
//    debugger;
//    for (var j = 0; j < ArrAccountIDList.length; j++) {
//        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
//        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
//        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
//        var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();
//        var pRowTotalsHTML = "";
//        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
//        if (pOutputTo != "Excel")
//            pRowTotalsHTML += '                                <td class="" colspan="9" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
//        else { //Excel
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'Totals: ' + '</td>';
//        }
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//        if (pOutputTo == "Excel")
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
//            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
//        else
//            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
//                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
//               // 'Posted: ' + pSummaryLocalCurBalance_Posted +
//                '</td>';
//        pRowTotalsHTML += '                            </tr>';
//        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
//    } //for (var j = 0; j < ArrAccountIDList.length; j++)
//}
//else {
//    for (var j = 0; j < ArrAccountIDList.length; j++) {
//        var pIsOpenBalanceRowAdded = false;
//        pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
//        pTablesHTML += '                 <thead class="" style="">';
//        pTablesHTML += '                     <th class="">' + 'رقم القيد' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'تاريخ القيد' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'نوع القيد' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'رقم الإيصال' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'مركز التكلفة' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'معدل التغير' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'الحساب التحليلي' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'الوصف' + '</th>';
//        pTablesHTML += '                     <th class="">' + 'الرصيد' + '</th>';
//        pTablesHTML += '                 </thead>';
//        pTablesHTML += '                 <tbody>';
//        //if (pAccountLedger != null)
//        var pPreviousRowFBalance = 0; //final balance Local Cur
//        $.each(pAccountLedger, function (i, item) {
//            if (item.Account_ID == ArrAccountIDList[j]) {
//                if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
//                    pTablesHTML += '             <tr class="" style="font-size:95%;">';
//                    if (pOutputTo != "Excel") {
//                        pTablesHTML += '                 <td class="" colspan=' + ( '15') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';
//                        pTablesHTML += '                 <td class="" style="text-align:center;">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
//                    }
//                    else { //Excel
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>'
//                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="FBalanceD">' + '' + '</td>';//FBalanceD
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + '' + '</td>';
//                        pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + '' + '</td>';//FBalance
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
//                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Opening_Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';
//                    }
//                    pTablesHTML += '             </tr>';
//                    pIsOpenBalanceRowAdded = true;
//                    pPreviousRowFBalance = item.Opening_Balance;
//                }
//                if (item.ID/*JV_ID*/ != 0) { //add normal row
//                    /******************Get final balance************************/
//                    //  debugger;
//                    var Deb = item.Debit;
//                    var Cre = item.Credit;
//                    var fBalD = Deb - Cre;
//                    /******************Get LocalCur final balance************************/
//                    var fBal = item.LocalDebit - item.LocalCredit;
//                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
//                    pPreviousRowFBalance = FBalance; //To be used in the next row
//                    /******************Add the row************************/
//                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVType_Name + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code  + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' +  item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
//                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
//                    pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
//                    pTablesHTML += '                 </tr>';
//                } //normal rows
//            } //of if (item.Account_ID == ArrAccountIDList[j])
//        });
//        pTablesHTML += '                 </tbody>';
//        pTablesHTML += '             </table>';
//    }//of for (var j = 0; j < ArrAccountIDList.length; j++)

//    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

//    /*********************Append table summaries*************************/
//    debugger;
//    for (var j = 0; j < ArrAccountIDList.length; j++) {
//        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
//        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
//        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
//        var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();
//        var pRowTotalsHTML = "";
//        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
//        if (pOutputTo != "Excel")
//            pRowTotalsHTML += '                                <td class="" colspan="9" style="text-align:center;"><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
//        else { //Excel
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + 'الإجمالي: ' + '</td>';
//        }
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + pTotalLocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
//        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//        if (pOutputTo == "Excel")
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
//        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
//            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
//        else
//            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'الرصيد: ' + pSummaryLocalCurBalance +
//                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
//               // 'Posted: ' + pSummaryLocalCurBalance_Posted +
//                '</td>';
//        pRowTotalsHTML += '                            </tr>';
//        $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
//    } //for (var j = 0; j < ArrAccountIDList.length; j++)
//}
//    if (pOutputTo == "Excel") {
//        for (var j = 0; j < ArrAccountIDList.length; j++) {
//            var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
//            if (!Suppress || CurrentRows.length > 0) {
//                //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);

//                var ReportHTML = '';
//                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
//                ReportHTML += '<html>';

//                ReportHTML += '     <head><title>' + 'Account Ledger' + '</title></head>';
//                ReportHTML += '         <body">';
//                ReportHTML += '         <div id="ReportBody">';

//                ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                ReportHTML += '                         <tbody>';
//                ReportHTML += '             <tr class="">';
//                ReportHTML += '                  <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</td>';
//                ReportHTML += '                 <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</td>';
//                ReportHTML += '                  <td class="col-xs-7 " ><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</td>';
//                ReportHTML += '             </tr>';
//                ReportHTML += '                         </tbody>';
//                ReportHTML += '                     </table>';


//                for (var j = 0; j < ArrAccountIDList.length; j++) {
//                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
//                    if (!Suppress || CurrentRows.length > 0) {
//                        ReportHTML += '         <div class="break"></div>';
//                        ReportHTML += '                     <table id="tblHeader' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '                         <tbody>';
//                        if (j > 0) {
//                            ReportHTML += '             </tr>';
//                            ReportHTML += '             <tr class="">';
//                            ReportHTML += '             </tr>';
//                            ReportHTML += '             <tr class="">';
//                            ReportHTML += '             </tr>';
//                        }
//                        ReportHTML += '             <tr class="">';

//                        ReportHTML += '             <tr class="">';
//                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4> </td>';
//                        ReportHTML += '             </tr>';
//                        ReportHTML += '                         </tbody>';
//                        ReportHTML += '                     </table>';

//                        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
//                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
//                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
//                        //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
//                        // ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
//                        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
//                        //ReportHTML += pTablesHTML; //Add table html in the next lines
//                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
//                        ReportHTML += '             </table>';
//                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
//                        /*****************************Creating table tblSumCurrencyByCC****************************************/
//                        ReportHTML += '             <div class="col-xs-12"></div>';
//                        // ReportHTML += '                 <div class="col-xs-4">';   
//                        ReportHTML += '                 <div class="col-xs-12">';
//                        ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '                         <tbody>';
//                        $.each(pTblRowsGroupByCurrencySum, function (i, item) {
//                            if (ArrAccountIDList[j] == item.Account_ID) {
//                                ReportHTML += '             <tr class="">';
//                                ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
//                                ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
//                                ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
//                                ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
//                                ReportHTML += '             </tr>';
//                            }
//                        });
//                        ReportHTML += '                         </tbody>';
//                        ReportHTML += '                     </table>';
//                        ReportHTML += '                 </div>';
//                    }
//                    ReportHTML += '         <div class="break"></div>';
//                    ReportHTML += '         <div class="break"></div>';
//                    ReportHTML += '         <div class="break"></div>';
//                } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
//                ReportHTML += '         </div>';
//                ReportHTML += '         <body>';
//                ReportHTML += '</html>';
//            }
//            else {
//                    ReportHTML += '<html dir="rtl">';

//                ReportHTML += '     <head><title>' + 'حساب الأستاذ' + '</title></head>';
//                ReportHTML += '         <body">';
//                ReportHTML += '         <div id="ReportBody">';

//                ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                ReportHTML += '                         <tbody>';
//                ReportHTML += '             <tr class="">';
//                ReportHTML += '                  <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'من : ' + '</b>' + $("#txtFromDate").val() + '</td>';
//                ReportHTML += '                 <td class="col-xs-3"style="border: 1px solid black;" ><b>' + 'إلي : ' + '</b>' + $("#txtToDate").val() + '</td>';
//                ReportHTML += '                  <td class="col-xs-7 " ><b>' + 'تمت الطباعة :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</td>';
//                ReportHTML += '             </tr>';
//                ReportHTML += '                         </tbody>';
//                ReportHTML += '                     </table>';


//                for (var j = 0; j < ArrAccountIDList.length; j++) {
//                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
//                    if (!Suppress || CurrentRows.length > 0) {
//                        ReportHTML += '         <div class="break"></div>';
//                        ReportHTML += '                     <table id="tblHeader' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '                         <tbody>';
//                        if (j > 0) {
//                            ReportHTML += '             </tr>';
//                            ReportHTML += '             <tr class="">';
//                            ReportHTML += '             </tr>';
//                            ReportHTML += '             <tr class="">';
//                            ReportHTML += '             </tr>';
//                        }
//                        ReportHTML += '             <tr class="">';

//                        ReportHTML += '             <tr class="">';
//                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + 'الحساب : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4> </td>';
//                        ReportHTML += '             </tr>';
//                        ReportHTML += '                         </tbody>';
//                        ReportHTML += '                     </table>';

//                        //ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
//                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
//                        //ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
//                        //ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
//                        // ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
//                        //ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
//                        //ReportHTML += pTablesHTML; //Add table html in the next lines
//                        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
//                        ReportHTML += '             </table>';
//                        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
//                        /*****************************Creating table tblSumCurrencyByCC****************************************/
//                        ReportHTML += '             <div class="col-xs-12"></div>';
//                        // ReportHTML += '                 <div class="col-xs-4">';   
//                        ReportHTML += '                 <div class="col-xs-12">';
//                        ReportHTML += '                     <table id="tblSumCurrency' + ArrAccountIDList[j] + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
//                        ReportHTML += '                         <tbody>';
//                        $.each(pTblRowsGroupByCurrencySum, function (i, item) {
//                            if (ArrAccountIDList[j] == item.Account_ID) {
//                                ReportHTML += '             <tr class="">';
//                                ReportHTML += '                  <td class="col-xs-2"style="border: 1px solid black;" >' + item.FinalBalance + '</td>';
//                                ReportHTML += '                  <td class="col-xs-2" style="border: 1px solid black;">' + item.Currency_Code + '</td>';
//                                ReportHTML += '                  <td class="col-xs-4 " >' + '</td>';
//                                ReportHTML += '                  <td class="col-xs-4 ">' + '</td>';
//                                ReportHTML += '             </tr>';
//                            }
//                        });
//                        ReportHTML += '                         </tbody>';
//                        ReportHTML += '                     </table>';
//                        ReportHTML += '                 </div>';
//                    }
//                    ReportHTML += '         <div class="break"></div>';
//                    ReportHTML += '         <div class="break"></div>';
//                    ReportHTML += '         <div class="break"></div>';
//                } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
//                ReportHTML += '         </div>';
//                ReportHTML += '         <body>';
//                ReportHTML += '</html>';
//            }
//                $("#hExportedTable").html(ReportHTML);

//                var $table = $("#ReportBody");
//                $table.table2excel({
//                    exclude: ".noExl",
//                    name: "sheet",
//                    filename: "TrialBalance" + ".xls", // do include extension
//                    preserveColors: false // set to true if you want background colors and font colors preserved
//                });
//            }
//        }
//    }


//    FadePageCover(false);
//}
function AccountLedger_Excel(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = "-1";
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
            , pCostCenterIDList: pCostCenterIDList
            , pJournalTypeIDList: pJournalTypeIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pPostStatus: $("#slStatus").val()
            , pIsGroupByCostCenter: false
        };
        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
            , function (pData) {
                //otherCompanies
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
    else {
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
                    ReportHTML += '         </body>';
                    ReportHTML += '</html>';
                }
                else {
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
                    ReportHTML += '         </body>';
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

function PrintVoucherAndInvoice(ID, type) {
    debugger
    if (type == 1) {
        Invoices_Print(ID, 3, 'Print', 0);
    }
    else if (type == 2) {
        Voucher_Print(ID);
    }
}
var AddScripts = '';
AddScripts += '<script src="/Scripts/ReceiptsAndPayments/Transactions/CashVoucher.js"></script>';
AddScripts += '<script src="/Scripts/ReceiptsAndPayments/Transactions/ChequeVoucher.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/AccountLedger.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Transactions/JournalVouchers.js"></script>';


AddScripts += '<link rel="stylesheet" href="/Content/CSS/datepicker.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Content/CSS/jquery.contextMenu.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Content/CSS/sweet-alert.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Scripts/nestable/nestable.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Scripts/fuelux/fuelux.css" type="text/css">';
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.scrollTo.min.js" type="text/javascript"></script>';
AddScripts += '<link rel="stylesheet" href="/Scripts/utilities/TextSearch/select2.css" type="text/css">';
AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/TrialBalance.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/SubReportFunction.js"></script>';
