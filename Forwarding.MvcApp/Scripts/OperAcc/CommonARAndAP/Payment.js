function Payment_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblPayment");
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
    var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblPayment",
            ("<tr ID='" + item.ID + "' "
                //+ (" ondblclick='Payment_EditByDblClick(" + item.ID + ");' ")
                + (
                    (item.IsApproved)
                    ? (" class='text-primary' " + " ondblclick='Payment_EditByDblClick(" + item.ID + ");' ")
                    : (" ondblclick='Payment_EditByDblClick(" + item.ID + ");' ")
                    )
                + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Serial hide'>" + item.Serial + "</td>"
                    + "<td class='PaymentCode'>" + item.PaymentCode + "</td>"
                    + "<td class='PRType hide'>" + item.PRType + "</td>"
                    + "<td class='PartnerID' val=" + item.PartnerID + " >" + (item.PartnerID == 0 ? "" : item.PartnerName) + "</td>"
                    + "<td class='PartnerTypeID' val=" + item.PartnerTypeID + " >" + (item.PartnerTypeID == 0 ? "" : item.PartnerTypeCode) + "</td>"
                    + "<td class='ChargeTypeID' val=" + item.ChargeTypeID + ">" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeCode) + "</td>"
                    + "<td class='TreasuryID' val=" + item.TreasuryID + ">" + (item.TreasuryID == 0 ? "" : item.TreasuryName) + "</td>"
                    + "<td class='BankAccountID' val=" + item.BankAccountID + ">" + (item.BankAccountID == 0 ? "" : item.CompanyBankAccountName) + "</td>"
                    + "<td class='PaymentTypeID' val='" + item.PaymentTypeID + "'>" + item.PaymentTypeName + "</td>"
                    + "<td class='DealerName hide'>" + (item.DealerName == 0 ? "" : item.DealerName) + "</td>"
                    + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
                    + "<td class='ChequeOrVisaNo hide'>" + (item.ChequeOrVisaNo == 0 ? "" : item.ChequeOrVisaNo) + "</td>"
                    + "<td class='PaymentDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) + "</td>"
                    + "<td class='DueDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>"
                    + "<td class='TotalLocalAmount'>" + item.TotalLocalAmount.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val() + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' " + (item.IsApproved == true ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsGeneralExpense hide'> <input type='checkbox' disabled='disabled' " + (item.IsGeneralExpense == true ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsRefused hide'> <input type='checkbox' disabled='disabled' " + (item.IsRefused == true ? " checked='checked' " : "") + " /></td>"
                    + "<td class=''>"
                    //    + (item.IsCancelled
                    //        ? ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",0' + ");' " + restoreControlsText + "</a>")
                    //        //? ("<a href='#' " + ($("#hf_CanDelete").val() == 0 ? " disabled='disabled' " : " ") + (item.IsCancelled ? " disabled='disabled' " : " ") + cancelledControlsText + "</a>")
                    //        : ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",1' + ");' " + cancelControlsText + "</a>")
                    //      )
                    //    + "<a href='#'" + (item.IsCancelled ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                        + "<a href='#'" + "<a href='#'" + " onclick='Payment_Print(" + item.ID + ");' " + printControlsText + "</a>"
                    //    ////i disable notifications if its cancelled and not manager
                    //    //+ "<a href='#'" + (item.IsCancelled && !(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                    + "</td>"

                    + "<td class='hide'><a href='#PaymentModal' data-toggle='modal' onclick='Payment_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPayment", "PaymentID", "cbPaymentDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentID");
    HighlightText("#tblPayment>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Payment_LoadingWithPaging() {
    debugger;
    var pWhereClause = Payment_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Payment_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPayment>tbody>tr", $("#txt-Search").val().trim());
}
function Payment_PartnerTypeChanged() {
    //debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    Payment_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = Payment_GetWhereClause();
    //var pOrderBy = " ID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payment/Payment_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        Payment_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
//called by LoadDataWithPaging
function Payment_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE PaymentTypeID IS NOT NULL AND IsDeleted=0 AND PRType=" + glbPRType;
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PaymentCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PartnerTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR DealerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR TreasuryName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR ChargeTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PaymentTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
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
    if ($("#cbHideApprovedPayments").prop("checked"))
        pWhereClause += " AND IsApproved=0 ";
    return pWhereClause;
}
function Payment_ClearAllControls() {
    debugger;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    ClearAll("#PaymentModal");
    $("#tblPaymentDetails tbody tr").remove(); //to quickly empty it
    $("#slPaymentPartnerType").val("");
    $("#slPaymentPartner").val("");
    $("#slPaymentPartner option").removeClass("hide");
    $("#slPaymentType").val(constPaymentTypeCash);
    $("#txtPaymentDate").val(FormattedTodaysDate);
    $("#txtDueDate").val(FormattedTodaysDate);
    Payment_cbIsGeneralExpenseChanged();
    Payment_SetPaymentTypeProperties();
    Payment_SetIsApprovedProperties(false);
    $("#btnSavePayment").attr("onclick", "swal('Sorry', 'Enter payment details first.');");
    $("#btnSavePaymentAndPrint").attr("onclick", "swal('Sorry', 'Enter payment details first.');");
}
function Payment_EditByDblClick(pID) {
    debugger;
    FadePageCover(false);
    jQuery("#PaymentModal").modal("show");
    ClearAll("#PaymentModal");
    $("#tblPaymentDetails tbody tr").html(""); //to quickly empty it
    var pParametersWithValues = { pPaymentIDForModal: pID };
    CallGETFunctionWithParameters("/api/Payment/Payment_LoadItem"
        , pParametersWithValues
        , function (pData) {
            var pPaymentHeader = JSON.parse(pData[0]);
            $("#hPaymentID").val(pPaymentHeader.ID);
            $("#lblPaymentShown").html(": " + pPaymentHeader.PaymentCode);
            $("#txtCode").val(pPaymentHeader.PaymentCode);
            $("#slPaymentPartnerType").val(pPaymentHeader.PartnerTypeID == 0 ? "" : pPaymentHeader.PartnerTypeID);
            ////$("#slPaymentPartner").val(pPaymentHeader.PartnerID);
            ////i used this insead of the previous line coz PartnerID is repeated for different partners
            //$("#slPaymentPartner").prop("selectedIndex", $("#slPaymentPartner option[PartnerTypeID=" + pPaymentHeader.PartnerTypeID + "][value=" + pPaymentHeader.PartnerID + "]").index());
            Payment_ModalPartnerTypeChanged(function () { $("#slPaymentPartner").val(pPaymentHeader.PartnerID); });

            $("#slPaymentChargeType").val(pPaymentHeader.ChargeTypeID == 0 ? "" : pPaymentHeader.ChargeTypeID);
            $("#slPaymentTreasury").val(pPaymentHeader.TreasuryID == 0 ? "" : pPaymentHeader.TreasuryID);
            $("#slPaymentType").val(pPaymentHeader.PaymentTypeID);
            $("#txtPaymentDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPaymentHeader.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.PaymentDate)));
            $("#txtDueDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPaymentHeader.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.DueDate)));
            //set after binding details tblRows //$("#txtTotalLocalAmount").val(pPaymentHeader.TotalLocalAmount + ' ' + $("#hDefaultCurrencyCode").val()); 
            $("#txtDealerName").val(pPaymentHeader.DealerName == 0 ? "" : pPaymentHeader.DealerName);
            $("#txtBankName").val(pPaymentHeader.BankName == 0 ? "" : pPaymentHeader.BankName);
            $("#txtChequeOrVisaNo").val(pPaymentHeader.ChequeOrVisaNo == 0 ? "" : pPaymentHeader.ChequeOrVisaNo);
            $("#slPaymentBankAccount").val(pPaymentHeader.BankAccountID == 0 ? "" : pPaymentHeader.BankAccountID);
            $("#txtPaymentNotes").val(pPaymentHeader.Notes == 0 ? "" : pPaymentHeader.Notes);
            $("#txtWithHoldingTax").val(pPaymentHeader.WithHoldingTax);
            $("#cbIsGeneralExpense").prop("checked", pPaymentHeader.IsGeneralExpense);
            $("#cbIsRefused").prop("checked", pPaymentHeader.IsRefused);
            //if (pPaymentHeader.PRType == constPRTypePayable) $("#divIsGeneralExpense").removeClass("hide"); else $("#divIsGeneralExpense").addClass("hide");
            Payment_cbIsGeneralExpenseChanged();
            Payment_SetPaymentTypeProperties();
            Payment_SetIsApprovedProperties(pPaymentHeader.IsApproved);
            $("#btnSavePayment").attr("onclick", "Payment_Update(false, false);");
            $("#btnSavePaymentAndPrint").attr("onclick", "Payment_Update(false, true);");
            PaymentDetails_BindTableRows(JSON.parse(pData[1]));
            FadePageCover(false);
        }
        , null);
}
function Payment_Update(pSaveAndNew, pPrint) {
    debugger;
    if ($("#slPaymentBankAccount").val() != "" && !Payment_IsValidBankAccountCurrency())
        swal("Sorry", "The bank account currency doesn't match the entered payment details.");
    else if (ValidateForm("form", "PaymentModal")) {
        var pParametersWithValues = {
            //Header
            pPaymentID: $("#hPaymentID").val() == "" ? 0 : $("#hPaymentID").val()
            , pPRType: glbPRType
            , pPaymentTypeID: $("#slPaymentType").val()
            , pPaymentDate: $("#txtPaymentDate").val()
            , pDueDate: $("#txtDueDate").val()
            , pChargeTypeID: $("#slPaymentChargeType").val() == "" ? 0 : $("#slPaymentChargeType").val()
            , pTreasuryID: $("#slPaymentTreasury").val() == "" ? 0 : $("#slPaymentTreasury").val()
            , pPartnerTypeID: $("#slPaymentPartnerType").val() == "" ? 0 : $("#slPaymentPartnerType").val() //$("#slPaymentPartner option:selected").attr("PartnerTypeID") == undefined ? 0 : $("#slPaymentPartner option:selected").attr("PartnerTypeID")
            , pPartnerID: $("#slPaymentPartner").val() == "" ? 0 : $("#slPaymentPartner").val()
            , pDealerName: $("#txtDealerName").val().trim() == "" ? "0" : $("#txtDealerName").val().trim().toUpperCase()
            , pTotalLocalAmount: parseFloat(Payment_CalculateTotalLocalAmount())
            , pBankName: $("#txtBankName").val().trim() == "" ? "0" : $("#txtBankName").val().trim().toUpperCase()
            , pChequeOrVisaNo: $("#txtChequeOrVisaNo").val().trim() == "" ? "0" : $("#txtChequeOrVisaNo").val().trim().toUpperCase()
            , pBankAccountID: $("#slPaymentBankAccount").val() == "" ? 0 : $("#slPaymentBankAccount").val()
            , pPaymentNotes: $("#txtPaymentNotes").val().trim() == "" ? "0" : $("#txtPaymentNotes").val().trim().toUpperCase()
            , pIsGeneralExpense: $("#cbIsGeneralExpense").prop("checked")
            , pIsRefused: $("#cbIsRefused").prop("checked")
            , pWithHoldingTax: $("#txtWithHoldingTax").val().trim() == "" ? "0" : $("#txtWithHoldingTax").val().trim()
            //LoadWithPaging parameters
            , pWhereClausePayment: Payment_GetWhereClause()
            , pPageSize: $("#select-page-size").val()
            , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID DESC"
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Payment/Payment_Update", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    Payment_BindTableRows(JSON.parse(pData[1])); //pTblPayment: pData[1]
                    if (pPrint)
                        Payment_Print($("#hPaymentID").val());
                    if (pSaveAndNew)
                        Payment_ClearAllControls();
                    else
                        jQuery("#PaymentModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function Payment_cbIsGeneralExpenseChanged() {
    debugger;
    if ($("#cbIsGeneralExpense").prop("checked")) {

        $("#divPaymentChargeType").removeClass("hide");
        $("#slPaymentChargeType").attr("data-required", true);

        $("#divPaymentPartnerType").addClass("hide");
        $("#slPaymentPartnerType").attr("data-required", false);
        $("#slPaymentPartnerType").val("");

        $("#divPaymentPartner").addClass("hide");
        $("#slPaymentPartner").attr("data-required", false);
        $("#slPaymentPartner").val("");

        //$("#divDealerName").addClass("hide");
        //$("#txtDealerName").attr("data-required", false);
        //$("#txtDealerName").val("");
    }
    else {
        $("#divPaymentChargeType").addClass("hide");
        $("#slPaymentChargeType").attr("data-required", false);
        $("#slPaymentChargeType").val("");

        $("#divPaymentPartnerType").removeClass("hide");
        $("#slPaymentPartnerType").attr("data-required", true);

        $("#divPaymentPartner").removeClass("hide");
        $("#slPaymentPartner").attr("data-required", true);

        //$("#divDealerName").removeClass("hide");
        //$("#txtDealerName").attr("data-required", true);
    }
}
function Payment_SetPaymentTypeProperties() {
    debugger;
    if ($("#slPaymentType").val() == constPaymentTypeCash) { //Cash
        $("#divTreasury").removeClass("hide");
        $("#slPaymentTreasury").attr("data-required", true);

        $("#divSlBankAccount").addClass("hide");
        $("#slPaymentBankAccount").attr("data-required", false);
        $("#slPaymentBankAccount").val("");
        
        $("#divChequeOrVisaNo").addClass("hide");
        $("#txtChequeOrVisaNo").attr("data-required", false);
        $("#txtChequeOrVisaNo").val("");

        $("#lblDueDate").html("Date"); //$("#divDueDate").addClass("hide");
        $("#divIsRefused").addClass("hide");
        $("#cbIsRefused").prop("checked", false);

        $("#slPaymentDetailsCurrency").removeAttr("disabled");
    }
    else if ($("#slPaymentType").val() == constPaymentTypeCheque) { //Cheque
        $("#divTreasury").addClass("hide");
        $("#slPaymentTreasury").attr("data-required", false);
        $("#slPaymentTreasury").val("");

        $("#divSlBankAccount").removeClass("hide");
        $("#slPaymentBankAccount").attr("data-required", true);

        $("#divChequeOrVisaNo").removeClass("hide");
        $("#txtChequeOrVisaNo").attr("data-required", true);

        $("#lblDueDate").html("Due Date"); //$("#divDueDate").removeClass("hide");
        $("#divIsRefused").removeClass("hide");
        
        $("#slPaymentDetailsCurrency").attr("disabled", "disabled");
    }
    else { //NOT Cash and NOT Cheque
        $("#divTreasury").addClass("hide");
        $("#slPaymentTreasury").attr("data-required", false);
        $("#slPaymentTreasury").val("");

        $("#divSlBankAccount").removeClass("hide");
        $("#slPaymentBankAccount").attr("data-required", true);
        
        $("#divChequeOrVisaNo").removeClass("hide");
        $("#txtChequeOrVisaNo").attr("data-required", true);

        $("#lblDueDate").html("Due Date"); //$("#divDueDate").removeClass("hide");
        $("#divIsRefused").addClass("hide");
        $("#cbIsRefused").prop("checked", false);

        $("#slPaymentDetailsCurrency").attr("disabled", "disabled");
    }
}
function Payment_SetIsApprovedProperties(pIsApproved) {
    debugger;
    if (pIsApproved) {
        $("#slPaymentPartnerType").attr("disabled", "disabled");
        $("#slPaymentPartner").attr("disabled", "disabled");
        $("#slPaymentChargeType").attr("disabled", "disabled");
        $("#slPaymentTreasury").attr("disabled", "disabled");
        $("#slPaymentType").attr("disabled", "disabled");
        $("#txtPaymentDate").attr("disabled", "disabled");
        $("#txtDueDate").attr("disabled", "disabled");
        $("#txtDealerName").attr("disabled", "disabled");
        $("#txtBankName").attr("disabled", "disabled");
        $("#txtChequeOrVisaNo").attr("disabled", "disabled");
        $("#slPaymentBankAccount").attr("disabled", "disabled");
        $("#txtPaymentNotes").attr("disabled", "disabled");
        $("#cbIsGeneralExpense").attr("disabled", "disabled");
        $("#cbIsRefused").attr("disabled", "disabled");

        $("#btnSavePayment").attr("disabled", "disabled");
        $("#btnSavePaymentAndPrint").attr("disabled", "disabled"); 
        $("#btn-AddPaymentDetails").attr("disabled", "disabled");
    }
    else {
        $("#slPaymentPartnerType").removeAttr("disabled");
        $("#slPaymentPartner").removeAttr("disabled");
        $("#slPaymentChargeType").removeAttr("disabled");
        $("#slPaymentTreasury").removeAttr("disabled");
        $("#slPaymentType").removeAttr("disabled");
        $("#txtPaymentDate").removeAttr("disabled");
        $("#txtDueDate").removeAttr("disabled");
        $("#txtDealerName").removeAttr("disabled");
        $("#txtBankName").removeAttr("disabled");
        $("#txtChequeOrVisaNo").removeAttr("disabled");
        $("#slPaymentBankAccount").removeAttr("disabled");
        $("#txtPaymentNotes").removeAttr("disabled");
        $("#cbIsGeneralExpense").removeAttr("disabled");
        $("#cbIsRefused").removeAttr("disabled");

        $("#btnSavePayment").removeAttr("disabled");
        $("#btnSavePaymentAndPrint").removeAttr("disabled");
        $("#btn-AddPaymentDetails").removeAttr("disabled");
    }
}
function Payment_ModalPartnerTypeChanged(pCallback) {
    //debugger;
    //$("#slPaymentPartner").val("");
    //$("#slPaymentPartner option").removeClass("hide");
    //$("#slPaymentPartner option[PartnerTypeID!=" + $("#slPaymentPartnerType").val() + "][value!=''" + "]").addClass("hide");
    $("#txtDealerName").val("");
    debugger;
    $("#slPaymentPartner").html("<option value=''>Select Partner</option>");//to quickly empty
    if ($("#slPaymentPartnerType").val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Payment/FillPartners", { pPartnerTypeID: $("#slPaymentPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "Select Partner", "slPaymentPartner", pData[0], pCallback);
                FadePageCover(false);
            }
            , null);
    }
}
function Payment_PartnerChanged() {
    debugger;
    if ($("#slPaymentPartner").val() == "")
        $("#txtDealerName").val("");
    else
        $("#txtDealerName").val($("#slPaymentPartner option:selected").text().split('(')[0]);
}
function Payment_IsValidBankAccountCurrency() {
    debugger;
    var IsValid = true;
    if ($("#slPaymentBankAccount").val() != "" && $("#tblPaymentDetails tbody tr").length > 0)
        for (var i = 1; i <= $("#tblPaymentDetails tbody tr").length; i++)
            if ($("#slPaymentBankAccount option:selected").attr("CurrencyID") != $("#tblPaymentDetails tbody tr:nth-child(" + i + ") td.CurrencyID").attr("val"))
                IsValid = false;
    return IsValid;
}
function Payment_CalculateTotalLocalAmount() {
    debugger;
    var decTotalLocalAmount = 0;
    $(".PaymentDetailsAmount").each(function () {
        var value = $(this).text();
        var valExchangeRate = $(this.parentElement.getElementsByClassName('PaymentDetailsExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalLocalAmount += parseFloat(value) * parseFloat(valExchangeRate);
        }
    });
    $("#txtTotalLocalAmount").val(decTotalLocalAmount.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val());
    return decTotalLocalAmount.toFixed(4);
}
function Payment_DeleteList() {
    debugger;
    //Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblPayment').split(',').length > 1)
    //    swal("Sorry", "You can delete just one payment at a time.");
    //else
        if (GetAllSelectedIDsAsString('tblPayment') != "")
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
            CallGETFunctionWithParameters("/api/Payment/Payment_Delete"
                , {
                    pPaymentIDsDeleted: GetAllSelectedIDsAsString('tblPayment')
                    , pWhereClausePayment: Payment_GetWhereClause() //"WHERE IsDeleted=0"
                    , pPageSize: $("#select-page-size").val()
                    , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID DESC"
                }
                , function (pData) {
                    if (pData[0]) {
                        //Payment_BindTableRows(JSON.parse(pData[1]));
                        Payment_LoadingWithPaging();
                    }
                    else
                        swal("Sorry", "An error occured, please refresh and then try again.");
                    FadePageCover(false);
                });
        });
}
function Payment_Print(pID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Payment/Payment_LoadItem"
        , { pPaymentIDForModal: pID }
        , function (pData) {
            var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
            var pPaymentHeader = JSON.parse(pData[0]);
            var pPaymentDetails = JSON.parse(pData[1]);

            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>Payment</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#hDefaultUnEditableCompanyName").val() == 'LAT' ? 'CompanyHeader-LATT.jpg' : 'CompanyHeader.jpg') + '" alt="logo"/></div>';
            if (pPaymentHeader.PRType == constPRTypeReceivable)
                ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Receipt No. ' + pPaymentHeader.PaymentCode + '</h3></div>';
            else
                ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Payment No. ' + pPaymentHeader.PaymentCode + '</h3></div>';
            
            ////ReportHTML += '             <div class="col-xs-3 m-t"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            ReportHTML += '             <div class="col-xs-3 m-t"><b>Date :</b> ' + ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.CreationDate)) + '</div>';

            if ($("#hDefaultUnEditableCompanyName").val() == 'LAT')
                ReportHTML += '             <div class="col-xs-2 m-t"><b>Cur :</b> ' + pPaymentDetails[0].CurrencyCode + '</div>';
            if (pPaymentHeader.IsGeneralExpense)
                ReportHTML += '             <div class="col-xs-7 m-t"><b>Expense : </b>' + pPaymentHeader.ChargeTypeName + '</div>';
            else if (pPaymentHeader.PRType == constPRTypeReceivable)
                ReportHTML += '             <div class="col-xs-7 m-t"><b>Received From : </b>' + pPaymentHeader.PartnerName + '</div>';
            else
                ReportHTML += '             <div class="col-xs-7 m-t"><b>Partner : </b>' + pPaymentHeader.PartnerName + '</div>';

            ReportHTML += '             <div style="clear:both;"></div>';
            ReportHTML += '             <div class="col-xs-12 text-ul"><h5><b>Payment Details : </b></h5>' + '</div>';
            
            ReportHTML += '             <div class="col-xs-12 clear">'
            ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            ReportHTML += '                     <thead>';
            ReportHTML += '                         <td>';
            ReportHTML += '                             <div class="col-xs-6 text-left"><b>Branch: ' + '</b>' + pPaymentHeader.BranchName + '</div>';
            //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Payment Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.PaymentDate)) + '</div>';
            ReportHTML += '                             <div class="col-xs-6 text-left"><b>Due Date: ' + '</b>' + ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.DueDate)) + '</div>';
            if (pPaymentHeader.PRType == constPRTypeReceivable)
                ReportHTML += '                         <div class="col-xs-6 text-left"><b>Paid By: ' + '</b>' + pPaymentHeader.DealerName + '</div>';
            else //operation payable or general expense
                ReportHTML += '                         <div class="col-xs-6 text-left"><b>Paid To: ' + '</b>' + pPaymentHeader.DealerName + '</div>';
            ReportHTML += '                             <div class="col-xs-6 text-left"><b>Payment Type: ' + '</b>' + pPaymentHeader.PaymentTypeName + '</div>';
            if (pPaymentHeader.PaymentTypeID == constPaymentTypeCash)
                ReportHTML += '                             <div class="col-xs-6 text-left"><b>Treasury: ' + '</b>' + pPaymentHeader.TreasuryName + '</div>';
            if (pPaymentHeader.PaymentTypeID != constPaymentTypeCash && pPaymentHeader.PaymentTypeID != constPaymentTypeCredit) {
                ReportHTML += '                         <div class="col-xs-6 text-left"><b>Bank: ' + '</b>' + (pPaymentHeader.BankName == 0 ? "" : pPaymentHeader.BankName) + '</div>';
                if (pPaymentHeader.PaymentTypeID == constPaymentTypeCheque)
                    ReportHTML += '                     <div class="col-xs-6 text-left"><b>Cheque No.: ' + '</b>' + (pPaymentHeader.ChequeOrVisaNo == 0 ? "" : pPaymentHeader.ChequeOrVisaNo) + '</div>';
                if (pPaymentHeader.PaymentTypeID == constPaymentTypeVisa)
                    ReportHTML += '                     <div class="col-xs-6 text-left"><b>Visa No.: ' + '</b>' + (pPaymentHeader.ChequeOrVisaNo == 0 ? "" : pPaymentHeader.ChequeOrVisaNo) + '</div>';
                if (pPaymentHeader.PaymentTypeID == constPaymentTypeBankDeposit || pPaymentHeader.PaymentTypeID == constPaymentTypeBankTransfer)
                    ReportHTML += '                     <div class="col-xs-6 text-left"><b>Ref. No.: ' + '</b>' + (pPaymentHeader.ChequeOrVisaNo == 0 ? "" : pPaymentHeader.ChequeOrVisaNo) + '</div>';
            }
            if (pPaymentHeader.PRType == constPRTypeReceivable)
                ReportHTML += '                             <div class="col-xs-6 text-left"><b>With Holding Tax: ' + '</b>' + (pPaymentHeader.WithHoldingTax) + '</div>';
            ReportHTML += '                             <div class="col-xs-6 text-left"><b>Created By: ' + '</b>' + (pPaymentHeader.CreatorName) + '</div>';
            ReportHTML += '                             <div class="col-xs-6 text-left"><b>Notes: ' + '</b>' + (pPaymentHeader.Notes == 0 ? "" : pPaymentHeader.Notes) + '</div>';
            ReportHTML += '                         </td>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                 </table>';
            ReportHTML += '             </div>'

            ReportHTML += '             <div class="col-xs-12 clear">'
            ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
            ReportHTML += '                     <thead>';
            ReportHTML += '                         <tr>';
            ReportHTML += '                             <th>Amount</th>';
            ReportHTML += '                             <th>Currency</th>';
            ReportHTML += '                             <th>Notes</th>';
            ReportHTML += '                             <th class="">Only</th>';
            ReportHTML += '                         </tr>';
            ReportHTML += '                     </thead>';
            ReportHTML += '                     <tbody>';
            var _Total = 0;
            $.each(pPaymentDetails, function (i, item) {
                _Total += item.Amount;
                ReportHTML += '                     <tr class="input-md" style="font-size:95%;">';
                ReportHTML += '                         <td>' + item.Amount + '</td>';
                ReportHTML += '                         <td class="Cur">' + item.CurrencyCode + '</td>';
                ReportHTML += '                         <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Amount.toFixed(4)) + ' ' + item.CurrencyCode + '</td>';
                ReportHTML += '                     </tr>';
            });
            
            //ReportHTML += '                         <tr>';
            //ReportHTML += '                             <td colspan=2>' + '<b>LOCAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pPaymentHeader.TotalLocalAmount.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
            //ReportHTML += '                             <td><b>Local Amount : ' + pPaymentHeader.TotalLocalAmount.toFixed(4) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
            //ReportHTML += '                         </tr>';
            ReportHTML += '                     </tbody>';
            ReportHTML += '                 </table>';
            if ($("#hDefaultUnEditableCompanyName").val() == 'LAT') { //assumes all currencies are the same
                if (pPaymentHeader.PRType == constPRTypeReceivable)
                    _Total = _Total - pPaymentHeader.WithHoldingTax;
                ReportHTML += '             <div class="col-xs-12"><b>Total :</b> ' + _Total.toFixed(2) + ' ' + pPaymentDetails[0].CurrencyCode + ' <b> ONLY :</b>' + toWords_WithFractionNumbers(_Total.toFixed(2)) + ' ' + pPaymentDetails[0].CurrencyCode + '</div>';
            }
            //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pPaymentHeader.AvailableBalance + '</div>';
            ReportHTML += '             <div style="clear:both;"></div>';
            ReportHTML += '                 <div class="col-xs-8">&emsp;</div>';
            ReportHTML += '                 <div class="col-xs-4 text-center"><b><i>Signature & Stamp</i></b></div>';
            ReportHTML += '                 <div class="col-xs-8">&emsp;</div>';
            ReportHTML += '                 <div class="col-xs-4 text-center"><b><i>' + $("#hLoggedUserNameNotLogin").val() + '</i></b></div>';
            ReportHTML += '             </div>'

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            if (pPaymentHeader.PRType == constPRTypeReceivable)
                ReportHTML += '         <div class="row text-right m-r">' + '  لا يعتد به كمستند للسداد بدون ختم الشركة  ' + '</div>';
            //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
            //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
            //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';
            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();

            FadePageCover(false);
        }
        , null);
}
/****************************************PaymentDetails******************************************/
function PaymentDetails_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblPaymentDetails");
    //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
    var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
    var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblPaymentDetails",
            ("<tr ID='" + item.ID + "' "
                //+ (" ondblclick='PaymentDetails_EditByDblClick(" + item.ID + ");' ")
                + (
                    (item.IsApproved)
                    ? ""//(" class='text-danger' ")
                    : (" ondblclick='PaymentDetails_EditByDblClick(" + item.ID + ");' ")
                    )
                + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentDetailsID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID hide'>" + item.PaymentID + "</td>"
                    + "<td class='Amount PaymentDetailsAmount'>" + item.Amount.toFixed(4) + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='ExchangeRate PaymentDetailsExchangeRate'>" + item.ExchangeRate + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    ////Note:Restore may coz ticket no. duplication so i opened notifications and prevented Restore
                    //+ "<td class=''>"
                    //    + (item.IsCancelled
                    //        ? ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",0' + ");' " + restoreControlsText + "</a>")
                    //        //? ("<a href='#' " + ($("#hf_CanDelete").val() == 0 ? " disabled='disabled' " : " ") + (item.IsCancelled ? " disabled='disabled' " : " ") + cancelledControlsText + "</a>")
                    //        : ("<a href='#' " + (!(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? " disabled='disabled' " : " ") + " onclick='ARF_CancelOrRestore(" + item.ID + ',"' + item.CustomerName + '",1' + ");' " + cancelControlsText + "</a>")
                    //      )
                    //    + "<a href='#'" + (item.IsCancelled ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                    //    ////i disable notifications if its cancelled and not manager
                    //    //+ "<a href='#'" + (item.IsCancelled && !(IsDeptManagerRoleID || IsFinancialManagerID || IsGeneralManagerRoleID) ? "disabled='disabled' " : " ") + " onclick='Notification_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + notificationsControlsText + "</a>" + "<a href='#'" + (item.IsCancelled ? " disabled='disabled' " : " ") + " onclick='Cashier_ARF_FillControls(" + item.ID + ',' + item.FormNo + "," + "10" + ");' " + printControlsText + "</a>"
                    //+ "</td>"

                    + "<td class='hide'><a href='#PaymentDetailsModal' data-toggle='modal' onclick='PaymentDetails_EditByDblClick(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblPaymentDetails", "PaymentDetailsID", "cbPaymentDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentDetailsID");
    //HighlightText("#tblPaymentDetails>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    Payment_CalculateTotalLocalAmount();
}
function PaymentDetails_ClearAllControls() {
    debugger;
    if ($("#slPaymentBankAccount").val() != "" && !Payment_IsValidBankAccountCurrency())
        swal("Sorry", "The bank account currency doesn't match the entered payment details.");
    else if (ValidateForm("form", "PaymentModal")) {
        jQuery("#PaymentDetailsModal").modal("show");
        ClearAll("#PaymentDetailsModal");
        //$("#slPaymentDetailsCurrency").val($("#hDefaultCurrencyID").val());
        $("#slPaymentDetailsCurrency").val($("#slPaymentType").val() == constPaymentTypeCash ? $("#hDefaultCurrencyID").val() : $("#slPaymentBankAccount option:selected").attr("CurrencyID"));
        $("#txtPaymentDetailsExchangeRate").val(1);

        $("#tblPaymentDetails tbody tr").html();
        PaymentDetails_CurrencyChanged();
        Payment_SetIsApprovedProperties(false);
        $("#btnSavePaymentDetails").attr("onclick", "PaymentDetails_Insert(false);");
        $("#btnSaveAndNewPaymentDetails").attr("onclick", "PaymentDetails_Insert(true);");
    }
}
function PaymentDetails_EditByDblClick(pID) {
    debugger;
    if ($("#slPaymentBankAccount").val() != "" && !Payment_IsValidBankAccountCurrency())
        swal("Sorry", "The bank account currency doesn't match the entered payment details.");
    else if (ValidateForm("form", "PaymentModal")) {
        jQuery("#PaymentDetailsModal").modal("show");
        tr = $("#tblPaymentDetails tr[id=" + pID + "]");

        $("#hPaymentDetailsID").val(pID);
        $("#txtPaymentDetailsAmount").val(tr.find("td.Amount").text());
        $("#slPaymentDetailsCurrency").val(tr.find("td.CurrencyID").attr("val"));
        $("#txtPaymentDetailsExchangeRate").val(tr.find("td.ExchangeRate").text());
        $("#txtPaymentDetailsNotes").val(tr.find("td.Notes").text());

        PaymentDetails_CurrencyChanged();
        $("#btnSavePaymentDetails").attr("onclick", "PaymentDetails_Update(false);");
        $("#btnSaveAndNewPaymentDetails").attr("onclick", "PaymentDetails_Update(true);");
    }
}
function PaymentDetails_Insert(pSaveAndNew) {
    debugger;
    if ($("#txtPaymentDetailsAmount").val() == 0 || $("#txtPaymentDetailsExchangeRate").val() == 0)
        swal("Sorry", "Please, enter a valid amount and exchange rate.");
    else if (ValidateForm("form", "PaymentDetailsModal")) {
        var pParametersWithValues = {
            //Header
            pPaymentID: $("#hPaymentID").val() == "" ? 0 : $("#hPaymentID").val()
            , pBranchID: $("#hUserBranchID").val()
            , pPRType: glbPRType
            , pPaymentTypeID: $("#slPaymentType").val()
            , pPaymentDateForInsert: ConvertDateFormat($("#txtPaymentDate").val()) //coz of datetime settings of some some sql servers in 
            , pPaymentDateForUpdate: $("#txtPaymentDate").val()
            , pDueDateForInsert: ConvertDateFormat($("#txtDueDate").val()) //coz of datetime settings of some some sql servers in 
            , pDueDateForUpdate: $("#txtDueDate").val()
            , pChargeTypeID: $("#slPaymentChargeType").val() == "" ? 0 : $("#slPaymentChargeType").val()
            , pTreasuryID: $("#slPaymentTreasury").val() == "" ? 0 : $("#slPaymentTreasury").val()
            , pPartnerTypeID: $("#slPaymentPartnerType").val() == "" ? 0 : $("#slPaymentPartnerType").val()//$("#slPaymentPartner option:selected").attr("PartnerTypeID") == undefined ? 0 : $("#slPaymentPartner option:selected").attr("PartnerTypeID")
            , pPartnerID: $("#slPaymentPartner").val() == "" ? 0 : $("#slPaymentPartner").val()
            , pDealerName: $("#txtDealerName").val().trim() == "" ? "0" : $("#txtDealerName").val().trim().toUpperCase()
            , pTotalLocalAmount: (parseFloat(Payment_CalculateTotalLocalAmount()) + parseFloat($("#txtPaymentDetailsAmount").val().trim()) * parseFloat($("#txtPaymentDetailsExchangeRate").val()))
            , pBankName: $("#txtBankName").val().trim() == "" ? "0" : $("#txtBankName").val().trim().toUpperCase()
            , pChequeOrVisaNo: $("#txtChequeOrVisaNo").val().trim() == "" ? "0" : $("#txtChequeOrVisaNo").val().trim().toUpperCase()
            , pBankAccountID: $("#slPaymentBankAccount").val() == "" ? 0 : $("#slPaymentBankAccount").val()
            , pPaymentNotes: $("#txtPaymentNotes").val().trim() == "" ? "0" : $("#txtPaymentNotes").val().trim().toUpperCase()
            , pIsGeneralExpense: $("#cbIsGeneralExpense").prop("checked")
            , pIsRefused: $("#cbIsRefused").prop("checked")
            , pWithHoldingTax: $("#txtWithHoldingTax").val().trim() == "" ? "0" : $("#txtWithHoldingTax").val().trim()
            //LoadWithPaging parameters
            , pWhereClausePayment: Payment_GetWhereClause()
            , pPageSize: $("#select-page-size").val()
            , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID DESC"
            //PaymentDetails
            , pPaymentDetailsAmount: $("#txtPaymentDetailsAmount").val().trim() == "" ? "0" : $("#txtPaymentDetailsAmount").val().trim().toUpperCase()
            , pPaymentDetailsCurrencyID: $("#slPaymentDetailsCurrency").val()
            , pPaymentDetailsExchangeRate: $("#txtPaymentDetailsExchangeRate").val().trim() == "" ? "0" : $("#txtPaymentDetailsExchangeRate").val().trim().toUpperCase()
            , pPaymentDetailsNotes: $("#txtPaymentDetailsNotes").val().trim() == "" ? "0" : $("#txtPaymentDetailsNotes").val().trim().toUpperCase()
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Payment/PaymentDetails_Insert", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    $("#hPaymentID").val(pData[1]);
                    $("#txtCode").val(pData[2]);
                    PaymentDetails_BindTableRows(JSON.parse(pData[3])); //pTblPaymentDetails: pData[3]
                    Payment_BindTableRows(JSON.parse(pData[4])); //pTblPayment: pData[4]
                    if (pSaveAndNew)
                        PaymentDetails_ClearAllControls();
                    else
                        jQuery("#PaymentDetailsModal").modal("hide");
                    $("#btnSavePayment").attr("onclick", "Payment_Update(false, false);");
                    $("#btnSavePaymentAndPrint").attr("onclick", "Payment_Update(false, true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function PaymentDetails_Update(pSaveAndNew) {
    debugger;
    if ($("#txtPaymentDetailsAmount").val() == 0 || $("#txtPaymentDetailsExchangeRate").val() == 0)
        swal("Sorry", "Please, enter a valid amount and exchange rate.");
    else if (ValidateForm("form", "PaymentDetailsModal")) {
        var pParametersWithValues = {
            //Header
            pPaymentID: $("#hPaymentID").val() == "" ? 0 : $("#hPaymentID").val()
            , pPRType: glbPRType
            , pPaymentTypeID: $("#slPaymentType").val()
            , pPaymentDate: $("#txtPaymentDate").val()
            , pDueDate: $("#txtDueDate").val()
            , pChargeTypeID: $("#slPaymentChargeType").val() == "" ? 0 : $("#slPaymentChargeType").val()
            , pTreasuryID: $("#slPaymentTreasury").val() == "" ? 0 : $("#slPaymentTreasury").val()
            , pPartnerTypeID: $("#slPaymentPartnerType").val() == "" ? 0 : $("#slPaymentPartnerType").val()
            , pPartnerID: $("#slPaymentPartner").val() == "" ? 0 : $("#slPaymentPartner").val()
            , pDealerName: $("#txtDealerName").val().trim() == "" ? "0" : $("#txtDealerName").val().trim().toUpperCase()
            //calculated in the controller//, pTotalLocalAmount: (parseFloat(Payment_CalculateTotalLocalAmount()) + parseFloat($("#txtPaymentDetailsAmount").val().trim()) * parseFloat($("#txtPaymentDetailsExchangeRate").val()))
            , pBankName: $("#txtBankName").val().trim() == "" ? "0" : $("#txtBankName").val().trim().toUpperCase()
            , pChequeOrVisaNo: $("#txtChequeOrVisaNo").val().trim() == "" ? "0" : $("#txtChequeOrVisaNo").val().trim().toUpperCase()
            , pBankAccountID: $("#slPaymentBankAccount").val() == "" ? 0 : $("#slPaymentBankAccount").val()
            , pPaymentNotes: $("#txtPaymentNotes").val().trim() == "" ? "0" : $("#txtPaymentNotes").val().trim().toUpperCase()
            , pIsGeneralExpense: $("#cbIsGeneralExpense").prop("checked")
            , pIsRefused: $("#cbIsRefused").prop("checked")
            , pWithHoldingTax: $("#txtWithHoldingTax").val().trim() == "" ? "0" : $("#txtWithHoldingTax").val().trim()
            //LoadWithPaging parameters
            , pWhereClausePayment: Payment_GetWhereClause()
            , pPageSize: $("#select-page-size").val()
            , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID DESC"
            //PaymentDetails
            , pPaymentDetailsID: $("#hPaymentDetailsID").val()
            , pPaymentDetailsAmount: $("#txtPaymentDetailsAmount").val().trim() == "" ? "0" : $("#txtPaymentDetailsAmount").val().trim().toUpperCase()
            , pPaymentDetailsCurrencyID: $("#slPaymentDetailsCurrency").val()
            , pPaymentDetailsExchangeRate: $("#txtPaymentDetailsExchangeRate").val().trim() == "" ? "0" : $("#txtPaymentDetailsExchangeRate").val().trim().toUpperCase()
            , pPaymentDetailsNotes: $("#txtPaymentDetailsNotes").val().trim() == "" ? "0" : $("#txtPaymentDetailsNotes").val().trim().toUpperCase()
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Payment/PaymentDetails_Insert", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    PaymentDetails_BindTableRows(JSON.parse(pData[3])); //pTblPaymentDetails: pData[3]
                    Payment_BindTableRows(JSON.parse(pData[4])); //pTblPayment: pData[4]
                    if (pSaveAndNew)
                        PaymentDetails_ClearAllControls();
                    else
                        jQuery("#PaymentDetailsModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function PaymentDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPaymentDetails') != "")
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
            CallGETFunctionWithParameters("/api/Payment/PaymentDetails_Delete"
                , { pPaymentDetailsIDsDeleted: GetAllSelectedIDsAsString('tblPaymentDetails'), pPaymentID: $("#hPaymentID").val() }
                , function (pData) {
                    if (pData[0]) {
                        PaymentDetails_BindTableRows(JSON.parse(pData[1]));
                        $("#tblPayment tbody tr[id=" + $("#hPaymentID").val() + "]").find("td.TotalLocalAmount").text(pData[2] + ' ' + $("#hDefaultCurrencyCode").val());
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
/************************************EOF PaymentDetails******************************************/
