function ApplySelectListSearch() {
    debugger;
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouse").trigger("change");
    $("#slArea").css({ "width": "100%" }).select2();
    $("#slArea").trigger("change");
    $("#slPickupMethod").css({ "width": "100%" }).select2();
    $("#slPickupMethod").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slArea").css({ "width": "100%" }).select2();
    $("#slPickupMethod").css({ "width": "100%" }).select2();
}
var _hasRequest = false;
function Row_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;

    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Row_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Row/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/Row", "div-content", function () {

        if (_hasRequest) {
            $('#cbUploadManually').closest('div.form-group').removeClass('hide');
        }

        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pWeightUnit = pData[3];
                var pVolumeUnit = pData[4];
                var pLocationStatus = pData[5];
                var pLocationPickupMethod = pData[6];
                var pArea = pData[7];
                var pLengthUnit = pData[8];
                Row_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 9, TranslateString("SelectFromMenu"), "slWarehouse", pWarehouse, null);
                FillListFromObject(constMeterUnitID, 1, null/*pStrFirstRow*/, "slHeaderLengthUnit", pLengthUnit
                    , function () { $("#slRowLocationLengthUnit").html($("#slHeaderLengthUnit").html()); });
                FillListFromObject(pDefaults.WeightUnitID, 1, null/*pStrFirstRow*/, "slWeightUnit", pWeightUnit
                    , function () { $("#slRowLocationWeightUnit").html($("#slWeightUnit").html()); });
                FillListFromObject(pDefaults.VolumeUnitID, 1, null/*pStrFirstRow*/, "slVolumeUnit", pVolumeUnit
                    , function () { $("#slRowLocationVolumeUnit").html($("#slVolumeUnit").html()); });
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slLocationStatus", pLocationStatus
                    , function () {
                        $.each(JSON.parse(pLocationStatus), function (i, item) {
                            $("#slLocationStatus option[value=" + item.ID + "]").attr('code', item.Code);
                        });
                        $("#slRowLocationStatus").html($("#slLocationStatus").html());
                    });
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slPickupMethod", pLocationPickupMethod
                    , function () { $("#slRowLocationPickupMethod").html($("#slPickupMethod").html()); });
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slArea", pArea, null);
                ApplySelectListSearch();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { Row_ClearAllControls(); }
    , function () { Row_DeleteList(); });
}
function Row_BindTableRows(pRow) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblRow");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    $.each(pRow, function (i, item) {
        AppendRowtoTable("tblRow",
        ("<tr ID='" + item.ID + "' ondblclick='Row_FillAllControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                        + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                        + "<td class='AreaName'>" + item.AreaName + "</td>"
                        + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class=''>"
                        //+ "<a href='#RowModal' data-toggle='modal' onclick='Row_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                        + "<a href='#CopyRowModal' data-toggle='modal' onclick='Row_FillCopyModal(" + item.ID + ");' " + copyControlsText + "</a>"
                    + "</td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblRow", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblRow>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Row_LoadingWithPaging() {
    debugger;
    var pWhereClause = Row_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Row_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblRow>tbody>tr", $("#txt-Search").val().trim());
}
function Row_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%' or AreaName LIKE N'%" + $("#txt-Search").val().trim() + "%' or WarehouseName LIKE N'%" + $("#txt-Search").val().trim() + "%' "));
}
function Row_ClearAllControls() {
    debugger;
    $(".classDisableForLocationExistence").removeAttr("disabled");
    $("#tblRowLocation tbody").html("");
    $("#txtNumberOfLevelsPerRow").removeAttr("disabled");
    $("#txtNumberOfTraysPerLevel").removeAttr("disabled");
    $("#lblRowMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    $("#lblRowMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    $("#slArea").html("<option value=''><--Select--></option>");
    ClearAll("#RowModal");
    //Row_EnableDisableIMOProprties(false);
    $("#slHeaderLengthUnit").val(constMeterUnitID);
    $("#slWeightUnit").val(pDefaults.WeightUnitID);
    $("#slVolumeUnit").val(pDefaults.VolumeUnitID);
    $("#btnSave").attr("onclick", "Row_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Row_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    ApplySelectListSearch_OnlyChange();
}
function Row_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerRow").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");
    $("#slArea").html("<option value=''><--Select--></option>");
    ClearAll("#RowModal");
    jQuery("#RowModal").modal("show");
    $("#tblRowLocation tbody").html("");
    var pParametersWithValues = {
        pHeaderID: pID
    };
    CallGETFunctionWithParameters("/api/Row/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pRowHeader = JSON.parse(pData[0]);
            var pRowLocation = JSON.parse(pData[1]);
            _RowLocations = pRowLocation;
            var pArea = pData[2];
            if (pRowLocation.length > 0)
                $(".classDisableForLocationExistence").attr("disabled", "disabled");
            else
                $(".classDisableForLocationExistence").removeAttr("disabled");
            $("#hID").val(pID);
            $("#slWarehouse").val(pRowHeader.WarehouseID == 0 ? "" : pRowHeader.WarehouseID);
            //$("#slArea").val(pRowHeader.AreaID == 0 ? "" : pRowHeader.AreaID);
            FillListFromObject(pRowHeader.AreaID, 2, TranslateString("SelectFromMenu"), "slArea", pArea, null);
            $("#txtName").val(pRowHeader.Name == 0 ? "" : pRowHeader.Name);
            $("#txtNumberOfLevelsPerRow").val(pRowHeader.NumberOfLevelsPerRow);
            $("#txtNumberOfTraysPerLevel").val(pRowHeader.NumberOfTraysPerLevel);
            $("#txtLength").val("");
            $("#txtWidth").val("");
            $("#slHeaderLengthUnit").val(pRowHeader.LengthUnitID == 0 ? "" : pRowHeader.LengthUnitID);
            $("#txtMaxWeight").val("");
            $("#slWeightUnit").val(pRowHeader.WeightUnitID == 0 ? "" : pRowHeader.WeightUnitID);
            $("#txtMaxVolume").val("");
            $("#slVolumeUnit").val(pRowHeader.VolumeUnitID == 0 ? "" : pRowHeader.VolumeUnitID);
            RowLocation_BindTableRows(pRowLocation);
            $("#btnSave").attr("onclick", "Row_Save(false);");
            $("#btnSaveAndAddNew").attr("onclick", "Row_Save(true);");
            ApplySelectListSearch_OnlyChange();
            FadePageCover(false);
        }
        , null);
}
function Row_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (parseInt($("#txtNumberOfLevelsPerRow").val()) == 0 || parseInt($("#txtNumberOfTraysPerLevel").val()) == 0) {
        FadePageCover(false);
        swal("Sorry", "Levels & Trays count must be greater than 0.");
    }
    if (ValidateForm("form", "RowModal")) {
        pParametersWithValues = {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
            , pAreaID: $("#slArea").val() == "" ? "0" : $("#slArea").val()
            , pNumberOfLevelsPerRow: $("#txtNumberOfLevelsPerRow").val() == "" ? "0" : $("#txtNumberOfLevelsPerRow").val()
            , pNumberOfTraysPerLevel: $("#txtNumberOfTraysPerLevel").val() == "" ? "0" : $("#txtNumberOfTraysPerLevel").val()
            , pLocationLength: $("#txtLength").val() == "" ? "0" : $("#txtLength").val()
            , pLocationWidth: $("#txtWidth").val() == "" ? "0" : $("#txtWidth").val()
            , pLengthUnitID: $("#slHeaderLengthUnit").val() == "" ? "0" : $("#slHeaderLengthUnit").val()
            , pMaxWeight: $("#txtMaxWeight").val() == "" ? "0" : $("#txtMaxWeight").val()
            , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
            , pMaxVolume: $("#txtMaxVolume").val() == "" ? "0" : $("#txtMaxVolume").val()
            , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
            , pStatusID: $("#slLocationStatus").val() == "" ? "0" : $("#slLocationStatus").val()
            , pPickupMethodID: $("#slPickupMethod").val() == "" ? "0" : $("#slPickupMethod").val()
            , pWarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , pUploadManually: $("#cbUploadManually").is(':checked')
        };
        CallGETFunctionWithParameters("/api/Row/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pRowLocation = JSON.parse(pData[2]);
                    _RowLocations = pRowLocation;
                    Row_LoadingWithPaging();
                    if (pSaveAndNew) {
                        Row_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                      
                        RowLocation_BindTableRows(pRowLocation);
                        $("#btnSave").attr("onclick", "Row_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "Row_Save(true);");
                    }
                    swal("Success", "Saved successfully.");
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else //if (ValidateForm("form", "RowModal"))
        FadePageCover(false);
}
function Row_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblRow') != "")
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
            DeleteListFunction("/api/Row/Delete", { "pRowIDs": GetAllSelectedIDsAsString('tblRow') }, function () { Row_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Row/Delete", { "pRowIDs": GetAllSelectedIDsAsString('tblRow') }, function () { Row_LoadingWithPaging(); });
}
function Row_WarehouseChanged() {
    debugger;
    $("#slArea").html("<option value=''><--Select--></option>");
    if ($("#slWarehouse").val() != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pIsLoadArrayOfObjects: false
            , pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: "WHERE WarehouseID=" + $("#slWarehouse").val()
            , pOrderBy: "Name"
        };
        CallGETFunctionWithParameters("/api/Area/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
            , pParametersWithValues
            , function (pData) {
                var pArea = pData[0];
                FillListFromObject(null, 2, "<--Select-->", "slArea", pArea, null);
                FadePageCover(false);
            }
            , null);
    }
}
function Row_FillCopyModal(pRowID) {
    var tr = $("#tblRow tr[ID='" + pRowID + "']");
    $("#lblCopyRowShown").html(": " + $(tr).find("td.Name").text());
    $("#hRowToCopyID").val(pRowID);
}
function Row_Copy() {
    debugger;
    if ($("#txtNewRowName").val().trim() == "")
        swal("Sorry", "Please, enter row name.");
    else {
        var pParametersWithValues = {
            "pRowToCopyID": $("#hRowToCopyID").val()
            , "pNewRowName": $("#txtNewRowName").val().trim().toUpperCase()
        };
        //Confirmation message to delete
        swal({
            title: "Are you sure?",
            text: "Row" + $("#lblCopyRowShown").html() + " will be copied.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Copy.",
            closeOnConfirm: false
        },
        //callback function in case of success
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Row/CopyRow", pParametersWithValues
                , function (pData) {
                    var _MessageReturned = pData[0];
                    if (_MessageReturned == "") {
                        swal("Success", "Row copied successfully.");
                        Row_LoadingWithPaging();
                    }
                    else {
                        swal("Sorry", _MessageReturned);
                        FadePageCover(false);
                    }
                }
                , null);
        });
    }
}
/***************************************RowLocation***************************************/
var _RowLocations=[];
function RowLocation_BindTableRows(pRowLocation) {
    debugger;
    ClearAllTableRows("tblRowLocation");
    var _RowMaxWeight = 0;
    var _RowMaxVolume = 0;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pRowLocation, function (i, item) {
        _RowMaxWeight += item.MaxWeight;
        _RowMaxVolume += item.MaxVolume;
        AppendRowtoTable("tblRowLocation",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='RowLocation_FillControls(" + item.ID + ");'") : "") + ">"
                    + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='RowID hide'>" + item.RowID + "</td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='LocationLength'>" + item.LocationLength + "</td>"
                    + "<td class='LocationWidth'>" + item.LocationWidth + "</td>"
                    + "<td class='LengthUnitID hide'>" + (item.LengthUnitID == 0 ? "" : item.LengthUnitID) + "</td>"
                    + "<td class='MaxWeight'>" + item.MaxWeight + "</td>"
                    + "<td class='WeightUnitID hide'>" + (item.WeightUnitID == 0 ? "" : item.WeightUnitID) + "</td>"
                    + "<td class='MaxVolume'>" + item.MaxVolume + "</td>"
                    + "<td class='MaxHeat'>" + item.MaxHeat + "</td>"
                    + "<td class='VolumeUnitID hide'>" + (item.VolumeUnitID == 0 ? "" : item.VolumeUnitID) + "</td>"
                    + "<td class='StatusID hide'>" + (item.StatusID == 0 ? "" : item.StatusID) + "</td>"
                    + "<td class='StatusName'>" + (item.StatusName == 0 ? "" : item.StatusName) + "</td>"
                    + "<td class='PickupMethodID hide'>" + (item.PickupMethodID == 0 ? "" : item.PickupMethodID) + "</td>"
                    + "<td class='PickupMethodName'>" + (item.PickupMethodName == 0 ? "" : item.PickupMethodName) + "</td>"
                    + "<td class='TypeID hide'>" + item.TypeID + "</td>"
            + "<td class='TypeName'>" + item.TypeName + "</td>"
            + "<td class='IsDefault' val='" + (item.IsDefault ? 1 : 0) + "' style='font-size:large;color:green;font-weight:bold;'>" + (item.IsDefault ? '&radic;' : '') + "</td>"
                    + "<td class='LevelNumber hide'>" + item.LevelNumber + "</td>"
                    + "<td class='TrayNumber hide'>" + item.TrayNumber + "</td>"
                    + "<td class='hide'><a href='#RowLocationModal' data-toggle='modal' onclick='RowLocation_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    if (!_hasRequest) {
        $('#tblRowLocation .LevelNumber, #tblRowLocation .TrayNumber').removeClass('hide');
    }
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    $("#lblRowMaxWeight").html("<span> : </span><span>" + parseFloat(_RowMaxWeight).toFixed(2) + "</span>");
    $("#lblRowMaxVolume").html("<span> : </span><span>" + parseFloat(_RowMaxVolume).toFixed(2) + "</span>");
    BindAllCheckboxonTable("tblRowLocation", "ID", "cb-CheckAll-RowLocation");
    CheckAllCheckbox("HeaderDeleteRowLocationID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function RowLocation_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        ClearAll("#RowLocationModal");
        $("#btnSaveRowLocation").attr("onclick", "RowLocation_Save(false);");
        $("#btnSaveAndAddNewRowLocation").attr("onclick", "RowLocation_Save(true);");
        jQuery("#RowLocationModal").modal("show");
    }
}
function RowLocation_FillControls(pID) {
    debugger;
    ClearAll("#RowLocationModal");
    $("#hRowLocationID").val(pID);
    var tr = $("#tblRowLocation tr[ID='" + pID + "']");

    $("#txtRowLocationCode").val($(tr).find("td.Code").text());
    $("#txtRowLocationLevelNumber").val($(tr).find("td.LevelNumber").text());
    $("#txtRowLocationTrayNumber").val($(tr).find("td.TrayNumber").text());
    $("#txtRowLocationLength").val($(tr).find("td.LocationLength").text());
    $("#txtRowLocationWidth").val($(tr).find("td.LocationWidth").text());
    $("#txtRowLocationMaxWeight").val($(tr).find("td.MaxWeight").text());
    $("#txtRowLocationMaxHeat").val($(tr).find("td.MaxHeat").text());
    $("#txtRowLocationMaxVolume").val($(tr).find("td.MaxVolume").text());

    $("#slHeaderLengthUnit").val($(tr).find("td.LengthUnitID").text());
    $("#slRowLocationWeightUnit").val($(tr).find("td.WeightUnitID").text());
    $("#slRowLocationVolumeUnit").val($(tr).find("td.VolumeUnitID").text());
    $("#slRowLocationStatus").val($(tr).find("td.StatusID").text());
    $("#slRowLocationPickupMethod").val($(tr).find("td.PickupMethodID").text());
    $("#slRowLocationType").val($(tr).find("td.TypeID").text());
    $("#cbIsDefault").prop('checked', $(tr).find("td.IsDefault").attr('val') == 1);
    jQuery("#RowLocationModal").modal("show");
}
function RowLocation_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "RowLocationModal")) {
        var pParametersWithValues = {
            pRowLocationID: $("#hRowLocationID").val() == "" ? 0 : $("#hRowLocationID").val()
            , pRowID: $("#hID").val()
            , pCode: $("#txtRowLocationCode").val().trim() == "" ? 0 : $("#txtRowLocationCode").val().trim().toUpperCase()
            , pLevelNumber: $("#txtRowLocationLevelNumber").val() == "" ? 0 : $("#txtRowLocationLevelNumber").val()
            , pTrayNumber: $("#txtRowLocationTrayNumber").val().trim() == "" ? 0 : $("#txtRowLocationTrayNumber").val().trim()
            , pLocationLength: $("#txtRowLocationLength").val() == "" ? 0 : $("#txtRowLocationLength").val()
            , pLocationWidth: $("#txtRowLocationWidth").val() == "" ? 0 : $("#txtRowLocationWidth").val()
            , pLengthUnitID: $("#slHeaderLengthUnit").val() == "" ? 0 : $("#slHeaderLengthUnit").val()
            , pMaxWeight: $("#txtRowLocationMaxWeight").val() == "" ? 0 : $("#txtRowLocationMaxWeight").val()
            , pMaxHeat: $("#txtRowLocationMaxHeat").val() == "" ? 0 : $("#txtRowLocationMaxHeat").val()
            , pWeightUnitID: $("#slRowLocationWeightUnit").val() == "" ? 0 : $("#slRowLocationWeightUnit").val()
            , pMaxVolume: $("#txtRowLocationMaxVolume").val() == "" ? 0 : $("#txtRowLocationMaxVolume").val()
            , pVolumeUnitID: $("#slRowLocationVolumeUnit").val() == "" ? 0 : $("#slRowLocationVolumeUnit").val()
            , pStatusID: $("#slRowLocationStatus").val() == "" ? 0 : $("#slRowLocationStatus").val()
            , pPickupMethodID: $("#slRowLocationPickupMethod").val() == "" ? 0 : $("#slRowLocationPickupMethod").val()
            , pTypeID: $("#slRowLocationType").val() > 0 ? $("#slRowLocationType").val() : 0
            , pIsDefault: $("#cbIsDefault").is(':checked')
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_Save", pParametersWithValues
            , function (pData) {
                var pReturnedMessage = pData[0];
                if (pReturnedMessage == "") {
                    _RowLocations = JSON.parse(pData[1]);
                    RowLocation_BindTableRows(_RowLocations);
                    if (pSaveAndNew)
                        ClearAll("#RowLocationModal");
                    else
                        jQuery("#RowLocationModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", pReturnedMessage);
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function RowLocation_ApplyToLocations() {
    debugger;
    var pSelectedRowLocationIDs = GetAllSelectedIDsAsString('tblRowLocation');
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else if (pSelectedRowLocationIDs == "")
        swal("Sorry", "Please, select required locations.");
    else
        swal({
            title: "Are you sure?",
            text: "The selected records will be updated!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, I am sure.",
            closeOnConfirm: true
        },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            var pParametersWithValues =
                {
                    pRowID: $("#hID").val()
                    , pSelectedRowLocationIDs: pSelectedRowLocationIDs
                    , pLocationLength: $("#txtLength").val() == "" ? "0" : $("#txtLength").val()
                    , pLocationWidth: $("#txtWidth").val() == "" ? "0" : $("#txtWidth").val()
                    , pLengthUnitID: $("#slHeaderLengthUnit").val() == "" ? "0" : $("#slHeaderLengthUnit").val()
                    , pMaxWeight: $("#txtMaxWeight").val() == "" ? "0" : $("#txtMaxWeight").val()
                    , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
                    , pMaxVolume: $("#txtMaxVolume").val() == "" ? "0" : $("#txtMaxVolume").val()
                    , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
                    , pStatusID: $("#slLocationStatus").val() == "" ? "0" : $("#slLocationStatus").val()
                    , pPickupMethodID: $("#slPickupMethod").val() == "" ? "0" : $("#slPickupMethod").val()
                };
            CallGETFunctionWithParameters("/api/Row/RowLocation_ApplyToLocations"
                , pParametersWithValues
                , function (pData) {
                    var strMessage = pData[0];
                    var pRowLocation = JSON.parse(pData[1]);
                    if (pData[0] == "") {
                        _RowLocations = pRowLocation;
                        RowLocation_BindTableRows(pRowLocation);
                    }
                    else
                        swal("Sorry", strMessage);
                    FadePageCover(false);
                });
        });
}
function RowLocation_GenerateDefaultLocations() {
    debugger;
    if ($("#hID").val() == "") {
        swal("Sorry", "Please save header first.");
    }
    else swal({
        title: "Are you sure?",
        text: "The default locations will be updated!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, generate default.",
        closeOnConfirm: true
    },
        //callback function in case of confirm
        function () {
            FadePageCover(true);
            if (parseInt($("#txtNumberOfLevelsPerRow").val()) == 0 || parseInt($("#txtNumberOfTraysPerLevel").val()) == 0) {
                FadePageCover(false);
                swal("Sorry", "Levels & Trays count must be greater than 0.");
            }
            if (ValidateForm("form", "RowModal")) {
                pParametersWithValues = {
                    pRestoredRowID: $("#hID").val() == "" ? 0 : $("#hID").val()
                    , pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
                    , pAreaID: $("#slArea").val() == "" ? "0" : $("#slArea").val()
                    , pNumberOfLevelsPerRow: $("#txtNumberOfLevelsPerRow").val() == "" ? "0" : $("#txtNumberOfLevelsPerRow").val()
                    , pNumberOfTraysPerLevel: $("#txtNumberOfTraysPerLevel").val() == "" ? "0" : $("#txtNumberOfTraysPerLevel").val()
                    , pLocationLength: $("#txtLength").val() == "" ? "0" : $("#txtLength").val()
                    , pLocationWidth: $("#txtWidth").val() == "" ? "0" : $("#txtWidth").val()
                    , pLengthUnitID: $("#slHeaderLengthUnit").val() == "" ? "0" : $("#slHeaderLengthUnit").val()
                    , pMaxWeight: $("#txtMaxWeight").val() == "" ? "0" : $("#txtMaxWeight").val()
                    , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
                    , pMaxVolume: $("#txtMaxVolume").val() == "" ? "0" : $("#txtMaxVolume").val()
                    , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
                    , pStatusID: $("#slLocationStatus").val() == "" ? "0" : $("#slLocationStatus").val()
                    , pPickupMethodID: $("#slPickupMethod").val() == "" ? "0" : $("#slPickupMethod").val()
                };
                CallGETFunctionWithParameters("/api/Row/RowLocation_DefaultLocations", pParametersWithValues
                    , function (pData) {
                        if (pData[0] == "") {
                            var pRowLocation = JSON.parse(pData[1]);
                            _RowLocations = pRowLocation;
                            RowLocation_BindTableRows(pRowLocation);
                            if (pRowLocation.length > 0)
                                $(".classDisableForLocationExistence").attr("disabled", "disabled");
                            else
                                $(".classDisableForLocationExistence").removeAttr("disabled");
                            Row_LoadingWithPaging();
                            swal("Success", "Saved successfully.");
                        }
                        else {
                            swal("Sorry", pData[0]);
                            FadePageCover(false);
                        }
                    }
                    , null);
            }
            else //if (ValidateForm("form", "RowModal"))
                FadePageCover(false);
        });
}
function RowLocation_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pRowLocationIDsToDelete = GetAllSelectedIDsAsString('tblRowLocation');
    if (pRowLocationIDsToDelete != "")
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
            FadePageCover(true);
            CallPOSTFunctionWithParameters("/api/Row/RowLocation_DeleteList"
                , { pRowLocationIDsToDelete: pRowLocationIDsToDelete, pRowID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        var pRowLocation = JSON.parse(pData[1]);
                        _RowLocations = pRowLocation;
                        RowLocation_BindTableRows(pRowLocation);
                        if (pRowLocation.length > 0)
                            $(".classDisableForLocationExistence").attr("disabled", "disabled");
                        else
                            $(".classDisableForLocationExistence").removeAttr("disabled");
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
function RowLocation_Export() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "No records to export.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pRowLocationWhereClause_Export: "WHERE RowID=" + $("#hID").val()
            , pOrderBy: "ID"
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_Export"
            , pParametersWithValues
            , function (pData) {
                var _ExportedRows = JSON.parse(pData[0]);
                //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
                ExportToExcel(_ExportedRows, "Warehouse,Area,Row,Location", "New File", null);
                FadePageCover(false);
            }
            , null);
    }
}
//*********************************Reading Excel Files***************************************//
function RowLocation_Import() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save basic data first.");
    else
        $("#btnAddFromExcel").click();
}

function onFileSelected(event) {
    debugger;
    if (_hasRequest) //Excel 2016 xlsx
    {

        // Checking whether FormData is available in browser  
        if (window.FormData !== undefined) {
            var id = $("#hID").val();
            var length = $("#slHeaderLengthUnit").val() == "" ? "0" : $("#slHeaderLengthUnit").val();
            var weight = $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val();
            var volume = $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val();
            var prefix = $('#cbUploadManually').is(':checked')?"": $('#slWarehouse option:selected').text().substr(0, $('#slWarehouse option:selected').text().indexOf(':')) + $('#slArea option:selected').text() + $('#txtName').val();

            var data = new FormData();

            var files = $("#btnAddFromExcel").get(0).files;

            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append(files[0].name, files[0]);
                data.append("pID", id);
                data.append("pLengthUnitID", length);
                data.append("pWeightUnitID", weight);
                data.append("pVolumeUnitID", volume);
                data.append("pPrefix", prefix);
                FadePageCover(true);
                $.ajax({
                    url: '/api/Row/RowLocation_UploadFromExcel',
                    type: "POST",
                    contentType: false, // Not to set any content header  
                    processData: false, // Not to process data  
                    data: data,
                    success:
                        function (pData) {
                            debugger;
                            FadePageCover(false);
                            $('#btn-ImportReceiveDetailsSerial').prop('disabled', false);
                            $("#btnAddFromExcel").val('');

                            var _ReturnedMessage = pData[0];
                            if (_ReturnedMessage == "") {
                                swal("Success", "Saved Successfully.");
                                var pRowHeader = JSON.parse(pData[2]);
                                _RowLocations = JSON.parse(pData[1]);
                                RowLocation_BindTableRows(_RowLocations);
                                $("#slWarehouse").val(pRowHeader.WarehouseID);
                            }
                            else {
                                var pRowHeader = JSON.parse(pData[2]);
                                _RowLocations = JSON.parse(pData[1]);
                                RowLocation_BindTableRows(_RowLocations);
                                swal("Sorry", _ReturnedMessage);
                            }



                        }
                    ,
                    error: function (err) {
                        FadePageCover(false);
                        swal("Sorry", err.statusText);
                        $('#btn-ImportReceiveDetailsSerial').prop('disabled', false);
                    }

                });
            }
            else {
                swal("Sorry", "Choose Excel File");
                $('#btn-ImportReceiveDetailsSerial').prop('disabled', false);
            }
        }
        else {
            alert("FormData is not supported.");
            $('#btnImportExcel').prop('disabled', false);
        }

    }
    else//Must be saved as Excel 97-2003 xls
    {

        var selectedFile = event.target.files[0];
        if (selectedFile != undefined) { //to handle the case of not choosing a file
            ImportExcel(selectedFile, 'tblRowLocationTemp');
            return;
            var sFilename = selectedFile.name;
            // Create A File Reader HTML5
            var reader = new FileReader();
            var result = document.getElementById("hExtractedData");
            reader.onload = function (e) {
                var data = e.target.result;
                var cfb = XLS.CFB.read(data, { type: 'binary' });
                var wb = XLS.parse_xlscfb(cfb);
                // Loop Over Each Sheet
                wb.SheetNames.forEach(function (sheetName) {
                    //// Obtain The Current Row As CSV
                    //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                    var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                    //$("#hExtractedData").val(sCSV);
                    if (oJS.length > 0 && oJS[0].Location != undefined) //if (sCSV != "")
                        ImportFromExcelFile(oJS);
                    else
                        swal("Sorry", "Please, revise data and version of the file.");
                });
            };
            // Tell JS To Start Reading The File.. You could delay this if desired
            reader.readAsBinaryString(selectedFile);
        }

    }

}

