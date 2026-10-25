

function IntializeData()
{

                        CallGETFunctionWithParameters("/api/MaterialIssueVouchersFollowUp/FillFilter"
                            , {}
                            , function (pData) {
                                debugger
                                $("#hl-menu-SC").parent().addClass("active");
                                var pStores = pData[0];
                                var pItems = pData[1];
                                var pSuppliers = pData[2];
                                var pBranches = pData[3];
                                var pDepartments = pData[4];
                                var pTrailers = pData[5];
                                var pEquipments = pData[6];
                                FillDivWithCheckboxes_DynamicFiled("divCbStores", pStores, "nameCbStores", "StoreName", null);
                                FillDivWithCheckboxes_DynamicWithMultiFields("divCbItems", pItems, "nameCbItems", "Code,Name", null);

                                FillDivWithCheckboxes_DynamicFiled("divCbSuppliers", pSuppliers, "nameCbSuppliers", "Name", null);
                                FillDivWithCheckboxes_DynamicFiled("divCbBranches", pBranches, "nameCbBranches", "Name", null);
                                FillDivWithCheckboxes_DynamicFiled("divCbDepartments", pDepartments, "nameCbDepartments", "Name", null);
                                FillDivWithCheckboxes_DynamicFiled("divCbTrailers", pTrailers, "nameCbTrailers", "Name", null);
                                FillDivWithCheckboxes_DynamicFiled("divCbEquipments", pEquipments, "nameCbEquipments", "Name", null);
                                
                                var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
                                $("#txtFromDate").val(pFormattedTodaysDate);
                                $("#txtToDate").val(pFormattedTodaysDate);
                                FadePageCover(false);
                            }
                            , null);
}







function cbCheckAllSuppliersChanged() {
    debugger;
    if ($("#cbCheckAllSuppliers").prop("checked"))
        $("#divCbSuppliers input[name=nameCbSuppliers").prop("checked", true);
    else
        $("#divCbSuppliers input[name=nameCbSuppliers]").prop("checked", false);
}
function cbCheckAllEquipmentsChanged() {
    debugger;
    if ($("#cbCheckAllEquipments").prop("checked"))
        $("#divCbEquipments input[name=nameCbEquipments").prop("checked", true);
    else
        $("#divCbEquipments input[name=nameCbEquipments]").prop("checked", false);
}
function cbCheckAllTrailersChanged() {
    debugger;
    if ($("#cbCheckAllTrailers").prop("checked"))
        $("#divCbTrailers input[name=nameCbTrailers").prop("checked", true);
    else
        $("#divCbTrailers input[name=nameCbTrailers]").prop("checked", false);
}
function cbCheckAllDepartmentsChanged() {
    debugger;
    if ($("#cbCheckAllDepartments").prop("checked"))
        $("#divCbDepartments input[name=nameCbDepartments]").prop("checked", true);
    else
        $("#divCbDepartments input[name=nameCbDepartments]").prop("checked", false);
}
function cbCheckAllBranchesChanged() {
    debugger;
    if ($("#cbCheckAllBranches").prop("checked"))
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", true);
    else
        $("#divCbBranches input[name=nameCbBranches]").prop("checked", false);
}
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

