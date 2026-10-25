// City Country ---------------------------------------------------------------
// Bind FA_Depreciations Table Rows

function FA_Depreciations_BindTableRows(pFA_Depreciations) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_Depreciations");
    $.each(pFA_Depreciations, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Depreciations",
            ("<tr ID='" + item.ID + "' ondblclick='FA_Depreciations_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='FromDate' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer(item.FromDate) + "</td>"
                + "<td class='ToDate' val='" + GetDateFromServer(item.ToDate) + "'>" + GetDateFromServer(item.ToDate) + "</td>"
                + "<td class='TotalAmount' val='" + parseFloat(item.TotalAmount).toFixed(2) + "'>" + parseFloat(item.TotalAmount).toFixed(2) + "</td>"
                + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                + "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                + "<td class='IsApproved hide' val='" + item.IsApproved + "'>" + item.IsApproved + "</td>"
                + "<td class='CreationDate ' val='" + GetDateFromServer(item.CreationDate) + "'>" + GetDateFromServer(item.CreationDate) + "</td>"
                + "<td class='TotalQty hide' val='" + item.TotalQty + "'>" + item.TotalQty + "</td>"
                + "<td class='PeriodType hide' val='" + item.PeriodType + "'>" + item.PeriodType + "</td>"
                + "<td class='hFA_Depreciations'><a href='#FA_DepreciationsModal' data-toggle='modal' onclick='FA_Depreciations_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Depreciations", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Depreciations>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}




function FA_Depreciations_EditByDblClick(pID) {
    jQuery("#FA_DepreciationsModal").modal("show");
    FA_Depreciations_FillControls(pID);
}
// Loading with data
function FA_Depreciations_LoadingWithPaging() {
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



    if ($('#slBranchID_Filter').val().trim() != "0") {
        WhereClause += " AND BranchID = " + $('#slBranchID_Filter').val() + "";
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
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Depreciations/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Depreciations_BindTableRows(pTabelRows); FA_Depreciations_ClearAllControls(); });
    HighlightText("#tblFA_Depreciations>tbody>tr", $("#txt-Search").val().trim());


}

//var IsOldName = "0";
var Isvalidated = true;

function FA_Depreciations_Insert(pSaveandAddNew, pIsReview) {


    // IntializeData(true, function () {
    if (moment($('#txtFromDate').val(), 'DD/MM/YYYY').toDate() > moment($('#txtToDate').val(), 'DD/MM/YYYY').toDate()) {

        swal('Sorry', ' From Date MUST > To Date ', 'warning');

    }
    else {
        //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
        InsertUpdateFunction("form", "/api/FA_Depreciations/Insert", {
            FromDate: ConvertDateFormat($('#txtFromDate').val()), ToDate: ConvertDateFormat($('#txtToDate').val()), BranchID: $('#slBranchID').val(), Date: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), IsReview: pIsReview, PeriodType: $('#slPeriodType').val(), DepreciationID: $('#hID').val()
        }, false, null, function (data) {



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
                        Total = Total + parseFloat((typeof item.mAmount == "undefined" ? item.mSumAmount : item.mAmount))
                        debugger
                        if (i == items.length - 1) {
                            var a = $('#tblDetails > tbody > tr').length;
                            $('#txtTotalAmount').val((Total).toFixed(2));
                            FillHTMLtblInputs("#tblDetails>tbody tr");
                            //  SetDatepickerFormat();
                        }

                    });




                }
                else {


                    ArrDeleted = [];
                    $("#hID").val("0")
                    FA_Depreciations_ClearAllControls();
                    //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                    IntializeData(false);
                    //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                    FA_Depreciations_LoadingWithPaging();


                    if (pSaveandAddNew == false)
                        jQuery("#FA_DepreciationsModal").modal('hide');

                    swal("Done", "Your Transaction Is Inserted", "Success");

                }






            });


        //   }






        //  });




    }













    //  });





}


