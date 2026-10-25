// FA_Departments Region ---------------------------------------------------------------
// Bind FA_Departments Table Rows
function FA_Departments_BindTableRows(pFA_Departments) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblFA_Departments");
    $.each(pFA_Departments, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_Departments",
        ("<tr ID='" + item.ID + "' ondblclick='FA_Departments_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name'>" + item.Name + "</td>"
            + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='hide'><a href='#FA_DepartmentsModal' data-toggle='modal' onclick='FA_Departments_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_Departments", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_Departments>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function FA_Departments_EditByDblClick(pID) {
    jQuery("#FA_DepartmentsModal").modal("show");
    FA_Departments_FillControls(pID);
}
// Loading with data
function FA_Departments_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_Departments/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_Departments_BindTableRows(pTabelRows); FA_Departments_ClearAllControls(); });
    HighlightText("#tblFA_Departments>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function FA_Departments_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/FA_Departments/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        FA_Departments_BindTableRows(pTabelRows); FA_Departments_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblFA_Departments>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new FA_Departments item.
function FA_Departments_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/FA_Departments/Insert", { pName: $("#txtName").val().trim(), pCode: $("#txtCode").val().trim()}, pSaveandAddNew, "FA_DepartmentsModal", function () { FA_Departments_LoadingWithPaging(); });
}
// calling this function for update
function FA_Departments_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/FA_Departments/Update", { pID: $("#hID").val(), pName: $("#txtName").val().trim(), pCode: $("#txtCode").val().trim() }, pSaveandAddNew, "FA_DepartmentsModal", function () { FA_Departments_LoadingWithPaging(); });
}

function FA_Departments_Delete(pID) {
    DeleteListFunction("/api/FA_Departments/DeleteByID", { "pID": pID }, function () { FA_Departments_LoadingWithPaging(); });
}

function FA_Departments_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_Departments') != "")
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
            DeleteListFunction("/api/FA_Departments/Delete", { "pFA_DepartmentsIDs": GetAllSelectedIDsAsString('tblFA_Departments') }, function () { FA_Departments_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/FA_Departments/Delete", { "pFA_DepartmentsIDs": GetAllSelectedIDsAsString('tblFA_Departments') }, function () { FA_Departments_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_Departments_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //FA_Departments_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slRegion filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    //ClearAll("FA_Departments-form", null);
    ClearAll("#FA_DepartmentsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());

    $("#btnSave").attr("onclick", "FA_Departments_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Departments_Update(true);");
}

function FA_Departments_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#FA_DepartmentsModal", null);
    $("#btnSave").attr("onclick", "FA_Departments_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_Departments_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// FA_Departments Region ---------------------------------------------------------------

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
