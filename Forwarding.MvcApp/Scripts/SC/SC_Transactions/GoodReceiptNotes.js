// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows

var _IsApproved = false;
var TransTypeID = 10;
var RollBackData = {};
var IsInsert = false;
var InvoiceID = 0;
var ExaminationID = 0;

var ForwInvoiceID = 0;
//var IsFromInvoice = false;
var all_has_store = false;


var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val()
    // CheckIfAllLoading();
});

$(document).ready(function () {
    //$("#slAccount").css({ "width": "100%" }).select2();
    //$("#slSubAccount").css({ "width": "100%" }).select2();
    $("#slSupplierName").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});



//
//#region Header
function SC_Transactions_BindTableRows(pSC_Transactions) {
    debugger;
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

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
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + (item.ForwardingPSInvoiceID != 0 ? ("Forwarding Inv - " + item.InvoiceNo) : item.InvoiceNo) + "</td>"
                + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
                + "<td class='PartnerName' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
                + "<td class='IsApproved' val='" + item.IsApproved + "'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='SLInvoiceID hide' val='" + item.SLInvoiceID + "'>" + item.SLInvoiceID + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='ClientID hide' val='" + item.ClientID + "'>" + item.ClientID + "</td>"
                + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
                + "<td class='IsSpareParts hide' val='" + item.IsSpareParts + "'>" + item.IsSpareParts + "</td>"
                + "<td class='FiscalYearID hide' val='" + item.FiscalYearID + "'>" + item.FiscalYearID + "</td>"
                + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"

                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
                + "<td class='JV_ID hide' val='" + item.JV_ID + "'>" + item.JV_ID + "</td>"
                + "<td class='IsOutOfStore hide' val='" + item.IsOutOfStore + "'>" + item.IsOutOfStore + "</td>"


                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
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

                + "<td class='TAmount hide' val='" + item.TAmount + "'>" + item.TAmount + "</td>"
                + "<td class='TotalQty hide' val='" + item.TotalQty + "'>" + item.TotalQty + "</td>"
                + "<td class='TruckerID hide' val='" + item.TruckerID + "'>" + item.TruckerID + "</td>"
                + "<td class='CardNo hide' val='" + item.CardNo + "'>" + item.CardNo + "</td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"
                //    , st.
                //    , st.
                //    , st.



                //, Trailer.Code  TrailerCode
                //, Equipments.Name 
                //, Equipments.Code EquipmentCode
                //, Devisons.Name 
                //, Devisons.Code DevisonCode
                //, departments.Name DepartmentName
                //, departments.Code DepartmentCode

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
    var WhereClause = "Where TransactionTypeID = 10 AND ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = '" + $('#txtCode_Filter').val() + "'";
    }
    if ($('#txtNotes_Filter').val().trim() != "") {
        WhereClause += " AND Notes LIKE N'%" + $('#txtNotes_Filter').val() + "%'";
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
    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo = '" + $('#txtInvoiceNo_Filter').val() + "'";
    }
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}

