


var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
var glbNumberOfInvoiceRoutings = 0;
var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide m-b-xs' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";

$(document).ready(function () {
    $("#slCostCenter").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});
function InvoicesPrint_Initialize() {
    debugger;
    strBindTableRowsFunctionName = "InvoiceApproval_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Invoices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    LoadView("/OperAcc/InvoicesPrint", "div-content", function () {

        if (pDefaults.UnEditableCompanyName == "CAL" || pDefaults.UnEditableCompanyName == "MAR")
            $("#cbPrintHeaderInvoice").prop("checked", true);
        if (pDefaults.UnEditableCompanyName == "MAR")
            $("#cbPrintFooterInvoice").prop("checked", true);

        if (pDefaults.UnEditableCompanyName == "SEF")
            $(".classShowForSEF").removeClass("hide");
        else if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        if (pDefaults.UnEditableCompanyName != "GBL") {
            //$("#btn-PrintMultipleInvoicesNew").removeClass("hide");
            $("#btn-PrintMultipleDiffrenceInvoices").removeClass("hide");
        }
        
        if (pDefaults.UnEditableCompanyName == "TRM") {
            $("#slInvoiceTitle").removeClass("hide");
        }

        var pWhereClause = " WHERE IsDeleted=0 AND IsApproved=1 AND InvoiceTypeID<>(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') ";


        pWhereClause += "\n" + " AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ")" + "\n";
        //var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC ";
        var pOrderBy = " ID DESC ";
        var pPageNumber = 1;
        var pPageSize = 10;
        var pControllerParameters = { pIsLoadArrayOfObjects: true, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                GetListWithNameAndWhereClause(null, "/api/BankTemplate/LoadAll", "<--Select Bank Template-->", "slBankTemplate", "ORDER BY Name", null);
                InvoiceApproval_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 5/*pCodeOrName*/, TranslateString("AllPartners"), "slPartner", pData[2]
                    , null);

                FillListFromObject(null, 1, TranslateString("AllPartnerTypes"), "slPartnerType", pData[5], null);

                //Start Auto Filter
                $(document).ready(function () {
                    $("#slCostCenter").css({ "width": "100%" }).select2();
                    $("div[tabindex='-1']").removeAttr('tabindex');
                });
                //End Auto Filter

                //Printing invoice items with notes by default in NewTrans
                if (pDefaults.UnEditableCompanyName == "NEW" || pDefaults.UnEditableCompanyName == "TRM")
                    $("#cbAddNotesToItems").prop("checked", true);

                FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("Inv.Type"), "slInvoiceType", pData[7],
                    function () {
                        $("#slNewInvoiceTypeForDraft").html($("#slInvoiceType").html());
                        if (pDefaults.UnEditableCompanyName == "SAF")
                            $("#slNewInvoiceTypeForDraft option:contains('IACCSEEDS')").addClass("hide");
                    });

                $("#slBranch").append($("#hReadySlBranches").html()); $("#slBranch").val("0");

                $("#slInvoiceType").parent().removeClass("hide");
                $("#liOperAcc").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
                $("#liApprovals").attr("onclick", "LoadViews('ReceiptsAndPaymentsApprovingAndPosting');");
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        null,
        null);
}


