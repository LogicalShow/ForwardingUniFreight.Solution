function Sec_UserBanks_BindTableRows(pSec_UserBanks) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblSec_UserBanks");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSec_UserBanks, function (i, item) {
        AppendRowtoTable("tblSec_UserBanks",
        ("<tr ID='" + item.ID + "' ondblclick='Sec_UserBanks_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='Username'>" + item.Username + "</td>"
                        + "<td class='Bankname'>" + item.Bankname + "</td>"
                          + "<td class='UserID hide'>" + item.UserID + "</td>"
                          + "<td  class='BankID hide'>" + item.BankID + "</td>"
                    + "<td class='hide'><a href='#Sec_UserBanksModal' data-toggle='modal' onclick='Sec_UserBanks_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSec_UserBanks", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSec_UserBanks>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Sec_UserBanks_LoadingWithPaging() {
    debugger;
    var pWhereClause = Sec_UserBanks_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Sec_UserBanks_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblSec_UserBanks>tbody>tr", $("#txt-Search").val().trim());
}
function Sec_UserBanks_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    Username LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Bankname LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function Sec_UserBanks_EditByDblClick(pID) {
    jQuery("#Sec_UserBanksModal").modal("show");
    Sec_UserBanks_FillControls(pID);
}
function Sec_UserBanks_FillControls(pID) {
    debugger;
    ClearAll("#Sec_UserBanksModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slBanks").val($(tr).find("td.BankID").text());

    $("#btnSave").attr("onclick", "Sec_UserBanks_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Sec_UserBanks_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function Sec_UserBanks_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Sec_UserBanks/Insert", { pUserID: $("#slUsers").val(), pBankID: $("#slBanks").val() }, pSaveandAddNew, "Sec_UserBanksModal", function () { Sec_UserBanks_LoadingWithPaging(); });
}

function Sec_UserBanks_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Sec_UserBanks/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pBankID: $("#slBanks").val() }, pSaveandAddNew, "Sec_UserBanksModal", function ()
    { Sec_UserBanks_LoadingWithPaging(); Sec_UserBanks_ClearAllControls(); });
}
function Sec_UserBanks_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSec_UserBanks', 'Delete') != "")
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
            DeleteListFunction("/api/Sec_UserBanks/Delete", { "pIDs": GetAllSelectedIDsAsString('tblSec_UserBanks', 'Delete') }, function () {
                Sec_UserBanks_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function Sec_UserBanks_ClearAllControls(callback) {
    ClearAll("#Sec_UserBanksModal");

    $("#btnSave").attr("onclick", "Sec_UserBanks_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Sec_UserBanks_Insert(true);");
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
function Banks_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Banks/LoadAll", "Select Bank", "slBanks");
}

