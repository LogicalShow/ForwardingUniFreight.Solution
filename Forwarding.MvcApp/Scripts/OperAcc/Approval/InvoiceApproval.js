

var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
var glbNumberOfInvoiceRoutings = 0;

$(document).ready(function () {
    $("#slCostCenter").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');

    $(document).on('keyup', 'input.select2-search__field', function (e) {
        debugger;

        if (currentID != this.parentElement.nextElementSibling.children[0].id) {
            currentID = this.parentElement.nextElementSibling.children[0].id;
            SearchText = "";
        }


        if (lastInputTimeStamp != e.originalEvent.timeStamp) {
            if (e.keyCode == 8 || e.charCode == 8)  // backspace pressed
            {
                SearchText = SearchText.slice(0, -1)
            }
            else if (e.key.length == 1) {
                SearchText += e.key;
                //setTimeout(function () {
                //    // to prevent repeated inputs
                //}, 50);
            }
        }
        lastInputTimeStamp = e.originalEvent.timeStamp



    });
    
});
function InvoiceApproval_Initialize() {
    debugger;
    strBindTableRowsFunctionName = "InvoiceApproval_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Invoices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    LoadView("/OperAcc/InvoiceApproval", "div-content", function () {
        $("#slEditInvoiceCurrency").html($("#hReadySlCurrencies").html());
        if (pDefaults.UnEditableCompanyName == "CAL" || pDefaults.UnEditableCompanyName == "MAR")
            $("#cbPrintHeaderInvoice").prop("checked", true);
        if (pDefaults.UnEditableCompanyName == "MAR")
            $("#cbPrintFooterInvoice").prop("checked", true);
        if (pDefaults.UnEditableCompanyName == "ELI")
            $(".classShowForELI").removeClass("hide");
        if (pDefaults.UnEditableCompanyName == "SEF")
            $(".classShowForSEF").removeClass("hide");
        else if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        if (pDefaults.UnEditableCompanyName != "GBL") {
            $("#btn-PrintMultipleInvoices").removeClass("hide");
            $("#btn-PrintMultipleInvoicesNew").removeClass("hide");
            $("#btn-PrintMultipleDiffrenceInvoices").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "LATT") {
            $('#invoicesTableHeaderVessel').text('Client Integrated');
            $('table').removeClass("table-striped");
        }
        if (pDefaults.UnEditableCompanyName == "COS") {
            $("#slDraftInvoiceTrucker").parent().removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "SEF") {
            $('input#cbPrintSONumber').parent('label').html('<input type="checkbox" checked id="cbPrintSONumber" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);">&nbsp;Supplier Reference');
        }
        if (IsMESCOCompany && (glbCallingControl == "FirstStepDraftInvoiceApproval" || glbCallingControl == "DraftInvoicesApprovals")) {
            $(".classShowForMesco").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "UNF") {
            $(".classShowForUNI").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "TRM") {
            $("#slInvoiceTitle").removeClass("hide");
            $("#cbPrintHeaderInvoice").prop("checked", true);
            $("#cbPrintBankDetailsFromTemplate").prop("checked", true).trigger('change');
        }
        if (pDefaults.UnEditableCompanyName == "FLA") {
            $("#cbPrintHeaderInvoice").prop("checked", true);
            $("#cbAddNotesToItems").prop("checked", true);
            $("#cbPrintBankDetailsFromDefaults").prop("checked", true);
            $("#cbPrintMBL").prop("checked", false);
            $("#cbPrintHBL").prop("checked", false);
        }
        else if (pDefaults.UnEditableCompanyName == "FWD") {
            $("#cbPrintHeaderInvoice").prop("checked", true);
            $("#cbPrintFooterInvoice").prop("checked", true);
            $("#cbAddNotesToItems").prop("checked", true);
            $("#cbPrintHBL").prop("checked", false);
        }
        if (pDefaults.UnEditableCompanyName == "UNF" && glbCallingControl == "FirstStepDraftInvoiceApproval") {
            $("#slNewInvoiceTypeForDraft").removeClass("hide");
            $("#btn-ApproveAndTransferAllSelected").removeClass("hide");
        }
        if (IsAccountingActive) $(".classAccountingOption").removeClass("hide");
        else $(".classAccountingOption").addClass("hide");
        if (pDefaults.UnEditableCompanyName == "IST" || pDefaults.UnEditableCompanyName == "KML"
            || pDefaults.UnEditableCompanyName == "KDS" || $("#hDefaultUnEditableCompanyName").val() == "NEW"
            || pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "COS") {
            $("#slEditInvoiceAddressTypes").attr("data-required", "false");
        }
        else {
            $("#slEditInvoiceAddressTypes").attr("data-required", "true");
        }
        if (pDefaults.IsTaxOnItems)
            $(".classShowForTaxOnItems").removeClass("hide");
        else
            $(".classShowForTaxOnHeader").removeClass("hide");

        var pWhereClause = (glbCallingControl == "InvoiceStatusForm"
            ? " WHERE IsApproved=1 AND InvoiceTypeID<>(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') " + " \n"
            : (glbCallingControl == "FirstStepDraftInvoiceApproval"
                ? (" WHERE " + (" InvoiceTypeID=(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') ") + " AND IsDeleted=0 AND IsApproved=0 AND ChildInvoiceID IS NULL AND IsDraftApproved=0")
                : (" WHERE " + (glbCallingControl == "DraftInvoicesApprovals" ? " InvoiceTypeID=(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') AND IsDraftApproved=1 " : " InvoiceTypeID<>(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') ") + " AND IsDeleted=0 AND IsApproved=0")
            )
        );

        // if this is Draft Approval or Draft Transfer to invoice screens
        // then view only drafts related to CSF tariffs linked with current user or other draft not linked with tariffs
        if (glbCallingControl == "FirstStepDraftInvoiceApproval" || glbCallingControl == "DraftInvoicesApprovals")
        {
            pWhereClause += "\n" + " AND (TariffID IS NULL OR TariffID IN (SELECT utd.WH_CSL_TariffID FROM User_WH_CSL_TariffDraft AS utd WHERE utd.CanApprove = 1 AND utd.UserID = " + $("#hLoggedUserID").val() + " )) ";
        }

        pWhereClause += "\n" + " AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ")" + "\n";
        if (pDefaults.UnEditableCompanyName == "LIN" && glbCallingControl == "InvoiceStatusForm") {
            $('#slInvoiceStatus').val('UnPaid');
            $("#select-page-size").append('<option value="500">500</option>');
        }
        if (CheckValueIsValidInput('#slInvoiceStatus')) {
            pWhereClause += " AND InvoiceStatus='" + $('#slInvoiceStatus').val() + "' \n";
        }
        //var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC ";
        var pOrderBy = " ID DESC ";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pControllerParameters = { pIsLoadArrayOfObjects: true, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                if (pDefaults.UnEditableCompanyName == "TRM") {
                    GetListWithNameAndWhereClause(1, "/api/BankTemplate/LoadAll", "<--Select Bank Template-->", "slBankTemplate", "ORDER BY Name", null);
                } else {
                    GetListWithNameAndWhereClause(null, "/api/BankTemplate/LoadAll", "<--Select Bank Template-->", "slBankTemplate", "ORDER BY Name", null);
                }
                InvoiceApproval_BindTableRows(JSON.parse(pData[0]));
                //FillListFromObject(null, 5/*pCodeOrName*/, TranslateString("AllPartners"), "slPartner", pData[2]
                //    , null/*function () { $("#slPaymentPartner").html($("#slPartner").html()); }*/); /*function () { $("#slARFAirline").html($("#slARFSupplier").html()); $("#slARFAirline option[ServiceID!=" + constServiceAirlines + "][value!=''" + "]").addClass("hide"); }*/

                //FillListFromObject(null, 1/*pCodeOrName*/, "All Oper.s", "slOperation", pData[3], null);
                //FillListFromObject(null, 2/*pCodeOrName*/, null/*"Select Pay. Type"*/, "slPaymentType", pData[4], null);
                FillListFromObject(null, 1/*pCodeOrName*/, TranslateString("AllPartnerTypes")/*"Select Pay. Type"*/, "slPartnerType", pData[5], null);
                FillListFromObject(null, 2/*pCodeOrName*/, "Select Trucker", "slDraftInvoiceTrucker", pData[10], null);
                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("CostCenters"), "slCostCenter", pData[6], null);

                Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pData[11], "ID", "Code", '', TranslateString("SelectFromMenu"), "#slInvoicePaymentTermsFromPTModal", "", "Days", null);

                $("#slInvoiceCurrency").html($("#hReadySlCurrencies").html());
                $('#slInvoiceCurrency').prepend('<option value="0" selected="selected">Choose currency</option>');

                //Start Auto Filter
                $(document).ready(function () {
                    $("#slCostCenter").css({ "width": "100%" }).select2();
                    $("div[tabindex='-1']").removeAttr('tabindex');
                });
                //End Auto Filter

                /*if (pDefaults.UnEditableCompanyName == "REL" && $('#txtEmailInvoiceBody').length == 0) {
                    $("#CheckboxesListModal fieldset").append('<br><br><textarea id="txtEmailInvoiceBody"></textarea>');
                    $('#txtEmailInvoiceBody').summernote();
                }*/

                //Printing invoice items with notes by default in NewTrans
                if (pDefaults.UnEditableCompanyName == "NEW" || pDefaults.UnEditableCompanyName == "TRM")
                    $("#cbAddNotesToItems").prop("checked", true);

                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("Inv.Type"), "slInvoiceType", pData[7],
                    function () {
                        if (pDefaults.UnEditableCompanyName == "UNF") {
                            let InvTypes = JSON.parse(pData[7]);
                            let types = InvTypes.filter(function (item) {
                                return item.IsMainInvoice  == 1;
                            });
                            FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("Inv.Type"), "slNewInvoiceTypeForDraft", JSON.stringify(types), null);
                        }else
                            $("#slNewInvoiceTypeForDraft").html($("#slInvoiceType").html());

                        if (pDefaults.UnEditableCompanyName == "SAF")
                            $("#slNewInvoiceTypeForDraft option:contains('IACCSEEDS')").addClass("hide");
                    });
                if (IsMESCOCompany) {
                    debugger;
                   // $('#btn-Delete').addClass('hide');
                    let InvTypes = JSON.parse(pData[7]);
                    let types = InvTypes.filter(function (item) {
                        return item.ParentInvoiceTypeID == 0 && item.ID != 25 ;
                    });
                    FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("Inv.Type"), "slNewInvoiceTypeForDraft", JSON.stringify(types),null);
                }
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEditInvoiceTransactionTypes", pData[8], null);
                //FillListFromObject(null, 7/*pCodeOrName*/, "Select Bank Account", "slPaymentBankAccount", pData[6], null);
                $("#slBranch").append($("#hReadySlBranches").html()); $("#slBranch").val("0");
                //$("#slARFCurrency").html($("#hReadySlCurrencies").html());
                $("#slPaymentDetailsCurrency").html($("#hReadySlCurrencies").html());
                //if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass").reverseChildren();
                switch (glbCallingControl) {
                    case "FirstStepDraftInvoiceApproval": {
                        $("#slInvoiceType").parent().addClass("hide");
                        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                            $("#h3InvoiceApproval").text("إعتماد مسودة الفواتير");
                        } else {
                            $("#h3InvoiceApproval").text("Approve Draft Invoices");
                        }
                        $("#liOperAcc").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        $("#liApprovals").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        break;
                    }
                    case "DraftInvoicesApprovals": {
                        if (pDefaults.UnEditableCompanyName == "COS")
                            $("#btn-ImportFromEDI").removeClass("hide");
                        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                            $("#btn-ApproveAllSelected").text("نقل المحدد");
                        }
                        else {
                            $("#btn-ApproveAllSelected").text("Transfer Selected");
                        }
                        $("#slNewInvoiceTypeForDraft").removeClass("hide");
                        $("#slInvoiceType").parent().addClass("hide");
                        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                            $("#h3InvoiceApproval").text("نقل مسودة الفواتير");
                        } else {
                            $("#h3InvoiceApproval").text("Transfer Draft Invoices");
                        }
                        $("#liOperAcc").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        $("#liApprovals").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        break;
                    }
                    case "InvoiceStatusForm": {
                        $("#slInvoiceType").parent().removeClass("hide");
                        if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                            $("#h3InvoiceApproval").text("حالة الفواتير");
                        }
                        else {
                            $("#h3InvoiceApproval").text("Invoice Status");
                        }
                        $("#liOperAcc").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        $("#liApprovals").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        break;
                    }
                    case "AccountingInvoicesApprovals": {
                        $("#slInvoiceType").parent().removeClass("hide");
                        $("#liOperAcc").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        $("#liApprovals").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                        break;
                    }
                    default: {
                        $("#slInvoiceType").parent().removeClass("hide");
                        $("#liOperAcc").attr("onclick", "LoadViews('Approvals');");
                        $("#liApprovals").attr("onclick", "LoadViews('Approvals');");
                        break;
                    }
                } //switch (glbCallingControl) {
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

        Select2OnlineSearch("slPartner", "/api/Voucher/LoadAllPartnersForSelect2Combo", function (params) {
            var query = {
                pWhereClauseWithMinimalColumns: " WHERE Name like N'%" + params.term.trim() + "%'",
                pOrderBy: "ID",
                pPartnerTypeID: $("#slPartnerType").val() == "" || $("#slPartnerType").val() == null ? 0 : $("#slPartnerType").val(),
                pDummy: false
            }
            return query;
        }, function (data) {
            var d = JSON.parse(data[0]);
            return {

                results: $.map(d, function (item) {
                    return {
                        text: item.Name,
                        id: item.ID,
                        value: item.ID
                    };
                })
            };
        }, 3, 2000);

    },
        null,
        function () { Invoices_DeleteList(); });

}

function Invoices_PartnerUpdate_OpenModal(pInvoiceID, pReportTypeID, pOption, pCopyOrOriginal) {
    debugger;
    let pVATNumber = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoiceVATNumber").text();
    let pClientName = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartner").text();
    let pOnBehalfName = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.OnBehalfName").text();
    let pPartnerTypeID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartnerTypeID").text();
    let pPartnerID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartnerID").text();

    if (pPartnerTypeID != constCustomerPartnerTypeID && pDefaults.UnEditableCompanyName != "COS") {
        swal("Sorry", "This option works only with customers. Please, edit from master data.");
    }
    else if (pPartnerTypeID != constCustomerPartnerTypeID && pPartnerTypeID != constTruckerPartnerTypeID && pDefaults.UnEditableCompanyName == "COS")
        swal("Sorry", "This option works only with customers & Truckers. Please, edit from master data.");
    else {
        $("#lblUpdatePartnerShown").text(pClientName);
        $("#txtUpdatePartnerClientName").val(pClientName);
        $("#txtUpdatePartnerVATNumber").val(pVATNumber);
        if (pPartnerTypeID == constTruckerPartnerTypeID) {
            $("#slDraftInvoiceTrucker").val(pPartnerID);
            $("#txtUpdatePartnerClientName").val(pOnBehalfName);
            $("#txtUpdatePartnerVATNumber").val("");
        }
        else
            $("#slDraftInvoiceTrucker").val("");
        $("#btnUpdatePartner").attr("onclick", "Invoices_PartnerUpdate(" + pInvoiceID + ")");
        jQuery("#UpdatePartnerModal").modal("show");
    }
}
function Invoices_PartnerUpdate(pInvoiceID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "COS" && ($("#txtUpdatePartnerVATNumber").val().trim() == "" || $("#txtUpdatePartnerVATNumber").val().trim() == 0 || $("#txtUpdatePartnerClientName").val().trim() == "" || $("#txtUpdatePartnerClientName").val().trim() == 0) && ($("#slDraftInvoiceTrucker").val() == "" || $("#slDraftInvoiceTrucker").val() == 0))
        swal("Sorry", "Please, enter Client Name / VAT Number or select a trucker");
    else if (pDefaults.UnEditableCompanyName == "COS" && $("#slDraftInvoiceTrucker").val() != "" && $("#txtUpdatePartnerClientName").val() == "")
        swal("Sorry", "Please, enter on behalf name");
    else if (pDefaults.UnEditableCompanyName != "COS" && ($("#txtUpdatePartnerVATNumber").val().trim() == "" || $("#txtUpdatePartnerVATNumber").val().trim() == 0
        || $("#txtUpdatePartnerClientName").val().trim() == "" || $("#txtUpdatePartnerClientName").val().trim() == 0))
        swal("Sorry", "Please, enter Client Name / VAT Number");
    else {
        FadePageCover(true);
        let pClientID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartnerID").text();
        let pPartnerTypeID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartnerTypeID").text();
        let pOperationPartnerID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoicePartner").attr("val");
        let pOperationID = $("#tblInvoices tr[ID=" + pInvoiceID + "] td.InvoiceOperationID").text();

        let pFunctionName = "";
        if (pPartnerTypeID == constCustomerPartnerTypeID)
            pFunctionName = "/api/Customers/UpdateVATNumber";
        else if (pPartnerTypeID == constAgentPartnerTypeID)
            pFunctionName = "/api/Agents/UpdateVATNumber";

        if ($("#slDraftInvoiceTrucker").val() != 0 && $("#slDraftInvoiceTrucker").val() != "") {
            let truckerData = {
                TruckerID: $("#slDraftInvoiceTrucker").val(),
                InvoiceID: pInvoiceID,
                OperationID: pOperationID,
                OnBehalfName: $("#txtUpdatePartnerClientName").val()
            }
            CallPOSTFunctionWithParameters("/api/Invoices/SetDraftInvoiceTrucker", truckerData, function (pData) {
                debugger;
                let Status = pData[0];
                let ReturnedMessage = pData[1];
                if (Status) {
                    swal("Success", "Saved successfully.");
                    jQuery("#UpdatePartnerModal").modal("hide");
                    InvoiceApproval_LoadingWithPaging();
                }
                else {
                    swal("Sorry", ReturnedMessage);
                    InvoiceApproval_LoadingWithPaging();
                }
            });
        } else {
            pParametersWithValues = {
                pClientIDToUpdateVATNo: pClientID
                , pName: $("#txtUpdatePartnerClientName").val().trim().toUpperCase()
                , pVATNumber: $("#txtUpdatePartnerVATNumber").val().trim().toUpperCase()
                , pOperationID: pOperationID
                , pOperationPartnerID: pOperationPartnerID
            };
            CallGETFunctionWithParameters(pFunctionName, pParametersWithValues
                , function (pData) {
                    let _ReturnedMessage = pData[0];
                    if (_ReturnedMessage == "") {
                        swal("Success", "Saved successfully.");
                        jQuery("#UpdatePartnerModal").modal("hide");
                        InvoiceApproval_LoadingWithPaging();
                    }
                    else {
                        swal("", _ReturnedMessage);
                        InvoiceApproval_LoadingWithPaging();
                    }
                }, null, true);
        }   
    }
}

