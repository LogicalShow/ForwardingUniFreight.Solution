var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function PayablesStatus_SaveManualStatus() {
    debugger;
    FadePageCover(true);
    jQuery("#SetInvoiceStatusModal").modal("show");
    var pParametersWithValues = {
        pInvoiceIDToSetStatus: $("#hInvoiceIDToSetStatus").val()
        , pManualPaymentStatusID: $("#slEditInvoiceManualPaymentStatus").val()
        //, pIsDelivered: $("#cbIsInvoiceDelivered").prop("checked")
    };
    CallGETFunctionWithParameters("/api/Payables/PayablesStatus_SaveManualStatus", pParametersWithValues
        , function (pData) {
            var pReturnedMessage = pData[0];
            if (pReturnedMessage == "") {
                swal("Success", "Saved succefully.");
                OperationPayableStatues_LoadingWithPaging();
                jQuery("#SetPayableStatusModal").modal("hide");

            }
            else {
                swal("Sorry", pReturnedMessage);
                FadePageCover(false);
            }
        }
        , null);
}
function PayableStatus_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    if (1 == 2) //Is it permitted to save 
        swal("Sorry", "This option is under development.");
    else {
        FadePageCover(true);
        jQuery("#SetPayableStatusModal").modal("show");
        var pParametersWithValues = {
            pWhereClause: "WHERE ID=" + pID
        };
        CallGETFunctionWithParameters("/api/Payables/LoadAll", pParametersWithValues
            , function (pData) {
                var pInvoiceHeader = JSON.parse(pData[0]);
                $("#lblSetPayableStatusShown").text(": " + pInvoiceTypeCode);
                $("#hInvoiceIDToSetStatus").val(pInvoiceHeader[0].ID);
                $("#slEditInvoiceManualPaymentStatus").val((pInvoiceHeader[0].PayableStatus == "UnPaid" ? 0 : 1));
               // $("#cbIsInvoiceDelivered").prop("checked", pInvoiceHeader[0].IsDelivered);
                FadePageCover(false);
            }
            , null);
    }
}
function OperationPayableStatues_BindTableRows(pPayables) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "NIV") {
        $('.showForNIV').removeClass('hide');
    } else {
        $('.showForNIV').addClass('hide');
    }
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblPayables");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-check-square-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Approve") + "</span>";
    var setCustodyControlsText = " class='btn btn-xs btn-rounded btn-primary' title='Set Custody'> <i class='fa fa-hand-o-up' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Set Custody") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
        //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            (/*"<tr ID='" + item.ID + "' " + (item.IsApproved ? " class='text-primary' " : "") + ">"*/

                "<tr ID='" + item.ID + "' "
            + (
                    ('ondblclick="PayableStatus_FillControls(' + item.ID + ",'" + item.ChargeTypeName + "'" + ');"')

            )
            + " class='"
                + (item.IsApproved
                ? ' static-text-danger '
                     : ""
            )
            + "'"
            + ">"

                    //+ "<td class='PayableID'> <input " + (item.PartnerSupplierID != 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='PayableID hide'> <input " + "name='Delete'" + " type='checkbox' value='" + item.ID + "'></td>"
                   //+ "<td class='PayableID'> <input " + "name='Delete'" + " type='checkbox' value='" + item.ID + "'></td>"
                    //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='PayableSupplier' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "N/A" : item.PartnerSupplierName) + "</td>"
                    + "<td class='PayableSupplierOperationPartnerTypeID hide' >" + item.SupplierOperationPartnerTypeID + "</td>"
                    + "<td class='PayableOperation' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</td>"
                + "<td class='PayableMasterBL " + (pDefaults.UnEditableCompanyName == "NIV" ? "'" : "hide'") + "val='" + item.MasterBL + "'>" + item.MasterBL + "</td>"
                    + "<td class= 'PayableModificationDate " + (pDefaults.UnEditableCompanyName == "NIV" ? "'" : "hide'") + "> "
                    + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ModificationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) : "")
                + "</td>"
                    + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //the next line its PartnerSupplierID comes from table OperationPartners
                    //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"

                    + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                    + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                    + "<td class='PayableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"
                    + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage.toFixed(4) + "</td>"
                    + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount.toFixed(4) + "</td>"

                    //+ "<td class='PayableInitialSalePrice'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(4)) + "</td>"
                    + "<td class='PayableSupplierInvoiceNo'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                    + "<td class='PayableSupplierReceiptNo'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                    + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                    + "<td class='PayableBillID hide' val='" + item.BillID + "'>" + (item.BillID == 0 ? "" : item.BillID) + "</td>"
                    + "<td class='PayableExchangeRate hide'>" + item.ExchangeRate.toFixed(4) + "</td>"
                   + "<td class='PayableCostAmount ' val=" + item.CostAmount + ">" + item.CostAmount.toFixed(4) + "</td>"
                    + "<td class='PayableCurrency'  val='" + item.CurrencyID + "' val2='"+ item.CurrencyCode  + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='PayableTankOrFlexiNumber " + (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "IST" ? "" : "hide") + "'>" + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + "</td>"
                    //+ "<td class='PayableCustodyID' val=" + item.CustodyID + ">" + (item.CustodyID == 0 
                    //                                                                                ? (item.IsApproved && item.SupplierOperationPartnerTypeID != constCustodyOperationPartnerTypeID //it is approved i.e. i am sure there is partner isa
                    //                                                                                        ? ("<a href='#EditPayableModal' data-toggle='modal' onclick='OperationPayableStatues_SelectCustodyToBeSet(" + item.ID + ");' " + setCustodyControlsText + "</a>")
                    //                                                                                        : "")
                    //                                                                                : item.CustodyName)
                    //+ "</td>"
                    + "<td class='PayableCustodyID hide' val=" + item.CustodyID + ">" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"

                    + "<td class='PayableNotes hide'>" + item.Notes + "</td>"
                    + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
            + "<td class='IsApproved hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='PayableStatus " + (item.PayableStatus == "UnPaid" ? "text-danger " : "text-primary ") + "'>" + item.PayableStatus + "</td>"

                    + "<td class=''>"
                      //  + "<a href='#'" + (item.IsApproved || item.PartnerSupplierID == 0 ? "disabled='disabled' " : " ") + " onclick='OperationPayableStatues_SelectCustody(" + item.ID + ",true);' " + editControlsText + "</a>"
                       + "<a href='#'" + (item.IsApproved ? "disabled='disabled' " : " ") + " onclick='OperationPayableStatues_SelectCustody(" + item.ID + ",true);' " + editControlsText + "</a>"
                    + "</td>"

                    + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    if ($("#hf_CanEdit").val() == 1) {
        $("#btn-ApproveAllSelected").removeClass("hide"); $("#btn-UnApproveAllSelected").removeClass("hide");
    }
    else {
        $("#btn-ApproveAllSelected").addClass("hide"); $("#btn-UnApproveAllSelected").addClass("hide");
    }

    if ($("#hDefaultUnEditableCompanyName").val() == "GBL")
        $('#btn-UnApproveAllSelected').addClass('hide');
    else
        $('#btn-UnApproveAllSelected').removeClass('hide');

    CalcTotal();
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
  
    CheckAllCheckbox("HeaderDeletePayableID");
    HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function OperationPayableStatues_LoadingWithPaging() {
    debugger;
    var pWhereClause = OperationPayableStatues_GetWhereClause();
    var pOrderBy = " OperationID DESC ";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { OperationPayableStatues_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());

}
//called by LoadDataWithPaging
function OperationPayableStatues_GetWhereClause() {
    debugger;
    $('#lblTotalCost').html(' ');

   // var pWhereClause = "WHERE IsDeleted=0 AND AccNoteID IS NULL ";
    var pWhereClause = "WHERE IsDeleted=0 ";

    if (pDefaults.UnEditableCompanyName == "GBL")
        pWhereClause += " AND SupplierInvoiceNo IS NOT NULL AND SupplierInvoiceNo<>'N/A' AND CostAmount>0 " + "\n";
    if ($("#txtSearchFrom").val() != '' && $("#txtSearchTo").val() != '')
        pWhereClause += " AND IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND IssueDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";

    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        //pWhereClause += " OperationCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " SupplierInvoiceNo like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR SupplierReceiptNo like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += " OR SupplierOperationPartnerTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR PartnerSupplierName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR ChargeTypeName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR TankOrFlexiNumber = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartner").val() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerSupplierID = N'" + $("#slPartner").val() + "' ";
        pWhereClause += " AND SupplierPartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerType").val() != "") {
        pWhereClause += " AND SupplierPartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
    }
    if ($("#slPaidUnPaid").val() != "0") {
        if ($("#slPaidUnPaid").val()==1) {
            pWhereClause += " AND PayableStatus = 'Paid'";

        }
        else if ($("#slPaidUnPaid").val() == 2) {
            pWhereClause += " AND PayableStatus = 'UnPaid'";
        }
    }
    //if ($("#slOperation").val() != "") {
    //    pWhereClause += " AND OperationID=" + $("#slOperation").val() + " ";
    //}
    if ($("#txtOperation").val() != "") {
        pWhereClause += " AND (SUBSTRING(OperationCode,12,5) = N'" + $("#txtOperation").val().trim().toUpperCase() + "') \n";
    }
    //if ($("#cbHideApprovedOperationPayable").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    if ($("#slApprovalStatus").val() != "") {
        pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    }
    return pWhereClause;
}
function OperationPayableStatues_PartnerTypeChanged() {
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    OperationPayableStatues_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = OperationPayableStatues_GetWhereClause();
    //var pOrderBy = " OperationID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payables/OperationPayableStatues_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        OperationPayableStatues_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
function OperationPayableStatues_Approve(pIDs, pIsApprove) {
    debugger;
    var _Suceess=true;
    var pSafeID = $("#slSafes").val();
    var pBankID = $("#slBanks").val();
    var pIsOneJV = $("#cb-OneJV").prop("checked");
    var pIsSupplierPayment = $("#cb-SupplierPayment").prop("checked");
    var pIsPayment = $("#cb-Payment").prop("checked");
    var AccountID = "0";
    var SubAccountID = "0";


    if (pIsSupplierPayment && pIsPayment)
    {
        swal('Excuse me', 'choose payment or supplier-custdy', 'warning');
        _Suceess = false;
        return false;
    }
    if (pIsSupplierPayment || (pIsPayment && pSafeID ==0 && pBankID == 0))
    {
         AccountID = $("#slAccount").val();
         SubAccountID = $("#slSubAccount").val();


        var SubAccountCount = $("#slSubAccount").find('option').length;

        if ((AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null)) {
            swal('Excuse me', 'Fill All Account', 'warning');
            _Suceess = false;
            return false;
        }
        if ((SubAccountID.trim() == "" || SubAccountID.trim() == "0" || SubAccountID == null) && SubAccountCount > 1) {
            swal('Excuse me', 'Fill  SubAccount', 'warning');
            _Suceess = false;
            return false;
        }
    }

    if (pIsPayment)
    {
        if (pSafeID != 0 && pBankID != 0)
        {
            swal('Excuse me', 'choose safe or bank', 'warning');
            _Suceess = false;
            return false;
        }

        if ((pSafeID != 0 || pBankID != 0) && $("#slAccount").val() != 0) {
            swal('Excuse me', 'choose safe or bank or account', 'warning');
            _Suceess = false;
            return false;
        }
    }

    var ValidatePostSafeOrBank = false;
    var ValidatePostPartner = false;
    var ValidateNoSupplierInvoiceNo = false;

    var PostSafeOrBank = false;
    if (pSafeID != 0 || pBankID != 0)
        PostSafeOrBank = true;

    $('#tblPayables  > tbody > tr').each(function () {

        if ($(this).find('input[name="Delete"]').is(':checked')) {
            if ($(this).find('td.PayableSupplier').attr('val') == 0 && !PostSafeOrBank) {
                ValidatePostSafeOrBank = true;
                return false; //
            }

            if ($(this).find('td.PayableSupplier').attr('val') != 0 && PostSafeOrBank && !pIsPayment  && !pIsSupplierPayment) {
                ValidatePostPartner = true;
                return false; //
            }

            if (($(this).find('td.PayableSupplierInvoiceNo').html() == 0 || $(this).find('td.PayableSupplierInvoiceNo').html() == "N/A" || $(this).find('td.PayableSupplierInvoiceNo').html() == "")
                && pDefaults.UnEditableCompanyName == 'ELI')
            {
                ValidateNoSupplierInvoiceNo = true;
                return false; //
            }
        }
    });
    if (ValidatePostSafeOrBank == true && pIsApprove == true)
        swal("Sorry", "Please, select safe or bank.");
    else if (ValidateNoSupplierInvoiceNo == true && pIsApprove == true)
        swal("Sorry", "Please, Insert Supplier Invoice Number First.");
    else if (ValidatePostPartner == true && pIsApprove == true)
        swal("Sorry", "Please, select without suppliers.");
    else if (pSafeID != 0 && pBankID != 0 && pIsApprove == true)
        swal("Sorry", "Please, select safe or bank.");
    else if (pIsOneJV && pIsSupplierPayment)
        swal("Sorry", "Please, select supplier payment or one jv.");
    else if (pIDs == "")
        swal("Sorry", "Please, select at least one row.");
        //else if (pIDs == "" || pIDs.split(",").length > 1)
        //    swal("Sorry", "Please, select just one row.");
    else if (_Suceess) {
        if (pIsApprove == true) {
            CallGETFunctionWithParameters("/api/Payables/getFinalCreditLimitBalance", { pPayableIDs: pIDs }
          , function (pData) {
              debugger;
              if ($("#hIsCreditlimitexceptionperiod").val() == "true") {
                  if (pData[0]) {
                      //var pStrMessage1 = pData[0];
                      //alert(pStrMessage1);
                      swal("Sorry", pData[0]);
                  }
                  else {
                      swal({
                          title: "Are you sure?",
                          //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
                          text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
                          type: "",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: "Yes, Apply",
                          closeOnConfirm: true
                      },
          //callback function in case of confirm delete
          function () {
              FadePageCover(true);
              var pParametersWithValues = {
                  pIDsToSetApproval: pIDs
                , pIsApprove: pIsApprove
                , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
                , pCostCenterID: $("#slCostCenter").val()
                , pSafeID: pSafeID
                , pBankID: pBankID
                , pIsOneJV: pIsOneJV
                , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                , pPaymentAccountID: AccountID
                 , pPaymentSubAccountID: SubAccountID
                , pIsPayment: pIsPayment
                , pIsPaymentSupplierCustdy: pIsSupplierPayment
                , pWhereClause: OperationPayableStatues_GetWhereClause()
                , pPageSize: $("#select-page-size").val()
                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                , pOrderBy: " OperationID DESC "
              };
              CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                  , function (pData) {
                      var pStrMessage = pData[2];
                      if (pData[0]) {
                          OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
                          jQuery("#SelectCustodyModal").modal("hide");
                          //OperationPayableStatues_LoadingWithPaging();
                      }
                      else
                          //swal("Sorry", "An error occured, please refresh and then try again.");
                          alert(pStrMessage); //swal("Sorry", pStrMessage);
                      FadePageCover(false);
                  });
          });
                  }
              }
              else {
                  if (pData[0]) {
                      var pStrMessage1 = pData[0];
                      alert(pStrMessage1);
                      // swal("Sorry Customers Bellow Have Credit Limit", pData[0]);

                      swal({
                          title: "Are you sure?",
                          //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
                          text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
                          type: "",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: "Yes, Apply",
                          closeOnConfirm: true
                      },
//callback function in case of confirm delete
           function () {
               FadePageCover(true);
               var pParametersWithValues = {
                   pIDsToSetApproval: pIDs
                          , pIsApprove: pIsApprove
                          , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
                          , pCostCenterID: $("#slCostCenter").val()
                          , pSafeID: pSafeID
                          , pBankID: pBankID
                          , pIsOneJV: pIsOneJV
                          , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                          , pPaymentAccountID: AccountID
                           , pPaymentSubAccountID: SubAccountID
                          , pIsPayment: pIsPayment
                          , pIsPaymentSupplierCustdy: pIsSupplierPayment
                          , pWhereClause: OperationPayableStatues_GetWhereClause()
                          , pPageSize: $("#select-page-size").val()
                          , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                          , pOrderBy: " OperationID DESC "
               };
               CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                   , function (pData) {
                       var pStrMessage = pData[2];
                       if (pData[0]) {
                           OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
                           jQuery("#SelectCustodyModal").modal("hide");
                           //OperationPayableStatues_LoadingWithPaging();
                       }
                       else
                           //swal("Sorry", "An error occured, please refresh and then try again.");
                           alert(pStrMessage); //swal("Sorry", pStrMessage);
                       FadePageCover(false);
                   });
           });
                  }
                  else {
                      swal({
                          title: "Are you sure?",
                          //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
                          text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
                          type: "",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: "Yes, Apply",
                          closeOnConfirm: true
                      },
//callback function in case of confirm delete
         function () {
             FadePageCover(true);
             var pParametersWithValues = {
                 pIDsToSetApproval: pIDs
                         , pIsApprove: pIsApprove
                         , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
                         , pCostCenterID: $("#slCostCenter").val()
                         , pSafeID: pSafeID
                         , pBankID: pBankID
                         , pIsOneJV: pIsOneJV
                         , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                         , pPaymentAccountID: AccountID
                          , pPaymentSubAccountID: SubAccountID
                         , pIsPayment: pIsPayment
                         , pIsPaymentSupplierCustdy: pIsSupplierPayment
                         , pWhereClause: OperationPayableStatues_GetWhereClause()
                         , pPageSize: $("#select-page-size").val()
                         , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                         , pOrderBy: " OperationID DESC "
             };
             CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                 , function (pData) {
                     var pStrMessage = pData[2];
                     if (pData[0]) {
                         OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
                         jQuery("#SelectCustodyModal").modal("hide");
                         //OperationPayableStatues_LoadingWithPaging();
                     }
                     else
                         //swal("Sorry", "An error occured, please refresh and then try again.");
                         alert(pStrMessage); //swal("Sorry", pStrMessage);
                     FadePageCover(false);
                 });
         });
                  }

              }

          }, null);
        }


            ///end of check credit limit
        else {
            swal({
                title: "Are you sure?",
                //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
                text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
                type: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Apply",
                closeOnConfirm: true
            },
       //callback function in case of confirm delete
       function () {
           FadePageCover(true);
           var pParametersWithValues = {
               pIDsToSetApproval: pIDs
                , pIsApprove: pIsApprove
                , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
                , pCostCenterID: $("#slCostCenter").val()
                , pSafeID: pSafeID
                , pBankID: pBankID
                , pIsOneJV: pIsOneJV
                , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                , pPaymentAccountID: AccountID
                 , pPaymentSubAccountID: SubAccountID
                , pIsPayment: pIsPayment
                , pIsPaymentSupplierCustdy: pIsSupplierPayment
                , pWhereClause: OperationPayableStatues_GetWhereClause()
                , pPageSize: $("#select-page-size").val()
                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                , pOrderBy: " OperationID DESC "
           };
           CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
               , function (pData) {
                   var pStrMessage = pData[2];
                   if (pData[0]) {
                       OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
                       jQuery("#SelectCustodyModal").modal("hide");
                       //OperationPayableStatues_LoadingWithPaging();
                   }
                   else
                       //swal("Sorry", "An error occured, please refresh and then try again.");
                       alert(pStrMessage); //swal("Sorry", pStrMessage);
                   FadePageCover(false);
               });
       });
        }
        //swal({
        //    title: "Are you sure?",
        //    //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
        //    text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
        //    type: "",
        //    showCancelButton: true,
        //    confirmButtonColor: "#DD6B55",
        //    confirmButtonText: "Yes, Apply",
        //    closeOnConfirm: true
        //},
        ////callback function in case of confirm delete
        //function () {

        //    FadePageCover(true);
        //    var pParametersWithValues = {
        //        pIDsToSetApproval: pIDs
        //        , pIsApprove: pIsApprove
        //        , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
        //        , pCostCenterID: $("#slCostCenter").val()
        //        , pSafeID: pSafeID
        //        , pBankID: pBankID
        //        , pIsOneJV: pIsOneJV
        //        , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
        //        , pPaymentAccountID: AccountID
        //         , pPaymentSubAccountID: SubAccountID
        //        , pIsPayment: pIsPayment
        //        , pIsPaymentSupplierCustdy: pIsSupplierPayment
        //        , pWhereClause: OperationPayableStatues_GetWhereClause()
        //        , pPageSize: $("#select-page-size").val()
        //        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
        //        , pOrderBy: " OperationID DESC "
        //    };
        //    CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
        //        , function (pData) {
        //            var pStrMessage = pData[2];
        //            if (pData[0]) {
        //                OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
        //                jQuery("#SelectCustodyModal").modal("hide");
        //                //OperationPayableStatues_LoadingWithPaging();
        //            }
        //            else
        //                //swal("Sorry", "An error occured, please refresh and then try again.");
        //                alert(pStrMessage); //swal("Sorry", pStrMessage);
        //            FadePageCover(false);
        //        });
        //});
    }
}

