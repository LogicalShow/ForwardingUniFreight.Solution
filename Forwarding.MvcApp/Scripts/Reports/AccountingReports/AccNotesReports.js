//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function AccNotesReports_Print(pOutputTo) {
    debugger;
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = AccNotesReports_GetFilterWhereClause();
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
        CallGETFunctionWithParameters("/api/AccNotesReports/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    AccNotesReports_DrawReport(data, pOutputTo);
                else
                    swal(strSorry, "No records are found for that search criteria.");
                FadePageCover(false);
            });
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}

function AccNotesReports_GetFilterWhereClause() {
    var pWhereClause = "WHERE IsDeleted=0 ";
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pPartnerTypeFilter = "";
    var pPartnerFilter = "";
    var pAccNoteTypeFilter = "";
    //var pBranchFilter = "";
    //var pInvoiceStatusFilter = "";
    var pVATTypeFilter = "";
    var pDiscountTypeFilter = "";
    var pTxtSearchFilter = ""
    var pCurrencyFilter = "";
    //var pInvoiceTypeFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";
    
    pWhereClause += ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ");

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

    //pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    //if (pBranchFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pBranchFilter;
    //else
    //    if (pBranchFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pBranchFilter;

    pAccNoteTypeFilter = ($("#slAccNoteType").val() == "" ? "" : " NoteType = " + $("#slAccNoteType").val());
    if (pAccNoteTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pAccNoteTypeFilter;
    else
        if (pAccNoteTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pAccNoteTypeFilter;



    pPaidStatusFilter = ($("#slPaidStatus").val() == "" ? "" : " NoteStatusID = " + $("#slPaidStatus").val());
    if (pPaidStatusFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPaidStatusFilter;
    else
        if (pPaidStatusFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPaidStatusFilter;




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

    //pInvoiceTypeFilter = ($("#slInvoiceType").val() == "" ? "" : " InvoiceTypeID = " + $("#slInvoiceType").val());
    //if (pInvoiceTypeFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pInvoiceTypeFilter;
    //else
    //    if (pInvoiceTypeFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pInvoiceTypeFilter;

    //pInvoiceStatusFilter = ($("#slInvoiceStatus").val() == "" ? "" : " InvoiceStatus = N'" + $("#slInvoiceStatus option:selected").text() + "'");
    //if (pInvoiceStatusFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pInvoiceStatusFilter;
    //else
    //    if (pInvoiceStatusFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pInvoiceStatusFilter;

    pVATTypeFilter = ($("#slVATType").val() == "" ? "" : " TaxTypeID = " + $("#slVATType").val());
    if (pVATTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVATTypeFilter;
    else
        if (pVATTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVATTypeFilter;

    pDiscountTypeFilter = ($("#slDiscountType").val() == "" ? "" : " DiscountTypeID = " + $("#slDiscountType").val());
    if (pDiscountTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pDiscountTypeFilter;
    else
        if (pDiscountTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pDiscountTypeFilter;
    
    pTxtSearchFilter = ($("#txtSearch").val().trim() == "" ? "" : " (ConcatenatedInvoiceNumber like N'%" + $("#txtSearch").val().trim()
                                                                    + "%' OR OperationCode like N'%" + $("#txtSearch").val().trim()
                                                                    + "%' OR Code like N'%" + $("#txtSearch").val().trim() + "%')");
    if (pTxtSearchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTxtSearchFilter;
    else
        if (pTxtSearchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTxtSearchFilter;

    if ($("#cbWithoutVAT").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " TaxTypeID IS NULL ";
    else
        if ($("#cbWithoutVAT").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " TaxTypeID IS NULL ";

    if ($("#cbWithoutDiscount").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " DiscountTypeID IS NULL ";
    else
        if ($("#cbWithoutDiscount").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " DiscountTypeID IS NULL ";
    
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
        pFromDateFilter = " NoteDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
        if (pFromDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromDateFilter;
        else
            if (pFromDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
        pToDateFilter = "cast( NoteDate as date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'";
        if (pToDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToDateFilter;
        else
            if (pToDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToDateFilter;
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

    //pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);

    return pWhereClause;
}
function AccNotesReports_PartnerTypeChanged() {
    //debugger;
    //$("#slPartner").val("");
    //$("#slPartner option").removeClass("hide");
    //if ($("#slPartnerType").val() != "") //handle show all partners
    //    $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    debugger;
    $("#slPartner").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        if ($("#slPartnerType").val() == constCustomerPartnerTypeID) {
            $("#slPartner").html($("#hReadySlCustomers").html());
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/AccNotesReports/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
                , function (pData) {
                    FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
                    FadePageCover(false);
                }
                , null);
        }
    }
}
function AccNotesReports_IncludeVATChanged() {
    if ($("#cbWithoutVAT").prop("checked")) {
        $("#divVATType").addClass("hide");
        $("#slVATType").val("");
    }
    else 
        $("#divVATType").removeClass("hide");
    if ($("#cbWithoutDiscount").prop("checked")) {
        $("#divDiscountType").addClass("hide");
        $("#slDiscountType").val("");
    }
    else
        $("#divDiscountType").removeClass("hide");
}
function AccNotesReports_DrawReport(data, pOutputTo) {
    debugger;

    var pReportRows = JSON.parse(data[1]);
    //var pPayablesCurrenciesSummary = data[2];
    //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
    //var pProfitCurrenciesSummary = data[4];
    //var pMarginSummary = data[5];

    var pReportTitle = "C/D Notes Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    var pBranchesList = document.getElementById("hReadySlBranches").options;
    for (var i = 0; i < pBranchesList.length; i++) {
        var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
            return pReportRows.BranchID == pBranchesList[i].value;
        });
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblAccNotesReports" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            pTableHTML += '                         <table id="tblAccNotesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
            pTableHTML += '                             <thead>';
            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //pTableHTML += '                                     <th class="hide">Ser.</th>';
            //pTableHTML += '                                     <th>Branch</th>';
            pTableHTML += '                                     <th>Code</th>';
            pTableHTML += '                                     <th>Bill To</th>';
            //pTableHTML += '                                     <th class="hide">Partner Type</th>';
            pTableHTML += '                                     <th>Operation No.</th>';
            pTableHTML += '                                     <th>Inv No.</th>';
            pTableHTML += '                                     <th>House No.</th>';
            //pTableHTML += '                                     <th>Status</th>';
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>Amt w/o VAT</th>';
            if (!$("#cbWithoutVAT").prop("checked"))
                pTableHTML += '                                     <th>VAT</th>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                pTableHTML += '                                     <th>WHT</th>';
            pTableHTML += '                                     <th>Total</th>';
            pTableHTML += '                                     <th>Cur.</th>';
            //pTableHTML += '                                     <th>Paid</th>';
            //pTableHTML += '                                     <th>Remaining</th>';
            pTableHTML += '                                     <th>Note Date</th>';
            pTableHTML += '                                     <th>Status</th>';
            pTableHTML += '                                     <th>Paid Status</th>';
            if (pDefaults.UnEditableCompanyName == "MES") {
            pTableHTML += '                                     <th>Unique Serial</th>';
            pTableHTML += '                                     <th>TotalInvoiceAmount</th>';
            pTableHTML += '                                     <th>TotalInvoiceWithoutVat</th>';
            pTableHTML += '                                     <th>TotalInvoiceVat</th>';
            pTableHTML += '                                     <th>VatNumber</th>';
            }
            if ($("#cbAging").prop("checked")) {
                pTableHTML += '                                 <th>0-30</th>';
                pTableHTML += '                                 <th>31-60</th>';
                pTableHTML += '                                 <th>61-90</th>';
                pTableHTML += '                                 <th>Later</th>';
            }
            pTableHTML += '                                 </tr>';
            pTableHTML += '                             </thead>';
            pTableHTML += '                             <tbody>';
            debugger;
            //$.each(JSON.parse(data[3]), function (i, item) { debugger; });
            var serial = 0;
            $.each((pReportRows), function (i, item) {
                //pTableHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.NoteDate), FormattedTodaysDate);
                pTableHTML += '                                     <tr style="font-size:95%;">';
                //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTableHTML += '                                         <td>' + item.BranchName + '</td>';
                pTableHTML += '                                         <td>' + item.Code + '</td>';
                pTableHTML += '                                         <td>' + item.PartnerName + '</td>';
                //pTableHTML += '                                         <td class="hide">' + item.PartnerTypeCode + '</td>';
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    pTableHTML += '                                         <td>' + (item.MasterOperationCode == 0 ? item.OperationCode : item.MasterOperationCode) + '</td>';
                } else {
                    pTableHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';

                }
                pTableHTML += '                                         <td>' + (item.ConcatenatedInvoiceNumber == 0 ? "" : item.ConcatenatedInvoiceNumber) + '</td>';
                pTableHTML += '                                         <td>' + (item.HouseNumber == 0 ? item.MasterBL : item.HouseNumber) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.InvoiceStatus == 0 ? "" : item.InvoiceStatus) + '</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableHTML += '                                         <td>' + item.TaxAmount.toFixed(2) + '</td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableHTML += '                                         <td>' + item.DiscountAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.Amount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                //pTableHTML += '                                         <td>' + item.PaidAmount.toFixed(2) + '</td>';
                //pTableHTML += '                                         <td' + (item.InvoiceStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + item.RemainingAmount.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.NoteDate)) + '</td>';
                pTableHTML += '                                         <td' + (item.IsApproved ? " class='text-primary' " : " class='text-danger' ") + '>' + (item.IsApproved ? "Approved" : "UnApproved") + '</td>';
                pTableHTML += '                                         <td>' + item. NoteStatus + '</td>';

                if (pDefaults.UnEditableCompanyName == "MES") {

                    pTableHTML += '                                         <td>' + item.UniqueSerial + '</td>';
                    pTableHTML += '                                         <td>' + item.TotalInvoiceAmount.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + item.TotalInvoiceWithoutVat.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + item.TotalInvoiceVat.toFixed(2) + '</td>';
                    pTableHTML += '                                         <td>' + item.VatNumber + '</td>';
                }
                if ($("#cbAging").prop("checked")) {
                    pTableHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.Amount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.Amount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.Amount.toFixed(2) : '') + '</td>';
                    pTableHTML += '                                     <td>' + (_AgingDays >= 90 ? item.Amount.toFixed(2) : '') + '</td>';
                }
                pTableHTML += '                                     </tr>';
            });
            pTableHTML += '                             </tbody>';
            pTableHTML += '                         </table>';
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pBranchesList.length; i++)
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                var pTotalSummary = CalculateTotalCurrenciesSummaryFromArray(pGroupedReportRows);
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                if (pDefaults.UnEditableCompanyName == "MES") {
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                }
                pTableSummary += '                                 </tr>';
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                if (pDefaults.UnEditableCompanyName == "MES") {
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                }
                pTableSummary += '                                 </tr>';
                $("#tblAccNotesReports" + pBranchesList[i].value + " tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblAccNotesReports" + pBranchesList[i].value, pBranchesList[i].text + ' ' + 'Notes');
            }
        }
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
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Note Type :</b> ' + $("#slAccNoteType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Note. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'
        var pBranchesList = document.getElementById("hReadySlBranches").options;
        for (var i = 0; i < pBranchesList.length; i++) {
            var pGroupedReportRows = jQuery.grep(pReportRows, function (pReportRows) {
                return pReportRows.BranchID == pBranchesList[i].value;
            });
            if (pGroupedReportRows.length > 0) {
                ReportHTML += '                         <h4><b><u>' + pBranchesList[i].text + ' BRANCH:</u></b></h4>';

                ReportHTML += '                         <table id="tblAccNotesReports' + pBranchesList[i].value + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
                ReportHTML += '                         ' + $("#tblAccNotesReports" + pBranchesList[i].value).html();
                ReportHTML += '                         </table>';

                //ReportHTML += '                     </div>';//of table-responsive
                var pTotalSummary = CalculateTotalCurrenciesSummaryFromArrayCDReport(pGroupedReportRows);
                ReportHTML += '             <div class="col-xs-12 m-t-n text-right m-l"><b>' + pBranchesList[i].text + ' TOTAL AMOUNT : </b> ' + pTotalSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
                //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';
            }
        }
        debugger;
        var pTotalSummary = CalculateTotalCurrenciesSummaryFromArrayCDReport(pReportRows);
        ReportHTML += '             <div class="col-xs-12 text-right m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + '</div>';
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
////Transfered to mainapp.js
////take care coz changes original array Amount cells
//function CalculateTotalCurrenciesSummaryFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    //tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < pArray.length; i++) {
//        row = pArray[i];
//        if (!temp[row.CurrencyCode]) {
//            temp[row.CurrencyCode] = row;
//        } else {
//            temp[row.CurrencyCode].Amount += row.Amount;
//            row.Amount = 0; //to avoid duplication
//        }
//    }
//    var ArrResultTotals = [];
//    var pTotalSummary = "";
//    for (var prop in temp) {
//        ArrResultTotals.push(temp[prop]);
//        pTotalSummary += (pTotalSummary == "" ? (temp[prop].Amount.toFixed(2) + ' ' + prop) : (", " + temp[prop].Amount.toFixed(2) + " " + prop));
//    }
//    return pTotalSummary;
//}


function CalculateTotalCurrenciesSummaryFromArrayCDReport(pArray) {
    debugger;
    var temp = {};
    var row = null;
    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray.length; i++) {
        row = tempArray[i];
        if (!temp[row.CurrencyCode]) {
            temp[row.CurrencyCode] = row;
        } else {
            if (row.NoteType == 100) {
                debugger;
                if (pDefaults.UnEditableCompanyName == "UNF") {
                temp[row.CurrencyCode].Amount -= row.Amount;
                }

                row.Amount = 0; //to avoid duplication
            } else {
            temp[row.CurrencyCode].Amount += row.Amount;
            row.Amount = 0; //to avoid duplication

            }
            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
            //row.PaidAmount = 0; //to avoid duplication
            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
            //row.RemainingAmount = 0; //to avoid duplication
        }
    }
    var ArrResultTotals = [];
    var pTotalSummary = "";
    for (var prop in temp) {
        ArrResultTotals.push(temp[prop]);
        pTotalSummary += (pTotalSummary == "" ? (temp[prop].Amount.toFixed(2) + ' ' + prop) : (", " + temp[prop].Amount.toFixed(2) + " " + prop));
    }
    return pTotalSummary;
}