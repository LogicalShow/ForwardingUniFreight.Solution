// City Country ---------------------------------------------------------------
// Bind FA_Assets Table Rows









function FA_Assets_BindTableRows(pFA_Assets) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_Assets");
    $.each(pFA_Assets, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Assets",
            ("<tr ID='" + item.ID + "' ondblclick='FA_Assets_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='BarCode' val='" + item.BarCode + "'>" + item.BarCode + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='DevisonID' val='" + item.DevisonID + "'>" + item.DevisonName + "</td>"
                + "<td class='GroupID' val='" + item.GroupID + "'>" + item.GroupName + "</td>"
                + "<td class='Qty hide' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='Approved' val='" + item.Approved + "'>" + (item.Approved == true ? "Approved" : "" ) + "</td>"
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
                + "<td class='hFA_Assets'><a href='#FA_AssetsModal' data-toggle='modal' onclick='FA_Assets_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
 //   ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Assets", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Assets>tbody>tr", $("#txt-Search").val());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}
function FA_Assets_EditByDblClick(pID) {
    jQuery("#FA_AssetsModal").modal("show");
    FA_Assets_FillControls(pID);
}
// Loading with data
function FA_Assets_LoadingWithPaging() {
    debugger;
  //  LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Assets/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Assets_BindTableRows(pTabelRows); FA_Assets_ClearAllControls(); });
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Assets/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Assets_BindTableRows(pTabelRows); });
    HighlightText("#tblFA_Assets>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function FA_Assets_Insert(pSaveandAddNew) {
    Isvalidated = true;
    $('#tblFA_AssetsDestructions>tbody>tr').each(function (i, tr) {
        if (//$(tr).find('.selectaccount').val().trim() == "0" ||
            $(tr).find('.inputvalue').val().trim() == "" || $('#slSubAccountID').val() == "0") {
            swal('Sorry', 'You Must Fill All Details Data', 'warning');
            Isvalidated = false;
            // break;
        }

        if (i == $('#tblFA_AssetsDestructions>tbody>tr').length - 1) {

            if (Isvalidated) {
                debugger;
                InsertUpdateFunctionAndReturnID("form", "/api/FA_Assets/Insert", {
                    pName : $('#txtName').val(),
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
                    pPurchasingDate: ConvertDateFormat( $('#txtPurchasingDate').val()),
                    pQty: $('#txtQty').val(),
                    pStartDepreciationDate: ($('#txtStartDepreciationDate').val() == "" ? ConvertDateFormat($('#txtPurchasingDate').val()) : ConvertDateFormat(  $('#txtStartDepreciationDate').val())),
                    pPurchasingAmountLocal: $('#txtPurchasingAmountLocal').val(),
                    pExchangeRate: $('#slCurrencyID option:selected').attr("ExchangeRate"),
                    pBarCodeType: $('#slBarCodeType').val(),
                    pScrappingAmount: $('#txtScrappingAmount').val(),
                    pIsNotDepreciable: $('#cbIsNotDepreciable').prop("checked"),
                    pDepreciationTypeID: 1,
                    pInvoiceID: 1
                }, pSaveandAddNew, 'FA_AssetsModal', '#hID', function () {
                    FA_Assets_LoadingWithPaging();
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/FA_Assets/InsertItems",
                       SetArrayOfItems()
                        , pSaveandAddNew, "FA_AssetsModal", function () {
                            setTimeout(function () {
                                
                                ArrDeleted = [];
                                $("#hID").val("0")
                                $('#tblFA_AssetsDestructions > tbody').html('');
                                  IntializeData();
                                ClearAllTableRows('tblFA_AssetsDestructions');
                                FA_Assets_LoadingWithPaging();
                            }, 300);

                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        }






    });

}



function FA_Assets_Update(pSaveandAddNew) {

    if ($('#tblFA_AssetsDestructions>tbody>tr').length <= 0)
    {

        setTimeout(function () {

            console.log('arr deleted ' + ArrDeleted.join(","))
            console.log('arr deleted ' + ArrDeleted.length)
            if (ArrDeleted.length > 0)
                DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": ArrDeleted.join(","), "type": "3" }, function () { ArrDeleted = []; });
           // swal(TranslateString("Done"), "", 'sucess');
         
            jQuery("#FA_AssetsModal").modal("hide");
            $('#tblFA_AssetsDestructions > tbody').html('');

            $("#hID").val("0")

            IntializeData();
            ClearAllTableRows('tblFA_AssetsDestructions');
            FA_Assets_LoadingWithPaging();
        }, 300);
    }
    else
    {
        //------------------------------------- ----------- -  - - - - -- - - - - -
        Isvalidated = true;
        $('#tblFA_AssetsDestructions>tbody>tr').each(function (i, tr) {
            if (//$(tr).find('.selectaccount').val().trim() == "0" ||
                $(tr).find('.inputvalue').val().trim() == "") {
                swal('Sorry', 'You Must Fill All Details Data', 'warning');
                Isvalidated = false;
                //  break;
            }

            if (i == $('#tblFA_AssetsDestructions>tbody>tr').length - 1) {


                if (Isvalidated) {




                    isOverlap("#tblFA_AssetsDestructions", "FromDate", "ToDate", function (IsOverlap) {


                        if (IsOverlap == "false") {



                            //------------------------------------- ----------- -  - - - - -- - - - - -
                            InsertUpdateListOfObject("/api/FA_DestructionsStopsPeriod/InsertItems",
                                SetArrayOfItems()
                                , pSaveandAddNew, "FA_AssetsModal", function () {
                                    setTimeout(function () {

                                        console.log('arr deleted ' + ArrDeleted.join(","))
                                        console.log('arr deleted ' + ArrDeleted.length)
                                        if (ArrDeleted.length > 0)
                                            DeleteListFunction("/api/FA_Assets/Delete", { "pFA_AssetsIDs": ArrDeleted.join(","), "type": "3" }, function () { ArrDeleted = []; });


                                        $('#tblFA_AssetsDestructions > tbody').html('');

                                        $("#hID").val("0")

                                        IntializeData();
                                        ClearAllTableRows('tblFA_AssetsDestructions');
                                        FA_Assets_LoadingWithPaging();
                                    }, 300);

                                });
                            //------------------------------------- ----------- -  - - - - -- - - - - -

                        }
                        else {

                            swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning');
                        }

                    });



                }


            }

        });

    }
    //------------------------------------- ----------- -  - - - - -- - - - - -



}


function IntializeData(callback) {

    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "/api/FA_Assets/IntializeData",
    //    data: { pID: $('#hID').val(), pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), IsCurrency: "false"  },
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (d) {
    //        var currencyid = $('#slCurrencyID').val();
    //        Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'Name', '<-- select Group-->', '#slGroupID', '', "SubAccountID,ParentSubAccountID");
    //        Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', '<-- select Branches -->', '#slBranchID', '');
    //        Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', '<-- select Department -->', '#slDepartmentID', '');
    //        Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', '<-- select Devison -->', '#slDevisonID', '');
    //        Fill_SelectInputAfterLoadData_WithAttr(d[4], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');

         
    //       // RecalculateExchangeRate()
    //        if (typeof callback !== "undefined" && callback != null)
    //            callback();

    //        FadePageCover(false);
    //    },
    //    error: function (jqXHR, exception) {
    //        debugger;
    //        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
    //        FadePageCover(false);
    //    }
    //});
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



function FA_Assets_FillControls(pID) {
    $('#tblFA_AssetsDestructions > tbody').html('');
    debugger;
    ClearAll("#FA_AssetsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");




   
    //$('#hApproved').val($(tr).find("td.Approved").attr("val"));
    //$('#hUsed').val($(tr).find("td.HasTransaction").attr("val"));
    
    //ShowHideInputs();

   // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_Assets/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
   




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);
    FA_AssetsDestructions_BindTableRows(null);
    IntializeData(function () {


       // $("#txtName").val($(tr).find("td.Name").attr('val'));
       // $("#hSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
       // $("#hApproved").val($(tr).find("td.Approved").attr('val'));
       // $("#txtBarCode").val($(tr).find("td.BarCode").attr('val'));
       // $("#slBranchID").val($(tr).find("td.BranchID").attr('val'));
       // $("#txtCode").val($(tr).find("td.Code").attr('val'));
       //// $("#txtCreationDate").val($(tr).find("td.CreationDate").attr('val'));
       //// $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
       // $("#slDepartmentID").val($(tr).find("td.DepartmentID").attr('val'));
       // $("#txtDepreciableAmount").val($(tr).find("td.DepreciableAmount").attr('val'));
       // $("#slDevisonID").val($(tr).find("td.DevisonID").attr('val'));
       // $("#slGroupID").val($(tr).find("td.GroupID").attr('val'));
       // $("#txtIntialAmount").val($(tr).find("td.IntialAmount").attr('val'));
       // $("#txtOpeningDepreciationAmount").val($(tr).find("td.OpeningDepreciationAmount").attr('val'));
       // $("#txtPurchasingAmount").val($(tr).find("td.PurchasingAmount").attr('val'));
       // $("#txtPurchasingDate").val($(tr).find("td.PurchasingDate").attr('val'));
       // $("#txtQty").val($(tr).find("td.Qty").attr('val'));
       // $("#txtStartDepreciationDate").val($(tr).find("td.StartDepreciationDate").attr('val'));

       // $("#txtPurchasingAmountLocal").val($(tr).find("td.PurchasingAmountLocal").attr('val'));

       // $("#slBarCodeType").val($(tr).find("td.BarCodeType").attr('val'));
       // $("#txtScrappingAmount").val($(tr).find("td.ScrappingAmount").attr('val'));
       // $("#cbIsNotDepreciable").val($(tr).find("td.IsNotDepreciable").attr('val'));




       // GenerateBarCode();
       

       // FA_AssetsDestructions_BindTableRows(pID);






       




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_Assets_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Assets_Update(true);");











}

function FA_Assets_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_AssetsModal", null);
    //  ArrDeleted = [];
    $('#tblFA_AssetsDestructions > tbody').html('');

    $("#slName").val("");
    $("#hSubAccountID").val("0");
    $("#hApproved").val("false");
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
    $("#txtQty").val("0");
    $("#txtStartDepreciationDate").val(getTodaysDateInddMMyyyyFormat());

    $("#txtPurchasingAmountLocal").val("0");

  //  $("#slBarCodeType").val($(tr).find("td.BarCodeType").attr('val'));
    $("#txtScrappingAmount").val("0.00");
    $("#cbIsNotDepreciable").prop("checked" , false);








    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "FA_Assets_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Assets_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

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
            + '<td class="FromDate">' + '<input tag="' + getTodaysDateInddMMyyyyFormat() + '"  onblur="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
            + '<td class="ToDate">' + '<input tag="' + getTodaysDateInddMMyyyyFormat() + '" onblur="" type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
            + "</tr>"));

    
    SetDatepickerFormat();
}
function FA_AssetsDestructions_BindTableRows(THIS_Group) {
    debugger
    ClearAllTableRows("tblFA_AssetsDestructions");
    FadePageCover(true)

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_DestructionsStopsPeriod/FA_DestructionsStopsPeriod",
        data: {
            pGroupID: (THIS_Group == null ? "0" : $(THIS_Group).val() ),
            pSubAccountID: (THIS_Group == null ? "0" : $(THIS_Group).find('option:selected').attr('SubAccountID')),
            pParentSubAccountID: (THIS_Group == null ? "0" : $(THIS_Group).find('option:selected').attr('ParentSubAccountID')),
            pAssetID: (THIS_Group == null ? $('#hID').val() : "0")
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
                    ("<tr ID='" + (typeof item.ID == "undefined" ? "0" : item.ID ) + "'>"
                        + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + item.ID + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + '<td class="FromDate">' + '<input tag="' + GetDateFromServer(item.FromDate) + '"  onblur="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                        + '<td class="ToDate">' + '<input tag="' + GetDateFromServer(item.ToDate) + '" onblur="" type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
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
                
        objItem.AssetID = $('#hID').val();
        objItem.FromDate = ConvertDateFormat($(tr).find('td.FromDate').find("input").val());
        objItem.ToDate = ConvertDateFormat($(tr).find('td.ToDate').find("input").val());
        objItem.Notes = "0";
        arrayOfItems.push(objItem);
    });


    console.log(arrayOfItems);


    return arrayOfItems;
}

function FireDateChangingEvent()
{ }

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





    $('#txtIntialAmount').val((PurchasingAmount - (ScrappingAmount + OpeningDepreciationAmount)).toFixed(2))  //parseFloat($('#txtPurchasingAmountLocal').val() == "" ? "0.00" : $('#txtPurchasingAmountLocal').val());




    $("#tblFA_AssetsDestructions > tbody tr").each(function (i, tr) {
        DayCount = Date.prototype.compareDates(ConvertDateFormat($(tr).find("td.FromDate input").val()), ConvertDateFormat($(tr).find("td.ToDate input").val())) + 1;



        AmountInThisPeriod = ((parseFloat($('#txtIntialAmount').val()) * parseFloat($(tr).find("td.Percentage input").val())) / 100);




        var DayAmount = (AmountInThisPeriod / DayCount);
        var MonthAmount = (DayAmount * 30).toFixed(2);
        var YearAmount = (DayAmount * 365).toFixed(2);
        DayAmount = DayAmount.toFixed(2);



        $(tr).find("td.DayAmount input").val(DayAmount);
        $(tr).find("td.MonthAmount input").val(MonthAmount);
        $(tr).find("td.YearAmount input").val(YearAmount);

    });




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

//function CheckTableDate(tbl)
//{

//    $(tbl).each(function (i, tr) {


//        moment($(tr).find("td.FromDate input").val() , 'MM/DD/YYYY').toDate();


//        var FromDate = moment( ;
//        var ToDate = $(tr).find("td.ToDate input").val();







//    });


//}

