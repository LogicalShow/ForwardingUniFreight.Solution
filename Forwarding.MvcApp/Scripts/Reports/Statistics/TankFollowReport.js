//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

$(document).ready(function () {

    $("#slOperator,#slPol,#slPod").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');


});

function TankFollowReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1"
   

    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        pWhereClause += " AND  (in_OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        pWhereClause += " AND    out_OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "')";
    }
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        pWhereClause += " AND  (CAST(in_OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
        pWhereClause += " AND    CAST(out_OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "')";
    }

    if (isValidDate($("#txtFromDateExpire").val().trim(), 1) && $("#txtFromDateExpire").val().trim() != "") {
        pWhereClause += " AND  (in_TankCertExpiryDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateExpire").val().trim()) + "'";
        pWhereClause += " AND    out_TankCertExpiryDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateExpire").val().trim()) + "')";
    }
    if (isValidDate($("#txtToDateExpire").val().trim(), 1) && $("#txtToDateExpire").val().trim() != "") {
        pWhereClause += " AND  (CAST(in_TankCertExpiryDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateExpire").val().trim()) + "'";
        pWhereClause += " AND    CAST(out_TankCertExpiryDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateExpire").val().trim()) + "')";
    }
    if ($("#slOperator").val() != "") {
        pWhereClause += " AND (in_OperatorID =" + $("#slOperator").val() + " OR out_OperatorID=" + $("#slOperator").val()+")";
    }

    if ($("#txtTankOrFlexiNumber").val() != "") {
        pWhereClause += " AND (in_TankOrFlexiNumber ='" + $("#txtTankOrFlexiNumber").val() + "' OR out_TankOrFlexiNumber='" + $("#txtTankOrFlexiNumber").val()+"')";
    }

    if (isValidDate($("#txtFromATA").val().trim(), 1) && $("#txtFromATA").val().trim() != "") {
        pWhereClause += " AND  (in_ActualArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFromATA").val().trim()) + "'";
        pWhereClause += " AND    out_ActualArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFromATA").val().trim()) + "')";
    }
    if (isValidDate($("#txtToATA").val().trim(), 1) && $("#txtToATA").val().trim() != "") {
        pWhereClause += " AND  (CAST(in_ActualArrival AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToATA").val().trim()) + "'";
        pWhereClause += " AND    CAST(out_ActualArrival AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToATA").val().trim()) + "')";
    }

    if (isValidDate($("#txtFromATD").val().trim(), 1) && $("#txtFromATD").val().trim() != "") {
        pWhereClause += " AND  (in_ActualDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFromATD").val().trim()) + "'";
        pWhereClause += " AND    out_ActualDeparture >= '" + GetDateWithFormatyyyyMMdd($("#txtFromATD").val().trim()) + "')";
    }
    if (isValidDate($("#txtToATD").val().trim(), 1) && $("#txtToATD").val().trim() != "") {
        pWhereClause += " AND  (CAST(in_ActualDeparture AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToATD").val().trim()) + "'";
        pWhereClause += " AND    CAST(out_ActualDeparture AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToATD").val().trim()) + "')";
    }

    if (isValidDate($("#txtFromETA").val().trim(), 1) && $("#txtFromETA").val().trim() != "") {
        pWhereClause += " AND  (in_ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFromETA").val().trim()) + "'";
        pWhereClause += " AND    out_ExpectedArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFromETA").val().trim()) + "')";
    }
    if (isValidDate($("#txtToETA").val().trim(), 1) && $("#txtToETA").val().trim() != "") {
        pWhereClause += " AND  (CAST(in_ExpectedArrival AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToETA").val().trim()) + "'";
        pWhereClause += " AND    CAST(out_ExpectedArrival AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToETA").val().trim()) + "')";
    }

    if (isValidDate($("#txtFromLoading").val().trim(), 1) && $("#txtFromLoading").val().trim() != "") {
        pWhereClause += " AND  (out_LoadingDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromLoading").val().trim()) + "')";
    }
    if (isValidDate($("#txtToLoading").val().trim(), 1) && $("#txtToLoading").val().trim() != "") {
        pWhereClause += " AND  (CAST(out_LoadingDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToLoading").val().trim()) + "')";
    }

    if ($("#txtClientName").val() != "") {
        pWhereClause += " AND (in_ClientName ='" + $("#txtClientName").val() + "' OR out_ClientName='" + $("#txtClientName").val() + "')";
    }

    if ($("#txtBl").val() != "") {
        pWhereClause += " AND (in_MasterBL ='" + $("#txtBl").val() + "' OR out_MasterBL='" + $("#txtBl").val() + "')";
    }

    if ($("#slPol").val() != "") {
        pWhereClause += " AND (in_POLID =" + $("#slPol").val() + " OR out_POLID=" + $("#slPol").val() + ")";
    }

    if ($("#slPod").val() != "") {
        pWhereClause += " AND (in_PODID =" + $("#slPod").val() + " OR out_PODID=" + $("#slPod").val() + ")";
    }
    return pWhereClause;
}

function TankFollowReport_Print(pOption) {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();

    
    //var ReportName = pOption == "Print" ? "TankFollowReport" : "TankFollowReportExcel";
    var ReportName = "TankFollowReport"
    var query = `
                select * from vwTankFollowUpReport

                ${TankFollowReport_GetFilterWhereClause()} 
            `;

    debugger;

    query = query.replace(/[\n\t]/g, '');

    arr_Keys.push("query");
    arr_Values.push(query);

    debugger;
    var pParametersWithValues =
    {
          arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: pOption
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;



}