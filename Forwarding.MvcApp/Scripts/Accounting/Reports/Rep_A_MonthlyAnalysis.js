function SubAccountLedger_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
    else
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
}
function SubAccountLedger_slSubAccountGroupChanged() {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/SubAccountLedger/SubAccountGroupChanged"
        , { pSubAccountID: $("#slSubAccountsGroups").val() }
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
function Rep_A_MonthlyAnalysis_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
    else
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
}
function CostCenterLedger_cbCheckAllCostCentersChanged() {
    debugger;
    if ($("#cbCheckAllCostCenters").prop("checked"))
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", true);
    else
        $("#divCbCostCenter input[name=nameCbCostCenter]").prop("checked", false);
}
function Rep_A_MonthlyAnalysis_cbCheckAllJournalTypesChanged() {
    debugger;
    if ($("#cbCheckAllJournalTypes").prop("checked"))
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", true);
    else
        $("#divCbJournalType input[name=nameCbJournalType]").prop("checked", false);
}
function Rep_A_MonthlyAnalysis_Print(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pSubAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
   // var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    //var pJournalTypeIDList = $("#cbCheckAllJournalTypes").prop("checked")
    //                            ? "-1"
    //                            : GetAllSelectedIDsAsStringWithNameAttr("nameCbJournalType");
    if (pAccountIDList == "" /*|| pJournalTypeIDList == ""*/)
        swal("Sorry", "Please, select at least one account");
    else if (pSubAccountIDList == "" && $('#slSubAccountsGroups').val() != 0 )
        swal("Sorry", "Please, select at least one sub account");   
    //else if (pCostCenterIDList == "" && $("#cbIsGroupByCostCenter").prop("checked"))
    //    swal("Sorry", "Please, select at least one cost center.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pAccountIDList: pAccountIDList
            , pSubAccountIDList: pSubAccountIDList
            //, pCostCenterIDList: pCostCenterIDList
            //, pJournalTypeIDList: pJournalTypeIDList
            , pFromDate: ConvertDateFormat($("#txtFromDate").val())
            , pToDate: ConvertDateFormat( $("#txtToDate").val() )
            //, pPostStatus: $("#slStatus").val()
            //, pIsGroupByCostCenter: $("#cbIsGroupByCostCenter").prop("checked")
            , pIsOperation: $("#cbIsOperation").prop("checked")
            , pIsAccounting: $("#cbIsAccounting").prop("checked")
            , pIsComparison: $("#cbIsComparison").prop("checked")
            , pFirstYear: $("#slFirstYear").val()
            , pSecondYear: $("#slSecondYear").val()
        };

        if ($("#cbIsOperation").prop("checked"))
            {
        CallGETFunctionWithParameters("/api/Rep_A_MonthlyAnalysis/GetPrintedData", pParametersWithValues
            , function (pData) {
                //if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
                //    if ($("#cbIsDetails").prop("checked"))
                //        Rep_A_MonthlyAnalysis_Print_Detailed_OneEgypt(pData, pOutputTo);
                //    else if ($("#cbIsGroupByCostCenter").prop("checked"))
                //        Rep_A_MonthlyAnalysis_Print_GroupByCC_OneEgypt(pData, pOutputTo);
                //}
                //else { //otherCompanies
                   // if ($("#cbIsDetails").prop("checked"))
                        Rep_A_MonthlyAnalysis_Print_Detailed(pData, pOutputTo);
                    //else if ($("#cbIsGroupByCostCenter").prop("checked"))
                    //    Rep_A_MonthlyAnalysis_Print_GroupByCC(pData, pOutputTo);
                //}
            }
            , null);
        }
        else if ($("#cbIsAccounting").prop("checked"))
        {
            CallGETFunctionWithParameters("/api/Rep_A_MonthlyAnalysis/GetPrintedData", pParametersWithValues
    , function (pData) {
        //if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
        //    if ($("#cbIsDetails").prop("checked"))
        //        Rep_A_MonthlyAnalysis_Print_Detailed_OneEgypt(pData, pOutputTo);
        //    else if ($("#cbIsGroupByCostCenter").prop("checked"))
        //        Rep_A_MonthlyAnalysis_Print_GroupByCC_OneEgypt(pData, pOutputTo);
        //}
        //else { //otherCompanies
        // if ($("#cbIsDetails").prop("checked"))
        Rep_A_MonthlyAnalysis_Print_Detailed_Accounting(pData, pOutputTo);
        //else if ($("#cbIsGroupByCostCenter").prop("checked"))
        //    Rep_A_MonthlyAnalysis_Print_GroupByCC(pData, pOutputTo);
        //}
    }
    , null);
        }
        else if ($("#cbIsComparison").prop("checked")) {
            CallGETFunctionWithParameters("/api/Rep_A_MonthlyAnalysis/GetPrintedData", pParametersWithValues
    , function (pData) {
        //if ($("#hDefaultUnEditableCompanyName").val() == "ONE") {
        //    if ($("#cbIsDetails").prop("checked"))
        //        Rep_A_MonthlyAnalysis_Print_Detailed_OneEgypt(pData, pOutputTo);
        //    else if ($("#cbIsGroupByCostCenter").prop("checked"))
        //        Rep_A_MonthlyAnalysis_Print_GroupByCC_OneEgypt(pData, pOutputTo);
        //}
        //else { //otherCompanies
        // if ($("#cbIsDetails").prop("checked"))
        Rep_A_MonthlyAnalysis_Print_Detailed_Accounting(pData, pOutputTo);
        //else if ($("#cbIsGroupByCostCenter").prop("checked"))
        //    Rep_A_MonthlyAnalysis_Print_GroupByCC(pData, pOutputTo);
        //}
    }
    , null);
        }
    }
}

