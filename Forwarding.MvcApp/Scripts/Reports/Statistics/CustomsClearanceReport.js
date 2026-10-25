function CustomsClearanceReport_Initialize() {
    debugger;
    LoadView("/Reports/CustomsClearanceReport", "div-content", function () {
        //CallGETFunctionWithParameters("/api/QuotationsStatistics/GetQuotationsStatisticsFilter", null
        //    , function (data) {
        //        debugger;
        //        //var _Salesmentemp = JSON.parse(data[0]);
        //        //var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
        //        //    return _Salesmentemp.IsSalesman == true;
        //        //});
        //    }
        //    , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
        $("#txtFromDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtToDate").val(getTodaysDateInddMMyyyyFormat());
    });
    FadePageCover(false);
}
function CustomsClearanceReport_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE 1=1" + " \n";
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "")
        pWhereClause += "AND ActualArrival >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "")
        pWhereClause += "AND CAST(ActualArrival AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + "'" + " \n";
    return pWhereClause;
}
function CustomsClearanceReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = CustomsClearanceReport_GetWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            //, pRange: $("#slRange").val()
        };
        CallGETFunctionWithParameters("/api/CustomsClearanceReport/LoadData"
            , pParametersWithValues
            , function (pData) {
                var pMessageReturned = pData[0];
                if (pMessageReturned == "") //pRecordsExist
                    CustomsClearanceReport_DrawReport(pData, pOutputTo);
                else
                    swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                FadePageCover(false);
            });
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function CustomsClearanceReport_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReportTitle = "Customs Clearance Report";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    pTableHTML += '                         <table id="tblCustomsClearanceReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>Invoice</b></td>';
    pTableHTML += '                                     <td><b>Bill</b></td>';
    pTableHTML += '                                     <td><b>CustomsCert</b></td>';
    pTableHTML += '                                     <td><b>Amount</b></td>';
    pTableHTML += '                                     <td><b>ArrivalDate</b></td>';
    pTableHTML += '                                     <td><b>ShipmentType</b></td>';

    pTableHTML += '                                     <td><b>Qty</b></td>';
    pTableHTML += '                                     <td><b>Delivery Order</b></td>';
    pTableHTML += '                                     <td><b>Nafeza Registration</b></td>';
    pTableHTML += '                                     <td><b>Date of send and inspection</b></td>';
    pTableHTML += '                                     <td><b>ETC</b></td>';
    pTableHTML += '                                     <td><b>Date</b></td>';
    pTableHTML += '                                     <td><b>G.O.I.E.C Apply</b></td>';
    pTableHTML += '                                     <td><b>G.O.I.E.C  Approval</b></td>';
    pTableHTML += '                                     <td><b>NTRA Apply</b></td>';
    pTableHTML += '                                     <td><b>NTRA Approval</b></td>';
    pTableHTML += '                                     <td><b>Gen.Security Apply</b></td>';
    pTableHTML += '                                     <td><b>Gen.Security Approval</b></td>';
    pTableHTML += '                                     <td><b>Customs final Pricing</b></td>';
    pTableHTML += '                                     <td><b>Form 4 sent to bank</b></td>';
    pTableHTML += '                                     <td><b>Form 4 received from Bank</b></td>';
    pTableHTML += '                                     <td><b>Release Date</b></td>';
    pTableHTML += '                                     <td><b>Shipment status</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.CCAInvoiceNumber == 0 ? "" : item.CCAInvoiceNumber) + '</td>';
        pTableHTML += '                                     <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
        pTableHTML += '                                     <td>' + (item.CertificateNumber == 0 ? "" : item.CertificateNumber) + '</td>';
        pTableHTML += '                                     <td>' + (item.CertificateValue == 0 ? "" : item.CertificateValue) + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (item.ShipmentTypeCode == 0 ? "" : item.ShipmentTypeCode) + '</td>';

        pTableHTML += '                                     <td>' + (item.NumberOfPackages == 0 ? "" : item.NumberOfPackages) + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCASpendDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCASpendDate)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCADocumentReceiveDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCADocumentReceiveDate)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SalesDateReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.SalesDateReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (item.CCAOthers == 0 ? "" : item.CCAOthers) + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.SalesDateDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.SalesDateDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CommerceDateReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CommerceDateReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CommerceDateDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CommerceDateDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InspectionDateReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.InspectionDateReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.InspectionDateDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.InspectionDateDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinishDateReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.FinishDateReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FinishDateDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.FinishDateDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCDropBackReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCDropBackReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCDropBackDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCDropBackDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCAllowTemporaryReceived)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCAllowTemporaryReceived)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.CCAllowTemporaryDelivered)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.CCAllowTemporaryDelivered)) : "") + '</td>';
        pTableHTML += '                                     <td>' + (item.StageName == 0 ? "" : item.StageName) + '</td>';
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
        //    ReportHTML += '                         <table id="tblCustomsClearanceReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomsClearanceReport" + pReportRows[j].ID).html();
        //    ReportHTML += '                         </table>';
        //}
        //ReportHTML += '                         <table id="tblCustomsClearanceReport' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //ReportHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //ReportHTML += '                                     <td>TOTAL AMOUNT</td>';
        //ReportHTML += '                                     <td>' + pTotalSummary.toFixed(2) + '</td>';
        //ReportHTML += '                                 </tr>';
        //ReportHTML += '                         </table>';

        ReportHTML += '</div>';
        //$("#tblCustomsClearanceReport" + pReportRows[j].ID + " tbody").append(pTableSummary);
        //ExportHtmlTableToCsv_RemovingCommasForNumbers("tblCustomsClearanceReport" + pReportRows[j].ID, 'CustomsClearanceReport');
        $("#hExportedTable").html(ReportHTML);

        var $table = $("#ReportBody");
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "CustomsClearanceReport" + ".xls", // do include extension
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


        ReportHTML += '             <div class="col-xs-4">From: ' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-8">To: ' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div>&emsp;<br>' + '</div>';
        //for (var j = 0 ; j < pReportRows.length; j++) { //if (pReportRows.length > 0) {
        //    ReportHTML += '                         <table id="tblCustomsClearanceReport' + pReportRows[j].ID + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
        //    ReportHTML += '                         ' + $("#tblCustomsClearanceReport" + pReportRows[j].ID).html();
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
