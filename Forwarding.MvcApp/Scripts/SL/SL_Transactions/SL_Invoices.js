

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00000;
var _TotalExpenses = 0.00000;
var _TotalTaxes = 0.00000;
var _JVID = 0;
window.PreventEvents = false;
var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
var printForClientControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("PrintForClient") + "</span>";
//**************************************
window.ItemSearchIndex = 0;

$(document).ready(function ()
{
    CheckIfAllLoading(); 

    // slClients_Filter
   // $('#slClients_Filter').trigger("change");
    $('#slClients_Filter').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    $('#slClientID').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
    $('#slPaymentMethodID').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');

    $('#slTypeID').css({ 'width': '100%' }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');


    $('input,select').keyup(function (e)
    {
        if (e.keyCode == 27)
        {
            setTimeout(function () {
                SL_Invoices_Save(false);
            }, 300);

        }

    });
    $('#txItemNameSrch').keyup(function (e) {
        if (e.keyCode == 40) {
            SearchFromItemList();
           // $('#tblItemsFromSearch tbody').find('tr').trigger('dblclick');
           // ItemsFromSearch_LoadingWithPaging();
        }
        else if (e.keyCode == 13) {
            // SearchFromItemList();
           // $('#tblItemsFromSearch tbody').find('tr').trigger('dblclick');
            // ItemsFromSearch_LoadingWithPaging();
            window.ItemSearchIndex = 0;
            $('.btnitemsearch').eq(0).trigger('focus');

          //  if ($('#tblItemsFromSearch tbody').find('tr').length > 0)
          //  $('#tblItemsFromSearch tbody').find('tr').eq(0).trigger('dblclick');
        }
    });
    $('#txtItemCodeSrch').keyup(function (e) {
        if (e.keyCode == 40) {
            SearchFromItemList();
            // ItemsFromSearch_LoadingWithPaging();
        }
        else if (e.keyCode == 13) {
            // SearchFromItemList();
            // $('#tblItemsFromSearch tbody').find('tr').trigger('dblclick');
            // ItemsFromSearch_LoadingWithPaging();
            //if ($('#tblItemsFromSearch tbody').find('tr').length > 0)
            //    $('#tblItemsFromSearch tbody').find('tr').eq(0).trigger('dblclick');
            window.ItemSearchIndex = 0;
            $('.btnitemsearch').eq(0).trigger('focus');
        }
    });


    document.body.onkeyup = function (e) {
        if (e.keyCode == 40) {

           // e.preventDefault();
            if ($('#SL_InvoicesModal').hasClass('in') 
                && !($('#slClientID').next('.select2-container').hasClass('select2-container--open'))
                && !($('#slPaymentMethodID').next('.select2-container').hasClass('select2-container--open'))
                && !($('#slTypeID').next('.select2-container').hasClass('select2-container--open'))
                && ($('#tblItems tbody').find('.select2-container.select2-container--open').length == 0)
            ) /*الموديل مفتوح*/
            {
                if ($('#div-ItemsFromSearchModel').hasClass('in')) {

                    
                }
                else
                {

                    setTimeout(function () {
                        AddNewItemsRow(1);
                    }, 300);
                }

                
            }

            
        }



        if (e.keyCode == 27) {

            // e.preventDefault();
            if ($('#SL_InvoicesModal').hasClass('in') )
            /*الموديل مفتوح*/
            {
                e.preventDefault();
                
                setTimeout(function () {
                    SL_Invoices_Save(false);
                }, 300);

            }


        }



    };


    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
        else
            return;
    });



    

    //$(document).off('blur').on('blur', '.input_unitprice', function (e)
    //{


    //});

    $(document).off('keyup').on('keyup', ".btnitemsearch", function (e) {
       // $('.btnitemsearch').on("keyup", function (e) {
            if (e.keyCode == 13) {
                $(this).trigger('click');
            }
            else if (e.keyCode == 40) {


                //setTimeout(function () {

                    console.log('Event INDEX : ' + window.ItemSearchIndex);
                    $('.btnitemsearch').eq(window.ItemSearchIndex).trigger('focus');

                    window.ItemSearchIndex = window.ItemSearchIndex + 1;
               // }, 300);



            }
            else if (e.keyCode == 38) {



              //  setTimeout(function () {
                    console.log('Event INDEX : ' + window.ItemSearchIndex);
                    $('.btnitemsearch').eq(window.ItemSearchIndex).trigger('focus');
                    if (window.ItemSearchIndex > 0)
                        window.ItemSearchIndex = window.ItemSearchIndex - 1;
              //  }, 300);




            }

       // });
    });

});



function ChooseItem() {



}

function CheckAllAsGroup(cb) {

    if ($(cb).is(':checked')) {
        $('.PrintedAsGroupName input').each(function (i, ele) {
            $(ele).prop('checked', true);
            SetPrintedItemNameAsGroupName(ele);
        });

    }
    else {

        $('.PrintedAsGroupName input').each(function (i, ele) {
            $(ele).prop('checked', false);
            SetPrintedItemNameAsGroupName(ele);
        });
    }
}




//-------
function IntializePage()
{
    debugger
    if ($('#hReadySlOptions option[value="2037"]').attr("OptionValue") == "true") {
        $('#isErp').show();
    }
    else {
        $('#isErp').hide();

    }


    //if ($('#hReadySlOptions option[value="2122"]').attr("OptionValue") == "true") /* show hide items taxes */
    //{
    //    $('.itemtaxes').removeClass('hide');
    //}
    //else {
    //    $('.itemtaxes').addClass('hide');

    //}
    var WhereClause = "Where IsNull(IsDeleted , 0) <> 1";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) {
        SL_Invoices_BindTableRows(pTabelRows);
        ItemsRowsCounter = 0;
        ExpensesRowsCounter = 0;
        TaxesRowsCounter = 0;
        _IsApproved = false;
        if ($('#hID') == null || $('#hID').val() == "") {
            $('#hID').val("0");
        }
        $('#btnPrint2').addClass('hide');
        $('#btn-Delete2').addClass('hide');
        $('#tblItems > tbody').html('');
        $('#tblExpenses > tbody').html('');
        $('#tblTaxes > tbody').html('');
        $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
        //$("#hID").val("");

        $('#txtInvoiceNo').val("Auto");
        $('#slClientID').val("0");
        $('#txtDiscount').val("0");
        $('#slDiscountType').val('10');
        $('#cbDiscountBeforeTax').prop('checked', false);
        $('#lblDiscountValue').text("0.00000");
        $('#lblDiscountPercentage').text("0.00000");
        $('#lblNetPriceValue').text("0.00000");
        $('#lblPriceValue').text("0.00000");
        $('#lblPrintedPriceValue').text("0.00000");
        $('#lblLocalPriceValue').text("0.00000");
        $('#lblTotalItems').text("0.00000");
        $('#lblTotalExpenses').text("0.00000");
        $('#lblTotalTaxes').text("0.00000");
        $('#txtDiscount').inputmask('decimal', { digits: 5 });
        $('#txtDiscount').val('0');
        $('#slTypeID').val('0');
        $('#slBranches').val(pLoggedUser.BranchID);

        $('#SL_InvoicesModal').scrollTop(0);
    });
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SL_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- ALL CUSTOMERS -->', '#slClients_Filter', '');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'Name', '<-- SELECT CUSTOMER -->', '#slClientID', '', 'LockingUserID,CostCenterID');
            Fill_SelectInputAfterLoadData(d[1], 'ID', 'Code', '<-- ALL CURRENCIES -->', '#slCurrency_Filter', '');
            Fill_SelectInputAfterLoadData_WithAttr(d[1], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            Fill_SelectInputAfterLoadData_WithAttr(d[2], 'ID', 'Name', null, '#slPaymentMethodID', '', 'Name');
            Fill_SelectInputAfterLoadData(d[3], 'ID', 'StoreName', '<-- SELECT STORE -->', '#slStores', '');
            Fill_SelectInputAfterLoadData(d[4], 'ID', 'CostCenterName', '<-- SELECT CostCenter  -->', '#slCostCenter_ID', '');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[5], 'ID', 'Code,Name', " - ", '<----------- ITEMS ---------->', '#hidden_slItems', '', 'LastSalePrice,Price,ItemUnits,ItemTypeID,ItemGroupName,ItemTypeName,ParentGroupID,ItemStoresQty');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[11], 'ID', 'Code,Name', " - ", '<----------- ITEMS ---------->', '#hidden_slItemsTax', '', 'LastSalePrice,Price,ItemTypeID,ItemUnits,ItemGroupName,ItemTypeName,ParentGroupID,ItemStoresQty');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[12], 'ID', 'Code,Name', " - ", '<----------- ITEMS ---------->', '#hidden_slItemsnoTax', '', 'LastSalePrice,Price,ItemTypeID,ItemUnits,ItemGroupName,ItemTypeName,ParentGroupID,ItemStoresQty');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[6], 'ID', 'Name', '<-- SELECT TAXES  -->', '#hidden_slTaxes', '', 'CurrentPercentage,IsDebitAccount');
            Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<---------- SERVICES -------->', '#hidden_slServices', '');
            Fill_SelectInputAfterLoadData(d[8], 'ID', 'Name', '<-- SELECT EXPENSES  -->', '#hidden_slExpenses', '');
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            Fill_SelectInputAfterLoadData(d[13], 'ID', 'Name', '<--  Branches - الفرع -->', '#slBranches', '');

            Fill_SelectInputAfterLoadData(d[14], 'ID', 'BarCode', '<-- SELECT BarCode  -->', '#hidden_BarCode', '');

            window.Items = JSON.parse(d[5]);

        
            Fill_SelectInputAfterLoadData(d[15], 'ID', 'Name', '<-- Sales Man -  المندوب -->', '#slSalesMan', '');
            Fill_SelectInputAfterLoadData(d[16], 'ID', 'Name', '<-- Region - المنطقة -->', '#slRegions', '');

           
            $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
            Fill_SelectInputAfterLoadData_WithMultiAttrWithoutOptionText(d[10], 'ID', 'xxxxxxxxxx', '#hidden_slPriceListItems', '', 'PriceListID,ItemID,Price');
            $("#txtInvoiceDate").datepicker().on('changeDate'
                , function () {
                    $(this).datepicker('hide');
                    RecalculateExchangeRate();

                    
                });
            $("#txtInvoiceDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });

            setTimeout(function () {

                $('#slBranches').val(pLoggedUser.BranchID);
            }, 300);
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}


