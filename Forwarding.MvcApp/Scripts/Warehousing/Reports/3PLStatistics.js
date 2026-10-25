let ReportType = "1";
let IDsWithDefectedItems = "";
var _hasRequest = false;
function _3PLStatistics_Initialize() {
    debugger;
    FadePageCover(true);
    if (["EF", "FPL"].includes(pDefaults.UnEditableCompanyName))
        _hasRequest = true;
    LoadView("/Warehousing/Reports/3PLStatistics", "div-content", function () {
        $('#slCustomer,#slCustomers').css({ 'width': '100%' }).select2();
        $('#slOwner,#slOwners').css({ 'width': '100%' }).select2();
        $('#slProduct,#slProducts').css({ 'width': '100%' }).select2();
        $('#slWarehouse,#slWarehouses,#slWarehousesTo').css({ 'width': '100%' }).select2();
        $('#slOrderTypes').css({ 'width': '100%' }).select2();
        $('#slArea').css({ 'width': '100%' }).select2();
        $('#slReportName').css({ 'width': '100%' }).select2();
        $('#slOrderNo').css({ 'width': '100%' }).select2();
        $("div[tabindex='-1']").removeAttr('tabindex');
        //$("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());

        if (_hasRequest) {
            $('#slReportName').html('<option value="0">Select Report</option>');
            $('#slReportName').append('<option value="103">Products near expiry</option>');
            $('#slReportName').append('<option value="104">Expired products</option>');
            $('#slReportName').append('<option value="106">Zero locations</option>');
            $('#slReportName').append('<option value="113">Extra Services</option>');
            $('#slReportName').append('<option value="114">Allocatd Materials</option>');
            $('#slReportName').append('<option value="115">Tracking Orders</option>');
            $('#slReportName').append('<option value="116">Open Shipment</option>');
            $('#slReportName').append('<option value="117">Order Serial Details</option>');
            $('#slReportName').append('<option value="118">Tracking Orders By Pallet Class</option>');
            $('#slReportName').append('<option value="119">Tracing Material</option>');
            $('#slReportName').append('<option value="120">Invoice P IN P Out</option>');
            $('#slReportName').append('<option value="122">Inquiries</option>');
            $('#slReportName').append('<option value="123">Warehouse Transfer</option>');
            $('#slReportName').append('<option value="124">Customer Item Summary</option>');
            $('#lblCustomer').text('Owner');
            $('#slCustomer,#slCustomers').attr('onchange', 'GetOwners(id)');
            //$('#slOwner').attr('onchange', 'GetProducts()');

            $('input.datepicker-input').datepicker().on('changeDate', function () { $(this).datepicker('hide'); });//LoadOrders();
        }
        if (pDefaults.UnEditableCompanyName == 'FPL') {
            $('#slReportName').append('<option value="121">Pallet Label</option>');
        }
        IntializeProductAutoCompleteSearch();
        CallGETFunctionWithParameters("/api/_3PLStatistics/LoadInitialData", { pHasRequest: _hasRequest }, function (pData) {
            debugger;
            FillListFromObject(null, 2, "<--Select-->", "slCustomer", pData[0], function () { $('#slCustomers').html($('#slCustomer').html()); });
            FillListFromObject(null, 2, "<--Select-->", "slProduct", pData[1], null);
            FillListFromObject(null, 2, "<--Select-->", "slWarehouse", pData[2], function () { $('#slWarehouses,#slWarehousesTo').html($('#slWarehouse').html()); });
            FillListFromObject(null, 2, "<--Select-->", "slArea", pData[3], null);
            FillListFromObject(null, 2, "<--Select-->", "slService", pData[4], null);
        }, function () {
            FadePageCover(false);
        });       
    })
}

function IntializeProductAutoCompleteSearch() {
    var ownerFilter = `1=1`;
    $("#slProduct,#slProducts").css({ 'width': '100%' }).select2({
        minimumInputLength: 2,
        tags: false,
        ajax: {
            url: strServerURL + "/api/PurchaseItem/LoadAll",
            dataType: 'json',
            type: "GET",
            contentType: "application/json; charset=utf-8",
            quietMillis: 50,
            cache: false,
            // data: { term: term },
            data: function (params) {
                if (_hasRequest) {
                    var ownerId = IsNull($('#slOwners option:selected').val(), '0').toString();
                    ownerFilter = `OwnerID in (${ownerId})`;
                }
                var whereClause = `where (Code like N'%${params.term}%' or Name like N'%${params.term}%') and ${ownerFilter}`;
                var query = {
                    pWhereClause: whereClause
                    //type: 'public'
                }

                return query;
            },
            processResults: function (data) {
                debugger;
                var d = JSON.parse(data);
                return {

                    results: $.map(d, function (item) {
                        return {
                            text: item.Code,
                            id: item.ID
                        };
                    })
                };
            }
        }
    });
}

function GetOwners(slId) {
    debugger;
    var customerIds = IsNull($('#' + slId+'').val(), '0').toString();
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/Owners/LoadAll"
        , { pWhereClause: `where CustomerID in (${customerIds})` }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 2, "<--Select-->", "slOwner", pData, function () { $('#slOwners').html($('#slOwner').html()); });
        }
        , null);
}
function GetProducts() {
    var ownerId = IsNull($('#slOwner option:selected').val(),0);
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
        , { pWhereClause: `where OwnerID=${ownerId}` }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 2, "<--Select-->", "slProduct", pData, function () { $('#slProducts').html($('#slProduct').html()); });
        }
        , null);
}

function LoadOrders() {
    debugger;
    $('#slOrderNo').html('');
    var whereClause = 'where 1=1';
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and CreationDate >= '" + ConvertDateFormat($('#txtFromDate').val().trim()) + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(CreationDate as date) <= '" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";

    if (whereClause == 'where 1=1')
        return;

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/_3PLStatistics/LoadOrders"
        , { pWhereClause: whereClause }
        , function (pData) {
            FadePageCover(false);
            FillListFromObject(null, 1, "<--Select-->", "slOrderNo", pData, null);
        }
        , null);
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

function ReportNameChanged() {
    debugger;
    $("#divFromDate,#divToDate").addClass("hide");
    $("#divFromCreation,#divToCreation").addClass("hide");
    $("#divFromModification,#divToModification").addClass("hide");
    $("#UploadDefected").addClass("hide");

    $("#txtDaysToBeNearExpiry").closest('div').addClass("hide");
    $("#slCustomer,#slCustomers").closest('div').addClass("hide");
    $("#slOwner,#slOwners").closest('div').addClass("hide");
    $("#slProduct,#slProducts").closest('div').addClass("hide");
    $("#divRepeatedPallet").addClass("hide");
    $("#slWarehouse,#slWarehouses,#slWarehousesTo").closest('div').addClass("hide");
    $("#slArea").closest('div').addClass("hide");
    $("#slOrderStatus").closest('div').addClass("hide");
    $("#slService").closest('div').addClass("hide");
    $("#cbIsInvoiced").closest('div').addClass("hide");
    $("#slOrderType,#slOrderTypes").closest('div').addClass("hide");
    ResetOrderTypes();
    $("#slOrderNo").closest('div').addClass("hide");
    $("#txtPalletID").closest('div').addClass("hide");

    $('#btn-print-excel').addClass("hide");
    $('#btn-search').addClass("hide");
    $('.ItemsLog').addClass("hide");
    ClearAllTableRows("tblItemsLog");

    $("#divLocation").addClass("hide");
    $("#divPalletID").addClass("hide");
    $("#divSerial").addClass("hide");
    $('.Inquiries').addClass("hide");
    ClearAllTableRows("tblInquiries");

    strLoadWithPagingFunctionName = "";

    ReportType = $("#slReportName").val();
    switch (ReportType) {
        case "2": //ReceiveOrdersWithDefectedItems
            break;
        case "3":
            $("#txtDaysToBeNearExpiry").closest('div').removeClass("hide");
            break;
        case "103":
            $("#txtDaysToBeNearExpiry").closest('div').removeClass("hide");
            break;
        case "4":
            break;
        case "104":
            break;
        case "5":
            $("#slCustomer").closest('div').removeClass("hide");
            break;
        case "6":
            break;
        case "106":
            $("#slWarehouse").closest('div').removeClass("hide");
            $("#slArea").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "7":
            break;
        case "8":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slProduct").closest('div').removeClass("hide");
            break;
        case "9":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            break;
        case "10":
            $("#slWarehouse").closest('div').removeClass("hide");
            $("#slArea").closest('div').removeClass("hide");
            break;
        case "11":
            $("#slCustomer").closest('div').removeClass("hide");
            $("#slWarehouse").closest('div').removeClass("hide");
            $("#slOrderStatus").closest('div').removeClass("hide");
            break;
        case "12":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomer").closest('div').removeClass("hide");
            break;
        case "13":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomer").closest('div').removeClass("hide");
            $("#slService").closest('div').removeClass("hide");
            $("#cbIsInvoiced").closest('div').removeClass("hide");
            break;
        case "14":
            $("#divCustomer").removeClass("hide");
            $("#divWarehouse").removeClass("hide");
            $("#divLocation").removeClass("hide");
            $("#divProduct").removeClass("hide");
            $("#divPalletID").removeClass("hide");
            $("#UploadDefected").removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "15":
            $("#divCustomer").removeClass("hide");
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "16":
            $("#divCustomer").removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "17":
            $("#divCustomer").removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "18":
            $("#divSerial").removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "19":
            $("#divLocation").removeClass("hide");
            $("#divPalletID").removeClass("hide");
            $("#divRepeatedPallet").removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "20":
            $("#divProduct").removeClass("hide");
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "21":
            $("#divCustomer").removeClass("hide");
            $("#divProduct").removeClass("hide");
            $("#btn-print-excel").removeClass("hide");
            break;
        case "113":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomer").closest('div').removeClass("hide");
            $("#slOwner").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "114":
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $("#slWarehouses").closest('div').removeClass("hide");
            $("#slProducts").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "115":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slWarehouses").closest('div').removeClass("hide");
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $("#slOrderTypes").closest('div').removeClass("hide");
            $("#slOrderTypes option.Extra").remove();
            $("#slOrderNo").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "116":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $("#slWarehouses").closest('div').removeClass("hide");
            $("#slOrderTypes").closest('div').removeClass("hide");
            $("#slOrderTypes option.Extra").remove();
            $("#slOrderNo").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "117":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomer").closest('div').removeClass("hide");
            $("#slOwner").closest('div').removeClass("hide");
            $("#slWarehouse").closest('div').removeClass("hide");
            $("#slOrderType").closest('div').removeClass("hide");
            $("#slOrderNo").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "118":
            $("#txtFromDate").closest('div').removeClass("hide");
            $("#txtToDate").closest('div').removeClass("hide");
            $("#slCustomer").closest('div').removeClass("hide");
            $("#slOwner").closest('div').removeClass("hide");
            $("#slWarehouses").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "119":
            $("#divFromCreation,#divToCreation").removeClass("hide");
            $("#divFromModification,#divToModification").removeClass("hide");
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $("#slWarehouses").closest('div').removeClass("hide");
            $("#slOrderTypes").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            $('#btn-search').removeClass("hide");
            $('.ItemsLog').removeClass("hide");
            strLoadWithPagingFunctionName = "/api/_3PLStatistics/LoadItemsLog";
            break;
        case "120":
            break;
        case "121":
            $("#txtPalletID").closest('div').removeClass("hide");
            break;
        case "122":
            $("#divLocation").removeClass("hide");
            $("#divPalletID").removeClass("hide");
            $("#divSerial").removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            $('#btn-search').removeClass("hide");
            $('.Inquiries').removeClass("hide");
            strLoadWithPagingFunctionName = "/api/_3PLStatistics/LoadItemInquiries";
            break;
        case "123":
            $("#divFromCreation,#divToCreation").removeClass("hide");
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $("#slWarehouses,#slWarehousesTo").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
        case "124":
            $("#slCustomers").closest('div').removeClass("hide");
            $("#slOwners").closest('div').removeClass("hide");
            $('#btn-print-excel').removeClass("hide");
            break;
    }
}

async function _3PLStatistics_Print(pOutputTo) {
    debugger;
    ReportType = $("#slReportName").val();
    if (ReportType == "2")
        IDsWithDefectedItems = await GetIDsWithDefectedItems();
    let pWhereClause = _3PLStatistics_GetFilterWhereClause();
    if (await validationCheck()) {
        switch (ReportType) {
            case "1":
                FastReport_Print("Rep_PurchaseItemsBelowMinLimit", pWhereClause, pOutputTo);
                break;
            case "2":
                FastReport_Print("Rep_3PL_ReceiveOrdersWithDefectedItems", pWhereClause, pOutputTo);
                break;
            case "3":
                FastReport_Print("Rep_3PL_ProductsNearExpiry", pWhereClause, pOutputTo);
                break;
            case "103":
                FastReport_Print("Rep_3PL_ProductsNearExpiry_EF", pWhereClause, pOutputTo);
                break;
            case "4":
                FastReport_Print("Rep_3PL_ExpiredProducts", pWhereClause, pOutputTo);
                break;
            case "104":
                FastReport_Print("Rep_3PL_ProductsNearExpiry_EF", pWhereClause, pOutputTo);
                break;
            case "5":
                FastReport_Print("Rep_3PL_ClientOccupiedArea", pWhereClause, pOutputTo);
                break;
            case "6":
                FastReport_Print("Rep_3PL_ZeroLocations", pWhereClause, pOutputTo);
                break;
            case "106":
                PrintHtmlReport_106(pOutputTo);
                break;
            case "7":
                FastReport_Print("Rep_3PL_ReceiveOrdersNotes", pWhereClause, pOutputTo);
                break;
            case "8":
                FastReport_Print("Rep_3PL_ProductReallocationLog", pWhereClause, pOutputTo);
                break;
            case "9":
                FastReport_Print("Rep_3PL_ShippedLocations", pWhereClause, pOutputTo);
                break;
            case "10":
                FastReport_Print("Rep_3PL_BinLocations", pWhereClause, pOutputTo);
                break;
            case "11":
                FastReport_Print("Rep_3PL_OrderStatus", pWhereClause, pOutputTo);
                break;
            case "12":
                FastReport_Print("Rep_3PL_PickupReport", pWhereClause , pOutputTo);
                break;
            case "13":
                FastReport_Print("Rep_3PLServices", pWhereClause, pOutputTo);
                break;
            case "14":
                PrintHtmlReport_14(pOutputTo);
                break;
            case "15":
                PrintHtmlReport_15(pOutputTo);
                break;
            case "16":
                PrintHtmlReport_16(pOutputTo);
                break;
            case "17":
                PrintHtmlReport_17(pOutputTo);
                break;
            case "18":
                PrintHtmlReport_18(pOutputTo);
                break;
            case "19":
                PrintHtmlReport_19(pOutputTo);
                break;
            case "20":
                PrintHtmlReport_20(pOutputTo);
                break;
            case "21":
                PrintHtmlReport_21(pOutputTo);
                break;
            case "113":
                PrintHtmlReport_113(pOutputTo);
                break;
            case "114":
                PrintHtmlReport_114(pOutputTo);
                break;
            case "115":
                PrintHtmlReport_115(pOutputTo);
                break;
            case "116":
                PrintHtmlReport_116(pOutputTo);
                break;
            case "117":
                PrintHtmlReport_117(pOutputTo);
                break;
            case "118":
                PrintHtmlReport_118(pOutputTo);
                break;
            case "119":
                PrintHtmlReport_119(pOutputTo);
                break;
            case "120":
                PrintHtmlReport_120(pOutputTo);
                break;
            case "121":
                PrintHtmlReport_121(pOutputTo);
                break;
            case "122":
                PrintHtmlReport_122(pOutputTo);
                break;
            case "123":
                PrintHtmlReport_123(pOutputTo);
                break;
            case "124":
                PrintHtmlReport_124(pOutputTo);
                break;
        }
    }

}

