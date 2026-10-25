//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function Statements_Print(pOutputTo) {
    debugger;
    if ($("#slPartner").val() == "")
        swal("Sorry", "Please, select a partner.");
    else {
        if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
            FadePageCover(true);
            var pWhereClause = Statements_GetFilterWhereClause();
            var pWhereClauseOpenBalance = ""; //Regarding allocations (payments - allocations)
            var pWhereClauseEndBalance = ""; //Regarding allocations (payments - allocations)
            var pWhereClauseOpenBalance_RegardingApprovals = ""; //(payments - approvals)
            var pWhereClauseEndBalance_RegardingApprovals = "";  //(payments - approvals)


            pWhereClauseOpenBalance = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartnerType").val()
                    + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                    + " AND CreationDate < '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'"
                    + //($("#cbIncludeAllocations").prop("checked")
                        //? 
                        ""//(" AND TransactionType<>" + constTransactionInvoiceApproval + " AND TransactionType<>" + constTransactionPayableApproval /*+ " AND TransactionType<>" + constTransactionPayableAllocatedFromCustody*/)  //Make sure not to make confict between AR/AP Approvals & Inv/Op.Pay Approvals
                        //: (" AND TransactionType<>" + constTransactionReceivableAllocation
                        //    + " AND TransactionType<>" + constTransactionPayableAllocation
                        //    + " AND TransactionType<>" + constTransactionCreditTransfer
                        //    + " AND TransactionType<>" + constTransactionDebitTransfer
                        //  )
                        //)
                    );
            pWhereClauseEndBalance = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartnerType").val()
                + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                + " AND CAST(Creationdate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'"
                + //($("#cbIncludeAllocations").prop("checked")
                    //? 
                    ""//(" AND TransactionType<>" + constTransactionInvoiceApproval + " AND TransactionType<>" + constTransactionPayableApproval /*+ " AND TransactionType<>" + constTransactionPayableAllocatedFromCustody*/)  //Make sure not to make confict between AR/AP Approvals & Inv/Op.Pay Approvals
                    //: (" AND TransactionType<>" + constTransactionReceivableAllocation
                    //    + " AND TransactionType<>" + constTransactionPayableAllocation
                    //    + " AND TransactionType<>" + constTransactionCreditTransfer
                    //    + " AND TransactionType<>" + constTransactionDebitTransfer
                    //  )
                    //)
                );
            pWhereClauseOpenBalance_RegardingApprovals = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartnerType").val()
                    + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                    + " AND CreationDate < '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'"
                    + " AND ("
                    + "     TransactionType=" + constTransactionARPayment
                    + " OR TransactionType=" + constTransactionAPPayment
                    + " OR TransactionType=" + constTransactionInvoiceApproval
                    + " OR TransactionType=" + constTransactionPayableApproval
                    + " OR TransactionType=" + constTransactionPayableAllocatedFromCustody  //Make sure not to make confict between AR/AP Approvals & Inv/Op.Pay Approvals
                    + " OR TransactionType=" + constTransactionOpenCreditBalance
                    + " OR TransactionType=" + constTransactionOpenDebitBalance
                    + ")");
            pWhereClauseEndBalance_RegardingApprovals = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartnerType").val()
                    + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                    + " AND CAST(Creationdate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'"
                    + " AND ("
                    + "     TransactionType=" + constTransactionARPayment
                    + " OR TransactionType=" + constTransactionAPPayment
                    + " OR TransactionType=" + constTransactionInvoiceApproval
                    + " OR TransactionType=" + constTransactionPayableApproval
                    + " OR TransactionType=" + constTransactionPayableAllocatedFromCustody  //Make sure not to make confict between AR/AP Approvals & Inv/Op.Pay Approvals
                    + " OR TransactionType=" + constTransactionOpenCreditBalance
                    + " OR TransactionType=" + constTransactionOpenDebitBalance
                    + ")");
            //if ($('#ulReportTypes .active').val() == 0)
            //    swal(strSorry, "Please, Select a report type.");
            //else {
            var pParametersWithValues = {
                pWhereClause: pWhereClause
                , pWhereClauseOpenBalance: pWhereClauseOpenBalance
                , pWhereClauseEndBalance: pWhereClauseEndBalance
                , pWhereClauseOpenBalance_RegardingApprovals: pWhereClauseOpenBalance_RegardingApprovals
                , pWhereClauseEndBalance_RegardingApprovals: pWhereClauseEndBalance_RegardingApprovals
                , pCurrencyID: ($("#slCurrency").val() == "" ? 0 : $("#slCurrency").val())
                , pPartnerTypeID: $("#slPartnerType").val()
                //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
                //    : $("#lbl-filter-export").hasClass('active') ? "Export"
                //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
                //    : "ALL")
                //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
                //    : $("#lbl-filter-air").hasClass('active') ? "Air"
                //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
                //    : "ALL")
            };
            CallGETFunctionWithParameters("/api/CustodyStatement/LoadData"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                        Statements_DrawReport(data, pOutputTo);
                    else
                        swal(strSorry, "No records are found for that search criteria.");
                    FadePageCover(false);
                });
            //}
        }
        else
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
    }
}

