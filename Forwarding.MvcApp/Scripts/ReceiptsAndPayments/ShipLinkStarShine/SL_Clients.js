//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Suppliers Region ---------------------------------------------------------------
// Bind Suppliers Table Rows

function Clients_BindTableRows(pSales) {
    debugger;
   // $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblClients");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSales, function (i, item) {
        debugger;
        AppendRowtoTable("tblClients",
            ("<tr ID='" + item.ID + "' ondblclick='Clients_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                  //+ "<td class='IsAuthority'> <input type='checkbox' disabled='disabled' val='" + (item.IsAuthority == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='EnglishName'>" + item.EnglishName + "</td>"
                    + "<td class='ClientAddress'>" + item.ClientAddress + "</td>"
                    + "<td class='ClientMobile'>" + item.ClientMobile + "</td>"
                    + "<td class='ClientFax'>" + item.ClientFax + "</td>"
                    + "<td class='ClientEMail'>" + item.ClientEMail + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='PaymentBankID hide'>" + item.PaymentBankID + "</td>"
                    + "<td class='TaxCard hide'>" + item.TaxCard + "</td>"
                    + "<td class='FileNo hide'>" + item.FileNo + "</td>"
                    + "<td class='TaxOffice hide'>" + item.TaxOffice + "</td>"
                    + "<td class='CommercialRegistration hide'>" + item.CommercialRegistration + "</td>"
                    + "<td class='IDNumber hide'>" + item.IDNumber + "</td>"
                    + "<td class='GracePeriod hide'>" + item.GracePeriod + "</td>"

                    + "<td class='hide'><a href='#ClientsModal' data-toggle='modal' onclick='Clients_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    //CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
    //              , { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE 1=0", pOrderBy: "Name,Code" }
    //              , function (pData) {
    //                  var pClientGroup = pData[3];
    //                  var pSupplierGroup = pData[4];
    //                  FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierAccount", pData[0], null);
    //                  FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierCostCenter", pData[2], null);
    //                  FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierSubAccountGroup", pSupplierGroup, null);
    //                  $("#slSupplierSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
    //              }
    //             , null);
    //GetSupplierList(null, "/api/Clients/GetListGroup", "not null", "slSubAccountGroup", "SubAccountGroupID", "Name");
   // GetSupplierList(null, "/api/CostCenters/LoadAll", "not null", "slClientsCostCenter", "ID", "Name");

    ApplyPermissions();
    BindAllCheckboxonTable("tblClients", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblClients>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}

//$('#slSubAccountGroup').on('change', function () {
//    debugger;
//    if($(this).val() != ""){
//        GetListWithParentID($(this).val(), "SubAccount_ID", "/api/Suppliers/GetListAccount", "not null", "slAccount", "Account_ID", "AccountName")
//    }
//});
function GetSupplierList(pSupplierGroupID, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName) {
    debugger;
    GetListComboWithName(pSupplierGroupID, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName);
}
function GetListWithParentID( pSelectedComboID,pComboColumnName, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName)
{
    debugger;
    //GetSelectIDsListComboWithName(pSelectedComboID, pComboColumnName, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName);
    FillSlAccountFromGroup(pSelectedComboID, pComboColumnName, pStrFnName, pSelectTxt, pSlName, pTableID, pColumnName);

    
}
function Clients_EditByDblClick(pID) {
    debugger;
    jQuery("#ClientsModal").modal("show");
    Clients_FillControls(pID);
}
// Loading with data
function Clients_LoadingWithPaging() {
    var pWhereClause = SL_Client_GetWhereClause();

    var pPageSize = $('#select-page-size').val();
    var pPageNumber = ($("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text());

    //var pOrderBy = "ID DESC";
    var pOrderBy;
    pOrderBy = "Code,Name DESC";

    var pControllerParameters = { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters, function (pData) { Clients_BindTableRows(JSON.parse(pData[0])); });




    //debugger;
    //LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Clients/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Clients_BindTableRows(pTabelRows); Clients_ClearAllControls(); });
    HighlightText("#tblClients>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function SL_Client_GetWhereClause() {
    debugger;
    var WhereClause = "where 1=1";
    if ($('#txtCodeSearch').val().trim() != "") {
        WhereClause += " AND Code LIKE '%" + $('#txtCodeSearch').val() + "%'";
    }
    if ($('#txtNameSearch').val().trim() != "") {
        WhereClause += " AND Name LIKE '%" + $('#txtNameSearch').val() + "%'";
    }
    if ($('#txtENameSearch').val().trim() != "") {
        WhereClause += " AND englishname LIKE '%" + $('#txtENameSearch').val() + "%'";
    }
    if ($('#txtAddressSearch').val().trim() != "") {
        WhereClause += " AND clientAddress LIKE '%" + $('#txtAddressSearch').val() + "%'";
    }
    if ($('#txtNotesSearch').val().trim() != "") {
        WhereClause += " AND Notes LIKE '%" + $('#txtNotesSearch').val() + "%'";
    }
    if ($('#slClientsSubAccountGroupSearch').val().trim() != "0") {
        WhereClause += " AND SubAccountGroupID = " + $('#slClientsSubAccountGroupSearch').val() + "";
    }
    
    return WhereClause;
}
// calling web function to add new Supplier item.
function Clients_Insert(pSaveandAddNew, pDontReloadTable) {

        debugger;
    InsertUpdateFunction("form", "/api/SL_Clients/Insert", {
            pCode: 0
           , pName: $("#txtClientName").val().trim().toUpperCase() == "" ? "0" : $("#txtClientName").val().trim().toUpperCase()
           , PClientAddress: $("#txtClientaddressName").val().trim().toUpperCase() == "" ? "0" : $("#txtClientaddressName").val().trim().toUpperCase()
            , PBirthDate: "01/01/1997"
            ,pClientTel: "0"
            ,pClientFax: $("#txtClientFax").val().trim().toUpperCase() == "" ? "0" :$("#txtClientFax").val().trim().toUpperCase()
            ,pClientTelex: "0"
            ,pClientMobile: $("#txtrClientPhoneNumber").val().trim().toUpperCase() == "" ? "0" :  $("#txtrClientPhoneNumber").val().trim().toUpperCase()
            ,pClientEMail: $("#txtClientEmail").val().trim().toUpperCase() == "" ? "0" : $("#txtClientEmail").val().trim().toUpperCase()
            ,pClientCreditLimit: 0
            ,pClientDiscountPercentage : 0
            ,pNotes: $("#txtClientNotes").val().trim().toUpperCase() == "" ? "0" : $("#txtClientNotes").val().trim().toUpperCase()
            ,pCash : 'true'
            ,pDefaultPaymentMethodID: 1
            , pAccountID: $("#slAccount").val() == null ? 0 : $("#slAccount").val()
            ,pPriceTypeID: 0
            ,pTitleID: 0
            ,pClientIBN: "0"
            ,pTaxOfficeAddress: "0"
            ,pEnglishName: $("#txtClientEnglishName").val().trim().toUpperCase() == "" ? "0" : $("#txtClientEnglishName").val().trim().toUpperCase()
            ,pIDNumber: $("#txtIDNumber").val().trim().toUpperCase() == "" ? "0" :  $("#txtIDNumber").val().trim().toUpperCase()
            ,PNationality: "0"
            ,pSubAccountID: 0
            , pCostCenterID: $("#slClientsCostCenter").val() == "" ? 0 : $("#slClientsCostCenter").val() == null ? 0 : $("#slClientsCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val() == "" ? 0 : $("#slSubAccountGroup").val()
        , pPaymentBankID: $("#slBank").val() == "" ? 0 : $("#slBank").val() == null ? 0 : $("#slBank").val()
            ,pCountryID: 0
            ,pCityID: 0
            ,pWebsite: "0"
            ,pTaxNumber:"0"
            , pTaxFileNumber: "0"
            , pTaxCard: $("#txttaxCard").val().trim().toUpperCase() == "" ? "0" : $("#txttaxCard").val().trim().toUpperCase() 
            , pFileNo: $("#txtFileNo").val().trim().toUpperCase() == "" ? "0" : $("#txtFileNo").val().trim().toUpperCase()
            , pTaxOffice: $("#txtTaxOffice").val().trim().toUpperCase() == "" ? "0" : $("#txtTaxOffice").val().trim().toUpperCase()
            , pCommercialRegistration: $("#txtCommercialRegistration").val().trim().toUpperCase() == "" ? "0" : $("#txtCommercialRegistration").val().trim().toUpperCase()
            , pGracePeriod: $("#txtGracePeriod").val().trim().toUpperCase() == "" ? "0" : $("#txtGracePeriod").val().trim().toUpperCase()
        }, pSaveandAddNew, "ClientsModal", function () { Clients_LoadingWithPaging(); });
    //else
    //    if (pDontReloadTable == 3) // Called from OperationPartners
    //        InsertUpdateFunction("form", "/api/Suppliers/Insert", {
    //             pCode: 0 /*generated automatically*/, pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim()
    //            , pIsInactive: $("#cbSupplierIsInactive").prop('checked')
    //            , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
    //            , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
    //            , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
    //            , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
    //        }, pSaveandAddNew, "SupplierModal"
    //        , function () {
    //            Suppliers_ClearAllControls(pDontReloadTable);
    //        });
}

//calling this function for update
function Clients_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
   
       //  var pCurrencyID = $("#SubAccountID").val();
    InsertUpdateFunction("form", "/api/SL_Clients/Update", {
            pID: $("#ID").val()
             , pCode: $("#txtClientCode").val().trim().toUpperCase() == "" ? "0" : $("#txtClientCode").val().trim().toUpperCase()
            ,pName: $("#txtClientName").val().trim().toUpperCase() == "" ? "0" : $("#txtClientName").val().trim().toUpperCase()
            ,PClientAddress: $("#txtClientaddressName").val().trim().toUpperCase() == "" ? "0" : $("#txtClientaddressName").val().trim().toUpperCase()
             , PBirthDate: "01/01/1997"
             ,pClientTel: "0"
             ,pClientFax: $("#txtClientFax").val().trim().toUpperCase() == "" ? "0" :  $("#txtClientFax").val().trim().toUpperCase()
             ,pClientTelex: "0"
             ,pClientMobile: $("#txtrClientPhoneNumber").val().trim().toUpperCase() == "" ? "0" :  $("#txtrClientPhoneNumber").val().trim().toUpperCase()
             ,pClientEMail: $("#txtClientEmail").val().trim().toUpperCase() == "" ? "0" : $("#txtClientEmail").val().trim().toUpperCase()
             ,pClientCreditLimit: 0
             ,pClientDiscountPercentage : 0
             ,pNotes: $("#txtClientNotes").val().trim().toUpperCase() == "" ? "0" : $("#txtClientNotes").val().trim().toUpperCase()
             ,pCash : 'true'
             ,pDefaultPaymentMethodID: 1
             , pAccountID: $("#slAccount").val() == null ? 0 : $("#slAccount").val()
             ,pPriceTypeID: 0
             ,pTitleID: 0
             ,pClientIBN: "0"
             ,pTaxOfficeAddress: "0"
             ,pEnglishName: $("#txtClientEnglishName").val().trim().toUpperCase() == "" ? "0" :$("#txtClientEnglishName").val().trim().toUpperCase()
             , pIDNumber: $("#txtIDNumber").val().trim().toUpperCase() == "" ? "0" : $("#txtIDNumber").val().trim().toUpperCase() 
             ,PNationality: "0"
              
             , pSubAccountID: ClientsSubAccount
            , pCostCenterID: $("#slClientsCostCenter").val() == "" ? 0 : $("#slClientsCostCenter").val() == null ? 0 : $("#slClientsCostCenter").val()
             , pSubAccountGroupID: ClientsSubAccountGroupID != 0 ? ClientsSubAccountGroupID : $("#slSubAccountGroup").val()
        , pPaymentBankID: $("#slBank").val() == "" ? 0 : $("#slBank").val() == null ? 0 : $("#slBank").val()
             ,pCountryID: 0
             ,pCityID: 0
             ,pWebsite: "0"
             ,pTaxNumber:"0"
             , pTaxFileNumber: "0"
            , pTaxCard: $("#txttaxCard").val().trim().toUpperCase() == "" ? "0" : $("#txttaxCard").val().trim().toUpperCase()
            , pFileNo: $("#txtFileNo").val().trim().toUpperCase() == "" ? "0" : $("#txtFileNo").val().trim().toUpperCase() 
            , pTaxOffice: $("#txtTaxOffice").val().trim().toUpperCase() == "" ? "0" :  $("#txtTaxOffice").val().trim().toUpperCase()
            , pCommercialRegistration: $("#txtCommercialRegistration").val().trim().toUpperCase() == "" ? "0" : $("#txtCommercialRegistration").val().trim().toUpperCase()
            , pGracePeriod: $("#txtGracePeriod").val().trim().toUpperCase() == "" ? "0" : $("#txtGracePeriod").val().trim().toUpperCase()
    }, pSaveandAddNew, "ClientsModal", function () { Clients_LoadingWithPaging(); });

}

//sherif: calling this fn is to set the timelocked to null in the DB to unlock the edited field in case of pressing close
function Clients_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/Suppliers/UnlockRecord",
            { pID: ($("#ID").val() == "" ? 0 : $("#ID").val()) },
            "SupplierModal",
            function () { Clients_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            UnlockFunction("/api/Suppliers/UnlockRecord",
            { pID: ($("#hSupplierID").val() == "" ? 0 : $("#hSupplierID").val()) },
            "SupplierModal",
            function () {
            });
}
//function Suppliers_Delete(pID) {
//    DeleteListFunction("/api/Suppliers/DeleteByID", { "pID": pID }, function () { Suppliers_LoadingWithPaging(); });
//}

function Clients_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblClients') != "")
        swal({
            title: "Are you sure?",
            text: "The selected records will be deleted permanently!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete!",
            closeOnConfirm: true
        },
        //callback function in case of pressing "Yes, delete"
        function () {
            DeleteListFunction("/api/SL_Clients/Delete", { "pClientsIDs": GetAllSelectedIDsAsString('tblClients') }, function () {
                Clients_LoadingWithPaging(
                    //this is callback in Suppliers_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                    );
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}
var ClientsSubAccount = 0;
var ClientsSubAccountGroupID = 0;
//after pressing edit, this function fills the data
function Clients_FillControls(pID) {
    debugger;
    ClientsSubAccount = 0;
    ClientsSubAccountGroupID = 0;

   
    ClearAll("#ClientsModal");
    var tr = $("tr[ID='" + pID + "']");
    $("#ID").val(pID);
    //var tr = $(tr).find("td.ID").attr('val');
    if ($(tr).find("td.SubAccountGroupID").text() != 0)
    {
        $("#slSubAccountGroup").attr("disabled", "disabled");
        ClientsSubAccountGroupID = $(tr).find("td.SubAccountGroupID").text();
    }
    else {
        $("#slSubAccountGroup").removeAttr("disabled");
    }
  
  //  $("#slClientsSubAccount").attr("disabled", "disabled");
  //  $("#slClientsSubAccount").removeAttr("disabled");
    $("#txtCode").removeAttr("disabled");
   // $("#slClientsSubAccount").removeAttr("disabled");
    ClientsSubAccount = $(tr).find("td.SubAccountID").text();
    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtClientCode").val($(tr).find("td.Code").text());
    $("#txtClientName").val($(tr).find("td.Name").text());
    $("#txtClientNotes").val($(tr).find("td.Notes").text());
    $("#txtClientEnglishName").val($(tr).find("td.EnglishName").text());
    $("#txtClientaddressName").val($(tr).find("td.ClientAddress").text());
    $("#txtrClientPhoneNumber").val($(tr).find("td.ClientMobile").text());
    $("#txtClientFax").val($(tr).find("td.ClientFax").text());
    $("#txtClientEmail").val($(tr).find("td.ClientEMail").text());
    $("#slBank").val($(tr).find("td.PaymentBankID").text());
    $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
    $("#txttaxCard").val($(tr).find("td.TaxCard").text());
    $("#txtFileNo").val($(tr).find("td.FileNo").text());
    $("#txtTaxOffice").val($(tr).find("td.TaxOffice").text());
    $("#txtCommercialRegistration").val($(tr).find("td.CommercialRegistration").text());
    $("#txtIDNumber").val($(tr).find("td.IDNumber").text());
    $("#txtGracePeriod").val($(tr).find("td.GracePeriod").text());

    //if ($(tr).find("td.SubAccountGroupID").text() != 0)
    //{
    //    GetSupplierList($(tr).find("td.SubAccountGroupID").text(), "/api/Clients/GetListGroup", "null", "slSubAccountGroup", "ID", "Name");
    //}
    //else {
    //   // GetSupplierList($(tr).find("td.SubAccountGroupID").text(), "/api/Clients/GetListGroup", "null", "slSubAccountGroup", "ID", "Name");
    //    GetSupplierList(null, "/api/Clients/GetListGroup", "not null", "slSubAccountGroup", "SubAccountGroupID", "Name");

    //}
    // GetSupplierList($(tr).find("td.SubAccountID").text(), "/api/SubAccountTrialBalance/LoadAll", "null", "slClientsSubAccount", "ID", "Name");
    //GetListWithParentID($(tr).find("td.SubAccountGroupID").text(), "SubAccount_ID", "/api/Suppliers/GetListAccount", "null", "slAccount", "Account_ID", "AccountName")
    FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
    //GetListWithParentID($(tr).find("td.SubAccountID").text(), "ID", "/api/Suppliers/GetListSubAccount", "null", "slClientsSubAccount", "ID", "SubAccount_Name")

    $("#btnSave").attr("onclick", "Clients_Update(false);");
    $("#btnSaveandNew").attr("onclick", "Clients_Update(true);");
    ////Suppliers_ClearAllControls(function () {
    ////next line is to check if row is locked by another user
    ////Check("/api/Suppliers/CheckRow", { 'pID': pID }, function () {
    //// Fill All Modal Controls
    //var tr = $("tr[ID='" + pID + "']");
    //debugger;
    //$("#hSupplierID").val(pID);

    //$("#slSupplierSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
    //FillSlAccountFromGroup('slSupplierAccount', 'slSupplierSubAccountGroup', 'slSupplierSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
    ////$("#slSupplierAccount").val($(tr).find("td.AccountID").text());

    ////FillSlSubAccount('slSupplierSubAccount', 'slSupplierAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
    //var pSubAccountID = $(tr).find("td.SubAccountID").text();
    //$("#slSupplierSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

    //$("#slSupplierCostCenter").val($(tr).find("td.CostCenterID").text());

    //if ($(tr).find("td.SubAccountID").text() == 0) {
    //    $("#slSupplierAccount").removeAttr("disabled");
    //    $("#slSupplierSubAccountGroup").removeAttr("disabled");
    //}
    //else {
    //    $("#slSupplierAccount").attr("disabled", "disabled");
    //    $("#slSupplierSubAccountGroup").attr("disabled", "disabled");
    //}
    //if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
    //    $("#txtSupplierName").removeAttr("disabled");
    //    $("#txtSupplierLocalName").removeAttr("disabled");
    //}
    //else {
    //    $("#txtSupplierName").attr("disabled", "disabled");
    //    $("#txtSupplierLocalName").attr("disabled", "disabled");
    //}
    ////the next 6 lines are to set the slSupplierPaymentTerms, slSupplierCurrencies and slSupplierTaxeTypes to the value entered before
    //var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
    //Supplier_PaymentTerms_GetList(pPaymentTermID, null);
    //var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
    //Supplier_Currencies_GetList(pCurrencyID, null);
    //var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
    //Supplier_TaxeTypes_GetList(pTaxeTypeID, null);

    ////the next line is to get the Supplier addresses and Contacts info (PartnerTypeID for Suppliers is 8)
    //Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
    //Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
    //debugger;


    ////this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    ////parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    //if (pDontLoadTable != null && pDontLoadTable != undefined) {
    //    $("#btnSaveSupplier").attr("onclick", "Suppliers_Update(false, pDontLoadTable);");
    //    $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Update(true, pDontLoadTable);");
    //}
    //else {
    //    $("#btnSaveSupplier").attr("onclick", "Suppliers_Update(false);");
    //    $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Update(true);");
    //}

    ////to set the wizard to BasicData
    //$("#stepsBasicDataSupplier").parent().children().removeClass("active");
    //$("#stepsBasicDataSupplier").addClass("active");
    //$("#BasicDataSupplier").parent().children().removeClass("active");
    //$("#BasicDataSupplier").addClass("active");
    ////to hide Contacts and Addresses tabs in case of partner is not saved yet
    //Suppliers_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
//the pDontLoadTable paramater is true when called from outside the form not to load the table
function Clients_ClearAllControls(pDontLoadTable, callback) {
    debugger;
    ClearAll("#ClientsModal");
    $("#slSubAccountGroup").removeAttr("disabled");
    $("#btnSave").attr("onclick", "Clients_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Clients_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //ClearAllControls(new Array("hID", "txtSupplierCode", "txtSupplierName", "txtSupplierLocalName", "txtSupplierWebsite", "txtSupplierNotes", "txtSupplierVATNumber", "txtSupplierBankName", "txtSupplierBankAddress", "txtSupplierSwift", "txtSupplierBankAccountNumber", "txtSupplierIBANNumber"),
    //    new Array("slSupplierPaymentTerms", "slSupplierCurrencies", "slSupplierTaxeTypes"), new Array("cbSupplierIsInactive", "cbSupplierIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    
   
}
//Set the btnSupplierVisitWebsite href
function Suppliers_SetWebSiteHref() {
    $("#btnSupplierVisitWebsite").attr('href', 'http://' + $("#txtSupplierWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function Suppliers_ShowHideTabs() {
    if ($("#txtSupplierCode").val() == "") {
        $("#stepsContactsSupplier").addClass('hide');
        $("#stepsAddressesSupplier").addClass('hide');
    }
    else {
        $("#stepsContactsSupplier").removeClass('hide');
        $("#stepsAddressesSupplier").removeClass('hide');
    }
}
// Fill PaymentTerms select box
function Supplier_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slSupplierPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
// Fill Currencies select box
function Supplier_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slSupplierCurrencies", " WHERE 1=1 ORDER BY Code ");
}
// Fill TaxeTypes select box
function Supplier_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slSupplierTaxeTypes");
}
/////////////////////////////////////////////////////////////////////////////////////////////
