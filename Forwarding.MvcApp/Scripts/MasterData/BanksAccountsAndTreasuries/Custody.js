function Custody_BindTableRows(pCustody) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCustody");
    $.each(pCustody, function (i, item) {
        AppendRowtoTable("tblCustody",
        ("<tr ID='" + item.ID + "' ondblclick='Custody_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='CustodyID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code hide'>" + (item.Code == 0 ? "" : item.Code) + "</td>"
                    + "<td class='Name'>" + (item.Name == 0 ? "" : item.Name) + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    //+ "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='Job'>" + (item.Job == 0 ? "" : item.Job) + "</td>"
                    + "<td class='Address hide'>" + (item.Address == 0 ? "" : item.Address) + "</td>"
                    + "<td class='UserID hide'>" + (item.UserID == 0 ? "" : item.UserID) + "</td>"
                    + "<td class='UserName hide'>" + (item.UserName == 0 ? "" : item.UserName) + "</td>"
                    + "<td class='Mobile'>" + (item.Mobile == 0 ? "" : item.Mobile) + "</td>"
                    + "<td class='Phone'>" + (item.Phone == 0 ? "" : item.Phone) + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='Finance365Ref hide'>" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"
                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                    + "<td class='hide'><a href='#CustodyModal' data-toggle='modal' onclick='Custody_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustody", "CustodyID", "cbCustodyDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteCustodyID");
    HighlightText("#tblCustody>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Custody_EditByDblClick(pID) {
    jQuery("#CustodyModal").modal("show");
    Custody_FillControls(pID);
}
// Loading with data
function Custody_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Custody/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Custody_BindTableRows(pTabelRows); Custody_ClearAllControls(); });
    HighlightText("#tblCustody>tbody>tr", $("#txt-Search").val().trim());
}


function GetUSers() {
    debugger;
    CallGETFunctionWithParameters("/api/Custody/GetUsers", { type: 2}
           , function (pData) {
               FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slUser", pData[0], null);
              
           }, null);

}
// calling web function to add new Custody item.
function Custody_Insert(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/Custody/Insert", {
        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim().toUpperCase(),
        pJob: $("#txtJob").val().trim() == "" ? "0" : $("#txtJob").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase(),
        pMobile: $("#txtMobile").val().trim() == "" ? "0" : $("#txtMobile").val().trim().toUpperCase(),
        pPhone: $("#txtPhone").val().trim() == "" ? "0" : $("#txtPhone").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
        , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
        , pAccountID: $("#slAccount").val()
        , pSubAccountID: $("#slSubAccount").val()
        , pCostCenterID: $("#slCostCenter").val()
        , pSubAccountGroupID: $("#slSubAccountGroup").val()
         , pUserID: $("#slUser").val()
    }, pSaveandAddNew, "CustodyModal",
    function () {
        Custody_LoadingWithPaging();
    });
}
// calling this function for update
function Custody_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/Custody/Update", {
        pID: $("#hID").val(),
        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim().toUpperCase(),
        pJob: $("#txtJob").val().trim() == "" ? "0" : $("#txtJob").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase(),
        pMobile: $("#txtMobile").val().trim() == "" ? "0" : $("#txtMobile").val().trim().toUpperCase(),
        pPhone: $("#txtPhone").val().trim() == "" ? "0" : $("#txtPhone").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
        , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())

        , pAccountID: $("#slAccount").val()
        , pSubAccountID: $("#slSubAccount").val()
        , pCostCenterID: $("#slCostCenter").val()
        , pSubAccountGroupID: $("#slSubAccountGroup").val()
        , pUserID: $("#slUser").val()
    }, pSaveandAddNew, "CustodyModal", function () { Custody_LoadingWithPaging(); });
}
function Custody_Delete(pID) {
    DeleteListFunction("/api/Custody/DeleteByID", { "pID": pID }, function () { Custody_LoadingWithPaging(); });
}
function Custody_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustody') != "")
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
            DeleteListFunction("/api/Custody/Delete", { "pCustodyIDs": GetAllSelectedIDsAsString('tblCustody') }, function () { Custody_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function Custody_FillControls(pID) {
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    ClearAll("#CustodyModal", null);
    var tr = $("tr[ID='" + pID + "']");

    $("#hID").val(pID);
    $("#lblShown").html(" : " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtJob").val($(tr).find("td.Job").text());
    $("#txtAddress").val($(tr).find("td.Address").text());
    $("#txtMobile").val($(tr).find("td.Mobile").text());
    $("#txtPhone").val($(tr).find("td.Phone").text());
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());

    if ($(tr).find("td.SubAccountID").text() == 0) {
        $("#slAccount").removeAttr("disabled");
        $("#slSubAccountGroup").removeAttr("disabled");
    }
    else {
        $("#slAccount").attr("disabled", "disabled");
        $("#slSubAccountGroup").attr("disabled", "disabled");
    }

    if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
        $("#txtName").removeAttr("disabled");
        $("#txtLocalName").removeAttr("disabled");
    }
    else {
        $("#txtName").attr("disabled", "disabled");
        $("#txtLocalName").attr("disabled", "disabled");
    }

    $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
    FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
    //$("#slAccount").val($(tr).find("td.AccountID").text());

    //FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
    var pSubAccountID = $(tr).find("td.SubAccountID").text();
    $("#slSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');
    $("#slCostCenter").val($(tr).find("td.CostCenterID").text());

    ////////////fill users
    CallGETFunctionWithParameters("/api/Custody/GetUsers", {type: 1}
           , function (pData) {
               FillListFromObject_ERP($(tr).find("td.UserID").text(), 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slUser", pData[0], null);

           }, null);

    //////////
    
    $("#btnSave").attr("onclick", "Custody_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Custody_Update(true);");
}
function Custody_ClearAllControls() {
    ClearAll("#CustodyModal", null);
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');
    $("#slUser").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');


    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    $("#btnSave").attr("onclick", "Custody_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Custody_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
