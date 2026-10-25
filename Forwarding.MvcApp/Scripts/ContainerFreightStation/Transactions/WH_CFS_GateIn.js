//#region M A I N   F U N C T I O N S

function WH_CFS_GateInInit() {
    debugger;
    WH_CFS_GateIn_LoadWithPagingWithWhereClauseAndOrderBy();

    $("#hl-menu-ContainerFreightStationTransactions").parent().addClass("active");

    if (pDefaults.UnEditableCompanyName == "UNF") {
        //$(".classShowForUNF").removeClass("hide");
        $("#slAdditionalLocationsID").parent().removeClass("hide");
        $("#txtVesselName").parent().removeClass("hide");
        $("#txtATAPOD").parent().removeClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "MES") {
        $('.classShowForMesco').removeClass('hide');
        $('.classHideForMesco').addClass('hide');
    }
    else {
        $('#divEntryDate').addClass('form-group col-sm-2');
    }

}

function WH_CFS_GateIn_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;

    var pWhereClause = WH_CFS_GateIn_GetWhereClause();
    strLoadWithPagingFunctionName = "/api/WH_CFS_GateIn/WH_CFS_GateIn_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pOrderBy = " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            if (pData[0]) {
                WH_CFS_GateIn_BindTableRows(JSON.parse(pData[2]));
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        });
    HighlightText("#tblWH_CFS_GateIn>tbody>tr", $("#txt-Search").val().trim());
}

function WH_CFS_GateIn_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1\n";

    if ($("#txt-Search").val().trim() != "") {
        // General search bar: search by House Number
        var s = $("#txt-Search").val().trim();
        pWhereClause += "AND HouseNumber = N'" + s + "'\n";
    } else {
        // Filter modal fields
        if ($("#txtFilterOperationNumber").val().trim() != "")
            pWhereClause += "AND OperationSerial = N'" + $("#txtFilterOperationNumber").val().trim() + "'\n";

        if ($("#txtFilterContainerNumber").val().trim() != "")
            pWhereClause += "AND ContainerNumber Like N'%" + $("#txtFilterContainerNumber").val().trim() + "%'\n";

        if ($("#txtFilterMasterBL").val().trim() != "")
            pWhereClause += "AND MasterBL = N'" + $("#txtFilterMasterBL").val().trim() + "'\n";

        if ($("#txtFilterHouseNumber").val().trim() != "")
            pWhereClause += "AND HouseNumber Like N'%" + $("#txtFilterHouseNumber").val().trim() + "%'\n";

        if ($("#txtFilterConsignee").val().trim() != "")
            pWhereClause += "AND Consignee = N'" + $("#txtFilterConsignee").val().trim() + "'\n";

        if ($("#txtFilterBookingParty").val().trim() != "")
            pWhereClause += "AND BookingParty = N'" + $("#txtFilterBookingParty").val().trim() + "'\n";

        if ($("#txtFilterGrossWeight").val().trim() != "")
            pWhereClause += "AND GrossWeight = " + $("#txtFilterGrossWeight").val().trim() + "\n";

        if ($("#txtFilterNetWeight").val().trim() != "")
            pWhereClause += "AND NetWeight = " + $("#txtFilterNetWeight").val().trim() + "\n";

        if ($("#txtFilterVolume").val().trim() != "")
            pWhereClause += "AND Volume = " + $("#txtFilterVolume").val().trim() + "\n";
    }

    return pWhereClause;
}

