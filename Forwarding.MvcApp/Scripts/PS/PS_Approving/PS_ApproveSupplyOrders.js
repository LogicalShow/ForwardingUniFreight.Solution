// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

function PS_ApproveSupplyOrders_BindTableRows(pPS_Invoices) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_ApproveSupplyOrders");
    $.each(pPS_Invoices, function (i, item) {
        debugger;

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_ApproveSupplyOrders",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input  name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='PurchasingSupplyNo' val='" + item.PurchasingSupplyNo + "'>" + item.PurchasingSupplyNo + "</td>"
                + "<td class='PurchasingSupplyNoManual' val='" + item.PurchasingSupplyNoManual + "'>" + item.PurchasingSupplyNoManual + "</td>"
                + "<td class='PurchasingSupplyDate' val='" + GetDateFromServer(item.PurchasingSupplyDate) + "'>" + GetDateFromServer(item.PurchasingSupplyDate) + "</td>"
                + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"
                + "<td class='PS_QuotationsID' val='" + item.PS_QuotationsID + "'>" + item.QuotationNoAndRequestInfo + "</td>"
                + "<td class='PS_PurchasingOrdersID' val='" + item.PS_PurchasingOrdersID + "'>" + item.PurchasingOrderInfo + "</td>"

                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"

                + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + item.PaymentTermCode + ' - ' + item.PaymentTermName + "</td>"
                + "<td class='PaymentNotes' val='" + item.PaymentNotes + "'>" + item.PaymentNotes + "</td>"


                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenterName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='CreatedUserID hide' val='" + item.CreatedUserID + "'>" + item.CreatedUserID + "</td>"
                + "<td class='EditedByUserID hide' val='" + item.EditedByUserID + "'>" + item.EditedByUserID + "</td>"
                + "<td class='ApprovedUserID hide' val='" + item.ApprovedUserID + "'>" + item.ApprovedUserID + "</td>"
                + "<td class='CreatedDate hide' val='" + GetDateFromServer(item.CreatedDate) + "'>" + GetDateFromServer(item.CreatedDate) + "</td>"
                + "<td class='EditedDate hide' val='" + GetDateFromServer(item.EditedDate) + "'>" + GetDateFromServer(item.EditedDate) + "</td>"
                + "<td class='ApprovedDate hide' val='" + GetDateFromServer(item.ApprovedDate) + "'>" + GetDateFromServer(item.ApprovedDate) + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hPS_PurchasingOrders hide'><a href='#PS_PurchasingOrdersModal' data-toggle='modal' onclick='PS_PurchasingOrders_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='pPS_PurchasingOrders hide'><a href='#' onclick='PrintPurchasingOrders(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_ApproveSupplyOrders", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_ApproveSupplyOrders>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PrintPurchasingOrders(PurchasingOrderID) {
    FadePageCover(true);
    if (PurchasingOrderID == 0)
        PurchasingOrderID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_PurchasingOrders/LoadDetails", "where ID = " + PurchasingOrderID, function (data) {
        var pReportTitle = " PurchasingOrder - أمر شراء ";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var _InvDate = "";
        var _InvCurrency = "";
        var _SupplierName = "";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';

        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الوحدة" : "Unit") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "السعر" : "Price") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الإجمالي" : "Total") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") + '</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        var AllTotal = 0.00;
        //hExportedTable
        $(_Details).each(function (i, item) {
            var name = '';
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.D_UnitName + '</td>';
            pTablesHTML += '<td>' + item.Price + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.Price * item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';

            AllTotal += parseFloat(parseFloat(item.Price * item.D_Quantity).toFixed(2));

            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.PurchasingOrderDate);
                _InvCode = item.PurchasingOrderNo;
                _InvNotes = item.Notes;
                _InvQuotationNo = item.QuotationNo;
                _InvBranch = item.BranchName;
                _InvDepartment = item.DepartmentName;
                _InvCreator = item.CreatorName;
                _SupplierName = item.SupplierName;


                pTablesHTML += '<tr>';
                pTablesHTML += '<th>' + (lang == "ar" ? "الاجمالي" : "Total") + '</th>';
                pTablesHTML += '<th class="' + ItemsCellsClass + '">' + '' + '</th>';
                pTablesHTML += '<th>' + '' + '</th>';
                pTablesHTML += '<th>' + '' + '</th>';
                pTablesHTML += '<th>' + AllTotal + '</th>';
                pTablesHTML += '<th>' + '' + '</th>';
                pTablesHTML += '</tr>';
                //pTablesHTML += '<tr>';
                //pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") + ' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                //pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';




        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems) {
            $('.ForItems').addClass('hide');

        }



        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html ' + (lang == "ar" ? 'dir="rtl"' : '') + '>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3 style="font-family:\'Arial black\'">' + _SupplierName + '</h3></div> </br>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم العرض " : "  PurchasingOrder No ") + ': </b> ' + _InvCode + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ العرض " : "  Date ") + ': </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  طلب شراء رقم " : "  Quotation NO ") + ': </b> ' + _InvQuotationNo + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  فرع " : "  Branch ") + ': </b> ' + _InvBranch + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  قسم " : "  Department ") + ': </b> ' + _InvDepartment + '</div>';




        ReportHTML += '                 <div class="col-xs-6"><b>' + (lang == "ar" ? "  الطباعة " : " Print on ") + ' :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
        FadePageCover(false)
    });
}
function PS_ApproveSupplyOrders_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) = 0 and ISNULL(IsApproved , 0) = 0";


    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND PurchasingOrderNo LIKE '%" + $('#txtCode_Filter').val() + "%'";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , PurchasingOrderDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , PurchasingOrderDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ApproveSupplyOrders/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_ApproveSupplyOrders_BindTableRows(pTabelRows); PS_ApproveSupplyOrders_ClearAllControls(); });
    HighlightText("#tblPS_ApproveSupplyOrders>tbody>tr", $("#txt-Search").val().trim());
}


function PS_ApproveSupplyOrders_ClearAllControls() {


}


function PS_ApproveSupplyOrders_Approve() {

    console.log(GetAllSelectedIDsAsString("tblPS_ApproveSupplyOrders"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblPS_ApproveSupplyOrders");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected Invoices ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , Approve !",
            cancelButtonText: "NO",
            closeOnConfirm: true
        },
            function (isConfirm) {
                //swal("Poof! Your imaginary file has been deleted!", {
                //    icon: "success",
                //});

                if (isConfirm) {
                    //-----------------------
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/PS_ApproveSupplyOrders/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: true }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                               PS_ApproveSupplyOrders_LoadingWithPaging();
                            }
                            else {
                                swal("Sorry", JSON.parse(pData[1]), "warning");

                            }
                        }
                        , null);

                    //----------
                }
                else {
                    console.log('refuse merge');
                }
            }
        );
        //*************





    }
}





function SC_Transactions_DeleteList() {
    //debugger;
    ////Confirmation message to delete
    //if (GetAllSelectedIDsAsString('tblSC_Transactions') != "")
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //    //callback function in case of success
    //    function () {
    //        DeleteListFunction("/api/SC_Transactions/Delete", { "pPS_InvoicesIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
    //    });
    //    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}





