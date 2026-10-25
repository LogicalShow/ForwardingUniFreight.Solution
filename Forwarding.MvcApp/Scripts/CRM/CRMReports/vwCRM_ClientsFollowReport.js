function vwCRM_ClientsFollowReport_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}

function FollowUpReport_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pSummaryTablesHTML = '<table id="tblvwCRM_ClientsFollowReportSummary" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pSummaryTablesHTML += JSON.parse(data[2]);
    pSummaryTablesHTML += ' </table>'
    var pReportTitle = "Sales Leads Follow-up Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    //var _BranchIDs = "";
    //for (var i = 1; i < ($("#slBranch option").length + 1); i++)
    //    _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    //var ArrBranchIDs = _BranchIDs.split(",");

    var pTablesHTML = "";
    //   " style="border: solid #000!important; "
    //ReportHTML += '                         <table id="tblvwCRM_ClientsFollowReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
   
    pTablesHTML += '                         <table id="tblvwCRM_ClientsFollowReport" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    //pTablesHTML += '                                     <th>Code</th>';
    //pTablesHTML += '                                     <th>Name</th>';
    //pTablesHTML += '                                     <th>Local Name</th>';
    //pTablesHTML += '                                     <th>Client Status</th>';
    //pTablesHTML += '                                     <th>Source</th>';
    //pTablesHTML += '                                     <th>Source Date</th>';
    //pTablesHTML += '                                     <th>Source Description</th>';
    //---------------------------------------------------------------------------------------
    if ($('#cbIsMergedFormat').prop('checked')) {
        pTablesHTML += '                                     <th>Client</th>';
        pTablesHTML += '                                     <th>Status</th>';
        pTablesHTML += '                                     <th>SourceType</th>';
        pTablesHTML += '                                     <th>SourceDate</th>';
    }
    if ($('#cbActionName').prop('checked'))
        pTablesHTML += '                                     <th>Action</th>';
    if ($('#cbNotes').prop('checked'))
        pTablesHTML += '                                     <th>Notes</th>';
    if ($('#cbActionDate').prop('checked'))
        pTablesHTML += '                                     <th>Action Date</th>';
    if ($('#cbActionDetails').prop('checked'))
        pTablesHTML += '                                     <th>Action Details</th>';
    if ($('#cbSalesRepName').prop('checked'))
        pTablesHTML += '                                     <th>Sales Rep </th>';
    if ($('#cbActionStatus').prop('checked'))
        pTablesHTML += '                                     <th>Action Status </th>';
    //if ($('#cbCountOfAction_BySalesMan').prop('checked'))
    //    pTablesHTML += '                                     <th># S.L Action</th>';
    //if ($('#cbCountOfAction_ByAllSalesMen').prop('checked'))
    //pTablesHTML += '                                     <th># Action</th>';
    //----------------------------------------------------------------------------------------
    if ($('#cbUsername').prop('checked'))
        pTablesHTML += '                                     <th>Username</th>';
    if ($('#cbCreationDate').prop('checked'))
        pTablesHTML += '                                     <th>CreationDate</th>';
    //----------------------------------------------------------------------------------------
    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    // style = "background-color:Gainsboro;"
    $.each((pReportRows), function (i, item) {
        debugger;
        var CLientStatue = " ";
        switch (item.ClientStatus) {
            case 10:
                CLientStatue = "New Customer";
                break;
            case 20:
                CLientStatue = "Active";
                break;
            case 30:
                CLientStatue = "DisActive";
                break;
            case 40:
                CLientStatue = "Black List";
                break;
        }
        if (!$('#cbIsMergedFormat').prop('checked')) {
            if (i == 0) {

                pTablesHTML += '<td colspan="15" class="header-row" style="background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important; line-height:2!important; style=" text-align:left!important;">';


                //if ($('#cbClientCode').prop('checked'))
                //{
                pTablesHTML += '<span style="font-size:15px;font-family:\'Berlin Sans FB\'!important">' + 'Client Name :' + "&nbsp;&nbsp;" + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</span><span  style=" text-align:left!important;">' + '&nbsp;&nbsp;';
                //}
                //else
                //{
                //    pTablesHTML += '<span style="font-size:15px;font-family:\'Berlin Sans FB\'!important">' + " " + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</span><span  style=" text-align:left!important;">' + '&nbsp;&nbsp;' ;

                //}


                //if ($('#cbCLientLocalName').prop('checked'))
                //    pTablesHTML += '&nbsp;&nbsp;' + "<b>Local Name</b>" + " : " + (item.CLientLocalName == 0 ? "" : (item.CLientLocalName).toUpperCase());
                if ($('#cbClientStatus').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Status</b>" + " : " + CLientStatue;
                if ($('#cbSourceName').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source Type</b>" + " : " + (item.SourceName == 0 ? "" : (item.SourceName).toUpperCase());
                if ($('#cbSourceDate').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source Date</b>" + " : " + (GetDateFromServer(item.SourceDate) == "01/01/1900" ? " " : GetDateFromServer(item.SourceDate));
                if ($('#cbSourceDescription').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source</b>" + " : " + (item.SourceDescription == 0 ? "" : (item.SourceDescription).toUpperCase());
                pTablesHTML += '</span></td > ';
            }
            else if (pReportRows[i].ClientCode != pReportRows[i - 1].ClientCode) {
                pTablesHTML += '<td colspan="15" class="header-row" style="background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important; line-height:2!important; style=" text-align:left!important;">';
                //if ($('#cbClientCode').prop('checked')) {
                //    pTablesHTML += '<span style="font-size:15px;font-family:\'Berlin Sans FB\'!important">[' + (item.ClientCode == 0 ? "" : item.ClientCode) + "]&nbsp;" + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</span><span  style=" text-align:left!important;">';
                //}
                //else {
                //    pTablesHTML += '<span style="font-size:15px;font-family:\'Berlin Sans FB\'!important">' + " " + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</span><span  style=" text-align:left!important;">';

                //}
                pTablesHTML += '<span style="font-size:15px;font-family:\'Berlin Sans FB\'!important">' + 'Name :' + "&nbsp;&nbsp;" + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</span><span  style=" text-align:left!important;">' + '&nbsp;&nbsp;';

                //  pTablesHTML += '<span style="font-size:17px;font-family:\'Berlin Sans FB\'!important">' + " " + (item.ClientName == 0 ? "" : item.ClientName) + '</span><span  style=" text-align:left!important;">';
                //if ($('#cbCLientLocalName').prop('checked'))
                //    pTablesHTML += '&nbsp;&nbsp;' + "<b>Local Name</b>" + " : " + (item.CLientLocalName == 0 ? "" : (item.CLientLocalName).toUpperCase());
                //if ($('#cbClientCode').prop('checked'))
                //    pTablesHTML += '&nbsp;&nbsp;' + "<b>Code</b>" + " : " + (item.ClientCode == 0 ? "" : item.ClientCode);
                if ($('#cbClientStatus').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Status</b>" + " : " + CLientStatue;
                if ($('#cbSourceName').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source Type</b>" + " : " + (item.SourceName == 0 ? "" : (item.SourceName).toUpperCase());
                if ($('#cbSourceDate').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source Date</b>" + " : " + (GetDateFromServer(item.SourceDate) == "01/01/1900" ? " " : GetDateFromServer(item.SourceDate));
                if ($('#cbSourceDescription').prop('checked'))
                    pTablesHTML += '&nbsp;&nbsp;' + "<b>Source</b>" + " : " + (item.SourceDescription == 0 ? "" : (item.SourceDescription).toUpperCase());
                pTablesHTML += '</span></td > ';
            } //else if (pReportRows[i].ClientCode != pReportRows[i - 1].ClientCode) {
        } //if ($('#cbIsMergedFormat').prop('checked')) {
        pTablesHTML += '                                     <tr style="font-size:90%;">';

        //pTablesHTML += '<td>' + (item.ClientCode == 0 ? "" : item.ClientCode) + '</td>';
        //pTablesHTML += '<td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
        //pTablesHTML += '<td>' + (item.CLientLocalName == 0 ? "" : item.CLientLocalName) + '</td>';
        //pTablesHTML += '<td>' + (item.ClientStatus == 0 ? "" : item.ClientStatus) + '</td>';
        //pTablesHTML += '<td>' + (item.SourceName == 0 ? "" : item.SourceName) + '</td>';
        //pTablesHTML += '<td>' + GetDateFromServer(item.SourceDate) + '</td>';
        //pTablesHTML += '<td>' + (item.SourceDescription == 0 ? "" : item.SourceDescription) + '</td>';
        if ($('#cbIsMergedFormat').prop('checked')) {
            pTablesHTML += '<td>' + (item.ClientName == 0 ? "" : (item.ClientName).toUpperCase()) + '</td>';
            if ($('#cbClientStatus').prop('checked'))
                pTablesHTML += '<td>' + CLientStatue + '</td>';
            if ($('#cbSourceName').prop('checked'))
                pTablesHTML += '<td>' + (item.SourceName == 0 ? "" : (item.SourceName).toUpperCase()) + '</td>';
            if ($('#cbSourceDate').prop('checked'))
                pTablesHTML += '<td>' + (GetDateFromServer(item.SourceDate) == "01/01/1900" ? " " : GetDateFromServer(item.SourceDate)) + '</td>';
            if ($('#cbSourceDescription').prop('checked'))
                pTablesHTML += '<td>' + (item.SourceDescription == 0 ? "" : (item.SourceDescription).toUpperCase()) + '</td>';
        }
        if ($('#cbActionName').prop('checked'))
            pTablesHTML += '<td>' + (item.ActionName == 0 ? "" : (item.ActionName).toUpperCase()) + '</td>';
        if ($('#cbNotes').prop('checked'))
            pTablesHTML += '<td>' + (item.Notes == 0 ? "" : item.Notes.toUpperCase()) + '</td>';
        if ($('#cbActionDate').prop('checked'))
            pTablesHTML += '<td>' + (GetDateFromServer(item.ActionDate) == "01/01/1900" ? " " : GetDateFromServer(item.ActionDate)) + '</td>';
        if ($('#cbActionDetails').prop('checked'))
            pTablesHTML += '<td style="text-align:left!important;">' + (item.ActionDetails == 0 ? "" : (item.ActionDetails.split('<br>')[0] + "  " + item.ActionDetails.split('<br>')[1] + "  " + item.ActionDetails.split('<br>')[2] + "  " + item.ActionDetails.split('<br>')[3]).toUpperCase()) + '</td>';
        if ($('#cbSalesRepName').prop('checked'))
            pTablesHTML += '<td>' + (item.SalesRepName == 0 ? "" : (item.SalesRepName).toUpperCase()) + '</td>';

        if ($('#cbActionStatus').prop('checked'))
            pTablesHTML += '<td>' + (item.ActionStatus == 0 ? "" : (item.ActionStatus).toUpperCase()) + '</td>';
        //if ($('#cbCountOfAction_BySalesMan').prop('checked'))
        //    pTablesHTML += '<td>' + (item.CountOfAction_BySalesMan == 0 ? "" : item.CountOfAction_BySalesMan) + '</td>';
        //if ($('#cbCountOfAction_ByAllSalesMen').prop('checked'))
        //    pTablesHTML += '<td>' + (item.CountOfAction_ByAllSalesMen == 0 ? "" : item.CountOfAction_ByAllSalesMen) + '</td>';
        if ($('#cbUsername').prop('checked'))
            pTablesHTML += '<td>' + (item.Username == 0 ? "" : (item.Username).toUpperCase()) + '</td>';
        if ($('#cbCreationDate').prop('checked'))
            pTablesHTML += '<td>' + (GetDateFromServer(item.CreationDate) == "01/01/1900" ? " " : GetDateFromServer(item.CreationDate)) + '</td>';


        //pTablesHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
        pTablesHTML += '                                     </tr>';
    });
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        //  var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';

        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client : </b> ' + ($("#slCOEnName_search option:selected").val().trim() == "0" ? "All" : $("#slCOEnName_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client Statue : </b> ' + $("input[name='ClientStatus_Search']:checked").attr("Tag").toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman : </b> ' + ($("#slSalesRep_search option:selected").val().trim() == "0" ? "All" : $("#slSalesRep_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Action Type : </b> ' + ($("#slActionType_Search option:selected").val().trim() == "0" ? "All" : $("#slActionType_Search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Source Type : </b> ' + ($("#slSource_search option:selected").val().trim() == "0" ? "All" : $("#slSource_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Client FollowUps : </b> ' + ($("#slFollow_UpsStatue_Search option:selected").val().trim() == "0" ? "All" : $("#slFollow_UpsStatue_Search option:selected").text().toUpperCase()) + '</div>';

        ReportHTML += '             <div class="col-xs-6"><b>Action Date :</b> ' + ($("#txtActionDateFrom_Search").val() == "" && $("#txtActionDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtActionDateFrom_Search").val() == "" ? "" : "From " + $("#txtActionDateFrom_Search").val() + " ") + ($("#txtActionDateTo_Search").val() == "" ? "" : "To " + $("#txtActionDateTo_Search").val())) + '</div>';



        ReportHTML += '             <div class="col-xs-6"><b>Source Date :</b> ' + ($("#txtSourceDateFrom_Search").val() == "" && $("#txtSourceDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtSourceDateFrom_Search").val() == "" ? "" : "From " + $("#txtSourceDateFrom_Search").val() + " ") + ($("#txtSourceDateTo_Search").val() == "" ? "" : "To " + $("#txtSourceDateTo_Search").val())) + '</div>';


        ReportHTML += '                         <div> &nbsp; </div>';

        ReportHTML += pTablesHTML;
        ReportHTML += pSummaryTablesHTML;

        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        //  mywindow.document.write(ReportHTML);
        // $('#Reportbody').toe----------------------------------------------------------------------
        // $("#tblvwCRM_ClientsFollowReport").tblToExcel();
        $("#hExportedTable").html(ReportHTML);
        // console.log($('#Reportbody').html());
        $("#Reportbody").tblToExcel(pReportTitle);
        //mywindow.document.close();
    }
    else {
        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client : </b> ' + ($("#slCOEnName_search option:selected").val() == "0" ? "All" : $("#slCOEnName_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client Statue : </b> ' + $("input[name='ClientStatus_Search']:checked").attr("Tag").toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman : </b> ' + ($("#slSalesRep_search option:selected").val() == "0" ? "All" : $("#slSalesRep_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Action Type : </b> ' + ($("#slActionType_Search option:selected").val() == "0" ? "All" : $("#slActionType_Search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Source Type : </b> ' + ($("#slSource_search option:selected").val() == "0" ? "All" : $("#slSource_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Client FollowUps : </b> ' + ($("#slFollow_UpsStatue_Search option:selected").val() == "0" ? "All" : $("#slFollow_UpsStatue_Search option:selected").text().toUpperCase()) + '</div>';

        ReportHTML += '             <div class="col-xs-6"><b>Action Date :</b> ' + ($("#txtActionDateFrom_Search").val() == "" && $("#txtActionDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtActionDateFrom_Search").val() == "" ? "" : "From " + $("#txtActionDateFrom_Search").val() + " ") + ($("#txtActionDateTo_Search").val() == "" ? "" : "To " + $("#txtActionDateTo_Search").val())) + '</div>';



        ReportHTML += '             <div class="col-xs-6"><b>Source Date :</b> ' + ($("#txtSourceDateFrom_Search").val() == "" && $("#txtSourceDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtSourceDateFrom_Search").val() == "" ? "" : "From " + $("#txtSourceDateFrom_Search").val() + " ") + ($("#txtSourceDateTo_Search").val() == "" ? "" : "To " + $("#txtSourceDateTo_Search").val())) + '</div>';


        ReportHTML += '                         <div> &nbsp; </div>';
        ReportHTML += '                        <div class="col-xs-12">';
        ReportHTML += pTablesHTML;
        ReportHTML += pSummaryTablesHTML;
        ReportHTML += '                         </div>';
        console.log(pSummaryTablesHTML);
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);

        $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
    }
}



function TargetReport_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    var pSummaryTablesHTML = '<table id="tblvwCRM_ClientsFollowReportSummary" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pSummaryTablesHTML += JSON.parse(data[2]);
    pSummaryTablesHTML += ' </table>'
    var pReportTitle = "Salesmen Target Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    // style = "background-color:Gainsboro;"


    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        //  var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client : </b> ' + ($("#slCOEnName_search option:selected").val().trim() == "0" ? "All" : $("#slCOEnName_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client Statue : </b> ' + $("input[name='ClientStatus_Search']:checked").attr("Tag").toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman : </b> ' + ($("#slSalesRep_search option:selected").val().trim() == "0" ? "All" : $("#slSalesRep_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Action Type : </b> ' + ($("#slActionType_Search option:selected").val().trim() == "0" ? "All" : $("#slActionType_Search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Source Type : </b> ' + ($("#slSource_search option:selected").val().trim() == "0" ? "All" : $("#slSource_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Client FollowUps : </b> ' + ($("#slFollow_UpsStatue_Search option:selected").val().trim() == "0" ? "All" : $("#slFollow_UpsStatue_Search option:selected").text().toUpperCase()) + '</div>';

        ReportHTML += '             <div class="col-xs-6"><b>Action Date :</b> ' + ($("#txtActionDateFrom_Search").val() == "" && $("#txtActionDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtActionDateFrom_Search").val() == "" ? "" : "From " + $("#txtActionDateFrom_Search").val() + " ") + ($("#txtActionDateTo_Search").val() == "" ? "" : "To " + $("#txtActionDateTo_Search").val())) + '</div>';



        ReportHTML += '             <div class="col-xs-6"><b>Source Date :</b> ' + ($("#txtSourceDateFrom_Search").val() == "" && $("#txtSourceDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtSourceDateFrom_Search").val() == "" ? "" : "From " + $("#txtSourceDateFrom_Search").val() + " ") + ($("#txtSourceDateTo_Search").val() == "" ? "" : "To " + $("#txtSourceDateTo_Search").val())) + '</div>';


        ReportHTML += '                         <div> &nbsp; </div>';

        // ReportHTML += pTablesHTML;
        ReportHTML += pSummaryTablesHTML;

        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        //  mywindow.document.write(ReportHTML);
        // $('#Reportbody').toe----------------------------------------------------------------------
        // $("#tblvwCRM_ClientsFollowReport").tblToExcel();
        $("#hExportedTable").html(ReportHTML);
        // console.log($('#Reportbody').html());
        $("#Reportbody").tblToExcel(pReportTitle);
        //mywindow.document.close();
    }
    else {
        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        if (pDefaults.UnEditableCompanyName != "MAN")
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        else
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/YLMLogoFinalConv-01.svg" alt="logo"/></div> </br>';

        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client : </b> ' + ($("#slCOEnName_search option:selected").val() == "0" ? "All" : $("#slCOEnName_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Client Statue : </b> ' + $("input[name='ClientStatus_Search']:checked").attr("Tag").toUpperCase() + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Salesman : </b> ' + ($("#slSalesRep_search option:selected").val() == "0" ? "All" : $("#slSalesRep_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Action Type : </b> ' + ($("#slActionType_Search option:selected").val() == "0" ? "All" : $("#slActionType_Search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-3"><b>Source Type : </b> ' + ($("#slSource_search option:selected").val() == "0" ? "All" : $("#slSource_search option:selected").text().toUpperCase()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Client FollowUps : </b> ' + ($("#slFollow_UpsStatue_Search option:selected").val() == "0" ? "All" : $("#slFollow_UpsStatue_Search option:selected").text().toUpperCase()) + '</div>';

        ReportHTML += '             <div class="col-xs-6"><b>Action Date :</b> ' + ($("#txtActionDateFrom_Search").val() == "" && $("#txtActionDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtActionDateFrom_Search").val() == "" ? "" : "From " + $("#txtActionDateFrom_Search").val() + " ") + ($("#txtActionDateTo_Search").val() == "" ? "" : "To " + $("#txtActionDateTo_Search").val())) + '</div>';



        ReportHTML += '             <div class="col-xs-6"><b>Source Date :</b> ' + ($("#txtSourceDateFrom_Search").val() == "" && $("#txtSourceDateTo_Search").val() == ""
            ? "All Dates"
            : ($("#txtSourceDateFrom_Search").val() == "" ? "" : "From " + $("#txtSourceDateFrom_Search").val() + " ") + ($("#txtSourceDateTo_Search").val() == "" ? "" : "To " + $("#txtSourceDateTo_Search").val())) + '</div>';


        ReportHTML += '                         <div> &nbsp; </div>';

        //  ReportHTML += pTablesHTML;
        ReportHTML += pSummaryTablesHTML;
        console.log(pSummaryTablesHTML);
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);

        $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
    }
}