function WH_CFS_GateIn_BindTableRows(pTableRows) {
    debugger;
    //$("#hl-menu-DASCreditNotes").parent().addClass("active");
    ClearAllTableRows("tblWH_CFS_GateIn");

    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";





    $.each(pTableRows, function (i, item) {
        debugger;
        AppendRowtoTable("tblWH_CFS_GateIn",
        ("<tr ID='" + item.InventoryID + "' ondblclick='WH_CFS_GateIn_EditByDblClick(" + item.OperationID + "," + item.ContainerID + "," + item.HouseBillID + ");'>"

                    //+ "<td class='OperationID'> <input name='Delete' id='" + item.OperationID + "' type='checkbox' value='" + item.OperationID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='OperationNumber' style=text-transform:uppercase' >" + item.OperationNumber + "</td>"
                    + "<td class='MasterBL' style=text-transform:uppercase' >" + (item.MasterBL == 0 ? "" : item.MasterBL) + "</td>"
                    + "<td class='ContainerNumber' style=text-transform:uppercase' >" + item.ContainerNumber + "</td>"
                    + "<td class='HouseNumber' style=text-transform:uppercase' >" + item.HouseNumber + "</td>"
                    + "<td class='Consignee' style=text-transform:uppercase' >" + item.Consignee + "</td>"
                    + "<td class='BookingParty' style=text-transform:uppercase' >" + item.BookingParty + "</td>"
                    + "<td class='OperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='ContainerID hide'>" + item.ContainerID + "</td>"
                    + "<td class='HouseBillID hide'>" + item.HouseBillID + "</td>"
                    + "<td class='ConsigneeID hide'>" + item.ConsigneeID + "</td>"
                    + "<td class='BookingPartyID hide'>" + item.BookingPartyID + "</td>"
                    + "<td class='InventoryID hide'>" + item.InventoryID + "</td>"

        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_CFS_GateIn", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteInquiryID");
    HighlightText("#tblWH_CFS_GateIn>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function WH_CFS_GateIn_EditByDblClick(SelectedOperationID, SelectedContainerID, SelectedHouseBillID) {
    debugger;

    ClearAll("#ModelWH_CFS_GateIn");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    if (SelectedHouseBillID == 0) { // FCL Row
        $("#dvEmptyContainer").removeClass("hide");
        $("#dvHouseBill").addClass("hide");
        $("#ModelHeader").html("CFS Gate In");
    }
    else {
        $("#dvEmptyContainer").addClass("hide");
        $("#dvHouseBill").removeClass("hide");
        $("#ModelHeader").html("Consol Gate In");
    }

    jQuery("#ModelWH_CFS_GateIn").modal("show");

    $("#btnPrint").attr('Disabled', true);
    $("#btnSave").attr('Disabled', false);

    var pHouseBillPackages;
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $('#slAdditionalLocationsID').val(null).trigger("change");
    }

    var pParametersWithValues = { pOperationID: SelectedOperationID, pContainerID: SelectedContainerID, pHouseBillID: SelectedHouseBillID };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_CFS_GateIn/WH_CFS_GateIn_LoadItem", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pGateIn = JSON.parse(pData[1]);
                pHouseBillPackages = JSON.parse(pData[9]);

                var RoadNumberWH = JSON.parse(pData[10]);
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    var vwRouting = JSON.parse(pData[11])[0];
                }
                debugger;

                $("#hInventoryID").val(pGateIn.InventoryID);
                $("#hWHOperationID").val(pGateIn.OperationID);
                $("#hWHContainerID").val(pGateIn.ContainerID);
                $("#hHouseBillID").val(pGateIn.HouseBillID);
                $("#hBookingPartyID").val(pGateIn.BookingPartyID);

                $("#txtOperationNumber").val(pGateIn.OperationNumber);
                $("#txtMasterBL").val(pGateIn.MasterBL == 0 ? "" : pGateIn.MasterBL);
                $("#txtRoadNumber").val(pGateIn.RoadNumber == 0 ? "" : pGateIn.RoadNumber);
                $("#txtWHContainerNumber").val(pGateIn.ContainerNumber);
                $("#txtHouseNumber").val(pGateIn.HouseNumber == 0 ? "" : pGateIn.HouseNumber);
                $("#txtConsignee").val(pGateIn.Consignee == 0 ? "" : pGateIn.Consignee);
                $("#txtWHGrossWeight").val(pGateIn.GrossWeight);
                $("#txtWHNetWeight").val(pGateIn.NetWeight);
                $("#txtWHCBM").val(pGateIn.Volume);
                $("#txtPackages").val(pGateIn.Packages == 0 ? "" : pGateIn.Packages);
                $("#txtDescriptionOfGoods").val(pGateIn.DescriptionOfGoods == 0 ? "" : pGateIn.DescriptionOfGoods);
                $("#txtContainerType").val(pGateIn.ContainerType == 0 ? "" : pGateIn.ContainerType);
                $("#txtBookingParty").val(pGateIn.BookingParty == 0 ? "" : pGateIn.BookingParty);
                $("#txtRoadNumberWH").val(RoadNumberWH == "" ? "" : RoadNumberWH);

                if (pDefaults.UnEditableCompanyName == "UNF") {
                    $("#txtVesselName").val(vwRouting.VesselName == "" ? "" : vwRouting.VesselName);
                    $("#txtATAPOD").val((Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(vwRouting.ActualArrival)) < 1 ? "UnSpecified" : ConvertDateFormat(GetDateWithFormatMDY(vwRouting.ActualArrival))));
                }

                if (Date.prototype.compareDates("01/01/0001", GetDateWithFormatMDY(pGateIn.EntryDate)) < 1) {
                    $("#txtEntryDate").val("");
                    $("#txtEntryDate").attr("disabled", false);
                }
                else {
                    $("#txtEntryDate").val(ConvertDateFormat(GetDateWithFormatMDY(pGateIn.EntryDate)));
                    $("#txtEntryDate").attr("disabled", true);
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        $("#slWarehouseID").attr("Disabled", true);

                    }

                }


                FillListFromObject(pGateIn.WarehouseID, 2, "Select Warehouse", "slWarehouseID", pData[2], null);
                FillListFromObject(null, 2, "Select Area", "slAreaID", pData[3], null);
                FillListFromObject(null, 2, "Select Row", "slRowID", pData[4], null);
                FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[5], null);
                FillListFromObject(null, 2, "Select Storing Note", "slWarehouseNoteID", pData[6], null);
                FillListFromObject(null, 2, "Select Container Type", "slContainerTypeID", pData[7], null);
                FillListFromObject(null, 11, "Select Empty Container", "slEmptyContainerID", pData[8], null);



                $("#txtOtherRemarks").val("");

                if (pGateIn.WarehouseID > 0) {
                 /*   $("#slWarehouseID").attr("Disabled",true);*/
                }
                else {
                    $("#slWarehouseID").val("");
                    $("#slWarehouseID").attr("Disabled", false);
                }
                
                $("#slAreaID").val("");
                $("#slRowID").val("");
                $("#slRowLocationID").val("");
                $("#slWarehouseNoteID").val("");
                $("#slEmptyContainerID").val("");
                $("#cbIsHasDamage").prop('checked', false);
                $("#txtDamageDescription").val("");

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , function () {
            HouseBillPackagesDetails_BindTableRows(pHouseBillPackages);
            GetWarehouseAreas();
        });
}

function WH_CFS_GateIn_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;
    //BasicData Tab

    if ($("#slWarehouseID").val() == 0)
        strMissingFields += ++fieldCount + " - Warehouse.\n";
    if ($("#txtEntryDate").val().toString().trim() == '')
        strMissingFields += ++fieldCount + " - Entry Date.\n";
    return strMissingFields;
}

