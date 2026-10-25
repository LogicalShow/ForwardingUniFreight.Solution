// City Country ---------------------------------------------------------------
// Bind FA_Assets Table Rows



var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val()
    // CheckIfAllLoading();






});
 
function roundToDigits(value, precision) {
    var aPrecision = Math.pow(10, precision);
    return Math.round(value * aPrecision) / aPrecision;
}



function FA_Assets_BindTableRows(pFA_Assets) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_Assets");
    $.each(pFA_Assets, function (i, item) {
        var disabled = "";

        if (typeof item.Approved !== "undefined" && item.Approved != null && (item.Approved == true || item.Approved == "true")) {
            disabled = "disabled='disabled'";
        }
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Assets",
            ("<tr ID='" + item.ID + "' ondblclick='FA_Assets_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input " + disabled +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='SerialNo hide' val='" + item.SerialNo + "'>" + item.SerialNo + "</td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DevisonID' val='" + item.DevisonID + "'>" + item.DevisonName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='GroupID' val='" + item.GroupID + "'>" + item.GroupName + "</td>"
                + "<td class='Qty hide' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='SC_TransactionDetailsID' val='" + item.SC_TransactionDetailsID + "'>" + item.SC_TransactionCode + "</td>"
                + "<td class='Approved' val='" + item.Approved + "'>" + (item.Approved == true ? "<span style='font-size:2.5rem; color:#3276b1;' class='fa fa-check-circle'></span>" : "<span style='font-size:2.5rem; color:lightblue;' class='fa fa-circle'></span>" ) + "</td>"
                + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + item.SubAccountID + "</td>"
                + "<td class='CreationDate hide' val='" + GetDateFromServer(item.CreationDate) + "'>" + GetDateFromServer( item.CreationDate )+ "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='DepreciableAmount hide' val='" + item.DepreciableAmount + "'>" + item.DepreciableAmount + "</td>"
                + "<td class='IntialAmount hide' val='" + item.IntialAmount + "'>" + item.IntialAmount + "</td>"
                + "<td class='OpeningDepreciationAmount hide' val='" + item.OpeningDepreciationAmount + "'>" + item.OpeningDepreciationAmount + "</td>"
                + "<td class='PurchasingAmount hide' val='" + item.PurchasingAmount + "'>" + item.PurchasingAmount + "</td>"
                + "<td class='PurchasingDate hide' val='" + GetDateFromServer(item.PurchasingDate) + "'>" + GetDateFromServer(item.PurchasingDate) + "</td>"
                + "<td class='StartDepreciationDate hide' val='" + GetDateFromServer(item.StartDepreciationDate) + "'>" + GetDateFromServer( item.StartDepreciationDate ) + "</td>"
                + "<td class='PurchasingAmountLocal hide' val='" + item.PurchasingAmountLocal + "'>" + item.PurchasingAmountLocal + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='BarCodeType hide' val='" + item.BarCodeType + "'>" + item.BarCodeType + "</td>"
                + "<td class='ScrappingAmount hide' val='" + item.ScrappingAmount + "'>" + item.ScrappingAmount + "</td>"
                + "<td class='IsNotDepreciable hide' val='" + item.IsNotDepreciable + "'>" + item.IsNotDepreciable + "</td>"
                + "<td class='DepreciationTypeID hide' val='" + item.DepreciationTypeID + "'>" + item.DepreciationTypeID + "</td>"
                + "<td class='HasTransaction hide' val='" + item.HasTransaction + "'>" + item.HasTransaction + "</td>"

                + "<td class='PSInvoiceID hide' val='" + item.PSInvoiceID + "'>" + item.PSInvoiceID + "</td>"
                + "<td class='ItemID hide' val='" + item.ItemID + "'>" + item.ItemID + "</td>"
                + "<td class='AssetCostCenter_ID hide' val='" + item.AssetCostCenter_ID + "'>" + item.AssetCostCenter_ID + "</td>"



                + "<td class='AssetAccount_ID hide' val='" + item.AssetAccountID + "'>" + "<input tag=" + item.AssetAccountName + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                + "<td class='AssetAccumulatedDepreciationAccount_ID hide' val='" + item.AssetAccumulatedDepreciationAccountID + "'>" + "<input tag=" + item.AssetAccumulatedDepreciationAccountName + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                + "<td class='AssetDepreciationAccount_ID hide' val='" + item.AssetDepreciationAccountID + "'>" + "<input tag=" + item.AssetDepreciationAccountName + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"


                + "<td class='Percentage hide' val='" + item.Percentage + "'>" + item.Percentage + "</td>"
                + "<td class='LastAmount hide' val='" + item.LastAmount + "'>" + item.LastAmount + "</td>"
                + "<td class='AssetType hide' val='" + item.AssetType + "'>" + item.AssetType + "</td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintBarCode(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-barcode'>&nbsp;" + TranslateString("PrintBarCode") + "&nbsp;</i></button></td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='PrintAssetCard(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-printer'>&nbsp;" + TranslateString("PrintAssetCard") + "&nbsp;</i></button></td>"
                + "<td class='BarCode' val='" + item.BarCode + "'> <div id='BarCodeImgID" + item.ID + "'>" + "" + "</div></td>"
                + "<td class='hFA_Assets hide'><a href='#FA_AssetsModal' data-toggle='modal' onclick='FA_Assets_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));


        GenerateBarCodeForTable(item.ID, item.BarCode, item.BarCodeType);
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Assets", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Assets>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    FA_Assets_GetSC_TransactionDetails_Notifications();
}

function GetDataFromPS(THIS)
{
    debugger;
    var SelectedOption = $(THIS).find('option:selected');
    
    $('#txtName').val($(SelectedOption).attr('ParentPS_InvoiceItemName') + '-' + $(SelectedOption).attr('codemanual') );
    $('#slBranchID').val($(SelectedOption).attr('BranchID'));
    $('#slBranchID').trigger('change');
    $('#txtPurchasingAmount').val(roundToDigits(((IsNull($(SelectedOption).attr('ParentPS_InvoiceItemUnitPrice'), "0.00"))), 4) * roundToDigits(IsNull($(SelectedOption).attr('Qty_D'/*'ParentPS_InvoiceItemQty'*/) , "1.00") , 4 )) ;
    SplitPurchasingAmount()


    $('#txtQty').val($(SelectedOption).attr('Qty_D'/*'ParentPS_InvoiceItemQty'*/));


    debugger;

    $('#slCurrencyID').val($(SelectedOption).attr('ParentPS_InvoiceItemUnitCurrencyID'));


    $('#txtPurchasingDate').val(($(SelectedOption).attr('strParentPS_InvoiceDate')).trim());

    $('#txtStartDepreciationDate').val((GetDateFromServer($(SelectedOption).attr('TransactionDate'))).trim());
    setTimeout(function () {
        $('#txtStartDepreciationDate').val((GetDateFromServer($(SelectedOption).attr('TransactionDate'))).trim());
        RecalculateExchangeRate();
    }, 30);


    $('#cbIsNotDepreciable').prop("checked", ($(SelectedOption).attr('ItemTypeID') == "5" ? true : false));
    $('#cbIsNotDepreciable').trigger('change');
}


function FillItems() {
    FadePageCover(true);

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Assets/GetPSInvoiceDetails",
        data: { pInvoiceID: $('#slPSInvoice').val(), pID: 0},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {

            //Fill_SelectInputAfterLoadData(d[0], 'D_ID', 'D_ItemName', TranslateString("SelectFromMenu"), '#slItems', '');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'D_ID', 'D_ItemName', TranslateString("SelectFromMenu"), '#slItems', '', "D_UnitPrice,D_Quantity,CurrencyID,InvoiceDate,D_ItemName");


            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function GetDataFromPSInvoice(THIS) {
    debugger;
    var SelectedOption = $(THIS).find('option:selected');

    $('#txtName').val($(SelectedOption).attr('D_ItemName'));
    //$('#slBranchID').val($(SelectedOption).attr('BranchID'));
    //$('#slBranchID').trigger('change');
    $('#txtPurchasingAmount').val(roundToDigits(((IsNull($(SelectedOption).attr('D_UnitPrice'), "0.00"))), 4) * roundToDigits(IsNull($(SelectedOption).attr('D_Quantity'/*'ParentPS_InvoiceItemQty'*/), "1.00"), 4));
    SplitPurchasingAmount()


    $('#txtQty').val($(SelectedOption).attr('D_Quantity'/*'ParentPS_InvoiceItemQty'*/));


    debugger;

    $('#slCurrencyID').val($(SelectedOption).attr('CurrencyID'));


    $('#txtPurchasingDate').val((GetDateFromServer($(SelectedOption).attr('InvoiceDate'))).trim());


    $('#txtStartDepreciationDate').val((GetDateFromServer($(SelectedOption).attr('InvoiceDate'))).trim());
    setTimeout(function () {
        $('#txtStartDepreciationDate').val((GetDateFromServer($(SelectedOption).attr('InvoiceDate'))).trim());
        RecalculateExchangeRate();
    }, 30);


    $('#cbIsNotDepreciable').prop("checked", ($(SelectedOption).attr('ItemTypeID') == "5" ? true : false));
    $('#cbIsNotDepreciable').trigger('change');
}

var assets_type = 2;
function AssetType(typeid)
{
    debugger;
    assets_type = typeid;

    CalculateDistructions();

}

function ShowHideTransactionsArea(IsFromPS_Invoice) {
    debugger;
    if (IsFromPS_Invoice)
    {
        if ($('#cbIsPSInvoice').is(':checked')) {
            $('.PSInvoiceSection').removeClass('hide');
            $('.SC_TransactionsSection').addClass('hide');

            $('.IsFromPS').prop('disabled', true);      
        }
        else {
            $('.SC_TransactionsSection').removeClass('hide');
            $('.PSInvoiceSection').addClass('hide');

            $('.IsFromPS').prop('disabled', true);      
        }

       
    }
    else
    {
        $('.SC_TransactionsSection').addClass('hide');
        $('.PSInvoiceSection').addClass('hide');

        $('.IsFromPS').prop('disabled', false);
        $('#slSC_TransactionsDetails').val("0");
    }

}




function PrintBarCode(ID)
{
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("AssetIDs");
    arr_Values.push(ID);
  //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "FA_PrintBarCodeForAssets_AR"
        , pReportName: "FA_PrintBarCodeForAssets_AR"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}
function PrintAssetCard(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("ID");
    arr_Values.push(ID);
    //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "FA_AssetCardFromAssets_AR"
        , pReportName: "FA_AssetCardFromAssets_AR"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}
function ClearDetails(THIS) {

    if ($(THIS).is(":checked") == true) {
        $('#tblFA_AssetsDestructions>tbody').html('');
        $('#txtPercentage').val('0.00')
        $('#txtPercentage').prop('disabled', true);
    }
    else {

        $('#txtPercentage').prop('disabled', false);
        FA_AssetsDestructions_BindTableRows(false);
    }
      
   


}

function FA_Assets_EditByDblClick(pID) {
    jQuery("#FA_AssetsModal").modal("show");
    FA_Assets_FillControls(pID);
}
// Loading with data

function FA_Assets_GetSC_TransactionDetails_Notifications() {
    debugger
    LoadAll("/api/SC_Transactions/LoadItems", "where \'Details\' = \'Details\' AND  ISNULL(IsApproved , 0) = 1 AND ISNULL(ParentPS_InvoiceID , 0) <> 0 AND ISNULL(BranchID , 0) <> 0 AND  ISNULL(FA_AssetsID , 0) = 0 AND  BranchID IN( Select fu.BranchID from FA_UserBranches fu  where fu.UserID = " + pLoggedUser.ID + ") ", function (pTabelRows)
    {
        var Data = JSON.parse(pTabelRows);
        if (Data != null && Data.length > 0)
        {
            debugger
            $('.AssetsNotifications').removeClass('hide');
            $('.AssetsNotificationsBody').html('<b style="font-size: 2rem;">' + 'يوجد ' + Data.length + ' من البضائع المصروفة على الفروع المربوطة بك يحتاج الي عمل كروت اصل لها     '   + '</b>');
        }
        else
        {
            $('.AssetsNotifications').addClass('hide');
            $('.AssetsNotificationsBody').html('');
        }
       // swal(Data.length);

    });
    
}

function FA_Assets_GetFilterWhereClause()
{
    var WhereClause = " where 1 = 1 ";

    if ($("#txt-Search").val().trim() != "") {
        var pSearchKey  = $("#txt-Search").val().trim();
        WhereClause = WhereClause + " AND ( vwFA_Assets.Name LIKE N'%" + pSearchKey + "%' " + " OR vwFA_Assets.BarCode LIKE N'%" + pSearchKey + "%'" + " OR vwFA_Assets.Code LIKE N'%" + pSearchKey + "%')";
    }

    if ($("#slBranchID_Filter").val() != "0") {
        WhereClause = WhereClause + " AND vwFA_Assets.BranchID = " + $("#slBranchID_Filter").val() + " ";
    }
    else
    {
        WhereClause = WhereClause + " AND vwFA_Assets.BranchID  IN(Select ub.BranchID from FA_UserBranches ub where ub.UserID = " + pLoggedUser.ID + ") ";
    }

    return WhereClause;
}




function FA_Assets_LoadingWithPaging() {
    debugger;
    var WhereClause = FA_Assets_GetFilterWhereClause();
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Assets/LoadWithPagingWithWhereClause", WhereClause , $("#div-Pager li.active a").text(), $('#select-page-size').val().trim() , function (pTabelRows) { FA_Assets_BindTableRows(pTabelRows); });
    HighlightText("#tblFA_Assets>tbody>tr", $("#txt-Search").val().trim());
    if ($("[id$='hf_ChangeLanguage']").val() == "ar")
    {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();
    }
}

//var IsOldName = "0";
var Isvalidated = true;

function FA_Assets_Insert(pSaveandAddNew) {
    Isvalidated = true;
    if ($('#txtCode').val() == "" || ($('#txtCode').prop("disabled") == false && $.isNumeric($('#txtCode').val()) == false) || ($('#txtCode').prop("disabled") == false && parseFloat($('#txtCode').val()) < 0) || ($('#txtCode').prop("disabled") == false && isNaN(parseFloat($('#txtCode').val())) == true)) {
        swal(TranslateString("Sorry"), TranslateString("CodeIsNotCorrectNumber"), "warning"); // "[Opening Depreciation Amount] has not Correct value"
        Isvalidated = false;
    }
    else if ($('#txtIntialAmount').val() == "" || $.isNumeric($('#txtIntialAmount').val()) == false || parseFloat($('#txtIntialAmount').val()) < 0 || isNaN(parseFloat($('#txtIntialAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString( "FA_Asset@Error@IntialAmount"), "warning");  //"[Intial Amount] has not Correct value"
        Isvalidated = false;
    }
    else if ($('#txtPurchasingAmount').val() == "" || $.isNumeric($('#txtPurchasingAmount').val()) == false || parseFloat($('#txtPurchasingAmount').val()) < 0 || isNaN(parseFloat($('#txtPurchasingAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@PurchasingAmount"), "warning"); // "[Purchasing Amount] has not Correct value",
        Isvalidated = false;
    }
    else if ($('#txtQty').val() == "" || $.isNumeric($('#txtQty').val()) == false || parseFloat($('#txtQty').val()) <= 0 || isNaN(parseFloat($('#txtQty').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString( "FA_Asset@Error@Qty"), "warning"); //[Qty] has not Correct value
        Isvalidated = false;
    }
    else if ($('#txtScrappingAmount').val() == "" || $.isNumeric($('#txtScrappingAmount').val()) == false || parseFloat($('#txtScrappingAmount').val()) < 0 || isNaN(parseFloat($('#txtScrappingAmount').val())) == true)
    {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@ScrappingAmount"), "warning"); // "[Scrapping Amount] has not Correct value"
        Isvalidated = false;
    }
    else if ($('#txtOpeningDepreciationAmount').val() == "" || $.isNumeric($('#txtOpeningDepreciationAmount').val()) == false || parseFloat($('#txtOpeningDepreciationAmount').val()) < 0 || isNaN(parseFloat($('#txtOpeningDepreciationAmount').val())) == true)
    {
        swal(TranslateString("Sorry"), TranslateString( "FA_Asset@Error@OpeningDepreciationAmount"), "warning"); // "[Opening Depreciation Amount] has not Correct value"
        Isvalidated = false;
    }
    else if (moment($('#txtStartDepreciationDate').val(), 'DD/MM/YYYY').toDate() < moment($('#txtPurchasingDate').val(), 'DD/MM/YYYY').toDate()) {

        swal(TranslateString('Sorry'), TranslateString('PurchaseDateMust<StartDepreciationDate'), 'warning'); //DateMust>LastDepreciationDate 

    }
    else if ($('#cbIsFromSC_Transactions').is(':checked') == true && IsNull( $('#slSC_TransactionsDetails').val() , "0") == "0")
    {

        swal(TranslateString('Sorry'), 'من فضلك ادخل اذن الصرف', 'warning'); //DateMust>LastDepreciationDate 

    }
    else {

        if ($('#cbIsNotDepreciable').is(":checked") == false) {
            debugger
            $('#tblFA_AssetsDestructions>tbody>tr').each(function (i, tr) {
                if (//$(tr).find('.selectaccount').val().trim() == "0" ||
                    $(tr).find('.inputvalue').val().trim() == "" || $('#slSubAccountID').val() == "0") {
                    swal(TranslateString("Sorry"), TranslateString('tblDetailsError'), 'warning'); // يجب إدخال جميع الحقول في الجدول بالأسفل
                    Isvalidated = false;
                    // break;
                }

                if (i == $('#tblFA_AssetsDestructions>tbody>tr').length - 1) {

                    if (Isvalidated) {


                        isOverlap("#tblFA_AssetsDestructions", "FromDate", "ToDate", function (IsOverlap) {

                            if (IsOverlap == "false") {

                                debugger;
                                InsertUpdateFunctionWithTranslate("form", "/api/FA_Assets/Insert", {
                                    pName: $('#txtName').val(),
                                    pSubAccountID: "0",
                                    pParentSubAccountID: $('#slGroupID option:selected').attr("SubAccountID"),
                                    pApproved: "false",
                                    pBarCode: $('#txtBarCode').val(),
                                    pBranchID: $('#slBranchID').val(),
                                    pCode: $('#txtCode').val(),
                                    pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                                    pCurrencyID: $('#slCurrencyID').val(),
                                    pDepartmentID: $('#slDepartmentID').val(),
                                    pDepreciableAmount: "0",
                                    pDevisonID: $('#slDevisonID').val(),
                                    pGroupID: $('#slGroupID').val(),
                                    pIntialAmount: $('#txtIntialAmount').val(),
                                    pOpeningDepreciationAmount: $('#txtOpeningDepreciationAmount').val(),
                                    pPurchasingAmount: $('#txtPurchasingAmount').val(),
                                    pPurchasingDate: ConvertDateFormat($('#txtPurchasingDate').val()),
                                    pQty: $('#txtQty').val(),
                                    pStartDepreciationDate: ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat($('#txtStartDepreciationDate').val())),
                                    pPurchasingAmountLocal: $('#txtPurchasingAmountLocal').val(),
                                    pExchangeRate: $('#slCurrencyID option:selected').attr("ExchangeRate"),
                                    pBarCodeType: $('#slBarCodeType').val(),
                                    pScrappingAmount: $('#txtScrappingAmount').val(),
                                    pIsNotDepreciable: $('#cbIsNotDepreciable').prop("checked"),
                                    pDepreciationTypeID: 1,
                                    pInvoiceID: 1,
                                    pBranchCode: $('#slBranchID option:selected').attr('Code'),
                                    pGroupCode: $('#slGroupID option:selected').attr('Code'),
                                    pSC_TransactionDetailsID: ($('#cbIsFromSC_Transactions').is(':checked') == true ? $('#slSC_TransactionsDetails').val() : "0"),
                                    pAssetType: 2,
                                    pAccountID: $("#slAccountID").val(),
                                    pDepreciationAccountID: $("#slDepreciationAccountID").val(),
                                    pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),
                                    pPSInvoiceID: ($('#slPSInvoice').val() == "" || $('#slPSInvoice').val() == null || $('#slPSInvoice').val() == undefined) ? 0 : $('#slPSInvoice').val(),
                                    pItemID: ($('#slItems').val() == "" || $('#slItems').val() == null || $('#slItems').val() == undefined) ? 0 : $('#slItems').val() ,
                                    pAssetCostCenter_ID: $("#slCostCenterID").val()



                                }, pSaveandAddNew, 'FA_AssetsModal', function (data) {
                                    //if ($('#cbIsNotDepreciable').prop("checked")) {
                                        FA_Assets_LoadingWithPaging();
                                        //------------------------------------- ----------- -  - - - - -- - - - - -
                                        $('#hID').val(data[2]);
                                        InsertUpdateListOfObject("/api/FA_Assets/InsertItems",
                                            SetArrayOfItems()
                                            , pSaveandAddNew, "FA_AssetsModal", function () {
                                                setTimeout(function () {

                                                    ArrDeleted = [];
                                                    $("#hID").val("0");
                                                    $('#tblFA_AssetsDestructions > tbody').html('');
                                                    IntializeData();
                                                    ClearAllTableRows('tblFA_AssetsDestructions');
                                                    FA_Assets_LoadingWithPaging();
                                                }, 300);

                                            });
                                    //}
                                    //else {
                                    //    ArrDeleted = [];
                                    //    $("#hID").val("0");
                                    //    $('#tblFA_AssetsDestructions > tbody').html('');
                                    //    IntializeData();
                                    //    ClearAllTableRows('tblFA_AssetsDestructions');
                                    //    FA_Assets_LoadingWithPaging();

                                    //}
                                    //------------------------------------- ----------- -  - - - - -- - - - - -
                                });
                            }
                            else {
                                //  swal("sorry", "Range of Date Is Overlaped", "warning");
                                swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning'); //Range of Date Is Overlaped
                            }





                        });





                    }

                }






            });
        }
        else {
            debugger;
            InsertUpdateFunctionWithTranslate("form", "/api/FA_Assets/Insert",
                {
                pName: $('#txtName').val(),
                pSubAccountID: "0",
                pParentSubAccountID: $('#slGroupID option:selected').attr("SubAccountID"),
                pApproved: "false",
                pBarCode: $('#txtBarCode').val(),
                pBranchID: $('#slBranchID').val(),
                pCode: $('#txtCode').val(),
                pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                pCurrencyID: $('#slCurrencyID').val(),
                pDepartmentID: $('#slDepartmentID').val(),
                pDepreciableAmount: "0",
                pDevisonID: $('#slDevisonID').val(),
                pGroupID: $('#slGroupID').val(),
                pIntialAmount: $('#txtIntialAmount').val(),
                pOpeningDepreciationAmount: $('#txtOpeningDepreciationAmount').val(),
                pPurchasingAmount: $('#txtPurchasingAmount').val(),
                pPurchasingDate: ConvertDateFormat($('#txtPurchasingDate').val()),
                pQty: $('#txtQty').val(),
                pStartDepreciationDate: ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat($('#txtStartDepreciationDate').val())),
                pPurchasingAmountLocal: $('#txtPurchasingAmountLocal').val(),
                pExchangeRate: $('#slCurrencyID option:selected').attr("ExchangeRate"),
                pBarCodeType: $('#slBarCodeType').val(),
                pScrappingAmount: $('#txtScrappingAmount').val(),
                pIsNotDepreciable: $('#cbIsNotDepreciable').prop("checked"),
                pDepreciationTypeID: 1,
                pInvoiceID: 1,
                pBranchCode: $('#slBranchID option:selected').attr('Code'),
                    pGroupCode: $('#slGroupID option:selected').attr('Code'),
                    pSC_TransactionDetailsID: ($('#cbIsFromSC_Transactions').is(':checked') == true ? $('#slSC_TransactionsDetails').val() : "0")
                    , pAssetType: 2,
                    pAccountID: $("#slAccountID").val(),
                    pDepreciationAccountID: $("#slDepreciationAccountID").val(),
                    pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),
                    pAssetCostCenter_ID: $("#slCostCenterID").val(),
                }, pSaveandAddNew, 'FA_AssetsModal', function (data)
                {
                FA_Assets_LoadingWithPaging();
                //------------------------------------- ----------- -  - - - - -- - - - - -
                $('#hID').val(data[2]);
                    ArrDeleted = [];
                    $("#hID").val("0");
                    $('#tblFA_AssetsDestructions > tbody').html('');
                    IntializeData();
                    ClearAllTableRows('tblFA_AssetsDestructions');
                    FA_Assets_LoadingWithPaging();
                //------------------------------------- ----------- -  - - - - -- - - - - -
                 });

        }



      
    }
}



function FA_Assets_Update(pSaveandAddNew) {
    var Isvalidated = true;
    if ($('#txtIntialAmount').val() == "" || $.isNumeric($('#txtIntialAmount').val()) == false || parseFloat($('#txtIntialAmount').val()) < 0 || isNaN(parseFloat($('#txtIntialAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@IntialAmount"), "warning");  //"[Intial Amount] has not Correct value"
        Isvalidated = false;
    }
    else if ($('#txtPurchasingAmount').val() == "" || $.isNumeric($('#txtPurchasingAmount').val()) == false || parseFloat($('#txtPurchasingAmount').val()) < 0 || isNaN(parseFloat($('#txtPurchasingAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@PurchasingAmount"), "warning"); // "[Purchasing Amount] has not Correct value",
        Isvalidated = false;
    }
    else if ($('#txtQty').val() == "" || $.isNumeric($('#txtQty').val()) == false || parseFloat($('#txtQty').val()) <= 0 || isNaN(parseFloat($('#txtQty').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@Qty"), "warning"); //[Qty] has not Correct value
        Isvalidated = false;
    }
    else if ($('#txtScrappingAmount').val() == "" || $.isNumeric($('#txtScrappingAmount').val()) == false || parseFloat($('#txtScrappingAmount').val()) < 0 || isNaN(parseFloat($('#txtScrappingAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@ScrappingAmount"), "warning"); // "[Scrapping Amount] has not Correct value"
        Isvalidated = false;
    }
    else if ($('#txtOpeningDepreciationAmount').val() == "" || $.isNumeric($('#txtOpeningDepreciationAmount').val()) == false || parseFloat($('#txtOpeningDepreciationAmount').val()) < 0 || isNaN(parseFloat($('#txtOpeningDepreciationAmount').val())) == true) {
        swal(TranslateString("Sorry"), TranslateString("FA_Asset@Error@OpeningDepreciationAmount"), "warning"); // "[Opening Depreciation Amount] has not Correct value"
        Isvalidated = false;
    }
    else if (moment($('#txtStartDepreciationDate').val(), 'DD/MM/YYYY').toDate() < moment($('#txtPurchasingDate').val(), 'DD/MM/YYYY').toDate()) {

        swal(TranslateString('Sorry'), TranslateString('PurchaseDateMust<StartDepreciationDate'), 'warning'); //DateMust>LastDepreciationDate 

    }
    else if ($('#cbIsFromSC_Transactions').is(':checked') == true && IsNull($('#slSC_TransactionsDetails').val(), "0") == "0") {

        swal(TranslateString('Sorry'), 'من فضلك ادخل اذن الصرف', 'warning'); //DateMust>LastDepreciationDate 

    }
    else
    {
        if ($('#cbIsNotDepreciable').is(":checked") == false) {
            $('#tblFA_AssetsDestructions>tbody>tr').each(function (i, tr) {
                if (//$(tr).find('.selectaccount').val().trim() == "0" ||
                    $(tr).find('.inputvalue').val().trim() == "" || $('#slSubAccountID').val() == "0") {
                    swal(TranslateString("Sorry"), TranslateString('tblDetailsError'), 'warning'); // يجب إدخال جميع الحقول في الجدول بالأسفل
                    Isvalidated = false;
                    // break;
                }

                if (i == $('#tblFA_AssetsDestructions>tbody>tr').length - 1) {

                    if (Isvalidated) {



                        isOverlap("#tblFA_AssetsDestructions", "FromDate", "ToDate", function (IsOverlap) {

                            if (IsOverlap == "false") {

                                debugger;
                                InsertUpdateFunctionAndReturnID("form", "/api/FA_Assets/Update", {
                                    pID: $('#hID').val(),
                                    pName: $('#txtName').val(),
                                    pSubAccountID: $("#hSubAccountID").val(),
                                    pParentSubAccountID: $('#slGroupID option:selected').attr("SubAccountID"),
                                    pApproved: $("#hApproved").val(),
                                    pBarCode: $('#txtBarCode').val(),
                                    pBranchID: $('#slBranchID').val(),
                                    pCode: $('#txtCode').val(),
                                    pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                                    pCurrencyID: $('#slCurrencyID').val(),
                                    pDepartmentID: $('#slDepartmentID').val(),
                                    pDepreciableAmount: "0",
                                    pDevisonID: $('#slDevisonID').val(),
                                    pGroupID: $('#slGroupID').val(),
                                    pIntialAmount: $('#txtIntialAmount').val(),
                                    pOpeningDepreciationAmount: $('#txtOpeningDepreciationAmount').val(),
                                    pPurchasingAmount: $('#txtPurchasingAmount').val(),
                                    pPurchasingDate: ConvertDateFormat($('#txtPurchasingDate').val()),
                                    pQty: $('#txtQty').val(),
                                    pStartDepreciationDate: ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat($('#txtStartDepreciationDate').val())),
                                    pPurchasingAmountLocal: $('#txtPurchasingAmountLocal').val(),
                                    pExchangeRate: $("#slCurrencyID option:selected").attr("ExchangeRate"),
                                    pBarCodeType: $('#slBarCodeType').val(),
                                    pScrappingAmount: $('#txtScrappingAmount').val(),
                                    pIsNotDepreciable: $('#cbIsNotDepreciable').prop("checked"),
                                    pDepreciationTypeID: 1,
                                    pInvoiceID: 1,
                                    pSerialNo: ($('#hSerialNo').val() == "" ? "0" : $('#hSerialNo').val()),
                                    pSC_TransactionDetailsID: ($('#cbIsFromSC_Transactions').is(':checked') == true ? $('#slSC_TransactionsDetails').val() : "0"),
                                    pBranchCode: $('#slBranchID option:selected').attr('Code'),
                                    pGroupCode: $('#slGroupID option:selected').attr('Code'),
                                    pAssetType: 2,
                                    pAccountID: $("#slAccountID").val(),
                                    pDepreciationAccountID: $("#slDepreciationAccountID").val(),
                                    pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),
                                    pAssetCostCenter_ID: $("#slCostCenterID").val(),

                                }, pSaveandAddNew, 'FA_AssetsModal', '#hID', function () {
                                    FA_Assets_LoadingWithPaging();
                                    //------------------------------------- ----------- -  - - - - -- - - - - -
                                    InsertUpdateListOfObject("/api/FA_Assets/InsertItems",
                                        SetArrayOfItems()
                                        , pSaveandAddNew, "FA_AssetsModal", function () {
                                            setTimeout(function () {

                                                console.log('arr deleted ' + ArrDeleted.join(","))
                                                console.log('arr deleted ' + ArrDeleted.length)
                                                if (ArrDeleted.length > 0)
                                                    DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });


                                                $('#tblFA_AssetsDestructions > tbody').html('');

                                                $("#hID").val("0")

                                                IntializeData();
                                                ClearAllTableRows('tblFA_AssetsDestructions');
                                                FA_Assets_LoadingWithPaging();
                                            }, 300);

                                        });
                                    //------------------------------------- ----------- -  - - - - -- - - - - -
                                });


                            }
                            else {
                                swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning'); //Range of Date Is Overlaped

                            }


                        });






                    }

                }






            });
        }
        else
        {
            debugger;
            InsertUpdateFunctionAndReturnID("form", "/api/FA_Assets/Update", {
                pID: $('#hID').val(),
                pName: $('#txtName').val(),
                pSubAccountID: $("#hSubAccountID").val(),
                pParentSubAccountID: $('#slGroupID option:selected').attr("SubAccountID"),
                pApproved: $("#hApproved").val(),
                pBarCode: $('#txtBarCode').val(),
                pBranchID: $('#slBranchID').val(),
                pCode: $('#txtCode').val(),
                pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                pCurrencyID: $('#slCurrencyID').val(),
                pDepartmentID: $('#slDepartmentID').val(),
                pDepreciableAmount: "0",
                pDevisonID: $('#slDevisonID').val(),
                pGroupID: $('#slGroupID').val(),
                pIntialAmount: $('#txtIntialAmount').val(),
                pOpeningDepreciationAmount: $('#txtOpeningDepreciationAmount').val(),
                pPurchasingAmount: $('#txtPurchasingAmount').val(),
                pPurchasingDate: ConvertDateFormat($('#txtPurchasingDate').val()),
                pQty: $('#txtQty').val(),
                pStartDepreciationDate: ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat($('#txtStartDepreciationDate').val())),
                pPurchasingAmountLocal: $('#txtPurchasingAmountLocal').val(),
                pExchangeRate: $("#slCurrencyID option:selected").attr("ExchangeRate"),
                pBarCodeType: $('#slBarCodeType').val(),
                pScrappingAmount: $('#txtScrappingAmount').val(),
                pIsNotDepreciable: $('#cbIsNotDepreciable').prop("checked"),
                pDepreciationTypeID: 1,
                pInvoiceID: 1,
                pSerialNo: ($('#hSerialNo').val() == "" ? "0" : $('#hSerialNo').val()), pSC_TransactionDetailsID: ($('#cbIsFromSC_Transactions').is(':checked') == true ? $('#slSC_TransactionsDetails').val() : "0")
                , pAssetType: 2
                , pAccountID: $("#slAccountID").val(),
                pDepreciationAccountID: $("#slDepreciationAccountID").val(),
                pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),
                pAssetCostCenter_ID: $("#slCostCenterID").val(),
            }, pSaveandAddNew, 'FA_AssetsModal', '#hID', function ()
                {
                FA_Assets_LoadingWithPaging();

                            console.log('arr deleted ' + ArrDeleted.join(","))
                            console.log('arr deleted ' + ArrDeleted.length)
                            if (ArrDeleted.length > 0)
                                DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });
                            else
                                DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": "0", "type": "2" }, function () { ArrDeleted = []; });

                            $('#tblFA_AssetsDestructions > tbody').html('');

                           $("#hID").val("0");

                            IntializeData();
                            ClearAllTableRows('tblFA_AssetsDestructions');
                            FA_Assets_LoadingWithPaging();

                //------------------------------------- ----------- -  - - - - -- - - - - -
            });

        }
    }
}


function IntializeData(callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Assets/IntializeData",
        data: { pID: $('#hID').val(), pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), IsCurrency: "false"  },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var currencyid = $('#slCurrencyID').val();
            //Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'GroupID', 'FullName', TranslateString("SelectFromMenu"), '#slGroupID', '', "SubAccountID,ParentSubAccountID,Percentage,ActualPercentage,Code");
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'GroupID', 'FullName', TranslateString("SelectFromMenu"), '#slGroupID', '', "SubAccountID,ParentSubAccountID,Percentage,ActualPercentage,Code,AssetAccount_ID,AssetDepreciationAccount_ID,AssetAccumulatedDepreciationAccount_ID,AssetCostCenter_ID");

            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slBranchID', '', "Code");
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[2], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDepartmentID', '' , 'Code');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[3], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDevisonID', '', 'Code');
            Fill_SelectInputAfterLoadData_WithAttr(d[4], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate' );
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[5], 'D_ID', 'Code,CodeManual,MaterialIssueVoucherSummary', " - ", TranslateString("SelectFromMenu"), '#slSC_TransactionsDetails', '', "Code,strParentPS_InvoiceDate,ParentPS_InvoiceID,ParentPS_InvoiceItemUnitPrice,ParentPS_InvoiceItemQty,ParentPS_InvoiceItemUnitCurrencyID,ItemTypeID,ItemTypeName,BranchID,ParentPS_InvoiceItemName,CodeManual,TransactionDate,Qty_D");


            Fill_SelectInputAfterLoadData_WithMultiAttr(d[6], 'ID', 'Account_Name', TranslateString("SelectFromMenu"), '#slAccountID', '', 'Parent_ID');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[7], 'ID', 'Account_Name', TranslateString("SelectFromMenu"), '#slDepreciationAccountID', '', 'Parent_ID');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[8], 'ID', 'Account_Name', TranslateString("SelectFromMenu"), '#slAccumulatedDepreciationAccountID', '', 'Parent_ID');

          //  Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[5], 'D_ID', 'Code,ParentPS_InvoiceItemName,CodeManual,ItemTypeName', " - ", TranslateString("SelectFromMenu"), '#slSC_TransactionsDetails', '', "Code,strParentPS_InvoiceDate,ParentPS_InvoiceID,ParentPS_InvoiceItemUnitPrice,ParentPS_InvoiceItemQty,ParentPS_InvoiceItemUnitCurrencyID,ItemTypeID,ItemTypeName,BranchID,ParentPS_InvoiceItemName,CodeManual,Qty_D");

           // RecalculateExchangeRate()
            if (typeof callback !== "undefined" && callback != null)
                callback();

            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}




function RecalculateExchangeRate() {

    if ($('#hID') == null || $('#hID').val() == "") {
        $('#hID').val("0")

    }


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Assets/IntializeData",
        data: { pID: $('#hID').val(), pDate: ConvertDateFormat($('#txtPurchasingDate').val()), IsCurrency: "true" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var currencyid = $('#slCurrencyID').val();
            console.log($('#hID').val());
            Fill_SelectInputAfterLoadData_WithAttr(d[4], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
            // Fill_SelectInputAfterLoadData(d[1] , 'ID' , 'Code' , 'Select Good Receipt Note' , '#slTransaction', $('#hID').val());
            //CalculateAll();
            CalculateDistructions();
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}






function FA_Assets_Delete(pID) {
    DeleteListFunction("/api/FA_Assets/DeleteByID", { "pID": pID, "type": "1" }, function () { FA_Assets_LoadingWithPaging(); });
}

function FA_Assets_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_Assets') != "")
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
                DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": GetAllSelectedIDsAsString('tblFA_Assets'), "type": "1" }, function () { FA_Assets_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": GetAllSelectedIDsAsString('tblFA_Assets') }, function () { FA_Assets_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data


function ShowHideInputs()
{

    if ($('#hApproved').val() == "true" || $('#hUsed').val() == "true") {

        $('.CanEdit').prop('disabled', true);
     
    }
    else
    {
        $('.CanEdit').prop('disabled', false);

    }

}


function GetCountOfDays() {




  //  moment( , "DD/MM/YYYY").ToDate();


  //  $("#FromDate").val();
 //   $("#FromDate").val();





}

var IsApproved = false;

function FA_Assets_FillControls(pID) {
    $('#tblFA_AssetsDestructions > tbody').html('');
    debugger;
    ClearAll("#FA_AssetsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");




   
    $('#hApproved').val($(tr).find("td.Approved").attr("val"));
    $('#hUsed').val($(tr).find("td.HasTransaction").attr("val"));
    
    ShowHideInputs();
    $('#slSC_TransactionsDetails').val($(tr).find("td.SC_TransactionDetailsID").attr('val'));

    


    var IsFromPS_Invoice = (IsNull($(tr).find("td.SC_TransactionDetailsID").attr('val'), "0") == "0" ? false : true );
    var IsPSInvoiceID = (IsNull($(tr).find("td.PSInvoiceID").attr('val'), "0") == "0" ? false : true);


    if (IsPSInvoiceID ==true) {
        IsFromPS_Invoice = true;
    }

    //$('#cbIsFromSC_Transactions').prop('checked', IsFromPS_Invoice);
    //$('#cbIsManual').prop('checked', !IsFromPS_Invoice);

    if ($(tr).find("td.PSInvoiceID").attr('val') != "0" && $(tr).find("td.PSInvoiceID").attr('val') != "") {
        $('#cbIsPSInvoice').prop('checked', true);
    }
    else if ($(tr).find("td.SC_TransactionDetailsID").attr('val') != "0" && $(tr).find("td.SC_TransactionDetailsID").attr('val') != "") {
        $('#cbIsFromSC_Transactions').prop('checked', true);
    }
    else {
        $('#cbIsManual').prop('checked', true);
    }


    $('#cbIsFromSC_Transactions').prop('disabled', true);
    $('#cbIsManual').prop('disabled', true);
    $('#cbIsPSInvoice').prop('disabled', true);



    $('#slSC_TransactionsDetails').prop('disabled', true);
    ShowHideTransactionsArea(IsFromPS_Invoice);

   // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_Assets/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
   




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);

    IntializeData(function () {
        $('#slSC_TransactionsDetails').val($(tr).find("td.SC_TransactionDetailsID").attr('val'));


        if ($(tr).find("td.PSInvoiceID").attr('val') != "0" && $(tr).find("td.PSInvoiceID").attr('val') != "") {
            $('#slPSInvoice').val($(tr).find("td.PSInvoiceID").attr('val'));
            $.ajax({
                type: "GET",
                url: strServerURL + "/api/FA_Assets/GetPSInvoiceDetails",
                data: { pInvoiceID: $('#slPSInvoice').val(), pID: pID},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {

                    //Fill_SelectInputAfterLoadData(d[0], 'D_ID', 'D_ItemName', TranslateString("SelectFromMenu"), '#slItems', '');
                    Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'D_ID', 'D_ItemName', TranslateString("SelectFromMenu"), '#slItems', $(tr).find("td.ItemID").attr('val'), "D_UnitPrice,D_Quantity,CurrencyID,InvoiceDate,D_ItemName");
                    //$('#slItems').val($(tr).find("td.ItemID").attr('val'));

                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });
           

        }
       

       




        $("#slAccountID").val($(tr).find("td.AssetAccount_ID").attr('val')).trigger('change');
        $("#slAccumulatedDepreciationAccountID").val($(tr).find("td.AssetAccumulatedDepreciationAccount_ID").attr('val')).trigger('change');
        $("#slDepreciationAccountID").val($(tr).find("td.AssetDepreciationAccount_ID").attr('val')).trigger('change');

        $("#slCostCenterID").val($(tr).find("td.AssetCostCenter_ID").attr('val')).trigger('change');


        $("#txtName").val($(tr).find("td.Name").attr('val'));
        $("#hSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
        $("#hApproved").val($(tr).find("td.Approved").attr('val'));
        $("#txtBarCode").val($(tr).find("td.BarCode").attr('val'));
        $("#slBranchID").val($(tr).find("td.BranchID").attr('val'));
        $("#txtCode").val($(tr).find("td.Code").attr('val'));
        $('#hSerialNo').val($(tr).find("td.SerialNo").attr('val'))
       // $("#txtCreationDate").val($(tr).find("td.CreationDate").attr('val'));
       // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));


        
        $('#txtPercentage').val($(tr).find("td.Percentage").attr('val'));
       

        $("#slDepartmentID").val($(tr).find("td.DepartmentID").attr('val'));
        $("#txtDepreciableAmount").val($(tr).find("td.DepreciableAmount").attr('val'));
        $("#slDevisonID").val($(tr).find("td.DevisonID").attr('val'));
        $("#slGroupID").val($(tr).find("td.GroupID").attr('val'));

        debugger;
        $("#txtIntialAmount").val($(tr).find("td.IntialAmount").attr('val'));
        
        if (($(tr).find("td.AssetType").attr('val') == 2)) {
            $('#radio_Fixed').prop('checked', true);
            $('#txtLastAmount').val($(tr).find("td.IntialAmount").attr('val'));
            $("#radio_decreasing").prop("disabled", true);
            $("#radio_Fixed").prop("disabled", true);

        }
        else {
            $('#radio_decreasing').prop('checked', true);
            $("#radio_decreasing").prop("disabled", true);
            $("#radio_Fixed").prop("disabled", true);
            var LastAmount = $(tr).find("td.IntialAmount").attr('val') - $(tr).find("td.OpeningDepreciationAmount").attr('val') - $(tr).find("td.ScrappingAmount").attr('val');
            $('#txtLastAmount').val(LastAmount);
        }


        $("#txtOpeningDepreciationAmount").val($(tr).find("td.OpeningDepreciationAmount").attr('val'));
        
        //ADD THIS ROW BY AHMED MAHER TO SOLVE DEMO PROBLEM 30//2022
        $('#slCurrencyID').val($(tr).find("td.CurrencyID").attr('val'));
        $("#txtPurchasingAmount").val($(tr).find("td.PurchasingAmount").attr('val'));
        $("#txtPurchasingDate").val($(tr).find("td.PurchasingDate").attr('val'));
        $("#txtQty").val($(tr).find("td.Qty").attr('val'));
        $("#txtStartDepreciationDate").val($(tr).find("td.StartDepreciationDate").attr('val'));

        $("#txtPurchasingAmountLocal").val($(tr).find("td.PurchasingAmountLocal").attr('val'));

        $("#slBarCodeType").val($(tr).find("td.BarCodeType").attr('val'));
        $("#txtScrappingAmount").val($(tr).find("td.ScrappingAmount").attr('val'));
        $("#cbIsNotDepreciable").prop('checked' ,( $(tr).find("td.IsNotDepreciable").attr('val') == "false" ? false : true));

        $("#txtCode").prop("disabled", true);
      //  $("#slBranchID").prop("disabled", true);
       // $("#slDepartmentID").prop("disabled", true);
      //  $("#slDevisonID").prop("disabled", true);
        IsApproved = $(tr).find("td.Approved").attr('val');
        $("#txtPercentage").prop("disabled", false);
        $("#txtLastAmount").prop("disabled", true);
        GenerateBarCode();

        
        // ABDOOOOO
        assets_type = $(tr).find("td.AssetType").attr('val');
        if (assets_type == 1) {
            $('#radio_decreasing').prop('checked', true);
            $('#radio_Fixed').prop('checked', false);
        }

        if (assets_type == 2) {
            $('#radio_Fixed').prop('checked', true);
            $('#radio_decreasing').prop('checked', false);

        }
        SplitPurchasingAmount();
        if ($("#cbIsNotDepreciable").is(":checked") == true) {
            $('#tblFA_AssetsDestructions>tbody').html('');
            $('#txtPercentage').val('0.00')
            $('#txtPercentage').prop('disabled', true);
        }
        else {

            $('#txtPercentage').prop('disabled', false);
            setTimeout(function () {

                FA_AssetsDestructions_BindTableRows(true);
            }, 1000);
        }

        if ($(tr).find("td.PSInvoiceID").attr('val') != "0" && $(tr).find("td.PSInvoiceID").attr('val') != "") {
            $('#cbIsPSInvoice').prop('checked', true);
        }
        else if ($(tr).find("td.SC_TransactionDetailsID").attr('val') != "0" && $(tr).find("td.SC_TransactionDetailsID").attr('val') != "") {
            $('#cbIsFromSC_Transactions').prop('checked', true);
        }
        else {
            $('#cbIsManual').prop('checked', true);
        }

      //  ClearDetails("#cbIsNotDepreciable");


        

      //  FA_AssetsDestructions_BindTableRows(pID);


       





       




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_Assets_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Assets_Update(true);");











}

function FA_Assets_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_AssetsModal", null);
    $("#hID").val("0");
    IntializeData();
    //  ArrDeleted = [];
    $('#tblFA_AssetsDestructions > tbody').html('');
    ShowHideTransactionsArea(false);
    $('#cbIsFromSC_Transactions').prop('checked', false);
    $('#cbIsPSInvoice').prop('checked', false);

    $('#cbIsManual').prop('checked', true);
    $('#cbIsFromSC_Transactions').prop('disabled', false);

    $('#cbIsManual').prop('disabled', false);
    $('#slSC_TransactionsDetails').prop('disabled', false);

    $('#cbIsPSInvoice').prop('disabled', false);


    $("#slName").val("");
    $("#hSubAccountID").val("0");
    $("#hApproved").val("false");
    $("#hUsed").val("false");
    $("#txtBarCode").val("");
    $("#slBranchID").val("0");
    $("#txtCode").val("");
    // $("#txtCreationDate").val($(tr).find("td.CreationDate").attr('val'));
    // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#slDepartmentID").val("0");
    $("#txtDepreciableAmount").val("0.00");
    $("#slDevisonID").val("0");
    $("#slGroupID").val("0");
    $("#txtIntialAmount").val("0.00");
    $("#txtOpeningDepreciationAmount").val("0.00");
    $("#txtPurchasingAmount").val("0.00");
    $("#txtPurchasingDate").val(getTodaysDateInddMMyyyyFormat());
    $("#txtQty").val("1");
    $("#txtStartDepreciationDate").val(getTodaysDateInddMMyyyyFormat());

    $("#txtPurchasingAmountLocal").val("0");
    //abdoo
    $('#radio_Fixed').prop('checked', true);
  //  $("#slBarCodeType").val($(tr).find("td.BarCodeType").attr('val'));
    $("#txtScrappingAmount").val("0.00");
    $("#cbIsNotDepreciable").prop("checked" , false);




    $('#txtPercentage').val("0.00");
    $('#txtLastAmount').val("0.00");


    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "FA_Assets_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Assets_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    ShowHideInputs();
    $('#BarCodeImg').html("");
    SplitPurchasingAmount();
    $("#radio_decreasing").prop("disabled", false);
    $("#radio_Fixed").prop("disabled", false);
  //  $('#slFiscalYearID').html("");
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_Assets/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_Assets bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function FA_Assets_AddDetails() {
    AppendRowtoTable("tblFA_AssetsDestructions",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + '<td class="FromDate">' + '<input tag="' + getTodaysDateInddMMyyyyFormat() + '"  onblur="CalculateDistructions();" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
            + '<td class="ToDate">' + '<input tag="' + getTodaysDateInddMMyyyyFormat() + '" onblur="CalculateDistructions();" type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
            + "<td class='Percentage' val='" + 0+ "'>" + "<input onblur='CalculateDistructions();' tag=" + 0 + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "<td class='DayAmount' val='" + 0 + "'>" + "<input disabled='disabled' tag=" + 0 + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "<td class='MonthAmount' val='" + 0 + "'>" + "<input disabled='disabled' tag=" + 0 + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "<td class='YearAmount' val='" + 0 + "'>" + "<input disabled='disabled' tag=" + 0 + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "<td class='GroupDestructionID hide' val='" + 0 + "'>" + "<input tag=" + 0 + "  type='text' class='inputGroupDestructionID input-sm  col-sm'>" + "</td>"

            + "</tr>"));

    
    SetDatepickerFormat();
}
function FA_AssetsDestructions_BindTableRows(IsFromHistory)
{

    if ($('#cbIsNotDepreciable').is(":checked") == true)
    {
        $('#tblFA_AssetsDestructions>tbody').html('');
        $('#txtPercentage').val("0.00");
    }
    else
    {


        if (($('#hID').val() == "" || $('#hID').val() == "0") || IsApproved == "false" || IsApproved == false || IsApproved == "0")
            $('#txtLastAmount').val($('#txtIntialAmount').val());
        //if ($('#txtPercentage').val() == "")
        //    swal(TranslateString("Sorry"), TranslateString("YouMustInsertCorrectPercentage"), "warning")
        //else if ($('#txtLastAmount').val() == "")
        //    swal(TranslateString("Sorry"), TranslateString("YouMustInsertCorrectIntialAmount"), "warning")
        //else {
        debugger
        ClearAllTableRows("tblFA_AssetsDestructions");
        FadePageCover(true)
        var date = ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat($('#txtStartDepreciationDate').val()));
        $.ajax({
            type: "GET",
            url: strServerURL + "/api/FA_Assets/LoadFA_AssetsDestructions",
            data:
            {
                pStartDepreciateDate: date,
                pID: ($('#hID').val() == "" ? "0" : $('#hID').val()),
                pLastAmount: ($("#txtLastAmount").val() == "" ? "0.00" : $("#txtLastAmount").val()),
                pPercentage: ($("#txtPercentage").val() == "" ? "0.00" : $("#txtPercentage").val()),
                pIsFromHistorey: IsFromHistory

            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (d) {
                FadePageCover(false)
                var items = JSON.parse(d[0]);
                FadePageCover(false);
                $.each(items, function (i, item) {
                    //debugger;
                    AppendRowtoTable("tblFA_AssetsDestructions",
                        ("<tr ID='" + (typeof item.ID == "undefined" ? "0" : item.ID) + "'>"
                            + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger hide'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + item.ID + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                            + '<td class="FromDate">' + '<input disabled="disabled" tag="' + GetDateFromServer(item.FromDate) + '"  type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                            + '<td class="ToDate">' + '<input disabled="disabled" tag="' + GetDateFromServer(item.ToDate) + '"  type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                            + "<td class='Percentage' val='" + item.Percentage + "'>" + "<input disabled='disabled'  tag=" + item.Percentage + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='DaysCount' val='" + item.DayAmount + "'>" + "<input disabled='disabled' tag=" + item.DaysCount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='MonthsCount' val='" + item.MonthAmount + "'>" + "<input disabled='disabled' tag=" + item.MonthsCount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='YearsCount' val='" + item.YearAmount + "'>" + "<input disabled='disabled' tag=" + item.YearsCount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='DayAmount' val='" + item.DayAmount + "'>" + "<input disabled='disabled' tag=" + item.DayAmount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='MonthAmount' val='" + item.MonthAmount + "'>" + "<input disabled='disabled' tag=" + item.MonthAmount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "<td class='YearAmount' val='" + item.YearAmount + "'>" + "<input disabled='disabled' tag=" + item.YearAmount + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"

                            + "<td class='GroupDestructionID hide' val='" + item.GroupDestructionID + "'>" + "<input tag=" + item.GroupDestructionID + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "</tr>"));
                    debugger
                    if (i == items.length - 1) {
                        var a = $('#tblFA_AssetsDestructions > tbody > tr').length

                        FillHTMLtblInputs("#tblFA_AssetsDestructions>tbody tr");
                        SetDatepickerFormat();
                        // CalculateDistructions();
                    }

                });
            },
            error: function (jqXHR, exception) {
                debugger;
                swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                FadePageCover(false);
            }
        });



        // }

    }
}

function FA_GetGroupPercentage(THIS_Group)
{
    debugger;
   // $('#txtPercentage').val($(THIS_Group).find("option:selected").attr('Percentage'));
   //// $('#txtPercentage').trigger('blur');
   // FA_AssetsDestructions_BindTableRows(false)



    $('#txtPercentage').val($(THIS_Group).find("option:selected").attr('Percentage'));
    // $('#txtPercentage').trigger('blur');
    $('#slAccountID').val($(THIS_Group).find("option:selected").attr('AssetAccount_ID')).trigger('change');
    $('#slDepreciationAccountID').val($(THIS_Group).find("option:selected").attr('AssetDepreciationAccount_ID')).trigger('change');
    $('#slAccumulatedDepreciationAccountID').val($(THIS_Group).find("option:selected").attr('AssetAccumulatedDepreciationAccount_ID')).trigger('change');

    $('#slCostCenterID').val($(THIS_Group).find("option:selected").attr('AssetCostCenter_ID')).trigger('change');

    if ($("#slAccountID").val() == null)
        $("#slAccountID").val("").trigger("change");
    if ($("#slDepreciationAccountID").val() == null)
        $("#slDepreciationAccountID").val("").trigger("change");
    if ($("#slAccumulatedDepreciationAccountID").val() == null)
        $("#slAccumulatedDepreciationAccountID").val("").trigger("change");
    if ($("#slCostCenterID").val() == null)
        $("#slCostCenterID").val("").trigger("change");

    FA_AssetsDestructions_BindTableRows(false)
}

function CheckIfBranchHasAssets(THIS)
{
   // var BranchID = $(THIS).val();
    FadePageCover(true)
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Assets/CheckIfBranchHasAssets",
        data:
        {
            pBranchID: $(THIS).val()
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            FadePageCover(false)
            var items = JSON.parse(d[0]);
            FadePageCover(false);


            if (parseInt(items) > 0)
            {
               
                $('#txtCode').val("AUTO");
                $('#txtCode').prop("disabled" , true);
            }
            else
            {
                $('#txtCode').val(($('#txtCode').val() == "AUTO" ? $('#txtCode').val("") : $('#txtCode').val()));
                $('#txtCode').prop("disabled", false);
            }
             
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}




function DeleteDetails(This) {

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
                ArrDeleted.push($(This).attr('tag'));
                $(This).closest('tr').remove();
            });

    }

}

function SetArrayOfItems() {
    // var cobjItem = null;
    debugger;
    var arrayOfItems = new Array();
    $("#tblFA_AssetsDestructions tbody tr").each(function (i, tr) {
        debugger;

        if ($('#hID').val() == "")
            $('#hID').val("0");


        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.AssetsID = $('#hID').val();
        objItem.GroupDestructionID = $(tr).attr('GroupDestructionID');
        objItem.FromDate = ConvertDateFormat($(tr).find('td.FromDate').find("input").val());
        objItem.ToDate = ConvertDateFormat($(tr).find('td.ToDate').find("input").val());
        objItem.Percentage = $(tr).find('td.Percentage').find('input').val();
        objItem.DayAmount = $(tr).find('td.DayAmount').find('input').val();
        objItem.MonthAmount = $(tr).find('td.MonthAmount').find('input').val();
        objItem.YearAmount = $(tr).find('td.YearAmount').find('input').val();
        arrayOfItems.push(objItem);
    });


    console.log(arrayOfItems);


    return arrayOfItems;
}

//function FireDateChangingEvent()
//{ CalculateDistructions();}

function CalculateDistructions()
{


    $('#txtPurchasingAmountLocal').val
        (
        parseFloat(
            (
                ($('#slCurrencyID option:selected').attr("ExchangeRate") == "0" || $('#slCurrencyID option:selected').attr("ExchangeRate") == "")
                    ? "1" : $('#slCurrencyID option:selected').attr("ExchangeRate")
            )
        )


        *
        parseFloat($('#txtPurchasingAmount').val())
        );


    var PurchasingAmount = parseFloat($('#txtPurchasingAmountLocal').val() == "" ? "0.00" : $('#txtPurchasingAmountLocal').val());
    var ScrappingAmount = parseFloat($('#txtScrappingAmount').val() == "" ? "0.00" : $('#txtScrappingAmount').val());
    var OpeningDepreciationAmount = parseFloat($('#txtOpeningDepreciationAmount').val() == "" ? "0.00" : $('#txtOpeningDepreciationAmount').val());


    debugger;
    // --------------- abdooooooooooooooooooooo
    if (assets_type == 1) { 
        $('#txtIntialAmount').val((PurchasingAmount - (ScrappingAmount + OpeningDepreciationAmount)).toFixed(2))  //parseFloat($('#txtPurchasingAmountLocal').val() == "" ? "0.00" : $('#txtPurchasingAmountLocal').val());

    }
    if (assets_type == 2) {
        $('#txtIntialAmount').val((PurchasingAmount - ScrappingAmount ).toFixed(2))
    }

    if (assets_type == 3) {
        $('#txtIntialAmount').val((PurchasingAmount - ScrappingAmount).toFixed(2))
    }



    //parseFloat($('#txtPurchasingAmountLocal').val() == "" ? "0.00" : $('#txtPurchasingAmountLocal').val());
    
    FA_AssetsDestructions_BindTableRows(false);

    //$("#tblFA_AssetsDestructions > tbody tr").each(function (i, tr) {
    //    DayCount = Date.prototype.compareDates(ConvertDateFormat($(tr).find("td.FromDate input").val()), ConvertDateFormat($(tr).find("td.ToDate input").val())) + 1;



    //    AmountInThisPeriod = ((parseFloat($('#txtIntialAmount').val()) * parseFloat($(tr).find("td.Percentage input").val())) / 100);




    //    var DayAmount = (AmountInThisPeriod / DayCount);
    //    var MonthAmount = (DayAmount * 30).toFixed(2);
    //    var YearAmount = (DayAmount * 365).toFixed(2);
    //    DayAmount = DayAmount.toFixed(2);



    //    $(tr).find("td.DayAmount input").val(DayAmount);
    //    $(tr).find("td.MonthAmount input").val(MonthAmount);
    //    $(tr).find("td.YearAmount input").val(YearAmount);

    //});




}









function GenerateBarCode()
{
    //FadePageCover(true)
    debugger
    setTimeout(function () {

        $("#BarCodeImg").barcode(
            $("#txtBarCode").val(), // Value barcode (dependent on the type of barcode)
            $("#slBarCodeType").val() // type (string)
        );
        FadePageCover(false);
    }, 300);
}

function GenerateBarCodeForTable(ID , pcode , type) {
    //FadePageCover(true)
    debugger
    setTimeout(function () {

        $("#BarCodeImgID" + ID + "" ).barcode(
            pcode, // Value barcode (dependent on the type of barcode)
            $("#slBarCodeType option[value=\"" + type + "\"]").val() // type (string)
        );
        FadePageCover(false);
    }, 300);
}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}







function SplitPurchasingAmount() {

    setTimeout(function () {
    $('#PurchasingAmountWithComma').text(addCommas($('#txtPurchasingAmount').val()));
    $('#PurchasingAmountLocalWithComma').text(addCommas($('#txtPurchasingAmountLocal').val()));

    }, 300);
}


//function CheckTableDate(tbl)
//{

//    $(tbl).each(function (i, tr) {


//        moment($(tr).find("td.FromDate input").val() , 'MM/DD/YYYY').toDate();


//        var FromDate = moment( ;
//        var ToDate = $(tr).find("td.ToDate input").val();







//    });


//}

