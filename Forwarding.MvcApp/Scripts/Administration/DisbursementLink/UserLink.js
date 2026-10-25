function UserLink_BindTableRows(pUserLink) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblUserLink");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pUserLink, function (i, item) {
        AppendRowtoTable("tblUserLink",
        ("<tr ID='" + item.ID + "' ondblclick='UserLink_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='UserName'>" + item.UserName + "</td>"
                        + "<td class='DasUserName'>" + item.DasUserName + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
                          + "<td  class='UserDasID hide'>" + item.UserDasID + "</td>"
                    + "<td class='hide'><a href='#UserLinkModal' data-toggle='modal' onclick='UserLink_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblUserLink", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblUserLink>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UserLink_LoadingWithPaging() {
    debugger;
    var pWhereClause = UserLink_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { UserLink_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblUserLink>tbody>tr", $("#txt-Search").val().trim());
}
function UserLink_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    UserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR DasUserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function UserLink_EditByDblClick(pID) {
    jQuery("#UserLinkModal").modal("show");
    UserLink_FillControls(pID);
}
function UserLink_FillControls(pID) {
    debugger;
    ClearAll("#UserLinkModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slUserDas").val($(tr).find("td.UserDasID").text());

    $("#btnSave").attr("onclick", "UserLink_Update(false);");
    $("#btnSaveandNew").attr("onclick", "UserLink_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function UserLink_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/UserLink/Insert", { pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserLinkModal", function () { UserLink_LoadingWithPaging(); });
}

function UserLink_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/UserLink/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserLinkModal", function ()
    { UserLink_LoadingWithPaging(); UserLink_ClearAllControls(); });
}
function UserLink_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblUserLink', 'Delete') != "")
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
            DeleteListFunction("/api/UserLink/Delete", { "pIDs": GetAllSelectedIDsAsString('tblUserLink', 'Delete') }, function () {
                UserLink_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function UserLink_ClearAllControls(callback) {
    ClearAll("#UserLinkModal");

    $("#btnSave").attr("onclick", "UserLink_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "UserLink_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}

//to fill the select box
function Users_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Users/LoadAll", "Select User", "slUsers");
}

//to fill the select box
function Safes_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Safes/LoadAll", "Select Safe", "slUserDas");
}

