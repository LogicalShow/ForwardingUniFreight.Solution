function ApplySelectListSearch() {
    debugger;
    $("#slFilterWarehouse").css({ "width": "100%" }).select2();
    $("#slFilterWarehouse").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");
    $("#slFilterLocation").css({ "width": "100%" }).select2();
    $("#slFilterLocation").trigger("change");
    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");
    $("#slFilterOwner").css({ "width": "100%" }).select2();
    $("#slFilterOwner").trigger("change");
    $("#srchWarehouse").css({ "width": "100%" }).select2();
    $("#srchCustomer").css({ "width": "100%" }).select2();
    $("#srchOwner").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
}
var _hasRequest = false;
function Inventory_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Inventory_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Inventory/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = _hasRequest ? pDefaults.UnEditableCompanyName == "EF" ? " where 1<>1" : " where Quantity>0" : "WHERE AvailableQuantity IS NOT NULL AND AvailableQuantity>0";//
    var pOrderBy = pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pHasRequest: _hasRequest, pBySerial:false }
    LoadView("/Warehousing/Reports/Inventory", "div-content", function () {
        if (_hasRequest) {
            $('#btnRefreshInventory').removeClass('hide');
            //$('#srchControls').removeClass('hide');
            $('#txtFilterSerial').closest('div.form-group').addClass('hide');
            $('#txtFilterChassisNumber').closest('div.form-group').addClass('hide');
            $('#txtFilterEngineNumber').closest('div.form-group').addClass('hide');
            $('#cbIsShowVehicle').closest('label').addClass('hide');
            $('#cbPrintReceiveOnly').closest('label').addClass('hide');
            $('#btn-SelectColumns').addClass('hide');
        }
        if (pDefaults.UnEditableCompanyName == "EF") {
            $('.classHideForEF').removeClass('hide');
            $('#slFilterOwner').removeAttr('onchange');
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                //var pPurchaseItem = pData[3];
                var pCustomer = pData[4];
                var pLocation = pData[5];
                FillListFromObject(null, 2, "<--Select-->", "slFilterWarehouse", pWarehouse, function () { $('#srchWarehouse').html($('#slFilterWarehouse').html()); });
                //FillListFromObject(null, 9, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, null); //Loaded separately to improve performance
                //FillListFromObject(null, 1, "<--Select-->", "slFilterLocation", pLocation, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterCustomer", pCustomer, function () { $('#srchCustomer').html($('#slFilterCustomer').html()); });
                //$("#slFilterCustomer").html($("#hReadySlCustomers").html());

                Inventory_BindTableRows(JSON.parse(pData[0]));
                ApplySelectListSearch();
            });
        if (!_hasRequest) {
            CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
                , { pWhereClause: "WHERE 1=1" }
                , function (pData) {
                    var pPurchaseItem = pData[0];
                    FillListFromObject(null, 9, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch(); });
                }
                , null, true);
        }
    
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

        if (_hasRequest) {
            $('#cbProductionDate,#cbExpirationDate,#cbPalletID,#cbPalletClass,#cbBatchNo').attr('checked', true);
        }
    },
        function () { Inventory_ClearAllControls(); },
        function () { Inventory_DeleteList(); });
}
function Inventory_BindTableRows(pInventory) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblInventory");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    if (_hasRequest) {
        $.each(pInventory, function (i, item) {
            AppendRowtoTable("tblInventory",
                ("<tr ID='" + item.ID + "' ondblclick='Inventory_FillAllControls(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                    + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                    + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                    + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                    + "<td class='Serial hide'>" + (item.Serial == 0 ? "" : item.Serial) + "</td>"
                    + "<td class='CustomerName'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                    + "<td class='OwnerName hide'>" + (item.OwnerName == 0 ? "" : item.OwnerName) + "</td>"
                    + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                    + "<td class='Quantity'>" + item.Quantity.toFixed(2) + "</td>"
                    + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity.toFixed(2) + "</td>"
                    + "<td class='AvailableQuantity hide'>" + item.AvailableQuantity.toFixed(2) + "</td>"
                    + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "<td class='ReceiveCode hide'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                    + "<td class='PalletID hide'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                    + "<td class='PalletStatusName hide'>" + (item.PalletStatusName == 0 ? "" : item.PalletStatusName) + "</td>"
                    + "<td class='PalletClassName hide'>" + (item.PalletClassName == 0 ? "" : item.PalletClassName) + "</td>"
                    + "<td class='BatchNumber hide'>" + (item.BatchNumber == 0 ? "" : item.BatchNumber) + "</td>"
                    + "<td class='ProductionDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "</td>"
                    + "<td class='ExpirationDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"
                    + "<td class='hide'><a href='#InventoryModal' data-toggle='modal' onclick='Inventory_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                    + "</td></tr>"));
        });
        $('#tblInventory .OwnerName, #tblInventory .ReceiveCode, #tblInventory .PalletID, #tblInventory .PalletStatusName, #tblInventory .PalletClassName, #tblInventory .BatchNumber, #tblInventory .ProductionDate, #tblInventory .ExpirationDate, #tblInventory .DemandedQuantity, #tblInventory .AvailableQuantity, #tblInventory .Warehouse').removeClass('hide');
        if ($('#cbIsShowSerial').is(':checked'))
            $('#tblInventory .Serial').removeClass('hide');
        else
            $('#tblInventory .Serial').addClass('hide');
    }
    else {
        $.each(pInventory, function (i, item) {
           
                AppendRowtoTable("tblInventory",
                    ("<tr ID='" + item.ID + "' ondblclick='Inventory_FillAllControls(" + item.ID + ");' class='" + (item.AvailableQuantity > 0 ? "" : "hide") + " " + (item.IsDefected? "text-danger" : "") +"'>"
                        + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                        + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                        //+ "<td class='BarCode'>" + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + "</td>"
                        + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + "</td>"
                        + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + "</td>"
                        + "<td class='CustomerName'>" + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + "</td>"
                        + "<td class='OwnerName hide'>" + (item.OwnerName == 0 || item.AvailableQuantity == 0 ? "" : item.OwnerName) + "</td>"
                        + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                        + "<td class='Quantity'>" + item.AvailableQuantity.toFixed(2) + "</td>"
                        //+ "<td class='DemandedQuantity hide'>" + (item.DemandedQuantity).toFixed(2) + "</td>"
                        + "<td class='AvailableQuantity hide'>" + (item.AvailableQuantity).toFixed(2) + "</td>"
                        //+ "<td class='Quantity'>" + (item.Quantity).toFixed(2) + "</td>"
                        + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + "</td>"
                        + "<td class='ReceiveCode hide'>" + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + "</td>"
                        + "<td class='PalletID hide'>" + (item.PalletID == 0 || item.AvailableQuantity == 0 ? "" : item.PalletID) + "</td>"
                        + "<td class='PalletStatusName hide'>" + (item.PalletStatusName == 0 || item.AvailableQuantity == 0 ? "" : item.PalletStatusName) + "</td>"
                        + "<td class='PalletClassName hide'>" + (item.PalletClassName == 0 || item.AvailableQuantity == 0 ? "" : item.PalletClassName) + "</td>"
                        + "<td class='BatchNumber hide'>" + (item.BatchNumber == 0 || item.AvailableQuantity == 0 ? "" : item.BatchNumber) + "</td>"
                        + "<td class='ProductionDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "</td>"
                        + "<td class='ExpirationDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"
                        + "<td class='hide'><a href='#InventoryModal' data-toggle='modal' onclick='Inventory_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                        + "</td></tr>"));
            
        
        });

        $('#tblInventory .ReceiveCode, #tblInventory .PalletID').removeClass('hide');
    }
    
    ApplyPermissions();
    BindAllCheckboxonTable("tblInventory", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblInventory>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Inventory_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = Inventory_GetWhereClause(pFilterOptions);
    if (_hasRequest && pWhereClause.trim() == 'where Quantity>0') {
        swal("Please, select filter");
        return;
    }
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pHasRequest: _hasRequest, pBySerial: $('#cbIsShowSerial').is(':checked') }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Inventory_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblInventory>tbody>tr", $("#txt-Search").val().trim());
}
function Inventory_GetWhereClause(pFilterOptions) {
    debugger;
    //var pWhereClause = "WHERE IsFinalized=1 AND IsExcluded=0";
    var pWhereClause = _hasRequest ? " where Quantity>0" : "WHERE AvailableQuantity IS NOT NULL AND AvailableQuantity>0";//
    if (pFilterOptions) {
        //if ($("#txtFilterBarCode").val().trim() != "")
        //    pWhereClause += "AND (BarCode=N'" + $("#txtFilterBarCode").val().trim().toUpperCase() + "')" + "\n";
        if ($("#slFilterWarehouse option:selected").length > 0)
            pWhereClause += "AND (WarehouseID in (" + $("#slFilterWarehouse").val().toString() + "))" + "\n";
        if ($("#slFilterLocation option:selected").length > 0)
            pWhereClause += "AND (LocationID in (" + $("#slFilterLocation").val().toString() + "))" + "\n";
        if ($("#txtFilterReceiveCode").val().trim() != "")
            pWhereClause += "AND (ReceiveCode=N'" + $("#txtFilterReceiveCode").val().trim().toUpperCase() + "')" + "\n";
        if ($("#slFilterPurchaseItem option:selected").length > 0)
            pWhereClause += "AND (PurchaseItemID in (" + $("#slFilterPurchaseItem").val().toString() + ") )" + "\n";
        if ($("#slFilterCustomer option:selected").length > 0)
            pWhereClause += "AND (CustomerID in (" + $("#slFilterCustomer").val().toString() + ") )" + "\n";
        if ($("#slFilterOwner option:selected").length > 0)
            pWhereClause += "AND (OwnerID in (" + $("#slFilterOwner").val().toString() + ") )" + "\n";
        if ($("#txtFilterPalletID").val().trim() != "")
            pWhereClause += "AND (PalletID=N'" + $("#txtFilterPalletID").val().trim().toUpperCase() + "'  )" + "\n";
        if (isValidDate($("#txtFilterFromReceiveDate").val().trim(), 1)) {
            if ($("#txtFilterFromReceiveDate").val() != null && $("#txtFilterFromReceiveDate").val() != "")
                pWhereClause += " AND (ReceiveDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromReceiveDate").val()) + " 00:00:00.000')" + "\n";
        }
        if (isValidDate($("#txtFilterToReceiveDate").val().trim(), 1)) {
            if ($("#txtFilterToReceiveDate").val() != null && $("#txtFilterToReceiveDate").val() != "")
                pWhereClause += " AND (ReceiveDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToReceiveDate").val()) + " 23:59:59.999')" + "\n";
        }


        if ($("#txtFilterSerial").val().trim() != "")
            pWhereClause += "AND (Serial=N'" + $("#txtFilterSerial").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFilterLotNo").val().trim() != "")
            pWhereClause += "AND (LotNo=N'" + $("#txtFilterLotNo").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFilterChassisNumber").val().trim() != "")
            pWhereClause += "AND (ChassisNumber=N'" + $("#txtFilterChassisNumber").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFilterEngineNumber").val().trim() != "")
            pWhereClause += "AND (EngineNumber=N'" + $("#txtFilterEngineNumber").val().trim().toUpperCase() + "')" + "\n";
        if (isValidDate($("#txtFromDate").val().trim(), 1)) {
            if ($("#txtFromDate").val() != null && $("#txtFromDate").val() != "")
                pWhereClause += " AND (ExpireDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val()) + " 00:00:00.000')" + "\n";
        }
        if (isValidDate($("#txtToDate").val().trim(), 1)) {
            if ($("#txtToDate").val() != null && $("#txtToDate").val() != "")
                pWhereClause += " AND (ExpireDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val()) + " 23:59:59.999')" + "\n";
        }
    }
    //search controls
    else {
        if ($("#srchWarehouse option:selected").length > 0) {
            pWhereClause += " and (WarehouseID in (" + $("#srchWarehouse").val().toString() + "))";          
        }
        if ($("#srchLocation").val().trim() != "") {
            var vals = IsNull($("#srchLocation").val(), '').split(',');
            pWhereClause += " and (LocationCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR LocationCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchItemCode").val().trim() != "") {
            var vals = IsNull($("#srchItemCode").val(), '').split(',');
            pWhereClause += " and (PurchaseItemCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PurchaseItemCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchItemName").val().trim() != "") {
            var vals = IsNull($("#srchItemName").val(), '').split(',');
            pWhereClause += " and (PurchaseItemName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PurchaseItemName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchSerial").val().trim() != "") {
            var vals = IsNull($("#srchSerial").val(), '').split(',');
            pWhereClause += " and (Serial ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Serial";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCustomer option:selected").length > 0) {
            pWhereClause += " and (CustomerID in (" + $("#srchCustomer").val().toString() + "))";          
        }
        if ($("#srchOwner option:selected").length > 0) {
            pWhereClause += " and (OwnerID in (" + $("#srchOwner").val().toString() + "))";          
        }
        if ($("#srchDate").val().trim() != "") {
            var vals = IsNull($("#srchDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ReceiveDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ReceiveDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchUnit").val().trim() != "") {
            var vals = IsNull($("#srchUnit").val(), '').split(',');
            pWhereClause += " and (PackageTypeName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PackageTypeName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchReceive").val().trim() != "") {
            var vals = IsNull($("#srchReceive").val(), '').split(',');
            pWhereClause += " and (ReceiveCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ReceiveCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchPalletID").val().trim() != "") {
            var vals = IsNull($("#srchPalletID").val(), '').split(',');
            pWhereClause += " and (PalletID ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PalletID";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchPalletStatus").val().trim() != "") {
            var vals = IsNull($("#srchPalletStatus").val(), '').split(',');
            pWhereClause += " and (PalletStatusName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PalletStatusName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchPalletClass").val().trim() != "") {
            var vals = IsNull($("#srchPalletClass").val(), '').split(',');
            pWhereClause += " and (PalletClassName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PalletClassName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchBatch").val().trim() != "") {
            var vals = IsNull($("#srchBatch").val(), '').split(',');
            pWhereClause += " and (BatchNumber ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR BatchNumber";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchProduction").val().trim() != "") {
            var vals = IsNull($("#srchProduction").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR (Format(Cast(ProductionDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchExpiration").val().trim() != "") {
            var vals = IsNull($("#srchExpiration").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
    }
   


    return pWhereClause;
}
function Inventory_Print(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pWhereClause = Inventory_GetWhereClause(true);
    var pParametersWithValues = {
        pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 99999
        , pWhereClause: pWhereClause
        , pOrderBy: pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode"
        , pIsShowSerial: $('#cbIsShowSerial').is(':checked')
        , pIsShowSerial: $("#cbIsShowExpireDate").prop("checked") || $("#cbIsShowSerial").prop("checked") || $("#cbIsShowLotNo").prop("checked") ? true : false
        , pHasRequest: _hasRequest
    };
    CallGETFunctionWithParameters("/api/Inventory/GetPrintedData"
        , pParametersWithValues
        , function (pData) {
            var pReportRows = JSON.parse(pData[0]);
            if (pReportRows.length > 0) //pRecordsExist
                Inventory_DrawReport(pData, pOutputTo);
            else
                swal(strSorry, "No records are found.");
            FadePageCover(false);
        });
}
$('input[type=checkbox][name=cbIsSearchExpireDate]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#txtFromDate").removeAttr("disabled");
        $("#txtToDate").removeAttr("disabled");
    }
    else {
        $("#txtFromDate").attr("disabled", "disabled");
        $("#txtToDate").attr("disabled", "disabled");
    }
});
function Inventory_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[0]);
    var pReportTitle = "Inventory";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";

    if (_hasRequest) {
        pTablesHTML += '                         <table id="tblInventoryReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
        pTablesHTML += '                                     <th>Warehouse</th>';
        pTablesHTML += '                                     <th>Location</th>';
        pTablesHTML += '                                     <th>Prod.Code</th>';
        pTablesHTML += '                                     <th>Prod.Desc</th>';
        if ($('#cbIsShowSerial').is(':checked'))
            pTablesHTML += '                                     <th>Serial</th>';
        pTablesHTML += '                                     <th>Customer</th>';
        pTablesHTML += '                                     <th>Owner</th>';
        pTablesHTML += '                                     <th>Rec.Date</th>';
        pTablesHTML += '                                     <th>Qty</th>';
        pTablesHTML += '                                     <th>Allocated</th>';
        pTablesHTML += '                                     <th>Available</th>';
        pTablesHTML += '                                     <th>UQ</th>';
        pTablesHTML += '                                     <th>Rec.Code</th>';
        pTablesHTML += '                                     <th>Pallet ID</th>';
        pTablesHTML += '                                     <th>Pallet Status</th>';
        pTablesHTML += '                                     <th>Pallet Class</th>';
        pTablesHTML += '                                     <th>Batch No</th>';
        pTablesHTML += '                                     <th>Production Date</th>';
        pTablesHTML += '                                     <th>Expiration Date</th>';
       
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        $.each((pReportRows), function (i, item) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td>' + (item.WarehouseName == 0 ? "" : item.WarehouseName) + '</td>';
                pTablesHTML += '                             <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + '</td>';
            if ($('#cbIsShowSerial').is(':checked'))
                pTablesHTML += '                                 <td>' + (item.Serial == 0 ? "" : item.Serial) + '</td>';
            pTablesHTML += '                                 <td>' + (item.CustomerName == 0 ? "" : item.CustomerName) + '</td>';
            pTablesHTML += '                                 <td>' + (item.OwnerName == 0 ? "" : item.OwnerName) + '</td>';
            pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
            pTablesHTML += '                                 <td>' + item.Quantity.toFixed(2) + '</td>';
            pTablesHTML += '                                 <td>' + item.DemandedQuantity.toFixed(2) + '</td>';
            pTablesHTML += '                                 <td class="AvailableQuantity">' + item.AvailableQuantity.toFixed(2) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + '</td>';
            pTablesHTML += '                                 <td>' + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PalletID == 0 ? "" : item.PalletID) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PalletStatusName == 0 ? "" : item.PalletStatusName) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PalletClassName == 0 ? "" : item.PalletClassName) + '</td>';
            pTablesHTML += '                                 <td>' + (item.BatchNumber == 0 ? "" : item.BatchNumber) + '</td>';
            pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + '</td>';
            pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
         
            pTablesHTML += '                             </tr>';
        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
        /*********************Append table summaries*************************/
        var _TotalQuantity = GetColumnSum("tblInventoryReport", "AvailableQuantity");
        var pTableSummary = "";
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td class="font-bold">Total Quantity : ' + _TotalQuantity + '</td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
        pTableSummary += '                                     <td></td>';
       
        pTableSummary += '                                     </tr>';
            $("#tblInventoryReport" + " tbody").append(pTableSummary);
        if (pOutputTo == "Excel") {
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInventoryReport", "Inventory");
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            ReportHTML += $("#hExportedTable").html(); 
            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
    else {
        
        //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblInventoryReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
        if ($("#cbLocation").prop("checked"))
            pTablesHTML += '                                     <th>Location</th>';
        if ($("#cbProdCode").prop("checked"))
            pTablesHTML += '                                     <th>Prod.Code</th>';
        if ($("#cbProdName").prop("checked"))
            pTablesHTML += '                                     <th>Prod.Name</th>';
        if ($("#cbHsCode").prop("checked"))
            pTablesHTML += '                                     <th>Hs Code</th>';
        if ($("#cbCommodity").prop("checked"))
            pTablesHTML += '                                     <th>Commodity</th>';
        if ($("#cbRecCode").prop("checked"))
            pTablesHTML += '                                     <th>Rec.Code</th>';
        if ($("#cbClient").prop("checked"))
            pTablesHTML += '                                     <th>Client</th>';
        if ($("#cbRecDate").prop("checked"))
            pTablesHTML += '                                     <th>Rec.Date</th>';
        if ($("#cbAvailableQty").prop("checked"))
            pTablesHTML += '                                     <th>Available.Qty</th>';
        if ($("#cbAllocQty").prop("checked") && ['NIL','EXP'].includes(pDefaults.UnEditableCompanyName)
            && (!$("#cbIsShowExpireDate").prop("checked") && !$("#cbIsShowSerial").prop("checked") && !$("#cbIsShowLotNo").prop("checked") && !$("#cbIsShowVehicle").prop("checked"))
        )
            pTablesHTML += '                                     <th>Alloc.Qty</th>';
        if ($("#cbBarCode").prop("checked"))
            pTablesHTML += '                                     <th>Bar Code</th>';
        if ($("#cbImportedBy").prop("checked"))
            pTablesHTML += '                                     <th>Imported By</th>';
        if ($("#cbArea").prop("checked"))
            pTablesHTML += '                                     <th>Area</th>';
        if ($("#cbPalletID").prop("checked"))
            pTablesHTML += '                                     <th>PalletID</th>';
        if ($("#cbPalletClass").prop("checked"))
            pTablesHTML += '                                     <th>Pallet Class</th>';
        if ($("#cbBatchNo").prop("checked"))
            pTablesHTML += '                                     <th>Batch No.</th>';
        if ($("#cbProductionDate").prop("checked"))
            pTablesHTML += '                                     <th>Production Date</th>';
        if ($("#cbExpirationDate").prop("checked"))
            pTablesHTML += '                                     <th>Expiration Date</th>';
        if ($("#cbWeight").prop("checked"))
            pTablesHTML += '                                     <th>Weight</th>';
        if ($("#cbPO").prop("checked"))
            pTablesHTML += '                                     <th>PO</th>';
        if ($("#cbFile").prop("checked"))
            pTablesHTML += '                                     <th>File</th>';
        if ($("#cbInvoice").prop("checked"))
            pTablesHTML += '                                     <th>Invoice</th>';
        if ($("#cbContainerNumber").prop("checked"))
            pTablesHTML += '                                     <th>Container Number</th>';
        if ($("#cbIsShowSerial").prop("checked"))
            pTablesHTML += '                                     <th>Serial</th>';
        if ($("#cbIsShowLotNo").prop("checked"))
            pTablesHTML += '                                     <th>Lot No</th>';
        if ($("#cbIsShowVehicle").prop("checked")) {
            pTablesHTML += '                                     <th>Chassis</th>';
            pTablesHTML += '                                     <th>Engine</th>';
            pTablesHTML += '                                     <th>OCN</th>';
            pTablesHTML += '                                     <th>Model</th>';
        }
        if ($("#cbExtra1").prop("checked"))
            pTablesHTML += '                                     <th>Extra1</th>';
        if ($("#cbExtra2").prop("checked"))
            pTablesHTML += '                                     <th>Extra2</th>';
        if ($("#cbExtra3").prop("checked"))
            pTablesHTML += '                                     <th>Extra3</th>';
        if ($("#cbExtra4").prop("checked"))
            pTablesHTML += '                                     <th>Extra4</th>';
        if ($("#cbExtra5").prop("checked"))
            pTablesHTML += '                                     <th>Extra5</th>';
        if ($("#cbExtra6").prop("checked"))
            pTablesHTML += '                                     <th>Extra6</th>';
        if ($("#cbExtra7").prop("checked"))
            pTablesHTML += '                                     <th>Extra7</th>';
        if ($("#cbExtra8").prop("checked"))
            pTablesHTML += '                                     <th>Extra8</th>';
        if ($("#cbExtra9").prop("checked"))
            pTablesHTML += '                                     <th>Extra9</th>';

        //if (pDefaults.UnEditableCompanyName == "EXP") {
        //    pTablesHTML += '                                     <th>Batch</th>';
        //    pTablesHTML += '                                     <th>Expiration</th>';
        //    pTablesHTML += '                                     <th>ImportedBy</th>';
        //    //pTablesHTML += '                                     <th>Wgt</th>';
        //}
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        var _AddedLocationCode = null;
        var _TotalQuantity = 0;//GetColumnSum("tblInventoryReport", "AvailableQuantity");
        $.each((pReportRows), function (i, item) {
          
                //if ($("#cbIsShowSerial").prop("checked")
                //    && _AddedLocationCode != item.LocationCode
                //    && item.NumberOfAvailableSerials > 0
                //    && item.AvailableQuantity != item.NumberOfAvailableSerials) {
                //    pTablesHTML += '                             <tr style="font-size:95%;">';
                //    pTablesHTML += '                                 <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
                //    //pTablesHTML += '                                 <td>' + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + '</td>';
                //    pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                //    pTablesHTML += '                                 <td class="hide">' + (item.PalletID == 0 || item.AvailableQuantity == 0 ? "" : item.PalletID) + '</td>';
                //    pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.AvailableQuantity - item.NumberOfAvailableSerials).toFixed(2) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + '</td>';
                //    pTablesHTML += '                                 <td>' + ''/*(item.Serial == 0 ? "" : item.Serial)*/ + '</td>';
                //    _AddedLocationCode = item.LocationCode;
            //}
            _TotalQuantity += (item.Serial == 0 ? item.AvailableQuantity : 1);
            if (item.AvailableQuantity > 0) {
                pTablesHTML += '                             <tr style="font-size:95%;" class="' + (item.AvailableQuantity > 0 ? "" : "hide") + " " + (item.IsDefected? "text-danger" : "") + '">';
                if ($("#cbLocation").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
                if ($("#cbProdCode").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + '</td>';
                if ($("#cbProdName").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + '</td>';
                if ($("#cbHsCode").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.HSCode == 0 ? "" : item.HSCode) + '</td>';
                if ($("#cbCommodity").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + '</td>';
                if ($("#cbRecCode").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + '</td>';
                if ($("#cbClient").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + '</td>';
                if ($("#cbRecDate").prop("checked"))
                    pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                if ($("#cbAvailableQty").prop("checked")) {
                    if ($("#cbIsShowExpireDate").prop("checked") || $("#cbIsShowSerial").prop("checked") || $("#cbIsShowLotNo").prop("checked") || $("#cbIsShowVehicle").prop("checked"))
                        pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.Serial == 0 ? (item.AvailableQuantity).toFixed(2) : '1.00') + '</td>';
                    else
                        pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.AvailableQuantity).toFixed(2) + '</td>';
                }
                if ($("#cbAllocQty").prop("checked") && ['NIL', 'EXP'].includes(pDefaults.UnEditableCompanyName)
                    && (!$("#cbIsShowExpireDate").prop("checked") && !$("#cbIsShowSerial").prop("checked") && !$("#cbIsShowLotNo").prop("checked") && !$("#cbIsShowVehicle").prop("checked")))
                    pTablesHTML += '                                 <td class="AllocatedQuantity">' + (item.AllocatedQuantity).toFixed(2) + '</td>';
                if ($("#cbBarCode").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.BarCode == 0 ? "" : item.BarCode) + '</td>';
                if ($("#cbImportedBy").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.ImportedBy == 0 ? "" : item.ImportedBy) + '</td>';
                if ($("#cbArea").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.Area == 0 ? "" : item.Area) + '</td>';
                if ($("#cbPalletID").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.PalletID == 0 ? "" : item.PalletID) + '</td>';
                if ($("#cbPalletClass").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.PalletClassName == 0 ? "" : item.PalletClassName) + '</td>';
                if ($("#cbBatchNo").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.BatchNo == 0 ? "" : item.BatchNo) + '</td>';
                if ($("#cbProductionDate").prop("checked"))
                    pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + '</td>';
                if ($("#cbExpirationDate").prop("checked"))
                    pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                if ($("#cbWeight").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.Weight == 0 ? "" : item.Weight) + '</td>';
                if ($("#cbPO").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.PO == 0 ? "" : item.PO) + '</td>';
                if ($("#cbFile").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.DetailFile == 0 ? "" : item.DetailFile) + '</td>';
                if ($("#cbInvoice").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.Invoice == 0 ? "" : item.Invoice) + '</td>';
                if ($("#cbContainerNumber").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + '</td>';
                if ($("#cbIsShowSerial").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.Serial == 0 ? "" : item.Serial) + '</td>';
                if ($("#cbIsShowLotNo").prop("checked"))
                    pTablesHTML += '                                 <td>' + (item.LotNo == 0 ? "" : item.LotNo) + '</td>';
                if ($("#cbIsShowVehicle").prop("checked")) {
                    pTablesHTML += '                                 <td>' + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + '</td>';
                    pTablesHTML += '                                 <td>' + (item.EngineNumber == 0 ? "" : item.EngineNumber) + '</td>';
                    pTablesHTML += '                                 <td>' + (item.OCNCode == 0 ? "" : item.OCNCode) + '</td>';
                    pTablesHTML += '                                 <td>' + (item.Model == 0 ? "" : item.Model) + '</td>';
                }
                if ($("#cbExtra1").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra1 ? item.Extra1 : '') + '</td>';
                if ($("#cbExtra2").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra2 ? item.Extra2 : '') + '</td>';
                if ($("#cbExtra3").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra3 ? item.Extra3 : '') + '</td>';
                if ($("#cbExtra4").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra4 ? item.Extra4 : '') + '</td>';
                if ($("#cbExtra5").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra5 ? item.Extra5 : '') + '</td>';
                if ($("#cbExtra6").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra6 ? item.Extra6 : '') + '</td>';
                if ($("#cbExtra7").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra7 ? item.Extra7 : '') + '</td>';
                if ($("#cbExtra8").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra8 ? item.Extra8 : '') + '</td>';
                if ($("#cbExtra9").prop("checked"))
                    pTablesHTML += '                                         <td>' + (item.Extra9 ? item.Extra9 : '') + '</td>';
                //if (pDefaults.UnEditableCompanyName == "EXP") {
                //    pTablesHTML += '                                 <td>' + (item.BatchNumber == 0 ? "" : item.BatchNumber) + '</td>';
                //    pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                //    pTablesHTML += '                                 <td>' + (item.ImportedBy == 0 ? "" : item.ImportedBy) + '</td>';
                //    //pTablesHTML += '                                 <td>' + (item.WeightInTons == 0 ? "" : item.WeightInTons) + '</td>';
                //}
                pTablesHTML += '                             </tr>';
            }
    
            
  
        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
        /*********************Append table summaries*************************/
        debugger;
        var colCount = $("#hExportedTable table thead tr:eq(0) th").length;
        var pTableSummary = "";
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td class="font-bold" colspan=' + colCount+'>Total Quantity : ' + _TotalQuantity + '</td>';
        if (pOutputTo == "Excel") {
            for (var i = 1; i < colCount; i++) {
                pTableSummary += '                                     <td></td>';
            }
            //pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        }
        pTableSummary += '                                     </tr>';
        if (!$("#cbIsShowVehicle").prop("checked"))
            $("#tblInventoryReport" + " tbody").append(pTableSummary);
        if (pOutputTo == "Excel") {
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblInventoryReport", "Inventory");
        }
        else {
            var mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
            ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
            //                                                                            ? "All Dates"
            //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            //ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += $("#hExportedTable").html(); //pTablesHTML;

            //ReportHTML += '                     </div>';//of table-responsive
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }

}

function Inventory_SelectColumns() {
    debugger;
    jQuery("#ModalSelectColumns").modal("show");
}

function LoadOwners(pMode, pSelectClient, pSelectOwner) {
    debugger;
    if (!pSelectOwner)
        pSelectOwner = 'slOwner';
    $('#' + pSelectOwner + '').html('');
    $('#' + pSelectOwner + '').val('').change();

    if (!pSelectClient)
        pSelectClient = 'slCustomer';

    var customerId = $('#' + pSelectClient + '').val();
    if (IsNull(customerId, '0') == '0')
        return;
    var whereClause = "where CustomerID in (" + customerId.toString() + ")";
    if (pMode == 'New')
        FadePageCover(true);
    CallGETFunctionWithParameters("/api/Owners/LoadAll"
        , { pWhereClause: whereClause }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 2, "<--Select-->", pSelectOwner, pData, null);
            LoadItems();
        }
        , null, false);
}
function LoadItems(pSelectCustomerId, pSelectOwnerId) {
    debugger;
    if (!pSelectCustomerId)
        pSelectCustomerId = 'slCustomer';
    if (!pSelectOwnerId)
        pSelectOwnerId = 'slOwner';
    
    $('#slFilterPurchaseItem').html('');
    var customerId = $('#' + pSelectCustomerId + '').val();
    var ownerId = $('#' + pSelectOwnerId + '').val();
    if (_hasRequest && IsNull(customerId, '0') == '0' && IsNull(ownerId, '0') == '0')
        return;

    var whereClause = "where 1=1";
    if (_hasRequest) {
    whereClause = "where ClientID in (" + customerId.toString() + ")";
    if (ownerId)
        whereClause += " and OwnerID in (" + ownerId.toString() + ")";
    }

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
        , { pWhereClause: whereClause }
        , function (pPurchaseItem) {
            FadePageCover(false);
            FillListFromObject(null, 2, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, null);
        }
        , null, false);
}

function LoadLocations() {
    $('#slFilterLocation').html('');
    var warehouseId = $('#slFilterWarehouse').val() > 0 ? $('#slFilterWarehouse').val() : 0;
    if (!(warehouseId > 0))
        return;

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAll"
        , { pRowLocationWhereClause: 'where WarehouseID=' + warehouseId, pOrderBy:'Code' }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 1, "<--Select-->", "slFilterLocation", pData, null);
        }
        , null, false);
}