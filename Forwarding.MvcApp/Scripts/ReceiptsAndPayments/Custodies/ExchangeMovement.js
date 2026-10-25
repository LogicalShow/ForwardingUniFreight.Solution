function ExchangeMovement_BindTableRows(pVoucher) {
    debugger;
    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    ClearAllTableRows("tblVoucher");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pVoucher, function (i, item) {
        AppendRowtoTable("tblVoucher",
            //("<tr ID='" + item.ID + "' ondblclick='Voucher_FillControls(" + item.ID + ");'>"
            ("<tr ID='" + item.ID + "' ondblclick='ExchangeMovement_FillAllControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PaymentRequestID hide'>" + item.PaymentRequestID + "</td>"

                   + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='VoucherDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.VoucherDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.VoucherDate))) + "</td>"
                    + "<td class='SafeID hide'>" + item.SafeID + "</td>"
                    + "<td class='SafeName'>" + (item.SafeID == 0 ? "" : item.SafeName) + "</td>"
                    + "<td class='Total'>" + item.Total + "</td>"
                    + "<td class='TotalAfterTax hide'>" + item.TotalAfterTax + "</td>"
                    + "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='CurrencyCode'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='ChargedPerson'>" + (item.ChargedPerson == 0 ? "" : item.ChargedPerson) + "</td>"
                    + "<td class='ExchangeRate hide'>" + item.ExchangeRate + "</td>"

                    + "<td class='TaxID hide'>" + item.TaxID + "</td>"
                    + "<td class='TaxID2 hide'>" + item.TaxID2 + "</td>"
                    + "<td class='TaxValue hide'>" + item.TaxValue + "</td>"
                    + "<td class='TaxValue2 hide'>" + item.TaxValue2 + "</td>"
                    
                    + "<td class='InvoiceID hide'>" + item.SafeID + "</td>"
                    + "<td class='InvoiceNo hide'>" + (item.InvoiceID == 0 ? "" : item.InvoiceNo) + "</td>"
                    + "<td class='IsCash hide" + (glbFormCalled == constVoucherCashOut ? "" : " hide ") + "'> <input id=cbIsCash" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsCash ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Approved hide'> <input id=cbApproved" + item.ID + " type='checkbox' disabled='disabled' " + (item.Approved ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Posted hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.Posted ? " checked='checked' " : "") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                                        + "<td class='Acceptbtn'> <button  type='button' onclick='Accept(" + item.ID + ");' class='btn btn btn-primary btn-sm swapChildrenClass'></i><b class='Confirm'>Confirm</b></button></td>"
                    + "<td class='Rejectionbtn'> <button  type='button' onclick='Rejection(" + item.ID + ");' class='btn btn-danger btn-sm swapChildrenClass'></i><b class='NotConfirm'>Not Confirm</b></button></td>"
                    
            + "</tr>"));

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
            $('.NotConfirm').text('موافقة');
            $('.Confirm').text('رفض');
        } else {
            $('.NotConfirm').text('NotConfirm');
            $('.Confirm').text('Confirm');
        }
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblVoucher", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblVoucher>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
        strDeleteFailMessage = "This command is not completed because of dependencies existance."
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    if ($("#slSearchStatus").val() == 10 || $("#slSearchStatus").val() == 20) {
        $(".Acceptbtn").addClass("hide")
        $(".Rejectionbtn").addClass("hide")
    }
    else {
        $(".Acceptbtn").removeClass("hide")
        $(".Rejectionbtn").removeClass("hide")
    }
}


