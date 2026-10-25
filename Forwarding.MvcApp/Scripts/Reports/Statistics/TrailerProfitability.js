function TrailerProfitability_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = TrailerProfitability_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/TrailerProfitability/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                        TrailerProfitability_DrawReport(data, pOutputTo);
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
    var pWhereClause = "WHERE IsDeleted=0 AND TrailerID IS NOT NULL ";
    if ($("#slTrailer").val() != "")
        pWhereClause += " AND (TrailerID=" + $("#slTrailer").val() + ") \n";
    if ($("#slChargeType").val() != "")
        pWhereClause += " AND (ChargeTypeID=" + $("#slChargeType").val() + ") \n";
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        pWhereClause += " AND (IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + ") \n";
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        pWhereClause += " AND (IssueDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'" + ") \n";
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
