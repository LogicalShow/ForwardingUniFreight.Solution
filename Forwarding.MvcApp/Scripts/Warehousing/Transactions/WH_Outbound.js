
var maxReceiveDetailsSerialIDInTable = 0; //used for when adding new row then make td control names unique
var _isRequest;
var _hasRequest;
var _hideActual = '';
var _itemsStockUnits = [];
var _details = [];
var _pickupLocationId = 0;
function Pickup_Initialize(pCallback) {
    debugger;

    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;

    if (glbCallingControl == 'WH_OutboundRequest') {
        _isRequest = true;
        _hideActual = 'hide';
    }
    else {
        _isRequest = false;
        _hideActual = '';
    }

    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Pickup_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Outbound/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = _isRequest ? "Where 1=1" : "Where StatusID>" + constPickupStatusCreated + " and StatusID<" + constPickupStatusCanceled + "";
    if (_hasRequest)
        pWhereClause += " and WarehouseID in (select WarehouseID from WH_UsersWarehouses where UserID=" + pLoggedUser.ID + ")";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadView("/Warehousing/Transactions/WH_Outbound", "div-content", function () {

        if ($('#hf_CanDelete').val() == 1)
            $('#btnSaveHeader').removeClass('hide');
        else
            $('#btnSaveHeader').addClass('hide');

        ApplySelectListSearch_OnlyChange();

        if (_isRequest) {
            $(".FormName").text("Outbound Request");
            $('#btn-Load,#btn-PrintPickup').removeClass('hide');
            $('div.OrderUpload').removeClass('hide');
        }
        else {
            $('#btn-Pick').removeClass('hide');
            $('#btn-PrintPickupLoading').removeClass('hide');
            if (_hasRequest)
                $('#btn-Release, #btn-Cancel, #btn-AddPickupDetails, #btnImportExcel, #ExcelPickupItems, #btnPickupDetailsTemplate').addClass('hide');
            else
                $('#btn-Load, #btn-Release, #btn-Cancel, #btnImportExcel, #ExcelPickupItems, #btnPickupDetailsTemplate').addClass('hide');
        }
        if (_hasRequest) {
            $('#txtCode').siblings('label').text('Order Ref');
            $('#slPersonInCharge').closest('div.form-group').addClass('hide');
            $('#slBillTo').closest('div.form-group').addClass('hide');
            $('#slEndUser').closest('div.form-group').addClass('hide');
            $('#slOperation').closest('div.form-group').addClass('hide');
            $('#txtRMANumber').closest('div.form-group').addClass('hide');
            $('#txtRequiredDate').closest('div.form-group').addClass('hide');
            $('#slEquipment').closest('div.form-group').addClass('hide');

            $('#div-search-controls').addClass('hide');
            $('#srchControls').removeClass('hide');
            //$('#tblPickupDetailsLocation .Target').removeClass('hide');
        }
        else {
            $('#div-search-controls').removeClass('hide');
            $('#srchControls').addClass('hide');
        }

        if (!_isRequest)
            $('#slFilterStatus option[value=10]').remove();

        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });

        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pCustomer = pData[3];
                var pOperation = pData[4];
                var pEquipment = pData[5];
                var pServices = pData[6];

                FillListFromObject(pLoggedUser.WarehouseID, 2, "<--Select-->", "slWarehouse", pWarehouse, function () { $('#slFilterWarehouse,#slWarehouseTo').html($('#slWarehouse').html()); });
                //FillListFromObject(null, 9, "<--Select-->", "slPickupDetailsPurchaseItem", pPurchaseItem, null);
                FillListFromObject(null, 2, "<--Select-->", "slCustomer", pCustomer, function () { $("#slCustomerForClearWithItems").html($("#slCustomer").html()); });
                //FillListFromObject(null, 1, "<--Select-->"/*pStrFirstRow*/, "slOperation", pOperation, null);
                //FillListFromObject(null, 1, "<--Select-->"/*pStrFirstRow*/, "slEquipment", pEquipment, null);
                FillListFromObject(null, 2, "< --Select-->", "slServices", pServices, null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                $("#slBillTo").html($("#hReadySlCustomers").html());
                $("#slEndUser").html($("#hReadySlCustomers").html());
                $("#slFilterCustomer").html($("#hReadySlCustomers").html());
                Pickup_BindTableRows(JSON.parse(pData[0]));
                ApplySelectListSearch();
                if (pCallback)
                    pCallback();
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Pickup_ClearAllControls(); },
        function () { Pickup_DeleteList(); });
}
function Pickup_BindTableRows(pPickup, pIsPDIModal) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPickup");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var CopyText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' > <i class='fa fa-repeat' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pPickup, function (i, item) {
        AppendRowtoTable("tblPickup",
            ("<tr ID='" + item.ID + "' ondblclick='Pickup_FillAllControls(" + item.ID + ");' class='" + (item.StatusID == constPickupStatusFinalized ? "text-primary" : item.StatusID == constPickupStatusCanceled ? "text-danger" : "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='OwnerName'>" + item.OwnerName + "</td>"
                //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
                //+ "<td class='ToDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
                //+ "<td class='StorageLimit hide'>" + item.StorageLimit + "</td>"
                //+ "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
                //+ "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
                //+ "<td class='IsByPallet hide'> <input type='checkbox' id='cbIsByPallet" + item.ID + "' disabled='disabled' " + (item.IsByPallet ? " checked='checked' " : "") + " /></td>"
                //+ "<td class='NumberOfPallets hide'>" + item.NumberOfPallets + "</td>"
                //+ "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                //+ "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='OrderDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + "</td>"
                + "<td class='RequiredDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.RequiredDate))) + "</td>"
                + "<td class='StatusID hide'>" + item.StatusID + "</td>"
                + "<td class='Status'>" + item.StatusName + "</td>"
                + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                + "<td class='CreatorName'>" + item.CreatorName + "</td>"
                + "<td class='ModificationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ModificationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate))) + "</td>"
                + "<td class='ModificatorName'>" + item.ModificatorName + "</td>"
                + "<td class='FinalizeDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + "</td>"
                + "<td class='FinalizeUserName'>" + item.FinalizeUserName + "</td>"
                + "<td class='Notes'>" + item.Notes + "</td>"
                + "<td class='RMANumber hide'>" + item.RMANumber + "</td>"
                + "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class='CopyOrder'><a href='javascript:void(0)' onclick='CopyOrder(" + item.ID + ");' " + CopyText + "</a></td>"
                + "<td class='hide'><a href='#PickupModal' data-toggle='modal' onclick='Pickup_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPickup", "ID");
    CheckAllCheckbox("ID");
    if (glbCallingControl == "WarehousingPickup" || glbCallingControl == "WH_OutboundRequest" || glbCallingControl == "WH_Outbound")
        HighlightText("#tblPickup>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Pickup_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = Pickup_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Pickup_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblPickup>tbody>tr", $("#txt-Search").val().trim());
}
function Pickup_GetWhereClause(pFilterOptions) {
    debugger;
    var pWhereClause = !_hasRequest || _isRequest ? "Where 1=1" : "Where StatusID>" + constPickupStatusCreated + " and StatusID<" + constPickupStatusCanceled + "\n";
    if (_hasRequest)
        pWhereClause += " and WarehouseID in (select WarehouseID from WH_UsersWarehouses where UserID=" + pLoggedUser.ID + ")";
    //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "")
            pWhereClause += "AND Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        if (IsNull($("#slFilterWarehouse").val(), '') != "")
            pWhereClause += "AND WarehouseID in (" + $("#slFilterWarehouse").val().toString() + ")\n";
        if (IsNull($("#slFilterStatus").val(), '') != "")
            pWhereClause += "AND StatusID in (" + $("#slFilterStatus").val().toString() + ")\n";
        if ($('#txtFromDate').val().trim() != '')
            pWhereClause += "AND CreationDate >= '" + ConvertDateFormat($("#txtFromDate").val().trim()) + "'\n";
        if ($('#txtToDate').val().trim() != '')
            pWhereClause += "AND Cast(CreationDate as date) <= '" + ConvertDateFormat($("#txtToDate").val().trim()) + "'\n";
        if (IsNull($("#slFilterCustomer").val(), '') != "")
            pWhereClause += "AND CustomerID in (" + $("#slFilterCustomer").val().toString() + ")\n";
        if (IsNull($("#slFilterOwner").val(), '') != "")
            pWhereClause += "AND OwnerID in (" + $("#slFilterOwner").val().toString() + ")\n";
        if (IsNull($("#slFilterPurchaseItem").val(), '') != "")
            pWhereClause += "AND (SELECT COUNT(1) FROM WH_PickupDetails PD_Temp WHERE vwWH_Pickup.ID=PD_Temp.PickupID AND PD_Temp.PurchaseItemID in (" + $("#slFilterPurchaseItem").val().toString() + ")) > 0 " + "\n";
    }
    //search controls
    else {
        if ($("#srchCode").val().trim() != "") {
            var vals = IsNull($("#srchCode").val(), '').split(',');
            pWhereClause += " and (Code ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Code";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchWarehouse").val().trim() != "") {
            var vals = IsNull($("#srchWarehouse").val(), '').split(',');
            pWhereClause += " and (WarehouseName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR WarehouseName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCustomer").val().trim() != "") {
            var vals = IsNull($("#srchCustomer").val(), '').split(',');
            pWhereClause += " and (CustomerName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR CustomerName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchOwner").val().trim() != "") {
            var vals = IsNull($("#srchOwner").val(), '').split(',');
            pWhereClause += " and (OwnerName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR OwnerName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchOrderDate").val().trim() != "") {
            var vals = IsNull($("#srchOrderDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(OrderDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(OrderDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchRequiredDate").val().trim() != "") {
            var vals = IsNull($("#srchRequiredDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(RequiredDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(RequiredDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchStatus").val()) {
            var vals = IsNull($("#srchStatus").val(), '').toString().split(',');
            pWhereClause += " and (StatusID ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR StatusID";
                pWhereClause += " = " + vals[i];
            }
            pWhereClause += ")";
        }
        if ($("#srchCreation").val().trim() != "") {
            var vals = IsNull($("#srchCreation").val(), '').split(',');
            pWhereClause += " and (Format(Cast(CreationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR (Format(Cast(CreationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCreator").val().trim() != "") {
            var vals = IsNull($("#srchCreator").val(), '').split(',');
            pWhereClause += " and (CreatorName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR CreatorName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchModification").val().trim() != "") {
            var vals = IsNull($("#srchModification").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ModificationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR (Format(Cast(ModificationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchModificator").val().trim() != "") {
            var vals = IsNull($("#srchModificator").val(), '').split(',');
            pWhereClause += " and (ModificatorName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ModificatorName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchFinalizeDate").val().trim() != "") {
            var vals = IsNull($("#srchFinalizeDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(FinalizeDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(FinalizeDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchFinalizeUserName").val().trim() != "") {
            var vals = IsNull($("#srchFinalizeUserName").val(), '').split(',');
            pWhereClause += " and (FinalizeUserName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR FinalizeUserName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchNotes").val().trim() != "") {
            var vals = IsNull($("#srchNotes").val(), '').split(',');
            pWhereClause += " and (Notes ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Notes";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
    }
    return pWhereClause;
}
function ConfigureTabs(pMode) {
    if (pMode == 'new')
        $('.ExtraServices').addClass('hide');
    else
        $('.ExtraServices').removeClass('hide');
    $('.ExtraServices').removeClass('active');
    $('.PickupDetails').addClass('active');
    $('.PickupDetails').addClass('in');

    parent.strBindTableRowsFunctionName = "ReceiveDetails_BindTableRows";
}
function Pickup_ClearAllControls(pPDIReceiveDetailsID) {
    debugger;


    $("#tblPickupDetails tbody").html("");
    $("#tblExtraServices tbody").html("");
    $("#slPersonInCharge").html("<option value=''><--Select--></option>");
    $(".classDisableForDetails").removeAttr("disabled");
    $("#slWarehouse").removeAttr("disabled");
    //$("#lblPickupMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblPickupMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#PickupModal");
    ClearAll("#PickupPDIModal");
    jQuery("#PickupModal").modal("show");
    if (glbCallingControl == "PDI")
        $("#hPDIReceiveDetailsID").val(pPDIReceiveDetailsID);
    $("#slCustomer").html($("#slCustomerForClearWithItems").html());
    $("#txtOrderDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtRequiredDate").val($("#txtOrderDate").val());
    $(".classDisableForFinalized").removeAttr("disabled");

    ApplySelectListSearch_OnlyChange();
    $("#btnSave").attr("onclick", "Pickup_Save(false);");
    $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (_isRequest) {
        $('#txtStatus').attr('val', constPickupStatusCreated);
        $('#txtStatus').val('CREATED');
        //$('#btnAddDetail,#btnRelease').removeClass('hide');
    }
    if (pLoggedUser.WarehouseID > 0)
        $('#slWarehouse,#slFilterWarehouse').val(pLoggedUser.WarehouseID).change();
    ShowHideActions();
    $('#btnOpenPickup').addClass('hide');
    $('#tblPickupDetails .Details').addClass('hide');
}
function Pickup_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerPickup").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");

    $('#btn-PrintPickup, #btn-PrintPickList, #btn-PrintPickupLoading').attr('disabled', 'disabled');
    if (_isRequest) {
        $("#btnAddDetail,#btnRelease,#btnOpenPickup").addClass('hide');
    }
    ClearAll("#PickupModal");
    $(".classDisableForDetails").attr("disabled", "disabled");
    $("#tblPickupDetails tbody").html("");
    $("#tblExtraServices tbody").html("");
    jQuery("#PickupModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID,
        pIsRequest: _isRequest
    };
    CallGETFunctionWithParameters("/api/WH_Outbound/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pPickupHeader = JSON.parse(pData[0]);
            var pPickupDetails = JSON.parse(pData[1]);
            var pPickupDetailsLocations = JSON.parse(pData[2]);
            var pLocations = pData[3];
            _pickupLocationId = pData[4];
            var total = pData[5];

            _details = _isRequest ? pPickupDetails : pPickupDetailsLocations
            if (pPickupHeader.StatusID == constPickupStatusCreated || pPickupHeader.StatusID == constPickupStatusCanceled)
                $('#btn-PrintPickList').addClass('hide');
            else
                $('#btn-PrintPickList').removeClass('hide');

            if (_isRequest) {
                if (pPickupHeader.StatusID == constPickupStatusCreated)
                    $("#btnAddDetail,#btnRelease").removeClass('hide');
                else if (pPickupHeader.StatusID > constPickupStatusCreated && pPickupHeader.StatusID < constPickupStatusFinalized)
                    $("#btnOpenPickup").removeClass('hide');
            }

            if (pPickupDetails.length > 0)
                $(".classDisableForDetails").attr("disabled", "disabled");
            else
                $(".classDisableForDetails").removeAttr("disabled");
            if (pPickupHeader.StatusName.toUpperCase() == "FINALIZED")
                $(".classDisableForFinalized").attr("disabled", "disabled");
            else
                $(".classDisableForFinalized").removeAttr("disabled");
            $("#hID").val(pID);
            $("#hPDIReceiveDetailsID").val(pPickupHeader.PDIReceiveDetailsID);
            $("#lblShown").html(": " + pPickupHeader.Code);
            $("#txtCode").val(pPickupHeader.Code);
            $("#slWarehouseTo").val(pPickupHeader.WarehouseToID == 0 ? "" : pPickupHeader.WarehouseToID);
            $("#slWarehouse").val(pPickupHeader.WarehouseID == 0 ? "" : pPickupHeader.WarehouseID);
            if (!$("#slCustomer option[value=" + pPickupHeader.CustomerID + "]").val())
                $("#slCustomer").append('<option value="' + pPickupHeader.CustomerID + '">' + pPickupHeader.CustomerName+'</option>');

            $("#slCustomer").val(pPickupHeader.CustomerID == 0 ? "" : pPickupHeader.CustomerID);

            $("#slOwner").attr('val', pPickupHeader.OwnerID == 0 ? "" : pPickupHeader.OwnerID);
            FillListFromObject(null, 1, "<--Select-->", "slLocation", pLocations, null);
            LoadOwners('Edit');
            $("#slBillTo").val(pPickupHeader.BillTo == 0 ? "" : pPickupHeader.BillTo);
            $("#slEndUser").val(pPickupHeader.EndUserID == 0 ? "" : pPickupHeader.EndUserID);
            $("#slOperation").val(pPickupHeader.OperationID == 0 ? "" : pPickupHeader.OperationID);
            $("#slEquipment").val(pPickupHeader.EquipmentID == 0 ? "" : pPickupHeader.EquipmentID);
            $("#txtOrderDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPickupHeader.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPickupHeader.OrderDate)));
            $("#txtRequiredDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pPickupHeader.RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pPickupHeader.RequiredDate)));
            $("#cbIsFinalized").prop("checked", pPickupHeader.IsFinalized);
            $("#txtContainerNo").val(pPickupHeader.ContainerNo == 0 ? "" : pPickupHeader.ContainerNo);
            $("#txtNotes").val(pPickupHeader.Notes == 0 ? "" : pPickupHeader.Notes);
            $("#txtDriverName").val(pPickupHeader.DriverName == 0 ? "" : pPickupHeader.DriverName);
            $("#txtRMANumber").val(pPickupHeader.RMANumber == 0 ? "" : pPickupHeader.RMANumber);
            $("#txtStatus").attr('val', pPickupHeader.StatusID);
            $("#txtStatus").val(pPickupHeader.StatusName);

            $('#txtExpectedQty').val(total.DemandedQuantity);
            $('#txtQty').val(total.PickedQuantity);

            PickupDetails_BindTableRows(_isRequest ? pPickupDetails : pPickupDetailsLocations);
            $("#btnSave").attr("onclick", "Pickup_Save(false);");
            ApplySelectListSearch_OnlyChange();
            ShowHideActions();
            $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
            FadePageCover(false);
            $('#btn-PrintPickup, #btn-PrintPickList, #btn-PrintPickupLoading').removeAttr('disabled');
        }
        , null);

    if (!$('#tabServices').hasClass('hide'))
        LoadServices(pID);
}

function Pickup_Save(pSaveAndNew, pRelease, pSaveMasterOnly) {
    debugger;

    $('#tblPickupDetails thead tr:eq(0) input').each(function () {
        if (($(this).is('input[type=text]') && $(this).val().trim() != '') || ($(this).is('input[type=checkbox]') && $(this).is(':checked'))) {
            $('#tblPickupDetails thead tr:eq(0) input[type=text]').val('');
            $('#tblPickupDetails thead tr:eq(0) input[type=checkbox]').prop('checked', false);
            SearchRowItem();
            return false;
        }
    });

    FadePageCover(true);
    if (!isValidDate($("#txtOrderDate").val().trim(), 1) /*|| !isValidDate($("#txtRequiredDate").val().trim(), 1)*/) {
        swal(strSorry, "Please, enter dates.");
        FadePageCover(false);
    }
    else if ($("#txtOrderDate").val().trim() != "" && $("#txtRequiredDate").val().trim() != ""
        && Date.prototype.compareDates(ConvertDateFormat($("#txtOrderDate").val().trim()), ConvertDateFormat($("#txtRequiredDate").val().trim())) < 0) {
        FadePageCover(false);
        swal("Sorry", "Please, check dates.");
    }
    else if (ValidateForm("form", "PickupModal")) {
        var isValidDetail = true;
        var details = [];
        if (!pSaveMasterOnly) {
            $('#tblPickupDetails tbody tr').each(function () {
                details.push({
                    ID: $(this).find('td.ID input').val(),
                    PurchaseItemID: $(this).find('td.PurchaseItemID select option:selected').val(),
                    PurchaseItemCode: $(this).find('td.PurchaseItemID select option:selected').text(),
                    DemandedQuantity: $(this).find('td.DemandedQuantity input').val(),
                    PD_AvailableQuantity: $(this).find('td.PD_AvailableQuantity input').val(),
                    PD_PackageTypeID: $(this).find('td.PD_PackageTypeID select option:selected').val(),
                    PD_PackageTypeCode: $(this).find('td.PD_PackageTypeID select option:selected').text(),
                });
                if (_isRequest && !(details[details.length - 1].DemandedQuantity > 0)) {
                    swal("Sorry", "Demanded Quantity Is Mandatory");
                    isValidDetail = false;
                    return false;
                }
            });
            if (!isValidDetail) {
                FadePageCover(false);
                return;
            }

            if (_isRequest) {
                $.each(details, function (i, item) {
                    $.each(details, function (y, item2) {
                        if (item.PurchaseItemID == item2.PurchaseItemID && item.PD_PackageTypeID == item2.PD_PackageTypeID && i != y) {
                            swal("Sorry", "Item (" + item.PurchaseItemCode + ") and Unit (" + item.PD_PackageTypeCode + ") can't be repeated");
                            isValidDetail = false;
                            return false;
                        }
                    });
                });
            }
            if (!isValidDetail) {
                FadePageCover(false);
                return;
            }
        }
     
        pParametersWithValues = {
              ID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , WarehouseToID: $("#slWarehouseTo").val() == "" ? "0" : $("#slWarehouseTo").val()
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , OwnerID: $("#slOwner").val() == "" ? "0" : $("#slOwner").val()
            , BillTo: $("#slBillTo").val() == "" ? "0" : $("#slBillTo").val()
            , EndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , OrderDate: ($("#txtOrderDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtOrderDate").val().trim()))
            , RequiredDate: ($("#txtRequiredDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtRequiredDate").val().trim()))
            , IsFinalized: $("#cbIsFinalized").prop("checked")
            , FinalizeDate: "01/01/1900"
            , Notes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , DriverName: $("#txtDriverName").val().trim()
            , DriverIdentity: $("#txtDriverIdentity").val().trim()
            , TruckNo: $("#txtTruckNo").val().trim()
            , ContainerNo: $("#txtContainerNo").val().trim()
            , SealNo: $("#txtSealNo").val().trim()
            , OperationID: $("#slOperation").val() == "" ? "0" : $("#slOperation").val()
            , EquipmentID: $("#slEquipment").val() == "" ? "0" : $("#slEquipment").val()
            , RMANumber: IsNull($("#txtRMANumber").val(),'1')//if stock allocated  by system 1 else if allocated manually 2
            , PersonInChargeID: $("#slPersonInCharge").val() == "" ? "0" : $("#slPersonInCharge").val()
            , PDIReceiveDetailsID: $("#hPDIReceiveDetailsID").val() == "" ? 0 : $("#hPDIReceiveDetailsID").val()
            , StatusID: pSaveMasterOnly ? $('#txtStatus').attr('val') : _isRequest && !pRelease ? constPickupStatusCreated : constPickupStatusReleased //case of check for Location in details
            , SaveMasterOnly: pSaveMasterOnly
            , Details:details
        };
        CallPOSTFunctionWithParameters("/api/WH_Outbound/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData[0] == "") {
                    var pPickupHeader = JSON.parse(pData[2]);
                    //var pPickupDetails = JSON.parse(pData[3]);
              
                    if (pSaveAndNew) {
                        Pickup_ClearAllControls();
                    }
                    else if (pSaveMasterOnly)
                    {

                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pPickupHeader.Code);
                        $("#txtStatus").attr('val', pPickupHeader.StatusID);
                        $("#txtStatus").val(pPickupHeader.StatusName);
                        //PickupDetails_BindTableRows(pPickupDetails);
                        $("#btnSave").attr("onclick", "Pickup_Save(false);");
                        $("#btnSaveAndAddNew").attr("onclick", "Pickup_Save(true);");
                        Pickup_FillAllControls(pData[1]);
                    }
                    swal("Success", "Saved successfully.");

                    if (!pSaveMasterOnly) {
                        if (glbCallingControl == "WarehousingPickup" || glbCallingControl == "WH_OutboundRequest" || glbCallingControl == "WH_Outbound")
                            Pickup_LoadingWithPaging();
                        else
                            PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                    }
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
                ShowHideActions();
            }
            , null);
    }
    else //if (ValidateForm("form", "PickupModal"))
        FadePageCover(false);
}
function Pickup_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPickup') != "")
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
                DeleteListFunction("/api/WH_Outbound/Delete", { "pPickupIDs": GetAllSelectedIDsAsString('tblPickup') }
                    , function () {
                        if (glbCallingControl == "WarehousingPickup" || glbCallingControl == "WH_OutboundRequest" || glbCallingControl == "WH_Outbound")
                            Pickup_LoadingWithPaging();
                        else
                            PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                    });
            });
    //DeleteListFunction("/api/Pickup/Delete", { "pPickupIDs": GetAllSelectedIDsAsString('tblPickup') }, function () { Pickup_LoadingWithPaging(); });
}
function Pickup_slCustomerChanged() {
    debugger;
    return;
    if ($("#slCustomer").val() == "")
        $("#slPersonInCharge").html("<option value=''><--Select--></option>");
    else {
        FadePageCover(true);
        var pWhereClause = "WHERE PartnerTypeID=" + constCustomerPartnerTypeID + " AND PartnerID=" + $("#slCustomer").val() + " ORDER BY Name";
        CallGETFunctionWithParameters("/api/Contacts/LoadAll", { pWhereClause: pWhereClause }
            , function (pData) {
                FillListFromObject(null, 2, "<--Select-->", "slPersonInCharge", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
    $("#slBillTo").val($("#slCustomer").val());
    $("#slEndUser").val($("#slCustomer").val());
}
function LoadOwners(pMode, pSelectClient, pSelectOwner) {
    debugger;
    if (!pSelectOwner)
        pSelectOwner = 'slOwner';
    $('#' + pSelectOwner + '').val(-1).change();

    if (!pSelectClient)
        pSelectClient = 'slCustomer';

    var customerId = $('#' + pSelectClient + '').val();
    if (!(customerId > 0))
        return;
    var whereClause = "where CustomerID=" + customerId;
    if (pMode == 'New')
        FadePageCover(true);
    CallGETFunctionWithParameters("/api/Owners/LoadAll"
        , { pWhereClause: whereClause }
        , function (pData) {
            FadePageCover(false);
            var ownerId = $('#' + pSelectOwner + '').attr('val');
            FillListFromObject(ownerId, 2, "<--Select-->", pSelectOwner, pData, null);
            if ($('#txtStatus').attr('val') != constPickupStatusFinalized)
                LoadAvailableItems();
            LoadStockUnits();
        }
        , null,false);
}
function LoadStockUnits() {
    $('#slPackageType').html('');
    var customerId = $('#slCustomer').val();
    var ownerId = $('#slOwner').val();
    if (!(customerId > 0) || !(ownerId > 0))
        return;

    var filter = `where ClientID=${customerId} and OwnerID=${ownerId}`;

    var whereClause = "where PurchaseItemID in (select ID from PurchaseItem " + filter + ")";
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadStockUnits"
        , { pWhereClause: whereClause }
        , function (pUnits) {
            FadePageCover(false);
            _itemsStockUnits = JSON.parse(pUnits);
        }
        , null, false);
}
function Pickup_Finalize(pIsFinalize) {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please save the order first.");
    else {
        swal({
            title: "Are you sure?",
            text: "This pickup will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/WH_Outbound/Finalize"
                    , { pFinalizedPickupID: $("#hID").val(), pIsFinalize: pIsFinalize }
                    , function (pData) {
                        if (pData[0] == "") {
                            swal("Success", "Saved successfully.");
                            if (pIsFinalize) {
                                $(".classDisableForFinalized").attr("disabled", "disabled");
                                $("#txtStatus").attr('val', constPickupStatusFinalized);
                                $("#txtStatus").val("FINALIZED");
                                $("#tblPickup tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                            }
                            else {
                                $(".classDisableForFinalized").removeAttr("disabled");
                                $("#txtStatus").attr('val', 0);
                                $("#txtStatus").val("");
                                $("#tblPickup tr[ID=" + $("#hID").val() + "] td.Status").text("");
                            }
                            if (glbCallingControl == "WarehousingPickup" || glbCallingControl == "WH_OutboundRequest" || glbCallingControl == "WH_Outbound")
                                Pickup_LoadingWithPaging();
                            else
                                PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                        }
                        else {
                            FadePageCover(true);
                            swal("Sorry", pData[0]);
                        }
                    }
                    , null);
            });
    }
}
function Pickup_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "Pickup_SendNotification();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function Pickup_SendNotification() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save first.");
    else if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Pickup: " + $("#txtCode").val();
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += "<br>Please, handle Pickup " + $("#txtCode").val();
        var pOperationID = 0;
        var pIsSendNormalEmail = pDefaults.UnEditableCompanyName == "NIL" ? false : false;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}

function ApplySelectListSearch() {
    debugger;
    $("#slFilterWarehouse").css({ "width": "100%" }).select2();
    $("#slFilterWarehouse").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");
    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");

    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouse").trigger("change");
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slCustomer").trigger("change");
    $("#slOwner").css({ "width": "100%" }).select2();
    $("#slOwner").trigger("change");
    $("#slPickupDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slPickupDetailsPurchaseItem").trigger("change");
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").trigger("change");
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slBillTo").trigger("change");
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slEndUser").trigger("change");
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slOperation").trigger("change");
    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#slEquipment").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slOwner").css({ "width": "100%" }).select2();
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slPickupDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slPickupDetailsPallets").css({ "width": "100%" }).select2();
    $("#slPersonInCharge").css({ "width": "100%" }).select2();
    $("#slBillTo").css({ "width": "100%" }).select2();
    $("#slEndUser").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();
    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#srchStatus").css({ "width": "100%" }).select2();
    $("#slFilterOwner").css({ "width": "100%" }).select2();
    $("#slFilterStatus").css({ "width": "100%" }).select2();
    if (_hasRequest && !_isRequest) {
        $("#srchStatus option[value=10]").remove();
        $("#srchStatus option[value=70]").remove();
    }
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
    if (IsNull(customerId, '0') == '0' || IsNull(ownerId, '0') == '0')
        return;

    var whereClause = "where ClientID = " + customerId.toString() + " and OwnerID = " + ownerId.toString() + "";

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
        , { pWhereClause: whereClause }
        , function (pPurchaseItem) {
            FadePageCover(false);
            FillListFromObject(null, 2, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, null);
        }
        , null, false);
}
function LoadAvailableItems() {
    debugger;
    $('#slPurchaseItem').html("<option value='0'><--select--></option>");

    var warehouseId = $('#slWarehouse').val();
    if (!(warehouseId > 0))
        return;

    var customerId = $('#slCustomer').val();
    var ownerId = $('#slOwner').val();
    if (!(customerId > 0) || !(ownerId > 0))
        return;
    
    var ownerFilter=` and OwnerID=${ownerId}`;
    var selectClause = ` distinct PurchaseItemID, PurchaseItemCode, PurchaseItemName, PackageTypeID, PackageTypeName, Sum(Quantity-isnull(PDL_DemandedQuantity,0)) Quantity`;
    var whereClause = `  (PurchaseItemID in (select PurchaseItemID from WH_PickupDetails where PickupID=${IsNull($('#hID').val(), 0)}) and WarehouseID=${warehouseId}) or (WarehouseID=${warehouseId} and CustomerID=${customerId} ${ownerFilter} and Quantity-isnull(PDL_DemandedQuantity,0)>0 and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0 )`;
    
    whereClause += ` Group By PurchaseItemID, PurchaseItemCode, PurchaseItemName, PackageTypeID, PackageTypeName`;

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Outbound/LoadAvailableItems", { pSelectClause: selectClause, pWhereClause: whereClause}
        , function (pPurchaseItem) {
            FadePageCover(false);

            var Items = JSON.parse(pPurchaseItem.Items);
            var elmItem;
            $.each(Items, function (i, item) {
                $('#slPurchaseItem').append("<option value='" + item.PurchaseItemID + "'>" + item.PurchaseItemCode + "</option>");
                elmItem = $('#slPurchaseItem option[value=' + item.PurchaseItemID + ']');
                elmItem.attr('PurchaseItemName', item.PurchaseItemName);
                elmItem.attr('PackageTypeID', item.PackageTypeID);
                elmItem.attr('PackageTypeName', item.PackageTypeName);
                elmItem.attr('AvailableQuantity', item.Quantity);

            });
            $('#slPickupDetailsPurchaseItem').html($('#slPurchaseItem').html());
            
        }
        , null, false);

}
function SetItemUnit(elm, pUnitId, pMode) {
    debugger;
    var tr = $(elm).closest('tr');
    var itemId = $(elm).val();
    $(tr).find('td.PurchaseItemName input').val($(elm).find('option:selected').attr('PurchaseItemName'));
    if (pMode!='edit')
        $(tr).find('td.PD_AvailableQuantity input').val($(elm).find('option:selected').attr('AvailableQuantity'));

    //default item unit
    var packageId = Number($(elm).find('option:selected').attr('PackageTypeID'));
    var packageName = $(elm).find('option:selected').attr('PackageTypeName');

    //item units
    var itemStockUnits = _itemsStockUnits.filter(function (u) { return u.PurchaseItemID == itemId; });
    var stockUnits = [];
    stockUnits.push({ ID: packageId, Name: packageName });
    $.each(itemStockUnits, function (i, u1) {
        var isExisted1 = false;
        var isExisted2 = false;
        $.each(stockUnits, function (y, u2) {
            if (u1.FromPackageTypeID == u2.ID)
                isExisted1 = true;
            if (u1.ToPackageTypeID == u2.ID)
                isExisted2 = true;
        });
        if (!isExisted1)
            stockUnits.push({ ID: u1.FromPackageTypeID, Name: u1.FromPackageTypeName });
        if (!isExisted2)
            stockUnits.push({ ID: u1.ToPackageTypeID, Name: u1.ToPackageTypeName });
    });
    console.log(stockUnits);
    $(tr).find('td.PD_PackageTypeID select').html('');
    $.each(stockUnits, function (i, item) {
        $(tr).find('td.PD_PackageTypeID select').append('<option value="' + item.ID + '">' + item.Name + '</option>');
    });
    var tr = $(elm).closest('tr');

    //set unit
    if (pUnitId > 0)
        $(tr).find('td.PD_PackageTypeID select').val(pUnitId);
    else if (packageId > 0)
        $(tr).find('td.PD_PackageTypeID select').val(packageId);
    else
        $(tr).find('td.PD_PackageTypeID select').val(0);


}
//*********************************Reading Excel Files REGION***************************************//
function PickupDetails_Import() {
    debugger;
    if ($("#hID").val() == "" || $("#slCustomer").val() == "")
        swal("Sorry", "Please, save basic data first, and make sure to select Customer.");
    else
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
                if (oJS.length > 0 && oJS[0].ProductCode != undefined) //if (sCSV != "")
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
    let pPurchaseItemCodeList = "";
    let pFromLocationList = "";
    let pQuantityList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        if (pDataRows[i].ProductCode == undefined || pDataRows[i].FromLocation == undefined || pDataRows[i].Quantity == undefined) {
            FadePageCover(false);
            $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
            swal("Sorry", "Please, check row " + (i + 2));
            return;
        }
        else {
            pPurchaseItemCodeList += (pPurchaseItemCodeList == "" ? (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pFromLocationList += (pFromLocationList == "" ? (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].FromLocation == undefined || pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].FromLocation.replace(/[\, ]/g, ' ').toUpperCase().trim())));
            pQuantityList += (pQuantityList == "" ? (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : parseInt(pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim())) : ("," + (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : parseInt(pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim()))));
        }
    }

    var pParametersWithValues = {
        pPickupID: $("#hID").val()
        , pWarehouseID: $("#slWarehouse").val()
        , pCustomerID: $("#slCustomer").val()
        , pPurchaseItemCodeList: pPurchaseItemCodeList
        , pFromLocationList: pFromLocationList
        , pQuantityList: pQuantityList
    };
    CallPOSTFunctionWithParameters("/api/WH_Outbound/PickupDetails_ImportFromExcel", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                swal("Success", "Saved Successfully.");
            }
            else {
                swal("Sorry", _ReturnedMessage);
            }
            Pickup_FillAllControls($("#hID").val());
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
}
//*********************************Reading Excel Files REGION END***********************************//