function ExchangeMovement_LoadingWithPaging() {
    debugger;
    var pWhereClause = ExchangeMovement_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ExchangeMovement_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblVoucher>tbody>tr", $("#txt-Search").val().trim());
    
    
}
function ExchangeMovement_GetWhereClause() {
    var pWhereClause = "WHERE  Posted=1   ";
    pWhereClause += " AND VoucherDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND VoucherDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";
    //if (glbFormCalled == constFrmPosting) {
    //    pWhereClause += "AND Posted=0";
    //}
    //else if (glbFormCalled == constFrmUnPosting) {
    //    pWhereClause += "";
    //}
    //if ($("#txtSearchCode").val().trim() != "")
    //    pWhereClause += " AND Code LIKE N'%" + $("#txtSearchCode").val().trim() + "%'" + "\n";
    //if ($("#slSearchSafe").val() != 0)
    //    pWhereClause += " AND SafeID = " + $("#slSearchSafe").val() + "\n";
    //if ($("#txtSearchTotal").val().trim() != "")
    //    pWhereClause += " AND TotalAfterTax = " + $("#txtSearchTotal").val().trim() + "\n";
    //if ($("#slSearchCurrency").val() != 0)
    //    pWhereClause += " AND CurrencyID = " + $("#slSearchCurrency").val() + "\n";
    //if ($("#txtSearchChargedPerson").val().trim() != "")
    //    pWhereClause += " AND ChargedPerson LIKE N'%" + $("#txtSearchChargedPerson").val().trim() + "%'" + "\n";
    //if ($("#txtSearchNotes").val().trim() != "")
    //    pWhereClause += " AND Notes LIKE N'%" + $("#txtSearchNotes").val().trim() + "%'" + "\n";
    //if ($("#slSearchCashOrCharge").val() == 10)
    //    pWhereClause += " AND IsCash = 1" + "\n";
    if ($("#slSearchSafe").val() != "0")
        pWhereClause += " AND SafeID = " + $("#slSearchSafe").val() + "\n";
    if ($("#slSearchBank").val() != "0")
        pWhereClause += " AND BankID = " + $("#slSearchBank").val() + "\n";

    
   
    if ($("#slSearchVoucherType").val() == 20)
        pWhereClause += " AND VoucherType=20 " + "\n";
    if ($("#slSearchVoucherType").val() == 40)
        pWhereClause += " AND VoucherType=40 " + "\n";
    if ($("#slSearchVoucherType").val() == 10)
        pWhereClause += " AND VoucherType=10 " + "\n";
    if ($("#slSearchVoucherType").val() == 30)
        pWhereClause += " AND VoucherType=30 " + "\n";
    if ($("#slSearchVoucherType").val() == 0) {
        if ($("#movementType").val() == "ReceiptMovement") {
            pWhereClause += " AND  (VoucherType=10  OR VoucherType=30 )" + "\n";
        } else {
            pWhereClause += " AND  (VoucherType=20  OR VoucherType=40 )" + "\n";
        }
    }

    if ($("#slSearchStatus").val() == 10)
        pWhereClause += " AND IsAccept = 1" + "\n";
    if ($("#slSearchStatus").val() == 20)
        pWhereClause += " AND IsAccept = 0" + "\n";
    if ($("#slSearchStatus").val() == 0)
        pWhereClause += " AND ID NOT IN (SELECT voucherID FROM A_ExchangeMovement)";


    //var LinkUserAndSafes = $('#hReadySlOptions option[value="55"]').attr("OptionValue");//LinkUserAndSafes
    //if (LinkUserAndSafes == "true") {
    //    pWhereClause = " INNER JOIN VW_Sec_UserSafes US ON SafeID = US._SafeID " + "\n" + pWhereClause + "\n" + " AND US._UserID";
    //}

    return pWhereClause;
}

