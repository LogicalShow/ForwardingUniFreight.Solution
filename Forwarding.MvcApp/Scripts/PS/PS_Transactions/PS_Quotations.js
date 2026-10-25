

var _IsApproved = false;
var _HasTransactions = false;
var _TotalItems = 0.00000;
var _TotalExpenses = 0.00000;
var _TotalTaxes = 0.00000;
var _JVID = 0;

var printControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right hide' title='Edit'> <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Print") + "</span>";

//**************************************
var lang = "";
$(document).ready(function () {
    lang = $("[id$='hf_ChangeLanguage']").val() 
    CheckIfAllLoading();
});

function PrintQuotation(QuotationID)
{
    FadePageCover(true);
    if (QuotationID == 0)
        QuotationID = $('#hID').val();
    $('#hExportedTable').html('');
    LoadAll("/api/PS_Quotations/LoadDetails", "where ID = " + QuotationID, function (data) {
        var pReportTitle = " Quotation - عرض سعر ";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _Details = JSON.parse(data[0]);
        //****************** fill html table *************************************************
        var pTablesHTML = "";
        var ItemsCellsClass = "ForItems";
        var HasItems = false;
        var TotalAmount = 0.00;
        var _InvDate = "";
        var _InvCurrency = "";
        var _SupplierName = "";
        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Fill Details xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        pTablesHTML += '<table id="tblInvDetails" style="" class="table table-striped text-sm table-bordered" >';
        pTablesHTML += '<thead>';
        pTablesHTML += '<th>' + (lang == "ar" ? "البند" : "Item") + '</th>';
       
        pTablesHTML += '<th class="' + ItemsCellsClass + '">' + (lang == "ar" ? "الكمية" : "Qty") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "الوحدة" : "Unit") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "السعر" : "Price") + '</th>';
        pTablesHTML += '<th>' + (lang == "ar" ? "ملاحظات" : "Notes") + '</th>';
        pTablesHTML += '</thead>';
        pTablesHTML += '<tbody>';

        //hExportedTable
        $(_Details).each(function (i, item)
        {
            var name = '';
            if (item.D_ItemID != null && item.D_ItemID != 0) {
                name = item.D_ItemName;
                HasItems = true;
            }
            else
            {
                name = item.D_ServiceName;
            }

            pTablesHTML += '<tr>';
            pTablesHTML += '<td>' + name + '</td>';
            pTablesHTML += '<td>' + item.D_UnitName + '</td>';
            pTablesHTML += '<td class="' + ItemsCellsClass + '">' + parseFloat(item.D_Quantity).toFixed(2) + '</td>';
            pTablesHTML += '<td>' + item.Price + '</td>';
            pTablesHTML += '<td>' + item.D_Notes + '</td>';
            pTablesHTML += '</tr>';


            if ($(_Details).length - 1 == i) {

                _InvDate = GetDateFromServer(item.QuotationDate);
                _InvCode = item.QuotationNo;
                _InvNotes = item.Notes;
                _InvRequestNo = item.RequestNo;
                _InvBranch = item.BranchName;
                _InvDepartment = item.DepartmentName;
                _InvCreator = item.CreatorName;
                _SupplierName = item.SupplierName;

                //pTablesHTML += '<tr>';
                //pTablesHTML += '<td colspan="5"><b style="float:right; border:solid 1px;">' + (lang == "ar" ? " المجموع " : " Total ") + ' ' + parseFloat(TotalAmount).toFixed(2) + ' ' + _InvCurrency + '</b></td>';
                //pTablesHTML += '</tr>';
            }
        });
        pTablesHTML += '</tbody></table>';




        $('#hExportedTable').html(pTablesHTML);

        if (!HasItems)
        {
            $('.ForItems').addClass('hide');

        }



        debugger;
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html ' + (lang == "ar" ? 'dir="rtl"' : '') + '>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body id="" style="background-color:white;">';

        ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
        ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '         <div id="Reportbody">';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h2 style="font-family:\'Arial black\'">' + pReportTitle + '</h2></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3 style="font-family:\'Arial black\'">' + _SupplierName + '</h3></div> </br>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  رقم العرض " : "  Quotation No ") + ': </b> ' + _InvCode + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  تاريخ العرض " : "  Date ") + ': </b> ' + _InvDate + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  طلب شراء رقم " : "  Request NO ") + ': </b> ' + _InvRequestNo + '</div>';

        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  فرع " : "  Branch ") + ': </b> ' + _InvBranch + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>' + (lang == "ar" ? "  قسم " : "  Department ") + ': </b> ' + _InvDepartment + '</div>';


        

        ReportHTML += '                 <div class="col-xs-6"><b>' + (lang == "ar" ? "  الطباعة " : " Print on ") + ' :</b> ' + TodaysDateddMMyyyy + ' ' + $('#sp-LoginName').html() + '</div>';
        ReportHTML += '         <div> &nbsp; </div>';
        ReportHTML += $('#hExportedTable').html();
        ReportHTML += '         </div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        // $("#hExportedTable").html(ReportHTML);
        mywindow.document.close();
        FadePageCover(false)
    });
}

