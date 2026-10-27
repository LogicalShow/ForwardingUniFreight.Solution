function DynamicsCRMLog_Initialize() {
    debugger;
    LoadView("/Administration/DynamicsCRMLog", "div-content", function () {
        CallGETFunctionWithParameters("/api/QuotationsStatistics/GetQuotationsStatisticsFilter", null
            , function (data) {
                debugger;
                //var _Salesmentemp = JSON.parse(data[0]);
                //var pSalesmen = jQuery.grep(_Salesmentemp, function (_Salesmentemp) {
                //    return _Salesmentemp.IsSalesman == true;
                //});
                $("#txtFromOpenDate").val(getTodaysDateInddMMyyyyFormat());
                $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat());
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
    });
}
function DynamicsCRMLog_GetWhereClause() {
    var pWhereClause = "WHERE 1=1" + " \n";

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "")
        pWhereClause += "AND CreatedON >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "")
        pWhereClause += "AND CAST(CreatedON AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'" + " \n";
    if ($("#txtQuotationCode").val() != "" && $("#txtQuotationCode").val() != undefined)
        pWhereClause += " AND crmQuotationID Like '%" + $("#txtQuotationCode").val() + "%'"
    return pWhereClause;
}
function CustomersReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = DynamicsCRMLog_GetWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pRange: $("#slRange").val()
        };
        CallGETFunctionWithParameters("/api/DynamicsCRMLog/LoadData"
            , pParametersWithValues
            , function (pData) {
                var pMessageReturned = pData[0];
                if (pMessageReturned == "") //pRecordsExist
                    CustomersReport_DrawReport(pData, pOutputTo);
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
    var pReportTitle = "Dynamics CRM Log File";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";

    var pSubTotalSummary = 0;
    var pTotalSummary = 0;
    pTableHTML += '                         <table id="tblCustomersReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>ID</b></td>';
    pTableHTML += '                                     <td><b>Status Code</b></td>';
    pTableHTML += '                                     <td><b>CRM Quotation ID</b></td>';
    //pTableHTML += '                                     <td><b>Forwarding Quotation ID</b></td>';
    pTableHTML += '                                     <td><b>Missing Fields</b></td>';
    //pTableHTML += '                                     <td><b>Operation ID</b></td>';
    pTableHTML += '                                     <td><b>Created ON</b></td>';
    //pTableHTML += '                                     <td><b>User ID</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        let createdOn = item.CreatedON.slice(6, 18);
        createdOn = new Date(createdOn * 1000);
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + item.ID + '</td>';
        pTableHTML += '                                     <td>' + (item.StatusCode == 2 ? 'Quotation has missing fields' : 'Successfully integrated') + '</td>';
        pTableHTML += '                                     <td>' + item.crmQuotationID + '</td>';
        //pTableHTML += '                                     <td>' + item.ForwardingQuotationID + '</td>';
        pTableHTML += '                                     <td>' + item.MissingFields + '</td>';
        //pTableHTML += '                                     <td>' + item.OperationID + '</td>';
        pTableHTML += '                                     <td>' + GetDateWithFormatMDY(item.CreatedON) + '</td>';
        //pTableHTML += '                                     <td>' + item.UserID + '</td>';
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