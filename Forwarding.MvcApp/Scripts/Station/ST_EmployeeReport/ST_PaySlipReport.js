function ST_PaySlipReport_Initialize() {
    $("#hl-menu-Station").parent().siblings().removeClass("active");

    strLoadWithPagingFunctionName = "/api/ST_PaySlipReport/LoadRows";
    LoadView("/Station/ST_PaySlipReport", "div-content", function () {
        var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        $("#txtFromDate").val(pFormattedTodaysDate);
        $("#txtToDate").val(pFormattedTodaysDate);

        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ST_PaySlipReport/FillSearchControls"
            , {}
            , function (pData) {
                FadePageCover(false);
                FillDivWithCheckboxes("divCbEmployee", pData[0], "nameCbEmployee", 5/*NameAndCode*/, null);
            }
            , null);

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        null,
        null);
}

function ST_PaySlipReport_cbCheckAllChanged() {
    debugger;
    if ($("#cbCheckAllAccounts").prop("checked"))
        $("#divCbEmployee input[name=nameCbEmployee]").prop("checked", true);
    else
        $("#divCbEmployee input[name=nameCbEmployee]").prop("checked", false);
}

function ST_PaySlipReport_Print() {
    debugger;
    var IDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbEmployee");
    if (IDs == '') {
        swal("Sorry", "Please, select at least one Employee.", "warning");
        return;
    }
    var fromDate = ConvertDateFormat($("#txtFromDate").val());
    var toDate = ConvertDateFormat($("#txtToDate").val());
    var days = Date.prototype.compareDates(fromDate, toDate);

    var query = `and Date BETWEEN '` + fromDate + `' AND '` + toDate+"'" ;

    var IDsArr = IDs.split(',');
    query += ` and (ID=` + IDsArr[0]+``;
    for (var i = 1; i < IDsArr.length; i++) {
        if (IDsArr[i] > 0)
            query += ` or ID=` + IDsArr[i] + ``;
    }
    query += `)`;
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("DateFrom");
    arr_Keys.push("DateTo");
    arr_Keys.push("Days");
    arr_Keys.push("query");

    arr_Values.push($("#txtFromDate").val());
    arr_Values.push($("#txtToDate").val());
    arr_Values.push(days);
    arr_Values.push(query);

    var pParametersWithValues =
    {
          arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "PaySlip"
        , pReportName: "ST_PaySlipReport"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}



