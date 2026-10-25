function SL_CustomerCategories_BindTableRows(pSL_CustomerCategories) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSL_CustomerCategories");
    $.each(pSL_CustomerCategories, function (i, item) {
        AppendRowtoTable("tblSL_CustomerCategories",
        ("<tr ID='" + item.ID + "' ondblclick='SL_CustomerCategories_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='SL_CustomerCategoriesID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='Percentage'>" + item.Percentage + "</td>"
                    + "<td class='hide'><a href='#SL_CustomerCategoriesModal' data-toggle='modal' onclick='SL_CustomerCategories_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_CustomerCategories", "SL_CustomerCategoriesID", "cbSL_CustomerCategoriesDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteSL_CustomerCategoriesID");
    HighlightText("#tblSL_CustomerCategories>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SL_CustomerCategories_EditByDblClick(pID) {
    jQuery("#SL_CustomerCategoriesModal").modal("show");
    SL_CustomerCategories_FillControls(pID);
}
// Loading with data
function SL_CustomerCategories_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_CustomerCategories/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_CustomerCategories_BindTableRows(pTabelRows); SL_CustomerCategories_ClearAllControls(); });
    HighlightText("#tblSL_CustomerCategories>tbody>tr", $("#txt-Search").val().trim());
}


function GetUSers() {
    debugger;
    CallGETFunctionWithParameters("/api/SL_CustomerCategories/GetUsers", { type: 2}
           , function (pData) {
               FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slUser", pData[0], null);
              
           }, null);

}
// calling web function to add new SL_CustomerCategories item.
function SL_CustomerCategories_Insert(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/SL_CustomerCategories/Insert", {
       // pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pPercentage: $("#txtPercentage").val().trim() == "" ? "0" : $("#txtPercentage").val().trim(),
      
    }, pSaveandAddNew, "SL_CustomerCategoriesModal",
    function () {
        SL_CustomerCategories_LoadingWithPaging();
    });
}
// calling this function for update
function SL_CustomerCategories_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SL_CustomerCategories/Update", {
        pID: $("#hID").val(),
        pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pPercentage: $("#txtPercentage").val().trim() == "" ? "0" : $("#txtPercentage").val().trim(),
       
    }, pSaveandAddNew, "SL_CustomerCategoriesModal", function () { SL_CustomerCategories_LoadingWithPaging(); });
}
function SL_CustomerCategories_Delete(pID) {
    DeleteListFunction("/api/SL_CustomerCategories/DeleteByID", { "pID": pID }, function () { SL_CustomerCategories_LoadingWithPaging(); });
}
function SL_CustomerCategories_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_CustomerCategories') != "")
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
            DeleteListFunction("/api/SL_CustomerCategories/Delete", { "pSL_CustomerCategoriesIDs": GetAllSelectedIDsAsString('tblSL_CustomerCategories') }, function () { SL_CustomerCategories_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function SL_CustomerCategories_FillControls(pID) {
    debugger;
    ClearAll("#SL_CustomerCategoriesModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtPercentage").val($(tr).find("td.Percentage").text());
   
    
    
    $("#btnSave").attr("onclick", "SL_CustomerCategories_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SL_CustomerCategories_Update(true);");
}
function SL_CustomerCategories_ClearAllControls() {
    ClearAll("#SL_CustomerCategoriesModal", null);


    $("#txtName").removeAttr("disabled");
    $("#txtPercentage").removeAttr("disabled");


    $("#btnSave").attr("onclick", "SL_CustomerCategories_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SL_CustomerCategories_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
