function CustudyBalance_BindTableRows(pCustudyBalance) {
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblCustudyBalance");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustudyBalance, function (i, item) {
        AppendRowtoTable("tblCustudyBalance",
        ("<tr ID='" + item.ID + "'>"
                    //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='Name'>" + item.LocalDebit + "</td>"
                    + "<td class='Name'>" + item.LocalCredit + "</td>"
                    + "<td class='Name'>" + item.Balance + "</td>"
                    + "<td class='hide'><a href='#CustudyBalanceModal' data-toggle='modal' onclick='CustudyBalance_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustudyBalance", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustudyBalance>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CustudyBalance_LoadingWithPaging() {
    debugger;
    var pWhereClause = CustudyBalance_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { CustudyBalance_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblCustudyBalance>tbody>tr", $("#txt-Search").val().trim());
}
function CustudyBalance_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function CustudyBalance_EditByDblClick(pID) {
    jQuery("#CustudyBalanceModal").modal("show");
    CustudyBalance_FillControls(pID);
}
function CustudyBalance_FillControls(pID) {
    debugger;
    ClearAll("#CustudyBalanceModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());

    $("#btnSave").attr("onclick", "CustudyBalance_Update(false);");
    $("#btnSaveandNew").attr("onclick", "CustudyBalance_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function CustudyBalance_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CustudyBalance/Insert", { pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "CustudyBalanceModal", function () { CustudyBalance_LoadingWithPaging(); CustudyBalance_ClearAllControls(); });
}
function CustudyBalance_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CustudyBalance/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim().toUpperCase() }, pSaveandAddNew, "CustudyBalanceModal", function () { CustudyBalance_LoadingWithPaging(); CustudyBalance_ClearAllControls(); });
}
function CustudyBalance_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustudyBalance', 'Delete') != "")
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
            DeleteListFunction("/api/CustudyBalance/Delete", { "pCustudyBalanceIDs": GetAllSelectedIDsAsString('tblCustudyBalance', 'Delete') }, function () {
                CustudyBalance_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function CustudyBalance_ClearAllControls(callback) {
    ClearAll("#CustudyBalanceModal");

    $("#btnSave").attr("onclick", "CustudyBalance_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CustudyBalance_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
