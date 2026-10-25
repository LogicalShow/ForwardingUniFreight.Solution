// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var RowsCounter = 0;
var IsInsert = true;
var TransTypeID = 110;
var _IsApproved = false;
var RollBackData = {};
function SC_Transactions_BindTableRows(pSC_Transactions) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_Transactions",
            ("<tr ID='" + item.ID + "' ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
                + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                + "<td class='IsApproved hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
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
                + "<td class='IsOutOfStore hide' val='" + item.IsOutOfStore + "'>" + item.IsOutOfStore + "</td>"

                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"
                + "<td class='FromStore hide' val='" + item.FromStore + "'>" + item.FromStore + "</td>"
                + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"
                + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"

                + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"

                + "<td class='TrailerID hide' val='" + item.TrailerID + "'>" + item.TrailerName + "</td>"
                + "<td class='EquipmentID hide' val='" + item.EquipmentID + "'>" + item.EquipmentName + "</td>"
                + "<td class='DivisionID hide' val='" + item.DivisionID + "'>" + item.DevisonName + "</td>"

                + "<td class='hSC_Transactions hide'><a href='#SC_TransactionsModal' data-toggle='modal' onclick='SC_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
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

function SC_HideShowEditBtns(IsApproved) {

    $("#tblItems").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
    _IsApproved = IsApproved;
    if (IsNull($("#hID").val(), "0") != "0" && (IsApproved == true || $("#hf_CanEdit").val() != 1)) {
        $('.Edit-btn').addClass('hide');
        $('.Edit-input').prop('disabled', true);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
    }
    else {
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").not('.IsDisable').prop('disabled', false);
    }


    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
        $('#txtDate').prop('disabled', false);
        $('#btn-Items').removeClass('hide');
        $('#slStores').prop('disabled', false);

    }
    else // is [ Update ]
    {
        $('#slStores').prop('disabled', true);
        $('#txtDate').prop('disabled', true);
        $('#btn-Items').addClass('hide');
    }
    // for [ All ]
    $('.selectitem').prop('disabled', true);
    $('.selectunit').prop('disabled', true);
    $('.selectstore').prop('disabled', true);
    $('td.OriginalQty ').find('.inputquantity').prop('disabled', true);
    $('td.Qty ').find('.inputquantity').prop('disabled', true);
    $('.inputprice ').prop('disabled', true);

}

function SC_TransactionsDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblItems') != "")
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
                DeleteListFunction("/api/SC_Transactions/DeleteItems", { "pSC_TransactionsDetailsIDs": GetAllSelectedIDsAsString('tblSC_TransactionsDetails') }, function () { SC_TransactionsDetails_LoadingWithPaging(); });
            });
}

function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}


