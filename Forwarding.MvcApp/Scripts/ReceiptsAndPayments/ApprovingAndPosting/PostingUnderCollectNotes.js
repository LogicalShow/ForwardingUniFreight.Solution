function PostingUnderCollectNotes_BindTableRows(pTableRows) {
    debugger;

    var LinkUserAndSafes = $('#hReadySlOptions option[value="55"]').attr("OptionValue");


    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    ClearAllTableRows("tblChequeStatus");
    $.each(pTableRows, function (i, item) {
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
        tr += "     <td class='ChequeNo'>" + item.ChequeNo + "</td>";
        tr += "     <td class='VoucherID hide'>" + item.VoucherID + "</td>";
        tr += "     <td class='Amount'>" + item.Amount + "</td>";
        tr += "     <td class='CurrencyID hide'>" + item.CurrencyID + "</td>";
        tr += "     <td class='CurrencyCode'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>";
        tr += "     <td class='ChequeDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ChequeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ChequeDate))) + "</td>";
        tr += "     <td class='InOrOut'>" + (item.InOut ? TranslateString("Income") : TranslateString("Outcome")) + "</td>";
        tr += "     <td class='NotesReceivable hide'>" + item.NotesReceivable + "</td>";
        tr += "     <td class='NotesReceivableUnderCollection hide'>" + item.NotesReceivableUnderCollection + "</td>";
        tr += "     <td class='BankID hide'>" + item.BankID + "</td>";
        //tr += "     <td class='BankName'>" + (item.BankID == 0 ? "" : item.BankName) + "</td>";
        tr += "     <td class='Bank'> <select id='slBank" + item.ID + "' class='controlStyle' style='width:160px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='PostingUnderCollectNotes_BankChangedInRow(" + item.ID + ");' " + ((item.VoucherType == constVoucherChequeOut || item.SafeID > 0) && (pDefaults.UnEditableCompanyName != 'TRM' && pDefaults.UnEditableCompanyName != 'MES' && pDefaults.UnEditableCompanyName != 'UNF') ? " disabled='disabled' " : "") + " data-required='false'></select> </td> ";
        tr += "     <td class='AccountExpenses'> <select id='slExpenses" + item.ID + "' class='controlStyle' style='width:160px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' " + ((item.VoucherType == constVoucherChequeOut || item.SafeID > 0) && (pDefaults.UnEditableCompanyName != 'MES') ? " disabled='disabled' " : "") + " data-required='false'></select> </td> ";

        tr += "     <td class='JVDate'> <input id='txtJVDate" + item.ID + "' type='text' style='width:75px;' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='cursor:text;' class=' form-control controlStyle datepicker-input' data-required='false' data-date-format='dd/mm/yyyy' readonly value='" + getTodaysDateInddMMyyyyFormat() + "'/> </td> ";
        //tr += "     <td class='DueDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>";
        tr += "     <td class='CollectionExpenses'><input type='text' id='txtCollectionExpenses" + item.ID + "' class='form-control controlStyle' style='width:80px;' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + ((item.SafeID > 0 && LinkUserAndSafes == "false") ? " disabled='disabled' " : "") + " /> </td> ";
       tr += "     <td class='Safe'> <select id='slSafe" + item.ID + "' class='controlStyle' style='width:160px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='PostingUnderCollectNotes_SafeChangedInRow(" + item.ID + ");' " + (item.VoucherType == constVoucherChequeOut ? " disabled='disabled' " : "") + " data-required='false'></select> </td> ";
     
        tr += "</tr>";
        AppendRowtoTable("tblChequeStatus", tr);
    });
    $.each(pTableRows, function (i, item) {
        debugger;
        $("#slSafe" + item.ID).html($("#slSearchSafe").html());
        //$("#slSafe" + item.ID).val(item.SafeID);

       if (LinkUserAndSafes == "false")
           $("#slSafe" + item.ID).val(item.SafeID);
       
        $("#slBank" + item.ID).html($("#slSearchBank").html());
        $("#slBank" + item.ID).css({ "width": "100%" }).select2();

        $("#slExpenses" + item.ID).html($("#slSearchAccountExpenses").html());
        $("#slExpenses" + item.ID).css({ "width": "100%" }).select2();

        $("#slBank" + item.ID + " option[value=0]").remove();
        $("#slBank" + item.ID).val(item.BankID);
    });
    //ApplyPermissions();
    SetDatepickerFormat();
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    BindAllCheckboxonTable("tblChequeStatus", "ID");
    CheckAllCheckbox("ID");
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PostingUnderCollectNotes_LoadingWithPaging() {
    debugger;
    var pWhereClause = PostingReceivablePayableNotes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseChequeStatus: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PostingUnderCollectNotes_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblChequeStatus>tbody>tr", $("#txt-Search").val().trim());
}
function PostingReceivablePayableNotes_GetWhereClause() {
    var pWhereClause = " WHERE Posted=1 AND UnderCollection=1 AND Collected=0  AND ToSafe=0 AND Returned=0 " + "\n";
    if ($("#txtSearchChequeNo").val().trim() == "")
    pWhereClause += " AND ChequeDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND ChequeDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";
    if ($("#txtSearchChequeNo").val().trim() != "")
        pWhereClause += " AND ChequeNo LIKE N'%" + $("#txtSearchChequeNo").val().trim() + "%'" + "\n";
    if ($("#slSearchBank").val() != 0)
        pWhereClause += " AND BankID = " + $("#slSearchBank").val() + "\n";
    if ($("#slSearchVoucherType").val() != 0)
        pWhereClause += " AND VoucherType = " + $("#slSearchVoucherType").val() + "\n";
    if ($("#txtSearchTotal").val().trim() != "")
        pWhereClause += " AND Amount = " + $("#txtSearchTotal").val().trim() + "\n";
    if ($("#slSearchCurrency").val() != 0)
        pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val() + "\n";

    //var LinkUserAndSafes = $('#hReadySlOptions option[value="55"]').attr("OptionValue");//LinkUserAndSafes
    //if (LinkUserAndSafes == "true") {
    //    pWhereClause = " INNER JOIN VW_Sec_UserSafes US ON SafeID = US._SafeID " + "\n" + pWhereClause + "\n" + " AND US._UserID";
    //}

    return pWhereClause;
}
function PostingUnderCollectNotes_SafeChangedInRow(pRowID) {
    debugger;
    var tr = $("#tblChequeStatus tr[ID='" + pRowID + "']");

    if ($("#slSafe" + pRowID + " option:selected").val() == 0) {
        $("#txtCollectionExpenses" + pRowID).removeAttr("disabled");
        $("#slBank" + pRowID).removeAttr("disabled");
    }
    else { //I am working on Bank and not Safe
        $("#txtCollectionExpenses" + pRowID).attr("disabled", "disabled");
        $("#txtCollectionExpenses" + pRowID).val("");
        $("#slBank" + pRowID).attr("disabled", "disabled");
        $("#slBank" + pRowID).val($(tr).find("td.BankID").text());
    }
}
function PostingUnderCollectNotes_BankChangedInRow(pRowID) {
    debugger;
    var tr = $("#tblChequeStatus tr[ID='" + pRowID + "']");
    var pOldNotesReceivable = $(tr).find("td.NotesReceivable").text();
    var pOldNotesReceivableUnderCollection = $(tr).find("td.NotesReceivableUnderCollection").text();
    var pOldBankID = $(tr).find("td.BankID").text();
    if ($("#slBank" + pRowID + " option:selected").attr("NotesReceivable") != pOldNotesReceivable) {
        swal("Sorry", ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "البنك غير مرتبط بنفس حساب أوراق القبض " : "The Selected Bank Does not Have the Same Receivable Notes Account"));
        $("#slBank" + pRowID).val(pOldBankID);
    }
    else if ($("#slBank" + pRowID + " option:selected").attr("NotesReceivableUnderCollection") != pOldNotesReceivableUnderCollection) {
        swal("Sorry", ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "البنك غير مرتبط بنفس حساب أوراق تحت التحصيل " : "The Selected Bank Does not Have the Same Receivable Under Collecting Account"));
        $("#slBank" + pRowID).val(pOldBankID);
    }
    else if ($("#slBank" + pRowID + " option:selected").attr("account_id") == 0) {
        swal("Sorry", ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "البنك غير مرتبط  بحساب  " : "The Selected Bank Does not Have Account"));
        $("#slBank" + pRowID).val(pOldBankID);
    }
}
function PostingUnderCollectNotes_ApproveOrReturn(pOption) { //pOption 1:Approve 2:Returned
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString("tblChequeStatus", "Delete");
    if (pSelectedIDs != "") {
        FadePageCover(true);
        var pVoucherIDList = "";
        var pSafeIDList = "";
        var pJVDateList = "";
        var pBankIDList = "";
        var pCollectionExpensesList = "";
        var pSafeAccountIDList = "";
        var pSafeSubAccountIDList = "";
        var pBankAccountIDList = "";
        var pBankSubAccountIDList = "";
        var pAmountList = "";
        var pBankNotesReceivableUnderCollectionList = "";
        var pBankNotesPayableUnderCollectionList = "";
        var pBankCollectionExpensesIDsList = ""
        var pBankInJournalTypeIDList = "";
        var pBankOutJournalTypeIDList = "";
        var pBankNotesReceivableList = "";
        var pBankNotesPayableList = "";
        var pAccountExpensesIDList = "";

        /*****************************Collecting Details Data*************************************/
        var NumberOfDetailsRows = pSelectedIDs.split(',').length;
        for (var i = 0; i < NumberOfDetailsRows; i++) {
            var currentRowID = pSelectedIDs.split(",")[i];
            var tr = $("#tblChequeStatus tr[ID='" + currentRowID + "']");
            pVoucherIDList += ((pVoucherIDList == "") ? "" : ",") + $(tr).find("td.VoucherID").text();
            pSafeIDList += ((pSafeIDList == "") ? "" : ",") + $("#slSafe" + currentRowID).val();
            pJVDateList += ((pJVDateList == "") ? "" : ",") + $("#txtJVDate" + currentRowID).val().trim();
            pBankIDList += ((pBankIDList == "") ? "" : ",") + $("#slBank" + currentRowID).val();
            pCollectionExpensesList += ((pCollectionExpensesList == "") ? "" : ",") + (($("#txtCollectionExpenses" + currentRowID).val().trim() == "" || pOption == 0) ? 0 : $("#txtCollectionExpenses" + currentRowID).val());
            pSafeAccountIDList += ((pSafeAccountIDList == "") ? "" : ",") + ($("#slSafe" + currentRowID).val() == 0 ? 0 : $("#slSafe" + currentRowID + " option:selected").attr("Account_ID"));
            pBankAccountIDList += ((pBankAccountIDList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("Account_ID"));
            pAmountList += ((pAmountList == "") ? "" : ",") + $(tr).find("td.Amount").text();
            pBankNotesReceivableUnderCollectionList += ((pBankNotesReceivableUnderCollectionList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("NotesReceivableUnderCollection"));
            pBankNotesPayableUnderCollectionList += ((pBankNotesPayableUnderCollectionList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("NotesPayableUnderCollection"));
            pBankCollectionExpensesIDsList += ((pBankCollectionExpensesIDsList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("CollectionExpenses"));
            pBankInJournalTypeIDList += ((pBankInJournalTypeIDList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("InJournalTypeID"));
            pBankOutJournalTypeIDList += ((pBankOutJournalTypeIDList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("OutJournalTypeID"));
            pBankNotesReceivableList += ((pBankNotesReceivableList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("NotesReceivable"));
            pBankNotesPayableList += ((pBankNotesPayableList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("NotesPayable"));
            pAccountExpensesIDList += ((pAccountExpensesIDList == "") ? "" : ",") + $("#slExpenses" + currentRowID).val();
            pBankSubAccountIDList += ((pBankSubAccountIDList == "") ? "" : ",") + ($("#slBank" + currentRowID).val() == 0 ? 0 : $("#slBank" + currentRowID + " option:selected").attr("BankSubAccountID"));
            pSafeSubAccountIDList += ((pSafeSubAccountIDList == "") ? "" : ",") + ($("#slSafe" + currentRowID).val() == 0 ? 0 : $("#slSafe" + currentRowID + " option:selected").attr("SafeSubAccountID"));

        }
        var pParametersWithValues = {
            pOption: pOption
            , pSelectedReceivablePayableNotesIDs: pSelectedIDs
            , pVoucherIDList: pVoucherIDList
            , pSafeIDList: pSafeIDList
            , pJVDateList: pJVDateList
            , pBankIDList: pBankIDList
            , pCollectionExpensesList: pCollectionExpensesList
            , pSafeAccountIDList: pSafeAccountIDList
            , pBankAccountIDList: pBankAccountIDList
            , pAmountList: pAmountList
            , pBankNotesReceivableUnderCollectionList: pBankNotesReceivableUnderCollectionList
            , pBankNotesPayableUnderCollectionList: pBankNotesPayableUnderCollectionList
            , pBankCollectionExpensesIDsList: pBankCollectionExpensesIDsList
            , pBankInJournalTypeIDList: pBankInJournalTypeIDList
            , pBankOutJournalTypeIDList: pBankOutJournalTypeIDList
            , pBankNotesReceivableList: pBankNotesReceivableList
            , pBankNotesPayableList: pBankNotesPayableList
            , pAccountExpensesIDList: pAccountExpensesIDList
            , pBankSubAccountIDList: pBankSubAccountIDList
            , pSafeSubAccountIDList: pSafeSubAccountIDList
        };
        CallGETFunctionWithParameters("/api/Voucher/PostingUnderCollectNotes_ApproveOrReturn"
            , pParametersWithValues
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = "One or more Cheques can not be posted/unposted.";
                }
                else
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                PostingUnderCollectNotes_LoadingWithPaging();
            }
            , null);
    }
}