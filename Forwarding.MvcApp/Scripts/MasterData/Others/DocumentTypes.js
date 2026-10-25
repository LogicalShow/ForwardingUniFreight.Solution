// DocumentTypes Region ---------------------------------------------------------------
// Bind DocumentTypes Table Rows
function DocumentTypes_BindTableRows(pDocumentTypes) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblDocumentTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pDocumentTypes, function (i, item) {
        AppendRowtoTable("tblDocumentTypes",
        ("<tr ID='" + item.ID + "' ondblclick='DocumentTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name hide'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='ISOCode'>" + (item.ISOCode == 0 ? "" : item.ISOCode) + "</td>"
                    + "<td class='TableOrViewName hide'>" + (item.TableOrViewName == 0 ? "" : item.TableOrViewName) + "</td>"
                    + "<td class='IsImport'> <input type='checkbox' disabled='disabled' val='" + (item.IsImport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsExport'> <input type='checkbox' disabled='disabled' val='" + (item.IsExport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDomestic'> <input type='checkbox' disabled='disabled' val='" + (item.IsDomestic == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOcean'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDocIn hide'> <input type='checkbox' disabled='disabled' val='" +  (item.IsDocIn == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDocOut'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocOut == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsPrintISOCode'> <input type='checkbox' disabled='disabled' val='" + (item.PrintISOCode == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#DocumentTypeModal' data-toggle='modal' onclick='DocumentTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblDocumentTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblDocumentTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    } $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function DocumentTypes_EditByDblClick(pID) {
    jQuery("#DocumentTypeModal").modal("show");
    DocumentTypes_FillControls(pID);
}
// Loading with data
function DocumentTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/DocumentTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { DocumentTypes_BindTableRows(pTabelRows); DocumentTypes_ClearAllControls(); });
    HighlightText("#tblDocumentTypes>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
////sherif: Loading with data and search key
//function DocumentTypes_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/DocumentTypes/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        DocumentTypes_BindTableRows(pTabelRows); DocumentTypes_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblDocumentTypes>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new DocumentType item.
function DocumentTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/DocumentTypes/Insert", { pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pISOCode: $("#txtISOCode").val().trim(), pTableOrViewName: $("#txtTableOrViewName").val().trim(), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsImport: $("#cbIsImport").prop('checked'), pIsExport: $("#cbIsExport").prop('checked'), pIsDomestic: $("#cbIsDomestic").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsDocIn: $("#cbIsDocIn").prop('checked'), pIsDocOut: $("#cbIsDocOut").prop('checked'), pIsPrintISOCode: $("#cbIsPrintISOCode").prop('checked') }, pSaveandAddNew, "DocumentTypeModal", function () { DocumentTypes_LoadingWithPaging(); });
}

//calling this function for update
function DocumentTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/DocumentTypes/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pISOCode: $("#txtISOCode").val().trim(), pTableOrViewName: $("#txtTableOrViewName").val().trim(), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pIsImport: $("#cbIsImport").prop('checked'), pIsExport: $("#cbIsExport").prop('checked'), pIsDomestic: $("#cbIsDomestic").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsDocIn: $("#cbIsDocIn").prop('checked'), pIsDocOut: $("#cbIsDocOut").prop('checked'), pIsPrintISOCode: $("#cbIsPrintISOCode").prop('checked') }, pSaveandAddNew, "DocumentTypeModal", function () { DocumentTypes_LoadingWithPaging(); });
}

////sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
//function DocumentTypes_UnlockRecord() {
//    UnlockFunction("/api/DocumentTypes/UnlockRecord",
//        { pID: $("#hID").val() },
//        "DocumentTypeModal",
//        function () { DocumentTypes_LoadingWithPaging(); }); //the callback function
//}

function DocumentTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblDocumentTypes') != "")
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
            DeleteListFunction("/api/DocumentTypes/Delete", { "pDocumentTypesIDs": GetAllSelectedIDsAsString('tblDocumentTypes') }, function () {
                DocumentTypes_LoadingWithPaging(
                    //this is callback in DocumentTypes_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}

//after pressing edit, this function fills the data
function DocumentTypes_FillControls(pID) {
    DocumentTypes_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/DocumentTypes/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");
            debugger;
            $("#hID").val(pID);
        //$("#lblShown").html(": " + $(tr).find("td.Name").text());
            $("#lblShown").html(": " + $(tr).find("td.LocalName").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtISOCode").val($(tr).find("td.ISOCode").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtTableOrViewName").val($(tr).find("td.TableOrViewName").text());
            $("#txtNotes").val($(tr).find("td.Notes").text());
            $("#cbIsImport").prop('checked', $(tr).find('td.IsImport').find('input').attr('val'));
            $("#cbIsExport").prop('checked', $(tr).find('td.IsExport').find('input').attr('val'));
            $("#cbIsDomestic").prop('checked', $(tr).find('td.IsDomestic').find('input').attr('val'));
            $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
            $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
            $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));
            $("#cbIsDocIn").prop('checked', $(tr).find('td.IsDocIn').find('input').attr('val'));
            $("#cbIsDocOut").prop('checked', $(tr).find('td.IsDocOut').find('input').attr('val'));
            $("#cbIsPrintISOCode").prop('checked', $(tr).find('td.IsPrintISOCode').find('input').attr('val'));

            $("#btnSave").attr("onclick", "DocumentTypes_Update(false);");
            $("#btnSaveandNew").attr("onclick", "DocumentTypes_Update(true);");
        //});
    });
}

function DocumentTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtNotes", "txtCallSign"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#DocumentTypeModal");
    
    $("#btnSave").attr("onclick", "DocumentTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "DocumentTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
//EOF Region DocumentType ---------------------------------------------------------------
