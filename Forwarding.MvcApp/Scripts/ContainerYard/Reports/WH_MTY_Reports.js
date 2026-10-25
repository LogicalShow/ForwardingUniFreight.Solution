function PrintCntrReports() {
    debugger;

    var arr_Keys = new Array();
    var arr_Values = new Array();
    var VarWhereClaue = '';
    arr_Keys.push("WhereClause");
    //arr_Values.push(" where 1 = 1 " );
    var VarEir = "";
    var VarTitle = "";
    if ($("#rGateIN").prop('checked') == true) {
        VarWhereClaue=" where 1 = 1 and EntryDate is not null   " + WH_MTY_Reports_GetWhereClause('GateIN');
        VarWhereClaue += " and EntryDate between '" + GetDateWithFormatyyyyMMdd($("#dtpFromDate").val().trim()) + "' and '" + GetDateWithFormatyyyyMMdd($("#dtpToDate").val().trim()) + "'";
        arr_Values.push(VarWhereClaue);
        VarTitle = 'Gate In';
        VarEir = "GateIN";
    }
    else if ($("#rInventory").prop('checked') == true) {
        arr_Values.push(" where 1 = 1 and EntryDate is not null and StorageEndDate is null " + WH_MTY_Reports_GetWhereClause('Inventory'));
        VarTitle = "Inventory";
        VarEir = "Inventory";
    }
    else if ($("#rGateOut").prop('checked') == true) {
        VarWhereClaue = " where 1 = 1 and StorageEndDate is not null " + WH_MTY_Reports_GetWhereClause('GateOut');
        VarWhereClaue += " and StorageEndDate between '" + GetDateWithFormatyyyyMMdd($("#dtpFromDate").val().trim()) + "' and '" + GetDateWithFormatyyyyMMdd($("#dtpToDate").val().trim()) + "'";
        arr_Values.push(VarWhereClaue);
        VarTitle = "Gate Out";
        VarEir = "GateOut";
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
    if (v == 'GateIN') {
        $("#divFromDate").removeClass("hidden");
        $("#divToDate").removeClass("hidden");
    }
    else if (v == 'Inventory') {
        $("#divFromDate").addClass("hidden");
        $("#divToDate").addClass("hidden");
    }
    else if (v == 'GateOut') {
        $("#divFromDate").removeClass("hidden");
        $("#divToDate").removeClass("hidden");
    }
    else {
        $("#divFromDate").addClass("hidden");
        $("#divToDate").addClass("hidden");
    }

}

function WH_MTY_Reports_GetWhereClause(PisGateOut) {
    debugger;
    var pWhereClause = "" + "\n";
    if ($("#txtContainerNo").val() != "")
        pWhereClause += "AND ContainerNumber like'%" + $("#txtContainerNo").val() + "%'\n";
    if ($("#txtCntrType").val() != "")
        pWhereClause += "AND ContainerType like'%" + $("#txtCntrType").val() + "%'\n";
    if ($("#txtWH_Warehouse").val() != "")
        pWhereClause += "AND WH_Warehouse like'%" + $("#txtWH_Warehouse").val() + "%'\n";
    if ($("#txtArea").val() != "")
        pWhereClause += "AND Area like'%" + $("#txtArea").val() + "%'\n";
    if ($("#txtRow").val() != "")
        pWhereClause += "AND Row like'%" + $("#txtRow").val() + "%'\n";
    if ($("#txtRowLocation").val() != "")
        pWhereClause += "AND RowLocation like'%" + $("#txtRowLocation").val() + "%'\n";
    if ($("#txtTruckNo").val() != "")
        pWhereClause += (PisGateOut == 'GateOut' ? "AND TruckNoOut like'%" : "AND TruckNo like'%") + $("#txtTruckNo").val() + "%'\n";
    if ($("#txtDriverName").val() != "")
        pWhereClause += (PisGateOut == 'GateOut' ? "AND DriverNameOut like'%" : "AND DriverName like'%") + $("#txtDriverName").val() + "%'\n";
    return pWhereClause;
}

