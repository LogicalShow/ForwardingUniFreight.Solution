// TrackingStage Region ---------------------------------------------------------------
// Bind TrackingStage Table Rows
function TrackingStage_BindTableRows(pTrackingStage) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTrackingStage");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTrackingStage, function (i, item) {
        AppendRowtoTable("tblTrackingStage",
        ("<tr ID='" + item.ID + "' ondblclick='TrackingStage_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ViewOrder'>" + item.ViewOrder + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='IsOcean'> <input id='cbIsOcean" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir'> <input id='cbIsAir" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland'> <input id='cbIsInland" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsImport'> <input id='cbIsImport" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsImport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsExport'> <input id='cbIsExport" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsExport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDomestic'> <input id='cbIsDomestic" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsDomestic == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsClearance'> <input id='cbIsClearance" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsClearance == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#TrackingStageModal' data-toggle='modal' onclick='TrackingStage_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblTrackingStage", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTrackingStage>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TrackingStage_EditByDblClick(pID) {
    jQuery("#TrackingStageModal").modal("show");
    TrackingStage_FillControls(pID);
}
// Loading with data
function TrackingStage_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/TrackingStage/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { TrackingStage_BindTableRows(pTabelRows); TrackingStage_ClearAllControls(); });
    HighlightText("#tblTrackingStage>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function TrackingStage_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/TrackingStage/Insert", { pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(), pViewOrder: $("#txtViewOrder").val().trim() == "" ? "0" : $("#txtViewOrder").val().trim(), pNotes: ($("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()), pIsOcean: $("#cbIsOcean").prop("checked"), pIsAir: $("#cbIsAir").prop("checked"), pIsInland: $("#cbIsInland").prop("checked"), pIsImport: $("#cbIsImport").prop("checked"), pIsExport: $("#cbIsExport").prop("checked"), pIsDomestic: $("#cbIsDomestic").prop("checked"), pIsClearance: $("#cbIsClearance").prop("checked") }, pSaveandAddNew, "TrackingStageModal", function () { TrackingStage_LoadingWithPaging(); });
}
function TrackingStage_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/TrackingStage/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(), pViewOrder: $("#txtViewOrder").val().trim() == "" ? "0" : $("#txtViewOrder").val().trim(), pNotes: ($("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()), pIsOcean: $("#cbIsOcean").prop("checked"), pIsAir: $("#cbIsAir").prop("checked"), pIsInland: $("#cbIsInland").prop("checked"), pIsImport: $("#cbIsImport").prop("checked"), pIsExport: $("#cbIsExport").prop("checked"), pIsDomestic: $("#cbIsDomestic").prop("checked"), pIsClearance: $("#cbIsClearance").prop("checked") }, pSaveandAddNew, "TrackingStageModal", function () { TrackingStage_LoadingWithPaging(); });
}
function TrackingStage_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTrackingStage') != "")
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
            DeleteListFunction("/api/TrackingStage/Delete", { "pTrackingStageIDs": GetAllSelectedIDsAsString('tblTrackingStage') }, function () {
                TrackingStage_LoadingWithPaging(
                    //this is callback in TrackingStage_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function TrackingStage_FillControls(pID) {
    ClearAll("#TrackingStageModal");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtViewOrder").val($(tr).find("td.ViewOrder").text());
    $("#cbIsOcean").prop("checked", $("#cbIsOcean" + pID).prop("checked"));
    $("#cbIsAir").prop("checked", $("#cbIsAir" + pID).prop("checked"));
    $("#cbIsInland").prop("checked", $("#cbIsInland" + pID).prop("checked"));
    $("#cbIsImport").prop("checked", $("#cbIsImport" + pID).prop("checked"));
    $("#cbIsExport").prop("checked", $("#cbIsExport" + pID).prop("checked"));
    $("#cbIsDomestic").prop("checked", $("#cbIsDomestic" + pID).prop("checked"));
    $("#cbIsClearance").prop("checked", $("#cbIsClearance" + pID).prop("checked"));

    $("#btnSave").attr("onclick", "TrackingStage_Update(false);");
    $("#btnSaveandNew").attr("onclick", "TrackingStage_Update(true);");
}

function TrackingStage_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#TrackingStageModal");

    $("#btnSave").attr("onclick", "TrackingStage_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TrackingStage_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
//EOF Region TrackingStage ---------------------------------------------------------------
