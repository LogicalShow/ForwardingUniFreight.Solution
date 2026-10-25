// City Country ---------------------------------------------------------------
// Bind CRM_Sources Table Rows
function CRM_Sources_BindTableRows(pCRM_Sources) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_Sources");
    $.each(pCRM_Sources, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_Sources",
        ("<tr ID='" + item.ID + "' ondblclick='CRM_Sources_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                
                    + "<td class='hCRM_Sources'><a href='#CRM_SourcesModal' data-toggle='modal' onclick='CRM_Sources_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_Sources", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_Sources>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_Sources_EditByDblClick(pID) {
    jQuery("#CRM_SourcesModal").modal("show");
    CRM_Sources_FillControls(pID);
}
// Loading with data
function CRM_Sources_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_Sources/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CRM_Sources_BindTableRows(pTabelRows); CRM_Sources_ClearAllControls(); });
    HighlightText("#tblCRM_Sources>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function CRM_Sources_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/CRM_Sources/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        CRM_Sources_BindTableRows(pTabelRows); CRM_Sources_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCRM_Sources>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function CRM_Sources_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_Sources/Insert", {  pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim() }, pSaveandAddNew, "CRM_SourcesModal", function () { CRM_Sources_LoadingWithPaging(); });
}
// calling this function for update
function CRM_Sources_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRM_Sources/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim() }, pSaveandAddNew, "CRM_SourcesModal", function () { CRM_Sources_LoadingWithPaging(); });
}

function CRM_Sources_Delete(pID) {
    DeleteListFunction("/api/CRM_Sources/DeleteByID", { "pID": pID }, function () { CRM_Sources_LoadingWithPaging(); });
}

function CRM_Sources_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_Sources') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            DeleteListFunction("/api/CRM_Sources/Delete", { "pCRM_SourcesIDs": GetAllSelectedIDsAsString('tblCRM_Sources') }, function () { CRM_Sources_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/CRM_Sources/Delete", { "pCRM_SourcesIDs": GetAllSelectedIDsAsString('tblCRM_Sources') }, function () { CRM_Sources_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRM_Sources_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //CRM_Sources_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);
    ClearAll("#CRM_SourcesModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#txtName").val($(tr).find("td.Name").attr('val'));
   // $("#cboHasDetails").prop('checked', $(tr).find('td.HasDetails').find('input').attr('val'));
    $("#btnSave").attr("onclick", "CRM_Sources_Update(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_Sources_Update(true);");
}

function CRM_Sources_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_SourcesModal", null);
    $("#btnSave").attr("onclick", "CRM_Sources_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_Sources_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
