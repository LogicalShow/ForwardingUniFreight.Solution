function AgingReports_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = AgingReports_GetFilterWhereClause(); //if i need filters then Re-Enable what i need
        //if ($('#ulReportTypes .active').val() == 0)
        //    swal(strSorry, "Please, Select a report type.");
        //else {
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pPRType: $("#slAgingType").val()
            , pSeparateCurrencies: $("#cbSeparateCurrencies").prop("checked")
            , pIncludeDetails: $("#cbIncludeDetails").prop("checked")
            //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
            //    : $("#lbl-filter-export").hasClass('active') ? "Export"
            //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
            //    : "ALL")
            //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
            //    : $("#lbl-filter-air").hasClass('active') ? "Air"
            //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
            //    : "ALL")
        };
        CallGETFunctionWithParameters("/api/AgingReports/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    if ($("#cbSeparateCurrencies").prop("checked"))
                        AgingReports_DrawReport_SeparateCurrencies(data, pOutputTo);
                    else
                        AgingReports_DrawReport(data, pOutputTo);
                else
                    swal(strSorry, "No records are found for that search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function AgingReports_GetFilterWhereClause() {
    var pWhereClause = "WHERE TransactionType=" + ($("#slAgingType").val() == constPRTypeReceivable ? constTransactionInvoiceApproval : constTransactionPayableApproval); //"WHERE ISNULL(Late , 0) <> 0 OR ISNULL(ZeroTo30 , 0) <> 0 OR ISNULL(ThirtyOneTo60 , 0) <> 0 OR ISNULL(SixtyOneTo90 , 0) <> 0 OR ISNULL(FourtySixTo60 , 0) <> 0";
//    var pSalesmanFilter = "";
//    var pBranchFilter = "";
//    var pBankAccountFilter = "";
//    var pPRTypeFilter = "";
//    var pPartnerFilter = "";
//    var pCurrencyFilter = "";
//    var pFromDateFilter = "";
//    var pToDateFilter = "";

//    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
//    if (pBranchFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pBranchFilter;
//    else
//        if (pBranchFilter != "" && pWhereClause == "")
//            pWhereClause += " WHERE " + pBranchFilter;

//    pBankAccountFilter = ($("#slBankAccount").val() == "" ? "" : " BankAccountID = " + $("#slBankAccount").val());
//    if (pBankAccountFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pBankAccountFilter;
//    else
//        if (pBankAccountFilter != "" && pWhereClause == "")
//            pWhereClause += " WHERE " + pBankAccountFilter;

//    pPRTypeFilter = ($("#slPRType").val() == "" ? "" : " PRType = " + $("#slPRType").val());
//    if (pPRTypeFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pPRTypeFilter;
//    else
//        if (pPRTypeFilter != "" && pWhereClause == "")
//            pWhereClause += " WHERE " + pPRTypeFilter;

//    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartner option:selected").attr("PartnerTypeID")));
//    if (pPartnerFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pPartnerFilter;
//    else
//        if (pPartnerFilter != "" && pWhereClause == "")
//            pWhereClause += " WHERE " + pPartnerFilter;

//    pCurrencyFilter = ($("#slCurrency").val() == "" ? "" : " CurrencyID = " + $("#slCurrency").val());
//    if (pCurrencyFilter != "" && pWhereClause != "")
//        pWhereClause += " AND " + pCurrencyFilter;
//    else
//        if (pCurrencyFilter != "" && pWhereClause == "")
//            pWhereClause += " WHERE " + pCurrencyFilter;

//    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
//    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
//        pFromDateFilter = " CAST(DueDate AS date) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
//        if (pFromDateFilter != "" && pWhereClause != "")
//            pWhereClause += " AND " + pFromDateFilter;
//        else
//            if (pFromDateFilter != "" && pWhereClause == "")
//                pWhereClause += " WHERE " + pFromDateFilter;
//    }

//    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
//    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
//        pToDateFilter = " CAST(DueDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
//        if (pToDateFilter != "" && pWhereClause != "")
//            pWhereClause += " AND " + pToDateFilter;
//        else
//            if (pToDateFilter != "" && pWhereClause == "")
//                pWhereClause += " WHERE " + pToDateFilter;
//    }

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);
    
    return pWhereClause;
}

