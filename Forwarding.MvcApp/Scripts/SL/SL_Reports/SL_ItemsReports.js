function cbCheckAllCustomersChanged() {
    debugger;
    if ($("#cbCheckAllStores").prop("checked")) // divCbCustomers  // nameCbCustomers
        $("#divCbCustomers input[name=nameCbCustomers]").prop("checked", true); // divCbCustomers nameCbCustomers
    else
        $("#divCbCustomers input[name=nameCbCustomers]").prop("checked", false);
}
function cbCheckAllItemsChanged() {
    debugger;
    if ($("#cbCheckAllItems").prop("checked"))
        $("#divCbItems input[name=nameCbItems]").prop("checked", true);
    else
        $("#divCbItems input[name=nameCbItems]").prop("checked", false);
}

function SL_Reports_Print(pOutputTo) {

    if ($('input[name=nameReportType]:checked').attr('id') == "6") {

        debugger;
        var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
        var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
     //  if (pCustomerIDList == "")
     //      swal("Sorry", "Please, select at least one Client");
     //   else {
            FadePageCover(true);
            var pParametersWithValues = {
                pClientIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : pCustomerIDList) 
                , pItemIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
            , pReportNo: $('input[name=nameReportType]:checked').attr('id')
             , From: ConvertDateFormat($("#txtFromDate").val())
            , To : ConvertDateFormat($("#txtToDate").val())

            };
            console.log($('input[name=nameReportType]:checked').attr('id'));


        CallGETFunctionWithParameters("/api/SL_Reports/GetPrintedTotalItemsData", pParametersWithValues
                , function (pData) {
                    if ($('input[name=nameReportType]:checked').attr('id') == "6")
                    {
                        SL_Reports_Print_SalesItemsTotals(pData, pOutputTo);
                    }
                }
                , null);
       // }
    }
    else
    {

        debugger;
        var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
        var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
        if (pCustomerIDList == "" || pItemIDList == "" )
            swal("Sorry", "Please, select at least one Client and Items");
        else {
            FadePageCover(true);
            var pParametersWithValues = {
                pFromDate: ConvertDateFormat($("#txtFromDate").val())
                , pToDate: ConvertDateFormat($("#txtToDate").val())
                , pClientIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : pCustomerIDList) 
                , pItemIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
                , pReportNo: $('input[name=nameReportType]:checked').attr('id')

            };
            console.log($('input[name=nameReportType]:checked').attr('id'));


            CallGETFunctionWithParameters("/api/SL_Reports/GetPrintedData", pParametersWithValues
                , function (pData) {
                    if ($('input[name=nameReportType]:checked').attr('id') == "3") {
                        SL_Reports_Print_ItemsSalesFollowUp(pData, pOutputTo);
                    }
                    else if ($('input[name=nameReportType]:checked').attr('id') == "4") {
                        SL_Reports_Print_ItemsSalesFollowUpTotal(pData, pOutputTo);
                    }
                    else if ($('input[name=nameReportType]:checked').attr('id') == "5") {
                        SL_Reports_Print_InvoicesItemsSalesFollowUp(pData, pOutputTo);
                    }
                }
                , null);
        }

    }

}