//***************************************PickupDetails REGION***************************************//
var _updateDetails = true;
function PickupDetails_BindTableRows(pPickupDetails) {
    debugger;
    _updateDetails = false;
    $('#tblPickupDetails .Details').addClass('hide');
    if (pPickupDetails.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblPickupDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    if (_isRequest) {
        $.each(pPickupDetails, function (i, item) {


            AppendRowtoTable("tblPickupDetails",
                ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID hide'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='PickupID hide'>" + item.PickupID + "</td>"
                    + "<td class='LineNo'>" + (i + 1) + "</td>"
                    + "<td class='OpenPickupDetails'><span class='btn btn-blue btn-sm' onclick='PickupDetails_FillControls(" + item.ID + ", this);'>Open</span></td>"
                    + "<td class='PurchaseItemID'><select data-required='false' class='form-control' onchange='SetItemUnit(this," + item.PD_PackageTypeID + ",`edit`);UpdateDetail(this,`PurchaseItemID`);' " + (_isRequest ? "" : "disabled") + ">" + $('#slPurchaseItem').html() + "</select></td>"
                    + "<td class='PurchaseItemName'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + item.PurchaseItemName + "'/></td>"
                    + "<td class='PD_PackageTypeID'><select data-required='false' class='form-control' onchange='UpdateDetail(this,`PD_PackageTypeID`);'>" + $('#slPackageType').html() + "</select></td>"
                    + "<td class='PD_AvailableQuantity hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.PD_AvailableQuantity + "' disabled/></td>"
                    + "<td class='DemandedQuantity hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + (item.DemandedQuantity) + "' onkeyup='ValidateMaxLimitQty(this,`PD_AvailableQuantity`);' onchange='UpdateDetail(this,`DemandedQuantity`);' " + (item.ID > 0 ? 'disabled' : '') + "/></td>"
                    + "<td class='PickedQuantity Details hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.PickedQuantity + "' disabled/></td>"
                    + "<td class='LastModificator'>" + (item.ModificatorUserName == 0 ? "" : item.ModificatorUserName) + "</td>"
                    + "<td class='" + ($('#txtStatus').attr('val') > constPickupStatusCreated ? "hide" : "") + "'><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>"
                    + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                    + "</tr>"));

            $('#tblPickupDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').val(item.PurchaseItemID).change();
            $('#tblPickupDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').css({ 'width': '100%' }).select2();


        });
    }
    else {
        $.each(pPickupDetails, function (i, item) {


            AppendRowtoTable("tblPickupDetails",
                ("<tr ID='" + item.PickupDetailsID + "'>"
                    + "<td class='ID hide'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.PickupDetailsID + "'></td>"
                    + "<td class='PickupID hide'>" + item.PickupID + "</td>"
                    + "<td class='ReceiveDetailsID hide'><input type='text' value='" + item.ReceiveDetailsID + "'/></td>"
                    + "<td class='LineNo'>" + (i + 1) + "</td>"
                    + "<td class='OpenPickupDetails'><span class='btn btn-blue btn-sm' onclick='PickupDetails_FillControls(" + item.PickupDetailsID + ", this);'>Open</span></td>"
                    + "<td class='PurchaseItemID'><select data-required='false' class='form-control' onchange='SetItemUnit(this," + item.PD_PackageTypeID + ",`edit`);' " + (_isRequest ? "" : "disabled") + ">" + $('#slPurchaseItem').html() + "</select></td>"
                    + "<td class='PurchaseItemName'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + item.PurchaseItemName + "'/></td>"
                    + "<td class='PD_PackageTypeID'><select data-required='false' class='form-control'>" + $('#slPackageType').html() + "</select></td>"
                    + "<td class='PD_AvailableQuantity hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.PD_AvailableQuantity + "' disabled/></td>"
                    + "<td class='DemandedQuantity hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + (item.PDL_DemandedQuantity > 0 ? item.PDL_DemandedQuantity : item.DemandedQuantity) + "' onkeyup='ValidateMaxLimitQty(this,`PD_AvailableQuantity`);' " + (item.ID > 0 ? 'disabled' : '') + "/></td>"
                    + "<td class='PickedQuantity Details hide'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.PickedQuantity + "' disabled/></td>"
                    + "<td class='LocationCode Details hide'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + (_isRequest || !_hasRequest ? item.LocationCode : item.PDL_LocationCode) + "'/></td>"
                    + "<td class='PalletID Details hide'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + (_isRequest || !_hasRequest ? item.PalletID : item.PDL_PalletID) + "'/></td>"
                    + "<td class='BatchNumber Details hide'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + item.BatchNumber + "'/></td>"
                    + "<td class='Production Details hide'><input class='form-control input-sm' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "' disabled/></td>"
                    + "<td class='Expiration Details hide'><input class='form-control input-sm' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "' disabled/></td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='LastModificator'>" + (item.ModificatorUserName == 0 ? "" : item.ModificatorUserName) + "</td>"
                    + "<td class='" + ($('#txtStatus').attr('val') > constPickupStatusCreated ? "hide" : "") + "'><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>"
                    + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.PickupDetailsID + ");' " + editControlsText + "</a></td>"
                    //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                    //+ "<td class='ReceiveDetailsID hide'>" + (item.ReceiveDetailsID == 0 ? "" : item.ReceiveDetailsID) + "</td>"
                    //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                    //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                    //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                    //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                    //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "</tr>"));

            //$('#tblPickupDetails tbody tr[ID=' + item.PickupDetailsID + '] *:not(button)').attr('ondblclick', 'PickupDetails_FillControls(' + item.PickupDetailsID + ');');

            $('#tblPickupDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').val(item.PurchaseItemID).change();
            $('#tblPickupDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').css({ 'width': '100%' }).select2();


        });
    }
  

    if (_isRequest)
        $('#tblPickupDetails .PD_AvailableQuantity').removeClass('hide');
    else
        $('#tblPickupDetails .Details').removeClass('hide');
   

    
        $('#tblPickupDetails .DemandedQuantity').removeClass('hide');

    if (Number($('#txtStatus').attr('val')) > constPickupStatusPicked || (_isRequest && Number($('#txtStatus').attr('val')) > constPickupStatusCreated))
        $('#tblPickupDetails .OpenPickupDetails span').attr('disabled', 'disabled');
    else
        $('#tblPickupDetails .OpenPickupDetails span').removeAttr('disabled');

    _updateDetails = true;
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetails", "ID", "cb-CheckAll-PickupDetails");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    $('#tblPickupDetails td input, #tblPickupDetails td select').css({ 'width': 'auto' });

    GroupPickupDetails();
    if (!_isRequest && Number($('#txtStatus').attr('val')) > constPickupStatusCreated && Number($('#txtStatus').attr('val')) < constPickupStatusLoaded)
        PickupDetails_FillControls();
}
function PickupDetails_ClearAllControls() {
    debugger;
    //$("#lblShown").html(": " + pPickupHeader.Code);
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    /* else if (ValidateForm("form", "PickupModal")) {*/
    else { 
        FadePageCover(true);
        ClearAll("#PickupDetailsModal");
        $("#tblReceiveDetails tbody").html("");
        $("#tblPickupDetailsLocation tbody").html("");
        $("#lblPickupDetailsShown").html($("#lblShown").html());
        $("#slPickupDetailsReceive").html("<option value=''><--Select--></option>");
        $("#slPickupDetailsPurchaseItem").html("<option value=''><--Select--></option>");
        $("#slPickupDetailsPallets").html("<option value=''><--Select--></option>");
        $("#slPickupDetailsLocation").html("<option value=''><--Select--></option>");
        var whereClause = ` (PurchaseItemID in (select PurchaseItemID from WH_PickupDetails where PickupID=${$('#hID').val()}) and WarehouseID=${$('#slWarehouse').val()}) or (WarehouseID=${$('#slWarehouse').val()} and CustomerID=${$('#slCustomer').val()} and Quantity>isnull(PDL_DemandedQuantity,0) and IsNull(IsPicked,0)=0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0`;
        if (pDefaults.UnEditableCompanyName == "EF")
            whereClause += ` and OwnerID=${$('#slOwner').val()}`;
        CallGETFunctionWithParameters("/api/WH_Outbound/PickupDetails_GetAvailablePurchaseItemsForCustomer"
                , {
                    pWhereClause: whereClause
            }
            , function (pData) {

                FillListFromObject(null, 1/*9*/, "<--Select-->", "slPickupDetailsPurchaseItem", pData.Items, function () { ApplySelectListSearch_OnlyChange(); });

                var pallets = JSON.parse(pData.Pallets);
                $.each(pallets, function (i, item) {
                    $('#slPickupDetailsPallets').append("<option value='" + item.PalletID + "' ItemIDs='"+item.ItemIDs+"'>" + item.PalletID + "</option>");
                });

                FadePageCover(false);
            }
            , null);
        ShowPickupLocationSave(false);
        jQuery("#PickupDetailsModal").modal("show");
        $("#btnSavePickupDetails").attr("onclick", "PickupDetails_Save(false);");
        $("#btnSaveAndAddNewPickupDetails").attr("onclick", "PickupDetails_Save(true);");
    }
}
function PickupDetails_FillControls(pID, pSpan) {
    debugger;
    //FadePageCover(true);
    ClearAll("#PickupDetailsModal");
    $("#lblPickupDetailsShown").html($("#lblShown").html());
    $("#tblReceiveDetails tbody").html("");
    $("#tblPickupDetailsLocation tbody").html("");
    if (pID > 0) {
        $("#hPickupDetailsID").val(pID);
        var tr = $("#tblPickupDetails tr[ID='" + pID + "']");
        $("#txtPickupDetailsBarCode").val($(tr).find("td.BarCode").text());
        $("#slPickupDetailsPurchaseItem").val($(tr).find("td.PurchaseItemID select option:selected").val());
        $("#txtPickupDetailsDemandedQuantity").val($(tr).find("td.DemandedQuantity").text());
        $("#txtPickupDetailsPickedQuantity").val($(tr).find("td.PickedQuantity").text());
    }
    else {
        var itemsIds = [];
        if (pSpan)
            itemsIds.push($(pSpan).closest('tr').find('td.PurchaseItemID select option:selected').val())
        else
            $('#tblPickupDetails tbody tr').each(function () { if (itemsIds.indexOf($(this).find('td.PurchaseItemID select option:selected').val())==-1) itemsIds.push($(this).find('td.PurchaseItemID select option:selected').val()) });

        $("#slPickupDetailsPurchaseItem").val(itemsIds);

        if (itemsIds.length == 0)
            return;
    }
    PickupDetails_FillModalTables();
    ApplySelectListSearch_OnlyChange();
    ShowPickupLocationSave(false);
    jQuery("#PickupDetailsModal").modal("show");
    GroupPickupDetails();
}

var _ItemsBalance = [];
var _PickupDetails = [];
var _PickupDetailsLocation = [];
var _Picking = [];
function PickupDetails_FillModalTables(pManualClick, pByPallet) {
    debugger;
    $("#tblReceiveDetails tbody").html("");
    if (!_hasRequest && pManualClick)
        $("#tblPickupDetailsLocation tbody").html("");
    if (IsNull($("#slPickupDetailsPurchaseItem").val(), '') == '' && IsNull($("#slPickupDetailsPallets").val(), '') == '')
        ; //do nothing
    /*  else if (ValidateForm("form", "PickupModal")) {*/
    else { 
        FadePageCover(true);
        var ItemIDsStr = pByPallet ? $("#slPickupDetailsPallets option:selected").attr('ItemIDs'): IsNull($("#slPickupDetailsPurchaseItem").val(),'0').toString();
        var pParametersWithValues = {
            pPickupID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pPurchaseItemIDs: ItemIDsStr
            //, pPickupDetailsID: $("#hPickupDetailsID").val() == "" ? 0 : $("#hPickupDetailsID").val()
            //, pWhereClauseReceiveDetails: "WHERE IsFinalized=1 AND WarehouseID=" + $("#slWarehouse").val() + " AND PurchaseItemID= " + $("#slPickupDetailsPurchaseItem").val() + " AND CustomerID=" + $("#slCustomer").val()
            , pWhereClauseItemBalance: "  IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0 and WarehouseID=" + $("#slWarehouse").val() + " AND PurchaseItemID in (" + ItemIDsStr + ") "
            , pOrderBy:"PurchaseItemID, ISNULL(ExpirationDate,'2100-01-01'), ReceiveDate"
            , pPageNumber: ($("#div-Pager-balance li.active a").text() == "" ? 1 : $("#div-Pager-balance li.active a").text())
            , pPageSize: $('#select-page-size-balance option:selected').val()
        };
        if (!_isRequest)
            pParametersWithValues.pWhereClauseItemBalance += " and ID in (select distinct ItemBalanceID from vwWH_PickupDetailsLocation where PickupID=" + $("#hID").val()+")";

        if (pByPallet)
            pParametersWithValues.pWhereClauseItemBalance += " and PalletID='" + $("#slPickupDetailsPallets option:selected").val() + "'";

        CallGETFunctionWithParameters("/api/WH_Outbound/PickupDetails_FillModalTables", pParametersWithValues
            , function (pData) {
                debugger;

                var ItemsBalance = JSON.parse(pData[0]);
                _ItemsBalance = ItemsBalance;

                //var totalBalance = pData[1];
                //InitiPaging("div-Pager-balance", "select-page-size-balance", "spn-first-page-row-balance", "spn-last-page-row-balance", "spn-total-count-balance", "div-Text-Total-balance", ($("#div-Pager-balance li.active a").text() == "" ? 1 : $("#div-Pager-balance li.active a").text()), totalBalance);

                
                var pPickupDetailsLocation = JSON.parse(pData[2]);
                _Picking = {};
                $.each(pPickupDetailsLocation, function (i, item) {
                    var key = item.ItemBalanceID;//btoa(item.PurchaseItemID + '_' + item.PDL_PalletID + '_' + item.PDL_LocationID);
                    if (_Picking[key]) {
                        _Picking[key]['DemandedQuantity'] += Number(item.PDL_DemandedQuantity);
                        _Picking[key]['PickedQuantity'] += Number(item.PickedQuantity);
                    }
                    else {
                        _Picking[key] = { DemandedQuantity: Number(item.PDL_DemandedQuantity), PickedQuantity: Number(item.PickedQuantity), StatusID: item.StatusID };
                    }
                });
                _PickupDetailsLocation = pPickupDetailsLocation;

                var pPickupDetails = JSON.parse(pData[3]);
                _PickupDetails = pPickupDetails;
                //if (pPickupDetails == null) {
                //    $("#hPickupDetailsID").val("");
                //    $("#txtPickupDetailsDemandedQuantity").val("");
                //    $("#txtPickupDetailsPickedQuantity").val("");
                //    $("#txtPickupDetailsNotes").val("");
                //}
                //else {
                //    $("#hPickupDetailsID").val(pPickupDetails.ID);
                //    $("#txtPickupDetailsDemandedQuantity").val(pPickupDetails.DemandedQuantity);
                //    $("#txtPickupDetailsPickedQuantity").val(pPickupDetails.PickedQuantity);
                //    $("#txtPickupDetailsNotes").val(pPickupDetails.Notes == 0 ? "" : pPickupDetails.Notes);
                //}
                PickupDetailsLocation_BindTableRows(pPickupDetailsLocation, pManualClick);
                ReceiveDetails_BindTableRows(ItemsBalance, pPickupDetails, pPickupDetailsLocation);
                FadePageCover(false);
            }
            , null);
    }
}
function PickupDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    //var _MessageRturned = PickupDetailsLocation_ValidateToSave();
    //var pReceiveDetailsIDList = GetAllIDsAsStringWithNameAttr('tblReceiveDetails', 'Delete');
    //if (pReceiveDetailsIDList == "") {
    //    swal("Sorry", "No receive details.");
    //    FadePageCover(false);
    //}
    //else if (_MessageRturned != "") {
    //    swal("Sorry", _MessageRturned);
    //    FadePageCover(false);
    //}
    //else
        if (ValidateForm("form", "PickupDetailsModal")) {
        var demandedTotal = 0;
        var pReceiveDetailsPickedQuantityList = "";
        var pReceiveDetailsDemandedQuantityList = "";
        //for (var i = 0; i < pReceiveDetailsIDList.split(',').length; i++) {

        //    var demanded = $("#txtReceiveDetailsDemandedQuantity" + pReceiveDetailsIDList.split(',')[i]).val();
        //    demanded = (parseFloat(demanded) == 0 || demanded == "" ? 0 : demanded);
        //    pReceiveDetailsDemandedQuantityList += pReceiveDetailsDemandedQuantityList == "" ? demanded : (',' + demanded);
        //    demandedTotal += Number(demanded);

        //    var _PickedQuantity = $("#txtReceiveDetailsPickedQuantity" + pReceiveDetailsIDList.split(',')[i]).val();
        //    _PickedQuantity = (parseFloat(_PickedQuantity) == 0 || _PickedQuantity == "" ? 0 : _PickedQuantity);
        //    pReceiveDetailsPickedQuantityList += pReceiveDetailsPickedQuantityList == "" ? _PickedQuantity : (',' + _PickedQuantity);

        //}
        $("#txtPickupDetailsDemandedQuantity").val(demandedTotal);
        var PickupDetailsLocations = [];
        var isValid = true;

            var ItemsBySerial = [];

            $('#tblPickupDetailsLocation tbody tr').each(function () {
                if ($(this).find('td.PDL_DemandedQuantity').text() > 0) {
                    PickupDetailsLocations.push({
                        ItemBalanceID: $(this).find('td.ItemBalanceID').text(),
                        PurchaseItemID: $(this).find('td.PurchaseItemID').text(),
                        PurchaseItemName: $(this).find('td.PurchaseItemName').text(),
                        BySerialNo: $(this).find('td.BySerialNo').text(),
                        //ReceiveDetailsID: $(this).find('td.ReceiveDetailsID').text(),
                        //PickupDetailsID: 0,//Number($('#tblPickupDetails td.ReceiveDetailsID input[value=' + $(this).find('td.ID input').val() + ']').closest('tr').attr('id')),
                        //AvailableQuantity: $('#slPurchaseItem option[value=' + $(this).find('td.PurchaseItemID').text() + ']').attr('AvailableQuantity'),
                        PDL_DemandedQuantity: $(this).find('td.PDL_DemandedQuantity').text(),
                        PickedQuantity: $(this).find('td.PickedQuantity').text(),
                        PDL_LocationID: $(this).find('td.PDL_LocationID').text(),
                        PDL_PalletID: $(this).find('td.PDL_PalletID').text(),

                        PD_PackageTypeID: Number($('#slPurchaseItem option[value=' + $(this).find('td.PurchaseItemID').text() + ']').attr('PackageTypeID')),
                        PD_AvailableQuantity: Number($('#slPurchaseItem option[value=' + $(this).find('td.PurchaseItemID').text() + ']').attr('AvailableQuantity')),
                        DemandedQuantity: 0,
                        Notes: ''
                    });
                }
            });

            if (!_isRequest) {
                $.each(PickupDetailsLocations, function (i, item) {
                    if (item.PickedQuantity>0&&!(item.PDL_LocationID > 0)) {
                        swal("Sorry", "Target location is mandatory!");
                        isValid = false;
                        return false;
                    }
                    if (item.PickedQuantity > 0 && IsNull(item.PDL_PalletID, '').trim() == '') {
                        swal("Sorry", "Target pallet is mandatory!");
                        isValid = false;
                        return false;
                    }

                    if (item.BySerialNo==1)
                        ItemsBySerial.push(item.PurchaseItemName);

                });
            }

            if (!isValid) {
                FadePageCover(false);
                return;
            }

        


        
   
     
        //for (var i = 0; i < pReceiveDetailsIDList.split(',').length; i++) {
        var pParametersWithValues = {
            //TODO: Send Header Details to save
              PickupID: $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() == "" ? "0" : $("#slWarehouse").val()
            , CustomerID: $("#slCustomer").val() == "" ? "0" : $("#slCustomer").val()
            , OwnerID: $("#slOwner").val() == "" ? "0" : $("#slOwner").val()
            , BillTo: $("#slBillTo").val() == "" ? "0" : $("#slBillTo").val()
            , EndUserID: $("#slEndUser").val() == "" ? "0" : $("#slEndUser").val()
            , OrderDate: ($("#txtOrderDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtOrderDate").val().trim()))
            , RequiredDate: ($("#txtRequiredDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtRequiredDate").val().trim()))
            , IsFinalized: $("#cbIsFinalized").prop("checked")
            , FinalizeDate: "01/01/1900"
            , HeaderNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , DriverName: $("#txtDriverName").val().trim() == "" ? "0" : $("#txtDriverName").val().trim().toUpperCase()
            , OperationID: $("#slOperation").val() == "" ? "0" : $("#slOperation").val()
            , EquipmentID: $("#slEquipment").val() == "" ? "0" : $("#slEquipment").val()
            , RMANumber: $("#txtRMANumber").val().trim() == "" ? "0" : $("#txtRMANumber").val().trim().toUpperCase()//PickupDetailsParameters
            , PersonInChargeID: $("#slPersonInCharge").val() == "" ? "0" : $("#slPersonInCharge").val()

            , PickupDetailsID: $("#hPickupDetailsID").val() == "" ? 0 : $("#hPickupDetailsID").val()
            , PurchaseItemID: $("#slPickupDetailsPurchaseItem").val() == "" ? 0 : $("#slPickupDetailsPurchaseItem").val()
            , PD_AvailableQuantity: $("#slPickupDetailsPurchaseItem").val() > 0 ? $("#slPickupDetailsPurchaseItem option:selected").attr('AvailableQuantity'):0
            , PD_PackageTypeID: $("#slPickupDetailsPurchaseItem").val() > 0 ? $("#slPickupDetailsPurchaseItem option:selected").attr('PackageTypeID'):0
            , DemandedQuantity: $("#txtPickupDetailsDemandedQuantity").val() == "" ? 0 : $("#txtPickupDetailsDemandedQuantity").val()
            , Notes: $("#txtPickupDetailsNotes").val().trim() == "" ? 0 : $("#txtPickupDetailsNotes").val().toUpperCase()
            //PickupDetailsLocationsParameters
            , PickupDetailsLocations: PickupDetailsLocations
        };
            CallPOSTFunctionWithParameters("/api/WH_Outbound/PickupDetails_Save", pParametersWithValues
            , function (pData) {
                var _MessageRetuned = pData[4];
                if (_MessageRetuned == "") {
                  
                    $(".classDisableForDetails").attr("disabled", "disabled");
                    var pPickupHeader = JSON.parse(pData[2]);
                    var pPickupDetailsID = pData[3];
                    $("#hPickupDetailsID").val(pPickupDetailsID);
                    $("#txtStatus").attr('val',pPickupHeader.StatusID);
                    $("#txtStatus").val(pPickupHeader.StatusName);
                    $("#tblPickup tr[ID=" + pPickupHeader.ID + "] td.Status").text(pPickupHeader.StatusName);
                    LoadAvailableItems();
                    PickupDetails_BindTableRows(_isRequest ? JSON.parse(pData[1]) : JSON.parse(pData[5]));
                    $("#slWarehouse").val(pPickupHeader.WarehouseID);
                    $("#txtRMANumber").val(pPickupHeader.RMANumber);
                    //PickupDetails_FillModalTables();
                    if (pSaveAndNew) {
                        ClearAll("#PickupDetailsModal");
                    }
                    else {
                        //PickupDetails_FillControls();
                        jQuery("#PickupDetailsModal").modal("hide");
                    }
                    
                    swal("Success", "Saved successfully.");

                    if (ItemsBySerial.length > 0) {
                        setTimeout(function () { swal("Alert", "Items must picked by serial\n" + ItemsBySerial.toString()); }, 500);
                    }

                    if (glbCallingControl == "WarehousingPickup" || glbCallingControl == "WH_OutboundRequest" || glbCallingControl == "WH_Outbound")
                        Pickup_LoadingWithPaging();
                    else
                        PDI_LoadPickupPDIModal($("#hPDIReceiveDetailsID").val());
                }
                else {
                    swal("Sorry", _MessageRetuned);
                    FadePageCover(false);
                }
            }
            , null);
    }
    else
        FadePageCover(false);
}
function PickupDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pPickupDetailsIDsToDelete = GetAllSelectedIDsAsString('tblPickupDetails');
    if (pPickupDetailsIDsToDelete != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/WH_Outbound/PickupDetails_Delete"
                    , { pPickupDetailsIDsToDelete: pPickupDetailsIDsToDelete, pPickupID: $("#hID").val() }
                    , function (pData) {
                        var pPickupDetails = JSON.parse(pData[1]);
                        if (pPickupDetails.length > 0)
                            $(".classDisableForDetails").attr("disabled", "disabled");
                        else
                            $(".classDisableForDetails").removeAttr("disabled");
                        if (pData[0]) {
                            var pPickupHeader = JSON.parse(pData[2]);
                            $("#txtStatus").attr('val', pPickupHeader.StatusID);
                            $("#txtStatus").val(pPickupHeader.StatusName);
                            $("#tblPickup tr[ID=" + pPickupHeader.ID + "] td.Status").text(pPickupHeader.StatusName);
                            PickupDetails_BindTableRows(pPickupDetails);
                        }
                        else {
                            PickupDetails_BindTableRows(pPickupDetails);
                            swal("Sorry", strDeleteFailMessage);
                        }
                        FadePageCover(false);
                    });
            });
}
function PickupDetails_PurchaseItemChanged() {
    debugger;
    $("#hPickupDetailsID").val("");
    $("#txtPickupDetailsDemandedQuantity").val("");
    $("#txtPickupDetailsPickedQuantity").val("");
    $("#txtPickupDetailsNotes").val("");

    $("#tblReceiveDetails tbody").html("");
    if (!_hasRequest)
        $("#tblPickupDetailsLocation tbody").html("");

    var id = $('#slPickupDetailsPurchaseItem option:selected').val();
    if (id > 0) {
        $('#slPickupDetailsPurchaseItem option[value=' + id + ']').attr('PackageTypeID', $('#slPurchaseItem option[value=' + id + ']').attr('PackageTypeID'));
        $('#slPickupDetailsPurchaseItem option[value=' + id + ']').attr('AvailableQuantity', $('#slPurchaseItem option[value=' + id + ']').attr('AvailableQuantity'));
    }
    else {
        $('#slPickupDetailsPurchaseItem option[value=' + id + ']').attr('PackageTypeID', 0);
        $('#slPickupDetailsPurchaseItem option[value=' + id + ']').attr('AvailableQuantity', 0);
    }
}
function PickupDetails_Export(pCalledFrom) {
    debugger;
    if (pCalledFrom == "FromFilter" && ($("#slFilterCustomer").val() == "" || $("#slFilterCustomer").val() == 0))
        swal("Sorry", "Please, select customer.");
    else if ($("#hID").val() == "")
        swal("Sorry", "No records to export.");
    else {
        FadePageCover(true);
        var pWhereClauseExportReceiveDetails = "";
        if (pCalledFrom == "FromFilter")
            pWhereClauseExportPickupDetails = PickupDetails_Export_GetWhereClause();
        else if (pCalledFrom == "FromEditModal" || pCalledFrom == "WithLocationDetails")
            pWhereClauseExportPickupDetails = "WHERE PickupID=" + $("#hID").val();
        var pParametersWithValues = {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseExportPickupDetails: pWhereClauseExportPickupDetails
            , pOrderBy: "ID"
            , pCalledFrom: pCalledFrom
        };
        CallGETFunctionWithParameters("/api/WH_Outbound/PickupDetails_Export"
            , pParametersWithValues
            , function (pData) {
                var _ExportedRows = JSON.parse(pData[0]);
                //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
                if (pCalledFrom == "WithLocationDetails")
                    ExportToExcel(_ExportedRows, "PickupCode,SKU,Description,Quantity,Finalized,Notes,LocationCode,PalletID,Serial", "New File", null);
                else
                    ExportToExcel(_ExportedRows, "PickupCode,ProductCode,ProductName,Quantity,Finalized,Notes", "New File", null);
                FadePageCover(false);
            }
            , null);
    }
}
function PickupDetails_Export_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + "\n";
    if ($("#slFilterWarehouse").val() != "" && $("#slFilterWarehouse").val() != 0)
        pWhereClause += "AND WarehouseID =" + $("#slFilterWarehouse").val() + "\n";
    if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != 0)
        pWhereClause += "AND CustomerID =" + $("#slFilterCustomer").val() + "\n";

    return pWhereClause;
}

