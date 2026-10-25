function DailyExchangeRate_BindTableRows(pTableRows) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblDailyExchangeRate");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblDailyExchangeRate",
        ("<tr ID='" + item.ID + "' ondblclick='DailyExchangeRate_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' id='" + item.ID + "' type='checkbox' value='" + item.ID + "' onfocus='DisableEnterKey(id);' onkeypress='DisableEnterKey(id);'/></td>"
                    + "<td class='FromDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.FromDate)) + "</td>"
                    + "<td class='ToDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ToDate)) + "</td>"
                    + "<td class='FromCurrencyID' val='" + item.FromCurrencyID + "'>" + "<b>" + item.FromCurCode + "</b>" + " " + "[" + item.FromCurName + "]" + "</td>"
                    + "<td class='ToCurrencyID' val='" + item.ToCurrencyID + "'>" + "<b>" + item.ToCurCode + "</b>" + " " + "[" + item.ToCurName + "]" + "</td>"
                    + "<td class='ExchangeRate'>" + item.ExchangeRate + "</td>"
                    + "<td class='Remarks'>" + item.Remarks + "</td>"
                    + "<td class='hide'><a href='#DailyExchangeRateModal' data-toggle='modal' onclick='DailyExchangeRate_FillControls(" + item.ID + ");' " + editControlsText + "</a></td>"
        + "</tr>"));
    });

    ApplyPermissions();
    BindAllCheckboxonTable("tblDailyExchangeRate", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblDailyExchangeRate>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
//-----------------------------------------------------------------
function DailyExchangeRate_EditByDblClick(pID) {
    jQuery("#DailyExchangeRateModal").modal("show");
    DailyExchangeRate_FillControls(pID);
}
//-----------------------------------------------------------------
function DailyExchangeRate_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/DailyExchangeRate/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { DailyExchangeRate_BindTableRows(pTabelRows); DailyExchangeRate_ClearAllControls(); });
    HighlightText("#tblDailyExchangeRate>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
//-----------------------------------------------------------------
function DailyExchangeRate_Insert(pSaveandAddNew) {
    debugger;
    var datefrom = $("#txtDateFrom").val().split('/')[2].toString() + $("#txtDateFrom").val().split('/')[1] + $("#txtDateFrom").val().split('/')[0]
    var dateto = $("#txtDateTo").val().split('/')[2].toString() + $("#txtDateTo").val().split('/')[1] + $("#txtDateTo").val().split('/')[0];
    if (parseInt(datefrom) <= parseInt(dateto)) {
        InsertUpdateFunction("form", "/api/DailyExchangeRate/Insert",
            {
                pFromDate: ConvertDateFormat($("#txtDateFrom").val()) /*new Date($("#txtDateFrom").val().split('/')[2].toString(), $("#txtDateFrom").val().split('/')[1].toString(), $("#txtDateFrom").val().split('/')[0].toString()).toJSON()*/
               , pToDate: ConvertDateFormat($("#txtDateTo").val())  /*new Date($("#txtDateTo").val().split('/')[2].toString() , $("#txtDateTo").val().split('/')[1].toString() , $("#txtDateTo").val().split('/')[0].toString()).toJSON()*/
             , pFromCurrencyID: $("#slFromCurrency").val()
            , pToCurrencyID: $("#slToCurrency").val()

            , pExchangeRate: $("#txtDailyExchangeRate").val().trim() == "" ? 1 : $("#txtDailyExchangeRate").val().trim()
            , pRemarks: $("#txtRemarks").val().trim().toUpperCase()
            }, pSaveandAddNew, "DailyExchangeRateModal", function () { DailyExchangeRate_LoadingWithPaging(); });
    }
    else {
        swal("error", "dateTo must be greater than dateFrom");

    }
}
//-----------------------------------------------------------------
function DailyExchangeRate_Update(pSaveandAddNew) {

    var datefrom = $("#txtDateFrom").val().split('/')[2].toString() + $("#txtDateFrom").val().split('/')[1] + $("#txtDateFrom").val().split('/')[0]
    var dateto = $("#txtDateTo").val().split('/')[2].toString() + $("#txtDateTo").val().split('/')[1] + $("#txtDateTo").val().split('/')[0];
    if (parseInt(datefrom) <= parseInt(dateto)) {
        InsertUpdateFunction("form", "/api/DailyExchangeRate/Update", {
            pID: $("#hID").val()
        , pFromDate: ConvertDateFormat($("#txtDateFrom").val()) //new Date($("#txtDateFrom").val().split('/')[2].toString(), $("#txtDateFrom").val().split('/')[1].toString(), $("#txtDateFrom").val().split('/')[0].toString()).toJSON()
            , pToDate: ConvertDateFormat($("#txtDateTo").val()) // new Date($("#txtDateTo").val().split('/')[2].toString() , $("#txtDateTo").val().split('/')[1].toString() , $("#txtDateTo").val().split('/')[0].toString()).toJSON()
        , pFromCurrencyID: $("#slFromCurrency").val()
        , pToCurrencyID: $("#slToCurrency").val()

        , pExchangeRate: $("#txtDailyExchangeRate").val().trim() == "" ? 1 : $("#txtDailyExchangeRate").val().trim()
        , pRemarks: $("#txtRemarks").val().trim().toUpperCase()
        }, pSaveandAddNew, "DailyExchangeRateModal", function () { DailyExchangeRate_LoadingWithPaging(); });
    }
    else {
        swal("error", "dateTo must be greater than dateFrom");

    }
}
//----------------------------------------------------------------
function DailyExchangeRate_ClearAllControls(callback) {
    ClearAll("#DailyExchangeRateModal");
    GetListCurrencyWithCodeAndExchangeRateAttr($("#hDefaultForeignCurrencyID").val(), "/api/Currencies/LoadAll", null, "slFromCurrency", "ORDER BY CODE"
        , function () {
            $("#slToCurrency").html($("#slFromCurrency").html());
            $("#slToCurrency").val($("#hDefaultCurrencyID").val());
        });
    //GetListWithCodeAndWhereClause(null, "/api/Voyage/LoadAll", "Select Voyage", "slVoyage", "ORDER BY VoyageNumber", null);
    $("#btnSave").attr("onclick", "DailyExchangeRate_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "DailyExchangeRate_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    $("#txtDailyExchangeRate").removeAttr("disabled"); $("#txtAltDailyExchangeRate").removeAttr("disabled");

    if (callback != null && callback != undefined)
        callback();
}
//---------------------------------------------------------------
function DailyExchangeRate_FillControls(pID) {
    ClearAll("#DailyExchangeRateModal");

    var tr = $("tr[ID='" + pID + "']");

    var pFromCurrencyID = $(tr).find("td.FromCurrencyID").attr('val');
    var pToCurrencyID = $(tr).find("td.ToCurrencyID").attr('val');

    GetListCurrencyWithCodeAndExchangeRateAttr(pFromCurrencyID, "/api/Currencies/LoadAll", null, "slFromCurrency", "ORDER BY CODE"
        , function () {
            $("#slToCurrency").html($("#slFromCurrency").html()); $("#slToCurrency").val(pToCurrencyID);
        });

    $("#txtDateTo").val($(tr).find("td.ToDate").text());
    $("#txtDateFrom").val($(tr).find("td.FromDate").text());
    $("#hID").val(pID);
    $("#lblShown").html(": " + $(tr).find("td.Name").text());

    $("#txtDailyExchangeRate").val($(tr).find("td.ExchangeRate").text());

    $("#txtRemarks").val($(tr).find("td.Remarks").text());


    if (pFromCurrencyID == pToCurrencyID) {
        $("#txtDailyExchangeRate").attr("disabled", "disabled"); $("#txtDailyExchangeRate").val(1);
    }
    else {
        $("#txtDailyExchangeRate").removeAttr("disabled");
    }
    $("#btnSave").attr("onclick", "DailyExchangeRate_Update(false);");
    $("#btnSaveandNew").attr("onclick", "DailyExchangeRate_Update(true);");
}
//---------------------------------------------------------------
function DailyExchangeRate_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblDailyExchangeRate') != "") {
        debugger;
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            DeleteListFunction("/api/DailyExchangeRate/Delete", { "pExchangeRateIDs": GetAllSelectedIDsAsString('tblDailyExchangeRate') }, function () {
                DailyExchangeRate_LoadingWithPaging(
                    //this is callback in DailyExchangeRate_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
    }
}
//--------------------------------------------------------------
/***************************************************************************/
// when sl to||from cureency onchange : 
function DailyExchangeRate_SetDailyExchangeRateProperties() {
    debugger;
    if ($("#slToCurrency").val() == $("#slFromCurrency").val()) {
        $("#txtDailyExchangeRate").attr("disabled", "disabled"); $("#txtDailyExchangeRate").val(1);
    }
    else {
        $("#txtDailyExchangeRate").removeAttr("disabled");

    }
}