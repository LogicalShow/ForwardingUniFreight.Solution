

function IncomeStatement_Initialize() {
    FadePageCover(true);
    debugger;
        CallGETFunctionWithParameters("/api/IncomeStatement/FillSearchControls"
            , {}
            , function (pData) {
               
                $("#hl-menu-Accounting").parent().addClass("active");
                $("#hl-menu-Accounting").parent().siblings().removeClass("active");

                if (pDefaults.UnEditableCompanyName == "NIL") {
                    $('#cbByDetails').parent().parent().removeClass('hide');
                    $('#cbBySummary').parent().parent().removeClass('hide');
                }
                else if (pDefaults.UnEditableCompanyName == "LATT") {
                    $('#cbByDetails').parent().parent().removeClass('hide');
                    $('#cbBySummary').parent().parent().removeClass('hide');
                    $('#cbByInvoiceDate').prop('checked', true);
                    $('#cbHideProfitLossJV').parent().addClass('hide');
                    $('#cbBySummary').parent().addClass('hide');
                    $('#cbByService').parent().addClass('hide');
                    $('#cbByOperationDate').parent().addClass('hide');
                    $('#cbByInvoiceDate').parent().addClass('hide');
                    $('#cbByCostCenter').parent().addClass('hide');
                    $('#cbSeeingInvisibleAccounts').parent().addClass('hide');
                    $('#divCbBranch').parent().addClass('hide');
                    $('#cbByDetails').parent().addClass('hide');
                    
                    
                }

                var pActivityIncome = pData[0];
                var pActivityExpense = pData[1];
                var pCostCenter = pData[2];
                var pBranch = pData[4];

                var pRevenueIDs = JSON.parse(pData[5]);
                var pExpensesIDs = JSON.parse(pData[6]);

                FillDivWithCheckboxes("divCbActivityIncome", pActivityIncome, "nameCbActivityIncome", OptionNameCodeAccount == "true" ? 4 : 3/*NameAndCode*/,
                    //null
                    function()
                    {
                        debugger;
                        $('input[name="' + 'nameCbActivityIncome' + '"]').each(function () {
                               var pID = $(this).attr('value');
                               const exists = pRevenueIDs.filter(item => item.AccountID == pID).length > 0;
                               if(exists)
                               {
                                   $(this).attr('checked', true);
                               }
                        });
                    }
                    );
                FillDivWithCheckboxes("divCbActivityExpense", pActivityExpense, "nameCbActivityExpense", OptionNameCodeAccount == "true" ? 4 : 3/*NameAndCode*/, function () {
                    debugger;
                    $('input[name="' + 'nameCbActivityExpense' + '"]').each(function () {
                        var pID = $(this).attr('value');
                        const exists = pExpensesIDs.filter(item => item.AccountID == pID).length > 0;
                        if (exists) {
                            $(this).attr('checked', true);
                        }
                    });
                }
                    );
                FillDivWithCheckboxes("divCbCostCenter", pCostCenter, "nameCbCostCenter", 5, null);
                FillDivWithCheckboxes("divCbBranch", pBranch, "nameCbBranch", 5, null);
                //FillDivWithCheckboxes("divCbJournalType", pJournalType, "nameCbJournalType", 5, null);
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                $("#txtFromDate").val(pFormattedTodaysDate);
                $("#txtToDate").val(pFormattedTodaysDate);
                FillListFromObject(null, 1/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCurrency", pData[3], null);
                //FillListFromObject(null, 2/*pCodeOrName*/, "Select Vessel", "slVessel", pData[0], null);
                //$("#slVoyage").html("<option value='0'>Select Voy.</option>");
                FadePageCover(false);
            }
            , null);
   
if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

}
function IncomeStatement_cbCheckAllActivityIncomeChanged() {
    debugger;
    if ($("#cbCheckAllActivityIncomes").prop("checked"))
        $("#divCbActivityIncome input[name=nameCbActivityIncome]").prop("checked", true);
    else
        $("#divCbActivityIncome input[name=nameCbActivityIncome]").prop("checked", false);
}
function IncomeStatement_cbCheckAllActivityExpenseChanged() {
    debugger;
    if ($("#cbCheckAllActivityExpenses").prop("checked"))
        $("#divCbActivityExpense input[name=nameCbActivityExpense]").prop("checked", true);
    else
        $("#divCbActivityExpense input[name=nameCbActivityExpense]").prop("checked", false);
}
function IncomeStatement_cbChangeCheckBoxChanged(pID) {
    debugger;

    if (pID == 'cbByOperationDate' || pID == 'cbByInvoiceDate') {
        if ($("#cbByOperationDate").prop("checked") && pID == 'cbByOperationDate') {
            $("#cbByInvoiceDate").prop("checked", false);

        }

        if ($("#cbByInvoiceDate").prop("checked") && pID == 'cbByInvoiceDate') {
            $("#cbByOperationDate").prop("checked", false);
        }


        if ($("#cbByOperationDate").prop("checked") || $("#cbByInvoiceDate").prop("checked")) {

            $("#cbByCostCenter").prop("checked", false);
            $("#cbHideProfitLossJV").prop("checked", false);
            $("#cbByDetails").prop("checked", false);
            $("#cbBySummary").prop("checked", false);
            $("#cbByService").prop("checked", false);


            $("#cbByCostCenter").attr("disabled", "disabled");
            $("#cbHideProfitLossJV").attr("disabled", "disabled");
            $("#cbByDetails").attr("disabled", "disabled");
            $("#cbBySummary").attr("disabled", "disabled");
            $("#cbByService").attr("disabled", "disabled");
        }
        else {

            $("#cbByCostCenter").removeAttr("disabled");
            $("#cbHideProfitLossJV").removeAttr("disabled");
            $("#cbByDetails").removeAttr("disabled");
            $("#cbBySummary").removeAttr("disabled");
            $("#cbByService").removeAttr("disabled");
        }
    }
   else if (pID == 'cbWithMonth') {
        if ($("#cbWithMonth").prop("checked")) {
            $("#cbByOperationDate").prop("checked", false);
            $("#cbByCostCenter").prop("checked", false);
            $("#cbSeeingInvisibleAccounts").prop("checked", false);
            $("#cbByDetails").prop("checked", false);
            $("#cbBySummary").prop("checked", false);
            $("#cbByService").prop("checked", false);

            $("#cbByOperationDate").attr("disabled", "disabled");
            $("#cbByCostCenter").attr("disabled", "disabled");
            $("#cbSeeingInvisibleAccounts").attr("disabled", "disabled");
            $("#cbByDetails").attr("disabled", "disabled");
            $("#cbBySummary").attr("disabled", "disabled");
            $("#cbByService").attr("disabled", "disabled");
        }
        else {
            $("#cbByOperationDate").removeAttr("disabled");
            $("#cbByCostCenter").removeAttr("disabled");;
            $("#cbSeeingInvisibleAccounts").removeAttr("disabled");
            $("#cbByDetails").removeAttr("disabled");
            $("#cbBySummary").removeAttr("disabled");
            $("#cbByService").removeAttr("disabled");
        }



    }
          
}


function BranchLedger_show() {
    debugger;
    $("#secBranch").removeClass("hide");
}
function CostCenterLedger_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function GetAllSelectedIDsAsStringWithNameAttrRPTIS(pCheckboxNameAttr) {
    debugger;
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : "*") + ($(this).attr('value'));
    });
    return listOfIDs;
}
function GetAllNOTSelectedIDsAsStringWithNameAttrILS(pCheckboxNameAttr) {
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:not(:checked)').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : "*") + ($(this).attr('value'));
    });
    return listOfIDs;
}
function IncomeStatement_DrawReportByMonth(pData, pOutputTo) {
    
    debugger;
    
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var ArrData = JSON.parse(pData[2]);
   

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '<head><title>' + 'Income Statement By Month' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /> ';
    ReportHTML += AddScripts;
    ReportHTML += '</head>';

    ReportHTML += AddScripts;
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '<div id="hExportedTable" class="hide">  </div>';
    $(ArrData).each(function (i, Data) {
        if (i > 0)
            ReportHTML += breakPage;

        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.PNG" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        if (i == 0)
            ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblServicesSalesFollowUp' + i + '"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table>';


        if (i == ArrData.length - 1) {
            ReportHTML += '</div></body></html>';




            if (pOutputTo != "Excel") {
                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                $("#hExportedTable").html(ReportHTML);
                var $table = $('#ReportBody');
                $table.table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: "IncomeStatementByMonth" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                    preserveColors: true // set to true if you want background colors and font colors preserved
                });

            }
        }


    });
    FadePageCover(false);

}

