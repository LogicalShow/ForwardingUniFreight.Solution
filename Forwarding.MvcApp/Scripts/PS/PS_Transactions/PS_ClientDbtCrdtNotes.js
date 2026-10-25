var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00;
var _TotalExpenses = 0.00;
var _TotalTaxes = 0.00;
var _JVID = 0;
//Start Auto Filter
$(document).ready(function () {
    $("#slClientID").css({ "width": "100%" }).select2();
    $("div[tabindex='-1']").removeAttr('tabindex');
});
//End Auto Filter
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
        //$("#tblItems").find("input,button,textarea,select").prop('disabled', false);
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
        data: { pDate: ConvertDateFormat( $('#txtInvoiceDate').val() ) , pOnlyCurrency: true },
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
//$("#txtDate").datepicker().on('changeDate'
//                                  , function () {
                                    
//                                      IntializeData();

//                                  });
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
    $('#lblTotalItems_S').text("0.00");

    $('#lblNetPriceValue').text("0.00");
    $('#lblTotalTaxesItem').text("0.00");

    $('#lblPriceValue').text("0.00");



   // $('#txtDiscount').inputmask('decimal', { digits: 2 });
    $('#txtDiscount').val('0');
    $.ajax({
        type: "GET",
        url: strServerURL + "api/PS_ClientDbtCrdtNotes/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtDate').val()), pOnlyCurrency: true },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}

function PS_ClientDbtCrdtNotes_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
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
    $("#slClientID").val("0");
    $("#slClientID").trigger("change");

    $("#btnSave").removeAttr("disabled");
    $("#btnSaveandNew").removeAttr("disabled");
}

function LoadInvoiceDetails()
{
    debugger;
    LoadAll("/api/PS_ClientDbtCrdtNotes/LoadDetails", "where DbtCrdtNoteID = " + $('#hID').val(), function (pTabelRows) {
        PS_ClientDbtCrdtNotesDetails_BindTableRows(pTabelRows[0]);
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
    var arr_Vlaues = new Array();
    arr_Keys.push("ID");
    arr_Vlaues.push(InvID);

    var pParametersWithValues =
        {
            arr_Keys: arr_Keys
            , arr_Vlaues: arr_Vlaues
           , pTitle: "Purchase DbtCrdtNotesServices"
        , pReportName: "Rep_PS_DbtCrdtNotesDetails"
        };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Keys=' + pParametersWithValues.arr_Keys + '' + '&arr_Values=' + pParametersWithValues.arr_Vlaues + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;
}
function PS_ClientDbtCrdtNotes_BindTableRows(pSL_Invoices) {
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
            ("<tr ID='" + item.ID + "' ondblclick='PS_ClientDbtCrdtNotes_EditByDblClick(" + item.ID + ");'>"
              + "<td class='ID'> <input " + disable +" name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                //+" <tr ID='" + item.ID + "' ondblclick='PS_ClientDbtCrdtNotes_EditByDblClick(" + item.ID + "); '>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='DbtCrdtNoteDate' val='" + GetDateFromServer(item.DbtCrdtNoteDate) + "'>" + GetDateFromServer(item.DbtCrdtNoteDate) + "</td>"
                + "<td class='DueDate hide' val='" + GetDateFromServer(item.DueDate) + "'>" + GetDateFromServer(item.DueDate) + "</td>"

                + "<td class='SupplierID' val='" + item.SupplierID + "'>" + item.ClientName + "</td>"
                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"
                //+ "<td class='IsDbt'> <input type='checkbox' disabled='disabled' val='" + (item.IsDbt == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsApproved hide'> <input id=cbPosted" + item.ID + " type='checkbox' disabled='disabled' " + (item.IsApproved ? " checked='checked' " : "") + " /></td>"

                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='Serial hide' val='" + item.Serial + "'>" + item.Serial + "</td>"
                + "<td class='IsDbt hide' val='" + item.IsDbt + "'>" + item.IsDbt + "</td>"


               // + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"

                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='CostCenter_ID hide' val='" + item.CostCenterID + "'>" + item.CostCenterID + "</td>"
                + "<td class='BankID hide' val='" + item.BankID + "'>" + item.BankID + "</td>"

                + "<td class='InvoiceID hide' val='" + item.InvoiceID + "'>" + item.InvoiceID + "</td>"
                + "<td class='InvoiceNo hide' val='" + item.InvoiceNo + "'>" + item.InvoiceNo + "</td>"
                + "<td class='TotalPrice hide' val='" + item.TotalPrice + "'>" + item.TotalPrice + "</td>"
                + "<td class='TaxAmount hide' val='" + item.TaxAmount + "'>" + item.TaxAmount + "</td>"
                + "<td class='TotalAfterTax hide' val='" + item.TotalAfterTax + "'>" + item.TotalAfterTax + "</td>"


                + "<td class='Discount hide' val='" + item.Discount + "'>" + item.Discount + "</td>"
                + "<td class='DiscountPercentege hide' val='" + item.DiscountPercentege + "'>" + item.DiscountPercentege + "</td>"
                + "<td class='isDiscount val=" + item.isDiscount + " hide'> <input type='checkbox' disabled='disabled' val='" + (item.isDiscount == true ? "true' checked='checked'" : "'") + " /></td>"


                + "<td class='DisbursementJob_ID hide' val='" + item.DisbursementJob_ID + "'>" + item.DisbursementJob_ID + "</td>"
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

function PS_ClientDbtCrdtNotes_EditByDblClick(pID, pIsApproved, pHasTransactions) {
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#SL_InvoicesModal").modal("show");
    SL_Invoices_FillControls(pID);
}
function PS_ClientDbtCrdtNotes_GetWhereClause() {
    debugger;
    var WhereClause = "Where 1=1";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND Code LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
    if ($('#txtTotalPrice_Filter').val().trim() != "") {
        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    }
    if ($('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND SupplierID = " + $('#slClients_Filter').val() + "";
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
        return WhereClause;
}
function SL_Invoices_LoadingWithPaging() {
    debugger;
    var WhereClause = "Where 1=1";

    if ($('#txtInvoiceNo_Filter').val().trim() != "")
    {
        WhereClause += " AND Code LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
    if ($('#txtTotalPrice_Filter').val().trim() != "") {
        WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    }
    if ($('#slClients_Filter').val().trim() != "0") {
        WhereClause += " AND SupplierID = " + $('#slClients_Filter').val() + "";
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

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_ClientDbtCrdtNotes/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_ClientDbtCrdtNotes_BindTableRows(pTabelRows); PS_ClientDbtCrdtNotes_ClearAllControls(); });
    HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}
function PS_ClientDbtCrdtNotes_DeleteList() {
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
                DeleteListFunction("/api/PS_ClientDbtCrdtNotes/Delete", { "pSL_InvoicesIDs": GetAllSelectedIDsAsString('tblSL_Invoices') }, function () { SL_Invoices_LoadingWithPaging(); });
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
    $("#txtDueDate").val($(tr).find("td.DueDate").attr('val'));

    $("#slClientID").val($(tr).find("td.SupplierID").attr('val'));
    $("#slClientID").trigger("change");

    $("#slBank").val($(tr).find("td.BankID").attr('val'));

    $("#slDisbursementJobs").val($(tr).find("td.DisbursementJob_ID").attr('val'));

    $('#cbRatio').prop('checked', $(tr).find("td.isDiscount input:checkbox").is(":checked"));
    $("#txtDiscount").val($(tr).find("td.DiscountPercentege").attr('val'));
    $("#lblDiscountValue").text($(tr).find("td.Discount").attr('val'));
    $("#lblDiscountPercentage").text($(tr).find("td.DiscountPercentege").attr('val'));

    FillSlInvoiceServices("slInvoice", $(tr).find("td.InvoiceID").text());
    //$("#lblTotalItems_S").val($(tr).find("td.TotalPrice").text())
    $('#lblTotalItems_S').text($(tr).find("td.TotalPrice").text());
    $('#lblNetPriceValue').text($(tr).find("td.TotalPrice").text());
    $('#lblTotalTaxesItem').text($(tr).find("td.TaxAmount").text());
    $('#lblPriceValue').text($(tr).find("td.TotalAfterTax").text());

   // $("#slInvoice").val($("#slClientID option:selected").attr("InvoiceID"));
    //$("#slInvoice").val($(tr).find("td.InvoiceID").attr('val'));
    //if ($(tr).find("td.ClientID").attr('val') != 0 && $(tr).find("td.InvoiceID").attr('val') != 0 && $("slInvoice").val()!=0) {
    //        debugger;
    //        GetSelectIDsListComboWithName($(tr).find("td.ClientID").attr('val'), "ClientID", "/api/PS_ClientDbtCrdtNotes/FillInvoiceByClient", "null", "slInvoice", $(tr).find("td.InvoiceID").attr('val'), "InvoiceNo")
    //}
    debugger;
    if ($(tr).find("td.DisbursementJob_ID").attr('val') !=0) {
        $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $(tr).find("td.DisbursementJob_ID").attr('val') }, function (Result) {
            if (Result.length > 0) {
                debugger;
                $.each(JSON.parse(Result), function (i, item) {
                    AHMED = item.JobNumber;
                    $("#txtJobVessel_Name").val(item.Vessel_Name);
                    $("#txtJobClient_Name").val(item.Client_Name);
                }
            );
            }
        });
    }
   
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

function FillSlInvoiceServices(pSlName, pInvoiceID) {
    debugger;
    if ($("#slClientID").val() == 0) //No Account is selected so just empty subaccounts
        $("#slInvoice").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/PS_ClientDbtCrdtNotes/FillInvoiceByClient"
            , {
                pWhereClause: "SupplierID=" + $("#slClientID").val()
                
            }
            , function (pData) {
                FillListFromObject_ERP(pInvoiceID, 17/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                $("#" + pSlName).val(pInvoiceID);
                //Start Auto Filter
               // $("#" + pSlName).trigger("change");
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
    var Date = ConvertDateFormat($('#txtDate').val());
    var DueDate = ConvertDateFormat($('#txtDate').val());

    var ClientID = $('#slClientID').val();
    var Notes = $('#txtNotes').val() == "" ? "0" : $('#txtNotes').val() == "undefined" ? "0" : $('#txtNotes').val();
    var InvoiceID = $('#slInvoice').val();
    var IsApproved = false;
    var JVID = "0";
    var CurrencyID = $('#slCurrencyID').val();
    var Serial = $('#txtSerial').val() == "" ? "0" : $('#txtSerial').val() == "undefined" ? "0" : $('#txtSerial').val();
    var JobID = $('#slDisbursementJobs').val();
    var ID = ($('#hID').val() == "" ? "0" : $('#hID').val());
    var isBebtCredtNot = $("#cbIsCredit").prop('checked') ? true : false;
    var BankID = $('#slBank').val();
    var NetPriceValue = ($('#lblNetPriceValue').text() * 1) ;
    var TotalTaxesItem = ($('#lblTotalTaxesItem').text() * 1) ;
    var PriceValue = ($('#lblPriceValue').text() * 1); //* ($('#slCurrencyID option:selected').attr('exchangerate') * 1);

    var ISRatio = $('#cbRatio').is(':checked') ? true : false;
    var Discount = $('#lblDiscountValue').text();
    var DiscountPercentage = $('#txtDiscount').val() == "" ? "0" : $('#txtDiscount').val() == "undefined" ? "0" : $('#txtDiscount').val()


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
        pJobID: JobID,
        pisBebtCredtNot: isBebtCredtNot,
        pBankID: BankID,
        pDueDate: DueDate,
        pNetPriceValue: NetPriceValue,
        pTotalTaxesItem: TotalTaxesItem,
        pPriceValue: PriceValue,
        pDiscount: Discount,
        pDiscountPercentage: DiscountPercentage,
        pISRatio: ISRatio


    };


}

function SL_Invoices_Save(pSaveandAddNew) {
    debugger;
    IsInsert = true;
    var _Suceess = true;


    if ($('#slClientID').val() == "0") {
        swal('Excuse me', 'You must Select Client', 'warning');
        _Suceess = false;
    }


    if ($('#tblItems > tbody > tr').length == 0) {
        swal('Excuse me', 'You must insert Expenses', 'warning');
        _Suceess = false;
    }
    else {
        AccountIDs = "";
        var TaxRatio14 = 0;
        var TaxRatio10 = 0;
        var TaxRatioother = 0;


        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
               
             

                if (($(tr).find('td.TaxRatio').find('.input_Ratio').val()) * 1==14) {
                    TaxRatio14 = $(tr).find('td.TaxRatio').find('.input_Ratio').val();
                }
                if (($(tr).find('td.TaxRatio').find('.input_Ratio').val()) * 1==10) {
                    TaxRatio10 = $(tr).find('td.TaxRatio').find('.input_Ratio').val();
                }
                if (($(tr).find('td.TaxRatio').find('.input_Ratio').val()) * 1 != 0 && 
                    ($(tr).find('td.TaxRatio').find('.input_Ratio').val()) * 1 != 14 && 
                    ($(tr).find('td.TaxRatio').find('.input_Ratio').val()) * 1 != 10) {
                    TaxRatioother = $(tr).find('td.TaxRatio').find('.input_Ratio').val();
                }
                if (TaxRatio14 == 14 && TaxRatio10 == 10) {
                    swal('Excuse me', 'Must Input One Tax 14 or 10 Only', 'warning');
                    _Suceess = false;
                    return false;
                }
                if (TaxRatio14 == 14 && (TaxRatioother != 0)) {
                    swal('Excuse me', 'Must Input One Tax 14 or 10 Only', 'warning');
                    _Suceess = false;
                    return false;
                }
                if (TaxRatio10 == 14 && (TaxRatioother != 0)) {
                    swal('Excuse me', 'Must Input One Tax 14 or 10 Only', 'warning');
                    _Suceess = false;
                    return false;
                }

                AccountIDs += ((AccountIDs == "") ? "" : ",") + ($(tr).find('td.ServiceID').find('.selectservice').val());
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Amount').find('.input_quantity').val();
                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                    swal('Excuse me', 'Fill  Expenses', 'warning');
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

    console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        $.ajax({
            type: "GET",
            url: "/api/PS_ClientDbtCrdtNotes/A_A_JobAccountRequiredCheck",
            data: { pAccountIDs: AccountIDs },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData[0]!="" && $('#slDisbursementJobs').val() == "0") {
                    swal("Sorry", "Must Select Job");
                }
                else {
                    setTimeout(function () {

                        InsertUpdateFunctionAndReturnID("form", "/api/PS_ClientDbtCrdtNotes/Save",
                            GetInsertUpdateParameters()
                            , pSaveandAddNew, null, '#hID', function () {
                                // swal($('#hID').val());
                                var ListOfListOfObject = [];
                                debugger;
                                ListOfListOfObject.push(SetArrayOfItems());
                                //ListOfListOfObject.push(SetArrayOfExpenses());
                                //  ListOfListOfObject.push(SetArrayOfTaxes());
                                InsertUpdateListOfObject("/api/PS_ClientDbtCrdtNotes/InsertItems",
                                    ListOfListOfObject
                                    , pSaveandAddNew, "SL_InvoicesModal", function (message) {
                                        debugger;
                                        $.ajax({
                                            type: "GET",
                                            url: "/api/PS_ClientDbtCrdtNotes/deleteAllIDs",
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
        });
    }
}
function dcServices_notes_GetWhereClause() {
    debugger;
    var WhereClause = "Where 1=1";

    if ($('#txtInvoiceNo_Filter').val().trim() != "") {
        WhereClause += " AND Code LIKE '%" + $('#txtInvoiceNo_Filter').val() + "%'";
    }
    
   
    if ($('#slCurrency_Filter').val().trim() != "0") {
        WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    }
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , InvoiceDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }
    return WhereClause;
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
            InsertUpdateFunction("form", "/api/PS_ClientDbtCrdtNotes/Delete",
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
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button'  class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' onchange='GetRatio(this)' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"

                + "<td class='Amount' val='" + "0" + "'>" + "<input   type='text' onchange='CalculateTotalExpenses()'  class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='TaxRatio ' val='" + "0" + "'>" + "<input   id='txtTaxRatio" + (ItemsRowsCounter + 1) + "' type='text'  onchange='CalculateTotalExpenses();'  class='input_Ratio input-sm  col-sm'>" + "</td>"
                + "<td class='WHTRatio ' val='" + "0" + "'>" + "<input   id='txtWHTRatio" + (ItemsRowsCounter + 1) + "' type='text'  onchange='CalculateTotalExpenses();'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"

                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"

                + "</tr>"));

    
    ItemsRowsCounter++;

}
function GetRatio(ITEM) {
    debugger;
    var tr = null;
    if ($(ITEM).is('tr'))
        tr = ITEM;
    else
        tr = $(ITEM).closest('tr');
    var ItemPrice = 0;
    var ItemID = 0;
    console.log($(tr).attr('tag'))
    if ($(tr).attr('tag') == 'item')
        ItemPrice = $(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1;
    else
        ItemPrice = $(tr).find('td.UnitPrice input[type="text"]').val();
    //ItemID = $(tr).find('td.ServiceID select').val();
    // ItemID = $(tr).find('td.ServiceID').val();
    ItemID = $(tr).find('td.ServiceID  select').find('option:selected').val();
    // ItemID = $(tr).find("td.ServiceID").text();
    //var ExchangeRate = $('#slCurrencyID').find('option:selected').attr('exchangerate');
    //var quantity = $(tr).find('td.Qty input[type="text"]').val();
    //var discount = $(tr).find('td.Discount input[type="text"]').val();
    debugger;
    $.getJSON("/api/SL_Invoices/GetListTaxRatio", { pWhereClause: $(tr).find('td.ServiceID  select').find('option:selected').val() }, function (Result) {
        if (Result[0] > 0) {
            debugger;
            $(tr).find('td.TaxRatio input[type="text"]').val(JSON.parse(Result[0]));

            $(tr).find('td.TaxID input[type="text"]').val(JSON.parse(Result[1]));

            $('#txtVat').val(JSON.parse(Result[0]));


        } else {
            $(tr).find('td.TaxRatio input[type="text"]').val("0");
            $(tr).find('td.TaxID input[type="text"]').val("0");

        }

    });

}

//function /*CalculateTotalExpenses*/() {
//    debugger
//    _TotalExpenses = 0.00;
//    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        
//        //  var _Amount = $('#lblTotalItems').text() * 1 + $('#lblTotalExpenses').text() * 1 + $('#lblTotalTaxes').text() * 1;


//        //var _AmountTax = ($('#lblTotalTaxes').text() * 1) * ($('#lblTotalItems_S').text() * 1)/100;
//        debugger;
//        _TotalExpenses += $(tr).find('td.Amount').find('.input_quantity').val() * 1;
     
//    });
//    $('#lblTotalItems_S').text(_TotalExpenses);

//}
function CalculateTotalExpenses() {
    debugger
    _TotalExpenses = 0.00;
    _TotalVat = 0.00;

    var ItemTax = 0;
    var TaxRatio = 0;
    var Price = 0;
    var WHT = 0;
    var TotalWHT = 0;



    $($('#tblItems > tbody > tr')).each(function (i, tr) {

        debugger;
        


        Price = $(tr).find('td.Amount').find('.input_quantity').val() * 1;

        TaxRatio = $(tr).find('td.TaxRatio  input[type="text"]').val();

        WHT = $(tr).find('td.WHTRatio  input[type="text"]').val() * 1 * Price /100;

        TotalWHT += WHT*1;

        //ItemTax = (((Price - WHT * 1) * TaxRatio) / 100).toFixed(2);
        ItemTax = (((Price ) * TaxRatio) / 100).toFixed(2);

        _TotalVat += parseFloat(ItemTax);
        _TotalExpenses += parseFloat(Price);


    });
    var _DiscountValue = 0;
    var _DiscountPercentage = $('#txtDiscount').val();

    //if ($('#cbRatio').prop('checked'))
    //    _DiscountValue = ((parseFloat(_TotalExpenses) * parseFloat(_DiscountPercentage)) / 100).toFixed(2);
    //else
    //    _DiscountValue = $('#txtDiscount').val().trim() * 1;
    _DiscountValue = TotalWHT * 1;


    

    $('#lblDiscountValue').text(parseFloat(_DiscountValue).toFixed(2));


    $('#lblNetPriceValue').text(parseFloat(_TotalExpenses).toFixed(2));
    $('#lblTotalTaxesItem').text(parseFloat(_TotalVat).toFixed(2));
    $('#lblPriceValue').text((parseFloat(_TotalExpenses) + parseFloat(_TotalVat) - parseFloat(_DiscountValue)).toFixed(2));
    $('#lblTotalItems_S').text((parseFloat(_TotalExpenses)).toFixed(2));
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
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.UnitPrice ').find('.input_unitprice').val($(tr).find('td.UnitPrice ').find('.input_unitprice').attr('tag'));
        $(tr).find('td.Discount ').find('.input_discount').val($(tr).find('td.Discount ').find('.input_discount').attr('tag'));
        $(tr).find('td.Amount').find('.input_quantity').val($(tr).find('td.Amount ').find('.input_quantity').attr('tag'));
        $(tr).find('td.TaxRatio').find('.input_Ratio').val($(tr).find('td.TaxRatio ').find('.input_Ratio').attr('tag'));
        $(tr).find('td.WHTRatio').find('.input_WHTRatio').val($(tr).find('td.WHTRatio ').find('.input_WHTRatio').attr('tag'));


        // $(tr).find('td.CostCenterID ').find('.selectcostcenter').val($(tr).find('td.CostCenterID ').find('.selectcostcenter').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}

function PS_ClientDbtCrdtNotesDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-SL").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item)
    {

            debugger;
            AppendRowtoTable("tblItems",
                ("<tr tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(" + (ItemsRowsCounter + 1) + "," + (item.ID) + ");' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ServiceID' val='" + item.ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.ServiceID + "'class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='Amount' val='" + item.Amount + "'>" + "<input tag='" + item.Amount + "' disabled='disabled'  type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='TaxRatio ' val='" + item.TaxRatio + "'>" + "<input tag='" + item.TaxRatio + "'  disabled='disabled' onchange='CalculateTotalExpenses()'  type='text'  class='input_Ratio input-sm  col-sm'>" + "</td>"
                    + "<td class='WHTRatio ' val='" + item.WHTRatio + "'>" + "<input tag='" + item.WHTRatio + "' disabled='disabled'  onchange='CalculateTotalExpenses()'  type='text'  class='input_WHTRatio input-sm  col-sm'>" + "</td>"


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
    LoadAll("/api/PS_ClientDbtCrdtNotes/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Invoices/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Invoices_BindTableRows(pTabelRows); SL_Invoices_ClearAllControls(); });
    // HighlightText("#tblSL_Invoices>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";


var AccountIDs = "";
function GetAllSelectedIDsjob(ID) {
    debugger;
    AccountIDs += ((AccountIDs == "") ? "" : ",") + (ID);
    return AccountIDs;
   
}
function SetArrayOfItems()
{
    debugger;
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        
        var objItem = new Object(); 
        objItem.ID = $(tr).attr('value');
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
       // objItem.ExpenseID = $(tr).find('td.ExpenseID ').find('.selectservice').attr('tag');

        objItem.DbtCrdtNoteID = $('#hID').val();
        objItem.Notes =  $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Amount = $(tr).find('td.Amount').find('.input_quantity').val();
        objItem.TaxRatio = $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim() == "undefined" ? "0" : $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim() == "" ? "0" : $(tr).find('td.TaxRatio').find('.input_Ratio').val().trim()
        objItem.WHTRatio = $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim() == "undefined" ? "0" : $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim() == "" ? "0" : $(tr).find('td.WHTRatio').find('.input_WHTRatio').val().trim()

        //GetAllSelectedIDs($(tr).find('td.ExpenseID').find('.selectservice').val());
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
function FillWasataDetails() {
    debugger;
    
    //$($('#tblWasataDetails > tbody > tr')).each(function (i, tr) {
    //    $(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
    //    $(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));

    //});
    $($('#tblWasataDetails > tbody > tr')).each(function (i, tr) {
        //$(tr).find('td.ExpensesID ').find('.selectExpenses').val($(tr).find('td.ExpensesID ').find('.selectExpenses').attr('tag'));
        //$(tr).find('td.Amount ').find('.inputamount').val($(tr).find('td.Amount ').find('.inputamount').attr('tag'));
        if ($('#slInvoiceType').val() == 1) {
            $('#wasata').show()
        }
        $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $('#slDisbursementJobs').val() }, function (Result) {
            if (Result.length > 0) {
                debugger;
                $.each(JSON.parse(Result), function (i, item) {
                    AHMED = item.JobNumber;
                    $("#txtJobVessel_Name").val(item.Vessel_Name);
                    $("#txtJobClient_Name").val(item.Client_Name);
                    $("#txtNotes").val(item.Client_Name + " job no : " + item.JobNumber);
                    $("#txtShip").val(item.Vessel_Name);
                    $("#txtShippingPort").val(item.ETA_Port_Name);
                    $("#txtDisCharcgePort").val(item.ETA_Port_Name);
                    $("#txtArrivalDate").val(item.ATA);
                    $("#txtCargoDesc").val(item.CargoName);
                    $("#txtTonWeight").val(item.CargoQuantity);


                    $("#txtBillCount").val($(tr).find("td.BillCount").text());
                    $("#txtBillNo").val($(tr).find("td.BillNo").text());
                    $("#txtCargo").val($(tr).find("td.Cargo").text());
                    $("#txtVoyageeNo").val($(tr).find("td.VoyageNo").text());
                    $("#txtLine").val($(tr).find("td.Line").text());
                    $("#txtFrieght").val($(tr).find("td.Fright").text());
                    $("#txtVoucherDate").val($(tr).find("td.VoucherDate").text('val'));
                    $("#txtDeleveryNo").val($(tr).find("td.DeliveryVoucher").text());
                }


            );
            }

        });
       

    });
    //setTimeout(function () {
    //    CalculateAll();
    //}, 30);
}
//function SL_InvoicesWasataDetails_BindTableRows(pItems) {
//    WasataDetailsRowsCounter = 0;
//    debugger;
//    $("#hl-menu-SL").parent().addClass("active");
//    ClearAllTableRows("tblWasataDetails");
//    $.each(JSON.parse(pItems), function (i, item) {

//        AppendRowtoTable("tblWasataDetails",
//            ("<tr isdeleted='0'  counter='" + (ExpensesRowsCounter + 1) + "' value='" + item.ID + "'>"
//              +"<td class='WasataDetailID'>" + item.WasataDetailID + "</td>"
//               + "<td class='InvoiceID'>" + item.InvoiceID + "</td>"
//               + "<td class='BillCount'>" + item.BillCount + "</td>"
//               + "<td class='BillNo'>" + item.BillNo + "</td>"
//               + "<td class='Cargo'>" + item.Cargo + "</td>"
//               + "<td class='VoyageNo'>" + item.VoyageNo + "</td>"
//               + "<td class='Line'>" + item.Line + "</td>"
//               + "<td class='Fright'>" + item.Fright + "</td>"
//               + "<td class='VoucherDate'>" + item.VoucherDate + "</td>"
//               + "<td class='DeliveryVoucher'>" + item.DeliveryVoucher + "</td>"
//                + "</tr>"));

//        WasataDetailsRowsCounter++;
//       // $('#tblWasataDetails > tbody > tr').find('td.Fright > input').inputmask('decimal', { digits: 2 });

//    });
//    ApplyPermissions();
//    BindAllCheckboxonTable("tblWasataDetails", "WasataDetailID");
//    CheckAllCheckbox("WasataDetailID");
//    setTimeout(function () {
//        FillWasataDetails();
//        //  SL_HideShowEditBtns(_IsApproved);
//    }, 300);

//}
//function DeleteExpenses(RowsNo) {

//    if ($("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").attr("value") == "0") {
//        $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
//        ExpensesRowsCounter = ExpensesRowsCounter - 1;
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
//                $("#tblExpenses > tbody > tr[counter='" + RowsNo + "']").remove();
//                ExpensesRowsCounter = ExpensesRowsCounter - 1;
//                CalculateAll();
//            });

//    }

//}

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
$('#slDisbursementJobs').on('change', function () {
    debugger;
    $.getJSON("/api/SL_Invoices/FillDAS_DisbursementJobs_FillInvoices", { pWhereClause: $(this).val() }, function (Result) {
        if (Result.length > 0) {
            debugger;
            $.each(JSON.parse(Result), function (i, item) {
                AHMED = item.JobNumber;
                $("#txtJobVessel_Name").val(item.Vessel_Name);
                $("#txtJobClient_Name").val(item.Client_Name);
                $("#txtNotes").val(item.Client_Name +" job no : "+item.JobNumber);
              
            }


        );}
            
    });

});

debugger;
if ($('#slClientID').val() != 0 || $('#slClientID').val() != "" || $('#slClientID').val() != null) {
    $('#slClientID').on('change', function () {
        debugger;
        if ($(this).val() != "") {
            GetSelectIDsListComboWithName($(this).val(), "SupplierID", "/api/PS_ClientDbtCrdtNotes/FillInvoiceByClient", "not null", "slInvoice", "ID", "InvoiceNo")
        }
    });
}
////////Job Search
var pEstimationCurrencyID = 0;
var pEstimationCurrency = "";

function JobSearch() {
    debugger;
    if ($("#txtExchangeRate").val() == 0)
        swal("Sorry", "Exchange rate can not be 0.");
    else if (ValidateForm("form", "VoucherModal")) {
        ClearAll("#div-JobModel");
        jQuery("#div-JobModel").modal("show");
        PortJob_Inti();
    }
}
function PortJob_Inti() {
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "JobNumber";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                     FillListFromObject(null, 16/*pName*/, "Select Vessel", "SlVessel_IDS", pData[3], null);
                     FillListFromObject(null, 2/*pName*/, "Select Client", "SlClient", pData[2], null);
                     FillListFromObject(null, 18/*pName*/, "Select Port Name", "SlPortName", pData[4], null);
                 });
}

function PortJob_BindTableRows(pTableRows) {


    debugger;
    $("#hl-menu-DASJobs").parent().addClass("active");
    ClearAllTableRows("tblJobs");
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblJobs",
                    ("<tr ID='" + item.DisbursementJob_ID + "' ondblclick='PortJob_EditByDblClick(" + item.DisbursementJob_ID + ");'>"

                    + "<td class='DisbursementJob_ID hide'> <input name='Delete' id='" + item.DisbursementJob_ID + "' type='checkbox' value='" + item.DisbursementJob_ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='InquiryNumber hide' style=text-transform:uppercase' >" + item.InquiryNumber + "</td>"
                     + "<td class='JobNumber' style=text-transform:uppercase' >" + item.JobNumber + "</td>"
                    + "<td class='IssueDate' style=text-transform:uppercase' >" + ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) + "</td>"
                    + "<td class='OwnerName' style=text-transform:uppercase' >" + item.OwnerName + "</td>"
                    + "<td class='Vessel_Name text-overflow-150' title='" + item.Vessel_Name + "'>" + item.Vessel_Name + "</td>"
                    + "<td class='ETA_PortName' style=text-transform:uppercase' >" + item.ETA_PortName + "</td>"
                  // + "<td class='Vessel_Name' style=text-transform:uppercase' >" + item.Vessel_Name + "</td>"
                    + "<td class='JobType' style=text-transform:uppercase' >" + item.JobType + "</td>"
                    + "<td class='Voyage hide' style=text-transform:uppercase' >" + item.VoyageNumber + "</td>"
                    + "<td class='CharterName hide' style=text-transform:uppercase' >" + item.CharterName + "</td>"
                    + "<td class='NominatoreName hide' style=text-transform:uppercase' >" + item.NominatoreName + "</td>"
                    + "<td class='CargoOperatorName hide' style=text-transform:uppercase' >" + item.CargoOperatorName + "</td>"
                    //+ "<td class=''><a href='#InvoiceTemplateModalCopy' data-toggle='modal' onclick='CopyTemplate(" + item.ID + "," + item.IsDefault + "," + item.PortID + "," + item.IsClosed + ", " + item.InvoiceTypeID + ");' " + " class='btn btn-xs btn-rounded btn-lightblue' title='Edit'> <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>" + "</a></td>"

                    ///////////////sherif
                    //+ "<td class=''><a href='#' data-toggle='modal' onclick='InvoiceTemplate_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
        + "</tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblJobs", "ID", "cb-CheckAll");
    CheckAllCheckbox("HeaderDeleteJobID");
    //HighlightText("#tblJobs>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PortJob_EditByDblClick(jobID) {
    debugger;
    $("#slDisbursementJobs").val(jobID);
    $.getJSON("/api/Voucher/GetListJobNotes", { pWhereClause: jobID }, function (Result) {
        if (Result) {
            debugger;
            $("#txtNotes").val(Result[0]);

        }

    });
    jQuery("#div-JobModel").modal("hide");
}
function portJobs_LoadingWithPaging() {
    debugger;
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = PortJob_GetWhereClause();
    var pOrderBy = "Estimation_ID";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                 });
}

function PortJob_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 and IsClosed=0  ";
    // var pWhereClause = " WHERE 1=1 and JobType='P' and IsClosed=0  ";
    if ($("#txJobNumberSrch").val().trim() != "") {
        pWhereClause += " and DAS_vwDisbursementJobs.JobNumber like N'%" + $("#txJobNumberSrch").val().trim() + "%' ";
    }
    if ($("#txtJobTypeSrch").val().trim() != "") {
        pWhereClause += " and DAS_vwDisbursementJobs.JobType like N'%" + $("#txtJobTypeSrch").val().trim() + "%' ";
    }
    if ($("#SlVessel_IDS").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.Vessel_ID=" + $("#SlVessel_IDS").val();
    }
    if ($("#SlClient").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.OwnerID=" + $("#SlClient").val();
    }
    if ($("#SlPortName").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.ETA_Port_ID=" + $("#SlPortName").val();
    }
    if ($("#cbIsDateFilter").prop('checked') == true) {
        if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != "") {

            pWhereClause += " and cast( DAS_vwDisbursementJobs.IssueDate as date) between '" + ConvertDateFormat($("#txtFromDate").val()) + "' and ";
            pWhereClause += "  '" + ConvertDateFormat($("#txtToDate").val()) + "' ";
        }
    }

    return pWhereClause;
}

function PortBtnSearchJob_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 and IsClosed=0  ";
    // var pWhereClause = " WHERE 1=1 and JobType='P' and IsClosed=0  ";
    if ($("#txJobNumberSrch").val().trim() != "") {
        pWhereClause += " and DAS_vwDisbursementJobs.txJobNumberSrch like N'%" + $("#txJobNumberSrch").val().trim() + "%' ";
    }
    if ($("#txtJobTypeSrch").val().trim() != "") {
        pWhereClause += " and DAS_vwDisbursementJobs.JobType like N'%" + $("#txtJobTypeSrch").val().trim() + "%' ";
    }
    if ($("#SlVessel_IDS").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.Vessel_ID=" + $("#SlVessel_IDS").val();
    }
    if ($("#SlClient").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.OwnerID=" + $("#SlClient").val();
    }
    if ($("#SlPortName").val() != 0) {
        pWhereClause += " and DAS_vwDisbursementJobs.ETA_Port_ID=" + $("#SlPortName").val();
    }
    if ($("#cbIsDateFilter").prop('checked') == true) {
        if ($("#txtFromDate").val().trim() != "" && $("#txtToDate").val().trim() != "") {

            pWhereClause += " and cast( DAS_vwDisbursementJobs.IssueDate as date) between '" + ConvertDateFormat($("#txtFromDate").val()) + "' and ";
            pWhereClause += "  '" + ConvertDateFormat($("#txtToDate").val()) + "' ";
        }
    }

    return pWhereClause;
}

function PortJob_ClearAllControls() {
    debugger;
    ClearAll("#JobModal");
    $("#liJob").siblings().removeClass("active");
    $("#liJob").addClass("active");
    $("#divJob").siblings().removeClass("active");
    $("#divJob").addClass("active");

    $("#btnSave").attr("onclick", "PortJob_Insert();");
    //$("#btnSaveandNew").attr("onclick", "ShippingOrder_Insert(true);");
}

function SL_dc_PortJobSearch_LoadingWithPaging(pPageNo, pPageSize) {
    debugger;


    var pWhereClause = PortBtnSearchJob_GetWhereClause();
    var pPageSize = $('#select-page-size1').val();
    var pPageNumber = pPageNo;
    var pOrderBy;
    pOrderBy = "JobNumber";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNo, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { PortJob_BindTableRows(JSON.parse(pData[0])); });

}
$('input[type=checkbox][name=cbIsDateFilter]').change(function () {
    debugger;
    if ($(this).prop('checked') == true) {
        $("#txtFromDate").removeAttr("disabled");
        $("#txtToDate").removeAttr("disabled");
    }
    else {
        $("#txtFromDate").attr("disabled", "disabled");
        $("#txtToDate").attr("disabled", "disabled");
    }
});

function PortJob_BtnSearchInti() {
    strLoadWithPagingFunctionName = "/api/DAS_DisbursementJobs/Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned";

    var pWhereClause = " WHERE 1=1";
    var pOrderBy = "JobNumber";
    var pPageNumber = 1;
    var pPageSize = 10;
    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }

    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager1", "select-page-size1", "spn-first-page-row1", "spn-last-page-row1", "spn-total-count1", "div-Text-Total1", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
                 , function (pData) {
                     PortJob_BindTableRows(JSON.parse(pData[0]));
                     FillListFromObject(null, 16/*pName*/, "Select Vessel", "SlVessel_IDS", pData[3], null);
                     FillListFromObject(null, 2/*pName*/, "Select Client", "SlClient", pData[2], null);
                     FillListFromObject(null, 18/*pName*/, "Select Port Name", "SlPortName", pData[4], null);
                 });
}

debugger;
if ($('#slInvoice').val() != 0 || $('#slInvoice').val() != "" || $('#slInvoice').val() != null) {
    $('#slInvoice').on('change', function () {
        debugger;
        if ($(this).val() != "") {
            LoadAll("/api/PS_ClientDbtCrdtNotes/LoadInvoicesDetailsByInvoiceID", "where InvoiceID = " + $('#slInvoice').val(), function (pTabelRows) {
                PS_ClientDbtCrdtNotesDetails_BindTableRows(pTabelRows[0]);
                //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
                //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
                //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);JSON.parse(pTabelRows[1])[0].Discount

                debugger;
                //$("#cbRatio").val(JSON.parse(pTabelRows[1])[0].isDiscount);
                //if (JSON.parse(pTabelRows[1])[0].DiscountType==true) {
                //    $('#cbRatio').prop('checked', true)
                //    $("#txtDiscount").val(JSON.parse(pTabelRows[1])[0].DiscountPercentage);

                //}
                //else {
                //    $('#cbRatio').prop('checked', false)
                //    $("#txtDiscount").val(JSON.parse(pTabelRows[1])[0].Discount);
                //}
                $("#lblWithHoldingValue").val(JSON.parse(pTabelRows[1])[0].Discount);
              
                //$("#slDisbursementJobs").val(JSON.parse(pTabelRows[1])[0].JobID);


                setTimeout(function () {
                    //CalculateAll();
                    SL_HideShowEditBtns(_IsApproved, _HasTransactions);
                    CalculateTotalExpenses();
                }, 300);

            });
        }
    });
}
//function LoadInvoiceDetailsByInvoiceID() {
//    debugger;

//    LoadAll("/api/PS_ClientDbtCrdtNotes/LoadInvoicesDetailsByInvoiceID", "where InvoiceID = " + $('#slInvoice').val(), function (pTabelRows) {
//        PS_ClientDbtCrdtNotesDetails_BindTableRows(pTabelRows[0]);
//        //SL_InvoicesExpenses_BindTableRows(pTabelRows[1]);
//        //SL_InvoicesTaxes_BindTableRows(pTabelRows[2]);
//        //SL_InvoicesWasataDetails_BindTableRows(pTabelRows[3]);


//        setTimeout(function () {
//            //CalculateAll();
//            SL_HideShowEditBtns(_IsApproved, _HasTransactions);
//        }, 300);

//    });


    
//}