function FileRoutingReport_Initialize() {

    LoadView("/Reports/FileRoutingReport", "div-content", function () {

   

    });
}

function Print(pOption)
{
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var pWhereClause = ' where 1=1 ';
    if (IsNull($("#txtFromDate").val(),'')!='') {
        pWhereClause += " AND OperationOpenDate >= '" + $("#txtFromDate").val() + "' ";
    }
    if (IsNull($("#txtToDate").val(), '') != '') {
        pWhereClause += " AND OperationOpenDate <= '" + $("#txtToDate").val() + "' ";
    }
    if (IsNull($("#txtFileFromDate").val(), '') != '') {
        pWhereClause += " AND FileAccountingDate >= '" + $("#txtFileFromDate").val() + "' ";
    }
    if (IsNull($("#txtFileToDate").val(), '') != '') {
        pWhereClause += " AND FileAccountingDate <= '" + $("#txtFileToDate").val() + "' ";
    }
    debugger
    var query = `select * from vwFileRoutingReport ${pWhereClause}`;

    query = query.replace(/[\n\t]/g, '');

    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "File Routing"
        , pReportName: "FileRoutingReport"
        , pReportType: pOption
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle=' + pParametersWithValues.pTitle + '&query=' + pParametersWithValues.query + '&arr_Keys=' + pParametersWithValues.arr_Keys + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}