function SC_Transactions_Update(pSaveandAddNew) {
    IsInsert = false;
    FadePageCover(true)
    console.log('SC_Transactions_Insert');



    if (pDefaults.UnEditableCompanyName == "AGR" || ((pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") && $("#cbIsManual").is(":checked"))) {


        var TotalQtyDetails = 0
        $("#tblItems>tbody>tr").each(function (i, tr) {

            TotalQtyDetails += parseFloat(IsNull($(tr).find('td.Qty').attr('val'), $(tr).find('td.Qty  ').find('.inputquantity  ').val()));


        });

        if ($("#txtQty").val() != TotalQtyDetails) {
            swal('من فضلك', 'المجموع الكلي لا يساوي التفصيلي', 'warning');
            _isValed = 1
            FadePageCover(false)
        }


        if ($('#slSupplierName').val() == 0) {

            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختار المورد' : 'Choose Supplier'), 'warning');
            _isValed = 1
            FadePageCover(false)
        }
        else {
            _pSupplierID = $('#slSupplierName').val()

        }
    }
    else {
        _pSupplierID = (($("#cbIsFromInvoice").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? IsNull($("#slPSInvoices option:selected").attr('SupplierID'), "0") : $("#slExminationOrders option:selected").attr('SupplierID'))

    }
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
        var averageprice = IsNull($(tr).find('td.AveragePrice  ').find('.inputprice').val(), "0");


        if (pDefaults.UnEditableCompanyName == "AGR" || pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {

            if (storeid.trim() == "0") {

                all_has_store = false;
                return false;
            }


            if (averageprice == null || averageprice.trim() == "" || parseFloat(averageprice) < 0) {

                all_has_store = false;
                return false;

            }


            else {

                all_has_store = true;
            }


        }
        else {

            if (storeid.trim() == "0") {

                all_has_store = false;
                return false;
            }


            if (averageprice == null || averageprice.trim() == "" || parseFloat(averageprice) <= 0) {

                all_has_store = false;
                return false;

            }

            else {

                all_has_store = true;
            }



        }



    });



    setTimeout(function () {
        debugger;
        // $('.selectstore').html($('#slStores').html());
        debugger;
        if ($('#tblItems > tbody > tr').length == 0) {
            //  swal('Excuse me', 'Fill Items', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill Items'), 'warning');
            FadePageCover(false)
        }
        else if (!all_has_store) {

            // swal('Excuse me', 'Fill All Items Stores', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر جميع المخازن' : 'Fill All Items Stores'), 'warning');
            FadePageCover(false)

        }

        
        else if (pDefaults.UnEditableCompanyName != "AGR" && pDefaults.UnEditableCompanyName != "CHM" && pDefaults.UnEditableCompanyName != "OCE" &&  ($("#cbIsFromInvoice").is(":checked") == true || $("#cbIsFromForwarding").is(":checked") == true) && ($("#slPSInvoices") == null || $("#slPSInvoices").val() == "0")  ) {
            // swal('Excuse me', 'You Must Select Invoice', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب اختيار الفاتورة' : 'You Must Select Invoice'), 'warning');

        }

        else if (pDefaults.UnEditableCompanyName != "AGR" && pDefaults.UnEditableCompanyName != "CHM" && pDefaults.UnEditableCompanyName != "OCE" && ($("#cbIsFromInvoice").is(":checked") == false && $("#cbIsFromForwarding").is(":checked") == false) && ($("#slExminationOrders") == null || $("#slExminationOrders").val() == "0")) {
            // swal('Excuse me', 'You Must Select Exmination Order', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب اختيار أمر الفحص' : 'You Must Select Exmination Order'), 'warning');
        }

        else if (($("#slTruckerID").val() == "" || $("#slTruckerID").val() == "0") && parseFloat(IsNull($("#txtAmount").val().trim(), "0")) > 0) {
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر السواق' : 'Select trucker'), 'warning');
            FadePageCover(false)

        }
        else if (_isValed == 1) {
            FadePageCover(false)
        }
        

        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
                pID: $('#hID').val(),
                pCode: $("#txtCode").val(),
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: (($("#cbIsFromInvoice").is(":checked")) ? $("#slPSInvoices").val() : "0"),
                pPurchaseOrderID: "0",
                pExaminationID: (($("#cbIsFromInvoice").is(":checked") || $("#cbIsManual").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? "0" : $("#slExminationOrders").val()),
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == null || $("#txtNotes").val() == "" ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: "0",
                pDepartmentID: "0",
                pClientID: "0",
                pCostCenterID: "0",
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: _pSupplierID,
                pParentID: "0",
                pTransactionTypeID: "10",
                pJV_ID: "0", pIsOutOfStore: (($("#cbIsFromInvoice").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? false : true)
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
                pFromStore: 0,
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: ($("#cbIsFromForwarding").is(":checked") ? $("#slPSInvoices").val() : "0"),
                pOperationID: "0",
                pBranchID: "0",
                pIsFromFlexi: "false"
                , pTrailerID: "0",
                pEquipmentID: "0",
                pAmount: IsNull($("#txtAmount").val(), "0"),
                pTotalQty: IsNull($("#txtQty").val(), "0"),
                pTruckerID: IsNull($("#slTruckerID").val(), "0")
                , pCardNo: IsNull($("#txtCartaNo").val(), "0")

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
            // swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل التاريخ بصورة صحيحة' : 'You Must Select Exmination Order'), 'warning');

        }
    }, 30);
}

var _pSupplierID = 0;
var _isValed = 0;  // abdoo 
function SC_Transactions_Insert(pSaveandAddNew) {
    debugger;
    _isValed = 0;
    FadePageCover(true)
    IsInsert = true;
    if (pDefaults.UnEditableCompanyName == "AGR" || ((pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") && $("#cbIsManual").is(":checked")) ) {

        var TotalQtyDetails = 0
        $("#tblItems>tbody>tr").each(function (i, tr) {

            TotalQtyDetails += parseFloat(IsNull($(tr).find('td.Qty').attr('val'), $(tr).find('td.Qty  ').find('.inputquantity  ').val()));


        });
        
        if ($("#txtQty").val() != TotalQtyDetails) {
            swal('من فضلك', 'المجموع الكلي لا يساوي التفصيلي', 'warning');
            _isValed = 1
            FadePageCover(false)
        }

        if ($('#slSupplierName').val() == 0) {

            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختار المورد' : 'Choose Supplier'), 'warning');
            _isValed = 1
            FadePageCover(false)
        }
        else {
            _pSupplierID = $('#slSupplierName').val()

        }
    }
    else {
        _pSupplierID = (($("#cbIsFromInvoice").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? IsNull($("#slPSInvoices option:selected").attr('SupplierID'), "0") : $("#slExminationOrders option:selected").attr('SupplierID'))

    }
    console.log('SC_Transactions_Insert');
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        var storeid = IsNull($(tr).find('td.StoreID ').find('.selectstore').val(), "0");
        var averageprice = IsNull($(tr).find('td.AveragePrice  ').find('.inputprice').val(), "0");

        if (pDefaults.UnEditableCompanyName == "AGR" || pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {

            if (storeid.trim() == "0") {

                all_has_store = false;
                return false;
            }


            if (averageprice == null || averageprice.trim() == "" || parseFloat(averageprice) < 0) {

                all_has_store = false;
                return false;

            }


            else {

                all_has_store = true;
            }


        }
        else {

        if (storeid.trim() == "0") {

            all_has_store = false;
            return false;
        }


        if (averageprice == null || averageprice.trim() == "" || parseFloat(averageprice) <= 0) {

            all_has_store = false;
            return false;

        }

        else {

            all_has_store = true;
        }



        }


    });



    setTimeout(function () {

        // $('.selectstore').html($('#slStores').html());
        debugger;
        if ($('#tblItems > tbody > tr').length == 0) {
            //  swal('Excuse me', 'Fill Items', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill Items'), 'warning');

            FadePageCover(false)
        }
        else if (!all_has_store) {

            //  swal('Excuse me', 'Fill All Items Stores Or Price', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب ادخال المخازن و الأسعار' : 'Fill All Items Stores Or Price'), 'warning');
            FadePageCover(false)

        }
        else if (pDefaults.UnEditableCompanyName != "AGR" && pDefaults.UnEditableCompanyName != "CHM" && pDefaults.UnEditableCompanyName != "OCE" && ($("#cbIsFromInvoice").is(":checked") == true || $("#cbIsFromForwarding").is(":checked") == true) && ($("#slPSInvoices") == null || $("#slPSInvoices").val() == "0")) {
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب اختيار الفاتورة' : 'You Must Select Invoice'), 'warning');

            // swal('Excuse me', 'You Must Select Invoice', 'warning');
        }
        else if (pDefaults.UnEditableCompanyName != "AGR" && pDefaults.UnEditableCompanyName != "CHM" && pDefaults.UnEditableCompanyName != "OCE"  && ($("#cbIsFromInvoice").is(":checked") == false && $("#cbIsFromForwarding").is(":checked") == false) && ($("#slExminationOrders") == null || $("#slExminationOrders").val() == "0")) {
            //swal('Excuse me', 'You Must Select Exmination Order', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب اختيار امر الفحص' : 'You Must Select Exmination Order'), 'warning');

        }
        else if (($("#slTruckerID").val() == "" || $("#slTruckerID").val() == "0") && parseFloat(IsNull($("#txtAmount").val().trim(), "0")) > 0) {
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر السواق' : 'Select trucker'), 'warning');
            FadePageCover(false)

        }
        else if (_isValed == 1) {
            FadePageCover(false)
        }
        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {
            debugger;

            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Insert", {
                pCode: $("#txtCode").val(),
                pCodeManual: "0",
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: (($("#cbIsFromInvoice").is(":checked")) ? $("#slPSInvoices").val() : "0"),
                pPurchaseOrderID: "0",
                pExaminationID: (($("#cbIsFromInvoice").is(":checked") || $("#cbIsManual").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? "0" : $("#slExminationOrders").val()),
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == null || $("#txtNotes").val() == "" ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: "0",
                pDepartmentID: "0",
                pClientID: "0",
                pCostCenterID: "0",
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: _pSupplierID,
                pParentID: "0",
                pTransactionTypeID: "10",
                pJV_ID: "0", pIsOutOfStore: (($("#cbIsFromInvoice").is(":checked") || $("#cbIsFromForwarding").is(":checked")) ? false : true)
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
                pFromStore: 0,
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: ($("#cbIsFromForwarding").is(":checked") ? $("#slPSInvoices").val() : "0"),
                pOperationID: "0",
                pBranchID: "0",
                pIsFromFlexi: "false"
                , pTrailerID: "0",
                pEquipmentID: "0",
                pAmount: IsNull($("#txtAmount").val(), "0"),
                pTotalQty: IsNull($("#txtQty").val(), "0"),
                pTruckerID: IsNull($("#slTruckerID").val(), "0")
                , pCardNo: IsNull($("#txtCartaNo").val(), "0")




            }, pSaveandAddNew, null, '#hID', function () {
                // FadePageCover(true);
                InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                    JSON.stringify(SetArrayOfItems())
                    , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                        FadePageCover(true)
                        $('#txtCode').val(Code[1]);
                        PrintTransaction();
                        console.log(Code[0]);
                        setTimeout(function () {
                            SC_Transactions_LoadingWithPaging();
                            // IntializeData();
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


function SC_Transactions_EditByDblClick(pID, IsApproved) {
    _IsApproved = IsApproved;
    jQuery("#SC_TransactionsModal").modal("show");
    SC_Transactions_FillControls(pID);
    // SC_HideShowEditBtns(IsApproved);
}

var _hID = 0;
function SC_Transactions_FillControls(pID) {
    debugger;

    //SC_Transactions_ClearAllControls
    // Fill All Model Controls
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);
    _hID = pID;
    IntializeData();
    //IntializeData(function () {
        setTimeout(function () {
            ClearAll("#SC_TransactionsModal", null);

            debugger;
            $("#hID").val(pID);
            var tr = $("#tblSC_Transactions > tbody > tr[ID='" + pID + "']");
            $("#slPSInvoices").html($('#slPSInvoices_Filter').html());
            $("#txtCode").val($(tr).find("td.Code").attr('val').toUpperCase());


            $("#slPSInvoices").prop('disabled', true);

            $("#txtDate").val($(tr).find("td.TransactionDate").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
            //  $("#slCostCenterID").val($(tr).find("td.CostCenterID").attr('val'));
            $("#btnSave").attr("onclick", "SC_Transactions_Update(false);");
            $("#btnSaveandNew").attr("onclick", "SC_Transactions_Update(true);");


            if ($(tr).find("td.ExaminationID").attr('val') == "0") {
                $("#cbIsFromInvoice").prop("checked", true);
            }
            else {
                $("#cbIsFromInvoice").prop("checked", false);
            }

            //ForwardingPSInvoiceID 
            if ($(tr).find("td.ForwardingPSInvoiceID").attr('val') != "0") {
                ForwInvoiceID = $(tr).find("td.ForwardingPSInvoiceID").attr('val');
                $("#cbIsFromForwarding").prop("checked", true);
                $("#slPSInvoices").val(ForwInvoiceID);
            }
            else {
                $("#slPSInvoices").val($(tr).find("td.PurchaseInvoiceID").attr('val'));
                InvoiceID = $(tr).find("td.PurchaseInvoiceID ").attr('val');
                $("#slPSInvoices").val(InvoiceID);
            }

            if (pDefaults.UnEditableCompanyName == "AGR") {

                $('#slSupplierName').val($(tr).find("td.SupplierID ").attr('val'));
                $('#slSupplierName').trigger("change");

                $('#slTruckerID').val($(tr).find("td.TruckerID ").attr('val'));
                $('#slTruckerID').trigger("change");


                $('#txtAmount').val($(tr).find("td.TAmount ").attr('val'));
                $('#txtQty').val($(tr).find("td.TotalQty ").attr('val'));
                $('#txtCartaNo').val($(tr).find("td.CardNo ").attr('val'));


            }
            else {
                $("#slExminationOrders").val($(tr).find("td.SupplierID ").attr('val'));
                $('#lblSupplierName').text($(tr).find("td.PartnerName").attr('val'));

            }
            if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {
                if ($(tr).find("td.ForwardingPSInvoiceID").attr('val') == "0" && $(tr).find("td.PurchaseOrderID").attr('val') == "0" && $(tr).find("td.ExaminationID").attr('val') == "0") {
                    $("#cbIsManual").prop("checked", true);
                }

                $('#slSupplierName').val($(tr).find("td.SupplierID ").attr('val'));
                $('#slSupplierName').trigger("change");

                $('#slTruckerID').val($(tr).find("td.TruckerID ").attr('val'));
                $('#slTruckerID').trigger("change");


                $('#txtAmount').val($(tr).find("td.TAmount ").attr('val'));
                $('#txtQty').val($(tr).find("td.TotalQty ").attr('val'));
                $('#txtCartaNo').val($(tr).find("td.CardNo ").attr('val'));


            }
            else {
                $("#slExminationOrders").val($(tr).find("td.SupplierID ").attr('val'));
                $('#lblSupplierName').text($(tr).find("td.PartnerName").attr('val'));

            }


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

            $("#slExminationOrders").val($(tr).find("td.ExaminationID").attr('val'));
            ExaminationID = $(tr).find("td.ExaminationID ").attr('val');
            


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



        }, 1000);
    //});



    //SC_Transactions_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);

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
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 AM" }
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

    $('#lblSupplierName').text('');
    $("#btnSave").attr("onclick", "SC_Transactions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SC_Transactions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val(TranslateString("Auto"));
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#hID').val("0");
    $("#txtAmount").val(0);
    $("#txtQty").val(0);
    $("#slTruckerID").val(0);
    $("#txtCartaNo").val(0);
    _hID = 0;
    //(false);



    var IsStartFromInvoice = IsNull($('#hReadySlOptions option[value="2031"]').attr("OptionValue"), "false");


    if (IsStartFromInvoice == "true") {

        $('#cbIsFromInvoice').prop("checked", true);
        $('#cbIsFromForwarding').prop("checked", false);
        $('#cbIsFromExaminationOrder').prop("checked", false);
    }
    else {
        $('#cbIsFromInvoice').prop("checked", false);
        $('#cbIsFromForwarding').prop("checked", false);
        $('#cbIsFromExaminationOrder').prop("checked", true);

    }

    IntializeData();

}



//#endregion Header


//#region Details

function SC_TransactionsDetails_BindTableRows(pSC_TransactionsDetails) {
    debugger;

    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ID '> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                + "<td class='ItemID ' val='" + item.ItemID + "'>" + $("#hidden_slItems option[value='" + item.ItemID + "']").text() + "</td>"
                + "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='StoreID' val='" + item.StoreID + "'>" + "<select id='store-" + item.ID + "' tag=" + item.StoreID + " class='input-sm  col-sm selectstore .Edit-input'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + item.ReturnedQty + "'>" + item.ReturnedQty + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='AveragePrice ' val='" + item.AveragePrice + "'>" + "<input type='text' tag='" + item.AveragePrice + "' class='input-sm col-sm inputprice'/>" + "</td>"
                + "<td class='NetValue ' val='" + parseFloat(item.AveragePrice * item.Qty) + "'>" + "<input type='text' tag='" + parseFloat(item.AveragePrice * item.Qty) + "' disabled class='input-sm col-sm inputNetValue'/>" + "</td>"
                + "<td class='TransIDYard hide' val='" + item.TransIDYard + "'>" + item.TransIDYard + "</td>"

                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + item.PurchaseInvoiceDetailsID + "'>" + item.PurchaseInvoiceDetailsID + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + item.SLInvoiceDetailsID + "'>" + item.SLInvoiceDetailsID + "</td>"
                + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + item.SubAccountID + "</td>"
                + "<td class='OriginalQty hide' val='" + item.OriginalQty + "'>" + item.OriginalQty + "</td>"
                + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
                + "<td class='TransactionDate hide' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='QtyFactor hide' val='" + item.QtyFactor + "'>" + item.QtyFactor + "</td>"
                + "<td class='ActualQty hide' val='" + item.ActualQty + "'>" + item.ActualQty + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
                + "</tr>"));



    });

    $("#tblItems").find("input").attr('onchange', 'CalculateAll(this);');
    $("#tblItems").find("input").attr('onblur', 'CalculateAll(this);');
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
        // $("#tblItems").find("input,button,textarea,select").attr("disabled", _IsApproved); 

        SC_HideShowEditBtns(_IsApproved);
        FillStores();

    }, 300);

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

//function GetItemQuantityInStore(Calculate_btn) {
//    FadePageCover(true);
//    var tr = $(Calculate_btn).closest('tr');
//    //  $(Calculate_btn).siblings('.span_quantity').attr('counter')
//    var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
//    var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();

//    if (storeid.trim() == "0" || itemid.trim() == "0") {

//        // swal('Excuse me', 'select Item and Store', 'warning');

//        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الصنف و المخزن' : 'select Item and Store'), 'warning');
//        FadePageCover(false);
//    }
//    else {
//        //GetItemQuantityInStore(string pItemID , string pStoreID , DateTime pDate)
//        $.ajax({
//            type: "Get",
//            url: "/api/SC_Transactions/CalculateItemQuantityInStore",
//            data: { pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtDate').val()), pTransactionID: ($('#hID').val().trim() == "" ? "0" : $('#hID').val().trim()) },
//            dataType: "json",
//            success: function (r) {
//                // $(tr).find('.QuantityInStore').html();
//                $(tr).find('.QuantityInStore').find('.span_quantity').html("&nbsp;&nbsp;&nbsp;<b>" + r[0] + "</b>");
//                FadePageCover(false);
//                //span_quantity
//            }
//        });
//    }

//}


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
            + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            + "<td class='ItemID ' val='" + "0" + "'>" + "<select id='Item-" + (RowsCounter + 1) + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
            + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
            + "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='StoreID' val='" + "0" + "'>" + "<select id='store-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
            //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            + "<td class='AveragePrice' val='" + "0" + "'>" + "<input type='text' class='input-sm col-sm inputprice'>" + "</td>"
            + "<td class='NetValue' val='" + "0" + "'>" + "<input disabled type='text' val='0' class='input-sm col-sm inputNetValue'>"  + "</td>"

            + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
            //+ "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"

            //+ "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
            + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='CurrencyID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransIDYard hide' val='" + "0" + "'>" + "0" + "</td>"

            + "<td class='ExchangeRate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SLInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='AveragePrice hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
            + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransactionTypeID hide' val='" + "20" + "'>" + "0" + "</td>"
            + "</tr>"));

    $("#Item-" + (RowsCounter + 1)).css({ "width": "100%" }).select2();
    //$("#Item-0").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');


    RowsCounter++;


    $("#tblItems").find("input").attr('onchange', 'CalculateAll(this);');
    $("#tblItems").find("input").attr('onblur', 'CalculateAll(this);');




}


function CalculateAll(THIS) {

    debugger;
    var tr = $(THIS).closest("tr");

    //$(tr).find('td.NetValue').find('.inputNetValue').val(0);
    var TQty = parseFloat(IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()));
    var TAveragePrice = parseFloat($(tr).find('td.AveragePrice').find('.inputprice').val());
    if ($(tr).find('td.AveragePrice').find('.inputprice').val() == "" ||
        $(tr).find('td.AveragePrice').find('.inputprice').val() == 0 ||
        IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()) == "" ||
        IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()) == 0
    ) {
        $(tr).find('td.NetValue').find('.inputNetValue').val(0);
    }
    else {
    $(tr).find('td.NetValue').find('.inputNetValue').val(parseFloat(IsNull(TQty * TAveragePrice),0));

    }
 




    var NetValue = 0;
    var AveragePrice = 0;
    var Qty = 0;
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        debugger;
        //var storeid = IsNull($(tr).find('td.StoreID ').find('.selectstore').val(), "0");
        //var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
        //var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();


        if (   IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()) == ""      ) {
           
            Qty = 0;

        }
        else {
            Qty = parseFloat(IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()));

        }

        if (IsNull($(tr).find('td.AveragePrice').find('.inputprice').val(), $(tr).find('td.AveragePrice').text()) == "")
        {

            AveragePrice = 0 ;

        }
        else {
            AveragePrice = parseFloat(IsNull($(tr).find('td.AveragePrice').find('.inputprice').val(), $(tr).find('td.AveragePrice').text()));
;

        }


       
       

        NetValue += parseFloat(Qty * AveragePrice); 






    });

    $('#LblNetValue').text(IsNull(NetValue,0));

}