function SC_Transactions_EditByDblClick(pID, pIsApproved) {
    _IsApproved = pIsApproved;
    jQuery("#SC_TransactionsModal").modal("show");
    SC_Transactions_FillControls(pID);
}
// Loading with data
function SC_Transactions_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where TransactionTypeID = 110 AND ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = '" + $('#txtCode_Filter').val() + "'";
    }
    //if ($('#slPSInvoices_Filter').val().trim() != "0") {
    //    WhereClause += " AND PurchaseInvoiceID = " + $('#slPSInvoices_Filter').val() + "";
    //}
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , TransactionDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , TransactionDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}
function SC_SLItems_LoadAll() {
    debugger;
    LoadAll("/api/SC_Transactions/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    // HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}

var all_has_store = false;

function SC_Transactions_Insert(pSaveandAddNew) {
    FadePageCover(true)
    IsInsert = true;
    var itemstore = [];
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
        var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
        var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
        var priceid = $(tr).find('td.AveragePrice ').find('.inputprice').val();
        var unitid = $(tr).find('td.UnitID ').find('.selectunit').val();
        console.log(unitid);
        if (itemstore.indexOf(itemid) != -1) {
            all_has_store = false;
            //swal('Sorry', 'Can not duplicate items', 'warning');
            FadePageCover(false)
            return false;
        }
        else {
            itemstore.push(itemid);
        }
        if (storeid.trim() == "0" || itemid.trim() == "0" || quantityid.trim() == "" || priceid.trim() == "" || unitid == null || unitid.trim() == "0") {

            all_has_store = false;
            FadePageCover(false)
            return false;
        }
        else {

            all_has_store = true;
        }
    });



    setTimeout(function () {

        // $('.selectstore').html($('#slStores').html());





        if ($('#tblItems > tbody > tr').length == 0) {
            swal('Excuse me', 'Fill Items', 'warning');
            FadePageCover(false)
        }
        else if (!all_has_store) {

            swal('Excuse me', 'Fill All Items , prices , Quantity , Stores', 'warning');
            FadePageCover(false)

        }
        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Insert", {
                pCode: $("#txtCode").val(),
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: "0",
                pDepartmentID: "0",
                pClientID: "0",
                pCostCenterID: $('#slCostCenter').val(),
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: "0",
                pTransactionTypeID: "110",
                pJV_ID: "0", pIsOutOfStore: "false", pMaterialIssueRequesitionsID: 0,
                pToStoreID: 0,
                pP_ProductionRequestID: 0,
                pP_UnitID: 0,
                pP_ItemID: 0,
                pP_LineID: 0,
                pP_Qty: 0,
                pP_FinishedDate: "01/01/1800",
                pP_StartDate: "01/01/1800",
                pEntitlementDays: 0,
                pIsClosed: false,
                pFromStore: $('#slStores').val(),
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: 0,
                pOperationID: "0",
                pBranchID: "0",
                pIsFromFlexi: "false"
                , pTrailerID: "0",
                pEquipmentID: "0",
                pDivisionID: "0" 
            }, pSaveandAddNew, null, '#hID', function () {

                InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                    JSON.stringify(SetArrayOfItems())
                    , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                        FadePageCover(true)
                        $('#txtCode').val(Code[1]);
                        PrintTransaction();


                        setTimeout(function () {
                            SC_Transactions_LoadingWithPaging();
                            IntializeData();
                            ClearAllTableRows('tblItems');
                            all_has_store = false;

                        }, 300);

                    });
            });
        }
        else {
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
        }
    }, 30);
}
function SC_Transactions_Update(pSaveandAddNew) {
    IsInsert = false;
    FadePageCover(true)
    var itemstore = [];
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
        var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
        var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
        var priceid = $(tr).find('td.AveragePrice ').find('.inputprice').val();
        var unitid = $(tr).find('td.UnitID ').find('.selectunit').val();
        console.log(unitid);
        if (itemstore.indexOf(itemid) != -1) {
            all_has_store = false;
            //swal('Sorry', 'Can not duplicate items', 'warning');
            FadePageCover(false)
            return false;
        }
        else {
            itemstore.push(itemid);
        }
        if (storeid.trim() == "0" || itemid.trim() == "0" || quantityid.trim() == "" || priceid.trim() == "" || unitid == null || unitid.trim() == "0") {

            all_has_store = false;
            FadePageCover(false)
            return false;
        }
        else {

            all_has_store = true;
        }
    });



    setTimeout(function () {
        debugger;
        // $('.selectstore').html($('#slStores').html());
        debugger;
        if ($('#tblItems > tbody > tr').length == 0) {
            swal('Excuse me', 'Fill Items', 'warning');
            FadePageCover(false)
        }
        else if (!all_has_store) {

            swal('Excuse me', 'Fill All Items Stores', 'warning');
            FadePageCover(false)

        }
        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update",
                {
                    pID: $('#hID').val(),
                    pCode: $("#txtCode").val(),
                    pCodeManual: "0",
                    pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                    pPurchaseInvoiceID: "0",
                    pPurchaseOrderID: "0",
                    pExaminationID: "0",
                    pIsApproved: (RollBackData.IsApproved == null || RollBackData.IsApproved == 0 || RollBackData.IsApproved == "0" ? false : RollBackData.IsApproved),
                    pNotes: ($("#txtNotes").val() == null || $("#txtNotes").val() == "" ? "0" : $("#txtNotes").val()),
                    pSLInvoiceID: "0",
                    pDepartmentID: "0",
                    pClientID: "0",
                    pCostCenterID: $('#slCostCenter').val(),
                    pIsSpareParts: "false",
                    pFiscalYearID: "0",
                    pSupplierID: "0",
                    pParentID: "0",
                    pTransactionTypeID: "110",
                    pJV_ID: (RollBackData.JV_ID == null ? "0" : RollBackData.JV_ID), pIsOutOfStore: (RollBackData.IsOutOfStore == null ? "false" : RollBackData.IsOutOfStore)
                    , pMaterialIssueRequesitionsID: 0,
                    pToStoreID: 0,
                    pP_ProductionRequestID: 0,
                    pP_UnitID: 0,
                    pP_ItemID: 0,
                    pP_LineID: 0,
                    pP_Qty: 0,
                    pP_FinishedDate: "01/01/1800",
                    pP_StartDate: "01/01/1800",
                    pEntitlementDays: 0,
                    pIsClosed: false,
                    pFromStore: $('#slStores').val(),
                    pJV_ID2: 0,
                    pTransferParentID: 0,
                    pForwardingPSInvoiceID: "0",
                    pOperationID: "0",
                    pBranchID: "0",
                    pIsFromFlexi: "false"
                    , pTrailerID: "0",
                    pEquipmentID: "0",
                    pDivisionID: "0" 
                }, pSaveandAddNew, null, '#hID', function () {

                    InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                        JSON.stringify(SetArrayOfItems())
                        , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                            FadePageCover(true)
                            $('#txtCode').val(Code[1]);
                            PrintTransaction();

                            console.log(Code[0]);
                            setTimeout(function () {
                                SC_Transactions_LoadingWithPaging();
                                //  IntializeData();
                                ClearAllTableRows('tblItems');
                                all_has_store = false;

                            }, 500);

                        });
                });
        }
        else {
            swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
        }
    }, 30);
}