function Voucher_FillControls(pID) {
    debugger;
    CallGETFunctionWithParameters("/api/ExchangeMovement/GetJournalVouchersHeader"
                , {
                    pWhereClauseVoucherDetails: "WHERE ID=" + pID

                }
                , function (pData) {
                    
                    var VouchersHeader = JSON.parse(pData[0]);
                    $("#slBank").val(VouchersHeader[0].BankName);
                    $("#slSafe").val(VouchersHeader[0].SafeName);
                    $("#txtChequeNo").val(VouchersHeader[0].ChequeNo);
                    $("#txtChequeDate").val(ConvertDateFormat(GetDateWithFormatMDY(VouchersHeader[0].ChequeDate)));
                    $("#slCurrencyVoucher").val(VouchersHeader[0].CurrencyCode);
                    $("#txtCodeVoucher").val(VouchersHeader[0].Code);
                    $("#txtVoucherDate").val(ConvertDateFormat(GetDateWithFormatMDY(VouchersHeader[0].VoucherDate)));
                    if (VouchersHeader[0].IsCheque == true) {
                        
                        $('#cbIsCheque').prop("checked", true);
                        $('#cbIsDepositOrPO').prop("checked", false);

                        $(".showForIsCheque").removeClass("hide");
                        $(".hideForReciprocalBank").addClass("hide");
                        $("#txtChequeNo").attr("data-required", true);
                    }
                    else {
                        $('#cbIsCheque').prop("checked", false);
                        $('#cbIsDepositOrPO').prop("checked", true);
                        $(".hideForReciprocalBank").removeClass("hide");
                        $("#txtOtherSideBankName").val("");
                        $("#txtChequeNo").attr("data-required", false);
                    }
                    
                    
                    FadePageCover(false);
                }
                , null);
            $("#slBank").prop('disabled', true);
            $("#txtCodeVoucher").prop('disabled', true);

            
            debugger;
            ClearAll("#VoucherModal");
           
            $("#tblDetails tbody").html("");
            FadePageCover(true);
            var tr = $("#tblVoucher tr[ID='" + pID + "']");
            $("#hID").val(pID);

            $("#lblShown").html("<span> : </span><span> " + $(tr).find("td.Code").text() + "</span>");
            

            $("#slTax").val($(tr).find("td.TaxID").text());
            $("#slTax2").val($(tr).find("td.TaxID2").text());
            $("#txtTaxValue").val($(tr).find("td.TaxValue").text());
            $("#txtTaxValue2").val($(tr).find("td.TaxValue2").text());

            $("#slInvoice").val($(tr).find("td.InvoiceID").text());
            $("#txtExchangeRate").val($(tr).find("td.ExchangeRate").text());
            if ($(tr).find("td.CurrencyID").text() == $("#hDefaultCurrencyID").val())
                $("#txtExchangeRate").attr("disabled", "disabled");
            else
                $("#txtExchangeRate").removeAttr("disabled");
            $("#txtChargedPerson").val($(tr).find("td.ChargedPerson").text());
            $("#txtOtherSideBankName").val($(tr).find("td.OtherSideBankName").text());

            $("#txtNotes").val($(tr).find("td.Notes").text());
            if ($("#cbIsCheque" + pID).prop("checked"))
                $("#cbIsCheque").prop("checked", true);
            else
                $("#cbIsDepositOrPO").prop("checked", true);
           
            $("#lblTotal").html("<span> : </span><span>" + $(tr).find("td.Total").text() + "</span>");
            $("#lblTotalAfterTax").html("<span> : </span><span id='TtlAfterTax'>" + $(tr).find("td.TotalAfterTax").text() + "</span>");
            
            $("#btn-OpenInvModal").attr('disabled', 'disabled');
            $("#btn-OpenOperationModal").attr('disabled', 'disabled');
            

            if (!$("#cbApproved" + pID).prop("checked")) {
                $("#btn-PrintJV").attr("disabled", "disabled");
                $("#btn-PrintJV").attr("JVID", "0");
            }

            else {
                $("#btn-PrintJV").removeAttr("disabled");
                $("#btn-PrintJV").attr("JVID", $(tr).find("td.JVID1").text());
            }

            $("#txtChargedPerson").removeAttr("disabled");

            jQuery("#VoucherModal").modal("show");
            CallGETFunctionWithParameters("/api/Voucher/GetVoucherDetails"
                , {
                    pPageNumber: 1
                    , pPageSize: 9999
                    , pWhereClauseVoucherDetails: "WHERE VoucherID=" + pID
                    , pOrderBy: "Account_Name"
                }
                , function (pData) {
                    Details_BindTableRows(JSON.parse(pData[0]));
                    FadePageCover(false);
                }
                , null);

            if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                $("#lblShown").reverseChildren();
                $("#lblTotal").reverseChildren();
                $("#lblTotalAfterTax").reverseChildren();
                $(".swapChildrenClass:not(.reversed)").reverseChildren();
            }
            CallGETFunctionWithParameters("/api/ExchangeMovement/GetAccreditationMovement", { pHeaderID: pID }
             , function (pData) {
                 $(".RequestCreator").text("0");
                 $(".TechnicalDirector").text("0");
                 $(".CovenantAccountant").text("0");
                 $(".SecretaryTreasury").text("0");
                 $(".TreasuryReferences").text("0");
                 var AccreditationMovement = JSON.parse(pData[0]);

                 if (AccreditationMovement != "") {
                     $(".RequestCreator").text(AccreditationMovement[0].RequestCreator) == "" ? "0" : AccreditationMovement[0].RequestCreator;
                     $(".TechnicalDirector").text(AccreditationMovement[0].TechnicalDirector == "" ? "0" : AccreditationMovement[0].TechnicalDirector);
                     $(".CovenantAccountant").text(AccreditationMovement[0].CovenantAccountant == "" ? "0" : AccreditationMovement[0].CovenantAccountant);
                     $(".SecretaryTreasury").text(AccreditationMovement[0].SecretaryTreasury == "" ? "0" : AccreditationMovement[0].SecretaryTreasury);
                     $(".TreasuryReferences").text(AccreditationMovement[0].TreasuryReferences == "" ? "0" : AccreditationMovement[0].TreasuryReferences);

                 } else {
                     CallGETFunctionWithParameters("/api/ExchangeMovement/GetAccreditationMovementDetails", { VoucherID: pID, PaymentRequestID: 0 }
             , function (Data) {
                 
                 var AccreditationMovementDetails = JSON.parse(Data[0]);

                 if (AccreditationMovementDetails[0] != "") {
                     $(".RequestCreator").text(AccreditationMovementDetails[0].RequestCreator) == "" ? "0" : AccreditationMovementDetails[0].RequestCreator;
                     $(".TechnicalDirector").text(AccreditationMovementDetails[0].TechnicalDirector == "" ? "0" : AccreditationMovementDetails[0].TechnicalDirector);
                     $(".CovenantAccountant").text(AccreditationMovementDetails[0].CovenantAccountant == "" ? "0" : AccreditationMovementDetails[0].CovenantAccountant);
                     $(".SecretaryTreasury").text(AccreditationMovementDetails[0].SecretaryTreasury == "" ? "0" : AccreditationMovementDetails[0].SecretaryTreasury);
                     $(".TreasuryReferences").text(AccreditationMovementDetails[0].TreasuryReferences == "" ? "0" : AccreditationMovementDetails[0].TreasuryReferences);
                 }
             }
             , null);
                 }
                
             }


             , null);
  
}

