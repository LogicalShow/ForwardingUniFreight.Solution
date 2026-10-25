var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function VehicleService_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "VehicleService_BindTableRows";
    //strLoadWithPagingFunctionName = "/api/Receive/ReceiveDetails_LoadAll";
    strLoadWithPagingFunctionName = "/api/OperationVehicle/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE 1=1 AND ID IN (SELECT OperationVehicleID FROM WH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL)";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/VehicleService", "div-content", function () {
        LoadView("/MasterData/ModalSelectCharges", "div-content", function () {
            if (pDefaults.IsTaxOnItems)
                $(".classShowForTaxOnItems").removeClass("hide");
            else
                $(".classShowForTaxOnHeader").removeClass("hide");
        }, null, null, true);
        if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                //var pWarehouse = pData[2];
                //var pPurchaseItem = pData[3];
                //var pReceiveDetailsStatus = pData[4];
                //FillListFromObject(null, 2, null/*pStrFirstRow*/, "slWarehouse", pWarehouse, null);
                //FillListFromObject(null, 9, "<--Select-->", "slReceiveDetailsPurchaseItem", pPurchaseItem, null);
                //FillListFromObject(null, 2, null/*pStrFirstRow*/, "slReceiveDetailsStatus", pReceiveDetailsStatus, null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                VehicleService_BindTableRows(JSON.parse(pData[0]));
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Receive_ClearAllControls(); },
        function () { Receive_DeleteList(); });
}
function VehicleService_BindTableRows(pReceiveDetails) {
    debugger;
    if (pReceiveDetails.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblReceiveDetails");
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
    var inspectionControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-list' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Actions" + "</span>";
    $.each(pReceiveDetails, function (i, item) {
        AppendRowtoTable("tblReceiveDetails",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='OperationCharges_FillModal(" + item.OperationID + "," + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
            + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
            + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
            + "<td class='PurchaseItemName hide'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
            + (pDefaults.UnEditableCompanyName == "GBL"
                ? (
                    "<td class='EngineNumber'>" + (item.EngineNumber == 0 ? "" : item.EngineNumber) + "</td>"
                    + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
                    + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"
                    + "<td class='Model'>" + (item.Model == 0 ? "" : item.Model) + "</td>"
                    )
                : ""
               )
            + "<td class='Quantity hide'>" + item.Quantity + "</td>"
            + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
            + "<td class='PackageTypeName hide'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='OperationCode'>" + (item.OperationCode == 0 ? "" : item.OperationCode) + "</td>"
            //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
            
            + "<td class='hide'>"
                + "<a href='#' data-toggle='modal' onclick='VehicleAction_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(" + item.OperationVehicleID + ");' " + inspectionControlsText + "</a>"
                + "<a href='#ReceiveDetailsSerialModal' data-toggle='modal' onclick='ReceiveDetailsSerial_FillModal(" + item.ID + ");' " + serialControlsText + "</a>"
            + "</td>"
        + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReceiveDetails", "ID", "cb-CheckAll-ReceiveDetails");
    CheckAllCheckbox("HeaderDeleteReceiveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function VehicleService_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned() {
    debugger;
    var pWhereClause = VehicleService_GetWhereClause();
    var pOrderBy = "ID DESC";
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy };
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                        , function (pData) {
                            VehicleService_BindTableRows(JSON.parse(pData[0]));
                        });
    HighlightText("#tblReceive>tbody>tr", $("#txt-Search").val().trim());
}
function VehicleService_GetWhereClause() {
    debugger;
    var _WhereClause = "WHERE 1=1 AND ID IN (SELECT OperationVehicleID FROM WH_ReceiveDetails WHERE OperationVehicleID IS NOT NULL)" + " \n";
    if ($("#txt-Search").val().trim() != "") {
        _WhereClause += "AND (" + "\n";
        _WhereClause += "       ChassisNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + "\n";
        _WhereClause += "       OR EngineNumber=N'" + $("#txt-Search").val().trim().toUpperCase() + "'" + "\n";
        _WhereClause += "    )";
    }
    return _WhereClause;
}
/****************************************OperationCharges Fns**********************************************/
function OperationCharges_FillModal(pOperationID, pOperationVehicleID) {
    debugger;
    //if (glbFormCalled == "OperationsPayablesAndReceivables") {
    //    $("#slOperation").html($("#slFilterOperation").html());
    //    $("#slOperation").val($("#slFilterOperation").val());
    //    $("#OperationChargeModal").removeClass("hide");
    //}
    //if ($("#slOperation").val() == "")
    //    swal("Sorry", "Please, select an operation.");

    var tr = $("#tblReceiveDetails tr[ID='" + pOperationVehicleID + "']");
    var _ChassisNumber = $(tr).find("td.ChassisNumber").text();
    $("#hOperationVehicleID").val(pOperationVehicleID);
    if (pOperationID == 0)
        swal("Sorry", "Please, this vehicle is not added to an operation.");
    else {
        $("#slOperation").html("<option value=" + pOperationID + "></option>");
        $("#slOperation").val(pOperationID);

        jQuery("#OperationChargeModal").modal("show");
        FadePageCover(true);
        $("#tblPayables tbody").html("");
        $("#tblReceivables tbody").html("");
        $("#lblOperationChargeShown").html(": " + _ChassisNumber);
        CallGETFunctionWithParameters("api/QuotationCharges/GetOperationPayablesAndReceivables"
            , {
                pOperationID: $("#slOperation").val()
                , pQuotationRouteID: 0 //$("#hQuotationRouteID").val()
                , pOperationVehicleID: $("#hOperationVehicleID").val()
                , pTruckingOrderID: 0
                , pCodeSearch: 0
            }
            , function (pData) {
                if (pData[0]) {
                    var pPayables = JSON.parse(pData[1]);
                    var pReceivables = JSON.parse(pData[2]);
                    Payables_BindTableRows(pPayables);
                    Receivables_BindTableRows(pReceivables);
                }
                else
                    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);
    }
}
/******************Payables**************************/
function Payables_BindTableRows(pPayables) {
    ClearAllTableRows("tblPayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
        //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
        ("<tr ID='" + item.ID + "' " + (OEPay && item.AccNoteID == 0 && item.IsApproved == 0 ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                    + "<td class='PayableID'> <input " + (item.IsApproved == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                    + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //the next line its PartnerSupplierID comes from table OperationPartners
                    + "<td class='PayableSupplier hide'[' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                    + "<td class='SupplierSiteID hide'>" + item.SupplierSiteID + "</td>"
                  //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='PayableQuantity'>" + item.Quantity + "</td>"
                    + "<td class='PayableCostPrice'>" + item.CostPrice.toFixed(4) + "</td>"

                    + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                    + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                    + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                    + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                    + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='PayableCostAmount'>" + item.CostAmount.toFixed(4) + "</td>"
                    + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                    + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                    + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                    + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                    + "<td class='PayableBillID hide'>" + item.BillID + "</td>"

                    + "<td class='PayableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                    + "<td class='PayableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                    + "<td class='PayableTrailerID hide'>" + item.TrailerID + "</td>"

                    + "<td class='PayableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                    + "<td class='PayableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                    + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
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
                    + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ////ApplyPermissions();
    //if (OAPay && $("#hIsOperationDisabled").val() == false) { $("#btn-AddPayables").removeClass("hide"); $("#btn-GenerateDefaultPayables").removeClass("hide"); $("#btn-GeneratePayablesFromQuotation").removeClass("hide"); }
    //else { $("#btn-AddPayables").addClass("hide"); $("#btn-GenerateDefaultPayables").addClass("hide"); $("#btn-GeneratePayablesFromQuotation").addClass("hide"); }
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //if (OEPay && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeletePayableID");
    //HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function Payables_GetAvailableCharges() {
    debugger;
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
    //        FadePageCover(false);
    //    }
    //    , 1/*pCodeOrName*/);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithoutValues(false);");
}
function Payables_EditByDblClick(pID) {
    jQuery("#EditPayableModal").modal("show");
    Payables_FillControls(pID);
}
function Payables_FillControls(pID) {
    debugger;
    ClearAll("#EditPayableModal");
    if ($("#hDefaultUnEditableCompanyName").val() == "GBL") {
        $(".classShowForGBL").removeClass("hide");
        $("#txtPayableSupplierInvoiceNo").attr("data-required", "true");
    }
    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").text();
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").text();

    var pTaxTypeID = $(tr).find("td.PayableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.PayableDiscountTypeID").attr('val');



    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");

    debugger;

    if (pPartnerSupplierID == 0) {
        $("#txtPayableSupplierInvoiceNo").attr("disabled", "disabled");
        //$("#txtPayableSupplierReceiptNo").attr("disabled", "disabled");
    }
    else {
        $("#txtPayableSupplierInvoiceNo").removeAttr("disabled");
        $("#txtPayableSupplierReceiptNo").removeAttr("disabled");
    }
    //if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "" && $(tr).find("td.PayableSupplierReceiptNo").text() == "")
    if ($(tr).find("td.PayableSupplierInvoiceNo").text() == "")
        $("#slPayableSupplier").removeAttr("disabled");
    else
        $("#slPayableSupplier").attr("disabled", "disabled");

    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slPayablePOrC" /*pSlName*/, " WHERE 1=1 ");  //PayablePOrC_GetList(pPOrCID, "slPayablePOrC");
    PayableSuppliers_GetList(pPartnerSupplierID, "slPayableSupplier", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            FillSupplierSites(pSupplierSiteID, 'slPayableSupplier', 'slPayableSupplier', 'slSites');
    });
    $("#slPayableCurrency").html($("#hReadySlCurrencies").html()); $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
    PayableUOM_GetList(pUOMID, "slPayableUOM");
    GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
                , "<--Select-->", "slPayableTax", "WHERE IsInactive=0 ORDER BY Name"
                , function () {
                    $("#slPayableDiscount").html($("#slPayableTax").html());
                    $("#slPayableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
                    $("#slPayableTax option[IsDiscount='true']").addClass('hide');
                    $("#slPayableDiscount option[IsDiscount='false']").addClass('hide');
                });

    $("#lblPayableShown").html(": " + $(tr).find("td.Payable").text());
    $("#lblPayableCreatedBy").html(" : " + $(tr).find("td.PayableCreatorName").text())
    $("#lblPayableCreationDate").html(" : " + $(tr).find("td.PayableCreationDate").text())
    $("#lblPayableUpdatedBy").html(": " + $(tr).find("td.PayableModificatorName").text())
    $("#lblPayableModificationDate").html(" : " + $(tr).find("td.PayableModificationDate").text())

    //$("#txtPayableType").val($(tr).find("td.Payable").text());
    //$("#txtPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE MasterOperationID = " + pOperationID, pOrderBy: "HouseNumber" }
        , function () { FadePageCover(false); });
    $("#txtPayableQuantity").val($(tr).find("td.PayableQuantity").text());
    $("#txtPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtPayableAmountWithoutVAT").val(parseInt($(tr).find("td.PayableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.PayableAmountWithoutVAT").text());

    $("#txtPayableTaxPercentage").val($(tr).find("td.PayableTaxPercentage").text());
    $("#txtPayableTaxAmount").val($(tr).find("td.PayableTaxAmount").text());
    $("#txtPayableDiscountPercentage").val($(tr).find("td.PayableDiscountPercentage").text());
    $("#txtPayableDiscountAmount").val($(tr).find("td.PayableDiscountAmount").text());

    $("#txtPayableAmount").val(parseInt($(tr).find("td.PayableCostAmount").text()) == 0 ? "" : $(tr).find("td.PayableCostAmount").text());
    $("#txtPayableInitialSalePrice").val($(tr).find("td.PayableInitialSalePrice").text());
    $("#txtPayableExchangeRate").val($(tr).find("td.PayableExchangeRate").text());
    $("#txtPayableSupplierInvoiceNo").val($(tr).find("td.PayableSupplierInvoiceNo").text());
    $("#txtPayableSupplierReceiptNo").val($(tr).find("td.PayableSupplierReceiptNo").text());
    $("#txtPayableEntryDate").val($(tr).find("td.PayableEntryDate").text());
    $("#txtPayableIssueDate").val($(tr).find("td.PayableIssueDate").text());
    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");
}
function Payables_MultiRowEdit() {
    debugger;
    var pStrFnName = "/api/Payables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE OperationID = " + $("#slOperation").val();
    pWhereClause += ($("#hOperationVehicleID").val() == 0 ? "" : " AND OperationVehicleID = " + $("#hOperationVehicleID").val());
    pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";

    FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); });

    $("#btn-SearchCharges").attr("onclick", "Payables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Payables_UpdateList(false);");
}
function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    var pWhereClause = " WHERE OperationID = " + $("#slOperation").val();
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause, pCallback);
}
function PayableUOM_GetList(pID, pSlName) {
    var pWhereClause = "";
    //pWhereClause += " Where OperationID = " + $("#hOperationID").val();
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
function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}
function Payables_Update(pSaveandAddNew) {
    debugger;
    if (
            (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
            || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
        )
        swal(strSorry, strCheckDates);
    //else if ($("#hDefaultUnEditableCompanyName").val() == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0
        || (parseInt($("#txtPayableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {
        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
            , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            , pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pOperationID: $("#slOperation").val()
            , pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            , pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            , pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            , pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            , pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            , pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            , pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            , pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            , pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            , pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            , pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            , pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            , pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            , pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            , pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            , pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            , pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            , pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            , pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            , pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            , pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            , pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            , pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            , pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            , pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            , pPayableBillTo: 0
            , pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            , pTruckingOrderID: 0
        }, pSaveandAddNew, "EditPayableModal"
        , function (data) {
            OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            if (data[1] != "") //supplier invoice number uniqueness violated
                swal(strSorry, data[1]);
        });
    }
}
function Payables_UpdateList(pSaveandAddNew) {
    var pSelectedPayablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    var pPOrCList = "";
    var pSupplierList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pCostPriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pCostAmountList = "";
    var pInitialSalePriceList = "";
    var pSupplierInvoiceNumberList = "";
    var pSupplierReceiptNumberList = "";
    var pIssueDateList = "";
    var pEntryDateList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pPartnerTypeIDList = "";//pPartnerTypeIDList,pPartnerIDList are to check uniqueness of supplier invoice No. in the controller
    var pPartnerIDList = "";
    var pSupplierSiteIDList = "";
    var pNotesList = "";
    var pBillIDList = "";
    var _IsZeroExchangeRate = false;
    var _NullSupplierSite = false;
    var _NullSupplierInvoiceNo = false;
    if (pSelectedPayablesIDsToUpdate != "") {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedPayablesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPayablesIDsToUpdate.split(",")[i];
            if (IsNull($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val(), "0") == "0" && ($("#hDefaultUnEditableCompanyName").val() == "MIL" || $("#hDefaultUnEditableCompanyName").val() == "GBL"))
                _NullSupplierInvoiceNo = true;
            if ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 0
                || (parseInt($("#txtTblModalPayableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;
            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slPayablePOrC" + currentRowID).val() == undefined || $("#slPayablePOrC" + currentRowID).val() == "" ? 0 : $("#slPayablePOrC" + currentRowID).val());
            pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slPayableUOM" + currentRowID).val() == undefined || $("#slPayableUOM" + currentRowID).val() == "" ? 0 : $("#slPayableUOM" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalPayableQuantity" + currentRowID).val() == undefined || $("#txtTblModalPayableQuantity" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableQuantity" + currentRowID).val());
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalPayableCostPrice" + currentRowID).val() == undefined || $("#txtTblModalPayableCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostPrice" + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slPayableTax" + currentRowID).val() == undefined || $("#slPayableTax" + currentRowID).val() == "" ? 0 : $("#slPayableTax" + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableTaxPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxPercentage" + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalPayableTaxAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableTaxAmount" + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slPayableDiscount" + currentRowID).val() == undefined || $("#slPayableDiscount" + currentRowID).val() == "" ? 0 : $("#slPayableDiscount" + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountPercentage" + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalPayableDiscountAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableDiscountAmount" + currentRowID).val());

            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmount" + currentRowID).val());
            pInitialSalePriceList += ((pInitialSalePriceList == "") ? "" : ",") + ($("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == undefined || $("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableInitialSalePrice" + currentRowID).val());
            pSupplierInvoiceNumberList += ((pSupplierInvoiceNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim().toUpperCase());
            pSupplierReceiptNumberList += ((pSupplierReceiptNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim().toUpperCase());
            pIssueDateList += ((pIssueDateList == "") ? "" : ",") + ($("#txtTblModalPayableIssueDate" + currentRowID).val() == undefined || $("#txtTblModalPayableIssueDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableIssueDate" + currentRowID).val().trim());
            pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : $("#txtTblModalPayableEntryDate" + currentRowID).val().trim());
            //pEntryDateList += ((pEntryDateList == "") ? "" : ",") + ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ? "" : ConvertDateFormat($("#txtTblModalPayableEntryDate" + currentRowID).val().trim()));
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableExchangeRate" + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slPayableCurrency" + currentRowID).val() == undefined || $("#slPayableCurrency" + currentRowID).val() == "" ? 0 : $("#slPayableCurrency" + currentRowID).val());
            pPartnerTypeIDList += ((pPartnerTypeIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerTypeID"));
            pPartnerIDList += ((pPartnerIDList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerID"));
            pSupplierSiteIDList += ((pSupplierSiteIDList == "") ? "" : ",") + ($("#slPayableSupplierSiteID" + currentRowID).val() == undefined || $("#slPayableSupplierSiteID" + currentRowID).val() == "" ? 0 : $("#slPayableSupplierSiteID" + currentRowID).val());
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalPayableNotes" + currentRowID).val() == undefined || $("#txtTblModalPayableNotes" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableNotes" + currentRowID).val().trim().toUpperCase());
            pBillIDList += ((pBillIDList == "") ? "" : ",") + "0";
        }
    }
    if (_NullSupplierSite) {
        swal("Sorry", "Please, select site.");
        FadePageCover(false);
    }
    else if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    }
    else if (_NullSupplierInvoiceNo) {
        swal("Sorry", "Please, Insert Supplier Invoice No.");
        FadePageCover(false);
    }
    else {
        if (pSelectedPayablesIDsToUpdate != "")
            CallPOSTFunctionWithParameters("/api/Payables/UpdateList"
                , {
                    "pIsCalledFromOperations": true
                    , "pSelectedPayablesIDsToUpdate": pSelectedPayablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pSupplierList": pSupplierList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pCostPriceList": pCostPriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pCostAmountList": pCostAmountList
                    , "pInitialSalePriceList": pInitialSalePriceList
                    , "pSupplierInvoiceNumberList": pSupplierInvoiceNumberList
                    , "pSupplierReceiptNumberList": pSupplierReceiptNumberList
                    , "pIssueDateList": pIssueDateList
                    , "pEntryDateList": pEntryDateList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pPartnerTypeIDList": pPartnerTypeIDList
                    , "pPartnerIDList": pPartnerIDList
                    , "pSupplierSiteIDList": pSupplierSiteIDList
                    , "pNotesList": pNotesList
                    , "pBillIDList": pBillIDList
                }
                , function (data) {
                    debugger;
                    OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    if (data[1] != "")
                        swal(strSorry, data[1]);
                    else {
                        swal("Success", "Saved successfully.");
                        jQuery("#SelectChargesModal").modal("hide");
                    }
                }, null);
    }
}
function Payables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: $("#hQuotationRouteID").val()
                , pOperationContainersAndPackagesID: 0, pOperationVehicleID: $("#hOperationVehicleID").val(),pTruckingOrderID : 0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
function Payables_PayableSupplierInvoiceOrReceiptNoChanged(pSupplierControl, pSupplierInvoiceControlID, pSupplierReceiptControlID) { //pSupplierControl is a control not ID so dont use #
    debugger;
    //if ($(pSupplierInvoiceControlID).val() == "" && $(pSupplierReceiptControlID).val() == "") {
    if ($(pSupplierInvoiceControlID).val() == "") {
        $(pSupplierControl).removeAttr("disabled");
    }
    else {
        $(pSupplierControl).attr("disabled", "disabled");
    }
}
function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtPayableQuantity").val() * $("#txtPayableUnitPrice").val();
    $("#txtPayableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtPayableTaxPercentage").val(decTaxPercentage);
    $("#txtPayableTaxAmount").val(decTaxAmount.toFixed(4));
    $("#txtPayableDiscountPercentage").val(decDiscountPercentage);
    $("#txtPayableDiscountAmount").val(decDiscountAmount.toFixed(4));
    $("#txtPayableAmount").val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));
}
//if not insert (i.e. update then all will rows will be selected)
function Payables_Row_CalculatePayablesAmount(pRowID, pIsInsert) {
    var rowQuantity = $("#txtTblModalPayableQuantity" + pRowID).val();
    var rowCostPrice = $("#txtTblModalPayableCostPrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowCostPrice;
    $("#txtTblModalPayableCostAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    decTaxPercentage = $("#slPayableTax" + pRowID + " option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slPayableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    $("#txtTblModalPayableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalPayableTaxAmount" + pRowID).val(decTaxAmount.toFixed(4));
    $("#txtTblModalPayableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalPayableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(4));
    $("#txtTblModalPayableCostAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(4));

    if (pIsInsert) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert);
}
//to handle change of currency in the multi row edit modal
function Payables_txtTblModalCurrency_Changed(pRowID, pIsInsert) {
    debugger;
    //if (pIsInsert) { //if not insert then all IDs will be updated
    $("#txtTblModalPayableExchangeRate" + pRowID).val($("#slPayableCurrency" + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency" + pRowID).val())
        $("#txtTblModalPayableExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalPayableExchangeRate" + pRowID).removeAttr("disabled");
    //}
}
function Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert) {
    if (pIsInsert) { //if not insert then all IDs will be updated
        var varPayableCostAmount = $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=txtTblModalPayableCostAmount]').val();
        if (varPayableCostAmount != 0 && varPayableCostAmount != "")
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", true);
        else
            $("#tblModalPayables tr[ID='" + pRowID + "']").find('input[name=cbSelectPayables]').prop("checked", false);
    }
}
function Payables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayables') != "")
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
            DeleteListFunction("/api/Payables/Delete"
                , { pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#slOperation").val() }
                , function () {
                    OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val());
                });
        });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function FillSupplierSitesBySupplier(pID, pItemID) {
    debugger;
    var ControlID = slPayableSupplier + pItemID;
    var pWhereClause = "WHERE SupplierID= " + $("#slPayableSupplier" + pItemID + " option:selected").attr("partnerid");
    if ($("#slPayableSupplier" + pItemID + " option:selected").attr("partnertypeid") != '8')
        pWhereClause = "Where 1=0";

    CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
    , { pWhereClause: pWhereClause }
    , function (pData) {
        FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slPayableSupplierSiteID" + pItemID, pData[0], null);
    }
    , null);
}
/******************************************Get Suppliers Sites******************************************/
function FillSupplierSites(pID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == "GBL") {
        var pWhereClause = "WHERE SupplierID= " + $('#slPayableSupplier option:selected').attr("partnerid");
        if ($('#slPayableSupplier option:selected').attr("partnertypeid") != '8')
            pWhereClause = "Where 1=0";

        CallGETFunctionWithParameters("/api/Suppliers/LoadSupplierSites"
        , { pWhereClause: pWhereClause }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slSites", pData[0], null);
        }
        , null);
    }
}
/******************Receivables**************************/
function Receivables_BindTableRows(pReceivables) {
    ClearAllTableRows("tblReceivables");
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceivables, function (i, item) {
        AppendRowtoTable("tblReceivables",
        //("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && OERec && $("#hIsOperationDisabled").val() == false ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
        ("<tr ID='" + item.ID + "' " + (item.InvoiceID == 0 && item.AccNoteID == 0 && OERec ? "ondblclick='Receivables_EditByDblClick(" + item.ID + ");'>" : ">")
                    + "<td class='ReceivableID'> <input " + (item.InvoiceID == 0 && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Receivable' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                    + "<td class='ReceivablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //+ "<td class='ReceivableSupplier hide' val='" + item.SupplierID + "'>" + (item.SupplierID == 0 ? "" : item.SupplierName) + "</td>"
                    //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ReceivableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='ReceivableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='ReceivableQuantity'>" + item.Quantity + "</td>"
                    + "<td class='ReceivableCostPrice hide'>" + (item.CostPrice).toFixed(4) + "</td>"
                    + "<td class='ReceivableCostAmount hide'>" + (item.CostAmount).toFixed(4) + "</td>"
                    + "<td class='ReceivableSalePrice'>" + (item.SalePrice).toFixed(4) + "</td>"

                    + "<td class='ReceivableAmountWithoutVAT hide'>" + item.AmountWithoutVAT.toFixed(4) + "</td>"
                    + "<td class='ReceivableTaxTypeID' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='ReceivableTaxPercentage hide'>" + item.TaxPercentage.toFixed(4) + "</td>"
                    + "<td class='ReceivableTaxAmount hide'>" + item.TaxAmount.toFixed(4) + "</td>"
                    + "<td class='ReceivableDiscountTypeID' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : (item.DiscountPercentage + '%')) + "</td>"
                    + "<td class='ReceivableDiscountPercentage hide'>" + item.DiscountPercentage.toFixed(4) + "</td>"
                    + "<td class='ReceivableDiscountAmount hide'>" + item.DiscountAmount.toFixed(4) + "</td>"

                    + "<td class='ReceivableSaleAmount'>" + (item.SaleAmount).toFixed(4) + "</td>"
                    + "<td class='ReceivableExchangeRate'>" + item.ExchangeRate.toFixed(4) + "</td>"
                    + "<td class='ReceivableCurrency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='ReceivableInvoice hide' val='" + item.InvoiceID + "'>" + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + " / " + item.InvoiceTypeName)) + "</td>"
                    + "<td class='ReceivableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.Code) + "</td>"
                    + "<td class='ReceivableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='ReceivableNotes hide'>" + (item.Notes == "0" ? "" : item.Notes) + "</td>"

                    + "<td class='ReceivableIssueDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + "</td>"
                    + "<td class='ReceivableOperationContainersAndPackagesID hide'>" + item.OperationContainersAndPackagesID + "</td>"
                    + "<td class='ReceivableTrailerID hide'>" + item.TrailerID + "</td>"

                    + "<td class='ReceivableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='ReceivableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='ReceivableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='ReceivableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='ReceivableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='ReceivableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td class='hide'><a href='#EditReceivableModal' data-toggle='modal' onclick='Receivables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        //+ "</tr>"));
    });
    ////ApplyPermissions();
    //if (OARec && $("#hIsOperationDisabled").val() == false) { $("#btn-AddReceivables").removeClass("hide"); $("#btn-GenerateDefaultReceivables").removeClass("hide"); $("#btn-GenerateReceivablesFromQuotation").removeClass("hide"); $("#btn-GenerateReceivablesFromPayables").removeClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").removeClass("hide"); $("#slReceivableInvoiceTypes").removeClass("hide"); }
    //else { $("#btn-AddReceivables").addClass("hide"); $("#btn-GenerateDefaultReceivables").addClass("hide"); $("#btn-GenerateReceivablesFromQuotation").addClass("hide"); $("#btn-GenerateReceivablesFromPayables").addClass("hide"); $("#btn-ApplyInvoiceTypeDefaults").addClass("hide"); $("#slReceivableInvoiceTypes").addClass("hide"); }
    //if (ODRec && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteReceivable").removeClass("hide"); else $("#btn-DeleteReceivable").addClass("hide");
    //if (OERec && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditReceivables").removeClass("hide"); else $("#btn-MultiRowEditReceivables").addClass("hide");

    BindAllCheckboxonTable("tblReceivables", "ReceivableID", "cb-CheckAll-Receivables");
    CheckAllCheckbox("HeaderDeleteReceivableID");
    //HighlightText("#tblReceivables>tbody>tr", $("#txt-Search").val().trim());
    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //PayablesAndReceivables_CalculateSummary();
    //Receivables_CalculateSubtotals();
}
function Receivables_GetAvailableCharges() {
    $("#divSelectCharges").html("");
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInReceivable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    ////pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Receivables ";
    ////pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        FadePageCover(false);
    //    }, 1/*pCodeOrName*/);
    GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

    $("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithoutValues(false);");
    //FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , false /*pIsEditInvoice*/, function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Receivables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Receivables_GetAvailableCharges();");
}
function Receivables_EditByDblClick(pID) {
    jQuery("#EditReceivableModal").modal("show");
    Receivables_FillControls(pID);
}
function Receivables_FillControls(pID) {
    ClearAll("#EditReceivableModal");

    $("#hReceivableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblReceivables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.ReceivablePOrC").attr('val');
    var pSupplierID = $(tr).find("td.ReceivableSupplier").attr('val');
    var pUOMID = $(tr).find("td.ReceivableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.ReceivableCurrency").attr('val');
    var pTaxTypeID = $(tr).find("td.ReceivableTaxTypeID").attr('val');
    var pDiscountTypeID = $(tr).find("td.ReceivableDiscountTypeID").attr('val');
    if ($("#hDefaultCurrencyID").val() == pCurrencyID)
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
    GetListWithCodeAndWhereClause(pID, "/api/NoAccessFreightTypes/LoadAll", "P/C", "slReceivablePOrC" /*pSlName*/, " WHERE 1=1 ");  //ReceivablePOrC_GetList(pPOrCID, "slReceivablePOrC");
    //ReceivableSuppliers_GetList(pSupplierID, "slReceivableSupplier");
    $("#slReceivableCurrency").html($("#hReadySlCurrencies").html()); $("#slReceivableCurrency").val(pCurrencyID); //ReceivableCurrency_GetList(pCurrencyID, "slReceivableCurrency", null);
    ReceivableUOM_GetList(pUOMID, "slReceivableUOM");

    $("#lblReceivableShown").html(": " + $(tr).find("td.Receivable").text());
    $("#lblReceivableCreatedBy").html(" : " + $(tr).find("td.ReceivableCreatorName").text())
    $("#lblReceivableCreationDate").html(" : " + $(tr).find("td.ReceivableCreationDate").text())
    $("#lblReceivableUpdatedBy").html(": " + $(tr).find("td.ReceivableModificatorName").text())
    $("#lblReceivableModificationDate").html(" : " + $(tr).find("td.ReceivableModificationDate").text())

    //$("#txtReceivableType").val($(tr).find("td.Receivable").text());
    //$("#txtReceivableType").attr("ChargeTypeID", $(tr).find("td.Receivable").attr("val"));
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns"
        , { pWhereClauseWithMinimalColumns: "WHERE 1=1" }
        , function (pData) {
            FillListFromObject($(tr).find("td.Receivable").attr("val"), (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slReceivableChargeType", pData[0], null);
            FadePageCover(false);
        }
        , null);
    if ($("#slReceivableTax option").length < 2)
        GetListTaxTypeWithNameAndPercAttr(pTaxTypeID, "api/TaxeTypes/LoadAllWithWhereClause"
        , "<--Select-->", "slReceivableTax", "WHERE IsInactive=0 ORDER BY Name"
        , function () {
            $("#slReceivableDiscount").html($("#slReceivableTax").html());
            $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
            $("#slReceivableTax option[IsDiscount='true']").addClass('hide');
            $("#slReceivableDiscount option[IsDiscount='false']").addClass('hide');
        });
    else {
        $("#slReceivableTax").val(pTaxTypeID == 0 ? "" : pTaxTypeID);
        $("#slReceivableDiscount").val(pDiscountTypeID == 0 ? "" : pDiscountTypeID);
    }
    $("#txtReceivableQuantity").val($(tr).find("td.ReceivableQuantity").text());
    //$("#txtReceivableUnitPrice").val($(tr).find("td.ReceivableCostPrice").text());
    //$("#txtReceivableAmount").val($(tr).find("td.ReceivableCostAmount").text());
    $("#txtReceivableUnitPrice").val(parseInt($(tr).find("td.ReceivableSalePrice").text()) == 0 ? "" : $(tr).find("td.ReceivableSalePrice").text());

    $("#txtReceivableAmountWithoutVAT").val(parseInt($(tr).find("td.ReceivableAmountWithoutVAT").text()) == 0 ? "" : $(tr).find("td.ReceivableAmountWithoutVAT").text());
    $("#txtReceivableTaxPercentage").val($(tr).find("td.ReceivableTaxPercentage").text());
    $("#txtReceivableTaxAmount").val($(tr).find("td.ReceivableTaxAmount").text());
    $("#txtReceivableDiscountPercentage").val($(tr).find("td.ReceivableDiscountPercentage").text());
    $("#txtReceivableDiscountAmount").val($(tr).find("td.ReceivableDiscountAmount").text());

    $("#txtReceivableAmount").val(parseInt($(tr).find("td.ReceivableSaleAmount").text()) == 0 ? "" : $(tr).find("td.ReceivableSaleAmount").text());
    $("#txtReceivableExchangeRate").val($(tr).find("td.ReceivableExchangeRate").text());
    $("#txtReceivableNotes").val($(tr).find("td.ReceivableNotes").text());
    $("#txtReceivableIssueDate").val($(tr).find("td.ReceivableIssueDate").text());

    $("#slReceivableUOM").attr("onchange", "Receivables_UOMChanged();");
    $("#btnSaveReceivable").attr("onclick", "Receivables_Update(false);");
}
function Receivables_MultiRowEdit() {
    debugger;
    //ClearAll("#SelectChargesModal"); // to use it put it in a fn that calls it coz txtSearch is deleted before search is executed
    var pStrFnName = "/api/Receivables/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalReceivables";
    var pCheckboxNameAttr = "cbSelectReceivables";
    var pWhereClause = "";
    $("#" + pDivName).html("");
    pWhereClause += " WHERE IsDeleted = 0 AND OperationID = " + $("#slOperation").val();
    pWhereClause += ($("#hOperationVehicleID").val() == 0 ? "" : " AND OperationVehicleID = " + $("#hOperationVehicleID").val());
    pWhereClause += " AND (ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " ORDER BY ChargeTypeName ";

    FillReceivablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false /*pIsInsert*/, false /*pIsInvoiceEdit*/
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); });

    $("#btn-SearchCharges").attr("onclick", "Receivables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "Receivables_UpdateList(false, 0, false);");//parameters are(pSaveAndNew, pInvoiceID, pIsRemoveItems)
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
function Receivables_CurrencyChanged() {
    $("#txtReceivableExchangeRate").val($("#slReceivableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency").val())
        $("#txtReceivableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtReceivableExchangeRate").removeAttr("disabled");
}
function Receivables_Update(pSaveandAddNew) {
    debugger;
    //if ($("#txtReceivableAmount").val()) //check that decimal doesn't contain 2 decimal pts
    //{
    if (!isValidDate($("#txtReceivableIssueDate").val().trim(), 1) && $("#txtReceivableIssueDate").val().trim() != "")
        swal(strSorry, strCheckDates);
    else if ($("#txtReceivableExchangeRate").val() == "" || parseFloat($("#txtReceivableExchangeRate").val()) == 0
        || (parseInt($("#txtReceivableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else InsertUpdateFunction("form", "/api/Receivables/Update", {
        pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
        , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
        , pIsReceipt: $("#cbIsReceipt").prop("checked")
        , pHouseBillID: 0

        , pID: $("#hReceivableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        , pOperationID: $("#slOperation").val()
        , pChargeTypeID: $("#slReceivableChargeType").val() == "" ? 0 : $("#slReceivableChargeType").val() //$("#txtReceivableType").attr("ChargeTypeID")
        , pMeasurementID: $('#slReceivableUOM option:selected').val() != ""
            ? $('#slReceivableUOM option:selected').val()
            : 0
        //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pContainerTypeID: 0
        //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slReceivableUOM option:selected').val() != "")
        //    ? $('#slReceivableUOM option:selected').val()
        //    : 0)
        , pPOrC: ($('#slReceivablePOrC option:selected').val() == "" ? 0 : $('#slReceivablePOrC option:selected').val())
        , pSupplierID: 0//($('#slReceivableSupplier option:selected').val() == "" ? 0 : $('#slReceivableSupplier option:selected').val())
        , pQuantity: ($("#txtReceivableQuantity").val().trim() == "" ? 0 : $("#txtReceivableQuantity").val().trim())
        , pCostPrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())
        , pCostAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pSalePrice: ($("#txtReceivableUnitPrice").val().trim() == "" ? 0 : $("#txtReceivableUnitPrice").val().trim())

        , pAmountWithoutVAT: $("#txtReceivableAmountWithoutVAT").val() == "" ? 0 : $("#txtReceivableAmountWithoutVAT").val()
        , pTaxTypeID: $("#slReceivableTax").val() == "" ? 0 : $("#slReceivableTax").val()
        , pTaxPercentage: $("#txtReceivableTaxPercentage").val() == "" ? 0 : $("#txtReceivableTaxPercentage").val()
        , pTaxAmount: $("#txtReceivableTaxAmount").val() == "" ? 0 : $("#txtReceivableTaxAmount").val()
        , pDiscountTypeID: $("#slReceivableDiscount").val() == "" ? 0 : $("#slReceivableDiscount").val()
        , pDiscountPercentage: $("#txtReceivableDiscountPercentage").val() == "" ? 0 : $("#txtReceivableDiscountPercentage").val()
        , pDiscountAmount: $("#txtReceivableDiscountAmount").val() == "" ? 0 : $("#txtReceivableDiscountAmount").val()

        , pSaleAmount: ($("#txtReceivableAmount").val().trim() == "" ? 0 : $("#txtReceivableAmount").val().trim())
        , pExchangeRate: ($("#txtReceivableExchangeRate").val().trim() == "" ? 0 : $("#txtReceivableExchangeRate").val().trim())
        , pCurrencyID: ($('#slReceivableCurrency option:selected').val() == "" ? 0 : $('#slReceivableCurrency option:selected').val())
        , pNotes: $("#txtReceivableNotes").val().toUpperCase().trim()

        , pIssueDate: ($("#txtReceivableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtReceivableIssueDate").val().trim()))

        , pSalePrice_Foreign: 0 //no change
        , pExchangeRate_Foreign: 0 //no change
        , pCurrencyID_Foreign: 0 //no change
        , pReceiptNumber: "0" //no change
        , pReceiptDate: "01/01/1900" //no change

    }, pSaveandAddNew, "EditReceivableModal", function () {
        OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
    });
    //}
    //else
    //    swal(strSorry, strCheckEntries, "warning");
}
function Receivables_UpdateList(pSaveandAddNew, pInvoiceID, pIsRemoveItems) { // if (pInvoiceID > 0) then this is  updating Invoice Items(called from invoices_update)
    debugger;
    var pSelectedReceivablesIDsToUpdate = "";
    if (pInvoiceID == 0) //this is called normally from the receivables edit modal
        pSelectedReceivablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectReceivables"); //i get from selected 
    else { //this is called from invoice update
        if (pIsRemoveItems) //here i get only the unchecked items coz the others will be deleted in the controllers
            pSelectedReceivablesIDsToUpdate = GetAllNOTSelectedIDsAsStringWithNameAttr("cbSelectInvoiceItems");
        else // here i get all IDs to handle the case of checking items then pressing save and not remove items
            pSelectedReceivablesIDsToUpdate = GetAllIDsAsStringWithNameAttr("tblModalInvoiceItems", "cbSelectInvoiceItems");
    }
    var ArrayOfIDs = pSelectedReceivablesIDsToUpdate.split(',');
    var pPOrCList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pSalePriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pSaleAmountList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pViewOrderList = "";
    var _IsZeroExchangeRate = false;
    if (pSelectedReceivablesIDsToUpdate != "") {
        var NumberOfSelectRows = ArrayOfIDs.length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = ArrayOfIDs[i];
            if ($("#txtTblModalReceivableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + currentRowID).val() == "" || parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 0
                || (parseFloat($("#txtTblModalReceivableExchangeRate" + currentRowID).val()) == 1 && pDefaults.CurrencyID != ($("#slReceivableCurrency" + currentRowID).val())))
                _IsZeroExchangeRate = true;

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivablePOrC" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableUOM" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableQuantity" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSalePrice" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + ($("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableAmountWithoutVAT" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + ($("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableTax" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableTaxAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + ($("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableDiscount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountPercentage" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableDiscountAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());

            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableSaleAmount" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableExchangeRate" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#slReceivableCurrency" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
            pViewOrderList += ((pViewOrderList == "") ? "" : ",") + ($("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == undefined || $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val() == "" ? 0 : $("#txtTblModalReceivableViewOrder" + (pInvoiceID == 0 ? "" : "InvoiceEdit") + currentRowID).val());
        }
    }
    if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    }
    else {
        if (pSelectedReceivablesIDsToUpdate != "")
            InsertSelectedCheckboxItems_Post("/api/Receivables/UpdateList"
                , {
                    "pSelectedReceivablesIDsToUpdate": pSelectedReceivablesIDsToUpdate
                    , "pPOrCList": pPOrCList
                    , "pUOMList": pUOMList
                    , "pQuantityList": pQuantityList
                    , "pSalePriceList": pSalePriceList

                    , "pAmountWithoutVATList": pAmountWithoutVATList
                    , "pTaxTypeIDList": pTaxTypeIDList
                    , "pTaxPercentageList": pTaxPercentageList
                    , "pTaxAmountList": pTaxAmountList
                    , "pDiscountTypeIDList": pDiscountTypeIDList
                    , "pDiscountPercentageList": pDiscountPercentageList
                    , "pDiscountAmountList": pDiscountAmountList

                    , "pSaleAmountList": pSaleAmountList
                    , "pExchangeRateList": pExchangeRateList
                    , "pCurrencyList": pCurrencyList
                    , "pViewOrderList": pViewOrderList
                    , "pInvoiceID": pInvoiceID //if pInvoiceID==0 then its not used else this is invoice items update
                }
                , pSaveandAddNew
                , "SelectChargesModal" //pModalID
                , function () { /*Receivables_GetAvailableCharges();*/ }
                , function () {
                    OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                });
        else
            swal(strSorry, "No available items to be updated.");
    }
}
//called when pressing Apply in SelectCharges Modal
function Receivables_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Receivables/InsertListWithoutValues"
            , {
                pOperationID: $("#slOperation").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: $("#hQuotationRouteID").val()
                , pOperationContainersAndPackagesID: 0, pOperationVehicleID: $("#hOperationVehicleID").val(), pTruckingOrderID:0
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Receivables_GetAvailableCharges(); }
            , function () {
                OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val()); //Receivables_LoadWithPagingWithWhereClause($("#hOperationID").val());
            });
}
//function CalculateReceivablesAmount() {
//    $("#txtReceivableAmount").val($("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val());
//}
function CalculateReceivablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = $("#txtReceivableQuantity").val() * $("#txtReceivableUnitPrice").val();
    $("#txtReceivableAmountWithoutVAT").val(decAmountWithoutVAT);
    decTaxPercentage = $("#slReceivableTax option:selected").attr("CurrentPercentage");
    decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
    decDiscountPercentage = $("#slReceivableDiscount option:selected").attr("CurrentPercentage");
    decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;

    $("#txtReceivableTaxPercentage").val(decTaxPercentage);
    $("#txtReceivableTaxAmount").val(decTaxAmount.toFixed(2));
    $("#txtReceivableDiscountPercentage").val(decDiscountPercentage);
    $("#txtReceivableDiscountAmount").val(decDiscountAmount.toFixed(2));
    $("#txtReceivableAmount").val((Math.round(((parseFloat(decAmountWithoutVAT) + parseFloat(decTaxAmount) - parseFloat(decDiscountAmount))) * 100) / 100).toFixed(2));
}
////if not insert (i.e. update then all will rows will be selected)
//function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
//    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
//    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();
//    $("#txtTblModalReceivableSaleAmount" + pRowID).val(rowQuantity * rowSalePrice);
//    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
//        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
//}
//if not insert (i.e. update then all will rows will be selected)
function Receivables_Row_CalculateReceivablesAmount(pRowID, pIsInsertChoice) {
    debugger;
    var rowQuantity = $("#txtTblModalReceivableQuantity" + pRowID).val();
    var rowSalePrice = $("#txtTblModalReceivableSalePrice" + pRowID).val();

    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0; var decTaxPercentage = 0.0;
    var decDiscountAmount = 0; var decDiscountPercentage = 0.0;

    decAmountWithoutVAT = rowQuantity * rowSalePrice;
    $("#txtTblModalReceivableAmountWithoutVAT" + pRowID).val(decAmountWithoutVAT);
    if (pDefaults.IsTaxOnItems && !pIsInsertChoice/*to not calc. tax in case of Gen from Payables*/) {
        decTaxPercentage = $("#slReceivableTax" + pRowID + " option:selected").attr("CurrentPercentage");
        decTaxAmount = decAmountWithoutVAT * decTaxPercentage / 100;
        decDiscountPercentage = $("#slReceivableDiscount" + pRowID + " option:selected").attr("CurrentPercentage");
        decDiscountAmount = decAmountWithoutVAT * decDiscountPercentage / 100;
    }
    $("#txtTblModalReceivableTaxPercentage" + pRowID).val(decTaxPercentage);
    $("#txtTblModalReceivableTaxAmount" + pRowID).val(decTaxAmount.toFixed(2));
    $("#txtTblModalReceivableDiscountPercentage" + pRowID).val(decDiscountPercentage);
    $("#txtTblModalReceivableDiscountAmount" + pRowID).val(decDiscountAmount.toFixed(2));
    $("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount - decDiscountAmount).toFixed(2)); //$("#txtTblModalReceivableSaleAmount" + pRowID).val((decAmountWithoutVAT + decTaxAmount).toFixed(2));

    if (pIsInsertChoice) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
        Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice);
}
//to handle change of currency in the multi row edit modal
function Receivables_txtTblModalCurrency_Changed(pRowID, pIsInvoiceEdit) {
    $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val($("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slReceivableCurrency" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).val())
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalReceivableExchangeRate" + (pIsInvoiceEdit ? "InvoiceEdit" : "") + pRowID).removeAttr("disabled");
}
function Receivables_txtTblModalSaleAmount_Changed(pRowID, pIsInsertChoice) {
    if (pIsInsertChoice) { //if not insert then all IDs will be updated
        var varReceivableSaleAmount = $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=txtTblModalReceivableSaleAmount]').val();
        if (varReceivableSaleAmount != 0 && varReceivableSaleAmount != "")
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", true);
        else
            $("#tblModalReceivables tr[ID='" + pRowID + "']").find('input[name=cbSelectReceivables]').prop("checked", false);
    }
}
function Receivables_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceivables') != "")
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
            DeleteListFunction("/api/Receivables/Delete"
                , { pReceivablesIDs: GetAllSelectedIDsAsString('tblReceivables'), pOperationID: $("#slOperation").val() }
                , function () {
                    OperationCharges_FillModal($("#slOperation").val(), $("#hOperationVehicleID").val());
                });
        });
    //DeleteListFunction("/api/Receivables/Delete", { "pReceivablesIDs": GetAllSelectedIDsAsString('tblReceivables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
