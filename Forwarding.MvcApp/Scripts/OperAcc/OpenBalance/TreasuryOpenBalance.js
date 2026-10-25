function TreasuryOpenBalance_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblTreasuryOpenBalance");
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblTreasuryOpenBalance",
            ("<tr ID='" + item.ID + "' "
                + (" ondblclick='TreasuryOpenBalance_FillModal(" + item.ID + "," + item.TreasuryID + "," + item.CurrencyID + ");' ")
                //+ (
                //    (item.IsApproved)
                //    ? ""//(" class='text-danger' ")
                //    : (" ondblclick='PaymentDetails_EditByDblClick(" + item.ID + ");' ")
                //    )
            + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentDetailsID'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID hide'>" + item.PaymentID + "</td>"
                    + "<td class='TreasuryName'>" + item.TreasuryName + "</td>"
                    + "<td class='Amount PaymentDetailsAmount'>" + (item.PRType == constPRTypeReceivable ? item.Amount.toFixed(2) : -1 * item.Amount.toFixed(2)) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='ExchangeRate PaymentDetailsExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#PaymentDetailsModal' data-toggle='modal' onclick='TreasuryOpenBalance_FillModal(" + item.ID + "," + item.TreasuryID + "," + item.CurrencyID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblTreasuryOpenBalance", "PaymentDetailsID", "cbTreasuryOpenBalanceDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteTreasuryOpenBalanceID");
    HighlightText("#tblTreasuryOpenBalance>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TreasuryOpenBalance_LoadingWithPaging() {
    debugger;
    var pWhereClause = TreasuryOpenBalance_GetWhereClause();
    var pOrderBy = "TreasuryName";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjectsForTreasuryOpenBalance: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { TreasuryOpenBalance_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblTreasuryOpenBalance>tbody>tr", $("#txt-Search").val().trim());
}
//called by LoadDataWithPaging
function TreasuryOpenBalance_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE PaymentTypeID IS NULL AND TreasuryID IS NOT NULL";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause += " AND (";
        //pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        ////pWhereClause += " OR PartnerTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += ")";
    }
    if ($("#slTreasury").val() != "") {
        pWhereClause += " AND TreasuryID = N'" + $("#slTreasury").val() + "' ";
    }
    //if ($("#slCurrency").val() != "") {
    //    pWhereClause += " AND CurrencyID = N'" + $("#slCurrency").val() + "' ";
    //}
    return pWhereClause;
}
function TreasuryOpenBalance_FillModal(pPaymentDetailsID, pTreasuryID, pCurrencyID) {
    debugger;
    ClearAll("#PaymentDetailsModal");
    if (pPaymentDetailsID == 0) { //This means called from the New btn
        pTreasuryID = $("#slTreasury").val();
        pCurrencyID = $("#slCurrency").val();
        $("#slPaymentDetailsCurrency").val(pCurrencyID);
        $("#txtPaymentDetailsExchangeRate").val($("#slPaymentDetailsCurrency option[value=" + $("#slCurrency").val() + "]").attr("MasterDataExchangeRate"));
        $("#lblPaymentDetailsShown").html(": " + $("#slTreasury option:selected").text() + ' / ' + $("#slCurrency option:selected").text());
        if (pCurrencyID == $("#hDefaultCurrencyID").val())
            $("#txtPaymentDetailsExchangeRate").attr("disabled", "disabled");
        else
            $("#txtPaymentDetailsExchangeRate").removeAttr("disabled");
    }
    if (pTreasuryID == "" || pCurrencyID == "") //this means $("#slTreasury").val() or $("#slCurrency").val() is not selected
        swal("Sorry", "Please, select treasury and currency.");
    else {
        $("#hPaymentDetailsID").val(pPaymentDetailsID);
        $("#hTreasuryID").val(pTreasuryID);
        FadePageCover(true);
        $("#btnSavePaymentDetails").attr("onclick", "TreasuryOpenBalance_Save();");
        jQuery("#PaymentDetailsModal").modal("show");
        CallGETFunctionWithParameters("/api/Payment/FillTreasuryOpenBalanceModal"
            , { pPaymentDetailsID: $("#hPaymentDetailsID").val(), pTreasuryID: pTreasuryID, pCurrencyID: pCurrencyID }
            , function (pData) {
                var pTreasuryOpenBalance = JSON.parse(pData[0]);
                if (pTreasuryOpenBalance != null) {
                    $("#hPaymentDetailsID").val(pTreasuryOpenBalance.ID); //for case i chose from btn new
                    $("#lblPaymentDetailsShown").html(": " + pTreasuryOpenBalance.TreasuryName + ' / ' + pTreasuryOpenBalance.CurrencyCode);
                    $("#slPaymentDetailsCurrency").val(pTreasuryOpenBalance.CurrencyID);
                    $("#txtPaymentDetailsAmount").val(pTreasuryOpenBalance.PRType == constPRTypeReceivable ? pTreasuryOpenBalance.Amount : (-1 * pTreasuryOpenBalance.Amount));
                    $("#txtPaymentDetailsExchangeRate").val(pTreasuryOpenBalance.ExchangeRate);
                    $("#txtPaymentDetailsNotes").val(pTreasuryOpenBalance.Notes == 0 ? "" : pTreasuryOpenBalance.Notes);
                    if (pTreasuryOpenBalance.CurrencyID == $("#hDefaultCurrencyID").val())
                        $("#txtPaymentDetailsExchangeRate").attr("disabled", "disabled");
                    else
                        $("#txtPaymentDetailsExchangeRate").removeAttr("disabled");
                }
                FadePageCover(false);
            }
            , null);
    }
}
function TreasuryOpenBalance_Save() {
    debugger;
    if (ValidateForm("form", "PaymentDetailsModal")) {
        FadePageCover(true);
        pParametersWithValues = {
            pPaymentDetailsID: $("#hPaymentDetailsID").val()
            , pTreasuryID: $("#hTreasuryID").val()
            , pCurrencyID: $("#slPaymentDetailsCurrency").val()
            , pAmount: $("#txtPaymentDetailsAmount").val()
            , pExchangeRate: $("#txtPaymentDetailsExchangeRate").val()
            , pNotes: $("#txtPaymentDetailsNotes").val().trim() == "" ? "0" : $("#txtPaymentDetailsNotes").val().trim().toUpperCase()
        }
        CallGETFunctionWithParameters("/api/Payment/TreasuryOpenBalance_Save", pParametersWithValues
            , function (pData) {
                TreasuryOpenBalance_LoadingWithPaging();
                jQuery("#PaymentDetailsModal").modal("hide");
                swal("Success", "Saved successfully.");
                //FadePageCover(false);
            }
            , null);
    }
}
function TreasuryOpenBalance_DeleteList() {
    debugger;
    var pPaymentDetailsIDsDeleted = GetAllSelectedIDsAsString('tblTreasuryOpenBalance');
    if (pPaymentDetailsIDsDeleted != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Payment/TreasuryOpenBalance_DeleteList"
                , { pTreasuryOpenBalanceIDsDeleted: pPaymentDetailsIDsDeleted }
                , function (pData) {
                    if (pData[0]) {
                        TreasuryOpenBalance_LoadingWithPaging();
                    }
                    else
                        swal("Sorry", "An error occured, please refresh and then try again.");
                    FadePageCover(false);
                });
        });
}
function PaymentDetails_CurrencyChanged() {
    debugger;
    $("#txtPaymentDetailsExchangeRate").val($("#slPaymentDetailsCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPaymentDetailsCurrency").val())
        $("#txtPaymentDetailsExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPaymentDetailsExchangeRate").removeAttr("disabled");
}