// City Country ---------------------------------------------------------------
// Bind PR_ProductStages Table Rows

var _IsApproved = false;
var TransTypeID = 10;
var RollBackData = {};
var IsInsert = false;
//var IsFromInvoice = false;
var all_has_store = false;





var ErrorMessage = "0";



//#region Header
function PR_ProductStages_BindTableRows(pPR_ProductStages) {
    debugger;
    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblPR_ProductStages");
    $.each(pPR_ProductStages, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblPR_ProductStages",
            ("<tr ID='" + item.ID + "' ondblclick='PR_ProductStages_EditByDblClick(" + item.ID + " , " + item.IsApproved + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ProductID' val='" + item.ProductID + "'>" + item.ProductName + "</td>"
                + "<td class='FromStoreID hide' val='" + item.FromStoreID + "'>" + item.FromStoreID + "</td>"
                + "<td class='ToStoreID hide' val='" + item.ToStoreID + "'>" + item.ToStoreID + "</td>"
                + "<td class='IsDeleted hide' val='" + item.IsDeleted + "'>" + item.IsDeleted + "</td>"
                + "<td class='UnitID' val='" + item.UnitID + "'>" + item.UnitName + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='hPR_ProductStages hide'><a href='#PR_ProductStagesModal' data-toggle='modal' onclick='PR_ProductStages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPR_ProductStages", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PR_ProductStages_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PR_ProductStages/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PR_ProductStages_BindTableRows(pTabelRows); PR_ProductStages_ClearAllControls(); });
    HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
}

function PR_ProductStages_Save(pSaveandAddNew) {
    if ($('#hID').val() == "0" || $('#hID').val() == "")
        IsInsert = true;
    else
        IsInsert = false;

    var Details = SetArrayOfItems();
    if (Details[1] == "" || Details[1] == "0") {



        debugger;
        InsertUpdateFunctionAndReturnID("form", "/api/PR_ProductStages/Save", {
            pID: (($('#hID').val().trim() == "" || $('#hID').val().trim() == "0") ? 0 : $('#hID').val().trim()),
            pProductID: $("#slProductID").val(),
            pFromStoreID: 0,
            pToStoreID: 0,
            pNotes: ($("#txtNotes").val() == null || $("#txtNotes").val() == "" ? "0" : $("#txtNotes").val().replace(/\r?\n/g, "\r\n")),
            pIsDeleted: "false"
        }, pSaveandAddNew, null, '#hID', function () {

            InsertUpdateFunction2("form", "/api/PR_ProductStages/InsertItems",
                JSON.stringify(SetArrayOfItems()[0])
                , pSaveandAddNew, "PR_ProductStagesModal", function () {
                    // $('#txtCode').val(Code[1]);
                    // PrintTransaction();
                    // console.log(Code[0]);
                    //  setTimeout(function () {
                    PR_ProductStages_LoadingWithPaging();
                    // IntializeData();
                    // ClearAllTableRows('tblItems');
                    // all_has_store = false;

                    // }, 500);

                });
        });

    }
    else {
        swal("Sorry", Details[1], 'warning');

    }

}

function PR_ProductStages_EditByDblClick(pID, IsApproved) {
    _IsApproved = IsApproved;
    jQuery("#PR_ProductStagesModal").modal("show");
    PR_ProductStages_FillControls(pID);
    // SC_HideShowEditBtns(IsApproved);
}

function PR_ProductStages_FillControls(pID) {
    debugger;
    //PR_ProductStages_ClearAllControls
    // Fill All Model Controls
    //  $('#btnPrint2').removeClass('hide');
    FadePageCover(true);
    ClearAll("#PR_ProductStagesModal", null);
    $('#btn-Delete2').removeClass('hide');
    $("#hID").val(pID);
    IntializeData(function () {


        var tr = $("#tblPR_ProductStages > tbody > tr[ID='" + pID + "']");
        $("#slProductID").val($(tr).find("td.ProductID").attr('val'));
        $("#txtNotes").val($(tr).find("td.Notes").attr('val').toUpperCase());

        //$("#btnSave").attr("onclick", "PR_ProductStages_Save(false);");
        //$("#btnSaveandNew").attr("onclick", "PR_ProductStages_Save(true);");
        ////$("#hID").val(pID);
        //  FillStages();
        ////setTimeout(function () {
        ////    LoadTransactionsDetails();
        ////}, 300);


        RollBackData.ID = pID;
        RollBackData.ProductID = $(tr).find("td.ProductID").attr('val');
        RollBackData.FromStoreID = $(tr).find("td.FromStoreID").attr('val');
        RollBackData.ToStoreID = $(tr).find("td.ToStoreID").attr('val');
        RollBackData.Notes = $(tr).find("td.Notes").attr('val');
        RollBackData.IsDeleted = false;


    });

    //PR_ProductStages_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);

}

function PR_ProductStages_Delete() {
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

            InsertUpdateFunction("form", "/api/PR_ProductStages/Delete",
                { 'pPR_ProductStagesIDs': $('#hID').val() }
                , false, "PR_ProductStagesModal", function (data) {

                    if (data[1].trim() == '') {
                        PR_ProductStages_LoadingWithPaging();
                        IntializeData();
                        ClearAllTableRows('tblItems');
                    }
                    else {

                        swal("Cannot Delete", data[1], "warning");
                    }
                });



            // DeleteListFunction("/api/PR_ProductStages/Delete", { "pPR_ProductStagesIDs": GetAllSelectedIDsAsString('tblPR_ProductStages') }, function () {  });
        });

}

function PR_ProductStages_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPR_ProductStages') != "")
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
                DeleteListFunction("/api/PR_ProductStages/Delete", { "pPR_ProductStagesIDs": GetAllSelectedIDsAsString('tblPR_ProductStages') }, function () { PR_ProductStages_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/PR_ProductStages/Delete", { "pPR_ProductStagesIDs": GetAllSelectedIDsAsString('tblPR_ProductStages') }, function () { PR_ProductStages_LoadingWithPaging(); });
}


function PR_ProductStages_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#PR_ProductStagesModal", null);
    $("#btnSave").attr("onclick", "PR_ProductStages_Save(false);");
    $("#btnSaveandNew").attr("onclick", "PR_ProductStages_Save(true);");
    $("#cb-CheckAll").prop('checked', false);
    //$('#txtCode').val("Auto");
    //$('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    $('#hID').val("0");
    //(false);
    $('#Stages').html('');
    IntializeData();

}