function CopyStores() {
    if ($('#tblItems > tbody > tr').length > 0) {

        $('#tblItems > tbody > tr').each(function (i, tr) {
            $(tr).find('.selectstore').val($('#slStores').val());

        });


    }

}



function IntializeData(callback) {
    FadePageCover(true);
    all_has_store = false;
    RowsCounter = 0;
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');

    $('#tblItems > tbody').html('');
    // $('#txtFromDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtToDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    //  $("#slPSInvoices").prop('disabled', false);
    // $("#hID").val("");
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Transactions/IntializeData",
        data: { pTransactionTypeID: "110", pID: ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {

            Fill_SelectInputAfterLoadData_WithMultiAttr(d[3], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '', 'ItemUnits');
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'StoreName', '<-- select Store -->', '#slStores', '');
            Fill_SelectInputAfterLoadData(d[1], 'ID', 'CostCenterName', '<-- SELECT Cost Center -->', '#slCostCenter', '');
            if (typeof callback != "undefined") { callback(); }
            ////hidden_slstoresnames

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function SC_Transactions_Delete() {
    swal({
        title: "Are you sure?",
        text: "This Transaction will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {

            InsertUpdateFunction("form", "/api/SC_Transactions/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 08:00:00 PM" }
                , false, "SC_TransactionsModal", function (data) {
                    if (data[1].trim() == '') {
                        SC_Transactions_LoadingWithPaging();
                        IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });



            // DeleteListFunction("/api/SC_Transactions/Delete", { "pSC_TransactionsIDs": GetAllSelectedIDsAsString('tblSC_Transactions') }, function () {  });
        });

}


function PrintTransaction() {
    FadePageCover(true)
    var pReportTitle = "Settlement - تسويـة المخازن ";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>Item</th><th>Unit</th><th>Cost Price</th><th>Expected Qty</th><th>ACtual Qty</th><th>Quantity</th><th>Store</th><th>Notes</th></thead>';
    pTablesHTML += '<tbody>';
    var Sum = 0;
    $('#tblItems > tbody > tr').each(function (i, tr) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + $(tr).find('td.ItemID ').find('.selectitem option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.UnitID ').find('.selectunit option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.AveragePrice ').find('.inputprice').val() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.OriginalQty ').find('.inputquantity').val() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.ActualQty ').find('.inputquantity').val() + '</td>';
        pTablesHTML += '<td>' + (parseFloat($(tr).find('td.OriginalQty ').find('.inputquantity').val()) - parseFloat($(tr).find('td.ActualQty ').find('.inputquantity').val())) + '</td>';
        // pTablesHTML += '<td>' + $(tr).find('td.Qty ').find('.inputquantity').val() * 1 * $(tr).find('td.AveragePrice ').find('.inputprice').val() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.StoreID').find('.selectstore option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Notes ').find('.inputnotes').val() + '</td>';
        pTablesHTML += '</tr>';
        //  Sum = Sum + ($(tr).find('td.Qty ').find('.inputquantity').val() * 1 * $(tr).find('td.AveragePrice ').find('.inputprice').val());


        //if ($('#tblItems > tbody > tr').length - 1 == i) {

        //    pTablesHTML += '<tr>';
        //    pTablesHTML += '<td>' + '' + '</td>';
        //    pTablesHTML += '<td>' + '' + '</td>';
        //    pTablesHTML += '<td>' + '' + '</td>';
        //    pTablesHTML += '<td><b>' + 'Total Cost Price' + '</b></td>';
        //    pTablesHTML += '<td><b>' + Sum + '</b></td>';
        //    pTablesHTML += '<td>' + '' + '</td>';
        //    pTablesHTML += '<td>' + '' + '</td>';

        //    pTablesHTML += '</tr>';
        //}


    });
    pTablesHTML += '</tbody>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:110px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';

    ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
    ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '         <div id="Reportbody">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

    ReportHTML += '                 <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>Code: </b> ' + $('#txtCode').val() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>Store: </b> ' + $('#slStores option:selected').text() + '</div>';

    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                 <div class="col-xs-12"><b>Notes : </b> ' + $('#txtNotes').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += '         </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:110%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();
    FadePageCover(false)
}


