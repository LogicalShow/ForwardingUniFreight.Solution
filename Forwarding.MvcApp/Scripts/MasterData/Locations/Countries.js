// Country Region ---------------------------------------------------------------
// Bind Countries Table Rows
function Countries_BindTableRows(pCountries) {
    debugger;
    if (glbCallingControl == "Countries")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    ClearAllTableRows("tblCountries");
    $.each(pCountries, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblCountries",
        ("<tr ID='" + item.ID + "' ondblclick='Countries_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    //+ "<td class='RegionID' val='" + item.RegionID + "'>" + item.RegionID + "</td>"
                    + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                    + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                    + "<td class='LocalName' val='" + item.LocalName + "'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    //+ "<td class='RegionID' val='" + item.RegionID + "'>" + item.RegionCode + "</td>"
                    + "<td class='RegionID' val='" + item.RegionID + "'>" + item.RegionName + "</td>"
                    + "<td class='hide'><a href='#CountryModal' data-toggle='modal' onclick='Countries_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCountries", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCountries>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Countries_EditByDblClick(pID) {
    jQuery("#CountryModal").modal("show");
    Countries_FillControls(pID);
}
// Loading with data
function Countries_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Countries/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Countries_BindTableRows(pTabelRows); Countries_ClearAllControls(); });
    HighlightText("#tblCountries>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function Countries_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Countries/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Countries_BindTableRows(pTabelRows); Countries_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblCountries>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Country item.
function Countries_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Countries/Insert", { pRegionID: $('#slRegion option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "CountryModal", function () { Countries_LoadingWithPaging(); });
}
// calling this function for update
function Countries_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Countries/Update", { pID: $("#hID").val(), pRegionID: $('#slRegion option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim() }, pSaveandAddNew, "CountryModal", function () { Countries_LoadingWithPaging(); });
}

function Countries_Delete(pID) {
    DeleteListFunction("/api/Countries/DeleteByID", { "pID": pID }, function () { Countries_LoadingWithPaging(); });
}

function Countries_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCountries') != "")
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
            DeleteListFunction("/api/Countries/Delete", { "pCountriesIDs": GetAllSelectedIDsAsString('tblCountries') }, function () { Countries_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/Countries/Delete", { "pCountriesIDs": GetAllSelectedIDsAsString('tblCountries') }, function () { Countries_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Countries_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //Countries_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slRegion filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    //ClearAll("Country-form", null);
    ClearAll("#CountryModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    //$("#slRegion").val($(tr).find("td.RegionID").attr('val'));
    //the next 2 lines are to set the slRegions to the value entered before
    var pRegionID = $(tr).find("td.RegionID").attr('val');
    Regions_GetList(pRegionID);

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#txtName").val($(tr).find("td.Name").attr('val'));
    $("#txtLocalName").val($(tr).find("td.LocalName").attr('val'));

    $("#btnSave").attr("onclick", "Countries_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Countries_Update(true);");
}

function Countries_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#CountryModal", null);
    Regions_GetList(null);

    $("#btnSave").attr("onclick", "Countries_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Countries_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// Country Region ---------------------------------------------------------------

//to fill the select box
function Regions_GetList(pID) {//pID is used in case of editing to set the Region code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Regions/LoadAll", "Select Region", "slRegion");
}