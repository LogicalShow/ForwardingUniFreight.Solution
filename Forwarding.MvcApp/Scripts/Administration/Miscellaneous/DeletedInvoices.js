function DeletedInvoices_BindTableRows(pTabelRows) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblDeletedInvoices");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    restoreControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Restore") + "</span>";
    transferControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Transfer") + "</span>";
    $.each(pTabelRows, function (i, item) {
        AppendRowtoTable("tblDeletedInvoices",
        //("<tr ID='" + item.ID + "' " + (OEInv && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Invoices_EditByDblClick(" + item.ID + ");'") : "") + ">"
        ("<tr ID='" + item.ID + "' class='"
            + (item.IsApproved ? " static-text-primary " : "")
        + "'>"
                    + "<td class='InvoiceID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ConcatenatedInvoiceNumber'>" + item.ConcatenatedInvoiceNumber + "</td>"
                    //+ "<td class='InvoiceOperationCode' val='" + item.OperationID + "'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='InvoiceOperationCode' val='" + item.OperationID + "'>" + (item.MasterOperationCode == 0 ? item.OperationCode : item.MasterOperationCode) + "</td>"
                    + "<td class='InvoicePartner' val='" + item.OperationPartnerID + "'>" + (item.PartnerName == 0 ? "" : item.PartnerName) + "</td>"
                    //+ "<td class='InvoicePartnerTypeCode'>" + (item.PartnerTypeCode == 0 ? "" : item.PartnerTypeCode) + "</td>"
                    + "<td class='InvoiceAmount'>" + item.Amount + "</td>"
                    + "<td class='InvoiceCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='InvoiceOperationStageID hide'>" + item.OperationStageID + "</td>"
                    + "<td class='InvoiceOperationCloseDate hide'>" + GetDateWithFormatMDY(item.OperationCloseDate) + "</td>" //Fomrat: MM/dd/yyyy
                    //+ "<td class='InvoiceOperationCloseDate hide'>" + ConvertDateFormat(GetDateWithFormatMDY(item.OperationCloseDate)) + "</td>"
                    //+ "<td class='InvoiceMasterDataExchangeRate hide'>" + item.MasterDataExchangeRate + "</td>"
                    //+ "<td class='InvoiceDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + "</td>"
                    //+ "<td class='InvoiceDueDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.DueDate)) + "</td>"

                    //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                    //+ "<td class=''><a href='#InvoiceModal' data-toggle='modal' onclick='Invoices_Print(" + item.ID + ");' " + printControlsText + "</a></td></tr>"));
                    //+ "<td class='InvoiceCustomerReference hide'>" + (item.CustomerReference == 0 ? "" : item.CustomerReference) + "</td>"
                    //+ "<td class='InvoicePaymentTermID hide' val='" + item.PaymentTermID + "'>" + item.PaymentTermName + "</td>"
                    //+ "<td class='InvoiceAddressID hide' val='" + item.AddressID + "'></td>"
                    //+ "<td class='InvoiceHouseNumber'>" + (item.HouseNumber == 0 ? "N/A" : item.HouseNumber) + "</td>"
                    //+ "<td class='hide'><a onclick='Invoices_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    //+ ($("#hIsOperationDisabled").val() == false
                    //    ? "<td class=''><a onclick='Invoices_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                    //    : "<td></td>")
                    + "<td class='" + (pDefaults.UnEditableCompanyName == "GBL" ? " hide " : "") + "'>"
                        //+ "<a onclick='DeletedInvoices_Restore(" + item.ID + ");' " + restoreControlsText + "</a>"
                        + "<a href='#TransferInvoiceModal' data-toggle='modal' onclick='DeletedInvoices_FillTransferModal(" + item.ID + ");' " + transferControlsText + "</a>"
                    + "</td>"
            + "</tr>"));
    });
    ////ApplyPermissions();
    //if (OAInv && $("#hIsOperationDisabled").val() == false) $("#btn-NewInvoice").removeClass("hide"); else $("#btn-NewInvoice").addClass("hide");
    //if (ODInv && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteInvoice").removeClass("hide"); else $("#btn-DeleteInvoice").addClass("hide");
    //BindAllCheckboxonTable("tblDeletedInvoices", "InvoiceID", "cb-CheckAll-Invoices");
    //CheckAllCheckbox("HeaderDeleteInvoiceID");
    HighlightText("#tblDeletedInvoices>tbody>tr", $("#txt-Search").val().trim());
}

