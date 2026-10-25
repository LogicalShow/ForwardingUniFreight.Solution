$(document).ready(function () {

    $('#div-search-option').keydown(function (e) {
        if (e.keyCode == 13) {
            TRCK_Trailers_LoadingWithPaging();
        }
    });

});

// Bind TRCK_Trailers Table Rows
function SubmitInvoice_LoadingWithPaging_Forwarding() {
    debugger;

    FadePageCover(true);
    CallGETFunctionWithParameters("/api/InvoicesLOG/SearchByInvoiceNumber", { pPageNumber: 1, pPageSize: $("#select-page-size_Forwarding").val(), pWhereClause: GetWhereClause() }
        , function (pData) {//(int pPageNumber, int pPageSize, string pWhereClause)
            debugger;
            FadePageCover(false);
            SubmittedSL_Invoices_BindTableRows(JSON.parse(pData[0]));

        }, null);
}

function GetWithPagingData() {
    debugger;
    var URL = "/api/InvoicesLOG/SearchByInvoiceNumber";

    return URL;
}
function GetWhereClause()
{
    debugger;
    var WhereClause = " Where 1=1 ";
    if ($("#slInvoiceType_Forwarding").val() != "0" && $("#slInvoiceType_Forwarding").val() != 0) {
        WhereClause += " AND InvoiceTypeID = " + $("#slInvoiceType_Forwarding").val();
    }
    if ($("#slBranch_Forwarding").val() != "0" && $("#slBranch_Forwarding").val() != 0) {
        WhereClause += " AND BranchID = " + $("#slBranch_Forwarding").val();
    }
    if ($("#slCurrency_Filter").val() != "0" && $("#slCurrency_Filter").val() != 0) {
        WhereClause += " AND CurrencyID = " + $("#slCurrency_Filter").val();
    }
    if ($("#slClients_Filter").val() != "0" && $("#slClients_Filter").val() != 0) {
        WhereClause += " AND ClientID = " + $("#slClients_Filter").val();
    }
    if ($("#slUsers_Filter").val() != "0" && $("#slUsers_Filter").val() != 0) {
        WhereClause += " AND CreationUserID = " + $("#slUsers_Filter").val();
    }
    if ($('#txtFromDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceSentDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Forwarding').val()) + "')";
    }
    if ($('#txtToDate_Forwarding').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceSentDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Forwarding').val()) + "')";
    }
    if ($("#txt-SearchForwarding").val() != "") {
        WhereClause += " AND ( InvoiceNumber = '" + $("#txt-SearchForwarding").val() + "' OR OperationCode like '%" + $("#txt-SearchForwarding").val() + "%' ) ";
    }
    return WhereClause;
}
function SubmittedSL_Invoices_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item) {
        debugger;//InvoiceTypeName,OperationCode,BranchName,PartnerName,BillNo
        AppendRowtoTable("tblSL_Invoices",//Amount,AmountWithoutVAT,TaxPercentage,TaxAmount,InvoiceNumber,InvoiceDate
            ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + "); '>"
                //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                //+ "<td class='BillNo' val='" + item.BillNo + "'>" + item.BillNo + "</td>"
                + "<td class='ClientID'>" + item.ClientName + "</td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
                + "<td class='TotalBeforTax hide' val='" + item.AmountWithoutVAT + "'>" + item.AmountWithoutVAT + "</td>"
                + "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
                + "<td class='InvoiceStatus'>" + item.InvoiceStatus + "</td>"
                + "<td class='FailedReason'> " + (item.InvoiceStatus == "CLEARED" ? "" : item.InvoiceStatus) +"</td>"
                + "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                + "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='InvoiceSentDate'>" + (GetDateFromServer(item.InvoiceSentDate) == '01/01/1900' ? "" : ConvertToDateTimeDMYT(item.InvoiceSentDate)) + "</td>"
                + "<td class='CreationUserName' val='" + item.CreationUserName + "'>" + (item.CreationUserName == "0" ? "" : item.CreationUserName) + "</td>"
                + "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"

            ));


    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    //HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function ConvertToDateTimeDMYT(inputDate)
{
    let dateString = inputDate;// '/Date(1732711689000)/';

    // Extract the timestamp using a regular expression
    let timestamp = parseInt(dateString.match(/\d+/)[0], 10);

    // Convert the timestamp to a Date object
    let date = new Date(timestamp);

    // Format the date manually
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    let formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    console.log(formattedDate);
    return formattedDate;
}
function InvoiceSales_DrawReport(pOutputTo) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/InvoicesLOG/SearchByInvoiceNumber", { pPageNumber: 1, pPageSize: 10000, pWhereClause: GetWhereClause() }
        , function (pData) {//pPageNumber, int pPageSize, string pWhereClause
            debugger;
            var pReportRows = JSON.parse(pData[0]);
            var pReportTitle = "فواتير المبيعات";
            var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
            var pTablesHTML = "";
            pTablesHTML += '                         <table id="tblvwTaxationOfSales" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered >';
            pTablesHTML += '                             <thead>';
            pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
            pTablesHTML += '                                     <th> رمز المعاملة</th>';
            pTablesHTML += '                                     <th> عميل </th>';
            pTablesHTML += '                                     <th>رقم الفاتورة   </th>';
            pTablesHTML += '                                     <th>القيمة  </th>';
            pTablesHTML += '                                     <th>حالة الفاتورة	 </th>';
            pTablesHTML += '                                     <th> العملة</th>';
            pTablesHTML += '                                     <th>نوع الفاتورة</th>';
            pTablesHTML += '                                     <th>تاريخ الفاتورة</th>';
            pTablesHTML += '                                     <th>تاريخ الارسال	</th>';
            pTablesHTML += '                                     <th>الفرع</th>';
            pTablesHTML += '                                 </tr>';
            pTablesHTML += '                             </thead>';
            pTablesHTML += '                             <tbody>';

            $.each((pReportRows), function (i, item) {

                pTablesHTML += '<tr>';

                pTablesHTML += "<td class='OperationCode' val='" + item.OperationCode + "'>" + item.OperationCode + "</td>"
                pTablesHTML += "<td class='ClientID'>" + item.ClientName + "</td>"
                pTablesHTML += "<td class='InvoiceNo' val='" + item.InvoiceNumber + "'>" + item.InvoiceNumber + "</td>"
                pTablesHTML += "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
                pTablesHTML += "<td class='InvoiceStatus'>" + item.InvoiceStatus + "</td>"
                pTablesHTML += "<td class='CurrencyCode' val='" + item.CurrencyCode + "'>" + item.CurrencyCode + "</td>"
                pTablesHTML += "<td class='InvoiceTypeID' val='" + item.InvoiceTypeID + "'>" + item.InvoiceTypeName + "</td>"
                pTablesHTML += "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                pTablesHTML += "<td class='InvoiceSentDate'>" + (GetDateFromServer(item.InvoiceSentDate) == '01/01/1900' ? "" : GetDateFromServer(item.InvoiceSentDate)) + "</td>"
                pTablesHTML += "<td class='BranchName' val='" + item.BranchName + "'>" + item.BranchName + "</td>"

                pTablesHTML += '</tr>';
            });
            pTablesHTML += '                             </tbody>';
            pTablesHTML += '                         </table>';
            $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
            if (pOutputTo == "Excel") {
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body id="" style="background-color:white;">';
                // ReportHTML += '<style> table>thead>th{font-size:11.0pt;color:white;font-weight:700;text-decoration:none;text-underline-style:none;text-line-through:none;font-family:Arial;border-top:none;border-left:.5pt style = "solid white;border-bottom:1.5pt solid white;border-right:.5pt solid white;background:#5B9BD5;} </style>';
                ReportHTML += '         <div id="Reportbody">';
                ReportHTML += pTablesHTML;
                ReportHTML += '         </div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                ReportHTML += '     </footer>';

                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                // $("#Reportbody").tblToExcel(pReportTitle);
                // $("#Reportbody").tblToExcel("Account Ledger");

                $("#Reportbody").table2excel({
                    exclude: ".excludeThisClass",
                    name: "Sheet 1",
                    filename: "الإقرار الضريبي للمبيعات" //do not include extension
                });

            }
            else {
                debugger;
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body id="" style="background-color:white;">';
                ReportHTML += '         <div id="Reportbody">';
                ReportHTML += pTablesHTML;
                ReportHTML += '         </div>';
                ReportHTML += '         </body>';
                ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                ReportHTML += '     </footer>';
                ReportHTML += '</html>';

                $("#hExportedTable").html(ReportHTML);

                if (pOutputTo == "PrintInReportBody")
                    $("#ReportBody").html(ReportHTML);
                else {
                    var mywindow = window.open('', '_blank');
                    mywindow.document.write(ReportHTML);
                    mywindow.document.close();
                }
            }

            FadePageCover(false);
        }, null);

}