function InvoiceApproval_BindTableRows(pInvoices) {
    debugger;
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblInvoices");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    var NoteControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-paperclip' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Notes" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Mail") + "</span>";
    $.each(pInvoices, function (i, item) {
        let invNo = "<td class='InvoiceNumber'>" + item.InvoiceNumber + "/" + (pDefaults.UnEditableCompanyName == "MAN" && item.InvoiceTypeCode == "DRAFT" ? "PROFORMA INVOICE" : item.InvoiceTypeName) + (item.ChildInvoiceID > 0 ? (" --> " + item.ChildInvoiceNumber + "/" + item.ChildInvoiceTypeName) : "")    + "</td>";
        if (pDefaults.UnEditableCompanyName == "LATT") {
            invNo = "<td class='InvoiceNumber'>" + item.InvoiceTypeCode + " " + String(item.InvoiceNumber).padStart(5, '0') + (item.ChildInvoiceID > 0 ? (" --> " + item.ChildInvoiceNumber + "/" + item.ChildInvoiceTypeName) : "") + "</td>";
        }
        AppendRowtoTable("tblInvoices",
            //("<tr ID='" + item.ID + "' "
            //    + (glbCallingControl == "InvoiceStatusForm"
            //    ? !IsMESCOCompany? ('ondblclick="InvoiceStatus_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"') :''
            //    : ((/*OEInv && $("#hIsOperationDisabled").val() == false &&*/ item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false/*&& item.InvoiceTypeCode != "CREDITMEMO"*/) ? ('ondblclick="Invoices_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"') : (item.InvoiceStatus == "UnPaid" && item.IsApproved && item.ChildInvoiceID == 0 ? 'ondblclick="InvoicesPaymentTerm_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"' : ""))
            //    )
            //    + " class='"
            //    + (item.IsDeleted
            //        ? ' static-text-danger '
            //        : ((item.InvoiceStatus == "UnPaid" && !item.IsApproved && !item.IsDraftApproved && item.ChildInvoiceID == 0 && item.IsHold == false)
            //            ? ""
            //            : (item.ChildInvoiceID == 0 && glbCallingControl == "DraftInvoicesApprovals") ? "" : " static-text-primary ")
            //    )
            //    + "'"
            //    + ">"

            //----------------------------------
            ("<tr ID='" + item.ID + "' "
                + (item.IsValidPortal == 1
                    ? ""  // ✅ لو IsValidPortal = 1 → مفيش دبل كليك خالص
                    : (glbCallingControl == "InvoiceStatusForm"
                        ? !IsMESCOCompany
                            ? ('ondblclick="InvoiceStatus_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"')
                            : ''
                        : ((item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false)
                            ? ('ondblclick="Invoices_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"')
                            : (item.InvoiceStatus == "UnPaid" && item.IsApproved && item.ChildInvoiceID == 0
                                ? 'ondblclick="InvoicesPaymentTerm_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"'
                                : "")
                        )
                    )
                )
                + " class='"
                + (item.IsDeleted
                    ? ' static-text-danger '
                    : ((item.InvoiceStatus == "UnPaid" && !item.IsApproved && !item.IsDraftApproved && item.ChildInvoiceID == 0 && item.IsHold == false)
                        ? ""
                        : (item.ChildInvoiceID == 0 && glbCallingControl == "DraftInvoicesApprovals") ? "" : " static-text-primary ")
                )
                + "'"
                + ">"
                //("<tr ID='" + item.ID + "'>"
                //+ "<td class='InvoiceID'> <input" + (item.InvoiceStatus == "UnPaid" && item.ChildInvoiceID == 0 && !(item.IsDeleted && item.IsApproved) ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceID'> <input" + (item.ChildInvoiceID == 0 && !(item.IsDeleted && item.IsApproved) && item.IsHold == false && ((item.InvoiceStatus != "Cancelled by credit note" || pDefaults.UnEditableCompanyName == "LATT") || (item.IsApproved == 0 && IsMESCOCompany)) ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceBranchName'>" + item.BranchName + "</td>"
                + invNo
                //+ "<td class='UniqueSerial hide classShowForMescoAccounting'>"  + (item.UniqueSerial === 0 ? "" : item.UniqueSerial)    + "</td>"
                + "<td class='InvoiceTypeCode hide'>" + item.InvoiceTypeCode + "</td>"
                + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"

                //+ "<td class='InvoicePartnerID hide'>" + item.PartnerID + "</td>"
                //+ "<td class='InvoicePartnerTypeID hide'>" + item.PartnerTypeID + "</td>"
                + "<td class='InvoicePartner' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
                //+ "<td class='InvoicePartnerTypeCode hide'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

                + (pDefaults.UnEditableCompanyName == "LATT" ? ("<td class='IsIntegratedCustomer'> <input type='checkbox' disabled='disabled' val='" + (item.VesselName == 'IntegratedCustomer' ? "true' checked='checked'" : "'") + " /></td>") : ("<td class='InvoiceVesselName'>" + (item.VesselName == 0 ? "" : item.VesselName) + "</td>"))

                //+ "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                //+ "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount + "</td>"
                //+ "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                //+ "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount + "</td>"
                //+ "<td class='InvoiceFixedDiscount hide'>" + item.FixedDiscount + "</td>"

                + "<td class='InvoiceAmountWithoutVAT '>" + item.AmountWithoutVAT + "</td>"
                + "<td class='VATFromItems  '>" +""+ "</td>"
                //+ "<td class='VATFromItems  '>" + (item.VATFromItems == 0 ? item.TaxAmount : item.VATFromItems  )+ "</td>"
                //+ "<td class='InvoiceVATNumber hide'>" + (item.VATNumber == 0 ? "" : item.VATNumber) + "</td>"
                + "<td class='InvoiceAmount'>" + item.Amount.toFixed(2) + "</td>"
                + "<td class='InvoiceCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='InvoiceMasterDataExchangeRate '>" + (pDefaults.UnEditableCompanyName == "SUS" ? item.MasterDataExchangeRate : item.MasterDataExchangeRate.toFixed(2)) + "</td>"
                + "<td class='InvoiceDueDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"
                //+ "<td class='IsDocIn hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocIn == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='IsDocOut hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocOut == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='IsPrintISOCode hide'> <input type='checkbox' disabled='disabled' val='" + (item.PrintISOCode == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_Print(" + item.ID + ");' " + printControlsText + "</a></td></tr>"));
                //+ "<td class='InvoiceCustomerReference hide'>" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "</td>"
                //+ "<td class='InvoicePaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
                //+ "<td class='InvoiceAddressID hide' val='" + item.AddressID + "'></td>"
                //+ "<td class='InvoiceOperationID hide'>" + item.OperationID + "</td>"
                + "<td class='InvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                //+ "<td class='InvoiceOperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='InvoiceOperationCode'>" + (item.MasterOperationID > 0 ? item.MasterOperationCode : item.OperationCode) + "</td>"
                + "<td class='InvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber + (pDefaults.UnEditableCompanyName == "NEW" ? item.HouseCertificateNumber : "")) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                + "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger " : "text-primary ") + "'>" + item.InvoiceStatus + (item.InvoiceStatus == "UnPaid" ? "" : " ("+ item.ChequeNum +" )")+ "</td>"
                //+ "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger " : "text-primary ") + "'>" + item.InvoiceStatus + (item.InvoiceStatus == "UnPaid" ? "" : " "+ "" +" ")+ "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + ((glbCallingControl == 'FirstStepDraftInvoiceApproval' || glbCallingControl == 'DraftInvoicesApprovals') ? (item.IsDraftApproved == true ? "true' checked='checked'" : "'") : (item.IsApproved == true ? "true' checked='checked'" : "'"))+ " /></td>"
                //+ "<td class='IsFleet hide'> <input type='checkbox' id='cbIsFleetInvoice" + item.ID + "'" + (item.IsFleet == true ? " checked='checked'" : "") + " disabled='disabled' /></td>"
                //+ "<td class='NumberOfRoutings hide'>" + item.NumberOfRoutings + "</td>"

                //+ "<td class='InvoiceLeftSignature hide'>" + (item.LeftSignature == 0 ? "" : item.LeftSignature) + "</td>"
                //+ "<td class='InvoiceMiddleSignature hide'>" + (item.MiddleSignature == 0 ? "" : item.MiddleSignature) + "</td>"
                //+ "<td class='InvoiceRightSignature hide'>" + (item.RightSignature == 0 ? "" : item.RightSignature) + "</td>"
                //+ "<td class='InvoiceGRT hide'>" + (item.GRT == 0 ? "" : item.GRT) + "</td>"
                //+ "<td class='InvoiceDWT hide'>" + (item.DWT == 0 ? "" : item.DWT) + "</td>"
                //+ "<td class='InvoiceNRT hide'>" + (item.NRT == 0 ? "" : item.NRT) + "</td>"
                //+ "<td class='InvoiceLOA hide'>" + (item.LOA == 0 ? "" : item.LOA) + "</td>"
                //+ "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                //+ "<td class='RoutingID hide'>" + item.RoutingID + "</td>"
                //+ "<td class='TransactionTypeID hide'>" + item.TransactionTypeID + "</td>"
                //+ "<td class='RelatedToInvoiceID hide'>" + item.RelatedToInvoiceID + "</td>"
                //+ "<td class='OnBehalfName hide'>" + item.OnBehalfName + "</td>"
                //+ "<td class='OperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                //+ "<td class='CreationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"

                + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='USDPerContainerMesco hide classShowForMesco'> <input type='checkbox' disabled='disabled' val='" + (item.USDPerContainer == 1 ? "true' checked='checked'" : "'") + " /></td>"

                //+ "<td class='hide'><a onclick='Invoices_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                //+ ($("#hIsOperationDisabled").val() == false
                //    ? "<td class=''><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                //    : "<td></td>")
                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? "hideForMES hide" : "hideForMES") + "'>"
                + (item.IsHold == false && !(glbCallingControl == "DraftInvoicesApprovals" && pDefaults.UnEditableCompanyName == "COS" ) ? "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>" : " ")
                + (pDefaults.UnEditableCompanyName == "COS" && !item.IsApproved && glbCallingControl == "DraftInvoicesApprovals"
                    ? "<a onclick='Invoices_PartnerUpdate_OpenModal(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + " class=' btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Edit" + "</span>" + "</a>"
                    : "")
                + "<td class='hide ONLYUFICPW'>"
                + (item.IsHold == false && !(glbCallingControl == "DraftInvoicesApprovals" && pDefaults.UnEditableCompanyName == "COS") ? "<a onclick='UnfInvoicePrint(" + item.ID + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>" : " ")
                + (pDefaults.UnEditableCompanyName == "UNF" && item.IsApproved && glbCallingControl == "AccountingInvoicesApprovals" && item.PaidAmount == 0
                    ? "<a onclick='ClickPayInvoice(" + item.ID + ");' " + " class=' btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-dollar' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Click Pay" + "</span>" + "</a>"
                    : "")


                //+ "<span><a onclick='Invoices_PartnerUpdate_OpenModal(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + " class=' " + (pDefaults.UnEditableCompanyName == "COS" && !item.IsApproved && glbCallingControl == "DraftInvoicesApprovals" ? "" : "hide") + " btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Edit" + "</a>" + "</span>"
                ////Because class hide is remove by the ApplyPermissions fn
                + (pDefaults.UnEditableCompanyName == "COS" && !item.IsApproved && glbCallingControl == "DraftInvoicesApprovals"
                    ? "<a onclick='Invoices_PartnerUpdate_OpenModal(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + " class=' btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Edit" + "</span>" + "</a>"
                    : "")
                //+ "<a onclick='InvoiceNote_LoadAll(" + item.ID + ");' " + NoteControlsText + "</a>"
                + "</td>"
                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? "hide" : "showForMES hide") + "'>"
                + (item.IsHold == false && !(glbCallingControl == "DraftInvoicesApprovals" && pDefaults.UnEditableCompanyName == "COS") ? "<a onclick='Invoice_MescoPrint(" + item.ID + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>" : " ")


                //+ "<span><a onclick='Invoices_PartnerUpdate_OpenModal(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + " class=' " + (pDefaults.UnEditableCompanyName == "COS" && !item.IsApproved && glbCallingControl == "DraftInvoicesApprovals" ? "" : "hide") + " btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Edit" + "</a>" + "</span>"
                ////Because class hide is remove by the ApplyPermissions fn
                + (pDefaults.UnEditableCompanyName == "COS" && !item.IsApproved && glbCallingControl == "DraftInvoicesApprovals"
                    ? "<a onclick='Invoices_PartnerUpdate_OpenModal(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + " class=' btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Edit" + "</span>" + "</a>"
                    : "")
                //+ "<a onclick='InvoiceNote_LoadAll(" + item.ID + ");' " + NoteControlsText + "</a>"
                + "</td>"
                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? "" : "hide") + "'>"
                //+ "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + printControlsText + "</a>"
                //+ "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>"
                //+ "<a onclick='InvoiceNote_LoadAll(" + item.ID + ");' " + NoteControlsText + "</a>"
                + "</td>"
                + "<td class='IsValidPortal hide'>" + (item.IsValidPortal?1:0) + "</td>"
                + "</tr>"));
    });

    if (pDefaults.UnEditableCompanyName == "MES"  )
    {
        $(".showForMES").removeClass("hide");

        $(".hideForMES").addClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "UNF" || pDefaults.UnEditableCompanyName == "REL" || pDefaults.UnEditableCompanyName == "LIN") {
        $(".ONLYUFICPW").removeClass("hide");
        $(".hideForMES").addClass("hide");
    }
    ApplyPermissions();
    if (IsMESCOCompany && $("#hf_CanDelete").val() != 1) {
        $("#btnUpdateInvoiceStatus").parent().addClass("hide");
    }
    //if (glbCallingControl == "DraftInvoicesApprovals")
    //    $("#slApprovalStatus").parent().addClass("hide");
    //else
    //    $("#slApprovalStatus").parent().removeClass("hide");
    if (IsMESCOCompany && (glbCallingControl == "FirstStepDraftInvoiceApproval" || glbCallingControl == "DraftInvoicesApprovals")) {
        $(".classShowForMesco").removeClass("hide");
    }
    if (IsMESCOCompany && glbCallingControl == "AccountingInvoicesApprovals")
        $(".classShowForMescoAccounting").removeClass("hide");

    if (glbCallingControl == "AccountingInvoicesApprovals") {
        if (IsMESCOCompany)
            $(".classHideForMesco").addClass("hide");
        else
            $(".classHideForMesco").removeClass("hide");
    }

    if (glbCallingControl == "InvoiceStatusForm")
        $(".classHideForInvoiceStatus").parent().addClass("hide");
    if ($("#hf_CanEdit").val() == 1 && glbCallingControl != "InvoiceStatusForm") {
        $("#btn-ApproveAllSelected").removeClass("hide");
        if (glbCallingControl == "DraftInvoicesApprovals")
            $("#btn-UnApproveAllSelected").addClass("hide");
        else
            $("#btn-UnApproveAllSelected").removeClass("hide");
    }
    else {
        $("#btn-ApproveAllSelected").addClass("hide");
        $("#btn-UnApproveAllSelected").addClass("hide");
    }
    if ($("#hf_CanDelete").val() == 1 && glbCallingControl != "InvoiceStatusForm") $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");

    if (pDefaults.UnEditableCompanyName == "GBL")
        $('#btn-UnApproveAllSelected').addClass('hide');
    else
        $('#btn-UnApproveAllSelected').removeClass('hide');

    if (pDefaults.UnEditableCompanyName == "LATT") {
        if ($("#hf_CanDelete").val() == 1) {
            $("#btn-UnApproveAllSelected").removeClass("hide");
        }
        else {
            $("#btn-UnApproveAllSelected").addClass("hide");
        }
    }

    if (pDefaults.UnEditableCompanyName == "ARR") {
        $("#cbPrintHeaderInvoice").prop("checked", true);
    }
    //$("#cbPrintBankDetailsFromDefaults").prop("checked", true); 
    //if (OAInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewInvoice").removeClass("hide"); else $("#btn-NewInvoice").addClass("hide");
    //if (ODInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");
    BindAllCheckboxonTable("tblInvoices", "InvoiceID", "cb-CheckAll-Invoices");
    CheckAllCheckbox("HeaderDeleteInvoiceID");
    HighlightText("#tblInvoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function InvoiceApproval_LoadingWithPaging() {
    debugger;
    var pWhereClause = InvoiceApproval_GetWhereClause();
    //var pOrderBy = "PartnerTypeID,PartnerName, OperationID DESC ";
    var pOrderBy = " ID DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { InvoiceApproval_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblInvoices>tbody>tr", $("#txt-Search").val().trim());
}
//"DraftInvoicesApprovals" is the transfer for draft
function InvoiceApproval_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE (IsDeleted=0 OR (IsDeleted=1 AND IsApproved=1)) " + ((glbCallingControl == "DraftInvoicesApprovals" || glbCallingControl == "FirstStepDraftInvoiceApproval") ? " AND InvoiceTypeID=(9) " : " AND InvoiceTypeID<>(9) ");
    if ($("#txtSearchFrom").val() != '' && $("#txtSearchTo").val() != '')
        pWhereClause += " AND InvoiceDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND InvoiceDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";

    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        //pWhereClause += " OperationCode = N'" + $("#txt-Search").val().trim() + "' ";
        //pWhereClause += " OR OperationCodeWithoutDashes = N'" + $("#txt-Search").val().trim() + "' ";
        //pWhereClause += " OR ConcatenatedInvoiceNumber = N'" + $("#txt-Search").val().trim() + "' ";
        //pWhereClause += " OR SupplierOperationPartnerTypeName = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " PartnerName = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " OR MasterBL = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " OR HouseNumber = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " OR InvoiceStatus = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += " OR VesselName = N'" + $("#txt-Search").val().trim() + "' ";
        if (pDefaults.UnEditableCompanyName == "NEW")
            pWhereClause += " OR HouseCertificateNumber = N'" + $("#txt-Search").val().trim() + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartner").val()>0) {
        pWhereClause += " AND (";
        pWhereClause += " PartnerID = N'" + $("#slPartner").val() + "' ";
       // pWhereClause += " AND PartnerTypeID = N'" + $("#slPartner option:selected").attr("PartnerTypeID") + "' ";
        pWhereClause += ")";
    }
    if ($("#slPartnerType").val() > 0) {
        pWhereClause += " AND PartnerTypeID = N'" + $("#slPartnerType").val() + "' ";
    }
    //if ($("#slOperation").val() != "") {
    //    pWhereClause += " AND OperationID=" + $("#slOperation").val() + " ";
    //}
    if ($("#txtOperation").val().trim() != "") {
        pWhereClause += " AND (OperationCodeSerial = N'"
            + $("#txtOperation").val().trim().toUpperCase()
            + "' OR MasterOperationCodeSerial = N'"
            + $("#txtOperation").val().trim().toUpperCase()
            + "') \n";
    //    pWhereClause += " AND (SUBSTRING(OperationCode,12,5)=N'" + $("#txtOperation").val().trim().toUpperCase() + "' OR SUBSTRING(MasterOperationCode,12,5) = N'" + $("#txtOperation").val().trim().toUpperCase() + "') \n";
    }
    if ($("#txtInvoiceNumber").val().trim() != "") {
      
            pWhereClause += " AND InvoiceNumber=" + $("#txtInvoiceNumber").val().trim().toUpperCase() + " \n";

    }
    //if ($("#txtBillNo").val().trim() != "") {
    //    pWhereClause += " And( MasterBL = N'" + $("#txtBillNo").val().trim() + "' ";
    //    pWhereClause += " OR HouseNumber = N'" + $("#txtBillNo").val().trim() + "' )";
    //}
    if ($("#txtBillNo").val().trim() != "") {
        pWhereClause += "  And( HouseNumber Like N'%" + $("#txtBillNo").val().trim() + "%' )";
    }
    if ($("#slBranch").val() > 0) {
        pWhereClause += " AND BranchID=" + $("#slBranch").val() + " ";
    }
    if ($("#slInvoiceType").val() > 0) {
        pWhereClause += " AND InvoiceTypeID=" + $("#slInvoiceType").val() + " ";
    }
    if ($("#slInvoiceCurrency").val() > 0) {
        pWhereClause += " AND CurrencyID=" + $("#slInvoiceCurrency").val() + " ";
    }
    if ($("#txtBookingNo").val() != "") {
        pWhereClause += " And BookingNumber = N'" + $("#txtBookingNo").val().trim() + "' ";
    }
    if ($("#slInvoiceApprovalIsStatement").val() > 0) {
        if (parseInt($("#slInvoiceApprovalIsStatement").val()) == 1) {
            pWhereClause += " AND USDPerContainer=1";
        } else {
            pWhereClause += " AND USDPerContainer IS NULL";
        }

    }

    if (CheckValueIsValidInput('#slInvoiceStatus')) {
        pWhereClause += " AND InvoiceStatus='" + $('#slInvoiceStatus').val() + "' \n";
    }

    if (glbCallingControl == "DraftInvoicesApprovals") //(i.e. Transfer Draft) then hide filter InvoiceStatus
        pWhereClause += " AND IsDraftApproved=1" + "\n"

    if (glbCallingControl == "InvoiceStatusForm")
        pWhereClause += " AND IsApproved=1" + " \n";
    else if ($("#slApprovalStatus").val() != "") {
        if (glbCallingControl == "FirstStepDraftInvoiceApproval")
            pWhereClause += " AND IsDraftApproved=" + $("#slApprovalStatus").val() + " \n";
        else
            pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val() + " \n";
    }

    // if this is Draft Approval or Draft Transfer to invoice screens
    // then view only drafts related to CSF tariffs linked with current user or other draft not linked with tariffs
    if ((glbCallingControl == "FirstStepDraftInvoiceApproval" || glbCallingControl == "DraftInvoicesApprovals" )&& pDefaults.UnEditableCompanyName!="UNF") {
        pWhereClause += "\n" + " AND (TariffID IS NULL OR TariffID IN (SELECT utd.WH_CSL_TariffID FROM User_WH_CSL_TariffDraft AS utd WHERE utd.CanApprove = 1 AND utd.UserID = " + $("#hLoggedUserID").val() + " )) ";
    }

    if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() == "") {
        pWhereClause += " AND GrossWeight = " + $("#txtHB_GWFrom").val().trim() + " ";
    }
    else if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() != "") {
        pWhereClause += " AND GrossWeight between " + $("#txtHB_GWFrom").val().trim() + " and " + $("#txtHB_GWTo").val().trim();
    }

    return pWhereClause;
}
function InvoiceApproval_PartnerTypeChanged() {
    //debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    InvoiceApproval_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = InvoiceApproval_GetWhereClause();
    ////var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC "
    //var pOrderBy = " ID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Invoices/InvoiceApproval_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        InvoiceApproval_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);

    //Select2OnlineSearch("slPartner", "/api/Voucher/LoadAllPartnersForSelect2Combo", function (params) {
    //    var query = {
    //        pWhereClauseWithMinimalColumns: " WHERE Name like N'%" + params.term.trim() + "%'",
    //        pOrderBy: "ID",
    //        pPartnerTypeID: $("#slPartnerType").val() == "" || $("#slPartnerType").val() == null ? 0 : $("#slPartnerType").val(),
    //        pDummy: false
    //    }
    //    return query;
    //}, function (data) {
    //    var d = JSON.parse(data[0]);
    //    return {

    //        results: $.map(d, function (item) {
    //            return {
    //                text: item.Name,
    //                id: item.ID,
    //                value: item.ID
    //            };
    //        })
    //    };
    //}, 3, 2000);
}
function InvoiceApproval_SetApproval(pIsApprove) {
    debugger;
    var pInvoiceTableName = "tblInvoices";
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("Delete");
    let selectedIDs = pSelectedIDs.split(",");
    let IsPaidInvoiceSelected, IsApprovedInvoicesSelected = false;
    //var tr = $("#" + pInvoiceTableName + " tr[ID='" + pSelectedIDs + "']");
    selectedIDs.forEach(id => {
        if (pIsApprove) { //Action: Approve invoices
            if ($("#" + pInvoiceTableName + " tbody #" + id + " .IsApproved input").prop("checked")) {
                IsApprovedInvoicesSelected = true;
            }
        }
        else {  //Action: unapprove invoices
            if ($("#" + pInvoiceTableName + " tbody #" + id + " .InvoiceStatus").html() == "Paid") {
                IsPaidInvoiceSelected = true;
            }
        }
    })
    if (pDefaults.UnEditableCompanyName == "COS" && pIsApprove) { //glbCallingControl == "DraftInvoicesApprovals"
        if (pSelectedIDs == "" || pSelectedIDs.split(",").length > 1) {
            swal("Sorry", "Please, select just one row.");
            return;
        }
        else {
            let pVATNumber = $("#tblInvoices tr[ID=" + pSelectedIDs + "] td.InvoiceVATNumber").text();
            if (pVATNumber == 0 || pVATNumber == "") {
                swal("Sorry", "Client VAT Number is not found.");
                return;
            }
        }
    }
    if (pSelectedIDs == "") { // || pSelectedIDs.split(",").length > 1) {
        swal("Sorry", "Please, select at least one row.");
        //swal("Sorry", "Please, select just one row.");
    }
    //else if ($(tr).find("td.InvoiceStatus").html() == "Paid")
    //    swal("Sorry", "You can't unapprove a paid invoice");
    else if ( ["EGL", "MKH"].includes(pDefaults.UnEditableCompanyName)
        && pIsApprove == true && ($("#slCostCenter").val() == "0" || $("#slCostCenter").val() == "")) {
        swal("Sorry", "Please, select Select CostCenter.");
    }
    else if (IsPaidInvoiceSelected) {
        swal("Sorry", "You can't unapprove a paid invoice");
    }
    else if (IsApprovedInvoicesSelected) {
        swal("Sorry", "Some selected invoices are already approved");
    }
    else if (glbCallingControl == "DraftInvoicesApprovals" && $("#slNewInvoiceTypeForDraft").val() == 0 && pIsApprove && !(['MES', 'UNF'].includes(pDefaults.UnEditableCompanyName)))
        swal("Sorry", "Please, select invoice type.");
    else {

        swal({
            title: "Are you sure?",
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
                    pIDsToSetApproval: pSelectedIDs
                    , pIsApprove: pIsApprove
                    , pCostCenterID: $("#slCostCenter").val()
                    , pWhereClause: InvoiceApproval_GetWhereClause()
                    , pNewInvoiceType: glbCallingControl == "DraftInvoicesApprovals" ? $("#slNewInvoiceTypeForDraft").val() : 0
                    , pGlbCallingControl: glbCallingControl
                    //, pOrderBy: " PartnerTypeID,PartnerName, OperationID DESC "
                    , pOrderBy: " ID DESC "
                    , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                    , pPageSize: $('#select-page-size').val()
                    , pJVDate: $("#txtJvDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJvDate").val().trim())
                };
                CallGETFunctionWithParameters("/api/Invoices/ApproveOrUnApprove", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[3];
                        var pMessageFromSP = pData[2];
                        // Example message from the transaction

                        var word = "Transaction";
                        var index = pMessageFromSP.indexOf(word);
                        if (index !== -1) 
                            pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);


                        if (pMessageFromSP != "")
                            swal("Sorry", pMessageFromSP);
                        else if (_ReturnedMessage != "")
                            swal("Sorry", _ReturnedMessage);
                        else if (pData[0]) {
                            if (glbCallingControl == "AccountingInvoicesApprovals" && pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {
                                selectedIDs.forEach(id => {
                                    CallPOSTFunctionWithParameters("api/DynamicsGP/InsertInvoice", id, function (pDataL) {
                                        if (pDataL.IsSuccess) {
                                            swal("Success", "Integrated Successfully");
                                            FadePageCover(false);
                                            InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                                        } else {
                                            if (pDataL.Message != "") {
                                                swal("Sorry", pDataL.Message);
                                            }
                                            let p1 = {
                                                pIDsToSetApproval: id
                                                , pIsApprove: false
                                                , pCostCenterID: $("#slCostCenter").val()
                                                , pWhereClause: InvoiceApproval_GetWhereClause()
                                                , pNewInvoiceType: glbCallingControl == "DraftInvoicesApprovals" ? $("#slNewInvoiceTypeForDraft").val() : 0
                                                , pGlbCallingControl: glbCallingControl
                                                , pOrderBy: " ID DESC "
                                                , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                                                , pPageSize: $('#select-page-size').val()
                                                , pJVDate: $("#txtJvDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJvDate").val().trim())
                                            };
                                            CallGETFunctionWithParameters("/api/Invoices/ApproveOrUnApprove", p1, function (pData2) {
                                                FadePageCover(false);
                                                InvoiceApproval_BindTableRows(JSON.parse(pData2[1]));
                                            }, null);
                                        }
                                    },null, false);
                                });
                            } else {
                                swal("Success", "Set successfully.");
                            }
                        }
                        if (glbCallingControl == "AccountingInvoicesApprovals" && pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {

                        } else {
                            InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                        }
                        FadePageCover(false);
                    });
            });
    }
}

