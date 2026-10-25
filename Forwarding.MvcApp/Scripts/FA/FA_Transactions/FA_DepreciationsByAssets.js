// City Country ---------------------------------------------------------------
// Bind FA_DepreciationsByAssets Table Rows

function FA_DepreciationsByAssets_BindTableRows(pFA_DepreciationsByAssets) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_DepreciationsByAssets");
    $.each(pFA_DepreciationsByAssets, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_DepreciationsByAssets",
            ("<tr ID='" + item.ID + "' ondblclick='FA_DepreciationsByAssets_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='AssetCode' val='" + item.AssetCode + "'>" + item.AssetCode + "</td>"
                + "<td class='AssetID' val='" + item.AssetID + "'>" + item.AssetName + "</td>"
                + "<td class='FromDate' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer(item.FromDate) + "</td>"
                + "<td class='ToDate' val='" + GetDateFromServer(item.ToDate) + "'>" + GetDateFromServer(item.ToDate) + "</td>"
                + "<td style='color:blue;font-weight: bold;background-color:lightblue;' class='Amount' val='" + parseFloat(item.Amount).toFixed(2) + "'>" + parseFloat(item.Amount).toFixed(2) + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='DepreciationID hide' val='" + item.DepreciationID + "'>" + item.DepreciationID + "</td>"

                + "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                + "<td class='IsApproved hide' val='" + item.IsApproved + "'>" + item.IsApproved + "</td>"
                + "<td class='CreationDate ' val='" + GetDateFromServer(item.CreationDate) + "'>" + GetDateFromServer(item.CreationDate) + "</td>"
                + "<td class='Qty hide' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='PeriodType hide' val='" + item.PeriodType + "'>" + item.PeriodType + "</td>"
                + "<td class='hide'> <button tag=" + item.ID + " type='button' onclick='Print(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + TranslateString("Print") + "&nbsp;</i></button></td>"
                + "<td class='hFA_DepreciationsByAssets hide'><a href='#FA_DepreciationsByAssetsModal' data-toggle='modal' onclick='FA_DepreciationsByAssets_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_DepreciationsByAssets", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_DepreciationsByAssets>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}

function Print(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("DepreciationID");
    arr_Values.push(ID);
    //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));
    
    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "FA_DepreciationsByAssets_AR"
        , pReportName: "FA_DepreciationsByAssets_AR"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}


function FA_DepreciationsByAssets_EditByDblClick(pID) {
    jQuery("#FA_DepreciationsByAssetsModal").modal("show");
    FA_DepreciationsByAssets_FillControls(pID);
}
// Loading with data
function FA_DepreciationsByAssets_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where  ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = " + $('#txtCode_Filter').val() + "";
    }


    //if ($('#txtName_Filter').val().trim() != "")
    //{
    //    WhereClause += " AND AssetName LIKE '%" + $('#txtName_Filter').val() + "%'";
    //}

    //if ($('#txtBarCode_Filter').val().trim() != "") {
    //    WhereClause += " AND BarCode LIKE '%" + $('#txtBarCode_Filter').val() + "%'";
    //}



    if ($('#slAssets_Filter').val().trim() != "0") {
        WhereClause += " AND AssetID = " + $('#slAssets_Filter').val() + "";
    }
    if ($('#slPeriodType_Filter').val().trim() != "0") {
        WhereClause += " AND PeriodType = " + $('#slPeriodType_Filter').val() + "";
    }
    //if ($('#slDevisonID_Filter').val().trim() != "0") {
    //    WhereClause += " AND DevisonID = " + $('#slDevisonID_Filter').val() + "";
    //}
    ////if ($('#slTransactionTypeID_Filter').val().trim() != "0")
    ////{
    ////    WhereClause += " AND TransactionTypeID = " + $('#slTransactionTypeID_Filter').val() + "";
    ////}


    //if ($('#slDepartmentID_Filter').val().trim() != "0") {
    //    WhereClause += " AND DepartmentID = " + $('#slDepartmentID_Filter').val() + "";
    //}
    
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , FromDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , FromDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ToDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , ToDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_DepreciationsByAssets/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_DepreciationsByAssets_BindTableRows(pTabelRows); FA_DepreciationsByAssets_ClearAllControls(); });
    HighlightText("#tblFA_DepreciationsByAssets>tbody>tr", $("#txt-Search").val().trim());
    

}

//var IsOldName = "0";
var Isvalidated = true;