function DeletedInvoices_LoadWithPagingWithWhereClauseAndOrderBy() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Invoices/LoadAll";
    var pWhereClause = " WHERE IsDeleted = 1 ";
    if ($("#slApprovalStatus").val() != "")
        pWhereClause += " AND IsApproved = " + $("#slApprovalStatus").val();
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND ( ";
        //pWhereClause += " ConcatenatedInvoiceNumber LIKE '%" + $("#txt-Search").val().toUpperCase() + "%' ";
        pWhereClause += " InvoiceNumber = '" + $("#txt-Search").val().toUpperCase() + "' ";
        //pWhereClause += " OR OperationCode LIKE '%" + $("#txt-Search").val().toUpperCase() + "%' ";
        //pWhereClause += " OR PartnerName LIKE '%" + $("#txt-Search").val().toUpperCase() + "%' ";
        pWhereClause += ") ";
    }
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, " InvoiceNumber, InvoiceTypeName, OperationCode ", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (data) { DeletedInvoices_BindTableRows(JSON.parse(data[0])); });
}

function DeletedInvoices_Restore(pInvoiceID) {
    var tr = $("#tblDeletedInvoices tr[ID='" + pInvoiceID + "']");
    if ($(tr).find("td.InvoiceOperationStageID").text() == CancelledQuoteAndOperStageID)
        swal(strSorry, "The operation of this invoice is cancelled.");
    else
        if (Date.prototype.compareDates(ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), $(tr).find("td.InvoiceOperationCloseDate").text()) <= 0)
            swal(strSorry, "The operation of this invoice is closed.");
        else
            //Confirmation message to delete
            swal({
                title: "Are you sure?",
                text: "This invoice will be restored to its original Operation.",
                type: "",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, restore.",
                closeOnConfirm: true
            },
            //callback function in case of success
            function () {
                CallGETFunctionWithParameters("/api/Invoices/Restore", { "pInvoiceID": pInvoiceID }
                    , function () { DeletedInvoices_LoadWithPagingWithWhereClauseAndOrderBy(); }
                    , null /*function (data) { debugger; swal("Success", data[0]); }*/);
            });
}

function DeletedInvoices_FillTransferModal(pInvoiceID) {
    debugger;
    var tr = $("#tblDeletedInvoices tr[ID='" + pInvoiceID + "']");
    $("#lblDeletedInvoiceShown").html(": " + $(tr).find("td.ConcatenatedInvoiceNumber").text());
    $("#hDeletedInvoiceID").val(pInvoiceID);
    //FadePageCover(true);
    var pCurrencyID = $(tr).find("td.InvoiceCurrency").attr('val');
    //GetListWithCodeAndWhereClause(pID, pStrFnName, pStrFirstRow, pSlName, pWhereClause, callback);
    //GetListWithCodeAndWhereClause(null, "/api/Operations/LoadAll", null, "slOperation", " WHERE OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-3,0) ", null); //i get operations from just the previous 3 months
    //var pWhereClause = " WHERE EffectiveOperationCode IS NOT NULL AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-3,0) ";
    ////EffectiveOperationCode is null in case of not connected house
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(null, "/api/Operations/LoadWithParameters", null, "slOperation", { pPageNumber: 1, pPageSize: 500, pWhereClause: pWhereClause, pOrderBy: "EffectiveOperationID DESC" }
    //    , function () { FadePageCover(false); });
    Currency_GetList(pCurrencyID, "slCurrency");
}
function Currency_GetList(pID, pSlName) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", null, pSlName, " WHERE 1=1 ORDER BY Code ");
}
function DeletedInvoices_Transfer() {
    debugger;
    //Confirmation message to delete
    swal({
        title: "Are you sure?",
        text: "This invoice will be transferred and its items will be deleted permanently(no recovery for items).",
        type: "",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Transfer.",
        closeOnConfirm: true
    },
    //callback function in case of success
    function () {
        CallGETFunctionWithParameters("/api/Invoices/Transfer",
            {
                "pInvoiceID": $("#hDeletedInvoiceID").val()
                , "pCurrencyID": $("#slCurrency").val()
                , "pTransferredToOperationID": $("#slOperation").val()
                , "pFormName": glbCallingControl
            }
            , function (pData) {
                var _ReturnedMessage = pData[1];
                if (pData[0]) {
                    DeletedInvoices_LoadWithPagingWithWhereClauseAndOrderBy();
                    jQuery("#TransferInvoiceModal").modal("hide");
                    swal("Success", _ReturnedMessage);
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
            }
            , null /*function (data) { debugger; swal("Success", data[0]); }*/);
    });
}