//#endregion Header


//#region Details

function PR_ProductStagesDetails_BindTableRows(pPR_ProductStagesDetails) {
    debugger;

    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pPR_ProductStagesDetails), function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ItemID ' val='" + item.ItemID + "'>" + $("#hidden_slItems option[value='" + item.ItemID + "']").text() + "</td>"
                + "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + item.Qty + "'>" + item.Qty + "</td>"
                + "<td class='StoreID' val='" + item.StoreID + "'>" + "<select id='store-" + item.ID + "' tag=" + item.StoreID + " class='input-sm  col-sm selectstore .Edit-input'>" + $('#slStores').html() + "</select>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + item.ReturnedQty + "'>" + item.ReturnedQty + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + item.ExchangeRate + "</td>"
                + "<td class='Notes' val='" + item.Notes + "'>" + item.Notes + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + item.PurchaseInvoiceDetailsID + "'>" + item.PurchaseInvoiceDetailsID + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + item.SLInvoiceDetailsID + "'>" + item.SLInvoiceDetailsID + "</td>"
                + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + item.SubAccountID + "</td>"
                + "<td class='OriginalQty hide' val='" + item.OriginalQty + "'>" + item.OriginalQty + "</td>"
                + "<td class='ParentID hide' val='" + item.ParentID + "'>" + item.ParentID + "</td>"
                + "<td class='AveragePrice hide' val='" + item.AveragePrice + "'>" + item.AveragePrice + "</td>"
                + "<td class='TransactionDate hide' val='" + GetDateFromServer(item.TransactionDate) + "'>" + GetDateFromServer(item.TransactionDate) + "</td>"
                + "<td class='QtyFactor hide' val='" + item.QtyFactor + "'>" + item.QtyFactor + "</td>"
                + "<td class='ActualQty hide' val='" + item.ActualQty + "'>" + item.ActualQty + "</td>"
                + "<td class='TransactionTypeID hide' val='" + item.TransactionTypeID + "'>" + item.TransactionTypeID + "</td>"
                + "</tr>"));



    });
    ApplyPermissions();
    //  BindAllCheckboxonTable("tblPR_ProductStages", "ID");
    //  CheckAllCheckbox("ID");
    //  HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {

        // $('#tblItems > tbody > tr').find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);
        // $("#tblItems").find("input,button,textarea,select").attr("disabled", _IsApproved); 

        SC_HideShowEditBtns(_IsApproved);
        FillStores();

    }, 300);

}

function SC_PurchaseItems_BindTableRows(pItems) {
    debugger;
    $("#hl-menu-PR").parent().addClass("active");
    ClearAllTableRows("tblItems");
    $.each(JSON.parse(pItems), function (i, item) {
        debugger;
        AppendRowtoTable("tblItems",
            ("<tr>"
                + "<td class='ID hide'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ItemID ' val='" + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + "'>" + $('#hidden_slItems option[value=' + (typeof item.ItemID === 'undefined' ? item.D_ItemID : item.ItemID) + ']').text() + "</td>"
                + "<td class='UnitID ' val='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "'>" + "<select disabled='disabled' id='UnitID-" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' tag='" + (typeof item.UnitID === 'undefined' ? item.D_UnitID : item.UnitID) + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>"
                + "<td class='Qty' val='" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "'>" + (typeof item.Qty === 'undefined' ? item.D_Quantity : item.Qty) + "</td>"
                + "<td class='StoreID' val='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "'>" + "<select tag='" + (typeof item.StoreID === 'undefined' ? item.D_StoreID : item.StoreID) + "' class='input-sm col-sm selectstore'></select>" + "</td>"
                + "<td class='ReturnedQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + "0" + "</td>"
                + "<td class='ExchangeRate hide' val='" + item.ExchangeRate + "'>" + "0" + "</td>"
                + "<td class='AveragePrice ' val='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "'>" + "<input type='text' tag='" + (typeof item.AveragePrice === 'undefined' ? (item.D_Price * item.ExchangeRate) : item.AveragePrice) + "' class='input-sm col-sm inputprice'/>" + "</td>"
                + "<td class='Notes' val='" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "'>" + (typeof item.D_Notes === 'undefined' ? item.Notes : item.D_Notes) + "</td>"
                + "<td class='PurchaseInvoiceDetailsID hide' val='" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? item.D_ID : item.PurchaseInvoiceDetailsID) + "'>" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? item.D_ID : item.PurchaseInvoiceDetailsID) + "</td>"
                + "<td class='SLInvoiceDetailsID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='SubAccountID hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='OriginalQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='ParentID hide' val='" + "0" + "'>" + "0" + "</td>"

                + "<td class='TransactionDate hide' val='" + "" + "'>" + "" + "</td>"
                + "<td class='QtyFactor hide' val='" + 1 + "'>" + 1 + "</td>"
                + "<td class='ActualQty hide' val='" + "0" + "'>" + "0" + "</td>"
                + "<td class='IsOutOfStore hide' val='" + (typeof item.PurchaseInvoiceDetailsID === 'undefined' ? true : ((item.PurchaseInvoiceDetailsID == 0 || item.PurchaseInvoiceDetailsID == null) ? false : true)) + "'>" + "0" + "</td>"
                + "<td class='TransactionTypeID hide' val='" + "10" + "'>" + "10" + "</td>"
                + "</tr>"));
    });
    ApplyPermissions();
    //  BindAllCheckboxonTable("tblPR_ProductStages", "ID");
    //  CheckAllCheckbox("ID");
    //  HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });


    setTimeout(function () {

        $('.selectstore').html($('#slStores').html());
        // $(tr).find('td.StoreID ').find('.selectstore').val();

        // $('.selectstore').val($('.selectstore').closest("td").attr('val'));
        //$("#tblItems > tbody > tr").each(function (i, tr) {
        //  var storeid =   $(tr).find("td.StoreID").attr('val');
        //    $(tr).find("td.StoreID select.selectstore").val(storeid);
        //});


        FillStores();
    }, 30);



}

