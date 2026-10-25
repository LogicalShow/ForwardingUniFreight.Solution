$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val()
    // CheckIfAllLoading();

    $("#slAccountID").css({ "width": "100%" }).select2();
    $("#slDepreciationAccountID").css({ "width": "100%" }).select2();
    $("#slAccumulatedDepreciationAccountID").css({ "width": "100%" }).select2();
    $("#slCostCenter").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');



});

// City Country ---------------------------------------------------------------
// Bind FA_AssetsGroups Table Rows
function FA_AssetsGroups_BindTableRows(pFA_AssetsGroups) {
    debugger;
    $("#hl-menu-FA").parent().addClass("active");
    ClearAllTableRows("tblFA_AssetsGroups");
    $.each(pFA_AssetsGroups, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_AssetsGroups",
            ("<tr ID='" + item.GroupID + "' ondblclick='FA_AssetsGroups_EditByDblClick(" + item.GroupID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.GroupID + "' /></td>"
                + "<td class='Approved' val='" + item.ParentSubAccountID + "'>" + (item.ParentSubAccountID == 1 ? "<span style='font-size:2.5rem; color:#3276b1;' class='fa fa-check'></span>" : "<span style='font-size:2.5rem; color:lightblue;' class='fa fa-close'></span>") + "</td>"
                + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + item.SubAccountName + "</td>"
                + "<td class='AssetAccount_ID hide' val='" + item.AssetAccount_ID + "'>" + item.AccountName + "</td>"
                + "<td class='AssetAccumulatedDepreciationAccount_ID hide' val='" + item.AssetAccumulatedDepreciationAccount_ID + "'>" + item.AccountName + "</td>"
                + "<td class='AssetDepreciationAccount_ID hide' val='" + item.AssetDepreciationAccount_ID + "'>" + item.AccountName + "</td>"
                + "<td class='AssetCostCenter_ID hide' val='" + item.AssetCostCenter_ID + "'>" + item.AssetCostCenter_ID + "</td>"

                
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='Percentage' val='" + item.ActualPercentage + "'>" + item.ActualPercentage + "&nbsp;%</td>"
                + "<td class='Percentage2 hide' val='" + item.Percentage + "'>" + item.Percentage + "</td>"
                + "<td class='ParentSubAccountID' val='" + item.ParentSubAccountID + "'>" + item.ParentSubAccountName + "</td>"
                + "<td class='hFA_AssetsGroups'><a href='#FA_AssetsGroupsModal' data-toggle='modal' onclick='FA_AssetsGroups_FillControls(" + item.GroupID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_AssetsGroups", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_AssetsGroups>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    if ($("[id$='hf_ChangeLanguage']").val() == "ar") {
        $(".swapChildrenClass:not(.reversed)").reverseChildren();

    }
}
function FA_AssetsGroups_EditByDblClick(pID) {
    jQuery("#FA_AssetsGroupsModal").modal("show");
    FA_AssetsGroups_FillControls(pID);
}
// Loading with data
function FA_AssetsGroups_LoadingWithPaging() {
    debugger;
  //  LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_AssetsGroups/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_AssetsGroups_BindTableRows(pTabelRows); FA_AssetsGroups_ClearAllControls(); });
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_AssetsGroups/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_AssetsGroups_BindTableRows(pTabelRows); });
    HighlightText("#tblFA_AssetsGroups>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function FA_AssetsGroups_Insert(pSaveandAddNew) {
    Isvalidated = true;




      //  $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
            //if (
            //   $('#slSubAccountID').val() == "0" ||  ) {
            //    swal('Sorry', 'You Must Fill All Details Data', 'warning');
            //    Isvalidated = false;
            //    // break;
            //}



           // if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {

              //  if (Isvalidated) {
                  //  isOverlap("#tblFA_AssetsGroupDestructions", "FromDate", "ToDate", function (IsOverlap) {

                        //if (IsOverlap == "false") {
                            debugger;
                            InsertUpdateFunctionAndReturnID("form", "/api/FA_AssetsGroups/Insert", {
                                pName: $("#slSubAccountID option:selected").text(),
                                pSubAccountID: $("#slSubAccountID").val(),
                                pParentSubAccountID: $("#slSubAccountID option:selected").attr('Parent_ID'),
                                pAccountID: $("#slAccountID").val(),
                                pDepreciationAccountID: $("#slDepreciationAccountID").val(),
                                pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),

                                pPercentage: $('#txtPercentage').val(), pCode: $('#txtCode').val(),
                                pAssetCostCenter_ID: $("#slCostCenter").val()

                            }, false, 'FA_AssetsGroupsModal', '#hID', function () {
                                FA_AssetsGroups_LoadingWithPaging();
                                jQuery('#' + 'FA_AssetsGroupsModal').modal('hide');
                                         
                                //------------------------------------- ----------- -  - - - - -- - - - - -
                                //InsertUpdateListOfObject("/api/FA_AssetsGroups/InsertItems",
                                //    SetArrayOfItems()
                                //    , pSaveandAddNew, "FA_AssetsGroupsModal", function () {
                                        setTimeout(function () {

                                            ArrDeleted = [];
                                            $("#hID").val("0");
                                            $('#tblFA_AssetsGroupDestructions > tbody').html('');
                                            IntializeData();
                                            ClearAllTableRows('tblFA_AssetsGroupDestructions');
                                            FA_AssetsGroups_LoadingWithPaging();
                                        }, 300);

                                   // });
                                //------------------------------------- ----------- -  - - - - -- - - - - -
                            });



                        //}
                        //else {

                        //    swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning');
                        //}












                  //  });

              //  }

           // }






       // });
  //  }


   

}

