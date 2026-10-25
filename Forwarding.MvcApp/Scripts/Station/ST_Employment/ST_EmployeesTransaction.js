$(document).ready(function () {
    $("#slCustomerID").css({ "width": "100%" }).select2();

    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter
// City Country ---------------------------------------------------------------
// Bind ST_EmployeesTransaction Table Rows
var maxDetailsIDInTable = 0; //used to for when adding new row then make td control names unique

function ST_EmployeesTransaction_BindTableRows(pST_EmployeesTransaction) {
    debugger;
    $("#hl-menu-Station").parent().addClass("active");
    ClearAllTableRows("tblST_EmployeesTransaction");
    $.each(pST_EmployeesTransaction, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblST_EmployeesTransaction",
            ("<tr ID='" + item.ID + "' ondblclick='ST_EmployeesTransaction_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='Date' >" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.Date)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.Date))) + "</td>"
                + "<td class='hST_EmployeesTransaction'><a href='#ST_EmployeesTransactionModal' data-toggle='modal' onclick='ST_EmployeesTransaction_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblST_EmployeesTransaction", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblST_EmployeesTransaction>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function ST_EmployeesTransaction_EditByDblClick(pID) {
    jQuery("#ST_EmployeesTransactionModal").modal("show");
    ST_EmployeesTransaction_FillControls(pID);
}
// Loading with data
function ST_EmployeesTransaction_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ST_EmployeesTransaction/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ST_EmployeesTransaction_BindTableRows(pTabelRows); ST_EmployeesTransaction_ClearAllControls(); });
    HighlightText("#tblST_EmployeesTransaction>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";
var Isvalidated = true;

function ST_EmployeesTransaction_Insert(pSaveandAddNew) {
    debugger;
    Isvalidated = true;

    $('#tblST_EmployeesTransactionDetails>tbody>tr').each(function (i, tr) {
        
        var AccountID = $(tr).find('.selectCartoonID').val();
        var isOut = $(tr).find('#cbisisOut').is(":checked")
        if ((AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null) && isOut==true) {
            swal('Sorry', 'You Must Fill All Details Data', 'warning');
            Isvalidated = false;
            // break;
        }

        debugger;

        var EmpID = $(tr).find('td.EmployeeID').attr('val');
        ///Duplicate
        $('#tblST_EmployeesTransactionDetails>tbody>tr').each(function (g, ts) {
            var NewEmpID = $(ts).find('td.EmployeeID').attr('val');
            if (EmpID == NewEmpID && i != g) {
                var EmployeeName = $(ts).find('td.EmployeeName').attr('val');
                swal('Sorry', 'Emp duplicate ' + EmployeeName , 'warning');
                Isvalidated = false;
            }
            
           


        });

    });

    if (Isvalidated) {
        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/ST_EmployeesTransaction/Insert", {
            pCode: $('#txtCode').val(),
            pDate: $('#txtDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtDate').val())
        }, pSaveandAddNew, null, '#hID', function () {
            ST_EmployeesTransaction_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/ST_EmployeesTransaction/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "ST_EmployeesTransactionModal", function () {
                    setTimeout(function () {
                        ST_EmployeesTransaction_LoadingWithPaging();
                        ArrDeleted = [];
                          IntializeData();
                        ClearAllTableRows('tblST_EmployeesTransactionDetails');
                    }, 300);

                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });
    }


}



