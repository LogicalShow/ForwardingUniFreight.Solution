function WH_Adjustment_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_Adjustment_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Adjustment/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Transactions/WH_Adjustment", "div-content", function () {
        $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_Adjustment_BindTableRows(JSON.parse(pData[0]));
                //var pallets = JSON.parse(pData[2]);
                //    $('#slPallet').append("<option value='0'><--select--></option>")
                //$.each(pallets, function (i,item) {
                //    $('#slPallet').append("<option value='" + item.PalletID + "'>" + item.PalletID +"</option>")
                //});
                
               
            });
        IntializePalletAutoCompleteSearch();
        //$('#slPallet').css({ 'width': '100%' }).select2();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_Adjustment_ClearAllControls(); },
        function () { WH_Adjustment_DeleteList(); });
}
function WH_Adjustment_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_Adjustment");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pData, function (i, item) {
        AppendRowtoTable("tblWH_Adjustment",
        ("<tr ID='" + item.ID + "' ondblclick='return; WH_Adjustment_FillAllControls(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='AdjustCode'>" + item.AdjustCode + "</td>"
            + "<td class='PurchaseItemCode'>" + item.PurchaseItemCode + "</td>"
            + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
            + "<td class='PalletID'>" + item.PalletID + "</td>"
            + "<td class='PackageTypeName'>" + item.PackageTypeName + "</td>"
            + "<td class='NewQuantity'>" + item.NewQuantity + "</td>"
            + "<td class='LocationCode'>" + item.LocationCode + "</td>"
            + "<td class='CreatorUserName'>" + item.CreatorUserName + "</td>"
            + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)))  + "</td>"
            + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)))  + "</td>"
            + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)))  + "</td>"
            + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
            + "<td class='hide'><a href='#WH_AdjustmentModal' data-toggle='modal' onclick='WH_Adjustment_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblWH_Adjustment", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblWH_Adjustment>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_Adjustment_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = WH_Adjustment_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_Adjustment_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_Adjustment>tbody>tr", $("#txt-Search").val().trim());
}
function WH_Adjustment_GetWhereClause(pFilterOptions) {
    var pWhereClause = "WHERE 1=1" + "\n";
    //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "") {
            pWhereClause += "AND (" + "\n";
            pWhereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "       OR CreationDate LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "       OR PalletID LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "       OR Reason LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            pWhereClause += "    )";
        }
    }
    //search controls
    else {
        if ($("#srchCode").val().trim() != "") {
            var vals = IsNull($("#srchCode").val(), '').split(',');
            pWhereClause += " and (AdjustCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR AdjustCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchItemCode-m").val().trim() != "") {
            var vals = IsNull($("#srchItemCode-m").val(), '').split(',');
            pWhereClause += " and (PurchaseItemCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PurchaseItemCode";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchItemName-m").val().trim() != "") {
            var vals = IsNull($("#srchItemName-m").val(), '').split(',');
            pWhereClause += " and (PurchaseItemName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PurchaseItemName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
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
        if ($("#srchUnit-m").val().trim() != "") {
            var vals = IsNull($("#srchUnit-m").val(), '').split(',');
            pWhereClause += " and (PackageTypeName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR PackageTypeName";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
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
        if ($("#srchUser").val().trim() != "") {
            var vals = IsNull($("#srchUser").val(), '').split(',');
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
        if ($("#srchProduction").val().trim() != "") {
            var vals = IsNull($("#srchProduction").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ProductionDate as date), 'dd/MM/yyyy')";
                pWhereClause += " Like N'%" + vals[i] + "%'";
            }
            pWhereClause += ")";
        }
        if ($("#srchExpiration").val().trim() != "") {
            var vals = IsNull($("#srchExpiration").val(), '').split(',');
            pWhereClause += " and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR Format(Cast(ExpirationDate as date), 'dd/MM/yyyy')";
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
    }
    return pWhereClause;
}
function WH_Adjustment_ClearAllControls() {
    debugger;
    ClearAll("#WH_AdjustmentModal");
    $('#tblDetails tbody').html('');
    $('#btnSave').removeClass('hide');
    $("#cb-CheckAll").prop('checked', false);
}
function WH_Adjustment_FillAllControls(pID, pIsReceive, pInvoiceID) {
    debugger;
    $('#tblDetails tbody').html('');
    ClearAll("#WH_AdjustmentModal");
    jQuery("#WH_AdjustmentModal").modal("show");
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#hIsReceive").prop('checked', pIsReceive);
    $("#cbIsInvoiced").prop('checked', (pInvoiceID>0));
    $("#txtCode").val($(tr).find("td.Code").text());

    if ($("#cbIsInvoiced").is(':checked')) {
        $('#btnSave').addClass('hide');
    }
    else {
        $('#btnSave').removeClass('hide');
    }

    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: "where TransSourceID = " + pID + " and Direction = " + (pIsReceive?1:2)+""
    };
    CallGETFunctionWithParameters("/api/WH_Adjustment/LoadTransServices", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData.Data);
            $.each(data, function (i, item) {
                AddService();
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);

                $('#tblDetails tbody tr:eq(' + i + ')').find('td.ServiceID select').attr('onchange', '');
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.ServiceID select').val(item.ServiceID).change();
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.ServiceID select').attr('onchange', 'SetServiceData(this);');

                $('#tblDetails tbody tr:eq(' + i + ')').find('td.Cost input').val(item.ServiceCost);
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.Selling input').val(item.ServiceSelling);
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.CalcTypeName input').val(item.CalcTypeName);
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.Quantity input').val(item.Quantity);
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.CostAmount input').val(item.CostAmount);
                $('#tblDetails tbody tr:eq(' + i + ')').find('td.SellingAmount input').val(item.SellingAmount);
            });
         

        }
        , null);
    
}
function WH_Adjustment_Save() {
    debugger;
   

    if (ValidateForm("form", "WH_AdjustmentModal")) {
        FadePageCover(true);
        var details = [];
        $('#tblDetails tbody tr').each(function (i) {
            details.push({
                ItemBalanceID: IsNull($(this).attr('id'), 0),
                PurchaseItemID: IsNull($(this).find('td.PurchaseItemID').text(), 0),
                PackageTypeID: IsNull($(this).find('td.PackageTypeID').text(), 0),
                LocationID: IsNull($(this).find('td.LocationID').text(), 0),
                BatchNumber: IsNull($(this).find('td.BatchNumber').text(), ''),
                ReceiveDate: ($(this).find('td.ReceiveDate').text().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ReceiveDate').text().trim())),
                ProductionDate: ($(this).find('td.ProductionDate').text().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ProductionDate').text().trim())),
                ExpirationDate: ($(this).find('td.ExpirationDate').text().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpirationDate').text().trim())),
                OldQuantity: IsNull($(this).find('td.OldQuantity input').val(), 0),
                NewQuantity: IsNull($(this).find('td.NewQuantity input').val(), 0),
                DemandedQuantity: IsNull($(this).find('td.OldQuantity input').attr('demanded'), 0),
            });
        });
        pParametersWithValues = {
              ID: $("#hID").val()
            , PalletID: $("#slPallet").val()
            , Reason: $("#txtReason").val()
            , Details: details
        };
        CallPOSTFunctionWithParameters("/api/WH_Adjustment/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_AdjustmentModal").modal("hide");
                    WH_Adjustment_LoadingWithPaging();
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
function WH_Adjustment_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWH_Adjustment') != "")
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
            DeleteListFunction("/api/WH_Adjustment/Delete", { "pIDs": GetAllSelectedIDsAsString('tblWH_Adjustment') }, function () { WH_Adjustment_LoadingWithPaging(); });
        });
}

function Details_BindTableRows(pData) {
    debugger;
    var oldQty = 0;
    ClearAllTableRows("tblDetails");
    $.each(pData, function (i, item) {
        oldQty = Number(item.Quantity) - Number(item.PDL_DemandedQuantity);
        AppendRowtoTable("tblDetails",
            ("<tr id='"+item.ID+"'>"
                + "<td class='PurchaseItemID hide'>" + item.PurchaseItemID + "</td>"
                + "<td class='PurchaseItemCode'>" + item.PurchaseItemCode + "</td>"
                + "<td class='PurchaseItemName'>" + item.PurchaseItemName + "</td>"
                + "<td class='PackageTypeID hide'>" + item.PackageTypeID + "</td>"
                + "<td class='PackageTypeName'>" + item.PackageTypeName + "</td>"
                + "<td class='LocationID hide'>" + item.LocationID + "</td>"
                + "<td class='LocationCode'>" + item.LocationCode + "</td>"
                + "<td class='BatchNumber'>" + item.BatchNumber + "</td>"
                + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "</td>"
                + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"
                + "<td class='OldQuantity'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' quantity='" + item.Quantity + "' demanded='" + item.PDL_DemandedQuantity + "' value='" + oldQty + "' disabled/></td>"
                + "<td class='NewQuantity'><input class='form-control' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + oldQty + "'/></td>"
                + "</tr>"));
    });
}

var _details;
function LoadPalletItems() {
    _details = [];
    if (IsNull($('#slPallet').val(), '') == '') {
        swal("Sorry", "Select pallet!");
        return;
    }
    FadePageCover(true);
    pParametersWithValues = {
        pWhereClause: " PalletID = '" + $('#slPallet').val() + "' "
    };
    CallGETFunctionWithParameters("/api/WH_Adjustment/LoadPalletItems", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData.Data);
            _details = data;
            Details_BindTableRows(data);
        }
        , null);
}