function WH_CFS_GateIn_Insert() {
    debugger;
    if (!ValidateForm("form", "ModelWH_CFS_GateIn")) {
        strMissingFields = WH_CFS_GateIn_GetMissingFields();
        swal("You are missing:", strMissingFields);
    }
    else {
        if ($("#cbIsHasDamage").prop('checked') && $("#txtDamageDescription").val() == '') {
            swal("You are missing:", "Damage Description");
        }
        else {
            //start Inserting Procedure
            FadePageCover(true);

            var pParametersWithValues = {
                pOperationID: $("#hWHOperationID").val(),
                pContainerID: $("#hWHContainerID").val(),
                pHouseBillID: $("#hHouseBillID").val(),
                pBookingPartyID: $("#hBookingPartyID").val(),
                pWarehouseID: $("#slWarehouseID").val(),
                pAreaID: $("#slAreaID").val(),
                pRowID: $("#slRowID").val(),
                pRowLocationID: $("#slRowLocationID").val(),
                pWarehouseNoteID: $("#slWarehouseNoteID").val(),
                pEmptyContainerID: $("#slEmptyContainerID").val() == null ? "" : $("#slEmptyContainerID").val(),
                pEntryDate: ConvertDateFormat($("#txtEntryDate").val()),
                pOtherRemarks: $("#txtOtherRemarks").val(),
                pHasDamage: $("#cbIsHasDamage").prop('checked'),
                pDamageDescription: $("#txtDamageDescription").val(),
                pCustomBrokerName: $("#txtCustomBrokerName").val(),
                pPermissionNumber: $("#txtPermissionNumber").val(),
                pCertificationNumber: $("#txtCertificationNumber").val(),
                pMakingDate: ConvertDateFormat($("#txtMakingDate").val()),
                pHouseBillPackages: JSON.stringify(CollectHouseBillPackagesDetails()),

                //LoadWithPaging Parameters
                pWhereClause: WH_CFS_GateIn_GetWhereClause(),
                pPageSize: $('#select-page-size').val(),
                pPageNumber: 1,
                pOrderBy: " OperationNumber DESC, ContainerNumber DESC, HouseNumber DESC ",
                pRoadNumberWH: $("#txtRoadNumberWH").val(),
                pCustomBrokerID: $("#txtCustomBrokerID").val() == "" ? "0" : $("#txtCustomBrokerID").val(),
                pAdditionalLocations: $("#slAdditionalLocationsID").val() == null || $("#slAdditionalLocationsID").val() == "" ? "0" : $("#slAdditionalLocationsID").val().toString(),
                pWithMarking: $("#cbIsWithMarking").prop('checked'),
                pWithoutMarking: $("#cbIsWithoutMarking").prop('checked')
            };
            CallPOSTFunctionWithParameters("/api/WH_CFS_GateIn/WH_CFS_GateIn_Insert", pParametersWithValues
                , function (pData) {
                    if (pData[0]) {
                        $("#hInventoryID").val(pData[1]); //

                        WH_CFS_GateIn_BindTableRows(JSON.parse(pData[2])); //returned rows

                        $("#spn-total-count").text(pData[3]); //_RowCount
                        $("#btnSave").attr('Disabled', true);
                        $("#btnPrint").attr('Disabled', false);
                        swal("Success", "Saved successfully.");

                        //EnableDisableNotesCnts(true);
                    }

                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                }
            , null);
        }
    }
}

function WH_CFS_GateIn_Print() {
    debugger;
    if ($("#hInventoryID").val() > 0) {

        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("@WhereClause");
        arr_Values.push(" Where Inv.ID = " + $("#hInventoryID").val());

        arr_Keys.push("ReportTitle");
        arr_Values.push(" Gate In Card ");

        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Gate In Card"
            , pReportName: "GateInCard"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;

        setTimeout(function () {
            GetReleaseNumber();
        }, 1500);
    }
    else {
        $("#btnPrint").attr("disabled", false);
        swal("Sorry", "Can't print ,Please save first.");
    }
}
function WH_CFS_GateIn_UpdateEnteryDateForBl() {
    debugger;
    if ($("#hWHContainerID").val() != "" && $("#hWHContainerID").val()!= "0") {
        swal({
            title: "Are you sure?",
            text: "Entery Date will be updated in all bl linked To Container !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Do it!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);


                var pParametersWithValues = {
                    pContainerID: $("#hWHContainerID").val(),
                    pDate: ConvertDateFormat($("#txtEntryDate").val()),
                    pAreaID: $('#slAreaID').val(),
                    pRowLocationID: $('#slRowLocationID').val(),
                    pRowID: $('#slRowID').val() ,
                    pWarehouseID: $('#slWarehouseID').val()

                };
                CallGETFunctionWithParameters("/api/WH_CFS_GateIn/WH_CFS_GateIn_UpdateEnteryDateForBl", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            $("#hInventoryID").val(pData[1]);

                            swal("Success", "Saved successfully.");
                        }

                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            });
    }

}
//#endregion

//#region N E W   C O N T A I N E R   F U N C T I O N S

function WH_CFS_GateIn_ContainersClearAllControls() {
    debugger;

    $("#btn-ApplyReeferPropertiesToAll").removeClass("hide");
    $("#divShipmentContainers").addClass("hide");
    ClearAll("#EditContainerModal");
    //$("#txtNumberOfContainers").removeAttr("disabled");
    $("#txtNumberOfContainers").val("1");
    $("#tblContainerPackages > tbody").html(""); //Clear the ContainerPackages rows
    //$("#divContainerPackages").addClass("hide");
    $("#btn-NewAddContainerPackage").attr("disabled", "disabled");
    $("#btn-DeleteContainerPackage").attr("disabled", "disabled");

    $("#cbIsSentToWarehouse").prop("checked", true);

    jQuery("#EditContainerModal").modal("show");

    Operations_GetList();
    ContainerTypes_GetList(null, null);
    PackageTypesOnContainer_GetList(null, "slPackageTypesOnContainer", function () { $("#slPackageTypes").html($("#slPackageTypesOnContainer").html()); $("#slPackageTypes").val(""); });

    $("#btnSaveContainer").attr("onclick", "OperationContainersAndPackages_Insert();");

}

function EnableDisableReeferProprties() {
    if (!$("#cbIsReefer").prop('checked')) { //if it's not reefer then  NOR(Non Operating Reefer) is disabled
        $("#cbIsNOR").attr("disabled", "disabled");
        $("#cbIsNOR").prop("checked", false);
    }
    else //reefer
        $("#cbIsNOR").removeAttr("disabled");

    if ($("#cbIsReefer").prop("checked") && !$("#cbIsNOR").prop('checked')) {
        $("#txtMinTemp").removeAttr("disabled");
        $("#txtMaxTemp").removeAttr("disabled");
        $("#txtHumidity").removeAttr("disabled");
        $("#txtVentilation").removeAttr("disabled");
    }
    else {
        $("#txtMinTemp").attr("disabled", "disabled");
        $("#txtMinTemp").val(0);
        $("#txtMaxTemp").attr("disabled", "disabled");
        $("#txtMaxTemp").val(0);
        $("#txtHumidity").attr("disabled", "disabled");
        $("#txtHumidity").val(0);
        $("#txtVentilation").attr("disabled", "disabled");
        $("#txtVentilation").val(0);
    }
}