function InvoiceApproval_SetIvnoiceDate(pIsApprove) {
    debugger;
    var pInvoiceTableName = "tblInvoices";
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("Delete");
    let selectedIDs = pSelectedIDs.split(",");
    let IsPaidInvoiceSelected, IsApprovedInvoicesSelected = false;
    //let NewInvoiceDate = $("#txtInvDate").val();
    
    if (pSelectedIDs == "") {
        swal("Sorry", "Please, select at least one row.");
    }
    else {

        swal({
            title: "Are you sure?",
            text: "The Invoice Date for the selected row(s) will be changed .",
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
                    pIDsToSetApproval: pSelectedIDs,
                    NewInvoiceDate: GetDateWithFormatyyyyMMdd($("#txtInvDate").val().trim())
                };
                CallGETFunctionWithParameters("/api/Invoices/InvoiceChangeDate", pParametersWithValues
                    , function (pData) {
                        if (pData ==false)
                            swal("Sorry","Cannot Change Approved Invoice Date.");
                        else if (pData) {
                            
                                swal("Success", "Set successfully.");
                            
                        }
                        InvoiceApproval_LoadingWithPaging();
                        FadePageCover(false);
                    });
            });
    }
}
//*********************************Reading Excel Files***************************************//
function CreateApprovedDraft_ImportFromEDIExcel() {
    debugger;
    $("#btnAddFromExcel").click();
}
function onFileSelected(event) { //Must be saved as Excel 97-2003 
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && (oJS[0].VSL_NAME != undefined || oJS[0].VESSEL_NAME != undefined) /*&& oJS[0].SVVD != undefined*/ && oJS[0].POL != undefined && oJS[0].POD != undefined) //if (sCSV != "")
                    ImportFromExcelFile(oJS);
                else
                    swal("Sorry", "Please, revise data and version of the file.");
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function ImportFromExcelFile(pDataRows) {
    debugger;
    FadePageCover(true);
    $("#btn-ImportFromEDI").attr("disabled", true);
    var pVesselName = "";
    var pVoyageNumber = "";
    var pPOLList = "";
    var pPODList = "";
    //var pSeal_IDList = "";
    var pCONTAINER_TYPEList = "";
    var pBL_NOList = "";
    var pCONSIGNEEList = "";

    //var PCurrency = "";
    //var PRate = "";
    var PService = "";

    //var pPIECE_COUNTList = "";

    pVesselName = (pVesselName == "" ? (pDataRows[0].VSL_NAME == undefined || pDataRows[0].VSL_NAME.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[0].VSL_NAME.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[0].VSL_NAME == undefined || pDataRows[0].VSL_NAME.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[0].VSL_NAME.replace(/[\, ]/g, ' ').toUpperCase().trim())));
    if (pVesselName == 0) {
        pVesselName = (pDataRows[0].VESSEL_NAME == undefined || pDataRows[0].VESSEL_NAME.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[0].VESSEL_NAME.replace(/[\,' ]/g, ' ').toUpperCase().trim());
    }
    pVoyageNumber = (pVoyageNumber == "" ? (pDataRows[0].SVVD == undefined || pDataRows[0].SVVD.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[0].SVVD.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[0].SVVD == undefined || pDataRows[0].SVVD.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[0].SVVD.replace(/[\, ]/g, ' ').toUpperCase().trim())));

    if (pVesselName == "0" /*|| pVoyageNumber == "0"*/) {
        swal("Sorry", "Please, revise Vessel, Voy.No, POL, POD in first line.");
        FadePageCover(false);
        $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
    }
    else {
        for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
            var _POL = (pDataRows[i].POL == undefined || pDataRows[i].POL.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].POL.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _POD = (pDataRows[i].POD == undefined || pDataRows[i].POD.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].POD.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _CONTAINER_TYPE = (pDataRows[i].CNTR_TYPE == undefined || pDataRows[i].CNTR_TYPE.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CNTR_TYPE.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _BL_NO = (pDataRows[i].BL_NO == undefined || pDataRows[i].BL_NO.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BL_NO.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _CONSIGNEE = (pDataRows[i].CNEE == undefined || pDataRows[i].CNEE.replace(/[\,' ]/g, ' ').trim() == "" ? (pDataRows[i].NOTIFY == undefined || pDataRows[i].NOTIFY.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NOTIFY.replace(/[\,' ]/g, ' ').toUpperCase().trim()) : pDataRows[i].CNEE.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _PIECE_COUNT = (pDataRows[i].PIECE_COUNT == undefined || pDataRows[i].PIECE_COUNT.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PIECE_COUNT.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            if (_CONSIGNEE == 0) {
                _CONSIGNEE = (pDataRows[i].CLIENT_NAME == undefined || pDataRows[i].CLIENT_NAME.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CLIENT_NAME.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            }
         //   var _PCurrency = (pDataRows[i].POD == undefined || pDataRows[i].currency.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].currency.replace(/[\,' ]/g, ' ').toUpperCase().trim());

            var _PRate = (pDataRows[i].rate == undefined || pDataRows[i].rate.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].rate.replace(/[\,' ]/g, ' ').toUpperCase().trim());
            var _PService = (pDataRows[i].SERVICE == undefined || pDataRows[i].SERVICE.replace(/[\,' ]/g, ' ').trim() == "" ? 0 : pDataRows[i].SERVICE.replace(/[\,' ]/g, ' ').toUpperCase().trim());

            if ((pDataRows[i].VSL_NAME == undefined || pDataRows[i].VSL_NAME.replace(/[\, ]/g, ' ').trim() == "")
                && (pDataRows[i].VESSEL_NAME == undefined || pDataRows[i].VESSEL_NAME.replace(/[\, ]/g, ' ').trim() == "")) {
                break;
            }
            if (_CONTAINER_TYPE == 0 || _BL_NO == 0 || _CONSIGNEE == 0 || _PIECE_COUNT == 0
                || _POL == 0 || _POD == 0   //|| _PCurrency == 0 || _PRate == 0
                || _PService == 0) {
                swal("Sorry", "Please, check row " + (i + 2));
                FadePageCover(false);
                $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
                return;
            }
            pPOLList += (pPOLList == "" ? (_POL == undefined || _POL == "" ? 0 : _POL) : ("," + (_POL == undefined || _POL == "" ? 0 : _POL)));
            pPODList += (pPODList == "" ? (_POD == undefined || _POD == "" ? 0 : _POD) : ("," + (_POD == undefined || _POD == "" ? 0 : _POD)));
            pCONTAINER_TYPEList += (pCONTAINER_TYPEList == "" ? (_CONTAINER_TYPE == undefined || _CONTAINER_TYPE == "" ? 0 : _CONTAINER_TYPE) : ("," + (_CONTAINER_TYPE == undefined || _CONTAINER_TYPE == "" ? 0 : _CONTAINER_TYPE)));
            pBL_NOList += (pBL_NOList == "" ? (_BL_NO == undefined || _BL_NO == "" ? 0 : _BL_NO) : ("," + (_BL_NO == undefined || _BL_NO == "" ? 0 : _BL_NO)));
            pCONSIGNEEList += (pCONSIGNEEList == "" ? (_CONSIGNEE == undefined || _CONSIGNEE == "" ? 0 : _CONSIGNEE) : ("," + (_CONSIGNEE == undefined || _CONSIGNEE == "" ? 0 : _CONSIGNEE)));
            //pPIECE_COUNTList += (pPIECE_COUNTList == "" ? (_PIECE_COUNT == undefined || _PIECE_COUNT == "" ? 0 : _PIECE_COUNT) : ("," + (_PIECE_COUNT == undefined || _PIECE_COUNT == "" ? 0 : _PIECE_COUNT)));
          //  PCurrency += (PCurrency == "" ? (_PCurrency == undefined || _PCurrency == "" ? 0 : _PCurrency) : ("," + (_PCurrency == undefined || _PCurrency == "" ? 0 : _PCurrency)));
          //  PRate += (PRate == "" ? (_PRate == undefined || _PRate == "" ? 0 : _PRate) : ("," + (_PRate == undefined || _PRate == "" ? 0 : _PRate)));
            PService += (PService == "" ? (_PService == undefined || _PService == "" ? 0 : _PService) : ("," + (_PService == undefined || _PService == "" ? 0 : _PService)));


        }
        var pParametersWithValues = {
            pVesselName: pVesselName
            , pVoyageNumber: pVoyageNumber
            , pPOLList: pPOLList
            , pPODList: pPODList
            , pContainerTypeList: pCONTAINER_TYPEList
            , pHouseNumberList: pBL_NOList
            , pConsigneeList: pCONSIGNEEList
          //  , PCurrency: PCurrency
          //  , PRate: PRate
            , PService: PService

            //, pQuantityList: pPIECE_COUNTList
        };
        CallPOSTFunctionWithParameters("/api/Invoices/ImportFromExcelFile", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _HousesWithTransferredInvoices = pData[1];
                if (_ReturnedMessage == "") {
                    swal("Success", "Saved Successfully." + (_HousesWithTransferredInvoices != "" ? ", house number " + _HousesWithTransferredInvoices + " has a transferred draft invoice" : ""));
                    InvoiceApproval_LoadingWithPaging();
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                }
            }
            , function () {
                $("#btn-ImportFromEDI").attr("disabled", false);
                FadePageCover(false);
            });
    }
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}

/******************************Invoices fns********************************************/
//Invoices_Update(): is used for both updating and removing items 
function Invoices_Update(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat($("#txtEditInvoiceIssueDate").val())) > 0)
        swal("Sorry", "Date must be today or before.");
    else if (pDefaults.UnEditableCompanyName == "GBL" && $("#slEditInvoiceTransactionTypes").val() == "")
        swal("Sorry", "Please, select transaction type.");
    else if ($("#slEditInvoicePartner").val() == "")
        swal("Sorry", "Please, select partner.");
    else if ($("#slEditInvoiceOperations").val() == null)
        swal("Sorry", "Please, select B/L.");
    else {
        FadePageCover(true);
        var pExchangeRate = 0;
        var pParametersWithValues = {
            pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slEditInvoiceCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditInvoiceIssueDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditInvoiceIssueDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
            )
        };
        CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
            , function (pData) {
                FadePageCover(true);
                if (pData[0] == "[]") {
                    swal("Sorry", "Exchange rate is not set for " + $("#slEditInvoiceCurrency option:selected").text() + " in the Master Data.");
                    FadePageCover(false);
                }
                else {
                    pExchangeRate = JSON.parse(pData[0])[0].ExchangeRate;
                    var pOriginalCurrencyID = $("#slEditInvoiceCurrency").val();
                    if (pIsRemoveItems && GetAllSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems") == "") {//to make sure that there are selected items in case of pressing remove items
                        swal(strSorry, "Please select at least one item.");
                        FadePageCover(false);
                    }
                    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtEditInvoiceIssueDate").val().trim()), ConvertDateFormat($("#txtEditInvoiceDueDate").val().trim())) < 0) {
                        swal(strSorry, "DueDate can't be before Invoice Date.");
                        FadePageCover(false);
                    }
                    else if ($("#slEditInvoicePartner").val() == "") {
                        FadePageCover(false);
                    }
                    else if (!ValidateForm("form", "EditInvoiceModal"))
                        FadePageCover(false);
                    else {
                        var pSelectedReceivableItemsIDs = "";
                        if (pIsRemoveItems) //here i get only the unchecked items coz the others will be deleted in the Receivables update controller
                            pSelectedReceivableItemsIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
                        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
                            pSelectedReceivableItemsIDs = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");

                        if (pIsRemoveItems && pSelectedReceivableItemsIDs == "" && IsMESCOCompany) {
                            swal("Sorry", "Can't delete All Invoice Items");
                            FadePageCover(false);
                            return;
                        }
                        //TODO: check for invoice value here using the fn Invoices_ChangeAmountInInvoiceEdit
                        //if (pSelectedReceivableItemsIDs != "" && Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, true) > 0) {
                        if (pSelectedReceivableItemsIDs == "" || Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
                            FadePageCover(false);
                            swal({
                                title: "Are you sure?",
                                text: "The invoice will be saved!",
                                //type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Yes, Save!",
                                closeOnConfirm: false
                            },
                                //callback function in case of confirm delete
                                function () {
                                    FadePageCover(true);
                                    var pInvoiceID = $("#hEditedInvoiceID").val();
                                    var pSelectedReceivablesIDsToUpdate = "";
                                    if (pIsRemoveItems) //here i get only the uncheckded items coz the others will be deleted in the controllers
                                        pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
                                    else // here i get all IDs to handle the case of checking items then pressing save and not remove items
                                        pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
                                    var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
                                    var pPOrCList = "";
                                    var pUOMList = "";
                                    var pQuantityList = "";
                                    var pSalePriceList = "";

                                    var pInvoiceItemAmountWithoutVATList = "";
                                    var pInvoiceItemTaxTypeIDList = "";
                                    var pInvoiceItemTaxPercentageList = "";
                                    var pInvoiceItemTaxAmountList = "";
                                    var pInvoiceItemDiscountTypeIDList = "";
                                    var pInvoiceItemDiscountPercentageList = "";
                                    var pInvoiceItemDiscountAmountList = "";
                                    var pCostCenterIds = "";

                                    var pSaleAmountList = "";
                                    var pExchangeRateList = "";
                                    var pCurrencyList = "";
                                    var pViewOrderList = "";
                                    var pNotesList = "";
                                    var pUSDPerContainer = parseFloat($("#txtUSDPerContainer").val());
                                    if (pSelectedReceivablesIDsToUpdate != "") {
                                        var NumberOfSelectRows = ArrayOfIDs.length;
                                        for (i = 0; i < NumberOfSelectRows; i++) {
                                            var currentRowID = ArrayOfIDs[i];

                                            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

                                            pInvoiceItemAmountWithoutVATList += ((pInvoiceItemAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pInvoiceItemTaxTypeIDList += ((pInvoiceItemTaxTypeIDList == "") ? "" : ",") + ($("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            //*************************************************************************************** */
                                            pCostCenterIds += ((pCostCenterIds == "") ? "" : ",") + ($("#slCostCenter" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slCostCenter" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slCostCenter" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            ///************************************************************************************* */
                                            pInvoiceItemTaxPercentageList += ((pInvoiceItemTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pInvoiceItemTaxAmountList += ((pInvoiceItemTaxAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pInvoiceItemDiscountTypeIDList += ((pInvoiceItemDiscountTypeIDList == "") ? "" : ",") + ($("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pInvoiceItemDiscountPercentageList += ((pInvoiceItemDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pInvoiceItemDiscountAmountList += ((pInvoiceItemDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

                                            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + pExchangeRate; //($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            //pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + $("#slEditInvoiceCurrency").val();
                                            pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
                                        }
                                    }
                                    //to get currency for first item(i am sure all are the same and at least one is checked isa)
                                    var pFirstItemRowID = "";
                                    if (pIsRemoveItems) //get first unchecked
                                        pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:not(:checked):first').parent().parent().attr("id");
                                    else //get first wether checked or not
                                        pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:first').parent().parent().attr("id");
                                    var data = {
                                        "pIsRemoveItems": pIsRemoveItems
                                        , "pInvoiceID": $("#hEditedInvoiceID").val()
                                        , "pOperationID": $("#slEditInvoiceOperations").val()
                                        , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                                        , "pPartnerTypeID": $("#slEditInvoicePartner option:selected").attr("PartnerTypeID")
                                        , "pPartnerID": $("#slEditInvoicePartner option:selected").attr("PartnerID")
                                        , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                                        //, "pPrintedAddress": "0"
                                        , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                                        , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                                        , "pCurrencyID": $("#slEditInvoiceCurrency").val() //pFirstItemRowID == undefined ? $("#slEditInvoiceCurrency").val() : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                                        , "pExchangeRate": pExchangeRate //pFirstItemRowID == undefined ? $("#slEditInvoiceCurrency option:selected").attr("MasterDataExchangeRate") : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                                        , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                                        , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                                        , "pAmountWithoutVAT": $("#txtEditInvoiceAmountWithoutVAT").val()
                                        , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                                     
                                        , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                                        , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val()
                                        , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                                        , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                                        , "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val()
                                        , "pFixedDiscount": $("#txtEditInvoiceFixedDiscount").val() == "" ? 0 : $("#txtEditInvoiceFixedDiscount").val()

                                        , "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems).toFixed(2)
                                        , "pInvoiceStatusID": 1
                                        , "pIsApproved": false
                                        , "pLeftSignature": $("#txtEditInvoiceLeftSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceLeftSignature").val().trim()
                                        , "pMiddleSignature": $("#txtEditInvoiceMiddleSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceMiddleSignature").val().trim()
                                        , "pRightSignature": $("#txtEditInvoiceRightSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceRightSignature").val().trim()
                                        , "pGRT": $("#txtEditInvoiceGRT").val().trim() == "" ? "0" : $("#txtEditInvoiceGRT").val().trim()
                                        , "pDWT": $("#txtEditInvoiceDWT").val().trim() == "" ? "0" : $("#txtEditInvoiceDWT").val().trim()
                                        , "pNRT": $("#txtEditInvoiceNRT").val().trim() == "" ? "0" : $("#txtEditInvoiceNRT").val().trim()
                                        , "pLOA": $("#txtEditInvoiceLOA").val().trim() == "" ? "0" : $("#txtEditInvoiceLOA").val().trim()
                                        , "pEditableNotes": $("#txtEditInvoiceEditableNotes").val().trim() == "" ? "0" : $("#txtEditInvoiceEditableNotes").val().trim()
                                        , "pRoutingID": ($("#slEditInvoiceRoutingCCA").val() == "" || $("#slEditInvoiceRoutingCCA").val() == null) ? 0 : $("#slEditInvoiceRoutingCCA").val()
                                        , "pRelatedToInvoiceID": $("#slEditInvoiceRelatedToInvoice").val() == "" || $("#slEditInvoiceRelatedToInvoice").val() == null ? 0 : $("#slEditInvoiceRelatedToInvoice").val()
                                        , "pUpdateRelatedToInvoiceID": true
                                        , "pTransactionTypeID": ($("#slEditInvoiceTransactionTypes").val() == "" || $("#slEditInvoiceTransactionTypes").val() == null) ? 0 : $("#slEditInvoiceTransactionTypes").val()
                                        //Receivables Items Update
                                        , "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate == "" ? 0 : pSelectedReceivablesIDsToUpdate
                                        , "pPOrCList": pPOrCList == "" ? "0" : pPOrCList
                                        , "pUOMList": pUOMList == "" ? "0" : pUOMList
                                        , "pQuantityList": pQuantityList == "" ? "0" : pQuantityList
                                        , "pSalePriceList": pSalePriceList == "" ? "0" : pSalePriceList
                                        , "pPortalOperationPartnerID": $("#slPortalInvoicePartner").val() || 0
                                        , "pInvoiceItemAmountWithoutVATList": pInvoiceItemAmountWithoutVATList
                                        , "pInvoiceItemTaxTypeIDList": pInvoiceItemTaxTypeIDList
                                        , "pInvoiceItemTaxPercentageList": pInvoiceItemTaxPercentageList
                                        , "pInvoiceItemTaxAmountList": pInvoiceItemTaxAmountList
                                        , "pInvoiceItemDiscountTypeIDList": pInvoiceItemDiscountTypeIDList
                                        , "pInvoiceItemDiscountPercentageList": pInvoiceItemDiscountPercentageList
                                        , "pInvoiceItemDiscountAmountList": pInvoiceItemDiscountAmountList

                                        , "pSaleAmountList": pSaleAmountList == "" ? "0" : pSaleAmountList
                                        , "pExchangeRateList": pExchangeRateList == "" ? "0" : pExchangeRateList
                                        , "pCurrencyList": pCurrencyList == "" ? "0" : pCurrencyList
                                        , "pViewOrderList": pViewOrderList == "" ? "0" : pViewOrderList
                                        , "pNotesList": pNotesList == "" ? "0" : pNotesList
                                        , "pCostCenterIds": pCostCenterIds == "" ? "0" : pCostCenterIds
                                        , "pUSDPerContainer": isNaN(pUSDPerContainer) ? 0 : pUSDPerContainer
                                        , "pFormName": glbCallingControl
                                    };
                                    if (ValidateForm("form", "EditInvoiceModal"))
                                        CallPOSTFunctionWithParameters("/api/Invoices/Update", data
                                            , function (pData) {
                                                //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());//executed in Receivables_UpdateList(true, $("#hEditedInvoiceID").val());
                                                //OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                                InvoiceApproval_LoadingWithPaging();
                                                Invoices_FillInvoiceItems($("#hEditedInvoiceID").val());
                                                $("#slEditInvoiceCurrency").val(pFirstItemRowID == undefined ? pOriginalCurrencyID : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val());//incase of changing currency
                                                //Invoices_Print(pID, 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                                                if (pData[0])
                                                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                                                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                                            }
                                            , null);
                                    else
                                        FadePageCover(false);
                                });
                        }
                        else { //Different Currencies
                            swal(strSorry, "The currencies of the selected items must be the same and exchange rate must be entered.");
                            FadePageCover(false);
                        }
                    } //else if (ValidateForm("form", "EditInvoiceModal")) {
                }
            }
            , null);
    }
}
function Invoices_AddItems(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat($("#txtEditInvoiceIssueDate").val())) > 0)
        swal("Sorry", "Date must be today or before.");
    else if ($("#slEditInvoicePartner").val() == "")
        swal("Sorry", "Please, select partner.");
    else if ($("#slEditInvoiceOperations").val() == null)
        swal("Sorry", "Please, select B/L.");
    else {
        var pModalName = "CheckboxesListModal";
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        var AmountToBeAdded = "";
        if (pSelectedItemsIDs != "") {
            //i am setting the invoice amount in the controller after adding the Items
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Invoices/AddItems"
                , {
                    "pInvoiceID": $("#hEditedInvoiceID").val()
                    , "pOperationID": $("#slEditInvoiceOperations").val()
                    , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                    , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                    //, "pPrintedAddress": "0"
                    , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                    , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                    //, "pCurrencyID": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                    //, "pExchangeRate": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                    , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                    , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                    , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                    , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                    //            , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val() //calculated in controller after adding items
                    , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                    , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                    //, "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val() //calculated in controller after adding items
                    , "pFixedDiscount": $("#txtEditInvoiceFixedDiscount").val() == "" ? 0 : $("#txtEditInvoiceFixedDiscount").val() //calculated in controller after adding items
                    , "pRoutingID": ($("#slEditInvoiceRoutingCCA").val() == "" || $("#slEditInvoiceRoutingCCA").val() == null) ? 0 : $("#slEditInvoiceRoutingCCA").val()
                    //, "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems) //calculated in controller after adding items
                    , "pInvoiceStatusID": 1
                    , "pIsApproved": false
                    , "pSelectedItemsIDs": pSelectedItemsIDs
                    , "pFormName": glbCallingControl
                }
                , function (data) {
                    InvoiceApproval_LoadingWithPaging();
                    Invoices_FillInvoiceItems($("#hEditedInvoiceID").val(), function () { Invoices_ChangeAmountInInvoiceEdit(); });
                    jQuery('#' + pModalName).modal('hide');
                });
        }
    }
}
function Invoices_DeleteItems(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
    debugger;
    var pSelectedReceivableItemsIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
    if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat($("#txtEditInvoiceIssueDate").val())) > 0)
        swal("Sorry", "Date must be today or before.");
    else if ($("#slEditInvoicePartner").val() == "")
        swal("Sorry", "Please, select partner.");
    else if (pSelectedReceivableItemsIDs == "") //to make sure that there are selected items in case of pressing remove items
        swal(strSorry, "Please select at least one item.");
    else if (Date.prototype.compareDates(ConvertDateFormat($("#txtEditInvoiceIssueDate").val().trim()), ConvertDateFormat($("#txtEditInvoiceDueDate").val().trim())) < 0)
        swal(strSorry, "DueDate can't be before Invoice Date.");
    else if ($("#slEditInvoicePartner").val() == "")
        swal(strSorry, "Please, Select partner.");
    else if (ValidateForm("form", "EditInvoiceModal")) {
        if (pSelectedReceivableItemsIDs != "") {
            if (Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
                //Confirmation message to delete
                if (pSelectedReceivableItemsIDs != "")
                    swal({
                        title: "Are you sure?",
                        text: "The invoice will be saved!",
                        //type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, Save!",
                        closeOnConfirm: true
                    },
                        //callback function in case of confirm delete
                        function () {
                            FadePageCover(true);
                            Receivables_UpdateList(pSaveandAddNew, $("#hEditedInvoiceID").val(), pIsRemoveItems);
                            //to get currency for first item(i am sure all are the same and at least one is checked isa)
                            var pFirstItemRowID = "";
                            if (pIsRemoveItems) //get first unchecked
                                pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:not(:checked):first').parent().parent().attr("id");
                            else //get first wether checked or not
                                pFirstItemRowID = $('#tblModalInvoiceItems').find('input[name="cbSelectInvoiceItems"]:first').parent().parent().attr("id");
                            var data = {
                                "pInvoiceID": $("#hEditedInvoiceID").val()
                                , "pOperationPartnerID": $("#slEditInvoicePartner").val() //in table OperationPartners
                                , "pPartnerTypeID": $("#slEditInvoicePartner option:selected").attr("PartnerTypeID")
                                , "pPartnerID": $("#slEditInvoicePartner option:selected").attr("PartnerID")
                                , "pAddressID": $("#slEditInvoiceAddressTypes").val()///////////////////////////////////////////////
                                //, "pPrintedAddress": "0"
                                , "pCustomerReference": ($("#txtEditInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtEditInvoiceCustomerReference").val().toUpperCase())
                                , "pPaymentTermID": $("#slEditInvoicePaymentTerms").val()
                                , "pCurrencyID": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val()
                                , "pExchangeRate": $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID + " option:selected").attr("MasterDataExchangeRate")
                                , "pInvoiceIssueDate": ($("#txtEditInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceIssueDate").val().trim())
                                , "pInvoiceDueDate": ($("#txtEditInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtEditInvoiceDueDate").val().trim())

                                , "pAmountWithoutVAT": $("#txtEditInvoiceAmountWithoutVAT").val()
                                , "pTaxTypeID": $("#slEditInvoiceTax").val() == "" ? 0 : $("#slEditInvoiceTax").val()
                                , "pTaxPercentage": $("#txtEditInvoiceTaxPercentage").val() == "" ? 0 : $("#txtEditInvoiceTaxPercentage").val()
                                , "pTaxAmount": $("#txtEditInvoiceTaxAmount").val() == "" ? 0 : $("#txtEditInvoiceTaxAmount").val()
                                , "pDiscountTypeID": $("#slEditInvoiceDiscount").val() == "" ? 0 : $("#slEditInvoiceDiscount").val()
                                , "pDiscountPercentage": $("#txtEditInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtEditInvoiceDiscountPercentage").val()
                                , "pDiscountAmount": $("#txtEditInvoiceDiscountAmount").val() == "" ? 0 : $("#txtEditInvoiceDiscountAmount").val()

                                , "pAmount": Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems).toFixed(2)
                                , "pDeletedInvoiceItems": pSelectedReceivableItemsIDs
                                ////, "pInvoiceStatusID": 1
                                ////, "pIsApproved": false
                                //, "pLeftSignature": $("#txtEditInvoiceLeftSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceLeftSignature").val().trim()
                                //, "pMiddleSignature": $("#txtEditInvoiceMiddleSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceMiddleSignature").val().trim()
                                //, "pRightSignature": $("#txtEditInvoiceRightSignature").val().trim() == "" ? "0" : $("#txtEditInvoiceRightSignature").val().trim()
                                //, "pGRT": $("#txtEditInvoiceGRT").val().trim() == "" ? "0" : $("#txtEditInvoiceGRT").val().trim()
                                //, "pDWT": $("#txtEditInvoiceDWT").val().trim() == "" ? "0" : $("#txtEditInvoiceDWT").val().trim()
                                //, "pNRT": $("#txtEditInvoiceNRT").val().trim() == "" ? "0" : $("#txtEditInvoiceNRT").val().trim()
                                //, "pLOA": $("#txtEditInvoiceLOA").val().trim() == "" ? "0" : $("#txtEditInvoiceLOA").val().trim()
                            }
                            FadePageCover(true);
                            CallGETFunctionWithParameters("/api/Invoices/DeleteItems", data
                                , function (pID) {
                                    InvoiceApproval_LoadingWithPaging();
                                    Invoices_FillInvoiceItems($("#hEditedInvoiceID").val(), function () { Invoices_ChangeAmountInInvoiceEdit(); });
                                    //Invoices_Print(pID, 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                                }
                                , null);
                        });
            }
            else //Different Currencies
                swal(strSorry, "The currencies of the selected items must be the same and exchange rate must be entered.");
        }
        else //No items is selected
            swal(strSorry, "The invoice must have at least one item with value greater than 0.");
    }
}
function Invoices_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    if (IsMESCOCompany) {

        $('#slPortalInvoicePartner').parent().removeClass('hide');
        $('#slEditInvoicePaymentTerms').attr("data-required", "true");
    }
    if (pDefaults.UnEditableCompanyName == "BRS")
        $("#txtEditInvoiceEditableNotes").css('width', '800px');
    FadePageCover(true);
    var pInvoiceTableName = "tblInvoices"; //the only different line

    ClearAll("#EditInvoiceModal"); 
    var tr = $("#" + pInvoiceTableName + " tr[ID='" + pID + "']");
    $("#hEditedInvoiceTypeCode").val($(tr).find("td.InvoiceTypeCode").text());

    if ($("#hEditedInvoiceTypeCode").val() == "CREDITMEMO") {
        $("#btn-AddInvoiceItem").attr("disabled", "disabled");
        $("#btn-DeleteInvoiceItem").attr("disabled", "disabled");
        $("#btnSaveEditInvoice").attr("disabled", "disabled");
    }
    else {
        $("#btn-AddInvoiceItem").removeAttr("disabled");
        $("#btn-DeleteInvoiceItem").removeAttr("disabled");
        $("#btnSaveEditInvoice").removeAttr("disabled");
    }

    var pInvoiceOperationID = $(tr).find("td.InvoiceOperationID").text();
    var pInvoiceMasterOperationID = $(tr).find("td.InvoiceMasterOperationID").text();
    var pRoutingID = $(tr).find("td.RoutingID").text();
    var pRelatedToInvoiceID = $(tr).find("td.RelatedToInvoiceID").text();
    var pOperationContainersAndPackagesID = $(tr).find("td.OperationContainersAndPackagesID").text() == 0 ? "" : $(tr).find("td.OperationContainersAndPackagesID").text();

    $("#tblModalInvoiceItems tbody").html("");
    if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") $(".classKDS").removeClass("hide"); else $(".classKDS").addClass("hide");
    $("#slEditInvoiceOperations").children().remove();
    $("#slEditInvoiceRoutingCCA").children().remove();
    $("#hEditedInvoiceID").val(pID);

    if ($(tr).find("td.IsValidPortal").text() == 1
        &&  (pDefaults.UnEditableCompanyName == "ELI"
            || pDefaults.UnEditableCompanyName == "ELC")
    )
    {
        $("#EditInvoiceModal button").addClass('hide');
    }
    else {
        $("#EditInvoiceModal button").removeClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "UNS") {
        $("#txtUSDPerContainer").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slEditInvoiceAddressTypes").attr("data-required","false");
    }

    jQuery("#EditInvoiceModal").modal("show");
    var pParametersWithValues = { pInvoiceIDToLoad: pID };
    CallGETFunctionWithParameters("/api/Invoices/LoadInvoiceHeaderWithDetails"
        , pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var pInvoiceHeader = JSON.parse(pData[1]);
            //var pInvoiceItems = JSON.parse(pData[2]);
            var pOperations = JSON.parse(pData[3]);
            var pOperationPartners = pData[4];
            var pAddress = pData[5];
            var pPaymentTerm = pData[6];
            var pTaxType = pData[7];
            //var pRoutingClearance = pData[8];
            //var pSOA = pData[9];
            var pUser = pData[10];
            var pCostCenters = pData[11];

            if (pInvoiceHeader.IsFleet)
                glbNumberOfInvoiceRoutings = pInvoiceHeader.NumberOfRoutings;
            else
                glbNumberOfInvoiceRoutings = 0;
            $("#lblEditedInvoiceShown").html(": " + pInvoiceHeader.ConcatenatedInvoiceNumber + " / " + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode));
            $("#hEditedInvoiceOperationID").val(pInvoiceHeader.OperationID);
            $("#hEditedInvoiceMasterOperationID").val(pInvoiceHeader.MasterOperationID);
            ////Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback)
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperations, "ID", "MasterBL,HouseNumber", ' - ', null, "#slEditInvoiceOperations", pInvoiceHeader.OperationID, "ClientEmail", null);
            /***********************Fill InvoiceOperations****************************/
            var option = "";
            var pSlName = "slEditInvoiceOperations";

            if (pDefaults.UnEditableCompanyName == "TRM") {
                $("#EditCostCenter").removeClass("hide");
                FillListFromObject(null, 2, "<--Select-->", "slEditCostCenter", pCostCenters, null);
            }

     
            $.each(pOperations, function (i, item) {
                if (item.ID == pInvoiceHeader.OperationID)
                    //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
                    option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '" selected >' + item.EffectiveOperationCode + (item.BLType != 2 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
                else
                    //option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + item.Code + (item.RepBLTypeShown == 'MASTER' ? ('(MBL:' + (item.MasterBL == 0 ? "'N/A'" : item.MasterBL) + ')') : ('(House:' + (item.HouseNumber == 0 ? "'N/A'" : item.HouseNumber) + ')')) + '</option>';
                    option += '<option value="' + item.ID + '" OperationCode="' + item.Code + '" HouseNumber="' + item.HouseNumber + '" ClientEmail="' + (item.ClientEmail == 0 ? "" : item.ClientEmail) + '">' + item.EffectiveOperationCode + (item.BLType != 2 ? ('(MBL:' + (item.MasterBL == 0 ? "" : item.MasterBL) + ')') : ('(HBL:' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + ')')) + '</option>';
            });
            $("#" + pSlName).append(option);
            /***********************EOF Fill InvoiceOperations****************************/
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperationPartners, "ID", "PartnerTypeName,PartnerName", ': ', TranslateString("SelectFromMenu"), "#slEditInvoicePartner", pInvoiceHeader.OperationPartnerID, "ClientEmailNotContact,Email,PartnerTypeID,PartnerID,PaymentTermID", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pAddress, "ID", "AddressType", '', TranslateString("SelectFromMenu"), "#slEditInvoiceAddressTypes", pInvoiceHeader.AddressID, "CountryName,CityName,StreetLine1,StreetLine2", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pPaymentTerm, "ID", "Code", '', TranslateString("SelectFromMenu"), "#slEditInvoicePaymentTerms", pInvoiceHeader.PaymentTermID, "Days", null);
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pTaxType, "ID", "Name", ': ', TranslateString("SelectFromMenu"), "#slEditInvoiceTax", pInvoiceHeader.TaxTypeID, "CurrentPercentage,IsDiscount",
                function () {
                    $("#slEditInvoiceDiscount").html($("#slEditInvoiceTax").html());
                    $("#slEditInvoiceDiscount").val(pInvoiceHeader.DiscountTypeID);
                    $("#slEditInvoiceTax option[IsDiscount='true']").addClass('hide');
                    $("#slEditInvoiceDiscount option[IsDiscount='false']").addClass('hide');
                });
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pRoutingClearance, "ID", "CertificateNumber", '', TranslateString("SelectFromMenu"), "#slEditInvoiceRoutingCCA", pInvoiceHeader.RoutingID, "", null);
            //FillListFromObject(pInvoiceHeader.RelatedToInvoiceID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceRelatedToInvoice", pSOA, null);
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEditInvoiceSignature", pData[10], null);

            $("#slEditInvoiceTransactionTypes").val(pInvoiceHeader.TransactionTypeID == 0 ? "" : pInvoiceHeader.TransactionTypeID);
            $("#slEditInvoiceCurrency").val(pInvoiceHeader.CurrencyID);

            $("#txtEditInvoiceTaxPercentage").val(pInvoiceHeader.TaxPercentage);
            $("#txtEditInvoiceTaxAmount").val((pInvoiceHeader.TaxAmount).toFixed(2));
            $("#txtEditInvoiceDiscountPercentage").val(pInvoiceHeader.DiscountPercentage);
            $("#txtEditInvoiceDiscountAmount").val((pInvoiceHeader.DiscountAmount).toFixed(2));
            $("#txtEditInvoiceFixedDiscount").val(pInvoiceHeader.FixedDiscount);

            $("#txtEditInvoiceIssueDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.InvoiceDate)));
            $("#txtEditInvoiceDueDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.DueDate)));
            $("#txtEditInvoiceCreationDate").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.CreationDate)));

            $("#txtEditInvoiceAmountWithoutVAT").val((pInvoiceHeader.AmountWithoutVAT).toFixed(2));

            $("#txtEditInvoiceAmount").val((pInvoiceHeader.Amount).toFixed(2));
            $("#txtEditInvoiceMasterDataExchangeRate").val((pInvoiceHeader.MasterDataExchangeRate).toFixed(2));
            $("#txtEditInvoiceCustomerReference").val(pInvoiceHeader.CustomerReference == 0 ? "" : pInvoiceHeader.CustomerReference);

            $("#txtEditInvoiceLeftSignature").val(pInvoiceHeader.LeftSignature == 0 ? "" : pInvoiceHeader.LeftSignature);
            $("#txtEditInvoiceMiddleSignature").val(pInvoiceHeader.MiddleSignature == 0 ? "" : pInvoiceHeader.MiddleSignature);
            $("#txtEditInvoiceRightSignature").val(pInvoiceHeader.RightSignature == 0 ? "" : pInvoiceHeader.RightSignature);
            $("#txtEditInvoiceGRT").val(pInvoiceHeader.GRT == 0 ? "" : pInvoiceHeader.GRT);
            $("#txtEditInvoiceDWT").val(pInvoiceHeader.DWT == 0 ? "" : pInvoiceHeader.DWT);
            $("#txtEditInvoiceLOA").val(pInvoiceHeader.LOA == 0 ? "" : pInvoiceHeader.LOA);
            $("#txtEditInvoiceNRT").val(pInvoiceHeader.NRT == 0 ? "" : pInvoiceHeader.NRT);
            $("#txtEditInvoiceEditableNotes").val(pInvoiceHeader.EditableNotes == 0 ? "" : pInvoiceHeader.EditableNotes);
            $("#txtUSDPerContainer").val(pInvoiceHeader.USDPerContainer);
            if (IsMESCOCompany) {

            InvoicePartners_GetList(pInvoiceHeader.PortalOperationPartnerID, pInvoiceHeader.OperationID, "slPortalInvoicePartner", null);
                InvoicePartners_GetList(pInvoiceHeader.OperationPartnerID, pInvoiceHeader.OperationID, "slEditInvoicePartner", null);
            }
            FadePageCover(false);
        }
        , null);

    GetListWithCertificateNumberAndWhereClause(pRoutingID, "/api/Routings/LoadAll", TranslateString("SelectFromMenu")
        , "slEditInvoiceRoutingCCA"
        , {
            pWhereClause: "WHERE OperationID=" + (pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID)
                + " AND RoutingTypeID=" + CustomsClearanceRoutingTypeID
            , pOrderBy: "ID"
        }
        , null);

    if (pInvoiceTypeCode == "SOA" || pInvoiceTypeCode == "DRAFT")
        //Fill_SelectInput_WithWhereCondition("/api/Invoices/LoadAll", "ID", "Code", TranslateString("SelectFromMenu"), "#slEditInvoiceRelatedToInvoice", pRelatedToInvoiceID, "WHERE InvoiceTypeCode<>N'SOA' AND OperationID=" + (pInvoiceMasterOperationID == 0 ? pInvoiceOperationID : pInvoiceMasterOperationID));
        LoadAll("/api/Invoices/LoadAll", " WHERE ID<>" + pID + " AND OperationID IN(" + pInvoiceOperationID + "," + pInvoiceMasterOperationID + ") AND InvoiceTypeID NOT IN (SELECT ID FROM InvoiceTypes WHERE Code IN ('DRAFT','SOA')) AND IsDeleted = 0 "
            , function (pData) { FillListFromObject(pRelatedToInvoiceID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceRelatedToInvoice", pData[0], null); });
    else
        $("#slEditInvoiceRelatedToInvoice").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");

    if (pOperationContainersAndPackagesID != "") {
        $(".classShowForTank").removeClass("hide");
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
            , {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClauseForTank: "WHERE OperationID=" + pInvoiceOperationID + " AND TankOrFlexiNumber IS NOT NULL AND ID IN (SELECT OperationContainersAndPackagesID FROM Receivables WHERE IsDeleted=0 AND (InvoiceID IS NULL OR InvoiceID=" + pID + ") AND OperationID=" + pInvoiceOperationID + ") "
                , pOrderBy: "ID"
            }
            , function (pData) {
                var pTank = pData[0];
                FillListFromObject(pOperationContainersAndPackagesID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceTank", pTank, null);
            }
            , null);
    }
    else
        $(".classShowForTank").addClass("hide");

    Invoices_FillInvoiceItems(pID, null);//to fill the available invoice items
    $("#btnSaveEditInvoice").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    $("#btn-AddInvoiceItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddInvoiceItem").attr("onclick", "Invoices_GetAvailableItems(" + constTransactionInvoiceApproval + ");");
}
function Invoices_PortalPartnerChanged() {
    debugger;
    if ($("#slEditInvoicePartner option[value!='']").length == 0 || $("#slEditInvoicePartner option[paymenttermid='6']:selected").length == 1 || $("#slEditInvoicePartner option[paymenttermid!='6']").length > 1) {
        InvoicePartners_GetList($("#slPortalInvoicePartner").val(), $('#slEditInvoiceOperations').val(), "slEditInvoicePartner", function () {
            $("#slEditInvoicePaymentTerms").val($("#slEditInvoicePartner option:selected").attr("PaymentTermID"));
            Invoices_SetDueDate('txtInvoiceIssueDate', 'txtInvoiceDueDate', 'slInvoicePaymentTerms');
        });
        InvoiceAddressTypes_GetList(null, 'slInvoiceAddressTypes', 'slPortalInvoicePartner', null);
        //$("#slInvoicePaymentTerms").val($("#slInvoicePartner option:selected").attr("PaymentTermID"));
        //Invoices_SetDueDate('txtInvoiceIssueDate', 'txtInvoiceDueDate', 'slInvoicePaymentTerms');
    }
    else {
        $("#slInvoicePaymentTerms").val($("#slPortalInvoicePartner option:selected").attr("PaymentTermID"));
        Invoices_SetDueDate('txtInvoiceIssueDate', 'txtInvoiceDueDate', 'slInvoicePaymentTerms');
    }
}
function Invoices_FillInvoiceItems(pInvoiceID, callback) {
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divEditInvoice";//div name to be filled
    //var ptblModalName = "tblModalReceivables";
    var ptblModalName = "tblModalInvoiceItems";
    var pCheckboxNameAttr = "cbSelectInvoiceItems";
    var pWhereClause = "";
    pWhereClause += " WHERE 1=1 ";
    pWhereClause += " AND " + ($("#hEditedInvoiceTypeCode").val() == "DRAFT" ? "DraftInvoiceID=" : "InvoiceID=") + pInvoiceID;
    pWhereClause += " AND ( ChargeTypeCode LIKE '%" + $("#txtSearchInvoiceItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchInvoiceItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";

    FillReceivablesModalTableControls_UnFilledSl(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, true /*pIsInvoiceEdit*/
        , function () {
            HighlightText("#divEditInvoice", $("#txtSearchInvoiceItems").val().trim().toUpperCase());
            if (callback != null && callback != undefined)
                callback();
        });

    $("#btn-SearchInvoiceItems").attr("onclick", "Invoices_FillInvoiceItems(" + pInvoiceID + ");");
    //$("#btnEditInvoiceApply").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
}
function Invoices_GetAvailableItems() {
    $("#lblShownItems").html($("#lblEditedInvoiceShown").html());
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divCheckboxesList";
    $("#" + pDivName).html(""); //to quickly clear
    //var ptblModalName = "tblModalInvoiceCharges";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    //pWhereClause += " WHERE OperationID = " + $("#hEditedInvoiceOperationID").val() + " AND IsDeleted = 0 ";
    pWhereClause += " WHERE (OperationID=" + $("#hEditedInvoiceOperationID").val() + " OR OperationID=" + $("#hEditedInvoiceMasterOperationID").val() + " OR MasterOperationID=" + $("#hEditedInvoiceOperationID").val() + " OR MasterOperationID=" + $("#hEditedInvoiceMasterOperationID").val() + ") AND IsDeleted = 0 ";
    ////Next line is commented to handle unapproved invoices created on Draft
    //pWhereClause += " AND InvoiceID IS NULL AND DraftInvoiceID IS NULL AND AccNoteID IS NULL ";
    pWhereClause += " AND InvoiceID IS NULL AND AccNoteID IS NULL ";
    pWhereClause += " AND CurrencyID = " + $("#slEditInvoiceCurrency").val();
    pWhereClause += " AND ( ChargeTypeCode LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";
    if (pDefaults.UnEditableCompanyName == "USC" && $('#lblEditedInvoiceShown').text().toUpperCase().includes('OFFICIAL')) {
        pWhereClause += " AND IsOfficial=1";
    } else if (pDefaults.UnEditableCompanyName == "USC" && !$('#lblEditedInvoiceShown').text().toUpperCase().includes('OFFICIAL')) {
        pWhereClause += " AND IsOfficial=0";
    }
    debugger;
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            $("#btn-SearchItems").attr("onclick", "Invoices_GetAvailableItems();");
            $("#btnCheckboxesListApply").attr("onclick", "Invoices_AddItems(false);");
        }
        , (pDefaults.UnEditableCompanyName == "GBL" ? 3 : 1)/*pCodeOrName*/);
}
function Invoices_DeleteList(callback) {
    debugger;
    var pInvoiceTableName = "tblInvoices";
    var pInvoicesIDs = GetAllSelectedIDsAsString(pInvoiceTableName);

    var tr = $("#" + pInvoiceTableName + " tr[ID='" + pInvoicesIDs + "']");


    if ($(tr).find("td.InvoiceTypeCode").text() == "CREDITMEMO")
        swal("Sorry", "This is a credit memo.");
    else if ($(tr).find("td.InvoiceStatus").html() == "Paid")
        swal("Sorry", "You can't cancel a paid invoice");
    else if (pInvoicesIDs.split(',').length > 1)
        swal("Sorry", "Please, select only one invoice to cancel at a time.");
    else if (pInvoicesIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be cancelled.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Do it!",
            closeOnConfirm: true
        },
            function () {
                FadePageCover(true);
                //DeleteListFunction(pFunctionName, pParametersWithValues, callback)
                //CallGETFunctionWithParameters(pFunctionName, pParametersWithValues, callback, callback1, async/*Default true*/)
                CallGETFunctionWithParameters("/api/Invoices/Delete"
                    , { pInvoicesIDs: pInvoicesIDs }
                    , function (pData) {
                        let returnedMessage = pData[0];
                        if (returnedMessage != "") {
                            swal("Sorry", returnedMessage);
                        }
                        InvoiceApproval_LoadingWithPaging();
                    }
                    , null, true);
                //DeleteListFunction("/api/Invoices/Delete"
                //    , { pInvoicesIDs: pInvoicesIDs }
                //    , function () {
                //        InvoiceApproval_LoadingWithPaging();
                //    });
            });
}
function Invoice_CostCenterFillTable() {
    debugger;
    let CostCenterID = $("#slEditCostCenter").val();
    $(".tblModalCostCenter select").val(CostCenterID);
    swal("Success","Cost centers copied successfully!")
    //$("#tblModalInvoiceItems tbody tr td select").find(".tblModalCostCenter").val(CostCenterID);
}
function Invoices_OpenUserSignatureModal(pOption) {
    debugger;
    jQuery("#SelectUserSignatureModal").modal("show");
    $("#btnApplySignature").attr("onclick", "Invoices_SetSignature('" + pOption + "');")
}
function Invoices_SetSignature(pOption) {
    debugger;
    if ($("#slEditInvoiceSignature").val() != "")
        $("#txtEditInvoice" + pOption + "Signature").val($("#slEditInvoiceSignature option:selected").text());
    jQuery("#SelectUserSignatureModal").modal("hide");
}
function Invoices_SetDueDate(pCallingControl, pControlToBeSet, pSlPaymentTermControl) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "ELI")
        pCallingControl = "txtEditInvoiceCreationDate"; //pControlToBeSet = "txtEditInvoiceCreationDate";
    if (isValidDate($("#" + pCallingControl).val().trim(), 1))
        $("#" + pControlToBeSet).val(
            Date.prototype.addDays(ConvertDateFormat($("#" + pCallingControl).val()), ($("#" + pSlPaymentTermControl + " option:selected").attr("Days") == undefined ? 0 : $("#" + pSlPaymentTermControl + " option:selected").attr("Days"))));
    //EnableDisable DueDate according to Cash or not
    if ($("#" + pSlPaymentTermControl + " option:selected").text().toUpperCase() == "CASH")
        $("#" + pControlToBeSet).attr("disabled", "disabled");
    else
        $("#" + pControlToBeSet).removeAttr("disabled");
}
function Invoices_PartnerChanged(pSlName, pOperationPartnerSlName, pIssueDateControlName, pDueDateControlName, pPaymentTermControlName) {
    debugger;
    InvoiceAddressTypes_GetList(null, pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    //InvoiceAddressTypes_GetList($("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID') == 0 ? null : $("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID'), pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    $("#" + pPaymentTermControlName).val($("#" + pOperationPartnerSlName + " option:selected").attr("PaymentTermID")); //set the payment term
    Invoices_SetDueDate(pIssueDateControlName, pDueDateControlName, pPaymentTermControlName);
}
function Invoices_InvoiceOperationChanged(pSlName, pSuffix) {
    debugger;
    if (pSuffix == null || pSuffix == undefined)
        pSuffix = "";
    InvoicePartners_GetList(null, $("#sl" + pSuffix + "InvoiceOperations").val(), "sl" + pSuffix + "InvoicePartner", function () {
        InvoiceAddressTypes_GetList(null, "sl" + pSuffix + "InvoiceAddressTypes", "sl" + pSuffix + "InvoicePartner", null);//the 3rd parameter is the sl name of the partner control
    });
    InvoicePaymentTerms_GetList(null, "sl" + pSuffix + "InvoicePaymentTerms");
}
function Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs) {
    var isSameCurrency = true;
    var ArrayOfIDs = pSelectedReceivableItemsIDs.split(',');
    //i am sure i ve more than 1 item selected isa
    var NumberOfSelectRows = ArrayOfIDs.length;
    var FirstRowCurrencyID = $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[0]).val();

    for (i = 0; i < NumberOfSelectRows; i++) {
        if (FirstRowCurrencyID != $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i]).val()
            || $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i] + " option:selected").attr("MasterDataExchangeRate") == 0)
            isSameCurrency = false;
    }
    return isSameCurrency;
}
function Invoices_SaveTransactionType() {
    debugger;
    if ($("#slEditInvoiceTransactionTypes").val() == "" || $("#slEditInvoiceTransactionTypes").val() == null)
        swal("Sorry", "Please, select transaction type.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pInvoiceIDToApplyTransactionType: $("#hEditedInvoiceID").val()
            , pTransactionTypeID: ($("#slEditInvoiceTransactionTypes").val() == "" || $("#slEditInvoiceTransactionTypes").val() == null) ? 0 : $("#slEditInvoiceTransactionTypes").val()
        };
        CallGETFunctionWithParameters("/api/Invoices/SaveTransactionType", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                if (_ReturnedMessage == "")
                    swal("Success", "Save successfully.");
                else
                    swal("Sorry", _ReturnedMessage);
                FadePageCover(false);
            }
            , null);
    }
}
/////////////////////////////////////////GetLists////////////////////////////////////////////////////////
function InvoicePartners_GetList(pID, pInvoiceOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pInvoiceOperationID;
    //var pWhereClause = " WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + " ) \n";
    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    pWhereClause += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "<--Select-->", pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
}
//For PurchaseInvoice
function InvoiceSuppliers_GetList(pID, pInvoiceOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pInvoiceOperationID;
    //var pWhereClause = " WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + " ) \n";
    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " AND (PartnerTypeID <> " + constCustomerPartnerTypeID;
    pWhereClause += " AND PartnerTypeID <> " + constAgentPartnerTypeID + ") ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Partner", pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
}
function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID;
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
        , callback);
}
function InvoiceAddressTypes_GetList(pID, pSlName, pOperationPartnerSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    pWhereClause = "";
    pWhereClause = " Where (PartnerID = " + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID"));
    pWhereClause += "  AND PartnerTypeID=" + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID")) + ") ";
    if (pID != null)
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY AddressTypeID ";
    debugger;
    GetListAddressesWithMultipleAttr(pID, "/api/Addresses/LoadAll", "Select Address Type", pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined)
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
        });
}
function InvoiceCurrency_GetList(pID, pSlName) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", pSlName, " WHERE 1=1 ORDER BY Code "
        , function () {
            $("#txtInvoiceMasterDataExchangeRate").val($("#" + pSlName + " option:selected").attr("MasterDataExchangeRate"));
        });
}
function Invoices_PrintOptions() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "CAR") {
        $("#cbArabicInvoice").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "BRS") {
        $("#cbAddNotesToItems").prop('checked', true);
    }
    if (pDefaults.UnEditableCompanyName == "LIN") {
        $("#cbCombineTrucking").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "COS") {
        $('#cbPrintHeaderInvoice').prop('checked', true);
        $('#cbPrintFooterInvoice').prop('checked', true);
        $('#cbPrintMBL').prop('checked', true);
        $('#cbPrintHBL').prop('checked', true);
        $("#cbPrintBankDetailsFromTemplate").prop("checked", true);
        $('#slBankTemplate').val("1");
        Invoices_PrintBankDetailsOptionChanged();
    }
    if (pDefaults.UnEditableCompanyName == "EGL") {
        $("#cbPrintUSDTotal").parent().removeClass("hide");
        $("#cbPrintReceivableNotes").parent().removeClass("hide");
        $("#cbPrintStamp-Ar").parent().removeClass("hide");
        $("#cbPrintStamp-Kadmar").parent().removeClass("hide");
    }
    else {
        $("#cbPrintUSDTotal").parent().addClass("hide");
        $("#cbPrintReceivableNotes").parent().addClass("hide");
        $("#cbPrintStamp-Ar").parent().addClass("hide");
        $("#cbPrintStamp-Kadmar").parent().addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "CFR") {
        $("#cbPrintLeftSignature").prop("checked", true);
        $("#cbPrintRightSignature").prop("checked", true);
        $("#cbPrintBankDetailsNone").prop("checked", true);
    }
    if (pDefaults.UnEditableCompanyName == "LIN") {
        $("#cbPrintHeaderInvoice").prop("checked", true);
 
            $('#CBMVolume').parent().removeClass('hide');
            //$('#CBMVolume').siblings('.label-text').text('NOTIFY');
            $("#CBMVolume").parent().contents().last()[0].textContent = " Notify";

         
    }
    if (pDefaults.UnEditableCompanyName == "SUS") {
        $("#cbTotalInLocalCurrency").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "FWD") {
        $(".classShowForFastFWD").removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNS") {
        $("#cbPrintUSDToLocal").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "ITL") {
        $(".classShowForITL").removeClass("hide");
    }
    jQuery("#PrintInvoiceOptionsModal").modal("show");
}
function Invoices_GetReceivedCotactEmails(pID, pReportTypeID, pOption, pCopyOrOriginal) {
    debugger;
    var _Copy = "(Copy)";
    $("#lblShownItems").html(" Receptionists");
    $("#divCheckboxesList").html("");
    jQuery("#CheckboxesListModal").modal("show");
    var pStrFnName = "/api/Contacts/LoadWithPaging";
    var pDivName = "divCheckboxesList";
    var pCheckboxNameAttr = "cbAddedItemID";
    $("#btnCheckboxesListApply").text("Send");
    $("#btnCheckboxesListApply").attr("onclick", "Invoices_Print(" + pID + ",3," + "'Email'" + ",0);");
    var tr = $("#tblInvoices tr[ID='" + pID + "']");
    var pPartnerID = $(tr).find("td.InvoicePartnerID").text();
    var pPartnerTypeID = $(tr).find("td.InvoicePartnerTypeID").text();

    var pWhereClause = "WHERE Email<>'' AND Email IS NOT NULL AND PartnerID=" + pPartnerID + " AND PartnerTypeID=" + pPartnerTypeID;
    var pControllerParameters = {
        pPageNumber: 1
        , pPageSize: 999999
        , pWhereClause: pWhereClause
    };
    FadePageCover(true);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, pControllerParameters, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            FadePageCover(false);
        }
        , 5/*Email*/
        , 4/*ColSize*/);
}



