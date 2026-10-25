function PaymentApproval_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblPayment");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-check-square-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Approve") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
    var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
    var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
    var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
    var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblPayment",
            ("<tr ID='" + item.ID + "' "
                //+ (" ondblclick='PaymentApproval_EditByDblClick(" + item.ID + ");' ")
                + (
                    (item.IsApproved)
                    ? (" class='text-primary' " + " ondblclick='PaymentApproval_EditByDblClick(" + item.ID + ");' ")
                    : (" ondblclick='PaymentApproval_EditByDblClick(" + item.ID + ");' ")
                    )
                + ">"
                    //+ "<td class='ARFID'> <input " + (item.TotalActuallyReceived > 0 || item.UnPaidCashiersCount > 0 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentID hide'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Serial hide'>" + item.Serial + "</td>"
                    + "<td class='PaymentCode'>" + item.PaymentCode + "</td>"
                    + "<td class='PRType hide'>" + item.PRType + "</td>"
                    + "<td class='PartnerID' val=" + item.PartnerID + " >" + (item.PartnerID == 0 ? "" : item.PartnerName) + "</td>"
                    + "<td class='PartnerTypeID' val=" + item.PartnerTypeID + " >" + (item.PartnerTypeID == 0 ? "" : item.PartnerTypeCode) + "</td>"
                    + "<td class='ChargeTypeID' val=" + item.ChargeTypeID + ">" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeCode) + "</td>"
                    + "<td class='TreasuryID' val=" + item.TreasuryID + ">" + (item.TreasuryID == 0 ? "" : item.TreasuryName) + "</td>"
                    + "<td class='BankAccountID ' val=" + item.BankAccountID + ">" + (item.BankAccountID == 0 ? "" : item.CompanyBankAccountName) + "</td>"
                    + "<td class='PaymentTypeID' val='" + item.PaymentTypeID + "'>" + item.PaymentTypeName + "</td>"
                    + "<td class='DealerName hide'>" + (item.DealerName == 0 ? "" : item.DealerName) + "</td>"
                    + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
                    + "<td class='ChequeOrVisaNo hide'>" + (item.ChequeOrVisaNo == 0 ? "" : item.ChequeOrVisaNo) + "</td>"
                    + "<td class='PaymentDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) + "</td>"
                    + "<td class='DueDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + "</td>"
                    + "<td class='TotalLocalAmount'>" + item.TotalLocalAmount.toFixed(2) + ' ' + $("#hDefaultCurrencyCode").val() + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsGeneralExpense hide'> <input type='checkbox' disabled='disabled' " + (item.IsGeneralExpense == true ? " checked='checked' " : "") + " /></td>"
                    + "<td class='IsRefused hide'> <input type='checkbox' disabled='disabled' " + (item.IsRefused == true ? " checked='checked' " : "") + " /></td>"
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
                    + "<td class=''>"
                        + "<a href='#'" + (item.IsApproved ? "disabled='disabled' " : " ") + " onclick='PaymentApproval_Approve(" + item.ID + "," + item.PRType + ");' " + editControlsText + "</a>"
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
function PaymentApproval_LoadingWithPaging() {
    debugger;
    var pWhereClause = PaymentApproval_GetWhereClause();
    var pOrderBy = " ID DESC ";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects:false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PaymentApproval_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPayment>tbody>tr", $("#txt-Search").val().trim());
}
//called by LoadDataWithPaging
function PaymentApproval_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE IsDeleted=0 AND IsRefused=0 ";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PaymentCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PaymentTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PartnerTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR DealerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR TreasuryName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR ChargeTypeCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += ")";
    }
    if ($("#slPartner").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerID = N'" + $("#slPartner").val() + "' ";
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerType").val() != "") {
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
    }
    if ($("#slReceivableOrPayable").val() != "") {
        pWhereClause += " AND PRType=" + $("#slReceivableOrPayable").val() + " ";
    }
    //if ($("#cbHideApprovedPayments").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    if ($("#slApprovalStatus").val() != "") {
        pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    }
    return pWhereClause;
}
function Payment_PartnerTypeChanged() {
    //debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    PaymentApproval_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = PaymentApproval_GetWhereClause();
    //var pOrderBy = " ID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payment/Payment_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        PaymentApproval_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
function PaymentApproval_EditByDblClick(pID) {
    debugger;

    $("#divPaymentPartner").addClass("hide"); //its not filled when i changed performance

    jQuery("#PaymentModal").modal("show");
    ClearAll("#PaymentModal");
    $("#tblPaymentDetails tbody tr").html(""); //to quickly empty it
    var pParametersWithValues = { pPaymentIDForModal: pID };
    CallGETFunctionWithParameters("/api/Payment/Payment_LoadItem"
        , pParametersWithValues
        , function (pData) {
            var pPaymentHeader = JSON.parse(pData[0]);
            glbPRType = pPaymentHeader.PRType;
            $("#hPaymentID").val(pPaymentHeader.ID);
            $("#lblPaymentShown").html(": " + pPaymentHeader.PaymentCode);
            $("#txtCode").val(pPaymentHeader.PaymentCode);
            //$("#slPaymentPartner").val(pPaymentHeader.PartnerID);
            ////i used this insead of the previous line coz PartnerID is repeated for different partners
            //$("#slPaymentPartner").prop("selectedIndex", $("#slPaymentPartner option[PartnerTypeID=" + pPaymentHeader.PartnerTypeID + "][value=" + pPaymentHeader.PartnerID + "]").index());

            $("#slPaymentChargeType").val(pPaymentHeader.ChargeTypeID == 0 ? "" : pPaymentHeader.ChargeTypeID);
            $("#slPaymentTreasury").val(pPaymentHeader.TreasuryID == 0 ? "" : pPaymentHeader.TreasuryID);
            $("#slPaymentType").val(pPaymentHeader.PaymentTypeID);
            $("#txtPaymentDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPaymentHeader.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.PaymentDate)));
            $("#txtDueDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPaymentHeader.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPaymentHeader.DueDate)));
            //set after binding details tblRows //$("#txtTotalLocalAmount").val(pPaymentHeader.TotalLocalAmount + ' ' + $("#hDefaultCurrencyCode").val()); 
            $("#txtDealerName").val(pPaymentHeader.DealerName == 0 ? "" : pPaymentHeader.DealerName);
            $("#txtBankName").val(pPaymentHeader.BankName == 0 ? "" : pPaymentHeader.BankName);
            $("#txtChequeOrVisaNo").val(pPaymentHeader.ChequeOrVisaNo == 0 ? "" : pPaymentHeader.ChequeOrVisaNo);
            $("#slPaymentBankAccount").val(pPaymentHeader.BankAccountID);
            $("#txtPaymentNotes").val(pPaymentHeader.Notes == 0 ? "" : pPaymentHeader.Notes);
            $("#txtWithHoldingTax").val(pPaymentHeader.WithHoldingTax);
            $("#cbIsGeneralExpense").prop("checked", pPaymentHeader.IsGeneralExpense);
            $("#cbIsRefused").prop("checked", pPaymentHeader.IsRefused);
            //if (pPaymentHeader.PRType == constPRTypePayable) $("#divIsGeneralExpense").removeClass("hide"); else $("#divIsGeneralExpense").addClass("hide");
            PaymentApproval_cbIsGeneralExpenseChanged();
            PaymentApproval_SetPaymentTypeProperties();
            PaymentApproval_SetIsApprovedProperties(true); //true: pDisableEditing
            $("#btnSavePayment").attr("onclick", "PaymentApproval_Update(false, false);");
            $("#btnSavePaymentAndPrint").attr("onclick", "PaymentApproval_Update(false, true);");
            PaymentDetails_BindTableRows(JSON.parse(pData[1]));
        }
        , null);
    debugger;
}
function PaymentApproval_cbIsGeneralExpenseChanged() {
    debugger;
    if ($("#cbIsGeneralExpense").prop("checked")) {

        $("#divPaymentChargeType").removeClass("hide");
        $("#slPaymentChargeType").attr("data-required", true);


        //$("#divPaymentPartnerType").addClass("hide");
        //$("#slPaymentPartnerType").attr("data-required", false);
        //$("#slPaymentPartnerType").val("");

        //$("#divPaymentPartner").addClass("hide");
        //$("#slPaymentPartner").attr("data-required", false);
        //$("#slPaymentPartner").val("");

        //$("#divDealerName").addClass("hide");
        //$("#txtDealerName").attr("data-required", false);
        //$("#txtDealerName").val("");
    }
    else {
        $("#divPaymentChargeType").addClass("hide");
        $("#slPaymentChargeType").attr("data-required", false);
        $("#slPaymentChargeType").val("");

        //$("#divPaymentPartnerType").removeClass("hide");
        //$("#slPaymentPartnerType").attr("data-required", true);

        //$("#divPaymentPartner").removeClass("hide");
        //$("#slPaymentPartner").attr("data-required", true);

        //$("#divDealerName").removeClass("hide");
        //$("#txtDealerName").attr("data-required", true);
    }
}
function PaymentApproval_SetPaymentTypeProperties() {
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

        $("#divIsRefused").addClass("hide");
        $("#lblDueDate").html("Date");
        $("#slPaymentDetailsCurrency").removeAttr("disabled");
    }
    else if ($("#slPaymentType").val() == constPaymentTypeCheque) { //Cheque
        $("#divTreasury").addClass("hide");
        $("#slPaymentTreasury").attr("data-required", false);
        $("#slPaymentTreasury").val("");

        $("#divSlBankAccount").removeClass("hide");
        $("#slPaymentBankAccount").attr("data-required", true);

        $("#divChequeOrVisaNo").removeClass("hide");
        $("#divIsRefused").removeClass("hide");
        $("#lblDueDate").html("Due Date");
        $("#slPaymentDetailsCurrency").attr("disabled", "disabled");
    }
    else { //NOT Cash and NOT Cheque
        $("#divTreasury").addClass("hide");
        $("#slPaymentTreasury").attr("data-required", false);
        $("#slPaymentTreasury").val("");

        $("#divSlBankAccount").removeClass("hide");
        $("#slPaymentBankAccount").attr("data-required", true);

        $("#divChequeOrVisaNo").removeClass("hide");
        $("#divIsRefused").addClass("hide");
        $("#lblDueDate").html("Due Date");
        $("#slPaymentDetailsCurrency").attr("disabled", "disabled");
    }
}
function PaymentApproval_SetIsApprovedProperties(pDisableEditing) {
    debugger;
    if (pDisableEditing) {
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
        $("#btn-DeletePaymentDetails").attr("disabled", "disabled");
    }
    else {
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

        $("#btn-DeletePaymentDetails").removeAttr("disabled");
        $("#btnSavePayment").removeAttr("disabled");
        $("#btnSavePaymentAndPrint").removeAttr("disabled");
        $("#btn-AddPaymentDetails").removeAttr("disabled");
    }
}
function PaymentApproval_CalculateTotalLocalAmount() {
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
    $("#txtTotalLocalAmount").val(decTotalLocalAmount.toFixed(2) + ' ' + $("#hDefaultCurrencyCode").val());
    return decTotalLocalAmount.toFixed(2);
}
function PaymentApproval_Approve(pPaymentIDToApprove, PRType) {
    debugger;
    //Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblPayment').split(',').length > 1)
    //    swal("Sorry", "You can delete just one payment at a time.");
    //else
    //if (GetAllSelectedIDsAsString('tblPayment') != "")
    swal({
            title: "Are you sure?",
            text: "The selected payment will be approved and take effect into the partner balance.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Approve",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Payment/PaymentApproval_Approve"
                , {
                    pPaymentIDsToApprove: pPaymentIDToApprove
                    , pTransactionType: PRType
                    , pWhereClausePaymentApproval: PaymentApproval_GetWhereClause()
                    , pPageSize: $("#select-page-size").val()
                    , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID DESC"
                }
                , function (pData) {
                    var pStrMessage = pData[2];
                    if (pData[0]) {
                        PaymentApproval_BindTableRows(JSON.parse(pData[1]));
                        //PaymentApproval_LoadingWithPaging();
                    }
                    else
                        //swal("Sorry", "An error occured, please refresh and then try again.");
                        alert(pData[2]); //swal("Sorry", pStrMessage);
                    FadePageCover(false);
                });
        });
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
                    + "<td class='Amount PaymentDetailsAmount'>" + item.Amount.toFixed(2) + "</td>"
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

                    + "<td class='hide'><a href='#PaymentDetailsModal' data-toggle='modal' onclick='PaymentDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
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
    PaymentApproval_CalculateTotalLocalAmount();
}
/************************************EOF PaymentDetails******************************************/
