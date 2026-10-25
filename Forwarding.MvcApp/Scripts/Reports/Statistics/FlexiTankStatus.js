//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function FlexiTankStatus_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtGuranteeLetterFromDate").val().trim() == "" || isValidDate($("#txtGuranteeLetterFromDate").val(), 1))
        && ($("#txtGuranteeLetterToDate").val().trim() == "" || isValidDate($("#txtGuranteeLetterToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = FlexiTankStatus_GetFilterWhereClause();
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
        CallGETFunctionWithParameters("/api/FlexiTankStatus/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                {
                    FlexiTankStatus_DrawReport(data, pOutputTo);
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
function FlexiTankStatus_GetFilterWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1 " + "\n";
    //i added it to excluded rows from the Opening Balance
    pWhereClause += " AND ExportOperationID is not null or ImportOperationID is not null" + "\n";

    if ($("#txtOperationNumber").val().trim() != "")
        pWhereClause += "AND (ImportOperationCodeSerial=N'" + $("#txtOperationNumber").val().trim().toUpperCase() + "' \n"
                      + "OR ExportOperationCodeSerial=N'" + $("#txtOperationNumber").val().trim().toUpperCase()
                      + "')";
    if ($("#txtGuranteeLetterNumber").val().trim() != "")
        pWhereClause += "AND GuaranteeLetterNumber=N'" + $("#txtGuranteeLetterNumber").val().trim().toUpperCase() + "' \n";
    if ($("#txtFlexiNumber").val().trim() != "")
        pWhereClause += "AND Code=N'" + $("#txtFlexiNumber").val().trim().toUpperCase() + "' \n";
    if ($("#txtGuranteeLetterFromDate").val().trim() != "")
        pWhereClause += " AND (GuaranteeLetterDate IS NULL OR CAST(GuaranteeLetterDate AS date) >= '" + GetDateWithFormatyyyyMMdd($("#txtGuranteeLetterFromDate").val().trim()) + "') \n";
    if ($("#txtGuranteeLetterToDate").val().trim() != "")
        pWhereClause += " AND (GuaranteeLetterDate IS NULL OR CAST(GuaranteeLetterDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtGuranteeLetterToDate").val().trim()) + "') \n";
    return pWhereClause;
}
function FlexiTankStatus_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pReportRows_OpenningBalance = JSON.parse(data[2]);
    var pReportTitle = "FlexiTankStatus";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    //ReportHTML += '                         <table id="tblFlexiStatusTank" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    pTablesHTML += '                         <table id="tblFlexiStatusTank" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    pTablesHTML += '                                     <th>Guar.LetterNo</th>';
    pTablesHTML += '                                     <th>Guar.LetterDate</th>';
    pTablesHTML += '                                     <th>Issue Date</th>';
    pTablesHTML += '                                     <th>Flexi Number</th>';
    pTablesHTML += '                                     <th>Notes</th>';
    pTablesHTML += '                                     <th>ImportOper.</th>';
    if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
        pTablesHTML += '                                     <th>ImportOper. Certificate No.</th>';
    }
    pTablesHTML += '                                     <th>ExportOper.</th>';
    if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
        pTablesHTML += '                                     <th>ExportOper. Certificate No.</th>';
    }
    pTablesHTML += '                                     <th>Export Oper.Client</th>';
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each((pReportRows_OpenningBalance), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';
        pTablesHTML += '                                         <td>' + (item.GuaranteeLetterNumber == 0 ? "" : item.GuaranteeLetterNumber) + '</td>';
        pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.GuaranteeLetterDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.GuaranteeLetterDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExportInvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExportInvoiceDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.ExportPurchaseInvoiceNotes == 0 ? "" : item.ExportPurchaseInvoiceNotes) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ImportOperationCode == 0 ? "" : item.ImportOperationCode) + '</td>';
        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
            pTablesHTML += '                                         <td>' + (item.ImpOpCertificateNumber == 0 ? "" : item.ImpOpCertificateNumber) + '</td>';
        }
        pTablesHTML += '                                         <td>' + (item.ExportOperationCode == 0 ? "" : item.ExportOperationCode) + '</td>';
        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
            pTablesHTML += '                                         <td>' + (item.ExpOpCertificateNumber == 0 ? "" : item.ExpOpCertificateNumber) + '</td>';
        }
        pTablesHTML += '                                         <td>' + (item.ExportClientName == 0 ? "" : item.ExportClientName) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    $.each((pReportRows), function (i, item) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';
        pTablesHTML += '                                         <td>' + (item.GuaranteeLetterNumber == 0 ? "" : item.GuaranteeLetterNumber) + '</td>';
        pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.GuaranteeLetterDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.GuaranteeLetterDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExportInvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExportInvoiceDate))) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
        //pTablesHTML += '                                         <td>' + (item.ExportPurchaseInvoiceNotes == 0 ? "" : item.ExportPurchaseInvoiceNotes) + '</td>';
        pTablesHTML += '                                         <td>' + (item.Notes == 0 ? "" : item.Notes) + '</td>';
        pTablesHTML += '                                         <td>' + (item.ImportOperationCode == 0 ? "" : item.ImportOperationCode) + '</td>';
        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
            pTablesHTML += '                                         <td>' + (item.ImpOpCertificateNumber == 0 ? "" : item.ImpOpCertificateNumber) + '</td>';
        }
        pTablesHTML += '                                         <td>' + (item.ExportOperationCode == 0 ? "" : item.ExportOperationCode) + '</td>';
        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM") {
            pTablesHTML += '                                         <td>' + (item.ExpOpCertificateNumber == 0 ? "" : item.ExpOpCertificateNumber) + '</td>';
        }
        pTablesHTML += '                                         <td>' + (item.ExportClientName == 0 ? "" : item.ExportClientName) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        //var pBranchSummary = "";
        ///********************************Adding Summary*************************************/
        //for (i = 0; i < ArrBranchIDs.length ; i++) {
        //    if ($("#tblFlexiStatusTank tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
        //        pBranchSummary += $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + $("#tblFlexiStatusTank tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + "<br>";
        //}
        //debugger;
        //if (pOutputTo == "Excel") {
        //    var pExcelSummary = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //    pExcelSummary += "<tr><td>Import:" + $("#tblFlexiStatusTank tbody tr").find("td.DirectionType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //    pExcelSummary += "<tr><td>Export:" + $("#tblFlexiStatusTank tbody tr").find("td.DirectionType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //    pExcelSummary += "<tr><td>Domestic:" + $("#tblFlexiStatusTank tbody tr").find("td.DirectionType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //    pExcelSummary += "<tr><td>Total:" + $("#tblFlexiStatusTank tbody tr").find("td.classNotHouse").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        //    $("#tblFlexiStatusTank tbody").append(pExcelSummary);
        //}

        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblFlexiStatusTank", pReportTitle);
        ExportHtmlTableToCsv("tblFlexiStatusTank", pReportTitle);
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
        ReportHTML += '             <div class="col-xs-3"><b>Oper.No:</b> ' + $("#txtOperationNumber").val().trim().toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Guar.Letter No:</b> ' + $("#txtGuranteeLetterNumber").val().trim().toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Flexi No:</b> ' + $("#txtFlexiNumber").val().trim().toUpperCase() + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Customer :</b> ' + $("#slCustomer option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Guar.Letter Date :</b> ' + ($("#txtGuranteeLetterFromDate").val() == "" && $("#txtGuranteeLetterToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtGuranteeLetterFromDate").val() == "" ? "" : "From " + $("#txtGuranteeLetterFromDate").val() + " ") + ($("#txtGuranteeLetterToDate").val() == "" ? "" : "To " + $("#txtGuranteeLetterToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        
        //for (i = 0; i < ArrBranchIDs.length ; i++) {
        //    if ($("#tblFlexiStatusTank tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
        //        ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>' + $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + '</b> ' + $("#tblFlexiStatusTank tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + '</div>';
        //}
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