function AddDetail() {

    if (!($('#slWarehouse').val() > 0)) {
        swal("Sorry", "Select Warehouse");
        return;
    }
    if (!($('#slCustomer').val() > 0)) {
        swal("Sorry", "Select Customer");
        return;
    }
    if ($('#slOwner option[value!=""]').length > 0 && !($('#slOwner').val() > 0)) {
        swal("Sorry", "Select Project");
        return;
    }
    var html = `<tr id='0'>
            <td class='Delete hide'><input type="checkbox"/></td>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='LineNo'></td>
            <td class=''><span class="btn btn-blue btn-sm" onclick="PickupDetails_FillControls(0,this);">Open</span></td>
            <td class='PurchaseItemID'><select data-required="false" class="form-control" onchange="SetItemUnit(this);">`+ $('#slPurchaseItem').html() + `</select></td>           
            <td class='PurchaseItemName'><input type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" data-required="false" readonly/></td>         
            <td class='PD_PackageTypeID'><select data-required="false" class="form-control"></select></td>         
            <td class='PD_AvailableQuantity hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);" disabled/></td>
            <td class='DemandedQuantity hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);" onkeyup="ValidateMaxLimitQty(this,'PD_AvailableQuantity');"/></td>
            <td class='PickedQuantity hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);" disabled/></td>
            <td class='LastModificator'></td>
            <td class='`+ (!_hasRequest || _isRequest ? "" : "hide") + `'><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);ReSerialPickupDetailsTable();'></span></td>
            </tr>`;

        AppendRowtoTable("tblPickupDetails", (html));

    if (_isRequest)
        $('#tblPickupDetails .PD_AvailableQuantity').removeClass('hide');
    if (_isRequest || _hasRequest)
        $('#tblPickupDetails .DemandedQuantity').removeClass('hide');

    $('#tblPickupDetails td.PurchaseItemID select').css({ 'width': '100%' }).select2();
    ReSerialPickupDetailsTable();
}
function ReSerialPickupDetailsTable() {
    var i = 1;
    $('#tblPickupDetails tbody tr').each(function () {
        $(this).find('td.LineNo').text(i);
        i++;
    });
}
//***************************************PickupDetails REGION END***********************************//

