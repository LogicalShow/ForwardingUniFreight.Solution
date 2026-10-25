// City Country ---------------------------------------------------------------
// Bind PreGateIn Table Rows
//Start Auto Filter
$(document).ready(function () {
    $("#slCustomerID").css({ "width": "100%" }).select2();
    $("#slOperation").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter

var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

function PreGateIn_BindTableRows(pPreGateIn) {
    debugger;
    var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";

    $("#hl-menu-Station").parent().addClass("active");
    ClearAllTableRows("tblPreGateIn");
    $.each(pPreGateIn, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPreGateIn",
            ("<tr ID='" + item.ID + "' ondblclick='PreGateIn_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='OperationID' val='" + item.OperationID + "'>" + item.OperationCode + "</td>"
                + "<td class='CustomerID' val='" + item.CustomerID + "'>" + item.CustomerName + "</td>"
                + "<td class='EntryDate' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate))) + "</td>"
                + "<td class='TruckingOrderNumber hide' val='" + item.TruckingOrderNumber + "'>" + item.TruckingOrderNumber + "</td>"
                + "<td class='BoogingNumber hide' val='" + item.BoogingNumber + "'>" + item.BoogingNumber + "</td>"

                + "<td class='Notes hide' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"

                + "<td class='hPreGateIn'><a href='#PreGateInModal' data-toggle='modal' onclick='PreGateIn_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPreGateIn", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPreGateIn>tbody>tr", $("#txt-Search").val().trim());
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
function PreGateIn_EditByDblClick(pID) {
    jQuery("#PreGateInModal").modal("show");
    PreGateIn_FillControls(pID);
}
// Loading with data
function PreGateIn_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PreGateIn/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PreGateIn_BindTableRows(pTabelRows); PreGateIn_ClearAllControls(); });
    HighlightText("#tblPreGateIn>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function PreGateIn_Insert(pSaveandAddNew) {
    var _Suceess = true;
    debugger;
    if ($('#txtEntryDate').val() == "") {
        swal('Excuse me', 'You must Select Entery Date', 'warning');
        _Suceess = false;
    }
    else if ($('#slClientID').val() == "0") {
        swal('Excuse me', 'You must Select Client', 'warning');
        _Suceess = false;
    }

    else if ($('#slOperation').val() == "") {
        swal('Excuse me', 'You must Select Operation', 'warning');
        _Suceess = false;
    }

    else if ($('#tblPreGateInDetails > tbody > tr').length == 0) {
        swal('Excuse me', 'You must insert Rows', 'warning');
        _Suceess = false;
    }
    else {
        AccountIDs = "";
        if ($('#tblPreGateInDetails > tbody > tr').length > 0) {

            $($('#tblPreGateInDetails > tbody > tr')).each(function (i, tr) {
                debugger;

                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ExpenseID').find('.selectservice').val());
                var PackageTypeIDOnContainerid = $(tr).find('td.PackageTypeIDOnContainer').find('.selectPackageTypeIDOnContainer').val();
                var ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();
                var Qty = $(tr).find('td.Quantity').find('.inputQuantity').val();

                if (ContainerNumber == "" || ContainerNumber == "0" || ContainerNumber == null) {
                    swal('Excuse me', 'Must Input Container Number', 'warning');
                    _Suceess = false;
                    return false;
                }
                if ((PackageTypeIDOnContainerid.trim() == "" || PackageTypeIDOnContainerid.trim() == "0" || PackageTypeIDOnContainerid == null) && $(tr).attr('tag') == "PackageTypeIDOnContainer") {
                    swal('Excuse me', 'Fill  Package', 'warning');
                    _Suceess = false;
                    return false;
                }

                if (Qty == "" || Qty == "0" || Qty == null) {
                    swal('Excuse me', 'Must Input Qyantity', 'warning');
                    _Suceess = false;
                    return false;
                }

            });
        }
    }


        

    if (_Suceess) {
                debugger;
                InsertUpdateFunctionAndReturnID("form", "/api/PreGateIn/Insert", {
                    pOperationID: $("#slOperation").val(),
                    pCustomerID: $("#slCustomerID").val(),
                    //pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : $('#txtEntryDate').val(),
                    pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtEntryDate').val()),

                    pTruckingOrderNumber: $('#txtTruckingOrders').val() == "" ? "0" : $('#txtTruckingOrders').val() == "undefined" ? "0" : $('#txtTruckingOrders').val(),
                    pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(),
                    pBoogingNumber: $('#txtBoogingNumber').val() == "" ? "0" : $('#txtBoogingNumber').val() == "undefined" ? "0" : $('#txtBoogingNumber').val(),


                }, pSaveandAddNew, null, '#hID', function () {
                    PreGateIn_LoadingWithPaging();
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                    InsertUpdateListOfObject("/api/PreGateIn/InsertItems",
                       SetArrayOfItems()
                        , pSaveandAddNew, "PreGateInModal", function () {
                            setTimeout(function () {
                                PreGateIn_LoadingWithPaging();
                                ArrDeleted = [];
                                //  IntializeData();
                                ClearAllTableRows('tblPreGateInDetails');
                            }, 300);

                        });
                    //------------------------------------- ----------- -  - - - - -- - - - - -
                });
            }

        
    

}



function PreGateIn_Update(pSaveandAddNew) {
    var _Suceess = true;


    if ($('#slClientID').val() == "0") {
        swal('Excuse me', 'You must Select Client', 'warning');
        _Suceess = false;
    }

    if ($('#slOperation').val() == "") {
        swal('Excuse me', 'You must Select Operation', 'warning');
        _Suceess = false;
    }

    if ($('#tblPreGateInDetails > tbody > tr').length == 0) {
        swal('Excuse me', 'You must insert Rows', 'warning');
        _Suceess = false;
    }
    else {
        AccountIDs = "";
        if ($('#tblPreGateInDetails > tbody > tr').length > 0) {

            $($('#tblPreGateInDetails > tbody > tr')).each(function (i, tr) {
                debugger;

                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ExpenseID').find('.selectservice').val());
                var PackageTypeIDOnContainerid = $(tr).find('td.PackageTypeIDOnContainer').find('.selectPackageTypeIDOnContainer').val();
                var ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();
                var Qty = $(tr).find('td.Quantity').find('.inputQuantity').val();

                if (ContainerNumber == "" || ContainerNumber == "0" || ContainerNumber == null) {
                    swal('Excuse me', 'Must Input Container Number', 'warning');
                    _Suceess = false;
                    return false;
                }
                if ((PackageTypeIDOnContainerid.trim() == "" || PackageTypeIDOnContainerid.trim() == "0" || PackageTypeIDOnContainerid == null) && $(tr).attr('tag') == "PackageTypeIDOnContainer") {
                    swal('Excuse me', 'Fill  Package', 'warning');
                    _Suceess = false;
                    return false;
                }

                if (Qty == "" || Qty == "0" || Qty == null) {
                    swal('Excuse me', 'Must Input Qyantity', 'warning');
                    _Suceess = false;
                    return false;
                }

            });
        }
    }


    if (_Suceess) {
        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/PreGateIn/Update", {
            pID: $('#hID').val(), pBudgetID: $("#slBudgetID").val(),
            pOperationID: $("#slOperation").val(),
            pCustomerID: $("#slCustomerID").val(),
            pEnteryDate: $('#txtEntryDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtEntryDate').val()),
            pTruckingOrderNumber: $('#txtTruckingOrders').val() == "" ? "0" : $('#txtTruckingOrders').val() == "undefined" ? "0" : $('#txtTruckingOrders').val(),
            pNotes: $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val(),
            pBoogingNumber: $('#txtBoogingNumber').val() == "" ? "0" : $('#txtBoogingNumber').val() == "undefined" ? "0" : $('#txtBoogingNumber').val(),

        }, pSaveandAddNew, null, '#hID', function () {
            PreGateIn_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/PreGateIn/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "PreGateInModal", function () {
                    setTimeout(function () {
                        PreGateIn_LoadingWithPaging();
                        //console.log('arr deleted ' + ArrDeleted.join(","))
                        //console.log('arr deleted ' + ArrDeleted.length)
                        //if (ArrDeleted.length > 0)
                        //    DeleteListFunction("/api/PreGateIn/Delete", { "pPreGateInIDs": ArrDeleted.join(","), "type": "2" }, function () { ArrDeleted = []; });

                        //  IntializeData();
                        ClearAllTableRows('tblPreGateInDetails');
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
    //    url: strServerURL + "api/PreGateIn/IntializeData",
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




function PreGateIn_Delete(pID) {
    DeleteListFunction("/api/PreGateIn/DeleteByID", { "pID": pID, "type": "1" }, function () { PreGateIn_LoadingWithPaging(); });
}

function PreGateIn_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPreGateIn') != "")
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
                DeleteListFunction("/api/PreGateIn/Delete", { "pPreGateInIDs": GetAllSelectedIDsAsString('tblPreGateIn') }, function () { PreGateIn_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/PreGateIn/Delete", { "pPreGateInIDs": GetAllSelectedIDsAsString('tblPreGateIn') }, function () { PreGateIn_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PreGateIn_FillControls(pID) {
    debugger;
    ClearAll("#PreGateInModal", null);
    $("#hID").val(pID);

    var tr = $("tr[ID='" + pID + "']");

    $("#slOperation").val($(tr).find("td.OperationID").attr('val'));
    $("#slCustomerID").val($(tr).find("td.CustomerID").attr('val'));
    $("#txtEntryDate").val($(tr).find("td.EntryDate").text());
    $("#txtTruckingOrders").val($(tr).find("td.TruckingOrderNumber").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtBoogingNumber").val($(tr).find("td.BoogingNumber").text());

    
    $("#slCustomerID").trigger("change");
   
    $("#slOperation").trigger("change");
    
    // Fill_SelectInput_WithDependedID("api/PreGateIn/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));

    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);

    //PreGateInDetails_BindTableRows(pID);




    setTimeout(function () {
        $("#slFiscalYearID").val($(tr).find("td.FiscalYearID").attr('val'));
    }, 300);


    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "PreGateIn_Update(false);");
    $("#btnSaveandNew").attr("onclick", "PreGateIn_Update(true);");
}
function LoadInvoiceDetails() {
    debugger;
    LoadAll("/api/PreGateIn/LoadST_PreGateInDetails", "where PreGateInID = " + $('#hID').val(), function (pTabelRows) {
        PreGateInDetails_BindTableRows(pTabelRows[0]);

        setTimeout(function () {
            //CalculateAll();
           // SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        }, 300);

    });
}

function PreGateIn_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PreGateInModal", null);
    //  ArrDeleted = [];

    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "PreGateIn_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "PreGateIn_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");

    $('#slFiscalYearID').html("");

    $('#slCustomerID').val("0");
    $("#slCustomerID").trigger("change");

    $('#slOperation').val("");
    $("#slOperation").trigger("change");
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

    $("#tblPreGateInDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var IsApproved = $(tr).find('#cbIsApproved').is(":checked");
        if (IsApproved==false) {
            var objItem = new Object();
            objItem.ID = $(tr).attr('ID');

            //objItem.ID = 0;
            objItem.PreGateInID = $('#hID').val();
            //  objItem.AccountID = $(tr).find('td.AccountID').attr('val');input_ContainerID
            objItem.ContainerID = $(tr).find('td.ContainerID').attr('val');
            //objItem.ContainerID = $(tr).find('td.ContainerID').find('.input_ContainerID').val();

            objItem.ContainerNumber = $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val();
            objItem.PackageTypeIDOnContainer = $(tr).find('td.PackageTypeIDOnContainer').find('.selectPackageTypeIDOnContainer').val();
            objItem.Quantity = $(tr).find('td.Quantity').find('.inputQuantity').val();
            objItem.GrossWeightTON = $(tr).find('td.GrossWeightTON').find('.inputGrossWeightTON').val();
            objItem.NetWeightTON = $(tr).find('td.NetWeightTON').find('.inputNetWeightTON').val();
            objItem.DescriptionOfGoods = $(tr).find('td.DescriptionOfGoods').find('.inputDescriptionOfGoods').val();
            objItem.Driver = $(tr).find('td.Driver').find('.inputDriver').val();
            objItem.DriverNumber = $(tr).find('td.DriverNumber').find('.inputDriverNumber').val();
            objItem.PO = $(tr).find('td.PO').find('.inputPO').val();


            objItem.TruckNumber = $(tr).find('td.TruckNumber').find('.inputTruckNumber').val().trim() == "" ? "0" : $(tr).find('td.TruckNumber').find('.inputTruckNumber').val().trim();
            objItem.isComplete = false;
            arrayOfItems.push(objItem);
        }

        
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
//function PreGateInDetails_BindTableRows(pID) {
//    debugger;
//    var LoadAccounts = $("#cbLoadAccounts").prop("checked");

//    if (pID != null) {
//        ClearAllTableRows("tblPreGateInDetails");
//        maxDetailsIDInTable = 0;
//        LoadAll("api/PreGateIn/LoadPreGateInDetails", " where BudgetFiscalID = " + pID + " ", function (pitems) {
//            var items = JSON.parse(pitems);
//            FadePageCover(false);

//            $.each(items, function (i, item) {
//                maxDetailsIDInTable = (item.ID > maxDetailsIDInTable ? item.ID : maxDetailsIDInTable);
//                //debugger;
//                AppendRowtoTable("tblPreGateInDetails",
//                    ("<tr ID='" + item.ID + "'>"
//                        + "<td class=''> <button tag='" + item.ID + "' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class=' btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                        + "<td class='AccountID' val='" + item.AccountID + "'>" + "<select tag='" + item.AccountID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + item.SubAccountID + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                        + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "' style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                        + "<td class='Value' val='" + item.Value + "'>" + "<input tag='" + item.Value + "'  type='number' id='txtValue" + maxDetailsIDInTable + "' class='inputvalue input-sm  col-sm'>" + "</td>"
//                        + "</tr>"));


//                if (i == items.length - 1) {
//                    FillHTMLtblInputs("#tblPreGateInDetails > tbody");
//                    //if (i == items.length - 1) {
//                    //    var a = $('#tblPreGateInDetails > tbody > tr').length
//                    //    debugger;
//                    //    $.each($('#tblPreGateInDetails>tbody>tr'), function (j, tr) {
//                    //        try {
//                    //            var sl = $(tr).find('input[type=select]');
//                    //            console.log("sl" + sl.length)
//                    //            $.each($(tr).find('select'), function (i1, i_sl) {
//                    //                $(i_sl).val($(i_sl).attr('tag'));
//                    //            });
//                    //        } catch (ex1) { }
//                    //        //---------------------------------------------------------------------------------------------------------
//                    //        try {
//                    //            var nu = $(tr).find('input[type=number]');
//                    //            console.log("nu" + nu.length)
//                    //            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
//                    //                $(i_nu).val($(i_nu).attr('tag'));
//                    //            });
//                    //        } catch (ex2) { }
//                    //        //---------------------------------------------------------------------------------------------------------
//                    //        try {
//                    //            var txt = $(tr).find('input[type=text]');
//                    //            console.log("txt" + txt.length)
//                    //            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
//                    //                $(i_txt).val($(i_txt).attr('tag'));
//                    //            });
//                    //        } catch (ex3) { }
//                    //    });

//                    //*************************
//                    if (LoadAccounts) {
//                        LoadAll("api/PreGateIn/LoadAccounts", " where IsMain = '" + 0 + "' and ID NOT IN(select bfd.AccountID from PreGateInDetails bfd where bfd.BudgetFiscalID = " + pID + "   ) ", function (pitems) {
//                            var items = JSON.parse(pitems);
//                            $.each(items, function (i, item) {

//                                AppendRowtoTable("tblPreGateInDetails",
//                                    ("<tr ID='" + 0 + "'>"
//                                        + "<td class=''> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='  btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                                        + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + "0" + ");' style='width:100%;' class='controlStyle   selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                                        + "<td class='SubAccountID' val='" + "0" + "'>" + "<select tag='" + item.SubAccountID + "'id='slSubAccount" + maxDetailsIDInTable + "'  style='width:100%;' class='controlStyle  selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                                        + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
//                                        + "</tr>"));
//                            });


//                        });
//                    }
//                    //*************************




//                }

//            });

//        });
//    }
//    else {
//        ClearAllTableRows("tblPreGateInDetails");

//        FadePageCover(false);
//        if (LoadAccounts) {
//            LoadAll("api/PreGateIn/LoadAccounts", " where IsMain = '" + 0 + "' ", function (pitems) {
//                var items = JSON.parse(pitems);
//                $.each(items, function (i, item) {

//                    AppendRowtoTable("tblPreGateInDetails",
//                        ("<tr ID='" + 0 + "'>"
//                            + "<td class='hide'> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='hide btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                            + "<td class='AccountID' val='" + item.ID + "'>" + "<select tag='" + item.ID + "' id='slAccount" + maxDetailsIDInTable + "' onchange='Details_FillSlSubAccountInTable(this , \".SubAccountID\" ," + 0 + ");' style='width:100%;' class='controlStyle selectaccountID'>" + $('#hidden_slAccount').html() + "</select>" + "</td>"
//                            + "<td class='SubAccountID' val='" + "0" + "'>" + "<select  id='slSubAccount" + maxDetailsIDInTable + "'tag='0'  style='width:100%;' class='controlStyle selectsubaccount'>" + "<option value=0>" + TranslateString("SelectFromMenu") + "</option>" + "</select>" + "</td>"
//                            + "<td class='Value' val='" + "0" + "'>" + "<input tag='0'  type='number' class='inputvalue input-sm  col-sm'>" + "</td>"
//                            + "</tr>"));
//                });


//            });
//        }

//    }
//}

function PreGateInDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-Station").parent().addClass("active");
    ItemsRowsCounter = 0;
    count = 0;
    ClearAllTableRows("tblPreGateInDetails");
    $.each(JSON.parse(pItems), function (i, item) {
        
        debugger;
        var disable = "";
        if (item.IsApproved == true) {
            disable = "disabled = disabled";
        }

        AppendRowtoTable("tblPreGateInDetails",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'  Class='Row-" + (ItemsRowsCounter + 1) + "'>"

                + " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input " + disable +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button " + disable +" id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ContainerNumber' val='" + item.ContainerNumber + "'>" + "<input " + disable +" tag='" + item.ContainerNumber + "'   type='text' class='input_ContainerNumber input-sm  col-sm'>" + "</td>"
                //+ "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + "<input tag='" + item.ContainerID + "'   type='text' class='input_ContainerID input-sm  col-sm'>" + "</td>"
                + "<td class='PO' val='" + item.PO + "'>" + "<input " + disable +" tag='" + item.PO + "' type='text' class='inputPO input-sm  col-sm'>" + "</td>"

               + "<td class='ContainerID hide' val='" + item.ContainerID + "'>" + item.ContainerID + "</td>"
                + "<td class='PackageTypeIDOnContainer' val='" + item.PackageTypeIDOnContainer + "'>" + "<select " + disable +" id='PackageTypeIDOnContainer-" + (ItemsRowsCounter + 1) + "' tag='" + item.PackageTypeIDOnContainer + "'class='input-sm  col-sm selectPackageTypeIDOnContainer'>" + $('#hidden_slPackageTypeIDOnContainer').html() + "</select>" + "</td>"

                + "<td class='Quantity' val='" + item.Quantity + "'>" + "<input " + disable +" tag='" + item.Quantity + "' type='text' class='inputQuantity input-sm  col-sm'>" + "</td>"
                + "<td class='GrossWeightTON' val='" + item.GrossWeightTON + "'>" + "<input " + disable +" tag='" + item.GrossWeightTON + "' type='text' class='inputGrossWeightTON input-sm  col-sm'>" + "</td>"
                + "<td class='NetWeightTON' val='" + item.NetWeightTON + "'>" + "<input " + disable +" tag='" + item.NetWeightTON + "' type='text' class='inputNetWeightTON input-sm  col-sm'>" + "</td>"
                + "<td class='DescriptionOfGoods' val='" + item.DescriptionOfGoods + "'>" + "<input " + disable +" tag='" + item.DescriptionOfGoods + "' type='text' class='inputDescriptionOfGoods input-sm  col-sm'>" + "</td>"
                + "<td class='Driver' val='" + item.Driver + "'>" + "<input " + disable +" tag='" + item.Driver + "' type='text' class='inputDriver input-sm  col-sm'>" + "</td>"
                + "<td class='DriverNumber' val='" + item.DriverNumber + "'>" + "<input " + disable +" tag='" + item.DriverNumber + "' type='text' class='inputDriverNumber input-sm  col-sm'>" + "</td>"


                + "<td class='TruckNumber' val='" + item.TruckNumber + "'>" + "<input " + disable +" tag='" + item.TruckNumber + "' type='text' class='inputTruckNumber input-sm  col-sm'>" + "</td>"
                + "<td class='MixedPallet' val='" + item.ID + "'>" + "<select   id='MixedPallet-" + (count + 1) + "' tag='" + item.ID + "' class='input-sm  col-sm selectMixedPallet' >  <option value='false'>No</option> <option value='true'>Yes</option></select>" + "</td>"
                + "<td class='IsApproved hide'> <input id='cbIsApproved' type='checkbox' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"


                + "</tr>"));

        //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        count ++;
        //$("#tblPreGateInDetails").find("select").attr('onchange', 'CalculateTotalExpenses();');
        //$("#tblPreGateInDetails").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');
        $("#tblPreGateInDetails").find(".selectMixedPallet").attr('onchange', 'AddinsertAfter(this);');
       // $("#tblPreGateInDetails").find("select").attr('onchange', 'AddinsertAfter(this);');


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
var _cl = "";
var CI = 10;
var count=0
function AddinsertAfter(ItemSelect) {
    debugger;
    var tr = null;
    if ($(ItemSelect).is('tr'))
        tr = ItemSelect;
    else
        tr = $(ItemSelect).closest('tr');




    var ContainerID = $(tr).find("td.ContainerID").text()
    var PackageTypeIDOnContainer = $(tr).find('td.PackageTypeIDOnContainer  select').find('option:selected').val()
    var qty = $(tr).find('td.Quantity input[type="text"]').val()
    var ContainerNumber = $(tr).find('td.ContainerNumber input[type="text"]').val()
    var GrossWeightTON = $(tr).find('td.GrossWeightTON input[type="text"]').val()
    var NetWeightTON = $(tr).find('td.NetWeightTON input[type="text"]').val()
    var DescriptionOfGoods = $(tr).find('td.DescriptionOfGoods input[type="text"]').val()
    var Driver = $(tr).find('td.Driver input[type="text"]').val()
    var DriverNumber = $(tr).find('td.DriverNumber input[type="text"]').val()
    var PO = $(tr).find('td.PO input[type="text"]').val()


    var TruckNumber = $(tr).find('td.TruckNumber input[type="text"]').val()









    var cl = $(ItemSelect).closest('tr').attr('class');
    _cl = cl + CI;

    $("<tr class='" + cl + CI + "'>" + $('.' + cl).html()).insertAfter("." + cl);
    //$("<tr class='" + cl + CI + "'>" + $('.' + cl).html() + "<tr/>").insertAfter("." + cl);
    var tr = $('#tblPreGateInDetails > tbody > tr.' + _cl);



    $(tr).find('td.ContainerNumber').find('.input_ContainerNumber').val(ContainerNumber);
    $(tr).find('td.ContainerID').val(ContainerID);
    $(tr).find('td.PackageTypeIDOnContainer').find('.selectPackageTypeIDOnContainer').val(PackageTypeIDOnContainer);
    $(tr).find('td.Quantity').find('.inputQuantity').val(qty);
    $(tr).find('td.GrossWeightTON').find('.inputGrossWeightTON').val(GrossWeightTON);
    $(tr).find('td.NetWeightTON').find('.inputNetWeightTON').val(NetWeightTON);
    $(tr).find('td.DescriptionOfGoods').find('.inputDescriptionOfGoods').val(DescriptionOfGoods);
    $(tr).find('td.Driver').find('.inputDriver').val(Driver);
    $(tr).find('td.DriverNumber').find('.inputDriverNumber').val(DriverNumber);
    $(tr).find('td.PO').find('.inputPO').val(PO);


    $(tr).find('td.TruckNumber').find('.inputTruckNumber').val(TruckNumber);
    $(tr).find('td.counter').val((count + 1));





   // FillinsertAfter(ItemSelect);

    var tr = $('#tblPreGateInDetails > tbody > tr.' + cl);


    //$(tr).find(".selectMixedPallet").attr('onchange', 'CalculateAll (this);');


}
function FillItemsData() {
    $($('#tblPreGateInDetails > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ContainerNumber ').find('.input_ContainerNumber').val($(tr).find('td.ContainerNumber').find('.input_ContainerNumber').attr('tag'));
        $(tr).find('td.PackageTypeIDOnContainer').find('.selectPackageTypeIDOnContainer').val($(tr).find('td.PackageTypeIDOnContainer ').find('.selectPackageTypeIDOnContainer').attr('tag'));
        $(tr).find('td.Quantity ').find('.inputQuantity').val($(tr).find('td.Quantity').find('.inputQuantity').attr('tag'));
        $(tr).find('td.GrossWeightTON ').find('.inputGrossWeightTON').val($(tr).find('td.GrossWeightTON').find('.inputGrossWeightTON').attr('tag'));
        $(tr).find('td.NetWeightTON ').find('.inputNetWeightTON').val($(tr).find('td.NetWeightTON').find('.inputNetWeightTON').attr('tag'));
        $(tr).find('td.DescriptionOfGoods ').find('.inputDescriptionOfGoods').val($(tr).find('td.DescriptionOfGoods').find('.inputDescriptionOfGoods').attr('tag'));
        $(tr).find('td.Driver ').find('.inputDriver').val($(tr).find('td.Driver').find('.inputDriver').attr('tag'));
        $(tr).find('td.DriverNumber ').find('.inputDriverNumber').val($(tr).find('td.inputDriverNumber').find('.inputDriver').attr('tag'));
        $(tr).find('td.PO').find('.inputPO').val($(tr).find('td.PO').find('.inputPO').attr('tag'));


        $(tr).find('td.TruckNumber ').find('.inputTruckNumber').val($(tr).find('td.TruckNumber').find('.inputTruckNumber').attr('tag'));


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
                $("#tblPreGateInDetails > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                //GetAllSelectedIDs(ID);
                //CalculateTotalExpenses();
                // CalculateAll();
            });

    }

}
//---------------------------------------------------------------------------------

function LoadPreGateInDetails() {
    debugger;
    //$.getJSON("/api/PreGateIn/LoadAccounts", { pWhereClause: "where OperationID = " + $('#slOperation').val() }, function (Result) {
    //    if (Result.length > 0) {
    //        PreGateInDetails_BindTableRows(Result[0]);
    //    }
    //});
    //$.ajax({
    //    type: "Get",
    //    url: "/api/PreGateIn/LoadAccounts",
    //    data: { pWhereClause: "where OperationID = " + $('#slOperation').val() },
    //    dataType: "json",
    //    success: function (r) {
    //        // $(tr).find('.QuantityInStore').html();
    //        PreGateInDetails_BindTableRows(r[0]);
    //        //span_quantity
    //    }
    //});
    LoadAll("api/PreGateIn/LoadPreGateInDetails", "where OperationID = " + $('#slOperation').val(), function (pTabelRows) {
        PreGateInDetails_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);
        if (pTabelRows != '[]') {
            $("#slCustomerID").val(JSON.parse(pTabelRows)[0].ConsigneeID);
            $("#slCustomerID").trigger("change");
        }
       

        setTimeout(function () {
            //CalculateAll();
            //SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        }, 300);

    });
}