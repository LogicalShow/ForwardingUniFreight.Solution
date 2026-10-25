function UserShippingLinkStarShine_BindTableRows(pUserShippingLinkStarShine) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblUserShippingLinkStarShine");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pUserShippingLinkStarShine, function (i, item) {
        AppendRowtoTable("tblUserShippingLinkStarShine",
        ("<tr ID='" + item.ID + "' ondblclick='UserShippingLinkStarShine_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='UserName'>" + item.UserName + "</td>"
                        + "<td class='DasUserName'>" + item.DasUserName + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
                          + "<td  class='UserDasID hide'>" + item.UserDasID + "</td>"
                    + "<td class='hide'><a href='#UserShippingLinkStarShineModal' data-toggle='modal' onclick='UserShippingLinkStarShine_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblUserShippingLinkStarShine", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblUserShippingLinkStarShine>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UserShippingLinkStarShine_LoadingWithPaging() {
    debugger;
    var pWhereClause = UserShippingLinkStarShine_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { UserShippingLinkStarShine_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblUserShippingLinkStarShine>tbody>tr", $("#txt-Search").val().trim());
}
function UserShippingLinkStarShine_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    UserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR DasUserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function UserShippingLinkStarShine_EditByDblClick(pID) {
    jQuery("#UserShippingLinkStarShineModal").modal("show");
    UserShippingLinkStarShine_FillControls(pID);
}
function UserShippingLinkStarShine_FillControls(pID) {
    debugger;
    ClearAll("#UserShippingLinkStarShineModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slUserDas").val($(tr).find("td.UserDasID").text());

    $("#btnSave").attr("onclick", "UserShippingLinkStarShine_Update(false);");
    $("#btnSaveandNew").attr("onclick", "UserShippingLinkStarShine_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function UserShippingLinkStarShine_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/UserShippingLinkStarShine/Insert", { pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserShippingLinkStarShineModal", function () { UserShippingLinkStarShine_LoadingWithPaging(); });
}

function UserShippingLinkStarShine_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/UserShippingLinkStarShine/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserShippingLinkStarShineModal", function ()
    { UserShippingLinkStarShine_LoadingWithPaging(); UserShippingLinkStarShine_ClearAllControls(); });
}
function UserShippingLinkStarShine_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblUserShippingLinkStarShine', 'Delete') != "")
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
            DeleteListFunction("/api/UserShippingLinkStarShine/Delete", { "pIDs": GetAllSelectedIDsAsString('tblUserShippingLinkStarShine', 'Delete') }, function () {
                UserShippingLinkStarShine_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function UserShippingLinkStarShine_ClearAllControls(callback) {
    ClearAll("#UserShippingLinkStarShineModal");

    $("#btnSave").attr("onclick", "UserShippingLinkStarShine_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "UserShippingLinkStarShine_Insert(true);");
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

