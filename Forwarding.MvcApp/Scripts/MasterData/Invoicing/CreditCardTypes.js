// region CreditCardTypes ---------------------------------------------------------------
// Bind CreditCardTypes Table Rows
function CreditCardTypes_BindTableRows(pCreditCardTypes) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCreditCardTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCreditCardTypes, function (i, item) {
        AppendRowtoTable("tblCreditCardTypes",
        ("<tr ID='" + item.ID + "' ondblclick='CreditCardTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Description'>" + item.Description + "</td>"
                    + "<td class='hide'><a href='#CreditCardTypeModal' data-toggle='modal' onclick='CreditCardTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCreditCardTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCreditCardTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CreditCardTypes_EditByDblClick(pID) {
    jQuery("#CreditCardTypeModal").modal("show");
    CreditCardTypes_FillControls(pID);
}
// Loading with data
function CreditCardTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CreditCardTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CreditCardTypes_BindTableRows(pTabelRows); CreditCardTypes_ClearAllControls(); });
    HighlightText("#tblCreditCardTypes>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function CreditCardTypes_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/CreditCardTypes/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        CreditCardTypes_BindTableRows(pTabelRows); CreditCardTypes_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCreditCardTypes>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new CreditCardType item.
function CreditCardTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CreditCardTypes/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pDescription: $("#txtDescription").val().trim(), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "CreditCardTypeModal", function () { CreditCardTypes_LoadingWithPaging(); });
}

//calling this function for update
function CreditCardTypes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/CreditCardTypes/Update", { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pDescription: $("#txtDescription").val().trim(), pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "CreditCardTypeModal", function () { CreditCardTypes_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function CreditCardTypes_UnlockRecord() {
    UnlockFunction("/api/CreditCardTypes/UnlockRecord",
        { pID: $("#hID").val() },
        "CreditCardTypeModal",
        function () { CreditCardTypes_LoadingWithPaging(); }); //the callback function
}
//function CreditCardTypes_Delete(pID) {
//    DeleteListFunction("/api/CreditCardTypes/DeleteByID", { "pID": pID }, function () { CreditCardTypes_LoadingWithPaging(); });
//}

function CreditCardTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCreditCardTypes') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            DeleteListFunction("/api/CreditCardTypes/Delete", { "pCreditCardTypesIDs": GetAllSelectedIDsAsString('tblCreditCardTypes') }, function () { CreditCardTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CreditCardTypes/Delete", { "pCreditCardTypesIDs": GetAllSelectedIDsAsString('tblCreditCardTypes') }, function () { CreditCardTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function CreditCardTypes_FillControls(pID) {
    CreditCardTypes_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/CreditCardTypes/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);

            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").html());
            $("#txtName").val($(tr).find("td.Name").html());
            $("#txtLocalName").val($(tr).find("td.LocalName").html());
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
            $("#txtDescription").val($(tr).find("td.Description").html());

            $("#btnSave").attr("onclick", "CreditCardTypes_Update(false);");
            $("#btnSaveandNew").attr("onclick", "CreditCardTypes_Update(true);");
        //});
    });
}

function CreditCardTypes_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtDescription"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#CreditCardTypeModal");
    $("#btnSave").attr("onclick", "CreditCardTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CreditCardTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
// CreditCardTypes Region ---------------------------------------------------------------
