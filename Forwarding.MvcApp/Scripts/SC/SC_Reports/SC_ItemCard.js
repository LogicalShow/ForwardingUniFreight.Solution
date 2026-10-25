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

    PrintItemCard_FastReport(($('input[name=nameReportType]:checked').attr('id') == "1" ? "ItemCard" : "ItemCardPriceDetails"));

    // debugger;
    // var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores"); 
    // var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    //// console.log(pStoreIDList);
    // if (pStoreIDList == "" || pItemIDList == "")
    //     swal("Sorry", "Please, select at least one Store and one Item.");
    // else {
    //     FadePageCover(true);
    //     var pParametersWithValues = {
    //          pLanguage : "en"
    //         ,pStoresIDs: pStoreIDList
    //         , pItemsIDs: ( $("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList )
    //         , pFromDate: ConvertDateFormat($("#txtFromDate").val())
    //         , pToDate: ConvertDateFormat( $("#txtToDate").val() )
    //         , pReportNo: $('input[name=nameReportType]:checked').attr('id')

    //     };
    //     console.log($('input[name=nameReportType]:checked').attr('id'));
    //     CallGETFunctionWithParameters("/api/SC_Reports/GetPrintedData", pParametersWithValues
    //         , function (pData) {
    //             if ($('input[name=nameReportType]:checked').attr('id') == "1") {
    //                 SC_Reports_Print_TransactionsDetails(pData, pOutputTo);
    //             }
    //             else if ($('input[name=nameReportType]:checked').attr('id') == "2") {
    //                     SC_Reports_Print_PriceDetails(pData, pOutputTo);
    //             }
    //         }
    //         , null);
    // }
}


