


function AccountLedger_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
} 

function AccountLedger_cbCheckAllBranchChanged() {
    debugger;
    if ($("#cbCheckAllBranch").prop("checked"))
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", true);
    else
        $("#divCbBranch input[name=nameCbBranch]").prop("checked", false);
}

function AccountLedger_cbCheckAllCostCenterChanged() {
    debugger;
    if ($("#cbCheckAllCostCenter").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function AccountLedgerByCurrency_Print(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    //  var pCurrencyIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCurrency");
    var pJournalTypeIDList = $("#cbCheckAllJournalTypes").prop("checked")   ? "-1"  : GetAllSelectedIDsAsStringWithNameAttr("nameCbJournalType");
    var pJVTypeIDList =      $("#cbCheckAllJVTypes").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbJVType");
    
    if (pBranche_IDs == '' || $("#cbCheckAllBranch").prop("checked"))
        pBranche_IDs = "-1";

    if (pJVTypeIDList == '')
        pJVTypeIDList = "-1";

    if (pJournalTypeIDList == '')
        pJournalTypeIDList = "-1";

    var pCurrencyIDList = $("#slCurrency").val();
    if (pAccountIDList == "" || pCurrencyIDList == "")
        swal("Sorry", "Please, select at least one account and one currency.");
    else if (pCostCenterIDList == "" && $("#cbByCostCenter").prop("checked"))
        swal("Sorry", "Please, select at least one CostCenter.");
    else if (pCostCenterIDList != "" && !$("#cbByCostCenter").prop("checked") && !$("#cbByCostCenterTotals").prop("checked"))
        swal("Sorry", "Please, select group by CostCenter.");
    else if (pAccountIDList == "" || pJournalTypeIDList == "")
        swal("Sorry", "Please, select at least one account and one journal type.");
    else if ($("#cbByCostCenterTotals").prop("checked") && ( pCostCenterIDList == ""  || pJournalTypeIDList == "" || pJVTypeIDList == "") )
           swal("Sorry", "Please, select at least one account and one journal type and One Cost Center.");
    else {
        FadePageCover(true);

 
        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pCostCenterIDList: $("#cbCheckAllCostCenter").prop("checked") ? "-1" : ( ($("#cbByCostCenter").prop("checked") || $("#cbByCostCenterTotals").prop("checked")) ?  pCostCenterIDList : "0" )
            , pJournalTypeIDList: pJournalTypeIDList
            , pFromDate: $("#txtFromDate").val()
            , pToDate: $("#txtToDate").val()      
            , pPostStatus: "-1"
            //, pShowRevaluateEntry: false
            , pCurr: pCurrencyIDList
            , pBranche_IDs: pBranche_IDs
            , pJVTypeIDList: pJVTypeIDList
            , pByTotals: ($("#cbByCostCenterTotals").prop("checked") ? true : false)
             ,pSubAccountID : -1
        };
        CallGETFunctionWithParameters("/api/AccountLedgerByCurrency/GetPrintedData", pParametersWithValues
            , function (pData) {
               
                if ($("#cbByCostCenterTotals").prop("checked"))
                    JournalVoucher_PrintTotals(pData, pOutputTo)
                else if ($("#cbByCostCenter").prop("checked"))
                    AccountLedger_Print_DetailedByCostCenter(pData, pOutputTo);
                else
                    AccountLedger_Print_Detailed(pData, pOutputTo);
            }
            , null);
    }
}
function JournalVoucher_PrintTotals(pData,pOutputTo) {
    debugger;

                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                var pFormattedPrintTime = getTime();
               var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
               var pCurrencyCode = $("#slCurrency option:selected").text();
               var pCurrencyID = $("#slCurrency option:selected").val();
               var pBranche_IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbBranch");
                var pJournalTypeIDList = $("#cbCheckAllJournalTypes").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbJournalType");
                var pJVTypeIDList = $("#cbCheckAllJVTypes").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbJVType");

                if (pJVTypeIDList == '')
                    pJVTypeIDList = "-1";

                if (pJournalTypeIDList == '')
                    pJournalTypeIDList = "-1";

                if (pBranche_IDs == '' || $("#cbCheckAllBranch").prop("checked"))
                    pBranche_IDs = "-1";

                var pJVHeader = JSON.parse(pData[0]); // its 1 row
                var pJVItems = JSON.parse(pData[2]);

                var result = [];

                $.each(pJVItems, function (i, item) {
                    if ($.inArray(item.CostCenterName, result) == -1)
                        result.push(item.CostCenterName);
                });

                var ReportHTML = '';
                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    ReportHTML += '<html>';

                }
                else {
                    ReportHTML += '<html dir="rtl">';
    }

                ReportHTML += '     <div class="row text-center"><br><br><br><br><br><br><br></div>';
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + 'Cost Center Totals' + '</h3></div> '; //addClass "text-ul" to underline
                ReportHTML += '     <div class="col-xs-12 text-center text-ul m-t-n"><h3> ' + $("#slCurrency option:selected").text() + '</h3></div> '; //addClass "text-ul" to underline

                ReportHTML += '     </br>';
                ReportHTML += '     <br>';
                ReportHTML += ' <br/>';
                ReportHTML += '     <body>';
                for (var i = 0; i < result.length ; i++) {
                    var CurrentRows = pJVItems.filter(x=> x.CostCenterName == result[i]);
                    ReportHTML += '             <div class="col-xs-12" style="font-size:20px;" ><b>' + TranslateString("CostCenterName") + ' :</b> ' + result[i] + '</div>';
                  
                    ReportHTML += '         <table id="tblPrintJVItems' + i + '"class="table table-striped b-t b-light text-sm table-bordered m-t-lg">';
                    ReportHTML += '             <thead>';
                    ReportHTML += '                 <tr>';
                    ReportHTML += '                     <th class="text-center">' + TranslateString("Account") + '</th>';
                    ReportHTML += '                     <th class="text-center">' + TranslateString("SubAccount") + '</th>';
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("CostCenter") + '</th>';
                    ReportHTML += '                     <th class="text-center">' + TranslateString("Debit") + '</th>';
                    ReportHTML += '                     <th class="text-center">' + TranslateString("Credit") + '</th>';
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("Cur") + '</th>';
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("Ex.Rate") + '</th>';
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("LocalDebit") + '</th>';
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("LocalCredit") + '</th>';;
                    //ReportHTML += '                     <th class="text-center">' + TranslateString("Description") + '</th>';
                    ReportHTML += '                 </tr>';
                    ReportHTML += '             </thead>';
                    ReportHTML += '             <tbody>';
                    var Counter = 0;
                    $.each(CurrentRows, function (i, item) {
                        debugger;
                        ReportHTML += '                 <tr style="font-size:95%;">';
                        ReportHTML += '                     <td class="text-center">' + (item.Account_Name == 0 ? '' : item.Account_Name) + '</td>';
                        ReportHTML += '                     <td class="text-center">' + (item.SubAccount_Name == 0 ? '' : item.SubAccount_Name) + '</td>';
                        //ReportHTML += '                     <td class="text-center">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';


                        ReportHTML += '                     <td class="text-center">' 
                            + '<a href="#" onclick="AccountLedgerByCurrencySubReport_Print(' + item.Account_ID + ",'"
                            + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name
                            + "'," + item.CostCenter_ID
                            + ",'" + item.CostCenterName
                            + "','" + pCurrencyCode
                            + "','" + pBranche_IDs
                            + "','" + pJVTypeIDList
                            + "','" + pJournalTypeIDList
                            + "','" + pCurrencyID
                            + "'," +item.SubAccount_ID
                            + "" + ');" >'
                            + '<span><br>'
                            + (item.Debit == 0 ? "" : item.Debit.toFixed(2))
                            + '</span>'
                            + '</td></a> ';
                        ReportHTML += '                     <td class="text-center">'
                            + '<a href="#" onclick="AccountLedgerByCurrencySubReport_Print(' + item.Account_ID + ",'"
                            + $("#txtFromDate").val() + "','" + $("#txtToDate").val() + "','"
                            + item.Account_Number + ' - ' + item.Account_Name
                            + "'," + item.CostCenter_ID
                            + ",'" + item.CostCenterName
                            + "','" + pCurrencyCode
                            + "','" + pBranche_IDs
                            + "','" + pJVTypeIDList
                            + "','" + pJournalTypeIDList
                            + "','" + pCurrencyID
                            + "'," + item.SubAccount_ID
                            + "" + ');" >'
                            + '<span><br>'
                            + (item.Credit == 0 ? "" : item.Credit.toFixed(2))
                            + '</span>'
                            + '</td></a> ';

                        //ReportHTML += '                     <td class="text-center">' + item.CurrencyCode + '</td>';
                        //ReportHTML += '                     <td class="text-center">' + item.ExchangeRate + '</td>';
                        //ReportHTML += '                     <td class="text-center">' + (item.LocalDebit == 0 ? "" : item.LocalDebit.toFixed(2)) + '</td>';
                        //ReportHTML += '                     <td class="text-center">' + (item.LocalCredit == 0 ? "" : item.LocalCredit.toFixed(2)) + '</td>';
                        //ReportHTML += '                     <td class="text-center">' + (item.Description == 0 ? '' : item.Description.replace(/\n/g, "<br />")) + '</td>';

                        ReportHTML += '                 </tr>';
                    });
                    ReportHTML += '             </tbody>';
                    ReportHTML += '         </table>';
                }
                ReportHTML += '     </body>';


                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                if (pOutputTo == "Excel") {
                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    var pFormattedPrintTime = getTime();
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div id="Reportbody">';
                    ReportHTML += '         <div class="break"></div>';
                    ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

                    ReportHTML += '                     <table id="tblPrintJVItems' + '" class="m-t table table-striped text-sm   style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '                         <tbody>';

                    ReportHTML += '             <tr class="">';
                    ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' From Date : ' + '</b>' + '</h4> </td>';
                    ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>' + $("#txtFromDate").val() + '</h4> </td>';

                    ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' To Date : ' + '</b>' + '</h4> </td>';
                    ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4>' + $("#txtToDate").val() + '</h4> </td>';

                    ReportHTML += '             </tr>';

                    ReportHTML += '                         </tbody>';
                    ReportHTML += '                     </table>';
                    for (var i = 0; i < result.length ; i++) {

                        ReportHTML += '             <table id="tblPrintJVItems' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                        ReportHTML += '             <tr class="">';
                        ReportHTML += '                  <td class="col-xs-12"style="border: 1px solid black;" ><h4><b>' + ' Cost Center Name : ' + '</b>' + result[i] + '</h4> </td>';
                        ReportHTML += '             </tr>';
                        ReportHTML += '             ' + $("#tblPrintJVItems" + i).html();
                        ReportHTML += '             </table>';
                    }
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                    /*****************************Creating table tblSumCurrencyByCC****************************************/
                    ReportHTML += '             <div class="col-xs-12"></div>';


                    //of for (var j = 0; j < ArrAccountIDList.length; j++) {
                    ReportHTML += '         </div>';
                    ReportHTML += '         <body>';

                    ReportHTML += '</html>';

                    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

                    $("#hExportedTable").html(ReportHTML);

                    $("#Reportbody").table2excel({
                        exclude: ".excludeThisClass",
                        name: "Sheet 1",
                        filename: " Print Total By Journal Report " + pFormattedTodaysDate //do not include extension
                    });
                }
                else {
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                        ReportHTML += '<html>';
                        ReportHTML += '     <head>';
                        ReportHTML += AddScripts;
                        ReportHTML += '</head>';
                        ReportHTML += '     <head><title>' + 'Cost Center Totals' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
                        ReportHTML += AddScripts;
                        ReportHTML += '</head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + 'Cost Centers Totals - ' +  pCurrencyCode +'</u></b>'  + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
                        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';

                        for (var i = 0; i < result.length; i++) {
                            ReportHTML += '     <div class="row text-center"><br></div>';
                            ReportHTML += '             <div class="col-xs-12 text-left" ><h4><b>' + 'Cost Center Name : ' +  '</b>' + result[i] + '</h4> ' + '</div>';
                            ReportHTML += '             <table id="tblPrintJVItems' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                            //ReportHTML += '             <tr class="">';
                            //ReportHTML += '                  <td class="col-xs-12" colspan="4" style="border: 1px solid black;" ><h4><b>' + ' Cost Center Name : ' + '</b>' + result[i] + '</h4> </td>';
                            //ReportHTML += '             </tr>';
                            ReportHTML += '             ' + $("#tblPrintJVItems" + i).html();
                            ReportHTML += '             </table>';
                        }
                        ReportHTML += '         <body>';
                        //ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                    }
                    else {
                        ReportHTML += '<html dir="rtl">';
                        ReportHTML += '     <head>';
                        ReportHTML += AddScripts;
                        ReportHTML += '</head>';
                        ReportHTML += '     <head><title>' + 'مركز تكلفة مجمع' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
                        ReportHTML += AddScripts;
                        ReportHTML += '</head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        for (var i = 0; i < result.length; i++) {
                            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>' + 'Cost Centers Totals - ' + pCurrencyCode + '</u></b>' + '</div>';
                            ReportHTML += '             <table id="tblPrintJVItems' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                            ReportHTML += '             ' + $("#tblPrintJVItems" + i).html();
                            ReportHTML += '             </table>';
                        }
                        ReportHTML += '         <body>';
                        ReportHTML += '</html>';
                    }
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
             FadePageCover(false);
}
function AccountLedger_cbCheckAllJournalTypesChanged() {
    debugger;
    if ($("#cbCheckAllJournalTypes").prop("checked"))
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", true);
    else
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", false);
}
function AccountLedger_cbCheckAllJVTypesChanged() {
    debugger;
    if ($("#cbCheckAllJVTypes").prop("checked"))
        $("#divCbJVType input[name=nameCbJVType]").prop("checked", true);
    else
        $("#divCbJVType input[name=nameCbJVType]").prop("checked", false);
}
function AccountLedger_Print_Detailed(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    //var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");


    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
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
        pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
        pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
        if ($("#cbShowSubAccount").prop("checked"))
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
                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';

                        pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;">' + item.Opening_Balance +  '</td>';

                    }
                    else { //Excel
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
                    //var fBal = item.LocalDebit - item.LocalCredit;
                    //var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    //pPreviousRowFBalance = FBalance; //To be used in the next row
                    var fBal = fBalD;
                    var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                    pPreviousRowFBalance = FBalance; //To be used in the next row
                    /******************Add the row************************/
                    pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                     <td class="" style="text-align:center;">' + '<a href="#" onclick="JournalVoucher_Print(' + item.ID + ', event' + ');" >' + '<span>' + '&emsp;' + item.JVNo + '</span>' + '</td></a> ';
                   // pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                    if ($("#cbShowSubAccount").prop("checked"))
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';

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
        //var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
        //var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
        var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Deb");
        var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Cre");
        var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
        var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();
        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
        if (pOutputTo != "Excel")
            pRowTotalsHTML += '                                <td class="" colspan="7" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
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
        pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
        if (pOutputTo == "Excel")
        {
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
            pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

        }
        if ($("#cbShowSubAccount").prop("checked"))
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
    pTablesHTML += '                     <th class="">' + 'مركز التكلفة' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مبلغ مدين' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مبلغ دائن' + '</th>';
    pTablesHTML += '                     <th class="">' + 'العملة' + '</th>';
    pTablesHTML += '                     <th class="">' + 'مدين' + '</th>';
    pTablesHTML += '                     <th class="">' + 'دائن' + '</th>';
    pTablesHTML += '                     <th class="">' + 'موثق' + '</th>';
    //if ($("#cbShowSubAccount").prop("checked"))
    //    pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';
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
                    pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'الرصيد الإفتتاحي:</u></b> &emsp;' + '</td>';

                    pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;">' + item.Opening_Balance +  '</td>';

                }
                else { //Excel
                    pTablesHTML += '                     <td style="text-align:center;" class="">' + 'الرصيد الإفتتاحي : ' + '</td>';
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
                //var fBal = item.LocalDebit - item.LocalCredit;
                //var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                //pPreviousRowFBalance = FBalance; //To be used in the next row
                var fBal = fBalD;
                var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                pPreviousRowFBalance = FBalance; //To be used in the next row
                /******************Add the row************************/
                pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                if ($("#cbShowSubAccount").prop("checked"))
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
    //var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalDebit");
    //var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "LocalCredit");
    var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Deb");
    var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Cre");
    var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
    var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();
    var pRowTotalsHTML = "";
    pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
    if (pOutputTo != "Excel")
        pRowTotalsHTML += '                                <td class="" colspan="6" style="text-align:center;"><b><u>' + 'الإجمالي:</u></b> &emsp;' + '</td>';
    else { //Excel
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
        for (var j = 0; j < ArrAccountIDList.length; j++)
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            ReportHTML += '<html>';
            ReportHTML += '     <head>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += '     <head><title>' + 'Account Ledger By Currency' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            //if (i > 0)
            ReportHTML += '         <div class="break"></div>';
            //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
            ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger By Currency</u></b>' + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
            ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
            ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
            ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim()
               +"   "  + $("#slCurrency").find('option:selected').text().trim() + '</h4></div>';
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
    }
else {
            ReportHTML += '<html dir="rtl">';
            ReportHTML += '     <head>';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
            ReportHTML += '     <head><title>' + 'حساب الأستاذ بالعملة' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';
            ReportHTML += AddScripts;
            ReportHTML += '</head>';
    ReportHTML += '         <body style="background-color:white;">';
    for (var j = 0; j < ArrAccountIDList.length; j++) {
        //if (i > 0)
        ReportHTML += '         <div class="break"></div>';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>حساب الأستاذ بالعملة</u></b>' + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        //ReportHTML += '             <div class="col-xs-6 "></div>';
        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'الحساب : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim()
           +"   "  + $("#slCurrency").find('option:selected').text().trim() + '</h4></div>';
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
    }
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}
function AccountLedger_Print_DetailedByCostCenter(pData, pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");

    var Suppress = false;

    var pDefaultsHeader = JSON.parse(pData[0]);
    var pAccountLedger = JSON.parse(pData[1]);
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var ArrAccountIDList = pAccountIDList.split(',');
    var ArrCostCenterIDList = pCostCenterIDList.split(',');

    var pTablesHTML = "";
    for (var k = 0; k < ArrCostCenterIDList.length; k++) {
        for (var j = 0; j < ArrAccountIDList.length; j++) {
            var pIsOpenBalanceRowAdded = false;
            //pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            pTablesHTML += '                 <thead class="" style="">';
            pTablesHTML += '                     <th class="">' + 'JV No.' + '</th>';
            pTablesHTML += '                     <th class="">' + 'JV Date' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Receipt No' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cost Center' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Loc.Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Cur' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Debit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Credit' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Documented' + '</th>';
            if ($("#cbShowSubAccount").prop("checked"))
                pTablesHTML += '                     <th class="">' + 'SubAccount' + '</th>';

            pTablesHTML += '                     <th class="">' + 'Description' + '</th>';
            pTablesHTML += '                     <th class="">' + 'Balance' + '</th>';
            pTablesHTML += '                 </thead>';
            pTablesHTML += '                 <tbody>';
            //if (pAccountLedger != null)
            var pPreviousRowFBalance = 0; //final balance Local Cur
            $.each(pAccountLedger, function (i, item) {
               // if (item.Account_ID == ArrAccountIDList[j])
                if (item.Account_ID == ArrAccountIDList[j] && item.CostCenter.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim())
                {
                    if (!pIsOpenBalanceRowAdded) { //Table 1st row (open balance)
                        pTablesHTML += '             <tr class="" style="font-size:95%;">';
                        if (pOutputTo != "Excel") {
                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;"><b><u>' + 'Opening Balance:</u></b> &emsp;' + '</td>';

                            pTablesHTML += '                 <td class="" colspan=' + ($("#cbShowSubAccount").prop("checked") ? '11' : '10') + ' style="text-align:center;">' + item.Opening_Balance + '</td>';

                        }
                        else { //Excel
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + 'OPENING BALANCE : ' + '</td>';
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + '' + '</td>';
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
                        //var fBal = item.LocalDebit - item.LocalCredit;
                        //var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        //pPreviousRowFBalance = FBalance; //To be used in the next row
                        var fBal = fBalD;
                        var FBalance = parseFloat(fBal) + parseFloat(pPreviousRowFBalance);
                        pPreviousRowFBalance = FBalance; //To be used in the next row
                        /******************Add the row************************/
                        pTablesHTML += '                 <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.JVNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.ReceiptNo + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.CostCenter + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalDebit">' + item.LocalDebit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="LocalCredit">' + item.LocalCredit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + item.Currency_Code + '=' + item.ExchangeRate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Deb">' + Deb.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="Cre">' + Cre.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
                        pTablesHTML += '                     <td style="text-align:center;" class="">' + (item.IsDocumented ? "√" : "--") + '</td>';
                        if ($("#cbShowSubAccount").prop("checked"))
                            pTablesHTML += '                     <td style="text-align:center;" class="">' + item.SubAccount_Name + '</td>';

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
    }
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        /*********************Append table summaries*************************/
        debugger;
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {

                var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Deb");
                var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''), "Cre");
                var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:last td.FBalance").text();
                //var pTotalLocalDebit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Deb");
                //var pTotalLocalCredit = GetColumnSum("tblAccountLedger" + ArrAccountIDList[j], "Cre");
                //var pSummaryLocalCurBalance = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text();
                //var pSummaryLocalCurBalance_Posted = $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.FBalance").text() == "" ? 0 : $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:last td.Posted").text();

                var pRowTotalsHTML = "";
                pRowTotalsHTML += '                            <tr class="" style="font-size:95%;">';
                if (pOutputTo != "Excel")
                    pRowTotalsHTML += '                                <td class="" colspan="7" style="text-align:center;"><b><u>' + 'Totals:</u></b> &emsp;' + '</td>';
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
                pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                if (pOutputTo == "Excel") {
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '' + '</td>';
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';

                }
                if ($("#cbShowSubAccount").prop("checked"))
                    pRowTotalsHTML += '                                <td style="text-align:center;" class="">' + '</td>';
                if ($("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                    pRowTotalsHTML += '                                  <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody tr:first td:last").text() + '</td>';
                else
                    pRowTotalsHTML += '                                 <td colspan=2 style="text-align:center;" class="">' + pSummaryLocalCurBalance /*+ ' ' + $("#hDefaultCurrencyCode").val()*/ + '</td>';

                //if ($("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr").length == 1) //no transactions within this period, so final balance is the open balance
                //    pRowTotalsHTML += '                                <td colspan=2 style="text-align:center;" class="">' + $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody tr:first td:last").text() + '</td>';
                //else
                //    pRowTotalsHTML += '                                <td colspan="2"  style="text-align:center;" class="">' + 'Balance: ' + pSummaryLocalCurBalance +
                        (pOutputTo == "Excel" ? '       ' : '&emsp;&emsp;&emsp; ') +
                       // 'Posted: ' + pSummaryLocalCurBalance_Posted +
                        '</td>';
                pRowTotalsHTML += '                            </tr>';
              //  $("#tblAccountLedger" + ArrAccountIDList[j] + " tbody").append(pRowTotalsHTML);
                $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '') + " tbody").append(pRowTotalsHTML);
            } 
        }

        if (pOutputTo == "Excel") {

            //for (var j = 0; j < ArrAccountIDList.length; j++)
            //    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j]);

            for (var k = 0; k < ArrCostCenterIDList.length; k++)
                for (var j = 0; j < ArrAccountIDList.length; j++) {
                    var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
                        x.CostCenter.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim());
                    if (!Suppress || CurrentRows.length > 0) {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, ''));
                    }
                }

      
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
       
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Account Ledger' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        for (var k = 0; k < ArrCostCenterIDList.length; k++) {
            for (var j = 0; j < ArrAccountIDList.length; j++) {
                var CurrentRows = pAccountLedger.filter(x=> x.Account_ID == ArrAccountIDList[j] &&
    x.CostCenter.trim() == $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim());
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
                    ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim()
                        + " (" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim() + ")"
                        + "   " + $("#slCurrency").find('option:selected').text().trim() + '</h4></div>';
                    //ReportHTML += pTablesHTML; //Add table html in the next lines
                    ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
                    ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j] + "-" + $("#divCbCostCenter input[name=nameCbCostCenter][value=" + ArrCostCenterIDList[k] + "]").siblings().text().trim().replace(/[\, ()/*.]/g, '')).html();
                    ReportHTML += '             </table>';
                    //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
                }
            } 
        } 
        ReportHTML += '         <body>';

        //ReportHTML += '</html>';

        //    ReportHTML += '<html>';
        //    ReportHTML += '     <head><title>' + 'Account Ledger By Currency' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        //    ReportHTML += '         <body style="background-color:white;">';
        //    for (var j = 0; j < ArrAccountIDList.length; j++) {
        //        //if (i > 0)
        //        ReportHTML += '         <div class="break"></div>';
        //        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
        //        ReportHTML += '             <div class="col-xs-12 text-center" style="font-size: 20px;"><b><u>Account Ledger By Currency</u></b>' + '</div>';
        //        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>';
        //        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>';
        //        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //        //ReportHTML += '             <div class="col-xs-3"><b>' + 'Printed By :  ' + '</b>' + $("#hLoggedUserNameNotLogin").val() + '</div>';
        //        ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';
        //        ReportHTML += '             <div class="col-xs-12"><h4><b>' + 'Account : ' + '</b>' + $("#divCbAccount input[name=nameCbAccount][value=" + ArrAccountIDList[j] + "]").siblings().text().trim()
        //           + "   " + $("#slCurrency").find('option:selected').text().trim() + '</h4></div>';
        //        //ReportHTML += pTablesHTML; //Add table html in the next lines
        //        ReportHTML += '             <table id="tblAccountLedger' + ArrAccountIDList[j] + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
        //        ReportHTML += '             ' + $("#tblAccountLedger" + ArrAccountIDList[j]).html();
        //        ReportHTML += '             </table>';
        //        //ReportHTML += '             <div class="col-xs-12 m-t-n text-right"><b>' + 'Total records :  ' + '</b>' + pAccountLedger.length + '</div>';
        //    } //of for (var j = 0; j < ArrAccountIDList.length; j++) {
        //    ReportHTML += '         <body>';
        //    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        //    //ReportHTML += '     </footer>';
        //    ReportHTML += '</html>';

        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }

    FadePageCover(false);
}


var AddScripts = '';
AddScripts += '<script src="/Scripts/utilities/jquery-1.10.2.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/mainapp.master.js" type="text/javascript"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/SubReportFunction.js"></script>';
//AddScripts += '<script src="/Scripts/Accounting/Reports/AccountLedger.js"></script>';
AddScripts += '<script src="/Scripts/Accounting/Reports/AccountLedgerByCurrency.js"></script>';