function SC_Reports_Print(pOutputTo)
{
    debugger;
    var pStoreIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbStores"); 
    var pItemIDList = GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
   // console.log(pStoreIDList);

        FadePageCover(true);
    var pParametersWithValues =
    {
             pLanguage : "en"
            , pStoresIDs: ($("#cbCheckAllStores").prop("checked") == true ? "-1" : IsNull(pStoreIDList, "-1")) 
            , pItemsIDs: ($("#cbCheckAllItems").prop("checked") == true ? "-1" :IsNull( pItemIDList , "-1"))
            , pBranchesIDs: ($("#cbCheckAllBranches").prop("checked") == true ? "-1" : IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbBranches"), "-1"))
            , pDepartmentsIDs: ($("#cbCheckAllDepartments").prop("checked") == true ? "-1" : IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbDepartments"), "-1"))
            , pTrailersIDs: ($("#cbCheckAllTrailers").prop("checked") == true ? "-1" : IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbTrailers"), "-1"))
            , pEquipmentsIDs: ($("#cbCheckAllEquipments").prop("checked") == true ? "-1" : IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbEquipments"), "-1"))
            , pPartnerID: ($("#cbCheckAllSuppliers").prop("checked") == true ? "-1" : IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbSuppliers"), "-1"))
            , pPartnerTypeID: 8
            , pFromDate: ConvertDateFormat($("#txtFromDate").val())
            , pToDate: ConvertDateFormat( $("#txtToDate").val() )
            , pReportNo: "1"
        };
        console.log($('input[name=nameReportType]:checked').attr('id'));
        CallGETFunctionWithParameters("/api/MaterialIssueVouchersFollowUp/GetPrintedData", pParametersWithValues
            , function (pData) {
                FadePageCover(false);
                debugger;
                var Items = JSON.parse(pData[0]);
                var Expenses = JSON.parse(pData[1]);
                var Headers = JSON.parse(pData[2]);



                var TransactionIDs =  Headers.map(item => item.TransactionID).filter((value, index, self) => self.indexOf(value) === index);
                console.log(TransactionIDs)
                var htmlTables = "";
                var ItemsExpenses = "";
                $(TransactionIDs).each(function (i, item) {
                    var _items = Items.filter(x => x.TransactionID == item);
                    var _Expenses = Expenses.filter(x => x.TransactionID == item);
                    var _DistinctData = Headers.filter(x => x.TransactionID == item);
                    ItemsExpenses += ("<hr>" + SC_DrawMaterialIssueVoucher(_items, _Expenses, _DistinctData, pOutputTo));





                    if (TransactionIDs.length - 1 == i) {

                       // var mywindow = window.open('', '_blank');
                        var ReportHTML1 = '';
                        pReportTitle = "  Material Issue Vouchers FollowUp ";
                        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
                        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                        ReportHTML1 += '<html dir="rtl">';
                        ReportHTML1 += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                        ReportHTML1 += '         <body  style="background-color:white;"><div id="AllReport">';

                        ReportHTML1 += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
                        ReportHTML1 += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
                        ReportHTML1 += '<div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                        ReportHTML1 += '         <div id="Reportbody">';
                        ReportHTML1 += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

                        ReportHTML1 += '                 <div class="col-xs-3"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + '</div>';
                        ReportHTML1 += '                 <div class="col-xs-3"><b>بواسطة:</b> ' + $('#sp-LoginName').html() + '</div>';
                        //---------------------------------------------------------------------------------------------------------------------------------



                        ReportHTML1 += ItemsExpenses;

                     //   ReportHTML1 += '         </div>';
                        //------------------------------------------------------------------------------------------------------------------------------------
                        //ReportHTML1 += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

                        //ReportHTML1 += '     </footer>';

                        ReportHTML1 += '</div></body></html>';




                        if (pOutputTo != "Excel") {
                            var mywindow = window.open('', '_blank');
                            mywindow.document.write(ReportHTML1 );
                            mywindow.document.close();
                        }
                        else {
                            $("#hExportedTable").html(ReportHTML1);
                                             
                            var $table = $('#hExportedTable');
                            $table.table2excel({
                             //   exclude: ".noExl",
                                name: "sheet",
                                filename: "MaterialIssueVoucherFoloowUp"+ ".xls", // do include extension
                                preserveColors: false // set to true if you want background colors and font colors preserved
                            });
                        }


                       // mywindow.document.write(ReportHTML);

                        // $("#hExportedTable").html(ReportHTML);
                       // mywindow.document.close();
                        FadePageCover(false)
                    }


                });
              //  swal("sorry", TransactionIDs, "warning");
               // swal(TransactionIDs);
               // SC_DrawMaterialIssueVoucher(Items, Expenses);
            }
            , null);
  //  }
}



function SC_DrawMaterialIssueVoucher(items, Expenses, _DistinctData, pOutputTo) {
    var Header = _DistinctData[0];
    var footer = "";


    //var pReportTitle = "إذن صرف أصناف من المخازن رقم   ";
    //pReportTitle += "<br>"
    //pReportTitle += Header.Code;
   // var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";

    if ($(items) != null && $(items).length > 0) {
        pTablesHTML = '<table  style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';

        if (pOutputTo == "Excel") {

            pTablesHTML += '<thead><th> المصروفات ◀◀</th><th>الصنف</th><th>الكمية</th><th>الوحدة</th><th>القيمة</th><th>المجموع</th><th>المخزن</th><th>الملاحظات</th></thead>'
        }
        else {

            pTablesHTML += '<thead><th>الصنف</th><th>الكمية</th><th>الوحدة</th><th>القيمة</th><th>المجموع</th><th>المخزن</th><th>الملاحظات</th></thead>'
        }
        pTablesHTML += '<tbody>';

        var TotalAmount = 0.00;

        $(items).each(function (i, item) {

            pTablesHTML += '<tr>';
            if (pOutputTo == "Excel")
                pTablesHTML += '<td>' + '-' + '</td>';
            pTablesHTML += '<td>' + item.D_ItemName + '</td>';
            pTablesHTML += '<td>' + item.Qty_D + '</td>';
            pTablesHTML += '<td>' + item.D_UnitName + '</td>';
            pTablesHTML += '<td>' + item.AveragePrice_D + '</td>';
            pTablesHTML += '<td>' + item.AveragePrice_D * item.Qty_D  + '</td>';
            pTablesHTML += '<td>' + item.D_StoreName + '</td>';
            pTablesHTML += '<td>' + '' + '</td>';
            pTablesHTML += '</tr>';

            TotalAmount += (item.AveragePrice_D * item.Qty_D);


            if (i == $(items).length - 1) {
                if (pOutputTo == "Excel")
                    pTablesHTML += '<td>' + '-' + '</td>';
                pTablesHTML += '<td>' + 'المجموع الكلي' + '</td>';
                pTablesHTML += '<td>' + '' + '</td>';
                pTablesHTML += '<td>' + '' + '</td>';
                pTablesHTML += '<td>' + '' + '</td>';
                pTablesHTML += '<td>' + TotalAmount + '</td>';
                pTablesHTML += '<td>' + '' + '</td>';
                pTablesHTML += '<td>' + '' + '</td>';
                pTablesHTML += '</tr>';

            }
        });
        pTablesHTML += '</tbody></table>';
    }


    //****************** fill Expenses table *************************************************
    var pExpensesTablesHTML = "";

    if ($(Expenses) != null && $(Expenses).length > 0) {
        pExpensesTablesHTML = '<h4>مصروفات </h4>';
        pExpensesTablesHTML += '<table  style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';


        if (pOutputTo == "Excel") {
            pExpensesTablesHTML += '<thead><th> المصاريف ◀◀</th><th>المصروف</th><th>نوع الجهة</th><th>مصروف الى</th><th>القيمة</th><th>الملاحظات</th></thead>'
        }
        else {

            pExpensesTablesHTML += '<thead><th>المصروف</th><th>نوع الجهة</th><th>مصروف الى</th><th>القيمة</th><th>الملاحظات</th></thead>'
        }



        pExpensesTablesHTML += '<tbody>';
        $(Expenses).each(function (i, item) {

            pExpensesTablesHTML += '<tr>';
            if (pOutputTo == "Excel")
                pExpensesTablesHTML += '<td>' + ' - ' + '</td>';

            pExpensesTablesHTML += '<td>' + item.ExpensesName + '</td>';
            pExpensesTablesHTML += '<td>' + item.PartnerTypeName + '</td>';
            pExpensesTablesHTML += '<td>' + item.PartnerName + '</td>';
            pExpensesTablesHTML += '<td>' + item.ExpensesAmount + '</td>';
            pExpensesTablesHTML += '<td>' + item.ExpensesNotes + '</td>';
            pExpensesTablesHTML += '</tr>';



            if (i == Expenses.length - 1)
            {
                pExpensesTablesHTML += '</tbody></table>';
                //-----------------------------------------------------------------------------------------------------
                //-----------------------------------------------------------------------------------------------------

                pExpensesTablesHTML += '<div> <b>الضرائب</b></div> ';
                pExpensesTablesHTML += '<div> <b>' + item.ExpensesTaxesDetails + '</b></div> ';
                pExpensesTablesHTML += '<div> اجمالي المصروفات  ' + item.TotalExpenses + '</div> ';
                pExpensesTablesHTML += '<div> اجمالي الضرائب   ' + item.TotalExpensesTaxes + '</div> ';
                pExpensesTablesHTML += '<div> المجموع   ' + (item.TotalExpenses + item.TotalExpensesTaxes) + '</div> ';
                //-----------------------------------------------------------------------------------------------------
                //-----------------------------------------------------------------------------------------------------
            }
        });
        


    }





    var ReportHTML = '';

    ReportHTML += '<table style="border-bottom-width:2px!important; width: 50%; border-bottom-color:grey!important;border-top-width:2px!important; border-top-color:grey!important;" class="table text-lg table-bordered" >';

    if (pOutputTo == "Excel") {
        ReportHTML += '<thead style=""><th>■■■ ' + Header.TransactionCode +' حركة ■■■</th><th style="">كود الحركة</th><th>صرف الى</th><th>تاريخ الاذن </th><th>ملاحظات</th></thead>'

        ReportHTML += '<tbody ><td>'+' '+'</td><td>' + Header.TransactionCode + '</td><td>' + Header.ItemsDestintionsLocal + '</td><td>' + GetDateFromServer(Header.TransactionDate) + ' </td><td>' + Header.Notes + '</td></tbody></table>';


    }
    else {

        ReportHTML += '<thead style=""><th style="">كود الحركة</th><th>صرف الى</th><th>تاريخ الاذن </th><th>ملاحظات</th></thead>'
        ReportHTML += '<tbody ><td>' + Header.TransactionCode + '</td><td>' + Header.ItemsDestintionsLocal + '</td><td>' + GetDateFromServer(Header.TransactionDate) + ' </td><td>' + Header.Notes + '</td></tbody></table>';


    }

    //ReportHTML += '            <div>     <div style="color:grey;font-size:15px;" class="col-xs-3"><b>ملاحظات : </b> ' + Header.Notes + '</div>';

    //ReportHTML += '                 <div style="color:grey;font-size:15px;" class="col-xs-3"><b>تاريخ الاذن : </b> ' + GetDateFromServer(Header.TransactionDate) + '</div>';

    //ReportHTML += '                 <div style="color:grey;font-size:15px;" class="col-xs-3"><b>صرف الى: </b> ' + Header.ItemsDestintionsLocal + '</div>';

    //ReportHTML += '                 <div style="color:grey;font-size:15px;" class="col-xs-3"><b>كود الحركة: </b> ' + Header.TransactionCode + '</div> </div>';


   
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;

    ReportHTML += pExpensesTablesHTML;
    ReportHTML += ('</div>' );

 //   ReportHTML += '      </div>   </body>';
    return ReportHTML;

    
}







