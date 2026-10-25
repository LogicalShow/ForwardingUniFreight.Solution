function SystemOptions_BindTableRows(pJVTypes) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJVTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVTypes, function (i, item) {
        AppendRowtoTable("tblJVTypes",
        ("<tr OptionID='" + item.OptionID + "' ondblclick='SystemOptions_EditByDblClick(" + item.OptionID + ");'>"
                    + "<td class='OptionID hide'> <input name='Delete' type='checkbox' value='" + item.OptionID + "' /></td>"
                    + "<td class='OptionArName'>" + item.OptionArName + "</td>"
                    + "<td class='OptionEnName'>" + item.OptionEnName + "</td>"
                    + "<td class='Description hide'>" + item.Description + "</td>"
                    + "<td class='CatID hide'>" + item.CatID + "</td>"
                    + "<td class='ReadOnly hide'>" + item.ReadOnly + "</td>"

                   // + "<td class hide='ReadOnly'> <input type='checkbox' disabled='disabled' val='" + (item.ReadOnly == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='OptionValue'> <input type='checkbox' disabled='disabled' val='" + (item.OptionValue == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#JVTypesModal' data-toggle='modal' onclick='SystemOptions_FillControls(" + item.OptionID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJVTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SystemOptions_LoadingWithPaging() {
    debugger;
    var pWhereClause = SystemOptions_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "OptionArName";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { SystemOptions_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblJVTypes>tbody>tr", $("#txt-Search").val().trim());
}
function SystemOptions_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE OptionArName LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function SystemOptions_EditByDblClick(pID) {
    jQuery("#JVTypesModal").modal("show");
    SystemOptions_FillControls(pID);
}
function SystemOptions_ClearAllControls(callback) {
    ClearAll("#JVTypesModal");

    $("#btnSave").attr("onclick", "JVTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
var OptionEnName = "";
var ReadOnly = false;
var Description = "";
var CatID = 0;
function SystemOptions_FillControls(pID) {
    debugger;
    ClearAll("#JVTypesModal", null);
    var tr = $("tr[OptionID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.OptionArName").text());
    OptionEnName = $(tr).find("td.OptionEnName").text();
    ReadOnly = $(tr).find("td.ReadOnly").text();
    Description = $(tr).find("td.Description").text();
    CatID = $(tr).find("td.CatID").text();
    $("#cbisOptionValue").prop('checked', $(tr).find('td.OptionValue').find('input').attr('val'));
    $("#txtName").attr("disabled", "disabled");

    $("#btnSave").attr("onclick", "JVTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "JVTypes_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JVTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SystemOptions/Insert", { pOptionValue: $("#cbisOptionValue").prop('checked') }, pSaveandAddNew, "JVTypesModal", function () { SystemOptions_LoadingWithPaging(); SystemOptions_ClearAllControls(); });
}
function JVTypes_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SystemOptions/Update", { pID: $("#hID").val(), pOptionValue: $("#cbisOptionValue").prop('checked'), pName: $("#txtName").val().trim().toUpperCase(), pOptionEnName: OptionEnName, pReadOnly: ReadOnly, pDescription: Description, pCatID: CatID }, pSaveandAddNew, "JVTypesModal", function () { SystemOptions_LoadingWithPaging(); SystemOptions_ClearAllControls(); });
}
function JVTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblJVTypes', 'Delete') != "")
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
            DeleteListFunction("/api/JVTypes/Delete", { "pJVTypesIDs": GetAllSelectedIDsAsString('tblJVTypes', 'Delete') }, function () {
                SystemOptions_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
