function ChargeTypeGroup_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "ChargeTypeGroup_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ChargeTypeGroup/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/MasterData/Invoicing/ChargeTypeGroup", "div-content", function () {
        if (glbCallingControl == "ChargeTypeGroup") {
            $("#liGroupName").text("Master Data");
            $("#liGroupName").attr("onclick", "LoadViews('Invoicing')");
            $("#liTabName").text("Invoicing");
            $("#liTabName").attr("onclick", "LoadViews('Invoicing')");
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                ChargeTypeGroup_BindTableRows(JSON.parse(pData[0]));
                //ApplySelectListSearch();
            }); 
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
    , function () { ChargeTypeGroup_ClearAllControls(); }
    , function () { ChargeTypeGroup_DeleteList(); });
}
function ChargeTypeGroup_BindTableRows(pChargeTypeGroup) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblChargeTypeGroup");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pChargeTypeGroup, function (i, item) {
        AppendRowtoTable("tblChargeTypeGroup",
        ("<tr ID='" + item.ID + "' ondblclick='ChargeTypeGroup_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code hide'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#ChargeTypeGroupModal' data-toggle='modal' onclick='ChargeTypeGroup_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblChargeTypeGroup", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblChargeTypeGroup>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ChargeTypeGroup_LoadingWithPaging() {
    debugger;
    var pWhereClause = ChargeTypeGroup_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ChargeTypeGroup_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblChargeTypeGroup>tbody>tr", $("#txt-Search").val().trim());
}
function ChargeTypeGroup_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function ChargeTypeGroup_EditByDblClick(pID) {
    jQuery("#ChargeTypeGroupModal").modal("show");
    ChargeTypeGroup_FillControls(pID);
}
function ChargeTypeGroup_ClearAllControls(callback) {
    ClearAll("#ChargeTypeGroupModal");

    $("#btnSave").attr("onclick", "ChargeTypeGroup_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ChargeTypeGroup_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function ChargeTypeGroup_FillControls(pID) {
    debugger;
    ClearAll("#ChargeTypeGroupModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    
    $("#btnSave").attr("onclick", "ChargeTypeGroup_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ChargeTypeGroup_Update(true);");
    //ApplySelectListSearch_OnlyChange();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function ChargeTypeGroup_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/ChargeTypeGroup/Insert"
        , {
            pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
        }, pSaveandAddNew, "ChargeTypeGroupModal", function () { ChargeTypeGroup_LoadingWithPaging(); ChargeTypeGroup_ClearAllControls(); });
}
function ChargeTypeGroup_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/ChargeTypeGroup/Update"
        , {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
          }, pSaveandAddNew, "ChargeTypeGroupModal", function () { ChargeTypeGroup_LoadingWithPaging(); ChargeTypeGroup_ClearAllControls(); });
}
function ChargeTypeGroup_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblChargeTypeGroup', 'Delete') != "")
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
            DeleteListFunction("/api/ChargeTypeGroup/Delete", { "pChargeTypeGroupIDs": GetAllSelectedIDsAsString('tblChargeTypeGroup', 'Delete') }, function () {
                ChargeTypeGroup_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
