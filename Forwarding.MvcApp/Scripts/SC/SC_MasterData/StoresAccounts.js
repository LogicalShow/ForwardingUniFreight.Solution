// City Country ---------------------------------------------------------------
// Bind SC_Stores Table Rows
function SC_Stores_BindTableRows(pSC_Stores) {
    debugger;
    $("#hl-menu-SC").parent().addClass("active");
    ClearAllTableRows("tblSC_Stores");
    $.each(pSC_Stores, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSC_Stores",
        ("<tr ID='" + item.ID + "' ondblclick='SC_Stores_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            + "<td class='StoreName' val='" + item.StoreName + "'>" + item.StoreName + "</td>"
            + "<td class='StoreAccountID' val='" + item.StoreAccountID + "'>" + item.StoreAccountName + "</td>"
            + "<td class='OperationAccountID' val='" + item.OperationAccountID + "'>" + item.OperationAccountName + "</td>"
            + "<td class='SubAccountID hide' val='" + item.SubAccountID + "'>" + item.SubAccountID + "</td>"


            + "<td class='SalesAccountID' val='" + item.SalesAccountID + "'>" + item.SalesAccountName + "</td>"
            + "<td class='CostCenterID' val='" + item.CostCenterID + "'>" + item.CostCenterName + "</td>"
                    + "<td class='hSC_Stores'><a href='#SC_StoresModal' data-toggle='modal' onclick='SC_Stores_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSC_Stores", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSC_Stores>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SC_Stores_EditByDblClick(pID) {
    jQuery("#SC_StoresModal").modal("show");
    SC_Stores_FillControls(pID);
}
// Loading with data
function SC_Stores_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SC_Stores/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SC_Stores_BindTableRows(pTabelRows); SC_Stores_ClearAllControls(); });
    HighlightText("#tblSC_Stores>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function SC_Stores_Insert(pSaveandAddNew) {

  
    $('#hidden_slstoresnames > option').each(function (i, option)
    {
        if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase()) {
          //  IsOldName = "1";
            swal("Sorry", "The Store Name is duplicated in the System", "warning");
            return false;

        }
        else if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

            swal("Excuse me", "You must select SubAccount", "warning");

        }
        else if (i == ($('#hidden_slstoresnames > option').length - 1))
        {

            debugger;
            InsertUpdateFunction("form", "/api/SC_Stores/Insert", {
                pStoreName: $("#txtStoreName").val().trim().toUpperCase(),
                pStoreAccountID: $("#slStoreAccountID").val().trim(),
                pSalesAccountID: $("#slSalesAccountID").val().trim(),
                pOperationAccountID: $("#slOperationAccountID").val().trim(),
                pCostCenterID: $("#slCostCenterID").val().trim(),
                pSubAccountID: $("#slSubAccountID").val().trim()

            }, pSaveandAddNew, "SC_StoresModal", function ()
                {
                SC_Stores_LoadingWithPaging();
                IntializeData();


           
                });
        }

    });


}



function IntializeData() {

    FadePageCover(true);
    $.ajax({
        type: "GET",
        url: strServerURL + "api/SC_Stores/IntializeData",
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


// calling this function for update
function SC_Stores_Update(pSaveandAddNew) {

    $('#hidden_slstoresnames > option').each(function (i, option) {
        if ($(option).text().trim().toUpperCase() == $("#txtStoreName").val().trim().toUpperCase() && ($(option).val() != $('#hID').val()))
        {
            //  IsOldName = "1";
            swal("Sorry", "The Store Name is duplicated in the System", "warning");
            return false;

        }
        else if ($('#slSubAccountID option').length > 1 && $('#slSubAccountID').val() == "0") {

            swal("Excuse me", "You must select SubAccount", "warning");

        }
        else if (i == ($('#hidden_slstoresnames > option').length - 1)) {
            InsertUpdateFunction("form", "/api/SC_Stores/Update", {
                pID: $("#hID").val(),
                pStoreName: $("#txtStoreName").val().trim().toUpperCase(),
                pStoreAccountID: $("#slStoreAccountID").val().trim(),
                pSalesAccountID: $("#slSalesAccountID").val().trim(),
                pOperationAccountID: $("#slOperationAccountID").val().trim(),
                pCostCenterID: $("#slCostCenterID").val().trim(),
                pSubAccountID: $("#slSubAccountID").val().trim()

            }, pSaveandAddNew, "SC_StoresModal", function () {
                SC_Stores_LoadingWithPaging();
                IntializeData();
                });
        }
    });
}

function SC_Stores_Delete(pID) {
    DeleteListFunction("/api/SC_Stores/DeleteByID", { "pID": pID }, function () { SC_Stores_LoadingWithPaging(); });
}

function SC_Stores_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSC_Stores') != "")
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
            DeleteListFunction("/api/SC_Stores/Delete", { "pSC_StoresIDs": GetAllSelectedIDsAsString('tblSC_Stores') }, function () { SC_Stores_LoadingWithPaging(); });
        });
        //DeleteListFunction("/api/SC_Stores/Delete", { "pSC_StoresIDs": GetAllSelectedIDsAsString('tblSC_Stores') }, function () { SC_Stores_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function SC_Stores_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //SC_Stores_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slCountry filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    //ClearAll("City-form", null);
    ClearAll("#SC_StoresModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtStoreName").val($(tr).find("td.StoreName").attr('val').toUpperCase());
    $("#slStoreAccountID").val($(tr).find("td.StoreAccountID").attr('val'));
    $("#slOperationAccountID").val($(tr).find("td.OperationAccountID").attr('val'));
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $(tr).find("td.OperationAccountID").attr('val')
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

    $("#slSalesAccountID").val($(tr).find("td.SalesAccountID").attr('val'));
    $("#slCostCenterID").val($(tr).find("td.CostCenterID").attr('val'));
    $("#btnSave").attr("onclick", "SC_Stores_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SC_Stores_Update(true);");
}

function SC_Stores_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SC_StoresModal", null);
    $('#slSubAccountID').html('');

    $("#btnSave").attr("onclick", "SC_Stores_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SC_Stores_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
//function GetSubAccount() {
//    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

//    Fill_SelectInput_WithDependedID("api/Services/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slOperationAccountID').val());
//}
function GetSubAccount() {
    debugger;
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + $('#slOperationAccountID').val()
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