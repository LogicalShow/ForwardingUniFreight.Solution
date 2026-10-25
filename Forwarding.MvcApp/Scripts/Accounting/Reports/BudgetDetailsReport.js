//function cbCheckAllStoresChanged() {
//    debugger;
//    if ($("#cbCheckAllStores").prop("checked"))
//        $("#divCbStores input[name=nameCbStores]").prop("checked", true);
//    else
//        $("#divCbStores input[name=nameCbStores]").prop("checked", false);
//}
$(document).ready(function () {
    // Define an array of months
    var months = [
        { ID: 1, Name: "January" },
        { ID: 2, Name: "February" },
        { ID: 3, Name: "March" },
        { ID: 4, Name: "April" },
        { ID: 5, Name: "May" },
        { ID: 6, Name: "June" },
        { ID: 7, Name: "July" },
        { ID: 8, Name: "August" },
        { ID: 9, Name: "September" },
        { ID: 10, Name: "October" },
        { ID: 11, Name: "November" },
        { ID: 12, Name: "December" }
    ];

    FillDivWithCheckboxes("divCbMonth", JSON.stringify(months), "nameCbMonths", 5, null);

});
function BudgetLedger_cbCheckAllBudgetsChanged() {
    debugger;
    if ($("#cbCheckAllBudgets").prop("checked"))
        $("#divCbBudget input[name=nameCbBudgets]").prop("checked", true);
    else
        $("#divCbBudget input[name=nameCbBudgets]").prop("checked", false);
}
function ChangePeriod() {


    if ($("#cbShowByPeriod").prop("checked")) {
        $(".ShowForPeriod").removeClass("hide");
        $(".HideForPeriod").addClass("hide");
        $("#cbShowByMonth").prop("checked", false);
    }
    else {
        $(".ShowForPeriod").addClass("hide");
        $(".HideForPeriod").removeClass("hide");
    }

    if ($("#cbShowByMonth").prop("checked")) {
        $(".ShowForMonth").removeClass("hide");
        $("#cbShowByPeriod").prop("checked", false);
    }
    else {
        $(".ShowForMonth").addClass("hide");
    }


}
function BudgetDetailsReport_Print(pOutputTo) {
    debugger;
    var pBudgetIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBudgets");
    var pMonthIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbMonths");

    if ($("#cbShowByPeriod").prop("checked") && pBudgetIDList == "")
        swal("Sorry", "Please, select Budget.");
    else if ($("#cbShowByPeriod").prop("checked") && ($('#txtFromDate').val() == '' || $('#txtToDate').val() == ''))
        swal("Sorry", "Please, select Date.");
    else if (!$("#cbShowByPeriod").prop("checked") && $('#slFiscalYearID').val() == "0") {
        swal("Sorry", "Please, select Fiscal Year ");
    }
    else if (!$("#cbShowByPeriod").prop("checked")  &&  $('#slBudgetsID').val() == "0") {
        swal("Sorry", "Please, select Budget.");
    }
    else {
        FadePageCover(true);
        var pParametersWithValues =
        {
            pFiscalYearID:$("#cbShowByPeriod").prop("checked") ? "0" : $('#slFiscalYearID').val()
           , pBudgetID: $('#slBudgetsID').val() == "" ? 0 : $('#slBudgetsID').val()
           , pFromDate: $('#txtFromDate').val() == '' ? '1900-1-1' : ($('#txtFromDate').val())
           , pToDate: $('#txtToDate').val() == '' ? '1900-1-1' : ($('#txtToDate').val())
           , pBudgetIDList: pBudgetIDList
           , pByMonth: $("#cbShowByMonth").prop("checked") ? true : false
           , pMonthIDs: (pMonthIDList == '' ? '-1' : pMonthIDList)
        };

        CallGETFunctionWithParameters("/api/BudgetDetailsReport/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#cbShowByMonth").prop("checked"))
                    GetBudgetDetailsReportByMonth(pData, pOutputTo);
                   else
                     GetBudgetDetailsReport(pData, pOutputTo);
            }
            , null);
    }
}



