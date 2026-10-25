function ManifestReport_Initialize() {
    debugger;
    LoadView("/Reports/ManifestStatistics", "div-content", function () {
        debugger;
        CallGETFunctionWithParameters("/api/Vessels/IntializeManifest"
            , { pWhereClause: " WHERE 1=1" }
            , function (pData) {
                FillListFromObject(null, 2, "<--Select-->", "slVessels", pData[0], function () {
                    $("#slVessels").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slShippingLines", pData[1], function () {
                    $("#slShippingLines").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slIncoterms", pData[2], function () {
                    $("#slIncoterms").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slServices", pData[3], function () {
                    $("#slServices").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slPOL", pData[4], function () {
                    $("#slPOL").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slShippers", pData[5], function () {
                    $("#slShippers").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slConsignees", pData[6], function () {
                    $("#slConsignees").css({ "width": "100%" }).select2();
                });
                FillListFromObject(null, 2, "<--Select-->", "slAgents", pData[7], function () {
                    $("#slAgents").css({ "width": "100%" }).select2();
                });
                FadePageCover(false);
            },null);
    });
    
}


function ManifestStatistics_Print(type = "custom") {
    debugger;
  
    if ($("#slVessels").val() == '' || $("#slVessels").val() == '0' || !$("#slVessels").val()) {
        swal("Sorry", "Please,select the vessel.", "");
        return;
    }
    CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
        debugger;
        var arr_Keys = new Array();
        var arr_Values = new Array();
        var VesselID = $("#slVessels").val();
        var pWhereClause = ManifestStatistics_GetFilterWhereClause();
        arr_Keys.push("Logo");
        arr_Values.push(paths.logoPath);
        arr_Keys.push("VesselID");
        arr_Values.push(VesselID);
        arr_Keys.push("pWhereClause");
        arr_Values.push(pWhereClause);
        var Title = "Custom Manifest Report";
        var ReportName = "Rep_CustomManifest_TRI";
        if (type == "custom") {
            Title = "Custom Manifest Report";
            ReportName = "Rep_CustomManifest_TRI";
        } else if (type == "english") {
            Title = "English Manifest Report";
            ReportName = "Rep_EnglishManifest_TRI";
        } else if (type == "arabic") {
            Title = "Arabic Manifest Report";
            ReportName = "Rep_ArabicManifest_TRI";
        }
        var pParametersWithValues =
        {
            VesselID: VesselID
            , pWhereClause: pWhereClause
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: Title
            , pReportName: ReportName
            , pReportType: "Print"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&VesselID=' + pParametersWithValues.VesselID + ''
            + '&pWhereClause=' + pParametersWithValues.pWhereClause + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}


function ManifestStatistics_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 ";

    var ShippingLineID = $("#slShippingLines").val();
    var ConsigneeID = $("#slConsignees").val();
    var ShipperID = $("#slShippers").val();
    var AgentID = $("#slAgents").val();
    var POLID = $("#slPOL").val();
    var IncotermID = $("#slIncoterms").val();
    var ServiceID = $("#slServices").val();

    if (ShippingLineID != "" && ShippingLineID != "0" && ShippingLineID != null) {
        pWhereClause += " AND ShippingLineID =" + ShippingLineID;
    }

    if (ConsigneeID != "" && ConsigneeID != "0"  && ConsigneeID != null) {
        pWhereClause += " AND ConsigneeID =" + ConsigneeID;
    }

    if (ShipperID != "" && ShipperID != "0"  && ShipperID != null) {
        pWhereClause += " AND ShipperID =" + ShipperID;
    }

    if (AgentID != "" && AgentID != "0"  && AgentID != null) {
        pWhereClause += " AND AgentID =" + AgentID;
    }

    if (POLID != "" && POLID != "0"  && POLID != null) {
        pWhereClause += " AND POL =" + POLID;
    }

    if (IncotermID != "" && IncotermID != "0"  && ShippingLineID != "0"  && IncotermID != null) {
        pWhereClause += " AND IncotermID =" + IncotermID;
    }

    if (ServiceID != "" && ServiceID != "0"  && ServiceID != null) {
        pWhereClause += " AND ServiceID =" + ServiceID;
    }

    if (isValidDate($("#txtFilterFromATA").val().trim(), 1)) {
        if ($("#txtFilterFromATA").val() != null && $("#txtFilterFromATA").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ActualArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromATA").val()) + " 23:59:50.999'";
    }

    if (isValidDate($("#txtFilterToATA").val().trim(), 1)) {
        if ($("#txtFilterToATA").val() != null && $("#txtFilterToATA").val() != "" && pWhereClause !== "")
            pWhereClause += " AND ActualArrival <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToATA").val()) + " 23:59:50.999'";
    }


    return pWhereClause;
}


function HandleManifestRouting(target) {
    $('.manifest_section').addClass('hide');
    $('#' + target).removeClass('hide');
}