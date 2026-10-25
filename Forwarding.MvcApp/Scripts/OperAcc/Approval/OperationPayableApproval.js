

var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
$(document).ready(function () {
    $("#slCostCenter").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    if (pDefaults.UnEditableCompanyName == 'NEW') {
        $("#slPartner").css({ "width": "100%" }).select2();
    }

});

var maxDetailsIDInTable = 0;

function OperationPayableApproval_BindTableRows(pPayables) {
    debugger;
    //Start Auto Filter
    $(document).ready(function () {
        $("#slCostCenter").css({ "width": "100%" }).select2();
        $("div[tabindex='-1']").removeAttr('tabindex');
        if (pDefaults.UnEditableCompanyName == 'NEW') {
            $("#slPartner").css({ "width": "100%" }).select2();
        }

    });
            //End Auto Filter
    //if (IsAccountingActive)
    //    $("#hl-menu-ReceiptsAndPaymentsGroup").parent().addClass("active");
    //else
    //    $("#hl-menu-OperAcc").parent().addClass("active");
    ++maxDetailsIDInTable;

    ClearAllTableRows("tblPayables");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-check-square-o' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Approve") + "</span>";
    var setCustodyControlsText = " class='btn btn-xs btn-rounded btn-primary' title='Set Custody'> <i class='fa fa-hand-o-up' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Set Custody") + "</span>";
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayables",
            //("<tr ID='" + item.ID + "' " + (OEPay && $("#hIsOperationDisabled").val() == false ? ("ondblclick='Payables_EditByDblClick(" + item.ID + ");'") : "") + ">"
            ("<tr ID='" + item.ID + "' " + (item.IsApproved ? " class='text-primary' " : "") + "ondblclick='Payables_EditByDblClick(" + item.ID + ");'>"+ ">"
                //+ "<td class='PayableID'> <input " + (item.PartnerSupplierID != 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='PayableID'> <input " + "name='Delete'" + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='PayableID'> <input " + "name='Delete'" + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                + "<td class='PayableSupplier' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "N/A" : item.PartnerSupplierName) + "</td>"
                + "<td class='PayableSupplierOperationPartnerTypeID hide' >" + item.SupplierOperationPartnerTypeID + "</td>"
                + "<td class='PayableOperation' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</td>"
                + "<td class='VesselID' val='" + item.VesselID + "'>" + (item.VesselID == 0 ? "" : item.VesselName) + "</td>"
                + "<td class='IssueDate' val='" + GetDateFromServer(item.IssueDate) + "'>" + GetDateFromServer(item.IssueDate) + "</td>"
                + "<td class='EntryDate' val='" + GetDateFromServer(item.EntryDate) + "'>" + GetDateFromServer(item.EntryDate) + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

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
                + "<td class='PayableBillTo hide' val='" + item.BillTo + "'>" + (item.BillTo == 0 ? "" : item.BillToName) + "</td>"
                + "<td class='PayableExchangeRate hide'>" + item.ExchangeRate.toFixed(4) + "</td>"
                + "<td class='PayableCostAmount ' val=" + item.CostAmount + ">" + item.CostAmount.toFixed(4) + "</td>"
                + "<td class='IsPaid'> <input type='checkbox' disabled='disabled' val='" + (item.PayableStatus == "Paid" ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='PayableCurrency'  val='" + item.CurrencyID + "' val2='" + item.CurrencyCode + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                + "<td class='PayableTankOrFlexiNumber " + (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "IST" ? "" : "hide") + "'>" + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + "</td>"
                //+ "<td class='PayableCustodyID' val=" + item.CustodyID + ">" + (item.CustodyID == 0 
                //                                                                                ? (item.IsApproved && item.SupplierOperationPartnerTypeID != constCustodyOperationPartnerTypeID //it is approved i.e. i am sure there is partner isa
                //                                                                                        ? ("<a href='#EditPayableModal' data-toggle='modal' onclick='OperationPayableApproval_SelectCustodyToBeSet(" + item.ID + ");' " + setCustodyControlsText + "</a>")
                //                                                                                        : "")
                //                                                                                : item.CustodyName)
                //+ "</td>"
                + "<td class='PayableCustodyID hide' val=" + item.CustodyID + ">" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
                //+ "<td class='CostCenter' style='min-width: 108px'  val=''><select  tag='" + (0 == 0 ? "" : 0) + "' id='slCostCenterD" + item.ID + "' style='width:100%;' class='controlStyle slCostCenterD' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='; ' data-required='false'>" + $('#slCostCenter').html() + "</select></td>"
                + "<td class='CostCenter' val=''>  <select id='slCostCenters" + item.ID + "' class='controlStyle slCostCenters' style='width:160px;' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' " + (1 == 2 ? " disabled='disabled' " : "") + " data-required='false'></select> </td> "


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
                + "<td class=''>"
                //  + "<a href='#'" + (item.IsApproved || item.PartnerSupplierID == 0 ? "disabled='disabled' " : " ") + " onclick='OperationPayableApproval_SelectCustody(" + item.ID + ",true);' " + editControlsText + "</a>"
                + "<a href='#'" + (item.IsApproved ? "disabled='disabled' " : " ") + " onclick='OperationPayableApproval_SelectCustody(" + item.ID + ",true);' " + editControlsText + "</a>"
                + "</td>"

                + "<td class='hide'><a href='#EditPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        $("#slCostCenters" + item.ID).html($("#slCostCenter").html());
    });



    //$.each(pPayables, function (i, item) {
    //    debugger;
    //    $("#slCostCenterD" + item.ID).html($("#slCostCenterD").html());

    //});
    //ApplyPermissions();
    

    if (pDefaults.UnEditableCompanyName == "LATT") {
        if ($("#hf_CanEdit").val() == 1) {
            $("#btn-ApproveAllSelected").removeClass("hide");
        }
        else {
            $("#btn-ApproveAllSelected").addClass("hide");
        }
        if ($("#hf_CanDelete").val() == 1) {
            $("#btn-UnApproveAllSelected").removeClass("hide");
        }
        else {
            $("#btn-UnApproveAllSelected").addClass("hide");
        }
    } else {
        if ($("#hf_CanEdit").val() == 1) {
            $("#btn-ApproveAllSelected").removeClass("hide");
            $("#btn-UnApproveAllSelected").removeClass("hide");
        }
        else {
            $("#btn-ApproveAllSelected").addClass("hide");
            $("#btn-UnApproveAllSelected").addClass("hide");
        }
    }

    if ($("#hDefaultUnEditableCompanyName").val() == "GBL")
        $('#btn-UnApproveAllSelected').addClass('hide');
    else if (pDefaults.UnEditableCompanyName != "LATT")
        $('#btn-UnApproveAllSelected').removeClass('hide');

    CalcTotal();
    BindAllCheckboxonTable("tblPayables", "PayableID", "cb-CheckAll-Payables");

    CheckAllCheckbox("HeaderDeletePayableID");
    HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

