// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var RowsCounter = 0;
var IsInsert = true;
var TransTypeID = 80;
var _IsApproved = false;
var _HasChildren = false;
var RollBackData = {};





$(document).ready(function () {
    CheckIfAllLoading();


    $("#txtDate").datepicker().on('changeDate'
        , function () {
            $(this).datepicker('hide');
            GetItemQuantityInStore();

        });
    $("#txtDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });

});



function CheckIfAllLoading() {
    if (typeof $('#slFromStore option') === "undefined" || $('#slFromStore option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}



var _isConfirm = 0;
function SC_Transactions_Approve(pSelectedIDs, ID) {
    debugger;

    if (ID == 1) {

        CallGETFunctionWithParameters("/api/SC_Transactions/IsConfirm"
            , { pSelectedIDs: pSelectedIDs, pApproved: true }
            , function (pData) {
                if (pData[0]) {
                    SC_Transactions_LoadingWithPaging();
                    swal("Success", "Saved successfully", "success");


                }
                else {
                    swal("Sorry", JSON.parse(pData[1]), "warning");

                }
            }
            , null);
    }

    if (ID == 2) {

        $.ajax({
            type: "GET",
            url: strServerURL + "/api/SC_Transactions/CheckBalanceByAbdoo",
            data: { pID: pSelectedIDs },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                debugger;
                if (JSON.parse(d[0]) == true) {
                    /////--------------------------------

                    CallGETFunctionWithParameters("/api/SC_Transactions/IsConfirm"
                        , { pSelectedIDs: pSelectedIDs, pApproved: false }
                        , function (pData) {
                            if (pData[0]) {
                                SC_Transactions_LoadingWithPaging();
                                swal("Success", "Saved successfully", "success");

                            }
                            else {
                                swal("Sorry", JSON.parse(pData[1]), "warning");

                            }
                        }
                        , null);




                    /////--------------------------------
                }
                else {
                    swal("Sorry", "لايمكنك اتمام العملية لعدم وجود رصيد كافي للاصناف ", "warning");

                }



            },

            error: function (jqXHR, exception) {
                debugger;
                swal("عذراً", "لايمكنك فك الاعتماد لعدم وجود رصيد كافي للاصناف ", "error");

            }
        });
    }



    // var pSelectedIDs = GetAllSelectedIDsAsString("tblSC_Transactions");



}




//#region Header
function SC_Transactions_BindTableRows(pSC_Transactions) {
    debugger;





    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");


    if (pDefaults.UnEditableCompanyName == "EGL") {

        $('.table-responsiveHeader').addClass('hide');
        $('.table-responsiveEGL').removeClass('hide');

        $.each(pSC_Transactions, function (i, item) {
            debugger;
            //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
            AppendRowtoTable("tblSC_TransactionsEGL",
                ("<tr ID='" + item.ID + "' ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + " , " + item.HasChildren + "); '>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                    + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                    + "<td class='FromStore ' val='" + item.FromStore + "'>" + item.FromStoreName + "</td>"
                    + "<td class='ToStoreID ' val='" + item.ToStoreID + "'>" + item.ToStoreName + "</td>"
                    // + "<td class='HasChildren'> <input type='checkbox' disabled='disabled' val='" + (item.HasChildren == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsConfirm'> <input type='checkbox' disabled='disabled' val='" + (item.isconfirm == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsConfirm'>    <button type='button' class='btn btn-primary btn-sm Edit-btn' val='" + (item.isconfirm == true ? "'disabled='disabled''" : "'") + " style ='height: 35px; width: 100%; text-align: center;      'onclick='SC_Transactions_Approve(" + item.ID + " , " + 1 + ");'><i></i>  اعتـــــماد </button> </td > "
                    + "<td class='IsNotConfirm'> <button type='button' class='btn btn-sm btn-danger Edit-btn' val='" + (item.isconfirm == false ? "' disabled='disabled''" : "'") + "      style ='height: 35px; width: 100%; text-align: center;'onclick='SC_Transactions_Approve(" + item.ID + " , " + 2 + ");'><i></i>  الغاء الاعتمـــاد </button> </td > "
                    
                    //< button  onclick = 'SC_Transactions_Approve(1)  val='" + (item.isconfirm == true ? "true' disabled='disabled'" : "'") + " />


                    //   + "<td class='IsConfirm'> <button  onclick='SC_Transactions_Approve(2)  val='" + (item.isconfirm == false ? "true' disabled='disabled''" : "'") + " /></td>"
                    + "<td class='TransferParentID' val='" + item.TransferParentID + "'>" + item.ParentTransCode + "</td>"
                    + "<td class='MaterialIssueRequesitionsID ' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialRequestCode + "</td>"
                    + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
                    + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                    + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
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


                    + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                    + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                    + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                    + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                    + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                    + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                    + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                    + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                    + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"

                    + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"

                    + "<td class='TrailerID hide' val='" + item.TrailerID + "'>" + item.TrailerName + "</td>"
                    + "<td class='EquipmentID hide' val='" + item.EquipmentID + "'>" + item.EquipmentName + "</td>"
                    + "<td class='DivisionID hide' val='" + item.DivisionID + "'>" + item.DevisonName + "</td>"
                    + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                    + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"

                    + '<td class= "pPrintTransaction" > <a href="#" onclick="PrintInvoice(' + item.ID + ');" class="btn btn-xs btn-rounded btn-lightblue float-right" title="Edit"> <i class="fa fa-print" style="padding-left: 5px;"></i> <span style="padding-right: 5px;"> Print طباعه </span></a> </td>'


                    + "<td class='Amount hide' val='" + item.Amount + "'>" + item.Amount + "</td>"
                    + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                    + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
                    + "<td class='hSC_Transactions hide'><a href='#SC_TransactionsModal' data-toggle='modal' onclick='SC_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        });

    }
    else {

        $('.table-responsiveEGL').addClass('hide');
        $('.table-responsiveHeader').removeClass('hide');
        $.each(pSC_Transactions, function (i, item) {
            debugger;
            //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
            AppendRowtoTable("tblSC_Transactions",
                ("<tr ID='" + item.ID + "' ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + " , " + item.HasChildren + "); '>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                    + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                    + "<td class='FromStore ' val='" + item.FromStore + "'>" + item.FromStoreName + "</td>"
                    + "<td class='ToStoreID ' val='" + item.ToStoreID + "'>" + item.ToStoreName + "</td>"
                    + "<td class='HasChildren'> <input type='checkbox' disabled='disabled' val='" + (item.HasChildren == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='TransferParentID' val='" + item.TransferParentID + "'>" + item.ParentTransCode + "</td>"
                    + "<td class='MaterialIssueRequesitionsID ' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialRequestCode + "</td>"
                    + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
                    + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                    + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                    + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
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


                    + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                    + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                    + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                    + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                    + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                    + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                    + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                    + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                    + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"

                    + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"

                    + "<td class='TrailerID hide' val='" + item.TrailerID + "'>" + item.TrailerName + "</td>"
                    + "<td class='EquipmentID hide' val='" + item.EquipmentID + "'>" + item.EquipmentName + "</td>"
                    + "<td class='DivisionID hide' val='" + item.DivisionID + "'>" + item.DevisonName + "</td>"
                    + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                    + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"




                    + "<td class='Amount hide' val='" + item.Amount + "'>" + item.Amount + "</td>"
                    + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                    + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
                    + "<td class='hSC_Transactions hide'><a href='#SC_TransactionsModal' data-toggle='modal' onclick='SC_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        });

    }



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
function SC_Transactions_LoadingWithPaging() {
    debugger;
    ClearAllTableRows("tblSC_TransactionsEGL");

   

    var WhereClause = "Where TransactionTypeID = 80 AND ( IsDeleted = 0 or IsDeleted IS NULL )";

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

    debugger;
    if (pDefaults.UnEditableCompanyName == "EGL") {
        $('.table-responsiveHeader').addClass('hide');
        $('.table-responsiveEGL').removeClass('hide');
        
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithWhereClauseEGL", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
        HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());


    }

    else {
        $('.table-responsiveEGL').addClass('hide');
        $('.table-responsiveHeader').removeClass('hide');
        LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
        HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
    }

}



var all_has_store = false;






function SC_Transactions_Insert(pSaveandAddNew) {
    FadePageCover(true)
    IsInsert = true;
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        // var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
        var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
        var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
        if (quantityid.trim() == "" || quantityid.trim() == "0") {
            $(tr).remove();
        }
        if ($("#slFromStore").val() == "0" || $("#slToStore").val() == "0" || itemid.trim() == "0" || quantityid.trim() == "" || ($("#cbIsFromRequest").is(":checked") && $("#slMaterialIssueRequests").val() == "0")) {
            all_has_store = false;
            FadePageCover(false)
            return false;
        }

        if ($("#slToStore option:selected").attr("isbrokenstore") == "true" && ($('#slCostCenter').val() == "0" || $('#slCostCenter').val() == "0")) {
            all_has_store = false;
            FadePageCover(false)
            swal('Excuse me', 'Select Cost Center', 'warning');
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

            swal('Excuse me', 'Fill All Items , Quantity , Stores Or Request', 'warning');
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
                pSLInvoiceID: 0,
                pDepartmentID: "0",
                pClientID: 0,
                pCostCenterID: $("#slCostCenter").val(),
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: "0",
                pTransactionTypeID: "80",
                pJV_ID: "0", pIsOutOfStore: false, // ($("#cbIsFromInvoice").is(":checked") == true ? false : false),
                pMaterialIssueRequesitionsID: $("#slMaterialIssueRequests").val(),
                pToStoreID: $("#slToStore").val(),
                pP_ProductionRequestID: 0,
                pP_UnitID: 0,
                pP_ItemID: 0,
                pP_LineID: 0,
                pP_Qty: 0,
                pP_FinishedDate: "01/01/1800",
                pP_StartDate: "01/01/1800",
                pEntitlementDays: 0,
                pIsClosed: false,
                pFromStore: $("#slFromStore").val(),
                pJV_ID2: 0,
                pTransferParentID: $("#slVirtualStoreTrans").val(),
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

function SC_Transactions_EditByDblClick(pID, pIsApproved, pHasChildren) {
    _IsApproved = pIsApproved;
    _HasChildren = pHasChildren;
    jQuery("#SC_TransactionsModal").modal("show");
    SC_Transactions_FillControls(pID);
}

function SC_Transactions_FillControls(pID) {
    debugger;
    FadePageCover(true);
    ClearAll("#SC_TransactionsModal", null);
    $("#hID").val(pID);
    // SC_HideShowEditBtns();

    IntializeData(function () {
        setTimeout(function () {
            FadePageCover(false);
            if (pDefaults.UnEditableCompanyName == "EGL") {
            var tr = $("#tblSC_TransactionsEGL > tbody > tr[ID='" + pID + "']");
            }
            else {
            var tr = $("#tblSC_Transactions > tbody > tr[ID='" + pID + "']");
            }
        
            if ($(tr).find("td.MaterialIssueRequesitionsID ").attr('val') != "0") {

                console.log($(tr).find("td.MaterialIssueRequesitionsID ").attr('val'));
                $("#cbIsFromRequest").prop("checked", true);
            }
            else {
                console.log($(tr).find("td.MaterialIssueRequesitionsID ").attr('val'));
                $("#cbIsFromRequest").prop("checked", false);
            }

            //SC_Transactions_ClearAllControls();
            //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
            //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
            //ClearAll("City-form", null);

            $('#btnPrint2').removeClass('hide');
            $('#btn-Delete2').removeClass('hide');

            // $("#hID").val(pID);

            // $("#slInvoices").val($('#slPSInvoices_Filter').html());
            $("#txtCode").val($(tr).find("td.Code").attr('val'));
            // $("#slInvoices").val($(tr).find("td.SLInvoiceID").attr('val'));
            $("#slMaterialIssueRequests").val($(tr).find("td.MaterialIssueRequesitionsID").attr('val'));
            $("#slVirtualStoreTrans").val($(tr).find("td.TransferParentID").attr('val'));
            // $("#slPSInvoices").prop('disabled', true);
            $("#slCostCenter").val($(tr).find("td.CostCenterID").attr('val'));
            $("#txtDate").val($(tr).find("td.TransactionDate").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));


            $("#slFromStore").val($(tr).find("td.FromStore").attr('val'));
            $("#slToStore").val($(tr).find("td.ToStoreID").attr('val'));


            //  $("#slCostCenterID").val($(tr).find("td.CostCenterID").attr('val'));
            $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
            $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");
            setTimeout(function () {
                LoadTransactionsDetails();
            }, 300);


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


            RollBackData.OperationID = $(tr).find("td.OperationID").attr('val');
            RollBackData.BranchID = $(tr).find("td.BranchID").attr('val');
            RollBackData.IsFromFlexi = $(tr).find("td.IsFromFlexi").attr('val');

            RollBackData.TrailerID = $(tr).find("td.TrailerID").attr('val');
            RollBackData.EquipmentID = $(tr).find("td.EquipmentID").attr('val');
            RollBackData.DivisionID = $(tr).find("td.DivisionID").attr('val');

            RollBackData.JV_ID2 = $(tr).find("td.JV_ID2").attr('val');
            RollBackData.TransferParentID = $(tr).find("td.TransferParentID").attr('val');
            RollBackData.ForwardingPSInvoiceID = $(tr).find("td.ForwardingPSInvoiceID").attr('val');

        }, 1000);





    });




}



function SC_Transactions_Update(pSaveandAddNew) {
    IsInsert = true;
    FadePageCover(true)
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        // var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
        var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
        var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
        if (quantityid.trim() == "" || quantityid.trim() == "0") {
            $(tr).remove();
        }
        if ($("#slFromStore").val() == "0" || $("#slToStore").val() == "0" || itemid.trim() == "0" || quantityid.trim() == "" || ($("#cbIsFromRequest").is(":checked") && $("#slMaterialIssueRequests").val() == "0")) {
            all_has_store = false;
            FadePageCover(false)
            return false;
        }
        if ($("#slToStore option:selected").attr("isbrokenstore") == "true" && ($('#slCostCenter').val() == "0" || $('#slCostCenter').val() == "0")) {
            all_has_store = false;
            FadePageCover(false)
            swal('Excuse me', 'Select Cost Center', 'warning');
            return false;
        }
        else {
            all_has_store = true;
        }
    });



    setTimeout(function () {
        if ($('#tblItems > tbody > tr').length == 0) {
            swal('Excuse me', 'Fill Items', 'warning');
            FadePageCover(false)
        }
        else if (!all_has_store) {

            swal('Excuse me', 'Fill All Items , Quantity , Stores Or Request', 'warning');
            FadePageCover(false)

        }
        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
                pID: $("#hID").val(),
                pCode: $("#txtCode").val(),
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: 0,
                pDepartmentID: "0",
                pClientID: 0,
                pCostCenterID: $("#slCostCenter").val(),
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: "0",
                pTransactionTypeID: "80",
                pJV_ID: "0", pIsOutOfStore: false, // ($("#cbIsFromInvoice").is(":checked") == true ? false : false),
                pMaterialIssueRequesitionsID: ($("#slMaterialIssueRequests").val() == null ? 0 : $("#slMaterialIssueRequests").val()),
                pToStoreID: $("#slToStore").val(),
                pP_ProductionRequestID: 0,
                pP_UnitID: 0,
                pP_ItemID: 0,
                pP_LineID: 0,
                pP_Qty: 0,
                pP_FinishedDate: "01/01/1800",
                pP_StartDate: "01/01/1800",
                pEntitlementDays: 0,
                pIsClosed: false,
                pFromStore: $("#slFromStore").val(),
                pJV_ID2: 0,
                pTransferParentID: ($("#slVirtualStoreTrans").val() == null ? 0 : $("#slVirtualStoreTrans").val()),
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
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
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

//http://localhost:1425/api/SC_Transactions/Update?pID=3040&pCode=1&pCodeManual=0&pTransactionDate=12%2F29%2F2019&pPurchaseInvoiceID=0&pPurchaseOrderID=0&pExaminationID=0&pIsApproved=false&pNotes=0&pSLInvoiceID=0&pDepartmentID=0&pClientID=0&pCostCenterID=0&pIsSpareParts=false&pFiscalYearID=0&pSupplierID=0&pParentID=0&pTransactionTypeID=80&pJV_ID=0&pIsOutOfStore=false&pMaterialIssueRequesitionsID=3028&pToStoreID=2&pP_ProductionRequestID=0&pP_UnitID=0&pP_ItemID=0&pP_LineID=0&pP_Qty=0&pP_FinishedDate=01%2F01%2F1800&pP_StartDate=01%2F01%2F1800&pEntitlementDays=0&pIsClosed=false&pFromStore=1&pJV_ID2=0&pTransferParentID=&pForwardingPSInvoiceID=0

//#endregion Header


//#region print
function PrintTransaction() {
    FadePageCover(true)
    var pReportTitle = "Stores Transfer Vouchers - إذن تحويـــل من مخزن  ";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>Item</th><th>Quantity</th><th>Notes</th></thead>'
    pTablesHTML += '<tbody>';
    $('#tblItems > tbody > tr').each(function (i, tr) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + $(tr).find('td.ItemID ').find('.selectitem option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Qty ').find('.inputquantity').val() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Notes ').find('.inputnotes').val() + '</td>';
        pTablesHTML += '</tr>';
    });
    pTablesHTML += '</tbody>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
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
    ReportHTML += '                 <div class="col-xs-3"><b>From Store: </b> ' + $('#slFromStore option:selected').text() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>To Store: </b> ' + $('#slToStore option:selected').text() + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>Cost Center: </b> ' + $('#slCostCenter option:selected').text() + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                 <div class="col-xs-12"><b>Notes : </b> ' + $('#txtNotes').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += '         </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();
    FadePageCover(false)
}
//#endregion print 


//#region others
function SC_HideShowEditBtns(IsApproved, HasChildren) {
    $("#tblItems").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
    $("#tblItems").find(".inputquantity").prop("disabled", false);
    _IsApproved = IsApproved;
    _HasChildren = HasChildren;
    $("#slFromStore").prop("disabled", false);
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
        //   $('#slInvoices').prop('disabled', false);
        $('#slMaterialIssueRequests').prop('disabled', false);
        $('#slVirtualStoreTrans').prop('disabled', false);
        $('#cbIsFromRequest').prop('disabled', false);
        $('#btn-Items').removeClass('hide');
        $("#btn-Delete2").addClass("hide");
    }
    else // is [ Update ]
    {
        $('#txtDate').prop('disabled', true);
        // $('#slInvoices').prop('disabled', true);
        $('#slVirtualStoreTrans').prop('disabled', true);
        $('#slMaterialIssueRequests').prop('disabled', true);
        $('#btn-Items').addClass('hide');

        $('#cbIsFromRequest').prop('disabled', true);
    }
    // for [ All ]
    $('.selectitem').prop('disabled', true);
    $('.selectunit').prop('disabled', true);

    if ($('#cbIsFromRequest').is(":checked")) {
        $('.C_IsFromRequest').removeClass('hide');
        $('.C_IsFromVirtualStore').addClass('hide');


        $("#slFromStore").prop("disabled", false);
        $("#slToStore").prop("disabled", false);
        $("#slFromStore").val(($('#slMaterialIssueRequests option:selected').attr('fromstore') == null ? "0" : $('#slMaterialIssueRequests option:selected').attr('fromstore')));
        $("#slToStore").val(($('#slMaterialIssueRequests option:selected').attr('tostoreid') == null ? "0" : $('#slMaterialIssueRequests option:selected').attr('tostoreid')));

        $("#slFromStore").prop("disabled", true);
        $("#slToStore").prop("disabled", true);
        $("#slVirtualStoreTrans").val("0");
        //  $('.C_IsFromInvoice').removeClass('hide');
        // $('#btnCopyStores').removeClass('hide');
    }
    else {
        $('#slMaterialIssueRequests').val("0");
        // slVirtualStoreTrans
        if ($("#slVirtualStoreTrans").val() == null || $("#slVirtualStoreTrans").val().trim() == "0") {
            $("#slFromStore").prop("disabled", false);
            $("#slToStore").prop("disabled", false);
        }
        else {
            $("#slFromStore").prop("disabled", true);
            $("#slFromStore").val(($("#slVirtualStoreTrans option:selected").attr("tostoreid") == null ? "0" : $("#slVirtualStoreTrans option:selected").attr("tostoreid")));
            $("#slToStore").prop("disabled", false);

            $("#tblItems").find(".inputquantity").prop("disabled", true);
        }


        $('.C_IsFromRequest').addClass('hide');
        $('.C_IsFromVirtualStore').removeClass('hide');

    }


}

function ClearItemsTable() {
    $("#tblItems > body").html("");
}


function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}


function SC_SLItems_LoadAll() {
    debugger;
    LoadAll("/api/SC_Transactions/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    // HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}





function CopyStores() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectstore').val($('#slStores').val());
    }

}



function IntializeData(callback) {
    FadePageCover(true);
    all_has_store = false;
    RowsCounter = 0;
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');

    //  CHECK EGL COMPANY  
    if (pDefaults.UnEditableCompanyName == "EGL")
    {
        $('.table-responsiveHeader').addClass('hide');
        $('.table-responsiveEGL').removeClass('hide');

    }
    else {
        $('.table-responsiveEGL').addClass('hide');
        $('.table-responsiveHeader').removeClass('hide');

    }
    
  

    $('#tblItems > tbody').html('');
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Transactions/IntializeData",
        data: { pTransactionTypeID: "80", pID: ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'StoreName', '<-- select Store -->', '#slFromStore', '', 'IsBrokenStore,CostCenterID');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'StoreName', '<-- select Store -->', '#slToStore', '', 'IsBrokenStore,CostCenterID');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[3], 'ID', 'Code', '<-- select Material Issue Request -->', '#slMaterialIssueRequests', '', 'ClientID,FromStore,ToStoreID');
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'CostCenterName', '<-- SELECT Cost Center -->', '#slCostCenter', '');
            Fill_SelectInputAfterLoadData_WithAttr_Special(d[5], 'ID', 'Select Broken Stores Tran', '#slVirtualStoreTrans', '', 'ToStoreID');
            if (typeof callback != "undefined") { callback(); }
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function FillBrokenStoreTransCombo(Combo) {

    var CostCenterID = $(Combo).find("option:selected").attr("CostCenterID");



    $($('#slVirtualStoreTrans option')).each(function (i, option) {
        if (($(option).attr("CostCenterID") != $(Combo).find("option:selected").attr("CostCenterID")) && $(option).val() != "0") {

            $(option).addClass("hide");

        }
        else {
            $(option).removeClass("hide");

        }

    });





}
function Fill_SelectInputAfterLoadData_WithAttr_Special(data, ID_Name, Title, SelectInput_ID, Selected_ID, AttrItemName) {
    var option = "";
    //"Code", "FromStoreName", "ToStoreName", "TransactionDate", "IsApproved"

    if (Title != null)
        option += '<option ' + AttrItemName + ' = "' + 0 + '" value="' + 0 + '" selected "> ' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        var ItemName = "[ " + item.Code + " ]" + " " + item.FromStoreName + " > " + item.ToStoreName + " [ " + GetDateFromServer(item.TransactionDate) + " ] ";
        //  Item_Name
        if (item[ID_Name] == Selected_ID) {

            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '" selected CostCenterID="' + item['CostCenterID'] + '" "> ' + ItemName + '</option>';

        }
        else {
            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '"  CostCenterID="' + item['CostCenterID'] + '" "> ' + ItemName + '</option>';
        }
    });


    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);

}

//#endregion others

//#region details

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


function SC_TransactionsDetails_BindTableRows(pItems) {
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        debugger; //item.

        var disable = "";

        var RemainQty = 0;
        if (typeof item.Qty === 'undefined') {
            if (typeof item.D_RemainedQuantity === 'undefined') {
                RemainQty = item.MaterilaIssueRequest_RemainQty;
            }
            else {
                RemainQty = item.D_RemainedQuantity;
            }
        }
        else {
            RemainQty = item.Qty;
        }
        //if ((typeof item.D_ID === 'undefined' && item.SLInvoiceDetailsID != null && item.SLInvoiceDetailsID != 0) || (typeof item.D_ID !== 'undefined'))
        //{
        //    disable = " IsDisable ";
        //}
        //console.log((typeof item.SLInvoiceDetailsID === 'undefined' ? item.ID : item.SLInvoiceDetailsID));
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr isdeleted='0' ID='" + item.ID + "'  counter='" + (RowsCounter + 1) + "' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID) + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID) + "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button'  onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select  id='Item-" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem " + disable + "'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + RemainQty + "'>" + "<input tag='" + RemainQty + "' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
                + "<td class='StoreID hide' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select  id='store-" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm  col-sm " + disable + " selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore' val='" + (typeof item.D_ID === 'undefined' ? item.ID : item.D_ID) + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore();' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + 0 + "'>" + 0 + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='AveragePrice hide' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "'>" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "</td>"
                + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "80" + "'>" + "80" + "</td>"
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

        // $('#tblItems > tbody > tr').find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);

        FillStores();
        SC_HideShowEditBtns(_IsApproved, _HasChildren);
    }, 300);

}

