function Post_Restore_Unpost_JVs_BindTableRows(pJournalVouchers) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblJournalVouchers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pJournalVouchers, function (i, item) {
        AppendRowtoTable("tblJournalVouchers",
            //("<tr ID='" + item.ID + "' ondblclick='JournalVouchers_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='JVNo'>" + (item.JVNo == 0 ? "" : item.JVNo) + "</td>"
                    + "<td class='JVDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + "</td>"
                    + "<td class='TotalCredit'>" + item.TotalCredit + "</td>"
                    + "<td class='Journal_ID hide'>" + item.Journal_ID + "</td>"
                    + "<td class='JournalTypeName'>" + (item.JournalTypeName == 0 ? "" : item.JournalTypeName) + "</td>"
                    + "<td class='JVType_ID hide'>" + item.JVType_ID + "</td>"
                    + "<td class='JVTypeName'>" + (item.JVTypeName == 0 ? "" : item.JVTypeName) + "</td>"
                    + "<td class='ReceiptNo'>" + (item.ReceiptNo == 0 ? "" : item.ReceiptNo) + "</td>"
                    + "<td class='RemarksHeader'>" + (item.RemarksHeader == 0 ? "" : item.RemarksHeader) + "</td>"

                    + "<td class='Deleted hide'> <input id=cbDeleted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Deleted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Posted hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Posted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsSysJv hide'> <input id=cbIsSysJv" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsSysJv ? " checked='checked' " : "") + " /></td>"
                    //+ "<td class='hide'><a href='#JournalVouchersModal' data-toggle='modal' onclick='JournalVouchers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"));
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJournalVouchers", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalVouchers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Post_Restore_Unpost_JVs_LoadingWithPaging() {
    debugger;
    var pWhereClause = Post_Restore_Unpost_JVs_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Post_Restore_Unpost_JVs_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblJournalVouchers>tbody>tr", $("#txt-Search").val().trim());
}
function Post_Restore_Unpost_JVs_GetWhereClause() {
    var pWhereClause = "";
    if (glbFormCalled == constFrmPosting)
        pWhereClause = "WHERE Deleted=0 AND Posted=0 AND IsSysJv = 0" + "\n";
    else if (glbFormCalled == constFrmUnPosting)
        pWhereClause = "WHERE Deleted=0 AND Posted=1 AND IsSysJv = 0" + "\n";
    else if (glbFormCalled == constFrmRestoring)
        pWhereClause = "WHERE Deleted=1 AND IsSysJv = 0" + "\n";
    pWhereClause += " AND JVDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND JVDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n";
    if ($("#txtSearchJVNo").val().trim() != "")
        pWhereClause += " AND JVNo LIKE N'%" + $("#txtSearchJVNo").val().trim() + "%'" + "\n";
    if ($("#slSearchJVType").val() != 0)
        pWhereClause += " AND JVType_ID = " + $("#slSearchJVType").val() + "\n";
    if ($("#slSearchJournalType").val() != 0)
        pWhereClause += " AND Journal_ID = " + $("#slSearchJournalType").val() + "\n";
    if ($("#txtSearchReceiptNo").val().trim() != "")
        pWhereClause += " AND ReceiptNo LIKE N'%" + $("#txtSearchReceiptNo").val().trim() + "%'" + "\n";
    if ($("#txtSearchValue").val().trim() != "")
        pWhereClause += " AND TotalCredit = " + $("#txtSearchValue").val().trim() + "\n";
    if ($("#txtSearchRemarksHeader").val().trim() != "")
        pWhereClause += " AND RemarksHeader LIKE N'%" + $("#txtSearchRemarksHeader").val().trim() + "%'" + "\n";

    return pWhereClause;
}
function Post_Restore_Unpost_JVs_PostOrUnpostList(pValue) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblJournalVouchers', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/JournalVouchers/SetPostField"
            , { pSelectedIDs: pSelectedIDs, pValue: pValue }
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    strDeleteFailMessage = "One or more JVs can not be posted/unposted because fiscal year is closed or date is frozen.";
                }
                else
                    swal("Success", "Saved successfully");
                Post_Restore_Unpost_JVs_LoadingWithPaging(pData[0]);
            }
            , null);
    }
}
function Post_Restore_Unpost_JVs_RestoreList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblJournalVouchers', 'Delete');
    if (pSelectedIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be restored!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, restore!",
            closeOnConfirm: true
        },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/JournalVouchers/RestoreList"
                , { pRestoredIDs: pSelectedIDs, pCheckFiscalClosed: false }
                , function (pData) {
                    if (!pData[0]) {
                        showDeleteFailMessage = true;
                        strDeleteFailMessage = "One or more JVs are not restored because fiscal year is closed or date is frozen.";
                    }
                    Post_Restore_Unpost_JVs_LoadingWithPaging(pData[0]);
                }
                , null);
        });
}
function Post_Restore_Unpost_JVs_DeleteList(pTrans_Type) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblJournalVouchers', 'Delete');
    if (pSelectedIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/JournalVouchers/Delete"
                , { pDeletedIDs: pSelectedIDs, pTrans_Type: pTrans_Type, pCheckFiscalClosed: false }
                , function (pData) {
                    if (!pData[0]) {
                        showDeleteFailMessage = true;
                        strDeleteFailMessage = "One or more JVs are not deleted because fiscal year is closed or date is frozen.";
                    }
                    Post_Restore_Unpost_JVs_LoadingWithPaging(pData[0]);
                }
                , null);
        });
}