function CheckIfAllLoading() {
    if (typeof $('#slClientID option') === "undefined" || $('#slClientID option').length == 0) {
        FadePageCover(true)
        setTimeout(function ()
        {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

function getSC_TransactionsByClientID() {
    debugger

    if ($("#cbIsFromTrans").is(":checked") && pDefaults.UnEditableCompanyName == 'AGR' && ($('#slClientID').val() == "" || $('#slClientID').val() == "0" || $('#slClientID').val() == null)) {
        swal('Excuse me', 'You must Select Customer', 'warning');
        $("#cbIsFromTrans").prop("checked", false);
        return;
    }
    if ($("#cbIsFromTrans").is(":checked") && pDefaults.UnEditableCompanyName == 'AGR' && $('#slClientID').val() != "" && $('#slClientID').val() != "0" && $('#slClientID').val() != null) {
        $.ajax({
            type: "GET",
            url: strServerURL + "/api/SL_Invoices/GetSC_TransactionDetailsByClientID",
            data: { pClientID: $('#slClientID').val(), pID: $('#hID').val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                FillDivWithCheckboxes("divCbTransaction", d[0], "nameTransaction", 7, null);
                FadePageCover(false);

                $('#divCbTransaction')
                    .css('pointer-events', 'auto')
                    .css('opacity', '1');

            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }
    
}

function FillSC_TransactionsByClientID(pID,pClientID) {
    debugger

    if ($("#cbIsFromTrans").is(":checked") && pDefaults.UnEditableCompanyName == 'AGR' && pClientID != 0 && pClientID != "" && pClientID !=null) {
        $.ajax({
            type: "GET",
            url: strServerURL + "/api/SL_Invoices/GetSC_TransactionDetailsByClientID",
            data: { pClientID: $('#slClientID').val(), pID: pID },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                FillDivWithCheckboxes("divCbTransaction", d[0], "nameTransaction", 7,

                    function () {
                        debugger;
                        $('input[name="' + 'nameTransaction' + '"]').each(function () {
                            $(this).attr('checked', true);
                           
                          
                        });
                        $('#divCbTransaction')
                            .css('pointer-events', 'none')
                            .css('opacity', '0.6');
                    }
                );
                FadePageCover(false);


            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });
    }

}
//#region Public
function SL_HideShowEditBtns(IsApproved , HasTransactions , IsLoadSavedData)
{
    debugger
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;

    if (IsNull($("#hID").val(), "0") != "0" && ($("#hf_CanEdit").val() != 1 || $('#htxtIsApproved').val() == 'true' || $('#htxtHasTransactions').val() == 'true'))
    {
        $('.Edit-btn').addClass('hide');
        $('.Edit-input').prop('disabled', true);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', true);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', true);
        $('#slTypeID').prop('disabled', true);

    }
    else {
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', false);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', false);
    }

    if ($("#cbIsFromTrans").is(":checked")) {
        if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") {
            // $('#txtInvoiceDate').val(GetDateFromServer($('#slTransaction').find('option:selected').attr('TransactionDate')));
            $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
        }
        $("#tblItems").find("input,button,textarea,select").not('.input_unitprice,.inputprinted_itemname,.inputprinted_unit,.inputprinted_qty,.inputprinted_price').prop('disabled', true);
        $(".C_IsNotFromTrans").addClass("hide");


        if (pDefaults.UnEditableCompanyName == 'AGR') {
            $(".C_IsFromTransMulti").removeClass("hide");
            $(".C_IsFromTrans").addClass("hide");


        }
        else {
            $(".C_IsFromTrans").removeClass("hide");
            $(".C_IsFromTransMulti").addClass("hide");

            $('#slClientID').val($('#slTransaction option:selected').attr('ClientID'));
            $('#slClientID').prop('disabled', true);
        }
       


        if (!(IsLoadSavedData == true)) {
            $('#slClientID').trigger('change');
        }
        //else {

        //    $('#SL_InvoicesModal').scrollTop(0);
        //}
    
       
        
    }
    else
    {
        $(".C_IsNotFromTrans").removeClass("hide");
        $(".C_IsFromTrans").addClass("hide");
        $(".C_IsFromTransMulti").addClass("hide");

    }

    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
        $('#txtDate').prop('disabled', false);
        $('#slTransaction').prop('disabled', false);
        $('#btnGetItems').removeClass('hide');
        $("#cbIsFromTrans").prop('disabled', false);
        $('#slTypeID').prop('disabled', false);
        $('#slPaymentMethodID').val("1");

    }
    else // is [ Update ]
    {
        // $('#txtDate').prop('disabled', true);
        $('#txtDate').prop('disabled', true);
        $('#slTransaction').prop('disabled', true);
        $('#btnGetItems').addClass('hide');
        $("#cbIsFromTrans").prop('disabled', true);
        $('#slTypeID').prop('disabled', true);

      

    }

    $('.selectunit').prop('disabled', true);
    $('.inputtaxvalue').prop('disabled', true);
    $('.inputtaxamount ').prop('disabled', true);


    //if ($('#hReadySlOptions option[value="2122"]').attr("OptionValue") == "true") /* show hide items taxes */ {
    //    $('.itemtaxes').removeClass('hide');
    //}
    //else {
    //    $('.itemtaxes').addClass('hide');

    //}
   
}
function SetCLientCostCenter(THIS)
{
    if (typeof THIS !== "undefined" && THIS != null)
        $('#slCostCenter_ID').val(IsNull($(THIS).find('option:selected').attr('CostCenterID') , "0"));
    else
        $('#slCostCenter_ID').val(IsNull($('#slClientID').find('option:selected').attr('CostCenterID') , "0"));

}
function RecalculateExchangeRate()
{
    var currencyid = $('#slCurrencyID').val();
    if ($('#hID') == null || $('#hID').val() == "") {
        $('#hID').val("0")

    }
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SL_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
            CalculateAll();
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}

function IntializeData(callback)
{
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    _IsApproved = false;
    if ($('#hID') == null || $('#hID').val() == "") {
        $('#hID').val("0");
    }
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
    //$("#hID").val("");
   
    $('#txtInvoiceNo').val("Auto");
    $('#slClientID').val("0");
    $('#txtDiscount').val("0");
    $('#slDiscountType').val('10');
    $('#cbDiscountBeforeTax').prop('checked', false);
    $('#lblDiscountValue').text("0.00000");
    $('#lblDiscountPercentage').text("0.00000");
    $('#lblNetPriceValue').text("0.00000");
    $('#lblPriceValue').text("0.00000");
    $('#lblPrintedPriceValue').text("0.00000");
    $('#lblLocalPriceValue').text("0.00000");
    $('#lblTotalItems').text("0.00000");
    $('#lblTotalExpenses').text("0.00000");
    $('#lblTotalTaxes').text("0.00000");
    $('#txtDiscount').inputmask('decimal', { digits: 5 });
    $('#txtDiscount').val('0');
    $('#slTypeID').val('0');
    $('#slBranches').val(pLoggedUser.BranchID);
    
    $('#SL_InvoicesModal').scrollTop(0);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/SL_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[2], 'ID', 'Name', "Select Type - إختر النوع", '#slTypeID', '', 'Code');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFieldsForSL_Invoice(d[1], 'ID', 'Code,TransactionDate', "-", 'Select Material Issue Voucher', '#slTransaction', $('#hID').val(), 'ClientID,TransactionDate,Notes');
            //FillDivWithCheckboxes("divCbTransaction", d[1], "nameTransaction", 7, null);

            FadePageCover(false);
            $('#SL_InvoicesModal').scrollTop(0);
            if (typeof callback !== "undefined")
            {
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



function Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFieldsForSL_Invoice(data, ID_Name, Items_Name, SplitByChar, Title, SelectInput_ID, Selected_ID, AttrItemNames) {
    var selectAttrs = "";
    var selectItems = "";
    var option = "";
    if (Title != null)
        option += '<option value="' + 0 + '" selected "> ' + Title + '</option>';
    $.each(JSON.parse(data), function (i, item) {
        // console.log(item[ID_Name]);
        selectAttrs = "";
        $(AttrItemNames.split(",")).each(function (attrindex, attr) {
            // element == this
            selectAttrs += ' ' + attr + ' = "' + item[attr] + '" ';
            if (attrindex == AttrItemNames.split(",").length - 1) {
                selectItems = "";
                $(Items_Name.split(",")).each(function (attrindex1, attr1) {
                    // element == this


                    if (attrindex1 == Items_Name.split(",").length - 1) {
                        selectItems += (" " + (attr1.includes('Date') ? GetDateFromServer(item[attr1]) : item[attr1]) + " ")
                        if (item[ID_Name] == Selected_ID) {

                            option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '" selected> ' + selectItems + '</option>';
                        }
                        else {
                            option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '"> ' + selectItems + '</option>';
                        }
                    }
                    else {
                        selectItems += (" " + (attr1.includes('Date') ? GetDateFromServer(item[attr1]) : item[attr1])  + " " + SplitByChar);
                    }
                });
            }
        });
    });


    //var Fields = Items_Name.split(",")
    //if (item[ID_Name] == Selected_ID) {

    //    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '" selected> ' + (item[Item_Name]).trim() + '</option>';
    //}
    //else {
    //    option += '<option' + selectAttrs + ' value="' + item[ID_Name] + '"> ' + (item[Item_Name]).trim() + '</option>';
    //}
    $(SelectInput_ID).html("");
    $(SelectInput_ID).append(option);
}



function ClearApprovedIsHasTransactions() {
    $('#htxtIsApproved').val('false');
    $('#htxtHasTransactions').val('false');
    SL_HideShowEditBtns(false , false);
}
function SL_Invoices_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SL_InvoicesModal", null);
    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");

    $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
    _IsApproved = false;
    _HasTransactions = false;
    _JVID = 0;
    $("#cbIsFromTrans").prop("checked", false);
    $('#slPaymentMethodID').val("50");
    $('#slPaymentMethodID').trigger('change');

    $('#slTypeID').val("0");
    $('#slTypeID').trigger('change');
    
    $('#slBranches').val(IsNull($("#hUserBranchID").val(), "0"));
    $('#SL_InvoicesModal').scrollTop(0);
    $('#slClientID').val("0");
    $('#slClientID').trigger('change'); 
    debugger
    //$('#htxtIsApproved').val('false');
    //$('#htxtHasTransactions').val('false');
    IntializeData(function () { /*SL_HideShowEditBtns(false); */});

}

//function LoadInvoiceDetails()
//{
//    debugger;
//    LoadAll("/api/SL_Invoices/LoadDetails", "where InvoiceID = " + $('#hID').val(), function (pTabelRows) {
//        SL_InvoicesDetails_BindTableRows(pTabelRows[0]);
//        SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
//        SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);


//        setTimeout(function () {
//            CalculateAll();
//            SL_HideShowEditBtns(_IsApproved, _HasTransactions);
//    }, 300);

//    });
//}

function LoadInvoiceDetails(IsFromTrans) {
    debugger;

    if (IsFromTrans) {
        if (pDefaults.UnEditableCompanyName == 'AGR') {
            var pIDs = GetAllSelectedIDsAsStringWithNameAttr("nameTransaction");
            LoadAll("/api/SL_Invoices/LoadDetails", " where '**LoadItemsFromTrans**'='**LoadItemsFromTrans**' and  TransactionID in ( " + pIDs + ")", function (pTabelRows) {
                SL_InvoicesDetails_BindTableRows(pTabelRows[0]);
                // SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
                //  SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
                $('#txtNotes').val($('#slTransaction option:selected').attr('Notes'));
                setTimeout(function () {
                    setTimeout(function () {

                        SL_HideShowEditBtns(_IsApproved, _HasTransactions);
                    }, 300);
                    setTimeout(function () {
                        CalculateAll();

                    }, 1000);
                }, 1500);
            });
        }
        else {
            LoadAll("/api/SL_Invoices/LoadDetails", " where '**LoadItemsFromTrans**'='**LoadItemsFromTrans**' and  TransactionID = " + $('#slTransaction').val(), function (pTabelRows) {
                SL_InvoicesDetails_BindTableRows(pTabelRows[0]);
                // SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
                //  SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
                $('#txtNotes').val($('#slTransaction option:selected').attr('Notes'));
                setTimeout(function () {
                    setTimeout(function () {

                        SL_HideShowEditBtns(_IsApproved, _HasTransactions);
                    }, 300);
                    setTimeout(function () {
                        CalculateAll();

                    }, 1000);
                }, 1500);
            });
        }

     
    }
    else
    {
        LoadAll("/api/SL_Invoices/LoadDetails", " where ID = " + $('#hID').val(), function (pTabelRows) {
            SL_InvoicesDetails_BindTableRows(pTabelRows[0]);
            SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
            SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);


            setTimeout(function () {
                setTimeout(function () {

                    SL_HideShowEditBtns(_IsApproved, _HasTransactions , true);
                }, 1000);
                setTimeout(function () {
                    CalculateAll();

                }, 1000);
            }, 1500);

        });
    }

}



function PrintInvoice(InvID) {
    FadePageCover(true);
    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/SL_Reports/LoadInvoiceDetails", "where ID = " + InvID, function (data) {
        FadePageCover(false);
        var pReportTitle = "Sales Invoice - فاتورة مبيعات";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        var _Expenses = JSON.parse(data[1]);
        var _Taxes = JSON.parse(data[2]);
        var _Default = JSON.parse(data[3]);

        // console.log(_Details);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var TotalExpenses = 0.00;
        var TotalTaxes = 0.00;
        var _InvCode = "";
        var _InvDate = "";
        var _InvCustomer = "";
        var _InvNotes = "";
        var _InvDiscount = "";
        var _InvCurrency = "";
        var _InvTotal = 0;

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>البيان</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '">السعر</th>';
        pTablesHTML += '<th class="' + ItemsCellsClass + '">الكمية</th>';
        pTablesHTML += '<th>القيمة</th>';
        pTablesHTML += '<th>ملاحظات</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item) {
            var name = '';
            TotalAmount = parseFloat(TotalAmount + item.D_Total);
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.D_Price).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Total).toFixed(2) + '</td>';
            pTablesHTML += '<td>' +"" /*item.D_Notes*/ + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.InvoiceDate);
                _InvCode = item.InvoiceNo;
                _InvCustomer = item.CustomerName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">القيمة الكلية : ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        if ($(_Expenses).length > 0) {
            pTablesHTML += '<div class="row">';
            pTablesHTML += '<div class="col-xs-12">';
            pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
            pTablesHTML += '<caption><b>مصروفات</b></caption>';
            pTablesHTML += '<thead>';
            pTablesHTML += '<th>البيان</th>';
            pTablesHTML += '<th>القيمة</th>';
            pTablesHTML += '</thead>';
            pTablesHTML += '<tbody>';
            //hExportedTable
            $(_Expenses).each(function (i, item) {
                TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount);
                pTablesHTML += '<tr>';
                pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
                pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
                pTablesHTML += '</tr>';

                if ($(_Expenses).length - 1 == i) {
                    _InvDate = GetDateFromServer(item.InvoiceDate);
                    _InvCode = item.InvoiceNo;
                    _InvCustomer = item.CustomerName;
                    _InvNotes = item.Notes;
                    _InvCurrency = item.CurrencyCode;
                    _InvTotal = item.TotalPrice;
                    _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                    pTablesHTML += '<tr>';
                    pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">مصروفات... : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                    pTablesHTML += '</tr>';
                }
            });
            pTablesHTML += '</tbody></table>';
            pTablesHTML += '</div></div>';
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        if ($(_Taxes).length > 0) {
            pTablesHTML += '<div class="row">';
            pTablesHTML += '<div class="col-xs-12">';
            pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
            pTablesHTML += '<caption><b>ضرائب</b></caption>';
            pTablesHTML += '<thead>';
            pTablesHTML += '<th>الضريبة</th>';
            pTablesHTML += '<th>قيمة الضريبة</th>';
            pTablesHTML += '</thead>';
            pTablesHTML += '<tbody>';
            //hExportedTable
            $(_Taxes).each(function (i, item) {
                TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
                pTablesHTML += '<tr>';
                pTablesHTML += '<td>' + item.Name + '</td>';
                pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
                pTablesHTML += '</tr>';

                if ($(_Taxes).length - 1 == i) {
                    pTablesHTML += '<tr>';
                    pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">الضرائب:  ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                    pTablesHTML += '</tr>';
                }



            });
            pTablesHTML += '</tbody></table>';
            pTablesHTML += '</div>';
            pTablesHTML += '</div>';
        }
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


        //************** TOTAL Summary *************************
        //pTablesHTML += '<div class="row" >';
        //pTablesHTML += '<div class="col-xs-8">ملاحظات :<hr> <b>';
        //pTablesHTML += _Default.SL_InvoicesComments + "<hr>";

        //pTablesHTML += '</b></div>';

        pTablesHTML += '<div class="row" >';
        pTablesHTML += '<div class="col-xs-8">';
        pTablesHTML += '</div>';
        pTablesHTML += '<div class="col-xs-4 "  >';
        pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
        if (parseFloat(_InvDiscount) > 0)
            pTablesHTML += "<b> خصم : " + _InvDiscount + "</b><br>";
           // pTablesHTML += "<b> خصم : " + _InvDiscount.toFixed(2) + "</b><br>";

        pTablesHTML += "<b> المجموع : " + _InvTotal.toFixed(2) + " " + _InvCurrency + "</b><br>";
        pTablesHTML += " <b style='text-decoration: underline overline;'>" + tafqeet(_InvTotal.toFixed(2)) /*toWords_WithFractionNumbers()*/ + " " + _InvCurrency + "</b>";
        pTablesHTML += "</div>";

        pTablesHTML += '</div>';
        pTablesHTML += '</div>';


        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems) {
            $('.ForItems').addClass('hide');

        }



        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html dir="rtl" style=" width: 21cm; height: 29.7cm;margin: 0mm 5mm 0mm 45mm;background-color: white; background: url(\'/Content/Images/CompanyBackground.jpeg\') no-repeat  !important;    background-size: cover!important;"  >';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" >';

        ReportHTML += '<style type="text/css" > @media print { * {-webkit-print-color-adjust: exact !important; /*Chrome, Safari */color-adjust: exact !important;  /*Firefox*/}  @page {size: A4;} td.header-row{background-color:Gainsboro!important;} }</style> ';
        //ReportHTML += '<style type="text/css" > print{@page {size: portrait}  td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '</br></br></br></br></br></br></br></br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';


        //  ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
        //ReportHTML += '                 <div class="col-xs-6"><b>عميل: </b> ' + _InvCustomer + '</div>';
        ReportHTML += '                 <div class="col-xs-6"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

        ReportHTML += '                 <div class="col-xs-12"><b>عميل: </b> ' + _InvCustomer  + '</div><br/>';
        ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';



        //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
        //  ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
        ReportHTML += '                         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';
        //ReportHTML += '         <div class="row">';
        //ReportHTML += '         <div class="col-xs-3">توقيع المستلم</div>';
        //ReportHTML += '         <div class="col-xs-3">إدارة المخازن</div>';
        //ReportHTML += '         <div class="col-xs-3">إدارة الحسابات</div>';
        
        
        //ReportHTML += '         <div class="col-xs-3"></div>';
        //ReportHTML += '         </div>';
        //ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';

        ReportHTML += '         </body>';
        //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        //ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
    });
}




function PrintInvoiceForClient(InvID) {
    FadePageCover(true);
    if (InvID == 0)
        InvID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/SL_Reports/LoadInvoiceDetailsForClientPrint", "where ID = " + InvID, function (data) {
        FadePageCover(false);
        var _Details = JSON.parse(data[0]);
        if (_Details[0].InvoiceTypeCode == "sl_forward") {
            PrintTaxesInvoiceForClient(data);

        }
        else if (_Details[0].InvoiceTypeCode == "sl_cashing" || _Details[0].InvoiceTypeCode == "sl_iv") {

            PrintTaxesInvoiceForClient(data);
        }
        else
        {

            PrintStandardInvoiceForClient(data);
        }


       
    });
}