function CheckIfAllLoading() {
    if (typeof $('#slSupplierID option') === "undefined" || $('#slSupplierID option').length == 0) {
        FadePageCover(true)
        setTimeout(function () {

            CheckIfAllLoading();
        }, 500);
    }
    else {

        FadePageCover(false);
    }

}

function IntializePage() {
    debugger;
    var WhereClause = " Where ISNULL(vwPS_Quotations.IsDeleted , 0) = 0";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Quotations/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Quotations_BindTableRows(pTabelRows); });
    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Quotations/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: null },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            debugger
            //[0] clients , //[1] currencies ,//[2] paymentmethod ,//[3] stores ,//[4] costecenter ,
            //Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- ALL Supplier -->', '#slSupplier_Filter', '');
            ////-------
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'Name', '<-- SELECT Supplier -->', '#slSupplierID', '');
                                                                                                   
            Fill_SelectInputAfterLoadData_WithAttr(d[1], 'ID', 'Code', null, '#slCurrencyID', "83", 'ExchangeRate');
            //-------
           // Fill_SelectInputAfterLoadData(d[4], 'ID', 'CostCenterName', '<-- SELECT CostCenter  -->', '#slCostCenter_ID', '');
            //------
            Fill_SelectInputAfterLoadData_WithMultiAttr(d[5], 'ID', 'Name', '<----------- ITEMS ---------->', '#hidden_slItems', '', 'Price,ItemUnits');
            //-------
            Fill_SelectInputAfterLoadData(d[7], 'ID', 'Name', '<---------- SERVICES -------->', '#hidden_slServices', '');
            //-------
            Fill_SelectInputAfterLoadData(d[9], 'ID', 'Name', '<-- SELECT UNIT -->', '#hidden_slUnits', '');
            //*******
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[12], 'ID', 'RequestNo,Name', '-', 'Select Request No - اختر الطلب', '#slPurchasingRequest', '', 'RequestNo');


            $('#txtQuotationDate').val(getTodaysDateInddMMyyyyFormat());

            $("#txtQuotationDate").datepicker().on('changeDate'
                , function () {
                    $(this).datepicker('hide');
                   // RecalculateExchangeRate();

                });
            $("#txtQuotationDate").datepicker().on('keydown', function (ev) { if (ev.keyCode == 9) $(this).datepicker('hide'); });

  



            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! This is print region !", "");
            FadePageCover(false);
        }
    });

}

//#region Public
function PS_HideShowEditBtns(IsApproved, HasTransactions)
{
    _IsApproved = IsApproved;
    _HasTransactions = HasTransactions;

    

    if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0")
    { // is [ New ]
        $('.Edit-btn').removeClass('hide');
        $('.Edit-input').prop('disabled', false);
        $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
    }
    else // is [ Update ]
    {
       
        if ($("#hf_CanEdit").val() != 1 || $('#htxtIsApproved').val() == 'true' ) {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', true);

        }
        else {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', false);

        }

        $('#slPurchasingRequest').prop('disabled', true);
    }

    $('.selectunit').prop('disabled', true);
    $('.selectitem').prop('disabled', true);
    $('.selectservice').prop('disabled', true);
    
    //$('.inputtaxvalue').prop('disabled', true);
   // $('.inputtaxamount ').prop('disabled', true);
    // $('.inputtaxamount ').prop('disabled', true);


}

function RecalculateExchangeRate()
{
    var currencyid = $('#slCurrencyID').val();
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0")

    }


    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Quotations/IntializeData",
        data: { pDate: ConvertDateFormat($('#txtQuotationDate').val()), pID : $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d)
        {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', currencyid, 'ExchangeRate');
           // Fill_SelectInputAfterLoadData(d[1] , 'ID' , 'Code' , 'Select Good Receipt Note' , '#slTransaction', $('#hID').val());
            CalculateAll();
            FadePageCover(false);
        },
        error: function (jqXHR, exception)
        {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });

}