function LoadTransactionsDetails() {
    debugger;
    //AddNewRow()

    if ($('#hID').val() == "" || $('#hID').val() == "0") {
        if ($("#cbIsFromRequest").is(":checked")) {
            //LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID = " + $('#slMaterialIssueRequests').val() + "   ", function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });
            LoadAll("/api/SC_Transactions/LoadItems", "where TransactionID = " + $('#slMaterialIssueRequests').val(), function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });

            // LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID = " + $('#slMaterialIssueRequests').val() + "   ", function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });
        }
        else {


            if ($("#slVirtualStoreTrans").val() == "0") {
                console.log("**********Get Manual Data***********");
                AddNewRow();
            }
            else {
                console.log("**********Get From Trans***********");
                LoadAll("/api/SC_Transactions/LoadItems", "where QtyFactor = 1 and TransactionID = " + $("#slVirtualStoreTrans").val(), function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });

            }

            // LoadAll("/api/SC_Transactions/LoadItems", " where D_ItemID is not null and ID = " + $('#slInvoices').val() + " and D_RemainedQuantity > 0 and 80 = 80", function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });
        }
    }
    else {
        if ($("#cbIsFromRequest").is(":checked") == false && ($("#slVirtualStoreTrans").val() == "0" || $("#slVirtualStoreTrans").val() == null)) {
            if ($('#tblItems > tbody > tr').length > 0) {
                AddNewRow();
            }
            else {
                console.log("**********Get Update Data***********" + $('#hID').val());
                LoadAll("/api/SC_Transactions/LoadItems", "where QtyFactor = 1 and TransactionID = " + $('#hID').val(), function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });
            }
        }
        else {
            console.log("**********Get Update Data***********" + $('#hID').val());
            LoadAll("/api/SC_Transactions/LoadItems", "where QtyFactor = 1 and TransactionID = " + $('#hID').val(), function (pTabelRows) { SC_TransactionsDetails_BindTableRows(pTabelRows) });
        }


    }

    setTimeout(function () {
        GetItemQuantityInStore();
    }, 1500);

}

