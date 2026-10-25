var maxReceiveDetailsSerialIDInTable = 0; //used for when adding new row then make td control names unique
function ApplySelectListSearch() {
    debugger;
    $("#slFilterWarehouse").css({ "width": "100%" }).select2();
    $("#slFilterWarehouse").trigger("change");
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").trigger("change");
    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").trigger("change");
    
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slWarehouse").trigger("change");
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slCustomer").trigger("change");
    $("#slOwner").css({ "width": "100%" }).select2();
    $("#slOwner").trigger("change");
    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#slEquipment").trigger("change");
    $("#slReceiveDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsPurchaseItem").trigger("change");
    $("#slReceiveDetailsArea").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsArea").trigger("change");
    $("#slReceiveDetailsLocation").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsLocation").trigger("change");
    
    $("div[tabindex='-1']").removeAttr('tabindex');
}
function ApplySelectListSearch_OnlyChange() {
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slOwner").css({ "width": "100%" }).select2();
    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsPurchaseItem").css({ "width": "100%" }).select2();
    $("#slWarehouse").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsArea").css({ "width": "100%" }).select2();
    $("#slReceiveDetailsLocation").css({ "width": "100%" }).select2();

    $("#slFilterWarehouse").css({ "width": "100%" }).select2();
    $("#slFilterStatus").css({ "width": "100%" }).select2();
    $("#slFilterCustomer").css({ "width": "100%" }).select2();
    $("#slFilterOwner").css({ "width": "100%" }).select2();
    $("#slFilterPurchaseItem").css({ "width": "100%" }).select2();
    
    $("#srchStatus").css({ "width": "100%" }).select2();
    if (_hasRequest && !_isRequest) {
        $("#srchStatus option[value=5]").remove();
        $("#srchStatus option[value=40]").remove();
    }
}

var _details = [];
var _hideExpected = 'hide';
var _hideActual = '';
var _isRequest = false;
var _hasRequest=false;
var _autoPallet=false;
var _disableExpected = 'disabled';
//var _stockUnits = [];
var _itemsStockUnits = [];
var _defaultLocation = {AreaID:0, AreaCode:'', LocID:0, LocCode:''};
function Receive_Initialize(pCallback) {
    debugger;

    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    if (["FPL"].includes(pDefaults.UnEditableCompanyName))
        _autoPallet = true;

    if (glbCallingControl == 'WH_InboundRequest') {
        _hideActual = 'hide';
        _hideExpected = '';
        _isRequest = true;
        _disableExpected = '';
    }
    else {
         _hideExpected = 'hide';
         _hideActual = '';
         _isRequest = false;
         _disableExpected = 'disabled';
        // _stockUnits = [];
         _itemsStockUnits = [];
    }
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Receive_BindTableRows";
    strLoadWithPagingFunctionName = "/api/WH_Inbound/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = !_hasRequest || _isRequest ? "Where 1=1" : "Where StatusID>" + constReceiveStatusCreated + " and StatusID<" + constReceiveStatusCanceled + "";
    if (_hasRequest)
        pWhereClause += " and WarehouseID in (select WarehouseID from WH_UsersWarehouses where UserID=" + pLoggedUser.ID + ")";
    var pOrderBy = "ID DESC";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadView("/Warehousing/Transactions/WH_Inbound", "div-content"
        , function () {
            debugger;
            if ($('#hf_CanDelete').val() == 1)
                $('#btnSaveHeader').removeClass('hide');
            else
                $('#btnSaveHeader').addClass('hide');

            ApplySelectListSearch_OnlyChange();
            if (_isRequest) {
                $(".FormName").text("Inbound Request");
                $('#btnAddDetail').removeClass('hide');
                $('#tblReceiveDetails th.Expected').removeClass('hide');
                $('div.OrderUpload').removeClass('hide');
            }
            else {
                $('#ReceiveDetailsFooter').removeClass('hide');
                $('#tblReceiveDetails th.Actual').removeClass('hide');
                if (!_hasRequest)
                    $('#tblReceiveDetails .Prefix').addClass('hide');
                $('#btn-SelectColumns, #btn-PrintInbound, #btnExportTemplate, #ExcelReceiveItems, #btnImportExcel, #btn-Progress, #btn-Finalize, #btn-Cancel').addClass('hide');

                if (glbCallingControl == 'WH_Inbound') {
                    $(".FormName").text("Inbound Receiving");
                }
                else if (glbCallingControl == 'ReceiveAdmin') {
                    $(".FormName").text("Receive Admin");
                    $("#txtReason").attr("data-required", true);
                    $("#ReasonDiv").removeClass("hide");
                    $('#btnSave').removeClass('classDisableForFinalized');
                    $('div.OrderUpload').removeClass('hide');
                }
            }
            

            if (_hasRequest) {
                $('#btnGeneratePickupOrder').addClass('hide');
                $('#btn-PrintReceive').addClass('hide');
                $('#btn-AddReceiveDetails').addClass('hide');
                $('#btn-DeleteReceiveDetails').addClass('hide');
                $('#slEquipment').closest('div').addClass('hide');
                $('#txtHeaderFile').closest('div').addClass('hide');
                $('#txtHeaderInvoice').closest('div').addClass('hide');
                $('#tblReceive th.Code, #lblCode').text('Order Number');

                $('#div-search-controls').addClass('hide');
                $('#srchControls').removeClass('hide');
                
                $('.Owner').removeClass('hide');
                $('#slOwner').attr('data-required', true);
                
            }
            else {
                $('#btnAddDetail').removeClass('hide');
                $('#div-search-controls').removeClass('hide');
                $('#srchControls').addClass('hide');
                $('#btnFinalize').addClass('hide');

            if (pDefaults.UnEditableCompanyName == "GBL")
                $(".classShowForGBL").removeClass("hide");
            if (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP")
                $(".classAddSerialToPalletLbl").text("PalletID/Serial");
            if (pDefaults.UnEditableCompanyName == "NIL")
                $('#cbSerial').prop('checked', true);
            }

            if (!_isRequest && _hasRequest)
                $('#slCustomer,#slOwner').prop('disabled', true);

            if (!_isRequest)
                $('#slFilterStatus option[value=5]').remove();

            $('button').each(function () { if ($(this).attr('type') == undefined) $(this).attr('type', 'button'); });

            if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
            LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                    , function (pData) {
                        var pWarehouse = pData[2];
                        var pServices = pData[3];
                        var pPalletStatus = pData[4];
                        var pPalletClass = pData[5];

                        FillListFromObject(pLoggedUser.WarehouseID, 2, "<--Select-->", "slWarehouse", pWarehouse, function () { $('#slFilterWarehouse').html($('#slWarehouse').html()); });
                        FillListFromObject(null, 2, "< --Select-->", "slService", pServices, null);
                        FillListFromObject(null, 2, "< --Select-->", "slPalletStatus", pPalletStatus, null);
                        FillListFromObject(null, 2, "< --Select-->", "slPalletClass", pPalletClass, null);
                        $("#slCustomer, #slFilterCustomer").html($("#hReadySlCustomers").html());
      
                        ApplySelectListSearch();
                       
                        Receive_BindTableRows(JSON.parse(pData[0]));
                        
                        if (pCallback)
                            pCallback();

                    });
        }
        , function () { Receive_ClearAllControls(); }
        , function () { Receive_DeleteList(); }
    );
}
function Receive_BindTableRows(pReceive) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblReceive");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";
    var CopyText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' > <i class='fa fa-repeat' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pReceive, function (i, item) {
        AppendRowtoTable("tblReceive",
            ("<tr ID='" + item.ID + "' ondblclick='Receive_FillAllControls(" + item.ID + ");' class='" + (item.StatusID == constReceiveStatusFinalized ? "text-primary" : item.StatusID == constReceiveStatusCanceled?"text-danger": "") + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='WarehouseID hide'>" + item.WarehouseID + "</td>"
                + "<td class='WarehouseName'>" + item.WarehouseName + "</td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='OwnerName Owner hide'>" + item.OwnerName + "</td>"
                //+ "<td class='FromDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
                //+ "<td class='ToDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
                //+ "<td class='StorageLimit hide'>" + item.StorageLimit + "</td>"
                //+ "<td class='StorageUnitID hide'>" + item.StorageUnitID + "</td>"
                //+ "<td class='StorageUnitCode hide'>" + (item.StorageUnitCode == 0 ? "" : item.StorageUnitCode) + "</td>"
                //+ "<td class='IsByPallet hide'> <input type='checkbox' id='cbIsByPallet" + item.ID + "' disabled='disabled' " + (item.IsByPallet ? " checked='checked' " : "") + " /></td>"
                //+ "<td class='NumberOfPallets hide'>" + item.NumberOfPallets + "</td>"
                //+ "<td class='CurrencyID hide'>" + item.CurrencyID + "</td>"
                //+ "<td class='CurrencyCode'>" + item.CurrencyCode + "</td>"
                + "<td class='StatusID hide'>" + item.StatusID + "</td>"
                + "<td class='Status'>" + item.StatusName + "</td>"
                + "<td class='OperationID hide'>" + item.OperationID + "</td>"
                + "<td class='OperationCode hide'>" + item.OperationCode + "</td>"
                + "<td class='IsFinalized hide'> <input type='checkbox' id='cbIsFinalized" + item.ID + "' disabled='disabled' " + (item.IsFinalized ? " checked='checked' " : "") + " /></td>"
                + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + "</td>"
                + "<td class='CreatorName'>" + item.CreatorName + "</td>"
                + "<td class='ModificationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ModificationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate))) + "</td>"
                + "<td class='ModificatorName'>" + item.ModificatorName + "</td>"
                + "<td class='FinalizeDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + "</td>"
                + "<td class='FinalizeUserName'>" + item.FinalizeUserName + "</td>"
                + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"

                + "<td class='CopyOrder'><a href='javascript:void(0)' onclick='CopyOrder(" + item.ID + ");' " + CopyText + "</a></td>"
                + "<td class='Print'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
            ));

    });
    if (_hasRequest) {
        $('.Owner').removeClass('hide');
    }
    ApplyPermissions();
    BindAllCheckboxonTable("tblReceive", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblReceive>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Receive_GeneralUpload_Initialize();
}
function Receive_GeneralUpload_Initialize() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Receive";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//Receive//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Receive/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Receive";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Receive";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Receive";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}