//#endregion Public
function PrintTaxesInvoiceForClient(data)
{
    var _Details = JSON.parse(data[0]);
    var pReportTitle = ((_Details[0].InvoiceTypeCode == "sl_cashing" || _Details[0].InvoiceTypeCode == "sl_iv") ? " اذن صرف رقم "  : " فاتورة رقم ") + _Details[0].InvoiceNo ;
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    
    var _Expenses = JSON.parse(data[1]);
    var _Taxes = JSON.parse(data[2]);
    var _Default = JSON.parse(data[3]);

    // console.log(_Details);
    //****************** fill html table *************************************************
    var pTablesHTML = "";
    var ItemsCellsClass = "";
    var HasItems = false;
    var TotalAmount = 0.00;
    var TotalExpenses = 0.00;
    var TotalTaxes = 0.00;
    var _InvCode = "";
    var _InvDate = "";
    var _InvCustomer = "";
    var _InvNotes = "";
    var _InvDiscount = "";
    var _InvCurrency = "";
    var _InvTotal = 0;

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead>';
    pTablesHTML += '<th>البيان</th>';
    pTablesHTML += '<th>الوحدة</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">الكمية</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">السعر</th>'; /*سعر الوحدة*/
    (($(_Taxes).length > 0) ? (pTablesHTML += '<th class="' + ItemsCellsClass + '">الصافي قبل الضريبة</th>') : null ); 
    (($(_Taxes).length > 0) ? (pTablesHTML += '<th class="' + ItemsCellsClass + '">الضريبة</th>') : null ); 
    pTablesHTML += '<th class="' + ItemsCellsClass + '">الاجمالي</th>'; 
    pTablesHTML += '<th>ملاحظات</th>';
    pTablesHTML += '</thead>';
    pTablesHTML += '<tbody>';

    //hExportedTable
    $(_Details).each(function (i, item) {
        var name = '';
        TotalAmount = parseFloat(TotalAmount + item.Printed_TotalPrice);

        name = item.Printed_ItemName;

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + name + '</td>';
        pTablesHTML += '<td>' + item.Printed_Unit + '</td>';
        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Printed_Qty).toFixed(2) + '</td>';
        pTablesHTML += '<td>' + parseFloat(item.Printed_TotalPrice / item.Printed_Qty).toFixed(2) + '</td>'; /*سعر الوحدة*/
        (($(_Taxes).length > 0) ? (pTablesHTML += '<td>' + parseFloat(item.Printed_TotalPrice).toFixed(2) + '</td>') : null ); /*قبل الضريبة*/
        (($(_Taxes).length > 0) ? (pTablesHTML += '<td>' + parseFloat(item.D_TotalTaxAmount).toFixed(2) + '</td>') : null ); /*الضريبة*/
        pTablesHTML += '<td>' + parseFloat(item.Printed_TotalPrice + item.D_TotalTaxAmount).toFixed(2) + '</td>'; /*الاجمالي بعد الضريبة*/
        pTablesHTML += '<td>' + ""/*item.D_Notes*/ + '</td>';
        pTablesHTML += '</tr>';






        if ($(_Details).length - 1 == i) {

            _InvDate = GetDateFromServer(item.InvoiceDate);
            _InvCode = item.InvoiceNo;
            _InvCustomer = item.CustomerName;
            _InvNotes = item.Notes;
            _InvCurrency = item.CurrencyCode;
            _InvTotal = item.TotalPrice;
            _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
            pTablesHTML += '<tr>';
            pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">اجمالي القيمة : ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
            pTablesHTML += '</tr>';
        }
    });
    pTablesHTML += '</tbody></table>';

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Expenses).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<caption><b>مصروفات</b></caption>';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>البيان</th>';
        pTablesHTML += '<th>القيمة</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Expenses).each(function (i, item) {
            TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount);
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Expenses).length - 1 == i) {
                _InvDate = GetDateFromServer(item.InvoiceDate);
                _InvCode = item.InvoiceNo;
                _InvCustomer = item.CustomerName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">مصروفات... : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div></div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Taxes).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
        //pTablesHTML += '<caption><b>ضرائب</b></caption>';
        //pTablesHTML += '<thead>';
        //pTablesHTML += '<th>الضريبة</th>';
        //pTablesHTML += '<th>قيمة الضريبة</th>';
        //pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Taxes).each(function (i, item) {
            TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
            pTablesHTML += '<tr>';
            //pTablesHTML += '<td>' + item.Name + '</td>';
            //pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
            //pTablesHTML += '</tr>';

            if ($(_Taxes).length - 1 == i) {
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">يضاف ضريبة القيمة المضافة:  ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }



        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div>';
        pTablesHTML += '</div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    //************** TOTAL Summary *************************
    pTablesHTML += '<div class="row" >';
    //pTablesHTML += '<div class="col-xs-8">ملاحظات :<hr> <b>';
    //pTablesHTML += _Default.SL_InvoicesComments + "<hr>";

    //pTablesHTML += '</b></div>';

    pTablesHTML += '<div class="col-xs-8">';
    pTablesHTML += '</div>';
    pTablesHTML += '<div class="col-xs-4 "  >';
    pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
    if (parseFloat(_InvDiscount) > 0)
        pTablesHTML += "<b> خصم : " + _InvDiscount.toFixed(2) + "</b><br>";
    pTablesHTML += "<b> الاجمالي قدره : " + _InvTotal.toFixed(2) + " " + _InvCurrency + "</b><br>";
    pTablesHTML += " <b style='text-decoration: underline overline;'>" + tafqeet(_InvTotal.toFixed(2)) /*toWords_WithFractionNumbers()*/ + " " + (_InvCurrency.trim() == "EGP" ? " جنيها مصريا " : _InvCurrency) + "</b>";
    pTablesHTML += "</div>";

    pTablesHTML += '</div>';
    pTablesHTML += '</div>';

    $('#hExportedTable').html(pTablesHTML);

    if (!HasItems) {
        $('.ForItems').addClass('hide');

    }



    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html dir="rtl" style=" width: 21cm; height: 29.7cm;margin: 0mm 5mm 0mm 45mm;background-color: white; background: url(\'/Content/Images/CompanyBackground.jpeg\') no-repeat center!important;    background-size: cover!important;"  >';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" >';

    ReportHTML += '<style type="text/css" > @media print { * {-webkit-print-color-adjust: exact !important; /*Chrome, Safari */color-adjust: exact !important;  /*Firefox*/}  @page {size: A4;} td.header-row{background-color:Gainsboro!important;} }</style> ';
    //ReportHTML += '<style type="text/css" > print{@page {size: portrait}  td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '</br></br></br></br></br></br></br></br>';
    ReportHTML += '         <div id="Reportbody" style="">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';


    //  ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
    //ReportHTML += '                 <div class="col-xs-6"><b>عميل: </b> ' + _InvCustomer + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

    //ReportHTML += '                 <div class="col-xs-12"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div><br/>';
    //ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';
    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-6"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>الفرع: </b> ' + _Details[0].BranchName + '</div>';
    ReportHTML += ' </div>';
    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-12"><h3><b>المطلوب من السادة: </b> ' + _InvCustomer + '</h3></div><br/>';
    ReportHTML += ' </div>';
    if (_Details[0].InvoiceTypeCode == "sl_cashing" || _Details[0].InvoiceTypeCode == "sl_iv")
    {
        ReportHTML += ' <div class="row">';
        ReportHTML += '                 <div class="col-xs-12"><b>رقم الحساب: </b> ' + _Details[0].CustomerBankAccountNumber + '</div><br/>';
        ReportHTML += ' </div>';
    }

    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-6"><b>المندوب :</b> ' + _Details[0].SalesManName + '</div>';
    ReportHTML += '                 <div class="col-xs-6"><b>العنوان :</b> ' + _Details[0].CustomerAddress + '</div>';
    
    ReportHTML += ' </div>';
    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-12"><b>تليفون العميل :</b> ' + _Details[0].CustomerPhones + '</div>';
    ReportHTML += ' </div>';
    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-6"><b>المستلم / المسئول: </b> ' + "" + '</div>';
    ReportHTML += '                 <div class="col-xs-6"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';
    ReportHTML += ' </div>';
    ReportHTML += ' <div class="row">';
    ReportHTML += '                 <div class="col-xs-6"><b> </b> ' + "" + '</div>';

    ReportHTML += '                 <div class="col-xs-6"><b>اعداد: </b> ' + "" + '</div>';
    ReportHTML += ' </div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += $('#hExportedTable').html();
    ReportHTML += '         </div>';
    //ReportHTML += '    <br/><br/><br/><br/><br/><br/><br/><br/><br/>   <div class="row">';
    //ReportHTML += '         <div class="col-xs-3">توقيع المستلم</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة المخازن</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة الحسابات</div>';


    //ReportHTML += '         <div class="col-xs-3"></div>';
    ReportHTML += '         </div>';
    //ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';

    ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    //ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();

}



function PrintCashingInvoiceForClient(data) {
    var pReportTitle = "Sales Invoice - فاتورة مبيعات";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _Details = JSON.parse(data[0]);
    var _Expenses = JSON.parse(data[1]);
    var _Taxes = JSON.parse(data[2]);
    var _Default = JSON.parse(data[3]);

    // console.log(_Details);
    //****************** fill html table *************************************************
    var pTablesHTML = "";
    var ItemsCellsClass = "";
    var HasItems = false;
    var TotalAmount = 0.00;
    var TotalExpenses = 0.00;
    var TotalTaxes = 0.00;
    var _InvCode = "";
    var _InvDate = "";
    var _InvCustomer = "";
    var _InvNotes = "";
    var _InvDiscount = "";
    var _InvCurrency = "";
    var _InvTotal = 0;

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead>';
    pTablesHTML += '<th>البيان</th>';
    pTablesHTML += '<th>الوحدة</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">السعر</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">الكمية</th>';
    pTablesHTML += '<th>القيمة</th>';
    pTablesHTML += '<th>ملاحظات</th>';
    pTablesHTML += '</thead>';
    pTablesHTML += '<tbody>';

    //hExportedTable
    $(_Details).each(function (i, item) {
        var name = '';
        TotalAmount = parseFloat(TotalAmount + item.Printed_TotalPrice);

        name = item.Printed_ItemName;

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + name + '</td>';
        pTablesHTML += '<td>' + (IsNull(item.Printed_Unit, "")).trim() + '</td>';
        pTablesHTML += '<td>' + parseFloat(item.Printed_TotalPrice / item.Printed_Qty).toFixed(2) + '</td>';
        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Printed_Qty).toFixed(2) + '</td>';
        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Printed_TotalPrice).toFixed(2) + '</td>';
        pTablesHTML += '<td>' + ""/*item.D_Notes*/ + '</td>';
        pTablesHTML += '</tr>';






        if ($(_Details).length - 1 == i) {

            _InvDate = GetDateFromServer(item.InvoiceDate);
            _InvCode = item.InvoiceNo;
            _InvCustomer = item.CustomerName;
            _InvNotes = item.Notes;
            _InvCurrency = item.CurrencyCode;
            _InvTotal = item.TotalPrice;
            _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
            pTablesHTML += '<tr>';
            pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">القيمة الكلية : ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
            pTablesHTML += '</tr>';
        }
    });
    pTablesHTML += '</tbody></table>';

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Expenses).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<caption><b>مصروفات</b></caption>';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>البيان</th>';
        pTablesHTML += '<th>القيمة</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Expenses).each(function (i, item) {
            TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount);
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Expenses).length - 1 == i) {
                _InvDate = GetDateFromServer(item.InvoiceDate);
                _InvCode = item.InvoiceNo;
                _InvCustomer = item.CustomerName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">مصروفات... : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div></div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Taxes).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<caption><b>ضرائب</b></caption>';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>الضريبة</th>';
        pTablesHTML += '<th>قيمة الضريبة</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Taxes).each(function (i, item) {
            TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + item.Name + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Taxes).length - 1 == i) {
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">الضرائب:  ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }



        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div>';
        pTablesHTML += '</div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    //************** TOTAL Summary *************************
    pTablesHTML += '<div class="row" >';
    //pTablesHTML += '<div class="col-xs-8">ملاحظات :<hr> <b>';
    //pTablesHTML += _Default.SL_InvoicesComments + "<hr>";

    //pTablesHTML += '</b></div>';

    pTablesHTML += '<div class="col-xs-8">';
    pTablesHTML += '</div>';
    pTablesHTML += '<div class="col-xs-4 "  >';
    pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
    if (parseFloat(_InvDiscount) > 0)
        pTablesHTML += "<b> خصم : " + _InvDiscount.toFixed(2) + "</b><br>";
    pTablesHTML += "<b> المجموع : " + _InvTotal.toFixed(2) + " " + _InvCurrency + "</b><br>";
    pTablesHTML += " <b style='text-decoration: underline overline;'>" + tafqeet(_InvTotal.toFixed(2)) /*toWords_WithFractionNumbers()*/ + " " + _InvCurrency + "</b>";
    pTablesHTML += "</div>";

    pTablesHTML += '</div>';
    pTablesHTML += '</div>';

    $('#hExportedTable').html(pTablesHTML);

    if (!HasItems) {
        $('.ForItems').addClass('hide');

    }



    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html dir="rtl" style=" width: 21cm; height: 29.7cm;margin: 0mm 5mm 0mm 45mm;background-color: white; background: url(\'/Content/Images/CompanyBackground.jpeg\') no-repeat center!important;    background-size: cover!important;"  >';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" >';

    ReportHTML += '<style type="text/css" > @media print { * {-webkit-print-color-adjust: exact !important; /*Chrome, Safari */color-adjust: exact !important;  /*Firefox*/}  @page {size: A4;} td.header-row{background-color:Gainsboro!important;} }</style> ';
    //ReportHTML += '<style type="text/css" > print{@page {size: portrait}  td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '</br></br></br></br></br></br></br></br>';
    ReportHTML += '         <div id="Reportbody" style="">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';


    //  ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
    //ReportHTML += '                 <div class="col-xs-6"><b>عميل: </b> ' + _InvCustomer + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

    //ReportHTML += '                 <div class="col-xs-12"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div><br/>';
    //ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';

    ReportHTML += '                 <div class="col-xs-6"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

    ReportHTML += '                 <div class="col-xs-12"><b>عميل: </b> ' + _InvCustomer + '</div><br/>';
    ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';

    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += $('#hExportedTable').html();
    ReportHTML += '         </div>';
    //ReportHTML += '    <br/><br/><br/><br/><br/><br/><br/><br/><br/>   <div class="row">';
    //ReportHTML += '         <div class="col-xs-3">توقيع المستلم</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة المخازن</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة الحسابات</div>';


    //ReportHTML += '         <div class="col-xs-3"></div>';
    ReportHTML += '         </div>';
    //ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';

    ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    //ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();

}
function PrintStandardInvoiceForClient(data)
{
    var pReportTitle = "Sales Invoice - فاتورة مبيعات";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _Details = JSON.parse(data[0]);
    var _Expenses = JSON.parse(data[1]);
    var _Taxes = JSON.parse(data[2]);
    var _Default = JSON.parse(data[3]);

    // console.log(_Details);
    //****************** fill html table *************************************************
    var pTablesHTML = "";
    var ItemsCellsClass = "";
    var HasItems = false;
    var TotalAmount = 0.00;
    var TotalExpenses = 0.00;
    var TotalTaxes = 0.00;
    var _InvCode = "";
    var _InvDate = "";
    var _InvCustomer = "";
    var _InvNotes = "";
    var _InvDiscount = "";
    var _InvCurrency = "";
    var _InvTotal = 0;

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead>';
    pTablesHTML += '<th>البيان</th>';
    pTablesHTML += '<th>الوحدة</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">السعر</th>';
    pTablesHTML += '<th class="' + ItemsCellsClass + '">الكمية</th>';
    pTablesHTML += '<th>القيمة</th>';
    pTablesHTML += '<th>ملاحظات</th>';
    pTablesHTML += '</thead>';
    pTablesHTML += '<tbody>';

    //hExportedTable
    $(_Details).each(function (i, item) {
        var name = '';
        TotalAmount = parseFloat(TotalAmount + item.Printed_TotalPrice);

        name = item.Printed_ItemName;

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + name + '</td>';
        pTablesHTML += '<td>' + (IsNull(item.Printed_Unit, "")).trim() + '</td>';
        pTablesHTML += '<td>' + parseFloat(item.Printed_TotalPrice / item.Printed_Qty).toFixed(2) + '</td>';
        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Printed_Qty).toFixed(2) + '</td>';
        pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.Printed_TotalPrice).toFixed(2) + '</td>';
        pTablesHTML += '<td>' + ""/*item.D_Notes*/ + '</td>';
        pTablesHTML += '</tr>';






        if ($(_Details).length - 1 == i) {

            _InvDate = GetDateFromServer(item.InvoiceDate);
            _InvCode = item.InvoiceNo;
            _InvCustomer = item.CustomerName;
            _InvNotes = item.Notes;
            _InvCurrency = item.CurrencyCode;
            _InvTotal = item.TotalPrice;
            _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
            pTablesHTML += '<tr>';
            pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">القيمة الكلية : ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
            pTablesHTML += '</tr>';
        }
    });
    pTablesHTML += '</tbody></table>';

    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Expenses xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Expenses).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvExpenses" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<caption><b>مصروفات</b></caption>';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>البيان</th>';
        pTablesHTML += '<th>القيمة</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Expenses).each(function (i, item) {
            TotalExpenses = parseFloat(TotalExpenses + item.InvExpensesAmount);
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + item.ExpnesesName + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.InvExpensesAmount).toFixed(2) + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Expenses).length - 1 == i) {
                _InvDate = GetDateFromServer(item.InvoiceDate);
                _InvCode = item.InvoiceNo;
                _InvCustomer = item.CustomerName;
                _InvNotes = item.Notes;
                _InvCurrency = item.CurrencyCode;
                _InvTotal = item.TotalPrice;
                _InvDiscount = item.Discount + " " + item.CurrencyCode + " (" + item.DiscountPercentage + " % )"
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">مصروفات... : ' + parseFloat(TotalExpenses).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div></div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Taxes xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    if ($(_Taxes).length > 0) {
        pTablesHTML += '<div class="row">';
        pTablesHTML += '<div class="col-xs-12">';
        pTablesHTML += '<table id="tblInvTaxes" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<caption><b>ضرائب</b></caption>';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>الضريبة</th>';
        pTablesHTML += '<th>قيمة الضريبة</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';
        //hExportedTable
        $(_Taxes).each(function (i, item) {
            TotalTaxes = parseFloat(TotalTaxes + item.TaxAmount);
            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + item.Name + '</td>';
            pTablesHTML += '<td>' + parseFloat(item.TaxAmount).toFixed(2) + '</td>';
            pTablesHTML += '</tr>';

            if ($(_Taxes).length - 1 == i) {
                pTablesHTML += '<tr>';
                pTablesHTML += '<td colspan="2"><b style="float:right; border:solid 1px;">الضرائب:  ' + parseFloat(TotalTaxes).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                pTablesHTML += '</tr>';
            }



        });
        pTablesHTML += '</tbody></table>';
        pTablesHTML += '</div>';
        pTablesHTML += '</div>';
    }
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


    //************** TOTAL Summary *************************
    pTablesHTML += '<div class="row" >';
    //pTablesHTML += '<div class="col-xs-8">ملاحظات :<hr> <b>';
    //pTablesHTML += _Default.SL_InvoicesComments + "<hr>";

    //pTablesHTML += '</b></div>';

    pTablesHTML += '<div class="col-xs-8">';
    pTablesHTML += '</div>';
    pTablesHTML += '<div class="col-xs-4 "  >';
    pTablesHTML += "<div class='float-right text-right' style='border: 1px solid;'>";
    if (parseFloat(_InvDiscount) > 0)
        pTablesHTML += "<b> خصم : " + _InvDiscount.toFixed(2) + "</b><br>";
    pTablesHTML += "<b> المجموع : " + _InvTotal.toFixed(2) + " " + _InvCurrency + "</b><br>";
    pTablesHTML += " <b style='text-decoration: underline overline;'>" + tafqeet(_InvTotal.toFixed(2)) /*toWords_WithFractionNumbers()*/ + " " + _InvCurrency + "</b>";
    pTablesHTML += "</div>";

    pTablesHTML += '</div>';
    pTablesHTML += '</div>';

    $('#hExportedTable').html(pTablesHTML);

    if (!HasItems) {
        $('.ForItems').addClass('hide');

    }



    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html dir="rtl" style=" width: 21cm; height: 29.7cm;margin: 0mm 5mm 0mm 45mm;background-color: white; background: url(\'/Content/Images/CompanyBackground.jpeg\') no-repeat center!important;    background-size: cover!important;"  >';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" >';

    ReportHTML += '<style type="text/css" > @media print { * {-webkit-print-color-adjust: exact !important; /*Chrome, Safari */color-adjust: exact !important;  /*Firefox*/}  @page {size: A4;} td.header-row{background-color:Gainsboro!important;} }</style> ';
    //ReportHTML += '<style type="text/css" > print{@page {size: portrait}  td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    //ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '</br></br></br></br></br></br></br></br>';
    ReportHTML += '         <div id="Reportbody" style="">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';


    //  ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
    //ReportHTML += '                 <div class="col-xs-6"><b>عميل: </b> ' + _InvCustomer + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
    //ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

    //ReportHTML += '                 <div class="col-xs-12"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div><br/>';
    //ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';

    ReportHTML += '                 <div class="col-xs-6"><b>تاريخ الطباعة :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>رقم الفاتورة: </b> ' + _InvCode + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>تاريخ الفاتورة: </b> ' + _InvDate + '</div>';

    ReportHTML += '                 <div class="col-xs-12"><b>عميل: </b> ' + _InvCustomer + '</div><br/>';
    ReportHTML += '                 <div class="col-xs-12"><b>ملاحظات: </b> ' + (_InvNotes == "0" ? "" : _InvNotes) + '</div>';

    //  ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    //  ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += $('#hExportedTable').html();
    ReportHTML += '         </div>';
    //ReportHTML += '    <br/><br/><br/><br/><br/><br/><br/><br/><br/>   <div class="row">';
    //ReportHTML += '         <div class="col-xs-3">توقيع المستلم</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة المخازن</div>';
    //ReportHTML += '         <div class="col-xs-3">إدارة الحسابات</div>';


    //ReportHTML += '         <div class="col-xs-3"></div>';
    ReportHTML += '         </div>';
    //ReportHTML += '         <div class="footer col-xs-12" style="position: fixed;bottom: 0;padding-top: 10px;width: 100%;"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';

    ReportHTML += '         </body>';
    //ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    //ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);
    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();

}



//#region Header
function SL_Invoices_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item)
    {
        debugger;
        var disable = "";
        if (item.IsApproved == true || item.TransactionsCount > 0)
        {
            disable = "disabled = disabled";
        }
       


        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSL_Invoices",
            ("<tr ID='" + item.ID + "' ondblclick='SL_Invoices_EditByDblClick(" + item.ID + " , " + item.IsApproved + " , " + _HasTransactions + "); '>"
                + "<td class='ID'> <input " + disable +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='InvoiceNo' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='InvoiceNoManual hide' val='" + item.InvoiceNoManual + "'>" + item.InvoiceNoManual + "</td>"
                + "<td class='InvoiceDate' val='" + GetDateFromServer(item.InvoiceDate) + "'>" + GetDateFromServer(item.InvoiceDate) + "</td>"
                + "<td class='QuotationID hide' val='" + item.QuotationID + "'>" + item.QuotationID + "</td>"
                + "<td class='ClientID' val='" + item.ClientID + "'>" + item.ClientName + "</td>"
                + "<td class='TotalBeforTax hide' val='" + item.TotalBeforTax + "'>" + item.TotalBeforTax + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TotalPrice' val='" + item.TotalPrice + "'>" + item.TotalPrice + "</td>"
                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='MaterialIssueVoucherCode' val='" + item.MaterialIssueVoucherCode + "'>" + item.MaterialIssueVoucherCode + "</td>"


                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Discount hide' val='" + item.Discount + "'>" + item.Discount + "</td>"
                + "<td class='DiscountPercentage hide' val='" + item.DiscountPercentage + "'>" + item.DiscountPercentage + "</td>"
                + "<td class='DepartmentID hide' val='" + item.DepartmentID + "'>" + item.DepartmentID + "</td>"
                + "<td class='SalesManID hide' val='" + item.SalesManID + "'>" + item.SalesManID + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenter_ID + "</td>"
                + "<td class='PaymentMethodID hide' val='" + item.PaymentMethodID + "'>" + item.PaymentMethodID + "</td>"
                + "<td class='ISDiscountBeforeTax val=" + item.ISDiscountBeforeTax +" hide'> <input type='checkbox' disabled='disabled' val='" + (item.ISDiscountBeforeTax == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='OrderID hide' val='" + item.OrderID + "'>" + item.OrderID + "</td>"
                + "<td class='IsFixedDiscount hide' val='" + item.IsFixedDiscount + "'>" + item.IsFixedDiscount + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='LocalTotalBeforeTax hide' val='" + item.LocalTotalBeforeTax + "'>" + item.LocalTotalBeforeTax + "</td>"
                + "<td class='LocalTotal hide' val='" + item.LocalTotal + "'>" + item.LocalTotal + "</td>"
                + "<td class='LocalTotal hide' val='" + item.IsFromTrans + "'>" + item.IsFromTrans + "</td>"
                + "<td class='TypeID hide' val='" + item.TypeID + "'>" + item.TypeID + "</td>"
                + "<td class='PaidAmount hide' val='" + item.PaidAmount + "'>" + item.PaidAmount + "</td>"
                + "<td class='RegionsID hide' val='" + item.RegionsID + "'>" + item.RegionsID + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='TransactionID hide' val='" + item.TransactionID + "'>" + item.TransactionID + "</td>"
                + "<td class='TransactionsCount hide' val='" + item.TransactionsCount + "'>" + item.TransactionsCount + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"

                + "<td class='hSL_Invoices hide'><a href='#SL_InvoicesModal' data-toggle='modal' onclick='SL_Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='pSL_Invoices'><a href='#' onclick='PrintInvoice(" + item.ID + ");' " + printControlsText + "</a> </td>"
                + "<td><a href='#' onclick='PrintInvoiceForClient(" + item.ID + ");' " + printForClientControlsText + "</a></td></tr > "
                
                
            ));


    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function SL_Invoices_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    window.PreventEvents = true;
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;


    if (pHasTransactions == true) {
        _HasTransactions = true;
        $('#htxtHasTransactions').val("true");
    }
    else {
        _HasTransactions = false;
        $('#htxtHasTransactions').val("false");
    }
    if (pIsApproved == true) {

        $('#htxtIsApproved').val("true");
    }
    else {
        $('#htxtIsApproved').val("false");
         
    }
    $('#btnPrint2').removeClass('hide');
    jQuery("#SL_InvoicesModal").modal("show");
    SL_Invoices_FillControls(pID);
    $('#SL_InvoicesModal').scrollTop(0);
}

function SL_Invoices_LoadingWithPaging() {
    debugger;
    var WhereClause = " Where IsNull(vwSL_Invoices.IsDeleted , 0) = 0 ";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND InvoiceNo = '" + $('#txtInvoiceNo_Filter').val() + "'";
    }
    //if ($('#txtSupplierInvoiceNo_Filter').val().trim() != "") {
    //    WhereClause += " AND SupplierInvoiceNo LIKE '%" + $('#txtSupplierInvoiceNo_Filter').val() + "%'";
    //}
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

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Invoices_BindTableRows(pTabelRows); SL_Invoices_ClearAllControls(); });
    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}




