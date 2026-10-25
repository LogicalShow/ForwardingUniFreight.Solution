function cbCheckAllSuppliersChanged() {
    debugger;
    if ($("#cbCheckAllStores").prop("checked"))
        $("#divCbSuppliers input[name=nameCbSuppliers]").prop("checked", true);
    else
        $("#divCbSuppliers input[name=nameCbSuppliers]").prop("checked", false);
}
function cbCheckAllItemsChanged() {
    debugger;
    if ($("#cbCheckAllItems").prop("checked"))
        $("#divCbItems input[name=nameCbItems]").prop("checked", true);
    else
        $("#divCbItems input[name=nameCbItems]").prop("checked", false);
}

function PS_Reports_Print(pOutputTo) {
    debugger;
   // debugger; GetPrintedInvoicesTotalsData(DateTime From, DateTime To, string pSupplierIDs, string pReportNo);

    console.log('77777777')
    if ($('input[name=nameReportType]:checked').attr('id') == "7")
    {
        var pSupplierIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers");
        var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
        if (pSupplierIDList == "")
            swal("Sorry", "Please, select at least one Supplier");
        else {
            FadePageCover(true);
            var pParametersWithValues = {
                  From: ConvertDateFormat($("#txtFromDate").val())
                , To: ConvertDateFormat($("#txtToDate").val())
                , pSupplierIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : pSupplierIDList)
                , pItemIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
                , pReportNo: $('input[name=nameReportType]:checked').attr('id')
            };
            console.log($('input[name=nameReportType]:checked').attr('id'));
            CallGETFunctionWithParameters("/api/PS_Reports/GetInvoicesTotalsData", pParametersWithValues
                , function (pData) {
                    if ($('input[name=nameReportType]:checked').attr('id') == "7") {
                        PS_Reports_Print_InvoicesTotals(pData, pOutputTo);
                    }

                }
                , null);
        }
    }
    else {



        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("FromDate");
        arr_Keys.push("ToDate");
        arr_Keys.push("SupplierIDs");
        arr_Keys.push("ItemIDs");


        arr_Values.push(ConvertDateFormat( $('#txtFromDate').val()));
        arr_Values.push(ConvertDateFormat( $('#txtToDate').val()));
        arr_Values.push(($("#cbCheckAllStores").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSuppliers")) );
        arr_Values.push(($("#cbCheckAllItems").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems")));

        if ($("[id$='hf_ChangeLanguage']").val() == "en") {
            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id') 
                , pReportName: $('input[name=nameReportType]:checked').attr('id') 
            };
        }
        else {
            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id') + "_ar"
                , pReportName: $('input[name=nameReportType]:checked').attr('id')+"_ar"
            };
        }
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;



    }
}

function PS_Reports_Print_InvoicesTotals(pData, pOutputTo) {

    debugger;
    //var pSupplierIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);
    var NetTotal = 0.00;
    var DiscountTotal = 0.00;
    var TaxesTotal = 0.00;
    var Total = 0.00;
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
    }
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '     <head><title>' + 'Purchasing Invoices Follow-Up' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    }
    else {
        ReportHTML += '     <head><title>' + 'متابعة فواتير المشتريات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    }
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
    }
    else {
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
    }
    ReportHTML += '<div id="ReportBody">';
    ReportHTML += '<table id="tblItemsPurchasingFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
    ReportHTML += '<thead>';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<tr style="border:white"><td colspan="5"><h3>Purchasing Invoices Follow-Up</h3></td></tr>';
    }
    else {
        ReportHTML += '<tr style="border:white"><td colspan="5"><h3>متابعة فواتير المشتريات</h3></td></tr>';
    }
    ReportHTML += '<tr>';
    ReportHTML += '<th>' + TranslateString("SupplierName")+'</th>';
    ReportHTML += '<th>' + TranslateString("NET")+'</th>';
    ReportHTML += '<th>' + TranslateString("Taxes")+'</th>';
    ReportHTML += '<th>' + TranslateString("Discount")+'</th>';
    ReportHTML += '<th>' + TranslateString("TotalAmount") + '</th>';
    ReportHTML += '</tr>';
    ReportHTML += '</thead>';
    $(Data).each(function (i, item) {


        ReportHTML += '<tr><td>' + (item.SupplierName) + '</td>';
        ReportHTML += '<td>' + (item.TotalBeforTax) + '</td>';
        ReportHTML += '<td>' + (item.TaxesAmount) + '</td>';
        ReportHTML += '<td>' + (item.Discount) + '</td>';
        ReportHTML += '<td>' + (item.TotalPrice) + '</td></tr>';

        NetTotal += item.TotalBeforTax;
        TaxesTotal += item.TaxesAmount;
        DiscountTotal += item.Discount;
        Total += item.TotalPrice;


        if (i == Data.length - 1) {
            ReportHTML += '<tr>';
            ReportHTML += '<td><b>' + TranslateString("Total")+'</b></td>';
            ReportHTML += '<td><b>' + NetTotal + '</b></td>';
            ReportHTML += '<td><b>' + TaxesTotal + '</b></td>';
            ReportHTML += '<td><b>' + DiscountTotal + '</b></td>';
            ReportHTML += '<td><b>' + Total + '</b></td>';
            ReportHTML += '</tr>';



            ReportHTML += '</tbody></table>';
        }

    });
    ReportHTML += '</div></body></html>';
    ReportHTML += '</table></div></body></html>';
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
            filename: "ItemsPurchasingFollowUp_Total" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }

    FadePageCover(false);

}
function PS_Reports_Print_ServicesPurchasingFollowUp(pData, pOutputTo) {
    debugger;
    //var pSupplierIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var ArrData = JSON.parse(pData[2]);

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Services Purchasing FollowUp' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    $(ArrData).each(function (i, Data) {
        if(i > 0)
            ReportHTML += breakPage;
        
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        if(i == 0)
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblServicesPurchasingFollowUp'+i+'"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table>';


        if (i == ArrData.length - 1)
        {
            ReportHTML += '</div></body></html>';




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
                    filename: "Services Purchasing Follow-Up" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                    preserveColors: true // set to true if you want background colors and font colors preserved
                });

            }
        }


    });







    FadePageCover(false);
}



function PS_Reports_Print_StockBalanceSummary(pData, pOutputTo) {
    debugger;
    //var pSupplierIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Stock Balance Summary' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
    ReportHTML += '<div id="ReportBody">';
    ReportHTML += '<table id="tblStockBalanceSummary"  class="table table-striped text-sm table-bordered ">';
    ReportHTML += Data;
    ReportHTML += '</table></div></body></html>';
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
            filename: "Stock Balance Summary" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }






    FadePageCover(false);
}

function PS_Reports_Print_TransactionsDetails(pData, pOutputTo) {
    debugger;
    //var pSupplierIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers");
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
            ReportHTML += '<th>Supplier</th> ';
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
            ReportHTML += '<td>' + item.SupplierName + '</td> ';
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