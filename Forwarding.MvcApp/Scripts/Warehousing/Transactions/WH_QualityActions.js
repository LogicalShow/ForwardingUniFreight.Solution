var _isPallet;
var _hasRequest;
function WH_QualityActions_Initialize() {
    debugger;
    _isPallet = true;
    _hasRequest = ['EF', 'FPL'].includes(pDefaults.UnEditableCompanyName);

    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_QualityActions_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_QualityActions/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE IsNull(PalletID,'') <> '' and isPallet = 1 ";
    var pOrderBy = "PalletID";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsPallet: _isPallet, pHasRequest: _hasRequest }
    LoadView("/Warehousing/Transactions/WH_QualityActions", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        if (!_hasRequest) {
            $('.tabPallets, .tabBatches').addClass('hide');
            $('.tabItems').addClass('active');
        }
 
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_QualityActions_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 2, "< --Select Status-->", "slPalletStatus", pData[2], null);
                FillListFromObject(null, 2, "< --Select Class-->", "slPalletClass", pData[3], null);
                FillListFromObject(null, 1, "< --Select Item-->", "slReceive", pData[4], null);
                FillListFromObject(null, 9, "< --Select Item-->", "slItem", pData[5], null);
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        $('#WH_QualityActionsModal').removeAttr('tabindex');
        $('#slReceive').css({ 'width': '100%' }).select2();
        $('#slItem').css({ 'width': '100%' }).select2();
    },
        function () { WH_QualityActions_ClearAllControls(); },
        function () { WH_QualityActions_DeleteList(); });
}

function WH_QualityActions_ClearAllControls() {
    debugger;
    $("#cb-CheckAll").prop('checked', false);
}

function WH_QualityActions_LoadingWithPaging() {
    debugger;
    var loadObjects = $('slPalletStatus option').length == 0 || $('slBatchStatus option').length == 0;
    var suffix = _isPallet ? "" : "-batch";
    var pWhereClause = WH_QualityActions_GetWhereClause();
    var pPageSize = $('#select-page-size' + suffix + '').val();
    var pPageNumber = ($("#div-Pager" + suffix + " li.active a").text() == "" ? 1 : $("#div-Pager" + suffix + " li.active a").text());
    var pOrderBy = " " + (_isPallet ? "PalletID" : "BatchNumber") + " ";
    var pControllerParameters = { pIsLoadArrayOfObjects: loadObjects, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsPallet: _isPallet }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager" + suffix + "", "select-page-size" + suffix + "", "spn-first-page-row" + suffix + "", "spn-last-page-row" + suffix + "", "spn-total-count" + suffix + "", "div-Text-Total" + suffix + "", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        FillListFromObject(null, 2, "< --Select Status-->", "slBatchStatus", pData[2], null);
        if (_isPallet)
            WH_QualityActions_BindTableRows(JSON.parse(pData[0]));
        else
            WH_QualityActionsBatch_BindTableRows(JSON.parse(pData[0]));
    });
    HighlightText("#tblWH_QualityActions>tbody>tr", $("#txt-Search").val().trim());
}
function WH_QualityActions_GetWhereClause() {
    var pWhereClause = (_isPallet ? " WHERE IsNull(PalletID,'') <> '' and isPallet = 1 " : " WHERE IsNull(BatchNumber,'') <> '' and isPallet = 0 ") + "\n";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += "AND (" + "\n";
        pWhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "       OR PalletID LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "       OR PalletStatusName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "       OR LocationCode LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += "    )";
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
    if (_isPallet) {
        if ($("#srchPallet").val().trim() != "") {
            var vals = IsNull($("#srchPallet").val(), '').split(',');
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
        if ($("#srchReceiveCode").val().trim() != "") {
            var vals = IsNull($("#srchReceiveCode").val(), '').split(',');
            pWhereClause += " and (ReceiveCode ";

            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR ReceiveCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }

            pWhereClause += ")";
        }
    }
    else {
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
        if ($("#srchProductionDate").val().trim() != "") {
            var vals = IsNull($("#srchProductionDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ProductionDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchExpirationDate").val().trim() != "") {
            var vals = IsNull($("#srchExpirationDate").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ExpirationDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchBatchStatus").val().trim() != "") {
            var vals = IsNull($("#srchBatchStatus").val(), '').split(',');
            pWhereClause += " and (BatchStatusName ";

            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR BatchStatusName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }

            pWhereClause += ")";
        }
    }

    //if ($("#srchItem").val().trim() != "") {
    //    var vals = IsNull($("#srchItem").val(), '').split(',');
    //    pWhereClause += " and (PurchaseItemName ";

    //    for (var i = 0; i < vals.length; i++) {
    //        if (i > 0)
    //            pWhereClause += " OR PurchaseItemName";
    //        pWhereClause += " Like N'%" + vals[i] + "%'";
    //    }

    //    pWhereClause += ")";
    //}
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
    return pWhereClause;
}

