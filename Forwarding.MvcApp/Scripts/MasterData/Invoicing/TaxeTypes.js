// TaxeTypes Region ---------------------------------------------------------------
// Bind TaxeTypes Table Rows
function TaxeTypes_BindTableRows(pTaxeTypes) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblTaxeTypes");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pTaxeTypes, function (i, item) {
        //jQuery.noConflict();
        AppendRowtoTable("tblTaxeTypes",
        ("<tr ID='" + item.ID + "' ondblclick='TaxeTypes_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='CurrentPercentage'>" + item.CurrentPercentage + "</td>"
                    + "<td class='CurrentPercentageDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CurrentPercentageDate)) + "</td>"
                    + "<td class='IsDiscount'> <input type='checkbox' disabled='disabled' val='" + (item.IsDiscount == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='Account_ID hide'>" + item.Account_ID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccount_ID hide'>" + item.SubAccount_ID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='IsDebitAccount hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsDebitAccount == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='Notes'>" + item.Notes + "</td>"
                    //i added class='View' to the next line to exclude it from security in case of CanView only
                    + "<td class='View'><a href='#LogTaxesPercentagesModal' data-toggle='modal' onclick='LogTaxesPercentages_LoadingWithPagingForModal(" + item.ID + ");' " + editLogTaxesPercentagesText + "</a></td>"
                    + "<td class='hide'><a href='#TaxeTypeModal' data-toggle='modal' onclick='TaxeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblTaxeTypes", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblTaxeTypes>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function TaxeTypes_EditByDblClick(pID) {
    jQuery("#TaxeTypeModal").modal("show");
    TaxeTypes_FillControls(pID);
}
function TaxeTypes_GetWhereClause() {
    var pWhereClause = "WHERE 1=1";
    if ($("#txt-Search").val().trim() != "") {
        pWhereClause += " AND (" + "\n";
        pWhereClause += " Code LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR Name LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += " OR LocalName LIKE N'%" + $("#txt-Search").val().trim() + "%'" + "\n";
        pWhereClause += ")";
    }
    return pWhereClause;
}
function TaxeTypes_LoadingWithPaging() {
    debugger;
    var pWhereClause = TaxeTypes_GetWhereClause();
    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());
    var pOrderBy = "Code";
    var pControllerParameters = { pIsLoadArrayOfObjects: false, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { TaxeTypes_BindTableRows(JSON.parse(pData[0])); });
    HighlightText("#tblTaxeTypes>tbody>tr", $("#txt-Search").val().trim());
}
function TaxeTypes_Insert(pSaveandAddNew) {
    debugger;
    var datevar = ($("#txtCurrentPercentageDate").val().trim() == "" ? "" : ConvertDateFormat($("#txtCurrentPercentageDate").val().trim()));
    InsertUpdateFunction("form", "/api/TaxeTypes/Insert", {
        pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtName").val().trim() //$("#txtLocalName").val().trim()
        , pCurrentPercentage: $("#txtCurrentPercentage").val().trim()
        , pCurrentPercentageDate: datevar
        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
        , pIsDiscount: $("#cbIsDiscount").prop('checked')
        , pIsInactive: $("#cbIsInactive").prop('checked')
        
        , pAccount_ID: $("#slAccount").val()
        , pSubAccount_ID: $("#slSubAccount").val()
        , pIsDebitAccount: $("#cbIsDebitAccount").prop('checked')

    }, pSaveandAddNew, "TaxeTypeModal", function () {
        TaxeTypes_LoadingWithPaging();
        if (pSaveandAddNew)
            TaxeTypes_ClearAllControls();
    });
}

//calling this function for update
function TaxeTypes_Update(pSaveandAddNew) {
    debugger;
    var datevar = ConvertDateFormat($("#txtCurrentPercentageDate").val().trim());
    InsertUpdateFunction("form", "/api/TaxeTypes/Update", {
        pID: $("#hID").val()
        , pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtName").val().trim() //$("#txtLocalName").val().trim()
        , pCurrentPercentage: $("#txtCurrentPercentage").val().trim()
        , pCurrentPercentageDate: datevar
        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
        , pIsDiscount: $("#cbIsDiscount").prop('checked')
        , pIsInactive: $("#cbIsInactive").prop('checked')

        , pAccount_ID: $("#slAccount").val()
        , pSubAccount_ID: $("#slSubAccount").val()
        , pIsDebitAccount: $("#cbIsDebitAccount").prop('checked')

    }, pSaveandAddNew, "TaxeTypeModal", function () {
        TaxeTypes_LoadingWithPaging();
        if (pSaveandAddNew)
            TaxeTypes_ClearAllControls();
    });
}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function TaxeTypes_UnlockRecord() {
    //UnlockFunction("/api/TaxeTypes/UnlockRecord",
    //    { pID: $("#hID").val() },
    //    "TaxeTypeModal",
    //    function () { TaxeTypes_LoadingWithPaging(); }); //the callback function
}
//function TaxeTypes_Delete(pID) {
//    DeleteListFunction("/api/TaxeTypes/DeleteByID", { "pID": pID }, function () { TaxeTypes_LoadingWithPaging(); });
//}

function TaxeTypes_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblTaxeTypes') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of confirm delete
        function () {
            DeleteListFunction("/api/TaxeTypes/Delete", { "pTaxeTypesIDs": GetAllSelectedIDsAsString('tblTaxeTypes') }, function () { TaxeTypes_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/TaxeTypes/Delete", { "pTaxeTypesIDs": GetAllSelectedIDsAsString('tblTaxeTypes') }, function () { TaxeTypes_LoadingWithPaging(); });
}

//after pressing edit, this function fills the data
function TaxeTypes_FillControls(pID) {
    ClearAll("#TaxeTypeModal");
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    debugger;
    $("#lblShown").html(": " + $(tr).find("td.Code").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtCurrentPercentage").val($(tr).find("td.CurrentPercentage").text());
    $("#txtCurrentPercentageDate").val($(tr).find("td.CurrentPercentageDate").html());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#cbIsDiscount").prop('checked', $(tr).find('td.IsDiscount').find('input').attr('val'));
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));

    $("#slAccount").val($(tr).find("td.Account_ID").text());
    //$("#slSubAccount").val($(tr).find("td.SubAccount_ID").text());
    $("#cbIsDebitAccount").prop('checked', $(tr).find('td.IsDebitAccount').find('input').attr('val'));

    Details_FillSlSubAccount("slSubAccount" , $(tr).find("td.SubAccount_ID").text(), $(tr).find("td.Account_ID").text());

    $("#btnSave").attr("onclick", "TaxeTypes_Update(false);");
    $("#btnSaveandNew").attr("onclick", "TaxeTypes_Update(true);");
}

function TaxeTypes_ClearAllControls(callback) {
    ClearAll("#TaxeTypeModal");
    $("#btnSave").attr("onclick", "TaxeTypes_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "TaxeTypes_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
}

//function TaxeTypes_CheckValueIsDecimal(id) {
//    debugger;
//    CheckValueIsDecimal("#" + id);
//}

//EOF  TaxeTypes Region ---------------------------------------------------------------

// LogTaxesPercentages
//after pressing Perc. Log, gets the data
//sherif: used in case searching for specific ID and filling table in a modal
function LogTaxesPercentages_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var tr = $("tr[ID='" + pID + "']");

    $("#lblTaxeTypeCode").text($(tr).find("td.Name").text());
    strLoadWithPagingFunctionName = "/api/LogTaxesPercentages/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "LogTaxesPercentages_BindTableRows";
    var pWhereClause = " WHERE TaxeTypeID = " + pID;
    var pOrderBy = " LogTaxesPercentageID DESC ";
    LoadWithPagingForModal(strLoadWithPagingFunctionName, pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        LogTaxesPercentages_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
        //if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
        //    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());
    });
}

// Bind LogTaxesPercentages Table Rows
function LogTaxesPercentages_BindTableRows(pLogTaxesPercentages) {
    debugger;
    //strLoadWithPagingFunctionName = "/api/LogTaxesPercentages/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    //strBindTableRowsFunctionName = "LogTaxesPercentages_BindTableRows";

    ClearAllTableRows("tblLogTaxesPercentages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pLogTaxesPercentages, function (i, item) {
        //jQuery.noConflict();
        AppendRowtoTable("tblLogTaxesPercentages",
        ("<tr LogTaxesPercentageID='" + item.LogTaxesPercentageID + "'>"
                    //+ "<td class='LogTaxesPercentageID'> <input name='Delete' type='checkbox' value='" + item.LogTaxesPercentageID + "' /></td>"
                    //+ "<td class='Code'>" + item.Code + "</td>"
                    //+ "<td class='Name'>" + item.Name + "</td>"
                    //+ "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='PercentageDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.PercentageDate)) + "</td>"
                    + "<td class='Percentage'>" + item.Percentage + "</td></tr>"));
                    //+ "<td class='Notes'>" + item.Notes + "</td>"
                    //+ "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    //+ "<td><a href='#LogTaxesPercentagesModal' data-toggle='modal' onclick='LogTaxesPercentages_LoadingWithPagingForModal(" + item.ID + ");' " + editLogTaxesPercentagesText + "</a></td>"
                    //+ "<td><a href='#TaxeTypeModal' data-toggle='modal' onclick='TaxeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
                    //+ "<td><a data-target='#TaxeTypeModal' data-toggle='modal' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    BindAllCheckboxonTable("tblLogTaxesPercentages", "LogTaxesPercentageID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());

}

//to reset function names as in mainapp.master
function LogTaxesPercentages_ResetFunctionsNames()
{
    strLoadWithPagingFunctionName = "/api/TaxeTypes/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "TaxeTypes_BindTableRows";
}

//----------------------------SubAccountFilter---------------------------------------
function Details_FillSlSubAccount(pSlName, pSubAccountID, pAccountID) {
    debugger;
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pSubAccountID, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            if ($("#hDefaultUnEditableCompanyName").val() == "ERP") {
                //Start Auto Filter
                $("#" + pSlName).css({ "width": "80%" }).select2();
                $("div[tabindex='-1']").removeAttr('tabindex');
                $("#" + pSlName).trigger("change");
                //End Auto Filter
            }
            FadePageCover(false);
        }
        , null);
}
function Details_AccountChanged() {
    debugger;
    $("#slSubAccount").val(0);
    Details_FillSlSubAccount("slSubAccount", 0, $("#slAccount").val());
}