function BranchLedger_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}
function IncomeStatement_Print(pOutputTo) {
    debugger;
    var pIncomeAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityIncome");
    var pExpenseAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityExpense");
    var pOtherIncomeAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("nameCbActivityIncome");
    var pOtherExpenseAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("nameCbActivityExpense");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");

    var WithMonth = $("#cbWithMonth").prop("checked");
    var HideProfitLossJV = $("#cbHideProfitLossJV").prop("checked");
    var ByDetails = $("#cbByDetails").prop("checked");
    var BySummary = $("#cbBySummary").prop("checked");
    
    var pYearFrom = $('#txtFromDate').val().substring(6, $('#txtFromDate').val().length);
    var pYearTo = $('#txtToDate').val().substring(6, $('#txtToDate').val().length);

    if (pBranche_IDs == "")
        pBranche_IDs = "-1";

    if (pIncomeAccountIDs == "" || pExpenseAccountIDs == "")
        swal("Sorry", "Please, select at least one income and one expense accounts.");
    //if (pBranchIDList == "")
    //    swal("Sorry", "Please, select at least one Branch.");
    else if (pCostCenterIDList == "" && $("#cbByCostCenter").prop("checked"))
        swal("Sorry", "Please, select at least one cost center.");
    else if (pCostCenterIDList != "" && $("#cbByCostCenter").prop("checked") == false)
        swal("Sorry", "Please, Check Group by CostCenter.");
    else if ((ByDetails || BySummary) && pYearFrom != pYearTo)
        swal("Sorry", "Please, Choose From And To Date In The Same Year.");
    else if (WithMonth) {
        if (pDefaults.UnEditableCompanyName == "ILSuuuuuuuu" && pOutputTo != "Excel") {
            //var pIncomeAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityIncome");
            //var pExpenseAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityExpense");
            //var pOtherIncomeAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("nameCbActivityIncome");
            //var pOtherExpenseAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("nameCbActivityExpense");
            //var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
            //var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");

            


            var WithMonth = $("#cbWithMonth").prop("checked");

            var pIncomeAccountIDs = GetAllSelectedIDsAsStringWithNameAttrRPTIS("nameCbActivityIncome");
            var pExpenseAccountIDs = GetAllSelectedIDsAsStringWithNameAttrRPTIS("nameCbActivityExpense");
            var pOtherIncomeAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttrILS("nameCbActivityIncome");
            var pOtherExpenseAccountIDs = GetAllNOTSelectedIDsAsStringWithNameAttrILS("nameCbActivityExpense");
            var HideProfitLossJV = $("#cbHideProfitLossJV").prop("checked");
            var pFromDate = ConvertDateFormat($("#txtFromDate").val());
            var pToDate = ConvertDateFormat($("#txtToDate").val());


            var arr_Keys = new Array();
            var arr_Values = new Array();
            arr_Keys.push("FromDate");
            arr_Keys.push("ToDate");
            arr_Keys.push("IncomeAccountIDs");
            arr_Keys.push("ExpensesAccountIDs");
            arr_Keys.push("OtherIncomeAccountIDs");
            arr_Keys.push("OtherExpensesAccountIDs");
            arr_Keys.push("HideProfitLossJV");



            arr_Values.push(pFromDate +" 00:00");
            arr_Values.push(pToDate+" 23:59:59")
            arr_Values.push(pIncomeAccountIDs)
            arr_Values.push(pExpenseAccountIDs)
            arr_Values.push(pOtherIncomeAccountIDs)
            arr_Values.push(pOtherExpenseAccountIDs);
            arr_Values.push(HideProfitLossJV);


            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: "IncomeStatement ByMonth"
                , pReportName: "Rep_A_IncomeStatementByMonth"
            };


            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
            FadePageCover(false);


        }
        else {
            FadePageCover(true);
            var pParametersWithValues = {
                pFromDate: $("#txtFromDate").val()
                , pToDate: $("#txtToDate").val()
                , pIncomeAccountIDs: pIncomeAccountIDs
                , pExpenseAccountIDs: pExpenseAccountIDs
                , pOtherIncomeAccountIDs: pOtherIncomeAccountIDs
                , pOtherExpenseAccountIDs: pOtherExpenseAccountIDs
                , pWithSubAccounts: false
                , pHideProfitLossJV: HideProfitLossJV
                , pIsInvoiceDate: $("#cbByInvoiceDate").prop("checked")
            };
            CallGETFunctionWithParameters("/api/IncomeStatement/GetPrintedDataByMonth", pParametersWithValues
                , function (pData) {
                    IncomeStatement_DrawReportByMonth(pData, pOutputTo);
                }
                , null);

        }

       

    }
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()
            , pIncomeAccountIDs: pIncomeAccountIDs
            , pExpenseAccountIDs: pExpenseAccountIDs
            , pOtherIncomeAccountIDs: pOtherIncomeAccountIDs
            , pOtherExpenseAccountIDs: pOtherExpenseAccountIDs
            , pCostCenterIDList: pCostCenterIDList
            , pBranche_IDs: pBranche_IDs
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pCurrencyID: $("#slCurrency").val()
            , pIsOperationDate: $("#cbByOperationDate").prop("checked")
            , pSeeingInvisibleAccounts: $("#cbSeeingInvisibleAccounts").prop("checked") ? false : true
            , pHideProfitLossJV: HideProfitLossJV
            , pIsInvoiceDate: $("#cbByInvoiceDate").prop("checked")
            , pIsByDetails: ( (ByDetails || BySummary) ? true : false )
        };
        
        CallPOSTFunctionWithParameters("/api/IncomeStatement/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#cbByCostCenter").prop("checked")) {
                    IncomeStatement_DrawReportByCostCenter(pData, pOutputTo);
                }
                else if (ByDetails || BySummary) {
                    IncomeStatement_DrawReport_Nile(pData, pOutputTo);
                }
                else{
                    IncomeStatement_DrawReport(pData, pOutputTo);
                }
            }
            , null);
        }
        //else {
        //    CallGETFunctionWithParameters("/api/IncomeStatement/GetPrintedData", pParametersWithValues
        //    , function (pData) {
                
        //    }
        //    , null);

        //}
        
    //}
}
function IncomeStatement_DrawReport(pData, pOutputTo) {
    debugger;
    if ($("#slCurrency").val() > 0)
    {
        var pDefaultsHeader = JSON.parse(pData[0]);
        var pIncomeStatement = JSON.parse(pData[2]);
        //var pIncomeStatementByCurrency = JSON.parse(pData[2]);
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var pFlag1Total = 0;
        var pFlag2Total = 0;
        var pFlag3Total = 0;
        var pFlag4Total = 0;
        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            pTableHTML += '                     <tr class="" style="">';
            pTableHTML += '                         <th class="">' + 'Description' + '</th>';
            pTableHTML += '                         <th class="">' + 'Partial' + '</thb>';
            pTableHTML += '                         <th class="">' + 'Total' + '</thb>';
            pTableHTML += '                     </tr>'
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pIncomeStatement != null) {
                /*************************Flag1 : BusinessRevenue****************************************/
                var RowsWithFlag1 = pIncomeStatement.filter(f=>f.Flag == 1);
                if (RowsWithFlag1.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag1, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag1Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag1[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag1 : BusinessRevenue****************************************/
                /*************************Flag2 : Cost Of Business Revenues****************************************/
                var RowsWithFlag2 = pIncomeStatement.filter(f=>f.Flag == 2);
                if (RowsWithFlag2.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag2, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag2Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag2[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Gross Profit' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
                /*************************Flag4 : General Expenses****************************************/
                var RowsWithFlag4 = pIncomeStatement.filter(f=>f.Flag == 4);
                if (RowsWithFlag4.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Deduct' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag4, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag4Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag4 : General Expenses****************************************/
                /*************************Flag3 : Other Revenues****************************************/
                var RowsWithFlag3 = pIncomeStatement.filter(f=>f.Flag == 3);
                if (RowsWithFlag3.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Add' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag3, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag3Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag3 : Other Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Net Profit' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';

            $("#hExportedTable").html(pTableHTML);
            debugger;
            //Totals row
            var pRowTotalsHTML = "";
            //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
            //pRowTotalsHTML += '                         </tr>';
            $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
        }
        else {
            pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            pTableHTML += '                     <tr class="" style="">';
            pTableHTML += '                         <th class="">' + 'الوصف' + '</th>';
            pTableHTML += '                         <th class="">' + 'جزئي' + '</thb>';
            pTableHTML += '                         <th class="">' + 'إجمالي' + '</thb>';
            pTableHTML += '                     </tr>'
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pIncomeStatement != null) {
                /*************************Flag1 : BusinessRevenue****************************************/
                var RowsWithFlag1 = pIncomeStatement.filter(f=>f.Flag == 1);
                if (RowsWithFlag1.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag1, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag1Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag1[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag1 : BusinessRevenue****************************************/
                /*************************Flag2 : Cost Of Business Revenues****************************************/
                var RowsWithFlag2 = pIncomeStatement.filter(f=>f.Flag == 2);
                if (RowsWithFlag2.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag2, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag2Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag2[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي الربح' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
                /*************************Flag4 : General Expenses****************************************/
                var RowsWithFlag4 = pIncomeStatement.filter(f=>f.Flag == 4);
                if (RowsWithFlag4.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'خصم' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag4, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag4Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag4[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag4 : General Expenses****************************************/
                /*************************Flag3 : Other Revenues****************************************/
                var RowsWithFlag3 = pIncomeStatement.filter(f=>f.Flag == 3);
                if (RowsWithFlag3.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'إضافة' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag3, function (i, item) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag3Total += parseFloat(item.Value);
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag3[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag3 : Other Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'صافي الربح' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';

            $("#hExportedTable").html(pTableHTML);
            debugger;
            //Totals row
            var pRowTotalsHTML = "";
            //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
            //pRowTotalsHTML += '                         </tr>';
            $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
        }

        if (pOutputTo == "Excel") {
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement");
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '<div id="hExportedTable" class="hide">  </div>';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblIncomeStatement").html();
                ReportHTML += '             </table>';

                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

                ReportHTML += '         <body>';
                //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //ReportHTML += '     </footer>';
                ReportHTML += '</html>';
            }
            else {
                ReportHTML += '<html dir="rtl">';
                ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
                ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             </div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblIncomeStatement").html();
                ReportHTML += '             </table>';

                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

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
    else
    {
        var pDefaultsHeader = JSON.parse(pData[0]);
        var pIncomeStatement = JSON.parse(pData[1]);
        //var pIncomeStatementByCurrency = JSON.parse(pData[2]);
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var pFlag1Total = 0;
        var pFlag2Total = 0;
        var pFlag3Total = 0;
        var pFlag4Total = 0;
        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        pTableHTML += '                     <tr class="" style="">';
        pTableHTML += '                         <th class="">' + 'Description' + '</th>';
        pTableHTML += '                         <th class="">' + 'Partial' + '</thb>';
        pTableHTML += '                         <th class="">' + 'Total' + '</thb>';
        pTableHTML += '                     </tr>'
        pTableHTML += '                 </thead>';
        pTableHTML += '                 <tbody>';
        if (pIncomeStatement != null) {
            /*************************Flag1 : BusinessRevenue****************************************/
            var RowsWithFlag1 = pIncomeStatement.filter(f=>f.Flag == 1);
            if (RowsWithFlag1.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag1, function (i, item) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                        + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + item.Account_Name + "'" + ', event'  + ');" >'
                        + '<span><br>'
                        + '&emsp;&emsp;' + item.Account_Name
                        + '</span>'
                        + '</td></a> ';
                    pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pFlag1Total += parseFloat(item.Value);
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag1[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag1 : BusinessRevenue****************************************/
            /*************************Flag2 : Cost Of Business Revenues****************************************/
            var RowsWithFlag2 = pIncomeStatement.filter(f=>f.Flag == 2);
            if (RowsWithFlag2.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag2, function (i, item) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                   // pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                        + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + + item.Account_Name + "'" + ', event'  + ');" >'
                        + '<span><br>'
                        + '&emsp;&emsp;' + item.Account_Name
                        + '</span>'
                        + '</td></a> ';
                    pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pFlag2Total += parseFloat(item.Value);
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag2[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Gross Profit' + '</b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
            /*************************Flag4 : General Expenses****************************************/
            var RowsWithFlag4 = pIncomeStatement.filter(f=>f.Flag == 4);
            if (RowsWithFlag4.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Deduct' + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag4, function (i, item) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                        + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + + item.Account_Name + "'" + ', event' + ');" >'
                        + '<span><br>'
                        + '&emsp;&emsp;' + item.Account_Name
                        + '</span>'
                        + '</td></a> ';
                    pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pFlag4Total += parseFloat(item.Value);
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag4 : General Expenses****************************************/
            /*************************Flag3 : Other Revenues****************************************/
            var RowsWithFlag3 = pIncomeStatement.filter(f=>f.Flag == 3);
            if (RowsWithFlag3.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Add' + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag3, function (i, item) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                   // pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                    pTableHTML += '                     <td class="" style="text-align:left;">'
                        + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                        + + item.Account_Name + "'" + ', event' + ');" >'
                        + '<span><br>'
                        + '&emsp;&emsp;' + item.Account_Name
                        + '</span>'
                        + '</td></a> ';
                    pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pFlag3Total += parseFloat(item.Value);
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag3 : Other Revenues****************************************/
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Net Profit' + '</b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';

        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
        //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
        //pRowTotalsHTML += '                         </tr>';
        $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
    }
else {
    pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTableHTML += '                 <thead class="" style="">'
    pTableHTML += '                     <tr class="" style="">';
    pTableHTML += '                         <th class="">' + 'الوصف' + '</th>';
    pTableHTML += '                         <th class="">' + 'جزئي' + '</thb>';
    pTableHTML += '                         <th class="">' + 'إجمالي' + '</thb>';
    pTableHTML += '                     </tr>'
    pTableHTML += '                 </thead>';
    pTableHTML += '                 <tbody>';
    if (pIncomeStatement != null) {
        /*************************Flag1 : BusinessRevenue****************************************/
        var RowsWithFlag1 = pIncomeStatement.filter(f=>f.Flag == 1);
        if (RowsWithFlag1.length > 0) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            $.each(RowsWithFlag1, function (i, item) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pFlag1Total += parseFloat(item.Value);
            });
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag1[0].Type + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        /*************************EOF Flag1 : BusinessRevenue****************************************/
        /*************************Flag2 : Cost Of Business Revenues****************************************/
        var RowsWithFlag2 = pIncomeStatement.filter(f=>f.Flag == 2);
        if (RowsWithFlag2.length > 0) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            $.each(RowsWithFlag2, function (i, item) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pFlag2Total += parseFloat(item.Value);
            });
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag2[0].Type + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
        pTableHTML += '                 <tr class="" style="font-size:95%;">';
        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي الربح' + '</b></td>';
        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
        pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pTableHTML += '                 </tr>';
        /*************************Flag4 : General Expenses****************************************/
        var RowsWithFlag4 = pIncomeStatement.filter(f=>f.Flag == 4);
        if (RowsWithFlag4.length > 0) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'خصم' + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            $.each(RowsWithFlag4, function (i, item) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pFlag4Total += parseFloat(item.Value);
            });
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag4[0].Type + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        /*************************EOF Flag4 : General Expenses****************************************/
        /*************************Flag3 : Other Revenues****************************************/
        var RowsWithFlag3 = pIncomeStatement.filter(f=>f.Flag == 3);
        if (RowsWithFlag3.length > 0) {
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'إضافة' + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                 </tr>';
            $.each(RowsWithFlag3, function (i, item) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pFlag3Total += parseFloat(item.Value);
            });
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag3[0].Type + '</u></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        /*************************EOF Flag3 : Other Revenues****************************************/
        pTableHTML += '                 <tr class="" style="font-size:95%;">';
        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'صافي الربح' + '</b></td>';
        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
        pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        pTableHTML += '                 </tr>';
    }
    pTableHTML += '                 </tbody>';
    pTableHTML += '             </table>';

    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
    //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
    //pRowTotalsHTML += '                         </tr>';
    $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
    }
if (pOutputTo == "Excel") {
    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement");
}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        //ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '     <head>';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';

        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '<div id="hExportedTable" class="hide"></div>';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblIncomeStatement").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

        ReportHTML += '         <body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblIncomeStatement").html();
        ReportHTML += '             </table>';

        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

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
}
function IncomeStatement_DrawReport_Nile(pData, pOutputTo) {
    debugger;

        var pDefaultsHeader = JSON.parse(pData[0]);
        var pIncomeStatement = JSON.parse(pData[1]);

        var BySummary = $("#cbBySummary").prop("checked");

        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var pFlag1Total = 0;
        var pFlag2Total = 0;
        var pFlag3Total = 0;
        var pFlag4Total = 0;
        var pFlag5Total = 0;
        var pFlag6Total = 0;
        var pTableHTML = "";

        var arr_m = [];
        var arr = [];

        var arr_m_total = new Array();
       //arr_m_total.find(x => x.Month == 40 && x.title =='Flag1Total').Total
       pIncomeStatement.reduce(function (a, d) {
           if (
               a.indexOf(d.Month) === -1) {
               arr_m.push(d.Month);
            }
           return arr_m;
     }, []);

    for (var i = 0; i < arr_m.length; i++) {
        arr.push({ 'Month': arr_m[i], 'Total': 0 });
    }

    for (var i = 0; i < arr_m.length; i++) {
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag1Total' });
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag2Total' });
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag3Total' });
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag4Total' });
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag5Total' });
        arr_m_total.push({ "Month": arr_m[i], "Total": 0, "Type": 'Flag6Total' });
    }
 

        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            pTableHTML += '             <table id="tblIncomeStatement" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            pTableHTML += '                     <tr class="" style="">';
            pTableHTML += '                         <th class="">' + 'Description' + '</th>';
            for (var i = 0; i < arr.length; i++) {
               // pTableHTML += '                     <th class="">' + arr[i] + '</th>';
                pTableHTML += '                     <th class="">' + arr[i]['Month'] + '</th>';
            }
            pTableHTML += '                         <th class="">' + 'Total' + '</thb>';
            pTableHTML += '                     </tr>'
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pIncomeStatement != null) {
                /*************************Flag1 : BusinessRevenue****************************************/
                var RowsWithFlag1 = pIncomeStatement.filter(f => f.Flag == 1);
                var arrAccounts = [];
                   pIncomeStatement.filter(f => f.Flag == 1).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts.push(d.Account_Name);
                    }
                    return arrAccounts;
                }, []);
                if (RowsWithFlag1.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    }
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    //$.each(RowsWithFlag1, function (i, item) {
                    var pTotalRow = 0;
                    for (var k = 0; k < arrAccounts.length; k++) {
                        pTableHTML += '                 <tr style="font-size:95%;" class= "' + (BySummary ? "hide" : " ") + '">';
                        pTotalRow = 0;
                        pTableHTML += '                     <th class="">' + arrAccounts[k] + '</th>';
                            for (var i = 0; i < arr.length; i++) {
                                var RowsAccountMonth = pIncomeStatement.filter(f => f.Flag == 1 && f.Account_Name == arrAccounts[k] && f.Month == arr[i]['Month']);
                                if (RowsAccountMonth.length > 0) {
                                    pTableHTML += '                     <th class="">' + RowsAccountMonth[0].Value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                                    pTotalRow += RowsAccountMonth[0].Value;
                                    arr[i]['Total'] += RowsAccountMonth[0].Value;
                                    debugger;
                                    arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag1Total').Total += RowsAccountMonth[0].Value;
                                }
                                else
                                    pTableHTML += '                     <th class="">' +'-' + '</th>';
                            }
                            pTableHTML += '                     <td class="" style="">' + pTotalRow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pFlag1Total += parseFloat(pTotalRow);
                            pTableHTML += '                 </tr>';
                        }
                   
                    //});
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag1[0].Type + '</u></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + arr[i]['Total'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    }
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag1 : BusinessRevenue****************************************/
                /*************************Flag2 : Cost Of Business Revenues****************************************/
                var RowsWithFlag2 = pIncomeStatement.filter(f => f.Flag == 2);
                var arrAccounts2 = [];
                pIncomeStatement.filter(f => f.Flag == 2).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts2.push(d.Account_Name);
                    }
                    return arrAccounts2;
                }, []);
                if (RowsWithFlag2.length > 0) {

                    for (var i = 0; i < arr_m.length; i++) {
                        arr[i]['Total'] = 0;
                    }

                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    }
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                   // pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    var pTotalRow = 0;
                    for (var k = 0; k < arrAccounts2.length; k++) {
                        pTableHTML += '                 <tr style="font-size:95%;" class= "' + (BySummary ? "hide" : " ") + '">';
                        pTotalRow = 0;
                        pTableHTML += '                     <th class="">' + arrAccounts2[k] + '</th>';
                        for (var i = 0; i < arr.length; i++) {
                            var RowsAccountMonth = pIncomeStatement.filter(f => f.Flag == 2 && f.Account_Name == arrAccounts2[k] && f.Month == arr[i]['Month']);
                            if (RowsAccountMonth.length > 0) {
                                pTableHTML += '                     <th class="">' + RowsAccountMonth[0].Value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                                pTotalRow += RowsAccountMonth[0].Value;
                                arr[i]['Total'] += RowsAccountMonth[0].Value;
                                arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total += RowsAccountMonth[0].Value;
                            }
                            else
                                pTableHTML += '                     <th class="">' + '-' + '</th>';
                        }
                        pTableHTML += '                     <td class="" style="">' + pTotalRow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pFlag2Total += parseFloat(pTotalRow);
                        pTableHTML += '                 </tr>';
                    }

                    //});
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag2[0].Type + '</u></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + arr[i]['Total'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    }
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag2 : Total Gross Profit****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total Gross Profit' + '</b></td>';
                var pFlag1Total_M = 0;
                var pFlag2Total_M = 0;
                for (var i = 0; i < arr.length; i++) {
                    pFlag1Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag1Total').Total
                    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
                    pTableHTML += '                     <td class="" style="">' + (pFlag1Total_M - pFlag2Total_M).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                }
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';

                 ///*************************Flag3 : General Expenses****************************************/
                var RowsWithFlag3 = pIncomeStatement.filter(f => f.Flag == 3);
                var arrAccounts3 = [];
                pIncomeStatement.filter(f => f.Flag == 3).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts3.push(d.Account_Name);
                    }
                    return arrAccounts3;
                }, []);
                if (RowsWithFlag3.length > 0) {
                    for (var i = 0; i < arr_m.length; i++) {
                        arr[i]['Total'] = 0;
                    }

                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    }
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    var pTotalRow = 0;
                    for (var k = 0; k < arrAccounts3.length; k++) {
                        pTotalRow = 0;
                        pTableHTML += '                 <tr style="font-size:95%;" class= "' + (BySummary ? "hide" : " ") + '">';
                        pTableHTML += '                     <th class="">' + arrAccounts3[k] + '</th>';
                        for (var i = 0; i < arr.length; i++) {
                            var RowsAccountMonth = pIncomeStatement.filter(f => f.Flag == 3 && f.Account_Name == arrAccounts3[k] && f.Month == arr[i]['Month']);
                            if (RowsAccountMonth.length > 0) {
                                pTableHTML += '                     <th class="">' + RowsAccountMonth[0].Value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                                pTotalRow += RowsAccountMonth[0].Value;
                                arr[i]['Total'] += RowsAccountMonth[0].Value;
                                arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag3Total').Total += RowsAccountMonth[0].Value;

                            }
                            else
                                pTableHTML += '                     <th class="">' + '-' + '</th>';
                        }
                        pTableHTML += '                     <td class="" style="">' + pTotalRow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pFlag3Total += parseFloat(pTotalRow);
                        pTableHTML += '                 </tr>';
                    }

                    //});
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + arr[i]['Total'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    }
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                ///*************************Flag4 : Other Income****************************************/
                var RowsWithFlag4 = pIncomeStatement.filter(f => f.Flag == 4);
                var arrAccounts4 = [];
                pIncomeStatement.filter(f => f.Flag == 4).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts4.push(d.Account_Name);
                    }
                    return arrAccounts4;
                }, []);
                if (RowsWithFlag4.length > 0) {
                    for (var i = 0; i < arr_m.length; i++) {
                        arr[i]['Total'] = 0;
                    }
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    }
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    var pTotalRow = 0;
                    for (var k = 0; k < arrAccounts4.length; k++) {
                        pTotalRow = 0;
                        pTableHTML += '                     <th class="">' + arrAccounts4[k] + '</th>';
                        for (var i = 0; i < arr.length; i++) {
                            var RowsAccountMonth = pIncomeStatement.filter(f => f.Flag == 4 && f.Account_Name == arrAccounts4[k] && f.Month == arr[i]['Month']);
                            if (RowsAccountMonth.length > 0) {
                                pTableHTML += '                     <th class="">' + RowsAccountMonth[0].Value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                                pTotalRow += RowsAccountMonth[0].Value;
                                arr[i]['Total'] += RowsAccountMonth[0].Value;
                                arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag4Total').Total += RowsAccountMonth[0].Value;

                            }
                            else
                                pTableHTML += '                     <th class="">' + '-' + '</th>';
                        }
                        pTableHTML += '                     <td class="" style="">' + pTotalRow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pFlag4Total += parseFloat(pTotalRow);
                        pTableHTML += '                 </tr>';
                    }

                    //});
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + arr[i]['Total'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    }
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                ///*************************Flag5 : Earnings Before Interest and Taxes EBIT****************************************/
                //Total Cost of Sales
                //Dedcut
                //Total General And Administrative Ex
                //Add
                //Total Other Income 
                //(pFlag2Total - pFlag3Total) + pFlag4Total
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b>' + ' Earnings Before Interest and Taxes EBIT' + '</b></td>';
                var pFlag2Total_M = 0;
                var pFlag3Total_M = 0;
                var pFlag4Total_M = 0;
                for (var i = 0; i < arr.length; i++) {
                   // pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
                    pFlag3Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag3Total').Total
                    pFlag4Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag4Total').Total
                   pTableHTML += '                     <td class="" style="">' + ((pFlag2Total_M - pFlag3Total_M) + pFlag4Total_M).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                }
                pTableHTML += '                     <td class="" style=""><b>' + ((pFlag2Total - pFlag3Total) + pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
                var RowsWithFlag5 = pIncomeStatement.filter(f => f.Flag == 5);
                var arrAccounts5 = [];
                pIncomeStatement.filter(f => f.Flag == 5).reduce(function (a, d) {
                    if (a.indexOf(d.Account_Name) === -1) {
                        arrAccounts5.push(d.Account_Name);
                    }
                    return arrAccounts5;
                }, []);
                if (RowsWithFlag5.length > 0) {
                    for (var i = 0; i < arr_m.length; i++) {
                        arr[i]['Total'] = 0;
                    }
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + '' + '</u></b></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    }
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    var pTotalRow = 0;
                    for (var k = 0; k < arrAccounts5.length; k++) {
                        pTotalRow = 0;
                        pTableHTML += '                     <th class="">' + arrAccounts5[k] + '</th>';
                        for (var i = 0; i < arr.length; i++) {
                            var RowsAccountMonth = pIncomeStatement.filter(f => f.Flag == 5 && f.Account_Name == arrAccounts5[k] && f.Month == arr[i]['Month']);
                            if (RowsAccountMonth.length > 0) {
                                pTableHTML += '                     <th class="">' + RowsAccountMonth[0].Value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                                pTotalRow += RowsAccountMonth[0].Value;
                                arr[i]['Total'] += RowsAccountMonth[0].Value;
                                arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag5Total').Total += RowsAccountMonth[0].Value;

                            }
                            else
                                pTableHTML += '                     <th class="">' + '-' + '</th>';
                        }
                        pTableHTML += '                     <td class="" style="">' + pTotalRow.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pFlag5Total += parseFloat(pTotalRow);
                        pTableHTML += '                 </tr>';
                    }

                    //});
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + '' + '</u></td>';
                    for (var i = 0; i < arr.length; i++) {
                        pTableHTML += '                     <td class="" style="">' + arr[i]['Total'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    }
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag5Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }

  
                ///*************************Flag6 : Earnings Before Tax (EBT) ****************************************/
                //Total Cost of Sales
                //Dedcut
                //Total General And Administrative Ex
                //Add
                //Total Other Income 
               // Add
               // CREDIT INTEREST - فوائد بنكية

                //(pFlag2Total - pFlag3Total) + pFlag4Total +pFlag5Total
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b>' + 'Earnings Before Tax (EBT) ' + '</b></td>';
                var pFlag2Total_M = 0;
                var pFlag3Total_M = 0;
                var pFlag4Total_M = 0;
                var pFlag5Total_M = 0;
                for (var i = 0; i < arr.length; i++) {
                    // pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
                    pFlag3Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag3Total').Total
                    pFlag4Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag4Total').Total
                    pFlag5Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag5Total').Total
                    pTableHTML += '                     <td class="" style="">' + ((pFlag2Total_M - pFlag3Total_M) + pFlag4Total_M + pFlag5Total_M).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                }
                pTableHTML += '                     <td class="" style=""><b>' + ((pFlag2Total - pFlag3Total) + pFlag4Total + pFlag5Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';

                    ///*************************Flag7 : Income tax ****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b>' + 'Income tax ' + '</b></td>';
                var pFlag2Total_M = 0;
                var pFlag3Total_M = 0;
                var pFlag4Total_M = 0;
                var pFlag5Total_M = 0;
                for (var i = 0; i < arr.length; i++) {
                    pTableHTML += '                     <td class="" style="">' + '-' + '</td>';
                }
                pTableHTML += '                     <td class="" style=""><b>' +
                  ((  ((pFlag2Total - pFlag3Total) + pFlag4Total + pFlag5Total) * 22.5 ) /100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    + '</b></td>';
                pTableHTML += '                 </tr>';
                ///*************************Net Income ****************************************/

                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b>' + 'Net Income ' + '</b></td>';
                var pFlag1Total_M = 0;
                var pFlag2Total_M = 0;
                var pFlag3Total_M = 0;
                var pFlag4Total_M = 0;
                var pFlag5Total_M = 0;
                for (var i = 0; i < arr.length; i++) {
                    // pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pFlag1Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag1Total').Total
                    pFlag2Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag2Total').Total
                    pFlag3Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag3Total').Total
                    pFlag4Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag4Total').Total
                    pFlag5Total_M = arr_m_total.find(x => x.Month == arr[i]['Month'] && x.Type == 'Flag5Total').Total
                    var pSum = ((pFlag2Total_M - pFlag3Total_M) + pFlag4Total_M + pFlag5Total_M + pFlag1Total_M);
                    pTableHTML += '                     <td class="" style="">' + pSum .toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                }
                var pSumTotal = ((pFlag2Total - pFlag3Total) + pFlag4Total + pFlag5Total + pFlag1Total);
                pTableHTML += '                     <td class="" style=""><b>' + (pSumTotal - 
                    ((((pFlag2Total - pFlag3Total) + pFlag4Total + pFlag5Total) * 22.5) / 100)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';






                ///*************************Flag4 : General Expenses****************************************/
                //var RowsWithFlag4 = pIncomeStatement.filter(f => f.Flag == 4);
                //if (RowsWithFlag4.length > 0) {
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Deduct' + '</u></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                 </tr>';
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                 </tr>';
                //    $.each(RowsWithFlag4, function (i, item) {
                //        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //        //pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                //        pTableHTML += '                     <td class="" style="text-align:left;">'
                //            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                //            + + item.Account_Name + "'" + ');" >'
                //            + '<span><br>'
                //            + '&emsp;&emsp;' + item.Account_Name
                //            + '</span>'
                //            + '</td></a> ';
                //        pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //        pTableHTML += '                 </tr>';
                //        pFlag4Total += parseFloat(item.Value);
                //    });
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                //    pTableHTML += '                 </tr>';
                //}
                ///*************************EOF Flag4 : General Expenses****************************************/
                ///*************************Flag3 : Other Revenues****************************************/
                //var RowsWithFlag3 = pIncomeStatement.filter(f => f.Flag == 3);
                //if (RowsWithFlag3.length > 0) {
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Add' + '</u></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                 </tr>';
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                 </tr>';
                //    $.each(RowsWithFlag3, function (i, item) {
                //        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //        // pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                //        pTableHTML += '                     <td class="" style="text-align:left;">'
                //            + '<a href="#" onclick="AccountLedger_Print(' + item.Account_ID + ",'" + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                //            + + item.Account_Name + "'" + ');" >'
                //            + '<span><br>'
                //            + '&emsp;&emsp;' + item.Account_Name
                //            + '</span>'
                //            + '</td></a> ';
                //        pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                //        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //        pTableHTML += '                 </tr>';
                //        pFlag3Total += parseFloat(item.Value);
                //    });
                //    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                //    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //    pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                //    pTableHTML += '                 </tr>';
                //}
                ///*************************EOF Flag3 : Other Revenues****************************************/
                //pTableHTML += '                 <tr class="" style="font-size:95%;">';
                //pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Net Profit' + '</b></td>';
                //pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                //pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                //pTableHTML += '                 </tr>';
            }
            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';

            $("#hExportedTable").html(pTableHTML);
            debugger;
            //Totals row
            var pRowTotalsHTML = "";
            //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
            //pRowTotalsHTML += '                         </tr>';
            $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
        }

        if (pOutputTo == "Excel") {
          //  ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement");
            ReportHTML = "";
            ReportHTML += '<html dir="rtl">';

            ReportHTML += '     <head><title>' + '' + '</title></head>';
            ReportHTML += '         <body">';
            ReportHTML += '         <div id="ReportBody">';

            ReportHTML += '                     <table id="tblHeaderDate' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblIncomeStatement").html();
            ReportHTML += '                     </table>';

            $("#hExportedTable").html(ReportHTML);

            var $table = $("#ReportBody");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "IncomeStatement" + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                ReportHTML += '<html>';
                //ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '     <head>';
                ReportHTML += AddScripts;
                ReportHTML += '</head>';
                ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';

                ReportHTML += AddScripts;
                ReportHTML += '</head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '<div id="hExportedTable" class="hide"></div>';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblIncomeStatement").html();
                ReportHTML += '             </table>';

                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

                ReportHTML += '         <body>';
                //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //ReportHTML += '     </footer>';
                ReportHTML += '</html>';
            }
            else {
                ReportHTML += '<html dir="rtl">';
                ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
                ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                ReportHTML += '             </div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';

                //ReportHTML += pTablesHTML; //Add table html in the next lines
                ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += '             ' + $("#tblIncomeStatement").html();
                ReportHTML += '             </table>';

                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

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

function IncomeStatement_DrawReportByCostCenter(pData, pOutputTo)
{
    debugger;
    if ($("#slCurrency").val() > 0)
    {
        var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
        var pDefaultsHeader = JSON.parse(pData[0]);
        //var pIncomeStatement = JSON.parse(pData[1]);
        var pIncomeStatementByCostCenter = JSON.parse(pData[2]);
        //var pIncomeStatementByCostCenterByCurrency = JSON.parse(pData[2]);

        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var pFlag1Total = 0;
        var pFlag2Total = 0;
        var pFlag3Total = 0;
        var pFlag4Total = 0;
        var ArrCostCenterIDList = pCostCenterIDList.split(',');
        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                pFlag1Total = 0;
                pFlag2Total = 0;
                pFlag3Total = 0;
                pFlag4Total = 0;

                pTableHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTableHTML += '                 <thead class="" style="">'
                pTableHTML += '                     <tr class="" style="">';
                pTableHTML += '                         <th class="">' + 'Description' + '</th>';
                pTableHTML += '                         <th class="">' + 'Partial' + '</thb>';
                pTableHTML += '                         <th class="">' + 'Total' + '</thb>';
                pTableHTML += '                     </tr>'
                pTableHTML += '                 </thead>';
                pTableHTML += '                 <tbody>';
                if (pIncomeStatementByCostCenter != null) {
                    /*************************Flag1 : BusinessRevenue****************************************/
                    var RowsWithFlag1 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 1);
                    if (RowsWithFlag1.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag1, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag1Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag1[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag1 : BusinessRevenue****************************************/
                    /*************************Flag2 : Cost Of Business Revenues****************************************/
                    var RowsWithFlag2 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 2);
                    if (RowsWithFlag2.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag2, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag2Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag2[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Gross Profit' + '</b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                    /*************************Flag4 : General Expenses****************************************/
                    var RowsWithFlag4 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 4);
                    if (RowsWithFlag4.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Deduct' + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag4, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag4Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag4 : General Expenses****************************************/
                    /*************************Flag3 : Other Revenues****************************************/
                    var RowsWithFlag3 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 3);
                    if (RowsWithFlag3.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Add' + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag3, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag3Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag3 : Other Revenues****************************************/
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Net Profit' + '</b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                pTableHTML += '                 </tbody>';
                pTableHTML += '             </table>';
            }
            $("#hExportedTable").html(pTableHTML);
            debugger;
            //Totals row
            var pRowTotalsHTML = "";
            //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
            //pRowTotalsHTML += '                         </tr>';
            $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
        }
        else {
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                pFlag1Total = 0;
                pFlag2Total = 0;
                pFlag3Total = 0;
                pFlag4Total = 0;

                pTableHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                pTableHTML += '                 <thead class="" style="">'
                pTableHTML += '                     <tr class="" style="">';
                pTableHTML += '                         <th class="">' + 'الوصف' + '</th>';
                pTableHTML += '                         <th class="">' + 'جزئي' + '</thb>';
                pTableHTML += '                         <th class="">' + 'إجمالي' + '</thb>';
                pTableHTML += '                     </tr>'
                pTableHTML += '                 </thead>';
                pTableHTML += '                 <tbody>';
                if (pIncomeStatementByCostCenter != null) {
                    /*************************Flag1 : BusinessRevenue****************************************/
                    var RowsWithFlag1 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 1);
                    if (RowsWithFlag1.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag1, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag1Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag1[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag1 : BusinessRevenue****************************************/
                    /*************************Flag2 : Cost Of Business Revenues****************************************/
                    var RowsWithFlag2 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 2);
                    if (RowsWithFlag2.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag2, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag2Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag2[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي الربح' + '</b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                    /*************************Flag4 : General Expenses****************************************/
                    var RowsWithFlag4 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 4);
                    if (RowsWithFlag4.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'خصم' + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag4, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag4Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag4[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag4 : General Expenses****************************************/
                    /*************************Flag3 : Other Revenues****************************************/
                    var RowsWithFlag3 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 3);
                    if (RowsWithFlag3.length > 0) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'إضافة' + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        $.each(RowsWithFlag3, function (i, item) {
                            if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                                pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                                pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                                pTableHTML += '                 </tr>';
                                pFlag3Total += parseFloat(item.Value);
                            }
                        });
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag3[0].Type + '</u></td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                        pTableHTML += '                 </tr>';
                    }
                    /*************************EOF Flag3 : Other Revenues****************************************/
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'صافي الربح' + '</b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                pTableHTML += '                 </tbody>';
                pTableHTML += '             </table>';
            }
            $("#hExportedTable").html(pTableHTML);
            debugger;
            //Totals row
            var pRowTotalsHTML = "";
            //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
            //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
            //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
            //pRowTotalsHTML += '                         </tr>';
            $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
        }
        if (pOutputTo == "Excel") {
            for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
            }

        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';

                for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
                    ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';

                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';
                    // ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

                ReportHTML += '         <body>';
                //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                //ReportHTML += '     </footer>';
                ReportHTML += '</html>';
            }
            else {
                ReportHTML += '<html dir="rtl">';
                ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';

                for (var k = 0; k < ArrCostCenterIDList.length; k++) {
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
                    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
                    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
                    ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
                    ReportHTML += '             </div>';

                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';
                    // ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';

                }
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

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
    else
    {
        var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
        var pDefaultsHeader = JSON.parse(pData[0]);
        //var pIncomeStatement = JSON.parse(pData[1]);
        var pIncomeStatementByCostCenter = JSON.parse(pData[1]);
        //var pIncomeStatementByCostCenterByCurrency = JSON.parse(pData[2]);

        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        var pFormattedPrintTime = getTime();
        var pFlag1Total = 0;
        var pFlag2Total = 0;
        var pFlag3Total = 0;
        var pFlag4Total = 0;
        var ArrCostCenterIDList = pCostCenterIDList.split(',');
        //pDescriptionOfGoods.replace(/\n/g, "<br />")
        //ReportHTML += '<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>';
        //ReportHTML += '<hr style="width:100%;height:0px;border:.5px solid #000;">';
        var pTableHTML = "";
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            pFlag1Total = 0;
            pFlag2Total = 0;
            pFlag3Total = 0;
            pFlag4Total = 0;

            pTableHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTableHTML += '                 <thead class="" style="">'
            pTableHTML += '                     <tr class="" style="">';
            pTableHTML += '                         <th class="">' + 'Description' + '</th>';
            pTableHTML += '                         <th class="">' + 'Partial' + '</thb>';
            pTableHTML += '                         <th class="">' + 'Total' + '</thb>';
            pTableHTML += '                     </tr>'
            pTableHTML += '                 </thead>';
            pTableHTML += '                 <tbody>';
            if (pIncomeStatementByCostCenter != null) {
                /*************************Flag1 : BusinessRevenue****************************************/
                var RowsWithFlag1 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 1);
                if (RowsWithFlag1.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag1, function (i, item) {
                        if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                            pTableHTML += '                 </tr>';
                            pFlag1Total += parseFloat(item.Value);
                        }
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag1[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag1 : BusinessRevenue****************************************/
                /*************************Flag2 : Cost Of Business Revenues****************************************/
                var RowsWithFlag2 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 2);
                if (RowsWithFlag2.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag2, function (i, item) {
                        if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                            pTableHTML += '                 </tr>';
                            pFlag2Total += parseFloat(item.Value);
                        }
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag2[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Gross Profit' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
                /*************************Flag4 : General Expenses****************************************/
                var RowsWithFlag4 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 4);
                if (RowsWithFlag4.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Deduct' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag4, function (i, item) {
                        if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                            pTableHTML += '                 </tr>';
                            pFlag4Total += parseFloat(item.Value);
                        }
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag4[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag4 : General Expenses****************************************/
                /*************************Flag3 : Other Revenues****************************************/
                var RowsWithFlag3 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 3);
                if (RowsWithFlag3.length > 0) {
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'Add' + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                 </tr>';
                    $.each(RowsWithFlag3, function (i, item) {
                        if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                            pTableHTML += '                 <tr class="" style="font-size:95%;">';
                            pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                            pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                            pTableHTML += '                 </tr>';
                            pFlag3Total += parseFloat(item.Value);
                        }
                    });
                    pTableHTML += '                 <tr class="" style="font-size:95%;">';
                    pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Total ' + RowsWithFlag3[0].Type + '</u></td>';
                    pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                    pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                    pTableHTML += '                 </tr>';
                }
                /*************************EOF Flag3 : Other Revenues****************************************/
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'Net Profit' + '</b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            pTableHTML += '                 </tbody>';
            pTableHTML += '             </table>';
        }
        $("#hExportedTable").html(pTableHTML);
        debugger;
        //Totals row
        var pRowTotalsHTML = "";
        //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
        //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
        //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
        //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
        //pRowTotalsHTML += '                         </tr>';
        $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
    }
else {
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        pFlag1Total = 0;
        pFlag2Total = 0;
        pFlag3Total = 0;
        pFlag4Total = 0;

        pTableHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        pTableHTML += '                 <thead class="" style="">'
        pTableHTML += '                     <tr class="" style="">';
        pTableHTML += '                         <th class="">' + 'الوصف' + '</th>';
        pTableHTML += '                         <th class="">' + 'جزئي' + '</thb>';
        pTableHTML += '                         <th class="">' + 'إجمالي' + '</thb>';
        pTableHTML += '                     </tr>'
        pTableHTML += '                 </thead>';
        pTableHTML += '                 <tbody>';
        if (pIncomeStatementByCostCenter != null) {
            /*************************Flag1 : BusinessRevenue****************************************/
            var RowsWithFlag1 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 1);
            if (RowsWithFlag1.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag1[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag1, function (i, item) {
                    if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag1" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag1Total += parseFloat(item.Value);
                    }
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag1[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag1Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag1 : BusinessRevenue****************************************/
            /*************************Flag2 : Cost Of Business Revenues****************************************/
            var RowsWithFlag2 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 2);
            if (RowsWithFlag2.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag2[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag2, function (i, item) {
                    if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag2" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag2Total += parseFloat(item.Value);
                    }
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag2[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag2Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag2 : Cost Of Business Revenues****************************************/
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي الربح' + '</b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
            /*************************Flag4 : General Expenses****************************************/
            var RowsWithFlag4 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 4);
            if (RowsWithFlag4.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'خصم' + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag4[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag4, function (i, item) {
                    if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag4" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag4Total += parseFloat(item.Value);
                    }
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag4[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag4Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag4 : General Expenses****************************************/
            /*************************Flag3 : Other Revenues****************************************/
            var RowsWithFlag3 = pIncomeStatementByCostCenter.filter(f=>f.Flag == 3);
            if (RowsWithFlag3.length > 0) {
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:center;"><u>' + 'إضافة' + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:left;"><b><u>' + RowsWithFlag3[0].Type + '</u></b></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                 </tr>';
                $.each(RowsWithFlag3, function (i, item) {
                    if (item.CostCenterName.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim()) {
                        pTableHTML += '                 <tr class="" style="font-size:95%;">';
                        pTableHTML += '                     <td class="" style="text-align:left;">' + item.Account_Name + '</td>';
                        pTableHTML += '                     <td class="Flag3" style="">' + (item.Value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                        pTableHTML += '                 </tr>';
                        pFlag3Total += parseFloat(item.Value);
                    }
                });
                pTableHTML += '                 <tr class="" style="font-size:95%;">';
                pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'إجمالي ' + RowsWithFlag3[0].Type + '</u></td>';
                pTableHTML += '                     <td class="" style="">' + '' + '</td>';
                pTableHTML += '                     <td class="" style=""><b>' + pFlag3Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
                pTableHTML += '                 </tr>';
            }
            /*************************EOF Flag3 : Other Revenues****************************************/
            pTableHTML += '                 <tr class="" style="font-size:95%;">';
            pTableHTML += '                     <td class="" style="text-align:right;"><b>' + 'صافي الربح' + '</b></td>';
            pTableHTML += '                     <td class="" style="">' + '' + '</td>';
            pTableHTML += '                     <td class="" style=""><b>' + (pFlag1Total - pFlag2Total + pFlag3Total - pFlag4Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
            pTableHTML += '                 </tr>';
        }
        pTableHTML += '                 </tbody>';
        pTableHTML += '             </table>';
    }
    $("#hExportedTable").html(pTableHTML);
    debugger;
    //Totals row
    var pRowTotalsHTML = "";
    //var ProfitAndLossTotal = GetColumnSum("tblIncomeStatement", "ProfitAndLoss");
    //pRowTotalsHTML += '                         <tr class="" style="font-size:95%;">';
    //pRowTotalsHTML += '                             <td style="text-align:center;"><b><u>' + 'Profit & Loss :</u> ' + ProfitAndLossTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b></td>';
    //pRowTotalsHTML += '                             <td style="text-align:left;"><b><u>' + '' + '</td>';
    //pRowTotalsHTML += '                         </tr>';
    $("#tblIncomeStatement tbody").append(pRowTotalsHTML);
    }

if (pOutputTo == "Excel") {
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
    }

}
else {
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Income Statement' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';

    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        ReportHTML += '         <div class="break"></div>';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Income Statement</u></b>' + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';

        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

        ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';
        // ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
        ReportHTML += '             </table>';

    }
    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

    ReportHTML += '         <body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    //ReportHTML += '     </footer>';
    ReportHTML += '</html>';
}
else {
    ReportHTML += '<html dir="rtl">';
ReportHTML += '     <head><title>' + 'قائمة الدخل' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
ReportHTML += '         <body style="background-color:white;">';

for (var k = 0; k < ArrCostCenterIDList.length; k++) {
    ReportHTML += '         <div class="break"></div>';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>قائمة الدخل</u></b>' + '</div>';
    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
    //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
    ReportHTML += '             </div>';

    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

    ReportHTML += '             <div class="col-xs-12"><h4><b>' + '</b>' + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")" + '</h4></div>';
    //ReportHTML += pTablesHTML; //Add table html in the next lines
    ReportHTML += '             <table id="tblIncomeStatement' + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';
    // ReportHTML += '             <table id="tblIncomeStatement' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    ReportHTML += '             ' + $("#tblIncomeStatement" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
    ReportHTML += '             </table>';

}
//ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pIncomeStatement.length + '</div>';

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
}


function AccountLedger_Print(pAccountID, pFromDate, pToDate, pAccountName, event) {
    debugger;

    if (event != undefined)
        event.preventDefault();

    var pOutputTo = 'Print';
    var pAccountIDList = pAccountID;    //GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = -1;//GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    if (pAccountIDList == "")
        swal("Sorry", "Please, select at least one account .");
    else {
        FadePageCover(true);

        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pCostCenterIDList: -1   // pCostCenterIDList
            , pJournalTypeIDList: -1  //pJournalTypeIDList
            , pFromDate: pFromDate // $("#txtFromDate").val()
            , pToDate: pToDate //$("#txtToDate").val()
            , pPostStatus: -1  //$("#slStatus").val()
            , pIsGroupByCostCenter: false   //$("#cbIsByCostCenter").prop("checked")
            , pIsGroupByBranch: false
            , pWithOtherSide: false
            , pBranchIDList: -1
        };
        CallGETFunctionWithParameters("/api/AccountLedger/GetPrintedData", pParametersWithValues
            , function (pData) {
                AccountLedger_Print_Detailed(pData, pOutputTo, pAccountIDList, pFromDate, pToDate, pAccountName);
            }
            , null);
    }
}
function AccountLedger_Print_Detailed(pData, pOutputTo, pAccountID, pFromDate, pToDate, pAccountName) {
    debugger;
    //var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = -1;//GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");


    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = new Array();
    ArrAccountIDList.push(pAccountID);//pAccountIDList.split(',');

    var ShowSubAccount = 0;

    var Suppress = 0;// $("#cbSuppressForZeroes").prop("checked");
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
        pTablesHTML += '                     <th class="">' + 'JV Type' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
        if (ShowSubAccount)
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
                        pTablesHTML += '                 <td class="" colspan=' + (ShowSubAccount ? '13' : '12') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';
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
                        if (ShowSubAccount)
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';//SubAccount
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
                    if (ShowSubAccount)
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccountName + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.description + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="FBalance">' + FBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';//FBalance
                    pTablesHTML += '                     <td style="text-align:center;" class="Posted hide">' + (item.Posted ? (item.LocalDebit - item.LocalCredit).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0) + '</td>';
                    pTablesHTML += '                 </tr>';
                } //normal rows
            } //of if (item.Account_ID == ArrAccountIDList[j])
        });
        //pTablesHTML += '                 </tbody>';
        //pTablesHTML += '             </table>';
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
        if (ShowSubAccount)
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
        if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
            pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
        else
            pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
                (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
                // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                '</td>';
        pRowTotalsHTML += '                            </tr>';
        //$("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);

        pTablesHTML += pRowTotalsHTML;
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
    } //for (var j = 0; j < ArrAccountIDList.length; j++)
    if (pOutputTo == "Excel") {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x => x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
            }
        }
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += "   <div id='hExportedTable' class='hide'></div>";
        ReportHTML += '     <head>';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
        ReportHTML += AddScripts;
        ReportHTML += '</head>';
        ReportHTML += '         <body style="background-color:white;">';

        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var CurrentRows = pAccountLedger.filter(x => x.Account_ID == ArrAccountIDList[j] && (x.ID > 0 || x.Opening_Balance != 0));
            if (!Suppress || CurrentRows.length > 0) {
                ReportHTML += '         <div class="break"></div>';
                //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
                ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger</u></b>' + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + pFromDate + '</div>';
                ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + pToDate + '</div>';
                ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
                //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
                ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>'
                    + pAccountName
                    + '</h4></div>';
                //ReportHTML += pTablesHTML; //Add table html in the next lines
                // ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                ReportHTML += pTablesHTML;//  ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
                //ReportHTML += '             </table>';
                //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
            }
        } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        ReportHTML += '         </body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //ReportHTML += '     </footer>';
        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
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
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';

AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/IncomeStatement.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/SubReportFunction.js"></script>';
//AddScripts += '<script src="/Scripts/Accounting/Reports/AccountLedger.js"></script>';
//AddScripts += '<script src="/Scripts/Accounting/Transactions/JournalVouchers.js"></script>';