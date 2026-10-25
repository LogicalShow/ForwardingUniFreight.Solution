//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function BankAccountStatement_Print(pOutputTo) {
    debugger;
    if ($("#slBankAccount").val() == "")
        swal("Sorry", "Please, select a bank account.");
    else {
        if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
            FadePageCover(true);
            var pWhereClause = BankAccountStatement_GetFilterWhereClause();
            //var pWhereClauseOpenBalance = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartner option:selected").attr("PartnerTypeID")
            //    + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
            //    + " AND CreationDate < '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'"
            //    + " AND TransactionType<>" + constTransactionReceivableAllocation
            //    );
            //var pWhereClauseEndBalance = (" WHERE IsDeleted=0 AND PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartner option:selected").attr("PartnerTypeID")
            //    + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
            //    + " AND CAST(Creationdate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'"
            //    + " AND TransactionType<>" + constTransactionReceivableAllocation
            //    );
            var pWhereClauseOpenBalance = (" WHERE IsDeleted=0 AND BankAccountID = " + $("#slBankAccount").val()
                + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                + " AND CreationDate < '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'"
                //+ ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ")
                + " AND IsApproved=" + $("#slApprovalStatus").val()
                + ($("#slPRType").val() == "" ? "" : " AND PRType=" + $("#slPRType").val() + " ")
                );
            var pWhereClauseEndBalance = (" WHERE IsDeleted=0 AND BankAccountID = " + $("#slBankAccount").val()
                + ($("#slCurrency").val() == "" ? "" : (" AND CurrencyID = " + $("#slCurrency").val()))
                + " AND CAST(Creationdate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'"
                //+ ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ")
                + " AND IsApproved=" + $("#slApprovalStatus").val()
                + ($("#slPRType").val() == "" ? "" : " AND PRType=" + $("#slPRType").val() + " ")
                );

            var pParametersWithValues = {
                pWhereClause: pWhereClause
                , pWhereClauseOpenBalance: pWhereClauseOpenBalance
                , pWhereClauseEndBalance: pWhereClauseEndBalance
                , pCurrencyID: ($("#slCurrency").val() == "" ? 0 : $("#slCurrency").val())
                //, pDirectionType: ($("#lbl-filter-import").hasClass('active') ? "Import"
                //    : $("#lbl-filter-export").hasClass('active') ? "Export"
                //    : $("#lbl-filter-domestic").hasClass('active') ? "Domestic"
                //    : "ALL")
                //, pTransPortType: ($("#lbl-filter-ocean").hasClass('active') ? "Ocean"
                //    : $("#lbl-filter-air").hasClass('active') ? "Air"
                //    : $("#lbl-filter-inland").hasClass('active') ? "Inland"
                //    : "ALL")
            };
            CallGETFunctionWithParameters("/api/BanksStatements/LoadData"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                        BankAccountStatement_DrawReport(data, pOutputTo);
                    else
                        swal(strSorry, "No records are found for that search criteria.");
                    FadePageCover(false);
                });
        }
        else
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
    }
}

