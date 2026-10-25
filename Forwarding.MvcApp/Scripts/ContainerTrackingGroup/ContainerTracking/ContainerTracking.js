function ContainerTracking_Initialize() {
    debugger;
    //TransferContainer = "";
    //ContainerTracking = "";
    $("#hl-menu-ContainerTrackingGroup").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "ContainerTracking_BindTableRows";
    strLoadWithPagingFunctionName = "/api/OperationContainersAndPackages/ContainerTracking_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    let pWhereClause = "WHERE 1=1";
    if (glbCallingControl != "TransferContainer")
        pWhereClause += "AND IsTracked=1";
    else
        pWhereClause += "AND ContainerTypeID IS NOT NULL AND OperationCode IS NOT NULL" + " \n";
    let pOrderBy = "OperationID DESC, ContainerNumber DESC";
    let pPageNumber = 1;
    let pPageSize = 10;
    let pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/ContainerTrackingGroup/ContainerTrackingTab/ContainerTracking", "div-content", function () {
        /***************************Ahmed Mohamed*****************************/
        $('#BtnGnrtSrIn').click(function () {
            //alert('ok');
            debugger;
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/getEirSerial", null
            , function (pData) {
                if (pData[0]) {
                    //PaymentDetails_BindTableRows(JSON.parse(pData[3])); //pTblPaymentDetails: pData[3]
                    //Payment_BindTableRows(JSON.parse(pData[4])); //pTblPayment: pData[4]

                    if ($("#txtYardEIRNumber").val() == "") {
                        $("#txtYardEIRNumber").val(pData[0]);
                    }
                }
                else {

                    swal("Sorry", "Connection failed, please try again.");
                }
            }
            , null);
        });
        $('#BtnGnrtSrOut').click(function () {
            //alert('ok');
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/getEirSerial", null
            , function (pData) {
                if (pData[0]) {
                    //PaymentDetails_BindTableRows(JSON.parse(pData[3])); //pTblPaymentDetails: pData[3]
                    //Payment_BindTableRows(JSON.parse(pData[4])); //pTblPayment: pData[4]
                    if ($("#txtYardEIRNumberOut").val() == "") {
                        $("#txtYardEIRNumberOut").val(pData[0]);
                    }
                }
                else {
                    swal("Sorry", "Connection failed, please try again.");
                }
            }
            , null);
        });
        $('input[type=radio][name=optionsRadios2]').change(function () {
            RadChange(this.value);
        });

            LoadView("/MasterData/ModalSelectCharges", "div-content", function () {
                $("#slPayableBillTo").parent().addClass("hide");
                $("#btn-SetDefaultNote").parent().addClass("hide");
                if (pDefaults.UnEditableCompanyName == "GBL") {
                    $(".classShowForGBL").removeClass("hide");
                }
            }, null, null, true);//sherif: calling a partial view with only modal called from different places
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pOperations = pData[2];
                    var pPorts = pData[3];
                    var pTrailer = pData[4];
                    var pDriver = pData[5];
                    var pDriverAssistant = pData[6];
                    var pWH_RowLocation = pData[7];
                    $("#slBookingPartySearch").html($("#hReadySlCustomers").html());
                    ContainerTracking_BindTableRows(JSON.parse(pData[0]));
                    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                    if (glbCallingControl == "TransferContainer")
                        CallGETFunctionWithParameters("/api/Operations/LoadOperationsToRestoreInvoices"
                        , { pPageSize: 99999, pWhereClauseToGetOperationsToRestoreInvoices: "WHERE ShipmentType IN (" + constFCLShipmentType + "," + constFTLShipmentType + "," + constConsolidationShipmentType + ") ", pOrderBy: "ID DESC" }
                        , function (pData) {
                            FillListFromObject(null, 13, "<--Select-->", "slOperationSearch", pData[0]
                                , function () { $("#slOperation").html($("#slOperationSearch").html()); $("#slOperation_Destination").html($("#slOperationSearch").html()); });
                        }
                        , null);
                    else
                        FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slOperationSearch", pOperations, function () { $("#slOperation").html($("#slOperationSearch").html()); });
                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slGateOutPort", pPorts, function () { $("#slGateInPort").html($("#slGateOutPort").html()); });
                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slTrailer", pTrailer, null);
                    FillListFromObject(null, 2, "<--Select-->", "slDriver", pDriver, null);
                    FillListFromObject(null, 2, "<--Select-->", "slDriverAssistant", pDriverAssistant, null);
                    FillListFromObject(null, 1, "<--Select-->", "slYardLocationID", pWH_RowLocation, null);
                });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { ContainerTracking_ClearAllControls(); },
        function () { ContainerTracking_DeleteList(); });
}
function ContainerTracking_BindTableRows(pTabelRows) {
    $("#hl-menu-ContainerTrackingGroup").parent().addClass("active");
    ClearAllTableRows("tblContainerTracking");
    let editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    let transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right " + (OEDoc ? "" : " hide ") + "' > <i class='fa fa-exchange' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Transfer" + "</span>";
    $.each(pTabelRows, function (i, item) {
        AppendRowtoTable("tblContainerTracking",
        ("<tr ID='" + item.ID + "' class='" + (item.IsLoaded ? " text-primary " : "") + "' " + (glbCallingControl == "TransferContainer" ? "" : " ondblclick='ContainerTracking_FillControls(" + item.ID + ");'") + ">"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='OperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='OperationCode'>" + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + "</td>"
                    + "<td class='ContainerNumber'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>"
                    + "<td class='ContainerTypeCode'>" + item.ContainerTypeCode + "</td>"
                    + "<td class='GateOutPortID hide'>" + item.GateOutPortID + "</td>"
                    + "<td class='GateOutPortName'>" + (item.GateOutPortName == 0 ? "" : item.GateOutPortName) + "</td>"
                    + "<td class='GateInPortID hide'>" + item.GateInPortID + "</td>"
                    + "<td class='GateInPortName'>" + (item.GateInPortName == 0 ? "" : item.GateInPortName) + "</td>"
                    + "<td class='GateOutDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.GateOutDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.GateOutDate))) + "</td>"
                    + "<td class='StuffingDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StuffingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.StuffingDate))) + "</td>"
                    + "<td class='LoadingDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate))) + "</td>"
                    + "<td class='GateOutAndLoadingDatesDifference'>" + item.GateOutAndLoadingDatesDifference + "</td>"
                    + "<td class='Factory'>" + (item.Factory == 0 ? "" : item.Factory) + "</td>"
                    + "<td class='ExportBLNumber'>" + (item.ExportBLNumber == 0 ? "" : item.ExportBLNumber) + "</td>"
                    + "<td class='ImportBLNumber'>" + (item.ImportBLNumber == 0 ? "" : item.ImportBLNumber) + "</td>"
                    + "<td class='ShipperName hide'>" + (item.ShipperName == 0 ? "" : item.ShipperName) + "</td>"
                    + "<td class='ShippingLineName hide'>" + (item.ShippingLineName == 0 ? "" : item.ShippingLineName) + "</td>"
                    + "<td class='IsOwnedByCompany hide'><input type='checkbox' id='cbIsOwnedByCompany" + item.ID + "' disabled='disabled' " + (item.IsOwnedByCompany ? " checked='checked' " : "") + " /></td>"
                    + "<td class='TrailerID hide'>" + (item.TrailerID == 0 ? "" : item.TrailerID) + "</td>"
                    + "<td class='DriverID hide'>" + (item.DriverID == 0 ? "" : item.DriverID) + "</td>"
                    + "<td class='DriverAssistantID hide'>" + (item.DriverAssistantID == 0 ? "" : item.DriverAssistantID) + "</td>"
                    + "<td class='DriverName hide'>" + (item.DriverName == 0 ? "" : item.DriverName) + "</td>"
                    + "<td class='DriverAssistantName hide'>" + (item.DriverAssistantName == 0 ? "" : item.DriverAssistantName) + "</td>"
                    + "<td class='TrailerName hide'>" + (item.TrailerName == 0 ? "" : item.TrailerName) + "</td>"
                    + "<td class='IsLoaded'> <input id='cbIsLoaded" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='YardEIRNumber hide'>" + (item.YardEIRNumber == 0 ? "" : item.YardEIRNumber) + "</td>"
                    + "<td class='YardInDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.YardInDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.YardInDate))) + "</td>"
                    + "<td class='YardInTime hide'>" + (item.YardInTime == 0 ? "" : msToTime(item.YardInTime)) + "</td>"
                    + "<td class='YardOutDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.YardOutDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.YardOutDate))) + "</td>"
                    + "<td class='YardOutTime hide'>" + (item.YardOutTime == 0 ? "" : msToTime(item.YardOutTime)) + "</td>"
                    + "<td class='YardLocationID hide'>" + (item.YardLocationID == 0 ? "" : item.YardLocationID) + "</td>"
                    + "<td class='YardIsIn hide'>" + (item.YardIsIn == 0 ? "" : item.YardIsIn) + "</td>"
                    + "<td class='IsFull hide'>" + (item.IsFull == true ? true : false) + "</td>"
                    + "<td class='YardEIRNumberOut hide'>" + (item.YardEIRNumberOut == 0 ? "" : item.YardEIRNumberOut) + "</td>"
                    + "<td class=''>"
                        //+ "<a href='#ModalContainerTracking' data-toggle='modal' onclick='ContainerTracking_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                        + (glbCallingControl == "TransferContainer" ? ("<a href='#' data-toggle='modal' onclick='ContainerTracking_FillTransferContainerModal(" + item.ID + "," + item.OperationID + ");' " + transferControlsText + "</a>") : "")
                    + "</td></tr>"));
    });
    if (glbCallingControl != "TransferContainer")
        ApplyPermissions();
    BindAllCheckboxonTable("tblContainerTracking", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteContainerTrackingID");
    HighlightText("#tblContainerTracking>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ContainerTracking_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;
    var pWhereClause = ContainerTracking_GetWhereClause();
    var pOrderBy = " OperationID DESC, ContainerNumber DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (data) { ContainerTracking_BindTableRows(JSON.parse(data[0])); FadePageCover(true); });
    HighlightText("#tblContainerTracking>tbody>tr", $("#txt-Search").val().trim());
}
function ContainerTracking_GetWhereClause() {
    debugger;
    let pWhereClause = "WHERE 1=1";
    if (glbCallingControl != "TransferContainer")
        pWhereClause += "AND IsTracked=1" + "\n";
    else
        pWhereClause += "AND ContainerTypeID IS NOT NULL AND OperationCode IS NOT NULL" + " \n";
    if ($("#slOperationSearch").val() != "")
        pWhereClause += "AND OperationID=" + $("#slOperationSearch").val() + "\n";
    if ($("#slBookingPartySearch").val() != "")
        pWhereClause += "AND BookingPartyID=" + $("#slBookingPartySearch").val() + "\n";
    if ($("#slLoadedSearch").val() == 10)
        pWhereClause += "AND IsLoaded=1" + "\n";
    else if ($("#slLoadedSearch").val() == 20)
        pWhereClause += "AND IsLoaded=0" + "\n";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += "AND (";
        pWhereClause += "ContainerNumber LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "OR Factory LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "OR ExportBLNumber LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "OR ImportBLNumber LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "OR ShipperName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "OR ShippingLineName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function ContainerTracking_ClearAllControls(callback) {
    //ClearAll("#ModalContainerTracking");
    //jQuery("#ModalContainerTracking").modal("show");
    //var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //$("#txtGateOutDate").val(pFormattedTodaysDate);
    //$("#txtStuffingDate").val(pFormattedTodaysDate);
    //$("#txtLoadingDate").val(pFormattedTodaysDate);

    //$("#btnSave").attr("onclick", "ContainerTracking_Insert(false);");
    //$("#btnSaveandNew").attr("onclick", "ContainerTracking_Insert(true);");
    //$("#cb-CheckAll").prop('checked', false);
    //if (callback != null && callback != undefined)
    //    callback();

    if ($("#slOperationSearch").val() == "")
        swal("Sorry", "Please, select an opertion to retrieve its containers.");
    else {
        jQuery("#CheckboxesListModal").modal("show");
        $("#btnCheckboxesListApply").attr("onclick", "ContainerTracking_AddContainers();");
        $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-save'></span> Add Containers");
        $("#btn-SearchItems").attr("onclick", "ContainerTracking_GetAvailableItems();");
        ContainerTracking_GetAvailableItems();
    }
}
function ContainerTracking_FillControls(pID) {
    debugger;
    ClearAll("#ModalContainerTracking");
    jQuery("#ModalContainerTracking").modal("show");
    tr = $("#tblContainerTracking tr[id=" + pID + "]");
    $("#hID").val(pID);
    $("#slOperation").val(tr.find("td.OperationID").text());
    $("#txtContainerNumber").val(tr.find("td.ContainerNumber").text());
    $("#txtContainerTypeCode").val(tr.find("td.ContainerTypeCode").text());
    $("#slGateInPort").val(tr.find("td.GateInPortID").text() == 0 ? "" : tr.find("td.GateInPortID").text());
    $("#slGateOutPort").val(tr.find("td.GateOutPortID").text() == 0 ? "" : tr.find("td.GateOutPortID").text());
    $("#txtGateOutDate").val(tr.find("td.GateOutDate").text());
    $("#txtStuffingDate").val(tr.find("td.StuffingDate").text());
    $("#txtLoadingDate").val(tr.find("td.LoadingDate").text());
    $("#txtGateOutAndLoadingDatesDifference").val(tr.find("td.GateOutAndLoadingDatesDifference").text());
    $("#txtFactory").val(tr.find("td.Factory").text());
    $("#txtExportBLNumber").val(tr.find("td.ExportBLNumber").text());
    $("#txtImportBLNumber").val(tr.find("td.ImportBLNumber").text());
    $("#txtShipperName").val(tr.find("td.ShipperName").text());
    $("#txtShippingLine").val(tr.find("td.ShippingLineName").text());
    $("#cbIsLoaded").prop("checked", $("#cbIsLoaded" + pID).prop("checked"));

    $("#cbIsOwnedByCompany").prop("checked", $("#cbIsOwnedByCompany" + pID).prop("checked"));
    ContainerTracking_ShowHideOwnedByCompanyProperties($("#cbIsOwnedByCompany" + pID).prop("checked"));
    if (!$("#cbIsOwnedByCompany").prop("checked")) {
        $("#txtSupplierDriverName").val($(tr).find("td.DriverName").text());
        $("#txtSupplierDriverAssistantName").val($(tr).find("td.DriverAssistantName").text());
        $("#txtSupplierTrailerName").val($(tr).find("td.TrailerName").text());
    }
    else {
        $("#slTrailer").val(tr.find("td.TrailerID").text());
        $("#slDriver").val(tr.find("td.DriverID").text());
        $("#slDriverAssistant").val(tr.find("td.DriverAssistantID").text());
    }
    /*************************Ahmed Mohamed*******************/
    $("#txtYardEIRNumber").val($(tr).find("td.YardEIRNumber").text());
    $("#txtYardInDate").val(tr.find("td.YardInDate").text());
    $("#txtYardInTime").val($(tr).find("td.YardInTime").text());
    $("#txtYardOutDate").val(tr.find("td.YardOutDate").text());
    $("#txtYardOutTime").val($(tr).find("td.YardOutTime").text());
    $("#slYardLocationID").val(tr.find("td.YardLocationID").text());
    tr.find("td.YardIsIn").text() == 10 ? $("#radNone").prop('checked', true) :
    tr.find("td.YardIsIn").text() == 20 ? $("#radGateIn").prop('checked', true) :
    tr.find("td.YardIsIn").text() == 30 ? $("#radGateOut").prop('checked', true) : 0;
    var radValue = 'None';
    radValue = tr.find("td.YardIsIn").text() == 10 ? 'None' :
    tr.find("td.YardIsIn").text() == 20 ? 'GateIn' :
    tr.find("td.YardIsIn").text() == 30 ? 'GateOut' : 'None';
    setTimeout(function () { RadChange(radValue); }, 200);
    tr.find("td.IsFull").text() == "true" ? $("#radFull").prop('checked', true) :
    $("#radEmpty").prop('checked', true);
    $("#txtYardEIRNumberOut").val($(tr).find("td.YardEIRNumberOut").text());
    /*************************Ahmed Mohamed*******************/
    Containertracking_FillPayablesAndReceivables(tr.find("td.OperationID").text(), pID);
    $("#btnSave").attr("onclick", "ContainerTracking_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ContainerTracking_Update(true);");
}
function ContainerTracking_Update(pSaveAndNew) {
    debugger;
    isValid = true;
    if ($("#txtContainerNumber").val().trim() != "" && $("#txtContainerNumber").val().toUpperCase().match("^[A-Z]{4}\[0-9]{7}$") == null) {
        isValid = false;
        swal(strSorry, "Container Number Format must be like 'ABCD1234567'");
    }
    if (!ValidateForm("form", "ModalContainerTracking") && isValid) {
        strMissingFields = ContainerTracking_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else if (ValidateForm("form", "ModalContainerTracking") && isValid) {
        var vGateStatus = 0;
        vGateStatus = $("#radNone").prop('checked') == true ? 10 :
                        $("#radGateIn").prop('checked') == true ? 20 :
                        $("#radGateOut").prop('checked') == true ? 30 : 0;
        var pParametersWithValues = {
            //Header
            pID: $("#hID").val()
            , pOperationID: $("#slOperation").val() == "" ? 0 : $("#slOperation").val()
            , pGateOutPortID: $("#slGateOutPort").val() == "" ? 0 : $("#slGateOutPort").val()
            , pGateInPortID: $("#slGateInPort").val() == "" ? 0 : $("#slGateInPort").val()
            , pGateOutDate: $("#txtGateOutDate").val().trim() == "" ? "01/01/1900" : GetDateWithFormatyyyyMMdd($("#txtGateOutDate").val().trim())
            , pStuffingDate: $("#txtStuffingDate").val().trim() == "" ? "01/01/1900" : GetDateWithFormatyyyyMMdd($("#txtStuffingDate").val().trim())
            , pLoadingDate: $("#txtLoadingDate").val().trim() == "" ? "01/01/1900" : GetDateWithFormatyyyyMMdd($("#txtLoadingDate").val().trim())
            , pGateOutAndLoadingDatesDifference: $("#txtGateOutAndLoadingDatesDifference").val().trim() == "" ? 0 : $("#txtGateOutAndLoadingDatesDifference").val()
            , pContainerNumber: $("#txtContainerNumber").val().trim() == "" ? "0" : $("#txtContainerNumber").val().trim().toUpperCase()
            , pFactory: $("#txtFactory").val().trim() == "" ? "0" : $("#txtFactory").val().trim().toUpperCase()
            , pExportBLNumber: $("#txtExportBLNumber").val().trim() == "" ? "0" : $("#txtExportBLNumber").val().trim().toUpperCase()
            , pImportBLNumber: $("#txtImportBLNumber").val().trim() == "" ? "0" : $("#txtImportBLNumber").val().trim().toUpperCase()
            , pIsLoaded: $("#cbIsLoaded").prop("checked")
            
            , pIsOwnedByCompany: $("#cbIsOwnedByCompany").prop("checked")
            , pTrailerID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slTrailer").val() == "" ? 0 : $("#slTrailer").val())
            , pDriverID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriver").val() == "" ? 0 : $("#slDriver").val())
            , pDriverAssistantID: (!$("#cbIsOwnedByCompany").prop("checked") || $("#slDriverAssistant").val() == "" ? 0 : $("#slDriverAssistant").val())
            , pSupplierDriverName: ($("#cbIsOwnedByCompany").prop("checked") || $("#txtSupplierDriverName").val().trim() == "" ? 0 : $("#txtSupplierDriverName").val().trim().toUpperCase())
            , pSupplierDriverAssistantName: ($("#cbIsOwnedByCompany").prop("checked") || $("#txtSupplierDriverAssistantName").val().trim() == "" ? 0 : $("#txtSupplierDriverAssistantName").val().trim().toUpperCase())
            , pSupplierTrailerName: ($("#cbIsOwnedByCompany").prop("checked") || $("#txtSupplierTrailerName").val().trim() == "" ? 0 : $("#txtSupplierTrailerName").val().trim().toUpperCase())

            /*************************Ahmed Mohamed**************************/
            , pYardEIRNumber: $("#txtYardEIRNumber").val().trim() == "" ? "0" : $("#txtYardEIRNumber").val().trim().toUpperCase()
            , pYardInDate: $("#txtYardInDate").val().trim() == "" ? "01/01/1900" : GetDateWithFormatyyyyMMdd($("#txtYardInDate").val().trim())
            , pYardInTime: $("#txtYardInTime").val().trim() == "" ? "0" : TimeToMSecond($("#txtYardInTime").val())
            , pYardOutDate: $("#txtYardOutDate").val().trim() == "" ? "01/01/1900" : GetDateWithFormatyyyyMMdd($("#txtYardOutDate").val().trim())
            , pYardOutTime: $("#txtYardOutTime").val().trim() == "" ? "0" : TimeToMSecond($("#txtYardOutTime").val())
            , pYardLocationID: $("#slYardLocationID").val() == "" ? 0 : $("#slYardLocationID").val()
            , pYardIsIn: vGateStatus
            , pIsFull: $("#radFull").prop('checked')
            , pYardEIRNumberOut: $("#txtYardEIRNumberOut").val().trim() == "" ? "0" : $("#txtYardEIRNumberOut").val().trim().toUpperCase()
            ////LoadWithPaging parameters
            //, pWhereClausePayment: Payment_GetWhereClause()
            //, pPageSize: $("#select-page-size").val()
            //, pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            //, pOrderBy: "ID DESC"
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ContainerTracking_Update", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //PaymentDetails_BindTableRows(JSON.parse(pData[3])); //pTblPaymentDetails: pData[3]
                    //Payment_BindTableRows(JSON.parse(pData[4])); //pTblPayment: pData[4]
                    jQuery("#ModalContainerTracking").modal("hide");
                    ContainerTracking_LoadWithPagingWithWhereClauseAndOrderBy();
                }
                else {
                    swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function ContainerTracking_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContainerTracking') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ContainerTracking_Delete"
                , { "pRemovedContainerIDsFromTracking": GetAllSelectedIDsAsString('tblContainerTracking') }
                , function (pData) {
                    var _MessageReturned = pData[0];
                    if (_MessageReturned == "") {
                        swal("Success", "Saved successfully.");
                        ContainerTracking_LoadWithPagingWithWhereClauseAndOrderBy();
                    }
                    else {
                        swal("Sorry", _MessageReturned);
                        FadePageCover(false);
                    }
                }
                , null);
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function ContainerTracking_GetDaysDifference() {
    debugger;
    if (isValidDate($("#txtGateOutDate").val().trim(), 1) && isValidDate($("#txtLoadingDate").val().trim(), 1)) {
        $("#txtGateOutAndLoadingDatesDifference").val(
            Date.prototype.compareDates(ConvertDateFormat($("#txtGateOutDate").val().trim()), ConvertDateFormat($("#txtLoadingDate").val().trim())));
    }
    else {
        $("#txtGateOutAndLoadingDatesDifference").val(0);
    }
}
function ContainerTracking_GetAvailableItems() {
    debugger;
    FadePageCover(true);
    $("#lblShownItems").html($("#slOperationSearch option:selected").text() + " Containers");
    $("#divCheckboxesList").html("");
    var pStrFnName = "/api/OperationContainersAndPackages/LoadWithWhereClause";
    var pDivName = "divCheckboxesList";
    $("#divCheckboxesList").html("");
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    //pWhereClause += " WHERE IsInactive=0 AND ID <> " + $("#hLoggedUserID").val();
    pWhereClause += "WHERE IsTracked=0 AND OperationID=" + $("#slOperationSearch").val();
    //pWhereClause += " AND ( Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR LocalName LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND Name LIKE N'%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "ContainerTypeCode" };
    GetListAsCheckboxesWithVariousParameters(pStrFnName, pControllerParameters, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            FadePageCover(false);
        }
        , 4, "col-sm-2");
}
function ContainerTracking_AddContainers() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedItemsIDs == "")
        swal("Sorry", "You have to select at least one container.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pSelectedItemsIDs: pSelectedItemsIDs
            ////LoadWithPaging parameters
            //, pWhereClauseForLoadWithPaging: LocalEmails_GetWhereClause()
            //, pPageSize: $("#select-page-size").val()
            ////pPageNumber is 1 coz its insert so it will be on the top
            //, pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text() 
            //, pOrderBy: "ID DESC"
        };
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/TrackContainers", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    ContainerTracking_LoadWithPagingWithWhereClauseAndOrderBy();
                    jQuery("#CheckboxesListModal").modal("hide");
                    swal("Success", "Saved Successfully.");
                }
                else {
                    swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
            }
            , null);
    }
}
function Containertracking_FillPayablesAndReceivables(pOperationID, pOperationContainerAndPackagesID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("api/Operations/GetContainerTrackingPayablesAndReceivables"
            , {
                pOperationID: pOperationID
                , pOperationContainersAndPackagesID: pOperationContainerAndPackagesID
            }
            , function (pData) {
                if (pData[0]) {
                    var pPayables = JSON.parse(pData[1]);
                    var pReceivables = JSON.parse(pData[2]);
                    Payables_BindTableRows(pPayables);
                    Receivables_BindTableRows(pReceivables);
                }
                else
                    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);
}
function ContainerTracking_ShowHideOwnedByCompanyProperties(pIsCompanyOwned) {
    debugger;
    if ($("#cbIsOwnedByCompany").prop("checked") || pIsCompanyOwned) {
        $(".classOwnedByCompany").removeClass("hide");
        $(".classOwnedBySupplier").addClass("hide");
    }
    else {
        $(".classOwnedByCompany").addClass("hide");
        $(".classOwnedBySupplier").removeClass("hide");
    }
}
function ContainerTracking_FillTransferContainerModal(pID, pOriginalOperationID) {
    debugger;
    tr = $("#tblContainerTracking tr[id=" + pID + "]");
    $("#hID").val(pID);
    $("#slOperation").val(tr.find("td.OperationID").text());

    jQuery("#SelectOperationModal").modal("show");
}
function ContainerTracking_TransferHouse() {
    debugger;
    if ($("#slOperation_Destination").val() == "")
        swal("Sorry", "Please, select operation.");
    else
        swal({
            title: "Are you sure?",
            text: "House will be transfered.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply",
            closeOnConfirm: false
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pTransferredContainerID: $("#hID").val()
                , pOriginalOperationID: $("#slOperation").val()
                , pTransferToOperationID: $("#slOperation_Destination").val()
            };
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/TransferContainer", pParametersWithValues
                , function (pData) {
                    let pReturnedMessage = pData[0];
                    if (pReturnedMessage == "") {
                        swal("Success", "Transferred successsfully.");
                        ContainerTracking_LoadWithPagingWithWhereClauseAndOrderBy();
                        jQuery("#SelectOperationModal").modal("hide");
                    }
                    else {
                        swal("Sorry", pReturnedMessage);
                        FadePageCover(false);
                    }
                }
                , null);
        });
}
//By Ahmed Mohamed
function ContainerTracking_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab
    if ($("#radGateIn").prop('checked') == true) {
        if ($("#txtYardEIRNumber").val() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> EIR Number.\n";
        if ($("#txtYardInDate").val() == '01/01/1900' || $("#txtYardInDate").val() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> Yard In Date.\n";
        if ($("#txtYardInTime").val().trim() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> Yard In Time.\n";
    }
    else if ($("#radGateOut").prop('checked') == true) {
        if ($("#txtYardEIRNumberOut").val() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> EIR Number.\n";
        if ($("#txtYardOutDate").val() == '01/01/1900' || $("#txtYardOutDate").val() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> Yard Out Date.\n";
        if ($("#txtYardOutTime").val().trim() == '')
            strMissingFields += ++fieldCount + " - Basic Data --> Yard Out Time.\n";
    }
    return strMissingFields;
}
/******************Payables**************************/
function Payables_BindTableRows(pPayables) {
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
        //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
        ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                    + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                    + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //the next line its PartnerSupplierID comes from table OperationPartners
                    + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                    + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
                    //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='PayableQuantity'>" + item.Quantity + "</td>"
                    + "<td class='PayableCostPrice'>" + item.CostPrice.toFixed(4) + "</td>"

                    + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                    + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                    + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                    + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                    + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='PayableCostAmount'>" + item.CostAmount.toFixed(4) + "</td>"
                    + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                    + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                    + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                    + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                    + "<td class='PayableBillID hide'>" + item.BillID + "</td>"

                    + "<td class='PayableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                    + "<td class='PayableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                    + "<td class='PayableTrailerID hide'>" + item.TrailerID + "</td>"

                    + "<td class='PayableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                    + "<td class='PayableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                    + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='PayableNotes hide'>" + item.Notes + "</td>"
                    + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (OAPay && $("#hIsOperationDisabled").val() == false) { $("#btn-AddPayables").removeClass("hide"); $("#btn-GenerateDefaultPayables").removeClass("hide"); $("#btn-GeneratePayablesFromQuotation").removeClass("hide"); }
    //else { $("#btn-AddPayables").addClass("hide"); $("#btn-GenerateDefaultPayables").addClass("hide"); $("#btn-GeneratePayablesFromQuotation").addClass("hide"); }
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //if (OEPay && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    //HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function Payables_GetAvailableCharges() {
    debugger;
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);
    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
}
function Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "") {
        FadePageCover(true);
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0
                , pOperationContainersAndPackagesID: $("#hID").val(), pOperationVehicleID: 0, pTruckingOrderID: 0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                Containertracking_FillPayablesAndReceivables($("#slOperation").val(), $("#hID").val());
                //FadePageCover(false); //will be done in binding Pay&Rec rows
            });
    }
}
function Payables_EditByDblClick(pID) {
    debugger;
    if ($("#hDefaultUnEditableCompanyName").val() == "GBL") {
        $(".classShowForGBL").removeClass("hide");
        $("#txtPayableSupplierInvoiceNo").attr("data-required", "true");
    }
    jQuery("#EditPayableModal").modal("show");
    ClearAll("#EditPayableModal");
    
    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');

    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");

    debugger;

    if (pPartnerSupplierID == 0) {
        $("#txtPayableSupplierInvoiceNo").attr("disabled", "disabled");
        //$("#txtPayableSupplierReceiptNo").attr("disabled", "disabled");
    }
    else {
        $("#txtPayableSupplierInvoiceNo").removeAttr("disabled");
        $("#txtPayableSupplierReceiptNo").removeAttr("disabled");
    }
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "" && $(tr).find("td.PayableSupplierReceiptNo").text() == "")
    if ($(tr).find("td.PayableSupplierInvoiceNo").text())
        $("#slPayableSupplier").removeAttr("disabled");
    else
        $("#slPayableSupplier").attr("disabled", "disabled");

    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slPayablePOrC" /*pSlName*/, " WHERE 1=1 ");  //PayablePOrC_GetList(pPOrCID, "slPayablePOrC");
    PayableSuppliers_GetList(pPartnerSupplierID, "slPayableSupplier", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            FillSupplierSites(pSupplierSiteID);
    });
    $("#slPayableCurrency").html($("#hReadySlCurrencies").html()); $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
    PayableUOM_GetList(pUOMID, "slPayableUOM");
    GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
                , "<--Select-->", "slPayableTax", "WHERE IsInactive=0 ORDER BY Name"
                , function () {
                    $("#slPayableDiscount").html($("#slPayableTax").html());
                    $("#slPayableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
                    $("#slPayableTax option[IsDiscount='true']").addClass('hide');
                    $("#slPayableDiscount option[IsDiscount='false']").addClass('hide');
                });
    
    $("#lblPayableShown").html(": " + $(tr).find("td.Payable").text());
    $("#lblPayableCreatedBy").html(" : " + $(tr).find("td.PayableCreatorName").text())
    $("#lblPayableCreationDate").html(" : " + $(tr).find("td.PayableCreationDate").text())
    $("#lblPayableUpdatedBy").html(": " + $(tr).find("td.PayableModificatorName").text())
    $("#lblPayableModificationDate").html(" : " + $(tr).find("td.PayableModificationDate").text())

    //$("#txtPayableType").val($(tr).find("td.Payable").text());
    //$("#txtPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
            , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE MasterOperationID = " + pOperationID, pOrderBy: "HouseNumber" }
            , function () { FadePageCover(false); });

    $("#txtPayableQuantity").val($(tr).find("td.PayableQuantity").text());
    $("#txtPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtPayableAmountWithoutVAT").val(parseInt($(tr).find("td.PayableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.PayableAmountWithoutVAT").text());

    $("#txtPayableTaxPercentage").val($(tr).find("td.PayableTaxPercentage").text());
    $("#txtPayableTaxAmount").val($(tr).find("td.PayableTaxAmount").text());
    $("#txtPayableDiscountPercentage").val($(tr).find("td.PayableDiscountPercentage").text());
    $("#txtPayableDiscountAmount").val($(tr).find("td.PayableDiscountAmount").text());

    $("#txtPayableAmount").val(parseInt($(tr).find("td.PayableCostAmount").text()) == 0 ? "" : $(tr).find("td.PayableCostAmount").text());
    $("#txtPayableInitialSalePrice").val($(tr).find("td.PayableInitialSalePrice").text());
    $("#txtPayableExchangeRate").val($(tr).find("td.PayableExchangeRate").text());
    $("#txtPayableSupplierInvoiceNo").val($(tr).find("td.PayableSupplierInvoiceNo").text());
    $("#txtPayableSupplierReceiptNo").val($(tr).find("td.PayableSupplierReceiptNo").text());
    $("#txtPayableEntryDate").val($(tr).find("td.PayableEntryDate").text());
    $("#txtPayableIssueDate").val($(tr).find("td.PayableIssueDate").text());
    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");
}
function Payables_Update(pSaveandAddNew) {
    if (
            (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
            || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
        )
        swal(strSorry, strCheckDates);
    //else if ($("#hDefaultUnEditableCompanyName").val() == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0)
        swal("Sorry", "Exchange rate can not be 0;");
    else {
        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
            , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            , pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pOperationID: $("#slOperation").val()
            , pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            , pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            , pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            , pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            , pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            , pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            , pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            , pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            , pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            , pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            , pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            , pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            , pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            , pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            , pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            , pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            , pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            , pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            , pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            , pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            , pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            , pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            , pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            , pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            , pPayableBillTo: 0
            , pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            , pTruckingOrderID: 0
        }, pSaveandAddNew, "EditPayableModal"
        , function (data) {
            ContainerTracking_FillControls($("#hID").val()); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            if (data[1] != "") //supplier invoice number uniqueness violated
                swal(strSorry, data[1]);
        });
    }
}
function Payables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayables') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            DeleteListFunction("/api/Payables/Delete"
                , { pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#slOperation").val() }
                , function () {
                    ContainerTracking_FillControls($("#hID").val());
                });
        });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#slOperation").val();
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause, pCallback);
}
function PayableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "") {
        $(pSupplierControl).removeAttr("disabled");
    }
    else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
}
function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtPayableQuantity").val() * $("#txtPayableUnitPrice").val();
    $("#txtPayableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtPayableTaxPercentage").val(decTaxPercentage);
    $("#txtPayableTaxAmount").val(decTaxAmount.toFixed(4));
    $("#txtPayableDiscountPercentage").val(decDiscountPercentage);
    $("#txtPayableDiscountAmount").val(decDiscountAmount.toFixed(4));
    $("#txtPayableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));
}
function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}
/******************************************Get Suppliers Sites******************************************/
function FillSupplierSites(pID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "GBL") {
        var pWhereClause = "WHERE SupplierID= " + $('#slPayableSupplier option:selected').attr("partnerid");
        if ($('#slPayableSupplier option:selected').attr("partnertypeid") != '8')
            pWhereClause = "Where 1=0";

        CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
        , { pWhereClause: pWhereClause }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slSites", pData[0], null);
        }
        , null);
    }
}
/******************Receivables**************************/
function Receivables_BindTableRows(pReceivables) {
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    ClearAllTableRows("tblReceivables");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
        //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
        ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                    + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                    + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                    //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
                    + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                    + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                    + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

                    + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                    + "<td class='ReceivableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                    + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"

                    + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                    + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                    + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                    + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                    + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                    + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                    + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                    + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                    + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        //+ "</tr>"));
    });
    ////ApplyPermissions();
    //if (OARec && $("#hIsOperationDisabled").val() == false) { $("#btn-AddReceivables").removeClass("hide"); $("#btn-GenerateDefaultReceivables").removeClass("hide"); $("#btn-GenerateReceivablesFromQuotation").removeClass("hide"); $("#btn-GenerateReceivablesFromPayables").removeClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").removeClass("hide"); $("#slReceivableInvoiceTypes").removeClass("hide"); }
    //else { $("#btn-AddReceivables").addClass("hide"); $("#btn-GenerateDefaultReceivables").addClass("hide"); $("#btn-GenerateReceivablesFromQuotation").addClass("hide"); $("#btn-GenerateReceivablesFromPayables").addClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").addClass("hide"); $("#slReceivableInvoiceTypes").addClass("hide"); }
    //if (ODRec && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteReceivable").removeClass("hide"); else $("#btn-DeleteReceivable").addClass("hide");
    //if (OERec && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditReceivables").removeClass("hide"); else $("#btn-MultiRowEditReceivables").addClass("hide");

    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //PayablesAndReceivables_CalculateSummary();
    //Receivables_CalculateSubtotals();
}
function Receivables_GetAvailableCharges() {
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }, 1/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");
    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}