// calling this function for update




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
//after pressing edit, this function fills the data
function SC_Transactions_FillControls(pID) {
    debugger;
    $("#hID").val(pID);
    IntializeData(function () {
        FadePageCover(true)
        //if (($(tr).find("td.MaterialIssueRequesitionsID").attr('val') != "0" && $(tr).find("td.slInvoices").attr('val') != "0") || $(tr).find("td.MaterialIssueRequesitionsID").attr('val') != "0") {
        //    $("#cbIsFromInvoice").prop("checked", false);

        //}
        //else {
        //    $("#cbIsFromInvoice").prop("checked", true);
        //}

        //SC_Transactions_ClearAllControls();
        //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
        //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
        //ClearAll("City-form", null);
        setTimeout(function () {
            ClearAll("#SC_TransactionsModal", null);
            $('#btnPrint2').removeClass('hide');
            $('#btn-Delete2').removeClass('hide');

            $("#hID").val(pID);
            var tr = $("#tblSC_Transactions > tbody > tr[ID='" + pID + "']");
            // $("#slInvoices").val($('#slPSInvoices_Filter').html());
            $("#txtCode").val($(tr).find("td.Code").attr('val').toUpperCase());

            // if ($(tr).find("td.FromStore").attr('val') == "0" || $(tr).find("td.FromStore").attr('val') )
            $('#slStores').val($(tr).find("td.FromStore").attr('val'));
            // $("#slPSInvoices").prop('disabled', true);
            $("#slCostCenter").val($(tr).find("td.CostCenterID").attr('val'));
            $("#txtDate").val($(tr).find("td.TransactionDate").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
            //  $("#slCostCenterID").val($(tr).find("td.CostCenterID").attr('val'));
            $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
            $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");
            setTimeout(function () {
                LoadTransactionsDetails();
                FadePageCover(false)
            }, 300);

        }, 500);
        RollBackData.ID = pID;
        RollBackData.CodeManual = $(tr).find("td.CodeManual").attr('val');
        RollBackData.Code = $(tr).find("td.Code").attr('val');
        console.log("Old Date :" + $(tr).find("td.TransactionDate").attr('val'))
        RollBackData.TransactionDate = ConvertDateFormat($(tr).find("td.TransactionDate").attr('val'));
        RollBackData.PurchaseInvoiceID = $(tr).find("td.PurchaseInvoiceID").attr('val');
        RollBackData.PurchaseOrderID = $(tr).find("td.PurchaseOrderID").attr('val');
        RollBackData.ExaminationID = $(tr).find("td.ExaminationID").attr('val');
        RollBackData.IsApproved = $(tr).find("td.IsApproved").attr('val');
        // IsApproved
        RollBackData.Notes = $(tr).find("td.Notes").attr('val');
        RollBackData.SLInvoiceID = $(tr).find("td.SLInvoiceID").attr('val');
        RollBackData.DepartmentID = $(tr).find("td.DepartmentID").attr('val');
        RollBackData.ClientID = $(tr).find("td.ClientID").attr('val');
        RollBackData.CostCenterID = $(tr).find("td.CostCenterID").attr('val');
        RollBackData.IsSpareParts = $(tr).find("td.IsSpareParts").attr('val');
        RollBackData.FiscalYearID = $(tr).find("td.FiscalYearID").attr('val');
        RollBackData.SupplierID = $(tr).find("td.SupplierID").attr('val');
        RollBackData.ParentID = $(tr).find("td.ParentID").attr('val');
        RollBackData.TransactionTypeID = $(tr).find("td.TransactionTypeID").attr('val');
        RollBackData.JV_ID = $(tr).find("td.JV_ID").attr('val');
        RollBackData.IsOutOfStore = $(tr).find("td.IsOutOfStore").attr('val');


        RollBackData.MaterialIssueRequesitionsID = $(tr).find("td.MaterialIssueRequesitionsID").attr('val');
        RollBackData.ToStoreID = $(tr).find("td.ToStoreID").attr('val');
        RollBackData.P_ProductionRequestID = $(tr).find("td.P_ProductionRequestID").attr('val');
        RollBackData.P_UnitID = $(tr).find("td.P_UnitID").attr('val');
        RollBackData.P_ItemID = $(tr).find("td.P_ItemID").attr('val');
        RollBackData.P_LineID = $(tr).find("td.P_LineID").attr('val');
        RollBackData.P_Qty = $(tr).find("td.P_Qty").attr('val');
        RollBackData.P_FinishedDate = $(tr).find("td.P_FinishedDate").attr('val');
        RollBackData.P_StartDate = $(tr).find("td.P_StartDate").attr('val');
        RollBackData.EntitlementDays = $(tr).find("td.EntitlementDays").attr('val');
        RollBackData.IsClosed = $(tr).find("td.IsClosed").attr('val');
        RollBackData.FromStore = $(tr).find("td.FromStore").attr('val');


        RollBackData.JV_ID2 = $(tr).find("td.JV_ID2").attr('val');
        RollBackData.TransferParentID = $(tr).find("td.TransferParentID").attr('val');
        RollBackData.ForwardingPSInvoiceID = $(tr).find("td.ForwardingPSInvoiceID").attr('val');


        RollBackData.OperationID = $(tr).find("td.OperationID").attr('val');
        RollBackData.BranchID = $(tr).find("td.BranchID").attr('val');
        RollBackData.IsFromFlexi = $(tr).find("td.IsFromFlexi").attr('val');


        RollBackData.TrailerID = $(tr).find("td.TrailerID").attr('val');
        RollBackData.EquipmentID = $(tr).find("td.EquipmentID").attr('val');
        RollBackData.DivisionID = $(tr).find("td.DivisionID").attr('val');

    });




}

//function SC_Transactions_Delete(pID)
//{
//    DeleteListFunction("/api/CRM_ActionDetails/DeleteByID", { "pID": pID }, function () { SC_Transactions_LoadingWithPaging($('#hID').val()) });
//}




function SC_Transactions_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SC_TransactionsModal", null);
    $("#btnSave").attr("onclick", "SC_Transactions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SC_Transactions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val(TranslateString("Auto"));
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());


    IntializeData();

}





