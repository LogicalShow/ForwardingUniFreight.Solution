// region CreditCardTypes ---------------------------------------------------------------
// Bind CreditCardTypes Table Rows
function CustomerCreditLimit_BindTableRows(pCustomerCreditLimit) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCustomerCreditLimit");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomerCreditLimit, function (i, item) {
        AppendRowtoTable("tblCustomerCreditLimit",
        ("<tr ID='" + item.ID + "' ondblclick='CustomerCreditLimit_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='CreditLimit'>" + item.CreditLimit + "</td>"
                    + "<td class='hide'><a href='#CustomerCreditLimitModal' data-toggle='modal' onclick='CustomerCreditLimit_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomerCreditLimit", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustomerCreditLimit>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CustomerCreditLimit_EditByDblClick(pID) {
    debugger;
    jQuery("#CustomerCreditLimitModal").modal("show");
    CustomerCreditLimit_FillControls(pID);
}
// Loading with data
function CustomerCreditLimit_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CustomerCreditLimit/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CustomerCreditLimit_BindTableRows(pTabelRows); CustomerCreditLimit_ClearAllControls(); });
    HighlightText("#tblCustomerCreditLimit>tbody>tr", $("#txt-Search").val().trim());
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
function CustomerCreditLimit_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CustomerCreditLimit/Insert", { pCreditLimit: $("#txtCreditLimit").val().trim() }, pSaveandAddNew, "CustomerCreditLimitModal", function () { CustomerCreditLimit_LoadingWithPaging(); });
}

//calling this function for update
function CustomerCreditLimit_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/CustomerCreditLimit/Update", { pID: $("#hID").val(), pCreditLimit: $("#txtCreditLimit").val().trim() }, pSaveandAddNew, "CustomerCreditLimitModal", function () { CustomerCreditLimit_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function CustomerCreditLimit_UnlockRecord() {
    UnlockFunction("/api/CustomerCreditLimit/UnlockRecord",
        { pID: $("#hID").val() },
        "CreditCardTypeModal",
        function () { CustomerCreditLimit_LoadingWithPaging(); }); //the callback function
}
//function CreditCardTypes_Delete(pID) {
//    DeleteListFunction("/api/CreditCardTypes/DeleteByID", { "pID": pID }, function () { CreditCardTypes_LoadingWithPaging(); });
//}

function CustomerCreditLimit_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustomerCreditLimit') != "")
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
            DeleteListFunction("/api/CustomerCreditLimit/Delete", { "pCustomerCreditLimitIDs": GetAllSelectedIDsAsString('tblCustomerCreditLimit') }, function () { CustomerCreditLimit_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/CreditCardTypes/Delete", { "pCreditCardTypesIDs": GetAllSelectedIDsAsString('tblCreditCardTypes') }, function () { CreditCardTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function CustomerCreditLimit_FillControls(pID) {
    CustomerCreditLimit_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/CreditCardTypes/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);

            $("#lblShown").html(": " + $(tr).find("td.CreditLimit").text());
            $("#txtCreditLimit").val($(tr).find("td.CreditLimit").html());
         
            $("#btnSave").attr("onclick", "CustomerCreditLimit_Update(false);");
            $("#btnSaveandNew").attr("onclick", "CustomerCreditLimit_Update(true);");
        //});
    });
}

function CustomerCreditLimit_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtDescription"), null, new Array("cbIsInactive"));//an alternative fn is with abdelmawgood
    ClearAll("#CustomerCreditLimitModal");
    $("#btnSave").attr("onclick", "CustomerCreditLimit_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "CustomerCreditLimit_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
// CreditCardTypes Region ---------------------------------------------------------------