function ST_EmployeesTransaction_Update(pSaveandAddNew) {
    Isvalidated = true;
    debugger;
    $('#tblST_EmployeesTransactionDetails>tbody>tr').each(function (i, tr) {

        var AccountID = $(tr).find('.selectCartoonID').val();
        var isOut = $(tr).find('#cbisisOut').is(":checked")
       if ((AccountID.trim() == "" || AccountID.trim() == "0" || AccountID == null) && isOut == true) {

            swal('Sorry', 'You Must Fill All Details Data', 'warning');
            Isvalidated = false;
            // break;
        }

        var EmpID = $(tr).find('td.EmployeeID').attr('val');
        ///Duplicate
        $('#tblST_EmployeesTransactionDetails>tbody>tr').each(function (g, ts) {
            var NewEmpID = $(ts).find('td.EmployeeID').attr('val');
            if (EmpID == NewEmpID && i != g) {
                var EmployeeName = $(ts).find('td.EmployeeName').attr('val');
                swal('Sorry', 'Emp duplicate ' + EmployeeName, 'warning');
                Isvalidated = false;
            }




        });
    });

    if (Isvalidated) {
        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/ST_EmployeesTransaction/Insert", {
            pID: $('#hID').val(),
            pCode: $('#txtCode').val(),
            pDate: $('#txtDate').val() == '' ? '1900-1-1' : ConvertDateFormat($('#txtDate').val())
        }, pSaveandAddNew, null, '#hID', function () {
            ST_EmployeesTransaction_LoadingWithPaging();
            //------------------------------------- ----------- -  - - - - -- - - - - -
            InsertUpdateListOfObject("/api/ST_EmployeesTransaction/InsertItems",
                SetArrayOfItems()
                , pSaveandAddNew, "ST_EmployeesTransactionModal", function () {
                    setTimeout(function () {
                        ST_EmployeesTransaction_LoadingWithPaging();
                        ArrDeleted = [];
                          IntializeData();
                        ClearAllTableRows('tblST_EmployeesTransactionDetails');
                    }, 300);

                });
            //------------------------------------- ----------- -  - - - - -- - - - - -
        });
    }


}


function IntializeData() {
    ItemsRowsCounter = 0;
    //FadePageCover(true);
    //$.ajax({
    //    type: "GET",
    //    url: strServerURL + "api/ST_EmployeesTransaction/IntializeData",
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




function ST_EmployeesTransaction_Delete(pID) {
    DeleteListFunction("/api/ST_EmployeesTransaction/DeleteByID", { "pID": pID, "type": "1" }, function () { ST_EmployeesTransaction_LoadingWithPaging(); });
}

function ST_EmployeesTransaction_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblST_EmployeesTransaction') != "")
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
                DeleteListFunction("/api/ST_EmployeesTransaction/Delete", { "pST_EmployeesTransactionIDs": GetAllSelectedIDsAsString('tblST_EmployeesTransaction') }, function () { ST_EmployeesTransaction_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/ST_EmployeesTransaction/Delete", { "pST_EmployeesTransactionIDs": GetAllSelectedIDsAsString('tblST_EmployeesTransaction') }, function () { ST_EmployeesTransaction_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function ST_EmployeesTransaction_FillControls(pID) {
    debugger;
    ClearAll("#ST_EmployeesTransactionModal", null);
    ClearAllTableRows("tblST_EmployeesTransactionDetails");

    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#slBudgetID").val($(tr).find("td.BudgetID").attr('val'));
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtDate").val($(tr).find("td.Date").text());
    
    // Fill_SelectInput_WithDependedID("api/ST_EmployeesTransaction/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);

    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "ST_EmployeesTransaction_Update(false);");
    $("#btnSaveandNew").attr("onclick", "ST_EmployeesTransaction_Update(true);");
}
function LoadInvoiceDetails(type) {
    debugger;
    if (type == 1) {
        var pWhereClause = " WHERE 1=1";
        if ($("#slCustomerID").val() == "" || $("#slCustomerID").val() =="0") {
            swal('Sorry', 'You Must Select Employee', 'warning');
        }
        else {
            if ($("#slcategory").val() != 1) {
                pWhereClause += " and category=" + $("#slcategory").val();
            }
            if ($("#slShift").val() != 1) {
                pWhereClause += " and shiftEmp=" + $("#slShift").val();
            }
            if ($("#slCustomerID").val() != 1) {
                pWhereClause += " and EmployeeID=" + $("#slCustomerID").val();
            }
            
            $.ajax({
                type: "Get",
                url: "/api/ST_EmployeesTransaction/LoadST_EmployeesTransactionDetails",
                data: { pWhereClause: pWhereClause, pType: 1 },
                dataType: "json",
                success: function (r) {
                    // $(tr).find('.QuantityInStore').html();
                    ST_EmployeesTransactionDetails_Add(r[1]);
                    setTimeout(function () {
                        //CalculateAll();
                        // SL_HideShowEditBtns(_IsApproved, _HasTransactions);
                    }, 300);
                }
            });
        }
     


    }
    else {
        $.ajax({
            type: "Get",
            url: "/api/ST_EmployeesTransaction/LoadST_EmployeesTransactionDetails",
            data: { pWhereClause: "where EmployeesTransactionID=" + $('#hID').val() , pType: 0 },
            dataType: "json",
            success: function (r) {
                // $(tr).find('.QuantityInStore').html();
                ST_EmployeesTransactionDetails_BindTableRows(r[0]);
                setTimeout(function () {
                    //CalculateAll();
                    // SL_HideShowEditBtns(_IsApproved, _HasTransactions);
                }, 300);
            }
        });
        //LoadAll("/api/ST_EmployeesTransaction/LoadST_EmployeesTransactionDetails", "where EmployeesTransactionID = " + $('#hID').val(), function (pTabelRows) {
        //    ST_EmployeesTransactionDetails_BindTableRows(pTabelRows[0]);

        //    setTimeout(function () {
        //        //CalculateAll();
        //        // SL_HideShowEditBtns(_IsApproved, _HasTransactions);
        //    }, 300);

        //});
    }

}

function ST_EmployeesTransaction_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#ST_EmployeesTransactionModal", null);
    ClearAllTableRows("tblST_EmployeesTransactionDetails");
    $('#slCustomerID').val("0");
    $("#slCustomerID").trigger("change");
    //  ArrDeleted = [];
    var pFormattedTodaysDate = getTodaysDateInddMMyyyyFormat();
    $('#txtDate').val(pFormattedTodaysDate);
    // $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "ST_EmployeesTransaction_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ST_EmployeesTransaction_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
    $("#hID").val("0");
    ItemsRowsCounter = 0;

}





