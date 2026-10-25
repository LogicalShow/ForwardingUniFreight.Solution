
$(document).ready(function () {
    $("#slAccount").css({ "width": "100%" }).select2();
    $("#slBankSubAccountID").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');

});

function BankAccount_BindTableRows(pBankAccount) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblBankAccount");
    $.each(pBankAccount, function (i, item) {
        AppendRowtoTable("tblBankAccount",
        ("<tr ID='" + item.ID + "' ondblclick='BankAccount_EditByDblClick(" + item.ID + ");'>"
            + "<td class='BankAccountID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
            + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
            + "<td class='LocalName hide'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
            + "<td class='AccountName'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
            + "<td class='AccountNumber'>" + (item.AccountNumber == 0 ? "" : item.AccountNumber) + "</td>"
            + "<td class='CurrencyID' val='" + item.DefaultCurrencyID + "'>" + item.CurrencyCode + "</td>"

            + "<td class='Account_ID hide'>" + item.Account_ID + "</td>"
            + "<td class='BankSubAccountID hide'>" + item.BankSubAccountID + "</td>"
            + "<td class='NotesPayable hide'>" + item.NotesPayable + "</td>"
            + "<td class='NotesPayableName hide'>" + (item.NotesPayableName == 0 ? "" : item.NotesPayableName) + "</td>"
            + "<td class='NotesPayableUnderCollection hide'>" + item.NotesPayableUnderCollection + "</td>"
            + "<td class='NotesPayableUnderCollectionName hide'>" + (item.NotesPayableUnderCollectionName == 0 ? "" : item.NotesPayableUnderCollectionName) + "</td>"
            + "<td class='NotesReceivable hide'>" + item.NotesReceivable + "</td>"
            + "<td class='NotesReceivableName hide'>" + (item.NotesReceivableName == 0 ? "" : item.NotesReceivableName) + "</td>"
            + "<td class='NotesReceivableUnderCollection hide'>" + item.NotesReceivableUnderCollection + "</td>"
            + "<td class='NotesReceivableUnderCollectionName hide'>" + (item.NotesReceivableUnderCollectionName == 0 ? "" : item.NotesReceivableUnderCollectionName) + "</td>"
            + "<td class='CollectionExpenses hide'>" + item.CollectionExpenses + "</td>"
            + "<td class='CollectionExpensesName hide'>" + (item.CollectionExpensesName == 0 ? "" : item.CollectionExpensesName) + "</td>"
            + "<td class='InJournalTypeID hide'>" + item.InJournalTypeID + "</td>"
            + "<td class='InJournalTypeName hide'>" + (item.InJournalTypeName == 0 ? "" : item.InJournalTypeName) + "</td>"
            + "<td class='OutJournalTypeID hide'>" + item.OutJournalTypeID + "</td>"
            + "<td class='OutJournalTypeName hide'>" + (item.OutJournalTypeName == 0 ? "" : item.OutJournalTypeName) + "</td>"

            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            + "<td class='PaymentsCount hide'>" + item.PaymentsCount + "</td>"
            + "<td class='IsOnlineBank hide'><input type='checkbox' " + (item.IsOnlineBank==1 ? "checked" : "") + " /></td>"

            + "<td class='hide'><a href='#BankAccountModal' data-toggle='modal' onclick='BankAccount_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBankAccount", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBankAccount>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function BankAccount_EditByDblClick(pID) {
    jQuery("#BankAccountModal").modal("show");
    BankAccount_FillControls(pID);
}
function BankAccount_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR AccountNumber LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR AccountName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR CurrencyCode LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function BankAccount_LoadingWithPaging() {
    debugger;
    var pWhereClause = BankAccount_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Name";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { BankAccount_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblBankAccount>tbody>tr", $("#txt-Search").val().trim());
}
// calling web function to add new BankAccount item.
function BankAccount_Insert(pSaveandAddNew) {

        debugger;
    CallGETFunctionWithParameters("/api/BankAccount/CheckIsOnlineInsert", {
        pIscheck: ($("#cbOnlineBank").prop("checked") ? 1 : 0)

    },
        function (pData) {
            debugger;

            if (pData) {

                swal("Sorry", "You cannot save because this bank is marked as an Online Bank, and only one Online Bank is allowed in the system.");


            } else {
                var count = $("#slBankSubAccountID option").filter(function () {
                    return $(this).val() != "0";
                }).length;

                if (count > 0 && ($("#slBankSubAccountID").val() == '' || $("#slBankSubAccountID").val() == 0)) {
                    swal(strSorry, "Choose SubAccount", "warning");
                    return;
                }
                if ($("#txtCode").val().includes("-")) {

                    swal(strSorry, "Bank Code Cannot Contain Dash (-) ", "warning");
                    return;

                }
                InsertUpdateFunction("form", "/api/BankAccount/Insert", {
                    pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
                    pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(),
                    pLocalName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(), //$("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim().toUpperCase(),
                    pAccountName: $("#txtAccountName").val().trim() == "" ? 0 : $("#txtAccountName").val().trim().toUpperCase(),
                    pAccountNumber: $("#txtAccountNumber").val().trim() == "" ? 0 : $("#txtAccountNumber").val().trim().toUpperCase(),
                    pCurrencyID: $("#slCurrency").val(),
                    pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()

                    , pAccount_ID: $("#slAccount").val()
                    , pNotesPayable: $("#slNotesPayable").val()
                    , pNotesPayableUnderCollection: $("#slNotesPayableUnderCollection").val()
                    , pNotesReceivable: $("#slNotesReceivable").val()
                    , pNotesReceivableUnderCollection: $("#slNotesReceivableUnderCollection").val()
                    , pCollectionExpenses: $("#slCollectionExpenses").val()
                    , pBankMinimumLimit: 0
                    , pBankDocumentID: 0
                    , pInJournalTypeID: $("#slInJournalType").val()
                    , pOutJournalTypeID: $("#slOutJournalType").val()
                    , pPrintedAs: "0"
                    , pBankSubAccountID: ($("#slBankSubAccountID").val() == '' ? 0 : $("#slBankSubAccountID").val())
                    , pIsOnlineBank: ($("#cbOnlineBank").prop("checked") ? 1 : 0)

                }, pSaveandAddNew, "BankAccountModal",
                    function () {
                        BankAccount_LoadingWithPaging();
                        if (pSaveandAddNew)
                            BankAccount_ClearAllControls();
                    });

            }
        });
}
// calling this function for update
function BankAccount_Update(pSaveandAddNew) {
    debugger;
    CallGETFunctionWithParameters("/api/BankAccount/CheckIsOnline", {
        pID: $("#hID").val(),
        pIscheck: ($("#cbOnlineBank").prop("checked") ? 1 : 0)
    
    },
        function (pData) {
            debugger;

            if (pData) {

                swal("Sorry", "You cannot save because this bank is marked as an Online Bank, and only one Online Bank is allowed in the system.");


            }
            else {
                var count = $("#slBankSubAccountID option").filter(function () {
                    return $(this).val() != "0";
                }).length;

                if (count > 0 && ($("#slBankSubAccountID").val() == '' || $("#slBankSubAccountID").val() == 0)) {
                    swal(strSorry, "Choose SubAccount", "warning");
                    return;
                }
                if ($("#txtCode").val().includes("-")) {

                    swal(strSorry, "Bank Code Cannot Contain Dash (-) ", "warning");
                    return;

                }
                InsertUpdateFunction("form", "/api/BankAccount/Update", {
                    pID: $("#hID").val(),
                    pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
                    pName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(),
                    pLocalName: $("#txtName").val().trim() == "" ? 0 : $("#txtName").val().trim().toUpperCase(), //$("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim().toUpperCase(),
                    pAccountName: $("#txtAccountName").val().trim() == "" ? 0 : $("#txtAccountName").val().trim().toUpperCase(),
                    pAccountNumber: $("#txtAccountNumber").val().trim() == "" ? 0 : $("#txtAccountNumber").val().trim().toUpperCase(),
                    pCurrencyID: $("#slCurrency").val(),
                    pNotes: $("#txtNotes").val().trim() == "" ? 0 : $("#txtNotes").val().trim().toUpperCase()

                    , pAccount_ID: $("#slAccount").val()
                    , pNotesPayable: $("#slNotesPayable").val()
                    , pNotesPayableUnderCollection: $("#slNotesPayableUnderCollection").val()
                    , pNotesReceivable: $("#slNotesReceivable").val()
                    , pNotesReceivableUnderCollection: $("#slNotesReceivableUnderCollection").val()
                    , pCollectionExpenses: $("#slCollectionExpenses").val()
                    , pBankMinimumLimit: 0
                    , pBankDocumentID: 0
                    , pInJournalTypeID: $("#slInJournalType").val()
                    , pOutJournalTypeID: $("#slOutJournalType").val()
                    , pPrintedAs: "0"
                    , pBankSubAccountID: ($("#slBankSubAccountID").val() == '' ? 0 : $("#slBankSubAccountID").val())
                    , pIsOnlineBank: ($("#cbOnlineBank").prop("checked") ? 1 : 0)
                }, pSaveandAddNew, "BankAccountModal", function () {
                    BankAccount_LoadingWithPaging();
                    if (pSaveandAddNew)
                        BankAccount_ClearAllControls();
                });
            }


        });
   
}
function BankAccount_Delete(pID) {
    DeleteListFunction("/api/BankAccount/DeleteByID", { "pID": pID }, function () { BankAccount_LoadingWithPaging(); });
}
function BankAccount_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBankAccount') != "")
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
            DeleteListFunction("/api/BankAccount/Delete", { "pBankAccountIDs": GetAllSelectedIDsAsString('tblBankAccount') }, function () { BankAccount_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function BankAccount_FillControls(pID) {
    debugger;
    ClearAll("#BankAccountModal", null);

    var tr = $("tr[ID='" + pID + "']");
    var pCurrencyID = $(tr).find("td.CurrencyID").attr("val");

    if ($(tr).find("td.PaymentsCount").text() == 0)
        $("#slCurrency").removeAttr("disabled");
    else
        $("#slCurrency").attr("disabled", "disabled");


    if (pDefaults.UnEditableCompanyName != 'ESG') {

        $("#slBankSubAccountID").parent().addClass("hide");


    }

    $("#slAccount").val($(tr).find("td.Account_ID").text());
    $("#slNotesPayable").val($(tr).find("td.NotesPayable").text());
    $("#slNotesPayableUnderCollection").val($(tr).find("td.NotesPayableUnderCollection").text());
    $("#slNotesReceivable").val($(tr).find("td.NotesReceivable").text());
    $("#slNotesReceivableUnderCollection").val($(tr).find("td.NotesReceivableUnderCollection").text());
    $("#slCollectionExpenses").val($(tr).find("td.CollectionExpenses").text());
    $("#slInJournalType").val($(tr).find("td.InJournalTypeID").text());
    $("#slOutJournalType").val($(tr).find("td.OutJournalTypeID").text());

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtAccountName").val($(tr).find("td.AccountName").text());
    $("#txtAccountNumber").val($(tr).find("td.AccountNumber").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#cbOnlineBank").prop("checked", $(tr).find("td.IsOnlineBank input[type='checkbox']").is(":checked"));


    GetListCurrencyWithCodeAndExchangeRateAttr(pCurrencyID, "/api/Currencies/LoadAll", null, "slCurrency", "ORDER BY Code", null)


    $("#slAccount").trigger("change");
    $("#slBankSubAccountID").css({ "width": "100%" }).select2();
    $("#slBankSubAccountID").trigger("change");
    FillSlSubAccount('slBankSubAccountID', 'slAccount', $(tr).find("td.BankSubAccountID").text(), $(tr).find("td.Account_ID").text());


    $("#btnSave").attr("onclick", "BankAccount_Update(false);");
    $("#btnSaveandNew").attr("onclick", "BankAccount_Update(true);");
}
function BankAccount_ClearAllControls() {
    ClearAll("#BankAccountModal", null);
    $("#slCurrency").removeAttr("disabled");

    GetListCurrencyWithCodeAndExchangeRateAttr($("#hDefaultCurrencyID").val(), "/api/Currencies/LoadAll", null, "slCurrency", "ORDER BY Code", null)
    $("#btnSave").attr("onclick", "BankAccount_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "BankAccount_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);


    $("#slAccount").trigger("change");
    $("#slBankSubAccountID").trigger("change");





    if (pDefaults.UnEditableCompanyName != 'ESG') {

        $("#slBankSubAccountID").parent().addClass("hide");


    }
}