//***************************ReceiveDetails(Inventory or AvailableStock) REGION********************//
function ReceiveDetails_BindTableRows(pItemsBalance, pPickupDetails, pPickupDetailsLocation) {
    debugger;


    var _AvailableQuantity = 0;
    var _DemandedQuantity = 0;
    var _PickedQuantity = 0;
    ClearAllTableRows("tblReceiveDetails");

    $.each(pItemsBalance, function (i, item) {
        //debugger;
        //var key = btoa(item.PurchaseItemID + '_' + item.PalletID + '_' + item.LocationID);
       
        if (_Picking[item.ID]) {
            _DemandedQuantity = Number(_Picking[item.ID]['DemandedQuantity']);
            _PickedQuantity = Number(_Picking[item.ID]['PickedQuantity']);
        }
        else {
            _DemandedQuantity = 0;
            _PickedQuantity = 0;
        }
        _AvailableQuantity = Number(item.Quantity) - Number(item.PDL_DemandedQuantity);
        if (Number($('#txtStatus').attr('val')) > constPickupStatusCreated)
            _AvailableQuantity += Number(_DemandedQuantity);
        if (_AvailableQuantity > Number(item.Quantity))
            _AvailableQuantity -= Number(_DemandedQuantity);

        if ((_isRequest && _AvailableQuantity > 0) || (!_isRequest && _DemandedQuantity > 0)) {

            AppendRowtoTable("tblReceiveDetails",
                ("<tr ID='" + item.ID + "'>"
                    //+ "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                    + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                    + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                    + "<td class='BySerialNo hide'>" + (item.BySerialNo? 1 : 0) + "</td>"
                    + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                    + "<td class='PackageTypeName hide'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "<td class='LocationTypeID hide'>" + item.LocationTypeID + "</td>"
                    + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                    + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                    + "<td class='PalletID'>" + item.PalletID + "</td>"
                    + "<td class='BatchNo'>" + item.BatchNumber + "</td>"
                    + "<td class='ProductionDate'>" + (item.ProductionDate == '/Date(-2208996000000)/' ? '' : ConvertDateFormat(new Date(1 * item.ProductionDate.substring(6, item.ProductionDate.length - 2)).toLocaleDateString())) + "</td>"
                    + "<td class='ExprirationDate'>" + (item.ExpirationDate == '/Date(-2208996000000)/' ? '' : ConvertDateFormat(new Date(1 * item.ExpirationDate.substring(6, item.ExpirationDate.length - 2)).toLocaleDateString())) + "</td>"

                    + "<td class='AvailableQuantity Demanding hide'> <input type='text' style='width:90px;' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onchange='' data-required='false' value='" + _AvailableQuantity + "' disabled/> </td>"
                    + "<td class='PDL_DemandedQuantity Picking hide'> <input type='text' style='width:90px;' id='txtReceiveDetailsDemandedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);'  onkeyup='ValidateMaxLimitQty(this,`AvailableQuantity`);' data-required='false' value='" + _DemandedQuantity + "' " + (_isRequest ? "" : "disabled") + "/> </td>"
                    + "<td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtReceiveDetailsPickedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onkeyup='ValidateMaxLimitQty(this,`" + (_hasRequest ? `PDL_DemandedQuantity` : `AvailableQuantity`) + "`);' onchange='ReceiveDetails_SetIsRowChanged(id);' data-required='false' value='" + (_hasRequest? _PickedQuantity:0) + "' " + (_isRequest ? "disabled" : "") + "/> </td>"

                    + "<td class='PDL_LocationID Picking hide'><select data-required='false' class='form-control' onchange='UpdateReceiveList(" + item.ID +", `PDL_LocationID`, null, this);'>" + $('#slLocation').html() + "</select></td>"
                    + "<td class='PDL_PalletID Picking hide'><input type='text' class='form-control input-sm' value='" + (item.PDL_PalletID ? item.PDL_PalletID : '') + "' onkeyup='UpdateReceiveList(" + item.ID +", `PDL_PalletID`, null ,this);'/></td>"
                    + "<td class='Demand Demanding hide'><button type='button' class='btn btn-sm btn-blue' onclick='Demand(this);'>Demand</button></td>"
                    + "<td class='Pick Picking hide'><button type='button' class='btn btn-sm btn-blue' onclick='Pick(this);'" + (!_isRequest && _hasRequest ? '' : 'disabled') + ">Pick</button></td>"
                    + "<td class='Relocate Picking hide'><button type='button' class='btn btn-sm btn-blue' onclick='Relocate(this);'" + (!_isRequest && _DemandedQuantity > 0 ? '' : 'disabled') + ">Relocate</button></td>"

                    + "</tr>"));

            //UpdateReceiveList(item.ID, 'IsShown', true, null);

            if (!_isRequest && _hasRequest) {
                var lineIndex = Number($('#tblReceiveDetails tbody tr').length) - 1;
                var locationChange = $('#tblReceiveDetails tbody tr:eq(' + lineIndex + ') td.PDL_LocationID select').attr('onchange');
                $('#tblReceiveDetails tbody tr:eq(' + lineIndex + ') td.PDL_LocationID select').removeAttr('onchange');
                $('#tblReceiveDetails tbody tr:eq(' + lineIndex + ') td.PDL_LocationID select').val((_pickupLocationId > 0 ? _pickupLocationId : item.LocationID)).change();
                $('#tblReceiveDetails tbody tr:eq(' + lineIndex + ') td.PDL_LocationID select').attr('onchange', locationChange);
                $('#tblReceiveDetails tbody tr:eq(' + lineIndex + ') td.PDL_PalletID input').val(item.PalletID);
            }
        }
        //if (_hasRequest && !_isRequest && demanded == 0)
        //    return false;
    });

    $.each(_ItemsBalance, function (i, item) {
        item['IsShown'] = true;
    });

    $('#tblReceiveDetails .Pick button').prop('disabled', true);
    $('#tblReceiveDetails tbody td.PDL_LocationID select').css({ 'width': '100%' }).select2();
    if (_isRequest) {
        $('#tblReceiveDetails .AvailableQuantity').removeClass('hide');
        $('#tblReceiveDetails .PDL_DemandedQuantity').removeClass('hide');
        $('#tblReceiveDetails .Demanding').removeClass('hide');
    }
    else {
        if (_hasRequest) {
            $('#tblReceiveDetails .Picking').removeClass('hide');
            $('#tblReceiveDetails .Pick button').prop('disabled',false);
        }
        else {
            $('#tblReceiveDetails .AvailableQuantity').removeClass('hide');
            $('#tblReceiveDetails .Picking').addClass('hide');
        }
    }
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    //BindAllCheckboxonTable("tblReceiveDetails", "ID", "cb-CheckAll-ReceiveDetails");
    //CheckAllCheckbox("HeaderDeleteReceiveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReceiveDetails_SetIsRowChanged(pControlID) {
    debugger;
}
//***************************ReceiveDetails(Inventory or AvailableStock) REGION END****************//

