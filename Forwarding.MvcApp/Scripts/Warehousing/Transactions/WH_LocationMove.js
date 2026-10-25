var _hasRequest;
var _autoGeneratePallet;
function WH_LocationMove_Initialize() {
    debugger;
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    else 
        _hasRequest = false;

    if (["FPL"].includes(pDefaults.UnEditableCompanyName))
        _autoGeneratePallet = true;
    else 
        _autoGeneratePallet = false;
    
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_LocationMove_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_LocationMove/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE 1=1";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadView("/Warehousing/Transactions/WH_LocationMove", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_LocationMove_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(pLoggedUser.WarehouseID, 2, "< --Select -->", "slWarehouse", pData[2], function () { $('#slWarehouse').change(); });
                FillListFromObject(null, 2, "< --Select -->", "slStatus", pData[3], null);
               
            });
        $('#slLocation,#slLocationFrom,#slLocationTo').css({ 'width': '100%' }).select2();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_LocationMove_ClearAllControls(); }, null);
}
function WH_LocationMove_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_LocationMove");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_LocationMove",
            ("<tr ID='" + item.ID + "' ondblclick='return; WH_LocationMove_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                + "<td class='FromLocationCode'>" + item.FromLocationCode + "</td>"
                + "<td class='ToLocationCode'>" + item.ToLocationCode + "</td>"
                + "<td class='ToPalletStatusName'>" + item.ToPalletStatusName + "</td>"
                + "<td class='Reason'>" + item.Reason + "</td>"
                + "<td class='MovedBy'>" + item.MovedBy + "</td>"
                + "<td class='ByPallet hide'>" + (item.ByPallet?1:0) + "</td>"
                + "<td class='ByItem hide'>" + (item.ByItem?1:0) + "</td>"
            + "<td class='hide'><a href='#WH_LocationMoveModal' data-toggle='modal' onclick='WH_LocationMove_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_LocationMove", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_LocationMove>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_LocationMove_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = WH_LocationMove_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_LocationMove_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_LocationMove>tbody>tr", $("#txt-Search").val().trim());
}
function WH_LocationMove_GetWhereClause(pFilterOptions) {
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
        if ($("#srchDate").val().trim() != "") {
            var vals = IsNull($("#srchDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(CreationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(CreationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchFromLocation").val().trim() != "") {
            var vals = IsNull($("#srchFromLocation").val(), '').split(',');
            pWhereClause += " and (FromLocationCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR FromLocationCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchToLocation").val().trim() != "") {
            var vals = IsNull($("#srchToLocation").val(), '').split(',');
            pWhereClause += " and (ToLocationCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ToLocationCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchToPalletStatus").val().trim() != "") {
            var vals = IsNull($("#srchToPalletStatus").val(), '').split(',');
            pWhereClause += " and (ToPalletStatusName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ToPalletStatusName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchReason").val().trim() != "") {
            var vals = IsNull($("#srchReason").val(), '').split(',');
            pWhereClause += " and (Reason ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Reason";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchMovedBy").val().trim() != "") {
            var vals = IsNull($("#srchMovedBy").val(), '').split(',');
            pWhereClause += " and (MovedBy ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR MovedBy";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
    }
    return pWhereClause;
}
function WH_LocationMove_ClearAllControls() {
    debugger;
    ClearAll("#WH_LocationMoveModal");
    $('#btnSave').removeClass('hide');
    $("#cb-CheckAll").prop('checked', false);
    $("#cb-CheckAll-Details").prop('checked', false);
    $('#tblDetails').closest('div.panel').addClass('hide');
    if (pLoggedUser.WarehouseID > 0)
        $('#slWarehouse').val(pLoggedUser.WarehouseID);
}

function WH_LocationMove_FillAllControls(pID) {
    debugger;
    ClearAll("#WH_LocationMoveModal");
    $('#tblDetails tbody').html('');
    $('#slLocation').val(0).change();
    $('#tblDetails').closest('div.panel').addClass('hide');
    jQuery("#WH_LocationMoveModal").modal("show");

    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);

}

function LoadLocations() {
    $('#tblDetails tbody').html('');
    $('#slLocationFrom, #slLocationTo').html('<option value="0">< --Select --></option>');
    var warehouseId = $('#slWarehouse').val();
    if (!(warehouseId > 0))
        return;

    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: "where IsNull(TypeID,0)<>2 and WarehouseID = " + warehouseId,
    };
    CallGETFunctionWithParameters("/api/WH_LocationMove/LoadLocations", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 1, "< --Select -->", "slLocationFrom", pData[0], function () { $('#slLocationTo').html($('#slLocationFrom').html()); });
        }
        , null);
}