function AgingReports_PartnerTypeChanged() {
    debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
}

function AgingReports_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTotal = JSON.parse(data[2]);
    //var pTotalLate = data[2];
    //var pTotalZeroTo30 = data[3];
    //var pTotalThirtyOneTo60 = data[4];
    //var pTotalSixtyOneTo90 = data[5];
    //var pTotalFourtySixTo60 = data[6];

    var pReportTitle = ($("#slAgingType").val() == constPRTypeReceivable ? "Aging A\\R Receivables Report" : "Aging A\\P Payables Report");

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //pTablesHTML += '                         <table id="tblReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    //pTablesHTML += '                                     <th class="hide">Ser.</th>';
    pTablesHTML += '                                     <th>Partner</th>';
    //pTablesHTML += '                                     <th>Partner Type</th>';
    pTablesHTML += '                                     <th>0-30 Days</th>';
    pTablesHTML += '                                     <th>31-60 Days</th>';
    pTablesHTML += '                                     <th>61-90 Days</th>';
    pTablesHTML += '                                     <th>Later</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    debugger;
    var serial = 0;
    $.each((pReportRows), function (i, item) {
        //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
        pTablesHTML += '                                         <td>' + item.PartnerName + '</td>';
        //pTablesHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
        pTablesHTML += '                                         <td>' + (item.ZeroTo30 == 0 ? "" : item.ZeroTo30) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ThirtyOneTo60 == 0 ? "" : item.ThirtyOneTo60) + '</td>';
        pTablesHTML += '                                         <td>' + (item.SixtyOneTo90 == 0 ? "" : item.SixtyOneTo90) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Late == 0 ? "" : item.Late) + '</td>';
        //pTablesHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    if (pOutputTo == "Excel") { //empty row before totals in case of excel
        pTablesHTML += '                                         <tr style="font-size:95%;">';
        pTablesHTML += '                                             <td></td>';
        pTablesHTML += '                                             <td></td>';
        pTablesHTML += '                                             <td></td>';
        pTablesHTML += '                                             <td></td>';
        pTablesHTML += '                                             <td></td>';
        pTablesHTML += '                                         </tr>';
    }
    pTablesHTML += '                                         <tr style="font-size:95%;">';
    pTablesHTML += '                                             <td><b><u>Total :</u></b></td>';
    pTablesHTML += '                                             <td><b>' + (pReportTotal[0].ZeroTo30 == 0 ? "" : pReportTotal[0].ZeroTo30) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + (pReportTotal[0].ThirtyOneTo60 == 0 ? "" : pReportTotal[0].ThirtyOneTo60) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + (pReportTotal[0].SixtyOneTo90 == 0 ? "" : pReportTotal[0].SixtyOneTo90) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + (pReportTotal[0].Late == 0 ? "" : pReportTotal[0].Late) + '</b></td>';
    pTablesHTML += '                                         </tr>';
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var pTableSummary = "";
        $("#tblReport" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblReport", "Aging Report");
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

        ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ////ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Bank Acc. :</b> ' + $("#slBankAccount option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Due Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        //ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>Total:</b> ' + pTotalSummary + '</div>';
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
function AgingReports_DrawReport_SeparateCurrencies(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportTotal = JSON.parse(data[2]);
    
    var pReportTitle = ($("#slAgingType").val() == constPRTypeReceivable ? "Aging A\\R Receivables Report" : "Aging A\\P Payables Report");

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //pTablesHTML += '                         <table id="tblReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    //pTablesHTML += '                                     <th class="hide">Ser.</th>';
    pTablesHTML += '                                     <th>Partner</th>';
    //pTablesHTML += '                                     <th>Partner Type</th>';
    
    pTablesHTML += '                                     <th>0-30<br>(USD)</th>';
    pTablesHTML += '                                     <th>0-30<br>(EUR)</th>';
    pTablesHTML += '                                     <th>0-30<br>(GBP)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">0-30<br>(AED)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">0-30<br>(SAR)</th>';
    pTablesHTML += '                                     <th>0-30<br>(EGP)</th>';

    pTablesHTML += '                                     <th>31-60<br>(USD)</th>';
    pTablesHTML += '                                     <th>31-60<br>(EUR)</th>';
    pTablesHTML += '                                     <th>31-60<br>(GBP)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">31-60<br>(AED)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">31-60<br>(SAR)</th>';
    pTablesHTML += '                                     <th>31-60<br>(EGP)</th>';

    pTablesHTML += '                                     <th>61-90<br>(USD)</th>';
    pTablesHTML += '                                     <th>61-90<br>(EUR)</th>';
    pTablesHTML += '                                     <th>61-90<br>(GBP)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">61-90<br>(AED)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">61-90<br>(SAR)</th>';
    pTablesHTML += '                                     <th>61-90<br>(EGP)</th>';

    pTablesHTML += '                                     <th>Later<br>(USD)</th>';
    pTablesHTML += '                                     <th>Later<br>(EUR)</th>';
    pTablesHTML += '                                     <th>Later<br>(GBP)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">Later<br>(AED)</th>';
    pTablesHTML += '                                     <th class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">Later<r>(SAR)</th>';
    pTablesHTML += '                                     <th>Later<br>(EGP)</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    debugger;
    var serial = 0;
    var _Late_USD_Total = 0; var _Late_EUR_Total = 0; var _Late_GBP_Total = 0; var _Late_AED_Total = 0; var _Late_SAR_Total = 0; var _Late_EGP_Total = 0;
    var _ZeroTo30_USD_Total = 0; var _ZeroTo30_EUR_Total = 0; var _ZeroTo30_GBP_Total = 0; var _ZeroTo30_AED_Total = 0; var _ZeroTo30_SAR_Total = 0; var _ZeroTo30_EGP_Total = 0;
    var _ThirtyOneTo60_USD_Total = 0; var _ThirtyOneTo60_EUR_Total = 0; var _ThirtyOneTo60_GBP_Total = 0; var _ThirtyOneTo60_AED_Total = 0; var _ThirtyOneTo60_SAR_Total = 0; var _ThirtyOneTo60_EGP_Total = 0;
    var _SixtyOneTo90_USD_Total = 0; var _SixtyOneTo90_EUR_Total = 0; var _SixtyOneTo90_GBP_Total = 0; var _SixtyOneTo90_AED_Total = 0; var _SixtyOneTo90_SAR_Total = 0; var _SixtyOneTo90_EGP_Total = 0;
    $.each((pReportRows), function (i, item) {
        _Late_USD_Total += parseFloat(item.Late_USD); _Late_EUR_Total += parseFloat(item.Late_EUR); _Late_GBP_Total += parseFloat(item.Late_GBP); _Late_AED_Total += parseFloat(item.Late_AED); _Late_SAR_Total += parseFloat(item.Late_SAR); _Late_EGP_Total += parseFloat(item.Late_EGP);
        _ZeroTo30_USD_Total += parseFloat(item.ZeroTo30_USD); _ZeroTo30_EUR_Total += parseFloat(item.ZeroTo30_EUR); _ZeroTo30_GBP_Total += parseFloat(item.ZeroTo30_GBP); _ZeroTo30_AED_Total += parseFloat(item.ZeroTo30_AED); _ZeroTo30_SAR_Total += parseFloat(item.ZeroTo30_SAR); _ZeroTo30_EGP_Total += parseFloat(item.ZeroTo30_EGP);
        _ThirtyOneTo60_USD_Total += parseFloat(item.ThirtyOneTo60_USD); _ThirtyOneTo60_EUR_Total += parseFloat(item.ThirtyOneTo60_EUR); _ThirtyOneTo60_GBP_Total += parseFloat(item.ThirtyOneTo60_GBP); _ThirtyOneTo60_AED_Total += parseFloat(item.ThirtyOneTo60_AED); _ThirtyOneTo60_SAR_Total += parseFloat(item.ThirtyOneTo60_SAR); _ThirtyOneTo60_EGP_Total += parseFloat(item.ThirtyOneTo60_EGP);
        _SixtyOneTo90_USD_Total += parseFloat(item.SixtyOneTo90_USD); _SixtyOneTo90_EUR_Total += parseFloat(item.SixtyOneTo90_EUR); _SixtyOneTo90_GBP_Total += parseFloat(item.SixtyOneTo90_GBP); _SixtyOneTo90_AED_Total += parseFloat(item.SixtyOneTo90_AED); _SixtyOneTo90_SAR_Total += parseFloat(item.SixtyOneTo90_SAR); _SixtyOneTo90_EGP_Total += parseFloat(item.SixtyOneTo90_EGP);
        //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
        pTablesHTML += '                                         <td>' + item.PartnerName + '</td>';
        //pTablesHTML += '                                         <td>' + item.PartnerTypeCode + '</td>';
        
        pTablesHTML += '                                             <td>' + parseFloat(item.ZeroTo30_USD).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ZeroTo30_EUR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ZeroTo30_GBP).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.ZeroTo30_AED).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.ZeroTo30_SAR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ZeroTo30_EGP).toFixed(2) + '</td>';
        
        pTablesHTML += '                                             <td>' + parseFloat(item.ThirtyOneTo60_USD).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ThirtyOneTo60_EUR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ThirtyOneTo60_GBP).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.ThirtyOneTo60_AED).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.ThirtyOneTo60_SAR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.ThirtyOneTo60_EGP).toFixed(2) + '</td>';
        
        pTablesHTML += '                                             <td>' + parseFloat(item.SixtyOneTo90_USD).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.SixtyOneTo90_EUR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.SixtyOneTo90_GBP).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.SixtyOneTo90_AED).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.SixtyOneTo90_SAR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.SixtyOneTo90_EGP).toFixed(2) + '</td>';
        
        pTablesHTML += '                                             <td>' + parseFloat(item.Late_USD).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.Late_EUR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.Late_GBP).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.Late_AED).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '">' + parseFloat(item.Late_SAR).toFixed(2) + '</td>';
        pTablesHTML += '                                             <td>' + parseFloat(item.Late_EGP).toFixed(2) + '</td>';
        //pTablesHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                                         <tr style="font-size:95%;">';
    pTablesHTML += '                                             <td><b><u>Total :</u></b></td>';
    
    pTablesHTML += '                                             <td><b>' + parseFloat(_ZeroTo30_USD_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ZeroTo30_EUR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ZeroTo30_GBP_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_ZeroTo30_AED_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_ZeroTo30_SAR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ZeroTo30_EGP_Total).toFixed(2) + '</b></td>';
    
    pTablesHTML += '                                             <td><b>' + parseFloat(_ThirtyOneTo60_USD_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ThirtyOneTo60_EUR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ThirtyOneTo60_GBP_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_ThirtyOneTo60_AED_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_ThirtyOneTo60_SAR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_ThirtyOneTo60_EGP_Total).toFixed(2) + '</b></td>';
    
    pTablesHTML += '                                             <td><b>' + parseFloat(_SixtyOneTo90_USD_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_SixtyOneTo90_EUR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_SixtyOneTo90_GBP_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_SixtyOneTo90_AED_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_SixtyOneTo90_SAR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_SixtyOneTo90_EGP_Total).toFixed(2) + '</b></td>';
    
    pTablesHTML += '                                             <td><b>' + parseFloat(_Late_USD_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_Late_EUR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_Late_GBP_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_Late_AED_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td class="' + (pDefaults.UnEditableCompanyName == "FRE" || pDefaults.UnEditableCompanyName == "WAV" || pDefaults.UnEditableCompanyName == "GLS" || pDefaults.UnEditableCompanyName == "GLD" ? '' : 'hide') + '"><b>' + parseFloat(_Late_SAR_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                             <td><b>' + parseFloat(_Late_EGP_Total).toFixed(2) + '</b></td>';
    pTablesHTML += '                                         </tr>';
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var pTableSummary = "";
        $("#tblReport" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblReport", "Aging Report");
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

        ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Bank Acc. :</b> ' + $("#slBankAccount option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Due Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        
        ReportHTML += pTablesHTML;

        //ReportHTML += '             <div class="col-xs-12"><b>Total:</b> ' + pTotalSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        //ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
}
