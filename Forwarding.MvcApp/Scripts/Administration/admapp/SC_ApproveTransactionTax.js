// City Country ---------------------------------------------------------------
// Bind SC_TransactionsTax Table Rows


function IntializePageATax()
{
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Approving/IntializeData",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            // Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- select Items -->', '#slItems', '');


            Fill_SelectInputAfterLoadData_DynamicTypesWithHideValue(d[2], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slTransactionsTypes', '', '90', false);
            $("#slTransactionsTypes").val(10);

            Fill_SelectInputAfterLoadData_DynamicTypes(d[1], 'ID', 'InvoiceNumber', TranslateString("SelectFromMenu"), '#slPSInvoices', '', false);
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', '<-- select Suppliers -->', '#slSuppliers', '');
            FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectAccount"), "slAccountCharge", d[5], null);


        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}
function SC_ApproveTransactionTax_BindTableRows(pSC_TransactionsTax)
{
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_TransactionsTax");
    $.each(pSC_TransactionsTax, function (i, item) {
        debugger;
        AppendRowtoTable("tblSC_TransactionsTax",
        ("<tr ID='" + item.ID + "' ondblclick=''>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
            + "<td class='TransactionType' val='" + item.TransactionType + "'>" + item.TransactionType + "</td>"
            + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
            + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
            + "<td class='Customer' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
            + "<td class='Amount' val='" + item.Amount + "'>" + (item.Amount * 1).toFixed(3) + "</td>"
            + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
            + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
            + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
            + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
            + "<td class='IsApproved hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='TotalExpenses' val='" + item.TotalExpenses + "'>" + item.TotalExpenses + "</td>"
            + "<td class='Notes' val='" + item.Notes + "'>" + (item.Notes == "0" ? "-" : item.Notes) + "</td>"
            + "<td class='SLInvoiceID hide' val='" + item.SLInvoiceID + "'>" + item.SLInvoiceID + "</td>"
            + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
            + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientID + "</td>"
            + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
            + "<td class='IsSpareParts hide' val='" + item.IsSpareParts + "'>" + item.IsSpareParts + "</td>"
            + "<td class='FiscalYearID hide' val='" + item.FiscalYearID + "'>" + item.FiscalYearID + "</td>"
            + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"
            + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
            + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
            + "<td class='JV_ID hide' val='" + item.JV_ID + "'>" + item.JV_ID + "</td>"
            + "<td class='ShowDetails' val='" + item.ID + "'>" + "<a class='btn btn-warning' onclick='LoadTransactionsDetails(" + item.ID + ")' href='#'>Details</a>" + "</td>"
            + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSC_TransactionsTax", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSC_TransactionsTax>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function LoadTransactionsDetails(ID) {
    debugger;
    LoadAll("/api/SC_TransactionsTax/LoadItems", "where 'Details' = 'Details' and ID = " + ID + " ", function (pTabelRows)
    {
        jQuery("#SC_TransactionsTaxModal").modal("show");
        SC_TransactionsTaxDetailsTax_BindTableRows(pTabelRows);

    });

}
function SC_TransactionsTaxDetailsTax_BindTableRows(pSC_TransactionsTaxDetails) {
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pSC_TransactionsTaxDetails), function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ItemName_D' val='" + item.ItemName_D + "'>" + item.ItemName_D + "</td>"
                + "<td class='FromStoreName_D' val='" + item.FromStoreName_D + "'>" + item.FromStoreName_D + "</td>"
                + "<td class='QtyFactor_D hide' val='" + item.QtyFactor_D + "'>" + item.QtyFactor_D + "</td>"
                + "<td class='Qty_D' val='" + item.Qty_D + "'>" + (item.QtyFactor_D == 1 ? '<span style="color:blue;" class="fa fa-plus-circle">&nbsp;</span>' : '<span style="color:red;" class="fa fa-minus-circle">&nbsp;</span>' ) +  item.Qty_D + "</td>"
                + "<td class='AveragePrice_D' val='" + item.AveragePrice_D + "'>" + item.AveragePrice_D + "</td>"

                + "<td class='D_Notes' val='" + item.D_Notes + "'>" + item.D_Notes + "</td>"
                + "</tr>"));

    });


}
function SC_TransactionsTax_LoadingWithPaging()
{
    debugger;


    if ($('#slTransactionsTypes').val() == "0") {
        swal("" , "You Must Select Transaction Type ." , "warning");
        $('#slTransactionsTypes').addClass("bg-info");
    }
    else
    {
        $('#slTransactionsTypes').removeClass("bg-info");
        //var WhereClause = "Where isnull(IsApproved,0) <> 1   AND isnull(IsDeleted , 0) <> 1";
        var WhereClause ="Where 1=1"
        if ($('#slTransactionsTypes').val().trim() == "10") {
            if ($("#hDefaultUnEditableCompanyName").val() == "CHM") {
                WhereClause += " and id not in (select originid from ForwardingTransChemTax.dbo.taxlink where originid is not null and notes = 'GoodsReceiptNotes' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "TRM") {
                WhereClause += " and id not in (select originid from ForwardingTransMasirTax.dbo.taxlink where originid is not null and notes = 'GoodsReceiptNotes' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
                WhereClause += " and id not in (select originid from ForwardingEGL2023Tax.dbo.taxlink where originid is not null and notes = 'GoodsReceiptNotes' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "SWI") {
                WhereClause += " and id not in (select originid from ForwardingSwiftLogisticsEG2023Tax.dbo.taxlink where originid is not null and notes = 'GoodsReceiptNotes' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
        }
        else if ($('#slTransactionsTypes').val().trim() == "20") {
            if ($("#hDefaultUnEditableCompanyName").val() == "CHM") {
                WhereClause += " and id not in (select originid from ForwardingTransChemTax.dbo.taxlink where originid is not null and notes = 'GoodsIssueVouchers' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "TRM") {
                WhereClause += " and id not in (select originid from ForwardingTransMasirTax.dbo.taxlink where originid is not null and notes = 'GoodsIssueVouchers' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "EGL") {
                WhereClause += " and id not in (select originid from ForwardingEGL2023Tax.dbo.taxlink where originid is not null and notes = 'GoodsIssueVouchers' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
            else if ($("#hDefaultUnEditableCompanyName").val() == "SWI") {
                WhereClause += " and id not in (select originid from ForwardingSwiftLogisticsEG2023Tax.dbo.taxlink where originid is not null and notes = 'GoodsIssueVouchers' AND JVID IS NOT NULL)   AND isnull(IsDeleted , 0) <> 1";

            }
        }
        


        if ($('#txtCode').val().trim() != "") {
            WhereClause += " AND Code = '" + $('#txtCode').val() + "'";
        }
        //if ($('#slPSInvoices').val().trim() != "0") {
        //    WhereClause += " AND PurchaseInvoiceID = " + $('#slPSInvoices').val() + "";
        //}
        if ($('#slSuppliers').val().trim() != "0") {
            WhereClause += " AND SupplierID = " + $('#slSuppliers').val() + "";
        }
        if ($('#txtFromDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate').val()) + "')";
        }
        if ($('#txtToDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate').val()) + "')";
        }


        if ($('#slTransactionsTypes').val().trim() == "10")
        {
            WhereClause += " AND ( isnull(PurchaseInvoiceID , 0 ) <> 0 or isnull(ForwardingPSInvoiceID , 0 ) <> 0)    AND TransactionTypeID = " + $('#slTransactionsTypes').val() + "";


        }

        else
        {

            if ($('#slTransactionsTypes').val().trim() != "0") {
                WhereClause += " AND TransactionTypeID = " + $('#slTransactionsTypes').val() + "";
            }
        }
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Approving/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_ApproveTransactionTax_BindTableRows(pTabelRows); });

        console.log(WhereClause);
        HighlightText("#tblSC_TransactionsTax>tbody>tr", $("#txt-Search").val().trim());

    }

   
}

function SC_TransactionsTax_Approve() {

    console.log(GetAllSelectedIDsAsString("tblSC_TransactionsTax"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblSC_TransactionsTax");
    if (pSelectedIDs != "") {


        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will Approve Selected Transactions ",
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
                    CallGETFunctionWithParameters("/api/SC_Approving/ApproveTax"
                        , { pSelectedIDs: pSelectedIDs, pTransactionTypeID: $('#slTransactionsTypes').val(), pApproved: true, pAccountID: $('#slAccountCharge').val()}
                        , function (pData) {
                            FadePageCover(false);
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                                SC_TransactionsTax_LoadingWithPaging();
                               
                            }
                            else {
                                swal("Sorry", pData[1], "warning");

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





function SC_TransactionsTax_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSC_TransactionsTax') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            DeleteListFunction("/api/SC_TransactionsTax/Delete", { "pSC_TransactionsTaxIDs": GetAllSelectedIDsAsString('tblSC_TransactionsTax') }, function () { SC_TransactionsTax_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/SC_TransactionsTax/Delete", { "pSC_TransactionsTaxIDs": GetAllSelectedIDsAsString('tblSC_TransactionsTax') }, function () { SC_TransactionsTax_LoadingWithPaging(); });
}





