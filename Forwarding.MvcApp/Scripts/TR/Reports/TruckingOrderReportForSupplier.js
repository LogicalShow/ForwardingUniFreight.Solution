function ApplySelectListSearch() {
    debugger;
    $("#slFilterTruckingOrder").css({ "width": "100%" }).select2();
    $("#slFilterTruckingOrder").trigger("change");

    $("#slFilterCreator").css({ "width": "100%" }).select2();
    $("#slFilterCreator").trigger("change");

    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");

    $("#slFilterTrucker").css({ "width": "100%" }).select2();
    $("#slFilterTrucker").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function TruckingOrderReportForSupplier_Initialize() {
    debugger;
    LoadView("/TR/Reports/TruckingOrderReportForSupplier", "div-content", function () {
        CallGETFunctionWithParameters("/api/TruckingOrderReportForSupplier/GetStatisticsFilter", null
            , function (pData) {
                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                var pUser = pData[8];

                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTrailerTruckingOrder", pData[2], function () { $("#slFilterTrailer").html($("#slTrailerTruckingOrder").html()); });
                FillListFromObject(null, 2, "<--Select-->", "slDriverTruckingOrder", pData[3], null);
                FillListFromObject(null, 2, "<--Select-->", "slDriverAssistantTruckingOrder", pData[4], null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsLoadingZoneTruckingOrder", pData[7], null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsFirstCuringAreaTruckingOrder", pData[7], null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsSecondCuringAreaTruckingOrder", pData[7], null);
                FillListFromObject(null, 2, "<--Select-->", "slRoutingsThirdCuringAreaTruckingOrder", pData[7], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEquipmentTruckingOrder", pData[6], null);

                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTruckingOrderGateInPortTruckingOrder", pData[7], null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterCreator", pUser, null);
                $("#slFilterCustomer").html($("#hReadySlCustomers").html());

                $("#slTruckingOrderGateOutPortTruckingOrder").html($("#slTruckingOrderGateInPortTruckingOrder").html());
                $("#slFilterEquipment").html($("#slEquipmentTruckingOrder").html());
                GetListWithNameAndWhereClause(0, '/api/Truckers/LoadAll', 'Select Trucker', "slFilterTrucker", ' WHERE 1=1 ORDER BY Name');

                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());

            }
            , function () { FadePageCover(false); $("#hl-menu-TR").parent().addClass("active"); });

        CallGETFunctionWithParameters("/api/routings/LoadAll"
            , {
                pWhereClause: "WHERE TruckingOrderCode IS NOT NULL AND IsFleet=0 AND IsOwnedByCompany=0 AND RoutingTypeID=" + TruckingOrderRoutingTypeID
                , pOrderBy: "ID DESC"
            }
            , function (pData) {
                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[0], "ID", "OperationCode,ClientName,TruckingOrderCode", ' --> ', "<--Select-->", "#slFilterTruckingOrder", null, "ID", function () { ApplySelectListSearch(); });
            }
            , null);

    });

}
function TruckingOrderReportForSupplier_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE RoutingTypeID=60 AND TruckingOrderCode IS NOT NULL AND IsFleet=0 AND IsOwnedByCompany=0 " + " ";
    if ($("#slFilterTruckingOrder").val() != 0)
        pWhereClause += " AND ID=" + $("#slFilterTruckingOrder").val();
    else {

        

        if ($("#txtFilterOperationSerial").val().trim() != "")
            pWhereClause += " And OperationSerial = N'" + $("#txtFilterOperationSerial").val().trim() + "'";
        if ($("#txtFilterTruckingOrderCode").val().trim() != "")
            pWhereClause += " And TruckingOrderCode = N'" + $("#txtFilterTruckingOrderCode").val().trim() + "'";
        if ($("#slFilterEquipment").val().trim() != "" && $("#slFilterEquipment").val().trim() != 0)
            pWhereClause += " And EquipmentID =" + $("#slFilterEquipment").val();
        if ($("#slFilterTrailer").val().trim() != "" && $("#slFilterTrailer").val().trim() != 0)
            pWhereClause += " And TrailerID =" + $("#slFilterTrailer").val();
        if ($("#slFilterCreator").val().trim() != "")
            pWhereClause += " And CreatorUserID =" + $("#slFilterCreator").val();
        if ($("#txtFilterTruckNumber").val().trim() != "")
            pWhereClause += " And VoyageOrTruckNumber LIKE N'%" + $("#txtFilterTruckNumber").val().trim() + "%'";
        if ($("#slFilterCustomer").val().trim() != "")
            pWhereClause += " And ClientName LIKE N'%" + $("#slFilterCustomer option:selected").text() + "%'";
        if ($("#txtFilterBillNumber").val().trim() != "")
            pWhereClause += " And BillNumber = N'" + $("#txtFilterBillNumber").val().trim() + "'";
        if ($("#txtFilterBookingNumber").val().trim() != "")
            pWhereClause += " And BookingNumber = N'" + $("#txtFilterBookingNumber").val().trim() + "'";
        if ($("#slSearchStatus").val() == 10)
            pWhereClause += " AND IsApproved = 1" + " ";
        if ($("#slSearchStatus").val() == 20)
            pWhereClause += " AND IsApproved = 0" + " ";
        if ($("#slFilterTrucker").val() != "")
            pWhereClause += " And TruckerID =" + $("#slFilterTrucker").val();
        if ($("#txtFilterInvoiceNumber").val().trim() != "")
            pWhereClause += " And InvoiceNumber = N'" + $("#txtFilterInvoiceNumber").val().trim() + "'  ";
        if ($("#txtFilterStuffingDate").val().trim() != "" && isValidDate($("#txtFilterStuffingDate").val().trim(), 1))
            pWhereClause += " And StuffingDate = N'" + $("#txtFilterStuffingDate").val().trim() + "'  ";

    }
    return pWhereClause;
}
function TruckingOrderReportForSuppliers_Print(pOutputTo) {
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("ClientName");
    arr_Values.push("0");

    var pWhereClauseForRoutings = "";
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        pWhereClauseForRoutings += " AND CONVERT(date,r.GateInDate,103) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + " ";
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        pWhereClauseForRoutings += " AND CONVERT(date,r.GateInDate,103) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'" + " ";

    var pWhereClause = TruckingOrderReportForSupplier_GetWhereClause();

    var ReportName = "TruckingOrderReportForSuppliers"
    //var query = `SELECT (SELECT TruckingOrderCode FROM Routings WHERE ID=TruckingOrderID ${pWhereClauseForRoutings} AND TruckingOrderCode IS NOT NULL) TruckingOrderCode, * FROM TruckingOrderContainers WHERE TruckingOrderID IN (SELECT ID FROM Routings ${pWhereClause})`;
    var query = `SELECT r.TruckingOrderCode,* FROM TruckingOrderContainers AS TOC LEFT JOIN Routings AS r ON r.ID = TOC.TruckingOrderID ${pWhereClause} ${pWhereClauseForRoutings}`;

    var pParametersWithValues = {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
        , pReportType: pOutputTo
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