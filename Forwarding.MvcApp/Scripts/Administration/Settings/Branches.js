// Branch Region ---------------------------------------------------------------
// Bind Branches Table Rows
function Branches_BindTableRows(pBranches) {
    debugger;
    $("#hl-menu-Administration").parent().addClass("active");
    ClearAllTableRows("tblBranches");
    $.each(pBranches, function (i, item) {
        debugger;
        editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblBranches",
        ("<tr ID='" + item.ID + "' ondblclick='Branches_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='CountryID hide' val='" + item.CountryID + "'>" + item.CountryName + "</td>"
                    + "<td class='CityID hide' val='" + item.CityID + "'>" + item.CityName + "</td>"
                    + "<td class='Phone1 hide'>" + item.Phone1 + "</td>"
                    + "<td class='Phone2 hide'>" + item.Phone2 + "</td>"
                    + "<td class='Mobile1 hide'>" + item.Mobile1 + "</td>"
                    + "<td class='Fax hide'>" + item.Fax + "</td>"
                    + "<td class='Address hide'>" + item.Address + "</td>"
                    + "<td class='ZipCode hide'>" + item.ZipCode + "</td>"
                    + "<td class='AliasName hide'>" + (item.AliasName == 0 ? "" : item.AliasName) + "</td>"
                    + "<td class='FA_LastDepreciationDate hide'>" + GetDateFromServer( item.FA_LastDepreciationDate )+ "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='isDepartement hide'> <input type='checkbox' disabled='disabled' val='" + (item.isDepartement == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td><a onclick='OpenUsersModal(" + item.ID + ");' class='btn btn-xs btn-rounded btn-blue float-right'> <i class='fa fa-users' style='padding-left:5px;'></i> <span style='padding-right:5px;'> " + ($("[id$='hf_ChangeLanguage']").val() == "ar" ? "ربط المستخدمين" : "Branches Users") + " </span></a></td>"
                    + "<td class='hide'><a href='#BranchModal' data-toggle='modal' onclick='Branches_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblBranches", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblBranches>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".classShowForUNF").removeClass("hide");
    }
}
function Branches_EditByDblClick(pID) {
    jQuery("#BranchModal").modal("show");
    Branches_FillControls(pID);
}
// Loading with data
function Branches_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Branches/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Branches_BindTableRows(pTabelRows); Branches_ClearAllControls(); });
    HighlightText("#tblBranches>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function Branches_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/Branches/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        Branches_BindTableRows(pTabelRows); Branches_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblBranches>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new Branch item.
function Branches_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Branches/Insert", { pFA_LastDepreciationDate: ($("#hFA_LastDepreciationDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#hFA_LastDepreciationDate").val())), pCountryID: $('#slCountries option:selected').val(), pCityID: $('#slCities option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: ($("#txtLocalName").val() == null ? "" : $("#txtLocalName").val().trim()), pPhone1: ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim()), pPhone2: ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim()), pMobile1: ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim()), pFax: ($("#txtFax").val() == null ? "" : $("#txtFax").val().trim()), pAddress: ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim()), pZipCode: ($("#txtZipCode").val() == null ? "" : $("#txtZipCode").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked'), pIsDepartement: $("#cbIsDepartement").prop('checked'), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pAliasName: ($("#txtAliasName").val() == null ? "" : $("#txtAliasName").val()) }, pSaveandAddNew, "BranchModal", function () { Branches_LoadingWithPaging(); });
}
// calling this function for update
function Branches_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Branches/Update", { pID: $("#hID").val(), pFA_LastDepreciationDate: ($("#hFA_LastDepreciationDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#hFA_LastDepreciationDate").val())), pCountryID: $('#slCountries option:selected').val(), pCityID: $('#slCities option:selected').val(), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: ($("#txtLocalName").val() == null ? "" : $("#txtLocalName").val().trim()), pPhone1: ($("#txtPhone1").val() == null ? "" : $("#txtPhone1").val().trim()), pPhone2: ($("#txtPhone2").val() == null ? "" : $("#txtPhone2").val().trim()), pMobile1: ($("#txtMobile1").val() == null ? "" : $("#txtMobile1").val().trim()), pFax: ($("#txtFax").val() == null ? "" : $("#txtFax").val().trim()), pAddress: ($("#txtAddress").val() == null ? "" : $("#txtAddress").val().trim()), pZipCode: ($("#txtZipCode").val() == null ? "" : $("#txtZipCode").val().trim()), pIsInactive: $("#cbIsInactive").prop('checked'), pIsDepartement: $("#cbIsDepartement").prop('checked'), pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim()), pAliasName: ($("#txtAliasName").val() == null ? "" : $("#txtAliasName").val())}, pSaveandAddNew, "BranchModal", function () { Branches_LoadingWithPaging(); });
}

function Branches_Delete(pID) {
    DeleteListFunction("/api/Branches/DeleteByID", { "pID": pID }, function () { Branches_LoadingWithPaging(); });
}