function Receive_LoadingWithPaging(pFilterOptions) {
    debugger;
    var pWhereClause = Receive_GetWhereClause(pFilterOptions);
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "ID DESC";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pWhereClause_Warehouse: _hasRequest ? `where ID in (select WarehouseID from WH_UsersWarehouses where UserID=${pLoggedUser.ID})` : `where 1=1` }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Receive_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblReceive>tbody>tr", $("#txt-Search").val().trim());
}
function Receive_GetWhereClause(pFilterOptions) {
    debugger;
    var pWhereClause = !_hasRequest || _isRequest ? "where 1=1\n" : "Where StatusID>" + constReceiveStatusCreated + " and StatusID<" + constReceiveStatusCanceled + "\n";
    if (_hasRequest)
        pWhereClause += " and WarehouseID in (select WarehouseID from WH_UsersWarehouses where UserID=" + pLoggedUser.ID + ")";
    //filter options
    if (pFilterOptions) {
        if ($("#txt-Search").val().trim() != "")
            pWhereClause += "AND Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        if (IsNull($("#slFilterWarehouse").val(),'') != "")
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
            pWhereClause += "AND (SELECT COUNT(1) FROM WH_ReceiveDetails RD_Temp WHERE vwWH_Receive.ID=RD_Temp.ReceiveID AND RD_Temp.PurchaseItemID in (" + $("#slFilterPurchaseItem").val().toString() + ")) > 0 " + "\n";
        if ($("#txtFilterCode").val().trim() != "")
            pWhereClause += "AND CodeSerial=" + $("#txtFilterCode").val().trim() + "\n";
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
        if ($("#srchStatus").val()) {
            var vals = ("'"+GetSelect2MultiText($('#srchStatus')).replaceAll(/,/g, "','")+"'").split(',');
            pWhereClause += " and (StatusName ";
            for (var i = 0; i < vals.length; i++) {
                if (i > 0)
                    pWhereClause += " OR StatusName";
                pWhereClause += " = " + vals[i];
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
                    pWhereClause += " OR (Format(Cast(FinalizeDate as date), 'dd/MM/yyyy')";
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
    $('.ReceiveDetails').addClass('active');
    $('.ReceiveDetails').addClass('in');

    parent.strBindTableRowsFunctionName = "ReceiveDetails_BindTableRows";
}
function Receive_ClearAllControls() {
   
    debugger;


    _defaultLocation = { AreaID: 0, AreaCode: '', LocID: 0, LocCode: '' };
    $('#btn-PrintInbound').addClass('hide');
    $('button.PrintConfirmation').addClass('hide');
    $('#btnOpenReceive').addClass('hide');
    $('#btnCopyOrder').addClass('hide');
    ConfigureTabs('new');
    $("#tblReceiveDetails tbody").html("");
    $("#tblExtraServices tbody").html("");
    $('#txtTotalExpected').text();
    $('#txtTotalActual').text();
    //$("#lblReceiveMaxWeight").html("<span> : </span><span>" + 0 + "</span>");
    //$("#lblReceiveMaxVolume").html("<span> : </span><span>" + 0 + "</span>");
    ClearAll("#ReceiveModal");
    //$('#tblReceiveDetails th.Quantity, #tblReceiveDetails th.SplitQuantity, #tblReceiveDetails th.ExpirationDate, #tblReceiveDetails th.ProductionDate').addClass('hide');
    if (_isRequest) {
        $('#txtStatus').attr('val', constReceiveStatusCreated);
        $('#txtStatus').val('CREATED');
        $('#btnSave, #btnSaveAndAddNew, #btnProgress, #btnAddDetail').removeClass('hide');
    }
    if (pLoggedUser.WarehouseID > 0)
        $('#slWarehouse,#slFilterWarehouse').val(pLoggedUser.WarehouseID).change();
    $("#txtReceiveDate").val(getTodaysDateInddMMyyyyFormat());
    $(".classDisableForFinalized").removeAttr("disabled");
    ApplySelectListSearch_OnlyChange();
   
    //$("#btnSave").attr("onclick", "Receive_Save(false);");
    //$("#btnSaveAndAddNew").attr("onclick", "Receive_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
}
function Receive_FillAllControls(pID) {
    debugger;
    FadePageCover(true);
    //$("#txtNumberOfLevelsPerReceive").attr("disabled", "disabled");
    //$("#txtNumberOfTraysPerLevel").attr("disabled", "disabled");

    $('#btn-PrintReceiveSummary, #btn-PrintInbound, btn-PrintConfirmation, #btn-PrintConfirmationDetails').attr('disabled', 'disabled');

    if (_isRequest) {
        $("#btnSave, #btnSaveAndAddNew, #btnProgress, #btnAddDetail, #btnOpenReceive").addClass('hide');
        $('#btn-PrintInbound').removeClass('hide');
    }

    $('#txtTotalExpected').text();
    $('#txtTotalActual').text();
    ConfigureTabs('edit');
    ClearAll("#ReceiveModal");
    $("#tblReceiveDetails tbody").html("");
    $("#tblExtraServices tbody").html("");
    jQuery("#ReceiveModal").modal("show");
    var pParametersWithValues = {
        pHeaderID: pID
        , pIsRequest: _isRequest
        , pLoadDetails: false
    };
    CallGETFunctionWithParameters("/api/WH_Inbound/LoadHeaderWithDetails", pParametersWithValues
        , function (pData) {
            var pReceiveHeader = JSON.parse(pData[0]);
            var total = JSON.parse(pData[2]);
            //var pReceiveDetails = JSON.parse(pData[1]);
            //$.each(pReceiveDetails, function (i,item) {
            //    item['LineNo'] = i;
            //    item['ExpectedProductionDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpectedProductionDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpectedProductionDate'])) : "");
            //    item['ProductionDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ProductionDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ProductionDate'])) : item['ExpectedProductionDate']);
            //    item['ExpectedExpirationDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpectedExpirationDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpectedExpirationDate'])) : "");
            //    item['ExpirationDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpirationDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpirationDate'])) : item['ExpectedExpirationDate']);
            //});
            //_details = pReceiveDetails;

            if (pReceiveHeader.StatusName.toUpperCase() == "FINALIZED") {
                $(".classDisableForFinalized").attr("disabled", "disabled");
                $("#btnGeneratePickupOrder").attr("disabled",false)
            }
            else
                $(".classDisableForFinalized").removeAttr("disabled");

            if (_isRequest) {
                if (pReceiveHeader.StatusID == constReceiveStatusCreated)
                    $("#btnSave, #btnSaveAndAddNew, #btnProgress, #btnAddDetail").removeClass('hide');
                else if (pReceiveHeader.StatusID > constReceiveStatusCreated && pReceiveHeader.StatusID < constReceiveStatusFinalized)
                    $("#btnOpenReceive").removeClass('hide');
            }
            else {
                if (_hasRequest)
                    $("#btnFinalize").removeClass('hide');
                else
                    $('#btnFinalize').addClass('hide');
            }
         
                

            $("#hID").val(pID);
            $("#lblShown").html(": " + pReceiveHeader.Code);
            $("#txtCode").val(pReceiveHeader.Code);
            $("#txtHeaderContainerNumber").val(pReceiveHeader.ContainerNumber);
            $("#txtHeaderPO").val(pReceiveHeader.PO);
            $("#txtHeaderFile").val(pReceiveHeader.MasterFile);
            $("#txtHeaderInvoice").val(pReceiveHeader.Invoice);
            $("#slWarehouse").val(pReceiveHeader.WarehouseID == 0 ? "" : pReceiveHeader.WarehouseID);
            $("#slCustomer").val(pReceiveHeader.CustomerID == 0 ? "" : pReceiveHeader.CustomerID);
            $("#slOwner").attr('val', pReceiveHeader.OwnerID == 0 ? "" : pReceiveHeader.OwnerID);
            LoadOwners('Edit');
            $("#slEquipment").val(pReceiveHeader.EquipmentID == 0 || pReceiveHeader.EquipmentID == undefined ? "" : pReceiveHeader.EquipmentID);
            $("#txtReceiveDate").val(Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReceiveHeader.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pReceiveHeader.ReceiveDate)));
            $("#txtStatus").attr('val',pReceiveHeader.StatusID);
            $("#txtStatus").val(pReceiveHeader.StatusName);
            if (pReceiveHeader.OperationCode == 0)
                $("#slOperation").html("<option value=''></option>");
            else
                $("#slOperation").html("<option value=" + pReceiveHeader.OperationID + ">" + pReceiveHeader.OperationCode + "</option>");
            $("#cbIsFinalized").prop("checked", pReceiveHeader.IsFinalized);
            $("#txtNotes").val(pReceiveHeader.Notes == 0 ? "" : pReceiveHeader.Notes);
            $("#txtReason").val(pReceiveHeader.Reason == 0 ? "" : pReceiveHeader.Reason);
            $("#txtHeaderContainerNumber").val(pReceiveHeader.ContainerNumber == 0 ? "" : pReceiveHeader.ContainerNumber);

            LoadAreas('Edit');
            //ReceiveDetails_BindTableRows(pReceiveDetails);
            //$("#btnSave").attr("onclick", "Receive_Save(false);");
            //$("#btnSaveAndAddNew").attr("onclick", "Receive_Save(true);");
            ApplySelectListSearch_OnlyChange();
            $('#btn-PrintReceiveSummary, #btn-PrintInbound, btn-PrintConfirmation, #btn-PrintConfirmationDetails').removeAttr('disabled');
            $('#btnCopyOrder').removeClass('hide');
            FadePageCover(false);

            LoadDetailsWithPaging(pID);
            $('#txtExpectedQty').val(total.ExpectedQuantity);
            $('#txtQty').val(total.Quantity);
        }
        , null);

    if (!$('#tabServices').hasClass('hide'))
        LoadServices(pID);
}
function ReceiveDetails_GetWhereClause() {
  
    var pWhereClause = "where ReceiveID=" + $('#hID').val();
    return pWhereClause;
}
function LoadDetailsWithPaging() {
    _details = [];
    var pWhereClause = ReceiveDetails_GetWhereClause();
    var pPageSize = _isRequest?9999: $('#select-page-size-details').val();
    var pPageNumber = ($("#div-Pager-details li.active a").text() == "" ? 1 : $("#div-Pager-details li.active a").text());
    var pOrderBy = "PurchaseItemCode";
    var pControllerParameters = { pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy, pIsRequest: _isRequest }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager-details", "select-page-size-details", "spn-first-page-row-details", "spn-last-page-row-details", "spn-total-count-details", "div-Text-Total-details", "/api/WH_Inbound/LoadDetailsWithPaging", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {
        AfterLoadDetails(JSON.parse(pData[0]));
    });
}
function AfterLoadDetails(pReceiveDetails) {
    $.each(pReceiveDetails, function (i, item) {
        item['LineNo'] = i;
        item['ExpectedProductionDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpectedProductionDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpectedProductionDate'])) : "");
        item['ProductionDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ProductionDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ProductionDate'])) : item['ExpectedProductionDate']);
        item['ExpectedExpirationDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpectedExpirationDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpectedExpirationDate'])) : "");
        item['ExpirationDate'] = (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item['ExpirationDate'])) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item['ExpirationDate'])) : item['ExpectedExpirationDate']);
    });
    _details = pReceiveDetails;
    ReceiveDetails_BindTableRows(pReceiveDetails);
}
//pReleaseDate: ($("#txtOperationReleaseDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtOperationReleaseDate").val().trim())),
function Receive_Save(pSaveAndNew, pRelease, pSaveMasterOnly) {
    debugger;

    //if (!isValidDate($("#txtFromDate").val().trim(), 1) || !isValidDate($("#txtToDate").val().trim(), 1)) {
    //    swal(strSorry, "Please, Enter Start-End dates.");
    //    FadePageCover(false);
    //}
    //if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != ""
    //    && Date.prototype.compareDates(ConvertDateFormat($("#txtFromDate").val().trim()), ConvertDateFormat($("#txtToDate").val().trim())) < 0) {
    //    FadePageCover(false);
    //    swal("Sorry", "Please, check dates.");
    //}
    //else
    $('#tblReceiveDetails thead tr:eq(0) input').each(function () {
        if (($(this).is('input[type=text]') && $(this).val().trim() != '') || ($(this).is('input[type=checkbox]') && $(this).is(':checked'))) {
            $('#tblReceiveDetails thead tr:eq(0) input[type=text]').val('');
            $('#tblReceiveDetails thead tr:eq(0) input[type=checkbox]').prop('checked',false);
            SearchRowItem();
            return false;
        }
    });
    FadePageCover(true);
    if (ValidateForm("form", "ReceiveModal")) {

        var isValidDetail = true;
        var hasMissing = false;
        var hasActualQty = false;
        var GenerateOrderByMissing = false;
        var details = [];
        var palletIDs = [];
        $('#tblReceiveDetails tbody tr').each(function () {
            var purItem = $(this).find('td.PurchaseItemID select option:selected');
            details.push({
                ID: $(this).find('td.ID input').val(),
                PurchaseItemID: $(purItem).val(),
                PurchaseItemCode: $(purItem).text(),
                RD_PackageTypeID: $(this).find('td.PackageTypeID select option:selected').val(),
                RD_PackageTypeCode: $(this).find('td.PackageTypeID select option:selected').text(),
                ExpectedQuantity: $(this).find('td.ExpectedQuantity input').val(),
                Quantity: $(this).find('td.Quantity input').val(),
                SplitQuantity: $(this).find('td.SplitQuantity input').val(),
                ExpectedProductionDate: ($(this).find('td.ExpectedProductionDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpectedProductionDate input').val())),
                ProductionDate: ($(this).find('td.ProductionDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ProductionDate input').val())),
                ExpectedExpirationDate: ($(this).find('td.ExpectedExpirationDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpectedExpirationDate input').val())),
                ExpirationDate: ($(this).find('td.ExpirationDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(this).find('td.ExpirationDate input').val())),
                LocationID: _isRequest ? _defaultLocation.LocID:$(this).find('td.LocationID select option:selected').val(),
                BatchNumber: $(this).find('td.BatchNumber input').val(),
                PalletID: $(this).find('td.PalletID input').val(),
                PalletStatusID: $(this).find('td.PalletStatusID select option:selected').val(),
                PalletClassID: $(this).find('td.PalletClassID select option:selected').val(),
                RD_IsFinalized: $(this).find('td.RD_IsFinalized input').is(':checked') && $(this).find('td.RD_IsFinalized input').is(':disabled'),
                LotNo: $(this).find('td.LotNo input').val(),
            });

            //if (!_hasRequest) {
            //    (details[details.length - 1][''] =;
            //}

            if (!(details[details.length - 1].PurchaseItemID > 0)) {
                swal("Sorry", "Product Is Mandatory");
                isValidDetail = false;
                return;
            }
            if (!(details[details.length - 1].RD_PackageTypeID > 0)) {
                swal("Sorry", "Unit Is Mandatory");
                isValidDetail = false;
                return;
            }
            if (!(details[details.length - 1].ExpectedQuantity > 0)) {
                swal("Sorry", "Expected Quantity Is Mandatory");
                isValidDetail = false;
                return;
            }
            if (!_isRequest) {
                //if (_hasRequest && $(purItem).attr('BlindInbound') == 0 && Number(details[details.length - 1].Quantity) > Number(details[details.length - 1].ExpectedQuantity)) {
                //    swal("Sorry", "Product (" + $(purItem).text() + ") Not Allowed To Inbound More Than Expected Quantity");
                //    isValidDetail = false;
                //    return;
                //}
                //if ($("#hID").val() > 0 && Number(details[details.length - 1].Quantity) > 0 && !(details[details.length - 1].LocationID > 0)) {
                //    swal("Sorry", "Location Is Mandatory");
                //    isValidDetail = false;
                //    return;
                //}
                //if (_hasRequest && $("#hID").val() > 0 && Number(details[details.length - 1].Quantity) > 0 && IsNull(details[details.length - 1].PalletID,'') == '') {
                //    swal("Sorry", "Pallet Is Mandatory");
                //    isValidDetail = false;
                //    return;
                //}
                //if (_hasRequest && Number(details[details.length - 1].Quantity) == 0 && details[details.length - 1].LocationID > 0 && IsNull(details[details.length - 1].PalletID,'').trim()!='') {
                //    swal("Sorry", "Product (" + $(purItem).text() + ") Actual Quantity Is Mandatory");
                //    isValidDetail = false;
                //    return;
                //}
                //if (_hasRequest && $(purItem).attr('ByExpireDate') == 1 && details[details.length - 1].Quantity>0 && details[details.length - 1].ExpirationDate == '01/01/1900') {
                //    swal("Sorry", "Product (" + $(purItem).text() + ") Expiration Date Is Mandatory");
                //    isValidDetail = false;
                //    return;
                //}
                //if (_hasRequest && $(purItem).attr('ByExpireDate') == 1 && details[details.length - 1].Quantity > 0 && details[details.length - 1].ProductionDate == '01/01/1900') {
                //    swal("Sorry", "Product (" + $(purItem).text() + ") Production Date Is Mandatory");
                //    isValidDetail = false;
                //    return;
                //}
                ////if ($(purItem).attr('ByLotNo') == 1 && details[details.length - 1].BatchNumber == '') {
                ////    swal("Sorry", "Product (" + $(purItem).text() + ") Batch No Is Mandatory");
                ////    isValidDetail = false;
                ////    return;
                ////}
                ////if ($(purItem).attr('BySerialNo') == 1 && details[details.length - 1].Serial == '') {
                ////    swal("Sorry", "Product (" + $(purItem).text() + ") Serial No Is Mandatory");
                ////    isValidDetail = false;
                ////    return;
                ////}

                //var missing = Number(details[details.length - 1].ExpectedQuantity) - (Number(details[details.length - 1].Quantity) + Number(details[details.length - 1].SplitQuantity));
                //details[details.length - 1]['Notes'] = missing > 0 ? "missing:" + missing : "";
                ////if (missing > 0)
                ////    hasMissing = true;

                //if (details[details.length - 1].PalletID != '' && !details[details.length - 1].RD_IsFinalized)
                //    palletIDs.push("'" + details[details.length - 1].PalletID + "'");

                if (details[details.length - 1].Quantity > 0)
                    hasActualQty = true;
            }

        });

        if (!isValidDetail) {
            FadePageCover(false);
            return;
        }

        //if (!_isRequest && !hasActualQty && _hasRequest) {
        //    swal("Sorry", "Actual Quantity Is Mandatory");
        //    FadePageCover(false);
        //    return;
        //}
        if (_isRequest && Number($("#txtHeaderFile").val().trim()) == 0)//not transfered from another warehouse
        {
            for (var i = 0; i < details.length; i++) {
                for (var y = i + 1; y < details.length; y++) {
                    if (details[i].PurchaseItemID == details[y].PurchaseItemID
                        && details[i].RD_PackageTypeID == details[y].RD_PackageTypeID
                        && details[i].ExpectedProductionDate == details[y].ExpectedProductionDate
                        && details[i].ExpectedExpirationDate == details[y].ExpectedExpirationDate
                        && details[i].BatchNumber == details[y].BatchNumber
                    ) {
                        isValidDetail = false;
                        swal("Sorry", "Item (" + details[i].PurchaseItemCode + ") and Unit (" + details[i].RD_PackageTypeCode+") can't be repeated");
                        break;
                    }
                }
                if (!isValidDetail)
                    break;
            }
        }
        else {
            for (var i = 0; i < details.length; i++) {
                for (var y = i + 1; y < details.length; y++) {
                    if (details[i].PalletID && details[i].PalletID == details[y].PalletID && details[i].LocationID != details[y].LocationID) {
                        isValidDetail = false;
                        swal("Sorry", "Pallet ID " + details[i].PalletID + " Can't Repeated In Diffirent Locations");
                        break;
                    }
                }
                if (!isValidDetail)
                    break;
            }
        }
     

        if (!isValidDetail) {
            FadePageCover(false);
            return;
        }

        if (palletIDs.length > 0) {
            isValidDetail = ValidatePallets(palletIDs.toString());
        }

        if (!isValidDetail) {
            FadePageCover(false);
            return;
        }

        pParametersWithValues = {
            ID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , WarehouseID: $("#slWarehouse").val() > 0 ? $("#slWarehouse").val() : "0"
            , CustomerID: $("#slCustomer").val() > 0 ?  $("#slCustomer").val(): "0"
            , OwnerID: $("#slOwner").val() > 0 ?  $("#slOwner").val(): "0"
            , EquipmentID: $("#slEquipment").val() > 0 ?$("#slEquipment").val(): "0"
            , ReceiveDate: ($("#txtReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtReceiveDate").val().trim()))
            , ETD: "01/01/1900" //($("#txtETD").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtETD").val().trim()))
            , ETA: "01/01/1900" //($("#txtETA").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtETA").val().trim()))
            , ArrivalDate: "01/01/1900" //($("#txtArrivalDate").val().trim() == "" ? "0" : PadDateWithZeroes($("#txtArrivalDate").val().trim()))
            , StatusID: pSaveMasterOnly ? $('#txtStatus').attr('val') : _isRequest && !pRelease ? constReceiveStatusCreated : hasActualQty ? constReceiveStatusPutaway : constReceiveStatusInProgress //case of check for Location in details
            , IsFinalized: $("#cbIsFinalized").is(":checked")
            , FinalizeDate: "01/01/1900"
            , Notes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
            , Reason: $("#txtReason").val().trim() == "" ? "0" : $("#txtReason").val().trim()
            , ContainerNumber: $("#txtHeaderContainerNumber").val().trim() == "" ? "0" : $("#txtHeaderContainerNumber").val().trim().toUpperCase()
            , PO: $("#txtHeaderPO").val().trim() == "" ? "0" : $("#txtHeaderPO").val().trim().toUpperCase()
            , MasterFile: $("#txtHeaderFile").val().trim() == "" ? "0" : $("#txtHeaderFile").val().trim().toUpperCase()
            , Invoice: $("#txtHeaderInvoice").val().trim() == "" ? "0" : $("#txtHeaderInvoice").val().trim().toUpperCase()
            , Details: details
            , GenerateOrderByMissing: GenerateOrderByMissing
            , SaveMasterOnly: (glbCallingControl == 'ReceiveAdmin' && $("#cbIsFinalized").is(":checked")) || (!_isRequest) || pSaveMasterOnly
            //, pExpireDate: ($("#txtExpireDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtExpireDate").val().trim()))
            //, pLotNo: $("#txtLotNo").val()//case of check for Location in details
        };

        if (pParametersWithValues.IsFinalized)
            pParametersWithValues.StatusID = constReceiveStatusFinalized;

        if (hasMissing) {
            FadePageCover(false);
            swal({
                title: "Order Has Missing Quantities!",
                text: "Do You Want To Generate Order By Missing?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "No, Skip",
                confirmButtonColor: "#6BDD55",
                confirmButtonText: "Yes, Generate!",
                closeOnConfirm: true
            },
                //callback function in case of confirm delete
                function (pGenerate) {
                    FadePageCover(true);
                    pParametersWithValues.GenerateOrderByMissing = pGenerate;

                    ConfirmSave(pParametersWithValues, pSaveAndNew, pSaveMasterOnly);
                });

        }
        else {
            ConfirmSave(pParametersWithValues, pSaveAndNew, pSaveMasterOnly);
        }
    }
  else //if (ValidateForm("form", "ReceiveModal"))
            FadePageCover(false);
}