/***************************************PickupDetailsLocation***************************************/
function PickupDetailsLocation_BindTableRows(pPickupDetailsLocation, pManualClick) {
    debugger;
    var pickedQty = 0;
    if (!_hasRequest && pManualClick)
        ClearAllTableRows("tblPickupDetailsLocation");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
    $.each(pPickupDetailsLocation, function (i, item) {
        pickedQty += item.PickedQuantity;
        AppendRowtoTable("tblPickupDetailsLocation",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='PickupDetailsLocation_FillControls(" + item.ID + ");'") : "") + " class='" + (_isRequest || item.PickedQuantity>0?'':'hide') + "'>"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                //+ "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='ReceiveDetailsID hide'>" + item.ReceiveDetailsID + "</td>"
                //+ "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='ItemBalanceID hide'>" + (item.ItemBalanceID == 0 ? "" : item.ItemBalanceID) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='BySerialNo hide'>" + (item.BySerialNo? 1 : 0) + "</td>"
                + "<td class='ReceiveCode hide'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='AvailableQuantity'>" + (item.Quantity - item.PickedQuantity).toFixed(2) + "</td>"
                //+ "<td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationPickedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='" + item.PickedQuantity + "' /> </td>"
                + "<td class='PDL_DemandedQuantity Demanding hide'>" + item.PDL_DemandedQuantity + "</td>"
                + "<td class='PickedQuantity Picking hide'>" + item.PickedQuantity + "</td>"
                + "<td class= 'PDL_LocationID hide'> " + item.PDL_LocationID + "</td>"
                + "<td class='PDL_LocationCode'>" + item.PDL_LocationCode + "</td>"
                + "<td class='PDL_PalletID'>" + item.PDL_PalletID + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                //+ "<td class='PalletID'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                //+ "<td class='StatusID hide'>" + item.StatusID + "</td>"
                //+ "<td class='Status'>" + item.StatusName + "</td>"
                + "<td class='UnDemand Demanding hide'><button type='button' class='btn btn-sm btn-blue' onclick='UnDemand(this);'>UnDemand</button></td>"
                + "<td class='UnPick Picking hide'><button type='button' class='btn btn-sm btn-blue' onclick='UnPick(this);'>UnPick</button></td>"
                + "<td class=''><a href='#ReceiveDetailsSerialModal' data-toggle='modal' onclick='ReceiveDetailsSerial_FillModal(" + item.ID + ");' " + (item.BySerialNo?'':'disabled')+" " + serialControlsText + "</a></td>"
                + "</tr>"));
    });
    if (_isRequest)
        $('#tblPickupDetailsLocation .Demanding').removeClass('hide');
    else
        $('#tblPickupDetailsLocation .Picking').removeClass('hide');

    $('#txtPickupDetailsPickedQuantity').val(pickedQty);
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetailsLocation", "ID", "cb-CheckAll-PickupDetailsLocation");
    CheckAllCheckbox("HeaderDeletePickupDetailsLocationID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PickupDetailsLocation_ValidateToSave() {
    debugger;
    var _MessageReturned = "";
    var _QuantityToPick = 0;
    var _TableLength = $("#tblReceiveDetails tbody tr").length;
    for (var i = 0; i < _TableLength; i++) {
        var _RowID = $("#tblReceiveDetails tbody tr:nth-child(" + (i + 1) + ") td input").val();
        var _RowAvailableQuantity = parseFloat($("#tblReceiveDetails tr[ID=" + _RowID + "] td.AvailableQuantity input").val());
        var _RowPickedQuantity = $("#txtReceiveDetailsPickedQuantity" + _RowID).val() == "" ? 0 : parseFloat($("#txtReceiveDetailsPickedQuantity" + _RowID).val());
        _QuantityToPick += _RowPickedQuantity;
        if (_RowPickedQuantity > _RowAvailableQuantity) {
            var _CurrentLocation = $("#tblReceiveDetails tr[ID=" + _RowID + "] td.LocationCode").text();
            _MessageReturned += _CurrentLocation + "\n";
        }
    }
    _MessageReturned = _MessageReturned == "" ? "" : ("Revise the following locations \n" + _MessageReturned);
    //_MessageReturned = _QuantityToPick > $("#txtPickupDetailsDemandedQuantity").val() || $("#txtPickupDetailsDemandedQuantity").val() == ""
    //                   ? ("Please check demanded quantity: \n" + _MessageReturned)
    //                   : _MessageReturned;
    return _MessageReturned;
}
function PickupDetailsLocation_NewRow() {
    debugger;
    ++maxPickupDetailsLocationIDInTable;
    //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
    var tr = "";
    tr += "<tr ID='" + maxPickupDetailsLocationIDInTable + "'>";
    tr += "     <td class='IsInsert hide'> <input type='checkbox' id='cbPickupDetailsLocationIsInsert" + maxPickupDetailsLocationIDInTable + "' checked='checked' /></td>";
    tr += "     <td class='PickupDetailsLocationID'> <input disabled='disabled' type='checkbox' value='" + maxPickupDetailsLocationIDInTable + "' /></td>";
    tr += '     <td class="ReceiveDetailsID" val=""><select id="slPickupDetailsLocationReceiveDetails' + maxPickupDetailsLocationIDInTable + '" style="width:100px;" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="PickupDetailsLocation_SetIsRowChanged(id);" PickupDetailsLocation_FillPorts(' + "'" + "slPickupDetailsLocationReceiveDetails" + maxPickupDetailsLocationIDInTable + "'" + '); data-required="false"></select></td>';
    tr += "     <td class='ReceiveCode'> <input type='text' style='width:180px;' id='txtPickupDetailsLocationReceiveCode" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='AvailableQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationAvailableQuantity" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    tr += "     <td class='PickedQuantity'> <input type='text' style='width:90px;' id='txtPickupDetailsLocationPickedQuantity" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
    //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxPickupDetailsLocationIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="PickupDetailsLocation_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
    tr += "     <td class='Notes hide'> <input type='text' style='width:180px;' id='txtNotes" + maxPickupDetailsLocationIDInTable + "' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='PickupDetailsLocation_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
    tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxPickupDetailsLocationIDInTable + "' type='checkbox' value='" + maxPickupDetailsLocationIDInTable + "' /></td>";
    tr += "     <td class=''>"
        //+ "<a href='#'  onclick='PickupDetailsLocation_CopyRow(" + maxPickupDetailsLocationIDInTable + ");' " + copyControlsText + "</a>"
        + "</td>";
    tr += "</tr>";
    //if ($("#tblPickupDetailsLocation tbody tr").length > 0)
    //    $(tr).insertBefore('#tblPickupDetailsLocation > tbody > tr:first');
    //else
    $("#tblPickupDetailsLocation tbody").prepend(tr);

    //TODO: Add to WhereClause "AND LocationID NOT IN (Selected Locations)"

    /***************************Filling row controls******************************/
    //$("#slPickupDetailsLocationType" + maxPickupDetailsLocationIDInTable).html($("#slPickupDetailsLocationType").html());
    //$("#slPickupDetailsLocationType" + maxPickupDetailsLocationIDInTable).val($("#slPickupDetailsLocationType").val());
    //$("#slSupplier" + maxPickupDetailsLocationIDInTable).html($("#slSupplier").html());
    //$("#slSupplier" + maxPickupDetailsLocationIDInTable).val($("#slSupplier").val());
    //$("#slPOLCountry" + maxPickupDetailsLocationIDInTable).html($("#slPOLCountry").html());
    //$("#slPOLCountry" + maxPickupDetailsLocationIDInTable).val($("#slPOLCountry").val());
    //$("#slPOL" + maxPickupDetailsLocationIDInTable).html($("#slPOL").html());
    //$("#slPOL" + maxPickupDetailsLocationIDInTable).val($("#slPOL").val());
    //$("#slPODCountry" + maxPickupDetailsLocationIDInTable).html($("#slPODCountry").html());
    //$("#slPODCountry" + maxPickupDetailsLocationIDInTable).val($("#slPODCountry").val());
    //$("#slPOD" + maxPickupDetailsLocationIDInTable).html($("#slPOD").html());
    //$("#slPOD" + maxPickupDetailsLocationIDInTable).val($("#slPOD").val());
    //$("#slEquipment" + maxPickupDetailsLocationIDInTable).html($("#slEquipment").html());
    //$("#slEquipment" + maxPickupDetailsLocationIDInTable).val($("#slEquipment").val());
    //$("#slCommodity" + maxPickupDetailsLocationIDInTable).html($("#slCommodity").html());
    //$("#slCommodity" + maxPickupDetailsLocationIDInTable).val($("#slCommodity").val());
    //$("#slCurrency" + maxPickupDetailsLocationIDInTable).html($("#hReadySlCurrencies").html());
    SetDatepickerFormat();
    /***********************EOF Filling row controls******************************/
}
/****************************ReceiveDetailsSerial*************************************/
function ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial) {
    debugger;
    ClearAllTableRows("tblReceiveDetailsSerial");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pReceiveDetailsSerial, function (i, item) {
        AppendRowtoTable("tblReceiveDetailsSerial",
            ("<tr ID='" + item.ID + "' " + (1 == 2 ? ("ondblclick='ReceiveDetailsSerial_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>"
                + "<td class='ID'> <input " + (1 == 1 ? " name='Delete' " : " disabled='disabled' ") + (item.PickupDetailsLocationID > 0 ? " checked='checked' " : "") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='Serial'> <input " + (1 == 1 ? " disabled='disabled' " : "") + " type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.Serial + "' /> </td>"
                //+ "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                + "<td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='hide'><a href='#ReceiveDetailsSerialModal' data-toggle='modal' onclick='ReceiveDetailsSerial_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReceiveDetailsSerial", "ID", "cb-CheckAll-ReceiveDetailsSerial");
    CheckAllCheckbox("HeaderDeleteReceiveDetailsSerialID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function ReceiveDetailsSerial_NewRow() {
    debugger;
    if ($("#txtReceiveDetailsSerialQuantity").val() <= $("#tblReceiveDetailsSerial tbody tr").length)
        swal("Sorry", "Number of serials can not excceed quantity");
    else {
        ++maxReceiveDetailsSerialIDInTable;
        //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
        //var FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
        //var dateValidTo = Date.prototype.addDays(ConvertDateFormat(FormattedTodaysDate), 30);
        var tr = "";
        tr += "<tr ID='" + maxReceiveDetailsSerialIDInTable + "'>";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + maxReceiveDetailsSerialIDInTable + "' checked='checked' /></td>";
        tr += "     <td class='ID'> <input type='checkbox' value='" + maxReceiveDetailsSerialIDInTable + "' /></td>";
        tr += "     <td class='Serial'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
        //tr += '     <td class="ValidFrom"><input id="txtValidFrom' + maxReceiveDetailsSerialIDInTable + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="ReceiveDetailsSerial_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + FormattedTodaysDate + '" /></td>';
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + maxReceiveDetailsSerialIDInTable + "' type='checkbox' value='" + maxReceiveDetailsSerialIDInTable + "' /></td>";
        //tr += "     <td class=''>"
        //                    + "<a href='#'  onclick='ReceiveDetailsSerial_CopyRow(" + maxReceiveDetailsSerialIDInTable + ");' " + copyControlsText + "</a>"
        //              + "</td>";
        tr += "</tr>";
        //if ($("#tblReceiveDetailsSerial tbody tr").length > 0)
        //    $(tr).insertBefore('#tblReceiveDetailsSerial > tbody > tr:first');
        //else
        $("#tblReceiveDetailsSerial tbody").prepend(tr);

        /***************************Filling row controls******************************/
        //SetDatepickerFormat();
        /***********************EOF Filling row controls******************************/
    }
}
function ReceiveDetailsSerial_FillModal(pPickupDetailsLocationID) {
    debugger;
    $("#divSerialsBtns").addClass("hide");
    $("#hPickupDetailsLocationID").val(pPickupDetailsLocationID);
    $("#divReceiveDetailsSerial").html("");

    var tr = $("#tblPickupDetailsLocation tr[ID='" + pPickupDetailsLocationID + "']");
    var ItemBalanceID = $(tr).find("td.ItemBalanceID").text();
    //$("#lblReceiveDetailsSerialShown").html(": " + $(tr).find("td.PurchaseItemCode").text());
    $("#lblReceiveDetailsSerialShown").html($("#lblShown").html());
    $("#txtReceiveDetailsSerialQuantity").val($(tr).find("td.PickedQuantity").text());
    //$("#hReceiveDetailsID").val($(tr).find("td.ReceiveDetailsID").text());
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Outbound/PickupDetailsSerial_FillModal"
        , {
            pItemBalanceID: ItemBalanceID,
            pPickupDetailsLocationID: pPickupDetailsLocationID
        }
        , function (pData) {
            var pReceiveDetailsSerial = JSON.parse(pData[0]);
            if (pReceiveDetailsSerial.length > 0)
                $("#hReceiveDetailsID").val(pReceiveDetailsSerial[0].ReceiveDetailsID);
            ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial);
            FadePageCover(false);
        }
        , null);
}
function ReceiveDetailsSerial_Save() {
    debugger;
    var pReceiveDetailsSerialIDList = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDList == "")
        pReceiveDetailsSerialIDList = "0"; //remove all serials
    if (pReceiveDetailsSerialIDList != "0" //pass only if selected serials<=quantity or no selected serials
        && $("#tblPickupDetailsLocation tr[id=" + $("#hPickupDetailsLocationID").val() + "] td.PickedQuantity").text() < pReceiveDetailsSerialIDList.split(',').length)
        swal("Sorry", "Check number selected serials.");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pPickupDetailsLocationID: $("#hPickupDetailsLocationID").val()
            , pReceiveDetailsID: $("#hReceiveDetailsID").val()
            , pReceiveDetailsSerialIDList: pReceiveDetailsSerialIDList
        };
        CallPOSTFunctionWithParameters("/api/WH_Outbound/PickupDetailsSerial_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "") {
                    jQuery("#ReceiveDetailsSerialModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function ReceiveDetailsSerial_DeleteFromPickup() {
    debugger;
    var pReceiveDetailsSerialIDsDeletedFromPickup = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDsDeletedFromPickup != "")
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
                CallPOSTFunctionWithParameters("/api/Receive/ReceiveDetailsSerial_DeleteFromPickup"
                    , {
                        pReceiveDetailsSerialIDsDeletedFromPickup: pReceiveDetailsSerialIDsDeletedFromPickup
                        , pPickupDetailsLocationID: $("#hPickupDetailsLocationID").val()
                    }
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        if (_MessageReturned == "")
                            swal("Success", "Deleted successfully.");
                        else {
                            swal("Sorry", strDeleteFailMessage);
                        }
                        ReceiveDetailsSerial_BindTableRows(JSON.parse(pData[1]));
                        FadePageCover(false);
                    });
            });
}
function ReceiveDetailsSerial_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}
/**********************************PDI*************************************************/
function PDI_BindTableRows(pPDI) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblPDI");
    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPDI",
            //("<tr ID='" + item.ID + "' ondblclick='PickupDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
            ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadPickupPDIModal(" + item.ID + "," + item.OperationVehicleID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
                + "<td class='ID hide'>" + item.ID + "</td>"
                + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='LocationID hide'>" + item.LocationID + "</td>"
                + "<td class='Quantity hide'>" + item.Quantity + "</td>"
                + "<td class='FinalizedPickedQuantity hide'>" + item.FinalizedPickedQuantity + "</td>"

                + "<td class='BarCode hide'>" + item.BarCode + "</td>"
                + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
                + "<td class='PickedQuantity hide'>" + item.PickedQuantity + "</td>"

                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
                + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
                + "<td class='LocationCode'>" + (item.LocationID == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='AvailableQuantity hide'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedPickedQuantity)) + "</td>"
                + "<td class='MotorNumber'>" + (item.MotorNumber == 0 ? "" : item.MotorNumber) + "</td>"
                + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
                + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"

                + "<td class=''><a href='#' data-toggle='modal' onclick='PDI_Print(" + item.OperationVehicleID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPDI", "ID");
    CheckAllCheckbox("ID");
    /////HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PDI_LoadingWithPaging() {
    debugger;
    var pWhereClause = PDI_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForPDI: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PDI_BindTableRows(JSON.parse(pData[0])); });
    //HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
}
function PDI_GetWhereClause() {
    debugger;
    var _WhereClause = "";

    _WhereClause += "WHERE 1=1 and  (Quantity>FinalizedPickedQuantity) AND OperationVehicleID IS NOT NULL ";

    if ($("#slWarehouseSearch").val() != "" && $("#slWarehouseSearch").val() != null)
        _WhereClause += " and  WarehouseID=" + $("#slWarehouseSearch").val() + " ";
    if ($("#slAreaSearch").val() != "") {
        _WhereClause += " and  AreaID=" + $("#slAreaSearch").val() + " ";
    }
    if ($("#slLocationSearch").val() != null && $("#slLocationSearch").val() != "") {
        _WhereClause += " and  LocationID=" + $("#slLocationSearch").val() + " ";
    }
    if ($("#txtMotorNumberSearch").val().trim() != "") {
        _WhereClause += " and  MotorNumber='" + $("#txtMotorNumberSearch").val().trim() + "' ";
    }
    if ($("#txtChassisNoSearch").val().trim() != "") {
        _WhereClause += " and  ChassisNumber='" + $("#txtChassisNoSearch").val().trim() + "' ";
    }
    if ($("#txtOCNCodeSearch").val().trim() != "") {
        _WhereClause += " and  OCNCode='" + $("#txtOCNCodeSearch").val().trim() + "' ";
    }

    return _WhereClause;
}
function PDI_LoadPickupPDIModal(pID, pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    ClearAll("#PickupModal");

    var tr = $("#tblPDI tr[ID='" + pID + "']");
    $("#lblShown").html(": " + $(tr).find("td.ChassisNumber").text());

    $("#tblPickupDetails tbody tr").html("");
    $("#hPDIReceiveDetailsID").val(pID);
    $("#hOperationVehicleID").val(pOperationVehicleID);
    $("#txPickupDetailsPurchaseItemQuantity").val(1);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIDetails = JSON.parse(pData[0]);
            PDIDetails_BindTableRows(_PDIDetails);
            $("#btn-NewAdd").attr("onclick", "Pickup_ClearAllControls(" + pID + ");");
            jQuery("#PickupModal").modal("show");
            FadePageCover(false);
        }
        , null);
}
function PDI_Print(pOperationVehicleID) {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE OperationVehicleID=" + pOperationVehicleID;
    var pPageSize = 999999; //$('#select-page-size').val();
    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    CallGETFunctionWithParameters("/api/PDI/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pControllerParameters
        , function (pData) {
            var _PDIRows = JSON.parse(pData[0]);
            if (_PDIRows.length == 0)
                swal("Sorry", "No PDI done for this vehicle.");
            else {
                var _TodaysDate = getTodaysDateInddMMyyyyFormat();
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + 'PDI' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';

                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' PDI ' + '</b></h3></div>';

                //ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_PDIRows[0].CodeSerial == 0 ? '' : _PDIRows[0].CodeSerial) + '</div>';
                //ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Chassis Number : </b>' + _PDIRows[0].ChassisNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>Motor Number : </b>' + _PDIRows[0].EngineNumber + '</div>';
                ReportHTML += '             <div class="col-xs-12">' + '<b>OCN Code : </b>' + _PDIRows[0].OCNCode + '</div>';

                ReportHTML += '                         <table id="tblPDIPrint" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr>';
                ReportHTML += '                                     <th style="width:5%;">' + 'Serial' + '</th>';
                ReportHTML += '                                     <th>' + 'PDI Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Code' + '</th>';
                ReportHTML += '                                     <th>' + 'Item Name' + '</th>';
                ReportHTML += '                                     <th>' + 'Quantity' + '</th>';
                ReportHTML += '                                     <th>' + 'Date' + '</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                for (var i = 0; i < _PDIRows.length; i++) {
                    ReportHTML += '                                 <tr class="" style="">';
                    ReportHTML += '                                     <td>' + (i + 1) + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Code + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemCode + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemName + '</td>';
                    ReportHTML += '                                     <td>' + _PDIRows[i].Quantity + '</td>';
                    ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_PDIRows[i].ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_PDIRows[i].ActionDate))) + '</td>';
                    ReportHTML += '                                 </tr>';
                }
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';

                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
                //ReportHTML += '                 </div>'
                //ReportHTML += '                 <div class="" style="clear:both;">';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
                //ReportHTML += '                 </div>'

                ReportHTML += '         </body>';

                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
                //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                ReportHTML += '     </footer>';

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            FadePageCover(false);
        }
        , null);
}
function PDIDetails_BindTableRows(pPDI) {
    debugger;
    if (pPDI.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblPickupDetails");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pPDI, function (i, item) {
        AppendRowtoTable("tblPickupDetails",
            ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='PickupDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ReceiveDetailsID hide'>" + item.ReceiveDetailsID + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                + "<td class='PDICode'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                //+ "<td class='ReceiveDetailsID hide'>" + (item.ReceiveDetailsID == 0 ? "" : item.ReceiveDetailsID) + "</td>"
                //+ "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 ? "" : item.ReceiveCode) + "</td>"
                //+ "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                //+ "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='PickedQuantity'>" + item.Quantity + "</td>"
                + "<td class='ActionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActionDate))) + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                //+ "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                //+ "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='hide'><a href='#PickupDetailsModal' data-toggle='modal' onclick='PickupDetails_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "</tr>"));
    });
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblPickupDetails", "ID", "cb-CheckAll-PickupDetails");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function PDIDetails_Save() {
    debugger;
    if ($("#txPickupDetailsPurchaseItemQuantity").val() == 0 || $("#slPickupDetailsPurchaseItem").val() == "")
        swal("Sorry", "Please, select item and quantity");
    else {
        FadePageCover(true);
        var pParametersWithValues = {
            pID: 0 //$("#hPDIID").val() == "" ? 0 : $("#hPDIID").val()
            , pReceiveDetailsID: $("#hPDIReceiveDetailsID").val()
            , pOperationVehicleID: $("#hOperationVehicleID").val()
            , pPurchaseItemID: $("#slPickupDetailsPurchaseItem").val() == 0 ? "" : $("#slPickupDetailsPurchaseItem").val()
            , pQuantity: $("#txPickupDetailsPurchaseItemQuantity").val() == "" ? 0 : $("#txPickupDetailsPurchaseItemQuantity").val()
            , pActionDate: "01/01/1900"
            , pNotes: "0"
        };
        CallGETFunctionWithParameters("/api/PDI/Save", pParametersWithValues
            , function (pData) {
                var _ReturnedMessage = pData[0];
                var _PDI = JSON.parse(pData[1]);
                if (_ReturnedMessage == "") {
                    $("#txPickupDetailsPurchaseItemQuantity").val(1);
                    $("#slPickupDetailsPurchaseItem").val("");
                    PDIDetails_BindTableRows(_PDI);
                }
                else {
                    swal("Sorry", _ReturnedMessage);
                }
                FadePageCover(false);
            }
            , null);
    }
}
function PDIDetails_DeleteList() {
    debugger;
    var pPDIIDsToDelete = GetAllSelectedIDsAsString('tblPickupDetails');
    if (pPDIIDsToDelete != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/PDI/DeleteList"
                    , { pPDIIDsToDelete: pPDIIDsToDelete, pOperationVehicleID: $("#hOperationVehicleID").val() }
                    , function (pData) {
                        var _ReturnedMessage = pData[0];
                        var _PDI = JSON.parse(pData[1]);
                        if (_ReturnedMessage == "") {
                            PDIDetails_BindTableRows(_PDI);
                        }
                        else {
                            swal("Sorry", _ReturnedMessage);
                        }
                        FadePageCover(false);
                    });
            });
}

//*********************************Upload Excel REGION***********************************//
function UploadExcelFile() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#ExcelPickupItems").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            data.append("pID", $("#hID").val())     //PickupID
            FadePageCover(true);
            $.ajax({
                url: '/api/WH_Outbound/UploadExcel',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: data,
                success:
                    function (result) {
                        debugger;
                        FadePageCover(false);
                        console.log(result.exception);
                        if (result.ResultCode == 1) {
                            swal({
                                title: "Success",
                                text: "Upload done successfully! \n" + (result.DefectedItemsMessage == "" ? "" : "Warning!! : " + result.DefectedItemsMessage),
                                showCancelButton: false,
                                confirmButtonColor: "#65bd77",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                            }, function () {
                                Pickup_FillAllControls($("#hID").val());
                            });
                        }
                        else if (result.MissingFields != "")
                            swal("Sorry", "File Uploading failed .. " + result.MissingFields);
                        else if (result.exception != "")
                            swal("Sorry", "File Uploading failed .. " + result.exception);
                        else if (result.InvalidQuantityMessage != "")
                            swal("Sorry", "File Uploading failed .. " + result.InvalidQuantityMessage);

                        $('#btnImportExcel').prop('disabled', false);
                    }
                ,
                error: function (err) {
                    FadePageCover(false);
                    swal("Sorry", err.statusText);
                    $('#btnImportExcel').prop('disabled', false);
                }

            });
        }
        else {
            swal("Sorry", "Choose Excel File");
            $('#btnImportExcel').prop('disabled', false);
        }
    }
    else {
        alert("FormData is not supported.");
        $('#btnImportExcel').prop('disabled', false);
    }

}
function sendEmailAfterUpload() {
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pSelectedAlarmReceiversIDs == "")
        swal("Sorry", "Please, select receivers.");
    else {
        var pSubject = "Receive Products!";
        var pBody = "Sender: " + pLoggedUser.Name;
        pBody += `<br> New products are in the way with Receive Code ${$("#tblReceive tbody tr[id=" + $("#hID").val() + "] .Code").html()}!`;
        var pOperationID = 0;
        var pIsSendNormalEmail = true;
        SendNormalAndLocalEmail(pSubject, pBody, pOperationID, pIsSendNormalEmail);
    }
}
function Pickup_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "sendEmailAfterUpload();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Pickup_GetAvailableUsers();");
}