function SL_Invoices_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_Invoices') != "")
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
                DeleteListFunction("/api/SL_Invoices/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/SL_Invoices/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
var ID1;
var ID2;
var ID3;

function SL_Invoices_FillControls(pID) {
    debugger;
    ClearAll("#SL_InvoicesModal", null);
    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);

    window.PreventEvents = true;
    IntializeData(function () {
        setTimeout(function () {
            FadePageCover(true)
        var tr = $("#tblSL_Invoices > tbody > tr[ID='" + pID + "']");
        $("#txtInvoiceNo").val($(tr).find("td.InvoiceNo").attr('val'));
        $("#txtRemainAmount").val($(tr).find("td.RemainAmount").attr('val'));
        $("#txtPaidAmount").val($(tr).find("td.PaidAmount").attr('val'));
       // $("#txtSupplierInvoiceNo").val($(tr).find("td.SupplierInvoiceNo").attr('val'));
        $("#txtInvoiceDate").val($(tr).find("td.InvoiceDate").attr('val'));
        $("#slClientID").val($(tr).find("td.ClientID").attr('val'));
        SalesManCombo_GetList(pID,1);
            $("#slTypeID").val($(tr).find("td.TypeID").attr('val'));
            $("#slPaymentMethodID").val($(tr).find("td.PaymentMethodID").attr('val'));

        $("#slSalesMan").val($(tr).find("td.SalesManID").attr('val'));
        $("#slBranches").val($(tr).find("td.BranchID").attr('val'));

        $("#slRegions").val($(tr).find("td.RegionsID").attr('val'));
        ID1 = $(tr).find("td.SalesManID").attr('val');
        ID2 = $(tr).find("td.RegionsID").attr('val');
        ID3 = $(tr).find("td.PaymentMethodID").attr('val');

//*************** trigger change *****************************
        $("#slClientID").trigger('change');
            $("#slPaymentMethodID").trigger('change');
            $("#slTypeID").trigger('change');
            
//*************** trigger change *****************************
        $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
        $("#slCostCenter_ID").val($(tr).find("td.CostCenter_ID").attr('val'));
        $("#txtNotes").val($(tr).find("td.Notes").attr('val')); //[TransactionID]
        $("#cbIsFromTrans").prop("checked", $(tr).find("td.IsFromTrans").attr('val'));
        $("#slTransaction").val($(tr).find("td.TransactionID").attr('val'));
        
        if ($(tr).find("td.IsFixedDiscount").attr('val') == true || $(tr).find("td.IsFixedDiscount").attr('val') == "true") {
            $("#txtDiscount").val($(tr).find("td.Discount").attr('val'));
            $('#slDiscountType').val("20");
        }
        else {
            $("#txtDiscount").val($(tr).find("td.DiscountPercentage").attr('val'));
            $('#slDiscountType').val("10");

            }

            if ($(tr).find("td.TransactionID").attr('val') != '0') {
                $("#cbIsFromTrans").prop("checked", true);
                FillSC_TransactionsByClientID(pID, $(tr).find("td.ClientID").attr('val'))
            }
            
        else
                $("#cbIsFromTrans").prop("checked", false);

        $("#lblDiscountValue").text($(tr).find("td.Discount").attr('val'));
        $("#lblDiscountPercentage").text($(tr).find("td.DiscountPercentage").attr('val'));
        $("#lblNetPriceValue").text($(tr).find("td.TotalBeforTax").attr('val'));
            $("#lblPriceValue").text($(tr).find("td.TotalPrice").attr('val'));
           // $("#lblPrintedPriceValue").text($(tr).find("td.TotalPrice").attr('val'));
        $("#lblLocalPriceValue").text($(tr).find("td.LocalTotal").attr('val'));
        $("#slTransaction").val($(tr).find("td.TransactionID").attr('val'));
        $('#cbDiscountBeforeTax').prop('checked', $(tr).find("td.ISDiscountBeforeTax input:checkbox").is(":checked"));
        _JVID = ($(tr).find("td.JVID").attr('val') * 1);

        $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
            $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
            FadePageCover(false)
        }, 1000);
        $('#SL_InvoicesModal').scrollTop(0);
        setTimeout(function () {
            LoadInvoiceDetails(false);
        }, 1000);

    });
}




function GetInsertUpdateParameters()
{
    var InvoiceNo = (($('#txtInvoiceNo').val() == "" || $('#txtInvoiceNo').val() == "Auto") ? "0" : $('#txtInvoiceNo').val());
    var InvoiceDate = ConvertDateFormat( $('#txtInvoiceDate').val() );
    var QuotationID = 0;
    var ClientID = $('#slClientID').val();
    var TotalBeforTax = $('#lblNetPriceValue').text();
    var TotalPrice = $('#lblPriceValue').text();
    var Discount = $('#lblDiscountValue').text();
    var DiscountPercentage = $('#lblDiscountPercentage').text();
    var Notes = $('#txtNotes').val();
    var DepartmentID = 0;
    var SalesManID = $('#slSalesMan').val() == "" || $('#slSalesMan').val() == null ? 0 : $('#slSalesMan').val();
    var CostCenter_ID = IsNull($('#slCostCenter_ID').val() , "0");
    var PaymentMethodID = $('#slPaymentMethodID').val();
    var IsApproved = (typeof _IsApproved === "undefined" ? "false" : _IsApproved );
    var ISDiscountBeforeTax = $('#cbDiscountBeforeTax').is(':checked');
    var IsFixedDiscount = ($('#slDiscountType').val() == "10" ? false : true )
    var InvoiceNoManual = 0;
    var OrderID = 0;
    var JVID = _JVID;
    var CurrencyID = $('#slCurrencyID').val();
    var ExchangeRate = $('#slCurrencyID option:selected').attr('exchangerate');
    var LocalTotalBeforeTax = ($('#lblNetPriceValue').text() * 1) * ($('#slCurrencyID option:selected').attr('exchangerate') * 1);
    var LocalTotal = $('#lblLocalPriceValue').text();
    var IsDeleted = 0;
    var TaxesAmount = $('#lblTotalTaxes').text();
    var ItemsAmount = $('#lblTotalItems_I').text(); //GetTotalItemsOnly();
    var ServicesAmount = $('#lblTotalItems_S').text(); //GetTotalServicesOnly();
    var ExpensesAmount = $('#lblTotalExpenses').text();
    var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    var IsFromTrans = $('#cbIsFromTrans').is(":checked");
    var TransactionID = pDefaults.UnEditableCompanyName == 'AGR' ? "0" : $("#slTransaction").val();
    //*******
    var RemainAmount = ($("#txtRemainAmount").val() == null ? "0" : $("#txtRemainAmount").val()) ;
    var PaidAmount = ($("#txtPaidAmount").val() == null ? "0" : $("#txtPaidAmount").val());// $("#txtPaidAmount").val();
    var TypeID = $('#slTypeID').val();
    var RegionsID = $('#slRegions').val() == "" || $('#slRegions').val() == null ? 0 : $('#slRegions').val();


    var BranchID = IsNull($('#slBranches').val(), "0");
    var pTransIDs = $('#cbIsFromTrans').is(":checked") && pDefaults.UnEditableCompanyName == 'AGR' ? GetAllSelectedIDsAsStringWithNameAttr("nameTransaction") : "0";

    //*******
    return {
        pID: ID,
        pInvoiceNo: InvoiceNo,
        pInvoiceDate: ConvertDateFormat($('#txtInvoiceDate').val()),
        pQuotationID: QuotationID,
        pClientID: ClientID,
        pTotalBeforTax: TotalBeforTax,
        pTotalPrice: TotalPrice,
        pDiscount: Discount,
        pDiscountPercentage: DiscountPercentage,
        pNotes: Notes,
        pDepartmentID: DepartmentID,
        pSalesManID: SalesManID,
        pCostCenter_ID: CostCenter_ID,
        pPaymentMethodID: PaymentMethodID,
        pIsApproved: IsApproved,
        pISDiscountBeforeTax: ISDiscountBeforeTax,
        pInvoiceNoManual: InvoiceNoManual,
        pOrderID: OrderID,
        pJVID: JVID,
        pCurrencyID: CurrencyID,
        pExchangeRate: ExchangeRate,
        pLocalTotalBeforeTax: LocalTotalBeforeTax,
        pLocalTotal: LocalTotal,
        pIsDeleted: IsDeleted,
        pTaxesAmount: TaxesAmount,
        pItemsAmount: ItemsAmount,
        pServicesAmount: ServicesAmount,
        pExpensesAmount: ExpensesAmount,
        pIsFixedDiscount: IsFixedDiscount,
        pIsFromTrans: IsFromTrans,
        pTransactionID: TransactionID,
        pTypeID: TypeID,
        pRemainAmount: RemainAmount,
        pPaidAmount: PaidAmount,
        pRegionsID: RegionsID, pBranchID: BranchID,
        pTransIDs: pTransIDs

    };


}
var ListOfListOfObject = new Array();
function SL_Invoices_Save(pSaveandAddNew) {
    IsInsert = true;
    var _Suceess = true;




    if ($('#slClientID').val() == "0") {
        swal('Excuse me', 'You must Select Customer', 'warning');
        _Suceess = false;
    }
   
    if ($('#slTypeID').val() == "" || $('#slTypeID').val() == "0" || $('#slTypeID').val() == null) {
        $('#slTypeID').select2('open');
        _Suceess = false;
    }
    else if ($('#slPaymentMethodID').val() == "" || $('#slPaymentMethodID').val() == "0" || $('#slPaymentMethodID').val() == null) {
        $('#slPaymentMethodID').select2('open');
        _Suceess = false;
    }
    //if (IsNull($('#slCostCenter_ID').val() , "0" ) == "0") {
    //    swal('Excuse me', 'Fill  Cost Center', 'warning');
    //    _Suceess = false;
    //}

    



    if (
        ($('#lblDiscountValue').text() * 1 < 0 || $('#lblDiscountValue').text() == "") ||
            ($('#lblDiscountPercentage').text() * 1 < 0 || $('#lblDiscountPercentage').text() == "") ||
            ($('#lblNetPriceValue').text() * 1 < 0 || $('#lblNetPriceValue').text() == "") ||
            ($('#lblPriceValue').text() * 1 < 0 || $('#lblPriceValue').text() == "") ||
        ($('#lblLocalPriceValue').text() * 1 < 0 || $('#lblLocalPriceValue').text() == "")
    ) {
        swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
        _Suceess = false;

    }
    //if (IsNull($('#lblPrintedPriceValue').text(), "0") != "0" && parseFloat($('#lblPrintedPriceValue').text()) != 0 && parseFloat($('#lblPrintedPriceValue').text()) != parseFloat($('#lblNetPriceValue').text())) {

    //    swal('Excuse me', 'Printed Amount (For Customer) [' + $('#lblPrintedPriceValue').text() + '] Must Equal Invoice Amount [' + $('#lblNetPriceValue').text() +']', 'warning');
    //    _Suceess = false;
    //}

    if ($('#tblItems > tbody > tr').length == 0)//&& $('#tbExpenses > tbody > tr').length == 0)
    {
        swal('Excuse me', 'You must insert Items or Services', 'warning');
        _Suceess = false;
    }
    else {
        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
                var storeid = IsNull( $(tr).find('td.StoreID ').find('.selectstore').val() , "0");
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var discount = $(tr).find('td.Discount').find('.input_discount').val();
                var UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();
                var ItemUnitID = $(tr).find('td.UnitID').find('.selectunit').val();
                var CostCenterID = IsNull( $(tr).find('td.CostCenterID').find('.selectcostcenter').val() , "0");


                //if ((storeid.trim() == "" || storeid.trim() == "0" || storeid == null) && $(tr).attr('tag') == "item") {
                //    swal('Excuse me', 'Fill All Stores', 'warning');
                //    _Suceess = false;
                //    return false;
                //}
                if ((itemid.trim() == "" || itemid.trim() == "0" || itemid == null) && $(tr).attr('tag') == "item") {
                    swal('Excuse me', 'Fill  Items', 'warning');
                    _Suceess = false;
                    return false;
                }
                //if ((CostCenterID.trim() == "" || CostCenterID.trim() == "0" || CostCenterID == null)) {
                //    swal('Excuse me', 'Fill  Cost Center', 'warning');
                //    _Suceess = false;
                //    return false;
                //}
                if ((ItemUnitID == null || ItemUnitID.trim() == "" || ItemUnitID.trim() == "0") && $(tr).attr('tag') == "item") {
                    swal('Excuse me', 'Fill  Items Units', 'warning');
                    _Suceess = false;
                    return false;
                }
                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                    swal('Excuse me', 'Fill  Services', 'warning');
                    _Suceess = false;
                    return false;
                }
                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
                    swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    _Suceess = false;
                    return false;
                }
                if (discount.trim() == "" || discount.trim() == "0" || discount == null) {
                    $(tr).find('td.Discount').find('.input_discount').val("0");
                }

                if (UnitPrice.trim() == "" || UnitPrice.trim() == "0" || UnitPrice == null) {
                    if (pDefaults.UnEditableCompanyName != "ERP") {
                        swal('Excuse me', 'Insert Services Price', 'warning');
                        _Suceess = false;
                        return false;
                    }
                   
                }
                if (parseFloat(UnitPrice.trim()) < parseFloat(discount.trim())) {
                    swal('Sorry', 'Cannot Insert Negative or empty Amount', 'warning');
                    _Suceess = false;
                    return false;
                }

            });
        }

        //-------------------------------------------------------------------------------------------------
        if ($('#tblExpenses > tbody > tr').length > 0) {

            $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
                debugger;
                var expensesid = $(tr).find('td.ExpensesID').find('.selectExpenses').val();
                var expensesamount = $(tr).find('td.Amount').find('.inputamount').val();
                if (expensesid.trim() == "" || expensesid.trim() == "0" || expensesid == null) {
                    swal('Excuse me', 'Fill All Expenses', 'warning');
                    _Suceess = false;
                    return false;
                }
                if (expensesamount.trim() == "" || expensesamount.trim() == "0" || expensesamount == null) {
                    swal('Excuse me', 'Insert Expenses Amount', 'warning');
                    _Suceess = false;
                    return false;
                }

            });
        }
        //--------------------------------------------------------------------------------------------------
        if ($('#tblTaxes > tbody > tr').length > 0) {

            $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
                debugger;
                var taxid = $(tr).find('td.TaxID').find('.selectTaxes').val();
                if (taxid.trim() == "" || taxid.trim() == "0" || taxid == null) {
                    swal('Excuse me', 'Fill All Taxes', 'warning');
                    _Suceess = false;
                    return false;
                }

            });
        }

    }

    console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        FadePageCover(true);
        setTimeout(function () {
            FadePageCover(true);
            debugger;
            $.ajax({
                type: "GET",
                url: "/api/SL_Invoices/A_CheckIfInvoiceInPayments",
                data: { pID: $('#hID').val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (pData) {
                    if (pData[0] != "") {
                        swal("Sorry", "You Must Delete Payment First");
                        FadePageCover(false);
                    }
                    else {
                        InsertUpdateFunctionAndReturnID_Special("form", "/api/SL_Invoices/Save",
                                   GetInsertUpdateParameters()
                                   , pSaveandAddNew, null, '#hID', function () {
                                       // if (data[0] != 0) { 
                                       // swal($('#hID').val());
                                       ListOfListOfObject = [];
                                       ListOfListOfObject.push(SetArrayOfItems());
                                       ListOfListOfObject.push(SetArrayOfExpenses());
                                       ListOfListOfObject.push(SetArrayOfTaxes());
                                       InsertUpdateListOfObject("/api/SL_Invoices/InsertItems",
                                           ListOfListOfObject
                                           , pSaveandAddNew, "SL_InvoicesModal", function (data) {
                                               FadePageCover(true);
                                               setTimeout(function () {
                                                   //if ($("#cbIsFromTrans").is(":checked")) {
                                                   //    InsertUpdateFunction3("form", "/api/SL_Invoices/InsertItems",
                                                   //        JSON.stringify(SetArrayOfTrans())
                                                   //        , pSaveandAddNew, "SC_TransactionsModal", function (Code) {
                                                   //            // $('#txtCode').val(Code[1]);
                                                   //            //PrintTransaction();

                                                   //            console.log(Code[0]);
                                                   //            setTimeout(function () {
                                                   //                //SC_Transactions_LoadingWithPaging();
                                                   //                ////  IntializeData();
                                                   //                //ClearAllTableRows('tblItems');
                                                   //                //all_has_store = false;
                                                   //                PrintInvoice($('#hID').val());
                                                   //                SL_Invoices_LoadingWithPaging();
                                                   //            }, 500);

                                                   //        });

                                                   //}
                                                   //else {
                                                   FadePageCover(true);
                                                  // PrintInvoice($('#hID').val());

                                                   PrintInvoiceForClient($('#hID').val());
                                                   SL_Invoices_LoadingWithPaging();
                                                   //  }

                                                   //  IntializeData();
                                               }, 300);

                                           });
                                       // }
                                   });
                    }
                }
            });
            ///////////////

        }, 30);
        //setTimeout(function () {

        //    InsertUpdateFunctionAndReturnID("form", "/api/SL_Invoices/Save",
        //        GetInsertUpdateParameters()
        //        , pSaveandAddNew, null, '#hID', function () {
        //           // swal($('#hID').val());
        //            var ListOfListOfObject = [];
        //            ListOfListOfObject.push(SetArrayOfItems());
        //            ListOfListOfObject.push(SetArrayOfExpenses());
        //            ListOfListOfObject.push(SetArrayOfTaxes());
        //            InsertUpdateListOfObject("/api/SL_Invoices/InsertItems",
        //                ListOfListOfObject
        //                , pSaveandAddNew, "SL_InvoicesModal", function (message) {
        //                    PrintInvoice($('#hID').val());
        //                    setTimeout(function () {
        //                        SL_Invoices_LoadingWithPaging();
        //                        IntializeData();
        //                    }, 300);

        //                });
        //        });

        //}, 30);
    }
}

function InsertUpdateFunctionAndReturnID_Special(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, phID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "GET",
            url: strServerURL + pFunctionName,
            data: pParametersWithValues,
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
                        swal(strSorry, "the date must >= Good Receipt Note Date [or] is not approved");
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
function SL_Invoices_Delete() {
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
        function ()
        {
            InsertUpdateFunction("form", "/api/SL_Invoices/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "SL_InvoicesModal", function (data) {
                    if (data[1].trim() == '') {
                        SL_Invoices_LoadingWithPaging();
                        IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}





//#endregion Header




var ItemsRowsCounter = 0;
//#region HelpedFunctions
function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}


function round1(value, precision) {
    var aPrecision = Math.pow(10, precision);
    return Math.round(value * aPrecision) / aPrecision;
}

function GetWH_PackageTypeBarCode(RowID, ItemSelect) {
    debugger;
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        //var tr = $(ItemSelect).closest("tr");
        //var SelectUnit = $(tr).find("select.selectunit");
        //var UnitID = $(tr).find("td.UnitID").attr("val");
        //var ItemID = $(tr).find('td.ItemID .selectitem').val();

        var ItemID = $("#Item-" + RowID).val();


        var pParametersWithValues = {
            pPurchaseItemID: ItemID

        };
        CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadPackageTypeBarCode", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                if (pDefaults.UnEditableCompanyName == 'GHA') {
                    //FillListFromObject_BarCode(null, 10, "<--Select-->", ($("#BarCode-" + RowID)), pData[0], null);

                    FillListFromObject_BarCode(null, 10, "<--Select-->", ("slBarCode" + RowID), pData[0], null);
                    //Fill_SelectInputAfterLoadData_WithMultiAttr(pData[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#hidden_BarCode', '', 'BarCode');


                    //$("#slPayable" + ID).css({ "width": "100%" }).select2();
                }


                FadePageCover(false);
            }
            , null);

    }
    //else {
    //    $('#slChargeType' + ID).html($('#slChargeType').html());
    //}


    debugger;


}