function ImportFromExcelFile(pDataRows) {
    debugger;
    FadePageCover(true);
    var pCodeList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pCodeList += (pCodeList == "" ? (pDataRows[i].Code == undefined || pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Code == undefined || pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())));
    }
    var pParametersWithValues = {
        pRowID: $("#hID").val()
        , pCodeList: pCodeList
        , pLengthUnitID: $("#slHeaderLengthUnit").val() == "" ? "0" : $("#slHeaderLengthUnit").val()
        , pWeightUnitID: $("#slWeightUnit").val() == "" ? "0" : $("#slWeightUnit").val()
        , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? "0" : $("#slVolumeUnit").val()
    };
    CallPOSTFunctionWithParameters("/api/Row/RowLocation_ImportFromExcel", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                swal("Success", "Saved Successfully.");
                var pRowHeader = JSON.parse(pData[2]);
                _RowLocations = JSON.parse(pData[1]);
                RowLocation_BindTableRows(_RowLocations);
                $("#slWarehouse").val(pRowHeader.WarehouseID);
            }
            else {
                var pRowHeader = JSON.parse(pData[2]);
                _RowLocations = JSON.parse(pData[1]);
                RowLocation_BindTableRows(_RowLocations);
                swal("Sorry", _ReturnedMessage);
            }
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}
/****************************RowLocationSerial*************************************/

