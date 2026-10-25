function BatchStatus_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "BatchStatus_BindTableRows";
    strLoadWithPagingFunctionName = "/api/BatchStatus/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "Name";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/MasterData/BatchStatus", "div-content", function () {
        $.getScript(strServerURL + '/Scripts/Warehousing/MasterData/BatchStatus.js?' + glbVersion, function () { 
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                , function (pData) {
                    BatchStatus_BindTableRows(JSON.parse(pData[0]));
                });
            });
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        }
        , function () { BatchStatus_ClearAllControls(); }
        , function () { BatchStatus_DeleteList(); });
}
function BatchStatus_BindTableRows(pBatchStatus) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblBatchStatus");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pBatchStatus, function (i, item) {
        AppendRowtoTable("tblBatchStatus",
        ("<tr ID='" + item.ID + "' ondblclick='BatchStatus_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
            + "<td class='IsHeld'> <input type='checkbox' disabled='disabled' val='" + (item.Held == true ? "true' checked='checked'" : "'") + " /></td>" 
                    + "<td class='hide'><a href='#BatchStatusModal' data-toggle='modal' onclick='BatchStatus_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBatchStatus", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBatchStatus>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function BatchStatus_LoadingWithPaging() {
    debugger;
    var pWhereClause = BatchStatus_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { BatchStatus_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblBatchStatus>tbody>tr", $("#txt-Search").val().trim());
}
function BatchStatus_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function BatchStatus_EditByDblClick(pID) {
    jQuery("#BatchStatusModal").modal("show");
    BatchStatus_FillControls(pID);
}
function BatchStatus_ClearAllControls(callback) {
    ClearAll("#BatchStatusModal");

    $("#btnSave").attr("onclick", "BatchStatus_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "BatchStatus_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function BatchStatus_FillControls(pID) {
    debugger;
    ClearAll("#BatchStatusModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#cbIsHeld").prop('checked', ($(tr).find("td.IsHeld").find('input').prop('checked')));
    $("#btnSave").attr("onclick", "BatchStatus_Update(false);");
    $("#btnSaveandNew").attr("onclick", "BatchStatus_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function BatchStatus_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/BatchStatus/Insert"
        , {
          /*  pCBM: $("#txtcbm").val().trim() == "" ? 0 : $("#txtcbm").val().trim().toUpperCase()*/
            pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
            , pHeld: $("#cbIsHeld").prop('checked')
           
        }, pSaveandAddNew, "BatchStatusModal", function () { BatchStatus_LoadingWithPaging(); BatchStatus_ClearAllControls(); });
}
function BatchStatus_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/BatchStatus/Update"
        , {
            pID: $("#hID").val()
            , pHeld: $("#cbIsHeld").prop('checked')
            , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
          
        }, pSaveandAddNew, "BatchStatusModal", function () { BatchStatus_LoadingWithPaging(); BatchStatus_ClearAllControls(); });
}
function BatchStatus_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBatchStatus', 'Delete') != "")
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
            DeleteListFunction("/api/BatchStatus/Delete", { "pBatchStatusIDs": GetAllSelectedIDsAsString('tblBatchStatus', 'Delete') }, function () {
                BatchStatus_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