var pCurrentInvoiceID = 0;
var ChargedPerson = "";
var pQRImage;


var ReportHTML = '';
function Invoices_PrintMultipleDiffrenceInvoices() {
    debugger;

    //var pInvoiceIDList = ($("#cbCheckAllAccounts").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbAccount"));
    var pInvoiceIDList = GetAllSelectedIDsAsString('tblInvoices', 'ID');
    var pFromDate = ConvertDateFormat($("#txtSearchFrom").val());
    var pToDate = ConvertDateFormat($("#txtSearchTo").val());
    if (pInvoiceIDList == "0" || pInvoiceIDList == "") {
        swal("sorry", "Please Select At Least One Invoice", "warning")
    }
    //else if (pFromDate == "" || pFromDate == "1") {
    //    swal("Sorry", "Please, specify period.");
    //}
    //else if (pToDate == "" || pToDate == "1") {
    //    swal("Sorry", "Please, specify period.");
    //}
    else {
        FadePageCover(true);

        if (typeof PrintMultipleInvoices == "function") {
            //PrintMultipleInvoices(pInvoiceIDList, 0, 'Print', 0);
            Invoices_Print_Multiple(pInvoiceIDList, 0, 'Print', 0);
            FadePageCover(false);
        }
        else {
            $.getScript(strServerURL + '/Scripts/OperAcc/Approval/InvoiceApprovalMultiPrint.js?' + glbVersion, function () { /*PrintMultipleInvoices(pInvoiceIDList, 0, 'Print', 0); FadePageCover(false);*/Invoices_Print_Multiple(pInvoiceIDList, 0, 'Print', 0); });//a7med-2023-10-02
        }
    }

}
function Invoices_PrintMultiple() {
    debugger;
    //if (typeof PrintMultipleInvoices == "function")
    //    GetIDsForPrintMultipleInvoices();
    //else
    //    $.getScript(strServerURL + '/Scripts/OperAcc/Approval/InvoiceApprovalMultiPrint.js?' + glbVersion, function () { GetIDsForPrintMultipleInvoices(); });
    if ($("#txtSearchFrom").val().trim() == "" || $("#txtSearchTo").val().trim() == "")
        swal("Sorry", "Please, specify period.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pWhereClause: InvoiceApproval_GetWhereClause()
        };
        CallGETFunctionWithParameters("/api/Invoices/LoadAll"
            , pParametersWithValues
            , function (data) {
                debugger;
                var pInvoiceIDs = "";
                var pInvoiceList = JSON.parse(data[0]);
                if (pInvoiceList.length > 0)
                    pInvoiceIDs = pInvoiceList[0].ID;
                for (var i = 1; i < pInvoiceList.length; i++)
                    pInvoiceIDs += "," + pInvoiceList[i].ID;
                if (pInvoiceIDs == "") {
                    swal("Sorry", "No invoices for the search criteria.");
                    FadePageCover(false);
                }
                else {
                    if (typeof PrintMultipleInvoices == "function") {
                        PrintMultipleInvoices(pInvoiceIDs, 0, 'Print', 0);
                        FadePageCover(false);
                    }
                    else {
                        $.getScript(strServerURL + '/Scripts/OperAcc/Approval/InvoiceApprovalMultiPrint.js?' + glbVersion, function () { PrintMultipleInvoices(pInvoiceIDs, 0, 'Print', 0); FadePageCover(false); });
                    }
                }
            }, null);
    }
}
function Invoices_Print_Multiple_GetpInvoiceIDs() {
    debugger;
    if ($("#txtSearchFrom").val().trim() == "" || $("#txtSearchTo").val().trim() == "")
        swal("Sorry", "Please, specify period.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pWhereClause: InvoiceApproval_GetWhereClause()
        };
        CallGETFunctionWithParameters("/api/Invoices/LoadAll"
            , pParametersWithValues
            , function (data) {
                debugger;
                var pInvoiceIDs = "";
                var pInvoiceList = JSON.parse(data[0]);
                if (pInvoiceList.length > 0)
                    pInvoiceIDs = pInvoiceList[0].ID;
                for (var i = 1; i < pInvoiceList.length; i++)
                    pInvoiceIDs += "," + pInvoiceList[i].ID;
                if (pInvoiceIDs == "") {
                    swal("Sorry", "No invoices for the search criteria.");
                    FadePageCover(false);
                }
                else {
                    if (typeof Invoices_Print_Multiple == "function") {
                        Invoices_Print_Multiple(pInvoiceIDs, 0, 'Print', 0); //PrintMultipleInvoices(pInvoiceIDs, 0, 'Print', 0);
                    }
                    else {
                        $.getScript(strServerURL + '/Scripts/OperAcc/Approval/InvoiceApprovalMultiPrint.js?' + glbVersion, function () { Invoices_Print_Multiple(pInvoiceIDs, 0, 'Print', 0);/*PrintMultipleInvoices(pInvoiceIDs, 0, 'Print', 0);*/ FadePageCover(false); });
                    }
                }
            }, null);
    }
}

