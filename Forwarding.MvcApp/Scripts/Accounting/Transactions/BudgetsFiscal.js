// City Country ---------------------------------------------------------------
// Bind BudgetsFiscal Table Rows
var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique


function BudgetsFiscal_BindTableRows(pBudgetsFiscal) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblBudgetsFiscal");
    $.each(pBudgetsFiscal, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";

        AppendRowtoTable("tblBudgetsFiscal",
            ("<tr ID='" + item.ID + "' ondblclick='BudgetsFiscal_EditByDblClick(" + item.ID + "," + item.MonthID + ");' " + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='BudgetID' val='" + item.BudgetID + "'>" + item.Name + "</td>"
                + "<td class='FiscalYearID' val='" + item.FiscalYearID + "'>" + (item.FiscalYearName == "0" ? "-" : item.FiscalYearName) + "</td>"
                + "<td class='MonthID' val='" + item.MonthID + "'>" + item.MonthID + "</td>"
                + "<td class='FromDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.FromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.FromDate))) + "</td>"
                + "<td class='ToDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ToDate))) + "</td>"
                + "<td class='hBudgetsFiscal'><a href='#BudgetsFiscalModal' data-toggle='modal' onclick='BudgetsFiscal_FillControls(" + item.ID + ","  + item.MonthID+ ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBudgetsFiscal", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBudgetsFiscal>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function BudgetsFiscal_EditByDblClick(pID,pMonthID) {
    jQuery("#BudgetsFiscalModal").modal("show");
    BudgetsFiscal_FillControls(pID, pMonthID);
}
// Loading with data
function BudgetsFiscal_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/BudgetsFiscal/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { BudgetsFiscal_BindTableRows(pTabelRows); BudgetsFiscal_ClearAllControls(); });
    HighlightText("#tblBudgetsFiscal>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function BudgetsFiscal_Insert(pSaveandAddNew) {
    debugger;
    Isvalidated = true;

    $('#tblBudgetsFiscalDetails>tbody>tr').each(function (i, tr) {

        var Value = $(tr).find('.inputvalue').val();
        var AccountID = $(tr).find('.selectaccountID').val();

        if (//$(tr).find('.selectaccount').val().trim() == "0" ||
            //  $(tr).find('.inputvalue').val().trim() == ""
              AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null
            || Value.trim() == "" || Value == null
            || $('#slBudgetID').val() == "0" || $('#slFiscalYearID').val() == "0") {
            swal('Sorry', 'You Must Fill All Details Data', 'warning');
            Isvalidated = false;
            // break;
        }

        if (i == $('#tblBudgetsFiscalDetails>tbody>tr').length - 1) {

            if (Isvalidated) {
                debugger;
                InsertUpdateFunctionAndReturnID("form", "/api/BudgetsFiscal/Insert", {
                    pBudgetID: $("#slBudgetID").val(),
                    pFiscalYearID: $("#slFiscalYearID").val(),
                    pFromDate: $('#txtFromDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtFromDate').val()),
                    pToDate: $('#txtToDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtToDate').val()),
                    pMonthID: $('#slMonthly').val()
                }, pSaveandAddNew, null, '#hID', function () {
                    BudgetsFiscal_LoadingWithPaging();
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/BudgetsFiscal/InsertItems",
                       SetArrayOfItems()
                        , pSaveandAddNew, "BudgetsFiscalModal", function () {
                            setTimeout(function () {
                                BudgetsFiscal_LoadingWithPaging();
                                ArrDeleted = [];
                                //  IntializeData();
                                ClearAllTableRows('tblBudgetsFiscalDetails');
                            }, 300);

                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        }


    });

}



function BudgetsFiscal_Update(pSaveandAddNew) {
    var Isvalidated = true;
    $('#tblBudgetsFiscalDetails>tbody>tr').each(function (i, tr) {

        var Value = $(tr).find('.inputvalue').val();
        var AccountID = $(tr).find('.selectaccountID').val();

        if (//$(tr).find('.selectaccount').val().trim() == "0" ||
            //  $(tr).find('.inputvalue').val().trim() == ""
              AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null
            || Value.trim() == "" || Value == null
            || $('#slBudgetID').val() == "0" || $('#slFiscalYearID').val() == "0") {
            swal('Sorry', 'You Must Fill All Details Data', 'warning');
            Isvalidated = false;
            //  break;
        }

        if (i == $('#tblBudgetsFiscalDetails>tbody>tr').length - 1) {

            if (Isvalidated) {
                debugger;
                InsertUpdateFunctionAndReturnID("form", "/api/BudgetsFiscal/Update", {
                    pID: $('#hID').val(), pBudgetID: $("#slBudgetID").val(),
                    pFiscalYearID: $("#slFiscalYearID").val(),
                    pFromDate: $('#txtFromDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtFromDate').val()),
                    pToDate: $('#txtToDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtToDate').val()),
                    pMonthID: $('#slMonthly').val()
                }, pSaveandAddNew, null, '#hID', function () {
                    BudgetsFiscal_LoadingWithPaging();
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/BudgetsFiscal/InsertItems",
                        SetArrayOfItems()
                        , pSaveandAddNew, "BudgetsFiscalModal", function () {
                            setTimeout(function () {
                                BudgetsFiscal_LoadingWithPaging();
                                console.log('arr deleted ' + ArrDeleted.join(","))
                                console.log('arr deleted ' + ArrDeleted.length)
                                if (ArrDeleted.length > 0)
                                    DeleteListFunction("/api/BudgetsFiscal/Delete", { "pBudgetsFiscalIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });

                                //  IntializeData();
                                ClearAllTableRows('tblBudgetsFiscalDetails');
                            }, 300);

                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        }






    });

}


function IntializeData() {

    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "api/BudgetsFiscal/IntializeData",
    //    data: { pStoresNamesOnly: "true" },
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (d) {
    //        Fill_SelectInputAfterLoadData(d[0], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');
    //        FadePageCover(false);
    //    },
    //    error: function (jqXHR, exception) {
    //        debugger;
    //        swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
    //        FadePageCover(false);
    //    }
    //});
}




function BudgetsFiscal_Delete(pID) {
    DeleteListFunction("/api/BudgetsFiscal/DeleteByID", { "pID": pID, "type": "1" }, function () { BudgetsFiscal_LoadingWithPaging(); });
}

function BudgetsFiscal_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBudgetsFiscal') != "")
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
                DeleteListFunction("/api/BudgetsFiscal/Delete", { "pBudgetsFiscalIDs": GetAllSelectedIDsAsString('tblBudgetsFiscal'), "type": "1" }, function () { BudgetsFiscal_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/BudgetsFiscal/Delete", { "pBudgetsFiscalIDs": GetAllSelectedIDsAsString('tblBudgetsFiscal') }, function () { BudgetsFiscal_LoadingWithPaging(); });
}
function ChangeOption() {

    if ($('#cbIsMonthly').prop('checked')) {
        $('#slMonthly').parent().removeClass('hide');
        $('#txtFromDate').parent().addClass('hide');
        $('#txtToDate').parent().addClass('hide');
        $('#txtFromDate').val('');
        $('#txtToDate').val('');
    }
    else {
        $('#slMonthly').parent().addClass('hide');
        $('#txtFromDate').parent().removeClass('hide');
        $('#txtToDate').parent().removeClass('hide');
        $('#slMonthly').val(0);

    }
}
//after pressing edit, this function fills the data
function BudgetsFiscal_FillControls(pID, pMonthID) {
    debugger;
    ClearAll("#BudgetsFiscalModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    if (pMonthID > 0) {
        $('#slMonthly').parent().removeClass('hide');
        $('#txtFromDate').parent().addClass('hide');
        $('#txtToDate').parent().addClass('hide');
        $('#cbIsMonthly').prop('checked', true);
        $('#cbIsYear').prop('checked', false);
        $('#slMonthly').val($(tr).find("td.MonthID").attr('val'));
    }
    else {
        $('#slMonthly').parent().addClass('hide');
        $('#txtFromDate').parent().removeClass('hide');
        $('#txtToDate').parent().removeClass('hide');
        $('#cbIsMonthly').prop('checked', false);
        $('#cbIsYear').prop('checked', true);
    }
    $("#slBudgetID").val($(tr).find("td.BudgetID").attr('val'));
    $("#txtFromDate").val($(tr).find("td.FromDate").text());
    $("#txtToDate").val($(tr).find("td.ToDate").text());

    FillFiscalYears();
    // Fill_SelectInput_WithDependedID("api/BudgetsFiscal/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    BudgetsFiscalDetails_BindTableRows(pID);




    setTimeout(function () {
        $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    }, 300);


    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "BudgetsFiscal_Update(false);");
    $("#btnSaveandNew").attr("onclick", "BudgetsFiscal_Update(true);");
}

function BudgetsFiscal_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#BudgetsFiscalModal", null);
    //  ArrDeleted = [];

    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "BudgetsFiscal_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "BudgetsFiscal_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

    $('#slFiscalYearID').html("");
}


function FillFiscalYears() {
    console.log($('#hID').val());
    console.log($('#slBudgetID').val());
    Fill_SelectInput_WithWhereCondition("api/BudgetsFiscal/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null,
        " where ID NOT IN(select bf.FiscalYearID from BudgetsFiscal bf where bf.ID <> " + $('#hID').val() + " and bf.BudgetID = "
        + $('#slBudgetID').val()  + " And MonthID="  + $('#slMonthly').val() +")");
}



function LoadAccounts() {
    debugger;
    var LoadAccounts = $("#cbLoadAccounts").prop("checked");
    if (LoadAccounts) {
        LoadAll("api/BudgetsFiscal/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
            var items = JSON.parse(pitems);
            $.each(items, function (i, item) {

                AppendRowtoTable("tblBudgetsFiscalDetails",
                    ("<tr ID='" + 0 + "'>"
                        + "<td class=''> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + "0" + ");'  style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                        + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
                        + "<td class='CostCenterID' val='" + "0" + "'>" + "<select tag='0' id='slCostCenter" + maxDetailsIDInTable + "'   style='width:100%;' class='controlStyle selectCostCenter'>" + $('#hidden_slCostCenter').html() + "</select>" + "</td>"
                        + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
                        + "</tr>"));

                if (i == items.length - 1)
                    FillHTMLtblInputs("#tblBudgetsFiscalDetails > tbody");
            });



        });
    }
    //if (Boolean(ShowSubAccount) == true)
    //{
    //    $("#btnAddDetails").removeClass("hide");
    //    $("#tblBudgetsFiscalDetailsWithSubAccount").removeClass("hide");
    //    $("#tblBudgetsFiscalDetails").addClass("hide");
    //}
    //else
    //{
    //    $("#btnAddDetails").addClass("hide");
    //    $("#tblBudgetsFiscalDetailsWithSubAccount").addClass("hide");      
    //    $("#tblBudgetsFiscalDetails").removeClass("hide");
    //}



}
//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function BudgetsFiscal_AddDetails() {
    ++maxDetailsIDInTable;
    AppendRowtoTable("tblBudgetsFiscalDetails",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='AccountID' val='" + "0" + "'>" + "<select id='slAccount" + maxDetailsIDInTable + "' onchange='Details_AccountChanged(" + maxDetailsIDInTable + ");' tag='0'  style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
            + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
            + "<td class='CostCenterID' val='" + "0" + "'>" + "<select id='slCostCenter" + maxDetailsIDInTable + "' tag='0'  style='width:100%;' class='controlStyle selectCostCenter'>" + $('#hidden_slCostCenter').html() + "</select>" + "</td>"
            + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' id='txtValue" + maxDetailsIDInTable + "' class='inputvalue input-sm  col-sm'>" + "</td>"
            + "</tr>"));
}

function BudgetsFiscalDetails_BindTableRows(pID) {
    debugger;
    var LoadAccounts = $("#cbLoadAccounts").prop("checked");

    if (pID != null) {
        ClearAllTableRows("tblBudgetsFiscalDetails");
        maxDetailsIDInTable = 0;
        LoadAll("api/BudgetsFiscal/LoadBudgetsFiscalDetails", " where BudgetFiscalID = " + pID + " ", function (pitems) {
            var items = JSON.parse(pitems);
            FadePageCover(false);

            $.each(items, function (i, item) {
                maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
                //debugger;
                AppendRowtoTable("tblBudgetsFiscalDetails",
                    ("<tr ID='" + item.ID + "'>"
                        + "<td class=''> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + "<td class='AccountID' val='" + item.AccountID + "'>" + "<select tag='" + item.AccountID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + item.SubAccountID + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                        + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
                        + "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + "<select tag='" + item.CostCenterID + "' id='slCostCenter" + maxDetailsIDInTable + "'  style='width:100%;' class='controlStyle selectCostCenter'>" + $('#hidden_slCostCenter').html() + "</select>" + "</td>"
                        + "<td class='Value' val='" + item.Value + "'>" + "<input tag='" + item.Value + "'  type='number' id='txtValue" + maxDetailsIDInTable + "' class='inputvalue input-sm  col-sm'>" + "</td>"

                        + "</tr>"));


                if (i == items.length - 1) {
                    FillHTMLtblInputs("#tblBudgetsFiscalDetails > tbody");
                    //if (i == items.length - 1) {
                    //    var a = $('#tblBudgetsFiscalDetails > tbody > tr').length
                    //    debugger;
                    //    $.each($('#tblBudgetsFiscalDetails>tbody>tr'), function (j, tr) {
                    //        try {
                    //            var sl = $(tr).find('input[type=select]');
                    //            console.log("sl" + sl.length)
                    //            $.each($(tr).find('select'), function (i1, i_sl) {
                    //                $(i_sl).val($(i_sl).attr('tag'));
                    //            });
                    //        } catch (ex1) { }
                    //        //---------------------------------------------------------------------------------------------------------
                    //        try {
                    //            var nu = $(tr).find('input[type=number]');
                    //            console.log("nu" + nu.length)
                    //            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
                    //                $(i_nu).val($(i_nu).attr('tag'));
                    //            });
                    //        } catch (ex2) { }
                    //        //---------------------------------------------------------------------------------------------------------
                    //        try {
                    //            var txt = $(tr).find('input[type=text]');
                    //            console.log("txt" + txt.length)
                    //            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
                    //                $(i_txt).val($(i_txt).attr('tag'));
                    //            });
                    //        } catch (ex3) { }
                    //    });

                    //*************************
                    if (LoadAccounts) {
                        LoadAll("api/BudgetsFiscal/LoadAccounts", " where IsMain = '" + 0 + "' and ID NOT IN(select bfd.AccountID from BudgetsFiscalDetails bfd where bfd.BudgetFiscalID = " + pID + "   ) ", function (pitems) {
                            var items = JSON.parse(pitems);
                            $.each(items, function (i, item) {

                                AppendRowtoTable("tblBudgetsFiscalDetails",
                                    ("<tr ID='" + 0 + "'>"
                                        + "<td class=''> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='  btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                                          + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + "0" + ");' style='width:100%;' class='controlStyle   selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                                        + "<td class='SubAccountID' val='" + "0" + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "'  style='width:100%;' class='controlStyle  selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
                                        + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
                                        + "</tr>"));
                            });


                        });
                    }
                    //*************************




                }

            });

        });
    }
    else {
        ClearAllTableRows("tblBudgetsFiscalDetails");

        FadePageCover(false);
        if (LoadAccounts) {
            LoadAll("api/BudgetsFiscal/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
                var items = JSON.parse(pitems);
                $.each(items, function (i, item) {

                    AppendRowtoTable("tblBudgetsFiscalDetails",
                        ("<tr ID='" + 0 + "'>"
                            + "<td class='hide'> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='hide btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                            + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + 0 + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                              + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
                            + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
                            + "</tr>"));
                });


            });
        }

    }
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

    $("#tblBudgetsFiscalDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.BudgetFiscalID = $('#hID').val();
        //  objItem.AccountID = $(tr).find('td.AccountID').attr('val');
        objItem.AccountID = $(tr).find('td.AccountID').find('.selectaccountID').val();
        objItem.SubAccountID = $(tr).find('td.SubAccountID').find('.selectsubaccount').val();
        objItem.Value = $(tr).find('td.Value').find('.inputvalue').val();
        objItem.CostCenterID = $(tr).find('td.CostCenterID').find('.selectCostCenter').val() == undefined ? "0" : $(tr).find('td.CostCenterID').find('.selectCostCenter').val();;
        objItem.IsDebit = false;
        arrayOfItems.push(objItem);
    });


    return arrayOfItems;
}

function Details_AccountChanged(pRowID) {
    debugger;
    $("#slSubAccount" + pRowID).val(0);
    Details_FillSlSubAccount("slSubAccount" + pRowID, 0, $("#slAccount" + pRowID).val());
}
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                //Start Auto Filter
                $("#" + pSlName).css({ "width": "80%" }).select2();
                $("div[tabindex='-1']").removeAttr('tabindex');
                $("#" + pSlName).trigger("change");
                //End Auto Filter
            }
            FadePageCover(false);
        }
        , null);
}
function Details_FillSlSubAccountInTable(THIS, ChildClass, pSubAccountID) {

    debugger;
    var ChildComboBox = $(THIS).closest('tr').find(ChildClass).find("select");
    Fill_SelectInput_WithDependedID("/api/ChartOfLinkingAccounts/FillUpdateSubAccount", "ID", "Name", "<--Select-->", ChildComboBox, pSubAccountID, $(THIS).val())
}
function CopyCostCenter() {
    if ($('#tblBudgetsFiscalDetails > tbody > tr').length > 0) {
        $('.selectCostCenter').val($('#slCostCenterCopy').val());
    }

}