function FillListFromObject_BarCode(pID, pCodeOrName, pStrFirstRow, pSlName, pData, callback) {
    ClearAllOptions(pSlName);
    debugger;
    var option = "";
    if (pStrFirstRow != "" && pStrFirstRow != null)
        option = '<option value="">' + pStrFirstRow + '</option>';
    // Bind Data
    $.each(JSON.parse(pData), function (i, item) {
        if (pID != null && pID != undefined) //in case of editing
            if (pID == item.ID)
                option += '<option ID=' + item.ID + ' value="' + item.ID + '" selected >' + item.BarCode + '</option>';
            else
                option += '<option ID=' + item.ID + ' value="' + item.ID + '">' + item.BarCode + '</option>';
        else
            option += '<option ID=' + item.ID + ' value="' + item.ID + '">' + item.BarCode + '</option>';
    });

    $("#" + pSlName).append(option);
    if (callback != null && callback != undefined)
        callback();

}

function GetItemPrice(ItemSelect) {

    debugger;
    // لو الكنترول اللي اتعمل عليه هو منتج او عميل
    // في الاضافة و التعديل
    if (ItemSelect != null && ItemSelect != "undefined" && ( $(ItemSelect).is(".client"))) {
        $("#tblItems tbody tr").each(function (i, tr) {

            var ItemID = $(tr).find('td.ItemID .selectitem').val();
            var price = CalculateItemPrice(tr, ItemID);
            CalculateItemTax(tr, ItemID, price);
            // بنجيب السعر من قائمة الاسعار
            // لو مفيش في قايمة السعر بيجيب السعر الافتراضي

            $(tr).find('td.UnitPrice input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
            $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));


        });

    }
    else if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem"))) {

        console.log(' Item Changed ');

        var tr = $(ItemSelect).closest('tr');
        var ItemID = $(ItemSelect).val();
        var price = CalculateItemPrice(tr, ItemID);
        CalculateItemTax(tr, ItemID, price);
        // بنجيب السعر من قائمة الاسعار
        // لو مفيش في قايمة السعر بيجيب السعر الافتراضي
        $(tr).find('td.UnitPrice input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
        $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));

        $(tr).addClass("GivenFromPriceList");
        setTimeout(function () {
            $(tr).find('td.Qty input[type="text"]').trigger('focus');
            $(tr).find('td.Qty input[type="text"]').trigger('click');
            if (pDefaults.UnEditableCompanyName != "GHA") {
                GetLastThreeItemPrices(ItemSelect);

            }
        }, 300);

    }
    else if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".input_unitprice")))
    {
        var tr = $(ItemSelect).closest('tr');
        var price = $(tr).find('td.UnitPrice input[type="text"]').val();
        $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
        CalculateItemTax(tr, ItemID, price);

        setTimeout(function () {


            $(tr).find('td.StoreID select').trigger('focus');
            $(tr).find('td.StoreID select').trigger('click');


           // $(tr).find('td.UnitPrice input[type="text"]').trigger('blur');
           // $(tr).find('td.UnitPrice input[type="text"]').trigger('blur');
        }, 300);

    }
    else if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".input_quantity")))
    {
        var tr = $(ItemSelect).closest('tr');
        var price = $(tr).find('td.UnitPrice input[type="text"]').val();
        $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
        CalculateItemTax(tr, ItemID, price);

        setTimeout(function ()
        {
            $(tr).find('td.UnitPrice input[type="text"]').trigger('focus');
            $(tr).find('td.UnitPrice input[type="text"]').trigger('click');
        }, 300);

    }
    else  if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".inputprinted_price")))
    {
        var price = $(tr).find('td.Printed_Price input[type="text"]').val();
        $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));

        CalculateItemTax(tr, ItemID, price);
    }


        // بيحصل مثلا لو انا اخترت اذن اضافة
        // لما انا بجيب المنتجات من العملية بحط السعر من قائمة الاسعار او السعر الافتراضي
        // بخليه يطبق اول مرا بس من قائمة السعر  في كل عملية حساب عشان لو هو غير السعر 
        // احنا من الاخر مش عايزين كل مرا يحسب تفاصيل الفاتورة يشوف سعر المنتج من خارج اللي مكتوب في الفاتورة
    else if ($('#hID').val() == "0" || $('#hID').val() == "") {
        $("#tblItems tbody tr").each(function (i, tr) {
            if ($(tr).hasClass("GivenFromPriceList") == false) //مدخلش قبل كدا من قايمة سعر
            {


                setTimeout(function () {
                    var ItemID = $(tr).find('td.ItemID .selectitem').val();
                    
                    
                    var price = CalculateItemPrice(tr, ItemID);
                    $(tr).find('td.UnitPrice input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
                    $(tr).find('td.Printed_Price input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));

                    $(tr).addClass("GivenFromPriceList");
                    CalculateItemTax(tr, ItemID, price);
                    if (i == $("#tblItems tbody tr").length - 1) {
                        CalculateAll();

                    }

                }, 300);
            }
            else
            {
                setTimeout(function () {
                    var ItemID = $(tr).find('td.ItemID .selectitem').val();
                    var UnitPrice = $(tr).find('td.UnitPrice input').val();

                    CalculateItemTax(tr, ItemID, UnitPrice);

                }, 400);

            }
        });

    }

    //////get unit price by item and client ahmed maher
    //$("#tblItems tbody tr").each(function (i, tr) {
    //    debugger;
    //    var ItemID = $(tr).find('td.ItemID .selectitem').val();
    //        $.ajax({
    //            type: "GET",
    //            url: "/api/SL_Invoices/GetLastUnitPriceByItemAndClientName",
    //            data: { pClientID: $('#slClientID').val(), pItemID: ItemID },
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (pData) {
    //                if (pData != "") {
    //                    $(tr).find('td.LastUnitPrice input[type="text"]').val(pData[0]);
    //                    $(tr).find('td.CurrentPriceList input[type="text"]').val(pData[1]);


    //                }

    //            }
    //        });
          
    //    });

    /////////

}


function CalculateItemTax(tr, ItemID , price) {


    var TaxAmount = 0.0000;

    if ($('#tblTaxes > tbody > tr').length > 0) {

        $('#tblTaxes > tbody > tr').each(function (tax_i, tax_tr) {

            var TaxPercentageValue = $(tax_tr).find('td.TaxValue input').val();

            TaxAmount = TaxAmount + ((round1(price, 5) * (round1(TaxPercentageValue, 5) / 100)) * round1($(tr).find('td.Qty input').val(), 5) );


            if ($('#tblTaxes > tbody > tr').length - 1 == tax_i) {

                $(tr).find('td.itemtaxes').text(round1(TaxAmount , 2));
                $(tr).find('td.TaxPrice').html((parseFloat(TaxAmount)) + (parseFloat(price) * round1($(tr).find('td.Qty input').val(), 5)));            }

        });
    }
    else {
        $(tr).find('td.itemtaxes').text(round1(TaxAmount , 2 ));
        $(tr).find('td.TaxPrice').html((parseFloat(TaxAmount) ) +( parseFloat(price) * round1($(tr).find('td.Qty input').val(), 5)));

    }




    //if ($('#cbDiscountBeforeTax').is(':checked')) {
    //    if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

    //        if ($('#slDiscountType').val() == "10") //%
    //        {
    //            var Discount = (Total * 1 * ($('#txtDiscount').val() / 100));
    //            $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));
    //        }
    //        else {
    //            var Discount = $('#txtDiscount').val() * 1;
    //            $(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));

    //        }
    //    }
    //}
    //else {
    //    $(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(5));
    //}



}

function CalculateItemPrice(tr, ItemID)
{
    var SelectedItemOption = $(tr).find('td.ItemID .selectitem option[value="' + ItemID + '"]');
    var PriceListID = $('#slClientID option:selected').attr('lockinguserid');
    //-------------------------------------------------------------------------------
    var PriceListValue = $('#hidden_slPriceListItems option[ItemID="' + ItemID + '"][PriceListID="' + PriceListID + '"]').attr("Price");
    var ItemOriginalPrice = IsNull($(SelectedItemOption).attr('Price'), 0.00);
    var ItemLastSalesPrice = IsNull($(SelectedItemOption).attr('LastSalePrice'), 0.00);
    var priceFromPriceList = $('#hReadySlOptions option[value="2120"]').attr("OptionValue") == "true" /*percentage*/ ? round1(ItemOriginalPrice, 4) + ((round1(ItemOriginalPrice, 4) * round1(PriceListValue, 4)) / 100) : PriceListValue;

    $(tr).find('td.CurrentPriceList').text(IsNull(priceFromPriceList , 0.00));
    priceFromPriceList = IsNull(priceFromPriceList, ItemOriginalPrice);


    //-------------------------------------------------------------------------------
    var price = 0.00;
    if ($('#hReadySlOptions option[value="2121"]').attr("OptionValue") == "true") // Is Last Sales Price
    {

        price = IsNull(ItemLastSalesPrice, priceFromPriceList);

        return price;
    }
    else
    {
        price = priceFromPriceList;
        return price;
    }

}
function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");
        var ItemID = $(tr).find('td.ItemID .selectitem').val();
        if (ItemID != "0" && ItemID != 0)
        {
            var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

            //if (UnitID == 0 || UnitID == "0")
            //  {
            var a = Units.indexOf("-1");
            $(SelectUnit).val(Units[a - 1]);

            setTimeout(function () {
                $(tr).find(".inputprinted_unit").val($(SelectUnit).find('option:selected').text());
            }, 300);
        }
       

        //    }
    }
}
function SetPrintedItemName(ItemSelect) {
    if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem") || $(ItemSelect).is(".selectservice") ) )
    {
        var tr = $(ItemSelect).closest("tr");
        
        $(tr).find(".inputprinted_itemname").val($(ItemSelect).find('option:selected').text());
    }
}
function SetPrintedItemQty(InputQty) {
    if (InputQty != null && InputQty != "undefined" && ($(InputQty).is(".input_quantity"))) {
        var tr = $(InputQty).closest("tr");

        $(tr).find(".inputprinted_qty").val($(InputQty).val());
    }
}
function SetPrintedItemNameAsGroupName(THIS)
{
    debugger
                setTimeout(function () {
                    
                    var tr = $(THIS).closest("tr");
                    var SelectedItemInputOption = $(tr).find(".selectitem option:selected");
                    if ($(tr).find('.cbPrintedAsGroupName').is(':checked') && $(tr).attr('tag') == 'item') {
                        $(tr).find(".inputprinted_itemname").val(IsNull($(SelectedItemInputOption).attr('itemgroupname') , ""));
                        $(tr).find(".inputprinted_itemname").prop('disabled', true);
                    }
                    else {
                        $(tr).find(".inputprinted_itemname").prop('disabled', false);
                    }
            }, 300);

          
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
//#endregion HelpedFunctions





function gettax(pRowIndex)
{
    if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true") {
        if ($("#isDefault-" + pRowIndex).prop('checked') == true) {


            $("#Item-" + pRowIndex).html($("#hidden_slItemsTax").html());
        }
        else if ($("#isDefault-" + pRowIndex).prop('checked') == false) {


            $("#Item-" + pRowIndex).html($("#hidden_slItemsnoTax").html());
        }
    }
    else {
        $("#Item-" + pRowIndex).html($("#hidden_slItems").html());
    }
    debugger;

}

//#region Items
function AddNewItemsRow(type)
{
    
    debugger;
    var _Suceess = true;

    if ($('#slClientID').val() == "" || $('#slClientID').val() == "0") {
        //swal('Excuse me', 'Select Client First', 'warning');

        $('#slClientID').select2('open');
        _Suceess = false;
    }
    else if ($('#slTypeID').val() == "" || $('#slTypeID').val() == "0" || $('#slTypeID').val() == null) {
        $('#slTypeID').select2('open');
        _Suceess = false;
    }
    else if ($('#slPaymentMethodID').val() == "" || $('#slPaymentMethodID').val() == "0" || $('#slPaymentMethodID').val() == null) {
        $('#slPaymentMethodID').select2('open');
        _Suceess = false;
    }

    

    if (_Suceess == true) {
        if (type == 1) {
            if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
                var leftPos = $("#Itemtable-responsive").scrollLeft();
                $("#Itemtable-responsive").animate({ scrollLeft: leftPos + 2000 }, 100);
                
            }
            else {

                $("#Itemtable-responsive").scrollLeft();
            }

         
            debugger;
            var CurrentIndex = (ItemsRowsCounter + 1);
            AppendRowtoTable("tblItems",
                ("<tr ID='" + 0 + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"

                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='isDefault'> <input type='checkbox' onchange='gettax("+(ItemsRowsCounter + 1)+")' id ='isDefault-" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectisDefault'/></td>"

                    + "<td class='ItemID ' val='" + "0" + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this);GetLastThreePurshaseInvoicesByItemIDForModal(this);' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                     //+ "<td class='ItemSearch' style='width:3%; padding:6px 0px 6px 0px;' val=''><button id='btnItemSearch' class='btn btn-sm btn-lightblue m-t-xmd' type='button' onclick='ChangeItem(" + (ItemsRowsCounter + 1) + ");'><i class='fa fa-search'></i></button> </td>"
                   //  + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='ItemSearch(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-search'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                     + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-ItemsSearch-" + (ItemsRowsCounter + 1) + "' type='button' onclick='ItemSearch(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-lightblue m-t-xmd'><i class='fa fa-search'></i></button><button id='btn-UndoDeleteDetails' type='button' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"

                    + "<td class='PrintedAsGroupName ' val='" + "0" + "'>" + "<input type='checkbox' onchange='SetPrintedItemNameAsGroupName(this);' id='cbPrintedAsGroupName-" + (ItemsRowsCounter + 1) + "' class='cbPrintedAsGroupName' />" + "</td>"

                  + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='LastUnitPrice hide' val='" + "0" + "'>" + "<input   type='text' class='input_Lastunitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='CurrentPriceList' val='" + "0" + "'>" + ""+ "</td>"
                    + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + "0" + "'>" + "<input    type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='itemtaxes' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='TaxPrice' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + "0" + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp;</span></button><span class='span_quantity'></span>" + "</td>"

                    + "<td class='Discount' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"


                    + "<td class='CostCenterID hide' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_ItemName hide' val='" + "-" + "'>" + "<input tag='" + "-" + "' type='text' class='inputprinted_itemname input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Unit hide' val='" + "-" + "'>" + "<input tag='" + "-" + "' type='text' class='inputprinted_unit input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Price hide' val='" + 0 + "'>" + "<input tag='" + "0" + "' type='text' class='inputprinted_price input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Qty hide' val='" + 0 + "'>" + "<input tag='" + "0" + "' type='text' class='inputprinted_qty input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Total hide' val='" + 0 + "'>" + "<input tag='" + 0 + "' type='text' class='inputprinted_total input-sm  col-sm'>" + "</td>"
                    + "<td class='BarCode'  val=''><select id='slBarCode" + (ItemsRowsCounter + 1) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"

                    + "</tr>"));

            

            setTimeout(function () {
            $("tr[tag='item'] select.selectitem").each(function (i, sl) {
                if ($(sl).hasClass('IsAutoSelect') == false) {
                    $(sl).html($('#hidden_slItems').html());
                    $(sl).css({ 'width': '100%' }).select2();
                    $(sl).addClass('IsAutoSelect');
                   // $(sl).trigger("change");
                    $("div[tabindex='-1']").removeAttr('tabindex');

                    setTimeout(function () {
                       // $(sl).select2('open');
                    //    ItemSearch(CurrentIndex)

                        $(sl).closest('tr').find('td.Qty input').keydown(function (e)
                        {
                            if (e.keyCode == 13 ) {
                                e.preventDefault();
                                CalculateAll(this);
                            }
                            else if (e.keyCode == 40) {
                                e.preventDefault();
                                
                            }
                            else
                                return;
                        });
                        $(sl).closest('tr').find('td.UnitPrice input').keydown(function (e) {
                            if (e.keyCode == 13) {
                                e.preventDefault();
                                CalculateAll(this);

                            }
                            else if (e.keyCode == 40) {
                                e.preventDefault();

                            }
                            else
                                return;
                        });
                    }, 300);
                  //  $(sl).select2('open');

                }

                //if (IsNull($(sl).val(), "0") == "0") {

                //    $(sl).select2('open');
                //}
                //if (i == $("select.selectitem").length - 1)
                //{

                //    $('#Item-' + (CurrentIndex) + '').select2('open');
                //}



            });
            
            }, 300);

        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + 0 + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='isDefault'> <input type='checkbox' onchange='gettax(" + (ItemsRowsCounter + 1) + ")' id ='isDefault-" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectisDefault'/></td>"
                    + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-ItemsSearch-" + (ItemsRowsCounter + 1) + "' type='button' onclick='ItemSearch(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-lightblue m-t-xmd'><i class='fa fa-search'></i></button><button id='btn-UndoDeleteDetails' type='button' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='PrintedAsGroupName ' val='" + "0" + "'>" + "<input type='checkbox' onchange='SetPrintedItemNameAsGroupName(this);' id='cbPrintedAsGroupName-" + (ItemsRowsCounter + 1) + "' class='cbPrintedAsGroupName' />" + "</td>"
                    + "<td class='LastUnitPrice hide' val='" + "0" + "'>" + "<input   type='text' class='input_Lastunitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='CurrentPriceList' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + "0" + "'>" + "<input   type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='itemtaxes' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='Price' val='" + "0" + "'>" + "" + "</td>"
                    + "<td class='TaxPrice' val='" + "0" + "'>" + "" + "</td>"

                    + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + "0" + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + "0" + "'>" + "<button disabled='disabled' id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp;</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='Discount' val='" + "0" + "'>" + "<input   type='text' class='input_discount input-sm  col-sm'>" + "</td>"

                    + "<td class='CostCenterID hide' val='" + "0" + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes hide' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_ItemName hide' val='" + "-" + "'>" + "<input tag='" + "-" + "' type='text' class='inputprinted_itemname input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Unit hide' val='" + "-" + "'>" + "<input tag='" + "-" + "' type='text' class='inputprinted_unit input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Price hide' val='" + 0 + "'>" + "<input tag='" + "0" + "' type='text' class='inputprinted_price input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Qty hide' val='" + 0 + "'>" + "<input tag='" + "0" + "' type='text' class='inputprinted_qty input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Total hide' val='" + 0 + "'>" + "<input tag='" + 0 + "' type='text' class='inputprinted_total input-sm  col-sm'>" + "</td>"
                    + "<td class='BarCode'  val=''><select id='slBarCode" + (ItemsRowsCounter + 1) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"

                    + "</tr>"));

        }
        $('#tblItems > tbody > tr').find('td.Qty > input , td.Printed_Qty > input').inputmask('decimal', { digits: 2 });
        $('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input , td.Printed_Price > input').inputmask('decimal', { digits: 5 });

        $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);GetLastThreePurshaseInvoicesByItemIDForModal(this);GetWH_PackageTypeBarCode( "' + (ItemsRowsCounter + 1) + '",this)');
        ItemsRowsCounter++;



        //$("#tblItems").find("select").attr('onchange', 'GetLastThreePurshaseInvoicesByItemIDForModal(this);');
       // $("#tblItems").find("select").attr('onchange', 'Fillhidden_slItemsWithTaxNontax(this);');


        $("#tblItems").find("input,button,textarea").not('.cbPrintedAsGroupName,.btn-lightblue,.inputnotes,.inputprinted_itemname,.inputprinted_unit').attr('onblur', 'CalculateAll(this);');
        if (pDefaults.UnEditableCompanyName != "GHA") {
            $("#tblItems").find(".input_unitprice").attr('onfocus', 'GetLastThreeItemPricesAfterFocusPrice(this);');

        }
        // Start Auto Filter
        //$("#Item-" + ItemsRowsCounter).css({ "width": "100%" }).select2();
        //  }

        //$("#slCurrency" + maxDetailsIDInTable).html($("#slCurrencyDetails").html()); //to get the exchangerate
        //$("#Item-" + ItemsRowsCounter).html($("#Item-").html());
        //$("#Item-" + ItemsRowsCounter).val($("#Item-" + (ItemsRowsCounter - 1)).val() == undefined ? 0 : $("#Item-" + (ItemsRowsCounter - 1)).val());

        //if (pDefaults.UnEditableCompanyName == "ERP") {
        //Start Auto Filter

      //  $("div[tabindex='-1']").removeAttr('tabindex');
      //  $("#Item-" + ItemsRowsCounter).trigger("change");


   

        //End Auto Filter

        //// Start Auto Filter
        //$("div[tabindex='-1']").removeAttr('tabindex');

        //$("#Item-" + ItemsRowsCounter).html($("#Item-" + ItemsRowsCounter).html());


        //$("#Item-" + ItemsRowsCounter).css({ "width": "100%" }).select2();
        //$("div[tabindex='-1']").removeAttr('tabindex');
        //$("#Item-" + ItemsRowsCounter).trigger("change");



        ////End Auto Filter
    }
    if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true") {
        $("#Item-" + ItemsRowsCounter).html($("#hidden_slItemsnoTax").html());
        $(".isDefault").removeClass("hide");
        $("#isDefault").removeClass('hide');
        $(".isDefaultClass").removeClass("hide");
        $("#isDefaultClass").removeClass('hide');
    }
    else {
        $("#Item-" + ItemsRowsCounter).html($("#hidden_slItems").html());
        $(".isDefault").addClass("hide");
        $("#isDefault").addClass('hide');
        $(".isDefaultClass").addClass("hide");
        $("#isDefaultClass").addClass('hide');

    }
    //$("#hidden_slItemsnoTax" + ItemsRowsCounter).html($("#hidden_slItems").html());


    //if (pDefaults.IsERP == false) {
    //    $(".LastUnitPrice").addClass("hide");
    //    $("#LastUnitPrice").addClass('hide');

    //}
    //else {
    //    $(".LastUnitPrice").removeClass("hide");
    //    $("#LastUnitPrice").removeClass("hide");
    //}

}
var SearchText = "";
var currentID = "";
var lastInputTimeStamp;
//$(document).on('keyup', 'input.select2-search__field', function (e) {
//    debugger;

