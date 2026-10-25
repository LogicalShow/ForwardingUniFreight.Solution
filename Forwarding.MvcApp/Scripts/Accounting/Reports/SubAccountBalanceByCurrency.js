//$(document).ready(function () {

//    $('#truck').css({
//        'position': 'relative',
//        'width': '200px',
//        'height': '100px'
//    });

//    $('#cab').css({
//        'position': 'absolute',
//        'width': '100px',
//        'height': '50px',
//        'background-color': '#ccc',
//        'top': '25px',
//        'left': '50px'
//    });

//    $('#chassis').css({
//        'position': 'absolute',
//        'width': '200px',
//        'height': '25px',
//        'background-color': '#888',
//        'top': '50px',
//        'left': '0'
//    });

//    $('#wheels').css({
//        'position': 'absolute',
//        'width': '50px',
//        'height': '50px',
//        'background-color': '#333',
//        'border-radius': '50%',
//        'top': '75px',
//        'left': '25px'
//    });

//    $("#wheels").click(function () {
//        $(this).animate({
//            left: '+=25px',
//            top: '-=25px'
//        }, 500);
//        $(this).animate({
//            left: '-=25px',
//            top: '+=25px'
//        }, 500);
//    });
//});



function SubAccountBalanceByCurrency_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
    else
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
}
function SubAccountBalanceByCurrency_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function SubAccountBalanceByCurrency_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}

function SubAccountBalanceByCurrency_cbCheckAllBranchChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}
function SubAccountBalanceByCurrency_slSubAccountGroupChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SubAccountBalanceByCurrency/SubAccountGroupChanged"
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
function SubAccountBalanceByCurrency_Print(pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    //var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    //var pBranchIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");
    if (pSubAccountIDList == "")
        swal("Sorry", "Please, select at least one subaccount.");
    //else if (pCostCenterIDList == "" && $("#cbIsGroupByCostCenter").prop("checked"))
    //    swal("Sorry", "Please, select at least one cost center.");
    //else if (pBranchIDList == "" && $("#cbIsGroupByBranch").prop("checked"))
    //    swal("Sorry", "Please, select at least one Branch.");
    else {
        FadePageCover(true);


        var pSuppressForZeroes = $('#cbSuppressForZeroes').prop('checked');

        var pParametersWithValues = {
            pSubAccountIDList: pSubAccountIDList
              , pSubAccountNumber: "-1"
              , pDate: $("#txtToDate").val()
             , pAccountIDList: (pAccountIDList == "" ? "-1" : pAccountIDList)
             , pHideZeroes: pSuppressForZeroes
             , phideAsEgp: false
            , pFromDate: $("#txtFromDate").val()
            , pIsOpeningJV: $("#cbIsCustomersBalances").prop("checked") ? true : false
            , pIsMultiCurrency: $("#cbIsDetails").prop("checked") ? false : true
            , pIShowUnPaidInvoices: $("#cbUnPaidInvoices").prop("checked") ? true : false
        };

        CallPOSTFunctionWithParameters("/api/SubAccountBalanceByCurrency/GetPrintedData", pParametersWithValues
            , function (pData) {
                if ($("#cbIsDetails").prop("checked"))
                    SubAccountBalanceByCurrency_Print_Detailed(pData, pOutputTo);
                else
                    SubAccountBalanceByCurrency_Print_DetailedMultiCurrency(pData, pOutputTo);
            }
            , null);
    }
}

