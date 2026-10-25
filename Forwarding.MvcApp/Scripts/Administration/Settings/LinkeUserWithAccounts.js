// City Country ---------------------------------------------------------------
// Bind LinkeUserWithAccounts Table Rows
var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique


function LinkeUserWithAccounts_BindTableRows(pLinkeUserWithAccounts) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblLinkeUserWithAccounts");
    $.each(pLinkeUserWithAccounts, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";

        AppendRowtoTable("tblLinkeUserWithAccounts",
            ("<tr ID='" + item.ID + "' ondblclick='LinkeUserWithAccounts_EditByDblClick(" + item.ID + "," + item.MonthID + ");' " + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='UserID' val='" + item.UserID + "'>" + item.Name + "</td>"
                + "<td class='IsAllAccounts hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsAllAccounts == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='hLinkeUserWithAccounts'><a href='#LinkeUserWithAccountsModal' data-toggle='modal' onclick='LinkeUserWithAccounts_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblLinkeUserWithAccounts", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLinkeUserWithAccounts>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function LinkeUserWithAccounts_EditByDblClick(pID) {
    jQuery("#LinkeUserWithAccountsModal").modal("show");
    LinkeUserWithAccounts_FillControls(pID);
}
// Loading with data
function LinkeUserWithAccounts_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/LinkeUserWithAccounts/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { LinkeUserWithAccounts_BindTableRows(pTabelRows); LinkeUserWithAccounts_ClearAllControls(); });
    HighlightText("#tblLinkeUserWithAccounts>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function LinkeUserWithAccounts_Insert(pSaveandAddNew) {
    debugger;
    Isvalidated = true;

    if ($("#cbAllAccounts").prop('checked')) {

            

            if ( $('#slUser').val() == "0" || $('#slUser').val() == "0") {
                swal('Sorry', 'You Must Fill All Details Data', 'warning');
                Isvalidated = false;
                // break;
            }
        
                if (Isvalidated) {
                    debugger;
                    InsertUpdateFunctionAndReturnID("form", "/api/LinkeUserWithAccounts/Insert", {
                        pUserID: $("#slUser").val(),
                        pIsAllAccounts: $("#cbAllAccounts").prop('checked')
                    }, pSaveandAddNew, null, '#hID', function () {
                        jQuery("#LinkeUserWithAccountsModal").modal("hide");

                        LinkeUserWithAccounts_LoadingWithPaging();
            
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                    });
                }

            



    }
    else {
        $('#tblLinkeUserWithAccountsDetails>tbody>tr').each(function (i, tr) {

            var AccountID = $(tr).find('.selectaccountID').val();

            if (//$(tr).find('.selectaccount').val().trim() == "0" ||
                //  $(tr).find('.inputvalue').val().trim() == ""
                AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null

                || $('#slUser').val() == "0" || $('#slUser').val() == "0") {
                swal('Sorry', 'You Must Fill All Details Data', 'warning');
                Isvalidated = false;
                // break;
            }

            if (i == $('#tblLinkeUserWithAccountsDetails>tbody>tr').length - 1) {

                if (Isvalidated) {
                    debugger;
                    InsertUpdateFunctionAndReturnID("form", "/api/LinkeUserWithAccounts/Insert", {
                        pUserID: $("#slUser").val(),
                        pIsAllAccounts: $("#cbAllAccounts").prop('checked')
                    }, pSaveandAddNew, null, '#hID', function () {
                        LinkeUserWithAccounts_LoadingWithPaging();
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                        InsertUpdateListOfObject("/api/LinkeUserWithAccounts/InsertItems",
                            SetArrayOfItems()
                            , pSaveandAddNew, "LinkeUserWithAccountsModal", function () {
                                setTimeout(function () {
                                    LinkeUserWithAccounts_LoadingWithPaging();
                                    ArrDeleted = [];
                                    //  IntializeData();
                                    ClearAllTableRows('tblLinkeUserWithAccountsDetails');
                                }, 300);

                            });
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                    });
                }

            }


        });

    }

}



function LinkeUserWithAccounts_Update(pSaveandAddNew) {
    var Isvalidated = true;
    if ($("#cbAllAccounts").prop('checked')) {


            

            if ( $('#slUser').val() == "0" || $('#slUser').val() == "0") {
                swal('Sorry', 'You Must Fill All Details Data', 'warning');
                Isvalidated = false;
                //  break;
            }
        

                if (Isvalidated) {
                    debugger;
                    InsertUpdateFunctionAndReturnID("form", "/api/LinkeUserWithAccounts/Update", {
                        pID: $('#hID').val(), pBudgetID: $("#slBudgetID").val(),
                        pUserID: $("#slUser").val(),
                        pIsAllAccounts: $("#cbAllAccounts").prop('checked')
                    }, pSaveandAddNew, null, '#hID', function () {
                        jQuery("#LinkeUserWithAccountsModal").modal("hide");

                        LinkeUserWithAccounts_LoadingWithPaging();
        
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                    });
                }

            




    }
    else {
        $('#tblLinkeUserWithAccountsDetails>tbody>tr').each(function (i, tr) {


            var AccountID = $(tr).find('.selectaccountID').val();

            if (//$(tr).find('.selectaccount').val().trim() == "0" ||
                //  $(tr).find('.inputvalue').val().trim() == ""
                AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null

                || $('#slUser').val() == "0" || $('#slUser').val() == "0") {
                swal('Sorry', 'You Must Fill All Details Data', 'warning');
                Isvalidated = false;
                //  break;
            }

            if (i == $('#tblLinkeUserWithAccountsDetails>tbody>tr').length - 1) {

                if (Isvalidated) {
                    debugger;
                    InsertUpdateFunctionAndReturnID("form", "/api/LinkeUserWithAccounts/Update", {
                        pID: $('#hID').val(), pBudgetID: $("#slBudgetID").val(),
                        pUserID: $("#slUser").val(),
                        pIsAllAccounts: $("#cbAllAccounts").prop('checked')
                    }, pSaveandAddNew, null, '#hID', function () {
                        LinkeUserWithAccounts_LoadingWithPaging();
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                        InsertUpdateListOfObject("/api/LinkeUserWithAccounts/InsertItems",
                            SetArrayOfItems()
                            , pSaveandAddNew, "LinkeUserWithAccountsModal", function () {
                                setTimeout(function () {
                                    LinkeUserWithAccounts_LoadingWithPaging();
                                    console.log('arr deleted ' + ArrDeleted.join(","))
                                    console.log('arr deleted ' + ArrDeleted.length)
                                    if (ArrDeleted.length > 0)
                                        DeleteListFunction("/api/LinkeUserWithAccounts/Delete", { "pLinkeUserWithAccountsIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });

                                    //  IntializeData();
                                    ClearAllTableRows('tblLinkeUserWithAccountsDetails');
                                }, 300);

                            });
                        //------------------------------------- ----------- -  - - - - -- - - - - -
                    });
                }

            }






        });

    }

}


function IntializeData() {

    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "api/LinkeUserWithAccounts/IntializeData",
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




function LinkeUserWithAccounts_Delete(pID) {
    DeleteListFunction("/api/LinkeUserWithAccounts/DeleteByID", { "pID": pID, "type": "1" }, function () { LinkeUserWithAccounts_LoadingWithPaging(); });
}

function LinkeUserWithAccounts_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblLinkeUserWithAccounts') != "")
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
                DeleteListFunction("/api/LinkeUserWithAccounts/Delete", { "pLinkeUserWithAccountsIDs": GetAllSelectedIDsAsString('tblLinkeUserWithAccounts'), "type": "1" }, function () { LinkeUserWithAccounts_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/LinkeUserWithAccounts/Delete", { "pLinkeUserWithAccountsIDs": GetAllSelectedIDsAsString('tblLinkeUserWithAccounts') }, function () { LinkeUserWithAccounts_LoadingWithPaging(); });
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
function LinkeUserWithAccounts_FillControls(pID, pMonthID) {
    debugger;
    ClearAll("#LinkeUserWithAccountsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#slUser").val($(tr).find("td.UserID").attr('val'));
    $("#cbAllAccounts").prop('checked', $(tr).find('td.IsAllAccounts').find('input').attr('val'));

    FillFiscalYears();
    // Fill_SelectInput_WithDependedID("api/LinkeUserWithAccounts/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    LinkeUserWithAccountsDetails_BindTableRows(pID);



    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "LinkeUserWithAccounts_Update(false);");
    $("#btnSaveandNew").attr("onclick", "LinkeUserWithAccounts_Update(true);");
}

function LinkeUserWithAccounts_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#LinkeUserWithAccountsModal", null);
    //  ArrDeleted = [];

    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "LinkeUserWithAccounts_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "LinkeUserWithAccounts_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

    $('#slFiscalYearID').html("");
}


function FillFiscalYears() {
    console.log($('#hID').val());
    console.log($('#slBudgetID').val());
    Fill_SelectInput_WithWhereCondition("api/LinkeUserWithAccounts/LoadFiscalYears", "ID", "Fiscal_Year_Name", "Select Fiscal Year", "#slFiscalYearID", null,
        " where ID NOT IN(select bf.FiscalYearID from LinkeUserWithAccounts bf where bf.ID <> " + $('#hID').val() + " and bf.BudgetID = "
        + $('#slBudgetID').val()  + " And MonthID="  + $('#slMonthly').val() +")");
}




var RowsCounter = 0;
var ArrDeleted = [];
function LinkeUserWithAccounts_AddDetails() {
    ++maxDetailsIDInTable;
    AppendRowtoTable("tblLinkeUserWithAccountsDetails",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='AccountID' val='" + "0" + "'>" + "<select id='slAccount" + maxDetailsIDInTable + "' tag='0'  style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"

            + "</tr>"));
}

function LinkeUserWithAccountsDetails_BindTableRows(pID) {
    debugger;
    var LoadAccounts = $("#cbLoadAccounts").prop("checked");

    if (pID != null) {
        ClearAllTableRows("tblLinkeUserWithAccountsDetails");
        maxDetailsIDInTable = 0;
        LoadAll("api/LinkeUserWithAccounts/LoadLinkeUserWithAccountsDetails", " where LinkeUserWithAccountsID = " + pID + " ", function (pitems) {
            var items = JSON.parse(pitems);
            FadePageCover(false);

            $.each(items, function (i, item) {
                maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
                //debugger;
                AppendRowtoTable("tblLinkeUserWithAccountsDetails",
                    ("<tr ID='" + item.ID + "'>"
                        + "<td class=''> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                        + "<td class='AccountID' val='" + item.AccountID + "'>" + "<select tag='" + item.AccountID + "' id='slAccount" + maxDetailsIDInTable + "'  style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                       
                        + "</tr>"));


                if (i == items.length - 1) {
                    FillHTMLtblInputs("#tblLinkeUserWithAccountsDetails > tbody");
                    //if (i == items.length - 1) {
                    //    var a = $('#tblLinkeUserWithAccountsDetails > tbody > tr').length
                    //    debugger;
                    //    $.each($('#tblLinkeUserWithAccountsDetails>tbody>tr'), function (j, tr) {
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

                    //*************************




                }

            });

        });
    }
    else {
        ClearAllTableRows("tblLinkeUserWithAccountsDetails");

        FadePageCover(false);
        if (LoadAccounts) {
            LoadAll("api/LinkeUserWithAccounts/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
                var items = JSON.parse(pitems);
                $.each(items, function (i, item) {

                    AppendRowtoTable("tblLinkeUserWithAccountsDetails",
                        ("<tr ID='" + 0 + "'>"
                            + "<td class='hide'> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='hide btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                            + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
                       
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

    $("#tblLinkeUserWithAccountsDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');
        objItem.LinkeUserWithAccountsID = $('#hID').val();
        objItem.AccountID = $(tr).find('td.AccountID').find('.selectaccountID').val();
   
        arrayOfItems.push(objItem);
    });


    return arrayOfItems;
}