function Details_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblDetails");

    maxDetailsIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        
        maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
        AppendRowtoTable("tblDetails",
            ("<tr ID='" + item.ID + "' " + ">"
                    + "<td class='DetailsID'> <input  disabled  " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Value' style='width:9%;'><input  disabled  tag='" + (item.Value) + "' type='text' style='width:100%;font-size:90%;'  id='txtValue" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);Voucher_CalculateTotal();' onchange='Details_SetIsRowChanged(id);Voucher_CalculateTotal();' data-required='false' value='" + (item.Value) + "' /> </td>"
                     + "<td class='Description' style='width:20%;'><input  disabled  tag='" + (item.Description) + "' type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.Description + "' /> </td>"
                     + "<td class='Account_Name' style='width:20%;'><input  disabled  tag='" + (item.Account_Name) + "' type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtAccount_Name" + item.Account_Name + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.Account_Name + "' /> </td>"
                     + "<td class='SubAccount_Name' style='width:20%;'><input  disabled  tag='" + (item.SubAccount_Name) + "' type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSubAccount_Name" + item.SubAccount_Name + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.SubAccount_Name + "' /> </td>"
                     + "<td class='CostCenterName' style='width:20%;'><input  disabled  tag='" + (item.CostCenterName) + "' type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtSubAccount_Name" + item.CostCenterName + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true' value='" + item.CostCenterName + "' /> </td>"
                    + "<td class='Documented'> <input name='Documented' disabled  id=cbDocumented" + item.ID + " type='checkbox'  " + (item.IsDocumented ? " checked='checked' " : "") + " /></td>"
                    + "<td class='SelectedIDsToUpdate hide'> <input disabled  name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td></tr>"
                   ));

        $("#slAccount" + item.ID).css({ "width": "100%" }).select2();
        $("#slSubAccount" + item.ID).css({ "width": "100%" }).select2();
        $("div[tabindex='-1']").removeAttr('tabindex');
       

        if (i == pTableRows.length - 1)
            FillHTMLtblInputs("#tblDetails > tbody");

    });

    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }

    
}
function ExchangeMovement_cbIsJVDateChanged() {
    debugger;
    if ($("#cbIsJVDate").prop("checked")) {
        $("#txtJVDate").removeAttr("disabled");
    }
    else {
        $("#txtJVDate").attr("disabled", "disabled");
        $("#txtJVDate").val(getTodaysDateInddMMyyyyFormat());
    }
}
function ExchangeMovement_FillAllControls(pID) {
    debugger;
    var tr = $("#tblVoucher tr[ID='" + pID + "']");
    var PaymentRequestID = tr.find("td").eq(1).text();

    if (PaymentRequestID == "0") {
        Voucher_FillControls(pID);
    } else {

    $("#tblPaymentRequestDetails tbody").html("");
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ExchangeMovement/LoadDetails", { pHeaderID: PaymentRequestID, pIsCustodySettlement: _IsCustodySettlement }
        , function (pData) {
            jQuery("#ExchangeMovementDetailsModal").modal("show");
            var pInvoiceDetails = JSON.parse(pData[0]);
            var pInvoiceHeader = JSON.parse(pData[4]);
            if (_IsCustodySettlement == 1) {
                PaymentRequest_ClearAllControls();
                CustodySettlementDetails_BindTableRows(pInvoiceDetails);
            }
            
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $('#txtSettlementDate').val(output);


            
            $("#hID").val(pID);
            $("#lblShown").html(pInvoiceHeader[0].Code);
            $("#txtCode").val(pInvoiceHeader[0].Code);
            $("#slCustody").val(pInvoiceHeader[0].CustodyID);
            $("#txtRequestDate").val(tr.find("td.VoucherDate").text() == "" ? "0" : tr.find("td.VoucherDate").text());
            $("#slCurrency").val(pInvoiceHeader[0].CurrencyID);
            $("#txtAmount").val(pInvoiceHeader[0].TotalEstmatedCost);
            $("#txtTotalActualCost").val(pInvoiceHeader[0].TotalActualCost);
            $("#txtSettlementAmount").val(parseFloat($("#txtTotalActualCost").val()) - parseFloat($("#txtAmount").val()))
            $("#txtNotes").val(pInvoiceHeader[0].Notes);
            

            if (!$("#cbIsApprovedRequest" + pID).prop("checked") && $("#hf_CanEdit").val() == "1")
                PaymentRequest_EnableDisableEditing(1);
            else
                PaymentRequest_EnableDisableEditing(0);

            if (pInvoiceHeader[0].IsCheck == true) {
                $('#cbIsCheck').prop("checked", true);
                $('#cbIsCash').prop("checked", false);
            }
            else {
                $('#cbIsCheck').prop("checked", false);
                $('#cbIsCash').prop("checked", true);
            }

            if (_IsCustodySettlement == 0) {
                $(".DisableWithCustody").removeAttr("disabled");
                PaymentRequestDetails_BindTableRows(pInvoiceDetails);
            }
            else {
                $(".DisableWithCustody").attr("disabled", "disabled");
            }
            
            if (pInvoiceHeader[0].CustodyID == 0 || pInvoiceHeader[0].CustodyID == null) {
                $(".Operation").addClass("hide");
                $(".Supplier").addClass("hide");
                $(".Coupon").addClass("hide");

                $(".CouponNo").addClass("hide");
                $(".SupplierNo").addClass("hide");
                $(".OperationNo").addClass("hide");
                $("#slSuppliers").removeClass("hide");
                $("#slCustody").addClass("hide");

                $("#slSuppliers").val(pInvoiceHeader[0].SupplierID);
            } else {
                $(".slOperation").removeClass("hide");
                $(".slSupplier").removeClass("hide");
                $(".Coupon").removeClass("hide");

                $(".CouponNo").removeClass("hide");
                $(".SupplierNo").removeClass("hide");
                $(".OperationNo").removeClass("hide");
                $("#slSuppliers").addClass("hide");
                $("#slCustody").removeClass("hide");

            }
            FadePageCover(false);
        }


        , null);


    CallGETFunctionWithParameters("/api/ExchangeMovement/GetAccreditationMovement", { pHeaderID: pID}
        , function (pData) {
            jQuery("#ExchangeMovementDetailsModal").modal("show");
            $(".RequestCreator").text("0");
            $(".TechnicalDirector").text("0");
            $(".CovenantAccountant").text("0");
            $(".SecretaryTreasury").text("0");
            $(".TreasuryReferences").text("0");
            var AccreditationMovement = JSON.parse(pData[0]);

            if (AccreditationMovement != "") {
                $(".RequestCreator").text(AccreditationMovement[0].RequestCreator) == "" ? "0" : AccreditationMovement[0].RequestCreator;
                $(".TechnicalDirector").text(AccreditationMovement[0].TechnicalDirector == "" ? "0" : AccreditationMovement[0].TechnicalDirector);
                $(".CovenantAccountant").text(AccreditationMovement[0].CovenantAccountant == "" ? "0" : AccreditationMovement[0].CovenantAccountant);
                $(".SecretaryTreasury").text(AccreditationMovement[0].SecretaryTreasury == "" ? "0" : AccreditationMovement[0].SecretaryTreasury);
                $(".TreasuryReferences").text(AccreditationMovement[0].TreasuryReferences == "" ? "0" : AccreditationMovement[0].TreasuryReferences);

            } else {
                CallGETFunctionWithParameters("/api/ExchangeMovement/GetAccreditationMovementDetails", { VoucherID: pID, PaymentRequestID: PaymentRequestID }
        , function (Data) {
            var AccreditationMovementDetails = JSON.parse(Data[0]);

            if (AccreditationMovementDetails[0] != "") {
                $(".RequestCreator").text(AccreditationMovementDetails[0].RequestCreator) == "" ? "0" : AccreditationMovementDetails[0].RequestCreator;
                $(".TechnicalDirector").text(AccreditationMovementDetails[0].TechnicalDirector == "" ? "0" : AccreditationMovementDetails[0].TechnicalDirector);
                $(".CovenantAccountant").text(AccreditationMovementDetails[0].CovenantAccountant == "" ? "0" : AccreditationMovementDetails[0].CovenantAccountant);
                $(".SecretaryTreasury").text(AccreditationMovementDetails[0].SecretaryTreasury == "" ? "0" : AccreditationMovementDetails[0].SecretaryTreasury);
                $(".TreasuryReferences").text(AccreditationMovementDetails[0].TreasuryReferences == "" ? "0" : AccreditationMovementDetails[0].TreasuryReferences);
            }
        }
        , null);
            }
        }


        , null);
    }
}