function FA_DepreciationsByAssets_Insert(pSaveandAddNew , pIsReview) {


   // IntializeData(true, function () {
        if (moment($('#txtFromDate').val(), 'DD/MM/YYYY').toDate() > moment($('#txtToDate').val(), 'DD/MM/YYYY').toDate())
        {

            swal(TranslateString("Sorry"), TranslateString("FromDateMUST>ToDate"), 'warning');

        }
        else
        {
            //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
            InsertUpdateFunction("form", "/api/FA_DepreciationsByAssets/Insert", {
                FromDate: ConvertDateFormat($('#txtFromDate').val()), ToDate: ConvertDateFormat($('#txtToDate').val()), AssetID: $('#slAssets').val(), Date: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), IsReview: pIsReview, PeriodType: $('#slPeriodType').val(), ID:$('#hID').val()
            }, false, null, function (data)
                {



                if (pIsReview == true) {
                    $('#tblDetails > tbody').html('');
                    var items = data[1];
                    FadePageCover(false);
                    var Total = 0;
                    $.each(items, function (i, item) { // AssetName //BarCode //Amount
                        //debugger;
                        AppendRowtoTable("tblDetails",
                            ("<tr ID='" + 0 + "'>"
                                + "<td class='hide'> <button tag=" + 0 + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                                + "<td class='NAME' val='" + (typeof item.mAssetName == "undefined" ? item.mNAME : item.mAssetName) + "'>" + "<input tag=" + (typeof item.mAssetName == "undefined" ? item.mNAME : item.mAssetName) + "  type='text' disabled='disabled' class='inputvalue input-sm  col-sm'>" + "</td>"
                                + "<td class='BarCode' val='" + (typeof item.mBarCode == "undefined" ? item.mBarCode : item.mBarCode) + "'>" + "<input tag=" + (typeof item.mBarCode == "undefined" ? item.mBarCode : item.mBarCode) + "  type='text' disabled='disabled' class='inputvalue input-sm  col-sm'>" + "</td>"
                                + "<td class='SumAmount' val='" + (typeof item.mLastAmount == "undefined" ? item.mLastAmount : item.mLastAmount) + "'>" + "<input tag=" + (typeof item.mLastAmount == "undefined" ? item.mLastAmount : item.mLastAmount) + "  type='text' disabled='disabled' class='inputvalue input-sm  col-sm'>" + "</td>"
                                + "<td class='SumAmount' val='" + (typeof item.mAmount == "undefined" ? item.mSumAmount : item.mAmount) + "'>" + "<input tag=" + (typeof item.mAmount == "undefined" ? item.mSumAmount : item.mAmount) + "  type='text' disabled='disabled' class='inputvalue input-sm  col-sm'>" + "</td>"
                                + "</tr>"));
                        Total = Total + parseFloat( (typeof item.mAmount == "undefined" ? item.mSumAmount : item.mAmount) )
                        debugger
                        if (i == items.length - 1) {
                            var a = $('#tblDetails > tbody > tr').length;
                            $('#txtAmount').val((Total).toFixed(2));
                            FillHTMLtblInputs("#tblDetails>tbody tr");
                          //  SetDatepickerFormat();
                        }

                    });




                }
                else {


                    ArrDeleted = [];
                    $("#hID").val("0")
                    FA_DepreciationsByAssets_ClearAllControls();
                    //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                    IntializeData(false);
                    //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                   


                    if (pSaveandAddNew == false)
                        jQuery("#FA_DepreciationsByAssetsModal").modal('hide');

                    swal(TranslateString("Done"), TranslateString("YourTransactionIsInserted") ,  "Success");
                    FA_DepreciationsByAssets_LoadingWithPaging();
                }






            });


     //   }






  //  });




        }

          











  //  });





}