function Receive_Search() {
    debugger;
    var details = _ItemsBalance;
    if (!_isRequest)
        details = details.filter(function (row) { return row.IsShown == true });
    if ($("#txtFilterItem").val().trim() != "")
        details = details.filter(function (row) { return (IsNull(row.PurchaseItemCode, '')).toLowerCase().includes($('#txtFilterItem').val().trim().toLowerCase()); });

    if ($("#txtFilterItemName").val().trim() != "")
        details = details.filter(function (row) { return (IsNull(row.PurchaseItemName, '')).toLowerCase().includes($('#txtFilterItemName').val().trim().toLowerCase()); });

    if ($("#txtFilterLocation").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.LocationCode, '').toLowerCase().includes($('#txtFilterLocation').val().trim().toLowerCase()); });

    if ($("#txtFilterRecCode").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.ReceiveCode, '').toLowerCase().includes($('#txtFilterRecCode').val().trim().toLowerCase()); });

    if ($("#txtFilterBarCode").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.BarCode, '').toLowerCase().includes($('#txtFilterBarCode').val().trim().toLowerCase()); });

    if ($("#txtFilterDefectionReason").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.DefectionReason, '').toLowerCase().includes($('#txtFilterDefectionReason').val().trim().toLowerCase()); });

    //if ($("#txtFilterQty").val().trim() != "")
    //    details = details.filter(function (row) { return row.ExpectedQuantity==$('#txtFilterQty').val(); });

    if ($("#txtFilterPalletId").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#txtFilterPalletId').val().trim().toLowerCase()); });

    if ($("#txtFilterLotNo").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.LotNo, '').toLowerCase().includes($('#txtFilterLotNo').val().trim().toLowerCase()); });

    if ($("#txtFilterBatchNo").val().trim() != "")
        details = details.filter(function (row) { return IsNull(row.BatchNumber, '').toLowerCase().includes($('#txtFilterBatchNo').val().trim().toLowerCase()); });

    if ($('#txtFilterProduction').val().trim()) 
        details = details.filter(function (row) { return GetDateWithFormatMDY(row.ProductionDate).includes($('#txtFilterProduction').val().trim().toLowerCase()); });

    if ($('#txtFilterExpriration').val().trim())
        details = details.filter(function (row) { return GetDateWithFormatMDY(row.ExpirationDate).includes($('#txtFilterExpriration').val().trim().toLowerCase()); });

    ReceiveDetails_BindTableRows(details, _PickupDetails, _PickupDetailsLocation);
}


//*******************************Upload Excel REGION END*******************************//

//*******************************SERVICES REGION************************************//
function AddService() {
    AppendRowtoTable("tblExtraServices",
        (`<tr id='RS-` + $('#tblExtraServices tbody tr').length + `'>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='ServiceID'><select data-required="false" class="form-control" onchange="GetServicePrice(this);">`+ $('#slServices').html() + `</select></td>           
            <td class='Selling hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" readonly/></td>
            <td class='Quantity'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeyup="CalcServiceAmount(this);"/></td>
            <td class='SellingAmount hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" readonly/></td>
            <td class='Notes'><input class="form-control" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"/></td>
			<td><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);DeleteServices(this);'></span></td>
        </tr>`));
    //$('#tblExtraServices td.ServiceID select').css({ 'width': '100%' }).select2();
}
function GetServicePrice(pSelect) {
    debugger;
    if (_hasRequest)
        return;
    var serviceId = $(pSelect).val();
    var customerId = $('#slCustomer').val();
    var orderDate = ConvertDateFormat($('#txtOrderDate').val());
    if (!(serviceId > 0) || !(customerId > 0)) {
        return;
    }
    var whereClause = "where CustomerID=" + customerId + " and ServiceID=" + serviceId + " and Approved=1 and format(cast('" + orderDate + "' as date),'yyyy-MM-dd') between cast(FromDate as date) and  cast(ToDate as date)"
    CallGETFunctionWithParameters("/api/Contract/GetServicePrice", { pWhereClause: whereClause }
        , function (pData) {
            if (pData > 0) {
                var price = Number(pData);
                $(pSelect).closest('tr').find('td.Selling input').val(price);
            }
            else {
                swal("Sorry", "No Price!");
                $(pSelect).closest('tr').find('td.Selling input').val(0);
            }
            $(pSelect).closest('tr').find('td.Quantity input').trigger('keyup');
        }
        , null);
}
function CalcServiceAmount(pInp) {
    debugger;
    var qty = Number($(pInp).val());
    var price = Number($(pInp).closest('tr').find('td.Selling input').val());
    var amount = qty * price;
    $(pInp).closest('tr').find('td.SellingAmount input').val(amount);
}
function SaveServices() {
    debugger;
    pParametersWithValues = {
        HasRequest: _hasRequest
    };
    var services = [];
    var isValid = true;
    $('#tblExtraServices tbody tr').each(function () {
        services.push({
            ID: $(this).find('td.ID input').val(),
            TransSourceID: IsNull($("#hID").val(), 0),
            Direction: 2,//pickup
            ServiceID: $(this).find('td.ServiceID select').val(),
            ServiceSelling: $(this).find('td.Selling input').val(),
            Quantity: $(this).find('td.Quantity input').val(),
            Notes: $(this).find('td.Notes input').val(),
        });

        if (!(services[services.length - 1].ServiceID > 0)) {
            swal("Sorry", "Service Is Mandatory");
            isValid = false;
            return false;
        }
        if (!(services[services.length - 1].Quantity > 0)) {
            swal("Sorry", "Quantity Is Mandatory");
            isValid = false;
            return false;
        }
        if (!_hasRequest && !(services[services.length - 1].ServiceSelling > 0)) {
            swal("Sorry", "Selling Is Mandatory");
            isValid = false;
            return false;
        }
    });

    if (!isValid)
        return;

    pParametersWithValues['Details'] = services;
    CallPOSTFunctionWithParameters("/api/WH_TransServices/Save", pParametersWithValues
        , function (pData) {
            if (pData.Result) {
                swal("Success", "Saved Successfully!");
            }
            else {
                swal("Sorry", "Saving Faild!");
                console.log(pData.Exception);
            }
        }
        , null);
}
function LoadServices(pID) {
    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: "where TransSourceID = " + pID + " and Direction = 2"
    };
    CallGETFunctionWithParameters("/api/WH_TransServices/LoadTransServices", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData.Data);
            $.each(data, function (i, item) {
                AddService();
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.ServiceID select').val(item.ServiceID);
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.Selling input').val(item.ServiceSelling);
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.Quantity input').val(item.Quantity);
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.SellingAmount input').val(item.SellingAmount);
                $('#tblExtraServices tbody tr:eq(' + i + ')').find('td.Notes input').val(item.Notes);
            });
        }
        , null);
}
function DeleteServices(pSpan) {
    debugger;
    var id = $(pSpan).closest('tr').find('td.ID input').val();

    //Confirmation message to delete
    if (id > 0)
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
                CallGETFunctionWithParameters("/api/WH_TransServices/Delete", { "pIDs": id }
                    , function (pData) {
                        if (pData) {
                            LoadServices($('#hID').val());
                        }
                        else {
                            swal("Sorry", "Deleting faild!");
                        }
                    });
            });
    //DeleteListFunction("/api/Pickup/Delete", { "pPickupIDs": GetAllSelectedIDsAsString('tblPickup') }, function () { Pickup_LoadingWithPaging(); });
}
//*******************************SERVICES REGION END*******************************//

//*********************************PRINT REGION***************************************//
function PickList_Print() {
    debugger;
    var arr_Pics = new Array();
    var arr_PicsLocations = new Array();
    arr_Pics.push('picLogo');
    arr_PicsLocations.push('' + glbBaseUrl + '\Content\\Images\\Logo.png');

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("dummy");
    arr_Values.push("0");

    if (_hasRequest) {
  
        var query = `select * from vwWH_Outbound_rpt where ID = ${$('#hID').val()} Order  By PDL_LocationCode, ItemCode`;

            var pParametersWithValues =
            {
                  query: query
                , arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , arr_Pics: arr_Pics
                , arr_PicsLocations: arr_PicsLocations
                , pTitle: "Picking Report"
                , pReportName: "Rep_EFPickList"
                , pReportType: "Print"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
                + '&query=' + pParametersWithValues.query + ''
                + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
                + '&arr_Values=' + pParametersWithValues.arr_Values + ''
                + '&pReportName=' + pParametersWithValues.pReportName + ''
                + '&pReportType=' + pParametersWithValues.pReportType + ''
                + '&arr_Pics=' + pParametersWithValues.arr_Pics + ''
                + '&arr_PicsLocations=' + pParametersWithValues.arr_PicsLocations + '';

            win.location = url;
        
    }
    else {
        debugger;
       

            let query = "Rep_3PLPickList ' WHERE P.ID = " + $("#hID").val() + "'";

            var pParametersWithValues =
            {
                query: query
                , arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , arr_Pics: arr_Pics
                , arr_PicsLocations: arr_PicsLocations
                , pTitle: "Pick List"
                , pReportName: "Rep_3PLPickList"
                , pReportType: "Print"
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
                + '&query=' + pParametersWithValues.query + ''
                + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
                + '&arr_Values=' + pParametersWithValues.arr_Values + ''
                + '&pReportName=' + pParametersWithValues.pReportName + ''
                + '&pReportType=' + pParametersWithValues.pReportType + ''
                + '&arr_Pics=' + pParametersWithValues.arr_Pics + ''
                + '&arr_PicsLocations=' + pParametersWithValues.arr_PicsLocations + '';

            win.location = url;
       
    }

}
function PickupDetails_Print(pIsRequest) {
    debugger;
    if (_hasRequest) {

        var arr_Pics = new Array();
        var arr_PicsLocations = new Array();

        arr_Pics.push('picLogo');
        arr_PicsLocations.push('' + glbBaseUrl + '\Content\\Images\\Logo.png');

        var arr_Keys = new Array();
        var arr_Values = new Array();

        arr_Keys.push("dummy");
        arr_Values.push("0");

        arr_Keys.push("IsRequest");
        arr_Values.push(pIsRequest);

        var title = pIsRequest ? "Outbound Shipment" : "OUTBOUND-BILL OF Loading";
        arr_Keys.push("title");
        arr_Values.push(title);

        var ReportName = "WH_OutboundShipment";

        var query = `select Code,CustomerName,WarehouseName,WarehouseToName,Notes,CreationDate,CreatorUserName,ItemCode,ItemName,BatchNumber,Sum(PDL_DemandedQuantity) PDL_DemandedQuantity, Sum(PickedQuantity) PickedQuantity,UOM,ProductionDate,ExpirationDate,DriverName,TruckNo from vwWH_Outbound_rpt where ID = ${$('#hID').val()} group by Code,CustomerName,WarehouseName,WarehouseToName,Notes,CreationDate,CreatorUserName,ItemCode,ItemName,BatchNumber,UOM,ProductionDate,ExpirationDate,DriverName,TruckNo Order By ItemCode`;

        debugger;

        query = query.replace(/[\n\t]/g, '');
        debugger;
        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , arr_Pics: arr_Pics
            , arr_PicsLocations: arr_PicsLocations
            , pTitle: title
            , pReportName: ReportName
            , pReportType: "Print"
        };

        var win = window.open("", "_blank");

        url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + ''
            + '&arr_Pics=' + pParametersWithValues.arr_Pics + ''
            + '&arr_PicsLocations=' + pParametersWithValues.arr_PicsLocations + '';

        win.location = url;
    }

    else {
        debugger;
        if ($("#hID").val() == "")
            swal("Sorry", "Please, save pickup first.");
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/WH_Outbound/Print", { pPrintedPickupID: $("#hID").val() }
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    if (pData[0] != "")
                        swal("Sorry", _ReturnedMessage);
                    else { //Draw
                        var pHeader = JSON.parse(pData[1]);
                        var pDetails = JSON.parse(pData[2]);
                        var mywindow = window.open('', '_blank');
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>' + 'Proof of Delivery' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                        if (pDefaults.UnEditableCompanyName == "DGL")
                            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'DELIVERY ORDER' + '</h3></div> </br>';
                        else
                            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'PROOF OF DELIVERY' + '</h3></div> </br>';
                        ReportHTML += '             <div class="col-xs-4"><b>Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.RequiredDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.RequiredDate)) : "") + '</b></div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Pickup Code : </b>' + pHeader.Code + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Status : </b>' + pHeader.StatusName + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>On behalf of : </b>' + pHeader.CustomerName + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Person in charge : </b>' + (pHeader.PersonInChargeName == 0 ? pHeader.BillToName : pHeader.PersonInChargeName) + '</div>'; //billto
                        //ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.BillToAddress == 0 ? "" : pHeader.BillToAddress) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.BillToContactName == 0 ? "" : pHeader.BillToContactName) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.BillToContactPhones == 0 ? "" : pHeader.BillToContactPhones) + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Delivered to : </b>' + (pHeader.EndUserName == 0 ? "" : pHeader.EndUserName) + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.EndUserAddress == 0 ? "" : pHeader.EndUserAddress) + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.EndUserContactName == 0 ? "" : pHeader.EndUserContactName) + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.EndUserContactPhones == 0 ? "" : pHeader.EndUserContactPhones) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Operation : </b>' + (pHeader.OperationCode == 0 ? "" : pHeader.OperationCode) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>PO Number : </b>' + (pHeader.PONumber == 0 ? "" : pHeader.PONumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Driver Name : </b>' + (pHeader.DriverName == 0 ? "" : pHeader.DriverName) + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Equipment : </b>' + (pHeader.EquipmentName == 0 ? "" : pHeader.EquipmentName) + '</div>';
                        ReportHTML += '                         <table id="tblPickedDetails_POD" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                        ReportHTML += '                             <thead>';
                        ReportHTML += '                                 <tr>';
                        ReportHTML += '                                     <th>Quantity</th>';
                        ReportHTML += '                                     <th>Pkg.Type</th>';
                        ReportHTML += '                                     <th>Part No.</th>';
                        if (pDefaults.UnEditableCompanyName == "NIL") {
                            ReportHTML += '                                     <th>Model No.</th>';
                            ReportHTML += '                                     <th>Brand</th>';
                        } //if (pDefaults.UnEditableCompanyName == "NIL") {
                        ReportHTML += '                                     <th>Description of Goods</th>';
                        ReportHTML += '                                     <th>Serial</th>';
                        if (pDefaults.UnEditableCompanyName == "EXP") {
                            ReportHTML += '                                     <th>Batch</th>';
                            ReportHTML += '                                     <th>Expiration</th>';
                            ReportHTML += '                                     <th>ImportedBy</th>';
                            //ReportHTML += '                                     <th>Wgt</th>';
                        }
                        ReportHTML += '                                 </tr>';
                        ReportHTML += '                             </thead>';
                        ReportHTML += '                             <tbody>';
                        debugger;
                        var _TotalQuantity = 0.0;
                        var _TotalGrossWeight = 0.0;
                        var _TotalVolume = 0.0;
                        var _WeightUnitCode = 'KGM';
                        var _VolumeUnitCode = 'CBM';
                        $.each(pDetails, function (i, item) {
                            var _RowQuantity = (item.Serial == 0 ? item.PickedQuantity : 1);
                            var _RowGrossWeight = _RowQuantity * item.GrossWeight;
                            var _RowVolume = _RowQuantity * item.Volume;
                            _WeightUnitCode = item.WeightUnitCode;
                            _VolumeUnitCode = item.VolumeUnitCode;
                            _TotalQuantity += _RowQuantity;
                            _TotalGrossWeight += _RowGrossWeight;
                            _TotalVolume += _RowVolume;
                            ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                            ReportHTML += '                                         <td class="Quantity">' + (item.Serial == 0 ? item.PickedQuantity : '1') + '</td>';
                            ReportHTML += '                                         <td>' + (item.PackageTypeName == 0 ? '' : item.PackageTypeName) + '</td>';
                            ReportHTML += '                                         <td>' + (item.PartNumber == 0 ? '' : item.PartNumber) + '</td>';
                            if (pDefaults.UnEditableCompanyName == "NIL") {
                                ReportHTML += '                                         <td>' + (item.ModelNumber == 0 ? '' : item.ModelNumber) + '</td>';
                                ReportHTML += '                                         <td>' + (item.BrandName == 0 ? '' : item.BrandName) + '</td>';
                            } //if (pDefaults.UnEditableCompanyName == "NIL") {
                            ReportHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                            ReportHTML += '                                         <td>' + (item.Serial == 0 ? 'N/A' : item.Serial) + '</td>';
                            ReportHTML += '                                         <td class="hide GrossWeight">' + _RowGrossWeight + '</td>';
                            ReportHTML += '                                         <td class="hide Volume">' + _RowVolume + '</td>';
                            if (pDefaults.UnEditableCompanyName == "EXP") {
                                ReportHTML += '                                 <td>' + (item.BatchNumber == 0 ? "" : item.BatchNumber) + '</td>';
                                ReportHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                                ReportHTML += '                                 <td>' + (item.ImportedBy == 0 ? "" : item.ImportedBy) + '</td>';
                                //ReportHTML += '                                 <td>' + (item.WeightInTons == 0 ? "" : item.WeightInTons) + '</td>';
                            }
                            ReportHTML += '                                     </tr>';
                        });
                        /*********************************Summary*****************************************/
                        if (pDefaults.UnEditableCompanyName == "DGL") {
                            ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                            ReportHTML += '                                         <td colspan=4>' + 'Total No of Items = ' + _TotalQuantity.toFixed(2) + ' &emsp; GrossWeight = ' + _TotalGrossWeight.toFixed(2) + ' ' + _WeightUnitCode + ' &emsp; Volume = ' + _TotalVolume.toFixed(4) + ' ' + _VolumeUnitCode + '</td>';
                            ReportHTML += '                                     </tr>';
                        }
                        /*********************************EOF Summary*****************************************/
                        ReportHTML += '                             </tbody>';
                        ReportHTML += '                         </table>';

                        ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-5"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                        ReportHTML += '                         <div class="col-xs-12"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';

                        ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The goods are received in good condition and there were no scratches.   ' + '</b></div>';
                        ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام البضاعة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                        ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                        ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please stamp the receipt.	 ' + '</b></div>';
                        ReportHTML += '         </body>';
                        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }
                    FadePageCover(false);
                } //function(pData)
                , null);
        } //EOF else

    }

}
//*********************************PRINT REGION END***********************************//

//*********************************NEW REGION***********************************//

