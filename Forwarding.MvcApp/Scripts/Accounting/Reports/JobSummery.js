var pAccountIDs = "'";
var pActivityCenterIDs = "'";
var pActivityPortIDs = "'";
var pVesselIDs = "'";
var pSubAccountIDs = "'";

//Start Auto Filter
$(document).ready(function () {
    $("#slSubAccountGroup").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter


function SubAccount_cbCheckAllSubAccountsChanged() {
    debugger;
    if ($("#cbCheckAllSubAccounts").prop("checked"))
    {
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", true);
       
    }
    else
    {
        $("#divCbSubAccount input[name=nameCbSubAccount]").prop("checked", false);
    }
       
}
function JobSummery_cbCheckAllAccountsChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
    {
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", true);
        pAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
        CallGETSubAccountsWithParameters();
    }
      
    else
    {
        $("#divCbAccount input[name=nameCbAccount]").prop("checked", false);
        pAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
        CallGETSubAccountsWithParameters();
    }
       
}
function JobSummery_DivCheckAccountChanged() {
    debugger;
    if ($(":checked")) {
        //$("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", true);
        pAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
        CallGETSubAccountsWithParameters();
    }
    else
        //$("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", false);
        pAccountIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
     CallGETSubAccountsWithParameters();
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
function JobSummery_cbCheckAllVesselChanged() {
    debugger;
    if ($("#cbCheckAllVessel").prop("checked")) {
        $("#divCbVessel input[name=nameCbVessel]").prop("checked", true);
        pVesselIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbVessel");

        CallGETActivityJobWithParameters();
    }
    else
        $("#divCbVessel input[name=nameCbVessel]").prop("checked", false);
    pVesselIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbVessel");
    CallGETActivityJobWithParameters();
}
function JobSummery_DivCheckVesselChanged() {
    debugger;
    if ($(":checked")) {
        //$("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", true);
        pVesselIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbVessel");
        CallGETActivityJobWithParameters();
    }
    else
        //$("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", false);
        pVesselIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbVessel");
    CallGETActivityJobWithParameters();
}
function JobSummery_cbCheckAllActivityPortChanged() {
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
function JobSummery_DivCheckActivityPortChanged() {
    debugger;
    if ($(":checked")) {
        //$("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", true);
        pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
        CallGETActivityJobWithParameters();
    }
    else
        //$("#divCbActivityPort input[name=nameCbActivityPort]").prop("checked", false);
        pActivityPortIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityPort");
    CallGETActivityJobWithParameters();
}
function JobSummery_DivCheckActivityCentersChanged() {
    debugger;
    if ($(":checked")) {
        //$("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", true);
        pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
        CallGETActivityJobWithParameters();
    }
    else
        //$("#divCbActivityCenter input[name=nameCbActivityCenter]").prop("checked", false);
        pActivityCenterIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbActivityCenter");
        CallGETActivityJobWithParameters();
}
function JobSummery_cbCheckAllActivityCenterChanged() {
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
function CallGETSubAccountsWithParameters() {
    $.ajax({
        type: "GET",
        url: strServerURL + "api/JobSummery/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedSubAccountsByAccountIDs",
        data: { pAccountIDs: pAccountIDs },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (pData) {
            debugger;
            FillDivWithCheckboxes("divCbSubAccount", pData[0], "nameCbSubAccount", 5/*EnName*/, null);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}
function CallGETActivityJobWithParameters() {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + "api/JobSummery/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturnedJobSummery",
        data: { pActivityCenterIDs: pActivityCenterIDs, pActivityPortIDs: pActivityPortIDs, pVesselIDs: pVesselIDs },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (pActivityJob) {
            FillDivWithCheckboxes("divCbJob", pActivityJob, "nameCbJob", 2/*EnName*/, null);
            FillListFromObject_ERP(null, 19/*pCodeOrName*/, "<--Select-->", "slSubAccountGroup", pActivityJob, null);

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}
function TrialBalance_Print(pOutputTo) {
    debugger;
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount");
    var pSubAccountIDList = $("#cbCheckAllSubAccounts").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSubAccount");
    if (pSubAccountIDList =="") {
        pSubAccountIDList = "-1";
    }
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
    var pJobIDList = "";
    if ($("#cbByJob").prop("checked")) {
        pJobIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbJob");
    }
    else {
        pJobIDList = $("#slSubAccountGroup").val();
    }
    
    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());
    var pSuppressReverseJVs = $("#cbSuppressReverseJVs").prop("checked") ? "1" : "0";
    var pSuppressForZeroes = $("#cbSuppressForZeroes").prop("checked") ? 1 : 0;

    if (pAccountIDList == "" && $("#cbstatement").prop("checked") == false)
        swal("Sorry", "Please, select at least one account.");
    else if ($("#cbByJob").prop("checked") && pJobIDList == "" && $("#cbstatement").prop("checked") == false)
        swal("Sorry", "Please, select at least one Job.");
        //else if (pSubAccountIDList == "")
        //    swal("Sorry", "Please, select at least one Subaccount.");
    else {
        if ($("#cbByJob").prop("checked")) {
            if (pOutputTo == "Print") {
                var arr_Keys = new Array();
                var arr_Vlaues = new Array();
                arr_Keys.push("Account_IDs");
                arr_Keys.push("SubAccount_IDs");

                arr_Keys.push("JobIDs");
                arr_Keys.push("From_Date");
                arr_Keys.push("To_Date");
                arr_Keys.push("posted");
                arr_Keys.push("SuppressReverseJVs");
                arr_Keys.push("SuppressForZeroes");


                arr_Vlaues.push(pAccountIDList);
                arr_Vlaues.push(pSubAccountIDList);
                arr_Vlaues.push(pJobIDList);
                arr_Vlaues.push(pFromDate);
                arr_Vlaues.push(pToDate);
                arr_Vlaues.push($("#slPost").val());
                //if ($("#cbIsPosted").prop("checked")) {
                //    arr_Vlaues.push($("#slBankAccount").val());
                //}
                //if ($("#cbIsUnPosted").prop("checked")) {
                // arr_Vlaues.push(0);
                //}
                //if ($("#cbIsAll").prop("checked")) {
                //    arr_Vlaues.push(2);
                //}
                arr_Vlaues.push(pSuppressReverseJVs);
                arr_Vlaues.push(pSuppressForZeroes);

                var pParametersWithValues =
                    {
                        arr_Keys: arr_Keys
                        , arr_Vlaues: arr_Vlaues
                    , pTitle: "Activity Center Financial Ledger"
                        , pReportName: "Rep_A_JobSummery"
                    };
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
            }

        }
        else if ($("#cbByJobNew").prop("checked")) {
            

            if (pOutputTo == "Print") {
                var arr_Keys = new Array();
                var arr_Vlaues = new Array();
                arr_Keys.push("Account_IDs");
                arr_Keys.push("SubAccount_IDs");

                arr_Keys.push("JobIDs");
                arr_Keys.push("From_Date");
                arr_Keys.push("To_Date");
                arr_Keys.push("posted");
                arr_Keys.push("SuppressReverseJVs");
                arr_Keys.push("SuppressForZeroes");


                arr_Vlaues.push(pAccountIDList);
                arr_Vlaues.push(pSubAccountIDList);
                arr_Vlaues.push(pJobIDList);
                arr_Vlaues.push(pFromDate);
                arr_Vlaues.push(pToDate);
                arr_Vlaues.push($("#slPost").val());
                //if ($("#cbIsPosted").prop("checked")) {
                //    arr_Vlaues.push($("#slBankAccount").val());
                //}
                //if ($("#cbIsUnPosted").prop("checked")) {
                // arr_Vlaues.push(0);
                //}
                //if ($("#cbIsAll").prop("checked")) {
                //    arr_Vlaues.push(2);
                //}
                arr_Vlaues.push(pSuppressReverseJVs);
                arr_Vlaues.push(pSuppressForZeroes);

                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Vlaues: arr_Vlaues
                    , pTitle: "Activity Center Financial Ledger"
                    , pReportName: "Rep_A_JobSummeryCustomized"
                };
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
            }

        }
        else if ($("#cbstatement").prop("checked")) {


            if (pOutputTo == "Print") {

                 pSubAccountIDList = $("#slSubAccountGroup").val();

                 pFromDate = ConvertDateFormat($("#txtFromDate").val());
                 pToDate = ConvertDateFormat($("#txtToDate").val());
                 pAccountIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount");
                 pCurrency = $("#slCurrency").val();
                 pSuppressReverseJVs = $("#cbSuppressReverseJVs").prop("checked") ? "1" : "0";
                pAccountIDList = "-1";

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
                var url = '/ReportMainClass/PrintWithIDs?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
            }

        }

        else if ($("#cbWithoutJob").prop("checked")) {
            if (pOutputTo == "Print") {
                var arr_Keys = new Array();
                var arr_Vlaues = new Array();
                arr_Keys.push("Account_IDs");
                arr_Keys.push("SubAccount_IDs");
                arr_Keys.push("From_Date");
                arr_Keys.push("To_Date");
                arr_Keys.push("posted");
                arr_Keys.push("SuppressReverseJVs");
                arr_Keys.push("SuppressForZeroes");


                arr_Vlaues.push(pAccountIDList);
                arr_Vlaues.push(pSubAccountIDList);
                arr_Vlaues.push(pFromDate);
                arr_Vlaues.push(pToDate);
                arr_Vlaues.push($("#slPost").val());
                //if ($("#cbIsPosted").prop("checked")) {
                //    arr_Vlaues.push($("#slBankAccount").val());
                //}
                //if ($("#cbIsUnPosted").prop("checked")) {
                // arr_Vlaues.push(0);
                //}
                //if ($("#cbIsAll").prop("checked")) {
                //    arr_Vlaues.push(2);
                //}
                arr_Vlaues.push(pSuppressReverseJVs);
                arr_Vlaues.push(pSuppressForZeroes);

                var pParametersWithValues =
                    {
                        arr_Keys: arr_Keys
                        , arr_Vlaues: arr_Vlaues
                    , pTitle: "Activity Center Financial Ledger"
                        , pReportName: "Rep_A_JobSummeryWithoutJob"
                    };
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
            }
        }
    }
}
function Print_JobSummery_Excel() {
    debugger;
    FadePageCover(true);
    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
    var pSubAccountIDList = $("#cbCheckAllSubAccounts").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");
    if (pSubAccountIDList == "") {
        pSubAccountIDList = "-1";
    }
    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
   // var pJobIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbJob");
    var pJobIDList = "";
    if ($("#cbByJob").prop("checked")) {
        pJobIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbJob");
    }
    else {
        pJobIDList = $("#slSubAccountGroup").val();
    }
    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
    var pToDate = ConvertDateFormat($("#txtToDate").val());
    var pSuppressReverseJVs = $("#cbSuppressReverseJVs").prop("checked") ? "1" : "0";
    var pSuppressForZeroes = $("#cbSuppressForZeroes").prop("checked") ? 1 : 0;
    if (pAccountIDList == "")
    {
        swal("Sorry", "Please, select at least one account.");
        FadePageCover(false);
    }
        
    else if ($("#cbByJob").prop("checked") && pJobIDList == "")
    {
        swal("Sorry", "Please, select at least one Job.");
        FadePageCover(false);
    }
      
        //else if (pSubAccountIDList == "")
        //    swal("Sorry", "Please, select at least one Subaccount.");
    else {
        if ($("#cbByJob").prop("checked")) {
            //pParametersWithValues = {
            //    Account_IDs: ',' + pAccountIDList + ',',
            //    SubAccount_IDs: ',' + pSubAccountIDList + ',',
            //    JobIDs: ',' + pJobIDList + ',',
            //    From_Date: $("#txtFromDate").val(),
            //    To_Date: $("#txtToDate").val(),
            //    //posted: $("#cbIsPosted").prop("checked") ? 1 : $("#cbIsUnPosted").prop("checked") ? 0 : 2,
            //    posted: $("#slPost").val(),
            //    SuppressReverseJVs: (pSuppressReverseJVs),
            //    SuppressForZeroes: (pSuppressForZeroes),
            //    isByJob: true

            //}
            //CallGETFunctionWithParameters("/api/JobSummery/Print_JobSummery_Excel", pParametersWithValues
            //    , function (pData) {
            //        var pTableRows = JSON.parse(pData[0]);
            //        var ExcelHTML = "";
            //        $.each(pTableRows, function (i, item) {
            //            ExcelHTML += "<tr><td>" + item.JobNumber + "</td><td>" + item.Vessel_Name + "</td><td>" + item.OwnerName + "</td><td>" + item.VoyageNumber + "</td><td>" + item.JobType + "</td>";
            //            ExcelHTML += " <td>" + item.JobDate + "</td><td>" + item.ETA_Port_Name + "</td><td>" + item.JVNO + "</td><td>" + item.JVDate + "</td>";
            //            ExcelHTML += " <td>" + item.AccountName + "</td><td>" + item.SubAccount_Name + "</td><td>" + item.Post + "</td>";
            //            ExcelHTML += "<td>" + item.Debit + "</td><td>" + item.Credit + "</td>";
            //            ExcelHTML += "<td>" + item.Currency_Code + "</td><td>" + item.ExchangeRate + "</td>" + "<td>" + item.LocalDebit + "</td>";
            //            ExcelHTML += "<td>" + item.LocalCredit + "</td><td>" + item.Invoices + "</td>";
            //            ExcelHTML += "<td>" + item.serviceItem + "</td><td>" + item.DisbursementItem + "</td>";
            //            ExcelHTML += "<td>" + item.description + "</td><td>" + item.ArrivalDate + "</td>><td>" + item.DepartureDate + "</td><td>" + item.DepartementName + "</td><td>" + item.InvoiceNo + "</td></tr>";

            //        });
            //        $('#tblJobSummery').html($.parseHTML(ExcelHTML));
            //        //$("#tblBankSheet").tblToExcel();
            //        $("#tblJobSummery").tableHTMLExport({
            //            type: 'csv',
            //            filename: 'JobSummery.csv',
            //            separator: ',',
            //            newline: '\r\n',
            //            trimContent: true,
            //            quoteFields: true,
            //            ignoreColumns: '',
            //            ignoreRows: '',
            //            htmlContent: false,
            //            consoleLog: false,

            //        });
            //        FadePageCover(false);
            //    }
            //    , null);
             pAccountIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount");
             pSubAccountIDList = $("#cbCheckAllSubAccounts").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSubAccount");
            if (pSubAccountIDList == "") {
                pSubAccountIDList = "-1";
            }
             pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
             pJobIDList = "";
            if ($("#cbByJob").prop("checked")) {
                pJobIDList = GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbJob");
            }
            else {
                pJobIDList = $("#slSubAccountGroup").val();
            }

             pFromDate = ConvertDateFormat($("#txtFromDate").val());
             pToDate = ConvertDateFormat($("#txtToDate").val());
             pSuppressReverseJVs = $("#cbSuppressReverseJVs").prop("checked") ? "1" : "0";
             pSuppressForZeroes = $("#cbSuppressForZeroes").prop("checked") ? 1 : 0;

            var arr_Keys = new Array();
            var arr_Vlaues = new Array();
            arr_Keys.push("Account_IDs");
            arr_Keys.push("SubAccount_IDs");

            arr_Keys.push("JobIDs");
            arr_Keys.push("From_Date");
            arr_Keys.push("To_Date");
            arr_Keys.push("posted");
            arr_Keys.push("SuppressReverseJVs");
            arr_Keys.push("SuppressForZeroes");


            arr_Vlaues.push(pAccountIDList);
            arr_Vlaues.push(pSubAccountIDList);
            arr_Vlaues.push(pJobIDList);
            arr_Vlaues.push(pFromDate);
            arr_Vlaues.push(pToDate);
            arr_Vlaues.push($("#slPost").val());
            //if ($("#cbIsPosted").prop("checked")) {
            //    arr_Vlaues.push($("#slBankAccount").val());
            //}
            //if ($("#cbIsUnPosted").prop("checked")) {
            // arr_Vlaues.push(0);
            //}
            //if ($("#cbIsAll").prop("checked")) {
            //    arr_Vlaues.push(2);
            //}
            arr_Vlaues.push(pSuppressReverseJVs);
            arr_Vlaues.push(pSuppressForZeroes);

            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Vlaues: arr_Vlaues
                , pTitle: "Activity Center Financial Ledger"
                , pReportName: "Rep_A_JobSummeryExcel"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
            FadePageCover(false);

        }

        else if ($("#cbByJobNew").prop("checked")) {


                var arr_Keys = new Array();
                var arr_Vlaues = new Array();
                arr_Keys.push("Account_IDs");
                arr_Keys.push("SubAccount_IDs");

                arr_Keys.push("JobIDs");
                arr_Keys.push("From_Date");
                arr_Keys.push("To_Date");
                arr_Keys.push("posted");
                arr_Keys.push("SuppressReverseJVs");
                arr_Keys.push("SuppressForZeroes");


                arr_Vlaues.push(pAccountIDList);
                arr_Vlaues.push(pSubAccountIDList);
                arr_Vlaues.push(pJobIDList);
                arr_Vlaues.push(pFromDate);
                arr_Vlaues.push(pToDate);
                arr_Vlaues.push($("#slPost").val());
                //if ($("#cbIsPosted").prop("checked")) {
                //    arr_Vlaues.push($("#slBankAccount").val());
                //}
                //if ($("#cbIsUnPosted").prop("checked")) {
                // arr_Vlaues.push(0);
                //}
                //if ($("#cbIsAll").prop("checked")) {
                //    arr_Vlaues.push(2);
                //}
                arr_Vlaues.push(pSuppressReverseJVs);
                arr_Vlaues.push(pSuppressForZeroes);

                var pParametersWithValues =
                {
                    arr_Keys: arr_Keys
                    , arr_Vlaues: arr_Vlaues
                    , pTitle: "Activity Center Financial Ledger"
                    , pReportName: "Rep_A_JobSummeryCustomizedExcel"
                };
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Vlaues=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
                    FadePageCover(false);


        }


        else if ($("#cbWithoutJob").prop("checked")) {
            pParametersWithValues = {
                Account_IDs: ',' + pAccountIDList + ',',
                SubAccount_IDs: ',' + pSubAccountIDList + ',',
                JobIDs: ',' + pJobIDList + ',',
                From_Date: $("#txtFromDate").val(),
                To_Date: $("#txtToDate").val(),
                //posted: $("#cbIsPosted").prop("checked") ? 1 : $("#cbIsUnPosted").prop("checked") ? 0 : 2,
                posted: $("#slPost").val(),
                SuppressReverseJVs: (pSuppressReverseJVs),
                SuppressForZeroes: (pSuppressForZeroes),
                isByJob: false


            }
            CallGETFunctionWithParameters("/api/JobSummery/Print_JobSummery_Excel", pParametersWithValues
                , function (pData) {
                    var pTableRows = JSON.parse(pData[0]);
                    var ExcelHTML = "";
                    $.each(pTableRows, function (i, item) {
                        ExcelHTML += " <tr><td>" + item.JVNO + "</td><td>" + item.JVDate + "</td>";
                        ExcelHTML += " <td>" + item.AccountName + "</td><td>" + item.SubAccount_Name + "</td><td>" + item.Post + "</td>";
                        ExcelHTML += "<td>" + item.Debit + "</td><td>" + item.Credit + "</td>";
                        ExcelHTML += "<td>" + item.Currency_Code + "</td><td>" + item.ExchangeRate + "</td>" + "<td>" + item.LocalDebit + "</td>";
                        ExcelHTML += "<td>" + item.LocalCredit + "</td><td>" + item.Invoices + "</td>";
                        ExcelHTML += "<td>" + item.description + "</td><td>" + item.DepartementName + "</td><td>" + item.InvoiceNo + "</td></tr>";

                    });
                    $('#tblJobSummery').html($.parseHTML(ExcelHTML));
                    //$("#tblBankSheet").tblToExcel();
                    $("#tblJobSummery").tableHTMLExport({
                        type: 'csv',
                        filename: 'JobSummery.csv',
                        separator: ',',
                        newline: '\r\n',
                        trimContent: true,
                        quoteFields: true,
                        ignoreColumns: '',
                        ignoreRows: '',
                        htmlContent: false,
                        consoleLog: false,

                    });
                    FadePageCover(false);
                }
                , null);
        }
    }
}
//function Print_DebitNotesReport_Excel() {
//    debugger;
//    var strWhere = "";
//    var pAccountIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbAccount");
//    var pSubAccountIDList = $("#cbCheckAllSubAccounts").prop("checked") ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbSubAccount");

//    var pCostCenterIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCostCenter");
//    var pJobIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbJob");
//    var pFromDate = ConvertDateFormat($("#txtFromDate").val());
//    var pToDate = ConvertDateFormat($("#txtToDate").val());

//    pParametersWithValues = {
//        Account_IDs: pAccountIDList,
//        SubAccount_IDs: pSubAccountIDList,
//        JobIDs: pJobIDList,
//        From_Date : $("#txtFromDate").val(),
//        To_Date :$("#txtToDate").val(),
//        posted: $("#cbIsPosted").prop("checked") ? 1 : $("#cbIsUnPosted").prop("checked") ? 0 :2


//    }

//    CallGETFunctionWithParameters("/api/JobSummery/Print_JobSummery_Excel", pParametersWithValues
//        , function (pData) {
//                var ExcelHTML = JSON.parse(pData[0]);
//                $('#tblDebitNotes').html($.parseHTML(ExcelHTML));

//                $("#tblDebitNotes").tableHTMLExport({
//                    type: 'csv',
//                    filename: 'Debit Notes.csv',
//                    separator: ',',
//                    newline: '\r\n',
//                    trimContent: true,
//                    quoteFields: true,
//                    ignoreColumns: '',
//                    ignoreRows: '',
//                    htmlContent: false,
//                    consoleLog: false,
//                });
//            }
  
//        , null);
//}

function Details_FillCheckboxList() {
    debugger;
    FadePageCover(true);
    var pAccountID = $("#slAccountsGroup").val();
    var pAccountRealCode = $("#slAccountsGroup option:selected").attr("RealAccountCode");

    CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , {
            pIsLoadArrayOfObjects: true
        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 9999
        , pWhereClause: (pAccountID == 0 ? "WHERE IsMain=0" : "WHERE IsMain=0 AND RealAccountCode LIKE '" + pAccountRealCode + "%'")
            //, pWhereClause: (pAccountID == 0 ? "WHERE IsMain=0" : "WHERE IsMain=0 AND Parent_ID=" + pAccountID)
        , pOrderBy: "Account_Name"
        }
        , function (pData) {

            FillDivWithCheckboxes("divCbAccount", pData[3], "nameCbAccount", 4/*NameAndCode*/, null);
           


            FadePageCover(false);
        }
        , null);
}

//not used(i left it just to make it easy if requested)


function showHide() {
    if ($("#cbByJob").prop("checked")) {

        $(".clasJob").removeClass("hide");
        $(".classAllJob").removeClass("hide");

        $(".classlSubAccountGroup").addClass("hide");
        $(".clasStatement").addClass("hide");

    }
    else if ($("#cbByJobNew").prop("checked")){
        $(".classlSubAccountGroup").removeClass("hide");
        $(".classAllJob").removeClass("hide");

        $(".clasJob").addClass("hide");
        $(".clasStatement").addClass("hide");

    }
    else if ($("#cbstatement").prop("checked")) {
        $(".clasStatement").removeClass("hide");
        $(".clasJob").addClass("hide");
        $(".classlSubAccountGroup").addClass("hide");
        $(".classAllJob").addClass("hide");


    }
   

}