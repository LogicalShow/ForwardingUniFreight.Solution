function A_PaymentRequest_UsersLevel_Initialize() {
    debugger;

    strLoadWithPagingFunctionName = "/api/A_PaymentRequest_UsersLevel/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 50;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadView("/Administration/A_PaymentRequest_UsersLevel", "div-content", function () {
                LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                    , function (pData) {
                        var pTabelRows = JSON.parse(pData[0]);
                        var pSafes = pData[2];
                        var pUseres = pData[3];

                        A_PaymentRequest_UsersLevel_BindTableRows(pTabelRows);

                        if (IsMESCOCompany) {
                            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slLevels", pData[4], null);
                        } else {
                            $("#slLevels").append('<option value="-1">Accountant</option>');
                            $("#slLevels").append('<option value="1">Payable Supervisor</option>');
                            $("#slLevels").append('<option value="2">Treasury Supervisor</option>');
                        }

                      //  FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slLevels", pSafes, null);
                        FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slUsers", pUseres, null);
                    });
        },
            function () { A_PaymentRequest_UsersLevel_ClearAllControls(); },
            function () { A_PaymentRequest_UsersLevel_DeleteList(); });

}
function A_PaymentRequest_UsersLevel_BindTableRows(pA_PaymentRequest_UsersLevel) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblA_PaymentRequest_UsersLevel");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pA_PaymentRequest_UsersLevel, function (i, item) {
        AppendRowtoTable("tblA_PaymentRequest_UsersLevel",
        ("<tr ID='" + item.ID + "' ondblclick='A_PaymentRequest_UsersLevel_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Username'>" + item.Username + "</td>"
                    + "<td class='LevelName'>" + item.LevelName + "</td>"
                    + "<td class='LevelNo hide'>" + item.LevelNo + "</td>"
                    + "<td class='UserID hide'>" + item.UserID + "</td>"
                    + "<td class='hide'><a href='#A_PaymentRequest_UsersLevelModal' data-toggle='modal' onclick='A_PaymentRequest_UsersLevel_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblA_PaymentRequest_UsersLevel", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblA_PaymentRequest_UsersLevel>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function A_PaymentRequest_UsersLevel_LoadingWithPaging() {
    debugger;
    var pWhereClause = A_PaymentRequest_UsersLevel_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { A_PaymentRequest_UsersLevel_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblA_PaymentRequest_UsersLevel>tbody>tr", $("#txt-Search").val().trim());
}
function A_PaymentRequest_UsersLevel_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += "    Username LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR LevelNo LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR LevelName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        
        pWhereClause += ")";
    }
    return pWhereClause;
}
function A_PaymentRequest_UsersLevel_EditByDblClick(pID) {
    jQuery("#A_PaymentRequest_UsersLevelModal").modal("show");
    A_PaymentRequest_UsersLevel_FillControls(pID);
}
function A_PaymentRequest_UsersLevel_FillControls(pID) {
    debugger;
    ClearAll("#A_PaymentRequest_UsersLevelModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.UserName").text() + "</span>");
    $("#slUsers").val($(tr).find("td.UserID").text());
    $("#slLevels").val($(tr).find("td.LevelNo").text());

    $("#btnSave").attr("onclick", "A_PaymentRequest_UsersLevel_Update(false);");
    $("#btnSaveandNew").attr("onclick", "A_PaymentRequest_UsersLevel_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

// calling web function to add new Region item.
function A_PaymentRequest_UsersLevel_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/A_PaymentRequest_UsersLevel/Insert", { pUserID: $("#slUsers").val(), pLevelNo: $("#slLevels").val() }, pSaveandAddNew, "A_PaymentRequest_UsersLevelModal", function () { A_PaymentRequest_UsersLevel_LoadingWithPaging(); });
}

function A_PaymentRequest_UsersLevel_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/A_PaymentRequest_UsersLevel/Update", { pID: $("#hID").val(), pUserID: $("#slUsers").val(), pLevelNo: $("#slLevels").val() }, pSaveandAddNew, "A_PaymentRequest_UsersLevelModal", function ()
    { A_PaymentRequest_UsersLevel_LoadingWithPaging(); A_PaymentRequest_UsersLevel_ClearAllControls(); });
}
function A_PaymentRequest_UsersLevel_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblA_PaymentRequest_UsersLevel', 'Delete') != "")
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
            DeleteListFunction("/api/A_PaymentRequest_UsersLevel/Delete", { "pIDs": GetAllSelectedIDsAsString('tblA_PaymentRequest_UsersLevel', 'Delete') }, function () {
                A_PaymentRequest_UsersLevel_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function A_PaymentRequest_UsersLevel_ClearAllControls(callback) {
    ClearAll("#A_PaymentRequest_UsersLevelModal");

    $("#btnSave").attr("onclick", "A_PaymentRequest_UsersLevel_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "A_PaymentRequest_UsersLevel_Insert(true);");
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