function _3PLStatistics_GetFilterWhereClause() {
    debugger;
    var WhereClause = " Where";
    let pDaysToBeNearExpiry = $("#txtDaysToBeNearExpiry").val() == "" ? 15 : $("#txtDaysToBeNearExpiry").val();
    let pCustomerID = $("#slCustomer").val();
    let pProductID = $("#slProduct").val();
    switch (ReportType) {
        case "2":
            WhereClause += " AND RD.IsDefected = 1";
            break;
        case "3":
            WhereClause += " AND RD.ExpirationDate IS NOT NULL AND RD.ExpirationDate - GETDATE() BETWEEN 0 AND " + pDaysToBeNearExpiry;
            break;
        case "103":
            var day = Number($('#txtDaysToBeNearExpiry').val());
            WhereClause = " where DiffDays>=0";
            if (day > 0)
                WhereClause += " and DiffDays<=" + day + "";
            break;
        case "4":
            WhereClause += " AND RD.ExpirationDate IS NOT NULL AND RD.ExpirationDate < GETDATE()";
            break;
        case "104":
            WhereClause = " where DiffDays<0";
            break;
        case "5":
            if (pCustomerID != 0)
                WhereClause += " AND C.ID = " + pCustomerID + " AND RD.LocationID IS NOT NULL";
            break;
        case "6":
            WhereClause += " AND RL.IsUsed = 0";
            break;
        case "8":
            if ($("#txtFromDate").val() != "" && $("#txtFromDate").val() != 0)
                WhereClause += ` AND ModificationDate > ''${ConvertDateFormat($("#txtFromDate").val())} 23:59:59''`
            if ($("#txtToDate").val() != "" && $("#txtToDate").val() != 0)
                WhereClause += ` AND ModificationDate <= ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59''`
            WhereClause += (pProductID == "" || pProductID == 0 ? "" : " AND PurchaseItemID = " + pProductID);
            break;
        case "9":
            WhereClause = ` ''${ConvertDateFormat($("#txtFromDate").val())} 00:00:00'' AND ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59''`
            break;
        case "10":
            if ($("#slWarehouse").val() != 0 && $("#slWarehouse").val() != "")
                WhereClause += " AND W.ID = " + $("#slWarehouse").val();
            if ($("#slArea").val() != 0 && $("#slArea").val() != "")
                WhereClause += " AND A.ID = " + $("#slArea").val();
            break;
        case "11":
            if ($("#slWarehouse").val() != 0 && $("#slWarehouse").val() != "")
                WhereClause += " AND WarehouseID = " + $("#slWarehouse").val();
            if ($("#slCustomer").val() != 0 && $("#slCustomer").val() != "")
                WhereClause += " AND CustomerID = " + $("#slCustomer").val();
            if ($("#slOrderStatus").val() != 0 && $("#slOrderStatus").val() != "")
                WhereClause += " AND StatusName = ''" + $("#slOrderStatus").val() + "''";
            break;
        case "12":
            WhereClause = ` ''${ConvertDateFormat($("#txtFromDate").val())} 00:00:00'' AND ''${ConvertDateFormat($("#txtToDate").val())} 23:59:59''`
            break;
        case "13":
            WhereClause = ` where CreationDate Between '${ConvertDateFormat($("#txtFromDate").val())} 00:00:00' AND '${ConvertDateFormat($("#txtToDate").val())} 23:59:59' `
            if ($('#slCustomer').val() > 0)
                WhereClause += ` and CustomerID = ${$('#slCustomer').val()}`;
            if ($('#slService').val() > 0)
                WhereClause += ` and ServiceID = ${$('#slService').val()}`;
            if($('#cbIsInvoiced').is(':checked'))
                WhereClause += ` and InvoiceID > 0`;
            break;
    }

    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1 ";
    }
    else {
        WhereClause = WhereClause.replace("Where AND", "Where ");
        WhereClause = WhereClause.replace("Where OR", "Where ");
    }

    return WhereClause;
}

