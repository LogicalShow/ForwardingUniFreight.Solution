
function CustomersReport_Initialize() {
    debugger;
    LoadView("/Reports/CustomersReport", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "LIN") {
            $("#cbIsBilledInvoices").parent().parent().removeClass("hide");
        }
        CallGETFunctionWithParameters("/api/VendorsReport/VendorsReport", null
            , function (data) {
                debugger;
                FillListFromObject(null, 1/*pCodeOrName*/, TranslateString("SelectFromMenu")/*"Select Pay. Type"*/, "slPartnerType", data[0], null);
                $("#txtFromOpenDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
    });
}
function CustomersReport_PartnerTypeChanged() {

    debugger;
    $("#slPartner").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        if ($("#slPartnerType").val() == constCustomerPartnerTypeID) {
            $("#slPartner").html($("#hReadySlCustomers").html());
            $('#slPartner').css({ "width": "100%" }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/VendorsReport/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
                , function (pData) {
                    FillListFromObject(null, 2/*pCodeOrName*/, "<--All-->", "slPartner", pData[0], null);
                    $('#slPartner').css({ "width": "100%" }).select2();
                    $("div[tabindex='-1']").removeAttr('tabindex');
                    FadePageCover(false);
                }
                , null);
        }
    }
}
function CustomersReport_GetWhereClause() {

    var pReportType = $('#slReportName').val();

    var pWhereClause = "WHERE ";

    if (pReportType == 1) {
        pWhereClause += " BLType <> 2" + " \n";

        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "")
            pWhereClause += "AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'" + " \n";
        if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "")
            pWhereClause += "AND CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'" + " \n";
    }
    else if (pReportType == 2) {
        pWhereClause += " IsDeleted = 0 and DATEDIFF(day,DueDate,getdate()) > 0 and RemainingAmount > 0 and InvoiceTypeCode <> 'DRAFT' " + " \n";
    }
    else if (pReportType == 3) {
        pWhereClause += " IsDeleted = 0 and PaymentDate Is Not Null and InvoiceTypeCode <> 'DRAFT' " + " \n";
    }

    if (pReportType == 2 || pReportType == 3) {


        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "")
            pWhereClause += "AND CAST(InvoiceDate AS date) >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'" + " \n";
        if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "")
            pWhereClause += "AND CAST(InvoiceDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'" + " \n";
        if ($('#slPartnerType').val() != '')
            pWhereClause += "AND PartnerTypeID= " + $('#slPartnerType').val();
        if ($('#slPartner').val() != '' && $('#slPartner').val() != null)
            pWhereClause += "AND PartnerID= " + $('#slPartner').val();
        
    }

    return pWhereClause;
}
function CustomersReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = CustomersReport_GetWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pRange: $("#slRange").val()
            , pReportTypeID: $("#slReportName").val()
            , pFromDate: $("#txtFromOpenDate").val()
            , pToDate: $("#txtToOpenDate").val()
            , pCustomerID: (($("#slPartner").val() == '' || $("#slPartner").val() == null) ? "-1" : $("#slPartner").val())
            , pIsFilterByInvoiceDate: $('#cbIsFilterByInvoiceDate').prop('checked')
        };
        CallGETFunctionWithParameters("/api/CustomersReport/LoadData"
            , pParametersWithValues
            , function (pData) {
                var pMessageReturned = pData[0];
                if (pMessageReturned == "") //pRecordsExist
                {
                    if ($('#slReportName').val() == 1)
                        ProfitabilitySummaryByCustomer_DrawReport(pData, pOutputTo);
                    else if ($('#slReportName').val() == 2)
                        OpenInvoices_DrawReport(pData, pOutputTo);
                    else if ($('#slReportName').val() == 3)
                        AverageDaysToPay_DrawReport(pData, pOutputTo);     
                    else if ($('#slReportName').val() == 4)
                        ProfitabilitySummaryByServiceType_DrawReport(pData, pOutputTo);  
                }
                    
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function CustomersReport_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReportTitle = "Customers Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Customer</b></td>';
    pTableHTML += '                                     <td><b>No Of Oper</b></td>';
    pTableHTML += '                                     <td><b>Receivables</b></td>';
    pTableHTML += '                                     <td><b>Payables</b></td>';
    pTableHTML += '                                     <td><b>Profit</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        pTableHTML += '                                     <td>' + item.OperationsCount + '</td>';
        pTableHTML += '                                     <td>' + item.ReceivablesWithoutVAT + '</td>';
        pTableHTML += '                                     <td>' + item.PayablesWithoutVAT + '</td>';
        pTableHTML += '                                     <td>' + item.Profit + '</td>';
        pTableHTML += '                                 </tr>';
    }); //$.each((pReportRows), function (i, item) {

    //pTableHTML += '                                 <tr>';
    //pTableHTML += '                                     <td>' + 'Totals' + /*(item.EquipmentNumber == 0 ? "" : item.EquipmentNumber) +*/ '</td>';
    //pTableHTML += '                                 </tr>';

    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
            ReportHTML += '<div id="ReportBody">';
            ReportHTML += pTableHTML;
            //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
            //    ReportHTML += '                         <table id="tblCustomersReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            //    ReportHTML += '                         ' + $("#tblCustomersReport" + pReportRows[j].ID).html();
            //    ReportHTML += '                         </table>';
            //}
            //ReportHTML += '                         <table id="tblCustomersReport' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            //ReportHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            //ReportHTML += '                                     <td>TOTAL AMOUNT</td>';
            //ReportHTML += '                                     <td>' + pTotalSummary.toFixed(2) + '</td>';
            //ReportHTML += '                                 </tr>';
            //ReportHTML += '                         </table>';

            ReportHTML += '</div>';
            //$("#tblCustomersReport" + pReportRows[j].ID + " tbody").append(pTableSummary);
            //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCustomersReport" + pReportRows[j].ID, 'CustomersReport');
            $("#hExportedTable").html(ReportHTML);

            var $table = $("#ReportBody");
            $table.table2excel({
                exclude: ".noExl",
                name: "sheet",
                filename: "CustomersReport" + ".xls", // do include extension
                preserveColors: false // set to true if you want background colors and font colors preserved
            });
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromOpenDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToOpenDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';
        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    ReportHTML += '                         <table id="tblCustomersReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomersReport" + pReportRows[j].ID).html();
        //    ReportHTML += '                         </table>';
        //}
        ReportHTML += pTableHTML;
        debugger;
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
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

