// City Country ---------------------------------------------------------------





$(document).ready(function () {
    $('#Stages').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel.disableScroll', function (e) {
            e.preventDefault();
        });
    });
    $('#Stages').on('blur', 'input[type=number]', function (e) {
        $(this).off('wheel.disableScroll');
    });

    CheckIfAllLoading();

    

});


function CheckIfAllLoading() {
    if (typeof $('#slFinalProduct option') === "undefined" || $('#slFinalProduct option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

// Bind SC_Transactions Table Rows
var RowsCounter = 0;
var IsInsert = true;
var TransTypeID = 90;
var _IsApproved = false;
var RollBackData = {};
var ErrorMessage = "";
var CalculateIsFinished = false;

var ChangedType = "";




var OldQuantity = 1;
var NewQuantity = 1;
//#region Header
function SC_Transactions_BindTableRows(pSC_Transactions) {
    debugger;
    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        console.log("Is Approved : " + item.IsApproved);
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_Transactions",
            ("<tr ID='" + item.ID + "' ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                
                + "<td class='P_ItemID' val='" + item.P_ItemID + "'>" + item.HeaderItemName + "</td>"
                + "<td class='P_Qty' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                + "<td class='CodeManual hide' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
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
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                
                + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                
                + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"
                + "<td class='FromStore hide' val='" + item.FromStore + "'>" + item.FromStore + "</td>"
                + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"
                + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"


                + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='OperationID hide' val='" + item.OperationID + "'>" + item.OperationID + "</td>"

                + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
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
function SC_Transactions_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where TransactionTypeID = 90 AND ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = '" + $('#txtCode_Filter').val() + "'";
    }

    if ($('#txtItemName_Filter').val().trim() != "") {
        WhereClause += " AND HeaderItemName LIKE N'%" + $('#txtItemName_Filter').val() + "%'";
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



var all_has_store = false;






function SC_Transactions_Insert(pSaveandAddNew, IsCallback) {
    if ($('#hCanSaveEdit').val() == "true")
    {






        $('#hCanSaveEdit').val("false");
        IsInsert = true;
        FadePageCover(true)

        LoadAveragePriceDetails();
        setTimeout(function () {

            FadePageCover(true)
            debugger
            var Details = SetArrayOfItems1();
            if (Details[1] == "" || Details[1] == "0") {



                setTimeout(function () {
                    if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
                        debugger;
                        InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Insert", {
                            pCode: $("#txtCode").val(),
                            pCodeManual: "0",
                            pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                            pPurchaseInvoiceID: "0",
                            pPurchaseOrderID: "0",
                            pExaminationID: "0",
                            pIsApproved: false,
                            pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val().replace(/\r?\n/g, "\r\n")),
                            pSLInvoiceID: 0,
                            pDepartmentID: "0",
                            pClientID: 0,
                            pCostCenterID: 0, // $("#slCostCenter").val(),
                            pIsSpareParts: "false",
                            pFiscalYearID: "0",
                            pSupplierID: "0",
                            pParentID: "0",
                            pTransactionTypeID: "90",
                            pJV_ID: "0", pIsOutOfStore: false, // ($("#cbIsFromInvoice").is(":checked") == true ? false : false),
                            pMaterialIssueRequesitionsID: "0",
                            pToStoreID: $("#slToStore").val(),
                            pP_ProductionRequestID: 0,
                            pP_UnitID: 0,
                            pP_ItemID: $('#slFinalProduct').val(),
                            pP_LineID: $('#slLines').val(),
                            pP_Qty: 0,
                            pP_FinishedDate: ConvertDateFormat($('#txtFinishedDate').val()),
                            pP_StartDate: ConvertDateFormat($('#txtStartDate').val()),
                            pEntitlementDays: 0,
                            pIsClosed: false,
                            pFromStore: $("#slFromStore").val(),
                            pJV_ID2: 0,
                            pTransferParentID: "0", // ($("#slVirtualStoreTrans").val() == null ? 0 : $("#slVirtualStoreTrans").val()),
                            pForwardingPSInvoiceID: 0,
                             pOperationID: "0",
                             pBranchID: "0",
                             pIsFromFlexi: "false"
                        }, pSaveandAddNew, null, '#hID', function () {

                            InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                                JSON.stringify(SetArrayOfItems1()[0])
                                , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                                    $('#txtCode').val(Code[1]);
                                    PrintTransaction();

                                    FadePageCover(false)
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
            else {
                swal("Sorry", Details[1], 'warning');
                $('#hCanSaveEdit').val("true");
                FadePageCover(false)
            }



        }, 3000);

    }
    else
    {
       // swal("Please, stop pressing the save button because it causes problems !!!");
        console.log("Please, stop pressing the save button because it causes problems !!!");
    }

    //if (IsCallback == null || typeof IsCallback ==="undefined" || IsCallback == false) {

    //}
    //debugger
    //if (CalculateIsFinished == false) {
    //    SC_Transactions_Insert(pSaveandAddNew, true);
    //}
    //else
    //{

    //}


}

function SC_Transactions_EditByDblClick(pID, pIsApproved) {
    _IsApproved = pIsApproved;
    console.log("IsApproved : 2 " + _IsApproved)
    jQuery("#SC_TransactionsModal").modal("show");
    SC_Transactions_FillControls(pID, pIsApproved);
}
var isTypeExpectedQty = 0;
function SC_Transactions_FillControls(pID, pIsApproved) {
    debugger;
    isTypeExpectedQty = 1;
    ClearAll("#SC_TransactionsModal", null);
    $("#hID").val(pID);
    // SC_HideShowEditBtns();

    IntializeData(function () {


        //  $('#btnPrint2').removeClass('hide');
        $('#btn-Delete2').removeClass('hide');

        // $("#hID").val(pID);
        var tr = $("#tblSC_Transactions > tbody > tr[ID='" + pID + "']");
        // $("#slInvoices").val($('#slPSInvoices_Filter').html());
        $("#txtCode").val($(tr).find("td.Code").attr('val').toUpperCase());
        //// $("#slInvoices").val($(tr).find("td.SLInvoiceID").attr('val'));
        // $("#slMaterialIssueRequests").val($(tr).find("td.MaterialIssueRequesitionsID").attr('val'));
        // $("#slVirtualStoreTrans").val($(tr).find("td.TransferParentID").attr('val'));
        // $("#slPSInvoices").prop('disabled', true);
        //   $("#sl").val($(tr).find("td.CostCenterID").attr('val'));
        $("#txtDate").val($(tr).find("td.TransactionDate").attr('val'));
        $("#txtStartDate").val(GetDateFromServer($(tr).find("td.P_StartDate").attr('val')));
        $("#txtFinishedDate").val(GetDateFromServer($(tr).find("td.P_FinishedDate").attr('val')));
        $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
        $('#slFinalProduct').val($(tr).find("td.P_ItemID ").attr('val'));
        $('#lblShown').text($(tr).find("td.P_ItemID ").text());
        $("#slFromStore").val($(tr).find("td.FromStore").attr('val'));
        $("#slToStore").val($(tr).find("td.ToStoreID").attr('val'));
        $('#slLines').val($(tr).find("td.P_LineID").attr('val'));
        $("#hID").val(pID);
        //  $("#slCostCenterID").val($(tr).find("td.CostCenterID").attr('val'));
        $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
        $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");
        setTimeout(function () {
            LoadTransactionsDetails();
        }, 1000);

        //$('#slFromStore').prop("disabled", false);
        //$('#slToStore').prop("disabled", false);
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

    });




}



function SC_Transactions_Update(pSaveandAddNew, IsCallback) {

    if ($('#hCanSaveEdit').val() == "true") {






        $('#hCanSaveEdit').val("false");
        IsInsert = false;
        LoadAveragePriceDetails();
        setTimeout(function () {

            var Details = SetArrayOfItems1();
            if (Details[1] == "" || Details[1] == "0") {
                setTimeout(function () {
                    if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
                        debugger;
                        InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update",
                            {
                                pID: $("#hID").val(),
                                pCode: $("#txtCode").val(),
                                pCodeManual: "0",
                                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                                pPurchaseInvoiceID: "0",
                                pPurchaseOrderID: "0",
                                pExaminationID: "0",
                                pIsApproved: false,
                                pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val().replace(/\r?\n/g, "\r\n")),
                                pSLInvoiceID: 0,
                                pDepartmentID: "0",
                                pClientID: 0,
                                pCostCenterID: 0, // $("#slCostCenter").val(),
                                pIsSpareParts: "false",
                                pFiscalYearID: "0",
                                pSupplierID: "0",
                                pParentID: "0",
                                pTransactionTypeID: "90",
                                pJV_ID: "0", pIsOutOfStore: false, // ($("#cbIsFromInvoice").is(":checked") == true ? false : false),
                                pMaterialIssueRequesitionsID: "0",
                                pToStoreID: $("#slToStore").val(),
                                pP_ProductionRequestID: 0,
                                pP_UnitID: 0,
                                pP_ItemID: $('#slFinalProduct').val(),
                                pP_LineID: $('#slLines').val(),
                                pP_Qty: 0,
                                pP_FinishedDate: ConvertDateFormat($('#txtFinishedDate').val()),
                                pP_StartDate: ConvertDateFormat($('#txtStartDate').val()),
                                pEntitlementDays: 0,
                                pIsClosed: false,
                                pFromStore: $("#slFromStore").val(),
                                pJV_ID2: 0,
                                pTransferParentID: "0", // ($("#slVirtualStoreTrans").val() == null ? 0 : $("#slVirtualStoreTrans").val()),
                                pForwardingPSInvoiceID: 0,
                                 pOperationID: "0",
                                 pBranchID: "0",
                                 pIsFromFlexi: "false"
                            }, pSaveandAddNew, null, '#hID', function () {

                                InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                                    JSON.stringify(SetArrayOfItems1()[0])
                                    , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                                        $('#txtCode').val(Code[1]);
                                        PrintTransaction();
                                        FadePageCover(false)

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
            else {
                swal("Sorry", Details[1], 'warning');
                $('#hCanSaveEdit').val("true");
            }




        }, 3000);

    }
    else
    {

        console.log("Please, stop pressing the save button because it causes problems !!!");
    }

    //FadePageCover(true)
    //if (IsCallback == null || typeof IsCallback === "undefined" || IsCallback == false)
    //{
    //    LoadAveragePriceDetails();
    //}

    //if (CalculateIsFinished == false) {
    //    SC_Transactions_Update(pSaveandAddNew, true);
    //}
    //else {

    //}
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
    FadePageCover(true);
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SC_TransactionsModal", null);
    $("#btnSave").attr("onclick", "SC_Transactions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SC_Transactions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtStartDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtFinishedDate').val(getTodaysDateInddMMyyyyFormat());
    $('#slFromStore').val("0");
    $('#slToStore').val("0");
    // $('#slToStore').val("0");
    $('#slFinalProduct').val("0");
    $('#hID').val("0");
    $('#Stages').html("");
    $('#hCanSaveEdit').val("true");
    SC_HideShowEditBtns();
    FadePageCover(true)
    setTimeout(function () {
        FadePageCover(true)
        var RawStore = $('#slFromStore option[israwstore="true"]').attr("value");
        var UnderOperationStore = $('#slFromStore option[isunderoperationstore="true"]').attr("value");



        if (RawStore != null && typeof RawStore !== "undefined" && RawStore != "0") {
            $('#slFromStore').val(RawStore);
            $('#slFromStore').prop("disabled", true);
        }
        else {
            $('#slFromStore').prop("disabled", false);
        }

        if (UnderOperationStore != null && typeof UnderOperationStore !== "undefined" && UnderOperationStore != "0") {
            $('#slToStore').val(UnderOperationStore);
            $('#slToStore').prop("disabled", true);
        }
        else {

            $('#slToStore').prop("disabled", false);
        }
        FadePageCover(false)
    }, 2000);


    isTypeExpectedQty = 0;

    IntializeData();

}







//http://localhost:1425/api/SC_Transactions/Update?pID=3040&pCode=1&pCodeManual=0&pTransactionDate=12%2F29%2F2019&pPurchaseInvoiceID=0&pPurchaseOrderID=0&pExaminationID=0&pIsApproved=false&pNotes=0&pSLInvoiceID=0&pDepartmentID=0&pClientID=0&pCostCenterID=0&pIsSpareParts=false&pFiscalYearID=0&pSupplierID=0&pParentID=0&pTransactionTypeID=90&pJV_ID=0&pIsOutOfStore=false&pMaterialIssueRequesitionsID=3028&pToStoreID=2&pP_ProductionRequestID=0&pP_UnitID=0&pP_ItemID=0&pP_LineID=0&pP_Qty=0&pP_FinishedDate=01%2F01%2F1900&pP_StartDate=01%2F01%2F1900&pEntitlementDays=0&pIsClosed=false&pFromStore=1&pJV_ID2=0&pTransferParentID=&pForwardingPSInvoiceID=0

//#endregion Header


//#region print
function PrintTransaction() {
    //    LoadAll("/api/SC_Transactions/LoadItems", $('#slFinalProduct').val() + "," + $('#slFromStore').val() + "," + ConvertDateFormat($('#txtDate').val()) + "," + ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) + ",90=90 LoadFinalProductDetails", function (pTabelRows) { FillStages(pTabelRows);  });

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ItemID");
    arr_Keys.push("StoreID");
    arr_Keys.push("Date");
    arr_Keys.push("TransactionID");

    arr_Values.push($('#slFinalProduct').val());
    arr_Values.push($('#slFromStore').val());
    arr_Values.push(ConvertDateFormat($('#txtDate').val()));
    arr_Values.push(($('#hID').val() == "" ? 0 : parseInt($('#hID').val().trim())));




    if
    (
        $('#sp-LoginName').text().toUpperCase() == ('borg-final p').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('borg-rm').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Production').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Wagdy').toUpperCase() ||
        $('#sp-LoginName').text().toUpperCase() == ('Arafa').toUpperCase()
    ) {

        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Batches_أمر تشغيل"
            , pReportName: "Batches"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;
    }
    else {

        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Batches_أمر تشغيل"
            , pReportName: "BatchesWithCost"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;
    }











    console.log("*************** UPDATED *******************************");
}
//#endregion print 


//#region others
function SC_HideShowEditBtns(IsApproved) {

    // $("#tblItems").find(".inputquantity").prop("disabled", false);
    _IsApproved = IsApproved;




    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
        $('#txtDate').prop('disabled', false);
        //   $('#slInvoices').prop('disabled', false);
        //  $('#slMaterialIssueRequests').prop('disabled', false);
        //  $('#slVirtualStoreTrans').prop('disabled', false);
        //  $('#cbIsFromRequest').prop('disabled', false);
        //  $('#btn-Items').removeClass('hide');
        $("#btn-Delete2").addClass("hide");
        $('.PrintTtansaction').addClass('hide');
        $('.Edit-btn').removeClass('hide');
     
        $('.Edit-input').prop('disabled', false);
            $('#btnSave').removeClass("hide");
            $('#btnSaveandNew').removeClass("hide");
    }
    else // is [ Update ]
    {
        $('#txtDate').prop('disabled', true);
        //$("#slFromStore").prop("disabled", false);
        //$("#slToStore").prop("disabled", false);
        // $("#btn-Delete2").removeClass("hide");
        $('.Edit-btn').removeClass('hide');
        // $('#slInvoices').prop('disabled', true);
        // $('#slVirtualStoreTrans').prop('disabled', true);
        // $('#slMaterialIssueRequests').prop('disabled', true);
        // $('#btn-Items').addClass('hide');
        $('.PrintTtansaction').removeClass('hide');
        // $('#cbIsFromRequest').prop('disabled', true);
        if (IsApproved == true || $("#hf_CanEdit").val() != 1) {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $('#txtDate').prop('disabled', true);
            $('#btnSave').addClass("hide");
            $('#btnSaveandNew').addClass("hide");


            // $(".tblStageIn ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
            // $(".tblStageOut ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
        }
        else
        {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $('#btnSave').removeClass("hide");
            $('#btnSaveandNew').removeClass("hide");
            //  $(".tblStageIn ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', false);
            //  $(".tblStageOut ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', false);
        }
    }
    // for [ All ]
    // $('.selectitem').prop('disabled', true);
    $('.selectunit').prop('disabled', true);

    $('#btnSaveandNew').addClass('hide');

    $("#slFromStore").prop("disabled", true);
    $("#slToStore").prop("disabled", true);
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
    // $("#txtNotes").keydown(handleEnter).keypress(handleEnter);





    FadePageCover(false);
    all_has_store = false;
    RowsCounter = 0;
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    //********
    // $('#tblItems > tbody').html('');
    $('#txtStartDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtFinishedDate').val(getTodaysDateInddMMyyyyFormat());
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    //********

    if (typeof callback != "undefined") { callback(); }

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

            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '" selected "> ' + ItemName + '</option>';

        }
        else {
            option += '<option ' + AttrItemName + ' = "' + item[AttrItemName] + '" value="' + item[ID_Name] + '"  "> ' + ItemName + '</option>';
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
    $("#hl-menu-PR").parent().addClass("active");
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
                + "<td class='QuantityInStore hide' val='" + (typeof item.D_ID === 'undefined' ? item.ID : item.D_ID) + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
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
                + "<td class='TransactionTypeID hide' val='" + "90" + "'>" + "90" + "</td>"
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
    }, 300);

}

function LoadTransactionsDetails()
{
     OldQuantity = 1;
    NewQuantity = 1;


    $('#slFinalProduct').trigger("change");
    
    debugger;
    if ($('#slFinalProduct').val() == null || $('#slFinalProduct').val() == "" || $('#slFromStore').val() == "" || $('#slFromStore').val() == null) {

        setTimeout(function () {
            LoadTransactionsDetails()
        }, 300);
    }
    else
    LoadAll("/api/SC_Transactions/LoadItems", $('#slFinalProduct').val() + "," + $('#slFromStore').val() + "," + ConvertDateFormat($('#txtDate').val()) + "," + ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) + ",90=90 LoadFinalProductDetails", function (pTabelRows) { FillStages(pTabelRows); });

}
var AveragePriceDetails = null;
function LoadAveragePriceDetails(pChangedType) {
    debugger;
    if (typeof pChangedType !== "undefined" && pChangedType != null && pChangedType != "0")
        ChangedType = pChangedType;
    else
        ChangedType = "";
    CalculateIsFinished = false;
    LoadAll("/api/SC_Transactions/LoadItems", $('#slFinalProduct').val() + "," + $('#slFromStore').val() + "," + ConvertDateFormat($('#txtDate').val()) + "," + ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) + ",90=90 LoadFinalProductDetails", function (pTabelRows) { AveragePriceDetails = JSON.parse(pTabelRows); CalculateAll(JSON.parse(pTabelRows),2); });
}
function ToggleInQty(This) {
    var tr = $(This).closest('tr');
    if (
        ($(tr).find('.inputexpectedquantity').val() == ""
            || parseFloat($(tr).find('.inputexpectedquantity').val()) == 0)

        &&

        ($(tr).find('.inputpercentage').val() == ""
            || parseFloat($(tr).find('.inputpercentage').val()) == 0)
    ) {
        $(tr).find('.inputpercentage').prop("disabled", false);
        $(tr).find('.inputexpectedquantity').prop("disabled", false);

        $(tr).find('.inputpercentage').val("0");
        $(tr).find('.inputexpectedquantity').val("0");
    }
    else if (($(tr).find('.inputexpectedquantity').val() == ""
        || parseFloat($(tr).find('.inputexpectedquantity').val()) == 0)) {
        $(tr).find('.inputpercentage').prop("disabled", false);
        $(tr).find('.inputexpectedquantity').prop("disabled", true);

        //  $(tr).find('.inputpercentage').val("0");
        $(tr).find('.inputexpectedquantity').val("0");
    }
    else {
        $(tr).find('.inputpercentage').prop("disabled", true);
        $(tr).find('.inputexpectedquantity').prop("disabled", false);
        $(tr).find('.inputpercentage').val("0");
    }
}



var StageOrder = 0;
var loadindex = 0;
function FillStages(data) {
    //  StageOrder = 1;

    debugger
    var InRows = "";
    var OutRows = "";
    $('#Stages').html("");

    StageOrder = 1;
    //AveragePriceDetails = JSON.parse(data);
    $(JSON.parse(data)).each(function (i, item) {
       // if (i == 0)
            $('#txtNotes').val(item.Notes);
        // if (i == 0 || JSON.parse(data)[i-1]. )

        //StageOrder = item.OrderNo;
        if (item.ISIn == true || item.ISIn == "true") {
            InRows += "<tr ID='" + item.DID + "' isdeleted='0'  counter='" + (item.OrderNo) + "' value='" + item.DID + "'>";
            InRows += " <td class='btn-warning' style='font-size:15px;'> IN </td>";
            InRows += "<td counter='" + (item.OrderNo) + "'> <button tag='" + item.DID + "'  type='button' onclick='DeleteItems(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>";
            InRows += "<td class='ProductID ' val='" + item.ProductID + "'>" + "<select style='max-width:200px;' disabled='disabled'  id='Item-" + item.ProductID + "' onchange='SetItemUnit(this)' tag='" + item.ProductID + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
            InRows += "<td class='Percentage' val='" + item.Percentage + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InPercentage'  tag='" + item.Percentage + "' type='number'   class='inputpercentage input-sm  col-sm'>" + "</td>";
            InRows += "<td class='ExpectedQty' val='" + item.ExpectedQty + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InExpectedQty'  tag='" + item.ExpectedQty + "' type='number'  class='inputexpectedquantity input-sm  col-sm'>" + "</td>";
            InRows += "<td class='ActualQty' val='" + item.ActualQty + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InActualQty' tag='" + item.ActualQty + "' type='number' onblur='' class='inputactualquantity input-sm  col-sm'>" + "</td>";
            InRows += "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
            InRows += "<td class='Density' val='" + item.Density + "'>" + "<input tag='" + item.Density + "' disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
            InRows += "<td class='ActualDensity' val='" + ($('#hidden_slItems option[value="' + item.ProductID + '"]').attr('Volume')) + "'>" + ($('#hidden_slItems option[value="' + item.ProductID + '"]').attr('Volume')) + "</td>";

            
            InRows += "<td class='CostPrice' val='" + item.CostPrice + "'>" + "<input tag='" + item.CostPrice + "' disabled='disabled' type='number' class='inputcostprice input-sm  col-sm'>" + "</td>";
            InRows += "</tr>";




        }
        else {
            OutRows += "<tr ID='" + item.DID + "' isdeleted='0'  counter='" + (item.OrderNo) + "' value='" + item.DID + "'>";
            OutRows += " <td class='btn-lightblue' style='font-size:15px;'> Out </td>";
            OutRows += "<td counter='" + (item.OrderNo) + "'> <button  tag='" + item.DID + "'  type='button' onclick='DeleteItems(this);' class='hide btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>";
            OutRows += "<td class='ProductID ' val='" + item.ProductID + "'>" + "<select disabled='disabled' style='max-width:200px;'  id='Item-" + item.ProductID + "' onchange='SetItemUnit(this)' tag='" + item.ProductID + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
            OutRows += "<td class='Percentage hide' val='" + item.Percentage + "'>" + "<input tag='" + item.Percentage + "' type='number' onblur=''  class='inputpercentage input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='ExpectedQty' val='" + item.ExpectedQty + "'>" + "<input disabled='disabled' tag='" + item.ExpectedQty + "' type='number' onblur='' class='inputexpectedquantity input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='ActualQty' val='" + (item.ActualQty == 0 ? item.ExpectedQty : item.ActualQty) + "'>" + "<input  tag='" + (item.ActualQty == 0 ? item.ExpectedQty : item.ActualQty) + "' type='number' onblur='LoadAveragePriceDetails(this);' changetype='OutActualQty' class='inputactualquantity input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
            OutRows += "<td class='Density' val='" + item.Density + "'>" + "<input tag='" + item.Density + "' disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='CostPrice' val='" + item.CostPrice + "'>" + "<input tag='" + item.CostPrice + "' disabled='disabled' type='number' class='inputcostprice input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='CostLiter' val='" + item.CostLiter + "'>" + "<input tag='" + item.CostLiter + "' disabled='disabled'  type='number' class='inputcostliter input-sm  col-sm'>" + "</td>";
            OutRows += "</tr>";

            if ($('#hID').val() != "0" && $('#hID').val() != "") {
                $('#txtQuantity').val(item.ExpectedQty);
                NewQuantity = parseFloat(item.ExpectedQty);

            }
        }

        //try
        //{

        //}
        //catch
        //{

        //}
        // لو هو اخر واحد   او اخر واحد في ترتيب المرحلة
        if ((i == $(JSON.parse(data)).length - 1) || (JSON.parse(data)[i].OrderNo != JSON.parse(data)[i + 1].OrderNo)) {
            var StageBody = '';
            StageBody += '<div ID=' + item.ID + '  style="border:solid 1.5px;" order="' + (item.OrderNo) + '" class="StageBody">';
            // StageBody += '<hr style="border:solid 1.5px;">';
            StageBody += '<div class="col-sm-12">';
            StageBody += '<div order="' + (item.OrderNo) + '"  class="row StageTitle">';
            StageBody += '<div class="col-sm-6">';
            StageBody += '<label>Stage <mark>[' + (item.OrderNo) + ']</mark>&nbsp;</label><select order="' + (item.OrderNo) + '" class="slStages input-sm ">' + $("#hidden_slStages").html() + '</select> &nbsp; <a order="' + (item.OrderNo) + '" class="btn btnDeleteStage btn-danger btn-sm " onclick="DeleteStage(' + (item.OrderNo) + ');"> <span class="fa fa-trash-o"></span> Delete Stage</a><br>';
            StageBody += '</div>';
            StageBody += '</div>';
            StageBody += '<div order="' + (item.OrderNo) + '" class="row  StageIn">';
            StageBody += '<div class="form-group has-error clearfix col-sm-2">';
            StageBody += '<a class="btnAddStageIn btn btn-warning rounded btn-sm" onclick="AddStageIn(' + (item.OrderNo) + ');">';
            StageBody += '<span class="fa fa-plus"></span> In';
            StageBody += '</a>';
            StageBody += '</div>';
            StageBody += '<table class="tblStageIn table table-hover" order="' + (item.OrderNo) + '">';
            StageBody += '<caption><h4> In Items <h4> </caption>';
            StageBody += '<thead>';
            StageBody += '<tr>';
            StageBody += '<th></th>';
            StageBody += '<th></th>';
            StageBody += '<th>Product</th>';
            StageBody += '<th>Percentage</th>';
            StageBody += '<th>Expected Qty</th>';
            StageBody += '<th>Actual Qty</th>';
            StageBody += '<th>Unit</th>';
            StageBody += '<th>Density</th>';
            StageBody += '<th>Original Density</th>';
            StageBody += '<th class="thCost">Cost Price</th>';
            StageBody += '</tr>';
            StageBody += '</thead>';
            StageBody += '<tbody>' + InRows + '</tbody>';
            StageBody += '</table>';
            StageBody += '</div>';
            StageBody += '<div order="' + (item.OrderNo) + '" class="row StageOut">';
            StageBody += '<div class="form-group has-error clearfix col-sm-2">';
            StageBody += '<a class="hide btnAddStageOut btn btn-lightblue btn-sm rounded" onclick="AddStageOut(' + (item.OrderNo) + ');">';
            StageBody += '<span class="fa fa-plus"></span> Out';
            StageBody += '</a>';
            StageBody += '</div>';
            StageBody += '<table class="tblStageOut table table-hover" order="' + (item.OrderNo) + '">';
            StageBody += '<caption><h4> Out Items <h4> </caption>';
            StageBody += '<thead>';
            StageBody += '<tr>';
            StageBody += '<th></th>';
            StageBody += '<th></th>';
            StageBody += '<th>Product</th>';
            StageBody += '<th>Expected Qty</th>';
            StageBody += '<th>Actual Qty</th>';
            StageBody += '<th>Unit</th>';
            StageBody += '<th>Density</th>';
            StageBody += '<th class="thCost">Cost Price</th>';
            StageBody += '<th class="thCost">Cost Liter</th>';
            StageBody += '</tr>';
            StageBody += '</thead>';
            StageBody += '<tbody>' + OutRows + '</tbody>';
            StageBody += '</table>';
            StageBody += '</div>';
            StageBody += '</div>';
            StageBody += '</div>';
            //----------------------------------------------------------------------------------------------

            // دخل الداتا للمرحلة
            $('#Stages').append(StageBody);

            // $('.btnDeleteStage[order=' + (( item.OrderNo) - 1) + ']').addClass('hide');
            $('.btnDeleteStage').addClass('hide');
            //   item.OrderNo = ( item.OrderNo) + 1;

            InRows = "";
            OutRows = "";



            //$('.tblStageIn' ).each(function (j, tbl)
            //{
            //    FilltblInputs($(tbl).find('tbody>tr'));
            //});

            //$('.tblStageOut').each(function (j, tbl) {
            //    FilltblInputs($(tbl).find('tbody>tr'));
            //});
            FadePageCover(true);
            setTimeout(function () {
                FilltblInputs($('.tblStageIn[order=' + item.OrderNo + ']').find('tbody>tr'));
                FilltblInputs($('.tblStageOut[order=' + item.OrderNo + ']').find('tbody>tr'));
            }, 1000);
            SC_HideShowEditBtns(_IsApproved);

            //if (_IsApproved == true) {
            //    $(".tblStageIn ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
            //    $(".tblStageOut ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
            //    $(".Edit-btn").prop('disabled', true);
                
            //}
            //else {
            //    $(".Edit-btn").prop('disabled', false);

            //}
            $('.slStages[order=' + item.OrderNo + ']').val(item.StageID);
            ShowRemoveCost();
            if(i == $(JSON.parse(data)).length - 1)
            {
                setTimeout(function () {
                    CalculateAll(JSON.parse(data),1);
                    ShowRemoveCost();
                    FadePageCover(false);
                    //if (loadindex == 0) {
                    //    FillStages(data);
                    //    loadindex = loadindex + 1;

                    //    SC_HideShowEditBtns(_IsApproved);
                    //    //if (_IsApproved == true) {
                    //    //    $(".tblStageIn ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
                    //    //    $(".tblStageOut ").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
                    //    //    $(".Edit-btn").addClass("hide");
                    //    //}
                    //    //else {
                    //    //    $(".Edit-btn").removeClass("hide");

                    //    //}




                    //}




                    $("select.selectitem").each(function (i, sl) {
                        if ($(sl).hasClass('IsAutoSelect') == false) {
                            $(sl).css({ 'width': '100%' }).select2();
                            $(sl).addClass('IsAutoSelect');
                            $(sl).trigger("change");
                            $("div[tabindex='-1']").removeAttr('tabindex');
                        }

                    });
                }, 2000);

                


            }
        }

        console.log(item.Notes)
        $('#txtNotes').val(item.Notes);

    });
}



function AddStageIn(OrderNo)
{

    if ($('.slStages[order=' + OrderNo + ']').val() == "0" || $('.slStages[order=' + OrderNo + ']').val() == "") {


        swal("Sorry", "You Must Select Stage", 'warning');
    }
    else {

        var Row = "";


        Row += "<tr ID='" + 0 + "' isdeleted='0'  counter='" + (OrderNo) + "' value='" + 0 + "'>";
        Row += " <td class='btn-warning' style='font-size:15px;'> IN </td>";
        Row += "<td counter='" + (OrderNo) + "'> <button tag='" + 0 + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
        Row += "<td class='ProductID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this);' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
        Row += "<td class='Percentage' val='" + 0 + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InPercentage'  tag='" + 0 + "' type='number'   class='inputpercentage input-sm  col-sm'>" + "</td>";
        Row += "<td class='ExpectedQty' val='" + 0 + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InExpectedQty'  tag='" + 0 + "' type='number'  class='inputexpectedquantity input-sm  col-sm'>" + "</td>";
        Row += "<td class='ActualQty' val='" + 0 + "'>" + "<input onblur='LoadAveragePriceDetails(this);' changetype='InActualQty' tag='" + 0 + "' type='number' onblur='' class='inputactualquantity input-sm  col-sm'>" + "</td>";
        Row += "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + 0 + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
        Row += "<td class='Density' val='" + 0 + "'>" + "<input tag='" + 0 + "' disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
        Row += "<td class='ActualDensity' val='" + 0 + "'>" + 0 + "</td>";

        Row += "<td class='CostPrice' val='" + 0 + "'>" + "<input tag='" + 0 + "' disabled='disabled' type='number' class='inputcostprice input-sm  col-sm'>" + "</td>";
        Row += "</tr>";

        $(".tblStageIn[order=" + OrderNo + "]").append(Row);

    }

    $("select.selectitem").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });

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
        $('.inputcostprice').addClass('hide');
        $('.inputcostliter ').addClass('hide');
        $('.inputcostprice').addClass('hide');
        $('.thCost ').addClass('hide');

        //class="thCost"
    }
    else {

        $('.inputcostprice').removeClass('hide');
        $('.inputcostliter ').removeClass('hide');
        $('.inputcostprice').removeClass('hide');
        $('.thCost ').removeClass('hide');
    }
}


function round1(value, precision) {
    var aPrecision = Math.pow(10, precision);
    return Math.round(value * aPrecision) / aPrecision;
}
var TotalActual = 0.00;


var FinalDensity = 0.00;
var FinalCost = 0.00;
var FinalLiterCost = 0.00;
var FinalAverage = 0.00;
var L_UnitCost = 0.00;
var UnitCost = 0.00;
var FinalQty = 0.00;
var ItemCostPrice = 0.000000000;

function CalculateAll(pAveragePriceDetail, Type) {
    if (Type == isTypeExpectedQty==1) {
        Type = 2;
    }
    debugger;
    console.log("........................................................................................");
    TotalActual = 0.00;

    debugger;

    $('.tblStageIn tbody tr').each(function (i11, tr11) {
        if (parseFloat($(tr11).find('td.Density').attr('val')) != 0) {
            TotalActual = (TotalActual + parseFloat(($(tr11).find('td.ActualQty input').val() == "" ? "0.00" : $(tr11).find('td.ActualQty input').val())));

        }



        if (i11 == $('.tblStageIn tbody tr').length - 1)
            return TotalActual;
    });



    console.log( "مجموع كميات السائل" +  TotalActual);


    TotalActual = round1(TotalActual, 6);
    setTimeout(function () {

    


    
    ShowRemoveCost();

    //try {

    // بنسجل العدد الكلي اللي دخل في عملية سابقه

    OldQuantity = NewQuantity;
    console.log("Operation on new qty : " + NewQuantity + "----------------------------------------")
    if ($('#txtQuantity').val() == "0" || $('#txtQuantity').val() == "") {
        $('#txtQuantity').val("1");
        //OldQuantity = NewQuantity
        NewQuantity = 1;
    }
    else {
        NewQuantity = $('#txtQuantity').val();
    }

   
     console.log("****Old Quantity***" + "  " + OldQuantity);
     console.log("****New Quantity***" + "  " + NewQuantity);

    debugger;
    $(".StageBody").each(function (i, StageBody) {

        // var OrderNo = $(StageBody).attr('order');
         FinalDensity = 0.00;
         FinalCost = 0.00;
         FinalLiterCost = 0.00;
         FinalAverage = 0.00;
         L_UnitCost = 0.00;
         UnitCost = 0.00;
         FinalQty = 0.00;
        //*************************************************************************************** 111111111111111111111111111
        $($(StageBody).find('.tblStageIn > tbody > tr')).each
        (
            function (i1, tr)
            {
                ItemCostPrice = 0.000000000;
                var ItemID = parseInt($(tr).find('td.ProductID select').val());
                var _Item = pAveragePriceDetail.find(x => x.ProductID == ItemID);

                if (typeof _Item !== "undefined" && _Item != null) {
                    console.log("ROW " + i1 + "-------------");

                    $(tr).find('td.Percentage input').val(parseFloat($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val()).toFixed(16));

                    //type if load 
                    if (Type == 1) {
                        $(tr).find('td.ExpectedQty input').val(parseFloat(($(tr).find('td.ActualQty input').val() == "" || $(tr).find('td.ActualQty input').val() == "0") ? $(tr).find('td.ActualQty input').val() : $(tr).find('td.ActualQty input').val()).toFixed(9));
                    }
                    $(tr).find('td.ActualQty input').val(parseFloat($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()).toFixed(9));
                    $(tr).find('td.Density input').val(parseFloat($(tr).find('td.Density input').val() == "" ? "0" : $(tr).find('td.Density input').val()).toFixed(9));
                    $(tr).find('td.CostPrice input').val(parseFloat($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val()).toFixed(9));


                   //$(tr).find("td.ActualDensity").text(
                    CalculateINStageDetails(i1, tr, StageBody, pAveragePriceDetail, Type, _Item.CostPrice);
                }
                else {
                    $.ajax({
                        type: "Get",
                        url: "/api/SC_Transactions/CalcItemQtyAndAveragePrice",
                        data: {
                            pItemID: $(tr).find('td.ProductID select').val(),
                            pStoreID: $('#slFromStore').val(),
                            pDate: ConvertDateFormat($('#txtDate').val()),
                            pTransactionID: IsNull($('#hID').val().trim(), "0"),
                            IsSpecialStore: false
                        },
                        dataType: "json",
                        success: function (r) {
                            //$(tr).find('td.OriginalQty ').find('.inputquantity').val(r[0]);
                            //$(tr).find('td.AveragePrice ').find('.inputprice').val(r[1]);
                            //CalcDifference(tr);
                            console.log("ROW " + i1 + "-------------");

                            $(tr).find('td.Percentage input').val(parseFloat($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val()).toFixed(16));

                            //type if load 
                            if (Type == 1) {
                                $(tr).find('td.ExpectedQty input').val(parseFloat(($(tr).find('td.ActualQty input').val() == "" || $(tr).find('td.ActualQty input').val() == "0") ? $(tr).find('td.ActualQty input').val() : $(tr).find('td.ActualQty input').val()).toFixed(9));
                            }
                            $(tr).find('td.ActualQty input').val(parseFloat($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()).toFixed(9));
                            $(tr).find('td.Density input').val(parseFloat($(tr).find("td.ActualDensity").text() == "" ? "0" : $(tr).find("td.ActualDensity").text()).toFixed(9));
                            $(tr).find('td.CostPrice input').val(parseFloat($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val()).toFixed(9));
                            $(tr).find('td.ExpectedQty input').val(parseFloat(0.000000000000).toFixed(9));
                            
                            //$(tr).find("td.ActualDensity").text(
                            CalculateINStageDetails(i1, tr, StageBody, pAveragePriceDetail, Type, r[1]);
                            FadePageCover(false);
                        }
                    });


                }
            }

        );
        // end of row
    });

    // setTimeout(function () { CalculateIsFinished = true }, 300);
    isTypeExpectedQty = 0;
    CalculateIsFinished = true;
  //  $('tr').closest
    //}
    //catch(ex)
    //{
    //    LoadAveragePriceDetails();


    //}
    }, 800);
}




function CalculateINStageDetails(i1, tr, StageBody, pAveragePriceDetail, Type , pCostPrice)
{



    NewQuantity = round1(NewQuantity, 9) /*parseFloat(parseFloat(NewQuantity).toFixed(6));*/
    OldQuantity = round1(OldQuantity, 9) /*parseFloat(parseFloat(OldQuantity).toFixed(6));*/

    //  FinalQty = (FinalQty + ((parseFloat($(tr).find('td.ActualQty input').val().trim()) / OldQuantity) * NewQuantity)   ) ;






    var ItemID = parseInt($(tr).find('td.ProductID select').val());



    // بنحسب كل مرا قيمة المتوسط بتاع العنصر 
    if ($('#hID').val() != "" && $('#hID').val() != "0")
        //$(tr).find('td.CostPrice input').val(parseFloat($(tr).find('td.CostPrice input').attr('tag')).toFixed(9));
        $(tr).find('td.CostPrice input').val(round1($(tr).find('td.CostPrice input').attr('tag'), 9));
    else {
        if (typeof ItemID !== "undefined" && ItemID != null && ItemID != 0 && ItemID != "0" && ItemID != "") {
            //$(tr).find('td.CostPrice input').val(parseFloat(pAveragePriceDetail.find(x => x.ProductID == ItemID).CostPrice).toFixed(6));
            $(tr).find('td.CostPrice input').val(round1( pCostPrice , 9));

        }
        else {
            $(tr).find('td.ProductID select').prop("disabled", false);
            $(tr).find('td.CostPrice input').val("0.000000");

        }

    }


    console.log("CostPrice : " + $(tr).find('td.CostPrice input').val());
    // لو هو سائل
    if ($(tr).find('td.Density input').val() != null && $(tr).find('td.Density input').val().trim() != "" && $(tr).find('td.Density input').val().trim() != "0" && parseFloat($(tr).find('td.Density input').val().trim()) != 0) {

        console.log("***سائل");


        //  var OutRow = $($(StageBody).find('.tblStageOut > tbody > tr'))[0];
        //var FinalQuantity = parseFloat(($(OutRow).find('td.ActualQty input').val() == "" ? "0" : $(OutRow).find('td.ActualQty input').val()));
        ////xxxxxxxxxxxx
        //FinalQuantity = (FinalQuantity / OldQuantity) * NewQuantity;
        ////xxxxxxxxxxx
        // $(tr).find('td.ExpectedQty input').val("0");
        // $(tr).find('td.ExpectedQty input').val(parseFloat((NewQuantity * parseFloat($(tr).find('td.Percentage input').val().trim()) * 1 /*UnitFactor*/) / 100).toFixed(2));


        // $(tr).find('td.ExpectedQty input').val((parseFloat($(tr).find('td.ExpectedQty input').val()) / OldQuantity) * NewQuantity);

        if (ChangedType != "" && $(ChangedType).attr('changetype') == "InActualQty") // ActualQty
        {


            //console.log("  (النسبه للعنصر السائل , المعادلة ( الكمية * 100 /الكمية النهائية  ");
            //console.log("( " + $(tr).find('td.ActualQty input').val() + " * " + " 100 " + " ) / " + NewQuantity+" ");

            //console.log($(tr).find('td.Percentage input').val())
            $(tr).find('td.ActualQty input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity, 9));
            if (Type == 1) {
                $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity, 9));
            }
            else {
                $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.ExpectedQty input').val()) / OldQuantity) * NewQuantity, 9));
            }
            //   $(tr).find('td.ExpectedQty input').val($(tr).find('td.ActualQty input').val());
            // $(tr).find('td.Density input').val((parseFloat($('#hidden_slItems option[value="' + $(tr).find('td.ProductID select').val() + '"]').attr('Volume')) * (parseFloat($(tr).find('td.Percentage input').val()) / 100)).toFixed(5));

            $(tr).find('td.Percentage input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / TotalActual * 100), 16))

        }
        else if (ChangedType != "" && $(ChangedType).attr('changetype') == "InPercentage") //Percentage
        {
            $(tr).find('td.ActualQty input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity, 9));
            if (Type == 1) {
                $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity, 9));
            }
            else {
                $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.ExpectedQty input').val()) / OldQuantity) * NewQuantity, 9));
            }
            //console.log("  (الكمية للعنصر السائل , المعادلة ( النسبة * الكمية النهائية /100  ");
            //console.log("( " + NewQuantity + " * " + parseFloat($(tr).find('td.Percentage input').val()) + " ) / 100 ");
            //$(tr).find('td.ActualQty input').val(round1( parseFloat((NewQuantity * parseFloat($(tr).find('td.Percentage input').val().trim()) * 1 /*UnitFactor*/) / 100) , 9 ));
            //$(tr).find('td.ExpectedQty input').val(round1(parseFloat((NewQuantity * parseFloat($(tr).find('td.Percentage input').val().trim()) * 1 /*UnitFactor*/) / 100) , 9 ));
            // $(tr).find('td.Density input').val((parseFloat($('#hidden_slItems option[value="' + $(tr).find('td.ProductID select').val() + '"]').attr('Volume')) * (parseFloat($(tr).find('td.Percentage input').val()) / 100)).toFixed(5));

            $(tr).find('td.ActualQty input').val(round1((parseFloat($(tr).find('td.Percentage input').val()) * TotalActual / 100), 16));
            $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.Percentage input').val()) * TotalActual / 100), 16));
            console.log($(tr).find('td.ActualQty input').val())
            // $(tr).find('td.Percentage input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / TotalActual * 100), 2) )
        }
        else if (ChangedType != "" && $(ChangedType).attr('changetype') == "HeaderQty") {
            console.log($(ChangedType).attr('changetype'));
            console.log($(tr).find('td.ActualQty input').val());
            console.log(OldQuantity);
            console.log(NewQuantity);
            $(tr).find('td.ActualQty input').val(round1((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity, 16));
            if (Type == 1) {
                $(tr).find('td.ExpectedQty input').val($(tr).find('td.ActualQty input').val());
            }
            else {
                $(tr).find('td.ExpectedQty input').val(round1((parseFloat($(tr).find('td.ExpectedQty input').val()) / OldQuantity) * NewQuantity, 16));
            }
            // $(tr).find('td.ExpectedQty input').val($(tr).find('td.ActualQty input').val());

            // $(tr).find('td.Density input').val((parseFloat($('#hidden_slItems option[value="' + $(tr).find('td.ProductID select').val() + '"]').attr('Volume')) * (parseFloat($(tr).find('td.Percentage input').val()) / 100)).toFixed(5));


        }
        //  var Original_Density = 
        $(tr).find('td.Density input').val(round1((round1($('#hidden_slItems option[value="' + $(tr).find('td.ProductID select').val() + '"]').attr('Volume'), 16) * (round1((parseFloat($(tr).find('td.ActualQty input').val()) / TotalActual * 100), 16) / 100)), 16));


        console.log(" /////  الكثافة " + $(tr).find('td.Density input').val());
        //  console.log("  (ضمن مجموع الكثافة النهائية , المعادلة ( الكثافة * النسبة /100  ");
        //    console.log(FinalDensity + " + (" + ((parseFloat($(tr).find('td.Percentage input').val().trim()) + " * " + parseFloat(($(tr).find('td.Density input').val() == "" ? "0" : $(tr).find('td.Density input').val())))) + " / " + "  100)")

        var D_per = round1(parseFloat($(tr).find('td.Percentage input').val().trim()), 16)
        // var D_density = parseFloat(($(tr).find('td.Density input').val() == "" ? "0" : $(tr).find('td.Density input').val())).toFixed(6);
        var D_density = round1(parseFloat($(tr).find('td.Density input').val()), 16);

        // FinalDensity = FinalDensity + (parseFloat((parseFloat(D_per) * parseFloat(D_density)) / 100).toFixed(6)) * 1.000000;
        FinalDensity = FinalDensity + parseFloat(D_density)  //(parseFloat((parseFloat(D_per) * parseFloat(D_density)) / 100).toFixed(6)) * 1.000000;

        // console.log(FinalDensity.);


        console.log("  (ضمن مجموع حساب تكلفة الوحدة للسائل , المعادلة =( سعر * الكمية الناتجة  ");
        console.log(round1(parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())) * parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val())))), 9);

        console.log(L_UnitCost + " +(" + parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())) + " * " + parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()))) + " )");
        L_UnitCost = round1(parseFloat(L_UnitCost + round1((parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())) * parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val())))), 9)), 9);
        console.log(L_UnitCost);



        $(tr).find('td.ExpectedQty input').prop('disabled', true);
        $(tr).find('td.Percentage input').prop('disabled', false);
    }
    else {
        if (Type == 1) {
            $(tr).find('td.ExpectedQty input').val((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity);
        }
        else {
            $(tr).find('td.ExpectedQty input').val((parseFloat($(tr).find('td.ExpectedQty input').val()) / OldQuantity) * NewQuantity);
        }
        $(tr).find('td.ActualQty input').val((parseFloat($(tr).find('td.ActualQty input').val()) / OldQuantity) * NewQuantity);

        //$(tr).find('td.ExpectedQty input').val(NewQuantity / (OldQuantity / parseFloat($(tr).find('td.ExpectedQty input').val())  ));
        //$(tr).find('td.ActualQty input').val(NewQuantity / (OldQuantity /parseFloat($(tr).find('td.ActualQty input').val()) )  );

        $(tr).find('td.Percentage input').val("0");
        $(tr).find('td.ExpectedQty input').prop('disabled', false);
        $(tr).find('td.Percentage input').prop('disabled', true);

        console.log("***العدد المتوقع" + $(tr).find('td.ActualQty input').val());
        console.log("***العدد الناتج" + $(tr).find('td.ActualQty input').val());




        console.log("  (ضمن مجموع حساب تكلفة الوحدة لغير لسائل , المعادلة =( سعر * الكمية الناتجة  ");
        console.log(UnitCost + " +(" + parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())) + " * " + parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()))) + " )");
        UnitCost = UnitCost + (parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())) * parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()))));
        console.log(UnitCost);



        //  $(tr).find('td.ActualQty input').val(parseFloat((NewQuantity * parseFloat($(tr).find('td.Percentage input').val().trim()) * 1 /*UnitFactor*/) / 100).toFixed(2));
    }
    FinalQty = (FinalQty + ((parseFloat($(tr).find('td.ActualQty input').val().trim()) / 1) * 1));
    console.log("  (ضمن مجموع حساب التكلفة النهائية , المعادلة =( الكمية الناتجة * السعر المتوسط  ");
    console.log(FinalAverage + " +(" + ((parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()))) + " * " + parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())))) + " )");
    FinalAverage = FinalAverage + (parseFloat((($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val()))) * parseFloat(($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val())));
    console.log(FinalAverage);









    if (i1 == $(StageBody).find('.tblStageIn > tbody > tr').length - 1) {


        $('#spanTotalPercentage').text(CalculateTotalPercentage(1));


        $($(StageBody).find('.tblStageOut > tbody > tr')).each(function (i2, tr2) {
            if (i2 == 0) {

                if (ChangedType != "" && $(ChangedType).attr('changetype') == "HeaderQty")
                    $(tr2).find('td.ActualQty input').val(NewQuantity);







                // OutActualQty



                //var FinalQty = parseFloat(($(tr2).find('td.ActualQty input').val() == "" ? NewQuantity : $(tr2).find('td.ActualQty input').val() ));       //parseFloat($(tr2).find('td.ActualQty ').find('.inputactualquantity').val());

                // FinalQty = (FinalQty / OldQuantity) * NewQuantity;


                console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                FinalQty = (round1(($(tr2).find('td.ActualQty input').val() == "" ? NewQuantity : $(tr2).find('td.ActualQty input').val()), 9));
                console.log(NewQuantity + " / " + parseFloat(($(tr2).find('td.ActualQty input').val() == "" ? NewQuantity : $(tr2).find('td.ActualQty input').val())) + " = " + FinalQty)
                console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                FinalCost = round1((FinalAverage / (FinalQty == 0 ? 1 : FinalQty)), 9);
                console.log("summary");
                console.log("التكلفة النهائية" + "  " + FinalCost);
                console.log(FinalAverage + ' * ' + (FinalQty == 0 ? 1 : FinalQty) + " = " + FinalCost)
                console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")


                FinalLiterCost = round1(((UnitCost + (FinalDensity * L_UnitCost)) / (FinalQty == 0 ? 1 : FinalQty)), 9);
                console.log("((تكلفة اللتر  = (تكلفة الوحدة لغير السائل +( الكثافة النهاية * تكلفة الوحدة للسائل");
                console.log(UnitCost + " + (" + FinalDensity + " * " + L_UnitCost + " )");

                FinalLiterCost = round1((round1(L_UnitCost, 9) * round1(FinalDensity, 16) + round1(UnitCost, 9)) / (FinalQty == 0 ? 1 : round1(FinalQty, 9)), 9)

                console.log(FinalLiterCost);


                $(tr2).find('td.Density input').val(round1(FinalDensity, 9) /*parseFloat(FinalDensity).toFixed(6)*/);
                $(tr2).find('td.CostPrice input').val(round1(FinalCost, 9) /*parseFloat(FinalCost).toFixed(6)*/);
                $(tr2).find('td.CostLiter input').val(round1(FinalLiterCost, 9)  /*parseFloat(FinalLiterCost).toFixed(6)*/);



                $(tr2).find('td.ExpectedQty input').val(round1(NewQuantity, 9));


                CalculateIsFinished = true;
                FadePageCover(false);
            }

        });

    }


}