function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "") {
        FadePageCover(true);
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0
                , pOperationContainersAndPackagesID: $("#hID").val(), pOperationVehicleID: 0 , pTruckingOrderID:0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                Containertracking_FillPayablesAndReceivables($("#slOperation").val(), $("#hID").val());
                //FadePageCover(false); //will be done in binding Pay&Rec rows
            });
    }
}
function Receivables_EditByDblClick(pID) {
    debugger;
    ClearAll("#EditReceivableModal");
    jQuery("#EditReceivableModal").modal("show");
    $("#hReceivableID").val(pID);
    FadePageCover(false);
    var tr = $("#tblReceivables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.ReceivablePOrC").attr('val');
    var pSupplierID = $(tr).find("td.ReceivableSupplier").attr('val');
    var pUOMID = $(tr).find("td.ReceivableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');
    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slReceivablePOrC" /*pSlName*/, " WHERE 1=1 ");  //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    $("#slReceivableCurrency").html($("#hReadySlCurrencies").html()); $("#slReceivableCurrency").val(pCurrencyID); //ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Receivable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            //$("#slReceivableDiscount").html($("#slReceivableTax").html());
            $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
            //$("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
        });
    else
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());
    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());

    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}
function Receivables_Update(pSaveandAddNew) {
    debugger;
    //if ($("#txtReceivableAmount").val()) //check that decimal doesn't contain 2 decimal pts
    //{
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0)
        swal("Sorry", "Exchange rate can not be 0;");
    else InsertUpdateFunction("form", "/api/Receivables/Update", {
        pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
        , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
        , pIsReceipt: $("#cbIsReceipt").prop("checked")
        , pHouseBillID: 0

        , pID: $("#hReceivableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        , pOperationID: $("#slOperation").val()
        , pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
        , pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
            ? $('#slReceivableUOM option:selected').val()
            : 0
        //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pContainerTypeID: 0
        //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
        , pSupplierID: 0//($('#slReceivableSupplier option:selected').val() == "" ? 0 : $('#slReceivableSupplier option:selected').val())
        , pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
        , pCostPrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
        , pCostAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())

        , pAmountWithoutVAT: $("#txtReceivableAmountWithoutVAT").val() == "" ? 0 : $("#txtReceivableAmountWithoutVAT").val()
        , pTaxTypeID: $("#slReceivableTax").val() == "" ? 0 : $("#slReceivableTax").val()
        , pTaxPercentage: $("#txtReceivableTaxPercentage").val() == "" ? 0 : $("#txtReceivableTaxPercentage").val()
        , pTaxAmount: $("#txtReceivableTaxAmount").val() == "" ? 0 : $("#txtReceivableTaxAmount").val()
        //, pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
        //, pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
        //, pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

        , pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
        , pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
        , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

        , pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))

        , pSalePrice_Foreign: 0 //no change
        , pExchangeRate_Foreign: 0 //no change
        , pCurrencyID_Foreign: 0 //no change
        , pReceiptNumber: "0" //no change
        , pReceiptDate: "01/01/1900" //no change

    }, pSaveandAddNew, "EditReceivableModal", function () {
        ContainerTracking_FillControls($("#hID").val()); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
    });
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function Receivables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceivables') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            DeleteListFunction("/api/Receivables/Delete"
                , { pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#slOperation").val() }
                , function () {
                    ContainerTracking_FillControls($("#hID").val());
                });
        });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    ////pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
