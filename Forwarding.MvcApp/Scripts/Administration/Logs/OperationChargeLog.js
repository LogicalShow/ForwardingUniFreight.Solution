//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document
function OperationChargeLog_Print() {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = OperationChargeLog_GetFilterWhereClause();
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
        CallGETFunctionWithParameters("/api/OperationChargeLog/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    OperationChargeLog_DrawReport(data);
                else
                    swal("Sorry", "No recorded transactions for that criteria.");
                FadePageCover(false);
            });
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
        //}
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}

function OperationChargeLog_GetFilterWhereClause() {
    var pWhereClause = "";
    //var pOperationStageFilter = ($("#slOperationStages").val() == 0
    //                            ? "" //if 0 then all stages
    //                            : ($("#slOperationStages").val() == ClosedQuoteAndOperStageID.toString() ? (" (CloseDate <= GETDATE() AND OperationStageID <> " + /*This is to handle case of auto close*/CancelledQuoteAndOperStageID.toString() + ") ") : (" OperationStageID = " + $("#slOperationStages").val() + " AND CloseDate > GETDATE() "))
    //                            );

    pWhereClause += "WHERE 1=1 ";
    pWhereClause += $("#slOperation").val() == "" ? "" : (" AND OperationID = N'" + $("#slOperation").val() +"' ");
    pWhereClause += $("#slUsers").val() == "" ? "" : (" AND UserID = N'" + $("#slUsers").val() +"' ");
    pWhereClause += $("#slActionType").val() == "" ? "" : (" AND ActionType = N'" + $("#slActionType").val() + "' ");
    pWhereClause += $("#slLogFor").val() == "" ? "" : (" AND LogFor = N'" + $("#slLogFor").val() + "' ");
    pWhereClause += " AND CAST(ActionDate AS date) BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'";

    return pWhereClause;
}

function OperationChargeLog_DrawReport(data) {
    debugger;
    var pReportRows = JSON.parse(data[1]);

    var pReportTitle = "Operations Charges Logs";

    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

    ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    //ReportHTML += '             <div class="col-xs-3"><b>Operation :</b> ' + $("#slOperation option:selected").text() + '</div>';

    ////ReportHTML += '                 <section class="panel panel-default">';
    //ReportHTML += '                     <div class="table-responsive">';
    ReportHTML += '                         <div> &nbsp; </div>'
    //ReportHTML += '                         <table id="tblOperationChargeLog" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    ReportHTML += '                         <table id="tblOperationChargeLog" class="table table-striped text-sm table-bordered m-t-sm " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
    ReportHTML += '                             <thead>';
    ReportHTML += '                                 <tr class="" style="font-size:95%;">';
    ReportHTML += '                                     <th>User</th>';
    ReportHTML += '                                     <th>Operation</th>';
    ReportHTML += '                                     <th>Log For</th>';
    ReportHTML += '                                     <th>Action</th>';
    ReportHTML += '                                     <th>Action Taken</th>';
    ReportHTML += '                                 </tr>';
    ReportHTML += '                             </thead>';
    ReportHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        ReportHTML += '                                     <tr style="font-size:95%;">';
        ReportHTML += '                                         <td>' + (item.UserName == 0 ? "" : item.UserName) + '</td>';
        ReportHTML += '                                         <td>' + (item.OperationCode == 0 ? "" : item.OperationCode) + '</td>';
        ReportHTML += '                                         <td>' + (item.LogFor == constOperationLogForPay ? "Pay." : "Rec.") + '</td>';
        ReportHTML += '                                         <td>' + (item.ActionType == 'I' ? "Insert"
                                                                                    : (item.ActionType == 'U' ? "Update" : "Delete") 
                                                                        ) + '</td>';
        ReportHTML += '                                         <td>' + (item.ActionTaken == 0 ? "" : item.ActionTaken) + '</td>';
        //ReportHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
        ReportHTML += '                                     </tr>';
    });
    ReportHTML += '                             </tbody>';
    ReportHTML += '                         </table>';
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

