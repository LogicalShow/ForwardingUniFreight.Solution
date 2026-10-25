function FreightGroup_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "FreightGroup_BindTableRows";
    strLoadWithPagingFunctionName = "/api/FreightGroup/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/MasterData/Invoicing/FreightGroup", "div-content", function () {
        if (glbCallingControl == "FreightGroup") {
            $("#liGroupName").text("Master Data");
            $("#liGroupName").attr("onclick", "LoadViews('Invoicing')");
            $("#liTabName").text("Invoicing");
            $("#liTabName").attr("onclick", "LoadViews('Invoicing')");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                FreightGroup_BindTableRows(JSON.parse(pData[0]));
                //ApplySelectListSearch(); 
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { FreightGroup_ClearAllControls(); }
    , function () { FreightGroup_DeleteList(); });
}
function FreightGroup_BindTableRows(pFreightGroup) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblFreightGroup");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pFreightGroup, function (i, item) {
        AppendRowtoTable("tblFreightGroup",
        ("<tr ID='" + item.ID + "' ondblclick='FreightGroup_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFreightGroup", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFreightGroup>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function FreightGroup_LoadingWithPaging() {
    debugger;
    var pWhereClause = FreightGroup_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { FreightGroup_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblFreightGroup>tbody>tr", $("#txt-Search").val().trim());
}
function FreightGroup_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function FreightGroup_EditByDblClick(pID) {
    jQuery("#FreightGroupModal").modal("show");
    FreightGroup_FillControls(pID);
}
function FreightGroup_ClearAllControls(callback) {
    ClearAll("#FreightGroupModal");

    $("#btnSave").attr("onclick", "FreightGroup_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FreightGroup_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function FreightGroup_FillControls(pID) {
    debugger;
    ClearAll("#FreightGroupModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    
    $("#btnSave").attr("onclick", "FreightGroup_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FreightGroup_Update(true);");
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function FreightGroup_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/FreightGroup/Insert"
        , {
            pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
        }, pSaveandAddNew, "FreightGroupModal", function () { FreightGroup_LoadingWithPaging(); FreightGroup_ClearAllControls(); });
}
function FreightGroup_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/FreightGroup/Update"
        , {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
          }, pSaveandAddNew, "FreightGroupModal", function () { FreightGroup_LoadingWithPaging(); FreightGroup_ClearAllControls(); });
}
function FreightGroup_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFreightGroup', 'Delete') != "")
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
            DeleteListFunction("/api/FreightGroup/Delete", { "pFreightGroupIDs": GetAllSelectedIDsAsString('tblFreightGroup', 'Delete') }, function () {
                FreightGroup_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
