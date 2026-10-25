function MainWarehouse_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "MainWarehouse_BindTableRows";
    strLoadWithPagingFunctionName = "/api/MainWarehouse/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/MainWarehouse", "div-content", function () {
        $.getScript(strServerURL + '/Scripts/Warehousing/MasterData/MainWarehouse.js?' + glbVersion, function () {
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    MainWarehouse_BindTableRows(JSON.parse(pData[0]));
                });
            });
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        }
        , function () { MainWarehouse_ClearAllControls(); }
        , function () { MainWarehouse_DeleteList(); });
}
function MainWarehouse_BindTableRows(pMainWarehouse) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblMainWarehouse");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pMainWarehouse, function (i, item) {
        AppendRowtoTable("tblMainWarehouse",
        ("<tr ID='" + item.ID + "' ondblclick='MainWarehouse_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Address hide'>" + (item.Address == 0 ? "" : item.Address) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#MainWarehouseModal' data-toggle='modal' onclick='MainWarehouse_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblMainWarehouse", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblMainWarehouse>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function MainWarehouse_LoadingWithPaging() {
    debugger;
    var pWhereClause = MainWarehouse_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { MainWarehouse_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblMainWarehouse>tbody>tr", $("#txt-Search").val().trim());
}
function MainWarehouse_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function MainWarehouse_EditByDblClick(pID) {
    jQuery("#MainWarehouseModal").modal("show");
    MainWarehouse_FillControls(pID);
}
function MainWarehouse_ClearAllControls(callback) {
    ClearAll("#MainWarehouseModal");

    $("#btnSave").attr("onclick", "MainWarehouse_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "MainWarehouse_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function MainWarehouse_FillControls(pID) {
    debugger;
    ClearAll("#MainWarehouseModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#btnSave").attr("onclick", "MainWarehouse_Update(false);");
    $("#btnSaveandNew").attr("onclick", "MainWarehouse_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function MainWarehouse_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/MainWarehouse/Insert"
        , {
            pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pAddress: $("#txtAddress").val().trim() == "" ? 0 : $("#txtAddress").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
        }, pSaveandAddNew, "MainWarehouseModal", function () { MainWarehouse_LoadingWithPaging(); MainWarehouse_ClearAllControls(); });
}
function MainWarehouse_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/MainWarehouse/Update"
        , {
            pID: $("#hID").val()
            , pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pAddress: $("#txtAddress").val().trim() == "" ? 0 : $("#txtAddress").val().trim().toUpperCase()
            , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
        }, pSaveandAddNew, "MainWarehouseModal", function () { MainWarehouse_LoadingWithPaging(); MainWarehouse_ClearAllControls(); });
}
function MainWarehouse_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblMainWarehouse', 'Delete') != "")
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
            DeleteListFunction("/api/MainWarehouse/Delete", { "pMainWarehouseIDs": GetAllSelectedIDsAsString('tblMainWarehouse', 'Delete') }, function () {
                MainWarehouse_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