function ValidateMaxLimitQty(inp, tdClass) {
    debugger;
    var demanded = Number($(inp).val());
    var tr = $(inp).closest('tr');
    var available = Number($(tr).find('td.' + tdClass+' input').val());
    if (demanded > available) {
        $(inp).val('');
        swal("Sorry", "Max limit is " + available+"");
    }
}
function OpenPickup() {
    debugger;
    var pID = $('#hID').val();
    HideliChequeAlarm();
    glbCallingControl = 'WH_Outbound';
    strBindTableRowsFunctionName = "Pickup_BindTableRows";
    $("#div-content").scrollTop(0);
    // Hide The Dashboard DIV Content
    $("#div-main-content").hide();
    Pickup_Initialize(function () {
        Pickup_FillAllControls(pID);
    });
}
function UpdateOrders(pStatusID, pID) {
    debugger;
    var generateRequest = false;
    var isValid = true;
    var IDsArr = [];
    $('#tblPickup tbody tr').each(function () {
        if ($(this).find('td.ID input[name=Delete]').is(':checked')) {
            if (pStatusID == constPickupStatusReleased && $(this).find('td.StatusID').text() >= constPickupStatusReleased) {
                swal("Sorry", "Order " + $(this).find('td.Code').text() + " already released!");
                isValid = false;
                return false;
            }
            else if (pStatusID == constPickupStatusLoaded && (Number($(this).find('td.StatusID').text()) >= constPickupStatusLoaded || Number($(this).find('td.StatusID').text()) < constPickupStatusPartPicked)) {
                swal("Sorry", "Order " + $(this).find('td.Code').text() + " can't be loaded!");
                isValid = false;
                return false;
            }
            else if (pStatusID == constPickupStatusCanceled && Number($(this).find('td.StatusID').text()) >= constPickupStatusLoaded) {
                swal("Sorry", "Order " + $(this).find('td.Code').text() + " can't be canceled!");
                isValid = false;
                return false;
            }
            else {
                IDsArr.push($(this).attr('id'));

                if (Number($(this).find('td.StatusID').text()) == constPickupStatusPartPicked)
                    generateRequest = true;
            }
        }
        });

    if (!isValid)
        return;

    if (pID > 0)
        IDsArr.push(pID);

    if (IDsArr.length > 0) {
        var IDs = IDsArr.toString();
        var whereClause = '';
        var status = '';
        switch (pStatusID) {
            case constPickupStatusReleased:
                whereClause = 'where StatusID = ' + constPickupStatusCreated + ' and ID in (' + IDs + ')';
                status = 'released';
                break;
            case constPickupStatusLoaded:
                whereClause = 'where StatusID in (' + constPickupStatusPartPicked + ',' + constPickupStatusPicked + ') and ID in (' + IDs + ')';
                status = 'loaded';
                break;
            case constPickupStatusCanceled:
                whereClause = 'where StatusID < ' + constPickupStatusLoaded + ' and ID in (' + IDs + ')';
                status = 'canceled';
                break;
        }

        swal({
            title: "Are you sure?",
            text: "The selected records will be " + status + "!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FE9900",
            confirmButtonText: "Yes, continue!",
            closeOnConfirm: true
        },
            function () {
                if (generateRequest) {
                    setTimeout(function () { AskToGenerate(whereClause, IDs, pStatusID); }, 500);
                }
                else {
                    setTimeout(function () { UpdateOrder_Confirm(whereClause, IDs, pStatusID, false); }, 500);
                }
            });
    }
    else {
        swal("Please", "Select Orders");
    }
}
function AskToGenerate(whereClause, IDs, pStatusID) {
    swal({
        title: "There is part picked order!",
        text: "Do You Want To Generate New Request?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No, Skip",
        confirmButtonColor: "#6BDD55",
        confirmButtonText: "Yes, Generate!",
        closeOnConfirm: true
    },
        //callback function in case of confirm delete
        function (pGenerate) {
            UpdateOrder_Confirm(whereClause, IDs, pStatusID, pGenerate);
        });
}
function UpdateOrder_Confirm(whereClause, IDs, pStatusID, pGenerate) {
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Outbound/UpdateOrders"
        , { pUpdateClause: "update WH_Pickup set ModificationDate=GetDate(), ModificatorUserID=" + pLoggedUser.ID + ", StatusID = " + pStatusID + " " + whereClause + " ", pStatusID: pStatusID, pIDs: IDs, pGenerate: pGenerate }
        , function (pData) {
            debugger;
            FadePageCover(false);
            if (pData) {
                swal("Sorry", pData.Message);
            }
            else {
            jQuery("#PickupModal").modal("hide");
            Pickup_LoadingWithPaging();
            }
        }
        , null);
}

function UpdateDetail(elm, prop) {
    debugger;
    if (!_updateDetails)
        return;
    var val = '';
    if ($(elm).is('input'))
        val = $(elm).val();
    else if ($(elm).is('select'))
        val = $(elm).find('option:selected').val();
    else if ($(elm).is('checkbox'))
        val = $(elm).is(':checked');

    var id = $(elm).closest('tr').attr('id');

    $.each(_details, function (i, item) {
        if (item.ID == id)
            item[prop] = val;
    });
}
function SearchRowItem() {
    debugger;
    if ($('#tblPickupDetails tbody tr[id=0]').length > 0) {
        swal("Please", "Save new lines first!");
        return;
    }
    var rowItems = _details;
    if ($('#srchItemCode').val()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemCode, '').toLowerCase().includes($('#srchItemCode').val().trim().toLowerCase()); });
    }
    if ($('#srchItemName').val()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemName, '').toLowerCase().includes($('#srchItemName').val().trim().toLowerCase()); });
    }
    if ($('#srchUnit').val()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PackageTypeName, '').toLowerCase().includes($('#srchUnit').val().trim().toLowerCase()); });
    }
    if ($('#srchAvailableQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.PD_AvailableQuantity.toString().includes($('#srchAvailableQty').val()); });
    }
    if ($('#srchQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.DemandedQuantity.toString().includes($('#srchQty').val()); });
    }
    if ($('#srchPickedQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.PickedQuantity.toString().includes($('#srchPickedQty').val()); });
    }
  
    if ($('#srchNotes').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.Notes, '').toLowerCase().includes($('#srchNotes').val().trim().toLowerCase()); });
    }

    if ($('#srchLastModificator').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.ModificatorUserName, '').toLowerCase().includes($('#srchLastModificator').val().trim().toLowerCase()); });
    }
    PickupDetails_BindTableRows(rowItems);
}

function DemandAll() {
    if ($('#tblReceiveDetails tbody tr').length == 0)
        return;
    swal({
        title: "Are you sure?",
        text: "All items will be demanded!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FE9900",
        confirmButtonText: "Yes, Demand!",
        closeOnConfirm: true
    },
        function () {
            $('#tblReceiveDetails tbody tr').each(function () {
                $(this).find('td.PDL_DemandedQuantity input').val($(this).find('td.AvailableQuantity input').val());
                Demand($(this).find('td.Demand button'));
            });
        });
}
function Demand(btn) {
    var tr = $(btn).closest('tr');
    var id = $(tr).attr('ID');
    var purchaseItemId = $(tr).find('td.PurchaseItemID').text().trim();
    var purchaseItemCode = $(tr).find('td.PurchaseItemCode').text().trim();
    var purchaseItemName = $(tr).find('td.PurchaseItemName').text().trim();
    var fromPallet = $(tr).find('td.PalletID').text().trim();
    var fromLocTypeId = $(tr).find('td.LocationTypeID').text().trim();
    var fromLocId = $(tr).find('td.LocationID').text().trim();
    var fromLocCode = $(tr).find('td.LocationCode').text().trim();
    var demandedQty = Number($(tr).find('td.PDL_DemandedQuantity input').val());
    var pickedQty = Number($(tr).find('td.PickedQuantity input').val());

    var isValid = true;
    $('#tblPickupDetailsLocation tbody tr').each(function () {
        if ($(this).find('td.ItemBalanceID').text().trim() == id) {
            swal("Sorry", "This line already demanded!");
            isValid = false;
            return false;
        }
    });
    if (!isValid)
        return;

    if (fromLocTypeId == 1) {
        swal("Sorry", "Can't demand from receiving location!");
        return;
    }
    if (!(demandedQty > 0)) {
        swal("Sorry", "Demanded quantity is mandatory!");
        return;
    }
    
    var html = `<tr id='0'>
<td class='ID'><input name='Delete' type='checkbox' value='0'></td>
<td class='ItemBalanceID hide'>`+ id+`</td>
<td class='PurchaseItemID hide'>`+ purchaseItemId+`</td>
<td class='purchaseItemCode'>`+ purchaseItemCode+`</td>
<td class='PurchaseItemName'>`+ purchaseItemName+`</td>
<td class='LocationID hide'>`+ fromLocId +`</td>
<td class='LocationCode hide'>`+ fromLocCode +`</td>
<td class='PalletID hide'>`+ fromPallet +`</td>
<td class='PDL_DemandedQuantity Demanding hide'>`+ demandedQty +`</td>
<td class='PickedQuantity Picking hide'>`+ pickedQty+`</td>
<td class='PDL_LocationID hide'>`+ fromLocId +`</td>
<td class='PDL_LocationCode'>`+ fromLocCode +`</td>
<td class='PDL_PalletID'>`+ fromPallet +`</td>
<td class='UnDemand Demanding'><button type='button' class='btn btn-sm btn-blue' onclick='UnDemand(this);'>UnDemand</button></td>
                </tr>`;
    $('#tblPickupDetailsLocation tbody').append(html);

   
        $('#tblPickupDetailsLocation .Demanding').removeClass('hide');
    
    ShowPickupLocationSave(true);
}
function UnDemand(btn) {
    $(btn).closest('tr').remove();
    ShowPickupLocationSave(true);
}
function PickAll() {
    if ($('#tblReceiveDetails tbody tr').length == 0)
        return;
    swal({
        title: "Are you sure?",
        text: "The all demanded will be picked!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FE9900",
        confirmButtonText: "Yes, Pick!",
        closeOnConfirm: true
    },
        function () {
            $('#tblReceiveDetails tbody tr').each(function () {
                $(this).find('td.PickedQuantity input').val($(this).find('td.PDL_DemandedQuantity input').val());
                Pick($(this).find('td.Pick button'));
            });
        });

  
}
function Pick(btn) {
    debugger;
    var tr = $(btn).closest('tr');
    var id = $(tr).attr('ID');
    var purchaseItemId = $(tr).find('td.PurchaseItemID').text().trim();
    var purchaseItemCode = $(tr).find('td.PurchaseItemCode').text().trim();
    var purchaseItemName = $(tr).find('td.PurchaseItemName').text().trim();
    var bySerial = $(tr).find('td.BySerialNo').text().trim();
    var fromLocTypeId = $(tr).find('td.LocationTypeID').text().trim();
    var fromLocId = $(tr).find('td.LocationID').text();
    var fromLocCode = $(tr).find('td.LocationCode').text();
    var toLocId = $(tr).find('td.PDL_LocationID select option:selected').val();
    var toLocCode = $(tr).find('td.PDL_LocationID select option:selected').text();
    var demandedQty = Number($(tr).find('td.PDL_DemandedQuantity input').val());
    var pickedQty = Number($(tr).find('td.PickedQuantity input').val());
    var fromPallet = $(tr).find('td.PalletID').text().trim();
    var toPallet = $(tr).find('td.PDL_PalletID input').val().trim();

    var sumPicked = 0;
    $('#tblPickupDetailsLocation tbody tr').each(function () {
        if ($(this).find('td.ItemBalanceID').text().trim() == id) {
            sumPicked += Number($(this).find('td.PickedQuantity').text());
        }
    });

    if ((pickedQty + sumPicked) > demandedQty) {
        swal("Sorry", "This item already picked!");
        return false;
    }

    if (fromLocTypeId == 1) {
        swal("Sorry", "Can't pick from receiving location!");
        return;
    }
    if (!(pickedQty > 0)) {
        swal("Sorry", "Picked quantity is mandatory!");
        return;
    }
    if (!(toLocId > 0)) {
        swal("Sorry", "Target location is mandatory!");
        return;
    }
    if (IsNull(toPallet,'')=='') {
        swal("Sorry", "Target pallet is mandatory!");
        return;
    }

    $('#tblPickupDetailsLocation tbody tr').each(function () {
        if ($(this).find('td.ItemBalanceID').text().trim() == id && $(this).find('td.PickedQuantity').text()=='0') {
            $(this).find('td.PDL_DemandedQuantity').text(Number($(this).find('td.PDL_DemandedQuantity').text()) - pickedQty);
        }
    });

    var html = `<tr id='0'>
<td class='ID'><input name='Delete' type='checkbox' value='0'></td>
<td class='ItemBalanceID hide'>`+ id +`</td>
<td class='PurchaseItemID hide'>`+ purchaseItemId + `</td>
<td class='PurchaseItemCode'>`+ purchaseItemCode + `</td>
<td class='PurchaseItemName'>`+ purchaseItemName + `</td>
<td class='BySerialNo hide'>`+ bySerial +`</td>
<td class='LocationID hide'>`+ fromLocId +`</td>
<td class='LocationCode hide'>`+ fromLocCode +`</td>
<td class='PalletID hide'>`+ fromPallet +`</td>
<td class='PDL_DemandedQuantity Demanding hide'>`+ pickedQty +`</td>
<td class='PickedQuantity Picking hide'>`+ pickedQty +`</td>
<td class='PDL_LocationID hide'>`+ toLocId + `</td>
<td class='PDL_LocationCode'>`+ toLocCode +`</td>
<td class='PDL_PalletID '>`+ toPallet +`</td>
<td class='UnPick'><button type='button' class='btn btn-sm btn-blue' onclick='UnPick(this);'>UnPick</button></td>
                </tr>`;
    $('#tblPickupDetailsLocation tbody').append(html);

    
    if (_isRequest)
        $('#tblPickupDetailsLocation .Demanding').removeClass('hide');
    else
        $('#tblPickupDetailsLocation .Picking').removeClass('hide');

    ShowPickupLocationSave(true);
}
function UnPick(btn) {
    debugger;
    var id = $(btn).closest('tr').attr('id');
    var itemBalanceId = $(btn).closest('tr').find('td.ItemBalanceID').text();
    var pickedQty = Number($(btn).closest('tr').find('td.PickedQuantity').text());

    var unPickFromDb = true;
        $('#tblPickupDetailsLocation tbody tr').each(function () {
            if ($(this).find('td.ID input').val() > 0 && Number($(this).find('td.PickedQuantity').text()) == 0 && $(this).find('td.ItemBalanceID').text() == itemBalanceId) {
                unPickFromDb = false;
                $(this).find('td.PDL_DemandedQuantity').text(Number($(this).find('td.PDL_DemandedQuantity').text()) + pickedQty);
            }
        });
        $(btn).closest('tr').remove();
    ShowPickupLocationSave(true);

    if (!unPickFromDb)
        return;


    swal({
        title: "Are you sure?",
        text: "The selected records will be UnPicked!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FE9900",
        confirmButtonText: "Yes, UnPick!",
        closeOnConfirm: true
    },
        function () {
            var pID = $('#hID').val();
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/WH_Outbound/UnPick"
                , {
                    pID: id,
                    pPickupID: $('#hID').val(),
                    pItemBalanceID: itemBalanceId,
                }
                , function (pData) {
                    jQuery('#PickupDetailsModal').modal('hide');
                    FadePageCover(false);
                    Pickup_FillAllControls(pID);
                }
                , null);

        });
}
function Relocate(btn) {
    var allowRelocate = true;
    $('#tblPickupDetailsLocation tbody tr').each(function () {
        if (IsNull($(this).attr('id'), 0) == 0) {
            swal("Sorry", "Can't relocate before saving pickup!");
            allowRelocate = false;
            return false;
        }
    });
    if (!allowRelocate)
        return;

    var itemBalanceId = $(btn).closest('tr').attr('id');
    var purchaseItemId = $(btn).closest('tr').find('td.PurchaseItemID').text();
    var demanded = Number($(btn).closest('tr').find('td.PDL_DemandedQuantity input').val());
    var picked = Number($(btn).closest('tr').find('td.PickedQuantity input').val());
    var notPicked = demanded - picked;
    $('#RelocateModal input.RelocateItemBalanceID').val(itemBalanceId);

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Outbound/Relocate"
        , {
            pWhereClause: "ID<>" + itemBalanceId + " and PurchaseItemID=" + purchaseItemId +" and Quantity>IsNull(PDL_DemandedQuantity,0) and IsNull(LocationTypeID,0)=0 and IsNull(IsPalletHeld,0)=0 and IsNull(IsBatchHeld,0)=0"
        }
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData);
            Relocate_BindTableRows(data, notPicked);
            jQuery('#RelocateModal').modal('show');
        }
        , null);

    
    
    //var receiveDetails = _ItemsBalance;
    //receiveDetails = receiveDetails.filter(function (r) { return r.ID != receiveDetailsId });
    
    

}

function Relocate_BindTableRows(pItemBalance, pDemanded) {
    debugger;
    var demanded = Number(pDemanded);
    
    $('#RelocateModal input.RelocateDemandedQuantity').val(demanded);
    ClearAllTableRows("tblRelocate");
    $.each(pItemBalance, function (i, item) {
        _ItemsBalance.push(item);

            AppendRowtoTable("tblRelocate",
                ("<tr ID='" + item.ID + "'>"
                    + "<td class='PurchaseItemID hide'>" + (item.PurchaseItemID == 0 ? "" : item.PurchaseItemID) + "</td>"
                    + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
                    + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
                    + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                    + "<td class='PackageTypeName hide'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "<td class='LocationTypeID hide'>" + item.LocationTypeID + "</td>"
                    + "<td class='LocationID hide'>" + (item.LocationID == 0 ? "" : item.LocationID) + "</td>"
                    + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                    + "<td class='PalletID'>" + item.PalletID + "</td>"
                    + "<td class='BatchNo'>" + item.BatchNumber + "</td>"
                    + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : '') + "</td>"
                    + "<td class='ExprirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : '') + "</td>"
                    + "<td class='AvailableQuantity'> <input type='text' class='form-control controlStyle' data-type='number'onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onchange='' data-required='false' value='" + (item.Quantity - item.PDL_DemandedQuantity) + "' disabled/> </td>"
                    + "<td class='PDL_DemandedQuantity'> <input type='text' id='txtReceiveDetailsDemandedQuantity" + item.ID + "' class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onkeyup='ValidateMaxLimitQty(this,`AvailableQuantity`);' data-required='false' /> </td>"
                + "</tr>"));

    });
}
function Relocate_Save() {
    debugger;
    var itemBalanceId = $('#RelocateModal input.RelocateItemBalanceID').val();
    var actualDemanded = Number($('#RelocateModal input.RelocateDemandedQuantity').val());
    var demanded = 0;
    var ItemBalance = [];
    $('#tblRelocate tbody tr').each(function () {
        if (Number($(this).find('td.PDL_DemandedQuantity input').val()) > 0) {
            demanded += Number($(this).find('td.PDL_DemandedQuantity input').val());
            ItemBalance.push({ PickupID: $('#hID').val(), ItemBalanceID_Old: itemBalanceId, ItemBalanceID_New: $(this).attr('id'), PurchaseItemID: $(this).find('td.PurchaseItemID').text(), PDL_DemandedQuantity: $(this).find('td.PDL_DemandedQuantity input').val(), PDL_PalletID: $(this).find('td.PalletID').text(), PDL_LocationID: $(this).find('td.LocationID').text() });
        }
    });
    if (demanded != actualDemanded) {
        swal("Sorry", "Demanded quantity is " + actualDemanded + "");
        return;
    }

    //$('#tblReceiveDetails tbody tr[id=' + itemBalanceId + ']').remove();
    //$('#tblPickupDetailsLocation tbody tr').each(function () {
    //    if ($(this).find('td.ItemBalanceID').text().trim() == itemBalanceId && Number($(this).find('td.PickedQuantity').text()) == 0)
    //        $(this).remove();
    //});
    //$.each(ItemBalance, function (i, item) {
    //    $('#tblReceiveDetails tbody').append('<tr ID="' + item.ID + '">' + $('#tblRelocate tbody tr[id=' + item.ID + ']').html() + '</tr>');
    //    $('#tblReceiveDetails tbody tr[id=' + item.ID + ']').find('td.PDL_DemandedQuantity input').val(item.Demanded);
    //    $('#tblReceiveDetails tbody tr[id=' + item.ID + ']').find('td.PickedQuantity input').val(item.Picked);
    //    $('#tblReceiveDetails tbody tr[id=' + item.ID + ']').find('td.PDL_LocationID select').val(item.PDL_LocationID).change();
    //    $('#tblReceiveDetails tbody tr[id=' + item.ID + '] td.Pick button').trigger('click');
    //});
   
    //$('#tblReceiveDetails .Demanding').addClass('hide');
    //$('#tblReceiveDetails .Picking').removeClass('hide');
    //jQuery('#RelocateModal').modal('hide');
    FadePageCover(true);
    CallPOSTFunctionWithParameters("/api/WH_Outbound/Relocate_Save"
        , ItemBalance
        , function (pData) {
            FadePageCover(false);
            if (pData) {
                console.log(pData);
                swal("Sorry", "Error in relocating!");
            }
            else {
                jQuery('#RelocateModal').modal('hide');
                PickupDetails_FillControls();
            }
        }
        , null);
}