function WH_QualityActions_Save() {
    debugger;

    var palletStatusId = _isPallet ? $('#slPalletStatus').val() : $('#slBatchStatus').val();
    var palletClassId = _isPallet?$('#slPalletClass').val():0;

    if (_isPallet && !(palletStatusId > 0) && !(palletClassId > 0)) {
        swal("Sorry", "Select Pallet Status or class");
        return;
    }
    if (!_isPallet && !(palletStatusId > 0)) {
        swal("Sorry", "Select Batch Status");
        return;
    }

    var reason = _isPallet ? $('#txtReason').val() : $('#txtBatchReason').val();

    var details = [];
    if (_isPallet) {
        $('#tblWH_QualityActions tbody tr').each(function () {
            if ($(this).find('td.ID input').is(':checked')) {
                details.push({
                    ReceiveID: $(this).find('td.ReceiveID').text(),
                    LocationID: $(this).find('td.LocationID').text(),
                    PalletID: $(this).find('td.PalletID').text(),
                });
            }
        });
    }
    else {
        $('#tblWH_QualityActionsBatch tbody tr').each(function () {
            if ($(this).find('td.ID input').is(':checked')) {
                details.push({
                    ReceiveID: $(this).find('td.ReceiveID').text(),
                    LocationID: $(this).find('td.LocationID').text(),
                    PalletID: $(this).find('td.PalletID input').val(),
                });
            }
        });
    }

    if (_isPallet && details.length == 0) {
        swal("Sorry", "Select Pallets");
        return;
    }
    if (!_isPallet && details.length == 0) {
        swal("Sorry", "Select Batches");
        return;
    }
    FadePageCover(true);
    CallPOSTFunctionWithParameters("/api/WH_QualityActions/Save", { PalletStatusID: palletStatusId, PalletClassID: palletClassId, Reason: reason, IsPallet: _isPallet, Pallets: details }
        , function (pData) {
            FadePageCover(false);

            if (pData == "") {
                if (_isPallet) {
                    $('#slPalletStatus').val(0);
                    $('#slPalletClass').val(0);
                    $('#txtReason').val('');
                }
                else {
                    $('#slBatchStatus').val(0);
                    $('#txtBatchReason').val('');
                }

                swal("Success", "Saved successfully.");
                WH_QualityActions_LoadingWithPaging();
            }
            else {
                swal("Sorry", "Saving Faild");
                console.log(pData);
            }
        }
        , null);
}

function ExportQualityActions() {
    var pWhereClause = " WHERE PalletID is not null " + "\n";
    var pPageSize = 99999;
    var pPageNumber = 1;
    var pOrderBy = "PalletID ";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        var data = JSON.parse(pData[0]);

        ClearAllTableRows("tblWH_QualityActionsExport");
        $.each(data, function (i, item) {
            AppendRowtoTable("tblWH_QualityActionsExport",
                ("<tr>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='LocationCode'>" + item.LocationCode + "</td>"
                    + "<td class='PalletID'>" + item.PalletID + "</td>"
                    + "<td class='PalletStatusName'>" + item.PalletStatusName + "</td>"
                    + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                    + "<td class='Reason'>" + item.Reason + "</td>"
                    + "</tr>"));
        });
        ExportHtmlTableToCsv('tblWH_QualityActionsExport', 'QualityActions');
    });
}

