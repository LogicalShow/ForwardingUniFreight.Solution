function BankOpenBalance_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblBankOpenBalance");
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblBankOpenBalance",
            ("<tr ID='" + item.ID + "' "
                + (" ondblclick='BankOpenBalance_FillModal(" + item.ID + "," + item.BankAccountID + ","+item.CurrencyID+");' ")
                //+ (
                //    (item.IsApproved)
                //    ? ""//(" class='text-danger' ")
                //    : (" ondblclick='PaymentDetails_EditByDblClick(" + item.ID + ");' ")
                //    )
            + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentDetailsID'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID hide'>" + item.PaymentID + "</td>"
                    + "<td class='AccountName'>" + item.AccountName + "</td>"
                    + "<td class='Amount PaymentDetailsAmount'>" + (item.PRType == constPRTypeReceivable ? item.Amount.toFixed(2) : -1 * item.Amount.toFixed(2)) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='ExchangeRate PaymentDetailsExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#PaymentDetailsModal' data-toggle='modal' onclick='BankOpenBalance_FillModal(" + item.ID + "," + item.BankAccountID + "," + item.CurrencyID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBankOpenBalance", "PaymentDetailsID", "cbBankOpenBalanceDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteBankOpenBalanceID");
    HighlightText("#tblBankOpenBalance>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function BankOpenBalance_LoadingWithPaging() {
    debugger;
    var pWhereClause = BankOpenBalance_GetWhereClause();
    var pOrderBy = "AccountName";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjectsForBankOpenBalance: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { BankOpenBalance_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblBankOpenBalance>tbody>tr", $("#txt-Search").val().trim());
}
//called by LoadDataWithPaging
function BankOpenBalance_GetWhereClause(pPaymentDetailsID) {
    debugger;
    var pWhereClause = " WHERE PaymentTypeID IS NULL AND BankAccountID IS NOT NULL";
    if ($("#txt-Search").val().trim() != "") {
        //pWhereClause += " AND (";
        //pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        ////pWhereClause += " OR PartnerTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += ")";
    }
    if ($("#slBank").val() != "") {
        pWhereClause += " AND BankAccountID = N'" + $("#slBank").val() + "' ";
    }
    return pWhereClause;
}
function BankOpenBalance_FillModal(pPaymentDetailsID, pBankAccountID, pCurrencyID) {
    debugger;
    ClearAll("#PaymentDetailsModal");
    if (pPaymentDetailsID == 0) { //This means called from the New btn
        pBankAccountID = $("#slBank").val();
        pCurrencyID = $("#slBank option:selected").attr("CurrencyID");
        $("#slPaymentDetailsCurrency").val(pCurrencyID);
        $("#txtPaymentDetailsExchangeRate").val($("#slPaymentDetailsCurrency option[value=" + pCurrencyID + "]").attr("MasterDataExchangeRate"));
        $("#lblPaymentDetailsShown").html(": " + $("#slBank option:selected").text().split(":")[0]);
        if (pCurrencyID == $("#hDefaultCurrencyID").val())
            $("#txtPaymentDetailsExchangeRate").attr("disabled", "disabled");
        else
            $("#txtPaymentDetailsExchangeRate").removeAttr("disabled");
    }
    if (pBankAccountID == "") //this means $("#slBank").val() is not selected
        swal("Sorry", "Please, select bank.");
    else {
        $("#hPaymentDetailsID").val(pPaymentDetailsID);
        $("#hBankAccountID").val(pBankAccountID);
        FadePageCover(true);
        $("#btnSavePaymentDetails").attr("onclick", "BankOpenBalance_Save();");
        jQuery("#PaymentDetailsModal").modal("show");
        CallGETFunctionWithParameters("/api/Payment/FillBankOpenBalanceModal"
            , { pPaymentDetailsID: $("#hPaymentDetailsID").val(), pBankAccountID: pBankAccountID, pCurrencyID: pCurrencyID }
            , function (pData) {
                var pBankOpenBalance = JSON.parse(pData[0]);
                if (pBankOpenBalance != null) {
                    $("#hPaymentDetailsID").val(pBankOpenBalance.ID); //for case i chose from btn new
                    $("#lblPaymentDetailsShown").html(": " + pBankOpenBalance.AccountName);
                    $("#slPaymentDetailsCurrency").val(pBankOpenBalance.CurrencyID);
                    $("#txtPaymentDetailsAmount").val(pBankOpenBalance.PRType == constPRTypeReceivable ? pBankOpenBalance.Amount : (-1 * pBankOpenBalance.Amount));
                    $("#txtPaymentDetailsExchangeRate").val(pBankOpenBalance.ExchangeRate);
                    $("#txtPaymentDetailsNotes").val(pBankOpenBalance.Notes == 0 ? "" : pBankOpenBalance.Notes);
                    if (pBankOpenBalance.CurrencyID == $("#hDefaultCurrencyID").val())
                        $("#txtPaymentDetailsExchangeRate").attr("disabled", "disabled");
                    else
                        $("#txtPaymentDetailsExchangeRate").removeAttr("disabled");
                }
                FadePageCover(false);
            }
            , null);
    }
}
function BankOpenBalance_Save() {
    debugger;
    if (ValidateForm("form", "PaymentDetailsModal")) {
        FadePageCover(true);
        pParametersWithValues = {
            pPaymentDetailsID: $("#hPaymentDetailsID").val()
            , pBankAccountID: $("#hBankAccountID").val()
            , pCurrencyID: $("#slPaymentDetailsCurrency").val()
            , pAmount: $("#txtPaymentDetailsAmount").val()
            , pExchangeRate: $("#txtPaymentDetailsExchangeRate").val()
            , pNotes: $("#txtPaymentDetailsNotes").val().trim() == "" ? "0" : $("#txtPaymentDetailsNotes").val().trim().toUpperCase()
        }
        CallGETFunctionWithParameters("/api/Payment/BankOpenBalance_Save", pParametersWithValues
            , function (pData) {
                BankOpenBalance_LoadingWithPaging();
                jQuery("#PaymentDetailsModal").modal("hide");
                swal("Success", "Saved successfully.");
                //FadePageCover(false);
            }
            , null);
    }
}
function BankOpenBalance_DeleteList() {
    debugger;
    var pPaymentDetailsIDsDeleted = GetAllSelectedIDsAsString('tblBankOpenBalance');
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
            CallGETFunctionWithParameters("/api/Payment/BankOpenBalance_DeleteList"
                , { pBankOpenBalanceIDsDeleted: pPaymentDetailsIDsDeleted }
                , function (pData) {
                    if (pData[0]) {
                        BankOpenBalance_LoadingWithPaging();
                    }
                    else
                        swal("Sorry", "An error occured, please refresh and then try again.");
                    FadePageCover(false);
                });
        });
}