function SubAccountBalanceByCurrency_Print_Detailed(pData, pOutputTo) {
    debugger;
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[1]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var pSuppressForZeroes = $('#cbSuppressForZeroes').prop('checked');

    var pTablesHTML = "";
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {

    pTablesHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTablesHTML += '                 <thead class="" style="">';
    pTablesHTML += '                     <th class="">' + 'SubAccountName' + '</th>';
    pTablesHTML += '                     <th class="">' + 'Last Date' + '</th>';

    // array of currency codes -----------
    var result = [];
    // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
        if (pDefaults.UnEditableCompanyName != 'BSEA')
            result.push("EGP", "USD", "EUR");

        // fill currency codes --------------
        $.each(pTblRows, function (i, item) {
            if ($.inArray(item.Currency_Code, result) == -1) {
                if (pDefaults.UnEditableCompanyName != 'BSEA' || item.Currency_Code != 'To EGP')
                    result.push(item.Currency_Code);
            }

        });



    //for (var result, i = 0; result = result[i++];) {
    //    pTablesHTML += '                     <th class="">' + result[i] + '</th>';
    //}
    for (var i = 0; i < result.length ; i++) {
        pTablesHTML += '                     <th class="">' + result[i] + '</th>';
    }

    pTablesHTML += '                 </thead>';
    pTablesHTML += '                 <tbody>';


    pTablesHTML += '             </tr>';



    debugger;

    /******************Add the row************************/
    for (var j = 0; j < ArrSubAccountIDList.length; j++) {

        var CurrenctSubAccount = pTblRows.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j]);


        var isFirst = false;

        if (CurrenctSubAccount.length > 0) {
            var CurrentRowValue = CurrenctSubAccount.filter(x=> x.Currency_Code == 'To EGP');
            var pTotal = CurrentRowValue[0].Balnce.toFixed(2);
            if (!pSuppressForZeroes || ((pSuppressForZeroes && (pTotal >= 1 || pTotal <= -1)) )) {
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                $.each(CurrenctSubAccount, function (i, item) {
                    if (isFirst == false) {
                        isFirst = true;
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LastDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LastDate))) + '</td>';




                        for (var j = 0; j < result.length ; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x=> x.Currency_Code == result[j]);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balnce == null ? 0 : CurrentRow[0].Balnce.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }


                    }

                    pTablesHTML += '                 </tr>';



                });
            }
        }



    }
    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' +"<u><b>"+ "Total :" + "</u></b>" +'</td>';
    for (var j = 0; j < result.length ; j++) {
        var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j]);
        var Total = 0.000;
        $.each(CureentCurrencyRows, function (i, item) {
            Total = Total + parseFloat(item.Balnce);
        }
        )
        pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    }
    pTablesHTML += '                 </tr>';


    //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
    pTablesHTML += '                 </tbody>';
    pTablesHTML += '             </table>';
    //of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        if (pDefaults.UnEditableCompanyName == 'TRI') {
            pTablesHTML = pTablesHTML.replace(/To Egp/g, "To LYD");
            pTablesHTML = pTablesHTML.replace(/To(?:\s|&nbsp;)+EGP/gi, "To LYD");
        }

    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately



    }
else {
        pTablesHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
pTablesHTML += '                 <thead class="" style="">';
pTablesHTML += '                     <th class="">' + 'الحساب التحليلي' + '</th>';
pTablesHTML += '                     <th class="">' + 'آخر موعد' + '</th>';

// array of currency codes -----------
var result = [];
        // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
        if (pDefaults.UnEditableCompanyName != 'BSEA')
            result.push("EGP", "USD", "EUR");

// fill currency codes --------------
$.each(pTblRows, function (i, item) {
    if ($.inArray(item.Currency_Code, result) == -1) {
        if (pDefaults.UnEditableCompanyName != 'BSEA' || item.Currency_Code != 'To EGP')
            result.push(item.Currency_Code);
    }
     
});



//for (var result, i = 0; result = result[i++];) {
//    pTablesHTML += '                     <th class="">' + result[i] + '</th>';
//}
for (var i = 0; i < result.length ; i++) {
    pTablesHTML += '                     <th class="">' + result[i] + '</th>';
}

pTablesHTML += '                 </thead>';
pTablesHTML += '                 <tbody>';


pTablesHTML += '             </tr>';



debugger;

/******************Add the row************************/
for (var j = 0; j < ArrSubAccountIDList.length; j++) {

    var CurrenctSubAccount = pTblRows.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j]);


    var isFirst = false;

    if (CurrenctSubAccount.length > 0) {

        var CurrentRowValue = CurrenctSubAccount.filter(x=> x.Currency_Code == 'To EGP');
        var pTotal = CurrentRowValue[0].Balnce.toFixed(2);
        if (!pSuppressForZeroes || pTotal >= 1 || pTotal <= -1) {
            {
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                $.each(CurrenctSubAccount, function (i, item) {

                    if (isFirst == false) {
                        isFirst = true;
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LastDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LastDate))) + '</td>';




                        for (var j = 0; j < result.length ; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x=> x.Currency_Code == result[j]);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balnce == null ? 0 : CurrentRow[0].Balnce.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }


                    }

                    pTablesHTML += '                 </tr>';



                });
            }
        }

    }


}
pTablesHTML += '                 <tr class="" style="font-size:95%;">';
pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' +"<u><b>"+ "إجمالي :" + "</u></b>" +'</td>';
for (var j = 0; j < result.length ; j++) {
    var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j]);
    var Total = 0.000;
    $.each(CureentCurrencyRows, function (i, item) {
        Total = Total + parseFloat(item.Balnce);
    }
    )
    pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
}
pTablesHTML += '                 </tr>';