//#region Pallets
function WH_QualityActions_BindTableRows(pData) {
    debugger;
    //var pallets = {};
    //$.each(pData, function (i, item) {
    //    pallets[item.PalletID] = item;
    //});
    //console.log(pallets);
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_QualityActions");
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_QualityActions",
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='PalletID'>" + item.PalletID + "</td>"
                + "<td class='LocationID hide'>" + item.LocationID + "</td>"
                + "<td class='LocationCode'>" + item.LocationCode + "</td>"
                + "<td class='PalletStatusName'>" + item.PalletStatusName + "</td>"
                + "<td class='PalletClassName'>" + item.PalletClassName + "</td>"
                + "<td class='PurchaseItemName hide'>" + item.PurchaseItemName + "</td>"
                + "<td class='Reason'>" + (item.Reason == 0 ? '' :item.Reason) + "</td>"
                + "<td class='ReceiveCode'>" + (item.ReceiveCode==0?'':item.ReceiveCode) + "</td>"
                + "<td class='PalletStatusID hide'>" + item.PalletStatusID + "</td>"
                + "<td class=''><button type='button' class='btn btn-sm btn-success' onclick='OpenPallet(" + item.ReceiveID + ", " + item.LocationID + ", `" + item.PalletID + "`, 0);'>Open Pallet</button></td>"
                + "</tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblWH_QualityActions", "ID", "cb-CheckAll-pallet");
    //CheckAllCheckbox("ID-Pallet");
    HighlightText("#tblWH_QualityActions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function OpenPallet(pReceiveID, pLocationID, pPalletID, pBatchNo) {
    debugger;
    ClearAllTableRows("tblPalletItems");
    var filter = 'Quantity>IsNull(PDL_DemandedQuantity,0)';

    if (_isPallet) {
        $('#lblShown').text('Pallet: ' + pPalletID);
        filter = `LocationID=${pLocationID} and PalletID = '${pPalletID} '`;
    }
    else{
        $('#lblShown').text('Batch: ' + pBatchNo);
        filter = `BatchNumber = '${pBatchNo} '`;
    }
 
    var query = `select PurchaseItemCode, PurchaseItemName, PackageTypeName, Quantity-IsNull(PDL_DemandedQuantity,0) Quantity,
                 ExpirationDate, ProductionDate, LocationCode, BatchNumber, PalletID
                 from vwWH_ItemBalance
                 where ${filter}`;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_QualityActions/GetPalletItems", { pQuery: query }
        , function (pData) {
            FadePageCover(false);
            jQuery("#WH_QualityActionsModal").modal("show");
            var data = JSON.parse(pData);
            $.each(data, function (i, item) {
                AppendRowtoTable("tblPalletItems",
                    ("<tr>"
                        + "<td class='PurchaseItemCode'>" + item.PurchaseItemCode + "</td>"
                        + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                        + "<td class='PackageTypeName'>" + item.PackageTypeName + "</td>"
                        + "<td class='Quantity'>" + item.Quantity + "</td>"
                        + "<td class='PalletStatusName'>" + GetDateWithFormatMDY(item.ExpirationDate) + "</td>"
                        + "<td class='ExpirationDate'>" + GetDateWithFormatMDY(item.ProductionDate) + "</td>"
                        + "<td class='ProductionDate'>" + item.LocationCode + "</td>"
                        + "<td class='BatchNumber'>" + item.BatchNumber + "</td>"
                        + "<td class='PalletID'>" + item.PalletID + "</td>"
                        + "</tr>"));
            });
        }
        , null);
}

function CheckAllPallets(chk) {
    $('#tblWH_QualityActions tbody td input[type=checkbox]').prop('checked', $(chk).is(':checked'));
}
//#endregion Pallets