function IntializeData(callback) {
    FadePageCover(true);
    ItemsRowsCounter = 0;
    ExpensesRowsCounter = 0;
    TaxesRowsCounter = 0;
    _IsApproved = false;
    //console.log("hid " + );
    console.log($('#hID').val());
    if ($('#hID') == null || $('#hID').val() == "")
    {
        $('#hID').val("0");
    }


    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    $('#tblItems > tbody').html('');

    $('#txtQuotationDate').val(getTodaysDateInddMMyyyyFormat());

    $('#txtQuotationNo').val("Auto");
    $('#slSupplierID').val("0");

    $.ajax({
        type: "GET",
        url: strServerURL + "/api/PS_Quotations/IntializeData",
        data: { pDate: ConvertDateFormat(getTodaysDateInddMMyyyyFormat()), pID: $('#hID').val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[0], 'ID', 'Code', null, '#slCurrencyID', '', 'ExchangeRate');
            Fill_SelectInputAfterLoadData_WithMultiAttrAndMultiFields(d[2], 'ID', 'RequestNo,Name', '-', 'Select Request No - اختر الطلب', '#slPurchasingRequest', '', 'RequestNo');




            FadePageCover(false);


            if (typeof callback !== "undefined") {
                callback();

            }


        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}
function ClearApprovedIsHasTransactions() {
    //_IsApproved = false;
    //_HasTransactions = false;
    $('#htxtIsApproved').val('false');
    $('#htxtHasTransactions').val('false');
    PS_HideShowEditBtns(false);
}
          
function PS_Quotations_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PS_QuotationsModal", null);
    $('#hID').val("0");
    $('#slSupplierID').val("0");
    $('#slCurrencyID').val("0");
    $('#slPurchasingRequest').val("0");
    $("#btnSave").attr("onclick", "PS_Quotations_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PS_Quotations_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    $('#txtQuotationNo').val("Auto");
    $('#txtQuotationNoManual').prop("disabled" , false);
   //('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#btnPrint2').addClass('hide');
   //('#slPaymentMethodID').val("50");
    //_IsApproved = false;
    //_HasTransactions = false;
    _JVID = 0;


    //var IsStartManual = IsNull($('#hReadySlOptions option[value="2030"]').attr("OptionValue"), "false");
    //if (IsStartManual == "true")
    //    $("#cbIsFromTrans").prop("checked", false);
    //else
    //    $("#cbIsFromTrans").prop("checked", true);


    IntializeData(function () { /*PS_HideShowEditBtns(false);*/ });
   
}
function LoadDetails()
{
    debugger;

        LoadAll("/api/PS_Quotations/LoadDetails", "where ID = " + $('#hID').val(), function (pTabelRows)
        {
            PS_QuotationsDetails_BindTableRows(pTabelRows[0]);

            setTimeout(function () {
                setTimeout(function () {

                    PS_HideShowEditBtns(_IsApproved);
                }, 300);

            }, 1500);

        });
    
   
}

function LoadRequestDetails(THIS_PurchasingRequest) {
    debugger;

    LoadAll("/api/PS_PurchasingRequest/LoadDetails", "where ID = " + $(THIS_PurchasingRequest).val(), function (pTabelRows) {
        PS_PurchasingRequestDetails_BindTableRows(pTabelRows[0]);

        setTimeout(function () {
            setTimeout(function () {

                PS_HideShowEditBtns(_IsApproved);
            }, 300);

        }, 1500);

    });


}


//#endregion Public

//#region Header
function PS_Quotations_BindTableRows(pPS_Quotations) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ClearAllTableRows("tblPS_Quotations");
    $.each(pPS_Quotations, function (i, item) {
        debugger;
        var disable = "";
        if (item.IsApproved == true) {
            disable = "disabled = disabled";
        }

        var UploadText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Upload") + "</span>";



        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPS_Quotations",
            ("<tr ID='" + item.ID + "' ondblclick='PS_Quotations_EditByDblClick(" + item.ID + " , " + item.IsApproved + "); '>"
                + "<td class='ID'> <input " + disable + " name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='QuotationNo' val='" + item.QuotationNo + "'>" + item.QuotationNo + "</td>"
                + "<td class='QuotationNoManual' val='" + item.QuotationNoManual + "'>" + item.QuotationNoManual + "</td>"
                + "<td class='QuotationDate' val='" + GetDateFromServer(item.QuotationDate) + "'>" + GetDateFromServer(item.QuotationDate) + "</td>"
                + "<td class='SupplierID hide' val='" + item.SupplierID + "'>" + item.SupplierID + "</td>"

                + "<td class='PurchasingRequestID' val='" + item.PurchasingRequestID + "'>" + item.RequestNo + '-' + item.RequestNoManual + '-' + GetDateFromServer(item.RequestDate) + "</td>"



                + "<td class='BranchID' val='" + item.BranchID + "'>" + item.BranchName + "</td>"
                + "<td class='DepartmentID' val='" + item.DepartmentID + "'>" + item.DepartmentName + "</td>"

                + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"


                + "<td class='CostCenter_ID hide' val='" + item.CostCenter_ID + "'>" + item.CostCenterName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"



                + "<td class='CreatedUserID hide' val='"  + item.CreatedUserID + "'>" + item.CreatedUserID + "</td>"
                + "<td class='EditedByUserID hide' val='" + item.EditedByUserID + "'>" + item.EditedByUserID + "</td>"
                + "<td class='ApprovedUserID hide' val='" + item.ApprovedUserID + "'>" + item.ApprovedUserID + "</td>"
                + "<td class='CreatedDate hide' val='" + GetDateFromServer(item.CreatedDate) + "'>" + GetDateFromServer(item.CreatedDate) + "</td>"
                + "<td class='EditedDate hide' val='"     + GetDateFromServer(item.EditedDate) + "'>" + GetDateFromServer(item.EditedDate) + "</td>"
                + "<td class='ApprovedDate hide' val='"   + GetDateFromServer(item.ApprovedDate) + "'>" + GetDateFromServer(item.ApprovedDate) + "</td>"

                + "<td class='IsApproved'> <input type='checkbox' disabled='disabled' val='" + (item.IsApproved == true ? "true' checked='checked'" : "'") + " /></td>"


                + "<td class='hPS_Quotations hide'><a href='#PS_QuotationsModal' data-toggle='modal' onclick='PS_Quotations_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
                + "<td class='Upload'><a href='#tabUploadFiles' data-toggle='modal' onclick='UploadFiles(" + item.ID + ");' " + UploadText + "</a></td>"

                + "<td class='pPS_Quotations'><a href='#' onclick='PrintQuotation(" + item.ID + ");' " + printControlsText + "</a></td></tr > "));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPS_Quotations", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPS_Quotations>tbody>tr", $("#txt-Search").val().trim());
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

function PS_Quotations_EditByDblClick(pID, pIsApproved, pHasTransactions)
{
    _IsApproved = pIsApproved;
    _HasTransactions = pHasTransactions;
    $('#btnPrint2').removeClass('hide');
    jQuery("#PS_QuotationsModal").modal("show");

    if (pHasTransactions == true)
    {
        _HasTransactions = true;
        $('#htxtHasTransactions').val("true");
    }
    else
    {
        _HasTransactions = false;
        $('#htxtHasTransactions').val("false");
    }

    //-----------------------------------------------------------------------------------------
    if (pIsApproved == true || pIsApproved == "true")
    {
        $('#htxtIsApproved').val("true");
        console.log("$('#htxtIsApproved').val('true');")
    }
    else
    {
        $('#htxtIsApproved').val("false");
        console.log("$('#htxtIsApproved').val('false');")
    }
    PS_Quotations_FillControls(pID);
}

function PS_Quotations_LoadingWithPaging()
{
    debugger;
    var WhereClause = " Where ISNULL(vwPS_Quotations.IsDeleted , 0) = 0 ";

    if ($('#txtQuotationNo_Filter').val().trim() != "") {
        WhereClause += " AND QuotationNo = '" + $('#txtQuotationNo_Filter').val() + "'";
    }
    //if ($('#txtSupplierQuotationNo_Filter').val().trim() != "") {
    //    WhereClause += " AND SupplierQuotationNo LIKE '%" + $('#txtSupplierQuotationNo_Filter').val() + "%'";
    //}
    //if ($('#txtTotalPrice_Filter').val().trim() != "") {
    //    WhereClause += " AND TotalPrice LIKE '%" + $('#txtTotalPrice_Filter').val() + "%'";
    //}
    //if ($('#slSupplier_Filter').val().trim() != "0") {
    //    WhereClause += " AND SupplierID = " + $('#slSuppliers_Filter').val() + "";
    //}
    //if ($('#slCurrency_Filter').val().trim() != "0") {
    //    WhereClause += " AND CurrencyID = " + $('#slCurrency_Filter').val() + "";
    //}
    if ($('#txtFromDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , QuotationDate ) >= CONVERT(date , '" + ConvertDateFormat($('#txtFromDate_Filter').val()) + "')";
    }
    if ($('#txtToDate_Filter').val().trim() != "") {
        WhereClause += " AND CONVERT(date , QuotationDate) <=  CONVERT(date ,'" + ConvertDateFormat($('#txtToDate_Filter').val()) + "')";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Quotations/LoadWithWhereClause", WhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Quotations_BindTableRows(pTabelRows); PS_Quotations_ClearAllControls(); });
    HighlightText("#tblPS_Quotations>tbody>tr", $("#txt-Search").val().trim());
}




function PS_Quotations_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPS_Quotations') != "")
    {
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
                DeleteListFunction("/api/PS_Quotations/Delete", { "pPS_QuotationsIDs": GetAllSelectedIDsAsString('tblPS_Quotations') }, function () { PS_Quotations_LoadingWithPaging(); });
            });
    }
    //DeleteListFunction("/api/PS_Quotations/Delete", { "pPS_QuotationsIDs": GetAllSelectedIDsAsString('tblPS_Quotations') }, function () { PS_Quotations_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function PS_Quotations_FillControls(pID) {
    debugger;
    ClearAll("#PS_QuotationsModal", null);
    $('#btnPrint2').removeClass('hide');
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);


    IntializeData(function () {
        setTimeout(function () {
            var tr = $("#tblPS_Quotations > tbody > tr[ID='" + pID + "']");
            FadePageCover(true)

           $("#slSupplierID").val($(tr).find("td.SupplierID").attr('val'));
           $("#slCurrencyID").val($(tr).find("td.CurrencyID").attr('val'));
            $("#slPurchasingRequest").val($(tr).find("td.PurchasingRequestID").attr('val'));

            $("#txtQuotationNo").val($(tr).find("td.QuotationNo").attr('val'));
            $("#txtQuotationNoManual").val($(tr).find("td.QuotationNoManual").attr('val'));
            $("#txtNotes").val($(tr).find("td.Notes").attr('val'));


            window.CreatedUserID = $(tr).find("td.CreatedUserID").attr('val');
            window.EditedByUserID = $(tr).find("td.EditedByUserID").attr('val');
            window.ApprovedUserID = $(tr).find("td.ApprovedUserID").attr('val');
            window.CreatedDate = $(tr).find("td.CreatedDate").attr('val');
            window.EditedDate = $(tr).find("td.EditedDate").attr('val');
            window.ApprovedDate = $(tr).find("td.ApprovedDate").attr('val');
            window.ExchangeRate = $(tr).find("td.ExchangeRate").attr('val');


        $("#btnSave").attr("onclick", "PS_Quotations_Save(false);");
            $("#btnSaveandNew").attr("onclick", "PS_Quotations_Save(true);");
            FadePageCover(false)
        }, 1000);
        setTimeout(function () {
            LoadDetails(false);
        }, 1000);

    });
  
}




