// City Country ---------------------------------------------------------------
// Bind Budgets Table Rows
function Budgets_BindTableRows(pBudgets) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblBudgets");
    $.each(pBudgets, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblBudgets",
            ("<tr ID='" + item.ID + "' ondblclick='Budgets_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='hBudgets'><a href='#BudgetsModal' data-toggle='modal' onclick='Budgets_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBudgets", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBudgets>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Budgets_EditByDblClick(pID) {
    jQuery("#BudgetsModal").modal("show");
    Budgets_FillControls(pID);
}
// Loading with data
function Budgets_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Budgets/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Budgets_BindTableRows(pTabelRows); Budgets_ClearAllControls(); });
    HighlightText("#tblBudgets>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function Budgets_Insert(pSaveandAddNew) {


    debugger;
    InsertUpdateFunction("form", "/api/Budgets/Insert", {
        pName: $("#txtName").val().trim().toUpperCase()
    }, pSaveandAddNew, "BudgetsModal", function () {
        Budgets_LoadingWithPaging();
        //IntializeData();
    });

}


function Budgets_Update(pSaveandAddNew) {


    debugger;
    InsertUpdateFunction("form", "/api/Budgets/Update", {
        pID: $("#hID").val(),
        pName: $("#txtName").val().trim().toUpperCase()
    }, pSaveandAddNew, "BudgetsModal", function () {
        Budgets_LoadingWithPaging();
        //IntializeData();
    });

}
function IntializeData() {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/Budgets/IntializeData",
        data: { pStoresNamesOnly: "true" },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            Fill_SelectInputAfterLoadData(d[0], 'ID', 'StoreName', '<-- select store name -->', '#hidden_slstoresnames', '');
            FadePageCover(false);
        },
        error: function (jqXHR, exception) {
            debugger;
            swal("Oops!", "Please, contact your technical support!  this is print region !", "error");
            FadePageCover(false);
        }
    });




}




function Budgets_Delete(pID) {
    DeleteListFunction("/api/Budgets/DeleteByID", { "pID": pID }, function () { Budgets_LoadingWithPaging(); });
}

function Budgets_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBudgets') != "")
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
                DeleteListFunction("/api/Budgets/Delete", { "pBudgetsIDs": GetAllSelectedIDsAsString('tblBudgets') }, function () { Budgets_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/Budgets/Delete", { "pBudgetsIDs": GetAllSelectedIDsAsString('tblBudgets') }, function () { Budgets_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Budgets_FillControls(pID) {
    debugger;
    ClearAll("#BudgetsModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    $("#btnSave").attr("onclick", "Budgets_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Budgets_Update(true);");
}

function Budgets_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#BudgetsModal", null);
    $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "Budgets_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Budgets_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount() {
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    Fill_SelectInput_WithDependedID("api/Budgets/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
}