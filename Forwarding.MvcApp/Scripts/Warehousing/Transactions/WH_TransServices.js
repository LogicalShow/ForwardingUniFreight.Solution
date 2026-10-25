var _hasRequest=false;
function WH_TransServices_Initialize() {
    debugger;
    if (['FPL', 'EF'].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;

    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "WH_TransServices_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_TransServices/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1 ";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pHasRequest:_hasRequest }
    LoadView("/Warehousing/Transactions/WH_TransServices", "div-content", function () {
        if (_hasRequest) {
            $('.TableHead1').removeClass('hide');
            $('.TableHead2').addClass('hide');
            $('.srchControls').removeClass('hide');
            $('#div-search-controls').addClass('hide');
        }
        else {
            $('.TableHead1').addClass('hide');
            $('.TableHead2').removeClass('hide');
            $('.srchControls').addClass('hide');
            $('#div-search-controls').removeClass('hide');
        }
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
              
                WH_TransServices_BindTableRows(JSON.parse(pData[0]));
                FillListFromObject(null, 2, "< --Select -->", "slService", pData[2], function (pServices) {
                    $.each(pServices, function (i, pService) {
                        $('#slService option[value=' + pService.ID + ']').attr('cost', pService.Cost).attr('selling', pService.Selling).attr('calc-type-name', pService.CalcTypeName);
                    })
                });

                if (_hasRequest) {
                    $('#slService').attr('multiple');
                    $("#slCustomer").html($("#hReadySlCustomers").html());
                    FillListFromObject(pLoggedUser.WarehouseID, 2, "<--Select-->", "slWarehouse", pData[3], null);
                }
                else {

                }

            });
        $('#slService,#slOrder').css({ 'width': '100%' }).select2();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { WH_TransServices_ClearAllControls(); },
        function () { WH_TransServices_DeleteList(); });
}
function WH_TransServices_BindTableRows(pData) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblWH_TransServices");
    if (_hasRequest) {
        $.each(pData, function (i, item) {
            AppendRowtoTable("tblWH_TransServices",
                ("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='TransCode'>" + item.TransCode + "</td>"
                    + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                    + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                    + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                    + "<td class='OwnerName'>" + item.OwnerName + "</td>"
                    + "<td class='ServiceName'>" + item.ServiceName + "</td>"
                    + "<td class='Quantity'>" + item.Quantity + "</td>"
                    + "<td class='CreatorUserName'>" + item.CreatorUserName + "</td>"
                    + "<td class='TransServiceDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TransServiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TransServiceDate))) + "</td>"
                    + "<td class='hide'><a href='#WH_TransServicesModal' data-toggle='modal' onclick='WH_TransServices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        });
        ApplyPermissions();
        BindAllCheckboxonTable("tblWH_TransServices", "ID");
        CheckAllCheckbox("ID");
    }
    else {
        $.each(pData, function (i, item) {
            AppendRowtoTable("tblWH_TransServices",
                ("<tr ID='" + item.ID + "' ondblclick='WH_TransServices_FillAllControls(" + item.ID + ", " + item.IsReceive + ", " + item.InvoiceID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='TransDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TransDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TransDate))) + "</td>"
                    + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                    + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                    + "<td class='hide'><a href='#WH_TransServicesModal' data-toggle='modal' onclick='WH_TransServices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        });
        //ApplyPermissions();
        //BindAllCheckboxonTable("tblWH_TransServices", "ID");
        //CheckAllCheckbox("ID");
        HighlightText("#tblWH_TransServices>tbody>tr", $("#txt-Search").val().trim());
        if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
            swal(strSorry, strDeleteFailMessage);
            showDeleteFailMessage = false;
        }
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function WH_TransServices_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = WH_TransServices_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pHasRequest: _hasRequest }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { WH_TransServices_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblWH_TransServices>tbody>tr", $("#txt-Search").val().trim());
}
function WH_TransServices_GetWhereClause(pFilterOptions) {
    var whereClause = "WHERE 1=1" + "\n";
    //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "") {
            whereClause += "AND (" + "\n";
            whereClause += "       Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            whereClause += "       OR CustomerName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            whereClause += "       OR WarehouseName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
            whereClause += "    )";
        }
    }
    //search controls
    else {
        if ($("#srchOrder").val().trim() != "") {
            var vals = IsNull($("#srchOrder").val(), '').split(',');
            whereClause += " and (TransCode ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR TransCode";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchOrderDate").val().trim() != "") {
            var vals = IsNull($("#srchOrderDate").val(), '').split(',');
            whereClause += " and (Format(Cast(CreationDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR Format(Cast(CreationDate as date), 'dd/MM/yyyy')";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchWarehouse").val().trim() != "") {
            var vals = IsNull($("#srchWarehouse").val(), '').split(',');
            whereClause += " and (WarehouseName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR WarehouseName";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchCustomer").val().trim() != "") {
            var vals = IsNull($("#srchCustomer").val(), '').split(',');
            whereClause += " and (CustomerName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR CustomerName";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchOwner").val().trim() != "") {
            var vals = IsNull($("#srchOwner").val(), '').split(',');
            whereClause += " and (OwnerName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR OwnerName";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchService").val().trim() != "") {
            var vals = IsNull($("#srchService").val(), '').split(',');
            whereClause += " and (ServiceName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR ServiceName";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchQty").val().trim() != "") {
            var vals = IsNull($("#srchQty").val(), '').split(',');
            whereClause += " and (Quantity ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR Quantity";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchCreator").val().trim() != "") {
            var vals = IsNull($("#srchCreator").val(), '').split(',');
            whereClause += " and (CreatorUserName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR CreatorUserName";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
        if ($("#srchCreation").val().trim() != "") {
            var vals = IsNull($("#srchCreation").val(), '').split(',');
            whereClause += " and (Format(Cast(TransServiceDate as date), 'dd/MM/yyyy') ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    whereClause += " OR Format(Cast(TransServiceDate as date), 'dd/MM/yyyy')";
                whereClause += " Like N'%" + vals[i] + "%'";
            }
            whereClause += ")";
        }
    
    }
    return whereClause;
}
function WH_TransServices_ClearAllControls() {
    debugger;
    if (_hasRequest) {
        $('#WH_ExtraServicesModal').removeClass('hide');
        $('#WH_TransServicesModal').addClass('hide');
        ClearAll("#WH_ExtraServicesModal");
        $('#btnSaveNew').removeClass('hide');
        $("#txtDate").val(getTodaysDateInddMMyyyyFormat());

    }
    else {
        $('#WH_ExtraServicesModal').addClass('hide');
        $('#WH_TransServicesModal').removeClass('hide');
        ClearAll("#WH_TransServicesModal");
        $('#btnSave').removeClass('hide');
    }
   
    $("#cb-CheckAll").prop('checked', false);
}
function WH_TransServices_FillAllControls(pID, pIsReceive, pInvoiceID) {
    debugger;
    WH_TransServices_ClearAllControls();
    $('#tblServices tbody').html('');
    ClearAll("#WH_TransServicesModal");
    jQuery("#WH_TransServicesModal").modal("show");
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
    CallGETFunctionWithParameters("/api/WH_TransServices/LoadTransServices", pParametersWithValues
        , function (pData) {
            FadePageCover(false);
            var data = JSON.parse(pData.Data);
            $.each(data, function (i, item) {
                AddService();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ID input').val(item.ID);

                $('#tblServices tbody tr:eq(' + i + ')').find('td.ServiceID select').attr('onchange', '');
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ServiceID select').val(item.ServiceID).change();
                $('#tblServices tbody tr:eq(' + i + ')').find('td.ServiceID select').attr('onchange', 'SetServiceData(this);');

                $('#tblServices tbody tr:eq(' + i + ')').find('td.Cost input').val(item.ServiceCost);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.Selling input').val(item.ServiceSelling);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.CalcTypeName input').val(item.CalcTypeName);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.Quantity input').val(item.Quantity);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.CostAmount input').val(item.CostAmount);
                $('#tblServices tbody tr:eq(' + i + ')').find('td.SellingAmount input').val(item.SellingAmount);
            });
         

        }
        , null);
    
}
function WH_TransServices_Save() {
    debugger;
   

    if (ValidateForm("form", "WH_TransServicesModal")) {
        FadePageCover(true);
        pParametersWithValues = {
               ID: $("#hID").val()
            , IsReceive: $("#hIsReceive").prop('checked')
            , HasRequest: _hasRequest
        };
        var services = [];
        $('#tblServices tbody tr').each(function () {
            services.push({
                ID: IsNull($(this).find('td.ID input').val(), 0),
                TransSourceID: IsNull($("#hID").val(), 0),
                Direction: $("#hIsReceive").prop('checked')?1:2,
                ServiceID: IsNull($(this).find('td.ServiceID select').val(), 0),
                ServiceCost: IsNull($(this).find('td.Cost input').val(), 0),
                ServiceSelling: IsNull($(this).find('td.Selling input').val(), 0),
                Quantity: IsNull($(this).find('td.Quantity input').val(), 0),
            });
        });
        pParametersWithValues['Details'] = services;
        CallPOSTFunctionWithParameters("/api/WH_TransServices/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                        jQuery("#WH_TransServicesModal").modal("hide");
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
function WH_TransServices_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblWH_TransServices') != "")
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
            DeleteListFunction("/api/WH_TransServices/Delete", { "pIDs": GetAllSelectedIDsAsString('tblWH_TransServices') }, function () { WH_TransServices_LoadingWithPaging(); });
        });
}

function AddService() {
    AppendRowtoTable("tblServices",
        (`<tr>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='ServiceID'><select data-required="false" class="form-control"  onchange='SetServiceData(this);'>`+ $('#slService').html() + `</select></td>           
            <td class='Cost'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" readonly/></td>
            <td class='Selling'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" readonly/></td>
            <td class='CalcTypeName'><input class="form-control" type="text" readonly/></td>
            <td class='Quantity'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" onkeyup='SetServiceTotal(this);'/></td>
            <td class='CostAmount'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" readonly/></td>
            <td class='SellingAmount'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" readonly/></td>
			<td><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>
        </tr>`));
    $('#tblServices td.ServiceID select').css({'width':'100%'}).select2();
}

function SetServiceData(elm) {
    $(elm).closest('tr').find('td.Cost input').val($(elm).find('option:selected').attr('cost'));
    $(elm).closest('tr').find('td.Selling input').val($(elm).find('option:selected').attr('selling'));
    $(elm).closest('tr').find('td.CalcTypeName input').val($(elm).find('option:selected').attr('calc-type-name'));
}

function SetServiceTotal(elm) {
    var costAmount = Number($(elm).closest('tr').find('td.Cost input').val()) * Number($(elm).val());
    var sellingAmount = Number($(elm).closest('tr').find('td.Selling input').val()) * Number($(elm).val());
    $(elm).closest('tr').find('td.CostAmount input').val(costAmount.toFixed(2));
    $(elm).closest('tr').find('td.SellingAmount input').val(sellingAmount.toFixed(2));
}

function LoadOwners(pMode, pSelectClient, pSelectOwner) {
    debugger;
    if (!pSelectOwner)
        pSelectOwner = 'slOwner';
    $('#' + pSelectOwner + '').val(-1).change();

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
            var ownerId = $('#' + pSelectOwner + '').attr('val');
            FillListFromObject(ownerId, 2, "<--Select-->", pSelectOwner, pData, null);
        }
        , null, false);
}

function LoadOrders() {
    $('#slOrder').html('<option value="0-0">select</option>');
    var warehouseId = Number($('#slWarehouse').val());
    var customerId = Number($('#slCustomer').val());
    var ownerId = Number($('#slOwner').val());

    if (warehouseId == 0 || customerId == 0 || ownerId==0)
        return;

    var whereClause = `where WarehouseID=${warehouseId} and CustomerID=${customerId} and OwnerID=${ownerId}`;
   
    FadePageCover(true);

    CallGETFunctionWithParameters("/api/WH_TransServices/LoadOrders"
        , { pWhereClause: whereClause }
        , function (pData) {
            FadePageCover(false);
            var orders = JSON.parse(pData);
            $.each(orders, function (i, item) {
                $('#slOrder').append('<option value="' + item.Name + '">' + item.Code+'</option>');
            });
        }
        , null);
}

function AddExtraService() {
    AppendRowtoTable("tblExtraServices",
        (`<tr>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='ServiceID'><select data-required="false" class="form-control" onchange='SetServiceData(this);' multiple>`+ $('#slService').html() + `</select></td>           
            <td class='Quantity'><input class="form-control" type="text" onfocus="ChkValIsDecimal(this);" onkeyup='SetServiceTotal(this);'/></td>
            <td class='Orders'><select data-required="false" class="form-control" onchange='SetServiceData(this);' multiple>`+ $('#slOrder').html() + `</select></td>           
			<td><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);'></span></td>
        </tr>`));

    $('#tblExtraServices td.ServiceID select,#tblExtraServices td.Orders select').css({ 'width': '100%' }).select2();
}

function WH_ExtraServices_Save() {
    debugger;


    if (ValidateForm("form", "WH_ExtraServicesModal")) {
        FadePageCover(true);
        pParametersWithValues = {
            HasRequest: _hasRequest
            ,Notes: $("#txtNotes").val()
        };
        var services = [];
        $('#tblExtraServices tbody tr').each(function (i) {
            var srvIds = IsNull($(this).find('td.ServiceID select').val(), 0).toString().split(',');
            var ordIds = IsNull($(this).find('td.Orders select').val(), 0).toString().split(',');
            var qty = IsNull($(this).find('td.Quantity input').val(), 0);
            for (var i = 0; i < srvIds.length; i++) {
                for (var y = 0; y < ordIds.length; y++) {
                    services.push({
                        ServiceID: srvIds[i],
                        TransSourceID: ordIds[y].split('-')[1],
                        Direction: ordIds[y].split('-')[0]=='r' ? 1 : 2,
                        Quantity: qty,
                    });
                }
            }
        });
        pParametersWithValues['Details'] = services;
        CallPOSTFunctionWithParameters("/api/WH_TransServices/Save", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                if (pData.Result) {
                    swal("Success", "Saved Successfully!");
                    jQuery("#WH_TransServicesModal").modal("hide");
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