function SC_PurchaseItems_LoadAll(IsFromInvoice) {
    debugger;
    if (IsFromInvoice)
        LoadAll("/api/PR_ProductStages/LoadItems", "where 10 = 10 AND '**Load Items From PS_Inv**' = '**Load Items From PS_Inv**'  AND ID = " + $('#slPSInvoices').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    else
        LoadAll("/api/PR_ProductStages/LoadItems", "where 10 = 10 AND '**Load Items From ExminationOrders**' = '**Load Items From ExminationOrders**'  AND TransactionID = " + $('#slExminationOrders').val(), function (pTabelRows) { SC_PurchaseItems_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PR_ProductStages/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PR_ProductStages_BindTableRows(pTabelRows); PR_ProductStages_ClearAllControls(); });
    // HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
}

function FillDetails(pData) {
    debugger;
    //LoadAll("/api/PR_ProductStages/LoadItems", "where TransactionID = " + $('#hID').val() + " ", function (pTabelRows) { PR_ProductStagesDetails_BindTableRows(pTabelRows) });
    // LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/PR_ProductStages/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { PR_ProductStages_BindTableRows(pTabelRows); PR_ProductStages_ClearAllControls(); });
    // HighlightText("#tblPR_ProductStages>tbody>tr", $("#txt-Search").val().trim());
}


function SetArrayOfItems() {
    var objArr = new Array();
    console.log($('#hID').val());
    ErrorMessage = "";

    if ($(".StageBody").length <= 0) {
        ErrorMessage = "Please Insert Statges";
    }




    // هنجمع كل مرحلة بالتفاصيل بتاعتها في (فيو) واحد
    $(".StageBody").each(function (i, StageBody) {
        var OrderNo = $(StageBody).attr('order');

        if ($($(StageBody).find('.tblStageIn > tbody > tr')).length <= 0) {
            ErrorMessage = "Please Insert [IN Items] in Stage No(" + OrderNo + ") ";

        }

        if ($($(StageBody).find('.tblStageOut > tbody > tr')).length <= 0) {
            ErrorMessage = "Please Insert [OUT Items] in Stage No(" + OrderNo + ") ";

        }


        if ($('.slStages[order=' + OrderNo + ']').val() == "0") {
            ErrorMessage = "Please Select [Stage Name] in Stage No(" + OrderNo + ") ";
        }


        if ($('#slProductID').val() == "0") {
            ErrorMessage = "Please Select [Final Product] in Stage No(" + OrderNo + ") ";
        }

        $($(StageBody).find('.tblStageIn > tbody > tr')).each(function (i1, tr) {

            var obj = new Object();
            obj.ID = $(StageBody).attr('ID');
            obj.StageID = $('.slStages[order=' + OrderNo + ']').val();
            obj.FinalProductID = ($('#hID').val() == "" ? "0" : $('#hID').val()); //parent
            obj.ParentStageID = $(".StageBody[order=" + (parseInt(OrderNo) - 1) + "]").attr('ID');
            obj.IsDeleted = $(StageBody).hasClass('hide');

            obj.OrderNo = OrderNo;
            obj.StageName = $('.slStages[order=' + OrderNo + '] option:selected').text();
            //------------- Details ---------------------------------------------
            obj.DIsDeleted = $(tr).hasClass('hide');
            obj.DID = $(tr).attr('id');
            obj.ProductID = $(tr).find('td.ProductID select').val();
            obj.Percentage = ($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val());
            obj.Qty = ($(tr).find('td.Qty input').val() == "" ? "0" : $(tr).find('td.Qty input').val());
            obj.ProductStageID = $(".StageBody[order=" + (parseInt(OrderNo)) + "]").attr('ID');
            obj.UnitID = 0;
            obj.UnitName = "0";
            obj.Density = 0;
            obj.ISIn = true;
            objArr.push(obj);
            if (obj.Percentage == "0" && obj.Qty == "0") {
                ErrorMessage = "Please Insert [Percentage OR  Qty] in [tbl IN] in Stage No(" + OrderNo + ") ";
            }
            if (obj.ProductID == "0") {
                ErrorMessage = "Please Select [Product] in [tbl IN] in Stage No(" + OrderNo + ") ";

            }

            if ($($(StageBody).find('.tblStageIn > tbody > tr')).length - 1 == i1) {
                if ( CalculateTotalPercentage(OrderNo) != 100) {
                    ErrorMessage = "Must Total Percentage = 100% in [tbl IN] in Stage No(" + OrderNo + ") ";

                }
            }


        });

        //-------

        $($(StageBody).find('.tblStageOut > tbody > tr')).each(function (i, tr) {
            var obj1 = new Object();
            obj1.ID = $(StageBody).attr('ID');
            obj1.StageID = $('.slStages[order=' + OrderNo + ']').val();
            obj1.FinalProductID = ($('#hID').val() == "" ? "0" : $('#hID').val()); //parent
            obj1.ParentStageID = $(".StageBody[order=" + (parseInt(OrderNo) - 1) + "]").attr('ID');
            obj1.IsDeleted = false;
            obj1.OrderNo = OrderNo;
            obj1.StageName = $('.slStages[order=' + OrderNo + '] option:selected').text();
            //------------- Details ---------------------------------------------
            obj1.DID = $(tr).attr('id');
            obj1.ProductID = $(tr).find('td.ProductID select').val();
            obj1.Percentage = 0; //($(tr).find('td.Percentage input').val() == "" ? "0" : $(tr).find('td.Percentage input').val());
            obj1.Qty = ($(tr).find('td.Qty input').val() == "" ? "0" : $(tr).find('td.Qty input').val());
            obj1.ProductStageID = 0;
            obj1.UnitID = 0;
            obj1.UnitName = "0";
            obj1.Density = 0;
            obj1.ISIn = false;
            objArr.push(obj1);
            if (obj1.Qty == "0") {
                ErrorMessage = "Please Insert [Qty] in [tbl OUT] in Stage No(" + OrderNo + ") ";
            }

            if (obj1.ProductID == "0") {
                ErrorMessage = "Please Select [Product] in [tbl OUT] in Stage No(" + OrderNo + ") ";

            }


            // if ($($(StageBody).find('.tblStageOut > tbody > tr')).length-1 == i)




        });


    });




    return [objArr, ErrorMessage];
}

//#endregion Details



//#region print
function PrintTransaction() {

    var pReportTitle = "Good Receipt Notes - إذن إضـافــة";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();


    //****************** fill html table *************************************************
    var pTablesHTML = "";
    pTablesHTML = '<table id="tbltransaction" style="border-bottom-width:3px!important; border-bottom-color:black!important;border-top-width:3px!important; border-top-color:black!important;" class="table table-striped text-sm table-bordered" >';
    pTablesHTML += '<thead><th>Item</th><th>Quantity</th><th>Store</th><th>Notes</th></thead>'
    pTablesHTML += '<tbody>';
    $('#tblItems > tbody > tr').each(function (i, tr) {

        pTablesHTML += '<tr>';
        pTablesHTML += '<td>' + $(tr).find('td.ItemID').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Qty').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.StoreID').find('.selectstore option:selected').text() + '</td>';
        pTablesHTML += '<td>' + $(tr).find('td.Notes').text() + '</td>';
        pTablesHTML += '</tr>';
    });
    pTablesHTML += '</tbody>';
    //  $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    //****************** EOF fill html table *************************************************


    debugger;
    var mywindow = window.open('', '_blank');
    var ReportHTML = '';
    //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
    ReportHTML += '<html>';
    ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
    ReportHTML += '         <body id="" style="background-color:white;">';

    ReportHTML += '<style type="text/css" media="print">td.header-row{background-color:Gainsboro!important;}</style> ';
    ReportHTML += '<style type="text/css" >td.header-row{background-color:Gainsboro!important; text-align:left!important; }</style> ';
    ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
    ReportHTML += '         <div id="Reportbody">';
    ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

    ReportHTML += '                 <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>by:</b> ' + $('#sp-LoginName').html() + '</div>';
    ReportHTML += '                 <div class="col-xs-3"><b>Code: </b> ' + $('#txtCode').val() + '</div>';
    if ($('#cbIsFromInvoice').is(":checked"))
        ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
    else {
        ReportHTML += '                 <div class="col-xs-3"><b>Purchase Invoice : </b> ' + ($("#slPSInvoices option:selected").val() == "0" ? "-" : $("#slPSInvoices option:selected").text()) + '</div>';
        ReportHTML += '                 <div class="col-xs-3"><b>Exmination Order: </b> ' + ($("#slExminationOrders option:selected").val() == "0" ? "-" : $("#slExminationOrders option:selected").text()) + '</div>';
    }
    ReportHTML += '                 <div class="col-xs-3"><b>Transaction Date : </b> ' + $('#txtDate').val() + '</div>';
    ReportHTML += '                         <div> &nbsp; </div>';
    ReportHTML += pTablesHTML;
    ReportHTML += '         </div>';

    ReportHTML += '         </body>';
    ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

    ReportHTML += '     </footer>';

    ReportHTML += '</html>';
    mywindow.document.write(ReportHTML);

    // $("#hExportedTable").html(ReportHTML);
    mywindow.document.close();

}
//#endregion print