function FA_DepreciationsByAssets_Update(pSaveandAddNew) {


    IntializeData(true, function () {



       // Isvalidated = true;
        // $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
        if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
            swal(TranslateString("Sorry"), TranslateString("ErrorNumeric"), 'warning');
        }
        else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
            swal(TranslateString("Sorry"), TranslateString("ErrorNumeric"), 'warning');
        }
        else if (moment($('#txtFA_LastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

            swal(TranslateString("Sorry"), TranslateString("DateMust>LastDepreciationDate"), 'warning');

        }
        else if ((    (parseFloat($('#txtCurrentAmount').val()) - parseFloat($('#hOldAmount').val()) ) + parseFloat($('#txtAmount').val())) < 0) {

            swal(TranslateString("Sorry"), TranslateString("YourInsertedAmountCauseNegativeValue_U"), 'warning');
        }
        else if (((parseFloat($('#txtCurrentQty').val()) - parseFloat($('#hOldQty').val()))  + parseFloat($('#txtQty').val())) < 0) {

            swal(TranslateString("Sorry"), TranslateString("YourInsertedQtyCauseNegativeValue_U"), 'warning');
        }

        else {
            //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
            InsertUpdateFunctionAndReturnID("form", "/api/FA_DepreciationsByAssets/Update", {
                pID:$('#hID').val(),
                pTransactionTypeID: 20,
                pAmount: $('#txtAmount').val(),
                pFromDate: ConvertDateFormat($('#txtDate').val()),
                pToDate: ConvertDateFormat($('#txtDate').val()),
                pQtyFactor: 1,
                pQty: $('#txtQty').val(),
                pIsApproved: "false",
                pNotes:( $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val()  ),
                pPercentage: "0",
                pDepreciationTypeID: "0",
                pAssetID: $('#slAssetID').val(),
                pJVID: "0",
                pBranchID: $('#slAssetID option:selected').attr('BranchID'),
                pExludedTypeID: "0",
                pCode: $('#txtCode').val(),
                pIsDeleted: "false",
                pDepreciationID: "0",
                pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                pAmountFactor: 1
            }, pSaveandAddNew, "FA_DepreciationsByAssetsModal", '#hID', function () {

                if (pSaveandAddNew == false)
                    jQuery("#FA_DepreciationsByAssetsModal").modal('hide');


                swal("Done", "Your Transaction Is Updated", "Success");
                ArrDeleted = [];
                $("#hID").val("0")
                FA_DepreciationsByAssets_ClearAllControls();
                //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                IntializeData(false);
                //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                FA_DepreciationsByAssets_LoadingWithPaging();






                //FA_DepreciationsByAssets_LoadingWithPaging();
                ////------------------------------------- ----------- -  - - - - -- - - - - -
                //InsertUpdateListOfObject("/api/FA_DepreciationsByAssets/InsertItems",
                //   SetArrayOfItems()
                //    , pSaveandAddNew, "FA_DepreciationsByAssetsModal", function () {
                //        setTimeout(function () {

                //            ArrDeleted = [];
                //            $("#hID").val("0")
                //            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                //              IntializeData(false);
                //            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                //            FA_DepreciationsByAssets_LoadingWithPaging();
                //        }, 300);

                //    });
                //------------------------------------- ----------- -  - - - - -- - - - - -
            });


            //   }






            //  });




        }













    });





}




function SetCurrentData(callback)
{
    //if ($('#slTransactionTypeID').val().trim() == "30")
    //{
        if ($('#slAssetID').val() != "0") {
            $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssetID option:selected').attr('FA_LastDepreciationDate')));
            $('#txtCurrentAmount').val($('#slAssetID option:selected').attr('LastAmount'));
            $('#txtCurrentQty').val($('#slAssetID option:selected').attr('LastQty'));
            $('#txtAmount').prop('disabled', false);
            $('#txtQty').prop('disabled', false);
        }
        else
        {
            $('#txtFA_LastDepreciationDate').val("");
            $('#txtCurrentAmount').val("0");
            $('#txtCurrentQty').val("0");
            $('#txtAmount').prop('disabled', false);
            $('#txtQty').prop('disabled', false);


            $('#txtAmount').val("0");
            $('#txtQty').val("0");
        }

    //}




    if (typeof callback !== "undefined" && callback != null)
        callback();


}