//    if (currentID != this.parentElement.nextElementSibling.children[0].id) {
//        currentID = this.parentElement.nextElementSibling.children[0].id;
//        SearchText = "";
//    }


//    if (lastInputTimeStamp != e.originalEvent.timeStamp) {
//        if (e.keyCode == 8 || e.charCode == 8)  // backspace pressed
//        {
//            SearchText = SearchText.slice(0, -1)
//        }
//        else if (e.key.length == 1) {
//            SearchText += e.key;
//            //setTimeout(function () {
//            //    // to prevent repeated inputs
//            //}, 50);
//        }
//    }
//    lastInputTimeStamp = e.originalEvent.timeStamp
   
//});

//document.onkeydown = function (evt) {
//    debugger;

//    evt = evt || window.event;
//    if (evt.shiftKey && evt.key == "F8") {

//    }
//};
//function ChangeItem(pID) {
//    debugger;
//    //filterByText('slOperation', 'slOperation' + pID, SearchText);
//    OperationID = $("#Item-3 option[itemtypeid='6']").val();
//    $("#Item-" + pID).html("");
//    if (OperationID != undefined) {
//        let option = $("#Item option[itemtypeid='6']");
//        $("#Item-" + pID).append(option.clone());
//        //$("#slOperation" + pID).append(option);
//        $("#Item-" + pID).val(OperationID);
//        $("#Item-" + pID).trigger("change");
//    }

//    SearchText = "";

//}
function SL_InvoicesDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)) {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID) + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                     + "<td class='isDefault' val='" + true + "'> <input type='checkbox' onchange='gettax(" + (ItemsRowsCounter + 1) + ")' id ='isDefault-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectisDefault'/></td>"
                     + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem'>" + "" /*$('#hidden_slItems').html()*/ + "</select>" + "</td>"

                   + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-ItemsSearch-" + (ItemsRowsCounter + 1) + "' type='button' onclick='ItemSearch(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-lightblue m-t-xmd'><i class='fa fa-search'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='PrintedAsGroupName ' val='" + "0" + "'>" + "<input onchange='SetPrintedItemNameAsGroupName(this);' type='checkbox' id='cbPrintedAsGroupName-" + (ItemsRowsCounter + 1) + "' class='cbPrintedAsGroupName' />" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

                   + "<td class='LastUnitPrice hide' val='" + "0" + "'>" + "<input   type='text' class='input_Lastunitprice input-sm  col-sm'>" + "</td>"
                    //+ "<td class='LastUnitPrice' val='" + (typeof item.LastUnitPrice === 'undefined' ? "0" : item.LastUnitPrice) + "'>" + "<input tag='" + item.LastUnitPrice + "'   type='text' class='input_LastUnitPrice input-sm  col-sm'>" + "</td>"
                    + "<td class='CurrentPriceList' val='" + IsNull(item.D_ItemPriceListPrice, 0.00) + "'>" + IsNull(item.D_ItemPriceListPrice, 0.00) + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + (typeof item.D_UnitPrice === 'undefined' ? 0 : item.D_UnitPrice) + "'>" + "<input tag='" + (typeof item.D_UnitPrice === 'undefined' ? 0 : item.D_UnitPrice) + "'  type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='itemtaxes' val='" + IsNull(item.D_TotalTaxAmount, 0.00) + "'>" + IsNull(item.D_TotalTaxAmount, 0.00) + "</td>"
                    + "<td class='Price' val='" + 0 + "'>" + 0 + "</td>"
                    + "<td class='TaxPrice' val='" + 0 + "'>" + 0 + "</td>"

                   + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select id='store-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + item.QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp;</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='Discount' val='" + (typeof item.D_Discount === 'undefined' ? "0" : item.D_Discount) + "'>" + "<input tag='" + item.D_Discount + "'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"

                    + "<td class='AveragePrice hide' val='" + item.AveragePrice + "'>" + item.AveragePrice + "</td>"
                    + "<td class='CostCenterID hide' val='" + (typeof item.D_CostCenterID === 'undefined' ? "0" : item.D_CostCenterID) + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.D_CostCenterID === 'undefined' ? "0" : item.D_CostCenterID) + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes hide' val='" + "" /*(typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes)*/ + "'>" + "<input tag='" + "" /*(typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes)*/ + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

                    + "<td class='Printed_ItemName hide' val='" + (typeof item.Printed_ItemName === 'undefined' ? "-" : item.Printed_ItemName) + "'>" + "<input tag='" + (typeof item.Printed_ItemName === 'undefined' ? "-" : item.Printed_ItemName) + "' type='text' class='inputprinted_itemname input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Unit hide' val='" + (typeof item.Printed_Unit === 'undefined' ? "-" : item.Printed_Unit) + "'>" + "<input tag='" + (typeof item.Printed_Unit === 'undefined' ? "-" : item.Printed_Unit) + "' type='text' class='inputprinted_unit input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Price hide' val='" + (typeof item.Printed_Price === 'undefined' ? "0" : item.Printed_Price) + "'>" + "<input tag='" + (typeof item.Printed_Price === 'undefined' ? "0" : item.Printed_Price) + "' type='text' class='inputprinted_price input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Qty hide' val='" + (typeof item.Printed_Qty === 'undefined' ? "0" : item.Printed_Qty) + "'>" + "<input tag='" + (typeof item.Printed_Qty === 'undefined' ? "0" : item.Printed_Qty) + "' type='text' class='inputprinted_qty input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Total hide' val='" + 0 + "'>" + "<input tag='" + 0 + "' type='text' class='inputprinted_total input-sm  col-sm'>" + "</td>"
                    + "<td class='BarCode' style='min-width: 108px' val=''><select tag='" + (item.BarCode == 0 ? "" : item.BarCode) + "' id='slBarCode" + (ItemsRowsCounter + 1) + "' style='width:100%;'  class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + $('#hidden_BarCode').html() + "</select></td>"

                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + item.D_ID + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.D_ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                     + "<td class='isDefault' val='" + true + "'> <input type='checkbox' onchange='gettax(" + (ItemsRowsCounter + 1) + ")' id ='isDefault-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectisDefault'/></td>"

                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"

                    + "<td class='ServiceID' val='" + item.D_ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.D_ServiceID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-ItemsSearch-" + (ItemsRowsCounter + 1) + "' type='button' onclick='ItemSearch(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-lightblue m-t-xmd'><i class='fa fa-search'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='PrintedAsGroupName ' val='" + "0" + "'>" + "<input onchange='SetPrintedItemNameAsGroupName(this);' type='checkbox' id='cbPrintedAsGroupName-" + (ItemsRowsCounter + 1) + "' class='cbPrintedAsGroupName' />" + "</td>"

                    + "<td class='LastUnitPrice hide' val='" + "0" + "'>" + "<input   type='text' class='input_Lastunitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='CurrentPriceList' val='" + IsNull(item.D_ItemPriceListPrice, 0.00) + "'>" + IsNull(item.D_ItemPriceListPrice, 0.00)  + "</td>"
                    + "<td class='Qty' val='" + item.D_Qty + "'>" + "<input tag='" + item.D_Qty + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitPrice' val='" + item.D_UnitPrice + "'>" + "<input tag='" + item.D_UnitPrice + "' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
                    + "<td class='itemtaxes' val='" + IsNull(item.D_TotalTaxAmount, 0.00) + "'>" + IsNull(item.D_TotalTaxAmount, 0.00) + "</td>"
                    + "<td class='Price' val='" + item.D_Price + "'>" + item.D_Price + "</td>"
                    + "<td class='TaxPrice' val='" + (item.D_UnitPrice + IsNull(item.D_TotalTaxAmount, 0.00)) + "'>" + (item.D_UnitPrice + IsNull(item.D_TotalTaxAmount, 0.00))  + "</td>"

                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='StoreID' val='" + 0 + "'>" + "<select disabled='disabled' id='store-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectstore'>" + $('#slStores').html() + "</select>" + "</td>"
                    + "<td class='QuantityInStore' val='" + item.D_QuantityInStore + "'>" + "<button id='btn-Quantity-" + (ItemsRowsCounter + 1) + "' type='button' onclick='GetItemQuantityInStore(this);' class='btn btn-sm btn-lightblue'><span class='fa fa-calculator'>&nbsp;</span></button><span class='span_quantity'></span>" + "</td>"
                    + "<td class='Discount' val='" + item.D_Discount + "'>" + "<input tag='" + item.D_Discount + "'   type='text' class='input_discount input-sm  col-sm'>" + "</td>"
                    + "<td class='AveragePrice hide' val='" + item.AveragePrice + "'>" + item.AveragePrice + "</td>"
                    + "<td class='CostCenterID hide' val='" + item.D_CostCenterID + "'>" + "<select id='costcenter-" + (ItemsRowsCounter + 1) + "' tag='" + item.D_CostCenterID + "' class='input-sm  col-sm selectcostcenter'>" + $('#slCostCenter_ID').html() + "</select>" + "</td>"
                    + "<td class='Notes hide' val='" + "" /*item.Notes*/ + "'>" + "<input tag='" + "" /*item.D_Notes*/ + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_ItemName hide' val='" + (typeof item.Printed_ItemName === 'undefined' ? "-" : item.Printed_ItemName) + "'>" + "<input tag='" + (typeof item.Printed_ItemName === 'undefined' ? "-" : item.Printed_ItemName) + "' type='text' class='inputprinted_itemname input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Unit hide' val='" + (typeof item.Printed_Unit === 'undefined' ? "-" : item.Printed_Unit) + "'>" + "<input tag='" + (typeof item.Printed_Unit === 'undefined' ? "-" : item.Printed_Unit) + "' type='text' class='inputprinted_unit input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Price hide' val='" + (typeof item.Printed_Price === 'undefined' ? "0" : item.Printed_Price) + "'>" + "<input tag='" + (typeof item.Printed_Price === 'undefined' ? "0" : item.Printed_Price) + "' type='text' class='inputprinted_price input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Qty hide' val='" + (typeof item.Printed_Qty === 'undefined' ? "0" : item.Printed_Qty) + "'>" + "<input tag='" + (typeof item.Printed_Qty === 'undefined' ? "0" : item.Printed_Qty) + "' type='text' class='inputprinted_qty input-sm  col-sm'>" + "</td>"
                    + "<td class='Printed_Total hide' val='" + 0 + "'>" + "<input tag='" + 0 + "' type='text' class='inputprinted_total input-sm  col-sm'>" + "</td>"
                    //+ "<td class='BarCode' style='min-width: 108px' val=''><select tag='" + (item.BarCode == 0 ? "" : item.BarCode) + "' id='slBarCode" + item.ID + "' style='width:100%;'  class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + $('#hidden_BarCode').html() + "</select></td>"
                    + "<td class='BarCode'  val=''><select id='slBarCode" + (item.ID) + "'class='controlStyle slBarCode' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);'  data-required='false'>" + "<option value=0></option>" + "</select></td>"

                    + "</tr>"));
        }
        var ItemIndex = (ItemsRowsCounter + 1);
       

        $('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input , td.Printed_Price > input').inputmask('decimal', { digits: 5 });
        $('#tblItems > tbody > tr').find('td.Qty > input , td.Printed_Qty > input').inputmask('decimal', { digits: 2 });
        $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);GetWH_PackageTypeBarCode( "' + (ItemsRowsCounter + 1) + '",this)');
        ItemsRowsCounter++;

        $("#tblItems").find("input,button,textarea").not('.cbPrintedAsGroupName,.btn-lightblue,.inputnotes,.inputprinted_itemname,.inputprinted_unit').attr('onblur', 'CalculateAll(this);');
        if (pDefaults.UnEditableCompanyName != "GHA") {
            $("#tblItems").find(".input_unitprice").attr('onfocus', 'GetLastThreeItemPricesAfterFocusPrice(this);');

        }

       // $("#tblItems").find("input,button,textarea").not('.cbPrintedAsGroupName').attr('onblur', 'CalculateAll(this);');
        //---------------------------------------------------------------------------------
      //  $("#Item-" + ItemsRowsCounter).html($("#hidden_slItems").html());
        if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true")
        {
            if ($("#isDefault-" + ItemIndex).prop('checked') == true)
            {
                $("#Item-" + ItemIndex).html($("#hidden_slItemsTax").html());
            }
            else if ($("#isDefault-" + ItemIndex).prop('checked') == false)
            {

                $("#Item-" + ItemIndex).html($("#hidden_slItemsnoTax").html());
            }
        }
        else
        {
            $("#Item-" + ItemIndex).html($("#hidden_slItems").html());
        }

        //  $("#Item-" + ItemIndex).html($("#hidden_slItems").html());

        //---------------------------------------------------------------------------------

        setTimeout(function ()
        {
            
            if (JSON.parse(pItems).length - 1 == i)
            {
                FillItemsData();
            }
        }, 1000);

    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {
    //    FillItemsData();
    //    //  SL_HideShowEditBtns(_IsApproved);
    //}, 1000);
    if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true") {
       // $("#Item-" + ItemsRowsCounter).html($("#hidden_slItemsnoTax").html());
        $(".isDefault").removeClass("hide");
        $("#isDefault").removeClass('hide');
        $(".isDefaultClass").removeClass("hide");
        $("#isDefaultClass").removeClass('hide');
    }
    else {
       // $("#Item-" + ItemsRowsCounter).html($("#hidden_slItems").html());
        $(".isDefault").addClass("hide");
        $("#isDefault").addClass('hide');
        $(".isDefaultClass").addClass("hide");
        $("#isDefaultClass").addClass('hide');

    }
    //if (pDefaults.IsERP == false) {
    //    //$(".classHideslSalesmenComb").removeClass("hide");
    //    //$(".classSL_SalesManOption").addClass("hide");
    //    //$("#stepsSL_SalesMan").addClass('hide');
    //    //$("#stepsSL_Regions").addClass('hide');
    //    $(".LastUnitPrice").addClass("hide");
    //    $("#LastUnitPrice").addClass('hide');

    //}
    //else {
    //    $(".LastUnitPrice").removeClass("hide");
    //    $("#LastUnitPrice").removeClass("hide");

       

    //}
}
function FillItemsData()
{
    if ($('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)
    // FadePageCover(true)
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
       // $(tr).find('td.LastUnitPrice ').find('.input_discount').val($(tr).find('td.LastUnitPrice ').find('.input_Lastunitprice').attr('tag'));
        debugger;

       // gettax($(tr).find('td.isDefault').find('.selectisDefault').attr('tag'));
        $("#isDefault-" + $(tr).find('td.isDefault').find('.selectisDefault').attr('tag')).prop('checked', ($(tr).find('td.ItemID  select').find('option:selected').attr('ItemTypeID')) == 6 ? true : false);
        //-------------------------------------------------------------------------------------------------
        var pRowIndex = $(tr).find('td.isDefault').find('.selectisDefault').attr('tag');
        //----------------------------------------------------------------------------------------------------

        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));


        

        $(tr).find('td.Printed_ItemName').find('.inputprinted_itemname').val($(tr).find('td.Printed_ItemName ').find('.inputprinted_itemname').attr('tag'));
        $(tr).find('td.Printed_Unit').find('.inputprinted_unit').val($(tr).find('td.Printed_Unit').find('.inputprinted_unit').attr('tag'));
        $(tr).find('td.Printed_Qty ').find('.inputprinted_qty').val($(tr).find('td.Printed_Qty').find('.inputprinted_qty').attr('tag'));

        debugger                         
        $(tr).find('td.Printed_Price ').find('.inputprinted_price').val($(tr).find('td.Printed_Price').find('.inputprinted_price').attr('tag'));

         


        if ($(tr).attr('tag') == "item" && $(tr).find('td.Printed_ItemName ').find('.inputprinted_itemname').attr('tag') == $(tr).find('td.ItemID ').find('.selectitem option:selected').attr('itemgroupname')) {
            $(tr).find('.cbPrintedAsGroupName').prop('checked', true);
            $(tr).find('.inputprinted_itemname').prop('disabled', true);
        }

        //if ($('#hID').val() == "" || $('#hID').val() == "0") {

        //    var ItemID = $(tr).find('td.ItemID .selectitem').val();
        //    console.log(ItemID + " ItemID")
        //    var PriceListID = $('#slClientID option:selected').attr('lockinguserid');
        //    console.log(PriceListID + " PriceListID")
        //    var price = $('#hidden_slPriceListItems option[ItemID="' + ItemID + '"][PriceListID="' + PriceListID + '"]').attr("Price");
        //    console.log(price + " price")
        //    $(tr).find('td.UnitPrice input[type="text"]').val(((price == null || typeof price === "undefined") ? "0" : price));
        //}
        //else {
      //  $(tr).find('td.Printed_Price ').find('.inputprinted_price').val($(tr).find('td.Printed_price').find('.inputprinted_price').attr('tag'));
        $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
        //$(tr).find('td.BarCode ').find('.slBarCode').val($(tr).find('td.BarCode ').find('.slBarCode').attr('tag'));

        //FILTER BARCODE


        var pParametersWithValues = {
            pPurchaseItemID: $(tr).find('td.ItemID ').find('.selectitem').attr('tag')

        };
        CallGETFunctionWithParameters("/api/I_ItemsGroups/LoadPackageTypeBarCode", pParametersWithValues
            , function (pData) {
                var dd = pData[0];
                if (pDefaults.UnEditableCompanyName == 'GHA') {
                    //FillListFromObject_BarCode(null, 10, "<--Select-->", ($("#BarCode-" + RowID)), pData[0], null);

                    FillListFromObject_BarCode(null, 10, "<--Select-->", ("slBarCode" + pRowIndex), pData[0], null);
                    //Fill_SelectInputAfterLoadData_WithMultiAttr(pData[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#hidden_BarCode', '', 'BarCode');
                    $(tr).find('td.BarCode ').find('.slBarCode').val($(tr).find('td.BarCode ').find('.slBarCode').attr('tag'));

                    //$("#slPayable" + ID).css({ "width": "100%" }).select2();
                }


                FadePageCover(false);
            }
            , null);
        // }

        if ($('#tblItems > tbody > tr').length - 1 == i) {

            $("select.selectitem").each(function (i, sl) {
                if ($(sl).hasClass('IsAutoSelect') == false) {
                    $(sl).css({ 'width': '100%' }).select2();
                    $(sl).addClass('IsAutoSelect');
                   // $(sl).trigger("change");
                    $("div[tabindex='-1']").removeAttr('tabindex');
                }

            });
            //  CalculateAll();
            FadePageCover(false)
        }

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
            data: { pItemID: itemid, pStoreID: storeid, pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pTransactionID:"0" },
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


function SL_InvoicesDetails_DeleteList() {
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
                DeleteListFunction("/api/SL_Invoices/DeleteItems", { "pSL_InvoicesDetailsIDs": GetAllSelectedIDsAsString('tblSL_InvoicesDetails') }, function () { SL_InvoicesDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(This) {
    debugger;
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
        CalculateAll();
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
                CalculateAll();
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

function SetArrayOfItems() {
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;



        //"ID": "0",
        //    "ItemID": "0",
        //    "ServiceID": "2",
        //    "Price": 20,
        //    "Discount": "0",
        //    "TotalPrice": "20.00",
        //    "StoreID": "0",
        //    "InvoiceID": "6",
        //    "Notes": "",
        //    "Qty": "1",
        //    "RemainQuantity": "1",
        //    "UnitPrice": "20",
        //    "CostCenterID": "0",
        //    "AveragePrice": "",
        //    "ItemQty": "1",
        //    "UnitID": "0",
        //    "UnitFactor": 0,
        //        "PartnerRemainedQty": 0



        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
        objItem.Price = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
        objItem.Discount = $(tr).find('td.Discount').find('.input_discount').val();
        objItem.TotalPrice = $(tr).find('td.Price').text();
        objItem.StoreID = IsNull( $(tr).find('td.StoreID').find('.selectstore').val() , "0");
        objItem.InvoiceID = $('#hID').val();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.RemainQuantity = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.UnitPrice = $(tr).find('td.UnitPrice').find('.input_unitprice').val();
        objItem.CostCenterID =IsNull( $(tr).find('td.CostCenterID').find('.selectcostcenter').val() , "0");

        objItem.AveragePrice = ($(tr).find('td.AveragePrice').text().trim() == "" ? "0" : $(tr).find('td.AveragePrice').text().trim());
        objItem.ItemQty = $(tr).find('td.Qty').find('.input_quantity').val();
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val();
        objItem.UnitFactor = 0;

        objItem.PartnerRemainedQty = 0;


        objItem.Printed_ItemName = CheckIfEmpty($(tr).find('td.Printed_ItemName').find('.inputprinted_itemname').val(), "0") ;
        objItem.Printed_Price = CheckIfEmpty($(tr).find('td.Printed_Price').find('.inputprinted_price').val(), "0");
        objItem.Printed_Unit = CheckIfEmpty($(tr).find('td.Printed_Unit').find('.inputprinted_unit').val(), "0") ;
        objItem.Printed_Qty = CheckIfEmpty($(tr).find('td.Printed_Qty').find('.inputprinted_qty').val(), "0") ;

        objItem.BarCode = ($(tr).find('td.BarCode').find('.slBarCode').val() == undefined || $(tr).find('td.BarCode').find('.slBarCode').val() == null) ? "0" : $(tr).find('td.BarCode').find('.slBarCode').val();

        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}


//#endregion Items


function CheckIfEmpty(instr, outstr)
{
    var res = outstr;
    if (typeof instr !== "undefined" && instr != null && instr != "")
        res = instr;

    return res;
    
}


//#region Details
function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/SL_Invoices/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Invoices_BindTableRows(pTabelRows); SL_Invoices_ClearAllControls(); });
    // HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";





function SetArrayOfTrans()
{
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = "0";
        objItem.TransactionID = $('#slTransaction').val();
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.StoreID = $(tr).find('td.StoreID').find('.selectstore').val();
        objItem.ReturnedQty = "0";
        objItem.CurrencyID = $('#slCurrencyID').val();
        objItem.ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.PurchaseInvoiceDetailsID = "0";
        objItem.SLInvoiceDetailsID = "0";
        objItem.SubAccountID = "0";
        objItem.OriginalQty = "0";
        objItem.ParentID = "0";
        objItem.AveragePrice = $(tr).find('td.AveragePrice').text();//($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
        objItem.TransactionDate = ConvertDateFormat(GetDateFromServer($('#slTransaction').find('option:selected').attr('TransactionDate')));
        objItem.QtyFactor = "-1";
        objItem.ActualQty = "0";
        objItem.TransactionTypeID = "20";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        objItem.Qty = $(tr).find('td.Qty').find('.input_quantity').val();// quantity after convert
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val(); // selected unit
        objItem.ItemQty = $(tr).find('td.Qty').find('.input_quantity').val(); // inserted quantity
        objItem.UnitFactor = 1;
        objItem.TaxAmount = "0";
        objItem.DiscountAmount = "0";
        objItem.InvoicePrice = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * 1) - ($(tr).find('td.Discount ').find('.input_discount').val() * 1);
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
function SetArrayOfExpenses()
{
    var arrayOfItems = new Array();
    $("#tblExpenses>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.InvoiceID = $('#hID').val();
        objItem.ExpensesID = $(tr).find('td.ExpensesID').find('.selectExpenses').val(); 
        objItem.Amount = $(tr).find('td.Amount').find('.inputamount').val(); 
        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
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
        objItem.InvoiceID = $('#hID').val();
        objItem.IsPercentage = true;
       arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}




var all_has_store = false;



function GetItemAmount(ITEM)
{
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(Tax).closest('tr');
    var ItemPrice = 0;
    var Printed_price = 0;
    console.log($(tr).attr('tag'));
    // if ($(tr).attr('tag') == 'item')
    //    ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    //else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();
        Printed_price = $(tr).find('td.Printed_Price input[type="text"]').val();

    var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    var quantity = $(tr).find('td.Qty input[type="text"]').val();
    var printed_quantity = $(tr).find('td.Printed_Qty input[type="text"]').val();
    var discount = $(tr).find('td.Discount input[type="text"]').val();


    //if ($(tr).attr('tag') == 'item')
    //{
    //    if (ItemPrice * 1 <= 0)
    //    {
    //        $(tr).find('td.UnitPrice input[type="text"]').val(($(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1 /*/ ExchangeRate * 1*/));
    //    }
    //    else
    //    {
    //        //----- -----------
    //        $(tr).find('td.UnitPrice input[type="text"]').val((ItemPrice * 1 /*/ ExchangeRate * 1*/));
    //        //----- ------------
    //    }
    //    ItemPrice = (ItemPrice * 1  )// / ExchangeRate * 1);

    //}
  


   // if ($(tr).attr('tag') == 'item')
   


    if (discount.trim() == "" || discount.trim() == "0")
        ItemPrice = ItemPrice;
    else
        ItemPrice = (ItemPrice * 1) - (discount * 1);
    //-----------------------
    var TotalPrice = 0;
    var TotalPrintedPrice = 0;
    //---------------------------------------------------------------------------------------- SET QTY = 0
    if (quantity.trim() == "" || quantity.trim() == "0") {

        if ($('#hDefaultUnEditableCompanyName').val() == "ALW") {

            $(tr).find('td.Qty input[type="text"]').val(0);
            TotalPrice = (0) * (ItemPrice * 0);
        }
        else {
            $(tr).find('td.Qty input[type="text"]').val(1)
            TotalPrice = (1) * (ItemPrice * 1);

        }

    }
    else
        TotalPrice = (quantity * 1) * (ItemPrice * 1);


    if (printed_quantity.trim() == "" || printed_quantity.trim() == "0")
    {
        $(tr).find('td.Printed_Qty input[type="text"]').val(1)
        TotalPrintedPrice = (1) * (Printed_price * 1);
    }
    else
        TotalPrintedPrice = (printed_quantity * 1) * (Printed_price * 1);
    //--------------------

   // + "<td class='UnitPrice' val='" + "0" + "'>" + "<input disabled='disabled' type='text' class='input_unitprice input-sm  col-sm'>" + "</td>"
    if ($(tr).attr('tag') == 'item')
        $(tr).find('td.Price').html((TotalPrice).toFixed(5));
    else
        $(tr).find('td.Price').html((TotalPrice * 1).toFixed(5));


    if ($(tr).attr('tag') == 'item')
        $(tr).find('td.Printed_Total').html((TotalPrintedPrice).toFixed(5));
    else
        $(tr).find('td.Printed_Total').html((TotalPrintedPrice * 1).toFixed(5));
    
    if (!$(ITEM).is('tr'))
        CalculateTotalItems();




    return $(tr).find('td.Price').text();

}


function CalculateTotalItems()
{
    _TotalItems = 0.00000;
    if ($('#tblItems > tbody > tr').length == 0)
        $('#lblTotalItems').text('0.00000')
    $('#tblItems > tbody > tr').each(function (i, tr)
    {
         var tr_Total = 0.00000;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text()*1.00).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr').length - 1 == (i))
        {
            $('#lblTotalItems').text(_TotalItems.toFixed(5));

        }
    });
}


function GetTotalItemsOnly()
{
    _TotalItems = 0.00000;
    if ($('#tblItems > tbody > tr[tag="item"]').length <= 0)
        $('#lblTotalItems_I').text("0.00000");
    $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
        var tr_Total = 0.00000;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00000).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="item"]').length - 1 == (i)) {
          $('#lblTotalItems_I').text(_TotalItems.toFixed(5));
        }
    });
}
function GetTotalServicesOnly() {
    _TotalItems = 0.00000;
    if ($('#tblItems > tbody > tr[tag="service"]').length <= 0)
        $('#lblTotalItems_S').text("0.00000");
    $('#tblItems > tbody > tr[tag="service"]').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.Price').text() != "" && $(tr).find('td.Price').text() != null && $(tr).find('td.Price').text() != "undefined")
            tr_Total = ($(tr).find('td.Price').text() * 1.00000).toFixed(5);
        _TotalItems = (_TotalItems + tr_Total * 1);
        if ($('#tblItems > tbody > tr[tag="service"]').length - 1 == (i)) {
            $('#lblTotalItems_S').text(_TotalItems.toFixed(5));
        }
    });
}

