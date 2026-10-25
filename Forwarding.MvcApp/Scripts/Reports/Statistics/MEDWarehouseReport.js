function WarehouseReport_Initialize() {
    debugger;
    LoadView("/Reports/MEDWarehouseReport", "div-content", function () {
        debugger;
        CallGETFunctionWithParameters("/api/MEDWarehouseReport/GetFilters", null, function (pData) {
            FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slOperations", pData[0], null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slMainWarehouse", pData[1], null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomer", pData[2], null);
        }, function () {
            $("#slMainWarehouse").trigger("change");
            $("#slMainWarehouse").css({ "width": "100%" }).select2();
            $("#slCustomer").trigger("change");
            $("#slCustomer").css({ "width": "100%" }).select2();
            $("#slOperations").trigger("change");
            $("#slOperations").css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
            FadePageCover(false);
        })
    });
    
}

function MEDWarehouseReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";

    var pFromDateETAFilter = "";
    var pToDateETAFilter = "";
    var pFromDateETDFilter = "";
    var pToDateETDFilter = "";

    if (isValidDate($("#txtFromDateETA").val().trim(), 1) && $("#txtFromDateETA").val().trim() != "") {
        pFromDateETAFilter = " CCWarehouseETA >= ''" + ConvertDateFormat($("#txtFromDateETA").val().trim()) + "''";
        pWhereClause += " AND " + pFromDateETAFilter;
    }
    if (isValidDate($("#txtToDateETA").val().trim(), 1) && $("#txtToDateETA").val().trim() != "") {
        pToDateETAFilter = " CCWarehouseETA <= ''" + ConvertDateFormat($("#txtToDateETA").val().trim()) + " 23:59:59''";
        pWhereClause += " AND " + pToDateETAFilter;
    }
    if (isValidDate($("#txtFromDateETD").val().trim(), 1) && $("#txtFromDateETD").val().trim() != "") {
        pFromDateETDFilter = " CCWarehouseATD >= ''" + ConvertDateFormat($("#txtFromDateETD").val().trim()) + "''";
        pWhereClause += " AND " + pFromDateETDFilter;
    }
    if (isValidDate($("#txtToDateETD").val().trim(), 1) && $("#txtToDateETD").val().trim() != "") {
        pToDateETDFilter = " CCWarehouseATD <= ''" + ConvertDateFormat($("#txtToDateETD").val().trim()) + " 23:59:59''";
        pWhereClause += " AND " + pToDateETDFilter;
    }


    if ($("#slOperations").val() != "" && $("#slOperations").val() != null) {
        pWhereClause += " AND OperationID =" + $("#slOperations").val();
    }

    if ($("#slMainWarehouse").val() != "" && $("#slMainWarehouse").val() != null) {
        pWhereClause += " AND MainWarehouseID =" + $("#slMainWarehouse").val();
    }
    if ($('#slCustomer').val() > 0) {
        pWhereClause += " AND CustomerID =" + $("#slCustomer").val();
    }
    pWhereClause += " AND RoutingTypeID = 70";
    return pWhereClause;
}

function MEDWarehouseReport_Print(pOption, pFilterType) {
    debugger;
    let pWhereClause = MEDWarehouseReport_GetFilterWhereClause();
    CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `Rep_MEDWarehouseReport ' ${pWhereClause}'`;
        arr_Keys.push("Logo");
        arr_Values.push(paths.logoPath);

        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Warehouse Report"
            , pReportName: "Rep_MEDWarehouseReport"
            , pReportType: "Print"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}