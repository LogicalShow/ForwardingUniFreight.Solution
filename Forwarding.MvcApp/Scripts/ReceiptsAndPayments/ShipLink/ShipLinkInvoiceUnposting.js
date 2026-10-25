
function ShipLinkInvoiceUnposting_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-ShipLink").parent().addClass("active");
    ClearAllTableRows("tblShipLinkInvoiceUnposting");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblShipLinkInvoiceUnposting",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='JVNo'>" + item.JVNo + "</td>"
                    + "<td class='JVDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.JVDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.JVDate))) + "</td>"
                    + "<td class='TotalDebit'>" + item.TotalDebit + "</td>"
                    + "<td class='ReceiptNo'>" + (item.ReceiptNo == 0 ? "" : item.ReceiptNo) + "</td>"
                    + "<td class='RemarksHeader'>" + (item.RemarksHeader == 0 ? "" : item.RemarksHeader) + "</td>"
             //+ "<td class='hide'><a href='#VoucherModal' data-toggle='modal' onclick='Voucher_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
            + "</tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblShipLinkInvoiceUnposting", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblJournalTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShipLinkInvoiceUnposting_LoadingWithPaging() {
    debugger;
    var pWhereClause = ShipLinkInvoiceUnposting_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = 1;//($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ShipLinkInvoiceUnposting_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblShipLinkInvoiceUnposting>tbody>tr", $("#txt-Search").val().trim());
}
function ShipLinkInvoiceUnposting_GetWhereClause() {
    var pWhereClause = "WHERE JVDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND JVDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'" + "\n";
    if ($("#slInvoiceType").val() != 0)
        pWhereClause += " AND InvoiceTypeID=" + $("#slInvoiceType").val();
    if ($("#txtSearchInvoiceNo").val().trim() != "")
        pWhereClause += " AND InvoiceSerial LIKE N'" + $("#txtSearchInvoiceNo").val().trim() + "%'" + "\n";
    if ($("#txtSearchJVNo").val().trim() != "")
        pWhereClause += " AND JVNo LIKE N'" + $("#txtSearchJVNo").val().trim() + "%'" + "\n";
    return pWhereClause;
}
function ShipLinkInvoiceUnposting_Unpost() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblShipLinkInvoiceUnposting', 'Delete');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ShipLinkInvoiceUnposting/Unpost"
            , {
                pSelectedIDs: pSelectedIDs
            }
            , function (pData) {
                if (pData[0] == "") {
                    swal("Success", "Saved successfully"); 
                }
                else
                    swal("Sorry", pData[0]);
                ShipLinkInvoiceUnposting_LoadingWithPaging(pData[0]);
            }
            , null);
    }
}