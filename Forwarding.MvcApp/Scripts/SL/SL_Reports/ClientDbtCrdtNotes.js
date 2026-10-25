var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00;
var _TotalExpenses = 0.00;
var _TotalTaxes = 0.00;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
//#region Public
function SL_HideShowEditBtns(IsApproved , HasTransactions)
{
    debugger;
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;
    if (IsApproved == true || HasTransactions == true ) {
        $('.Edit-btn').addClass('hide');
        $('.Edit-input').prop('disabled', true);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', true);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', true);
        $("#tblWasataDetails").find("input,button,textarea,select").prop('disabled', true);
    }
    else {
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
        $("#tblExpenses").find("input,button,textarea,select").prop('disabled', false);
        $("#tblTaxes").find("input,button,textarea,select").prop('disabled', false);
        $("#tblWasataDetails").find("input,button,textarea,select").prop('disabled', false);

    }
}

function RecalculateExchangeRate()
{
    var currencyid =  $('#slCurrencyID').val();
    $.ajax({
        type: "GET",
        url: strServerURL + "api/SL_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtInvoiceDate').val()), pID: ($('#hID').val() == "" ? null : $('#hID').val()  )},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
            CalculateTotalExpenses();
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}

function IntializeData()
{
    debugger;
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    WasataDetailsRowsCounter = 0;

    _IsApproved = false;
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');
    $('#tblExpenses > tbody').html('');
    $('#tblTaxes > tbody').html('');
    $('#tblWasataDetails > tbody').html('');

    $('#txtInvoiceDate').val(getTodaysDateInddMMyyyyFormat());
    $("#hID").val("");
    $('#txtInvoiceNo').val("Auto");
    $('#slClientID').val("0");
    $('#txtDiscount').val("0");
    $('#slDiscountType').val('10');
    $('#cbDiscountBeforeTax').prop('checked', false);
    $('#lblDiscountValue').text("0.00");
    $('#lblDiscountPercentage').text("0.00");
    $('#lblNetPriceValue').text("0.00");
    $('#lblPriceValue').text("0.00");
    $('#lblLocalPriceValue').text("0.00");
    $('#lblTotalItems').text("0.00");
    $('#lblTotalExpenses').text("0.00"); 
    $('#lblTotalTaxes').text("0.00");
    $('#lblTotalTaxesItem').text("0.00");

   // $('#txtDiscount').inputmask('decimal', { digits: 2 });
    $('#txtDiscount').val('0');
    $.ajax({
        type: "GET",
        url: strServerURL + "api/SL_Invoices/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: ($('#hID').val() == "" ? null : $('#hID').val()) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[1], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function SL_ClientDbtCrdtNotes_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    $('#lblTotalItems_S').text(0)
    ClearAll("#SL_InvoicesModal", null);
    $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtCode').val("Auto");
    $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
    _IsApproved = false;
    _HasTransactions = false;
    _JVID = 0;
    IntializeData();

}

function LoadInvoiceDetails()
{
    debugger;
    LoadAll("/api/ClientDbtCrdtNotes/LoadDetails", "where DbtCrdtNoteID = " + $('#hID').val(), function (pTabelRows) {
        SL_DbtCrdtNotes_BindTableRows(pTabelRows[0]);
        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


        setTimeout(function () {
            //CalculateAll();
            SL_HideShowEditBtns(_IsApproved, _HasTransactions);
    }, 300);

    });
}
function PrintInvoice(InvID)
{
    debugger;
    if (InvID == 0) {
        InvID = $('#hID').val()
    }

    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("ID");
    arr_Values.push(InvID);

    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Values: arr_Values
           , pTitle: "Sales DbtCrdtNotes"
            , pReportName: "Rep_SL_DbtCrdtNotesDetails"
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintPS_Payment?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Values + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}
function SL_ClientDbtCrdtNotes_BindTableRows(pSL_Invoices) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ClearAllTableRows("tblSL_Invoices");
    $.each(pSL_Invoices, function (i, item)
    {
        debugger;
        var disable = "";
        if (item.IsApproved == true || item.TransactionsCount > 0) {
            disable = "disabled = disabled";
        }

        if (item.TransactionsCount > 0) {
            _HasTransactions = true;

        }
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSL_Invoices",
            ("<tr ID='" + item.ID + "' ondblclick='SL_ClientDbtCrdtNotes_EditByDblClick(" + item.ID + ");'>"
              + "<td class='ID'> <input " + disable +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                //+" <tr ID='" + item.ID + "' ondblclick='SL_ClientDbtCrdtNotes_EditByDblClick(" + item.ID + "); '>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='DbtCrdtNoteDate' val='" + GetDateFromServer(item.DbtCrdtNoteDate) + "'>" + GetDateFromServer(item.DbtCrdtNoteDate) + "</td>"
                + "<td class='ClientID' val='" + item.ClientID + "'>" + item.ClientName + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='IsDbt'> <input type='checkbox' disabled='disabled' val='" + (item.IsDbt == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsApproved hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsApproved ? " checked='checked' " : "") + " /></td>"

                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='Serial hide' val='" + item.Serial + "'>" + item.Serial + "</td>"
                + "<td class='IsDbt hide' val='" + item.IsDbt + "'>" + item.IsDbt + "</td>"


               // + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"

                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
                + "<td class='InvoiceID hide' val='" + item.InvoiceID + "'>" + item.InvoiceID + "</td>"
                + "<td class='JVID hide' val='" + item.JVID + "'>" + item.JVID + "</td>"
                + "<td class='hSL_Invoices hide'><a href='#SL_InvoicesModal' data-toggle='modal' onclick='SL_Invoices_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='pSL_Invoices'><a href='#' onclick='PrintInvoice(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Invoices", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function SL_ClientDbtCrdtNotes_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#SL_InvoicesModal").modal("show");
    SL_Invoices_FillControls(pID);
}

function SL_Invoices_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where 1=1";

    if ($('#txtInvoiceNo_Filter').val().trim() != "")
    {
        WhereClause += " AND InvoiceNo LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
    if ($('#txtTotalPrice_Filter').val().trim() != "") {
        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    }
    if ($('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND ClientID = " + $('#slClients_Filter').val() + "";
    }
    if ($('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , DbtCrdtNoteDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ClientDbtCrdtNotes/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_ClientDbtCrdtNotes_BindTableRows(pTabelRows); SL_ClientDbtCrdtNotes_ClearAllControls(); });
    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}
function SL_ClientDbtCrdtNotes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_Invoices') != "")
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
                DeleteListFunction("/api/ClientDbtCrdtNotes/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/SL_Invoices/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function JournalVouchers_EnableDisableEditing(pOption) { //pOption 1:Enable 2:Disable
    if (pOption == 1) {
        $("#btnSave").removeAttr("disabled");
        $("#btnSaveandNew").removeAttr("disabled");
        //$("#btn-AddDetails").removeAttr("disabled");
        //$("#btn-DeleteDetails").removeAttr("disabled");
    }
    else {
        $("#btnSave").attr("disabled", "disabled");
        $("#btnSaveandNew").attr("disabled", "disabled");
        //$("#btn-AddDetails").attr("disabled", "disabled");
        //$("#btn-DeleteDetails").attr("disabled", "disabled");
    }
}
function SL_Invoices_FillControls(pID) {
    debugger;
    if (!$("#cbPosted" + pID).prop("checked") /*&& !$("#cbIsSysJv" + pID).prop("checked")*/ && $("#hf_CanEdit").val() == "1")
        JournalVouchers_EnableDisableEditing(1); //Enable
    else
        JournalVouchers_EnableDisableEditing(2); //Disable
    ClearAll("#SL_InvoicesModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);
    var tr = $("#tblSL_Invoices > tbody > tr[ID='" + pID + "']");
    $("#txtNo").val($(tr).find("td.Code").attr('val'));
    $("#txtDate").val($(tr).find("td.DbtCrdtNoteDate").attr('val'));
    $("#slClientID").val($(tr).find("td.ClientID").attr('val'));
    //$("#slInvoice").val(parseInt($(tr).find("td.InvoiceID").attr('val')));

    FillSlInvoice("slInvoice", $(tr).find("td.InvoiceID").text());
    //if ($(tr).find("td.ClientID").attr('val') != 0) {
    //        debugger;
    //            GetSelectIDsListComboWithName($(tr).find("td.ClientID").attr('val'), "ClientID", "/api/ClientDbtCrdtNotes/FillInvoiceByClient", "null", "slInvoice", "ID", "InvoiceNo")
    //}
    debugger;

    $("#txtSerial").val($(tr).find("td.Serial").attr('val'));
    $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
    $("#txtNotes").val($(tr).find("td.Notes").attr('val'));
    debugger;
   
    if ($(tr).find("td.IsDbt").attr('val') == "true") {
       
        $("#cbIsCredit").prop("checked", true);
    }
    else {
        $("#cbIsDebit").prop("checked", true);
    }

    _JVID = ($(tr).find("td.JVID").attr('val') * 1);
       $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");
    setTimeout(function () {
        LoadInvoiceDetails();
    }, 300);
   

}
function FillSlInvoice(pSlName, pInvoiceID) {
    debugger;
    if ($("#slClientID").val() == 0) //No Account is selected so just empty subaccounts
        $("#slInvoice").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ClientDbtCrdtNotes/FillInvoiceByClient"
            , {
                pWhereClause: "ClientID=" + $("#slClientID").val()

            }
            , function (pData) {
                FillListFromObject_ERP(pInvoiceID, 13/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                //Start Auto Filter
                $("#" + pSlName).trigger("change");
                //End Auto Filter
                FadePageCover(false);
            }
            , null);
    }
}
var _IsApproved = false;
function GetInsertUpdateParameters()
{
    debugger;
    var Amount = $('#lblTotalItems_S').text();
    var No = (($('#txtNo').val() == "" || $('#txtNo').val() == "Auto") ? "0" : $('#txtNo').val());
    var Date = ConvertDateFormat( $('#txtDate').val() );
    var ClientID = $('#slClientID').val();
    var Notes = $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val();
    var InvoiceID = $('#slInvoice').val();
    var IsApproved = false;
    var JVID = "0";
    var CurrencyID = $('#slCurrencyID').val();
    var Serial = $('#txtSerial').val() == "" ? "0" : $('#txtSerial').val() == "undefined" ? "0" : $('#txtSerial').val();

    var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    var isBebtCredtNot = $("#cbIsCredit").prop('checked') ? true : false;

    return {
        pID: ID,
        pNo: No,
        pAmount: Amount,
        pDate: Date,
        pClientID: ClientID,
        pNotes: Notes,
        pInvoiceID: InvoiceID,
        pIsApproved: IsApproved,
        pJVID: JVID,
        pCurrencyID: CurrencyID,
        pSerial: Serial,
        pisBebtCredtNot: isBebtCredtNot
    };


}

function SL_Invoices_Save(pSaveandAddNew)
{
    debugger;
    IsInsert = true;
    var _Suceess = true;
 
    console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        setTimeout(function () {

            InsertUpdateFunctionAndReturnID("form", "/api/ClientDbtCrdtNotes/Save",
                GetInsertUpdateParameters()
                , pSaveandAddNew, null, '#hID', function () {
                    // swal($('#hID').val());
                    var ListOfListOfObject = [];
                    debugger;
                    ListOfListOfObject.push(SetArrayOfItems());
                    //ListOfListOfObject.push(SetArrayOfExpenses());
                  //  ListOfListOfObject.push(SetArrayOfTaxes());
                    InsertUpdateListOfObject("/api/ClientDbtCrdtNotes/InsertItems",
                        ListOfListOfObject
                        , pSaveandAddNew, "SL_InvoicesModal", function (message) {
                            debugger;
                            $.ajax({
                                type: "GET",
                                url: "/api/ClientDbtCrdtNotes/deleteAllIDs",
                                data: { pWhereClause: listOfIDs },
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (Result) { }
                            });
                            //PrintInvoice($('#hID').val());
                            setTimeout(function () {
                                SL_Invoices_LoadingWithPaging();
                                IntializeData();
                            }, 300);

                        });
                });

        }, 30);
    }
}


function SL_Invoices_Delete() {
    swal({
        title: "Are you sure?",
        text: "This Transaction will be deleted permanently!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete!",
        closeOnConfirm: true
    },
        //callback function in case of success
        function ()
        {
            InsertUpdateFunction("form", "/api/ClientDbtCrdtNotes/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "SL_InvoicesModal", function (data) {
                    if (data[1].trim() == '') {
                        SL_Invoices_LoadingWithPaging();
                        IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}
var ItemsRowsCounter = 0;

function AddNewItemsRow()
{
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> E </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ExpenseID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                + "<td class='Amount' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateTotalExpenses()'  class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

                + "</tr>"));

    
    ItemsRowsCounter++;

}
     
function CalculateTotalExpenses() {
    debugger
    _TotalExpenses = 0.00;
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        
        //  var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;


        //var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1)/100;
        debugger;
        _TotalExpenses += $(tr).find('td.Amount').find('.input_quantity').val() * 1;
     
    });
    $('#lblTotalItems_S').text(_TotalExpenses);

}


function CopyStores() {
    if ($('#tblItems > tbody > tr[tag="item"]').length > 0)
    {


        $('#tblItems > tbody > tr[tag="item"]').each(function (i, tr) {
            //selectstore
            $(tr).find('td.StoreID ').find('.selectstore').val($('#slStores').val());
           
        });
    }
}

function CopyCostCenter() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectcostcenter').val($('#slCostCenter_ID').val());
    }






}


function SL_InvoicesDetails_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblItems') != "")
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
                DeleteListFunction("/api/SL_Invoices/DeleteItems", { "pSL_InvoicesDetailsIDs": GetAllSelectedIDsAsString('tblSL_InvoicesDetails') }, function () { SL_InvoicesDetails_LoadingWithPaging(); });
            });
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
                $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
                ItemsRowsCounter = ItemsRowsCounter - 1;
                GetAllSelectedIDs(ID);
                CalculateTotalExpenses();
                // CalculateAll();
            });

    }

}
var listOfIDs = "";
function GetAllSelectedIDs(ID) {
    debugger;
    listOfIDs += ((listOfIDs == "") ? "" : ",") + (ID);
    return listOfIDs;
    CalculateFinalAmount();
}