//#region other
function FillStores() {

    $($('#tblItems > tbody > tr')).each(function (i, tr) {
        // element == this
        $(tr).find('td.StoreID ').find('.selectstore').val($(tr).find('td.StoreID ').find('.selectstore').attr('tag'));
        $(tr).find('td.UnitID ').find('.selectunit').val($(tr).find('td.UnitID ').find('.selectunit').attr('tag'));
        $(tr).find('td.AveragePrice ').find('.inputprice').val($(tr).find('td.AveragePrice ').find('.inputprice').attr('tag'));
        // var storeid = $(tr).find('td.StoreID').
        // $(tr).find('td.StoreID ').find("#store-" + item.ItemID + " option[value='" + item.StoreID + "']").prop('selected', true);
    });

}

function SC_HideShowEditBtns(IsApproved) {
    IsFromInvoice = $('#cbIsFromInvoice').is(':checked');
    if (IsApproved != null) {
        _IsApproved = IsApproved;

        if (IsApproved == true) {
            $('.Edit-btn').addClass('hide');
            $('.Edit-input').prop('disabled', true);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', true);
        }
        else {
            $('.Edit-btn').removeClass('hide');
            $('.Edit-input').prop('disabled', false);
            $("#tblItems").find("input,button,textarea,select").prop('disabled', false);
        }


        if ($("#hID") == null || $("#hID").val() == "" || $("#hID").val() == "0") { // is [ New ]
            $('#txtDate').prop('disabled', false);
            $('#slPSInvoices').prop('disabled', false);
            $('#slExminationOrders').prop('disabled', false);
            $('#btnGetItems').removeClass('hide');
            $('#btnGetItems2').removeClass('hide');
            $("#cbIsFromInvoice").prop('disabled', false);

        }
        else // is [ Update ]
        {
            // $('#txtDate').prop('disabled', true);
            $('#slPSInvoices').prop('disabled', true);
            $('#slExminationOrders').prop('disabled', true);
            $('#btnGetItems').addClass('hide');
            $('#btnGetItems2').addClass('hide');
            $("#cbIsFromInvoice").prop('disabled', true);
        }


        $('.selectitem').prop('disabled', true);
        $('.selectunit').prop('disabled', true);
    }
    //*******************************
    if (IsFromInvoice) {
        $('.C_IsFromExmination').addClass('hide');
        $('.C_IsFromInvoice').removeClass('hide');
    }
    else {
        $('.C_IsFromExmination').removeClass('hide');
        $('.C_IsFromInvoice').addClass('hide');
    }
    //*******************************

}

