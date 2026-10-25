function OpnJVNo_BindTableRows(pOpnJVNo) {
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblOpnJVNo");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOpnJVNo, function (i, item) {
        AppendRowtoTable("tblOpnJVNo",
        ("<tr ID='" + item.ID + "' ondblclick='OpnJVNo_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Fiscal_Year_ID hide'>" + item.Fiscal_Year_ID + "</td>"
                    + "<td class='hide'><a href='#OpnJVNoModal' data-toggle='modal' onclick='OpnJVNo_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblOpnJVNo", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblOpnJVNo>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function OpnJVNo_LoadingWithPaging() {
    debugger;
    var pWhereClause = OpnJVNo_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { OpnJVNo_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblOpnJVNo>tbody>tr", $("#txt-Search").val().trim());
}
function OpnJVNo_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function OpnJVNo_EditByDblClick(pID) {
    jQuery("#OpnJVNoModal").modal("show");
    OpnJVNo_FillControls(pID);
}
function OpnJVNo_FillControls(pID) {
    debugger;
    ClearAll("#OpnJVNoModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#hFiscal_Year_ID").val($(tr).find("td.Fiscal_Year_ID").text());

    $("#btnSave").attr("onclick", "OpnJVNo_Update(false);");
    $("#btnSaveandNew").attr("onclick", "OpnJVNo_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function OpnJVNo_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/OpnJVNo/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim().toUpperCase(), pCode: $("#txtCode").val().trim().toUpperCase(), pFiscal_Year_ID: $("#hFiscal_Year_ID").val().trim().toUpperCase() }, pSaveandAddNew, "OpnJVNoModal", function () { OpnJVNo_LoadingWithPaging(); OpnJVNo_ClearAllControls(); });
}
function OpnJVNo_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblOpnJVNo', 'Delete') != "")
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
            DeleteListFunction("/api/OpnJVNo/Delete", { "pOpnJVNoIDs": GetAllSelectedIDsAsString('tblOpnJVNo', 'Delete') }, function () {
                OpnJVNo_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function OpnJVNo_ClearAllControls(callback) {
    ClearAll("#OpnJVNoModal");

    $("#btnSave").attr("onclick", "OpnJVNo_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "OpnJVNo_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