function IntializeData( IsAsset , callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_DepreciationsByAssets/IntializeData",
        data: { pTransactionTypeID: "40", pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {


            if (IsAsset == true) {
             //   Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', '<-- select From Menue -->', '#slAssetID', $('#slAssetID').val(), 'BarCode,BarCodeType,FA_LastDepreciationDate,LastAmount,LastQty,BranchID,IsExcluded');
                Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), $('#slAssetID').val(), '', 'LastAmount,LastDepreciationDate');

            }
            else {


               // Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', '<-- select From Menue -->', '#slAssetID', '', 'BarCode,BarCodeType,FA_LastDepreciationDate,LastAmount,LastQty,BranchID,IsExcluded');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#slAssets_Filter', '', 'LastAmount,LastDepreciationDate');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#slAssets', '', 'LastAmount,LastDepreciationDate');
                //Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', null, '#slExludedTypeID', '');
                //Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', null, '#slTransactionTypeID', '');
                //Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', '<-- select From Menue -->', '#slTransactionTypeID_Filter', '');
                //Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', '<-- select From Menue -->', '#slDepartmentID_Filter', '');
                //Fill_SelectInputAfterLoadData(d[5], 'ID', 'Name', '<-- select From Menue -->', '#slDevisonID_Filter', '');

            }
            
           // SetCurrentData();



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




//function FA_DepreciationsByAssets_Delete(pID) {
//    DeleteListFunction("/api/FA_DepreciationsByAssets/DeleteByID", { "pID": pID, "type": "1" }, function () { FA_DepreciationsByAssets_LoadingWithPaging(); });
//}

function FA_DepreciationsByAssets_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_DepreciationsByAssets') != "")
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
                DeleteListFunction("/api/FA_DepreciationsByAssets/Delete", { "pFA_DepreciationsByAssetsIDs": GetAllSelectedIDsAsString('tblFA_DepreciationsByAssets'), "type": "1" }, function () { FA_DepreciationsByAssets_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_DepreciationsByAssets/Delete", { "pFA_DepreciationsByAssetsIDs": GetAllSelectedIDsAsString('tblFA_DepreciationsByAssets') }, function () { FA_DepreciationsByAssets_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_DepreciationsByAssets_FillControls(pID) {
    $('#tblDetails > tbody').html('');
    debugger;
    ClearAll("#FA_DepreciationsByAssetsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

   // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_DepreciationsByAssets/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
   // FA_AssetsGroupDestructions_BindTableRows(pID);




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);

    IntializeData(false , function () {

        setTimeout(function () {
            var tr = $("tr[ID='" + pID + "']");
         
            $('#txtFromDate').val($(tr).find("td.FromDate").attr('val'));
            $('#txtToDate').val($(tr).find("td.ToDate").attr('val'));
            $('#txtAmount').val($(tr).find("td.Amount").attr('val'));

            $('#slPeriodType').val(($(tr).find("td.slPeriodType").attr('val') == "0" ? "1" : $(tr).find("td.slPeriodType").attr('val')) );
           // $('#txtAmount').val($(tr).find("td.Amount").attr('val'));
            $('#txtCode').val($(tr).find("td.Code").attr('val'));
           // IntializeData(true);
            ShowHideInputs();

          //  console.log(($(tr).find("td.slPeriodType").attr('val').trim() == "0" ? "1" : $(tr).find("td.slPeriodType").attr('val')));


          

                $('#slAssets').val($(tr).find("td.AssetID").attr('val'));
            $('#slPeriodType').val(($(tr).find("td.PeriodType").attr('val').trim() == "0" ? "1" : $(tr).find("td.PeriodType").attr('val')));

            $('#slPeriodType').val(($(tr).find("td.PeriodType").attr('val').trim() == "0" ? "1" : $(tr).find("td.PeriodType").attr('val')));

                $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssets option:selected').attr('lastdepreciationdate')));
                FA_DepreciationsByAssets_Insert(false, true);
            
        }, 500);




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_DepreciationsByAssets_Insert(false ,false);");
    $("#btnSaveandNew").attr("onclick", "FA_DepreciationsByAssets_Insert(false , true);");


   
    
}
function ShowHideInputs() {

    //if ($('#slTransactionTypeID') == "60") {

    //    $('.CanEdit').prop('disabled', true);

    //}
    //else {
    //    $('.CanEdit').prop('disabled', false);

    //}



    if ($('#hID').val() != "" && $('#hID').val() != "0" ) {
        $('#btnSave').addClass("hide");
        $('#btnSaveandNew').addClass("hide");
        $('#btn-Delete1').removeClass("hide");
     //   $('.CanEdit').prop('disabled', true);

        $('#btnReview').addClass('hide')


    }
    else
    {
        $('#btnSave').removeClass("hide");
        $('#btnSaveandNew').addClass("hide");
        $('#btn-Delete1').addClass("hide");
        $('#txtAmount').prop('disabled' , true)
     //   $('.CanEdit').prop('disabled', false);

        $('#btnReview').removeClass('hide')
        SetFromDate();



    }


    $('#txtAmount').prop('disabled', true)


   // $('#slTransactionTypeID').prop("disabled", true);
   // $('#slAssetID').prop("disabled", true);
}



function SetFromDate()
{
    console.log(GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')) )

    if (GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')) == '01/01/1900' || GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')) == '01/01/1900')
    {
        $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
        $('#txtFromDate').prop('disabled', false);
        $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')));

    }
    else
    {
        $('#txtFromDate').val(moment(GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')) , 'DD/MM/YYYY').add(1 , 'days').format('DD/MM/YYYY'));
        $('#txtFromDate').prop('disabled', true);
        $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssets option:selected').attr('LastDepreciationDate')));
    }

}


function SetToDate() {

    if ($('#slPeriodType').val() == "1") { // Specified Period
        $('#txtToDate').prop("disabled" , false);

    }
    else if ($('#slPeriodType').val() == "2") { // Day
        $('#txtToDate').prop("disabled", true);
        $('#txtToDate').val(  moment($('#txtFromDate').val(), 'DD/MM/YYYY').add(0, 'days').format('DD/MM/YYYY'));
    }
    else if ($('#slPeriodType').val() == "3") { // Month
        $('#txtToDate').prop("disabled", true);
        $('#txtToDate').val(moment($('#txtFromDate').val(), 'DD/MM/YYYY').add(1, 'months').format('DD/MM/YYYY'));
    }
    else if ($('#slPeriodType').val() == "4") { // Year
        $('#txtToDate').prop("disabled", true);
        $('#txtToDate').val(moment($('#txtFromDate').val(), 'DD/MM/YYYY').add(1, 'years').format('DD/MM/YYYY'));
    }
    
}





function FA_DepreciationsByAssets_ClearAllControls() {
    debugger;
    ClearAll("#FA_DepreciationsByAssetsModal", null);
    $('#tblDetails > tbody').html('');
    $('#txtAmount').val("0");
    $('#txtCode').val("AUTO");
    $("#btnSave").attr("onclick", "FA_DepreciationsByAssets_Insert(false , false);");
    $("#btnSaveandNew").attr("onclick", "FA_DepreciationsByAssets_Insert(false , true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    $('#btn-Delete1').addClass("hide");
    ShowHideInputs();
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_DepreciationsByAssets/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_DepreciationsByAssets bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function FA_DepreciationsByAssets_AddDetails() {
    AppendRowtoTable("tblFA_AssetsGroupDestructions",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + '<td class="FromDate">' + '<input tag="0"  onchange="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
        + '<td class="ToDate">' + '<input tag="0"  onchange="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
            + "<td class='Percentage' val='" + "0" + "'>" + "<input tag='0'  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "</tr>"));


    SetDatepickerFormat();
}
function FA_AssetsGroupDestructions_BindTableRows(pID) {
        ClearAllTableRows("tblFA_AssetsGroupDestructions");
    LoadAll("/api/FA_DepreciationsByAssets/LoadFA_AssetsGroupDestructions", " where AssestGroupID = " + pID + " ", function (pitems) {
            var items = JSON.parse(pitems);
            FadePageCover(false);
            $.each(items, function (i, item) {
                //debugger;
                AppendRowtoTable("tblFA_AssetsGroupDestructions",
                    ("<tr ID='" + item.ID  + "'>"
                        + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + item.ID + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + '<td class="FromDate">' + '<input tag=' + GetDateFromServer( item.FromDate )+ '  onchange="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                        + '<td class="ToDate">' + '<input tag=' + GetDateFromServer(item.ToDate)   + ' onchange="" type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                        + "<td class='Percentage' val='" + item.Percentage + "'>" + "<input tag=" + item.Percentage + "  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
                        + "</tr>"));
                debugger
                if (i == items.length - 1) {
                    var a = $('#tblFA_AssetsGroupDestructions > tbody > tr').length

                    FillHTMLtblInputs("#tblFA_AssetsGroupDestructions>tbody tr");
                    SetDatepickerFormat();
                }

            });

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
    $("#tblFA_AssetsGroupDestructions tbody tr").each(function (i, tr) {
        debugger;

        if ($('#hID').val() == "")
            $('#hID').val("0");


        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.AssestGroupID = $('#hID').val();
        objItem.FromDate = ConvertDateFormat($(tr).find('td.FromDate').find("input").val());
        objItem.ToDate = ConvertDateFormat($(tr).find('td.ToDate').find("input").val());
        objItem.Percentage = $(tr).find('td.Percentage').find('input').val();
        objItem.Notes = "0";
        arrayOfItems.push(objItem);
    });


    console.log(arrayOfItems);


    return arrayOfItems;
}






function FA_DepreciationsByAssets_Delete(pSaveandAddNew) {
    swal({
        title: "Are you sure?",
        text: "The Transaction will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            IntializeData(true, function () {
                $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssets option:selected').attr('FA_LastDepreciationDate')));
                // Isvalidated = true;
                if (moment($('#txtFA_LastDepreciationDate').val(), 'DD/MM/YYYY').toDate() > moment($('#txtToDate').val(), 'DD/MM/YYYY').toDate()) {

                    swal('Sorry', 'Date Must > Last Depreciation Date ', 'warning');

                }
                else {
                    //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
                    InsertUpdateFunctionAndReturnID("form", "/api/FA_DepreciationsByAssets/Update", {
                        pID: $('#hID').val(),
                        pAssetID: $('#slAssets').val()
                    }, pSaveandAddNew, "FA_DepreciationsByAssetsModal", '#hID', function () {
                        IntializeData(false)

                        jQuery("#FA_DepreciationsByAssetsModal").modal('hide');

                        // swal("Done", "Is Deleted", "Success");
                        FA_DepreciationsByAssets_ClearAllControls();
                        ArrDeleted = [];
                        $("#hID").val("0")
                        FA_DepreciationsByAssets_LoadingWithPaging();






                        //FA_Depreciations_LoadingWithPaging();
                        ////------------------------------------- ----------- -  - - - - -- - - - - -
                        //InsertUpdateListOfObject("/api/FA_Depreciations/InsertItems",
                        //   SetArrayOfItems()
                        //    , pSaveandAddNew, "FA_DepreciationsModal", function () {
                        //        setTimeout(function () {

                        //            ArrDeleted = [];
                        //            $("#hID").val("0")
                        //            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                        //              IntializeData(false);
                        //            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                        //            FA_Depreciations_LoadingWithPaging();
                        //        }, 300);

                        //    });
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                    });


                    //   }






                    //  });




                }













            });
        });







}

//function CheckTableDate(tbl)
//{

//    $(tbl).each(function (i, tr) {


//        moment($(tr).find("td.FromDate input").val() , 'MM/DD/YYYY').toDate();


//        var FromDate = moment( ;
//        var ToDate = $(tr).find("td.ToDate input").val();







//    });


//}

function FA_DepreciationPostListByType(pTypeID, pApproved) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblFA_DepreciationsByAssets');

    if (pSelectedIDs != "") {

        // check if all are approved or all are unapproved
        let ApproveError = false;
        let UnApproveError = false;

        if (pApproved) {
            pSelectedIDs.split(",").forEach((ID) => {
                if ($("#tblFA_DepreciationsByAssets tbody #" + ID + " .IsApproved").attr("val") == "true") {
                    ApproveError = true;
                }
            });
        } else {
            pSelectedIDs.split(",").forEach((ID) => {
                if ($("#tblFA_DepreciationsByAssets tbody #" + ID + " .IsApproved").attr("val") == "false") {
                    UnApproveError = true;
                }
            });
        }

        if (ApproveError) {
            swal(strSorry, "لا يمكن اعتماد اهلاكات معتمدة من قبل");
        } else if (UnApproveError) {
            swal(strSorry, "لا يمكن فك اعتماد اهلاكات غير معتمدة من قبل");
        } else {
            debugger;
            // get IDs of Depreciations not Transactions
            let pNewSelectedIDs = pSelectedIDs.split(",").map((ID) => ($("#tblFA_DepreciationsByAssets tbody #" + ID + " .DepreciationID").attr("val"))).join(",");

            
            CallGETFunctionWithParameters("/api/FA_Depreciations/FA_DepreciationPost"
                , {
                    pSelectedIDs: pNewSelectedIDs,
                    pTypeID: pTypeID,
                    pApproved: pApproved
                }
                , function (pData) {
                    if (!pData[0]) {
                        showDeleteFailMessage = true;
                        if (pData[1] != undefined && pData[1] != "")
                            strDeleteFailMessage = pData[1];
                        else
                            strDeleteFailMessage = "One or more Vouchers can not be posted/unposted because fiscal year is closed or date is frozen.";
                    }
                    else {
                        if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                        else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                        
                    }
                    FA_DepreciationsByAssets_LoadingWithPaging();
                    FadePageCover(false);

                }
                , null);
        }

        
    }
}