var StageOrder = 1;

function AddNewStage() {
    if ($('#slProductID').val() == "" || $('#slProductID').val() == "0") {

        swal("Sorry", "Please Select [ Final Product ]", 'warning');
    }
    else {
        var StageBody = '';
        //---------------------------------------------------------------------------------------
        StageBody += '<div ID="0"  style="border:solid 1.5px;" order="' + StageOrder + '" class="StageBody">';
        // StageBody += '<hr style="border:solid 1.5px;">';
        StageBody += '<div class="col-sm-12">';
        StageBody += '<div order="' + StageOrder + '"  class="row StageTitle">';
        StageBody += '<div class="col-sm-6">';
        StageBody += '<label>Stage <mark>[' + StageOrder + ']</mark>&nbsp;</label><select order="' + StageOrder + '" class="slStages input-sm ">' + $("#hidden_slStages").html() + '</select> &nbsp; <a order="' + StageOrder + '" class="btn btnDeleteStage btn-danger btn-sm " onclick="DeleteStage(' + StageOrder + ');"> <span class="fa fa-trash-o"></span> Delete Stage</a><br>';
        StageBody += '</div>';
        StageBody += '</div>';
        StageBody += '<div order="' + StageOrder + '" class="row  StageIn">';
        StageBody += '<div class="form-group has-error clearfix col-sm-2">';
        StageBody += '<a class="btnAddStageIn btn btn-warning rounded btn-sm" onclick="AddStageIn(' + StageOrder + ');">';
        StageBody += '<span class="fa fa-plus"></span> In';
        StageBody += '</a>';
        StageBody += '</div>';
        StageBody += '<table class="tblStageIn table table-hover" order="' + StageOrder + '">';
        StageBody += '<caption><h4> In Items <h4> </caption>';
        StageBody += '<thead>';
        StageBody += '<tr>';
        StageBody += '<th></th>';
        StageBody += '<th></th>';
        StageBody += '<th>Product</th>';
        StageBody += '<th>Percentage</th>';
        StageBody += '<th>Qty</th>';
        StageBody += '<th>Unit</th>';
        StageBody += '<th>Density</th>';
        StageBody += '</tr>';
        StageBody += '</thead>';
        StageBody += '<tbody></tbody>';
        StageBody += '</table>';
        StageBody += '</div>';
        StageBody += '<div order="' + StageOrder + '" class="row StageOut">';
        StageBody += '<div class="form-group has-error clearfix col-sm-2">';
        StageBody += '<a class="btnAddStageOut btn btn-lightblue btn-sm rounded" onclick="AddStageOut(' + StageOrder + ');">';
        StageBody += '<span class="fa fa-plus"></span> Out';
        StageBody += '</a>';
        StageBody += '</div>';
        StageBody += '<table class="tblStageOut table table-hover" order="' + StageOrder + '">';
        StageBody += '<caption><h4> Out Items <h4> </caption>';
        StageBody += '<thead>';
        StageBody += '<tr>';
        StageBody += '<th></th>';
        StageBody += '<th></th>';
        StageBody += '<th>Product</th>';
        StageBody += '<th>Qty</th>';
        StageBody += '<th>Unit</th>';
        StageBody += '<th>Density</th>';
        StageBody += '</tr>';
        StageBody += '</thead>';
        StageBody += '<tbody></tbody>';
        StageBody += '</table>';
        StageBody += '</div>';
        StageBody += '</div>';
        StageBody += '</div>';
        //----------------------------------------------------------------------------------------------


        $('#Stages').append(StageBody);

        $('.btnDeleteStage[order=' + (StageOrder - 1) + ']').addClass('hide');
        StageOrder++;
    }
}

//IN
//var Row = "";

//Row += "<tr ID='" + 0 + "' isdeleted='0'  counter='" + (OrderNo) + "' value='" + 0 + "'>";
//Row += " <td class='btn-warning' style='font-size:15px;'> IN </td>";
//Row += "<td counter='" + (OrderNo) + "'> <button tag='" + 0 + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//Row += "<td class='ProductID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
//Row += "<td class='Percentage' val='" + "0" + "'>" + "<input type='number' onblur='ToggleInQty(this);'  class='inputpercentage input-sm  col-sm'>" + "</td>";
//Row += "<td class='Qty' val='" + "0" + "'>" + "<input type='number' onblur='ToggleInQty(this);' class='inputquantity input-sm  col-sm'>" + "</td>";
//Row += "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
//Row += "<td class='Density' val='" + "0" + "'>" + "<input disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
//Row += "</tr>";



//OUT
//var Row = "";

//Row += "<tr ID='" + 0 + "' isdeleted='0'  counter='" + (OrderNo) + "' value='" + 0 + "'>";
//Row += " <td class='btn-lightblue' style='font-size:15px;'> Out </td>";
//Row += "<td counter='" + (OrderNo) + "'> <button tag='" + 0 + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
//Row += "<td class='ProductID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
//Row += "<td class='Percentage hide' val='" + "0" + "'>" + "<input type='number'  class='inputpercentage input-sm  col-sm'>" + "</td>";
//Row += "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>";
//Row += "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
//Row += "<td class='Density' val='" + "0" + "'>" + "<input disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
//Row += "</tr>";