function SC_PurchaseItems_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + $('#hidden_slItems option[value=' + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + ']').text() + "</td>"
                + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "</td>"
                + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm col-sm selectstore'></select>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + "0" + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + "0" + "</td>"
                + "<td class='AveragePrice ' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "'>" + "<input type='text' tag='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "' class='input-sm col-sm inputprice'/>" + "</td>"
                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? item.D_ID : item.PurchaseInvoiceDetailsID) + "'>" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? item.D_ID : item.PurchaseInvoiceDetailsID) + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"

                + "<td class='TransactionDate hide' val='" + "" + "'>" + "" + "</td>"
                + "<td class='QtyFactor hide' val='" + 1 + "'>" + 1 + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='IsOutOfStore hide' val='" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? true : ((item.PurchaseInvoiceDetailsID == 0 || item.PurchaseInvoiceDetailsID == null) ? false : true)) + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "10" + "'>" + "10" + "</td>"
                + "</tr>"));
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

        $('.selectstore').html($('#slStores').html());
        // $(tr).find('td.StoreID ').find('.selectstore').val();

        // $('.selectstore').val($('.selectstore').closest("td").attr('val'));
        //$("#tblItems > tbody > tr").each(function (i, tr) {
        //  var storeid =   $(tr).find("td.StoreID").attr('val');
        //    $(tr).find("td.StoreID select.selectstore").val(storeid);
        //});


        FillStores();
    }, 30);



}