function GetInsertUpdateParameters()
{
    debugger
    var QuotationNo = (($('#txtQuotationNo').val() == "" || $('#txtQuotationNo').val() == "Auto") ? "0" : $('#txtQuotationNo').val());
    var QuotationNoManual = (($('#txtQuotationNoManual').val() == "" || $('#txtQuotationNoManual').val() == "Auto") ? "0" : $('#txtQuotationNoManual').val());
    var QuotationDate = ConvertDateFormat($('#txtQuotationDate').val());
    var Notes = ($('#txtNotes').val() == "" ? "0" : $('#txtNotes').val());
    var DepartmentID = IsNull($('#slDepartments').val(), "0");
    var BranchID = IsNull($('#slBranches').val(), "0");
    var CostCenter_ID = IsNull($('#slCostCenter_ID').val() , "0");
    var IsApproved = _IsApproved;
    var IsDeleted = false;

    var ID = IsNull($('#hID').val(), "0");


    var PurchasingRequestID = IsNull($('#slPurchasingRequest').val(), "0");
    var SupplierID = IsNull($('#slSupplierID').val(), "0");
    var CurrencyID = IsNull($('#slCurrencyID').val(), "0");
    var ExchangeRate = IsNull($('#slCurrencyID option:selected').attr('ExchangeRate'), "1");

    return {
        "pID": ID,
        "pQuotationNo" : QuotationNo,
        "pQuotationDate": QuotationDate,
        "pNotes": Notes,
        "pPurchasingRequestID": PurchasingRequestID,
        "pSupplierID": SupplierID,
        "pCurrencyID": CurrencyID,
        "pExchangeRate": ExchangeRate,

        "pIsApproved": $('#htxtIsApproved').val(),
        "pQuotationNoManual": QuotationNoManual,
        "pIsDeleted": IsDeleted,
        "pCreatedUserID": (IsNull($('#hID').val() , "0") == "0" ? "0" :  window.CreatedUserID) ,
        "pEditedByUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" :window.EditedByUserID ),
        "pApprovedUserID": (IsNull($('#hID').val(), "0") == "0" ? "0" : window.ApprovedUserID),
        "pCreatedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat( window.CreatedDate)),
        "pEditedDate": (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.EditedDate) ),
            "pApprovedDate" : (IsNull($('#hID').val(), "0") == "0" ? "01/01/1900" : ConvertDateFormat(window.ApprovedDate) )
    };
}