//#region header

//#endregion header




//#region details







function AddNewRow() {
    debugger;
    // $("#hl-menu-SC").parent().addClass("active");
    // ClearAllTableRows("tblItems");
    // $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    AppendRowtoTable("tblItems",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (RowsCounter + 1) + "' value='" + 0 + "'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (RowsCounter + 1) + "'> <button  tag='0' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-DeleteDetails btn-danger'><i class='fa fa-trash-o'></i></button><button  type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-UndoDeleteDetails btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

            + "<td class='ItemID' val='" + "0" + "'>" + "<select onchange='SetItemUnit(this);CalcQtyAndAveragePrice(false);'  tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
            + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (RowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
            + "<td class='StoreID' val='" + "0" + "'>" + "<select disabled='disabled' onchange='CalcQtyAndAveragePrice(false);' id='store-" + (RowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
            + "<td class='OriginalQty' val='" + "0" + "'>" + "<input type='number' disabled='disabled' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='ActualQty' val='" + "0" + "'>" + "<input onchange='CalcQtyAndAveragePrice(true);' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='Qty' val='" + "0" + "'>" + "&nbsp;<span style='color:blue;font-size:2rem;' class='eql col-sm-4 hide fa fa-check'></span>&nbsp;&nbsp;<span style='color:orange;font-size:2rem;' class='yes col-sm-4 hide fa fa-plus'></span>&nbsp;<span style='color:red;font-size:2rem;' class='no col-sm-4 hide fa fa-minus'></span>&nbsp;<span style='color:black;font-size:2rem;' class='difference'></span>&nbsp;<input type='number' disabled='disabled' class='inputquantity input-sm  col-sm-5'>" + "</td>"
            + "<td class='AveragePrice hide' val='" + "0" + "'>" + "<input type='number' disabled='disabled' class='inputprice input-sm  col-sm'>" + "</td>"
            + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
            + "<td class='QuantityInStore hide' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
            + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='CurrencyID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='ExchangeRate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SLInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='P_ExoectedQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"

            + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='QtyFactor hide' val='" + "1" + "'>" + "1" + "</td>"

            + "<td class='TransactionTypeID hide' val='" + "110" + "'>" + "0" + "</td>"
            + "</tr>"));

    RowsCounter++;





    setTimeout(function () {
        CopyStores();
    }, 300);



    $("select.selectitem").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '110%' }).select2();
            $(sl).addClass('IsAutoSelect');

            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });






}





function LoadTransactionsDetails() {
    debugger;
    if ($('#hID').val() == "" || $('#hID').val() == "0") {
        // LoadAll("/api/SC_Transactions/LoadItems", " where D_ItemID is not null and ID = " + $('#slInvoices').val() + " and D_RemainedQuantity > 0 and 20 = 20", function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });

    }
    else {
        LoadAll("/api/SC_Transactions/LoadItems", "where TransactionID = " + $('#hID').val(), function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });

    }
    //[SL_InvoicesDetails
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    // HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}