//of if (item.SubAccount_ID == ArrSubAccountIDList[j])
pTablesHTML += '                 </tbody>';
pTablesHTML += '             </table>';
//of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        if (pDefaults.UnEditableCompanyName == 'TRI') {
            pTablesHTML = pTablesHTML.replace(/To Egp/g, "To LYD");
            pTablesHTML = pTablesHTML.replace(/To(?:\s|&nbsp;)+EGP/gi, "To LYD");
        }

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately



}
    /*********************Append table summaries*************************/
    debugger;
    if (pOutputTo == "Excel") {
        // ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger");
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        //    if (i > 0)
        //        ReportHTML += '         <div class="break"></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Balance</u></b>' + '</div>';
        // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountLedger").html();
        ReportHTML += '             </table>';
        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
        //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "Sheet 1",
            filename: "Sub Account Balance By Currency" //do not include extension
        });
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'حساب الأستاذ التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '         <div id="Reportbody">';
        //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        //    if (i > 0)
        //        ReportHTML += '         <div class="break"></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ التحليلي</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountLedger").html();
        ReportHTML += '             </table>';
        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
        //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         </div>';
        ReportHTML += '         <body>';
        ReportHTML += '</html>';
        $("#hExportedTable").html(ReportHTML);
        $("#Reportbody").table2excel({
            exclude: ".excludeThisClass",
            name: "ملف 1",
            filename: "حساب الأستاذ التحليلي بالعملة" //do not include extension
        });
    }
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';

        //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        //    if (i > 0)
        //        ReportHTML += '         <div class="break"></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>SubAccount Balance</u></b>' + '</div>';
        // ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
        //ReportHTML += pTablesHTML; //Add table html in the next lines
        ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        ReportHTML += '             ' + $("#tblSubAccountLedger").html();
        ReportHTML += '             </table>';
        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
        //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
        ReportHTML += '         <body>';
        ReportHTML += '</html>';
    }
else {
    ReportHTML += '<html dir="rtl">';
    ReportHTML += '     <head><title>' + 'حساب الأستاذ التحليلي' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';

    //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
    //    if (i > 0)
    //        ReportHTML += '         <div class="break"></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ التحليلي</u></b>' + '</div>';
    ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
    ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
    //ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
    ReportHTML += '             </div>';
    //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
    // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
    //ReportHTML += pTablesHTML; //Add table html in the next lines
    ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    ReportHTML += '             ' + $("#tblSubAccountLedger").html();
    ReportHTML += '             </table>';
    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
    //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
    ReportHTML += '         <body>';
    ReportHTML += '</html>';
}
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}

