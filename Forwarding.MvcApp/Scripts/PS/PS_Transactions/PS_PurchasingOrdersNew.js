

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00000;
var _TotalExpenses = 0.00000;
var _TotalTaxes = 0.00000;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
var printQuotationSummaryText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print Quotations Summary" + "</span>";

//**************************************
var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val() 
    CheckIfAllLoading();
});

function PrintPurchasingRequest(InvID) {

    FadePageCover(true)


    if (InvID == 0)
        InvID = $('#hID').val();


    var arr_Keys = new Array();
    var arr_Vlaues = new Array();
    arr_Keys.push("ID");

    arr_Vlaues.push(InvID);
 

    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Vlaues: arr_Vlaues
        , pTitle: "PurchasingOrders"
        , pReportName: "RepPS_PurchasingOrdersNew"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
    FadePageCover(false)

}

function CheckIfAllLoading() {
    if (typeof $('#slDepartments option') === "undefined" || $('#slDepartments option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

function IntializePage() {
    debugger;
    var WhereClause = " Where 1=1";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingOrdersNew/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingOrdersNew_BindTableRows(pTabelRows); });
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingOrdersNew/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
            //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- ALL Supplier -->', '#slSupplier_Filter', '');
            ////-------
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Supplier -->', '#slSupplierID', '');
            //-------
            //------
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[5], 'ID', 'Name', '<----------- ITEMS ---------->', '#hidden_slItems', '', 'Price,ItemUnits');
            //-------
            //-------
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            //*******
            $('#txtRequestDate').val(getTodaysDateInddMMyyyyFormat());

            $("#txtRequestDate").datepicker().on('changeDate'
                , function () {
                    $(this).datepicker('hide');
                   // RecalculateExchangeRate();

                });
            $("#txtRequestDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });
            
            Fill_SelectInputAfterLoadData(d[11], 'ID', 'Name', '<-- SELECT Branch -->', '#slDepartments', '');
            Fill_SelectInputAfterLoadData(d[12], 'ID', 'Name', '<-- SELECT Employee -->', '#slEmployee', '');
            Fill_SelectInputAfterLoadData_WithAttr(d[1], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');






            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}

//#region Public
function PS_HideShowEditBtns(IsApproved, HasTransactions)
{
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;

    

    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0")
    { // is [ New ]
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
    }
    else // is [ Update ]
    {

        if ($("#hf_CanEdit").val() != 1 || $('#htxtIsApproved').val() == 'true' ) {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', true);

        }
        else {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', false);

        }
    }

    $('.selectunit').prop('disabled', true);
    //$('.inputtaxvalue').prop('disabled', true);
   // $('.inputtaxamount ').prop('disabled', true);
    // $('.inputtaxamount ').prop('disabled', true);


}

function RecalculateExchangeRate()
{
    var currencyid = $('#slCurrencyID').val();
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0")

    }


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingOrdersNew/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtRequestDate').val()), pID : $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d)
        {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
           // Fill_SelectInputAfterLoadData(d[1] , 'ID' , 'Code' , 'Select Good Receipt Note' , '#slTransaction', $('#hID').val());
            CalculateAll();
            FadePageCover(false);
        },
        error: function (jqXHR, exception)
        {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}

function IntializeData(callback) {
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    _IsApproved = false;
    //console.log("hid " + );
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0");
    }


    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');

    $('#txtRequestDate').val(getTodaysDateInddMMyyyyFormat());

    $('#txtRequestNo').val("Auto");
    $('#slSupplierID').val("0");

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_PurchasingOrdersNew/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            FadePageCover(false);


            if (typeof callback !== "undefined") {
                callback();

            }


        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}
function ClearApprovedIsHasTransactions() {
    //_IsApproved = false;
    //_HasTransactions = false;
    $('#htxtIsApproved').val('false');
    $('#htxtHasTransactions').val('false');
    PS_HideShowEditBtns(false);
}
          
function PS_PurchasingOrdersNew_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PS_PurchasingOrdersNewModal", null);
    $('#hID').val("0");
    $("#btnSave").attr("onclick", "PS_PurchasingOrdersNew_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_PurchasingOrdersNew_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtRequestNo').val("Auto");
    $('#txtRequestNoManual').prop("disabled" , false);
   //('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
   //('#slPaymentMethodID').val("50");
    //_IsApproved = false;
    //_HasTransactions = false;
    _JVID = 0;


    //var IsStartManual = IsNull($('#hReadySlOptions option[value="2030"]').attr("OptionValue"), "false");
    //if (IsStartManual == "true")
    //    $("#cbIsFromTrans").prop("checked", false);
    //else
    //    $("#cbIsFromTrans").prop("checked", true);


    IntializeData(function () { /*PS_HideShowEditBtns(false);*/ });
   
}
function LoadInvoiceDetails()
{
    debugger;

    LoadAll("/api/PS_PurchasingOrdersNew/LoadDetails", "where RequestID = " + $('#hID').val(), function (pTabelRows)
        {
            PS_PurchasingOrdersNewDetails_BindTableRows(pTabelRows[0]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved);
                }, 300);

            }, 1500);

        });
    
   
}


