function VehicleReport_Initialize() {
    debugger;
    LoadView("/Warehousing/Reports/VehicleReport", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "GBL")
            $(".classShowForGBL").removeClass("hide");
        CallGETFunctionWithParameters("/api/VehicleReport/FillFilter", null
            , function (pData) {
                var pVehicleActionType = pData[0];
                var pCustomer = pData[1];
                ////FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slVehicleActionType", pVehicleActionType, null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomer", pCustomer, null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                //$("#slCurrency").html("<option value=''>All Currencies</option>");
                //$("#slCurrency").append($("#hReadySlCurrencies").html());
                //$("#slCurrency").val($("").html());
                $("#txtFromReceiveDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToReceiveDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtFromActionDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToActionDate").val(getTodaysDateInddMMyyyyFormat());
                //$("#txtFromPickupDate").val(getTodaysDateInddMMyyyyFormat());
                //$("#txtToPickupDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { FadePageCover(false); $("#hl-menu-3PL").parent().addClass("active"); });
    });
}
function VehicleReport_Print(pOutputTo) {
    debugger;
    if ($("#cbIsOracleData").prop("checked") && $("#txtChassisNumber").val().trim() == "")
        swal("Sorry", "Please, enter chassis number.");
    else if (
        ($("#txtFromReceiveDate").val().trim() == "" || isValidDate($("#txtFromReceiveDate").val(), 1))
        && ($("#txtToReceiveDate").val().trim() == "" || isValidDate($("#txtToReceiveDate").val(), 1))
        && ($("#txtFromPickupDate").val().trim() == "" || isValidDate($("#txtFromPickupDate").val(), 1))
        && ($("#txtToPickupDate").val().trim() == "" || isValidDate($("#txtToPickupDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = "";
        if ($("#cbIsOracleData").prop("checked"))
            pWhereClause = "WHERE LOT_NUMBER=N'" + $("#txtChassisNumber").val().trim().toUpperCase() + "' ORDER BY Creation_Date ";
        else
            pWhereClause = VehicleReport_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pIsVehicleTracking: $("#cbIsVehicleTracking").prop("checked")
            , pIsVehicleCharge: $("#cbIsVehicleCharge").prop("checked")
            , pIsVehicleAging: $("#cbIsVehicleAging").prop("checked")
            , pIsOracleData: $("#cbIsOracleData").prop("checked")
            , pVehicleActionID: $("#slVehicleActionType").val() == "" || !$("#cbIsVehicleTracking").prop("checked") ? 0 : $("#slVehicleActionType").val()
        };
        CallGETFunctionWithParameters("/api/VehicleReport/LoadData"
                , pParametersWithValues
                , function (pData) {
                    var _RowCount = pData[0];
                    if (_RowCount == 0)
                        swal("Sorry", "No records are found for that search criteria.");
                    else {
                        if ($("#cbIsOracleData").prop("checked"))
                            VehicleReport_DrawReport_OracleData(pData, pOutputTo);
                        else if ($("#cbIsVehicleTracking").prop("checked"))
                            VehicleReport_DrawReport_Tracking(pData, pOutputTo);
                        else if ($("#cbIsVehicleCharge").prop("checked"))
                            VehicleReport_DrawReport_Charge(pData, pOutputTo);
                        else if ($("#cbIsVehicleAging").prop("checked"))
                            VehicleReport_DrawReport_Aging(pData, pOutputTo);
                    }
                    FadePageCover(false);
                }
                , null);
    }
    else
        swal("Sorry", "Please make sure that date format is dd/MM/yyyy.");
}
function VehicleReport_GetFilterWhereClause() {
    debugger;
    var _WhereClause = "WHERE 1=1" + "\n";
    if ($("#txtChassisNumber").val().trim() != "")
        _WhereClause += "AND ChassisNumber=N'" + $("#txtChassisNumber").val().trim().toUpperCase() + "'" + "\n";
    if ($("#txtDispatchNumber").val().trim() != "")
        _WhereClause += "AND DispatchNumber=N'" + $("#txtDispatchNumber").val().trim().toUpperCase() + "'" + "\n"; 
    if ($("#txtOperationNumber").val().trim() != "")
        //_WhereClause += "AND OperationCodeSerial=N'" + $("#txtOperationNumber").val().trim().toUpperCase() + "'" + "\n";
        _WhereClause += "AND SUBSTRING(OperationCode, 12, 6)=N'" + $("#txtOperationNumber").val().trim().toUpperCase() + "'" + "\n";
    
    if ($("#slCustomer").val() != "")
        _WhereClause += "AND CustomerID=" + $("#slCustomer").val() + " \n";

    if ($("#cbIsVehicleTracking").prop("checked")) {
        if ($("#slVehicleActionType").val() == constVehicleActionPacking) { //Read from vwOperationVehicle
            if ($("#txtFromActionDate").val().trim() != "")
                _WhereClause += "AND CreationDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromActionDate").val().trim()) + "'" + " \n";
            if ($("#txtToActionDate").val().trim() != "")
                _WhereClause += "AND CreationDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToActionDate").val().trim()) + " 23:59:59'" + " \n";
        }
        else {
            if ($("#txtDocNumber").val().trim() != "")
                _WhereClause += "AND (CodeSerial=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "')" + "\n";
            if ($("#txtFromActionDate").val().trim() != "")
                _WhereClause += "AND ActionDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromActionDate").val().trim()) + "'" + " \n";
            if ($("#txtToActionDate").val().trim() != "")
                _WhereClause += "AND ActionDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToActionDate").val().trim()) + " 23:59:59'" + " \n";
            if ($("#slVehicleActionType").val() != "")
                _WhereClause += "AND VehicleActionID=" + $("#slVehicleActionType").val() + " \n";
        }
    }
    if ($("#cbIsVehicleCharge").prop("checked") || $("#cbIsVehicleAging").prop("checked")) {
        if ($("#txtDocNumber").val().trim() != "")
            _WhereClause += "AND (ReceiveDoc=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "' OR PickupDoc=N'" + $("#txtDocNumber").val().trim().toUpperCase() + "')" + "\n";
        if ($("#txtFromReceiveDate").val().trim() != "")
            _WhereClause += "AND ReceiveDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromReceiveDate").val().trim()) + "'" + " \n";
        if ($("#txtToReceiveDate").val().trim() != "")
            _WhereClause += "AND ReceiveDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToReceiveDate").val().trim()) + " 23:59:59'" + " \n";
        if ($("#txtFromPickupDate").val().trim() != "")
            _WhereClause += "AND PickupFinalizeDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromPickupDate").val().trim()) + "'" + " \n";
        if ($("#txtToPickupDate").val().trim() != "")
            _WhereClause += "AND PickupFinalizeDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToPickupDate").val().trim()) + " 23:59:59'" + " \n";
    }
    if ($("#cbIsVehicleAging").prop("checked")) {
        if ($("#slVehicleInOrOut").val() == "IN")
            _WhereClause += "AND PickupDetailsLocationID IS NULL" + " \n";
        else if ($("#slVehicleInOrOut").val() == "OUT")
            _WhereClause += "AND PickupDetailsLocationID IS NOT NULL" + " \n";
    }
    return _WhereClause;
}
function VehicleReport_DrawReport_OracleData(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReceivableItems = JSON.parse(pData[2]);
    var pPayableItems = JSON.parse(pData[3]);
    var pReportTitle = "Vehicle Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var _NumberOfColumns = 4;
    pTableHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <th style="">TRANSACTION_TYPE_ID</th>';
    pTableHTML += '                                     <th style="">TRANSACTION_TYPE_NAME</th>';
    pTableHTML += '                                     <th style="">ITEM_CODE</th>';
    pTableHTML += '                                     <th style="">LOT_NUMBER</th>';
    pTableHTML += '                                     <th style="">SERIAL_NUMBER</th>';
    pTableHTML += '                                     <th style="">TRANSACTION_QUANTITY</th>';
    pTableHTML += '                                     <th style="">SUBINVENTORY_CODE</th>';
    pTableHTML += '                                     <th style="">TRANSFER_SUBINVENTORY</th>';
    pTableHTML += '                                     <th style="">Creation_Date</th>';
    //pTableHTML += '                                     <th style="">Transaction_Date</th>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    for (var i = 0; i < pReportRows.length; i++) {
        pTableHTML += '                                     <tr style="font-size:95%;">';
        pTableHTML += '                                         <td>' + pReportRows[i].TRANSACTION_TYPE_ID + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].TRANSACTION_TYPE_NAME + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].ITEM_CODE + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].LOT_NUMBER + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].SERIAL_NUMBER + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].TRANSACTION_QUANTITY + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].SUBINVENTORY_CODE + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].TRANSFER_SUBINVENTORY + '</td>';
        pTableHTML += '                                         <td>' + GetFullDateTime(pReportRows[i].Creation_Date) + '</td>';
        //pTableHTML += '                                         <td>' + GetFullDateTime(pReportRows[i].Transaction_Date) + '</td>';
        pTableHTML += '                                     </tr>';
    };
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';
    //}); //$.each((pReportRows), function (i, item) {
    ////} //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {

            //if (pReportRows.length > 0) {
            var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
            var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
            var pTableSummary = "";
            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
            pTableSummary += '                                 </tr>';

            $("#tblVehicleReport tbody").append(pTableSummary);
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblVehicleReport", 'VehicleReport');
            //}
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';

        ReportHTML += '                     <div>&nbsp;</div>';

        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

        ReportHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        ReportHTML += '                         ' + $("#tblVehicleReport").html();
        ReportHTML += '                         </table>';
        //}

        debugger;
        //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Packing Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('PACKING')").length + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Receive Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('RECEIVE')").length + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Pickup Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('PICK-UP')").length + '</div>';
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Return Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('RETURN')").length + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }

}
function VehicleReport_DrawReport_Tracking(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReceivableItems = JSON.parse(pData[2]);
    var pPayableItems = JSON.parse(pData[3]);
    var pReportTitle = "Vehicle Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    //$.each((pReportRows), function (i, item) {
    //pTableHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
    //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
    var _NumberOfColumns = 4;
    pTableHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <th style="">Chassis</th>';
    if (!($("#slVehicleActionType").val() == constVehicleActionPacking && $("#cbIsVehicleTracking").prop("checked")))
        pTableHTML += '                                     <th style="">Doc</th>';
    pTableHTML += '                                     <th style="">Action</th>';
    pTableHTML += '                                     <th style="">Operation</th>';
    pTableHTML += '                                     <th style="">Dispatch</th>';
    pTableHTML += '                                     <th style="">ActionDate</th>';
    pTableHTML += '                                     <th style="">Notes</th>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    for (var i = 0; i < pReportRows.length; i++) {
        pTableHTML += '                                     <tr style="font-size:95%;">';
        pTableHTML += '                                         <td>' + pReportRows[i].ChassisNumber + '</td>';
        if (!($("#slVehicleActionType").val() == constVehicleActionPacking && $("#cbIsVehicleTracking").prop("checked")))
            pTableHTML += '                                         <td>' + pReportRows[i].CodeSerial + '</td>';
        pTableHTML += '                                         <td class="VehicleActionName">' + ($("#slVehicleActionType").val() == constVehicleActionPacking && $("#cbIsVehicleTracking").prop("checked") ? "PACKING" : pReportRows[i].VehicleActionName) + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].OperationCode + '</td>';
        pTableHTML += '                                         <td>' + (pReportRows[i].DispatchNumber == 0 ? "" : pReportRows[i].DispatchNumber) + '</td>';
        pTableHTML += '                                         <td>' + ($("#slVehicleActionType").val() == constVehicleActionPacking && $("#cbIsVehicleTracking").prop("checked")
                                                                            ? ConvertDateFormat(GetDateWithFormatMDY(pReportRows[i].CreationDate))
                                                                            : (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReportRows[i].ActionDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pReportRows[i].ActionDate)))
                                                                        )
                                                                + '</td>';
        pTableHTML += '                                         <td>' + ($("#slVehicleActionType").val() == constVehicleActionPacking && $("#cbIsVehicleTracking").prop("checked") ? "Added From Packing List" : pReportRows[i].InspectionNotes == 0 ? "" : pReportRows[i].InspectionNotes) + '</td>';
        pTableHTML += '                                     </tr>';
    };
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';
    //}); //$.each((pReportRows), function (i, item) {
    ////} //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {

            //if (pReportRows.length > 0) {
            var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
            var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
            var pTableSummary = "";
            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
            pTableSummary += '                                 </tr>';

            $("#tblVehicleReport tbody").append(pTableSummary);
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblVehicleReport", 'VehicleReport');
            //}
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';

        ReportHTML += '                     <div>&nbsp;</div>';

        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

        ReportHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        ReportHTML += '                         ' + $("#tblVehicleReport").html();
        ReportHTML += '                         </table>';
        //}

        debugger;
        //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Packing Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('PACKING')").length + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Receive Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('RECEIVE')").length + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Pickup Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('PICK-UP')").length + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Number of Return Actions :</u> </b> ' + $("#tblVehicleReport tbody tr td.VehicleActionName:Contains('RETURN')").length + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }

}
function VehicleReport_DrawReport_Aging(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReceivableItems = JSON.parse(pData[2]);
    var pPayableItems = JSON.parse(pData[3]);
    var pReportTitle = "Vehicle Aging";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    //$.each((pReportRows), function (i, item) {
    //pTableHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
    //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
    var _NumberOfColumns = 4;
    ReportHTML += '             <div class="col-xs-12 m-l-n">' + '<b>' + 'Printed On : ' + TodaysDateddMMyyyy + '</b></div>';
    pTableHTML += '                         <table id="tblVehicleAging" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <th style="">Chassis</th>';
    pTableHTML += '                                     <th style="">Operation</th>';
    pTableHTML += '                                     <th style="">Client</th>';
    pTableHTML += '                                     <th style="">Rec.Date</th>';
    pTableHTML += '                                     <th style="">Pickup Date</th>';
    pTableHTML += '                                     <th style="">Aging To Date</th>';
    pTableHTML += '                                     <th style="">Actual Days</th>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    var _TotalActualDays = 0;
    for (var i = 0; i < pReportRows.length; i++) {
        //Add 1 day to days in case of receive
        pReportRows[i].StorageDays = pReportRows[i].IsAddExtraDayForFirstCutOff
                                    ? (pReportRows[i].StorageDays + 1)
                                    : pReportRows[i].StorageDays;
        _TotalActualDays += (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReportRows[i].PickupRequiredDate)) < 1) ? 0 : pReportRows[i].StorageDays;
        pTableHTML += '                                     <tr style="font-size:95%;">';
        pTableHTML += '                                         <td>' + pReportRows[i].ChassisNumber + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].OperationCode + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].CustomerName + '</td>';
        pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReportRows[i].ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pReportRows[i].ReceiveDate))) + '</td>';
        pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReportRows[i].PickupRequiredDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(pReportRows[i].PickupRequiredDate))) + '</td>';
        pTableHTML += '                                         <td>' + pReportRows[i].StorageDays + '</td>';
        pTableHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(pReportRows[i].PickupRequiredDate)) < 1 ? "0" : pReportRows[i].StorageDays) + '</td>';
    };
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';
    //}); //$.each((pReportRows), function (i, item) {
    ////} //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {

            //if (pReportRows.length > 0) {
            var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
            var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
            var pTableSummary = "";
            pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td>';
            pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
            pTableSummary += '                                 </tr>';

            $("#tblVehicleAging tbody").append(pTableSummary);
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblVehicleAging", 'VehicleAging');
            //}
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';

        ReportHTML += '                     <div>&nbsp;</div>';

        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

        ReportHTML += '                         <table id="tblVehicleAging" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        ReportHTML += '                         ' + $("#tblVehicleAging").html();
        ReportHTML += '                         </table>';
        //}

        debugger;
        //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Total Aging To Date Days :</u> </b> ' + CalculateSumOfArrayWithGroupBy(pReportRows, "StorageDays", "Days").split('.')[0] + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>Total Actual Days :</u> </b> ' + _TotalActualDays + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }

}
function VehicleReport_DrawReport_Charge(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReceivableItems = JSON.parse(pData[2]);
    var pPayableItems = JSON.parse(pData[3]);
    var pReportTitle = "Vehicle Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    $.each((pReportRows), function (i, item) {
        //pTableHTML += '                         <table id="tblVehicleReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
        //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
        var _NumberOfColumns = 4;
        pTableHTML += '                         <table id="tblVehicleReport' + item.ReceiveDetailsID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        pTableHTML += '                             <thead>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <th colspan=' + _NumberOfColumns + '>'
                                                                + 'Chassis: ' + item.ChassisNumber
                                                                + '&emsp; Oper.: ' + item.OperationCode
                                                                + '&emsp; Dispatch: ' + item.DispatchNumber
                                                                + '&emsp; Customer: ' + item.CustomerName
                                                                + '&emsp; Receive: ' + item.ReceiveCode
                                                                + '&emsp; Rec.Doc: ' + item.ReceiveDoc
                                                                + '&emsp; Rec.Date: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReceiveDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReceiveDate)))
                                                                + '<br>Pickup: ' + item.PickupCode
                                                                + '&emsp; PickupDate: ' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PickupFinalizeDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PickupFinalizeDate)))
                                                                + '&emsp; Pickup.Doc: ' + item.PickupDoc
                                                                + '&emsp; Days: ' + (item.PickupID == 0 ? "Not Picked" : item.StorageDays)
                                                            + '</th>';
        pTableHTML += '                                 </tr>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <th style="width:50%;">Item</th>';
        pTableHTML += '                                     <th style="width:20%;">Cost</th>';
        pTableHTML += '                                     <th style="width:20%;">Sale</th>';
        pTableHTML += '                                     <th style="width:10%;">Currency</th>';
        pTableHTML += '                                 </tr>';
        pTableHTML += '                             </thead>';
        pTableHTML += '                             <tbody>';

        var _CurrentReceivable = pReceivableItems.filter(x=>x.OperationVehicleID == item.OperationVehicleID);
        $.each((_CurrentReceivable), function (j, ReceiveItem) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            pTableHTML += '                                         <td style="text-align:left;">' + ReceiveItem.ChargeTypeName + '</td>';
            pTableHTML += '                                         <td>' + ReceiveItem.CostAmount.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + ReceiveItem.SaleAmount.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + ReceiveItem.CurrencyCode + '</td>';
            pTableHTML += '                                     </tr>';
        });
        var _CurrentPayable = pPayableItems.filter(x=>x.OperationVehicleID == item.OperationVehicleID);
        $.each((_CurrentPayable), function (j, PayableItem) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            pTableHTML += '                                         <td style="text-align:left;">' + PayableItem.ChargeTypeName + '</td>';
            pTableHTML += '                                         <td>' + PayableItem.CostAmount.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + PayableItem.SaleAmount.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + PayableItem.CurrencyCode + '</td>';
            pTableHTML += '                                     </tr>';
        });
        pTableHTML += '                             </tbody>';
        pTableHTML += '                         </table>';
    }); //$.each((pReportRows), function (i, item) {
    //} //for (var i = 0; i < 1; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") 
    {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        
        ReportHTML += '                     <div>&nbsp;</div>';

        for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            ReportHTML += '                         <table id="tblVehicleReport' + pReportRows[j].ReceiveDetailsID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblVehicleReport" + pReportRows[j].ReceiveDetailsID).html();
            ReportHTML += '                         </table>';
        }

        debugger;
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        
       

        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else if (pOutputTo == "Excel")
        {
            $("#VehicleReportCharge").html(ReportHTML);

            //$("#hExportedTable").html(ReportHTML);

            var $table = $("#VehicleReportCharge");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "VehicleReport_Charge" + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
        }
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';

        ReportHTML += '                     <div>&nbsp;</div>';

        for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblVehicleReport' + pReportRows[j].ReceiveDetailsID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblVehicleReport" + pReportRows[j].ReceiveDetailsID).html();
            ReportHTML += '                         </table>';
        }

        debugger;
        //var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "Amount", "ExchangeRate");
        //var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "Amount", "CurrencyCode");
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }

}
function VehicleReport_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}
/*******************************************************/
function ReportOptionChanged() {
    debugger;
    $("#slVehicleInOrOut").val("");
    if ($("#cbIsVehicleTracking").prop("checked") || $("#cbIsOracleData").prop("checked")) {
        $(".classVehicleCharge").addClass("hide");
        $(".classVehicleTracking").removeClass("hide");
        $(".classVehicleAging").addClass("hide");
    }
    else if ($("#cbIsVehicleCharge").prop("checked")) {
        $(".classVehicleCharge").removeClass("hide");
        $(".classVehicleTracking").addClass("hide");
        $(".classVehicleAging").addClass("hide");
    }
    else if ($("#cbIsVehicleAging").prop("checked")) {
        $(".classVehicleCharge").removeClass("hide");
        $(".classVehicleTracking").addClass("hide");
        $(".classVehicleAging").removeClass("hide");
    }
}