function FillStages(data) {
    //  StageOrder = 1;
    debugger
    var InRows = "";
    var OutRows = "";
    $('#Stages').html("");

    FadePageCover(true);

    $(JSON.parse(data)).each(function (i, item) {

        if (item.ISIn == true || item.ISIn == "true") {
            InRows += "<tr ID='" + item.DID + "' isdeleted='0'  counter='" + (item.OrderNo) + "' value='" + item.DID + "'>";
            InRows += " <td class='btn-warning' style='font-size:15px;'> IN </td>";
            InRows += "<td counter='" + (item.OrderNo) + "'> <button tag='" + item.DID + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>";
            InRows += "<td class='ProductID ' val='" + item.ProductID + "'>" + "<select  id='Item-" + item.ProductID + "' onchange='SetItemUnit(this)' tag='" + item.ProductID + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
            InRows += "<td class='Percentage' val='" + item.Percentage + "'>" + "<input tag='" + item.Percentage + "' type='number' onblur='ToggleInQty(this);'  class='inputpercentage input-sm  col-sm'>" + "</td>";
            InRows += "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "' type='number' onblur='ToggleInQty(this);' class='inputquantity input-sm  col-sm'>" + "</td>";
            InRows += "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
            InRows += "<td class='Density' val='" + item.Density + "'>" + "<input tag='" + item.Density + "' disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
            InRows += "</tr>";
        }
        else {
            OutRows += "<tr ID='" + item.DID + "' isdeleted='0'  counter='" + (item.OrderNo) + "' value='" + item.DID + "'>";
            OutRows += " <td class='btn-lightblue' style='font-size:15px;'> Out </td>";
            OutRows += "<td counter='" + (item.OrderNo) + "'> <button tag='" + item.DID + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (item.OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>";
            OutRows += "<td class='ProductID ' val='" + item.ProductID + "'>" + "<select  id='Item-" + item.ProductID + "' onchange='SetItemUnit(this)' tag='" + item.ProductID + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
            OutRows += "<td class='Percentage hide' val='" + item.Percentage + "'>" + "<input tag='" + item.Percentage + "' type='number' onblur='ToggleInQty(this);'  class='inputpercentage input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='Qty' val='" + item.Qty + "'>" + "<input tag='" + item.Qty + "' type='number' onblur='ToggleInQty(this);' class='inputquantity input-sm  col-sm'>" + "</td>";
            OutRows += "<td class='UnitID ' val='" + item.UnitID + "'>" + "<select disabled='disabled' id='UnitID-" + item.UnitID + "' tag='" + item.UnitID + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
            OutRows += "<td class='Density' val='" + item.Density + "'>" + "<input tag='" + item.Density + "' disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
            OutRows += "</tr>";
        }


        if ((i == $(JSON.parse(data)).length - 1) || (JSON.parse(data)[i].OrderNo != JSON.parse(data)[i + 1].OrderNo)) {
            var StageBody = '';
            StageBody += '<div ID=' + item.ID + '  style="border:solid 1.5px;" order="' + (item.OrderNo) + '" class="StageBody">';
            // StageBody += '<hr style="border:solid 1.5px;">';
            StageBody += '<div class="col-sm-12">';
            StageBody += '<div order="' + (item.OrderNo) + '"  class="row StageTitle">';
            StageBody += '<div class="col-sm-6">';
            StageBody += '<label>Stage <mark>[' + (item.OrderNo) + ']</mark>&nbsp;</label><select order="' + (item.OrderNo) + '" class="slStages input-sm ">' + $("#hidden_slStages").html() + '</select> &nbsp; <a order="' + (item.OrderNo) + '" class="btn btnDeleteStage btn-danger btn-sm " onclick="DeleteStage(' + (item.OrderNo) + ');"> <span class="fa fa-trash-o"></span> Delete Stage</a><br>';
            StageBody += '</div>';
            StageBody += '</div>';
            StageBody += '<div order="' + (item.OrderNo) + '" class="row  StageIn">';
            StageBody += '<div class="form-group has-error clearfix col-sm-2">';
            StageBody += '<a class="btnAddStageIn btn btn-warning rounded btn-sm" onclick="AddStageIn(' + (item.OrderNo) + ');">';
            StageBody += '<span class="fa fa-plus"></span> In';
            StageBody += '</a>';
            StageBody += '</div>';
            StageBody += '<table class="tblStageIn table table-hover" order="' + (item.OrderNo) + '">';
            StageBody += '<caption><h4> In Items <h4> </caption>';
            StageBody += '<thead>';
            StageBody += '<tr>';
            StageBody += '<th></th>';
            StageBody += '<th></th>';
            StageBody += '<th>Product</th>';
            StageBody += '<th>Percentage</th>';
            StageBody += '<th>Qty</th>';
            StageBody += '<th>Unit</th>';
            StageBody += '<th>Density</th>';
            StageBody += '</tr>';
            StageBody += '</thead>';
            StageBody += '<tbody>' + InRows + '</tbody>';
            StageBody += '</table>';
            StageBody += '</div>';
            StageBody += '<div order="' + (item.OrderNo) + '" class="row StageOut">';
            StageBody += '<div class="form-group has-error clearfix col-sm-2">';
            StageBody += '<a class="btnAddStageOut btn btn-lightblue btn-sm rounded" onclick="AddStageOut(' + (item.OrderNo) + ');">';
            StageBody += '<span class="fa fa-plus"></span> Out';
            StageBody += '</a>';
            StageBody += '</div>';
            StageBody += '<table class="tblStageOut table table-hover" order="' + (item.OrderNo) + '">';
            StageBody += '<caption><h4> Out Items <h4> </caption>';
            StageBody += '<thead>';
            StageBody += '<tr>';
            StageBody += '<th></th>';
            StageBody += '<th></th>';
            StageBody += '<th>Product</th>';
            StageBody += '<th>Qty</th>';
            StageBody += '<th>Unit</th>';
            StageBody += '<th>Density</th>';
            StageBody += '</tr>';
            StageBody += '</thead>';
            StageBody += '<tbody>' + OutRows + '</tbody>';
            StageBody += '</table>';
            StageBody += '</div>';
            StageBody += '</div>';
            StageBody += '</div>';
            //----------------------------------------------------------------------------------------------


            $('#Stages').append(StageBody);

            $('.btnDeleteStage[order=' + ((item.OrderNo) - 1) + ']').addClass('hide');
            StageOrder = (item.OrderNo) + 1;

            InRows = "";
            OutRows = "";



            //$('.tblStageIn' ).each(function (j, tbl)
            //{
            //    FilltblInputs($(tbl).find('tbody>tr'));
            //});

            //$('.tblStageOut').each(function (j, tbl) {
            //    FilltblInputs($(tbl).find('tbody>tr'));
            //});
            setTimeout(function () {
                FilltblInputs($('.tblStageIn[order=' + item.OrderNo + ']').find('tbody>tr'));
                FilltblInputs($('.tblStageOut[order=' + item.OrderNo + ']').find('tbody>tr'));




                $("select.selectitem").each(function (i, sl) {
                    if ($(sl).hasClass('IsAutoSelect') == false) {
                        $(sl).css({ 'width': '100%' }).select2();
                        $(sl).addClass('IsAutoSelect');
                        $(sl).trigger("change");
                        $("div[tabindex='-1']").removeAttr('tabindex');
                    }

                });



            }, 300);

            $('.slStages[order=' + item.OrderNo + ']').val(item.StageID);
        }


        FadePageCover(false);

    });

    FadePageCover(false);
}


function FilltblInputs(Selector) {
    debugger;
    $.each($(Selector), function (j, tr) {
        try {
            var sl = $(tr).find('input[type=select]');
            console.log("sl" + sl.length)
            $.each($(tr).find('select'), function (i1, i_sl) {
                $(i_sl).val($(i_sl).attr('tag'));
            });
        } catch (ex1) { }
        //---------------------------------------------------------------------------------------------------------
        try {
            var nu = $(tr).find('input[type=number]');
            console.log("nu" + nu.length)
            $.each($(tr).find('input[type=number]'), function (i2, i_nu) {
                $(i_nu).val($(i_nu).attr('tag'));
            });
        } catch (ex2) { }
        //---------------------------------------------------------------------------------------------------------
        try {
            var txt = $(tr).find('input[type=text]');
            console.log("txt" + txt.length)
            $.each($(tr).find('input[type=text]'), function (i3, i_txt) {
                $(i_txt).val($(i_txt).attr('tag'));
            });
        } catch (ex3) { }
    });
}





function AddStageIn(OrderNo) {

    if ($('.slStages[order=' + OrderNo + ']').val() == "0" || $('.slStages[order=' + OrderNo + ']').val() == "") {


        swal("Sorry", "You Must Select Stage", 'warning');
    }
    else {

        var Row = "";

        Row += "<tr ID='" + 0 + "' isdeleted='0'  counter='" + (OrderNo) + "' value='" + 0 + "'>";
        Row += " <td class='btn-warning' style='font-size:15px;'> IN </td>";
        Row += "<td counter='" + (OrderNo) + "'> <button tag='" + 0 + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
        Row += "<td class='ProductID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
        Row += "<td class='Percentage' val='" + "0" + "'>" + "<input type='number' onblur='ToggleInQty(this);'  class='inputpercentage input-sm  col-sm'>" + "</td>";
        Row += "<td class='Qty' val='" + "0" + "'>" + "<input type='number' onblur='ToggleInQty(this);' class='inputquantity input-sm  col-sm'>" + "</td>";
        Row += "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
        Row += "<td class='Density' val='" + "0" + "'>" + "<input disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
        Row += "</tr>";

        $(".tblStageIn[order=" + OrderNo + "]").append(Row);


        $("select.selectitem").each(function (i, sl) {
            if ($(sl).hasClass('IsAutoSelect') == false) {
                $(sl).css({ 'width': '100%' }).select2();
                $(sl).addClass('IsAutoSelect');
                $(sl).trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');
            }

        });


    }



}



function AddStageOut(OrderNo) {
    debugger;
    // $("#hl-menu-SC").parent().addClass("active");
    // ClearAllTableRows("tblItems");
    // $.each(JSON.parse(pSC_TransactionsDetails), function (i, item) {
    debugger;
    //tblStageIn


    if ($('.tblStageIn[order=' + OrderNo + '] > tbody > tr').length == 0) {


        swal("Sorry", "Please Insert [In Items]", 'warning');
    }
    else {
        var Row = "";

        Row += "<tr ID='" + 0 + "' isdeleted='0'  counter='" + (OrderNo) + "' value='" + 0 + "'>";
        Row += " <td class='btn-lightblue' style='font-size:15px;'> Out </td>";
        Row += "<td counter='" + (OrderNo) + "'> <button tag='" + 0 + "'  type='button' onclick='DeleteItems(this);' class='btn btn-sm btn-danger'><i class='fa fa-trash-o'></i></button><button id='btn-UndoDeleteDetails' type='button' onclick='UndoDeleteItems(" + (OrderNo) + ");' class='btn btn-sm btn-warning hide'><i class='fa fa-undo'></i></button></td>"
        Row += "<td class='ProductID ' val='" + "0" + "'>" + "<select id='Item-" + "0" + "' onchange='SetItemUnit(this)' tag='" + "0" + "' class='input-sm  col-sm selectitem'>" + $('#hidden_slItems').html() + "</select>" + "</td>";
        Row += "<td class='Percentage hide' val='" + "0" + "'>" + "<input type='number'  class='inputpercentage input-sm  col-sm'>" + "</td>";
        Row += "<td class='Qty' val='" + "0" + "'>" + "<input type='number' class='inputquantity input-sm  col-sm'>" + "</td>";
        Row += "<td class='UnitID ' val='" + "0" + "'>" + "<select disabled='disabled' id='UnitID-" + "0" + "' tag='" + "0" + "' class='input-sm  col-sm selectunit'>" + $('#hidden_slUnits').html() + "</select>" + "</td>";
        Row += "<td class='Density' val='" + "0" + "'>" + "<input disabled='disabled' type='number' class='inputdensity input-sm  col-sm'>" + "</td>";
        Row += "</tr>";

        $(".tblStageOut[order=" + OrderNo + "]").append(Row);

        $("select.selectitem").each(function (i, sl) {
            if ($(sl).hasClass('IsAutoSelect') == false) {
                $(sl).css({ 'width': '100%' }).select2();
                $(sl).addClass('IsAutoSelect');
                $(sl).trigger("change");
                $("div[tabindex='-1']").removeAttr('tabindex');
            }

        });

    }
}


function CalculateTotalPercentage(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.Percentage input").val() == "" ? 0 : parseFloat($(tr).find("td.Percentage input").val()));
    });


    return TotalPercentage;


}

