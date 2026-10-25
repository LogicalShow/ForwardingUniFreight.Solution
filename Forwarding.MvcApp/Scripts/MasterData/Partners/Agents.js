//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Agents Region ---------------------------------------------------------------
// Bind Agents Table Rows 
var intPartnerTypeID = 2;
function Agents_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Agents/LoadWithPaging";
    LoadView("/MasterData/Agents", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalAgents", "div-content", function () {
            if (pDefaults.UnEditableCompanyName == "SAF") {
                $(".classMandatoryForSAF").attr("data-required", "true");
            }
            if (pDefaults.UnEditableCompanyName == "ORI") {
                $(".vatNo").removeClass("hide");
            }
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
                    var pClientAndSupplierGroup = pData[5];
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAgentAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAgentCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAgentSubAccountGroup", pClientAndSupplierGroup, null);
                    $("#slAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                }
                , null);
        }
        , null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalPartnersBanks", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { Agents_BindTableRows(pTabelRows); });

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { Agents_ClearAllControls(); },
        function () { Agents_DeleteList(); });
}
function Agents_BindTableRows(pAgents) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblAgents");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pAgents, function (i, item) {
        AppendRowtoTable("tblAgents",
            ("<tr ID='" + item.ID + "' ondblclick='Agents_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == "0" ? "" : item.LocalName) + "</td>"
                    + "<td class='Website hide'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
                    + "<td class='AgentEmail hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                    + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                    + "<td class='IsInactive hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='VATNumber hide'>" + item.VATNumber + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                    + "<td class='Notes hide'>" + item.Notes + "</td>"
                    + "<td class='crmCode hide'>" + item.crmCode + "</td>"
                    + "<td class='Finance365Ref hide'>" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"
                    + "<td class='Address hide'>" + item.Address + "</td>"
                    + "<td class='PhonesAndFaxes hide'>" + item.PhonesAndFaxes + "</td>"
                    + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
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
                    + "<td class='hide'><a href='#AgentModal' data-toggle='modal' onclick='Agents_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    if (pDefaults.UnEditableCompanyName == "ORI") {
        $(".VATNumber").removeClass("hide");
    }
    ApplyPermissions();
    BindAllCheckboxonTable("tblAgents", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblAgents>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Agents_EditByDblClick(pID) {
    jQuery("#AgentModal").modal("show");
    Agents_FillControls(pID);
}
function Agents_LoadingWithPaging() {
    debugger;

    var pWhereClause = 'where 1=1';

    if ($("#txt-Search").val().trim() != "") {
        let pSearchKey = $("#txt-Search").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }

    if ($('#slFilterCountry').val() > 0) {
        pWhereClause += " and ID in (select PartnerID from Addresses where PartnerTypeID=" + intPartnerTypeID +" and CountryID=" + $('#slFilterCountry').val() + ")";
        $('#slFilterCountry').val(-1).change();
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Agents/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Agents_BindTableRows(pTabelRows); Agents_ClearAllControls(); });
    HighlightText("#tblAgents>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Agents_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable)
        InsertUpdateFunction("form", "/api/Agents/Insert", {
            pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val())
            , pCode: 0 /*generated automatically*/
            , pName: $("#txtAgentName").val().trim()
            , pLocalName: $("#txtAgentLocalName").val().trim()
            , pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim())
            , pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim())
            , pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: ($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: $("#slAgentAccount").val()
            , pSubAccountID: $("#slAgentSubAccount").val()
            , pCostCenterID: $("#slAgentCostCenter").val()
            , pSubAccountGroupID: $("#slAgentSubAccountGroup").val()
        }, pSaveandAddNew, "AgentModal", function () { Agents_LoadingWithPaging(); });
    else if (pDontReloadTable == 1) // Called from Modal Add Quotation/Operation 
        InsertUpdateFunction("form", "/api/Agents/Insert", {
            pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val())
            , pCode: 0 /*generated automatically*/
            , pName: $("#txtAgentName").val().trim()
            , pLocalName: $("#txtAgentLocalName").val().trim()
            , pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim())
            , pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim())
            , pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: ($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
        }, pSaveandAddNew, "AgentModal"
        , function () {
            if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
            Agents_GetList($('#slAgents option:selected').val(), null);
        });
    else if (pDontReloadTable == 2) // Called from Edit Quotation
        InsertUpdateFunction("form", "/api/Agents/Insert", {
            pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: ($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
        }, pSaveandAddNew, "AgentModal"
                , function () {
                    if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
                    Agents_GetList($('#slAgents option:selected').val(), null);
                    AgentContacts_GetList($('#slAgentContacts option:selected').val(), $('#slAgents option:selected').val(), function () { QuotationsEdit_AgentContactChanged(); });
                });
    else if (pDontReloadTable == 3) // Called from OperationPartners
        InsertUpdateFunction("form", "/api/Agents/Insert", {
            pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: ($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
            , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
            , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
        }, pSaveandAddNew, "AgentModal"
            , function () {
                if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
            });
}
function Agents_Update(pSaveandAddNew, pDontReloadTable) {
    if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
        InsertUpdateFunction("form", "/api/Agents/Update", {
            pID: $("#hAgentID").val(), pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: $("#txtAgentCode").val().trim(), pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: "0" /*($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())*/
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: $("#slAgentAccount").val()
            , pSubAccountID: $("#slAgentSubAccount").val()
            , pCostCenterID: $("#slAgentCostCenter").val()
            , pSubAccountGroupID: $("#slAgentSubAccountGroup").val()
        }, pSaveandAddNew, "AgentModal", function () { Agents_LoadingWithPaging(); });
    else if (pDontReloadTable == 1)  // Called from Modal Add Quotation/Operation
        InsertUpdateFunction("form", "/api/Agents/Update", {
            pID: $("#hAgentID").val(), pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: $("#txtAgentCode").val().trim(), pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: "0" /*($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())*/
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: -1    //called from operations or quotations, so don't update ERP
            , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
            , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
            , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
        }, pSaveandAddNew, "AgentModal"
        , function () {
            if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
            Agents_GetList($('#slAgents option:selected').val(), null);
        });
    else if (pDontReloadTable == 2) // Called from Edit Quotation
        InsertUpdateFunction("form", "/api/Agents/Update", {
            pID: $("#hAgentID").val(), pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: $("#txtAgentCode").val().trim(), pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: "0" /*($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())*/
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: -1    //called from operations or quotations, so don't update ERP
            , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
            , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
            , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
        }, pSaveandAddNew, "AgentModal"
        , function () {
            if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
            Agents_GetList($('#slAgents option:selected').val(), null);
            AgentContacts_GetList($('#slAgentContacts option:selected').val(), $('#slAgents option:selected').val(), function () { QuotationsEdit_AgentContactChanged(); });
        });
    else if (pDontReloadTable == 3) // Called from OperationPartners
        InsertUpdateFunction("form", "/api/Agents/Update", {
            pID: $("#hAgentID").val(), pPaymentTermID: ($('#slAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slAgentCurrencies option:selected').val() == "" ? 0 : $('#slAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slAgentTaxeTypes option:selected').val()), pCode: $("#txtAgentCode").val().trim(), pName: $("#txtAgentName").val().trim(), pLocalName: $("#txtAgentLocalName").val().trim(), pWebsite: ($("#txtAgentWebsite").val() == null ? "" : $("#txtAgentWebsite").val().trim()), pEmail: ($("#txtAgentEmail").val() == null ? "" : $("#txtAgentEmail").val().trim()), pIsInactive: $("#cbAgentIsInactive").prop('checked')
            , pNotes: ($("#txtAgentNotes").val() == null ? "" : $("#txtAgentNotes").val().trim())
            , pcrmCode: "0" /*($('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val())*/
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pAddress: ($("#txtAgentAddress").val() == null ? "" : $("#txtAgentAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtAgentPhonesAndFaxes").val() == null ? "" : $("#txtAgentPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtAgentVATNumber").val() == null ? "" : $("#txtAgentVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbAgentIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtAgentBankName").val() == null ? "" : $("#txtAgentBankName").val().trim()), pBankAddress: ($("#txtAgentBankAddress").val() == null ? "" : $("#txtAgentBankAddress").val().trim()), pSwift: ($("#txtAgentSwift").val() == null ? "" : $("#txtAgentSwift").val().trim()), pBankAccountNumber: ($("#txtAgentBankAccountNumber").val() == null ? "" : $("#txtAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtAgentIBANNumber").val() == null ? "" : $("#txtAgentIBANNumber").val().trim())
            , pAccountID: -1    //called from operations or quotations, so don't update ERP
            , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
            , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
            , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
        }, pSaveandAddNew, "AgentModal"
        , function () {
            if (pSaveandAddNew) Agents_ClearAllControls(pDontReloadTable);
            PartnerNames_GetList($('#slPartners option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
        });
}
function Agents_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/Agents/UnlockRecord",
            { pID: ($("#hAgentID").val() == "" ? 0 : $("#hAgentID").val()) },
            "AgentModal",
            function () { Agents_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 2) // Called from Add New Operation
            UnlockFunction("/api/Agents/UnlockRecord",
            { pID: ($("#hAgentID").val() == "" ? 0 : $("#hAgentID").val()) },
            "AgentModal",
                    function () {
                        Agents_GetList($('#slAgents option:selected').val(), null);
                        AgentContacts_GetList($('#slAgentContacts option:selected').val(), $('#slAgents option:selected').val(), function () {/* OperationsEdit_AgentContactChanged(); */ });
                    });
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                UnlockFunction("/api/Agents/UnlockRecord",
                { pID: ($("#hAgentID").val() == "" ? 0 : $("#hAgentID").val()) },
                "AgentModal",
                function () {
                    PartnerNames_GetList($('#slPartners option:selected').val(), null);
                });
}
//function Agents_Delete(pID) {
//    DeleteListFunction("/api/Agents/DeleteByID", { "pID": pID }, function () { Agents_LoadingWithPaging(); });
//}
function Agents_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblAgents') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblAgents');
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
                            DeleteListFunction("/api/Agents/Delete", { "pAgentsIDs": GetAllSelectedIDsAsString('tblAgents') }, function () {
                                Agents_LoadingWithPaging(
                                    //this is callback in Agents_LoadingWithPaging
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
function Agents_FillControls(pID, pDontLoadTable) {
    //Agents_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/Agents/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    if (IsAccountingActive)
        $(".classAccountingOption").removeClass("hide");
    else
        $(".classAccountingOption").addClass("hide");

    var tr = $("tr[ID='" + pID + "']");
    debugger;
    if (IsMESCOCompany) {
        $("#txtcrmCode").parent().removeClass("hide");
        $("#txtFinance365Ref").parent().removeClass("hide");
    }

    $("#hAgentID").val(pID);

    $("#slAgentSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
    FillSlAccountFromGroup('slAgentAccount', 'slAgentSubAccountGroup', 'slAgentSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());

    //$("#slAgentAccount").val($(tr).find("td.AccountID").text());
    //FillSlSubAccount('slAgentSubAccount', 'slAgentAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
    var pSubAccountID = $(tr).find("td.SubAccountID").text();
    $("#slAgentSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

    $("#slAgentCostCenter").val($(tr).find("td.CostCenterID").text());

    if ($(tr).find("td.SubAccountID").text() == 0) {
        $("#slAgentAccount").removeAttr("disabled");
        $("#slAgentSubAccountGroup").removeAttr("disabled");
    }
    else {
        $("#slAgentAccount").attr("disabled", "disabled");
        $("#slAgentSubAccountGroup").attr("disabled", "disabled");
    }
    if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
        $("#txtAgentName").removeAttr("disabled");
        $("#txtAgentLocalName").removeAttr("disabled");
    }
    else {
        $("#txtAgentName").attr("disabled", "disabled");
        $("#txtAgentLocalName").attr("disabled", "disabled");
    }

    //the next 6 lines are to set the slAgentPaymentTerms, slAgentCurrencies and slAgentTaxeTypes to the value entered before
    var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
    Agent_PaymentTerms_GetList(pPaymentTermID, null);
    var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
    Agent_Currencies_GetList(pCurrencyID, null);
    var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
    Agent_TaxeTypes_GetList(pTaxeTypeID, null);
    var pNetworkID = $(tr).find("td.NetworkID").attr('val');
    //Agent_Network_GetList(pNetworkID, null);
    //the next line is to get the Agent addresses and Contacts info (PartnerTypeID for Agents is 8)
    Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
    Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
    PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
    AgentNetwork_LoadingWithPagingForModal(pID);
    debugger;
    $("#tblUploadedFiles_Agents tbody").html("");

    $("#lblAgentShown").html(": " + $(tr).find("td.Name").text());
    $("#txtAgentCode").val($(tr).find("td.Code").text());
    $("#txtAgentName").val($(tr).find("td.Name").text());
    $("#txtAgentLocalName").val($(tr).find("td.LocalName").text());
    $("#txtAgentWebsite").val($(tr).find("td.Website").text());
    $("#txtAgentEmail").val($(tr).find("td.AgentEmail").text());
    $("#btnAgentVisitWebsite").attr('href', 'http://' + $("#txtAgentWebsite").val());
    $("#cbAgentIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#txtAgentNotes").val($(tr).find("td.Notes").text());
    $("#txtcrmCode").val($(tr).find("td.crmCode").text());
    $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());
    $("#txtAgentAddress").val($(tr).find("td.Address").text());
    $("#txtAgentPhonesAndFaxes").val($(tr).find("td.PhonesAndFaxes").text());
    $("#txtAgentVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbAgentIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val'));
    $("#txtAgentBankName").val($(tr).find("td.BankName").text());
    $("#txtAgentBankAddress").val($(tr).find("td.BankAddress").text());
    $("#txtAgentSwift").val($(tr).find("td.Swift").text());
    $("#txtAgentBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
    $("#txtAgentIBANNumber").val($(tr).find("td.IBANNumber").text());
    Agents_GeneralUpload_Initialise();
    //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveAgent").attr("onclick", "Agents_Update(false, pDontLoadTable);");
        $("#btnSaveandNewAgent").attr("onclick", "Agents_Update(true, pDontLoadTable);");
    }
    else {
        $("#btnSaveAgent").attr("onclick", "Agents_Update(false);");
        $("#btnSaveandNewAgent").attr("onclick", "Agents_Update(true);");
    }

    //to set the wizard to BasicData
    $("#stepsBasicDataAgent").parent().children().removeClass("active");
    $("#stepsBasicDataAgent").addClass("active");
    $("#BasicDataAgent").parent().children().removeClass("active");
    $("#BasicDataAgent").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Agents_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
function Agents_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtAgentCode", "txtAgentName", "txtAgentLocalName", "txtAgentWebsite", "txtAgentNotes", "txtAgentVATNumber", "txtAgentBankName", "txtAgentBankAddress", "txtAgentSwift", "txtAgentBankAccountNumber", "txtAgentIBANNumber"),
    //    new Array("slAgentPaymentTerms", "slAgentCurrencies", "slAgentTaxeTypes"), new Array("cbAgentIsInactive", "cbAgentIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    $("#AgentModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#AgentModal").addClass("hide");" in Quotations.js
    $(".classAccountingOption").addClass("hide");
    ClearAll("#AgentModal", null);

    $("#slAgentAccount").removeAttr("disabled");
    $("#slAgentSubAccountGroup").removeAttr("disabled");
    $("#txtAgentName").removeAttr("disabled");
    $("#txtAgentLocalName").removeAttr("disabled");

    //$("#slAgentSubAccountGroup").val(0);
    $("#slAgentAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnAgentVisitWebsite").attr('href', 'http://');
    $("#bodyAgentAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyAgentPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyAgentContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    Agent_PaymentTerms_GetList(null, null);
    Agent_Currencies_GetList(null, null);
    Agent_TaxeTypes_GetList(null, null);
    //Agent_Network_GetList(null, null);
    //EOF for AddressModal
    debugger;

    //this 2nd flag in Agents_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveAgent").attr("onclick", "Agents_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewAgent").attr("onclick", "Agents_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveAgent").attr("onclick", "Agents_Insert(false);");
        $("#btnSaveandNewAgent").attr("onclick", "Agents_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataAgent").parent().children().removeClass("active");
    $("#stepsBasicDataAgent").addClass("active");
    $("#BasicDataAgent").parent().children().removeClass("active");
    $("#BasicDataAgent").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Agents_ShowHideTabs();
}
function Agents_SetWebSiteHref() {
    $("#btnAgentVisitWebsite").attr('href', 'http://' + $("#txtAgentWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function Agents_ShowHideTabs() {
    if ($("#txtAgentCode").val() == "") {
        $("#stepsContactsAgent").addClass('hide');
        $("#stepsAddressesAgent").addClass('hide');
        $("#stepsPartnersBanksAgent").addClass('hide');
        $("#stepsAgentNetwork").addClass('hide');
    }
    else {
        $("#stepsContactsAgent").removeClass('hide');
        $("#stepsAddressesAgent").removeClass('hide');
        $("#stepsPartnersBanksAgent").removeClass('hide');
        $("#stepsAgentNetwork").removeClass('hide');
    }
}
// Fill PaymentTerms select box
function Agent_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slAgentPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
// Fill Currencies select box
function Agent_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slAgentCurrencies", " WHERE 1=1 ORDER BY Code ");
}
// Fill TaxeTypes select box
function Agent_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slAgentTaxeTypes");
}
function Agent_Network_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Network/LoadAll", "Select Network", "slAgentNetwork", "ORDER BY Name", null)
}
///////////////////////////////////////////OperatorTankCharge//////////////////////////////////////////////////
function OperatorTankCharge_BindTableRows(pTableRows) {
    debugger;
    ClearAllTableRows("tblOperatorTankCharge");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var printControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-print' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Print" + "</span>";
    //var LogsControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-chain' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Logs" + "</span>";
    $.each(pTableRows, function (i, item) {
        AppendRowtoTable("tblOperatorTankCharge",
        ("<tr ID='" + item.ID + "' " + (1 == 1 ? ("ondblclick='OperatorTankChargeItem_FillControls(" + item.ID + ");'") : " class='static-text-primary' ") + ">"
        ////("<tr ID='" + item.ID + "'>"
                    + "<td class='OperatorTankChargeID'> <input" + (1 == 1 ? " name='Delete' " : " disabled='disabled' ") + " type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='OperatorTankChargeTypeID hide'>" + item.ChargeTypeID + "</td>"
                    + "<td class='OperatorTankChargeTypeName'>" + item.ChargeTypeName + "</td>"
                    + "<td class='OperatorTankChargeCostPrice'>" + item.CostPrice + "</td>"
                    + "<td class='OperatorTankChargeCostCurrencyID hide'>" + item.CostCurrencyID + "</td>"
                    + "<td class='OperatorTankChargeCostCurrencyCode'>" + item.CostCurrencyCode + "</td>"
                    + "<td class='OperatorTankChargeSalePrice'>" + item.SalePrice + "</td>"
                    + "<td class='OperatorTankChargeSaleCurrencyID hide'>" + item.SaleCurrencyID + "</td>"
                    + "<td class='OperatorTankChargeSaleCurrencyCode'>" + item.SaleCurrencyCode + "</td>"
                    + "<td class='OperatorTankChargeNotes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='IsImport hide'> <input id='cbIsImport" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsImport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsExport hide'> <input id='cbIsExport" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsExport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsDomestic hide'> <input id='cbIsDomestic" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsDomestic == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsCrossBooking hide'> <input id='cbIsCrossBooking" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsCrossBooking == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsReExport hide'> <input id='cbIsReExport" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsReExport == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsLoaded hide'> <input id='cbIsLoaded" + item.ID + "' type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>"
        //            //+ "<td class='hide'><a onclick='OperatorTankCharge_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
        //            //+ ($("#hIsOperationDisabled").val() == false
        //            //    ? "<td class=''><a onclick='OperatorTankCharge_Print(" + item.ID + "," + item.NoteType + ",3);' " + printControlsText + "</a></td>"
        //            //    : "<td></td>")
                    //+ "<td class=''><a onclick='OperatorTankCharge_Print(" + item.ID + ");' " + printControlsText + "</a></td>"
                    + "</tr>"));
    });
    ////ApplyPermissions();
    //$("#cbPrintBankDetailsForNewOperatorTankCharge").prop("checked", true);
    BindAllCheckboxonTable("tblOperatorTankCharge", "OperatorTankChargeID", "cbOperatorTankChargeDeleteHeader");
    CheckAllCheckbox("HeaderDeleteOperatorTankChargeID");

    //HighlightText("#tblOperatorTankCharge>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function OperatorTankCharge_FillModal() {
    debugger;
    if ($("#hAgentID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        $("#lblOperatorTankChargeShown").text(" : " + $("#txtAgentName").val());
        $("#tblOperatorTankCharge tbody tr").html("");
        FadePageCover(true);
        jQuery("#OperatorTankChargeModal").modal("show");
        var pParametersWithValues = {
            pWhereClauseOperatorTankCharge: "WHERE AgentID=" + $("#hAgentID").val() + " ORDER BY ChargeTypeName"
        };
        CallGETFunctionWithParameters("/api/Agents/OperatorTankCharge_LoadAll", pParametersWithValues
            , function (pData) {
                var pTableRows = JSON.parse(pData[0]);
                OperatorTankCharge_BindTableRows(pTableRows);
                FadePageCover(false);
            }
            , null);
    }
}
///////////////////////////////////////////OperatorTankChargeItem//////////////////////////////////////////////////
function OperatorTankChargeItem_FillControls(pOperatorTankChargeID) {
    debugger;
    ClearAll("#OperatorTankChargeItemModal");
    FadePageCover(true);
    var pChargeTypeID = "";
    var pCostPrice = 0;
    var pCostCurrencyID = $("#hDefaultCurrencyID").val();
    var pSalePrice = 0;
    var pSaleCurrencyID = $("#hDefaultCurrencyID").val();
    if (pOperatorTankChargeID > 0) { //Fill
        var tr = $("#tblOperatorTankCharge tr[ID='" + pOperatorTankChargeID + "']");
        $("#hOperatorTankChargeItemID").val(pOperatorTankChargeID);
        pChargeTypeID = $(tr).find("td.OperatorTankChargeTypeID").text();
        $("#txtOperatorTankChargeItemCostPrice").val($(tr).find("td.OperatorTankChargeCostPrice").text());
        $("#txtOperatorTankChargeItemSalePrice").val($(tr).find("td.OperatorTankChargeSalePrice").text());
        pCostCurrencyID = $(tr).find("td.OperatorTankChargeCostCurrencyID").text();
        pSaleCurrencyID = $(tr).find("td.OperatorTankChargeSaleCurrencyID").text();
        $("#cbIsImport").prop("checked", $("#cbIsImport" + pOperatorTankChargeID).prop("checked"));
        $("#cbIsExport").prop("checked", $("#cbIsExport" + pOperatorTankChargeID).prop("checked"));
        $("#cbIsDomestic").prop("checked", $("#cbIsDomestic" + pOperatorTankChargeID).prop("checked"));
        $("#cbIsCrossBooking").prop("checked", $("#cbIsCrossBooking" + pOperatorTankChargeID).prop("checked"));
        $("#cbIsReExport").prop("checked", $("#cbIsReExport" + pOperatorTankChargeID).prop("checked"));
        $("#cbIsLoaded").prop("checked", $("#cbIsLoaded" + pOperatorTankChargeID).prop("checked"));
    }
    if ($("#slOperatorTankChargeType option").length < 2) { //data is not loaded yet
        var pParametersWithValues = {
            pWhereClauseWithMinimalColumns: "WHERE 1=1"
        };
        CallGETFunctionWithParameters("/api/ChargeTypes/LoadAllWithMinimalColumns", pParametersWithValues
            , function (pData) {
                FillListFromObject(pChargeTypeID == "" ? null : pChargeTypeID, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slOperatorTankChargeType", pData[0], null);
                $("#slTankMovementCostCurrency").html($("#hReadySlCurrencies").html());
                $("#slTankMovementSaleCurrency").html($("#hReadySlCurrencies").html());
                $("#slTankMovementCostCurrency").val(pCostCurrencyID);
                $("#slTankMovementSaleCurrency").val(pSaleCurrencyID);
                FadePageCover(false);
            }
            , null);
    } //EOF if ($("#slOperatorTankChargeType option").length < 2) { //data is not loaded yet
    else {
        $("#slOperatorTankChargeType").val(pChargeTypeID);
        $("#slTankMovementCostCurrency").val(pCostCurrencyID);
        $("#slTankMovementSaleCurrency").val(pSaleCurrencyID);
        FadePageCover(false);
    }
    jQuery("#OperatorTankChargeItemModal").modal("show");
}
function OperatorTankChargeItem_Save(pSaveAndNew) {
    debugger;
    if (ValidateForm("form", "OperatorTankChargeItemModal")) {
        FadePageCover(true);
        var pParametersWithValues = {
            pOperatorTankChargeID: $("#hOperatorTankChargeItemID").val() == "" ? 0 : $("#hOperatorTankChargeItemID").val()
            , pCustomerID: 0
            , pAgentID: $("#hAgentID").val() == "" ? 0 : $("#hAgentID").val()
            , pChargeTypeID: $("#slOperatorTankChargeType").val() == "" ? 0 : $("#slOperatorTankChargeType").val()
            , pCostPrice: $("#txtOperatorTankChargeItemCostPrice").val() == "" ? 0 : $("#txtOperatorTankChargeItemCostPrice").val()
            , pCostCurrencyID: $("#slTankMovementCostCurrency").val() == "" ? 0 : $("#slTankMovementCostCurrency").val()
            , pSalePrice: $("#txtOperatorTankChargeItemSalePrice").val() == "" ? 0 : $("#txtOperatorTankChargeItemSalePrice").val()
            , pSaleCurrencyID: $("#slTankMovementSaleCurrency").val() == "" ? 0 : $("#slTankMovementSaleCurrency").val()
            , pIsImport: $("#cbIsImport").prop("checked")
            , pIsExport: $("#cbIsExport").prop("checked")
            , pIsDomestic: $("#cbIsDomestic").prop("checked")
            , pIsCrossBooking: $("#cbIsCrossBooking").prop("checked")
            , pIsReExport: $("#cbIsReExport").prop("checked")
            , pIsLoaded: $("#cbIsLoaded").prop("checked")
            , pNotes: $("#txtOperatorTankChargeItemNotes").val() == "" ? 0 : $("#txtOperatorTankChargeItemNotes").val()
        };
        CallGETFunctionWithParameters("/api/Agents/OperatorTankCharge_Save", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                var pTableRows = JSON.parse(pData[1]);
                if (_MessageReturned == "") {
                    OperatorTankCharge_BindTableRows(pTableRows);
                    jQuery("#OperatorTankChargeItemModal").modal("hide");
                }
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function OperatorTankChargeItem_DeleteList() {
    debugger;
    var pDeletedOperatorTankChargeIDs = GetAllSelectedIDsAsStringWithTableNameAndNameAttr("tblOperatorTankCharge", "Delete");
    if (pDeletedOperatorTankChargeIDs != "")
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
            if (ValidateForm("form", "OperatorTankChargeModal")) {
                var pParametersWithValues = {
                    pDeletedOperatorTankChargeIDs: pDeletedOperatorTankChargeIDs
                    , pAgentID: $("#hAgentID").val()
                };
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/Agents/OperatorTankCharge_DeleteList", pParametersWithValues
                    , function (pData) {
                        if (pData[0]) {
                            var pTableRows = JSON.parse(pData[0]);
                            OperatorTankCharge_BindTableRows(pTableRows);
                        }
                        else
                            swal("Sorry", "Connection failed, please try again.");
                        FadePageCover(false);
                    }
                    , null);
            }
        });//of swal
}
//*********************************Uploaded Files***************************************//
function Agents_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Agents";
    glbGeneralUploadFolderName = $("#hAgentID").val() == "" ? "" : $("#txtAgentName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Agents//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Agents/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Agents";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Agents";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Agents";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
/**********************Agent Network****************************/
function AgentNetwork_BindTableRows(pAgentNetwork) {
    debugger;
    //ClearAllTableRows("tblAgentNetwork");
    $("#tblAgentNetwork tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pAgentNetwork, function (i, item) {
        AppendRowtoTable("tblAgentNetwork",
        ("<tr ID='" + item.ID + "' ondblclick='AgentNetwork_FillControls(" + item.ID + ");'>"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='AgentID hide'>" + item.AgentID + "</td>"
                    + "<td class='NetworkID hide'>" + item.NetworkID + "</td>"
                    + "<td class='NetworkName'>" + item.NetworkName + "</td>"
                    + "<td class='FromDate'>" + item.StringFromDate + "</td>"
                    + "<td class='ToDate'>" + item.StringToDate + "</td>"
                    //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='hide'><a href='#AgentNetworkModal' data-toggle='modal' onclick='AgentNetwork_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblAgentNetwork", "ID", "cb-CheckAll-AgentNetwork");
    CheckAllCheckbox("HeaderDeletetblAgentNetworkID");
    HighlightText("#tblAgentNetwork>tbody>tr", $("#txtAgentNetworkSearch").val().trim());
    strBindTableRowsFunctionName = "Agents_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function AgentNetwork_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hAgentID").val();
    strLoadWithPagingFunctionName = "/api/AgentNetwork/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "AgentNetwork_BindTableRows";
    var pWhereClause = " WHERE AgentID = " + pID;
    pWhereClause += ($("#txtAgentNetworkSearch").val().trim() == "" || $("#txtAgentNetworkSearch").val() == undefined
        ? ""
        : " AND NetworkName LIKE '%" + $("#txtAgentNetworkSearch").val().trim() + "%'");
    var pOrderBy = " NetworkName ";
    LoadWithPagingForModal("/api/AgentNetwork/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            AgentNetwork_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Agents/LoadWithPaging";
            //strBindTableRowsFunctionName = "Agents_BindTableRows";
    });

}
//to reset function names as in mainapp.master
function AgentNetwork_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Agents/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Agents_BindTableRows";
}
function AgentNetwork_ClearAllControls() {
    debugger;
    ClearAll("#AgentNetworkModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblAgentNetworkShown").html($("#lblAgentShown").html());
    Agent_Network_GetList(null, null);
    $("#txtAgentNetworkFromDate").val(_FormattedTodaysDate);
    $("#txtAgentNetworkToDate").val(_FormattedTodaysDate);

    $("#btnSaveAgentNetwork").attr("onclick", "AgentNetwork_Insert(false);");
    $("#btnSaveandNewAgentNetwork").attr("onclick", "AgentNetwork_Insert(true);");

}
function AgentNetwork_FillControls(pAgentNetworkID) {
    debugger;
    ClearAll("#AgentNetworkModal", null);
    jQuery("#AgentNetworkModal").modal("show");
    $("#hAgentNetworkID").val(pAgentNetworkID);
    var tr = $("#tblAgentNetwork tbody tr[ID='" + pAgentNetworkID + "']");
    var pNetworkID = $(tr).find("td.NetworkID").text();
    $("#lblAgentNetworkShown").html($("#lblAgentShown").html());
    Agent_Network_GetList(pNetworkID, null);
    $("#txtAgentNetworkFromDate").val($(tr).find("td.FromDate").text());
    $("#txtAgentNetworkToDate").val($(tr).find("td.ToDate").text());
    $("#txtAgentNetworkNotes").val($(tr).find("td.Notes").text());

    $("#btnSaveAgentNetwork").attr("onclick", "AgentNetwork_Update(false);");
    $("#btnSaveandNewAgentNetwork").attr("onclick", "AgentNetwork_Update(true);");
}
function AgentNetwork_Insert(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtAgentNetworkFromDate").val()), ConvertDateFormat($("#txtAgentNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/AgentNetwork/Insert"
            , {
                pAgentID: $('#hAgentID').val()
                , pNetworkID: $('#slAgentNetwork').val()
                , pFromDate: $('#txtAgentNetworkFromDate').val().trim() == "" ? "0" : $('#txtAgentNetworkFromDate').val()
                , pToDate: $('#txtAgentNetworkToDate').val().trim() == "" ? "0" : $('#txtAgentNetworkToDate').val()
                , pNotes: $('#txtAgentNetworkNotes').val().trim() == "" ? "0" : $('#txtAgentNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "AgentNetworkModal"
            , function () {
                AgentNetwork_LoadingWithPagingForModal($('#hAgentID').val());
                if (pSaveandAddNew)
                    AgentNetwork_ClearAllControls();
            });
    }
}
function AgentNetwork_Update(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtAgentNetworkFromDate").val()), ConvertDateFormat($("#txtAgentNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/AgentNetwork/Insert"
            , {
                pID: $("#hAgentNetworkID").val()
                , pAgentID: $('#hAgentID').val()
                , pNetworkID: $('#slAgentNetwork').val()
                , pFromDate: $('#txtAgentNetworkFromDate').val().trim() == "" ? "0" : $('#txtAgentNetworkFromDate').val()
                , pToDate: $('#txtAgentNetworkToDate').val().trim() == "" ? "0" : $('#txtAgentNetworkToDate').val()
                , pNotes: $('#txtAgentNetworkNotes').val().trim() == "" ? "0" : $('#txtAgentNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "AgentNetworkModal"
            , function () {
                AgentNetwork_LoadingWithPagingForModal($('#hAgentID').val());
                if (pSaveandAddNew)
                    AgentNetwork_ClearAllControls();
            });
    }
}
function AgentNetwork_Delete() {
    debugger;
    var pAgentNetworkIDs = GetAllSelectedIDsAsString('tblAgentNetwork');
    //Confirmation message to delete
    if (pAgentNetworkIDs != "")
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
            DeleteListFunction("/api/AgentNetwork/Delete", { "pAgentNetworkIDs": pAgentNetworkIDs }, function () {
                //AgentNetwork_LoadAll($("#hAirlineID").val());
                AgentNetwork_LoadingWithPagingForModal($("#hAgentID").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Agents_onFileSelected(event, pBtnName) {
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
                    Agents_ImportFromExcelFile(oJS, pBtnName);
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

function Agents_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Agents Name List from DB
    var ExistingAgentsNameList;
    var ExistingAgentsNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/Agents/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingAgentsNameList = JSON.parse(pData[0]);
                ExistingAgentsNameArray = ExistingAgentsNameList.map(item => item.Name);


                FadePageCover(true);
                var pNameList = "";
                var pNameArray = [];
                var pLocalNameList = "";
                var pAddressList = "";
                var pEmailList = "";
                var pPhonesAndFaxesList = "";
                var pVATNumberList = "";
                var pCommercialRegistrationList = "";
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
                        if (ExistingAgentsNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    pAddressList += ((pAddressList == "" ? "" : ",") +
                        (pDataRows[i].Address == undefined || pDataRows[i].Address.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Address.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pEmailList += ((pEmailList == "" ? "" : ",") +
                        (pDataRows[i].Email == undefined || pDataRows[i].Email.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Email.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pPhonesAndFaxesList += ((pPhonesAndFaxesList == "" ? "" : ",") +
                        (pDataRows[i].PhonesAndFaxes == undefined || pDataRows[i].PhonesAndFaxes.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PhonesAndFaxes.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pVATNumberList += ((pVATNumberList == "" ? "" : ",") +
                        (pDataRows[i].VATNumber == undefined || pDataRows[i].VATNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VATNumber.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCommercialRegistrationList += ((pCommercialRegistrationList == "" ? "" : ",") +
                        (pDataRows[i].CommercialRegistration == undefined || pDataRows[i].CommercialRegistration.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CommercialRegistration.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCompanyList += ((pCompanyList == "" ? "" : ",") +
                        (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pAddressList, pEmailList
                    , pPhonesAndFaxesList, pVATNumberList, pCommercialRegistrationList, pCompanyList
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Agents ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/Agents/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        Agents_LoadingWithPaging();
                    }, null);


                }


                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);



}
//******************************EOF Reading Excel Files***************************************//;