function BankAccountStatement_GetFilterWhereClause() {
    var pWhereClause = "WHERE IsDeleted=0 ";
    var pSalesmanFilter = "";
    var pBranchFilter = "";
    var pBankAccountFilter = "";
    var pPRTypeFilter = "";
    var pPartnerFilter = "";
    var pCurrencyFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";
    
    //pWhereClause += ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ");
    pWhereClause += " AND IsApproved=" + $("#slApprovalStatus").val();
    
    pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    if (pBranchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBranchFilter;
    else
        if (pBranchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBranchFilter;

    pBankAccountFilter = ($("#slBankAccount").val() == "" ? "" : " BankAccountID = " + $("#slBankAccount").val());
    if (pBankAccountFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBankAccountFilter;
    else
        if (pBankAccountFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBankAccountFilter;

    pPRTypeFilter = ($("#slPRType").val() == "" ? "" : " PRType = " + $("#slPRType").val());
    if (pPRTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPRTypeFilter;
    else
        if (pPRTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPRTypeFilter;

    //pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val() + " AND PartnerTypeID=" + $("#slPartner option:selected").attr("PartnerTypeID")));
    //if (pPartnerFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPartnerFilter;
    //else
    //    if (pPartnerFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPartnerFilter;

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

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " ORDER BY PaymentDate ";
    //pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause) + " AND IsConversionRow=0 ORDER BY ID ";

    return pWhereClause;
}

function BankAccountStatement_PartnerTypeChanged() {
    debugger;
    $("#slPartner").val("");
    $("#slPartner option").removeClass("hide");
    if ($("#slPartnerType").val() != "") //handle show all partners
        $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
}

function BankAccountStatement_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pOpenBalance = data[2];
    var pEndBalance = data[3]; var pEndBalanceInDefaultCurrency = GetTotalEquivalantDefaultCurrencyAmount(pEndBalance);
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = "Bank Statement";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

    var pTablesHTML = "";
    //pTablesHTML += '                         <table id="tblStatements" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblStatements" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
    pTablesHTML += '                             <thead>';
    if (pOutputTo != "Excel") { //in case od excel, i add it to as the 1st row in the table body
        pTablesHTML += '                                 <tr>';
        pTablesHTML += '                                     <td colspan=8><b>Open Balance is ' + pOpenBalance + '</b></td>';
        pTablesHTML += '                                 </tr>';
    }
    pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTablesHTML += '                                     <th class="hide">Ser.</th>';
    pTablesHTML += '                                     <th>Payment Date</th>';
    pTablesHTML += '                                     <th>Payment Code</th>';
    pTablesHTML += '                                     <th>Ref. Number</th>';
    pTablesHTML += '                                     <th>Credit</th>';
    pTablesHTML += '                                     <th>Debit</th>';
    pTablesHTML += '                                     <th>Cur.</th>';
    pTablesHTML += '                                     <th>Status</th>';
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
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td></td>';
        pTablesHTML += '                                         <td>Open Balance is ' + pOpenBalance + '</td>';
        pTablesHTML += '                                     </tr>';
    } //if (pOutputTo == "Excel") {
    var serial = 0;
    $.each((pReportRows), function (i, item) { 
        pTablesHTML += '                                     <tr style="font-size:95%;">';
        pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
        pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) + '</td>';
        pTablesHTML += '                                         <td>' + (item.PaymentCode == 0 ? "N/A" : item.PaymentCode) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ChequeOrVisaNo == 0 ? "N/A" : item.ChequeOrVisaNo) + '</td>'; //Ref No
        pTablesHTML += '                                         <td>' + (item.PRType == constPRTypeReceivable ? item.Amount.toFixed(2) : '') + '</td>';
        pTablesHTML += '                                         <td>' + (item.PRType == constPRTypePayable ? item.Amount.toFixed(2) : '') + '</td>';
        pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
        pTablesHTML += '                                         <td' + (item.IsApproved ? " class='text-primary' " : " class='text-danger' ") + '>' + (item.IsApproved ? "Approved" : "UnApproved") + '</td>';
        pTablesHTML += '                                         <td>' + (item.PaymentNotes == 0 ? "" : item.PaymentNotes) + '</td>';
        //pTablesHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
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
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        pTableSummary += '                                     <tr style="font-size:95%;">';
        pTableSummary += '                                         <td>' + ($("#slPRType").val() == "" ? "Available balance :" : "Total :") + '</td>';
        pTableSummary += '                                         <td>' + pEndBalance + '</td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                         <td></td>';
        pTableSummary += '                                     </tr>';
        $("#tblStatements" + " tbody").append(pTableSummary);
        ExportHtmlTableToCsv_RemovingCommasForNumbers("tblStatements", "Bank Statement");
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

        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-7"><b>Payment Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ReportHTML += '             <div class="col-xs-4 hide"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-5"><b>Bank Account :</b> ' + $("#slBankAccount option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-3 hide"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Pay/Rec :</b> ' + $("#slPRType option:selected").text() + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '                     </div>';//of table-responsive
        //ReportHTML += '             <div class="col-xs-12"><b>No of Operations :</b> ' + serial + '</div>';
        //ReportHTML += '             <div class="col-xs-12"><b>Approved available balance at printing time : </b> ' + $("#slPartner option:selected").attr("AvailableBalance") + '</div>';
        if ($("#slPRType").val() == "") { //get approvedbalance
            ReportHTML += '         <div class="col-xs-12"><b>Available balance : </b> ' + pEndBalance + '</div>';
            //ReportHTML += '         <div class="col-xs-12"><b>Available balance in Default Currency: </b> ' + pEndBalanceInDefaultCurrency + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
        }
        else {
            ReportHTML += '         <div class="col-xs-12"><b>Total : </b> ' + pEndBalance + '</div>';
            //ReportHTML += '         <div class="col-xs-12"><b>Total in Default Currency: </b> ' + pEndBalanceInDefaultCurrency + ' ' + $("#hDefaultCurrencyCode").val() + '</div>';
        }

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
