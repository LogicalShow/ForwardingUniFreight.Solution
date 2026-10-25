var _hasRequest;
function WH_Transfer_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    else
        _hasRequest = false;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_Transfer_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Transfer/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadView("/Warehousing/Transactions/WH_Transfer", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_Transfer_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(pLoggedUser.WarehouseID, 2, "< --Select -->", "slWarehouse", pData[2], null);
                FillListFromObject(null, 2, "< --Select -->", "slFromOwner", pData[3], null);
                FillListFromObject(null, 2, "< --Select -->", "slToOwner", pData[4], null);
               
            });
        $('select.Owner,select.Item').css({ 'width': '100%' }).select2();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_Transfer_ClearAllControls(); }, null);
}
function WH_Transfer_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_Transfer");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_Transfer",
            ("<tr ID='" + item.ID + "' ondblclick='return; WH_Transfer_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                + "<td class='FromItemCode'>" + item.FromItemCode + "</td>"
                + "<td class='FromItemName'>" + item.FromItemName + "</td>"
                + "<td class='ToItemCode'>" + item.ToItemCode + "</td>"
                + "<td class='ToItemName'>" + item.ToItemName + "</td>"
                + "<td class='PackageTypeName'>" + item.PackageTypeName + "</td>"
                + "<td class='PalletID'>" + item.PalletID + "</td>"
                + "<td class='LocationCode'>" + item.LocationCode + "</td>"
                + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + "</td>"
                + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : "") + "</td>"
                + "<td class='Quantity'>" + item.Quantity + "</td>"
                + "<td class='CreatorUserName'>" + item.CreatorUserName + "</td>"
                + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) : "") + "</td>"

            + "<td class='hide'><a href='#WH_TransferModal' data-toggle='modal' onclick='WH_Transfer_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Transfer", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_Transfer>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Transfer_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = WH_Transfer_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1`  }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Transfer_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_Transfer>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Transfer_GetWhereClause(pFilterOptions) {
    var pWhereClause = "WHERE 1=1" + "\n";
     //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "") {
            pWhereClause += "AND (" + "\n";
            pWhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "    )";
        }
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
        if ($("#srchFromItemCode").val().trim() != "") {
            var vals = IsNull($("#srchFromItemCode").val(), '').split(',');
            pWhereClause += " and (FromItemCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR FromItemCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchFromItemName").val().trim() != "") {
            var vals = IsNull($("#srchFromItemName").val(), '').split(',');
            pWhereClause += " and (FromItemName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR FromItemName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchToItemCode").val().trim() != "") {
            var vals = IsNull($("#srchToItemCode").val(), '').split(',');
            pWhereClause += " and (ToItemCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ToItemCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchToItemName").val().trim() != "") {
            var vals = IsNull($("#srchToItemName").val(), '').split(',');
            pWhereClause += " and (ToItemName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ToItemName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchUOM").val().trim() != "") {
            var vals = IsNull($("#srchUOM").val(), '').split(',');
            pWhereClause += " and (PackageTypeName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PackageTypeName";
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
        if ($("#srchLoc").val().trim() != "") {
            var vals = IsNull($("#srchLoc").val(), '').split(',');
            pWhereClause += " and (LocationCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR LocationCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchProd").val().trim() != "") {
            var vals = IsNull($("#srchProd").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ProductionDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchExpi").val().trim() != "") {
            var vals = IsNull($("#srchExpi").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ExpirationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchQty").val().trim() != "") {
            var vals = IsNull($("#srchQty").val(), '').split(',');
            pWhereClause += " and (Quantity ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Quantity";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCreator").val().trim() != "") {
            var vals = IsNull($("#srchCreator").val(), '').split(',');
            pWhereClause += " and (CreatorUserName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR CreatorUserName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchCreation").val().trim() != "") {
            var vals = IsNull($("#srchCreation").val(), '').split(',');
            pWhereClause += " and (Format(Cast(CreationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(CreationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
    }
    return pWhereClause;
}
function WH_Transfer_ClearAllControls() {
    debugger;
    ClearAll("#WH_TransferModal");
    $('#btnSave').removeClass('hide');
    $("#cb-CheckAll").prop('checked', false);
    $("#cb-CheckAll-Details").prop('checked', false);
    if (pLoggedUser.WarehouseID > 0)
        $('#slWarehouse').val(pLoggedUser.WarehouseID);
}
function WH_Transfer_FillAllControls(pID) {
    debugger;
    ClearAll("#WH_TransferModal");
    $('#tblDetails tbody').html('');
    $('#slLocation').val(0).change();
    jQuery("#WH_TransferModal").modal("show");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);

}

function LoadItems(pFrom) {
    debugger;
    var whereClause = '';

    if (pFrom) {
        $('#slFromItem').html('');
        var warehouseId = $('#slWarehouse').val();
        var ownerId = $('#slFromOwner').val();

        if (warehouseId > 0 && ownerId > 0)
            whereClause = `where WarehouseID=${warehouseId} and OwnerID=${ownerId} and Quantity>IsNull(PDL_DemandedQuantity,0)`;
    }
    else {
        $('#slToItem').html('');
        var ownerId = $('#slToOwner').val();
        var item = $('#slFromItem option:selected');
        var itemId = $(item).val();
        var byLot = IsNull($(item).attr('ByLotNo'),0);
        var byExpire = IsNull($(item).attr('ByExpireDate'), 0);
        var bySerial = IsNull($(item).attr('BySerialNo'), 0);
        if (ownerId > 0 && itemId)
            whereClause = `where OwnerID=${ownerId} and PackageTypeID=(select PackageTypeID from PurchaseItem where ID=${itemId}) and IsNull(ByLotNo,0)=${byLot} and IsNull(ByExpireDate,0)=${byExpire} and IsNull(BySerialNo,0)=${bySerial}`;
    }
    if (whereClause == '')
        return;
    
    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: whereClause,
        pFrom: pFrom
    };
    CallGETFunctionWithParameters("/api/WH_Transfer/LoadItems", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            if (pFrom)
                FillListFromObject(null, 9, "< --Select -->", "slFromItem", pData, function () {
                    var items = JSON.parse(pData);
                    $.each(items, function (i, item) {
                        $('#slFromItem option[value=' + item.ID + ']').attr('ByLotNo', (item.ByLotNo?1:0));
                        $('#slFromItem option[value=' + item.ID + ']').attr('ByExpireDate', (item.ByExpireDate ? 1 : 0));
                        $('#slFromItem option[value=' + item.ID + ']').attr('BySerialNo', (item.BySerialNo ? 1 : 0));
                    });
                });
            else
                FillListFromObject(null, 9, "< --Select -->", "slToItem", pData, function () { $('#slToItem option[value=' + $('#slFromItem option:selected').val() + ']').remove(); });

        }
        , null);
}

var _details = [];
function LoadItemStock() {
    debugger;
    $("#cb-CheckAll-Details").prop('checked', false);
    $('#tblDetails tbody').html('');
    if (!($('#slWarehouse').val() > 0)) {
        swal("Please", "Select warehouse");
        return
    }
    if (!($('#slFromItem').val() > 0)) {
        swal("Please", "Select from item");
        return
    }
    FadePageCover(true);
    var whereClause = `WarehouseID=${$('#slWarehouse').val()} and PurchaseItemID=${$('#slFromItem').val()} and Quantity>IsNull(PDL_DemandedQuantity,0) and PackageTypeID=(select PackageTypeID from PurchaseItem where ID=${$('#slFromItem').val()})`;
  
    pParametersWithValues = {
        pWhereClause: whereClause
    };
    CallGETFunctionWithParameters("/api/WH_Transfer/LoadItemStock", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var details = JSON.parse(pData);
            _details = details;
            Details_BindTableRows(details);
        }
        , null);
}
function Details_BindTableRows(pData) {
    $('#tblDetails tbody').html('');
    $.each(pData, function (i, item) {
    var qty = (Number(item.Quantity) - Number(item.PDL_DemandedQuantity));
        AppendRowtoTable("tblDetails",
            ("<tr>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='' /></td>"
                + "<td class='ItemBalanceID hide'>" + item.ID + "</td>"
                + "<td class='PackageTypeID hide'>" + item.PackageTypeID + "</td>"
                + "<td class='PackageTypeName'>" + item.PackageTypeName + "</td>"
                + "<td class='PalletID'>" + item.PalletID + "</td>"
                + "<td class='BatchNumber'>" + item.BatchNumber + "</td>"
                + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + "</td>"
                + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : "") + "</td>"
                + "<td class='TransferQuantity'><input type='text' class='form-control input-sm' data-required='false' maxlength='10' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' val='" + qty + "' value='" + qty + "' onkeyup='ValidateMovedQty(this);'/></td>"
                + "</tr>"));
    });
    BindAllCheckboxonTable("tblDetails", "DetailID");
    CheckAllCheckbox("DetailID");
}
function WH_Transfer_Save() {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "WH_TransferModal")) {
        var isValid = true;
        var details = [];
        $('#tblDetails tbody tr').each(function (i) {
            if ($(this).find('td.ID input').is(':checked')) {
                if (!($(this).find('td.TransferQuantity input').val() > 0)) {
                    swal("Sorry", "Quantity Is Mandatory!");
                    isValid = false;
                    return false;
                }
                details.push({
                    ItemBalanceID: IsNull($(this).find('td.ItemBalanceID').text(), 0),
                    PackageTypeID: IsNull($(this).find('td.PackageTypeID').text(), 0),
                    PalletID: IsNull($(this).find('td.PalletID').text(), '').trim(),
                    BatchNumber: IsNull($(this).find('td.BatchNumber').text(), '').trim(),
                    CurrentQuantity: IsNull($(this).find('td.TransferQuantity input').attr('val'), 0),
                    TransferQuantity: IsNull($(this).find('td.TransferQuantity input').val(), 0),
                    ProductionDate: ($(this).find('td.ProductionDate').text().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ProductionDate').text())),
                    ExpirationDate: ($(this).find('td.ExpirationDate').text().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpirationDate').text())),

                });
            }
        });

        if (!isValid) {
            FadePageCover(false);
            return;
        }

        if (details.length == 0) {
            swal("Sorry", "No Lines Selected To Transfer!");
            FadePageCover(false);
            return;
        }

        var pParametersWithValues = {
            ID: $('#hID').val(),
            WarehouseID: $('#slWarehouse').val(),
            FromItemID: $('#slFromItem').val(),
            ToItemID: $('#slToItem').val(),
            Details: details
        };
        
        CallPOSTFunctionWithParameters("/api/WH_Transfer/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_TransferModal").modal("hide");
                    WH_Transfer_LoadingWithPaging();
                }
                else {
                    swal("Sorry", "Saving Faild!");
                    console.log(pData.Exception);
                }
            }
            , null);
    }
    else 
        FadePageCover(false);
}


function SearchRowItem() {
    debugger;
    var rowItems = _details;
    if ($('#srchUnit').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PackageTypeName, '').toLowerCase().includes($('#srchUnit').val().trim().toLowerCase()); });
    }
    if ($('#srchPallet').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#srchPallet').val().trim().toLowerCase()); });
    }
    if ($('#srchBatch').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.BatchNumber, '').toLowerCase().includes($('#srchBatch').val().trim().toLowerCase()); });
    }
    if ($('#srchProduction').val().trim()) {
        rowItems = rowItems.filter(function (row) { return (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(row.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(row.ProductionDate)) : "").includes($('#srchProduction').val().trim().toLowerCase()); });
    }
    if ($('#srchExpiration').val().trim()) {
        rowItems = rowItems.filter(function (row) { return (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(row.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(row.ExpirationDate)) : "").includes($('#srchExpiration').val().trim().toLowerCase()); });
    }
    Details_BindTableRows(rowItems);
}



function ValidateMovedQty(pInp) {
    var moved = Number($(pInp).val());
    var available = Number($(pInp).attr('val'));

    if (moved > available) {
        swal("Sorry", "Only available quanity is " + available + " ");
        $(pInp).val(0);
        return false;
    }
    return true;
}