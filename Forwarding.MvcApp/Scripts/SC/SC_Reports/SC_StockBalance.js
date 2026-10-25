$(document).ready(function () {
    //$("#slAccount").css({ "width": "100%" }).select2();
    //$("#slSubAccount").css({ "width": "100%" }).select2();
    $("#sClient").css({ "width": "100%" }).select2();
    $("#sSupplier").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});

function cbCheckAllStoresChanged() {
    debugger;
    if ($("#cbCheckAllStores").prop("checked"))
        $("#divCbStores input[name=nameCbStores]").prop("checked", true);
    else
        $("#divCbStores input[name=nameCbStores]").prop("checked", false);
}
function cbCheckAllItemsChanged() {
    debugger;
    if ($("#cbCheckAllItems").prop("checked"))
        $("#divCbItems input[name=nameCbItems]").prop("checked", true);
    else
        $("#divCbItems input[name=nameCbItems]").prop("checked", false);
}

function SC_Reports_Print(pOutputTo) {
    if ($('input[name=nameReportType]:checked').attr('id') == "6") {
        PrintItemCard_FastReport("ItemCard_StockItem_Balance");
    }

    else if ($('input[name=nameReportType]:checked').attr('id') == "7") {
        PrintItemCard_FastReport("ItemCard_StockItem_BalanceDetails");
    }


    else {
        debugger;
        var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores");
        var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
        // console.log(pStoreIDList);
        if (pStoreIDList == "" || pItemIDList == "")
            swal("Sorry", "Please, select at least one Store and one Item.");
        else {
            FadePageCover(true);
            var pParametersWithValues = {
                pLanguage: $("#hf_ChangeLanguage").val()
                , pStoresIDs: pStoreIDList
                , pItemsIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
                , pFromDate: ConvertDateFormat($("#txtFromDate").val())
                , pToDate: ConvertDateFormat($("#txtToDate").val())
                , pReportNo: $('input[name=nameReportType]:checked').attr('id')
                , pClientID: ($("#sClient").val() == "0" || $("#sClient").val() == "") ? "0" : $("#sClient").val()
                , PsupplierID: ($("#sSupplier").val() == "0" || $("#sSupplier").val() == "") ? "0" : $("#sSupplier").val() 
            };
            console.log($('input[name=nameReportType]:checked').attr('id'));
            CallGETFunctionWithParameters("/api/SC_Reports/GetPrintedData", pParametersWithValues
                , function (pData) {
                    if ($('input[name=nameReportType]:checked').attr('id') == "3") {
                        SC_Reports_Print_StockTotalBalance(pData, pOutputTo);
                    }
                    else if ($('input[name=nameReportType]:checked').attr('id') == "4") {
                        SC_Reports_Print_StockBalanceSummary(pData, pOutputTo);
                    }
                }
                , null);
        }
    }
}


function SC_Reports_Print_StockTotalBalance(pData, pOutputTo) {
    debugger;
    //var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Stock Total Balance' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-3"><b>' + 'From : ' + '</b>' + $("#txtFromDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-3"><b>' + 'To : ' + '</b>' + $("#txtToDate").val() + '</div>'
        ReportHTML += '             <div class="col-xs-6 text-right"><b>' + 'Printed at :  ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblStockTotalBalance"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table></div></body></html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'إجمالي أرصدة المخازن' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        //ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblStockTotalBalance"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table></div></body></html>';
    }
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
            filename: "Stock Total Balance" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }






    FadePageCover(false);
}



function SC_Reports_Print_StockBalanceSummary(pData, pOutputTo) {
    debugger;
    //var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data = JSON.parse(pData[2]);

    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Stock Balance Summary' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblStockBalanceSummary"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += Data;
        ReportHTML += '</table></div></body></html>';
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'ملخص أرصدة المخازن' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 " >';
        ReportHTML += '             <div class="col-xs-6 text-left"><b>' + 'تمت الطباعة:   ' + '</b>' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'إلي:  ' + '</b>' + $("#txtToDate").val() + '</div>';
        ReportHTML += '             <div class="col-xs-3 "><b>' + 'من:  ' + '</b>' + $("#txtFromDate").val() + '</div>';
        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblStockBalanceSummary"  class="table table-striped text-sm table-bordered ">';
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
            filename: "Stock Balance Summary" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
            preserveColors: true // set to true if you want background colors and font colors preserved
        });

    }






    FadePageCover(false);
}

function SC_Reports_Print_TransactionsDetails(pData, pOutputTo) {
    debugger;
    //var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores");
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
function PrintItemCard_FastReport(ReportName) {
    var arr_Keys = new Array();
    var arr_Values = new Array();
    //-----------------------------------------------------------------
    // ---- PARAMETERS KEYS ------------------------------------------------
    //-----------------------------------------------------------------

    arr_Keys.push("FromDate");
    arr_Values.push(ConvertDateFormat($('#txtFromDate').val()));

    arr_Keys.push("ToDate");
    arr_Values.push(ConvertDateFormat($('#txtToDate').val()));


    arr_Keys.push("PartnerSupAccountIDs");
    //arr_Values.push(($("#cbCheckAllCustomers").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers") + "*"));
    arr_Values.push("-1");

    arr_Keys.push("StoreIDs");
    arr_Values.push(($("#cbCheckAllStores").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbStores") + "*"));

    arr_Keys.push("TransactionTypesIDs");
    //arr_Values.push(($("#cbCheckAllTypes").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbTypes") + "*"));
    arr_Values.push("-1");

    arr_Keys.push("ItemIDs");
    arr_Values.push(($("#cbCheckAllItems").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems") + "*"));

    //($("#cbCheckAllItems").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems") + "*"))

    //@SupAccountsIDs nvarchar(max) , @BranchesIDs nvarchar(max) , @TypeID int ,  @FromDate varchar(50) ,  @ToDate varchar(50)  
    //-----------------------------------------------------------------
    // ---- Parameters With Values ------------------------------------------------
    //-----------------------------------------------------------------

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName + "_" + $('#txtToDate').val()
        , pReportName: ReportName
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}