function FA_AssetsGroups_Update(pSaveandAddNew) {
    Isvalidated = true;




    //  $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
    //if (
    //   $('#slSubAccountID').val() == "0" ||  ) {
    //    swal('Sorry', 'You Must Fill All Details Data', 'warning');
    //    Isvalidated = false;
    //    // break;
    //}



    // if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {

    //  if (Isvalidated) {
    //  isOverlap("#tblFA_AssetsGroupDestructions", "FromDate", "ToDate", function (IsOverlap) {

    //if (IsOverlap == "false") {
    debugger;
    InsertUpdateFunctionAndReturnID("form", "/api/FA_AssetsGroups/Update", {
        pID: $('#hID').val() ,
        pName: $("#slSubAccountID option:selected").text(),
        pSubAccountID: $("#slSubAccountID").val(),
        pParentSubAccountID: $("#slSubAccountID option:selected").attr('Parent_ID'),
        pPercentage: $('#txtPercentage').val(), pCode: $('#txtCode').val(),
        pAccountID: $("#slAccountID").val(),
        pDepreciationAccountID: $("#slDepreciationAccountID").val(),
        pAccumulatedDepreciationAccountID: $("#slAccumulatedDepreciationAccountID").val(),
        pAssetCostCenter_ID: $("#slCostCenter").val(),
    }, false, 'FA_AssetsGroupsModal', '#hID', function () {
        FA_AssetsGroups_LoadingWithPaging();
        //------------------------------------- ----------- -  - - - - -- - - - - -
        //InsertUpdateListOfObject("/api/FA_AssetsGroups/InsertItems",
        //    SetArrayOfItems()
        //    , pSaveandAddNew, "FA_AssetsGroupsModal", function () {
        setTimeout(function () {
            jQuery('#' + 'FA_AssetsGroupsModal').modal('hide');
            ArrDeleted = [];
            $("#hID").val("0");
            $('#tblFA_AssetsGroupDestructions > tbody').html('');
            IntializeData();
            ClearAllTableRows('tblFA_AssetsGroupDestructions');
            FA_AssetsGroups_LoadingWithPaging();
        }, 300);

        // });
        //------------------------------------- ----------- -  - - - - -- - - - - -
    });



    //}
    //else {

    //    swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning');
    //}












    //  });

    //  }

    // }






    // });
    //  }




}

//function FA_AssetsGroups_Update(pSaveandAddNew) {
//    var Isvalidated = true;
//    $('#tblFA_AssetsGroupDestructions>tbody>tr').each(function (i, tr) {
//        if (//$(tr).find('.selectaccount').val().trim() == "0" ||
//            $(tr).find('.inputvalue').val().trim() == "" || $('#slSubAccountID').val() == "0") {
//            swal('Sorry', 'You Must Fill All Details Data', 'warning');
//            Isvalidated = false;
//            //  break;
//        }

//        if (i == $('#tblFA_AssetsGroupDestructions>tbody>tr').length - 1) {

//            if (Isvalidated) {



//                isOverlap("#tblFA_AssetsGroupDestructions", "FromDate", "ToDate", function (IsOverlap) {
//                    if (IsOverlap == "false") {
//                        debugger;
//                        InsertUpdateFunctionAndReturnID("form", "/api/FA_AssetsGroups/Update", {
//                            pID: $('#hID').val(), pName: $("#slSubAccountID option:selected").text(),
//                            pSubAccountID: $("#slSubAccountID").val()
//                            ,
//                            pParentSubAccountID: $("#slSubAccountID option:selected").attr('Parent_ID')
//                        }, pSaveandAddNew, null, '#hID', function () {
//                            FA_AssetsGroups_LoadingWithPaging();
//                            //------------------------------------- ----------- -  - - - - -- - - - - -
//                            InsertUpdateListOfObject("/api/FA_AssetsGroups/InsertItems",
//                                SetArrayOfItems()
//                                , pSaveandAddNew, "FA_AssetsGroupsModal", function () {
//                                    setTimeout(function () {

