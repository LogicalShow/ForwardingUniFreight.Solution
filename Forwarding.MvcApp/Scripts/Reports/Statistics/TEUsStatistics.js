//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function TeuStatistics_Initialize() {
    debugger;
    LoadView("/Reports/TEUsStatistics", "div-content", function () {
        CallGETFunctionWithParameters("/api/TeusStatistics/GetStatisticsFilter", null
            , function (data) {
                //data[0]:Salesman //data[1]:Branches //data[2]:Customers //data[3]:Currencies //data[4]:Oper.States
                debugger;
                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)
                FillListFromObject(null, 2, "All Salesmen", "slSalesman", data[0], function () {
                    if (pDefaults.UnEditableCompanyName == "ATL" && pLoggedUser.IsHideOthersRecords == true) {
                        $("#slSalesman").prop("disabled", true);
                        $("#slSalesman").val(pLoggedUser.ID);

                    }
                });
                FillListFromObject(null, 2, "All Branches", "slBranch", data[1], null);
                //FillListFromObject(null, 2, "All Customers", "slCustomer", data[2], null);
                $("#slCustomer").html($("#hReadySlCustomers").html());
                FillListFromObject(null, 1, "All Currencies", "slCurrency", data[3], null);
                FillListFromObject(null, 2, "All Operation States", "slOperationStages", data[4], null);
                FillListFromObject(null, 2, "All Agents", "slAgent", data[5], null);
                FillListFromObject(null, 2, "All ShippingLines", "slShippingLine", data[6], null);
                FillListFromObject(null, 2, "All Airlines", "slAirline", data[7], null);
                FillListFromObject(null, 2, "All Truckers", "slTrucker", data[8], null);
                FillListFromObject(null, 2, "All Countries", "slPOLCountry", data[9], null);
                $("#slPOL").html("<option value=''>All Ports</option>");
                FillListFromObject(null, 2, "All Countries", "slPODCountry", data[9], null);
                $("#slPOD").html("<option value=''>All Ports</option>");
                $("#txtFromOpenDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
    });
}
function TEUsStatistics_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = TEUsStatistics_GetFilterWhereClause();
        var pStatisticsFor = TEUsStatistics_SetStatisticsFor();
        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pStatisticsFor: pStatisticsFor
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        CallGETFunctionWithParameters("/api/TeusStatistics/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    TEUsStatistics_DrawReport(data, pOutputTo);
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function TEUsStatistics_SetStatisticsFor() {
    var pStatisticsFor = 0;
    if ($("#cbIsClientStatistics").prop("checked")) {
        pStatisticsFor = 1;
        $("#hStatisticsFor").val("Clients");
    }
    else if ($("#cbIsAgentStatistics").prop("checked")) {
        pStatisticsFor = 2;
        $("#hStatisticsFor").val("Agents");
    }
    else if ($("#cbIsLineStatistics").prop("checked")) {
        pStatisticsFor = 3;
        $("#hStatisticsFor").val("Lines");
    }
    else if ($("#cbIsPOLStatistics").prop("checked")) {
        pStatisticsFor = 4;
        $("#hStatisticsFor").val("POLs");
    }
    else if ($("#cbIsPODStatistics").prop("checked")) {
        pStatisticsFor = 5;
        $("#hStatisticsFor").val("PODs");
    }
    return pStatisticsFor;
}
function TEUsStatistics_FillPOL() {
    if ($("#slPOLCountry").val() != "")
        GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "All Ports", "slPOL", " WHERE CountryID = " + $("#slPOLCountry").val());
    else
        $("#slPOL").html("<option value=''>All Ports</option>");
}
function TEUsStatistics_FillPOD() {
    if ($("#slPODCountry").val() != "")
        GetListWithCodeAndNameAndWhereClause(null, "/api/Ports/LoadAll", "All Ports", "slPOD", " WHERE CountryID = " + $("#slPODCountry").val());
    else
        $("#slPOD").html("<option value=''>All Ports</option>");
}
function TEUsStatistics_GetFilterWhereClause() {
    var pWhereClause = "";
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pSalesmanFilter = "";
    var pBranchFilter = "";
    var pCustomerFilter = "";
    var pAgentFilter = "";
    var pShippingLineFilter = "";
    var pAirlineFilter = "";
    var pTruckerFilter = "";
    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";
    var pPOLCountryFilter = "";
    var pPOLFilter = "";
    var pPODCountryFilter = "";
    var pPODFilter = "";
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

    pAgentFilter = ($("#slAgent").val() == "" ? "" : " AgentID = " + $("#slAgent").val());
    if (pAgentFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pAgentFilter;
    else
        if (pAgentFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pAgentFilter;

    pShippingLineFilter = ($("#slShippingLine").val() == "" ? "" : " ShippingLineID = " + $("#slShippingLine").val());
    if (pShippingLineFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pShippingLineFilter;
    else
        if (pShippingLineFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pShippingLineFilter;

    pAirlineFilter = ($("#slAirline").val() == "" ? "" : " AirineID = " + $("#slAirline").val());
    if (pAirlineFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pAirlineFilter;
    else
        if (pAirlineFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pAirlineFilter;

    pTruckerFilter = ($("#slTrucker").val() == "" ? "" : " TruckerID = " + $("#slTrucker").val());
    if (pTruckerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTruckerFilter;
    else
        if (pTruckerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTruckerFilter;

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

    pPOLCountryFilter = ($("#slPOLCountry").val() == "" ? "" : " POLCountryID = " + $("#slPOLCountry").val());
    if (pPOLCountryFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPOLCountryFilter;
    else
        if (pPOLCountryFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPOLCountryFilter;

    pPOLFilter = ($("#slPOL").val() == "" ? "" : " POL = " + $("#slPOL").val());
    if (pPOLFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPOLFilter;
    else
        if (pPOLFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPOLFilter;

    pPODCountryFilter = ($("#slPODCountry").val() == "" ? "" : " PODCountryID = " + $("#slPODCountry").val());
    if (pPODCountryFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPODCountryFilter;
    else
        if (pPODCountryFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPODCountryFilter;

    pPODFilter = ($("#slPOD").val() == "" ? "" : " POD = " + $("#slPOD").val());
    if (pPODFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPODFilter;
    else
        if (pPODFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPODFilter;

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " ORDER BY ID DESC ";
    return pWhereClause;
}
function TEUsStatistics_DrawReport(data, pOutputTo) {
    debugger;
    var pLstStatisticsData = JSON.parse(data[2]);
    var pStatisticsTotalTEUs = data[3];
    var pLstOperationsTEUs = JSON.parse(data[4]);
    var pOperationsTotalNo = data[5];
    var pOperationsTotalTEUs = data[6];

    //var pReportTitle = "Statistics By POL";
    var pReportTitle = "Statistics For " + $("#hStatisticsFor").val();
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

    var pTblOperationsTEUsHTML = "";
    pTblOperationsTEUsHTML += '                         <table id="tblOperationsTEUs" class="table table-striped text-sm table-bordered " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
    pTblOperationsTEUsHTML += '                             <thead>';
    pTblOperationsTEUsHTML += '                                 <tr class="" style="font-size:95%;">';
    pTblOperationsTEUsHTML += '                                     <th></th>';
    $.each((pLstOperationsTEUs), function (i, item) {
        pTblOperationsTEUsHTML += '                                 <th>' + (item.MonthYear) + '</th>';
    });
    pTblOperationsTEUsHTML += '                                     <th>Totals</th>';
    pTblOperationsTEUsHTML += '                                 </tr>';
    pTblOperationsTEUsHTML += '                             </thead>';
    pTblOperationsTEUsHTML += '                             <tbody>';
    pTblOperationsTEUsHTML += '                                 <tr style="font-size:95%;">';
    pTblOperationsTEUsHTML += '                                     <td><b>No of Operations</b></td>';
    $.each((pLstOperationsTEUs), function (i, item) {
        pTblOperationsTEUsHTML += '                                     <td>' + (item.NoOfOperations) + '</td>';
    });
    pTblOperationsTEUsHTML += '                                         <td><b>' + pOperationsTotalNo + '</b></td>';
    pTblOperationsTEUsHTML += '                                 </tr">';

    pTblOperationsTEUsHTML += '                                 <tr style="font-size:95%;">';
    pTblOperationsTEUsHTML += '                                     <td><b>TEUs</b></td>';
    $.each((pLstOperationsTEUs), function (i, item) {
        pTblOperationsTEUsHTML += '                                     <td>' + (item.TEUs) + '</td>';
    });
    pTblOperationsTEUsHTML += '                                         <td><b>' + pOperationsTotalTEUs + '</b></td>';
    pTblOperationsTEUsHTML += '                                 </tr">';

    pTblOperationsTEUsHTML += '                             </tbody>';
    pTblOperationsTEUsHTML += '                         </table>';


    var pTblTEUsStatisticsHTML = "";


    if ($("#hStatisticsFor").val() == "Lines") {
        pTblTEUsStatisticsHTML += "<div style='height: 400px; width: 600px;'>"
        pTblTEUsStatisticsHTML += "<h1>TEUs/" + ($("#hStatisticsFor").val()) + "</h1><canvas id=\"myChart\"></canvas>"
        pTblTEUsStatisticsHTML += "</div>"
    }
    







    //pTblTEUsStatisticsHTML += '                         <table id="tblTEUsStatistics" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTblTEUsStatisticsHTML += '                         <table id="tblTEUsStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #999 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTblTEUsStatisticsHTML += '                             <thead>';
    pTblTEUsStatisticsHTML += '                                 <tr class="" style="font-size:95%;">';
    pTblTEUsStatisticsHTML += '                                     <th>' + $("#hStatisticsFor").val() + '</th>';
    pTblTEUsStatisticsHTML += '                                     <th>TEUs</th>';
    pTblTEUsStatisticsHTML += '                                 </tr>';
    pTblTEUsStatisticsHTML += '                             </thead>';
    pTblTEUsStatisticsHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pLstStatisticsData), function (i, item) { debugger; });
    $.each((pLstStatisticsData), function (i, item) {
        pTblTEUsStatisticsHTML += '                                     <tr style="font-size:95%;">';
        pTblTEUsStatisticsHTML += '                                         <td>' + (item.Name == 0 ? "N/A (UnSpecified)" : item.Name) + '</td>';
        pTblTEUsStatisticsHTML += '                                         <td>' + (item.TEUs) + '</td>';
        //pTblTEUsStatisticsHTML += '                                         <td>' + (item.ActualArrival == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + '</td>';
        //pTblTEUsStatisticsHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
        pTblTEUsStatisticsHTML += '                                     </tr>';
    });
    pTblTEUsStatisticsHTML += '                                         <tr style="font-size:95%;">';
    pTblTEUsStatisticsHTML += '                                             <td><b>Total</b></td>';
    pTblTEUsStatisticsHTML += '                                             <td><b>' + pStatisticsTotalTEUs + '</b></td>';
    //pTblTEUsStatisticsHTML += '                                             <td>' + (item.ActualArrival == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival))) + '</td>';
    //pTblTEUsStatisticsHTML += '                                             <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
    pTblTEUsStatisticsHTML += '                                         </tr>';
    pTblTEUsStatisticsHTML += '                             </tbody>';
    pTblTEUsStatisticsHTML += '                         </table>';

    $("#hExportedTable").html(pTblOperationsTEUsHTML); //in all cases i put the tables in hidden div so i select each table separately
    $("#hExportedTable").append(pTblTEUsStatisticsHTML);
    if (pOutputTo == "Excel") {
        var pTableSummary = "";
        $("#tblOperationsTEUs" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblOperationsTEUs", "OperationsTEUs");
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTEUsStatistics", $("#hStatisticsFor").val() + " TEUs");
    }
    else {
        var mywindow = null;
        if (pOutputTo != "Email")
            mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" />';

        ReportHTML += `<script src="/Scripts/utilities/Chart.js"></script>`;


        ReportHTML += "     </head>";

        ReportHTML += '         <body style="background-color:white;">';
        if(pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';

        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>ShippingLine :</b> ' + $("#slShippingLine option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Airline :</b> ' + $("#slAirline option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Trucker :</b> ' + $("#slTrucker option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Oper. Status :</b> ' + $("#slOperationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>POLCountry :</b> ' + $("#slPOLCountry option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>POL :</b> ' + $("#slPOL option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>PODCountry :</b> ' + $("#slPODCountry option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>POD :</b> ' + $("#slPOD option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Open Date :</b> ' + ($("#txtFromOpenDate").val() == "" && $("#txtToOpenDate").val() == ""
            ? "All Dates"
            : ($("#txtFromOpenDate").val() == "" ? "" : "From " + $("#txtFromOpenDate").val() + " ") + ($("#txtToOpenDate").val() == "" ? "" : "To " + $("#txtToOpenDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';

        ReportHTML += '                         <div class="col-xs-6"> &nbsp; </div>'
        ReportHTML += '                         <div class="m-t-n"> &nbsp; </div>'

        ReportHTML += pTblOperationsTEUsHTML;
        ReportHTML += '                         <div class="m-t-n-lg"> &nbsp; </div>'
        ReportHTML += pTblTEUsStatisticsHTML

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

        if (pOutputTo != "Email") {


            mywindow.document.write(ReportHTML);

            if ($("#hStatisticsFor").val() == "Lines") {
                mywindow.addEventListener('load', function () {

                    var myChart = new Chart(mywindow.document.getElementById('myChart').getContext('2d'), {
                        type: 'bar',
                        data: {
                            labels: pLstStatisticsData.map(obj => obj.Name), // Extract the names from the array
                            datasets: [{
                                label: 'TEUs',
                                data: pLstStatisticsData.map(obj => obj.TEUs), // Extract the TEUs from the array
                                backgroundColor: 'blue',
                                borderColor: 'black',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            responsive: true
                        }
                    });

                }, false);
            }
            



            mywindow.document.close();
        }
        else {
            SendPDF_ReportByEmail($('#txtToEmail').val(), ReportHTML, pReportTitle, true);
        }
    }
}