function ConfirmSave(pParametersWithValues, pSaveAndNew, pSaveMasterOnly) {
    
    CallPOSTFunctionWithParameters("/api/WH_Inbound/Save", pParametersWithValues
            , function (pData) {
                if (pData[0] == "") {
                    var pReceiveHeader = JSON.parse(pData[2]);
                    //var pReceiveDetails = JSON.parse(pData[3]);
                   
                    if (pSaveAndNew) {
                        Receive_ClearAllControls();
                    }
                    else {
                        $("#hID").val(pData[1]);
                        $("#txtCode").val(pReceiveHeader.Code);
                        $("#txtStatus").attr('val', pReceiveHeader.StatusID);
                        $("#txtStatus").val(pReceiveHeader.StatusName);
                        if (_hasRequest)
                            Receive_FillAllControls(pData[1]);
                        else
                            jQuery("#ReceiveModal").modal("hide");
                        //ReceiveDetails_BindTableRows(pReceiveDetails);
                        //$("#btnSave").attr("onclick", "Receive_Save(false);");
                        //$("#btnSaveAndAddNew").attr("onclick", "Receive_Save(true);");
                    }
                    swal("Success", "Saved successfully.");
                    Receive_LoadingWithPaging();
                }
                else {
                    swal("Sorry", pData[0]);
                    FadePageCover(false);
                }
            }
            , null);
        
}
function Receive_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblReceive') != "")
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
            DeleteListFunction("/api/WH_Inbound/Delete", { "pReceiveIDs": GetAllSelectedIDsAsString('tblReceive') }, function () { Receive_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/WH_Inbound/Delete", { "pReceiveIDs": GetAllSelectedIDsAsString('tblReceive') }, function () { Receive_LoadingWithPaging(); });
}
function Receive_Finalize() {
    debugger;
    if ($("#txtStatus").val().toUpperCase() != "PUTAWAY")
        swal("Sorry", "The status must be PUTAWAY to finalize.");
    else {
        swal({
            title: "Are you sure?",
            text: "This record will be finalized.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, finalize",
            closeOnConfirm: true
        },
        //callback function in case of confirm
        function () {
            CallGETFunctionWithParameters("/api/WH_Inbound/Finalize"
            , { pFinalizedReceiveID: $("#hID").val() }
            , function (pData) {
                if (pData[0] == "") {
                    swal("Success", "Finalized successfully.");
                    $(".classDisableForFinalized").attr("disabled", "disabled");
                    $("#txtStatus").attr('val', constReceiveStatusFinalized);
                    $("#txtStatus").val("FINALIZED");
                    $("#cbIsFinalized").prop("checked", true);
                    $("#tblReceive tr[ID=" + $("#hID").val() + "] td.Status").text("FINALIZED");
                }
                else
                    swal("Sorry", pData[0]);
            }
            , null);
        });
    }
}
function Receive_Print(pOutputTo) {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save receive first.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/WH_Inbound/LoadHeaderWithDetails", { pHeaderID: $("#hID").val(), pIsRequest: false, pLoadDetails: true }
            , function (pData) {
                debugger;
                FadePageCover(false);
                var _ReturnedMessage = pData[0];

                var pHeader = JSON.parse(pData[0]);
                var pDetails = JSON.parse(pData[1]);

                if (_hasRequest) {

                    var pTablesHTML = "";

                    pTablesHTML += '                         <table id="tblPrintedReceiveDetails" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%;' + ($('#cbItemsOnly').is(':checked') ? "" : "table-layout: fixed;") + '">'; //table-hover
                    pTablesHTML += '                             <thead>';
                    pTablesHTML += '                                 <tr>';
                    pTablesHTML += '                                     <th>Product Code</th>';
                    pTablesHTML += '                                     <th>Description</th>';
                    pTablesHTML += '                                     <th>Actual Quantity</th>';
                    pTablesHTML += '                                     <th>PalletID</th>';
                    pTablesHTML += '                                     <th>Pallet Status</th>';
                    pTablesHTML += '                                     <th>Location</th>';
                    pTablesHTML += '                                     <th>Batch Number</th>';
                    pTablesHTML += '                                     <th>Production</th>';
                    pTablesHTML += '                                     <th>Expiration</th>';
                
                pTablesHTML += '                                 </tr>';
                pTablesHTML += '                             </thead>';
                pTablesHTML += '                             <tbody>';
                debugger;

                $.each(pDetails, function (i, item) {
                    pTablesHTML += '                                     <tr class="" style="font-size:95%;">';
                    pTablesHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                    pTablesHTML += '                                         <td>' + item.Quantity + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PalletStatusName == 0 ? '' : item.PalletStatusName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + '</td>';
                    pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : "") + '</td>';

                    pTablesHTML += '                                     </tr>';
                });
                pTablesHTML += '                             </tbody>';
                pTablesHTML += '                         </table>';
                $("#hExportedTable").html(pTablesHTML);
                if (pOutputTo == "Excel") {
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblPrintedReceiveDetails", "Receive");
                }
                else {
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Proof of Delivery' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Receive ' + pHeader.Code + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-4"><b>Receive Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.ReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.ReceiveDate)) : "") + '</b></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Receive Code : </b>' + pHeader.Code + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Status : </b>' + pHeader.StatusName + '</div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Customer : </b>' + pHeader.CustomerName + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Notes : </b>' + pHeader.Notes + '</div>';
                    ReportHTML += pTablesHTML;

                    ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                }
            }
                else {
                    if ($('#cbItemsOnly').is(':checked')) {
                        var Items = [];
                        $.each(pDetails, function (i, item) {
                            var itemExisted = false;
                            for (var i = 0; i < Items.length; i++) {
                                if (item.PurchaseItemCode == Items[i].PurchaseItemCode) {
                                    Items[i].Quantity += Number(item.Quantity);
                                    itemExisted = true;
                                    break;
                                }
                            }
                            if (!itemExisted) {
                                Items.push({ PurchaseItemCode: item.PurchaseItemCode, PurchaseItemName: item.PurchaseItemName, PartNumber: item.PartNumber, Quantity: item.Quantity });
                            }
                        });
                        pDetails = Items;
                    }

                    var pTablesHTML = "";

                    pTablesHTML += '                         <table id="tblPrintedReceiveDetails" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%;' + ($('#cbItemsOnly').is(':checked') ? "" : "table-layout: fixed;") + '">'; //table-hover
                    pTablesHTML += '                             <thead>';
                    pTablesHTML += '                                 <tr>';
                    pTablesHTML += '                                     <th>Prod.Code</th>';
                    pTablesHTML += '                                     <th>Prod.Name</th>';
                    if ($('#cbPartNumber').is(':checked'))
                        pTablesHTML += '                                     <th>PartNumber</th>';
                    pTablesHTML += '                                     <th>Quantity</th>';
                    if (!$('#cbItemsOnly').is(':checked')) {

                        if ($("#cbSerial").prop("checked"))
                            pTablesHTML += '                                     <th style="width:200px">Serials</th>';
                        if ($('#cbLocation').is(':checked')) {
                            pTablesHTML += '                                     <th>First Location</th>';
                            pTablesHTML += '                                     <th>Location</th>';
                        }
                        if ($("#cbStatus").prop("checked"))
                            pTablesHTML += '                                     <th>Status</th>';
                        if ($("#cbPalletID").prop("checked"))
                            pTablesHTML += '                                     <th>Pallet</th>';
                        if ($("#cbPO").prop("checked"))
                            pTablesHTML += '                                     <th>PO</th>';
                        if ($("#cbFile").prop("checked"))
                            pTablesHTML += '                                     <th>File</th>';
                        if ($("#cbInvoice").prop("checked"))
                            pTablesHTML += '                                     <th>Invoice</th>';
                        if ($("#cbContainerNumber").prop("checked"))
                            pTablesHTML += '                                     <th>Container Number</th>';
                        if ($("#cbWeight").prop("checked"))
                            pTablesHTML += '                                     <th>Weight</th>';
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

                    }
                    pTablesHTML += '                                 </tr>';
                    pTablesHTML += '                             </thead>';
                    pTablesHTML += '                             <tbody>';
                    debugger;
                    var _TotalQuantity = 0.0;
                    //var _TotalGrossWeight = 0.0;
                    //var _TotalVolume = 0.0;
                    //var _WeightUnitCode = 'KGM';
                    //var _VolumeUnitCode = 'CBM';
                    $.each(pDetails, function (i, item) {
                        _TotalQuantity += item.Quantity;
                        //var _RowQuantity = (item.Serial == 0 ? item.PickedQuantity : 1);
                        //var _RowGrossWeight = _RowQuantity * item.GrossWeight;
                        //var _RowVolume = _RowQuantity * item.Volume;
                        //_WeightUnitCode = item.WeightUnitCode;
                        //_VolumeUnitCode = item.VolumeUnitCode;
                        //_TotalQuantity += _RowQuantity;
                        //_TotalGrossWeight += _RowGrossWeight;
                        //_TotalVolume += _RowVolume;
                        pTablesHTML += '                                     <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                        if ($('#cbPartNumber').is(':checked'))
                            pTablesHTML += '                                         <td>' + (item.PartNumber == 0 ? '' : item.PartNumber) + '</td>';
                        pTablesHTML += '                                         <td class="Quantity">' + item.Quantity + '</td>';
                        if (!$('#cbItemsOnly').is(':checked')) {

                            if ($("#cbSerial").prop("checked"))
                                pTablesHTML += '                                         <td style="word-wrap:break-word;width:200px">' + (item.Serials == 0 ? '' : item.Serials) + '</td>';
                            //pTablesHTML += '                                         <td class="Quantity">' + (item.Serial == 0 ? item.PickedQuantity : '1') + '</td>';
                            if ($('#cbLocation').is(':checked')) {
                                pTablesHTML += '                                         <td>' + (item.FirstLocationCode == 0 ? '' : item.FirstLocationCode) + '</td>';
                                pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                            }
                            //pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                            if ($("#cbStatus").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.StatusName == 0 ? '' : item.StatusName) + '</td>';
                            if ($("#cbPalletID").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';

                            if ($("#cbPO").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.DetailPO == 0 ? '' : item.DetailPO) + '</td>';
                            if ($("#cbFile").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.DetailFile == 0 ? '' : item.DetailFile) + '</td>';
                            if ($("#cbInvoice").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.DetailInvoice == 0 ? '' : item.DetailInvoice) + '</td>';
                            if ($("#cbContainerNumber").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.ContainerNumber == 0 ? '' : item.ContainerNumber) + '</td>';
                            if ($("#cbWeight").prop("checked"))
                                pTablesHTML += '                                         <td>' + (item.WeightInTons ? item.WeightInTons : '') + '</td>';
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
                            //pTablesHTML += '                                         <td>' + (item.Serial == 0 ? '' : item.Serial) + '</td>';
                            //pTablesHTML += '                                         <td class="hide GrossWeight">' + _RowGrossWeight + '</td>';
                            //pTablesHTML += '                                         <td class="hide Volume">' + _RowVolume + '</td>';
                        }
                        pTablesHTML += '                                     </tr>';
                    });
                    /*********************************Summary*****************************************/
                    if (pOutputTo != "Excel") {
                        pTablesHTML += '                                     <tr class="" style="font-size:95%;">';
                        pTablesHTML += '                                         <td colspan=7>' + 'Total No of Items is ' + _TotalQuantity.toFixed(2) + '</td>';
                        pTablesHTML += '                                     </tr>';
                    }
                    /*********************************EOF Summary*****************************************/
                    pTablesHTML += '                             </tbody>';
                    pTablesHTML += '                         </table>';
                    $("#hExportedTable").html(pTablesHTML);
                    if (pOutputTo == "Excel") {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblPrintedReceiveDetails", "Receive");
                    }
                    else {
                        var ReportHTML = '';
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>' + 'Proof of Delivery' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Receive ' + pHeader.Code + '</h3></div> </br>';
                        ReportHTML += '             <div class="col-xs-4"><b>Receive Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.ReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.ReceiveDate)) : "") + '</b></div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Receive Code : </b>' + pHeader.Code + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Status : </b>' + pHeader.StatusName + '</div>';
                        if (pDefaults.UnEditableCompanyName == "EXP" && 1 == 2) {//ahmed2023-06-07
                            ReportHTML += '             <div class="col-xs-4"><b>Batch : </b>' + (pHeader.BatchNumber == 0 ? "" : pHeader.BatchNumber) + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Expiration : </b>' + pHeader.StatusName + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>ImportedBy : </b>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pHeader.ExpirationDate))) + '</div>';
                            ReportHTML += '             <div class="col-xs-4"><b>Wgt : </b>' + (pHeader.WeightInTons == 0 ? "" : pHeader.WeightInTons) + '</div>';
                        }
                        ReportHTML += '             <div class="col-xs-4"><b>Customer : </b>' + pHeader.CustomerName + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Container Number : </b>' + pHeader.ContainerNumber + '</div>';
                        ReportHTML += '             <div class="col-xs-4"><b>Equipment : </b>' + pHeader.EquipmentName + '</div>';
                        ReportHTML += '             <div class="col-xs-12"><b>Notes : </b>' + pHeader.Notes + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Bill To : </b>' + pHeader.BillToName + '</div>'; //billto
                        //ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.BillToAddress == 0 ? "" : pHeader.BillToAddress) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.BillToContactName == 0 ? "" : pHeader.BillToContactName) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.BillToContactPhones == 0 ? "" : pHeader.BillToContactPhones) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Delivered to : </b>' + (pHeader.EndUserName == 0 ? "" : pHeader.EndUserName) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Address : </b>' + (pHeader.EndUserAddress == 0 ? "" : pHeader.EndUserAddress) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact Name : </b>' + (pHeader.EndUserContactName == 0 ? "" : pHeader.EndUserContactName) + '</div>';
                        //ReportHTML += '             <div class="col-xs-12"><b>Contact No. : </b>' + (pHeader.EndUserContactPhones == 0 ? "" : pHeader.EndUserContactPhones) + '</div>';
                        //ReportHTML += '             <div class="col-xs-4"><b>Operation : </b>' + (pHeader.OperationCode == 0 ? "" : pHeader.OperationCode) + '</div>';
                        //ReportHTML += '             <div class="col-xs-4"><b>PO Number : </b>' + (pHeader.PONumber == 0 ? "" : pHeader.PONumber) + '</div>';
                        //ReportHTML += '             <div class="col-xs-4"><b>RMA No. : </b>' + (pHeader.RMANumber == 0 ? "" : pHeader.RMANumber) + '</div>';

                        ReportHTML += pTablesHTML;

                        ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-5"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                        //ReportHTML += '                         <div class="col-xs-7"><b>ID No. : &emsp;&emsp;&emsp;&nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                        ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';

                        //ReportHTML += '                         <div class="col-xs-12 text-center m-t"><b>' + '  The equipment was received in good condition and there were no scratches.   ' + '</b></div>';
                        //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  تم إستلام الأجهزة فى حالة سليمة ولا يوجد أى خدوش   ' + '</b></div>';
                        //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  رجاء الختم بخاتم الشركه بما يفيد الاستلام  ' + '</b></div>';
                        //ReportHTML += '                         <div class="col-xs-12 text-center"><b>' + '  Please seal the company with the receipt.	 ' + '</b></div>';
                        ReportHTML += '         </body>';
                        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
                        ReportHTML += '     </footer>';
                        ReportHTML += '</html>';
                }
                }
                
                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            , null);
    } //EOF else
}
function Receive_PrintSummary() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save receive first.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/WH_Inbound/LoadHeaderWithDetails", { pHeaderID: $("#hID").val(), pIsRequest: false, pLoadDetails:true }
            , function (pData) {
                FadePageCover(false);
                var _ReturnedMessage = pData[0];
                var pHeader = JSON.parse(pData[0]);
                var pDetails = JSON.parse(pData[1]);

                if (_hasRequest) {
                    var detailsDic = {};
                    $.each(pDetails, function (i, item) {
                        var key = item.PurchaseItemCode + '_' + item.PalletID + '_' + item.BatchNumber + '_' + item.ProductionDate + '_' + item.ExpirationDate;
                        if (detailsDic[key]) {
                            detailsDic[key]['ExpectedQty'] += Number(item.ExpectedQuantity);
                            detailsDic[key]['ActualQty'] += item.PalletStatusID == 1 ? Number(item.Quantity) : 0;
                            detailsDic[key]['VarianceQty'] += (Number(item.Quantity) - Number(item.ExpectedQuantity));
                            detailsDic[key]['InactiveQty'] += item.PalletStatusID == 2 ? Number(item.Quantity) : 0;
                            detailsDic[key]['DamageQty'] += item.PalletStatusID == 4 ? Number(item.Quantity) : 0;
                        }
                        else {
                            detailsDic[key] = {
                                PurchaseItemCode: item.PurchaseItemCode,
                                PurchaseItemName: item.PurchaseItemName,
                                PalletID: item.PalletID,
                                BatchNumber: item.BatchNumber,
                                ProductionDate: item.ProductionDate,
                                ExpirationDate: item.ExpirationDate,
                                ExpectedQty: Number(item.ExpectedQuantity),
                                ActualQty: Number(item.Quantity),
                                VarianceQty: Number(item.Quantity) - Number(item.ExpectedQuantity),
                                InactiveQty: item.PalletStatusID == 2 ? Number(item.Quantity):0,
                                DamageQty: item.PalletStatusID == 4 ? Number(item.Quantity) : 0,
                            };
                        }
                    });
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Summary' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Summary ' + pHeader.Code + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-3"><b>Receive Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.ReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.ReceiveDate)) : "") + '</b></div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Receive Code : </b>' + pHeader.Code + '</div>';
                    ReportHTML += '             <div class="col-xs-3"><b>Customer : </b>' + pHeader.CustomerName + '</div>';
                    if (_hasRequest) {
                        ReportHTML += '             <div class="col-xs-3"><b>Project : </b>' + pHeader.OwnerName + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>Container No : </b>' + pHeader.ContainerNumber + '</div>';
                        ReportHTML += '             <div class="col-xs-3"><b>PO : </b>' + pHeader.PO + '</div>';
                    }
                    ReportHTML += '                         <table id="tblPrintedReceiveDetails" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Product Code</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>PalletID</th>';
                    ReportHTML += '                                     <th>Batch Number</th>';
                    ReportHTML += '                                     <th>Production</th>';
                    ReportHTML += '                                     <th>Expiration</th>';
                    ReportHTML += '                                     <th>Expected Quantity</th>';
                    ReportHTML += '                                     <th>Actual Quantity</th>';
                    ReportHTML += '                                     <th>Damage Quantity</th>';
                    ReportHTML += '                                     <th>Inactive Quantity</th>';
                    ReportHTML += '                                     <th>Variance Quantity</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    $.each(detailsDic, function (i, item) {
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                        ReportHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                        ReportHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                        ReportHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                        ReportHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + '</td>';
                        ReportHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate)) : "") + '</td>';
                        ReportHTML += '                                         <td>' + item.ExpectedQty + '</td>';
                        ReportHTML += '                                         <td>' + item.ActualQty + '</td>';
                        ReportHTML += '                                         <td>' + item.DamageQty + '</td>';
                        ReportHTML += '                                         <td>' + item.InactiveQty + '</td>';
                        ReportHTML += '                                         <td>' + item.VarianceQty + '</td>';
                        ReportHTML += '                                     </tr>';
                    });
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '                         <div class="col-xs-7"><b>Received By : &nbsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Signature : </b>' + '  _______________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-7"><b>Mobile : &emsp;&emsp;&emsp;&nbsp;</b>' + '  _______________________________________	 ' + '</div>';
                    ReportHTML += '                         <div class="col-xs-5"><b>Date : &emsp;&emsp;&emsp;&emsp;</b>' + getTodaysDateInddMMyyyyFormat() + '</div>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                }
                else {
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>' + 'Summary' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '         <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>' + 'Summary ' + pHeader.Code + '</h3></div> </br>';
                    ReportHTML += '             <div class="col-xs-4"><b>Receive Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pHeader.ReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(pHeader.ReceiveDate)) : "") + '</b></div>';
                    ReportHTML += '             <div class="col-xs-4"><b>Receive Code : </b>' + pHeader.Code + '</div>';
                    ReportHTML += '             <div class="col-xs-12"><b>Customer : </b>' + pHeader.CustomerName + '</div>';
                    ReportHTML += '                         <table id="tblPrintedReceiveDetails" class="table table-striped b-t b-light text-sm table-bordered">'; //table-hover
                    ReportHTML += '                             <thead>';
                    ReportHTML += '                                 <tr>';
                    ReportHTML += '                                     <th>Item</th>';
                    ReportHTML += '                                     <th>Description</th>';
                    ReportHTML += '                                     <th>Quantity</th>';
                    ReportHTML += '                                     <th>Location</th>';
                    ReportHTML += '                                     <th>PalletID</th>';
                    if (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP")
                        ReportHTML += '                                     <th>Serial</th>';
                    ReportHTML += '                                 </tr>';
                    ReportHTML += '                             </thead>';
                    ReportHTML += '                             <tbody>';
                    debugger;
                    var _TotalQuantity = 0.0;
                    $.each(pDetails, function (i, item) {
                        _TotalQuantity += item.Quantity;
                        ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                        ReportHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                        ReportHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                        ReportHTML += '                                         <td class="Quantity">' + item.Quantity + '</td>';
                        ReportHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                        ReportHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                        if (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP")
                            ReportHTML += '                                         <td>' + (item.LotNo == 0 ? '' : item.LotNo) + '</td>'; //Serial
                        ReportHTML += '                                     </tr>';
                    });
                    /*********************************Summary*****************************************/
                    ReportHTML += '                                     <tr class="" style="font-size:95%;">';
                    ReportHTML += '                                         <td colspan=6>' + 'Total No of Items is ' + _TotalQuantity.toFixed(2) + '</td>';
                    ReportHTML += '                                     </tr>';
                    /*********************************EOF Summary*****************************************/
                    ReportHTML += '                             </tbody>';
                    ReportHTML += '                         </table>';
                    ReportHTML += '         </body>';
                    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
                    ReportHTML += '     </footer>';
                    ReportHTML += '</html>';
                }
            

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
                
            }
            , null);
    } //EOF else
}
/***************************************ReceiveDetails***************************************/
var _updateDetails = true;
function ReceiveDetails_BindTableRows(pReceiveDetails) {
    debugger;
    var totalExpected = 0;
    var totalActual = 0;
    _updateDetails = false;
    $('button.PrintConfirmation').addClass('hide');
    //$('#tblReceiveDetails th.Quantity, #tblReceiveDetails th.SplitQuantity, #tblReceiveDetails th.ExpirationDate, #tblReceiveDetails th.ProductionDate').removeClass('hide');
    if (pReceiveDetails.length == 0)
        $("#slWarehouse").removeAttr("disabled");
    else
        $("#slWarehouse").attr("disabled", "disabled");
    ClearAllTableRows("tblReceiveDetails");
    var serialControlsText = " class='btn btn-xs btn-rounded btn-info float-right btnSerial' > <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Serial") + "</span>";
    var inspectionControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' > <i class='fa fa-list' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + " Actions" + "</span>";
    $.each(pReceiveDetails, function (i, item) {
        AppendRowtoTable("tblReceiveDetails",
            ("<tr LineNo='" + item.LineNo + "' ID='" + item.ID + "' " + (!_hasRequest ? ("ondblclick='ReceiveDetails_FillControls(" + item.ID + ");'") : "") + ">"
                + "<td class='ID hide'> <input type='text' value='" + item.ID + "'></td>"
                + "<td class='ReceiveID hide'>" + item.ReceiveID + "</td>"
                + "<td class='Serial hide'>" + item.Serial + "</td>"
                + "<td class='LineNo'>" + (i+1) + "</td>"
                + "<td class='Prefix " + _hideActual + "'><button type='button' class='btn btn-sm btn-info fa fa-arrow-down' onclick='SplitItemQty(this);'></button>" + (item.Serial ?"<span class='fa fa-trash text-danger' onclick='DeleteSplit(this);'></span>":"")+"</td>"
                + "<td class='Prefix RD_IsFinalized " + _hideActual + "'><input name='RD_IsFinalized' class='' type='checkbox' " + (item.RD_IsFinalized ? "checked disabled" : "") + " value='" + item.ID + "' onchange='FinalizeChange(this);UpdateDetail(this,`RD_IsFinalized`);'/></td>"
                + "<td class='PurchaseItemID'><select data-required='false' class='form-control input-sm' onchange='SetItemUnit(this," + item.RD_PackageTypeID + ");' " + (_isRequest ? "" : "disabled") + ">" + $('#slFilterPurchaseItem').html() + "</select></td>"
                + "<td class='PurchaseItemName'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' readonly value='" + item.PurchaseItemName + "'/></td>"
                + "<td class='PackageTypeID'><select data-required='false' class='form-control input-sm' onchange='UpdateDetail(this,`PackageTypeID`);'>" + $('#slPackageType').html() + "</select></td>"
                + "<td class='ExpectedQuantity'><input class='form-control input-sm' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' onchange='UpdateDetail(this,`ExpectedQuantity`);' value='" + item.ExpectedQuantity + "' " + _disableExpected + "/></td>"
                + "<td class='Quantity " + _hideActual + "'><input class='form-control input-sm' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' onchange='UpdateDetail(this,`Quantity`);AutoSaveDetail(this,`Quantity`);' value='" + item.Quantity + "'/></td>"
                + "<td class='SplitQuantity hide'><input class='form-control input-sm' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.SplitQuantity + "'/></td>"
                + "<td class='ExpectedProductionDate " + _hideExpected + "'><input type='text' name='ExpectedProductionDate' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + item.ExpectedProductionDate + "' " + _disableExpected + "/></td>"
                + "<td class='ProductionDate " + _hideActual + "'><input type='text' name='ProductionDate' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + item.ProductionDate + "'/></td>"
                + "<td class='ExpectedExpirationDate " + _hideExpected + "'><input type='text' name='ExpectedExpirationDate' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + item.ExpectedExpirationDate + "' " + _disableExpected + "/></td>"
                + "<td class='ExpirationDate " + _hideActual + "'><input type='text' name='ExpirationDate' readonly='readonly' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' style='background-color:white; cursor:text;' class='datepicker-input form-control input-sm' data-required='false' data-date-format='dd/mm/yyyy' placeholder='Select Date' value='" + item.ExpirationDate + "'/></td>"
                + "<td class='AreaID " + _hideActual + "'><select data-required='false' class='form-control input-sm'>" + $('#slReceiveDetailsArea').html() + "</select></td>"
                + "<td class='LocationID " + _hideActual + "'><select id='LocationID_" + i +"' data-required='false' class='form-control input-sm'></select></td>"
                + "<td class='BatchNumber'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' onchange='UpdateDetail(this,`BatchNumber`);AutoSaveDetail(this,`BatchNumber`,true);' class='form-control input-sm' data-required='false' value='" + item.BatchNumber + "'/></td>"
                + "<td class='LotNo hide'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' class='form-control input-sm' data-required='false' value='" + item.LotNo + "' /></td>"
                + "<td class='PalletID " + _hideActual + "'><input type='text' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);' onchange='UpdateDetail(this,`PalletID`);AutoSaveDetail(this,`PalletID`, true);' class='form-control input-sm' data-required='false' value='" + item.PalletID + "' /></td>"
                + "<td class='PalletStatusID " + _hideActual + "'><select data-required='false' class='form-control input-sm' onchange='UpdateDetail(this,`PalletStatusID`);AutoSaveDetail(this,`PalletStatusID`);'>" + $('#slPalletStatus').html() + "</select></td>"
                + "<td class='PalletClassID " + _hideActual + "'><select data-required='false' class='form-control input-sm' onchange='UpdateDetail(this,`PalletClassID`);AutoSaveDetail(this,`PalletClassID`);'>" + $('#slPalletClass').html() + "</select></td>"
                + "<td class='CreatorName " + _hideActual + "'>" + item.CreatorName+"</td>"
                + "<td class='CreationDate " + _hideActual + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) > 0 ?GetFullDateTime_DD_MM_YY_LastMile(item.CreationDate) : "")+"</td>"
                + "<td class='ModificatorName " + _hideActual + "'>" + item.ModificatorName + "</td>"
                + "<td class='ModificationDate " + _hideActual + "'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ModificationDate)) > 0 ? GetFullDateTime_DD_MM_YY_LastMile(item.ModificationDate) : "") + "</td>"
                + "<td class='" + ($('#txtStatus').attr('val') > constReceiveStatusCreated ? "hide" : "") + "'><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);ReSerialReceiveDetailsTable();'></span></td>"
                + "<td class='SerialQty hide'><input class='form-control input-sm' type='text' onfocus='CheckValIsDecimal(this);' onkeypress='CheckValIsDecimal(this);' value='" + item.SerialQty + "'/></td>"
                + "<td class='BarCode hide'>" + (item.BarCode == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PackageTypeID hide'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeID) + "</td>"
                + "<td class='PackageTypeName hide'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='FirstLocationCode hide'>" + (item.FirstLocationCode == 0 ? "" : item.FirstLocationCode) + "</td>"
                + "<td class='LocationCode hide'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                + "<td class='ReceiveDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                + "<td class='StatusID hide'>" + item.StatusID + "</td>"
                + "<td class='Status hide'>" + item.StatusName + "</td>"
                + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                + "<td class='ByExpireDate hide'>" + item.ByExpireDate + "</td>"
                + "<td class='BySerialNo hide'>" + item.BySerialNo + "</td>"
                + "<td class='ByLotNo hide'>" + item.ByLotNo + "</td>"
                + "<td class='ByVehicle hide'>" + item.ByVehicle + "</td>"
                + "<td class='OperationVehicleID hide'>" + item.OperationVehicleID + "</td>"
                + "<td class='ImportedBy hide'>" + (item.ImportedBy == 0 ? "" : item.ImportedBy) + "</td>"
                + "<td class='PO hide'>" + (item.DetailPO == 0 ? "" : item.DetailPO) + "</td>"
                + "<td class='File hide'>" + (item.DetailFile == 0 ? "" : item.DetailFile) + "</td>"
                + "<td class='Invoice hide'>" + (item.DetailInvoice == 0 ? "" : item.DetailInvoice) + "</td>"
                + "<td class='ContainerNumber hide'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>"
                + "<td class='IsDefected hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDefected == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='DefectionReason hide'>" + (item.DefectionReason == 0 ? "" : item.DefectionReason) + "</td>"
                + "<td class='WeightInTons hide'>" + (item.WeightInTons == 0 ? "" : item.WeightInTons) + "</td>"
                + "<td class='Extra1 hide'>" + (item.Extra1 == 0 ? "" : item.Extra1) + "</td>"
                + "<td class='Extra2 hide'>" + (item.Extra2 == 0 ? "" : item.Extra2) + "</td>"
                + "<td class='Extra3 hide'>" + (item.Extra3 == 0 ? "" : item.Extra3) + "</td>"
                + "<td class='Extra4 hide'>" + (item.Extra4 == 0 ? "" : item.Extra4) + "</td>"
                + "<td class='Extra5 hide'>" + (item.Extra5 == 0 ? "" : item.Extra5) + "</td>"
                + "<td class='Extra6 hide'>" + (item.Extra6 == 0 ? "" : item.Extra6) + "</td>"
                + "<td class='Extra7 hide'>" + (item.Extra7 == 0 ? "" : item.Extra7) + "</td>"
                + "<td class='Extra8 hide'>" + (item.Extra8 == 0 ? "" : item.Extra8) + "</td>"
                + "<td class='Extra9 hide'>" + (item.Extra9 == 0 ? "" : item.Extra9) + "</td>"
 
                + "<td class='SerialAction  " + _hideActual + "'>"
                + "<a href='javascript:void(0)' onclick='ReceiveDetailsSerial_FillModal(this, " + item.ID + ");' " + (!_isRequest && item.BySerialNo ? "" : "disabled")+" " + serialControlsText + "</a>"
            + "</td>"

                + "</tr>"));

        

        totalExpected += Number(item.ExpectedQuantity);
        totalActual += Number(item.Quantity);

        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').val(item.PurchaseItemID).change();
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').attr('onchange', 'SetItemUnit(this);SetPreferredArea(this);UpdateDetail(this,`PurchaseItemID`);');
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.PurchaseItemID select').css({'width':'100%'}).select2();

        if (item.AreaID>0)
            $('#tblReceiveDetails tbody tr:eq(' + i + ') td.AreaID select').val(item.AreaID).change();
        else
            $('#tblReceiveDetails tbody tr:eq(' + i + ') td.AreaID select').val($('#slReceiveDetailsArea').val()).change();
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.AreaID select').attr('onchange', 'GetAreaLocations(this);');

        if (item.LocationID>0)
            $('#tblReceiveDetails tbody tr:eq(' + i + ') td.LocationID select').html("<option value='" + item.LocationID + "' selected>" + item.LocationCode + "</option>").change();
        else
            $('#tblReceiveDetails tbody tr:eq(' + i + ') td.LocationID select').html("<option value='" + _defaultLocation.LocID + "' selected>" + _defaultLocation.LocCode + "</option>").change();
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.LocationID select').attr('onchange', 'UpdateDetail(this,`LocationID`);AutoSaveDetail(this,`LocationID`);');
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.LocationID select').css({ 'width': '100%' }).select2();
       
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.PalletStatusID select').val(item.PalletStatusID);
        $('#tblReceiveDetails tbody tr:eq(' + i + ') td.PalletClassID select').val(item.PalletClassID);
        //$('#tblReceiveDetails tbody tr:eq(' + i + ') td.PackageTypeID select').val(item.RD_PackageTypeID).change();

        if (item.Quantity > 0)
            $('button.PrintConfirmation').removeClass('hide');

        if (item.RD_IsFinalized || $('#txtStatus').attr('val') == constReceiveStatusFinalized)
            $('#tblReceiveDetails tbody tr:eq(' + i + ') *').attr('disabled', true);
    });


    if (!_hasRequest)
        $('#tblReceiveDetails .Prefix').addClass('hide');

    $('#tblReceiveDetails input.datepicker-input').datepicker().on('changeDate', function () { $(this).datepicker('hide'); UpdateDetail(this, $(this).attr('name')); AutoSaveDetail(this, $(this).attr('name'), true); });
    if (!_hasRequest)
        $('#tblReceiveDetails .SerialAction').removeClass('hide');

    _updateDetails = true;
    $('#txtTotalExpected').text(totalExpected);
    $('#txtTotalActual').text(totalActual);
    ////ApplyPermissions();
    //if (ODPay && $("#hIsOperationDisabled").val() == false) $("#btn-DeletePayable").removeClass("hide"); else $("#btn-DeletePayable").addClass("hide");
    BindAllCheckboxonTable("tblReceiveDetails", "ID", "cb-CheckAll-ReceiveDetails");
    CheckAllCheckbox("HeaderDeleteReceiveDetailsID");
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    $('#tblReceiveDetails td input, #tblReceiveDetails td select').css({ 'width': 'auto' });
}
function ReceiveDetails_ClearAllControls() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
       
        ClearAll("#ReceiveDetailsModal");
        $("#lblReceiveDetailsShown").html($("#lblShown").html());
        $("#txtContainerNumber").val($("#txtHeaderContainerNumber").val());
        $("#txtPO").val($("#txtHeaderPO").val());
        $("#txtFile").val($("#txtHeaderFile").val());
        $("#txtInvoice").val($("#txtHeaderInvoice").val());
        $("#txtReceiveDetailsReceiveDate").val($("#txtReceiveDate").val());
        $("#btnSaveReceiveDetails").attr("onclick", "ReceiveDetails_Save(false);");
        $("#btnSaveAndAddNewReceiveDetails").attr("onclick", "ReceiveDetails_Save(true);");
        ApplySelectListSearch_OnlyChange();
        jQuery("#ReceiveDetailsModal").modal("show");
        //LoadAreas();
    }
}

