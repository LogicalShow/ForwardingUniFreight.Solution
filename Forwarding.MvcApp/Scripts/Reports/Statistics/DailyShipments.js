//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function DailyShipments_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = DailyShipments_GetFilterWhereClause();
        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        CallGETFunctionWithParameters("/api/DailyShipments/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    DailyShipments_DrawReport(data, pOutputTo);
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}

function DailyShipments_GetFilterWhereClause() {
    var pWhereClause = "";
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pSalesmanFilter = "";
    var pBranchFilter = "";
    var pCustomerFilter = "";
    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";
    var pPOL = "";
    var pPOD = "";
    //var pOperationStageFilter = ($("#ulOperationStages li[class=active]").val() == 0 ? "" : " ( OperationStageID = " + $("#ulOperationStages li[class=active]").val() + ")"); //if 0 then all stages
    var pOperationStageFilter = ($("#slOperationStages").val() == 0
                                ? "" //if 0 then all stages
                                : ($("#slOperationStages").val() == ClosedQuoteAndOperStageID.toString() ? (" (CAST(CloseDate AS date) <= GETDATE() AND OperationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ") : (" OperationStageID = " + $("#slOperationStages").val() + " AND CloseDate > GETDATE() "))
                                );

    pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
    pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
    pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
    pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

    pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
    pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
    pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
    pTransportFilter += (pTransportFilter == "" ? "" : ") ");

    pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
    pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");

    if (pDirectionFilter != "" && pTransportFilter == "")
        pWhereClause = " WHERE " + pDirectionFilter;
    else
        if (pDirectionFilter == "" && pTransportFilter != "")
            pWhereClause = " WHERE " + pTransportFilter;
        else
            if (pDirectionFilter != "" && pTransportFilter != "")
                pWhereClause = " WHERE " + pDirectionFilter + " AND " + pTransportFilter;

    if (pBLTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBLTypeFilter;
    else
        if (pBLTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBLTypeFilter;

    if (pOperationStageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationStageFilter;
    else
        if (pOperationStageFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pOperationStageFilter;

    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBranchFilter;

    pSalesmanFilter = ($("#slSalesman").val() == "" ? "" : " SalesmanID = " + $("#slSalesman").val());
    if (pSalesmanFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pSalesmanFilter;
    else
        if (pSalesmanFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pSalesmanFilter;

    pCustomerFilter = ($("#slCustomer").val() == "" ? "" : " ClientID = " + $("#slCustomer").val());
    if (pCustomerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerFilter;
    else
        if (pCustomerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerFilter;

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "") {
        pFromOpenDateFilter = " OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'";
        if (pFromOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromOpenDateFilter;
        else
            if (pFromOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromOpenDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "") {
        pToOpenDateFilter = " CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'";
        if (pToOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToOpenDateFilter;
        else
            if (pToOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToOpenDateFilter;
    }

    //pPOL = ($("#slPOL option:selected").val() == "" ? "" : " POL = " + $("#slPOL option:selected").val());
    //if (pPOL != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOL;
    //else
    //    if (pPOL != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOL;
    //pPOD = ($("#slPOD option:selected").val() == "" ? "" : " POD = " + $("#slPOD option:selected").val());
    //if (pPOD != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOD;
    //else
    //    if (pPOD != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOD;

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " ORDER BY ID DESC ";
    return pWhereClause;
}

function DailyShipments_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);

    var pReportTitle = "Daily Shipments Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblDailyShipments" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblDailyShipments" class="table table-striped text-sm table-bordered  " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>OPERATION NO.</th>';
    pTablesHTML += '                                     <th>SHIPPER</th>';
    pTablesHTML += '                                     <th>CONSIGNEE</th>';
    //pTablesHTML += '                                     <th>Country</th>';
    pTablesHTML += '                                     <th>ETS</th>';
    pTablesHTML += '                                     <th>ETA</th>';
    pTablesHTML += '                                     <th>BL NO.</th>';
    pTablesHTML += '                                     <th>LINE</th>';
    pTablesHTML += '                                     <th>POL</th>';
    pTablesHTML += '                                     <th>POD</th>';
    pTablesHTML += '                                     <th>CREATED By</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ConsigneeName == 0 ? "" : item.ConsigneeName) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.Country == 0 ? "" : item.Country) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ExpectedDeparture == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedDeparture))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ExpectedArrival == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
        pTablesHTML += '                                         <td>' + (item.LineName == 0 ? "" : item.LineName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
        pTablesHTML += '                                         <td>' + (item.CreatorName == 0 ? "" : item.CreatorName) + '</td>';
        //pTablesHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

    if (pOutputTo == "Excel")
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblDailyShipments");
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromOpenDate").val() == "" && $("#txtToOpenDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromOpenDate").val() == "" ? "" : "From " + $("#txtFromOpenDate").val() + " ") + ($("#txtToOpenDate").val() == "" ? "" : "To " + $("#txtToOpenDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
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