function PaymentRequest_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    debugger;
    $("#slCustody").prop('disabled', true);
    $("#slSuppliers").prop('disabled', true);
    $("#txtRequestDate").prop('disabled', true);
    $("#slCurrency").prop('disabled', true);
    $("#txtNotes").prop('disabled', true);
    $("#cbIsCash").prop('disabled', true);
    $("#cbIsCheck").prop('disabled', true);
}

function PaymentRequestDetails_BindTableRows(pInvoiceDetails) {
    debugger;
    ClearAllTableRows("tblPaymentRequestDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInvoiceDetails, function (i, item) {
        AppendRowtoTable("tblPaymentRequestDetails",
        ("<tr ID='" + item.ID + "' " + ">"
            + "<td class='DetailsID'> <input name='Delete' disabled='disabled' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='IsInsert hide'> <input type='checkbox' disabled='disabled' id='IsInsert" + item.ID + "' checked='checked' /></td>"
            + "<td class='Operation' style='width:20%;' val=''><select disabled='disabled' tag='" + (item.OperationID == 0 ? "" : item.OperationID) + "' id='slOperation" + item.ID + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='GetSuppliers_Charges(" + item.ID + ");Details_HouseAndCertificateChangedByOperation(" + item.ID + ");' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slOperation').html() + "</select></td>"
            + "<td class='HouseNumber hide' style='width:10%;' val=''><select disabled='disabled' tag='" + (item.HouseID == 0 ? "" : item.HouseID) + "' id='slHouse" + item.ID + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slHouse').html() + "</select></td>"
            + "<td class='TruckingOrder hide' style='width:10%;' val=''><select disabled='disabled' tag='" + (item.TruckingOrderID == 0 ? "" : item.TruckingOrderID) + "' id='slTruckingOrder" + item.ID + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onchange='' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slTruckingOrder').html() + "</select></td>"
            + "<td class='FlagChargeType' style='width:5%;' val=''><input disabled='disabled' id='cbFlagChargeType" + item.ID + "' " + (item.FilterChargeTypes ? "checked" : "") + "  name='FlagChargeType' onchange='GetChargeTypesToOperation(" + item.ID + ");' type='checkbox' value='" + item.FilterChargeTypes + "' /></td>"
            + "<td class='ChargeType' style='width:15%;' val=''><select disabled='disabled' tag='" + (item.ChargeTypeID == 0 ? "" : item.ChargeTypeID) + "' id='slChargeType" + item.ID + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + item.ID + ");'  data-required='false'>" + $('#slChargeType').html() + "</select></td>"
            + "<td class='Supplier' style='width:15%;' val=''><select disabled='disabled'  tag='" + (item.SupplierID == 0 ? "" : item.SupplierID) + "' id='slSupplier" + item.ID + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slSupplier').html() + "</select></td>"
            + "<td class='EstmatedCost' style='width:9%;'><input type='text' disabled='disabled' tag='" + (item.EstmatedCost) + "' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + item.ID + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='" + item.EstmatedCost + "' /> </td>"
            + "<td class='Coupon hide' style='width:5%;'><input type='text' disabled='disabled' tag='" + (item.Coupon) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + item.ID + "' class='controlStyle Coupon inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Coupon + "' /> </td>"
            + "<td class='Description' style='width:5%;'><input type='text' disabled='disabled' tag='" + (item.Description) + "' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + item.ID + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='true' value='" + item.Description + "' /> </td>"
        + "</tr>"));

        if (i == pInvoiceDetails.length - 1) {
            debugger;
            FillHTMLtblInputs("#tblPaymentRequestDetails > tbody");
            $("#slChargeType" + item.ID).val(item.ChargeTypeID == 0 ? "" : item.ChargeTypeID)
        }
    }

    );
    $(".HouseNumber").removeClass("hide");
    $(".TruckingOrder").removeClass("hide");
    $(".Coupon").removeClass("hide");

    $(".classShowForDepartementHouse").removeClass("hide");
    $(".classShowForDepartementTrOr").removeClass("hide");
    $(".classShowForDepartementCopon").removeClass("hide");
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPaymentRequestDetails", "ID", "cb-CheckAll-PaymentRequestDetails");
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#slCustody").prop('disabled', true);
    $("#slSuppliers").prop('disabled', true);
    $("#txtRequestDate").prop('disabled', true);
    $("#slCurrency").prop('disabled', true);
    $("#txtNotes").prop('disabled', true);
    $("#cbIsCash").prop('disabled', true);
    $("#cbIsCheck").prop('disabled', true);
}

