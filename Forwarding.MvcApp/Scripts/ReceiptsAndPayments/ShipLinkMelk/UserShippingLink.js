function UserShippingLink_BindTableRows(pUserShippingLink) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblUserShippingLink");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pUserShippingLink, function (i, item) {
        AppendRowtoTable("tblUserShippingLink",
        ("<tr ID='" + item.ID + "' ondblclick='UserShippingLink_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='UserName'>" + item.UserName + "</td>"
                        + "<td class='DasUserName'>" + item.DasUserName + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
                          + "<td  class='UserDasID hide'>" + item.UserDasID + "</td>"
                    + "<td class='hide'><a href='#UserShippingLinkModal' data-toggle='modal' onclick='UserShippingLink_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblUserShippingLink", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblUserShippingLink>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UserShippingLink_LoadingWithPaging() {
    debugger;
    var pWhereClause = UserShippingLink_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { UserShippingLink_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblUserShippingLink>tbody>tr", $("#txt-Search").val().trim());
}
function UserShippingLink_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    UserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR DasUserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function UserShippingLink_EditByDblClick(pID) {
    jQuery("#UserShippingLinkModal").modal("show");
    UserShippingLink_FillControls(pID);
}
function UserShippingLink_FillControls(pID) {
    debugger;
    ClearAll("#UserShippingLinkModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slUserDas").val($(tr).find("td.UserDasID").text());

    $("#btnSave").attr("onclick", "UserShippingLink_Update(false);");
    $("#btnSaveandNew").attr("onclick", "UserShippingLink_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function UserShippingLink_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/UserShippingLink/Insert", { pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserShippingLinkModal", function () { UserShippingLink_LoadingWithPaging(); });
}

function UserShippingLink_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/UserShippingLink/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pUserDasID: $("#slUserDas").val() }, pSaveandAddNew, "UserShippingLinkModal", function ()
    { UserShippingLink_LoadingWithPaging(); UserShippingLink_ClearAllControls(); });
}
function UserShippingLink_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblUserShippingLink', 'Delete') != "")
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
            DeleteListFunction("/api/UserShippingLink/Delete", { "pIDs": GetAllSelectedIDsAsString('tblUserShippingLink', 'Delete') }, function () {
                UserShippingLink_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function UserShippingLink_ClearAllControls(callback) {
    ClearAll("#UserShippingLinkModal");

    $("#btnSave").attr("onclick", "UserShippingLink_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "UserShippingLink_Insert(true);");
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