function EnableDisableIMOProprties() {
    if ($("#cbIsIMO").prop("checked")) {
        $("#txtIMOClass").removeAttr("disabled");
        $("#txtUNNumber").removeAttr("disabled");
        $("#txtFlashPoint").removeAttr("disabled");
    }
    else {
        $("#txtIMOClass").attr("disabled", "disabled");
        $("#txtIMOClass").val(0);
        $("#txtUNNumber").attr("disabled", "disabled");
        $("#txtUNNumber").val(0);
        $("#txtFlashPoint").attr("disabled", "disabled");
        $("#txtFlashPoint").val(0);
    }
}

function Operations_GetList() {//the first parameter is used in case of editing to set the code or name to its original value

    var pParametersWithValues = {
        pWhereClause: "WHERE DirectionType <> 2 AND TransportType<>2 AND ShipmentType=1 "//and BLType<>2"
        , pOrderBy: "ID DESC"
    };
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/WH_CFS_GateIn/WH_CFS_GateIn_FillOperationsList", pParametersWithValues
        , function (pData) {
            if (pData[0]) {

                FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slOperation", pData[1], null);

                FadePageCover(false);
            }
            else {
                swal("Sorry", "Connection failed, please try again.");
            }
        }
        , null);


}

function ContainerTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndWhereClause(pID, "/api/ContainerTypes/LoadAll", "Type", "slContainerTypes", " Where 1 = 1 ORDER BY CODE ");
}

function PackageTypesOnContainer_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " Where 1=1 ";
    //the next 2 lines are to prevent selection of already selected packageTypes
    //pWhereClause += " AND ID NOT IN (SELECT PackageTypeID FROM ContainerPackages WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val() + ")";
    //pWhereClause += (pID == null || pID == undefined) ? "" : " OR ID = " + pID.toString(); //incase of editing(i.e. pID has value): to add the edited PackageType to the select list
    GetListWithNameAndWhereClause(pID, "/api/PackageTypes/LoadAll", "Select Type", pSlName, pWhereClause, callback);
}

function OperationContainersAndPackages_GetMissingFields() {
    debugger;
    var strMissingFields = "";// i am sure there is at least 1 missing field isa
    var fieldCount = 0;

    var isValid = true;

    if ($("#slOperation").val() == 0) {
        isValid = false;
        //swal(strSorry, "Please, Select Operation.");
        strMissingFields += ++fieldCount + " - Select Operation.\n";
    }
    if ($("#slContainerTypes").val() == 0) {
        isValid = false;
        //swal(strSorry, "Please, Select Container Type.");
        strMissingFields += ++fieldCount + " - Select Container Type.\n";
    }
    if ($("#txtContainerNumber").val().trim() == "") {
        isValid = false;
        //swal(strSorry, "Container Number Format must be like 'ABCD1234567'");
        strMissingFields += ++fieldCount + " - Enter Container Number.\n";
    }
    if ($("#txtContainerNumber").val().trim() != "" && $("#txtContainerNumber").val().toUpperCase().match("^[A-Z]{4}\[0-9]{7}$") == null) {
        isValid = false;
        //swal(strSorry, "Container Number Format must be like 'ABCD1234567'");
        strMissingFields += ++fieldCount + " - Container Number Format must be like 'ABCD1234567'.\n";
    }

    if (!CheckDecimalPlacesAndNegativeSigns('txtLength') || !CheckDecimalPlacesAndNegativeSigns('txtWidth')
         || !CheckDecimalPlacesAndNegativeSigns('txtHeight') || !CheckDecimalPlacesAndNegativeSigns('txtGrossWeight')
         || !CheckDecimalPlacesAndNegativeSigns('txtNetWeight') || !CheckDecimalPlacesAndNegativeSigns('txtVolumetricWeight')) {
        isValid = false;
        //swal(strSorry, "Please, Check the numbers.");
        strMissingFields += ++fieldCount + " - Check the numbers.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtTareWeight')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the tare weight.");
        strMissingFields += ++fieldCount + " Revise the tare weight- .\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtVGM')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the VGM.");
        strMissingFields += ++fieldCount + " - Revise the VGM.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtMinTemp')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the Min. Temperature.");
        strMissingFields += ++fieldCount + " - Revise the Min. Temperature.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtMaxTemp')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the Max. Temperature.");
        strMissingFields += ++fieldCount + " - Revise the Max. Temperature.\n";
    }
    if (parseFloat($("#txtMinTemp").val()) > parseFloat($("#txtMaxTemp").val())) {
        isValid = false;
        //swal(strSorry, "Please, Max. Temperature can not be less than Min Temperature.");
        strMissingFields += ++fieldCount + " - Max. Temperature can not be less than Min Temperature.\n";
    }
    if ((!CheckDecimalPlacesAndNegativeSigns('txtIMOClass')) || $("#txtIMOClass").val().trim() != "" && ($("#txtIMOClass").val() < 0 || $("#txtIMOClass").val() > 9.9)) {
        isValid = false;
        // swal(strSorry, "IMO Class must be between 0 and 9.9");
        strMissingFields += ++fieldCount + " - IMO Class must be between 0 and 9.9.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtHumidity')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the humidity.");
        strMissingFields += ++fieldCount + " - Revise the humidity.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtVentilation')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the Ventilation.");
        strMissingFields += ++fieldCount + " - Revise the Ventilation.\n";
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtFlashPoint')) {
        isValid = false;
        //swal(strSorry, "Please, Revise the flash point.");
        strMissingFields += ++fieldCount + " - Revise the flash point.\n";
    }
    if ($('#txtNumberOfContainers').val().trim() == "" || $('#txtNumberOfContainers').val().trim() < 1 || $('#txtNumberOfContainers').val().trim() > 50) {
        isValid = false;
        //swal(strSorry, "Number of containers must be between 1 and 50.");
        strMissingFields += ++fieldCount + " - Number of containers must be between 1 and 50.\n";
    }
    //check for packages quantity
    if (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked'))
        && ($("#txtPackagesQuantity").val().trim() == "" || $("#txtPackagesQuantity").val().trim() < 1)) {
        isValid = false;
        //swal(strSorry, "The Quantity must be greater than 0 !");
        strMissingFields += ++fieldCount + " The Quantity must be greater than 0- .\n";
    }
    if (isValid == false) {
        swal("You are missing:", strMissingFields);
    }
    return isValid;
}

