function HoldTransactionLog_Initialize() {
    debugger;
    LoadView("/ContainerTrackingGroup/HoldTransactionLog", "div-content", function () {
        $("#txtFromOpenDate").val(getTodaysDateInddMMyyyyFormat());
        $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat()); 
        FadePageCover(false);
    })
}
function HoldTransactionLog_GetWhereClause() {
    var pWhereClause = "WHERE 1=1" + " \n";

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "")
        pWhereClause += "AND CreatedOn >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'" + " \n";
    if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "")
        pWhereClause += "AND CAST(CreatedOn AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'" + " \n";
    if ($("#txtHouseNumber").val() != "" && $("#txtHouseNumber").val() != undefined)
        pWhereClause += " AND HouseNumber Like '%" + $("#txtHouseNumber").val() + "%'"
    return pWhereClause;
}
function HoldTransactionLog_Print(pOutputTo) {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = HoldTransactionLog_GetWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
            , pRange: $("#slRange").val()
        };
        CallGETFunctionWithParameters("/api/HoldTransactionLog/LoadData"
            , pParametersWithValues
            , function (pData) {
                var pMessageReturned = pData[0];
                if (pMessageReturned == "") //pRecordsExist
                    HoldTransactionLog_DrawReport(pData, pOutputTo);
                else
                    swal(strSorry, "There are no records for this search criteria!");
                FadePageCover(false);
            });
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function HoldTransactionLog_DrawReport(pData, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(pData[1]);
    var pReportTitle = "Hold Transaction Log";

    var pTableHTML = "";

    pTableHTML += '                         <table id="tblHoldTransactionsReport" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <td><b>House Number</b></td>';
    pTableHTML += '                                     <td><b>Operation Code</b></td>';
    pTableHTML += '                                     <td><b>Transaction Type</b></td>';
    pTableHTML += '                                     <td><b>Reason</b></td>';
    pTableHTML += '                                     <td><b>User</b></td>';
    pTableHTML += '                                     <td><b>Created on</b></td>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    $.each((pReportRows), function (i, item) {
        pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTableHTML += '                                     <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
        pTableHTML += '                                     <td>' + (item.OperationCode == 0 ? "" : item.OperationCode) + '</td>';
        pTableHTML += '                                     <td>' + (item.TransactionType == 0 ? "" : item.TransactionType) + '</td>';
        pTableHTML += '                                     <td>' + (item.Reason == 0 ? "" : item.Reason) + '</td>';
        pTableHTML += '                                     <td>' + (item.UserName == 0 ? "" : item.UserName) + '</td>';
        pTableHTML += '                                     <td>' + (item.CreatedOn == 0 ? "" : GetFullDateTime_DD_MM_YY_hh_mm(item.CreatedOn)) + '</td>';
        pTableHTML += '                                 </tr>';
    });
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';

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