function PS_Quotations_Save(pSaveandAddNew) {
    IsInsert = true;
    var _Suceess = true;

    FadePageCover(true)
    
    if (IsNull($('#slPurchasingRequest').val(), "0") == "0" || IsNull($('#slSupplierID').val(), "0") == "0" ) {
        swal((lang == "ar" ? 'معذرة' : 'Excuse me') , (lang == "ar" ? 'من فضلك اختر الطلب او المورد': 'You must Select Request or Supplier')  , 'warning');
        FadePageCover(false)
        _Suceess = false;
    }



    if ($('#tblItems > tbody > tr').length == 0)//&& $('#tbExpenses > tbody > tr').length == 0)
    {
       // swal('Excuse me', 'You must insert Items or Services', 'warning');
        swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'يجب ادخال الاصناف او الخدمات' : 'You must insert Items or Services'), 'warning');
        FadePageCover(false)
        _Suceess = false;
    }
    else {
        if ($('#tblItems > tbody > tr').length > 0) {

            $($('#tblItems > tbody > tr')).each(function (i, tr) {
                debugger;
                var itemid = $(tr).find('td.ItemID').find('.selectitem').val();
                var serviceid = $(tr).find('td.ServiceID').find('.selectservice').val();
                var Qty = $(tr).find('td.Qty').find('.input_quantity').val();
                var Price = $(tr).find('td.Price').find('.input_price').val();
                var ItemUnitID = $(tr).find('td.UnitID').find('.selectunit').val();

                if ((itemid.trim() == "" || itemid.trim() == "0" || itemid == null) && $(tr).attr('tag') == "item") {
                   // swal('Excuse me', 'Fill  Items', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الاصناف' : 'Fill  Items'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((ItemUnitID == null || ItemUnitID.trim() == "" || ItemUnitID.trim() == "0") && $(tr).attr('tag') == "item") {
                   // swal('Excuse me', 'Fill  Items Units', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الوحدات' : 'Fill  Items Units'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if ((serviceid.trim() == "" || serviceid.trim() == "0" || serviceid == null) && $(tr).attr('tag') == "service") {
                   // swal('Excuse me', 'Fill  Services', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'اختر الخدمات' : 'Fill   Services'), 'warning');
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }
                if (Qty.trim() == "" || Qty.trim() == "0" || Qty == null) {
                   // swal('Excuse me', 'Fill All Items Quantity', 'warning');
                    swal((lang == "ar" ? 'من فضلك' : 'Excuse me'), (lang == "ar" ? 'ادخل الكميات' : 'Fill All Items Quantity'), 'warning');
                  //  Services
                    FadePageCover(false)
                    _Suceess = false;
                    return false;
                }


            });
        }


    }

   // console.log(GetInsertUpdateParameters());

    if (_Suceess == true) {
        FadePageCover(true)
        setTimeout(function () {
            debugger
            FadePageCover(true)
            PostInsertUpdateFunction("form", "/api/PS_Quotations/Save", GetInsertUpdateParameters(), pSaveandAddNew, null,

                function (res) {
                    // if (data[0] != 0) { 
                    // swal($('#hID').val());
                    $('#hID').val(res[1])
                    var ListOfListOfObject = [];
                    ListOfListOfObject.push(SetArrayOfItems());

                    InsertUpdateListOfObject("/api/PS_Quotations/InsertItems",
                        ListOfListOfObject
                        , pSaveandAddNew, "PS_QuotationsModal", function (data) {
                            FadePageCover(true)
                            setTimeout(function () {
                                PrintQuotation(res[1]);
                                PS_Quotations_LoadingWithPaging();
                            }, 300);

                        });
                });


        }, 30);
    }
}

