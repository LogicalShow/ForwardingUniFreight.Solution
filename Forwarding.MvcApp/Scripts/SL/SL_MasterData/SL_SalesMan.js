function SL_SalesMan_BindTableRows(pSL_SalesMan) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSL_SalesMan");
    $.each(pSL_SalesMan, function (i, item) {
        AppendRowtoTable("tblSL_SalesMan",
        ("<tr ID='" + item.ID + "' ondblclick='SL_SalesMan_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='SL_SalesManID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
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

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                    + "<td class='hide'><a href='#SL_SalesManModal' data-toggle='modal' onclick='SL_SalesMan_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSL_SalesMan", "SL_SalesManID", "cbSL_SalesManDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeleteSL_SalesManID");
    HighlightText("#tblSL_SalesMan>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
   
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SL_SalesMan_EditByDblClick(pID) {
    jQuery("#SL_SalesManModal").modal("show");
    SL_SalesMan_FillControls(pID);
}
// Loading with data
function SL_SalesMan_LoadingWithPaging() {
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/SL_SalesMan/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { SL_SalesMan_BindTableRows(pTabelRows); SL_SalesMan_ClearAllControls(); });
    HighlightText("#tblSL_SalesMan>tbody>tr", $("#txt-Search").val().trim());
}


function GetUSers() {
    debugger;
    CallGETFunctionWithParameters("/api/SL_SalesMan/GetUsers", { type: 2}
           , function (pData) {
               FillListFromObject_ERP(null, 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slUser", pData[0], null);
              
           }, null);

}
// calling web function to add new SL_SalesMan item.
function SL_SalesMan_Insert(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/SL_SalesMan/Insert", {
        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim().toUpperCase(),
        pJob: $("#txtJob").val().trim() == "" ? "0" : $("#txtJob").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase(),
        pMobile: $("#txtMobile").val().trim() == "" ? "0" : $("#txtMobile").val().trim().toUpperCase(),
        pPhone: $("#txtPhone").val().trim() == "" ? "0" : $("#txtPhone").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()

        , pAccountID: $("#slAccount").val()
        , pSubAccountID: $("#slSubAccount").val()
        , pCostCenterID: $("#slCostCenter").val()
        , pSubAccountGroupID: $("#slSubAccountGroup").val()
         , pUserID: $("#slUser").val()
    }, pSaveandAddNew, "SL_SalesManModal",
    function () {
        SL_SalesMan_LoadingWithPaging();
    });
}
// calling this function for update
function SL_SalesMan_Update(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SL_SalesMan/Update", {
        pID: $("#hID").val(),
        //pCode: $("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase(),
        pName: $("#txtName").val().trim() == "" ? "0" : $("#txtName").val().trim().toUpperCase(),
        pLocalName: $("#txtLocalName").val().trim() == "" ? "0" : $("#txtLocalName").val().trim().toUpperCase(),
        pJob: $("#txtJob").val().trim() == "" ? "0" : $("#txtJob").val().trim().toUpperCase(),
        pAddress: $("#txtAddress").val().trim() == "" ? "0" : $("#txtAddress").val().trim().toUpperCase(),
        pMobile: $("#txtMobile").val().trim() == "" ? "0" : $("#txtMobile").val().trim().toUpperCase(),
        pPhone: $("#txtPhone").val().trim() == "" ? "0" : $("#txtPhone").val().trim().toUpperCase(),
        pNotes: $("#txtNotes").val().trim() == "" ? "0" : $("#txtNotes").val().trim().toUpperCase()
       

        , pAccountID: $("#slAccount").val()
        , pSubAccountID: $("#slSubAccount").val()
        , pCostCenterID: $("#slCostCenter").val()
        , pSubAccountGroupID: $("#slSubAccountGroup").val()
        , pUserID: $("#slUser").val()
    }, pSaveandAddNew, "SL_SalesManModal", function () { SL_SalesMan_LoadingWithPaging(); });
}
function SL_SalesMan_Delete(pID) {
    DeleteListFunction("/api/SL_SalesMan/DeleteByID", { "pID": pID }, function () { SL_SalesMan_LoadingWithPaging(); });
}
function SL_SalesMan_DeleteList() {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSL_SalesMan') != "")
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
            DeleteListFunction("/api/SL_SalesMan/Delete", { "pSL_SalesManIDs": GetAllSelectedIDsAsString('tblSL_SalesMan') }, function () { SL_SalesMan_LoadingWithPaging(); });
        });
}
//after pressing edit, this function fills the data
function SL_SalesMan_FillControls(pID) {
    debugger;
    ClearAll("#SL_SalesManModal", null);
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
    CallGETFunctionWithParameters("/api/SL_SalesMan/GetUsers", {type: 1}
           , function (pData) {
               FillListFromObject_ERP($(tr).find("td.UserID").text(), 2/*pCodeOrName*/, TranslateString("<--Select-->"), "slUser", pData[0], null);

           }, null);

    //////////
    
    $("#btnSave").attr("onclick", "SL_SalesMan_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SL_SalesMan_Update(true);");
}
function SL_SalesMan_ClearAllControls() {
    ClearAll("#SL_SalesManModal", null);

    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');
    $("#slUser").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');


    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    $("#btnSave").attr("onclick", "SL_SalesMan_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SL_SalesMan_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