function OperationContainersAndPackages_Insert() {
    debugger;
    if (OperationContainersAndPackages_GetMissingFields()) {
        FadePageCover(true);
        var pParametersWithValues = {

            pOperationID: ($("#slOperation").val() == "" ? 0 : $("#slOperation").val())
            , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
            , pNumberOfContainers: $("#txtNumberOfContainers").val().trim() //pNumberOfContainers(txtNumberOfContainers) is not saved in DB, its just to decide how many containers to be inserted; between 1 and 50
            , pPackageTypeID: 0 //Not used when inserting packages //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
            , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            , pVolume: ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
            , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            , pNetWeight: ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
            , pNetWeightTON: ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
            , pGrossWeight: ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
            , pGrossWeightTON: ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
            , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            , pQuantity: 0

            , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
            , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
            , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
            , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
            , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

            , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
            , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
            , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
            , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
            , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
            , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
            , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

            , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" ? 0 : $("#slPackageTypesOnContainer").val())
            , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

            , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
            , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
            , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
            , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())
            , pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())

            , pPlacedOnOCPID: 0
            , pIsSentToWarehouse: true
            , pIsLoaded: false

            , pLoadingDate: "01/01/1900"
            , pReturnDate: "01/01/1900"
        };
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Insert", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    var NewContainerID = 0;
                    var NewOperationID = 0;
                    NewContainerID = pData[1];
                    NewOperationID = JSON.parse(pData[2])[0]["OperationID"];
                    swal("Success", "Saved successfully.");
                    $("#hContainerID").val(NewContainerID);
                    $("#hOperationID").val(NewOperationID);
                    $("#btnSaveContainer").attr("onclick", "OperationContainersAndPackages_Update();"); // set it for update.

                    $("#btn-NewAddContainerPackage").removeAttr("disabled");
                    $("#btn-DeleteContainerPackage").removeAttr("disabled");

                    WH_CFS_GateIn_LoadWithPagingWithWhereClauseAndOrderBy();

                    //OperationContainersAndPackages_BindTableRows(JSON.parse(pData[2]));
                    //OperationContainersAndPackages_FillLabels(JSON.parse(pData[3]));
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , null);
    }
}

function OperationContainersAndPackages_Update() {
    debugger;
    if (OperationContainersAndPackages_GetMissingFields()) {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: $("#hContainerID").val()
            , pOperationID: ($("#slOperation").val() == "" ? 0 : $("#slOperation").val())
            , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
            , pPackageTypeID: ($("#slPackageTypes").val() == "" ? 0 : $("#slPackageTypes").val()) //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
            , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            , pVolume: ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
            , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            , pNetWeight: ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
            , pNetWeightTON: ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
            , pGrossWeight: ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
            , pGrossWeightTON: ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
            , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            , pQuantity: 0

            , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
            , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
            , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
            , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
            , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

            , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
            , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
            , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
            , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
            , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
            , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
            , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

            , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" || $("#slPackageTypesOnContainer").val() == null ? 0 : $("#slPackageTypesOnContainer").val())
            , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

            , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
            , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
            , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
            , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())

            //, pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim())
            , pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())
            , pOperatorID: $("#slOperator").val() == "" ? 0 : $("#slOperator").val()
            , pTankOrFlexiNumber: $("#txtTankOrFlexiNumber").val().trim() == "" ? 0 : $("#txtTankOrFlexiNumber").val().trim().toUpperCase()
            , pIsSentToWarehouse: true
            , pIsLoaded: false

            , pLoadingDate: "01/01/1900"
            , pReturnDate: "01/01/1900"
        };
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Update", pParametersWithValues
            , function (pData) {
                debugger;
                if (pData[0]) {
                    swal("Success", "Saved successfully.");
                    WH_CFS_GateIn_LoadWithPagingWithWhereClauseAndOrderBy();
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
        , null);
    }
}


//#endregion

//#region C O N T A I N E R   P A C K A G E S     F U N C T I O N S

function ContainerPackages_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContainerPackages') != "")
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
            DeleteListFunction("/api/ContainerPackages/Delete"
                , { "pContainerPackagesIDs": GetAllSelectedIDsAsString('tblContainerPackages') }
                , function () {
                    ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
                });
        });
}

function ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy() {
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerPackages/LoadWithWhereClause", " WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val(), " HouseOperationCode, PackageTypeName ", 1, 1000, function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
}