//_________________________________________________________________________



function Payables_EditByDblClick(pID) {
    debugger;
    jQuery("#EditPayableModal").modal("show");
    Payables_FillControls(pID);
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
                    , {
                        pPayablesIDs: GetAllSelectedIDsAsString('tblPayables'), pOperationID: $("#hShipmentID").val()
                    }
                    , function () {
                        OperationCharges_FillModal();
                    });
            });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function Payables_FillControls(pID) {
    ClearAll("#EditPayableModal");

    $("#hPayableID").val(pID);
    FadePageCover(true);
    var tr = $("#tblPayables tr[ID='" + pID + "']");
    var pPOrCID = $(tr).find("td.PayablePOrC").attr('val');
    var pPartnerSupplierID = $(tr).find("td.PayableSupplier").attr('val');
    var pUOMID = $(tr).find("td.PayableUOM").attr('val');
    var pCurrencyID = $(tr).find("td.PayableCurrency").attr('val');
    var pOperationID = $(tr).find("td.PayableOperation").attr('val');
    var pBillID = $(tr).find("td.PayableBillID").attr('val');
    var pSupplierSiteID = $(tr).find("td.PayableSupplier").attr('val');
    var pPayableBillTo = $(tr).find("td.PayableBillTo").attr('val');
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
    } else {
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
        $("#slPayableBillTo").html($("#slPayableSupplier").html()); $("#slPayableBillTo").val(pPayableBillTo == 0 ? "" : pPayableBillTo);
        
    });

    $("#slPayableCurrency").html($("#hReadySlCurrencies").html());
    $("#slPayableCurrency").val(pCurrencyID); //PayableCurrency_GetList(pCurrencyID, "slPayableCurrency");
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
        , {
            pWhereClauseWithMinimalColumns: "WHERE 1=1"
        }
        , function (pData) {
            FillListFromObject($(tr).find("td.Payable").attr("val"), 2, "<--Select-->", "slPayableChargeType", pData[0], null);
        }
        , null);
    GetListWithOpCodeAndHouseNoAndClientEmailAttr(pBillID, "/api/Operations/LoadWithParameters", "<--Select-->", "slPayableBill"
        , {
            pPageNumber: 1,
            pPageSize: 99999,
            pWhereClause: " WHERE MasterOperationID = " + pOperationID,
            pOrderBy: "HouseNumber"
        }
        , function () {
            FadePageCover(false);
            debugger;
            var optionWithValue = $("#slPayableBill").find("option[value='" + pBillID + "']");
            optionWithValue.prop('selected', true);

        });

    CallGETFunctionWithParameters("/api/Payables/LoadAll"
        , {
            pWhereClause: " WHERE ID=" + $("#hPayableID").val()
            , pOrderBy: "ID"
        }
        , function (pData) {
            debugger;
            var pPayableList = JSON.parse(pData[0]);
            var pEntryDate = moment(pPayableList[0].EntryDate).format('DD/MM/YYYY')
            var pIssueDate = moment(pPayableList[0].IssueDate).format('DD/MM/YYYY')

            $("#txtPayableQuantity").val(pPayableList[0].Quantity);
            
            $("#txtPayableUnitPrice").val(parseInt(pPayableList[0].CostPrice.toFixed(2)) == 0 ? "" : pPayableList[0].CostPrice.toFixed(2) );
            $("#txtPayableAmountWithoutVAT").val(parseInt(pPayableList[0].AmountWithoutVAT) == 0 ? "" : pPayableList[0].AmountWithoutVAT );
            $("#txtPayableTaxPercentage").val(pPayableList[0].TaxPercentage);
            $("#txtPayableTaxAmount").val(pPayableList[0].TaxAmount);
            $("#txtPayableDiscountPercentage").val(pPayableList[0].DiscountPercentage);
            $("#txtPayableDiscountAmount").val(pPayableList[0].DiscountAmount);
            $("#txtPayableAmount").val(parseInt(pPayableList[0].CostAmount.toFixed(2)) == 0 ? "" : pPayableList[0].CostAmount.toFixed(2));
            $("#txtPayableInitialSalePrice").val(pPayableList[0].InitialSalePrice.toFixed(2));
            $("#txtPayableExchangeRate").val(pPayableList[0].ExchangeRate.toFixed(2));
            $("#txtPayableSupplierInvoiceNo").val(pPayableList[0].SupplierInvoiceNo);
            $("#txtPayableSupplierReceiptNo").val(pPayableList[0].SupplierReceiptNo);
            $("#txtPayableEntryDate").val(pEntryDate);
            $("#txtPayableIssueDate").val(pIssueDate);
            $("#slPayableBill").val(pPayableList[0].BillID == 0 ? "" : pPayableList[0].BillID);

        });

    $("#txtPayableNotes").val($(tr).find("td.PayableNotes").text());
  


    $("#slPayableUOM").attr("onchange", "Payables_UOMChanged();");
    $("#btnSavePayable").attr("onclick", "Payables_Update(false);");
}

//function GetHouseContainers(pID) {
//    debugger;
//    pID = pID == undefined || pID == null ? "" : pID
//    if (pOperationHeader_Global.ShipmentType != constTankShipmentType) {
//        var ContainerID = $("#slPayableTank" + (pID == "" ? "" : "No" + pID)).val();
//        var HouseID = $("#slPayableBill" + pID).val();
//        CallGETFunctionWithParameters("/api/Payables/GetHouseContainers", {
//            pHouseID: HouseID == null || HouseID == undefined || HouseID == "" ? 0 : HouseID
//            , pOperationID: pOperationHeader_Global.ID
//        }, function (pData) {
//            FillListFromObject(ContainerID, 11, "<--Select Container-->", "slPayableTank" + (pID == "" ? "" : "No" + pID), pData[0], null);
//        }
//        );
//    }
//}
function Payables_ClearAllControls(callback) {
    $('#btnSavePayable').prop('disabled', false);
    $('#btnSavePayable').removeClass('hide');
    ClearAll("#EditPayableModal");
    if (callback != null && callback != undefined)
        callback();
}