function PrintRequest(InvID) {

    FadePageCover(true)


}

//#endregion Public

//#region Header
function PS_PurchasingOrdersNew_BindTableRows(pPS_PurchasingOrdersNew) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_PurchasingOrdersNew");
    $.each(pPS_PurchasingOrdersNew, function (i, item) {
        debugger;
        var disable = "";
        if (item.IsApproved == true) {
            disable = "disabled = disabled";
        }




        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_PurchasingOrdersNew",
            ("<tr ID='" + item.ID + "' ondblclick='PS_PurchasingOrdersNew_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); '>"
                + "<td class='ID'> <input " + disable + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='RequestNo' val='" + item.RequestNo + "'>" + item.RequestNo + "</td>"
                + "<td class='RequestDate' val='" + GetDateFromServer(item.RequestDate) + "'>" + GetDateFromServer(item.RequestDate) + "</td>"
                + "<td class='CustodyID hide' val='" + item.CustodyID + "'>" + item.CustodyID + "</td>"
                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.Name + "</td>"

                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"

                + "<td class='CreatedUserID hide' val='"  + item.CreatedUserID + "'>" + item.CreatedUserID + "</td>"
                + "<td class='EditedByUserID hide' val='" + item.EditedByUserID + "'>" + item.EditedByUserID + "</td>"
                + "<td class='ApprovedUserID hide' val='" + item.ApprovedUserID + "'>" + item.ApprovedUserID + "</td>"
                + "<td class='CreatedDate hide' val='" + GetDateFromServer(item.CreatedDate) + "'>" + GetDateFromServer(item.CreatedDate) + "</td>"
                + "<td class='EditedDate hide' val='"     + GetDateFromServer(item.EditedDate) + "'>" + GetDateFromServer(item.EditedDate) + "</td>"
                + "<td class='ApprovedDate hide' val='"   + GetDateFromServer(item.ApprovedDate) + "'>" + GetDateFromServer(item.ApprovedDate) + "</td>"

                + "<td class='IsApproved hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"


                + "<td class='hPS_PurchasingOrdersNew hide'><a href='#PS_PurchasingOrdersNewModal' data-toggle='modal' onclick='PS_PurchasingOrdersNew_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"

                
                + "<td class='pPS_PurchasingOrdersNew'><a href='#' onclick='PrintPurchasingRequest(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_PurchasingOrdersNew", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_PurchasingOrdersNew>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function PS_PurchasingOrdersNew_EditByDblClick(pID, pIsApproved, pHasTransactions)
{
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#PS_PurchasingOrdersNewModal").modal("show");

   
    //-----------------------------------------------------------------------------------------
    if (pIsApproved == true || pIsApproved == "true")
    {
        $('#htxtIsApproved').val("true");
        console.log("$('#htxtIsApproved').val('true');")
    }
    else
    {
        $('#htxtIsApproved').val("false");
        console.log("$('#htxtIsApproved').val('false');")
    }
    PS_PurchasingOrdersNew_FillControls(pID);
}

function PS_PurchasingOrdersNew_LoadingWithPaging()
{
    debugger;
    var WhereClause = " Where 1=1 ";

    if ($('#txtRequestNo_Filter').val().trim() != "") {
        WhereClause += " AND RequestNo = '" + $('#txtRequestNo_Filter').val() + "'";
    }
    //if ($('#txtSupplierRequestNo_Filter').val().trim() != "") {
    //    WhereClause += " AND SupplierRequestNo LIKE '%" + $('#txtSupplierRequestNo_Filter').val() + "%'";
    //}
    //if ($('#txtTotalPrice_Filter').val().trim() != "") {
    //    WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    //}
    //if ($('#slSupplier_Filter').val().trim() != "0") {
    //    WhereClause += " AND SupplierID = " + $('#slSuppliers_Filter').val() + "";
    //}
    //if ($('#slCurrency_Filter').val().trim() != "0") {
    //    WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    //}
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , RequestDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingOrdersNew/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingOrdersNew_BindTableRows(pTabelRows); PS_PurchasingOrdersNew_ClearAllControls(); });
    HighlightText("#tblPS_PurchasingOrdersNew>tbody>tr", $("#txt-Search").val().trim());
}




function PS_PurchasingOrdersNew_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPS_PurchasingOrdersNew') != "")
    {
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
                DeleteListFunction("/api/PS_PurchasingOrdersNew/Delete", { "pPS_PurchasingOrdersNewIDs": GetAllSelectedIDsAsString('tblPS_PurchasingOrdersNew') }, function () { PS_PurchasingOrdersNew_LoadingWithPaging(); });
            });
    }
    //DeleteListFunction("/api/PS_PurchasingOrdersNew/Delete", { "pPS_PurchasingOrdersNewIDs": GetAllSelectedIDsAsString('tblPS_PurchasingOrdersNew') }, function () { PS_PurchasingOrdersNew_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PS_PurchasingOrdersNew_FillControls(pID) {
    debugger;
    ClearAll("#PS_PurchasingOrdersNewModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);


    IntializeData(function () {
        setTimeout(function () {
            var tr = $("#tblPS_PurchasingOrdersNew > tbody > tr[ID='" + pID + "']");
            FadePageCover(true)
        //$("#txtEntitlementDays").val($(tr).find("td.EntitlementDays").attr('val'));
        //
        //$("#txtSupplierRequestNo").val($(tr).find("td.SupplierRequestNo").attr('val'));
        //$("#txtRequestDate").val($(tr).find("td.RequestDate").attr('val'));
         $("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
        $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
        //$("#slPaymentMethodID").val($(tr).find("td.PaymentMethodID").attr('val'));
            $("#slCostCenter_ID").val($(tr).find("td.CostCenter_ID").attr('val'));
            

            $("#txtRequestNo").val($(tr).find("td.RequestNo").attr('val'));
            $("#slDepartments").val($(tr).find("td.DepartmentID").attr('val'));
            $("#txtRequestNoManual").val($(tr).find("td.RequestNoManual").attr('val'));
            $("#slEmployee").val($(tr).find("td.CustodyID").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));


            window.CreatedUserID = $(tr).find("td.CreatedUserID").attr('val');
            window.EditedByUserID = $(tr).find("td.EditedByUserID").attr('val');
            window.ApprovedUserID = $(tr).find("td.ApprovedUserID").attr('val');
            window.CreatedDate = $(tr).find("td.CreatedDate").attr('val');
            window.EditedDate = $(tr).find("td.EditedDate").attr('val');
            window.ApprovedDate = $(tr).find("td.ApprovedDate").attr('val');
            


        $("#btnSave").attr("onclick", "PS_PurchasingOrdersNew_Save(false);");
            $("#btnSaveandNew").attr("onclick", "PS_PurchasingOrdersNew_Save(true);");
            FadePageCover(false)
        }, 1000);
        setTimeout(function () {
            LoadInvoiceDetails(false);
        }, 1000);

    });
  
}




