function VoucherLogScreenInitialize() {
    debugger;
    $("#txtFromOpenDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat());
}
function VoucherLog_Print() {
    debugger;
    if (
        ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = VoucherLog_GetFilterWhereClause();
        var pParametersWithValues = {
            pWhereClause: pWhereClause
        };
        CallGETFunctionWithParameters("/api/VoucherLog/LoadData"
            , pParametersWithValues
            , function (data) {
                if (data[0]) //pRecordsExist
                    VoucherLog_DrawReportDetails(data);
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

function VoucherLog_GetFilterWhereClause() {
    var pWhereClause = "";
    pWhereClause += " WHERE ActionType Like N'%" + $("#slActionType").val() + "%' ";
    if ($("#slLogFor").val() == 1)
        pWhereClause += " AND A_VoucherType IN (10,20) ";
    else if ($("#slLogFor").val() == 2)
        pWhereClause += " AND A_VoucherType IN (30,40) ";
    else if ($("#slLogFor").val() != 7)
        pWhereClause += " AND A_VoucherType = " + $("#slLogFor").val() + " AND A_VoucherCode LIKE N'%" + $("#txtVoucherCode").val().trim() + "%'";

    pWhereClause += " AND CAST(ActionDate AS date) BETWEEN '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + "'";

    if ($("#slLogFor").val() == 7)
        pWhereClause += " AND A_JVNO IS NOT NULL AND A_JVNO LIKE N'%" + $("#txtJVNO").val() + "%'";

    return pWhereClause;
}

function VoucherLog_DrawReportDetails(data) {
    debugger;
    var pReportRows = JSON.parse(data[1]);

    var pReportTitle = "Voucher Log";

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
    //ReportHTML += '                         <table id="tblVoucherLog" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
    ReportHTML += '                         <table id="tblVoucherLog" class="table table-striped text-sm table-bordered m-t-sm " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
    ReportHTML += '                             <thead>';
    ReportHTML += '                                 <tr class="" style="font-size:95%;">';
    ReportHTML += '                                     <th>User</th>';
    ReportHTML += '                                     <th>Log For</th>';
    ReportHTML += '                                     <th>Action</th>';
    ReportHTML += '                                     <th>Action Date</th>';
    if ($("#slLogFor").val() != 7)
        ReportHTML += '                                     <th>Voucher Code</th>';
    else
        ReportHTML += '                                     <th>JV No</th>';

    ReportHTML += '                                     <th>Old Value</th>';
    ReportHTML += '                                     <th>New Value</th>';
    ReportHTML += '                                     <th>Old Account</th>';
    ReportHTML += '                                     <th>New Account</th>';
    ReportHTML += '                                     <th>Old SubAccount</th>';
    ReportHTML += '                                     <th>New SubAccount</th>';
    ReportHTML += '                                     <th>Old cost center</th>';
    ReportHTML += '                                     <th>New cost center</th>';
    ReportHTML += '                                 </tr>';
    ReportHTML += '                             </thead>';
    ReportHTML += '                             <tbody>';
    //debugger;
    //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
    $.each((pReportRows), function (i, item) {
        ReportHTML += '                                     <tr style="font-size:95%;">';
        ReportHTML += '                                         <td>' + (item.UserName == 0 ? "" : item.UserName) + '</td>';

        switch (item.A_VoucherType) {
            case 10:
                ReportHTML += '                                         <td>Cash Receive</td>';
                break;
            case 20:
                ReportHTML += '                                         <td>Cash Issue</td>';
                break;
            case 30:
                ReportHTML += '                                         <td>Cheque Receive</td>';
                break;
            case 40:
                ReportHTML += '                                         <td>Cheque Issue</td>';
                break;
            default:
                ReportHTML += '                                         <td>JV</td>';
                break;

        }

        ReportHTML += '                                         <td>' + (item.ActionType == 'I' ? "Insert"
            : (item.ActionType == 'U' ? "Update" : "Delete")
        ) + '</td>';
        ReportHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActionDate)) < 1 ? "" : GetFullDateTime_DD_MM_YY(item.ActionDate)) + '</td>';

        if ($("#slLogFor").val() != 7)
            ReportHTML += '                                         <td>' + (item.A_VoucherCode == 0 ? "" : item.A_VoucherCode) + '</td>';
        else
            ReportHTML += '                                         <td>' + (item.A_JVNO == 0 ? "" : item.A_JVNO) + '</td>';

        
        ReportHTML += '                                         <td>' + (item.OldValue == 0 ? "" : item.OldValue) + '</td>';
        ReportHTML += '                                         <td>' + (item.NewValue == 0 ? "" : item.NewValue) + '</td>';
        ReportHTML += '                                         <td>' + (item.OldAccount == 0 ? "" : item.OldAccount) + '</td>';
        ReportHTML += '                                         <td>' + (item.NewAccount == 0 ? "" : item.NewAccount) + '</td>';
        ReportHTML += '                                         <td>' + (item.OldSubAccount == 0 ? "" : item.OldSubAccount) + '</td>';
        ReportHTML += '                                         <td>' + (item.NewSubAccount == 0 ? "" : item.NewSubAccount) + '</td>';
        ReportHTML += '                                         <td>' + (item.OldCostCenter == 0 ? "" : item.OldCostCenter) + '</td>';
        ReportHTML += '                                         <td>' + (item.NewCostCenter == 0 ? "" : item.NewCostCenter) + '</td>';
        ReportHTML += '                                     </tr>';
    });
    ReportHTML += '                             </tbody>';
    ReportHTML += '                         </table>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    mywindow.document.close();
}