var _ta = 0.000000
function GetTotalActualQty()
{
    debugger
    _ta = 0;
    if ($('.tblStageIn tbody tr').length > 0) {
    //setTimeout(function () {
     
            $('.tblStageIn tbody tr').each(function (i, tr) {
                if (parseFloat($(tr).find('td.Density').attr('val')) != 0) {
                    _ta = (_ta + parseFloat(($(tr).find('td.ActualQty input').val() == "" ? "0.00" : $(tr).find('td.ActualQty input').val())));

                }

                if (i == $('.tblStageIn tbody tr').length - 1)
                    return _ta;
            });
       

  //  }, 100);


    }
    else {

        return _ta;
    }


}

function FilltblInputs(Selector) {
    debugger;
    $.each($(Selector), function (j, tr) {
        try {
            var sl = $(tr).find('input[type=select]');
            console.log("sl" + sl.length)
            $.each($(tr).find('select'), function (i1, i_sl) {
                $(i_sl).val($(i_sl).attr('tag'));
            });
        } catch (ex1) { }
        //---------------------------------------------------------------------------------------------------------
        try {
            var nu = $(tr).find('input[type=number]');
            console.log("nu" + nu.length)
            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
                $(i_nu).val($(i_nu).attr('tag'));
            });
        } catch (ex2) { }
        //---------------------------------------------------------------------------------------------------------
        try {
            var txt = $(tr).find('input[type=text]');
            console.log("txt" + txt.length)
            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
                $(i_txt).val($(i_txt).attr('tag'));
            });
        } catch (ex3) { }
    });
}