//---------------------------------------------------------------------------------



var RowsCounter = 0;
var ArrDeleted = [];
function ST_EmployeesTransaction_AddDetails() {
    ++maxDetailsIDInTable;
    AppendRowtoTable("tblST_EmployeesTransactionDetails",
        ("<tr ID='" + 0 + "'>"
            + "<td> <button tag='0' id='btn-DeleteDetails' type='button' onclick='DeleteDetails(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + 0 + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='EmployeeID' val='" + "0" + "'>" + "<select id='slEmployee" + maxDetailsIDInTable + "'  tag='0'  style='width:100%;' class='controlStyle selectEmployee'>" + $('#slEmployee').html() + "</select>" + "</td>"
            + "<td class='NetSalary ' val='" + "0" + "'>" + "<input   id='txtNetSalary" + (maxDetailsIDInTable + 1) + "' type='text'  onchange='CalculateTotal();'  class='input_NetSalary input-sm  col-sm'>" + "</td>"
            + "<td class='advances ' val='" + "0" + "'>" + "<input   id='txtadvances" + (maxDetailsIDInTable + 1) + "' type='text'  onchange='CalculateTotal();'  class='input_advances input-sm  col-sm'>" + "</td>"

            + "<td class='Discount ' val='" + "0" + "'>" + "<input   id='txtDiscount" + (maxDetailsIDInTable + 1) + "' type='text'  onchange='CalculateTotal();'  class='input_Discount input-sm  col-sm'>" + "</td>"
            + "<td class='Extra ' val='" + "0" + "'>" + "<input   id='txtExtra" + (maxDetailsIDInTable + 1) + "' type='text'  onchange='CalculateTotal();'  class='input_Extra input-sm  col-sm'>" + "</td>"
            + "<td class='Salary ' val='" + "0" + "'>" + "<input   id='txtSalary" + (maxDetailsIDInTable + 1) + "' type='text' disabled='disabled' onchange='CalculateTotal();'  class='input_Salary input-sm  col-sm'>" + "</td>"


            + "</tr>"));
}

