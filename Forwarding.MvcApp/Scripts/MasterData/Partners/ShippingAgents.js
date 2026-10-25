//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// ShippingAgents Region ---------------------------------------------------------------
var intPartnerTypeID = 3
function ShippingAgents_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/ShippingAgents/LoadWithPaging";
    LoadView("/MasterData/ShippingAgents", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalShippingAgents", "div-content", function () {
            if (pDefaults.UnEditableCompanyName != "ALT" && pDefaults.UnEditableCompanyName != "EUR" && pDefaults.UnEditableCompanyName != "MES"
                 && pDefaults.UnEditableCompanyName != "GLO" && pDefaults.UnEditableCompanyName != "SAC") {
                $(".classHideForMESCOChildren").removeClass("hide");
            }
            if (IsAccountingActive) $(".classAccountingOption").removeClass("hide");
            else $(".classAccountingOption").addClass("hide");
            $(".classHideOutsidePartners").removeClass("hide");
            CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
                , { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE 1=0", pOrderBy: "Name,Code" }
                , function (pData) {
                    var pClientGroup = pData[3];
                    var pSupplierGroup = pData[4];
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slShippingAgentAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slShippingAgentCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slShippingAgentSubAccountGroup", pSupplierGroup, null);
                    $("#slShippingAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                }
                , null);
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { ShippingAgents_BindTableRows(pTabelRows); });

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { ShippingAgents_ClearAllControls(); },
        function () { ShippingAgents_DeleteList(); });
}
function ShippingAgents_BindTableRows(pShippingAgents) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblShippingAgents");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pShippingAgents, function (i, item) {
        AppendRowtoTable("tblShippingAgents",
            ("<tr ID='" + item.ID + "' ondblclick='ShippingAgents_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='Website hide'>" + item.Website + "</td>"
                    + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='VATNumber hide'>" + item.VATNumber + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='ForwarderAccountNumber hide'>" + item.ForwarderAccountNumber + "</td>"
                    + "<td class='ForwarderCreditNumber hide'>" + item.ForwarderCreditNumber + "</td>"
                    + "<td class='LocalCustomsCode hide'>" + item.LocalCustomsCode + "</td>"
                + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TaxExemptFromDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptFromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptFromDate))) + "</td>"
                + "<td class='TaxExemptToDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptToDate))) + "</td>"
                    + "<td class='BankName hide'>" + item.BankName + "</td>"
                    + "<td class='BankAddress hide'>" + item.BankAddress + "</td>"
                    + "<td class='Swift hide'>" + item.Swift + "</td>"
                    + "<td class='BankAccountNumber hide'>" + item.BankAccountNumber + "</td>"
                    + "<td class='IBANNumber hide'>" + item.IBANNumber + "</td>"

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                + "<td class='NationalId hide'>" + (item.National_ID == null || item.National_ID == "0" ? "" : item.National_ID) + "</td>"
                + "<td class='Kinz_Code hide'>" + (item.Kinz_Code == null || item.Kinz_Code == "0" ? "" : item.Kinz_Code) + "</td>"
                    + "<td class='hide'><a href='#ShippingAgentModal' data-toggle='modal' onclick='ShippingAgents_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblShippingAgents", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShippingAgents>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShippingAgents_EditByDblClick(pID) {
    jQuery("#ShippingAgentModal").modal("show");
    ShippingAgents_FillControls(pID);
}
function ShippingAgents_LoadingWithPaging() {
    debugger;

    var pWhereClause = 'where 1=1';

    if ($("#txt-Search").val().trim() != "") {
        let pSearchKey = $("#txt-Search").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }

    if ($('#slFilterCountry').val() > 0) {
        pWhereClause += " and ID in (select PartnerID from Addresses where PartnerTypeID=" + intPartnerTypeID + " and CountryID=" + $('#slFilterCountry').val() + ")";
        $('#slFilterCountry').val(-1).change();
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ShippingAgents/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ShippingAgents_BindTableRows(pTabelRows); ShippingAgents_ClearAllControls(); });
    HighlightText("#tblShippingAgents>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function ShippingAgents_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable)
        InsertUpdateFunction("form", "/api/ShippingAgents/Insert", {
            pPaymentTermID: ($('#slShippingAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slShippingAgentPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slShippingAgentCurrencies option:selected').val() == "" ? 0 : $('#slShippingAgentCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slShippingAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slShippingAgentTaxeTypes option:selected').val())
            , pCode: 0 /*generated automatically*/, pName: $("#txtShippingAgentName").val().trim()
            , pLocalName: $("#txtShippingAgentLocalName").val().trim()
            , pWebsite: ($("#txtShippingAgentWebsite").val() == null ? "" : $("#txtShippingAgentWebsite").val().trim())
            , pIsInactive: $("#cbShippingAgentIsInactive").prop('checked')
            , pNotes: ($("#txtShippingAgentNotes").val() == null ? "" : $("#txtShippingAgentNotes").val().trim())
            , pForwarderAccountNumber: ($("#txtShippingAgentForwarderAccountNumber").val() == null ? "" : $("#txtShippingAgentForwarderAccountNumber").val().trim())
            , pForwarderCreditNumber: ($("#txtShippingAgentForwarderCreditNumber").val() == null ? "" : $("#txtShippingAgentForwarderCreditNumber").val().trim())
            , pLocalCustomsCode: ($("#txtShippingAgentLocalCustomsCode").val() == null ? "" : $("#txtShippingAgentLocalCustomsCode").val().trim())
            , pVATNumber: ($("#txtShippingAgentVATNumber").val() == null ? "" : $("#txtShippingAgentVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbShippingAgentIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtShippingAgentBankName").val() == null ? "" : $("#txtShippingAgentBankName").val().trim())
            , pBankAddress: ($("#txtShippingAgentBankAddress").val() == null ? "" : $("#txtShippingAgentBankAddress").val().trim())
            , pSwift: ($("#txtShippingAgentSwift").val() == null ? "" : $("#txtShippingAgentSwift").val().trim())
            , pBankAccountNumber: ($("#txtShippingAgentBankAccountNumber").val() == null ? "" : $("#txtShippingAgentBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtShippingAgentIBANNumber").val() == null ? "" : $("#txtShippingAgentIBANNumber").val().trim())
            , pAccountID: $("#slShippingAgentAccount").val()
            , pSubAccountID: $("#slShippingAgentSubAccount").val()
            , pCostCenterID: $("#slShippingAgentCostCenter").val()
            , pSubAccountGroupID: $("#slShippingAgentSubAccountGroup").val()
            , PNationalID: ($("#txtShippingAgentNationalID").val() == null ? "" : $("#txtShippingAgentNationalID").val().trim())
            , pKinz_Code: ($("#txtShippingAgentKinz_Code").val() == null ? "" : $("#txtShippingAgentKinz_Code").val().trim())
        }, pSaveandAddNew, "ShippingAgentModal", function () { ShippingAgents_LoadingWithPaging(); });
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            InsertUpdateFunction("form", "/api/ShippingAgents/Insert", {
                pPaymentTermID: ($('#slShippingAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slShippingAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slShippingAgentCurrencies option:selected').val() == "" ? 0 : $('#slShippingAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slShippingAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slShippingAgentTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtShippingAgentName").val().trim(), pLocalName: $("#txtShippingAgentLocalName").val().trim(), pWebsite: ($("#txtShippingAgentWebsite").val() == null ? "" : $("#txtShippingAgentWebsite").val().trim()), pIsInactive: $("#cbShippingAgentIsInactive").prop('checked'), pNotes: ($("#txtShippingAgentNotes").val() == null ? "" : $("#txtShippingAgentNotes").val().trim()), pForwarderAccountNumber: ($("#txtShippingAgentForwarderAccountNumber").val() == null ? "" : $("#txtShippingAgentForwarderAccountNumber").val().trim()), pForwarderCreditNumber: ($("#txtShippingAgentForwarderCreditNumber").val() == null ? "" : $("#txtShippingAgentForwarderCreditNumber").val().trim()), pLocalCustomsCode: ($("#txtShippingAgentLocalCustomsCode").val() == null ? "" : $("#txtShippingAgentLocalCustomsCode").val().trim()), pVATNumber: ($("#txtShippingAgentVATNumber").val() == null ? "" : $("#txtShippingAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbShippingAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtShippingAgentBankName").val() == null ? "" : $("#txtShippingAgentBankName").val().trim()), pBankAddress: ($("#txtShippingAgentBankAddress").val() == null ? "" : $("#txtShippingAgentBankAddress").val().trim()), pSwift: ($("#txtShippingAgentSwift").val() == null ? "" : $("#txtShippingAgentSwift").val().trim()), pBankAccountNumber: ($("#txtShippingAgentBankAccountNumber").val() == null ? "" : $("#txtShippingAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtShippingAgentIBANNumber").val() == null ? "" : $("#txtShippingAgentIBANNumber").val().trim())
                , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
            }, pSaveandAddNew, "ShippingAgentModal"
            , function () {
                ShippingAgents_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
function ShippingAgents_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
        InsertUpdateFunction("form", "/api/ShippingAgents/Update", {
            pID: $("#hShippingAgentID").val()
            , pPaymentTermID: ($('#slShippingAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slShippingAgentPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slShippingAgentCurrencies option:selected').val() == "" ? 0 : $('#slShippingAgentCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slShippingAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slShippingAgentTaxeTypes option:selected').val())
            , pCode: $("#txtShippingAgentCode").val().trim()
            , pName: $("#txtShippingAgentName").val().trim()
            , pLocalName: $("#txtShippingAgentLocalName").val().trim()
            , pWebsite: ($("#txtShippingAgentWebsite").val() == null ? "" : $("#txtShippingAgentWebsite").val().trim())
            , pIsInactive: $("#cbShippingAgentIsInactive").prop('checked')
            , pNotes: ($("#txtShippingAgentNotes").val() == null ? "" : $("#txtShippingAgentNotes").val().trim())
            , pForwarderAccountNumber: ($("#txtShippingAgentForwarderAccountNumber").val() == null ? "" : $("#txtShippingAgentForwarderAccountNumber").val().trim())
            , pForwarderCreditNumber: ($("#txtShippingAgentForwarderCreditNumber").val() == null ? "" : $("#txtShippingAgentForwarderCreditNumber").val().trim())
            , pLocalCustomsCode: ($("#txtShippingAgentLocalCustomsCode").val() == null ? "" : $("#txtShippingAgentLocalCustomsCode").val().trim())
            , pVATNumber: ($("#txtShippingAgentVATNumber").val() == null ? "" : $("#txtShippingAgentVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbShippingAgentIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtShippingAgentBankName").val() == null ? "" : $("#txtShippingAgentBankName").val().trim())
            , pBankAddress: ($("#txtShippingAgentBankAddress").val() == null ? "" : $("#txtShippingAgentBankAddress").val().trim())
            , pSwift: ($("#txtShippingAgentSwift").val() == null ? "" : $("#txtShippingAgentSwift").val().trim())
            , pBankAccountNumber: ($("#txtShippingAgentBankAccountNumber").val() == null ? "" : $("#txtShippingAgentBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtShippingAgentIBANNumber").val() == null ? "" : $("#txtShippingAgentIBANNumber").val().trim())
            , pAccountID: $("#slShippingAgentAccount").val()
            , pSubAccountID: $("#slShippingAgentSubAccount").val()
            , pCostCenterID: $("#slShippingAgentCostCenter").val()
            , pSubAccountGroupID: $("#slShippingAgentSubAccountGroup").val()
            , PNationalID: ($("#txtShippingAgentNationalID").val() == null ? "" : $("#txtShippingAgentNationalID").val().trim())
            , pKinz_Code: ($("#txtShippingAgentKinz_Code").val() == null ? "" : $("#txtShippingAgentKinz_Code").val().trim())
        }, pSaveandAddNew, "ShippingAgentModal", function () { ShippingAgents_LoadingWithPaging(); });
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            InsertUpdateFunction("form", "/api/ShippingAgents/Update", {
                pID: $("#hShippingAgentID").val()
                , pPaymentTermID: ($('#slShippingAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slShippingAgentPaymentTerms option:selected').val())
                , pCurrencyID: ($('#slShippingAgentCurrencies option:selected').val() == "" ? 0 : $('#slShippingAgentCurrencies option:selected').val())
                , pTaxeTypeID: ($('#slShippingAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slShippingAgentTaxeTypes option:selected').val())
                , pCode: $("#txtShippingAgentCode").val().trim()
                , pName: $("#txtShippingAgentName").val().trim()
                , pLocalName: $("#txtShippingAgentLocalName").val().trim()
                , pWebsite: ($("#txtShippingAgentWebsite").val() == null ? "" : $("#txtShippingAgentWebsite").val().trim())
                , pIsInactive: $("#cbShippingAgentIsInactive").prop('checked')
                , pNotes: ($("#txtShippingAgentNotes").val() == null ? "" : $("#txtShippingAgentNotes").val().trim())
                , pForwarderAccountNumber: ($("#txtShippingAgentForwarderAccountNumber").val() == null ? "" : $("#txtShippingAgentForwarderAccountNumber").val().trim())
                , pForwarderCreditNumber: ($("#txtShippingAgentForwarderCreditNumber").val() == null ? "" : $("#txtShippingAgentForwarderCreditNumber").val().trim())
                , pLocalCustomsCode: ($("#txtShippingAgentLocalCustomsCode").val() == null ? "" : $("#txtShippingAgentLocalCustomsCode").val().trim())
                , pVATNumber: ($("#txtShippingAgentVATNumber").val() == null ? "" : $("#txtShippingAgentVATNumber").val().trim())
                , pIsConsolidatedInvoice: $("#cbShippingAgentIsConsolidatedInvoice").prop('checked')
                , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                , pBankName: ($("#txtShippingAgentBankName").val() == null ? "" : $("#txtShippingAgentBankName").val().trim())
                , pBankAddress: ($("#txtShippingAgentBankAddress").val() == null ? "" : $("#txtShippingAgentBankAddress").val().trim())
                , pSwift: ($("#txtShippingAgentSwift").val() == null ? "" : $("#txtShippingAgentSwift").val().trim())
                , pBankAccountNumber: ($("#txtShippingAgentBankAccountNumber").val() == null ? "" : $("#txtShippingAgentBankAccountNumber").val().trim())
                , pIBANNumber: ($("#txtShippingAgentIBANNumber").val() == null ? "" : $("#txtShippingAgentIBANNumber").val().trim())
                , pAccountID: -1    //called from operations or quotations, so don't update ERP
                , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
            }, pSaveandAddNew, "ShippingAgentModal"
            , function () {
                ShippingAgents_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
function ShippingAgents_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/ShippingAgents/UnlockRecord",
            { pID: $("#hShippingAgentID").val() },
            "ShippingAgentModal",
            function () { ShippingAgents_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            UnlockFunction("/api/ShippingAgents/UnlockRecord",
            { pID: ($("#hShippingAgentID").val() == "" ? 0 : $("#hShippingAgentID").val()) },
            "ShippingAgentModal",
            function () {
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
//function ShippingAgents_Delete(pID) {
//    DeleteListFunction("/api/ShippingAgents/DeleteByID", { "pID": pID }, function () { ShippingAgents_LoadingWithPaging(); });
//}
function ShippingAgents_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShippingAgents') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblShippingAgents');
        CallGETFunctionWithParameters("/api/Customers/CheckIfSubAccountExistInAccounting"
            , { pSubAccountIDs: SubAccountsIDs }
            , function (NumberOfRecords) {
                if (NumberOfRecords != 0) {
                    swal(strSorry, "Can not delete because some records are connected to Accounting")
                } else {
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
                            DeleteListFunction("/api/ShippingAgents/Delete", { "pShippingAgentsIDs": GetAllSelectedIDsAsString('tblShippingAgents') }, function () {
                                ShippingAgents_LoadingWithPaging(
                                    //this is callback in ShippingAgents_LoadingWithPaging
                                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                                );
                            });
                            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
                        });
                }
            }
            , null);


        
    }
        
}
function ShippingAgents_FillControls(pID, pDontLoadTable) {
    //ShippingAgents_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/ShippingAgents/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    if (IsAccountingActive)
        $(".classAccountingOption").removeClass("hide");
    else
        $(".classAccountingOption").addClass("hide");
        var tr = $("tr[ID='" + pID + "']");
        debugger;
        $("#hShippingAgentID").val(pID);

        $("#slShippingAgentSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slShippingAgentAccount', 'slShippingAgentSubAccountGroup', 'slShippingAgentSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slShippingAgentAccount").val($(tr).find("td.AccountID").text());

        //FillSlSubAccount('slShippingAgentSubAccount', 'slShippingAgentAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();
        $("#slShippingAgentSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

        $("#slShippingAgentCostCenter").val($(tr).find("td.CostCenterID").text());

        if ($(tr).find("td.SubAccountID").text() == 0) {
            $("#slShippingAgentAccount").removeAttr("disabled");
            $("#slShippingAgentSubAccountGroup").removeAttr("disabled");
        }
        else {
            $("#slShippingAgentAccount").attr("disabled", "disabled");
            $("#slShippingAgentSubAccountGroup").attr("disabled", "disabled");
        }
        if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
            $("#txtShippingAgentName").removeAttr("disabled");
            $("#txtShippingAgentLocalName").removeAttr("disabled");
        }
        else {
            $("#txtShippingAgentName").attr("disabled", "disabled");
            $("#txtShippingAgentLocalName").attr("disabled", "disabled");
        }
        //the next 6 lines are to set the slShippingAgentPaymentTerms, slShippingAgentCurrencies and slShippingAgentTaxeTypes to the value entered before
        var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
        ShippingAgent_PaymentTerms_GetList(pPaymentTermID, null);
        var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
        ShippingAgent_Currencies_GetList(pCurrencyID, null);
        var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
        ShippingAgent_TaxeTypes_GetList(pTaxeTypeID, null);

        //the next line is to get the ShippingAgent addresses and Contacts info (PartnerTypeID for ShippingAgents is 3)
        Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
        Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
        debugger;
        $("#tblUploadedFiles_ShippingAgents tbody").html("");

        $("#lblShippingAgentShown").html(": " + $(tr).find("td.Name").text());
        $("#txtShippingAgentCode").val($(tr).find("td.Code").text());
        $("#txtShippingAgentName").val($(tr).find("td.Name").text());
        $("#txtShippingAgentLocalName").val($(tr).find("td.LocalName").text());
        $("#txtShippingAgentWebsite").val($(tr).find("td.Website").text());
        $("#btnShippingAgentVisitWebsite").attr('href', 'http://' + $("#txtShippingAgentWebsite").val());
    $("#cbShippingAgentIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    

        $("#txtShippingAgentNotes").val($(tr).find("td.Notes").text());
        $("#txtShippingAgentForwarderAccountNumber").val($(tr).find("td.ForwarderAccountNumber").text());
        $("#txtShippingAgentForwarderCreditNumber").val($(tr).find("td.ForwarderCreditNumber").text());
        $("#txtShippingAgentLocalCustomsCode").val($(tr).find("td.LocalCustomsCode").text());
        $("#txtShippingAgentVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbShippingAgentIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val')).change();
    $("#txtTaxExemptFromDate").val($(tr).find("td.TaxExemptFromDate").text());
    $("#txtTaxExemptToDate").val($(tr).find("td.TaxExemptToDate").text());
        $("#txtShippingAgentBankName").val($(tr).find("td.BankName").text());
        $("#txtShippingAgentBankAddress").val($(tr).find("td.BankAddress").text());
        $("#txtShippingAgentSwift").val($(tr).find("td.Swift").text());
        $("#txtShippingAgentBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
    $("#txtShippingAgentIBANNumber").val($(tr).find("td.IBANNumber").text());
    $("#txtShippingAgentNationalID").val($(tr).find("td.NationalId").text());
    $("#txtShippingAgentKinz_Code").val($(tr).find("td.Kinz_Code").text());
        ShippingAgents_GeneralUpload_Initialise();
        //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
        //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
        if (pDontLoadTable != null && pDontLoadTable != undefined) {
            $("#btnSaveShippingAgent").attr("onclick", "ShippingAgents_Update(false, pDontLoadTable);");
            $("#btnSaveandNewShippingAgent").attr("onclick", "ShippingAgents_Update(true, pDontLoadTable);");
        }
        else {
            $("#btnSaveShippingAgent").attr("onclick", "ShippingAgents_Update(false);");
            $("#btnSaveandNewShippingAgent").attr("onclick", "ShippingAgents_Update(true);");
        }



    if (pDefaults.UnEditableCompanyName == "AKS") {
        $("#txtShippingAgentNationalID").parent().removeClass("hide");
        $("#txtShippingAgentKinz_Code").parent().removeClass("hide");
    }

        //to set the wizard to BasicData
        $("#stepsBasicDataShippingAgent").parent().children().removeClass("active");
        $("#stepsBasicDataShippingAgent").addClass("active");
        $("#BasicDataShippingAgent").parent().children().removeClass("active");
        $("#BasicDataShippingAgent").addClass("active");
        //to hide Contacts and Addresses tabs in case of partner is not saved yet
        ShippingAgents_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
function ShippingAgents_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtShippingAgentName", "txtShippingAgentLocalName", "txtShippingAgentWebsite", "txtShippingAgentNotes", "txtShippingAgentVATNumber", "txtShippingAgentBankName", "txtShippingAgentBankAddress", "txtShippingAgentSwift", "txtShippingAgentBankAccountNumber", "txtShippingAgentIBANNumber"),
    //    new Array("slShippingAgentPaymentTerms", "slShippingAgentCurrencies", "slShippingAgentTaxeTypes"), new Array("cbShippingAgentIsInactive", "cbShippingAgentIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $(".classAccountingOption").addClass("hide");
    ClearAll("#ShippingAgentModal", null);

    $("#slShippingAgentAccount").removeAttr("disabled");
    $("#slShippingAgentSubAccountGroup").removeAttr("disabled");
    $("#txtShippingAgentName").removeAttr("disabled");
    $("#txtShippingAgentLocalName").removeAttr("disabled");

    $("#slShippingAgentAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');
    $("#slShippingAgentSubAccount").attr("disabled", "disabled");
    $("#slShippingAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');



    if (pDefaults.UnEditableCompanyName == "AKS") {
        $("#txtShippingAgentNationalID").parent().removeClass("hide");
        $("#txtShippingAgentKinz_Code").parent().removeClass("hide");
    }

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnShippingAgentVisitWebsite").attr('href', 'http://');
    $("#bodyShippingAgentAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyShippingAgentContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    ShippingAgent_PaymentTerms_GetList(null, null);
    ShippingAgent_Currencies_GetList(null, null);
    ShippingAgent_TaxeTypes_GetList(null, null);
    //EOF for AddressModal
    debugger;

    //this 2nd flag in ShippingAgents_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveShippingAgent").attr("onclick", "ShippingAgents_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewShippingAgent").attr("onclick", "ShippingAgents_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveShippingAgent").attr("onclick", "ShippingAgents_Insert(false);");
        $("#btnSaveandNewShippingAgent").attr("onclick", "ShippingAgents_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataShippingAgent").parent().children().removeClass("active");
    $("#stepsBasicDataShippingAgent").addClass("active");
    $("#BasicDataShippingAgent").parent().children().removeClass("active");
    $("#BasicDataShippingAgent").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    ShippingAgents_ShowHideTabs();
    ShowTaxExemptDate();
}
function ShippingAgents_SetWebSiteHref() {
    $("#btnShippingAgentVisitWebsite").attr('href', 'http://' + $("#txtShippingAgentWebsite").val());
}
function ShippingAgents_ShowHideTabs() {
    if ($("#txtShippingAgentCode").val() == "") {
        $("#stepsContactsShippingAgent").addClass('hide');
        $("#stepsAddressesShippingAgent").addClass('hide');
    }
    else {
        $("#stepsContactsShippingAgent").removeClass('hide');
        $("#stepsAddressesShippingAgent").removeClass('hide');
    }
}
//function ShippingAgents_CheckValueIsInteger(id) {
//    debugger;
//    CheckValueIsInteger("#" + id);
//}
////////////////////////////////////////////////////////////////////////////
function ShippingAgent_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slShippingAgentPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
function ShippingAgent_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slShippingAgentCurrencies", " WHERE 1=1 ORDER BY Code ");
}
function ShippingAgent_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slShippingAgentTaxeTypes");
}
/////////////////////////////////////////////////////////////////////////////////////////////

//*********************************Uploaded Files***************************************//
function ShippingAgents_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_ShippingAgents";
    glbGeneralUploadFolderName = $("#hShippingAgentID").val() == "" ? "" : $("#txtShippingAgentName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//ShippingAgents//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/ShippingAgents/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_ShippingAgents";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_ShippingAgents";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_ShippingAgents";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function ShippingAgents_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, {
                type: 'binary'
            });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (oJS.length > 0 && oJS[0].Name != undefined) //if (sCSV != "")
                    ShippingAgents_ImportFromExcelFile(oJS, pBtnName);
                else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}

function ShippingAgents_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing ShippingAgents Name List from DB
    var ExistingShippingAgentsNameList;
    var ExistingShippingAgentsNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/ShippingAgents/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingShippingAgentsNameList = JSON.parse(pData[0]);
                ExistingShippingAgentsNameArray = ExistingShippingAgentsNameList.map(item => item.Name);


                FadePageCover(true);
                var pNameList = "";
                var pNameArray = [];
                var pLocalNameList = "";
                var pCompanyList = "";
                for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space

                    pNameList += ((pNameList == "" ? "" : ",") +
                        (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                    if (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "") {
                        IsNameEmpty = true;
                        NameEmptyRowNo = i + 1;
                    } else {

                        // Check if Name Exists in BD
                        if (ExistingShippingAgentsNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                            IsNameExistsInDB = true;
                            NameExistsInDBRowNo = i + 1;
                        }

                        // Check if Name Exists in pNameList
                        if (pNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                            IsNameExistsInExcel = true;
                            NameExistsInExcelRowNo = i + 1;
                        }

                        pNameArray.push(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim());

                    }


                    pLocalNameList += ((pLocalNameList == "" ? "" : ",") +
                        (pDataRows[i].LocalName == undefined || pDataRows[i].LocalName.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].LocalName.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCompanyList += ((pCompanyList == "" ? "" : ",") +
                        (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pCompanyList
                };


                var IsCompanyColumnValid = true;
                var CompanyNotValidRowNo = 0;
                var pCompanyArray = [];
                if (pDefaults.UnEditableCompanyName == "TOP") {
                    pCompanyArray = pCompanyList.split(",");
                    for (let i = 0; i < pCompanyArray.length; i++) {
                        if (pCompanyArray[i].toUpperCase() != "ALT" && pCompanyArray[i].toUpperCase() != "EUR" && pCompanyArray[i].toUpperCase() != "MES" && pCompanyArray[i].toUpperCase() != "GLO" && pCompanyArray[i].toUpperCase() != "SAC") {
                            IsCompanyColumnValid = false;
                            CompanyNotValidRowNo = i + 1;
                        }
                    }
                }

                if (!IsCompanyColumnValid) {
                    swal(strSorry, " Company in Row No. " + CompanyNotValidRowNo + " is Not Valid ");
                    FadePageCover(false);
                } else if (IsNameEmpty) {
                    swal(strSorry, " Name in Row No. " + NameEmptyRowNo + " is Empty ");
                    FadePageCover(false);
                } else if (IsNameExistsInDB) {
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Shipping Agents ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/ShippingAgents/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        ShippingAgents_LoadingWithPaging();
                    }, null);

                }



                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);





}
//******************************EOF Reading Excel Files***************************************//;

function ShowTaxExemptDate() {
    if (pDefaults.UnEditableCompanyName != 'SSH')
        return;
    if ($('#cbShippingAgentIsConsolidatedInvoice').is(':checked')) {
        $('.TaxExempt').removeClass('hide');
    }
    else {
        $('.TaxExempt').addClass('hide');
        $('#txtTaxExemptFromDate,#txtTaxExemptToDate').val('');
    }
}