//function CalculateReceivablesAmount() {
//    $("#txtReceivableAmount").val($("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val());
//}
function CalculateReceivablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    //decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    //decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));
    //$("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    //$("#txtReceivableDiscountAmount").val(decDiscountAmount.toFixed(2));
    $("#txtReceivableAmount").val((decAmountWithoutVAT + decTaxAmount).toFixed(2));  //$("#txtReceivableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));
}
function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val())
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
}




/***************************Ahmed Mohamed*****************************/
function RadChange(v) {
    debugger;
    if (v == 'None') {
        $("#txtYardEIRNumber").attr("data-required", "false");
        $("#txtYardInDate").attr("data-required", "false");
        $("#txtYardInTime").attr("data-required", "false");

        $("#txtYardEIRNumberOut").attr("data-required", "false");
        $("#txtYardOutDate").attr("data-required", "false");
        $("#txtYardOutTime").attr("data-required", "false");

        $("#txtYardEIRNumber").removeClass("parsley-validated");
        $("#txtYardInDate").removeClass("parsley-validated");
        $("#txtYardInTime").removeClass("parsley-validated");

        $("#txtYardEIRNumberOut").removeClass("parsley-validated");
        $("#txtYardOutDate").removeClass("parsley-validated");
        $("#txtYardOutTime").removeClass("parsley-validated");

        $("#divYardEIRNumberOut").addClass("hidden");
        $("#divYardOutDate").addClass("hidden");
        $("#divYardOutTime").addClass("hidden");

        $("#divYardEIRNumber").addClass("hidden");
        $("#divFullEmpty").addClass("hidden");
        $("#divYardInDate").addClass("hidden");
        $("#divYardInTime").addClass("hidden");
        $("#divYardLocationID").addClass("hidden");
        $("#divPrintEir").addClass("hidden");
    }
    else if (v == 'GateIn') {
        $("#txtYardEIRNumber").attr("data-required", "true");
        $("#txtYardInDate").attr("data-required", "true");
        $("#txtYardInTime").attr("data-required", "true");

        $("#txtYardEIRNumberOut").attr("data-required", "false");
        $("#txtYardOutDate").attr("data-required", "false");
        $("#txtYardOutTime").attr("data-required", "false");

        $("#txtYardEIRNumber").addClass("parsley-validated");
        $("#txtYardInDate").addClass("parsley-validated");
        $("#txtYardInTime").addClass("parsley-validated");

        $("#txtYardEIRNumberOut").removeClass("parsley-validated");
        $("#txtYardOutDate").removeClass("parsley-validated");
        $("#txtYardOutTime").removeClass("parsley-validated");

        $("#divYardEIRNumberOut").addClass("hidden");
        $("#divYardOutDate").addClass("hidden");
        $("#divYardOutTime").addClass("hidden");

        $("#divYardEIRNumber").removeClass("hidden");
        $("#divFullEmpty").removeClass("hidden");
        $("#divYardInDate").removeClass("hidden");
        $("#divYardInTime").removeClass("hidden");
        $("#divYardLocationID").removeClass("hidden");
        $("#divPrintEir").removeClass("hidden");

    }
    else if (v == 'GateOut') {
        $("#txtYardEIRNumber").attr("data-required", "false");
        $("#txtYardInDate").attr("data-required", "false");
        $("#txtYardInTime").attr("data-required", "false");

        $("#txtYardEIRNumberOut").attr("data-required", "true");
        $("#txtYardOutDate").attr("data-required", "true");
        $("#txtYardOutTime").attr("data-required", "true");

        $("#txtYardEIRNumber").removeClass("parsley-validated");
        $("#txtYardInDate").removeClass("parsley-validated");
        $("#txtYardInTime").removeClass("parsley-validated");

        $("#txtYardEIRNumberOut").addClass("parsley-validated");
        $("#txtYardOutDate").addClass("parsley-validated");
        $("#txtYardOutTime").addClass("parsley-validated");

        $("#divYardEIRNumberOut").removeClass("hidden");
        $("#divYardOutDate").removeClass("hidden");
        $("#divYardOutTime").removeClass("hidden");
        $("#divPrintEir").removeClass("hidden");

        $("#divYardEIRNumber").addClass("hidden");
        $("#divFullEmpty").addClass("hidden");
        $("#divYardInDate").addClass("hidden");
        $("#divYardInTime").addClass("hidden");
        $("#divYardLocationID").addClass("hidden");
    }
}
function PrintEIRReport() {
    debugger;
    if ($("#hID").val() == "") {
        swal("Warning", "Please, Save at first");
    }

    else if ($("#hID").val() != "") {

        var arr_Keys = new Array();
        var arr_Values = new Array();

        arr_Keys.push("WhereClause");
        arr_Values.push(" where id =" + $("#hID").val());
        var VarEir = $("#radGateIn").prop('checked') == true ? "EIR_In" :
                        $("#radGateOut").prop('checked') == true ? "EIR_Out" : "EIR_In";
        var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
               , pTitle: "EQUIPMENT INTERCHANGE"
                , pReportName: VarEir //"EIR_In"
            };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
        win.location = url;

    }//end else
}
/***************************Ahmed Mohamed*****************************/