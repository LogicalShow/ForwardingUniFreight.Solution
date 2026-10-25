function JVDefaults_BindTableRows(pJVDefaults) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJVDefaults");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJVDefaults, function (i, item) {
        AppendRowtoTable("tblJVDefaults",
        ("<tr ID='" + item.ID + "' ondblclick='JVDefaults_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                       + "<td class='TransTypeName'>" + item.TransTypeName + "</td>"
                        + "<td class='JournalType'>" + item.JournalTypeName + "</td>"
                         + "<td class='JVType'>" + item.JVTypeName + "</td>"
                          + "<td class='JVTypeID hide'>" + item.JVTypeID + "</td>"
                          + "<td  class='JournalTypeID hide'>" + item.JournalTypeID + "</td>"
                    + "<td class='hide'><a href='#JVDefaultsModal' data-toggle='modal' onclick='JVDefaults_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJVDefaults", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblJVDefaults>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function JVDefaults_LoadingWithPaging() {
    debugger;
    var pWhereClause = JVDefaults_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { JVDefaults_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblJVDefaults>tbody>tr", $("#txt-Search").val().trim());
}
function JVDefaults_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " TransTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR JVTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR JournalTypeName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function JVDefaults_EditByDblClick(pID) {
    jQuery("#JVDefaultsModal").modal("show");
    JVDefaults_FillControls(pID);
}
function JVDefaults_FillControls(pID) {
    debugger;
    ClearAll("#JVDefaultsModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.TransTypeName").text() + "</span>");
    $("#txtTransTypeName").val($(tr).find("td.TransTypeName").text());
    $("#slJournalType").val($(tr).find("td.JournalTypeID").text());
    $("#slJVType").val($(tr).find("td.JVTypeID").text());

    $("#btnSave").attr("onclick", "JVDefaults_Update(false);");
    $("#btnSaveandNew").attr("onclick", "JVDefaults_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function JVDefaults_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/JVDefaults/Update", { pID: $("#hID").val(), pTransTypeName: $("#txtTransTypeName").val().trim().toUpperCase(), pJournalTypeID: $("#slJournalType").val(), pJVTypeID: $("#slJVType").val() }, pSaveandAddNew, "JVDefaultsModal", function ()
    { JVDefaults_LoadingWithPaging(); JVDefaults_ClearAllControls(); });
}
function JVDefaults_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblJVDefaults', 'Delete') != "")
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
            DeleteListFunction("/api/JVDefaults/Delete", { "pJVDefaultsIDs": GetAllSelectedIDsAsString('tblJVDefaults', 'Delete') }, function () {
                JVDefaults_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
function JVDefaults_ClearAllControls(callback) {
    ClearAll("#JVDefaultsModal");

    $("#btnSave").attr("onclick", "Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}

//to fill the select box
function JournalTypes_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/JournalTypes/LoadAll", "Select Journal Type", "slJournalType");
}

//to fill the select box
function JVTypes_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/JVTypes/LoadAll", "Select JV Type", "slJVType");
}

