// City Country ---------------------------------------------------------------
// Bind GateOut Table Rows
//Start Auto Filter
$(document).ready(function () {
    $("#slCustomerID").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter

var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

function GateOut_BindTableRows(pGateOut) {
    debugger;
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    $("#hl-menu-Station").parent().addClass("active");
    ClearAllTableRows("tblGateOut");
    $.each(pGateOut, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblGateOut",
            ("<tr ID='" + item.ID + "' ondblclick='GateOut_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='ExitDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExitDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ExitDate))) + "</td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"

                + "<td class='hGateOut'><a href='#GateOutModal' data-toggle='modal' onclick='GateOut_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblGateOut", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblGateOut>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function UploadFiles(pID) {
    debugger;
    $("#hID").val(pID);
    ClearAll("#UploadFilesModal");
    jQuery("#UploadFilesModal").modal("show");
    Vouchers_GeneralUpload_Initialise();

}
function Vouchers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_JournalVouchers";
    //glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#hID").val();

    glbGeneralUploadPath = "/DocsInFiles//JournalVouchers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/JournalVouchers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_JournalVouchers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_JournalVouchers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_JournalVouchers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}

function GateOut_EditByDblClick(pID) {
    jQuery("#GateOutModal").modal("show");
    GateOut_FillControls(pID);
}
// Loading with data
function GateOut_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/GateOut/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { GateOut_BindTableRows(pTabelRows); GateOut_ClearAllControls(); });
    HighlightText("#tblGateOut>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function GateOut_Insert(pSaveandAddNew) {
    var _Suceess = true;
    debugger;



    if ($('#tblGateOutDetails > tbody > tr').length == 0) {
        swal('Excuse me', 'You must insert Rows', 'warning');
        _Suceess = false;
    }
    else {
        AccountIDs = "";
        if ($('#tblGateOutDetails > tbody > tr').length > 0) {

            $($('#tblGateOutDetails > tbody > tr')).each(function (i, tr) {
                debugger;

                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ExpenseID').find('.selectservice').val());
                var ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();

                if (ContainerNumber == "" || ContainerNumber == "0" || ContainerNumber == null) {
                    swal('Excuse me', 'Must Input Container Number', 'warning');
                    _Suceess = false;
                    return false;
                }
              

            });
        }
    }


        

    if (_Suceess) {
                debugger;
                InsertUpdateFunctionAndReturnID("form", "/api/GateOut/Insert", {
                    pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : $('#txtEntryDate').val(),
                    //pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtEntryDate').val()),


                }, pSaveandAddNew, null, '#hID', function () {
                    GateOut_LoadingWithPaging();
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/GateOut/InsertItems",
                       SetArrayOfItems()
                        , pSaveandAddNew, "GateOutModal", function () {
                            setTimeout(function () {
                                GateOut_LoadingWithPaging();
                                ArrDeleted = [];
                                //  IntializeData();
                                ClearAllTableRows('tblGateOutDetails');
                            }, 300);

                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        
    

}



function GateOut_Update(pSaveandAddNew) {
    var _Suceess = true;


   
    if ($('#tblGateOutDetails > tbody > tr').length == 0) {
        swal('Excuse me', 'You must insert Rows', 'warning');
        _Suceess = false;
    }
    else {
        AccountIDs = "";
        if ($('#tblGateOutDetails > tbody > tr').length > 0) {

            $($('#tblGateOutDetails > tbody > tr')).each(function (i, tr) {
                debugger;

                var ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();

                if (ContainerNumber == "" || ContainerNumber == "0" || ContainerNumber == null) {
                    swal('Excuse me', 'Must Input Container Number', 'warning');
                    _Suceess = false;
                    return false;
                }
              

            });
        }
    }


    if (_Suceess) {
        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/GateOut/Update", {
            pID: $('#hID').val(), pBudgetID: $("#slBudgetID").val(),
            pCode: $("#txtCode").val(),
            pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtEntryDate').val()),
        }, pSaveandAddNew, null, '#hID', function () {
            GateOut_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/GateOut/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "GateOutModal", function () {
                    setTimeout(function () {
                        GateOut_LoadingWithPaging();
                        //console.log('arr deleted ' + ArrDeleted.join(","))
                        //console.log('arr deleted ' + ArrDeleted.length)
                        //if (ArrDeleted.length > 0)
                        //    DeleteListFunction("/api/GateOut/Delete", { "pGateOutIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });

                        //  IntializeData();
                        ClearAllTableRows('tblGateOutDetails');
                    }, 300);

                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });
    }

}


function IntializeData() {

    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "api/GateOut/IntializeData",
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




function GateOut_Delete(pID) {
    DeleteListFunction("/api/GateOut/DeleteByID", { "pID": pID, "type": "1" }, function () { GateOut_LoadingWithPaging(); });
}

function GateOut_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblGateOut') != "")
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
                DeleteListFunction("/api/GateOut/Delete", { "pGateOutIDs": GetAllSelectedIDsAsString('tblGateOut') }, function () { GateOut_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/GateOut/Delete", { "pGateOutIDs": GetAllSelectedIDsAsString('tblGateOut') }, function () { GateOut_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function GateOut_FillControls(pID) {
    debugger;
    ClearAll("#GateOutModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

 
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtEntryDate").val($(tr).find("td.ExitDate").text());
    
    
    // Fill_SelectInput_WithDependedID("api/GateOut/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));

    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);

    //GateOutDetails_BindTableRows(pID);



    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "GateOut_Update(false);");
    $("#btnSaveandNew").attr("onclick", "GateOut_Update(true);");
}
function LoadInvoiceDetails() {
    debugger;
    LoadAll("/api/GateOut/LoadST_GateOutDetails", "where ST_GateOutID = " + $('#hID').val(), function (pTabelRows) {
        GateOutDetails_BindTableRows(pTabelRows[0]);

        setTimeout(function () {
            //CalculateAll();
           // SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        }, 300);

    });
}

function GateOut_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#GateOutModal", null);
    //  ArrDeleted = [];

    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "GateOut_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "GateOut_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

    $('#slFiscalYearID').html("");

    $('#slCustomerID').val("0");
    $("#slCustomerID").trigger("change");

    $('#slOperation').val("");
    $("#slOperation").trigger("change");

    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    $('#txtEntryDate').val(pFormattedTodaysDate);
}






var RowsCounter = 0;
var ArrDeleted = [];
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

    $("#tblGateOutDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('ID');

        //objItem.ID = 0;
        objItem.ST_GateOutID = $('#hID').val();
        //  objItem.AccountID = $(tr).find('td.AccountID').attr('val');input_ContainerID
        objItem.ContainerID = $(tr).find('td.ContainerID').attr('val');
        //objItem.ContainerID = $(tr).find('td.ContainerID').find('.input_ContainerID').val();
        objItem.ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();
        objItem.OperationID = $(tr).find('td.OperationID').attr('val');
        objItem.ST_PreGateInDetailsID = $(tr).find('td.ST_PreGateInDetailsID').attr('val');
        objItem.isGateOut = $(tr).find('#cbisGateOut').is(":checked");
        objItem.ST_PreGateInID = $(tr).find('td.ST_PreGateInID').attr('val');
        
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


function GateOutDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblGateOutDetails");
    $.each(JSON.parse(pItems), function (i, item) {

        debugger;
        AppendRowtoTable("tblGateOutDetails",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                + " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ContainerNumber' val='" + item.ContainerNumber + "'>" + "<input tag='" + item.ContainerNumber + "'   type='text' class='input_ContainerNumber input-sm  col-sm'>" + "</td>"
                //+ "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + "<input tag='" + item.ContainerID + "'   type='text' class='input_ContainerID input-sm  col-sm'>" + "</td>"

                + "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + item.ContainerID + "</td>"
                + "<td class='OperationID' val='" + item.OperationID + "'>" + item.OperationCode + "</td>"
                + "<td class='CustomerID' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"

                + "<td class='ST_PreGateInID hide' val='" + item.ST_PreGateInID + "'>" + item.ST_PreGateInID + "</td>"
                + "<td class='ST_PreGateInDetailsID hide' val='" + item.ST_PreGateInDetailsID + "'>" + item.ST_PreGateInDetailsID + "</td>"
                + "<td class='isGateOut'> <input id='cbisGateOut' type='checkbox' val='" + (item.isGateOut == true ? "true' checked='checked'" : "'") + " /></td>"

                + "</tr>"));

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        //$("#tblGateOutDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblGateOutDetails").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');

    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}
function FillItemsData() {
    $($('#tblGateOutDetails > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ContainerNumber ').find('.input_ContainerNumber').val($(tr).find('td.ContainerNumber').find('.input_ContainerNumber').attr('tag'));


    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function DeleteItems(RowNumber, ID) {

    if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
        ItemsRowsCounter = ItemsRowsCounter - 1;
        // CalculateAll();

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
                $("#tblGateOutDetails > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                //GetAllSelectedIDs(ID);
                //CalculateTotalExpenses();
                // CalculateAll();
            });

    }

}

//---------------------------------------------------------------------------------

function LoadGateOutDetails() {
    debugger;
    //$.getJSON("/api/GateOut/LoadAccounts", { pWhereClause: "where OperationID = " + $('#slOperation').val() }, function (Result) {
    //    if (Result.length > 0) {
    //        GateOutDetails_BindTableRows(Result[0]);
    //    }
    //});
    //$.ajax({
    //    type: "Get",
    //    url: "/api/GateOut/LoadAccounts",
    //    data: { pWhereClause: "where OperationID = " + $('#slOperation').val() },
    //    dataType: "json",
    //    success: function (r) {
    //        // $(tr).find('.QuantityInStore').html();
    //        GateOutDetails_BindTableRows(r[0]);
    //        //span_quantity
    //    }
    //});
    LoadAll("api/GateOut/LoadGateOutDetails", "where 1=1", function (pTabelRows) {
        GateOutDetails_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


        setTimeout(function () {
            //CalculateAll();
            //SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        }, 300);

    });
}