function OpenInvoices_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[2]);
    var pReportTitle = "Open Invoices Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    var pTotalAllSummary = 0;

    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Customer</b></td>';
    pTableHTML += '                                     <td><b>Type</b></td>';
    pTableHTML += '                                     <td><b>Date</b></td>';
    pTableHTML += '                                     <td><b>Num</b></td>';
    pTableHTML += '                                     <td><b>P. O. #</b></td>';
    pTableHTML += '                                     <td><b>Terms</b></td>';
    pTableHTML += '                                     <td><b>Due Date</b></td>';
    pTableHTML += '                                     <td><b>Aging</b></td>';
    pTableHTML += '                                     <td><b>Open Balance</b></td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    var pPartnerID = 0;
    var pPartnerTotal = 0;
    var TodaysDate = new Date();
    var FormattedTodaysDate = TodaysDate.toLocaleDateString();
    var _AgingDays = 0;

    var result = [];
    var pTotalArr = ''
    var result_Total = [];

    $.each((pReportRows), function (i, item) {

       _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), FormattedTodaysDate);

        if (i == 0) {
            pPartnerID = item.PartnerID;
            result.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
            result_Total.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
        }

        if (i > 0 && pPartnerID != item.PartnerID) {

            pTotalArr = '';

            if (result.length == 0)
                result.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });

            if (result.length != 0) {
                for (var k = 0; k < result.length; k++) {
                    pTotalArr += result[k]['Amount'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + result[k]['CurrencyCode'] + '  ';
                }
            }

            if (result_Total.length == 0)
                result_Total.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });

            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td>' + 'Total : ' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + pTotalArr
                //pPartnerTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                 </tr>';

            pPartnerTotal = 0;
            pPartnerID = item.PartnerID;
            result = [];
        }

        if (i > 0) {

            if (result.length != 0) {

                var pExist = false;
                var plength = result.length;
                for (var k = 0; k < plength; k++) {
                    pExist = false;
                    for (var j = 0; j < result.length; j++) {
                        if (item.CurrencyCode == result[j]['CurrencyCode'])
                            pExist = true;
                    }

                    if (!pExist)
                        result.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
                    else {
                        if (item.CurrencyCode == result[k]['CurrencyCode'])
                            result[k]['Amount'] = result[k]['Amount'] + item.RemainingAmount;
                    }
                }
            }

            if (result.length == 0) {
                result.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
            }

            //// GrandTotal

            if (result_Total.length != 0) {

                var pExist_Total = false;
                var plength_Total = result_Total.length;
                for (var k = 0; k < plength_Total; k++) {
                    pExist = false;
                    for (var j = 0; j < result_Total.length; j++) {
                        if (item.CurrencyCode == result_Total[j]['CurrencyCode'])
                            pExist = true;
                    }

                    if (!pExist)
                        result_Total.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
                    else {
                        if (item.CurrencyCode == result_Total[k]['CurrencyCode'])
                            result_Total[k]['Amount'] = result_Total[k]['Amount'] + item.RemainingAmount;
                    }
                }
            }

            if (result_Total.length == 0) {
                result_Total.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });
            }
        }

        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.PartnerName == 0 ? "" : item.PartnerName) + '</td>';
        pTableHTML += '                                     <td>' + item.InvoiceTypeCode + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate))) + '</td>';
        pTableHTML += '                                     <td>' + item.InvoiceNumber + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + item.PaymentTermCode + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + '</td>';
        pTableHTML += '                                     <td>' + _AgingDays + '</td>';
        pTableHTML += '                                     <td>' + item.RemainingAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pTableHTML += '                                     <td>' + item.CurrencyCode + '</td>';
        pTableHTML += '                                 </tr>';

        if (($(pReportRows).length - 1 == i)) {

            pTotalArr = '';

            if (result.length == 0)
                result.push({ 'CurrencyCode': item.CurrencyCode, 'Amount': item.RemainingAmount });

            if (result.length != 0) {
                for (var k = 0; k < result.length; k++) {
                    pTotalArr += result[k]['Amount'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + result[k]['CurrencyCode'] + '  ';
                }
            }

            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td>' + 'Total : ' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' +
                pTotalArr //   pPartnerTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                 </tr>';

        }


        pTotalAllSummary += item.RemainingAmount;
    });

    var pTotalArr_Grand = ''
    if (result_Total.length != 0) {
        for (var k = 0; k < result_Total.length; k++) {
            pTotalArr_Grand += result_Total[k]['Amount'].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + result_Total[k]['CurrencyCode'] + '   ';
        }
    }

        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                 </tr>';

        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + 'Grand Total : ' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + pTotalArr_Grand + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                 </tr>';



    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += pTableHTML;
        ReportHTML += '</div>';
        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "OpenInvoicesReport" + ".xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromOpenDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToOpenDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';
        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    ReportHTML += '                         <table id="tblCustomersReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomersReport" + pReportRows[j].ID).html();
        //    ReportHTML += '                         </table>';
        //}
        ReportHTML += pTableHTML;
        debugger;
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
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
function AverageDaysToPay_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[2]);
    var pReportTitle = "Average Days To Pay Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    var pTotalAllSummary = 0;

    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Customer</b></td>';
    pTableHTML += '                                     <td><b>Type</b></td>';
    pTableHTML += '                                     <td><b>Date</b></td>';
    pTableHTML += '                                     <td><b>Num</b></td>';
    pTableHTML += '                                     <td><b>Memo</b></td>';
    pTableHTML += '                                     <td><b>Account</b></td>';
    pTableHTML += '                                     <td><b>Amount</b></td>';
    pTableHTML += '                                     <td><b>Due Date</b></td>';
    pTableHTML += '                                     <td><b>Paid Date</b></td>';
    pTableHTML += '                                     <td><b>Avg Days to Pay</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    var pPartnerID = 0;
    var pPartnerTotal = 0;
    var TodaysDate = new Date();
    var FormattedTodaysDate = TodaysDate.toLocaleDateString();
    var _AgingDays = 0;

    var PayInvoiceDays = 0;
    var Cust_Total_Inv = 0;
    var GrandPayInvoiceDays = 0;
    var Grand_Total_Inv = 0;

    $.each((pReportRows), function (i, item) {

        _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.DueDate), GetDateWithFormatMDY(item.PaymentDate));


        if (i == 0) {
            pPartnerID = item.PartnerID;
        }

        if (i > 0 && pPartnerID != item.PartnerID) {

            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td>' + 'Total : ' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + (PayInvoiceDays / Cust_Total_Inv).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
       
            pTableHTML += '                                 </tr>';

            Cust_Total_Inv = 0;
            PayInvoiceDays = 0;

            pPartnerID = item.PartnerID;
           
        }


        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.PartnerName == 0 ? "" : item.PartnerName) + '</td>';
        pTableHTML += '                                     <td>' + item.InvoiceTypeCode + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InvoiceDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate))) + '</td>';
        pTableHTML += '                                     <td>' + item.InvoiceNumber + '</td>';
        pTableHTML += '                                     <td>' + '' + '</td>';
        pTableHTML += '                                     <td>' + item.AccountName + '</td>';
        pTableHTML += '                                     <td>' + item.PaidAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.DueDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.DueDate))) + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate))) + '</td>';
        pTableHTML += '                                     <td>' + _AgingDays + '</td>';
        pTableHTML += '                                 </tr>';

        PayInvoiceDays += _AgingDays;
        Cust_Total_Inv++;

        Grand_Total_Inv++;
        GrandPayInvoiceDays += _AgingDays;
        if (($(pReportRows).length - 1 == i)) {

            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td>' + 'Total : ' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + '' + '</td>';
            pTableHTML += '                                     <td>' + ''   + '</td>';
            pTableHTML += '                                     <td>' + (PayInvoiceDays / Cust_Total_Inv).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")  + '</td>';
            pTableHTML += '                                 </tr>';

        }

    });

    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                 </tr>';

    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td>' + 'Grand Total : ' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + '' + '</td>';
    pTableHTML += '                                     <td>' + (GrandPayInvoiceDays / Grand_Total_Inv).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                 </tr>';



    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += pTableHTML;
        ReportHTML += '</div>';
        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "AverageDaysToPayReport" + ".xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    }
    else {
        var ReportHTML = '';

        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromOpenDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToOpenDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';

        ReportHTML += pTableHTML;
        debugger;
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
function ProfitabilitySummaryByServiceType_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[3]);
    var pReportTitle = "Profitability Summary ByService Type";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Service Type</b></td>';
    pTableHTML += '                                     <td><b>Act. Cost</b></td>';
    pTableHTML += '                                     <td><b>Act. Revenue</b></td>';
    pTableHTML += '                                     <td><b> Diff.</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';

    var pPayablesWithoutVAT_Total = 0;
    var pReceivablesWithoutVAT_Total = 0;
    $.each((pReportRows), function (i, item) {
        if (item.PayablesWithoutVAT != 0 || item.ReceivablesWithoutVAT != 0) {

        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.MoveTypeName == 0 ? "" : item.MoveTypeName) + '</td>';
            pTableHTML += '                                     <td>' + item.PayablesWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                                     <td>' + item.ReceivablesWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                                     <td>' + (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                                 </tr>';

            pPayablesWithoutVAT_Total += item.PayablesWithoutVAT;
            pReceivablesWithoutVAT_Total += item.ReceivablesWithoutVAT;
        }
      }); //$.each((pReportRows), function (i, item) {

    pTableHTML += '                                 <tr>';
    pTableHTML += '                                     <td>' + 'Totals' + '</td>';
    pTableHTML += '                                     <td>' + pPayablesWithoutVAT_Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                     <td>' + pReceivablesWithoutVAT_Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")  + '</td>';
    pTableHTML += '                                     <td>' + (pReceivablesWithoutVAT_Total - pPayablesWithoutVAT_Total).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                 </tr>';

    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += pTableHTML;

        ReportHTML += '</div>';
        //$("#tblCustomersReport" + pReportRows[j].ID + " tbody").append(pTableSummary);
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCustomersReport" + pReportRows[j].ID, 'CustomersReport');
        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "ProfitabilitySummaryByServiceType" + ".xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromOpenDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToOpenDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';
        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    ReportHTML += '                         <table id="tblCustomersReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomersReport" + pReportRows[j].ID).html();
        //    ReportHTML += '                         </table>';
        //}
        ReportHTML += pTableHTML;
        debugger;
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
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
function ProfitabilitySummaryByCustomer_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReportTitle = "Profitability Summary By Customer";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Customer Name</b></td>';
    pTableHTML += '                                     <td><b>Act. Cost</b></td>';
    if ($('#cbIsBilledInvoices').prop('checked'))
        pTableHTML += '                                     <td><b>Act. Revenue</b></td>';
    else 
        pTableHTML += '                                     <td><b>Act. Rec</b></td>';
    pTableHTML += '                                     <td><b> Diff.</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';

    var pPayablesWithoutVAT_Total = 0;
    var pReceivablesWithoutVAT_Total = 0;
    $.each((pReportRows), function (i, item) {
        if (item.PayablesWithoutVAT != 0 || item.ReceivablesWithoutVAT != 0) {

            pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
            pTableHTML += '                                     <td>' + (item.CustomerName == 0 ? "" : item.CustomerName) + '</td>';
            pTableHTML += '                                     <td>' + item.PayablesWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            if ($('#cbIsBilledInvoices').prop('checked'))
                pTableHTML += '                                     <td>' + item.ReceivablesWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            else
                pTableHTML += '                                     <td>' + item.ReceivablesUnInvoicedWithoutVAT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            if ($('#cbIsBilledInvoices').prop('checked'))
                pTableHTML += '                                     <td>' + (item.ReceivablesWithoutVAT - item.PayablesWithoutVAT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            else
                pTableHTML += '                                     <td>' + (item.ReceivablesUnInvoicedWithoutVAT - item.PayablesWithoutVAT).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
            pTableHTML += '                                 </tr>';

            pPayablesWithoutVAT_Total += item.PayablesWithoutVAT;
            if ($('#cbIsBilledInvoices').prop('checked'))
                pReceivablesWithoutVAT_Total += item.ReceivablesWithoutVAT;
            else
                pReceivablesWithoutVAT_Total += item.ReceivablesUnInvoicedWithoutVAT;
        }
    }); //$.each((pReportRows), function (i, item) {

    pTableHTML += '                                 <tr>';
    pTableHTML += '                                     <td>' + 'Totals' + '</td>';
    pTableHTML += '                                     <td>' + pPayablesWithoutVAT_Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                     <td>' + pReceivablesWithoutVAT_Total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                     <td>' + (pReceivablesWithoutVAT_Total - pPayablesWithoutVAT_Total  ).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</td>';
    pTableHTML += '                                 </tr>';

    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += pTableHTML;

        ReportHTML += '</div>';
        //$("#tblCustomersReport" + pReportRows[j].ID + " tbody").append(pTableSummary);
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCustomersReport" + pReportRows[j].ID, 'CustomersReport');
        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "ProfitabilitySummaryByCustomer" + ".xls", // do include extension
            preserveColors: false // set to true if you want background colors and font colors preserved
        });
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';

        
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromOpenDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToOpenDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';
        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    ReportHTML += '                         <table id="tblCustomersReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomersReport" + pReportRows[j].ID).html();
        //    ReportHTML += '                         </table>';
        //}
        ReportHTML += pTableHTML;
        debugger;
        //ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary.toFixed(2) + '</div>';
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
function ReportNameChanged() {
    if ($('#slReportName').val() == 1) {
        $('#slRange').parent().removeClass("hide");
    }


    if ($('#slReportName').val() != 1)
        $('#slRange').parent().addClass("hide");
    
}