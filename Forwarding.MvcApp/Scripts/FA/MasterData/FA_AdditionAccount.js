// City Country ---------------------------------------------------------------
// Bind FA_AdditionAccount Table Rows
function FA_AdditionAccount_BindTableRows(pFA_AdditionAccount) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblFA_AdditionAccount");
    $.each(pFA_AdditionAccount, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblFA_AdditionAccount",
            ("<tr ID='" + item.ID + "' ondblclick='FA_AdditionAccount_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='AccountID hide' val='" + item.AccountID + "'>" + item.AccountName + "</td>"
                + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + (item.SubAccountName == "0" ? "-" : item.SubAccountName) + "</td>"

                + "<td class='hFA_AdditionAccount'><a href='#FA_AdditionAccountModal' data-toggle='modal' onclick='FA_AdditionAccount_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblFA_AdditionAccount", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblFA_AdditionAccount>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function FA_AdditionAccount_EditByDblClick(pID) {
    jQuery("#FA_AdditionAccountModal").modal("show");
    FA_AdditionAccount_FillControls(pID);
}
// Loading with data
function FA_AdditionAccount_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/FA_AdditionAccount/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { FA_AdditionAccount_BindTableRows(pTabelRows); FA_AdditionAccount_ClearAllControls(); });
    HighlightText("#tblFA_AdditionAccount>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function FA_AdditionAccount_Insert(pSaveandAddNew) {


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
        InsertUpdateFunction("form", "/api/FA_AdditionAccount/Insert", {
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim()
        }, pSaveandAddNew, "FA_AdditionAccountModal", function () {
            FA_AdditionAccount_LoadingWithPaging();
            //IntializeData();
        });
    }
    //    }

    //});


}


function FA_AdditionAccount_Update(pSaveandAddNew) {


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
        InsertUpdateFunction("form", "/api/FA_AdditionAccount/Update", {
            pID: $("#hID").val(),
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim()
        }, pSaveandAddNew, "FA_AdditionAccountModal", function () {
            FA_AdditionAccount_LoadingWithPaging();
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
        url: strServerURL + "api/FA_AdditionAccount/IntializeData",
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




function FA_AdditionAccount_Delete(pID) {
    DeleteListFunction("/api/FA_AdditionAccount/DeleteByID", { "pID": pID }, function () { FA_AdditionAccount_LoadingWithPaging(); });
}

function FA_AdditionAccount_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblFA_AdditionAccount') != "")
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
                DeleteListFunction("/api/FA_AdditionAccount/Delete", { "pFA_AdditionAccountIDs": GetAllSelectedIDsAsString('tblFA_AdditionAccount') }, function () { FA_AdditionAccount_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/FA_AdditionAccount/Delete", { "pFA_AdditionAccountIDs": GetAllSelectedIDsAsString('tblFA_AdditionAccount') }, function () { FA_AdditionAccount_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function FA_AdditionAccount_FillControls(pID) {
    debugger;
    ClearAll("#FA_AdditionAccountModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    //$("#txtPreCode").val($(tr).find("td.PreCode").attr('val'));
   // $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
    //$("#slAccountID2").val($(tr).find("td.AccountID2").attr('val'));

    //Fill_SelectInput_WithDependedID("api/FA_AdditionAccount/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    Details_FillSlSubAccount("slSubAccountID", $(tr).find("td.SubAccountID").attr('val'));
   // Details_FillSlSubAccount2("slSubAccountID2", $(tr).find("td.SubAccountID2").attr('val'));


    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "FA_AdditionAccount_Update(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AdditionAccount_Update(true);");
}

function FA_AdditionAccount_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#FA_AdditionAccountModal", null);
    $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "FA_AdditionAccount_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "FA_AdditionAccount_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount() {
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    Fill_SelectInput_WithDependedID("api/FA_AdditionAccount/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
}

function Details_FillSlSubAccount(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccountID").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccountID").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountID").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                //Start Auto Filter
                $("#" + pSlName).trigger("change");
                //End Auto Filter
                FadePageCover(false);
            }
            , null);
    }
}


function Details_FillSlSubAccount2(pSlName, pSubAccountID) {
    debugger;
    if ($("#slAccountID2").val() == 0) //No Account is selected so just empty subaccounts
        $("#slSubAccountID2").html("<option value=0>" + TranslateString("SelectFromMenu") + "</option>");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
            , {
                pLanguage: $("[id$='hf_ChangeLanguage']").val()
                , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $("#slAccountID2").val()
                , pOrderBy: "Name"
            }
            , function (pData) {
                FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
                //Start Auto Filter
                $("#" + pSlName).trigger("change");
                //End Auto Filter
                FadePageCover(false);
            }
            , null);
    }
}