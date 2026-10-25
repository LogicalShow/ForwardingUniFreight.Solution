// City Country ---------------------------------------------------------------
// Bind Services Table Rows
function Services_BindTableRows(pServices) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblServices");
    $.each(pServices, function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblServices",
            ("<tr ID='" + item.ID + "' ondblclick='Services_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='Code' val='" + item.Code + "'>" + item.Code + "</td>"
                + "<td class='Name' val='" + item.Name + "'>" + item.Name + "</td>"
                + "<td class='PreCode' val='" + item.PreCode + "'>" + item.PreCode + "</td>"
                + "<td class='AccountID' val='" + item.AccountID + "'>" + item.AccountName + "</td>"
                + "<td class='SubAccountID' val='" + item.SubAccountID + "'>" + (item.SubAccountName == "0" ? "-" : item.SubAccountName) + "</td>"
                + "<td class='AccountID2 hide' val='" + item.AccountID2 + "'>" + item.AccountName2 + "</td>"
                + "<td class='SubAccountID2 hide' val='" + item.SubAccountID2 + "'>" + (item.SubAccountName2 == "0" ? "-" : item.SubAccountName2) + "</td>"

                + "<td class='CostCenterID hide' val='" + item.CostCenterID + "'>" + "0" + "</td>"
                + "<td class='hServices'><a href='#ServicesModal' data-toggle='modal' onclick='Services_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblServices", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblServices>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Services_EditByDblClick(pID) {
    jQuery("#ServicesModal").modal("show");
    Services_FillControls(pID);
}
// Loading with data
function Services_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Services/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Services_BindTableRows(pTabelRows); Services_ClearAllControls(); });
    HighlightText("#tblServices>tbody>tr", $("#txt-Search").val().trim());
}

//var IsOldName = "0";

function Services_Insert(pSaveandAddNew) {


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
        InsertUpdateFunction("form", "/api/Services/Insert", {
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim(),
            pPreCode: IsNull($("#txtPreCode").val(), "0"),
            pAccountID2: $("#slAccountID2").val().trim(),
            pSubAccountID2: $("#slSubAccountID2").val().trim()
        }, pSaveandAddNew, "ServicesModal", function () {
            Services_LoadingWithPaging();
            //IntializeData();
        });
    }
    //    }

    //});


}


function Services_Update(pSaveandAddNew) {


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
        InsertUpdateFunction("form", "/api/Services/Update", {
            pID: $("#hID").val(),
            pName: $("#txtName").val().trim().toUpperCase(),
            pAccountID: $("#slAccountID").val().trim(),
            pSubAccountID: $("#slSubAccountID").val().trim(),
            pPreCode: IsNull($("#txtPreCode").val(), "0"),
            pAccountID2: $("#slAccountID2").val().trim(),
            pSubAccountID2: $("#slSubAccountID2").val().trim()
        }, pSaveandAddNew, "ServicesModal", function () {
            Services_LoadingWithPaging();
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
        url: strServerURL + "api/Services/IntializeData",
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




function Services_Delete(pID) {
    DeleteListFunction("/api/Services/DeleteByID", { "pID": pID }, function () { Services_LoadingWithPaging(); });
}

function Services_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblServices') != "")
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
                DeleteListFunction("/api/Services/Delete", { "pServicesIDs": GetAllSelectedIDsAsString('tblServices') }, function () { Services_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/Services/Delete", { "pServicesIDs": GetAllSelectedIDsAsString('tblServices') }, function () { Services_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Services_FillControls(pID) {
    debugger;
    ClearAll("#ServicesModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    $("#txtName").val($(tr).find("td.Name").attr('val').toUpperCase());
    $("#txtPreCode").val($(tr).find("td.PreCode").attr('val'));
    $("#txtCode").val($(tr).find("td.Code").attr('val'));
    $("#slAccountID").val($(tr).find("td.AccountID").attr('val'));
    $("#slAccountID2").val($(tr).find("td.AccountID2").attr('val'));

    //Fill_SelectInput_WithDependedID("api/Services/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", $(tr).find("td.SubAccountID").attr('val'), $(tr).find("td.AccountID").attr('val'));
    Details_FillSlSubAccount("slSubAccountID", $(tr).find("td.SubAccountID").attr('val'));
    Details_FillSlSubAccount2("slSubAccountID2", $(tr).find("td.SubAccountID2").attr('val'));


    //$("#slSubAccountID").val($(tr).find("td.SubAccountID").attr('val'));
    $("#btnSave").attr("onclick", "Services_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Services_Update(true);");
}

function Services_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#ServicesModal", null);
    $('#slSubAccountID').html('');
    $("#btnSave").attr("onclick", "Services_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Services_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}


function GetSubAccount() {
    //Fill_SelectInputAfterLoadData(d[1], 'ID', , '<-- select SubAccount -->', '#hidden_slSubAccountID', '');

    Fill_SelectInput_WithDependedID("api/Services/IntializeData", "ID", "SubAccount_Name", "Select SubAccount", "#slSubAccountID", null, $('#slAccountID').val());
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