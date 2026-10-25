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

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function Inventory_Initialize() {
    debugger;
    $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "Inventory_BindTableRows";
    strLoadWithPagingFunctionName = "/api/Inventory/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = "WHERE CustomerID = " + pLoggedUser.CustomerID + " AND AvailableQuantity IS NOT NULL AND AvailableQuantity>0";
    var pOrderBy = pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/WebSite/WebSite_3PLInventory", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                //var pPurchaseItem = pData[3];
                var pCustomer = pData[4];
                var pLocation = pData[5];
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slFilterWarehouse", pWarehouse, null);
                //FillListFromObject(null, 9, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, null); //Loaded separately to improve performance
                FillListFromObject(null, 1, "<--Select-->", "slFilterLocation", pLocation, null);
                FillListFromObject(pLoggedUser.CustomerID, 2, "<--Select-->", "slFilterCustomer", pCustomer, null);

                $("#slFilterCustomer").attr("disabled", true);
                //$("#slFilterCustomer").html($("#hReadySlCustomers").html());
                Inventory_BindTableRows(JSON.parse(pData[0]));
                ApplySelectListSearch();
            });
        CallGETFunctionWithParameters("/api/PurchaseItem/LoadAll"
            , { pWhereClause: "WHERE 1=1" }
            , function (pData) {
                var pPurchaseItem = pData[0];
                FillListFromObject(null, 9, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, function () { ApplySelectListSearch(); });
            }
            , null, true);
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Inventory_ClearAllControls(); },
        function () { Inventory_DeleteList(); });
}
function Inventory_BindTableRows(pInventory) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblInventory");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pInventory, function (i, item) {
        AppendRowtoTable("tblInventory",
            ("<tr ID='" + item.ID + "' ondblclick='Inventory_FillAllControls(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
                //+ "<td class='BarCode'>" + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + "</td>"
                + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + "</td>"
                + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + "</td>"
                + "<td class='ReceiveCode'>" + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + "</td>"
                + "<td class='CustomerName'>" + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + "</td>"
                + "<td class='ReceiveDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + "</td>"
                + "<td class='PalletID hide'>" + (item.PalletID == 0 || item.AvailableQuantity == 0 ? "" : item.PalletID) + "</td>"
                + "<td class='Quantity'>" + (item.AvailableQuantity).toFixed(2) + "</td>"
                //+ "<td class='Quantity'>" + (item.Quantity).toFixed(2) + "</td>"
                + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + "</td>"
                + "<td class='hide'><a href='#InventoryModal' data-toggle='modal' onclick='Inventory_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                + "</td></tr>"));
    });
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
function Inventory_LoadingWithPaging() {
    debugger;
    var pWhereClause = Inventory_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Inventory_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblInventory>tbody>tr", $("#txt-Search").val().trim());
}
function Inventory_GetWhereClause() {
    debugger;
    //var pWhereClause = "WHERE IsFinalized=1 AND IsExcluded=0";
    var pWhereClause = "WHERE AvailableQuantity IS NOT NULL AND AvailableQuantity>0" + "\n";
    //if ($("#txtFilterBarCode").val().trim() != "")
    //    pWhereClause += "AND (BarCode=N'" + $("#txtFilterBarCode").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterLocation").val().trim() != "")
        pWhereClause += "AND (LocationID=N'" + $("#slFilterLocation").val() + "')" + "\n";
    if ($("#txtFilterReceiveCode").val().trim() != "")
        pWhereClause += "AND (ReceiveCode=N'" + $("#txtFilterReceiveCode").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterPurchaseItem").val().trim() != "")
        pWhereClause += "AND (PurchaseItemID=N'" + $("#slFilterPurchaseItem").val() + "' AND AvailableQuantity>0 )" + "\n";
    if ($("#slFilterCustomer").val().trim() != "")
        pWhereClause += "AND (CustomerID=N'" + $("#slFilterCustomer").val() + "' AND AvailableQuantity>0 )" + "\n";
    if ($("#txtFilterPalletID").val().trim() != "")
        pWhereClause += "AND (PalletID=N'" + $("#txtFilterPalletID").val().trim().toUpperCase() + "' AND AvailableQuantity>0 )" + "\n";
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


    return pWhereClause;
}
function Inventory_Print(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pWhereClause = Inventory_GetWhereClause();
    var pParametersWithValues = {
        pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 99999
        , pWhereClause: pWhereClause
        , pOrderBy: pDefaults.UnEditableCompanyName == "DGL" ? "PurchaseItemCode" : "LocationCode,PurchaseItemCode"
        //, pIsShowSerial: $("#cbIsShowSerial").prop("checked")
        , pIsShowSerial: $("#cbIsShowExpireDate").prop("checked") || $("#cbIsShowSerial").prop("checked") || $("#cbIsShowLotNo").prop("checked") ? true : false
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
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblInventoryReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>Location</th>';
    //pTablesHTML += '                                     <th>Barcode</th>';
    pTablesHTML += '                                     <th>Prod.Code</th>';
    pTablesHTML += '                                     <th>Prod.Name</th>';
    pTablesHTML += '                                     <th>Rec.Code</th>';
    pTablesHTML += '                                     <th>Client</th>';
    pTablesHTML += '                                     <th>Rec.Date</th>';
    pTablesHTML += '                                     <th class="hide">PalletID</th>';
    pTablesHTML += '                                     <th>Available.Qty</th>';
    if (pDefaults.UnEditableCompanyName == "NIL"
        && (!$("#cbIsShowExpireDate").prop("checked") && !$("#cbIsShowSerial").prop("checked") && !$("#cbIsShowLotNo").prop("checked") && !$("#cbIsShowVehicle").prop("checked"))
    )
        pTablesHTML += '                                     <th>Alloc.Qty</th>';
    pTablesHTML += '                                     <th>UQ</th>';
    //if ($("#cbIsShowSerial").prop("checked"))
    //    pTablesHTML += '                                     <th>Serial</th>';

    //if ($("#cbIsShowExpireDate").prop("checked"))
    //    pTablesHTML += '                                     <th>Expire Date</th>';
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
    if (pDefaults.UnEditableCompanyName == "EXP") {
        pTablesHTML += '                                     <th>Batch</th>';
        pTablesHTML += '                                     <th>Expiration</th>';
        pTablesHTML += '                                     <th>ImportedBy</th>';
        //pTablesHTML += '                                     <th>Wgt</th>';
    }
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    var _AddedLocationCode = null;
    $.each((pReportRows), function (i, item) {
        if ($("#cbIsShowSerial").prop("checked")
            && _AddedLocationCode != item.LocationCode
            && item.NumberOfAvailableSerials > 0
            && item.AvailableQuantity != item.NumberOfAvailableSerials) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
            //pTablesHTML += '                                 <td>' + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + '</td>';
            pTablesHTML += '                                 <td>' + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + '</td>';
            pTablesHTML += '                                 <td>' + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + '</td>';
            pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
            pTablesHTML += '                                 <td class="hide">' + (item.PalletID == 0 || item.AvailableQuantity == 0 ? "" : item.PalletID) + '</td>';
            pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.AvailableQuantity - item.NumberOfAvailableSerials).toFixed(2) + '</td>';
            pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + '</td>';
            pTablesHTML += '                                 <td>' + ''/*(item.Serial == 0 ? "" : item.Serial)*/ + '</td>';
            _AddedLocationCode = item.LocationCode;
        }
        pTablesHTML += '                             <tr style="font-size:95%;">';
        pTablesHTML += '                                 <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
        //pTablesHTML += '                                 <td>' + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemCode) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 || item.AvailableQuantity == 0 ? "" : item.PurchaseItemName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.ReceiveCode == 0 || item.AvailableQuantity == 0 ? "" : item.ReceiveCode) + '</td>';
        pTablesHTML += '                                 <td>' + (item.CustomerName == 0 || item.AvailableQuantity == 0 ? "" : item.CustomerName) + '</td>';
        pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 || item.AvailableQuantity == 0 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate))) + '</td>';
        pTablesHTML += '                                 <td class="hide">' + (item.PalletID == 0 || item.AvailableQuantity == 0 ? "" : item.PalletID) + '</td>';
        //if ($("#cbIsShowSerial").prop("checked"))
        //    pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.Serial == 0 ? (item.AvailableQuantity).toFixed(2) : '1.00') + '</td>';
        //else
        //    pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.AvailableQuantity).toFixed(2) + '</td>';
        //pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + '</td>';
        //if ($("#cbIsShowSerial").prop("checked"))
        //    pTablesHTML += '                                 <td>' + (item.Serial == 0 ? "" : item.Serial) + '</td>';
        if ($("#cbIsShowExpireDate").prop("checked") || $("#cbIsShowSerial").prop("checked") || $("#cbIsShowLotNo").prop("checked") || $("#cbIsShowVehicle").prop("checked"))
            pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.Serial == 0 ? (item.AvailableQuantity).toFixed(2) : '1.00') + '</td>';
        else
            pTablesHTML += '                                 <td class="AvailableQuantity">' + (item.AvailableQuantity).toFixed(2) + '</td>';
        if (pDefaults.UnEditableCompanyName == "NIL"
            && (!$("#cbIsShowExpireDate").prop("checked") && !$("#cbIsShowSerial").prop("checked") && !$("#cbIsShowLotNo").prop("checked") && !$("#cbIsShowVehicle").prop("checked"))
        )
            pTablesHTML += '                                 <td class="AllocatedQuantity">' + (item.AllocatedQuantity).toFixed(2) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 || item.AvailableQuantity == 0 ? "" : item.PackageTypeName) + '</td>';
        //if ($("#cbIsShowExpireDate").prop("checked"))
        //    pTablesHTML += '                                 <td>' + (item.ExpireDate == 0 ? "" : GetDateWithFormatMDY(item.ExpireDate)) + '</td>';
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
        if (pDefaults.UnEditableCompanyName == "EXP") {
            pTablesHTML += '                                 <td>' + (item.BatchNumber == 0 ? "" : item.BatchNumber) + '</td>';
            pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpirationDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpirationDate))) + '</td>';
            pTablesHTML += '                                 <td>' + (item.ImportedBy == 0 ? "" : item.ImportedBy) + '</td>';
            //pTablesHTML += '                                 <td>' + (item.WeightInTons == 0 ? "" : item.WeightInTons) + '</td>';
        }
        pTablesHTML += '                             </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    var _TotalQuantity = GetColumnSum("tblInventoryReport", "AvailableQuantity");
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    pTableSummary += '                                         <td class="font-bold" colspan=9>Total Quantity : ' + _TotalQuantity + '</td>';
    if (pOutputTo == "Excel")
        pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
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
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
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