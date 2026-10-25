// region PaymentTerms ---------------------------------------------------------------
// Bind PaymentTerms Table Rows
function PaymentTerms_BindTableRows(pPaymentTerms) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblPaymentTerms");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPaymentTerms, function (i, item) {
        AppendRowtoTable("tblPaymentTerms",
        ("<tr ID='" + item.ID + "' " + (item.Code.toUpperCase() == "CASH" ? " disabled=disabled " : " ondblclick='PaymentTerms_EditByDblClick(" + item.ID + ");'") + ">"
                    + "<td class='ID'> <input " + (item.Code.toUpperCase() == "CASH" ? " disabled=disabled " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='Days'>" + item.Days + "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Description'>" + item.Description + "</td>"
                    //+ "<td class='IsAddedManually'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddedManually == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='hide'><a href='#PaymentTermModal' data-toggle='modal' onclick='PaymentTerms_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblPaymentTerms", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPaymentTerms>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PaymentTerms_EditByDblClick(pID) {
    jQuery("#PaymentTermModal").modal("show");
    PaymentTerms_FillControls(pID);
}
// Loading with data
function PaymentTerms_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PaymentTerms/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PaymentTerms_BindTableRows(pTabelRows); PaymentTerms_ClearAllControls(); });
    HighlightText("#tblPaymentTerms>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function PaymentTerms_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/PaymentTerms/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        PaymentTerms_BindTableRows(pTabelRows); PaymentTerms_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblPaymentTerms>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new PaymentTerm item.
function PaymentTerms_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/PaymentTerms/Insert", { pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pDays: $("#txtDays").val().trim(), pDescription: $("#txtDescription").val()/*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "PaymentTermModal", function () { PaymentTerms_LoadingWithPaging(); });
}

//calling this function for update
function PaymentTerms_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/PaymentTerms/Update"
        , { pID: $("#hID").val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pDays: $("#txtDays").val().trim(), pDescription: $("#txtDescription").val()/*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsInactive: $("#cbIsInactive").prop('checked') }, pSaveandAddNew, "PaymentTermModal"
        , function () { PaymentTerms_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function PaymentTerms_UnlockRecord() {
    UnlockFunction("/api/PaymentTerms/UnlockRecord",
        { pID: $("#hID").val() },
        "PaymentTermModal",
        function () { PaymentTerms_LoadingWithPaging(); }); //the callback function
}

function PaymentTerms_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentTerms') != "")
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
            DeleteListFunction("/api/PaymentTerms/Delete", { "pPaymentTermsIDs": GetAllSelectedIDsAsString('tblPaymentTerms') }, function () { PaymentTerms_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/PaymentTerms/Delete", { "pPaymentTermsIDs": GetAllSelectedIDsAsString('tblPaymentTerms') }, function () { PaymentTerms_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function PaymentTerms_FillControls(pID) {
    PaymentTerms_ClearAllControls(function () {
        //next line is to check if row is locked by another user
        //Check("/api/PaymentTerms/CheckRow", { 'pID': pID }, function () {
            // Fill All Modal Controls
            var tr = $("tr[ID='" + pID + "']");

            $("#hID").val(pID);
            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtDays").val($(tr).find("td.Days").text());
            $("#txtDescription").val($(tr).find("td.Description").text());

            //$("#cbIsAddedManually").prop('checked', $(tr).find('td.IsAddedManually').find('input').attr('val'));
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

            $("#btnSave").attr("onclick", "PaymentTerms_Update(false);");
            $("#btnSaveandNew").attr("onclick", "PaymentTerms_Update(true);");
        //});
    });
}

function PaymentTerms_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtDays", "txtDescription"), null, new Array("cbIsInactive", "cbIsAddedManually"));//an alternative fn is with abdelmawgood
    ClearAll("#PaymentTermModal");
    $("#btnSave").attr("onclick", "PaymentTerms_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PaymentTerms_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}