function SearchRowItem() {
    debugger;
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
    if ($('#srchLoc').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.LocationCode, '').toLowerCase().includes($('#srchLoc').val().trim().toLowerCase()); });
    }
    if ($('#srchBatch').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.BatchNumber, '').toLowerCase().includes($('#srchBatch').val().trim().toLowerCase()); });
    }
    if ($('#srchRecDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return ConvertDateFormat(GetDateWithFormatMDY(row.ReceiveDate)).includes($('#srchRecDate').val().trim().toLowerCase()); });
    }
    if ($('#srchProdDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return ConvertDateFormat(GetDateWithFormatMDY(row.ProductionDate)).includes($('#srchProdDate').val().trim().toLowerCase()); });
    }
    if ($('#srchExpiDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return ConvertDateFormat(GetDateWithFormatMDY(row.ExpirationDate)).includes($('#srchExpiDate').val().trim().toLowerCase()); });
    }
    
    Details_BindTableRows(rowItems);
}

function IntializePalletAutoCompleteSearch() {
    $("#slPallet").css({ 'width': '100%' }).select2({
        dropdownParent: $('#WH_AdjustmentModal'),
        minimumInputLength: 2,
        tags: false,
        ajax: {
            url: strServerURL + "/api/WH_Adjustment/LoadPallets",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            cache: false,
            // data: { term: term },
            data: function (params) {
                var whereClause = `PalletID like N'%${params.term}%'`;
                var query = {
                    pWhereClause: whereClause
                    //type: 'public'
                }

                return query;
            },
            processResults: function (data) {

                var d = JSON.parse(data.Data);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.PalletID,
                            id: item.PalletID,
                            value: item.PalletID
                        };
                    })
                };
            }
        }
    });
}