//#region Batches
function WH_QualityActionsBatch_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_QualityActionsBatch");
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_QualityActionsBatch",
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                + "<td class='BatchNumber PalletID'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' value='" + item.BatchNumber + "' val='" + item.BatchNumber+"'/></td>"
                + "<td class='ProductionDate'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/2000", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : '') + "'/></td>"
                + "<td class='ExpirationDate'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/2000", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : '') + "'/></td>"
                + "<td class='PalletStatusName'>" + item.BatchStatusName + "</td>"
                + "<td class='Reason'>" + item.Reason + "</td>"
                + "<td class='PalletStatusID hide'>" + item.PalletStatusID + "</td>"
                + "<td class=''><button type='button' class='btn btn-sm btn-primary' onclick='UpdateBatch(this);'>Update</button></td>"
                + "<td class=''><button type='button' class='btn btn-sm btn-success' onclick='OpenPallet(" + item.ReceiveID + ", " + item.LocationID + ", 0, `" + item.BatchNumber + "`);'>Open Batch</button></td>"
                + "</tr>"));
    });
    $('#tblWH_QualityActionsBatch input.datepicker-input').datepicker().on('changeDate', function () { $(this).datepicker('hide') });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblWH_QualityActionsBatch", "ID", "cb-CheckAll-batch");
    //CheckAllCheckbox("cb-CheckAll-batch");
    HighlightText("#tblWH_QualityActionsBatch>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function LoadBatches(pReload) {
    //if ($('#tblWH_QualityActionsBatch tbody tr').length > 0 && !pReload)
    //    return;

    var pWhereClause = " WHERE IsNull(BatchNumber,'') <> '' and isPallet = 0 ";
    var pPageSize = $('#select-page-size-batch').val();
    var pPageNumber = ($("#div-Pager-batch li.active a").text() == "" ? 1 : $("#div-Pager-batch li.active a").text());
    var pOrderBy = "BatchNumber";
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsPallet: _isPallet }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager-batch", "select-page-size-batch", "spn-first-page-row-batch", "spn-last-page-row-batch", "spn-total-count-batch", "div-Text-Total-batch", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        WH_QualityActionsBatch_BindTableRows(JSON.parse(pData[0]));
        FillListFromObject(null, 2, "< --Select Status-->", "slBatchStatus", pData[2], null);
    });
}

function UpdateBatch(btn) {
    debugger;
    var tr = $(btn).closest('tr');
    var oldBatchNo = IsNull($(tr).find('td.BatchNumber input').attr('val'),'0');
    var batchNo = IsNull($(tr).find('td.BatchNumber input').val(),'0');
    var production = IsNull($(tr).find('td.ProductionDate input').val(),'').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ProductionDate input').val());
    var expiration = IsNull($(tr).find('td.ExpirationDate input').val(),'').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ExpirationDate input').val());

    FadePageCover(true);
    var pParametersWithValues = {
          pOldBatchNumber: oldBatchNo,
          pBatchNumber: batchNo,
        pProductionDate: production,
        pExpirationDate: expiration
    };
    CallGETFunctionWithParameters("/api/WH_QualityActions/UpdateBatch", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            WH_QualityActions_LoadingWithPaging();
        }
        , null);
}
function CheckAllBatches(chk) {
    $('#tblWH_QualityActionsBatch tbody td input[type=checkbox]').prop('checked', $(chk).is(':checked'));
}
//#endregion Batches