function FA_Depreciations_Update(pSaveandAddNew) {


    IntializeData(true, function () {



        // Isvalidated = true;
        // $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
        if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
            swal('Sorry', ' You Must Insert Numeric Value to Qty ', 'warning');
        }
        else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
            swal('Sorry', ' You Must Insert Numeric Value to Amount ', 'warning');
        }
        else if (moment($('#txtFA_LastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

            swal('Sorry', 'Date Must > Last Depreciation Date ', 'warning');

        }
        else if (((parseFloat($('#txtCurrentAmount').val()) - parseFloat($('#hOldAmount').val())) + parseFloat($('#txtAmount').val())) < 0) {

            swal('Sorry', ' Your Inserted Amount Cause Negative Value', 'warning');
        }
        else if (((parseFloat($('#txtCurrentQty').val()) - parseFloat($('#hOldQty').val())) + parseFloat($('#txtQty').val())) < 0) {

            swal('Sorry', ' Your Inserted Qty Cause Negative Value', 'warning');
        }

        else {
            //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
            InsertUpdateFunctionAndReturnID("form", "/api/FA_Depreciations/Update", {
                pID: $('#hID').val(),
                pTransactionTypeID: 20,
                pAmount: $('#txtAmount').val(),
                pFromDate: ConvertDateFormat($('#txtDate').val()),
                pToDate: ConvertDateFormat($('#txtDate').val()),
                pQtyFactor: 1,
                pQty: $('#txtQty').val(),
                pIsApproved: "false",
                pNotes: ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val()),
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
            }, pSaveandAddNew, "FA_DepreciationsModal", '#hID', function () {

                if (pSaveandAddNew == false)
                    jQuery("#FA_DepreciationsModal").modal('hide');


                swal("Done", "Your Transaction Is Updated", "Success");
                ArrDeleted = [];
                $("#hID").val("0")
                FA_Depreciations_ClearAllControls();
                //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                IntializeData(false);
                //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                FA_Depreciations_LoadingWithPaging();






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





}

function FA_Depreciations_Delete(pSaveandAddNew) {
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
                $('#txtFA_LastDepreciationDate').val(GetDateFromServer( $('#slBranchID option:selected').attr('FA_LastDepreciationDate')));
                // Isvalidated = true;
                if (moment($('#txtFA_LastDepreciationDate').val(), 'DD/MM/YYYY').toDate() > moment($('#txtToDate').val(), 'DD/MM/YYYY').toDate())
                {

                    swal('Sorry', 'Date Must > Last Depreciation Date ', 'warning');

                }
                else
                {
                    //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
                    InsertUpdateFunctionAndReturnID("form", "/api/FA_Depreciations/Update", {
                        pID: $('#hID').val(),
                        pBranchID: $('#slBranchID').val()
                    }, pSaveandAddNew, "FA_DepreciationsModal", '#hID', function () {
                        IntializeData(false)

                        jQuery("#FA_DepreciationsModal").modal('hide');

                        // swal("Done", "Is Deleted", "Success");
                        FA_Depreciations_ClearAllControls();
                        ArrDeleted = [];
                        $("#hID").val("0")
                        FA_Depreciations_LoadingWithPaging();






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


function SetCurrentData(callback) {
    //if ($('#slTransactionTypeID').val().trim() == "30")
    //{
    if ($('#slAssetID').val() != "0") {
        $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slAssetID option:selected').attr('FA_LastDepreciationDate')));
        $('#txtCurrentAmount').val($('#slAssetID option:selected').attr('LastAmount'));
        $('#txtCurrentQty').val($('#slAssetID option:selected').attr('LastQty'));
        $('#txtAmount').prop('disabled', false);
        $('#txtQty').prop('disabled', false);
    }
    else {
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




function IntializeData(IsAsset, callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Depreciations/IntializeData",
        data: { pTransactionTypeID: "40", pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {


            if (IsAsset == true)
            {
                  Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Name', null, '#slBranchID_Filter', $('#slBranchID_Filter').val(), 'FA_LastDepreciationDate');
                  Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Name', null, '#slBranchID', $('#slBranchID').val(), 'FA_LastDepreciationDate');              }
              else {


            //     Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', '<-- select From Menue -->', '#slAssetID', '', 'BarCode,BarCodeType,FA_LastDepreciationDate,LastAmount,LastQty,BranchID,IsExcluded');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Name', null, '#slBranchID_Filter', '', 'FA_LastDepreciationDate');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[1], 'ID', 'Name', null, '#slBranchID', '', 'FA_LastDepreciationDate');
            // Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', null, '#slExludedTypeID', '');
            // Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', null, '#slTransactionTypeID', '');
            // Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', '<-- select From Menue -->', '#slTransactionTypeID_Filter', '');
            //   Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', '<-- select From Menue -->', '#slDepartmentID_Filter', '');
            //  Fill_SelectInputAfterLoadData(d[5], 'ID', 'Name', '<-- select From Menue -->', '#slDevisonID_Filter', '');

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




//function FA_Depreciations_Delete(pID) {
//    DeleteListFunction("/api/FA_Depreciations/DeleteByID", { "pID": pID, "type": "1" }, function () { FA_Depreciations_LoadingWithPaging(); });
//}

function FA_Depreciations_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_Depreciations') != "")
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
                DeleteListFunction("/api/FA_Depreciations/Delete", { "pFA_DepreciationsIDs": GetAllSelectedIDsAsString('tblFA_Depreciations'), "type": "1" }, function () { FA_Depreciations_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_Depreciations/Delete", { "pFA_DepreciationsIDs": GetAllSelectedIDsAsString('tblFA_Depreciations') }, function () { FA_Depreciations_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_Depreciations_FillControls(pID) {
    $('#tblDetails > tbody').html('');
    debugger;
    ClearAll("#FA_DepreciationsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_Depreciations/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    // FA_AssetsGroupDestructions_BindTableRows(pID);




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);

    IntializeData(false, function () {

        setTimeout(function () {
            var tr = $("tr[ID='" + pID + "']");
            $('#slBranchID').val($(tr).find("td.BranchID").attr('val'));
            $('#txtFromDate').val($(tr).find("td.FromDate").attr('val'));
            $('#txtToDate').val($(tr).find("td.ToDate").attr('val'));
            $('#txtTotalAmount').val($(tr).find("td.TotalAmount").attr('val'));
            //  $('#slPeriodType').val(($(tr).find("td.slPeriodType").attr('val') == "0" ? "1" : $(tr).find("td.slPeriodType").attr('val')) );
            // $('#txtAmount').val($(tr).find("td.Amount").attr('val'));
            $('#txtCode').val($(tr).find("td.Code").attr('val'));
            IntializeData(false);
            ShowHideInputs();

            //  console.log(($(tr).find("td.slPeriodType").attr('val').trim() == "0" ? "1" : $(tr).find("td.slPeriodType").attr('val')));



            $('#slPeriodType').val(($(tr).find("td.PeriodType").attr('val').trim() == "0" ? "1" : $(tr).find("td.PeriodType").attr('val')));

            $('#txtFA_LastDepreciationDate').val(GetDateFromServer($('#slBranchID option:selected').attr('FA_LastDepreciationDate')));
            FA_Depreciations_Insert(false, true);
        }, 500);




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_Depreciations_Insert(false ,false);");
    $("#btnSaveandNew").attr("onclick", "FA_Depreciations_Insert(false , true);");




}
function ShowHideInputs() {

    //if ($('#slTransactionTypeID') == "60") {

    //    $('.CanEdit').prop('disabled', true);

    //}
    //else {
    //    $('.CanEdit').prop('disabled', false);

    //}



    if ($('#hID').val() != "" && $('#hID').val() != "0") {
        $('#btnSave').addClass("hide");
        $('#btnSaveandNew').addClass("hide");
        $('#btn-Delete1').removeClass("hide");
        //   $('.CanEdit').prop('disabled', true);

        $('#btnReview').addClass('hide')


    }
    else {
        $('#btnSave').removeClass("hide");
        $('#btnSaveandNew').addClass("hide");
        $('#btn-Delete1').addClass("hide");
        $('#txtTotalAmount').prop('disabled', true)
        //   $('.CanEdit').prop('disabled', false);

        $('#btnReview').removeClass('hide')
        SetFromDate();



    }


    $('#txtTotalAmount').prop('disabled', true)


    // $('#slTransactionTypeID').prop("disabled", true);
    // $('#slAssetID').prop("disabled", true);
}



function SetFromDate() {
    console.log(GetDateFromServer($('#slBranchID option:selected').attr('FA_LastDepreciationDate')))
    if (GetDateFromServer($('#slBranchID option:selected').attr('FA_LastDepreciationDate')) == '01/01/1900' || GetDateFromServer($('#slBranchID option:selected').attr('FA_LastDepreciationDate')) == '01/01/1990') {
        $('#txtFromDate').val(getTodaysDateInddMMyyyyFormat());
        $('#txtFromDate').prop('disabled', false)

    }
    else {
        $('#txtFromDate').val(moment(GetDateFromServer($('#slBranchID option:selected').attr('FA_LastDepreciationDate')), 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY'));
        $('#txtFromDate').prop('disabled', true)
    }

}


function SetToDate() {

    if ($('#slPeriodType').val() == "1") { // Specified Period
        $('#txtToDate').prop("disabled", false);

    }
    else if ($('#slPeriodType').val() == "2") { // Day
        $('#txtToDate').prop("disabled", true);
        $('#txtToDate').val(moment($('#txtFromDate').val(), 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY'));
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





function FA_Depreciations_ClearAllControls() {
    debugger;
    ClearAll("#FA_DepreciationsModal", null);
    $('#tblDetails > tbody').html('');
    $('#txtTotalAmount').val("0");
    $('#txtCode').val("AUTO");
    $("#btnSave").attr("onclick", "FA_Depreciations_Insert(false , false);");
    $("#btnSaveandNew").attr("onclick", "FA_Depreciations_Insert(false , true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    $('#btn-Delete1').addClass("hide");
    ShowHideInputs();
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_Depreciations/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_Depreciations bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function FA_Depreciations_AddDetails() {
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
    LoadAll("/api/FA_Depreciations/LoadFA_AssetsGroupDestructions", " where AssestGroupID = " + pID + " ", function (pitems) {
        var items = JSON.parse(pitems);
        FadePageCover(false);
        $.each(items, function (i, item) {
            //debugger;
            AppendRowtoTable("tblFA_AssetsGroupDestructions",
                ("<tr ID='" + item.ID + "'>"
                    + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + item.ID + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + '<td class="FromDate">' + '<input tag=' + GetDateFromServer(item.FromDate) + '  onchange="" type="text" onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
                    + '<td class="ToDate">' + '<input tag=' + GetDateFromServer(item.ToDate) + ' onchange="" type="text"  onfocus="DisableEnterKey(id);" data-required="true" onkeypress="DisableEnterKey(id);" style="cursor:text;" class=" inputvalue datepicker-input form-control input-sm" data-date-format="dd/mm/yyyy" placeholder="Select Date">'
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







//function CheckTableDate(tbl)
//{

//    $(tbl).each(function (i, tr) {


//        moment($(tr).find("td.FromDate input").val() , 'MM/DD/YYYY').toDate();


//        var FromDate = moment( ;
//        var ToDate = $(tr).find("td.ToDate input").val();







//    });


//}