function GetInsertUpdateParameters()
{
    var RequestNo = (($('#txtRequestNo').val() == "" || $('#txtRequestNo').val() == "Auto") ? "0" : $('#txtRequestNo').val());
    var RequestNoManual = (($('#txtRequestNoManual').val() == "" || $('#txtRequestNoManual').val() == "Auto") ? "0" : $('#txtRequestNoManual').val());
    var RequestDate = ConvertDateFormat($('#txtRequestDate').val());
    var Notes = ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val());
    var DepartmentID = IsNull($('#slDepartments').val(), "0");
    var Employee = IsNull($('#slEmployee').val(), "0");
    var Currency = IsNull($('#slCurrencyID').val(), "0");
    var SupplierID = IsNull($('#slSupplierID').val(), "0");


    var IsApproved = _IsApproved;

    var ID = IsNull($('#hID').val(), "0");




    return {
        "pID": ID,
        "pRequestNo": RequestNo,
        "pSupplierID": SupplierID,
        "pRequestDate": RequestDate,
        "pNotes": Notes,
        "pCurrencyID": Currency,
        "pCustodyID": Employee,
        "pDepartmentID": DepartmentID,
        "pIsApproved": $('#htxtIsApproved').val(),
        "pRequestNoManual": RequestNoManual,
        "pCreatedUserID": (IsNull($('#hID').val() , "0") == "0" ? "0" :  window.CreatedUserID) ,
        "pEditedByUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" :window.EditedByUserID ),
        "pApprovedUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" : window.ApprovedUserID),
        "pCreatedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat( window.CreatedDate)),
        "pEditedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.EditedDate) ),
         "pApprovedDate" : (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.ApprovedDate) )
    };
}

