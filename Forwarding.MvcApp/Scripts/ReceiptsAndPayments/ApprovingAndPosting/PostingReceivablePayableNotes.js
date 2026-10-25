function PostingReceivablePayableNotes_BindTableRows(pTableRows) {
    debugger;
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
        tr += "     <td class='DueDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>";
        tr += "     <td class='BankID hide'>" + item.BankID + "</td>";
        tr += "     <td class='BankName'>" + (item.BankID == 0 ? "" : item.BankName) + "</td>";
        tr += "     <td class='JVDate'> <input id='txtJVDate" + item.ID + "' type='text' style='width:75px;' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='cursor:text;' class=' form-control controlStyle datepicker-input' data-required='false' data-date-format='dd/mm/yyyy' readonly value='" + getTodaysDateInddMMyyyyFormat() + "'/> </td> ";
        tr += "     <td class='Safe'> <select id='slSafe" + item.ID + "' class='controlStyle' style='width:160px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' " + (item.VoucherType == constVoucherChequeOut ? " disabled='disabled' " : "") + " data-required='false'></select> </td> ";
        tr += "</tr>";
        AppendRowtoTable("tblChequeStatus", tr);
    });
    $.each(pTableRows, function (i, item) {
        debugger;
        $("#slSafe" + item.ID).html($("#slSearchSafe").html());
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
function PostingReceivablePayableNotes_LoadingWithPaging() {
    debugger;
    var pWhereClause = PostingReceivablePayableNotes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseChequeStatus: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PostingReceivablePayableNotes_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblChequeStatus>tbody>tr", $("#txt-Search").val().trim());
}
function PostingReceivablePayableNotes_GetWhereClause() {
    var pWhereClause = " WHERE Posted=1 AND UnderCollection=0 AND Collected=0  AND Returned=0 " + "\n";
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
function PostingReceivablePayableNotes_Post() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString("tblChequeStatus", "Delete");
    if (pSelectedIDs != "") {
        FadePageCover(true);
        var pVoucherIDList = "";
        var pSafeIDList = "";
        var pJVDateList = "";
        /*****************************Collecting Details Data*************************************/
        var NumberOfDetailsRows = pSelectedIDs.split(',').length;
        for (var i = 0; i < NumberOfDetailsRows; i++) {
            var currentRowID = pSelectedIDs.split(",")[i];
            var tr = $("#tblChequeStatus tr[ID='" + currentRowID + "']");
            pVoucherIDList += ((pVoucherIDList == "") ? "" : ",") + $(tr).find("td.VoucherID").text();
            pSafeIDList += ((pSafeIDList == "") ? "" : ",") + $("#slSafe" + currentRowID).val();
            pJVDateList += ((pJVDateList == "") ? "" : ",") + $("#txtJVDate" + currentRowID).val().trim();
        }
        var pParametersWithValues = {
            pSelectedReceivablePayableNotesIDs: pSelectedIDs
            , pVoucherIDList: pVoucherIDList
            , pSafeIDList: pSafeIDList
            , pJVDateList: pJVDateList
        };
        CallGETFunctionWithParameters("/api/Voucher/PostingReceivablePayableNotes_Post"
            , pParametersWithValues
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = "One or more Cheques can not be posted/unposted because fiscal year is closed or date is frozen.";
                }
                else
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                PostingReceivablePayableNotes_LoadingWithPaging();
            }
            , null);
    }
}