function SC_PurchaseItems_LoadAll(IsFromInvoice) {
    debugger;
    if (IsFromInvoice) {
        if (IsForwardigInvoice)
            LoadAll("/api/SC_Transactions/LoadItems", "where 10 = 10 AND '**Load Items From Forw_Inv**' = '**Load Items From Forw_Inv**'  AND ID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
        else {
            LoadAll("/api/SC_Transactions/LoadItems", "where 10 = 10 AND '**Load Items From PS_Inv**' = '**Load Items From PS_Inv**'  AND ID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });

            $('#txtNotes').val($('#slPSInvoices option:selected').attr("Notes") + '  / Invoice : ' + $('#slPSInvoices option:selected').attr("InvoiceNo"));
        }
    }
    else {
        //$('#slExminationOrders').val()
        $('#txtNotes').val($('#slExminationOrders option:selected').attr("Notes"));
        LoadAll("/api/SC_Transactions/LoadItems", "where 10 = 10 AND '**Load Items From ExminationOrders**' = '**Load Items From ExminationOrders**'  AND TransactionID = " + $('#slExminationOrders').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });

    }
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    // HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
}

function LoadTransactionsDetails() {
    debugger;
    LoadAll("/api/SC_Transactions/LoadItems", "where TransactionID = " + $('#hID').val() + " ", function (pTabelRows) {
        SC_TransactionsDetails_BindTableRows(pTabelRows);







        //if (callback != null || callback !== 'undefined') {
        //    callback(tr);
        //}

    });

}


function SetArrayOfItems() {
    // var cobjItem = null;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = "0";
        objItem.TransactionID = $('#hID').val();
        //if (pDefaults.UnEditableCompanyName == "AGR") {
        //    objItem.TransactionID = _hID;
        //}
        //else {
        //objItem.TransactionID = $('#hID').val();

        //}

        objItem.ItemID = IsNull($(tr).find('td.ItemID').attr('val'), $(tr).find('td.ItemID  ').find('.selectitem ').val());
        // objItem.Qty = $(tr).find('td.Qty').attr('val');
        // objItem.UnitID = "0";
        objItem.StoreID = $(tr).find('td.StoreID ').find('.selectstore').val();
        objItem.ReturnedQty = "0";
        objItem.CurrencyID = pDefaults.UnEditableCompanyName == "EGL" ? 1 : 83;//$(tr).find('td.CurrencyID').attr('val');
        objItem.TransIDYard = $(tr).find('td.TransIDYard').attr('val');

        objItem.ExchangeRate = 1;//$(tr).find('td.ExchangeRate').attr('val');
        //if (i == 0) {
        //    objItem.Notes = ($('#txtNotes').val() == "" || $('#txtNotes').val() == null ? "0" : $('#txtNotes').val() );

        //}
        //else
        //{
        objItem.Notes = ($(tr).find('td.Notes').text() == "" ? "-" : $(tr).find('td.Notes').text().trim());
        //}

        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = "0";
        objItem.SubAccountID = "0";
        objItem.OriginalQty = "0";
        objItem.ParentID = "0";
        objItem.AveragePrice = IsNull( $(tr).find('td.AveragePrice').find('.inputprice').val() , 0); // ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim()); //AveragePrice
        objItem.TransactionDate = ConvertDateFormat($('#txtDate').val());
        objItem.QtyFactor = "1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "10";

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = IsNull($(tr).find('td.Qty').attr('val'), $(tr).find('td.Qty  ').find('.inputquantity  ').val());
        $(tr).find('td.Qty').attr('val'); // quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID ').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty').attr('val'); // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



        objItem.FlexiSerialID = ($(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == "" || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == undefined || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == null) ? 0 : $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val();

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

//#endregion Details



//#region print

function PrintTransaction() {
    var footer = ""

    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    if (pDefaults.UnEditableCompanyName == "AGR") {


    }

    var a = "تضاف الأصناف الموضحة أعلاه بعهدة المخزن";
    a = a + "<br/>";
    a = a + "محاسب المصنع"
    a = a + "<br/>";
    a = a + "....................";
    var b = "";
    b = b + "<br/>";
    b = b + "المدير";
    b = b + "<br/>";
    b = b + "....................";
    footer += '         <div class="col-xs-5"> ' + b + '</div>';
    footer += '         <div class="col-xs-5">' + a + '</div>';
    footer += '         <div class="col-xs-2"></div>';
    footer += '         </div>';

    footer += '         <div class="row"><hr/></div>';



    var a1 = "استلمت الأصناف الموضحة أعلاه و أضيفت بعهدة المخزن";
    a1 = a1 + "<br/>";
    a1 = a1 + "التاريخ";
    a1 = a1 + "<br/>";
    a1 = a1 + $('#txtDate').val()

    var b1 = "";
    b1 = b1 + "<br/>";
    b1 = b1 + "أمين المخزن";
    b1 = b1 + "<br/>";
    b1 = b1 + "....................";


    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="col-xs-5">' + b1 + '</div>';
    footer += '         <div class="col-xs-5">' + a1 + '</div>';

    footer += '         <div class="col-xs-2"></div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    FadePageCover(true)
    var pReportTitle = "إذن إضافة أصناف واردة بالمخازن رقم   ";
    pReportTitle += "<br>"
    pReportTitle += $('#txtCode').val();
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الوحدة</th><th>المخزن</th><th>ملاحظات</th></thead>'
    pTablesHTML += '<tbody>';

    var TQTy = 0;
    $('#tblItems > tbody > tr').each(function (i, tr) {



        debugger;
        pTablesHTML += '<tr>';
        //pTablesHTML += '<td>' + $(tr).find('td.ItemID').text() + '</td>';

        if ($(tr).find('td.ItemID ').find('.selectitem ').val() == undefined) {
            console.log("طباعة تقرير محفوظ") 
            pTablesHTML += '<td>' + $(tr).find('td.ItemID').text() + '</td>';
        }
        else {
            console.log("طباعة تقرير جديد")
            pTablesHTML += '<td>' + $("#hidden_slItems option[value='" + ($(tr).find('td.ItemID ').find('.selectitem ').val()) + "']").text() + '</td>';
        }

        pTablesHTML += '<td>' + IsNull($(tr).find('td.Qty').find('.inputquantity ').val(), $(tr).find('td.Qty').text()) + '</td>';
        pTablesHTML += '<td>' + IsNull($(tr).find('td.AveragePrice ').find('.inputprice ').val(), $(tr).find('td.AveragePrice ').text()) + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.UnitID ').find('.selectunit option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.StoreID').find('.selectstore option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Notes').text() + '</td>';
        pTablesHTML += '</tr>';


    });
    pTablesHTML += '</tbody></table>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html dir="rtl">';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';

    ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
    ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '         <div id="Reportbody">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';


    if (pDefaults.UnEditableCompanyName == "AGR") {
        ReportHTML += '                 <div class="col-xs-3"><b>المورد  : </b> ' + $("#slSupplierName option[value='" + ($('#slSupplierName').val()) + "']").text()  + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>Trucker  : </b> ' + $("#slTruckerID option[value='" + ($('#slTruckerID').val()) + "']").text()  + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>حساب النقل   : </b> ' + $('#txtAmount').val() + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>اجمالي الكمية    : </b> ' + $('#txtQty').val() + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b> إجمالي قيمة الاذن  : </b> ' + $('#LblNetValue').text() + '</div>';

    }
    else {

        ReportHTML += '                 <div class="col-xs-3"><b>المورد:</b> ' + IsNull($("#slExminationOrders option:selected").attr('PartnerName'), IsNull($("#slPSInvoices option:selected").attr('SupplierName'), $('#lblSupplierName').text())) + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الطباعة</b> ' + TodaysDateddMMyyyy + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>بواسطة:</b> ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>كود الحركة:</b> ' + $('#txtCode').val() + '</div>';



        if ($('#cbIsFromInvoice').is(":checked"))
            ReportHTML += '                 <div class="col-xs-3"><b>فاتورة : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
        else {
            ReportHTML += '                 <div class="col-xs-3"><b>فاتورة: </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
            ReportHTML += '                 <div class="col-xs-3"><b>أمر فحص رقم : </b> ' + ($("#slExminationOrders option:selected").val() == "0" ? "-" : $("#slExminationOrders option:selected").text().split("-")[0]) + '</div>';
        }

    }
  

    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الحركة: </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات : </b> ' + $('#txtNotes').val() + '</div>';



    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += (pTablesHTML);
    ReportHTML += ('</div>' + footer);


    //ReportHTML += footer;
    ReportHTML += '         </body>';


    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';


    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();
    FadePageCover(false)
}






function PrintTransaction2() {
    FadePageCover(true)
    var pReportTitle = "Good Receipt Notes - إذن إضـافــة";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>Item</th><th>Quantity</th><th>Store</th><th>Notes</th></thead>'
    pTablesHTML += '<tbody>';
    $('#tblItems > tbody > tr').each(function (i, tr) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + $(tr).find('td.ItemID').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Qty').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.StoreID').find('.selectstore option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Notes').text() + '</td>';
        pTablesHTML += '</tr>';
    });
    pTablesHTML += '</tbody>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html >';
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

    if ($('#cbIsFromInvoice').is(":checked"))
        ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    else {
        ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>Exmination Order: </b> ' + ($("#slExminationOrders option:selected").val() == "0" ? "-" : $("#slExminationOrders option:selected").text()) + '</div>';
    }
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


//#region other
function FillStores() {

    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        // element == this
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        $(tr).find('td.AveragePrice ').find('.inputprice').val($(tr).find('td.AveragePrice ').find('.inputprice').attr('tag'));
        $(tr).find('td.NetValue ').find('.inputNetValue').val($(tr).find('td.NetValue ').find('.inputNetValue').attr('tag'));
        // var storeid = $(tr).find('td.StoreID').
        // $(tr).find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);
    });

    CalculateAll(this);

}