function InsertUpdateFunctionAndReturnID_Special(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, phID, callback) {
    debugger;
    if (ValidateForm(pValidateFormID, pModalID)) {
        FadePageCover(true);
        $.ajax({
            type: "POST",
            url: strServerURL + pFunctionName,
            data: JSON.stringify( pParametersWithValues),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () { },
            success: function (data) {
                debugger;
                if (data != undefined && data.length > 1) {
                    if (data != 0) {
                        $(phID).val(data[0]);
                        if (callback != null && callback != undefined) {
                            if (data[1] != null && data[1] != undefined) //data[1] is the ID: for opening quotation or operation after saving a new one / or strMessageReturned
                                callback(data);
                        }

                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                //  $('#' + pModalID).modal('hide');
                            })(jQuery);
                        }
                    }
                    else //data[0] = false
                        //swal(strSorry, strUniqueFailInsertUpdateMessage, "warning");
                        swal(strSorry, data[1]);
                }
                else {
                    if (data != 0) {
                        $(phID).val(data);
                        if (callback != null && callback != undefined) {
                            callback();
                        }
                        if (!pSaveandAddNew && pModalID != null) {
                            jQuery.noConflict();
                            (function ($) {
                                // $('#' + pModalID).modal('hide');
                            }
                            )(jQuery);
                        }
                    }
                    else //unique key violated
                        swal(strSorry, "the date must >= Good Receipt Note Date    [OR]    [Is Approved]");
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
function PS_Quotations_Delete() {
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
        function () {
            InsertUpdateFunction("form", "/api/PS_Quotations/Delete",
                { 'pTransactionsID': $('#hID').val(), 'pTransactionDate': ConvertDateFormat($('#txtDate').val()) + " 07:00:00 PM" }
                , false, "PS_QuotationsModal", function (data) {
                    if (data[1].trim() == '') {
                        PS_Quotations_LoadingWithPaging();
                        //IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });
        });

}





//#endregion Header


//#region Details


var ItemsRowsCounter = 0;

function AddNewItemsRow(type) {
    if (type == 1) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID ' val='" + "0" + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID hide' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"

                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "<input   type='text' class='input_price input-sm  col-sm'>" + "</td>"

                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));



    }
    else {
        AppendRowtoTable("tblItems",
            ("<tr ID='" + 0 + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + "0" + "' /></td>"
                + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + 0 + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                + "<td class='ItemID hide ' val='" + "0" + "'>" + "<select style='max-width:200px;' id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                + "<td class='ServiceID' val='" + "0" + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + "0" + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + "0" + "'>" + "<input   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                + "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + (ItemsRowsCounter + 1) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Price' val='" + "0" + "'>" + "<input   type='text' class='input_price input-sm  col-sm'>" + "</td>"

                + "<td class='Notes' val='" + "0" + "'>" + "<input type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                + "</tr>"));

    }
    //$('#tblItems > tbody > tr').find('td.Discount > input , td.UnitPrice > input').inputmask('decimal', { digits: 5 });
    $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
    $('#tblItems > tbody > tr').find('td.Price > input').inputmask('decimal', { digits: 2 });
    ItemsRowsCounter++;
   // $("#tblItems").find("select").attr('onchange', 'CalculateAll(this);');
    //$("#tblItems").find("input,button,textarea").attr('onblur', 'CalculateAll();');




}

function GetItemPrice(ItemSelect) {
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        $(tr).find('td.UnitPrice input[type="text"]').val(($(tr).find('td.ItemID  select').find('option:selected').attr('price') * 1 /*/ ExchangeRate * 1*/));
    }
}
function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");


        var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

        //if (UnitID == 0 || UnitID == "0")
        //  {
        var a = Units.indexOf("-1");
        $(SelectUnit).val(Units[a - 1]);

        //    }
    }
}
function CopyStores() {
    if ($('#tblItems > tbody > tr[tag="item"]').length > 0) {


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


function PS_QuotationsDetails_DeleteList()
{
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
                DeleteListFunction("/api/PS_Quotations/Delete", { "pPS_QuotationsDetailsIDs": GetAllSelectedIDsAsString('tblPS_QuotationsDetails') }, function () { PS_QuotationsDetails_LoadingWithPaging(); });
            });
}

function DeleteItems(This) {
    if ($(This).attr('tag') == "0" || $(This).attr('tag') == "" || $(This).attr('tag') == null) {
        $(This).closest('tr').remove();
       // CalculateAll();
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
                $(This).closest('tr').remove();
               // CalculateAll();
            });
    }
    //if ($("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("value") == "0") {
    //    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //    ItemsRowsCounter = ItemsRowsCounter - 1;


    //}
    //else {
    //    swal({
    //        title: "Are you sure?",
    //        text: "The selected records will be deleted permanently!",
    //        type: "warning",
    //        showCancelButton: true,
    //        confirmButtonColor: "#DD6B55",
    //        confirmButtonText: "Yes, delete!",
    //        closeOnConfirm: true
    //    },
    //        //callback function in case of success
    //        function () {
    //            $("#tblItems > tbody > tr[counter='" + RowNumber + "']").remove();
    //            ItemsRowsCounter = ItemsRowsCounter - 1;
    //            CalculateAll();
    //        });

    //}

}