function CalcTotal() {


    var result = [];
    // fill currency codes --------------
    debugger;
 
    var Currency;
    $('#' + 'tblPayables' + ' td.' + 'PayableID' + ' input:checkbox').click(function () {

        $('#lblTotalCost').html(' ');

        $('#tblPayables  > tbody > tr').each(function () {

            if ($(this).find('input[name="Delete"]').is(':checked')) {
                Currency = $(this).find('td.PayableCurrency').attr('val2');
                if ($.inArray(Currency, result) == -1)
                    result.push(Currency);
            }
        });

        debugger;
        for (var j = 0; j < result.length ; j++) {
            var Total = 0;
            $('#tblPayables  > tbody > tr').each(function () {

                if ($(this).find('input[name="Delete"]').is(':checked')) {
                    if ($(this).find('td.PayableCostAmount').attr('val') != 0 && result[j] == $(this).find('td.PayableCurrency').attr('val2')) {
                        var Cost = $(this).find('td.PayableCostAmount').attr('val');
                        Total += parseFloat(Cost);  // .replace(/\b0+/g, "")
                    }


                }
            });
            $('#lblTotalCost').append(result[j] + ": ");
            $('#lblTotalCost').append(Total.toFixed(2));
            $('#lblTotalCost').append(' ');
        }
    });
}
function CalcTotalAll()
{
    debugger;
    if( $('#cb-CheckAll-Payables').prop("checked") )
    {
        var result = [];
        var Currency;
        $('#lblTotalCost').html(' ');

        $('#tblPayables  > tbody > tr').each(function () {

            if ($(this).find('input[name="Delete"]').is(':checked')) {
                Currency = $(this).find('td.PayableCurrency').attr('val2');
                if ($.inArray(Currency, result) == -1)
                    result.push(Currency);
            }
        });

        for (var j = 0; j < result.length ; j++) {
            var Total = 0;
            $('#tblPayables  > tbody > tr').each(function () {

                if ($(this).find('input[name="Delete"]').is(':checked')) {
                    if ($(this).find('td.PayableCostAmount').attr('val') != 0 && result[j] == $(this).find('td.PayableCurrency').attr('val2')) {
                        var Cost = $(this).find('td.PayableCostAmount').attr('val');
                        Total += parseFloat(Cost);  // .replace(/\b0+/g, "")
                    }


                }
            });
            $('#lblTotalCost').append(result[j] + ": ");
            $('#lblTotalCost').append(Total.toFixed(2));
            $('#lblTotalCost').append(' ');
        }
        //var Total = GetColumnSum('tblPayables', 'PayableCostAmount');
        //$('#lblTotalCost').html(Total.toFixed(2));
    }
        else
        $('#lblTotalCost').html(0);
}