function PS_PurchasingOrdersNew_Save(pSaveandAddNew) {
    IsInsert = true;
    var _Suceess = true;

    FadePageCover(true)
    
    if (IsNull($('#slEmployee').val(), "0") == "0" || IsNull($('#slDepartments').val(), "0") == "0" ) {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me') , (lang == "ar" ? 'من فضلك اختر القسم او الفرع': 'You must Select Departments or Employee')  , 'warning');
        FadePageCover(false)
        _Suceess = false;
    }
    if (IsNull($('#slSupplierID').val(), "0") == "0" || IsNull($('#slSupplierID').val(), "0") == "") {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me'), (lang == "ar" ? 'من فضلك اختر  المورد' : 'You must Select Supplier'), 'warning');
        FadePageCover(false)
        _Suceess = false;
    }



    if ($('#tblItems > tbody > tr').length == 0)//&& $('#tbExpenses > tbody > tr').length == 0)
    {
       // swal('Excuse me', 'You must insert Items or Services', 'warning');
        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب ادخال الاصناف' : 'You must insert Items'), 'warning');
        FadePageCover(false)
        _Suceess = false;
    }
    else {
        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var UnitPrice = $(tr).find('td.UnitPrice').find('.input_UnitPrice').val();

                var ItemUnitID = $(tr).find('td.UnitID').find('.selectunit').val();

                if ((itemid.trim() == "" || itemid.trim() == "0" || itemid == null) && $(tr).attr('tag') == "item") {
                   // swal('Excuse me', 'Fill  Items', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill  Items'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((ItemUnitID == null || ItemUnitID.trim() == "" || ItemUnitID.trim() == "0") && $(tr).attr('tag') == "item") {
                   // swal('Excuse me', 'Fill  Items Units', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الوحدات' : 'Fill  Items Units'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
         
                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
                   // swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل الكميات' : 'Fill All Items Quantity'), 'warning');
                  //  Services
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (UnitPrice.trim() == "" || UnitPrice.trim() == "0" || UnitPrice == null) {
                    // swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل السعر' : 'Fill All Items UnitPrice'), 'warning');
                    //  Services
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }


            });
        }


    }

   // console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        FadePageCover(true)
        setTimeout(function () {
            debugger
            FadePageCover(true)
            PostInsertUpdateFunction("form", "/api/PS_PurchasingOrdersNew/Save", GetInsertUpdateParameters(), pSaveandAddNew, null,

                function (res) {
                    // if (data[0] != 0) { 
                    // swal($('#hID').val());
                    $('#hID').val(res[1])
                    var ListOfListOfObject = [];
                    ListOfListOfObject.push(SetArrayOfItems());

                    InsertUpdateListOfObject("/api/PS_PurchasingOrdersNew/InsertItems",
                        ListOfListOfObject
                        , pSaveandAddNew, "PS_PurchasingOrdersNewModal", function (data) {
                            FadePageCover(true)
                            setTimeout(function () {
                                PrintPurchasingRequest(res[1]);
                                PS_PurchasingOrdersNew_LoadingWithPaging();
                            }, 300);

                        });
                });


        }, 30);
    }
}

function InsertUpdateFunctionAndReturnID_Special(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, phID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: JSON.stringify( pParametersWithValues),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data != 0) {
                        $(phID).val(data[0]);
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                //  $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else //data[0] = false
                        //swal(strSorry, strUniqueFailInsertUpdateMessage, "warning");
                        swal(strSorry, data[1]);
                }
                else {
                    if (data != 0) {
                        $(phID).val(data);
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                // $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, "the date must >= Good Receipt Note Date    [OR]    [Is Approved]");
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
function PS_PurchasingOrdersNew_Delete() {
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
            InsertUpdateFunction("form", "/api/PS_PurchasingOrdersNew/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "PS_PurchasingOrdersNewModal", function (data) {
                    if (data[1].trim() == '') {
                        PS_PurchasingOrdersNew_LoadingWithPaging();
                        //IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}





//#endregion Header


//#region Details


var ItemsRowsCounter = 0;

function AddNewItemsRow(type) {
    if (type == 1) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + "0" + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' class='input_UnitPrice input-sm  col-sm'>" + "</td>"

                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='IsPurshase' style='width:1%;'><input id='cbIsPurshase" + (ItemsRowsCounter + 1) + "' type='checkbox' value=''></td>"

                + "</tr>"));



    }
    else {
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' class='input_UnitPrice input-sm  col-sm'>" + "</td>"

                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "<td class='IsPurshase' style='width:1%;'><input id='cbIsPurshase" + (ItemsRowsCounter + 1) + "' type='checkbox' value=''></td>"

                + "</tr>"));

    }
    //$('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 5 });
    $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
    ItemsRowsCounter++;
   // $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);');
    //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');




}

