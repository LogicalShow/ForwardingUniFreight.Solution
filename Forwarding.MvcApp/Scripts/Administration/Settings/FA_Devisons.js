// FA_Devisons Region ---------------------------------------------------------------
// Bind FA_Devisons Table Rows
function FA_Devisons_BindTableRows(pFA_Devisons) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblFA_Devisons");
    $.each(pFA_Devisons, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Devisons",
            ("<tr ID='" + item.ID + "' ondblclick='FA_Devisons_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name'>" + item.Name + "</td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='hide'><a href='#FA_DevisonsModal' data-toggle='modal' onclick='FA_Devisons_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Devisons", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Devisons>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function FA_Devisons_EditByDblClick(pID) {
    jQuery("#FA_DevisonsModal").modal("show");
    FA_Devisons_FillControls(pID);
}
// Loading with data
function FA_Devisons_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Devisons/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Devisons_BindTableRows(pTabelRows); FA_Devisons_ClearAllControls(); });
    HighlightText("#tblFA_Devisons>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function FA_Devisons_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/FA_Devisons/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        FA_Devisons_BindTableRows(pTabelRows); FA_Devisons_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblFA_Devisons>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new FA_Devisons item.
function FA_Devisons_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/FA_Devisons/Insert", { pName: $("#txtName").val().trim(), pCode: $("#txtCode").val().trim() }, pSaveandAddNew, "FA_DevisonsModal", function () { FA_Devisons_LoadingWithPaging(); });
}
// calling this function for update
function FA_Devisons_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/FA_Devisons/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim(), pCode: $("#txtCode").val().trim() }, pSaveandAddNew, "FA_DevisonsModal", function () { FA_Devisons_LoadingWithPaging(); });
}

function FA_Devisons_Delete(pID) {
    DeleteListFunction("/api/FA_Devisons/DeleteByID", { "pID": pID }, function () { FA_Devisons_LoadingWithPaging(); });
}

function FA_Devisons_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_Devisons') != "")
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
                DeleteListFunction("/api/FA_Devisons/Delete", { "pFA_DevisonsIDs": GetAllSelectedIDsAsString('tblFA_Devisons') }, function () { FA_Devisons_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_Devisons/Delete", { "pFA_DevisonsIDs": GetAllSelectedIDsAsString('tblFA_Devisons') }, function () { FA_Devisons_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_Devisons_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //FA_Devisons_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slRegion filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    //ClearAll("FA_Devisons-form", null);
    ClearAll("#FA_DevisonsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());

    $("#btnSave").attr("onclick", "FA_Devisons_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Devisons_Update(true);");
}

function FA_Devisons_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#FA_DevisonsModal", null);
    $("#btnSave").attr("onclick", "FA_Devisons_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Devisons_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// FA_Devisons Region ---------------------------------------------------------------

////////////////////////Fill select boxes/////////////////////////////////////////////
//fill slCountries
function Countries_GetList(pID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Countries/LoadAll", "Select Country", "slCountries");
}

//fill slCities
function Cities_GetList(pID, pIsCopyFromMainAddress) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    var pWhereClause = "";
    if (pID != null) //this means editing an address and that we have a country
    {
        //pWhereClause = " where IsPort = 0 and CountryID = ";
        pWhereClause = " where CountryID = ";
        pWhereClause += $("tr").find("td.CountryID").attr('val');
    }
    else //when changing the country
    {
        pWhereClause = " where CountryID = ";
        pWhereClause += ($('#slCountries option:selected').val() == null || $('#slCountries option:selected').val() == ""
            ? 0 : $('#slCountries option:selected').val());
    }
    pWhereClause += " order by Name ";
    GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select City", "slCities", pWhereClause);
}