function Invoices_DrawOrSend(pOption, ReportHTML, pClientHeader) {
    debugger;
    if (pOption == "Print" || pOption == undefined || pOption == null) {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else if (pOption == "Email") {
        if (pClientHeader.Email != "0" && pClientHeader.Email != "")
            SendPDFEmail_General("Invoice", pClientHeader.Email, ReportHTML, "Invoice", null);
        else {
            swal("Sorry", "Please, check receiver email.");
            FadePageCover(false);
        }
    }
}




function Voucher_Insert(pSaveandAddNew) {
    debugger;
    let InvoiceHouseNumber = "";
    if (pDefaults.UnEditableCompanyName == "COS")
        InvoiceHouseNumber = ", HBL : " + $("#tblInvoices tbody tr[id=" + pCurrentInvoiceID + "] td.InvoiceHouseNumber").text()
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/Invoices/getInvoiceDetailsForVoucher",
        data: { pInvoiceID: pCurrentInvoiceID },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            FadePageCover(true);

            if (d[0] != "") {
                swal("Sorry", d[0]);
                FadePageCover(false);

            }
            else {
                debugger;
                if (JSON.parse(d[1])[0].InvoicesPaymentID == 0) {
                    ChargedPerson = JSON.parse(d[1])[0].Name;
                    var pParametersWithValues = {
                        pID: 0
                        , pCode: 0
                        , pVoucherDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat())
                        , pSafeID: 2
                        , pCurrencyID: JSON.parse(d[1])[0].CurrencyID
                        , pExchangeRate: JSON.parse(d[1])[0].ExchangeRate
                        , pChargedPerson: JSON.parse(d[1])[0].Name
                        , pNotes: $("#txtReference").val().trim() == "" ? InvoiceHouseNumber : $("#txtReference").val().trim() + InvoiceHouseNumber 
                        , pTaxID: $("#txtWHT").val().trim() == "" ? 0 : 4
                        , pTaxValue: $("#txtWHT").val().trim() == "" ? 0 : $("#txtWHT").val().trim()
                        , pTaxSign: -1
                        , pTaxID2: 0
                        , pTaxValue2: 0
                        , pTaxSign2: 1
                        , pTotal: parseFloat($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val().trim())
                        , pTotalAfterTax: parseFloat($("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val().trim()) - parseFloat($("#txtWHT").val().trim() == "" ? 0 : $("#txtWHT").val().trim())
                        , pIsAGInvoice: false
                        , pAGInvType_ID: 000
                        , pInv_No: 000
                        , pInvoiceID: 000
                        , pJVID1: 000
                        , pJVID2: 000
                        , pJVID3: 000
                        , pJVID4: 000
                        , pSalesManID: 000
                        , pforwOperationID: 000
                        , pIsCustomClearance: false
                        , pTransType_ID: 000
                        , pVoucherType: 10
                        , pIsCash: true
                        , pIsCheque: false
                        , pPrintDate: "01/01/1900"
                        , pChequeNo: 000
                        , pChequeDate: "01/01/1900"
                        , pBankID: 000
                        , pOtherSideBankName: 0
                        , pCollectionDate: "01/01/1900"
                        , pCollectionExpense: 000
                        , pDisbursementJob_ID: 0
                        , pSL_SalesManID: 0

                        //Details Data
                        , pDetailsID: 0
                        , pValue: $("#txtAmount").val().trim() == "" ? 0 : $("#txtAmount").val().trim()
                        , pDescription: $("#txtReference").val().trim() == "" ? 0 : $("#txtReference").val().trim()
                        , pAccountID: JSON.parse(d[1])[0].AccountID
                        , pSubAccountID: JSON.parse(d[1])[0].subAccountID
                        , pCostCenterID: 0
                        , pIsDocumented: 0
                        , pDetailsInvoiceID: 000
                        , pOperationID: 0
                        , pHouseID: 0
                        , pBranchID: 0
                        , pTruckingOrderID: 0



                    };
                    CallPOSTFunctionWithParameters("/api/Voucher/VoucherDetails_Save", pParametersWithValues
                        , function (pData) {
                            var pMessageReturned = pData[0];
                            if (pMessageReturned == "") {
                                var pVoucherID = pData[1];
                                InsertUpdateListOfObject("/api/Voucher/InsertA_VoucherInvoicesPayment",
                                    SetArrayOfItems(pVoucherID, pCurrentInvoiceID, parseFloat($("#txtWHT").val().trim() == "" ? 0 : $("#txtWHT").val().trim()), JSON.parse(d[1])[0].CurrencyID, true)  //JSON.stringify(SetArrayOfItems())
                                    , false, null, function () {
                                        Voucher_Print(pVoucherID);
                                        jQuery("#VoucherModal").modal("hide");
                                        FadePageCover(false); //called in LoadWithPaging
                                    });
                                FadePageCover(false); //called in LoadWithPaging
                                // return "1"
                                if (callback != null && callback != undefined)
                                    callback();
                            }
                            else {
                                swal("Sorry", pMessageReturned);
                                FadePageCover(false);
                                //  return "0"
                            }
                        }
                        , null);


                    FadePageCover(false);
                }
                else if (JSON.parse(d[1])[0].InvoicesPaymentID == 0 && JSON.parse(d[1])[0].InvoicesVoucherID != 0) {
                    Voucher_Print(JSON.parse(d[1])[0].InvoicesVoucherID);
                    jQuery("#VoucherModal").modal("hide");
                    FadePageCover(false); //called in LoadWithPaging
                }

            }

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });
}
function SetArrayOfItems(pVoucherID, pInvoiceID, pDueAmount, pCurrencyID, check) {
    // var cobjItem = null;
    var arrayOfItems = new Array();
    debugger;
    var objItem = new Object();
    objItem.VoucherID = pVoucherID;
    objItem.InvoiceID = pInvoiceID;
    objItem.DueAmount = pDueAmount;
    objItem.CurrencyID = pCurrencyID;
    objItem.VoucherTypeID = 10;

    arrayOfItems.push(objItem);


    return arrayOfItems;
}
function Voucher_Print(pID) {
    debugger;
    if (pID == 0) //pID=0 this means print is pressed from modal
        pID = $("#hID").val();
    if (pID == "")
        swal("Sorry", "Please, save before printing.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Voucher/GetPrintedData"
            , { pVoucherIDToPrint: pID }
            , function (pData) {
                PrintDefault(pData);

                FadePageCover(false);
            }
            , function () {

            }
        );
    }
}
function PrintDefault(pData) {
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat() + ' ' + getTime();
    var pVoucherHeader = JSON.parse(pData[0]);
    var pVoucherDetails = JSON.parse(pData[1]);
    var pVoucherOperation = JSON.parse(pData[2]);
    var mywindow = window.open('', '_blank');

    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
    }
    ReportHTML += '     <head><title>' + TranslateString("Payment") + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;font-size:115%;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div>';
    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Invoice No. ' + pInvoiceDate.substr(3, 2) + '/' + pInvoiceDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div>';

    ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + TranslateString(pVoucherHeader.VoucherTypeName) + TranslateString("No") + pVoucherHeader.Code + '</h3></div>';

    if (pVoucherHeader.VoucherType == 10) {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إيصال استلام نقدى' + '</h3></div>';
    }
    else {
        ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>' + 'إذن صرف نقدى' + '</h3></div>';
    }
    //ReportHTML += '             <div class="col-xs-12 text-ul"><h4>Payment</h4></div>';

    ReportHTML += '             <div style="clear:both;"></div>';

    ReportHTML += '             <div class="col-xs-12">'
    ReportHTML += '                 <table id="tblPaymentHeaderData" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <td>';
    //ReportHTML += '                             <div class="col-xs-6 text-left"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("ReceiptDate") + ':' + '</span></b>' + ConvertDateFormat(GetDateWithFormatMDY(pVoucherHeader.VoucherDate)) + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Name") + ':' + '</span></b>' + pVoucherHeader.ChargedPerson + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Safe") + ':' + '</span></b>' + pVoucherHeader.SafeName + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Total") + ':' + '</span></b>' + pVoucherHeader.Total.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-6 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("TotalAfterTax") + ':' + '</span></b>' + pVoucherHeader.TotalAfterTax.toFixed(2) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 m-l-n">' + '<b><span class="float-left">' + '<b>' + TranslateString("Only") + ':' + '</span></b>' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</div>';
    ReportHTML += '                             <div class="col-xs-12 m-l-n">' + '<b><span class="float-left">' + '<b>HBL :</b>' +  + '</div>';
    if (pVoucherHeader.Notes != 0)
        ReportHTML += '                             <div class="col-xs-12 "><b>' + TranslateString("Notes") + '</b>' + pVoucherHeader.Notes + '</div>';
    ReportHTML += '                         </td>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';

    if (pVoucherOperation.length > 0) {
        ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>' + TranslateString("Operations") + ' </b></h5>' + '</div>';
        ReportHTML += '             <div class="row col-xs-12">';
        ReportHTML += '             <div class="col-xs-12">';
        ReportHTML += '                 <table id="tblOperationDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
        ReportHTML += '                     <thead>';
        ReportHTML += '                         <tr>';
        ReportHTML += '                             <th>' + TranslateString("OperationCode") + '</th>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </thead>';
        ReportHTML += '                     <tbody>';
        debugger;

        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += ' <td>';
        $.each(pVoucherOperation, function (i, item) {

            ReportHTML += item.Code + "    &nbsp;&nbsp;&nbsp     ";


        });
        ReportHTML += ' </td>';
        ReportHTML += '                     </tr>';
        ReportHTML += '                         </tr>';
        ReportHTML += '                     </tbody>';
        ReportHTML += '                 </table>';
        ReportHTML += '             </div>';
        ReportHTML += '             </div>';
    }

    ReportHTML += '             <div class="col-xs-12 m-t-n-sm text-ul"><h5><b>' + TranslateString("PaymentDetails") + '</b></h5>' + '</div>';
    ReportHTML += '             <div class="col-xs-12">';
    ReportHTML += '                 <table id="tblPaymentDetails" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;font-size:115%;">'; // table-hover
    ReportHTML += '                     <thead>';
    ReportHTML += '                         <tr>';
    ReportHTML += '                             <th>' + TranslateString("Description") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("Amount") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("Account") + '</th>';
    ReportHTML += '                             <th>' + TranslateString("SubAccount") + '</th>';
    ReportHTML += '                             <th class="">' + TranslateString("CostCenter") + '</th>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </thead>';
    ReportHTML += '                     <tbody>';
    debugger;
    $.each(pVoucherDetails, function (i, item) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (item.Description == 0 ? "" : item.Description) + '</td>';
        ReportHTML += '                         <td>' + item.Value + '</td>';
        ReportHTML += '                         <td>' + item.Account_Name + '</td>';
        ReportHTML += '                         <td>' + (pVoucherHeader.ChargedPerson) + '</td>';
        ReportHTML += '                         <td class="">' + (item.CostCenterName == 0 ? "" : item.CostCenterName) + '</td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(item.Value.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    });
    if (pVoucherHeader.TaxValue != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName == 0 ? "" : pVoucherHeader.TaxName) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    if (pVoucherHeader.TaxValue2 != 0) {
        ReportHTML += '                     <tr class="input-md" style="font-size:115%;">';
        ReportHTML += '                         <td>' + (pVoucherHeader.TaxName2 == 0 ? "" : pVoucherHeader.TaxName2) + '</td>';
        ReportHTML += '                         <td>' + pVoucherHeader.TaxValue2 + '</td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td></td>';
        ReportHTML += '                         <td class=""></td>';
        //ReportHTML += '                         <td class="">' + toWords_WithFractionNumbers(pVoucherHeader.TaxValue2.toFixed(4)) + '</td>';
        ReportHTML += '                     </tr>';
    }
    ReportHTML += '                         <tr>';
    //ReportHTML += '                             <td colspan=5>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(4)) + ' ' + $("#hDefaultCurrencyCode").val() + '</b></td>';
    ReportHTML += '                             <td colspan=5>' + '<b>' + TranslateString("TOTALAMOUNTONLY") + toWords_WithFractionNumbers(pVoucherHeader.TotalAfterTax.toFixed(2)) + ' ' + pVoucherHeader.CurrencyCode + '</b></td>';
    ReportHTML += '                         </tr>';
    ReportHTML += '                     </tbody>';
    ReportHTML += '                 </table>';
    ReportHTML += '             </div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>Approved available balance till printing time :</b> ' + pVoucherHeader.AvailableBalance + '</div>';


    ReportHTML += '             </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:relative; bottom:0;">';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("PreparedBy") + ' </br> </br>' + (pVoucherHeader.UserName != 0 ? pVoucherHeader.UserName : '') + '</div></b></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ReviewedBy") + '</div></div></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("ApprovedBy") + '</div></b></div>';
    ReportHTML += '                 <div class="col-xs-3  float-right" ><b><div class="col-xs-11" style="height:100px;border:1px solid #000;">' + TranslateString("Receiver") + '<br><br>' + TranslateString("Name") + '<br>' + TranslateString("No") + '<br>' + TranslateString("Signature") + ' </div></b></div>';
    ReportHTML += '     <div class="col-xs-12 "><b>' + TranslateString("PrintedOn") + ' :</b> ' + TodaysDateddMMyyyy + '</div>';
    if (pVoucherHeader.VoucherType == 20 && pDefaults.UnEditableCompanyName == "ARK"
    ) {
        ReportHTML += '<br/>';
        ReportHTML += '         <div class="row text-right m-r">'
            + ' <p style="font-size:17px;"><span dir="rtl">  اقر انا الموقع اعلاه في خانة المستلم الموظف في شركة ارك للتجارة واللوجستكس ش.م.م اني استملت المبلغ الموضح اعلاه وذلك كعهدة لاستخدامها في أعمال الشركة كما موضح اعلاه، و أتعهد بالمحافظة عليها و اعادة تسليمها للشركة لدى انتهاء الغرض من استخدامها. و في حالة عدم تسليم العهدة المذكورة أعلاه ، كلها أو بعضها فأنني أفوض الشركة في اتخاذ اللازم، دون أى اعتراض مني   </span>'
            + '</p></div>';

    }
    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
    //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
    ReportHTML += '     </footer>';
    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();

}