function PayableSuppliers_GetList(pID, pSlName, pCallback) {
    debugger;
    var pOperationID = $(".PayableOperation").attr('val');
    //var pOperationID = $(tr).find("td.PayableOperation");
    var pWhereClause = " WHERE OperationID = " + pOperationID;
    if (pDefaults.UnEditableCompanyName == "LATT") {
        pWhereClause += " AND PartnerTypeID <> 1 ";
    }
    pWhereClause += " AND PartnerID IS NOT NULL ";
    //pWhereClause += " AND PartnerTypeID != " + constCustomerPartnerTypeID;
    pWhereClause += " ORDER BY PartnerTypeName ";
    //parameters: ID, strFnName, First Row in select list, select list name, whereClause, callback
    //GetListWithCodeAndNameAndWhereClause(pID, "/api/OperationPartners/LoadAll", "Select Supplier", pSlName, pWhereClause);
    GetListOperationPartnersWithPartnerTypeIDAndPartnerIDAttrAndWhereClause(pID, "/api/OperationPartners/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause, pCallback);
}


function ApplySelectListSearch() {
    debugger;
    //if (pDefaults.UnEditableCompanyName == "GBL") {
    $("#slFilterShipper").css({ "width": "100%" }).select2();
    $("#slFilterShipper").trigger("change");

    $("#slFilterConsignee").css({ "width": "100%" }).select2();
    $("#slFilterConsignee").trigger("change");

    $("#slFilterAgent").css({ "width": "100%" }).select2();
    $("#slFilterAgent").trigger("change");

    $("#slShippers").css({ "width": "100%" }).select2();
    $("#slShippers").trigger("change");

    $("#slConsignees").css({ "width": "100%" }).select2();
    $("#slConsignees").trigger("change");

    $("#slAgents").css({ "width": "100%" }).select2();
    $("#slAgents").trigger("change");

    $("#slOperationVesselID").css({ "width": "100%" }).select2();
    $("#slOperationVesselID").trigger("change");

    $("#slOperationPartnerTypes").css({ "width": "100%" }).select2();
    $("#slOperationPartnerTypes").trigger("change");

    $("#slPartners").css({ "width": "100%" }).select2();
    $("#slPartners").trigger("change");
    $("#slPartners_Customers").css({ "width": "100%" }).select2();
    $("#slPartners_Customers").trigger("change");

    $("#slPOLCountries").css({ "width": "100%" }).select2();
    $("#slPOLCountries").trigger("change");
    $("#slPODCountries").css({ "width": "100%" }).select2();
    $("#slPODCountries").trigger("change");

    $("#slPOL").css({ "width": "100%" }).select2();
    $("#slPOL").trigger("change");
    $("#slPOD").css({ "width": "100%" }).select2();
    $("#slPOD").trigger("change");

    $("#slRoutingsPOLCountries").css({ "width": "100%" }).select2();
    $("#slRoutingsPOLCountries").trigger("change");
    $("#slRoutingsPODCountries").css({ "width": "100%" }).select2();
    $("#slRoutingsPODCountries").trigger("change");

    $("#slRoutingsPOL").css({ "width": "100%" }).select2();
    $("#slRoutingsPOL").trigger("change");
    $("#slRoutingsPOD").css({ "width": "100%" }).select2();
    $("#slRoutingsPOD").trigger("change");

    $("#slRoutingsLines").css({ "width": "100%" }).select2();
    $("#slRoutingsLines").trigger("change");

    $("#slQuotationRoutes").css({ "width": "100%" }).select2();
    $("#slQuotationRoutes").trigger("change");

    $("#slFilterPOLCountry").css({ "width": "100%" }).select2();
    $("#slFilterPOLCountry").trigger("change");
    $("#slFilterPODCountry").css({ "width": "100%" }).select2();
    $("#slFilterPODCountry").trigger("change");

    $("#slFilterPOL").css({ "width": "100%" }).select2();
    $("#slFilterPOL").trigger("change");
    $("#slFilterPOD").css({ "width": "100%" }).select2();
    $("#slFilterPOD").trigger("change");

    $("#slOperationToSetHBLCertificate").css({ "width": "100%" }).select2();
    $("#slOperationToSetHBLCertificate").trigger("change");

    $("#slPayableBill").css({ "width": "100%" }).select2();
    $("#slPayableBill").trigger("change");

    //$("#slFilterCCA").css({ "width": "100%" }).select2();
    //$("#slFilterCCA").trigger("change");

    //$("#slFilterBookingParty").css({ "width": "100%" }).select2();
    //$("#slFilterBookingParty").trigger("change");

    //}
    $("div[tabindex='-1']").removeAttr('tabindex');
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
    if (pSelectedPayablesIDsToUpdate != "") {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedPayablesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPayablesIDsToUpdate.split(",")[i];
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
    } else if (_IsZeroExchangeRate) {
        swal("Sorry", "Please, check exchange rate.");
        FadePageCover(false);
    } else {
        if (pSelectedPayablesIDsToUpdate != "")
            CallPOSTFunctionWithParameters("/api/Payables/UpdateList"
                , {
                    "pIsCalledFromOperations": false
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
                    , "pQuotationRouteID": $('#hQuotationRouteID').val()
                }
                , function (data) {
                    debugger;
                    OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                    if (data[1] != "")
                        swal(strSorry, data[1]);
                    else {
                        swal("Success", "Saved successfully.");
                        jQuery("#SelectChargesModal").modal("hide");
                    }
                }, null);
    }
}

function Payables_CurrencyChanged() {
    $("#txtPayableExchangeRate").val($("#slPayableCurrency option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slPayableCurrency").val())
        $("#txtPayableExchangeRate").attr("disabled", "disabled");
    else
        $("#txtPayableExchangeRate").removeAttr("disabled");
}



function CalculatePayablesAmount() {
    var decAmountWithoutVAT = 0;
    var decTaxAmount = 0;
    var decTaxPercentage = 0.0;
    var decDiscountAmount = 0;
    var decDiscountPercentage = 0.0;

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



function Payables_Update(pSaveandAddNew) {
    debugger;

    CallGETFunctionWithParameters("/api/Payables/LoadAll"
        , {
            pWhereClause: " WHERE ID=" + $("#hPayableID").val()
            , pOrderBy: "ID"
        }
        , function (pData) {
            debugger;
            var pPayableList = JSON.parse(pData[0]);
            var OperationID = pPayableList[0].OperationID;


          if (
           (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
            || (!isValidDate($("#txtPayableIssueDate").val().trim(), 1) && $("#txtPayableIssueDate").val().trim() != "")
           )
            swal(strSorry, strCheckDates);
    //else if (pDefaults.UnEditableCompanyName == "GBL" && $("#slSites").val() == '')
    //    swal("Sorry", "Please, select site.");
    else if ($("#txtPayableExchangeRate").val() == "" || parseFloat($("#txtPayableExchangeRate").val()) == 0
        || (parseInt($("#txtPayableExchangeRate").val()) == 1 && pDefaults.CurrencyID != ($("#slPayableCurrency").val())))
        swal("Sorry", "Please, check exchange rate.");
    else {

        debugger;

        InsertUpdateFunction("form", "/api/Payables/Update", {
            pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
            ,
            pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
            ,
            pID: $("#hPayableID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            ,
            pOperationID: OperationID
            ,
            pChargeTypeID: $("#slPayableChargeType").val() == "" ? 0 : $("#slPayableChargeType").val() //$("#txtPayableType").attr("ChargeTypeID")
            ,
            pMeasurementID: $('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val()
                : 0
            //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            ,
            pContainerTypeID: 0
            //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
            //    ? $('#slPayableUOM option:selected').val()
            //    : 0)
            ,
            pPOrC: ($('#slPayablePOrC option:selected').val() == "" ? 0 : $('#slPayablePOrC option:selected').val())
            ,
            pSupplierOperationPartnerID: ($('#slPayableSupplier option:selected').val() == "" ? 0 : $('#slPayableSupplier option:selected').val())
            ,
            pQuantity: ($("#txtPayableQuantity").val().trim() == "" ? 0 : $("#txtPayableQuantity").val().trim())
            ,
            pCostPrice: ($("#txtPayableUnitPrice").val().trim() == "" ? 0 : $("#txtPayableUnitPrice").val().trim())

            ,
            pAmountWithoutVAT: $("#txtPayableAmountWithoutVAT").val()
            ,
            pTaxTypeID: $("#slPayableTax").val() == "" ? 0 : $("#slPayableTax").val()
            ,
            pTaxPercentage: $("#txtPayableTaxPercentage").val() == "" ? 0 : $("#txtPayableTaxPercentage").val()
            ,
            pTaxAmount: $("#txtPayableTaxAmount").val() == "" ? 0 : $("#txtPayableTaxAmount").val()
            ,
            pDiscountTypeID: $("#slPayableDiscount").val() == "" ? 0 : $("#slPayableDiscount").val()
            ,
            pDiscountPercentage: $("#txtPayableDiscountPercentage").val() == "" ? 0 : $("#txtPayableDiscountPercentage").val()
            ,
            pDiscountAmount: $("#txtPayableDiscountAmount").val() == "" ? 0 : $("#txtPayableDiscountAmount").val()

            ,
            pCostAmount: ($("#txtPayableAmount").val().trim() == "" ? 0 : $("#txtPayableAmount").val().trim())
            ,
            pInitialSalePrice: ($("#txtPayableInitialSalePrice").val().trim() == "" ? 0 : $("#txtPayableInitialSalePrice").val().trim())
            ,
            pSupplierInvoiceNo: ($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? 0 : $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())
            ,
            pSupplierReceiptNo: ($("#txtPayableSupplierReceiptNo").val().trim() == "" ? 0 : $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())
            ,
            pEntryDate: ($("#txtPayableEntryDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableEntryDate").val().trim()))
            ,
            pBillID: ($('#slPayableBill option:selected').val() == "" ? 0 : $('#slPayableBill option:selected').val())

            ,
            pIssueDate: ($("#txtPayableIssueDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtPayableIssueDate").val().trim()))

            ,
            pExchangeRate: ($("#txtPayableExchangeRate").val().trim() == "" ? 0 : $("#txtPayableExchangeRate").val().trim())
            ,
            pCurrencyID: ($('#slPayableCurrency option:selected').val() == "" ? 0 : $('#slPayableCurrency option:selected').val())
            ,
            pNotes: $("#txtPayableNotes").val().toUpperCase().trim()
            //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
            ,
            pPartnerTypeID: $('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerTypeID")
            ,
            pPartnerID: $('#slPayableSupplier option:selected').attr("PartnerID") == "" ? 0 : $('#slPayableSupplier option:selected').attr("PartnerID")
            ,
            pPayableBillTo: ($('#slPayableBillTo option:selected').val() == "" ? 0 : $('#slPayableBillTo option:selected').val())
            ,
            pSupplierSiteID: ($('#slSites option:selected').val() == "" ? 0 : $('#slSites option:selected').val())
            ,
            pTruckingOrderID: 0
            , pQuotationRouteID: $('#hQuotationRouteID').val()
            , pCategoryID: $('#slPayableCategory').val() == "" || $('#slPayableCategory').val() == null ? 0 : parseInt($('#slPayableCategory').val())
            , pOperationVehicleID: ($('#slPayableOperationVehicle option:selected').val() == "" ? 0 : $('#slPayableOperationVehicle option:selected').val())
        }, pSaveandAddNew, "EditPayableModal"
            , function (data) {
                OperationPayableApproval_LoadingWithPaging()
                //OperationCharges_FillModal(); //Payables_LoadWithPagingWithWhereClause($("#hOperationID").val());
                if (data[1] != "") //supplier invoice number uniqueness violated
                    swal(strSorry, data[1]);
            });
    }
        });

}



/*__________________________________________*/













function OperationPayableApproval_LoadingWithPaging() {
    debugger;
    var pWhereClause = OperationPayableApproval_GetWhereClause();
    var pOrderBy = " OperationID DESC ";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { OperationPayableApproval_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPayables>tbody>tr", $("#txt-Search").val().trim());

    if (pDefaults.UnEditableCompanyName == 'ILS' || pDefaults.UnEditableCompanyName == 'ILSEG') {
        $('#cb-UnderProcess').parent().addClass('hide')
    }
    //if ($('#txtOperation').val() != '') {
    //    debugger;
    //    var pParametersWithValues = {
    //        pOperationCode: $('#txtOperation').val()
    //    };

    //    CallGETFunctionWithParameters("/api/Payables/GetInvoiceDateByOperation", pParametersWithValues
    //        , function (pData) {
    //            var pInvoiceDate = JSON.parse(pData[0]);
    //            if (pInvoiceDate.length > 0)
    //                $('#txtJVDate').val(GetDateFromServer(pInvoiceDate[0].InvoiceDate));
    //            FadePageCover(false);
    //        });
    //}
   

}
//called by LoadDataWithPaging
function OperationPayableApproval_GetWhereClause() {
    debugger;
    $('#lblTotalCost').html(' ');

    var pWhereClause = "WHERE IsDeleted=0 AND AccNoteID IS NULL ";
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
        pWhereClause += " OR Notes like N'%" + $("#txt-Search").val().trim() + "%' ";
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
    //if ($("#slOperation").val() != "") {
    //    pWhereClause += " AND OperationID=" + $("#slOperation").val() + " ";
    //}
    if ($("#txtOperation").val() != "") {
        //pWhereClause += " AND (SUBSTRING(OperationCode,12,5) = N'" + $("#txtOperation").val().trim().toUpperCase() + "') \n";
        pWhereClause += " AND CodeSerial = " + $("#txtOperation").val().trim().toUpperCase() ;
    }
    //if ($("#cbHideApprovedOperationPayable").prop("checked"))
    //    pWhereClause += " AND IsApproved=0 ";
    if ($("#slApprovalStatus").val() != "") {
        pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    }
    if ($("#slPaidStatus").val() != "") {
        pWhereClause += " AND PayableStatus='" + $("#slPaidStatus").val()+"'";
    }
    if ($("#slPaidStatus").val() != "") {

        if ($("#slPaidStatus").val() == 1)
            pWhereClause += " AND PayableStatus='Paid'";
        else if ($("#slPaidStatus").val() == 0)
            pWhereClause += " AND PayableStatus <> 'Paid'";

    }
    
    return pWhereClause;
}
function OperationPayableApproval_PartnerTypeChanged() {
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    OperationPayableApproval_LoadingWithPaging();
    //debugger;
    //$("#slPartner").html("<option value=''>All Partners</option>");//to quickly empty
    //var pPartnerTypeID = $("#slPartnerType").val() == "" ? 0 : $("#slPartnerType").val();
    //var pWhereClause = OperationPayableApproval_GetWhereClause();
    //var pOrderBy = " OperationID DESC "
    //var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text())
    //var pPageSize = $('#select-page-size').val();
    //var pControllerParameters = { pPartnerTypeID: pPartnerTypeID, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pPageNumber: pPageNumber, pPageSize: pPageSize }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payables/OperationPayableApproval_PartnerTypeChanged", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    //    , function (pData) {
    //        OperationPayableApproval_BindTableRows(JSON.parse(pData[0]));
    //        FillListFromObject(null, 5/*pCodeOrName*/, "All Partners", "slPartner", pData[2], null);
    //        FadePageCover(false);
    //    }
    //    , null);
}
function OperationPayableApproval_Approve(pIDs, pIsApprove) {
    debugger;
    var _Suceess = true;
    var pSafeID = $("#slSafes").val();
    var pBankID = $("#slBanks").val();
    var pIsOneJV = $("#cb-OneJV").prop("checked");
    var pIsSupplierPayment = $("#cb-SupplierPayment").prop("checked");
    var pIsPayment = $("#cb-Payment").prop("checked");
    var AccountID = "0";
    var SubAccountID = "0";


    if (pIsSupplierPayment && pIsPayment) {
        swal('Excuse me', 'choose payment or supplier-custdy', 'warning');
        _Suceess = false;
        return false;
    }

    var SubAccountCount = $("#slSubAccount").find('option').length;
    AccountID = $("#slAccount").val();
    if (SubAccountCount > 1)
        SubAccountID = $("#slSubAccount").val();

    if (pIsSupplierPayment || (pIsPayment && pSafeID == 0 && pBankID == 0)) {

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


    if (pIsPayment) {
        if (pSafeID != 0 && pBankID != 0) {
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
    else if (["EGL", "MKH", "TRM"].includes(pDefaults.UnEditableCompanyName) && pIsApprove == true && ($("#slCostCenter").val() == "0" || $("#slCostCenter").val() == "") && pIsOneJV ==true) {
        // only in EGL must choose a cost center
        swal("Sorry", "Please, select Select CostCenter.");
        _Suceess = false;
        return false;
    }
    var ValidatePostSafeOrBank = false;
    var ValidatePostPartner = false;
    var ValidateNoSupplierInvoiceNo = false;
    var ValidateCostCenterMulti = false;


    var PostSafeOrBank = false;
    if (pSafeID != 0 || pBankID != 0 || $("#slAccount").val() != 0)
        PostSafeOrBank = true;

    //ADD BY AHMED MAHER
    var pCostCenterList = "";
    var NumberOfDetailsRows = pIDs.split(',').length;
    for (var i = 0; i < NumberOfDetailsRows; i++) {
        var currentRowID = pIDs.split(",")[i];
        var tr = $("#tblPayables tr[ID='" + currentRowID + "']");
        pCostCenterList += ((pCostCenterList == "") ? "" : ",") + $("#slCostCenters" + currentRowID).val();
    }

    
    $('#tblPayables  > tbody > tr').each(function () {

        if ($(this).find('input[name="Delete"]').is(':checked')) {
            if ($(this).find('td.PayableSupplier').attr('val') == 0 && !PostSafeOrBank) {
                ValidatePostSafeOrBank = true;
                return false; //
            }

            if ($(this).find('td.PayableSupplier').attr('val') != 0 && PostSafeOrBank && !pIsPayment && !pIsSupplierPayment) {
                ValidatePostPartner = true;
                return false; //
            }

            if (($(this).find('td.PayableSupplierInvoiceNo').html() == 0 || $(this).find('td.PayableSupplierInvoiceNo').html() == "N/A" || $(this).find('td.PayableSupplierInvoiceNo').html() == "")
                && $(this).find('td.PayableSupplierOperationPartnerTypeID').text() != '20'
                && pDefaults.UnEditableCompanyName == 'ELI') {
                ValidateNoSupplierInvoiceNo = true;
                return false; //
            }

            //add by ahmed mhaer
            if (pIsOneJV == false) {
                var IDD = 0;
                IDD = $(tr).attr('ID');
                
                if ($("#slCostCenters" + IDD).val() == 0 || $("#slCostCenters" + IDD).val() == "0" || $("#slCostCenters" + IDD).val() == "" || $("#slCostCenters" + IDD).val() == undefined) {
                    ValidateCostCenterMulti = true;
                    return false; //
                }

            }

            
        }
    });
    let SupplierName = new Set();
    let SupplierInvNo = new Set();
    let CurrencyID = new Set();

    if (pDefaults.UnEditableCompanyName == "LATT") {
        $('#tblPayables  > tbody > tr').each(function () {

            if ($(this).find('input[name="Delete"]').is(':checked')) {

                if ($(this).find('td.PayableSupplierInvoiceNo').text().trim() == '')
                    return;
                SupplierName.add($(this).find('td.PayableSupplier').attr('val'));
                SupplierInvNo.add($(this).find('td.PayableSupplierInvoiceNo').text().trim());
                CurrencyID.add($(this).find('td.PayableCurrency').text().trim());



            }
        });
    }
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
    else if (["EGL", "MKH", "TRM"].includes(pDefaults.UnEditableCompanyName) && !pIsOneJV && ValidateCostCenterMulti && pIsApprove == true)
        swal("Sorry", "Please, select CostCenter.");
    else if (pIDs == "")
        swal("Sorry", "Please, select at least one row.");
    else if (SupplierInvNo.size != 1 && pDefaults.UnEditableCompanyName == "LATT")
        swal("Sorry", "Please, select the same Invoice No");
    else if (SupplierName.size != 1 && pDefaults.UnEditableCompanyName == "LATT")
        swal("Sorry", "Please, select the same supplier");
    else if (CurrencyID.size != 1 && pDefaults.UnEditableCompanyName == "LATT")
        swal("Sorry", "Please, select the same Currency");
    //else if (pIDs == "" || pIDs.split(",").length > 1)
    //    swal("Sorry", "Please, select just one row.");
    else if (_Suceess) {
        if (pIsApprove == true  ) {
            if ($("#hIsCreditlimitexceptionperiod").val() == "true") {
                 if (["MKH"].includes(pDefaults.UnEditableCompanyName)
                    && pIsApprove == true && ($("#slCostCenter").val() == "0" || $("#slCostCenter").val() == "")) {
                    swal("Sorry", "Please, select Select CostCenter.");
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
                                , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                                , pWhereClause: OperationPayableApproval_GetWhereClause()
                                , pIDsCostCenter: pCostCenterList

                                , pPageSize: $("#select-page-size").val()
                                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                                , pOrderBy: " OperationID DESC "
                            };
                            CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                                , function (pData) {
                                    var pStrMessage = pData[2];
                                    if (pData[0]) {

                                        OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
                                        jQuery("#SelectCustodyModal").modal("hide");
                                        //OperationPayableApproval_LoadingWithPaging();
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
                if (1==2) {
                    var pStrMessage1 = pData[0];
                    if (pDefaults.UnEditableCompanyName != "LATT" && pDefaults.UnEditableCompanyName != "LIN")
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
                                , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                                , pWhereClause: OperationPayableApproval_GetWhereClause()
                                , pIDsCostCenter: pCostCenterList

                                , pPageSize: $("#select-page-size").val()
                                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                                , pOrderBy: " OperationID DESC "
                            };
                            CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                                , function (pData) {
                                    var pStrMessage = pData[2];
                                    if (pData[0]) {
                                        if (pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {
                                            CallPOSTFunctionWithParameters("api/DynamicsGP/InsertVendorInvoice", pIDs, function (pData) {
                                                if (pData.IsSuccess) {
                                                    OperationPayableApproval_LoadingWithPaging();
                                                    swal("Success", "Integrated Successfully");
                                                } else {
                                                    let pParametersWithValues2 = {
                                                        pIDsToSetApproval: pIDs
                                                        , pIsApprove: false
                                                        , pCustodyID: 0
                                                        , pCostCenterID: $("#slCostCenter").val()
                                                        , pSafeID: pSafeID
                                                        , pBankID: pBankID
                                                        , pIsOneJV: pIsOneJV
                                                        , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                                                        , pPaymentAccountID: AccountID
                                                        , pPaymentSubAccountID: SubAccountID
                                                        , pIsPayment: pIsPayment
                                                        , pIsPaymentSupplierCustdy: pIsSupplierPayment
                                                        , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                                                        , pWhereClause: OperationPayableApproval_GetWhereClause()
                                                        , pIDsCostCenter: pCostCenterList

                                                        , pPageSize: $("#select-page-size").val()
                                                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                                                        , pOrderBy: " OperationID DESC "
                                                    };
                                                    CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues2
                                                        , function (pData) {
                                                            OperationPayableApproval_LoadingWithPaging();
                                                        }, null);


                                                    if (pData.Message != "")
                                                        swal("Sorry", pData.Message);
                                                }
                                            });
                                        }
                                        if (pDefaults.UnEditableCompanyName != "LATT")
                                            OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
                                        jQuery("#SelectCustodyModal").modal("hide");
                                        //OperationPayableApproval_LoadingWithPaging();
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
                                , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                                , pWhereClause: OperationPayableApproval_GetWhereClause()
                                , pIDsCostCenter: pCostCenterList

                                , pPageSize: $("#select-page-size").val()
                                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                                , pOrderBy: " OperationID DESC "
                            };
                            CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                                , function (pData) {
                                    var pStrMessage = pData[2];
                                    if (pData[0]) {
                                        if (pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {
                                            CallPOSTFunctionWithParameters("api/DynamicsGP/InsertVendorInvoice", pIDs, function (pData) {
                                                if (pData.IsSuccess) {
                                                    OperationPayableApproval_LoadingWithPaging();
                                                    swal("Success", "Integrated Successfully");
                                                } else {
                                                    let pParametersWithValues2 = {
                                                        pIDsToSetApproval: pIDs
                                                        , pIsApprove: false
                                                        , pCustodyID: 0
                                                        , pCostCenterID: $("#slCostCenter").val()
                                                        , pSafeID: pSafeID
                                                        , pBankID: pBankID
                                                        , pIsOneJV: pIsOneJV
                                                        , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
                                                        , pPaymentAccountID: AccountID
                                                        , pPaymentSubAccountID: SubAccountID
                                                        , pIsPayment: pIsPayment
                                                        , pIsPaymentSupplierCustdy: pIsSupplierPayment
                                                        , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                                                        , pWhereClause: OperationPayableApproval_GetWhereClause()
                                                        , pIDsCostCenter: pCostCenterList

                                                        , pPageSize: $("#select-page-size").val()
                                                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                                                        , pOrderBy: " OperationID DESC "
                                                    };
                                                    CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues2
                                                        , function (pData) {
                                                            OperationPayableApproval_LoadingWithPaging();
                                                        }, null);
                                                    if (pData.Message != "")
                                                        swal("Sorry", pData.Message);
                                                }
                                            });
                                        }
                                        if (pDefaults.UnEditableCompanyName != "LATT")
                                            OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
                                        jQuery("#SelectCustodyModal").modal("hide");
                                        //OperationPayableApproval_LoadingWithPaging();
                                    }
                                    else
                                        //swal("Sorry", "An error occured, please refresh and then try again.");
                                        alert(pStrMessage); //swal("Sorry", pStrMessage);
                                    FadePageCover(false);
                                });
                        });
                }

            }



        }
       //else if (pIsApprove == true) {
       //     CallGETFunctionWithParameters("/api/Payables/getFinalCreditLimitBalance", { pPayableIDs: pIDs }
       //         , function (pData) {
       //             debugger;
       //             if ($("#hIsCreditlimitexceptionperiod").val() == "true") {
       //                 if (pData[0]) {
       //                     //var pStrMessage1 = pData[0];
       //                     //alert(pStrMessage1);
       //                     swal("Sorry", pData[0]);
       //                 }
       //                 else if (["MKH"].includes(pDefaults.UnEditableCompanyName)
       //                        && pIsApprove == true && ($("#slCostCenter").val() == "0" || $("#slCostCenter").val() == "")) {
       //                     swal("Sorry", "Please, select Select CostCenter.");
       //                 }
       //                 else {
       //                     swal({
       //                         title: "Are you sure?",
       //                         //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
       //                         text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
       //                         type: "",
       //                         showCancelButton: true,
       //                         confirmButtonColor: "#DD6B55",
       //                         confirmButtonText: "Yes, Apply",
       //                         closeOnConfirm: true
       //                     },
       //                         //callback function in case of confirm delete
       //                         function () {
       //                             FadePageCover(true);
       //                             var pParametersWithValues = {
       //                                 pIDsToSetApproval: pIDs
       //                                 , pIsApprove: pIsApprove
       //                                 , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
       //                                 , pCostCenterID: $("#slCostCenter").val()
       //                                 , pSafeID: pSafeID
       //                                 , pBankID: pBankID
       //                                 , pIsOneJV: pIsOneJV
       //                                 , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
       //                                 , pPaymentAccountID: AccountID
       //                                 , pPaymentSubAccountID: SubAccountID
       //                                 , pIsPayment: pIsPayment
       //                                 , pIsPaymentSupplierCustdy: pIsSupplierPayment
       //                                 , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
       //                                 , pWhereClause: OperationPayableApproval_GetWhereClause()
       //                                 , pIDsCostCenter: pCostCenterList

       //                                 , pPageSize: $("#select-page-size").val()
       //                                 , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
       //                                 , pOrderBy: " OperationID DESC "
       //                             };
       //                             CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
       //                                 , function (pData) {
       //                                     var pStrMessage = pData[2];
       //                                     if (pData[0]) {

       //                                         OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
       //                                         jQuery("#SelectCustodyModal").modal("hide");
       //                                         //OperationPayableApproval_LoadingWithPaging();
       //                                     }
       //                                     else
       //                                         //swal("Sorry", "An error occured, please refresh and then try again.");
       //                                         alert(pStrMessage); //swal("Sorry", pStrMessage);
       //                                     FadePageCover(false);
       //                                 });
       //                         });
       //                 }
       //             }
       //             else {
       //                 if (pData[0]) {
       //                     var pStrMessage1 = pData[0];
       //                     if (pDefaults.UnEditableCompanyName != "LATT" && pDefaults.UnEditableCompanyName != "LIN")
       //                         alert(pStrMessage1);
       //                     // swal("Sorry Customers Bellow Have Credit Limit", pData[0]);

       //                     swal({
       //                         title: "Are you sure?",
       //                         //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
       //                         text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
       //                         type: "",
       //                         showCancelButton: true,
       //                         confirmButtonColor: "#DD6B55",
       //                         confirmButtonText: "Yes, Apply",
       //                         closeOnConfirm: true
       //                     },
       //                         //callback function in case of confirm delete
       //                         function () {
       //                             FadePageCover(true);
       //                             var pParametersWithValues = {
       //                                 pIDsToSetApproval: pIDs
       //                                 , pIsApprove: pIsApprove
       //                                 , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
       //                                 , pCostCenterID: $("#slCostCenter").val()
       //                                 , pSafeID: pSafeID
       //                                 , pBankID: pBankID
       //                                 , pIsOneJV: pIsOneJV
       //                                 , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
       //                                 , pPaymentAccountID: AccountID
       //                                 , pPaymentSubAccountID: SubAccountID
       //                                 , pIsPayment: pIsPayment
       //                                 , pIsPaymentSupplierCustdy: pIsSupplierPayment
       //                                 , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
       //                                 , pWhereClause: OperationPayableApproval_GetWhereClause()
       //                                 , pIDsCostCenter: pCostCenterList

       //                                 , pPageSize: $("#select-page-size").val()
       //                                 , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
       //                                 , pOrderBy: " OperationID DESC "
       //                             };
       //                             CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
       //                                 , function (pData) {
       //                                     var pStrMessage = pData[2];
       //                                     if (pData[0]) {
       //                                         if (pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {
       //                                             CallPOSTFunctionWithParameters("api/DynamicsGP/InsertVendorInvoice", pIDs, function (pData) {
       //                                                 if (pData.IsSuccess) {
       //                                                     OperationPayableApproval_LoadingWithPaging();
       //                                                     swal("Success", "Integrated Successfully");
       //                                                 } else {
       //                                                     let pParametersWithValues2 = {
       //                                                         pIDsToSetApproval: pIDs
       //                                                         , pIsApprove: false
       //                                                         , pCustodyID: 0
       //                                                         , pCostCenterID: $("#slCostCenter").val()
       //                                                         , pSafeID: pSafeID
       //                                                         , pBankID: pBankID
       //                                                         , pIsOneJV: pIsOneJV
       //                                                         , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
       //                                                         , pPaymentAccountID: AccountID
       //                                                         , pPaymentSubAccountID: SubAccountID
       //                                                         , pIsPayment: pIsPayment
       //                                                         , pIsPaymentSupplierCustdy: pIsSupplierPayment
       //                                                         , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
       //                                                         , pWhereClause: OperationPayableApproval_GetWhereClause()
       //                                                         , pIDsCostCenter: pCostCenterList

       //                                                         , pPageSize: $("#select-page-size").val()
       //                                                         , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
       //                                                         , pOrderBy: " OperationID DESC "
       //                                                     };
       //                                                     CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues2
       //                                                         , function (pData) {
       //                                                             OperationPayableApproval_LoadingWithPaging();
       //                                                         }, null);


       //                                                     if (pData.Message != "")
       //                                                         swal("Sorry", pData.Message);
       //                                                 }
       //                                             });
       //                                         }
       //                                         if (pDefaults.UnEditableCompanyName != "LATT")
       //                                             OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
       //                                         jQuery("#SelectCustodyModal").modal("hide");
       //                                         //OperationPayableApproval_LoadingWithPaging();
       //                                     }
       //                                     else
       //                                         //swal("Sorry", "An error occured, please refresh and then try again.");
       //                                         alert(pStrMessage); //swal("Sorry", pStrMessage);
       //                                     FadePageCover(false);
       //                                 });
       //                         });
       //                 }
       //                 else {
       //                     swal({
       //                         title: "Are you sure?",
       //                         //text: "The approval status for the selected row(s) will be changed and take effect into the partner balance. \n N.B. Also, please be informed that if the Partner is a custody in a payable then selecting a custody will have no effect on that payable.",
       //                         text: "The approval status for the selected row(s) will be changed and take effect into the partner balance.",
       //                         type: "",
       //                         showCancelButton: true,
       //                         confirmButtonColor: "#DD6B55",
       //                         confirmButtonText: "Yes, Apply",
       //                         closeOnConfirm: true
       //                     },
       //                         //callback function in case of confirm delete
       //                         function () {
       //                             FadePageCover(true);
       //                             var pParametersWithValues = {
       //                                 pIDsToSetApproval: pIDs
       //                                 , pIsApprove: pIsApprove
       //                                 , pCustodyID: $("#slSelectCustody").val() == "" || !pIsApprove ? 0 : $("#slSelectCustody").val()
       //                                 , pCostCenterID: $("#slCostCenter").val()
       //                                 , pSafeID: pSafeID
       //                                 , pBankID: pBankID
       //                                 , pIsOneJV: pIsOneJV
       //                                 , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
       //                                 , pPaymentAccountID: AccountID
       //                                 , pPaymentSubAccountID: SubAccountID
       //                                 , pIsPayment: pIsPayment
       //                                 , pIsPaymentSupplierCustdy: pIsSupplierPayment
       //                                 , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
       //                                 , pWhereClause: OperationPayableApproval_GetWhereClause()
       //                                 , pIDsCostCenter: pCostCenterList

       //                                 , pPageSize: $("#select-page-size").val()
       //                                 , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
       //                                 , pOrderBy: " OperationID DESC "
       //                             };
       //                             CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
       //                                 , function (pData) {
       //                                     var pStrMessage = pData[2];
       //                                     if (pData[0]) {
       //                                         if (pDefaults.UnEditableCompanyName == "LATT" && pIsApprove) {
       //                                             CallPOSTFunctionWithParameters("api/DynamicsGP/InsertVendorInvoice", pIDs, function (pData) {
       //                                                 if (pData.IsSuccess) {
       //                                                     OperationPayableApproval_LoadingWithPaging();
       //                                                     swal("Success", "Integrated Successfully");
       //                                                 } else {
       //                                                     let pParametersWithValues2 = {
       //                                                         pIDsToSetApproval: pIDs
       //                                                         , pIsApprove: false
       //                                                         , pCustodyID: 0
       //                                                         , pCostCenterID: $("#slCostCenter").val()
       //                                                         , pSafeID: pSafeID
       //                                                         , pBankID: pBankID
       //                                                         , pIsOneJV: pIsOneJV
       //                                                         , pJVDate: $("#txtJVDate").val().trim() == '' ? '1900-1-1' : ConvertDateFormat($("#txtJVDate").val().trim())
       //                                                         , pPaymentAccountID: AccountID
       //                                                         , pPaymentSubAccountID: SubAccountID
       //                                                         , pIsPayment: pIsPayment
       //                                                         , pIsPaymentSupplierCustdy: pIsSupplierPayment
       //                                                         , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
       //                                                         , pWhereClause: OperationPayableApproval_GetWhereClause()
       //                                                         , pIDsCostCenter: pCostCenterList

       //                                                         , pPageSize: $("#select-page-size").val()
       //                                                         , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
       //                                                         , pOrderBy: " OperationID DESC "
       //                                                     };
       //                                                     CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues2
       //                                                         , function (pData) {
       //                                                             OperationPayableApproval_LoadingWithPaging();
       //                                                         }, null);
       //                                                     if (pData.Message != "")
       //                                                         swal("Sorry", pData.Message);
       //                                                 }
       //                                             });
       //                                         }
       //                                         if (pDefaults.UnEditableCompanyName != "LATT")
       //                                             OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
       //                                         jQuery("#SelectCustodyModal").modal("hide");
       //                                         //OperationPayableApproval_LoadingWithPaging();
       //                                     }
       //                                     else
       //                                         //swal("Sorry", "An error occured, please refresh and then try again.");
       //                                         alert(pStrMessage); //swal("Sorry", pStrMessage);
       //                                     FadePageCover(false);
       //                                 });
       //                         });
       //                 }

       //             }

       //         }, null);
       // }


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
                        , pIsUnderProcess: $('#cb-UnderProcess').prop('checked')
                        , pWhereClause: OperationPayableApproval_GetWhereClause()
                        , pIDsCostCenter: pCostCenterList

                        , pPageSize: $("#select-page-size").val()
                        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                        , pOrderBy: " OperationID DESC "
                    };
                    CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
                        , function (pData) {
                            var pStrMessage = pData[2];
                            if (pData[0]) {
                                OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
                                jQuery("#SelectCustodyModal").modal("hide");
                                //OperationPayableApproval_LoadingWithPaging();
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
        //        , pWhereClause: OperationPayableApproval_GetWhereClause()
        //        , pPageSize: $("#select-page-size").val()
        //        , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
        //        , pOrderBy: " OperationID DESC "
        //    };
        //    CallGETFunctionWithParameters("/api/Payables/ApproveOrUnApprove", pParametersWithValues
        //        , function (pData) {
        //            var pStrMessage = pData[2];
        //            if (pData[0]) {
        //                OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
        //                jQuery("#SelectCustodyModal").modal("hide");
        //                //OperationPayableApproval_LoadingWithPaging();
        //            }
        //            else
        //                //swal("Sorry", "An error occured, please refresh and then try again.");
        //                alert(pStrMessage); //swal("Sorry", pStrMessage);
        //            FadePageCover(false);
        //        });
        //});
    }
}
function DisableUnderProcess() {
    if ($('#cb-OneJV').prop('checked')) {
        $('#cb-UnderProcess').prop('checked', false);
        $('#cb-UnderProcess').prop('disabled', 'disabled');
    }
    else {
        $('#cb-UnderProcess').removeAttr('disabled', );
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
        for (var j = 0; j < result.length; j++) {
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
function CalcTotalAll() {
    debugger;
    if ($('#cb-CheckAll-Payables').prop("checked")) {
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

        for (var j = 0; j < result.length; j++) {
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
        $("#slSubAccount").html("<option value='0'>" + TranslateString("SubAccount") + "</option>");
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
//function OperationPayableApproval_SelectCustodyToBeSet(pPayableID) {
//    debugger;
//    jQuery("#SelectCustodyModal").modal("show");
//    $("#btnApplyApprovalAction").removeAttr("onclick");
//    $("#btnApplyApprovalAction").attr("onclick", "OperationPayableApproval_SetCustody('" + pPayableID + "')");
//}

//function OperationPayableApproval_SelectCustody(pIDs, pIsApprove) {
//    debugger;
//    if (pIsApprove) {
//        if (pIDs == "" || pIDs.split(',').length != 1) //for approve select 1 row at a time
//            swal("Sorry", "Please, select just one record for approve.");
//        else { //i am sure its approve and its just 1 row selected
//            var pSupplierOperationPartnerTypeID = $("#tblPayables tr[ID=" + pIDs + "]").find("td.PayableSupplierOperationPartnerTypeID").text();
//            if (pSupplierOperationPartnerTypeID == constCustodyOperationPartnerTypeID) //if yes then call OperationPayableApproval_Approve(pIDs, pIsApprove) directly else offer to set Custody
//                OperationPayableApproval_Approve(pIDs, pIsApprove);
//            else {
//                jQuery("#SelectCustodyModal").modal("show");
//                $("#btnApplyApprovalAction").removeAttr("onclick");
//                $("#btnApplyApprovalAction").attr("onclick", "OperationPayableApproval_Approve('" + pIDs + "'," + pIsApprove + ")");
//            }
//        } //EOF i am sure its approve and its just 1 row selected
//    }
//    else { //UnApprove
//        if (pIDs == "")
//            swal("Sorry", "Please, select at least one record to UnApprove.");
//        else
//            OperationPayableApproval_Approve(pIDs, pIsApprove);
//    }
//}

//function OperationPayableApproval_SetCustody(pPayableID) {
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
//                , pWhereClause: OperationPayableApproval_GetWhereClause()
//                , pPageSize: $("#select-page-size").val()
//                , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
//                , pOrderBy: " SupplierPartnerTypeID,PartnerSupplierID, OperationID DESC "
//        };
//        CallGETFunctionWithParameters("/api/Payables/SetCustody", pParametersWithValues
//            , function (pData) {
//                if (pData[0]) {
//                    OperationPayableApproval_BindTableRows(JSON.parse(pData[1]));
//                    jQuery("#SelectCustodyModal").modal("hide");
//                    //OperationPayableApproval_LoadingWithPaging();
//                }
//                else
//                    swal("Sorry", "An error occured, please refresh and then try again.");
//                FadePageCover(false);
//            });
//    }
//}


function CopyCostCenter() {
    if ($('#tblPayables > tbody > tr').length > 0) {
        $('.slCostCenters').val($('#slCostCenter').val());

    }

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