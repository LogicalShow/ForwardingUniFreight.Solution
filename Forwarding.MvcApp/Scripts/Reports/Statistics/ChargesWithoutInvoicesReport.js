//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

$(document).ready(function () {

    $("#slClient").css({ "width": "100%" }).select2();
    $("#slPOL").css({ "width": "100%" }).select2();
    $("#slPOD").css({ "width": "100%" }).select2();
    //$("#slBranch").css({ "width": "100%" }).select2();
    //$("#slChargeType").css({ "width": "100%" }).select2();
    $("#slOperations").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');


});

function ChargesWithoutInvoicesReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";
    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";

    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        pFromOpenDateFilter = " IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        pWhereClause += " AND " + pFromOpenDateFilter;

    }
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        pToOpenDateFilter = " CAST(IssueDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
        pWhereClause += " AND " + pToOpenDateFilter;

    }

    //if (isValidDate($("#txtFromDate").val().trim(), 1)) {
    //    if ($("#txtFromDate").val() != null && $("#txtFromDate").val() != "" && pWhereClause !== "")
    //        pWhereClause += " AND IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000'";
    //}
    //if (isValidDate($("#txtToDate").val().trim(), 1)) {
    //    if ($("#txtToDate").val() != null && $("#txtToDate").val() != "" && pWhereClause !== "")
    //        pWhereClause += " AND IssueDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:59.999'";
    //}

    if ($("#slOperations").val() != "") {
        pWhereClause += " AND OperationID =" + $("#slOperations").val();
    }

    if ($("#slClient").val() != "") {
        pWhereClause += " AND ClientID =" + $("#slClient").val();
    }

    if ($("#slPOL").val() != "") {
        pWhereClause += " AND POL =" + $("#slPOL").val();
    }

    if ($("#slPOD").val() != "") {
        pWhereClause += " AND POD =" + $("#slPOD").val();
    }

    //if ($("#slBranch").val() != "") {
    //    pWhereClause += " AND BranchID =" + $("#slBranch").val();
    //}

    if ($("#slIsROrP").val() != "") {
        pWhereClause += " AND IsROrP =" + $("#slIsROrP").val();
    }

    //if ($("#slChargeType").val() != "") {
    //    pWhereClause += " AND ChargeTypeID =" + $("#slChargeType").val();
    //}

    let chargeTypeIDs = "";
    if (!$("#cbCheckAllChargesTypes").prop("checked")) //if select all 
        chargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
    //console.log('cbChargesTypes : ' + cbChargesTypes);
    if (chargeTypeIDs != "")
        pWhereClause += " AND ChargeTypeID in(" + chargeTypeIDs + ")";


    if ($("#txtFilterBookingNumbers").val().trim() != "" && pWhereClause !== "") {
        //if (pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "OAO")
        //    pWhereClause += " AND (OperationBookingNumber like '%" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "%') ";
        //else
            pWhereClause += " AND (OperationBookingNumber = '" + $("#txtFilterBookingNumbers").val().trim().toUpperCase() + "') ";
    }

    if ($("#txtFilterMasterBL").val().trim() != "" && pWhereClause !== "") {
        //pWhereClause += " AND OperationMasterBL LIKE N'%" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "%' ";
        pWhereClause += " AND OperationMasterBL = N'" + $("#txtFilterMasterBL").val().trim().toUpperCase() + "' ";
    }

    if ($("#txtFilterHouseBLs").val().trim() != "" && pWhereClause !== "") {
        //if (pDefaults.UnEditableCompanyName == "NIS") {
        //    pWhereClause += " AND (" + " \n";
        //    pWhereClause += "       OperationHouseBLs LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
        //    pWhereClause += "       OR ID IN (SELECT MasterOperationID FROM Operations WHERE HouseNumber LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%')"
        //    //pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
        //    pWhereClause += "     ) \n ";
        //} else if (pDefaults.UnEditableCompanyName == "ALF" || pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "ELI" || pDefaults.UnEditableCompanyName == "DYN" || pDefaults.UnEditableCompanyName == "TEU" || pDefaults.UnEditableCompanyName == "SWI") {
        //    pWhereClause += " AND (" + " \n";
        //    pWhereClause += "       OperationHouseBLs LIKE N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%' ";
        //    pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwOperations.ID = op.MasterOperationID AND op.HouseNumber = N'%" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "%'), 0)) > 0)";
        //    pWhereClause += "     ) \n ";
        //}
        //else {
            pWhereClause += " AND (";
            pWhereClause += "       OperationHouseBLs=N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "' ";
        pWhereClause += "       OR ((ISNULL((SELECT COUNT(op.ID) FROM dbo.Operations AS op WHERE dbo.vwChargesWithoutInvoices.OperationID = op.MasterOperationID AND op.HouseNumber = N'" + $("#txtFilterHouseBLs").val().trim().toUpperCase() + "'), 0)) > 0)";
            pWhereClause += "     ) ";
        //}
    }

    if ($("#slOperationStatus").val() != "" && pWhereClause !== "") {
        pWhereClause += " AND OperationID IN (select ID from Operations WHERE OperationStageID=" + $("#slOperationStatus").val() + ")";
    }




    return pWhereClause;
}

function ChargesWithoutInvoicesReport_Print(pOption) {
    debugger;

    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("dummy");
    arr_Values.push("0");

    var ReportName = pOption == "Print" ? "ChargesWithoutInvoicesReport" : "ChargesWithoutInvoicesReportExcel";
    var query = `SELECT * FROM vwChargesWithoutInvoices ${ChargesWithoutInvoicesReport_GetFilterWhereClause()}`
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