function SearchRowLocation() {
    var rowLocations = _RowLocations;
    if ($('#srchCode').val().trim()) {
        rowLocations = rowLocations.filter(function (loc) { return IsNull(loc.Code, '').toLowerCase().includes($('#srchCode').val().trim().toLowerCase()); });
    }
    if ($('#srchLength').val()) {
        rowLocations = rowLocations.filter(function (loc) { return loc.LocationLength.toString().includes($('#srchLength').val()); });
    }
    if ($('#srchWidth').val()) {
        rowLocations = rowLocations.filter(function (loc) { return loc.LocationWidth.toString().includes($('#srchWidth').val()); });
    }
    if ($('#srchMaxWgt').val()) {
        rowLocations = rowLocations.filter(function (loc) { return loc.MaxWeight.toString().includes($('#srchMaxWgt').val()); });
    }
    if ($('#srchMaxCBM').val()) {
        rowLocations = rowLocations.filter(function (loc) { return loc.MaxVolume.toString().includes($('#srchMaxCBM').val()); });
    }
    if ($('#srchMaxHeat').val()) {
        rowLocations = rowLocations.filter(function (loc) { return loc.MaxHeat.toString().includes($('#srchMaxHeat').val()); });
    }
    if ($('#srchStatus').val().trim()) {
        rowLocations = rowLocations.filter(function (loc) { return IsNull(loc.StatusName, '').toLowerCase().includes($('#srchStatus').val().trim().toLowerCase()); });
    }
    if ($('#srchPickupMethod').val().trim()) {
        rowLocations = rowLocations.filter(function (loc) { return IsNull(loc.PickupMethodName, '').toLowerCase().includes($('#srchPickupMethod').val().trim().toLowerCase()); });
    }
    if ($('#srchType').val().trim()) {
        rowLocations = rowLocations.filter(function (loc) { return IsNull(loc.TypeName, '').toLowerCase().includes($('#srchType').val().trim().toLowerCase()); });
    }
    RowLocation_BindTableRows(rowLocations);
}