// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows

function SL_ApproveInvoice_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_ApproveInvoice");
    $.each(pSL_Invoices, function (i, item) {
        debugger;

        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSL_ApproveInvoice",
            ("<tr ID='" + item.ID + "' ondblclick=''>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='InvoiceNoManual hide' val='" + item.InvoiceNoManual + "'>" + item.InvoiceNoManual + "</td>"
                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                + "<td class='ClientID' val='" + item.ClientID + "'>" + item.ClientName + "</td>"
                + "<td class='TotalBeforTax hide' val='" + item.TotalBeforTax + "'>" + item.TotalBeforTax + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TotalPrice' val='" + item.TotalPrice + "'>" + item.TotalPrice + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Discount hide' val='" + item.Discount + "'>" + item.Discount + "</td>"
                + "<td class='DiscountPercentage hide' val='" + item.DiscountPercentage + "'>" + item.DiscountPercentage + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='SalesManID hide' val='" + item.SalesManID + "'>" + item.SalesManID + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenter_ID + "</td>"
                + "<td class='PaymentMethodID hide' val='" + item.PaymentMethodID + "'>" + item.PaymentMethodID + "</td>"
                + "<td class='ISDiscountBeforeTax val=" + item.ISDiscountBeforeTax + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.ISDiscountBeforeTax == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='OrderID hide' val='" + item.OrderID + "'>" + item.OrderID + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='LocalTotalBeforeTax hide' val='" + item.LocalTotalBeforeTax + "'>" + item.LocalTotalBeforeTax + "</td>"
                + "<td class='LocalTotal hide' val='" + item.LocalTotal + "'>" + item.LocalTotal + "</td>"
                + "<td class='hSL_Invoices hide'><a href='#SL_InvoicesModal' data-toggle='modal' onclick='SL_Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr> "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_ApproveInvoice", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSL_ApproveInvoice>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function SL_ApproveInvoice_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where ISNULL(IsDeleted , 0) = 0 and ISNULL(IsApproved , 0) = 0";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
    if ($('#txtTotalPrice_Filter').val().trim() != "") {
        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    }
    if ($('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND ClientID = " + $('#slClients_Filter').val() + "";
    }
    if ($('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Approving/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_ApproveInvoice_BindTableRows(pTabelRows); SL_ApproveInvoice_ClearAllControls(); });
    HighlightText("#tblSL_ApproveInvoice>tbody>tr", $("#txt-Search").val().trim());
}





function SL_ApproveInvoice_Approve() {

    console.log(GetAllSelectedIDsAsString("tblSL_ApproveInvoice"));
    var pSelectedIDs = GetAllSelectedIDsAsString("tblSL_ApproveInvoice");
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
                    CallGETFunctionWithParameters("/api/SL_Approving/Approve"
                        , { pSelectedIDs: pSelectedIDs, pApproved: true }
                        , function (pData) {
                            if (pData[0]) {
                                swal("Success", "Saved successfully", "success");
                               SL_ApproveInvoice_LoadingWithPaging();
                            }
                            else {
                                FadePageCover(false);
                                swal("Sorry", pData[1], "warning");
                               // swal("Sorry", JSON.parse(pData[1]), "warning");



                            }
                        }
                        , null);

                    //----------
                }
                else {
                    console.log('refuse approve');
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
    //        DeleteListFunction("/api/SC_Transactions/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
    //    });
    //    //DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () { SC_Transactions_LoadingWithPaging(); });
}



function SL_ApproveInvoice_ClearAllControls()
{


}