function ContainerPackages_BindTableRows(pContainerPackages) {
    ClearAllTableRows("tblContainerPackages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContainerPackages, function (i, item) {
        AppendRowtoTable("tblContainerPackages",
        ("<tr ID='" + item.ID + "' ondblclick='ContainerPackages_EditByDblClick(" + item.ID + "," + item.OperationID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                    + ($("#hBLType").val() == constMasterBLType ? "<td class='HouseOperationCode'>" + (item.HouseOperationCode == 0 ? "" : item.HouseOperationCode) + "</td>" : "")
                    + "<td class='ContainerPackage' val='" + item.PackageTypeID + "'>" + item.PackageTypeName + "</td>"
                    + "<td class='ContainerPackageQuantity'>" + item.Quantity + "</td>"
                    + "<td class='ContainerPackageLength hide'>" + (item.Length == 0 ? "" : item.Length) + "</td>"
                    + "<td class='ContainerPackageWidth hide'>" + (item.Width == 0 ? "" : item.Width) + "</td>"
                    + "<td class='ContainerPackageHeight hide'>" + (item.Height == 0 ? "" : item.Height) + "</td>"
                    + "<td class='ContainerPackageVolume'>" + (item.Volume == 0 ? "" : item.Volume) + "</td>"
                    + "<td class='ContainerPackageVolumetricWeight hide'>" + (item.VolumetricWeight == 0 ? "" : item.VolumetricWeight) + "</td>"
                    + "<td class='ContainerPackageNetWeight hide'>" + (item.NetWeight == 0 ? "" : item.NetWeight) + "</td>"
                    + "<td class='ContainerPackageGrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>"
                    + "<td class='ContainerPackageChargeableWeight hide'>" + (item.ChargeableWeight == 0 ? "" : item.ChargeableWeight) + "</td>"
                    + "<td class='ContainerPackageDescriptionOfGoods'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                    + "<td class='ContainerPackageMarksAndNumbers hide'>" + (item.MarksAndNumbers == 0 ? "" : item.MarksAndNumbers) + "</td>"

                    + "<td class='hide'><a href='#EditContainerPackageModal' data-toggle='modal' onclick='ContainerPackages_FillControls(" + item.ID + "," + item.OperationID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ShowHidettblContainerPackagesHeaders();
    //ApplyPermissions();
    BindAllCheckboxonTable("tblContainerPackages", "ID", "cb-CheckAll-ContainerPackages");
    CheckAllCheckbox("HeaderDeleteContainerPackagesID");
    //HighlightText("#tblContainerPackages>tbody>tr", $("#txtContainerPackagesSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    ContainerPackages_CalculateSummary();
}

function ShowHidettblContainerPackagesHeaders() {
    if ($("#hBLType").val() == constMasterBLType) //if master then show house header for packages
        $("#ContainerPackagesHouseCodeHeader").removeClass("hide");
    else
        $("#ContainerPackagesHouseCodeHeader").addClass("hide");
}

function ContainerPackages_ClearAllControls() {
    debugger;
    if ($("#hContainerID").val() == "" || $("#hOperationID").val() == "")
        swal("Sorry", "Please, save container first.");
    else {
        ClearAll("#EditContainerPackageModal");
        ContainerPackageTypes_GetList(null, "slContainerPackageTypes", null);
        $("#txtContainerPackageQuantity").val(1);

        $("#btnSaveContainerPackage").attr("onclick", "ContainerPackages_Insert(false," + $("#hOperationID").val() + ");");
    }
}

function ContainerPackages_EditByDblClick(pID, pOperationID) {
    jQuery("#EditContainerPackageModal").modal("show");
    ContainerPackages_FillControls(pID, pOperationID);
}

function ContainerPackages_FillControls(pID, pOperationID) {

    ClearAll("#EditContainerPackageModal");
    debugger;
    var tr = $("#tblContainerPackages tr[ID='" + pID + "']");

    $("#lblContainerPackageShown").html(": " + $(tr).find("td.ContainerPackage").text());

    var pContainerPackageTypeID = $(tr).find("td.ContainerPackage").attr('val');
    ContainerPackageTypes_GetList(pContainerPackageTypeID, "slContainerPackageTypes", null);

    $("#hContainerPackageID").val(pID);

    $("#txtContainerPackageQuantity").val($(tr).find("td.ContainerPackageQuantity").text());
    $("#txtContainerPackageLength").val($(tr).find("td.ContainerPackageLength").text());
    $("#txtContainerPackageWidth").val($(tr).find("td.ContainerPackageWidth").text());
    $("#txtContainerPackageHeight").val($(tr).find("td.ContainerPackageHeight").text());
    $("#txtContainerPackageVolume").val($(tr).find("td.ContainerPackageVolume").text());
    $("#txtContainerPackageNetWeight").val($(tr).find("td.ContainerPackageNetWeight").text());
    $("#txtContainerPackageGrossWeight").val($(tr).find("td.ContainerPackageGrossWeight").text());
    $("#txtContainerPackageVolumetricWeight").val($(tr).find("td.ContainerPackageVolumetricWeight").text());
    $("#txtContainerPackageMarksAndNumbers").val($(tr).find("td.ContainerPackageMarksAndNumbers").text());
    $("#txtContainerPackageDescriptionOfGoods").val($(tr).find("td.ContainerPackageDescriptionOfGoods").text());

    $("#btnSaveContainerPackage").attr("onclick", "ContainerPackages_Update(false," + pOperationID + ");");
}

function ContainerPackages_Insert(pSaveandAddNew, pOperationID) {
    debugger;
    if (ContainerPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/ContainerPackages/Insert", {
            pOperationID: $("#hOperationID").val()
            , pOperationContainersAndPackagesID: $("#hContainerID").val()
            , pPackageTypeID: ($("#slContainerPackageTypes option:selected").val() == "" ? 0 : $("#slContainerPackageTypes option:selected").val())
            , pQuantity: ($("#txtContainerPackageQuantity").val() == "" ? 0 : $("#txtContainerPackageQuantity").val())
            , pLength: ($("#txtContainerPackageLength").val() == "" ? 0 : $("#txtContainerPackageLength").val())
            , pWidth: ($("#txtContainerPackageWidth").val() == "" ? 0 : $("#txtContainerPackageWidth").val())
            , pHeight: ($("#txtContainerPackageHeight").val() == "" ? 0 : $("#txtContainerPackageHeight").val())
            , pVolume: ($("#txtContainerPackageVolume").val() == "" ? 0 : $("#txtContainerPackageVolume").val())
            , pNetWeight: ($("#txtContainerPackageNetWeight").val() == "" ? 0 : $("#txtContainerPackageNetWeight").val())
            , pGrossWeight: ($("#txtContainerPackageGrossWeight").val() == "" ? 0 : $("#txtContainerPackageGrossWeight").val())
            , pVolumetricWeight: ($("#txtContainerPackageVolumetricWeight").val() == "" ? 0 : $("#txtContainerPackageVolumetricWeight").val())
            //, pChargeableWeight: ($("#txtContainerPackageChargeableWeight").val() == "" ? 0 : $("#txtContainerPackageChargeableWeight").val())
            , pMarksAndNumbers: ($("#txtContainerPackageMarksAndNumbers").val().trim() == "" ? 0 : $("#txtContainerPackageMarksAndNumbers").val().trim().toUpperCase())
            , pDescriptionOfGoods: ($("#txtContainerPackageDescriptionOfGoods").val().trim() == "" ? 0 : $("#txtContainerPackageDescriptionOfGoods").val().trim().toUpperCase())
        }, pSaveandAddNew
        , "EditContainerPackageModal" //Modal name
        , function () {
            $("#slOperation").attr("disabled", "disabled"); // disable operation to prevent user from updating the operation after inserting packages
            ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
        });
}
function ContainerPackages_Update(pSaveandAddNew, pOperationID) {
    debugger;
    if (ContainerPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/ContainerPackages/Update", {
            pID: $("#hContainerPackageID").val()
            , pOperationID: pOperationID //$("#hOperationID").val()
            , pOperationContainersAndPackagesID: $("#hContainerID").val()
            , pPackageTypeID: ($("#slContainerPackageTypes option:selected").val() == "" ? 0 : $("#slContainerPackageTypes option:selected").val())
            , pQuantity: ($("#txtContainerPackageQuantity").val() == "" ? 0 : $("#txtContainerPackageQuantity").val())
            , pLength: ($("#txtContainerPackageLength").val() == "" ? 0 : $("#txtContainerPackageLength").val())
            , pWidth: ($("#txtContainerPackageWidth").val() == "" ? 0 : $("#txtContainerPackageWidth").val())
            , pHeight: ($("#txtContainerPackageHeight").val() == "" ? 0 : $("#txtContainerPackageHeight").val())
            , pVolume: ($("#txtContainerPackageVolume").val() == "" ? 0 : $("#txtContainerPackageVolume").val())
            , pNetWeight: ($("#txtContainerPackageNetWeight").val() == "" ? 0 : $("#txtContainerPackageNetWeight").val())
            , pGrossWeight: ($("#txtContainerPackageGrossWeight").val() == "" ? 0 : $("#txtContainerPackageGrossWeight").val())
            , pVolumetricWeight: ($("#txtContainerPackageVolumetricWeight").val() == "" ? 0 : $("#txtContainerPackageVolumetricWeight").val())
            //, pChargeableWeight: ($("#txtContainerPackageChargeableWeight").val() == "" ? 0 : $("#txtContainerPackageChargeableWeight").val())
            , pMarksAndNumbers: ($("#txtContainerPackageMarksAndNumbers").val().trim() == "" ? 0 : $("#txtContainerPackageMarksAndNumbers").val().trim().toUpperCase())
            , pDescriptionOfGoods: ($("#txtContainerPackageDescriptionOfGoods").val().trim() == "" ? 0 : $("#txtContainerPackageDescriptionOfGoods").val().trim().toUpperCase())
        }, pSaveandAddNew
        , "EditContainerPackageModal" //Modal name
        , function () {
            ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
        });
}
function ContainerPackages_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContainerPackages') != "")
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
            DeleteListFunction("/api/ContainerPackages/Delete"
                , { "pContainerPackagesIDs": GetAllSelectedIDsAsString('tblContainerPackages') }
                , function () {
                    ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
                    if ($("#cbIsConsolidation").prop('checked'))
                        Shipments_LoadAvailableShipments();
                });
        });
}
function ContainerPackages_Search() {
    debugger;
    var pSearchKey = $("#txtContainerPackagesSearch").val().trim().toUpperCase();
    var pWhereClause = " WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val()
        + " AND  (PackageTypeName LIKE '%" + pSearchKey + "%' "
        //+ " OR MarksAndNumbers LIKE '%" + pSearchKey + "%' "
        + " OR DescriptionOfGoods LIKE '%" + pSearchKey + "%') "
    var pOrderBy = " HouseOperationCode, PackageTypeName ";
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerPackages/LoadWithWhereClause", pWhereClause, pOrderBy, 1, 1000, function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
}
function ContainerPackageTypes_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " Where 1=1 ";
    //the next 2 lines are to prevent selection of already selected packageTypes
    //pWhereClause += " AND ID NOT IN (SELECT PackageTypeID FROM ContainerPackages WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val() + ")";
    //pWhereClause += (pID == null || pID == undefined) ? "" : " OR ID = " + pID.toString(); //incase of editing(i.e. pID has value): to add the edited PackageType to the select list
    GetListWithNameAndWhereClause(pID, "/api/PackageTypes/LoadAll", "Select Type", pSlName, pWhereClause);
}
function ContainerPackages_CalculateSummary() {
    debugger;
    var decTotalContainerPackageSQuantity = 0;
    $(".ContainerPackageQuantity").each(function () {
        var value = $(this).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalContainerPackageSQuantity += parseFloat(value);
        }
    });
    $("#lblTotalNumberOfContainerPackages").html(": " + decTotalContainerPackageSQuantity.toString());
}
function ContainerPackages_ValidateProperties() {
    var isValid = true;
    if (!CheckDecimalPlacesAndNegativeSigns('txtContainerPackageGrossWeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageVolume')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageLength')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageWidth')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageHeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageNetWeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageVolumetricWeight')
        //|| !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageChargeableWeight')
        ) {
        isValid = false;
        swal(strSorry, "Please, Check the numbers.");
    }
    //check for packages quantity (NOT CONTAINER PACKAGE QUANTITY)
    if ($("#txtContainerPackageQuantity").val().trim() == "" || $("#txtContainerPackageQuantity").val().trim() < 1) {
        isValid = false;
        swal(strSorry, "The Quantity must be greater than 0 !");
    }
    return isValid;
}

