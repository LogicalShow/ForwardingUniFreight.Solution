function cbCheckAllBranchesChanged() {
    debugger;
    if ($("#cbCheckAllBranches").prop("checked"))
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", true);
    else
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", false);
}
function cbCheckAllDepartmentsChanged() {
    debugger;
    if ($("#cbCheckAllDepartments").prop("checked"))
        $("#divCbDepartments input[name=nameCbDepartments]").prop("checked", true);
    else
        $("#divCbDepartments input[name=nameCbDepartments]").prop("checked", false);
}
function cbCheckAllDevisionsChanged() {
    debugger;
    if ($("#cbCheckAllDevisions").prop("checked"))
        $("#divCbDevisions input[name=nameCbDevisions]").prop("checked", true);
    else
        $("#divCbDevisions input[name=nameCbDevisions]").prop("checked", false);
}
function cbCheckAllGroupsChanged() {
    debugger;
    if ($("#cbCheckAllGroups").prop("checked"))
        $("#divCbGroups input[name=nameCbGroups]").prop("checked", true);
    else
        $("#divCbGroups input[name=nameCbGroups]").prop("checked", false);
}
function ShowHideSections() {

    if ($('input[name=nameReportType]:checked').attr('id') == 'FA_AllAssetsWithoutDateFilter_AR') {
        //$('#secBranches').removeClass('hide')
        //$('#secDevisions').addClass('hide')
        //$('#secDepartments').addClass('hide')
        //$('#secGroups').removeClass('hide')

        $('.DateSection').addClass('hide');

    }

    else {
        //$('#secBranches').removeClass('hide')
        //$('#secDevisions').removeClass('hide')
        //$('#secDepartments').removeClass('hide')
        //$('#secGroups').removeClass('hide')
        $('.DateSection').removeClass('hide');

    }
}
function Print(pOutputTo) {
    if ($('input[name=nameReportType]:checked').attr('id') == "FA_AllAssetsWithoutDateFilter_AR")
    {
        if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbBranches").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectBranches"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectDepartments"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDevisions").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectDivisions"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbGroups").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectGroups"), "warning");
        else
        {

            var arr_Keys = new Array();
            var arr_Values = new Array();

            arr_Keys.push("BranchIDs");
            arr_Keys.push("DepartmentIDs");
            arr_Keys.push("DevisionIDs");
            arr_Keys.push("GroupIDs");
           // arr_Keys.push("FromDate");
          //  arr_Keys.push("ToDate");

            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbBranches"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDevisions"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbGroups"));
            //arr_Values.push(ConvertDateFormat($('#txtFromDate').val()));
            //arr_Values.push(ConvertDateFormat($('#txtToDate').val()));



            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id')
                , pReportName: $('input[name=nameReportType]:checked').attr('id')
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
    }
    else
    {
        if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbBranches").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectBranches"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectDepartments"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDevisions").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectDivisions"), "warning");
        else if (GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbGroups").length <= 0)
            swal(TranslateString("Sorry"), TranslateString("YouMustSelectGroups"), "warning");
        else {

            var arr_Keys = new Array();
            var arr_Values = new Array();

            arr_Keys.push("BranchIDs");
            arr_Keys.push("DepartmentIDs");
            arr_Keys.push("DevisionIDs");
            arr_Keys.push("GroupIDs");
            arr_Keys.push("FromDate");
            arr_Keys.push("ToDate");

            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbBranches"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDevisions"));
            arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbGroups"));
            arr_Values.push(ConvertDateFormat($('#txtFromDate').val()));
            arr_Values.push(ConvertDateFormat($('#txtToDate').val()));



            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id')
                , pReportName: $('input[name=nameReportType]:checked').attr('id')
            };
            var win = window.open("", "_blank");
            var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

            win.location = url;
        }
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
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Purchasing Invoices Follow-Up' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
    ReportHTML += '<div id="ReportBody">';
    ReportHTML += '<table id="tblItemsPurchasingFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
    ReportHTML += '<thead>';
    ReportHTML += '<tr style="border:white"><td colspan="5"><h3>Purchasing Invoices Follow-Up</h3></td></tr>';
    ReportHTML += '<tr>';
    ReportHTML += '<th>Supplier Name</th>';
    ReportHTML += '<th>NET</th>';
    ReportHTML += '<th>Taxes</th>';
    ReportHTML += '<th>Discount</th>';
    ReportHTML += '<th>Total Amount</th>';
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
            ReportHTML += '<td><b>Total</b></td>';
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