function UndoDeleteItems(RowNumber) {

    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").attr("isdeleted", "0");
    $("#tblItems > tbody > tr[counter='" + RowNumber + "']").removeClass('bg-danger');
}

function FillItemsData() {


   if( $('#tblItems > tbody > tr').length > 0)
        FadePageCover(true)

    setTimeout(function () {
    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        $(tr).find('td.ItemID ').find('.selectitem').val($(tr).find('td.ItemID ').find('.selectitem').attr('tag'));
        $(tr).find('td.ServiceID ').find('.selectservice').val($(tr).find('td.ServiceID ').find('.selectservice').attr('tag'));
        $(tr).find('td.Qty').find('.input_quantity').val($(tr).find('td.Qty ').find('.input_quantity').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        $(tr).find('td.Notes ').find('.inputnotes').val($(tr).find('td.Notes ').find('.inputnotes').attr('tag'));
        $(tr).find('td.Price').find('.input_price').val($(tr).find('td.Price ').find('.input_price').attr('tag'));
        if ($('#tblItems > tbody > tr').length - 1 == i) {

           // CalculateAll();
            FadePageCover(false)
        }

    });
   

    }, 100);

}
function PS_QuotationsDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)  )
        {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID) + "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + (typeof item.D_ID === 'undefined' ? "0" : item.D_ID)  + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID)+ "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"

                    + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"


                    + "<td class='Price' val='" + (typeof item.Price === 'undefined' ? item.Price : item.Price) + "'>" + "<input tag='" + (typeof item.Price === 'undefined' ? item.Price : item.Price) + "'   type='text' class='input_price input-sm  col-sm'>" + "</td>"

                    + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }
        else
        {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + item.D_ID + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + item.D_ID + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + item.D_ServiceID + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + item.D_ServiceID + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"
                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"

                    + "<td class='Price' val='" + (typeof item.Price === 'undefined' ? item.Price : item.Price) + "'>" + "<input tag='" + (typeof item.Price === 'undefined' ? item.Price : item.Price) + "'   type='text' class='input_price input-sm  col-sm'>" + "</td>"



                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.D_Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }

        $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;

        //---------------------------------------------------------------------------------

        if (JSON.parse(pItems).length - 1 == i) {
            FillItemsData();
        }



    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {
      
    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}


