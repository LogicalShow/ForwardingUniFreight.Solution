function SubAccountTrialBalance_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
    else
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
}
function SubAccountTrialBalance_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}

function SubAccountTrialBalance_cbCheckAllCostCenterChanged() {
    debugger;
    if ($("#cbCheckAllCostCenter").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}

function SubAccountTrialBalance_cbCheckAllBranchChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}
function SubAccountTrialBalance_slSubAccountGroupChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SubAccountTrialBalance/SubAccountGroupChanged"
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
function SubAccountTrialBalance_ReportType_Changed() {
    debugger;
    //if ($("#cbIsByCostCenter").prop("checked"))
    //    $("#secCostCenter").removeClass("hide");
    //else
    //    $("#secCostCenter").addClass("hide");
}
function SubAccountTrialBalance_Print(pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");

    if (pBranche_IDs == "")
        pBranche_IDs = "-1";

    if (pSubAccountIDList == "")
        swal("Sorry", "Please, select at least one sub-account.");
    else if ($("#cbIsByCostCenter").prop("checked") && pCostCenterIDList == "")
        swal("Sorry", "Please, select at least one cost center.");
    else if ($("#cbIsByCurrency").prop("checked") && $("#slCurrency").val() == "")
        swal("Sorry", "Please, select Currency.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pSubAccountIDList: pSubAccountIDList
            , pAccountIDList: ($("#slSubAccountGroup").val() == 0 || pAccountIDList == "") ? "-1" : pAccountIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pPostStatus: $("#slStatus").val()
            , pBranche_IDs: pBranche_IDs
            , pCostCenter_IDs: $("#cbIsByCostCenter").prop("checked") ? $("#cbCheckAllCostCenters").prop("checked") ? "-1" : pCostCenterIDList : "0"
            , pCurrency: $("#slCurrency").val()
            , pcheck: $("#cbIsByCurrency").prop("checked") ? 0 : 1
        };
        CallPOSTFunctionWithParameters("/api/SubAccountTrialBalance/GetPrintedData", pParametersWithValues
            , function (pData) {
                 if ($("#cbIsNetBalance").prop("checked"))
                    SubAccountTrialBalance_Draw_NetBalance(pData, pOutputTo);
                else if ($("#cbIsTotal").prop("checked"))
                    SubAccountTrialBalance_Draw_Total(pData, pOutputTo);
                else if ($("#cbIsDetailed").prop("checked"))
                    SubAccountTrialBalance_Draw_Detailed(pData, pOutputTo)
                else if ($("#cbIsByCostCenter").prop("checked"))
                    SubAccountTrialBalance_Draw_ByCostCenter(pData, pOutputTo);
                else if ($("#cbIsByCurrency").prop("checked"))
                    SubAccountTrialBalance_Draw_DetailedByCurrency(pData, pOutputTo)
            }
            , null);
    }
}
function SubAccountTrialBalance_Draw_DetailedByCurrency(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pSubAccountTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

    var pTableHTML = "";
    pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
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
    if (pSubAccountTrialBalance != null)
        $.each(pSubAccountTrialBalance, function (i, item) {
            if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
                pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (item.TotalDbt + item.OpenningDbt).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (item.TotalCrdt + item.OpenningCrdt).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
        });

    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
    var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
    var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
    var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
    pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                         </tr>';
    $("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);

    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountTrialBalance");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub-Account Trial Balance (Detailed)</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-2"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-2"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-2"><b>' + 'Currency : ' + '</b>' + $("#slCurrency").find('option:selected').text().trim() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //   ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : +"   " + $("#slCurrency").find('option:selected').text().trim() + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

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

//not used(i left it just to make it easy if requested)
function SubAccountTrialBalance_Draw_Total(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pSubAccountTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    if (pOutputTo != "Excel") {
        pTableHTML += '                 <tr class="" style="">';
        pTableHTML += '                     <th class="" >' + 'Sub Account' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Opening Balance' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Transactions' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Closed Balance' + '</th>';
        pTableHTML += '                 </tr>'
    }
    else { //Excel
        pTableHTML += '                 <tr class="" style="">';
        pTableHTML += '                     <th class="" >' + 'Sub Account' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Opening Balance' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Transactions' + '</th>';
        pTableHTML += '                     <th class="" >' + 'Closed Balance' + '</th>';
    }
    pTableHTML += '                 </tr>';
    pTableHTML += '                 </thead>';
    pTableHTML += '                 <tbody>';
    if (pSubAccountTrialBalance != null)
        $.each(pSubAccountTrialBalance, function (i, item) {
            if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
                pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + (item.TotalDbt - item.TotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
        });

    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
    var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
    var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
    var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
    pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (fTotalOpenBalDbt - fTotalOpenBalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (fTotalDbt - fTotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + ((parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)) - (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                         </tr>';
    $("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}
else {
        pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
pTableHTML += '                 <thead class="" style="">'
if (pOutputTo != "Excel") {
    pTableHTML += '                 <tr class="" style="">';
    pTableHTML += '                     <th class="" >' + 'الحساب التحليلي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الإفتتاحي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الحركات' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الختامي' + '</th>';
    pTableHTML += '                 </tr>'
}
else { //Excel
    pTableHTML += '                 <tr class="" style="">';
    pTableHTML += '                     <th class="" >' + 'الحساب التحليلي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الإفتتاحي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الحركات' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الختامي' + '</th>';
}
pTableHTML += '                 </tr>';
pTableHTML += '                 </thead>';
pTableHTML += '                 <tbody>';
if (pSubAccountTrialBalance != null)
    $.each(pSubAccountTrialBalance, function (i, item) {
        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
            pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt - item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + (item.TotalDbt - item.TotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
    });

pTableHTML += '                 </tbody>';
pTableHTML += '             </table>';

$("#hExportedTable").html(pTableHTML);
debugger;
//Totals row
var pRowTotalsHTML = "";
var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (fTotalOpenBalDbt - fTotalOpenBalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (fTotalDbt - fTotalCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + ((parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)) - (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                         </tr>';
$("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}

if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountTrialBalance");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub-Account Trial Balance (Total)</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'ميزان المراجعة التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة التحليلي (الإجمالي)</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

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
function SubAccountTrialBalance_Draw_NetBalance(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pSubAccountTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    if (pOutputTo != "Excel") {
        pTableHTML += '                 <tr class="" style="">';
        pTableHTML += '                     <th class="" rowspan=2>' + 'Sub Account' + '</th>';
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
        pTableHTML += '                     <th class="">' + 'Sub Account' + '</th>';
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
    if (pSubAccountTrialBalance != null)
        $.each(pSubAccountTrialBalance, function (i, item) {
            if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                pTableHTML += '                 <tr class="' + (item.IsMain ? ' hide ' : '') + '" style="font-size:95%;">';
                //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
                pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt > item.OpenningCrdt ? item.OpenningDbt - item.OpenningCrdt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + (item.OpenningDbt < item.OpenningCrdt ? item.OpenningCrdt - item.OpenningDbt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
        });

    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
    var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
    var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
    var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
    var fTotalClosedDebit = GetColumnSum("tblSubAccountTrialBalance", "classClosedDebit");
    var fTotalClosedCredit = GetColumnSum("tblSubAccountTrialBalance", "classClosedCredit");

    pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + parseFloat(fTotalClosedDebit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + parseFloat(fTotalClosedCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                         </tr>';
    $("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}
else {
     pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
pTableHTML += '                 <thead class="" style="">'
if (pOutputTo != "Excel") {
    pTableHTML += '                 <tr class="" style="">';
    pTableHTML += '                     <th class="" >' + 'الحساب التحليلي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الإفتتاحي' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الحركات' + '</th>';
    pTableHTML += '                     <th class="" >' + 'الرصيد الختامي' + '</th>';
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
if (pSubAccountTrialBalance != null)
    $.each(pSubAccountTrialBalance, function (i, item) {
        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
            pTableHTML += '                 <tr class="' + (item.IsMain ? ' hide ' : '') + '" style="font-size:95%;">';
            //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
            pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + (item.OpenningDbt > item.OpenningCrdt ? item.OpenningDbt - item.OpenningCrdt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + (item.OpenningDbt < item.OpenningCrdt ? item.OpenningCrdt - item.OpenningDbt : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
    });

pTableHTML += '                 </tbody>';
pTableHTML += '             </table>';

$("#hExportedTable").html(pTableHTML);
debugger;
//Totals row
var pRowTotalsHTML = "";
var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
var fTotalClosedDebit = GetColumnSum("tblSubAccountTrialBalance", "classClosedDebit");
var fTotalClosedCredit = GetColumnSum("tblSubAccountTrialBalance", "classClosedCredit");

pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + parseFloat(fTotalClosedDebit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + parseFloat(fTotalClosedCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                         </tr>';
$("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}

if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountTrialBalance");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        ReportHTML += '<html dir="rtl">';
    ReportHTML += '     <head><title>' + 'ميزان المراجعة التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة التحليلي (صافي الأرصدة)</u></b>' + '</div>';
    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
    ReportHTML += '             </div>';
    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

    //ReportHTML += pTablesHTML; //Add table html in the next lines
    ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
    ReportHTML += '             </table>';

    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

    ReportHTML += '         <body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    //ReportHTML += '     </footer>';
    ReportHTML += '</html>';
}
else {
    ReportHTML += '<html>';
ReportHTML += '     <head><title>' + 'SubAccount Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
ReportHTML += '         <body style="background-color:white;">';
ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub-Account Trial Balance (Net Balance)</u></b>' + '</div>';
ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
//ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

//ReportHTML += pTablesHTML; //Add table html in the next lines
ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
ReportHTML += '             </table>';

//ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

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
function SubAccountTrialBalance_Draw_Detailed(pData, pOutputTo) {
    debugger;
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pSubAccountTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var Suppress = $("#cbSuppressForZeroes").prop("checked");

    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';

    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    if (pOutputTo != "Excel") {
        pTableHTML += '                 <tr class="" style="">';
        pTableHTML += '                     <th class="" rowspan=2>' + 'Sub Account' + '</th>';
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
        pTableHTML += '                     <th class="">' + 'Sub Account' + '</th>';
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
    if (pSubAccountTrialBalance != null)
        $.each(pSubAccountTrialBalance, function (i, item) {
            if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
                pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (item.TotalDbt + item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (item.TotalCrdt + item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            }
        });

    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
    var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
    var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
    var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
    pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                         </tr>';
    $("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}
else {
    pTableHTML += '             <table id="tblSubAccountTrialBalance" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
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
    pTableHTML += '                     <th class="">' + ' الحساب التحليلي' + '</th>';
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
if (pSubAccountTrialBalance != null)
    $.each(pSubAccountTrialBalance, function (i, item) {
        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
            pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (item.TotalDbt + item.OpenningDbt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (item.TotalCrdt + item.OpenningCrdt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
    });

pTableHTML += '                 </tbody>';
pTableHTML += '             </table>';

$("#hExportedTable").html(pTableHTML);
debugger;
//Totals row
var pRowTotalsHTML = "";
var fTotalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionCredit");
var fTotalOpenBalCrdt = GetColumnSum("tblSubAccountTrialBalance", "classOpenCredit");
var fTotalDbt = GetColumnSum("tblSubAccountTrialBalance", "classTransactionDebit");
var fTotalOpenBalDbt = GetColumnSum("tblSubAccountTrialBalance", "classOpenDebit");
pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'الإجمالي : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalOpenBalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + fTotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalDbt) + parseFloat(fTotalOpenBalDbt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + (parseFloat(fTotalCrdt) + parseFloat(fTotalOpenBalCrdt)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                         </tr>';
$("#tblSubAccountTrialBalance tbody").append(pRowTotalsHTML);
}

if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountTrialBalance");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'SubAccount Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub-Account Trial Balance (Detailed)</u></b>' + '</div>';
    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

    //ReportHTML += pTablesHTML; //Add table html in the next lines
    ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
    ReportHTML += '             </table>';

    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

    ReportHTML += '         <body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    //ReportHTML += '     </footer>';
    ReportHTML += '</html>';
}
else {
    ReportHTML += '<html dir="rtl">';
ReportHTML += '     <head><title>' + 'ميزان المراجعة التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
ReportHTML += '         <body style="background-color:white;">';
ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>ميزان المراجعة التحليلي (التفصيلي)</u></b>' + '</div>';
ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
ReportHTML += '             </div>';
//ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

//ReportHTML += pTablesHTML; //Add table html in the next lines
ReportHTML += '             <table id="tblSubAccountTrialBalance' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
ReportHTML += '             ' + $("#tblSubAccountTrialBalance").html();
ReportHTML += '             </table>';

//ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pSubAccountTrialBalance.length + '</div>';

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
function SubAccountTrialBalance_Draw_ByCostCenter(pData, pOutputTo) {
    debugger;
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pSubAccountTrialBalance = JSON.parse(pData[2]);
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

        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            pTableHTML += '             <table id="tblSubAccountTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            if (pOutputTo != "Excel") {
                pTableHTML += '                 <tr class="" style="">';
                pTableHTML += '                     <th class="" rowspan=2>' + 'Sub Account' + '</th>';
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
                pTableHTML += '                     <th class="">' + 'Sub Account' + '</th>';
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
            if (pSubAccountTrialBalance != null)
                $.each(pSubAccountTrialBalance, function (i, item) {
                    if (item.CostCenter_ID == ArrCostCenterIDList[j]) {



                        if (Boolean(Suppress && (item.OpenningDbt - item.OpenningCrdt) == 0 && (item.TotalDbt - item.TotalCrdt) == 0 && item.IsMain == 0) == false) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            //pTableHTML += '                     <td style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.SubAccount_Name + '</td>';
                            pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
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
            var pTotalOpenDebit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classOpenDebit");
            var pTotalOpenCredit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classOpenCredit");
            var pTotalTransactionDebit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classTransactionDebit");
            var pTotalTransactionCredit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classTransactionCredit");
            var pTotalClosedDebit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classClosedDebit");
            var pTotalClosedCredit = GetColumnSum("tblSubAccountTrialBalance" + ArrCostCenterIDList[j], "classClosedCredit");

            var pRowTotalsHTML = "";
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
                $("#tblSubAccountTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
            }
        } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
   

    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrCostCenterIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountTrialBalance" + ArrCostCenterIDList[j]);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head><title>' + 'ميزان المراجعة التحليلى' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
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
                ReportHTML += '             <table id="tblSubAccountTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountTrialBalance" + ArrCostCenterIDList[j]).html();
                ReportHTML += '             </table>';
            } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';
        }
        else {
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Sub-Account Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += '         <body style="background-color:white;">';
            for (var j = 0; j < ArrCostCenterIDList.length; j++) {
                //if (i > 0)
                ReportHTML += '         <div class="break"></div>';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Sub-Account Trial Balance (By Cost Center)</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Cost Center : ' + '</b>' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[j] + "]").siblings().text().trim() + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblSubAccountTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblSubAccountTrialBalance" + ArrCostCenterIDList[j]).html();
                ReportHTML += '             </table>';
            } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTrialBalance.length + '</div>';

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

var AddScripts = '';
AddScripts += '<link rel="stylesheet" href="/Content/CSS/datepicker.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Content/CSS/jquery.contextMenu.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Content/CSS/sweet-alert.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Scripts/nestable/nestable.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Scripts/fuelux/fuelux.css" type="text/css">';
AddScripts += '<link rel="stylesheet" href="/Scripts/utilities/bootstrap-datetimepicker.min.css" type="text/css">';
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.scrollTo.min.js" type="text/javascript"></script>';
AddScripts += '<link rel="stylesheet" href="/Scripts/utilities/TextSearch/select2.css" type="text/css">';
AddScripts += '<script src="/Scripts/utilities/TextSearch/select2.js"></script>';
AddScripts += '<script src="/Scripts/utilities/TextSearch/jquery-editable-select.js"></script>';
AddScripts += '<script src="/Scripts/utilities/TextSearch/jquery-1.10.2.intellisense.js"></script>';
AddScripts += '<script src="/Scripts/utilities/bootstrap-paginator.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/bootstrap-datepicker.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/bootstrap-hijri-datepicker.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.tableToExcel.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.table2excel.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.contextMenu.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/sweet-alert.min.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/utilities/jquery.highlight-5.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/PlugIns/MostaaTextArea.js"></script>';
AddScripts += '<script src="/Scripts/utilities/Inputmask/inputmask.js"></script>';
AddScripts += '<script src="/Scripts/utilities/Inputmask/jquery.inputmask.js"></script>';
AddScripts += '<script src="/Scripts/utilities/Inputmask/bindings/inputmask.binding.js"></script>';
AddScripts += '<script src="/Scripts/utilities/xlsx/xlsx.core.min.js"></script>';
AddScripts += '<script src="/Scripts/utilities/xlsx/jszip.min.js"></script>';
AddScripts += '<script src="/Scripts/nestable/jquery.nestable.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/nestable/demo.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/fuelux/fuelux.js" type="text/javascript"></script>';

AddScripts += '<script src="/Scripts/utilities/xls.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/sparkline/jquery.sparkline.min.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/easypiechart/jquery.easy-pie-chart.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.min.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.tooltip.min.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.resize.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.orderBars.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.pie.min.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/jquery.flot.grow.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/charts/flot/demo.js" type="text/javascript"></script>';
AddScripts += '<link href="/Scripts/utilities/FancyTree/skin-win8/ui.fancytree.css" rel="stylesheet">';
AddScripts += '<script src="/Scripts/utilities/FancyTree/jquery.fancytree-all-deps.js"></script>';
AddScripts += '<script src="/Scripts/utilities/FancyTree/modules/jquery.fancytree.childcounter.js"></script>';
AddScripts += '<script src="/Scripts/utilities/FancyTree/modules/jquery.fancytree.filter.js"></script>';
AddScripts += '<script src="/Scripts/utilities/FancyTree/modules/jquery.fancytree.menu.js"></script>';
AddScripts += '<script src="/Scripts/utilities/FancyTree/modules/jquery.fancytree.multi.js"></script>';
AddScripts += '<script src="/Scripts/utilities/FancyTree/modules/jquery.fancytree.logger.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/TrialBalance.js"></script>';
