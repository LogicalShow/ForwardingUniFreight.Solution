function ContainerTrackingReport_Print(pOutputTo) {
    debugger;
    //if (
    //    ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
    //    && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
    //    ) {
        FadePageCover(true);
        var pWhereClause = ContainerTrackingReport_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/ContainerTrackingReport/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                {
                    ContainerTrackingReport_DrawReport(data, pOutputTo);
                }
                else
                    swal(strSorry, "No data is found.");
                FadePageCover(false);
            });
        //}
    //}
    //else //Dates are not valid
    //    swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function ContainerTrackingReport_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "";
    var pContainerNumberFilter = "";
    var pCustomerFilter = "";
    var pBookingPartyFilter = "";
    var pShippingLineFilter = "";
    var pOperationIDsFilter = "";
    //var pFromOpenDateFilter = "";
    //var pToOpenDateFilter = "";
    var pPOL = "";
    var pIsLoadedFilter = "";

    pWhereClause = "WHERE DirectionType<>1 AND TransportType<>2 AND ShipmentType<>2 AND IsTracked=1";
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    pOperationIDsFilter = (pSelectedItemsIDs == "" ? "" : " OperationID IN (" + pSelectedItemsIDs + ")");
    if (pOperationIDsFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationIDsFilter;
    else
        if (pOperationIDsFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pOperationIDsFilter;

    //pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
    //pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
    //pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
    //pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

    //pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
    //pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
    //pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
    //pTransportFilter += (pTransportFilter == "" ? "" : ") ");

    //pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
    //pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
    //pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
    //pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");

    //if (pDirectionFilter != "" && pTransportFilter == "")
    //    pWhereClause = " WHERE " + pDirectionFilter;
    //else
    //    if (pDirectionFilter == "" && pTransportFilter != "")
    //        pWhereClause = " WHERE " + pTransportFilter;
    //    else
    //        if (pDirectionFilter != "" && pTransportFilter != "")
    //            pWhereClause = " WHERE " + pDirectionFilter + " AND " + pTransportFilter;

    //if (pBLTypeFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pBLTypeFilter;
    //else
    //    if (pBLTypeFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pBLTypeFilter;

    //if (pOperationStageFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pOperationStageFilter;
    //else
    //    if (pOperationStageFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pOperationStageFilter;

    //pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    //if (pBranchFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pBranchFilter;
    //else
    //    if (pBranchFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pBranchFilter;

    //pInvoiceNumbersFilter = ($("#txtInvoiceNumbers").val().trim() == "" ? "" : " InvoiceNumbers LIKE N'%" + $("#txtInvoiceNumbers").val().trim() + "%'");
    //if (pInvoiceNumbersFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pInvoiceNumbersFilter;
    //else
    //    if (pInvoiceNumbersFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pInvoiceNumbersFilter;

    //pCustomerReferenceFilter = ($("#txtCustomerReference").val().trim() == "" ? "" : " CustomerReference LIKE N'%" + $("#txtCustomerReference").val().trim() + "%'");
    //if (pCustomerReferenceFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pCustomerReferenceFilter;
    //else
    //    if (pCustomerReferenceFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pCustomerReferenceFilter;

    pContainerNumberFilter = ($("#txtContainerNumber").val().trim() == "" ? "" : " ContainerNumber LIKE N'%" + $("#txtContainerNumber").val().trim() + "%'");
    if (pContainerNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pContainerNumberFilter;
    else
        if (pContainerNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pContainerNumberFilter;

    //pShippingLineFilter = ($("#slShippingLine").val() == "" ? "" : " ShippingLineID = " + $("#slShippingLine").val());
    //if (pShippingLineFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pShippingLineFilter;
    //else
    //    if (pShippingLineFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pShippingLineFilter;

    pCustomerFilter = ($("#slCustomer").val() == "" ? "" : " ShipperID = " + $("#slCustomer").val());
    if (pCustomerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerFilter;
    else
        if (pCustomerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerFilter;

    pBookingPartyFilter = ($("#slBookingParty").val() == "" ? "" : " BookingPartyID = " + $("#slBookingParty").val());
    if (pBookingPartyFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBookingPartyFilter;
    else
        if (pBookingPartyFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBookingPartyFilter;

    pShippingLineFilter = ($("#slShippingLine").val() == "" ? "" : " ShippingLineID = " + $("#slShippingLine").val());
    if (pShippingLineFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pShippingLineFilter;
    else
        if (pShippingLineFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pShippingLineFilter;

    ////2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    //if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
    //    pFromOpenDateFilter = " OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
    //    if (pFromOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pFromOpenDateFilter;
    //    else
    //        if (pFromOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pFromOpenDateFilter;
    //}
    ////2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    //if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
    //    pToOpenDateFilter = " CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
    //    if (pToOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pToOpenDateFilter;
    //    else
    //        if (pToOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pToOpenDateFilter;
    //}

    pPOL = ($("#slPOL option:selected").val() == "" ? "" : " POLID = " + $("#slPOL option:selected").val());
    if (pPOL != "" && pWhereClause != "")
        pWhereClause += " AND " + pPOL;
    else
        if (pPOL != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPOL;

    //pPOD = ($("#slPOD option:selected").val() == "" ? "" : " POD = " + $("#slPOD option:selected").val());
    //if (pPOD != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOD;
    //else
    //    if (pPOD != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOD;

    if ($("#slLoadedSearch").val() == 10 && pWhereClause != "")
        pWhereClause += "AND IsLoaded=1" + "\n";
    else if (pIsLoadedFilter != "" && pWhereClause == "")
        pWhereClause += " WHERE IsLoaded=1" + "\n";
    else if ($("#slLoadedSearch").val() == 20 && pWhereClause != "")
        pWhereClause += "AND IsLoaded=0" + "\n";
    else if (pIsLoadedFilter != "" && pWhereClause == "")
        pWhereClause += " WHERE IsLoaded=0" + "\n";

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);// + " ORDER BY ID DESC ";
    return pWhereClause;
}
function ContainerTrackingReport_SelectOperations() {
    jQuery("#CheckboxesListModal").modal("show");
}
function OperationsStatistics_FilterOperationsModal() {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE BLType<>2 \n";
    if ($("#txtSearchItems").val().trim() != "")
        pWhereClause += "AND SUBSTRING(Code,12,10)='" + $("#txtSearchItems").val().trim() + "' \n";
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDateSelectOperations").val().trim(), 1) && $("#txtFromDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateSelectOperations").val().trim()) + "'";
        //$("#txtFromDate").val($("#txtFromDateSelectOperations").val());
    }
    if (isValidDate($("#txtToDateSelectOperations").val().trim(), 1) && $("#txtToDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateSelectOperations").val().trim()) + "'";
        //$("#txtToDate").val($("#txtToDateSelectOperations").val());
    }

    GetListAsCheckboxesWithVariousParameters("/api/Operations/LoadAll"
        , { pWhereClause: pWhereClause }
        , "divCheckboxesList"
        , "cbAddedItemID"
        , function () { FadePageCover(false); }
        , 2
        , "col-sm-2");
}
function ContainerTrackingReport_ClearAllOperations() {
    $('input[name="cbAddedItemID"]').prop("checked", false);
}
function ContainerTrackingReport_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Container Tracking Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblContainerTrackingReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>OperationCode</th>';
    pTablesHTML += '                                     <th>Cont.No</th>';
    pTablesHTML += '                                     <th>Shipper</th>';
    pTablesHTML += '                                     <th>BookingParty</th>';
    pTablesHTML += '                                     <th>Type</th>';
    pTablesHTML += '                                     <th>Factory</th>';
    pTablesHTML += '                                     <th>GateOut Port</th>';
    pTablesHTML += '                                     <th>GateIn Port</th>';
    pTablesHTML += '                                     <th>GateOut Date</th>';
    pTablesHTML += '                                     <th>Stuffing Date</th>';
    pTablesHTML += '                                     <th>Loading Date</th>';
    pTablesHTML += '                                     <th>Days Diff</th>';
    pTablesHTML += '                                     <th>Exp.BL</th>';
    pTablesHTML += '                                     <th>Imp.BL</th>';
    pTablesHTML += '                                     <th>ShippingLine</th>';
    pTablesHTML += '                                     <th>Loaded</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        if (item.ReceivableEGP != 0 || item.ReceivableUSD != 0 || item.ReceivableEUR != 0) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td class="">' + (item.OperationCode == 0 ? "" : item.OperationCode) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.BookingPartyName == 0 ? "" : item.BookingPartyName) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.Factory == 0 ? "" : item.Factory) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.GateOutPortName == 0 ? "" : item.GateOutPortName) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.GateInPortName == 0 ? "" : item.GateInPortName) + '</td>';
            pTablesHTML += '                                 <td class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.GateOutDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.GateOutDate))) + '</td>';
            pTablesHTML += '                                 <td class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StuffingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.StuffingDate))) + '</td>';
            pTablesHTML += '                                 <td class="">' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate))) + '</td>';
            pTablesHTML += '                                 <td class="">' + item.GateOutAndLoadingDatesDifference + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ExportBLNumber == 0 ? "" : item.ExportBLNumber) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ImportBLNumber == 0 ? "" : item.ImportBLNumber) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.ShippingLineName == 0 ? "" : item.ShippingLineName) + '</td>';
            pTablesHTML += '                                 <td class="">' + (item.IsLoaded ? "Yes" : "No") + '</td>';
            //pTablesHTML += '                                 <td>' + (item.CreationDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + '</td>';
            //if (pOutputTo != "Excel")
            //    pTablesHTML += "                                 <td><input type='checkbox' disabled='disabled' " + (item.IsExpired ? " checked='checked' " : "") + " /></td>";
            pTablesHTML += '                             </tr>';
        }
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    //var pTableSummary = "";
    //pTableSummary += '                                     <tr style="font-size:95%;">';
    //pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "EGP").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "USD").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "EUR").toFixed(4) + '</td>';
    //pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "Default").toFixed(4) + '</td>';
    //pTableSummary += '                                     </tr>';
    //$("#tblAnnualIncomeReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblContainerTrackingReport", "ContainerTrackingReport");
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
        ReportHTML += '             <div class="col-xs-8"><b>Shipper :</b> ' + $("#slCustomer option:selected").text() + '</div>';
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