function InvoiceApproval_BindTableRows(pInvoices) {
    debugger;
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblInvoices");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Mail") + "</span>";
    var NoteControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-paperclip' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Notes" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Mail") + "</span>";
    var printEInvControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide classShowForMesco' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print E-Invoice" + "</span>";
    $.each(pInvoices, function (i, item) {
        AppendRowtoTable("tblInvoices",
            ("<tr ID='" + item.ID + "' "
                + " class='"
                + (item.IsDeleted
                    ? ' static-text-danger '
                    : ((item.InvoiceStatus == "UnPaid" && !item.IsApproved && !item.IsDraftApproved && item.ChildInvoiceID == 0 && item.IsHold == false)
                        ? ""
                        : (item.ChildInvoiceID == 0 && glbCallingControl == "DraftInvoicesApprovals") ? "" : " static-text-primary ")
                )
                + "'"
                + ">"
                + "<td class='InvoiceID'> <input" + (item.ChildInvoiceID == 0 && !(item.IsDeleted && item.IsApproved) && item.IsHold == false ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceBranchName'>" + item.BranchName + "</td>"
                + "<td class='InvoiceNumber'>" + item.InvoiceNumber + "/" + item.InvoiceTypeName + (item.ChildInvoiceID > 0 ? (" --> " + item.ChildInvoiceNumber + "/" + item.ChildInvoiceTypeName) : "") + "</td>"
                + "<td class='InvoiceTypeCode hide'>" + item.InvoiceTypeCode + "</td>"
                + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"

                + "<td class='InvoicePartnerID hide'>" + item.PartnerID + "</td>"
                + "<td class='InvoicePartnerTypeID hide'>" + item.PartnerTypeID + "</td>"
                + "<td class='InvoicePartner' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
                + "<td class='InvoicePartnerTypeCode hide'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

                + "<td class='InvoiceVesselName'>" + (item.VesselName == 0 ? "" : item.VesselName) + "</td>"

                + "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                + "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount + "</td>"
                + "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                + "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount + "</td>"
                + "<td class='InvoiceFixedDiscount hide'>" + item.FixedDiscount + "</td>"

                + "<td class='InvoiceAmountWithoutVAT '>" + item.AmountWithoutVAT + "</td>"
                + "<td class='VATFromItems '>" + (item.VATFromItems == 0 ? item.TaxAmount : item.VATFromItems) + "</td>"
                + "<td class='InvoiceVATNumber hide'>" + (item.VATNumber == 0 ? "" : item.VATNumber) + "</td>"
                + "<td class='InvoiceAmount'>" + item.Amount.toFixed(2) + "</td>"
                + "<td class='InvoiceCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='InvoiceMasterDataExchangeRate '>" + (pDefaults.UnEditableCompanyName == "SUS" ? item.MasterDataExchangeRate : item.MasterDataExchangeRate.toFixed(2)) + "</td>"
                + "<td class='InvoiceDueDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"

                + "<td class='InvoiceCustomerReference hide'>" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "</td>"
                + "<td class='InvoicePaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
                + "<td class='InvoiceAddressID hide' val='" + item.AddressID + "'></td>"
                + "<td class='InvoiceOperationID hide'>" + item.OperationID + "</td>"
                + "<td class='InvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"

                + "<td class='InvoiceOperationCode'>" + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + "</td>"
                + "<td class='InvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber + (pDefaults.UnEditableCompanyName == "NEW" ? item.HouseCertificateNumber : "")) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                + "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger " : "text-primary ") + "'>" + item.InvoiceStatus + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsFleet hide'> <input type='checkbox' id='cbIsFleetInvoice" + item.ID + "'" + (item.IsFleet == true ? " checked='checked'" : "") + " disabled='disabled' /></td>"
                + "<td class='NumberOfRoutings hide'>" + item.NumberOfRoutings + "</td>"

                + "<td class='InvoiceLeftSignature hide'>" + (item.LeftSignature == 0 ? "" : item.LeftSignature) + "</td>"
                + "<td class='InvoiceMiddleSignature hide'>" + (item.MiddleSignature == 0 ? "" : item.MiddleSignature) + "</td>"
                + "<td class='InvoiceRightSignature hide'>" + (item.RightSignature == 0 ? "" : item.RightSignature) + "</td>"
                + "<td class='InvoiceGRT hide'>" + (item.GRT == 0 ? "" : item.GRT) + "</td>"
                + "<td class='InvoiceDWT hide'>" + (item.DWT == 0 ? "" : item.DWT) + "</td>"
                + "<td class='InvoiceNRT hide'>" + (item.NRT == 0 ? "" : item.NRT) + "</td>"
                + "<td class='InvoiceLOA hide'>" + (item.LOA == 0 ? "" : item.LOA) + "</td>"
                + "<td class='DirectionType hide'>" + item.DirectionType + "</td>"
                + "<td class='RoutingID hide'>" + item.RoutingID + "</td>"
                + "<td class='TransactionTypeID hide'>" + item.TransactionTypeID + "</td>"
                + "<td class='RelatedToInvoiceID hide'>" + item.RelatedToInvoiceID + "</td>"
                + "<td class='OnBehalfName hide'>" + item.OnBehalfName + "</td>"
                + "<td class='OperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                + "<td class='CreationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"

                + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"


                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? " hide" : "showForMES hide") + "'>"
                + (item.IsHold == false ? "<a onclick='Invoice_MescoPrint(" + item.ID + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_Print_EInvoice(" + item.ID + ");' " + printEInvControlsText + "</a>" : " ")
                //+ (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>" : " ")

                ////Because class hide is remove by the ApplyPermissions fn
                
                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? "hide" : "hideForMES") + "'>"
                + (item.IsHold == false ? "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Print"' + ",0" + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_Print_EInvoice(" + item.ID + ");' " + printEInvControlsText + "</a>" : " ")
                //+ (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + ",0" + ");' " + emailControlsText + "</a>" : " ")

                ////Because class hide is remove by the ApplyPermissions fn

                + "</td>"
                + "<td class='" + (glbCallingControl == "InvoiceStatusForm" ? "" : "hide") + "'>"

                + "</td>"
                + "<td class='IsValidPortal hide'>" + (item.IsValidPortal?1:0) + "</td>"
                + "</tr>"));
    });

    if (pDefaults.UnEditableCompanyName == "MES") {
        $(".showForMES").removeClass("hide");
        $(".hideForMES").addClass("hide");
    }
    ApplyPermissions();
    if (!IsMESCOCompany) {
        $("tr td a.classShowForMesco").addClass("hide");
    }
    if (glbCallingControl == "InvoiceStatusForm")
        $(".classHideForInvoiceStatus").parent().addClass("hide");
    if ($("#hf_CanEdit").val() == 1 && glbCallingControl != "InvoiceStatusForm") {
        //$("#btn-ApproveAllSelected").removeClass("hide");
        if (glbCallingControl == "DraftInvoicesApprovals")
            $("#btn-UnApproveAllSelected").addClass("hide");

    }
    else {
        $("#btn-ApproveAllSelected").addClass("hide");
        $("#btn-UnApproveAllSelected").addClass("hide");
    }
    if ($("#hf_CanDelete").val() == 1 && glbCallingControl != "InvoiceStatusForm") $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");

    if (pDefaults.UnEditableCompanyName == "GBL")
        $('#btn-UnApproveAllSelected').addClass('hide');


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
    var pWhereClause = "WHERE IsDeleted=0 AND InvoiceTypeID<>(SELECT ID FROM InvoiceTypes WHERE Code='DRAFT') ";
    if ($("#txtSearchFrom").val() != '' && $("#txtSearchTo").val() != '')
        pWhereClause += " AND InvoiceDate >= '" + GetDateWithFormatyyyyMMdd($("#txtSearchFrom").val()) + "' AND InvoiceDate<='" + GetDateWithFormatyyyyMMdd($("#txtSearchTo").val()) + " 23:59:59'";

    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR MasterBL like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR HouseNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR InvoiceStatus like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR VesselName like N'%" + $("#txt-Search").val().trim() + "%' ";
        if (pDefaults.UnEditableCompanyName == "NEW")
            pWhereClause += " OR HouseCertificateNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
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
    //if ($("#slOperation").val() != "") {
    //    pWhereClause += " AND OperationID=" + $("#slOperation").val() + " ";
    //}
    if ($("#txtOperation").val().trim() != "") {
        pWhereClause += " AND (SUBSTRING(OperationCode,12,5)=N'" + $("#txtOperation").val().trim().toUpperCase() + "' OR SUBSTRING(MasterOperationCode,12,5) = N'" + $("#txtOperation").val().trim().toUpperCase() + "') \n";
    }
    if ($("#txtInvoiceNumber").val().trim() != "") {
        if (IsMESCOCompany)
            pWhereClause += " AND (InvoiceNumber=" + $("#txtInvoiceNumber").val().trim().toUpperCase() + "or UniqueSerial= " + $("#txtInvoiceNumber").val().trim().toUpperCase() + ")  \n";
        else
            pWhereClause += " AND InvoiceNumber=" + $("#txtInvoiceNumber").val().trim().toUpperCase() + " \n";

    }
    if ($("#txtBillNo").val().trim() != "") {
        pWhereClause += " And( MasterBL like N'%" + $("#txtBillNo").val().trim() + "%' ";
        pWhereClause += " OR HouseNumber like N'%" + $("#txtBillNo").val().trim() + "%' )";
    }
    if ($("#slBranch").val() != "0" && $("#slBranch").val() != null && $("#slBranch").val() != "") {
        pWhereClause += " AND BranchID=" + $("#slBranch").val() + " ";
    }
    if ($("#slInvoiceType").val() != "0") {
        pWhereClause += " AND InvoiceTypeID=" + $("#slInvoiceType").val() + " ";
    }

    pWhereClause += " AND IsApproved=1" + " \n";

    // if this is Draft Approval or Draft Transfer to invoice screens
    // then view only drafts related to CSF tariffs linked with current user or other draft not linked with tariffs
    /*if (glbCallingControl == "FirstStepDraftInvoiceApproval" || glbCallingControl == "DraftInvoicesApprovals") {
        pWhereClause += "\n" + " AND (TariffID IS NULL OR TariffID IN (SELECT utd.WH_CSL_TariffID FROM User_WH_CSL_TariffDraft AS utd WHERE utd.CanApprove = 1 AND utd.UserID = " + $("#hLoggedUserID").val() + " )) ";
    }*/

    if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() == "") {
        pWhereClause += " AND GrossWeight = " + $("#txtHB_GWFrom").val().trim() + " ";
    }
    else if ($("#txtHB_GWFrom").val().trim() != "" && $("#txtHB_GWTo").val().trim() != "") {
        pWhereClause += " AND GrossWeight between " + $("#txtHB_GWFrom").val().trim() + " and " + $("#txtHB_GWTo").val().trim();
    }

    return pWhereClause;
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
        $("#cbCombineTrucking").parent().removeClass("hide");
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



function Invoices_Print_EInvoice(id) {
    var arr_Keys = new Array();
    var arr_Values = new Array();
    let query;
    var ReportName = "MES_InvoiceReport";
    var ReportTitle = "E-Invoice";
    debugger;
    arr_Keys.push("id");
    arr_Values.push(id);
    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportTitle
        , pReportName: ReportName
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}