function Details_FillSlSubAccount(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccount").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccount").html("<option value=0>" + TranslateString("SubAccount") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccount").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                    //Start Auto Filter
                    $("#" + pSlName).trigger("change");
                    //End Auto Filter
                }
                FadePageCover(false);
            }
            , null);
    }
}
////used call SelectCustodyModal with showing date for setting custody
//function OperationPayableStatues_SelectCustodyToBeSet(pPayableID) {
//    debugger;
//    jQuery("#SelectCustodyModal").modal("show");
//    $("#btnApplyApprovalAction").removeAttr("onclick");
//    $("#btnApplyApprovalAction").attr("onclick", "OperationPayableStatues_SetCustody('" + pPayableID + "')");
//}

//function OperationPayableStatues_SelectCustody(pIDs, pIsApprove) {
//    debugger;
//    if (pIsApprove) {
//        if (pIDs == "" || pIDs.split(',').length != 1) //for approve select 1 row at a time
//            swal("Sorry", "Please, select just one record for approve.");
//        else { //i am sure its approve and its just 1 row selected
//            var pSupplierOperationPartnerTypeID = $("#tblPayables tr[ID=" + pIDs + "]").find("td.PayableSupplierOperationPartnerTypeID").text();
//            if (pSupplierOperationPartnerTypeID == constCustodyOperationPartnerTypeID) //if yes then call OperationPayableStatues_Approve(pIDs, pIsApprove) directly else offer to set Custody
//                OperationPayableStatues_Approve(pIDs, pIsApprove);
//            else {
//                jQuery("#SelectCustodyModal").modal("show");
//                $("#btnApplyApprovalAction").removeAttr("onclick");
//                $("#btnApplyApprovalAction").attr("onclick", "OperationPayableStatues_Approve('" + pIDs + "'," + pIsApprove + ")");
//            }
//        } //EOF i am sure its approve and its just 1 row selected
//    }
//    else { //UnApprove
//        if (pIDs == "")
//            swal("Sorry", "Please, select at least one record to UnApprove.");
//        else
//            OperationPayableStatues_Approve(pIDs, pIsApprove);
//    }
//}

