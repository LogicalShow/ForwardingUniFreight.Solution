function cbCheckAllCustomersChanged() {
    debugger;
    if ($("#cbCheckAllStores").prop("checked"))
        $("#divCbCustomers input[name=nameCbCustomers]").prop("checked", true);
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
function cbCheckAllSalesMenChanged() {
    debugger;
    if ($("#cbCheckAllSalesMen").prop("checked"))
        $("#divCbSalesMen input[name=nameCbSalesMen]").prop("checked", true);
    else
        $("#divCbSalesMen input[name=nameCbSalesMen]").prop("checked", false);
}
function SHowHideOptionReuqired() {

    setTimeout(function () {
        if ($('#Sales_CustomersBalanceOnDate').is(':checked')) {

            $('#secSalesMen').removeClass('hide');
            $('#secItems').addClass('hide');
            $('#txtFromDate').addClass('hide');
        }
        else
        {
            $('#secSalesMen').addClass('hide');
            $('#secItems').removeClass('hide');
            $('#txtFromDate').removeClass('hide');

        }
    }, 200);


}
function SL_Reports_Print(pOutputTo) {
   // debugger; GetPrintedInvoicesTotalsData(DateTime From, DateTime To, string pClientIDs, string pReportNo);
    debugger;
    console.log('77777777')
    var ReportNo = $('input[name=nameReportType]:checked').attr('id');
    if ($('input[name=nameReportType]:checked').attr('id') == "7") {
        var pCustomerIDList = ($("#cbCheckAllStores").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers")) ;
        var pItemIDList = ($("#cbCheckAllItems").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttr("nameCbItems"));
        if (pCustomerIDList == "" || pItemIDList == "")
            swal("Sorry", "Please, select at least one Client and Items");
        else {
            FadePageCover(true);
            var pParametersWithValues = {
                From: ConvertDateFormat($("#txtFromDate").val())
                , To: ConvertDateFormat($("#txtToDate").val())
                , pClientIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : pCustomerIDList) 
                , pItemsIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
                , pReportNo: $('input[name=nameReportType]:checked').attr('id')
            };
            console.log($('input[name=nameReportType]:checked').attr('id'));
            CallGETFunctionWithParameters("/api/SL_Reports/GetInvoicesTotalsData", pParametersWithValues
                , function (pData) {
                    if ($('input[name=nameReportType]:checked').attr('id') == "7") {
                        SL_Reports_Print_InvoicesTotals(pData, pOutputTo);
                    }

                }
                , null);
        }
    }
    else if ($('input[name=nameReportType]:checked').attr('id') == "Rep_SLInvoice_SalesFollowUp_Detailed") {
        var pCustomerIDList = ($("#cbCheckAllStores").prop("checked") == true ? "-1" :GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers") );
        var pItemIDList = ($("#cbCheckAllItems").prop("checked") == true ? "-1" :  GetAllSelectedIDsAsStringWithNameAttr("nameCbItems"));
        if (pCustomerIDList == "" || pItemIDList == "")
            swal("Sorry", "Please, select at least one Client and Items");
        else {
            if (pOutputTo == "Excel") {

                debugger;
                var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
                var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
                if (pCustomerIDList == "" || pItemIDList == "")
                    swal("Sorry", "Please, select at least one Client and Items");
                else
                {
                    FadePageCover(true);
                    var pParametersWithValues = {
                        pFromDate: ConvertDateFormat($("#txtFromDate").val())
                        , pToDate: ConvertDateFormat($("#txtToDate").val())
                        , pClientIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : pCustomerIDList)
                        , pItemIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" : pItemIDList)
                        , pReportNo: $('input[name=nameReportType]:checked').attr('tag')

                    };
                    console.log($('input[name=nameReportType]:checked').attr('tag'));


                    CallGETFunctionWithParameters("/api/SL_Reports/GetPrintedData", pParametersWithValues
                        , function (pData) {
                            debugger
                       SL_Reports_Print_Rep_SLInvoice_SalesFollowUp_Detailed(pData, pOutputTo);

                        }
                        , null);
                }

            }
            else {
                var arr_Keys = new Array();
                var arr_Values = new Array();
                arr_Keys.push("FromDate");
                arr_Keys.push("ToDate");
                arr_Keys.push("ClientIDs");
                arr_Keys.push("ItemIDs");


                arr_Values.push(ConvertDateFormat($('#txtFromDate').val()));
                arr_Values.push(ConvertDateFormat($('#txtToDate').val()));
                arr_Values.push(($("#cbCheckAllStores").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers")));
                arr_Values.push(($("#cbCheckAllItems").prop("checked") == true ? "-1" : GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems")));

                if ($("[id$='hf_ChangeLanguage']").val() == "en") {
                    var pParametersWithValues =
                    {
                        arr_Keys: arr_Keys
                        , arr_Values: arr_Values
                        , pTitle: $('input[name=nameReportType]:checked').attr('id')
                        , pReportName: $('input[name=nameReportType]:checked').attr('id')
                    };
                } else {
                    var pParametersWithValues =
                    {
                        arr_Keys: arr_Keys
                        , arr_Values: arr_Values
                        , pTitle: $('input[name=nameReportType]:checked').attr('id')
                        , pReportName: $('input[name=nameReportType]:checked').attr('id')+"_AR"
                    };
                }
                var win = window.open("", "_blank");
                var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

                win.location = url;
            }

        }


    }
    else {

        //  %2C

        var arr_Keys = new Array();
        var arr_Values = new Array();

        //-----------------------------------------------------------------
        // ---- PARAMETERS KEYS ------------------------------------------------
        //-----------------------------------------------------------------
        if (!$('#Sales_CustomersBalanceOnDate').is(':checked'))
        {
            arr_Keys.push("FromDate");
            arr_Values.push(ConvertDateFormat($('#txtFromDate').val()));

            //-----------------------------------------------------------------
            arr_Keys.push("ItemIDs");
            arr_Values.push(($("#cbCheckAllItems").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbItems") + "*"));
           //-----------------------------------------------------------------

        }
            
        //-----------------------------------------------------------------
        arr_Keys.push("ToDate");
        arr_Values.push(ConvertDateFormat($('#txtToDate').val()));
        //-----------------------------------------------------------------
        if ($('#Sales_CustomersBalanceOnDate').is(':checked'))
        {
            arr_Keys.push("SalesMenIDs");
            arr_Values.push(($("#cbCheckAllSalesMen").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbSalesMen") + "*"));
        }
            
        //-----------------------------------------------------------------
        arr_Keys.push("ClientIDs");
        arr_Values.push(($("#cbCheckAllStores").prop("checked") == true ? "-1" : "*" + GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbCustomers") + "*"));


        if ($("[id$='hf_ChangeLanguage']").val() == "en")
        {
            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id')
                , pReportName: $('input[name=nameReportType]:checked').attr('id')
            };
        }
        else
        {
            var pParametersWithValues =
            {
                arr_Keys: arr_Keys
                , arr_Values: arr_Values
                , pTitle: $('input[name=nameReportType]:checked').attr('id')
                , pReportName: $('input[name=nameReportType]:checked').attr('id') + (($('#Sales_CustomersBalanceOnDate').is(':checked') || $('#SalesAnalyticsReport').is(':checked'))  ? "" : "_AR")
            };
        }
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;



    }
}
function SL_Reports_Print_Rep_SLInvoice_SalesFollowUp_Detailed(pData, pOutputTo) {

    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var Data1= JSON.parse(pData[2]);

    var Data = Data1.sort((a, b) => (a.ClientID > b.ClientID) ? 1 : -1);

    var NetTotal = 0.00;
    var DiscountTotal = 0.00;
    var TaxesTotal = 0.00;
    var Total = 0.00;
    var ReportHTML = '';
    if ($("[id$='hf_ChangeLanguage']").val() == "en") {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Invoices Follow-Up' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += '<thead>';
        //ReportHTML += '<tr style="border:white"><td colspan="5"><h3>Sales Invoices Follow-Up</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>Customer</th>';
        ReportHTML += '<th>ItemCode</th>';
        ReportHTML += '<th>ItemName</th>';
        ReportHTML += '<th>Qty</th>';
        ReportHTML += '<th>Unit</th>';
        ReportHTML += '<th>Unit Price</th>';
        ReportHTML += '<th>Currency </th>';
        ReportHTML += '<th>Total Price</th>';
        ReportHTML += '<th>Invoice No</th>';
        ReportHTML += '<th>Invoice Date</th>';

        ReportHTML += '</tr>';
        ReportHTML += '</thead>';

        var TotalPerClient = 0.00;
        $(Data).each(function (i, item) {




            if (i != 0 && Data[i].ClientID != Data[i - 1].ClientID) {

                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'Total For ' + Data[i - 1].CustomerName + ' : ' + '</td>';
                ReportHTML += '<td>' + TotalPerClient + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                //  ReportHTML += '</tbody></table>';


                TotalPerClient = 0.00;
            }

            ReportHTML += '<tr><td>' + (item.CustomerName) + '</td>';
            ReportHTML += '<td>' + (item.D_ItemName.split('|')[0]) + '</td>';
            ReportHTML += '<td>' + (item.D_ItemName.split('|')[1]) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.D_UnitName) + '</td>';
            ReportHTML += '<td>' + (item.D_UnitPrice) + '</td>';
            ReportHTML += '<td>' + (item.CurrencyCode) + '</td>';
            ReportHTML += '<td>' + (item.D_Total) + '</td>';
            ReportHTML += '<td>' + (item.InvoiceNo) + '</td>';
            ReportHTML += '<td>' + GetDateFromServer(item.InvoiceDate) + '</td></tr>';




            TotalPerClient += item.D_Total;
            NetTotal += item.D_Total;
            //TaxesTotal += item.TaxesAmount;
            //DiscountTotal += item.Discount;
            //Total += item.TotalPrice;


            if (i == Data.length - 1) {
                //ReportHTML += '<tr>';
                //ReportHTML += '<td><b>Total</b></td>';
                //ReportHTML += '<td><b>' + NetTotal + '</b></td>';
                //ReportHTML += '<td><b>' + TaxesTotal + '</b></td>';
                //ReportHTML += '<td><b>' + DiscountTotal + '</b></td>';
                //ReportHTML += '<td><b>' + Total + '</b></td>';
                //ReportHTML += '</tr>';
                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'Total For ' + Data[i].CustomerName + ' : ' + '</td>';
                ReportHTML += '<td>' + TotalPerClient + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                //  ReportHTML += '</tbody></table>';


                TotalPerClient = 0.00;
                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'Total All: ' + '</td>';
                ReportHTML += '<td>' + NetTotal + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                ReportHTML += '</tbody></table>';

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
                        filename: "ItemsSalesFollowUpDetailed" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                        preserveColors: true // set to true if you want background colors and font colors preserved
                    });

                }

                FadePageCover(false);
            }

        });
    }
    else {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'متابعة فواتير المبيعات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
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
        //ReportHTML += '<tr style="border:white"><td colspan="5"><h3>Sales Invoices Follow-Up</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>العميل</th>';
        ReportHTML += '<th>كود الصنف</th>';
        ReportHTML += '<th>إسم الصنف</th>';
        ReportHTML += '<th>الكمية</th>';
        ReportHTML += '<th>الوحدة</th>';
        ReportHTML += '<th>سعر الوحدة</th>';
        ReportHTML += '<th>العملة </th>';
        ReportHTML += '<th>إجمالي السعر</th>';
        ReportHTML += '<th>رقم الفاتورة</th>';
        ReportHTML += '<th>تاريخ الفاتورة</th>';

        ReportHTML += '</tr>';
        ReportHTML += '</thead>';

        var TotalPerClient = 0.00;
        $(Data).each(function (i, item) {




            if (i != 0 && Data[i].ClientID != Data[i - 1].ClientID) {

                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'الإجمالي للعميل ' + Data[i - 1].CustomerName + ' : ' + '</td>';
                ReportHTML += '<td>' + TotalPerClient + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                //  ReportHTML += '</tbody></table>';


                TotalPerClient = 0.00;
            }

            ReportHTML += '<tr><td>' + (item.CustomerName) + '</td>';
            ReportHTML += '<td>' + (item.D_ItemName.split('|')[0]) + '</td>';
            ReportHTML += '<td>' + (item.D_ItemName.split('|')[1]) + '</td>';
            ReportHTML += '<td>' + (item.D_Quantity) + '</td>';
            ReportHTML += '<td>' + (item.D_UnitName) + '</td>';
            ReportHTML += '<td>' + (item.D_UnitPrice) + '</td>';
            ReportHTML += '<td>' + (item.CurrencyCode) + '</td>';
            ReportHTML += '<td>' + (item.D_Total) + '</td>';
            ReportHTML += '<td>' + (item.InvoiceNo) + '</td>';
            ReportHTML += '<td>' + GetDateFromServer(item.InvoiceDate) + '</td></tr>';




            TotalPerClient += item.D_Total;
            NetTotal += item.D_Total;
            //TaxesTotal += item.TaxesAmount;
            //DiscountTotal += item.Discount;
            //Total += item.TotalPrice;


            if (i == Data.length - 1) {
                //ReportHTML += '<tr>';
                //ReportHTML += '<td><b>Total</b></td>';
                //ReportHTML += '<td><b>' + NetTotal + '</b></td>';
                //ReportHTML += '<td><b>' + TaxesTotal + '</b></td>';
                //ReportHTML += '<td><b>' + DiscountTotal + '</b></td>';
                //ReportHTML += '<td><b>' + Total + '</b></td>';
                //ReportHTML += '</tr>';
                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'الإجمالي للعميل ' + Data[i].CustomerName + ' : ' + '</td>';
                ReportHTML += '<td>' + TotalPerClient + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                //  ReportHTML += '</tbody></table>';


                TotalPerClient = 0.00;
                ReportHTML += '<tr><td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + 'إجمالي الكل: ' + '</td>';
                ReportHTML += '<td>' + NetTotal + '</td>';
                ReportHTML += '<td>' + '' + '</td>';
                ReportHTML += '<td>' + '' + '</td></tr>';

                ReportHTML += '</tbody></table>';

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
                        filename: "ItemsSalesFollowUpDetailed" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                        preserveColors: true // set to true if you want background colors and font colors preserved
                    });

                }

                FadePageCover(false);
            }

        });
    }


}

function GetAllSelectedIDsAsStringWithNameAttr2(pCheckboxNameAttr) {
    var listOfIDs = "";
    $('input[name="' + pCheckboxNameAttr + '"]:checked').each(function () {
        listOfIDs += ((listOfIDs == "") ? "" : "%2C") + ("%22" + $(this).attr('value') + "%22");
    });
    return "%22" + listOfIDs + "%22";
}
function SL_Reports_Print_InvoicesTotals(pData, pOutputTo) {

    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
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
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        ReportHTML += '<html dir="rtl">';
        ReportHTML += '     <head><title>' + 'متابعة فواتير المبيعات' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
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
        ReportHTML += '<tr style="border:white"><td colspan="5"><h3>متابعة فواتير المبيعات</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>إسم العميل</th>';
        ReportHTML += '<th>الصافي</th>';
        ReportHTML += '<th>الضرائب</th>';
        ReportHTML += '<th>الخصم</th>';
        ReportHTML += '<th>إجمالي المبلغ</th>';
        ReportHTML += '</tr>';
        ReportHTML += '</thead>';
        $(Data).each(function (i, item) {


            ReportHTML += '<tr><td>' + (item.ClientName) + '</td>';
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
                ReportHTML += '<td><b>الإجمالي</b></td>';
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
    }
    else {
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + 'Sales Invoices Follow-Up' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        ReportHTML += '<div id="ReportBody">';
        ReportHTML += '<table id="tblItemsSalesFollowUpTotal"  class="table table-striped text-sm table-bordered ">';
        ReportHTML += '<thead>';
        ReportHTML += '<tr style="border:white"><td colspan="5"><h3>Sales Invoices Follow-Up</h3></td></tr>';
        ReportHTML += '<tr>';
        ReportHTML += '<th>Customer Name</th>';
        ReportHTML += '<th>NET</th>';
        ReportHTML += '<th>Taxes</th>';
        ReportHTML += '<th>Discount</th>';
        ReportHTML += '<th>Total Amount</th>';
        ReportHTML += '</tr>';
        ReportHTML += '</thead>';
        $(Data).each(function (i, item) {


            ReportHTML += '<tr><td>' + (item.ClientName) + '</td>';
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
function SL_Reports_Print_ServicesSalesFollowUp(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
    //var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    var pFormattedPrintTime = getTime();
    var breakPage = '         <div class="break"></div>';
    var ArrData = JSON.parse(pData[2]);

    var ReportHTML = '';
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + 'Services Sales FollowUp' + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';
    $(ArrData).each(function (i, Data) {
        if(i > 0)
            ReportHTML += breakPage;
        
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-5"><b>Printed On :</b> ' + pFormattedTodaysDate + ' ' + pFormattedPrintTime + '  <br><b>From Date : </b>' + $('#txtFromDate').val() + ' ' + ' <b>To Date :</b> ' + $('#txtToDate').val() + '</div>';
        if(i == 0)
        ReportHTML += '<div id="ReportBody"><br>';
        ReportHTML += '<table id="tblServicesSalesFollowUp'+i+'"  class="table table-striped text-sm table-bordered ">';
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
                    filename: "Services Sales Follow-Up" + "@" + $('#txtFromDate').val() + "@" + $('#txtToDate').val() + ".xls", // do include extension
                    preserveColors: true // set to true if you want background colors and font colors preserved
                });

            }
        }


    });







    FadePageCover(false);
}



function SL_Reports_Print_StockBalanceSummary(pData, pOutputTo) {
    debugger;
    //var pCustomerIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbCustomers");
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