function FastReport_Print(ReportName, pWhereClause, pOutputTo) {
    debugger;
    CallGETFunctionWithParameters("/api/Reports/GetLogoPath", { pLogoSubPath: "Content/Images/CompanyHeader.jpg" }, function (paths) {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        let query = `${ReportName} ' ${pWhereClause}'`;
        arr_Keys.push("Logo");
        arr_Values.push(paths.logoPath);

        if (ReportType == "9") {
            arr_Keys.push("Period");
            arr_Values.push("From " + $("#txtFromDate").val() + " To " + $("#txtToDate").val());
        }

        else if (ReportType == "12") {
            arr_Keys.push("Period");
            arr_Values.push("From " + $("#txtFromDate").val() + " To " + $("#txtToDate").val());

            if ($("#slCustomer").val() != 0 && $("#slCustomer").val() != "")
                query += ` ,' AND CustomerID = ${$("#slCustomer").val()}'`
            else
                query += `,''`
        }

        else if (ReportType == "13") {
            query = `select * from vwWH_TransServices ${pWhereClause}`;
        }

        else if (ReportType == "103") {
            arr_Keys.push("RepType");
            arr_Values.push(ReportType);

            var day = Number($('#txtDaysToBeNearExpiry').val());
            arr_Keys.push("Day");
            arr_Values.push(day);

            query = `select * from vwWH_ItemsExpiration_rpt ${pWhereClause}`;
        }

        else if (ReportType == "104") {
            arr_Keys.push("RepType");
            arr_Values.push(ReportType);

            arr_Keys.push("Day");
            arr_Values.push(0);
          
            query = `select * from vwWH_ItemsExpiration_rpt ${pWhereClause}`;
        }
        var pParametersWithValues =
        {
            query: query
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "3PL Statistics"
            , pReportName: ReportName
            , pReportType: pOutputTo
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        win.location = url;
    })
}

function GetIDsWithDefectedItems() {
    return new Promise((resolve, reject) => {
        CallGETFunctionWithParameters("/api/_3PLStatistics/GetIDsHavingDocsIn",
            { "FolderPath": "DocsInFiles/Receive" },
            function (data) {
                debugger;
                resolve(data);
            });
    })

}

async function validationCheck() {
    debugger;
    let status = true;
    return new Promise((resolve, reject) => {
        switch (ReportType) {
            case "2":
                if (IDsWithDefectedItems[1] != "")
                    resolve(false);
                break;
            case "5":
                if ($("#slCustomer").val() == "" || ($("#slCustomer").val() == 0)) {
                    swal("Error", "Select Customer!")
                    resolve(false);
                }
                break;
            case "9":
                if ($("#txtFromDate").val() == "" || ($("#txtFromDate").val() == 0) || $("#txtToDate").val() == "" || ($("#txtToDate").val() == 0)) {
                    swal("Error", "Select interval!")
                    resolve(false);
                }
                break;
        }
        resolve(true);
    });
}

function PrintHtmlReport_106(pOutputTo) {
    
    var whereClause = " where 1=1";

    if ($('#slWarehouse').val() > 0)
        whereClause += " and WarehouseID=" + $('#slWarehouse').val() + "";

    if ($('#slArea').val() > 0)
        whereClause += " and AreaID=" + $('#slArea').val() + "";
   
    FadePageCover(true);

    var query = `select A.WarehouseID, W.Name WarehouseName, R.AreaID, A.Name AreaName, R.Name RowName, RL.Code LocationCode,
sum(case when IB.Quantity>0 then 1 else 0 end) PalletCount
from WH_ItemBalance IB 
join WH_RowLocation RL on
IB.LocationID = RL.ID
join WH_Row R on
RL.RowID = R.ID
join WH_Area A on
R.AreaID = A.ID
join WH_Warehouse W on
A.WarehouseID = W.ID
${whereClause}
group by A.WarehouseID, W.Name, R.AreaID, A.Name, R.Name, RL.Code

`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "106" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblZeroLocation" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>Row</th>';
            pTablesHTML += '                                     <th>Area</th>';
            pTablesHTML += '                                     <th>Number of P ID</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.RowName == 0 ? '' : item.RowName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.AreaName == 0 ? '' : item.AreaName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletCount == 0 ? 0 : item.PalletCount) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblZeroLocation", "ZeroLocation");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Zero Location</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Zero Location</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouse : </b>' + ($('#slWarehouse').val() > 0 ? $('#slWarehouse option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Area : </b>' + ($('#slArea').val() > 0 ? $('#slArea option:selected').text() : '') + '</div>';
                
                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_113(pOutputTo) {

    if (!($('#slCustomer').val() > 0)) {
        swal("Please", "Select Owner");
        return;
    }

    if (!($('#slOwner').val() > 0)) {
        swal("Please", "Select Project");
        return;
    }

    var whereClause = " where 1=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and TS.CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slOwner').val() > 0)
        whereClause += " and TS.OwnerID=" + $('#slOwner').val() + "";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and TS.FinalizeDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim()+"'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(TS.FinalizeDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";

    FadePageCover(true);

    var query = `select TS.Code, Format(TS.FinalizeDate, 'yyyy/MM/dd HH:mm:ss') CreationDate, S.Name ServiceName, TS.Quantity, TS.Notes  from (
select R.Code, R.FinalizeDate, TS.ServiceID, TS.Quantity, TS.Notes, R.CustomerID, R.OwnerID
from WH_TransServices TS
join WH_Receive R on
TS.TransSourceID=R.ID and TS.Direction=1
where R.StatusID=30

union all

select P.Code, P.FinalizeDate, TS.ServiceID, TS.Quantity, TS.Notes, P.CustomerID, P.OwnerID
from WH_TransServices TS
join WH_Pickup P on
TS.TransSourceID=P.ID and TS.Direction=2
where P.StatusID=60
) as TS join WH_Services S on
TS.ServiceID=S.ID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "113" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblExtraServices" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Order</th>';
            pTablesHTML += '                                     <th>Date</th>';
            pTablesHTML += '                                     <th>Service</th>';
            pTablesHTML += '                                     <th>Quantity</th>';
            pTablesHTML += '                                     <th>Cost</th>';
            pTablesHTML += '                                     <th>Price</th>';
            pTablesHTML += '                                     <th>Total</th>';
            pTablesHTML += '                                     <th>Notes</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ServiceName == 0 ? '' : item.ServiceName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                pTablesHTML += '                                         <td></td>';
                pTablesHTML += '                                         <td></td>';
                pTablesHTML += '                                         <td></td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblExtraServices", "ExtraServices");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Extra Services</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Extra Services</h3></div> </br>';

                if ($('#slCustomer').val() > 0)
                    ReportHTML += '             <div class="col-xs-4"><b>Owner : </b>' + $('#slCustomer option:selected').text() + '</div>';

                if ($('#slOwner').val() > 0)
                    ReportHTML += '             <div class="col-xs-4"><b>Project : </b>' + $('#slOwner option:selected').text() + '</div>';

                if ($('#txtFromDate').val().trim() != '')
                    ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + $('#txtFromDate').val() + '</div>';

                if ($('#txtToDate').val().trim() != '')
                    ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + $('#txtToDate').val() + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }



          
        }
        , null);

}

function PrintHtmlReport_114(pOutputTo) {

    var whereClause = " where P.StatusID between 20 and 50"; //Released > Loaded

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and P.CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and P.OwnerID in (" + $('#slOwners').val().toString() + ")";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and P.WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if (IsNull($('#slProducts').val(),'') != '')
        whereClause += " and PD.PurchaseItemID in (" + $('#slProducts').val().toString() + ")";

    FadePageCover(true);

    var query = `select P.Code, Format(P.CreationDate, 'yyyy/MM/dd HH:mm:ss') CreationDate, C.Name CustomerName, O.Name OwnerName,
I.Code PurchaseItemCode, I.Name PurchaseItemName, PT.Name PD_PackageTypeName,
RL.WarehouseName, RL.Code LocationCode, IB.PalletID, IB.BatchNumber, 
Format(IB.ProductionDate, 'yyyy/MM/dd') ProductionDate, Format(IB.ExpirationDate, 'yyyy/MM/dd') ExpirationDate,
Sum(PDL.PDL_DemandedQuantity) PDL_DemandedQuantity
from WH_Pickup P
left join WH_PickupDetails PD on
P.ID=PD.PickupID
left join WH_PickupDetailsLocation PDL on
PD.ID=PDL.PickupDetailsID
left join Customers C on
P.CustomerID=C.ID
left join Owners O on
P.OwnerID=O.ID
left join PurchaseItem I on
PD.PurchaseItemID=I.ID
left join PackageTypes PT on
PD.PD_PackageTypeID=PT.ID
left join WH_ItemBalance IB on
PDL.ItemBalanceID=IB.ID
left join vwWH_RowLocation RL on
IB.LocationID=RL.ID
${whereClause}
group by
P.Code, P.CreationDate, C.Name, O.Name,
I.Code, I.Name, PT.Name,
RL.WarehouseName, RL.Code, IB.PalletID, IB.BatchNumber, IB.ProductionDate, IB.ExpirationDate
having Sum(PDL.PDL_DemandedQuantity)>0`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "114" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblAllocatedItems" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Owner</th>';
            pTablesHTML += '                                     <th>Project</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Created on</th>';
            pTablesHTML += '                                     <th>SKU</th>';
            pTablesHTML += '                                     <th>SKU DESCRIPTION</th>';
            pTablesHTML += '                                     <th>Stock Unit</th>';
            pTablesHTML += '                                     <th>Done</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>LP</th>';
            pTablesHTML += '                                     <th>Batch</th>';
            pTablesHTML += '                                     <th>Man Date</th>';
            pTablesHTML += '                                     <th>Exp Date</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CreationDate == 0 ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PD_PackageTypeName == 0 ? '' : item.PD_PackageTypeName) + '</td>';
                pTablesHTML += '                                         <td>' + item.PDL_DemandedQuantity + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ProductionDate == '1900/01/01' ? '' : item.ProductionDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpirationDate == '1900/01/01' ? '' : item.ExpirationDate) + '</td>';
                //pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate)) : "") + '</td>';

                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAllocatedItems", "AlloCatedMaterials");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Allocated Materials</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Allocated Materials </h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouses : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                if (IsNull($('#slProducts').val(), '') != '') {
                    var products = '';
                    $('#slProducts option:selected').each(function () { products += $(this).text()+', '; });
                    ReportHTML += '             <div class="col-xs-4"><b>SKU : </b>' + products + '</div>';
                }
                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }



           
        }
        , null);

}

function PrintHtmlReport_115(pOutputTo) {

    //if (!($('#slCustomer').val() > 0)) {
    //    swal("Please", "Select Owner");
    //    return;
    //}

    //if (!($('#slOwner').val() > 0)) {
    //    swal("Please", "Select Project");
    //    return;
    //}

    var whereClause = " where 1=1";

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and O.CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and O.OwnerID in (" + $('#slOwners').val().toString() + ")";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and O.WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and O.CreationDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim() + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(O.CreationDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";
    if ($('#slOrderTypes option:selected').length > 0 && $('#slOrderTypes option:selected').val() != 0)
        whereClause += " and O.OrderType in ('" + GetSelect2MultiText($('#slOrderTypes')).replaceAll(/,/g, "','") + "')";
    if ($('#slOrderNo option:selected').length>0)
        whereClause += " and O.Code in ('" + GetSelect2MultiText($('#slOrderNo')).replaceAll(/,/g, "','") + "')";
    FadePageCover(true);

    var query = `select O.OrderType, O.Code, Format(O.CreationDate, 'yyyy/MM/dd') CreationDate, Format(O.FinalizeDate, 'yyyy/MM/dd') FinalizeDate, O.Notes, PurI.Code ItemCode, PurI.Name ItemName,
PT.Name UOM, O.BatchNumber, Format(O.ExpectedProductionDate, 'yyyy/MM/dd') ExpectedProductionDate, Format(O.ProductionDate, 'yyyy/MM/dd') ProductionDate, Format(O.ExpectedExpirationDate, 'yyyy/MM/dd') ExpectedExpirationDate, Format(O.ExpirationDate, 'yyyy/MM/dd') ExpirationDate,
O.ExpectedQuantity, O.Quantity, O.DamagedQuantity
from (
select 'Inbound' OrderType, R.Code, R.CreationDate, R.FinalizeDate, R.Notes, R.WarehouseID, RD.PurchaseItemID, RD.RD_PackageTypeID PackageTypeID, RD.BatchNumber, RD.ExpectedProductionDate, RD.ProductionDate, RD.ExpectedExpirationDate, RD.ExpirationDate, SUM(RD.ExpectedQuantity) ExpectedQuantity, SUM(case RD.PalletStatusID when 4 then 0 else RD.Quantity end) Quantity, SUM(case RD.PalletStatusID when 4 then RD.Quantity else 0 end) DamagedQuantity, R.CustomerID, R.OwnerID
from WH_Receive R join WH_ReceiveDetails RD on
R.ID = RD.ReceiveID
where R.StatusID=30--FINALIZED
group by R.Code, R.CreationDate, R.FinalizeDate, R.Notes, R.WarehouseID, RD.PurchaseItemID, RD.RD_PackageTypeID, RD.BatchNumber, RD.ExpectedProductionDate, RD.ProductionDate, RD.ExpectedExpirationDate, RD.ExpirationDate, R.CustomerID, R.OwnerID

union all

select 'Outbound' OrderType, P.Code, P.CreationDate, P.FinalizeDate, P.Notes, P.WarehouseID, PD.PurchaseItemID, PD.PD_PackageTypeID PackageTypeID, IB.BatchNumber, IB.ProductionDate ExpectedProductionDate, IB.ProductionDate, IB.ExpirationDate ExpectedExpirationDate, IB.ExpirationDate, SUM(PDL.PDL_DemandedQuantity) ExpectedQuantity, SUM(PDL.PickedQuantity) Quantity, 0 DamagedQuantity, P.CustomerID, P.OwnerID
from WH_Pickup P join WH_PickupDetails PD on
P.ID = PD.PickupID
join WH_PickupDetailsLocation PDL on
PD.ID = PDL.PickupDetailsID
join WH_ItemBalance IB on
IB.ID = PDL.ItemBalanceID
where P.StatusID=60--FINALIZED
group by P.Code, P.CreationDate, P.FinalizeDate, P.Notes, P.WarehouseID, PD.PurchaseItemID, PD.PD_PackageTypeID, IB.BatchNumber, IB.ProductionDate, IB.ProductionDate, IB.ExpirationDate, IB.ExpirationDate, P.CustomerID, P.OwnerID
) as O
join PurchaseItem PurI on
O.PurchaseItemID = PurI.ID
left join PackageTypes PT on
O.PackageTypeID = PT.ID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "115" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblTruckingOrders" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Created On</th>';
            pTablesHTML += '                                     <th>Finalized On</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Ref</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Materials</th>';
            pTablesHTML += '                                     <th>Description</th>';
            pTablesHTML += '                                     <th>Stock Unit</th>';
            pTablesHTML += '                                     <th>Batch</th>';
            pTablesHTML += '                                     <th>Expected Man Date</th>';
            pTablesHTML += '                                     <th>Man Date</th>';
            pTablesHTML += '                                     <th>Expected EXP Date</th>';
            pTablesHTML += '                                     <th>EXP Date</th>';
            pTablesHTML += '                                     <th>Expected Qty</th>';
            pTablesHTML += '                                     <th>Actual Qty</th>';
            pTablesHTML += '                                     <th>Damaged</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.FinalizeDate == '1900/01/01' ? '' : item.FinalizeDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                pTablesHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpectedProductionDate == '1900/01/01' ? '' : item.ExpectedProductionDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ProductionDate == '1900/01/01' ? '' : item.ProductionDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpectedExpirationDate == '1900/01/01' ? '' : item.ExpectedExpirationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpirationDate == '1900/01/01' ? '' : item.ExpirationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpectedQuantity == 0 ? '' : item.ExpectedQuantity) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                pTablesHTML += '                                         <td>' + (item.DamagedQuantity == 0 ? '' : item.DamagedQuantity) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTruckingOrders", "TruckingOrders");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Trucking Orders</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Trucking Orders</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouses : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Types : </b>' + ($('#slOrderTypes option:selected').length > 0 ? GetSelect2MultiText($('#slOrderTypes')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Number : </b>' + ($('#slOrderNo option:selected').length > 0 ? GetSelect2MultiText($('#slOrderNo')) : '') + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_116(pOutputTo) {



    var whereClause = " where 1=1";

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and O.CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and O.OwnerID in (" + $('#slOwners').val().toString() + ")";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and O.WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and O.CreationDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim() + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(O.CreationDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";
    if ($('#slOrderTypes option:selected').length > 0 && $('#slOrderTypes option:selected').val() != 0)
        whereClause += " and O.OrderType in ('" + GetSelect2MultiText($('#slOrderTypes')).replaceAll(/,/g, "','") + "')";
    if ($('#slOrderNo option:selected').length > 0)
        whereClause += " and O.Code in ('" + GetSelect2MultiText($('#slOrderNo')).replaceAll(/,/g, "','") + "')";
    FadePageCover(true);

    var query = `With RD(ReceiveID,ExpectedQty,ActualQty)
as
(
	select ReceiveID, Sum(IsNull(ExpectedQuantity,0)), Sum(IsNull(Quantity,0)) from WH_ReceiveDetails group by ReceiveID
),
PDL(PickupID,ExpectedQty,ActualQty)
as
(
	select PickupID, Sum(IsNull(PDL.PDL_DemandedQuantity,0)), Sum(IsNull(PDL.PickedQuantity,0)) 
	from WH_PickupDetails PD left join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID 
	group by PickupID
)
select O.OrderType, O.Code, Format(O.CreationDate, 'yyyy/MM/dd HH:mm:ss') CreationDate, W.Name WarehouseName, OW.Name OwnerName, O.Notes, Creator.Name CreatorName, O.StatusName, DateDiff(Day, O.CreationDate, GetDate())+1 Delays, 
case O.OrderType when 'Inbound' then RD.ExpectedQty else PDL.ExpectedQty end as ExpectedQty,
case O.OrderType when 'Inbound' then RD.ActualQty else PDL.ActualQty end as ActualQty
from (
select 'Inbound' OrderType, R.ID, R.Code, R.CreationDate, R.WarehouseID, R.CustomerID, R.OwnerID, R.Notes, R.CreatorUserID, RS.Name StatusName
from WH_Receive R join NoAccessReceiveStatus RS on R.StatusID=RS.ID
where R.StatusID in (5, 10, 20) --Created, INPROGRESS, INRECEIVING

union all

select 'Outbound' OrderType, P.ID, P.Code, P.CreationDate, P.WarehouseID, P.CustomerID, P.OwnerID, P.Notes, P.CreatorUserID, PS.Name StatusName
from WH_Pickup P join NoAccessPickupStatus PS on P.StatusID=PS.ID
where P.StatusID in (10, 20, 30, 40, 50) --Created, Released, PartPicked, Picked, Loaded
) as O
join WH_Warehouse W on
O.WarehouseID = W.ID
join Owners OW on
O.OwnerID = OW.ID
join Users Creator on
O.CreatorUserID = Creator.ID
left join RD on
O.ID=RD.ReceiveID and O.OrderType='Inbound'
left join PDL on
O.ID=PDL.PickupID and O.OrderType='Outbound'
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "116" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblOpenShipment" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Created Date</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Ref</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Project</th>';
            pTablesHTML += '                                     <th>Created BY</th>';
            pTablesHTML += '                                     <th>Delay days</th>';
            pTablesHTML += '                                     <th>Order status</th>';
            pTablesHTML += '                                     <th>Expected Qty</th>';
            pTablesHTML += '                                     <th>Actual Qty</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CreatorName == 0 ? '' : item.CreatorName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Delays == 0 ? '' : item.Delays) + '</td>';
                pTablesHTML += '                                         <td>' + (item.StatusName == 0 ? '' : item.StatusName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ExpectedQty == 0 ? '' : item.ExpectedQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ActualQty == 0 ? '' : item.ActualQty) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOpenShipment", "OpenShipment");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Open Shipment</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Open Shipment</h3></div> </br>';
                
                ReportHTML += '             <div class="col-xs-4"><b>Warehouses : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Types : </b>' + ($('#slOrderTypes option:selected').length > 0 ? GetSelect2MultiText($('#slOrderTypes')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Number : </b>' + ($('#slOrderNo option:selected').length > 0 ? GetSelect2MultiText($('#slOrderNo')) : '') + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_117(pOutputTo) {
    
    var whereClause = " where 1=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and O.CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slOwner').val() > 0)
        whereClause += " and O.OwnerID=" + $('#slOwner').val() + "";
    if ($('#slWarehouse').val() > 0)
        whereClause += " and O.WarehouseID=" + $('#slWarehouse').val() + "";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and O.CreationDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim() + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(O.CreationDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";
    if ($('#slOrderType').val() > 0)
        whereClause += " and O.OrderType=N'" + $('#slOrderType option:selected').text() + "'";
    if ($('#slOrderNo option:selected').length > 0)
        whereClause += " and O.Code in ('" + GetSelect2MultiText($('#slOrderNo')).replaceAll(/,/g, "','") + "')";
    FadePageCover(true);

    var query = `select O.OrderType, O.Code, Format(O.CreationDate, 'yyyy/MM/dd HH:mm:ss') CreationDate, O.WarehouseID, O.CustomerID, O.OwnerID, PurI.Code ItemCode, PurI.Name ItemName,
PT.Name UOM, O.Serial, O.PalletID, PS.Name PalletStatusName
from (
select 'Inbound' OrderType, R.Code, R.CreationDate, R.WarehouseID, R.CustomerID, R.OwnerID, RD.PurchaseItemID, RD.RD_PackageTypeID PackageTypeID, RDS.Serial, RD.PalletID, RD.PalletStatusID
from WH_Receive R join WH_ReceiveDetails RD on
R.ID = RD.ReceiveID
join WH_ReceiveDetailsSerial RDS on
RD.ID=RDS.ReceiveDetailsID
where R.StatusID=30--FINALIZED

union all

select 'Outbound' OrderType, P.Code, P.CreationDate, P.WarehouseID, P.CustomerID, P.OwnerID, PD.PurchaseItemID, PD.PD_PackageTypeID PackageTypeID, RDS.Serial, PDL.PDL_PalletID, IB.PalletStatusID
from WH_Pickup P join WH_PickupDetails PD on
P.ID = PD.PickupID
join WH_PickupDetailsLocation PDL on
PD.ID = PDL.PickupDetailsID
join WH_ReceiveDetailsSerial RDS on
PDL.ID = RDS.PickupDetailsLocationID
join WH_ItemBalance IB on
IB.ID = PDL.ItemBalanceID
where P.StatusID=60--FINALIZED
) as O
join PurchaseItem PurI on
O.PurchaseItemID = PurI.ID
left join PackageTypes PT on
O.PackageTypeID = PT.ID
join PalletStatus PS on
O.PalletStatusID=PS.ID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "117" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblOrderSerialDetails" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Created Date</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Material</th>';
            pTablesHTML += '                                     <th>Description</th>';
            pTablesHTML += '                                     <th>Stock Unit</th>';
            pTablesHTML += '                                     <th>SN</th>';
            pTablesHTML += '                                     <th>P ID</th>';
            pTablesHTML += '                                     <th>P ID Status</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Serial == 0 ? '' : item.Serial) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletStatusName == 0 ? '' : item.PalletStatusName) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOrderSerialDetails", "OrderSerialDetails");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Order Serial Details</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Order Serial Details</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouse : </b>' + ($('#slWarehouse').val() > 0 ? $('#slWarehouse option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Owner : </b>' + ($('#slCustomer').val() > 0 ? $('#slCustomer option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Project : </b>' + ($('#slOwner').val() > 0 ? $('#slOwner option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>Order Type : </b>' + ($('#slOrderType').val() > 0 ? $('#slOrderType option:selected').text() : 'Inbound, Outbound') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Number : </b>' + ($('#slOrderNo option:selected').length > 0 ? GetSelect2MultiText($('#slOrderNo')) : '') + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_118(pOutputTo) {

    var whereClause = " where 1=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and O.CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slOwner').val() > 0)
        whereClause += " and O.OwnerID=" + $('#slOwner').val() + "";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and O.WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and O.CreationDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim() + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(O.CreationDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";
   
    FadePageCover(true);

    var query = `select O.OrderType, O.Code, Format(O.CreationDate, 'yyyy/MM/dd') CreationDate, WH.Name WarehouseName, OW.Name OwnerName, O.Notes, O.NoOfPalletClass, PC.CBM, PC.Name PalletClassName
from (
select 'Inbound' OrderType, R.Code, R.CreationDate, R.WarehouseID, R.CustomerID, R.OwnerID, R.Notes, RD.PalletClassID, Count(RD.PalletClassID) NoOfPalletClass
from WH_Receive R join WH_ReceiveDetails RD on
R.ID = RD.ReceiveID
--where R.StatusID=30--FINALIZED
Group By R.Code, R.CreationDate, R.WarehouseID, R.CustomerID, R.OwnerID, R.Notes, RD.PalletClassID

union all

select 'Outbound' OrderType, P.Code, P.CreationDate, P.WarehouseID, P.CustomerID, P.OwnerID, P.Notes, IB.PalletClassID, Count(IB.PalletClassID) NoOfPalletClass
from WH_Pickup P join WH_PickupDetails PD on
P.ID = PD.PickupID
join WH_PickupDetailsLocation PDL on
PD.ID = PDL.PickupDetailsID
join WH_ItemBalance IB on
IB.ID = PDL.ItemBalanceID
--where P.StatusID=60--FINALIZED
Group By P.Code, P.CreationDate, P.WarehouseID, P.CustomerID, P.OwnerID, P.Notes, IB.PalletClassID
) as O
join PalletClassification PC on
O.PalletClassID = PC.ID
join WH_Warehouse WH on
O.WarehouseID=WH.ID
join Owners OW on
O.OwnerID=OW.ID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "118" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblOrderByPalletClass" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Date</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Project</th>';
            pTablesHTML += '                                     <th>Order Ref</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Pallet Class</th>';
            pTablesHTML += '                                     <th>Pallet CBM</th>';
            pTablesHTML += '                                     <th>Number of Pallet Class</th>';
            pTablesHTML += '                                     <th>Total Pallet Class CBM</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletClassName == 0 ? '' : item.PalletClassName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CBM == 0 ? '' : item.CBM) + '</td>';
                pTablesHTML += '                                         <td>' + (item.NoOfPalletClass == 0 ? '' : item.NoOfPalletClass) + '</td>';
                pTablesHTML += '                                         <td>' + (item.NoOfPalletClass == 0 || item.CBM == 0 ? '' : item.NoOfPalletClass * item.CBM) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOrderByPalletClass", "OrderByPalletClass");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>tblOrder By Pallet Class</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Order Serial Details</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouse : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Owner : </b>' + ($('#slCustomer').val() > 0 ? $('#slCustomer option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Project : </b>' + ($('#slOwner').val() > 0 ? $('#slOwner option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';


                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_119(pOutputTo) {
    debugger;
    var whereClause = "where 1=1";

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and OwnerID in (" + $('#slOwners').val().toString() + ")";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if ($('#txtFromCreation').val().trim() != '')
        whereClause += " and CreationDate>='" + ConvertDateFormat($('#txtFromCreation').val()).trim() + "'";
    if ($('#txtToCreation').val().trim() != '')
        whereClause += " and Cast(CreationDate as date)<='" + ConvertDateFormat($('#txtToCreation').val().trim()) + "'";
    if ($('#txtFromModification').val().trim() != '')
        whereClause += " and ModificationDate>='" + ConvertDateFormat($('#txtFromModification').val()).trim() + "'";
    if ($('#txtToModification').val().trim() != '')
        whereClause += " and Cast(ModificationDate as date)<='" + ConvertDateFormat($('#txtToModification').val().trim()) + "'";
    if ($('#slOrderTypes option:selected').length > 0 && $('#slOrderTypes option:selected').val()!=0)
        whereClause += " and OrderType in ('" + GetSelect2MultiText($('#slOrderTypes')).replaceAll(/,/g, "','") + "')";


    //Search
    if (pOutputTo == "Search") {
        ClearAllTableRows("tblItemsLog");

        if ($('#srchCreationDate').val().trim() != '')
            whereClause += ` and (Format(Cast(CreationDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#srchCreationDate').val().trim()}%')`;
        if ($('#srchModificationDate').val().trim() != '')
            whereClause += ` and (Format(Cast(ModificationDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#srchModificationDate').val().trim()}%')`;
        if ($('#srchWarehouse').val().trim() != '')
            whereClause += ` and WarehouseName like N'%${$('#srchWarehouse').val().trim()}%'`;
        if ($('#srchCustomer').val().trim() != '')
            whereClause += ` and CustomerName like N'%${$('#srchCustomer').val().trim()}%'`;
        if ($('#srchOwner').val().trim() != '')
            whereClause += ` and OwnerName like N'%${$('#srchOwner').val().trim()}%'`;
        if ($('#srchOrderType').val().trim() != '')
            whereClause += ` and OrderType like N'%${$('#srchOrderType').val().trim()}%'`;
        if ($('#srchOrderNo').val().trim() != '')
            whereClause += ` and OrderNo like N'%${$('#srchOrderNo').val().trim()}%'`;
        if ($('#srchNotes').val().trim() != '')
            whereClause += ` and Notes like N'%${$('#srchNotes').val().trim()}%'`;
        if ($('#srchItemCode').val().trim() != '')
            whereClause += ` and ItemCode like N'%${$('#srchItemCode').val().trim()}%'`;
        if ($('#srchItemName').val().trim() != '')
            whereClause += ` and ItemName like N'%${$('#srchItemName').val().trim()}%'`;
        if ($('#srchUnit').val().trim() != '')
            whereClause += ` and UOM like N'%${$('#srchUnit').val().trim()}%'`;
        if ($('#srchFromLoc').val().trim() != '')
            whereClause += ` and FromLocationCode like N'%${$('#srchFromLoc').val().trim()}%'`;
        if ($('#srchToLoc').val().trim() != '')
            whereClause += ` and ToLocationCode like N'%${$('#srchToLoc').val().trim()}%'`;
        if ($('#srchFromPallet').val().trim() != '')
            whereClause += ` and FromPalletID like N'%${$('#srchFromPallet').val().trim()}%'`;
        if ($('#srchToPallet').val().trim() != '')
            whereClause += ` and ToPalletID like N'%${$('#srchToPallet').val().trim()}%'`;
        if ($('#srchPalletClass').val().trim() != '')
            whereClause += ` and PalletClassName like N'%${$('#srchPalletClass').val().trim()}%'`;
        if ($('#srchQty').val().trim() != '')
            whereClause += ` and Quantity like N'%${$('#srchQty').val().trim()}%'`;
        if ($('#srchUser').val().trim() != '')
            whereClause += ` and UserName like N'%${$('#srchUser').val().trim()}%'`;

        var pWhereClause = whereClause;
        var pPageSize = $('#select-page-size-log').val();
        var pPageNumber = ($("#div-Pager-log li.active a").text() == "" ? 1 : $("#div-Pager-log li.active a").text());
        var pOrderBy = "CreationDate";
        LoadWithPagingWithWhereClauseAndOrderBy("div-Pager-log", "select-page-size-log", "spn-first-page-row-log", "spn-last-page-row-log", "spn-total-count-log", "div-Text-Total-log", "/api/_3PLStatistics/LoadItemsLog", pWhereClause, pOrderBy, pPageNumber, pPageSize, function (pData) {
            var data = JSON.parse(pData[0]);
            
            $.each(data, function (i, item) {
                    AppendRowtoTable("tblItemsLog",
                        ("<tr>"
                            + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate)) + "</td>"
                            + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                            + "<td class='CustomerName'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
                            + "<td class='OwnerName'>" + (item.OwnerName == 0 ? "" : item.OwnerName) + "</td>"
                            + "<td class='OrderType'>" + (item.OrderType == 0 ? "" : item.OrderType) + "</td>"
                            + "<td class='OrderNo'>" + (item.OrderNo == 0 ? "" : item.OrderNo) + "</td>"
                            + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                            + "<td class='ItemCode'>" + (item.ItemCode == 0 ? "" : item.ItemCode) + "</td>"
                            + "<td class='ItemName'>" + (item.ItemName == 0 ? "" : item.ItemName) + "</td>"
                            + "<td class='UOM'>" + (item.UOM == 0 ? "" : item.UOM) + "</td>"
                            + "<td class='FromLocationCode'>" + (item.FromLocationCode == 0 ? "" : item.FromLocationCode) + "</td>"
                            + "<td class='ToLocationCode'>" + (item.ToLocationCode == 0 ? "" : item.ToLocationCode) + "</td>"
                            + "<td class='FromPalletID'>" + (item.FromPalletID == 0 ? "" : item.FromPalletID) + "</td>"
                            + "<td class='ToPalletID'>" + (item.ToPalletID == 0 ? "" : item.ToPalletID) + "</td>"
                            + "<td class='PalletClassName'>" + (item.PalletClassName == 0 ? "" : item.PalletClassName) + "</td>"
                            + "<td class='Quantity'>" + (item.Quantity == 0 ? "" : item.Quantity) + "</td>"
                            + "<td class='ModificationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ModificationDate)) < 1 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.ModificationDate)) + "</td>"
                            + "<td class='UserName'>" + (item.UserName == 0 ? "" : item.UserName) + "</td>"
                            + "</td></tr>"));
                });
            
        });
    }

    //Print
    else {
        FadePageCover(true);

        var query = ` select * from vwWH_ItemsLog ${whereClause} Order By CreationDate`;
        CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "119" }
            , function (pData) {
                debugger;
                FadePageCover(false);
                var data = JSON.parse(pData);


                var pTablesHTML = "";

                pTablesHTML += '                         <table id="tblTracingMaterial" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
                pTablesHTML += '                             <thead>';
                pTablesHTML += '                                 <tr>';
                pTablesHTML += '                                     <th>Creation</th>';
                pTablesHTML += '                                     <th>WH</th>';
                pTablesHTML += '                                     <th>Owner</th>';
                pTablesHTML += '                                     <th>Project</th>';
                pTablesHTML += '                                     <th>Order Type</th>';
                pTablesHTML += '                                     <th>Order Number</th>';
                pTablesHTML += '                                     <th>Notes</th>';
                pTablesHTML += '                                     <th>Item</th>';
                pTablesHTML += '                                     <th>Desc</th>';
                pTablesHTML += '                                     <th>UOM</th>';
                pTablesHTML += '                                     <th>From Location</th>';
                pTablesHTML += '                                     <th>To Location</th>';
                pTablesHTML += '                                     <th>From LPN</th>';
                pTablesHTML += '                                     <th>To LPN</th>';
                pTablesHTML += '                                     <th>LPN Class</th>';
                pTablesHTML += '                                     <th>Quantity</th>';
                pTablesHTML += '                                     <th>Last Update</th>';
                pTablesHTML += '                                     <th>User Update</th>';
                pTablesHTML += '                                 </tr>';
                pTablesHTML += '                             </thead>';
                pTablesHTML += '                             <tbody>';
                debugger;

                $.each(data, function (i, item) {
                    pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                    pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate)) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.OrderNo == 0 ? '' : item.OrderNo) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.FromLocationCode == 0 ? '' : item.FromLocationCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ToLocationCode == 0 ? '' : item.ToLocationCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.FromPalletID == 0 ? '' : item.FromPalletID) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ToPalletID == 0 ? '' : item.ToPalletID) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PalletClassName == 0 ? '' : item.PalletClassName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ModificationDate == '1900/01/01' ? '' : GetFullDateTime_DD_MM_YY_hh_mm(item.ModificationDate)) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.UserName == 0 ? '' : item.UserName) + '</td>';
                    pTablesHTML += '                                     </tr>';
                });
                pTablesHTML += '                             </tbody>';
                pTablesHTML += '                         </table>';
                $("#hExportedTable").html(pTablesHTML);
                if (pOutputTo == "Excel") {
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTracingMaterial", "TracingMaterial");
                }
                else {
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Tracing Material</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Tracing Materials</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-4"><b>Warehouses : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-4"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-4"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-8"><b>Order Types : </b>' + ($('#slOrderTypes option:selected').length > 0 ? GetSelect2MultiText($('#slOrderTypes')) : '') + '</div>';

                    ReportHTML += pTablesHTML;

                    ReportHTML += '</html>';

                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
            }
            , null);
    }


   

}

function PrintHtmlReport_120(pOutputTo) {
    swal("coming Soon");
    return
    var whereClause = " where 1=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and O.CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slOwner').val() > 0)
        whereClause += " and O.OwnerID=" + $('#slOwner').val() + "";
    if ($('#slWarehouse').val() > 0)
        whereClause += " and O.WarehouseID=" + $('#slWarehouse').val() + "";
    if ($('#txtFromDate').val().trim() != '')
        whereClause += " and O.CreationDate>='" + ConvertDateFormat($('#txtFromDate').val()).trim() + "'";
    if ($('#txtToDate').val().trim() != '')
        whereClause += " and Cast(O.CreationDate as date)<='" + ConvertDateFormat($('#txtToDate').val().trim()) + "'";
    if ($('#slOrderType').val() > 0)
        whereClause += " and O.OrderType=N'" + $('#slOrderType option:selected').text() + "'";
    if ($('#slOrderNo option:selected').length > 0)
        whereClause += " and O.Code in ('" + GetSelect2MultiText($('#slOrderNo')).replaceAll(/,/g, "','") + "')";
    FadePageCover(true);

    var query = `select O.OrderType, O.Code, Format(O.CreationDate, 'yyyy/MM/dd HH:mm:ss') CreationDate, O.WarehouseID, O.CustomerID, O.OwnerID, PurI.Code ItemCode, PurI.Name ItemName,
PT.Name UOM, O.Serial, O.PalletID, PS.Name PalletStatusName
from (
select 'Inbound' OrderType, R.Code, R.CreationDate, R.WarehouseID, R.CustomerID, R.OwnerID, RD.PurchaseItemID, RD.RD_PackageTypeID PackageTypeID, RDS.Serial, RD.PalletID, RD.PalletStatusID
from WH_Receive R join WH_ReceiveDetails RD on
R.ID = RD.ReceiveID
join WH_ReceiveDetailsSerial RDS on
RD.ID=RDS.ReceiveDetailsID
where R.StatusID=30--FINALIZED

union all

select 'Outbound' OrderType, P.Code, P.CreationDate, P.WarehouseID, P.CustomerID, P.OwnerID, PD.PurchaseItemID, PD.PD_PackageTypeID PackageTypeID, RDS.Serial, PDL.PDL_PalletID, IB.PalletStatusID
from WH_Pickup P join WH_PickupDetails PD on
P.ID = PD.PickupID
join WH_PickupDetailsLocation PDL on
PD.ID = PDL.PickupDetailsID
join WH_ReceiveDetailsSerial RDS on
PDL.ID = RDS.PickupDetailsLocationID
join WH_ItemBalance IB on
IB.ID = PDL.ItemBalanceID
where P.StatusID=60--FINALIZED
) as O
join PurchaseItem PurI on
O.PurchaseItemID = PurI.ID
left join PackageTypes PT on
O.PackageTypeID = PT.ID
join PalletStatus PS on
O.PalletStatusID=PS.ID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "120" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblOrderSerialDetails" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Created Date</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Number</th>';
            pTablesHTML += '                                     <th>Material</th>';
            pTablesHTML += '                                     <th>Description</th>';
            pTablesHTML += '                                     <th>Stock Unit</th>';
            pTablesHTML += '                                     <th>SN</th>';
            pTablesHTML += '                                     <th>P ID</th>';
            pTablesHTML += '                                     <th>P ID Status</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Serial == 0 ? '' : item.Serial) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletStatusName == 0 ? '' : item.PalletStatusName) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOrderSerialDetails", "OrderSerialDetails");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Order Serial Details</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Order Serial Details</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-4"><b>Warehouse : </b>' + ($('#slWarehouse').val() > 0 ? $('#slWarehouse option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Owner : </b>' + ($('#slCustomer').val() > 0 ? $('#slCustomer option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>Project : </b>' + ($('#slOwner').val() > 0 ? $('#slOwner option:selected').text() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';

                ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>Order Type : </b>' + ($('#slOrderType').val() > 0 ? $('#slOrderType option:selected').text() : 'Inbound, Outbound') + '</div>';

                ReportHTML += '             <div class="col-xs-8"><b>Order Number : </b>' + ($('#slOrderNo option:selected').length > 0 ? GetSelect2MultiText($('#slOrderNo')) : '') + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_121(pOutputTo) {

    var whereClause = " where 1=1";

    if (IsNull($('#txtPalletID').val().trim(), '0') != '0')
        whereClause += " and IB.PalletID in ('" + $('#txtPalletID').val().trim().replaceAll(/,/g, "','") + "') and IB.Quantity>0";

    if (whereClause == " where 1=1") {
        swal("Sorry", "PalletID Is Mandatory");
        return;
    }

    FadePageCover(true);

    var query = `select IB.PalletID, I.Code ItemCode, I.Name ItemName, RD.Notes, RD.PO, RL.Code LocationCode, U.Name UserName, C.Name CustomerName, IB.Quantity
from WH_ItemBalance IB left join PurchaseItem I on IB.PurchaseItemID=I.ID
left join WH_ReceiveDetails RD on RD.PalletID=IB.PalletID
left join WH_RowLocation RL on IB.LocationID=RL.ID
left join Users U on IB.CreatorUserID=U.ID
left join Customers C on C.ID=I.ClientID
${whereClause}
`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "121" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);

            if (data.length == 0) {
                swal("Sorry", "No Pallet To Print");
                return;
            }

            var pTablesHTML = "";

            pTablesHTML += '                         <div class="flex-container">';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <div>';
                pTablesHTML += '                                         <p>Pallet ID ' + (item.PalletID == 0 ? '' : item.PalletID) + '</p>';
                pTablesHTML += '                                         <p>Item No ' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</p>';
                pTablesHTML += '                                         <p>Description ' + (item.ItemName == 0 ? '' : item.ItemName) + '</p>';
                pTablesHTML += '                                         <p>Quantity ' + (item.Quantity == 0 ? '' : item.Quantity) + '</p>';
                pTablesHTML += '                                         <p>Client # ' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</p>';
                pTablesHTML += '                                         <p>REF # ' + (item.Notes == 0 ? '' : item.Notes) + '</p>';
                pTablesHTML += '                                         <p>PO # ' + (item.PO == 0 ? '' : item.PO) + '</p>';
                pTablesHTML += '                                         <p>Location ' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</p>';
                pTablesHTML += '                                         <p>Rec.By ' + (item.UserName == 0 ? '' : item.UserName) + '</p>';
                pTablesHTML += '                                     </div>';
            });
            pTablesHTML += '                         </div>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOrderByPalletClass", "OrderByPalletClass");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Pallet Label</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>.flex-container {display: flex;flex-wrap: wrap;} .flex-container > div {width: 300px; margin: 10px; padding:10px; border:1px solid black;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += pTablesHTML;
                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_122(pOutputTo) {
    debugger;

    $('#hByLocation,#hByPallet,#hBySerial').addClass('hide');

    if ($('#txtLocation').val().trim() != '') {
        $('#hByLocation').removeClass('hide');
        var whereClause = "where LocationCode='" + $('#txtLocation').val().trim() + "'";

        //Search
        if (pOutputTo == "Search") {
            ClearAllTableRows("tblInquiries");

            if ($('#hByLocation .srchWarehouse').val().trim() != '')
                whereClause += ` and WarehouseName like N'%${$('#hByLocation .srchWarehouse').val().trim()}%'`;
            if ($('#hByLocation .srchPallet').val().trim() != '')
                whereClause += ` and PalletID like N'%${$('#hByLocation .srchPallet').val().trim()}%'`;
            if ($('#hByLocation .srchItemCode').val().trim() != '')
                whereClause += ` and ItemCode like N'%${$('#hByLocation .srchItemCode').val().trim()}%'`;
            if ($('#hByLocation .srchItemName').val().trim() != '')
                whereClause += ` and ItemName like N'%${$('#hByLocation .srchItemName').val().trim()}%'`;
            if ($('#hByLocation .srchUnit').val().trim() != '')
                whereClause += ` and UOM like N'%${$('#hByLocation .srchUnit').val().trim()}%'`;
            if ($('#hByLocation .srchBatch').val().trim() != '')
                whereClause += ` and BatchNumber like N'%${$('#hByLocation .srchBatch').val().trim()}%'`;
            if ($('#hByLocation .srchProDate').val().trim() != '')
                whereClause += ` and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hByLocation .srchProDate').val().trim()}%'`;
            if ($('#hByLocation .srchExpDate').val().trim() != '')
                whereClause += ` and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hByLocation .srchExpDate').val().trim()}%'`;
            if ($('#hByLocation .srchQty').val().trim() != '')
                whereClause += ` and Quantity=${$('#hByLocation .srchQty').val().trim()}`;
            if ($('#hByLocation .srchRecCode').val().trim() != '')
                whereClause += ` and RecCode like N'%${$('#hByLocation .srchRecCode').val().trim()}%'`;
            

            var pWhereClause = whereClause;
            var pPageSize = $('#select-page-size-Inquery').val();
            var pPageNumber = ($("#div-Pager-Inquery li.active a").text() == "" ? 1 : $("#div-Pager-Inquery li.active a").text());
            var pOrderBy = "PalletID";
            LoadWithPagingWithWhereClauseAndOrderBy("div-Pager-Inquery", "select-page-size-Inquery", "spn-first-page-row-Inquery", "spn-last-page-row-Inquery", "spn-total-count-Inquery", "div-Text-Total-Inquery", "/api/_3PLStatistics/LoadItemInquiries", pWhereClause, pOrderBy, pPageNumber, pPageSize, function (pData) {
                var data = JSON.parse(pData[0]);

                $.each(data, function (i, item) {
                    AppendRowtoTable("tblInquiries",
                        ("<tr>"
                            + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                            + "<td class='PalletID'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                            + "<td class='ItemCode'>" + (item.ItemCode == 0 ? "" : item.ItemCode) + "</td>"
                            + "<td class='ItemName'>" + (item.ItemName == 0 ? "" : item.ItemName) + "</td>"
                            + "<td class='UOM'>" + (item.UOM == 0 ? "" : item.UOM) + "</td>"
                            + "<td class='BatchNumber'>" + (item.BatchNumber == 0 ? "" : item.BatchNumber) + "</td>"
                            + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "</td>"
                            + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"
                            + "<td class='Quantity'>" + (item.Quantity == 0 ? "" : item.Quantity) + "</td>"
                            + "<td class='RecCode'>" + (item.RecCode == 0 ? "" : item.RecCode) + "</td>"
                            + "</td></tr>"));
                });

            });
        }

        //Print
        else {
            FadePageCover(true);

            var query = ` select * from vwWH_ItemInquiries ${whereClause} Order By PalletID`;
            CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "12201" }
                , function (pData) {
                    debugger;
                    FadePageCover(false);
                    var data = JSON.parse(pData);


                    var pTablesHTML = "";

                    pTablesHTML += '                         <table id="tblItemInquiries" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
                    pTablesHTML += '                             <thead>';
                    pTablesHTML += '                                 <tr>';
                    pTablesHTML += '                                     <th>Warehouse</th>';
                    pTablesHTML += '                                     <th>Pallet ID</th>';
                    pTablesHTML += '                                     <th>Item</th>';
                    pTablesHTML += '                                     <th>Desc</th>';
                    pTablesHTML += '                                     <th>UOM</th>';
                    pTablesHTML += '                                     <th>Batch No</th>';
                    pTablesHTML += '                                     <th>Prod Date</th>';
                    pTablesHTML += '                                     <th>Exp Date</th>';
                    pTablesHTML += '                                     <th>Quantity</th>';
                    pTablesHTML += '                                     <th>Rec Code</th>';
                    pTablesHTML += '                                 </tr>';
                    pTablesHTML += '                             </thead>';
                    pTablesHTML += '                             <tbody>';
                    debugger;

                    $.each(data, function (i, item) {
                        pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                        pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ProductionDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ExpirationDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.RecCode == 0 ? '' : item.RecCode) + '</td>';
                        pTablesHTML += '                                     </tr>';
                    });
                    pTablesHTML += '                             </tbody>';
                    pTablesHTML += '                         </table>';
                    $("#hExportedTable").html(pTablesHTML);
                    if (pOutputTo == "Excel") {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblItemInquiries", "LocationInquiries");
                    }
                    else {
                        var ReportHTML = '';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Location Inquiries</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Location Inquiries</h3></div> </br>';
                        
                        ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>Location : </b>' + ($('#txtLocation').val().trim() != '' ? $('#txtLocation').val() : '') + '</div>';

                        ReportHTML += pTablesHTML;

                        ReportHTML += '</html>';

                        var mywindow = window.open('', '_blank');
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }




                }
                , null);
        }
    }
    else if ($('#txtPalletID').val().trim() != '') {
        $('#hByPallet').removeClass('hide');
        var whereClause = "where PalletID='" + $('#txtPalletID').val().trim() + "'";

        //Search
        if (pOutputTo == "Search") {
            ClearAllTableRows("tblInquiries");

            if ($('#hByPallet .srchWarehouse').val().trim() != '')
                whereClause += ` and WarehouseName like N'%${$('#hByPallet .srchWarehouse').val().trim()}%'`;
            if ($('#hByPallet .srchLocation').val().trim() != '')
                whereClause += ` and LocationCode like N'%${$('#hByPallet .srchLocation').val().trim()}%'`;
            if ($('#hByPallet .srchItemCode').val().trim() != '')
                whereClause += ` and ItemCode like N'%${$('#hByPallet .srchItemCode').val().trim()}%'`;
            if ($('#hByPallet .srchItemName').val().trim() != '')
                whereClause += ` and ItemName like N'%${$('#hByPallet .srchItemName').val().trim()}%'`;
            if ($('#hByPallet .srchUnit').val().trim() != '')
                whereClause += ` and UOM like N'%${$('#hByPallet .srchUnit').val().trim()}%'`;
            if ($('#hByPallet .srchBatch').val().trim() != '')
                whereClause += ` and BatchNumber like N'%${$('#hByPallet .srchBatch').val().trim()}%'`;
            if ($('#hByPallet .srchProDate').val().trim() != '')
                whereClause += ` and (Format(Cast(ProductionDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hByPallet .srchProDate').val().trim()}%'`;
            if ($('#hByPallet .srchExpDate').val().trim() != '')
                whereClause += ` and (Format(Cast(ExpirationDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hByPallet .srchExpDate').val().trim()}%'`;
            if ($('#hByPallet .srchQty').val().trim() != '')
                whereClause += ` and Quantity=${$('#hByPallet .srchQty').val().trim()}`;
            if ($('#hByPallet .srchRecCode').val().trim() != '')
                whereClause += ` and RecCode like N'%${$('#hByPallet .srchRecCode').val().trim()}%'`;

            var pWhereClause = whereClause;
            var pPageSize = $('#select-page-size-Inquery').val();
            var pPageNumber = ($("#div-Pager-Inquery li.active a").text() == "" ? 1 : $("#div-Pager-Inquery li.active a").text());
            var pOrderBy = "LocationCode";
            LoadWithPagingWithWhereClauseAndOrderBy("div-Pager-Inquery", "select-page-size-Inquery", "spn-first-page-row-Inquery", "spn-last-page-row-Inquery", "spn-total-count-Inquery", "div-Text-Total-Inquery", "/api/_3PLStatistics/LoadItemInquiries", pWhereClause, pOrderBy, pPageNumber, pPageSize, function (pData) {
                var data = JSON.parse(pData[0]);

                $.each(data, function (i, item) {
                    AppendRowtoTable("tblInquiries",
                        ("<tr>"
                            + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                            + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                            + "<td class='ItemCode'>" + (item.ItemCode == 0 ? "" : item.ItemCode) + "</td>"
                            + "<td class='ItemName'>" + (item.ItemName == 0 ? "" : item.ItemName) + "</td>"
                            + "<td class='UOM'>" + (item.UOM == 0 ? "" : item.UOM) + "</td>"
                            + "<td class='BatchNumber'>" + (item.BatchNumber == 0 ? "" : item.BatchNumber) + "</td>"
                            + "<td class='ProductionDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ProductionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + "</td>"
                            + "<td class='ExpirationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + "</td>"
                            + "<td class='Quantity'>" + (item.Quantity == 0 ? "" : item.Quantity) + "</td>"
                            + "<td class='RecCode'>" + (item.RecCode == 0 ? "" : item.RecCode) + "</td>"
                            + "</td></tr>"));
                });

            });
        }

        //Print
        else {
            FadePageCover(true);

            var query = ` select * from vwWH_ItemInquiries ${whereClause} Order By LocationCode`;
            CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "12202" }
                , function (pData) {
                    debugger;
                    FadePageCover(false);
                    var data = JSON.parse(pData);


                    var pTablesHTML = "";

                    pTablesHTML += '                         <table id="tblItemInquiries" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
                    pTablesHTML += '                             <thead>';
                    pTablesHTML += '                                 <tr>';
                    pTablesHTML += '                                     <th>Warehouse</th>';
                    pTablesHTML += '                                     <th>Location</th>';
                    pTablesHTML += '                                     <th>Item</th>';
                    pTablesHTML += '                                     <th>Desc</th>';
                    pTablesHTML += '                                     <th>UOM</th>';
                    pTablesHTML += '                                     <th>Batch No</th>';
                    pTablesHTML += '                                     <th>Prod Date</th>';
                    pTablesHTML += '                                     <th>Exp Date</th>';
                    pTablesHTML += '                                     <th>Quantity</th>';
                    pTablesHTML += '                                     <th>Rec Code</th>';
                    pTablesHTML += '                                 </tr>';
                    pTablesHTML += '                             </thead>';
                    pTablesHTML += '                             <tbody>';
                    debugger;

                    $.each(data, function (i, item) {
                        pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                        pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.BatchNumber == 0 ? '' : item.BatchNumber) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ProductionDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.ProductionDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ExpirationDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.RecCode == 0 ? '' : item.RecCode) + '</td>';
                        pTablesHTML += '                                     </tr>';
                    });
                    pTablesHTML += '                             </tbody>';
                    pTablesHTML += '                         </table>';
                    $("#hExportedTable").html(pTablesHTML);
                    if (pOutputTo == "Excel") {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblItemInquiries", "PalletInquiries");
                    }
                    else {
                        var ReportHTML = '';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Pallet Inquiries</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Pallet Inquiries</h3></div> </br>';

                        ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>Pallet ID : </b>' + ($('#txtPalletID').val().trim() != '' ? $('#txtPalletID').val() : '') + '</div>';

                        ReportHTML += pTablesHTML;

                        ReportHTML += '</html>';

                        var mywindow = window.open('', '_blank');
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }




                }
                , null);
        }
    }
    else if ($('#txtSerial').val().trim() != '') {
        $('#hBySerial').removeClass('hide');
        var whereClause = "where Serial='" + $('#txtSerial').val().trim() + "'";

        //Search
        if (pOutputTo == "Search") {
            ClearAllTableRows("tblInquiries");


            if ($('#hBySerial .srchWarehouse').val().trim() != '')
                whereClause += ` and WarehouseName like N'%${$('#hBySerial .srchWarehouse').val().trim()}%'`;
            if ($('#hBySerial .srchRecDate').val().trim() != '')
                whereClause += ` and (Format(Cast(ReceiveDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hBySerial .srchRecDate').val().trim()}%'`;
            if ($('#hBySerial .srchOrderCreation').val().trim() != '')
                whereClause += ` and (Format(Cast(OrderDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hBySerial .srchOrderCreation').val().trim()}%'`;
            if ($('#hBySerial .srchPallet').val().trim() != '')
                whereClause += ` and PalletID like N'%${$('#hBySerial .srchPallet').val().trim()}%'`;
            if ($('#hBySerial .srchCreation').val().trim() != '')
                whereClause += ` and (Format(Cast(CreationDate as date), 'dd/MM/yyyy HH:mm:ss') like N'%${$('#hBySerial .srchCreation').val().trim()}%'`;
            if ($('#hBySerial .srchCreator').val().trim() != '')
                whereClause += ` and CreatorUserName like N'%${$('#hBySerial .srchCreator').val().trim()}%'`;

            var pWhereClause = whereClause;
            var pPageSize = $('#select-page-size-Inquery').val();
            var pPageNumber = ($("#div-Pager-Inquery li.active a").text() == "" ? 1 : $("#div-Pager-Inquery li.active a").text());
            var pOrderBy = "ReceiveDate";
            LoadWithPagingWithWhereClauseAndOrderBy("div-Pager-Inquery", "select-page-size-Inquery", "spn-first-page-row-Inquery", "spn-last-page-row-Inquery", "spn-total-count-Inquery", "div-Text-Total-Inquery", "/api/_3PLStatistics/LoadItemInquiries", pWhereClause, pOrderBy, pPageNumber, pPageSize, function (pData) {
                var data = JSON.parse(pData[0]);

                $.each(data, function (i, item) {
                    AppendRowtoTable("tblInquiries",
                        ("<tr>"
                            + "<td class='WarehouseName'>" + (item.WarehouseName == 0 ? "" : item.WarehouseName) + "</td>"
                            + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                            + "<td class='OrderDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + "</td>"
                            + "<td class='PalletID'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
                            + "<td class='CreationDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CreationDate)) < 1 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate)) + "</td>"
                            + "<td class='CreatorUserName'>" + (item.CreatorUserName == 0 ? "" : item.CreatorUserName) + "</td>"
                            + "</td></tr>"));
                });

            });
        }

        //Print
        else {
            FadePageCover(true);

            var query = ` select * from vwWH_SerialInquiries ${whereClause} Order By ReceiveDate`;
            CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "12203" }
                , function (pData) {
                    debugger;
                    FadePageCover(false);
                    var data = JSON.parse(pData);


                    var pTablesHTML = "";

                    pTablesHTML += '                         <table id="tblSerialInquiries" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
                    pTablesHTML += '                             <thead>';
                    pTablesHTML += '                                 <tr>';
                    pTablesHTML += '                                     <th>Warehouse</th>';
                    pTablesHTML += '                                     <th>Rec Date</th>';
                    pTablesHTML += '                                     <th>Shipped Date</th>';
                    pTablesHTML += '                                     <th>Pallet ID</th>';
                    pTablesHTML += '                                     <th>Creation</th>';
                    pTablesHTML += '                                     <th>Creator</th>';
                    pTablesHTML += '                                 </tr>';
                    pTablesHTML += '                             </thead>';
                    pTablesHTML += '                             <tbody>';
                    debugger;

                    $.each(data, function (i, item) {
                        pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                        pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.ReceiveDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.OrderDate == '1900/01/01' ? '' : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate)) + '</td>';
                        pTablesHTML += '                                         <td>' + (item.CreatorUserName == 0 ? '' : item.CreatorUserName) + '</td>';
                        pTablesHTML += '                                     </tr>';
                    });
                    pTablesHTML += '                             </tbody>';
                    pTablesHTML += '                         </table>';
                    $("#hExportedTable").html(pTablesHTML);
                    if (pOutputTo == "Excel") {
                        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblSerialInquiries", "SerialInquiries");
                    }
                    else {
                        var ReportHTML = '';
                        ReportHTML += '<html>';
                        ReportHTML += '     <head><title>Serial Inquiries</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                        ReportHTML += '         <body style="background-color:white;">';
                        ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Serial Inquiries</h3></div> </br>';

                        ReportHTML += '             <div class="col-xs-4" style="clear:both;"><b>Serial : </b>' + ($('#txtSerial').val().trim() != '' ? $('#txtSerial').val() : '') + '</div>';

                        ReportHTML += pTablesHTML;

                        ReportHTML += '</html>';

                        var mywindow = window.open('', '_blank');
                        mywindow.document.write(ReportHTML);
                        mywindow.document.close();
                    }




                }
                , null);
        }
    }
}

