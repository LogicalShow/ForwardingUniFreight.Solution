// City Country ---------------------------------------------------------------
// Bind FA_AssetsInventory Table Rows
function FA_AssetsInventory_BindTableRows(pFA_AssetsInventory) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_AssetsInventory");
    $.each(pFA_AssetsInventory, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_AssetsInventory",
            ("<tr ID='" + item.ID + "' ondblclick='FA_AssetsInventory_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='Type' val='" + item.Type + "'>" + item.TypeName + "</td>"
                + "<td class='Date' val='" + GetDateFromServer(item.Date) + "'>" + GetDateFromServer(item.Date) + "</td>"
                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DevisionID' val='" + item.DevisionID + "'>" + item.DevisionName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='UserID hide' val='" + item.UserID + "'>" + item.UserID + "</td>"
                + "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                + "<td> <button tag=" + item.ID + " type='button' onclick='Print(" + item.ID + ");' class='btn btn-sm btn-lightblue'><i class='fa fa-print'>&nbsp;" + TranslateString("Print") + "&nbsp;</i></button></td>"
                + "<td class='hFA_AssetsInventory'><a href='#FA_AssetsInventoryModal' data-toggle='modal' onclick='FA_AssetsInventory_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
   // ApplyPermissions();
    BindAllCheckboxonTable("tblFA_AssetsInventory", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_AssetsInventory>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}

//$(document).ready(function () {
//    $('.select2-container').on('keypress', function (e) {
//        if (e.keyCode === 13) {
//            e.preventDefault();
//            // $(this).trigger('submit');
//        }
//    });
//    $('#slAssets').on('keypress', function (e) {
//        if (e.keyCode === 13) {
//            e.preventDefault();
//            // $(this).trigger('submit');
//        }
//    });
//});


function Print(ID) {
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("IDs");
    arr_Values.push('*'+ID+'*');
    //  arr_Values.push(GetAllSelectedIDsAsStringWithNameAttrRPT("nameCbDepartments"));




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "FA_AssetsInventory_AR"
        , pReportName: "FA_AssetsInventory_AR"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function FA_AssetsInventory_EditByDblClick(pID) {
    jQuery("#FA_AssetsInventoryModal").modal("show");
    FA_AssetsInventory_FillControls(pID);
}
// Loading with data
function FA_AssetsInventory_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where   ( IsDeleted = 0 or IsDeleted IS NULL )";

    if ($('#txtCode_Filter').val().trim() != "") {
        WhereClause += " AND Code = " + $('#txtCode_Filter').val() + "";
    }

    if ($('#slBranchID_Filter').val().trim() != "0") {
        WhereClause += " AND BranchID = " + $('#slBranchID_Filter').val() + "";
    }
    if ($('#slDevisonID_Filter').val().trim() != "0") {
        WhereClause += " AND DevisonID = " + $('#slDevisonID_Filter').val() + "";
    }

    if ($('#slDepartmentID_Filter').val().trim() != "0") {
        WhereClause += " AND DepartmentID = " + $('#slDepartmentID_Filter').val() + "";
    }
    
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , Date ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , Date) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_AssetsInventory/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_AssetsInventory_BindTableRows(pTabelRows); FA_AssetsInventory_ClearAllControls(); });
    HighlightText("#tblFA_AssetsInventory>tbody>tr", $("#txt-Search").val().trim());
    

}

//var IsOldName = "0";
var Isvalidated = true;