function LoadAreas(pMode) {
    debugger;
    _defaultLocation = { AreaID: 0, AreaCode: '', LocID: 0, LocCode: '' };
    if(pMode == 'New')
        FadePageCover(true);
    var pParametersWithValues = {
        pRowLocationWhereClauseWithMinimalColumns: "Where TypeID=1 and IsDefault=1 and AreaID=(select ID from WH_Area where IsDefault=1 and WarehouseID=" + $("#slWarehouse").val()+")"//"WHERE WarehouseID=" + $("#slWarehouse").val() + " AND IsUsed=0"
        , pOrderBy: _hasRequest ? "TypeID, IsDefault desc, Code" : "Code"
        , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
    };
    CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAllWithMinimalColumns", pParametersWithValues
        , function (pData) {
            var pLocation = pData[0];
            var pArea = pData[1];
            FillListFromObject(null, 2, "<--Select-->", "slReceiveDetailsArea", pArea, function () {
                debugger;
               
                    var defLoc = { ID: 0, Code: '' };
                    var locs = JSON.parse(pLocation);
                    if (locs && locs.length > 0) {
                        defLoc.ID = locs[0].ID;
                        defLoc.Code = locs[0].Code;
                    }
                    var areas = JSON.parse(pArea);
                    $.each(areas, function (i, item) {
                        if (item.IsDefault) {
                            _defaultLocation = { AreaID: item.ID, AreaCode: item.Name, LocID: defLoc.ID, LocCode: defLoc.Code };
                            $('#slReceiveDetailsArea').val(item.ID);
                            return;
                        }
                    });
                
            });
            //FillListFromObject(null, 1, "<--Select-->", "slReceiveDetailsLocation", pLocation, null); //$("#slReceiveDetailsLocation").html("<option value=''><--Select--></option>");
            $("#slReceiveDetailsLocation").html("<option value=''><--Select--></option>");
           

            FadePageCover(false);
        }
        , null,false);
}
function ReceiveDetails_FillControls(pID) {
    debugger;
    if ($("#slReceiveDetailsPurchaseItem").val() != null) { //to ensure it is filled because its loaded separately for performance
        FadePageCover(true);
        ClearAll("#ReceiveDetailsModal");
        $("#lblReceiveDetailsShown").html($("#lblShown").html());

        $("#hReceiveDetailsID").val(pID);
        var tr = $("#tblReceiveDetails tr[ID='" + pID + "']");
        $("#txtReceiveDetailsBarCode").val($(tr).find("td.BarCode").text());
        $("#slReceiveDetailsPurchaseItem").val($(tr).find("td.PurchaseItemID").text());
        $("#txtReceiveDetailsQuantity").val($(tr).find("td.Quantity").text());
        $("#txtReceiveDetailsPalletID").val($(tr).find("td.PalletID").text());
        $("#txtReceiveDetailsNotes").val($(tr).find("td.Notes").text());
        $("#txtReceiveDetailsReceiveDate").val($(tr).find("td.ReceiveDate").text());
        $("#slReceiveDetailsStatus").val($(tr).find("td.StatusID").text());

        $("#txtBatchNumber").val($(tr).find("td.BatchNumber").text() == 0 ? "" : $(tr).find("td.BatchNumber").text());
        $("#txtExpirationDate").val($(tr).find("td.ExpirationDate").text() == 0 ? "" : $(tr).find("td.ExpirationDate").text());
        $("#txtImportedBy").val($(tr).find("td.ImportedBy").text() == 0 ? "" : $(tr).find("td.ImportedBy").text());
        $("#txtPO").val($(tr).find("td.PO").text() == 0 ? "" : $(tr).find("td.PO").text());
        $("#txtFile").val($(tr).find("td.File").text() == 0 ? "" : $(tr).find("td.File").text());
        $("#txtInvoice").val($(tr).find("td.Invoice").text() == 0 ? "" : $(tr).find("td.Invoice").text());
        $("#txtContainerNumber").val($(tr).find("td.ContainerNumber").text() == 0 ? "" : $(tr).find("td.ContainerNumber").text());
        $("#cbIsDefected").prop('checked', $(tr).find('td.IsDefected').find('input').attr('val'));
        $("#txtDefectionReason").val($(tr).find("td.DefectionReason").text() == 0 ? "" : $(tr).find("td.DefectionReason").text());
        $("#txtWeightInTons").val($(tr).find("td.WeightInTons").text() == 0 ? "" : $(tr).find("td.WeightInTons").text());

        $("#txtLotNo").val($(tr).find("td.LotNo").text() == 0 ? "" : $(tr).find("td.LotNo").text());
        $("#txtExpireDate").val($(tr).find("td.ExpireDate").text());

        $("#txtExtra1").val($(tr).find("td.Extra1").text() == 0 ? "" : $(tr).find("td.Extra1").text());
        $("#txtExtra2").val($(tr).find("td.Extra2").text() == 0 ? "" : $(tr).find("td.Extra2").text());
        $("#txtExtra3").val($(tr).find("td.Extra3").text() == 0 ? "" : $(tr).find("td.Extra3").text());
        $("#txtExtra4").val($(tr).find("td.Extra4").text() == 0 ? "" : $(tr).find("td.Extra4").text());
        $("#txtExtra5").val($(tr).find("td.Extra5").text() == 0 ? "" : $(tr).find("td.Extra5").text());
        $("#txtExtra6").val($(tr).find("td.Extra6").text() == 0 ? "" : $(tr).find("td.Extra6").text());
        $("#txtExtra7").val($(tr).find("td.Extra7").text() == 0 ? "" : $(tr).find("td.Extra7").text());
        $("#txtExtra8").val($(tr).find("td.Extra8").text() == 0 ? "" : $(tr).find("td.Extra8").text());
        $("#txtExtra9").val($(tr).find("td.Extra9").text() == 0 ? "" : $(tr).find("td.Extra9").text());

        //$(tr).find("td.ByLotNo").text() == true.toString() ? $("#txtLotNo").removeAttr("disabled") : $("#txtLotNo").attr("disabled", "disabled");
        $(tr).find("td.ByExpireDate").text() == true.toString() ? $("#txtExpireDate").removeAttr("disabled") : $("#txtExpireDate").attr("disabled", "disabled");

        var _LocationID = ($(tr).find("td.LocationID").text());
        var _AreaID = $(tr).find("td.AreaID").text()
        $("#hOldLocationID").val(_LocationID);

        var pParametersWithValues = {
            pRowLocationWhereClauseWithMinimalColumns: "WHERE AreaID=" + (_AreaID == "" ? 0 : _AreaID) + " AND WarehouseID=" + $("#slWarehouse").val() + (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP" || pDefaults.UnEditableCompanyName == "KADI" || pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "IST" ? "" : (" AND (IsUsed=0 OR ID=" + (_LocationID == "" ? 0 : _LocationID) + ")") + (_hasRequest?" and isnull(TypeID,0)<>2":""))
            , pOrderBy: _hasRequest ? "TypeID, IsDefault desc, Code" : "Code"
            , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAllWithMinimalColumns", pParametersWithValues
            , function (pData) {
                var pLocation = pData[0];
                var pArea = pData[1];
                FillListFromObject(_LocationID, 1, "<--Select-->", "slReceiveDetailsLocation", pLocation, function () {
                    ApplySelectListSearch_OnlyChange();
                });
                FillListFromObject(_AreaID, 2, "<--Select-->", "slReceiveDetailsArea", pArea, function () {
                    ApplySelectListSearch_OnlyChange();
                });
                FadePageCover(false);
            }
            , null);
        ApplySelectListSearch_OnlyChange();
        jQuery("#ReceiveDetailsModal").modal("show");
        if ($("#cbIsDefected").prop("checked"))
            $("#txtDefectionReason").parent().removeClass("hide");
    }
}
function ReceiveDetails_Save(pSaveAndNew) {
    debugger;
    FadePageCover(true);
    if (parseFloat($("#txtReceiveDetailsQuantity").val()) == 0) {
        swal("Sorry", "Quantity can not be 0.");
        FadePageCover(false);
    }
    else if (ValidateForm("form", "ReceiveDetailsModal")) {
        var pParametersWithValues = {
              ReceiveDetailsID: $("#hReceiveDetailsID").val() == "" ? 0 : $("#hReceiveDetailsID").val()
            , ReceiveID: $("#hID").val()
            , BarCode: $("#txtReceiveDetailsBarCode").val().trim() == "" ? 0 : $("#txtReceiveDetailsBarCode").val().trim().toUpperCase()
            , PurchaseItemID: $("#slReceiveDetailsPurchaseItem").val() == "" ? 0 : $("#slReceiveDetailsPurchaseItem").val()
            , Quantity: $("#txtReceiveDetailsQuantity").val() == "" ? 0 : $("#txtReceiveDetailsQuantity").val()
            , ExpectedQuantity: $("#txtReceiveDetailsQuantity").val() == "" ? 0 : $("#txtReceiveDetailsQuantity").val()
            , SplitQuantity: "0"
            , LocationID: $("#slReceiveDetailsLocation").val() == "" ? 0 : $("#slReceiveDetailsLocation").val()
            , PalletID: $("#txtReceiveDetailsPalletID").val().trim() == "" ? 0 : $("#txtReceiveDetailsPalletID").val().trim().toUpperCase()
            , Notes: $("#txtReceiveDetailsNotes").val().trim() == "" ? 0 : $("#txtReceiveDetailsNotes").val().trim().toUpperCase()

            , BatchNumber: $("#txtBatchNumber").val().trim() == "" ? "0" : $("#txtBatchNumber").val().trim().toUpperCase()
            , ExpirationDate: ($("#txtExpirationDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtExpirationDate").val().trim()))
            , ImportedBy: $("#txtImportedBy").val().trim() == "" ? "0" : $("#txtImportedBy").val().trim().toUpperCase()
            , PO: $("#txtPO").val().trim() == "" ? "0" : $("#txtPO").val().trim().toUpperCase()
            , File: $("#txtFile").val().trim() == "" ? "0" : $("#txtFile").val().trim().toUpperCase()
            , Invoice: $("#txtInvoice").val().trim() == "" ? "0" : $("#txtInvoice").val().trim().toUpperCase()
            , ContainerNumber: $("#txtContainerNumber").val().trim() == "" ? "0" : $("#txtContainerNumber").val().trim().toUpperCase()
            , WeightInTons: $("#txtWeightInTons").val().trim() == "" ? "0" : $("#txtWeightInTons").val().trim().toUpperCase()

            , ReceiveDate: ($("#txtReceiveDetailsReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtReceiveDetailsReceiveDate").val().trim()))
            , StatusID: $("#slReceiveDetailsLocation").val() == "" ? constReceiveDetailsStatusPending : constReceiveDetailsStatusPutaway //$("#slReceiveDetailsStatus").val() == "" ? 0 : $("#slReceiveDetailsStatus").val()
            , LotNo: $("#txtLotNo").val().trim() == "" ? 0 : $("#txtLotNo").val().trim().toUpperCase()
            , ExpireDate: ($("#txtExpireDate").val().trim() == "" ? ConvertDateFormat("01/01/1900") : ConvertDateFormat($("#txtExpireDate").val().trim()))
            , OldLocationID: $("#hOldLocationID").val() == "" ? 0 : $("#hOldLocationID").val()
            , IsDefected: $("#cbIsDefected").prop("checked")
            , DefectionReason: $("#txtDefectionReason").val() == "" || !$("#cbIsDefected").prop("checked") ? "0" : $("#txtDefectionReason").val()

            , Extra1: $("#txtExtra1").val().trim() == "" ? "0" : $("#txtExtra1").val().trim().toUpperCase()
            , Extra2: $("#txtExtra2").val().trim() == "" ? "0" : $("#txtExtra2").val().trim().toUpperCase()
            , Extra3: $("#txtExtra3").val().trim() == "" ? "0" : $("#txtExtra3").val().trim().toUpperCase()
            , Extra4: $("#txtExtra4").val().trim() == "" ? "0" : $("#txtExtra4").val().trim().toUpperCase()
            , Extra5: $("#txtExtra5").val().trim() == "" ? "0" : $("#txtExtra5").val().trim().toUpperCase()
            , Extra6: $("#txtExtra6").val().trim() == "" ? "0" : $("#txtExtra6").val().trim().toUpperCase()
            , Extra7: $("#txtExtra7").val().trim() == "" ? "0" : $("#txtExtra7").val().trim().toUpperCase()
            , Extra8: $("#txtExtra8").val().trim() == "" ? "0" : $("#txtExtra8").val().trim().toUpperCase()
            , Extra9: $("#txtExtra9").val().trim() == "" ? "0" : $("#txtExtra9").val().trim().toUpperCase()
        };
        CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Save", pParametersWithValues
            , function (pData) {
                if (pData[0]) {
                    var pReceiveHeader = JSON.parse(pData[2]);
                    $("#txtStatus").attr('val', pReceiveHeader.StatusID);
                    $("#txtStatus").val(pReceiveHeader.StatusName);
                    $("#tblReceive tr[ID=" + pReceiveHeader.ID + "] td.Status").text(pReceiveHeader.StatusName);
                    ReceiveDetails_BindTableRows(JSON.parse(pData[1]));
                    $("#slWarehouse").val(pReceiveHeader.WarehouseID);
                    if (pSaveAndNew) {
                        //$("#slReceiveDetailsLocation").html("<option value=''><--Select--></option>");
                        if ($("#slReceiveDetailsLocation").val() != "")
                            $("#slReceiveDetailsLocation option:selected").remove();
                        ClearAll("#ReceiveDetailsModal");
                        $("#txtReceiveDetailsReceiveDate").val($("#txtReceiveDate").val());
                    }
                    else
                        jQuery("#ReceiveDetailsModal").modal("hide");
                    swal("Success", "Saved successfully.");
                }
                else
                    swal("Sorry", "Saving failed, please try again.");
                FadePageCover(false);
            }
            , null);
    }
    else
        FadePageCover(false);
}
function ReceiveDetails_AddVehicle() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        var pSearchKey = $("#txtVehicleTrackingDetailsChassisNumber_Search").val().trim().toUpperCase();
        if (pSearchKey != "") {
            FadePageCover(true);
            //_ReturnedMessage = CheckExistenceInTableTd("tblVehicleTrackingDetails", "ChassisNumber", pSearchKey);
            var pParametersWithValues = {
                pReceiveID: $("#hID").val() == 0 ? "" : $("#hID").val()
                , pWarehouseID: $("#slWarehouse").val() == 0 ? "" : $("#slWarehouse").val()
                , pChassisNumber: pSearchKey
            };
            CallGETFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_AddVehicle"
                , pParametersWithValues
                , function (pData) {
                    var _ReturnedMessage = pData[0];
                    var _ReceiveDetails = JSON.parse(pData[1]); //get the first row
                    if (_ReturnedMessage == "") {
                        ReceiveDetails_BindTableRows(_ReceiveDetails);
                        $("#txtVehicleTrackingDetailsChassisNumber_Search").val("");
                        $("#txtVehicleTrackingDetailsChassisNumber_Search").focus();
                    }
                    else
                        swal("Sorry", _ReturnedMessage);
                    FadePageCover(false);
                }
                , null);
        }
    }
}
function ReceiveDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    var pReceiveDetailsIDsToDelete = GetAllSelectedIDsAsString('tblReceiveDetails');
    if (pReceiveDetailsIDsToDelete != "")
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
            CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Delete"
                , { pReceiveDetailsIDsToDelete: pReceiveDetailsIDsToDelete, pReceiveID: $("#hID").val() }
                , function (pData) {
                    if (pData[0]) {
                        var pReceiveHeader = JSON.parse(pData[2]);
                        $("#txtStatus").attr('val', pReceiveHeader.StatusID);
                        $("#txtStatus").val(pReceiveHeader.StatusName);
                        $("#tblReceive tr[ID=" + pReceiveHeader.ID + "] td.Status").text(pReceiveHeader.StatusName);
                        ReceiveDetails_BindTableRows(JSON.parse(pData[1]));
                    }
                    else
                        swal("Sorry", strDeleteFailMessage);
                    FadePageCover(false);
                });
        });
}
function ReceiveDetails_AreaChanged() {
    debugger;
    $("#slReceiveDetailsLocation").html("<option value=''><--Select--></option>");
    if ($("#slReceiveDetailsArea").val() != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pRowLocationWhereClauseWithMinimalColumns: "WHERE AreaID=" + $("#slReceiveDetailsArea").val() + " AND WarehouseID=" + $("#slWarehouse").val() + (pDefaults.UnEditableCompanyName == "NIL" || pDefaults.UnEditableCompanyName == "EXP" || pDefaults.UnEditableCompanyName == "KADI" || pDefaults.UnEditableCompanyName == "GBL" || pDefaults.UnEditableCompanyName == "IST" ? "" : (" AND (IsUsed=0 OR ID=" + ($("#hOldLocationID").val() == "" ? 0 : $("#hOldLocationID").val()) + ")") + (_hasRequest ? " and isnull(TypeID,0)<>2" : ""))
            , pOrderBy: _hasRequest ? "TypeID, IsDefault desc, Code" : "Code"
            , pWarehouseID: $("#slWarehouse").val() == "" ? 0 : $("#slWarehouse").val()
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAllWithMinimalColumns", pParametersWithValues
            , function (pData) {
                var pLocation = pData[0];
                FillListFromObject(null, 1, "<--Select-->", "slReceiveDetailsLocation", pLocation, null);
                FadePageCover(false);
            }
            , null);
    }
}
function ReceiveDetails_Export(pCalledFrom) {
    debugger;
    if (pCalledFrom == "FromFilter" && ($("#slFilterCustomer").val() == "" || $("#slFilterCustomer").val() == 0))
        swal("Sorry", "Please, select customer.");
    else if (pCalledFrom == "FromEditModal" && $("#hID").val() == "")
        swal("Sorry", "No records to export.");
    else {
        FadePageCover(true);
        var pWhereClauseExportReceiveDetails = "";
        if (pCalledFrom == "FromFilter")
            pWhereClauseExportReceiveDetails = ReceiveDetails_Export_GetWhereClause();
        else
            pWhereClauseExportReceiveDetails = "WHERE ReceiveID=" + $("#hID").val();
        var pParametersWithValues = {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClauseExportReceiveDetails: pWhereClauseExportReceiveDetails
            , pOrderBy: "ID"
        };
        CallGETFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Export"
            , pParametersWithValues
            , function (pData) {
                var _ExportedRows = JSON.parse(pData[0]);
                //ExportToExcel(pArray, pHeader, pFileName, pExcludedColumns);
                ExportToExcel(_ExportedRows, "ReceiveCode,ProductCode,ProductName,PartNumber,Quantity,AreaName,LocationCode,PalletID,Status,ReceiveDate,Notes", "New File", null);
                FadePageCover(false);
            }
            , null);
    }
}
function ReceiveDetails_Export_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + "\n";
    if ($("#slFilterWarehouse").val() != "" && $("#slFilterWarehouse").val() != 0)
        pWhereClause += "AND WarehouseID =" + $("#slFilterWarehouse").val() + "\n";
    if ($("#slFilterCustomer").val() != "" && $("#slFilterCustomer").val() != 0)
        pWhereClause += "AND CustomerID =" + $("#slFilterCustomer").val() + "\n";
    if ($("#txtFilterCode").val().trim() != "")
        pWhereClause += "AND ReceiveCodeSerial=N'" + $("#txtFilterCode").val().trim() + "'" + "\n";
    return pWhereClause;
}
//*********************************Reading Excel Files***************************************//
function ReceiveDetails_Import() {
    debugger;
    if ($("#hID").val() == "")
        swal("Sorry", "Please, save basic data first.");
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
                if (oJS.length > 0 && oJS[0].ProductCode != undefined && oJS[0].ReceiveDate != undefined) //if (sCSV != "")
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
    let pBarCodeList = "";
    let pPurchaseItemCodeList = "";
    let pQuantityList = "";
    let pPalletIDList = "";
    let pReceiveDateList = "";
    let pLocationCodeList = "";
    let pNotesList = "";
    let pSerialList = "";

    let pBatchNumberList = "";
    let pExpirationDateList = "";
    let pImportedByList = "";
    let pWeightInTonsList = "";
    
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pBarCodeList += (pBarCodeList == "" ? (pDataRows[i].BarCode == undefined || pDataRows[i].BarCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BarCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].BarCode == undefined || pDataRows[i].BarCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BarCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pPurchaseItemCodeList += (pPurchaseItemCodeList == "" ? (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ProductCode == undefined || pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ProductCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pQuantityList += (pQuantityList == "" ? (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Quantity == undefined || pDataRows[i].Quantity.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Quantity.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pPalletIDList += (pPalletIDList == "" ? (pDataRows[i].PalletID == undefined || pDataRows[i].PalletID.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PalletID.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].PalletID == undefined || pDataRows[i].PalletID.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PalletID.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pReceiveDateList += (pReceiveDateList == "" ? (pDataRows[i].ReceiveDate == undefined || pDataRows[i].ReceiveDate.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ReceiveDate.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ReceiveDate == undefined || pDataRows[i].ReceiveDate.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ReceiveDate.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pLocationCodeList += (pLocationCodeList == "" ? (pDataRows[i].LocationCode == undefined || pDataRows[i].LocationCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].LocationCode.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].LocationCode == undefined || pDataRows[i].LocationCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].LocationCode.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pNotesList += (pNotesList == "" ? (pDataRows[i].Notes == undefined || pDataRows[i].Notes.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Notes.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Notes == undefined || pDataRows[i].Notes.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Notes.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pSerialList += (pSerialList == "" ? (pDataRows[i].Serial == undefined || pDataRows[i].Serial.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Serial.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].Serial == undefined || pDataRows[i].Serial.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Serial.replace(/[\, ]/g, ' ').toUpperCase().trim())));

        pBatchNumberList += (pBatchNumberList == "" ? (pDataRows[i].BatchNumber == undefined || pDataRows[i].BatchNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BatchNumber.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].BatchNumber == undefined || pDataRows[i].BatchNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].BatchNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pExpirationDateList += (pExpirationDateList == "" ? (pDataRows[i].ExpirationDate == undefined || pDataRows[i].ExpirationDate.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ExpirationDate.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ExpirationDate == undefined || pDataRows[i].ExpirationDate.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ExpirationDate.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pImportedByList += (pImportedByList == "" ? (pDataRows[i].ImportedBy == undefined || pDataRows[i].ImportedBy.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ImportedBy.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].ImportedBy == undefined || pDataRows[i].ImportedBy.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ImportedBy.replace(/[\, ]/g, ' ').toUpperCase().trim())));
        pWeightInTonsList += (pWeightInTonsList == "" ? (pDataRows[i].WeightInTons == undefined || pDataRows[i].WeightInTons.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].WeightInTons.replace(/[\, ]/g, ' ').toUpperCase().trim()) : ("," + (pDataRows[i].WeightInTons == undefined || pDataRows[i].WeightInTons.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].WeightInTons.replace(/[\, ]/g, ' ').toUpperCase().trim())));
    }
    var pParametersWithValues = {
        pReceiveID: $("#hID").val()
        , pBarCodeList: pBarCodeList
        , pPurchaseItemCodeList: pPurchaseItemCodeList
        , pQuantityList: pQuantityList
        , pPalletIDList: pPalletIDList
        , pReceiveDateList: pReceiveDateList
        , pLocationCodeList: pLocationCodeList
        , pNotesList: pNotesList
        , pSerialList: pSerialList

        , pBatchNumberList: pBatchNumberList
        , pExpirationDateList: pExpirationDateList
        , pImportedByList: pImportedByList
        , pWeightInTonsList: pWeightInTonsList
    };
    CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_ImportFromExcel", pParametersWithValues
        , function (pData) {
            var _ReturnedMessage = pData[0];
            if (_ReturnedMessage == "") {
                swal("Success", "Saved Successfully.");
                var pReceiveHeader = JSON.parse(pData[2]);
                $("#txtStatus").attr('val', pReceiveHeader.StatusID);
                $("#txtStatus").val(pReceiveHeader.StatusName);
                $("#tblReceive tr[ID=" + pReceiveHeader.ID + "] td.Status").text(pReceiveHeader.StatusName);
                ReceiveDetails_BindTableRows(JSON.parse(pData[1]));
                $("#slWarehouse").val(pReceiveHeader.WarehouseID);
            }
            else {
                swal("Sorry", _ReturnedMessage);
            }
            FadePageCover(false);
        }
        , null);
    $("#btnAddFromExcel").val(""); //if removed the last selected file remains till unselected
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
                + "<td class='ID'> <input " + (1 == 1 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                + "<td class='ItemSerial'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.Serial + "' /> </td>"

                + "<td class='Vehicle'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsVehicle" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.Vehicle + "' /> </td>"
                + "<td class='MotorNo'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsMotorNo" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.MotorNo + "' /> </td>"

                + "<td class='PickupDetailsLocationID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerialPickupDetailsLocationID" + item.ID + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='" + item.PickupDetailsLocationID + "' /> </td>"
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
        tr += "     <td class='ItemSerial'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerial" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='' /> </td>";

        tr += "     <td class='Vehicle'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsVehicle" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='' /> </td>";
        tr += "     <td class='MotorNo'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsMotorNo" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='' /> </td>";

        tr += "     <td class='PickupDetailsLocationID hide'> <input type='text' style='width:100%; text-transform:uppercase;' id='txtReceiveDetailsSerialPickupDetailsLocationID" + maxReceiveDetailsSerialIDInTable + "' autocomplete='off' class='form-control controlStyle text-center' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' onchange='ReceiveDetailsSerial_SetIsRowChanged(id);' data-required='false' value='0' /> </td>";
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
        ReceiveDetailsSerial_hideShow();
        $('#txtReceiveDetailsSerialQuantityRemain').val(Number($('#txtReceiveDetailsSerialQuantity').val()) - Number($('#tblReceiveDetailsSerial tbody tr').length))
        /***************************Filling row controls******************************/
        //SetDatepickerFormat();
        /***********************EOF Filling row controls******************************/
    }
}
function SaveReceiveDetailRow(pBtn, pReceiveDetailsID) {
    debugger;
    var tr = $(pBtn).closest('tr');
    pReceiveDetailsID = $(tr).attr('id');
        FadePageCover(true);
    var pParametersWithValues = {
          ReceiveDetailsID: pReceiveDetailsID > 0 ? pReceiveDetailsID:0
        , ReceiveID: $("#hID").val()
        , PurchaseItemID: $(tr).find('td.PurchaseItemID select option:selected').val()
        , RD_PackageTypeID: $(tr).find('td.PackageTypeID select option:selected').val()
        , ExpectedQuantity: $(tr).find('td.ExpectedQuantity input').val()
        , Quantity: $(tr).find('td.Quantity input').val()
        , ProductionDate: ($(tr).find('td.ProductionDate input').val() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ProductionDate input').val()))
        , ExpirationDate: ($(tr).find('td.ExpirationDate input').val() == "" ? "01/01/1900" : PadDateWithZeroes($(tr).find('td.ExpirationDate input').val()))
        , LocationID: $(tr).find('td.LocationID select option:selected').val()
        , PalletID: $(tr).find('td.PalletID input').val()
        , BatchNumber: $(tr).find('td.BatchNumber input').val()
        , PalletStatusID: $(tr).find('td.PalletStatusID select option:selected').val()
        , PalletClassID: $(tr).find('td.PalletClassID select option:selected').val()
        , ReceiveDate: ($("#txtReceiveDate").val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($("#txtReceiveDate").val().trim()))
    };
    CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Save", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var details = JSON.parse(pData[1]);
                pReceiveDetailsID = details[details.length-1].ID;
                $(pBtn).closest('tr').attr('id', pReceiveDetailsID);
                $(pBtn).closest('tr').find('td.ID input').val(pReceiveDetailsID);
                //swal("Success", "Saved successfully.");
            }
            //else
            //    swal("Sorry", "Saving failed, please try again.");
            FadePageCover(false);
        }
        , null, false);
}
function ReceiveDetailsSerial_FillModal(pBtn, pReceiveDetailsID) {
    debugger;
    var tr = $(pBtn).closest('tr');

    if (!($(tr).find("td.Quantity input").val() > 0)) {
        swal("Sorry", "Quantity must be greater than 0!");
        return;
    }
    if (!(pReceiveDetailsID>0))
    SaveReceiveDetailRow(pBtn, pReceiveDetailsID);
    pReceiveDetailsID = $(pBtn).closest('tr').attr('id');
    jQuery("#ReceiveDetailsSerialModal").modal("show");
    $("#divSerialsBtns").removeClass("hide");
    $("#hReceiveDetailsID").val(pReceiveDetailsID);
    $("#divReceiveDetailsSerial").html("");

    
    $("#lblReceiveDetailsSerialShown").html(": " + $(tr).find("td.PurchaseItemCode").text());
    //$("#txtReceiveDetailsSerialQuantity").val($(tr).find("td.Quantity").text());
    $("#txtReceiveDetailsSerialQuantity").val($(tr).find("td.Quantity input").val());
    $("#txtReceiveDetailsSerialQuantityRemain").val(Number($(tr).find("td.Quantity input").val()) - Number($(tr).find("td.SerialQty input").val()));
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Inbound/ReceiveDetailsSerial_LoadAll"
        //, { pWhereClauseReceiveDetailsSerial: "WHERE ReceiveDetailsID=" + pReceiveDetailsID + " ORDER BY Serial"}
        , { pWhereClauseReceiveDetailsSerial: "WHERE ReceiveDetailsID=" + pReceiveDetailsID + " and Serial is not null ORDER BY Serial" }
        , function (pData) {
            var pReceiveDetailsSerial = JSON.parse(pData[0]);
            $(tr).find("td.SerialQty input").val(pReceiveDetailsSerial.length);
            $("#txtReceiveDetailsSerialQuantityRemain").val(Number($(tr).find("td.Quantity input").val()) - Number($(tr).find("td.SerialQty input").val()));
            ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial);
            FadePageCover(false);
        }
        , function () {
            $(".ExpireDate").addClass("hide");
            if (pDefaults.UnEditableCompanyName != "NIL" && pDefaults.UnEditableCompanyName != "EXP")
                $(".LotNo").addClass("hide");
            $(".Vehicle").addClass("hide");
            $(".MotorNo").addClass("hide");
            $(".ItemSerial").removeClass("hide");
            $("#txtflag").val("ReceiveDetailsSerial_FillModal");
        });
}
function ReceiveDetailsSerial_GenerateDefaultSerial() {
    debugger;
    //if (GetAllSelectedIDsAsString('tblReceive') != "")
        swal({
            title: "Are you sure?",
            text: "Default serials will be created!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Generate!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            FadePageCover(true);
            $("#divReceiveDetailsSerial").html("");
            CallGETFunctionWithParameters("/api/WH_Inbound/ReceiveDetailsSerial_GenerateSerial"
            , { pReceiveDetailsIDForSerialGenerate: $("#hReceiveDetailsID").val(), pQuantity: $("#txtReceiveDetailsSerialQuantity").val() }
            , function (pData) {
                var pReceiveDetailsSerial = JSON.parse(pData[0]);
                ReceiveDetailsSerial_BindTableRows(pReceiveDetailsSerial);
                FadePageCover(false);
            }
            , null);
        });
}
function ReceiveDetailsSerial_Save() {
    debugger;
    var pSelectedIDsToSave = GetAllSelectedIDsAsStringWithNameAttr("SelectedIDsToUpdate");
    var pIsInsertList = "";
    var pSerialList = "";
    var pPickupDetailsLocationIDList = "";

    var pVehicleList = "";
    var pMotorNoList = "";
    var pFlag = $("#txtflag").val();

    //check serial unique
    var IsSerialsUnique = true;
    var tblTr = '#tblReceiveDetailsSerial tbody tr';
    var tblLenght = Number($(tblTr).length);
    for (var i = 0; i < tblLenght; i++) {
        for (var y = i+1; y < tblLenght; y++) {
            if ($('' + tblTr + ':eq(' + i + ') td.ItemSerial input').val().trim() == $('' + tblTr + ':eq(' + y + ') td.ItemSerial input').val().trim()) {
                swal("Sorry", "Serial(" + $('' + tblTr + ':eq(' + i + ') td.ItemSerial input').val().trim() + ") can't be repeated!");
                IsSerialsUnique = false;
                break;
            }
        }
        if (!IsSerialsUnique)
            break;
    }

    if (!IsSerialsUnique)
        return;

    if (pSelectedIDsToSave == "")
        swal("Sorry", "No records changed.");

    else {
        FadePageCover(true);
        var NumberOfSelectRows = pSelectedIDsToSave.split(',').length;
        for (var i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDsToSave.split(",")[i];
            pIsInsertList += ((pIsInsertList == "") ? "" : ",") + ($("#IsInsert" + currentRowID).prop("checked") ? "1" : "0");
            pSerialList += ((pSerialList == "") ? "" : ",") + ($("#txtReceiveDetailsSerial" + currentRowID).val().trim() == "" ? "0" : $("#txtReceiveDetailsSerial" + currentRowID).val().trim().toUpperCase());
            pPickupDetailsLocationIDList += ((pPickupDetailsLocationIDList == "") ? "" : ",") + ($("#txtReceiveDetailsSerialPickupDetailsLocationID" + currentRowID).val().trim() == "" ? "0" : $("#txtReceiveDetailsSerialPickupDetailsLocationID" + currentRowID).val().trim().toUpperCase());

            pVehicleList += ((pVehicleList == "") ? "" : ",") + ($("#txtReceiveDetailsVehicle" + currentRowID).val().trim() == "" ? "0" : $("#txtReceiveDetailsVehicle" + currentRowID).val().trim().toUpperCase());
            pMotorNoList += ((pMotorNoList == "") ? "" : ",") + ($("#txtReceiveDetailsMotorNo" + currentRowID).val().trim() == "" ? "0" : $("#txtReceiveDetailsMotorNo" + currentRowID).val().trim().toUpperCase());
        }
        var pParametersWithValues = {
              pReceiveID: $("#hID").val()
            , pReceiveDetailsID: $("#hReceiveDetailsID").val()
            , pSelectedIDsToSave: pSelectedIDsToSave
            , pIsInsertList: pIsInsertList
            , pSerialList: pSerialList
            , pPickupDetailsLocationIDList: pPickupDetailsLocationIDList

            , pVehicleList: pVehicleList
            , pMotorNoList: pMotorNoList
            , pFlag: pFlag
        };
        CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetailsSerial_Save", pParametersWithValues
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
function ReceiveDetailsSerial_DeleteList() {
    debugger;
    var pReceiveDetailsSerialIDsDeleted = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblReceiveDetailsSerial", "Delete");
    if (pReceiveDetailsSerialIDsDeleted != "")
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
            CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetailsSerial_DeleteList"
                , {
                    pReceiveDetailsSerialIDsDeleted: pReceiveDetailsSerialIDsDeleted
                    , pReceiveDetailsID: $("#hReceiveDetailsID").val()
                    , pFlag: $("#txtflag").val()
                }
                , function (pData) {
                    var _MessageReturned = pData[0];
                    if (_MessageReturned == "")
                        swal("Success", "Deleted successfully.");
                    else {
                        swal("Sorry", strDeleteFailMessage);
                    }
                    ReceiveDetailsSerial_BindTableRows(JSON.parse(pData[1]));
                    //setTimeout(function () {
                    //    ReceiveDetailsSerial_hideShow();
                    //}, 1000);
                    ReceiveDetailsSerial_hideShow();
                    FadePageCover(false);
                    $('#txtReceiveDetailsSerialQuantityRemain').val(Number($('#txtReceiveDetailsSerialQuantity').val()) - Number($('#tblReceiveDetailsSerial tbody tr').length))
                });
        });
}
function ReceiveDetailsSerial_hideShow() {
    if ($("#txtflag").val() == "ReceiveDetailsSerial_FillModal") {
        $(".ExpireDate").addClass("hide");
        if (pDefaults.UnEditableCompanyName != "NIL" && pDefaults.UnEditableCompanyName != "EXP")
            $(".LotNo").addClass("hide");
        $(".Vehicle").addClass("hide");
        $(".MotorNo").addClass("hide");
    }
    else if ($("#txtflag").val() == "ReceiveDetailsVehicle_FillModal") {
        $(".ExpireDate").addClass("hide");
        if (pDefaults.UnEditableCompanyName != "NIL" && pDefaults.UnEditableCompanyName != "EXP")
            $(".LotNo").addClass("hide");
        $(".ItemSerial").addClass("hide");
    }
}
function ReceiveDetailsSerial_SetIsRowChanged(pControlID) {
    debugger;
    var ChangedRowID = $("#" + pControlID).parent().parent().attr("ID");
    $("#SelectedIDsToUpdate" + ChangedRowID).prop("checked", true);
}