function Accept(pID) {
    $("#EX_Note").val();
    $("#EX_ID").val(pID);
    $("#EX_Type").val(true);
    jQuery("#ExchangeMovementModal").modal("show");
}

function Rejection(pID) {
    $("#EX_Note").val();
    $("#EX_ID").val(pID);
    $("#EX_Type").val(false);
    jQuery("#ExchangeMovementModal").modal("show");
}
function ExchangeMovement_Save() { //pValue 1:Post, 2:Unpost
    debugger;
    var pVoucherID = $("#EX_ID").val();
    var pNotes = $("#EX_Note").val();
    var pIsAccept = $("#EX_Type").val();
    var pParametersWithValues = {
        pVoucherID: pVoucherID
        , pNotes: pNotes
        , pIsAccept: pIsAccept
    }
    CallPOSTFunctionWithParameters("/api/ExchangeMovement/ExchangeMovement_Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "") {
                    jQuery("#ExchangeMovementModal").modal("hide");
                    swal("", "تم الحفظ بنجاح.")
                    ExchangeMovement_LoadingWithPaging();
                }
                else {
                    jQuery("#ExchangeMovementModal").modal("hide");
                    swal("Sorry", _ReturnedMessage);
                    ExchangeMovement_LoadingWithPaging();
                }
                LoadDefaults("/api/Defaults/LoadAll", " WHERE 1=1 ");
            }
            , null);

    $("#EX_Note").val("");
}


