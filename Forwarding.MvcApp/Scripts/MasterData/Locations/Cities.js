// City Country ---------------------------------------------------------------
// Bind Cities Table Rows
function Cities_BindTableRows(pCities) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCities");
    $.each(pCities, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCities",
        ("<tr ID='" + item.ID + "' ondblclick='Cities_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='CountryID' val='" + item.CountryID + "'>" + item.CountryID + "</td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                    + "<td class='LocalName' val='" +item.LocalName+ "'>" + item.LocalName + "</td>"
                    //+ "<td class='CountryID' val='" + item.CountryID + "'>" + item.CountryCode + "</td>"
                    + "<td class='CountryID' val='" + item.CountryID + "'>" + item.CountryName + "</td>"
                    + "<td class='hCityIDe'><a href='#CityModal' data-toggle='modal' onclick='Cities_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCities", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCities>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Cities_EditByDblClick(pID) {
    jQuery("#CityModal").modal("show");
    Cities_FillControls(pID);
}
// Loading with data
function Cities_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Cities/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Cities_BindTableRows(pTabelRows); Cities_ClearAllControls(); });
    HighlightText("#tblCities>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function Cities_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Cities/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Cities_BindTableRows(pTabelRows); Cities_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCities>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function Cities_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Cities/Insert", { pCountryID: $('#slCountry option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "CityModal", function () { Cities_LoadingWithPaging(); });
}
// calling this function for update
function Cities_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Cities/Update", { pID: $("#hCityID").val(), pCountryID: $('#slCountry option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "CityModal", function () { Cities_LoadingWithPaging(); });
}

function Cities_Delete(pID) {
    DeleteListFunction("/api/Cities/DeleteByID", { "pID": pID }, function () { Cities_LoadingWithPaging(); });
}

function Cities_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCities') != "")
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
            DeleteListFunction("/api/Cities/Delete", { "pCitiesIDs": GetAllSelectedIDsAsString('tblCities') }, function () { Cities_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/Cities/Delete", { "pCitiesIDs": GetAllSelectedIDsAsString('tblCities') }, function () { Cities_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Cities_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //Cities_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hCityID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);
    ClearAll("#CityModal", null);
    $("#hCityID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    //$("#slCountry").val($(tr).find("td.CountryID").attr('val'));
    //the next 2 lines are to set the slCountries to the value entered before
    var pCountryID = $(tr).find("td.CountryID").attr('val');
    Countries_GetList(pCountryID);

    $("#lblCityShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#txtName").val($(tr).find("td.Name").attr('val'));
    $("#txtLocalName").val($(tr).find("td.LocalName").attr('val'));

    $("#btnSave").attr("onclick", "Cities_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Cities_Update(true);");
}

function Cities_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hCityID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#CityModal", null);
    Countries_GetList(null);

    $("#btnSave").attr("onclick", "Cities_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Cities_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// City Country ---------------------------------------------------------------

//to fill the select box
function Countries_GetList(pID) {//pID is used in case of editing to set the Country code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Countries/LoadAll", "Select Country", "slCountry");
}