function vwCRM_ClientsFollowReport_GetFilterWhereClause() {
    debugger;
    var WhereClause = "Where";

    //if ($('#txtClientCode_search').val().trim() != "") {
    //    WhereClause += " AND ClientCode = " + $('#txtClientCode_search').val() + "";
    //}
    if ($('#slCOEnName_search').val().trim() != "0") {
        //  WhereClause += " AND ClientName LIKE N'%" + $('#slCOEnName_search').val() + "%'";
        WhereClause += " AND ClientID = " + $('#slCOEnName_search').val() + "";
    }
    //if ($('#txtCOARName_search').val().trim() != "") {
    //    WhereClause += " AND CLientLocalName Like N'%" + $('#txtCOARName_search').val() + "%'";
    //}
    //if ($('#slCountry_search').val().trim() != "0") {
    //    WhereClause += " AND CountryID = " + $('#slCountry_search').val() + "";
    //}
    //if ($('#slPorts_search').val() != null && $('#slPorts_search').val() != "0") {
    //    WhereClause += " AND PortID = " + $('#slPorts_search').val() + "";
    //}
    if ($('#slSource_search').val().trim() != "0") {
        WhereClause += " AND SourceID = " + $('#slSource_search').val() + "";
    }
    if (isValidDate($('#txtSourceDateFrom_Search').val(), 1) && $('#txtSourceDateFrom_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , SourceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtSourceDateFrom_Search').val()) + "')";
    }
    if (isValidDate($('#txtSourceDateTo_Search').val(), 1) && $('#txtSourceDateTo_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , SourceDate ) <= CONVERT(date ,  '" + ConvertDateFormat($('#txtSourceDateTo_Search').val()) + "')";
    }

    if ($("input[name='ClientStatus_Search']:checked").val().trim() != "0") {
        WhereClause += " AND ClientStatus = " + $("input[name='ClientStatus_Search']:checked").val() + "";
    }

    if ($('#slSource_search').val().trim() != "0") {
        WhereClause += " AND SourceID = " + $('#slSource_search').val() + "";
    }
    if ($('#slSalesRep_search').val().trim() != "0") {
        WhereClause += " AND SalesRepID = " + $('#slSalesRep_search').val() + "";
    }

    if ($('#slFollow_UpsStatue_Search').val().trim() == "1") {
        WhereClause += " AND FollowUpID Is NOT NULL ";
    }
    else if ($('#slFollow_UpsStatue_Search').val().trim() == "2") {
        WhereClause += " AND FollowUpID Is NULL";
    }

    //if ($("input[name='CompanySize_Search']:checked").val().trim() != "0") {
    //    WhereClause += " AND CompanySize = " + $("input[name='CompanySize_Search']:checked").val() + "";
    //}

    //if ($("input[name='CompanyView_Search']:checked").val().trim() != "0") {
    //    WhereClause += " AND CompanyView = " + $("input[name='CompanyView_Search']:checked").val() + "";
    //}

    if ($('#slActionType_Search').val().trim() != "0") {
        WhereClause += " AND ActionID = " + $('#slActionType_Search').val() + "";
        // WhereClause_Followup += " AND ActionType_ID = " + $('#slActionType_Search').val() + "";
    }
    if (isValidDate($('#txtActionDateFrom_Search').val(), 1) && $('#txtActionDateFrom_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ActionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtActionDateFrom_Search').val()) + "')";
        //  WhereClause_Followup += " AND CONVERT(date , ActionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtActionDateFrom_Search').val()) + "')";
    }
    if (isValidDate($('#txtActionDateTo_Search').val(), 1) && $('#txtActionDateTo_Search').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ActionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtActionDateTo_Search').val()) + "')";
        // WhereClause_Followup += " AND CONVERT(date , ActionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtActionDateTo_Search').val()) + "')";
    }

    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1";

    }
    else {

        WhereClause = WhereClause.replace("Where AND", "Where ");
    }

    WhereClause += " order by ClientID";

    return WhereClause;
}


