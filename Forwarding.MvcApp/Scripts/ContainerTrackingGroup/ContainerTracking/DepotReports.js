function PrintCntrReports() {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();
    var VarWhereClaue = '';
    arr_Keys.push("WhereClause");
    //arr_Values.push(" where 1 = 1 " );
    var VarEir = "";
    var VarTitle = "";
    if ($("#rContainerStock").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = 'Container Stock';
        VarEir = "ContainerStock";
    }
    else if ($("#rContainerStockSummary").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = "Container Stock Summary";
        VarEir = "ContainerStockSummary";
    }
    else if ($("#rEirSummary").prop('checked') == true) {
        VarWhereClaue = " where 1 = 1 and YardIsIn>=20 " + ContainerTracking_GetWhereClause();
        VarWhereClaue += " and EirDate between '" + GetDateWithFormatyyyyMMdd($("#dtpFromDate").val().trim()) + "' and '" + GetDateWithFormatyyyyMMdd($("#dtpToDate").val().trim()) + "'";
        arr_Values.push(VarWhereClaue);
        VarTitle = "Eir Summary";
        VarEir = "EIRSUMMARY";
    }
    else if ($("#rContainerStockByLocation").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = "Container Stock By Location";
        VarEir = "StockByLocation";
    }
    else if ($("#rContainerStockByLine").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = "Container Stock By Line";
        VarEir = "StockByLine";
    }
    else if ($("#rContainerStockByCustomers").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = "Container Stock By Customers";
        VarEir = "StockByCustomers";
    }
    else if ($("#rEirSummaryByDriver").prop('checked') == true) {
        VarWhereClaue = " where 1 = 1 and YardIsIn>=20 " + ContainerTracking_GetWhereClause();
        VarWhereClaue += " and EirDate between '" + GetDateWithFormatyyyyMMdd($("#dtpFromDate").val().trim()) + "' and '" + GetDateWithFormatyyyyMMdd($("#dtpToDate").val().trim()) + "'";
        arr_Values.push(VarWhereClaue);
        VarTitle = "Eir Summary By Driver";
        VarEir = "EirSummaryByDriver";
    }
    else if ($("#rContainerStockByconsignee").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and YardIsIn=20 " + ContainerTracking_GetWhereClause());
        VarTitle = "Container Stock By consignee";
        VarEir = "StockByconsignee";
    }
    else if ($("#rEirSummaryByTransporter").prop('checked') == true) {
        VarWhereClaue = " where 1 = 1 and YardIsIn>=20 " + ContainerTracking_GetWhereClause();
        VarWhereClaue += " and EirDate between '" + GetDateWithFormatyyyyMMdd($("#dtpFromDate").val().trim()) + "' and '" + GetDateWithFormatyyyyMMdd($("#dtpToDate").val().trim()) + "'";
        arr_Values.push(VarWhereClaue);
        VarTitle = "Eir Summary By Transporter";
        VarEir = "EirSummaryByTransporter";
    }
    debugger;
    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
           , pTitle: VarTitle
            , pReportName: VarEir
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    win.location = url;

    //end else
}


$('input[type=radio][name=radio]').change(function () {
    RadChange(this.value);
});


function RadChange(v) {
    debugger;
    if (v == 'EirSummary') {
        $("#divFromDate").removeClass("hidden");
        $("#divToDate").removeClass("hidden");
    }
    else if (v == 'EirSummaryByDriver') {
        $("#divFromDate").removeClass("hidden");
        $("#divToDate").removeClass("hidden");
    }
    else if (v == 'EirSummaryByTransporter') {
        $("#divFromDate").removeClass("hidden");
        $("#divToDate").removeClass("hidden");
    }
    else {
        $("#divFromDate").addClass("hidden");
        $("#divToDate").addClass("hidden");
    }

}

function ContainerTracking_GetWhereClause() {
    debugger;
    var pWhereClause = "" + "\n";
    if ($("#txtContainerNo").val() != "")
        pWhereClause += "AND ContainerNO like'%" + $("#txtContainerNo").val() + "%'\n";
    if ($("#txtSize").val() != "")
        pWhereClause += "AND Size like'%" + $("#txtSize").val() + "%'\n";
    if ($("#txtCustomer").val() != "")
        pWhereClause += "AND Customer like'%" + $("#txtCustomer").val() + "%'\n";
    if ($("#txtConsignee").val() != "")
        pWhereClause += "AND Consignee like'%" + $("#txtConsignee").val() + "%'\n";
    if ($("#txtLocation").val() != "")
        pWhereClause += "AND Location like'%" + $("#txtLocation").val() + "%'\n";
    if ($("#txtLoad").val() != "")
        pWhereClause += "AND Load like'%" + $("#txtLoad").val() + "%'\n";
    if ($("#txtJobNo").val() != "")
        pWhereClause += "AND JobNo like'%" + $("#txtJobNo").val() + "%'\n";
    if ($("#txtTransporter").val() != "")
        pWhereClause += "AND Transporter like'%" + $("#txtTransporter").val() + "%'\n";
    if ($("#txtTruckNo").val() != "")
        pWhereClause += "AND TruckNo like'%" + $("#txtTruckNo").val() + "%'\n";
    if ($("#txtDriver").val() != "")
        pWhereClause += "AND Driver like'%" + $("#txtDriver").val() + "%'\n";
    if ($("#txtBookingNo").val() != "")
        pWhereClause += "AND BookingNo like'%" + $("#txtBookingNo").val() + "%'\n";

    return pWhereClause;
}