//                                        console.log('arr deleted ' + ArrDeleted.join(","))
//                                        console.log('arr deleted ' + ArrDeleted.length)
//                                        if (ArrDeleted.length > 0)
//                                            DeleteListFunction("/api/FA_AssetsGroups/Delete", { "pFA_AssetsGroupsIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });


//                                        $('#tblFA_AssetsGroupDestructions > tbody').html('');

//                                        $("#hID").val("0")

//                                        IntializeData();
//                                        ClearAllTableRows('tblFA_AssetsGroupDestructions');
//                                        FA_AssetsGroups_LoadingWithPaging();
//                                    }, 300);

//                                });
//                            //------------------------------------- ----------- -  - - - - -- - - - - -
//                        });

//                    }
//                    else
//                    {

//                        swal(TranslateString("Sorry"), TranslateString('DateOverlap'), 'warning');
//                    }

//                });




//            }

//        }






//    });

//}


function IntializeData(callback) {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/FA_AssetsGroups/IntializeData",
        data: { pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[0], 'ID', 'SubAccount_EnName', TranslateString("SelectFromMenu"), '#slSubAccountID', '' , 'Parent_ID');


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




function FA_AssetsGroups_Delete(pID) {
    DeleteListFunction("/api/FA_AssetsGroups/DeleteByID", { "pID": pID, "type": "1" }, function () { FA_AssetsGroups_LoadingWithPaging(); });
}

function FA_AssetsGroups_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_AssetsGroups') != "")
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
                DeleteListFunction("/api/FA_AssetsGroups/Delete", { "pFA_AssetsGroupsIDs": GetAllSelectedIDsAsString('tblFA_AssetsGroups'), "type": "1" }, function () { FA_AssetsGroups_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_AssetsGroups/Delete", { "pFA_AssetsGroupsIDs": GetAllSelectedIDsAsString('tblFA_AssetsGroups') }, function () { FA_AssetsGroups_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_AssetsGroups_FillControls(pID) {
    $('#tblFA_AssetsGroupDestructions > tbody').html('');
    debugger;
    ClearAll("#FA_AssetsGroupsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

   // $("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));

    //FillFiscalYears();
    // Fill_SelectInput_WithDependedID("/api/FA_AssetsGroups/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
   // FA_AssetsGroupDestructions_BindTableRows(pID);




    //setTimeout(function () {
    //    $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    //}, 300);

    IntializeData(function () {
            var tr1 = $("tr[ID='" + pID + "']");
        //setTimeout(function () {
        console.log($(tr1).find("td.SubAccountID").attr('val'))
            $("#slSubAccountID").val($(tr1).find("td.SubAccountID").attr('val'));
        $('#hParentSubAccountID').val($(tr1).find("td.ParentSubAccountID").attr('val'));
        $('#txtPercentage').val($(tr1).find("td.Percentage").attr('val'));
        $('#txtCode').val($(tr1).find("td.Code").attr('val'));

        $('#slCostCenter').val($(tr1).find("td.AssetCostCenter_ID").attr('val')).trigger('change');;

        $("#slAccountID").val($(tr1).find("td.AssetAccount_ID").attr('val')).trigger('change');
        $("#slAccumulatedDepreciationAccountID").val($(tr1).find("td.AssetAccumulatedDepreciationAccount_ID").attr('val')).trigger('change');
        $("#slDepreciationAccountID").val($(tr1).find("td.AssetDepreciationAccount_ID").attr('val')).trigger('change');;


            //}, 1000);
    });
    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_AssetsGroups_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AssetsGroups_Update(true);");











}

function FA_AssetsGroups_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_AssetsGroupsModal", null);
    //  ArrDeleted = [];
    $('#tblFA_AssetsGroupDestructions > tbody').html('');
    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "FA_AssetsGroups_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AssetsGroups_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    $('#txtPercentage').val("0")

  //  $('#slFiscalYearID').html("");
}


//function FillFiscalYears() {
//    console.log($('#hID').val());
//    console.log($('#slSubAccountID').val());
//    Fill_SelectInput_WithWhereCondition("/api/FA_AssetsGroups/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null, " where ID NOT IN(select bf.FiscalYearID from FA_AssetsGroups bf where bf.ID <> " + $('#hID').val() + " and bf.SubAccountID = " + $('#slSubAccountID').val() + " )  ");
//}




//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function FA_AssetsGroups_AddDetails() {
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
    LoadAll("/api/FA_AssetsGroups/LoadFA_AssetsGroupDestructions", " where AssestGroupID = " + pID + " ", function (pitems) {
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