function SetArrayOfItems() {
    // var cobjItem = null;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();

        //******************************************************
        //************************** PUSH **********************
        //******************************************************


        objItem.ID = "0";
        objItem.TransactionID = $('#hID').val();
        objItem.ItemID = $(tr).find('td.ItemID ').find('.selectitem').val(); //$(tr).find('td.ItemID').attr('val');

        objItem.ReturnedQty = "0";
        objItem.CurrencyID = $(tr).find('td.CurrencyID').attr('val');
        objItem.ExchangeRate = $(tr).find('td.ExchangeRate').attr('val');
        if (i == 0) {
            objItem.Notes = ($('#txtNotes').val() == "" || $('#txtNotes').val() == null ? "0" : $('#txtNotes').val());

        }
        else {
            objItem.Notes = ($(tr).find('td.Notes').text() == "" ? "-" : $(tr).find('td.Notes').text().trim());
        }
        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = $(tr).find('td.SLInvoiceDetailsID').attr('val');
        objItem.SubAccountID = "0";
        objItem.OriginalQty = "0";
        objItem.ParentID = "0";
        objItem.AveragePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim()); //AveragePrice
        objItem.TransactionDate = ConvertDateFormat($('#txtDate').val());


        //********************************************
        objItem.StoreID = $("#slToStore").val();
        objItem.QtyFactor = "1";
        //********************************************
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "80";

        objItem.FlexiSerialID = ($(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == "" || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == undefined || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == null) ? 0 : $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val();


        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = "0";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = $(tr).find('td.Qty ').find('.inputquantity').val();  // quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty ').find('.inputquantity').val(); // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
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

        //******************************************************
        //************************** POP **********************
        //******************************************************
        var objItem1 = new Object();
        objItem1.ID = "0";
        objItem1.TransactionID = $('#hID').val();
        objItem1.ItemID = $(tr).find('td.ItemID ').find('.selectitem').val(); //$(tr).find('td.ItemID').attr('val');

        objItem1.ReturnedQty = "0";
        objItem1.CurrencyID = $(tr).find('td.CurrencyID').attr('val');
        objItem1.ExchangeRate = $(tr).find('td.ExchangeRate').attr('val');
        if (i == 0) {
            objItem1.Notes = ($('#txtNotes').val() == "" || $('#txtNotes').val() == null ? "0" : $('#txtNotes').val());

        }
        else {
            objItem1.Notes = ($(tr).find('td.Notes').text() == "" ? "-" : $(tr).find('td.Notes').text().trim());
        }
        objItem1.PurchaseInvoiceDetailsID = "0";
        objItem1.SLInvoiceDetailsID = $(tr).find('td.SLInvoiceDetailsID').attr('val');
        objItem1.SubAccountID = "0";
        objItem1.OriginalQty = "0";
        objItem1.ParentID = "0";
        objItem1.AveragePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim()); //AveragePrice
        objItem1.TransactionDate = ConvertDateFormat($('#txtDate').val());
        //**********************************************************
        objItem1.StoreID = $("#slFromStore").val();
        objItem1.QtyFactor = "-1";
        //**********************************************************
        objItem1.ActualQty = "0";
        objItem1.TransactionTypeID = "80";



        objItem1.TaxAmount = "0";
        objItem1.DiscountAmount = "0";
        objItem1.InvoicePrice = "0";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem1.Qty = $(tr).find('td.Qty ').find('.inputquantity').val();  // quantity after convert
        objItem1.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
        objItem1.ItemQty = $(tr).find('td.Qty ').find('.inputquantity').val(); // inserted quantity
        objItem1.UnitFactor = 1;
        objItem1.TaxAmount = "0";
        objItem1.DiscountAmount = "0";
        objItem1.InvoicePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        objItem1.AvaliableQty = 0;
        objItem1.P_Percentage = 0;
        objItem1.P_Density = 0;
        objItem1.ToStoreID = 0;
        objItem1.P_LiterCost = 0;
        objItem1.P_ExpectedQty = 0;
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2


        arrayOfItems.push(objItem1);
    });
    return arrayOfItems;
}




