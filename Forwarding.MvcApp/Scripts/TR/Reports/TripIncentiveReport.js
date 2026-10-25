function ApplySelectListSearch() {
    debugger;
    $("#slDriver").css({ "width": "100%" }).select2();
    $("#slDriver").trigger("change");

    //$("div[tabindex='-1']").removeAttr('tabindex');
}
function TripIncentiveReport_Initialize() {
    debugger;
    LoadView("/TR/Reports/TripIncentiveReport", "div-content", function () {
        CallGETFunctionWithParameters("/api/TripIncentiveReport/GetStatisticsFilter", null
            , function (data) {
                //var pPortList = data[4];
                //var pUserList = data[5];
                $("#slSearchStatus").val("");
                //FillListFromObject(null, 2, "<--Select-->", "slTrailer", data[0], null);
                //FillListFromObject(null, 2, "<--Select-->", "slChargeType", data[1], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slDriver", data[0], null);
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEquipment", data[2], null);
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slPOL", pPortList
                //    , function () {
                //        $("#slPOD").html($("#slPOL").html());
                //        $("#slGateInPort").html($("#slPOL").html());
                //        $("#slGateOutPort").html($("#slPOL").html());
                //        $("#slLoadingZone").html($("#slPOL").html());
                //        $("#slFirstCuringArea").html($("#slPOL").html());
                //    });
                //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterCreator", pUserList, null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());

                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
                ApplySelectListSearch();
            }
            , function () { FadePageCover(false); $("#hl-menu-TR").parent().addClass("active"); });
    });
}
function TripIncentiveReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = TripIncentiveReport_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/TripIncentiveReport/LoadData"
            , pParametersWithValues
            , function (pData) {
                if (pData[0]) {//pRecordsExist
                    var pTripIncentive = JSON.parse(pData[1]);
                    var pFileName = "TripIncentive";
                    //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns)
                    ExportToExcel(pTripIncentive, "DriverCode,DriverName,Trucking Order Code,StartDate,EndDate,TripType,ClientName,POLName,PODName,TripIncentiveValue,ExtraIncentive,UndoingLoadingOrUnloadingIncentive,TotalTripIncentive", pFileName, null);
                }
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function TripIncentiveReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 " + "\n";
    //var pWhereClause = "WHERE IsDeleted=0 AND TrailerID IS NOT NULL ";
    //if ($("#slTrailer").val() != "")
    //    pWhereClause += " AND (TrailerID=" + $("#slTrailer").val() + ") \n";
    //if ($("#slChargeType").val() != "")
    //    pWhereClause += " AND (ChargeTypeID=" + $("#slChargeType").val() + ") \n";
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        pWhereClause += " AND CONVERT(date,GateOutDate,103) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        pWhereClause += " AND CONVERT(date,GateOutDate,103) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'" + " \n";
    if ($("#slDriver").val().trim() != "")
        pWhereClause += " AND DriverID =" + $("#slDriver").val() + " \n";
    //if ($("#txtOperationSerial").val().trim() != "")
    //    pWhereClause += " And OperationSerial = N'" + $("#txtOperationSerial").val().trim() + "'";
    //if ($("#slEquipment").val().trim() != "")
    //    pWhereClause += " And EquipmentID =" + $("#slEquipment").val();
    //if ($("#txtBillNumber").val().trim() != "")
    //    pWhereClause += " And BillNumber = N'" + $("#txtBillNumber").val().trim() + "'";
    if ($("#slSearchStatus").val() == 10)
        pWhereClause += " AND IsApproved = 1" + "\n";
    if ($("#slSearchStatus").val() == 20)
        pWhereClause += " AND IsApproved = 0" + "\n";

    return pWhereClause;
}
