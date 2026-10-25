function JVTypes_BindTableRows(pJVTypes) {
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJVTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblJVTypes",
        ("<tr ID='" + item.ID + "' ondblclick='JVTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='hide'><a href='#JVTypesModal' data-toggle='modal' onclick='JVTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJVTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function JVTypes_LoadingWithPaging() {
    debugger;
    var pWhereClause = JVTypes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { JVTypes_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
}
function JVTypes_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function JVTypes_EditByDblClick(pID) {
    jQuery("#JVTypesModal").modal("show");
    JVTypes_FillControls(pID);
}
function JVTypes_ClearAllControls(callback) {
    ClearAll("#JVTypesModal");

    $("#btnSave").attr("onclick", "JVTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function JVTypes_FillControls(pID) {
    debugger;
    ClearAll("#JVTypesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());

    $("#btnSave").attr("onclick", "JVTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JVTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/JVTypes/Insert", { pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "JVTypesModal", function () { JVTypes_LoadingWithPaging(); JVTypes_ClearAllControls(); });
}
function JVTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/JVTypes/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "JVTypesModal", function () { JVTypes_LoadingWithPaging(); JVTypes_ClearAllControls(); });
}
function JVTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblJVTypes', 'Delete') != "")
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
            DeleteListFunction("/api/JVTypes/Delete", { "pJVTypesIDs": GetAllSelectedIDsAsString('tblJVTypes', 'Delete') }, function () {
                JVTypes_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