function CalculateTotalQty(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.Qty input").val() == "" ? 0 : parseFloat($(tr).find("td.Qty input").val()));
    });


    return TotalPercentage;


}

function CalculateTotalDensity(OrderNo) {
    var TotalPercentage = 0.00;


    $($('.tblStageIn[order=' + OrderNo + '] tbody tr')).each(function (i, tr) {
        TotalPercentage = TotalPercentage + ($(tr).find("td.Density input").val() == "" ? 0 : parseFloat($(tr).find("td.Density input").val()));
    });


    return TotalPercentage;


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
                $(This).closest('tr').addClass('hide');
                //  CalculateAll();
            });
    }
}




function DeleteStage(OrderNo) {
    if ($('.StageBody[order=' + OrderNo + ']').attr('ID') == "0") {
        $('.StageBody[order=' + OrderNo + ']').remove();
        $('.btnDeleteStage[order=' + ((OrderNo) - 1) + ']').removeClass('hide');
        StageOrder = StageOrder - 1;
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
                $('.StageBody[order=' + OrderNo + ']').addClass('hide');
                $('.btnDeleteStage[order=' + ((OrderNo) - 1) + ']').removeClass('hide');
                StageOrder = StageOrder - 1;
            });
    }





}








function SetItemUnit(ItemSelect) {
    console.log(ItemSelect);
    console.log($(ItemSelect).is(".selectitem"));
    if (ItemSelect != null && ItemSelect != "undefined" && $(ItemSelect).is(".selectitem")) {
        var tr = $(ItemSelect).closest("tr");
        var SelectUnit = $(tr).find("select.selectunit");
        var UnitID = $(tr).find("td.UnitID").attr("val");
        // var InputDensity = 

        var Units = $(ItemSelect).find("option:selected").attr("itemunits").split(',');

        //if (UnitID == 0 || UnitID == "0")
        //  {
        var a = Units.indexOf("-1");
        $(SelectUnit).val(Units[a - 1]);
        $(tr).find("input.inputdensity").val($(ItemSelect).find("option:selected").attr("Volume"));
        //    }
    }
}

