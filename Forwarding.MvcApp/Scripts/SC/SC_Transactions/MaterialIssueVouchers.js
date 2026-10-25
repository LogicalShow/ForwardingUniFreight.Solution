// City Country ---------------------------------------------------------------
// Bind SC_Transactions Table Rows
var RowsCounter = 0;
var RowsExpensesCounter = 0;
var IsInsert = true;
var TransTypeID = 20;
var _IsApproved = false;
var RollBackData = {};

var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val()
    // CheckIfAllLoading();


    CheckIfAllLoading()
    //$("#slGoodReceiptNote").css({ 'width': '100%' }).select2();
    //$("#slGoodReceiptNote").trigger("change");
    //$("div[tabindex='-1']").removeAttr('tabindex');



});
$(document).ready(function () {
    //$("#slAccount").css({ "width": "100%" }).select2();
    //$("#slSubAccount").css({ "width": "100%" }).select2();
    $("#slSupplierName").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});


function CheckIfAllLoading() {

    if ($('#slBranchID option').length == 0 && $('#slToClientID option').length == 0 && $('#slToTrailer option').length == 0 && $('#slToEquipment option').length == 0 && $('#slToDepartment option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

var TransactionLevel = "IsDefault";

//#region Header  


function IntializePage()
{
    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Transactions/IntializeData",
        data: { pTransactionTypeID: "20", pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {

            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '', 'ItemUnits');
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Name', '<-- select Items -->', '#slItems', '', 'ItemUnits');

            // Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '');
            //  Fill_SelectInputAfterLoadData_DynamicTypes(d[2], 'ID', 'InvoiceNumber', '<-- select PS.Invoice -->', '#slPSInvoices', '', false);
            //  Fill_SelectInputAfterLoadData_DynamicTypes(d[1], 'ID', 'InvoiceNumber', '<-- select PS.Invoice -->', '#slPSInvoices_Filter', '', false);
            Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- select Store -->', '#slStores', '');
           // Fill_SelectInputAfterLoadData(d[4], 'ID', 'InvoiceNo', '<-- select Sales Invoice -->', '#slInvoices', '');
           // Fill_SelectInputAfterLoadData_WithAttr(d[4], 'ID', 'InvoiceNo', '<-- select Sales Invoice -->', '#slInvoices', '', 'ClientID');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[4], 'ID', 'InvoiceNo,ClientName', ' : ', '<-- select Sales Invoice -->', '#slInvoices', '', 'ClientID,ClientName');
            Fill_SelectInputAfterLoadData(d[17], 'ID', 'Account_Name', '<-- select Account -->', '#slAccountID', '');
            //Fill_SelectInputAfterLoadData(d[2], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');
            // $('#txtFromDate_Filter').val(getTodaysDateInddMMyyyyFormat());
            // $('#txtToDate_Filter').val(getTodaysDateInddMMyyyyFormat());
            Fill_SelectInputAfterLoadData(d[5], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            Fill_SelectInputAfterLoadData(d[7], 'ID', 'CostCenterName', '<-- SELECT Cost Center -->', '#slCostCenter', '');
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT Branch -->', '#slBranchID', '');
           // Fill_SelectInputAfterLoadData(d[11], 'ID', 'Name', '<-- SELECT Customer -->', '#slToClientID', '');

            $('#slToClientID').html( $('#hReadySlCustomers').html() ) ;


            Fill_SelectInputAfterLoadData(d[12], 'ID', 'Name', '<-- SELECT Trailer -->', '#slToTrailer', '');
            Fill_SelectInputAfterLoadData(d[13], 'ID', 'Name', '<-- SELECT Equipment -->', '#slToEquipment', '');
            Fill_SelectInputAfterLoadData(d[14], 'ID', 'Name', '<-- SELECT Department -->', '#slToDepartment', '');

            Fill_SelectInputAfterLoadData(d[15], 'ID', 'Name', '<-- SELECT Expense -->', '#slhiddenExpenses', '');
            //Fill_SelectInputAfterLoadData_WithMultiAttr(d[16], 'ID', 'Name', '<-- SELECT TAXES  -->', '#hidden_slTaxes', '', 'CurrentPercentage,IsDebitAccount');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[16], 'ID', 'Name,AccountTypeName', ' : ', '<-- SELECT TAXES -->', '#hidden_slTaxes', '', 'CurrentPercentage,IsDebitAccount');

            $("#slGoodReceiptNote").css({ 'width': '100%' }).select2();
            $("#slGoodReceiptNote").trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');

            $("#slToEquipment").css({ 'width': '100%' }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');

             
            $("#slToTrailer").css({ 'width': '100%' }).select2();
            $("div[tabindex='-1']").removeAttr('tabindex');


            $('#slInvoices').off('change').on('change', function () {
                $('#slToClientID').val($(this).find('option:selected').attr('clientid'));
            });

            try {
                $("#slItems").css({ 'width': '100%' }).select2();
                // $("#slItems").trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');
            }
            catch (ex) { }



           // AddNewRowAfterEvent()


            FadePageCover(false);

            //FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

    $('#txtItemQty').keyup(function (e) {
        if (e.keyCode == 13) {
            AddNewRowAfterEvent();
        }
    });

    $('#slItems').off('change').on('change' ,function () {

            AddNewRowAfterEvent();

    });
    
}


function SC_Transactions_BindTableRows(pSC_Transactions) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Transactions");
    $.each(pSC_Transactions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_Transactions",
       //     ("<tr ID='" + item.ID + "' ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'>"
                ("<tr ID='" + item.ID + (item.IsFromFlexi == true ? "'" : "'  ondblclick='SC_Transactions_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'") + ">" 
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='CodeManual' val='" + item.CodeManual + "'>" + item.CodeManual + "</td>"
                    + "<td class='PartnerName hide' val='" + item.PartnerName + "'>" + item.PartnerName + "</td>"
                + "<td class='ItemsDestintionsLocal' val='" + item.ItemsDestintionsLocal + "'>" + item.ItemsDestintionsLocal + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
               
                + "<td class='TransactionDate' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='PurchaseInvoiceID hide' val='" + item.PurchaseInvoiceID + "'>" + item.PurchaseInvoiceID + "</td>"
                + "<td class='PurchaseOrderID hide' val='" + item.PurchaseOrderID + "'>" + item.PurchaseOrderID + "</td>"
                + "<td class='ExaminationID hide' val='" + item.ExaminationID + "'>" + item.ExaminationID + "</td>"
                + "<td class='MaterialRequestCode' val='" + item.MaterialRequestCode + "'>" + item.MaterialRequestCode + "</td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
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

                + "<td class='MaterialIssueRequesitionsID hide' val='" + item.MaterialIssueRequesitionsID + "'>" + item.MaterialIssueRequesitionsID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='P_ProductionRequestID hide' val='" + item.P_ProductionRequestID + "'>" + item.P_ProductionRequestID + "</td>"
                + "<td class='P_ItemID hide' val='" + item.P_ItemID + "'>" + item.P_ItemID + "</td>"
                + "<td class='P_LineID hide' val='" + item.P_LineID + "'>" + item.P_LineID + "</td>"
                + "<td class='P_Qty hide' val='" + item.P_Qty + "'>" + item.P_Qty + "</td>"
                + "<td class='P_UnitID hide' val='" + item.P_UnitID + "'>" + item.P_UnitID + "</td>"
                + "<td class='P_FinishedDate hide' val='" + item.P_FinishedDate + "'>" + item.P_FinishedDate + "</td>"
                + "<td class='P_StartDate hide' val='" + item.P_StartDate + "'>" + item.P_StartDate + "</td>"
                + "<td class='EntitlementDays hide' val='" + item.EntitlementDays + "'>" + item.EntitlementDays + "</td>"
                + "<td class='IsClosed hide' val='" + item.IsClosed + "'>" + item.IsClosed + "</td>"
                + "<td class='FromStore hide' val='" + item.FromStore + "'>" + item.FromStore + "</td>"
                + "<td class='JV_ID2 hide' val='" + item.JV_ID2 + "'>" + item.JV_ID2 + "</td>"
                + "<td class='TransferParentID hide' val='" + item.TransferParentID + "'>" + item.TransferParentID + "</td>"
                + "<td class='ForwardingPSInvoiceID hide' val='" + item.ForwardingPSInvoiceID + "'>" + item.ForwardingPSInvoiceID + "</td>"
                + "<td class='IsFromFlexi hide' val='" + item.IsFromFlexi + "'>" + item.IsFromFlexi + "</td>"

                    + "<td class='AccountID hide' val='" + item.AccountID + "'>" + item.AccountID + "</td>"
                    + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + item.SubAccountID + "</td>"

                    + "<td class='TAmount hide' val='" + item.TAmount + "'>" + item.TAmount + "</td>"
                    + "<td class='TruckerID hide' val='" + item.TruckerID + "'>" + item.TruckerID + "</td>"
                    + "<td class='CardNo hide' val='" + item.CardNo + "'>" + item.CardNo + "</td>"

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

function SC_Transactions_LoadingWithPaging() {
    debugger;
    var WhereClause = " Where TransactionTypeID = 20   AND ( IsDeleted = 0 or IsDeleted IS NULL ) ";
   if( pDefaults.UnEditableCompanyName == "TCS")
       WhereClause += " and isnull(IsConfirm,0)=1 ";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = '" + $('#txtCode_Filter').val() + "'";
    }
    if ($('#txtCodeManual_Filter').val().trim() != "") {
        //WhereClause += " AND Code LIKE '%" + $('#txtCode_Filter').val() + "%'";
        WhereClause += " AND CodeManual = '" + $('#txtCodeManual_Filter').val() + "'";
    }
    if ($('#txtRequestCode_Filter').val().trim() != "") {
        WhereClause += " AND MaterialRequestCode = '" + $('#txtRequestCode_Filter').val() + "'";
    }
    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo = '" + $('#txtInvoiceNo_Filter').val() + "'";
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






function SC_Transactions_Insert(pSaveandAddNew) {
    window.SaveErrorMessage = "";
    IsInsert = true;
    FadePageCover(true)
    all_has_store = true;
    if ($('#tblExpenses > tbody tr').length > 0) {
        $.each($('#tblExpenses > tbody tr'), function (i, tr) {

            if (IsNull($(tr).find('td.ExpensesID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر المصروف' : 'Please Select Expenses');
                all_has_store = false;
                FadePageCover(false);
            }

            if (IsNull($(tr).find('td.PartnerTypeID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر نوع جهة المصروف' : 'Please Select Partner Type ');
                all_has_store = false;
                FadePageCover(false);
            }

            if (IsNull($(tr).find('td.PartnerID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر  جهة المصروف' : 'Please Select Partner  ');
                all_has_store = false;
                FadePageCover(false);
            }

        });
    }

    if ($('#tblItems > tbody tr').length > 0) {
        $($('#tblItems > tbody > tr')).each(function (i, tr) {
            debugger;
            var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
            var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
            var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
            if (quantityid.trim() == "" || quantityid.trim() == "0") {
                $(tr).remove();
            }

            //---------------------------------------- FROM --------------------------------------------------------------

            if ($("#cbIsFromInvoice").is(":checked") && $("#slInvoices").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الفاتورة' : 'Please Select Invoice');
                all_has_store = false;
                FadePageCover(false);

            }
            else if ($("#cbIsFromRequest").is(":checked") && $("#slMaterialIssueRequests").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر اذن الصرف' : 'Please Select Material Issue Requests');
                all_has_store = false;
                FadePageCover(false);
            }
            else if ($("#cbIsFromGoodReceiptNote").is(":checked") && $("#slGoodReceiptNote").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر  من قائمة المخازن و الاصناف' : 'Please Select From Item And Stores List');

                all_has_store = false;
                FadePageCover(false);
            }

            else if ($("#cbIsFIFO").is(":checked")
                && ($("#slOperations").val() == "0"
                    && $("#slToDepartment").val() == "0"
                    && $("#slToTrailer").val() == "0"
                    && $("#slToEquipment").val() == "0"
                && $("#slAccountID").val() == "0"
                && $("#slBranchID").val() == "0"
                && $("#slToClientID").val() == "0"



                )) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? '   من فضلك ادخل جهة الصرف ( الى )' : 'Please Select destination[To] ');

                all_has_store = false;
                FadePageCover(false);
            }
            // لو هي مانول و مدخلش عميل او عملية
            else if ($("#cbIsManual").is(":checked") && ($("#slOperations").val() == "0" && $("#slToClientID").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر عملية او عميل' : 'Please insert CLient Or Operation ');

                all_has_store = false;
                FadePageCover(false);
            }


            //-------------------------------------------------------------- TO ---------------------------------------------------------------------------

            // اذن الصرف على فرع هو جاي من اذن اضافة :::: عملية توزيع
            if (($("#cbIsToBranch").is(":checked")) && ($("#slBranchID").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الفرع' : ' Please Select Branch');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToDepartment").is(":checked")) && ($("#slToDepartment").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر القسم' : ' Please Select Department');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToTrailer").is(":checked")) && ($("#slToTrailer").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر العربية' : ' Please Select Trailer');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToEquipment").is(":checked")) && ($("#slToEquipment").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر العربية' : ' Please Select Equipment');
                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToAccount").is(":checked"))) {
                if ($("#slAccountID").val() == "0") {
                    window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الحساب' : ' Please Select Account');
                    all_has_store = false;
                    FadePageCover(false);
                    return false;
                }

                if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

                    swal("Excuse me", "You must select SubAccount", "warning");
                    window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الحساب التحليلي' : ' Please Select SubAccount');
                    all_has_store = false;
                    FadePageCover(false);
                    return false;
                }

              
            }

            //--------------------------------------------------------------------------------------------------------------------------------------

            if (storeid.trim() == "0" || itemid.trim() == "0" || quantityid.trim() == "") {
                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else {
                all_has_store = true;
                FadePageCover(false);
            }
        }); }
    



    setTimeout(function () {

        // $('.selectstore').html($('#slStores').html());





        if ($('#tblItems > tbody > tr').length == 0 && $('#tblExpenses > tbody > tr').length == 0) {
           // swal('Excuse me', 'Fill Items', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill Items'), 'warning');
            FadePageCover(false);
        }
        else if (!all_has_store) {

          //  swal('Excuse me', 'Fill All Items , Quantity , Stores', 'warning');

            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? (' يجب مراعاة اختيار الاصناف و ادخال الكميات و المخازن     ' + window.SaveErrorMessage) : ( window.SaveErrorMessage + ' You Must Fill All Items , Quantity , Stores')), 'warning');
            FadePageCover(false);

        }
        else if (window.SaveErrorMessage != "") {

            //  swal('Excuse me', 'Fill All Items , Quantity , Stores', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? (' يجب مراعاة اختيار الاصناف و ادخال الكميات و المخازن     ' + window.SaveErrorMessage) : (window.SaveErrorMessage + ' You Must Fill All Items , Quantity , Stores')), 'warning');

        }
        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {

            var CLientID = "0";

            if ($("#cbIsFromInvoice").is(":checked"))
                CLientID = $("#slInvoices option:selected").attr('ClientID');
            else if ($("#cbIsFromRequest").is(":checked"))
                CLientID = $("#slMaterialIssueRequests option:selected").attr('ClientID');
            else if ($("#cbIsManual").is(":checked") && IsNull($('#slOperations').val(), "0") == "0")
                CLientID = $('#slToClientID').val();
            else if ($("#cbIsToClient").is(":checked"))
                CLientID = $('#slToClientID').val();




            //var ClientID =
            //  ( : $("#slMaterialIssueRequests option:selected").attr('ClientID')),

            //if ($("#cbIsFromInvoice").is(":checked") == true) { $("#slInvoices option:selected").attr('ClientID') }
            //else if ($("#cbIsFromInvoice").is(":checked") == true) { $("#slInvoices option:selected").attr('ClientID') }
    //else if (IsNull($('#hReadySlOptions option[value="2021"]').attr("OptionValue"), "false") == "true") {}
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Insert", {
                pCode: $("#txtCode").val(),
                pCodeManual: IsNull( $("#txtCodeManual").val() , "0"),
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: $('#slInvoices').val(),
                pDepartmentID: IsNull($('#slToDepartment').val(), "0") ,
                pClientID: CLientID,
                pCostCenterID: $("#slCostCenter").val(),
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: IsNull( $("#slGoodReceiptNote").val() , "0"),
                pTransactionTypeID: "20",
                pJV_ID: "0", pIsOutOfStore: ($("#cbIsFromInvoice").is(":checked") == true ? false : false ),
                pMaterialIssueRequesitionsID: $("#slMaterialIssueRequests").val(),
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
                pJV_ID2:0,
                pTransferParentID:0,
                pForwardingPSInvoiceID: 0,
                pOperationID:  IsNull($('#slOperations').val(), "0" ),
                pBranchID: IsNull($('#slBranchID').val(), "0"),
                pIsFromFlexi: "false"
                , pTrailerID: IsNull( $('#slToTrailer').val() , "0" ),
                pEquipmentID: IsNull($('#slToEquipment').val(), "0"),
                pDivisionID: "0",
                pAccountID: IsNull($('#slAccountID').val(), "0"),
                pSubAccountID: IsNull($('#slSubAccountID').val(), "0"),
                pAmount: IsNull($("#txtAmount").val(), "0"),
                pTruckerID: IsNull($("#slTruckerID").val(), "0"),
                pCardNo: IsNull($("#txtCartaNo").val(), "0")

            



    //                $('#slToDepartment').val("0");
    //$('#slToTrailer').val("0");
    //$('#slToEquipment').val("0");


            }, pSaveandAddNew, null, '#hID', function () {


                


            if ($('#tblItems > tbody > tr').length > 0) {
                InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                    JSON.stringify(SetArrayOfItems())
                    , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                        if ($("#tblExpenses > tbody tr").length > 0) {



                            $.ajax({
                                type: "GET",
                                url: "/api/SC_Transactions/InsertExpenses",
                                data:
                                {
                                    pExpenses: JSON.stringify(SetArrayOfExpenses()),
                                    pExpensesTaxes: JSON.stringify(SetArrayOfTaxes())
                                },
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (pData) {
                                    if (pData[0] == "") {
                                        //swal("Sorry", "You Must Delete Payment First");
                                        FadePageCover(false);

                                        swal("Success", " data saved successfully.");
                                        FadePageCover(true);
                                        PrintTransaction(pData[1]);


                                        setTimeout(function () {
                                            SC_Transactions_LoadingWithPaging();
                                            IntializeData();
                                            ClearAllTableRows('tblExpenses');
                                            ClearAllTableRows('tblItems');
                                            ClearAllTableRows('tblTaxes');

                                            all_has_store = false;

                                        }, 300);



                                    }
                                    else {
                                        FadePageCover(false);
                                        swal(data[0]);
                                    }

                                }
                            });

                        }
                        else {

                            FadePageCover(true)
                            $('#txtCode').val(Code[1]);
                            PrintTransaction(Code[2]);


                            setTimeout(function () {
                                SC_Transactions_LoadingWithPaging();
                                IntializeData();
                                ClearAllTableRows('tblItems');
                                all_has_store = false;

                            }, 300);
                        }


                    });
            }
            else {
                $.ajax({
                    type: "GET",
                    url: "/api/SC_Transactions/InsertExpenses",
                    data:
                    {
                        pExpenses: JSON.stringify(SetArrayOfExpenses()),
                        pExpensesTaxes: JSON.stringify(SetArrayOfTaxes())
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (pData) {
                        console.log(pData[0])
                        if (pData[0] == "") {
                            //swal("Sorry", "You Must Delete Payment First");
                            FadePageCover(false);

                            swal("Success", " data saved successfully.");
                            FadePageCover(true);
                            PrintTransaction(pData[1]);


                            setTimeout(function () {
                                SC_Transactions_LoadingWithPaging();
                                IntializeData();
                                ClearAllTableRows('tblExpenses');
                                ClearAllTableRows('tblItems');
                                ClearAllTableRows('tblTaxes');

                                all_has_store = false;
                                jQuery("#SC_TransactionsModal").modal("hide");
                            }, 300);



                        }
                        else {
                            FadePageCover(false);
                            swal(data[0]);
                        }

                    }
                });
            }

                });

        }
        else {
            //swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل التاريخ بشكل صحيح' : 'Please make sure that date format is dd/MM/yyyy.'), 'warning');

        }
    }, 30);
}

function SC_Transactions_EditByDblClick(pID, pIsApproved) {
    _IsApproved = pIsApproved;
    jQuery("#SC_TransactionsModal").modal("show");
    SC_Transactions_FillControls(pID);
}

function SC_Transactions_FillControls(pID) {
    debugger;
    $("#hID").val(pID);

    debugger

    IntializeData(function () {
        setTimeout(function () {
            $('#lblTotalExpenses').text('0.00');
            $('#lblTotalExpenses').text('0.00');
            ClearAll("#SC_TransactionsModal", null);
            $("#hID").val(pID);
            var tr = $("#tblSC_Transactions > tbody > tr[ID='" + pID + "']");
            $('#cbIsToClient').prop('checked', false);
            $('#cbIsToOperation').prop('checked', false);
            $('#cbIsToBranch').prop('checked', false);
            $('#cbIsToNone').prop('checked', false);
            $('#cbIsToDepartment').prop('checked', false);
            $('#cbIsToTrailer').prop('checked', false);
            $('#cbIsToEquipment').prop('checked', false);



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
                        // جاية من اذن اضافة

            // كدا هي جاية من طلب صرف
              if (
                 
                 ( $(tr).find("td.MaterialIssueRequesitionsID").attr('val') != "0" && $(tr).find("td.SLInvoiceID").attr('val') != "0")
                 ||
                 $(tr).find("td.MaterialIssueRequesitionsID").attr('val') != "0")
             {
                console.log('جاي من طلب صرف');
                $("#cbIsManual").prop("checked", false);
                $("#cbIsFromRequest").prop("checked", true);
                $("#cbIsFromInvoice").prop("checked", false);
                $("#cbIsFromGoodReceiptNote").prop("checked", false);
                  $("#cbIsFIFO").prop("checked", false);

                if (IsNull($(tr).find("td.OperationID").attr('val'), "0") != "0") {
                    $('#cbIsToOperation').prop('checked', true);
                   // $('#cbIsToOperation').trigger('change');

                    ShowToArea('C_IsToOperations');

                }
                else if (IsNull($(tr).find("td.DepartmentID").attr('val'), "0") != "0") {
                    $('#cbIsToDepartment').prop('checked', true);


                    ShowToArea('C_IsToDepartment');


                }
                else if (IsNull($(tr).find("td.TrailerID").attr('val'), "0") != "0") {
                    $('#cbIsToTrailer').prop('checked', true);


                    ShowToArea('C_IsToTrailer');


                }
                else if (IsNull($(tr).find("td.EquipmentID").attr('val'), "0") != "0") {
                    $('#cbIsToEquipment').prop('checked', true);

                     
                    ShowToArea('C_ToEquipment');


                }
                else if (IsNull($(tr).find("td.BranchID").attr('val'), "0") != "0") {
                    $('#cbIsToBranch').prop('checked', true);


                    ShowToArea('C_IsToBranch');


                }
                else {
                    $('#cbIsToNone').prop('checked', true);
                   // $('#cbIsToNone').trigger('change');


                    ShowToArea('');
                }
             }
              else if ($(tr).find("td.ParentID").attr('val') != "0") {
                  console.log('جاي من اذن اضافة');
                $("#cbIsManual").prop("checked", false);
                $("#cbIsFromRequest").prop("checked", false);
                $("#cbIsFromInvoice").prop("checked", false);
                $("#cbIsFromGoodReceiptNote").prop("checked", true);


                $('#cbIsToBranch').prop('checked', true);
                //  $('#cbIsToBranch').trigger('change');


                  ShowToArea('C_IsToBranch');

            }
            // كدا جاي من فاتورة
            else if ($(tr).find("td.SLInvoiceID").attr('val') != "0")
            {
                  console.log('جاي من فاتورة');
                $("#cbIsManual").prop("checked", false);
                $("#cbIsFromRequest").prop("checked", false);
                $("#cbIsFromInvoice").prop("checked", true);
                $("#cbIsFromGoodReceiptNote").prop("checked", false);
                  $("#cbIsFIFO").prop("checked", false);
                  if (IsNull($(tr).find("td.OperationID").attr('val'), "0") != "0")
                  {
                    $('#cbIsToOperation').prop('checked', true);
                    ShowToArea('C_IsToOperations');
                   }
                   else
                   {
                       $('#cbIsFromInvoice ').prop('checked', true);
                       ShowToArea('C_IsFromInvoice ');
                   }
            }

            else
              {
                  console.log('جاي يدوي');
                  if (pDefaults.UnEditableCompanyName == "ERP") {
                      $("#cbIsManual").prop("checked", true);
                      $("#cbIsFromRequest").prop("checked", false);
                      $("#cbIsFromInvoice").prop("checked", false);
                      $("#cbIsFromGoodReceiptNote").prop("checked", false);
                      $("#cbIsFIFO").prop("checked", false);
                  }
                  else {
                      $("#cbIsManual").prop("checked", true);
                      $("#cbIsFromRequest").prop("checked", false);
                      $("#cbIsFromInvoice").prop("checked", false);
                      $("#cbIsFromGoodReceiptNote").prop("checked", false);
                      $("#cbIsFIFO").prop("checked", false);
                  }

                  


                  //--------------------------------------------------------------- TO -------------------------


                  if (IsNull($(tr).find("td.OperationID").attr('val'), "0") != "0")
                  {
                    $('#cbIsToOperation').prop('checked', true);


                    ShowToArea('C_IsToOperations');

                  }
                  else if (IsNull($(tr).find("td.ClientID").attr('val'), "0") != "0")
                  {
                    $('#cbIsToClient').prop('checked', true);


                    ShowToArea('C_IsToClient');

                    
                  }
                  else if (IsNull($(tr).find("td.AccountID").attr('val'), "0") != "0") {
                     

                      $('#cbIsToAccount').prop('checked', true);

                      ShowToArea('C_IsToAccount');

                      $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
                     // Fill_SelectInput_WithDependedID("api/Services/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));

                      GetSubAccount($(tr).find("td.SubAccountID").text());

                  }
                  else if (IsNull($(tr).find("td.DepartmentID").attr('val'), "0") != "0") {
                      $('#cbIsToDepartment').prop('checked', true);


                      ShowToArea('C_IsToDepartment');


                  }
                  else if (IsNull($(tr).find("td.TrailerID").attr('val'), "0") != "0") {
                      $('#cbIsToTrailer').prop('checked', true);


                      ShowToArea('C_IsToTrailer');


                  }
                  else if (IsNull($(tr).find("td.EquipmentID").attr('val'), "0") != "0") {
                      $('#cbIsToEquipment').prop('checked', true);


                      ShowToArea('C_ToEquipment');


                  }
                  else if (IsNull($(tr).find("td.BranchID").attr('val'), "0") != "0") {
                      $('#cbIsToBranch').prop('checked', true);


                      ShowToArea('C_IsToBranch');


                  }







            }

            //SC_Transactions_ClearAllControls();
            //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
            //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
            //ClearAll("City-form", null);
        
            $('#btnPrint2').removeClass('hide');
            $('#btn-Delete2').removeClass('hide');

            // $("#slInvoices").val($('#slPSInvoices_Filter').html());
            $("#txtCode").val($(tr).find("td.Code").attr('val').toUpperCase());


            $("#txtCodeManual").val($(tr).find("td.CodeManual").attr('val').toUpperCase());
            


            // $("#slPSInvoices").prop('disabled', true);
            $("#slCostCenter").val($(tr).find("td.CostCenterID").attr('val'));
            $("#txtDate").val($(tr).find("td.TransactionDate").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));


            //--------------------------------------------------------------------
            $("#slInvoices").val($(tr).find("td.SLInvoiceID").attr('val'));
            $("#slMaterialIssueRequests").val($(tr).find("td.MaterialIssueRequesitionsID").attr('val'));
            $('#slOperations').val($(tr).find("td.OperationID").attr('val'));


            //------------------------------------------------------------------
           
         
            $("#slGoodReceiptNote").val($(tr).find("td.ParentID").attr('val'));
            $("#slGoodReceiptNote").trigger("change");
            
            $('#slToClientID').val($(tr).find("td.ClientID").attr('val'));
            $('#slBranchID').val($(tr).find("td.BranchID").attr('val'));
            $('#slToDepartment').val($(tr).find("td.DepartmentID").attr('val'));
            $('#slToTrailer').val($(tr).find("td.TrailerID").attr('val'));
            $('#slToEquipment').val($(tr).find("td.EquipmentID").attr('val'));


            $('#slToTrailer').trigger('change');
            $('#slToEquipment').trigger('change');
            //--------------------------------------------------------------------

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
        
    });




}


function SC_Transactions_Update(pSaveandAddNew) {
    window.SaveErrorMessage = "";
    all_has_store = true;
    IsInsert = false;
    FadePageCover(true);
    if ($('#tblExpenses > tbody tr').length > 0) {
        $.each($('#tblExpenses > tbody tr'), function (i, tr) {

            if (IsNull($(tr).find('td.ExpensesID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر المصروف' : 'Please Select Expenses');
                all_has_store = false;
                FadePageCover(false);
            }

            if (IsNull($(tr).find('td.PartnerTypeID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر نوع جهة المصروف' : 'Please Select Partner Type ');
                all_has_store = false;
                FadePageCover(false);
            }

            if (IsNull($(tr).find('td.PartnerID').find('select').val(), "0") == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر  جهة المصروف' : 'Please Select Partner  ');
                all_has_store = false;
                FadePageCover(false);
            }

        });
    }

    if ($('#tblItems > tbody > tr').length > 0) {
        $($('#tblItems > tbody > tr')).each(function (i, tr) {
            debugger;
            var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
            var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();
            var quantityid = $(tr).find('td.Qty ').find('.inputquantity').val();
            if (quantityid.trim() == "" || quantityid.trim() == "0") {
                $(tr).remove();
            }

            //---------------------------------------- FROM --------------------------------------------------------------

            if ($("#cbIsFromInvoice").is(":checked") && $("#slInvoices").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الفاتورة' : 'Please Select Invoice');
                all_has_store = false;
                FadePageCover(false);

            }
            else if ($("#cbIsFromRequest").is(":checked") && $("#slMaterialIssueRequests").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر اذن الصرف' : 'Please Select Material Issue Requests');
                all_has_store = false;
                FadePageCover(false);
            }
            else if ($("#cbIsFromGoodReceiptNote").is(":checked") && $("#slGoodReceiptNote").val() == "0") {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر  من قائمة المخازن و الاصناف' : 'Please Select From Item And Stores List');

                all_has_store = false;
                FadePageCover(false);
            }

            else if ($("#cbIsFIFO").is(":checked")
                && ($("#slOperations").val() == "0"
                    && $("#slToDepartment").val() == "0"
                    && $("#slToTrailer").val() == "0"
                    && $("#slToEquipment").val() == "0"
                && $("#slBranchID").val() == "0"
                && $("#slToClientID").val() == "0"



                )) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? '   من فضلك ادخل جهة الصرف ( الى )' : 'Please Select destination[To] ');

                all_has_store = false;
                FadePageCover(false);
            }
            // لو هي مانول و مدخلش عميل او عملية
            else if ($("#cbIsManual").is(":checked") && ($("#slOperations").val() == "0" && $("#slToClientID").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر عملية او عميل' : 'Please insert CLient Or Operation ');

                all_has_store = false;
                FadePageCover(false);
            }


            //-------------------------------------------------------------- TO ---------------------------------------------------------------------------

            // اذن الصرف على فرع هو جاي من اذن اضافة :::: عملية توزيع
            if (($("#cbIsToBranch").is(":checked")) && ($("#slBranchID").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الفرع' : ' Please Select Branch');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToDepartment").is(":checked")) && ($("#slToDepartment").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر القسم' : ' Please Select Department');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToTrailer").is(":checked")) && ($("#slToTrailer").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر العربية' : ' Please Select Trailer');

                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToEquipment").is(":checked")) && ($("#slToEquipment").val() == "0")) {
                window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر العربية' : ' Please Select Equipment');
                all_has_store = false;
                FadePageCover(false);
                return false;
            }
            else if (($("#cbIsToAccount").is(":checked"))) {
                if ($("#slAccountID").val() == "0") {
                    window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الحساب' : ' Please Select Account');
                    all_has_store = false;
                    FadePageCover(false);
                    return false;
                }

                if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

                    swal("Excuse me", "You must select SubAccount", "warning");
                    window.SaveErrorMessage = window.SaveErrorMessage + " " + (lang == "ar" ? 'من فضلك اختر الحساب التحليلي' : ' Please Select SubAccount');
                    all_has_store = false;
                    FadePageCover(false);
                    return false;
                }


            }
            //--------------------------------------------------------------------------------------------------------------------------------------

            if (storeid.trim() == "0" || itemid.trim() == "0" || quantityid.trim() == "") {

                all_has_store = false;
                FadePageCover(false)
                return false;
            }
            else {

                all_has_store = true;
            }
        });

    }

    setTimeout(function () {

        // $('.selectstore').html($('#slStores').html());





        if ($('#tblItems > tbody > tr').length == 0 && $('#tblExpenses > tbody > tr').length == 0) {
          //  swal('Excuse me', 'Fill Items', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill Items'), 'warning');
            FadePageCover(false)


        }
        else if (!all_has_store  ) {

          //  swal('Excuse me', 'Fill All Items , Quantity , Stores', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? (' يجب مراعاة اختيار الاصناف و ادخال الكميات و المخازن     ' + window.SaveErrorMessage) : (window.SaveErrorMessage + ' You Must Fill All Items , Quantity , Stores')), 'warning');
            FadePageCover(false)

        }

        else if (window.SaveErrorMessage != "") {

            //  swal('Excuse me', 'Fill All Items , Quantity , Stores', 'warning');
            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? (' يجب مراعاة اختيار الاصناف و ادخال الكميات و المخازن     ' + window.SaveErrorMessage) : (window.SaveErrorMessage + ' You Must Fill All Items , Quantity , Stores')), 'warning');
            FadePageCover(false)

        }




        else if (($('#txtDate').val().trim() != "" && isValidDate($('#txtDate').val(), 1))) {


            var CLientID = "0";

            if ($("#cbIsFromInvoice").is(":checked"))
                CLientID = $("#slInvoices option:selected").attr('ClientID');
            else if ($("#cbIsFromRequest").is(":checked"))
                CLientID = $("#slMaterialIssueRequests option:selected").attr('ClientID');
            else if ($("#cbIsManual").is(":checked") && IsNull($('#slOperations').val(), "0") == "0")
                CLientID = $('#slToClientID').val();
            else if ($("#cbIsToClient").is(":checked"))
                CLientID = $('#slToClientID').val();


            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/SC_Transactions/Update", {
                pID: $("#hID").val(),
                pCode: $("#txtCode").val(),
                pCodeManual: IsNull( $("#txtCodeManual").val() , "0"),  
                pTransactionDate: ConvertDateFormat($('#txtDate').val()),
                pPurchaseInvoiceID: "0",
                pPurchaseOrderID: "0",
                pExaminationID: "0",
                pIsApproved: false,
                pNotes: ($("#txtNotes").val() == "" || $("#txtNotes").val() == null ? "0" : $("#txtNotes").val()),
                pSLInvoiceID: $('#slInvoices').val(),
                pDepartmentID: IsNull($('#slToDepartment').val(), "0"),
                pClientID: CLientID ,
                pCostCenterID: $("#slCostCenter").val(),
                pIsSpareParts: "false",
                pFiscalYearID: "0",
                pSupplierID: "0",
                pParentID: IsNull($("#slGoodReceiptNote").val(), "0"),
                pTransactionTypeID: "20",
                pJV_ID: RollBackData.JV_ID, pIsOutOfStore: RollBackData.IsOutOfStore,
                pMaterialIssueRequesitionsID: $("#slMaterialIssueRequests").val(),
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
                pFromStore: 0 ,
                pJV_ID2: 0,
                pTransferParentID: 0,
                pForwardingPSInvoiceID: 0,
                pOperationID: IsNull($('#slOperations').val(), "0"),
                pBranchID: IsNull($('#slBranchID').val(), "0"),
                pIsFromFlexi: "false"
                , pTrailerID: IsNull($('#slToTrailer').val(), "0"),
                pEquipmentID: IsNull($('#slToEquipment').val(), "0"),
                pAmount: IsNull($("#txtAmount").val(), "0"),
                pTruckerID: IsNull($("#slTruckerID").val(), "0"),
                pCardNo: IsNull($("#txtCartaNo").val(), "0"),
                pDivisionID: "0",
                pAccountID: IsNull($('#slAccountID').val(), "0"),
                pSubAccountID: IsNull($('#slSubAccountID').val(), "0")
            }, pSaveandAddNew, null, '#hID', function () {






                if ($('#tblItems > tbody > tr').length > 0) {
                    InsertUpdateFunction2("form", "/api/SC_Transactions/InsertItems",
                        JSON.stringify(SetArrayOfItems())
                        , pSaveandAddNew, "SC_TransactionsModal", function (Code) {


                            if ($("#tblExpenses > tbody tr").length > 0) {

                                $.ajax({
                                    type: "GET",
                                    url: "/api/SC_Transactions/InsertExpenses",
                                    data:
                                    {
                                        pExpenses: JSON.stringify(SetArrayOfExpenses()),
                                        pExpensesTaxes: JSON.stringify(SetArrayOfTaxes())
                                    },
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (pData) {
                                        if (pData[0] == "") {
                                            //swal("Sorry", "You Must Delete Payment First");
                                            FadePageCover(false);

                                            swal("Success", " data saved successfully.");
                                            FadePageCover(true);
                                            PrintTransaction(pData[1]);


                                            setTimeout(function () {
                                                SC_Transactions_LoadingWithPaging();
                                                IntializeData();
                                                ClearAllTableRows('tblExpenses');
                                                ClearAllTableRows('tblItems');
                                                ClearAllTableRows('tblTaxes');

                                                all_has_store = false;
                                                jQuery("#SC_TransactionsModal").modal("hide");

                                            }, 300);



                                        }
                                        else {
                                            FadePageCover(false);
                                            swal(data[0]);
                                        }

                                    }
                                });

                                
                            }
                            else {

                                FadePageCover(true)
                                $('#txtCode').val(Code[1]);
                                PrintTransaction(Code[2]);


                                setTimeout(function () {
                                    SC_Transactions_LoadingWithPaging();
                                    IntializeData();
                                    ClearAllTableRows('tblItems');
                                    all_has_store = false;

                                }, 300);
                            }


                        });
                }
                else
                {
                    $.ajax({
                        type: "GET",
                        url: "/api/SC_Transactions/InsertExpenses",
                        data:
                        {
                            pExpenses: JSON.stringify(SetArrayOfExpenses()),
                            pExpensesTaxes: JSON.stringify(SetArrayOfTaxes())
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (pData) {
                            if (pData[0] == "") {
                                //swal("Sorry", "You Must Delete Payment First");
                                FadePageCover(false);

                                swal("Success", " data saved successfully.");
                                FadePageCover(true);
                                PrintTransaction(pData[1]);


                                setTimeout(function () {
                                    SC_Transactions_LoadingWithPaging();
                                    IntializeData();
                                    ClearAllTableRows('tblExpenses');
                                    ClearAllTableRows('tblItems');
                                    ClearAllTableRows('tblTaxes');

                                    all_has_store = false;

                                }, 300);



                            }
                            else {
                                FadePageCover(false);
                                swal(data[0]);
                            }

                        }
                    });

                }



            });
        }
        else {
          //  swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");

            swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل التاريخ بشكل صحيح' : 'Please make sure that date format is dd/MM/yyyy.'), 'warning');
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
                        ClearAllTableRows('tblExpenses');
                        ClearAllTableRows('tblTaxes');
                        
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
    $('#txtCode').val("Auto");
    $('#txtCodeManual').val("");
    
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());

    $("#txtAmount").val(0);
    $("#slTruckerID").val(0);
    $("#txtCartaNo").val(0);

    $('#spanCustomerName').text('');
    IntializeData();
    TransactionLevel = "IsDefault";
}



//#endregion Header


//#region print
function PrintTransaction11() {
    FadePageCover(true)

    var footer = ""
    footer += '         <div style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    var a = "استلمت الأصناف الموضحة أعلاه";
    a = a + "<br/>";
    a = a + "رئيس العنبر"
    a = a + "<br/>";
    a = a + "....................";
    var b = "تم تسليم الكمية الموضحة أعلاه";
    b = b + "<br/>";
    b = b + "أمين المخزن";
    b = b + "<br/>";
    b = b + "....................";
    footer += '         <div class="col-xs-4"> ' + a + '</div>';
    footer += '         <div class="col-xs-5">' + b + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';

    footer += '         <div class="row"><hr/></div>';



    var a1 = "يعتمد";
    a1 = a1 + "<br/>";
    a1 = a1 + "المدير العام";
    a1 = a1 + "<br/>";
    a1 = a1 + "....................";

    var b1 = "";
    b1 = b1 + "<br/>";
    b1 = b1 + "مدير الحسابات";
    b1 = b1 + "<br/>";
    b1 = b1 + "....................";

    var c1 = "";
    c1 = c1 + "<br/>";
    c1 = c1 + "المحاسب";
    c1 = c1 + "<br/>";
    c1 = c1 + "....................";
    footer += '         </div>';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="col-xs-3">' + a1 + '</div>';
    footer += '         <div class="col-xs-3">' + b1 + '</div>';
    footer += '         <div class="col-xs-3">' + c1 + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    var pReportTitle = "إذن صرف أصناف من المخازن رقم   ";
    pReportTitle += "<br>"
    pReportTitle += $('#txtCode').val();
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>الصنف</th><th>الكمية</th><th>الوحدة</th><th>المخزن</th></thead>'
    pTablesHTML += '<tbody>';
    $('#tblItems > tbody > tr').each(function (i, tr) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + $(tr).find('td.ItemID ').find('.selectitem option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Qty ').find('.inputquantity').val() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.UnitID ').find('.selectunit option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.StoreID').find('.selectstore option:selected').text() + '</td>';
        //pTablesHTML += '<td>' + $(tr).find('td.Notes ').find('.inputnotes').val() + '</td>';
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

    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>بواسطة:</b> ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>كود الحركة: </b> ' + $('#txtCode').val() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>العميل: </b> ' + $('#spanCustomerName').text() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>الفرع: </b> ' + $("#slBranchID option:selected").text() + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الاذن : </b> ' + $('#txtDate').val() + '</div>';
    //ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات : </b> ' + $('#txtNotes').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += ('</div>' + footer);

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();
    FadePageCover(false)
}





function PrintTransaction(pID) {


    if (IsNull(pID, null) == null)
    pID = $('#hID').val();

    FadePageCover(true)
    LoadAll("/api/SC_Transactions/LoadItems", "where \'Details_Expenses\' = \'Details_Expenses\' | " + pID, function (pTabelRows) {


        var Items = JSON.parse(pTabelRows[0]);
        var Expenses = JSON.parse(pTabelRows[1]);
        var All = JSON.parse(pTabelRows[2]);
        SC_DrawMaterialIssueVoucher(Items, Expenses, All);
    });

}
function PrintTransactionMulti(pID) {
    FadePageCover(false)
    debugger;
    var pIds = GetAllSelectedIDsAsStringWithAttributeTbl('tblSC_Transactions');
    if (pIds=="") {
        swal("Sorry", "Please, select at least one Item.");

    }
    else {
        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("IDs");
        arr_Values.push(pIds);

        var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "اذن صرف"
            , pReportName: "Rep_MaterialIssueVoucherFollowUpMlti"
        };
        var win = window.open("", "_blank");
        var url = '/ReportMainClass/PrintInqueryReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '' + '&pReportName=' + pParametersWithValues.pReportName + '';

        win.location = url;

        if (IsNull(pID, null) == null)
            pID = $('#hID').val();

        FadePageCover(false)
    }
    
    //LoadAll("/api/SC_Transactions/LoadItems", "where \'Details_Expenses\' = \'Details_Expenses\' | " + pID, function (pTabelRows) {


    //    var Items = JSON.parse(pTabelRows[0]);
    //    var Expenses = JSON.parse(pTabelRows[1]);
    //    var All = JSON.parse(pTabelRows[2]);
    //    SC_DrawMaterialIssueVoucher(Items, Expenses, All);
    //});

}

function SC_DrawMaterialIssueVoucher(items, Expenses, All) {
    var Header = All[0];
    var footer = ""
    footer += '         <div style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    var a = "استلمت الأصناف الموضحة أعلاه";
    a = a + "<br/>";
    a = a + "رئيس العنبر"
    a = a + "<br/>";
    a = a + "....................";
    var b = "تم تسليم الكمية الموضحة أعلاه";
    b = b + "<br/>";
    b = b + "أمين المخزن";
    b = b + "<br/>";
    b = b + "....................";
    footer += '         <div class="col-xs-4"> ' + a + '</div>';
    footer += '         <div class="col-xs-5">' + b + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';

    footer += '         <div class="row"><hr/></div>';



    var a1 = "يعتمد";
    a1 = a1 + "<br/>";
    a1 = a1 + "المدير العام";
    a1 = a1 + "<br/>";
    a1 = a1 + "....................";

    var b1 = "";
    b1 = b1 + "<br/>";
    b1 = b1 + "مدير الحسابات";
    b1 = b1 + "<br/>";
    b1 = b1 + "....................";

    var c1 = "";
    c1 = c1 + "<br/>";
    c1 = c1 + "المحاسب";
    c1 = c1 + "<br/>";
    c1 = c1 + "....................";
    footer += '         </div>';
    footer += '         <div class="row" style="font-size:20px;font-weight: bold;">';
    footer += '         <div class="col-xs-3">' + a1 + '</div>';
    footer += '         <div class="col-xs-3">' + b1 + '</div>';
    footer += '         <div class="col-xs-3">' + c1 + '</div>';
    footer += '         <div class="col-xs-3"></div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    footer += '         </div>';
    var pReportTitle = "إذن صرف أصناف من المخازن رقم   ";
    pReportTitle += "<br>"
    pReportTitle += Header.TransactionCode;
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>الصنف</th><th>الكمية</th><th>الوحدة</th><th>المخزن</th><th>الملاحظات</th></thead>'
    pTablesHTML += '<tbody>';
    $(items).each(function (i, item) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + item.D_ItemName + '</td>';
        pTablesHTML += '<td>' + item.Qty_D + '</td>';
        pTablesHTML += '<td>' + item.D_UnitName + '</td>';
        pTablesHTML += '<td>' + item.D_StoreName + '</td>';
        pTablesHTML += '<td>' + '' + '</td>';
        pTablesHTML += '</tr>';
    });
    pTablesHTML += '</tbody></table>';


    //****************** fill Expenses table *************************************************
    var pExpensesTablesHTML = "";
    pExpensesTablesHTML = '<table id="tblexpenses" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pExpensesTablesHTML += '<thead><th>المصروف</th><th>نوع الجهة</th><th>مصروف الى</th><th>القيمة</th><th>الملاحظات</th></thead>'
    pExpensesTablesHTML += '<tbody>';
    $(Expenses).each(function (i, item) {

        pExpensesTablesHTML += '<tr>';
        pExpensesTablesHTML += '<td>' + item.ExpensesName + '</td>';
        pExpensesTablesHTML += '<td>' + item.PartnerTypeName + '</td>';
        pExpensesTablesHTML += '<td>' + item.PartnerName + '</td>';
        pExpensesTablesHTML += '<td>' + item.ExpensesAmount + '</td>';
        pExpensesTablesHTML += '<td>' + item.ExpensesNotes + '</td>';
        pExpensesTablesHTML += '</tr>';
        if (i == Expenses.length - 1) {
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
   // pExpensesTablesHTML += '</tbody></table>';
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

    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>بواسطة:</b> ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>سيريال الحركة: </b> ' + Header.TransactionCode + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>كود : </b> ' + Header.TransactionCodeManual + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>صرف الى: </b> ' + Header.ItemsDestintionsLocal + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الاذن : </b> ' + GetDateFromServer(Header.TransactionDate) + '</div>';
    ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات : </b> ' + Header.Notes + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += '<h4>مصروفات</h4>';
    ReportHTML += pExpensesTablesHTML;
    ReportHTML += ('</div>' + footer);

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


function SC_SettingForAddNew()
{

    SC_Transactions_ClearAllControls();



    setTimeout(function () {
        TransactionLevel = "IsDefault";
        SC_HideShowEditBtns(false);
    }, 300);
}



function SetFieldsForIsFromRequest() {
    $('#cbIsFromRequest').prop("checked", true);  //cbIsFromRequest
    $('.C_IsFromMaterialIssueRequests').removeClass('hide');
    $('.C_IsFromInvoice').addClass('hide');
    $('.C_GoodReceiptNote').addClass('hide');

    $('.selectstore').prop('disabled', true);
    $('#btnCopyStores').addClass('hide');
    $('#btn-NewRow').addClass('hide');
    $('#slToClientID').prop('disabled', true);
    ShowHideToOperations(true);
    ShowHideToCLients(false);
    ShowHideToAccount(false);

    ShowHideToBranches(true);

    ShowHideToDepartments(true);
    ShowHideToTrailers(true);
    ShowHideToEquipments(true);
    ShowHideToNone(false);

    if (IsNull($("#hID").val(), "0") == "0")
    {



        Set_ToIntializeCheckBoxes("#cbIsToDepartment") 
        
        ShowToArea('C_IsToDepartment');

        Set_ToIntializeValueAsZero()
    }

}
function SetFieldsForIsFromInvoice()
{
    $('#cbIsFromInvoice').prop("checked", true);  //cbIsFromInvoice
    $('.C_IsFromMaterialIssueRequests').addClass('hide');
    $('.C_IsFromInvoice').removeClass('hide');
    $('.C_GoodReceiptNote').addClass('hide');
    $('.selectstore').prop('disabled', false);
    $('#btnCopyStores').removeClass('hide');
    $('#btn-NewRow').addClass('hide');
    $('#slToClientID').prop('disabled', true);
    ShowHideToNone(false);

    ShowHideToOperations(true);
    ShowHideToCLients(true);
    ShowHideToAccount(true);

    ShowHideToBranches(false);
    ShowHideToDepartments(false);
    ShowHideToTrailers(false);
    ShowHideToEquipments(false);
    if (IsNull($("#hID").val(), "0") == "0")
    {
        Set_ToIntializeCheckBoxes("#cbIsToClient")
        ShowToArea('C_IsToClient');
        Set_ToIntializeValueAsZero()
    }
}
function SetFieldsForManual() {
    debugger;
    $('#cbIsManual').prop("checked", true);  // Is Manual
    $('.C_IsFromMaterialIssueRequests').addClass('hide');
    $('.C_IsFromInvoice').addClass('hide');
    $('.C_GoodReceiptNote').addClass('hide');

    $('.selectstore').prop('disabled', false);
    $('#btnCopyStores').removeClass('hide');
    $('#btn-NewRow').removeClass('hide');
    $('#slToClientID').prop('disabled', false);
    ShowHideToNone(false);
    ShowHideToOperations(true);
    ShowHideToCLients(true);
    ShowHideToAccount(true);

   // ShowHideToBranches(false);
    ShowHideToBranches(true);

    ShowHideToDepartments(true);
    ShowHideToTrailers(true);
    ShowHideToEquipments(true);
    if (IsNull($("#hID").val(), "0") == "0") {

        Set_ToIntializeCheckBoxes("#cbIsToNone")
        Set_ToIntializeValueAsZero()
      //  $('#cbIsToNone').trigger('change');


        ShowToArea('');
    } 
}
function SetFieldsForFromGoodReceiptNote()
{
    console.log('نضبط فيلدات اذن الاضافة')
    $('#cbIsFromGoodReceiptNote').prop("checked", true);  // GoodReceiptNote
    $('.C_IsFromMaterialIssueRequests').addClass('hide');
    $('.C_IsFromInvoice').addClass('hide');
    $('.C_GoodReceiptNote').removeClass('hide');
    $('#slToClientID').prop('disabled', false);
    $('.selectstore').prop('disabled', true);
    $('#btnCopyStores').addClass('hide');
    $('#btn-NewRow').addClass('hide');
    ShowHideToNone(false);
    ShowHideToOperations(false);
    ShowHideToCLients(false);
    ShowHideToAccount(false);

    ShowHideToBranches(true);
    ShowHideToBranches(true);

    ShowHideToDepartments(true);
    ShowHideToTrailers(true);
    ShowHideToEquipments(true);
    if (IsNull($("#hID").val(), "0") == "0") {

        //-----------------------------------------------------------------------------
        Set_ToIntializeCheckBoxes("#cbIsToBranch")
        //--------------------------------------------------------------------------

        //--------------------------------------------------------------------------

        ShowToArea('C_IsToBranch');


        Set_ToIntializeValueAsZero()
    }
}
function SetFieldsForFIFO() {
    $('#cbIsFIFO').prop("checked", true);  // Is Manual
    $('.C_IsFromMaterialIssueRequests').addClass('hide');
    $('.C_IsFromInvoice').addClass('hide');
    $('.C_GoodReceiptNote').addClass('hide');
    $('.C_FIFO').removeClass('hide');
    $('#slToClientID').prop('disabled', false);

    $('.selectstore').prop('disabled', true);
    $('#btnCopyStores').addClass('hide');
    $('#btn-NewRow').addClass('hide');
    ShowHideToNone(false);
    ShowHideToOperations(true);
    ShowHideToCLients(true);
    ShowHideToAccount(true);

    ShowHideToBranches(true);
    ShowHideToDepartments(($('#hReadySlOptions option[value="2032"]').attr("OptionValue") == "true" /*صرف من مخزن ع قسم*/ ? true : false ));
    ShowHideToTrailers(true);
    ShowHideToEquipments(true);

    if (IsNull($("#hID").val(), "0") == "0") {

        //-----------------------------------------------------------------------------
        if (/*صرف من مخزن ع فرع*/$('#hReadySlOptions option[value="2021"]').attr("OptionValue") == "true" || (/*صرف من مخزن ع قسم*/$('#hReadySlOptions option[value="2032"]').attr("OptionValue") != "true"))
        {
            Set_ToIntializeCheckBoxes("#cbIsToBranch")
            ShowToArea('C_IsToBranch');
        }
        else
        {

            Set_ToIntializeCheckBoxes("#cbIsToDepartment")
            ShowToArea('C_IsToDepartment');
        }

       
        //--------------------------------------------------------------------------
        Set_ToIntializeValueAsZero()
        //--------------------------------------------------------------------------
      //  ShowToArea('');



    }
}

function Set_ToIntializeCheckBoxes(pID)
{
    $('#cbIsToClient').prop("checked", false);
    $('#cbIsToNone').prop("checked", false);
    $('#cbIsToOperation').prop("checked", false);
    $('#cbIsToBranch').prop("checked", false);
    $('#cbIsToDepartment').prop("checked", false);
    $('#cbIsToTrailer').prop("checked", false);
    $('#cbIsToEquipment').prop("checked", false);
    $(pID).prop("checked", true);
}

function Set_ToIntializeValueAsZero()
{

    $('#slBranchID').val("0");
    $('#slToClientID').val("0");
    $("#slOperations").val("0");
    $('#slToDepartment').val("0");
    $('#slToTrailer').val("0");
    $('#slToEquipment').val("0");

    $('#slToTrailer').trigger('change');
    $('#slToEquipment').trigger('change');
}

function ShowHideToBranches(_Shown) {
    console.log('نظهر منطقة الفرع')
    if (/*$('#hReadySlOptions option[value="2021"]').attr("OptionValue") == "true" &&*/ _Shown) {
        $('#cbIsToBranchArea').removeClass('hide');
    }
    else {

        $('#cbIsToBranchArea').addClass('hide');
    }

}
function ShowHideToOperations(_Shown) {
    if ($('#hReadySlOptions option[value="2020"]').attr("OptionValue") == "true" && _Shown) {
        $('#cbIsToOperationArea').removeClass('hide');
    }
    else {

        $('#cbIsToOperationArea').addClass('hide');
    }
}
function ShowHideToCLients(_Shown) {
    if (_Shown) {
        $('#cbIsToClientArea').removeClass('hide');
    }
    else {

        $('#cbIsToClientArea').addClass('hide');
    }
}
function ShowHideToAccount(_Shown) {
    if (_Shown) {
        $('#cbIsToAccountArea').removeClass('hide');
    }
    else {

        $('#cbIsToAccountArea').addClass('hide');
    }
}
function ShowHideToDepartments(_Shown) {
    if (_Shown) {
        $('#cbIsToDepartmentArea').removeClass('hide');
    }
    else {

        $('#cbIsToDepartmentArea').addClass('hide');
    }
}
function ShowHideToTrailers(_Shown) {
    if (_Shown) {
        $('#cbIsToTrailerArea').removeClass('hide');
    }
    else {

        $('#cbIsToTrailerArea').addClass('hide');
    }
}
function ShowHideToEquipments(_Shown) {
    if (_Shown) {
            
        $('#cbIsToEquipmentArea').removeClass('hide');
    }
    else {

        $('#cbIsToEquipmentArea').addClass('hide');
    }
}

function ShowHideToNone(_Shown)
{
    if (_Shown)
    {
        $('#cbIsToNoneArea').removeClass('hide');
    }
    else
    {

        $('#cbIsToNoneArea').addClass('hide');
    }
}





function SC_HideShowEditBtns(IsApproved, cb)
{
    debugger;
    var cbIsFromType = null;
    if (typeof cb !== "undefined" && cb != null) {
        TransactionLevel = "IsChangeCheckBox";
    }
        cbIsFromType = cb; // جايه من تغيير حصل في شيك بوكس



    if (pDefaults.UnEditableCompanyName == "AGR") {

        $('.TruckerIDsl').removeClass('hide');
        $('.CartaNotxt').removeClass('hide');
        $('.Amounttxt').removeClass('hide');
    



    }

    $("#tblItems").find("input.IsDisable,button.IsDisable,textarea.IsDisable,select.IsDisable").prop('disabled', true);
    _IsApproved = IsApproved;
    if (IsNull($("#hID").val(), "0") != "0" && (IsApproved == true || $("#hf_CanEdit").val() != 1))
    {
        $('.Edit-btn').addClass('hide');
        $('.Edit-input').prop('disabled', true);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
    }
    else {
        if (TransactionLevel == "IsDefault") {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").not('.IsDisable').prop('disabled', false);
        }
    }


    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0")
    { // is [ New ]
        $('#txtDate').prop('disabled', false);

        // Enable From ComboBoxes
        //-----------------------------------------------------------
        $('#slInvoices').prop('disabled', false);
        $('#slMaterialIssueRequests').prop('disabled', false);
        $('#slGoodReceiptNote').prop('disabled', false);
        //----------------------------------------------------------
        $('#btn-Items').removeClass('hide');

        // Enable From CheckBoxes
        $('.cbIsFrom').prop('disabled', false);
        //--------------------------------------
        if (cbIsFromType == null) //From radio مجاش من تغيير 
        {
            if ($('#hReadySlOptions option[value="2022"]').attr("OptionValue") == "true") /*SC_MaterilaIssue_DefaultFromRequest*/
            {
                if (TransactionLevel == "IsDefault") {
                   SetFieldsForIsFromRequest();
                    $("#slGoodReceiptNote").val("0");
                    $("#slInvoices").val("0");
                }
            }
            else if ($('#hReadySlOptions option[value="2021"]').attr("OptionValue") == "true" /*SC_ToBranch*/
                || $('#hReadySlOptions option[value="2034"]').attr("OptionValue") == "true") /*SC_StartToDepartment*/
            {
                if (TransactionLevel == "IsDefault")
                {
                    SetFieldsForFIFO();
                    $("#slMaterialIssueRequests").val("0");
                    $("#slInvoices").val("0");
                }
            }
            else // من فاتورة
            {
                if (TransactionLevel == "IsDefault")
                {
                    $('#tblItems > tbody').html('');
                    SetFieldsForIsFromInvoice();
                    $("#slMaterialIssueRequests").val("0");
                    $("#slGoodReceiptNote").val("0");
                    $("#slInvoices").val("0");
                }
            }
        }
        else // From radio جاي من تغيير  "From radio button Option change"
        {

            if ($(cbIsFromType).attr('ID') == "cbIsFromInvoice")
            {
                $('#tblItems > tbody').html('');
                SetFieldsForIsFromInvoice();
                 $("#slMaterialIssueRequests").val("0");
                $("#slGoodReceiptNote").val("0");
                $("#slInvoices").val("0");

            }
            else if ($(cbIsFromType).attr('ID') == "cbIsFromRequest")
            {
                $('#tblItems > tbody').html('');
                SetFieldsForIsFromRequest();
                $("#slMaterialIssueRequests").val("0");
                $("#slGoodReceiptNote").val("0");
                $("#slInvoices").val("0");

            }
            else if ($(cbIsFromType).attr('ID') == "cbIsFromGoodReceiptNote") {
                $('#tblItems > tbody').html('');
                SetFieldsForFromGoodReceiptNote();
                $("#slMaterialIssueRequests").val("0");
                $("#slGoodReceiptNote").val("0");
                $("#slInvoices").val("0");

            }

            else if ($(cbIsFromType).attr('ID') == "cbIsManual" && pDefaults.UnEditableCompanyName == "ERP") {
                $('#tblItems > tbody').html('');
                //SetFieldsForFIFO();
                SetFieldsForManual();
                $("#slMaterialIssueRequests").val("0");
                $("#slGoodReceiptNote").val("0");
                $("#slInvoices").val("0");

            }
            else
            {
                $('#tblItems > tbody').html('');
                SetFieldsForFIFO();
             //   SetFieldsForManual();
                $("#slMaterialIssueRequests").val("0");
                $("#slGoodReceiptNote").val("0");
                $("#slInvoices").val("0");
            }

        }

    }
    else // is [ Update ]
    {
        console.log('هنظهر و نخفي الفيلدات لشاشة التعديل')
        $('#txtDate').prop('disabled', true);
        $('#slInvoices').prop('disabled', true);
        $('#slMaterialIssueRequests').prop('disabled', true);
        $('#slGoodReceiptNote').prop('disabled', true);


      

        //---------------------------------------
        $('.cbIsFrom').prop('disabled', true);
        //--------------------------------------


        if ($('#cbIsFromInvoice').is(":checked"))
        {
            SetFieldsForIsFromInvoice();
            $('#btn-Items').addClass('hide');
        }
        else if ($('#cbIsFromRequest').is(":checked"))
        {

            SetFieldsForIsFromRequest();
            $('#btn-Items').addClass('hide');

        }
        else if ($('#cbIsFromGoodReceiptNote').is(":checked")) {

            SetFieldsForFromGoodReceiptNote();
            $('#btn-Items').addClass('hide');

        }
        else if ($('#cbIsManual').is(":checked") && pDefaults.UnEditableCompanyName == "ERP") {
            //SetFieldsForFIFO();
            $('#btn-Items').removeClass('hide');
            SetFieldsForManual();

        }
        else
        {
            SetFieldsForFIFO();
            $('#btn-Items').removeClass('hide');
          //  SetFieldsForManual();
        }

    }
    // for [ All ]
    $('.selectitem').prop('disabled', true);
    $('.selectunit').prop('disabled', true);





    //ShowHideToBranches(true);

    //ShowHideToOperations(true);
}

function ShowToArea(ClassName)
{

    $('.C_IsToOperations').addClass('hide');
    $('.C_IsToBranch').addClass('hide');
    $('.C_IsToClient').addClass('hide');
    $('.C_IsToAccount').addClass('hide');

    $('.C_IsToDepartment').addClass('hide');
    $('.C_IsToTrailer').addClass('hide');
    $('.C_ToEquipment').addClass('hide');
    //------------------------------------------------
    $('.C_IsToOperations select').val("0");
    $('.C_IsToBranch select').val("0");
    $('.C_IsToClient select').val("0");
    $('.C_IsToAccount select').val("0");

    $('.C_IsToDepartment select').val("0");
    $('.C_IsToTrailer select').val("0");
    $('.C_ToEquipment select').val("0");
   // $('.C_FIFO').addClass('hide');
    //-----------------------------------------------
    $('.' + ClassName).removeClass('hide');
    //-----------------------------------------------

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

    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    
    // $('#txtFromDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtToDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    //  $("#slPSInvoices").prop('disabled', false);
   // $("#hID").val("");
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SC_Transactions/IntializeData",
        data: { pTransactionTypeID: "20", pID: ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            debugger
           // Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Name', '<-- select Items -->', '#hidden_slItems', '', 'ItemUnits');
          
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[6], 'ID', 'Code', '<-- select Material Issue Request -->', '#slMaterialIssueRequests', '', 'ClientID,Notes,PartnerName');
            Fill_SelectInputAfterLoadData(d[8], 'ID', 'Code', '<-- SELECT Operation -->', '#slOperations', '');
         
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[4], 'ID', 'InvoiceNo,ClientName', ' : ' , '<-- select Sales Invoice -->', '#slInvoices', '', 'ClientID,ClientName');
            
            Fill_SelectInputAfterLoadData(d[10], 'ID', 'StoresAndRemainedItemsQty', '<-- SELECT Good Reciept Notes -->', '#slGoodReceiptNote', '');
            Fill_SelectInputAfterLoadData(d[18], 'ID', 'Code', '<- select Flexi ->', '#slFlexiSerial', '');

           // Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- select Store -->', '#slStores', '');
           // Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT Branch -->', '#slBranchID', '');

            // Fill_SelectInputAfterLoadData(d[11], 'ID', 'Name', '<-- SELECT Customer -->', '#slToClientID', '');

            //Fill_SelectInputAfterLoadData(d[12], 'ID', 'Name', '<-- SELECT Trailer -->', '#slToTrailer', '');
           // Fill_SelectInputAfterLoadData(d[13], 'ID', 'Name', '<-- SELECT Equipment -->', '#slToEquipment', '');
            //Fill_SelectInputAfterLoadData(d[14], 'ID', 'Name', '<-- SELECT Department -->', '#slToDepartment', '');

           // Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Item -->', '#slItems', '');

          //  Fill_SelectInputAfterLoadData(d[7], 'ID', 'CostCenterName', '<-- SELECT Cost Center -->', '#slCostCenter', '');

          //  Fill_SelectInputAfterLoadData(d[15], 'ID', 'Name', '<-- SELECT Expense -->', '#slhiddenExpenses', '');
            


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

var RequestStoreID = 0;
function SC_TransactionsDetails_BindTableRows(pItems)
{
    $("#hl-menu-SC").parent().addClass("active");

  //  if (IsNull($('#hID').val(), 0) != 0$("#cbIsFIFO").is(":checked"))
    if (window.CLearAllDetailsTable == true)
    {
        ClearAllTableRows("tblItems");
    }
    else
    {
        $('#tblItems tbody tr').each(function (i, tr) {
            if ($(tr).find('td.ItemID').attr('val') == $('#slItems').val() && $(tr).find('td.StoreID').attr('val') == $('#slStores').val()  )
            $(tr).remove();
        });
    }
    $.each(JSON.parse(pItems), function (i, item) {
        debugger; //item.
        RequestStoreID = (typeof item.FromStore === 'undefined' ? "0" : item.FromStore);
        (IsNull($('#hID').val(), 0) != 0 ? $('#slStores').val(RequestStoreID) : console.log("is new"));
        var disable = "";
        var disablechangeStore = "";
        var disablechangeItem = "";
        var disablechangeQty = "";
        var hideDeleteBtn = "";
        var RemainQty = 0;
        if ($("#cbIsFromGoodReceiptNote").is(":checked")) {

            //RemainQty = item.Qty;
            disablechangeStore = "disabled='disabled'";
            disablechangeItem = "";
            disablechangeQty = "";
            if (typeof item.Qty === 'undefined') {
                //if (typeof item.D_RemainedQuantity === 'undefined') {
                //    RemainQty = item.MaterilaIssueRequest_RemainQty;
                //}
                //else {
                //    RemainQty = item.D_RemainedQuantity;
                //}
                RemainQty = item.Parent_RemainQty;
                
            }
            else {
                RemainQty = item.Qty;
            }
        }
        if ($("#cbIsFIFO").is(":checked")) {
            if (IsNull($('#hReadySlOptions option[value="2035"]').attr("OptionValue"), "false") == "true") {


                //RemainQty = item.Qty;
                disablechangeStore = "disabled='disabled'";
                disablechangeItem = "disabled='disabled'";
                disablechangeQty = "disabled='disabled'";
                hideDeleteBtn = " hide ";
                if (typeof item.Qty === 'undefined') {

                    RemainQty = item.RemainQty;

                }
                else {
                    RemainQty = item.Qty;
                }

            }
            else {

                RemainQty = item.Qty;
            }
        }

        
        else {


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
        }
        //if ((typeof item.D_ID === 'undefined' && item.SLInvoiceDetailsID != null && item.SLInvoiceDetailsID != 0) || (typeof item.D_ID !== 'undefined'))
        //{
        //    disable = " IsDisable ";
        //}
        //console.log((typeof item.SLInvoiceDetailsID === 'undefined' ? item.ID : item.SLInvoiceDetailsID));
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr isdeleted='0' ID='" + item.ID + "'  counter='" + (RowsCounter + 1) + "' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID) + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + (typeof item.SLInvoiceDetailsID === 'undefined' ? '0' : item.SLInvoiceDetailsID)+ "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger " + hideDeleteBtn +" '><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button'  onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select " + disablechangeItem +"  id='Item-" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem " + disable + "'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + RemainQty + "'>" + "<input " + disablechangeQty+" tag='" + RemainQty + "' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
                + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID  : item.StoreID) + "'>" + "<select  id='store-" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' " + disablechangeStore +" class='input-sm  col-sm " + disable +" selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore' val='" + (typeof item.D_ID === 'undefined' ? item.ID : item.D_ID) + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='FlexiSerialID ' val='" + (typeof item.FlexiSerialID === 'undefined' ? item.FlexiSerialID : item.FlexiSerialID) + "'>" + "<select  id='FlexiSerial-" + (typeof item.FlexiSerialID === 'undefined' ? item.FlexiSerialID : item.FlexiSerialID) + "' tag='" + (typeof item.FlexiSerialID === 'undefined' ? item.FlexiSerialID : item.FlexiSerialID) + "' class='input-sm  col-sm selectFlexiSerial'>" + $('#slFlexiSerial').html() + "</select>" + "</td>"

                + "<td class='TransIDYard hide' val='" + item.TransIDYard + "'>" + item.TransIDYard + "</td>"


                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + 0 + "'>" + 0 + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='AveragePrice hide' val='" + (typeof item.AveragePrice === 'undefined' ? ($("#cbIsFIFO").is(":checked") ? (item.ParentPS_InvoiceItemUnitPrice * item.ParentPS_InvoiceExchangeRate) : (item.D_Price * item.ExchangeRate)) : (item.AveragePrice == 0 ? (item.D_Price) : item.AveragePrice)) + "'>" + (typeof item.AveragePrice === 'undefined' ? ($("#cbIsFIFO").is(":checked") ? (item.ParentPS_InvoiceItemUnitPrice * item.ParentPS_InvoiceExchangeRate) : (item.D_Price * item.ExchangeRate)) : (item.AveragePrice == 0 ? (item.D_Price ) : item.AveragePrice))  + "</td>"
                + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "20" + "'>" + "20" + "</td>"
                + "<td class='SC_ItemParentTransactionID hide' val='" + (typeof item.ItemID === 'undefined' ? item.ID : item.SC_ItemParentTransactionID) + "'>" + (typeof item.ItemID === 'undefined' ? item.ID : item.SC_ItemParentTransactionID) + "</td>"
                + "</tr>"));
        RowsCounter++;


        if ((JSON.parse(pItems)).length - 1 == i) {
            setTimeout(function () {

                // $('#tblItems > tbody > tr').find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);

                FillStores();
                TransactionLevel = "IsDetails";
                SC_HideShowEditBtns(_IsApproved);
            }, 300);
        }
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




}

function AddNewItem_Manual(ItemID, StoreID, Qty)
{
    $("#hl-menu-SC").parent().addClass("active");

    //if (window.CLearAllDetailsTable == true) {
    //    ClearAllTableRows("tblItems");
    //}
    //else {
        $('#tblItems tbody tr').each(function (i, tr) {
            if ($(tr).find('td.ItemID').attr('val') == $('#slItems').val() && $(tr).find('td.StoreID').attr('val') == $('#slStores').val())
                $(tr).remove();
        });
   // }

        debugger; //item.
      //  RequestStoreID = (typeof item.FromStore === 'undefined' ? "0" : item.FromStore);
     //   (IsNull($('#hID').val(), 0) != 0 ? $('#slStores').val(RequestStoreID) : console.log("is new"));
        var disable = "";
        var disablechangeStore = "";
        var disablechangeItem = "";
        var disablechangeQty = "";
        var hideDeleteBtn = "";
    var RemainQty = 0;
    
    var Units = $('#slItems').find("option:selected").attr("itemunits").split(',');
    var a = Units.indexOf("-1");
   // $('#UnitID-' + ItemID + '').val(Units[a - 1]);


             AppendRowtoTable("tblItems",
              ("<tr isdeleted='0' ID='" + 0+ "'  counter='" + (RowsCounter + 1) + "' value='" + 0 + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + 0  + "' /></td>"
                + "<td counter='" + (RowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger " + hideDeleteBtn + " '><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button'  onclick='UndoDeleteItems(" + (RowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + ItemID + "'>" + "<select " + disablechangeItem + "  id='Item-" + ItemID + "' tag='" + ItemID + "' class='input-sm  col-sm selectitem " + disable + "'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                  + "<td class='UnitID ' val='" + Units[a - 1] + "'>" + "<select disabled='disabled' id='UnitID-" + ItemID + "' tag='" + Units[a - 1] + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + Qty + "'>" + "<input " + disablechangeQty + " tag='" + Qty + "' type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
                + "<td class='StoreID' val='" + StoreID + "'>" + "<select  id='store-" + StoreID + "' tag='" + StoreID + "' " + disablechangeStore + " class='input-sm  col-sm " + disable + " selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='QuantityInStore' val='" + 0 + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                  + "<td class='CurrencyID hide' val='" + pDefaults.CurrencyID + "'>" + pDefaults.CurrencyID + "</td>"
                  + "<td class='ExchangeRate hide' val='" + 1 + "'>" + 1 + "</td>"
                  + "<td class='FlexiSerialID' val='" + "0" + "'>" + "<select id='FlexiSerial-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectFlexiSerial'>" + $('#slFlexiSerial').html() + "</select>" + "</td>"

                + "<td class='Notes' val='" + 0+ "'>" + "<input tag='" + 0 + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + 0 + "'>" + 0 + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='AveragePrice hide' val='" + 0 + "</td>"
                + "<td class='TransactionDate hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='QtyFactor hide' val='" + "-1" + "'>" + "-1" + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "20" + "'>" + "20" + "</td>"
                + "<td class='SC_ItemParentTransactionID hide' val='" + 0 + "</td>"
                + "</tr>"));
                RowsCounter++;

            

    //if (UnitID == 0 || UnitID == "0")
    //  {


            setTimeout(function () {

                // $('#tblItems > tbody > tr').find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);

                FillStores();
                TransactionLevel = "IsDetails";
                SC_HideShowEditBtns(false);



            }, 300);
  
  
    ApplyPermissions();
    //  BindAllCheckboxonTable("tblSC_Transactions", "ID");
    //  CheckAllCheckbox("ID");
    //  HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });




}



function AddNewRowAfterEvent()
{
    setTimeout(function () {
        if (IsNull($('#slStores').val(), "0") != "0" && IsNull($('#slItems').val(), "0") != "0" && IsNull($('#txtItemQty').val(), "0") != "0") {
            LoadTransactionsDetails(true);
        }
        
    }, 300);

}

function LoadTransactionsDetails(FromBtn)
{
    $('#spanCustomerName').text('');
    window.CLearAllDetailsTable = true;
    debugger;
    if (($('#hID').val() == "" || $('#hID').val() == "0") || (FromBtn == true && $("#cbIsFIFO").is(":checked") == true))
    {
       if ($("#cbIsFromInvoice").is(":checked"))
        {
            LoadAll("/api/SC_Transactions/LoadItems", " where D_ItemID is not null and ID = " + $('#slInvoices').val() + " and D_RemainedQuantity > 0 and 20 = 20", function (pTabelRows) {
                SC_TransactionsDetails_BindTableRows(pTabelRows);
                $('#slInvoices').val($('#slInvoices').val());
                $('#spanCustomerName').text($('#slInvoices option:selected').attr('ClientName'));
            });
        }
       else if ($("#cbIsFromRequest").is(":checked") )
        {

            LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID = " + $('#slMaterialIssueRequests').val() + "", function (pTabelRows) {
                SC_TransactionsDetails_BindTableRows(pTabelRows);

                $('#txtNotes').val($('#slMaterialIssueRequests option:selected').attr('Notes'));
                $('#slMaterialIssueRequests').val($('#slMaterialIssueRequests').val());
                $('#spanCustomerName').text($('#slMaterialIssueRequests option:selected').attr('PartnerName'));
            });
        }
       else if ($("#cbIsFromGoodReceiptNote").is(":checked")) {
            LoadAll("/api/SC_Transactions/LoadItems", " where 'OutgoingReport' = 'OutgoingReport' and 70 = 70 and ID = " + $('#slGoodReceiptNote').val() + "", function (pTabelRows) {
                SC_TransactionsDetails_BindTableRows(pTabelRows);

                $('#txtNotes').val($('#slMaterialIssueRequests option:selected').attr('Notes'));
                $('#slGoodReceiptNote').val($('#slGoodReceiptNote').val());
                $('#spanCustomerName').text('');
            });
        }
       else if ($("#cbIsFIFO").is(":checked"))
       {
           if (FromBtn == true && $("#cbIsFIFO").is(":checked") == true && IsNull($('#hReadySlOptions option[value="2035"]').attr("OptionValue"), "false") == "true")
                window.CLearAllDetailsTable = false;
            else
                window.CLearAllDetailsTable = true;

            if (IsNull($('#slStores').val(), "0") != "0" && IsNull($('#slItems').val(), "0") != "0" && IsNull($('#txtItemQty').val(), "0") != "0") {

                if (IsNull($('#hReadySlOptions option[value="2035"]').attr("OptionValue"), "false") == "false")
                {

                    AddNewItem_Manual(IsNull($('#slItems').val(), "0"), IsNull( $('#slStores').val(), "0"), IsNull($('#txtItemQty').val(), "0")  );
                }
                else
                {
                    LoadAll("/api/SC_Transactions/LoadItems", "where \'FIFO\' = \'FIFO\' and ISNULL( IsDeleted , 0 ) = 0 and TransactionTypeID in( 10 , 30 ) AND isnull( RemainQty , 0 ) > 0 and  D_StoreID = " + $('#slStores').val() + " and D_ItemID = " + $('#slItems').val() + " | " + $('#txtItemQty').val() + " " + " | " + IsNull($('#hID').val(), "0"), function (pTabelRows) {
                        SC_TransactionsDetails_BindTableRows(pTabelRows);
                    });

                }


            }
            else
            {

                swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل الصنف و الكمية و المخزن' : ' please select Item & Qty & Store '), 'warning');
            }

        }
       else
        {
            window.CLearAllDetailsTable = true;
            LoadAll("/api/SC_Transactions/LoadItems", " where   TransactionID = " + $('#slGoodReceiptNote').val()  + "", function (pTabelRows) {
                SC_TransactionsDetails_BindTableRows(pTabelRows);

               // $('#txtNotes').val($('#slMaterialIssueRequests option:selected').attr('Notes'));
                $('#slGoodReceiptNote').val($('#slGoodReceiptNote').val());
               // $('#spanCustomerName').text($('#slMaterialIssueRequests option:selected').attr('PartnerName'));
               // $('#slMaterialIssueRequests').val('0')

                $('#spanCustomerName').text('');
            });
          


           
        }
    }
    else
    {
        LoadAll("/api/SC_Transactions/LoadItems", "where TransactionID = " + $('#hID').val(), function (pTabelRows) {
            SC_TransactionsDetails_BindTableRows(pTabelRows);


            $('#spanCustomerName').text($('#slMaterialIssueRequests option:selected').attr('PartnerName'));
        });

        LoadAll("/api/SC_Transactions/LoadItems", "where \'Expenses\' = \'Expenses\' AND TransactionID = " + $('#hID').val(), function (pTabelRows)
        {
            debugger;
            //var data = JSON.parse(pTabelRows);
            SC_Expenses_BindTableRows(JSON.parse(pTabelRows[0]));
            SC_ExpensesTaxes_BindTableRows(JSON.parse(pTabelRows[1]));
            setTimeout(function ()
            {
                GetExpensesTotal();
            }, 1000);
           
            SC_HideShowEditBtns(_IsApproved);
        });

    }
    //[SL_InvoicesDetails
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Transactions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Transactions_BindTableRows(pTabelRows); SC_Transactions_ClearAllControls(); });
    // HighlightText("#tblSC_Transactions>tbody>tr", $("#txt-Search").val().trim());
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
        objItem.TransIDYard = $(tr).find('td.TransIDYard').attr('val');

        objItem.ExchangeRate = $(tr).find('td.ExchangeRate').attr('val');
        if (i == 0) {
            objItem.Notes = ($('#txtNotes').val() == "" || $('#txtNotes').val() == null ? "0" : $('#txtNotes').val() );

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
        objItem.QtyFactor = "-1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "20";
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
        objItem.FlexiSerialID = ($(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == "" || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == undefined || $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val() == null) ? 0 : $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val();
        objItem.TransIDYard = 0;

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        objItem.SC_ItemParentTransactionID = ($('#cbIsFromInvoice').is(':checked') ? "0" : $(tr).find('td.SC_ItemParentTransactionID').attr('val'));
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 2
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


function SetArrayOfExpenses()
{
    // var cobjItem = null;

    var arrayOfItems = new Array();
    $("#tblExpenses>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.TransactionID = $('#hID').val();
        objItem.ExpensesID = $(tr).find('td.ExpensesID').find('select').val(); 
        objItem.PartnerTypeID = $(tr).find('td.PartnerTypeID').find('select').val(); 
        objItem.PartnerID = $(tr).find('td.PartnerID').find('select').val(); 
        objItem.Notes = IsNull( $(tr).find('td.Notes').find('input').val() , "0"); 
        objItem.Amount = IsNull($(tr).find('td.Amount').find('input[type="number"]').val() , 0); 
        objItem.CurrencyID = pDefaults.CurrencyID;
        objItem.ExchangeRate = 1;
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;

}




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
            + "<td class='ItemID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
            + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
            + "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>"
            + "<td class='StoreID' val='" + "0" + "'>" + "<select id='store-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
            //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp; Calculate</span></button><span class='span_quantity'></span>" + "</td>"
            + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='CurrencyID hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='TransIDYard hide' val='" + "0" + "'>" + "0" + "</td>"

            + "<td class='ExchangeRate hide' val='" + "0" + "'>" + "0" + "</td>"

            + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
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

    RowsCounter++;
    
}
function AddNewExpensesRow()
{
    debugger;
    AppendRowtoTable("tblExpenses",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (RowsExpensesCounter + 1) + "' value='" + 0 + "'>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (RowsExpensesCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (RowsExpensesCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ExpensesID' val='" + "0" + "'>" + "<select id='expenses-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectexpenses'>" + $('#slhiddenExpenses').html() + "</select>" + "</td>"
            + "<td class='PartnerTypeID' val='" + "0" + "'>" + "<select onchange='FillPartners(" + (RowsExpensesCounter + 1) +")' id='slpartnertypes-" + (RowsExpensesCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectpartnertypes'>" + $('#slhiddenPartnerTypes').html() + "</select>" + "</td>"
            + "<td class='PartnerID' val='" + "0" + "'>" + "<select  id='PartnerID-" + (RowsExpensesCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectpartners'>" + "" + "</select>" + "</td>"
            + "<td class='Amount' val='" + "0" + "'>" + "<input onkeyup='GetExpensesTotal();'  type='number' class='inputamount input-sm  col-sm'>" + "</td>"
            + "<td class='ExchangeRate hide' val='" + "0" + "'>" + "0" + "</td>"
            + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
            + "</tr>"));







    $('#slpartnertypes-' + (RowsExpensesCounter + 1)).val("8");
    FillPartners((RowsExpensesCounter + 1));



    $("#tblExpenses select").each(function (i, sl) {
        if ($(sl).hasClass('IsAutoSelect') == false) {
            $(sl).css({ 'width': '100%' }).select2();
            $(sl).addClass('IsAutoSelect');
            $(sl).trigger("change");
            $("div[tabindex='-1']").removeAttr('tabindex');
        }

    });

    RowsExpensesCounter++;


}



function FillPartners(orderNo)
{

        FadePageCover(true);

        $.ajax({
            type: "GET",
            url: strServerURL + "/api/SC_Transactions/LoadPartners",
            data: { PartnerTypeID: $('#slpartnertypes-' + orderNo).val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Partner -->', '#PartnerID-' + orderNo + '', IsNull($('#PartnerID-' + orderNo).attr('tag'), ''));
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






function SC_Expenses_BindTableRows(data)
{
    $(data).each(function (i, item) {
        debugger;
        AppendRowtoTable("tblExpenses",
            ("<tr ID='" + item.ID + "' isdeleted='0'  counter='" + item.ID + "' value='" + item.ID + "'>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + item.ID + "'> <button id='btn-DeleteDetails' type='button' tag='0' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.ID) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ExpensesID' val='" + item.ExpensesID + "'>" + "<select id='expenses-" + item.ID + "' tag='" + item.ExpensesID + "' class='input-sm  col-sm selectexpenses'>" + $('#slhiddenExpenses').html() + "</select>" + "</td>"
                + "<td class='PartnerTypeID' val='" + item.PartnerTypeID + "'>" + "<select onchange='FillPartners(" + item.ID + ")' id='slpartnertypes-" + item.ID + "' tag='" + item.PartnerTypeID  + "' class='input-sm  col-sm selectpartnertypes'>" + $('#slhiddenPartnerTypes').html() + "</select>" + "</td>"
                + "<td class='PartnerID' val='" + item.PartnerID + "'>" + "<select  id='PartnerID-" + item.ID + "' tag='" + item.PartnerID + "' class='input-sm  col-sm selectpartners'>" + "" + "</select>" + "</td>"
                + "<td class='Amount' val='" + item.Amount + "'>" + "<input onkeyup='GetExpensesTotal();' id='txtAmount-" + item.ID+"' type='number' tag='" + item.Amount + "'   class='inputamount input-sm  col-sm'>" + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + "<input id='txtNotes-" + item.ID +"' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));


        $('#slpartnertypes-' + item.ID).val(item.PartnerTypeID);
        FillPartners((item.ID));

        $('#expenses-' + item.ID).val(item.ExpensesID);
        $('#txtAmount-' + item.ID).val(item.Amount);
        $('#txtNotes-' + item.ID).val(item.Notes);


        $("#tblExpenses select").each(function (i, sl) {
            if ($(sl).hasClass('IsAutoSelect') == false) {
                $(sl).css({ 'width': '100%' }).select2();
                $(sl).addClass('IsAutoSelect');
                $(sl).trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');
            }

        });
        RowsExpensesCounter = (item.ID + RowsExpensesCounter ) ;
        if (data.length - 1 == i) {

            FadePageCover(false)

        }

    });




}




function SetItemUnit(ItemSelect)
{
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
function InsertUpdateExpenses(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
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
                        //CallbackHeaderData();
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
        $(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').val($(tr).find('td.FlexiSerialID ').find('.selectFlexiSerial').attr('tag'));


    });

}

function GetItemQuantityInStore(Calculate_btn)
{
    FadePageCover(true);
    var tr = $(Calculate_btn).closest('tr');
    //  $(Calculate_btn).siblings('.span_quantity').attr('counter')
    var storeid = $(tr).find('td.StoreID ').find('.selectstore').val();
    var itemid = $(tr).find('td.ItemID ').find('.selectitem').val();

    if (storeid.trim() == "0" || itemid.trim() == "0") {

       // swal('Excuse me', 'select Item and Store', 'warning');

        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الصنف و المخزن' : 'select Item and Store'), 'warning');
        FadePageCover(false);
    }
    else
    {
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
            , pTruckerID: IsNull($("#slTruckerID").val(), "0")
            , pCardNo: IsNull($("#txtCartaNo").val(), "0")
            , pDivisionID: RollBackData.DivisionID
        }, true, null, '#hID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}
//#endregion details


//#region expensestaxes

var TaxesRowsCounter = 0;

function AddNewTaxesRow(callback)
{
    debugger;
    AppendRowtoTable("tblTaxes",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-success' style='font-size:15px;'> T </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TaxID' val='" + "0" + "'>" + "<select onchange='CalculateTotalTaxes();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
            + "<td class='TaxValue' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
            + "<td class='TaxAmount' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
            + "<td class='IsPercentage hide' val='true'>true</td>"
            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });


    if (typeof callback !== "undefined") {
        callback('#Tax-' + (TaxesRowsCounter + 1));
        TaxesRowsCounter++;
    }
    else {

        TaxesRowsCounter++;
    }


}


function FillTaxesData()
{
    if ($('#tblTaxes > tbody > tr').length > 0)
        FadePageCover(true)


    $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
        $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
        $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));

        if ($('#tblTaxes > tbody > tr').length - 1 == i) {

            // CalculateAll();
            FadePageCover(false)
        }
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function SC_ExpensesTaxes_BindTableRows(pItems) {
    TaxesRowsCounter = 0;
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblTaxes");
    $.each(pItems, function (i, item) {

        debugger;
        AppendRowtoTable("tblTaxes",
            ("<tr ID='" + item.ID + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.ID + "'>"
                + " <td class='btn-success' style='font-size:15px;'> T </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.ID) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateTotalTaxes();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
                + "<td class='IsPercentage hide' val='true'>true</td>"
                + "</tr>"));
        $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });
        TaxesRowsCounter++;


        if (pItems.length - 1 == i) {
            FillTaxesData();

        }
    });

    //setTimeout(function () {

    //    //  SL_HideShowEditBtns(_IsApproved);
    //}, 1000);

}





function DeleteTaxes(RowsNo) {

    if ($("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
        $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
        TaxesRowsCounter = TaxesRowsCounter - 1;
        //CalculateAll();

    }
    else {
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
                $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
                TaxesRowsCounter = TaxesRowsCounter - 1;
                //CalculateAll();
            });

    }

}

function GetTaxValueAndAmount(Tax) {
    var tr = null;
    if ($(Tax).is('tr'))
        tr = Tax;
    else
        tr = $(Tax).closest('tr');
    var TaxValue = 0;
    TaxValue = $(tr).find('td.TaxID  select').find('option:selected').attr('currentpercentage') * 1;

    $(tr).find('td.TaxValue').val(TaxValue);

    var ItemExpenses = IsNull($('#lblTotalExpenses').text(), "0.00") * 1.00;
    var Total = ItemExpenses;



    $(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(5));
    


    $(tr).find('td.TaxValue > input').val(TaxValue.toFixed(5));

    //if (!$(Tax).is('tr'))
    //CalculateTotalTaxes();



    return ($(tr).find('td.TaxAmount > input').val() * 1.00 * ($(tr).find('td.TaxID  select').find('option:selected').attr('isdebitaccount') == "false" ? -1 : 1));




}


function SetArrayOfTaxes() {
    var arrayOfItems = new Array();
    $("#tblTaxes>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.TaxID = $(tr).find('td.TaxID').find('.selectTaxes').val();
        objItem.TaxValue = $(tr).find('td.TaxValue').find('.inputtaxvalue').val();
        objItem.TaxAmount = $(tr).find('td.TaxAmount').find('.inputtaxamount').val();
        objItem.TransactionID = $('#hID').val();
        objItem.IsPercentage = true;
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


function GetExpensesTotal()
{
    setTimeout(function () {

        var _TotalAmount = 0.0000;
        $('#tblExpenses > tbody > tr').each(function (i, tr) {
            var tr_Total = 0.00;
            if (IsNull($(tr).find('td.Amount > input').val(), "0") != "0")
                tr_Total = ($(tr).find('td.Amount > input').val() * 1.00000).toFixed(5);
            _TotalAmount = (_TotalAmount + tr_Total * 1);
            if ($('#tblExpenses > tbody > tr').length - 1 == (i)) {
                $('#lblTotalExpenses').text(_TotalAmount.toFixed(5));
                CalculateTotalTaxes();
            }
        });

    }, 200);
}

function CalculateTotalTaxes()
{

    debugger
    _TotalTaxes = 0.00000;
    if ($('#tblTaxes > tbody > tr').length == 0)
        $('#lblTotalTaxes').text('0.00000');
    else {
        $('#tblTaxes > tbody > tr').each(function (i, tr) {
            var tr_Total = 0.00;

            tr_Total = (GetTaxValueAndAmount(tr) * 1.00000).toFixed(5); 

            _TotalTaxes = (_TotalTaxes + tr_Total * 1);
            if ($('#tblTaxes > tbody > tr').length - 1 == (i)) {
                $('#lblTotalTaxes').text(_TotalTaxes.toFixed(5));
            }
        });
    }


}

//#endregion expensestaxes

function GetSubAccount(pSubAccountID) {
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    //Fill_SelectInput_WithDependedID("api/Services/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
    debugger;

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountID").val()
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountID", pData[0], null);
            //      if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
            //Start Auto Filter
            //$("#" + pSlName).trigger("change");
            //End Auto Filter
            //       }
            FadePageCover(false);
        }
        , null);

}