function SL_Reports_Print_ItemsSalesFollowUp(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Items FollowUp' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblServicesSalesFollowUp"  class="table table-striped text-sm table-bordered ">';
        //ReportHTML += '<thead><tr>';
        //ReportHTML += '<th>Customer</th>';
        //ReportHTML += '<th>Quantityu</th>';
        //ReportHTML += '<th>Invoice No</th>';
        //ReportHTML += '<th>Inv.Date</th>';
        ReportHTML += '<tbody>';
        $(Data).each(function (i, item) {
            if (i == 0 || item.D_ItemName != Data[i - 1].D_ItemName) {
                if (i == 0) {
                    ReportHTML += '<tr style="border:white"><td colspan="4"><h3>Items Sales FollowUp</h3></td></tr>';

                }
                ReportHTML += '<tr><td colspan="1"><h4>' + item.D_ItemName + '</h4></td></tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>Customer</th>';
                ReportHTML += '<th>Unit</th>';
                ReportHTML += '<th>Unit Price</th>';
                ReportHTML += '<th>Quantity</th>';
                ReportHTML += '<th>Invoice No</th>';
                ReportHTML += '<th>Inv.Date</th>';
                ReportHTML += '</tr>';
            }

            ReportHTML += '<tr>';
            ReportHTML += '<td>' + item.CustomerName + '</td>';
            ReportHTML += '<td>' + item.D_UnitName + '</td>';
            ReportHTML += '<td>' + item.D_Price + '</td>';
            ReportHTML += '<td>' + item.D_Quantity + '</td>';
            ReportHTML += '<td>' + item.InvoiceNo + '</td>';
            ReportHTML += '<td>' + GetDateFromServer(item.InvoiceDate) + '</td>';
            ReportHTML += '</tr>';

            if (i == Data.length - 1) {
                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
    } else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'متابعة أصناف المبيعات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        //ReportHTML += '             <div class="col-xs-6 "></div>';
        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblServicesSalesFollowUp"  class="table table-striped text-sm table-bordered ">';
        //ReportHTML += '<thead><tr>';
        //ReportHTML += '<th>Customer</th>';
        //ReportHTML += '<th>Quantityu</th>';
        //ReportHTML += '<th>Invoice No</th>';
        //ReportHTML += '<th>Inv.Date</th>';
        ReportHTML += '<tbody>';
        $(Data).each(function (i, item) {
            if (i == 0 || item.D_ItemName != Data[i - 1].D_ItemName) {
                if (i == 0) {
                    ReportHTML += '<tr style="border:white"><td colspan="4"><h3>Items Sales FollowUp</h3></td></tr>';

                }
                ReportHTML += '<tr><td colspan="1"><h4>' + item.D_ItemName + '</h4></td></tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>العميل</th>';
                ReportHTML += '<th>الوحدة</th>';
                ReportHTML += '<th>سعر الوحدة</th>';
                ReportHTML += '<th>الكمية</th>';
                ReportHTML += '<th>رقم الفاتورة</th>';
                ReportHTML += '<th>تاريخ الفاتورة</th>';
                ReportHTML += '</tr>';
            }

            ReportHTML += '<tr>';
            ReportHTML += '<td>' + item.CustomerName + '</td>';
            ReportHTML += '<td>' + item.D_UnitName + '</td>';
            ReportHTML += '<td>' + item.D_Price + '</td>';
            ReportHTML += '<td>' + item.D_Quantity + '</td>';
            ReportHTML += '<td>' + item.InvoiceNo + '</td>';
            ReportHTML += '<td>' + GetDateFromServer(item.InvoiceDate) + '</td>';
            ReportHTML += '</tr>';

            if (i == Data.length - 1) {
                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
    }
            if (pOutputTo != "Excel") {
                var mywindow = window.open('', '_blank');
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }
            else {
                $("#hExportedTable").html(ReportHTML);
                var $table = $('#ReportBody');
                $table.table2excel({
                    exclude: ".noExl",
                    name: "sheet",
                    filename: "Items Sales Follow-Up" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                    preserveColors: true // set to true if you want background colors and font colors preserved
                });

            }
        


   







    FadePageCover(false);
}
function SL_Reports_Print_SalesItemsTotals(pData, pOutputTo) {

    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);
    var Total = 0.00;
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Items (Totals)' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += '<thead>';
        ReportHTML += '<tr style="border:white"><td colspan="4"><h3>&nbsp;Sales Items (Totals) &nbsp;</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>Item</th>';
        ReportHTML += '<th>Qty</th>';
        ReportHTML += '<th>Average Price</th>';
        ReportHTML += '<th>Total Amount</th>';
        ReportHTML += '</tr>';
        ReportHTML += '</thead>';
        $(Data).each(function (i, item) {
            ReportHTML += '<tr><td>' + (item.D_ItemName) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.D_AveragePrice) + '</td>';
            ReportHTML += '<td>' + (item.D_Total) + '</td></tr>';


            Total += item.D_Total;


            if (i == Data.length - 1) {
                ReportHTML += '<tr>';
                ReportHTML += '<td colspan="3"></td>';
                ReportHTML += '<td><b>Total Amount : ' + Total + ' </b></td>';
                ReportHTML += '</tr>';



                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
        ReportHTML += '</table></div></body></html>';
    }
    else {
        ReportHTML += '<html dir = "rtl">';
        ReportHTML += '     <head><title>' + 'إجمالي أصناف المبيعات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        //ReportHTML += '             <div class="col-xs-6 "></div>';
        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += '<thead>';
        ReportHTML += '<tr style="border:white"><td colspan="4"><h3>&nbsp;إجمالي أصناف المبيعات &nbsp;</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>الصنف</th>';
        ReportHTML += '<th>الكمية</th>';
        ReportHTML += '<th>متوسط السعر</th>';
        ReportHTML += '<th>إجمالي المبلغ</th>';
        ReportHTML += '</tr>';
        ReportHTML += '</thead>';
        $(Data).each(function (i, item) {
            ReportHTML += '<tr><td>' + (item.D_ItemName) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.D_AveragePrice) + '</td>';
            ReportHTML += '<td>' + (item.D_Total) + '</td></tr>';


            Total += item.D_Total;


            if (i == Data.length - 1) {
                ReportHTML += '<tr>';
                ReportHTML += '<td colspan="3"></td>';
                ReportHTML += '<td><b>إجمالي المبلغ : ' + Total + ' </b></td>';
                ReportHTML += '</tr>';



                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
        ReportHTML += '</table></div></body></html>';
    }
    $("#hExportedTable").html(ReportHTML);



    console.log(ReportHTML);
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "ItemsSalesFollowUp_Total" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }
    
    FadePageCover(false);

}



function SL_Reports_Print_InvoicesItemsSalesFollowUp(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Invoices Follow-Up (Items)' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblInvoicesItemsSalesFollowUp"  class="table table-striped text-sm table-bordered ">';

        ReportHTML += '<tbody>';
        var counter = 1;
        $(Data).each(function (i, item) {
            if (i == 0 || item.InvoiceNo != Data[i - 1].InvoiceNo) {
                if (i == 0) {
                    ReportHTML += '<tr style="border:white"><td colspan="9"><h3>Sales Invoices Follow-Up (Items)</h3></td></tr>';

                }
                counter = 1;
                ReportHTML += '<tr><td style="border-width:2px!important;" colspan="1"><h4><b>Inv.No : ' + item.InvoiceNo + '</b></h4></td></tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>Customer</th>';
                ReportHTML += '<th>Inv.Date</th>';
                ReportHTML += '<th>Total Items</th>';
                ReportHTML += '<th>Total Services</th>';
                ReportHTML += '<th>Total Expenses</th>';
                ReportHTML += '<th>Total Taxes</th>';
                ReportHTML += '<th>Total Discount</th>';
                ReportHTML += '<th>Total Gross</th>';
                ReportHTML += '<th>Currency</th>';
                ReportHTML += '</tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<td>' + (item.CustomerName) + '</td>';
                ReportHTML += '<td>' + GetDateFromServer((item.InvoiceDate)) + '</td>';
                ReportHTML += '<td>' + (item.ItemsAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.ServicesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.ExpensesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.TaxesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.Discount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.TotalPrice * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.CurrencyCode) + '</td>';
                ReportHTML += '</tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>Details No</th>';
                ReportHTML += '<th>Item Name</th>';
                ReportHTML += '<th>Unit Price</th>';
                ReportHTML += '<th>Quantity</th>';
                ReportHTML += '<th>Exchange Rate</th>';
                ReportHTML += '<th>Total</th>';
                ReportHTML += '<th colspan="3"></th>';
                ReportHTML += '</tr>';
            }
            ReportHTML += '<tr><td>[ ' + counter + ' ]</td>';
            ReportHTML += '<td>' + (item.D_ItemName) + '</td>';
            ReportHTML += '<td>' + (item.D_Price * item.ExchangeRate) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.ExchangeRate) + '</td>';
            ReportHTML += '<td>' + (item.D_Total * item.ExchangeRate) + '</td>';
            ReportHTML += '<td colspan="3"></td></tr>';

            counter++;
            if (i == Data.length - 1) {
                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
    }
    else {
        ReportHTML += '<html dir = "rtl">';
        ReportHTML += '     <head><title>' + 'متابعة أصناف فواتير المبيعات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        //ReportHTML += '             <div class="col-xs-6 "></div>';
        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblInvoicesItemsSalesFollowUp"  class="table table-striped text-sm table-bordered ">';

        ReportHTML += '<tbody>';
        var counter = 1;
        $(Data).each(function (i, item) {
            if (i == 0 || item.InvoiceNo != Data[i - 1].InvoiceNo) {
                if (i == 0) {
                    ReportHTML += '<tr style="border:white"><td colspan="9"><h3>متابعة أصناف فواتير المبيعات</h3></td></tr>';

                }
                counter = 1;
                ReportHTML += '<tr><td style="border-width:2px!important;" colspan="1"><h4><b>رقم الفاتورة : ' + item.InvoiceNo + '</b></h4></td></tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>العميل</th>';
                ReportHTML += '<th>تاريخ الفاتورة</th>';
                ReportHTML += '<th>إجمالي الأصناف</th>';
                ReportHTML += '<th>إجمالي الخدمات</th>';
                ReportHTML += '<th>إجمالي المصروفات</th>';
                ReportHTML += '<th>إجمالي الضرائب</th>';
                ReportHTML += '<th>إجمالي الخصم</th>';
                ReportHTML += '<th>المجموع الكلي</th>';
                ReportHTML += '<th>العملة</th>';
                ReportHTML += '</tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<td>' + (item.CustomerName) + '</td>';
                ReportHTML += '<td>' + GetDateFromServer((item.InvoiceDate)) + '</td>';
                ReportHTML += '<td>' + (item.ItemsAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.ServicesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.ExpensesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.TaxesAmount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.Discount * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.TotalPrice * item.ExchangeRate) + '</td>';
                ReportHTML += '<td>' + (item.CurrencyCode) + '</td>';
                ReportHTML += '</tr>';
                ReportHTML += '<tr>';
                ReportHTML += '<th>رقم التفاصيل</th>';
                ReportHTML += '<th>إسم الصنف</th>';
                ReportHTML += '<th>سعر الوحدة</th>';
                ReportHTML += '<th>الكمية</th>';
                ReportHTML += '<th>معدل التغير</th>';
                ReportHTML += '<th>الإجمالي</th>';
                ReportHTML += '<th colspan="3"></th>';
                ReportHTML += '</tr>';
            }
            ReportHTML += '<tr><td>[ ' + counter + ' ]</td>';
            ReportHTML += '<td>' + (item.D_ItemName) + '</td>';
            ReportHTML += '<td>' + (item.D_Price * item.ExchangeRate) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.ExchangeRate) + '</td>';
            ReportHTML += '<td>' + (item.D_Total * item.ExchangeRate) + '</td>';
            ReportHTML += '<td colspan="3"></td></tr>';

            counter++;
            if (i == Data.length - 1) {
                ReportHTML += '</tbody></table>';
            }

        });
        ReportHTML += '</div></body></html>';
    }

    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "Invoices Items Sales Follow-Up" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }
    
    FadePageCover(false);
}

function SL_Reports_Print_ItemsSalesFollowUpTotal(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Items FollowUp (Total)' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table></div></body></html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'متابعة أصناف المبيعات (الإجمالي)' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        //ReportHTML += '             <div class="col-xs-6 "></div>';
        //ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table></div></body></html>';
    }

    $("#hExportedTable").html(ReportHTML);



    console.log(ReportHTML);
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "ItemsSalesFollowUp_Total" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }






    FadePageCover(false);
}

function SL_Reports_Print_TransactionsDetails(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");

    var counter = 0;
    var Balance = 0.0;
    var Quantity = 0.0;
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[1]);

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Transaction Details' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
    ReportHTML += '<div id="ReportBody">'
    $(Data).each(function (i, item) {
        if ((item.TransactionType).trim() == '-') {
            if (i != 0) {
                ReportHTML += '</tbody></table>';
                ReportHTML += breakPage;
            }
            ReportHTML += '<br><h1 class="text-center">' + 'Transactions Details' + '</h1>';
            ReportHTML += '<h2 class="text-center">' + item.StoreName + '</h2>';
            ReportHTML += '<h4 class="float-left">' + "Item Name : " + '....' + item.ItemName + '....' + "&nbsp;&nbsp;&nbsp;Item Code : " + '....' + item.ItemCode + '....' + '</h4>';
            ReportHTML += '<table id="tblPriceDetails_" ' + counter + '0  class="table table-striped text-sm table-bordered ">';
            ReportHTML += '<thead>';

            ReportHTML += '<tr>';
            ReportHTML += '<th colspan="9">Opening Balance : ' + item.TotalQuantity + '</th> ';
            ReportHTML += '</tr> ';
            ReportHTML += '<th>Transaction Type</th> ';
            ReportHTML += '<th>Date</th> ';
            ReportHTML += '<th>Trans.NO</th> ';
            ReportHTML += '<th>Invoice.NO</th> ';
            ReportHTML += '<th>Customer</th> ';
            ReportHTML += '<th>User</th> ';
            ReportHTML += '<th>In</th> ';
            ReportHTML += '<th>Out</th> ';
            ReportHTML += '<th>Balance</th> ';
            ReportHTML += '</tr> ';
            ReportHTML += '</thead>';
            ReportHTML += '<tbody>';
            // Balance = item.TotalPrice;
            Quantity = item.TotalQuantity;
            counter++;
        }
        else {
            // Balance = Balance + item.TotalPrice;
            Quantity = Quantity + item.TotalQuantity;
            ReportHTML += '<tr>';
            ReportHTML += '<td>' + item.TransactionType + '</td> ';
            ReportHTML += '<td>' + GetDateFromServer(item.TransactionDate) + '</td> ';
            ReportHTML += '<td>' + item.TransactionCode + '</td> ';
            ReportHTML += '<td>' + item.InvoiceNumber + '</td> ';
            ReportHTML += '<td>' + item.CustomerName + '</td> ';
            ReportHTML += '<td>' + item.Username + '</td> ';
            ReportHTML += '<td>' + item.QtyImport + '</td> ';
            ReportHTML += '<td>' + item.QtyExport + '</td> ';
            ReportHTML += '<td>' + Quantity + '</td> ';
            ReportHTML += '</tr>';
        }



        if (Data.length == (i + 1)) {
            ReportHTML += '</tbody></table>';
            ReportHTML += '</div>'
        }

    });

    console.log(ReportHTML);
    if (pOutputTo != "Excel") {
        var mywindow = window.open('', '_blank');
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
    else {
        $("#hExportedTable").html(ReportHTML);
        var $table = $('#ReportBody');
        $table.table2excel({
            exclude: ".noExl",
            name: "sheet",
            filename: "Transactions Details" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }






    FadePageCover(false);
}