function ToggleInQty(This) {
    var tr = $(This).closest('tr');
    if (
        ($(tr).find('.inputquantity').val() == ""
            || parseFloat($(tr).find('.inputquantity').val()) == 0)

        &&

        ($(tr).find('.inputpercentage').val() == ""
            || parseFloat($(tr).find('.inputpercentage').val()) == 0)
    ) {
        $(tr).find('.inputpercentage').prop("disabled", false);
        $(tr).find('.inputquantity').prop("disabled", false);

        $(tr).find('.inputpercentage').val("0");
        $(tr).find('.inputquantity').val("0");
    }
    else if (($(tr).find('.inputquantity').val() == ""
        || parseFloat($(tr).find('.inputquantity').val()) == 0)) {
        $(tr).find('.inputpercentage').prop("disabled", false);
        $(tr).find('.inputquantity').prop("disabled", true);

        //  $(tr).find('.inputpercentage').val("0");
        $(tr).find('.inputquantity').val("0");
    }
    else {
        $(tr).find('.inputpercentage').prop("disabled", true);
        $(tr).find('.inputquantity').prop("disabled", false);
        $(tr).find('.inputpercentage').val("0");
    }
}



function CopyStores() {
    if ($('#tblItems > tbody > tr').length > 0) {
        $('.selectstore').val($('#slStores').val());
    }

}



function IntializeData(callback) {
    FadePageCover(true);
    all_has_store = false;
    $('#tblItems > tbody').html('');
    // $('#txtFromDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtToDate_Filter').val(getTodaysDateInddMMyyyyFormat());
    // $('#txtDate').val(getTodaysDateInddMMyyyyFormat());
    //  $("#slPSInvoices").prop('disabled', false);
    $('#btnPrint2').addClass('hide');
    $('#btn-Delete2').addClass('hide');
    // $("#hID").val("");
    $.ajax({
        type: "GET",
        url: strServerURL + "api/PR_ProductStages/IntializeData",
        data: { pID: ($('#hID').val() == "" ? 0 : parseInt($('#hID').val())) },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData_WithAttr(d[4], 'ID', 'Name', '<-- select Product -->', '#slProductID', '', 'ItemUnits');

            if (typeof callback != "undefined") { callback(); }

            setTimeout(function () {
                FadePageCover(false);
                if ($('#hID').val() != "" && $('#hID').val() != "0") {
                    FillStages(d[5]);
                }
            }, 1000);
            



            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });
}


function InsertUpdateFunction2(pValidateFormID, pFunctionName, pParametersWithValues, pSaveandAddNew, pModalID, callback) {
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
                        swal(strSorry, data[1]);

                        //   CallbackHeaderData();


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



function CallbackHeaderData() {
    debugger;
    if (IsInsert) {
        DeleteListFunction("/api/PR_ProductStages/Delete", { "pPR_ProductStagesIDs": $("#hID").val() }, function () { console.log("************* Is Rolled Back *********************** "); });

    }
    else {
        //  console.log("Old Date2 :" + RollBackData.TransactionDate)
        InsertUpdateFunctionAndReturnID("form", "/api/PR_ProductStages/Save", {
            pID: RollBackData.ID,
            pProductID: RollBackData.pProductID,
            pFromStoreID: RollBackData.FromStoreID,
            pToStoreID: RollBackData.ToStoreID,
            pNotes: RollBackData.Notes,
            pIsDeleted: RollBackData.IsDeleted
        }, true, null, '#hID', function () {
            console.log("************* Is Rolled Back *********************** ");
        });
    }


}

//#endregion other
