// Bank Region ---------------------------------------------------------------
// Bind Banks Table Rows
function Banks_BindTableRows(pBanks) {

    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblBanks");
    $.each(pBanks, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblBanks",
        ("<tr ID='" + item.BankID + "' ondblclick='Banks_EditByDblClick(" + item.BankID + ");'>"
                    + "<td class='BankID'> <input name='Delete' type='checkbox' value='" + item.BankID + "' /></td>"
                    + "<td class='BankCode' val='" + item.BankCode + "'>" + item.BankCode + "</td>"
                    + "<td class='BankNameEn' val='" + item.BankNameEn + "'>" + item.BankNameEn + "</td>"
                    + "<td class='BankNameAr' val='" + item.BankNameAr + "'>" + item.BankNameAr + "</td>"
                    + "<td class='BankAccountNo' val='" + item.BankAccountNo + "'>" + item.BankAccountNo + "</td>"
                    + "<td class='CurrencyID' val='" + item.CurrencyID + "'>" + $("#slCurrency [value=" + item.CurrencyID + "]").text() + "</td>"
                    + "<td class='hide'><a href='#BankModal' data-toggle='modal' onclick='Banks_FillControls(" + item.BankID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBanks", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBanks>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

function Banks_EditByDblClick(pID) {
    jQuery("#BankModal").modal("show");
    Banks_FillControls(pID);
}
// Loading with data
function Banks_LoadingWithPaging() {

    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Banks/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Banks_BindTableRows(pTabelRows); Banks_ClearAllControls(); });
    HighlightText("#tblBanks>tbody>tr", $("#txt-Search").val().trim());
}
// calling web function to add new Bank item.
function Banks_Insert(pSaveandAddNew) {

    InsertUpdateFunction("form", "/api/Banks/Insert", {

        pCode: $("#txtCode").val().trim(),
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pBankAccountNo: $("#txtBankAccountNo").val().trim(),
        pCurrencyID: $('#slCurrency option:selected').val()

    }, pSaveandAddNew, "BankModal",
    function () {
        Banks_LoadingWithPaging();
    });
}
// calling this function for update
function Banks_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Banks/Update", {
        pID: $("#hID").val(),
        pCode: $("#txtCode").val().trim(),
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pBankAccountNo: $("#txtBankAccountNo").val().trim(),
        pCurrencyID: $('#slCurrency option:selected').val()
    }, pSaveandAddNew, "BankModal", function () { Banks_LoadingWithPaging(); });
}

function Banks_Delete(pID) {
    DeleteListFunction("/api/Banks/DeleteByID", { "pID": pID }, function () { Banks_LoadingWithPaging(); });
}

function Banks_DeleteList() {

    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBanks') != "")
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
            DeleteListFunction("/api/Banks/Delete", { "pBanksIDs": GetAllSelectedIDsAsString('tblBanks') }, function () { Banks_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Banks/Delete", { "pBanksIDs": GetAllSelectedIDsAsString('tblBanks') }, function () { Banks_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Banks_FillControls(pID) {

    // Fill All Model Controls
    ClearAll("#BankModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#lblShown").html(" : " + $(tr).find("td.BankNameEn").text());
    $("#txtCode").val($(tr).find("td.BankCode").attr('val'));
    $("#txtName").val($(tr).find("td.BankNameEn").attr('val'));
    $("#txtLocalName").val($(tr).find("td.BankNameAr").attr('val'));
    $("#slCurrency").val($(tr).find("td.CurrencyID").attr('val'));
    $("#txtBankAccountNo").val($(tr).find("td.BankAccountNo").attr('val'));
    $("#btnSave").attr("onclick", "Banks_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Banks_Update(true);");
}

function Banks_ClearAllControls() {

    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#BankModal", null);
    $("#slCurrency").val($("#hDefaultCurrencyID").val());
    $("#btnSave").attr("onclick", "Banks_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Banks_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// Bank Region ---------------------------------------------------------------
function Banks_UnlockRecord() {
    UnlockFunction("/api/Banks/UnlockRecord",
        { pID: $("#hID").val() },
        "BankModal",
        function () { Banks_LoadingWithPaging(); }); //the callback function
}
//to fill the select box
function Currencies_GetList(pID, callback) {
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slCurrency", " WHERE 1=1 ORDER BY Code "
      , function () {
          if (callback != null && callback != undefined)
              callback();
      });
}

