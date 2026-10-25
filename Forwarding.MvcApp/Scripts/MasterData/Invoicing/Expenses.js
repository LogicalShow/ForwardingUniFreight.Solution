// City Country ---------------------------------------------------------------
// Bind Expenses Table Rows
function Expenses_BindTableRows(pExpenses) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblExpenses");
    $.each(pExpenses, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblExpenses",
        ("<tr ID='" + item.ID + "' ondblclick='Expenses_EditByDblClick(" + item.ID + ");'>"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
            + "<td class='AccountID' val='" + item.AccountID + "'>" + item.AccountName + "</td>"
            + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + (item.SubAccountName == "0" ? "-" : item.SubAccountName )  + "</td>"
            + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + "0" + "</td>"
            + "<td class='hExpenses'><a href='#ExpensesModal' data-toggle='modal' onclick='Expenses_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblExpenses", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblExpenses>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Expenses_EditByDblClick(pID) {
    jQuery("#ExpensesModal").modal("show");
    Expenses_FillControls(pID);
}
// Loading with data
function Expenses_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Expenses/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Expenses_BindTableRows(pTabelRows); Expenses_ClearAllControls(); });
    HighlightText("#tblExpenses>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function Expenses_Insert(pSaveandAddNew) {

  
    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {
    if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

        swal("Excuse me", "You must select SubAccount", "warning");

    }
    else {
        debugger;
        InsertUpdateFunction("form", "/api/Expenses/Insert", {
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim()
        }, pSaveandAddNew, "ExpensesModal", function () {
                Expenses_LoadingWithPaging();
                //IntializeData();
            });
    }
    //    }

    //});


}


function Expenses_Update(pSaveandAddNew) {


    //$('#hidden_slstoresnames > option').each(function (i, option)
    //{
    //    if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
    //      //  IsOldName = "1";
    //        swal("Sorry", "The Store Name is duplicated in the System", "warning");
    //        return false;

    //    }
    //    else if (i == ($('#hidden_slstoresnames > option').length - 1))
    //    {
    if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

        swal("Excuse me", "You must select SubAccount", "warning");

    }
    else {
        debugger;
        InsertUpdateFunction("form", "/api/Expenses/Update", {
            pID: $("#hID").val(),
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim()
        }, pSaveandAddNew, "ExpensesModal", function () {
            Expenses_LoadingWithPaging();
            //IntializeData();
        });
        //    }

        //});

    }
}
function IntializeData() {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/Expenses/IntializeData",
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




function Expenses_Delete(pID) {
    DeleteListFunction("/api/Expenses/DeleteByID", { "pID": pID }, function () { Expenses_LoadingWithPaging(); });
}

function Expenses_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblExpenses') != "")
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
            DeleteListFunction("/api/Expenses/Delete", { "pExpensesIDs": GetAllSelectedIDsAsString('tblExpenses') }, function () { Expenses_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/Expenses/Delete", { "pExpensesIDs": GetAllSelectedIDsAsString('tblExpenses') }, function () { Expenses_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Expenses_FillControls(pID) {
    debugger;
    ClearAll("#ExpensesModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
    //Fill_SelectInput_WithDependedID("api/Expenses/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $(tr).find("td.AccountID").attr('val')
            , pOrderBy: "Name"
        }
        , function (pData) {



            FillListFromObject_ERP($(tr).find("td.SubAccountID").attr('val'), 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountID", pData[0], null);
            //        if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
            //Start Auto Filter
            //$("#" + pSlName).css({ "width": "100%" }).select2();
            //$("div[tabindex='-1']").removeAttr('tabindex');
            //$("#" + pSlName).trigger("change");
            //End Auto Filter
            //       }
            FadePageCover(false);
        }
        , null);

    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "Expenses_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Expenses_Update(true);");
}

function Expenses_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#ExpensesModal", null);
    $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "Expenses_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Expenses_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount()
{
    debugger;
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $('#slAccountID').val()
            , pOrderBy: "Name"
        }
        , function (pData) {



            FillListFromObject_ERP($('#slAccountID').val(), 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountID", pData[0], null);
            //        if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
            //Start Auto Filter
            //$("#" + pSlName).css({ "width": "100%" }).select2();
            //$("div[tabindex='-1']").removeAttr('tabindex');
            //$("#" + pSlName).trigger("change");
            //End Auto Filter
            //       }
            FadePageCover(false);
        }
        , null);
   // Fill_SelectInput_WithDependedID("api/Expenses/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
}