function PrintHtmlReport_123(pOutputTo) {
    debugger;
    var whereClause = " where P.WarehouseToID>0";

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and P.CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and P.OwnerID in (" + $('#slOwners').val().toString() + ")";
    if ($('#slWarehouses option:selected').length > 0)
        whereClause += " and P.WarehouseID in (" + $('#slWarehouses').val().toString() + ")";
    if ($('#slWarehousesTo option:selected').length > 0)
        whereClause += " and P.WarehouseToID in (" + $('#slWarehousesTo').val().toString() + ")";
    if ($('#txtFromCreation').val().trim() != '')
        whereClause += " and P.FinalizeDate>='" + ConvertDateFormat($('#txtFromCreation').val()).trim() + "'";
    if ($('#txtToCreation').val().trim() != '')
        whereClause += " and Cast(P.FinalizeDate as date)<='" + ConvertDateFormat($('#txtToCreation').val().trim()) + "'";
   
        FadePageCover(true);

    var query = ` select P.Code PickupCode, R.Code ReceiveCode, C.Name CustomerName, O.Name OwnerName, WF.Name WarehouseName, WT.Name WarehouseToName,
I.Code ItemCode, I.Name ItemName, PT.Name UOM, PDL.PickedQuantity Quantity, PDL.PDL_PalletID PalletID, IB.ProductionDate, IB.ExpirationDate,
U.Name CreatorUserName, P.FinalizeDate CreationDate
from WH_Pickup P left join WH_PickupDetails PD on
P.ID=PD.PickupID
left join WH_PickupDetailsLocation PDL on
PD.ID=PDL.PickupDetailsID
left join Customers C on
P.CustomerID=C.ID
left join Owners O on
P.OwnerID=O.ID
left join WH_Warehouse WF on
P.WarehouseID=WF.ID
left join WH_Warehouse WT on
P.WarehouseToID=WT.ID
left join PurchaseItem I on
PD.PurchaseItemID=I.ID
left join PackageTypes PT on
PD.PD_PackageTypeID=PT.ID
left join WH_ItemBalance IB on
PDL.ItemBalanceID=IB.ID
left join Users U on
P.FinalizeUserID=U.ID
left join WH_Receive R on
P.ID=R.MasterFile
    ${whereClause} Order By P.FinalizeDate`;
        CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "123" }
            , function (pData) {
                debugger;
                FadePageCover(false);
                var data = JSON.parse(pData);


                var pTablesHTML = "";

                pTablesHTML += '                         <table id="tblWarehouseTransfer" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
                pTablesHTML += '                             <thead>';
                pTablesHTML += '                                 <tr>';
                pTablesHTML += '                                     <th>WH</th>';
                pTablesHTML += '                                     <th>WH To</th>';
                pTablesHTML += '                                     <th>Outbound No</th>';
                pTablesHTML += '                                     <th>Inbound No</th>';
                pTablesHTML += '                                     <th>Owner</th>';
                pTablesHTML += '                                     <th>Project</th>';
                pTablesHTML += '                                     <th>Item</th>';
                pTablesHTML += '                                     <th>Desc</th>';
                pTablesHTML += '                                     <th>UOM</th>';
                pTablesHTML += '                                     <th>Pallet ID</th>';
                pTablesHTML += '                                     <th>Quantity</th>';
                pTablesHTML += '                                     <th>Transfered On</th>';
                pTablesHTML += '                                     <th>Transfered By</th>';
                pTablesHTML += '                                 </tr>';
                pTablesHTML += '                             </thead>';
                pTablesHTML += '                             <tbody>';
                debugger;

                $.each(data, function (i, item) {
                    pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                    pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.WarehouseToName == 0 ? '' : item.WarehouseToName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PickupCode == 0 ? '' : item.PickupCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ReceiveCode == 0 ? '' : item.ReceiveCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.CreationDate == '1900/01/01' ? '' : GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate)) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.CreatorUserName == 0 ? '' : item.CreatorUserName) + '</td>';
                    pTablesHTML += '                                     </tr>';
                });
                pTablesHTML += '                             </tbody>';
                pTablesHTML += '                         </table>';
                $("#hExportedTable").html(pTablesHTML);
                if (pOutputTo == "Excel") {
                    ExportHtmlTableToCsv_RemovingCommasForNumbers("tblWarehouseTransfer", "Warehouse Transfer");
                }
                else {
                    var ReportHTML = '';
                    ReportHTML += '<html>';
                    ReportHTML += '     <head><title>Warehouse Transfer</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                    ReportHTML += '         <body style="background-color:white;">';
                    ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Warehouse Transfer</h3></div> </br>';

                    ReportHTML += '             <div class="col-xs-6"><b>Warehouses : </b>' + ($('#slWarehouses option:selected').length > 0 ? GetSelect2MultiText($('#slWarehouses')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-6"><b>Warehouses To : </b>' + ($('#slWarehousesTo option:selected').length > 0 ? GetSelect2MultiText($('#slWarehousesTo')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-6"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>From Date : </b>' + ($('#txtFromDate').val().trim() != '' ? $('#txtFromDate').val() : '') + '</div>';

                    ReportHTML += '             <div class="col-xs-6"><b>To Date : </b>' + ($('#txtToDate').val().trim() != '' ? $('#txtToDate').val() : '') + '</div>';


                    ReportHTML += pTablesHTML;

                    ReportHTML += '</html>';

                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }




            }
            , null);
    
}

