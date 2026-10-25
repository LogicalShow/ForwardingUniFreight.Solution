// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows




function IntializePage()
{
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Approving/IntializeData",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            //  Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- select Items -->', '#slItems', '');
            Fill_SelectInputAfterLoadData_DynamicTypesWithHideValue(d[2], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slTransactionsTypes', '', '90', false);
            Fill_SelectInputAfterLoadData_DynamicTypes(d[1], 'ID', 'InvoiceNumber', TranslateString("SelectFromMenu"), '#slPSInvoices', '', false);
            // Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- select Store -->', '#slStores', '');
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', '<-- select Suppliers -->', '#slSuppliers', '');

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}
function SC_UnApproveTransaction_BindTableRows(pSC_Transactions) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        AppendRowtoTable("tblSC_Transactions",
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
    BindAllCheckboxonTable("tblSC_Transactions", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function LoadTransactionsDetails(ID) {
    debugger;
    LoadAll("/api/SC_Transactions/LoadItems", "where 'Details' = 'Details' and ID = " + ID + " ", function (pTabelRows) {
        jQuery("#SC_TransactionsModal").modal("show");
        SC_TransactionsDetails_BindTableRows(pTabelRows);

    });

}
function SC_TransactionsDetails_BindTableRows(pSC_TransactionsDetails) {
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ItemName_D' val='" + item.ItemName_D + "'>" + item.ItemName_D + "</td>"
                + "<td class='FromStoreName_D' val='" + item.FromStoreName_D + "'>" + item.FromStoreName_D + "</td>"
                + "<td class='QtyFactor_D hide' val='" + item.QtyFactor_D + "'>" + item.QtyFactor_D + "</td>"
                + "<td class='Qty_D' val='" + item.Qty_D + "'>" + (item.QtyFactor_D == 1 ? '<span style="color:blue;" class="fa fa-plus-circle">&nbsp;</span>' : '<span style="color:red;" class="fa fa-minus-circle">&nbsp;</span>') + item.Qty_D + "</td>"
                + "<td class='AveragePrice_D' val='" + item.AveragePrice_D + "'>" + item.AveragePrice_D + "</td>"
                + "<td class='D_Notes' val='" + item.D_Notes + "'>" + item.D_Notes + "</td>"
                + "</tr>"));

    });


}

function SC_Transactions_LoadingWithPaging() {
    debugger;


    if ($('#slTransactionsTypes').val() == "0") {
        swal("", "You Must Select Transaction Type .", "warning");
        $('#slTransactionsTypes').addClass("bg-info");
    }
    else {
        $('#slTransactionsTypes').removeClass("bg-info");
        var WhereClause = "Where isnull(IsApproved,0) <> 0   AND isnull(IsDeleted , 0) <> 1";
        if ($('#txtCode').val().trim() != "") {
            WhereClause += " AND Code = '" + $('#txtCode').val() + "'";
        }
        if ($('#slPSInvoices').val().trim() != "0") {
            WhereClause += " AND PurchaseInvoiceID = " + $('#slPSInvoices').val() + "";
        }

        if ($('#txtFromDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate').val()) + "')";
        }
        if ($('#txtToDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate').val()) + "')";
        }

        if ($('#slTransactionsTypes').val().trim() != "0")
        {
            if ($('#slTransactionsTypes').val().trim() == "70") {
                WhereClause += " AND (vwSC_Transactions.TransactionTypeID = 70 AND ISNULL((SELECT  COUNT(isnull(vst.ID , 0 )) FROM dbo.vwSC_Transactions AS vst WHERE isnull(vst.IsDeleted , 0 ) = 0 and ISNULL( vst.MaterialIssueRequesitionsID , 0 ) = vwSC_Transactions.ID) , 0 )  <=0           )";
            }
            else if ($('#slTransactionsTypes').val().trim() == "60") {
                WhereClause += " AND (vwSC_Transactions.TransactionTypeID = 60 AND ISNULL((SELECT  COUNT(isnull(vst.ID , 0 )) FROM dbo.vwSC_Transactions AS vst WHERE isnull(vst.IsDeleted , 0 ) = 0 and ISNULL( vst.ExaminationID , 0 ) = vwSC_Transactions.ID) , 0 )  <=0  )";
            }
            else if ($('#slTransactionsTypes').val().trim() == "20") {
                WhereClause += " AND (vwSC_Transactions.TransactionTypeID = 20 AND dbo.CheckIfCanUnApproveSC_Transaction(vwSC_Transactions.ID , 20) = 1 and (ISNULL((SELECT  COUNT(isnull(vst.ID , 0 )) FROM dbo.vwSC_TransactionsHeaderDetails  AS vst WHERE isnull(vst.IsDeleted , 0 ) = 0 AND ISNULL( vst.FA_AssetsID , 0 ) <> 0 AND ISNULL( vst.ID , 0 ) = vwSC_Transactions.ID) , 0 )  <=0  )  AND ISNULL((SELECT  COUNT(isnull(vst.ID , 0 )) FROM dbo.Payables AS vst WHERE isnull(vst.IsDeleted , 0 ) = 0 and ISNULL( vst.TransactionID , 0 ) = vwSC_Transactions.ID) , 0 )  <=0  )";
            }
            else if ($('#slTransactionsTypes').val().trim() == "10") {
                WhereClause += " AND (vwSC_Transactions.TransactionTypeID = 10 AND (ISNULL((SELECT  COUNT(isnull(vst.ID , 0 )) FROM dbo.SC_Transactions   AS vst WHERE isnull(vst.IsDeleted , 0 ) = 0 AND vst.TransactionTypeID = 20 AND  ISNULL( vst.ParentID , 0 ) = vwSC_Transactions.ID) , 0 )  <=0  ) )";
            }
            else
            {
                WhereClause += " AND TransactionTypeID = " + $('#slTransactionsTypes').val() + "";
            }
        }
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Approving/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_UnApproveTransaction_BindTableRows(pTabelRows); });

        console.log(WhereClause);
        HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());

    }


}

function SC_Transactions_UnApprove() {

    console.log(GetAllSelectedIDsAsString("tblSC_Transactions"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblSC_Transactions");
    if (pSelectedIDs != "") {

        debugger;
        //*************
        swal({
            title: "Are you sure  ?",
            text: "You will UnApprove Selected Transactions ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK , UnApprove !",
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
                    CallGETFunctionWithParameters("/api/SC_Approving/Approve"
                        , { pSelectedIDs: pSelectedIDs, pTransactionTypeID: $('#slTransactionsTypes').val(), pApproved: false }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                                SC_Transactions_LoadingWithPaging();
                            }
                            else {
                                swal("Sorry", pData[1], "warning");
                                FadePageCover(false);
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
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSC_Transactions') != "")
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
                DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}





