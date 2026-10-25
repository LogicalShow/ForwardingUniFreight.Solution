// City Country ---------------------------------------------------------------
// Bind CRM_Sources Table Rows
function CRM_ComplaintName_BindTableRows(pCRM_Sources) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_ComplaintName");
    $.each(pCRM_Sources, function (i, item) {
        debugger; 
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_ComplaintName",
        ("<tr ID='" + item.ID + "' ondblclick='CRM_IndustryType_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                
                    + "<td class='hCRM_Sources'><a href='#CRM_ComplaintNameModal' data-toggle='modal' onclick='CRM_Sources_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_ComplaintName", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_ComplaintName>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_IndustryType_EditByDblClick(pID) {
    jQuery("#CRM_ComplaintNameModal").modal("show");
    CRM_Sources_FillControls(pID);
}
// Loading with data
function CRM_ComplaintName_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRMComplaintName/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CRM_ComplaintName_BindTableRows(pTabelRows); CRM_ComplaintName_ClearAllControls(); });
    HighlightText("#tblCRM_ComplaintName>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function CRM_ComplaintName_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/CRMComplaintName/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        CRM_ComplaintName_BindTableRows(pTabelRows); CRM_ComplaintName_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCRM_ComplaintName>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function CRM_ComplaintName_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRMComplaintName/Insert", { pName: $("#txtName").val().trim() }, pSaveandAddNew, "CRM_ComplaintNameModal", function () { CRM_ComplaintName_LoadingWithPaging(); });
}
// calling this function for update
function CRM_ComplaintName_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRMComplaintName/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim() }, pSaveandAddNew, "CRM_ComplaintNameModal", function () { CRM_ComplaintName_LoadingWithPaging(); });
}

function CRM_ComplaintName_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_ComplaintName') != "")
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
            DeleteListFunction("/api/CRMComplaintName/Delete", { "pCRM_ComplaintNameIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintName') }, function () { CRM_ComplaintName_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CRMComplaintName/Delete", { "pCRM_SourcesIDs": GetAllSelectedIDsAsString('tblCRM_ComplaintName') }, function () { CRM_ComplaintName_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRM_Sources_FillControls(pID) {
    debugger;
    ClearAll("#CRM_ComplaintNameModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtName").val($(tr).find("td.Name").attr('val'));
   // $("#cboHasDetails").prop('checked', $(tr).find('td.HasDetails').find('input').attr('val'));
    $("#btnSave").attr("onclick", "CRM_ComplaintName_Update(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_ComplaintName_Update(true);");
}

function CRM_ComplaintName_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_ComplaintNameModal", null);
    $("#btnSave").attr("onclick", "CRM_ComplaintName_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_ComplaintName_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
