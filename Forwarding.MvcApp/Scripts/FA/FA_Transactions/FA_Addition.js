// City Country ---------------------------------------------------------------
// Bind FA_Transactions Table Rows
function FA_Transactions_BindTableRows(pFA_Transactions) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_Transactions");
    $.each(pFA_Transactions, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Transactions",
            ("<tr ID='" + item.ID + "' ondblclick='FA_Transactions_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeName + "</td>"
                + "<td class='AssetID' val='" + item.AssetID + "'>" + item.AssetName + "</td>"
                + "<td class='BarCode' val='" + item.BarCode + "'>" + item.BarCode + "</td>"
                + "<td class='ExludedTypeID hide' val='" + item.ExludedTypeID + "'>" + item.ExludedTypeName + "</td>"
                + "<td class='Amount' val='" + item.Amount + "'>" + item.Amount + "</td>"
                + "<td class='Qty' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='FromDate' val='" + GetDateFromServer(item.FromDate) + "'>" + GetDateFromServer( item.FromDate ) + "</td>"
                + "<td class='ToDate hide' val='" + item.ToDate + "'>" + item.ToDate + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='DevisonID' val='" + item.DevisonID + "'>" + item.DevisonName + "</td>"
                + "<td class='GroupID' val='" + item.GroupID + "'>" + item.GroupName + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeName + "</td>"
                + "<td class='QtyFactor hide' val='" + item.QtyFactor + "'>" + item.QtyFactor + "</td>"
                + "<td class='AmountFactor hide' val='" + item.AmountFactor + "'>" + item.AmountFactor + "</td>"
                + "<td class='IsApproved hide' val='" + item.IsApproved + "'>" + item.IsApproved + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Percentage hide' val='" + item.Percentage + "'>" + item.Percentage + "</td>"
                + "<td class='DepreciationTypeID hide' val='" + item.DepreciationTypeID + "'>" + item.DepreciationTypeID + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='BarCodeType hide' val='" + item.BarCodeType + "'>" + item.BarCodeType + "</td>"
                + "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                + "<td class='CreationDate hide' val='" + item.CreationDate + "'>" + item.CreationDate + "</td>"
                + "<td class='UserID hide' val='" + item.UserID + "'>" + item.UserID + "</td>"
                + "<td class='AdditionAccountID hide' val='" + item.AdditionAccountID + "'>" + item.AdditionAccountID + "</td>"

                + "<td class='hFA_Transactions'><a href='#FA_TransactionsModal' data-toggle='modal' onclick='FA_Transactions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Transactions", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Transactions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}




function FA_Transactions_EditByDblClick(pID) {
    jQuery("#FA_TransactionsModal").modal("show");
    FA_Transactions_FillControls(pID);
}
// Loading with data
function FA_Transactions_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where (TransactionTypeID = 20)  AND ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = " + $('#txtCode_Filter').val() + "";
    }


    if ($('#txtName_Filter').val().trim() != "")
    {
        WhereClause += " AND AssetName LIKE '%" + $('#txtName_Filter').val() + "%'";
    }

    if ($('#txtBarCode_Filter').val().trim() != "") {
        WhereClause += " AND BarCode LIKE '%" + $('#txtBarCode_Filter').val() + "%'";
    }



    if ($('#slBranchID_Filter').val().trim() != "0") {
        WhereClause += " AND BranchID = " + $('#slBranchID_Filter').val() + "";
    }
    if ($('#slDevisonID_Filter').val().trim() != "0") {
        WhereClause += " AND DevisonID = " + $('#slDevisonID_Filter').val() + "";
    }
    //if ($('#slTransactionTypeID_Filter').val().trim() != "0")
    //{
    //    WhereClause += " AND TransactionTypeID = " + $('#slTransactionTypeID_Filter').val() + "";
    //}


    if ($('#slDepartmentID_Filter').val().trim() != "0") {
        WhereClause += " AND DepartmentID = " + $('#slDepartmentID_Filter').val() + "";
    }
    
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , FromDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , FromDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Transactions/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Transactions_BindTableRows(pTabelRows); FA_Transactions_ClearAllControls(); });
    HighlightText("#tblFA_Transactions>tbody>tr", $("#txt-Search").val().trim());
    

}