function PrintHtmlReport_124(pOutputTo) {
    debugger;
    var whereClause = " where 1=1";

    if ($('#slCustomers option:selected').length > 0)
        whereClause += " and CustomerID in (" + $('#slCustomers').val().toString() + ")";
    if ($('#slOwners option:selected').length > 0)
        whereClause += " and OwnerID in (" + $('#slOwners').val().toString() + ")";
    

    FadePageCover(true);

    var query = `select * from vwWH_CustomerItemSummary
    ${whereClause}
order by CustomerName, OwnerName, ItemCode`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "124" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);
            
            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblCustomerItemSummary" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Owner</th>';
            pTablesHTML += '                                     <th>Project</th>';
            pTablesHTML += '                                     <th>Item</th>';
            pTablesHTML += '                                     <th>Desc</th>';
            pTablesHTML += '                                     <th>Received Qty</th>';
            pTablesHTML += '                                     <th>Adjusted Qty</th>';
            pTablesHTML += '                                     <th>Transferred Qty</th>';
            pTablesHTML += '                                     <th>Picked Qty</th>';
            pTablesHTML += '                                     <th>Total Qty</th>';
            pTablesHTML += '                                     <th>Stock Qty</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OwnerName == 0 ? '' : item.OwnerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + item.ReceivedQuantity + '</td>';
                pTablesHTML += '                                         <td>' + item.AdjustedQuantity + '</td>';
                pTablesHTML += '                                         <td>' + item.TransferredQuantity + '</td>';
                pTablesHTML += '                                         <td>' + item.PickedQuantity + '</td>';
                pTablesHTML += '                                         <td>' + item.TotalQuantity + '</td>';
                pTablesHTML += '                                         <td>' + item.StockQuantity + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCustomerItemSummary", "Customer Item Summary");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Customer Item Summary</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 ' + (pDefaults.UnEditableCompanyName == "FPL" ? "" : "text-center") + '"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style="' + (pDefaults.UnEditableCompanyName == "FPL" ? "width:20%;margin-top:1%;" : "") + '"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Customer Item Summary</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-6" style="clear:both;"><b>Owners : </b>' + ($('#slCustomers option:selected').length > 0 ? GetSelect2MultiText($('#slCustomers')) : '') + '</div>';

                ReportHTML += '             <div class="col-xs-6"><b>Projects : </b>' + ($('#slOwners option:selected').length > 0 ? GetSelect2MultiText($('#slOwners')) : '') + '</div>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            
        }
        , null);

}