//#endregion Details

//#region Expenses

var ExpensesRowsCounter = 0;

function AddNewExpensesRow() {
    debugger;
    AppendRowtoTable("tblExpenses",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-info' style='font-size:15px;'> E </td>"
            + "<td class='ID hide'> <input  name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='ExpensesID ' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Expense-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
            + "<td class='Amount ' val='" + "0" + "'>" + "<input   onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
            + "</tr>"));

    ExpensesRowsCounter++;
    $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', {digits:5});
}

function FillExpensesData()
{
    if ($('#tblExpenses > tbody > tr').length > 0)
    FadePageCover(true)
    $($('#tblExpenses > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
        $(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));
        if ($('#tblExpenses > tbody > tr').length - 1 == i)
        {

          //  CalculateAll();
            FadePageCover(false)
        }
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function SL_InvoicesExpenses_BindTableRows(pItems) {
    ExpensesRowsCounter = 0;
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblExpenses");
    $.each(JSON.parse(pItems), function (i, item) {
    
        AppendRowtoTable("tblExpenses",
            ("<tr ID='" + item.InvoiceExpencesID + "' isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + item.InvoiceExpencesID + "'>"
                + " <td class='btn-info' style='font-size:15px;'> E </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ExpensesRowsCounter + 1) + "'> <button tag='" + item.ID + "'  id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ExpensesID ' val='" + item.ExpensesID + "'>" + "<select onchange='CalculateAll();' id='Expense-" + (ExpensesRowsCounter + 1) + "' tag='" + item.ExpensesID+ "' class='input-sm  col-sm selectExpenses'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                + "<td class='Amount ' val='" + item.Amount + "'>" + "<input tag='" + item.Amount +"'  onblur='CalculateAll();' type='text' class='inputamount input-sm  col-sm'> </td>"
                + "</tr>"));
      
        ExpensesRowsCounter++;
        $('#tblExpenses > tbody > tr').find('td.Amount > input').inputmask('decimal', { digits: 5 });


        if (JSON.parse(pItems).length - 1 == i) {
            FillExpensesData();
        }
    });

    //setTimeout(function () {
        
    //    //  SL_HideShowEditBtns(_IsApproved);
    //}, 1000);

}

function CalculateTotalExpenses(callback)
{
    debugger
    _TotalExpenses = 0.00;
    if ($('#tblExpenses > tbody > tr').length == 0) {
        $('#lblTotalExpenses').text('0.00000')

        if (typeof callback === "function")
            callback();
    }
    $('#tblExpenses > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00000;
        if ($(tr).find('td.Amount > input').val() != "" && $(tr).find('td.Amount > input').val() != null && $(tr).find('td.Amount > input').val() != "undefined")
            tr_Total = ($(tr).find('td.Amount > input').val() * 1.00000).toFixed(5);
        _TotalExpenses = (_TotalExpenses + tr_Total * 1);
        if ($('#tblExpenses > tbody > tr').length - 1 == (i)) {
            $('#lblTotalExpenses').text(_TotalExpenses.toFixed(5));


            if (typeof callback === "function")
                callback();

        }
    });




}

function DeleteExpenses(RowsNo) {

    if ($("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
        $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
        ExpensesRowsCounter = ExpensesRowsCounter - 1;
        CalculateAll();

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
                $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
                ExpensesRowsCounter = ExpensesRowsCounter - 1;
                CalculateAll();
            });

    }

}

//#endregion Expenses

//#region Taxes

var TaxesRowsCounter = 0;

function AddNewTaxesRow(callback) {
    debugger;
    AppendRowtoTable("tblTaxes",
        ("<tr ID='" + 0 + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-success' style='font-size:15px;'> T </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TaxID' val='" + "0" + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
            + "<td class='TaxValue' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
            + "<td class='TaxAmount' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
            + "<td class='IsPercentage hide' val='true'>true</td>"
            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });
  

    if (typeof callback !== "undefined")
    {
        callback('#Tax-' + (TaxesRowsCounter + 1));
        TaxesRowsCounter++;
    }
    else
    {

        TaxesRowsCounter++;
    }

    
}

function SetVatTaxesAutomatic(THIS_InvoiceTypeInput)
{
    if (IsNull($('#hID').val(), "0") == "0" && $('#tblTaxes > tbody > tr').length == 0 && $(THIS_InvoiceTypeInput).find('option:selected').attr('code') == 'sl_forward')
    {
        AddNewTaxesRow(function (sltaxid) {

            $(sltaxid).val($('#hidden_slTaxes option[currentpercentage=14]').attr('value'));
            $(sltaxid).trigger('change');
        });
    }


}





function FillTaxesData() {
    if ($('#tblTaxes > tbody > tr').length > 0)
        FadePageCover(true)


    $($('#tblTaxes > tbody > tr')).each(function (i, tr)
    {
        $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
        $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
        $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));

        if ($('#tblTaxes > tbody > tr').length - 1 == i)
        {

           // CalculateAll();
            FadePageCover(false)
        }
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function SL_InvoicesTaxes_BindTableRows(pItems)
{
    TaxesRowsCounter = 0;
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblTaxes");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblTaxes",
            ("<tr ID='" + item.InvoiceTaxesID + "' isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.InvoiceTaxesID + "'>"
                + " <td class='btn-success' style='font-size:15px;'> T </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID  + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
                + "<td class='IsPercentage hide' val='true'>true</td>"
                + "</tr>"));
        $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 5 });
        TaxesRowsCounter++;


        if (JSON.parse(pItems).length - 1 == i) {
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
        CalculateAll();

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
                CalculateAll();
            });

    }

}

function GetTaxAmount(Tax)
{
    var tr = null;
    if ($(Tax).is('tr'))
        tr = Tax;
        else 
     tr = $(Tax).closest('tr');
    var TaxValue = 0;
    TaxValue = $(tr).find('td.TaxID  select').find('option:selected').attr('currentpercentage') * 1;
    $(tr).find('td.TaxValue').val(TaxValue);

    var ItemAmount = $('#lblTotalItems').text()*1;
    var ItemExpenses = $('#lblTotalExpenses').text()*1;
    var Total = ItemAmount + ItemExpenses;


    if ($('#cbDiscountBeforeTax').is(':checked')) {
        if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

            if ($('#slDiscountType').val() == "10") //%
            {
                var Discount = (Total * 1 * ($('#txtDiscount').val() / 100));
                $(tr).find('td.TaxAmount > input').val(((Total ) * (TaxValue / 100)).toFixed(5));
                //$(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));

            }
            else
            {
                var Discount = $('#txtDiscount').val()*1;
                $(tr).find('td.TaxAmount > input').val(((Total ) * (TaxValue / 100)).toFixed(5));
                //$(tr).find('td.TaxAmount > input').val(((Total - Discount) * (TaxValue / 100)).toFixed(5));


            }
        }
    }
    else
    {
        $(tr).find('td.TaxAmount > input').val((Total * (TaxValue / 100)).toFixed(5));
    }
            
   
    $(tr).find('td.TaxValue > input').val(TaxValue.toFixed(5));

    if (!$(Tax).is('tr'))
    CalculateTotalTaxes();



    return ($(tr).find('td.TaxAmount > input').val()*1.00 * ($(tr).find('td.TaxID  select').find('option:selected').attr('isdebitaccount') == "false" ? 1 : -1));




}



function CalculateTotalTaxes()
{

    debugger
    _TotalTaxes = 0.00000;
    if ($('#tblTaxes > tbody > tr').length == 0)
        $('#lblTotalTaxes').text('0.00000')
    $('#tblTaxes > tbody > tr').each(function (i, tr) {
        var tr_Total = 0.00;
        if ($(tr).find('td.TaxAmount > input').val() != "" && $(tr).find('td.TaxAmount > input').val() != null && $(tr).find('td.TaxAmount > input').val() != "undefined")
            tr_Total = ($(tr).find('td.TaxAmount > input').val() * 1.00000).toFixed(5);
        _TotalTaxes = (_TotalTaxes + tr_Total * 1);
        if ($('#tblTaxes > tbody > tr').length - 1 == (i))
        {
            $('#lblTotalTaxes').text(_TotalTaxes.toFixed(5)); 
        }
    });

}

