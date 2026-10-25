function ClientsWithoutOperationsReport_Initialize() {

    LoadView("/Reports/ClientsWithoutOperationsReport", "div-content", function () {

   

    });
}

function Print(pOption)
{
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var query = ``;
    var pWhereClause = ' where 1=1 ';
    var pFromDate = ' 1=1 ';
    var pToDate = ' 1=1 ';
    if (IsNull($("#txtFromDate").val(), '') != '') {
        pFromDate = " OpenDate >= '" + $("#txtFromDate").val() + "'";
    }
    if (IsNull($("#txtToDate").val(), '') != '') {
        pToDate = " cast(OpenDate as date) <= '" + $("#txtToDate").val() + "'";
    }
    if ($('#cbIncludeInactive').is(':checked')) {
        pWhereClause += ` AND ID not in (select distinct ClientID from vwOperations where ${pFromDate} and ${pToDate})`;
        query = `select distinct Name as ClientName from Customers ${pWhereClause}`;
    }
    else {
        pWhereClause += ` AND ClientID not in (select distinct ClientID from vwOperations where ${pFromDate} and ${pToDate})`;
        query = `select distinct ClientName from vwOperations ${pWhereClause}`;
    }
    query = query.replace(/[\n\t]/g, '');
    debugger;
    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Clients Without Operations Report"
        , pReportName: "ClientsWithoutOperationsReport"
        , pReportType: pOption
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle=' + pParametersWithValues.pTitle + '&query=' + pParametersWithValues.query + '&arr_Keys=' + pParametersWithValues.arr_Keys + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}

