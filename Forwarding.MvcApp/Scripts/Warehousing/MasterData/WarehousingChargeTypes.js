// WarehousingChargeTypes Region ---------------------------------------------------------------
// Bind WarehousingChargeTypes Table Rows
function WarehousingChargeTypes_BindTableRows(pWarehousingChargeTypes) {
    debugger;
    if (glbCallingControl == "WarehousingChargeTypes")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWarehousingChargeTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pWarehousingChargeTypes, function (i, item) {
        AppendRowtoTable("tblWarehousingChargeTypes",
        ("<tr ID='" + item.ID + "'  ondblclick='WarehousingChargeTypes_EditByDblClick(" + item.ID + ");'" + ">"
                    + "<td class='ID'> <input " + (item.Code.toUpperCase() == "FLEXI" || item.Code.toUpperCase() == "TMI" || item.Code.toUpperCase() == "TMO" || item.Code.toUpperCase() == "TAI" || item.Code.toUpperCase() == "TAO" ? " disabled=disabled " : " name='Delete' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='MeasurementID' val='" + item.MeasurementID + "'>" + (item.MeasurementID  == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + (item.TaxeTypeID == 0 ? "" : item.TaxeTypeCode) + "</td>"
                    + "<td class='InvoiceTypeID hide' val='" + item.InvoiceTypeID + "'>" + (item.InvoiceTypeID == 0 ? "" : item.InvoiceTypeName) + "</td>"
                    + "<td class='ViewOrder hide'>" + item.ViewOrder + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='IsUsedInReceivable hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsUsedInReceivable == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsUsedInPayable hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsUsedInPayable == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsTank hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsTank == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOcean hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOcean == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAir hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAir == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInland hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInland == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDefaultInQuotation hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDefaultInQuotation == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDefaultInOperations hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDefaultInOperations == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsOperationChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsOperationChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsGeneralChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsGeneralChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsWarehouseChargeType hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsWarehouseChargeType == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsAddedManually hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAddedManually == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"

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
                    + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"

                    + "<td class='hide'><a href='#ChargeTypeModal' data-toggle='modal' onclick='WarehousingChargeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblWarehousingChargeTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWarehousingChargeTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    $("#btn-NewAdd").addClass("hide");
}
function WarehousingChargeTypes_EditByDblClick(pID) {
    jQuery("#ChargeTypeModal").modal("show");
    WarehousingChargeTypes_FillControls(pID);
}
// Loading with data
function WarehousingChargeTypes_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/WarehousingChargeTypes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { WarehousingChargeTypes_BindTableRows(pTabelRows); WarehousingChargeTypes_ClearAllControls(); });
    HighlightText("#tblWarehousingChargeTypes>tbody>tr", $("#txt-Search").val().trim());//sherif:new
}
// calling web function to add new ChargeType item.
function WarehousingChargeTypes_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/WarehousingChargeTypes/Insert", {
        pMeasurementID: ($('#slMeasurements option:selected').val() == "" ? 0 : $('#slMeasurements option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pInvoiceTypeID: ($('#slInvoiceTypes option:selected').val() == "" ? 0 : $('#slInvoiceTypes option:selected').val()), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: ($("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim()), pViewOrder: ($("#txtViewOrder").val().trim() == "" ? 0 : $("#txtViewOrder").val().trim()), pNotes: ($("#txtChargeTypeNotes").val() == null ? "" : $("#txtChargeTypeNotes").val().trim()), pIsUsedInReceivable: $("#cbIsUsedInReceivable").prop('checked'), pIsUsedInPayable: $("#cbIsUsedInPayable").prop('checked'), pIsTank: $("#cbIsTank").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsDefaultInQuotation: $("#cbIsDefaultInQuotation").prop('checked'), pIsDefaultInOperations: $("#cbIsDefaultInOperations").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsGeneralChargeType: $("#cbIsGeneralChargeType").prop('checked'), pIsWarehouseChargeType: $("#cbIsWarehouseChargeType").prop('checked'), pIsOperationChargeType: $("#cbIsOperationChargeType").prop('checked')
        , pAccountID_Revenue: $("#slRevenueAccount").val()
        , pSubAccountID_Revenue: $("#slRevenueSubAccount").val()
        , pCostCenterID_Revenue: $("#slRevenueCostCenter").val()
        , pAccountID_Expense: $("#slExpenseAccount").val()
        , pSubAccountID_Expense: $("#slExpenseSubAccount").val()
        , pCostCenterID_Expense: $("#slExpenseCostCenter").val()
        , pTemplateID: $("#slTemplate").val() == "" ? 0 : $("#slTemplate").val()
        , pPurchaseItemID: $("#slPurchaseItem").val() == "" ? 0 : $("#slPurchaseItem").val()
    }, pSaveandAddNew, "ChargeTypeModal", function () { WarehousingChargeTypes_LoadingWithPaging(); });
}
//calling this function for update
function WarehousingChargeTypes_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/WarehousingChargeTypes/Update", {
        pID: $("#hID").val(), pMeasurementID: ($('#slMeasurements option:selected').val() == "" ? 0 : $('#slMeasurements option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pCode: $("#txtCode").val().trim(), pInvoiceTypeID: ($('#slInvoiceTypes option:selected').val() == "" ? 0 : $('#slInvoiceTypes option:selected').val()), pName: $("#txtName").val().trim(), pLocalName: ($("#txtLocalName").val().trim() == "" ? 0 : $("#txtLocalName").val().trim()), pViewOrder: ($("#txtViewOrder").val().trim() == "" ? 0 : $("#txtViewOrder").val().trim()), pNotes: ($("#txtChargeTypeNotes").val() == null ? "" : $("#txtChargeTypeNotes").val().trim()), pIsUsedInReceivable: $("#cbIsUsedInReceivable").prop('checked'), pIsUsedInPayable: $("#cbIsUsedInPayable").prop('checked'), pIsTank: $("#cbIsTank").prop('checked'), pIsOcean: $("#cbIsOcean").prop('checked'), pIsAir: $("#cbIsAir").prop('checked'), pIsInland: $("#cbIsInland").prop('checked'), pIsDefaultInQuotation: $("#cbIsDefaultInQuotation").prop('checked'), pIsDefaultInOperations: $("#cbIsDefaultInOperations").prop('checked'), pIsInactive: $("#cbIsInactive").prop('checked') /*, pIsAddedManually: $("#cbIsAddedManually").prop('checked')*/, pIsGeneralChargeType: $("#cbIsGeneralChargeType").prop('checked'), pIsWarehouseChargeType: $("#cbIsWarehouseChargeType").prop('checked'), pIsOperationChargeType: $("#cbIsOperationChargeType").prop('checked')
        , pAccountID_Revenue: $("#slRevenueAccount").val()
        , pSubAccountID_Revenue: $("#slRevenueSubAccount").val()
        , pCostCenterID_Revenue: $("#slRevenueCostCenter").val()
        , pAccountID_Expense: $("#slExpenseAccount").val()
        , pSubAccountID_Expense: $("#slExpenseSubAccount").val()
        , pCostCenterID_Expense: $("#slExpenseCostCenter").val()
        , pTemplateID: $("#slTemplate").val() == "" ? 0 : $("#slTemplate").val()
        , pPurchaseItemID: $("#slPurchaseItem").val() == "" ? 0 : $("#slPurchaseItem").val()
    }, pSaveandAddNew, "ChargeTypeModal", function () { WarehousingChargeTypes_LoadingWithPaging(); });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function WarehousingChargeTypes_UnlockRecord() {
    debugger;
    //UnlockFunction("/api/WarehousingChargeTypes/UnlockRecord",
    //    { pID: $("#hID").val() },
    //    "ChargeTypeModal",
    //    function () { WarehousingChargeTypes_LoadingWithPaging(); }); //the callback function
}
//function WarehousingChargeTypes_Delete(pID) {
//    DeleteListFunction("/api/WarehousingChargeTypes/DeleteByID", { "pID": pID }, function () { WarehousingChargeTypes_LoadingWithPaging(); });
//}

function WarehousingChargeTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWarehousingChargeTypes') != "")
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
            DeleteListFunction("/api/WarehousingChargeTypes/Delete", { "pWarehousingChargeTypesIDs": GetAllSelectedIDsAsString('tblWarehousingChargeTypes') }, function () { WarehousingChargeTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/WarehousingChargeTypes/Delete", { "pWarehousingChargeTypesIDs": GetAllSelectedIDsAsString('tblWarehousingChargeTypes') }, function () { WarehousingChargeTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function WarehousingChargeTypes_FillControls(pID) {
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

            // if is tank item or is is warehouseitem and is added manullay then disable save buttons
            if (($(tr).find('td.IsTank').find('input').attr('val')) || (!$(tr).find('td.IsAddedManually').find('input').attr('val') && $(tr).find('td.IsWarehouseChargeType').find('input').attr('val')))
                $(".classDisableForTank").attr("disabled", "disabled");
            else
                $(".classDisableForTank").removeAttr("disabled");

            $("#slRevenueAccount").val($(tr).find("td.RevenueAccountID").text());
            FillSlSubAccount('slRevenueSubAccount', 'slRevenueAccount', $(tr).find("td.RevenueSubAccountID").text(), $(tr).find("td.AccountID").text());
            $("#slRevenueCostCenter").val($(tr).find("td.RevenueCostCenterID").text());
            $("#slExpenseAccount").val($(tr).find("td.ExpenseAccountID").text());
            FillSlSubAccount('slExpenseSubAccount', 'slExpenseAccount', $(tr).find("td.ExpenseSubAccountID").text(), $(tr).find("td.AccountID").text());
            $("#slExpenseCostCenter").val($(tr).find("td.ExpenseCostCenterID").text());

            $("#hID").val(pID);
            debugger;
            //the next 4 lines are to set the slTaxeTypes and slMeasurements to the value entered before
            var pMeasurementID = $(tr).find("td.MeasurementID").attr('val'); //store the val in a var to be re-entered in the select box
            var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
            var pInvoiceTypeID = $(tr).find("td.InvoiceTypeID").attr('val');
            var pTemplateID = $(tr).find("td.TemplateID").text();
            var pPurchaseItemID = $(tr).find("td.PurchaseItemID").text();
            if ($("#slMeasurements option").length < 2 || $("#slInvoiceTypes option").length || $("#slTaxeTypes option").length < 2) {
                Measurements_GetList(pMeasurementID, null);
                TaxeTypes_GetList(pTaxeTypeID, null);
                InvoiceTypes_GetList(pInvoiceTypeID, null);
            }
            else {
                $("#slMeasurements").val(pMeasurementID);
                $("#slTaxeTypes").val(pTaxeTypeID);
                $("#slInvoiceTypes").val(pInvoiceTypeID);
            }
            if ($("#slTemplate option").length < 2 || $("#slTemplate").val(pTemplateID)) {
                GetListWithNameAndWhereClause(pTemplateID, "/api/Template/LoadAll", "<--Select-->", "slTemplate", "ORDER BY Name", null);
                GetListWithNameAndWhereClause(pPurchaseItemID, "/api/PurchaseItem/LoadAll", "<--Select-->", "slPurchaseItem", "ORDER BY Name", null);
            }
            else {
                $("#slTemplate").val(pTemplateID);
                $("#slPurchaseItem").val(pPurchaseItemID);
            }
            $("#lblShown").html(": " + $(tr).find("td.Name").text());
            $("#lblShown").html(": " + $(tr).find("td.Code").text());
            $("#txtCode").val($(tr).find("td.Code").text());
            $("#txtName").val($(tr).find("td.Name").text());
            $("#txtLocalName").val($(tr).find("td.LocalName").text());
            $("#txtViewOrder").val($(tr).find("td.ViewOrder").text());
            $("#txtChargeTypeNotes").val($(tr).find("td.Notes").text());
            $("#cbIsUsedInReceivable").prop('checked', $(tr).find('td.IsUsedInReceivable').find('input').attr('val'));
            $("#cbIsUsedInPayable").prop('checked', $(tr).find('td.IsUsedInPayable').find('input').attr('val'));
            $("#cbIsTank").prop('checked', $(tr).find('td.IsTank').find('input').attr('val'));
            $("#cbIsOcean").prop('checked', $(tr).find('td.IsOcean').find('input').attr('val'));
            $("#cbIsAir").prop('checked', $(tr).find('td.IsAir').find('input').attr('val'));
            $("#cbIsInland").prop('checked', $(tr).find('td.IsInland').find('input').attr('val'));
            $("#cbIsDefaultInQuotation").prop('checked', $(tr).find('td.IsDefaultInQuotation').find('input').attr('val'));
            $("#cbIsDefaultInOperations").prop('checked', $(tr).find('td.IsDefaultInOperations').find('input').attr('val'));
            $("#cbIsGeneralChargeType").prop('checked', $(tr).find('td.IsGeneralChargeType').find('input').attr('val'));
            $("#cbIsWarehouseChargeType").prop('checked', $(tr).find('td.IsWarehouseChargeType').find('input').attr('val'));
            $("#cbIsOperationChargeType").prop('checked', $(tr).find('td.IsOperationChargeType').find('input').attr('val'));
            $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
            //$("#cbIsAddedManually").prop('checked', $(tr).find('td.IsAddedManually').find('input').attr('val'));

            $("#btnSave").attr("onclick", "WarehousingChargeTypes_Update(false);");
            $("#btnSaveandNew").attr("onclick", "WarehousingChargeTypes_Update(true);");
}

function WarehousingChargeTypes_ClearAllControls(callback) {
    ClearAll("#ChargeTypeModal");
    $(".classAccountingOption").addClass("hide"); //show only Account tab in edit
    $(".classDisableForTank").removeAttr("disabled");
    $("#slTemplate").val("");
    $("#slPurchaseItem").val("");
    if ($("#slMeasurements option").length < 2)
        Measurements_GetList(null, null);
    if ($("#slTaxeTypes option").length < 2)
        TaxeTypes_GetList(null, null);
    if ($("#slInvoiceTypes option").length < 2)
        InvoiceTypes_GetList(null, null);
    if ($("#slTemplate option").length < 2) {
        GetListWithNameAndWhereClause(null, "/api/Template/LoadAll", "<--Select-->", "slTemplate", "ORDER BY Name", null);
        GetListWithNameAndWhereClause(null, "/api/PurchaseItem/LoadAll", "<--Select-->", "slPurchaseItem", "ORDER BY Name", null);
    }
    $("#slRevenueSubAccount").html("<option value=0>" + "<--Select-->" + "</option>");
    $("#slExpenseSubAccount").html("<option value=0>" + "<--Select-->" + "</option>");

    $("#btnSave").attr("onclick", "WarehousingChargeTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "WarehousingChargeTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

//function WarehousingChargeTypes_CheckValueIsInteger(id) {
//    debugger;
//    CheckValueIsInteger("#" + id);
//}

// WarehousingChargeTypes Region ---------------------------------------------------------------
//to fill the select boxes
//this is the NoAccess Measurements
function Measurements_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndNameAndWhereClause(pID, "/api/NoAccessMeasurements/LoadAll", "Select Measurement", "slMeasurements", " WHERE 1=1 ");
}
//to fill the select boxes
function TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Taxe Type", "slTaxeTypes");
}
//to fill the select boxes
function InvoiceTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/InvoiceTypes/LoadAll", "Select Invoice Type", "slInvoiceTypes", " ORDER BY Name ");
}