function AcceptList(type) {
    debugger;
    var pVoucherID = GetAllSelectedIDsAsString('tblVoucher', 'Delete');
    
        var pParametersWithValues = {
               pVoucherID: pVoucherID
             , pNotes: ""
             , pIsAccept: type
        }
        CallPOSTFunctionWithParameters("/api/ExchangeMovement/ExchangeMovement_Save", {
            pVoucherID: pVoucherID
             , pNotes: ""
             , pIsAccept: type
        }
             , function (pData) {
                 var _ReturnedMessage = pData[0];
                 if (_ReturnedMessage == "") {
                     jQuery("#ExchangeMovementModal").modal("hide");
                     swal("", "تم الحفظ بنجاح.")
                     ExchangeMovement_LoadingWithPaging();
                 }
                 else {
                     jQuery("#ExchangeMovementModal").modal("hide");
                     swal("Sorry", _ReturnedMessage);
                     ExchangeMovement_LoadingWithPaging();
                 }
             }
             , null);
    
}


function Details_HouseAndCertificateChangedByOperation(pRowID) {
    debugger;
    if (0 == 0) {
        //$("#slHouse" + pRowID).val(0);
        //$("#slCertificateNumber" + pRowID).val(0);
        //$("#slTruckingOrder" + pRowID).val(0);



        Details_FillSlHouseAndCertificate("slHouse" + pRowID, pRowID, 1);
        // Details_FillSlHouseAndCertificate("slCertificateNumber" + pRowID, pRowID, 2);
        Details_FillSlHouseAndCertificate("slTruckingOrder" + pRowID, pRowID, 3);


    }


}

function GetSuppliers_Charges(ID) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + $('#slOperation' + ID + '').val() + " AND PartnerID IS NOT NULL  ORDER BY PartnerTypeName ";
    var pSlName = "slSupplier" + ID;
    var pStrFirstRow = "Select Supplier";
    //var pStrFnName = "/api/OperationPartners/LoadAll";
    var pID = "0";
    if ($('#slOperation' + ID + '').val() != "0")
        $.ajax({
            type: "GET",
            url: "/api/OperationPartners/LoadAll",
            data: { pWhereClause: pWhereClause },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                ClearAllOptions(pSlName);
                var option = "";
                if (pStrFirstRow != null)
                    option += '<option value="" PartnerTypeID="0" PartnerID="0" PaymentTermID="0" ClientEmailNotContact="0" Email="0">' + pStrFirstRow + '</option>';
                // Bind Data
                $.each(JSON.parse(data[0]), function (i, item) {
                    if (pID != null && pID != undefined) //in case of editing
                        if (pID == item.ID)
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + ' selected >' + item.Code + ": " + item.Name + '</option>';
                        else
                            option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + ' PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                    else
                        option += '<option value=' + item.ID + ' ClientEmailNotContact="' + item.ClientEmailNotContact + '"' + ' Email="' + item.Email + '"' + ' PartnerTypeID = ' + item.PartnerTypeID + ' PartnerID = ' + item.PartnerID + '     PaymentTermID = ' + item.PaymentTermID + '>' + item.Code + ": " + item.Name + '</option>';
                });

                $("#" + pSlName).append(option);
                $('#slSupplier' + ID).val($('#slSupplier' + ID).attr('tag'));


                if ($('#slCustody').val() != "" && $('#slCustody').val() != "0") {

                    var ID = 0;
                    var CustodyID = 0;
                    $('#tblPaymentRequestDetails > tbody > tr').each(function (i, tr) {
                        ID = $(tr).attr('ID');
                        CustodyID = $("#slSupplier" + ID + " option[partnerid='" + $('#slCustody').val() + "']").val();
                        $("#slSupplier" + ID).val(CustodyID);

                    });
                }

                //if (callback != null && callback != undefined)
                //    callback();
            },
            error: function (jqXHR, exception) {
                swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! GetListWithName in mainapp.master.js", "");
                FadePageCover(false);
            }

        });

}