//var IsOldName = "0";
var Isvalidated = true;

function FA_Transactions_Insert(pSaveandAddNew) {


    IntializeData(true, function () {



       // Isvalidated = true;
        // $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
        if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
            swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning'); //ErrorNumeric
        }
        else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
            swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning');
        }
        else if (moment($('#txtLastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

            swal(TranslateString('sorry'), TranslateString('DateMust>LastDepreciationDate'), 'warning'); //DateMust>LastDepreciationDate 

        }
        else if ((parseFloat($('#txtAmount').val())) < 0) {

            swal(TranslateString('sorry'), TranslateString('YourInsertedAmountCauseNegativeValue_I'), 'warning'); //YourInsertedAmountCauseNegativeValue
        }
        else if ((parseFloat($('#txtQty').val())) < 0) {

            swal(TranslateString('sorry'), TranslateString('YourInsertedQtyCauseNegativeValue_I'), 'warning'); 
        }
      
        else
        {
            //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
            InsertUpdateFunctionAndReturnID("form", "/api/FA_Transactions/Insert", {
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
                pAmountFactor: 1,
                pFA_AdditionAccount: $('#slFA_AdditionAccount').val()

            }, pSaveandAddNew, "FA_TransactionsModal", '#hID', function () {



                ArrDeleted = [];
                $("#hID").val("0")
                FA_Transactions_ClearAllControls();
                //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                IntializeData(false);
                //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                FA_Transactions_LoadingWithPaging();


                if (pSaveandAddNew == false)
                    jQuery("#FA_TransactionsModal").modal('hide');

                swal(TranslateString('Done'), TranslateString('YourTransactionIsInserted'), 'warning'); 

                //FA_Transactions_LoadingWithPaging();
                ////------------------------------------- ----------- -  - - - - -- - - - - -
                //InsertUpdateListOfObject("/api/FA_Transactions/InsertItems",
                //   SetArrayOfItems()
                //    , pSaveandAddNew, "FA_TransactionsModal", function () {
                //        setTimeout(function () {

                //            ArrDeleted = [];
                //            $("#hID").val("0")
                //            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                //              IntializeData(false);
                //            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                //            FA_Transactions_LoadingWithPaging();
                //        }, 300);

                //    });
                //------------------------------------- ----------- -  - - - - -- - - - - -
            });


     //   }






  //  });




        }

          











    });





}


function FA_Transactions_Update(pSaveandAddNew) {


    IntializeData(true, function () {



       // Isvalidated = true;
        // $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
        if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
            swal(TranslateString('Sorry'), TranslateString('ErrorNumeric'), 'warning');
        }
        else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
            swal(TranslateString('Sorry'), TranslateString('ErrorNumeric'), 'warning');
        }
        else if (moment($('#txtLastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

            swal(TranslateString('Sorry'), TranslateString('DateMust>LastDepreciationDate') , 'warning');

        }
        else if ((    (parseFloat($('#txtCurrentAmount').val()) - parseFloat($('#hOldAmount').val()) ) + parseFloat($('#txtAmount').val())) < 0) {

            swal(TranslateString('Sorry'), TranslateString('YourInsertedAmountCauseNegativeValue_U'), 'warning');
        }
        else if (((parseFloat($('#txtCurrentQty').val()) - parseFloat($('#hOldQty').val()))  + parseFloat($('#txtQty').val())) < 0) {

            swal(TranslateString('Sorry'), TranslateString('YourInsertedQtyCauseNegativeValue_U'), 'warning');
        }

        else {
            //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
            InsertUpdateFunctionAndReturnID("form", "/api/FA_Transactions/Update", {
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
                pAmountFactor: 1,
                pFA_AdditionAccount: $('#slFA_AdditionAccount').val()

                
            }, pSaveandAddNew, "FA_TransactionsModal", '#hID', function () {

                if (pSaveandAddNew == false)
                    jQuery("#FA_TransactionsModal").modal('hide');


                swal(TranslateString('Done'), TranslateString('YourTransactionIsUpdated'), 'warning'); 
                ArrDeleted = [];
                $("#hID").val("0")
                FA_Transactions_ClearAllControls();
                //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                IntializeData(false);
                //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                FA_Transactions_LoadingWithPaging();






                //FA_Transactions_LoadingWithPaging();
                ////------------------------------------- ----------- -  - - - - -- - - - - -
                //InsertUpdateListOfObject("/api/FA_Transactions/InsertItems",
                //   SetArrayOfItems()
                //    , pSaveandAddNew, "FA_TransactionsModal", function () {
                //        setTimeout(function () {

                //            ArrDeleted = [];
                //            $("#hID").val("0")
                //            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                //              IntializeData(false);
                //            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                //            FA_Transactions_LoadingWithPaging();
                //        }, 300);

                //    });
                //------------------------------------- ----------- -  - - - - -- - - - - -
            });


            //   }






            //  });




        }













    });





}