var _details = [];
function LoadDetails() {
    debugger;
    $("#cb-CheckAll-Details").prop('checked', false);
    $('#tblDetails tbody').html('');
    if (!($('#slWarehouse').val()>0) || (!($('#slLocationFrom').val() > 0) && IsNull($('#txtFromPallets').val(),'').trim()=='')) {
        swal("Please", "Enter from location or from pallets");
        return
    }
    FadePageCover(true);
    var whereClause = " WarehouseID=" + $('#slWarehouse').val()+" and IsNull(Quantity,0) > IsNull(PDL_DemandedQuantity,0) and ISNULL(PalletID,'')<>''";
 

    if ($('#slLocationFrom').val() > 0)
        whereClause += " and LocationID =" + $('#slLocationFrom').val();

    if (IsNull($('#txtFromPallets').val(), '').trim() != '') {
        var pallets = ("'" + $('#txtFromPallets').val().replace(/,/g, "','") + "'");
        whereClause += " and PalletID in ("+pallets+")";
    }

    pParametersWithValues = {
        pWhereClause: whereClause,
        pByPallet: $('#cbByPallet').is(':checked'),
        pByItem: $('#cbByItem').is(':checked')
    };
    CallGETFunctionWithParameters("/api/WH_LocationMove/LoadDetails", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var details = JSON.parse(pData.Details);
            _details = details;
            ReceiveDetails_BindTableRows(details);
            if (!($('#slLocationFrom').val() > 0) && details.length > 0) {
                if ($('#cbByPallet').is(':checked'))
                    $('#tblDetails tbody input[name=Delete]').prop('checked', true);
            }
        }
        , null);
}
function ReceiveDetails_BindTableRows(pData) {
    $('#tblDetails tbody').html('');
    $.each(pData, function (i, item) {
    var qty = (Number(item.Quantity) - Number(item.PDL_DemandedQuantity));
        AppendRowtoTable("tblDetails",
            ("<tr>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='' /></td>"
                + "<td class='ItemBalanceID hide'>" + item.ID + "</td>"
                + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                + "<td class='PurchaseItemCode ShownByItem hide'>" + item.PurchaseItemCode + "</td>"
                + "<td class='PurchaseItemName ShownByItem hide'>" + item.PurchaseItemName + "</td>"
                + "<td class='FromPalletID'>" + item.PalletID + "</td>"
                + "<td class='ToPalletID ShownByItem hide'><input type='text' class='form-control input-sm' data-required='false' maxlength='20'/></td>"
                + "<td class='FromLocationID hide'>" + item.LocationID + "</td>"
                + "<td class='FromLocationCode'>" + item.LocationCode + "</td>"
                + "<td class='ToLocationID'><select id='slToLocationID_" + i + "' data-required='false' class='form-control input-sm'>" + $('#slLocationTo').html()+"</select></td>"
                + "<td class='MovedQuantity ShownByItem hide'><input type='text' class='form-control input-sm' data-required='false' maxlength='10' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' val='" + qty + "' value='" + qty + "' onkeyup='ValidateMovedQty(this);'/></td>"
                + "<td class='BatchNumber hide'>" + item.BatchNumber + "</td>"
                + "<td class='PackageTypeID hide'>" + item.PackageTypeID + "</td>"
                + "<td class='PackageTypeName hide'>" + item.PackageTypeName + "</td>"
                + "<td class='ReceiveDate hide'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate)) : "") + "' /></td>"
                + "<td class='ProductionDate hide'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + "' /></td>"
                + "<td class='ExpirationDate hide'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : "") + "' /></td>"
                + "</tr>"));
    });
    if ($('#cbByPallet').is(':checked'))
        $('#tblDetails .ShownByItem').addClass('hide');

    else if ($('#cbByItem').is(':checked'))
        $('#tblDetails .ShownByItem').removeClass('hide');

    $('#tblDetails td.TolLocationID select').css({ 'width': '100%' }).select2();

    BindAllCheckboxonTable("tblDetails", "DetailID");
    CheckAllCheckbox("DetailID");
}
function WH_LocationMove_Save() {
    debugger;
    FadePageCover(true);
    if (ValidateForm("form", "WH_LocationMoveModal")) {

        var pParametersWithValues = {
            ID: $('#hID').val(),
            WarehouseID: $('#slWarehouse').val(),
            FromLocationID: $('#slLocationFrom').val(),
            ToLocationID: $('#slLocationTo').val(),
            ToPalletStatusID: $('#slStatus').val(),
            Reason: $('#txtReason').val(),
            ByPallet: $('#cbByPallet').is(':checked'),
            ByItem: $('#cbByItem').is(':checked'),
        };

        var details = [];
        $('#tblDetails tbody tr').each(function (i) {
            if ($(this).find('td.ID input').is(':checked')) {
                details.push({
                    BatchNumber: IsNull($(this).find('td.BatchNumber').text(), '').trim(),
                    FromPalletID: IsNull($(this).find('td.FromPalletID').text(), '').trim(),
                    ToPalletID: IsNull($(this).find('td.ToPalletID input').val(), '').trim(),
                    ToLocationID: IsNull($(this).find('td.ToLocationID select option:selected').val(), pParametersWithValues.ToLocationID),
                    ItemBalanceID: IsNull($(this).find('td.ItemBalanceID').text(), 0),
                    PurchaseItemID: IsNull($(this).find('td.PurchaseItemID').text(), 0),
                    PackageTypeID: IsNull($(this).find('td.PackageTypeID').text(), 0),
                    CurrentQuantity: IsNull($(this).find('td.MovedQuantity input').attr('val'), 0),
                    MovedQuantity: IsNull($(this).find('td.MovedQuantity input').val(), 0),
                    ReceiveDate: ($(this).find('td.ReceiveDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ReceiveDate input').val())),
                    ProductionDate: ($(this).find('td.ProductionDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ProductionDate input').val())),
                    ExpirationDate: ($(this).find('td.ExpirationDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpirationDate input').val())),

                });
            }
        });

        pParametersWithValues['Details'] = details;        

        if (details.length == 0 && ($('#cbByPallet').is(':checked') || $('#cbByItem').is(':checked'))) {
            swal("Sorry", "No Data To Save!");
            FadePageCover(false);
            return;
        }

        var isValid = true;
        var palletIDs = [];

        if ($('#cbByPallet').is(':checked')) {
            //if (!(pParametersWithValues.ToLocationID > 0)) {
            //    swal("Sorry", "To Location is mandatory!");
            //    isValid = false;
            //}
            $.each(details, function (i, item) {
                if (item.FromPalletID == '') {
                    swal("Sorry", "PalletID is mandatory!");
                    isValid = false;
                    return false
                }
                if (!(item.ToLocationID > 0)) {
                    swal("Sorry", "To Location is mandatory!");
                    isValid = false;
                    return false
                }
            });
        }
        else if ($('#cbByItem').is(':checked')) {
            $.each(details, function (i, item) {
                if (item.FromPalletID == '') {
                    swal("Sorry", "PalletID is mandatory!");
                    isValid = false;
                    return false
                }
                if (item.ToPalletID == '' && !_autoGeneratePallet) {
                    swal("Sorry", "To PalletID is mandatory!");
                    isValid = false;
                    return false
                }
                if (!(item.ToLocationID > 0)) {
                    swal("Sorry", "To Location is mandatory!");
                    isValid = false;
                    return false
                }
                if (!(item.MovedQuantity>0)) {
                    swal("Sorry", "Quantity is mandatory!");
                    isValid = false;
                    return false
                }

                if (!(pParametersWithValues.ToLocationID > 0))
                    pParametersWithValues.ToLocationID = pParametersWithValues.FromLocationID;

                palletIDs.push("'" + item.ToPalletID + "'");

            });
        }
        
        if (!isValid) {
            FadePageCover(false);
            return;
        }
        CallPOSTFunctionWithParameters("/api/WH_LocationMove/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_LocationMoveModal").modal("hide");
                    WH_LocationMove_LoadingWithPaging();
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
    if ($('#srchPallet').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#srchPallet').val().trim().toLowerCase()); });
    }
    if ($('#srchItem').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemCode, '').toLowerCase().includes($('#srchItem').val().trim().toLowerCase()); });
    }
    if ($('#srchItemName').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemName, '').toLowerCase().includes($('#srchItemName').val().trim().toLowerCase()); });
    }
    ReceiveDetails_BindTableRows(rowItems);
}

function ReloadDetails(pChk1, pChk2) {
    debugger;
    if ($('#' + pChk1 + '').is(':checked')) {
        $('#' + pChk2 + '').prop('checked', false);

        if ($('#cbByPallet').is(':checked'))
            $('#tblDetails .ShownByItem').addClass('hide');

        else if ($('#cbByItem').is(':checked'))
            $('#tblDetails .ShownByItem').removeClass('hide');
            
        $('#tblDetails').closest('div.panel').removeClass('hide');
        LoadDetails();
    }
    else {
        $('#tblDetails tbody').html('');
        $('#tblDetails .ShownByItem').addClass('hide');
        $('#tblDetails').closest('div.panel').addClass('hide');
    }

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