var _counter = 0;
function AddNewRow() {
    //  var _index = _counter + 1;
    debugger;
    // $("#hl-menu-SC").parent().addClass("active");
    // ClearAllTableRows("tblItems");
    // $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    AppendRowtoTable("tblItems",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (RowsCounter + 1) + "' value='" + 0 + "'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ItemID ' val='" + "0" + "'>" + "<select id='Item-" + (RowsCounter + 1) + "' onchange='SetItemUnit(this);GetItemQuantityInStore();' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
            + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
            + "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='StoreID hide' val='" + "0" + "'>" + "<select id='store-" + (RowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
            + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore();' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
            + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='CurrencyID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='ExchangeRate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='Notes ' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
            + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SLInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='AveragePrice hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
            + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransactionTypeID hide' val='" + "80" + "'>" + "0" + "</td>"
            + "</tr>"));

    RowsCounter++;

    $("select.selectitem").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });
}

function SetItemUnit(ItemSelect) {
    var tr = $(ItemSelect).closest("tr");
    var SelectUnit = $(tr).find("select.selectunit");
    var UnitID = $(tr).find("td.UnitID").attr("val");


    var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

    //if (UnitID == 0 || UnitID == "0")
    //  {
    var a = Units.indexOf("-1");
    $(SelectUnit).val(Units[a - 1]);

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


function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
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

                        swal(strSorry, data[1]);
                        CallbackHeaderData();
                        //try {
                        //    if (insert == true) {
                        //        $('#hID').val(data[2]);
                        //        $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
                        //        $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");

                        //    }
                        //}
                        //catch
                        //{

                        //}

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

function FillStores() {

    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        // element == this
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.Qty ').find('.inputquantity').val($(tr).find('td.Qty  ').find('.inputquantity').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
    });

}







function GetItemQuantityInStore() {

    $("#tblItems > tbody tr").each(function (i, tr) {

        // FadePageCover(true);
        // var tr = $(Calculate_btn).closest('tr');
        //  $(Calculate_btn).siblings('.span_quantity').attr('counter')
        var storeid = $('#slFromStore').val()
        var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();

        if (storeid.trim() == "0" || itemid.trim() == "0") {
            $(tr).find('.QuantityInStore').find('.span_quantity').html("&nbsp;&nbsp;&nbsp;<b>" + 0 + "</b>");
            //  swal('Excuse me', 'select Item and Store', 'warning');
            // FadePageCover(false);
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
                    //  FadePageCover(false);
                    //span_quantity
                }
            });
        }

    });





}
function CallbackHeaderData() {
    debugger;
    if (IsInsert) {
        DeleteListFunction("/api/SC_Transactions/Delete", { "pTransactionsID": $("#hID").val(), "pTransactionDate": ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }, function () { console.log("************* Is Rolled Back *********************** "); });

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