function CalculateTotalPercentage(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.Percentage input").val() == "" ? 0 : parseFloat($(tr).find("td.Percentage input").val()));
    });


    return TotalPercentage;


}

function CalculateTotalQty(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.ExpectedQty input").val() == "" ? 0 : parseFloat($(tr).find("td.ExpectedQty input").val()));
    });


    return TotalPercentage;


}

function CalculateTotalDensity(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.Density input").val() == "" ? 0 : parseFloat($(tr).find("td.Density input").val()));
    });


    return TotalPercentage;


}

function SetArrayOfItems1() {
    var objArr = new Array();
    console.log($('#hID').val());
    ErrorMessage = "";

    if ($(".StageBody").length <= 0) {
        ErrorMessage = "Please Insert Statges";
    }

    if ($("#txtDate").val() == "0")
        ErrorMessage = "Please Insert Date ";
    if ($("#txtStartDate").val() == "0")
        ErrorMessage = "Please Insert Start Date ";
    if ($("#txtFinishedDate").val() == "0")
        ErrorMessage = "Please Insert Finished Date ";
    if ($("#slFromStore").val() == "0")
        ErrorMessage = "Please Insert From Store ";
    if ($("#slToStore").val() == "0")
        ErrorMessage = "Please Insert To Store ";



    // هنجمع كل مرحلة بالتفاصيل بتاعتها في (فيو) واحد
    $(".StageBody").each(function (i, StageBody) {
        var OrderNo = $(StageBody).attr('order');

        if ($($(StageBody).find('.tblStageIn > tbody > tr')).length <= 0) {
            ErrorMessage = "Please Insert [IN Items] in Stage No(" + OrderNo + ") ";

        }

        if ($($(StageBody).find('.tblStageOut > tbody > tr')).length <= 0) {
            ErrorMessage = "Please Insert [OUT Items] in Stage No(" + OrderNo + ") ";

        }


        if ($('.slStages[order=' + OrderNo + ']').val() == "0") {
            ErrorMessage = "Please Select [Stage Name] in Stage No(" + OrderNo + ") ";
        }


        if ($('#slProductID').val() == "0") {
            ErrorMessage = "Please Select [Final Product] in Stage No(" + OrderNo + ") ";
        }
        //*************************************************************************************** 111111111111111111111111111
        $($(StageBody).find('.tblStageIn > tbody > tr')).each(function (i1, tr) {


            var objItem = new Object();
            objItem.ID = "0";
            objItem.TransactionID = $('#hID').val();
            objItem.ItemID = $(tr).find('td.ProductID select').val(); //$(tr).find('td.ItemID').attr('val');
            objItem.StoreID = $("#slFromStore").val();
            objItem.ReturnedQty = "0";
            objItem.CurrencyID = $(tr).find('td.CurrencyID').attr('val');
            objItem.ExchangeRate = $(tr).find('td.ExchangeRate').attr('val');
            objItem.Notes = "-";
            objItem.PurchaseInvoiceDetailsID = "0";
            objItem.SLInvoiceDetailsID = $(tr).find('td.SLInvoiceDetailsID').attr('val');
            objItem.SubAccountID = "0";
            objItem.OriginalQty = "0";
            objItem.ParentID = $('.slStages[order=' + OrderNo + ']').val(); //xxxxxxxxxx
            objItem.AveragePrice = ($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val()); //xxxxxxxxxxx
            objItem.TransactionDate = ConvertDateFormat($('#txtDate').val());
            objItem.QtyFactor = "-1";
            objItem.ActualQty = ($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val());  // quantity after convert
            objItem.TransactionTypeID = "90";
            objItem.TaxAmount = "0";
            objItem.DiscountAmount = "0";
            objItem.InvoicePrice = "0";
            objItem.Qty = ($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val());  // quantity after convert
            objItem.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
            objItem.ItemQty = $(tr).find('td.ActualQty ').find('.inputactualquantity').val(); // inserted quantity
            objItem.UnitFactor = 1;
            objItem.TaxAmount = "0";
            objItem.DiscountAmount = "0";
            objItem.InvoicePrice = 0;//($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
            objItem.AvaliableQty = 0;
            objItem.P_Percentage =  ($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val()) ;
            objItem.P_Density =  ($(tr).find('td.Density input').val() == "" ? "0" : $(tr).find('td.Density input').val()) ;
            objItem.ToStoreID = 0;
            objItem.P_LiterCost = 0;//($(tr).find('td.CostLiter input').val() == "" ? "0" : $(tr).find('td.CostLiter input').val());
            objItem.P_ExpectedQty = ($(tr).find('td.ExpectedQty input').val() == "" ? "0" : $(tr).find('td.ExpectedQty input').val());
            objArr.push(objItem);


            //if (parseFloat(objItem.P_ExpectedQty) < parseFloat(objItem.ActualQty)) {

            //    ErrorMessage = " Actual Qty Must <= Expected Qty in [tbl IN] in Stage No(" + OrderNo + ") ";
            //}

            if (objItem.P_Percentage == "0" && objItem.P_ExpectedQty == "0") {
                ErrorMessage = "Please Insert [Percentage OR  Expected Qty] in [tbl IN] in Stage No(" + OrderNo + ") ";
            }
            if (objItem.Qty == "0") {
                ErrorMessage = "Please Insert [Qty] in [tbl IN] in Stage No(" + OrderNo + ") ";
            }
            if (objItem.ItemID == "0") {
                ErrorMessage = "Please Select [Product] in [tbl IN] in Stage No(" + OrderNo + ") ";

            }

            if ($($(StageBody).find('.tblStageIn > tbody > tr')).length - 1 == i1) {
                var _per = CalculateTotalPercentage(OrderNo);
                if (!(_per >= 99.9 && _per <= 100.1))
                {
                    ErrorMessage = "Must Total Percentage = 100% in [tbl IN] in Stage No(" + OrderNo + ") ";
                }
            }


        });

        //*************************************************************************************** 222222222222

        $($(StageBody).find('.tblStageOut > tbody > tr')).each(function (i, tr) {
            var objItem1 = new Object();
            objItem1.ID = "0";
            objItem1.TransactionID = $('#hID').val();
            objItem1.ItemID = $(tr).find('td.ProductID select').val(); //$(tr).find('td.ItemID').attr('val');
            objItem1.StoreID = $("#slToStore").val();
            objItem1.ReturnedQty = "0";
            objItem1.CurrencyID = 0; // $(tr).find('td.CurrencyID').attr('val');
            objItem1.ExchangeRate = 0;//$(tr).find('td.ExchangeRate').attr('val');
            objItem1.Notes = "-";
            objItem1.PurchaseInvoiceDetailsID = "0";
            objItem1.SLInvoiceDetailsID = 0;//$(tr).find('td.SLInvoiceDetailsID').attr('val');
            objItem1.SubAccountID = "0";
            objItem1.OriginalQty = "0";
            objItem1.ParentID = $('.slStages[order=' + OrderNo + ']').val(); //xxxxxxxxxx
            objItem1.AveragePrice = ($(tr).find('td.CostPrice input').val() == "" ? "0" : $(tr).find('td.CostPrice input').val()); //xxxxxxxxxxx
            objItem1.TransactionDate = ConvertDateFormat($('#txtDate').val());
            objItem1.QtyFactor = "1";
            objItem1.ActualQty = ($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val());  // quantity after convert
            objItem1.TransactionTypeID = "90";
            objItem1.TaxAmount = "0";
            objItem1.DiscountAmount = "0";
            objItem1.InvoicePrice = "0";
            objItem1.Qty = ($(tr).find('td.ActualQty input').val() == "" ? "0" : $(tr).find('td.ActualQty input').val());  // quantity after convert
            objItem1.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
            objItem1.ItemQty = $(tr).find('td.ActualQty ').find('.inputactualquantity').val(); // inserted quantity
            objItem1.UnitFactor = 1;
            objItem1.TaxAmount = "0";
            objItem1.DiscountAmount = "0";
            objItem1.InvoicePrice = "0"; //  //($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
            objItem1.AvaliableQty = 0;
            objItem1.P_Percentage = 0; //($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val());
            objItem1.P_Density = ($(tr).find('td.Density input').val() == "" ? "0" : $(tr).find('td.Density input').val());
            objItem1.ToStoreID = 0;
            objItem1.P_LiterCost = ($(tr).find('td.CostLiter input').val() == "" ? "0" : $(tr).find('td.CostLiter input').val());
            objItem1.P_ExpectedQty = ($(tr).find('td.ExpectedQty input').val() == "" ? "0" : $(tr).find('td.ExpectedQty input').val());
            objArr.push(objItem1);
            if (objItem1.Qty == "0") {
                ErrorMessage = "Please Insert [Qty] in [tbl OUT] in Stage No(" + OrderNo + ") ";
            }
            if (objItem1.P_ExpectedQty == "0") {
                ErrorMessage = "Please Insert [Expected Qty] in [tbl OUT] in Stage No(" + OrderNo + ") ";
            }
            if (objItem1.ItemID == "0") {
                ErrorMessage = "Please Select [Product] in [tbl OUT] in Stage No(" + OrderNo + ") ";
            }
            //if (parseFloat(objItem1.P_ExpectedQty) < parseFloat(objItem1.ActualQty)) {

            //    ErrorMessage = " Actual Qty Must <= Expected Qty in [tbl Out] in Stage No(" + OrderNo + ") ";
            //}

            // if ($($(StageBody).find('.tblStageOut > tbody > tr')).length-1 == i)




        });


    });




    return [objArr, ErrorMessage];
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
        objItem.StoreID = $("#slToStore").val();
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
        objItem.QtyFactor = "1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "90";
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = "0";
        objItem.Qty = $(tr).find('td.Qty ').find('.inputquantity').val();  // quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty ').find('.inputquantity').val(); // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
        objItem.AvaliableQty = 0;
        objItem.P_Percentage = 0;
        objItem.P_Density = 0;
        objItem.ToStoreID = 0;
        objItem.P_LiterCost = 0;
        objItem.P_ExpectedQty = 0;


        arrayOfItems.push(objItem);

        //******************************************************
        //************************** POP **********************
        //******************************************************
        var objItem1 = new Object();
        objItem1.ID = "0";
        objItem1.TransactionID = $('#hID').val();
        objItem1.ItemID = $(tr).find('td.ItemID ').find('.selectitem').val(); //$(tr).find('td.ItemID').attr('val');
        objItem1.StoreID = $("#slFromStore").val();
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
        objItem1.QtyFactor = "-1";
        objItem1.ActualQty = "0";
        objItem1.TransactionTypeID = "90";



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

function AddNewRow() {
    debugger;
    // $("#hl-menu-PR").parent().addClass("active");
    // ClearAllTableRows("tblItems");
    // $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
    debugger;
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    AppendRowtoTable("tblItems",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (RowsCounter + 1) + "' value='" + 0 + "'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ItemID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
            + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
            + "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='StoreID hide' val='" + "0" + "'>" + "<select id='store-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
            + "<td class='QuantityInStore hide' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
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
            + "<td class='TransactionTypeID hide' val='" + "90" + "'>" + "0" + "</td>"
            + "</tr>"));

    RowsCounter++;
}