//#endregion Taxes

//#region Calculate




function CalculateAll(THIS)
{
    debugger;

    // THIS :  هو اي عنصر اتغير في تفاصيل الفاتورة  العدد-السعر-الخدمه-المنتج-الضريبه-المصاريف-الخصم
    SetItemUnit(THIS);

    SetPrintedItemName(THIS);

    // بيجيب السعر من ** قايمة الاسعار او اخر سعر بيع(اوبشن) **  لو لسا هنضيف جديد او من السعر اللي ادخلناه في الفاتورة لو هنعمل تعديل
    GetItemPrice(THIS);

    SetPrintedItemNameAsGroupName(THIS);


    SetPrintedItemQty(THIS);

    FadePageCover(true);
    var TotalItemsPrice = 0.00000;
    var TotalTaxesPrice = 0.00000;

    // لو فيه منتجات
    if ($('#tblItems > tbody > tr').length > 0) {
        $('#tblItems > tbody > tr').each(function (i_items, tr_items) {

            TotalItemsPrice = ((TotalItemsPrice * 1) + (GetItemAmount(tr_items) * 1)).toFixed(5);

            $('#lblTotalItems').text(TotalItemsPrice);

            if ($('#tblItems > tbody > tr').length - 1 == i_items) {
                
                CalculateTotalExpenses(function () {

                    if ($('#tblTaxes> tbody > tr').length > 0) {
                        $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {
                            // بنجيب مجموع الضرائب
                            TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(5);
                            if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
                                $('#lblTotalTaxes').text(TotalTaxesPrice);
                                CalculateFinalAmount();
                                // $('#lblNetPriceValue').text($('#lblTotalItems').text());
                                 FadePageCover(false);

                            }
                        });
                    }
                    else {

                        $('#lblTotalTaxes').text('0.00000');
                        CalculateFinalAmount();
                        FadePageCover(false);
                    }

                });

            }





        });
        
    }
    else
    {
        $('#lblTotalItems').text('0.00000')
        CalculateTotalExpenses(function () {

            if ($('#tblTaxes> tbody > tr').length > 0) {
                $('#tblTaxes> tbody > tr').each(function (i_taxes, tr_taxes) {

                    TotalTaxesPrice = (TotalTaxesPrice * 1 + (GetTaxAmount(tr_taxes) * 1)).toFixed(5);
                    if ($('#tblTaxes > tbody > tr').length - 1 == i_taxes) {
                        $('#lblTotalTaxes').text(TotalTaxesPrice);
                        CalculateFinalAmount();
                        FadePageCover(false);
                    }
                });
            }
            else
            {

                $('#lblTotalTaxes').text('0.00000');
                CalculateFinalAmount();
               
                FadePageCover(false);
            }

        });



    }
    
}







function CalculateFinalAmount()
{

    $('#lblNetPriceValue').text(($('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1).toFixed(5));

    if ($('#txtDiscount').val().trim() != "" && $('#txtDiscount').val().trim() != "0") {

        if ($('#slDiscountType').val() == "10") //%
        {
            if ($('#cbDiscountBeforeTax').is(':checked')) {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1; //+ $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100));
                var _DiscountPercentage = $('#txtDiscount').val();
                var _FinalAmount = (_Amount - _DiscountValue) + ($('#lblTotalTaxes').text() * 1);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);


            }
            else {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = (_Amount * 1 * ($('#txtDiscount').val() / 100));
                var _DiscountPercentage = $('#txtDiscount').val();
                var _FinalAmount = (_Amount - _DiscountValue);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);
            }
        }
        else //F
        {
            if ($('#cbDiscountBeforeTax').is(':checked')) {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1; //+ $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = ($('#txtDiscount').val());
                var _DiscountPercentage = ($('#txtDiscount').val() * 1 * 100) / _Amount;
                //-----
                var _FinalAmount = (_Amount - _DiscountValue) + ($('#lblTotalTaxes').text() * 1);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');

                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);

            }
            else {
                var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
                var _DiscountValue = ($('#txtDiscount').val());
                var _DiscountPercentage = ($('#txtDiscount').val() * 1 * 100) / _Amount;
                var _FinalAmount = (_Amount - _DiscountValue);
                var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
                FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);
            }

        }






    }
    else
    {
        var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;
        var _DiscountValue = '0.00000';
        var _DiscountPercentage = '0.00000';
        var _FinalAmount = (_Amount);
        var _ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
        FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate);

    }

}


function FillFinalAmounts(_Amount, _DiscountValue, _DiscountPercentage, _FinalAmount, _ExchangeRate)
{
    GetTotalItemsOnly();
    GetTotalServicesOnly();
    console.log(_Amount);
    console.log(_DiscountValue);
    console.log(_DiscountPercentage);
    console.log(_FinalAmount);
    console.log(_ExchangeRate);
    $('#lblPriceValue').text(parseFloat(_FinalAmount).toFixed(5));
    $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(5));
    $('#lblDiscountPercentage').text(parseFloat(_DiscountPercentage).toFixed(5));
    $('#lblLocalPriceValue').text((parseFloat((_FinalAmount * 1 * _ExchangeRate*1)).toFixed(5) /** parseFloat((_ExchangeRate * 1)).toFixed(2)*/));




    var _TotalPrinted = 0.0000;
    $('#tblItems > tbody tr').each(function (ptri, ptr) {
        
        _TotalPrinted = _TotalPrinted + parseFloat(  parseFloat(IsNull($(ptr).find('td.Printed_Total').text() , "0")).toFixed(5));


        if ($('#tblItems > tbody tr').length - 1 == ptri)
        $('#lblPrintedPriceValue').text(parseFloat(_TotalPrinted).toFixed(5));
    });





}

//#endregion Calculate






















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
                        //        $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");

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

function SalesManCombo_GetList(pID,Type) {//
    debugger;
    //if ($("#slClientID").val() != null && $("#slClientID").val() != "" && $("#slClientID").val() !="0") {
    //    SalesMan_GetList($("slClientID").val(), Type);
    //    Regions_GetList($("slClientID").val(), Type);


    //}

}
function SalesMan_GetList(pID, Type) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;

    var pWhereClause = " WHERE 1=1";
    pWhereClause += " and CustomerID=" + $("#slClientID").val();
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/CustomerSL_SalesMan/LoadSalesManByCustomerID",
        data: { pWhereClause: pWhereClause, pClientID: $("#slClientID").val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            if (d[0].replace('[]', '') != "") {
                Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'Name', '<-- SELECT SalesMan -->', '#slSalesMan', '', 'isDefault');
                if (Type==1) {
                    $('#slSalesMan').val(ID1);

                }
                else {
                    $('#slSalesMan').val(d[1]);

                }
            }
            else {
                $('#slSalesMan').val("0");

            }
           
          
      
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);


        }
    });;
}

function Regions_GetList(pID, Type) {//the first parameter is used in case of editing to set the code or name to its original value
    debugger;

    var pWhereClause = " WHERE 1=1";
    pWhereClause += " and CustomerID=" + $("#slClientID").val();
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/CustomerSL_Regions/LoadRegionsByCustomerID",
        data: { pWhereClause: pWhereClause, pClientID: $("#slClientID").val(), pDate: ConvertDateFormat($('#txtInvoiceDate').val())},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            if (d[0].replace('[]', '') != "") {
                Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'Name', '<-- SELECT Regions -->', '#slRegions', '', 'isDefault');
                if (Type == 1) {
                    console.log(' Inv Type = 1')
                    $('#slRegions').val(ID2);
                    $('#slPaymentMethodID').val(ID3);
                    $('#slPaymentMethodID').trigger('change');
                $("#txtBalance").val(d[3]);


                }
                else {
                    console.log(' Inv Type else')
                    $('#slRegions').val(d[1]);
                    $('#slPaymentMethodID').val(IsNull(d[2], ID3 ));
                    $('#slPaymentMethodID').trigger('change');
                    $("#txtBalance").val(d[3]);

                }
            }
            else if (d[2].replace('[]', '') != "") {
                console.log(' d[2].replace(\'[]\', \'\') != "" ')
                $('#slPaymentMethodID').val(IsNull(d[2] , ID3));
                $('#slPaymentMethodID').trigger('change');
                $("#txtBalance").val(d[3]);

            }
            else if (d[3].replace('[]', '') != "") {
                $("#txtBalance").val(d[3]);
            }
            else {
                console.log('else d[2].replace(\'[]\', \'\') != "" ')
                $('#slRegions').val("0");
                $('#slPaymentMethodID').val("0");
                $('#slPaymentMethodID').trigger('change');

            }

           

        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);


        }
    });;
}
function Fillhidden_slItemsWithTaxNontax(ItemSelect)
{

}



function GetLastThreeItemPrices(ItemSelect)
{
   // if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem") || $(ItemSelect).is(".client"))) {
        ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");
   // }

    var ItemID = $(ItemSelect).val();

    var pWhereClause = ItemID;
    var pOrderBy = " ID ";
    LoadWithPagingForModal("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pData) {
            GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData);
            ItemIDs = ItemID + ",";
        });


}
function GetLastThreeItemPricesAfterFocusPrice(THIS) {
    // if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem") || $(ItemSelect).is(".client"))) {
    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");
    // }
    var tr = $(THIS).closest('tr');
    var ItemID = $(tr).find("td.ItemID select").val(); //  $(ItemSelect).val();

    var pWhereClause = ItemID;
    var pOrderBy = " ID ";
    LoadWithPagingForModal("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pData) {
            GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData);
            ItemIDs = ItemID + ",";
        });


}
//xxxxxx
function GetLastThreePurshaseInvoicesByItemIDForModal(ItemSelect) {//pID = ID and it is the search key which will be used in the where clause
    //debugger;
    //var ItemIDs = "";
    //if (ItemSelect != null && ItemSelect != "undefined" && ($(ItemSelect).is(".selectitem") || $(ItemSelect).is(".client"))) {
    //    ClearAllTableRows("tblGetLastThreePurshaseInvoicesByItemID");

    //    $("#tblItems tbody tr").each(function (i, tr) {

    //        var ItemID = $(tr).find('td.ItemID .selectitem').val();
    //        //var pParametersWithValues = {
    //        //    pItemID: ItemID
    //        //};
    //        //CallGETFunctionWithParameters("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pParametersWithValues
    //        //       , function (pData) {
    //        //           GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData);

    //        //       }
    //        //       , null);

    
    //            var pWhereClause = ItemID;
    //            var pOrderBy = " ID ";
    //            LoadWithPagingForModal("/api/SL_Invoices/GetLastThreePurshaseInvoicesByItemID", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
    //                 , function (pData) {
    //                     GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData); //TaxeTypes_ClearAllControls();
    //                     ItemIDs = ItemID + ",";

    //                     //strBindTableRowsFunctionName = "Customers_BindTableRows";
    //                 });
            


    //    });




    //}

   
}
function GetLastThreePurshaseInvoicesByItemID_BindTableRows(pData) {
    debugger;
   // if ($('#hReadySlOptions option[value="2037"]').attr("OptionValue") == "true") {
        $('#isErp').show()

        //ClearAllTableRows("tblCustomerNetwork");
        // $("#tblGetLastThreePurshaseInvoicesByItemID tbody tr").html("");
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        $.each(pData, function (i, item) {
            AppendRowtoTable("tblGetLastThreePurshaseInvoicesByItemID",
                ("<tr ID='" + item.ID + "'>"
                    //("<tr ID='" + item.ID + "'>"
                    + "<td class='ItemName'>" + item.ItemName + "</td>"
                    + "<td style='color:red;' class='InvoiceDate'><b>" + item.InvoiceDate + "</b></td>"
                    + "<td style='color:red;' class='UnitPrice'><b>" + item.UnitPrice + "</b></td>"
                    + "<td style='color:red;' class='Qty'><b>" + item.Qty + "</b></td>"

                    + "<td style='color:green;' class='InvoiceDate2'>" + item.InvoiceDate2 + "</td>"
                    + "<td style='color:green;' class='UnitPrice2'>" + item.UnitPrice2 + "</td>"
                    + "<td style='color:green;' class='Qty2'>" + item.Qty2 + "</td>"

                    + "<td style='color:blue;' class='InvoiceDate3'>" + item.InvoiceDate3 + "</td>"
                    + "<td style='color:blue;' class='UnitPrice3'>" + item.UnitPrice3 + "</td>"
                    + "<td style='color:blue;' class='Qty3'>" + item.Qty3 + "</td>"
                    + "<td></td>  </tr>"));
        });
        debugger;
        ApplyPermissions();
    //}
    //else {
    //    $('#isErp').hide()
    //}
   
}



function ItemSearch(RowID) {
    debugger;
    if ($("#txtExchangeRate").val() == 0)
        swal("Sorry", "Exchange rate can not be 0.");
    else if (ValidateForm("form", "ItemsFromSearchModal")) {
        ClearAll("#div-ItemsFromSearchModel");
        jQuery("#div-ItemsFromSearchModel").modal("show");

        ItemsFromSearch_Inti(RowID);
    }
}
var ItemSearchCurrentID = 0;

var pOrderBy = "ID";
var pPageNumber = 1;
var pPageSize = 50;


function ItemsFromSearch_Inti(RowID)
{
    ItemSearchCurrentID = RowID;
    strLoadWithPagingFunctionName = "/api/SL_Invoices/LoadWithPagingItems";

    var pWhereClause = " WHERE 1=1";
    if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true") {
        if ($("#isDefault-" + ItemSearchCurrentID).prop('checked') == true) {
            pWhereClause += "and ItemTypeID=6";
        }
        else {
            pWhereClause += "and ItemTypeID=7";

        }
    }

    $('#select-page-size1').val("50");
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    setTimeout(function () {
        $('#txItemNameSrch').trigger('focus');
        $('#txItemNameSrch').trigger('click');
    }, 300);

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
    , function (pData)
    {
        ItemsFromSearch_BindTableRows(JSON.parse(pData[0]), ItemSearchCurrentID);

    });
}
 
function ItemsFromSearch_BindTableRows(pTableRows, ItemSearchCurrentID) {


    debugger;
   // $("#hl-menu-DASJobs").parent().addClass("active");
    ClearAllTableRows("tblItemsFromSearch");
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblItemsFromSearch",
            ("<tr ID='" + item.ID + "' ondblclick='ItemsFromSearch_EditByDblClick(" + item.ID + "," + (ItemSearchCurrentID) + ");'>"

                    + "<td class='ID hide'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                + "<td class='Code' style=text-transform:uppercase' >" + item.Code + "</td>"
                + "<td class='Name' style=text-transform:uppercase' ><button type='button' onclick='ItemsFromSearch_EditByDblClick(" + item.ID + "," + (ItemSearchCurrentID) + ");' class='btnitemsearch btn float-left' >" + item.Name + "</button></td>"
                + "<td class='Price' style=text-transform:uppercase' >" + item.LastPurchasePrice + "</td>"
                + "<td class='ItemQtyInStore' style=text-transform:uppercase' >" + (item.ItemStoresQty).replace(/,/g, '<br>') + "</td>"
                    + "<td class='Notes' style=text-transform:uppercase' >" + item.Notes + "</td>"
                + "</tr>"));

       
    }); 
    ApplyPermissions();
    BindAllCheckboxonTable("tblItemsFromSearch", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteJobID");
    //HighlightText("#tblItemsFromSearch>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }

    //$('.btnitemsearch').keyup(function (e) {

    //    if (e.keyCode == 13) {
    //        $(this).trigger('click');
    //    }
    //});
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ItemsFromSearch_EditByDblClick(ItemID, RowID) {
    debugger;
    $("#Item-" + ItemSearchCurrentID).val(ItemID);
    //$.getJSON("/api/Voucher/GetListJobNotes", { pWhereClause: jobID }, function (Result) {
    //    if (Result) {
    //        debugger;
    //        $("#txtNotes").val(Result[0]);

    //    }

    //});
    $("#Item-" + ItemSearchCurrentID).trigger("change");
    jQuery("#div-ItemsFromSearchModel").modal("hide");
}
function ItemsFromSearchs_LoadingWithPaging() {
    debugger;
    strLoadWithPagingFunctionName = "/api/SL_Invoices/LoadWithPagingItems";

    var pWhereClause = ItemsFromSearch_GetWhereClause();
    var pOrderBy = "ID";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     ItemsFromSearch_BindTableRows(JSON.parse(pData[0]));
                 });
}


function ItemsFromSearch_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 ";
    // var pWhereClause = " WHERE 1=1 and JobType='P' and IsClosed=0  ";
    if ($("#txItemNameSrch").val().trim() != "") {
        pWhereClause += " and Name like N'%" + $("#txItemNameSrch").val().trim() + "%' ";
    }
    if ($("#txtItemCodeSrch").val().trim() != "") {
        pWhereClause += " and Code like N'%" + $("#txtItemCodeSrch").val().trim() + "%' ";
    }
    if ($('#hReadySlOptions option[value="2036"]').attr("OptionValue") == "true")
    {
        if ($("#isDefault-" + ItemSearchCurrentID).prop('checked') == true) {
            pWhereClause += "and ItemTypeID=6";
        }
        else {
            pWhereClause += "and ItemTypeID=7";

        }
    }
   
    return pWhereClause;
}

function ItemsFromSearch_ClearAllControls() {
    debugger;
    ClearAll("#JobModal");
    $("#liJob").siblings().removeClass("active");
    $("#liJob").addClass("active");
    $("#divJob").siblings().removeClass("active");
    $("#divJob").addClass("active");

    $("#btnSave").attr("onclick", "ItemsFromSearch_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
}
function ItemsFromSearch_LoadingWithPaging(pPageNo, pPageSize1) {
    debugger;


    var pWhereClause = ItemsFromSearch_GetWhereClause();
    var pPageSize = $('#select-page-size1').val();
    var pPageNumber = IsNull(pPageNo, $('#' + 'div-Pager1 ' + 'li.active a').text() );
    var pOrderBy;
    pOrderBy = "ID";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { ItemsFromSearch_BindTableRows(JSON.parse(pData[0])); });

}

function SearchFromItemList()
{
    var ItemTypeID = 7;
    debugger;
    if ($("#isDefault-" + ItemSearchCurrentID).prop('checked') == true) {
        ItemTypeID = 6;
    }
    else {
        ItemTypeID =7;

    }
   // setTimeout(function () {

    var SelectedItems = window.Items.filter(x =>( x.Name.toLowerCase().includes(IsNull($('#txItemNameSrch').val() , null))

        || x.Code.toLowerCase() == (IsNull($('#txtItemCodeSrch').val(), null)) && x.ItemTypeID == ItemTypeID)
    );
        ItemsFromSearch_BindTableRows(SelectedItems, ItemSearchCurrentID);

  //  }, 1000);




    
    //var pWhereClause = ItemsFromSearch_GetWhereClause();
    //var pPageSize = $('#select-page-size1').val();
    //var pPageNumber = IsNull(pPageNo, $('#' + 'div-Pager1 ' + 'li.active a').text());
    //var pOrderBy;
    //pOrderBy = "ID";

    //var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    //LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) {; });

}