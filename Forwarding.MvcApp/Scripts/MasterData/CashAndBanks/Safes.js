// Safe Region ---------------------------------------------------------------
// Bind Safes Table Rows
function Safes_BindTableRows(pSafes) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSafes");
    $.each(pSafes, function (i, item) {        
        AppendRowtoTable("tblSafes",
        ("<tr ID='" + item.SafeID + "' ondblclick='Safes_EditByDblClick(" + item.SafeID + ");'>"
                    + "<td class='SafeID'> <input name='Delete' type='checkbox' value='" + item.SafeID + "' /></td>"
                    + "<td class='SafeCode' val='" + item.SafeCode + "'>" + item.SafeCode + "</td>"
                    + "<td class='SafeNameEn' val='" + item.SafeNameEn + "'>" + item.SafeNameEn + "</td>"
                    + "<td class='SafeNameAr' val='" + item.SafeNameAr + "'>" + item.SafeNameAr + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyID + "</td>"
                    + "<td class='hide'><a href='#SafeModal' data-toggle='modal' onclick='Safes_FillControls(" + item.SafeID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSafes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSafes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Safes_EditByDblClick(pID) {
    jQuery("#SafeModal").modal("show");
    Safes_FillControls(pID);
}
// Loading with data
function Safes_LoadingWithPaging() {    
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Safes/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Safes_BindTableRows(pTabelRows); Safes_ClearAllControls(); });
    HighlightText("#tblSafes>tbody>tr", $("#txt-Search").val().trim());
}
// calling web function to add new Safe item.
function Safes_Insert(pSaveandAddNew) {    
    InsertUpdateFunction("form", "/api/Safes/Insert", {        
        pCode: $("#txtCode").val().trim(),
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pCurrencyID: $('#slCurrency option:selected').val()
    }, pSaveandAddNew, "SafeModal",
    function () {
        Safes_LoadingWithPaging();
    });
}
// calling this function for update
function Safes_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Safes/Update", {
        pID: $("#hID").val(), pCode: $("#txtCode").val().trim(),
        pName: $("#txtName").val().trim(),
        pLocalName: $("#txtLocalName").val().trim(),
        pCurrencyID: $('#slCurrency option:selected').val()
    }, pSaveandAddNew, "SafeModal", function () { Safes_LoadingWithPaging(); });
}
function Safes_Delete(pID) {
    DeleteListFunction("/api/Safes/DeleteByID", { "pID": pID }, function () { Safes_LoadingWithPaging(); });
}
function Safes_DeleteList() {    
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSafes') != "")
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
            DeleteListFunction("/api/Safes/Delete", { "pSafesIDs": GetAllSelectedIDsAsString('tblSafes') }, function () { Safes_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function Safes_FillControls(pID) {
    // Fill All Model Controls
    ClearAll("#SafeModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#lblShown").html(" : " + $(tr).find("td.SafeNameEn").text());
    $("#txtCode").val($(tr).find("td.SafeCode").attr('val'));
    $("#txtName").val($(tr).find("td.SafeNameEn").attr('val'));
    $("#txtLocalName").val($(tr).find("td.SafeNameAr").attr('val'));
    $("#slCurrency").val($(tr).find("td.CurrencyID").attr('val'));
    $("#btnSave").attr("onclick", "Safes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Safes_Update(true);");
}

function Safes_ClearAllControls() {
    ClearAll("#SafeModal", null);
    // 
    $("#slCurrency").val($("#hDefaultCurrencyID").val());
    $("#btnSave").attr("onclick", "Safes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Safes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// Safe Region ---------------------------------------------------------------
function Safes_UnlockRecord() {
    UnlockFunction("/api/Safes/UnlockRecord",
        { pID: $("#hID").val() },
        "safeModal",
        function () { Safes_LoadingWithPaging(); }); //the callback function
}
//to fill the select box
function Currencies_GetList(pID, callback) {
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slCurrency", " WHERE 1=1 ORDER BY Code "
      , function () {
          if (callback != null && callback != undefined)
              callback();
      });
}