function UpdateReceiveList(pID, pProp, pVal, pElm) {
    debugger;
    if (pElm)
        pVal = $(pElm).val();
    
    $.each(_ItemsBalance, function (i, item) {
        if (item.ID == pID) {
            item[pProp] = pVal;
            return false;
        }
    });
}
function ShowHideActions()
{
    var status = $('#txtStatus').attr('val');

    //addDetail
    if (status == constPickupStatusCreated) {
        $('#btnAddDetail').removeClass('hide');
    }
    else {
        $('#btnAddDetail').addClass('hide');
    }

    //save
    if (!_hasRequest || status < constPickupStatusReleased) {
        $('#btnSave,#btnSaveAndAddNew').removeClass('hide');
    }
    else {
        $('#btnSave,#btnSaveAndAddNew').addClass('hide');
    }

    //release
    if (!_isRequest || status > constPickupStatusCreated) {
        $('#btnRelease').addClass('hide');
    }
    else {
        $('#btnRelease').removeClass('hide');
    }
}

var _PickedItems = {};
function GroupPickupDetails() {
    debugger;
    var itemId;
    _PickedItems = {};
    $('#tblPickupDetails tbody tr').each(function () {
        itemId = Number($(this).find('td.PurchaseItemID select option:selected').val());
        if (_PickedItems[itemId]) {
            _PickedItems[itemId]['DemandedQuantity'] += Number($(this).find('td.DemandedQuantity input').val());
            _PickedItems[itemId]['PickedQuantity'] += Number($(this).find('td.PickedQuantity input').val());
        }
        else {
            _PickedItems[itemId] = {
                PurchaseItemID: itemId,
                DemandedQuantity: Number($(this).find('td.DemandedQuantity input').val()),
                PickedQuantity: Number($(this).find('td.PickedQuantity input').val()),
            };
        }
    });
}

function Release() {
    debugger;
    var hasNewLine = false;
    var id = IsNull($('#hID').val(), 0);
    $('#tblPickupDetails tbody tr').each(function () {
        if (Number($(this).find('td.ID input').val()) == 0) {
            hasNewLine = true;
            return false;
        }
    });
    if (id == 0 || hasNewLine) {
        Pickup_Save(false, true);
    }
    else {
        UpdateOrders(constPickupStatusReleased, id);
    }
}

function ShowPickupLocationSave(pShow) {
    if (pShow)
        $('#btnSavePickupDetails').removeClass('hide');
    else
        $('#btnSavePickupDetails').addClass('hide');
}

function ExportPickupTemplate() {


    var pTablesHTML = "";
    pTablesHTML += '             <table id="tblPickupTemplate" class="table table-striped text-sm  table-bordered" style="">';
    pTablesHTML += '                 <thead style="">';
    pTablesHTML += '                     <th>WarehouseCode</th>';
    pTablesHTML += '                     <th>ItemCode</th>';
    pTablesHTML += '                     <th>UOM</th>';
    pTablesHTML += '                     <th>Quantity</th>';
    pTablesHTML += '                     <th>ContainerNumber</th>';
    pTablesHTML += '                     <th>Notes</th>';
    pTablesHTML += '                     <th>WarehouseToCode</th>';
    pTablesHTML += '                 </thead>';

    pTablesHTML += '                 <tbody>';
    pTablesHTML += '             <tr>';
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '             </tr>';
    pTablesHTML += '                 </tbody>';
    pTablesHTML += '             </table>';
    $("#hPickupTemplate").html(pTablesHTML);

    var filename = "PickupTemplate.xls";
    ExportHtmlTableToCsv('tblPickupTemplate', filename);


}

function UploadExcelFile_Pickup() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#fileOrders").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            var isFinalize = glbCallingControl == 'ReceiveAdmin';
            data.append(files[0].name, files[0]);
            FadePageCover(true);
            $.ajax({
                url: '/api/WH_Outbound/UploadExcelFile_Pickup?pIsFinalize=' + isFinalize + '',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: data,
                success:
                    function (result) {
                        debugger;
                        FadePageCover(false);
                        console.log(result.Exception);
                        console.log(result.Msg);
                        if (result.IsUploaded) {
                            swal("Success", "File Uploaded successfully.");
                            Pickup_LoadingWithPaging();
                        }
                        else
                            swal("File Uploading faild", result.Msg);
                    }
                ,
                error: function (err) {
                    FadePageCover(false);
                    swal("Sorry", err.statusText);
                }

            });
        }
        else {
            swal("Sorry", "Choose Excel File");
        }
    }
    else {
        alert("FormData is not supported.");
    }
}

function PickOrders() {
    var IDs = [];
    var allowPick = true;
    $('#tblPickup tbody tr').each(function () {
        if ($(this).find('td.ID input[name=Delete]').is(':checked')) {
            if ($(this).find('td.StatusID').text() == constPickupStatusReleased) {
                IDs.push($(this).attr('id'));
            }
            else {
                swal("Sorry", "Released orders only can be picked");
                allowPick = false;
                return false;
            }
        }
    });

    if (!allowPick)
        return;

    if (IDs.length == 0) {
        swal("Please", "Select orders to pick");
        allowPick = false;
    }

    if (!allowPick)
        return;


        swal({
            title: "Are you sure?",
            text: "This orders will be picked!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#556BDD",
            confirmButtonText: "Yes, pick!",
            closeOnConfirm: true
        },
            //callback function in case of confirm
            function () {
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/WH_Outbound/PickOrders"
                    , { pIDs: IDs.toString() }
                    , function (pData) {
                        FadePageCover(false);
                        if (pData.IsPicked) {
                            swal("Success", "Saved successfully.");
                            Pickup_LoadingWithPaging();
                        }
                        else {
                            swal("Sorry", pData.Exception.Message);
                        }
                    }
                    , null);
            });
    
}

function CopyOrder(pID) {
    if (!(pID > 0))
        pID = $('#hID').val();

    swal({
        title: "Copy Order!",
        text: "Do You Want To Copy This Order?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "No, Cancel",
        confirmButtonColor: "#6BDD55",
        confirmButtonText: "Yes, Copy!",
        closeOnConfirm: true
    },
        //callback function in case of confirm delete
        function (pCopy) {
            if (pCopy) {
                FadePageCover(true);

                CallGETFunctionWithParameters("/api/WH_Outbound/CopyOrder"
                    , { pID: pID }
                    , function (pData) {
                        FadePageCover(false);
                        if (pData.OrderCode) {
                            swal("Success", "Order copied successfully.\n with new code " + pData.OrderCode + "");
                            Pickup_LoadingWithPaging();
                        }
                        else {
                            swal("Order coping faild.", pData.Exception.Message);
                            console.log(pData.Exception);
                        }
                    }
                    , null);

            }

        });
}
//*********************************NEW REGION END***********************************//


/***************************Retore For PurchaseItem Pickup****************************/
//function PDI_BindTableRows(pPDI) {
//    debugger;
//    $("#hl-menu-Warehousing").parent().addClass("active");
//    ClearAllTableRows("tblPDI");
//    var editControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
//    $.each(pPDI, function (i, item) {
//        AppendRowtoTable("tblPDI",
//        //("<tr ID='" + item.ID + "' ondblclick='PickupDetails_FillControls(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
//        ("<tr ID='" + item.ID + "' ondblclick='PDI_LoadPickupPDIModal(" + item.ID + ");' class='" + (item.IsFinalized ? "" : "") + "'>"
//            + "<td class='ID hide'>" + item.ID + "</td>"
//            + "<td class='RecieveID hide'>" + item.ReceiveID + "</td>"
//            + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
//            + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
//            + "<td class='LocationID hide'>" + item.LocationID + "</td>"
//            + "<td class='Quantity hide'>" + item.Quantity + "</td>"
//            + "<td class='FinalizedPickedQuantity hide'>" + item.FinalizedPickedQuantity + "</td>"

//            + "<td class='BarCode hide'>" + item.BarCode + "</td>"
//            + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
//            + "<td class='DemandedQuantity hide'>" + item.DemandedQuantity + "</td>"
//            + "<td class='PickedQuantity hide'>" + item.PickedQuantity + "</td>"

//            + "<td class='CustomerName'>" + item.CustomerName + "</td>"
//            + "<td class='ProductCode'>" + item.PurchaseItemCode + "</td>"
//            + "<td class='ProductName'>" + item.PurchaseItemName + "</td>"
//            + "<td class='LocationCode'>" + (item.LocationID == 0 ? "" : item.LocationCode) + "</td>"
//            + "<td class='AvailableQuantity hide'>" + (parseFloat(item.Quantity) - parseFloat(item.FinalizedPickedQuantity)) + "</td>"
//            + "<td class='MotorNumber'>" + (item.MotorNumber == 0 ? "" : item.MotorNumber) + "</td>"
//            + "<td class='ChassisNumber'>" + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + "</td>"
//            + "<td class='OCNCode'>" + (item.OCNCode == 0 ? "" : item.OCNCode) + "</td>"

//            + "<td class=''><a href='#' data-toggle='modal' onclick='PDI_Print(" + item.ID + ");' " + editControlsText + "</a></td>"
//            + "</tr>"));
//    });
//    ApplyPermissions();
//    BindAllCheckboxonTable("tblPDI", "ID");
//    CheckAllCheckbox("ID");
//    /////HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
//    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
//        swal(strSorry, strDeleteFailMessage);
//        showDeleteFailMessage = false;
//    }
//    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
//}
//function PDI_LoadingWithPaging() {
//    debugger;
//    var pWhereClause = PDI_GetWhereClause();
//    var pPageSize = $('#select-page-size').val();
//    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
//    var pOrderBy = "ID DESC";
//    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClauseForPDI: pWhereClause, pOrderBy: pOrderBy }
//    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PDI_BindTableRows(JSON.parse(pData[0])); });
//    //HighlightText("#tblPDI>tbody>tr", $("#txt-Search").val().trim());
//}
//function PDI_GetWhereClause() {
//    debugger;
//    var _WhereClause = "";

//    _WhereClause += "WHERE 1=1 and  (Quantity>FinalizedPickedQuantity) AND OperationVehicleID IS NOT NULL ";

//    if ($("#slWarehouseSearch").val() != "" && $("#slWarehouseSearch").val() != null)
//        _WhereClause += " and  WarehouseID=" + $("#slWarehouseSearch").val() + " ";
//    if ($("#slAreaSearch").val() != "") {
//        _WhereClause += " and  AreaID=" + $("#slAreaSearch").val() + " ";
//    }
//    if ($("#slLocationSearch").val() != null && $("#slLocationSearch").val() != "") {
//        _WhereClause += " and  LocationID=" + $("#slLocationSearch").val() + " ";
//    }
//    if ($("#txtMotorNumberSearch").val().trim() != "") {
//        _WhereClause += " and  MotorNumber='" + $("#txtMotorNumberSearch").val().trim() + "' ";
//    }
//    if ($("#txtChassisNoSearch").val().trim() != "") {
//        _WhereClause += " and  ChassisNumber='" + $("#txtChassisNoSearch").val().trim() + "' ";
//    }
//    if ($("#txtOCNCodeSearch").val().trim() != "") {
//        _WhereClause += " and  OCNCode='" + $("#txtOCNCodeSearch").val().trim() + "' ";
//    }

//    return _WhereClause;
//}
//function PDI_ClearAllControls() {
//    debugger;
//    ////////$("#tblPDIDetails tbody").html("");
//    //////////$("#lblPTIMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
//    //////////$("#lblPTIMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
//    ////////ClearAll("#PTIModal");

//    ////////$("#txtPTIDate").val(getTodaysDateInddMMyyyyFormat());
//    ////////$(".classDisableForFinalized").removeAttr("disabled");

//    ////////$("#btnSave").attr("onclick", "PDI_Save(false);");
//    ////////$("#btnSaveAndAddNew").attr("onclick", "PDI_Save(true);");
//    ////////$("#cb-CheckAll").prop('checked', false);
//}
//function PDI_FillAllControls(pID) {
//    debugger;
//    FadePageCover(true);


//}
//function GetAreas(pWarehouseControlID, pAreaContolID, pLocationControlID) {
//    debugger;
//    FadePageCover(true);
//    $("#" + pAreaContolID).html("<option value=''><--Select--></option>");
//    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
//    var pParametersWithValues = {
//        pWarehouseID: ($("#" + pWarehouseControlID).val() == "" ? 0 : $("#" + pWarehouseControlID).val())
//    };
//    CallGETFunctionWithParameters("/api/TransferProducts/GetAreas", pParametersWithValues
//        , function (pData) {
//            FillListFromObject(null, 2, "<--Select-->", pAreaContolID, pData[0], null);
//            FadePageCover(false);
//        }
//        , null);
//}
//function GetLocation(pAreaContolID, pLocationControlID) {
//    debugger;
//    $("#" + pLocationControlID).html("<option value=''><--Select--></option>");
//    if ($("#" + pAreaContolID).val() != "") {
//        FadePageCover(true);
//        var pWhereClauseLocations = "WHERE AreaID=" + $("#" + pAreaContolID).val() + "\n";
//        var pParametersWithValues = {
//            pWhereClauseLocations: pWhereClauseLocations
//        };
//        CallGETFunctionWithParameters("/api/TransferProducts/GetLocations", pParametersWithValues
//            , function (pData) {
//                FillListFromObject(null, 1, "<--Select-->", pLocationControlID, pData[0], null);
//                FadePageCover(false);
//            }
//            , null);
//    }
//}
//function PDI_LoadPickupPDIModal(pPDIReceiveDetailsID) {
////    debugger;
////    FadePageCover(true);
////    $("#tblPickup tbody tr").html("");
////    $("#hPDIReceiveDetailsID").val(pPDIReceiveDetailsID);
////    var pWhereClause = "WHERE PDIReceiveDetailsID=" + pPDIReceiveDetailsID;
////    var pPageSize = 999999; //$('#select-page-size').val();
////    var pPageNumber = 1; //($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
////    var pOrderBy = "ID DESC";
////    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
////    CallGETFunctionWithParameters("/api/Pickup/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
////        , pControllerParameters
////        , function (pData) {
////            var _Pickup = JSON.parse(pData[0]);
////            Pickup_BindTableRows(_Pickup);
////            $("#btn-NewAdd").attr("onclick", "Pickup_ClearAllControls(" + pPDIReceiveDetailsID + ");");
////            jQuery("#PickupPDIModal").modal("show");
////            FadePageCover(false);
////        }
////        , null);
////    //Pickup_ClearAllControls(pPDIReceiveDetailsID);
//}
//function PDI_Print(pPDIReceiveDetailsID) {
//    debugger;
//    FadePageCover(true);
//    var pParametersWithValues = {
//        pWhereClausePickupDetailsLocation: "WHERE PDIReceiveDetailsID=" + pPDIReceiveDetailsID
//    };
//    CallGETFunctionWithParameters("/api/Pickup/PickupDetailsLocation_PrintPDI"
//        , pParametersWithValues
//        , function (pData) {
//            var _PDIRows = JSON.parse(pData[1]);
//            if (_PDIRows.length == 0)
//                swal("Sorry", "No PDI done for this vehicle.");
//            else {
//                var _TodaysDate = getTodaysDateInddMMyyyyFormat();
//                var ReportHTML = '';
//                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
//                ReportHTML += '<html>';
//                ReportHTML += '     <head><title>' + 'PDI' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
//                ReportHTML += '         <body style="background-color:white;">';

//                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
//                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3><b>' + ' PDI ' + '</b></h3></div>';

//                //ReportHTML += '             <div class="col-xs-12"><b>Doc. </b>' + (_PDIRows[0].CodeSerial == 0 ? '' : _PDIRows[0].CodeSerial) + '</div>';
//                //ReportHTML += '             <div class="col-xs-12 m-l text-right">' + _TodaysDate + '<b>' + '  التاريخ  ' + '</b></div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>Chassis Number : </b>' + _PDIRows[0].ChassisNumber + '</div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>Motor Number : </b>' + _PDIRows[0].MotorNumber + '</div>';
//                ReportHTML += '             <div class="col-xs-12">' + '<b>OCN Code : </b>' + _PDIRows[0].OCNCode + '</div>';

//                ReportHTML += '                         <table id="tblPDIPrint" style="font-size:90%;" class="table table-striped b-t b-light text-sm  table-bordered">';  //table-hover
//                ReportHTML += '                             <thead>';
//                ReportHTML += '                                 <tr>';
//                ReportHTML += '                                     <th style="width:5%;">' + 'Serial' + '</th>';
//                ReportHTML += '                                     <th>' + 'PDI Code' + '</th>';
//                ReportHTML += '                                     <th>' + 'Item Code' + '</th>';
//                ReportHTML += '                                     <th>' + 'Item Name' + '</th>';
//                ReportHTML += '                                     <th>' + 'Part Number' + '</th>';
//                ReportHTML += '                                     <th>' + 'Quantity' + '</th>';
//                ReportHTML += '                                     <th>' + 'Date' + '</th>';
//                ReportHTML += '                                 </tr>';
//                ReportHTML += '                             </thead>';
//                ReportHTML += '                             <tbody>';
//                for (var i = 0; i < _PDIRows.length; i++) {
//                    ReportHTML += '                                 <tr class="" style="">';
//                    ReportHTML += '                                     <td>' + (i + 1) + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PDICode + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemCode + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PurchaseItemName + '</td>';
//                    ReportHTML += '                                     <td>' + (_PDIRows[i].PartNumber == 0 ? "" : _PDIRows[i].PartNumber) + '</td>';
//                    ReportHTML += '                                     <td>' + _PDIRows[i].PickedQuantity + '</td>';
//                    ReportHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(_PDIRows[i].RequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(_PDIRows[i].RequiredDate))) + '</td>';
//                    ReportHTML += '                                 </tr>';
//                }
//                ReportHTML += '                             </tbody>';
//                ReportHTML += '                         </table>';

//                //ReportHTML += '                 <div class="" style="clear:both;">';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  أمين المخزن  ' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :  مسئول التسليم   ' + '</b></div>';
//                //ReportHTML += '                 </div>'
//                //ReportHTML += '                 <div class="" style="clear:both;">';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + ' :  الاسم  ' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-center"><b>' + '' + '</b></div>';
//                //ReportHTML += '                     <div class="col-xs-4 text-right"><b>' + '  :   الاسم   ' + '</b></div>';
//                //ReportHTML += '                 </div>'

//                ReportHTML += '         </body>';

//                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
//                //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
//                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
//                //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
//                //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ShowFooter input[type=checkbox]").prop("checked"))
//                //    ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
//                ReportHTML += '     </footer>';

//                ReportHTML += '</html>';

//                var mywindow = window.open('', '_blank');
//                mywindow.document.write(ReportHTML);
//                mywindow.document.close();
//            }
//            FadePageCover(false);
//        }
//        , null);
//}