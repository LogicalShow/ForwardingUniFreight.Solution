// City Country ---------------------------------------------------------------
// Bind CRM_Actions Table Rows
function CRM_Actions_BindTableRows(pCRM_Actions) {
    debugger;
    $("#hl-menu-CRM").parent().addClass("active");
    ClearAllTableRows("tblCRM_Actions");
    $.each(pCRM_Actions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCRM_Actions",
        ("<tr ID='" + item.ID + "' ondblclick='CRM_Actions_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                    + "<td class='PipeLineStageID hide' val='" + item.PipeLineStageID + "'>" + item.PipeLineStageID + "</td>"
                    + "<td class='AlarmDays'>" + (item.AlarmDays == 0 ? "" : item.AlarmDays) + "</td>"
                    + "<td class='AlarmHours hide'>" + (item.AlarmHours == 0 ? "" : item.AlarmHours) + "</td>"
                    + "<td class='ActionPercent'>" + (item.ActionPercent == 0 ? "" : item.ActionPercent) + "</td>"
                    + "<td class='Color' style='background-color:" + item.Color + "'>" + (item.Color == 0 ? "" : item.Color) + "</td>"
                    + "<td class='HasDetails hide'> <input type='checkbox' disabled='disabled' val='" + (item.HasDetails == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hCRM_Actions'><a href='#CRM_ActionsModal' data-toggle='modal' onclick='CRM_Actions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCRM_Actions", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCRM_Actions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CRM_Actions_EditByDblClick(pID) {
    jQuery("#CRM_ActionsModal").modal("show");
    CRM_Actions_FillControls(pID);
}
// Loading with data
function CRM_Actions_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CRM_Actions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CRM_Actions_BindTableRows(pTabelRows); CRM_Actions_ClearAllControls(); });
    HighlightText("#tblCRM_Actions>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function CRM_Actions_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/CRM_Actions/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        CRM_Actions_BindTableRows(pTabelRows); CRM_Actions_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCRM_Actions>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function CRM_Actions_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CRM_Actions/Insert"
        , {
            pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
            , pPipeLineStageID: $("#slPipeLineStages").val()
        }, pSaveandAddNew, "CRM_ActionsModal", function () { CRM_Actions_LoadingWithPaging(); });
}
// calling this function for update
function CRM_Actions_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CRM_Actions/Update",
        {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim()
            , pName: $("#txtName").val().trim()
            , pHasDetails: $("#cboHasDetails").prop('checked')
            , pAlarmDays: $("#txtAlarmDays").val().trim() == "" ? 0 : $("#txtAlarmDays").val().trim()
            , pAlarmHours: $("#txtAlarmHours").val().trim() == "" ? 0 : $("#txtAlarmHours").val().trim()
            , pActionPercent: $("#txtPercent").val().trim() == "" ? 0 : $("#txtPercent").val().trim()
            , pColor: $("#slColors").val()
            , pPipeLineStageID: $("#slPipeLineStages").val()
        }, pSaveandAddNew, "CRM_ActionsModal", function () { CRM_Actions_LoadingWithPaging(); });
}

function CRM_Actions_Delete(pID) {
    DeleteListFunction("/api/CRM_Actions/DeleteByID", { "pID": pID }, function () { CRM_Actions_LoadingWithPaging(); });
}

function CRM_Actions_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCRM_Actions') != "")
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
            DeleteListFunction("/api/CRM_Actions/Delete", { "pCRM_ActionsIDs": GetAllSelectedIDsAsString('tblCRM_Actions') }, function () { CRM_Actions_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/CRM_Actions/Delete", { "pCRM_ActionsIDs": GetAllSelectedIDsAsString('tblCRM_Actions') }, function () { CRM_Actions_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function CRM_Actions_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //CRM_Actions_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);
    ClearAll("#CRM_ActionsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#txtName").val($(tr).find("td.Name").attr('val'));
    $("#txtAlarmDays").val($(tr).find("td.AlarmDays").text());
    $("#txtAlarmHours").val($(tr).find("td.AlarmHours").text());
    $("#txtPercent").val($(tr).find("td.ActionPercent").text());
    $("#slPipeLineStages").val($(tr).find("td.PipeLineStageID").text() == "0" ? "" : ($(tr).find("td.PipeLineStageID").text()))
    $("#slColors").val($(tr).find("td.Color").text() == "" ? 0 : $(tr).find("td.Color").text());

    $("#cboHasDetails").prop('checked', $(tr).find('td.HasDetails').find('input').attr('val'));
    $("#btnSave").attr("onclick", "CRM_Actions_Update(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_Actions_Update(true);");
}

function CRM_Actions_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CRM_ActionsModal", null);
    $("#btnSave").attr("onclick", "CRM_Actions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CRM_Actions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
