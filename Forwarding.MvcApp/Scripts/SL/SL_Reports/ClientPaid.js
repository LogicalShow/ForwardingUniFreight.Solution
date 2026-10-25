function TrialBalance_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function TrialBalance_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function TrialBalance_cbCheckAllJobChanged() {
    debugger;
    if ($("#cbCheckAllJobs").prop("checked"))
        $("#divCbJob input[name=nameCbJob]").prop("checked", true);
    else
        $("#divCbJob input[name=nameCbJob]").prop("checked", false);
}
function TrialBalance_ReportType_Changed() {
    debugger;
    if ($("#cbIsByCostCenter").prop("checked"))
        $("#secCostCenter").removeClass("hide");
    else
        $("#secCostCenter").addClass("hide");
}
function ClientPaid_Print(pOutputTo) {
    debugger;
    var pAccountIDList = ($("#cbCheckAllAccounts").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount"));
    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());
    var pMainAccount = $("#slAccountsGroup").val();

    if (pAccountIDList == "0")
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            swal("Sorry", "Please, select at least one Client.", "warning");
        }
        else {
            swal("إعتذار", "من فضلك، برجاء إختيار عميل واحد علي الأقل.", "warning");
        }
        //else if (pCurrency == "0")
        //    swal("Sorry", "Please, select at least one Client.", "warning");
        //  else if (//*$("#cbIsByCostCenter").prop("checked")*// && pMainAccount == "")
        //else if (pMainAccount == "")

        //    swal("Sorry", "Please, select at least one cost center.");
    else {
        if ($("#cbIsLocal").prop("checked")) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ClientIDs");
            arr_Keys.push("FromDate");
            arr_Keys.push("ToDate");

            arr_Values.push(pAccountIDList);
            arr_Values.push(pFromDate);
            arr_Values.push(pToDate);
            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Values: arr_Values
                    , pTitle: "Client Paid"
                    , pReportName: "Rep_SLInvoice_Paid_Local"
                };
            }
            else {
                var pParametersWithValues =
               {
                   arr_Keys: arr_Keys
                   , arr_Values: arr_Values
                   , pTitle: "سداد العملاء"
                   , pReportName: "Rep_SLInvoice_Paid_Local"
               };
            }
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
        if ($("#cbIsByInvoice").prop("checked")) {
            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("ClientIDs");
            arr_Keys.push("FromDate");
            arr_Keys.push("ToDate");

            arr_Values.push(pAccountIDList);
            arr_Values.push(pFromDate);
            arr_Values.push(pToDate);
            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Values: arr_Values
                    , pTitle: "Client Paid"
                    , pReportName: "Rep_SLInvoice_Paid_Local"
                };
            } else {
                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Values: arr_Values
                    , pTitle: "سداد العملاء"
                    , pReportName: "Rep_SLInvoice_Paid"
                };
            }
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
    }
}




function Details_FillCheckboxList() {
    debugger;
    FadePageCover(true);
    var pAccountID = $("#slAccountsGroup").val();
    var pAccountRealCode = $("#slAccountsGroup option:selected").attr("RealAccountCode");

    CallGETFunctionWithParameters("/api/SL_ClientAccountStatementReport/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , {
            pIsLoadArrayOfObjects: true
        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 9999
        , pWhereClause: "4"
        , pWhereClause2: (pAccountID == 0 ? "-1" : pAccountID)

            //, pWhereClause: (pAccountID == 0 ? "WHERE IsMain=0" : "WHERE IsMain=0 AND Parent_ID=" + pAccountID)
        , pOrderBy: "ID"
        }
        , function (pData) {

            FillDivWithCheckboxes("divCbAccount", pData[1], "nameCbAccount", 5/*NameAndCode*/, null);
           


            FadePageCover(false);
        }
        , null);
}

//not used(i left it just to make it easy if requested)
function TrialBalance_Draw_ByCostCenter(pData, pOutputTo) {
    debugger;
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTrialBalance = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();

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
        pTableHTML += '             <table id="tblTrialBalance' + ArrCostCenterIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        if (pOutputTo != "Excel") {
            pTableHTML += '                 <tr class="" style="">';
            //pTableHTML += '                     <th class="" rowspan=2>' + 'Account' + '</th>';
            pTableHTML += '                     <th class="" rowspan=2>' + 'Account Number' + '</th>';
            pTableHTML += '                     <th class="" rowspan=2>' + 'Account Name' + '</th>';
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
            //pTableHTML += '                     <th class="">' + 'Account' + '</th>';
            pTableHTML += '                     <th class="" >' + 'Account Number' + '</th>';
            pTableHTML += '                     <th class="" >' + 'Account Name' + '</th>';
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
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    //pTableHTML += '                     <td style="text-align:left;">' + item.Account_Number + (pOutputTo == 'Excel' ? ' - ' : '&emsp;&emsp;') + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Number + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="classOpenDebit" style="text-align:center;">' + item.OpenningDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classOpenCredit" style="text-align:center;">' + item.OpenningCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionDebit" style="text-align:center;">' + item.TotalDbt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classTransactionCredit" style="text-align:center;">' + item.TotalCrdt.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedDebit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) < (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalDbt + item.OpenningDbt) - (item.TotalCrdt + item.OpenningCrdt)) : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="classClosedCredit" style="text-align:center;">' + (((item.TotalCrdt) + (item.OpenningCrdt) > (item.TotalDbt + item.OpenningDbt)) ? ((item.TotalCrdt + item.OpenningCrdt) - (item.TotalDbt + item.OpenningDbt)) : 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    ////the next lines are not shown in Excel coz col header count is less that their order
                    //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningCrdt' : '') + ' hide" style="text-align:left;">' + item.OpenningCrdt + '</td>';
                    //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'OpenningDbt' : '') + ' hide" style="text-align:left;">' + item.OpenningDbt + '</td>';
                    //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalCrdt' : '') + ' hide" style="text-align:left;">' + item.TotalCrdt + '</td>';
                    //pTableHTML += '                     <td class="' + (item.AccLevel == 1 ? 'TotalDbt' : '') + ' hide" style="text-align:left;">' + item.TotalDbt + '</td>';
                    pTableHTML += '                 </tr>';
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
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
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
            pRowTotalsHTML += '                             <td style="text-align:right;" class=""><b>' + '' + '</td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + '' + '</b></td>';
            pRowTotalsHTML += '                         </tr>';

            pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            pRowTotalsHTML += '                             <td style="text-align:right;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                             <td style="text-align:right;" class=""><u><b>' + 'Totals : </u></b>' + (pOutputTo == "Excel" ? ' ' : '&emsp;&emsp;') + '</td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenDebit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalOpenCredit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionDebit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalTransactionCredit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedDebit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                             <td style="text-align:center;" class=""><b>' + pTotalClosedCredit_AllTables.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pRowTotalsHTML += '                         </tr>';
            $("#tblTrialBalance" + ArrCostCenterIDList[j] + " tbody").append(pRowTotalsHTML);
        }
    } //for (var j = 0; j < ArrCostCenterIDList.length; j++)
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrCostCenterIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrialBalance" + ArrCostCenterIDList[j]);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Trial Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrCostCenterIDList.length; j++) {
            if (i > 0)
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