function vwCRM_ClientsFollowReport_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtSourceDateFrom_Search").val().trim() == "" || isValidDate($("#txtSourceDateFrom_Search").val(), 1))
        && ($("#txtSourceDateTo_Search").val().trim() == "" || isValidDate($("#txtSourceDateTo_Search").val(), 1))
        && ($("#txtActionDateFrom_Search").val().trim() == "" || isValidDate($("#txtActionDateFrom_Search").val(), 1))
        && ($("#txtActionDateTo_Search").val().trim() == "" || isValidDate($("#txtActionDateTo_Search").val(), 1))

    ) {
        FadePageCover(true);
        var pWhereClause = vwCRM_ClientsFollowReport_GetFilterWhereClause();



        if ($('#cbIsFollowupReport').is(':checked')) {


            var pParametersWithValues = {
                pWhereClause: pWhereClause

            };


            CallGETFunctionWithParameters("/api/vwCRM_ClientsFollowReport/LoadFollowUpReport"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                    {
                        FollowUpReport_DrawReport(data, pOutputTo);
                    }
                    else
                        swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                    FadePageCover(false);
                });

            $('#txtActionDateFrom_Search').removeClass('bg-light');
            $('#txtActionDateTo_Search').removeClass('bg-light');
        }
        else {

            // string pWhereClause, DateTime pFromDate, DateTime pToDate

            if (

                (isValidDate($("#txtActionDateFrom_Search").val(), 1))
                && (isValidDate($("#txtActionDateTo_Search").val(), 1))

            ) {


                var pParametersWithValues = {
                    pWhereClause: pWhereClause,
                    pFromDate: ConvertDateFormat($("#txtActionDateFrom_Search").val().trim()),
                    pToDate: ConvertDateFormat($("#txtActionDateTo_Search").val().trim())

                };
                CallGETFunctionWithParameters("/api/vwCRM_ClientsFollowReport/LoadTargetReport"
                    , pParametersWithValues
                    , function (data) {
                        if (data[0]) //pRecordsExist
                        {
                            TargetReport_DrawReport(data, pOutputTo);
                        }
                        else
                            swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                        FadePageCover(false);
                    });

                $('#txtActionDateFrom_Search').removeClass('bg-light');
                $('#txtActionDateTo_Search').removeClass('bg-light');
                //  swal(strSorry, "Please, Insert Actions Date.");
            }
            else {
                $('#txtActionDateFrom_Search').addClass('bg-light');
                $('#txtActionDateTo_Search').addClass('bg-light');
                swal(strSorry, "Please, Insert Actions Date.");
                FadePageCover(false);

            }
        }


        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
    FadePageCover(false);
}