function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData()
{
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ExpenseID ').find('.selectservice').val($(tr).find('td.ExpenseID ').find('.selectservice').attr('tag'));
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
        $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
        $(tr).find('td.Amount').find('.input_quantity').val($(tr).find('td.Amount ').find('.input_quantity').attr('tag'));
        $(tr).find('td.TaxRatio').find('.input_Ratio').val($(tr).find('td.TaxRatio ').find('.input_Ratio').attr('tag'));

        // $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
function SL_DbtCrdtNotes_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item)
    {

            debugger;
            AppendRowtoTable("tblItems",
                ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ExpenseID' val='" + item.ExpenseID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ExpenseID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slExpenses').html() + "</select>" + "</td>"
                    + "<td class='Amount' val='" + item.Amount + "'>" + "<input tag='" + item.Amount + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        
      //  $('#tblItems > tbody > tr').find('td.Qty > input , td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;
        $("#tblItems").find("select").attr('onchange', 'CalculateTotalExpenses();');
        $("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateTotalExpenses();');

    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function ()
    {
        FillItemsData();
      //  SL_HideShowEditBtns(_IsApproved);
    }, 300);

}

function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/ClientDbtCrdtNotes/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Invoices_BindTableRows(pTabelRows); SL_Invoices_ClearAllControls(); });
    // HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";