function ST_EmployeesTransactionDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-Station").parent().addClass("active");
    //ItemsRowsCounter = 0;
    ClearAllTableRows("tblST_EmployeesTransactionDetails");
    $.each(JSON.parse(pItems), function (i, item) {

       // debugger;
        AppendRowtoTable("tblST_EmployeesTransactionDetails",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                + " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='EmployeeName' val='" + item.EmployeeName + "'>" + item.EmployeeName + "</td>"
                + "<td class='EmployeeID hide' val='" + item.EmployeeID + "'>" + item.EmployeeID + "</td>"

                + "<td class='CartoonID' val='" + item.CartoonID + "'>" + "<select id='slCartoonID-" + (ItemsRowsCounter + 1) + "' tag='" + item.CartoonID + "'onchange='GetOriginAverage(this);CalculateTotal(this);' class='input-sm  col-sm selectCartoonID'>" + $('#slCartoonID').html() + "</select>" + "</td>"

                + "<td class='Average ' val='" + item.Average + "'>" + "<input tag='" + item.Average + "'   onchange='CalculateTotal(this)'  type='text'   class='input_Average input-sm  col-sm'>" + "</td>"
                + "<td class='ActualAverage ' val='" + item.ActualAverage + "'>" + "<input tag='" + item.ActualAverage + "'   onchange='CalculateTotal(this)'  type='text'  class='input_ActualAverage input-sm  col-sm'>" + "</td>"
                + "<td class='Discount ' val='" + item.Discount + "'>" + "<input tag='" + item.Discount + "'   onchange=''  type='text'  disabled='disabled' class='input_Discount input-sm  col-sm'>" + "</td>"
                + "<td class='Extra ' val='" + item.Extra + "'>" + "<input tag='" + item.Extra + "'   onchange=''  type='text'  disabled='disabled' class='input_Extra input-sm  col-sm'>" + "</td>"
                + "<td class='advances ' val='" + item.advances + "'>" + "<input tag='" + item.advances + "'   onchange=''  type='text'  class='input_advances input-sm  col-sm'>" + "</td>"
                + "<td class='Addd' val='" + item.Addd + "'>" + "<input tag='" + item.Addd + "'   onchange=''  type='text'  class='input_Addd input-sm  col-sm'>" + "</td>"
                + "<td class='Disc' val='" + item.Disc + "'>" + "<input tag='" + item.Disc + "'   onchange=''  type='text'  class='input_Disc input-sm  col-sm'>" + "</td>"


                + "<td class='DiscountReason ' val='" + item.DiscountReason + "'>" + "<input tag='" + item.DiscountReason + "'   onchange=''  type='text' class='input_DiscountReason input-sm  col-sm'>" + "</td>"

                + "<td class='isOut'> <input id='cbisisOut' type='checkbox' val='" + (item.isOut == true ? "true' checked='checked'" : "'") + " /></td>"


                + "</tr>"));

        $('#tblST_EmployeesTransactionDetails > tbody > tr').find('td.NetSalary > input ,td.Extra > input ,td.Discount > input , td.advances > input , td.Discount > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        $("#tblPreGateInDetails").find("select").attr('onchange', 'GetOriginAverage();CalculateTotal();');
        $("#tblPreGateInDetails").find("input,button,textarea").attr('onblur', 'CalculateTotal();');

    });
    //ApplyPermissions();



    setTimeout(function () {
        FillItemsData();
        //  SL_HideShowEditBtns(_IsApproved);
    }, 300);
}
var ItemsRowsCounter = 0
function ST_EmployeesTransactionDetails_Add(pItems) {
    debugger;
    $("#hl-menu-Station").parent().addClass("active");
    // ItemsRowsCounter = 0;
    //ClearAllTableRows("tblST_EmployeesTransactionDetails");
    var tr = "";
    tr += "<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + (JSON.parse(pItems)[0].ID )+ "'>"
        tr += " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
    tr += "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + (JSON.parse(pItems)[0].ID) + "' /></td>"
    tr += "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (JSON.parse(pItems)[0].ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
    tr += "<td class='EmployeeName' val='" + (JSON.parse(pItems)[0].EmployeeName) + "'>" + (JSON.parse(pItems)[0].EmployeeName) + "</td>"
    tr += "<td class='EmployeeID hide' val='" + (JSON.parse(pItems)[0].EmployeeID) + "'>" + (JSON.parse(pItems)[0].EmployeeID) + "</td>"
    tr += "<td class='CartoonID' val='" + (JSON.parse(pItems)[0].CartoonID) + "'>" + "<select id='slCartoonID-" + (ItemsRowsCounter + 1) + "' tag='" + (JSON.parse(pItems)[0].CartoonID) + "'onchange='GetOriginAverage(this);CalculateTotal(this);' class='input-sm  col-sm selectCartoonID'>" + $('#slCartoonID').html() + "</select>" + "</td>"
    tr += "<td class='Average ' val='" + (JSON.parse(pItems)[0].Average) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].Average) + "'   onchange='CalculateTotal(this)'  type='text'   class='input_Average input-sm  col-sm'>" + "</td>"
    tr += "<td class='ActualAverage ' val='" + (JSON.parse(pItems)[0].ActualAverage) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].ActualAverage) + "'   onchange='CalculateTotal(this)'  type='text'  class='input_ActualAverage input-sm  col-sm'>" + "</td>"
        tr += "<td class='Discount ' val='" + (JSON.parse(pItems)[0].Discount) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].Discount) + "'   onchange=''  type='text'  disabled='disabled' class='input_Discount input-sm  col-sm'>" + "</td>"
        tr += "<td class='Extra ' val='" + (JSON.parse(pItems)[0].Extra) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].Extra) + "'   onchange=''  type='text'  disabled='disabled' class='input_Extra input-sm  col-sm'>" + "</td>"
        tr += "<td class='advances ' val='" + (JSON.parse(pItems)[0].advances) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].advances) + "'   onchange=''  type='text'  class='input_advances input-sm  col-sm'>" + "</td>"
        tr += "<td class='Addd' val='" + (JSON.parse(pItems)[0].Addd) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].Addd) + "'   onchange=''  type='text'  class='input_Addd input-sm  col-sm'>" + "</td>"
    tr += "<td class='Disc' val='" + (JSON.parse(pItems)[0].Disc) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].Disc) + "'   onchange=''  type='text'  class='input_Disc input-sm  col-sm'>" + "</td>"


    tr += "<td class='DiscountReason ' val='" + (JSON.parse(pItems)[0].DiscountReason) + "'>" + "<input tag='" + (JSON.parse(pItems)[0].DiscountReason) + "'   onchange=''  type='text' class='input_DiscountReason input-sm  col-sm'>" + "</td>"

    tr += "<td class='isOut'> <input id='cbisisOut' type='checkbox' val='" + ((JSON.parse(pItems)[0].isOut) == true ? "true' checked='checked'" : "'") + " /></td>"


    tr += "</tr>";

    $('#tblST_EmployeesTransactionDetails > tbody > tr').find('td.NetSalary > input ,td.Extra > input ,td.Discount > input , td.advances > input , td.Discount > input').inputmask('decimal', { digits: 2 });
    ItemsRowsCounter++;
    //$("#tblPreGateInDetails").find("select").attr('onchange', 'GetOriginAverage();CalculateTotal();');
    //$("#tblPreGateInDetails").find("input,button,textarea").attr('onblur', 'CalculateTotal();');
    $("#tblST_EmployeesTransactionDetails tbody").prepend(tr);
    ItemsRowsCounter++;


    //$.each(JSON.parse(pItems), function (i, item) {

    //    // debugger;
    //    AppendRowtoTable("tblST_EmployeesTransactionDetails",
    //        ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
    //            + " <td class='btn-lightblue hide' style='font-size:15px;'> S </td>"
    //            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
    //            + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
    //            + "<td class='EmployeeName' val='" + item.EmployeeName + "'>" + item.EmployeeName + "</td>"
    //            + "<td class='EmployeeID hide' val='" + item.EmployeeID + "'>" + item.EmployeeID + "</td>"

    //            + "<td class='CartoonID' val='" + item.CartoonID + "'>" + "<select id='slCartoonID-" + (ItemsRowsCounter + 1) + "' tag='" + item.CartoonID + "'onchange='GetOriginAverage(this);CalculateTotal(this);' class='input-sm  col-sm selectCartoonID'>" + $('#slCartoonID').html() + "</select>" + "</td>"

    //            + "<td class='Average ' val='" + item.Average + "'>" + "<input tag='" + item.Average + "'   onchange='CalculateTotal(this)'  type='text'   class='input_Average input-sm  col-sm'>" + "</td>"
    //            + "<td class='ActualAverage ' val='" + item.ActualAverage + "'>" + "<input tag='" + item.ActualAverage + "'   onchange='CalculateTotal(this)'  type='text'  class='input_ActualAverage input-sm  col-sm'>" + "</td>"
    //            + "<td class='Discount ' val='" + item.Discount + "'>" + "<input tag='" + item.Discount + "'   onchange=''  type='text'  disabled='disabled' class='input_Discount input-sm  col-sm'>" + "</td>"
    //            + "<td class='Extra ' val='" + item.Extra + "'>" + "<input tag='" + item.Extra + "'   onchange=''  type='text'  disabled='disabled' class='input_Extra input-sm  col-sm'>" + "</td>"
    //            + "<td class='advances ' val='" + item.advances + "'>" + "<input tag='" + item.advances + "'   onchange=''  type='text'  class='input_advances input-sm  col-sm'>" + "</td>"
    //            + "<td class='Addd' val='" + item.Addd + "'>" + "<input tag='" + item.Addd + "'   onchange=''  type='text'  class='input_Addd input-sm  col-sm'>" + "</td>"
    //            + "<td class='Disc' val='" + item.Disc + "'>" + "<input tag='" + item.Disc + "'   onchange=''  type='text'  class='input_Disc input-sm  col-sm'>" + "</td>"


    //            + "<td class='DiscountReason ' val='" + item.DiscountReason + "'>" + "<input tag='" + item.DiscountReason + "'   onchange=''  type='text' class='input_DiscountReason input-sm  col-sm'>" + "</td>"

    //            + "<td class='isOut'> <input id='cbisisOut' type='checkbox' val='" + (item.isOut == true ? "true' checked='checked'" : "'") + " /></td>"


    //            + "</tr>"));

    //    $('#tblST_EmployeesTransactionDetails > tbody > tr').find('td.NetSalary > input ,td.Extra > input ,td.Discount > input , td.advances > input , td.Discount > input').inputmask('decimal', { digits: 2 });
    //    ItemsRowsCounter++;
    //    $("#tblPreGateInDetails").find("select").attr('onchange', 'GetOriginAverage();CalculateTotal();');
    //    $("#tblPreGateInDetails").find("input,button,textarea").attr('onblur', 'CalculateTotal();');

    //});
    //ApplyPermissions();



    //setTimeout(function () {
    //    FillItemsData();
    //    //  SL_HideShowEditBtns(_IsApproved);
    //}, 300);
}

