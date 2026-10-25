// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows



function SC_ApproveTransaction_BindTableRows(pSC_Transactions)
{
    debugger;
    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        AppendRowtoTable("tblSC_Transactions",
        ("<tr ID='" + item.ID + "' ondblclick=''>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
            + "<td class='TransactionType hide' val='" + item.TransactionType + "'>" + item.TransactionType + "</td>"
            + "<td class='HeaderItemName' val='" + item.HeaderItemName + "'>" + "[ " + item.HeaderItemCode + " ] " + item.HeaderItemName + "</td>"
            + "<td class='P_Qty' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
            + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
            + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
            + "<td class='Customer' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
            + "<td class='Amount thCost hide' val='" + item.Amount + "'>" + (item.Amount * 1).toFixed(3) + "</td>"
            + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
            + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
            + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
            + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
            + "<td class='IsApproved hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
            + "<td class='Notes' val='" + item.Notes + "'>" + (item.Notes == "0" ? "-" : item.Notes)  + "</td>"
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
                + "</tr>"));

        if (pSC_Transactions.length - 1 == i)
            ShowRemoveCost();
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


function ShowRemoveCost() {

    if   // //
    (
        $('#sp-LoginName').text().toUpperCase() == ('borg-final p').toUpperCase() || $('#sp-LoginName').text().toUpperCase() == ('BORG-FINAL P').toUpperCase() || $('#sp-LoginName').text().toUpperCase() == ('BORG-RM').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('borg-rm').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Production').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Wagdy').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Arafa').toUpperCase() || $('#sp-LoginName').text().toUpperCase() == ('SALMA').toUpperCase()
    ) {
        $('.thCost').addClass('hide');


        //class="thCost"
    }
    else {
        $('.thCost ').removeClass('hide');
    }
}
function SC_Transactions_LoadingWithPaging()
{
    debugger;


    if ($('#slTransactionsTypes').val() == "0") {
        swal("" , "You Must Select Transaction Type ." , "warning");
        $('#slTransactionsTypes').addClass("bg-info");
    }
    else
    {
        $('#slTransactionsTypes').removeClass("bg-info");
        var WhereClause = "Where isnull(IsApproved,0) <> 1   AND isnull(IsDeleted , 0) <> 1";
        if ($('#txtCode').val().trim() != "") {
            WhereClause += " AND Code LIKE '%" + $('#txtCode').val() + "%'";
        }
        if ($('#slPSInvoices').val().trim() != "0") {
            WhereClause += " AND PurchaseInvoiceID = " + $('#slPSInvoices').val() + "";
        }
        if ($('#slTransactionsTypes').val().trim() != "0") {
            WhereClause += " AND TransactionTypeID = " + $('#slTransactionsTypes').val() + "";
        }
        if ($('#txtFromDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate').val()) + "')";
        }
        if ($('#txtToDate').val().trim() != "") {
            WhereClause += " AND CONVERT(date , TransactionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate').val()) + "')";
        }
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Approving/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_ApproveTransaction_BindTableRows(pTabelRows); });

        console.log(WhereClause);
        HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());

    }

   
}

function SC_Transactions_Approve() {

    console.log(GetAllSelectedIDsAsString("tblSC_Transactions"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblSC_Transactions");
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
                    CallGETFunctionWithParameters("/api/SC_Approving/Approve"
                        , { pSelectedIDs: pSelectedIDs, pTransactionTypeID: $('#slTransactionsTypes').val(), pApproved: true }
                        , function (pData) {
                            FadePageCover(false);
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                                SC_Transactions_LoadingWithPaging();
                               
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