function SC_Reports_Print_PriceDetails(pData, pOutputTo) {
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
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Price Details' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-3 swapChildrenClass"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">'
        $(Data).each(function (i, item) {
            if ((item.TransactionType).trim() == '-') {
                if (i != 0) {
                    ReportHTML += '</tbody></table>';
                    ReportHTML += breakPage;
                }
                ReportHTML += '<br><h1 class="text-center">' + 'Item Card' + '</h1>';
                ReportHTML += '<h2 class="text-center">' + item.StoreName + '</h2>';
                ReportHTML += '<h4 class="float-left">' + "Item Name : " + '....' + item.ItemName + '....' + "&nbsp;&nbsp;&nbsp;Item Code : " + '....' + item.ItemCode + '....' + '</h4>';
                ReportHTML += '<table id="tblPriceDetails_" ' + counter + '0  class="table table-striped text-sm table-bordered ">';
                ReportHTML += '<thead>';

                ReportHTML += '<tr>';
                ReportHTML += '<th colspan="5">Opening Balance Quantity : ' + item.TotalQuantity + '</th> ';
                ReportHTML += '<th colspan="5">Opening Balance Price : ' + item.TotalPrice + '</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '<tr>';
                ReportHTML += '<th rowspan = "2" > Transaction Type (NO)</th>';
                ReportHTML += '<th rowspan = "2" > Date</th>';
                ReportHTML += '<th rowspan="2" >Invoice/Transaction No</th>';
                ReportHTML += '<th rowspan="2" >Partner</th> ';
                ReportHTML += '<th colspan="2">In</th> ';
                ReportHTML += '<th rowspan="2" >Average Price</th> ';
                ReportHTML += '<th colspan="2">Out</th> ';
                ReportHTML += '<th colspan="2">Balance</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '<tr>';
                ReportHTML += '<th>Qty</th> ';
                ReportHTML += '<th>Price</th> ';
                ReportHTML += '<th>Qty</th> ';
                ReportHTML += '<th>Price</th> ';
                ReportHTML += '<th>Qty</th> ';
                ReportHTML += '<th>Price</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '</thead>';
                ReportHTML += '<tbody>';
                Balance = item.TotalPrice;
                Quantity = item.TotalQuantity;
                counter++;
            }
            else {
                Balance = Balance + item.TotalPrice;
                Quantity = Quantity + item.TotalQuantity;
                ReportHTML += '<tr>';
                ReportHTML += '<td>' + item.TransactionType + ' [ ' + item.TransactionCode + ' ] ' + '</td> ';
                ReportHTML += '<td>' + GetDateFromServer(item.TransactionDate) + '</td> ';
                ReportHTML += '<td>' + item.InvoiceNumber + '</td> ';
                ReportHTML += '<td>' + item.CustomerName + '</td> ';
                ReportHTML += '<td>' + item.QtyImport + '</td> ';
                ReportHTML += '<td>' + item.PriceImport + '</td> ';
                ReportHTML += '<td>' + item.AveragePrice + '</td> ';
                ReportHTML += '<td>' + item.QtyExport + '</td> ';
                ReportHTML += '<td>' + item.PriceExport + '</td> ';
                ReportHTML += '<td>' + Quantity + '</td> ';
                ReportHTML += '<td>' + Balance + '</td> ';
                ReportHTML += '</tr>';
            }



            if (Data.length == (i + 1)) {
                ReportHTML += '</tbody></table>';
                ReportHTML += '</div>'
            }

        })
    }
    else {
        ReportHTML += '<html  dir="rtl">';
        ReportHTML += '     <head><title>' + 'تفاصيل السعر' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';

        ReportHTML += '             <div dir="rtl" class="col-xs-12 swapChildrenClass">';
        ReportHTML += '             <div class="col-xs-6 "></div>';
        ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';

        ReportHTML += '             </div>';

        ReportHTML += '<div id="ReportBody">'
        $(Data).each(function (i, item) {
            if ((item.TransactionType).trim() == '-') {
                if (i != 0) {
                    ReportHTML += '</tbody></table>';
                    ReportHTML += breakPage;
                }
                ReportHTML += '<br><h1 class="text-center">' + 'كارت الصنف' + '</h1>';
                ReportHTML += '<h2 class="text-center">' + item.StoreName + '</h2>';
                ReportHTML += '             <div class="col-xs-12 swapChildrenClass">';
                ReportHTML += '<h4  class="float-left">' + "إسم الصنف : " + '....' + item.ItemName + '....' + "&nbsp;&nbsp;&nbsp;كود الصنف : " + '....' + item.ItemCode + '....' + '</h4>';
                ReportHTML += '             </div>';
                ReportHTML += '<table id="tblPriceDetails_" ' + counter + '0  class="table table-striped text-sm table-bordered swapChildrenClass">';
                ReportHTML += '<thead  class="swapChildrenClass">';

                ReportHTML += '<tr>';
                ReportHTML += '<th colspan="5">الرصيد الإفتتاحي - الكمية : ' + item.TotalQuantity + '</th> ';
                ReportHTML += '<th colspan="5">الرصيد الإفتتاحي - السعر : ' + item.TotalPrice + '</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '<tr>';
                ReportHTML += '<th rowspan = "2" > نوع الحركة (الرقم)</th>';
                ReportHTML += '<th rowspan = "2" > التاريخ</th>';
                ReportHTML += '<th rowspan="2" >فاتورة / عملية</th>';
                ReportHTML += '<th rowspan="2" >عميل / مورد / فرع</th> ';
                ReportHTML += '<th colspan="2">وارد</th> ';
                ReportHTML += '<th rowspan="2" >متوسط السعر</th> ';
                ReportHTML += '<th colspan="2">صادر</th> ';
                ReportHTML += '<th colspan="2">الرصيد</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '<tr>';
                ReportHTML += '<th>الكمية</th> ';
                ReportHTML += '<th>السعر</th> ';
                ReportHTML += '<th>الكمية</th> ';
                ReportHTML += '<th>السعر</th> ';
                ReportHTML += '<th>الكمية</th> ';
                ReportHTML += '<th>السعر</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '</thead>';
                ReportHTML += '<tbody class="swapChildrenClass">';
                Balance = item.TotalPrice;
                Quantity = item.TotalQuantity;
                counter++;
            }
            else {
                Balance = Balance + item.TotalPrice;
                Quantity = Quantity + item.TotalQuantity;
                ReportHTML += '<tr>';
                ReportHTML += '<td>' + item.TransactionType + ' [ ' + item.TransactionCode + ' ] ' + '</td> ';
                ReportHTML += '<td>' + GetDateFromServer(item.TransactionDate) + '</td> ';
                ReportHTML += '<td>' + item.InvoiceNumber + '</td> ';
                ReportHTML += '<td>' + item.CustomerName + '</td> ';
                ReportHTML += '<td>' + item.QtyImport + '</td> ';
                ReportHTML += '<td>' + item.PriceImport + '</td> ';
                ReportHTML += '<td>' + item.AveragePrice + '</td> ';
                ReportHTML += '<td>' + item.QtyExport + '</td> ';
                ReportHTML += '<td>' + item.PriceExport + '</td> ';
                ReportHTML += '<td>' + Quantity + '</td> ';
                ReportHTML += '<td>' + Balance + '</td> ';
                ReportHTML += '</tr>';
            }



            if (Data.length == (i + 1)) {
                ReportHTML += '</tbody></table>';
                ReportHTML += '</div>'
            }

        });


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
            filename: "Price Details" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
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
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
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
                ReportHTML += '<th>Partner</th> ';
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

        })
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'تفاصيل الحركات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div dir="rtl" class="col-xs-12 swapChildrenClass">';
        ReportHTML += '             <div class="col-xs-6 "></div>';
        ReportHTML += '             <div  class="col-xs-6 swapChildrenClass"> <b>تمت الطباعة:  </b>' + pFormattedTodaysDate + '  ' + pFormattedPrintTime + '  <br> ' + '<b>من تاريخ : </b>   ' + $('#txtFromDate').val() + ' ' + '<b>إلي تاريخ :</b>' + $('#txtToDate').val() + '  </div>';

        ReportHTML += '             </div>';
        ReportHTML += '<div id="ReportBody">'
        $(Data).each(function (i, item) {
            if ((item.TransactionType).trim() == '-') {
                if (i != 0) {
                    ReportHTML += '</tbody></table>';
                    ReportHTML += breakPage;
                }
                ReportHTML += '<br><h1 class="text-center">' + 'تفاصيل الحركات' + '</h1>';
                ReportHTML += '<h2 class="text-center">' + item.StoreName + '</h2>';
                ReportHTML += '<h4  class="float-left">' + "إسم الصنف : " + '....' + item.ItemName + '....' + "&nbsp;&nbsp;&nbsp;كود الصنف : " + '....' + item.ItemCode + '....' + '</h4>';
                ReportHTML += '<table id="tblPriceDetails_" ' + counter + '0  class="table table-striped text-sm table-bordered ">';
                ReportHTML += '<thead>';

                ReportHTML += '<tr>';
                ReportHTML += '<th colspan="9">الرصيد الإفتتاحي : ' + item.TotalQuantity + '</th> ';
                ReportHTML += '</tr> ';
                ReportHTML += '<th>نوع الحركة</th> ';
                ReportHTML += '<th>التاريخ</th> ';
                ReportHTML += '<th>رقم الحركة</th> ';
                ReportHTML += '<th>رقم الفاتورة / العملية</th> ';
                ReportHTML += '<th>عميل / مورد / فرع</th> ';
                ReportHTML += '<th>المستخدم</th> ';
                ReportHTML += '<th>وارد</th> ';
                ReportHTML += '<th>صادر</th> ';
                ReportHTML += '<th>الرصيد</th> ';
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

        })
    }
    ;

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

    arr_Keys.push("PartnerSupAccountIDs");
    //arr_Values.push(($("#cbCheckAllCustomers").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers") + "*"));
    arr_Values.push("-1");

    arr_Keys.push("ClientID");
    //arr_Values.push(($("#cbCheckAllCustomers").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers") + "*"));
    arr_Values.push(($("#sClient").val() == "0" || $("#sClient").val() == "") ? "0" : $("#sClient").val());

    arr_Keys.push("SupplierID");
    //arr_Values.push(($("#cbCheckAllCustomers").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers") + "*"));
    arr_Values.push(($("#sSupplier").val() == "0" || $("#sSupplier").val() == "") ? "0" : $("#sSupplier").val());

    //($("#cbCheckAllItems").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems") + "*"))

    //@SupAccountsIDs nvarchar(max) , @BranchesIDs nvarchar(max) , @TypeID int ,  @FromDate varchar(50) ,  @ToDate varchar(50)  
    //-----------------------------------------------------------------
    // ---- Parameters With Values ------------------------------------------------
    //-----------------------------------------------------------------

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: ReportName
        , pReportName: ReportName
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}