function Rep_A_MonthlyAnalysis_Print_Detailed(pData, pOutputTo)
{

    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Monthly Analysis' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    //ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + 'Monthly Analysis' + '</h3></div> </br>';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + getTodaysDateInddMMyyyyFormat() + '</div>';
    ReportHTML += '   <table id="tblRep_A_MonthlyAnalysis_Print" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered ">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    ReportHTML += JSON.parse(pData[0]);
    // console.log(JSON.parse(pData[0]));
    ReportHTML += '  </table> </body></html>'
    debugger;
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else
    {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#tblRep_A_MonthlyAnalysis_Print');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "Monthly Analysis" + "@" + $('#slAccountsGroups option:selected').text() + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }
   // $("#hExportedTable").html(ReportHTML);
    FadePageCover(false);

}

function Rep_A_MonthlyAnalysis_Print_Detailed_Accounting(pData, pOutputTo) {

    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Monthly Analysis' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    //ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + 'Monthly Analysis' + '</h3></div> </br>';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + getTodaysDateInddMMyyyyFormat() + '</div>';
    ReportHTML += '   <table id="tblRep_A_MonthlyAnalysis_Print" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered ">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    ReportHTML += JSON.parse(pData[0]);
    // console.log(JSON.parse(pData[0]));
    ReportHTML += '  </table> </body></html>'
    debugger;
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#tblRep_A_MonthlyAnalysis_Print');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "Monthly Analysis" + "@" + $('#slAccountsGroups option:selected').text() + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }
    // $("#hExportedTable").html(ReportHTML);
    FadePageCover(false);

}


function FillAccounts()
{
    debugger;
    CallGETFunctionWithParameters("/api/Rep_A_MonthlyAnalysis/FillSearchControls"
        , { WhereCondition: "Where IsMain=0 and Account_Number like " + "'" + $('#slAccountsGroups').val() + "%'" }
        , function (pData) {
            var pAccount = pData[0];
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 4/*NameAndCode*/, null);
            FadePageCover(false);
        }
        , null);

}
function FillSubAccounts() {
    debugger;
    CallGETFunctionWithParameters("/api/Rep_A_MonthlyAnalysis/FillSearchControls"
        , { WhereCondition: "Where IsMain=0 and Account_Number like " + "'" + $('#slAccountsGroups').val() + "%'" }
        , function (pData) {
            var pAccount = pData[0];
            FillDivWithCheckboxes("divCbAccount", pAccount, "nameCbAccount", 4/*NameAndCode*/, null);
            FadePageCover(false);
        }
        , null);

}