function PS_PurchasingRequestDetails_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PS").parent().addClass("active");
    ItemsRowsCounter = 0;
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        if ((item.D_ItemID != null && item.D_ItemID != 0) || (item.ItemID != null && item.ItemID != 0)) {
            debugger;
            AppendRowtoTable("tblItems",
                ("<tr ID='" + 0+ "' isdeleted='0' tag='item'   counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                    + " <td class='bg-warning' style ='font-size:15px;' > I </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID hide' val='" + 0 + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"

                    + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                    + "<td class='Price' val='" + 0 + "'>" + "<input tag='" + 0 + "'   type='text' class='input_price input-sm  col-sm'>" + "</td>"

                    + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + "<input tag='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }
        else {
            AppendRowtoTable("tblItems",
                ("<tr ID='" + 0 + "' tag='service' isdeleted='0'  counter='" + (ItemsRowsCounter + 1) + "' value='" + 0 + "'>"
                    + " <td class='btn-lightblue' style='font-size:15px;'> S </td>"
                    + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.D_ID + "' /></td>"
                    + "<td counter='" + (ItemsRowsCounter + 1) + "'> <button tag='" + item.D_ID + "' id='btn-DeleteDetails-" + (ItemsRowsCounter + 1) + "' type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (ItemsRowsCounter + 1) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
                    + "<td class='ItemID hide ' val='" + 0 + "'>" + "<select style='max-width:200px;' onchange='SetItemUnit(this)'  id='Item-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>"
                    + "<td class='ServiceID' val='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID) + "'>" + "<select id='Services-" + (ItemsRowsCounter + 1) + "' tag='" + (typeof item.ServiceID === 'undefined' ? item.D_ServiceID : item.ServiceID)  + "' class='input-sm  col-sm selectservice'>" + $('#hidden_slServices').html() + "</select>" + "</td>"
                    + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + "<input tag='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'   type='text' class='input_quantity input-sm  col-sm'>" + "</td>"

                    + "<td class='UnitID ' val='" + 0 + "'>" + "<select disabled='disabled' id='UnitID-" + (ItemsRowsCounter + 1) + "' tag='" + 0 + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"

                    + "<td class='Price' val='" + 0 + "'>" + "<input tag='" + 0 + "'   type='text' class='input_price input-sm  col-sm'>" + "</td>"

                    + "<td class='Notes' val='" + item.Notes + "'>" + "<input tag='" + item.D_Notes + "' type='text' class='inputnotes input-sm  col-sm'>" + "</td>"
                    + "</tr>"));
        }

        $('#tblItems > tbody > tr').find('td.Qty > input').inputmask('decimal', { digits: 2 });
        ItemsRowsCounter++;

        //---------------------------------------------------------------------------------

        if (JSON.parse(pItems).length - 1 == i) {
            FillItemsData();
        }



    });
    //ApplyPermissions();

    //if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
    //    swal(strSorry, strDeleteFailMessage, "warning");
    //    showDeleteFailMessage = false;
    //}
    //$("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    //setTimeout(function () {

    //    //  PS_HideShowEditBtns(_IsApproved);
    //}, 300);

}



function SC_PurchaseItems_LoadAll() {
    debugger;
    LoadAll("/api/PS_Quotations/LoadItems", "where PurchaseInvoiceID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PS_Quotations/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PS_Quotations_BindTableRows(pTabelRows); PS_Quotations_ClearAllControls(); });
    // HighlightText("#tblPS_Quotations>tbody>tr", $("#txt-Search").val().trim());
}


//var IsOldName = "0";



function SetArrayOfItems() {
    var arrayOfItems = new Array();
    $("#tblItems>tbody>tr").each(function (i, tr) {
        debugger;
        var objItem = new Object();
        objItem.ID = $(tr).attr('value');
        objItem.ItemID = $(tr).find('td.ItemID').find('.selectitem').val();
        objItem.ServiceID = $(tr).find('td.ServiceID').find('.selectservice').val();
        objItem.PSQuotationID = $('#hID').val();
        objItem.Notes = $(tr).find('td.Notes').find('.inputnotes').val();
        objItem.Qty = IsNull($(tr).find('td.Qty').find('.input_quantity').val(), "1");
        objItem.Price = IsNull($(tr).find('td.Price').find('.input_price').val(), "0");
        objItem.UnitID = $(tr).find('td.UnitID').find('.selectunit').val();

        arrayOfItems.push(objItem);
    });
    return arrayOfItems;
}






var all_has_store = false;



//#endregion Details
























// calling this function for update





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
                        //        $("#btnSave").attr("onclick", "PS_Quotations_Save(false);");
                        //        $("#btnSaveandNew").attr("onclick", "PS_Quotations_Save(true);");

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


function InsertUpdateFunction3(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
    debugger;
    console.log(pParametersWithValues);
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
                      //  swal(strSorry, data[1]);

                      //  CallbackHeaderData();


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


