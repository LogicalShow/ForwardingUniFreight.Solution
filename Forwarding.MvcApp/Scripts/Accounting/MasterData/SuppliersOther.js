function SuppliersOther_BindTableRows(pSuppliersOther) {
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblSuppliersOther");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSuppliersOther, function (i, item) {
        AppendRowtoTable("tblSuppliersOther",
        ("<tr ID='" + item.ID + "' ondblclick='SuppliersOther_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name'>" + item.Name + "</td>"
            + "<td class='LocalName'>" + item.LocalName + "</td>"
            + "<td class='Address hide'>" + item.Address + "</td>"
            + "<td class='Notes hide'>" + item.Notes + "</td>"

                    + "<td class='hide'><a href='#SuppliersOtherModal' data-toggle='modal' onclick='SuppliersOther_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSuppliersOther", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSuppliersOther>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SuppliersOther_LoadingWithPaging() {
    debugger;
    var pWhereClause = SuppliersOther_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { SuppliersOther_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblSuppliersOther>tbody>tr", $("#txt-Search").val().trim());
}
function SuppliersOther_GetWhereClause() {
    return ($("#txt-Search").val().trim() == ""
        ? "WHERE 1=1"
        : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%' OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%'"));

}
function SuppliersOther_EditByDblClick(pID) {
    jQuery("#SuppliersOtherModal").modal("show");
    SuppliersOther_FillControls(pID);
}
function SuppliersOther_FillControls(pID) {
    debugger;
    ClearAll("#SuppliersOtherModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());


    $("#btnSave").attr("onclick", "SuppliersOther_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SuppliersOther_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function SuppliersOther_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SuppliersOther/Insert", {
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pAddress: $("#txtAddress").val().trim(),
        pNotes: $("#txtNotes").val().trim()

    }, pSaveandAddNew, "SuppliersOtherModal", function () { SuppliersOther_LoadingWithPaging(); SuppliersOther_ClearAllControls(); });
}
function SuppliersOther_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/SuppliersOther/Update", {
        pID: $("#hID").val(), pName: $("#txtName").val().trim(),
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pAddress: $("#txtAddress").val().trim(),
        pNotes: $("#txtNotes").val().trim()
    }, pSaveandAddNew, "SuppliersOtherModal", function () { SuppliersOther_LoadingWithPaging(); SuppliersOther_ClearAllControls(); });
}
function SuppliersOther_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSuppliersOther', 'Delete') != "")
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
            DeleteListFunction("/api/SuppliersOther/Delete", { "pSuppliersOtherIDs": GetAllSelectedIDsAsString('tblSuppliersOther', 'Delete') }, function () {
                SuppliersOther_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function SuppliersOther_ClearAllControls(callback) {
    ClearAll("#SuppliersOtherModal");

    $("#btnSave").attr("onclick", "SuppliersOther_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SuppliersOther_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