function GetItemPrice(ItemSelect) {
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        $(tr).find('td.UnitPrice input[type="text"]').val(($(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1 /*/ ExchangeRate * 1*/));
    }
}
function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
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
}
function CopyStores() {
    if ($('#tblItems > tbody > tr[tag="item"]').length > 0) {


        $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
            //selectstore
            $(tr).find('td.StoreID ').find('.selectstore').val($('#slStores').val());

        });
    }
}

function CopyCostCenter() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectcostcenter').val($('#slCostCenter_ID').val());
    }






}


function PS_PurchasingOrdersNewDetails_DeleteList()
{
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
                DeleteListFunction("/api/PS_PurchasingOrdersNew/Delete", { "pPS_PurchasingOrdersNewDetailsIDs": GetAllSelectedIDsAsString('tblPS_PurchasingOrdersNewDetails') }, function () { PS_PurchasingOrdersNewDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
       // CalculateAll();
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
               // CalculateAll();
            });
    }
    //if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
    //    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //    ItemsRowsCounter = ItemsRowsCounter - 1;


    //}
    //else {
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //        //callback function in case of success
    //        function () {
    //            $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //            ItemsRowsCounter = ItemsRowsCounter - 1;
    //            CalculateAll();
    //        });

    //}

}



function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData() {


   if( $('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        $(tr).find('td.UnitPrice').find('.input_UnitPrice').val($(tr).find('td.UnitPrice ').find('.input_UnitPrice').attr('tag'));

        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));

        if ($('#tblItems > tbody > tr').length - 1 == i) {

           // CalculateAll();
            FadePageCover(false)
        }

    });
   

    }, 100);

}
function PS_PurchasingOrdersNewDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)  )
        {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID)  + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID)+ "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + (typeof item.UnitPrice === 'undefined' ? item.UnitPrice : item.UnitPrice) + "'>" + "<input tag='" + (typeof item.UnitPrice === 'undefined' ? item.UnitPrice : item.UnitPrice) + "'   type='text' class='input_UnitPrice input-sm  col-sm'>" + "</td>"
                    + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='IsPurshase'><input id='cbIsPurshase" + (ItemsRowsCounter + 1) + "' " + (item.IsPurshase == true ? 'checked' : '') + " type='checkbox' value='" + item.IsPurshase + "'></td>"

                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + item.D_ID + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.D_ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID) + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID) + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + (typeof item.UnitPrice === 'undefined' ? item.UnitPrice : item.UnitPrice) + "'>" + "<input tag='" + (typeof item.UnitPrice === 'undefined' ? item.UnitPrice : item.UnitPrice) + "'   type='text' class='input_UnitPrice input-sm  col-sm'>" + "</td>"

                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.D_Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='IsPurshase'><input id='cbIsPurshase" + (ItemsRowsCounter + 1) + "' " + (item.IsPurshase == true ? 'checked' : '') + " type='checkbox' value='" + item.IsPurshase + "'></td>"

                    + "</tr>"));
        }

        $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;

        //---------------------------------------------------------------------------------

        if (JSON.parse(pItems).length - 1 == i) {
            FillItemsData();
        }



    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {
      
    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}






function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/PS_PurchasingOrdersNew/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_PurchasingOrdersNew/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_PurchasingOrdersNew_BindTableRows(pTabelRows); PS_PurchasingOrdersNew_ClearAllControls(); });
    // HighlightText("#tblPS_PurchasingOrdersNew>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";



function SetArrayOfItems() {
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
        objItem.RequestID = $('#hID').val();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = IsNull($(tr).find('td.Qty').find('.input_quantity').val(), "1");
        objItem.UnitPrice = IsNull($(tr).find('td.UnitPrice').find('.input_UnitPrice').val(), "1");

        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val();
        objItem.IsPurshase = $("#cbIsPurshase" + $(tr).attr('counter')).prop("checked");

        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}






var all_has_store = false;



//#endregion Details
























// calling this function for update





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
                        //try {
                        //    if (insert == true) {
                        //        $('#hID').val(data[2]);
                        //        $("#btnSave").attr("onclick", "PS_PurchasingOrdersNew_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "PS_PurchasingOrdersNew_Save(true);");

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


function InsertUpdateFunction3(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
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
                      //  swal(strSorry, data[1]);

                      //  CallbackHeaderData();


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


