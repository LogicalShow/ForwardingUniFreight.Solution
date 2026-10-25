function vwCRM_ClientsFollowReport_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}

function FollowUpReport_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    //var pSummaryTablesHTML = '<table id="tblvwCRM_ClientsFollowReportSummary" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    //pSummaryTablesHTML += JSON.parse(data[2]);
    //pSummaryTablesHTML += ' </table>'
    var pReportTitle = "Sales Leads Follow-up Report";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTablesHTML = "";
    pTablesHTML += '                         <table id="tblvwCRM_ClientsFollowReport" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';  
    pTablesHTML += '                    <tr> <th>Salesman</th>';
    pTablesHTML += '                     <th>Annual target</th>';
    pTablesHTML += '                     <th>Act VS Target YTD %</th>';
    pTablesHTML += '                     <th>Number of meetings YTD</th>';
    pTablesHTML += '                     <th>Number of Files YTD</th>';
    pTablesHTML += '                     <th>Number of New Customers YTD</th>';
    pTablesHTML += '                     <th>Year</th></tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    $.each(pReportRows, function (i, item) {
        //Fiscal_Year_Name UserName UserID  NumberOfFilesYTD NumberOfNewCustomersYTD NumberOfmeetingsYTD AnnualTarget  ActVSTargetYTD
        if ((item.ActVSTargetYTD == 0) && (item.NumberOfFilesYTD == 0) && (item.NumberOfNewCustomersYTD == 0))
        { }
        else
        {
            pTablesHTML += '<tr class="" style="font-size:90%;">';
            pTablesHTML += "<td class='UserID'>" + item.UserName + "</td>"
            pTablesHTML += "<td class='AnnualTarget'>" + item.AnnualTarget + "</td>"
            pTablesHTML += "<td class='ActVSTargetYTD'>" + item.ActVSTargetYTD + "</td>"
            pTablesHTML += "<td class='NumberOfmeetingsYTD'>" + item.NumberOfmeetingsYTD + "</td>"
            pTablesHTML += "<td class='NumberOfFilesYTD'>" + item.NumberOfFilesYTD + "</td>"
            pTablesHTML += "<td class='NumberOfNewCustomersYTD'>" + item.NumberOfNewCustomersYTD + "</td>"
            pTablesHTML += "<td class='Fiscal_Year_Name'>" + item.Fiscal_Year_Name + "</td>"
            pTablesHTML += '</tr>';
        }
       
    });
    pTablesHTML += '                             </tbody>';
    debugger;
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
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
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
        //ReportHTML += pSummaryTablesHTML;

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
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        //ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Client : </b> ' + ($("#slCOEnName_search option:selected").val() == "0" ? "All" : $("#slCOEnName_search option:selected").text().toUpperCase()) + '</div>';
        //ReportHTML += '             <div class="col-xs-3"><b>Client Statue : </b> ' + $("input[name='ClientStatus_Search']:checked").attr("Tag").toUpperCase() + '</div>';

        ReportHTML += '                         <div> &nbsp; </div>';
        ReportHTML += '                        <div class="col-xs-12">';
        ReportHTML += pTablesHTML;
        ReportHTML += '                         </div>';
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
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
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
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
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

function CRMSalesReport_GetFilterWhereClause() {
    debugger;
    var WhereClause = "Where";

    if ($('#slSalesRep_search').val().trim() != "0") {
        WhereClause += " AND UserID = " + $('#slSalesRep_search').val() + "";
    }
    if ($("#txtYearFrom").val().trim() != "" && $("#txtYearTo").val().trim() != "" ) 
        WhereClause += " AND Fiscal_Year_Name >=  " + $('#txtYearFrom').val() + " AND Fiscal_Year_Name <=  " + $('#txtYearTo').val() ;
    if ($("#txtYearFrom").val().trim() != "" && $("#txtYearTo").val().trim() == "" ) 
        WhereClause += "  AND Fiscal_Year_Name >=  " + $('#txtYearFrom').val() ;
    if ($("#txtYearFrom").val().trim() == "" && $("#txtYearTo").val().trim() != "" ) 
        WhereClause += " AND Fiscal_Year_Name <=  " + $('#txtYearTo').val() ;
 
    if (WhereClause.trim() == "Where") {
        WhereClause = "Where 1 = 1";
    }
    else {
        WhereClause = WhereClause.replace("Where AND", "Where ");
    }

    WhereClause += " order by Fiscal_Year_Name DESC";

    return WhereClause;
}

function CRMSalesReport_Print(pOutputTo) 
{
    debugger;
        FadePageCover(true);
        var pWhereClause = CRMSalesReport_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/CRMSalesReport/LoadCRMSalesReport"
                , pParametersWithValues
                , function (data) {
                    let pMessageReturned = data[0];
                    if (pMessageReturned == "")
                        FollowUpReport_DrawReport(data, pOutputTo);
                    else
                        swal("Sorry", pMessageReturned);
                    FadePageCover(false);
                },null);
}