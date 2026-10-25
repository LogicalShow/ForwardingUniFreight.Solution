// City Country ---------------------------------------------------------------
// Bind SystemAccount Table Rows

//[AccountID]
//    , [AccountNameA]
//    , [AccountNameE]
//    , [SystemAccountID]

var arrSystemAccounts = [];
var arrAccounts = [];





function SystemAccount_BindTableRows(pSystemAccount) {
    debugger;
    $("#hl-menu-Accounting").parent().addClass("active");
    ClearAllTableRows("tblSystemAccount");
    $.each(JSON.parse( pSystemAccount ), function (i, item) {
        debugger;
        //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
        AppendRowtoTable("tblSystemAccount",
            ("<tr ID='" + item.AccountID + "'   ondblclick=''>"
                + "<td class='ID'> <input disabled='disabled' name='Delete' type='checkbox' value='" + item.AccountID + "' /></td>"
                + "<td class='AccountNameE' val='" + item.AccountNameE + "'>" + item.AccountNameE + "</td>"
                + "<td class='AccountNameA' val='" + item.AccountNameA + "'>" + item.AccountNameA + "</td>"
                 + "<td class='hide ParentAccountID' val='" + item.ParentAccountID + "'>" + item.AccountID + "</td>"
                + "<td class='SystemAccountID' val='" + item.SystemAccountID + "'>" + '<select id="sl' + item.AccountID + '" AccountID ="' + item.AccountID + '" ParentAccountID ="' + item.ParentAccountID + '"onchange="FillIDs(this);" class="input-sm form-group col-sm-10">' + $('#hslSystemAccountID').html() + '</select>' + "</td>"
                + "<td class='hide hSystemAccount'><a href='#SystemAccountModal' data-toggle='modal' onclick='SystemAccount_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));

        $("#sl" + item.AccountID + "").val(item.SystemAccountID);
     
        var AccountID = $('#tblSystemAccount tbody').find("tr[ID='" + item.ParentAccountID + "']").find("td.SystemAccountID").attr('val');
        var pSlName = "sl" + item.AccountID;
        if (item.ParentAccountID != 0 && item.ParentAccountID != undefined && item.ParentAccountID != "") {
            FillSubAccounts(pSlName, AccountID,item.SystemAccountID);
        }

    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblSystemAccount", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSystemAccount>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function SystemAccount_EditByDblClick(pID) {
    jQuery("#SystemAccountModal").modal("show");
    SystemAccount_FillControls(pID);
}
// Loading with data
function SystemAccount_LoadingWithPaging() {
    debugger;

        //  , [AccountNameA]
        //, [AccountNameE]
        //, [SystemAccountID]

    var wherecondition = ''; 
    if ($("#txt-Search").val().trim() == '')
        wherecondition = "where 1 = 1";
    else
        wherecondition = "where AccountNameA LIKE N'%" + $("#txt-Search").val().trim() + "%' OR AccountNameE LIKE N'%" + $("#txt-Search").val().trim() + "%' OR SystemAccountID IN(select ID from dbo.A_Accounts where Account_Name LIKE N'%" + $("#txt-Search").val().trim() + "%' )";
    LoadAll("/api/SystemAccount/LoadAll", wherecondition , function (pTabelRows) { SystemAccount_BindTableRows(pTabelRows); });
    HighlightText("#tblSystemAccount>tbody>tr", $("#txt-Search").val().trim());
}
////sherif: Loading with data and search key
//function SystemAccount_LoadingWithPagingAndSearch() {//$("#txt-Search").val() is the search key which will be used in the where clause
//    debugger;
//    LoadWithPagingAndSearch("/api/SystemAccount/LoadWithPaging", $("#txt-Search").val().trim(), ($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1), $('#select-page-size').val().trim(), function (pTabelRows) {
//        SystemAccount_BindTableRows(pTabelRows); SystemAccount_ClearAllControls(); if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
//            HighlightText("#tblSystemAccount>tbody>tr", $("#txt-Search").val().trim());
//    });
//}

// calling web function to add new City item.
function SystemAccount_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/SystemAccount/Insert", { pName: $("#txtName").val().trim(), pExpensesAccountID: $("#slExpensesAccountID").val(), pRevenueAccountID: $("#slRevenueAccountID").val() }, pSaveandAddNew, "SystemAccountModal", function () { SystemAccount_LoadingWithPaging(); });
}


// after change combobox [.SystemAccountID] 
// FillIDs(this)   this : reference to combobox
function FillIDs(sl)
{
    debugger;

    var tr = $(sl).closest('tr');
    $(tr).find("td.ID").find("input:checkbox").prop("checked", true);


    console.log($(sl).val());

    var index = arrAccounts.indexOf($(sl).attr('AccountID'));
    if (index == -1) {
             // "المتغير" system account id
        arrSystemAccounts.push(($(sl).val() == "0" ? "null" : $(sl).val()));

        // "الثابت " primary id
            arrAccounts.push($(sl).attr('AccountID'));
        
    }
    else
    {
        arrSystemAccounts[index] = ($(sl).val() == "0" ? "null" : $(sl).val());

    }
    var AccountID = $('#tblSystemAccount tbody tr').find("td.ParentAccountID[val=" + $(sl).attr('AccountID') + "]").text();
    var pSlName = "sl" + AccountID;
    if (AccountID != 0 && AccountID != undefined && AccountID != "") {
        FillSubAccounts(pSlName, $(sl).val(),0);
    }

}
function FillSubAccounts(pSlName,pAccountID,pCurrentID)
{
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/ChartOfLinkingAccounts/LoadSubAccountDetails"
        , {
            pLanguage: $("[id$='hf_ChangeLanguage']").val()
            , pWhereClauseSubAccountDetails: "WHERE IsMain=0 AND Account_ID=" + pAccountID 
            , pOrderBy: "Name"
        }
        , function (pData) {
            FillListFromObject_ERP(pCurrentID, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), pSlName, pData[0], null);
            FadePageCover(false);
        }
        , null);
}
function SystemAccount_Update() {
    InsertUpdateFunction("form", "/api/SystemAccount/Update",
        { pSystemAccountIDs: arrSystemAccounts.join(","), pAccountIDs: arrAccounts.join(",") }, false, null, function (pData) { swal(pData[1]); arrSystemAccounts = []; arrAccounts = []; $("table > tbody > tr").find("td.ID").find("input:checkbox").prop("checked", false);  /*swal("Done !" , "System Accounts")*/ });
}

function SystemAccount_Delete(pID) {
    DeleteListFunction("/api/SystemAccount/DeleteByID", { "pID": pID }, function () { SystemAccount_LoadingWithPaging(); });
}

function SystemAccountDeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSystemAccount') != "")
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
                DeleteListFunction("/api/SystemAccount/Delete", { "pSystemAccountIDs": GetAllSelectedIDsAsString('tblSystemAccount') }, function () { SystemAccount_LoadingWithPaging(); });
            });
    //DeleteListFunction("/api/SystemAccount/Delete", { "pSystemAccountIDs": GetAllSelectedIDsAsString('tblSystemAccount') }, function () { SystemAccount_LoadingWithPaging(); });
}
//after pressing edit, this function fills the data
function SystemAccount_FillControls(pID) {
    debugger;

    ClearAll("#SystemAccountModal", null);
    $("#hID").val(pID);
    var tr = $("tr[ID='" + pID + "']");

    $("#txtName").val($(tr).find("td.Name").attr('val'));
    $("#slExpensesAccountID").val($(tr).find("td.ExpensesAccountID").attr('val'));
    $("#slRevenueAccountID").val($(tr).find("td.RevenueAccountID").attr('val'));

    $("#btnSave").attr("onclick", "SystemAccount_Update(false);");
    $("#btnSaveandNew").attr("onclick", "SystemAccount_Update(true);");
}

function SystemAccount_ClearAllControls() {
    debugger;
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName"), new Array("slCountry"), null);
    ClearAll("#SystemAccountModal", null);
    $("#btnSave").attr("onclick", "SystemAccount_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "SystemAccount_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);
}