function ClearFilters() {
    $('div.filters').find('input').val('');
    $('div.filters').find('select').val('').change();
}

function ResetOrderTypes() {
    $('#slOrderTypes').html('<option value="0">All</option>');
    $('#slOrderTypes').append('<option value="1">Inbound</option>');
    $('#slOrderTypes').append('<option value="2">Outbound</option>');
    $('#slOrderTypes').append('<option value="3" class="Extra">Putaway</option>');
    $('#slOrderTypes').append('<option value="4" class="Extra">Move</option>');
    $('#slOrderTypes').append('<option value="5" class="Extra">Adjust</option>');
    $('#slOrderTypes').append('<option value="6" class="Extra">ItemTransfer</option>');
}

function PrintHtmlReport_14(pOutputTo, pExportTemplate) {
    debugger;
    var whereClause = pExportTemplate ? "where Quantity>IsNull(PickedQuantity,0)" :"where IsInventoryDefected=1 and  Quantity>IsNull(PickedQuantity,0)";

    if ($('#slWarehouse').val() > 0)
        whereClause += " and WarehouseID=" + $('#slWarehouse').val() + "";
    if ($('#slCustomer').val() > 0)
        whereClause += " and CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slProduct').val() > 0)
        whereClause += " and PurchaseItemID=" + $('#slProduct').val() + "";
    if (IsNull($('#txtLocation').val(),'').trim() != '')
        whereClause += " and LocationCode like N'%" + $('#txtLocation').val().trim() + "%'";
    if (IsNull($('#txtPalletID').val(), '').trim() != '')
        whereClause += " and PalletID like N'%" + $('#txtPalletID').val().trim() + "%'";

    if (whereClause == "where Quantity>IsNull(PickedQuantity,0)") {
        swal("Please, select warehouse");
        return;
    }
    FadePageCover(true);

    var query = `With P(ReceiveDetailsID, PickedQuantity)
as
(
select PDL.ReceiveDetailsID, Sum(PDL.PickedQuantity)
	from WH_Pickup P join WH_PickupDetails PD on P.ID=PD.PickupID
	join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
	where P.IsFinalized=1
	group by ReceiveDetailsID
)
select * from (
select RD.ID, RD.ReceiveID, R.Code ReceiveCode, R.CustomerID, C.Name CustomerName, 
AR.WarehouseID, W.Name WarehouseName, RL.Code LocationCode, IsNull(RD.PalletID,'') PalletID,
RD.PurchaseItemID, I.Code PurchaseItemCode, I.Name PurchaseItemName,
IsNull(RD.IsExcluded,0) IsInventoryDefected, IsNull(RD.LotNo,'') InventoryDefectionReason, RD.Quantity
from WH_Receive R
left join WH_ReceiveDetails RD on
R.ID=RD.ReceiveID 
left join WH_RowLocation RL on
RD.LocationID=RL.ID
left join WH_Row RW on
RL.RowID=RW.ID
left join WH_Area AR on
RW.AreaID=AR.ID
left join WH_Warehouse W on
AR.WarehouseID=W.ID
left join Customers C on
R.CustomerID=C.ID
left join PurchaseItem I on
RD.PurchaseItemID=I.ID
where R.IsFinalized=1
) as R
left join P on R.ID=P.ReceiveDetailsID
${whereClause}

`;
    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", { Query: query, ReportType: "14" }
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblDefectedInventory" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            if (pExportTemplate)
                pTablesHTML += '                                     <th>ID</th>';
            pTablesHTML += '                                     <th>Customer</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>Pallet</th>';
            pTablesHTML += '                                     <th>Item Code</th>';
            pTablesHTML += '                                     <th>Item Name</th>';
            pTablesHTML += '                                     <th>Is Defected</th>';
            pTablesHTML += '                                     <th>Reason</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                if (pExportTemplate)
                    pTablesHTML += '                                         <td>' + (item.ID == 0 ? 0 : item.ID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PurchaseItemCode == 0 ? '' : item.PurchaseItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.IsInventoryDefected == 0 ? 0 : item.IsInventoryDefected) + '</td>';
                pTablesHTML += '                                         <td>' + (item.InventoryDefectionReason == 0 ? '' : item.InventoryDefectionReason) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblDefectedInventory", "DefectedInventory");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Defected Inventory</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Defected Inventory</h3></div> </br>';



                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_15(pOutputTo) {
    debugger;

    FadePageCover(true);

    //Receive
    var whereClause = "where IsFinalized=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and CustomerID=" + $('#slCustomer').val() + "";
    if ($('#txtFromDate').val() != '')
        whereClause += " and ReceiveDate>='" + PadDateWithZeroes($('#txtFromDate').val().trim(),true) + "'";
    if ($('#txtToDate').val() != '')
        whereClause += " and Cast(ReceiveDate as date)<='" + PadDateWithZeroes($('#txtToDate').val().trim(), true) + "'";
    
    var query = `With Forklift(ReceiveID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=1 and S.Name=N'Forklift'
	group by TS.TransSourceID, TS.ServiceID
), Laborer(ReceiveID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=1 and S.Name=N'Laborer'
	group by TS.TransSourceID, TS.ServiceID
), Packing(ReceiveID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=1 and S.Name=N'Packing'
	group by TS.TransSourceID, TS.ServiceID
), RD(ReceiveID, Qty)
as
(
	select RD.ReceiveID, Sum(RD.Quantity)
	from WH_ReceiveDetails RD
	group by RD.ReceiveID
)
, Pallets(ReceiveID, Qty)
as
(
	select ReceiveID, Count(PalletID) from (
	select RD.ReceiveID, RD.PalletID
	from WH_ReceiveDetails RD
	group by RD.ReceiveID, RD.PalletID
	) as D group by ReceiveID
)
select R.Code, R.ReceiveDate, R.CustomerID, C.Name CustomerName, R.Location, 
EM.Name EquipmentTypeName, R.DriverName, Forklift.Qty ForkliftQty, Laborer.Qty LaborerQty, Packing.Qty PackingQty,
RD.Qty, Pallets.Qty PalletsQty, R.Cards, R.Rep, R.Notes
from WH_Receive R
left join Customers C on
R.CustomerID=C.ID
left join TRCK_Equipments E on
R.EquipmentID=E.ID
left join TRCK_EquipmentModel EM on
E.EquipmentTypeID=EM.ID
left join Forklift on
R.ID=Forklift.ReceiveID
left join Laborer on
R.ID=Laborer.ReceiveID
left join Packing on
R.ID=Packing.ReceiveID
left join RD on
R.ID=RD.ReceiveID
left join Pallets on
R.ID=Pallets.ReceiveID
${whereClause}
order by R.Code`;

    var params = { ReportType: "15" };
    params['Query'] = query;

    //Pickup
    whereClause = "where IsFinalized=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and P.CustomerID=" + $('#slCustomer').val() + "";
    if ($('#txtFromDate').val() != '')
        whereClause += " and OrderDate>='" + PadDateWithZeroes($('#txtFromDate').val().trim(),true) + "'";
    if ($('#txtToDate').val() != '')
        whereClause += " and Cast(OrderDate as date)<='" + PadDateWithZeroes($('#txtToDate').val().trim(), true) + "'";

    var query = `With Forklift(PickupID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=2 and S.Name=N'Forklift'
	group by TS.TransSourceID, TS.ServiceID
), Laborer(PickupID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=2 and S.Name=N'Laborer'
	group by TS.TransSourceID, TS.ServiceID
), Packing(PickupID, Qty)
as
(
	select TS.TransSourceID, Sum(TS.Quantity)
	from WH_TransServices TS join WH_Services S on TS.ServiceID=S.ID
	where TS.Direction=2 and S.Name=N'Packing'
	group by TS.TransSourceID, TS.ServiceID
), RD(PickupID, Qty)
as
(
	select PD.PickupID, Sum(PDL.PickedQuantity)
	from WH_PickupDetails PD join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
	group by PD.PickupID
)
, Pallets(PickupID, Qty)
as
(
    select PickupID, Count(PalletID) from (
	select PD.PickupID, RD.PalletID
	from WH_PickupDetails PD join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
	join WH_ReceiveDetails RD on PDL.ReceiveDetailsID=RD.ID
	group by PD.PickupID, RD.PalletID
    ) as D group by PickupID
)
select P.Code, P.OrderDate, P.CustomerID, C.Name CustomerName, P.Location, U.Name EndUserName, P.RMANumber,
EM.Name EquipmentTypeName, P.DriverName, Forklift.Qty ForkliftQty, Laborer.Qty LaborerQty, Packing.Qty PackingQty,
RD.Qty, Pallets.Qty PalletsQty, P.Cards, P.Rep, P.Notes
from WH_Pickup P
left join Customers C on
P.CustomerID=C.ID
left join TRCK_Equipments E on
P.EquipmentID=E.ID
left join TRCK_EquipmentModel EM on
E.EquipmentTypeID=EM.ID
left join Forklift on
P.ID=Forklift.PickupID
left join Laborer on
P.ID=Laborer.PickupID
left join Packing on
P.ID=Packing.PickupID
left join RD on
P.ID=RD.PickupID
left join Pallets on
P.ID=Pallets.PickupID
left join Users U on
P.EndUserID=U.ID
${whereClause}
order by P.Code`;

    params['Query2'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblReceiveWithServ" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            if (pOutputTo == "Print") {
                pTablesHTML += '                                 <tr style="background-color:yellow;font-size:medium;">';
                pTablesHTML += '                                     <th colspan="15">Receive</th>';
                pTablesHTML += '                                 </tr>';
            }
            pTablesHTML += '                                 <tr style="background-color:skyblue;">';
            pTablesHTML += '                                     <th>Date</th>';
            pTablesHTML += '                                     <th>Client</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>ASN NO</th>';
            pTablesHTML += '                                     <th>Type Of Truck</th>';
            pTablesHTML += '                                     <th>Driver</th>';
            pTablesHTML += '                                     <th>Forklift</th>';
            pTablesHTML += '                                     <th>Laborer</th>';
            pTablesHTML += '                                     <th>Packing</th>';
            pTablesHTML += '                                     <th>QTY</th>';
            pTablesHTML += '                                     <th>No Of Paleet</th>';
            pTablesHTML += '                                     <th>كارتات</th>';
            pTablesHTML += '                                     <th>Code</th>';
            pTablesHTML += '                                     <th>المندوب</th>';
            pTablesHTML += '                                     <th>Note</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data.Receive, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate)))+ '</td>';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Location == 0 ? '' : item.Location) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.EquipmentTypeName == 0 ? '' : item.EquipmentTypeName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.DriverName == 0 ? '' : item.DriverName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ForkliftQty == 0 ? '' : item.ForkliftQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LaborerQty == 0 ? 0 : item.LaborerQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PackingQty == 0 ? '' : item.PackingQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Qty == 0 ? '' : item.Qty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletsQty == 0 ? '' : item.PalletsQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Cards == 0 ? '' : item.Cards) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Rep == 0 ? '' : item.Rep) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            pTablesHTML += '                         </br>';

            pTablesHTML += '                         <table id="tblPickupWithServ" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            if (pOutputTo == "Print") {
                pTablesHTML += '                                 <tr style="background-color:yellow;font-size:medium;">';
                pTablesHTML += '                                     <th colspan="15">Pickup</th>';
                pTablesHTML += '                                 </tr>';
            }
            pTablesHTML += '                                 <tr style="background-color:skyblue;">';
            pTablesHTML += '                                     <th>Date</th>';
            pTablesHTML += '                                     <th>End User</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>D/N</th>';
            pTablesHTML += '                                     <th>Type Of Truck</th>';
            pTablesHTML += '                                     <th>Driver</th>';
            pTablesHTML += '                                     <th>Forklift</th>';
            pTablesHTML += '                                     <th>Laborer</th>';
            pTablesHTML += '                                     <th>Packing</th>';
            pTablesHTML += '                                     <th>QTY</th>';
            pTablesHTML += '                                     <th>No Of Paleet</th>';
            pTablesHTML += '                                     <th>كارتات</th>';
            pTablesHTML += '                                     <th>Code</th>';
            pTablesHTML += '                                     <th>المندوب</th>';
            pTablesHTML += '                                     <th>Note</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data.Pickup, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.OrderDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.OrderDate))) + '</td>';
                pTablesHTML += '                                         <td>' + (item.EndUserName == 0 ? '' : item.EndUserName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Location == 0 ? '' : item.Location) + '</td>';
                pTablesHTML += '                                         <td>' + (item.RMANumber == 0 ? '' : item.RMANumber) + '</td>';
                pTablesHTML += '                                         <td>' + (item.EquipmentTypeName == 0 ? '' : item.EquipmentTypeName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.DriverName == 0 ? '' : item.DriverName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ForkliftQty == 0 ? '' : item.ForkliftQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LaborerQty == 0 ? 0 : item.LaborerQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PackingQty == 0 ? '' : item.PackingQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Qty == 0 ? '' : item.Qty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletsQty == 0 ? '' : item.PalletsQty) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Cards == 0 ? '' : item.Cards) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? '' : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Rep == 0 ? '' : item.Rep) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblReceiveWithServ", "ReceiveWithServices");
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblPickupWithServ", "PickupWithServices");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>ReceiveAndPickupWithServices</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Receive And Pickup With Services</h3></div> </br>';



                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }




        }
        , null);

}