//*********************************Upload Excel***************************************//
function UploadExcelFile() {
    debugger;
    if (!($('#hID').val() > 0)) {
        swal("Sorry", "Save Header First");
        $('#btnImportExcel').prop('disabled', false);
        return;
    }
    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#ExcelReceiveItems").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            data.append("pID",$("#hID").val())
            FadePageCover(true);
            $.ajax({
                url: '/api/WH_Inbound/UploadExcel?pIsRequest=' + (_isRequest) + '',
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
                                text: "Upload done successfully!",
                                showCancelButton: false,
                                confirmButtonColor: "#65bd77",
                                confirmButtonText: "OK",
                                closeOnConfirm: true
                            }, function () {
                                Receive_FillAllControls($("#hID").val());
                                if (!_hasRequest)
                                    Receive_GetAvailableUsers();

                                //swal({
                                //    title: "Warning",
                                //    text: result.MissingForeignKeys,
                                //    showCancelButton: false,
                                //    confirmButtonColor: "#F6AE00",
                                //    confirmButtonText: "OK",
                                //    closeOnConfirm: true
                                //}, () => { })
                            });
                        }
                        else if (result.exception != "")
                            swal("Sorry", "File Uploading failed .. " + result.exception);
                        else if (result.MissingFields != "")
                            swal("Sorry", "File Uploading failed .. " + result.MissingFields);

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
function Receive_GetAvailableUsers() {
    debugger;
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "sendEmailAfterUpload();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receive_GetAvailableUsers();");
}
//*********************************EOF Upload Excel***************************************//
function AddRemoveColumns() {
    debugger;
    jQuery("#ModalSelectColumns").modal("show");
}

