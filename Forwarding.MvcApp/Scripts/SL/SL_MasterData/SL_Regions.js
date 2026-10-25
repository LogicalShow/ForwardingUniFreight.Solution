function SL_Regions_BindTableRows(pSL_Regions) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSL_Regions");
    $.each(pSL_Regions, function (i, item) {
        AppendRowtoTable("tblSL_Regions",
        ("<tr ID='" + item.ID + "' ondblclick='SL_Regions_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='SL_RegionsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                 
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                
                    + "<td class='hide'><a href='#SL_RegionsModal' data-toggle='modal' onclick='SL_Regions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_Regions", "SL_RegionsID", "cbSL_RegionsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteSL_RegionsID");
    HighlightText("#tblSL_Regions>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SL_Regions_EditByDblClick(pID) {
    jQuery("#SL_RegionsModal").modal("show");
    SL_Regions_FillControls(pID);
}
// Loading with data
function SL_Regions_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_Regions/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_Regions_BindTableRows(pTabelRows); SL_Regions_ClearAllControls(); });
    HighlightText("#tblSL_Regions>tbody>tr", $("#txt-Search").val().trim());
}



// calling web function to add new SL_Regions item.
function SL_Regions_Insert(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/SL_Regions/Insert", {
       // pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase()
      
    }, pSaveandAddNew, "SL_RegionsModal",
    function () {
        SL_Regions_LoadingWithPaging();
    });
}
// calling this function for update
function SL_Regions_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SL_Regions/Update", {
        pID: $("#hID").val(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
       
    }, pSaveandAddNew, "SL_RegionsModal", function () { SL_Regions_LoadingWithPaging(); });
}
function SL_Regions_Delete(pID) {
    DeleteListFunction("/api/SL_Regions/DeleteByID", { "pID": pID }, function () { SL_Regions_LoadingWithPaging(); });
}
function SL_Regions_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_Regions') != "")
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
            DeleteListFunction("/api/SL_Regions/Delete", { "pSL_RegionsIDs": GetAllSelectedIDsAsString('tblSL_Regions') }, function () { SL_Regions_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function SL_Regions_FillControls(pID) {
    debugger;
    ClearAll("#SL_RegionsModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtName").val($(tr).find("td.Name").text());
   
    
    
    $("#btnSave").attr("onclick", "SL_Regions_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Regions_Update(true);");
}
function SL_Regions_ClearAllControls() {
    ClearAll("#SL_RegionsModal", null);




    $("#btnSave").attr("onclick", "SL_Regions_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SL_Regions_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