function Invoices_PrintBankDetailsOptionChanged() {
    debugger;
    if ($("#cbPrintBankDetailsFromTemplate").prop("checked"))
        $("#slBankTemplate").removeClass("hide");
    else
        $("#slBankTemplate").addClass("hide");
}
function InvoicePaymentTerms_GetList(pID, pSlName, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", pSlName, " WHERE 1=1 ORDER BY Code ", callback);
}
/////////////////////////////////////EOF GetLists////////////////////////////////////////////////////////
////////////////////////////////////InvoiceEdit fns//////////////////////////////////////////////////
//function InvoiceEdit_Row_CalculateReceivablesAmount(pRowID) {
//    var rowQuantity = $("#txtTblModalReceivableQuantityInvoiceEdit" + pRowID).val();
//    var rowSalePrice = $("#txtTblModalReceivableSalePriceInvoiceEdit" + pRowID).val();
//    $("#txtTblModalReceivableSaleAmountInvoiceEdit" + pRowID).val(rowQuantity * rowSalePrice);
//    Invoices_ChangeAmountInInvoiceEdit(false); //the flag is true if called from RemoveInvoiceItems
//}
function InvoiceEdit_Row_CalculateReceivablesAmount(pRowID) {
    var rowQuantity = $("#txtTblModalReceivableQuantityInvoiceEdit" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePriceInvoiceEdit" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowSalePrice;
    $("#txtTblModalReceivableAmountWithoutVATInvoiceEdit" + pRowID).val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTaxInvoiceEdit" + pRowID + " option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slReceivableDiscountInvoiceEdit" + pRowID + " option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtTblModalReceivableTaxPercentageInvoiceEdit" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmountInvoiceEdit" + pRowID).val(decTaxAmount.toFixed(2));
    $("#txtTblModalReceivableDiscountPercentageInvoiceEdit" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalReceivableDiscountAmountInvoiceEdit" + pRowID).val(decDiscountAmount.toFixed(2));
    $("#txtTblModalReceivableSaleAmountInvoiceEdit" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2)); //$("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));

    Invoices_ChangeAmountInInvoiceEdit(false); //the flag is true if called from RemoveInvoiceItems
}
function Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, pIsCheck) {
    debugger;
    var decInvoiceAmount = 0;
    var decInvoiceTaxAmount = 0; var decInvoiceTaxPercentage = 0.0;
    var decInvoiceDiscountAmount = 0; var decInvoiceDiscountPercentage = 0.0;
    var decInvoiceFixedDiscount = 0; var decReceivablesWithoutVAT = 0;
    var pIDs = "";
    pIDs = (pIsRemoveItems
        ? GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems")
        : GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems"));
    var ArrayOfIDs = pIDs.split(',');
    var NumberOfSelectedItems = ArrayOfIDs.length;

    if ($("#txtEditInvoiceFixedDiscount").val() != undefined && $("#txtEditInvoiceFixedDiscount").val() != 0) {
        decInvoiceFixedDiscount = $("#txtEditInvoiceFixedDiscount").val();
        decReceivablesWithoutVAT -= decInvoiceFixedDiscount;
        decInvoiceAmount -= decInvoiceFixedDiscount;
    }

    for (var i = 0; i < NumberOfSelectedItems; i++) {
        var RowSaleAmount = $("#txtTblModalReceivableSaleAmountInvoiceEdit" + ArrayOfIDs[i]).val();
        var RowReceivableWithoutVAT = $("#txtTblModalReceivableAmountWithoutVATInvoiceEdit" + ArrayOfIDs[i]).val();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decInvoiceAmount += parseFloat(RowSaleAmount);
            decReceivablesWithoutVAT += parseFloat(RowReceivableWithoutVAT);
        }
    }
    decInvoiceTaxPercentage = $("#slEditInvoiceTax option:selected").attr("CurrentPercentage") == undefined ? 0 : $("#slEditInvoiceTax option:selected").attr("CurrentPercentage");
    decInvoiceTaxAmount = (decReceivablesWithoutVAT * decInvoiceTaxPercentage / 100).toFixed(2);
    decInvoiceDiscountPercentage = $("#slEditInvoiceDiscount option:selected").attr("CurrentPercentage") == undefined ? 0 : $("#slEditInvoiceDiscount option:selected").attr("CurrentPercentage");
    decInvoiceDiscountAmount = (decReceivablesWithoutVAT * decInvoiceDiscountPercentage / 100).toFixed(2);
    $("#txtEditInvoiceAmountWithoutVAT").val(decReceivablesWithoutVAT); // decInvoiceAmount is without VAT till this line
    decInvoiceAmount += decInvoiceTaxAmount - decInvoiceDiscountAmount;
    $("#txtEditInvoiceTaxAmount").val(decInvoiceTaxAmount);
    $("#txtEditInvoiceDiscountAmount").val(decInvoiceDiscountAmount);
    $("#txtEditInvoiceTaxPercentage").val(decInvoiceTaxPercentage);
    $("#txtEditInvoiceDiscountPercentage").val(decInvoiceDiscountPercentage);
    $("#txtEditInvoiceAmount").val(decInvoiceAmount);

    if (!pIsCheck) //if pIsCheck is true, then this means dont refresh amount coz i am just checking
        $("#txtEditInvoiceAmount").val(decInvoiceAmount.toFixed(2));
    return decInvoiceAmount;
}

