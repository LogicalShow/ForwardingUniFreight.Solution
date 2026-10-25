

var glbNumberOfInvoiceRoutings = 0;
function Invoices_BindTableRows(pInvoices) {
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    debugger;
    var _Copy = "(Copy)";
    ClearAllTableRows("tblInvoices");
    ClearAllTableRows("tblInvoicesDRAFT");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    var emailControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-envelope-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Mail" + "</span>";
    var CreateCreditNoteControlsText = " class='btn btn-xs btn-rounded btn-lightblue   float-right' > <i class='fa fa-paperclip' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Create CN" + "</span>";

    $.each(pInvoices, function (i, item) {
        var pInvoiceTableName = (item.InvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
        let invNo = "<td class='InvoiceNumber'>" + item.InvoiceNumber + "/" + (pDefaults.UnEditableCompanyName == "MAN" && item.InvoiceTypeCode == "DRAFT" ? "PROFORMA INVOICE" : item.InvoiceTypeName) + "</td>";
        if (pDefaults.UnEditableCompanyName == "LATT") {
            invNo = "<td class='InvoiceNumber'>" + item.InvoiceTypeCode + " " + String(item.InvoiceNumber).padStart(5, '0') + "</td>";
        }
        AppendRowtoTable(pInvoiceTableName,
            /*        ("<tr ID='" + item.ID + "' " + ((OEInv && !item.IsOperationClosed && item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false) ? ('ondblclick="Invoices_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"') : " class='static-text-primary' ") + ">"*/
        ( "<tr ID='" + item.ID + "' "
            + (item.IsValidPortal == 1
                ? " class='static-text-primary' "  
                : ((OEInv && !item.IsOperationClosed && item.InvoiceStatus == "UnPaid" && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false)
                    ? ('ondblclick="Invoices_FillControls(' + item.ID + ",'" + item.InvoiceTypeCode + "'" + ');"')
                    : " class='static-text-primary' ")
            )
            + ">"
        //("<tr ID='" + item.ID + "'>"
        /*    + "<td class='InvoiceID'> <input" + (item.InvoiceStatus == "UnPaid" && !item.IsOperationClosed && item.NumberOfAccNotes == 0 && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false && item.InvoiceStatus != "Cancelled by credit note" ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"*/
            + "<td class='InvoiceID'> <input"
            + (item.IsValidPortal == 1
                ? " disabled='disabled' "  
                : (item.InvoiceStatus == "UnPaid" && !item.IsOperationClosed && item.NumberOfAccNotes == 0 && !item.IsApproved && item.ChildInvoiceID == 0 && item.IsHold == false && item.InvoiceStatus != "Cancelled by credit note"
                    ? " name='Delete' "
                    : " disabled='disabled' ")
            )
            + " type='checkbox' value='" + item.ID + "' /></td>"
            + invNo
            + "<td class='InvoiceTypeCode hide'>" + item.InvoiceTypeCode + "</td>"
            
            //+ "<td class='InvoicePartnerID hide'>" + item.PartnerID + "</td>"
            //+ "<td class='InvoicePartnerTypeID hide'>" + item.PartnerTypeID + "</td>"
            + "<td class='InvoicePartner ' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
            + "<td class='InvoicePartnerTypeCode'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

            //+ "<td class='InvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
            //+ "<td class='InvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
            //+ "<td class='InvoiceTaxAmount hide'>" + item.TaxAmount.toFixed(2) + "</td>"
            //+ "<td class='InvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
            //+ "<td class='InvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
            //+ "<td class='InvoiceDiscountAmount hide'>" + item.DiscountAmount.toFixed(2) + "</td>"
            //+ "<td class='InvoiceFixedDiscount hide'>" + item.FixedDiscount + "</td>"

            + "<td class='InvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(2) + "</td>"
            //+ "<td class='InvoiceVATNumber hide'>" + (item.VATNumber == 0 ? "" : item.VATNumber) + "</td>"
            + "<td class='InvoiceAmount'>" + item.Amount.toFixed(2) + "</td>"
            + "<td class='InvoiceCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
            + "<td class='InvoiceMasterDataExchangeRate hide'>" + (pDefaults.UnEditableCompanyName == "SUS" ? item.MasterDataExchangeRate : item.MasterDataExchangeRate.toFixed(2)) + "</td>"
            + "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
            + "<td class='InvoiceDueDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"
            //+ "<td class='IsDocIn hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocIn == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='IsDocOut hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDocOut == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='IsPrintISOCode hide'> <input type='checkbox' disabled='disabled' val='" + (item.PrintISOCode == true ? "true' checked='checked'" : "'") + " /></td>"
            //+ "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
            //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_Print(" + item.ID + ");' " + printControlsText + "</a></td></tr>"));
            //+ "<td class='InvoiceCustomerReference hide'>" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "</td>"
            //+ "<td class='InvoicePaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
            //+ "<td class='InvoiceAddressID hide' val='" + item.AddressID + "'></td>"
            + "<td class='InvoiceOperationID hide'>" + item.OperationID + "</td>"
            + "<td class='InvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
            + "<td class='InvoiceOperationCode hide'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            + "<td class='InvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
            + "<td class='InvoiceStatus " + (item.InvoiceStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.InvoiceStatus + "</td>"
            + "<td class='InvoiceNumberOfAccNotes'>" + item.NumberOfAccNotes + "</td>"
            + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
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
            //+ "<td class='IsValidPortal hide'>" + (item.IsValidPortal ? 1 : 0) + "</td>"
            //+ "<td class='RelatedToInvoiceID hide'>" + item.RelatedToInvoiceID + "</td>"
            //+ "<td class='OperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
            //+ "<td class='CreationDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"

            //+ "<td class='hide'><a onclick='Invoices_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
            //+ ($("#hIsOperationDisabled").val() == false
            //    ? "<td class=''><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
            //    : "<td></td>")
            + "<td class='IsHold'> <input type='checkbox' disabled='disabled' val='" + (item.IsHold == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='USDPerContainerMesco " + (IsMESCOCompany ? (item.InvoiceTypeCode != "DRAFT" ? "hide" : "") : "hide") + "'> <input type='checkbox' disabled='disabled' val='" + (item.USDPerContainer == 1 ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='showForUNFCPW hide'>"
            + (item.IsHold == false ? "<a onclick='UnfInvoicePrint(" + item.ID+");' " + printControlsText + "</a>" : " ")
            + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + "," + '"' + _Copy + '"' + ");' " + emailControlsText + "</a>" : " ")
            + (ODInv && item.IsHold == false ? "<a  onclick='Invoices_CreateCreditNote(" + item.ID + ");' " + CreateCreditNoteControlsText + "</a>" : '')
            + "<td class='hideForMES'>"
                + (item.IsHold == false ? "<a onclick='Invoices_Print(" + item.ID + ",3," + '"Print"' + "," + '"' + _Copy + '"' + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + "," + '"' + _Copy + '"' + ");' " + emailControlsText + "</a>" : " ")
                  + (ODInv && pDefaults.UnEditableCompanyName != "LATT" && item.IsHold == false ? "<a  onclick='Invoices_CreateCreditNote(" + item.ID + ");' " + CreateCreditNoteControlsText + "</a>" : '')
            + "<td class='showForMES hide'>"
            + (item.IsHold == false ? "<a onclick='Invoice_MescoPrint(" + item.ID + ");' " + printControlsText + "</a>" : " ")
                + (item.IsHold == false ? "<a onclick='Invoices_GetReceivedCotactEmails(" + item.ID + ",3," + '"Email"' + "," + '"' + _Copy + '"' + ");' " + emailControlsText + "</a>" : " ")
                  + (ODInv && item.IsHold == false ? "<a  onclick='Invoices_CreateCreditNote(" + item.ID + ");' " + CreateCreditNoteControlsText + "</a>" : '')
            + "</td>"
            + "<td class='USDPerContainer hide'>" + item.USDPerContainer + "</td>"
            + "</tr>"));
    });




    //ApplyPermissions();
    //$("#cbPrintBankDetailsFromDefaults").prop("checked", true);
    if (OAInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewInvoice").removeClass("hide"); else $("#btn-NewInvoice").addClass("hide");
    if (ODInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");

    if (OADraftInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewDraftInvoice").removeClass("hide"); else $("#btn-NewDraftInvoice").addClass("hide");
    if (ODDraftInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteDraftInvoice").removeClass("hide"); else $("#btn-DeleteDraftInvoice").addClass("hide");

    if (pDefaults.UnEditableCompanyName == "MES") {
        $(".hideForMES").addClass("hide");
        $(".showForMES").removeClass("hide");
       // $("#btn-DeleteInvoice").addClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "UNF" || pDefaults.UnEditableCompanyName == "REL" || pDefaults.UnEditableCompanyName == "LIN"  ) {
        $(".hideForMES").addClass("hide");
       
        $(".showForUNFCPW").removeClass("hide");

        // $("#btn-DeleteInvoice").addClass("hide");
    }
    BindAllCheckboxonTable("tblInvoices", "InvoiceID", "cb-CheckAll-Invoices");
    BindAllCheckboxonTable("tblInvoicesDRAFT", "InvoiceID", "cb-CheckAll-DraftInvoice");
    CheckAllCheckbox("HeaderDeleteInvoiceID");
    CheckAllCheckbox("HeaderDeleteDraftInvoiceID");
    //HighlightText("#tblInvoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (pDefaults.UnEditableCompanyName == "FLA") {
        $("#cbPrintHeaderInvoice").prop("checked", true);
        $("#cbAddNotesToItems").prop("checked", true);
        $("#cbPrintBankDetailsFromDefaults").prop("checked", true);
        $("#cbPrintMBL").prop("checked", false);
        $("#cbPrintHBL").prop("checked", false);
        $("#slBankTemplate").removeClass("hide");
        $("#slBankTemplate").val(3);
    }
    else if (pDefaults.UnEditableCompanyName == "FWD") {
        $("#cbPrintHeaderInvoice").prop("checked", true);
        $("#cbPrintFooterInvoice").prop("checked", true);
        $("#cbAddNotesToItems").prop("checked", true);
        $("#cbPrintHBL").prop("checked", false);
    }
    HideOperationActions();
}
function Invoices_LoadAll(pOperationID) {
    var pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 AND InvoiceTypeCode<>N'CREDITMEMO' ";
    debugger;
    var pParametersWithValues = {
        pOperationID: pOperationID
    };
    CallGETFunctionWithParameters("/api/Invoices/LoadAllFromOperation", pParametersWithValues, function (pData) {
        debugger;
        Invoices_BindTableRows(JSON.parse(pData[0])); /*DocsOut_ClearAllControls();*/
        if ($("#slEditInvoiceTransactionTypes option").length < 2)
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEditInvoiceTransactionTypes", pData[1], null);

    });
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Invoices/LoadWithWhereClause", " where OperationID = " + pOperationID, 0, 1000, function (pTabelRows) { Receivables_BindTableRows(pTabelRows); });
}
function Invoices_Insert(pSaveandAddNew) {
    debugger; 
    if ($("#txtInvoiceIssueDate").val() == ""
        || Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), ConvertDateFormat($("#txtInvoiceIssueDate").val())) > 0)
        swal("Sorry", "Date must be today or before.");
    else {
    FadePageCover(true);
    var pParametersWithValues = {
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slInvoiceCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceIssueDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtInvoiceIssueDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
              )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pData) {
            if (pData[0] == "[]") {
                $("#txtInvoiceMasterDataExchangeRate").val(0);
                swal("Sorry", "Exchange rate is not set for " + $("#slInvoiceCurrency option:selected").text() + " in the Master Data.");
                FadePageCover(false);
            }
            else {
                $("#txtInvoiceMasterDataExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                if (Invoices_CheckDates('txtInvoiceIssueDate', 'txtInvoiceDueDate')) {
                    FadePageCover(true);
                    var pSelectedReceivableItemsIDs = GetAllSelectedIDsAsString('tblReceivables');

                    if (IsMESCOCompany) {
                        debugger;
                        let invCatError = false;
                        let invoicetype = $('#slInvoiceTypes option:selected').text().toUpperCase();
                        if (invoicetype == 'OFFICIAL RECEIPT STATEMENT') {
                            $('#tblReceivables tbody td').find('input[name="Delete"]:checked').each(function () {
                                if ($("#tblReceivables tr[id=" + $(this).attr('value') + "]").find("td.ReceivableCategory").text().toUpperCase() != 'CLIENT OFFICIAL RECEIPTS') {
                                    invCatError = true;
                                }
                            });
                            if (invCatError) {
                                swal("Sorry", "Invoice type (OFFICIAL RECEIPT STATEMENT) can have (CLIENT OFFICIAL RECEIPTS) category receivables only");
                                FadePageCover(false);
                                return;
                            }
                        } else if (invoicetype == 'COLLECTION FOR OTHERS') {
                            $('#tblReceivables tbody td').find('input[name="Delete"]:checked').each(function () {
                                if ($("#tblReceivables tr[id=" + $(this).attr('value') + "]").find("td.ReceivableCategory").text().toUpperCase() != 'LCL FREIGHT FEES') {
                                    invCatError = true;
                                }
                            });
                            if (invCatError) {
                                swal("Sorry", "Invoice type (COLLECTION FOR OTHERS) can have (LCL FREIGHT FEES) category receivables only");
                                FadePageCover(false);
                                return;
                            }
                        } else if (invoicetype == 'STATMENT (INVOICE)') {
                            $('#tblReceivables tbody td').find('input[name="Delete"]:checked').each(function () {
                                if ($("#tblReceivables tr[id=" + $(this).attr('value') + "]").find("td.ReceivableCategory").text().toUpperCase() == 'LCL FREIGHT FEES' || $("#tblReceivables tr[id=" + $(this).attr('value') + "]").find("td.ReceivableCategory").text().toUpperCase() == 'CLIENT OFFICIAL RECEIPTS') {
                                    invCatError = true;
                                }
                            });
                            if (invCatError) {
                                swal("Sorry", "Invoice type (STATMENT (INVOICE)) can't have (CLIENT OFFICIAL RECEIPTS or LCL FREIGHT FEES) category receivables");
                                FadePageCover(false);
                                return;
                            }
                        }
                    }

                    var data = {
                        "pSelectedReceivableItemsIDs": pSelectedReceivableItemsIDs
                            , "pInvoiceNumber": 0 /*generated automatically*/ //($("#txtInvoiceNumber").val().trim() == "" ? "0" : $("#txtInvoiceNumber").val().trim().toUpperCase())
                        //, "pOperationID": $("#hOperationID").val()
                            , "pOperationID": $("#slInvoiceOperations").val()
                            , "pOperationPartnerID": $("#slInvoicePartner").val() //in table OperationPartners
                        //, "pAddressTypeID": 0//($("#slInvoiceAddressTypes").val() == "" ? 0 : $("#slInvoiceAddressTypes").val())
                            , "pAddressID": $("#slInvoiceAddressTypes").val()///////////////////////////////////////////////
                            , "pInvoiceTypeID": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes").val())
                            , "pInvoiceTypeCode": ($("#slInvoiceTypes").val() == "" ? 0 : $("#slInvoiceTypes option:selected").text())
                            , "pPrintedAddress": "0"
                            , "pCustomerReference": ($("#txtInvoiceCustomerReference").val().trim() == "" ? "0" : $("#txtInvoiceCustomerReference").val().toUpperCase())
                            , "pPaymentTermID": $("#slInvoicePaymentTerms").val()
                            , "pCurrencyID": ($("#slInvoiceCurrency").val() == "" ? 0 : $("#slInvoiceCurrency").val())
                            , "pExchangeRate": ($("#txtInvoiceMasterDataExchangeRate").val() == "" ? 1 : $("#txtInvoiceMasterDataExchangeRate").val())
                            , "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceIssueDate").val().trim())
                            , "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInvoiceDueDate").val().trim()))
                        //, "pInvoiceIssueDate": ($("#txtInvoiceIssueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceIssueDate").val().trim())
                        //, "pInvoiceDueDate": ($("#txtInvoiceDueDate").val() == "" ? "01/01/1900" : $("#txtInvoiceDueDate").val().trim())

                            , "pAmountWithoutVAT": $("#txtInvoiceAmountWithoutVAT").val()
                            , "pTaxTypeID": $("#slInvoiceTax").val() == "" ? 0 : $("#slInvoiceTax").val()
                            , "pTaxPercentage": $("#txtInvoiceTaxPercentage").val() == "" ? 0 : $("#txtInvoiceTaxPercentage").val()
                            , "pTaxAmount": $("#txtInvoiceTaxAmount").val() == "" ? 0 : $("#txtInvoiceTaxAmount").val()
                            , "pDiscountTypeID": $("#slInvoiceDiscount").val() == "" ? 0 : $("#slInvoiceDiscount").val()
                            , "pDiscountPercentage": $("#txtInvoiceDiscountPercentage").val() == "" ? 0 : $("#txtInvoiceDiscountPercentage").val()
                            , "pDiscountAmount": $("#txtInvoiceDiscountAmount").val() == "" ? 0 : $("#txtInvoiceDiscountAmount").val()
                            , "pFixedDiscount": $("#txtInvoiceFixedDiscount").val() == "" ? 0 : $("#txtInvoiceFixedDiscount").val()

                            , "pAmount": $("#txtInvoiceAmount").val()
                            , "pInvoiceStatusID": 1
                            , "pIsApproved": false
                            , "pTankID": $("#slInvoiceOperationTank").val() == "" ? 0 : $("#slInvoiceOperationTank").val()
                            , "pTransactionTypeID": $("#slTransactionTypes").val() == "" ? 0 : $("#slTransactionTypes").val()
                            , pApplyTankCharges: true
                            , "pTariffID": 0
                            , "pStorageFromDate": "01/01/1900"
                            , "pStorageToDate": "01/01/1900" 
                        , "pPortalOperationPartnerID": $("#slPortalInvoicePartner").val() || 0
                        , "pNotes" : "0"
                    }
                    if (IsMESCOCompany && data.pInvoiceTypeID == 9) {
                        //pUSDPerContainer---> This parameter is used to hold IsStatement flag in Mesco Only
                        data.pUSDPerContainer = $("#cbIsStatement").prop('checked') ? 1 : 0;
                    }
                    if (pDefaults.UnEditableCompanyName == "AGR") {
                        //pUSDPerContainer---> This parameter is used to hold PaymentTerms2 in AGRO as this column is unused there
                        data.pUSDPerContainer = $("#slInvoicePaymentTerms2").val();
                        //pStorageFromDate---> This parameter is used to hold Due Date 2 in AGRO as they don't use CFS Module
                        data.pStorageFromDate = $("#txtInvoiceDueDate2").val() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtInvoiceDueDate2").val().trim());
                    }
                    if (pDefaults.UnEditableCompanyName == "MES") {
                        data.pNotes = $("#txtInvoiceNotesMES").val() == '' ? 0 : $("#txtInvoiceNotesMES").val();

                    }
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        data.pUSDPerContainer = CheckValueIsValidInput("#slInvoiceTypesUNF") ? $("#slInvoiceTypesUNF").val() : 0;
                        if ($("#slInvoiceTypes").val() == "9") {
                            $("#slInvoiceTypesUNF").attr("data-required", "true");
                        }
                        else {
                            $("#slInvoiceTypesUNF").attr("data-required", "false");
                        }
                    }
                    InsertUpdateFunction("form", "/api/Invoices/Insert", data, pSaveandAddNew, "InvoiceModal"
                        , function (data) {
                            debugger;
                            var _DistinctTankCurrencyCount = data[2];
                            Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            Invoices_LoadAll($("#hOperationID").val());
                            let CompaniesToDisableDefaultPrint = ["CHM", "COS", "OCE"];
                            if (data[0]) {
                                if (!CompaniesToDisableDefaultPrint.includes(pDefaults.UnEditableCompanyName)) {
                                    if (!IsMESCOCompany)
                                        if (pDefaults.UnEditableCompanyName == "UNF" || pDefaults.UnEditableCompanyName == "REL" || pDefaults.UnEditableCompanyName == "LIN") {
                                            UnfInvoicePrint(data[1]);
                                        } else {
                                        Invoices_Print(data[1], 3/*$("#slInvoiceReportTypes").val()*/, "Print", "(Original)");/*Incoterms_LoadingWithPaging();*/

                                        }
                                    else
                                        Invoice_MescoPrint(data[1]);
                                }
                              

                                if (_DistinctTankCurrencyCount > 1)
                                    swal("Sorry", "Some items are not added becuase they have different currencies.");
                            }
                            else
                                swal("Sorry", "Connection Failure, please refresh then try again.");
                            FadePageCover(false);
                        });
                }
                else { //Not Correct Date
                    FadePageCover(false);
                    swal(strSorry, strCheckDates);
                }
            }
        }
        , null);
    }
}
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
                                closeOnConfirm: true
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
                                    , "pClientNotes": $("#txtEditInvoiceClientNotes").val().trim() == "" ? "0" : $("#txtEditInvoiceClientNotes").val().trim()
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
                                if (IsMESCOCompany) {
                                    data.pUSDPerContainer = $("#cbEditInvoiceIsStatement").prop('checked') ? 1 : 0;
                                }
                                if (pDefaults.UnEditableCompanyName == "AGR") {
                                    //pUSDPerContainer---> This parameter is used to hold PaymentTerms2 in AGRO as this column is unused there
                                    data.pUSDPerContainer = $("#slEditInvoicePaymentTerms2").val();
                                    //pStorageFromDate---> This parameter is used to hold Due Date 2 in AGRO as they don't use CFS Module
                                    data.pInvoiceDueDate2 = $("#txtEditInvoiceDueDate2").val() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtEditInvoiceDueDate2").val().trim());
                                }
                                if (ValidateForm("form", "EditInvoiceModal")) {
                                    let DeleteItems = GetAllSelectedIDsAsStringWithTableNameAndNameAttr('tblModalInvoiceItems', 'cbSelectInvoiceItems');
                                    CallPOSTFunctionWithParameters("/api/Invoices/Update", data
                                            , function (pData) {
                                                //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());//executed in Receivables_UpdateList(true, $("#hEditedInvoiceID").val());

                                                Invoices_LoadAll($("#hOperationID").val());
                                                OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                                Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                                Invoices_FillInvoiceItems($("#hEditedInvoiceID").val(), null);
                                                $("#slEditInvoiceCurrency").val(pFirstItemRowID == undefined ? pOriginalCurrencyID : $("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val());//incase of changing currency
                                                //Invoices_Print(pID, 3/*$("#slInvoiceReportTypes").val()*/);/*Incoterms_LoadingWithPaging();*/
                                                if (pData[0] && glbCallingControl == "OperationsEdit") {
                                                    $("#hEditedInvoiceCurrencyID").val(pOriginalCurrencyID);
                                                }
                                                if (pData[0])
                                                    swal("Success", "Saved successfully.");
                                            }
                                            , null);
                                }
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
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    Invoices_LoadAll($("#hOperationID").val());
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
                        closeOnConfirm: false
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
                                //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());//executed in Receivables_UpdateList(true, $("#hEditedInvoiceID").val());
                                OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                Invoices_LoadAll($("#hOperationID").val());
                                Invoices_FillInvoiceItems($("#hEditedInvoiceID").val());
                                $("#slEditInvoiceCurrency").val($("#slReceivableCurrencyInvoiceEdit" + pFirstItemRowID).val());//incase of changing currency
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
function Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, pSlName) {
    if (pInvoiceTypeCode == "DRAFT")
        $("#" + pSlName).attr("disabled", "disabled");
    else {
        $("#" + pSlName).removeAttr("disabled");
        $("#slInvoiceTypes option:contains('DRAFT')").addClass("hide");
        if (pDefaults.UnEditableCompanyName == "SAF")
            $("#slInvoiceTypes option:contains('IACCSEEDS')").addClass("hide");
    }
}
//called when generating new invoice, not editing so use tblReceivables not tblModalReceivables
function Invoices_ClearAllControls(pInvoiceTypeCode) {
    debugger;
    //let SelectedItemsHaveSameTaxTypeID = false;
    //if (IsMESCOCompany) {
    //    let selectedTaxTypes = [];
    //    let selectedTaxTypesSet;
    //    $("#tblReceivables tbody tr").has("td.ReceivableID input:checked").find("td.ReceivableTaxTypeID").each(function (i, item) {
    //        selectedTaxTypes.push($(item).attr("val"));
    //    })
    //    selectedTaxTypesSet = new Set(selectedTaxTypes); //to extract selected unique tax types to validate they are the same
    //    SelectedItemsHaveSameTaxTypeID = !(selectedTaxTypesSet.size > 1)
    //    debugger;
    //}
    //for mesco companies you cannot make an invoice including an item with zero selling price
    if (pDefaults.UnEditableCompanyName == "BRS") 
        $("#slInvoiceAddressTypes").attr('data-required', 'false');


    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".ISUNF").removeClass("hide");
    } else {
        $(".ISUNF").addClass("hide");
    }
  
    var pMsgNotLinked = "";
    var optionWithValue2 = $('#slInvoiceTax').find("option[value='2']");
    var optionWithValue6 = $('#slInvoicePaymentTerms').find("option[value='6']");
    var SelectedPartnerForUNF = $('#slInvoicePartner').find(':selected').attr('paymenttermid')

    var pSelectedReceivableItemsIDs = GetAllSelectedIDsAsString('tblReceivables');
    if (pSelectedReceivableItemsIDs == "" || pSelectedReceivableItemsIDs == null || pSelectedReceivableItemsIDs == undefined) {
        jQuery("#InvoiceModal").modal("hide");
        swal(strSorry, "Please, Select at least one item.");
    } else {
        var pParametersWithValues = { pReceivablesIDs: pSelectedReceivableItemsIDs, "pOperationID": $("#hOperationID").val() };
        CallPOSTFunctionWithParameters("/api/Receivables/CheckIfReceivableLinkToAccount", pParametersWithValues
            , function (pData) {
                pMsgNotLinked = pData;
                FadePageCover(false);
            }
            ,
            function () {
                if (IsMESCOCompany && pMsgNotLinked != '')
                    swal("Sorry", pMsgNotLinked);
               else if (IsMESCOCompany && $("#tblReceivables tbody tr").has("td.ReceivableID input:checked").find("td.ReceivableSalePrice").filter(function () { return parseFloat($(this).text().trim()).toFixed(2) == 0; }).length > 0) {
                    swal("Sorry", "Please, item selling price cannot be zero in invoice");
                } else if (IsMESCOCompany && pOperationHeader_Global.ShipmentTypeCode != "CONSOL" && (pOperationHeader_Global.OperationStageName != "INVOICE" && pOperationHeader_Global.OperationStageName != "CLOSED")) {
                    swal("Sorry", "Can't Create Invoices because Operation status is not INVOICE");
                } else {
                    if (pDefaults.UnEditableCompanyName == "GBL") {
                        $(".classShowForGBL").removeClass("hide");
                        $("#slTransactionTypes").attr("data-required", "true");
                    }
                    else {
                        $(".classShowForGBL").addClass("hide");
                        $("#slTransactionTypes").attr("data-required", "false");
                    }
                    if (IsMESCOCompany) {
                        $("#txtInvoiceIssueDate").attr("disabled", "disabled");
                        $("#txtInvoiceIssueDate").css("background-color", "");
                        $("#slPortalInvoicePartner").parent().removeClass("hide");
                        $("#slInvoicePartner").prev().html("Credit Client");
                        $("#slInvoiceTax").parent().removeClass("hide");
                        $("#slInvoiceTax").attr("onChange", "");
                        if (pInvoiceTypeCode == "DRAFT") {
                            $("#cbIsStatement").parent().parent().removeClass("hide");
                        } else {
                            $("#cbIsStatement").prop('checked', false);
                            $("#cbIsStatement").parent().parent().addClass("hide");
                        }
                    }
                  
                    if (pDefaults.UnEditableCompanyName == "SAF") {
                        $("#cbAddNotesToItems").prop("checked", true);
                    }
                    if ($("#cbIsTank").prop("checked")) {
                        $(".classShowForTank").removeClass("hide");
                    }
                    if (pDefaults.UnEditableCompanyName == "MKH")
                        $(".classShowForMKH").removeClass("hide");
                    else
                        $(".classShowForMKH").addClass("hide");

                    ClearAll("#InvoiceModal");
                    if (pInvoiceTypeCode == "DRAFT") {
                        $("#lblInvoiceShown").html("(Draft)");
                        if ($("#hf_ChangeLanguage").val() == "ar") {
                            $("#btnSaveInvoice").text("إنشاء مسودة"); //remove in the future to be CREATE for both cases
                        }
                        else {
                            $("#btnSaveInvoice").text("Create Draft");
                        }
                    }
                    else {
                        $("#lblInvoiceShown").html("");
                        if ($("#hf_ChangeLanguage").val() == "ar") {
                            $("#btnSaveInvoice").text("إنشاء فاتورة"); //remove in the future to be CREATE for both cases
                        }
                        else {
                            $("#btnSaveInvoice").text("Create Invoice"); //remove in the future to be CREATE for both cases
                        }
                    }                
                    Invoices_SetSlInvoiceTypeProperties(pInvoiceTypeCode, "slInvoiceTypes");
                    if (Invoices_CheckSameVat("tblReceivables", "ReceivableTaxTypeID") || pDefaults.UnEditableCompanyName != 'MES') {
                        if (Invoices_CheckSameCurrency("tblReceivables", "ReceivableCurrency")) {
                            FadePageCover(true);
                            jQuery("#InvoiceModal").modal("show");
                            if (IsMESCOCompany)
                                $(".showForMes").removeClass("hide");
                            if ($("#slInvoiceTypes option").length < 2) {
                                InvoiceTypes_GetList(null, "slInvoiceTypes", pInvoiceTypeCode);

                                if (pDefaults.UnEditableCompanyName == "UNF") {
                                    InvoiceTypes_GetList(null, "slInvoiceTypesUNF", pInvoiceTypeCode);
                                }

                            }
                            else if (pInvoiceTypeCode == "DRAFT")
                                $("#slInvoiceTypes").val($("#slInvoiceTypes option:contains(DRAFT)").val());

                            InvoiceOperations_GetList($("#hOperationID").val(), "slInvoiceOperations", function () { FadePageCover(false); });
                            InvoicePartners_GetList(null, $("#hOperationID").val(), "slInvoicePartner", function () {
                                if (pDefaults.UnEditableCompanyName == "AGR" ) {
                                    let ConsigneeOptionVal = $("#slInvoicePartner option[partnertypeid='1'][partnerid='" + pOperationHeader_Global.ConsigneeID + "']").val();
                                    $('#slInvoicePartner').val(ConsigneeOptionVal).trigger('change');
                                    $('#slInvoicePartner').attr('disabled', 'disabled');
                                }
                                debugger;
                                if ( pDefaults.UnEditableCompanyName == "UNF") {
                                    //let ConsigneeOptionVal = $("#slInvoicePartner option[partnertypeid='1'][partnerid='" + pOperationHeader_Global.ConsigneeID + "']").val();
                                    //$('#slInvoicePartner').val(ConsigneeOptionVal).trigger('change');

                                    if (pOperationHeader_Global.ConsigneeID2 == null || pOperationHeader_Global.ConsigneeID2 == 0) {
                                        let ConsigneeOptionVal  = $("#slInvoicePartner option[partnertypeid='1'][partnerid='" + pOperationHeader_Global.ConsigneeID + "']").val();
                                        $('#slInvoicePartner').val(ConsigneeOptionVal).trigger('change');

                                    } else {
                                        let ConsigneeOptionVal = $("#slInvoicePartner option[partnertypeid='1'][partnerid='" + pOperationHeader_Global.ConsigneeID2 + "']").val();
                                        $('#slInvoicePartner').val(ConsigneeOptionVal).trigger('change');
                                    }






                                    var optionWithValue6 = $('#slInvoicePaymentTerms').find("option[value='6']");
                                    var SelectedPartnerForUNF = $('#slInvoicePartner').find(':selected').attr('paymenttermid')
                                    if (SelectedPartnerForUNF == '0') {
                                       
                                        var optionWithValue6 = $('#slInvoicePaymentTerms').find("option[value='6']");
                                        optionWithValue6.prop('selected', true);
                                    }

                                  
                                }
                            });
                            InvoicePartners_GetList(null, $("#hOperationID").val(), "slPortalInvoicePartner", null);
                            Invoices_SetInvoiceAmount("tblReceivables", "Invoice", "ReceivableSaleAmount");
                            InvoiceAddressTypes_GetList(null, "slInvoiceAddressTypes", "slInvoicePartner", null);//the 3rd parameter is the sl name of the partner control
                            //get the invoice currency from the 1st item (i checked they have the same currency)
                            var pInvoiceCurrencyID = $('#tblReceivables').find('input[name="Delete"]:checked:first').parent().parent().find("td.ReceivableCurrency").attr('val');
                            if (pInvoiceCurrencyID == undefined) $("#slInvoiceCurrency").removeAttr("disabled");
                            else $("#slInvoiceCurrency").attr("disabled", "disabled");
                            InvoiceCurrency_GetList((pInvoiceCurrencyID == undefined ? $("#hDefaultCurrencyID").val() : pInvoiceCurrencyID), "slInvoiceCurrency", "Invoice");                          
                            InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms");
                            InvoiceTransactionTypes_GetList(null, "slTransactionTypes");
                                                   
                            if ($("#slInvoiceTax option").length < 2)
                                GetListTaxTypeWithNameAndPercAttr(null, "/api/TaxeTypes/LoadAllWithWhereClause"
                                    , TranslateString("SelectFromMenu"), "slInvoiceTax", "WHERE IsInactive=0 ORDER BY Name"
                                    , function () {
                                        $("#slInvoiceDiscount").html($("#slInvoiceTax").html());
                                        $("#slInvoiceTax option[IsDiscount='true']").addClass('hide');
                                        $("#slInvoiceDiscount option[IsDiscount='false']").addClass('hide');
                                        debugger;
                                        if (pDefaults.UnEditableCompanyName == "UNF") {
                                            var optionWithValue2 = $('#slInvoiceTax').find("option[value='2']");
                                            let ConsigneeOptionVal = $("#slInvoicePartner option[partnertypeid='1'][partnerid='" + pOperationHeader_Global.ConsigneeID + "']").val();
                                            $('#slInvoicePartner').val(ConsigneeOptionVal).trigger('change');
                                            optionWithValue2.prop('selected', true);                                         
                                            Invoices_SetInvoiceAmount("tblReceivables", "Invoice", "ReceivableSaleAmount");

                                        }
                                     
                                        if (IsMESCOCompany) {
                                            $("#slInvoiceTax").val($($("#tblReceivables tbody tr").has("td.ReceivableID input:checked").find("td.ReceivableTaxTypeID")[0]).attr("val"));
                                            if ($($("#tblReceivables tbody tr").has("td.ReceivableID input:checked").find("td.ReceivableTaxTypeID")[0]).attr("val") == "0") {
                                                $("#slInvoiceTax").val("");
                                            }
                                        }
                                    });


                            debugger;
                            if (pDefaults.UnEditableCompanyName == "UNF") {
                                var optionWithValue2 = $('#slInvoiceTax').find("option[value='2']");

                                optionWithValue2.prop('selected', true);
                                Invoices_SetInvoiceAmount("tblReceivables", "Invoice", "ReceivableSaleAmount");
                            }
                            $("#txtInvoiceNumber").val("");
                            $("#txtInvoiceCustomerReference").val("");
                            //$("#txtInvoiceMasterDataExchangeRate").val(""); //set inside the InvoiceCurrency_GetList() fn
                            var pStuffingDate = $($("#tblRoutings tbody").find("tr[val=" + TruckingOrderRoutingTypeID + "] td.StuffingDate")[0]).text();
                            if (pDefaults.UnEditableCompanyName == "ELC" && pStuffingDate != "") {
                                $("#txtInvoiceIssueDate").val(pStuffingDate);
                            }
                            else {
                                if (pDefaults.UnEditableCompanyName != "GBL")
                                    $("#txtInvoiceIssueDate").val(getTodaysDateInddMMyyyyFormat());
                                //if(navigator.language == "en-GB")
                                //    $("#txtInvoiceIssueDate").val((FormattedTodaysDate));
                                //else
                                //    $("#txtInvoiceIssueDate").val(ConvertDateFormat(FormattedTodaysDate));
                            }

                        
                            $("#txtEditInvoiceCreationDate").val($("#txtInvoiceIssueDate").val()); //this is in invoice but set here for Elite
                            $("#txtInvoiceDueDate").val($("#txtInvoiceIssueDate").val());
                            if ($("#cbIsTank").prop("checked")) {
                                FadePageCover(true);
                                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
                                    , {
                                        pPageNumber: 1
                                        , pPageSize: 999999
                                        , pWhereClauseForTank: "WHERE OperationID=" + $("#hOperationID").val() + " AND TankOrFlexiNumber IS NOT NULL AND ID IN (SELECT OperationContainersAndPackagesID FROM Receivables WHERE IsDeleted=0 AND InvoiceID IS NULL AND OperationID=" + $("#hOperationID").val() + ") "
                                        , pOrderBy: "ID"
                                    }
                                    , function (pData) {
                                        var pTank = pData[0];
                                        FillListFromObject(null, 1, TranslateString("SelectFromMenu"), "slInvoiceOperationTank", pTank, null);
                                        FadePageCover(false);
                                    }
                                    , null);
                            }                       
                        }
                        else //there are different currencies
                            swal(strSorry, "The items must be of the same currency.");
                    }
                    else
                        swal(strSorry, "The items must be of the same vat.");
                }
                //else { //no items are selected
                //    //jQuery("#InvoiceModal").modal("hide");
                //    swal(strSorry, "Please, Select at least one item.");
                //}
            }
        );

    }

    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slInvoiceAddressTypes").attr('data-required', 'false');
    }
   
        
}
function Invoices_FillControls(pID, pInvoiceTypeCode) {
    debugger;
    FadePageCover(true);
    var pInvoiceTableName = (pInvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices"); //the only different line
    if (IsMESCOCompany) {
        if (pInvoiceTableName == "tblInvoicesDRAFT") {
            $("#cbEditInvoiceIsStatement").parent().parent().removeClass("hide");
        } else {
            $("#cbEditInvoiceIsStatement").parent().parent().addClass("hide");
        }
    }
  
    //show printable ClientNotes for NewTrans
    if (pDefaults.UnEditableCompanyName == "NEW" || pDefaults.UnEditableCompanyName == "TRM")
        $("#txtEditInvoiceClientNotes").parent().removeClass("hide");

    ClearAll("#EditInvoiceModal");
    var tr = $("#" + pInvoiceTableName + " tr[ID='" + pID + "']");
    $("#hEditedInvoiceTypeCode").val($(tr).find("td.InvoiceTypeCode").text());
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

    if ($(tr).find("td.IsValidPortal").text() == 1 &&
       ( pDefaults.UnEditableCompanyName == "ELI" 
            || pDefaults.UnEditableCompanyName == "ELC")
    ){
        $("#EditInvoiceModal button").addClass('hide');
    }
    else {
        $("#EditInvoiceModal button").removeClass('hide');
    }

    if (pDefaults.UnEditableCompanyName == "UNS") {
        $("#txtUSDPerContainer").parent().removeClass("hide");
    }
        
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $("#slEditInvoiceAddressTypes").attr("data-required", "false");
    }
  
    jQuery("#EditInvoiceModal").modal("show");
    var pParametersWithValues = { pInvoiceIDToLoad: pID };
    CallGETFunctionWithParameters("/api/Invoices/LoadInvoiceHeaderWithDetails"
        , pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            var pInvoiceHeader = JSON.parse(pData[1]);
            var pInvoiceItems = pData[2];
            var pOperations = JSON.parse(pData[3]);
            var pOperationPartners = pData[4];
            var pAddress = pData[5];
            var pPaymentTerm = pData[6];
            var pTaxType = pData[7];
            //var pRoutingClearance = pData[8];
            //var pSOA = pData[9];
            var pUser = pData[10];

            CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
                , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
                , function (pData) {

                    Fill_SelectInputAfterLoadData(pData[0], 'ID', 'Name', '<-- Select Charge Type -->', '#slReceivableChargeType', '');
                    //FillListFromObject($(tr).find("td.Receivable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slReceivableChargeType", pData[0], null);
                    //FadePageCover(false);
                }
                , null);


            if (pInvoiceHeader.IsFleet)
                glbNumberOfInvoiceRoutings = pInvoiceHeader.NumberOfRoutings;
            else
                glbNumberOfInvoiceRoutings = 0;
            $("#lblEditedInvoiceShown").html(": " + pInvoiceHeader.ConcatenatedInvoiceNumber + " / " + (pInvoiceHeader.OperationCode == 0 ? pInvoiceHeader.MasterOperationCode : pInvoiceHeader.OperationCode));
            $("#hEditedInvoiceOperationID").val(pInvoiceHeader.OperationID);
            $("#hEditedInvoiceMasterOperationID").val(pInvoiceHeader.MasterOperationID);
            $("#hEditedInvoiceCurrencyID").val(pInvoiceHeader.CurrencyID);
            ////Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames, pCallback)
            //Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(pOperations, "ID", "MasterBL,HouseNumber", ' - ', null, "#slEditInvoiceOperations", pInvoiceHeader.OperationID, "ClientEmail", null);
            /***********************Fill InvoiceOperations****************************/
            var option = "";
            var pSlName = "slEditInvoiceOperations";
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
            $("#txtEditInvoiceClientNotes").val(pInvoiceHeader.Notes == 0 ? "" : pInvoiceHeader.Notes);
            $("#txtUSDPerContainer").val(pInvoiceHeader.USDPerContainer);

            if (IsMESCOCompany) {
                let x = pInvoiceHeader.USDPerContainer == 1 ? true : false;
                $("#cbEditInvoiceIsStatement").prop("checked", x);
                
            }
            if (pDefaults.UnEditableCompanyName == "AGR") {
                $("#slEditInvoicePaymentTerms2").val(pInvoiceHeader.USDPerContainer);
                $("#txtEditInvoiceDueDate2").val(ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.StorageFromDate)) == "01/01/1900" ? "" : ConvertDateFormat(GetDateWithFormatMDY(pInvoiceHeader.StorageFromDate)));
            }

            FadePageCover(false);


            //-----------************* Agroo --------
            setTimeout(function () {

            if (pDefaults.UnEditableCompanyName == "AGR") {
        

                ItemsRowsCounter = 0;

                $.each(JSON.parse(pInvoiceItems), function (i, item) {
                    debugger;

                    AppendRowtoTable("tblModalInvoiceItems",
                        ("<tr id='" + (ItemsRowsCounter + 1) + "' Class='Row-" + (ItemsRowsCounter + 1) + "'>"
                            //+ " <td class='btn-lightblue hide' style='font-size:15px;'> s </td>"
                            //  + "<td class='id hide'> <input name='delete' type='checkbox' value='" + item.id + "' /></td>"
                            // + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-deletedetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='deleteitems(" + (ItemsRowsCounter + 1) + "," + (item.id) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-undodeletedetails' type='button' onclick='undodeleteitems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                            //+ "<td class='containerid hide' val='" + item.containerid + "'>" + "<input tag='" + item.containerid + "'   type='text' class='input_containerid input-sm  col-sm'>" + "</td>"
                            + "<td class='No'>" + (ItemsRowsCounter + 1) + "</td>"
                       


                            + "<td  style='width: 50px; ' class='ChargeTypeID' val='" + item.ChargeTypeID + "'>" + "<select  style='width: 150px;' disabled onchange='' id='PackType-" + (ItemsRowsCounter + 1) + "' tag='" + item.ChargeTypeID + "' class='input-sm  col-sm selectChargeTypeID'>" + $('#slReceivableChargeType').html() + "</select>" + "</td>"



                            //      + "<td class='ChargeTypeID ' val='" + item.ChargeTypeID + "'>" + "<input disabled tag='" + item.ChargeTypeID + "'   type='text' class='input_ChargeTypeID input-sm  col-sm'>" + "</td>"
                            + "<td class='Quantity ' val='" + item.Quantity + "'>" + "<input disabled tag='" + item.Quantity + "'   type='text' class='input_Quantity input-sm  col-sm'>" + "</td>"
                            + "<td class='CostPrice ' val='" + item.CostPrice + "'>" + "<input disabled tag='" + item.CostPrice + "'   type='text' class='input_CostPrice input-sm  col-sm'>" + "</td>"
                            + "<td class='CostAmount ' val='" + item.CostAmount + "'>" + "<input disabled tag='" + item.CostAmount + "'   type='text' class='input_CostAmount input-sm  col-sm'>" + "</td>"
                            + "<td class='CurrencyCode ' val='" + item.CurrencyCode + "'>" + "<input disabled tag='" + item.CurrencyCode + "'   type='text' class='input_CurrencyCode input-sm  col-sm'>" + "</td>"
                            + "<td class='InvoiceNumber ' val='" + item.InvoiceNumber + ' / INVOICE ' + "'>" + "<input disabled tag='" + item.InvoiceNumber + ' / INVOICE ' + "'   type='text' class='input_InvoiceNumber input-sm  col-sm'>" + "</td>"
                            + "<td class='Order ' val='" + + "'>" + "<input disabled tag='" + + "'   type='text' class='input_Order input-sm  col-sm'>" + "</td>"
                            + "<td class='Notes ' val='" + item.Notes + "'>" + "<input disabled tag='" + item.Notes + "'   type='text' class='input_Notes input-sm  col-sm'>" + "</td>"


                            + "</tr>"));

                    //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
                    ItemsRowsCounter++;

                    //$('#tblPackingDetails > tbody > tr').find('td.Commodity').find('.selectCommodity').css({ "width": "100%" }).select2();
                    //$('#tblModalInvoiceItems > tbody > tr').find('td.Variety').find('.selectVariety ').css({ "width": "100%" }).select2();
                    //$('#tblPackingDetails > tbody > tr').find('td.Size').find('.selectSize ').css({ "width": "100%" }).select2();
                    //$("div[tabindex='-1']").removeAttr('tabindex');

                    ////$("#tblPackingDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');

                    //$("#tblPackingDetails").find("input,button,textarea").attr('onblur', 'CalculateAll (this);  SetSize(this);')

                });


                setTimeout(function () {
                    FillItemsDataAGRO();
                }, 300);


            }

            }, 300);


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
        LoadAll("/api/Invoices/LoadAll", " WHERE ID<>" + pID + " AND OperationID IN(" + pInvoiceOperationID + "," + pInvoiceMasterOperationID + ") AND InvoiceTypeCode<>N'SOA' AND InvoiceTypeCode<>N'DRAFT' AND IsDeleted = 0 "
            , function (pData) { FillListFromObject(pRelatedToInvoiceID, 1, TranslateString("SelectFromMenu"), "slEditInvoiceRelatedToInvoice", pData[0], null); });
    else
        $("#slEditInvoiceRelatedToInvoice").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");

    if ($("#cbIsTank").prop("checked")) { //(pOperationContainersAndPackagesID != "") {
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
    //else
    //    $(".classShowForTank").addClass("hide");

    Invoices_FillInvoiceItems(pID, null);//to fill the available invoice items
    $("#btnSaveEditInvoice").attr("onclick", "Invoices_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    //$("#btn-AddInvoiceItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddInvoiceItem").attr("onclick", "Invoices_GetAvailableItems(" + constTransactionInvoiceApproval + ");");





}



function FillItemsDataAGRO() {
    debugger;
    $($('#tblModalInvoiceItems > tbody > tr')).each(function (i, tr) {

        $(tr).find('td.ChargeTypeID').find('.selectChargeTypeID').val($(tr).find('td.ChargeTypeID').find('.selectChargeTypeID').attr('tag')).trigger("change");
        $(tr).find('td.Quantity').find('.input_Quantity').val($(tr).find('td.Quantity').find('.input_Quantity').attr('tag'));
        $(tr).find('td.CostPrice').find('.input_CostPrice').val($(tr).find('td.CostPrice').find('.input_CostPrice').attr('tag'));
        $(tr).find('td.CostAmount').find('.input_CostAmount').val($(tr).find('td.CostAmount').find('.input_CostAmount').attr('tag'));
        $(tr).find('td.CurrencyCode').find('.input_CurrencyCode').val($(tr).find('td.CurrencyCode').find('.input_CurrencyCode').attr('tag'));
        $(tr).find('td.InvoiceNumber').find('.input_InvoiceNumber').val($(tr).find('td.InvoiceNumber').find('.input_InvoiceNumber').attr('tag'));
        $(tr).find('td.Notes').find('.input_Notes').val($(tr).find('td.Notes').find('.input_Notes').attr('tag'));
    });
    //$("#tblPackingDetails").find(".selectMixedPallet").attr('onchange', 'AddinsertAfter(this);');
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}



//fill the already added items
function Invoices_FillInvoiceItems(pInvoiceID, callback) {
    debugger;
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
//show the available items(not added yet) //used by for AccNotes items too
function Invoices_GetAvailableItems(pAccNoteTypeOrInvoice) {
    debugger;
    jQuery('#CheckboxesListModal').modal('show');
    FadePageCover(true);
    var pControlPrefix = "";
    if (pAccNoteTypeOrInvoice == constTransactionInvoiceApproval) {
        pControlPrefix = "Invoice";
    }
    else {
        pControlPrefix = "AccNote";
    }
    if (pDefaults.UnEditableCompanyName == "UNF" && pControlPrefix == "Invoice" && $("#slEditInvoiceCurrency").val() != $("#hEditedInvoiceCurrencyID").val() && glbCallingControl == 'OperationsEdit') {
        jQuery('#CheckboxesListModal').modal('hide');
        FadePageCover(false);
        swal("Sorry", "Please Save First after changing currency");
        return;
    }
    $("#lblShownItems").html($("#lblEdited" + pControlPrefix + "Shown").html());
    var pStrFnName = "";
    if (pAccNoteTypeOrInvoice == constTransactionInvoiceApproval || pAccNoteTypeOrInvoice == constTransactionDebitNote)
        pStrFnName = "/api/Receivables/LoadAll";
    else //pAccNoteTypeOrInvoice == constTransactionCreditNote
        pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divCheckboxesList";
    $("#" + pDivName).html(""); //to quickly clear
    //var ptblModalName = "tblModalInvoiceCharges";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pWhereClause = "";
    //pWhereClause += " WHERE OperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " AND IsDeleted = 0 ";
    pWhereClause += " WHERE (OperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR OperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + ") AND IsDeleted = 0 ";
    pWhereClause += pAccNoteTypeOrInvoice == constTransactionCreditNote ? "" : " AND InvoiceID IS NULL "; //if payable then no InvoiceId
    ////Next line is commented to handle unapproved invoices created on Draft
    //pWhereClause += (pStrFnName == "/api/Receivables/LoadAll" ? " AND DraftInvoiceID IS NULL " : "")
    pWhereClause += " AND AccNoteID IS NULL ";
    if (pDefaults.UnEditableCompanyName == "UNF") {
        pWhereClause += (pStrFnName == "/api/Receivables/LoadAll" ? " AND DraftInvoiceID IS NULL " : "");
    }
    if (pDefaults.UnEditableCompanyName != "EEL") {
        if (pControlPrefix == "AccNote" && pAccNoteTypeOrInvoice == constTransactionCreditNote)
            pWhereClause += " AND IsApproved = 0 ";
    }
    pWhereClause += " AND CurrencyID = " + $("#slEdit" + pControlPrefix + "Currency").val();
    pWhereClause += " AND (ChargeTypeCode LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    if (pDefaults.UnEditableCompanyName == "USC" && $('#lblEditedInvoiceShown').text().toUpperCase().includes('OFFICIAL')) {
        pWhereClause += " AND IsOfficial=1";
    } else if (pDefaults.UnEditableCompanyName == "USC" && !$('#lblEditedInvoiceShown').text().toUpperCase().includes('OFFICIAL')) {
        pWhereClause += " AND IsOfficial=0";
    }
    //pWhereClause += " ORDER BY ChargeTypeCode ";

    if (IsMESCOCompany && pControlPrefix == "AccNote" && pAccNoteTypeOrInvoice == constTransactionCreditNote) {
        pWhereClause += " AND IsIncludedInPaymentRequest=0";
    } else if (IsMESCOCompany && pAccNoteTypeOrInvoice == constTransactionInvoiceApproval) {
        if ($('#lblEditedInvoiceShown').text().includes('STATMENT (INVOICE)')) {
            pWhereClause += " AND CategoryName NOT IN ('LCL FREIGHT FEES','CLIENT OFFICIAL RECEIPTS')";
        } else if ($('#lblEditedInvoiceShown').text().includes('OFFICIAL RECEIPT STATEMENT')) {
            pWhereClause += " AND CategoryName='CLIENT OFFICIAL RECEIPTS'";
        } else if ($('#lblEditedInvoiceShown').text().includes('مطالبة نولون')) {
            pWhereClause += " AND CategoryName='LCL FREIGHT FEES'";
        }
    }

    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            $("#btn-SearchItems").attr("onclick", "Invoices_GetAvailableItems(" + pAccNoteTypeOrInvoice + ");");
            $("#btnCheckboxesListApply").attr("onclick", pControlPrefix + "s_AddItems(false," + pAccNoteTypeOrInvoice + ");");
            FadePageCover(false);
        }
        , (pDefaults.UnEditableCompanyName == "GBL" ? 3 : 1)/*pCodeOrName*/);
}
function Invoices_DeleteList(callback, pInvoiceTypeCode) {
    var pInvoiceTableName = (pInvoiceTypeCode == "DRAFT" ? "tblInvoicesDRAFT" : "tblInvoices");
    var pInvoicesIDs = GetAllSelectedIDsAsString(pInvoiceTableName);
    if (pInvoicesIDs.split(',').length > 1)
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
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Invoices/Delete"
                , { pInvoicesIDs: pInvoicesIDs }
                , function () {
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    Invoices_LoadAll($("#hOperationID").val());
                }
                , null
                , true);
        });
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
////Set DueDate according to PaymentTerm days
function Invoices_SetDueDate(pCallingControl, pControlToBeSet, pSlPaymentTermControl) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "ELI")
        pCallingControl = "txtEditInvoiceCreationDate";
    if (isValidDate($("#" + pCallingControl).val().trim(), 1))
        $("#" + pControlToBeSet).val(
            Date.prototype.addDays(ConvertDateFormat($("#" + pCallingControl).val()), ($("#" + pSlPaymentTermControl + " option:selected").attr("Days") == undefined ? 0 : $("#" + pSlPaymentTermControl + " option:selected").attr("Days"))));
    //EnableDisable DueDate according to Cash or not
    if ($("#" + pSlPaymentTermControl + " option:selected").text().toUpperCase() == "CASH")
        $("#" + pControlToBeSet).attr("disabled", "disabled");
    else
        $("#" + pControlToBeSet).removeAttr("disabled");
}

debugger;
function Invoices_PartnerChanged(pSlName, pOperationPartnerSlName, pIssueDateControlName, pDueDateControlName, pPaymentTermControlName) {
    debugger;
    InvoiceAddressTypes_GetList(null, pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    //InvoiceAddressTypes_GetList($("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID') == 0 ? null : $("#" + pOperationPartnerSlName + " option:selected").attr('PartnerID'), pSlName, pOperationPartnerSlName, null);//the 3rd parameter is the sl name of the partner SlName
    var SelectedPartnerForUNF = $('#slInvoicePartner').find(':selected').attr('paymenttermid');
    if (pDefaults.UnEditableCompanyName == "UNF") {
        if (SelectedPartnerForUNF != '0' ) {
            $("#" + pPaymentTermControlName).val($("#" + pOperationPartnerSlName + " option:selected").attr("PaymentTermID")); //set the payment term
            Invoices_SetDueDate(pIssueDateControlName, pDueDateControlName, pPaymentTermControlName);

        }
        else {
            var optionWithValue6 = $('#slInvoicePaymentTerms').find("option[value='6']");
            optionWithValue6.prop('selected', true);
            $("#" + pPaymentTermControlName).trigger("change");
        }

    } else {
        $("#" + pPaymentTermControlName).val($("#" + pOperationPartnerSlName + " option:selected").attr("PaymentTermID")); //set the payment term
        Invoices_SetDueDate(pIssueDateControlName, pDueDateControlName, pPaymentTermControlName);
    }
    $("#slPortalInvoicePartner").val($("#slInvoicePartner").val());
}
function Invoices_PortalPartnerChanged() {
    debugger;
    if ($("#slInvoicePartner option[value!='']").length == 0 || $("#slInvoicePartner option[paymenttermid='6']:selected").length == 1 || $("#slInvoicePartner option[paymenttermid!='6']").length > 1) {
        InvoicePartners_GetList($("#slPortalInvoicePartner").val(), $("#hOperationID").val(), "slInvoicePartner", function () {
            $("#slInvoicePaymentTerms").val($("#slInvoicePartner option:selected").attr("PaymentTermID"));
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
function Invoices_CurrencyChanged(pIsInvoiceEdit) {
    $("#txt" + (pIsInvoiceEdit ? "Edit" : "") + "InvoiceMasterDataExchangeRate").val($("#sl" + (pIsInvoiceEdit ? "Edit" : "") + "InvoiceCurrency option:selected").attr("MasterDataExchangeRate"));
}
function Invoices_InvoiceOperationChanged(pSlName, pSuffix) {
    debugger;
    if (pSuffix == null || pSuffix == undefined)
        pSuffix = "";
    if (pDefaults.UnEditableCompanyName == "UNF") {
        InvoicePartners_GetList(null, $("#sl" + pSuffix + "InvoiceOperations").val(), "sl" + pSuffix + "InvoicePartner", function () {
            InvoiceAddressTypes_GetList(null, "sl" + pSuffix + "InvoiceAddressTypes", "sl" + pSuffix + "InvoicePartner", null);//the 3rd parameter is the sl name of the partner control
            let ConsigneeOptionVal2 = $("#slInvoicePartner option[partnertypeid='1']").filter(function () {
                return $(this).text().toUpperCase().includes("CONSIGNEE2");
            }).val();
            if (ConsigneeOptionVal2 == null || ConsigneeOptionVal2 == 0 || ConsigneeOptionVal2 == 0) {
             ConsigneeOptionVal2 = $("#slInvoicePartner option[partnertypeid='1']").val();

            }
        $('#slInvoicePartner').val(ConsigneeOptionVal2).trigger('change');
        });

    }
    else {
       InvoicePartners_GetList(null, $("#sl" + pSuffix + "InvoiceOperations").val(), "sl" + pSuffix + "InvoicePartner", function () {
        InvoiceAddressTypes_GetList(null, "sl" + pSuffix + "InvoiceAddressTypes", "sl" + pSuffix + "InvoicePartner", null);//the 3rd parameter is the sl name of the partner control
       });
        InvoicePaymentTerms_GetList(null, "sl" + pSuffix + "InvoicePaymentTerms");
        InvoicePartners_GetList(null, $("#sl" + pSuffix + "InvoiceOperations").val(), "sl" + pSuffix + "PortalInvoicePartner", function () { });

    }
   
}
//Check Dates
function Invoices_CheckDates(pIssueDateControlName, pDueDateControlName) {
    var isCorrectLogic = true;
    if (
           (!isValidDate($("#" + pIssueDateControlName).val().trim(), 1) && $("#" + pIssueDateControlName).val().trim() != "")
        || (!isValidDate($("#" + pDueDateControlName).val().trim(), 1) && $("#" + pDueDateControlName).val().trim() != "")
        )
        isCorrectLogic = false;
    else  //the 1st 2 conditions is coz incase of being empty the return value from ConvertDateFormat() fn is 1 and i dont need the condition
        // make sure that Issue is before Due
        if (ConvertDateFormat($("#" + pIssueDateControlName).val()) != 1 && ConvertDateFormat($("#" + pDueDateControlName).val()) != 1 && Date.prototype.compareDates(ConvertDateFormat($("#" + pIssueDateControlName).val()), ConvertDateFormat($("#" + pDueDateControlName).val())) < 0)
            isCorrectLogic = false;
    return isCorrectLogic;
}
function Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs) {
    var isSameCurrencyAndExchangeRate = true;
    var ArrayOfIDs = pSelectedReceivableItemsIDs.split(',');
    //i am sure i ve more than 1 item selected isa
    var NumberOfSelectRows = ArrayOfIDs.length;
    var FirstRowCurrencyID = $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[0]).val();

    for (i = 0; i < NumberOfSelectRows; i++) {
        if (FirstRowCurrencyID != $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i]).val()
            || $("#slReceivableCurrencyInvoiceEdit" + ArrayOfIDs[i] + " option:selected").attr("MasterDataExchangeRate") == 0)
            isSameCurrencyAndExchangeRate = false;
    }
    return isSameCurrencyAndExchangeRate;
}
function Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {
        if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
            isSameCurrency = false;
    });
    return isSameCurrency;
}
function Invoices_CheckSameVat(pTblName, pClassOfCurrencyTd) {
    debugger;
    var isSameCurrency = true;
    //get the currencyID of the first item checked and then compare it to currencies of other items
    var firstCurrencyIDChecked = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
    $('#' + pTblName + ' td').find('input[name="Delete"]:checked').each(function () {

        if ($("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val') != 0)
        {
            if (firstCurrencyIDChecked != $("#" + pTblName + " tr[id=" + $(this).attr('value') + "]").find("td." + pClassOfCurrencyTd).attr('val'))
                isSameCurrency = false;
        }
    });
    return isSameCurrency;
}
/////////////////////////////////////////GetLists//////////////////////////////////////////////////
function InvoiceOperations_GetList(pOperationID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhereClause = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID;
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadAll", null, pSlName, pWhereClause);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pOperationID, "/api/Operations/LoadWithParameters", null, pSlName, { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "HouseNumber" }
        , callback);
}
function InvoicePartners_GetList(pID, pInvoiceOperationID, pSlName, callback) {
    debugger;
    var pWhereClause = " WHERE OperationID = " + pInvoiceOperationID;
    //var pWhereClause = " WHERE (OperationID = " + pInvoiceOperationID + " OR MasterOperationID = " + pInvoiceOperationID + " ) \n";
    pWhereClause += " AND PartnerID IS NOT NULL ";
    if (IsMESCOCompany && pSlName == "slInvoicePartner") 
        pWhereClause += " AND PaymentTermID <> 6";
    if (pDefaults.UnEditableCompanyName == "LAT" || pDefaults.UnEditableCompanyName == "LATT") {
        pWhereClause += " AND (PartnerTypeID = " + constCustomerPartnerTypeID + " AND PartnerID IN (select ID from Customers where DebitorGroupID is not null))";
    } else {
        pWhereClause += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
        pWhereClause += (IsMESCOCompany ? "" : " OR PartnerTypeID = " + constAgentPartnerTypeID);
        pWhereClause += ") ";
    }
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
   
}


//the id is that of the Address not the address type
function InvoiceAddressTypes_GetList(pID, pSlName, pOperationPartnerSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;
    pWhereClause = "";
    pWhereClause = " Where (PartnerID = " + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerID"));
    pWhereClause += "  AND PartnerTypeID=" + ($("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID") == "" ? 0 : $("#" + pOperationPartnerSlName + " option:selected").attr("PartnerTypeID")) + ") ";
    if (pID != null)
        pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY AddressTypeID ";
    debugger;
    GetListAddressesWithMultipleAttr(pID, "/api/Addresses/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause
        , function () {
            if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined)
                $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
        });
}
function InvoiceCurrency_GetList(pID, pSlName, pControlPrefix) {
    if (pSlName != null && pSlName != undefined && pSlName != 0)
        $("#" + pSlName).val(pID);
    else
        $("#" + pSlName).val($("#hDefaultCurrencyID").val());
    $("#txt" + pControlPrefix + "MasterDataExchangeRate").val($("#" + pSlName + " option:selected").attr("MasterDataExchangeRate"));
}
function InvoiceTypes_GetList(pID, pSlName, pInvoiceTypeCode) {
    //parameters: ID, strFnName, First Row in select list, select list name
    var pWhere = " WHERE 1=1" + " AND IsNull(Code,'')<>N'CREDITMEMO' and IsNull(IsForTariff,0)=0 ";
    if (pDefaults.UnEditableCompanyName == "MES" || (pDefaults.UnEditableCompanyName == "UNF" && pSlName != "slInvoiceTypesUNF" ))
        pWhere += " And IsMainInvoice=1 ";
    else if (pDefaults.UnEditableCompanyName == "UNF" && pSlName == "slInvoiceTypesUNF")
        pWhere += " And IsMainInvoice=0 ";
    if (pDefaults.UnEditableCompanyName == "ELC") {
        pWhere += " And Code IN('INV','ST') ";
    }
        GetListWithNameAndWhereClause(pID, "/api/InvoiceTypes/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhere + " ORDER BY Name "
        , function () {
            if (pInvoiceTypeCode == "DRAFT")
                $("#" + pSlName).val($("#slInvoiceTypes option:contains(DRAFT)").val());
            else
                $("#" + pSlName + " option:contains('DRAFT')").addClass("hide");
            if (pDefaults.UnEditableCompanyName == "SAF")
                $("#slInvoiceTypes option:contains('IACCSEEDS')").addClass("hide"); // i wrote the name to prevent hiding for other calling fns
        });
}
function InvoicePaymentTerms_GetList(pID, pSlName, callback) {
    debugger;
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", TranslateString("SelectFromMenu"), pSlName, " WHERE 1=1 ORDER BY Code ", callback);
}
function InvoiceTransactionTypes_GetList(pID, pSlName, callback) {
    //parameters: ID, strFnName, First Row in select list, select list name
  //  GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", pSlName, " WHERE 1=1 ORDER BY Code ", callback);
    CallGETFunctionWithParameters("/api/Invoices/LoadAllTransactionTypes"
                , ''
                , function (data) {
                    FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, data[0], null);
                });

}
/////////////////////////////////////EOF GetLists////////////////////////////////////////////////////
////////////////////////////////////InvoiceEdit fns//////////////////////////////////////////////////
function Invoices_SetInvoiceAmount(pTblName, pControlPrefix, pClassOfAmountTd) {
    debugger;
    var decInvoiceAmount = 0;
    var decInvoiceTaxAmount = 0; var decInvoiceTaxPercentage = 0.0;
    var decInvoiceDiscountAmount = 0; var decInvoiceDiscountPercentage = 0.0;
    var decInvoiceFixedDiscount = 0.0;
    $("#" + pTblName + " td input[name='Delete']:checked").each(function () {
        var RowSaleAmount = $("#" + pTblName + " tr[ID=" + this.value + "] td." + pClassOfAmountTd).text();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decInvoiceAmount += parseFloat(RowSaleAmount);
        }
    });

    if ($("#txt" + pControlPrefix + "FixedDiscount").val() != undefined && $("#txt" + pControlPrefix + "FixedDiscount").val() != 0) {
        decInvoiceFixedDiscount = $("#txt" + pControlPrefix + "FixedDiscount").val();
        decInvoiceAmount -= decInvoiceFixedDiscount;
    }

    if ($("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceTaxPercentage = $("#sl" + pControlPrefix + "Tax option:selected").attr("CurrentPercentage");
        decInvoiceTaxAmount = (decInvoiceAmount * decInvoiceTaxPercentage / 100).toFixed(2);
    }
    if ($("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage") != undefined) {
        decInvoiceDiscountPercentage = $("#sl" + pControlPrefix + "Discount option:selected").attr("CurrentPercentage");
        decInvoiceDiscountAmount = (decInvoiceAmount * decInvoiceDiscountPercentage / 100).toFixed(2);
    }
    
    $("#txt" + pControlPrefix + "AmountWithoutVAT").val(decInvoiceAmount.toFixed(2)); //its w/o VAT before adding tax and discount
    decInvoiceAmount += decInvoiceTaxAmount - decInvoiceDiscountAmount;
    $("#txt" + pControlPrefix + "TaxAmount").val(decInvoiceTaxAmount);
    $("#txt" + pControlPrefix + "DiscountAmount").val(decInvoiceDiscountAmount);
    $("#txt" + pControlPrefix + "TaxPercentage").val(decInvoiceTaxPercentage);
    $("#txt" + pControlPrefix + "DiscountPercentage").val(decInvoiceDiscountPercentage);
    $("#txt" + pControlPrefix + "Amount").val(decInvoiceAmount.toFixed(2));
}
//function InvoiceEdit_Row_CalculateReceivablesAmount(pRowID) {
//    var rowQuantity = $("#txtTblModalReceivableQuantityInvoiceEdit" + pRowID).val();
//    var rowSalePrice = $("#txtTblModalReceivableSalePriceInvoiceEdit" + pRowID).val();
//    $("#txtTblModalReceivableSaleAmountInvoiceEdit" + pRowID).val(rowQuantity * rowSalePrice);
//    Invoices_ChangeAmountInInvoiceEdit(false); //the flag is true if called from RemoveInvoiceItems
//}
function InvoiceEdit_Row_CalculateReceivablesAmount(pRowID) {
    debugger;
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
    $("#txtTblModalReceivableSaleAmountInvoiceEdit" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2));

    Invoices_ChangeAmountInInvoiceEdit(false); //the flag is true if called from RemoveInvoiceItems
}
//if pIsRemoveItems then pIDs will be the NOT selected items coz the selected ones will be removed
//pIsCheck: if true then don't update the amount coz i am just checking
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
//function Invoices_Print(pID, pReportTypeID) {
//    var pWhereClause = "";
//    pWhereClause += " WHERE ID = " + pID;
//    var pParametersWithValues = { "pWhereClause": pWhereClause, "pID": pID, "pInvoiceReportTypeID": pReportTypeID } //3:pdf , 4:rft
//    CallGETFunctionWithParameters("/api/Reports/Report_Invoice"
//            , pParametersWithValues
//            , function (data) {
//                if (data[0] == false)
//                    swal(strSorry, strNoRecords);
//                else
//                    SaveFile(data[1]);
//            });
//}
function Invoices_PrintOptions() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "CAR") {
        $("#cbArabicInvoice").parent().removeClass("hide");
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
    if (pDefaults.UnEditableCompanyName == "FWD") {
        $(".classShowForFastFWD").removeClass("hide");
    }

    if (pDefaults.UnEditableCompanyName == "SUS") {
        $("#cbTotalInLocalCurrency").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "UNS") {
        $("#cbPrintUSDToLocal").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "ITL") {
        $(".classShowForITL").removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "BRS") {
        $("#cbAddNotesToItems").prop('checked', true);
    }


    if (pDefaults.UnEditableCompanyName == "LIN") {

        $('#CBMVolume').parent().removeClass('hide');
        //$('#CBMVolume').siblings('.label-text').text('NOTIFY');
        $("#CBMVolume").parent().contents().last()[0].textContent = " Notify";

    }
    //if (pDefaults.UnEditableCompanyName == "FLA") {
    //    $("#cbPrintBankDetailsFromTemplate").prop("checked", true);
    //    $("#slBankTemplate").removeClass("hide");
    //    $("#slBankTemplate").val(3);
    //}
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
    $("#btnCheckboxesListApply").attr("onclick", "Invoices_Print(" + pID + ",3," + "'Email'" + "," + "'" + _Copy + "'" + ");");
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





function Invoices_DrawOrSend(pOption, ReportHTML, pClientHeader) {
    debugger;
    //ReportHTML_Multi += ReportHTML;
    //ReportHTML_Multi += ' <div class="break"></div>';
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




function Invoices_PrintBankDetailsOptionChanged() {
    debugger;
    if ($("#cbPrintBankDetailsFromTemplate").prop("checked"))
        $("#slBankTemplate").removeClass("hide");
    else
        $("#slBankTemplate").addClass("hide");
}
/********************************AccNotes(Credit/Debit)*******************************************/

function AccNotes_SubmenuTabClicked() {
    debugger;
    if ($("#tblAccNotes tbody tr").length == 0)
        AccNotes_LoadAll($("#hOperationID").val());
}
function AccNotes_BindTableRows(pAccNotes) {
    debugger;
    ClearAllTableRows("tblAccNotes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pAccNotes, function (i, item) {
        AppendRowtoTable("tblAccNotes",
        ("<tr ID='" + item.ID + "' " + ((OENot && $("#hIsOperationDisabled").val() == false /*&& item.NoteStatus == "UnPaid"*/ && !item.IsApproved) ? ("ondblclick='AccNotes_EditByDblClick(" + item.ID + ");'") : " class='static-text-primary' ") + ">"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='AccNoteID'> <input" + (/*item.NoteStatus == "UnPaid" &&*/ !item.IsApproved ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AccNoteCodeSerial hide'>" + item.CodeSerial + "</td>"
                    + "<td class='AccNoteCode'>" + item.Code + "</td>"
                    + "<td class='AccNoteType hide'>" + item.NoteType + "</td>"
                    + "<td class='AccNoteTypeName hide'>" + item.NoteTypeName + "</td>"

                    + "<td class='AccNotePartner' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
                    + "<td class='AccNotePartnerTypeCode hide'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"

                    + "<td class='AccNoteTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='AccNoteTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                    + "<td class='AccNoteTaxAmount hide'>" + item.TaxAmount + "</td>"
                    + "<td class='AccNoteDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='AccNoteDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                    + "<td class='AccNoteDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='AccNoteAmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
                    + "<td class='AccNoteAmount'>" + item.Amount + "</td>"
                    + "<td class='AccNoteCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='AccNoteMasterDataExchangeRate hide'>" + item.MasterDataExchangeRate + "</td>"
                    + "<td class='AccNoteDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.NoteDate)) + "</td>"

                    + "<td class='AccNoteAddressID hide' val='" + item.AddressID + "'></td>"
                    + "<td class='AccNoteOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='AccNoteMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                    + "<td class='AccNoteOperationCode hide'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='AccNoteHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                    + "<td class='AccNoteStatus hide " + (item.NoteStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.NoteStatus + "</td>"

                    + "<td class='AccNoteInvoiceID hide'>" + item.InvoiceID + "</td>"
                    + "<td class='AccNoteConcatenatedInvoiceNumber'>" + (item.InvoiceID == 0 ? "N/A" : item.ConcatenatedInvoiceNumber) + "</td>"

                    + "<td class='AccNoteRemarks hide'>" + (item.Remarks == 0 ? "" : item.Remarks) + "</td>"
                    + "<td class='AccNotePartnerVatNumber hide'>" + (item.PartnerVATNumber == 0 ? "" : item.PartnerVATNumber) + "</td>"

                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='hide'><a onclick='AccNotes_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    //+ ($("#hIsOperationDisabled").val() == false
                    //    ? "<td class=''><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    //    : "<td></td>")
                    + "<td class=''><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    //ApplyPermissions();
    $("#cbPrintBankDetailsForNewAccNote").prop("checked", true);
    if (OANot && $("#hIsOperationDisabled").val() == false) { $("#btn-NewDebitNote").removeClass("hide"); $("#btn-NewCreditNote").removeClass("hide"); } else { $("#btn-NewDebitNote").addClass("hide"); $("#btn-NewCreditNote").addClass("hide"); }
    if (ODNot && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteAccNote").removeClass("hide"); else $("#btn-DeleteAccNote").addClass("hide");
    BindAllCheckboxonTable("tblAccNotes", "AccNoteID", "cb-CheckAll-AccNotes");
    CheckAllCheckbox("HeaderDeleteAccNoteID");
    HighlightText("#tblAccNotes>tbody>tr", $("#txt-Search").val().trim());
    //************************************************************** */
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {
        $("#btn-DeleteAccNote").addClass("hide");
    }
    //************************************************************* */
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function AccNotes_LoadAll(pOperationID) {
    var pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") " + " AND IsDeleted = 0 ";
    debugger;
    LoadAll("/api/AccNote/LoadAll", pWhereClause, function (pTabelRows) { AccNotes_BindTableRows(JSON.parse(pTabelRows)); /*DocsOut_ClearAllControls();*/ });
    //LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/AccNotes/LoadWithWhereClause", " where OperationID = " + pOperationID, 0, 1000, function (pTabelRows) { Receivables_BindTableRows(pTabelRows); });
}
function AccNotes_ClearAllControls(pDebitOrCredit) {
    debugger;
    var pTblName = ""; var pClassOfCurrencyTd = ""; var pClassOfAmountTd = "";
    if (pDebitOrCredit == constTransactionDebitNote) { //i.e. pDebitOrCredit=90
        pTblName = "tblReceivables";
        pClassOfCurrencyTd = "ReceivableCurrency";
        pClassOfAmountTd = "ReceivableSaleAmount";
    }
    else if (pDebitOrCredit == constTransactionCreditNote) { //i.e. pDebitOrCredit=100
        pTblName = "tblPayables";
        pClassOfCurrencyTd = "PayableCurrency";
        pClassOfAmountTd = IsMESCOCompany ? "PayableQuotationCost" : "PayableCostAmount";
    }
    $("#slAccNoteTax").attr("onchange", 'Invoices_SetInvoiceAmount(' + '"' + pTblName + '","AccNote","' + pClassOfAmountTd + '");');
    $("#slAccNoteDiscount").attr("onchange", 'Invoices_SetInvoiceAmount(' + '"' + pTblName + '","AccNote","' + pClassOfAmountTd + '");');
    ClearAll("#AccNoteModal");

    if (pDefaults.UnEditableCompanyName == "LATT") {
        if (pDebitOrCredit == constTransactionCreditNote) {
            $('#cbIsTaxCN').parent().parent().removeClass('hide');
        } else {
            $('#cbIsTaxCN').parent().parent().addClass('hide');
        }
    }

    if (IsMESCOCompany && pDebitOrCredit == constTransactionCreditNote) {
        let isInPR = false;
        $('#tblPayables td').find('input[name="Delete"]:checked').each(function () {
            if ($("#tblPayables tr[id=" + $(this).attr('value') + "]").find("td.IsInPR input").prop('checked')) {
                isInPR = true;
            }
        });
        if (isInPR) {
            swal("Sorry","Some Payables are Included IN PR");
            return;
        }
    }

    if (GetAllSelectedIDsAsString(pTblName) != "")
        if (Invoices_CheckSameCurrency(pTblName, pClassOfCurrencyTd)) {

            // Check if it is approved from C#
            
            CallGETFunctionWithParameters("/api/Payables/CheckIfApprovedOrNot", {
                pIDs: GetAllSelectedIDsAsString(pTblName)
                //, IsPayNotRec: pDebitOrCredit == constTransactionCreditNote
            }
                , function (pData) {
                    debugger;
                    var AllIsUnApproved = pData[0];
                    if (AllIsUnApproved || pDebitOrCredit == constTransactionDebitNote) {   // this check is on Payables Only
                        debugger;
                        jQuery("#AccNoteModal").modal("show");
                        $("#slAccNoteType").val(pDebitOrCredit);

                        let invWhereClause = "WHERE OperationID=" + $("#hOperationID").val();
                        if (IsMESCOCompany && pDebitOrCredit == constTransactionCreditNote) {
                            invWhereClause += ` AND InvoiceStatus='UnPaid' AND InvoiceTypeCode<>'DRAFT'`;
                        }

                        GetListWithCodeAndOperationPartnerIDAttr(null, "/api/Invoices/LoadAll", "Select Invoice", "slAccNoteInvoice", invWhereClause, null);
                        InvoiceOperations_GetList($("#hOperationID").val(), "slAccNoteOperations");
                        AccNotePartners_GetList(null, $("#hOperationID").val(), "slAccNotePartner", null);
                        Invoices_SetInvoiceAmount(pTblName, "AccNote", pClassOfAmountTd);
                        InvoiceAddressTypes_GetList(null, "slAccNoteAddressTypes", "slAccNotePartner", null);//the 3rd parameter is the sl name of the partner control
                        //get the invoice currency from the 1st item (i checked they have the same currency)
                        var pAccNoteCurrencyID = $('#' + pTblName).find('input[name="Delete"]:checked:first').parent().parent().find("td." + pClassOfCurrencyTd).attr('val');
                        InvoiceCurrency_GetList(pAccNoteCurrencyID, "slAccNoteCurrency", "AccNote");
                        //InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms");
                        GetListTaxTypeWithNameAndPercAttr(null, "/api/TaxeTypes/LoadAllWithWhereClause"
                            , TranslateString("SelectFromMenu"), "slAccNoteTax", "WHERE IsInactive=0 ORDER BY Name"
                            , function () {
                                $("#slAccNoteDiscount").html($("#slAccNoteTax").html());
                                $("#slAccNoteTax option[IsDiscount='true']").addClass('hide');
                                $("#slAccNoteDiscount option[IsDiscount='false']").addClass('hide');
                            });
                        $("#txtAccNoteDate").val(ConvertDateFormat(FormattedTodaysDate));
                    } else {
                        swal(strSorry, "Some Payables are Approved. Please Refresh the Operation");
                    }

                });

            
        }
        else //there are different currencies
            swal(strSorry, "The items must be of the same currency.");
    else { //no items are selected
        //jQuery("#InvoiceModal").modal("hide");
        swal(strSorry, "Please, Select at least one item.");
    }
}
function AccNotes_Insert(pSaveandAddNew) {
    debugger;
    let comp = ["LATT", "LAT"];
    if ((IsMESCOCompany || comp.includes(pDefaults.UnEditableCompanyName)) && $("#slAccNoteType").val() == constTransactionCreditNote && !CheckValueIsValidInput('#slAccNoteInvoice')) {
        swal('Sorry', 'You must choose invoice to create credit note');
        return;
    }
    FadePageCover(true);
    var pParametersWithValues = {
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slAccNoteCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtAccNoteDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
            + " AND '" + GetDateWithFormatyyyyMMdd($("#txtAccNoteDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
            + " ORDER BY CODE"
            )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pData) {
            if (pData[0] == "[]") {
                $("#txtAccNoteMasterDataExchangeRate").val(0);
                swal("Sorry", "Exchange rate is not set for " + $("#slAccNoteCurrency option:selected").text() + " in the Master Data.");
                FadePageCover(false);
            }
            else {
                $("#txtAccNoteMasterDataExchangeRate").val(JSON.parse(pData[0])[0].ExchangeRate);
                if ($("#txtAccNoteAmount").val() == 0) {
                    FadePageCover(false);
                    swal(strSorry, "The total amount can't be 0.");
                }
                else {
                    var pSelectedItemsIDs = $("#slAccNoteType").val() == constTransactionDebitNote ? GetAllSelectedIDsAsString('tblReceivables') : GetAllSelectedIDsAsString('tblPayables');
                    var data = {
                        "pSelectedItemsIDs": pSelectedItemsIDs
                        , "pNoteType": $("#slAccNoteType").val()
                        , "pNoteDate": ($("#txtAccNoteDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtAccNoteDate").val().trim()))

                        , "pOperationID": $("#slAccNoteOperations").val()
                        , "pOperationPartnerID": $("#slAccNotePartner").val() //in table OperationPartners
                        , "pInvoiceID": $("#slAccNoteInvoice").val() == "" ? 0 : $("#slAccNoteInvoice").val()
                        , "pAddressID": $("#slAccNoteAddressTypes").val() == "" ? 0 : $("#slAccNoteAddressTypes").val()
                        , "pPrintedAddress": "0"

                        , "pCurrencyID": $("#slAccNoteCurrency").val()
                        , "pExchangeRate": ($("#txtAccNoteMasterDataExchangeRate").val() == "" ? 1 : $("#txtAccNoteMasterDataExchangeRate").val())

                        , "pAmountWithoutVAT": $("#txtAccNoteAmountWithoutVAT").val() == "" ? 0 : $("#txtAccNoteAmountWithoutVAT").val()
                        , "pTaxTypeID": $("#slAccNoteTax").val() == "" ? 0 : $("#slAccNoteTax").val()
                        , "pTaxPercentage": $("#txtAccNoteTaxPercentage").val() == "" ? 0 : $("#txtAccNoteTaxPercentage").val()
                        , "pTaxAmount": $("#txtAccNoteTaxAmount").val() == "" ? 0 : parseFloat($("#txtAccNoteTaxAmount").val()).toFixed(2)
                        , "pDiscountTypeID": $("#slAccNoteDiscount").val() == "" ? 0 : $("#slAccNoteDiscount").val()
                        , "pDiscountPercentage": $("#txtAccNoteDiscountPercentage").val() == "" ? 0 : $("#txtAccNoteDiscountPercentage").val()
                        , "pDiscountAmount": $("#txtAccNoteDiscountAmount").val() == "" ? 0 : $("#txtAccNoteDiscountAmount").val()

                        , "pAmount": $("#txtAccNoteAmount").val() == "" ? 0 : parseFloat($("#txtAccNoteAmount").val()).toFixed(2)
                        , "pNoteStatusID": 1
                        , "pRemarks": ($("#txtAccNoteRemarks").val().trim() == "" ? "0" : $("#txtAccNoteRemarks").val().trim().toUpperCase())
                    }
                    if (IsMESCOCompany && $("#slAccNoteType").val() == constTransactionCreditNote) {
                        var payablesIDs = GetAllSelectedIDsAsString('tblPayables');
                        var InvoiceID = $("#slAccNoteInvoice").val() == "" ? 0 : $("#slAccNoteInvoice").val();
                        let hasError = false;
                        let errorMessage = "";
                        if (InvoiceID != 0 && InvoiceID != "" && InvoiceID != null && InvoiceID != undefined) {
                            CallGETFunctionWithParameters("api/AccNote/CheckPayablesBeforeCreatingCreditNote", {
                                pInvoiceID: InvoiceID,
                                pPayablesIDs: payablesIDs
                            }, function (pData) {
                                if (pData[0] == true) {
                                    hasError = true;
                                    errorMessage = pData[1];
                                }
                            }, null, false);
                        }
                        if (hasError) {
                            swal("Sorry", errorMessage);
                            FadePageCover(false);
                            return;
                        }
                    }
                    if (pDefaults.UnEditableCompanyName == "LATT") {
                        data.pPartnerVatNumber = CheckValueIsValidInput('#txtAccNotePartnerVATNumber') ? $('#txtAccNotePartnerVATNumber').val() : "0";
                        data.pIsTaxTypeNote = $("#cbIsTaxCN").prop("checked");
                    }
                    InsertUpdateFunction("form", "/api/AccNote/Insert", data, pSaveandAddNew, "AccNoteModal"
                        , function (data) {
                            if ($("#slAccNoteType").val() == constTransactionDebitNote)
                                Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            else
                                Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                            AccNotes_LoadAll($("#hOperationID").val());
                            if (data[0]) {
                                if (pDefaults.UnEditableCompanyName != 'CHM' && pDefaults.UnEditableCompanyName != 'CSL')
                                    AccNotes_Print(data[1], $("#slAccNoteType").val(), 3/*$("#slAccNoteReportTypes").val()*/);
                            }
                            else
                                swal("Sorry", "Connection Failure, please refresh then try again.");
                        });
                }
            } //of else exchange rate is ok
        } //of callback function in CallGetFunctionWithParameters
        , null);
}
function AccNotes_EditByDblClick(pID) {
    jQuery("#EditAccNoteModal").modal("show");
    AccNotes_FillControls(pID);
}
function AccNotes_FillControls(pID) {
    debugger;
    ClearAll("#EditAccNoteModal");

    $("#hEditedAccNoteID").val(pID);
    var tr = $("#tblAccNotes tr[ID='" + pID + "']");

    $("#lblEditedAccNoteShown").html(": " + $(tr).find("td.AccNoteCode").text() + " / " + $(tr).find("td.AccNoteOperationCode").text());
    $("#hEditedAccNoteTypeID").val($(tr).find("td.AccNoteType").text());

    var pAccNoteOperationID = $(tr).find("td.AccNoteOperationID").text();
    $("#hEditedAccNoteOperationID").val(pAccNoteOperationID);
    $("#hEditedAccNoteMasterOperationID").val($(tr).find("td.AccNoteMasterOperationID").text());
    var pAccNoteType = $(tr).find("td.AccNoteType").text(); //Credit:90, Debit:100
    var pOperationPartnerID = $(tr).find("td.AccNotePartner").attr('val');
    var pAddressID = $(tr).find("td.AccNoteAddressID").attr('val');
    var pAccNoteInvoiceID = $(tr).find("td.AccNoteInvoiceID").text();
    var pAccNoteCurrencyID = $(tr).find("td.AccNoteCurrency").attr('val');

    var pAccNoteTaxTypeID = $(tr).find("td.AccNoteTaxTypeID").attr('val');
    var pAccNoteDiscountTypeID = $(tr).find("td.AccNoteDiscountTypeID").attr('val');

    InvoiceCurrency_GetList(pAccNoteCurrencyID, "slEditAccNoteCurrency", "AccNote");
    GetListTaxTypeWithNameAndPercAttr(pAccNoteTaxTypeID, "/api/TaxeTypes/LoadAllWithWhereClause"
                , TranslateString("SelectFromMenu"), "slEditAccNoteTax", "WHERE IsInactive=0 ORDER BY Name"
                , function () {
                    $("#slEditAccNoteDiscount").html($("#slEditAccNoteTax").html());
                    $("#slEditAccNoteDiscount").val(pAccNoteDiscountTypeID == 0 ? "" : pAccNoteDiscountTypeID);
                    $("#slEditAccNoteTax option[IsDiscount='true']").addClass('hide');
                    $("#slEditAccNoteDiscount option[IsDiscount='false']").addClass('hide');
                });
    GetListWithCodeAndOperationPartnerIDAttr(pAccNoteInvoiceID, "/api/Invoices/LoadAll", "Select Invoice", "slEditAccNoteInvoice", "WHERE OperationID=" + pAccNoteOperationID
        , function () {
            if (pAccNoteInvoiceID != 0)
                $("#slEditAccNotePartner").attr("disabled", "disabled");
            else
                $("#slEditAccNotePartner").removeAttr("disabled");
        });
    AccNotePartners_GetList(pOperationPartnerID, pAccNoteOperationID, "slEditAccNotePartner"
        , function () {
            InvoiceAddressTypes_GetList(pAddressID, "slEditAccNoteAddressTypes", "slEditAccNotePartner", null);//4th parameter is the name of the sl of the partner
        });

    $("#txtEditAccNoteTaxPercentage").val($(tr).find("td.AccNoteTaxPercentage").text());
    $("#txtEditAccNoteTaxAmount").val($(tr).find("td.AccNoteTaxAmount").text());
    $("#txtEditAccNoteDiscountPercentage").val($(tr).find("td.AccNoteDiscountPercentage").text());
    $("#txtEditAccNoteDiscountAmount").val($(tr).find("td.AccNoteDiscountAmount").text());

    $("#txtEditAccNoteDate").val($(tr).find("td.AccNoteDate").text());
    $("#txtEditAccNoteAmountWithoutVAT").val($(tr).find("td.AccNoteAmountWithoutVAT").text());
    $("#txtEditAccNoteAmount").val($(tr).find("td.AccNoteAmount").text());
    $("#txtEditAccNoteMasterDataExchangeRate").val($(tr).find("td.AccNoteMasterDataExchangeRate").text());
    $("#txtEditAccNoteRemarks").val($(tr).find("td.AccNoteRemarks").text());
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#txtEditAccNotePartnerVatNumber").val($(tr).find("td.AccNotePartnerVatNumber").text());
    }

    AccNotes_FillAccNoteItems(pID, pAccNoteType);//to fill the available AccNote items
    $("#btnSaveEditAccNote").attr("onclick", "AccNotes_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    $("#btn-AddAccNoteItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddAccNoteItem").attr("onclick", "Invoices_GetAvailableItems(" + pAccNoteType + ");");
}
function AccNotes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblAccNotes') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Do it!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            DeleteListFunction("/api/AccNote/Delete"
                , { "pAccNotesIDs": GetAllSelectedIDsAsString('tblAccNotes') }
                , function () {
                    Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    AccNotes_LoadAll($("#hOperationID").val());
                });
        });
    //DeleteListFunction("/api/AccNotes/Delete", { "pAccNotesIDs": GetAllSelectedIDsAsString('tblAccNotes') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function AccNotePartners_GetList(pID, pAccNoteOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pAccNoteOperationID;
    if (pDefaults.UnEditableCompanyName == "LATT" && $("#slAccNoteType").val() == constTransactionDebitNote) {
        pWhereClause += " AND PartnerTypeID<>1 ";
    }
    pWhereClause += " AND PartnerID IS NOT NULL ";
    pWhereClause += " OR ID = " + pID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause
        , function () {
            //if ((pID == null || pID == undefined) && $("#" + pSlName + " :nth-of-type(2)").val() != undefined) {
            //    $("#" + pSlName).val($("#" + pSlName + " :nth-of-type(2)").val());//to select the 1st item
            if (callback != null && callback != undefined)
                callback();
            //}
        });
}
function AccNotes_AccNoteOperationChanged(pSlName) {
    debugger;
    $("#slAccNotePartner").removeAttr("disabled");
    AccNotePartners_GetList(null, $("#slAccNoteOperations").val(), "slAccNotePartner", function () {
        InvoiceAddressTypes_GetList(null, "slAccNoteAddressTypes", "slAccNotePartner", null);//the 3rd parameter is the sl name of the partner control
    });
    GetListWithCodeAndOperationPartnerIDAttr(null, "/api/Invoices/LoadAll", "Select Invoice", "slAccNoteInvoice", "WHERE OperationID=" + $("#slAccNoteOperations").val(), null);
    //InvoicePaymentTerms_GetList(null, "slInvoicePaymentTerms");
}
function AccNote_FillAgentPayables(pSlAccNotePartnerControlName, pSLAccNotePayableControlName) {
    debugger;

}
function AccNotes_InvoiceChanged(pControlEditPrefix) { //pControlEditPrefix="" or pControlEditPrefix="Edit"
    debugger;
    if ($("#sl" + pControlEditPrefix + "AccNoteInvoice").val() == "") {
        $("#sl" + pControlEditPrefix + "AccNotePartner").removeAttr("disabled");
    }
    else {
        $("#sl" + pControlEditPrefix + "AccNotePartner").attr("disabled", "disabled");
        $("#sl" + pControlEditPrefix + "AccNotePartner").val($("#sl" + pControlEditPrefix + "AccNoteInvoice option:selected").attr("OperationPartnerID"));
        InvoiceAddressTypes_GetList(null, "sl" + pControlEditPrefix + "AccNoteAddressTypes", "sl" + pControlEditPrefix + "AccNotePartner", null);//the 3rd parameter is the sl name of the partner SlName
    }
}

function AccNotes_GenerateDebitNote_ForPayables() {
    if (GetAllSelectedIDsAsString('tblPayables') != "" && [4, 276, 256].includes(pLoggedUser.ID) )
        swal({
            title: "Are you sure?",
            text: "The selected records will be Generate DebitNote",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes!",
            closeOnConfirm: false
        },
            //callback function in case of confirm delete
            function () {
            
                var pParametersWithValues = {
                   
                    pPayableIDs: GetAllSelectedIDsAsString('tblPayables'),
                    pOperationID: $("#hOperationID").val() == "" ? 0 : $("#hOperationID").val(),
                };
                CallGETFunctionWithParameters("/api/AccNote/GenerateDebitNote_ForPayables"
                    , pParametersWithValues
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        if (_ReturnedMessage == "") {
                            swal("Success", "Created successfully.");
                            FadePageCover(false);
                        }
                        else {

                            var word = "Transaction";
                            var index = _ReturnedMessage.indexOf(word);
                            if (index !== -1)
                                _ReturnedMessage = _ReturnedMessage.substring(0, index + word.length - 12);

                            swal("Sorry", _ReturnedMessage);
                            FadePageCover(false);
                        }
                    }
                    , null);
            });
}

function AccNotes_Print(pID, pAccNoteType, pReportTypeID) {
    debugger;
    var pWhereClause = "";
    pWhereClause += " WHERE ID = " + pID;
    var pParametersWithValues = {
        "pWhereClause": pWhereClause
        , "pAccNoteID": pID
        , "pAccNoteType": pAccNoteType
        , "pAccNoteReportTypeID": pReportTypeID
        , "pBankTemplateID": (!$("#cbPrintBankDetailsFromTemplate").prop("checked") ? 0 : $("#slBankTemplate").val())
    } //3:pdf , 4:rft
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Reports/Report_AccNote"
            , pParametersWithValues
        , function (data) {
            debugger;
                var pRecordsExist = data[0];
                //data[1] : strExportedFileName
                //data[2] : objCvwReceivables.lstCVarvwReceivables
                var pContainerTypes = data[3];
                var pHouseNumber = data[4];
                var pMasterOperationCode = data[5];
                var pTaxNumber = (data[6] == 0 ? "" : data[6]);
                var pAccNoteDate = data[7];//pAccNoteDate.ToShortDateString()
                var pAccNoteCode = data[8];
                var pAccountName = data[9];
                var pBankName = data[10];
                var pBankAddress = data[11];
                var pSwiftCode = data[12];
                var pAccountNumber = data[13];
                var pMasterBL = data[14];
                var pPackageTypes = data[15];
                var pCustomerReference = data[16];
                var MissingMandatoryFields = data[17];
                var pAccNoteRemarks = data[18];
                var pPOLName = data[19];
                var pPODName = data[20];
                var pHouseBLs = data[21];//used incase the AccNote is created for the master operation and holds all the HBL Nos on that operation
                var pTaxTypeName = data[22];
                var pTaxAmount = data[23];
                var pDiscountTypeName = data[24];
                var pDiscountAmount = data[25];
                var pAddressLine1 = data[26];
                var pAddressLine2 = data[27];
                var pAddressLine3 = data[28];
                var pPhones = data[29];
                var pFaxes = data[30];
                var pCBM = data[31];
                var pGrossWeightSum = data[32];
                var pClientStreetLine1 = data[33];
                var pClientStreetLine2 = data[34];
                var pClientCountryName = data[35];
                var pClientCityName = data[36];
                var pShipmentTypeCode = data[37];
                var pIncotermName = data[38];
                var pShipperName = data[39];
                var pConsigneeName = data[40];
                var pInvoiceNumber = data[41];
                var pOperationHeader = JSON.parse(data[42]);
                var pAccNoteHeader = JSON.parse(data[43]);
                var pETA = data[44];
                var pDeliveryOrderNumber = data[45];
            var pBankDetailsTemplate = data[46];
            var pPartnerVatNum = data[47];
            var pHouseNumnerUNI = data[48];


                //var trMainRoute = $("#tblRoutings tbody tr td[val=30]").parent();
                //$("#tblRoutings tbody tr td[val=30]").parent().find("td.Vessel").text();

                if (1 != 1) //(pRecordsExist == false)
                    swal(strSorry, MissingMandatoryFields);
                else if (pDefaults.UnEditableCompanyName == "BAL" || pDefaults.UnEditableCompanyName == "BME") {
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Note</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    if (!$("#cbPrintHeaderInvoice").prop("checked")) //if KML,EEL the print on original paper
                        ReportHTML += '             <br><br><br><br><br>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + pAccNoteDate.substr(3, 2) + '/' + pAccNoteDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + (pAccNoteType == constTransactionDebitNote ? "DN " : "CN ") + pAccNoteCode.split('-')[1] + '/20' + pAccNoteCode.substr(1, 2) + '</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-6 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Partner: </b>' + $("#tblAccNotes #" + pID + " td.AccNotePartner").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Note Date: </b>' + (pAccNoteDate == "01/01/1900" || pAccNoteDate == "1/1/1900" ? "N/A" : pAccNoteDate) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblAccNotes #" + pID + " td.AccNoteOperationCode").text() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>MBL</b>' + $("#lblMaster").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>BL: </b>' + pMasterBL + '</div>';
                    if (pHouseBLs != "0")//Master Operation so show all houses on it
                        ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    else
                        if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>Routing</b>' + $("#lblRouting").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //if (pContainerTypes != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    //else
                    //    if (pPackageTypes != 0)
                    //        ReportHTML += '     <div class="col-xs-6"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    if (pInvoiceNumber != 0)
                        ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + pInvoiceNumber + '</div>';
                    if (pDefaults.UnEditableCompanyName == "BME") {
                        ReportHTML += '             <div class="col-xs-6"><b>Shipper: </b>' + pShipperName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + pConsigneeName + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Customer Ref: </b>' + (pOperationHeader.CustomerReference == 0 ? "" : pOperationHeader.CustomerReference) + '</div>';
                        if (pOperationHeader.TransportType == OceanTransportType)
                            ReportHTML += '             <div class="col-xs-6"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        if (pContainerTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        else if (pPackageTypes != 0)
                            ReportHTML += '         <div class="col-xs-6"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    }
                    ReportHTML += '         <div class="col-xs-6"><b>Container No: </b>' + (pOperationHeader.ContainerNumbers == 0 ? (pOperationHeader.ContainerNumber == 0 ? "" : pOperationHeader.ContainerNumber) : pOperationHeader.ContainerNumbers) + '</div>';
                    if (pAccNoteRemarks != "")
                        ReportHTML += '             <div class="col-xs-6"><b>Remarks: </b>' + pAccNoteRemarks + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b></b>' + '' + '</div>';
                    //ReportHTML += '                 <section class="panel panel-default">';
                    //ReportHTML += '                     <div class="table-responsive">';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportAccNote" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Item</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Unit Price</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + item.ChargeTypeName + (item.Notes == 0 || item.Notes == "" ? "" : '-' + item.Notes) + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SalePrice : item.CostPrice) + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + ' ' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                    ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                        ReportHTML += '                                             <td><b> + ' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=3>' + '<b>WHT (' + pDiscountTypeName + ')</b></td>';
                        ReportHTML += '                                             <td><b> - ' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=3>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';


               

                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    if (pDefaults.UnEditableCompanyName == "BME")
                        ReportHTML += '         <div class="row text-center m-t-n"><img src="/Content/Images/CompanyFooterInvoice.jpg" alt="footer"/></div>';
                    else if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '             <br><br><br><br><br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
                else if (pDefaults.UnEditableCompanyName == "KDS" || pDefaults.UnEditableCompanyName == "NEW") {
                    debugger;
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Note</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white; font-size:160%;">';
                    if (!$("#cbPrintHeaderInvoice").prop("checked")) //if KML,EEL the print on original paper
                        ReportHTML += '             <br><br><br><br><br>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + pAccNoteDate.substr(3, 2) + '/' + pAccNoteDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + pAccNoteHeader.NoteTypeName + " No. " + pAccNoteCode.substring(4, 20) + "/20" + pAccNoteCode.substring(1, 3) + '</h3></div> </br>';

                    //ReportHTML += '             <div class="col-xs-6 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '             <div class="col-xs-8"><b>Client: </b>' + $("#tblAccNotes #" + pID + " td.AccNotePartner").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Date: </b>' + (pAccNoteDate == "01/01/1900" || pAccNoteDate == "1/1/1900" ? "N/A" : pAccNoteDate) + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>Branch: </b>' + pOperationHeader.BranchName + '</div>';
                    //if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                    //    ReportHTML += '             <div class="col-xs-4"><b>Freight: </b>' + (pOperationHeader.POrCName == 0 ? "" : pOperationHeader.POrCName) + '</div>';
                    //else
                    //    ReportHTML += '             <div class="col-xs-4"><b>Voyage: </b>' + (pOperationHeader.VoyageOrTruckNumber == 0 ? "Not Specified" : pOperationHeader.VoyageOrTruckNumber) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Vessel: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Currency: </b>' + (pAccNoteHeader.CurrencyCode == 0 ? "" : pAccNoteHeader.CurrencyCode) + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>Vessel Date: </b>' + (pETA == "01/01/1900" || pETA == "1/1/1900" ? "N/A" : pETA) + '</div>';
                    //if ($("#cbPrintMBL").prop("checked"))
                    //    ReportHTML += '             <div class="col-xs-4"><b>MB/L No.: </b>' + pMasterBL + '</div>';
                    //if ($("#cbPrintHBL").prop("checked")) {
                    //    //if (pHouseBLs != "0")//Master Operation so show all houses on it
                    //    //    ReportHTML += '             <div class="col-xs-4"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    //    //else
                    //    ReportHTML += '             <div class="col-xs-4"><b>HB/L No.:</b> ' + (pHouseNumber == "" || pHouseNumber == "0" ? "Not Specified" : pHouseNumber) + '</div>';
                    //}

                    //ReportHTML += '             <div class="col-xs-4"><b>POL: </b>' + pPOLName + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>GW: </b>' + pOperationHeader.GrossWeightSum + ' KGM' + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>Delivery Order No.: </b>' + (pDeliveryOrderNumber == 0 ? "" : pDeliveryOrderNumber) + '</div>';
                    //if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                    //    ReportHTML += '             <div class="col-xs-4"><b>CBM: </b>' + pCBM + ' CBM' + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b>POD: </b>' + pPODName + '</div>';
                    ////if (pOperationHeader.ShipmentTypeCode != "FCL" && pOperationHeader.ShipmentTypeCode != "CONSOL")
                    ////    ReportHTML += '             <div class="col-xs-4"><b>Free Time: </b>' + (pOperationHeader.FreeTime == 0 ? "" : pOperationHeader.FreeTime) + '</div>';
                    //if (pOperationHeader.ShipmentTypeCode == "FCL" || pOperationHeader.ShipmentTypeCode == "FTL" || pOperationHeader.ShipmentTypeCode == "CONSOL")
                    //    ReportHTML += '             <div class="col-xs-8"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    //else
                    //    ReportHTML += '             <div class="col-xs-8"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    //if (pInvoiceNumber != 0)
                    //    ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + pInvoiceNumber + '</div>';
                    //if (pAccNoteRemarks != "")
                    //    ReportHTML += '             <div class="col-xs-6"><b>Remarks: </b>' + pAccNoteRemarks + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b></b>' + '' + '</div>';
                    //ReportHTML += '                 <section class="panel panel-default">';
                    //ReportHTML += '                     <div class="table-responsive">';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportAccNote" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr style="font-size:110%;">';
                    //ReportHTML += '                                     <th>No.</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        //ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        ReportHTML += '                                     <tr class="input-md" style="font-size:110%;">';
                        //ReportHTML += '                                         <td>' + ++i + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && IsNull(item.ChargeTypeLocalName, '0') != '0' ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('<br>' + item.Notes.replace(/\n/g, "<br/>")) : "") + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    ReportHTML += '                                         <tr style="font-size:110%;">';
                    ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers(parseFloat($("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text()).toFixed(2)) + ' ' + $("#tblInvoices #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr style="font-size:110%;">';
                        ReportHTML += '                                             <td colspan=1>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                        ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr style="font-size:110%;">';
                        ReportHTML += '                                             <td colspan=1>' + '<b>WHT (' + pDiscountTypeName + ')</b></td>';
                        ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr style="font-size:110%;">';
                        ReportHTML += '                                             <td colspan=1>' + '<b>TOTAL AMOUNT WITH VAT AND DISC : ' + toWords_WithFractionNumbers(parseFloat($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()).toFixed(2)) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                        ReportHTML += '                                             <td><b>Total Amount : ' + parseFloat($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()).toFixed(2) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }

                    //else
                    //    ReportHTML += '                             <br><br><br><br><br><br>';
                    ReportHTML += '                         </div>';
                    //ReportHTML += '                         <div class="col-xs-4 text-right m-t-n">';
                    //ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                    ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                    //ReportHTML += '                             <b>VAT(' + $("#tblInvoices #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                    ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                    //ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                    //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    //ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t"><b>' + 'Approved By' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t text-center"><b>' + 'Reviewed By' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + 'Customer Service Supervisor' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t text-center"><b>' + 'Preparation' + '</b></div>';
                    //ReportHTML += '                 </div>'
                    //ReportHTML += '                 <div class="m-t" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm"><b>' + '....................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-2 m-t-sm text-center"><b>' + '..................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-4 m-t-sm text-center"><b>' + '......................................................' + '</b></div>';
                    //ReportHTML += '                     <div class="col-xs-3 m-t-sm text-center">' + $("#hLoggedUserNameNotLogin").val() + '</div>';
                    //ReportHTML += '                 </div>'
                    ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها  ' + ($("#cbIsImport").prop("checked") ? (' / ض.م.: ' + pTaxNumber) : '') + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    //else
                    //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                    //    else
                    //        if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //            ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                    //        else
                    //            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //                ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                    //            else
                    //                if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //                    ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الشركة تخضع لنظام الدفعات المقدمة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  لاتعتبر الفاتورة مسددة إلا بموجب إيصال سداد معتمد من الشركة بتمام قيمة الفاتورة  ' + '</div>';
                    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
                else if (["YIW", "DSE"].includes(pDefaults.UnEditableCompanyName)) {
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Note</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                    ReportHTML += '                 <div class="col-xs-12 m-l-n">' + pAddressLine1 + ' ' + pAddressLine2 + ' ' + pAddressLine3 + '</div>';
                    ReportHTML += '                 <div class="col-xs-12 m-l-n">Tel:' + pPhones + ' &emsp;Fax: ' + pFaxes + '</div>';
                    //ReportHTML += '                 <div class="col-xs-12"><hr style="border-width: 1px;" /></div>';
                    ReportHTML += '                 <div style="width:98%;height:0.5px;border:0.5px solid #000;"></div>';

                    ReportHTML += '                 <div class="col-xs-12 text-center"><h3>' + pAccNoteCode + '</h3></div>';
                    ReportHTML += '                 <div class="col-xs-5">';
                    ReportHTML += '                     <b>Bill To: ' + $("#tblAccNotes #" + pID + " td.AccNotePartner").text() + '</b><br>';
                    ReportHTML += '                     ' + (pClientStreetLine1 == "" ? "" : (pClientStreetLine1));
                    ReportHTML += '                     ' + (pClientStreetLine2 == "" ? "" : (", " + pClientStreetLine2 + '<br>'));
                    ReportHTML += '                     ' + (pClientCityName == "" ? "" : ("," + pClientCityName));
                    ReportHTML += '                     ' + (pClientCountryName == "" ? "" : ("," + pClientCountryName));
                    ReportHTML += '                 </div>';

                    ReportHTML += '                 <div class="col-xs-2"></div>';

                    ReportHTML += '                 <div class="col-xs-5">';
                    //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                    ReportHTML += '                     <b>Date : </b>' + (pAccNoteDate == "01/01/1900" || pAccNoteDate == "1/1/1900" ? "N/A" : pAccNoteDate) + '<br>';
                    //ReportHTML += '                     <b>Invoice No : </b>' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + /*pInvoiceNumber*/$("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '<br>';
                    ReportHTML += '                     <b>No : </b>' + $("#tblAccNotes #" + pID + " td.AccNoteCode").text().split('/')[0] /*+ '/' + $("#tblAccNotes #" + pID + " td.AccNoteDate").text().substr(6, 4)*/ + '<br>';
                    //ReportHTML += '                     <b>Payment Due by : </b>' + (pInvoiceDueDate == "01/01/1900" || pInvoiceDueDate == "1/1/1900" ? "N/A" : pInvoiceDueDate) + '<br>';
                    ReportHTML += '                     <b>Operation : </b>' + (pOperationHeader.Reference == 0 ? "" : pOperationHeader.Reference) + '<br>';
                    //if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                    //    ReportHTML += '                 <b>Operation : </b>' + pMasterOperationCode;
                    //else
                    //    ReportHTML += '                     <b>Operation : </b>' + $("#tblInvoices #" + pID + " td.InvoiceOperationCode").text() + '<br>';
                    ReportHTML += '                     <b>Currency : </b>' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '<br>' + '<br>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '             </div>';

                    ReportHTML += '             <div style="clear:both;"></div>';
                    ReportHTML += '             <div class="col-xs-7"><b>Shipper: </b>' + pShipperName + '</div>';
                    ReportHTML += '             <div class="col-xs-5"><b>Consignee: </b>' + pConsigneeName + '</div>';
                    ReportHTML += '             <div class="col-xs-7"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'ORGN' : 'POL') + ': </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-5"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'DEST' : 'POD') + ': </b>' + pPODName + '</div>';
                    var _NextSize = 7;
                    if ($("#cbPrintMBL").prop("checked")) {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + ': </b>' + pMasterBL + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if ($("#cbPrintHBL").prop("checked")) {
                        if (pHouseBLs != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b>' + pHouseBLs + '</div>';
                        else if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Gross Weight: </b>' + pGrossWeightSum + ' KG</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Net Weight: </b>' + pOperationHeader.NetWeightSum + ' KG</div>';
                    _NextSize = 12 - _NextSize;
                    if (pOperationHeader.TransportType == AirTransportType) {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Chargeable Weight: </b>' + pOperationHeader.VolumeSum + ' KG</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if (pContainerTypes != 0) {
                        ReportHTML += '         <div class="col-xs-' + _NextSize + '"><b>Volume: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    else if (pPackageTypes != 0) {
                        ReportHTML += '         <div class="col-xs-' + _NextSize + '"><b>Volume: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    if (pOperationHeader.TransportType == OceanTransportType) {
                        ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Vessel-Voy: </b>' + (pOperationHeader.VesselName == 0 ? "" : pOperationHeader.VesselName) + (pOperationHeader.VoyageOrTruckNumber == 0 ? "" : (" - " + pOperationHeader.VoyageOrTruckNumber)) + '</div>';
                        _NextSize = 12 - _NextSize;
                    }
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Shipment Category: </b>' + pShipmentTypeCode + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>Shipment Term: </b>' + pIncotermName + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '             <div class="col-xs-' + _NextSize + '"><b>PO Number: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    _NextSize = 12 - _NextSize;
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportAccNote" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Description</th>';
                    //ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th style="width:20%;">Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName != "DSE")
                            ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && IsNull(item.ChargeTypeLocalName,'0') != '0' ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        //ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + ' ' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pTaxAmount != 0 || pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>Subtotal : ' + '</b></td>';
                        ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>VAT(' + $("#tblAccNotes #" + pID + " td.AccNoteTaxPercentage").text() + '%) : ' + '</b></td>';
                        ReportHTML += '                                             <td><b>' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td>' + '<b>WHT(' + $("#tblAccNotes #" + pID + " td.AccNoteDiscountPercentage").text() + '%) : ' + '</b></td>';
                        ReportHTML += '                                             <td><b>' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }

                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td>' + '<b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';

                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="col-xs-9"></div>';
                    ReportHTML += '                         <div class="text-center col-xs-3"><b><i>Prepared By ,</i></b></div>';
                    ReportHTML += '                         <div class="col-xs-9"></div>';
                    ReportHTML += '                         <div class="text-center col-xs-3"><b><i>' + $("#hLoggedUserNameNotLogin").val() + '</i></b></div>';

                    //ReportHTML += '                         <div class="col-xs-12 m-t-n">';
                    //if (pTaxAmount != 0 || pDiscountAmount != 0)
                    //    ReportHTML += '                             <b>Subtotal: </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceAmountWithoutVAT").text() + '</br>';
                    ////ReportHTML += '                             <b>VAT Rate: </b>' + '% ' + $("#tblInvoices #" + pID + " td.InvoiceTaxPercentage").text() + '</br>';
                    //if (pTaxAmount != 0)
                    //    ReportHTML += '                             <b>VAT(' + $("#tblInvoices #" + pID + " td.InvoiceTaxPercentage").text() + '%): </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + pTaxAmount + '</br>';
                    ////ReportHTML += '                             <b>Discount Taxes Rate: </b>' + '% ' + $("#tblInvoices #" + pID + " td.InvoiceDiscountPercentage").text() + '</br>';
                    //if (pDiscountAmount != 0)
                    //    ReportHTML += '                             <b>Discount Taxes(' + $("#tblInvoices #" + pID + " td.InvoiceDiscountPercentage").text() + '%): </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' ' + pDiscountAmount + '</br>';
                    //ReportHTML += '                             <b>Total: </b>' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' <b>' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + '</b></br>';
                    //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers($("#tblInvoices #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + '</br>';
                    //ReportHTML += '                         </div>';
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row">'
                    //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices #" + pID + " td.DirectionType").text() == 1
                    //                                                                ? 'Import Manager'
                    //                                                                : ($("#tblInvoices #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                    //                                                                ) + '</i></b></div>';
                    //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                    //ReportHTML += '         </div>'
                    //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';


                    if (["YIW", "DSE"].includes(pDefaults.UnEditableCompanyName))
                        ReportHTML += '         <div class="row text-center m-t ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '"><img src="/Content/Images/AccNoteFooter-DSE.jpg" alt="footer"/></div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                } //else if (pDefaults.UnEditableCompanyName == "DSE") {
                else if (pDefaults.IsTaxOnItems) {
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Note</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    if (!$("#cbPrintHeaderInvoice").prop("checked")) //if KML,EEL the print on original paper
                        ReportHTML += '             <br><br><br><br><br>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + pAccNoteDate.substr(3, 2) + '/' + pAccNoteDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    if (pDefaults.UnEditableCompanyName == "PHO")
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + pAccNoteHeader.NoteTypeName + " Note " + pAccNoteCode.substring(4, 20) + "/20" + pAccNoteCode.substring(1, 3) + '</h3></div> </br>';
                    else if (pDefaults.UnEditableCompanyName == "LATT"||IsMESCOCompany)
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + pAccNoteHeader.NoteTypeName + ' Note # ' + pAccNoteCode + '</h3></div> </br>';

                    else
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + (pAccNoteCode.substring(0, 1) == 'C' ? 'Credit' : 'Debit') + ' Note # ' + pAccNoteCode + '</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-6 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Partner: </b>' + $("#tblAccNotes #" + pID + " td.AccNotePartner").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Note Date: </b>' + (pAccNoteDate == "01/01/1900" || pAccNoteDate == "1/1/1900" ? "N/A" : pAccNoteDate) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblAccNotes #" + pID + " td.AccNoteOperationCode").text() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>MBL</b>' + $("#lblMaster").text() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>BL: </b>' + pMasterBL + '</div>';
                    //if (pHouseBLs != "0")//Master Operation so show all houses on it
                        //ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    //else
                        //if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            //ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    debugger;
                    if ($("#cbPrintMBL").prop("checked")) {
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + ': </b>' + pMasterBL + '</div>';
                    }
                    if ($("#cbPrintHBL").prop("checked")) {
                        if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                        else if (pHouseNumber != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b>' + pHouseNumber + '</div>';
                    }
                    //ReportHTML += '             <div class="col-xs-6"><b>Routing</b>' + $("#lblRouting").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //if (pContainerTypes != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    //else
                    //    if (pPackageTypes != 0)
                    //        ReportHTML += '     <div class="col-xs-6"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    if (pInvoiceNumber != 0 && pDefaults.UnEditableCompanyName == "SAF")
                        ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + $("#tblAccNotes" + " #" + pID + " td.AccNoteConcatenatedInvoiceNumber").text().split("/")[1.] + "#" + $("#tblAccNotes" + " #" + pID + " td.AccNoteConcatenatedInvoiceNumber").text().split('/')[0].padStart(5, 0) + '</div>';
                    else if (pInvoiceNumber != 0)
                        ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + pInvoiceNumber + '</div>';
                    if (pDefaults.UnEditableCompanyName == "CAP") {
                        ReportHTML += '             <div class="col-xs-6"><b>Consignee: </b>' + (pOperationHeader.ConsigneeName == 0 ? "" : pOperationHeader.ConsigneeName) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Booking No: </b>' + (pOperationHeader.BookingNumbers == 0 ? "" : pOperationHeader.BookingNumbers) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Ref#: </b>' + (pOperationHeader.ReferenceNumber == 0 ? "" : pOperationHeader.ReferenceNumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>PO.No: </b>' + (pOperationHeader.PONumber == 0 ? "" : pOperationHeader.PONumber) + '</div>';
                    }
                    if (pAccNoteRemarks != "")
                        ReportHTML += '             <div class="col-xs-6"><b>Remarks: </b>' + pAccNoteRemarks + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b></b>' + '' + '</div>';
                    //ReportHTML += '                 <section class="panel panel-default">';
                    //ReportHTML += '                     <div class="table-responsive">';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportAccNote" class="table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    //ReportHTML += '                                     <th>Ser.</th>';
                    ReportHTML += '                                     <th>Item</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>UnitPrice</th>';
                    if (pDefaults.UnEditableCompanyName == "CAP") {
                        ReportHTML += '                                     <th>Container</th>';
                    }
                    ReportHTML += '                                     <th>Disc</th>';
                    ReportHTML += '                                     <th>VAT</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        //ReportHTML += '                                     <td>' + (i + 1) + '</td>';
     
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && IsNull(item.ChargeTypeLocalName, '0') != '0' ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        //ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SalePrice : item.CostPrice) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "CAP") {
                            ReportHTML += '                                         <td>' + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + '</td>';
                        }
                        ReportHTML += '                                         <td>' + item.DiscountPercentage + ' %' + '</td>';
                        ReportHTML += '                                         <td>' + item.TaxPercentage + ' %' + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : (IsMESCOCompany ? (item.CostAmount == 0 ? item.QuotationCost : item.CostAmount) : item.CostAmount)) + ' ' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    //ReportHTML += '                                         <tr>';
                    //ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : "1") + '>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                    //ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                    //ReportHTML += '                                         </tr>';
                    //if (pTaxAmount != 0) {
                    //    ReportHTML += '                                         <tr>';
                    //    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "CAP" ? "6" : "5") + '>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                    //    ReportHTML += '                                             <td><b> + ' + pTaxAmount + '</b></td>';
                    //    ReportHTML += '                                         </tr>';
                    //}
                    //if (pDiscountAmount != 0) {
                    //    ReportHTML += '                                         <tr>';
                    //    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "CAP" ? "6" : "5") + '>' + '<b>WHT (' + pDiscountTypeName + ')</b></td>';
                    //    ReportHTML += '                                             <td><b> - ' + pDiscountAmount + '</b></td>';
                    //    ReportHTML += '                                         </tr>';
                    //}
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "CAP" ? "6" : "5") + '>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>'
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                    ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName != "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaults.InvoiceLeftPosition != 0 ? pDefaults.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaults.InvoiceMiddlePosition != 0 ? pDefaults.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaults.InvoiceRightPosition != 0 ? pDefaults.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaults.InvoiceLeftSignature != 0 ? pDefaults.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaults.InvoiceMiddleSignature != 0 ? pDefaults.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaults.InvoiceRightSignature != 0 ? pDefaults.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها  ' + ($("#cbIsImport").prop("checked") ? (' / ض.م.: ' + pTaxNumber) : '') + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    //else
                    //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                    //    else
                    //        if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //            ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                    //        else
                    //            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //                ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                    //            else
                    //                if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //                    ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName == "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName == "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '             <br><br><br><br><br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                } //else if (pDefaults.IsTaxOnItems)
               
                   
                    
                else { //fields are complete
                    var mywindow = window.open('', '_blank');
                    var ReportHTML = '';
                    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Note</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    if (pDefaults.UnEditableCompanyName == "ATL")
                        ReportHTML += '         <div style=" width: 90%; margin: auto; ">';
                    if (pDefaults.UnEditableCompanyName == "ACS")
                        ReportHTML += '             <br><br><br>';
                    if (!$("#cbPrintHeaderInvoice").prop("checked")) {  //if KML,EEL the print on original paper
                        if (pDefaults.UnEditableCompanyName == "ITL" && $("#cbPrintHeader2Invoice").prop("checked"))
                            ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + 'CompanyHeader2.jpg' + '" alt="logo"/></div>';
                        else { 
                            if (pDefaults.UnEditableCompanyName != "ATL")
                                ReportHTML += '             &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                            else
                                ReportHTML += '          <br>&emsp;<br>&emsp;<br>';
                        }
                    }
                    else {
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    }
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + pAccNoteDate.substr(3, 2) + '/' + pAccNoteDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    if (pDefaults.UnEditableCompanyName == "PHO")
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + pAccNoteHeader.NoteTypeName + " Note " + pAccNoteCode.substring(4, 20) + "/20" + pAccNoteCode.substring(1, 3) + '</h3></div> </br>';
                    else if (pDefaults.UnEditableCompanyName == "LATT")
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + (pAccNoteCode.substring(0, 1) == 'C' ? 'Credit' : pAccNoteCode.substring(0, 1) == 'D' ? 'Debit' : (pAccNoteCode.substring(4, 5) == 'C' ? 'Credit' : pAccNoteCode.substring(4, 5) == 'D' ? 'Debit' : '')) + ' Note # ' + pAccNoteCode + '</h3></div> </br>';

                    else
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + (pAccNoteCode.substring(0, 1) == 'C' ? 'Credit' : 'Debit') + ' Note # ' + pAccNoteCode + '</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-6 hide"><b>Print Date: </b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>Partner: </b>' + $("#tblAccNotes #" + pID + " td.AccNotePartner").text() + '</div>';
                    if (pDefaults.UnEditableCompanyName == "UNF") {
                        ReportHTML += '             <div class="col-xs-6"><b>Partner Address: </b>' + ((pClientStreetLine1 != '' ? (pClientStreetLine1 + ',') : '') + (pClientStreetLine2 != '' ? (pClientStreetLine2 + ',') : '') + (pClientCountryName != '' ? (pClientCountryName + ',') : '') + (pClientCityName != '' ? pClientCityName : pClientCityName)) + '</div>';
                        ReportHTML += '             <div class="col-xs-6"><b>Partner VAtNO.: </b>' + (pPartnerVatNum != '' ? pPartnerVatNum : ' ') + '</div>';
                    }
                    ReportHTML += '             <div class="col-xs-6"><b>Note Date: </b>' + (pAccNoteDate == "01/01/1900" || pAccNoteDate == "1/1/1900" ? "N/A" : pAccNoteDate) + '</div>';
                    if (pMasterOperationCode != "" && pMasterOperationCode != "0")
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + pMasterOperationCode + '</div>';
                    else
                        ReportHTML += '             <div class="col-xs-6"><b>Operation: </b>' + $("#tblAccNotes #" + pID + " td.AccNoteOperationCode").text() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>MBL</b>' + $("#lblMaster").text() + '</div>';
                    //ReportHTML += '             <div class="col-xs-6"><b>BL: </b>' + pMasterBL + '</div>';
                    //if (pHouseBLs != "0")//Master Operation so show all houses on it
                        //ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + pHouseBLs + '</div>';
                    //else
                        //if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                            //ReportHTML += '             <div class="col-xs-6"><b>HBL</b>: ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                    debugger;
                    if ($("#cbPrintMBL").prop("checked")) {
                        ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'MAWB' : 'MBL') + ': </b>' + pMasterBL + '</div>';
                    }
                    if ($("#cbPrintHBL").prop("checked")) {
                        if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked")) {
                            if (pDefaults.UnEditableCompanyName == "UNF") {
                                ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b> ' + (pAccNoteHeader.HouseNumber == "" ? "N/A" : pAccNoteHeader.HouseNumber) + '</div>';
                            } else {

                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b> ' + (pHouseNumber == "" ? "N/A" : pHouseNumber) + '</div>';
                            }
                          
                        }
                       
                        else if (pHouseNumber != "0")//Master Operation so show all houses on it
                            ReportHTML += '             <div class="col-xs-6"><b>' + (pOperationHeader.TransportType == AirTransportType ? 'HAWB' : 'HBL') + ': </b>' + pHouseNumber + '</div>';

                    }
                    //ReportHTML += '             <div class="col-xs-6"><b>Routing</b>' + $("#lblRouting").text() + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POL: </b>' + pPOLName + '</div>';
                    ReportHTML += '             <div class="col-xs-6"><b>POD: </b>' + pPODName + '</div>';
                    //if (pContainerTypes != 0)
                    //    ReportHTML += '         <div class="col-xs-6"><b>Containers: </b>' + (pContainerTypes == 0 ? "N/A" : pContainerTypes) + '</div>';
                    //else
                    //    if (pPackageTypes != 0)
                    //        ReportHTML += '     <div class="col-xs-6"><b>Packages: </b>' + (pPackageTypes == 0 ? "N/A" : pPackageTypes) + '</div>';
                    if (pInvoiceNumber != 0 && pDefaults.UnEditableCompanyName == "SAF")
                        ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + $("#tblAccNotes" + " #" + pID + " td.AccNoteConcatenatedInvoiceNumber").text().split("/")[1.] + "#" + $("#tblAccNotes" + " #" + pID + " td.AccNoteConcatenatedInvoiceNumber").text().split('/')[0].padStart(5, 0) + '</div>';
                    else if (pInvoiceNumber != 0)
                        ReportHTML += '             <div class="col-xs-6"><b>Invoice: </b>' + pInvoiceNumber + '</div>';
                    if (pAccNoteRemarks != "")
                        ReportHTML += '             <div class="col-xs-6"><b>Remarks: </b>' + pAccNoteRemarks + '</div>';
                    //ReportHTML += '             <div class="col-xs-4"><b></b>' + '' + '</div>';
                    //ReportHTML += '                 <section class="panel panel-default">';
                    //ReportHTML += '                     <div class="table-responsive">';
                    ReportHTML += '                     <div class="col-xs-12 clear">'
                    ReportHTML += '                         <table id="tblReportAccNote" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    if (pDefaults.UnEditableCompanyName == "BAD")
                        ReportHTML += '                                     <th>Ser.</th>';
                    ReportHTML += '                                     <th>Item</th>';
                    if (pDefaults.UnEditableCompanyName == "BAD") {
                        ReportHTML += '                                     <th>Quantity</th>';
                        ReportHTML += '                                     <th>UnitPrice</th>';
                    }
                    if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM")
                        ReportHTML += '                                     <th>Tank</th>';
                    ReportHTML += '                                     <th>Amount</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    $.each(JSON.parse(data[2]), function (i, item) {
                        ReportHTML += '                                     <tr class="input-md" style="font-size:95%;">';
                        if (pDefaults.UnEditableCompanyName == "BAD")
                            ReportHTML += '                                     <td>' + (i + 1) + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + ($("#cbPrintArabicItems").prop("checked") && IsNull(item.ChargeTypeLocalName, '0') != '0' ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                       // ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        if (pDefaults.UnEditableCompanyName == "BAD") {
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SalePrice : item.CostPrice) + '</td>';
                        }
                        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM")
                            ReportHTML += '                                         <td>' + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + ' ' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    if (pDefaults.UnEditableCompanyName != "ATL") {
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" ? 2 : 1)) + '>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                    ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    }
                        if (pTaxAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "2" : "1") + '>' + '<b>VAT (' + pTaxTypeName + ') </b></td>';
                        ReportHTML += '                                             <td><b> + ' + pTaxAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDiscountAmount != 0) {
                        ReportHTML += '                                         <tr>';
                        ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : "1") + '>' + '<b>WHT (' + pDiscountTypeName + ')</b></td>';
                        ReportHTML += '                                             <td><b> - ' + pDiscountAmount + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    if (pDefaults.UnEditableCompanyName != "ATL") {
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" ? 2 : 1)) + '>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                        ReportHTML += '                                         </tr>';
                    }
                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    if (pDefaults.UnEditableCompanyName != "ACS" && pDefaults.UnEditableCompanyName != "ATL") {
                        ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    } else if (pDefaults.UnEditableCompanyName == "ATL") {
                        ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r" style="padding: 15; padding-right: 0; ">' +
                            '<b>' + 'TOTAL : ' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' +
                            $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></div>';
                        ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r" style="padding: 0;">' +
                            '<b>' + 'ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' +
                            $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></div>';
                    }

                    if (pDefaults.UnEditableCompanyName == "ATL")
                        ReportHTML += "                             </br></br>";

                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName != "KDM") {
                        if (pDefaults.UnEditableCompanyName == "ATL") {
                        ReportHTML += '                            <div  style="padding-left: 15;">';
                        }
                        if (pDefaults.UnEditableCompanyName != "ATL")
                        ReportHTML += '                             <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';

                        if (pDefaults.UnEditableCompanyName == "ATL") {

                            ReportHTML += '                             </div>';
                        }

                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName != "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    //ReportHTML += '                     </div>'; //of table-responsive
                    //ReportHTML += '                 </section>';
                    //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                    if (pDefaults.UnEditableCompanyName == "ATL")
                    ReportHTML += '     </div>';

                    ReportHTML += '         </body>';

                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaults.InvoiceLeftPosition != 0 ? pDefaults.InvoiceLeftPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaults.InvoiceMiddlePosition != 0 ? pDefaults.InvoiceMiddlePosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 m-t text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaults.InvoiceRightPosition != 0 ? pDefaults.InvoiceRightPosition : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    ReportHTML += '                 <div class="" style="clear:both;">'; //this is supposed to  be in the footer but i added it here to test not put on text
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintLeftSignature").prop("checked") && pDefaults.InvoiceLeftSignature != 0 ? pDefaults.InvoiceLeftSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintMiddleSignature").prop("checked") && pDefaults.InvoiceMiddleSignature != 0 ? pDefaults.InvoiceMiddleSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + ($("#cbPrintRightSignature").prop("checked") && pDefaults.InvoiceRightSignature != 0 ? pDefaults.InvoiceRightSignature : '&emsp;') + '</b></div>';
                    ReportHTML += '                 </div>'
                    if ($("#cbPrintStamp").prop("checked"))
                        ReportHTML += '         <div class="text-right m-r-lg"><img src="/Content/Images/CompanyStamp.jpg" alt="footer"/></div>';

                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    //ReportHTML += '         <div class="row text-right m-r">' + '  الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها  ' + ($("#cbIsImport").prop("checked") ? (' / ض.م.: ' + pTaxNumber) : '') + '</div>';
                    //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                    //else
                    //    if ($("#cbIsImport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //        ReportHTML += '             <div class="row m-l">F/FFI-IA-11-04</div>';
                    //    else
                    //        if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //            ReportHTML += '         <div class="row m-l">F/FFI-ES-10-05</div>';
                    //        else
                    //            if ($("#cbIsExport").prop("checked") && $("#cbIsOcean").prop("checked"))
                    //                ReportHTML += '     <div class="row m-l">F/FFI-ES-10-05</div>';
                    //            else
                    //                if ($("#cbIsExport").prop("checked") && $("#cbIsAir").prop("checked"))
                    //                    ReportHTML += ' <div class="row m-l">F/FFI-EA-10-04</div>';
                    if ($("#cbPrintBankDetailsFromDefaults").prop("checked") && pDefaults.UnEditableCompanyName == "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                        ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                        ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                        ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                        ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                    }
                    else if ($("#cbPrintBankDetailsFromTemplate").prop("checked") && pDefaults.UnEditableCompanyName == "KDM") {
                        ReportHTML += '                         <div class="row"></div>';
                        ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                        ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                    }
                    if ($("#cbPrintFooterInvoice").prop("checked"))
                        ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                    else
                        ReportHTML += '             <br><br><br><br><br>';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                } //EOF fields are complete
                FadePageCover(false);
            });
}
/****************************EOF AccNotes(Credit/Debit)*******************************************/

/****************************AccNotesEdit(Credit/Debit)*******************************************/
//fill the already added items
function AccNotes_FillAccNoteItems(pAccNoteID, pAccNoteType/*Debit=90,Credit=100*/, callback) {
    debugger;
    $("#tblModalAccNoteItems tbody tr").html("");
    var pStrFnName = "";
    if (pAccNoteType == constTransactionDebitNote)
        pStrFnName = "/api/Receivables/LoadAll";
    else if (pAccNoteType == constTransactionCreditNote)
        pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divEditAccNote";//div name to be filled
    var ptblModalName = "tblModalAccNoteItems";
    var pCheckboxNameAttr = "cbSelectAccNoteItems";
    var pWhereClause = "";
    pWhereClause += " WHERE IsDeleted = 0 ";
    pWhereClause += " AND AccNoteID = " + pAccNoteID;
    //if (pAccNoteType == 100) //Credit
    //    pWhereClause += " AND IsApproved = 0 ";
    pWhereClause += " AND ( ChargeTypeCode LIKE '%" + $("#txtSearchAccNoteItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchAccNoteItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";

    FillAccNoteModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, pAccNoteType
        , function () {
            HighlightText("#divEditAccNote", $("#txtSearchAccNoteItems").val().trim().toUpperCase());
            if ($("#" + ptblModalName + " tbody tr").length)
                $("#slEditAccNoteCurrency").attr("disabled", "disabled");
            else
                $("#slEditAccNoteCurrency").removeAttr("disabled");
            if (callback != null && callback != undefined)
                callback();
        });

    $("#btn-SearchAccNoteItems").attr("onclick", "AccNotes_FillAccNoteItems(" + pAccNoteID + "," + pAccNoteType + ");");
    $("#btnEditAccNoteApply").attr("onclick", "AccNotes_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
}
function AccNotes_AddItems(pSaveandAddNew, pAccNoteType) {
    debugger;
    if ($("#slEditAccNotePartner").val() == "")
        swal(strSorry, "Please, Select partner.");
    else {
        var pModalName = "CheckboxesListModal";
        var pCheckboxNameAttr = "cbAddedItemID";
        var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
        var AmountToBeAdded = "";
        if (pSelectedItemsIDs != "") {
            //i am setting the Note amount in the controller after adding the Items
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/AccNote/AddItems"
                , {
                    "pAccNoteID": $("#hEditedAccNoteID").val()
                    , "pAccNoteType": pAccNoteType
                    , "pOperationID": $("#hOperationID").val()
                    , "pInvoiceID": $("#slEditAccNoteInvoice").val() == "" ? 0 : $("#slEditAccNoteInvoice").val()
                    , "pOperationPartnerID": $("#slEditAccNotePartner").val() //in table OperationPartners
                    , "pAddressID": $("#slEditAccNoteAddressTypes").val()
                    , "pNoteDate": ($("#txtEditAccNoteDate").val() == "" ? "01/01/1900" : $("#txtEditAccNoteDate").val().trim())
                    , "pTaxTypeID": $("#slEditAccNoteTax").val() == "" ? 0 : $("#slEditAccNoteTax").val()
                    , "pTaxPercentage": $("#txtEditAccNoteTaxPercentage").val() == "" ? 0 : $("#txtEditAccNoteTaxPercentage").val()
                    //, "pTaxAmount": $("#txtEditAccNoteTaxAmount").val() == "" ? 0 : $("#txtEditAccNoteTaxAmount").val() //calculated in controller after adding items
                    , "pDiscountTypeID": $("#slEditAccNoteDiscount").val() == "" ? 0 : $("#slEditAccNoteDiscount").val()
                    , "pDiscountPercentage": $("#txtEditAccNoteDiscountPercentage").val() == "" ? 0 : $("#txtEditAccNoteDiscountPercentage").val()
                    //, "pDiscountAmount": $("#txtEditAccNoteDiscountAmount").val() == "" ? 0 : $("#txtEditAccNoteDiscountAmount").val() //calculated in controller after adding items
                    , "pCurrencyID": $("#slEditAccNoteCurrency").val()
                    , "pExchangeRate": $("#slEditAccNoteCurrency option:selected").attr("MasterDataExchangeRate")
                    , "pRemarks": $("#txtEditAccNoteRemarks").val().trim() == "" ? "0" : $("#txtEditAccNoteRemarks").val().trim().toUpperCase()
                    , "pSelectedItemsIDs": pSelectedItemsIDs
                }
                , function (data) {
                    if (pAccNoteType == constTransactionDebitNote)
                        Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    else //payables
                        Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    if (data[0])
                        AccNotes_BindTableRows(JSON.parse(data[1]));
                    AccNotes_FillAccNoteItems($("#hEditedAccNoteID").val(), pAccNoteType, function () { AccNotes_ChangeAmountInAccNoteEdit(); });
                    jQuery('#' + pModalName).modal('hide');
                    FadePageCover(false);
                });
        }
    }
}
////AccNotes_Update(): is used for both updating and removing items 
function AccNotes_Update(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
    debugger;
    FadePageCover(true);
    var pExchangeRate = 0;
    var pParametersWithValues = {
        pWhereClauseCurrencyDetails: ("WHERE ID=" + $("#slEditAccNoteCurrency").val() + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditAccNoteDate").val()) + "' >= DateAdd(hh, 0, DateDiff(dd, 0, FromDate)) "
                + " AND '" + GetDateWithFormatyyyyMMdd($("#txtEditAccNoteDate").val()) + "' <= DateAdd(minute,59,DateAdd(hh, 23, DateDiff(dd, 0, ToDate))) "
                + " ORDER BY CODE"
              )
    };
    CallGETFunctionWithParameters("/api/Currencies/LoadCurrencyDetails", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            if (pData[0] == "[]") {
                swal("Sorry", "Exchange rate is not set for " + $("#slEditAccNoteCurrency option:selected").text() + " in the Master Data.");
            }
            else {
                pExchangeRate = JSON.parse(pData[0])[0].ExchangeRate;
                var pSelectedItemIDsToRemove = GetAllSelectedIDsAsStringWithNameAttr("cbSelectAccNoteItems");
                if (pIsRemoveItems && pSelectedItemIDsToRemove == "") //to make sure that there are selected items in case of pressing remove items
                    swal(strSorry, "Please select at least one item."); //this message is showed only incase of pressing remove items w/o selecting any
                else if ($("#slEditAccNotePartner").val() == "")
                    swal(strSorry, "Please, Select partner.");
                else {
                    //if (pSelectedReceivableItemsIDs != "" && Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, true) > 0) {
                    if (ValidateForm("form", "EditAccNoteModal")) { //(Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
                        //Confirmation message to delete
                        //if (pSelectedItemIDsToRemove != "")
                        swal({
                            title: "Are you sure?",
                            text: "The Note will be saved!",
                            //type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, Save!",
                            closeOnConfirm: true
                        },
                        //callback function in case of confirm delete
                        function () {
                            //i am setting the Note amount in the controller after adding the Items
                            FadePageCover(true);
                            let adata = {
                                "pAccNoteID": $("#hEditedAccNoteID").val()
                                , "pAccNoteType": $("#hEditedAccNoteTypeID").val()
                                , "pOperationID": $("#hOperationID").val()
                                , "pInvoiceID": $("#slEditAccNoteInvoice").val() == "" ? 0 : $("#slEditAccNoteInvoice").val()
                                , "pOperationPartnerID": $("#slEditAccNotePartner").val() //in table OperationPartners
                                , "pAddressID": $("#slEditAccNoteAddressTypes").val()
                                , "pNoteDate": ($("#txtEditAccNoteDate").val() == "" ? "01/01/1900" : $("#txtEditAccNoteDate").val().trim())
                                , "pTaxTypeID": $("#slEditAccNoteTax").val() == "" ? 0 : $("#slEditAccNoteTax").val()
                                , "pTaxPercentage": $("#txtEditAccNoteTaxPercentage").val() == "" ? 0 : $("#txtEditAccNoteTaxPercentage").val()
                                //, "pTaxAmount": $("#txtEditAccNoteTaxAmount").val() == "" ? 0 : $("#txtEditAccNoteTaxAmount").val() //calculated in controller after adding items
                                , "pDiscountTypeID": $("#slEditAccNoteDiscount").val() == "" ? 0 : $("#slEditAccNoteDiscount").val()
                                , "pDiscountPercentage": $("#txtEditAccNoteDiscountPercentage").val() == "" ? 0 : $("#txtEditAccNoteDiscountPercentage").val()
                                //, "pDiscountAmount": $("#txtEditAccNoteDiscountAmount").val() == "" ? 0 : $("#txtEditAccNoteDiscountAmount").val() //calculated in controller after adding items
                                , "pCurrencyID": $("#slEditAccNoteCurrency").val()
                                , "pExchangeRate": pExchangeRate.toFixed(2) //$("#slEditAccNoteCurrency option:selected").attr("MasterDataExchangeRate")
                                , "pRemarks": $("#txtEditAccNoteRemarks").val().trim() == "" ? "0" : $("#txtEditAccNoteRemarks").val().trim().toUpperCase()
                                , "pSelectedItemIDsToRemove": pIsRemoveItems ? pSelectedItemIDsToRemove : "" //to prevent deletion in case of checking while update
                            };

                            if (pDefaults.UnEditableCompanyName == "LATT") {
                                adata.pPartnerVatNumber = CheckValueIsValidInput('#txtEditAccNotePartnerVatNumber') ? $('#txtEditAccNotePartnerVatNumber').val() : "0";
                            }

                            CallGETFunctionWithParameters("/api/AccNote/Update"
                                , adata
                                , function (data) {
                                    if (pIsRemoveItems && $("#hEditedAccNoteTypeID").val() == constTransactionDebitNote)
                                        Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                    else if (pIsRemoveItems && $("#hEditedAccNoteTypeID").val() == constTransactionCreditNote) //payables
                                        Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                                    if (pIsRemoveItems)
                                        AccNotes_FillAccNoteItems($("#hEditedAccNoteID").val(), $("#hEditedAccNoteTypeID").val(), function () { AccNotes_ChangeAmountInAccNoteEdit(); });
                                    if (data[0]) {
                                        AccNotes_BindTableRows(JSON.parse(data[1]));
                                        swal("Success", "Saved successfully.");
                                    }
                                    else
                                        swal("Sorry", "Connection failure, Please try again.");
                                    FadePageCover(false);
                                });
                        });
                    }
                    else { //Different Currencies
                        swal(strSorry, "The currencies of the selected items must be the same.");
                        FadePagCover(false);
                    }
                }
            } //of else exchange rate is ok
        } //of callback function in CallGetFunctionWithParameters
        , null);
}
//if pIsRemoveItems then pIDs will be the NOT selected items coz the selected ones will be removed
//pIsCheck: if true then don't update the amount coz i am just checking
function AccNotes_ChangeAmountInAccNoteEdit(pIsRemoveItems, pIsCheck) {
    debugger;
    var decAccNoteAmount = 0;
    var decAccNoteTaxAmount = 0; var decAccNoteTaxPercentage = 0.0;
    var decAccNoteDiscountAmount = 0; var decAccNoteDiscountPercentage = 0.0;
    var pIDs = "";
    pIDs = (pIsRemoveItems
        ? GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectAccNoteItems")
        : GetAllIDsAsStringWithNameAttr("tblModalAccNoteItems", "cbSelectAccNoteItems"));
    var ArrayOfIDs = pIDs.split(',');
    var NumberOfSelectedItems = ArrayOfIDs.length;
    for (var i = 0; i < NumberOfSelectedItems; i++) {
        var tr = $("#tblModalAccNoteItems tr[ID='" + ArrayOfIDs[i] + "']");
        /////////////////////
        var RowSaleAmount = tr.find("td.tblModalAccNoteAmount").text().trim();
        if (!isNaN(RowSaleAmount) && RowSaleAmount.length != 0) {
            decAccNoteAmount += parseFloat(RowSaleAmount);
        }
    }

    decAccNoteTaxPercentage = $("#slEditAccNoteTax option:selected").attr("CurrentPercentage");
    decAccNoteTaxAmount = (decAccNoteAmount * decAccNoteTaxPercentage / 100).toFixed(2);
    decAccNoteDiscountPercentage = $("#slEditAccNoteDiscount option:selected").attr("CurrentPercentage");
    decAccNoteDiscountAmount = (decAccNoteAmount * decAccNoteDiscountPercentage / 100).toFixed(2);
    $("#txtEditAccNoteAmountWithoutVAT").val(decAccNoteAmount.toFixed(2)); // decAccNoteAmount is without VAT till this line
    decAccNoteAmount += decAccNoteTaxAmount - decAccNoteDiscountAmount;
    $("#txtEditAccNoteTaxAmount").val(decAccNoteTaxAmount);
    $("#txtEditAccNoteDiscountAmount").val(decAccNoteDiscountAmount);
    $("#txtEditAccNoteTaxPercentage").val(decAccNoteTaxPercentage);
    $("#txtEditAccNoteDiscountPercentage").val(decAccNoteDiscountPercentage);
    $("#txtEditAccNoteAmount").val(decAccNoteAmount.toFixed(2));

    if (!pIsCheck) //if pIsCheck is true, then this means dont refresh amount coz i am just checking
        $("#txtEditAccNoteAmount").val(decAccNoteAmount.toFixed(2));
    return decAccNoteAmount;
}
/****************************EOF AccNotesEdit(Credit/Debit)*******************************************/

/****************************PurchaseInvoice*******************************************/
function PurchaseInvoice_SubmenuTabClicked() 
{
    if ($("#cbIsFlexi").prop('checked') && $("#cbIsExport").prop('checked')) {
        window.IsOpeningBalanceFlexi = false;
        $('.forFLexiExport ').removeClass('hide');
        $('.forFlexiExport ').removeClass('hide');
        $('.hideForFLexiExport ').addClass('hide');
        $('.hideForFlexiExport ').addClass('hide');
        $("#hTransactionID").val("0");
        CallGETFunctionWithParameters("/api/SC_Transactions/LoadWithWhereClause",
            {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: " WHERE OperationID=" + IsNull($("#hOperationID").val(), "0") + " AND IsNull(IsDeleted , 0) = 0 AND TransactionTypeID = 20 AND IsNull(IsFromFlexi , 0) = 1 "
            }
            , function (pData) { SC_TransactionsForFlexi_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
            , null);
    }
    else
    {
        debugger;
        window.IsOpeningBalanceFlexi = false;
        $("#hTransactionID").val("0");
        $('.forFlexiExport').addClass('hide');
        $('.forFLexiExport').addClass('hide');
        $('.hideForFLexiExport').removeClass('hide');
    debugger;
       if ($("#tblPurchaseInvoice tbody tr").length == 0) 
       {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
            {
                pIsLoadArrayOfObjects: false
                , pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()) + " OR  MasterOperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
                , pOrderBy: "ID"
            }
            , function (pData)
            {
                PurchaseInvoice_BindTableRows(JSON.parse(pData[0]));
                PurchaseInvoice_OpeningBalance_BindTableRows(JSON.parse(pData[5]));
                FadePageCover(false);


            }
            , null);
       }

    }
}

function PurchaseInvoice_BindTableRows(pPurchaseInvoice) {
    window.IsOpeningBalanceFlexi = false;
    debugger;
    ClearAllTableRows("tblPurchaseInvoice");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    //var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pPurchaseInvoice, function (i, item) {
        AppendRowtoTable("tblPurchaseInvoice",
            ("<tr ID='" + item.ID + "' " + ((OEPurInv && $("#hIsOperationDisabled").val() == false && !item.IsApproved) ? ("ondblclick='SetIsOpeningBalanceFlexi(false);PurchaseInvoice_FillControls(" + item.ID + "," + item.OperationID + "," + item.MasterOperationID + " , false);'") : " class='static-text-primary' ") + ">"
        ////("<tr ID='" + item.ID + "'>"
                    + "<td class='PurchaseInvoiceID'> <input" + (!item.IsApproved && ODPurInv ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PurchaseInvoiceOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='PurchaseInvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                    + "<td class='PurchaseInvoiceInvoiceNumber hide'>" + item.InvoiceNumber + "</td>"
                    + "<td class='PurchaseInvoiceEditableCode'>" + item.EditableCode + "</td>"
                    + "<td class='PurchaseInvoiceClientOperationPartnerID hide'>" + item.ClientOperationPartnerID + "</td>"
                    + "<td class='PurchaseInvoiceClientOperationPartnerName'>" + (item.ClientOperationPartnerID == 0 ? "" : item.ClientPartnerName) + "</td>"
                    + "<td class='PurchaseInvoiceSupplierOperationPartnerID hide'>" + item.SupplierOperationPartnerID + "</td>"
                    + "<td class='PurchaseInvoiceSupplierOperationPartnerName'>" + (item.SupplierOperationPartnerID == 0 ? "" : item.SupplierPartnerName) + "</td>"
                    + "<td class='PurchaseInvoiceAmount'>" + item.Amount + "</td>"
                    + "<td class='PurchaseInvoiceCurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='PurchaseInvoiceCurrencyCode'>" + item.CurrencyCode + "</td>"
                    + "<td class='PurchaseInvoiceExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    + "<td class='PurchaseInvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                    + "<td class='PurchaseInvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                    + "<td class='PurchaseInvoiceNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
        //            + "<td class='PurchaseInvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
        //            + "<td class='PurchaseInvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
        //            + "<td class='PurchaseInvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
        //            + "<td class='PurchaseInvoiceTaxAmount hide'>" + item.TaxAmount + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
        //            + "<td class='PurchaseInvoiceDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='PurchaseInvoiceClientAddressID hide'>" + item.ClientAddressID + "</td>"
                    + "<td class='PurchaseInvoiceSupplierAddressID hide'>" + item.SupplierAddressID + "</td>"
                    + "<td class='PurchaseInvoicePaymentTermID hide'>" + item.PaymentTermID + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
        //            //+ "<td class='hide'><a onclick='PurchaseInvoice_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
        //            //+ ($("#hIsOperationDisabled").val() == false
        //            //    ? "<td class=''><a onclick='PurchaseInvoice_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
        //            //    : "<td></td>")
                    + "<td class=''><a onclick='PurchaseInvoice_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    ////ApplyPermissions();
    //$("#cbPrintBankDetailsForNewPurchaseInvoice").prop("checked", true);
    if (OAPurInv && $("#hIsOperationDisabled").val() == false) { $("#btn-NewPurchaseInvoice").removeClass("hide"); } else { $("#btn-NewPurchaseInvoice").addClass("hide"); }
    if (ODPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoice").removeClass("hide"); else $("#btn-DeletePurchaseInvoice").addClass("hide");
    BindAllCheckboxonTable("tblPurchaseInvoice", "PurchaseInvoiceID", "cb-CheckAll-PurchaseInvoice");
    CheckAllCheckbox("HeaderDeletePurchaseInvoiceID");

    //HighlightText("#tblPurchaseInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PurchaseInvoice_OpeningBalance_BindTableRows(pPurchaseInvoice) {
    window.IsOpeningBalanceFlexi = true;
    debugger;
    ClearAllTableRows("tblPurchaseInvoice_OpeningBalance");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    //var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pPurchaseInvoice, function (i, item) {
        AppendRowtoTable("tblPurchaseInvoice_OpeningBalance",
            ("<tr ID='" + item.ID + "' " + ((OEPurInv && $("#hIsOperationDisabled").val() == false && !item.IsApproved &&  item.SC_TransactionID == 0) ? ("ondblclick='SetIsOpeningBalanceFlexi(true);PurchaseInvoice_FillControls(" + item.ID + "," + item.OperationID + "," + item.MasterOperationID + ",true);'") : " class='static-text-primary' ") + ">"
                ////("<tr ID='" + item.ID + "'>"
                + "<td class='PurchaseInvoiceID'> <input" + (!item.IsApproved && ODPurInv ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='PurchaseInvoiceOperationID hide'>" + item.OperationID + "</td>"
                + "<td class='PurchaseInvoiceMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                + "<td class='PurchaseInvoiceInvoiceNumber hide'>" + item.InvoiceNumber + "</td>"
                + "<td class='PurchaseInvoiceEditableCode'>" + item.EditableCode + "</td>"
                + "<td class='PurchaseInvoiceClientOperationPartnerID hide'>" + item.ClientOperationPartnerID + "</td>"
                + "<td class='PurchaseInvoiceClientOperationPartnerName'>" + (item.ClientOperationPartnerID == 0 ? "" : item.ClientPartnerName) + "</td>"
                + "<td class='PurchaseInvoiceSupplierOperationPartnerID hide'>" + item.SupplierOperationPartnerID + "</td>"
                + "<td class='PurchaseInvoiceSupplierOperationPartnerName'>" + (item.SupplierOperationPartnerID == 0 ? "" : item.SupplierPartnerName) + "</td>"
                + "<td class='PurchaseInvoiceAmount'>" + item.Amount + "</td>"
                + "<td class='PurchaseInvoiceCurrencyID hide'>" + item.CurrencyID + "</td>"
                + "<td class='PurchaseInvoiceCurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='PurchaseInvoiceExchangeRate hide'>" + item.ExchangeRate + "</td>"
                + "<td class='PurchaseInvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                + "<td class='PurchaseInvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                + "<td class='PurchaseInvoiceNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //            + "<td class='PurchaseInvoiceAmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
                //            + "<td class='PurchaseInvoiceTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                //            + "<td class='PurchaseInvoiceTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                //            + "<td class='PurchaseInvoiceTaxAmount hide'>" + item.TaxAmount + "</td>"
                //            + "<td class='PurchaseInvoiceDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                //            + "<td class='PurchaseInvoiceDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                //            + "<td class='PurchaseInvoiceDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                + "<td class='PurchaseInvoiceClientAddressID hide'>" + item.ClientAddressID + "</td>"
                + "<td class='PurchaseInvoiceSupplierAddressID hide'>" + item.SupplierAddressID + "</td>"
                + "<td class='PurchaseInvoicePaymentTermID hide'>" + item.PaymentTermID + "</td>"
                + "<td class='IsApproved'> " + (item.SC_TransactionID != 0 ? (" <h3><i class='fa fa-cubes icon'><b class='bg-warning'></b></i></h3>") : "") +"<input type='checkbox' class='hide' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                //            //+ "<td class='hide'><a onclick='PurchaseInvoice_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                //            //+ ($("#hIsOperationDisabled").val() == false
                //            //    ? "<td class=''><a onclick='PurchaseInvoice_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                //            //    : "<td></td>")
                + "<td class=''><a class='hide' onclick='PurchaseInvoice_OpeningBalance_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //$("#cbPrintBankDetailsForNewPurchaseInvoice").prop("checked", true);
    if (OAPurInv && $("#hIsOperationDisabled").val() == false) { $("#btn-NewPurchaseInvoice").removeClass("hide"); } else { $("#btn-NewPurchaseInvoice").addClass("hide"); }
    if (ODPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoice").removeClass("hide"); else $("#btn-DeletePurchaseInvoice").addClass("hide");
    BindAllCheckboxonTable("tblPurchaseInvoice_OpeningBalance", "PurchaseInvoiceID", "cb-CheckAll-PurchaseInvoice_OpeningBalance");
    CheckAllCheckbox("HeaderDeletePurchaseInvoiceID_OpeningBalance");

    //HighlightText("#tblPurchaseInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}


function SetIsOpeningBalanceFlexi(IsFromOpeningBalanceFlexi)
{
    debugger
    window.IsFromOpeningBalanceFlexi = IsFromOpeningBalanceFlexi;
    $('#cbIsOpeningBalanceFlexi').prop('checked', IsFromOpeningBalanceFlexi);

}


var RowsCounter = 0;
var IsInsert = true;
var TransTypeID = 20;
var _IsApproved = false;
var RollBackData = {};

var all_has_store = false;
function SC_TransactionsForFlexi_BindTableRows(pSC_Transactions) {
    debugger;
    // $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_TransactionsForExportFlexi");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_TransactionsForExportFlexi",
            ("<tr ID='" + item.ID + (item.IsApproved == true ? "'" : "'  ondblclick='SC_TransactionsForFlexi_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'") + ">" 
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='PartnerName' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
                + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
                + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                + "<td class='MaterialRequestCode hide' val='" + item.MaterialRequestCode + "'>" + item.MaterialRequestCode + "</td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='SLInvoiceID hide' val='" + item.SLInvoiceID + "'>" + item.SLInvoiceID + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientID + "</td>"
                + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
                + "<td class='IsSpareParts hide' val='" + item.IsSpareParts + "'>" + item.IsSpareParts + "</td>"
                + "<td class='FiscalYearID hide' val='" + item.FiscalYearID + "'>" + item.FiscalYearID + "</td>"
                + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"
                + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
                + "<td class='JV_ID hide' val='" + item.JV_ID + "'>" + item.JV_ID + "</td>"
                + "<td class='IsOutOfStore hide' val='" + item.IsOutOfStore + "'>" + item.IsOutOfStore + "</td>"
                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"
                + "<td class='FromStore hide' val='" + item.FromStore + "'>" + item.FromStore + "</td>"
                + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"
                + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
                + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"
                + '<td><button id="btn-DeletePurchaseInvoiceItem1" type="button" class="float-right btn btn-sm btn-danger ' + (item.IsApproved == true ? 'hide' : '' ) +'" onclick="SC_TransactionsForFlexi_Delete( ' + item.ID + ' ,\'' + GetDateFromServer(item.TransactionDate) + '\');"><i class="fa fa-trash-o"></i>&nbsp;Delete</button></td>'
                + '<td><button id="btn-DeletePurchaseInvoiceItem2" type="button" class="float-right btn btn-sm btn-warning ' + (item.IsApproved == true ? '' : '') + '" onclick="PrintTransactionForFlexi(' + item.ID + ');"><i class=""></i>&nbsp;Print</button></td>'

               
               
               + "<td class='hSC_Transactions hide'><a href='#' data-toggle='modal' onclick='SC_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

      

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSC_TransactionsForExportFlexi", "ID");
    CheckAllCheckbox("ID");
    $("#btn-DeletePurchaseInvoice").addClass("hide"); 
    $("#btn-NewPurchaseInvoice").removeClass("hide"); 

  //  $("#btn-DeletePurchaseInvoice").addClass("hide");
}
var CurrencyIDForFlexi = 0;
var CurrencyExchangeRateForFlexi = 0;
var FlexiItem = null ;
function PurchaseInvoice_ClearAllControls() {
    window.IsOpeningBalanceFlexi = false;
    $('#cbIsOpeningBalanceFlexi').prop('disabled', false);
    debugger;
    ClearAll("#PurchaseInvoiceModal", null);
    if ($("#hShipmentType").val() == constFlexiShipmentType) {
        FlexiSerial_SetProperties(1);
    }

    $("#slPurchaseInvoiceType").removeAttr("disabled");

    $("#hTransactionID").val("0");
    $('#btn-AddPurchaseInvoiceItem').removeClass('hide');
    $('#slSC_Stores').prop('disabled', false);
    $('#slPurchaseInvoiceOperationCustomer').prop('disabled', false);
    $('#txtPurchaseInvoiceDate').prop('disabled', false);


    $("#tblPurchaseInvoiceItem tbody").html("");
    $("#tblSC_Items tbody").html("");
    $("#txtPurchaseInvoiceDate").val(getTodaysDateInddMMyyyyFormat());
    debugger;
    $("#slPurchaseInvoiceCurrency").val($("#hDefaultCurrencyID").val());
    $("#slPurchaseInvoiceCustomerAddress").html('<option value="0">'+TranslateString("SelectFromMenu")+'</option>');
    $("#slPurchaseInvoiceSupplierAddress").html('<option value="0">'+TranslateString("SelectFromMenu")+'</option>');
    $("#txtPurchaseInvoiceAmount").val(0);
    $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
    $("#txtPurchaseInvoiceExchangeRate").val(1);
    //InvoiceOperations_GetList($("#hOperationID").val(), "slPurchaseInvoiceOperations");
    //InvoicePartners_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationCustomer", null);
    //InvoiceSuppliers_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationSupplier", null);
    var pWhereClauseInvoiceOperations = "";
    pWhereClauseInvoiceOperations = " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + " OR ID = " + $("#hMasterOperationID").val() + " OR MasterOperationID = " + $("#hMasterOperationID").val();

    //var pWhereClauseInvoiceClients = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    var pWhereClauseInvoiceClients = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
    pWhereClauseInvoiceClients += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceClients += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
   
    if (!($("#cbIsFlexi").prop('checked')))
    pWhereClauseInvoiceClients += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    else
    pWhereClauseInvoiceClients += " )";

    pWhereClauseInvoiceClients += " ORDER BY PartnerTypeName ";
    //var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
   

    var pWhereClauseInvoiceSuppliers = "" ;


    pWhereClauseInvoiceSuppliers = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
    pWhereClauseInvoiceSuppliers += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceSuppliers += " AND (PartnerTypeID = " + constSupplierPartnerTypeID;
    pWhereClauseInvoiceSuppliers += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClauseInvoiceSuppliers += " ORDER BY PartnerTypeName ";

    var pControllerParameters = {
        pPurchaseInvoiceID: 0
        , pWhereClauseInvoiceOperations: pWhereClauseInvoiceOperations
        , pWhereClauseInvoiceClients: pWhereClauseInvoiceClients
        , pWhereClauseInvoiceSuppliers: pWhereClauseInvoiceSuppliers
    };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_LoadWithDetails"
        , pControllerParameters
        , function (pData) {
            var pHeader = JSON.parse(pData[0]);
            var pPurchaseInvoiceItems = JSON.parse(pData[1]);
            var pInvoiceOperations = pData[2];
            var pOperationClient = pData[3];
            var pOperationSupplier = pData[4];
            var pPaymentTerm = pData[5];
            var pStores = pData[6];
            FlexiItem = JSON.parse(pData[7]);
            FillListFromObject(null, 14/*OperationsWithHouse*/, null, "slPurchaseInvoiceOperations", pInvoiceOperations, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationCustomer", pOperationClient, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationSupplier", pOperationSupplier, null);
            FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slPurchaseInvoicePaymentTerm", pPaymentTerm, null);
            debugger
            //FillListFromObject(null, 2, "<--Select-->", 'slStores', pStores, null);
            Fill_SelectInputAfterLoadData(pStores, 'ID', 'StoreName', null, '#slSC_Stores', '');
            FadePageCover(false);

            //Update For Currency in Flexi
            if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
                CurrencyIDForFlexi = JSON.parse(pData[8]).length > 0 ? JSON.parse(pData[8])[0].ID : 0;
                CurrencyExchangeRateForFlexi = JSON.parse(pData[9]).length > 0 ? JSON.parse(pData[9])[0].ExchangeRate : 0;
                $('#slPurchaseInvoiceCurrency').val(CurrencyIDForFlexi);
                $("#txtPurchaseInvoiceExchangeRate").val(CurrencyExchangeRateForFlexi);
            }
        }
        , null);
    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoice_Insert(false, false);");
    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoice_Insert(false, true);");
    jQuery("#PurchaseInvoiceModal").modal("show");
}
function PurchaseInvoice_FillControls(pPurchaseInvoiceID, pOperationID, pMasterOperationID , pIsOpeningBalanceFlexi) {
    debugger;
    window.IsOpeningBalanceFlexi = pIsOpeningBalanceFlexi;
    ClearAll("#PurchaseInvoiceModal", null);
    if ($("#hShipmentType").val() == constFlexiShipmentType) {
        FlexiSerial_SetProperties(1);
    }
   

    $("#tblPurchaseInvoiceItem tbody").html("");
    $("#hPurchaseInvoiceID").val(pPurchaseInvoiceID);
    SetIsOpeningBalanceFlexi((typeof pIsOpeningBalanceFlexi !== "undefined" && pIsOpeningBalanceFlexi != null ? pIsOpeningBalanceFlexi : false));

    var tr = (window.IsOpeningBalanceFlexi ? $("#tblPurchaseInvoice_OpeningBalance tr[ID='" + pPurchaseInvoiceID + "']") :  $("#tblPurchaseInvoice tr[ID='" + pPurchaseInvoiceID + "']"));
    var pMasterOperationID = $(tr).find("td.PurchaseInvoiceMasterOperationID").text();
    var pClientOperationPartnerID = $(tr).find("td.PurchaseInvoiceClientOperationPartnerID").text();
    var pSupplierOperationPartnerID = $(tr).find("td.PurchaseInvoiceSupplierOperationPartnerID").text();

    jQuery("#PurchaseInvoiceModal").modal("show");
    $('#cbIsOpeningBalanceFlexi').prop("disabled", true);

    FadePageCover(true);
    var pWhereClauseInvoiceOperations = "";
    pWhereClauseInvoiceOperations = " WHERE ID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR ID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID;

    //var pWhereClauseInvoiceClients = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    var pWhereClauseInvoiceClients = " WHERE OperationID = " + pOperationID + " \n";
    pWhereClauseInvoiceClients += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceClients += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    pWhereClauseInvoiceClients += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClauseInvoiceClients += " OR ID = " + pClientOperationPartnerID;
    pWhereClauseInvoiceClients += " ORDER BY PartnerTypeName ";
    //var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR OperationID=" + pMasterOperationID + ")" + " \n";
    pWhereClauseInvoiceSuppliers += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceSuppliers += " AND (PartnerTypeID = " + constSupplierPartnerTypeID;
    pWhereClauseInvoiceSuppliers += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClauseInvoiceSuppliers += " OR ID = " + pSupplierOperationPartnerID;
    pWhereClauseInvoiceSuppliers += " ORDER BY PartnerTypeName ";

    var pControllerParameters = {
        pPurchaseInvoiceID: pPurchaseInvoiceID
        , pWhereClauseInvoiceOperations: pWhereClauseInvoiceOperations
        , pWhereClauseInvoiceClients: pWhereClauseInvoiceClients
        , pWhereClauseInvoiceSuppliers: pWhereClauseInvoiceSuppliers
    };

        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_LoadWithDetails"
            , pControllerParameters
            , function (pData) {
                var pHeader = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[10]) :  JSON.parse(pData[0]));
                var pPurchaseInvoiceItems = JSON.parse(pData[1]);
                var pPurchaseInvoiceItems_OpeningBalance = JSON.parse(pData[11]);
                var pInvoiceOperations = pData[2];
                var pOperationClient = pData[3];
                var pOperationSupplier = pData[4];
                var pPaymentTerm = pData[5];

                $("#slPurchaseInvoiceType").val(pHeader.InvoiceTypeID == 0 ? "" : pHeader.InvoiceTypeID);

                FillListFromObject(pHeader.OperationID, 14/*OperationsWithHouse*/, null, "slPurchaseInvoiceOperations", pInvoiceOperations, null);
                FillListFromObject(pHeader.ClientOperationPartnerID, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationCustomer", pOperationClient
                    , function () {
                        InvoiceAddressTypes_GetList(pHeader.ClientAddressID, "slPurchaseInvoiceCustomerAddress", "slPurchaseInvoiceOperationCustomer", null);
                    });
                FillListFromObject(pHeader.SupplierOperationPartnerID, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationSupplier", pOperationSupplier
                    , function () {
                        InvoiceAddressTypes_GetList(pHeader.SupplierAddressID, "slPurchaseInvoiceSupplierAddress", "slPurchaseInvoiceOperationSupplier", null);
                    });
                FillListFromObject_ERP(pHeader.PaymentTermID, 2, TranslateString("SelectFromMenu"), "slPurchaseInvoicePaymentTerm", pPaymentTerm, null);

                if (window.IsOpeningBalanceFlexi)
                $('#cbIsOpeningBalanceFlexi').prop("checked", true);

                PurchaseInvoiceItem_BindTableRows((window.IsOpeningBalanceFlexi ? pPurchaseInvoiceItems_OpeningBalance : pPurchaseInvoiceItems));


                $("#txtPurchaseInvoiceNumber").val(pHeader.EditableCode == 0 ? "" : pHeader.EditableCode);
                $("#txtPurchaseInvoiceAmount").val(pHeader.Amount);
                debugger;
                $("#slPurchaseInvoiceCurrency").val(pHeader.CurrencyID);
                $("#txtPurchaseInvoiceExchangeRate").val(pHeader.ExchangeRate);
                $("#txtPurchaseInvoiceDate").val(ConvertDateFormat(GetDateWithFormatMDY(pHeader.InvoiceDate)));
                $("#txtPurchaseInvoiceNotes").val(pHeader.Notes == 0 ? "" : pHeader.Notes);
                if (pHeader.CurrencyID == $("#hDefaultCurrencyID").val())
                    $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
                else
                    $("#txtPurchaseInvoiceExchangeRate").removeAttr("disabled");
                FadePageCover(false);
            }
            , null);



    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoiceItem_Save(false, false);");
    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoiceItem_Save(false, true);");
}
function PurchaseInvoice_Save(pSaveAndNew, pPrint) {
    debugger;
    if ($("#hPurchaseInvoiceID").val() == "")
        swal("Sorry", "Please, enter at least one item.");
    else if ($("#txtPurchaseInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchaseInvoiceExchangeRate").val()) == 0)
        swal("Sorry", "Exchange Rate must have a value.");
    else if (ValidateForm("form", "PurchaseInvoiceModal")) {
        var pParametersWithValues = {
            //Header
            pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
            , pEditableCode: $("#txtPurchaseInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseInvoiceNumber").val() //effects only update
            , pOperationID: $("#slPurchaseInvoiceOperations").val() == "" ? 0 : $("#slPurchaseInvoiceOperations").val()
            , pClientOperationPartnerID: $("#slPurchaseInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchaseInvoiceOperationCustomer").val()
            , pClientAddressID: $("#slPurchaseInvoiceCustomerAddress").val()
            , pClientPrintedAddress: 0
            , pSupplierOperationPartnerID: $("#slPurchaseInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseInvoiceOperationSupplier").val()
            , pSupplierAddressID: $("#slPurchaseInvoiceSupplierAddress").val()
            , pSupplierPrintedAddress: 0
            , pCurrencyID: $("#slPurchaseInvoiceCurrency").val()
            , pExchangeRate: $("#txtPurchaseInvoiceExchangeRate").val()
            , pInvoiceDate: $("#txtPurchaseInvoiceDate").val()
            , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
            , pPaymentTermID: $("#slPurchaseInvoicePaymentTerm").val()
            , pInvoiceTypeID: $("#slPurchaseInvoiceType").val() == "" ? 0 : $("#slPurchaseInvoiceType").val()
            //, pBranchID: $("#hUserBranchID").val()

            //LoadWithPaging parameters
            , pWhereClausePurchaseInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
            , pPageSize: 99999 //$("#select-page-size").val()
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID"
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    PurchaseInvoice_BindTableRows(JSON.parse(pData[0])); //pPurchaseInvoice: pData[0]
                    if (pSaveAndNew)
                        PurchaseInvoice_ClearAllControls();
                    else
                        jQuery("#PurchaseInvoiceModal").modal("hide");
                    if (pPrint)
                        PurchaseInvoice_Print($("#hPurchaseInvoiceID").val());
                    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoice_Save(false, false);");
                    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoice_Save(false, true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}

function PurchaseInvoice_DeleteList() 
{
    debugger;

    var pDeletedPurchaseInvoiceIDs = "";


    pDeletedPurchaseInvoiceIDs = GetAllSelectedIDsAsString('tblPurchaseInvoice');

    //Confirmation message to delete
    if (pDeletedPurchaseInvoiceIDs != "")
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
            CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_Delete"
                , {
                    pDeletedPurchaseInvoiceIDs: pDeletedPurchaseInvoiceIDs
                    , pOperationID: $("#hOperationID").val()
                }
                , function (pData) {
                    if (!pData[0])
                        swal("Sorry", "One or more records have dependencies.");
                    var pPurchaseInvoice = JSON.parse(pData[1]);
                    PurchaseInvoice_BindTableRows(pPurchaseInvoice);
                    FadePageCover(false);
                }
                , null);
        });
}
function PurchaseInvoice_OpeningBalance_DeleteList() {
    debugger;

    var pDeletedPurchaseInvoiceIDs = "";


    pDeletedPurchaseInvoiceIDs = GetAllSelectedIDsAsString('tblPurchaseInvoice_OpeningBalance');

    //Confirmation message to delete
    if (pDeletedPurchaseInvoiceIDs != "")
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
                CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_OpeningBalance_Delete"
                    , {
                        pDeletedPurchaseInvoiceIDs: pDeletedPurchaseInvoiceIDs
                        , pOperationID: $("#hOperationID").val()
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", "One or more records have dependencies.");
                        var pPurchaseInvoice = JSON.parse(pData[1]);
                        PurchaseInvoice_OpeningBalance_BindTableRows(pPurchaseInvoice);
                        FadePageCover(false);
                    }
                    , null);
            });
}
function PurchaseInvoice_CurrencyChanged() {
    debugger;
    if ($("#slPurchaseInvoiceCurrency").val() == $("#hDefaultCurrencyID").val())
        $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPurchaseInvoiceExchangeRate").removeAttr("disabled");
    $("#txtPurchaseInvoiceExchangeRate").val($("#slPurchaseInvoiceCurrency option:selected").attr("MasterDataExchangeRate"));
}
function PurchaseingInvoice_CurrencyChanged() {
    debugger;
    if ($("#slPurchaseingInvoiceCurrency").val() == $("#hDefaultCurrencyID").val())
        $("#txtPurchaseingInvoiceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPurchaseingInvoiceExchangeRate").removeAttr("disabled");
    $("#txtPurchaseingInvoiceExchangeRate").val($("#slPurchaseingInvoiceCurrency option:selected").attr("MasterDataExchangeRate"));
}
function PurchaseInvoice_OperationChanged(pClientOperationPartnerID, pSupplierOperationPartnerID) {
    debugger;
    FadePageCover(true);
    $("#slPurchaseInvoiceCustomerAddress").html('<option value="0">'+TranslateString("SelectFromMenu")+'</option>');
    //$("#slPurchaseInvoiceSupplierAddress").html('<option value="0">Select Address Type</option>'); //because supplier is not changed with houses
    InvoicePartners_GetList(pClientOperationPartnerID, $("#slPurchaseInvoiceOperations").val(), "slPurchaseInvoiceOperationCustomer"
        , function () { FadePageCover(false); });
    ////supplier always take from master operation 
    //InvoiceSuppliers_GetList(pSupplierOperationPartnerID, $("#slPurchaseInvoiceOperations").val(), "slPurchaseInvoiceOperationSupplier", null);
}
function PurchaseInvoice_Print(pID) {
    if (!window.IsOpeningBalanceFlexi)
    {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_GetDataToPrint"
            , { pPrintedPurchaseInvoiceID: pID }
            , function (pData) {
                var pPurchaseInvoiceHeader = JSON.parse(pData[0]);
                var pPurchaseInvoiceItems = JSON.parse(pData[1]);
                var pOperationHeader = JSON.parse(pData[2]);
                var pDefaults = JSON.parse(pData[3]);
                var pMasterOperationHeader = JSON.parse(pData[4]);
                var _VATReceivableItemsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceivables", "nameExcludePurchase");
                var _NotSelectedReceivablesTotal = PurchaseInvoice_GetNotSelectedReceivablesTotal(pPurchaseInvoiceHeader.CurrencyID, pPurchaseInvoiceHeader.ExchangeRate);
                var _SubTotal = pPurchaseInvoiceHeader.AmountWithoutVAT + parseFloat(_NotSelectedReceivablesTotal);
                var _VATTotal = 0;
                if (_VATReceivableItemsIDs != "" && $("#cbAddReceivablesToPurchaseInvoice").prop("checked"))
                    _VATTotal = PurchaseInvoice_GetVATReceivableItemsTotal(pPurchaseInvoiceHeader.CurrencyID, pPurchaseInvoiceHeader.ExchangeRate);
                var _TotalWithVAT = _SubTotal + parseFloat(_VATTotal);
                var mywindow = window.open('', '_blank');
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                //ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + 'CompanyHeader.jpg' + '" alt="logo"/></div>';
                //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
                ReportHTML += '                 <div class="col-xs-7 m-t">';
                ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                ReportHTML += '                     <b>' + (pDefaults.AddressLine1 == 0 ? "" : (pDefaults.AddressLine1 + '</b><br>'));
                ReportHTML += '                     <b>' + (pDefaults.AddressLine2 == 0 ? "" : (pDefaults.AddressLine2 + '</b><br>'));
                ReportHTML += '                     <b>' + (pDefaults.AddressLine3 == 0 ? "" : (pDefaults.AddressLine3) + '</b><br>');
                if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                    ReportHTML += '                     <b>' + 'Contact : Khaled Saleh' + '</b><br>';
                    ReportHTML += '                     <b>' + 'Email : accounting@nilelogistics.com' + '</b><br>';
                }
                ReportHTML += '                     <b>' + (pDefaults.Phones == 0 ? "" : ('TEL:' + pDefaults.Phones) + '</b><br>');
                ReportHTML += '                     <b>' + (pDefaults.Faxes == 0 ? "" : ('Fax:' + pDefaults.Faxes)) + '</b><br><br><br>';
                ReportHTML += '                 </div>';

                ReportHTML += '                 <div class="col-xs-5 m-t m-l-n">';
                //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                ReportHTML += '                     <b>Invoice # : </b>' + pPurchaseInvoiceHeader.ConcatenatedInvoiceNumber + '<br>';
                ReportHTML += '                     <b>Date : </b>' + $("#tblPurchaseInvoice #" + pID + " td.PurchaseInvoiceDate").text() + '<br>';
                ReportHTML += '                     <b>Bill To : </b>' + $("#tblPurchaseInvoice #" + pID + " td.PurchaseInvoiceClientOperationPartnerName").text() + '<br>';
                ReportHTML += '                     <b>Address : </b>';
                ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressStreetLine1 == 0 ? "" : (pPurchaseInvoiceHeader.ClientAddressStreetLine1));
                ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressStreetLine2 == 0 ? "" : (", " + pPurchaseInvoiceHeader.ClientAddressStreetLine2));
                ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressCityName == 0 ? "" : ("," + pPurchaseInvoiceHeader.ClientAddressCityName));
                ReportHTML += '                         ' + (pPurchaseInvoiceHeader.ClientAddressCountryName == 0 ? "" : ("," + pPurchaseInvoiceHeader.ClientAddressCountryName));
                ReportHTML += '                         ' + '<br>';
                //if ($("#cbPrintMBL").prop("checked"))
                ReportHTML += '                 <b>' + (pOperationHeader.TransportType == 2 ? 'AWB #' : 'MB/L No.') + ': </b>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '<br>';
                //if ($("#cbPrintHBL").prop("checked")) {
                //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                //        ReportHTML += '             <b>HBL</b>: ' + (pOperationHeader.HouseBLs == 0 ? "" : pOperationHeader.HouseBLs) + '<br>';
                //    else if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                //        ReportHTML += '             <b>HB/L No.:</b> ' + (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) + '<br>';
                //}
                ReportHTML += '                     <b>Weight : </b>' + pOperationHeader.GrossWeightSum + ' KG ' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) : (" - " + pOperationHeader.PackageTypes)) + '<br>';
                if (pOperationHeader.MasterOperationCode != "0")
                    ReportHTML += '                 <b>Operation : </b>' + pOperationHeader.MasterOperationCode;
                else
                    ReportHTML += '                     <b>Operation : </b>' + pOperationHeader.Code + '<br>';
                ReportHTML += '                     <b>PO No : </b>' + (pOperationHeader.PONumber == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.PONumber == 0 ? "" : pMasterOperationHeader.PONumber) : pOperationHeader.PONumber) + '<br>';
                ReportHTML += '                     <b>SO Ref : </b>' + (pOperationHeader.SupplierReference == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.SupplierReference == 0 ? "" : pMasterOperationHeader.SupplierReference) : pOperationHeader.SupplierReference) + '<br>';
                ReportHTML += '                 </div>';
                //ReportHTML += '             </div>';

                ReportHTML += '             <div class="col-xs-12 clear">';
                ReportHTML += '                 <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                ReportHTML += '                     <thead>';
                ReportHTML += '                         <tr>';
                ReportHTML += '                             <th>Description</th>';
                ReportHTML += '                             <th>Part No</th>';
                ReportHTML += '                             <th>Quantity</th>';
                ReportHTML += '                             <th>Unit Price</th>';
                ReportHTML += '                             <th>Sale Price</th>';
                ReportHTML += '                         </tr>';
                ReportHTML += '                     </thead>';
                ReportHTML += '                     <tbody>';
                $.each(pPurchaseInvoiceItems, function (i, item) {
                    ReportHTML += '                         <tr class="input-md" style="font-size:95%;">';
                    //ReportHTML += '                             <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                    ReportHTML += '                             <td>' + item.PurchaseItemName + '</td>';
                    ReportHTML += '                             <td>' + (item.PartNumber == 0 ? "" : item.PartNumber) + '</td>';
                    ReportHTML += '                             <td>' + item.Quantity + '</td>';
                    ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchaseInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.UnitPrice + (item.UnitPrice * _NotSelectedReceivablesTotal / pPurchaseInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                    ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchaseInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.Amount + (item.Amount * _NotSelectedReceivablesTotal / pPurchaseInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                    ReportHTML += '                         </tr>';
                });
                ReportHTML += '                     </tbody>';
                ReportHTML += '                 </table>';
                ReportHTML += '             </div>'
                //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                //ReportHTML += '                         </div>';
                //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                ReportHTML += '                         <div class="col-xs-7 m-t-n">';
                //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                //}
                //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                //}
                //else {
                ReportHTML += '</br>';
                //}
                ReportHTML += '                         </div>';
                ReportHTML += '                         <div class="col-xs-5 text-right m-t-n">';
                //if (pPurchaseInvoiceHeader.TaxAmount != 0 || pPurchaseInvoiceHeader.DiscountAmount != 0)
                //    ReportHTML += '                             <b>Subtotal: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _SubTotal + '</br>';
                //if (pPurchaseInvoiceHeader.TaxAmount != 0)
                //    ReportHTML += '                             <b>VAT(' + pPurchaseInvoiceHeader.TaxPercentage + '%): </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + pPurchaseInvoiceHeader.TaxAmount + '</br>';
                //if (pPurchaseInvoiceHeader.DiscountAmount != 0)
                //    ReportHTML += '                             <b>Discount Taxes(' + pPurchaseInvoiceHeader.DiscountPercentage + '%): </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + pPurchaseInvoiceHeader.DiscountAmount + '</br>';
                //if ($("#cbAddReceivablesToPurchaseInvoice").prop("checked"))
                debugger;
                if (_VATTotal != 0) {
                    ReportHTML += '                             <b>Subtotal: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _SubTotal.toFixed(2) + '</br>';
                    for (var i = 0; i < _VATReceivableItemsIDs.split(',').length; i++) {
                        var _itemVATAmount = 0;
                        if ($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableCurrency").attr("val") == pPurchaseInvoiceHeader.CurrencyID)
                            _itemVATAmount = $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text();
                        else
                            _itemVATAmount = (parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text()) * parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableExchangeRate").text()) / pPurchaseInvoiceHeader.ExchangeRate).toFixed(2);
                        ReportHTML += '                             <b>' + $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.Receivable").text() + ': </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' ' + _itemVATAmount + '</br>';
                    }
                }
                //ReportHTML += '                             <b>Total: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' <b>' + pPurchaseInvoiceHeader.Amount + '</b></br>';
                //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pPurchaseInvoiceHeader.Amount) + ' ' + pPurchaseInvoiceHeader.CurrencyCode + '</br>';
                ReportHTML += '                             <b>Total: </b>' + pPurchaseInvoiceHeader.CurrencyCode + ' <b>' + _TotalWithVAT + '</b></br>';
                ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(_TotalWithVAT) + ' ' + pPurchaseInvoiceHeader.CurrencyCode + '</br>';
                ReportHTML += '                         </div>';
                //ReportHTML += '                     </div>'; //of table-responsive
                //ReportHTML += '                 </section>';
                //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                ReportHTML += '         </body>';

                //ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                ReportHTML += '     <footer class="footer col-xs-12 ' + " hide " + '" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row">'
                //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices #" + pID + " td.DirectionType").text() == 1
                //                                                                ? 'Import Manager'
                //                                                                : ($("#tblInvoices #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                //                                                                ) + '</i></b></div>';
                //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                //ReportHTML += '         </div>'
                //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
                FadePageCover(false);
            }
            , null);
    }
}
function PurchaseInvoice_GetNotSelectedReceivablesTotal(pPurchaseInvoiceCurrencyID, pPurchaseInvoiceExchangeRate) {
    debugger;
    var _NotSelectedReceivablesTotal = 0;
    var pNotExcludedReceivbalesIDs = GetAllNOTSelectedIDsAsStringWithNameAttr("nameExcludePurchase");
    if ($("#cbAddReceivablesToPurchaseInvoice").prop("checked") && pNotExcludedReceivbalesIDs != "") { //print w/o adding receivable values
        for (var i = 0; i < pNotExcludedReceivbalesIDs.split(',').length; i++) {
            //$("#tblReceivables tbody tr#"+pNotExcludedReceivbalesIDs.split(',')[i] + " td.ReceivableExchangeRate").text()
            var _ReceivableExchangeRate = parseFloat($("#tblReceivables tbody tr#" + pNotExcludedReceivbalesIDs.split(',')[i] + " td.ReceivableExchangeRate").text());
            var _ReceivableSaleAmount = parseFloat($("#tblReceivables tbody tr#" + pNotExcludedReceivbalesIDs.split(',')[i] + " td.ReceivableSaleAmount").text());
            var _ReceivableCurrencyID = $("#tblReceivables tbody tr#" + pNotExcludedReceivbalesIDs.split(',')[i] + " td.ReceivableCurrency").attr("val");
            if (_ReceivableCurrencyID == pPurchaseInvoiceCurrencyID)
                _NotSelectedReceivablesTotal += _ReceivableSaleAmount;
            else
                _NotSelectedReceivablesTotal += _ReceivableExchangeRate * _ReceivableSaleAmount / pPurchaseInvoiceExchangeRate;
        }
    }
    return _NotSelectedReceivablesTotal.toFixed(2);
}
function PurchaseInvoice_GetVATReceivableItemsTotal(pPurchaseInvoiceCurrencyID, pPurchaseInvoiceExchangeRate) {
    debugger;
    var _VATTotal = 0;
    if ($("#cbAddReceivablesToPurchaseInvoice").prop("checked")) { //print w/o adding receivable values
        var pVATReceivableItemsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceivables", "nameExcludePurchase");
        for (var i = 0; i < pVATReceivableItemsIDs.split(',').length; i++) {
            //$("#tblReceivables tbody tr#"+pVATReceivableItemsIDs.split(',')[i] + " td.ReceivableExchangeRate").text()
            var _ReceivableExchangeRate = parseFloat($("#tblReceivables tbody tr#" + pVATReceivableItemsIDs.split(',')[i] + " td.ReceivableExchangeRate").text());
            var _ReceivableSaleAmount = parseFloat($("#tblReceivables tbody tr#" + pVATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text());
            var _ReceivableCurrencyID = $("#tblReceivables tbody tr#" + pVATReceivableItemsIDs.split(',')[i] + " td.ReceivableCurrency").attr("val");
            if (_ReceivableCurrencyID == pPurchaseInvoiceCurrencyID)
                _VATTotal += _ReceivableSaleAmount;
            else
                _VATTotal += _ReceivableExchangeRate * _ReceivableSaleAmount / pPurchaseInvoiceExchangeRate;
        }
    }
    return _VATTotal.toFixed(2);
}
/*******************Purchase Invoice Details*********************/
function PurchaseInvoiceItem_BindTableRows(pTableRows) {
    
        debugger;
        ClearAllTableRows("tblPurchaseInvoiceItem");
        //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        //var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
        //var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
        //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
        //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
        //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
        var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblPurchaseInvoiceItem",
                ("<tr ID='" + item.ID + "' "
                    //+ (" ondblclick='PurchaseInvoiceItem_EditByDblClick(" + item.ID + ");' ")
                    + (
                        ((item.IsApproved && OEPurInv) || (item.IsFlexi && $("#cbIsExport").prop("checked")))
                        ? ""//(" class='text-danger' ")
                        : (" ondblclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' ")
                        )
                    + ">"
                        + "<td class='PurchaseInvoiceItemID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                        + "<td class='PurchaseInvoiceID hide'>" + item.PurchaseInvoiceID + "</td>"
                        + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                        + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                        + "<td class='PurchaseItemPartNumber " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.PartNumber == 0 ? "" : item.PartNumber) + "</td>"
                        + "<td class='PurchaseItemQuantity'>" + item.Quantity + "</td>"
                        + "<td class='PurchaseItemCountryOfOriginID hide'>" + item.CountryOfOriginID + "</td>"
                        + "<td class='PurchaseItemCountryOfOriginName " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.CountryOfOriginID == 0 ? "" : item.CountryOfOriginName) + "</td>"
                        + "<td class='PurchaseItemHSCode " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.HSCode == 0 ? "" : item.HSCode) + "</td>"
                        + "<td class='PurchaseItemUnitPrice " + (1 == 2 ? 'hide' : '') + "'>" + (item.UnitPrice == 0 ? "" : item.UnitPrice) + "</td>"
                        + "<td class='PurchaseItemAmount'>" + item.Amount + "</td>"
                        + "<td class='PurchaseItemNotes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                        + "<td class='" + (item.IsFlexi ? '' : 'hide') + "'>"
                            //+ "<a href='#PurchaseInvoiceItemModal' data-toggle='modal' onclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                            + "<a href='#FlexiSerialModal' data-toggle='modal' onclick='FlexiSerial_FillModal(" + item.ID + ");' " + serialControlsText + "</a>"
                        + "</td>"
                + "</tr>"));
        });
        //ApplyPermissions();
        if (OEPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoiceItem").removeClass("hide"); else $("#btn-DeletePurchaseInvoiceItem").addClass("hide");
        BindAllCheckboxonTable("tblPurchaseInvoiceItem", "PurchaseInvoiceItemID", "cbPurchaseInvoiceItemDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
        CheckAllCheckbox("HeaderDeletePurchaseInvoiceItemID");
        //HighlightText("#tblPurchaseInvoiceItem>tbody>tr", $("#txt-Search").val().trim());
        if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
            swal(strSorry, strDeleteFailMessage, "warning");
            showDeleteFailMessage = false;
        }
        $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

        if (pTableRows.length > 0)
            $("#slPurchaseInvoiceType").attr("disabled", "disabled");
        else
            $("#slPurchaseInvoiceType").removeAttr("disabled");

}

function PurchaseInvoiceItem_OpeningBalance_BindTableRows(pTableRows) 
    {
        debugger;
       ClearAllTableRows("tblPurchaseInvoiceItem_OpeningBalance");
        //var editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        //var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Cashier") + "</span>";
        //var notificationsControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-quote-left' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Notifications") + "</span>";
        //var cancelControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X &nbsp;&nbsp;&nbsp;</i> <span style='padding-right: 5px;'>" + "إلغاء" + "</span>";
        //var cancelledControlsText = " class='btn btn-xs btn-rounded btn-danger float-right' > <i class='fa ' style='padding-left: 5px;'>X </i> <span style='padding-right: 5px;'>" + "تم إلغائها" + "</span>";
        //var restoreControlsText = " class='btn btn-xs btn-rounded btn-warning float-right' > <i class='fa fa-undo' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "استعادة" + "</span>";
        var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
        $.each(pTableRows, function (i, item) {
            AppendRowtoTable("tblPurchaseInvoiceItem_OpeningBalance",
                ("<tr ID='" + item.ID + "' "
                    //+ (" ondblclick='PurchaseInvoiceItem_EditByDblClick(" + item.ID + ");' ")
                    + (
                        ((item.IsApproved && OEPurInv) || (item.IsFlexi && $("#cbIsExport").prop("checked")))
                            ? ""//(" class='text-danger' ")
                            : (" ondblclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' ")
                    )
                    + ">"
                    + "<td class='PurchaseInvoiceItemID'> <input " + (item.IsApproved ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PurchaseInvoiceID hide'>" + item.PurchaseInvoiceID + "</td>"
                    + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                    + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                    + "<td class='PurchaseItemPartNumber " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.PartNumber == 0 ? "" : item.PartNumber) + "</td>"
                    + "<td class='PurchaseItemQuantity'>" + item.Quantity + "</td>"
                    + "<td class='PurchaseItemCountryOfOriginID hide'>" + item.CountryOfOriginID + "</td>"
                    + "<td class='PurchaseItemCountryOfOriginName " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.CountryOfOriginID == 0 ? "" : item.CountryOfOriginName) + "</td>"
                    + "<td class='PurchaseItemHSCode " + (item.IsFlexi ? 'hide' : '') + "'>" + (item.HSCode == 0 ? "" : item.HSCode) + "</td>"
                    + "<td class='PurchaseItemUnitPrice " + (1 == 2 ? 'hide' : '') + "'>" + (item.UnitPrice == 0 ? "" : item.UnitPrice) + "</td>"
                    + "<td class='PurchaseItemAmount'>" + item.Amount + "</td>"
                    + "<td class='PurchaseItemNotes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='" + (item.IsFlexi ? '' : 'hide') + "'>"
                    //+ "<a href='#PurchaseInvoiceItemModal' data-toggle='modal' onclick='PurchaseInvoiceItem_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                    + "<a href='#FlexiSerialModal' data-toggle='modal' onclick='FlexiSerial_FillModal(" + item.ID + ");' " + serialControlsText + "</a>"
                    + "</td>"
                    + "</tr>"));
        });
        //ApplyPermissions();
        if (OEPurInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchaseInvoiceItem").removeClass("hide"); else $("#btn-DeletePurchaseInvoiceItem").addClass("hide");
        BindAllCheckboxonTable("tblPurchaseInvoiceItem", "PurchaseInvoiceItemID", "cbPurchaseInvoiceItemDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
        CheckAllCheckbox("HeaderDeletePurchaseInvoiceItemID");
        //HighlightText("#tblPurchaseInvoiceItem>tbody>tr", $("#txt-Search").val().trim());
        if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
            swal(strSorry, strDeleteFailMessage, "warning");
            showDeleteFailMessage = false;
        }
        $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    }

function PurchaseInvoiceItem_ClearAllControls() {
    debugger;
    //if ($("#txtPurchaseInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchaseInvoiceExchangeRate").val()) == 0)
    //    swal("Sorry", "Exchange Rate must have a value.");
    if ($("#hShipmentType").val() == constFlexiShipmentType && $("#tblPurchaseInvoiceItem tbody tr").length > 0)
        swal("Sorry", "Edit your flexis from the serials button.");
    else if (ValidateForm("form", "PurchaseInvoiceModal")) {
        if ($("#hShipmentType").val() == constFlexiShipmentType && $("#hDirectionType").val() == constImportDirectionType)
            $("#btnAddFlexiFromExcel").click();
        else if ($("#hShipmentType").val() == constFlexiShipmentType && $("#hDirectionType").val() == constExportDirectionType)
            FlexiSerial_FillModal();
        else {
            ClearAll("#PurchaseInvoiceItemModal", null);
            jQuery("#PurchaseInvoiceItemModal").modal("show");
            if ($("#slPurchaseInvoiceItem option").length == 0) {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_FillModalControls"
                    , { pWhereClausePurchaseItem: "ORDER BY Name" }
                    , function (pData) {
                        FillListFromObject_ERP(null, 11/*NameAndPriceAttr*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceItem", pData[0], null);
                        FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slPurchaseInvoiceItemCountryOfOrigin", pData[1], null);
                    }
                    , function () {
                        FadePageCover(false);
                    });
            }
            //$("#btnSavePurchaseInvoiceItem").attr("onclick", "PurchaseInvoiceItem_Save(false);");
            //$("#btnSaveAndNewPurchaseInvoiceItem").attr("onclick", "PurchaseInvoiceItem_Save(true);");
        } //else
    }//else if (ValidateForm("form", "PurchaseInvoiceModal")) {
}
function PurchaseInvoiceItem_FillControls(pID) {
    debugger;
    if ($("#txtPurchaseInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchaseInvoiceExchangeRate").val()) == 0)
        swal("Sorry", "Exchange Rate must have a value.");
    else if (ValidateForm("form", "PurchaseInvoiceModal")) {
        ClearAll("#PurchaseInvoiceItemModal", null);
        $("#hPurchaseInvoiceItemID").val(pID);
        jQuery("#PurchaseInvoiceItemModal").modal("show");

        var tr = $("#tblPurchaseInvoiceItem tr[ID='" + pID + "']");
        //var pItemID = $(tr).find("td.PurchaseItemID").text();

        if ($("#slPurchaseInvoiceItem option").length == 0) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_FillModalControls"
                , { pWhereClausePurchaseItem: "ORDER BY Name" }
                , function (pData) {
                    FillListFromObject_ERP($(tr).find("td.PurchaseItemID").text(), 11/*NameAndPriceAttr*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceItem", pData[0], null);
                    FillListFromObject_ERP($(tr).find("td.PurchaseItemCountryOfOriginID").text(), 2, TranslateString("SelectFromMenu"), "slPurchaseInvoiceItemCountryOfOrigin", pData[1], null);
                }
                , function () {
                    FadePageCover(false);
                });
        }
        else {
            $("#slPurchaseInvoiceItem").val($(tr).find("td.PurchaseItemID").text());
            $("#slPurchaseInvoiceItemCountryOfOrigin").val($(tr).find("td.PurchaseItemCountryOfOriginID").text());
        }
        $("#txtPurchaseInvoiceItemPartNumber").val($(tr).find("td.PurchaseItemPartNumber").text());
        $("#txtPurchaseInvoiceItemQuantity").val($(tr).find("td.PurchaseItemQuantity").text());
        $("#txtPurchaseInvoiceItemHSCode").val($(tr).find("td.PurchaseItemHSCode").text());
        $("#txtPurchaseInvoiceItemUnitPrice").val($(tr).find("td.PurchaseItemUnitPrice").text());

        $("#txtPurchaseInvoiceItemAmount").val($(tr).find("td.PurchaseItemAmount").text());
        $("#txtPurchaseInvoiceItemNotes").val($(tr).find("td.PurchaseItemNotes").text());

        //$("#btnSavePurchaseInvoiceItem").attr("onclick", "PurchaseInvoiceItem_Save(false);");
        //$("#btnSaveAndNewPurchaseInvoiceItem").attr("onclick", "PurchaseInvoiceItem_Save(true);");
    }
}

function PurchaseInvoiceItem_Save(pSaveAndNew) {
    debugger;
    //if (parseFloat($("#txtPurchaseInvoiceItemAmount").val()) == 0 || $("#txtPurchaseInvoiceItemAmount").val().trim() == "")
    //    swal("Sorry", "Please, enter quantity and price.");
    if (parseFloat($("#txtPurchaseInvoiceItemQuantity").val()) == 0 || $("#txtPurchaseInvoiceItemQuantity").val().trim() == "")
        swal("Sorry", "Please, enter quantity.");
    else if (ValidateForm("form", "PurchaseInvoiceItemModal")) {
        var pParametersWithValues = {
            //Header
            pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
            , pInvoiceNumber: 0
            , pEditableCode: $("#txtPurchaseInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseInvoiceNumber").val() //effects only update
            , pOperationID: $("#slPurchaseInvoiceOperations").val() == "" ? 0 : $("#slPurchaseInvoiceOperations").val()
            , pClientOperationPartnerID: $("#slPurchaseInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchaseInvoiceOperationCustomer").val()
            , pClientAddressID: $("#slPurchaseInvoiceCustomerAddress").val()
            , pClientPrintedAddress: 0
            , pSupplierOperationPartnerID: $("#slPurchaseInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseInvoiceOperationSupplier").val()
            , pSupplierAddressID: $("#slPurchaseInvoiceSupplierAddress").val()
            , pSupplierPrintedAddress: 0
            , pAmountWithoutVAT: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
            , pCurrencyID: $("#slPurchaseInvoiceCurrency").val()
            , pExchangeRate: $("#txtPurchaseInvoiceExchangeRate").val()
            , pInvoiceDate: ConvertDateFormat(GetDateWithFormatMDY($("#txtPurchaseInvoiceDate").val()))
            
            , pTaxTypeID: 0
            , pTaxPercentage: 0
            , pTaxAmount: 0
            , pDiscountTypeID: 0
            , pDiscountPercentage: 0
            , pDiscountAmount: 0
            , pAmount: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
            , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
            , pBranchID: $("#slOperationEditBranch").val() //$("#hUserBranchID").val()
            , pIsApproved: false
            , pIsDeleted: false
            , pApprovingUserID: 0
            , pPaymentTermID: $("#slPurchaseInvoicePaymentTerm").val()
            
            //LoadWithPaging parameters
            , pWhereClausePurchaseInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
            , pPageSize: 99999 //$("#select-page-size").val()
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID"
            //PurchaseInvoiceItem
            , pPurchaseInvoiceItemID: $("#hPurchaseInvoiceItemID").val() == "" ? 0 : $("#hPurchaseInvoiceItemID").val()
            , pItemID: $("#slPurchaseInvoiceItem").val()
            , pItemAmount: $("#txtPurchaseInvoiceItemUnitPrice").val() == "" ? 0 : (parseFloat($("#txtPurchaseInvoiceItemUnitPrice").val()) * parseFloat($("#txtPurchaseInvoiceItemQuantity").val())).toFixed(3)
            , pItemNotes: $("#txtPurchaseInvoiceItemNotes").val().trim() == "" ? "0" : $("#txtPurchaseInvoiceItemNotes").val().trim().toUpperCase()
            , pUnitPrice: $("#txtPurchaseInvoiceItemUnitPrice").val() == "" ? 0 : $("#txtPurchaseInvoiceItemUnitPrice").val()
            , pQuantity: $("#txtPurchaseInvoiceItemQuantity").val() == "" ? 0 : $("#txtPurchaseInvoiceItemQuantity").val()
            , pPartNumber: $("#txtPurchaseInvoiceItemPartNumber").val().trim() == "" ? 0 : $("#txtPurchaseInvoiceItemPartNumber").val().trim().toUpperCase()
            , pCountryOfOriginID: $("#slPurchaseInvoiceItemCountryOfOrigin").val()
            , pHSCode: $("#txtPurchaseInvoiceItemHSCode").val().trim() == "" ? 0 : $("#txtPurchaseInvoiceItemHSCode").val().trim().toUpperCase()
            , pIsFromOpeningBalanceFlexi: window.IsOpeningBalanceFlexi
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //var _Payables = JSON.parse(pData[6]); //delete if no update
                    //Payables_BindTableRows(_Payables); //delete if no update
                    $("#hPurchaseInvoiceID").val(pData[1]);
                    $("#txtPurchaseInvoiceNumber").val(pData[2]);
                    
                    PurchaseInvoiceItem_BindTableRows(JSON.parse(pData[3])); //pPurchaseInvoiceItem: pData[3]

                    if (window.IsOpeningBalanceFlexi)
                    PurchaseInvoice_OpeningBalance_BindTableRows(JSON.parse(pData[4]));
                    else
                    PurchaseInvoice_BindTableRows(JSON.parse(pData[4])); //pPurchaseInvoice: pData[4]

                    $("#txtPurchaseInvoiceAmount").val(pData[5]); //pPurchaseInvoiceAmount:pData[5]
                    if (pSaveAndNew)
                        PurchaseInvoiceItem_ClearAllControls();
                    else
                        jQuery("#PurchaseInvoiceItemModal").modal("hide");
                    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoiceItem_Save(false, false);");
                    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoiceItem_Save(false, true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function PurchaseInvoiceItem_DeleteList() {
    debugger;
    var pDeletedPurchaseInvoiceItemIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblPurchaseInvoiceItem", "Delete");
    if (pDeletedPurchaseInvoiceItemIDs != "")
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
            if (ValidateForm("form", "PurchaseInvoiceModal")) {
                var pParametersWithValues = {
                    //Header
                    pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
                    , pEditableCode: $("#txtPurchaseInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseInvoiceNumber").val() //effects only update
                    , pOperationID: $("#slPurchaseInvoiceOperations").val() == "" ? 0 : $("#slPurchaseInvoiceOperations").val()
                    , pClientOperationPartnerID: $("#slPurchaseInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchaseInvoiceOperationCustomer").val()
                    , pClientAddressID: $("#slPurchaseInvoiceCustomerAddress").val()
                    , pClientPrintedAddress: 0
                    , pSupplierOperationPartnerID: $("#slPurchaseInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseInvoiceOperationSupplier").val()
                    , pSupplierAddressID: $("#slPurchaseInvoiceSupplierAddress").val()
                    , pSupplierPrintedAddress: 0
                    , pCurrencyID: $("#slPurchaseInvoiceCurrency").val()
                    , pExchangeRate: $("#txtPurchaseInvoiceExchangeRate").val()
                    , pInvoiceDate: $("#txtPurchaseInvoiceDate").val()
                    , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
                    , pPaymentTermID: $("#slPurchaseInvoicePaymentTerm").val()
                    //, pBranchID: $("#hUserBranchID").val()

                    //LoadWithPaging parameters
                    , pWhereClausePurchaseInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
                    , pPageSize: 99999 //$("#select-page-size").val()
                    , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID"
                    //DeletePurchaseInvoiceItemIDs
                    , pDeletedPurchaseInvoiceItemIDs: pDeletedPurchaseInvoiceItemIDs
                };
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            var _Payables = JSON.parse(pData[3]);
                            PurchaseInvoiceItem_BindTableRows(JSON.parse(pData[0])); //pPurchaseInvoiceItem: pData[0]
                            PurchaseInvoice_BindTableRows(JSON.parse(pData[1])); //pPurchaseInvoice: pData[1]
                            $("#txtPurchaseInvoiceAmount").val(pData[2]); //Amount
                            Payables_BindTableRows(_Payables);
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        });//of swal
}
function PurchaseInvoiceItem_CalculateAmount(pIsResetUnitPrice) { //reset for case of PurchaseItem change
    debugger;
    var _UnitPrice = 0;
    if (pIsResetUnitPrice)
        _UnitPrice = $("#slPurchaseInvoiceItem option:selected").attr("Price");
    else
        _UnitPrice = $("#txtPurchaseInvoiceItemUnitPrice").val() == "" ? 0 : $("#txtPurchaseInvoiceItemUnitPrice").val();
    var _Quantity = $("#txtPurchaseInvoiceItemQuantity").val() == "" ? 0 : $("#txtPurchaseInvoiceItemQuantity").val();
    var _Amount = _UnitPrice * _Quantity;
    $("#txtPurchaseInvoiceItemUnitPrice").val(_UnitPrice);
    $("#txtPurchaseInvoiceItemAmount").val(_Amount.toFixed(3));
    return $("#txtPurchaseInvoiceItemAmount").val();
}
/*******************Flexi Import*********************/
function FlexiSerial_BindTableRows(pFlexi, pContainerList) {
    debugger;
    $("#tblAvailableFlexi tbody tr").html("");
    $.each(pFlexi, function (i, item) {
        AppendRowtoTable("tblAvailableFlexi",
        ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='Flexi_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>"
            + "<td class='ID'> <input " + (item.ExportOperationID == 0 || !$("#cbIsImport").prop("checked") ? " name='Delete' " : " disabled='disabled' ") + (item.ExportPurchaseInvoiceID != 0 && !$("#cbIsImport").prop("checked")/*because if import this checkbox is used for delete*/ ? " checked='checked' " : "") + " type='checkbox' id='cbIsFlexiSelected" + item.ID + "' value='" + item.ID + "'></td>"
            //+ "<td class='PurchaseItemID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiPurchaseItemID" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.PurchaseItemID + "' /> </td>"
            + "<td class='Code'> <input " + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiCode" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.Code + "' /> </td>"
            + "<td class='ExportPrice'> <input" + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiExportPrice" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.ExportPrice + "' /> </td>"
            //+ "<td class='ContainerNumber'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiContainerNumber" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' /> </td>"
            + ($("#cbIsImport").prop("checked")
                ? "<td class='ContainerNumber'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiContainerNumber" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' /> </td>"
                : ("<td class='Container'> <select " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%;' id='slFlexiContainer" + item.ID + "' class='form-control controlStyle text-center' data-required='false'></select></td>")
              )
            + "<td class='Notes'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiNotes" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='"
                                + ($("#cbIsImport").prop("checked") && item.ExportOperationID > 0
                                    ? ("Added to " + item.ExportOperationCode)
                                    : (item.Notes == 0 ? "" : item.Notes)
                                   ) + "' /> </td>"
            //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            + "<td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='hide'><a href='#FlexiModal' data-toggle='modal' onclick='Flexi_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    if (!$("#cbIsImport").prop("checked"))
        $.each(pFlexi, function (i, item) {
            FillListFromObject(item.ContainerID, 1/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slFlexiContainer" + item.ID, pContainerList, null);
        });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblAvailableFlexi", "ID", "cb-CheckAll-Flexi");
    CheckAllCheckbox("HeaderDeleteFlexiID");
    HighlightText("#tblAvailableFlexi>tbody>tr", $("#txtSearchFlexiItems").val().trim());
}
//pFlexiOption: 0-NotFlexi
function FlexiSerial_SetProperties(pFlexiOption) {
    debugger;
    if (pFlexiOption > 0) {
        $(".classHideForFlexi").addClass("hide");
        $(".classDisableForFlexi").attr("disabled", "disabled");
        $("#h3ModalLblPurchaseInvoiceType").text("Flexi");
        $("#slPurchaseInvoiceOperationSupplier").attr("data-required", false);
    }
}
function FlexiSerial_FillSingleFlexiSerialModal() {
    debugger;
    ClearAll("#SingleFlexiSerialModal");
    jQuery("#SingleFlexiSerialModal").modal("show");
}
function FlexiSerial_SaveSingleFlexiSerial() {
    debugger;
    if (ValidateForm("form", "SingleFlexiSerialModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pSingFlexiSerialID: $("#hSingleFlexiSerialID").val() == "" ? 0 : $("#hSingleFlexiSerialID").val()
            , pOperationID: $("#hOperationID").val()
            , pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
            , pPurchaseInvoiceItemID: $("#hPurchaseInvoiceItemID").val() == "" ? 0 : $("#hPurchaseInvoiceItemID").val()
            , pCode: $("#txtSingleFlexiSerialCode").val().trim() == "" ? 0 : $("#txtSingleFlexiSerialCode").val().trim().toUpperCase()
            , pIsFromOpeningBalanceFlexi: window.IsFromOpeningBalanceFlexi
        };
        CallGETFunctionWithParameters("/api/PurchaseInvoice/Flexi_SaveSingleFlexiSerial", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var _PurchaseInvoiceHeader =( window.IsOpeningBalanceFlexi ? JSON.parse(pData[6]) : JSON.parse(pData[1]));
                var _PurchaseInvoice = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[7]) : JSON.parse(pData[2]));
                var _PurchaseInvoiceItems = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[8]) : JSON.parse(pData[3]));
                var _Flexi = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[9]): JSON.parse(pData[4]));
                var _ContainerList = pData[5];
                if (_MessageReturned == "")
                {
                    $("#txtPurchaseInvoiceAmount").val(_PurchaseInvoiceHeader.Amount);
                    FlexiSerial_BindTableRows(_Flexi, $("#cbIsImport").prop("checked") ? null : _ContainerList);
                     PurchaseInvoiceItem_BindTableRows(_PurchaseInvoiceItems);
                    (window.IsOpeningBalanceFlexi == true ? PurchaseInvoice_OpeningBalance_BindTableRows(_PurchaseInvoice) :  PurchaseInvoice_BindTableRows(_PurchaseInvoice));
                    swal("Success", "Saved Successfully.");
                    ClearAll("#SingleFlexiSerialModal");
                    //jQuery("#SingleFlexiSerialModal").modal("hide");
                }
                else {
                    swal("Sorry", _MessageReturned);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function FlexiSerial_FillModal(pPurchaseInvoiceItemID ) {
    debugger;
    if (ValidateForm("form", "PurchaseInvoiceModal")) {
        FadePageCover(true);
        $("#tblAvailableFlexi tbody tr").html("");
        var pWhereClauseFlexi = "";
        var pFlexiPurchaseInvoiceItemID = $("#tblPurchaseInvoiceItem tbody tr").length == 0 ? 0 : $("#tblPurchaseInvoiceItem tbody tr")[0].id;
        if (pPurchaseInvoiceItemID != undefined)
            $("#hPurchaseInvoiceItemID").val(pPurchaseInvoiceItemID);
        else {
            $("#hPurchaseInvoiceItemID").val(pFlexiPurchaseInvoiceItemID);
        }
        if ($("#cbIsImport").prop("checked"))
        {
            if (window.IsOpeningBalanceFlexi) 
                pWhereClauseFlexi = "WHERE (ImportPurchaseInvoice_OpeningBalanceItemID =" + pFlexiPurchaseInvoiceItemID + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            else
            pWhereClauseFlexi = "WHERE (ImportPurchaseInvoiceItemID=" + pFlexiPurchaseInvoiceItemID + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            $(".classShowFlexiImport").removeClass("hide");
        }
        else
        { //Export
            pWhereClauseFlexi = "WHERE (ExportPurchaseInvoiceItemID IS NULL OR ExportPurchaseInvoiceItemID=" + $('#hTransactionID').val() + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            $(".classShowFlexiExport").removeClass("hide");
            $("#btnCheckboxesFlexiListApply").attr("onclick", "FlexiExport_SaveSelectedItems();");
            $("#btnCheckboxesFlexiListApply").html("<span class='glyphicon glyphicon-save'></span> Save Flexi");
        }
        jQuery("#CheckboxesListFlexiModal").modal("show");
        $("#btn-SearchItems-Flexi").attr("onclick", "FlexiSerial_FillModal();");
        var pParametersWithValues = {
            pWhereClauseFlexi: pWhereClauseFlexi
            , pOperationID: $("#hOperationID").val()
            , pOrderBy: "ExportPurchaseInvoiceID desc,Code"
        };
        CallGETFunctionWithParameters("/api/PurchaseInvoice/Flexi_LoadAll", pParametersWithValues
            , function (pData) {
                var _Flexi = JSON.parse(pData[0]);
                var _ContainerList = pData[1];
                var _Flexi_OpeningBalance = JSON.parse(pData[2]);
                FlexiSerial_BindTableRows((window.IsOpeningBalanceFlexi ? _Flexi_OpeningBalance : _Flexi ) , $("#cbIsImport").prop("checked") ? null : _ContainerList);
                FadePageCover(false);
            }
            , null);
    }
}
//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function FlexiImport_onFileSelected(event/*, pPurcharseInvoiceItemID*/) {
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
                if (oJS.length > 0 && oJS[0].Code != undefined) //if (sCSV != "")
                    FlexiImport_ImportFromExcelFile(oJS);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#btnAddFlexiFromExcel").val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function FlexiImport_ImportFromExcelFile(pDataRows) {
    debugger;
    if ($("#slPurchaseInvoiceType").val() == "") {
        swal("Sorry", "Please, select invoice type.");
        $("#btnAddFlexiFromExcel").val("");
    }
    else {
        FadePageCover(true);
        var pCodeList = "";
        //var pNameList = "";
        //var pPartNumberList = "";
        //var pHSCodeList = "";
        //var pPriceList = "";
        for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
            pCodeList += (pCodeList == "" ? (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pNameList += (pNameList == "" ? (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pPartNumberList += (pPartNumberList == "" ? (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pHSCodeList += (pHSCodeList == "" ? (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            //pPriceList += (pPriceList == "" ? (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        }
        var pParametersWithValues = {
            //Header
            pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
            , pInvoiceNumber: 0
            , pEditableCode: $("#txtPurchaseInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseInvoiceNumber").val() //effects only update
            , pOperationID: $("#slPurchaseInvoiceOperations").val() == "" ? 0 : $("#slPurchaseInvoiceOperations").val()
            , pClientOperationPartnerID: $("#slPurchaseInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchaseInvoiceOperationCustomer").val()
            , pClientAddressID: $("#slPurchaseInvoiceCustomerAddress").val()
            , pClientPrintedAddress: 0
            , pSupplierOperationPartnerID: $("#slPurchaseInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseInvoiceOperationSupplier").val()
            , pSupplierAddressID: $("#slPurchaseInvoiceSupplierAddress").val()
            , pSupplierPrintedAddress: 0
            , pAmountWithoutVAT: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
            , pCurrencyID: $("#slPurchaseInvoiceCurrency").val()
            , pExchangeRate: $("#txtPurchaseInvoiceExchangeRate").val()
            , pInvoiceDate: $("#txtPurchaseInvoiceDate").val()
            , pTaxTypeID: 0
            , pTaxPercentage: 0
            , pTaxAmount: 0
            , pDiscountTypeID: 0
            , pDiscountPercentage: 0
            , pDiscountAmount: 0
            , pAmount: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
            , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
            , pBranchID: $("#slOperationEditBranch").val() //$("#hUserBranchID").val()
            , pIsApproved: false
            , pIsDeleted: false
            , pApprovingUserID: 0
            , pPaymentTermID: $("#slPurchaseInvoicePaymentTerm").val()
            , pInvoiceTypeID: $("#slPurchaseInvoiceType").val() == "" ? 0 : $("#slPurchaseInvoiceType").val()
            , pInvoiceTypeName: $("#slPurchaseInvoiceType option:selected").text()
            //LoadWithPaging parameters
            , pWhereClausePurchaseInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
            , pPageSize: 99999 //$("#select-page-size").val()
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID"
            //PurchaseInvoiceItem
            , pCodeList: pCodeList
            //, pNameList: pNameList
            //, pPartNumberList: pPartNumberList
            //, pHSCodeList: pHSCodeList
            //, pPriceList: pPriceList
            , pIsOpeningBalanceFlexi: $("#cbIsOpeningBalanceFlexi").is(":checked")
        };
        CallPOSTFunctionWithParameters("/api/PurchaseInvoice/FlexiImport_SaveList", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var _PurchaseInvoiceHeader = JSON.parse(pData[1]);
                var _PurchaseInvoice = JSON.parse(pData[2]);
                var _PurchaseInvoiceItems = JSON.parse(pData[3]);
                if (_MessageReturned == "") {
                    $("#hPurchaseInvoiceID").val(_PurchaseInvoiceHeader.ID);
                    $("#txtPurchaseInvoiceNumber").val(_PurchaseInvoiceHeader.InvoiceNumber);
                    $("#txtPurchaseInvoiceAmount").val(_PurchaseInvoiceHeader.Amount);






                    PurchaseInvoiceItem_BindTableRows(_PurchaseInvoiceItems);

                    if ($("#cbIsOpeningBalanceFlexi").is(":checked")) {
                        window.IsOpeningBalanceFlexi = true;
                        PurchaseInvoice_OpeningBalance_BindTableRows(_PurchaseInvoice);
                    }
                    else {
                        window.IsOpeningBalanceFlexi = false;
                        PurchaseInvoice_BindTableRows(_PurchaseInvoice);
                    }




                    $("#cbIsOpeningBalanceFlexi").prop('disabled', true);


                    swal("Success", "Saved Successfully.");
                }
                else {
                    swal("Sorry", "Please revise data and version of the file." + _MessageReturned);
                }
                FadePageCover(false);
            }
            , null);
        $("#btnAddFlexiFromExcel").val(""); //if removed the last selected file remains till unselected
    }
}
function FlexiImport_DeleteFlexiSerial() {
    debugger;
    var pDeletedFlexiImportIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");
    if (pDeletedFlexiImportIDs == "") {
        swal(strSorry, "Please select at least one item.");
        FadePageCover(false);
    }
    else {
        //Confirmation message to delete
        if (pDeletedFlexiImportIDs != "")
            swal({
                title: "Are you sure?",
                text: "The deleted records will be deleted permanently.",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Delete!",
                closeOnConfirm: true
            },
            //callback function in case of confirm delete
            function () {
                var pParametersWithValues = {
                    pDeletedFlexiImportIDs: pDeletedFlexiImportIDs
                    , pOperationID: $("#hOperationID").val()
                    , pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
                    , pPurchaseInvoiceItemID: $("#hPurchaseInvoiceItemID").val() == "" ? 0 : $("#hPurchaseInvoiceItemID").val()
                };
                CallGETFunctionWithParameters("/api/PurchaseInvoice/FlexiImport_DeleteList", pParametersWithValues
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        var _PurchaseInvoiceHeader = JSON.parse(pData[1]);
                        var _PurchaseInvoice = JSON.parse(pData[2]);
                        var _PurchaseInvoiceItems = JSON.parse(pData[3]);
                        var _Flexi = JSON.parse(pData[4]);
                        var _ContainerList = pData[5];
                        if (_MessageReturned == "") {
                            $("#txtPurchaseInvoiceAmount").val(_PurchaseInvoiceHeader.Amount);
                            FlexiSerial_BindTableRows(_Flexi, $("#cbIsImport").prop("checked") ? null : _ContainerList);
                            PurchaseInvoiceItem_BindTableRows(_PurchaseInvoiceItems);
                            PurchaseInvoice_BindTableRows(_PurchaseInvoice);
                            swal("Success", "Saved Successfully.");
                        }
                        else {
                            swal("Sorry", _MessageReturned);
                        }
                        FadePageCover(false);
                    }
                    , null);
            });
    }
}
/*******************Flexi Export*********************/
function FlexiExport_SaveSelectedItems() {
    debugger;
    FadePageCover(true);
    var pSelectedFlexiSerialIDList = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");
    var pFlexiSerialIDList = GetAllIDsAsStringWithNameAttr("tblAvailableFlexi", "Delete");
    var pPricesList =  GetAllSelectedPriceAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");




    if (pFlexiSerialIDList == "") {
        swal("Sorry", "No available flexis.");
        FadePageCover(false);
    }
    else {
        var pFlexiPurchaseInvoiceItemID = $("#tblPurchaseInvoiceItem tbody tr").length == 0 ? 0 : $("#tblPurchaseInvoiceItem tbody tr")[0].id;
        var pIsFlexiSelected = "";
        var pFlexiExportPriceList = "";
        var pFlexiContainerIDList = "";
        var pFlexiNotesList = "";
        var NumberOfRows = pFlexiSerialIDList.split(',').length;
        var NumberOfSelectedRows = pSelectedFlexiSerialIDList.split(',').length;
        for (var i = 0; i < NumberOfRows; i++) {
            var currentRowID = pFlexiSerialIDList.split(",")[i];
            pIsFlexiSelected += ((pIsFlexiSelected == "") ? "" : ",") + ($("#cbIsFlexiSelected" + currentRowID).prop("checked") ? "1" : "0");
            pFlexiExportPriceList += ((pFlexiExportPriceList == "") ? "" : ",") + ($("#txtFlexiExportPrice" + currentRowID).val().trim() == "" ? "0" : $("#txtFlexiExportPrice" + currentRowID).val().trim().toUpperCase());
            pFlexiContainerIDList += ((pFlexiContainerIDList == "") ? "" : ",") + ($("#slFlexiContainer" + currentRowID).val().trim() == "" ? "0" : $("#slFlexiContainer" + currentRowID).val().trim().toUpperCase());
            pFlexiNotesList += ((pFlexiNotesList == "") ? "" : ",") + ($("#txtFlexiNotes" + currentRowID).val().trim() == "" ? "0" : $("#txtFlexiNotes" + currentRowID).val().trim().toUpperCase());
       


            if (i == NumberOfRows - 1)
            {

                var SumOfPrice = SumOfArrayOfString(pPricesList.split(','));
                console.log(" sum : " + SumOfPrice );

                var _Flexi = new Object();
                _Flexi.ItemID = FlexiItem[0].ID;
                _Flexi.Qty = IsNull( NumberOfSelectedRows , 0 ) ;
                _Flexi.Price = SumOfPrice ;
                _Flexi.UnitID = FlexiItem[0].PackageTypeID ;
                _Flexi.CurrencyID = FlexiItem[0].CurrencyID;
               
               _Flexi.pIsFlexiSelected = pIsFlexiSelected ;
                _Flexi.pFlexiExportPriceList = pFlexiExportPriceList;
                _Flexi.pFlexiContainerIDList = pFlexiContainerIDList;
                _Flexi.pFlexiNotesList = pFlexiNotesList;

                _Flexi.pFlexiSerialIDList = pFlexiSerialIDList;
                if(IsNull($('#hTransactionID').val() , "0") == "0")
                SC_Transactions_InsertForFlexi(false, _Flexi);
                else
                SC_Transactions_UpdateForFlexi(false, _Flexi);

            }
            
       }

    } //if (pFlexiSerialIDList != "") {
}
/****************************EOF PurchaseInvoice & PurchaseInvoiceDetails*******************************************/

/****************************PurchasingInvoice*******************************************/
function PurchasingInvoice_SubmenuTabClicked() {
    debugger;
    if ($("#cbIsFlexi").prop('checked') && $("#cbIsExport").prop('checked')) {
        window.IsOpeningBalanceFlexi = false;
        $('.forFLexiExport ').removeClass('hide');
        $('.forFlexiExport ').removeClass('hide');
        $('.hideForFLexiExport ').addClass('hide');
        $('.hideForFlexiExport ').addClass('hide');
        $("#hTransactionID").val("0");
        CallGETFunctionWithParameters("/api/SC_Transactions/LoadWithWhereClause",
            {
                pPageNumber: 1
                , pPageSize: 999999
                , pWhereClause: " WHERE OperationID=" + IsNull($("#hOperationID").val(), "0") + " AND IsNull(IsDeleted , 0) = 0 AND TransactionTypeID = 20 AND IsNull(IsFromFlexi , 0) = 1 "
            }
            , function (pData) { SC_TransactionsForFlexi_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
            , null);
    }
    else {
        window.IsOpeningBalanceFlexi = false;
        $("#hTransactionID").val("0");
        $('.forFlexiExport').addClass('hide');
        $('.forFLexiExport').addClass('hide');
        $('.hideForFLexiExport').removeClass('hide');
        debugger;
       // if ($("#tblPurchasingInvoice tbody tr").length == 0) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PurchaseingInvoice/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned",
                {
                    pIsLoadArrayOfObjects: false
                    , pPageNumber: 1
                    , pPageSize: 999999
                    //, pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val()) + " OR  MasterOperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
                    , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())

                    , pOrderBy: "ID"
                }
                , function (pData) {
                    PurchasingInvoice_BindTableRows(JSON.parse(pData[0]));
                    PurchasingInvoice_ClearAllControls();
                    //PurchasingInvoice_OpeningBalance_BindTableRows(JSON.parse(pData[5]));
                    FadePageCover(false);


                }
                , null);
        //}

    }
}

function PurchasingInvoice_BindTableRows(pPurchasingInvoice) {
    window.IsOpeningBalanceFlexi = false;
    debugger;
    ClearAllTableRows("tblPurchasingInvoice");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    //var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pPurchasingInvoice, function (i, item) {
        AppendRowtoTable("tblPurchasingInvoice",
            //("<tr ID='" + item.ID + "' " + ((OEPurchaseingInv && $("#hIsOperationDisabled").val() == false && !item.IsApproved) ? ("ondblclick='PurchasingInvoice_FillControls(" + item.ID + "," + item.OperationID + "," + item.MasterOperationID + " , false);'") : " class='static-text-primary' ") + ">"
                ("<tr ID='" + item.ID + "' ondblclick='PurchasingInvoice_FillControls(" + item.ID + ");'>"

        ////("<tr ID='" + item.ID + "'>"
                   // + "<td class='PurchasingInvoiceID'> <input" + (!item.IsApproved && ODPurInv ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='PurchasingInvoiceID'> <input" + (!item.IsApproved && ODPurInv ? " name='Delete' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"

                    + "<td class='PurchasingInvoiceOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='PurchasingInvoiceInvoiceNumber'>" + item.InvoiceNumber + "</td>"
                    + "<td class='PurchasingInvoiceSupplierOperationPartnerID hide'>" + item.SupplierOperationPartnerID + "</td>"
                    + "<td class='PurchasingInvoiceSupplierOperationPartnerName'>" + (item.SupplierOperationPartnerID == 0 ? "" : item.SupplierPartnerName) + "</td>"
                    + "<td class='PurchasingInvoiceAmount'>" + item.Amount + "</td>"
                    + "<td class='PurchasingInvoiceCurrencyID hide'>" + item.CurrencyID + "</td>"
                    + "<td class='PurchasingInvoiceCurrencyCode'>" + item.CurrencyCode + "</td>"
                    + "<td class='PurchasingInvoiceExchangeRate hide'>" + item.ExchangeRate + "</td>"
                    //+ "<td class='PurchasingInvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                    + "<td class='PurchasingInvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"

                    //+ "<td class='PurchasingInvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                   // + "<td class='PurchasingInvoiceDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate))) + "</td>"

                    + "<td class='PurchasingInvoiceNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                    + "<td class='PurchasingInvoiceSupplierAddressID hide'>" + item.SupplierAddressID + "</td>"
                    + "<td class='PurchasingInvoicePaymentTermID hide'>" + item.PaymentTermID + "</td>"
                    + "<td class='IsApproved'> <input id='cbIsApproved' type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
        //            //+ "<td class='hide'><a onclick='PurchasingInvoice_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
        //            //+ ($("#hIsOperationDisabled").val() == false
        //            //    ? "<td class=''><a onclick='PurchasingInvoice_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
        //            //    : "<td></td>")
                + "<td class='TaxTypeID hide'>" + item.TaxTypeID + "</td>"
                + "<td class='TaxPercentage hide'>" + item.TaxPercentage + "</td>"
                + "<td class='TaxAmount hide'>" + item.TaxAmount + "</td>"
                + "<td class='DiscountTypeID hide'>" + item.DiscountTypeID + "</td>"
                + "<td class='DiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                + "<td class='DiscountAmount hide'>" + item.DiscountAmount + "</td>"
                + "<td class='SupplierInvoiceNo hide'>" + item.SupplierInvoiceNo + "</td>"
                + "<td class='SupplierReceiptNo hide'>" + item.SupplierReceiptNo + "</td>"
                + "<td class='AmountWithoutVAT hide'>" + item.AmountWithoutVAT + "</td>"
                + "<td class='Amount hide'>" + item.Amount + "</td>"









                + "<td class='hide'><a onclick='PurchasingInvoice_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    ////ApplyPermissions();
    //$("#cbPrintBankDetailsForNewPurchasingInvoice").prop("checked", true);
    if (OAPurchaseingInv && $("#hIsOperationDisabled").val() == false) { $("#btn-NewPurchasingInvoice").removeClass("hide"); } else { $("#btn-NewPurchasingInvoice").addClass("hide"); }
    if (OAPurchaseingInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePurchasingInvoice").removeClass("hide"); else $("#btn-DeletePurchasingInvoice").addClass("hide");
    BindAllCheckboxonTable("tblPurchasingInvoice", "PurchasingInvoiceID", "cb-CheckAll-PurchaseingInvoice");
    CheckAllCheckbox("HeaderDeletePurchasingInvoiceID");

    //HighlightText("#tblPurchasingInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}

function PurchasingInvoiceItem_BindTableRows(pItems) {
    debugger;

    ItemsRowsCounter = 0;
    ClearAllTableRows("tblPurchaseingInvoiceItem");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblPurchaseingInvoiceItem",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
               
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ChargeTypeID' val='" + item.ChargeTypeID + "'>" + "<select id='ChargeType-" + (ItemsRowsCounter + 1) + "' tag='" + item.ChargeTypeID + "'class='input-sm  col-sm selectChargeType'>" + $('#hidden_slChargeType').html() + "</select>" + "</td>"
                + "<td class='Quantity' val='" + item.Quantity + "'>" + "<input tag='" + item.Quantity + "'   type='text' class='input_Quantity input-sm  col-sm'>" + "</td>"
                + "<td class='UnitPrice' val='" + item.UnitPrice + "'>" + "<input tag='" + item.UnitPrice + "'   type='text' class='input_UnitPrice input-sm  col-sm'>" + "</td>"
                + "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"


                + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
       // $("#tblItems").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblPurchaseingInvoiceItem").find("input,button,textarea").attr('onblur', 'CalculateTotal();');
        $("#tblPurchaseingInvoiceItem").find("input").attr('onblur', 'CalculateTotal();');


    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}

function FillItemsData() {
    $($('#tblPurchaseingInvoiceItem > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ChargeTypeID ').find('.selectChargeType').val($(tr).find('td.ChargeTypeID ').find('.selectChargeType').attr('tag'));
        $(tr).find('td.Quantity').find('.input_Quantity').val($(tr).find('td.Quantity ').find('.input_Quantity').attr('tag'));
        $(tr).find('td.UnitPrice ').find('.input_UnitPrice').val($(tr).find('td.UnitPrice ').find('.input_UnitPrice').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));

        if ($('#tblPurchaseingInvoiceItem > tbody > tr').length - 1 == i) {

            $("select.selectChargeType").each(function (i, sl) {
                if ($(sl).hasClass('IsAutoSelect') == false) {
                    $(sl).css({ 'width': '100%' }).select2();
                    $(sl).addClass('IsAutoSelect');
                    // $(sl).trigger("change");
                    $("div[tabindex='-1']").removeAttr('tabindex');
                }

            });
            //  CalculateAll();
            FadePageCover(false)
        }
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function SetIsOpeningBalanceFlexi(IsFromOpeningBalanceFlexi) {
    debugger
    window.IsFromOpeningBalanceFlexi = IsFromOpeningBalanceFlexi;
    $('#cbIsOpeningBalanceFlexi').prop('checked', IsFromOpeningBalanceFlexi);

}


var RowsCounter = 0;
var IsInsert = true;
var TransTypeID = 20;
var _IsApproved = false;
var RollBackData = {};

var all_has_store = false;
// Marwan
function SC_TransactionsForFlexi_BindTableRows_New(pSC_Transactions) {
    debugger;
    // $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_TransactionsForExportFlexi");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_TransactionsForExportFlexi",
            ("<tr ID='" + item.ID + (item.IsApproved == true ? "'" : "'  ondblclick='SC_TransactionsForFlexi_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'") + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='PartnerName' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
                + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='PurchasingInvoiceID hide' val='" + item.PurchasingInvoiceID + "'>" + item.PurchasingInvoiceID + "</td>"
                + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                + "<td class='MaterialRequestCode hide' val='" + item.MaterialRequestCode + "'>" + item.MaterialRequestCode + "</td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='SLInvoiceID hide' val='" + item.SLInvoiceID + "'>" + item.SLInvoiceID + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientID + "</td>"
                + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
                + "<td class='IsSpareParts hide' val='" + item.IsSpareParts + "'>" + item.IsSpareParts + "</td>"
                + "<td class='FiscalYearID hide' val='" + item.FiscalYearID + "'>" + item.FiscalYearID + "</td>"
                + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"
                + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
                + "<td class='JV_ID hide' val='" + item.JV_ID + "'>" + item.JV_ID + "</td>"
                + "<td class='IsOutOfStore hide' val='" + item.IsOutOfStore + "'>" + item.IsOutOfStore + "</td>"
                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"
                + "<td class='FromStore hide' val='" + item.FromStore + "'>" + item.FromStore + "</td>"
                + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"
                + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
                + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"
                + '<td><button id="btn-DeletePurchasingInvoiceItem1" type="button" class="float-right btn btn-sm btn-danger ' + (item.IsApproved == true ? 'hide' : '') + '" onclick="SC_TransactionsForFlexi_Delete( ' + item.ID + ' ,\'' + GetDateFromServer(item.TransactionDate) + '\');"><i class="fa fa-trash-o"></i>&nbsp;Delete</button></td>'
                + '<td><button id="btn-DeletePurchasingInvoiceItem2" type="button" class="float-right btn btn-sm btn-warning ' + (item.IsApproved == true ? '' : '') + '" onclick="PrintTransactionForFlexi(' + item.ID + ');"><i class=""></i>&nbsp;Print</button></td>'



               + "<td class='hSC_Transactions hide'><a href='#' data-toggle='modal' onclick='SC_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));



    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSC_TransactionsForExportFlexi", "ID");
    CheckAllCheckbox("ID");
    $("#btn-DeletePurchasingInvoice").addClass("hide");
    $("#btn-NewPurchasingInvoice").removeClass("hide");
    //  $("#btn-DeletePurchasingInvoice").addClass("hide");
}
var CurrencyIDForFlexi = 0;
var CurrencyExchangeRateForFlexi = 0;
var FlexiItem = null;
function PurchasingInvoiceInitialize() {
    ClearAll("#PurchaseingInvoiceModal", null);
    ClearAll("#tblPurchaseingInvoiceItem", null);
    ClearAllTableRows("tblPurchaseingInvoiceItem");
    jQuery("#PurchaseingInvoiceModal").modal("show");

    $("#btnSavePurchaseingInvoice").removeAttr("disabled");
    $("#slPurchaseingInvoiceCurrency").val($("#hDefaultCurrencyID").val());
    $("#txtPurchaseingInvoiceExchangeRate").attr("disabled", "disabled");
    $("#txtPurchaseingInvoiceExchangeRate").val(1);



}
function PurchasingInvoice_ClearAllControls() {
    window.IsOpeningBalanceFlexi = false;
    $('#cbIsOpeningBalanceFlexi').prop('disabled', false);
    debugger;
    //ClearAll("#PurchaseingInvoiceModal", null);
    //ClearAll("#tblPurchaseingInvoiceItem", null);
    //ClearAllTableRows("tblPurchaseingInvoiceItem");
    $("#btnSavePurchaseingInvoice").removeAttr("disabled");

    ClearAll("#PurchaseingInvoiceModal", null);

    $("#hTransactionID").val("0");
    $('#btn-AddPurchaseInvoiceItem').removeClass('hide');
   
    $('#slPurchaseingInvoiceOperationCustomer').prop('disabled', false);
    $('#txtPurchaseingInvoiceDate').prop('disabled', false);


    $("#tblPurchaseingInvoiceItem tbody").html("");
   
    $("#txtPurchaseingInvoiceDate").val(getTodaysDateInddMMyyyyFormat());
    debugger;
    $("#slPurchaseingInvoiceCurrency").val($("#hDefaultCurrencyID").val());
    $("#slPurchaseingInvoiceSupplierAddress").html('<option value="0">' + TranslateString("SelectFromMenu") + '</option>');
    $("#txtPurchaseingInvoiceAmount").val(0);
    $("#txtPurchaseingInvoiceExchangeRate").attr("disabled", "disabled");
    $("#txtPurchaseingInvoiceExchangeRate").val(1);
    //InvoiceOperations_GetList($("#hOperationID").val(), "slPurchaseInvoiceOperations");
    //InvoicePartners_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationCustomer", null);
    //InvoiceSuppliers_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationSupplier", null);
    var pWhereClauseInvoiceOperations = "";
    pWhereClauseInvoiceOperations = " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + " OR ID = " + $("#hMasterOperationID").val() + " OR MasterOperationID = " + $("#hMasterOperationID").val();

    //var pWhereClauseInvoiceClients = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    var pWhereClauseInvoiceClients = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
    pWhereClauseInvoiceClients += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceClients += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;

    if (!($("#cbIsFlexi").prop('checked')))
        pWhereClauseInvoiceClients += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    else
        pWhereClauseInvoiceClients += " )";

    pWhereClauseInvoiceClients += " ORDER BY PartnerTypeName ";
    //var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";


    var pWhereClauseInvoiceSuppliers = "";


    pWhereClauseInvoiceSuppliers = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
    pWhereClauseInvoiceSuppliers += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceSuppliers += " AND (PartnerTypeID = " + constSupplierPartnerTypeID;
    pWhereClauseInvoiceSuppliers += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    pWhereClauseInvoiceSuppliers += " ORDER BY PartnerTypeName ";

    var pControllerParameters = {
        pPurchaseInvoiceID: 0
        , pWhereClauseInvoiceOperations: pWhereClauseInvoiceOperations
        , pWhereClauseInvoiceClients: pWhereClauseInvoiceClients
        , pWhereClauseInvoiceSuppliers: pWhereClauseInvoiceSuppliers
    };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseingInvoice/PurchaseInvoice_LoadWithDetails"
        , pControllerParameters
        , function (pData) {
            var pHeader = JSON.parse(pData[0]);
            var pPurchaseInvoiceItems = JSON.parse(pData[1]);
            var pInvoiceOperations = pData[2];
            var pOperationClient = pData[3];
            var pOperationSupplier = pData[4];
            var pPaymentTerm = pData[5];
            var pStores = pData[6];
            var pTax = pData[12];
            var pChargeType = pData[13];
            var pTaxDeducted = pData[14];


            FlexiItem = JSON.parse(pData[7]);
            FillListFromObject(null, 14/*OperationsWithHouse*/, null, "slPurchaseingInvoiceOperations", pInvoiceOperations, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseingInvoiceOperationCustomer", pOperationClient, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseingInvoiceOperationSupplier", pOperationSupplier, null);
            //FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slPurchaseingInvoicePaymentTerm", pPaymentTerm, null);
            Fill_SelectInputAfterLoadData_WithMultiAttr(pPaymentTerm, 'ID', 'Code', TranslateString("SelectFromMenu"), '#slPurchaseingInvoicePaymentTerm', '', 'Days');

            debugger
            
            FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "hidden_slChargeType", pChargeType, null);

            Fill_SelectInputAfterLoadData_WithMultiAttr(pTax, 'ID', 'Name', TranslateString("SelectFromMenu"), '#slTax', '', 'CurrentPercentage');
            Fill_SelectInputAfterLoadData_WithMultiAttr(pTaxDeducted, 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDeductedPurshasingTax', '', 'CurrentPercentage');


            //FillListFromObject(null, 2, "<--Select-->", 'slStores', pStores, null);
            Fill_SelectInputAfterLoadData(pStores, 'ID', 'StoreName', null, '#slSC_Stores', '');
            FadePageCover(false);

            //Update For Currency in Flexi
            if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
                CurrencyIDForFlexi = JSON.parse(pData[8]).length > 0 ? JSON.parse(pData[8])[0].ID : 0;
                CurrencyExchangeRateForFlexi = JSON.parse(pData[9]).length > 0 ? JSON.parse(pData[9])[0].ExchangeRate : 0;
                $('#slPurchaseingInvoiceCurrency').val(CurrencyIDForFlexi);
                $("#txtPurchaseingInvoiceExchangeRate").val(CurrencyExchangeRateForFlexi);
            }
        }
        , null);
    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoice_Insert(false, false);");
    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoice_Insert(false, true);");
}

function PurchasingInvoice_FillControls(pPurchasingInvoiceID) {
    debugger;
    jQuery("#PurchaseingInvoiceModal").modal("show");
   
    ClearAll("#PurchaseingInvoiceModal", null);
    


    //$("#tblPurchasingInvoiceItem tbody").html("");
    $("#hPurchasingInvoiceID").val(pPurchasingInvoiceID)

   // var tr = (window.IsOpeningBalanceFlexi ? $("#tblPurchasingInvoice_OpeningBalance tr[ID='" + pPurchasingInvoiceID + "']") : $("#tblPurchasingInvoice tr[ID='" + pPurchasingInvoiceID + "']"));
    var tr = $("#tblPurchasingInvoice > tbody > tr[ID='" + pPurchasingInvoiceID + "']");
    
    FadePageCover(true);
    $("#txtPurchaseingInvoiceNumber").val($(tr).find("td.PurchasingInvoiceInvoiceNumber").text());
    $("#txtSupplierInvoiceNo").val($(tr).find("td.SupplierInvoiceNo").text());
    //$("#txtPurchaseingInvoiceDate").val(ConvertDateFormat($(tr).find("td.PurchasingInvoiceDate").text()));
    $("#txtPurchaseingInvoiceDate").val($(tr).find("td.PurchasingInvoiceDate").text());
    //$("#txtPurchaseingInvoiceDate").val(ConvertDateFormat(GetDateWithFormatMDY($(tr).find("td.PurchasingInvoiceDate").text())));

    $("#slPurchaseingInvoiceOperations").val($(tr).find("td.PurchasingInvoiceOperationID").text());
    $("#slPurchaseingInvoiceOperationSupplier").val($(tr).find("td.PurchasingInvoiceSupplierOperationPartnerID").text());
    $("#slPurchaseingInvoicePaymentTerm").val($(tr).find("td.PurchasingInvoicePaymentTermID").text());

    $("#txtSupplierReceiptNo").val($(tr).find("td.SupplierReceiptNo").text());
    $("#slPurchaseingInvoiceCurrency").val($(tr).find("td.PurchasingInvoiceCurrencyID").text());
    $("#txtPurchaseingInvoiceExchangeRate").val($(tr).find("td.PurchasingInvoiceExchangeRate").text());
    $("#txtPurchaseingInvoiceNotes").val($(tr).find("td.PurchasingInvoiceNotes").text());
    $("#slTax").val($(tr).find("td.TaxTypeID").text());
    $('#lblTaxPercrntage').text($(tr).find("td.TaxPercentage").text());
    $('#lblTotalTaxesAmount').text($(tr).find("td.TaxAmount").text());
    $("#slDeductedPurshasingTax").val($(tr).find("td.DiscountTypeID").text());
    $('#lblDeductionPerc').text($(tr).find("td.DiscountPercentage").text());
    $('#lblDeductionAmt').text($(tr).find("td.DiscountAmount").text());
    $('#lblAmtwithoutTax').text($(tr).find("td.AmountWithoutVAT").text());
    $('#lblAmount').text($(tr).find("td.Amount").text());

    
    if ($(tr).find("td.PurchasingInvoiceCurrencyID").text() == $("#hDefaultCurrencyID").val())
        $("#txtPurchaseingInvoiceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPurchaseingInvoiceExchangeRate").removeAttr("disabled");


    if ($(tr).find('#cbIsApproved').is(":checked") == true)
        $("#btnSavePurchaseingInvoice").attr("disabled", "disabled");
    else
        $("#btnSavePurchaseingInvoice").removeAttr("disabled");


    FadePageCover(false);

    setTimeout(function () {
        LoadInvoiceDetailsPurshasing();
    }, 300);
    //$("#btnSavePurchasingInvoice").attr("onclick", "PurchasingInvoiceItem_Save(false, false);");
    //$("#btnSavePurchasingInvoiceAndPrint").attr("onclick", "PurchasingInvoiceItem_Save(false, true);");
}
function LoadInvoiceDetailsPurshasing() {

        debugger;
    LoadAll("/api/PurchaseingInvoice/LoadInvoiceDetailsPurshasing", "where PurchaseInvoiceID = " + $("#hPurchasingInvoiceID").val(), function (pTabelRows) {
            PurchasingInvoiceItem_BindTableRows(pTabelRows[0]);


           

        });

}

//function PurchasingInvoice_Save(pSaveAndNew, pPrint) {
//    debugger;
//    if ($("#hPurchasingInvoiceID").val() == "")
//        swal("Sorry", "Please, enter at least one item.");
//    else if ($("#txtPurchasingInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchasingInvoiceExchangeRate").val()) == 0)
//        swal("Sorry", "Exchange Rate must have a value.");
//    else if (ValidateForm("form", "PurchasingInvoiceModal")) {
//        var pParametersWithValues = {
//            //Header
//            pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
//            , pEditableCode: $("#txtPurchasingInvoiceNumber").val() == "" ? 0 : $("#txtPurchasingInvoiceNumber").val() //effects only update
//            , pOperationID: $("#slPurchasingInvoiceOperations").val() == "" ? 0 : $("#slPurchasingInvoiceOperations").val()
//            , pClientOperationPartnerID: $("#slPurchasingInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchasingInvoiceOperationCustomer").val()
//            , pClientAddressID: $("#slPurchasingInvoiceCustomerAddress").val()
//            , pClientPrintedAddress: 0
//            , pSupplierOperationPartnerID: $("#slPurchasingInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchasingInvoiceOperationSupplier").val()
//            , pSupplierAddressID: $("#slPurchasingInvoiceSupplierAddress").val()
//            , pSupplierPrintedAddress: 0
//            , pCurrencyID: $("#slPurchasingInvoiceCurrency").val()
//            , pExchangeRate: $("#txtPurchasingInvoiceExchangeRate").val()
//            , pInvoiceDate: $("#txtPurchasingInvoiceDate").val()
//            , pNotes: $("#txtPurchasingInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchasingInvoiceNotes").val().trim().toUpperCase()
//            , pPaymentTermID: $("#slPurchasingInvoicePaymentTerm").val()
//            , pInvoiceTypeID: $("#slPurchasingInvoiceType").val() == "" ? 0 : $("#slPurchasingInvoiceType").val()
//            //, pBranchID: $("#hUserBranchID").val()

//            //LoadWithPaging parameters
//            , pWhereClausePurchasingInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
//            , pPageSize: 99999 //$("#select-page-size").val()
//            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
//            , pOrderBy: "ID"
//        };
//        FadePageCover(true);
//        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_Save", pParametersWithValues
//            , function (pData) {
//                if (pData[0]) {
//                    PurchasingInvoice_BindTableRows(JSON.parse(pData[0])); //pPurchasingInvoice: pData[0]
//                    if (pSaveAndNew)
//                        PurchasingInvoice_ClearAllControls();
//                    else
//                        jQuery("#PurchasingInvoiceModal").modal("hide");
//                    if (pPrint)
//                        PurchasingInvoice_Print($("#hPurchasingInvoiceID").val());
//                    //$("#btnSavePurchasingInvoice").attr("onclick", "PurchasingInvoice_Save(false, false);");
//                    //$("#btnSavePurchasingInvoiceAndPrint").attr("onclick", "PurchasingInvoice_Save(false, true);");
//                }
//                else
//                    swal("Sorry", "Connection failed, please try again.");
//                FadePageCover(false);
//            }
//            , null);
//    }




//}

var _IsApproved = false;
function GetInsertUpdateParametersPurshasing() {
    debugger;
    var PurchaseInvoiceID = ($("#hPurchasingInvoiceID").val()=="" || $("#hPurchasingInvoiceID").val() == undefined ) ? 0 : $("#hPurchasingInvoiceID").val()
    var InvoiceNumber = $("#txtPurchaseingInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseingInvoiceNumber").val()
    var SupplierInvoiceNo = $("#txtSupplierInvoiceNo").val() == "" ? 0 : $("#txtSupplierInvoiceNo").val()
    var SupplierReceiptNo = $("#txtSupplierReceiptNo").val() == "" ? 0 : $("#txtSupplierReceiptNo").val()
    var OperationID = $("#slPurchaseingInvoiceOperations").val() == "" ? 0 : $("#slPurchaseingInvoiceOperations").val()
    var SupplierOperationPartnerID = $("#slPurchaseingInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseingInvoiceOperationSupplier").val()
    var SupplierAddressID = $("#slPurchaseingInvoiceSupplierAddress").val()
    var SupplierPrintedAddress = 0
    var AmountWithoutVAT = ($('#lblAmtwithoutTax').text() * 1)
    var CurrencyID = $("#slPurchaseingInvoiceCurrency").val()
    var ExchangeRate = $("#txtPurchaseingInvoiceExchangeRate").val()
    //var InvoiceDate = $("#txtPurchaseingInvoiceDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPurchaseingInvoiceDate").val())
    //var InvoiceDate = $("#txtPurchaseingInvoiceDate").val() == "" ? "01/01/1900" : $("#txtPurchaseingInvoiceDate").val()
    var InvoiceDate = $('#txtPurchaseingInvoiceDate').val();

    var TaxTypeID = $("#slTax").val()
    var TaxPercentage = ($('#lblTaxPercrntage').text() * 1)
    var TaxAmount = ($('#lblTotalTaxesAmount').text() * 1)
    var DiscountTypeID = $("#slDeductedPurshasingTax").val()
    var DiscountPercentage = ($('#lblDeductionPerc').text() * 1)
    var DiscountAmount = ($('#lblDeductionAmt').text() * 1)
    var Amount = ($('#lblAmount').text() * 1)
    var Notes = $("#txtPurchaseingInvoiceNotes").val()== "" ? 0 : $("#txtPurchaseingInvoiceNotes").val().trim()
    var PaymentTermID = $("#slPurchaseingInvoicePaymentTerm").val() == "" ? 0 : $("#slPurchaseingInvoicePaymentTerm").val()

    return {
        pPurchaseInvoiceID: PurchaseInvoiceID,
        pInvoiceNumber: InvoiceNumber,
        pSupplierInvoiceNo: SupplierInvoiceNo,
        pSupplierReceiptNo: SupplierReceiptNo,
        pOperationID: OperationID,
        pSupplierOperationPartnerID: SupplierOperationPartnerID,
        pSupplierAddressID: SupplierAddressID,
        pSupplierPrintedAddress: SupplierPrintedAddress,
        pAmountWithoutVAT: AmountWithoutVAT,
        pCurrencyID: CurrencyID,
        pExchangeRate: ExchangeRate,
        pInvoiceDate: InvoiceDate,
        pTaxTypeID: TaxTypeID,
        pTaxPercentage: TaxPercentage,
        pTaxAmount: TaxAmount,
        pDiscountTypeID: DiscountTypeID,
        pDiscountPercentage: DiscountPercentage,
        pDiscountAmount: DiscountAmount,
        pAmount: Amount,
        pNotes: Notes,
        pPaymentTermID: PaymentTermID

    };


}
    function PurchasingInvoice_Save(pSaveandAddNew, pPrint) {
        debugger;
        IsInsert = true;
        var _Suceess = true;

        if ($('#txtPurchaseingInvoiceDate').val() == "") {
            swal('Excuse me', 'You must Select Date', 'warning');
            _Suceess = false;
        }
        if ($('#slPurchaseingInvoiceOperationSupplier').val() == "0" || $('#slPurchaseingInvoiceOperationSupplier').val() == "") {
            swal('Excuse me', 'You must Select Supplier', 'warning');
            _Suceess = false;
        }


        if ($('#tblPurchaseingInvoiceItem > tbody > tr').length == 0) {
            swal('Excuse me', 'You must insert Items', 'warning');
            _Suceess = false;
        }
        else {
            AccountIDs = "";
            var TaxRatio14 = 0;
            var TaxRatio10 = 0;
            var TaxRatioother = 0;


            if ($('#tblPurchaseingInvoiceItem > tbody > tr').length > 0) {

                $($('#tblPurchaseingInvoiceItem > tbody > tr')).each(function (i, tr) {
                    debugger;


                    AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ServiceID').find('.selectservice').val());
                    var serviceid = $(tr).find('td.ChargeTypeID').find('.selectChargeType').val();
                    var Qty = $(tr).find('td.Quantity').find('.input_Quantity').val();
                    var UnitPrice = $(tr).find('td.UnitPrice').find('.input_UnitPrice').val();

                    if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                        swal('Excuse me', 'Fill  Items', 'warning');
                        _Suceess = false;
                        return false;
                    }

                    if (Qty == "" || Qty == "0" || Qty == null) {
                        swal('Excuse me', 'Must Input Qyantity', 'warning');
                        _Suceess = false;
                        return false;
                    }
                    if (UnitPrice == "" || UnitPrice == "0" || UnitPrice == null) {
                        swal('Excuse me', 'Must Input UnitPrice', 'warning');
                        _Suceess = false;
                        return false;
                    }

                });
            }
        }

        console.log(GetInsertUpdateParametersPurshasing());

        if (_Suceess == true) {
            setTimeout(function () {

                InsertUpdateFunctionAndReturnID("form", "/api/PurchaseingInvoice/PurchaseInvoice_Save",
                    GetInsertUpdateParametersPurshasing()
                    , pSaveandAddNew, null, '#hTransactionID', function () {
                        // swal($('#hID').val());
                        var ListOfListOfObject = [];
                        debugger;
                        ListOfListOfObject.push(SetArrayOfItemsPurshasing());
                        //ListOfListOfObject.push(SetArrayOfExpenses());
                        //  ListOfListOfObject.push(SetArrayOfTaxes());
                        InsertUpdateListOfObject("/api/PurchaseingInvoice/InsertItems",
                            ListOfListOfObject
                            , pSaveandAddNew, "PurchaseingInvoiceModal", function (message) {
                                debugger;
                                setTimeout(function () {
                                    PurchasingInvoice_SubmenuTabClicked();
                                }, 300);

                            });
                    });

            }, 30);
        }

}
function SetArrayOfItemsPurshasing() {
    debugger;
    var arrayOfItems = new Array();
    $("#tblPurchaseingInvoiceItem>tbody>tr").each(function (i, tr) {

        var objItem = new Object();
        objItem.ID = 0;
        objItem.PurchaseInvoiceID = $("#hTransactionID").val();

        
        objItem.ChargeTypeID = $(tr).find('td.ChargeTypeID').find('.selectChargeType').val();
        objItem.UnitPrice = $(tr).find('td.UnitPrice').find('.input_UnitPrice').val();
        objItem.Quantity = $(tr).find('td.Quantity').find('.input_Quantity').val();
        objItem.Amount = $(tr).find('td.Amount').text();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.PayableID = 0;

        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}

function PurchasingInvoice_DeleteList() {
    debugger;

    var pDeletedPurchasingInvoiceIDs = "";


    pDeletedPurchasingInvoiceIDs = GetAllSelectedIDsAsString('tblPurchasingInvoice');

    //Confirmation message to delete
    if (pDeletedPurchasingInvoiceIDs != "")
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
            CallGETFunctionWithParameters("/api/PurchaseingInvoice/PurchaseInvoice_Delete"
                , {
                    pDeletedPurchaseInvoiceIDs: pDeletedPurchasingInvoiceIDs
                    , pOperationID: $("#hOperationID").val()
                }
                , function (pData) {
                    if (!pData[0])
                        swal("Sorry", "One or more records have dependencies.");
                    var pPurchasingInvoice = JSON.parse(pData[1]);
                    PurchasingInvoice_BindTableRows(pPurchasingInvoice);
                    FadePageCover(false);
                }
                , null);
        });
}

function GeneratePurchasingInvoice() {
    debugger;

    var pDeletedPurchasingInvoiceIDs = "";


    pDeletedPurchasingInvoiceIDs = GetAllSelectedIDsAsString('tblPurchasingInvoice');

    //Confirmation message to delete
    if (pDeletedPurchasingInvoiceIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be Generate Payables!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseingInvoice/PurchaseInvoice_Generate"
                    , {
                        pDeletedPurchaseInvoiceIDs: pDeletedPurchasingInvoiceIDs
                        , pOperationID: $("#hOperationID").val()
                    }
                    , function (pData) {
                        if (!pData[0])
                        {
                            if (pData[2]=='')
                                swal("Sorry", "One or more records have dependencies.");
                            else
                                swal("Sorry", pData[2]);
                        }
                         
                        var pPurchasingInvoice = JSON.parse(pData[1]);
                        PurchasingInvoice_BindTableRows(pPurchasingInvoice);
                        FadePageCover(false);
                    }
                    , null);
            });
}
function UnGeneratePurchasingInvoice() {
    debugger;

    var pDeletedPurchasingInvoiceIDs = "";


    pDeletedPurchasingInvoiceIDs = GetAllSelectedIDsAsString('tblPurchasingInvoice');

    //Confirmation message to delete
    if (pDeletedPurchasingInvoiceIDs != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be Generate Payables!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm delete
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseingInvoice/PurchaseInvoice_UnGenerate"
                    , {
                        pDeletedPurchaseInvoiceIDs: pDeletedPurchasingInvoiceIDs
                        , pOperationID: $("#hOperationID").val()
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", "One or more records have dependencies.");
                        var pPurchasingInvoice = JSON.parse(pData[1]);
                        PurchasingInvoice_BindTableRows(pPurchasingInvoice);
                        FadePageCover(false);
                    }
                    , null);
            });
}
function PurchasingInvoice_OpeningBalance_DeleteList() {
    debugger;

    var pDeletedPurchasingInvoiceIDs = "";


    pDeletedPurchasingInvoiceIDs = GetAllSelectedIDsAsString('tblPurchasingInvoice_OpeningBalance');

    //Confirmation message to delete
    if (pDeletedPurchasingInvoiceIDs != "")
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
                CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_OpeningBalance_Delete"
                    , {
                        pDeletedPurchasingInvoiceIDs: pDeletedPurchasingInvoiceIDs
                        , pOperationID: $("#hOperationID").val()
                    }
                    , function (pData) {
                        if (!pData[0])
                            swal("Sorry", "One or more records have dependencies.");
                        var pPurchasingInvoice = JSON.parse(pData[1]);
                        PurchasingInvoice_OpeningBalance_BindTableRows(pPurchasingInvoice);
                        FadePageCover(false);
                    }
                    , null);
            });
}
function PurchasingInvoice_CurrencyChanged() {
    debugger;
    if ($("#slPurchasingInvoiceCurrency").val() == $("#hDefaultCurrencyID").val())
        $("#txtPurchasingInvoiceExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPurchasingInvoiceExchangeRate").removeAttr("disabled");
    $("#txtPurchasingInvoiceExchangeRate").val($("#slPurchasingInvoiceCurrency option:selected").attr("MasterDataExchangeRate"));
}
function PurchasingInvoice_OperationChanged(pClientOperationPartnerID, pSupplierOperationPartnerID) {
    debugger;
    FadePageCover(true);
    $("#slPurchasingInvoiceCustomerAddress").html('<option value="0">' + TranslateString("SelectFromMenu") + '</option>');
    //$("#slPurchasingInvoiceSupplierAddress").html('<option value="0">Select Address Type</option>'); //because supplier is not changed with houses
    InvoicePartners_GetList(pClientOperationPartnerID, $("#slPurchasingInvoiceOperations").val(), "slPurchasingInvoiceOperationCustomer"
        , function () { FadePageCover(false); });
    ////supplier always take from master operation 
    //InvoiceSuppliers_GetList(pSupplierOperationPartnerID, $("#slPurchasingInvoiceOperations").val(), "slPurchasingInvoiceOperationSupplier", null);
}
function PurchasingInvoice_Print(pID) {
    if (!window.IsOpeningBalanceFlexi) {
        debugger;
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_GetDataToPrint"
            , { pPrintedPurchasingInvoiceID: pID }
            , function (pData) {
                var pPurchasingInvoiceHeader = JSON.parse(pData[0]);
                var pPurchasingInvoiceItems = JSON.parse(pData[1]);
                var pOperationHeader = JSON.parse(pData[2]);
                var pDefaults = JSON.parse(pData[3]);
                var pMasterOperationHeader = JSON.parse(pData[4]);
                var _VATReceivableItemsIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceivables", "nameExcludePurchase");
                var _NotSelectedReceivablesTotal = PurchasingInvoice_GetNotSelectedReceivablesTotal(pPurchasingInvoiceHeader.CurrencyID, pPurchasingInvoiceHeader.ExchangeRate);
                var _SubTotal = pPurchasingInvoiceHeader.AmountWithoutVAT + parseFloat(_NotSelectedReceivablesTotal);
                var _VATTotal = 0;
                if (_VATReceivableItemsIDs != "" && $("#cbAddReceivablesToPurchasingInvoice").prop("checked"))
                    _VATTotal = PurchasingInvoice_GetVATReceivableItemsTotal(pPurchasingInvoiceHeader.CurrencyID, pPurchasingInvoiceHeader.ExchangeRate);
                var _TotalWithVAT = _SubTotal + parseFloat(_VATTotal);
                var mywindow = window.open('', '_blank');
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                //ReportHTML += '             <div class="col-xs-12 m-l" style="width:95%; height:45%; border: 1px solid #000;border-radius: 25px;padding: 20px;">This is a rounded rectangle</div>';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Invoice</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                //ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + ($("#cbPrintHeaderInvoice").prop("checked") ? 'CompanyHeader.jpg' : 'CompanyHeader-Empty.jpg') + '" alt="logo"/></div>';
                ReportHTML += '                 <div class="col-xs-12 text-center"><img src="/Content/Images/' + 'CompanyHeader.jpg' + '" alt="logo"/></div>';
                //ReportHTML += '                 <div class="col-xs-12 text-center m-t-n"><h3>' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text().split('/')[1] + '</h3></div>';
                ReportHTML += '                 <div class="col-xs-7 m-t">';
                ReportHTML += '                     <b>' + $("#hDefaultCompanyName").val() + '</b><br>';
                ReportHTML += '                     <b>' + (pDefaults.AddressLine1 == 0 ? "" : (pDefaults.AddressLine1 + '</b><br>'));
                ReportHTML += '                     <b>' + (pDefaults.AddressLine2 == 0 ? "" : (pDefaults.AddressLine2 + '</b><br>'));
                ReportHTML += '                     <b>' + (pDefaults.AddressLine3 == 0 ? "" : (pDefaults.AddressLine3) + '</b><br>');
                if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                    ReportHTML += '                     <b>' + 'Contact : Khaled Saleh' + '</b><br>';
                    ReportHTML += '                     <b>' + 'Email : accounting@nilelogistics.com' + '</b><br>';
                }
                ReportHTML += '                     <b>' + (pDefaults.Phones == 0 ? "" : ('TEL:' + pDefaults.Phones) + '</b><br>');
                ReportHTML += '                     <b>' + (pDefaults.Faxes == 0 ? "" : ('Fax:' + pDefaults.Faxes)) + '</b><br><br><br>';
                ReportHTML += '                 </div>';

                ReportHTML += '                 <div class="col-xs-5 m-t m-l-n">';
                //ReportHTML += '                     <b>Date : </b>' + getTodaysDateInddMMyyyyFormat() + '<br>';
                ReportHTML += '                     <b>Invoice # : </b>' + pPurchasingInvoiceHeader.ConcatenatedInvoiceNumber + '<br>';
                ReportHTML += '                     <b>Date : </b>' + $("#tblPurchasingInvoice #" + pID + " td.PurchasingInvoiceDate").text() + '<br>';
                ReportHTML += '                     <b>Bill To : </b>' + $("#tblPurchasingInvoice #" + pID + " td.PurchasingInvoiceClientOperationPartnerName").text() + '<br>';
                ReportHTML += '                     <b>Address : </b>';
                ReportHTML += '                         ' + (pPurchasingInvoiceHeader.ClientAddressStreetLine1 == 0 ? "" : (pPurchasingInvoiceHeader.ClientAddressStreetLine1));
                ReportHTML += '                         ' + (pPurchasingInvoiceHeader.ClientAddressStreetLine2 == 0 ? "" : (", " + pPurchasingInvoiceHeader.ClientAddressStreetLine2));
                ReportHTML += '                         ' + (pPurchasingInvoiceHeader.ClientAddressCityName == 0 ? "" : ("," + pPurchasingInvoiceHeader.ClientAddressCityName));
                ReportHTML += '                         ' + (pPurchasingInvoiceHeader.ClientAddressCountryName == 0 ? "" : ("," + pPurchasingInvoiceHeader.ClientAddressCountryName));
                ReportHTML += '                         ' + '<br>';
                //if ($("#cbPrintMBL").prop("checked"))
                ReportHTML += '                 <b>' + (pOperationHeader.TransportType == 2 ? 'AWB #' : 'MB/L No.') + ': </b>' + (pOperationHeader.MasterBL == 0 ? "" : pOperationHeader.MasterBL) + '<br>';
                //if ($("#cbPrintHBL").prop("checked")) {
                //    if (pHouseBLs != "0")//Master Operation so show all houses on it
                //        ReportHTML += '             <b>HBL</b>: ' + (pOperationHeader.HouseBLs == 0 ? "" : pOperationHeader.HouseBLs) + '<br>';
                //    else if (pHouseNumber != "0" && !$("#cbIsDirect").prop("checked"))
                //        ReportHTML += '             <b>HB/L No.:</b> ' + (pOperationHeader.HouseNumber == 0 ? "" : pOperationHeader.HouseNumber) + '<br>';
                //}
                ReportHTML += '                     <b>Weight : </b>' + pOperationHeader.GrossWeightSum + ' KG ' + (pOperationHeader.PackageTypes == 0 ? (pOperationHeader.ContainerTypes == 0 ? "" : (" - " + pOperationHeader.ContainerTypes)) : (" - " + pOperationHeader.PackageTypes)) + '<br>';
                if (pOperationHeader.MasterOperationCode != "0")
                    ReportHTML += '                 <b>Operation : </b>' + pOperationHeader.MasterOperationCode;
                else
                    ReportHTML += '                     <b>Operation : </b>' + pOperationHeader.Code + '<br>';
                ReportHTML += '                     <b>PO No : </b>' + (pOperationHeader.PONumber == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.PONumber == 0 ? "" : pMasterOperationHeader.PONumber) : pOperationHeader.PONumber) + '<br>';
                ReportHTML += '                     <b>SO Ref : </b>' + (pOperationHeader.SupplierReference == 0 ? (pMasterOperationHeader == null || pMasterOperationHeader.SupplierReference == 0 ? "" : pMasterOperationHeader.SupplierReference) : pOperationHeader.SupplierReference) + '<br>';
                ReportHTML += '                 </div>';
                //ReportHTML += '             </div>';

                ReportHTML += '             <div class="col-xs-12 clear">';
                ReportHTML += '                 <table id="tblReportInvoice" class="m-t table table-striped b-t b-light text-sm table-bordered" style="border:solid #000;">'; // table-hover
                ReportHTML += '                     <thead>';
                ReportHTML += '                         <tr>';
                ReportHTML += '                             <th>Description</th>';
                ReportHTML += '                             <th>Part No</th>';
                ReportHTML += '                             <th>Quantity</th>';
                ReportHTML += '                             <th>Unit Price</th>';
                ReportHTML += '                             <th>Sale Price</th>';
                ReportHTML += '                         </tr>';
                ReportHTML += '                     </thead>';
                ReportHTML += '                     <tbody>';
                $.each(pPurchasingInvoiceItems, function (i, item) {
                    ReportHTML += '                         <tr class="input-md" style="font-size:95%;">';
                    //ReportHTML += '                             <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (($("#cbAddNotesToItems").prop("checked") && item.Notes != 0 && item.Notes != "") ? ('-' + item.Notes) : "") + '</td>';
                    ReportHTML += '                             <td>' + item.PurchaseItemName + '</td>';
                    ReportHTML += '                             <td>' + (item.PartNumber == 0 ? "" : item.PartNumber) + '</td>';
                    ReportHTML += '                             <td>' + item.Quantity + '</td>';
                    ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchasingInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.UnitPrice + (item.UnitPrice * _NotSelectedReceivablesTotal / pPurchasingInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                    ReportHTML += '                             <td style="width:15%;">' + '<span style="float:left;">' + pPurchasingInvoiceHeader.CurrencyCode + '</span>' + '<span style="float:right;">' + (item.Amount + (item.Amount * _NotSelectedReceivablesTotal / pPurchasingInvoiceHeader.AmountWithoutVAT)).toFixed(2) + '</span>' + '</td>';
                    ReportHTML += '                         </tr>';
                });
                ReportHTML += '                     </tbody>';
                ReportHTML += '                 </table>';
                ReportHTML += '             </div>'
                //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblInvoices #" + pID + " td.InvoiceAmount").text()) + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ' / (' + $("#tblInvoices #" + pID + " td.InvoiceAmount").text() + ' ' + $("#tblInvoices #" + pID + " td.InvoiceCurrency").text() + ')' + '</b>';
                //ReportHTML += '                         </div>';
                //ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                //ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                ReportHTML += '                         <div class="col-xs-7 m-t-n">';
                //if ($("#cbPrintBankDetailsFromDefaults").prop("checked")) {
                //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                //    ReportHTML += '                             <b>Account Name:</b> ' + pAccountName + '</br>';
                //    ReportHTML += '                             <b>Bank Name:</b> ' + pBankName + '</br>';
                //    ReportHTML += '                             <b>Bank Address:</b> ' + pBankAddress + '</br>';
                //    ReportHTML += '                             <b>Swift Code:</b> ' + pSwiftCode + '</br>';
                //    ReportHTML += '                             <b>Account Number:</b> ' + pAccountNumber + '</br>';
                //}
                //else if ($("#cbPrintBankDetailsFromTemplate").prop("checked")) {
                //    ReportHTML += '                             <b><u>BANK DETAILS:</u></b></br>';
                //    ReportHTML += '                         ' + pBankDetailsTemplate.replace(/\n/g, "<br/>");
                //}
                //else {
                ReportHTML += '</br>';
                //}
                ReportHTML += '                         </div>';
                ReportHTML += '                         <div class="col-xs-5 text-right m-t-n">';
                //if (pPurchasingInvoiceHeader.TaxAmount != 0 || pPurchasingInvoiceHeader.DiscountAmount != 0)
                //    ReportHTML += '                             <b>Subtotal: </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' ' + _SubTotal + '</br>';
                //if (pPurchasingInvoiceHeader.TaxAmount != 0)
                //    ReportHTML += '                             <b>VAT(' + pPurchasingInvoiceHeader.TaxPercentage + '%): </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' ' + pPurchasingInvoiceHeader.TaxAmount + '</br>';
                //if (pPurchasingInvoiceHeader.DiscountAmount != 0)
                //    ReportHTML += '                             <b>Discount Taxes(' + pPurchasingInvoiceHeader.DiscountPercentage + '%): </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' ' + pPurchasingInvoiceHeader.DiscountAmount + '</br>';
                //if ($("#cbAddReceivablesToPurchasingInvoice").prop("checked"))
                debugger;
                if (_VATTotal != 0) {
                    ReportHTML += '                             <b>Subtotal: </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' ' + _SubTotal.toFixed(2) + '</br>';
                    for (var i = 0; i < _VATReceivableItemsIDs.split(',').length; i++) {
                        var _itemVATAmount = 0;
                        if ($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableCurrency").attr("val") == pPurchasingInvoiceHeader.CurrencyID)
                            _itemVATAmount = $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text();
                        else
                            _itemVATAmount = (parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableSaleAmount").text()) * parseFloat($("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.ReceivableExchangeRate").text()) / pPurchasingInvoiceHeader.ExchangeRate).toFixed(2);
                        ReportHTML += '                             <b>' + $("#tblReceivables tbody tr#" + _VATReceivableItemsIDs.split(',')[i] + " td.Receivable").text() + ': </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' ' + _itemVATAmount + '</br>';
                    }
                }
                //ReportHTML += '                             <b>Total: </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' <b>' + pPurchasingInvoiceHeader.Amount + '</b></br>';
                //ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(pPurchasingInvoiceHeader.Amount) + ' ' + pPurchasingInvoiceHeader.CurrencyCode + '</br>';
                ReportHTML += '                             <b>Total: </b>' + pPurchasingInvoiceHeader.CurrencyCode + ' <b>' + _TotalWithVAT + '</b></br>';
                ReportHTML += '                             <b>ONLY : </b>' + toWords_WithFractionNumbers(_TotalWithVAT) + ' ' + pPurchasingInvoiceHeader.CurrencyCode + '</br>';
                ReportHTML += '                         </div>';
                //ReportHTML += '                     </div>'; //of table-responsive
                //ReportHTML += '                 </section>';
                //ReportHTML += '             <div class="static-text-primary">asfafs</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</br></br></br></br></br>dasda</div>';
                ReportHTML += '         </body>';

                //ReportHTML += '     <footer class="footer col-xs-12 ' + ($("#cbPrintFooterInvoice").prop("checked") ? "" : " hide ") + '" style="width:100%; position:absolute; bottom:0;">';
                ReportHTML += '     <footer class="footer col-xs-12 ' + " hide " + '" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row">'
                //ReportHTML += '             <div class="col-xs-8 m-l"><b><i>' + ($("#tblInvoices #" + pID + " td.DirectionType").text() == 1
                //                                                                ? 'Import Manager'
                //                                                                : ($("#tblInvoices #" + pID + " td.DirectionType").text() == 2 ? 'Export Manager' : 'Domestic Manager')
                //                                                                ) + '</i></b></div>';
                //ReportHTML += '             <div class="col-xs-4 m-t-n-md float-right"><b><i>Accountant Signature</i></b></div>';
                //ReportHTML += '         </div>'
                //ReportHTML += '         <div class="row text-right m-r m-t-sm">' + '  لاتعتبر الفاتورة مسددة إلا بايصال رسمى مختوم من الشركة  ' + '</div>';
                //ReportHTML += '         <div class="row text-right m-r">' + '  الاعتراض على اى بند من الفاتورة خلال 15 يوم من تاريخ استلام الفاتورة  ' + '</div>';
                //if ($("#cbIsImport").prop("checked") && $("#cbIsOcean").prop("checked"))
                //    ReportHTML += '                 <div class="row m-l">F/FFI-IS-11-03</div>';
                ReportHTML += '     </footer>';
                ReportHTML += '</html>';
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
                FadePageCover(false);
            }
            , null);
    }
}
/*******************Purchase Invoice Details*********************/

var ItemsRowsCounter = 0;
function AddNewItemsRow() {
    debugger;
    AppendRowtoTable("tblPurchaseingInvoiceItem",
        ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
           
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItemsPurshasing(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"


            + "<td class='ChargeTypeID' val='" + "0" + "'>" + "<select id='ChargeType-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "'  class='input-sm  col-sm selectChargeType'>" + $('#hidden_slChargeType').html() + "</select>" + "</td>"

            + "<td class='Quantity' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateTotal()'  class='input_Quantity input-sm  col-sm'>" + "</td>"
            + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateTotal()'  class='input_UnitPrice input-sm  col-sm'>" + "</td>"
            + "<td class='Amount' val='" + "0" + "'>" + "" + "</td>"

            + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

            + "</tr>"));

    $("#ChargeType-" + (ItemsRowsCounter + 1)).css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');

    ItemsRowsCounter++;

}

function CalculateTotal() {
    debugger
    _TotalExpenses = 0.00;
    _TotalVat = 0.00;

    var ItemTax = 0;
    var ItemDiscount = 0;

    var TaxRatio = 0;
    var DiscountRatio = 0;

    var Price = 0;
    var Qty = 0;
    var Total = 0;
    var _Total = 0;


    TaxRatio = ($('#lblTaxPercrntage').text() == undefined || $('#lblTaxPercrntage').text() == null) ? 0 : $('#lblTaxPercrntage').text() * 1
    DiscountRatio = ($('#lblDeductionPerc').text() == undefined || $('#lblDeductionPerc').text() == null) ? 0 : $('#lblDeductionPerc').text() * 1


    $($('#tblPurchaseingInvoiceItem > tbody > tr')).each(function (i, tr) {

        debugger;
        Price = ($(tr).find('td.UnitPrice').find('.input_UnitPrice').val() == undefined || $(tr).find('td.UnitPrice').find('.input_UnitPrice').val() == null || $(tr).find('td.UnitPrice').find('.input_UnitPrice').val() == "") ? 0 : $(tr).find('td.UnitPrice').find('.input_UnitPrice').val() * 1;
        Qty = ($(tr).find('td.Quantity').find('.input_Quantity').val() == undefined || $(tr).find('td.Quantity').find('.input_Quantity').val() == null || $(tr).find('td.Quantity').find('.input_Quantity').val() == "") ? 0 : $(tr).find('td.Quantity').find('.input_Quantity').val() * 1;

        //set total
        $(tr).find('td.Amount').html((Price * Qty).toFixed(2));

        Total = (Price * Qty)*1;
        _Total += (Price * Qty) * 1;


       
        //TaxRatio = $(tr).find('td.TaxRatio  input[type="text"]').val();
        
        

        //_TotalVat += parseFloat(ItemTax);
        //_TotalExpenses += parseFloat(ItemDiscount);


    });
    if (DiscountRatio > 0) {
        _TotalExpenses = ((_Total * DiscountRatio) / 100).toFixed(2);

    }

    if (TaxRatio > 0) {
        _TotalVat = (((_Total ) * TaxRatio) / 100).toFixed(2);

    }


    $('#lblDeductionAmt').text(parseFloat(_TotalExpenses).toFixed(2));
    $('#lblTotalTaxesAmount').text(parseFloat(_TotalVat).toFixed(2));

    $('#lblAmtwithoutTax').text((parseFloat(_Total)).toFixed(2));
    $('#lblAmount').text(((parseFloat(_Total) - parseFloat(_TotalExpenses) )+ parseFloat(_TotalVat)).toFixed(2));
}

function CalculatePurshasingAmount(type) {
    debugger;
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    if (type==1) {
        decTaxPercentage = $("#slTax option:selected").attr("CurrentPercentage");
        $("#lblTaxPercrntage").text(decTaxPercentage);

    }
    else {
        decDiscountPercentage = $("#slDeductedPurshasingTax option:selected").attr("CurrentPercentage");
        $("#lblDeductionPerc").text(decDiscountPercentage);

    }
    
   
    CalculateTotal();

}
function DeleteItemsPurshasing(RowNumber, ID) {
    debugger;
    if ($("#tblPurchaseingInvoiceItem > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblPurchaseingInvoiceItem > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
        CalculateTotal();

    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                $("#tblPurchaseingInvoiceItem > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
       
                CalculateTotal();
            });

    }

}
function PurchasingInvoiceItem_ClearAllControls() {
    debugger;
    //if ($("#txtPurchasingInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchasingInvoiceExchangeRate").val()) == 0)
    //    swal("Sorry", "Exchange Rate must have a value.");
    if ($("#hShipmentType").val() == constFlexiShipmentType && $("#tblPurchasingInvoiceItem tbody tr").length > 0)
        swal("Sorry", "Edit your flexis from the serials button.");
    else if (ValidateForm("form", "PurchasingInvoiceModal")) {
        if ($("#hShipmentType").val() == constFlexiShipmentType && $("#hDirectionType").val() == constImportDirectionType)
            $("#btnAddFlexiFromExcel").click();
        else if ($("#hShipmentType").val() == constFlexiShipmentType && $("#hDirectionType").val() == constExportDirectionType)
            FlexiSerial_FillModal();
        else {
            ClearAll("#PurchasingInvoiceItemModal", null);
            jQuery("#PurchasingInvoiceItemModal").modal("show");
            if ($("#slPurchasingInvoiceItem option").length == 0) {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseingInvoice/PurchaseInvoiceItem_FillModalControls"
                    , { pWhereClausePurchaseItem: "ORDER BY Name" }
                    , function (pData) {
                        FillListFromObject_ERP(null, 11/*NameAndPriceAttr*/, TranslateString("SelectFromMenu"), "slPurchasingInvoiceItem", pData[0], null);
                        FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slPurchasingInvoiceItemCountryOfOrigin", pData[1], null);

                    }
                    , function () {
                        FadePageCover(false);
                    });
            }
            //$("#btnSavePurchasingInvoiceItem").attr("onclick", "PurchasingInvoiceItem_Save(false);");
            //$("#btnSaveAndNewPurchasingInvoiceItem").attr("onclick", "PurchasingInvoiceItem_Save(true);");
        } //else
    }//else if (ValidateForm("form", "PurchasingInvoiceModal")) {
}
function PurchasingInvoiceItem_FillControls(pID) {
    debugger;
    if ($("#txtPurchasingInvoiceExchangeRate").val().trim() == "" || parseFloat($("#txtPurchasingInvoiceExchangeRate").val()) == 0)
        swal("Sorry", "Exchange Rate must have a value.");
    else if (ValidateForm("form", "PurchasingInvoiceModal")) {
        ClearAll("#PurchasingInvoiceItemModal", null);
        $("#hPurchasingInvoiceItemID").val(pID);
        jQuery("#PurchasingInvoiceItemModal").modal("show");

        var tr = $("#tblPurchasingInvoiceItem tr[ID='" + pID + "']");
        //var pItemID = $(tr).find("td.PurchaseItemID").text();

        if ($("#slPurchasingInvoiceItem option").length == 0) {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_FillModalControls"
                , { pWhereClausePurchaseItem: "ORDER BY Name" }
                , function (pData) {
                    FillListFromObject_ERP($(tr).find("td.PurchaseItemID").text(), 11/*NameAndPriceAttr*/, TranslateString("SelectFromMenu"), "slPurchasingInvoiceItem", pData[0], null);
                    FillListFromObject_ERP($(tr).find("td.PurchaseItemCountryOfOriginID").text(), 2, TranslateString("SelectFromMenu"), "slPurchasingInvoiceItemCountryOfOrigin", pData[1], null);
                }
                , function () {
                    FadePageCover(false);
                });
        }
        else {
            $("#slPurchasingInvoiceItem").val($(tr).find("td.PurchaseItemID").text());
            $("#slPurchasingInvoiceItemCountryOfOrigin").val($(tr).find("td.PurchaseItemCountryOfOriginID").text());
        }
        $("#txtPurchasingInvoiceItemPartNumber").val($(tr).find("td.PurchaseItemPartNumber").text());
        $("#txtPurchasingInvoiceItemQuantity").val($(tr).find("td.PurchaseItemQuantity").text());
        $("#txtPurchasingInvoiceItemHSCode").val($(tr).find("td.PurchaseItemHSCode").text());
        $("#txtPurchasingInvoiceItemUnitPrice").val($(tr).find("td.PurchaseItemUnitPrice").text());

        $("#txtPurchasingInvoiceItemAmount").val($(tr).find("td.PurchaseItemAmount").text());
        $("#txtPurchasingInvoiceItemNotes").val($(tr).find("td.PurchaseItemNotes").text());

        //$("#btnSavePurchasingInvoiceItem").attr("onclick", "PurchasingInvoiceItem_Save(false);");
        //$("#btnSaveAndNewPurchasingInvoiceItem").attr("onclick", "PurchasingInvoiceItem_Save(true);");
    }
}

function PurchasingInvoiceItem_Save(pSaveAndNew) {
    debugger;
    //if (parseFloat($("#txtPurchasingInvoiceItemAmount").val()) == 0 || $("#txtPurchasingInvoiceItemAmount").val().trim() == "")
    //    swal("Sorry", "Please, enter quantity and price.");
    if (parseFloat($("#txtPurchasingInvoiceItemQuantity").val()) == 0 || $("#txtPurchasingInvoiceItemQuantity").val().trim() == "")
        swal("Sorry", "Please, enter quantity.");
    else if (ValidateForm("form", "PurchasingInvoiceItemModal")) {
        var pParametersWithValues = {
            //Header
            pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
            , pInvoiceNumber: 0
            , pEditableCode: $("#txtPurchasingInvoiceNumber").val() == "" ? 0 : $("#txtPurchasingInvoiceNumber").val() //effects only update
            , pOperationID: $("#slPurchasingInvoiceOperations").val() == "" ? 0 : $("#slPurchasingInvoiceOperations").val()
            , pClientOperationPartnerID: $("#slPurchasingInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchasingInvoiceOperationCustomer").val()
            , pClientAddressID: $("#slPurchasingInvoiceCustomerAddress").val()
            , pClientPrintedAddress: 0
            , pSupplierOperationPartnerID: $("#slPurchasingInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchasingInvoiceOperationSupplier").val()
            , pSupplierAddressID: $("#slPurchasingInvoiceSupplierAddress").val()
            , pSupplierPrintedAddress: 0
            , pAmountWithoutVAT: 0 //(parseFloat($("#txtPurchasingInvoiceAmount").val()) + parseFloat($("#txtPurchasingInvoiceItemAmount").val()))
            , pCurrencyID: $("#slPurchasingInvoiceCurrency").val()
            , pExchangeRate: $("#txtPurchasingInvoiceExchangeRate").val()
            , pInvoiceDate: $("#txtPurchasingInvoiceDate").val()
            , pTaxTypeID: 0
            , pTaxPercentage: 0
            , pTaxAmount: 0
            , pDiscountTypeID: 0
            , pDiscountPercentage: 0
            , pDiscountAmount: 0
            , pAmount: 0 //(parseFloat($("#txtPurchasingInvoiceAmount").val()) + parseFloat($("#txtPurchasingInvoiceItemAmount").val()))
            , pNotes: $("#txtPurchasingInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchasingInvoiceNotes").val().trim().toUpperCase()
            , pBranchID: $("#slOperationEditBranch").val() //$("#hUserBranchID").val()
            , pIsApproved: false
            , pIsDeleted: false
            , pApprovingUserID: 0
            , pPaymentTermID: $("#slPurchasingInvoicePaymentTerm").val()

            //LoadWithPaging parameters
            , pWhereClausePurchasingInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
            , pPageSize: 99999 //$("#select-page-size").val()
            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ID"
            //PurchasingInvoiceItem
            , pPurchasingInvoiceItemID: $("#hPurchasingInvoiceItemID").val() == "" ? 0 : $("#hPurchasingInvoiceItemID").val()
            , pItemID: $("#slPurchasingInvoiceItem").val()
            , pItemAmount: $("#txtPurchasingInvoiceItemUnitPrice").val() == "" ? 0 : (parseFloat($("#txtPurchasingInvoiceItemUnitPrice").val()) * parseFloat($("#txtPurchasingInvoiceItemQuantity").val())).toFixed(3)
            , pItemNotes: $("#txtPurchasingInvoiceItemNotes").val().trim() == "" ? "0" : $("#txtPurchasingInvoiceItemNotes").val().trim().toUpperCase()
            , pUnitPrice: $("#txtPurchasingInvoiceItemUnitPrice").val() == "" ? 0 : $("#txtPurchasingInvoiceItemUnitPrice").val()
            , pQuantity: $("#txtPurchasingInvoiceItemQuantity").val() == "" ? 0 : $("#txtPurchasingInvoiceItemQuantity").val()
            , pPartNumber: $("#txtPurchasingInvoiceItemPartNumber").val().trim() == "" ? 0 : $("#txtPurchasingInvoiceItemPartNumber").val().trim().toUpperCase()
            , pCountryOfOriginID: $("#slPurchasingInvoiceItemCountryOfOrigin").val()
            , pHSCode: $("#txtPurchasingInvoiceItemHSCode").val().trim() == "" ? 0 : $("#txtPurchasingInvoiceItemHSCode").val().trim().toUpperCase()
            , pIsFromOpeningBalanceFlexi: window.IsOpeningBalanceFlexi
        };
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    //var _Payables = JSON.parse(pData[6]); //delete if no update
                    //Payables_BindTableRows(_Payables); //delete if no update
                    $("#hPurchasingInvoiceID").val(pData[1]);
                    $("#txtPurchasingInvoiceNumber").val(pData[2]);

                    PurchasingInvoiceItem_BindTableRows(JSON.parse(pData[3])); //pPurchasingInvoiceItem: pData[3]

                    if (window.IsOpeningBalanceFlexi)
                        PurchasingInvoice_OpeningBalance_BindTableRows(JSON.parse(pData[4]));
                    else
                        PurchasingInvoice_BindTableRows(JSON.parse(pData[4])); //pPurchasingInvoice: pData[4]

                    $("#txtPurchasingInvoiceAmount").val(pData[5]); //pPurchasingInvoiceAmount:pData[5]
                    if (pSaveAndNew)
                        PurchasingInvoiceItem_ClearAllControls();
                    else
                        jQuery("#PurchasingInvoiceItemModal").modal("hide");
                    //$("#btnSavePurchasingInvoice").attr("onclick", "PurchasingInvoiceItem_Save(false, false);");
                    //$("#btnSavePurchasingInvoiceAndPrint").attr("onclick", "PurchasingInvoiceItem_Save(false, true);");
                }
                else
                    swal("Sorry", "Connection failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
}
function PurchasingInvoiceItem_DeleteList() {
    debugger;
    var pDeletedPurchasingInvoiceItemIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblPurchasingInvoiceItem", "Delete");
    if (pDeletedPurchasingInvoiceItemIDs != "")
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
            if (ValidateForm("form", "PurchasingInvoiceModal")) {
                var pParametersWithValues = {
                    //Header
                    pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
                    , pEditableCode: $("#txtPurchasingInvoiceNumber").val() == "" ? 0 : $("#txtPurchasingInvoiceNumber").val() //effects only update
                    , pOperationID: $("#slPurchasingInvoiceOperations").val() == "" ? 0 : $("#slPurchasingInvoiceOperations").val()
                    , pClientOperationPartnerID: $("#slPurchasingInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchasingInvoiceOperationCustomer").val()
                    , pClientAddressID: $("#slPurchasingInvoiceCustomerAddress").val()
                    , pClientPrintedAddress: 0
                    , pSupplierOperationPartnerID: $("#slPurchasingInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchasingInvoiceOperationSupplier").val()
                    , pSupplierAddressID: $("#slPurchasingInvoiceSupplierAddress").val()
                    , pSupplierPrintedAddress: 0
                    , pCurrencyID: $("#slPurchasingInvoiceCurrency").val()
                    , pExchangeRate: $("#txtPurchasingInvoiceExchangeRate").val()
                    , pInvoiceDate: $("#txtPurchasingInvoiceDate").val()
                    , pNotes: $("#txtPurchasingInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchasingInvoiceNotes").val().trim().toUpperCase()
                    , pPaymentTermID: $("#slPurchasingInvoicePaymentTerm").val()
                    //, pBranchID: $("#hUserBranchID").val()

                    //LoadWithPaging parameters
                    , pWhereClausePurchasingInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
                    , pPageSize: 99999 //$("#select-page-size").val()
                    , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID"
                    //DeletePurchasingInvoiceItemIDs
                    , pDeletedPurchasingInvoiceItemIDs: pDeletedPurchasingInvoiceItemIDs
                };
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoiceItem_Delete", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            var _Payables = JSON.parse(pData[3]);
                            PurchasingInvoiceItem_BindTableRows(JSON.parse(pData[0])); //pPurchasingInvoiceItem: pData[0]
                            PurchasingInvoice_BindTableRows(JSON.parse(pData[1])); //pPurchasingInvoice: pData[1]
                            $("#txtPurchasingInvoiceAmount").val(pData[2]); //Amount
                            Payables_BindTableRows(_Payables);
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        });//of swal
}
function PurchasingInvoiceItem_CalculateAmount(pIsResetUnitPrice) { //reset for case of PurchaseItem change
    debugger;
    var _UnitPrice = 0;
    if (pIsResetUnitPrice)
        _UnitPrice = $("#slPurchasingInvoiceItem option:selected").attr("Price");
    else
        _UnitPrice = $("#txtPurchasingInvoiceItemUnitPrice").val() == "" ? 0 : $("#txtPurchasingInvoiceItemUnitPrice").val();
    var _Quantity = $("#txtPurchasingInvoiceItemQuantity").val() == "" ? 0 : $("#txtPurchasingInvoiceItemQuantity").val();
    var _Amount = _UnitPrice * _Quantity;
    $("#txtPurchasingInvoiceItemUnitPrice").val(_UnitPrice);
    $("#txtPurchasingInvoiceItemAmount").val(_Amount.toFixed(3));
    return $("#txtPurchasingInvoiceItemAmount").val();
}
/*******************Flexi Import*********************/
function FlexiSerial_BindTableRows(pFlexi, pContainerList) {
    debugger;
    $("#tblAvailableFlexi tbody tr").html("");
    $.each(pFlexi, function (i, item) {
        AppendRowtoTable("tblAvailableFlexi",
        ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='Flexi_FillControls(" + item.ID + ");'") : "") + ">"
            + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>"
            + "<td class='ID'> <input " + (item.ExportOperationID == 0 || !$("#cbIsImport").prop("checked") ? " name='Delete' " : " disabled='disabled' ") + (item.ExportPurchaseInvoiceID != 0 && !$("#cbIsImport").prop("checked")/*because if import this checkbox is used for delete*/ ? " checked='checked' " : "") + " type='checkbox' id='cbIsFlexiSelected" + item.ID + "' value='" + item.ID + "'></td>"
            //+ "<td class='PurchaseItemID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiPurchaseItemID" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.PurchaseItemID + "' /> </td>"
            + "<td class='Code'> <input " + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiCode" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.Code + "' /> </td>"
            + "<td class='ExportPrice'> <input" + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiExportPrice" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + item.ExportPrice + "' /> </td>"
            //+ "<td class='ContainerNumber'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiContainerNumber" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' /> </td>"
            + ($("#cbIsImport").prop("checked")
                ? "<td class='ContainerNumber'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiContainerNumber" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' /> </td>"
                : ("<td class='Container'> <select " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%;' id='slFlexiContainer" + item.ID + "' class='form-control controlStyle text-center' data-required='false'></select></td>")
              )
            + "<td class='Notes'> <input " + ($("#cbIsImport").prop("checked") ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtFlexiNotes" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='Flexi_SetIsRowChanged(id);' data-required='false' value='"
                                + ($("#cbIsImport").prop("checked") && item.ExportOperationID > 0
                                    ? ("Added to " + item.ExportOperationCode)
                                    : (item.Notes == 0 ? "" : item.Notes)
                                   ) + "' /> </td>"
            //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            + "<td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='hide'><a href='#FlexiModal' data-toggle='modal' onclick='Flexi_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });
    if (!$("#cbIsImport").prop("checked"))
        $.each(pFlexi, function (i, item) {
            FillListFromObject(item.ContainerID, 1/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slFlexiContainer" + item.ID, pContainerList, null);
        });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblAvailableFlexi", "ID", "cb-CheckAll-Flexi");
    CheckAllCheckbox("HeaderDeleteFlexiID");
    HighlightText("#tblAvailableFlexi>tbody>tr", $("#txtSearchFlexiItems").val().trim());
}
//pFlexiOption: 0-NotFlexi
function FlexiSerial_SetProperties(pFlexiOption) {
    debugger;
    if (pFlexiOption > 0) {
        $(".classHideForFlexi").addClass("hide");
        $(".classDisableForFlexi").attr("disabled", "disabled");
        $("#h3ModalLblPurchasingInvoiceType").text("Flexi");
        $("#slPurchasingInvoiceOperationSupplier").attr("data-required", false);
    }
}
function FlexiSerial_FillSingleFlexiSerialModal() {
    debugger;
    ClearAll("#SingleFlexiSerialModal");
    jQuery("#SingleFlexiSerialModal").modal("show");
}
function FlexiSerial_SaveSingleFlexiSerial() {
    debugger;
    if (ValidateForm("form", "SingleFlexiSerialModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pSingFlexiSerialID: $("#hSingleFlexiSerialID").val() == "" ? 0 : $("#hSingleFlexiSerialID").val()
            , pOperationID: $("#hOperationID").val()
            , pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
            , pPurchasingInvoiceItemID: $("#hPurchasingInvoiceItemID").val() == "" ? 0 : $("#hPurchasingInvoiceItemID").val()
            , pCode: $("#txtSingleFlexiSerialCode").val().trim() == "" ? 0 : $("#txtSingleFlexiSerialCode").val().trim().toUpperCase()
            , pIsFromOpeningBalanceFlexi: window.IsFromOpeningBalanceFlexi
        };
        CallGETFunctionWithParameters("/api/PurchaseInvoice/Flexi_SaveSingleFlexiSerial", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var _PurchasingInvoiceHeader = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[6]) : JSON.parse(pData[1]));
                var _PurchasingInvoice = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[7]) : JSON.parse(pData[2]));
                var _PurchasingInvoiceItems = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[8]) : JSON.parse(pData[3]));
                var _Flexi = (window.IsOpeningBalanceFlexi ? JSON.parse(pData[9]) : JSON.parse(pData[4]));
                var _ContainerList = pData[5];
                if (_MessageReturned == "") {
                    $("#txtPurchasingInvoiceAmount").val(_PurchasingInvoiceHeader.Amount);
                    FlexiSerial_BindTableRows(_Flexi, $("#cbIsImport").prop("checked") ? null : _ContainerList);
                    PurchasingInvoiceItem_BindTableRows(_PurchasingInvoiceItems);
                    (window.IsOpeningBalanceFlexi == true ? PurchasingInvoice_OpeningBalance_BindTableRows(_PurchasingInvoice) : PurchasingInvoice_BindTableRows(_PurchasingInvoice));
                    swal("Success", "Saved Successfully.");
                    ClearAll("#SingleFlexiSerialModal");
                    //jQuery("#SingleFlexiSerialModal").modal("hide");
                }
                else {
                    swal("Sorry", _MessageReturned);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function FlexiSerial_FillModal(pPurchasingInvoiceItemID) {
    debugger;
    if (ValidateForm("form", "PurchasingInvoiceModal")) {
        FadePageCover(true);
        $("#tblAvailableFlexi tbody tr").html("");
        var pWhereClauseFlexi = "";
        var pFlexiPurchasingInvoiceItemID = $("#tblPurchasingInvoiceItem tbody tr").length == 0 ? 0 : $("#tblPurchasingInvoiceItem tbody tr")[0].id;
        if (pPurchasingInvoiceItemID != undefined)
            $("#hPurchasingInvoiceItemID").val(pPurchasingInvoiceItemID);
        else {
            $("#hPurchasingInvoiceItemID").val(pFlexiPurchasingInvoiceItemID);
        }
        if ($("#cbIsImport").prop("checked")) {
            if (window.IsOpeningBalanceFlexi)
                pWhereClauseFlexi = "WHERE (ImportPurchaseInvoice_OpeningBalanceItemID =" + pFlexiPurchasingInvoiceItemID + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            else
                pWhereClauseFlexi = "WHERE (ImportPurchaseInvoiceItemID=" + pPurchasingInvoiceItemID + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            $(".classShowFlexiImport").removeClass("hide");
        }
        else { //Export
            pWhereClauseFlexi = "WHERE (ExportPurchaseInvoiceItemID IS NULL OR ExportPurchaseInvoiceItemID=" + $('#hTransactionID').val() + ") AND Code LIKE N'%" + $("#txtSearchFlexiItems").val().trim().toUpperCase() + "%'";
            $(".classShowFlexiExport").removeClass("hide");
            $("#btnCheckboxesFlexiListApply").attr("onclick", "FlexiExport_SaveSelectedItems();");
            $("#btnCheckboxesFlexiListApply").html("<span class='glyphicon glyphicon-save'></span> Save Flexi");
        }
        jQuery("#CheckboxesListFlexiModal").modal("show");
        $("#btn-SearchItems-Flexi").attr("onclick", "FlexiSerial_FillModal();");
        var pParametersWithValues = {
            pWhereClauseFlexi: pWhereClauseFlexi
            , pOperationID: $("#hOperationID").val()
            , pOrderBy: "ExportPurchaseInvoiceID desc,Code"
        };
        CallGETFunctionWithParameters("/api/PurchaseInvoice/Flexi_LoadAll", pParametersWithValues
            , function (pData) {
                var _Flexi = JSON.parse(pData[0]);
                var _ContainerList = pData[1];
                var _Flexi_OpeningBalance = JSON.parse(pData[2]);
                FlexiSerial_BindTableRows((window.IsOpeningBalanceFlexi ? _Flexi_OpeningBalance : _Flexi), $("#cbIsImport").prop("checked") ? null : _ContainerList);
                FadePageCover(false);
            }
            , null);
    }
}
//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function FlexiImport_onFileSelected(event/*, pPurcharseInvoiceItemID*/) {
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
                if (oJS.length > 0 && oJS[0].Code != undefined) //if (sCSV != "")
                    FlexiImport_ImportFromExcelFile(oJS);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#btnAddFlexiFromExcel").val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
//function FlexiImport_ImportFromExcelFile(pDataRows) {
//    debugger;
//    if ($("#slPurchasingInvoiceType").val() == "") {
//        swal("Sorry", "Please, select invoice type.");
//        $("#btnAddFlexiFromExcel").val("");
//    }
//    else {
//        FadePageCover(true);
//        var pCodeList = "";
//        //var pNameList = "";
//        //var pPartNumberList = "";
//        //var pHSCodeList = "";
//        //var pPriceList = "";
//        for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
//            pCodeList += (pCodeList == "" ? (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())));
//            //pNameList += (pNameList == "" ? (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())));
//            //pPartNumberList += (pPartNumberList == "" ? (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PartNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())));
//            //pHSCodeList += (pHSCodeList == "" ? (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].HSCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].HSCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
//            //pPriceList += (pPriceList == "" ? (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Price.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Price.replace(/[\, ]/g, ' ').toUpperCase().trim())));
//        }
//        var pParametersWithValues = {
//            //Header
//            pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
//            , pInvoiceNumber: 0
//            , pEditableCode: $("#txtPurchasingInvoiceNumber").val() == "" ? 0 : $("#txtPurchasingInvoiceNumber").val() //effects only update
//            , pOperationID: $("#slPurchasingInvoiceOperations").val() == "" ? 0 : $("#slPurchasingInvoiceOperations").val()
//            , pClientOperationPartnerID: $("#slPurchasingInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchasingInvoiceOperationCustomer").val()
//            , pClientAddressID: $("#slPurchasingInvoiceCustomerAddress").val()
//            , pClientPrintedAddress: 0
//            , pSupplierOperationPartnerID: $("#slPurchasingInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchasingInvoiceOperationSupplier").val()
//            , pSupplierAddressID: $("#slPurchasingInvoiceSupplierAddress").val()
//            , pSupplierPrintedAddress: 0
//            , pAmountWithoutVAT: 0 //(parseFloat($("#txtPurchasingInvoiceAmount").val()) + parseFloat($("#txtPurchasingInvoiceItemAmount").val()))
//            , pCurrencyID: $("#slPurchasingInvoiceCurrency").val()
//            , pExchangeRate: $("#txtPurchasingInvoiceExchangeRate").val()
//            , pInvoiceDate: $("#txtPurchasingInvoiceDate").val()
//            , pTaxTypeID: 0
//            , pTaxPercentage: 0
//            , pTaxAmount: 0
//            , pDiscountTypeID: 0
//            , pDiscountPercentage: 0
//            , pDiscountAmount: 0
//            , pAmount: 0 //(parseFloat($("#txtPurchasingInvoiceAmount").val()) + parseFloat($("#txtPurchasingInvoiceItemAmount").val()))
//            , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
//            , pBranchID: $("#slOperationEditBranch").val() //$("#hUserBranchID").val()
//            , pIsApproved: false
//            , pIsDeleted: false
//            , pApprovingUserID: 0
//            , pPaymentTermID: $("#slPurchasingInvoicePaymentTerm").val()
//            , pInvoiceTypeID: $("#slPurchasingInvoiceType").val() == "" ? 0 : $("#slPurchasingInvoiceType").val()
//            , pInvoiceTypeName: $("#slPurchasingInvoiceType option:selected").text()
//            //LoadWithPaging parameters
//            , pWhereClausePurchasingInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
//            , pPageSize: 99999 //$("#select-page-size").val()
//            , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
//            , pOrderBy: "ID"
//            //PurchasingInvoiceItem
//            , pCodeList: pCodeList
//            //, pNameList: pNameList
//            //, pPartNumberList: pPartNumberList
//            //, pHSCodeList: pHSCodeList
//            //, pPriceList: pPriceList
//            , pIsOpeningBalanceFlexi: $("#cbIsOpeningBalanceFlexi").is(":checked")
//        };
//        CallPOSTFunctionWithParameters("/api/PurchaseInvoice/FlexiImport_SaveList", pParametersWithValues
//            , function (pData) {
//                var _MessageReturned = pData[0];
//                var _PurchasingInvoiceHeader = JSON.parse(pData[1]);
//                var _PurchasingInvoice = JSON.parse(pData[2]);
//                var _PurchasingInvoiceItems = JSON.parse(pData[3]);
//                if (_MessageReturned == "") {
//                    $("#hPurchasingInvoiceID").val(_PurchasingInvoiceHeader.ID);
//                    $("#txtPurchasingInvoiceNumber").val(_PurchasingInvoiceHeader.InvoiceNumber);
//                    $("#txtPurchasingInvoiceAmount").val(_PurchasingInvoiceHeader.Amount);






//                    PurchasingInvoiceItem_BindTableRows(_PurchasingInvoiceItems);

//                    if ($("#cbIsOpeningBalanceFlexi").is(":checked")) {
//                        window.IsOpeningBalanceFlexi = true;
//                        PurchasingInvoice_OpeningBalance_BindTableRows(_PurchasingInvoice);
//                    }
//                    else {
//                        window.IsOpeningBalanceFlexi = false;
//                        PurchasingInvoice_BindTableRows(_PurchasingInvoice);
//                    }




//                    $("#cbIsOpeningBalanceFlexi").prop('disabled', true);


//                    swal("Success", "Saved Successfully.");
//                }
//                else {
//                    swal("Sorry", "Please revise data and version of the file." + _MessageReturned);
//                }
//                FadePageCover(false);
//            }
//            , null);
//        $("#btnAddFlexiFromExcel").val(""); //if removed the last selected file remains till unselected
//    }
//}
function FlexiImport_DeleteFlexiSerial() {
    debugger;
    var pDeletedFlexiImportIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");
    if (pDeletedFlexiImportIDs == "") {
        swal(strSorry, "Please select at least one item.");
        FadePageCover(false);
    }
    else {
        //Confirmation message to delete
        if (pDeletedFlexiImportIDs != "")
            swal({
                title: "Are you sure?",
                text: "The deleted records will be deleted permanently.",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Delete!",
                closeOnConfirm: true
            },
            //callback function in case of confirm delete
            function () {
                var pParametersWithValues = {
                    pDeletedFlexiImportIDs: pDeletedFlexiImportIDs
                    , pOperationID: $("#hOperationID").val()
                    , pPurchasingInvoiceID: $("#hPurchasingInvoiceID").val() == "" ? 0 : $("#hPurchasingInvoiceID").val()
                    , pPurchasingInvoiceItemID: $("#hPurchasingInvoiceItemID").val() == "" ? 0 : $("#hPurchasingInvoiceItemID").val()
                };
                CallGETFunctionWithParameters("/api/PurchaseInvoice/FlexiImport_DeleteList", pParametersWithValues
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        var _PurchasingInvoiceHeader = JSON.parse(pData[1]);
                        var _PurchasingInvoice = JSON.parse(pData[2]);
                        var _PurchasingInvoiceItems = JSON.parse(pData[3]);
                        var _Flexi = JSON.parse(pData[4]);
                        var _ContainerList = pData[5];
                        if (_MessageReturned == "") {
                            $("#txtPurchasingInvoiceAmount").val(_PurchasingInvoiceHeader.Amount);
                            FlexiSerial_BindTableRows(_Flexi, $("#cbIsImport").prop("checked") ? null : _ContainerList);
                            PurchasingInvoiceItem_BindTableRows(_PurchasingInvoiceItems);
                            PurchasingInvoice_BindTableRows(_PurchasingInvoice);
                            swal("Success", "Saved Successfully.");
                        }
                        else {
                            swal("Sorry", _MessageReturned);
                        }
                        FadePageCover(false);
                    }
                    , null);
            });
    }
}
/*******************Flexi Export*********************/
function FlexiExport_SaveSelectedItems() {
    debugger;
    FadePageCover(true);
    var pSelectedFlexiSerialIDList = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");
    var pFlexiSerialIDList = GetAllIDsAsStringWithNameAttr("tblAvailableFlexi", "Delete");
    var pPricesList = GetAllSelectedPriceAsStringWithTableNameAndNameAttr("tblAvailableFlexi", "Delete");




    if (pFlexiSerialIDList == "") {
        swal("Sorry", "No available flexis.");
        FadePageCover(false);
    }
    else {
        var pFlexiPurchasingInvoiceItemID = $("#tblPurchasingInvoiceItem tbody tr").length == 0 ? 0 : $("#tblPurchasingInvoiceItem tbody tr")[0].id;
        var pIsFlexiSelected = "";
        var pFlexiExportPriceList = "";
        var pFlexiContainerIDList = "";
        var pFlexiNotesList = "";
        var NumberOfRows = pFlexiSerialIDList.split(',').length;
        var NumberOfSelectedRows = pSelectedFlexiSerialIDList.split(',').length;
        for (var i = 0; i < NumberOfRows; i++) {
            var currentRowID = pFlexiSerialIDList.split(",")[i];
            pIsFlexiSelected += ((pIsFlexiSelected == "") ? "" : ",") + ($("#cbIsFlexiSelected" + currentRowID).prop("checked") ? "1" : "0");
            pFlexiExportPriceList += ((pFlexiExportPriceList == "") ? "" : ",") + ($("#txtFlexiExportPrice" + currentRowID).val().trim() == "" ? "0" : $("#txtFlexiExportPrice" + currentRowID).val().trim().toUpperCase());
            pFlexiContainerIDList += ((pFlexiContainerIDList == "") ? "" : ",") + ($("#slFlexiContainer" + currentRowID).val().trim() == "" ? "0" : $("#slFlexiContainer" + currentRowID).val().trim().toUpperCase());
            pFlexiNotesList += ((pFlexiNotesList == "") ? "" : ",") + ($("#txtFlexiNotes" + currentRowID).val().trim() == "" ? "0" : $("#txtFlexiNotes" + currentRowID).val().trim().toUpperCase());



            if (i == NumberOfRows - 1) {

                var SumOfPrice = SumOfArrayOfString(pPricesList.split(','));
                console.log(" sum : " + SumOfPrice);

                var _Flexi = new Object();
                _Flexi.ItemID = FlexiItem[0].ID;
                _Flexi.Qty = IsNull(NumberOfSelectedRows, 0);
                _Flexi.Price = SumOfPrice;
                _Flexi.UnitID = FlexiItem[0].PackageTypeID;
                _Flexi.CurrencyID = FlexiItem[0].CurrencyID;

                _Flexi.pIsFlexiSelected = pIsFlexiSelected;
                _Flexi.pFlexiExportPriceList = pFlexiExportPriceList;
                _Flexi.pFlexiContainerIDList = pFlexiContainerIDList;
                _Flexi.pFlexiNotesList = pFlexiNotesList;

                _Flexi.pFlexiSerialIDList = pFlexiSerialIDList;
                if (IsNull($('#hTransactionID').val(), "0") == "0")
                    SC_Transactions_InsertForFlexi(false, _Flexi);
                else
                    SC_Transactions_UpdateForFlexi(false, _Flexi);

            }

        }

    } //if (pFlexiSerialIDList != "") {
}
/****************************EOF PurchasingInvoice & PurchasingInvoiceDetails*******************************************/

function Flexi_SetIsRowChanged(pID) {
    debugger;
}


function GetAllSelectedPriceAsStringWithTableNameAndNameAttr(pTableName, pCheckboxNameAttr) {
    debugger;
    var listOfPrices = "";
    $('#' + pTableName + ' td').find('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {

        var tr = $(this).closest('tr');
        var PriceInput = $(tr).find("td.ExportPrice input");
        listOfPrices += ((listOfPrices == "") ? "" : ",") + (IsNull($(PriceInput).val() , "0"));
    });
    return listOfPrices;
}

  function  SumOfArrayOfString(arr)
  {
      return arr.reduce((pv, cv) => {
          return pv + (parseFloat(cv) || 0);
      }, 0)

  }

function SC_Transactions_InsertForFlexi(pSaveandAddNew, FlexiData) {
    IsInsert = true;
    FadePageCover(true);

    setTimeout(function () {

        if (($('#txtPurchaseInvoiceDate').val().trim() != "" && isValidDate($('#txtPurchaseInvoiceDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Insert", {
                pCode: "0",
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($("#txtPurchaseInvoiceDate").val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()),
                pSLInvoiceID: "0",
                pDepartmentID: "0",
                pClientID: IsNull($("#slPurchaseInvoiceOperationCustomer option:selected").attr('partnerid'), ""),
                pCostCenterID: "0",
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: "0",
                pTransactionTypeID: "20",
                pJV_ID: "0",
                pIsOutOfStore: false,
                pMaterialIssueRequesitionsID: "0",
                pToStoreID: 0,
                pP_ProductionRequestID: 0,
                pP_UnitID: 0,
                pP_ItemID: 0,
                pP_LineID: 0,
                pP_Qty: 0,
                pP_FinishedDate: "01/01/1800",
                pP_StartDate: "01/01/1800",
                pEntitlementDays: 0,
                pIsClosed: false,
                pFromStore: IsNull($('#slSC_Stores').val(), 0),
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: 0,
                pOperationID: IsNull($("#hOperationID").val(), "0"),
                pBranchID: $("#slOperationEditBranch").val(),
                pIsFromFlexi: "true"
                , pTrailerID: "0",
                pEquipmentID: "0",
                pDivisionID: "0"
            }, pSaveandAddNew, null, '#hTransactionID', function () {

                InsertUpdateFunctionForSC_Transactions("form", "/api/SC_Transactions/InsertItems",
                    JSON.stringify(SetArrayOfItems_ForFlexi(FlexiData))
                    , pSaveandAddNew, "PurchaseInvoiceModal", function (Code) {
                        FadePageCover(true)
                        all_has_store = false;

                        // FlexiData.pTransactionID ;
                        SaveExportFlexiData(FlexiData);
                        //setTimeout(function () 
                        //{
                        //    SC_Transactions_LoadingWithPaging();
                        //    IntializeData();
                        //    ClearAllTableRows('tblItems');
                        //    all_has_store = false;

                        //}, 300);

                    });
            });
        }
        else {
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
        }
    }, 30);
}

function SC_Transactions_UpdateForFlexi(pSaveandAddNew , FlexiData)
{
    IsInsert = false;
    FadePageCover(true);

    setTimeout(function () {

        if (($('#txtPurchaseInvoiceDate').val().trim() != "" && isValidDate($('#txtPurchaseInvoiceDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
                pID:$('#hTransactionID').val(),
                pCode: $('#txtPurchaseInvoiceNumber').val(),
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($("#txtPurchaseInvoiceDate").val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()),
                pSLInvoiceID: "0",
                pDepartmentID: "0",
                pClientID: IsNull($("#slPurchaseInvoiceOperationCustomer option:selected").attr('partnerid') , "" ),
                pCostCenterID: "0",
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: "0",
                pTransactionTypeID: "20",
                pJV_ID: "0", 
                pIsOutOfStore: false,
                pMaterialIssueRequesitionsID: "0",
                pToStoreID: 0,
                pP_ProductionRequestID: 0,
                pP_UnitID: 0,
                pP_ItemID: 0,
                pP_LineID: 0,
                pP_Qty: 0,
                pP_FinishedDate: "01/01/1800",
                pP_StartDate: "01/01/1800",
                pEntitlementDays: 0,
                pIsClosed: false,
                pFromStore: IsNull( $('#slSC_Stores').val() , 0 ),
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: 0,
                pOperationID: IsNull($("#hOperationID").val(), "0"),
                pBranchID: $("#slOperationEditBranch").val(),
                pIsFromFlexi: "true"
                , pTrailerID: "0",
                pEquipmentID: "0",
                pDivisionID: "0"
            }, pSaveandAddNew, null, '#hTransactionID', function () {

                    InsertUpdateFunctionForSC_Transactions("form", "/api/SC_Transactions/InsertItems",
                        JSON.stringify(SetArrayOfItems_ForFlexi(FlexiData))
                        , pSaveandAddNew, "PurchaseInvoiceModal", function (Code) {
                        FadePageCover(true)
                        all_has_store = false;

                       // FlexiData.pTransactionID ;
                        SaveExportFlexiData(FlexiData);
                        //setTimeout(function () 
                        //{
                        //    SC_Transactions_LoadingWithPaging();
                        //    IntializeData();
                        //    ClearAllTableRows('tblItems');
                        //    all_has_store = false;

                        //}, 300);

                    });
            });
        }
        else {
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
        }
    }, 30);
}

function SC_TransactionsForFlexi_Delete(pID, pDate) {
    swal({
        title: "Are you sure?",
        text: "This Transaction will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {

            InsertUpdateFunction("form", "/api/SC_Transactions/Delete",
                { 'pTransactionsID': pID, 'pTransactionDate': ConvertDateFormat(pDate) + " 07:00:00 PM" }
                , false, "SC_TransactionsModal", function (data) {
                    if (data[1].trim() == '') {
                        CallGETFunctionWithParameters("/api/SC_Transactions/LoadWithWhereClause",
                            {
                                pPageNumber: 1
                                , pPageSize: 999999
                                , pWhereClause: " WHERE OperationID=" + IsNull($("#hOperationID").val(), "0") + " AND IsNull( IsDeleted , 0 ) = 0 AND  TransactionTypeID = 20 AND IsNull(IsFromFlexi , 0) = 1 "
                            }
                            , function (pData) { SC_TransactionsForFlexi_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
                            , null);
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });



            // DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () {  });
        });

}

function SC_TransactionsForFlexi_EditByDblClick(pID, pIsApproved) {
    _IsApproved = pIsApproved;
    jQuery("#PurchaseInvoiceModal").modal("show");
    SC_TransactionsForFlexi_FillControls(pID);
}

function SC_TransactionsForFlexi_FillControls(pID) {


    debugger;
    ClearAll("#PurchaseInvoiceModal", null);
    if ($("#hShipmentType").val() == constFlexiShipmentType) {
        FlexiSerial_SetProperties(1);
    }
    $("#tblPurchaseInvoiceItem tbody").html("");
    $("#tblSC_Items tbody").html("");
    
    $("#txtPurchaseInvoiceDate").val(getTodaysDateInddMMyyyyFormat());
    debugger;
    $("#slPurchaseInvoiceCurrency").val($("#hDefaultCurrencyID").val());
    $("#slPurchaseInvoiceSupplierAddress").html('<option value="0">'+TranslateString("SelectFromMenu")+'</option>');
    $("#slPurchaseInvoiceCustomerAddress").html('<option value="0">'+TranslateString("SelectFromMenu")+'</option>');
    $("#txtPurchaseInvoiceAmount").val(0);
    $("#txtPurchaseInvoiceExchangeRate").attr("disabled", "disabled");
    $("#txtPurchaseInvoiceExchangeRate").val(1);



    //InvoiceOperations_GetList($("#hOperationID").val(), "slPurchaseInvoiceOperations");
    //InvoicePartners_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationCustomer", null);
    //InvoiceSuppliers_GetList(null, $("#hOperationID").val(), "slPurchaseInvoiceOperationSupplier", null);
    var pWhereClauseInvoiceOperations = "";
    pWhereClauseInvoiceOperations = " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + " OR ID = " + $("#hMasterOperationID").val() + " OR MasterOperationID = " + $("#hMasterOperationID").val();

    //var pWhereClauseInvoiceClients = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";
    var pWhereClauseInvoiceClients = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
    pWhereClauseInvoiceClients += " AND PartnerID IS NOT NULL ";
    pWhereClauseInvoiceClients += " AND (PartnerTypeID = " + constCustomerPartnerTypeID;
    if (!($("#cbIsFlexi").prop('checked')))
        pWhereClauseInvoiceClients += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
    else
        pWhereClauseInvoiceClients += " )";

    pWhereClauseInvoiceClients += " ORDER BY PartnerTypeName ";
    //var pWhereClauseInvoiceSuppliers = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + " OR OperationID = " + pMasterOperationID + " OR MasterOperationID = " + pMasterOperationID + " ) \n";


    var pWhereClauseInvoiceSuppliers = "";


        pWhereClauseInvoiceSuppliers = " WHERE OperationID = " + $("#hOperationID").val() + " \n";
        pWhereClauseInvoiceSuppliers += " AND PartnerID IS NOT NULL ";
        pWhereClauseInvoiceSuppliers += " AND (PartnerTypeID = " + constSupplierPartnerTypeID;
        pWhereClauseInvoiceSuppliers += " OR PartnerTypeID = " + constAgentPartnerTypeID + ") ";
        pWhereClauseInvoiceSuppliers += " ORDER BY PartnerTypeName ";


    var pControllerParameters = {
        pPurchaseInvoiceID: 0
        , pWhereClauseInvoiceOperations: pWhereClauseInvoiceOperations
        , pWhereClauseInvoiceClients: pWhereClauseInvoiceClients
        , pWhereClauseInvoiceSuppliers: pWhereClauseInvoiceSuppliers
    };
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseInvoice/PurchaseInvoice_LoadWithDetails"
        , pControllerParameters
        , function (pData) {



            var tr = $("#tblSC_TransactionsForExportFlexi > tbody > tr[ID='" + pID + "']");
            var pHeader = JSON.parse(pData[0]);
            var pPurchaseInvoiceItems = JSON.parse(pData[1]);
            var pInvoiceOperations = pData[2];
            var pOperationClient = pData[3];
            var pOperationSupplier = pData[4];
            var pPaymentTerm = pData[5];
            var pStores = pData[6];
            FlexiItem = JSON.parse(pData[7]);
            FillListFromObject(null, 14/*OperationsWithHouse*/, null, "slPurchaseInvoiceOperations", pInvoiceOperations, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationCustomer", pOperationClient, null);
            FillListFromObject(null, 15/*OperationPartner*/, TranslateString("SelectFromMenu"), "slPurchaseInvoiceOperationSupplier", pOperationSupplier, null);
            FillListFromObject_ERP(null, 2, TranslateString("SelectFromMenu"), "slPurchaseInvoicePaymentTerm", pPaymentTerm, null);
            debugger
            //FillListFromObject(null, 2, "<--Select-->", 'slStores', pStores, null);
            Fill_SelectInputAfterLoadData(pStores, 'ID', 'StoreName', null, '#slSC_Stores', '');

            debugger;
            $("#hTransactionID").val(pID);
          




            RollBackData.ID = pID;
            RollBackData.CodeManual = $(tr).find("td.CodeManual").attr('val');
            RollBackData.Code = $(tr).find("td.Code").attr('val');
            console.log("Old Date :" + $(tr).find("td.TransactionDate").attr('val'))
            RollBackData.TransactionDate = ConvertDateFormat($(tr).find("td.TransactionDate").attr('val'));
            RollBackData.PurchaseInvoiceID = $(tr).find("td.PurchaseInvoiceID").attr('val');
            RollBackData.PurchaseOrderID = $(tr).find("td.PurchaseOrderID").attr('val');
            RollBackData.ExaminationID = $(tr).find("td.ExaminationID").attr('val');
            RollBackData.IsApproved = $(tr).find("td.IsApproved").attr('val');
            RollBackData.Notes = $(tr).find("td.Notes").attr('val');
            RollBackData.SLInvoiceID = $(tr).find("td.SLInvoiceID").attr('val');
            RollBackData.DepartmentID = $(tr).find("td.DepartmentID").attr('val');
            RollBackData.ClientID = $(tr).find("td.ClientID").attr('val');
            RollBackData.CostCenterID = $(tr).find("td.CostCenterID").attr('val');
            RollBackData.IsSpareParts = $(tr).find("td.IsSpareParts").attr('val');
            RollBackData.FiscalYearID = $(tr).find("td.FiscalYearID").attr('val');
            RollBackData.SupplierID = $(tr).find("td.SupplierID").attr('val');
            RollBackData.ParentID = $(tr).find("td.ParentID").attr('val');
            RollBackData.TransactionTypeID = $(tr).find("td.TransactionTypeID").attr('val');
            RollBackData.JV_ID = $(tr).find("td.JV_ID").attr('val');
            RollBackData.IsOutOfStore = $(tr).find("td.IsOutOfStore").attr('val');
            RollBackData.MaterialIssueRequesitionsID = $(tr).find("td.MaterialIssueRequesitionsID").attr('val');
            RollBackData.ToStoreID = $(tr).find("td.ToStoreID").attr('val');
            RollBackData.P_ProductionRequestID = $(tr).find("td.P_ProductionRequestID").attr('val');
            RollBackData.P_UnitID = $(tr).find("td.P_UnitID").attr('val');
            RollBackData.P_ItemID = $(tr).find("td.P_ItemID").attr('val');
            RollBackData.P_LineID = $(tr).find("td.P_LineID").attr('val');
            RollBackData.P_Qty = $(tr).find("td.P_Qty").attr('val');
            RollBackData.P_FinishedDate = $(tr).find("td.P_FinishedDate").attr('val');
            RollBackData.P_StartDate = $(tr).find("td.P_StartDate").attr('val');
            RollBackData.EntitlementDays = $(tr).find("td.EntitlementDays").attr('val');
            RollBackData.IsClosed = $(tr).find("td.IsClosed").attr('val');
            RollBackData.FromStore = $(tr).find("td.FromStore").attr('val');
            RollBackData.JV_ID2 = $(tr).find("td.JV_ID2").attr('val');
            RollBackData.TransferParentID = $(tr).find("td.TransferParentID").attr('val');
            RollBackData.ForwardingPSInvoiceID = $(tr).find("td.ForwardingPSInvoiceID").attr('val');
            RollBackData.OperationID = $(tr).find("td.OperationID").attr('val');
            RollBackData.BranchID = $(tr).find("td.BranchID").attr('val');
            RollBackData.IsFromFlexi = $(tr).find("td.IsFromFlexi").attr('val');



            LoadAll("/api/SC_Transactions/LoadItems", "where \'Details\' = \'Details\' AND ID = " + $('#hTransactionID').val(), function (pTabelRows) {
                var tr = $("#tblSC_TransactionsForExportFlexi > tbody > tr[ID='" + pID + "']");

                $("#txtPurchaseInvoiceDate").val($(tr).find("td.TransactionDate").attr('val'));
                $("#txtPurchaseInvoiceNotes").val($(tr).find("td.Notes").attr('val'));

                $('#txtPurchaseInvoiceNumber').val($(tr).find("td.Code").attr('val'));
                $('#slSC_Stores').val($(tr).find("td.FromStore").attr('val'));

                $("#slPurchaseInvoiceOperationCustomer option[partnerid=" + $(tr).find("td.ClientID").attr('val') + "]").prop('selected', true);



                $('#btn-AddPurchaseInvoiceItem').addClass('hide');


                $('#slSC_Stores').prop('disabled', true)
                $('#slPurchaseInvoiceOperationCustomer').prop('disabled', true)
                $('#txtPurchaseInvoiceDate').prop('disabled', true)
                SC_TransactionsDetails_BindTableRowsForFLexi(pTabelRows);
            });
            FadePageCover(false);
        }
        , null);
    //$("#btnSavePurchaseInvoice").attr("onclick", "PurchaseInvoice_Insert(false, false);");
    //$("#btnSavePurchaseInvoiceAndPrint").attr("onclick", "PurchaseInvoice_Insert(false, true);");
    jQuery("#PurchaseInvoiceModal").modal("show");








            
}

var RequestStoreID = 0;
function SC_TransactionsDetails_BindTableRowsForFLexi(pItems) {
   // $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Items");
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";

    $.each(JSON.parse(pItems), function (i, item) {
        AppendRowtoTable("tblSC_Items",
            ("<tr isdeleted='0' ID='" + item.ID + "'  counter='" + (RowsCounter + 1) + "' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID) + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID) + "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger hide'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button'  onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + item.D_ItemName + "</td>"
                + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + item.D_UnitName + "</td>"
                + "<td class='Qty' val='" + item.Qty_D + "'>" + item.Qty_D + "</td>"
                + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + item.D_StoreName + "</td>"
                + "<td class='QuantityInStore hide' val='" + (typeof item.D_ID === 'undefined' ? item.ID : item.D_ID) + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + item.D_Notes + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + 0 + "'>" + 0 + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='AveragePrice hide' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "'>" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "</td>"
                + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "20" + "'>" + "20" + "</td>"
                + "<td class='serial'>" + "<a href='#FlexiSerialModal' data-toggle='modal' onclick='FlexiSerial_FillModal(" + 0 + ");' " + serialControlsText + "</a>" + "</td>"
                + "</tr>"));
        RowsCounter++;
    });
    ApplyPermissions();
    //  BindAllCheckboxonTable("tblSC_Transactions", "ID");
    //  CheckAllCheckbox("ID");
    //  HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {

        // $('#tblItems > tbody > tr').find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);

        $($('#tblSC_Items > tbody > tr')).each(function (i, tr) {
            // element == this
            $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
            $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
            $(tr).find('td.Qty ').find('.inputquantity').val($(tr).find('td.Qty  ').find('.inputquantity').attr('tag'));
            $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
            $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        });
      //  SC_HideShowEditBtns(_IsApproved);
    }, 300);

}


function PrintTransactionForFlexi(pID)
{
    FadePageCover(true)
    LoadAll("/api/SC_Transactions/LoadItems", "where \'Details\' = \'Details\' AND ID = " + pID, function (pTabelRows) {
        SC_DrawMaterialIssueVoucher(JSON.parse(pTabelRows));
    });

}

function SC_DrawMaterialIssueVoucher(items) {
    var Header = items[0];
    var footer = ""
    footer += '         <div style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    var a = "استلمت الأصناف الموضحة أعلاه";
    a = a + "<br/>";
    a = a + "رئيس العنبر"
    a = a + "<br/>";
    a = a + "....................";
    var b = "تم تسليم الكمية الموضحة أعلاه";
    b = b + "<br/>";
    b = b + "أمين المخزن";
    b = b + "<br/>";
    b = b + "....................";
    footer += '         <div class="col-xs-4"> ' + a + '</div>';
    footer += '         <div class="col-xs-5">' + b + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';

    footer += '         <div class="row"><hr/></div>';



    var a1 = "يعتمد";
    a1 = a1 + "<br/>";
    a1 = a1 + "المدير العام";
    a1 = a1 + "<br/>";
    a1 = a1 + "....................";

    var b1 = "";
    b1 = b1 + "<br/>";
    b1 = b1 + "مدير الحسابات";
    b1 = b1 + "<br/>";
    b1 = b1 + "....................";

    var c1 = "";
    c1 = c1 + "<br/>";
    c1 = c1 + "المحاسب";
    c1 = c1 + "<br/>";
    c1 = c1 + "....................";
    footer += '         </div>';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="col-xs-3">' + a1 + '</div>';
    footer += '         <div class="col-xs-3">' + b1 + '</div>';
    footer += '         <div class="col-xs-3">' + c1 + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    var pReportTitle = "إذن صرف أصناف من المخازن رقم   ";
    pReportTitle += "<br>"
    pReportTitle += Header.Code;
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>الصنف</th><th>الكمية</th><th>الوحدة</th><th>المخزن</th><th>الملاحظات</th></thead>'
    pTablesHTML += '<tbody>';
    $(items).each(function (i, item) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + item.D_ItemName + '</td>';
        pTablesHTML += '<td>' + item.Qty_D + '</td>';
        pTablesHTML += '<td>' + item.D_UnitName  + '</td>';
        pTablesHTML += '<td>' + item.D_StoreName  + '</td>';
        pTablesHTML += '<td>' + '' + '</td>';
        pTablesHTML += '</tr>';
    });
    pTablesHTML += '</tbody></table>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html dir="rtl">';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';

    ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
    ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '         <div id="Reportbody">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>بواسطة:</b> ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>كود الحركة: </b> ' + Header.Code+ '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>العميل: </b> ' + Header.PartnerName+ '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الاذن : </b> ' + GetDateFromServer( Header.TransactionDate )+ '</div>';
    ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات : </b> ' + Header.Notes + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += ('</div>' + footer);

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();
    FadePageCover(false)
}


function SaveExportFlexiData(pFlexiData)
{
    FadePageCover(true)
    var pParametersWithValues = {
        //Header
          pPurchaseInvoiceID: $("#hPurchaseInvoiceID").val() == "" ? 0 : $("#hPurchaseInvoiceID").val()
        , pInvoiceNumber: 0
        , pEditableCode: $("#txtPurchaseInvoiceNumber").val() == "" ? 0 : $("#txtPurchaseInvoiceNumber").val() //effects only update
        , pOperationID: $("#slPurchaseInvoiceOperations").val() == "" ? 0 : $("#slPurchaseInvoiceOperations").val()
        , pClientOperationPartnerID: $("#slPurchaseInvoiceOperationCustomer").val() == "" ? 0 : $("#slPurchaseInvoiceOperationCustomer").val()
        , pClientAddressID: $("#slPurchaseInvoiceCustomerAddress").val()
        , pClientPrintedAddress: 0
        , pSupplierOperationPartnerID: $("#slPurchaseInvoiceOperationSupplier").val() == "" ? 0 : $("#slPurchaseInvoiceOperationSupplier").val()
        , pSupplierAddressID: $("#slPurchaseInvoiceSupplierAddress").val()
        , pSupplierPrintedAddress: 0
        , pAmountWithoutVAT: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
        , pCurrencyID: $("#slPurchaseInvoiceCurrency").val()
        , pExchangeRate: $("#txtPurchaseInvoiceExchangeRate").val()
        , pInvoiceDate: $("#txtPurchaseInvoiceDate").val()
        , pTaxTypeID: 0
        , pTaxPercentage: 0
        , pTaxAmount: 0
        , pDiscountTypeID: 0
        , pDiscountPercentage: 0
        , pDiscountAmount: 0
        , pAmount: 0 //(parseFloat($("#txtPurchaseInvoiceAmount").val()) + parseFloat($("#txtPurchaseInvoiceItemAmount").val()))
        , pNotes: $("#txtPurchaseInvoiceNotes").val().toUpperCase() == "" ? 0 : $("#txtPurchaseInvoiceNotes").val().trim().toUpperCase()
        , pBranchID: $("#slOperationEditBranch").val() //$("#hUserBranchID").val()
        , pIsApproved: false
        , pIsDeleted: false
        , pApprovingUserID: 0
        , pPaymentTermID: $("#slPurchaseInvoicePaymentTerm").val()
        //LoadWithPaging parameters
        , pWhereClausePurchaseInvoice: " WHERE (OperationID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val() + ") AND IsDeleted = 0 "
        , pPageSize: 99999 //$("#select-page-size").val()
        , pPageNumber: 1 //$("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
        , pOrderBy: "ID"
        //PurchaseInvoiceItem
        , pFlexiPurchaseInvoiceItemID: pFlexiData.pFlexiPurchaseInvoiceItemID
        , pFlexiSerialIDList: pFlexiData.pFlexiSerialIDList
        , pIsFlexiSelected: pFlexiData.pIsFlexiSelected
        , pFlexiExportPriceList: pFlexiData.pFlexiExportPriceList
        , pFlexiContainerIDList: pFlexiData.pFlexiContainerIDList
        , pFlexiNotesList: pFlexiData.pFlexiNotesList
        , pTransactionID: $('#hTransactionID').val()
    };
    CallPOSTFunctionWithParameters("/api/PurchaseInvoice/FlexiExport_SaveList", pParametersWithValues
        , function (pData) {
                //var _Payables = JSON.parse(pData[0]);
                //var _PurchaseInvoiceHeader = JSON.parse(pData[1]);
                //var _PurchaseInvoice = JSON.parse(pData[2]);
                //var _PurchaseInvoiceItems = JSON.parse(pData[3]);
                // if (_Payables != null) {
                //  $("#hPurchaseInvoiceID").val(_PurchaseInvoiceHeader.ID);
                //$("#txtPurchaseInvoiceNumber").val(_PurchaseInvoiceHeader.InvoiceNumber);
                //$("#txtPurchaseInvoiceAmount").val(_PurchaseInvoiceHeader.Amount);
                //PurchaseInvoiceItem_BindTableRows(_PurchaseInvoiceItems);
                //PurchaseInvoice_BindTableRows(_PurchaseInvoice);
                //Payables_BindTableRows(_Payables);
            CallGETFunctionWithParameters("/api/SC_Transactions/LoadWithWhereClause",
                {
                    pPageNumber: 1
                    , pPageSize: 999999
                    , pWhereClause: " WHERE OperationID=" + IsNull($("#hOperationID").val(), "0") + " AND IsNull( IsDeleted , 0 ) = 0  AND TransactionTypeID = 20 AND IsNull(IsFromFlexi , 0) = 1 "
                }
                , function (pData) { SC_TransactionsForFlexi_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
                , null);
                jQuery("#PurchaseInvoiceModal").modal("hide");
                jQuery("#CheckboxesListFlexiModal").modal("hide");
                swal("Success", "Saved Successfully.");

           // }
            //else {
            //    swal("Sorry", "Please revise data and version of the file." + "The following are not added: " + _NotInsertedFlexi);
            //}
            FadePageCover(false);
        }
        , null);
}


function SetArrayOfItems_ForFlexi(FlexiData) {
      // var cobjItem = null;
       var arrayOfItems = new Array();
  
        var objItem = new Object();
        objItem.ID = "0";
        objItem.TransactionID = $('#hTransactionID').val();
        objItem.ItemID = FlexiData.ItemID;
        objItem.StoreID = $('#slSC_Stores').val();
        objItem.ReturnedQty = "0";
        objItem.CurrencyID = FlexiData.CurrencyID;
        objItem.ExchangeRate = 1;
        objItem.Notes = "";
        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = "0";
        objItem.SubAccountID = "0";
        objItem.OriginalQty = "0";
        objItem.ParentID = "0";
        objItem.AveragePrice =( FlexiData.Price / FlexiData.Qty ); 
        objItem.TransactionDate = ConvertDateFormat($("#txtPurchaseInvoiceDate").val());
        objItem.QtyFactor = "-1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "20";
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = "0";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = FlexiData.Qty; 
        objItem.UnitID = FlexiData.UnitID; // selected unit
        objItem.ItemQty = FlexiData.Qty; // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = FlexiData.Price; 
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        objItem.AvaliableQty = 0;
        objItem.P_Percentage = 0;
        objItem.P_Density = 0;
        objItem.ToStoreID = 0;
        objItem.P_LiterCost = 0;
        objItem.P_ExpectedQty = 0;
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
       //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
       objItem.SC_ItemParentTransactionID = 0;
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        arrayOfItems.push(objItem);

    return arrayOfItems;
}
function InsertUpdateFunctionForSC_Transactions(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {

                        swal(strSorry, data[1]);
                        CallbackHeaderData();
                        //try {
                        //    if (insert == true) {
                        //        $('#hID').val(data[2]);
                        //        $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
                        //        $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");

                        //    }
                        //}
                        //catch
                        //{

                        //}

                    }

                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}




function CallbackHeaderData() {
    debugger;
    if (IsInsert) {
        DeleteListFunction("/api/SC_Transactions/Delete", { "pTransactionsID": $("#hTransactionID").val(), "pTransactionDate": ConvertDateFormat($('#txtPurchaseInvoiceDate').val()) + " 07:00:00 PM" }, function () { console.log("************* Is Rolled Back *********************** "); });

    }
    else {
        console.log("Old Date2 :" + RollBackData.TransactionDate)
        InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
            pID: RollBackData.ID,
            pCode: RollBackData.Code,
            pCodeManual: RollBackData.CodeManual,
            pTransactionDate: RollBackData.TransactionDate,
            pPurchaseInvoiceID: RollBackData.PurchaseInvoiceID,
            pPurchaseOrderID: RollBackData.PurchaseOrderID,
            pExaminationID: RollBackData.ExaminationID,
            pIsApproved: RollBackData.IsApproved,
            pNotes: RollBackData.Notes,
            pSLInvoiceID: RollBackData.SLInvoiceID,
            pDepartmentID: RollBackData.DepartmentID,
            pClientID: RollBackData.ClientID,
            pCostCenterID: RollBackData.CostCenterID,
            pIsSpareParts: RollBackData.IsSpareParts,
            pFiscalYearID: RollBackData.FiscalYearID,
            pSupplierID: RollBackData.SupplierID,
            pParentID: RollBackData.ParentID,
            pTransactionTypeID: RollBackData.TransactionTypeID,
            pJV_ID: RollBackData.JV_ID,
            pIsOutOfStore: RollBackData.IsOutOfStore

            , pMaterialIssueRequesitionsID: RollBackData.MaterialIssueRequesitionsID
            , pToStoreID: RollBackData.ToStoreID
            , pP_ProductionRequestID: RollBackData.P_ProductionRequestID
            , pP_UnitID: RollBackData.P_UnitID
            , pP_ItemID: RollBackData.P_ItemID
            , pP_LineID: RollBackData.P_LineID
            , pP_Qty: RollBackData.P_Qty
            , pP_FinishedDate: "01/01/1800"
            , pP_StartDate: "01/01/1800"
            , pEntitlementDays: RollBackData.EntitlementDays
            , pIsClosed: RollBackData.IsClosed
            , pFromStore: RollBackData.FromStore
            , pJV_ID2: RollBackData.JV_ID2
            , pTransferParentID: RollBackData.TransferParentID
            , pForwardingPSInvoiceID: RollBackData.ForwardingPSInvoiceID
            , pOperationID: RollBackData.OperationID
            , pBranchID: RollBackData.BranchID
            , pIsFromFlexi: RollBackData.IsFromFlexi
        }, true, null, '#hTransactionID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}

function Invoices_CreateCreditNote(pInvoiceID) {
    debugger;

    swal({
        title: "Are you sure?",
        text: "Credit Note Will Be Created.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Do it!",
        closeOnConfirm: true
    },
    //callback function in case of confirm delete
    function () {

        var pParametersWithValues = {
            pInvoice: pInvoiceID
        };
        CallGETFunctionWithParameters("/api/Invoices/CreateCreditNote", pParametersWithValues
            , function (pData) {
                if (pData[0])
                    swal("Success", "Saved successfully.");
                else
                    swal("Sorry", pData[1]);

                FadePageCover(false);
            } //of callback function in CallGetFunctionWithParameters
            , null);
    });



}
function InvoiceApproval_SetApprovalFromOperation(pIsApprove) {
    debugger;
    var pInvoiceTableName = "tblInvoices";
    var pSelectedIDs = "";
    $('#tblInvoices tbody input[name="Delete"]:checked').each(function () {
        pSelectedIDs += ((pSelectedIDs == "") ? "" : ",") + ($(this).attr('value'));
    });
    let selectedIDs = pSelectedIDs.split(",");
    let IsPaidInvoiceSelected, IsApprovedInvoicesSelected = false;


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
                    , pIsApprove: true
                    , pCostCenterID: '0'
                    , pWhereClause: "WHERE ID IN (" + pSelectedIDs + ")"
                    , pNewInvoiceType: 0
                    , pGlbCallingControl: "AccountingInvoicesApprovals"
                    , pOrderBy: " ID DESC "
                    , pPageNumber: 1
                    , pPageSize: 50
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
                            swal("Success", "Set successfully.");
                        }
                        Invoices_LoadAll($("#hOperationID").val());
                        FadePageCover(false);
                    });
            });
    }
}