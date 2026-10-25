function SubAccountsPrivilege_BindTableRows(pSubAccountsPrivilege) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblSubAccountsPrivilege");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSubAccountsPrivilege, function (i, item) {
        AppendRowtoTable("tblSubAccountsPrivilege",
        ("<tr ID='" + item.ID + "' ondblclick='SubAccountsPrivilege_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='Username'>" + item.Username + "</td>"
                        + "<td class='SubAccountName'>" + item.SubAccountName + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
                          + "<td  class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='hide'><a href='#SubAccountsPrivilegeModal' data-toggle='modal' onclick='SubAccountsPrivilege_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSubAccountsPrivilege", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSubAccountsPrivilege>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SubAccountsPrivilege_LoadingWithPaging() {
    debugger;
    var pWhereClause = SubAccountsPrivilege_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { SubAccountsPrivilege_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblSubAccountsPrivilege>tbody>tr", $("#txt-Search").val().trim());
}
function SubAccountsPrivilege_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    Username LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR SubAccountName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function SubAccountsPrivilege_EditByDblClick(pID) {
    jQuery("#SubAccountsPrivilegeModal").modal("show");
    SubAccountsPrivilege_FillControls(pID);
}
function SubAccountsPrivilege_FillControls(pID) {
    debugger;
    ClearAll("#SubAccountsPrivilegeModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slSubAccount").val($(tr).find("td.SubAccountID").text());

    $("#btnSave").attr("onclick", "SubAccountsPrivilege_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SubAccountsPrivilege_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function SubAccountsPrivilege_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SubAccountsPrivilege/Insert", { pUserID: $("#slUsers").val(), pSubAccountID: $("#slSubAccount").val() }, pSaveandAddNew, "SubAccountsPrivilegeModal", function () { SubAccountsPrivilege_LoadingWithPaging(); });
}

function SubAccountsPrivilege_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/SubAccountsPrivilege/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pSubAccountID: $("#slSubAccount").val() }, pSaveandAddNew, "SubAccountsPrivilegeModal", function ()
    { SubAccountsPrivilege_LoadingWithPaging(); SubAccountsPrivilege_ClearAllControls(); });
}
function SubAccountsPrivilege_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSubAccountsPrivilege', 'Delete') != "")
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
            DeleteListFunction("/api/SubAccountsPrivilege/Delete", { "pIDs": GetAllSelectedIDsAsString('tblSubAccountsPrivilege', 'Delete') }, function () {
                SubAccountsPrivilege_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function SubAccountsPrivilege_ClearAllControls(callback) {
    ClearAll("#SubAccountsPrivilegeModal");

    $("#btnSave").attr("onclick", "SubAccountsPrivilege_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SubAccountsPrivilege_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