var IsForwardigInvoice = false;
var IsFromInvoice = false;
function SC_HideShowEditBtns(IsApproved) {
    debugger;


    IsFromInvoice = $('#cbIsFromInvoice').is(':checked');
    IsForwardigInvoice = $('#cbIsFromForwarding').is(':checked');
    IsFromManual = $('#cbIsManual').is(':checked');







    if ($('#cbIsFromInvoice').is(':checked') == false && $('#cbIsFromForwarding').is(':checked') == false) {
        $('#cbIsFromExaminationOrder').prop("checked", true);
    }


    if (IsForwardigInvoice) {
        //$('#cbIsFromInvoice').prop('checked', true);
        //IsFromInvoice = true;
    }


    if ($('#cbIsFromInvoice').is(':checked') || $('#cbIsFromForwarding').is(':checked') || $('#cbIsFromExaminationOrder').is(':checked')) {

        $.ajax({
            type: "GET",
            url: strServerURL + "/api/SC_Transactions/FillInvoicesAndRelatedData",
            data: { pTransactionTypeID: "10", pID: (($('#hID').val() == "" || $('#hID').val() == "0") ? 0 : parseInt($('#hID').val())), IsForwarding_Invoice: $('#cbIsFromForwarding').is(':checked') },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {

                //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '');
                //Fill_SelectInputAfterLoadData_DynamicTypes(d[2], 'ID', 'InvoiceNo', '<-- select PS.Invoice -->', '#slPSInvoices', '', false);
                //// Fill_SelectInputAfterLoadData_DynamicTypes(d[1], 'ID', 'InvoiceNumber', '<-- select PS.Invoice -->', '#slPSInvoices_Filter', '', false);
                //Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- select Store -->', '#slStores', '');
                ////Fill_SelectInputAfterLoadData(d[2], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');

                Fill_SelectInputAfterLoadData(d[5], 'ID', 'Code', '<-- SELECT Exmination Order -->', '#slExminationOrders', '');
                //////hidden_slstoresnames

                //Fill_SelectInputAfterLoadData(d[8], 'ID', 'Name', '<-- select Supplier Name  -->', '#slSupplierName', '');

                if ($("#cbIsFromForwarding").is(":checked")) {

                    Fill_SelectInputAfterLoadData_DynamicTypes(d[7], 'ID', 'InvoiceNumber', '<-- select PS.Invoice -->', '#slPSInvoices', ForwInvoiceID, false);

                    // Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[7], 'ID', 'InvoiceNumber' , "," ,)
                }
                else {
                    Fill_SelectInputAfterLoadData_ForPS_Invoice(d[2], 'ID', 'InvoiceNo', '<-- select PS.Invoice -->', '#slPSInvoices', InvoiceID, false);

                    //--
                }


                Fill_SelectInputAfterLoadData_WithAttr(d[5], 'ID', 'Code', '<-- SELECT Exmination Order -->', '#slExminationOrders', ExaminationID, 'SupplierID');




                var IsERPInvoice = $('#hReadySlOptions option[value="56"]').attr("OptionValue");
                var IsForwInvoice = $('#hReadySlOptions option[value="57"]').attr("OptionValue");

                if (IsERPInvoice == "true") {
                    $('.divIsErpInv').removeClass('hide');
                }
                else {
                    $('.divIsErpInv').addClass('hide');
                }

                if (IsForwInvoice == "true") {
                    $('.divIsForwInv').removeClass('hide');
                }
                else {
                    $('.divIsForwInv').addClass('hide');
                }

                $('.divIsExaminationOrder').removeClass('hide');



                if (IsERPInvoice != "true" && IsForwInvoice != "true") {
                    $('.divIsExaminationOrder').addClass('hide');
                    $('#cbIsFromExaminationOrder').prop("checked", true);
                }


                if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {
                    $('.divIsManual').removeClass('hide');
                }
                else {
                    $('.divIsManual').addClass('hide');
                }

                if (IsApproved != null) {
                    _IsApproved = IsApproved;

                    if (IsNull($("#hID").val(), "0") != "0" && (IsApproved == true || $("#hf_CanEdit").val() != 1)) {
                        $('.Edit-btn').addClass('hide');
                        $('.Edit-input').prop('disabled', true);
                        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
                    }
                    else {
                        $('.Edit-btn').removeClass('hide');
                        $('.Edit-input').prop('disabled', false);
                        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
                    }


                    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
                        $('#txtDate').prop('disabled', false);
                        $('#slPSInvoices').prop('disabled', false);
                        $('#slExminationOrders').prop('disabled', false);
                        $('#btnGetItems').removeClass('hide');
                        $('#btnGetItems2').removeClass('hide');
                        $("#cbIsFromInvoice").prop('disabled', false);
                        $("#cbIsFromForwarding").prop('disabled', false);
                        $("#cbIsFromExaminationOrder").prop('disabled', false);

                        $('#btn-Delete2').addClass('hide');
                        $('#btnPrint2').addClass('hide');

                    }
                    else // is [ Update ]
                    {
                        // $('#txtDate').prop('disabled', true);
                        $('#slPSInvoices').prop('disabled', true);
                        $('#slExminationOrders').prop('disabled', true);
                        $('#btnGetItems').addClass('hide');
                        $('#btnGetItems2').addClass('hide');
                        $("#cbIsFromInvoice").prop('disabled', true);
                        $("#cbIsFromForwarding").prop('disabled', true);
                        $("#cbIsFromExaminationOrder").prop('disabled', true);
                        $('#btn-Delete2').removeClass('hide');
                        $('#btnPrint2').removeClass('hide');
                    }


                    $('.selectitem').prop('disabled', true);
                    $('.selectunit').prop('disabled', true);
                }
                //*******************************
                if (IsFromInvoice || IsForwardigInvoice) {
                    $('.C_IsFromExmination').addClass('hide');
                    $('.C_IsFromInvoice').removeClass('hide');
                }
                else {
                    $('.C_IsFromExmination').removeClass('hide');
                    $('.C_IsFromInvoice').addClass('hide');

                }
                //*******************************


                if (pDefaults.UnEditableCompanyName == "AGR") {
                    $('.divIsManual').removeClass('hide');
                    $('.TruckerIDsl').removeClass('hide');
                    $('.CartaNotxt').removeClass('hide');
                    $('.Qtytxt').removeClass('hide');
                    $('.Amounttxt').removeClass('hide');
                    $('.C_SupplierName').removeClass('hide');
                    $('.divIsExaminationOrder').addClass('hide');
                    $('.C_IsFromExmination').addClass('hide');
                    $('.C_IsFromInvoice').addClass('hide');
                    $('.divIsForwInv').addClass('hide');
                    $('.divIsErpInv').addClass('hide');
                    $('#cbIsManual').prop("checked", true);



                }
                else if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {
                    if (IsFromManual) {
                        $('.divIsManual').removeClass('hide');
                        $('.Qtytxt').removeClass('hide');
                        $('.Amounttxt').removeClass('hide');
                        $('.Qtytxt').removeClass('hide');
                        $('.C_SupplierName').removeClass('hide');
                        $('.divIsExaminationOrder').addClass('hide');
                        $('.C_IsFromInvoice').addClass('hide');
                        $('.C_IsFromExmination').addClass('hide');
                        $('.divIsForwInv').addClass('hide');
                        $('.divIsErpInv').addClass('hide');
                        $('#cbIsManual').prop("checked", true);
                    }
                   

                }
                else  {
                    $('.divManual').addClass('hide');
                    if (pDefaults.UnEditableCompanyName != "EGL" && pDefaults.UnEditableCompanyName != "TCS") {
                        $('.deleteop').addClass('hide');
                    }
                    if (pDefaults.UnEditableCompanyName == "TCS") {
                        $('.CartaNotxt').removeClass('hide');

                    }

                   
                }





                FadePageCover(false);
            }
        });
    }
    else {

        var IsERPInvoice = $('#hReadySlOptions option[value="56"]').attr("OptionValue");
        var IsForwInvoice = $('#hReadySlOptions option[value="57"]').attr("OptionValue");

        if (IsERPInvoice == "true") {
            $('.divIsErpInv').removeClass('hide');
        }
        else {
            $('.divIsErpInv').addClass('hide');
        }

        if (IsForwInvoice == "true") {
            $('.divIsForwInv').removeClass('hide');
        }
        else {
            $('.divIsForwInv').addClass('hide');
        }

        $('.divIsExaminationOrder').removeClass('hide');

        if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {
            $('.divIsManual').removeClass('hide');
        }
        else {
            $('.divIsManual').addClass('hide');
        }

        if (IsERPInvoice != "true" && IsForwInvoice != "true") {
            $('.divIsExaminationOrder').addClass('hide');
            $('#cbIsFromExaminationOrder').prop("checked", true);
        }



        if (IsApproved != null) {
            _IsApproved = IsApproved;

            if (IsNull($("#hID").val(), "0") != "0" && (IsApproved == true || $("#hf_CanEdit").val() != 1)) {
                $('.Edit-btn').addClass('hide');
                $('.Edit-input').prop('disabled', true);
                $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
            }
            else {
                $('.Edit-btn').removeClass('hide');
                $('.Edit-input').prop('disabled', false);
                $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
            }


            if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
                $('#txtDate').prop('disabled', false);
                $('#slPSInvoices').prop('disabled', false);
                $('#slExminationOrders').prop('disabled', false);
                $('#btnGetItems').removeClass('hide');
                $('#btnGetItems2').removeClass('hide');
                $("#cbIsFromInvoice").prop('disabled', false);

                $('#btn-Delete2').addClass('hide');
                $('#btnPrint2').addClass('hide');




                $('#cbIsFromInvoice').prop("checked", false);
                $('#cbIsFromForwarding').prop("checked", false);
                $('#cbIsFromExaminationOrder').prop("checked", true);

            }
            else // is [ Update ]
            {
                // $('#txtDate').prop('disabled', true);
                $('#slPSInvoices').prop('disabled', true);
                $('#slExminationOrders').prop('disabled', true);
                $('#btnGetItems').addClass('hide');
                $('#btnGetItems2').addClass('hide');
                $("#cbIsFromInvoice").prop('disabled', true);
                $('#btn-Delete2').removeClass('hide');
                $('#btnPrint2').removeClass('hide');
            }


            $('.selectitem').prop('disabled', true);
            $('.selectunit').prop('disabled', true);
        }
        //*******************************
        if (IsFromInvoice || IsForwardigInvoice) {
            $('.C_IsFromExmination').addClass('hide');
            $('.C_IsFromInvoice').removeClass('hide');
        }
        else {
            $('.C_IsFromExmination').removeClass('hide');
            $('.C_IsFromInvoice').addClass('hide');
        }
        //*******************************

        if (pDefaults.UnEditableCompanyName == "AGR") {
            $('.divIsManual').removeClass('hide');
            $('.TruckerIDsl').removeClass('hide');
            $('.CartaNotxt').removeClass('hide');
            $('.Qtytxt').removeClass('hide');
            $('.Amounttxt').removeClass('hide');
            $('.C_SupplierName').removeClass('hide');
            $('.divIsExaminationOrder').addClass('hide');
            $('.C_IsFromInvoice').addClass('hide');
            $('.C_IsFromExmination').addClass('hide');
            $('.divIsForwInv').addClass('hide');
            $('.divIsErpInv').addClass('hide');
            $('#cbIsManual').prop("checked", true);


        }
        else if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE") {
            if (IsFromManual) {
                $('.divIsManual').removeClass('hide');
                $('.Qtytxt').removeClass('hide');
                $('.Amounttxt').removeClass('hide');
                $('.Qtytxt').removeClass('hide');
                $('.C_SupplierName').removeClass('hide');
                $('.divIsExaminationOrder').addClass('hide');
                $('.C_IsFromInvoice').addClass('hide');
                $('.C_IsFromExmination').addClass('hide');
                $('.divIsForwInv').addClass('hide');
                $('.divIsErpInv').addClass('hide');
                $('#cbIsManual').prop("checked", true);
            }
        }
        else {
            $('.divManual').addClass('hide');
            if (pDefaults.UnEditableCompanyName != "EGL") {
                $('.deleteop').addClass('hide');
            }
        }





        FadePageCover(false);



    }






}

