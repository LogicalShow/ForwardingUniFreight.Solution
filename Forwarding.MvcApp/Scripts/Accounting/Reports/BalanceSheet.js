
function BalanceSheet_Print(pOutputTo) {
    debugger;
    FadePageCover(true);

    var pBranch_IDs ;
    if ($('#slBranch').val() == '' || $('#slBranch').val() == '0' || $('#slBranch').val() == null)
        pBranch_IDs = '-1';
    else
        pBranch_IDs = $('#slBranch').val();

    var pCostCenter_IDs;
    if ($('#slCostCenter').val() == '' || $('#slCostCenter').val() == '0' || $('#slCostCenter').val() == null)
        pCostCenter_IDs = '-1';
    else
        pCostCenter_IDs = $('#slCostCenter').val();

    var pParametersWithValues = {
        pToDate: $("#txtToDate").val()
        , pAcc_Level: $("#slAccountLevel").val()
        , pSeeingInvisibleAccounts: $("#cbSeeingInvisibleAccounts").prop('checked') ? false : true
        , pCurrency: $('#slCurrency').val()
        , pBranch_IDs: pBranch_IDs
        , pCostCenter_IDs: pCostCenter_IDs 
    };
    CallGETFunctionWithParameters("/api/BalanceSheet/GetPrintedData", pParametersWithValues
        , function (pData) {
            BalanceSheet_Draw(pData, pOutputTo);
        }
        , null);
}
function BalanceSheet_Draw(pData, pOutputTo) {
    debugger;

    if ($("#hDefaultUnEditableCompanyName").val() == "SAF")
    {
        BalanceSheet_Draw_Safina(pData, pOutputTo);
    }
    else
    {
        BalanceSheet_Draw_Default(pData, pOutputTo)
    }

    FadePageCover(false);
}
function BalanceSheet_Draw_Default(pData,pOutputTo)
{
    var pDefaultsHeader = JSON.parse(pData[0]);
    var pBalanceSheet;
    if ($('#slCurrency').val() != '')
        pBalanceSheet = JSON.parse(pData[2]);
    else
        pBalanceSheet = JSON.parse(pData[1]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    //pDescriptionOfGoods.replace(/\n/g, "<br />")
    //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
    //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
    var pTableHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    pTableHTML += '             <table id="tblBalanceSheet" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    pTableHTML += '                     <tr class="" style="">';
    pTableHTML += '                         <th class="">' + 'Account' + '</th>';
    pTableHTML += '                         <th class="">' + 'Balance' + '</thb>';
    pTableHTML += '                     </tr>'
    pTableHTML += '                 </thead>';
    pTableHTML += '                 <tbody>';
    if (pBalanceSheet != null)
        $.each(pBalanceSheet, function (i, item) {
            if (!($("#cbSuppressForZeroes").prop("checked") && item.FinalBalance == 0)) {
                var tabs = "";
                for (var y = 1; y < item.AccLevel ; y++)
                    tabs += "&emsp;&emsp;";
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';
                pTableHTML += '                     <td class="FinalBalance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //the columns after here are not shown in Excel coz the header is only 2 columns
                //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                 </tr>';
            }
        });
    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    var ProfitAndLossTotal = GetColumnSum("tblBalanceSheet", "ProfitAndLoss");
    pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
    pRowTotalsHTML += '                         </tr>';
    $("#tblBalanceSheet tbody").append(pRowTotalsHTML);
}
else {
        pTableHTML += '             <table id="tblBalanceSheet" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
pTableHTML += '                 <thead class="" style="">'
pTableHTML += '                     <tr class="" style="">';
pTableHTML += '                         <th class="">' + 'الحساب' + '</th>';
pTableHTML += '                         <th class="">' + 'الرصيد' + '</thb>';
pTableHTML += '                     </tr>'
pTableHTML += '                 </thead>';
pTableHTML += '                 <tbody>';
if (pBalanceSheet != null)
    $.each(pBalanceSheet, function (i, item) {
        if (!($("#cbSuppressForZeroes").prop("checked") && item.FinalBalance == 0)) {
            var tabs = "";
            for (var y = 1; y < item.AccLevel ; y++)
                tabs += "&emsp;&emsp;";
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';
            pTableHTML += '                     <td class="FinalBalance" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            //the columns after here are not shown in Excel coz the header is only 2 columns
            //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                 </tr>';
        }
    });
pTableHTML += '                 </tbody>';
pTableHTML += '             </table>';

$("#hExportedTable").html(pTableHTML);
debugger;
//Totals row
var pRowTotalsHTML = "";
var ProfitAndLossTotal = GetColumnSum("tblBalanceSheet", "ProfitAndLoss");
pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'الربح والخسارة :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
pRowTotalsHTML += '                         </tr>';
$("#tblBalanceSheet tbody").append(pRowTotalsHTML);
}
if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblBalanceSheet");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Balance Sheet' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Balance Sheet</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b>' + ($('#slBranch').val() != '' ? $('#slBranch option:selected').text().trim() : '') + '</b></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b>' + ($('#slCostCenter').val() != '' ? $('#slCostCenter option:selected').text().trim() : '') + '</b></div>';
  
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-9 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblBalanceSheet' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblBalanceSheet").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'الميزانية العمومية' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>الميزانية العمومية</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblBalanceSheet' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblBalanceSheet").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
}
function BalanceSheet_Draw_Safina(pData, pOutputTo) {
    debugger;
    if ($('#slCurrency').val() > 0)
    {
        var pDefaultsHeader = JSON.parse(pData[0]);
        var pBalanceSheet = JSON.parse(pData[2]);
        //var pBalanceSheetByCurrency = JSON.parse(pData[2]);
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();

        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        pTableHTML += '             <table id="tblBalanceSheet" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        pTableHTML += '                     <tr class="" style="">';
        pTableHTML += '                         <th class="">' + 'Account' + '</th>';
        pTableHTML += '                         <th class="">' + 'Partial' + '</th>';
        pTableHTML += '                         <th class="">' + 'Total' + '</th>';
        pTableHTML += '                         <th class="">' + 'Balance' + '</thb>';
        pTableHTML += '                     </tr>'
        pTableHTML += '                 </thead>';
        pTableHTML += '                 <tbody>';
        if (pBalanceSheet != null)
            $.each(pBalanceSheet, function (i, item) {
                if (!($("#cbSuppressForZeroes").prop("checked") && item.FinalBalance == 0)) {
                    var tabs = "";
                    for (var y = 1; y < item.AccLevel ; y++)
                        tabs += "&emsp;&emsp;";
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';

                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                     (item.IsMain == 0 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';
                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                     (item.IsMain == 1 && item.AccLevel > 1 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';
                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                       (item.AccLevel == 1 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';

                    //the columns after here are not shown in Excel coz the header is only 2 columns
                    //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                 </tr>';
                }
            });
        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var ProfitAndLossTotal = GetColumnSum("tblBalanceSheet", "ProfitAndLoss");
        pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                         </tr>';
        $("#tblBalanceSheet tbody").append(pRowTotalsHTML);

        if (pOutputTo == "Excel") {
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblBalanceSheet");
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Balance Sheet' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Balance Sheet</u></b>' + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-9 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblBalanceSheet' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblBalanceSheet").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';

            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }

    }
    else
    {
        var pDefaultsHeader = JSON.parse(pData[0]);
        var pBalanceSheet = JSON.parse(pData[1]);
       
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();

        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        pTableHTML += '             <table id="tblBalanceSheet" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        pTableHTML += '                     <tr class="" style="">';
        pTableHTML += '                         <th class="">' + 'Account' + '</th>';
        pTableHTML += '                         <th class="">' + 'Partial' + '</th>';
        pTableHTML += '                         <th class="">' + 'Total' + '</th>';
        pTableHTML += '                         <th class="">' + 'Balance' + '</thb>';
        pTableHTML += '                     </tr>'
        pTableHTML += '                 </thead>';
        pTableHTML += '                 <tbody>';
        if (pBalanceSheet != null)
            $.each(pBalanceSheet, function (i, item) {
                if (!($("#cbSuppressForZeroes").prop("checked") && item.FinalBalance == 0)) {
                    var tabs = "";
                    for (var y = 1; y < item.AccLevel ; y++)
                        tabs += "&emsp;&emsp;";
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;">' + (pOutputTo != "Excel" ? tabs : "") + (item.IsMain && pOutputTo != "Excel" ? ('<b>' + item.Account_Name + '</b>') : item.Account_Name) + '</td>';

                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                     (item.IsMain == 0 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';
                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                     (item.IsMain == 1 && item.AccLevel > 1 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';
                    pTableHTML += '                     <td class="" style="">' + (pOutputTo != "Excel" ? tabs : "") +
                       (item.AccLevel == 1 ? (item.FinalBalance).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '')
                        + '</td>';

                    //the columns after here are not shown in Excel coz the header is only 2 columns
                    //pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 || item.Account_ID == 2 ? item.FinalBalance : 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="ProfitAndLoss hide" style="text-align:center;">' + (item.Account_ID == 1 ? Math.abs(item.FinalBalance) : (item.Account_ID == 2 ? (-1 * Math.abs(item.FinalBalance)) : 0)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                 </tr>';
                }
            });
        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        var ProfitAndLossTotal = GetColumnSum("tblBalanceSheet", "ProfitAndLoss");
        pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        pRowTotalsHTML += '                             <td class="" style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                             <td class="" style="text-align:left;"><b><u>' + '' + '</td>';
        pRowTotalsHTML += '                         </tr>';
        $("#tblBalanceSheet tbody").append(pRowTotalsHTML);

        if (pOutputTo == "Excel") {
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblBalanceSheet");
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'Balance Sheet' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Balance Sheet</u></b>' + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-9 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblBalanceSheet' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblBalanceSheet").html();
            ReportHTML += '             </table>';

            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pBalanceSheet.length + '</div>';

            ReportHTML += '         <body>';
            //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            //ReportHTML += '     </footer>';
            ReportHTML += '</html>';

            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }

    }

}