/**********************************Receivables******************************/
function Receivables_UpdateList(pSaveandAddNew, pInvoiceID, pIsRemoveItems) { // if (pInvoiceID > 0) then this is  updating Invoice Items(called from invoices_update)
    debugger;
    var pSelectedReceivablesIDsToUpdate = "";
    if (pInvoiceID == 0) //this is called normally from the receivables edit modal
        pSelectedReceivablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectReceivables"); //i get from selected 
    else { //this is called from invoice update
        if (pIsRemoveItems) //here i get only the uncheckded items coz the others will be deleted in the controllers
            pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
            pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
    }
    var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
    var pPOrCList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pSalePriceList = "";
    var pSaleAmountList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pViewOrderList = "";
    var pNotesList = "";
    if (pSelectedReceivablesIDsToUpdate != "") {
        var NumberOfSelectRows = ArrayOfIDs.length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = ArrayOfIDs[i];

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableNotes" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
        }
    }
    if (pSelectedReceivablesIDsToUpdate != "")
        InsertSelectedCheckboxItems_Post("/api/Receivables/UpdateList"
            , {
                "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate
                , "pPOrCList": pPOrCList
                , "pUOMList": pUOMList
                , "pQuantityList": pQuantityList
                , "pSalePriceList": pSalePriceList
                , "pSaleAmountList": pSaleAmountList
                , "pExchangeRateList": pExchangeRateList
                , "pCurrencyList": pCurrencyList
                , "pViewOrderList": pViewOrderList
                , "pNotesList": pNotesList
                , "pInvoiceID": pInvoiceID //if pInvoiceID==0 then its not used else this is invoice items update
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , function () { /*Receivables_GetAvailableCharges();*/ }
            , function () {
                //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
    else
        swal(strSorry, "No available items to be updated.");
}
function ReceivableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    ////pWhereClause += " Where OperationID = " + $("#hOperationID").val();
    //if ($("#hShipmentType").val() == constFCLShipmentType)
    //    pWhereClause += " WHERE IsUsedInFCl = 1 ";
    //else
    //    if ($("#hShipmentType").val() == constLCLShipmentType)
    //        pWhereClause += " WHERE IsUsedInLCL = 1 ";
    //    else
    //        if ($("#hShipmentType").val() == constFTLShipmentType)
    //            pWhereClause += " WHERE IsUsedInFTL = 1 ";
    //        else
    //            if ($("#hShipmentType").val() == constLTLShipmentType)
    //                pWhereClause += " WHERE IsUsedInLTL = 1 ";
    //            else
    //                if ($("#hShipmentType").val() == constConsolidationShipmentType)
    //                    pWhereClause += " WHERE IsUsedInConsolidation = 1 ";
    //                else
    //                    if ($("#hShipmentType").val() == "0")
    //                        pWhereClause += " WHERE IsUsedInAir = 1 ";
    //pWhereClause += " OR ID = " + pID; //for the case that settings changed for a UOM at the time it is taken 
    pWhereClause += " ORDER BY Code ";
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
    GetListWithNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select UOM", pSlName, pWhereClause);
}
function Receivables_txtTblModalCurrency_Changed(pRowID, pIsInvoiceEdit) {
    $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val($("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val())
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).removeAttr("disabled");
}
/**********************************InvoiceStatus******************************/
function PrepareInvoicesToUpdateStatus() {
    if (IsMESCOCompany) {
        $("#slEditInvoiceManualPaymentStatus").parent().addClass("hide");
        $('#cbIsInvoiceDelivered').attr('onchange', 'ShowHideDeliveryDate();');
        $("#SetInvoiceStatusModal").css('z-index', '1040');
        $('#txtDeliveryDate').val("");
        $('#txtDeliveryDate').parent().addClass("hide");
    }
    $("#hInvoiceIDToSetStatus").val(0);
    $("#hInvoicesIDsToSetStatus").val('');
    $("#lblSetInvoiceStatusShown").text('');
    $("#slEditInvoiceManualPaymentStatus").val(0);
    $("#cbIsInvoiceDelivered").prop("checked", false);
    var invoicesIds = GetAllSelectedIDsAsString('tblInvoices');
    if (invoicesIds=='') {
        swal("Please", "Select Invoices");
        return;
    }
    jQuery("#SetInvoiceStatusModal").modal("show");
    $("#hInvoicesIDsToSetStatus").val(invoicesIds);
}
function InvoiceStatus_FillControls(pID, pInvoiceTypeCode) {
    $("#hInvoiceIDToSetStatus").val(0);
    $("#hInvoicesIDsToSetStatus").val('');
    debugger;
    if (1 == 2) //Is it permitted to save 
        swal("Sorry", "This option is under development.");
    else {
        FadePageCover(true);
        jQuery("#SetInvoiceStatusModal").modal("show");
        var pParametersWithValues = {
            pWhereClause: "WHERE ID=" + pID
        };
        CallGETFunctionWithParameters("/api/Invoices/LoadAll", pParametersWithValues
            , function (pData) {
                var pInvoiceHeader = JSON.parse(pData[0]);
                $("#lblSetInvoiceStatusShown").text(": " + pInvoiceHeader[0].ConcatenatedInvoiceNumber);
                $("#hInvoiceIDToSetStatus").val(pInvoiceHeader[0].ID);
                $("#slEditInvoiceManualPaymentStatus").val(pInvoiceHeader[0].ManualPaymentStatusID);
                $("#cbIsInvoiceDelivered").prop("checked", pInvoiceHeader[0].IsDelivered);
                FadePageCover(false);
            }
            , null);
    }
}

function InvoiceStatus_SaveManualStatus() {
    debugger;
    FadePageCover(true);
    jQuery("#SetInvoiceStatusModal").modal("show");
    var pParametersWithValues = {
        pInvoiceIDToSetStatus: $("#hInvoiceIDToSetStatus").val()
        , pInvoicesIDsToSetStatus: $("#hInvoicesIDsToSetStatus").val()
        , pManualPaymentStatusID: $("#slEditInvoiceManualPaymentStatus").val()
        , pIsDelivered: $("#cbIsInvoiceDelivered").prop("checked")
    };
    if (IsMESCOCompany && CheckValueIsValidInput('#txtDeliveryDate')) {
        pParametersWithValues.pDeliveryDate = $('#txtDeliveryDate').val();
    }
    CallGETFunctionWithParameters("/api/Invoices/InvoiceStatus_SaveManualStatus", pParametersWithValues
        , function (pData) {
            var pReturnedMessage = pData[0];
            if (pReturnedMessage == "") {
                swal("Success", "Saved succefully.");
                InvoiceApproval_LoadingWithPaging();
            }
            else {
                swal("Sorry", pReturnedMessage);
                FadePageCover(false);
            }
        }
        , null);
}

function InvoiceApproval_SetApprovalAndTransfer() {
    debugger;
    var pInvoiceTableName = "tblInvoices";
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("Delete");
    let selectedIDs = pSelectedIDs.split(",");
    let IsPaidInvoiceSelected, IsApprovedInvoicesSelected = false;
    let pIsApprove = true;
    //var tr = $("#" + pInvoiceTableName + " tr[ID='" + pSelectedIDs + "']");
    selectedIDs.forEach(id => {
        if (pIsApprove) { //Action: Approve invoices
            if ($("#" + pInvoiceTableName + " tbody #" + id + " .IsApproved input").prop("checked")) {
                IsApprovedInvoicesSelected = true;
            }
        }
        else {  //Action: unapprove invoices
            if ($("#" + pInvoiceTableName + " tbody #" + id + " .InvoiceStatus").html() == "Paid") {
                IsPaidInvoiceSelected = true;
            }
        }
    })
    if (pDefaults.UnEditableCompanyName == "COS" && pIsApprove) { //glbCallingControl == "DraftInvoicesApprovals"
        if (pSelectedIDs == "" || pSelectedIDs.split(",").length > 1) {
            swal("Sorry", "Please, select just one row.");
            return;
        }
        else {
            let pVATNumber = $("#tblInvoices tr[ID=" + pSelectedIDs + "] td.InvoiceVATNumber").text();
            if (pVATNumber == 0 || pVATNumber == "") {
                swal("Sorry", "Client VAT Number is not found.");
                return;
            }
        }
    }
    if (pSelectedIDs == "") { // || pSelectedIDs.split(",").length > 1) {
        swal("Sorry", "Please, select at least one row.");
        //swal("Sorry", "Please, select just one row.");
    }
    //else if ($(tr).find("td.InvoiceStatus").html() == "Paid")
    //    swal("Sorry", "You can't unapprove a paid invoice");
    else if (["EGL", "MKH"].includes(pDefaults.UnEditableCompanyName)
        && pIsApprove == true && ($("#slCostCenter").val() == "0" || $("#slCostCenter").val() == "")) {
        swal("Sorry", "Please, select Select CostCenter.");
    }
    else if (IsPaidInvoiceSelected) {
        swal("Sorry", "You can't unapprove a paid invoice");
    }
    else if (IsApprovedInvoicesSelected) {
        swal("Sorry", "Some selected invoices are already approved");
    }
    else if (glbCallingControl == "DraftInvoicesApprovals" && $("#slNewInvoiceTypeForDraft").val() == 0 && pIsApprove && !(['MES', 'UNF'].includes(pDefaults.UnEditableCompanyName)))
        swal("Sorry", "Please, select invoice type.");
    else {

        swal({
            title: "Are you sure?",
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
                    pIDsToSetApproval: pSelectedIDs
                    , pIsApprove: pIsApprove
                    , pCostCenterID: $("#slCostCenter").val()
                    , pWhereClause: InvoiceApproval_GetWhereClause()
                    , pNewInvoiceType: glbCallingControl == "DraftInvoicesApprovals" ? $("#slNewInvoiceTypeForDraft").val() : 0
                    , pGlbCallingControl: glbCallingControl
                    //, pOrderBy: " PartnerTypeID,PartnerName, OperationID DESC "
                    , pOrderBy: " ID DESC "
                    , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                    , pPageSize: $('#select-page-size').val()
                    , pJVDate: $("#txtJvDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJvDate").val().trim())
                };
                CallGETFunctionWithParameters("/api/Invoices/ApproveOrUnApprove", pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[3];
                        var pMessageFromSP = pData[2];
                        // Example message from the transaction

                        var word = "Transaction";
                        var index = pMessageFromSP.indexOf(word);
                        if (index !== -1)
                            pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);


                        if (pMessageFromSP != "") {
                            swal("Sorry", pMessageFromSP);
                            InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                        }
                        else if (_ReturnedMessage != "") {
                            swal("Sorry", _ReturnedMessage);
                            InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                        }
                        else if (pData[0]) {
                            swal("Success", "Approved successfully.");
                            glbCallingControl = "DraftInvoicesApprovals";
                            var pParametersTwo = {
                                pIDsToSetApproval: pSelectedIDs
                                , pIsApprove: pIsApprove
                                , pCostCenterID: $("#slCostCenter").val()
                                , pWhereClause: InvoiceApproval_GetWhereClause()
                                , pNewInvoiceType: glbCallingControl == "DraftInvoicesApprovals" ? $("#slNewInvoiceTypeForDraft").val() : 0
                                , pGlbCallingControl: glbCallingControl
                                //, pOrderBy: " PartnerTypeID,PartnerName, OperationID DESC "
                                , pOrderBy: " ID DESC "
                                , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                                , pPageSize: $('#select-page-size').val()
                            };
                            glbCallingControl = "FirstStepDraftInvoiceApproval";
                            CallGETFunctionWithParameters("/api/Invoices/ApproveOrUnApprove", pParametersTwo
                                , function (pData) {
                                    var _ReturnedMessage = pData[3];
                                    var pMessageFromSP = pData[2];
                                    // Example message from the transaction

                                    var word = "Transaction";
                                    var index = pMessageFromSP.indexOf(word);
                                    if (index !== -1)
                                        pMessageFromSP = pMessageFromSP.substring(0, index + word.length - 12);


                                    if (pMessageFromSP != "") {
                                        swal("Sorry", pMessageFromSP);
                                        InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                                    }
                                    else if (_ReturnedMessage != "") {
                                        swal("Sorry", _ReturnedMessage);
                                        InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                                    }
                                    else if (pData[0]) {
                                        swal("Success", "Transfered successfully.");
                                        InvoiceApproval_BindTableRows(JSON.parse(pData[1]));
                                    }
                                }, null, false);
                            
                        }
                        
                        FadePageCover(false);
                    });
            });
    }
}
function ShowHideDeliveryDate() {
    if ($('#cbIsInvoiceDelivered').prop('checked')) {
        $('#txtDeliveryDate').parent().removeClass("hide");
    } else {
        $('#txtDeliveryDate').val("");
        $('#txtDeliveryDate').parent().addClass("hide");
    }
}