function LoadAllChargeType() {
    debugger;
    // var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-btn-AddPaymentRequestDetails' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'></span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);

    $("#slChargeType > option").each(function () {
        if (this.value != 0) {
            ++maxDetailsIDInTable;

            var tr = "";
            tr += "<tr ID='" + maxDetailsIDInTable + "' isdeleted='0' tag='item'   counter='" + (maxDetailsIDInTable) + "' value='" + 0 + "'>"
            tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
            tr += "     <td class='DetailsID' style='width:2%;'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + 0 + "' /></td>";
            tr += "     <td class='Operation' style='width:20%;' val=''><select id='slOperation" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slOperation' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");Details_HouseAndCertificateChangedByOperation(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='HouseNumber' style='width:7%;' val=''><select id='slHouse" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slHouse' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            //  tr += "     <td class='CertificateNumber' style='width:7%;' val=''><select id='slCertificateNumber" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slCertificateNumber' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='TruckingOrder' style='width:7%;' val=''><select id='slTruckingOrder" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slTruckingOrder' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetSuppliers_Charges(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";



            tr += "     <td class='FlagChargeType' style='width:5%;' val=''><input id='cbFlagChargeType" + maxDetailsIDInTable + "' name='FlagChargeType' onchange='GetChargeTypesToOperation(" + maxDetailsIDInTable + ");'  type='checkbox' value='" + maxDetailsIDInTable + "' /></td>"
            tr += "     <td class='ChargeType' style='width:15%;' val=''><select tag='" + (this.value) + "' id='slChargeType" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slChargeType' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  onchange='GetInitialValue(" + maxDetailsIDInTable + ");'  data-required='true'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='Supplier' style='width:15%;' val=''><select id='slSupplier" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle slSupplier' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + "<option value=0></option>" + "</select></td>";
            tr += "     <td class='EstmatedCost' style='width:9%;'><input type='text' style='width:100%;font-size:90%;'  id='txtEstmatedCost" + maxDetailsIDInTable + "' class='controlStyle inputValue' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);PaymentRequestDetails_CalculateAmount();' onchange='PaymentRequestDetails_CalculateAmount();' data-required='true' value='' /> </td>";
            tr += "     <td class='Coupon' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtCoupon" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtCoupon" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtCoupon" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            tr += "     <td class='Description' style='width:5%;'><input type='text' style='width:100%;font-size:90%;text-transform:uppercase;' id='txtDescription" + maxDetailsIDInTable + "' class='controlStyle inputDescription'  onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='' data-required='false' value='" + ($("#txtDescription" + (maxDetailsIDInTable - 1)).val() == undefined ? "" : $("#txtDescription" + (maxDetailsIDInTable - 1)).val()) + "' /> </td>";
            //tr += "      <td class='Documented' style='width:1%;'><input id='cbDocumented" + maxDetailsIDInTable + "' name='Documented'  class='cbIsDocumented' type='checkbox' value='' ></td>";
            tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate'  id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
            tr += "     <td class='hide'>"
              + "</td>";
            tr += "</tr>";

            $("#tblPaymentRequestDetails tbody").prepend(tr);
            if ($("[id$='hf_ChangeLanguage']").val() == "ar")
                $("#tblPaymentRequestDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();
            /***************************Filling row controls******************************/

            $("#slOperation" + maxDetailsIDInTable).html($("#slOperation").html());
            $("#slHouse" + maxDetailsIDInTable).html($("#slHouse").html());
            //$("#slCertificateNumber" + maxDetailsIDInTable).html($("#slCertificateNumber").html());
            $("#slTruckingOrder" + maxDetailsIDInTable).html($("#slTruckingOrder").html());



            $("#slChargeType" + maxDetailsIDInTable).html($("#slChargeType").html());
            $("#slSupplier" + maxDetailsIDInTable).html($("#slSupplier").html());

            $("#slChargeType" + maxDetailsIDInTable).val(this.value);
        }
    });
    BindAllCheckboxonTable("tblPaymentRequestDetails", "DetailsID", "cb-CheckAll-PaymentRequestDetails");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePaymentRequestDetailsID");
}