//function OperationPayableStatues_SetCustody(pPayableID) {
//    debugger;
//    //N.B.: the Op.Payable approval date is the creation and modification dates in the AccPartnerBalance (filtered by OperationPayableID & PartnerID)
//    //N.B.: the custody settlement date is the creation and modification dates in the AccPartnerBalance (filtered by OperationPayableID & CustodyID)
//    if ($("#slSelectCustody").val() == "")
//        swal("Sorry", "Please, select Custody.");
//    else {
//        FadePageCover(true);
//        var pParametersWithValues = {
//            pPayableID: pPayableID
//                , pCustodyIDToBeSet: $("#slSelectCustody").val() == "" ? 0 : $("#slSelectCustody").val()
//                , pWhereClause: OperationPayableStatues_GetWhereClause()
//                , pPageSize: $("#select-page-size").val()
//                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
//                , pOrderBy: " SupplierPartnerTypeID,PartnerSupplierID, OperationID DESC "
//        };
//        CallGETFunctionWithParameters("/api/Payables/SetCustody", pParametersWithValues
//            , function (pData) {
//                if (pData[0]) {
//                    OperationPayableStatues_BindTableRows(JSON.parse(pData[1]));
//                    jQuery("#SelectCustodyModal").modal("hide");
//                    //OperationPayableStatues_LoadingWithPaging();
//                }
//                else
//                    swal("Sorry", "An error occured, please refresh and then try again.");
//                FadePageCover(false);
//            });
//    }
//}