function IsDefectedChanged() {
    debugger;
    if ($("#cbIsDefected").prop("checked"))
        $("#txtDefectionReason").parent().removeClass("hide");
    else
        $("#txtDefectionReason").parent().addClass("hide");
}

function GeneratePickupOrder() {
    debugger;

    swal({
        title: "Are you sure?",
        text: "Pickup-Order will be generated!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Generate!",
        closeOnConfirm: true
    },
        //callback function in case of confirm delete
        function () {

            let GeneratePickupDTO = {
                PickupID: $("#hID").val()
            }
            CallPOSTFunctionWithParameters("/api/WH_Inbound/GeneratePickup", GeneratePickupDTO, function (pData) {
                debugger;
                let InsertedPickupCode = pData[0];
                let ExceptionMessage = pData[1];
                if (ExceptionMessage != "")
                    swal("Error", ExceptionMessage);
                else
                    swal("Success", InsertedPickupCode + " is inserted successfully");
            });

        });
    
}
function SetDefaultPalletStatus(pIndex) {
    $('#tblReceiveDetails tbody tr:eq(' + pIndex + ') td.PalletStatusID select option:eq(1)').attr('selected', 'selected');
}
function AddDetail(pIndex) {

    if (!($('#slWarehouse').val() > 0)) {
        swal("Sorry", "Select Warehouse");
        return;
    }
    if (!($('#slCustomer').val() > 0)) {
        swal("Sorry", "Select Customer");
        return;
    }
    if ($('#slOwner option[value!=""]').length>0 && !($('#slOwner').val() > 0)) {
        swal("Sorry", "Select Project");
        return;
    }
    var html = `<tr ID='0' LineNo='` + _details.length +`'>
            <td class='Delete hide'><input type="checkbox"/></td>
            <td class='Serial hide'></td>
            <td class='LineNo'></td>
            <td class='Prefix `+ _hideActual + `'><button type='button'  class='btn btn-sm btn-info fa fa-arrow-down' onclick='SplitItemQty(this);'></button><span class='fa fa-trash text-danger' onclick='DeleteSplit(this);'></span></td>
            <td class='RD_IsFinalized Prefix `+ _hideActual + `'><input name="RD_IsFinalized" class="" type="checkbox" value="0" onchange='FinalizeChange(this);UpdateDetail(this,"RD_IsFinalized");'/></td>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='PurchaseItemID'><select data-required="false" class="form-control" onchange="SetItemUnit(this);SetPreferredArea(this);">`+ $('#slFilterPurchaseItem').html() + `</select></td>           
            <td class='PurchaseItemName'><input type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" data-required="false" readonly/></td>         
            <td class='PackageTypeID'><select data-required="false" class="form-control" onchange='UpdateDetail(this,"PackageTypeID");'></select></td>         
            <td class='ExpectedQuantity'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);" onchange='UpdateDetail(this,"ExpectedQuantity");' `+ _disableExpected + `/></td>
            <td class='Quantity `+ _hideActual + `'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);"  onchange='UpdateDetail(this,"Quantity");AutoSaveDetail(this,"Quantity");'/></td>
            <td class='SplitQuantity hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);"/></td>
            <td class='SerialQty hide'><input class="form-control" type="text" onfocus="CheckValIsDecimal(this);" onkeypress="CheckValIsDecimal(this);"/></td>
            <td class='ExpectedProductionDate `+ _hideExpected +`'><input type="text" name="ExpectedProductionDate" readonly="readonly" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;" class="datepicker-input form-control input-sm" data-required="false" data-date-format="dd/mm/yyyy" placeholder="Select Date" `+ _disableExpected + `/></td>
            <td class='ProductionDate `+ _hideActual + `'><input type="text" name="ProductionDate" readonly="readonly" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;" class="datepicker-input form-control input-sm" data-required="false" data-date-format="dd/mm/yyyy" placeholder="Select Date" /></td>
            <td class='ExpectedExpirationDate `+ _hideExpected +`'><input type="text" name="ExpectedExpirationDate" readonly="readonly" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;" class="datepicker-input form-control input-sm" data-required="false" data-date-format="dd/mm/yyyy" placeholder="Select Date" `+ _disableExpected + `/></td>
            <td class='ExpirationDate `+ _hideActual + `'><input type="text" name="ExpirationDate" readonly="readonly" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" style="background-color:white; cursor:text;" class="datepicker-input form-control input-sm" data-required="false" data-date-format="dd/mm/yyyy" placeholder="Select Date" /></td>
            <td class='AreaID `+ _hideActual + `'><select data-required="false" class="form-control" onchange="GetAreaLocations(this);">` + $('#slReceiveDetailsArea').html() + `</select></td>         
            <td class='LocationID `+ _hideActual + `'><select id='LocationID_` + _details.length +`' data-required="false" class="form-control"></select></td>         
            <td class='BatchNumber'><input type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange='UpdateDetail(this,"BatchNumber");AutoSaveDetail(this,"BatchNumber", true);' class="form-control input-sm" data-required="false" /></td>         
            <td class='LotNo hide'><input type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" class="form-control input-sm" data-required="false" /></td>         
            <td class='PalletID `+ _hideActual + `'><input type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange='UpdateDetail(this,"PalletID");AutoSaveDetail(this,"PalletID", true);' class="form-control input-sm" data-required="false" /></td>         
            <td class='PalletStatusID `+ _hideActual + `'><select data-required="false" class="form-control" onchange='UpdateDetail(this,"PalletStatusID");AutoSaveDetail(this,"PalletStatusID");'>` + $('#slPalletStatus').html() + `</select></td>         
            <td class='PalletClassID `+ _hideActual + `'><select data-required="false" class="form-control" onchange='UpdateDetail(this,"PalletClassID");AutoSaveDetail(this,"PalletClassID");'>` + $('#slPalletClass').html() + `</select></td>         
            <td class='CreatorName `+ _hideActual + `'>` + pLoggedUser.Name + `</td>         
            <td class='CreationDate `+ _hideActual + `'>` + getTodaysDateInyyyyMMddhhmmFormat() +`</td>    
            <td class='ModificatorName `+ _hideActual + `'>` + pLoggedUser.Name + `</td>         
            <td class='ModificationDate `+ _hideActual + `'>` + getTodaysDateInyyyyMMddhhmmFormat() +`</td>    

<td class='SerialAction  `+ _hideActual + `'>
               <a href='javascript:void(0)' onclick='ReceiveDetailsSerial_FillModal(this,0);' disabled class='btn btn-xs btn-rounded btn-info float-right btnSerial'> <i class='fa fa-list-ol' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>` + TranslateString("Serial") + `</span> </a>
            </td>
<td class='`+ (!_hasRequest || _isRequest ? "" : "hide") +`'><span class='fa fa-trash text-danger' onclick='DeleteTableRow(this);ReSerialReceiveDetailsTable();'></span></td>
        </tr>`;
    if (pIndex >= 0) {
        $('#tblReceiveDetails tbody tr').eq(pIndex).after(html);
    }
    else {
        AppendRowtoTable("tblReceiveDetails", (html));
        SetDefaultPalletStatus(($('#tblReceiveDetails tbody tr').length - 1));
        ReSerialReceiveDetailsTable();
    }
    if (!_hasRequest)
        $('#tblReceiveDetails .Prefix').addClass('hide');
    $('#tblReceiveDetails td.PurchaseItemID select').css({ 'width': '100%' }).select2();
    $('#tblReceiveDetails td.LocationID select').css({ 'width': '100%' }).select2();
    $('#tblReceiveDetails input.datepicker-input').datepicker().on('changeDate', function () { $(this).datepicker('hide'); UpdateDetail(this, $(this).attr('name')); AutoSaveDetail(this, $(this).attr('name'), true); });
}
function SplitItemQty(elm) {
    debugger;
    var tr = $(elm).closest('tr');
    var index = $(tr).index();
    var newIndex = Number(index) + 1;
    var expected = Number($(tr).find('td.ExpectedQuantity input').val());
    var actual = Number($(tr).find('td.Quantity input').val()) + Number($(tr).find('td.SplitQuantity input').val());
    if (actual > 0 && actual < expected) {

        FadePageCover(true);
      
        var diff = expected - actual;
        var itemId = $(tr).find('td.PurchaseItemID select').val();
        var itemCode = $(tr).find('td.PurchaseItemID select option:selected').text();
        var itemName = $(tr).find('td.PurchaseItemName input').val();
        var stockUnitId = $(tr).find('td.PackageTypeID select').val();
        var classId = $(tr).find('td.PalletClassID select').val();
        var stockUnitName = $(tr).find('td.PackageTypeID select option:selected').text();
        var batchNumber = $(tr).find('td.BatchNumber input').val();
        var expectedExpirationDate = $(tr).find('td.ExpectedExpirationDate input').val();
        var expectedProductionDate = $(tr).find('td.ExpectedProductionDate input').val();
        var expirationDate = $(tr).find('td.ExpirationDate input').val();
        var productionDate = $(tr).find('td.ProductionDate input').val();
        var locId = $(tr).find('td.LocationID select').val();
        var locCode = $(tr).find('td.LocationID select option:selected').text();
        var id = $(tr).attr('id');
        var serial = $(tr).find('td.Serial').text();
        serial = serial ? serial : id;
        AddDetail(index);

        //new
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.Serial').text(serial);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.PurchaseItemID select').prop('disabled', true);
        $('#tblReceiveDetails td.PurchaseItemID select').attr('onchange', 'SetItemUnit(this);');
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.PurchaseItemID select').val(itemId).change();
        $('#tblReceiveDetails td.PurchaseItemID select').attr('onchange', 'SetItemUnit(this);SetPreferredArea(this);UpdateDetail(this,"PurchaseItemID");');

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.PurchaseItemName input').val(itemName);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.PackageTypeID select').val(stockUnitId);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.BatchNumber input').val(batchNumber);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.ExpectedExpirationDate input').val(expectedExpirationDate);
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.ExpectedProductionDate input').val(expectedProductionDate);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.ExpirationDate input').val(expirationDate);
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.ProductionDate input').val(productionDate);

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.ExpectedQuantity input').val(diff);
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.Quantity input').val('');
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.SplitQuantity input').val('');

        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.AreaID select').val(_defaultLocation.AreaID);//.change();
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.LocationID select').html('<option value="' + locId + '">' + locCode + '</option>');
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.LocationID select').attr('onchange', 'UpdateDetail(this,"LocationID");AutoSaveDetail(this,"LocationID");');
        $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.PalletClassID select').val(classId);

        if ($('#tblReceiveDetails tbody tr').eq(index).find('td.SerialAction a.btnSerial').attr('disabled') != 'disabled')
            $('#tblReceiveDetails tbody tr').eq(newIndex).find('td.SerialAction a.btnSerial').removeAttr('disabled');

         //old
        $('#tblReceiveDetails tbody tr').eq(index).find('td.ExpectedQuantity input').val(actual);

        SetDefaultPalletStatus(newIndex);

        $.each(_details, function (i, item) {
            if (item['LineNo'] == $(tr).attr('LineNo')) {
                item.ExpectedQuantity = actual;
                return false;
            }
        });

        var trNew = $('#tblReceiveDetails tbody tr').eq(newIndex);
        CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Save"
            , {
                ID: $(trNew).find('td.ID input').val(),
                Serial: $(trNew).find('td.Serial').text(),
                ReceiveID:$('#hID').val(),
                PurchaseItemID: $(trNew).find('td.PurchaseItemID select option:selected').val(),
                RD_PackageTypeID: $(trNew).find('td.PackageTypeID select option:selected').val(),
                ExpectedQuantity: $(trNew).find('td.ExpectedQuantity input').val(),
                Quantity: $(trNew).find('td.Quantity input').val(),
                SplitQuantity: $(trNew).find('td.SplitQuantity input').val(),
                ReceiveDate: ($('#txtReceiveDate').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($('#txtReceiveDate').val())),
                ExpectedProductionDate: ($(trNew).find('td.ExpectedProductionDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(trNew).find('td.ExpectedProductionDate input').val())),
                ProductionDate: ($(trNew).find('td.ProductionDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(trNew).find('td.ProductionDate input').val())),
                ExpectedExpirationDate: ($(trNew).find('td.ExpectedExpirationDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(trNew).find('td.ExpectedExpirationDate input').val())),
                ExpirationDate: ($(trNew).find('td.ExpirationDate input').val().trim() == "" ? "01/01/1900" : PadDateWithZeroes($(trNew).find('td.ExpirationDate input').val())),
                LocationID: $(trNew).find('td.LocationID select option:selected').val(),
                BatchNumber: $(trNew).find('td.BatchNumber input').val(),
                PalletID: $(trNew).find('td.PalletID input').val(),
                PalletStatusID: $(trNew).find('td.PalletStatusID select option:selected').val(),
                PalletClassID: $(trNew).find('td.PalletClassID select option:selected').val(),
                RD_IsFinalized: $(trNew).find('td.RD_IsFinalized input').is(':checked') && $(trNew).find('td.RD_IsFinalized input').is(':disabled'),
                LotNo: $(trNew).find('td.LotNo input').val(),
                IsSplitLine: true,
                UpdateLineID: $(tr).attr('id'),
                UpdateLineQty: actual
            }
            , function (pData) {
                if (pData[0]) {
                    var detail = JSON.parse(pData[1]);
                    detail['LineNo'] = _details.length;
                    _details.push(detail);
                    $(trNew).attr('id', detail.ID);
                    $(trNew).find('td.ID input').val(detail.ID);
                    ReSerialReceiveDetailsTable();
                }
                else
                    swal("Sorry", strDeleteFailMessage);
                FadePageCover(false);
            });

      
    }
}

function DeleteSplit(elm) {
    debugger;
    FadePageCover(true);
    var serial = IsNull($(elm).closest('tr').find('td.Serial').text(),'0');
    var expQty = $(elm).closest('tr').find('td.ExpectedQuantity input').val();
    var updateId = 0;
    var updateQty = 0;
    var deleteId = 0;
    var lineNo = -1;
    if (serial!='0') {
        $('#tblReceiveDetails tbody tr').each(function () {
            if ($(this).attr('id') == serial) {
                $(this).find('td.ExpectedQuantity input').val(Number($(this).find('td.ExpectedQuantity input').val()) + Number(expQty));
                lineNo = $(elm).closest('tr').attr('LineNo');
                deleteId = $(elm).closest('tr').attr('id');
                updateId = $(this).attr('id');
                updateQty = $(this).find('td.ExpectedQuantity input').val()
                DeleteTableRow(elm);
                return false;
            }
        });
    }
    if (lineNo > -1) {
        $.each(_details, function (i, item) {
            if (item.LineNo == lineNo) {
                _details.pop(item);
                return false;
            }
        });
    }

    if (deleteId > 0) {
        CallPOSTFunctionWithParameters("/api/WH_Inbound/ReceiveDetails_Delete"
            , {
                pReceiveDetailsIDsToDelete: deleteId,
                pReceiveID: $("#hID").val(),
                IsSplitLine: true,
                UpdateLineID: updateId,
                UpdateLineQty: updateQty
            }
            , function (pData) {
                if (pData[0]) {
                    ReSerialReceiveDetailsTable();
                }
                else
                    swal("Sorry", strDeleteFailMessage);
                FadePageCover(false);
            });
    }
}
function ReSerialReceiveDetailsTable() {
    var i = 1;
    $('#tblReceiveDetails tbody tr').each(function () {
        $(this).find('td.LineNo').text(i);
        i++;
    });
}
function SetPreferredArea(elm) {
    var areaId = $(elm).find('option:selected').attr('PreferredAreaID');
    var tr = $(elm).closest('tr');
    if (areaId > 0) {
        $(tr).find('td.AreaID select').val(areaId).change();
    }
    else {
        $(tr).find('td.AreaID select').val(0).change();
    }
}
function SetItemUnit(elm, pUnitId) {
    debugger;
    var tr = $(elm).closest('tr');
    var itemId = $(elm).val();
    $(tr).find('td.PurchaseItemName input').val($(elm).find('option:selected').attr('PurchaseItemName'));

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
            stockUnits.push({ ID: u1.ToPackageTypeID, Name: u1.ToPackageTypeName});
    });
    console.log(stockUnits);
    $(tr).find('td.PackageTypeID select').html('');
    $.each(stockUnits, function (i, item) {
        $(tr).find('td.PackageTypeID select').append('<option value="' + item.ID + '">' + item.Name + '</option>');
    });
    var tr = $(elm).closest('tr');

    //set unit
    if (pUnitId > 0)
        $(tr).find('td.PackageTypeID select').val(pUnitId);
    else if (packageId > 0)
        $(tr).find('td.PackageTypeID select').val(packageId);
    else
        $(tr).find('td.PackageTypeID select').val(0);

    //active track by fields
    var byDate = Number($(elm).find('option:selected').attr('ByExpireDate'));
    if (byDate == 1)
        $(tr).find('td.ExpectedProductionDate input, td.ProductionDate input, td.ExpectedExpirationDate input, td.ExpirationDate input').prop('disabled', false);
    else
        $(tr).find('td.ExpectedProductionDate input, td.ProductionDate input, td.ExpectedExpirationDate input, td.ExpirationDate input').prop('disabled', true);

    var byBatch = Number($(elm).find('option:selected').attr('ByLotNo'));
    if (byBatch == 1)
        $(tr).find('td.BatchNumber input').prop('disabled', false);
    else
        $(tr).find('td.BatchNumber input').prop('disabled', true);
}
function GetAreaLocations(elm) {
    debugger;
    var areaId = $(elm).val();
    var tr = $(elm).closest('tr');
    var trId = $(elm).closest('tr').attr('id');
    var locSelectId = $(elm).closest('tr').find('td.LocationID select').attr('id');
    $(tr).find('td.LocationID select').html("<option value=''><--Select--></option>");
    if (areaId) {
        FadePageCover(true);
        var pParametersWithValues = {
            pRowLocationWhereClauseWithMinimalColumns: "WHERE AreaID=" + areaId + " AND WarehouseID=" + $("#slWarehouse").val() + (_hasRequest ? " and isnull(TypeID,0)<>2" : "")
            , pOrderBy: _hasRequest ? "TypeID, IsDefault desc, Code" : "Code"
            , pWarehouseID: $("#slWarehouse").val() >0 ? $("#slWarehouse").val():0
        };
        CallGETFunctionWithParameters("/api/Row/RowLocation_LoadAllWithMinimalColumns", pParametersWithValues
            , function (pData) {
                var locations = JSON.parse(pData[0]);
                var defLoc = locations.filter(function (loc) { return loc.IsDefault == true });
                var defLocId = null;
                if (defLoc && defLoc.length > 0) {
                    defLocId = defLoc[0].ID;
                    _defaultLocation.LocID= defLoc[0].ID;
                    _defaultLocation.LocCode = defLoc[0].Code;
                }
                FillListFromObject(defLocId, 1, "<--Select-->", locSelectId, pData[0], function () { $('#'+locSelectId+'').change(); });
                FadePageCover(false);
            }
            , null);
    }
}
function ClearDetailsArea() {
    $('#tblReceiveDetails tbody td.AreaID select').val(-1).change();
    $('#tblReceiveDetails tbody td.AreaID select').html('');

}
function LoadOwners(pMode, pSelectClient, pSelectOwner) {
    debugger;
    if (!pSelectOwner)
        pSelectOwner = 'slOwner';
    $('#' + pSelectOwner + '').val(-1).change();

    if (!pSelectClient)
        pSelectClient = 'slCustomer';

    var customerId = $('#' + pSelectClient + '').val();
    if (IsNull(customerId,'0')=='0')
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
            LoadItems();
            LoadStockUnits();
        }
        , null,false);
}
function LoadItems(pSelectCustomerId, pSelectOwnerId) {
    debugger;
    if (!pSelectCustomerId)
        pSelectCustomerId = 'slCustomer';
    if (!pSelectOwnerId)
        pSelectOwnerId = 'slOwner';

    $('#slReceiveDetailsPurchaseItem,#slFilterPurchaseItem,#tblReceiveDetails tbody').html('');
    var customerId = $('#' + pSelectCustomerId+'').val();
    var ownerId = $('#' + pSelectOwnerId+'').val();
    if (IsNull(customerId, '0') == '0' || IsNull(ownerId, '0') == '0')
        return;

    var whereClause = "where ClientID = " + customerId.toString() + " and OwnerID = " + ownerId.toString() + "";

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
        , { pWhereClause: whereClause }
        , function (pPurchaseItem) {
            FadePageCover(false);
            FillItemsComboBox(pPurchaseItem);
        }
        , null,false);
}
function LoadStockUnits() {
    debugger;
    $('#slPackageType').html('');
    var customerId = $('#slCustomer').val();
    var ownerId = $('#slOwner').val();
    if (!(customerId > 0)||!(ownerId > 0))
        return;

    var filter = `where ClientID=${customerId} and OwnerID=${ownerId}`;

    var whereClause = "where PurchaseItemID in (select ID from PurchaseItem " + filter + ")";
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadStockUnits"
        , { pWhereClause: whereClause }
        , function (pUnits) {
            FadePageCover(false);
            _itemsStockUnits = JSON.parse(pUnits);
            FillListFromObject(null, 2, "< --Select-->", "slPackageType", pUnits, null);
        }
        , null,false);
}