function ContainerPackages_CalculateVolume() {
    debugger;
    if ($("#txtContainerPackageLength").val() != "" && $("#txtContainerPackageWidth").val() != "" && $("#txtContainerPackageHeight").val() != "" && $("#txtContainerPackageQuantity").val() != "") {
        $("#txtContainerPackageVolume").val((($("#txtContainerPackageLength").val() * $("#txtContainerPackageWidth").val() * $("#txtContainerPackageHeight").val() * $("#txtContainerPackageQuantity").val()) / 1000000).toFixed(2));
        ////if Ocean then no volumetric weight
        //if ($("#cbIsAir").prop("checked"))
        //    $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorAirConstant).toFixed(2));
        //if ($("#cbIsInland").prop("checked"))
        //    $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorInlandConstant).toFixed(2));
        $("#txtContainerPackageVolumetricWeight").val(0); //This is Ocean so no volumetric
    }
    else {
        $("#txtContainerPackageVolume").val(0);
        $("#txtContainerPackageVolumetricWeight").val(0);
    }
    if ($("#txtVolumetricWeight").val() == "" || $("#txtVolumetricWeight").val() == 0)
        $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
    else if ($("#txtGrossWeight").val() == "" || $("#txtGrossWeight").val() == 0)
        $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
    else
        $("#txtChargeableWeight").val(parseFloat($("#txtVolumetricWeight").val()) > parseFloat($("#txtGrossWeight").val())
                                        ? $("#txtVolumetricWeight").val()
                                        : $("#txtGrossWeight").val());
}
//#endregion