//region Item
var _items = [];
function GetItemBalance() {
    _items = [];
    $('#tblWH_QualityActionsItem tbody').html('');
    var itemId = $('#slItem').val();
    var receiveId = $('#slReceive').val();
    if (!(itemId > 0) && !(receiveId > 0))
        return;

    var pWhereClause = "";
    if (_hasRequest) {
        pWhereClause = "where Quantity>0";
        if (itemId > 0)
            pWhereClause += "and PurchaseItemID=" + itemId;
        if (receiveId > 0)
            pWhereClause += "and WarehouseID=(select WarehouseID from WH_Receive where ID=" + receiveId + ") and PalletID in (select distinct PalletID from WH_ReceiveDetails where ReceiveID=" + receiveId + ")";
    }
    else {
        pWhereClause = "where IsFinalized=1 and Quantity>0 and IsNull(PickedQuantity,0)=0";
        if (itemId > 0)
            pWhereClause += "and PurchaseItemID=" + itemId;
        if (receiveId > 0)
            pWhereClause += "and ReceiveID="+ receiveId;
    } 
   

    var pPageSize = $('#select-page-size-item').val();
    var pPageNumber = ($("#div-Pager-item li.active a").text() == "" ? 1 : $("#div-Pager-item li.active a").text());
    var pOrderBy = "PalletID";
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pHasRequest: _hasRequest }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager-item", "select-page-size-item", "spn-first-page-row-item", "spn-last-page-row-item", "spn-total-count-item", "div-Text-Total-item", "/api/WH_QualityActions/GetItemBalance", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        var data = JSON.parse(pData[0]);
        _items = data;
        Items_BindTableRows(data);
    });
}
function Items_BindTableRows(pData) {
    $('#tblWH_QualityActionsItem tbody').html('');
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_QualityActionsItem",
            ("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='PurchaseItemCode'>" + item.PurchaseItemCode + "</td>"
                + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                + "<td class='PalletID'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' value='" + item.PalletID + "' val='" + item.PalletID + "' "+(IsNull(item.PalletID,'0')=='0'?'':'disabled')+"/></td>"
                + "<td class='LocationCode'>" + item.LocationCode + "</td>"
                + "<td class='BatchNumber'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' value='" + item.BatchNumber + "' val='" + item.BatchNumber +"'/></td>"
                + "<td class='ProductionDate hide'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/2000", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : '') + "'/></td>"
                + "<td class='ExpirationDate'><input type='text' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + (Date.prototype.compareDates("01/01/2000", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : '') + "'/></td>"
                + "<td class=''><button type='button' class='btn btn-sm btn-primary' onclick='UpdateItem(this);'>Update</button></td>"
                + "</tr>"));
    });
    $('#tblWH_QualityActionsItem input.datepicker-input').datepicker().on('changeDate', function () { $(this).datepicker('hide') });
    if (_hasRequest) {
        $('#tblWH_QualityActionsItem .ProductionDate').removeClass('hide');
    }
    else {
        $('#tblWH_QualityActionsItem .PalletID input').prop('disabled',false);
    }
}
function CheckAllItems(chk) {
    $('#tblWH_QualityActionsItem tbody td input[type=checkbox]').prop('checked', $(chk).is(':checked'));
}
function SearchRowItem() {
    debugger;
    var rowItems = _items;
    if ($('#srchItemCode').val()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemCode, '').toLowerCase().includes($('#srchItemCode').val().trim().toLowerCase()); });
    }
    if ($('#srchItemName').val()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PurchaseItemName, '').toLowerCase().includes($('#srchItemName').val().trim().toLowerCase()); });
    }
    if ($('#srchItemPallet').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#srchItemPallet').val().trim().toLowerCase()); });
    }
    if ($('#srchItemLoc').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.LocationCode, '').toLowerCase().includes($('#srchItemLoc').val().trim().toLowerCase()); });
    }
    if ($('#srchItemBatch').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.BatchNumber, '').toLowerCase().includes($('#srchItemBatch').val().trim().toLowerCase()); });
    }
    if ($('#srchItemProdDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return ConvertDateFormat(GetDateWithFormatMDY(row.ProductionDate)).includes($('#srchItemProdDate').val().trim().toLowerCase()); });
    }
    if ($('#srchItemExpiDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return ConvertDateFormat(GetDateWithFormatMDY(row.ExpirationDate)).includes($('#srchItemExpiDate').val().trim().toLowerCase()); });
    }

    Items_BindTableRows(rowItems);
}
function UpdateItem(btn) {
    debugger;
    FadePageCover(true);
    var tr;
    
    var lst = [];
    if (btn) {
        tr = $(btn).closest('tr');

        lst.push({
            ID: $(tr).attr('id'),
            PalletID: IsNull($(tr).find('td.PalletID input').val(), '0'),
            BatchNumber: IsNull($(tr).find('td.BatchNumber input').val(), '0'),
            strProductionDate: IsNull($(tr).find('td.ProductionDate input').val(), '').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ProductionDate input').val()),
            strExpirationDate: IsNull($(tr).find('td.ExpirationDate input').val(), '').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ExpirationDate input').val())
        });
    }
    else {
        $('#tblWH_QualityActionsItem tbody tr').each(function () {
            if ($(this).find('td.ID input[type=checkbox]').is(':checked')) {
                lst.push({
                    ID: $(this).attr('id'),
                    PalletID: IsNull($(this).find('td.PalletID input').val(), '0'),
                    BatchNumber: IsNull($(this).find('td.BatchNumber input').val(), '0'),
                    strProductionDate: IsNull($(this).find('td.ProductionDate input').val(), '').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ProductionDate input').val()),
                    strExpirationDate: IsNull($(this).find('td.ExpirationDate input').val(), '').trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpirationDate input').val())
                });
            }
        });
    }
   
    var params = { HasRequest: _hasRequest, Items:lst };
    CallPOSTFunctionWithParameters("/api/WH_QualityActions/UpdateItem", params
        , function (pData) {
            FadePageCover(false);
            if (pData) {
                swal("Success", "Updated successfully!");
                GetItemBalance();
            }
            else {
                swal("Error", "Updating faild!");
            }
        }
        , null);
}
//#endregion