function SC_TransactionsDetails_BindTableRows(pItems) {
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        debugger; //item.

        var disable = "";
        AppendRowtoTable("tblItems",
            ("<tr isdeleted='0' ID='" + item.ID + "'  counter='" + (RowsCounter + 1) + "' value='" + item.ID + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button tag='" + item.ID + "'   type='button' onclick='DeleteItems(this);' class='btn btn-DeleteDetails btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button  type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-UndoDeleteDetails btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select onchange='SetItemUnit(this);CalcQtyAndAveragePrice(false);'  id='Item-" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem " + disable + "'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select onchange='CalcQtyAndAveragePrice(false);' disabled='disabled'  id='store-" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm  col-sm " + disable + " selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='OriginalQty' val='" + (typeof item.OriginalQty === 'undefined' ? item.OriginalQty : item.OriginalQty) + "'>" + "<input disabled='disabled' tag='" + (typeof item.OriginalQty === 'undefined' ? item.OriginalQty : item.OriginalQty) + "' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
                + "<td class='ActualQty' val='" + (typeof item.ActualQty === 'undefined' ? item.ActualQty : item.ActualQty) + "'>" + "<input onblur='CalcQtyAndAveragePrice(true);' disabled='disabled' tag='" + (typeof item.ActualQty === 'undefined' ? item.ActualQty : item.ActualQty) + "' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
                + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_RemainedQuantity : item.Qty) + "'>" + "&nbsp;<span style='color:blue;font-size:2rem;' class='eql col-sm-4 hide fa fa-check'></span>&nbsp;&nbsp;&nbsp;<span  style='color:orange;font-size:2rem;' class='yes hide col-sm-4 fa fa-plus'></span>&nbsp;<span style='color:red;font-size:2rem;' class='no hide col-sm-4 fa fa-minus'></span>&nbsp;<span style='color:black;font-size:2rem;' class='difference'></span>&nbsp;<input disabled='disabled' tag='" + (typeof item.Qty === 'undefined' ? item.D_RemainedQuantity : item.Qty) + "' type='number' class='inputquantity input-sm  col-sm-5'>" + "</td>"
                + "<td class='AveragePrice hide' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Total * item.ExchangeRate) : item.AveragePrice) + "'>" + "<input tag='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Total * item.ExchangeRate) : item.AveragePrice) + "' type='number' class='inputprice input-sm  col-sm'>" + "</td>"
                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='QuantityInStore hide' val='" + (typeof item.D_ID === 'undefined' ? item.ID : item.D_ID) + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? item.D_ID : item.SLInvoiceDetailsID) + "'>" + (typeof item.SLInvoiceDetailsID === 'undefined' ? item.D_ID : item.SLInvoiceDetailsID) + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='P_ExpectedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"

                + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='QtyFactor hide' val='" + "1" + "'>" + "1" + "</td>"

                + "<td class='TransactionTypeID hide' val='" + "110" + "'>" + "110" + "</td>"
                + "</tr>"));
        RowsCounter++;
    });
    ApplyPermissions();
    //  BindAllCheckboxonTable("tblSC_Transactions", "ID");
    //  CheckAllCheckbox("ID");
    //  HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {
        FillStores();
        SC_HideShowEditBtns(_IsApproved);
        CalcQtyAndAveragePrice(false);
    }, 1100);

}



function SetArrayOfItems() {
    // var cobjItem = null;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = "0";
        objItem.TransactionID = $('#hID').val();
        objItem.ItemID = $(tr).find('td.ItemID ').find('.selectitem').val(); //$(tr).find('td.ItemID').attr('val');

        objItem.StoreID = $(tr).find('td.StoreID ').find('.selectstore').val();
        objItem.ReturnedQty = "0";
        objItem.CurrencyID = $(tr).find('td.CurrencyID').attr('val');
        objItem.ExchangeRate = $(tr).find('td.ExchangeRate').attr('val');
        if (i == 0) {
            objItem.Notes = ($('#txtNotes').val() == "" || $('#txtNotes').val() == null ? "0" : $('#txtNotes').val());
        }
        else {
            objItem.Notes = ($(tr).find('td.Notes').text() == "" ? "-" : $(tr).find('td.Notes').text().trim());
        }
        //objItem.Notes = ($(tr).find('td.Notes ').find('.inputnotes').val().trim() == "" ? "-" : $(tr).find('td.Notes ').find('.inputnotes').val().trim());
        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = "0";
        objItem.SubAccountID = "0";
        objItem.OriginalQty = $(tr).find('td.OriginalQty ').find('.inputquantity').val();
        objItem.ParentID = "0";
        objItem.AveragePrice = $(tr).find('td.AveragePrice ').find('.inputprice').val(); //($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim()); //AveragePrice
        objItem.TransactionDate = ConvertDateFormat($('#txtDate').val());
        objItem.QtyFactor = (parseFloat($(tr).find('td.OriginalQty ').find('.inputquantity').val()) > parseFloat($(tr).find('td.ActualQty ').find('.inputquantity').val()) ? "-1" : "1");
        objItem.ActualQty = $(tr).find('td.ActualQty ').find('.inputquantity').val();
        objItem.TransactionTypeID = "110";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = $(tr).find('td.Qty ').find('.inputquantity').val(); // quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty ').find('.inputquantity').val();  // inserted quantity
        objItem.UnitFactor = 1;

        objItem.FlexiSerialID = ($(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == "" || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == undefined || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == null) ? 0 : $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val();

        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = "0";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        objItem.AvaliableQty = 0;
        objItem.P_Percentage = 0;
        objItem.P_Density = 0;
        objItem.ToStoreID = 0;
        objItem.P_LiterCost = 0;
        objItem.P_ExpectedQty = 0;
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        arrayOfItems.push(objItem);

    });
    return arrayOfItems;
}



