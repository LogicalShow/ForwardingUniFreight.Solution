// Network Region ---------------------------------------------------------------
// Bind Network Table Rows
function Network_BindTableRows(pNetwork) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblNetwork");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pNetwork, function (i, item) {
        AppendRowtoTable("tblNetwork",
        ("<tr ID='" + item.ID + "' ondblclick='Network_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    //+ "<td class='IsOcean'> <input id='cbIsOcean" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#NetworkModal' data-toggle='modal' onclick='Network_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblNetwork", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblNetwork>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Network_EditByDblClick(pID) {
    jQuery("#NetworkModal").modal("show");
    Network_FillControls(pID);
}
// Loading with data
function Network_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Network/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Network_BindTableRows(pTabelRows); Network_ClearAllControls(); });
    HighlightText("#tblNetwork>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Network_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Network/Insert", { pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(), pNotes: ($("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()) }, pSaveandAddNew, "NetworkModal", function () { Network_LoadingWithPaging(); });
}
function Network_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Network/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(), pNotes: ($("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()) }, pSaveandAddNew, "NetworkModal", function () { Network_LoadingWithPaging(); });
}
function Network_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblNetwork') != "")
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
            DeleteListFunction("/api/Network/Delete", { "pNetworkIDs": GetAllSelectedIDsAsString('tblNetwork') }, function () {
                Network_LoadingWithPaging(
                    //this is callback in Network_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function Network_FillControls(pID) {
    ClearAll("#NetworkModal");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    //$("#cbIsOcean").prop("checked", $("#cbIsOcean" + pID).prop("checked"));
    $("#btnSave").attr("onclick", "Network_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Network_Update(true);");
}

function Network_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#NetworkModal");

    $("#btnSave").attr("onclick", "Network_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Network_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
//EOF Region Network ---------------------------------------------------------------
