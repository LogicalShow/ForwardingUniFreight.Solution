function FA_UserBranches_BindTableRows(pFA_UserBranches) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblFA_UserBranches");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pFA_UserBranches, function (i, item) {
        AppendRowtoTable("tblFA_UserBranches",
        ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='Username'>" + item.Username + "</td>"
                        + "<td class='BranchName'>" + item.BranchName + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
            + "<td  class='BranchID hide'>" + item.BranchID + "</td>"
            + "<td  class='LastDepreciationDate hide'>" + (item.LastDepreciationDate == null ? '01/01/1900' : GetDateFromServer(item.LastDepreciationDate)) + "</td>"
                    + "<td class='hide'><a href='#FA_UserBranchesModal' data-toggle='modal' onclick='FA_UserBranches_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_UserBranches", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_UserBranches>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    //ondblclick = 'FA_UserBranches_EditByDblClick(" + item.ID + ");'
}
function FA_UserBranches_LoadingWithPaging() {
    debugger;
    var pWhereClause = FA_UserBranches_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { FA_UserBranches_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblFA_UserBranches>tbody>tr", $("#txt-Search").val().trim());
}




function GetUserBranches(THIS)
{


    Fill_SelectInput_WithDependedID("/api/FA_UserBranches/GetUserBranches", "ID", "Name", null, "#slBranches", "", $(THIS).val());

}




function FA_UserBranches_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    UserName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR BranchName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function FA_UserBranches_EditByDblClick(pID) {
    jQuery("#FA_UserBranchesModal").modal("show");
    FA_UserBranches_FillControls(pID);
}
function FA_UserBranches_FillControls(pID) {
    debugger;
    ClearAll("#FA_UserBranchesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slBranches").val($(tr).find("td.BranchID").text());
    $('#hLastDepreciationDate').val($(tr).find("td.LastDepreciationDate").text());
    $("#btnSave").attr("onclick", "FA_UserBranches_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_UserBranches_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function FA_UserBranches_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/FA_UserBranches/Insert", { pUserID: $("#slUsers").val(), pBranchID: $("#slBranches").val(), pLastDepreciationDate: '01/01/1900' }, pSaveandAddNew, "FA_UserBranchesModal", function () { FA_UserBranches_LoadingWithPaging(); });
}

function FA_UserBranches_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/FA_UserBranches/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pBranchID: $("#slBranches").val(), pLastDepreciationDate: '01/01/1900' }, pSaveandAddNew, "FA_UserBranchesModal", function ()
    { FA_UserBranches_LoadingWithPaging(); FA_UserBranches_ClearAllControls(); });
}
function FA_UserBranches_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_UserBranches', 'Delete') != "")
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
            DeleteListFunction("/api/FA_UserBranches/Delete", { "pIDs": GetAllSelectedIDsAsString('tblFA_UserBranches', 'Delete') }, function () {
                FA_UserBranches_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function FA_UserBranches_ClearAllControls(callback) {
    ClearAll("#FA_UserBranchesModal");

    $("#btnSave").attr("onclick", "FA_UserBranches_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_UserBranches_Insert(true);");
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
function Branches_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Branches/LoadAll", "Select Safe", "slBranches");
}

