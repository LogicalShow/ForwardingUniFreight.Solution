function JournalTypes_BindTableRows(pJournalTypes) {
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJournalTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJournalTypes, function (i, item) {
        AppendRowtoTable("tblJournalTypes",
        ("<tr ID='" + item.ID + "' ondblclick='JournalTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='hide'><a href='#JournalTypesModal' data-toggle='modal' onclick='JournalTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJournalTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function JournalTypes_LoadingWithPaging() {
    debugger;
    var pWhereClause = JournalTypes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { JournalTypes_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
}
function JournalTypes_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function JournalTypes_EditByDblClick(pID) {
    jQuery("#JournalTypesModal").modal("show");
    JournalTypes_FillControls(pID);
}
function JournalTypes_FillControls(pID) {
    debugger;
    ClearAll("#JournalTypesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());

    $("#btnSave").attr("onclick", "JournalTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "JournalTypes_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JournalTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/JournalTypes/Insert", { pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "JournalTypesModal", function () { JournalTypes_LoadingWithPaging(); JournalTypes_ClearAllControls(); });
}
function JournalTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/JournalTypes/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "JournalTypesModal", function () { JournalTypes_LoadingWithPaging(); JournalTypes_ClearAllControls(); });
}
function JournalTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblJournalTypes', 'Delete') != "")
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
            DeleteListFunction("/api/JournalTypes/Delete", { "pJournalTypesIDs": GetAllSelectedIDsAsString('tblJournalTypes', 'Delete') }, function () {
                JournalTypes_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function JournalTypes_ClearAllControls(callback) {
    ClearAll("#JournalTypesModal");

    $("#btnSave").attr("onclick", "JournalTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "JournalTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