function Statements_GetFilterWhereClause() {
    var pWhereClause = "WHERE IsDeleted=0 ";
    var pSalesmanFilter = "";
    var pBranchFilter = "";
    var pPartnerTypeFilter = "";
    var pPartnerFilter = "";
    var pCurrencyFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";

    //pWhereClause += ($("#cbIncludeAllocations").prop("checked") ? "" : (" AND TransactionType<>" + constTransactionReceivableAllocation));
    pWhereClause += ($("#cbIncludeAllocations").prop("checked")
                    ? ""//(" AND TransactionType<>" + constTransactionInvoiceApproval + " AND TransactionType<>" + constTransactionPayableApproval) //i calculate on allocations and not invoices to make the currencies open & close balances correct
                    : (" AND TransactionType<>" + constTransactionReceivableAllocation
                        + " AND TransactionType<>" + constTransactionPayableAllocation
                        + " AND TransactionType<>" + constTransactionCreditTransfer
                        + " AND TransactionType<>" + constTransactionDebitTransfer
                      )
                    );

    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBranchFilter;

    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val()));
    if (pPartnerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerFilter;
    else
        if (pPartnerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerFilter;

    pPartnerTypeFilter = ($("#slPartnerType").val() == "" ? "" : (" PartnerTypeID = " + $("#slPartnerType").val()));
    if (pPartnerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerTypeFilter;
    else
        if (pPartnerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerTypeFilter;

    pCurrencyFilter = ($("#slCurrency").val() == "" ? "" : " CurrencyID = " + $("#slCurrency").val());
    if (pCurrencyFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCurrencyFilter;
    else
        if (pCurrencyFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCurrencyFilter;

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        pFromDateFilter = " CAST(CreationDate AS date) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        if (pFromDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromDateFilter;
        else
            if (pFromDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromDateFilter;
    }

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        pToDateFilter = " CAST(CreationDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
        if (pToDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToDateFilter;
        else
            if (pToDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToDateFilter;
    }

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " ORDER BY CreationDate ";
    //pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " AND IsConversionRow=0 ORDER BY ID ";

    return pWhereClause;
}

function Statements_PartnerTypeChanged() {
    //debugger;
    //$("#slPartner").val("");
    //$("#slPartner option").removeClass("hide");
    //if ($("#slPartnerType").val() != "") //handle show all partners
    //    $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    debugger;
    $("#slPartner").html("<option value=''><--All--></option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/CustodyStatement/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
            , function (pData) {
                FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
                FadePageCover(false);
            }
            , null);
    }
}

function Statements_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pOpenBalance = data[2];
    var pEndBalance = data[3];
    var pOpenBalance_RegardingApprovals = data[4];
    var pEndBalance_RegardingApprovals = data[5];
    var pEndBalanceInDefaultCurrency = GetTotalEquivalantDefaultCurrencyAmount(pEndBalance);
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = "Partner Statement";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblStatements" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblStatements" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
    pTablesHTML += '                             <thead>';
    if (pOutputTo != "Excel") {
        pTablesHTML += '                                 <tr>';
        pTablesHTML += '                                     <td colspan=8><b>'/*+'Open Balance is ' + pOpenBalance_RegardingApprovals + ' / '*/ + 'UnAllocated Open Balance is ' + pOpenBalance + '</b></td>';
        pTablesHTML += '                                 </tr>';
    }
    pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTablesHTML += '                                     <th>Ser.</th>';
    pTablesHTML += '                                     <th>Transaction Date</th>';
    pTablesHTML += '                                     <th>Ref. Number</th>';
    //pTablesHTML += '                                     <th>Ref. Type</th>';
    pTablesHTML += '                                     <th>Credit</th>';
    pTablesHTML += '                                     <th>Debit</th>';
    //pTablesHTML += '                                     <th>Allocation</th>';
    pTablesHTML += '                                     <th>Cur.</th>';
    pTablesHTML += '                                     <th>Notes</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    debugger;
    if (pOutputTo == "Excel") { //in case of excel i put the open balance after the header in the 1st row
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        //pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td>'/*+'Open Balance is ' + pOpenBalance_RegardingApprovals + ' /'*/ + ' UnAllocated Open Balance is ' + pOpenBalance + '</td>';
        pTablesHTML += '                                     </tr>';
    } //if (pOutputTo == "Excel") {
    var serial = 0;
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        pTablesHTML += '                                         <td>' + (++serial) + '</td>';
        pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ReferenceNumber == 0 ? "N/A" : item.ReferenceNumber) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.TransactionType == constTransactionReceivableAllocation || item.TransactionType == constTransactionPayableAllocation ? '' : item.CreditAmount.toFixed(2)) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.TransactionType == constTransactionReceivableAllocation || item.TransactionType == constTransactionPayableAllocation ? '' : item.DebitAmount.toFixed(2)) + '</td>';
        pTablesHTML += '                                         <td>' + ((item.TransactionType == constTransactionPayableAllocation)
                                                                        ? (parseFloat(item.DebitAmount) + parseFloat(item.CreditAmount)).toFixed(2)
                                                                        : (item.TransactionType == constTransactionReceivableAllocation || item.TransactionType == constTransactionPayableAllocation || item.TransactionType == constTransactionDebitTransfer ? '0.00' : item.CreditAmount.toFixed(2)))
                                                             + '</td>';
        pTablesHTML += '                                         <td>' + ((item.TransactionType == constTransactionDebitTransfer)
                                                                        ? (parseFloat(item.CreditAmount) + parseFloat(item.DebitAmount)).toFixed(2)
                                                                        : (item.TransactionType == constTransactionReceivableAllocation || item.TransactionType == constTransactionPayableAllocation ? '0.00' : item.DebitAmount.toFixed(2)))
                                                             + '</td>';
        //pTablesHTML += '                                         <td>' + ((item.TransactionType == constTransactionReceivableAllocation || item.TransactionType == constTransactionPayableAllocation)
        //                                                                ? (item.DebitAmount == 0 ? item.CreditAmount.toFixed(2) : item.DebitAmount.toFixed(2))
        //                                                                : '');
                                                             //+ '</td>';
        pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
        pTablesHTML += '                                         <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        /*********************Append table summaries*************************/
        var pTableSummary = "";
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        //pTableSummary += '                                     <tr style="font-size:95%;">';
        //pTableSummary += '                                         <td>End Balance :</td>';
        //pTableSummary += '                                         <td>' + pEndBalance_RegardingApprovals + '</td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        ////pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>UnAllocated End Balance :</td>';
        pTableSummary += '                                         <td>' + pEndBalance + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        //pTableSummary += '                                     <tr style="font-size:95%;">';
        //pTableSummary += '                                         <td>UnAllocated End Balance in Default Currency:</td>';
        //pTableSummary += '                                         <td>' + pEndBalanceInDefaultCurrency + '</td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        ////pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                         <td></td>';
        //pTableSummary += '                                     </tr>';
        $("#tblStatements" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblStatements", "Partner Statement");
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        //ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + ' "Regarding Allocations"' + '</h3></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + $("#slPartner option:selected").text() + ' Statement "Regarding Allocations"' + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-6"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Transactions Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ReportHTML += '             <div class="col-xs-4 hide"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>No of Operations :</b> ' + serial + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Approved available balance at printing time : </b> ' + $("#slPartner option:selected").attr("AvailableBalance") + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>End Balance : </b> ' + pEndBalance_RegardingApprovals + '</div>';
        ReportHTML += '             <div class="col-xs-12"><b>UnAllocated End Balance : </b> ' + pEndBalance + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>UnAllocated End Balance in Default Currency: </b> ' + pEndBalanceInDefaultCurrency + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
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