function Branches_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblBranches') != "")
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
            DeleteListFunction("/api/Branches/Delete", { "pBranchesIDs": GetAllSelectedIDsAsString('tblBranches') }, function () { Branches_LoadingWithPaging(); });
        });
    //DeleteListFunction("/api/Branches/Delete", { "pBranchesIDs": GetAllSelectedIDsAsString('tblBranches') }, function () { Branches_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function Branches_FillControls(pID) {
    debugger;
    // Fill All Model Controls

    //Branches_ClearAllControls();
    //i used the next line instead of the previous one to fix a problem of instability of the slRegion filling in case of editing
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    //ClearAll("Branch-form", null);
    ClearAll("#BranchModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");
    //the next 4 lines are to set the select boxes to the values entered before
    var pCityID = $(tr).find("td.CityID").attr('val');
    Cities_GetList(pCityID, false);//the second parameter is pIsCopyFromMainAddress(just used in Addresses Modal)
    var pCountryID = $(tr).find("td.CountryID").attr('val');
    Countries_GetList(pCountryID, null);

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtPhone1").val($(tr).find("td.Phone1").text());
    $("#txtPhone2").val($(tr).find("td.Phone2").text());
    $("#txtMobile1").val($(tr).find("td.Mobile1").text());
    $("#txtFax").val($(tr).find("td.Fax").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtZipCode").val($(tr).find("td.ZipCode").text());
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#cbIsDepartement").prop('checked', $(tr).find('td.isDepartement').find('input').attr('val'));

    $("#txtNotes").val($(tr).find("td.Notes").text());

    $("#txtAliasName").val($(tr).find("td.AliasName").text());


    $("#hFA_LastDepreciationDate").val($(tr).find("td.FA_LastDepreciationDate").text());



    $("#btnSave").attr("onclick", "Branches_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Branches_Update(true);");
}

function Branches_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slRegion"), null);
    ClearAll("#BranchModal", null);

    Countries_GetList(null, function () { Cities_GetList(null, null); });
    
    $("#hFA_LastDepreciationDate").val("01/01/1900");
    $("#btnSave").attr("onclick", "Branches_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Branches_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
// Branch Region ---------------------------------------------------------------

////////////////////////Fill select boxes/////////////////////////////////////////////
//fill slCountries
function Countries_GetList(pID, callback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithName(pID, "/api/Countries/LoadAll", TranslateString("SelectFromMenu"), "slCountries");
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
    GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", TranslateString("SelectFromMenu"), "slCities", pWhereClause);
}






function OpenUsersModal(BranchID) {
    $("#hID").val(BranchID);
    LoadUsers(BranchID);
    jQuery("#UsersModal").modal("show");
    $("#cbCheckAllUsers").prop("checked", false);
}

function LoadUsers(BranchID) {
    debugger
    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Branches/GetBranchUsers"
        ,
        {
            pBranchID: BranchID
        }
        , function (pData) {
            FadePageCover(false);
            var BranchUsers = JSON.parse(pData[0]);
            var SelectedBranchUsers = BranchUsers.map(item => item.UserID);
            FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUsers("divCbUsers", pData[1], "nameCbUsers", "Name", SelectedBranchUsers);
        }
        , null);
}

function FillDivWithCheckboxes_DynamicFiledWithCheckedValsForUsers(pDivName, pMasterData, pCheckboxNameAttr, FieldName, pArrCheckedVals, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";

    var ArrCheckedVals = pArrCheckedVals;// (IsNull(CheckedVals, "")).split(',');
    $.each(JSON.parse(pMasterData), function (i, item) {
        var checked = "";
        if (ArrCheckedVals.indexOf(item.ID) != -1)
            checked = " checked ";
        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input ' + checked + ' type="checkbox" name="' + pCheckboxNameAttr + '" onchange="cbAfterChangeUsersCheckBox(this);"  onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName];
        option += ' &nbsp;</label> </div>';
    });
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}

function cbCheckAllUsers() {
    debugger;
    if ($("#cbCheckAllUsers").prop("checked"))
        $("#divCbUsers input[name=nameCbUsers]").prop("checked", true);
    else
        $("#divCbUsers input[name=nameCbUsers]").prop("checked", false);
}

function cbAfterChangeUsersCheckBox(THIS) {
    var IsChecked = $(THIS).is(':checked');

    if (!IsChecked) {
        $("#cbCheckAllUsers").prop("checked", false);
    }
    else if ($("#divCbUsers input[name=nameCbUsers]:checked").length == $("#divCbUsers input[name=nameCbUsers]").length) {
        $("#cbCheckAllUsers").prop("checked", true);
    }
}


function UpdateBranchUsers(pSaveandAddNew) {
    debugger
    var data =
    {
        "pID": $("#hID").val(),
        "pUsersIDs": IsNull(GetAllSelectedIDsAsStringWithNameAttr("nameCbUsers"), "0")
    };
    PostInsertUpdateFunction("form", "/api/Branches/UpdateBranchUsers", data, pSaveandAddNew, "UsersModal", function () {
        Branches_LoadingWithPaging();
    });
}