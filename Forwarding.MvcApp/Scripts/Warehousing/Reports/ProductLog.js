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
function ProductLog_Initialize() {
    debugger; $("#hl-menu-Warehousing").parent().siblings().removeClass("active");
    strBindTableRowsFunctionName = "ProductLog_BindTableRows";
    strLoadWithPagingFunctionName = "/api/ProductLog/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";
    var pWhereClause = "WHERE 1=1" + " \n";
    if (pDefaults.UnEditableCompanyName != "GBL")
        pWhereClause += "AND IsFinalized=1";
    //var pWhereClause = " WHERE 1=1";
    var pOrderBy = "PurchaseItemCode,FinalizeDate";;
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadView("/Warehousing/Reports/ProductLog", "div-content", function () {
        LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
            , function (pData) {
                var pWarehouse = pData[2];
                var pPurchaseItem = pData[3];
                var pLocation = pData[4];
                var pCustomer = pData[5];
                FillListFromObject(null, 2, null/*pStrFirstRow*/, "slFilterWarehouse", pWarehouse, null);
                FillListFromObject(null, 9, "<--Select-->", "slFilterPurchaseItem", pPurchaseItem, null);
                FillListFromObject(null, 1, "<--Select-->", "slFilterLocation", pLocation, null);
                FillListFromObject(null, 2, "<--Select-->", "slFilterCustomer", pCustomer, null);
                //$("#slFilterCustomer").html($("#hReadySlCustomers").html());
                ProductLog_BindTableRows(JSON.parse(pData[0]));
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
        function () { ProductLog_ClearAllControls(); },
        function () { ProductLog_DeleteList(); });
}
function ProductLog_BindTableRows(pProductLog) {
    debugger;
    $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblProductLog");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pProductLog, function (i, item) {
        AppendRowtoTable("tblProductLog",
        ("<tr ID='" + item.ActionType + item.ID + "' " + (1 == 2 ? ("ondblclick='ProductLog_FillAllControls(" + item.ActionType + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ActionType + item.ID + "' /></td>"
            + "<td class='PurchaseItemCode'>" + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + "</td>"
            + "<td class='PurchaseItemName'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>"
            + "<td class='FinalizeDate'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + "</td>"
            + "<td class='ActionType'>" + (item.ActionType == "R" ? "Receive" : "Pickup") + "</td>"
            + "<td class='CustomerName'>" + (item.CustomerName == 0 ? "" : item.CustomerName) + "</td>"
            + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
            + "<td class='LocationCode'>" + (item.LocationCode == 0 ? "" : item.LocationCode) + "</td>"
            //+ "<td class='BarCode'>" + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + "</td>"
            //+ "<td class='PalletID hide'>" + (item.PalletID == 0 ? "" : item.PalletID) + "</td>"
            //+ "<td class='Quantity'>" + (item.AvailableQuantity).toFixed(2) + "</td>"
            + "<td class='Quantity'>" + (item.Quantity).toFixed(2) + "</td>"
            + "<td class='PackageTypeName'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='hide'><a href='#ProductLogModal' data-toggle='modal' " + (1 == 2 ? ("ondblclick='ProductLog_FillAllControls(" + item.ActionType + item.ID + ");'") : "") + editControlsText + "</a>"
        + "</td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblProductLog", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblProductLog>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ProductLog_LoadingWithPaging() {
    debugger;
    var pWhereClause = ProductLog_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "PurchaseItemCode,FinalizeDate";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ProductLog_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblProductLog>tbody>tr", $("#txt-Search").val().trim());
}
function ProductLog_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + "\n";
    if (pDefaults.UnEditableCompanyName != "GBL")
        pWhereClause += " AND IsFinalized=1 " + "\n";
    //var pWhereClause = "WHERE 1=1";
    //if ($("#txtFilterBarCode").val().trim() != "")
    //    pWhereClause += "AND (BarCode=N'" + $("#txtFilterBarCode").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterLocation").val().trim() != "")
        pWhereClause += "AND (LocationID=N'" + $("#slFilterLocation").val() + "')" + "\n";
    if ($("#txtFilterCode").val().trim() != "")
        pWhereClause += "AND (Code=N'" + $("#txtFilterCode").val().trim().toUpperCase() + "')" + "\n";
    if ($("#slFilterPurchaseItem").val().trim() != "")
        pWhereClause += "AND (PurchaseItemID=N'" + $("#slFilterPurchaseItem").val() + "')" + "\n";
    //pWhereClause += "AND (PurchaseItemID=N'" + $("#slFilterPurchaseItem").val() + "' AND AvailableQuantity>0 )" + "\n";
    if ($("#slFilterCustomer").val().trim() != "")
        pWhereClause += "AND (CustomerID=N'" + $("#slFilterCustomer").val() + "')" + "\n";
        //pWhereClause += "AND (CustomerID=N'" + $("#slFilterCustomer").val() + "' AND AvailableQuantity>0 )" + "\n";
    if ($("#txtFilterPalletID").val().trim() != "")
        pWhereClause += "AND (PalletID=N'" + $("#txtFilterPalletID").val().trim().toUpperCase() + "')" + "\n";
    if ($("#txtFilterChassisNumber").val().trim() != "")
        pWhereClause += "AND (ChassisNumber=N'" + $("#txtFilterChassisNumber").val().trim().toUpperCase() + "')" + "\n";
    if (isValidDate($("#txtFilterFromFinalizeDate").val().trim(), 1)) {
        if ($("#txtFilterFromFinalizeDate").val() != null && $("#txtFilterFromFinalizeDate").val() != "")
            pWhereClause += " AND (FinalizeDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFilterFromFinalizeDate").val()) + " 00:00:00.000')" + "\n";
    }
    if (isValidDate($("#txtFilterToFinalizeDate").val().trim(), 1)) {
        if ($("#txtFilterToFinalizeDate").val() != null && $("#txtFilterToFinalizeDate").val() != "")
            pWhereClause += " AND (FinalizeDate <= '" + GetDateWithFormatyyyyMMdd($("#txtFilterToFinalizeDate").val()) + " 23:59:59.999')" + "\n";
    }
    return pWhereClause;
}
function ProductLog_Print(pOutputTo) {
    debugger;
    FadePageCover(true);
    var pWhereClause = ProductLog_GetWhereClause();
    var pParametersWithValues = {
        pIsLoadArrayOfObjects: false
        , pLanguage: $("[id$='hf_ChangeLanguage']").val()
        , pPageNumber: 1
        , pPageSize: 99999
        , pWhereClause: pWhereClause
        , pOrderBy: "PurchaseItemCode,FinalizeDate"
    };
    CallGETFunctionWithParameters("/api/ProductLog/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
        , pParametersWithValues
        , function (pData) {
            var pReportRows = JSON.parse(pData[0]);
            if (pReportRows.length > 0) //pRecordsExist
                ProductLog_DrawReport(pData, pOutputTo);
            else
                swal(strSorry, "No records are found.");
            FadePageCover(false);
        });
}
function ProductLog_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[0]);
    var pReportTitle = "ProductLog";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblProductLogReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>Prod.Code</th>';
    pTablesHTML += '                                     <th>Prod.Name</th>';
    pTablesHTML += '                                     <th>Fin.Date</th>';
    pTablesHTML += '                                     <th>Action</th>';
    //pTablesHTML += '                                     <th>Barcode</th>';
    pTablesHTML += '                                     <th>Client</th>';
    pTablesHTML += '                                     <th>Code</th>';
    pTablesHTML += '                                     <th>Location</th>';
    //pTablesHTML += '                                     <th class="hide">PalletID</th>';
    pTablesHTML += '                                     <th>Qty</th>';
    pTablesHTML += '                                     <th>UQ</th>';
    if (pDefaults.UnEditableCompanyName == "GBL") {
        pTablesHTML += '                                     <th>Chassis</th>';
        pTablesHTML += '                                     <th>Pay.(' + pDefaults.CurrencyCode + ')' + '</th>';
        pTablesHTML += '                                     <th>Rec.(' + pDefaults.CurrencyCode + ')' + '</th>';
    }
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                             <tr style="font-size:95%;">';
        pTablesHTML += '                                 <td>' + (item.PurchaseItemCode == 0 ? "" : item.PurchaseItemCode) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + '</td>';
        pTablesHTML += '                                 <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FinalizeDate))) + '</td>';
        pTablesHTML += '                                 <td>' + (item.ActionType == 0 ? "" : item.ActionType) + '</td>';
        pTablesHTML += '                                 <td>' + (item.CustomerName == 0 ? "" : item.CustomerName) + '</td>';
        pTablesHTML += '                                 <td>' + (item.Code == 0  ? "" : item.Code) + '</td>';
        pTablesHTML += '                                 <td>' + (item.LocationCode == 0 ? "" : item.LocationCode) + '</td>';
        //pTablesHTML += '                                 <td>' + (item.BarCode == 0 || item.AvailableQuantity == 0 ? "" : item.BarCode) + '</td>';
        //pTablesHTML += '                                 <td class="hide">' + (item.PalletID == 0 ? "" : item.PalletID) + '</td>';
        pTablesHTML += '                                 <td>' + (item.Quantity).toFixed(2) + '</td>';
        pTablesHTML += '                                 <td>' + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + '</td>';
        //pTablesHTML += '                                 <td>' + (item.CreationDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + '</td>';
        if (pDefaults.UnEditableCompanyName == "GBL") {
            pTablesHTML += '                                 <td>' + (item.ChassisNumber == 0 ? "" : item.ChassisNumber) + '</td>';
            pTablesHTML += '                                 <td>' + (item.Payables == 0 ? "" : item.Payables.toFixed(2)) + '</td>';
            pTablesHTML += '                                 <td>' + (item.Receivables == 0 ? "" : item.Receivables.toFixed(2)) + '</td>';
        }
        pTablesHTML += '                             </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    var pTableSummary = "";
    //pTableSummary += '                                     <tr style="font-size:95%;">';
    //pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblProductLog", "EGP").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblProductLog", "USD").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblProductLog", "EUR").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblProductLog", "Default").toFixed(4) + '</td>';
    //pTableSummary += '                                     </tr>';
    //$("#tblProductLog" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblProductLogReport", "ProductLog");
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
        ReportHTML += '             <div class="col-xs-4"><b>Location :</b> ' + $("#slFilterLocation option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Customer :</b> ' + $("#slFilterCustomer option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Product :</b> ' + $("#slFilterPurchaseItem option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Fin.Date :</b> ' + ($("#txtFilterFromFinalizeDate").val() == "" && $("#txtFilterToFinalizeDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFilterFromFinalizeDate").val() == "" ? "" : "From " + $("#txtFilterFromFinalizeDate").val() + " ") + ($("#txtFilterToFinalizeDate").val() == "" ? "" : "To " + $("#txtFilterToFinalizeDate").val())) + '</div>';
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