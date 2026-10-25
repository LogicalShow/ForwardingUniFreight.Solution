function ProfitabilityReport_Initialize() {
    debugger;
    LoadView("/Reports/ProfitabilityReport", "div-content", function () {
        CallGETFunctionWithParameters("/api/ProfitabilityReport/GetStatisticsFilter", null
            , function (data) {
                //data[0]:Salesman //data[1]:Branches //data[2]:Customers //data[3]:Currencies //data[4]:Oper.States
                debugger;
                //FillListFromObject(pID, pCodeOrName/1-Code 2-Name/, pStrFirstRow, pSlName, pData, callback)
                //FillListFromObject(null, 2, "All Salesmen", "slSalesman", data[0], null);
                FillListFromObject(null, 2, "All Branches", "slBranch", data[0], null);
                FillListFromObject(null, 2, "All ChargeTypes", "slChargeType", data[1], null);
                FillListFromObject(null, 2, "All Cost Centers", "slCostCenter", data[2], null);
                //FillListFromObject(null, 2, "All Customers", "slCustomer", data[2], null);
                //$("#slCustomer").html($("#hReadySlCustomers").html());
                //FillListFromObject(null, 2, "All Booking Parties", "slBookingParty", data[2], null);
                //$("#slBookingParty").html($("#hReadySlCustomers").html());
                //FillListFromObject(null, 1, "All Currencies", "slCurrency", data[3], null);
                //FillListFromObject(null, 2, "All States", "slOperationStages", data[4], null);
                //FillListFromObject(null, 1, "All Operations", "slOperation", data[5], null);
                $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
        FadePageCover(false);
    });
}
function ProfitabilityReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        //var ReportType = "";
        //if ($("#cbIsAnnualIncomeReport").prop("checked"))
        //    ReportType = "Income";
        //else if ($("#cbIsAnnualPayableReport").prop("checked"))
        //    ReportType = "Payable";

        //else if ($("#cbIsAnnualProfitReport").prop("checked"))
        //    ReportType = "Profit";

        //var pWhereClause = ProfitabilityReport_GetFilterWhereClause();
        var pParametersWithValues = {
            pBranchID: $("#slBranch").val() == "" ? 0 : $("#slBranch").val()
            , pChargeTypeID: $("#slChargeType").val() == "" ? 0 : $("#slChargeType").val()
            , pFromDate: $("#txtFromDate").val().trim()
            , pToDate: $("#txtToDate").val().trim()
            , pCostCenterIDs: $("#slCostCenter").val() == "" ? 0 : $("#slCostCenter").val()
            //, ReportType: ReportType

        };
        CallGETFunctionWithParameters("/api/ProfitabilityReport/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                    if ($("#cbIsAnnualIncomeReport").prop("checked"))
                        ProfitabilityReport_Income_DrawReport(data, pOutputTo);
                    else if ($("#cbIsAnnualPayableReport").prop("checked"))
                        ProfitabilityReport_Payable_DrawReport(data, pOutputTo);
                    else if ($("#cbIsAnnualProfitReport").prop("checked"))
                        ProfitabilityReport_AnnualProfit_DrawReport(data, pOutputTo);
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

//function ProfitabilityReport_GetFilterWhereClause() {}

function ProfitabilityReport_Income_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Annual Income Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblAnnualIncomeReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>ITEM</th>';
    pTablesHTML += '                                     <th>EGP</th>';
    pTablesHTML += '                                     <th>USD</th>';
    pTablesHTML += '                                     <th>EUR</th>';
    pTablesHTML += '                                     <th>Total ' + $("#hDefaultCurrencyCode").val() + '</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        if (item.ReceivableEGP != 0 || item.ReceivableUSD != 0 || item.ReceivableEUR != 0) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td>' + item.Name + '</td>';
            pTablesHTML += '                                 <td class="EGP">' + (item.ReceivableEGP == 0 ? "" : item.ReceivableEGP.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="USD">' + (item.ReceivableUSD == 0 ? "" : item.ReceivableUSD.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="EUR">' + (item.ReceivableEUR == 0 ? "" : item.ReceivableEUR.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="Default">' + (item.ReceivableInDefaultCurrency == 0 ? "" : item.ReceivableInDefaultCurrency.toFixed(4)) + '</td>';
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
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "EGP").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "USD").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "EUR").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualIncomeReport", "Default").toFixed(4) + '</td>';
    pTableSummary += '                                     </tr>';
    $("#tblAnnualIncomeReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAnnualIncomeReport", "AnnualIncomeReport");
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
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b> Cost Centers :</b> ' + $("#slCostCenter option:selected").text() + '</div>';        //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>ChargeType :</b> ' + $("#slChargeType option:selected").text() + '</div>';
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
function ProfitabilityReport_Payable_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Annual Payable Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblAnnualPayableReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>ITEM</th>';
    pTablesHTML += '                                     <th>EGP</th>';
    pTablesHTML += '                                     <th>USD</th>';
    pTablesHTML += '                                     <th>EUR</th>';
    pTablesHTML += '                                     <th>Total ' + $("#hDefaultCurrencyCode").val() + '</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        if (item.PayableEGP != 0 || item.PayableUSD != 0 || item.PayableEUR != 0) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td>' + item.Name + '</td>';
            pTablesHTML += '                                 <td class="EGP">' + (item.PayableEGP == 0 ? "" : item.PayableEGP.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="USD">' + (item.PayableUSD == 0 ? "" : item.PayableUSD.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="EUR">' + (item.PayableEUR == 0 ? "" : item.PayableEUR.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="Default">' + (item.PayableInDefaultCurrency == 0 ? "" : item.PayableInDefaultCurrency.toFixed(4)) + '</td>';
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
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualPayableReport", "EGP").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualPayableReport", "USD").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualPayableReport", "EUR").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualPayableReport", "Default").toFixed(4) + '</td>';
    pTableSummary += '                                     </tr>';
    $("#tblAnnualPayableReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAnnualPayableReport", "AnnualPayableReport");
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

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b> Cost Centers :</b> ' + $("#slCostCenter option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
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
function ProfitabilityReport_AnnualProfit_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTitle = "Annual Profit Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblProfitabilityReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblAnnualProfitReport" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:95%;">';
    pTablesHTML += '                                     <th>ITEM</th>';
    pTablesHTML += '                                     <th>TOTAL EXPENSE</th>';
    pTablesHTML += '                                     <th>TOTAL REVENUE</th>';
    pTablesHTML += '                                     <th>PROFIT</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        if (item.PayableInDefaultCurrency != 0 || item.ReceivableInDefaultCurrency != 0) {
            pTablesHTML += '                             <tr style="font-size:95%;">';
            pTablesHTML += '                                 <td>' + item.Name + '</td>';
            pTablesHTML += '                                 <td class="TotalExpense">' + (item.PayableInDefaultCurrency == 0 ? "" : item.PayableInDefaultCurrency.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="TotalRevenue">' + (item.ReceivableInDefaultCurrency == 0 ? "" : item.ReceivableInDefaultCurrency.toFixed(4)) + '</td>';
            pTablesHTML += '                                 <td class="TotalProfit">' + ((item.ReceivableInDefaultCurrency - item.PayableInDefaultCurrency) == 0 ? "" : (item.ReceivableInDefaultCurrency - item.PayableInDefaultCurrency).toFixed(4)) + '</td>';
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
    var pTableSummary = "";
    pTableSummary += '                                     <tr style="font-size:95%;">';
    pTableSummary += '                                         <td class="font-bold">Totals:</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualProfitReport", "TotalExpense").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualProfitReport", "TotalRevenue").toFixed(4) + '</td>';
    pTableSummary += '                                         <td class="font-bold">' + GetColumnSum("tblAnnualProfitReport", "TotalProfit").toFixed(4) + '</td>';
    pTableSummary += '                                     </tr>';
    $("#tblAnnualProfitReport" + " tbody").append(pTableSummary);
    if (pOutputTo == "Excel") {
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAnnualProfitReport", "AnnualProfitReport");
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

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b> Cost Centers :</b> ' + $("#slCostCenter option:selected").text() + '</div>';

        //ReportHTML += '             <div class="col-xs-3"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Agent :</b> ' + $("#slAgent option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Quot. Status :</b> ' + $("#slQuotationStages option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Period :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
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
