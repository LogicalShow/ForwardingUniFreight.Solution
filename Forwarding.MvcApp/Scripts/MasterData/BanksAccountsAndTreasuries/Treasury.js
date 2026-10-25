function Treasury_BindTableRows(pTreasury) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTreasury");
    $.each(pTreasury, function (i, item) {
        AppendRowtoTable("tblTreasury",
        ("<tr ID='" + item.ID + "' ondblclick='Treasury_EditByDblClick(" + item.ID + ");'>"
            + "<td class='TreasuryID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
            + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
            + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
            + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

            + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
            + "<td class='Account_ID hide'>" + item.Account_ID + "</td>"
            + "<td class='SafeSubAccountID hide'>" + item.SafeSubAccountID + "</td>"
            + "<td class='InJournalTypeID hide'>" + item.InJournalTypeID + "</td>"
            + "<td class='InJournalTypeName hide'>" + (item.InJournalTypeName == 0 ? "" : item.InJournalTypeName) + "</td>"
            + "<td class='OutJournalTypeID hide'>" + item.OutJournalTypeID + "</td>"
            + "<td class='OutJournalTypeName hide'>" + (item.OutJournalTypeName == 0 ? "" : item.OutJournalTypeName) + "</td>"

            + "<td class='hide'><a href='#TreasuryModal' data-toggle='modal' onclick='Treasury_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblTreasury", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTreasury>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Treasury_EditByDblClick(pID) {
    jQuery("#TreasuryModal").modal("show");
    Treasury_FillControls(pID);
}
function Treasury_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function Treasury_LoadingWithPaging() {
    debugger;
    var pWhereClause = Treasury_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Treasury_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblTreasury>tbody>tr", $("#txt-Search").val().trim());
}
function Treasury_Insert(pSaveandAddNew) {

    var count = $("#slSafeSubAccountID option").filter(function () {
        return $(this).val() != "0";
    }).length;

    if (count > 0 && ($("#slSafeSubAccountID").val() == '' || $("#slSafeSubAccountID").val() == 0)) {
        swal(strSorry, "Choose SubAccount", "warning");
        return;
    }
    if ($("#txtCode").val().includes("-")) {

        swal(strSorry, "Treasury Code Cannot Contain Dash (-) ", "warning");
        return;

    }
    InsertUpdateFunction("form", "/api/Treasury/Insert", {
        pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(), //$("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()

        , pAccount_ID: $("#slAccount").val()
        , pDefaultCurrencyID: $("#slCurrency").val()
        , pInJournalTypeID: $("#slInJournalType").val()
        , pOutJournalTypeID: $("#slOutJournalType").val()
        , pPrintedAs: "0"
        , pBranchID: $("#slBranch").val()
        , pSafeSubAccountID: ($("#slSafeSubAccountID").val() == '' ? 0 : $("#slSafeSubAccountID").val())
        
    }, pSaveandAddNew, "TreasuryModal",function () {
        Treasury_LoadingWithPaging();
        if (pSaveandAddNew)
            Treasury_ClearAllControls();
    });
}
// calling this function for update
function Treasury_Update(pSaveandAddNew) {
    debugger;

    var count = $("#slSafeSubAccountID option").filter(function () {
        return $(this).val() != "0";
    }).length;

    if (count > 0 && ($("#slSafeSubAccountID").val() == '' || $("#slSafeSubAccountID").val() == 0)) {
        swal(strSorry, "Choose SubAccount", "warning");
        return;
    }
    if ($("#txtCode").val().includes("-")) {

        swal(strSorry, "Treasury Code Cannot Contain Dash (-) ", "warning");
        return;

    }
    InsertUpdateFunction("form", "/api/Treasury/Update", {
        pID: $("#hID").val(),
        pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(), //$("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()

        , pAccount_ID: $("#slAccount").val()
        , pDefaultCurrencyID: $("#slCurrency").val()
        , pInJournalTypeID: $("#slInJournalType").val()
        , pOutJournalTypeID: $("#slOutJournalType").val()
        , pPrintedAs: "0"
        , pBranchID: $("#slBranch").val()
        , pSafeSubAccountID:( $("#slSafeSubAccountID").val() == '' ? 0 : $("#slSafeSubAccountID").val()  )
    }, pSaveandAddNew, "TreasuryModal", function () {
        Treasury_LoadingWithPaging();
        if (pSaveandAddNew)
            Treasury_ClearAllControls();
    });
}
function Treasury_Delete(pID) {
    DeleteListFunction("/api/Treasury/DeleteByID", { "pID": pID }, function () { Treasury_LoadingWithPaging(); });
}
function Treasury_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTreasury') != "")
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
            DeleteListFunction("/api/Treasury/Delete", { "pTreasuryIDs": GetAllSelectedIDsAsString('tblTreasury') }, function () { Treasury_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function Treasury_FillControls(pID) {
    debugger;
    ClearAll("#TreasuryModal", null);

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#slAccount").val($(tr).find("td.Account_ID").text());
    $("#slCurrency").val($(tr).find("td.CurrencyID").attr("val") == 0 ? $("#hDefaultCurrencyID").val() : $(tr).find("td.CurrencyID").attr("val"));
    $("#slInJournalType").val($(tr).find("td.InJournalTypeID").text());
    $("#slOutJournalType").val($(tr).find("td.OutJournalTypeID").text());
    $("#slBranch").val($(tr).find("td.BranchID").text() == 0 ? $("#hUserBranchID").val() : $(tr).find("td.BranchID").text());

    $("#slSafeSubAccountID").css({ "width": "100%" }).select2();
    $("#slSafeSubAccountID").trigger("change");
    FillSlSubAccount('slSafeSubAccountID', 'slAccount', $(tr).find("td.SafeSubAccountID").text(), $(tr).find("td.Account_ID").text());

    $("#btnSave").attr("onclick", "Treasury_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Treasury_Update(true);");



    if (pDefaults.UnEditableCompanyName != 'ESG') {

        $("#slSafeSubAccountID").parent().addClass("hide");


    }

}
function Treasury_ClearAllControls() {
    debugger;
    ClearAll("#TreasuryModal", null);

    $("#slCurrency").val($("#hDefaultCurrencyID").val());
    $("#slBranch").val($("#hUserBranchID").val());
    
    $("#btnSave").attr("onclick", "Treasury_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Treasury_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);



    if (pDefaults.UnEditableCompanyName != 'ESG') {

        $("#slSafeSubAccountID").parent().addClass("hide");


    }


}
