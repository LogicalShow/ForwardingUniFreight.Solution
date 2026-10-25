function WarehouseNotes_BindTableRows(pWarehouseNotes) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWarehouseNotes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pWarehouseNotes, function (i, item) {
        AppendRowtoTable("tblWarehouseNotes",
        ("<tr ID='" + item.ID + "' ondblclick='WarehouseNotes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='IsForReleaseOrder'> <input type='checkbox' disabled='disabled' val='" + (item.IsForReleaseOrder == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsForStoring'> <input type='checkbox' disabled='disabled' val='" + (item.IsForStoring == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#WarehouseNotesModal' data-toggle='modal' onclick='WarehouseNotes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWarehouseNotes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWarehouseNotes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WarehouseNotes_LoadingWithPaging() {
    debugger;
    var pWhereClause = WarehouseNotes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WarehouseNotes_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWarehouseNotes>tbody>tr", $("#txt-Search").val().trim());
}
function WarehouseNotes_GetWhereClause() {
    return ($("#txt-Search").val().trim() == "" ? "WHERE 1=1" : ("WHERE Code LIKE N'%" + $("#txt-Search").val().trim() + "%' OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'"));
}
function WarehouseNotes_EditByDblClick(pID) {
    jQuery("#WarehouseNotesModal").modal("show");
    WarehouseNotes_FillControls(pID);
}
function WarehouseNotes_ClearAllControls(callback) {
    debugger;
    ClearAll("#WarehouseNotesModal");

    $("#btnSave").attr("onclick", "WarehouseNotes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "WarehouseNotes_Insert(true);");


    if (callback != null && callback != undefined)
        callback();
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
}
function WarehouseNotes_FillControls(pID) {
    debugger;
    ClearAll("#WarehouseNotesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html("<span> : </span><span>" + $(tr).find("td.Name").text() + "</span>");
    $("#txtName").val($(tr).find("td.Name").text());
    
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#cbIsForReleaseOrder").prop('checked', $(tr).find('td.IsForReleaseOrder').find('input').attr('val'));
    $("#cbIsForStoring").prop('checked', $(tr).find('td.IsForStoring').find('input').attr('val'));


    $("#btnSave").attr("onclick", "WarehouseNotes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "WarehouseNotes_Update(true);");
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $("#lblShown").reverseChildren();
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}
function WarehouseNotes_Insert(pSaveandAddNew) {
    debugger;
    if (ValidateWarehouseNotes()) {
        InsertUpdateFunction("form", "/api/WarehouseNotes/Insert"
            , {
                pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
                , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                , pIsForReleaseOrder: $("#cbIsForReleaseOrder").prop('checked')
                , pIsForStoring: $("#cbIsForStoring").prop('checked')
            }, pSaveandAddNew, "WarehouseNotesModal", function () { WarehouseNotes_LoadingWithPaging(); WarehouseNotes_ClearAllControls(); });
    }
}
function WarehouseNotes_Update(pSaveandAddNew) {
    if (ValidateWarehouseNotes()) {
        InsertUpdateFunction("form", "/api/WarehouseNotes/Update"
            , {
                pID: $("#hID").val()
                , pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase()
                , pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()
                , pIsForReleaseOrder: $("#cbIsForReleaseOrder").prop('checked')
                , pIsForStoring: $("#cbIsForStoring").prop('checked')
            }, pSaveandAddNew, "WarehouseNotesModal", function () { WarehouseNotes_LoadingWithPaging(); WarehouseNotes_ClearAllControls(); });
    }
}
function WarehouseNotes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWarehouseNotes', 'Delete') != "")
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
            DeleteListFunction("/api/WarehouseNotes/Delete", { "pNotesIDs": GetAllSelectedIDsAsString('tblWarehouseNotes', 'Delete') }, function () {
                WarehouseNotes_LoadingWithPaging();
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

function ValidateWarehouseNotes() {
    // //
    var submit = true;
    var strMissingFields = "";
    var fieldCount = 0;

    if ($("#txtName").val() == '' && $("#txtName").attr('data-required') == "true") {
        $('.div-error').slideDown(); $("#txtName").addClass('validation-error');
        submit = false;
        strMissingFields += ++fieldCount + " - Basic Data --> Name.\n";
    }
    if ($("#txtNotes").val() == '' && $("#txtNotes").attr('data-required') == "true") {
        $('.div-error').slideDown(); $("#txtNotes").addClass('validation-error');
        submit = false;
        strMissingFields += ++fieldCount + " - Basic Data --> Notes.\n";
    }
    if ($("#cbIsForReleaseOrder").prop('checked') == false && $("#cbIsForStoring").prop('checked') == false) {
        submit = false;
        strMissingFields += ++fieldCount + " - Basic Data --> Notes Type.\n";
    }
    if (submit == false) {
        swal("You are missing:", strMissingFields);
    }
    
    return submit;
}