//function Fill_SelectInputAfterLoadData_ForPS_Invoice(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, IsDate) {
//    var option = "";

//    if (Title != null)
//        option = '<option value="0">' + Title + '</option>';
//    $.each(JSON.parse(data), function (i, item) {
//        // console.log(item[ID_Name]);
//        if (item[ID_Name] == Selected_ID) {
//            if (!IsDate) {
//                option += '<option SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name]) + '</option>';
//            }
//            else {
//                option += '<option SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" value="' + GetDateFromServer(item[ID_Name]) + '" selected "> ' + GetDateFromServer((item[Item_Name])) + '</option>';
//            }
//        }
//        else
//        {
//            if (!IsDate) {
//                option += '<option  SupplierName="' + item.SupplierName + '" SupplierID="' + item.SupplierID + '" value="' + item[ID_Name] + '"> ' + (item[Item_Name]) + '</option>';
//            }
//            else {
//                option += '<option SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" value="' + GetDateFromServer(item[ID_Name]) + '"> ' + GetDateFromServer((item[Item_Name])) + '</option>';
//            }
//        }
//    });
//    $(SelectInput_ID).html("");
//    $(SelectInput_ID).append(option);
//}
function Fill_SelectInputAfterLoadData_ForPS_Invoice(data, ID_Name, Item_Name, Title, SelectInput_ID, Selected_ID, IsDate) {
    var option = "";

    if (Title != null)
        option = '<option value="0">' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        if (item[ID_Name] == Selected_ID) {
            if (!IsDate) {
                option += '<option  InvoiceNo="' + item.InvoiceNo + '" SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" Notes="' + item.Notes + '" value="' + item[ID_Name] + '" selected "> ' + (item[Item_Name] + ' - ' + item["SupplierName"]) + '</option>';
            }
            else {
                option += '<option InvoiceNo="' + item.InvoiceNo + '" SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" Notes="' + item.Notes + '" value="' + GetDateFromServer(item[ID_Name]) + '" selected "> ' + GetDateFromServer((item[Item_Name])) + '</option>';
            }
        }
        else {
            if (!IsDate) {
                option += '<option InvoiceNo="' + item.InvoiceNo + '"  SupplierName="' + item.SupplierName + '" SupplierID="' + item.SupplierID + '" Notes="' + item.Notes + '" value="' + item[ID_Name] + '"> ' + (item[Item_Name] + ' - ' + item["SupplierName"]) + '</option>';
            }
            else {
                option += '<option InvoiceNo="' + item.InvoiceNo + '" SupplierName="' + item.SupplierName + '"  SupplierID="' + item.SupplierID + '" Notes="' + item.Notes + '" value="' + GetDateFromServer(item[ID_Name]) + '"> ' + GetDateFromServer((item[Item_Name])) + '</option>';
            }
        }
    });
    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);
}
function CopyStores() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectstore').val($('#slStores').val());
    }

}

function IntializeData(callback) {
    debugger;
    FadePageCover(true);
    all_has_store = false;
    RowsCounter = 0;
    $('#tblItems > tbody').html('');
    // $('#txtFromDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtToDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $("#slPSInvoices").prop('disabled', false);
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    // $("#hID").val("");
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Transactions/FillInvoicesAndRelatedData",
        data: { pTransactionTypeID: "10", pID: ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())), IsForwarding_Invoice: $('#cbIsFromForwarding').is(':checked') },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- select Truckers  -->', '#slTruckerID', '');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
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
            , pAmount: IsNull($("#txtAmount").val(), "0")
            , pTotalQty: IsNull($("#txtQty").val(), "0")
            , pTruckerID: IsNull($("#slTruckerID").val(), "0")
            , pCardNo: IsNull($("#txtCartaNo").val(), "0")

        }, true, null, '#hID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}

//#endregion other



function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_JournalVouchers";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//JournalVouchers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/JournalVouchers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_JournalVouchers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_JournalVouchers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_JournalVouchers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}