function SetItemUnit(ItemSelect) {
    try {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");




        var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');
        //if (UnitID == 0 || UnitID == "0")
        //  {
        var a = Units.indexOf("-1");
        $(SelectUnit).val(Units[a - 1]);
    }
    catch (ex) {

        console.log("NO Units")
    }





    //    }

}




function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
    }
    else {
        swal({
            title: "Are you sure?",
            text: "The selected  will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                $(This).closest('tr').remove();
            });
    }
}
function FillStores() {

    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        // element == this
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));

        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));

        $(tr).find('td.AveragePrice ').find('.inputprice').val($(tr).find('td.AveragePrice  ').find('.inputprice').attr('tag'));

        // $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));


        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        var sl = $(tr).find('td.ItemID ').find('.selectitem');
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '110%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }




        $(tr).find('td.Qty ').find('.inputquantity').val($(tr).find('td.Qty  ').find('.inputquantity').attr('tag'));
        $(tr).find('td.ActualQty ').find('.inputquantity').val($(tr).find('td.ActualQty  ').find('.inputquantity').attr('tag'));
        $(tr).find('td.OriginalQty ').find('.inputquantity').val($(tr).find('td.OriginalQty  ').find('.inputquantity').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
        //   $(tr).find('td.UnitID ').find('.selectitem').prop('disabled', true);
    });

}


function GetItemQuantityInStore(Calculate_btn) {
    FadePageCover(true);
    var tr = $(Calculate_btn).closest('tr');
    //  $(Calculate_btn).siblings('.span_quantity').attr('counter')
    var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
    var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();

    if (storeid.trim() == "0" || itemid.trim() == "0") {

        swal('Excuse me', 'select Item and Store', 'warning');
        FadePageCover(false);
    }
    else {
        //GetItemQuantityInStore(string pItemID , string pStoreID , DateTime pDate)
        $.ajax({
            type: "Get",
            url: "/api/SC_Transactions/CalculateItemQuantityInStore",
            data: { pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtDate').val()), pTransactionID: ($('#hID').val().trim() == "" ? "0" : $('#hID').val().trim()) },
            dataType: "json",
            success: function (r) {
                // $(tr).find('.QuantityInStore').html();
                $(tr).find('.QuantityInStore').find('.span_quantity').html("&nbsp;&nbsp;&nbsp;<b>" + r[0] + "</b>");
                FadePageCover(false);
                //span_quantity
            }
        });
    }

}




function CalcQtyAndAveragePrice(IsDifference) {

    FadePageCover(true);
    $('#tblItems > tbody tr').each(function (i, tr) {


        if (typeof IsDifference !== "undefined" && IsDifference == true) {
            CalcDifference(tr);
        }
        else {
            var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
            var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
            if (storeid.trim() == "0" || itemid.trim() == "0") {

                //  swal('Excuse me', 'select Item and Store', 'warning');
                FadePageCover(false);
            }
            else {
                //GetItemQuantityInStore(string pItemID , string pStoreID , DateTime pDate)
                $.ajax({
                    type: "Get",
                    url: "/api/SC_Transactions/CalcItemQtyAndAveragePrice",
                    data: {
                        pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtDate').val()),
                        pTransactionID: ($('#hID').val().trim() == "" ? "0" : $('#hID').val().trim()), IsSpecialStore: false
                    },
                    dataType: "json",
                    success: function (r) {
                        $(tr).find('td.OriginalQty ').find('.inputquantity').val(r[0]);
                        $(tr).find('td.AveragePrice ').find('.inputprice').val(r[1]);
                        CalcDifference(tr);

                        FadePageCover(false);
                        //&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-plus'></span>&nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-minus'></span>&nbsp;<span style='color:black;font-size:2rem;' class='difference'></span>"
                    }
                });
            }
        }




    });
    setTimeout(function () {
        FadePageCover(false);
    }, 200);
}



function CalcDifference(tr) {

    var Original = parseFloat(($(tr).find('td.OriginalQty ').find('.inputquantity').val() == "" ? "0" : $(tr).find('td.OriginalQty ').find('.inputquantity').val()));
    var Actual = parseFloat(($(tr).find('td.ActualQty ').find('.inputquantity').val() == "" ? "0" : $(tr).find('td.ActualQty ').find('.inputquantity').val()));
    var Qty = Original - Actual;
    $(tr).find('td.Qty ').find('.inputquantity').val(Math.abs(Qty));

    if (Qty < 0) {

        $(tr).find('td.Qty ').find('span.yes').removeClass('hide');
        $(tr).find('td.Qty ').find('span.no').addClass('hide');
        $(tr).find('td.Qty ').find('span.eql').addClass('hide');
    }
    else if (Qty > 0) {
        $(tr).find('td.Qty ').find('span.no').removeClass('hide');
        $(tr).find('td.Qty ').find('span.yes').addClass('hide');
        $(tr).find('td.Qty ').find('span.eql').addClass('hide');
    }
    else {
        $(tr).find('td.Qty ').find('span.no').addClass('hide');
        $(tr).find('td.Qty ').find('span.yes').addClass('hide');
        $(tr).find('td.Qty ').find('span.eql').removeClass('hide');
    }
    FadePageCover(false);


    $(tr).find('td.OriginalQty ').find('.inputquantity').val(($(tr).find('td.OriginalQty ').find('.inputquantity').val() == "" ? "0.00" : $(tr).find('td.OriginalQty ').find('.inputquantity').val()));
    $(tr).find('td.ActualQty ').find('.inputquantity').val(($(tr).find('td.ActualQty ').find('.inputquantity').val() == "" ? "0.00" : $(tr).find('td.ActualQty ').find('.inputquantity').val()));


}


function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    console.log(pParametersWithValues);
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {
                        debugger;

                        CallbackHeaderData();


                        swal(strSorry, data[1]);




                    }
                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}



