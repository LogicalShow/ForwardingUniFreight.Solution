var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();

function AccountingAccNotesApprovalsTax_BindTableRows(pAccNotes) {
    debugger;
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ClearAllTableRows("tblAccNotes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pAccNotes, function (i, item) {
        AppendRowtoTable("tblAccNotes",
        ("<tr ID='" + item.ID + "' " + ((OENot /*&& item.NoteStatus == "UnPaid"*/ && !item.IsApproved) ? ("ondblclick='AccNotes_EditByDblClick(" + item.ID + ");'") : " class='static-text-primary' ") + ">"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='AccNoteID'> <input" /*+ (item.NoteStatus == "UnPaid" && !item.IsApproved ? "" : " disabled='disabled' ")*/ + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
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
                    + "<td class='AccNoteDate '>" + ConvertDateFormat(GetDateWithFormatMDY(item.NoteDate)) + "</td>"

                    + "<td class='AccNoteAddressID hide' val='" + item.AddressID + "'></td>"
                    + "<td class='AccNoteOperationID hide'>" + item.OperationID + "</td>"
                    + "<td class='AccNoteMasterOperationID hide'>" + item.MasterOperationID + "</td>"
                    //+ "<td class='AccNoteOperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='AccNoteOperationCode'>" + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + "</td>"
                    + "<td class='AccNoteHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>" //if "N/A" then either not entered or its Master Op so I should show all the HBLs on the Master, but for space i dont do it.
                    + "<td class='AccNoteStatus hide " + (item.NoteStatus == "UnPaid" ? "text-danger" : "text-primary") + "'>" + item.NoteStatus + "</td>"

                    + "<td class='AccNoteInvoiceID hide'>" + item.InvoiceID + "</td>"
                    + "<td class='AccNoteConcatenatedInvoiceNumber'>" + (item.InvoiceID == 0 ? "N/A" : item.ConcatenatedInvoiceNumber) + "</td>"

                    + "<td class='AccNoteRemarks hide'>" + (item.Remarks == 0 ? "" : item.Remarks) + "</td>"

                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td class='hide'><a onclick='AccNotes_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    //+ ($("#hIsOperationDisabled").val() == false
                    //    ? "<td class=''><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    //    : "<td></td>")
                    + "<td class=''><a onclick='AccNotes_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    //ApplyPermissions();
    //if ($("#hf_CanEdit").val() == 1) { $("#btn-ApproveAllSelected").removeClass("hide"); $("#btn-UnApproveAllSelected").removeClass("hide"); }
    //else { $("#btn-ApproveAllSelected").addClass("hide"); $("#btn-UnApproveAllSelected").addClass("hide"); }
    //if ($("#hf_CanDelete").val() == 1) $("#btn-DeleteAccNote").removeClass("hide"); else $("#btn-DeleteAccNote").addClass("hide");

    //if (pDefaults.UnEditableCompanyName == "GBL")
    //    $('#btn-UnApproveAllSelected').addClass('hide');
    //else
    //    $('#btn-UnApproveAllSelected').removeClass('hide');

    $("#cbPrintHeaderInvoice").prop("checked", false);
    $("#cbPrintFooterInvoice").prop("checked", false);
    //if (OANot && $("#hIsOperationDisabled").val() == false) { $("#btn-NewDebitNote").removeClass("hide"); $("#btn-NewCreditNote").removeClass("hide"); } else { $("#btn-NewDebitNote").addClass("hide"); $("#btn-NewCreditNote").addClass("hide"); }
    //if (ODNot && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteAccNote").removeClass("hide"); else $("#btn-DeleteAccNote").addClass("hide");
    BindAllCheckboxonTable("tblAccNotes", "AccNoteID", "cb-CheckAll-AccNotes");
    CheckAllCheckbox("HeaderDeleteAccNoteID");
    HighlightText("#tblAccNotes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function AccountingAccNotesApprovalsTax_LoadingWithPaging() {
    debugger;
    var pWhereClause = AccountingAccNotesApprovalsTax_GetWhereClause();
    //var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC";
    var pOrderBy = " ID DESC ";
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblAccNotes>tbody>tr", $("#txt-Search").val().trim());
}
function AccountingAccNotesApprovalsTax_GetWhereClause() {
    debugger;
    //var pWhereClause = "WHERE IsDeleted=0 AND ID NOT IN(SELECT  T.OriginID FROM ForwardingTransChemTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
    var pWhereClause = "WHERE IsDeleted=0";

    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (";
        //pWhereClause += " OperationCode like N'%" + $("#txt-Search").val().trim() + "%' ";
        //pWhereClause += " OR ConcatenatedInvoiceNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " PartnerName like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR MasterBL like N'%" + $("#txt-Search").val().trim() + "%' ";
        pWhereClause += " OR HouseNumber like N'%" + $("#txt-Search").val().trim() + "%' ";
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
    if ($("#txtOperation").val() != "") {
        pWhereClause += " AND (SUBSTRING(OperationCode,12,5)=N'" + $("#txtOperation").val().trim().toUpperCase() + "' OR SUBSTRING(MasterOperationCode,12,5)=N'" + $("#txtOperation").val().trim().toUpperCase() + "') \n";
    }
    //if ($("#cbHideApprovedOperationPayable").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    //if ($("#slApprovalStatus").val() != "") {
    //    pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    //}
    if ($("#slApprovalStatus").val() == "0") {
        if ($("#hDefaultUnEditableCompanyName").val() == "CHM") {
            pWhereClause += " AND ID NOT IN(SELECT T.OriginID FROM ForwardingTransChemTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "OCE") {
            pWhereClause += " AND ID NOT IN(SELECT T.OriginID FROM ForwardingTROTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "TRM") {
            pWhereClause += " AND ID NOT IN(SELECT T.OriginID FROM ForwardingTransMasirTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
            pWhereClause += " AND ID NOT IN(SELECT T.OriginID FROM ForwardingEGL2023Tax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "SWI") {
            pWhereClause += " AND ID NOT IN(SELECT T.OriginID FROM ForwardingSwiftLogisticsEG2023Tax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }

    }
    else if ($("#slApprovalStatus").val() == "1") {

        if ($("#hDefaultUnEditableCompanyName").val() == "CHM") {
            pWhereClause += " AND ID IN(SELECT T.OriginID FROM ForwardingTransChemTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "OCE") {
            pWhereClause += " AND ID IN(SELECT T.OriginID FROM ForwardingTROTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "TRM") {
            pWhereClause += " AND ID IN(SELECT T.OriginID FROM ForwardingTransMasirTax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
            pWhereClause += " AND ID IN(SELECT T.OriginID FROM ForwardingEGL2023Tax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }
        else if ($("#hDefaultUnEditableCompanyName").val() == "SWI") {
            pWhereClause += " AND ID IN(SELECT T.OriginID FROM ForwardingSwiftLogisticsEG2023Tax.dbo.TaxLink T WHERE Notes='AccNote' AND JVID IS NOT NULL AND OriginID IS NOT NULL)";
        }


    }
    return pWhereClause;
}
function AccountingAccNotesApprovalsTax_PartnerTypeChanged() {
    //debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    AccountingAccNotesApprovalsTax_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = AccountingAccNotesApprovalsTax_GetWhereClause();
    ////var pOrderBy = " PartnerTypeID,PartnerName, OperationID DESC "
    //var pOrderBy = " ID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/AccNote/AccountingAccNotesApprovalsTax_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
function AccountingAccNotesApprovalsTax_SetApproval(pIsApprove) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("Delete");
    var AccountIDCharge = $("#slAccountCharge").val();
    var SubAccountCharge = $("#slSubAccountCharge").val() == null ? "0" : $("#slSubAccountCharge").val();
    var SubAccountChargeCount = $("#slSubAccountCharge").find('option').length;


    if ((SubAccountCharge == "" || SubAccountCharge == "0" || SubAccountCharge == null) && SubAccountChargeCount > 1) {
        swal('Excuse me', 'Fill  SubAccount', 'warning');
        _Suceess = false;
        return false;
    }

    if (pSelectedIDs == "" || pSelectedIDs.split(",").length > 1)
        //swal("Sorry", "Please, select at least one row.");
        swal("Sorry", "Please, select just one row.");
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
                , pWhereClause: AccountingAccNotesApprovalsTax_GetWhereClause()
                , pAccountIDCharge: AccountIDCharge
                , pSubAccountCharge: SubAccountCharge
                //, pOrderBy: " PartnerTypeID,PartnerName, OperationID DESC "
                , pOrderBy: " ID DESC "
                , pPageNumber: ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
                , pPageSize: $('#select-page-size').val()
            };
            CallGETFunctionWithParameters("/api/AccNote/ApproveOrUnApproveTax", pParametersWithValues
                , function (pData) {
                    var pStrMessage = pData[2];
                    if (pData[0]) {
                        AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(pData[1]));
                        swal("Success", "Set successfully.");
                    }
                    else
                        //swal("Sorry", "An error occured, please refresh and then try again.");
                        alert(pStrMessage); //swal("Sorry", pStrMessage);
                    FadePageCover(false);
                });
        });
    }
}
/******************************AccNotes fns********************************************/
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
    GetListTaxTypeWithNameAndPercAttr(pAccNoteTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
                , "<--Select-->", "slEditAccNoteTax", "WHERE IsInactive=0 ORDER BY Name"
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

    AccNotes_FillAccNoteItems(pID, pAccNoteType);//to fill the available AccNote items
    $("#btnSaveEditAccNote").attr("onclick", "AccNotes_Update(false, false);");//parameters(pSaveAndNew, pIsRemoveItems)
    $("#btn-AddAccNoteItem").attr("data-target", "#CheckboxesListModal");
    $("#btn-AddAccNoteItem").attr("onclick", "Invoices_GetAvailableItems(" + pAccNoteType + ");");
}
function AccNotePartners_GetList(pID, pAccNoteOperationID, pSlName, callback) {
    var pWhereClause = " WHERE OperationID = " + pAccNoteOperationID;
    pWhereClause += " AND PartnerID IS NOT NULL ";
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
function Invoices_PrintOptions() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "EGL") {
        $("#cbPrintUSDTotal").parent().removeClass("hide");
        $("#cbPrintReceivableNotes").parent().removeClass("hide");
    }
    else {
        $("#cbPrintUSDTotal").parent().addClass("hide");
        $("#cbPrintReceivableNotes").parent().addClass("hide");
    }
    jQuery("#PrintInvoiceOptionsModal").modal("show");
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
                        //ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
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
                else if (pDefaults.UnEditableCompanyName == "DSE") {
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
                        //ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
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


                    if (pDefaults.UnEditableCompanyName == "DSE")
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
                        //ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SalePrice : item.CostPrice) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "CAP") {
                            ReportHTML += '                                         <td>' + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + '</td>';
                        }
                        ReportHTML += '                                         <td>' + item.DiscountPercentage + ' %' + '</td>';
                        ReportHTML += '                                         <td>' + item.TaxPercentage + ' %' + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + ' ' + item.CurrencyCode + '</td>';
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
                    if (!$("#cbPrintHeaderInvoice").prop("checked")) //if KML,EEL the print on original paper
                        ReportHTML += '             &emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>&emsp;<br>';
                    else
                        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + pAccNoteDate.substr(3, 2) + '/' + pAccNoteDate.substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    //ReportHTML += '             <div class="col-xs-12 text-center m-t-n"><h3>Note No. ' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(3, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceDate").text().substr(8, 2) + '/' + $("#tblInvoices #" + pID + " td.InvoiceNumber").text() + '</h3></div> </br>';
                    if (pDefaults.UnEditableCompanyName == "PHO")
                        ReportHTML += '             <div class="col-xs-12 text-center m-t-n-lg"><h3>' + pAccNoteHeader.NoteTypeName + " Note " + pAccNoteCode.substring(4, 20) + "/20" + pAccNoteCode.substring(1, 3) + '</h3></div> </br>';
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
                        //ReportHTML += '                                         <td>' + ($("#cbPrintArabicItems").prop("checked") && item.ChargeTypeLocalName != 0 ? item.ChargeTypeLocalName : item.ChargeTypeName) + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        ReportHTML += '                                         <td style="text-align:left;">' + item.ChargeTypeName + (item.Notes != 0 && item.Notes != "" && $("#cbAddNotesToItems").prop("checked") ? ('-' + item.Notes) : "") + '</td>';
                        if (pDefaults.UnEditableCompanyName == "BAD") {
                            ReportHTML += '                                         <td>' + item.Quantity + '</td>';
                            ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SalePrice : item.CostPrice) + '</td>';
                        }
                        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM")
                            ReportHTML += '                                         <td>' + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + '</td>';
                        ReportHTML += '                                         <td>' + (pAccNoteType == constTransactionDebitNote ? item.SaleAmount : item.CostAmount) + ' ' + item.CurrencyCode + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" ? 2 : 1)) + '>' + '<b>Sum Of ItemsCharges : ' + '</b></td>';
                    ReportHTML += '                                             <td><b>' + $("#tblAccNotes #" + pID + " td.AccNoteAmountWithoutVAT").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
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
                    ReportHTML += '                                         <tr>';
                    ReportHTML += '                                             <td colspan=' + (pDefaults.UnEditableCompanyName == "BAD" ? "4" : (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" ? 2 : 1)) + '>' + '<b>TOTAL AMOUNT ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                             <td><b>Total Amount : ' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + '</b></td>';
                    ReportHTML += '                                         </tr>';
                    ReportHTML += '                             </body>';
                    ReportHTML += '                     </table>';
                    ReportHTML += '                 </div>';
                    //ReportHTML += '                         <div class="form-group float-right m-r-lg strong">';
                    //ReportHTML += '                             <b>ONLY : ' + toWords_WithFractionNumbers($("#tblAccNotes #" + pID + " td.AccNoteAmount").text()) + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ' / (' + $("#tblAccNotes #" + pID + " td.AccNoteAmount").text() + ' ' + $("#tblAccNotes #" + pID + " td.AccNoteCurrency").text() + ')' + '</b>';
                    //ReportHTML += '                         </div>';
                    if (pDefaults.UnEditableCompanyName != "ACS") {
                        ReportHTML += '                         <div class="clear m-l col-xs-6 text-left"><b>ACCOUNTING</b></div>';
                        ReportHTML += '                         <div class="float-right text-right m-t-n col-xs-6 m-r"><b>APPROVAL</b></div>';
                    }
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
                } //EOF fields are complete
                FadePageCover(false);
            });
}
function Invoices_PrintBankDetailsOptionChanged() {
    debugger;
    if ($("#cbPrintBankDetailsFromTemplate").prop("checked"))
        $("#slBankTemplate").removeClass("hide");
    else
        $("#slBankTemplate").addClass("hide");
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
                    , "pOperationID": $("#hEditedAccNoteOperationID").val()
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
                    if (data[0])
                        AccountingAccNotesApprovalsTax_LoadingWithPaging(); //AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(data[1])); //coz the return is different in OperationsEdit(as it retreives Notes on that operations)
                    AccNotes_FillAccNoteItems($("#hEditedAccNoteID").val(), pAccNoteType, function () { AccNotes_ChangeAmountInAccNoteEdit(); });
                    jQuery('#' + pModalName).modal('hide');
                    FadePageCover(false);
                });
        }
    }
}
//AccNotes_Update(): is used for both updating and removing items
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
                            CallGETFunctionWithParameters("/api/AccNote/Update"
                                , {
                                    "pAccNoteID": $("#hEditedAccNoteID").val()
                                    , "pAccNoteType": $("#hEditedAccNoteTypeID").val()
                                    , "pOperationID": $("#hEditedAccNoteOperationID").val()
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
                                    , "pExchangeRate": pExchangeRate //$("#slEditAccNoteCurrency option:selected").attr("MasterDataExchangeRate")
                                    , "pRemarks": $("#txtEditAccNoteRemarks").val().trim() == "" ? "0" : $("#txtEditAccNoteRemarks").val().trim().toUpperCase()
                                    , "pSelectedItemIDsToRemove": pIsRemoveItems ? pSelectedItemIDsToRemove : "" //to prevent deletion in case of checking while update
                                }
                                , function (data) {
                                    if (pIsRemoveItems)
                                        AccNotes_FillAccNoteItems($("#hEditedAccNoteID").val(), $("#hEditedAccNoteTypeID").val(), function () { AccNotes_ChangeAmountInAccNoteEdit(); });
                                    if (data[0]) {
                                        AccountingAccNotesApprovalsTax_LoadingWithPaging(); //AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(data[1])); //coz the return is different in OperationsEdit(as it retreives Notes on that operations)
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
//function AccNotes_Update(pSaveandAddNew, pIsRemoveItems) { //if pIsRemoveItems==true then delete items else update
//    debugger;
//    var pSelectedItemIDsToRemove = GetAllSelectedIDsAsStringWithNameAttr("cbSelectAccNoteItems");
//    if (pIsRemoveItems && pSelectedItemIDsToRemove == "") //to make sure that there are selected items in case of pressing remove items
//        swal(strSorry, "Please select at least one item."); //this message is showed only incase of pressing remove items w/o selecting any
//    else if ($("#slEditAccNotePartner").val() == "")
//        swal(strSorry, "Please, Select partner.");
//    else {
//        //if (pSelectedReceivableItemsIDs != "" && Invoices_ChangeAmountInInvoiceEdit(pIsRemoveItems, true) > 0) {
//        if (ValidateForm("form", "EditAccNoteModal")) {//(Invoices_CheckSameCurrencyForEdit(pSelectedReceivableItemsIDs)) {
//            //Confirmation message to delete
//            //if (pSelectedItemIDsToRemove != "")
//            swal({
//                title: "Are you sure?",
//                text: "The Note will be saved!",
//                //type: "warning",
//                showCancelButton: true,
//                confirmButtonColor: "#DD6B55",
//                confirmButtonText: "Yes, Save!",
//                closeOnConfirm: true
//            },
//            //callback function in case of confirm delete
//            function () {
//                //i am setting the Note amount in the controller after adding the Items
//                FadePageCover(true);
//                CallGETFunctionWithParameters("/api/AccNote/Update"
//                    , {
//                        "pAccNoteID": $("#hEditedAccNoteID").val()
//                        , "pAccNoteType": $("#hEditedAccNoteTypeID").val()
//                        , "pOperationID": $("#hEditedAccNoteOperationID").val()
//                        , "pInvoiceID": $("#slEditAccNoteInvoice").val() == "" ? 0 : $("#slEditAccNoteInvoice").val()
//                        , "pOperationPartnerID": $("#slEditAccNotePartner").val() //in table OperationPartners
//                        , "pAddressID": $("#slEditAccNoteAddressTypes").val()
//                        , "pNoteDate": ($("#txtEditAccNoteDate").val() == "" ? "01/01/1900" : $("#txtEditAccNoteDate").val().trim())
//                        , "pTaxTypeID": $("#slEditAccNoteTax").val() == "" ? 0 : $("#slEditAccNoteTax").val()
//                        , "pTaxPercentage": $("#txtEditAccNoteTaxPercentage").val() == "" ? 0 : $("#txtEditAccNoteTaxPercentage").val()
//                        //, "pTaxAmount": $("#txtEditAccNoteTaxAmount").val() == "" ? 0 : $("#txtEditAccNoteTaxAmount").val() //calculated in controller after adding items
//                        , "pDiscountTypeID": $("#slEditAccNoteDiscount").val() == "" ? 0 : $("#slEditAccNoteDiscount").val()
//                        , "pDiscountPercentage": $("#txtEditAccNoteDiscountPercentage").val() == "" ? 0 : $("#txtEditAccNoteDiscountPercentage").val()
//                        //, "pDiscountAmount": $("#txtEditAccNoteDiscountAmount").val() == "" ? 0 : $("#txtEditAccNoteDiscountAmount").val() //calculated in controller after adding items
//                        , "pCurrencyID": $("#slEditAccNoteCurrency").val()
//                        , "pExchangeRate": $("#slEditAccNoteCurrency option:selected").attr("MasterDataExchangeRate")
//                        , "pRemarks": $("#txtEditAccNoteRemarks").val().trim() == "" ? "0" : $("#txtEditAccNoteRemarks").val().trim().toUpperCase()
//                        , "pSelectedItemIDsToRemove": pIsRemoveItems ? pSelectedItemIDsToRemove : "" //to prevent deletion in case of checking while update
//                    }
//                    , function (data) {
//                        if (pIsRemoveItems)
//                            AccNotes_FillAccNoteItems($("#hEditedAccNoteID").val(), $("#hEditedAccNoteTypeID").val(), function () { AccNotes_ChangeAmountInAccNoteEdit(); });
//                        if (data[0]) {
//                            AccountingAccNotesApprovalsTax_LoadingWithPaging(); //AccountingAccNotesApprovalsTax_BindTableRows(JSON.parse(data[1])); //coz the return is different in OperationsEdit(as it retreives Notes on that operations)
//                            swal("Success", "Saved successfully.");
//                        }
//                        else
//                            swal("Sorry", "Connection failure, Please try again.");
//                        FadePageCover(false);
//                    });
//            });
//        }
//        else //Different Currencies
//            swal(strSorry, "The currencies of the selected items must be the same.");
//        //}
//        //else //No items is selected
//        //    swal(strSorry, "The invoice must have at least one item with value greater than 0.");
//    }
//}
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
    decAccNoteTaxAmount = decAccNoteAmount * decAccNoteTaxPercentage / 100;
    decAccNoteDiscountPercentage = $("#slEditAccNoteDiscount option:selected").attr("CurrentPercentage");
    decAccNoteDiscountAmount = decAccNoteAmount * decAccNoteDiscountPercentage / 100;
    $("#txtEditAccNoteAmountWithoutVAT").val(decAccNoteAmount.toFixed(4)); // decAccNoteAmount is without VAT till this line
    decAccNoteAmount += decAccNoteTaxAmount - decAccNoteDiscountAmount;
    $("#txtEditAccNoteTaxAmount").val(decAccNoteTaxAmount.toFixed(4));
    $("#txtEditAccNoteDiscountAmount").val(decAccNoteDiscountAmount.toFixed(4));
    $("#txtEditAccNoteTaxPercentage").val(decAccNoteTaxPercentage);
    $("#txtEditAccNoteDiscountPercentage").val(decAccNoteDiscountPercentage);
    $("#txtEditAccNoteAmount").val(decAccNoteAmount.toFixed(4));

    if (!pIsCheck) //if pIsCheck is true, then this means dont refresh amount coz i am just checking
        $("#txtEditAccNoteAmount").val(decAccNoteAmount.toFixed(4));
    return decAccNoteAmount;
}
/****************************EOF AccNotesEdit(Credit/Debit)*******************************************/
/********************************Common fns like Invoices******************************/
function InvoiceCurrency_GetList(pID, pSlName, pControlPrefix) {
    if (pSlName != null && pSlName != undefined && pSlName != 0)
        $("#" + pSlName).val(pID);
    else
        $("#" + pSlName).val($("#hDefaultCurrencyID").val());
    $("#txt" + pControlPrefix + "MasterDataExchangeRate").val($("#" + pSlName + " option:selected").attr("MasterDataExchangeRate"));
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
function Invoices_GetAvailableItems(pAccNoteTypeOrInvoice) {
    debugger;
    FadePageCover(true);
    var pControlPrefix = "";
    if (pAccNoteTypeOrInvoice == constTransactionInvoiceApproval) {
        pControlPrefix = "Invoice";
    }
    else {
        pControlPrefix = "AccNote";
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
    //pWhereClause += " WHERE OperationID = " + $("#hEdited" + pControlPrefix + "OperationID").val() + " AND IsDeleted = 0 ";
    pWhereClause += " WHERE (OperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR OperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "OperationID").val() + " OR MasterOperationID=" + $("#hEdited" + pControlPrefix + "MasterOperationID").val() + ") AND IsDeleted = 0 ";
    pWhereClause += pAccNoteTypeOrInvoice == constTransactionCreditNote ? "" : " AND InvoiceID IS NULL "; //if payable then no InvoiceId
    pWhereClause += " AND AccNoteID IS NULL ";
    pWhereClause += " AND CurrencyID = " + $("#slEdit" + pControlPrefix + "Currency").val();
    pWhereClause += " AND (ChargeTypeCode LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE '%" + $("#txtSearchItems").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeCode ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#" + pDivName, $("#txtSearchItems").val().trim());
            $("#btn-SearchItems").attr("onclick", "Invoices_GetAvailableItems(" + pAccNoteTypeOrInvoice + ");");
            $("#btnCheckboxesListApply").attr("onclick", pControlPrefix + "s_AddItems(false," + pAccNoteTypeOrInvoice + ");");
            FadePageCover(false);
        }
        , 1/*pCodeOrName*/);
}
/********************************Common fns like Invoices******************************/
function Details_FillSlSubAccountCharge(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccountCharge").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccountCharge").html("<option value=0>" + TranslateString("SubAccount") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountCharge").val()
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
