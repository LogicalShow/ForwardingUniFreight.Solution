function ApplySelectListSearch() {
    debugger;
    $("#slCustomer").css({ "width": "100%" }).select2();
    $("#slCustomer").trigger("change"); //i dont 

    $("#slPOL").css({ "width": "100%" }).select2();
    $("#slPOL").trigger("change");

    $("#slPOD").css({ "width": "100%" }).select2();
    $("#slPOD").trigger("change");

    $("#slGateInPort").css({ "width": "100%" }).select2();
    $("#slGateInPort").trigger("change");

    $("#slGateOutPort").css({ "width": "100%" }).select2();
    $("#slGateOutPort").trigger("change");

    $("#slLoadingZone").css({ "width": "100%" }).select2();
    $("#slLoadingZone").trigger("change");

    $("#slFirstCuringArea").css({ "width": "100%" }).select2();
    $("#slFirstCuringArea").trigger("change");

    $("#slCommodity").css({ "width": "100%" }).select2();
    $("#slCommodity").trigger("change");

    $("#slFilterCreator").css({ "width": "100%" }).select2();
    $("#slFilterCreator").trigger("change");

    $("#slDriver").css({ "width": "100%" }).select2();
    $("#slDriver").trigger("change");

    $("#slEquipment").css({ "width": "100%" }).select2();
    $("#slEquipment").trigger("change");

    $("div[tabindex='-1']").removeAttr('tabindex');
}
function TruckingOrderReport_Initialize() {
    debugger;
    LoadView("/TR/Reports/TruckingOrderReport", "div-content", function () {
        CallGETFunctionWithParameters("/api/TruckingOrderReport/GetStatisticsFilter", null
            , function (data) {
                var pPortList = data[4];
                var pUserList = data[5];
                FillListFromObject(null, 2, "<--Select-->", "slTrailer", data[0], null);
                FillListFromObject(null, 2, "<--Select-->", "slChargeType", data[1], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slDriver", data[2], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slEquipment", data[3], null);
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slPOL", pPortList
                    , function () {
                        $("#slPOD").html($("#slPOL").html());
                        $("#slGateInPort").html($("#slPOL").html());
                        $("#slGateOutPort").html($("#slPOL").html());
                        $("#slLoadingZone").html($("#slPOL").html());
                        $("#slFirstCuringArea").html($("#slPOL").html());
                    });
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterCreator", pUserList, null);
                $("#slCustomer").html($("#hReadySlCustomers").html());

                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
                ApplySelectListSearch();
            }
            , function () { FadePageCover(false); $("#hl-menu-TR").parent().addClass("active"); });
    });
}
function TrailerProfitability_Print(pOutputTo) {
    debugger;

    if ($("#slHasInvoice").val() != 0 && $("#slOrderType").val() == 0)
        swal("", "To use this option, please select (order type) whether containers or distrbution.");
    else if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = TrailerProfitability_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pIsPerEquipment: $("#cbIsPerEquipment").prop("checked")
        };
        CallGETFunctionWithParameters("/api/TruckingOrderReport/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                    if (pOutputTo == "ExcelInColumns")
                        TruckingOrderReports_ExcelInColumns(data, pOutputTo);
                    else
                        TruckingOrderReports_DrawReport_IncludeDetails(data, pOutputTo);
                }
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function TrailerProfitability_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE RoutingTypeID=60 AND GateInDate<>'' " + "\n";
    //var pWhereClause = "WHERE IsDeleted=0 AND TrailerID IS NOT NULL ";
    //if ($("#slTrailer").val() != "")
    //    pWhereClause += " AND (TrailerID=" + $("#slTrailer").val() + ") \n";
    //if ($("#slChargeType").val() != "")
    //    pWhereClause += " AND (ChargeTypeID=" + $("#slChargeType").val() + ") \n";
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        pWhereClause += " AND CONVERT(date,GateInDate,103) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        pWhereClause += " AND CONVERT(date,GateInDate,103) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'" + " \n";
    //return pWhereClause;

    if ($("#txtOperationSerial").val().trim() != "")
        pWhereClause += " And OperationSerial = N'" + $("#txtOperationSerial").val().trim() + "'" + " \n";
    if ($("#slEquipment").val().trim() != "")
        pWhereClause += " And EquipmentID =" + $("#slEquipment").val() + " \n";
    if ($("#slDriver").val().trim() != "")
        pWhereClause += " And DriverID =" + $("#slDriver").val() + " \n";
    if ($("#txtBillNumber").val().trim() != "")
        pWhereClause += " And BillNumber = N'" + $("#txtBillNumber").val().trim() + "'" + " \n";
    if ($("#slSearchStatus").val() == 10)
        pWhereClause += " AND IsApproved = 1" + "\n";
    if ($("#slSearchStatus").val() == 20)
        pWhereClause += " AND IsApproved = 0" + "\n";
    if ($("#slCustomer").val().trim() != "")
        pWhereClause += " AND ClientName =N'" + $("#slCustomer option:selected").text() + "'" + " \n";
    if ($("#slFilterCreator").val().trim() != "")
        pWhereClause += " AND CreatorUserID =" + $("#slFilterCreator").val() + " \n";
    if ($("#slPOL").val().trim() != "")
        pWhereClause += " AND POL=" + $("#slPOL").val() + " \n";
    if ($("#slPOD").val().trim() != "")
        pWhereClause += " AND POD=" + $("#slPOD").val() + " \n";
    if ($("#slGateInPort").val().trim() != "")
        pWhereClause += " AND GateInPortID=" + $("#slGateInPort").val() + " \n";
    if ($("#slGateOutPort").val() != "")
        pWhereClause += " AND GateOutPortID=" + $("#slGateOutPort").val() + " \n";
    if ($("#slLoadingZone").val().trim() != "")
        pWhereClause += " AND LoadingZoneID=" + $("#slLoadingZone").val() + " \n";
    if ($("#slFirstCuringArea").val().trim() != "")
        pWhereClause += " AND FirstCuringAreaID=" + $("#slFirstCuringArea").val() + " \n";
    if ($("#slOrderType").val() == 20) { //Distribution --> because in distribution orders are 
        if ($("#slHasInvoice").val() == 10)
            pWhereClause += " AND InvoiceID IS NOT NULL" + " \n";
        if ($("#slHasInvoice").val() == 20)
            pWhereClause += " AND InvoiceID IS NULL " + " \n";
    }
    else if ($("#slOrderType").val() == 10) { //Containers
        if ($("#slHasInvoice").val() == 10)
            pWhereClause += " AND OperationInvoicesCount>0" + " \n";
        if ($("#slHasInvoice").val() == 20)
            pWhereClause += "AND OperationInvoicesCount=0" + " \n";
    }
    if ($("#slOrderType").val() == 10)
        pWhereClause += " AND IsFleet=0" + " \n";
    if ($("#slOrderType").val() == 20)
        pWhereClause += " AND IsFleet=1" + " \n";
    return pWhereClause;
}
function TrailerProfitability_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Trailer Profitability Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblTrailerProfitability" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblTrailerProfitability" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>Trailer</th>';
    pTablesHTML += '                                     <th>Driver</th>';
    pTablesHTML += '                                     <th>Item</th>';
    pTablesHTML += '                                     <th>Gate-In Port</th>';
    pTablesHTML += '                                     <th>Gate-Out Port</th>';
    pTablesHTML += '                                     <th>Payables</th>';
    pTablesHTML += '                                     <th>Receivables</th>';
    pTablesHTML += '                                     <th>Profit</th>';
    pTablesHTML += '                                     <th>Cur</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        var _Profit = item.Receivables - item.Payables;
        pTablesHTML += '                             <tr style="font-size:95%;">';
        pTablesHTML += '                                 <td class="Trailer">' + (item.TrailerName == 0 ? "" : item.TrailerName) + '</td>';
        pTablesHTML += '                                 <td class="Driver">' + (item.DriverName == 0 ? "" : item.DriverName) + '</td>';
        pTablesHTML += '                                 <td>' + item.ChargeTypeName + '</td>';
        pTablesHTML += '                                 <td class="GateInPortName">' + (item.GateInPortName == 0 ? "" : item.GateInPortName) + '</td>';
        pTablesHTML += '                                 <td class="GateOutPortName">' + (item.GateOutPortName == 0 ? "" : item.GateOutPortName) + '</td>';
        pTablesHTML += '                                 <td class="Payables">' + (item.Payables == 0 ? "" : item.Payables.toFixed(2)) + '</td>';
        pTablesHTML += '                                 <td class="Receivables">' + (item.Receivables == 0 ? "" : item.Receivables.toFixed(2)) + '</td>';
        pTablesHTML += '                                 <td class="Profit ' + item.CurrencyCode + '">' + _Profit.toFixed(2) + '</td>';
        pTablesHTML += '                                 <td>' + item.CurrencyCode + '</td>';
        //pTablesHTML += '                                 <td>' + (item.CreationDate == "/Date(-2208996000000)/" ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate))) + '</td>';
        //if (pOutputTo != "Excel")
        //    pTablesHTML += "                                 <td><input type='checkbox' disabled='disabled' " + (item.IsExpired ? " checked='checked' " : "") + " /></td>";
        pTablesHTML += '                             </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    /*********************Append table summaries*************************/
    var pEGP = GetColumnSum("tblTrailerProfitability", "EGP");
    var pSAR = GetColumnSum("tblTrailerProfitability", "SAR");
    var pKWD = GetColumnSum("tblTrailerProfitability", "KWD");
    var pEUR = GetColumnSum("tblTrailerProfitability", "EUR");
    var pGBP = GetColumnSum("tblTrailerProfitability", "GBP");
    var pUSD = GetColumnSum("tblTrailerProfitability", "USD");    
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    pTableSummary += '                                         <td class="font-bold">Totals:</td>';        
    pTableSummary += '                                         <td class="font-bold" colspan="8">'
                + (pEGP == 0 ? "" : pEGP.toFixed(2) + 'EGP ')
                + (pSAR == 0 ? "" : pSAR.toFixed(2) + 'SAR ')
                + (pKWD == 0 ? "" : pKWD.toFixed(2) + 'KWD ')
                + (pEUR == 0 ? "" : pEUR.toFixed(2) + 'EUR ')
                + (pGBP == 0 ? "" : pGBP.toFixed(2) + 'GBP ')
                + (pUSD == 0 ? "" : pUSD.toFixed(2) + 'USD ')
        + '</td>';
    if (pOutputTo == "Excel") //not to call indefined td
        pTableSummary += '                                      <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> ';
    pTableSummary += '                                     </tr>';

    $("#tblTrailerProfitability" + " tbody").append(pTableSummary);

    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTrailerProfitability", "TrailerProfitability");
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

        ReportHTML += '             <div class="col-xs-6"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Trailer :</b> ' + $("#slTrailer option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
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
function TruckingOrderReports_DrawReport_IncludeDetails(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pPayables = JSON.parse(data[2]);
    var pReportTitle = "Trucking Order Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var _NumberOfColumns = 2;
    var pSubTotalSummary = 0;
    var pTotalSummary = 0;

    $.each((pReportRows), function (i, item) {
        pTableHTML += '                         <table id="tblTruckingOrderReports' + item.ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        pTableHTML += '                             <thead>';
        if (pOutputTo == "Excel") {
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td><b>Bill No. ' + (item.BillNumber) + '</b></td>';
            pTableHTML += '                                     <td><b>Client : ' + item.ClientName/*(pOperations.filter(x=> x.ID == item.OperationID)[0].ClientName)*/ + '</b></td>';
            pTableHTML += '                                     <td><b>Oper. ' + (item.OperationCode) + '</b></td>';
            pTableHTML += '                                     <td><b>Driver Name : ' + (item.EquipmentDriverName) + '</b></td>';
            pTableHTML += '                                     <td><b>Truck Number : ' + (item.EquipmentNumber) + '</b></td>';
            pTableHTML += '                                     <td><b>Bill No. ' + (item.BillNumber) + '</b></td>';
            pTableHTML += '                                     <td><b>Bill No. ' + (item.BillNumber) + '</b></td>';
            pTableHTML += '                                 </tr>';
        }
        else {
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <th colspan=' + _NumberOfColumns + '>Bill No. ' + (item.BillNumber)
                                                                            + '&emsp; Client: ' + item.ClientName/*pOperations.filter(x=> x.ID == item.OperationID)[0].ClientName*/ + '&emsp; Oper.: ' + item.OperationCode + '&emsp; Driver Name: ' + item.EquipmentDriverName + '&emsp; Truck Number: ' + item.EquipmentNumber + '</th>';
            pTableHTML += '                                 </tr>';
        }
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <th style="width:30%">Charge Type</th>';
        pTableHTML += '                                     <th style="width:5%">Amount</th>';
        pTableHTML += '                                 </tr>';
        pTableHTML += '                             </thead>';
        pTableHTML += '                             <tbody>';

        var _CurrentPayables = pPayables.filter(x=> x.TruckingOrderID == item.ID);
        pSubTotalSummary = 0;
        $.each((_CurrentPayables), function (j, PayableItem) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            pTableHTML += '                                         <td>' + PayableItem.ChargeTypeName + '</td>';
            pTableHTML += '                                         <td>' + PayableItem.CostAmount.toFixed(2) + '</td>';
            pTableHTML += '                                     </tr>';
            pTotalSummary += PayableItem.CostAmount;
            pSubTotalSummary += PayableItem.CostAmount;
        });
        pTableHTML += '                                     <tr style="font-size:95%;">';
        pTableHTML += '                                         <td> <b>Subtotal </b></td>';
        pTableHTML += '                                         <td>' + pSubTotalSummary.toFixed(2) + '</td>';
        pTableHTML += '                                     </tr>';

        pTableHTML += '                             </tbody>';
        pTableHTML += '                         </table>';
    }); //$.each((pReportRows), function (i, item) {

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        if (pReportRows.length > 0) {

            ReportHTML += '         <div id="ReportBody">';
            for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
                ReportHTML += '                         <table id="tblTruckingOrderReports' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblTruckingOrderReports" + pReportRows[j].ID).html();
                ReportHTML += '                         </table>';
            }
            ReportHTML += '                         <table id="tblTruckingOrderReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            ReportHTML += '                                     <td>TOTAL AMOUNT</td>';
            ReportHTML += '                                     <td>' + pTotalSummary.toFixed(2) + '</td>';
            ReportHTML += '                                 </tr>';
            ReportHTML += '                         </table>';

            ReportHTML += '</div>';
            //$("#tblTruckingOrderReports" + pReportRows[j].ID + " tbody").append(pTableSummary);
            //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTruckingOrderReports" + pReportRows[j].ID, 'TruckingOrderReports');
            $("#hExportedTable").html(ReportHTML);

            var $table = $("#ReportBody");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "TruckingOrderReports" + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
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


        ReportHTML += '                     <div>&nbsp;</div>';

        for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            ReportHTML += '                         <table id="tblTruckingOrderReports' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblTruckingOrderReports" + pReportRows[j].ID).html();
            ReportHTML += '                         </table>';
        }

        debugger;
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
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
function TruckingOrderReports_ExcelInColumns(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pPayables = JSON.parse(data[2]);
    var pChargeList = JSON.parse(data[3]);
    var pReportTitle = "Trucking Order Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    if (pDefaults.UnEditableCompanyName == "SEA") {
        pTableHTML += '                         <table id="tblTruckingOrderReports" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        pTableHTML += '                             <thead>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        if ($("#cbIsPerTruckingOrder").prop("checked")) {
            pTableHTML += '                                     <td><b>رقم امر النقل</b></td>';
            pTableHTML += '                                     <td><b>رقم العمليه</b></td>';
            pTableHTML += '                                     <td><b>اسم مدخل البيانات</b></td>';
            pTableHTML += '                                     <td><b>تاريخ</b></td>';
            pTableHTML += '                                     <td><b>عدد النقلات</b></td>';
            pTableHTML += '                                     <td><b>الكمية</b></td>';
            //pTableHTML += '                                     <td><b>Invoice</b></td>';
            pTableHTML += '                                     <td><b>توجيه عمل</b></td>';
            pTableHTML += '                                     <td><b>سحب الحاوية</b></td>';
            pTableHTML += '                                     <td><b>وصول الحاوية</b></td>';
            pTableHTML += '                                     <td><b>السائق</b></td>';
            pTableHTML += '                                     <td><b>نوع السيارة</b></td>';
            //pTableHTML += '                                     <td><b>قيمة النولون</b></td>';
            //pTableHTML += '                                     <td><b>Containers</b></td>';
            //pTableHTML += '                                     <td><b>Division</b></td>';
            pTableHTML += '                                     <td><b>ملاحظات</b></td>';
            pTableHTML += '                                     <td><b>كم قبل</b></td>';
            pTableHTML += '                                     <td><b>كم بعد</b></td>';
            pTableHTML += '                                     <td><b>كم فرق</b></td>';
        }
        pTableHTML += '                                     <td><b>الشاحنة</b></td>';
        pTableHTML += '                                     <td><b>المقطورة</b></td>';
        if ($("#cbIsPerEquipment").prop("checked")) {
            pTableHTML += '                                     <td><b>Orders Count</b></td>';
            pTableHTML += '                                     <td><b>Containers Count</b></td>';//in case of per equipment i get containers count instead of count
        }
        for (var j = 0; j < pChargeList.length; j++) {
            pTableHTML += '                                     <td><b>' + pChargeList[j].ChargeTypeName + '</b></td>';
        }
        pTableHTML += '                                 </tr>';
        pTableHTML += '                             </thead>';
        pTableHTML += '                             <tbody>';
        $.each((pReportRows), function (i, item) {
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            if ($("#cbIsPerTruckingOrder").prop("checked")) {
                pTableHTML += '                                     <td>' + (item.TruckingOrderCode) + '</td>';
                pTableHTML += '                                     <td>' + (item.OperationCode) + '</td>';
                pTableHTML += '                                     <td>' + (item.CreatorName) + '</td>';
                pTableHTML += '                                     <td>' + (item.GateInDate) + '</td>';
                pTableHTML += '                                     <td>' + (item.BillNumber == 0 ? "" : item.BillNumber) + '</td>';
                pTableHTML += '                                     <td>' + (item.Quantity == 0 ? "" : item.Quantity) + '</td>';
                //pTableHTML += '                                     <td>' + (item.InvoiceNumber == 0 ? "" : item.InvoiceNumber) + '</td>';
                pTableHTML += '                                     <td>' + (item.ClientName) + '</td>';
                pTableHTML += '                                     <td>' + (item.POLName) + '</td>';
                pTableHTML += '                                     <td>' + (item.PODName) + '</td>';
                pTableHTML += '                                     <td>' + (item.EquipmentDriverName == 0 ? "" : item.EquipmentDriverName) + '</td>';
                pTableHTML += '                                     <td>' + (item.EquipmentModelName == 0 ? "" : item.EquipmentModelName) + '</td>';
                //pTableHTML += '                                     <td>' + (item.Sale) + '</td>';
                //pTableHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
                //pTableHTML += '                                     <td>' + (item.DivisionName == 0 ? "" : item.DivisionName) + '</td>';
                pTableHTML += '                                     <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                pTableHTML += '                                     <td>' + (item.LastTruckCounter == 0 ? "" : item.LastTruckCounter) + '</td>';
                pTableHTML += '                                     <td>' + (item.TruckCounter == 0 ? "" : item.TruckCounter) + '</td>';
                pTableHTML += '                                     <td>' + (item.TruckCounter - item.LastTruckCounter) + '</td>';
            }
            pTableHTML += '                                     <td>' + (item.EquipmentNumber == 0 ? "" : item.EquipmentNumber) + '</td>';
            pTableHTML += '                                     <td>' + (item.TrailerNumber == 0 ? "" : item.TrailerNumber) + '</td>';
            if ($("#cbIsPerEquipment").prop("checked")) {
                pTableHTML += '                                     <td>' + (item.OrdersCount == 0 ? "" : item.OrdersCount) + '</td>';
                pTableHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
            }
            debugger;
            for (var j = 0; j < pChargeList.length; j++) {
                var _CurrentColumnChargeID = pChargeList[j].ChargeTypeID;
                var _CurrentChargeAmount = 0;
                if ($("#cbIsPerTruckingOrder").prop("checked"))
                    _CurrentChargeAmount = pPayables.find(x => x.TruckingOrderID == item.ID && x.ChargeTypeID == _CurrentColumnChargeID) == undefined ? 0 : pPayables.find(x => x.TruckingOrderID == item.ID && x.ChargeTypeID == _CurrentColumnChargeID).CostAmount;
                else
                    _CurrentChargeAmount = pPayables.find(x => x.EquipmentID == item.EquipmentID && x.ChargeTypeID == _CurrentColumnChargeID) == undefined ? 0 : pPayables.find(x => x.EquipmentID == item.EquipmentID && x.ChargeTypeID == _CurrentColumnChargeID).CostAmount;
                pTableHTML += '                                     <td>' + _CurrentChargeAmount + '</td>';
                pChargeList[j].ChargeTypeTotal += parseFloat(_CurrentChargeAmount);
            }
            pTableHTML += '                                 </tr>';
        }); //$.each((pReportRows), function (i, item) {
        pTableHTML += '                                 <tr>';
        if ($("#cbIsPerTruckingOrder").prop("checked")) {
            pTableHTML += '                                     <td>' + /*(item.TruckingOrderCode) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.OperationCode) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.CreatorName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.GateInDate) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.BillNumber == 0 ? "" : item.BillNumber) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.InvoiceNumber) +*/ '</td>';
            //pTableHTML += '                                     <td>' + /*(item.ClientName) +*/ '</td>';
            //pTableHTML += '                                     <td>' + /*(item.POLName) +*/ '</td>';
            //pTableHTML += '                                     <td>' + /*(item.PODName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.EquipmentDriverName == 0 ? "" : item.EquipmentDriverName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.EquipmentModelName == 0 ? "" : item.EquipmentModelName) +*/ '</td>';
            //pTableHTML += '                                     <td>' + /*(item.Sale) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.Sale) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.Sale) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.ContainerTypes == 0 ? "" : item.ContainerTypes) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.DivisionName == 0 ? "" : item.DivisionName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.Notes == 0 ? "" : item.Notes) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.LastTruckCounter == 0 ? "" : item.LastTruckCounter) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.TruckCounter == 0 ? "" : item.TruckCounter) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.TruckCounter - item.LastTruckCounter) +*/ '</td>';
        }
        if ($("#cbIsPerEquipment").prop("checked")) {
            pTableHTML += '                                     <td>' + /*(item.OrdersCount == 0 ? "" : item.OrdersCount) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.ContainerTypes == 0 ? "" : item.ContainerTypes) +*/ '</td>';
        }
        pTableHTML += '                                     <td>' + 'Totals' + /*(item.EquipmentNumber == 0 ? "" : item.EquipmentNumber) +*/ '</td>';

        for (var j = 0; j < pChargeList.length; j++) {
            pTableHTML += '                                     <td>' + pChargeList[j].ChargeTypeTotal + '</td>';
        }
        pTableHTML += '                                 </tr>';

        pTableHTML += '                             </tbody>';
        pTableHTML += '                         </table>';
    } else {

        pTableHTML += '                         <table id="tblTruckingOrderReports" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        pTableHTML += '                             <thead>';
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        if ($("#cbIsPerTruckingOrder").prop("checked")) {
            pTableHTML += '                                     <td><b>TruckingOrderNo</b></td>';
            pTableHTML += '                                     <td><b>Oper</b></td>';
            pTableHTML += '                                     <td><b>Creator</b></td>';
            pTableHTML += '                                     <td><b>Date</b></td>';
            pTableHTML += '                                     <td><b>Bill No</b></td>';
            pTableHTML += '                                     <td><b>Invoice</b></td>';
            pTableHTML += '                                     <td><b>Client</b></td>';
            pTableHTML += '                                     <td><b>POL</b></td>';
            pTableHTML += '                                     <td><b>POD</b></td>';
            pTableHTML += '                                     <td><b>Driver</b></td>';
            pTableHTML += '                                     <td><b>Model</b></td>';
            pTableHTML += '                                     <td><b>Freight</b></td>';
            pTableHTML += '                                     <td><b>Containers</b></td>';
            pTableHTML += '                                     <td><b>Division</b></td>';
            pTableHTML += '                                     <td><b>Notes</b></td>';
            pTableHTML += '                                     <td><b>KM Before</b></td>';
            pTableHTML += '                                     <td><b>KM After</b></td>';
            pTableHTML += '                                     <td><b>Difference</b></td>';
        }
        pTableHTML += '                                     <td><b>Truck Number</b></td>';
        if ($("#cbIsPerEquipment").prop("checked")) {
            pTableHTML += '                                     <td><b>Orders Count</b></td>';
            pTableHTML += '                                     <td><b>Containers Count</b></td>';//in case of per equipment i get containers count instead of count
        }
        for (var j = 0; j < pChargeList.length; j++) {
            pTableHTML += '                                     <td><b>' + pChargeList[j].ChargeTypeCode + '</b></td>';
        }
        pTableHTML += '                                 </tr>';
        pTableHTML += '                             </thead>';
        pTableHTML += '                             <tbody>';
        $.each((pReportRows), function (i, item) {
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            if ($("#cbIsPerTruckingOrder").prop("checked")) {
                pTableHTML += '                                     <td>' + (item.TruckingOrderCode) + '</td>';
                pTableHTML += '                                     <td>' + (item.OperationCode) + '</td>';
                pTableHTML += '                                     <td>' + (item.CreatorName) + '</td>';
                pTableHTML += '                                     <td>' + (item.GateInDate) + '</td>';
                pTableHTML += '                                     <td>' + (item.BillNumber == 0 ? "" : item.BillNumber) + '</td>';
                pTableHTML += '                                     <td>' + (item.InvoiceNumber == 0 ? "" : item.InvoiceNumber) + '</td>';
                pTableHTML += '                                     <td>' + (item.ClientName) + '</td>';
                pTableHTML += '                                     <td>' + (item.POLName) + '</td>';
                pTableHTML += '                                     <td>' + (item.PODName) + '</td>';
                pTableHTML += '                                     <td>' + (item.EquipmentDriverName == 0 ? "" : item.EquipmentDriverName) + '</td>';
                pTableHTML += '                                     <td>' + (item.EquipmentModelName == 0 ? "" : item.EquipmentModelName) + '</td>';
                pTableHTML += '                                     <td>' + (item.Sale) + '</td>';
                pTableHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
                pTableHTML += '                                     <td>' + (item.DivisionName == 0 ? "" : item.DivisionName) + '</td>';
                pTableHTML += '                                     <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
                pTableHTML += '                                     <td>' + (item.LastTruckCounter == 0 ? "" : item.LastTruckCounter) + '</td>';
                pTableHTML += '                                     <td>' + (item.TruckCounter == 0 ? "" : item.TruckCounter) + '</td>';
                pTableHTML += '                                     <td>' + (item.TruckCounter - item.LastTruckCounter) + '</td>';
            }
            pTableHTML += '                                     <td>' + (item.EquipmentNumber == 0 ? "" : item.EquipmentNumber) + '</td>';
            if ($("#cbIsPerEquipment").prop("checked")) {
                pTableHTML += '                                     <td>' + (item.OrdersCount == 0 ? "" : item.OrdersCount) + '</td>';
                pTableHTML += '                                     <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
            }
            debugger;
            for (var j = 0; j < pChargeList.length; j++) {
                var _CurrentColumnChargeID = pChargeList[j].ChargeTypeID;
                var _CurrentChargeAmount = 0;
                if ($("#cbIsPerTruckingOrder").prop("checked"))
                    _CurrentChargeAmount = pPayables.find(x => x.TruckingOrderID == item.ID && x.ChargeTypeID == _CurrentColumnChargeID) == undefined ? 0 : pPayables.find(x => x.TruckingOrderID == item.ID && x.ChargeTypeID == _CurrentColumnChargeID).CostAmount;
                else
                    _CurrentChargeAmount = pPayables.find(x => x.EquipmentID == item.EquipmentID && x.ChargeTypeID == _CurrentColumnChargeID) == undefined ? 0 : pPayables.find(x => x.EquipmentID == item.EquipmentID && x.ChargeTypeID == _CurrentColumnChargeID).CostAmount;
                pTableHTML += '                                     <td>' + _CurrentChargeAmount + '</td>';
                pChargeList[j].ChargeTypeTotal += parseFloat(_CurrentChargeAmount);
            }
            pTableHTML += '                                 </tr>';
        }); //$.each((pReportRows), function (i, item) {
        pTableHTML += '                                 <tr>';
        if ($("#cbIsPerTruckingOrder").prop("checked")) {
            pTableHTML += '                                     <td>' + /*(item.TruckingOrderCode) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.OperationCode) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.CreatorName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.GateInDate) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.BillNumber == 0 ? "" : item.BillNumber) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.InvoiceNumber) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.ClientName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.POLName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.PODName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.EquipmentDriverName == 0 ? "" : item.EquipmentDriverName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.EquipmentModelName == 0 ? "" : item.EquipmentModelName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.Sale) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.ContainerTypes == 0 ? "" : item.ContainerTypes) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.DivisionName == 0 ? "" : item.DivisionName) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.Notes == 0 ? "" : item.Notes) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.LastTruckCounter == 0 ? "" : item.LastTruckCounter) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.TruckCounter == 0 ? "" : item.TruckCounter) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.TruckCounter - item.LastTruckCounter) +*/ '</td>';
        }
        if ($("#cbIsPerEquipment").prop("checked")) {
            pTableHTML += '                                     <td>' + /*(item.OrdersCount == 0 ? "" : item.OrdersCount) +*/ '</td>';
            pTableHTML += '                                     <td>' + /*(item.ContainerTypes == 0 ? "" : item.ContainerTypes) +*/ '</td>';
        }
        pTableHTML += '                                     <td>' + 'Totals' + /*(item.EquipmentNumber == 0 ? "" : item.EquipmentNumber) +*/ '</td>';

        for (var j = 0; j < pChargeList.length; j++) {
            pTableHTML += '                                     <td>' + pChargeList[j].ChargeTypeTotal + '</td>';
        }
        pTableHTML += '                                 </tr>';

        pTableHTML += '                             </tbody>';
        pTableHTML += '                         </table>';
    }
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "ExcelInColumns") {
        if (pReportRows.length > 0) {

            ReportHTML += '<div id="ReportBody">';
            ReportHTML += pTableHTML;
            //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            //    ReportHTML += '                         <table id="tblTruckingOrderReports' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            //    ReportHTML += '                         ' + $("#tblTruckingOrderReports" + pReportRows[j].ID).html();
            //    ReportHTML += '                         </table>';
            //}
            //ReportHTML += '                         <table id="tblTruckingOrderReports' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            //ReportHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //ReportHTML += '                                     <td>TOTAL AMOUNT</td>';
            //ReportHTML += '                                     <td>' + pTotalSummary.toFixed(2) + '</td>';
            //ReportHTML += '                                 </tr>';
            //ReportHTML += '                         </table>';

            ReportHTML += '</div>';
            //$("#tblTruckingOrderReports" + pReportRows[j].ID + " tbody").append(pTableSummary);
            //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTruckingOrderReports" + pReportRows[j].ID, 'TruckingOrderReports');
            $("#hExportedTable").html(ReportHTML);

            var $table = $("#ReportBody");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "TruckingOrderReports" + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
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


        ReportHTML += '                     <div>&nbsp;</div>';

        for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            ReportHTML += '                         <table id="tblTruckingOrderReports' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblTruckingOrderReports" + pReportRows[j].ID).html();
            ReportHTML += '                         </table>';
        }

        debugger;
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
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