function InvoicesPaymentTerm_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    FadePageCover(true);
    $("#slInvoiceOperation").val("");
    $("#slInvoiceOperation").empty();
    jQuery("#SetInvoicePaymentTermModal").modal("show");
    var pParametersWithValues = {
        pIsLoadArrayOfObjects: false,
        pPageNumber: 1,
        pPageSize: 1,
        pOrderBy: "ID",
        pWhereClause: "WHERE ID=" + pID
    };
    CallGETFunctionWithParameters("/api/Invoices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pParametersWithValues
        , function (pData) {
            var pInvoiceHeader = JSON.parse(pData[0]);
            if (pInvoiceHeader.length != 1) {
                jQuery("#SetInvoicePaymentTermModal").modal("hide");
                FadePageCover(false);
                return;
            }
            let invoice = pInvoiceHeader[0];
            var pWhereClause = " WHERE ID = (select MasterOperationID from operations where id = " + invoice.OperationID + " ) or id = " + invoice.OperationID + " or MasterOperationID = " + invoice.OperationID ;

            GetListWithOpCodeAndHouseNoAndClientEmailAttr(invoice.OperationID, "/api/Operations/LoadWithParameters", null, "slInvoiceOperation", { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
                , null);
            $("#lblSetInvoicePaymentTermShown").text(": " + invoice.ConcatenatedInvoiceNumber);
            $("#hInvoiceIDToSetPaymentTerm").val(invoice.ID);
            $("#txtEditPaymentTermInvoiceDate").val(ConvertDateFormat(GetDateWithFormatMDY(invoice.InvoiceDate)));
            $("#slInvoicePaymentTermsFromPTModal").val(invoice.PaymentTermID);
            $("#txtEditPaymentTermDueDate").val(ConvertDateFormat(GetDateWithFormatMDY(invoice.DueDate)));

            FadePageCover(false);
        }
        , null);
    
}
function InvoiceStatus_SavePaymentTerm() {
    debugger;
    
    if (ValidateForm("form", "SetInvoicePaymentTermModal")) {
        let params = {
            InvoiceID: $("#hInvoiceIDToSetPaymentTerm").val()
            , PaymentTermID: $("#slInvoicePaymentTermsFromPTModal").val()
            , DueDate: $("#txtEditPaymentTermDueDate").val().trim()
            , OperationID: $("#slInvoiceOperation").val()
        };
        FadePageCover(true);
        CallPOSTFunctionWithParameters("/api/Invoices/UpdateInvoicePaymentTerm", params, function (pData) {
            if (pData) {
                jQuery("#SetInvoicePaymentTermModal").modal("hide");
                swal("Successful", "Invoice Updated Successfully");
            } else {
                jQuery("#SetInvoicePaymentTermModal").modal("hide");
                swal("Error", "Error Happened !!");
            }
            FadePageCover(false);
        });

    }
}
function PaymentWithClickPay()
{
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Invoices/PaymentWithClickPayAsync", { InvoiceID: GetAllSelectedIDsAsStringWithNameAttr("Delete") },
        function (pData)
        {
            debugger;
            $("#txtPaymentLink").val(pData);
            FadePageCover(false);
        });
}

function ClickPayInvoice(pInvoiceID) {
    debugger;

    swal({
        title: "Are you sure?",
        text: "You will pay this invoice",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Pay!",
        closeOnConfirm: true
    },
        function () {
            CallPOSTFunctionWithParameters("/api/ClickPay/PayInvoice", { InvoiceID: pInvoiceID}, function (pData) {
                debugger;
                var resp = pData;
                console.log(resp);
                window.open(resp.value.paymentLink, "_blank");
            }, null);
        });
}