function FillItemsComboBox(pPurchaseItem) {
    FillListFromObject(null, 2, "<--Select-->", "slReceiveDetailsPurchaseItem", pPurchaseItem, function () {
        var Items = JSON.parse(pPurchaseItem);
        var elmItem;
        $.each(Items, function (i, item) {
            elmItem = $('#slReceiveDetailsPurchaseItem option[value=' + item.ID + ']');
            elmItem.text(item.Code);
            elmItem.attr('PurchaseItemName', item.Name);
            elmItem.attr('PackageTypeID', item.PackageTypeID);
            elmItem.attr('PackageTypeName', item.PackageTypeName);
            elmItem.attr('PreferredAreaID', item.PreferredAreaID);
            elmItem.attr('ByExpireDate', (item.ByExpireDate ? 1 : 0));
            elmItem.attr('ByLotNo', (item.ByLotNo ? 1 : 0));
            elmItem.attr('BySerialNo', (item.BySerialNo ? 1 : 0));
            elmItem.attr('BlindInbound', (item.BlindInbound ? 1 : 0));
        });
        $("#slFilterPurchaseItem").html($("#slReceiveDetailsPurchaseItem").html());
   
    });
}

function OpenReceive() {
    debugger;
    var pID = $('#hID').val();
    HideliChequeAlarm();
    glbCallingControl = 'WH_Inbound';
    strBindTableRowsFunctionName = "Receive_BindTableRows";
    $("#div-content").scrollTop(0);
    // Hide The Dashboard DIV Content
    $("#div-main-content").hide();
    Receive_Initialize(function () {
        Receive_FillAllControls(pID);
    });
}

function UpdateDetail(elm, prop) {
    debugger;
    if (!_updateDetails)
        return;
    var val = '';
    if ($(elm).is('input'))
        val = $(elm).val();
    else if($(elm).is('select'))
        val = $(elm).find('option:selected').val();
    else if ($(elm).is('checkbox'))
        val = $(elm).is(':checked');

    var lineNo = $(elm).closest('tr').attr('LineNo');

    $.each(_details, function (i, item) {
        if (item.LineNo == lineNo)
            item[prop] = val;
    });
}
function SearchRowItem() {
    debugger;
    if ($('#tblReceiveDetails tbody tr[id=0]').length > 0 && _isRequest) {
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
    if ($('#srchExpQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.ExpectedQuantity.toString().includes($('#srchExpQty').val()); });
    }
    if ($('#srchQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.Quantity.toString().includes($('#srchQty').val()); });
    }
    if ($('#srchDamQty').val()) {
        rowItems = rowItems.filter(function (row) { return row.SplitQuantity.toString().includes($('#srchDamQty').val()); });
    }
    if ($('#srchExpProdDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.ExpectedProductionDate.includes($('#srchExpProdDate').val().trim().toLowerCase()); });
    }
    if ($('#srchProdDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.ProductionDate.includes($('#srchProdDate').val().trim().toLowerCase()); });
    }
    if ($('#srchExpExpiDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.ExpectedExpirationDate.includes($('#srchExpExpiDate').val().trim().toLowerCase()); });
    }
    if ($('#srchExpiDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.ExpirationDate.includes($('#srchExpiDate').val().trim().toLowerCase()); });
    }
    if ($('#srchArea').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.AreaName, '').toLowerCase().includes($('#srchArea').val().trim().toLowerCase()); });
    }
    if ($('#srchLoc').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.LocationCode, '').toLowerCase().includes($('#srchLoc').val().trim().toLowerCase()); });
    }
    if ($('#srchBatch').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.BatchNumber, '').toLowerCase().includes($('#srchBatch').val().trim().toLowerCase()); });
    }
    if ($('#srchLot').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.LotNo, '').toLowerCase().includes($('#srchLot').val().trim().toLowerCase()); });
    }
    if ($('#srchPallet').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletID, '').toLowerCase().includes($('#srchPallet').val().trim().toLowerCase()); });
    }
    if ($('#srchPalletStatus').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletStatusName, '').toLowerCase().includes($('#srchPalletStatus').val().trim().toLowerCase()); });
    }
    if ($('#srchPalletClass').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.PalletClassName, '').toLowerCase().includes($('#srchPalletClass').val().trim().toLowerCase()); });
    }
    if ($('#srchCreatorName').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.CreatorName, '').toLowerCase().includes($('#srchCreatorName').val().trim().toLowerCase()); });
    }
    if ($('#srchCreationDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.CreationDate.includes($('#srchCreationDate').val().trim().toLowerCase()); });
    }
    if ($('#srchModificatorName').val().trim()) {
        rowItems = rowItems.filter(function (row) { return IsNull(row.ModificatorName, '').toLowerCase().includes($('#srchModificatorName').val().trim().toLowerCase()); });
    }
    if ($('#srchModificationDate').val().trim()) {
        rowItems = rowItems.filter(function (row) { return row.ModificationDate.includes($('#srchModificationDate').val().trim().toLowerCase()); });
    }
    if ($('#srchFinalized').is(':checked')) {
        rowItems = rowItems.filter(function (row) { return row.RD_IsFinalized == true; });
    }
    ReceiveDetails_BindTableRows(rowItems);
}