function SetArrayOfItems()
{
    debugger;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        
        var objItem = new Object(); 
        objItem.ID = $(tr).attr('value');
        objItem.ExpenseID = $(tr).find('td.ExpenseID').find('.selectservice').val();
       // objItem.ExpenseID = $(tr).find('td.ExpenseID ').find('.selectservice').attr('tag');

        objItem.DbtCrdtNoteID = $('#hID').val();
        objItem.Notes =  $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Amount = $(tr).find('td.Amount').find('.input_quantity').val();
    arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}
var TaxID = 0;
function SetArrayOfTaxes(callback)
{
    debugger;
    
   // var arrayOfItems = new Array();
    //if ($('#tblTaxes > tbody > tr').length > 0) {
    //    $("#tblTaxes>tbody>tr").each(function (i, tr) {
    //        debugger;
    //        var objItem = new Object();
    //        objItem.ID = $(tr).attr('value');
    //        objItem.TaxID = $(tr).find("td.TaxID").attr('val');
    //        objItem.TaxValue = $(tr).find("td.TaxValue").attr('val');
    //        objItem.TaxAmount = $(tr).find("td.TaxAmount").attr('val');
    //        objItem.InvoiceID = $(tr).find("td.InvoiceID").attr('val');
    //        objItem.IsPercentage = true;
    //        arrayOfItems.push(objItem);
    //    });
    //    return arrayOfItems;
    //}
    //else {
       
        var arrayOfItems = new Array();
        $("#tblItems>tbody>tr").each(function (i, tr) {
            var objItem = new Object();
            debugger;
           
            // setTimeout(function () {
            debugger;
            //$.getJSON("/api/SL_Invoices/GetListTaxRatio", { pWhereClause: id }, function (Result) {
            //    if (Result.length > 0) {
            //        debugger;
            //        TaxID = JSON.parse(Result[1]);
            //    }

            //});

            $.ajax({
                type: "GET",
                url: "/api/SL_Invoices/deleteFromInvoiceTaxes",
                data: { pWhereClause: $('#hID').val() },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Result) {
                    $.ajax({
                        type: "GET",
                        url: "/api/SL_Invoices/GetListTaxRatio",
                        data: { pWhereClause: $(tr).find('td.ServiceID  select').find('option:selected').val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (Result) {
                            if (Result.length > 0) {
                                debugger;
                                TaxID = JSON.parse(Result[1]);
                                objItem.ID = 0;
                                objItem.TaxID = TaxID;
                                objItem.TaxValue = $(tr).find('td.TaxRatio input[type="text"]').val();
                                objItem.TaxAmount = ($(tr).find('td.UnitPrice').find('.input_unitprice').val() * $(tr).find('td.Qty').find('.input_quantity').val());
                                objItem.InvoiceID = $('#hID').val();
                                objItem.IsPercentage = true;
                                arrayOfItems.push(objItem);

                                console.log(TaxID);
                                console.log(Result[1]);
                                console.log(objItem.TaxID);
                                console.log($(tr).attr('value'));

                                if (i == $("#tblItems>tbody>tr").length - 1) {
                                    if (callback != null && callback != undefined)
                                        callback();
                                }

                            }
                        },
                        error: function (jqXHR, exception) {

                            FadePageCover(false);
                            swal("Oops!", "Please, contact your technical support! GetListAsCheckboxes in mainapp.master.js", "error");
                        }
                    });
                }
            });

              //  }, 300);
               

                  
    
        });
        return arrayOfItems;
    //}
    //debugger;
    //var arrayOfItems = new Array();
    //var TaxID;
    //$("#tblTaxes>tbody>tr").each(function (i, tr) {
    //    debugger;
    //    var objItem = new Object();
    //    objItem.ID = $(tr).attr('value');
    //    objItem.TaxID = $(tr).find('td.TaxID').find('.selectTaxes').val(); 
    //    objItem.TaxValue = $(tr).find('td.TaxValue').find('.inputtaxvalue').val(); 
    //    objItem.TaxAmount = $(tr).find('td.TaxAmount').find('.inputtaxamount').val(); 
    //    objItem.InvoiceID = $('#hID').val();
    //    objItem.IsPercentage = true;
    //   arrayOfItems.push(objItem);
    //});
    //return arrayOfItems;
}
var TaxesRowsCounter = 0;
function AddNewTaxesRow() {
    debugger;
    AppendRowtoTable("tblTaxes",
        ("<tr isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + 0 + "'>"
            + " <td class='btn-success' style='font-size:15px;'> T </td>"
            + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
            + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteTaxes(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
            + "<td class='TaxID' val='" + "0" + "'>" + "<select onchange='CalculateTotalExpenses();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
            + "<td class='TaxValue' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
            + "<td class='TaxAmount' val='" + "0" + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"

            + "</tr>"));
    $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
    TaxesRowsCounter++;
}
function FillTaxesData() {
    debugger;
    $($('#tblTaxes > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.TaxID ').find('.selectTaxes').val($(tr).find('td.TaxID ').find('.selectTaxes').attr('tag'));
        $(tr).find('td.TaxValue ').find('.inputtaxvalue').val($(tr).find('td.TaxValue ').find('.inputtaxvalue').attr('tag'));
        $(tr).find('td.TaxAmount ').find('.inputtaxamount').val($(tr).find('td.TaxAmount ').find('.inputtaxamount').attr('tag'));
        $(tr).find('td.InvoiceID ').find($(tr).find("td.InvoiceID").attr('val'));
        
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
//function SL_InvoicesTaxes_BindTableRows(pItems)
//{
//    TaxesRowsCounter = 0;
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    ClearAllTableRows("tblTaxes");
//    $.each(JSON.parse(pItems), function (i, item) {

//        debugger;
//        AppendRowtoTable("tblTaxes",
//            ("<tr isdeleted='0'  counter='" + (TaxesRowsCounter + 1) + "' value='" + item.ID + "'>"
//                + " <td class='btn-success' style='font-size:15px;'> T </td>"
//                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
//                + "<td counter='" + (TaxesRowsCounter + 1) + "'> <button id='btn-DeleteDetails' type='button' onclick='DeleteTaxes(" + (TaxesRowsCounter + 1) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//                + "<td class='TaxID' val='" + item.TaxID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.TaxID  + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"
//                + "<td class='TaxValue' val='" + item.TaxValue + "'>" + "<input   disabled='disabled' type='text' class='inputtaxvalue input-sm  col-sm'> </td>"
//                + "<td class='TaxAmount' val='" + item.TaxAmount + "'>" + "<input   disabled='disabled' type='text' class='inputtaxamount input-sm  col-sm'> </td>"
//               + "<td class='InvoiceID' val='" + item.InvoiceID + "'>" + "<select onchange='CalculateAll();' id='Tax-" + (TaxesRowsCounter + 1) + "' tag='" + item.InvoiceID + "' class='input-sm  col-sm selectTaxes'>" + $('#hidden_slTaxes').html() + "</select>" + "</td>"

//               + "<td class='IsPercentage hide' val='true'>true</td>"
//                + "</tr>"));
//       // $('#tblTaxes > tbody > tr').find('td.TaxValue > input ,td.TaxAmount > input ').inputmask('decimal', { digits: 2 });
//        TaxesRowsCounter++;

//    });

//    setTimeout(function () {
//        FillTaxesData();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

//}
//function DeleteTaxes(RowsNo) {

//    if ($("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
//        $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
//        TaxesRowsCounter = TaxesRowsCounter - 1;
//        CalculateAll();

//    }
//    else {
//        swal({
//            title: "Are you sure?",
//            text: "The selected records will be deleted permanently!",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "Yes, delete!",
//            closeOnConfirm: true
//        },
//            //callback function in case of success
//            function () {
//                $("#tblTaxes > tbody > tr[counter='" + RowsNo + "']").remove();
//                TaxesRowsCounter = TaxesRowsCounter - 1;
//                CalculateAll();
//            });

//    }

//}
//function CalculateTotalTaxes()
//{

//    debugger
//    _TotalTaxes = 0.00;
//    if ($('#tblTaxes > tbody > tr').length == 0)
//        $('#lblTotalTaxes').text('0.00')
//    $('#tblTaxes > tbody > tr').each(function (i, tr) {
//        var tr_Total = 0.00;
//        if ($(tr).find('td.TaxAmount > input').val() != "" && $(tr).find('td.TaxAmount > input').val() != null && $(tr).find('td.TaxAmount > input').val() != "undefined")
//            tr_Total = ($(tr).find('td.TaxAmount > input').val() * 1.00).toFixed(2);
//        _TotalTaxes = (_TotalTaxes + tr_Total * 1);
//        if ($('#tblTaxes > tbody > tr').length - 1 == (i))
//        {

//            $('#lblTotalTaxes').text(_TotalTaxes.toFixed(2));

//        }
//    });

//}
function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: { "": pParametersWithValues },
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",/*"application/json; charset=utf-8"*/
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data[0] == true) {
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else {

                        swal(strSorry, data[1]);
                        //try {
                        //    if (insert == true) {
                        //        $('#hID').val(data[2]);
                        //        $("#btnSave").attr("onclick", "SL_Invoices_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "SL_Invoices_Save(true);");

                        //    }
                        //}
                        //catch
                        //{

                        //}

                    }

                }
                else {
                    if (data == true) {
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, strUniqueFailInsertUpdateMessage);
                }
                FadePageCover(false);
            },
            error: function (jqXHR, exception) {
                FadePageCover(false);
                alert('Error when trying to call function [' + pFunctionName + ']. InsertUpdateFunction fn in mainapp.master');
            }
        });
    }
    else
        FadePageCover(false);
}


$('#slInvoiceType').on('change', function () {
    debugger;
    if ($('#slInvoiceType').val() == 1)
    {
        $('#wasata').show()
    }
    else
    {
        $('#wasata').hide()
    }
   
});
var AHMED=0;

debugger;
if ($('#slClientID').val() != 0 || $('#slClientID').val() != "" || $('#slClientID').val() != null) {
    $('#slClientID').on('change', function () {
        debugger;
        if ($(this).val() != "") {
            GetSelectIDsListComboWithName($(this).val(), "ClientID", "/api/ClientDbtCrdtNotes/FillInvoiceByClient", "not null", "slInvoice", "ID", "InvoiceNo")
        }
    });
}