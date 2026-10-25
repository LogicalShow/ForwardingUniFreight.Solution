// City Country ---------------------------------------------------------------
// Bind A_AccountLink Table Rows
function A_AccountLink_BindTableRows(pA_AccountLink) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblA_AccountLink");
    $.each(pA_AccountLink, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblA_AccountLink",
            ("<tr ID='" + item.ID + "' ondblclick='A_AccountLink_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='ExpensesAccountID' val='" + item.ExpensesAccountID + "'>" + $('#hslExpensesAccountID > option[value="' + item.ExpensesAccountID + '"]').text() + "</td>"
                + "<td class='RevenueAccountID' val='" + item.RevenueAccountID + "'>" + $('#hslRevenueAccountID > option[value="' + item.RevenueAccountID + '"]').text()  + "</td>"
                + "<td class='hA_AccountLink'><a href='#A_AccountLinkModal' data-toggle='modal' onclick='A_AccountLink_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblA_AccountLink", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblA_AccountLink>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function A_AccountLink_EditByDblClick(pID) {
    jQuery("#A_AccountLinkModal").modal("show");
    A_AccountLink_FillControls(pID);
}
// Loading with data
function A_AccountLink_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/A_AccountLink/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { A_AccountLink_BindTableRows(pTabelRows); A_AccountLink_ClearAllControls(); });
    HighlightText("#tblA_AccountLink>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function A_AccountLink_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/A_AccountLink/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        A_AccountLink_BindTableRows(pTabelRows); A_AccountLink_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblA_AccountLink>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function A_AccountLink_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/A_AccountLink/Insert", { pName: $("#txtName").val().trim(), pExpensesAccountID: $("#slExpensesAccountID").val(), pRevenueAccountID: $("#slRevenueAccountID").val() }, pSaveandAddNew, "A_AccountLinkModal", function () { A_AccountLink_LoadingWithPaging(); });
}
// calling this function for update
function A_AccountLink_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/A_AccountLink/Update", { pID: $("#hID").val(), pCode: $("#txtName").val().trim(), pName: $("#txtName").val().trim(), pExpensesAccountID: $("#slExpensesAccountID").val(), pRevenueAccountID: $("#slRevenueAccountID").val() }, pSaveandAddNew, "A_AccountLinkModal", function () { A_AccountLink_LoadingWithPaging(); });
}

function A_AccountLink_Delete(pID) {
    DeleteListFunction("/api/A_AccountLink/DeleteByID", { "pID": pID }, function () { A_AccountLink_LoadingWithPaging(); });
}

function A_AccountLinkDeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblA_AccountLink') != "")
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
                DeleteListFunction("/api/A_AccountLink/Delete", { "pA_AccountLinkIDs": GetAllSelectedIDsAsString('tblA_AccountLink') }, function () { A_AccountLink_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/A_AccountLink/Delete", { "pA_AccountLinkIDs": GetAllSelectedIDsAsString('tblA_AccountLink') }, function () { A_AccountLink_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function A_AccountLink_FillControls(pID) {
    debugger;

    ClearAll("#A_AccountLinkModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtName").val($(tr).find("td.Name").attr('val'));
    $("#slExpensesAccountID").val($(tr).find("td.ExpensesAccountID").attr('val'));
    $("#slRevenueAccountID").val($(tr).find("td.RevenueAccountID").attr('val'));

    $("#btnSave").attr("onclick", "A_AccountLink_Update(false);");
    $("#btnSaveandNew").attr("onclick", "A_AccountLink_Update(true);");
}

function A_AccountLink_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#A_AccountLinkModal", null);
    $("#btnSave").attr("onclick", "A_AccountLink_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "A_AccountLink_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