function UpdateOrders(pStatusID) {
    var IDs = GetAllSelectedIDsAsString('tblReceive');
    if (IDs != "") {
        swal({
            title: "Are you sure?",
            text: "The selected records will be " + (pStatusID == constReceiveStatusInProgress ? "progressed" : "canceled") + "!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FE9900",
            confirmButtonText: pStatusID == constReceiveStatusInProgress ? "Yes, progress!" : "Yes, cancel!",
            closeOnConfirm: true
        },
            function () {
                var updateClause = "1=2";
                if (pStatusID == constReceiveStatusInProgress)
                    updateClause = "StatusID = " + pStatusID + " where ID in (" + IDs + ") and StatusID=" + constReceiveStatusCreated + "";
                else if (pStatusID == constReceiveStatusCanceled)
                    updateClause = "StatusID = " + pStatusID + " where ID in (" + IDs + ") and StatusID<" + constReceiveStatusFinalized + " and ID not in (select distinct ReceiveID from WH_ReceiveDetails where RD_IsFinalized=1 and ReceiveID in (" + IDs + "))"
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/WH_Inbound/UpdateOrders"
                    , { pUpdateClause: updateClause }
                    , function (pData) {
                        FadePageCover(false);
                        Receive_LoadingWithPaging();
                    }
                    , null);

            });
    }
    else {
        swal("Please", "Select Orders");
    }  
}

function Finalize() {
    debugger;
    $('#btn-Finalize').prop('disabled', true);
    var IDsArr = [];
    var isValid = true;
    $('#tblReceive tbody tr').each(function () {
        if ($(this).find('td.ID input[name=Delete]').is(':checked')) {
            if ($(this).find('td.StatusID').text().trim() != constReceiveStatusPutaway) {
                swal("Sorry", "Can't finalize order not InReceiving status " + $(this).find('td.Code').text() + "");
                isValid = false;
                return false;
            }
            IDsArr.push($(this).attr('id'));
        }
    });
    if (!isValid) {
        $('#btn-Finalize').prop('disabled', false);
        return;
    }

    if (IDsArr.length > 0) {
        swal({
            title: "Are you sure?",
            text: "The selected orders will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FE9900",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
            function (pYes) {
                if (pYes) {
                    var IDs = IDsArr.toString();

                    FadePageCover(true);
                    setTimeout(function () {
                        CallGETFunctionWithParameters("/api/WH_Inbound/HasMissingQty"
                            , {
                                pWhereClause: `where ReceiveID in (${IDs}) and ExpectedQuantity>ISNULL(Quantity,0)`
                            }
                            , function (pResult) {
                                FadePageCover(false);
                                if (pResult) {
                                    swal({
                                        title: "Orders Has Missing Quantities!",
                                        text: "Do You Want To Generate Orders By Missings?",
                                        type: "warning",
                                        showCancelButton: true,
                                        cancelButtonText: "No, Skip",
                                        confirmButtonColor: "#6BDD55",
                                        confirmButtonText: "Yes, Generate!",
                                        closeOnConfirm: true
                                    },
                                        //callback function in case of confirm delete
                                        function (pGenerate) {
                                            ConfirmFinalize(IDs, pGenerate);
                                        });
                                }
                                else {
                                    ConfirmFinalize(IDs, false);
                                }
                            }, null, false);
                    }, 500);
                }
                else {
                    $('#btn-Finalize').prop('disabled', false);
                }
              
            
            });
    }
    else {
        swal("Please", "Select Lines");
        $('#btn-Finalize').prop('disabled', false);
    }  

   
}

function ConfirmFinalize(pIDs, pGenerateMissing) {
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Warehousing/Finalize/FinalizeOrUnfinalize"
        , {
              pSelector: 1
            , pSelectedIDs: pIDs
            , pValue: 1
            , pHasRequest: _hasRequest
            , pGenerateMissing: pGenerateMissing
        }
        , function (pResult) {
            FadePageCover(false);
            if (pResult.Exception) {
                swal("Error", pResult.Exception.Message);
            }
            else {
                if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                ClearAllTableRows("tblReceive");
                Receive_LoadingWithPaging();
            }
            $('#btn-Finalize').prop('disabled', false);
        },null,false);
}
function CheckAllFinalize(chk) {
    $('#tblReceiveDetails tbody td.RD_IsFinalized input').not(':disabled').prop('checked', $(chk).is(':checked'));
}

function FinalizeChange(chk) {
    debugger;
    if ($(chk).is(':checked')) {
        var tr = $(chk).closest('tr');
        var bySerial = $(tr).find('td.PurchaseItemID select option:selected').attr('BySerialNo');
        var qty = Number($(tr).find('td.Quantity input').val());
        var serialQty = Number($(tr).find('td.SerialQty input').val());
        if (bySerial==1 && qty != serialQty) {
            swal("Sorry", "Register All Item Quantity Serials");
            $(chk).prop('checked', false);
        }
    }
    else {

    }
}
function FinalizeDetails() {
    debugger;
    $('#btnFinalize').prop('disabled', true);
    
    var IDsArr = [];
    var isValid = true;
    $('#tblReceiveDetails tbody tr').each(function () {
        if (IsNull($(this).find('td.ID input').val(), 0) == 0) {
            swal("Sorry", "Can't finalize before saving!");
            isValid = false;
            return false;
        }
        if ($(this).find('td.RD_IsFinalized input').is(':checked') && !$(this).find('td.RD_IsFinalized input').is(':disabled')) {
            if (!($(this).find('td.Quantity input').val() > 0)) {
                swal("Sorry", "Quantity is mandatory!");
                isValid = false;
                return false;
            }
            if (!($(this).find('td.LocationID select').val() > 0)) {
                swal("Sorry", "Location is mandatory!");
                isValid = false;
                return false;
            }
            if (IsNull($(this).find('td.PalletID input').val(),'')=='') {
                swal("Sorry", "PalletID is mandatory!");
                isValid = false;
                return false;
            }
            var purItem = $(this).find('td.PurchaseItemID select option:selected');
            if (_hasRequest && $(purItem).attr('ByExpireDate') == 1 && IsNull($(this).find('td.ProductionDate input').val(), '') == '') {
                swal("Sorry", "Product (" + $(purItem).text() + ") Production Date Is Mandatory");
                isValid = false;
                return false;
            }
            if (_hasRequest && $(purItem).attr('ByExpireDate') == 1 && IsNull($(this).find('td.ExpirationDate input').val(), '') == '') {
                swal("Sorry", "Product (" + $(purItem).text() + ") Expiration Date Is Mandatory");
                isValid = false;
                return false;
            }
            IDsArr.push($(this).attr('id'));
        }
    });
    if (!isValid) {
        $('#btnFinalize').prop('disabled', false);
        return;
    }
    if (IDsArr.length > 0) {
        swal({
            title: "Are you sure?",
            text: "The selected records will be finalized!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FE9900",
            confirmButtonText: "Yes, finalize!",
            closeOnConfirm: true
        },
            function (pYes) {
                if (pYes) {
                    var IDs = IDsArr.toString();
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/WH_Inbound/FinalizeDetails"
                        , { pUpdateClause: "RD_IsFinalized = 1, ModificatorUserID=" + pLoggedUser.ID + ", ModificationDate=GetDate() where ID in (" + IDs + ")", pIDs: IDs }
                        , function (pData) {
                            console.log(pData);
                            FadePageCover(false);
                            if (pData == null) {
                                $('#tblReceiveDetails tbody tr').each(function () {
                                    if ($(this).find('td.RD_IsFinalized input').is(':checked')) {
                                        $(this).find('*').attr('disabled', true);
                                    }
                                });
                            }
                            else {
                                swal("Sorry", pData.Message);
                            }
                            $('#btnFinalize').prop('disabled', false);
                        }
                        , null);
                }
                else {
                    $('#btnFinalize').prop('disabled', false);
                }
              
            });
    }
    else {
        swal("Please", "Select Lines");
        $('#btnFinalize').prop('disabled', false);
    }  
}

function AutoSaveDetail(elm, prop, isStr) {
    debugger;
    if (!_hasRequest || _isRequest || !_updateDetails)
        return;
    var val = '';
    if ($(elm).is('input'))
        val = $(elm).val();
    else if ($(elm).is('select'))
        val = $(elm).find('option:selected').val();
    else if ($(elm).is('checkbox'))
        val = $(elm).is(':checked');

    if ($(elm).hasClass('datepicker-input'))
        val = (val.trim() == "" ? "01/01/1900" : PadDateWithZeroes(val,true));

    if (isStr)
        val = `'${val}'`;

    var tr = $(elm).closest('tr');
    var id = $(tr).attr('id');
    var locId = IsNull($(tr).find('td.LocationID select option:selected').val(),'null');

    var isValidDetail = true;
    if (prop == 'Quantity') {
        if ($(tr).find('td.PurchaseItemID select option:selected').attr('BlindInbound') == 0 && Number(val) > Number($(tr).find('td.ExpectedQuantity input').val())) {
            swal("Sorry", "Not Allowed To Inbound More Than Expected Quantity");
            isValidDetail = false;
            $(elm).val('');
        }  
    }
    else if (prop == 'PalletID') {
        isValidDetail = ValidatePallets(val);
        if (!isValidDetail)
            $(elm).val('');
    }

    if (!isValidDetail)
        return;

    val = IsNull(val, 'null');

    var locUpdate = ``;
    if (prop != 'LocationID')
        locUpdate = `, LocationID=${locId}`;

    var updateClauseMaster = `update WH_Receive set StatusID=${constReceiveStatusPutaway} where ID=(select ReceiveID from WH_ReceiveDetails where ReceiveID=${$('#hID').val()} group by ReceiveID having sum(isnull(Quantity,0))>0) and StatusID=${constReceiveStatusInProgress};\n`;
       updateClauseMaster += `update WH_Receive set StatusID=${constReceiveStatusInProgress} where ID=(select ReceiveID from WH_ReceiveDetails where ReceiveID=${$('#hID').val()} group by ReceiveID having sum(isnull(Quantity,0))=0) and StatusID=${constReceiveStatusPutaway};`;
       updateClauseMaster += `update WH_Receive set ModificationDate=GetDate(), ModificatorUserID=${pLoggedUser.ID} where ID=${$('#hID').val()};`;
    var updateClauseDetails = `${prop}=${val} ${locUpdate}, ModificationDate=GetDate(), ModificatorUserID=${pLoggedUser.ID} where ID=${id}`;

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/WH_Inbound/UpdateDetails"
        , { pUpdateClauseMaster: updateClauseMaster, pUpdateClauseDetails: updateClauseDetails, pID: id, pAutoPallet: _autoPallet }
        , function (result) {
            debugger;
            FadePageCover(false);
            if (result.Exception == null) {
                if (_autoPallet && result.Details.length > 2)//empty array[]
                    $(tr).find('td.PalletID input').val(JSON.parse(result.Details)[0].PalletID);
            }
            else
                swal("Sorry", result.Exception.Message);
        }
        , null);
    
}

function ValidatePallets(pPalletIDs) {
    var isValid = true;
    var whereClause = " WHERE ReceiveID<>" + $('#hID').val() + " and PalletID in (" + pPalletIDs + ") and WarehouseID=" + $("#slWarehouse").val() + "";
    CallGETFunctionWithParameters("/api/WH_Inbound/ValidatePallet", { pWhereClause: whereClause }
            , function (pResult) {
                if (pResult && pResult.length > 0) {
                    swal("Sorry", "Pallet IDs Already Received!\n  " + pResult.toString() + "");
                    isValid = false;
                }
            }
            , null, false);

    return isValid;
}
//////////////////////////////////////////////Services
function AddService() {
    AppendRowtoTable("tblExtraServices",
        (`<tr id='RS-` + $('#tblExtraServices tbody tr').length + `'>
            <td class='ID hide'><input class="form-control" type="text"/></td>
            <td class='ServiceID'><select data-required="false" class="form-control" onchange="GetServicePrice(this);">`+ $('#slService').html() + `</select></td>           
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
    var receiveDate = ConvertDateFormat($('#txtReceiveDate').val());
    if (!(serviceId > 0) || !(customerId > 0)) {
        return;
    }
    var whereClause = "where CustomerID=" + customerId + " and ServiceID=" + serviceId + " and Approved=1 and format(cast('" + receiveDate + "' as date),'yyyy-MM-dd') between cast(FromDate as date) and  cast(ToDate as date)"
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
    var qty = Number($(pInp).val());
    var price = Number($(pInp).closest('tr').find('td.Selling input').val());
    var amount = qty * price;
    $(pInp).closest('tr').find('td.SellingAmount input').val(amount);
}
function SaveServices() {
    pParametersWithValues = {
        HasRequest: _hasRequest
    };
    var services = [];
    var isValid = true;
    $('#tblExtraServices tbody tr').each(function () {
        services.push({
            ID: $(this).find('td.ID input').val(),
            TransSourceID: IsNull($("#hID").val(), 0),
            Direction: 1,//Receive
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
        pWhereClause: "where TransSourceID = " + pID + " and Direction = 1"
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
////////////////////////////////////////////Print
function Receive_PrintInbound() {
    debugger;


        var arr_Keys = new Array();
        var arr_Values = new Array();

        arr_Keys.push("dummy");
        arr_Values.push("0");

    var arr_Pics = new Array();
    var arr_PicsLocations = new Array();

    arr_Pics.push('picLogo');
    arr_PicsLocations.push('' + glbBaseUrl + '\Content\\Images\\Logo.png');

        var ReportName = "WH_InboundShipment";

    var query = `select ID,Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName,ItemCode,ItemName,BatchNumber,UOM, sum(ExpectedQuantity) ExpectedQuantity, ContainerNumber, PO from vwWH_Inbound_rpt where ID = ${$('#hID').val()} group by ID,Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName,ItemCode,ItemName,BatchNumber,UOM, ContainerNumber, PO `;

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
            , pTitle: ReportName
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

function Receive_PrintConfirmation(pDetailed) {
    debugger;


        var arr_Keys = new Array();
        var arr_Values = new Array();

        arr_Keys.push("dummy");
        arr_Values.push("0");

        var arr_Pics = new Array();
        var arr_PicsLocations = new Array();

        arr_Pics.push('picLogo');
        arr_PicsLocations.push('' + glbBaseUrl + '\Content\\Images\\Logo.png');
        


        var ReportName = pDetailed ? "WH_ReceivingConfirmationDetails" : "WH_ReceivingConfirmation";

        var query = pDetailed ?
            `select Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName,ItemCode, ItemName, BatchNumber, ProductionDate, ExpirationDate, PalletID, LocationCode, Sum(ExpectedQuantity) ExpectedQuantity, UOM, Sum(Quantity) Quantity, PalletStatusName, ContainerNumber, PO from vwWH_Inbound_rpt where ID = ${$('#hID').val()} group by Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName,ItemCode, ItemName, BatchNumber, ProductionDate, ExpirationDate, PalletID, LocationCode, UOM, PalletStatusName, ContainerNumber, PO Order By ItemCode`
            : `select Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName, ItemCode, ItemName, BatchNumber, ProductionDate, ExpirationDate, Sum(ExpectedQuantity) ExpectedQuantity, UOM, Sum(ActualQuantity) ActualQuantity, Sum(DamageQuantity) DamageQuantity, Sum(VarianceQuantity) VarianceQuantity, ContainerNumber, PO from vwWH_Inbound_rpt where ID = ${$('#hID').val()} group by Code,CustomerName,WarehouseName,Notes,CreationDate,CreatorUserName,ItemCode, ItemName, BatchNumber, ProductionDate, ExpirationDate, UOM, ContainerNumber, PO  Order By ItemCode`;

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
            , pTitle: pDetailed ? "Receiving Confirmation Detail" : "Receiving Confirmation"
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

function OpenFilterOptions() {
    CallGETFunctionWithParameters("/api/Users/GetUserWarehouses", { pWhereClause: "where UserID=" + pLoggedUser.ID + " and IsDefault=1" }
        , function (pData) {
            var data = JSON.parse(pData[0]);
            if (data.length > 0 && data[0].WarehouseID > 0)
                $('#slFilterWarehouse').val(data[0].WarehouseID).change();
            else
                $('#slFilterWarehouse').val(0).change();
        }
        , null);
}

function ExportTemplate() {
    if (_isRequest)
        window.open('/Content/Templates/ReceiveRequestDetailTemplate.xlsx', '_blank');
    else
        window.open('/Content/Templates/ReceiveDetailTemplate.xlsx', '_blank');
}

function ExportStockTemplate() {


    var pTablesHTML = "";
    pTablesHTML += '             <table id="tblStockTemplate" class="table table-striped text-sm  table-bordered" style="">';
    pTablesHTML += '                 <thead style="">';
    pTablesHTML += '                     <th>WarehouseCode</th>';
    pTablesHTML += '                     <th>ItemCode</th>';
    pTablesHTML += '                     <th>UOM</th>';
    if (!_isRequest) {
    pTablesHTML += '                     <th>Location</th>';
    pTablesHTML += '                     <th>PalletID</th>';
    }
    pTablesHTML += '                     <th>Quantity</th>';
    if (!_isRequest) {
        pTablesHTML += '                     <th>PalletStatus</th>';
    }
    pTablesHTML += '                     <th>Production</th>';
    pTablesHTML += '                     <th>Expiration</th>';
    pTablesHTML += '                     <th>BatchNumber</th>';
    if (!_isRequest) {
        pTablesHTML += '                     <th>SerialNumber</th>';
    }
    pTablesHTML += '                     <th>ContainerNumber</th>';
    pTablesHTML += '                     <th>Notes</th>';
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
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '                     <td style="text-align:center;" ></td>'
    pTablesHTML += '             </tr>';
    pTablesHTML += '                 </tbody>';
    pTablesHTML += '             </table>';
    $("#hStockTemplate").html(pTablesHTML);

    var filename = "StockTemplate.xls";
    ExportHtmlTableToCsv('tblStockTemplate', filename);


}

function UploadExcelFile_Stock() {
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
                url: '/api/WH_Inbound/UploadExcelFile_Stock?pIsFinalize=' + isFinalize+'',
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
                            Receive_LoadingWithPaging();
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

                CallGETFunctionWithParameters("/api/WH_Inbound/CopyOrder"
                    , { pID: pID }
                    , function (pData) {
                        FadePageCover(false);
                        if (pData.OrderCode) {
                            swal("Success", "Order copied successfully.\n with new code "+pData.OrderCode+"");
                        }
                        else {
                            swal("Faild", "Order coping faild.");
                            console.log(pData.Exception);
                        }
                    }
                    , null);

            }

        });
}

function GetSelect2MultiText(elm) {
    var selected = [];
    if ($(elm).select2('data').length) {
        $.each($(elm).select2('data'), function (key, item) {
            selected.push(item.text);
        });
    }
    return selected.toString();
}