function FA_AssetsInventory_Insert(pSaveandAddNew) {


  //  IntializeData(true, function () {



       // Isvalidated = true;
        // $('#tblFA_AssetsInventoryDetails>tbody>tr').each(function (i, tr) {
        //if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
        //    swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning'); //ErrorNumeric
        //}
        //else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
        //    swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning');
        //}
        //else if (moment($('#txtLastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

        //    swal(TranslateString('sorry'), TranslateString('DateMust>LastDepreciationDate'), 'warning'); //DateMust>LastDepreciationDate 

        //}
        //else if ((parseFloat($('#txtAmount').val())) < 0) {

        //    swal(TranslateString('sorry'), TranslateString('YourInsertedAmountCauseNegativeValue_I'), 'warning'); //YourInsertedAmountCauseNegativeValue
        //}
        //else if ((parseFloat($('#txtQty').val())) < 0) {

        //    swal(TranslateString('sorry'), TranslateString('YourInsertedQtyCauseNegativeValue_I'), 'warning'); 
        //}
    if (1 != 1)
    {
        console.log('error')

    }
        else
    {
        InsertUpdateFunctionAndReturnID("form", "/api/FA_AssetsInventory/Insert", {
            pCode: $('#txtCode').val(),
            pIsDeleted: "false",
            pType: $('#slType').val(),
            pBranchID: $('#slBranchID').val(),
            pDepartmentID: $('#slDepartmentID').val(),
            pDevisionID: $('#slDevisonID').val(),
            pDate: ConvertDateFormat($('#txtDate').val()),
            pNotes: ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val())
        }, pSaveandAddNew, null , '#hID', function () {
           // FA_AssetsInventory_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/FA_AssetsInventory/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "FA_AssetsInventoryModal", function () {
                    setTimeout(function () {
                        swal(TranslateString('Done'), TranslateString('YourTransactionIsInserted'), 'success'); 
                        ArrDeleted = [];
                        $("#hID").val("0")
                        $('#tblFA_AssetsInventoryDetails > tbody').html('');
                        IntializeData();
                        ClearAllTableRows('tblFA_AssetsInventoryDetails');
                        FA_AssetsInventory_LoadingWithPaging();
                    }, 300);

                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });


        }

          











  //  });





}


function FA_AssetsInventory_Update(pSaveandAddNew) {


    //  IntializeData(true, function () {



    // Isvalidated = true;
    // $('#tblFA_AssetsInventoryDetails>tbody>tr').each(function (i, tr) {
    //if ($.isNumeric($('#txtQty').val()) == false || $('#txtQty').val() == "") {
    //    swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning'); //ErrorNumeric
    //}
    //else if ($.isNumeric($('#txtAmount').val()) == false || $('#txtAmount').val() == "") {
    //    swal(TranslateString('sorry'), TranslateString('ErrorNumeric'), 'warning');
    //}
    //else if (moment($('#txtLastDepreciationDate').val(), 'DD/MM/YYYY').toDate() >= moment($('#txtDate').val(), 'DD/MM/YYYY').toDate()) {

    //    swal(TranslateString('sorry'), TranslateString('DateMust>LastDepreciationDate'), 'warning'); //DateMust>LastDepreciationDate 

    //}
    //else if ((parseFloat($('#txtAmount').val())) < 0) {

    //    swal(TranslateString('sorry'), TranslateString('YourInsertedAmountCauseNegativeValue_I'), 'warning'); //YourInsertedAmountCauseNegativeValue
    //}
    //else if ((parseFloat($('#txtQty').val())) < 0) {

    //    swal(TranslateString('sorry'), TranslateString('YourInsertedQtyCauseNegativeValue_I'), 'warning'); 
    //}
    if (1 != 1) {
        console.log('error')

    }
    else {
        InsertUpdateFunctionAndReturnID("form", "/api/FA_AssetsInventory/Update", {
            pID: $('#hID').val(),
            pCode: $('#txtCode').val(),
            pIsDeleted: "false",
            pType: $('#slType').val(),
            pBranchID: $('#slBranchID').val(),
            pDepartmentID: $('#slDepartmentID').val(),
            pDevisionID: $('#slDevisonID').val(),
            pDate: ConvertDateFormat( $('#txtDate').val()),
            pNotes: ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val())
        }, pSaveandAddNew, null, '#hID', function () {
            // FA_AssetsInventory_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/FA_AssetsInventory/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "FA_AssetsInventoryModal", function () {
                    setTimeout(function () {
                        swal(TranslateString('Done'), TranslateString('YourTransactionIsUpdated'), 'success');
                        ArrDeleted = [];
                        $("#hID").val("0")
                        $('#tblFA_AssetsInventoryDetails > tbody').html('');
                        IntializeData();
                        ClearAllTableRows('tblFA_AssetsInventoryDetails');
                        FA_AssetsInventory_LoadingWithPaging();
                    }, 300);

                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });


    }













    //  });





}