function PrintHtmlReport_16(pOutputTo) {
    debugger;

    FadePageCover(true);

    //Receive
    var whereClause = "where PalletPicked>0";

    if ($('#slCustomer').val() > 0)
        whereClause += " and CustomerID=" + $('#slCustomer').val() + "";

    var query = `With P(ID, PickupCode, PickupDate, PickedQuantity, ReceiveDetailsID)
as
(
	select P.ID, P.Code, P.OrderDate, PDL.PickedQuantity, PDL.ReceiveDetailsID
	from WH_Pickup P join WH_PickupDetails PD on
	P.ID=PD.PickupID
	join WH_PickupDetailsLocation PDL on
	PD.ID=PDL.PickupDetailsID
	where P.IsFinalized=1
), RP(ReceiveID, PalletReceived)
as
(
	select RD.ReceiveID, Count(IsNull(RD.PalletID,''))
	from WH_Receive R join WH_ReceiveDetails RD on 
	R.ID=RD.ReceiveID
	where R.IsFinalized=1
	group by RD.ReceiveID
)
select CustomerID, C.Name CustomerName, ReceiveCode, ReceiveDate, PickupCode, PickupDate, PalletReceived, PalletPicked, PalletReceived-PalletPicked PalletRemain 
from (
select ReceiveCode, CustomerID, ReceiveDate, PalletID, Quantity, PickupCode, PickupDate, PickedQuantity, OldPickedQuantity, (((OldPickedQuantity/Quantity) + (PickedQuantity/Quantity)) * 100)/100 PalletPicked,
RP.PalletReceived
from (
select R.CustomerID, R.ReceiveDate, RD.ReceiveID, R.Code ReceiveCode, RD.PalletID, RD.Quantity, P.PickupCode, P.PickupDate, P.PickedQuantity, P.ID, P.ReceiveDetailsID,
(select IsNull(Sum(IsNull(PDL.PickedQuantity,0)),0) from WH_Pickup PP join WH_PickupDetails PD on PP.ID=PD.PickupID join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID join WH_ReceiveDetails RDD on PDL.ReceiveDetailsID=RDD.ID where RDD.ReceiveID=RD.ReceiveID and PP.ID<P.ID) OldPickedQuantity
from WH_Receive R join WH_ReceiveDetails RD on
R.ID=RD.ReceiveID
left join P on
RD.ID=P.ReceiveDetailsID
where R.IsFinalized=1 and RD.Quantity>0 --and R.Code='R25-0243'
) as D join RP on
D.ReceiveID=RP.ReceiveID
) as D join Customers C on D.CustomerID=C.ID
${whereClause}
order by CustomerID`;

    var params = { ReportType: "16" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);


            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblReceiveVsPickupByPallet" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr style="background-color:skyblue;">';
            pTablesHTML += '                                     <th>Client</th>';
            pTablesHTML += '                                     <th>Rec.Code</th>';
            pTablesHTML += '                                     <th>Rec.Date</th>';
            pTablesHTML += '                                     <th>Pic.Code</th>';
            pTablesHTML += '                                     <th>Pic.Date</th>';
            pTablesHTML += '                                     <th>Rec.Pallets</th>';
            pTablesHTML += '                                     <th>Pic.Pallets</th>';
            pTablesHTML += '                                     <th>Remain</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ReceiveCode == 0 ? '' : item.ReceiveCode) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PickupCode == 0 ? '' : item.PickupCode) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickupDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PickupDate))) + '</td>';
                pTablesHTML += '                                         <td>' + item.PalletReceived + '</td>';
                pTablesHTML += '                                         <td>' + item.PalletPicked + '</td>';
                pTablesHTML += '                                         <td>' + item.PalletRemain + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblReceiveVsPickupByPallet", "ReceiveVsPickupByPallet");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Receive Vs Pickup By Pallet</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Receive Vs Pickup By Pallet</h3></div> </br>';



                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            
        }
        , null);

}

function PrintHtmlReport_17(pOutputTo) {
    debugger;
    
    FadePageCover(true);

    var whereClause = "where 1=1";

    if ($('#slCustomer').val()>0)
        whereClause += " and CustomerID = " + $('#slCustomer').val() + "";
  
    var query = `with Locations(CustomerID,LocationCount)
as
(
	select CustomerID, sum(case when LocationCount>0 then LocationCount else 1 end) from (
	select R.CustomerID, RD.LocationID, RD.LocationCount
	from WH_Receive R join WH_ReceiveDetails RD on R.ID=RD.ReceiveID
	left join WH_PickupDetailsLocation PDL on RD.ID=PDL.ReceiveDetailsID
	left join WH_PickupDetails PD on PD.ID=PDL.PickupDetailsID
	left join WH_Pickup P on P.ID=PD.PickupID
	where R.IsFinalized=1 and RD.Quantity>ISNULL(case P.IsFinalized when 1 then PDL.PickedQuantity else 0 end,0) and RD.LocationID>0
	group by R.CustomerID, RD.LocationID, RD.LocationCount
	) as D group by CustomerID
), Pallets(CustomerID,PalletCount)
as
(
	select CustomerID, Count(*) from (
	select R.CustomerID, RD.PalletID
	from WH_Receive R join WH_ReceiveDetails RD on R.ID=RD.ReceiveID
	left join WH_PickupDetailsLocation PDL on RD.ID=PDL.ReceiveDetailsID
	left join WH_PickupDetails PD on PD.ID=PDL.PickupDetailsID
	left join WH_Pickup P on P.ID=PD.PickupID
	where R.IsFinalized=1 and RD.Quantity>ISNULL(case P.IsFinalized when 1 then PDL.PickedQuantity else 0 end,0) and IsNull(RD.PalletID,'')<>''
	group by R.CustomerID, RD.PalletID
	) as D group by CustomerID
)
select * from (
select L.CustomerID, C.Name CustomerName, L.LocationCount, P.PalletCount
from Locations L join Pallets P on L.CustomerID=P.CustomerID
join Customers C on L.CustomerID=C.ID
) as D
${whereClause}
order by CustomerName`;

    var params = { ReportType: "17" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);
            
            var pTablesHTML = "";
            pTablesHTML += '                         <table id="tblClientSpaceOccupied" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Customer</th>';
            pTablesHTML += '                                     <th>Locations</th>';
            pTablesHTML += '                                     <th>Pallets</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + item.CustomerName + '</td>';
                pTablesHTML += '                                         <td>' + item.LocationCount + '</td>';
                pTablesHTML += '                                         <td>' + item.PalletCount + '</td>';
                pTablesHTML += '                                     </tr>';
            });

            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblClientSpaceOccupied", "ClientSpaceOccupied");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Client Space Occupied</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Client Space Occupied</h3></div> </br>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }
        , null);

}