function DeleteItems(RowNumber, ID) {
    debugger;
    if ($("#tblST_EmployeesTransactionDetails > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
        $("#tblST_EmployeesTransactionDetails > tbody > tr[counter='" + RowNumber + "']").remove();
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
                $("#tblST_EmployeesTransactionDetails > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;

                //GetAllSelectedIDs(ID);
                //CalculateTotalExpenses();
                // CalculateAll();
            });

    }

}

function FillItemsData() {
    $($('#tblST_EmployeesTransactionDetails > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.CartoonID').find('.selectCartoonID').val($(tr).find('td.CartoonID').find('.selectCartoonID').attr('tag'));
        $(tr).find('td.Average').find('.input_Average').val($(tr).find('td.Average').find('.input_Average').attr('tag'));
        $(tr).find('td.ActualAverage').find('.input_ActualAverage').val($(tr).find('td.ActualAverage').find('.input_ActualAverage').attr('tag'));
        $(tr).find('td.advances').find('.input_advances').val($(tr).find('td.advances').find('.input_advances').attr('tag'));
        $(tr).find('td.Addd').find('.input_Addd').val($(tr).find('td.Addd').find('.input_Addd').attr('tag'));
        $(tr).find('td.Disc').find('.input_Disc').val($(tr).find('td.Disc').find('.input_Disc').attr('tag'));

        $(tr).find('td.Discount').find('.input_Discount').val($(tr).find('td.Discount').find('.input_Discount').attr('tag'));
        $(tr).find('td.DiscountReason').find('.input_DiscountReason').val($(tr).find('td.DiscountReason').find('.input_DiscountReason').attr('tag'));

        $(tr).find('td.Extra').find('.input_Extra').val($(tr).find('td.Extra').find('.input_Extra').attr('tag'));

    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function GetOriginAverage(ITEM) {
    debugger;
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(ITEM).closest('tr');
    var average = 0;
    var ItemID = 0;
    average = $(tr).find('td.CartoonID  select').find('option:selected').attr('average') == undefined ? 0 : $(tr).find('td.CartoonID  select').find('option:selected').attr('average') * 1;

    $(tr).find('td.Average input[type="text"]').val(average);

}

function CalculateTotal(ITEM) {
    debugger
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(ITEM).closest('tr');


    _TotalExpenses = 0.00;
    _TotalVat = 0.00;

    var ItemTax = 0;
    var TaxRatio = 0;
    var Average = 0;
    var ActualAverage = 0;
    var Diff = 0;
    var Extra = 0;
    var Total = 0;

    Average = $(tr).find('td.Average input[type="text"]').val() * 1;
    ActualAverage = $(tr).find('td.ActualAverage input[type="text"]').val() * 1;

    if (ActualAverage > Average) {
        Diff = ActualAverage - Average;
        Total = ($(tr).find('td.CartoonID  select').find('option:selected').attr('Amount') * 1) * Diff
        //Total = ($(tr).find('td.Average  input[type="text"]').val() * 1) * Diff

        $(tr).find('td.Extra  input[type="text"]').val(Total);
        $(tr).find('td.Discount  input[type="text"]').val("0");

    }
    else if (ActualAverage < Average) {
        Diff = Average - ActualAverage;
        Total = ($(tr).find('td.CartoonID  select').find('option:selected').attr('Amount') * 1) * Diff
        //Total = ($(tr).find('td.Average  input[type="text"]').val() * 1) * Diff

        $(tr).find('td.Extra  input[type="text"]').val("0");
        $(tr).find('td.Discount  input[type="text"]').val(Total);

    }
    else {
        $(tr).find('td.Extra  input[type="text"]').val("0");
        $(tr).find('td.Discount  input[type="text"]').val("0");
    }


    /////////////////////////////////////////////////

    //$($('#tblST_EmployeesTransactionDetails > tbody > tr')).each(function (i, tr) {

    //    debugger;
    //    Average = $(tr).find('td.Average').find('.input_Average').val() * 1;
    //    ActualAverage = $(tr).find('td.ActualAverage').find('.input_ActualAverage').val() * 1;

    //    if (ActualAverage > Average) {
    //        Diff = ActualAverage - Average;
    //        Total = ($(tr).find('td.CartoonID  select').find('option:selected').attr('Amount') * 1) * Diff
    //        $(tr).find('td.Extra  input[type="text"]').val(Total);
    //        $(tr).find('td.Discount  input[type="text"]').val("0");

    //    }
    //    else if (ActualAverage < Average) {
    //        Diff = Average - ActualAverage;
    //        Total = ($(tr).find('td.CartoonID  select').find('option:selected').attr('Amount') * 1) * Diff
    //        $(tr).find('td.Extra  input[type="text"]').val("0");
    //        $(tr).find('td.Discount  input[type="text"]').val(Total);

    //    }
    //    else {
    //        $(tr).find('td.Extra  input[type="text"]').val("0");
    //        $(tr).find('td.Discount  input[type="text"]').val("0");
    //    }



     


    //});

   // $('#lblNetPriceValue').text(parseFloat(_TotalExpenses).toFixed(2));
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

    $("#tblST_EmployeesTransactionDetails>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = 0;
        objItem.EmployeesTransactionID = $('#hID').val();
        //  objItem.AccountID = $(tr).find('td.AccountID').attr('val');
        objItem.EmployeeID = $(tr).find('td.EmployeeID').attr('val');
        objItem.CartoonID = $(tr).find('td.CartoonID').find('.selectCartoonID').val();
        objItem.Average = $(tr).find('td.Average').find('.input_Average').val() == "" ? "0" : $(tr).find('td.Average').find('.input_Average').val();
        objItem.ActualAverage = $(tr).find('td.ActualAverage').find('.input_ActualAverage').val() == "" ? "0" : $(tr).find('td.ActualAverage').find('.input_ActualAverage').val();

        objItem.advances = $(tr).find('td.advances').find('.input_advances').val() == "" ? "0" : $(tr).find('td.advances').find('.input_advances').val();
        objItem.Addd = $(tr).find('td.Addd').find('.input_Addd').val() == "" ? "0" : $(tr).find('td.Addd').find('.input_Addd').val();
        objItem.Disc = $(tr).find('td.Disc').find('.input_Disc').val() == "" ? "0" : $(tr).find('td.Disc').find('.input_Disc').val();

        objItem.Discount = $(tr).find('td.Discount').find('.input_Discount').val() == "" ? "0" : $(tr).find('td.Discount').find('.input_Discount').val();
        objItem.DiscountReason = $(tr).find('td.DiscountReason').find('.input_DiscountReason').val() == "" ? "0" : $(tr).find('td.DiscountReason').find('.input_DiscountReason').val();

        objItem.Extra = $(tr).find('td.Extra').find('.input_Extra').val() == "" ? "0" : $(tr).find('td.Extra').find('.input_Extra').val();
        objItem.isOut = $(tr).find('#cbisisOut').is(":checked");

        
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