function FA_Transactions_Delete(pSaveandAddNew) {
    swal({
        title: TranslateString('Areyousure?'),
        text: TranslateString("TheTransactionWillBeDeletedPermanently!") ,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: TranslateString('Yes,delete!') ,
        closeOnConfirm: true
    },
        //callback function in case of success
        function () {
            IntializeData(true, function () {

               // Isvalidated = true;
                if (moment($('#txtLastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

                    swal(TranslateString('Sorry'), TranslateString('DateMust>LastDepreciationDate'), 'warning');

                }
                else if (((parseFloat($('#txtCurrentAmount').val()) - parseFloat($('#hOldAmount').val())) ) < 0) {

                    swal(TranslateString('Sorry'), TranslateString('YourInsertedAmountCauseNegativeValue_D'), 'warning');
                }
                else if (((parseFloat($('#txtCurrentQty').val()) - parseFloat($('#hOldQty').val())) ) < 0) {

                    swal(TranslateString('Sorry'), TranslateString('YourInsertedQtyCauseNegativeValue_D'), 'warning');
                }
                else {
                    //  if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {
                    InsertUpdateFunctionAndReturnID("form", "/api/FA_Transactions/Update", {
                        pID: $('#hID').val(),
                        pTransactionTypeID: 20,
                        pAmount: $('#hOldAmount').val(),
                        pFromDate: ConvertDateFormat($('#txtDate').val()),
                        pToDate: ConvertDateFormat($('#txtDate').val()),
                        pQtyFactor: 1,
                        pQty: $('#hOldQty').val(),
                        pIsApproved: "false",
                        pNotes:( $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val()  ),
                        pPercentage: "0",
                        pDepreciationTypeID: "0",
                        pAssetID: $('#slAssetID').val(),
                        pJVID: "0",
                        pBranchID: $('#slAssetID option:selected').attr('BranchID'),
                        pExludedTypeID: "0",
                        pCode: $('#txtCode').val(),
                        pIsDeleted: "true",
                        pDepreciationID: "0",
                        pCreationDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()),
                        pAmountFactor: 1,
                        pFA_AdditionAccount: $('#slFA_AdditionAccount').val()
                    }, pSaveandAddNew, "FA_TransactionsModal", '#hID', function () {


                        if(pSaveandAddNew == false )
                        jQuery("#FA_TransactionsModal").modal('hide');

                       // swal("Done", "Is Deleted", "Success");
                        FA_Transactions_ClearAllControls();
                        ArrDeleted = [];
                        $("#hID").val("0")
                        //  $('#tblFA_AssetsGroupDestructions > tbody').html('');
                        IntializeData(false);
                        //  ClearAllTableRows('tblFA_AssetsGroupDestructions');
                        FA_Transactions_LoadingWithPaging();






                        //FA_Transactions_LoadingWithPaging();
                        ////------------------------------------- ----------- -  - - - - -- - - - - -
                        //InsertUpdateListOfObject("/api/FA_Transactions/InsertItems",
                        //   SetArrayOfItems()
                        //    , pSaveandAddNew, "FA_TransactionsModal", function () {
                        //        setTimeout(function () {

                        //            ArrDeleted = [];
                        //            $("#hID").val("0")
                        //            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                        //              IntializeData(false);
                        //            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                        //            FA_Transactions_LoadingWithPaging();
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


function SetCurrentData(callback)
{
    //if ($('#slTransactionTypeID').val().trim() == "30")
    //{
        if ($('#slAssetID').val() != "0") {
            $('#txtLastDepreciationDate').val(GetDateFromServer($('#slAssetID option:selected').attr('LastDepreciationDate')));
            $('#txtCurrentAmount').val($('#slAssetID option:selected').attr('LastAmount'));
            $('#txtCurrentQty').val($('#slAssetID option:selected').attr('LastQty'));
            $('#txtAmount').prop('disabled', false);
            $('#txtQty').prop('disabled', false);
        }
        else
        {
            $('#txtLastDepreciationDate').val("");
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




function IntializeData(IsAsset , callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_Transactions/IntializeData",
        data: { pTransactionTypeID: "20", pID: $('#hID').val(), pIsAsset: IsAsset  },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {


            if (IsAsset == true) {
                console.log('Is Asset')
               // Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#slAssetID', $('#slAssetID').val(), 'BarCode,BarCodeType,LastDepreciationDate,LastAmount,LastQty,BranchID,IsExcluded');
            }
            else
            {


                Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#slAssetID', '', 'BarCode,BarCodeType,LastDepreciationDate,LastAmount,LastQty,BranchID,IsExcluded');
                Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slBranchID_Filter', '');
               // Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', null, '#slExludedTypeID', '');
               // Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', null, '#slTransactionTypeID', '');
               // Fill_SelectInputAfterLoadData(d[3], 'ID', 'Name', '<-- select From Menue -->', '#slTransactionTypeID_Filter', '');
                Fill_SelectInputAfterLoadData(d[4], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDepartmentID_Filter', '');
                Fill_SelectInputAfterLoadData(d[5], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDevisonID_Filter', '');

            }
            
            SetCurrentData();



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




//function FA_Transactions_Delete(pID) {
//    DeleteListFunction("/api/FA_Transactions/DeleteByID", { "pID": pID, "type": "1" }, function () { FA_Transactions_LoadingWithPaging(); });
//}

function FA_Transactions_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_Transactions') != "")
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
                DeleteListFunction("/api/FA_Transactions/Delete", { "pFA_TransactionsIDs": GetAllSelectedIDsAsString('tblFA_Transactions'), "type": "1" }, function () { FA_Transactions_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_Transactions/Delete", { "pFA_TransactionsIDs": GetAllSelectedIDsAsString('tblFA_Transactions') }, function () { FA_Transactions_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_Transactions_FillControls(pID) {
    $('#tblFA_AssetsGroupDestructions > tbody').html('');
    debugger;
    ClearAll("#FA_TransactionsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

   // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_Transactions/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
   // FA_AssetsGroupDestructions_BindTableRows(pID);




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);

    IntializeData(false , function () {

       // setTimeout(function () {
            var tr = $("tr[ID='" + pID + "']");
        $('#slAssetID').val($(tr).find("td.AssetID").attr('val'));
        $('#slFA_AdditionAccount').val($(tr).find("td.AdditionAccountID").attr('val'));

            $('#hOldQty').val($(tr).find("td.Qty").attr('val'));
            $('#hOldAmount').val($(tr).find("td.Amount").attr('val'));
            $('#txtQty').val($(tr).find("td.Qty").attr('val'));
            $('#txtAmount').val($(tr).find("td.Amount").attr('val'));
          //  $('#slExludedTypeID').val($(tr).find("td.ExludedTypeID").attr('val'));
           // $('#slTransactionTypeID').val($(tr).find("td.TransactionTypeID").attr('val'));
            $('#txtCode').val($(tr).find("td.Code").attr('val'));
            $('#txtDate').val($(tr).find("td.FromDate").attr('val'));
            $('#txtNotes').val($(tr).find("td.Notes").attr('val'));
            $('#slAssetID').val($(tr).find("td.AssetID").attr('val'));
            $('#slAssetID').val($(tr).find("td.AssetID").attr('val'));
            
            $('#hExluded').val($('#slAssetID option:selected').attr('IsExcluded'));
            IntializeData(true);
            ShowHideInputs();

       // }, 500);




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_Transactions_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Transactions_Update(true);");











}
function ShowHideInputs() {

    if ($('#slTransactionTypeID') == "60") {

        $('.CanEdit').prop('disabled', true);

    }
    else {
        $('.CanEdit').prop('disabled', false);

    }



    if ($('#hExluded').val() == "true") {
        $('#btnSave').addClass("hide");
        $('#btnSaveandNew').addClass("hide");
        $('#btn-Delete1').addClass("hide");


    }
    else
    {
        $('#btnSave').removeClass("hide");
        $('#btnSaveandNew').removeClass("hide");
        $('#btn-Delete1').removeClass("hide");

    }





   // $('#slTransactionTypeID').prop("disabled", true);
    $('#slAssetID').prop("disabled", true);
}
function FA_Transactions_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_TransactionsModal", null);
    //  ArrDeleted = [];
   // $('#tblFA_AssetsGroupDestructions > tbody').html('');
    // $('#slSubAccountID').html('');


    $('#hOldQty').val("0");
    $('#hOldAmount').val("0");
    $('#txtQty').val("0");
    $('#txtAmount').val("0");
  //  $('#slExludedTypeID').val("0");
   // $('#slTransactionTypeID').val("0");
    $('#txtCode').val("AUTO");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());






    $("#btnSave").attr("onclick", "FA_Transactions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Transactions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    $('#btn-Delete1').addClass("hide");
   // $('#slTransactionTypeID').prop("disabled", false);
    $('#slAssetID').prop("disabled", false);
  //  $('#slFiscalYearID').html("");

    $('#slAssetID').trigger("change");
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_Transactions/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_Transactions bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function FA_Transactions_AddDetails() {
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
    LoadAll("/api/FA_Transactions/LoadFA_AssetsGroupDestructions", " where AssestGroupID = " + pID + " ", function (pitems) {
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







//function CheckTableDate(tbl)
//{

//    $(tbl).each(function (i, tr) {


//        moment($(tr).find("td.FromDate input").val() , 'MM/DD/YYYY').toDate();


//        var FromDate = moment( ;
//        var ToDate = $(tr).find("td.ToDate input").val();







//    });


//}

function FA_AdditionPostList() {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsString('tblFA_Transactions');
    if (pSelectedIDs != "") {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/FA_Transactions/FA_AdditionPost"
            , {
                pSelectedIDs: pSelectedIDs
            }
            , function (pData) {
                if (!pData[0]) {
                    showDeleteFailMessage = true;
                    if (pData[1] != undefined && pData[1] != "")
                        strDeleteFailMessage = pData[1];
                    else
                        strDeleteFailMessage = "One or more Vouchers can not be posted/unposted because fiscal year is closed or date is frozen.";
                }
                else
                    if ($("[id$='hf_ChangeLanguage']").val() == "en") swal("Success", "Saved successfully.");
                    else if ($("[id$='hf_ChangeLanguage']").val() == "ar") swal("نجاح", "تم الحفظ بنجاح.");
                //Post_Unpost_Voucher_LoadingWithPaging(pData[0]);
                FadePageCover(false);

            }
            , null);
    }
}