function GetBudgetDetailsReport(pData, pOutputTo) {
    debugger;



    var TotalRevenue = 0.00;
    var TotalExpenses = 0.00;

    var TotalActualRevenue = 0.00;
    var TotalActualExpenses = 0.00;

    var TotalDiffRevenue = 0.00;
    var TotalDiffExpenses = 0.00;

    var ShowSubAccount = ($("#cbShowSubAccount").prop("checked"))

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[0]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Budget Details Report' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    ReportHTML += '<div id="ReportBody">'


    $(Data).each(function (i, item) {
        if (i == 0) {
            if( !$("#cbShowByPeriod").prop("checked")  )
                ReportHTML += ' <br> &nbsp; &nbsp; &nbsp;<b>FiscalYear : </b>' + item.FiscalYear + ' ' + ' <b> Budget :</b> ' + item.BudgetName;
            else
            {
                var listOfNames = "";

                listOfNames = GetAllSelectedTextSiblingsByNameAttr('nameCbBudgets');

                ReportHTML += ' <br> &nbsp; &nbsp; &nbsp;<b>FromDate : </b>' + $('#txtFromDate').val() + ' '
                + '  &nbsp; &nbsp; &nbsp;<b> ToDate :</b> ' + $('#txtToDate').val() + ' '
                + '<br> &nbsp; &nbsp; &nbsp; <b> Budget :</b> ' + listOfNames;
            }


            ReportHTML += '<br><h1 class="text-center"> Budget Details </h1>';
            ReportHTML += '<table id="tblBudgetDetails" class="table table-striped text-sm table-bordered ">';
            ReportHTML += '<thead>';
            ReportHTML += '<tr>';
            ReportHTML += '<th>Account Number</th> ';
            ReportHTML += '<th>Account Name</th> ';
            ReportHTML += "<th class=' " + (ShowSubAccount ? "" : "hide") + "'>" + 'SubAccount Name' + "</th>";
            ReportHTML += '<th>CostCenter</th> ';

            ReportHTML += '<th>Budget</th> ';
            ReportHTML += '<th>Actual Budget</th> ';
            ReportHTML += '<th>Diff</th> ';
            ReportHTML += '</tr> ';
            ReportHTML += '</thead>';
            ReportHTML += '<tbody>';
        }
        //abs(sum(aj.LocalDebit - aj.LocalCredit)) ActualBudget
        //    , a.Account_Name AccountName, a.Account_Number AccountNumber, b.Name BudgetName, fy.Fiscal_Year_Name FiscalYear,
        //        bfd.[Value] Budget
        ReportHTML += '<tr>';
        ReportHTML += '<td>' + item.AccountNumber + '</td> ';
        ReportHTML += '<td>' + item.AccountName + '</td> ';
        ReportHTML += "<td class=' " + (ShowSubAccount ? "" : "hide") + "'>" + item.SubAccountName + "</td>";
        ReportHTML += '<td>' + item.CostCenterName + '</td> ';

        ReportHTML += '<td>' + parseFloat(item.Budget).toFixed(2) + '</td> ';
        ReportHTML += '<td>' + parseFloat(item.ActualBudget).toFixed(2) + '</td> ';
        ReportHTML += '<td>' + parseFloat(item.Budget - item.ActualBudget).toFixed(2) + '</td> ';
        ReportHTML += '</tr>';


        if (item.AccountNumber.substring(0, 1) == "4") {
            TotalRevenue += item.Budget;
            TotalActualRevenue += item.ActualBudget;
            TotalDiffRevenue += item.Budget - item.ActualBudget;
        }
        else {
            TotalExpenses += item.Budget;
            TotalActualExpenses += item.ActualBudget;
            TotalDiffExpenses += item.Budget - item.ActualBudget;
        }



        if (Data.length == (i + 1)) {

            ReportHTML += '<tr>';
            ReportHTML += '<td><b>Total Revenue :<b></td> ';
            ReportHTML += '<td><b><b></td> ';
            ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
            ReportHTML += '<td><b><b></td> ';

            ReportHTML += '<td><b>' + parseFloat(TotalRevenue).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalActualRevenue).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalDiffRevenue).toFixed(2) + '</b></td> ';
            ReportHTML += '</tr>';


            ReportHTML += '<tr>';
            ReportHTML += '<td><b>Total Expenses : <b></td> ';
            ReportHTML += '<td><b><b></td> ';
            ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
            ReportHTML += '<td><b><b></td> ';

            ReportHTML += '<td><b>' + parseFloat(TotalExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalActualExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalDiffExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '</tr>';


            ReportHTML += '<tr>';
            ReportHTML += '<td><b>Difference :<b></td> ';
            ReportHTML += '<td><b><b></td> ';
            ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
            ReportHTML += '<td><b><b></td> ';

            ReportHTML += '<td><b>' + parseFloat(TotalRevenue - TotalExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalActualRevenue - TotalActualExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '<td><b>' + parseFloat(TotalDiffRevenue - TotalDiffExpenses).toFixed(2) + '</b></td> ';
            ReportHTML += '</tr>';



            ReportHTML += '</tbody></table>';
            ReportHTML += '</div>'
        }

    });
}
else {
    ReportHTML += '<html dir="rtl">';
ReportHTML += '     <head><title>' + 'تقرير التفاصيل الميزانية' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
ReportHTML += '         <body id="" style="background-color:white;">';
ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
ReportHTML += '             <div class="col-xs-12 "><b>تمت الطباعة :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
ReportHTML += '<div id="ReportBody">'


$(Data).each(function (i, item) {
    if (i == 0) {

        if (!$("#cbShowByPeriod").prop("checked"))
            ReportHTML += ' <br> <div class="col-xs-12 "><b>السنة المالية : </b>' + item.FiscalYear + ' ' + ' <b> الميزانية :</b> ' + item.BudgetName + '</div>';
        else {
            var listOfNames = "";

            listOfNames = GetAllSelectedTextSiblingsByNameAttr('nameCbBudgets');

            ReportHTML += ' <br> &nbsp; &nbsp; &nbsp;<b>من تاريخ : </b>' + $('#txtFromDate').val() + ' '
            + '  &nbsp; &nbsp; &nbsp;<b> إلى تاريخ :</b> ' + $('#txtToDate').val() + ' '
            + '<br> <b> الميزانية :</b> ' + listOfNames;
        }

       // ReportHTML += ' <br> <div class="col-xs-12 "><b>السنة المالية : </b>' + item.FiscalYear + ' ' + ' <b> الميزانية :</b> ' + item.BudgetName + '</div>';
        ReportHTML += '<br><h1 class="text-center"> تفاصيل الميزانية </h1>';
        ReportHTML += '<table id="tblBudgetDetails" class="table table-striped text-sm table-bordered ">';
        ReportHTML += '<thead>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>رقم الحساب</th> ';
        ReportHTML += '<th>إسم الحساب</th> ';
        ReportHTML += "<th class=' " + (ShowSubAccount ? "" : "hide") + "'>" + 'الحساب التحليلي' + "</th>";
        ReportHTML += '<th>مركز التكلفة</th> ';

        ReportHTML += '<th>الميزانية</th> ';
        ReportHTML += '<th>الميزانية الفعلية</th> ';
        ReportHTML += '<th>الفرق</th> ';
        ReportHTML += '</tr> ';
        ReportHTML += '</thead>';
        ReportHTML += '<tbody>';
    }
    //abs(sum(aj.LocalDebit - aj.LocalCredit)) ActualBudget
    //    , a.Account_Name AccountName, a.Account_Number AccountNumber, b.Name BudgetName, fy.Fiscal_Year_Name FiscalYear,
    //        bfd.[Value] Budget
    ReportHTML += '<tr>';
    ReportHTML += '<td>' + item.AccountNumber + '</td> ';
    ReportHTML += '<td>' + item.AccountName + '</td> ';
    ReportHTML += "<td class=' " + (ShowSubAccount ? "" : "hide") + "'>" + item.SubAccountName + "</td>";
    ReportHTML += '<td>' + item.CostCenterName + '</td> ';

    ReportHTML += '<td>' + parseFloat(item.Budget).toFixed(2) + '</td> ';
    ReportHTML += '<td>' + parseFloat(item.ActualBudget).toFixed(2) + '</td> ';
    ReportHTML += '<td>' + parseFloat(item.Budget - item.ActualBudget).toFixed(2) + '</td> ';
    ReportHTML += '</tr>';


    if (item.AccountNumber.substring(0, 1) == "4") {
        TotalRevenue += item.Budget;
        TotalActualRevenue += item.ActualBudget;
        TotalDiffRevenue += item.Budget - item.ActualBudget;
    }
    else {
        TotalExpenses += item.Budget;
        TotalActualExpenses += item.ActualBudget;
        TotalDiffExpenses += item.Budget - item.ActualBudget;
    }



    if (Data.length == (i + 1)) {

        ReportHTML += '<tr>';
        ReportHTML += '<td><b>إجمالي الإيرادات :<b></td> ';
        ReportHTML += '<td><b><b></td> ';
        ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
        ReportHTML += '<td><b><b></td> ';

        ReportHTML += '<td><b>' + parseFloat(TotalRevenue).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalActualRevenue).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalDiffRevenue).toFixed(2) + '</b></td> ';
        ReportHTML += '</tr>';


        ReportHTML += '<tr>';
        ReportHTML += '<td><b>إجمالي المصروفات : <b></td> ';
        ReportHTML += '<td><b><b></td> ';
        ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
        ReportHTML += '<td><b><b></td> ';

        ReportHTML += '<td><b>' + parseFloat(TotalExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalActualExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalDiffExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '</tr>';


        ReportHTML += '<tr>';
        ReportHTML += '<td><b>الفرق :<b></td> ';
        ReportHTML += '<td><b><b></td> ';
        ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
        ReportHTML += '<td><b><b></td> ';

        ReportHTML += '<td><b>' + parseFloat(TotalRevenue - TotalExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalActualRevenue - TotalActualExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '<td><b>' + parseFloat(TotalDiffRevenue - TotalDiffExpenses).toFixed(2) + '</b></td> ';
        ReportHTML += '</tr>';



        ReportHTML += '</tbody></table>';
        ReportHTML += '</div>'
    }

});
}

    console.log(ReportHTML);
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "BudgetDetails" + ".xls", // do include extension
                preserveColors: true // set to true if you want background colors and font colors preserved
            });
        }
        else {
            $table.table2excel({
                exclude: ".noExl",
                name: "ملف 1",
                filename: "تفاصيل الميزانية" + ".xls", // do include extension
                preserveColors: true // set to true if you want background colors and font colors preserved
            });
        }

    }






    FadePageCover(false);
}
function GetBudgetDetailsReportByMonth(pData, pOutputTo) {
    debugger;



    var TotalRevenue = 0.00;
    var TotalExpenses = 0.00;

    var TotalActualRevenue = 0.00;
    var TotalActualExpenses = 0.00;

    var TotalDiffRevenue = 0.00;
    var TotalDiffExpenses = 0.00;

    var ShowSubAccount = ($("#cbShowSubAccount").prop("checked"))

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[0]);

    var arr_m_total_Expense= new Array();
    var arr_m_total_Revenue = new Array();
    var arr_m_total_Diff = new Array();
    var arr_Month = [];

    Data.reduce(function (a, d) {
        if (a.indexOf(d.MonthID) === -1) {
            arr_Month.push(d.MonthID);
        }
        return arr_Month;
    }, []);

    for (var i = 0; i < arr_Month.length; i++) {
        arr_m_total_Expense.push({ "Month": arr_Month[i], "TotalBudget": 0, "TotalActual": 0 });
        arr_m_total_Revenue.push({ "Month": arr_Month[i], "TotalBudget": 0, "TotalActual": 0 });
        arr_m_total_Diff.push({ "Month": arr_Month[i], "TotalRevenues": 0, "TotalExpenses": 0, "TotalDiff": 0 });
    }

    var arr_Accounts= new Array();
    $(Data).each(function (i, item) {
        if (arr_Accounts.find(x => x.AccountName == item.AccountName && x.SubAccountName == item.SubAccountName) == undefined)
            arr_Accounts.push({ "AccountNumber": item.AccountNumber, "AccountName": item.AccountName, "SubAccountName": item.SubAccountName, "CostCenterName": item.CostCenterName });
    });

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Budget Details Report By Month' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '<div id="ReportBody">'

        for (var g = 0; g < arr_Accounts.length; g++) {
            if (g == 0) {

                ReportHTML += '<br><h1 class="text-center"> Budget Details </h1>';
                ReportHTML += '<table id="tblBudgetDetails" class="table table-striped text-sm table-bordered ">';
                ReportHTML += '<thead>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>Account Number</th> ';
                ReportHTML += '<th>Account Name</th> ';
                ReportHTML += "<th class=' " + (ShowSubAccount ? "" : "hide") + "'>" + 'SubAccount Name' + "</th>";
                ReportHTML += '<th>CostCenter</th> ';

                for (var i = 0; i < arr_Month.length; i++) {
                    ReportHTML += '<th colspan="3" class="">' + arr_Month[i] + '</th>';
                }
                ReportHTML += '</tr> ';
                ReportHTML += '</thead>';
                ReportHTML += '<tbody>';
                ReportHTML += '<thead>';
                ReportHTML += '<tr>';
                ReportHTML += '<th></th> ';
                ReportHTML += '<th></th> ';
                ReportHTML += "<th class=' " + (ShowSubAccount ? "" : "hide") + "'>" + '' + "</th>";
                ReportHTML += '<th></th> ';

                for (var i = 0; i < arr_Month.length; i++) {
                    ReportHTML += '<th>Budget</th> ';
                    ReportHTML += '<th>Actual Budget</th> ';
                    ReportHTML += '<th>Diff</th> ';
                }
                ReportHTML += '</tr> ';
                ReportHTML += '</thead>';
                ReportHTML += '<tbody>';
            }
            ReportHTML += '<tr>';
            ReportHTML += '<td>' + arr_Accounts[g].AccountNumber + '</td> ';
            ReportHTML += '<td>' + arr_Accounts[g].AccountName + '</td> ';
            ReportHTML += "<td class=' " + (ShowSubAccount ? "" : "hide") + "'>" + arr_Accounts[g].SubAccountName + "</td>";
            ReportHTML += '<td>' + arr_Accounts[g].CostCenterName + '</td> ';

            for (var h = 0; h < arr_Month.length; h++) {
                var RowsAccountValue = Data.filter(f => f.AccountName == arr_Accounts[g].AccountName &&  f.SubAccountName == arr_Accounts[g].SubAccountName && f.MonthID == arr_Month[h]);
                if (RowsAccountValue.length > 0) {
                    ReportHTML += '                     <th class="">' + RowsAccountValue[0].Budget.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    ReportHTML += '                     <th class="">' + RowsAccountValue[0].ActualBudget.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    ReportHTML += '                     <th class="">' + (RowsAccountValue[0].Budget - RowsAccountValue[0].ActualBudget).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</th>';
                    if (arr_Accounts[g].AccountNumber.substring(0, 1) == "4") {
                        arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalBudget += RowsAccountValue[0].Budget;
                        arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalActual += RowsAccountValue[0].ActualBudget;
                    }
                    else {
                        arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalBudget += RowsAccountValue[0].Budget;
                        arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalActual += RowsAccountValue[0].ActualBudget;
                    }
                }
                else {
                    ReportHTML += '                     <th class="">' + '-' + '</th>';
                    ReportHTML += '                     <th class="">' + '-' + '</th>';
                    ReportHTML += '                     <th class="">' + '-' + '</th>';
                }

            }
            ReportHTML += '</tr>';

            if (arr_Accounts.length == (g + 1)) {

                ReportHTML += '<tr>';
                ReportHTML += '<td><b>Total Revenue :<b></td> ';
                ReportHTML += '<td><b><b></td> ';
                ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
                ReportHTML += '<td><b><b></td> ';

                for (var h = 0; h < arr_Month.length; h++) {

                    var pTotalBudget = arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalBudget;
                    var pTotalActual = arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalActual;

                    ReportHTML += '<td><b>' + parseFloat(pTotalBudget).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat(pTotalActual).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat(pTotalBudget - pTotalActual).toFixed(2) + '</b></td> ';

                }
                ReportHTML += '</tr>';


                ReportHTML += '<tr>';
                ReportHTML += '<td><b>Total Expenses : <b></td> ';
                ReportHTML += '<td><b><b></td> ';
                ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
                ReportHTML += '<td><b><b></td> ';

                for (var h = 0; h < arr_Month.length; h++) {

                    var pTotalBudget = arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalBudget;
                    var pTotalActual = arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalActual;

                    ReportHTML += '<td><b>' + parseFloat(pTotalBudget).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat(pTotalActual).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat(pTotalBudget - pTotalActual).toFixed(2) + '</b></td> ';
                }

                ReportHTML += '</tr>';


                ReportHTML += '<tr>';
                ReportHTML += '<td><b>Difference :<b></td> ';
                ReportHTML += '<td><b><b></td> ';
                ReportHTML += "<td class='" + (ShowSubAccount ? "" : "hide") + "'>" + '<b><b>' + "</td>";
                ReportHTML += '<td><b><b></td> ';

                for (var h = 0; h < arr_Month.length; h++) {

                    var pTotalBudgetRevenue = arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalBudget;
                    var pTotalActualRevenue = arr_m_total_Revenue.find(x => x.Month == arr_Month[h]).TotalActual;

                    var pTotalBudgetExpense = arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalBudget;
                    var pTotalActualExpense = arr_m_total_Expense.find(x => x.Month == arr_Month[h]).TotalActual;

                    ReportHTML += '<td><b>' + parseFloat(pTotalBudgetRevenue - pTotalBudgetExpense).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat(pTotalActualRevenue - pTotalActualExpense).toFixed(2) + '</b></td> ';
                    ReportHTML += '<td><b>' + parseFloat((pTotalBudgetRevenue - pTotalBudgetExpense) - (pTotalActualRevenue - pTotalActualExpense)).toFixed(2) + '</b></td> ';

                    // arr_m_total_Diff.push({ "Month": arr_Month[i], "TotalRevenues": 0, "TotalExpenses": 0, "TotalDiff": 0 });
                }
                //ReportHTML += '<td><b>' + parseFloat(TotalRevenue - TotalExpenses).toFixed(2) + '</b></td> ';
                //ReportHTML += '<td><b>' + parseFloat(TotalActualRevenue - TotalActualExpenses).toFixed(2) + '</b></td> ';
                //ReportHTML += '<td><b>' + parseFloat(TotalDiffRevenue - TotalDiffExpenses).toFixed(2) + '</b></td> ';
                ReportHTML += '</tr>';



                ReportHTML += '</tbody></table>';
                ReportHTML += '</div>'
            }
        }
 
    }


    console.log(ReportHTML);
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "BudgetDetails" + ".xls", // do include extension
                preserveColors: true // set to true if you want background colors and font colors preserved
            });
        }
        else {
            $table.table2excel({
                exclude: ".noExl",
                name: "ملف 1",
                filename: "تفاصيل الميزانية" + ".xls", // do include extension
                preserveColors: true // set to true if you want background colors and font colors preserved
            });
        }

    }






    FadePageCover(false);
}