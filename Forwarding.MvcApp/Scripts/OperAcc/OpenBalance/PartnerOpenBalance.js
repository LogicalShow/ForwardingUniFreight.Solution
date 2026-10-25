function PartnerOpenBalance_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblPartnerOpenBalance");
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblPartnerOpenBalance",
            ("<tr ID='" + item.ID + "' "
                + (" ondblclick='PartnerOpenBalance_FillModal(" + item.ID + "," + item.PartnerTypeID + "," + item.PartnerID + "," + item.CurrencyID + ");' ")
                //+ (
                //    (item.IsApproved)
                //    ? ""//(" class='text-danger' ")
                //    : (" ondblclick='AccPartnerBalance_EditByDblClick(" + item.ID + ");' ")
                //    )
            + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AccPartnerBalanceID'> <input name='Delete'  type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PartnerTypeCode'>" + item.PartnerTypeCode + "</td>"
                    + "<td class='PartnerName'>" + item.PartnerName + "</td>"
                    + "<td class='Amount AccPartnerBalanceAmount'>" + (item.CreditAmount - item.DebitAmount).toFixed(2) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='ExchangeRate AccPartnerBalanceExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='hide'><a href='#AccPartnerBalanceModal' data-toggle='modal' onclick='PartnerOpenBalance_FillModal(" + item.ID + "," + item.PartnerTypeID + "," + item.PartnerID + "," + item.CurrencyID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPartnerOpenBalance", "AccPartnerBalanceID", "cbPartnerOpenBalanceDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePartnerOpenBalanceID");
    HighlightText("#tblPartnerOpenBalance>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PartnerOpenBalance_LoadingWithPaging() {
    debugger;
    var pWhereClause = PartnerOpenBalance_GetWhereClause();
    var pOrderBy = "PartnerTypeCode, PartnerName";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjectsForPartnerOpenBalance: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PartnerOpenBalance_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPartnerOpenBalance>tbody>tr", $("#txt-Search").val().trim());
}
//called by LoadDataWithPaging
function PartnerOpenBalance_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE TransactionType IN(" + constTransactionOpenCreditBalance + "," + constTransactionOpenDebitBalance + ")";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += " OR PartnerTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerType").val() != "") {
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
    }
    if ($("#slPartner").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerID = N'" + $("#slPartner").val() + "' ";
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function PartnerOpenBalance_FillModal(pAccPartnerBalanceID, pPartnerTypeID, pPartnerID, pCurrencyID) {
    debugger;
    ClearAll("#AccPartnerBalanceModal");
    if (pAccPartnerBalanceID == 0) { //This means called from the New btn
        pPartnerID = $("#slPartner").val();
        pPartnerTypeID = $("#slPartnerType").val();
        pCurrencyID = $("#slCurrency").val();
        $("#slAccPartnerBalanceCurrency").val(pCurrencyID);
        $("#txtAccPartnerBalanceExchangeRate").val($("#slAccPartnerBalanceCurrency option[value=" + $("#slCurrency").val() + "]").attr("MasterDataExchangeRate"));
        $("#lblAccPartnerBalanceShown").html(": " + $("#slPartner option:selected").text().split('(')[0] + ' / ' + $("#slCurrency option:selected").text());
        if (pCurrencyID == $("#hDefaultCurrencyID").val())
            $("#txtAccPartnerBalanceExchangeRate").attr("disabled", "disabled");
        else
            $("#txtAccPartnerBalanceExchangeRate").removeAttr("disabled");
    }
    if (pPartnerID == "" || pCurrencyID == "") //this means $("#slPartner").val() or $("#slCurrency").val() is not selected
        swal("Sorry", "Please, select Partner and currency.");
    else {
        $("#hAccPartnerBalanceID").val(pAccPartnerBalanceID);
        $("#hPartnerID").val(pPartnerID);
        $("#hPartnerTypeID").val(pPartnerTypeID);
        FadePageCover(true);
        $("#btnSaveAccPartnerBalance").attr("onclick", "PartnerOpenBalance_Save();");
        jQuery("#AccPartnerBalanceModal").modal("show");
        CallGETFunctionWithParameters("/api/Payment/FillPartnerOpenBalanceModal"
            , { pAccPartnerBalanceID: $("#hAccPartnerBalanceID").val(), pPartnerTypeID: pPartnerTypeID, pPartnerID: pPartnerID, pCurrencyID: pCurrencyID }
            , function (pData) {
                var pPartnerOpenBalance = JSON.parse(pData[0]);
                if (pPartnerOpenBalance != null) {
                    $("#hAccPartnerBalanceID").val(pPartnerOpenBalance.ID); //for case i chose from btn new
                    $("#lblAccPartnerBalanceShown").html(": " + pPartnerOpenBalance.PartnerName + ' / ' + pPartnerOpenBalance.CurrencyCode);
                    $("#slAccPartnerBalanceCurrency").val(pPartnerOpenBalance.CurrencyID);
                    $("#txtAccPartnerBalanceAmount").val(pPartnerOpenBalance.CreditAmount - pPartnerOpenBalance.DebitAmount);
                    $("#txtAccPartnerBalanceExchangeRate").val(pPartnerOpenBalance.ExchangeRate);
                    $("#txtAccPartnerBalanceNotes").val(pPartnerOpenBalance.Notes == 0 ? "" : pPartnerOpenBalance.Notes);
                    if (pPartnerOpenBalance.CurrencyID == $("#hDefaultCurrencyID").val())
                        $("#txtAccPartnerBalanceExchangeRate").attr("disabled", "disabled");
                    else
                        $("#txtAccPartnerBalanceExchangeRate").removeAttr("disabled");
                }
                FadePageCover(false);
            }
            , null);
    }
}
function PartnerOpenBalance_Save() {
    debugger;
    if (ValidateForm("form", "AccPartnerBalanceModal")) {
        FadePageCover(true);
        pParametersWithValues = {
            pAccPartnerBalanceID: $("#hAccPartnerBalanceID").val()
            , pPartnerTypeID: $("#hPartnerTypeID").val()
            , pPartnerID: $("#hPartnerID").val()
            , pCurrencyID: $("#slAccPartnerBalanceCurrency").val()
            , pAmount: $("#txtAccPartnerBalanceAmount").val()
            , pExchangeRate: $("#txtAccPartnerBalanceExchangeRate").val()
            , pNotes: $("#txtAccPartnerBalanceNotes").val().trim() == "" ? "0" : $("#txtAccPartnerBalanceNotes").val().trim().toUpperCase()
        }
        CallGETFunctionWithParameters("/api/Payment/PartnerOpenBalance_Save", pParametersWithValues
            , function (pData) {
                PartnerOpenBalance_LoadingWithPaging();
                jQuery("#AccPartnerBalanceModal").modal("hide");
                swal("Success", "Saved successfully.");
                //FadePageCover(false);
            }
            , null);
    }
}
function PartnerOpenBalance_DeleteList() {
    debugger;
    var pAccPartnerBalanceIDsDeleted = GetAllSelectedIDsAsString('tblPartnerOpenBalance');
    if (pAccPartnerBalanceIDsDeleted != "")
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
            CallGETFunctionWithParameters("/api/Payment/PartnerOpenBalance_DeleteList"
                , { pPartnerOpenBalanceIDsDeleted: pAccPartnerBalanceIDsDeleted }
                , function (pData) {
                    if (pData[0]) {
                        PartnerOpenBalance_LoadingWithPaging();
                    }
                    else
                        swal("Sorry", "An error occured, please refresh and then try again.");
                    FadePageCover(false);
                });
        });
}
function AccPartnerBalance_CurrencyChanged() {
    debugger;
    $("#txtAccPartnerBalanceExchangeRate").val($("#slAccPartnerBalanceCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slAccPartnerBalanceCurrency").val())
        $("#txtAccPartnerBalanceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtAccPartnerBalanceExchangeRate").removeAttr("disabled");
}
function PartnerOpenBalance_EmptyPartners() {
    $("#slPartner").html("<option value=''>Select Partner</option>");//to quickly empty
}
function PartnerOpenBalance_PartnerTypeChanged() {
    //debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    PartnerOpenBalance_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>Select Partner</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = PartnerOpenBalance_GetWhereClause();
    //var pOrderBy = "PartnerTypeCode, PartnerName"
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeIDForPartnerOpenBalance: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payment/PartnerOpenBalance_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        PartnerOpenBalance_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "Select Partner", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
