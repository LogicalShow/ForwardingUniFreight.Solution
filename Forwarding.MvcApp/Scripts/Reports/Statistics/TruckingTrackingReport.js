//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

$(document).ready(function () {

    $("#div-TruckingTrackingReport select").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');


});

function TruckingTrackingReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";

    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";

    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        pFromOpenDateFilter = " O.OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        pWhereClause += " AND " + pFromOpenDateFilter;
    }
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        pToOpenDateFilter = " CAST(O.OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
        pWhereClause += " AND " + pToOpenDateFilter;
    }

    if ($("#slOperations").val() > 0) {
        pWhereClause += " AND O.ID =" + $("#slOperations").val();
    }

    if ($("#slClient").val() > 0) {
        pWhereClause += " AND O.ClientID =" + $("#slClient").val();
    }
    if ($("#slTrucker").val() > 0) {
        pWhereClause += " AND O.TruckerID =" + $("#slTrucker").val();
    }
    
    return pWhereClause;
}

function TruckingTrackingReport_Print(pOption, pFilterType) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = pOption == "Print" ? "TruckingTrackingReport" : "TruckingTrackingReportExcel";
    //ReportName = "TruckingTrackingReport";

    var query = `SELECT O.ID,O.Code,O.TruckerName,O.ClientName,(SELECT r.LoadingDate FROM Routings AS r WHERE r.OperationID=O.ID AND r.RoutingTypeID=30) LoadingDate,O.TruckingApprovalDate 
                FROM vwOperations O ${TruckingTrackingReport_GetFilterWhereClause()} `

    debugger;

    query = query.replace(/[\n\t]/g, '');
    debugger;

    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: pOption
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;



}