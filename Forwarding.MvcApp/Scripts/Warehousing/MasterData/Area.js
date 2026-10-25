function ApplySelectListSearch() {
    debugger;
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouse").trigger("change");
    
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slWarehouse").css({ "width": "100%" }).select2();
}
function Area_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Area_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Area/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/Area", "div-content", function () {
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    var pWarehouse = pData[2];
                    var pWeightUnit = pData[3];
                    var pVolumeUnit = pData[4];
                    Area_BindTableRows(JSON.parse(pData[0]));
                    FillListFromObject(null, 9, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, null);
                    FillListFromObject(pDefaults.WeightUnitID, 1, null/*pStrFirstRow*/, "slWeightUnit", pWeightUnit, null);
                    FillListFromObject(pDefaults.VolumeUnitID, 1, null/*pStrFirstRow*/, "slVolumeUnit", pVolumeUnit, null);
                    ApplySelectListSearch();
                });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { Area_ClearAllControls(); }
    , function () { Area_DeleteList(); });
}
function Area_BindTableRows(pArea) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblArea");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pArea, function (i, item) {
        AppendRowtoTable("tblArea",
        ("<tr ID='" + item.ID + "' ondblclick='Area_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='WarehouseID hide'>" + (item.WarehouseID == 0 ? "" : item.WarehouseID) + "</td>"
                    + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='MaxWeight'>" + item.MaxWeight + "</td>"
                    + "<td class='CurrentWeight'>" + item.CurrentWeight + "</td>"
                    + "<td class='AvailableWeight'>" + item.AvailableWeight + "</td>"
                    + "<td class='WeightUnitID hide'>" + (item.WeightUnitID == 0 ? "" : item.WeightUnitID) + "</td>"
                    + "<td class='WeightUnitCode hide'>" + item.WeightUnitCode + "</td>"
                    + "<td class='MaxVolume'>" + item.MaxVolume + "</td>"
                    + "<td class='CurrentVolume'>" + item.CurrentVolume + "</td>"
                    + "<td class='AvailableVolume'>" + item.AvailableVolume + "</td>"
                    + "<td class='VolumeUnitID hide'>" + (item.VolumeUnitID == 0 ? "" : item.VolumeUnitID) + "</td>"
                    + "<td class='VolumeUnitCode hide'>" + (item.VolumeUnitCode == 0 ? "" : item.VolumeUnitCode) + "</td>"
                    + "<td class='IsDefault' val='" + (item.IsDefault ? 1 : 0) + "' style='font-size:large;color:green;font-weight:bold;'>" + (item.IsDefault ? '&radic;' : '') + "</td>"
                    + "<td class='hide'><a href='#AreaModal' data-toggle='modal' onclick='Area_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblArea", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblArea>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Area_LoadingWithPaging() {
    debugger;
    var pWhereClause = Area_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Area_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblArea>tbody>tr", $("#txt-Search").val().trim());
}
function Area_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE WarehouseName LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function Area_EditByDblClick(pID) {
    jQuery("#AreaModal").modal("show");
    Area_FillControls(pID);
}
function Area_ClearAllControls(callback) {
    ClearAll("#AreaModal");
    $("#slWeightUnit").val(pDefaults.WeightUnitID);
    $("#slVolumeUnit").val(pDefaults.VolumeUnitID);

    $("#btnSave").attr("onclick", "Area_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Area_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function Area_FillControls(pID) {
    debugger;
    ClearAll("#AreaModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    $("#slWarehouse").val($(tr).find("td.WarehouseID").text());
    $("#txtMaxWeight").val($(tr).find("td.MaxWeight").text());
    $("#txtCurrentWeight").val($(tr).find("td.CurrentWeight").text());
    $("#txtAvailableWeight").val($(tr).find("td.AvailableWeight").text());
    $("#slWeightUnit").val($(tr).find("td.WeightUnitID").text());
    $("#txtMaxVolume").val($(tr).find("td.MaxVolume").text());
    $("#txtCurrentVolume").val($(tr).find("td.CurrentVolume").text());
    $("#txtAvailableVolume").val($(tr).find("td.AvailableVolume").text());
    $("#slVolumeUnitID").val($(tr).find("td.VolumeUnit").text());
    $("#cbIsDefault").prop('checked', $(tr).find("td.IsDefault").attr('val')==1);

    $("#btnSave").attr("onclick", "Area_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Area_Update(true);");
    ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function Area_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Area/Insert"
        , {
            pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
            , pWeightUnitID: $("#slWeightUnit").val() == "" ? 0 : $("#slWeightUnit").val()
            , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? 0 : $("#slVolumeUnit").val()
            , pIsDefault: $("#cbIsDefault").is(':checked')
        }, pSaveandAddNew, "AreaModal", function () { Area_LoadingWithPaging(); Area_ClearAllControls(); });
}
function Area_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Area/Update"
        , {
            pID: $("#hID").val()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
            , pWeightUnitID: $("#slWeightUnit").val() == "" ? 0 : $("#slWeightUnit").val()
            , pVolumeUnitID: $("#slVolumeUnit").val() == "" ? 0 : $("#slVolumeUnit").val()
            , pIsDefault: $("#cbIsDefault").is(':checked')
        }, pSaveandAddNew, "AreaModal", function () { Area_LoadingWithPaging(); Area_ClearAllControls(); });
}
function Area_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblArea', 'Delete') != "")
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
            DeleteListFunction("/api/Area/Delete", { "pAreaIDs": GetAllSelectedIDsAsString('tblArea', 'Delete') }, function () {
                Area_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