function SubAccountBalanceByCurrency_Print_DetailedMultiCurrency(pData, pOutputTo) {
    debugger;

    var IShowUnPaidInvoices = $("#cbUnPaidInvoices").prop("checked") ? true : false
    var IsCustomers = $("#cbIsCustomersBalances").prop("checked");
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pTblRows = JSON.parse(pData[2]);
    var pTblCurrencyRate = JSON.parse(pData[3]);
    var pTblRowsInvoicesDetails = JSON.parse(pData[4]);
    var pTblRowsPaymentDetails = JSON.parse(pData[5]);

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrSubAccountIDList = pSubAccountIDList.split(',');

    var pTablesHTML = "";


    pTablesHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
    pTablesHTML += '                 <thead class="" style="">';
    pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' + "" + '</td>';
    pTablesHTML += '                     <td colspan="3" style="text-align:center;" class="">' +( IsCustomers ? "Customers Balance " : "Suppliers Balance ") + '</td>';
    pTablesHTML += '                     <td colspan="3" style="text-align:center;" class="">' + "Balance non Due " + '</td>';
    pTablesHTML += '                     <td colspan="3" style="text-align:center;" class="">' + "OVER DUES" + '</td>';
    if (IsCustomers && IShowUnPaidInvoices) {
        pTablesHTML += '                     <td colspan="3" style="text-align:center;" class="">' + "Total Payment" + '</td>';
        pTablesHTML += '                     <td colspan="4" style="text-align:center;" class="">' + "" + '</td>';
    }



    pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <thead class="" style="">';
  
        pTablesHTML += '                     <th class="">' + (IsCustomers ? 'Customer Code' : 'Supplier Code' )+ '</th>';
        pTablesHTML += '                     <th class="">' + (IsCustomers ? 'Customer Name' : 'Supplier Name') + '</th>';
        // array of currency codes -----------
        var result = [];
        // to order by EGP-USD-EUR then another currencies ..[ mostaa ]
        result.push( "USD", "EUR","EGP");
        // fill currency codes --------------
        $.each(pTblRows, function (i, item) {
            if ($.inArray(item.Currency_Code, result) == -1)
                result.push(item.Currency_Code);
        });


        for (var i = 0; i < result.length ; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        }
        for (var i = 0; i < result.length ; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        }
        for (var i = 0; i < result.length ; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
    }
    if (IsCustomers && IShowUnPaidInvoices) {
        for (var i = 0; i < result.length; i++) {
            pTablesHTML += '                     <th class="">' + result[i] + '</th>';
        }
        pTablesHTML += '                     <th class="">' + 'Total Limit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Salesman' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Payment Term' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Over Due Invoices' + '</th>';

    }

        pTablesHTML += '                 </thead>';
        pTablesHTML += '                 <tbody>';


        pTablesHTML += '             </tr>';



        debugger;

        /******************Add the row************************/
        for (var j = 0; j < ArrSubAccountIDList.length; j++) {

            var CurrenctSubAccount = pTblRows.filter(x=> x.SubAccount_ID == ArrSubAccountIDList[j]);
            var CurrenctSubAccountInvoices = pTblRowsInvoicesDetails.filter(x => x.SubAccountID == ArrSubAccountIDList[j]);
            var CurrenctSubAccountPayments = pTblRowsPaymentDetails.filter(x => x.SubAccountID == ArrSubAccountIDList[j]);
            var isFirst = false;

            if (CurrenctSubAccount.length > 0) {

                pTablesHTML += '                 <tr class="" style="font-size:95%;">';

                $.each(CurrenctSubAccount, function (i, item) {
                    if (isFirst == false) {
                        isFirst = true;
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Customer_Code + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';

                        for (var j = 0; j < result.length ; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 3);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balance == null ? 0 : CurrentRow[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }

                        for (var j = 0; j < result.length ; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 2 );
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balance == null ? 0 : CurrentRow[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }

                        for (var j = 0; j < result.length ; j++) {
                            var CurrentRow = CurrenctSubAccount.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 1);
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].Balance == null ? 0 : CurrentRow[0].Balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                        }

                    }




                });

                if (IsCustomers && IShowUnPaidInvoices) {
                    for (var k = 0; k < result.length; k++) {
                        var CurrentRow = CurrenctSubAccountPayments.filter(x => x.Currency_Code == result[k]  );
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrentRow.length > 0 ? (CurrentRow[0].TotalReceipts == null ? 0 : CurrentRow[0].TotalReceipts.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                    }
                    
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrenctSubAccountInvoices.length > 0 ? (CurrenctSubAccountInvoices[0].TotalLimit == null ? 0 : CurrenctSubAccountInvoices[0].TotalLimit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : 0) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrenctSubAccountInvoices.length > 0 ? CurrenctSubAccountInvoices[0].SalesmanName : "") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrenctSubAccountInvoices.length > 0 ? CurrenctSubAccountInvoices[0].PaymentTermCode : "") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (CurrenctSubAccountInvoices.length > 0 ? CurrenctSubAccountInvoices[0].OverDueInvoices : "") + '</td>';


                }



                pTablesHTML += '                 </tr>';

            }



        }
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' + "<u><b>" + "Total :" + "</u></b>" + '</td>';
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 3);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 2);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 1);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    }
    if (IsCustomers && IShowUnPaidInvoices) {

        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


    }
        pTablesHTML += '                 </tr>';
    //------------------------------------------------------------Currency Rate------------------------------------------------------------------
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' + "<u><b>" + "Exchange Rate" + "</u></b>" + '</td>';
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            pTablesHTML += '                     <td style="text-align:center;" class="">' + CureentCurrencyRate[0].CurrentExchangeRate + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            pTablesHTML += '                     <td style="text-align:center;" class="">' + CureentCurrencyRate[0].CurrentExchangeRate + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            pTablesHTML += '                     <td style="text-align:center;" class="">' + CureentCurrencyRate[0].CurrentExchangeRate + '</td>';
    }
    if (IsCustomers && IShowUnPaidInvoices) {
        for (var j = 0; j < result.length; j++) {
            var CureentCurrencyRate = pTblCurrencyRate.filter(x => x.Code == result[j]);
            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        }
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


    }
        pTablesHTML += '                 </tr>';
    // ---------------------------------------------------------------------Currency Rate * Total----------------------------------------------
        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                     <td colspan="2" style="text-align:center;" class="">' + "<u><b>" + "Total By Default Currency" + "</u></b>" + '</td>';
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 3);
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
         
            Total = Total * CureentCurrencyRate[0].CurrentExchangeRate;
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 2);
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            Total = Total * CureentCurrencyRate[0].CurrentExchangeRate;
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        }
        for (var j = 0; j < result.length ; j++) {
            var CureentCurrencyRows = pTblRows.filter(x=> x.Currency_Code == result[j] && x.Group_ID == 1);
            var CureentCurrencyRate = pTblCurrencyRate.filter(x=> x.Code == result[j]);
            var Total = 0.000;
            $.each(CureentCurrencyRows, function (i, item) {
                Total = Total + parseFloat(item.Balance);
            }
            )
            Total = Total * CureentCurrencyRate[0].CurrentExchangeRate;
            pTablesHTML += '                     <td style="text-align:center;" class="">' + Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    }
    if (IsCustomers && IShowUnPaidInvoices) {
        for (var j = 0; j < result.length; j++) {
            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        }
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';


    }
        pTablesHTML += '                 </tr>';

        //of if (item.SubAccount_ID == ArrSubAccountIDList[j])
        pTablesHTML += '                 </tbody>';
        pTablesHTML += '             </table>';
        //of for (var j = 0; j < ArrSubAccountIDList.length; j++)

        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately


    /*********************Append table summaries*************************/
        debugger;

        var d = new Date(ConvertDateFormat($("#txtFromDate").val()));
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[d.getMonth()];

    if (pOutputTo == "Excel") {
        // ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSubAccountLedger");
        var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '         <div id="Reportbody">';
            //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';

            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + (IsCustomers ? 'Customers' : 'Suppliers') + ' Balances Starting ' + monthName + ' ' + d.getFullYear() + '</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblSubAccountLedger").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         </div>';
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
            $("#hExportedTable").html(ReportHTML);
            $("#Reportbody").table2excel({
                exclude: ".excludeThisClass",
                name: "Sheet 1",
                filename:( IsCustomers ? " Customers " : " Suppliers " ) + "Balances Starting " + monthName + ' ' + d.getFullYear() + '   ' + getTodaysDateInddMMyyyyFormat() + ' ' + getTime() //do not include extension
            });

   
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + 'SubAccount Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';


            //for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            //    if (i > 0)
            //        ReportHTML += '         <div class="break"></div>';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>'+(IsCustomers ? 'Customers' : 'Suppliers') +' Balances Starting ' + monthName + ' ' + d.getFullYear() + '</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            // ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'SubAccount : ' + '</b>' + $("#divCbSubAccount input[name=nameCbSubAccount][value=" + ArrSubAccountIDList[j] + "]").siblings().text().trim() + '</h4></div>';
            //ReportHTML += pTablesHTML; //Add table html in the next lines
            ReportHTML += '             <table id="tblSubAccountLedger' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblSubAccountLedger").html();
            ReportHTML += '             </table>';
            //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pTblRows.length + '</div>';
            //} //of for (var j = 0; j < ArrSubAccountIDList.length; j++) {
            ReportHTML += '         <body>';
            ReportHTML += '</html>';
        

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}

function SubAccountBalanceByCurrency_ChangeFilter()
{
    if (!$('#cbIsCustomersBalances').prop('checked')) {
        $('#cbUnPaidInvoices').prop('checked', false);
        $("#cbUnPaidInvoices").attr("disabled", "disabled");
    }
    else {
        $("#cbUnPaidInvoices").removeAttr("disabled");
    }
}