//#region O T H E R   F U N C T I O N S

function GetWarehouseAreas() {
    debugger;

    // $('#slRowID').val("") ;
    // $('#slAreaID').val() == "";
    var pParametersWithValues =
        {
            pWarehouseID: $('#slWarehouseID').val() == "" ? 0 : $('#slWarehouseID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateIn/GetWarehouseAreas", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 2, "Select Area", "slAreaID", pData[1], function () { GetAreaRows(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetAreaRows() {
    debugger;

    var pParametersWithValues =
        {
            pAreaID: $('#slAreaID').val() == "" ? 0 : $('#slAreaID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateIn/GetAreaRows", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 2, "Select Row", "slRowID", pData[1], function () { GetRowLocations(); })
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

function GetRowLocations() {
    debugger;

    var pParametersWithValues =
        {
            pRowID: $('#slRowID').val() == "" ? 0 : $('#slRowID').val()
        }
    CallGETFunctionWithParameters("/api/WH_CFS_GateIn/GetRowLocations", pParametersWithValues
          , function (pData) {
              if (pData[0]) {
                  FillListFromObject(null, 1, "Select Location", "slRowLocationID", pData[1], null)

                  $(".slRowLocationIDSelect").html($("#slRowLocationID").html());
              }
              else {
                  swal("Sorry", "Connection failed, please try again.");
              }
          }
          , null);
}

//#endregion

//#region H O U S E B / L     P A C K A G E S     F U N C T I O N S
var PackagesDetailsNewRowCount = 0;

function HouseBillPackagesDetails_BindTableRows(pTableRows) {
    debugger;

    ClearAllTableRows("tblHouseBillPackagesDetails");

    $.each(pTableRows, function (i, item) {


        PackagesDetailsNewRowCount++;
        AppendRowtoTable("tblHouseBillPackagesDetails",

        ("<tr ID='row" + PackagesDetailsNewRowCount + "'>"
            + "<td class='ClsOperationContainersAndPackageID hide'> <input type='text' value='" + item.OperationContainersAndPackageID + "'  id='txtOperationContainersAndPackageID" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "
            + "<td class='ClsPackageTypeName'>" + item.PackageTypeName + "</td>"
            + "<td class='ClsQuantity'>" + item.Quantity + "</td>"
            + "<td class='ClsNetWeight'>" + item.NetWeight + "</td>"
            + "<td class='ClsVolume'>" + item.Volume + "</td>"
            + "<td class='ClsGrossWeight'>" + item.GrossWeight + "</td>"
            + "<td class='ClsRowLocationID'> <select id='slRowLocationID_PkgDts" + PackagesDetailsNewRowCount + "' class='form-control slRowLocationIDSelect'></select> </td> "
            + "<td class='ClsHasDamage'><input name='SpecificationRow' id='cbHasDamage" + PackagesDetailsNewRowCount + "' type='checkbox' value='0' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"

            + "<td class='ClsDamageDescription'> <input type='text' value='" + item.DamageDescription + "'  id='txtDamageDescription" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "
            + "<td class='ClsRemarks'> <input type='text' value='" + item.Remarks + "'  id='txtRemarks" + PackagesDetailsNewRowCount + "' class='form-control input-sm '  style='text-transform:uppercase' /> </td> "

          + "</tr>"));
        $("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).html($("#slRowLocationID").html());
        //var $options = $("#slRowLocationID_PkgDts > option").clone();
        //$("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).append($options);
        $("#slRowLocationID_PkgDts" + PackagesDetailsNewRowCount).val("");

    });

}

function CollectHouseBillPackagesDetails() {
    debugger;
    var array = new Array();
    var _currentHouseBillPackagesDetail = null;

    var table = document.getElementById("tblHouseBillPackagesDetails");
    for (var i = 1, row; row = table.rows[i]; i++) {

        _currentHouseBillPackagesDetail = new HouseBillPackagesDetailClass();
        _currentHouseBillPackagesDetail.OperationContainersAndPackageID = row.cells[0].children[0].value;
        _currentHouseBillPackagesDetail.RowLocationID = (row.cells[6].children[0].value == "" ? 0 : row.cells[6].children[0].value);
        _currentHouseBillPackagesDetail.HasDamage = row.cells[7].children[0].checked;
        _currentHouseBillPackagesDetail.DamageDescription = (row.cells[8].children[0].value == "" ? 0 : row.cells[8].children[0].value);
        _currentHouseBillPackagesDetail.Remarks = (row.cells[9].children[0].value == "" ? 0 : row.cells[9].children[0].value);

        array.push(_currentHouseBillPackagesDetail);
    }

    return array;
}

function HouseBillPackagesDetailClass() {
    debugger;

    this.OperationContainersAndPackageID = "";
    this.RowLocationID = "";
    this.HasDamage = false;
    this.DamageDescription = "";
    this.Remarks = "";
    this.IsChanges = true;
}
//#endregion


function SetAdditionalLocations() {
    if ($("#slRowLocationID").val() == '') {
        $("#slAdditionalLocationsID").find('option').remove();
        return;
    }
    $("#slAdditionalLocationsID").html($("#slRowLocationID").html());
    $("#slAdditionalLocationsID").find('option:first').remove();
    $("#slAdditionalLocationsID").find('option[value=' + $("#slRowLocationID").val() +']').remove();
    $("#slAdditionalLocationsID").select2();
}