function PrintHtmlReport_18(pOutputTo) {
    debugger;

    
    FadePageCover(true);

    var whereClause = "where R.IsFinalized=1";

    if ($('#txtSerial').val().trim() != '')
        whereClause += " and RDS.Serial='" + $('#txtSerial').val().trim() + "'";

    var query = `With P(ID, Code, PickupDate, PickedAt, PickedBy)
as(
	select PDL.ID, P.Code, P.OrderDate, PDL.CreationDate, U.Name
	from WH_Pickup P join WH_PickupDetails PD on P.ID=PD.PickupID
	join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
	join Users U on PDL.CreatorUserID=U.ID
	where P.IsFinalized=1
)
select RDS.Serial, I.Code ItemCode, I.Name ItemName, RD.PalletID, 
RL.Code LocationCode, W.Name WarehouseName, C.Name CustomerName, 
R.Code ReceiveCode, R.ReceiveDate, RDS.CreationDate ReceivedAt, U.Name ReceivedBy,
P.Code PickupCode, P.PickupDate, P.PickedAt, P.PickedBy
from WH_Receive R join WH_ReceiveDetails RD on R.ID=RD.ReceiveID
join WH_ReceiveDetailsSerial RDS on RD.ID=RDS.ReceiveDetailsID
join PurchaseItem I on RD.PurchaseItemID=I.ID
join Customers C on R.CustomerID=C.ID
join WH_RowLocation RL on RD.LocationID=RL.ID
join WH_Row RW on RW.ID=RL.RowID
join WH_Area A on A.ID=RW.AreaID
join WH_Warehouse W on A.WarehouseID=W.ID
join Users U on RDS.CreatorUserID=U.ID
left join P on RDS.PickupDetailsLocationID=P.ID
${whereClause}
`;

    var params = { ReportType: "18" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);

            var pTablesHTML = "";
            pTablesHTML += '                         <table id="tblTracingSerial" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Serial</th>';
            pTablesHTML += '                                     <th>Item Code</th>';
            pTablesHTML += '                                     <th>Item Name</th>';
            pTablesHTML += '                                     <th>Pallet</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Customer</th>';
            pTablesHTML += '                                     <th>Receive Code</th>';
            pTablesHTML += '                                     <th>Receive Date</th>';
            pTablesHTML += '                                     <th>Received At</th>';
            pTablesHTML += '                                     <th>Received By</th>';
            pTablesHTML += '                                     <th>Pickup Code</th>';
            pTablesHTML += '                                     <th>Pickup Date</th>';
            pTablesHTML += '                                     <th>Picked At</th>';
            pTablesHTML += '                                     <th>Picked By</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.Serial == 0 ? '' : item.Serial) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PalletID == 0 ? '' : item.PalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.LocationCode == 0 ? '' : item.LocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ReceiveCode == 0 ? '' : item.ReceiveCode) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceivedAt)) < 1 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.ReceivedAt)) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ReceivedBy == 0 ? '' : item.ReceivedBy) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PickupCode == 0 ? '' : item.PickupCode) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickupDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PickupDate))) + '</td>';
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickedAt)) < 1 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.PickedAt)) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PickedBy == 0 ? '' : item.PickedBy) + '</td>';
                pTablesHTML += '                                     </tr>';
            });

            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTracingSerial", "Tracing Serial");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Tracing Serial</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Tracing Serial</h3></div> </br>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }
        , null);

}

function PrintHtmlReport_19(pOutputTo) {
    debugger;

    
    if (!$('#cbByPallet').is(':checked') && !$('#cbByLocation').is(':checked')) {
        swal("Please","select ByPallet or ByLocation");
        return;
    }
    FadePageCover(true);

    var whereClause ="where 1=1";
    var orderby ="order by PalletID, LocationCode";

    if ($('#txtLocation').val().trim() != '')
        whereClause += " and LocationCode='" + $('#txtLocation').val().trim() + "'";
    if ($('#txtPalletID').val().trim() != '')
        whereClause += " and PalletID='" + $('#txtPalletID').val().trim() + "'";

    if ($('#cbByLocation').is(':checked'))
        orderby = "order by LocationCode, PalletID";

    var query = `With PDL (ReceiveDetailsID, PickedQuantity)
as
(
	select PDL.ReceiveDetailsID, sum(isnull(PDL.PickedQuantity,0))
	from WH_Pickup P join WH_PickupDetails PD on P.ID=PD.PickupID
	join WH_PickupDetailsLocation PDL on PD.ID=PDL.PickupDetailsID
	where P.IsFinalized=1
	group by PDL.ReceiveDetailsID
)
select * from (
select RD.PalletID, RL.Code LocationCode
from WH_Receive R join WH_ReceiveDetails RD on R.ID=RD.ReceiveID
join WH_RowLocation RL on RD.LocationID=RL.ID
left join PDL on RD.ID=PDL.ReceiveDetailsID
where R.IsFinalized=1
and ISNULL(RD.PalletID,'')<>'' and RD.LocationID>0
and isnull(RD.Quantity,0)>isnull(PDL.PickedQuantity,0)
group by RD.PalletID, RL.Code
) as D
${whereClause}
${orderby}`;

    var params = { ReportType: "19" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);

            var dataDic = {};
            if ($('#cbByPallet').is(':checked')) {
                $.each(data, function (i, item) {
                    if (dataDic[item.PalletID]) {
                        dataDic[item.PalletID]['Details'].push(item.LocationCode);
                    }
                    else {
                        dataDic[item.PalletID] = {
                            Details:[item.LocationCode]
                        }
                    }
                });
            }
            else {
                $.each(data, function (i, item) {
                    if (dataDic[item.LocationCode]) {
                        dataDic[item.LocationCode]['Details'].push(item.PalletID);
                    }
                    else {
                        dataDic[item.LocationCode] = {
                            Details: [item.PalletID]
                        }
                    }
                });
            }

            var pTablesHTML = "";
            pTablesHTML += '                         <table id="tblPalletAndLocation" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            if ($('#cbByPallet').is(':checked')) {
                pTablesHTML += '                                     <th>PalletID</th>';
                pTablesHTML += '                                     <th>Location</th>';
            }
            else {
                pTablesHTML += '                                     <th>Location</th>';
                pTablesHTML += '                                     <th>PalletID</th>';
            }
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(dataDic, function (g, group) {
                if (group.Details.length > 1) {
                    pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                    pTablesHTML += '                                         <td>' + g + '</td>';
                    pTablesHTML += '                                         <td>' + group.Details[0] + '</td>';
                    pTablesHTML += '                                     </tr>';

                    for (var i = 1; i < group.Details.length; i++) {
                        pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                        pTablesHTML += '                                         <td></td>';
                        pTablesHTML += '                                         <td>' + group.Details[i] + '</td>';
                        pTablesHTML += '                                     </tr>';
                    }
                }
            });
       
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblPalletAndLocation", "PalletAndLocation");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Pallet And Location</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Pallet And Location</h3></div> </br>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }
        , null);

}

function PrintHtmlReport_20(pOutputTo) {
    debugger;

    FadePageCover(true);

    var whereClause = "where 1=1";

    if ($('#slProduct').val() > 0)
        whereClause += " and PurchaseItemID=" + $('#slProduct').val() + "";
    if ($('#txtFromDate').val() != '')
        whereClause += " and ModificationDate>='" + PadDateWithZeroes($('#txtFromDate').val().trim(), true) + "'";
    if ($('#txtToDate').val() != '')
        whereClause += " and Cast(ModificationDate as date)<='" + PadDateWithZeroes($('#txtToDate').val().trim(), true) + "'";

    var query = `select * from vwProductReallocationLog ${whereClause}`;

    var params = { ReportType: "20" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);
            
            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblMoves" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Item</th>';
            pTablesHTML += '                                     <th>Quantity</th>';
            pTablesHTML += '                                     <th>From Location</th>';
            pTablesHTML += '                                     <th>To Location</th>';
            pTablesHTML += '                                     <th>Moved By</th>';
            pTablesHTML += '                                     <th>Moved At</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + (item.PurchaseItemName == 0 ? '' : item.PurchaseItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.MovedQuantity == 0 ? '' : item.MovedQuantity) + '</td>';
                pTablesHTML += '                                         <td>' + (item.FromLocationCode == 0 ? '' : item.FromLocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ToLocationCode == 0 ? '' : item.ToLocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ModificatorUserName == 0 ? '' : item.ModificatorUserName) + '</td>';
                pTablesHTML += '                                         <td>' +  GetFullDateTime_DD_MM_YY_hh_mm(item.ModificationDate) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblMoves", "Moves");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Moves</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Moves</h3></div> </br>';
                
                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }
        , null);

}

function PrintHtmlReport_21(pOutputTo) {
    debugger;

    FadePageCover(true);

    var whereClause = "where 1=1";

    if ($('#slCustomer').val() > 0)
        whereClause += " and CustomerID=" + $('#slCustomer').val() + "";
    if ($('#slProduct').val() > 0)
        whereClause += " and PurchaseItemID=" + $('#slProduct').val() + "";
    if ($('#txtFromDate').val() != '')
        whereClause += " and CreationDate>='" + PadDateWithZeroes($('#txtFromDate').val().trim(), true) + "'";
    if ($('#txtToDate').val() != '')
        whereClause += " and Cast(CreationDate as date)<='" + PadDateWithZeroes($('#txtToDate').val().trim(), true) + "'";

    var query = `select * from (
select N'Receive' OrderType, R.Code OrderNo, R.CreationDate, R.Notes, W.Name WarehouseName, R.CustomerID, C.Name CustomerName,
RD.PurchaseItemID, I.Code ItemCode, I.Name ItemName, PT.Name UOM, RL.Code ToLocationCode,
RD.PalletID ToPalletID, RD.Quantity 
from WH_Receive R join WH_ReceiveDetails RD on
R.ID=RD.ReceiveID
left join WH_Warehouse W on
R.WarehouseID=W.ID
left join Customers C on
R.CustomerID=C.ID
left join PurchaseItem I on
RD.PurchaseItemID=I.ID
left join PackageTypes PT on
I.PackageTypeID=PT.ID
left join WH_RowLocation RL on
RD.LocationID=RL.ID
where R.IsFinalized=1

union all

select N'Pickup' OrderType, P.Code OrderNo, P.CreationDate, P.Notes, W.Name WarehouseName, P.CustomerID, C.Name CustomerName,
PD.PurchaseItemID, I.Code ItemCode, I.Name ItemName, PT.Name UOM, RL.Code ToLocationCode,
RD.PalletID ToPalletID, PDL.PickedQuantity Quantity 
from WH_Pickup P join WH_PickupDetails PD on
P.ID=PD.PickupID
join WH_PickupDetailsLocation PDL on
PD.ID=PDL.PickupDetailsID
left join WH_Warehouse W on
P.WarehouseID=W.ID
left join Customers C on
P.CustomerID=C.ID
left join PurchaseItem I on
PD.PurchaseItemID=I.ID
left join PackageTypes PT on
I.PackageTypeID=PT.ID
left join WH_ReceiveDetails RD on
RD.ID=PDL.ReceiveDetailsID
left join WH_RowLocation RL on
RD.LocationID=RL.ID
where P.IsFinalized=1
) as D
${whereClause}`;

    var params = { ReportType: "21" };
    params['Query'] = query;

    CallPOSTFunctionWithParameters("/api/_3PLStatistics/GetPrintData", params
        , function (pData) {
            debugger;
            FadePageCover(false);
            var data = JSON.parse(pData);

            var pTablesHTML = "";

            pTablesHTML += '                         <table id="tblTracingMaterial" class="table table-striped b-t b-light text-sm table-bordered" style="width: 100%; "table-layout: fixed;">'; //table-hover
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr>';
            pTablesHTML += '                                     <th>Creation</th>';
            pTablesHTML += '                                     <th>Warehouse</th>';
            pTablesHTML += '                                     <th>Customer</th>';
            pTablesHTML += '                                     <th>Order Type</th>';
            pTablesHTML += '                                     <th>Order Code</th>';
            pTablesHTML += '                                     <th>Notes</th>';
            pTablesHTML += '                                     <th>Item Code</th>';
            pTablesHTML += '                                     <th>Item Name</th>';
            pTablesHTML += '                                     <th>UOM</th>';
            pTablesHTML += '                                     <th>Location</th>';
            pTablesHTML += '                                     <th>PalletID</th>';
            pTablesHTML += '                                     <th>Quantity</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';
            debugger;

            $.each(data, function (i, item) {
                pTablesHTML += '                                     <tr class="" style="font-size:100%;">';
                pTablesHTML += '                                         <td>' + GetFullDateTime_DD_MM_YY_hh_mm(item.CreationDate) + '</td>';
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 ? '' : item.WarehouseName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CustomerName == 0 ? '' : item.CustomerName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderType == 0 ? '' : item.OrderType) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OrderNo == 0 ? '' : item.OrderNo) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Notes == 0 ? '' : item.Notes) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemCode == 0 ? '' : item.ItemCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ItemName == 0 ? '' : item.ItemName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.UOM == 0 ? '' : item.UOM) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ToLocationCode == 0 ? '' : item.ToLocationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.ToPalletID == 0 ? '' : item.ToPalletID) + '</td>';
                pTablesHTML += '                                         <td>' + (item.Quantity == 0 ? '' : item.Quantity) + '</td>';
                pTablesHTML += '                                     </tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';

            $("#hExportedTable").html(pTablesHTML);
            if (pOutputTo == "Excel") {
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTracingMaterial", "TracingMaterial");
            }
            else {
                var ReportHTML = '';
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>Tracing Material</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /><style>th, td {word-wrap:break-word;}</style></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo" style=""/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n-lg"><h3>Tracing Material</h3></div> </br>';

                ReportHTML += pTablesHTML;

                ReportHTML += '</html>';

                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
        }
        , null);

}

function UploadExcelFile_Defected() {
    debugger;

    // Checking whether FormData is available in browser  
    if (window.FormData !== undefined) {

        var data = new FormData();

        var files = $("#fileDefected").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append(files[0].name, files[0]);
            FadePageCover(true);
            $.ajax({
                url: '/api/_3PLStatistics/UploadExcelFile_Defected',
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