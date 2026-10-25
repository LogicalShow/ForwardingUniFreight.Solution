
// ChargeTypes Region ---------------------------------------------------------------
// Bind ChargeTypes Table Rows

$(document).ready(function () {
    $("#slExpenseAccount").css({ "width": "100%" }).select2();
    $("#slRevenueAccount").css({ "width": "100%" }).select2();
    $("#slRevenueSubAccount").css({ "width": "100%" }).select2();
    $("#slReturnAccount").css({ "width": "100%" }).select2();
    $("#slReturnSubAccount").css({ "width": "100%" }).select2();
    $("#slExpenseSubAccount").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');

    $('#slCurrency').html($("#hReadySlCurrencies").html());
});

function ChargeTypes_BindTableRows(pChargeTypes) {
    debugger;
    if (glbCallingControl == "ChargeTypes")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblChargeTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pChargeTypes, function (i, item) {
        AppendRowtoTable("tblChargeTypes",
        ("<tr ID='" + item.ID + "'  ondblclick='ChargeTypes_EditByDblClick(" + item.ID + ");'" + ">"
                    + "<td class='ID'> <input " + (item.Code.toUpperCase() == "FLEXI" || item.Code.toUpperCase() == "TMI" || item.Code.toUpperCase() == "TMO" || item.Code.toUpperCase() == "TAI" || item.Code.toUpperCase() == "TAO" ? " disabled=disabled " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='PreCode hide'>" + (item.PreCode == 0 ? "" : item.PreCode) + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='MeasurementID' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='TaxeTypeID' val='" + item.TaxeTypeID + "'>" + (item.TaxeTypeID == 0 ? "" : item.TaxeTypeCode) + "</td>"
                    + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + (item.InvoiceTypeID == 0 ? "" : item.InvoiceTypeName) + "</td>"
                    + "<td class='ViewOrder hide'>" + item.ViewOrder + "</td>"
                    + "<td class='Cost hide'>" + item.Cost + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='FreightGroupID hide'>" + item.FreightGroupID + "</td>"
                    + "<td class='IsUsedInReceivable hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsUsedInReceivable == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsUsedInPayable hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsUsedInPayable == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDisbersment hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDisbersment == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsTank hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsTank == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOcean hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDefaultInQuotation hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDefaultInQuotation == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDefaultInOperations hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDefaultInOperations == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOperationChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOperationChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOfficial hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOfficial == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsGeneralChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsGeneralChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsWarehouseChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsWarehouseChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAddedManually hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddedManually == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='CostTaxID hide' val='" + item.CostTaxID + "'>" + item.CostTaxID + "</td>"
                    + "<td class='ItemCategoryID hide'>" + item.ItemCategoryID + "</td>"

                    + "<td class='ReturnAccountID hide'>" + item.AccountID_Return + "</td>"
                    + "<td class='ReturnAccountName hide'>" + (item.AccountName_Return == 0 ? "" : item.AccountName_Return) + "</td>"
                    + "<td class='ReturnSubAccountID hide'>" + item.SubAccountID_Return + "</td>"
                    + "<td class='ReturnSubAccountName hide'>" + (item.SubAccountName_Return == 0 ? "" : item.SubAccountName_Return) + "</td>"
                    + "<td class='RevenueAccountID hide'>" + item.AccountID_Revenue + "</td>"
                    + "<td class='RevenueAccountName hide'>" + (item.AccountName_Revenue == 0 ? "" : item.AccountName_Revenue) + "</td>"
                    + "<td class='RevenueSubAccountID hide'>" + item.SubAccountID_Revenue + "</td>"
                    + "<td class='RevenueSubAccountName hide'>" + (item.SubAccountName_Revenue == 0 ? "" : item.SubAccountName_Revenue) + "</td>"
                    + "<td class='RevenueCostCenterID hide'>" + item.CostCenterID_Revenue + "</td>"
                    + "<td class='RevenueCostCenterName hide'>" + (item.CostCenterName_Revenue == 0 ? "" : item.CostCenterName_Revenue) + "</td>"
                    + "<td class='ExpenseAccountID hide'>" + item.AccountID_Expense + "</td>"
                    + "<td class='ExpenseAccountName hide'>" + (item.AccountName_Expense == 0 ? "" : item.AccountName_Expense) + "</td>"
                    + "<td class='ExpenseSubAccountID hide'>" + item.SubAccountID_Expense + "</td>"
                    + "<td class='ExpenseSubAccountName hide'>" + (item.SubAccountName_Expense == 0 ? "" : item.SubAccountName_Expense) + "</td>"
                    + "<td class='ExpenseCostCenterID hide'>" + item.CostCenterID_Expense + "</td>"
                    + "<td class='ExpenseCostCenterName hide'>" + (item.CostCenterName_Expense == 0 ? "" : item.CostCenterName_Expense) + "</td>"
                    + "<td class='TemplateID hide'>" + item.TemplateID + "</td>"
                    + "<td class='ChargeTypeGroupID hide'>" + item.ChargeTypeGroupID + "</td>"
                    + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                    + "<td class='CurrencyID hide'>" + item.ChargeTypeCurrency_ID + "</td>"

                    + "<td class='IsDirectOperation hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDirectOperation == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsMasterOperation hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsMasterOperation == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='crmCode hide' val='" + item.crmCode + "'>" + item.crmCode + "</td>"
                    + "<td class='hide'><a href='#ChargeTypeModal' data-toggle='modal' onclick='ChargeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

    });
    debugger;
    ApplyPermissions();
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#btn-Delete").addClass("hide");
        $("#slChargeTypeGroup").attr("data-required", "true");
    }
    BindAllCheckboxonTable("tblChargeTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblChargeTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#txtName").prev().text("Description");
        $("#txtLocalName").prev().text("Short Description");
        $("#slChargeTypeGroup").prev().text("Class");
        $("#txtPreCode").prev().text("Govt. Code");
    }
    if ($("#slChargeTypeItemCategory option").length < 2) {
        CallGETFunctionWithParameters("/api/ChargeTypes/LoadItemCategories", { pDummy: true }, function (pData) {
            FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slChargeTypeItemCategory", pData[0], null);
        }, null);
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ChargeTypes_EditByDblClick(pID) {
    jQuery("#ChargeTypeModal").modal("show");
    ChargeTypes_FillControls(pID);

    if (pDefaults.UnEditableCompanyName == "COS")
      ChargeTypesTarrif__LoadData();
}
// Loading with data
function ChargeTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ChargeTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ChargeTypes_BindTableRows(pTabelRows); ChargeTypes_ClearAllControls(); });
    HighlightText("#tblChargeTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
}
// calling web function to add new ChargeType item.
function exportTableToJSONChargeDepartment() {
    debugger;
    const cbIsACCOUNTING = $('#cbIsACCOUNTING').prop('checked') ? 'true':'false';
    const cbIsINFORMATIONTECHNOLOGY = $('#cbIsINFORMATIONTECHNOLOGY').prop('checked') ? 'true' : 'false';
    const cbIsMARKETING = $('#cbIsMARKETING').prop('checked') ? 'true' : 'false';
    const cbIsOPERATIONS = $('#cbIsOPERATIONS').prop('checked') ? 'true' : 'false';
    const cbIsSALES = $('#cbIsSALES').prop('checked') ? 'true' : 'false';
    const cbIsTRUCKING = $('#cbIsTRUCKING').prop('checked') ? 'true' : 'false';
    const cbIsCUSTOMCLEARNACE = $('#cbIsCUSTOMCLEARNACE').prop('checked') ? 'true' : 'false';
    const cbIsIMPORTDep = $('#cbIsIMPORTDep').prop('checked') ? 'true' : 'false';
    const cbIsEXPORTDep = $('#cbIsEXPORTDep').prop('checked') ? 'true' : 'false';
    const cbIsISOTANK = $('#cbIsISOTANK').prop('checked') ? 'true' : 'false';
    const cbIsACCOUNTINGR = $('#cbIsACCOUNTINGR').prop('checked') ? 'true' : 'false';
    const cbIsINFORMATIONTECHNOLOGYR = $('#cbIsINFORMATIONTECHNOLOGYR').prop('checked') ? 'true' : 'false';
    const cbIsMARKETINGR = $('#cbIsMARKETINGR').prop('checked') ? 'true' : 'false';
    const cbIsOPERATIONSR = $('#cbIsOPERATIONSR').prop('checked') ? 'true' : 'false';
    const cbIsSALESR = $('#cbIsSALESR').prop('checked') ? 'true' : 'false';
    const cbIsTRUCKINGR = $('#cbIsTRUCKINGR').prop('checked') ? 'true' : 'false';
    const cbIsCUSTOMCLEARNACER = $('#cbIsCUSTOMCLEARNACER').prop('checked') ? 'true' : 'false';
    const cbIsIMPORTDepR = $('#cbIsIMPORTDepR').prop('checked') ? 'true' : 'false';
    const cbIsEXPORTDepR = $('#cbIsEXPORTDepR').prop('checked') ? 'true' : 'false';
    const cbIsISOTANKR = $('#cbIsISOTANKR').prop('checked') ? 'true' : 'false';
    const data={
        cbIsACCOUNTING,
        cbIsINFORMATIONTECHNOLOGY,
        cbIsMARKETING,
        cbIsOPERATIONS,
        cbIsSALES,
        cbIsTRUCKING,
        cbIsCUSTOMCLEARNACE,
        cbIsIMPORTDep,
        cbIsEXPORTDep,
        cbIsISOTANK,
        cbIsACCOUNTINGR,
        cbIsINFORMATIONTECHNOLOGYR,
        cbIsMARKETINGR,
        cbIsOPERATIONSR,
        cbIsSALESR,
        cbIsTRUCKINGR,
        cbIsCUSTOMCLEARNACER,
        cbIsIMPORTDepR,
        cbIsEXPORTDepR,
        cbIsISOTANKR
        };
    debugger;
    const jsonData = JSON.stringify(data, null, 2);
    return jsonData;
}
function ChargeTypes_Insert(pSaveandAddNew) {
    debugger;
    let ChargeTypeAccountsDetails = GetChargeTypeAccounts();
    if (ChargeTypeAccountsDetails == "DUPLICATE") {
        swal("Sorry", "Can't Have Multiple Rows that have the same (Service,Direction,Category,StorageLocation)");
        return;
    }
    var ChargeDepartment  = exportTableToJSONChargeDepartment();
    let InsertDTO = {
        pMeasurementID: ($('#slMeasurements option:selected').val() == "" ? 0 : $('#slMeasurements option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pInvoiceTypeID: ($('#slInvoiceTypes option:selected').val() == "" ? 0 : $('#slInvoiceTypes option:selected').val())
        , pCode: $("#txtCode").val().trim()
        , pPreCode: ($("#txtPreCode").val().trim() == "" ? 0 : $("#txtPreCode").val().trim().toUpperCase())
        , pName: $("#txtName").val().trim(), pLocalName: ($("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim())
        , pViewOrder: ($("#txtViewOrder").val().trim() == "" ? 0 : $("#txtViewOrder").val().trim())
        , pCost: ($("#txtChargeTypeCost").val().trim() == "" ? 0 : $("#txtChargeTypeCost").val().trim())
        , pNotes: (pDefaults.UnEditableCompanyName == "ESG" ? ChargeDepartment : ($("#txtChargeTypeNotes").val() == null ? "" : $("#txtChargeTypeNotes").val().trim())), pIsUsedInReceivable: $("#cbIsUsedInReceivable").prop('checked'), pIsUsedInPayable: $("#cbIsUsedInPayable").prop('checked'), pIsTank: $("#cbIsTank").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsDefaultInQuotation: $("#cbIsDefaultInQuotation").prop('checked'), pIsDefaultInOperations: $("#cbIsDefaultInOperations").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsGeneralChargeType: $("#cbIsGeneralChargeType").prop('checked'), pIsWarehouseChargeType: $("#cbIsWarehouseChargeType").prop('checked'), pIsOperationChargeType: $("#cbIsOperationChargeType").prop('checked'), pIsOfficial: $("#cbIsOfficial").prop('checked')
        , pAccountID_Return: $("#slReturnAccount").val()
        , pSubAccountID_Return: $("#slReturnSubAccount").val()
        , pAccountID_Revenue: $("#slRevenueAccount").val()
        , pSubAccountID_Revenue: $("#slRevenueSubAccount").val()
        , pCostCenterID_Revenue: $("#slRevenueCostCenter").val()
        , pAccountID_Expense: $("#slExpenseAccount").val()
        , pSubAccountID_Expense: $("#slExpenseSubAccount").val()
        , pCostCenterID_Expense: $("#slExpenseCostCenter").val()
        , pTemplateID: $("#slTemplate").val() == "" ? 0 : $("#slTemplate").val()
        , pChargeTypeGroupID: $("#slChargeTypeGroup").val() == "" ? 0 : $("#slChargeTypeGroup").val()
        , pPurchaseItemID: $("#slPurchaseItem").val() == "" ? 0 : $("#slPurchaseItem").val()
        , pIsDirectOperation: $("#cbIsDirectOperation").prop('checked')
        , pIsMasterOperation: $("#cbIsMasterOperation").prop('checked')
        , ChargeTypeAccountsDetails: ChargeTypeAccountsDetails
        , pCurrencyID: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
        , pFreightGroupID: $("#slFreightGroup").val() == "" ? 0 : $("#slFreightGroup").val()
        , pCostTaxID: CheckValueIsValidInput("#slCostTaxeTypes") ? $("#slCostTaxeTypes").val() : 0
        , pItemCategoryID: CheckValueIsValidInput("#slChargeTypeItemCategory") ? $("#slChargeTypeItemCategory").val() : 0
        , pIsDisbersment: $("#cbIsDisbersment").prop('checked')
    }

    if (pDefaults.UnEditableCompanyName == "LATT") {
        InsertDTO.pCode = $("#txtCode").val().trim().toUpperCase();
    }
    PostInsertUpdateFunction("form", "/api/ChargeTypes/Insert", InsertDTO, pSaveandAddNew, "ChargeTypeModal", function (pData) {
        jQuery("#ChargeTypeModal").modal("hide");
        if (!pData[0]) {
            swal("Error", pData[1]);
        }
        if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
            if (pData[2]) {
                swal("Success", "GP Integrated Successfully");
            } else {
                if(pData[3] != "")
                    swal("Integration Error", pData[3]);
            }
        }
        ChargeTypes_LoadingWithPaging();
    });
}
//calling this function for update
function ChargeTypes_Update(pSaveandAddNew) {
    debugger;
    let ChargeTypeAccountsDetails = GetChargeTypeAccounts();
    if (ChargeTypeAccountsDetails == "DUPLICATE") {
        swal("Sorry", "Can't Have Multiple Rows that have the same (Service,Direction,Category,StorageLocation)");
        return;
    }
    var ChargeDepartment = exportTableToJSONChargeDepartment();
    let CID = $("#hID").val();
    let UpdateDTO = {
        pID: $("#hID").val()
        , pMeasurementID: ($('#slMeasurements option:selected').val() == "" ? 0 : $('#slMeasurements option:selected').val())
        , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
        , pCode: $("#txtCode").val().trim()
        , pPreCode: ($("#txtPreCode").val().trim() == "" ? 0 : $("#txtPreCode").val().trim().toUpperCase())
        , pInvoiceTypeID: ($('#slInvoiceTypes option:selected').val() == "" ? 0 : $('#slInvoiceTypes option:selected').val())
        , pName: $("#txtName").val().trim()
        , pLocalName: ($("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim())
        , pViewOrder: ($("#txtViewOrder").val().trim() == "" ? 0 : $("#txtViewOrder").val().trim())
        , pCost: ($("#txtChargeTypeCost").val().trim() == "" ? 0 : $("#txtChargeTypeCost").val().trim())
        , pNotes: (pDefaults.UnEditableCompanyName == "ESG" ? ChargeDepartment : ($("#txtChargeTypeNotes").val() == null ? "" : $("#txtChargeTypeNotes").val().trim()))
        , pIsUsedInReceivable: $("#cbIsUsedInReceivable").prop('checked')
        , pIsUsedInPayable: $("#cbIsUsedInPayable").prop('checked')
        , pIsTank: $("#cbIsTank").prop('checked')
        , pIsOcean: $("#cbIsOcean").prop('checked')
        , pIsAir: $("#cbIsAir").prop('checked')
        , pIsInland: $("#cbIsInland").prop('checked')
        , pIsDefaultInQuotation: $("#cbIsDefaultInQuotation").prop('checked')
        , pIsDefaultInOperations: $("#cbIsDefaultInOperations").prop('checked')
        , pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/
        , pIsGeneralChargeType: $("#cbIsGeneralChargeType").prop('checked')
        , pIsWarehouseChargeType: $("#cbIsWarehouseChargeType").prop('checked')
        , pIsOperationChargeType: $("#cbIsOperationChargeType").prop('checked')
        , pIsOfficial: $("#cbIsOfficial").prop('checked')
        , pAccountID_Return: $("#slReturnAccount").val()
        , pSubAccountID_Return: $("#slReturnSubAccount").val()
        , pAccountID_Revenue: $("#slRevenueAccount").val()
        , pSubAccountID_Revenue: $("#slRevenueSubAccount").val()
        , pCostCenterID_Revenue: $("#slRevenueCostCenter").val()
        , pAccountID_Expense: $("#slExpenseAccount").val()
        , pSubAccountID_Expense: $("#slExpenseSubAccount").val()
        , pCostCenterID_Expense: $("#slExpenseCostCenter").val()
        , pTemplateID: $("#slTemplate").val() == "" ? 0 : $("#slTemplate").val()
        , pChargeTypeGroupID: $("#slChargeTypeGroup").val() == "" ? 0 : $("#slChargeTypeGroup").val()
        , pPurchaseItemID: $("#slPurchaseItem").val() == "" ? 0 : $("#slPurchaseItem").val()
        , pIsDirectOperation: $("#cbIsDirectOperation").prop('checked')
        , pIsMasterOperation: $("#cbIsMasterOperation").prop('checked')
        , ChargeTypeAccountsDetails: ChargeTypeAccountsDetails
        , pCurrencyID: $("#slCurrency").val() == "" ? 0 : $("#slCurrency").val()
        , pFreightGroupID: $("#slFreightGroup").val() == "" ? 0 : $("#slFreightGroup").val()
        , pCostTaxID: CheckValueIsValidInput("#slCostTaxeTypes") ? $("#slCostTaxeTypes").val() : 0
        , pItemCategoryID: CheckValueIsValidInput("#slChargeTypeItemCategory") ? $("#slChargeTypeItemCategory").val() : 0
        , pIsDisbersment: $("#cbIsDisbersment").prop('checked')
    }
    if (pDefaults.UnEditableCompanyName == "LATT") {
        UpdateDTO.pCode = $("#txtCode").val().trim().toUpperCase();
    }
    PostInsertUpdateFunction("form", "/api/ChargeTypes/Update", UpdateDTO, pSaveandAddNew, "ChargeTypeModal", function () {
        if (pDefaults.UnEditableCompanyName == "LATT") {
            CallPOSTFunctionWithParameters("api/DynamicsGP/UpdateChargeType", CID, function (pData) {
                if (pData.IsSuccess) {
                    swal("Success", "Integrated Successfully");
                } else {
                    if (pData.Message != "")
                        swal("Sorry", pData.Message);
                }
            });
        }
        ChargeTypes_LoadingWithPaging();
        jQuery("#ChargeTypeModal").modal("hide");
        $("#btnSave").removeAttr("disabled");

    });

}

function GetChargeTypeAccounts() {
    debugger;
    let ChargeTypeAccounts = [];
    let HasDuplicate = false;
    function isDuplicate(pItem) {
        return ChargeTypeAccounts.some(item =>
            item.pServiceID == pItem.pServiceID &&
            item.pDirectionID == pItem.pDirectionID &&
            IsNull(item.pStorageLocationID, "") == IsNull(pItem.pStorageLocationID,"") &&
            item.pCategoryID == pItem.pCategoryID
        );
    }
    $("#tblDetails tbody tr").each(function (i, tr) {
        debugger;
        let newItem = {
            pServiceID: $(tr).find("td.ServiceID select").val(),
            pDirectionID: $(tr).find("td.DirectionID select").val(),
            pIsOfficialDetails: $(tr).find("td.IsOfficial input").prop("checked"),
            pRevenueAccountID: $(tr).find("td.RevenueAccountID select").val(),
            pRevenueSubAccountID: $(tr).find("td.RevenueSubAccountID select").val(),
            pRevenueCostCenterID: $(tr).find("td.RevenueCostCenterID select").val(),
            pExpenseAccountID: $(tr).find("td.ExpenseAccountID select").val(),
            pExpenseSubAccountID: $(tr).find("td.ExpenseSubAccountID select").val(),
            pExpenseCostCenterID: $(tr).find("td.ExpenseCostCenterID select").val(),
            pStorageLocationID: $(tr).find("td.StorageLocationID select").val(),
            pCategoryID: $(tr).find("td.CategoryID select").val()
        };
        if (isDuplicate(newItem)) {
            HasDuplicate = true;
        } else {
            ChargeTypeAccounts.push(newItem);
        }
    });
    if (HasDuplicate) {
        return "DUPLICATE";
    } else {
        return ChargeTypeAccounts;
    }
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function ChargeTypes_UnlockRecord() {
    debugger;
    //UnlockFunction("/api/ChargeTypes/UnlockRecord",
    //    { pID: $("#hID").val() },
    //    "ChargeTypeModal",
    //    function () { ChargeTypes_LoadingWithPaging(); }); //the callback function
}
//function ChargeTypes_Delete(pID) {
//    DeleteListFunction("/api/ChargeTypes/DeleteByID", { "pID": pID }, function () { ChargeTypes_LoadingWithPaging(); });
//}

function ChargeTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblChargeTypes') != "")
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
            DeleteListFunction("/api/ChargeTypes/Delete", { "pChargeTypesIDs": GetAllSelectedIDsAsString('tblChargeTypes') }, function () { ChargeTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/ChargeTypes/Delete", { "pChargeTypesIDs": GetAllSelectedIDsAsString('tblChargeTypes') }, function () { ChargeTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function ChargeTypes_FillControls(pID) {
    ClearAll("#ChargeTypeModal");
    if (IsAccountingActive)
        $(".classAccountingOption").removeClass("hide");
    else
        $(".classAccountingOption").addClass("hide");
    var tr = $("tr[ID='" + pID + "']");
    if ($(tr).find("td.Code").text() == "FLEXI" || $(tr).find("td.Code").text() == "TMI" || $(tr).find("td.Code").text() == "TMO" || $(tr).find("td.Code").text() == "TAI" || $(tr).find("td.Code").text() == "TAO") {
        $("#txtCode").attr("disabled", "disabled");
        $("#txtName").attr("disabled", "disabled");
        $("#txtLocalName").attr("disabled", "disabled");
    }
    else {
        $("#txtCode").removeAttr("disabled");
        $("#txtName").removeAttr("disabled");
        $("#txtLocalName").removeAttr("disabled");
    }

    if (!IsMESCOCompany && pDefaults.UnEditableCompanyName != "UNF" && pDefaults.UnEditableCompanyName != "ESG") {
        // if is tank item or is is warehouseitem and is added manullay then disable save buttons
        if (($(tr).find('td.IsTank').find('input').attr('val') && pLoggedUser.Name != "ADMIN")
            || (!$(tr).find('td.IsAddedManually').find('input').attr('val') && $(tr).find('td.IsWarehouseChargeType').find('input').attr('val'))
        )
            $(".classDisableForTank").attr("disabled", "disabled");
        else
            $(".classDisableForTank").removeAttr("disabled");
    }
    debugger;
    if (pDefaults.UnEditableCompanyName == "ESG") {
        $('.showForESG').removeClass('hide');
        $('.hideForESG').addClass('hide');
        var chargeDepartmentEsg = chargeDepartmentEsg = {
            cbIsACCOUNTING: "false",
            cbIsINFORMATIONTECHNOLOGY: "false",
            cbIsMARKETING: "false",
            cbIsOPERATIONS: "false",
            cbIsSALES: "false",
            cbIsTRUCKING: "false",
            cbIsCUSTOMCLEARNACE: "false",
            cbIsIMPORTDep: "false",
            cbIsEXPORTDep: "false",
            cbIsISOTANK: "false",
            cbIsACCOUNTINGR: "false",
            cbIsINFORMATIONTECHNOLOGYR: "false",
            cbIsMARKETINGR: "false",
            cbIsOPERATIONSR: "false",
            cbIsSALESR: "false",
            cbIsTRUCKINGR: "false",
            cbIsCUSTOMCLEARNACER: "false",
            cbIsIMPORTDepR: "false",
            cbIsEXPORTDepR: "false",
            cbIsISOTANKR: "false"
        };
        var notesText = $(tr).find("td.Notes").text();
        try {
            chargeDepartmentEsg = JSON.parse(notesText);
        } catch (e) {
            console.log(e);
        }
        if (chargeDepartmentEsg.cbIsACCOUNTING == 'true') {
            $('#cbIsACCOUNTING').prop('checked', true);
        } else {
            $('#cbIsACCOUNTING').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsINFORMATIONTECHNOLOGY == 'true') {
            $('#cbIsINFORMATIONTECHNOLOGY').prop('checked', true);
        } else {
            $('#cbIsINFORMATIONTECHNOLOGY').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsMARKETING == 'true') {
            $('#cbIsMARKETING').prop('checked', true);
        } else {
            $('#cbIsMARKETING').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsOPERATIONS == 'true') {
            $('#cbIsOPERATIONS').prop('checked', true);
        } else {
            $('#cbIsOPERATIONS').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsSALES == 'true') {
            $('#cbIsSALES').prop('checked', true);
        } else {
            $('#cbIsSALES').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsTRUCKING == 'true') {
            $('#cbIsTRUCKING').prop('checked', true);
        } else {
            $('#cbIsTRUCKING').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsCUSTOMCLEARNACE == 'true') {
            $('#cbIsCUSTOMCLEARNACE').prop('checked', true);
        } else {
            $('#cbIsCUSTOMCLEARNACE').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsIMPORTDep == 'true') {
            $('#cbIsIMPORTDep').prop('checked', true);
        } else {
            $('#cbIsIMPORTDep').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsEXPORTDep == 'true') {
            $('#cbIsEXPORTDep').prop('checked', true);
        } else {
            $('#cbIsEXPORTDep').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsISOTANK == 'true') {
            $('#cbIsISOTANK').prop('checked', true);
        } else {
            $('#cbIsISOTANK').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsACCOUNTINGR == 'true') {
            $('#cbIsACCOUNTINGR').prop('checked', true);
        } else {
            $('#cbIsACCOUNTINGR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsINFORMATIONTECHNOLOGYR == 'true') {
            $('#cbIsINFORMATIONTECHNOLOGYR').prop('checked', true);
        } else {
            $('#cbIsINFORMATIONTECHNOLOGYR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsMARKETINGR == 'true') {
            $('#cbIsMARKETINGR').prop('checked', true);
        } else {
            $('#cbIsMARKETINGR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsOPERATIONSR == 'true') {
            $('#cbIsOPERATIONSR').prop('checked', true);
        } else {
            $('#cbIsOPERATIONSR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsSALESR == 'true') {
            $('#cbIsSALESR').prop('checked', true);
        } else {
            $('#cbIsSALESR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsTRUCKINGR == 'true') {
            $('#cbIsTRUCKINGR').prop('checked', true);
        } else {
            $('#cbIsTRUCKINGR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsCUSTOMCLEARNACER == 'true') {
            $('#cbIsCUSTOMCLEARNACER').prop('checked', true);
        } else {
            $('#cbIsCUSTOMCLEARNACER').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsIMPORTDepR == 'true') {
            $('#cbIsIMPORTDepR').prop('checked', true);
        } else {
            $('#cbIsIMPORTDepR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsEXPORTDepR == 'true') {
            $('#cbIsEXPORTDepR').prop('checked', true);
        } else {
            $('#cbIsEXPORTDepR').prop('checked', false);
        }
        if (chargeDepartmentEsg.cbIsISOTANKR == 'true') {
            $('#cbIsISOTANKR').prop('checked', true);
        } else {
            $('#cbIsISOTANKR').prop('checked', false);
        }

    }


    $("#slReturnAccount").val($(tr).find("td.ReturnAccountID").text());
    $("#slReturnCostCenter").val($(tr).find("td.ReturnCostCenterID").text());
    $("#slRevenueAccount").val($(tr).find("td.RevenueAccountID").text());
    $("#slRevenueCostCenter").val($(tr).find("td.RevenueCostCenterID").text());
    $("#slExpenseAccount").val($(tr).find("td.ExpenseAccountID").text());
    $("#slExpenseCostCenter").val($(tr).find("td.ExpenseCostCenterID").text());
    //$("#slFreightGroup").val($(tr).find("td.FreightGroupID").text());


    $("#slReturnAccount").css({ "width": "100%" }).select2();
    $("#slReturnSubAccount").css({ "width": "100%" }).select2();
    $("#slExpenseAccount").css({ "width": "100%" }).select2();
    $("#slRevenueAccount").css({ "width": "100%" }).select2();
    $("#slRevenueSubAccount").css({ "width": "100%" }).select2();
    $("#slExpenseSubAccount").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');

    $("#slReturnAccount").trigger("change");
    $("#slReturnSubAccount").trigger("change");
    $("#slExpenseAccount").trigger("change");
    $("#slRevenueAccount").trigger("change");
    $("#slRevenueSubAccount").trigger("change");
    $("#slExpenseSubAccount").trigger("change");

    FillSlSubAccount('slReturnSubAccount', 'slReturnAccount', $(tr).find("td.ReturnSubAccountID").text(), $(tr).find("td.AccountID").text());
    FillSlSubAccount('slRevenueSubAccount', 'slRevenueAccount', $(tr).find("td.RevenueSubAccountID").text(), $(tr).find("td.AccountID").text());
    FillSlSubAccount('slExpenseSubAccount', 'slExpenseAccount', $(tr).find("td.ExpenseSubAccountID").text(), $(tr).find("td.AccountID").text());



    $("#hID").val(pID);
    debugger;
    //the next 4 lines are to set the slTaxeTypes and slMeasurements to the value entered before
    var pMeasurementID = $(tr).find("td.MeasurementID").attr('val'); //store the val in a var to be re-entered in the select box
    var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
    var pCostTaxID = $(tr).find("td.CostTaxID").attr('val');
    var pInvoiceTypeID = $(tr).find("td.InvoiceTypeID").attr('val');
    var pTemplateID = $(tr).find("td.TemplateID").text();
    var pChargeTypeGroupID = $(tr).find("td.ChargeTypeGroupID").text();
    var pPurchaseItemID = $(tr).find("td.PurchaseItemID").text();
    var pFreightGroupID = $(tr).find("td.FreightGroupID").text();
    if ($("#slMeasurements option").length < 2 || $("#slInvoiceTypes option").length || $("#slTaxeTypes option").length < 2) {
        Measurements_GetList(pMeasurementID, null);
        TaxeTypes_GetList(pTaxeTypeID, function () {
            $("#slCostTaxeTypes").html($("#slTaxeTypes").html());
            $("#slCostTaxeTypes").val(pCostTaxID);
        });
        InvoiceTypes_GetList(pInvoiceTypeID, null);
    }
    else {
        $("#slMeasurements").val(pMeasurementID);
        $("#slTaxeTypes").val(pTaxeTypeID);
        $("#slCostTaxeTypes").val(pCostTaxID);
        $("#slInvoiceTypes").val(pInvoiceTypeID);
    }
    if ($("#slTemplate option").length < 2 || $("#slTemplate").val(pTemplateID)) {
        debugger;
        GetListWithNameAndWhereClause(pTemplateID, "/api/Template/LoadAll", "<--Select-->", "slTemplate", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(pChargeTypeGroupID, "/api/ChargeTypeGroup/LoadAll", "<--Select-->", "slChargeTypeGroup", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(pPurchaseItemID, "/api/PurchaseItem/LoadAll", "<--Select-->", "slPurchaseItem", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(pFreightGroupID, "/api/FreightGroup/LoadAll", "<--Select-->", "slFreightGroup", "ORDER BY Name", null);

    }
    else {
        $("#slTemplate").val(pTemplateID);
        $("#slChargeTypeGroup").val(pChargeTypeGroupID);
        $("#slPurchaseItem").val(pPurchaseItemID);
    }
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#lblShown").html(": " + $(tr).find("td.Code").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtPreCode").val($(tr).find("td.PreCode").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtViewOrder").val($(tr).find("td.ViewOrder").text());
    $("#txtChargeTypeCost").val($(tr).find("td.Cost").text());
    $("#txtChargeTypeNotes").val($(tr).find("td.Notes").text());
    $("#cbIsUsedInReceivable").prop('checked', $(tr).find('td.IsUsedInReceivable').find('input').attr('val'));
    $("#cbIsUsedInPayable").prop('checked', $(tr).find('td.IsUsedInPayable').find('input').attr('val'));
    $("#cbIsDisbersment").prop('checked', $(tr).find('td.IsDisbersment').find('input').attr('val'));
    $("#cbIsTank").prop('checked', $(tr).find('td.IsTank').find('input').attr('val'));
    $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
    $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
    $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));
    $("#cbIsDefaultInQuotation").prop('checked', $(tr).find('td.IsDefaultInQuotation').find('input').attr('val'));
    $("#cbIsDefaultInOperations").prop('checked', $(tr).find('td.IsDefaultInOperations').find('input').attr('val'));
    $("#cbIsGeneralChargeType").prop('checked', $(tr).find('td.IsGeneralChargeType').find('input').attr('val'));
    $("#cbIsWarehouseChargeType").prop('checked', $(tr).find('td.IsWarehouseChargeType').find('input').attr('val'));
    $("#cbIsOperationChargeType").prop('checked', $(tr).find('td.IsOperationChargeType').find('input').attr('val'));
    $("#cbIsOfficial").prop('checked', $(tr).find('td.IsOfficial').find('input').attr('val'));
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    //$("#cbIsAddedManually").prop('checked', $(tr).find('td.IsAddedManually').find('input').attr('val'));

    $("#cbIsDirectOperation").prop('checked', $(tr).find('td.IsDirectOperation').find('input').attr('val'));
    $("#cbIsMasterOperation").prop('checked', $(tr).find('td.IsMasterOperation').find('input').attr('val'));

    $("#slCurrency").val($(tr).find("td.CurrencyID").text());
    $("#slChargeTypeItemCategory").val($(tr).find("td.ItemCategoryID").text());

    if (IsMESCOCompany) {
        let crm = $(tr).find("td.crmCode").text();
        $("#txtcrmCode").val(crm == "0" ? "" : crm);
    }

    $("#btnSave").attr("onclick", "ChargeTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ChargeTypes_Update(true);");

    //ChargeType Accounts fill
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAccounts",
        { pChargeTypeID: $("#hID").val() }
        ,function (pData) {
            debugger;
            Details_BindTableRows(JSON.parse(pData[0]));
        });






}

function ChargeTypes_ClearAllControls(callback) {
    debugger;
    ClearAll("#ChargeTypeModal");
    $(".classAccountingOption").addClass("hide"); //show only Account tab in edit
    $(".classDisableForTank").removeAttr("disabled");
    $("#slTemplate").val("");
    $("#slChargeTypeGroup").val("");
    $("#slPurchaseItem").val("");
    if ($("#slMeasurements option").length < 2)
        Measurements_GetList(null, null);
    if ($("#slTaxeTypes option").length < 2) {
        TaxeTypes_GetList(null, function () {
            $("#slCostTaxeTypes").html($("#slTaxeTypes").html());
        });
    } else {
        if ($("#slCostTaxeTypes option").length < 2)
            $("#slCostTaxeTypes").html($("#slTaxeTypes").html());
    }
    if ($("#slInvoiceTypes option").length < 2)
        InvoiceTypes_GetList(null, null);
    if ($("#slTemplate option").length < 2) {
        debugger;
        GetListWithNameAndWhereClause(null, "/api/Template/LoadAll", "<--Select-->", "slTemplate", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(null, "/api/ChargeTypeGroup/LoadAll", "<--Select-->", "slChargeTypeGroup", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(null, "/api/PurchaseItem/LoadAll", "<--Select-->", "slPurchaseItem", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(null, "/api/FreightGroup/LoadAll", "<--Select-->", "slFreightGroup", "ORDER BY Name", null);
    }
    if (pDefaults.UnEditableCompanyName == "ESG") {
        $('.showForESG').removeClass('hide');
        $('.hideForESG').addClass('hide');
    }
    $("#slReturnSubAccount").html("<option value=0>" + "<--Select-->" + "</option>");
    $("#slRevenueSubAccount").html("<option value=0>" + "<--Select-->" + "</option>");
    $("#slExpenseSubAccount").html("<option value=0>" + "<--Select-->" + "</option>");

    $("#btnSave").attr("onclick", "ChargeTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ChargeTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    $("#cbIsDirectOperation").prop('checked', true);
    $("#cbIsMasterOperation").prop('checked', true);
    ClearAllTableRows("tblDetails");
    if (callback != null && callback != undefined)
        callback();


}

//function ChargeTypes_CheckValueIsInteger(id) {
//    debugger;
//    CheckValueIsInteger("#" + id);
//}

// ChargeTypes Region ---------------------------------------------------------------
//to fill the select boxes
//this is the NoAccess Measurements
function Measurements_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select Measurement", "slMeasurements", " WHERE 1=1 ");
}
//to fill the select boxes
function TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Taxe Type", "slTaxeTypes", callback);
}
//to fill the select boxes
function InvoiceTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/InvoiceTypes/LoadAll", "Select Invoice Type", "slInvoiceTypes", " ORDER BY Name ");
}


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function ChargeTypes_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && oJS[0].Code != undefined) //if (sCSV != "")
                    ChargeTypes_ImportFromExcelFile(oJS, pBtnName);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}

function ChargeTypes_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;

    // get Existing ChargeTypes Name List from DB
    var ExistingChargeTypesNameList;
    var ExistingChargeTypesNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/ChargeTypes/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingChargeTypesNameList = JSON.parse(pData[0]);
                ExistingChargeTypesNameArray = ExistingChargeTypesNameList.map(item => item.Name);

                ExistingChargeTypesCodeList = JSON.parse(pData[0]);
                ExistingChargeTypesCodeArray = ExistingChargeTypesCodeList.map(item => item.Code);

                FadePageCover(true);
                var pCodeList = "";
                var pNameList = "";
                var pNameArray = [];
                var pCodeArray = [];
                var pLocalNameList = "";

                var pPreCodeList = "";

                var pAccountID_RevenueList = "";
                var pSubAccountID_RevenueList = "";
                var pAccountID_ExpenseList = "";
                var pSubAccountID_ExpenseList = "";

                for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space

                    pNameList += ((pNameList == "" ? "" : ",") +
                        (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                    if (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "") {
                        IsNameEmpty = true;
                        NameEmptyRowNo = i + 1;
                    } else {

                        if (pDefaults.UnEditableCompanyName != "MKH")
                        {
                            // Check if Name Exists in BD
                            if (ExistingChargeTypesNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                                IsNameExistsInDB = true;
                                NameExistsInDBRowNo = i + 1;
                            }

                            // Check if Name Exists in pNameList
                            if (pNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                                IsNameExistsInExcel = true;
                                NameExistsInExcelRowNo = i + 1;
                            }
                        }
                        else
                        {
                            // Check if Name Exists in BD
                            if (ExistingChargeTypesCodeArray.includes(pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                                IsNameExistsInDB = true;
                                NameExistsInDBRowNo = i + 1;
                            }

                            // Check if Name Exists in pNameList
                            if (pCodeArray.includes(pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                                IsNameExistsInExcel = true;
                                NameExistsInExcelRowNo = i + 1;
                            }
                        }


                        pCodeArray.push(pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim());
                        pNameArray.push(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim());

                    }


                    pLocalNameList += ((pLocalNameList == "" ? "" : ",") +
                        (pDataRows[i].LocalName == undefined || pDataRows[i].LocalName.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].LocalName.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                    pCodeList += ((pCodeList == "" ? "" : ",") +
                        (pDataRows[i].Code == undefined || pDataRows[i].Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Code.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );


                    pPreCodeList += ((pPreCodeList == "" ? "" : ",") +
                        (pDataRows[i].PreCode == undefined || pDataRows[i].PreCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PreCode.replace(/[\, ]/g, ' ').trim())
                        );


                    pAccountID_RevenueList += ((pAccountID_RevenueList == "" ? "" : ",") +
                        (pDataRows[i].RevenueAccount == undefined || pDataRows[i].RevenueAccount.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].RevenueAccount.replace(/[\, ]/g, ' ').trim())
                        );

                    pSubAccountID_RevenueList += ((pSubAccountID_RevenueList == "" ? "" : ",") +
                        (pDataRows[i].RevenueSubAccount == undefined || pDataRows[i].RevenueSubAccount.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].RevenueSubAccount.replace(/[\, ]/g, ' ').trim())
                        );

                    pAccountID_ExpenseList += ((pAccountID_ExpenseList == "" ? "" : ",") +
                        (pDataRows[i].ExpenseAccount == undefined || pDataRows[i].ExpenseAccount.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ExpenseAccount.replace(/[\, ]/g, ' ').trim())
                        );

                    pSubAccountID_ExpenseList += ((pSubAccountID_ExpenseList == "" ? "" : ",") +
                        (pDataRows[i].ExpenseSubAccount == undefined || pDataRows[i].ExpenseSubAccount.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ExpenseSubAccount.replace(/[\, ]/g, ' ').trim())
                        );

                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pCodeList, pPreCodeList, pAccountID_RevenueList, pSubAccountID_RevenueList, pAccountID_ExpenseList, pSubAccountID_ExpenseList
                };



                if (IsNameEmpty) {
                    swal(strSorry, " Name in Row No. " + NameEmptyRowNo + " is Empty ");
                } else if (IsNameExistsInDB) {
                    if (pDefaults.UnEditableCompanyName != "MKH")
                        swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Charge Types ");
                    else
                        swal(strSorry, " Code in Row No. " + NameExistsInDBRowNo + " already exists in Charge Types ");
                }
                else if (IsNameExistsInExcel) {
                    if (pDefaults.UnEditableCompanyName != "MKH")
                        swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    else
                        swal(strSorry, " Code in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                } else {

                    CallPOSTFunctionWithParameters("/api/ChargeTypes/InsertListFromExcel_ChargeTypes", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        ChargeTypes_LoadingWithPaging();
                    }, null);

                }



                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);




}
//******************************EOF Reading Excel Files***************************************//;
//******************************Charge Type Accounts***************************************//;
var maxDetailsIDInTable = 0;
function Details_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblDetails");
    maxDetailsIDInTable = 0;
    $.each(pTableRows, function (i, item) {
        maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
        var tr = "";
        tr += "<tr ID='" + item.ID + "' " + ">";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='DetailsID'><input " + (1 == 2 ? " disabled='disabled' " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>";
        tr += "     <td class='ServiceID' style='width:10%;'><select id='slService" + item.ID + "' style='width:100%;' class='selectDirectionID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.ServiceID + "></option>" + "</select></td>";
        tr += "     <td class='DirectionID' style='width:10%;'><select id='slDirection" + item.ID + "' style='width:100%;' class='selectDirectionID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.DirectionID +"></option>" + "</select></td>";
        tr += "     <td class='IsOfficial'><input type='checkbox' " + (item.IsOfficial ? "checked" : "") + " id='cbIsOfficial" + item.ID + "' class='cbIsOfficial controlStyle' onchange='Details_SetIsRowChanged(id);'> </td>";
        tr += "     <td class='RevenueAccountID' style='width:10%;'><select id='slRevenueAccount" + item.ID + "' style='width:70%;' class='selectRevenueAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_RevenueAccountChanged(" + item.ID + ");' data-required='false'>" + "<option value=" + item.RevenueAccountID + "></option>" + "</select></td>";
        tr += "     <td class='RevenueSubAccountID' style='width:10%;'><select id='slRevenueSubAccount" + item.ID + "' style='width:100%;' class='selectRevenueSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.RevenueSubAccountID + ">" + (item.RevenueSubAccountName == 0 ? "" : item.RevenueSubAccountName + "-") + (item.RevenueSubAccountNumber == 0 ? "" : item.RevenueSubAccountNumber) + "</option>" + "</select></td>";
        tr += "     <td class='RevenueCostCenterID' style='width:10%;'><select id='slRevenueCostCenter" + item.ID + "' style='width:100%;' class='selectRevenueCostCenterID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.RevenueCostCenterID + "></option>" + "</select></td>";
        tr += "     <td class='ExpenseAccountID' style='width:10%;'><select id='slExpenseAccount" + item.ID + "' style='width:100%;'  class='selectExpenseAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_ExpenseAccountChanged(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=" + item.ExpenseAccountID + "></option>" + "</select></td>";
        tr += "     <td class='ExpenseSubAccountID' style='width:10%;'><select id='slExpenseSubAccount" + item.ID + "' style='width:100%;' class='selectExpenseSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.ExpenseSubAccountID + ">" + (item.ExpenseSubAccountName == 0 ? "" : item.ExpenseSubAccountName + "-")  + (item.ExpenseSubAccountNumber == 0 ? "" : item.ExpenseSubAccountNumber) + "</option>" + "</select></td>";
        tr += "     <td class='ExpenseCostCenterID hide' style='width:10%;'><select id='slExpenseCostCenter" + item.ID + "'  style='width:100%;' class='selectExpenseCostCenterID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.ExpenseCostCenterID + "></option>" + "</select></td>";
        tr += "     <td class='StorageLocationID' style='width:10%;'><select id='slStorageLocation" + item.ID + "' style='width:100%;' class='selectStorageLocationID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.StorageLocationID + "></option>" + "</select></td>";
        if (pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "REL")
            tr += "     <td class='CategoryID' style='width:10%;'><select id='slCategory" + item.ID + "' style='width:100%;' class='selectCategoryID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + item.CategoryID + "></option>" + "</select></td>";
        else
            tr += "     <td class='CategoryID' style='width:10%;'><select id='slCategory" + item.ID + "' style='width:100%;' class='selectCategoryID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true'>" + "<option value=" + item.CategoryID + "></option>" + "</select></td>";

        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "</tr>";
        AppendRowtoTable("tblDetails", tr);
    });

    $.each(pTableRows, function (i, item) {
        debugger;
        //Account

        $("#slRevenueAccount" + item.ID).html($("#slRevenueAccount").html());
        $("#slRevenueAccount" + item.ID + " option").removeAttr("data-select2-id");
        $("#slRevenueAccount" + item.ID).val(item.RevenueAccountID);
        $("#slRevenueAccount" + item.ID).css({ "width": "100%" }).select2();

        $("#slExpenseAccount" + item.ID).html($("#slExpenseAccount").html());
        $("#slExpenseAccount" + item.ID + " option").removeAttr("data-select2-id");
        $("#slExpenseAccount" + item.ID).val(item.ExpenseAccountID);


        //SubAccount
        //$("#slRevenueSubAccount" + item.ID).html($("#slRevenueSubAccount").html());
        //$("#slRevenueSubAccount" + item.ID).val(item.RevenueSubAccountID);
        //$("#slExpenseSubAccount" + item.ID).html($("#slExpenseSubAccount").html());
        //$("#slExpenseSubAccount" + item.ID).val(item.ExpenseSubAccountID);

        //CostCenter
        $("#slRevenueCostCenter" + item.ID).css({ "width": "100%" }).select2();

        $("#slRevenueCostCenter" + item.ID).html($("#slRevenueCostCenter").html());
        $("#slRevenueCostCenter" + item.ID).val(item.RevenueCostCenterID);
        $("#slExpenseCostCenter" + item.ID).html($("#slExpenseCostCenter").html());
        $("#slExpenseCostCenter" + item.ID).val(item.ExpenseCostCenterID);

        //Service
        $("#slService" + item.ID).html($("#hReadyServices").html());
        $("#slService" + item.ID).val(item.ServiceID);

        //Direction
        $("#slDirection" + item.ID).html($("#hReadyDirections").html());
        $("#slDirection" + item.ID).val(item.DirectionID);

        //StorageLocation
        $("#slStorageLocation" + item.ID).html($("#hReadyStorageLocations").html());
        $("#slStorageLocation" + item.ID).val(item.StorageLocationID);

        //Category
        $("#slCategory" + item.ID).html($("#hReadyCategories").html());
        $("#slCategory" + item.ID).val(item.CategoryID);

        //ExpenseAccountID
        $("#slExpenseAccount" + item.ID).css({ "width": "100%" }).select2();

    });
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsID");
}

function Details_NewRow() {
    debugger;
    ++maxDetailsIDInTable;
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var tr = "";
    tr += "<tr ID='" + maxDetailsIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxDetailsIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='DetailsID'><input name='Delete' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "     <td class='ServiceID' style='width:10%;'><select id='slService" + maxDetailsIDInTable + "' style='width:100%;' class='selectServiceID controlStyle'  onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='DirectionID' style='width:10%;'><select id='slDirection" + maxDetailsIDInTable + "' style='width:100%;' class='selectDirectionID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='IsOfficial'><input type='checkbox' id='cbIsOfficial" + maxDetailsIDInTable + "' class='cbIsOfficial controlStyle' onchange='Details_SetIsRowChanged(id);' data-required='false'> </td>";
    tr += "     <td class='RevenueAccountID' style='width:10%;'><select id='slRevenueAccount" + maxDetailsIDInTable + "' style='width:100%;' class='selectRevenueAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_RevenueAccountChanged(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='RevenueSubAccountID' style='width:10%;'><select id='slRevenueSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='selectRevenueSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='RevenueCostCenterID' style='width:10%;'><select id='slRevenueCostCenter" + maxDetailsIDInTable + "' style='width:100%;' class='selectRevenueCostCenterID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ExpenseAccountID' style='width:10%;'><select id='slExpenseAccount" + maxDetailsIDInTable + "' style='width:100%;'  class='selectExpenseAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id); Details_ExpenseAccountChanged(" + maxDetailsIDInTable + ");' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ExpenseSubAccountID' style='width:10%;'><select id='slExpenseSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='selectExpenseSubAccountID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='ExpenseCostCenterID hide' style='width:10%;'><select id='slExpenseCostCenter" + maxDetailsIDInTable + "'  style='width:100%;' class='selectExpenseCostCenterID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='StorageLocationID' style='width:10%;'><select id='slStorageLocation" + maxDetailsIDInTable + "' style='width:100%;' class='selectStorageLocationID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    if (pDefaults.UnEditableCompanyName == "DGL" || pDefaults.UnEditableCompanyName == "REL")
        tr += "     <td class='CategoryID' style='width:10%;'><select id='slCategory" + maxDetailsIDInTable + "' style='width:100%;' class='selectCategoryID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='false'>" + "<option value=0></option>" + "</select></td>";
    else
        tr += "     <td class='CategoryID' style='width:10%;'><select id='slCategory" + maxDetailsIDInTable + "' style='width:100%;' class='selectCategoryID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Details_SetIsRowChanged(id);' data-required='true'>" + "<option value=0></option>" + "</select></td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxDetailsIDInTable + "' type='checkbox' value='" + maxDetailsIDInTable + "' /></td>";
    tr += "</tr>";

    $("#tblDetails tbody").prepend(tr);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
        $("#tblDetails tbody tr[ID=" + maxDetailsIDInTable + "]").reverseChildren();

    //Revenue
    
    $("#slRevenueCostCenter" + maxDetailsIDInTable).select2();
    


    //$("#slRevenueSubAccount" + maxDetailsIDInTable).select2();

    $("#slRevenueAccount" + maxDetailsIDInTable).html($("#slRevenueAccount").html());

    $("#slRevenueAccount" + maxDetailsIDInTable + " option").removeAttr("data-select2-id");

    $("#slRevenueAccount" + maxDetailsIDInTable).val($("#slRevenueAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slRevenueAccount" + (maxDetailsIDInTable - 1)).val());
    $("#slRevenueAccount" + maxDetailsIDInTable).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
   // $("#slRevenueAccount" + maxDetailsIDInTable).trigger("change");


    $("#slRevenueSubAccount" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    $("#slRevenueSubAccount" + maxDetailsIDInTable).html($("#slRevenueSubAccount" + (maxDetailsIDInTable - 1)).html());
    $("#slRevenueSubAccount" + maxDetailsIDInTable).val($("#slRevenueSubAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slRevenueSubAccount" + (maxDetailsIDInTable - 1)).val());


    $("#slRevenueSubAccount" + maxDetailsIDInTable).trigger("change");

    $("#slRevenueCostCenter" + maxDetailsIDInTable).html($("#slRevenueCostCenter").html());
    $("#slRevenueCostCenter" + maxDetailsIDInTable).val($("#slRevenueCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slRevenueCostCenter" + (maxDetailsIDInTable - 1)).val());
    //$("#slRevenueCostCenter" + maxDetailsIDInTable).select2();
   // $("#slRevenueCostCenter" + maxDetailsIDInTable).trigger("change");

    Details_FillSlSubAccount("slRevenueSubAccount" + maxDetailsIDInTable, $("#slRevenueSubAccount" + maxDetailsIDInTable).val(), $("#slRevenueAccount" + maxDetailsIDInTable).val());

    //Expense
    //$("#slExpenseAccount" + maxDetailsIDInTable).select2();
    //$("#slExpenseSubAccount" + maxDetailsIDInTable).select2();

    $("#slExpenseAccount" + maxDetailsIDInTable).html($("#slExpenseAccount").html());

    $("#slExpenseAccount" + maxDetailsIDInTable + " option").removeAttr("data-select2-id");

    $("#slExpenseAccount" + maxDetailsIDInTable).val($("#slExpenseAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slExpenseAccount" + (maxDetailsIDInTable - 1)).val());
    $("#slExpenseAccount" + maxDetailsIDInTable).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
    //$("#slExpenseAccount" + maxDetailsIDInTable).trigger("change");


    $("#slExpenseSubAccount" + maxDetailsIDInTable).html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    $("#slExpenseSubAccount" + maxDetailsIDInTable).html($("#slExpenseSubAccount" + (maxDetailsIDInTable - 1)).html());
    $("#slExpenseSubAccount" + maxDetailsIDInTable).val($("#slExpenseSubAccount" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slExpenseSubAccount" + (maxDetailsIDInTable - 1)).val());


    $("#slExpenseSubAccount" + maxDetailsIDInTable).trigger("change");

    $("#slExpenseCostCenter" + maxDetailsIDInTable).html($("#slExpenseCostCenter").html());
    $("#slExpenseCostCenter" + maxDetailsIDInTable).val($("#slExpenseCostCenter" + (maxDetailsIDInTable - 1)).val() == undefined ? 0 : $("#slExpenseCostCenter" + (maxDetailsIDInTable - 1)).val());
    //$("#slExpenseCostCenter" + maxDetailsIDInTable).select2();
    $("#slExpenseCostCenter" + maxDetailsIDInTable).trigger("change");

    Details_FillSlSubAccount("slExpenseSubAccount" + maxDetailsIDInTable, $("#slExpenseSubAccount" + maxDetailsIDInTable).val(), $("#slExpenseAccount" + maxDetailsIDInTable).val());

    $("#slService" + maxDetailsIDInTable).html($("#hReadyServices").html());
    $("#slDirection" + maxDetailsIDInTable).html($("#hReadyDirections").html());
    $("#slStorageLocation" + maxDetailsIDInTable).html($("#hReadyStorageLocations").html());
    $("#slCategory" + maxDetailsIDInTable).html($("#hReadyCategories").html());
    //SetDatepickerFormat();
    BindAllCheckboxonTable("tblDetails", "DetailsID", "cbDetailsDeleteHeader");
}
function Details_DeleteList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblDetails', 'Delete');
    if (pSelectedIDs != "") {
        for (var i = 0; i < pSelectedIDs.split(",").length; i++)
            $("#tblDetails tbody tr[ID=" + pSelectedIDs.split(",")[i] + "]").remove();
    }
}
function Details_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            $("div[tabindex='-1']").removeAttr('tabindex');
            $("#" + pSlName).trigger("change");
            //  End Auto Filter
            //    }
            FadePageCover(false);
        }
        , null);
}
function Details_RevenueAccountChanged(pRowID) {
    debugger;
    $("#slRevenueSubAccount" + pRowID).val(0);
    Details_FillSlSubAccount("slRevenueSubAccount" + pRowID, 0, $("#slRevenueAccount" + pRowID).val());
}
function Details_ExpenseAccountChanged(pRowID) {
    debugger;
    $("#slExpenseSubAccount" + pRowID).val(0);
    Details_FillSlSubAccount("slExpenseSubAccount" + pRowID, 0, $("#slExpenseAccount" + pRowID).val());
}
//******************************EOF Charge Type Accounts***************************************//;


function ChargeTypesTarrif_Insert(pSaveandAddNew) {
    debugger;
    if ($('#slContainerType').val() == '')
        swal("Sorry", "Please, choose container type .");
    else if ( $('#txtRate').val() == '' || $('#txtRate').val() <= 0  )
        swal("Sorry", "Please, enter value .");
    else
    {

   
        var pParametersWithValues = {
              pID: ($("#hT_ID").val() == '' ? 0 : $("#hT_ID").val()  )
            , pChargeTypeID:  $("#hID").val()
            , pContainerTypeID: $("#slContainerType").val()
            , pRate: $("#txtRate").val()
        };
  
        CallGETFunctionWithParameters("/api/ChargeTypes/InsertChargeTypesTarrif",
         pParametersWithValues 
        , function (pData) {
            debugger;
            if(pData[0] != '') {
                        swal("Sorry", "Please, revise data .");
            }
            else
            {
                ChargeTypesTarrif_BindTableRows(JSON.parse(pData[1]));
                if (pSaveandAddNew)
                {
                    $('#slContainerType').val('');
                    $('#txtRate').val('0');
                }
                 else
                    jQuery("#ContainerTypeModal").modal("hide");         
            }

        });
    }

}
function ChargeTypesTarrif__DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTarrifDetails') != "")
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
            DeleteListFunction("/api/ChargeTypes/DeleteChargeTypesTarrif", { "pChargeTypesIDs": GetAllSelectedIDsAsString('tblTarrifDetails') }, function () {
                ChargeTypesTarrif__LoadData();
            });
        });
}

function ChargeTypesTarrif__LoadData()
{
    CallGETFunctionWithParameters("/api/ChargeTypes/LoadChargeTypesTarrif",
        { pChargeTypeID: $("#hID").val() }
        , function (pData) {
            debugger;
            ChargeTypesTarrif_BindTableRows(JSON.parse(pData[0]));
        });
}

function ChargeTypesTarrif_EditByDblClick(pID) {
    jQuery("#ContainerTypeModal").modal("show");
    ChargeTypesTarrif_FillControls(pID);

}
function ChargeTypesTarrif_FillControls(pID) {

    ClearAll("#ContainerTypeModal");

    $("#hT_ID").val(pID);

    var tr = $("tr[ID='" + pID + "']");

    $("#slContainerType").val($(tr).find("td.ContainerTypeID").text());
    $("#txtRate").val($(tr).find("td.Rate").text());

}
function ChargeTypesTarrif_BindTableRows(pChargeTypesTarrif) {
    debugger;
    if (glbCallingControl == "ChargeTypes")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");

    ClearAllTableRows("tblTarrifDetails");

    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pChargeTypesTarrif, function (i, item) {
        AppendRowtoTable("tblTarrifDetails",
        ("<tr ID='" + item.ID + "'  ondblclick='ChargeTypesTarrif_EditByDblClick(" + item.ID + ");'" + ">"
                    + "<td class='ID'> <input " +  ( " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='Code hide'>" + item.Code + "</td>"
                    + "<td class='ContainerTypeID hide'>" + item.ContainerTypeID + "</td>"
                    + "<td class='Rate '>" + item.Rate + "</td>"
                    + "</tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTarrifDetails", "ID");
    CheckAllCheckbox("ID");

    BindAllCheckboxonTable("tblTarrifDetails", "D", "HeaderDeleteDetailsTarrifID");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteDetailsTarrifID");
    //HighlightText("#tblChargeTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}