function CallbackHeaderData() {
    debugger;
    if (IsInsert) {
        DeleteListFunction("/api/SC_Transactions/Delete", { "pTransactionsID": $("#hID").val(), "pTransactionDate": ConvertDateFormat($('#txtDate').val()) + " 11:00:00 PM" }, function () { console.log("************* Is Rolled Back *********************** "); });

    }
    else {

        console.log("Old Date2 :" + RollBackData.TransactionDate)
        InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
            pID: RollBackData.ID,
            pCode: RollBackData.Code,
            pCodeManual: RollBackData.CodeManual,
            pTransactionDate: RollBackData.TransactionDate,
            pPurchaseInvoiceID: RollBackData.PurchaseInvoiceID,
            pPurchaseOrderID: RollBackData.PurchaseOrderID,
            pExaminationID: RollBackData.ExaminationID,
            pIsApproved: RollBackData.IsApproved,
            pNotes: RollBackData.Notes,
            pSLInvoiceID: RollBackData.SLInvoiceID,
            pDepartmentID: RollBackData.DepartmentID,
            pClientID: RollBackData.ClientID,
            pCostCenterID: RollBackData.CostCenterID,
            pIsSpareParts: RollBackData.IsSpareParts,
            pFiscalYearID: RollBackData.FiscalYearID,
            pSupplierID: RollBackData.SupplierID,
            pParentID: RollBackData.ParentID,
            pTransactionTypeID: RollBackData.TransactionTypeID,
            pJV_ID: RollBackData.JV_ID,
            pIsOutOfStore: RollBackData.IsOutOfStore

            , pMaterialIssueRequesitionsID: RollBackData.MaterialIssueRequesitionsID
            , pToStoreID: RollBackData.ToStoreID
            , pP_ProductionRequestID: RollBackData.P_ProductionRequestID
            , pP_UnitID: RollBackData.P_UnitID
            , pP_ItemID: RollBackData.P_ItemID
            , pP_LineID: RollBackData.P_LineID
            , pP_Qty: RollBackData.P_Qty
            , pP_FinishedDate: "01/01/1800"
            , pP_StartDate: "01/01/1800"
            , pEntitlementDays: RollBackData.EntitlementDays
            , pIsClosed: RollBackData.IsClosed
            , pFromStore: RollBackData.FromStore
            , pJV_ID2: RollBackData.JV_ID2
            , pTransferParentID: RollBackData.TransferParentID
            , pForwardingPSInvoiceID: RollBackData.ForwardingPSInvoiceID
            , pOperationID: RollBackData.OperationID
            , pBranchID: RollBackData.BranchID
            , pIsFromFlexi: RollBackData.IsFromFlexi
            , pTrailerID: RollBackData.TrailerID
            , pEquipmentID: RollBackData.EquipmentID
            , pDivisionID: RollBackData.DivisionID
        }, true, null, '#hID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}

//#endregion details