function IntializeData(callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_AssetsInventory/IntializeData",
        data: {pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {



            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slBranchID_Filter', '');
            Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDevisonID_Filter', '');
            Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDepartmentID_Filter', '');
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slBranchID', '');
            Fill_SelectInputAfterLoadData(d[1], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDevisonID', '');
            Fill_SelectInputAfterLoadData(d[2], 'ID', 'Name', TranslateString("SelectFromMenu"), '#slDepartmentID', '');
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[3], 'ID', 'NameBarCode', TranslateString("SelectFromMenu"), '#slAssets', '', "BranchID,DepartmentID,DevisonID");


           // $('#slAssets').trigger("change");
          //  $('#slAssets').css({ 'width': '100%' }).select2();
          //  $("div[tabindex='-1']").removeAttr('tabindex');
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




function FA_AssetsInventory_Delete() {
    DeleteListFunction("/api/FA_AssetsInventory/Delete", { "pID": $('#hID').val(), "type": "1" }, function () { FA_AssetsInventory_LoadingWithPaging(); });
}

function FA_AssetsInventory_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_AssetsInventory') != "")
        swal({
            title: TranslateString("Areyousure?"),
            text: TranslateString("TheTransactionWillBeDeletedPermanently"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: TranslateString("Yes,delete!"),
            closeOnConfirm: true
        },
            //callback function in case of success
            function () {
                DeleteListFunction("/api/FA_AssetsInventory/Delete", { "pFA_AssetsInventoryIDs": GetAllSelectedIDsAsString('tblFA_AssetsInventory'), "type": "1" }, function () { FA_AssetsInventory_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_AssetsInventory/Delete", { "pFA_AssetsInventoryIDs": GetAllSelectedIDsAsString('tblFA_AssetsInventory') }, function () { FA_AssetsInventory_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_AssetsInventory_FillControls(pID) {
    $('#tblFA_AssetsInventoryDetails > tbody').html('');
    debugger;
    ClearAll("#FA_AssetsInventoryModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");


    IntializeData(function () {
        FA_AssetsInventoryDetails_BindTableRows(pID);
        setTimeout(function () {
            var tr = $("tr[ID='" + pID + "']");
            $('#slType').val($(tr).find("td.Type").attr('val'));
            $('#txtNotes').val($(tr).find("td.Notes").attr('val'));
            $('#txtDate').val($(tr).find("td.Date").attr('val'));

            $('#slDepartmentID').val($(tr).find("td.DepartmentID").attr('val'));
            $('#slBranchID').val($(tr).find("td.BranchID").attr('val'));
            $('#slDevisonID').val($(tr).find("td.DevisionID").attr('val'));
            $('#txtCode').val($(tr).find("td.Code").attr('val'));





            $("#slType").trigger("change");
          //  $('#slExludedTypeID').val($(tr).find("td.ExludedTypeID").attr('val'));
           // $('#slTransactionTypeID').val($(tr).find("td.TransactionTypeID").attr('val'));
           
          
          //  $('#txtNotes').val($(tr).find("td.Notes").attr('val'));
           
            
          //  $('#hExluded').val($('#slAssetID option:selected').attr('IsExcluded'));
         //   IntializeData(true);
         //   ShowHideInputs();

        }, 500);




    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_AssetsInventory_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AssetsInventory_Update(true);");











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
function FA_AssetsInventory_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_AssetsInventoryModal", null);
    //  ArrDeleted = [];
    $('#tblFA_AssetsInventoryDetails > tbody').html('');
    // $('#slSubAccountID').html('');


    $('#slType').val('3');
    $('#txtNotes').val("");
    $('#divDevisonID').removeClass("hide");
    $('#divDepartmentID').removeClass("hide");

    $('#slDepartmentID').val("0");
    $('#slBranchID').val("0");
    $('#slDevisonID').val("0");
    $('#txtCode').val("AUTO");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());






    $("#btnSave").attr("onclick", "FA_AssetsInventory_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AssetsInventory_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    $('#btn-Delete1').addClass("hide");
   // $('#slTransactionTypeID').prop("disabled", false);
   // $('#slAssetID').prop("disabled", false);
  //  $('#slFiscalYearID').html("");
   // $('#slAssets').trigger("change");
   // $('#slAssets').css({ 'width': '100%' }).select2();
 //   $("div[tabindex='-1']").removeAttr('tabindex');
   // $('#slAssetID').trigger("change");
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_AssetsInventory/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_AssetsInventory bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



function AddAsset(THIS)
{

    if ($('#slBranchID').val() == "0") {

        swal(TranslateString('Sorry'), TranslateString("YouMustInsertBranch"), "warning")
        $('#slAssets').val("0");
        $('#slAssets').trigger("change");
    }

    else if (($('#slType').val() == "2" || $('#slType').val() == "3") && $('#slDevisonID').val() == "0") {
        swal(TranslateString('Sorry'), TranslateString("YouMustInsertDivision"), "warning")
        $('#slAssets').val("0");
        $('#slAssets').trigger("change");
    }

    else if (($('#slType').val() == "3") && $('#slDepartmentID').val() == "0")
    {
        swal(TranslateString('Sorry'), TranslateString("YouMustInsertDepartment") , "warning")
        $('#slAssets').val("0");
        $('#slAssets').trigger("change");
    }

    else {
        if ($(THIS).val() != "0") {


            debugger
            if ($('#tblFA_AssetsInventoryDetails tbody tr').length > 0) {

                var AddedAsset = $('#tblFA_AssetsInventoryDetails tbody tr[AssetID="' + $(THIS).val() + '"]');
                if (AddedAsset.length > 0) {
                    $(AddedAsset).find("td.Qty").find("input").val(parseFloat($(AddedAsset).find("td.Qty").find("input").val()) + 1);
                  //  $(AddedAsset).find("td.Qty").find("input").val(parseFloat($(AddedAsset).find("td.Qty").find("input").trigger("blur")));
                    $('#slAssets').val("0");
                    $('#slAssets').trigger("change");



                    GetActualQtyOfAllAssets();
                }
                else {

                    FA_AssetsInventory_AddDetails(THIS);
                }
            }
            else { FA_AssetsInventory_AddDetails(THIS); }
        }


    }




}



var RowsCounter = 0;
var ArrDeleted = [];
function FA_AssetsInventory_AddDetails(Ass) {
    AppendRowtoTable("tblFA_AssetsInventoryDetails",
        ("<tr AssetID='" + $(Ass).val() + "' ID='" + 0 + "'>"
            + "<td> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='AssetID' val='" + $(Ass).val() + "'>" + "<select disabled='disabled' tag='" + $(Ass).val() +"' class='inputvalue input-sm  col-sm'>" + $('#slAssets').html() + "</select>" + "</td>"
            + "<td class='Qty' val='" + "1" + "'>" + "<input tag='1' onblur='GetActualQtyOfAllAssets();'  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "<td class='ActualQty' val='" + "0" + "'>" + "<input disabled='disabled' tag='0'  type='text' class='inputvalue input-sm  col-sm'> &nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-plus'></span>&nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-minus'></span>&nbsp;<span style='color:black;font-size:2rem;' class='difference'></span>" + "</td>"

            + "<td class='OriginalBranchID' val='" + $(Ass).find('option:selected').attr('BranchID') + "'>" + "<select disabled='disabled' tag='" + $(Ass).find('option:selected').attr('BranchID') + "' class='inputvalue input-sm  col-sm'>" + $('#slBranchID').html() + "</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span> " + "</td>"
            + "<td class='OriginalDevisionID' val='" + $(Ass).find('option:selected').attr('DevisonID') + "'>" + "<select tag='" + $(Ass).find('option:selected').attr('DevisonID') + "' disabled='disabled' class='inputvalue input-sm  col-sm'>" + $('#slDevisonID').html() +"</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span>" + "</td>"
            + "<td class='OriginalDepartmentID' val='" + $(Ass).find('option:selected').attr('DepartmentID') + "'>" + "<select tag='" + $(Ass).find('option:selected').attr('DepartmentID') + "' disabled='disabled' class='inputvalue input-sm  col-sm'>" + $('#slDepartmentID').html() + "</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span>" + "</td>"
            + "<td class='Notes' val='" + "0" + "'>" + "<textarea tag='0'  type='text' class='inputvalue input-sm  col-sm'></textarea>" + "</td>"
            + "</tr>"));

    FillHTMLtblInputs("#tblFA_AssetsInventoryDetails>tbody tr");

    setTimeout(function ()
    {
       // FillHTMLtblInputs("#tblFA_AssetsInventoryDetails>tbody tr");
        GetActualQtyOfAllAssets();
    }, 300);
  
}
function FA_AssetsInventoryDetails_BindTableRows(pID) {
        ClearAllTableRows("tblFA_AssetsInventoryDetails");
    LoadAll("/api/FA_AssetsInventory/LoadFA_AssetsInventoryDetails", " where FA_AssetInventoryID = " + pID + " ", function (pitems) {
            var items = JSON.parse(pitems);
            FadePageCover(false);
            $.each(items, function (i, item) {
                //debugger;
                AppendRowtoTable("tblFA_AssetsInventoryDetails",
                    ("<tr AssetID='" + item.AssetID + "' ID='" + item.ID  + "'>"
                        + "<td> <button tag=" + item.ID + " id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + item.ID + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + "<td class='AssetID' val='" + item.AssetID + "'>" + "<select disabled='disabled' tag='" + item.AssetID +"' class='inputvalue input-sm  col-sm'>" + $('#slAssets').html() + "</select>" + "</td>"
                        + "<td class='Qty' val='" + item.Qty + "'>" + "<input onblur='GetActualQtyOfAllAssets();' tag='" + item.Qty + "'  type='text' class='inputvalue input-sm  col-sm'>" + "</td>"

                        + "<td class='ActualQty' val='" + item.ActualQty + "'>" + "<input disabled='disabled' tag='" + item.ActualQty + "' type='text' class='inputvalue input-sm  col-sm'>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-plus'></span>&nbsp;<span style='color:red;font-size:2rem;' class='no hide  fa fa-minus'></span>&nbsp;<span style='color:black;font-size:2rem;' class='difference'></span>" + "</td>"
                        + "<td class='OriginalBranchID' val='" + item.OriginalBranchID + "'>" + "<select disabled='disabled' tag='" + item.OriginalBranchID + "' class='inputvalue input-sm  col-sm'>" + $('#slBranchID').html() + "</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span>" + "</td>"
                        + "<td class='OriginalDevisionID' val='" + item.OriginalDevisionID + "'>" + "<select tag='" + item.OriginalDevisionID + "' disabled='disabled' class='inputvalue input-sm  col-sm'>" + $('#slDevisonID').html() + "</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span>" + "</td>"
                        + "<td class='OriginalDepartmentID' val='" + item.OriginalDepartmentID + "'>" + "<select tag='" + item.OriginalDepartmentID + "' disabled='disabled' class='inputvalue input-sm  col-sm'>" + $('#slDepartmentID').html() + "</select>&nbsp;<span style='color:orange;font-size:2rem;' class='yes hide fa fa-check-circle'></span> &nbsp;<span style='color:red;font-size:2rem;' class='no hide fa fa-times-circle'></span>" + "</td>"
                        + "<td class='Notes' val='" + item.Notes + "'>" + "<textarea tag='" + item.Notes+"'  type='text' class='inputvalue input-sm  col-sm'></textarea>" + "</td>"
                        + "</tr>"));
                debugger
                if (i == items.length - 1) {
                    var a = $('#tblFA_AssetsInventoryDetails > tbody > tr').length

                    FillHTMLtblInputs("#tblFA_AssetsInventoryDetails>tbody tr");
                  //  SetDatepickerFormat();
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
            title: TranslateString("Areyousure?"),
            text: TranslateString("TheTransactionWillBeDeletedPermanently"),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: TranslateString("Yes,delete!"),
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
    $("#tblFA_AssetsInventoryDetails tbody tr").each(function (i, tr) {
        debugger;

        if ($('#hID').val() == "")
            $('#hID').val("0");


        var objItem = new Object();

        objItem.ID = $(tr).attr('ID');
        objItem.AssetID = $(tr).find('td.AssetID').find("select").val();
        objItem.OriginalBranchID = $(tr).find('td.OriginalBranchID').find("select").val();
        objItem.OriginalDevisionID = $(tr).find('td.OriginalDevisionID').find("select").val();
        objItem.OriginalDepartmentID = $(tr).find('td.OriginalDepartmentID').find("select").val();
        objItem.Qty = $(tr).find('td.Qty').find("input").val();
        objItem.ActualQty = $(tr).find('td.ActualQty').find("input").val();
        objItem.Notes = ($(tr).find('td.Notes').find("textarea").val() == "" ? "0" : $(tr).find('td.Notes').find("textarea").val()  ) ;
        objItem.FA_AssetInventoryID = $('#hID').val();
        
        arrayOfItems.push(objItem);
    });


    console.log(arrayOfItems);


    return arrayOfItems;
}

var slAss = null;
var trAss = null;
function GetActualQtyOfAllAssets()
{
    debugger
     slAss = null;
     trAss = null;
    $("#tblFA_AssetsInventoryDetails tbody tr").each(function (i, tr) {
        slAss = $(tr).find('td.AssetID').find("select");
        trAss = tr;

        if ($('#slBranchID').val() != $(slAss).find('option:selected').attr('BranchID'))
        {
            $(tr).find('td.OriginalBranchID').find('span.no').removeClass('hide');
            $(tr).find('td.OriginalBranchID').find('span.yes').addClass('hide');
        }
        else
        {
            $(tr).find('td.OriginalBranchID').find('span.yes').removeClass('hide');
            $(tr).find('td.OriginalBranchID').find('span.no').addClass('hide');
        }

        if ($('#slDevisonID').val() != $(slAss).find('option:selected').attr('DevisonID'))
        {
            $(tr).find('td.OriginalDevisionID').find('span.no').removeClass('hide');
            $(tr).find('td.OriginalDevisionID').find('span.yes').addClass('hide');
        }
        else
        {
            $(tr).find('td.OriginalDevisionID').find('span.yes').removeClass('hide');
            $(tr).find('td.OriginalDevisionID').find('span.no').addClass('hide');
        }
        if ($('#slDepartmentID').val() != $(slAss).find('option:selected').attr('DepartmentID'))
        {
            $(tr).find('td.OriginalDepartmentID').find('span.no').removeClass('hide');
            $(tr).find('td.OriginalDepartmentID').find('span.yes').addClass('hide');
        }
        else
        {
            $(tr).find('td.OriginalDepartmentID').find('span.yes').removeClass('hide');
            $(tr).find('td.OriginalDepartmentID').find('span.no').addClass('hide');
        }

        if ($('#slType').val() == "2") {
            $(tr).find('td.OriginalDepartmentID').find('span.yes').addClass('hide');
            $(tr).find('td.OriginalDepartmentID').find('span.no').addClass('hide');
        }
        else if ($('#slType').val() == "1") {
            $(tr).find('td.OriginalDepartmentID').find('span.yes').addClass('hide');
            $(tr).find('td.OriginalDepartmentID').find('span.no').addClass('hide');
            $(tr).find('td.OriginalDevisionID').find('span.yes').addClass('hide');
            $(tr).find('td.OriginalDevisionID').find('span.no').addClass('hide');
        }

        if (

            (

                $('#slType').val() == "3" &&
                (
                    $('#slBranchID').val() != $(slAss).find('option:selected').attr('BranchID') ||
                    $('#slDevisonID').val() != $(slAss).find('option:selected').attr('DevisonID') ||
                    $('#slDepartmentID').val() != $(slAss).find('option:selected').attr('DepartmentID')
                )

            )
            ||
            (

                $('#slType').val() == "2" &&
                (
                    $('#slBranchID').val() != $(slAss).find('option:selected').attr('BranchID') ||
                    $('#slDevisonID').val() != $(slAss).find('option:selected').attr('DevisonID')
                )

            )
            ||
            (

                $('#slType').val() == "1" &&
                (
                    $('#slBranchID').val() != $(slAss).find('option:selected').attr('BranchID')


                )

            )
        ) {

            $(tr).find('td.ActualQty').find("input").val("0");



            if (parseFloat($(tr).find('td.Qty').find('input').val()) > parseFloat($(tr).find('td.ActualQty').find('input').val())) {
                $(tr).find('td.ActualQty').find("span.yes").removeClass('hide');
                $(tr).find('td.ActualQty').find("span.no").addClass('hide');
                $(tr).find('td.ActualQty').find("span.difference").text(parseFloat($(tr).find('td.Qty').find('input').val()) - parseFloat($(tr).find('td.ActualQty').find('input').val()));
            }
            else if (parseFloat($(tr).find('td.Qty').find('input').val()) < parseFloat($(tr).find('td.ActualQty').find('input').val())) {
                $(tr).find('td.ActualQty').find("span.no").removeClass('hide');
                $(tr).find('td.ActualQty').find("span.yes").addClass('hide');
                $(tr).find('td.ActualQty').find("span.difference").text(parseFloat($(tr).find('td.ActualQty').find('input').val()) - parseFloat($(tr).find('td.Qty').find('input').val()));
            }
            else
            {
                $(tr).find('td.ActualQty').find("span.no").addClass('hide');
                $(tr).find('td.ActualQty').find("span.yes").addClass('hide');
                $(tr).find('td.ActualQty').find("span.difference").text('');
               
            }
        }
        else
        {
            FadePageCover(true)
            $.ajax({
                type: "GET",
                url: strServerURL + "/api/FA_AssetsInventory/GetActualQtyOfAsset",
                data: {
                    pAssetID: $(trAss).find('td.AssetID').find("select").val(),
                    pDate: ConvertDateFormat($('#txtDate').val())
                      },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (d) {
                    
                    $(tr).find('td.ActualQty').find("input").val(d[0]);

                    if (parseFloat($(tr).find('td.Qty').find('input').val()) > parseFloat($(tr).find('td.ActualQty').find('input').val())) {
                        $(tr).find('td.ActualQty').find("span.yes").removeClass('hide');
                        $(tr).find('td.ActualQty').find("span.no").addClass('hide');
                        $(tr).find('td.ActualQty').find("span.difference").text(parseFloat($(tr).find('td.Qty').find('input').val()) - parseFloat($(tr).find('td.ActualQty').find('input').val()));
                    }
                    else if (parseFloat($(tr).find('td.Qty').find('input').val()) < parseFloat($(tr).find('td.ActualQty').find('input').val())) {
                        $(tr).find('td.ActualQty').find("span.no").removeClass('hide');
                        $(tr).find('td.ActualQty').find("span.yes").addClass('hide');
                        $(tr).find('td.ActualQty').find("span.difference").text(parseFloat($(tr).find('td.ActualQty').find('input').val()) - parseFloat($(tr).find('td.Qty').find('input').val()));
                    }
                    else {
                        $(tr).find('td.ActualQty').find("span.no").addClass('hide');
                        $(tr).find('td.ActualQty').find("span.yes").addClass('hide');
                        $(tr).find('td.ActualQty').find("span.difference").text('');

                    }
                    FadePageCover(false);
                },
                error: function (jqXHR, exception) {
                    debugger;
                    swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
                    FadePageCover(false);
                }
            });

        }

        if ($("#tblFA_AssetsInventoryDetails tbody tr").length - 1 == i) {
            $('#slAssets').val("0");
            $('#slAssets').trigger("change");
        }
    });






}


function CleartblDetails()
{
  //  $("#tblFA_AssetsInventoryDetails tbody").html("");

    if ($('#slType').val() == "3")
    {
        $('#divDevisonID').removeClass("hide");
        $('#divDepartmentID').removeClass("hide");
    }
    else if ($('#slType').val() == "2")
    {
        $('#divDevisonID').removeClass("hide");
        $('#divDepartmentID').addClass("hide");
        $('#slDepartmentID').val("0");
    }
    else
    {
        $('#divDevisonID').addClass("hide");
        $('#slDevisonID').val("0");
        $('#divDepartmentID').addClass("hide");
        $('#slDepartmentID').val("0");
    }



    setTimeout(function () {
        // FillHTMLtblInputs("#tblFA_AssetsInventoryDetails>tbody tr");
        GetActualQtyOfAllAssets();
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