function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");
        // var InputDensity = 

        var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

        //if (UnitID == 0 || UnitID == "0")
        //  {
        var a = Units.indexOf("-1");
        $(SelectUnit).val(Units[a - 1]);
        $(tr).find("input.inputdensity").val($(ItemSelect).find("option:selected").attr("Volume"));
        $(tr).find("td.ActualDensity").text($(ItemSelect).find("option:selected").attr("Volume"));
        //    }



        LoadAveragePriceDetails();
    }
}



//function SetItemDensity(ItemSelect) {
//    console.log(ItemSelect);
//    console.log($(ItemSelect).is(".selectitem"));
//    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
//        var tr = $(ItemSelect).closest("tr");
//        var txtDensity = $(tr).find("input.inputdensity");
//        var UnitID = $(tr).find("td.Density").attr("val");
//        // var InputDensity = 
//        //
//        var Units = $(ItemSelect).find("option:selected").attr("density").split(',');

//        //if (UnitID == 0 || UnitID == "0")
//        //  {
//        var a = Units.indexOf("-1");
//        $(SelectUnit).val(Units[a - 1]);
//        $(tr).find("input.inputdensity").val($(ItemSelect).find("option:selected").attr("Volume"));
//        $(tr).find("td.ActualDensity").text($(ItemSelect).find("option:selected").attr("Volume"));
//        //    }



//        LoadAveragePriceDetails();
//    }
//}



function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
        LoadAveragePriceDetails();
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
                LoadAveragePriceDetails();
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
            , pP_FinishedDate: "01/01/1900"
            , pP_StartDate: "01/01/1900"
            , pEntitlementDays: RollBackData.EntitlementDays
            , pIsClosed: RollBackData.IsClosed
            , pFromStore: RollBackData.FromStore
            , pJV_ID2: RollBackData.JV_ID2
            , pTransferParentID: RollBackData.TransferParentID
            , pForwardingPSInvoiceID: RollBackData.ForwardingPSInvoiceID


            , pOperationID: RollBackData.OperationID
            , pBranchID: RollBackData.BranchID
            , pIsFromFlexi: RollBackData.IsFromFlexi
        }, true, null, '#hID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}
//#endregion details

