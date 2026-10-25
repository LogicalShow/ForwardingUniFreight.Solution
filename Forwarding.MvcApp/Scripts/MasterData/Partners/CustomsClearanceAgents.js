//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// CustomsClearanceAgents Region ---------------------------------------------------------------
// Bind CustomsClearanceAgents Table Rows
var intPartnerTypeID = 4;
function CustomsClearanceAgents_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/CustomsClearanceAgents/LoadWithPaging";
    LoadView("/MasterData/CustomsClearanceAgents", "div-content", function () {
        LoadView("/MasterData/ModalCustomsClearanceAgents", "div-content", function () {
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
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCustomsClearanceAgentAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCustomsClearanceAgentCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCustomsClearanceAgentSubAccountGroup", pSupplierGroup, null);
                    $("#slCustomsClearanceAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                }
               , null);
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalPartnersBanks", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { CustomsClearanceAgents_BindTableRows(pTabelRows); });

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { CustomsClearanceAgents_ClearAllControls(); },
        function () { CustomsClearanceAgents_DeleteList(); });
}
function CustomsClearanceAgents_BindTableRows(pCustomsClearanceAgents) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblCustomsClearanceAgents");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomsClearanceAgents, function (i, item) {
        AppendRowtoTable("tblCustomsClearanceAgents",
            ("<tr ID='" + item.ID + "' ondblclick='CustomsClearanceAgents_EditByDblClick(" + item.ID + ");'>"
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
                    + "<td class='hide'><a href='#CustomsClearanceAgentModal' data-toggle='modal' onclick='CustomsClearanceAgents_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomsClearanceAgents", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblCustomsClearanceAgents>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function CustomsClearanceAgents_EditByDblClick(pID) {
    jQuery("#CustomsClearanceAgentModal").modal("show");
    CustomsClearanceAgents_FillControls(pID);
}
function CustomsClearanceAgents_LoadingWithPaging() {
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

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/CustomsClearanceAgents/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { CustomsClearanceAgents_BindTableRows(pTabelRows); CustomsClearanceAgents_ClearAllControls(); });
    HighlightText("#tblCustomsClearanceAgents>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function CustomsClearanceAgents_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable)
        InsertUpdateFunction("form", "/api/CustomsClearanceAgents/Insert", {
            pPaymentTermID: ($('#slCustomsClearanceAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentPaymentTerms option:selected').val()), pCurrencyID: ($('#slCustomsClearanceAgentCurrencies option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentCurrencies option:selected').val()), pTaxeTypeID: ($('#slCustomsClearanceAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtCustomsClearanceAgentName").val().trim(), pLocalName: $("#txtCustomsClearanceAgentLocalName").val().trim(), pWebsite: ($("#txtCustomsClearanceAgentWebsite").val() == null ? "" : $("#txtCustomsClearanceAgentWebsite").val().trim()), pIsInactive: $("#cbCustomsClearanceAgentIsInactive").prop('checked'), pNotes: ($("#txtCustomsClearanceAgentNotes").val() == null ? "" : $("#txtCustomsClearanceAgentNotes").val().trim()), pVATNumber: ($("#txtCustomsClearanceAgentVATNumber").val() == null ? "" : $("#txtCustomsClearanceAgentVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtCustomsClearanceAgentBankName").val() == null ? "" : $("#txtCustomsClearanceAgentBankName").val().trim()), pBankAddress: ($("#txtCustomsClearanceAgentBankAddress").val() == null ? "" : $("#txtCustomsClearanceAgentBankAddress").val().trim()), pSwift: ($("#txtCustomsClearanceAgentSwift").val() == null ? "" : $("#txtCustomsClearanceAgentSwift").val().trim()), pBankAccountNumber: ($("#txtCustomsClearanceAgentBankAccountNumber").val() == null ? "" : $("#txtCustomsClearanceAgentBankAccountNumber").val().trim()), pIBANNumber: ($("#txtCustomsClearanceAgentIBANNumber").val() == null ? "" : $("#txtCustomsClearanceAgentIBANNumber").val().trim())
            , pAccountID: $("#slCustomsClearanceAgentAccount").val()
            , pSubAccountID: $("#slCustomsClearanceAgentSubAccount").val()
            , pCostCenterID: $("#slCustomsClearanceAgentCostCenter").val()
            , pSubAccountGroupID: $("#slCustomsClearanceAgentSubAccountGroup").val()
        }, pSaveandAddNew, "CustomsClearanceAgentModal", function () { CustomsClearanceAgents_LoadingWithPaging(); });
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            InsertUpdateFunction("form", "/api/CustomsClearanceAgents/Insert", {
                pPaymentTermID: ($('#slCustomsClearanceAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentPaymentTerms option:selected').val())
                , pCurrencyID: ($('#slCustomsClearanceAgentCurrencies option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentCurrencies option:selected').val())
                , pTaxeTypeID: ($('#slCustomsClearanceAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentTaxeTypes option:selected').val())
                , pCode: 0 /*generated automatically*/
                , pName: $("#txtCustomsClearanceAgentName").val().trim()
                , pLocalName: $("#txtCustomsClearanceAgentLocalName").val().trim()
                , pWebsite: ($("#txtCustomsClearanceAgentWebsite").val() == null ? "" : $("#txtCustomsClearanceAgentWebsite").val().trim())
                , pIsInactive: $("#cbCustomsClearanceAgentIsInactive").prop('checked')
                , pNotes: ($("#txtCustomsClearanceAgentNotes").val() == null ? "" : $("#txtCustomsClearanceAgentNotes").val().trim())
                , pVATNumber: ($("#txtCustomsClearanceAgentVATNumber").val() == null ? "" : $("#txtCustomsClearanceAgentVATNumber").val().trim())
                , pIsConsolidatedInvoice: $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked')
                , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                , pBankName: ($("#txtCustomsClearanceAgentBankName").val() == null ? "" : $("#txtCustomsClearanceAgentBankName").val().trim())
                , pBankAddress: ($("#txtCustomsClearanceAgentBankAddress").val() == null ? "" : $("#txtCustomsClearanceAgentBankAddress").val().trim())
                , pSwift: ($("#txtCustomsClearanceAgentSwift").val() == null ? "" : $("#txtCustomsClearanceAgentSwift").val().trim())
                , pBankAccountNumber: ($("#txtCustomsClearanceAgentBankAccountNumber").val() == null ? "" : $("#txtCustomsClearanceAgentBankAccountNumber").val().trim())
                , pIBANNumber: ($("#txtCustomsClearanceAgentIBANNumber").val() == null ? "" : $("#txtCustomsClearanceAgentIBANNumber").val().trim())
                , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
            }, pSaveandAddNew, "CustomsClearanceAgentModal"
            , function () {
                CustomsClearanceAgents_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
function CustomsClearanceAgents_Update(pSaveandAddNew, pDontReloadTable) {
    if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
        InsertUpdateFunction("form", "/api/CustomsClearanceAgents/Update", {
            pID: $("#hCustomsClearanceAgentID").val(), pPaymentTermID: ($('#slCustomsClearanceAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slCustomsClearanceAgentCurrencies option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slCustomsClearanceAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentTaxeTypes option:selected').val())
            , pCode: $("#txtCustomsClearanceAgentCode").val().trim()
            , pName: $("#txtCustomsClearanceAgentName").val().trim()
            , pLocalName: $("#txtCustomsClearanceAgentLocalName").val().trim()
            , pWebsite: ($("#txtCustomsClearanceAgentWebsite").val() == null ? "" : $("#txtCustomsClearanceAgentWebsite").val().trim())
            , pIsInactive: $("#cbCustomsClearanceAgentIsInactive").prop('checked')
            , pNotes: ($("#txtCustomsClearanceAgentNotes").val() == null ? "" : $("#txtCustomsClearanceAgentNotes").val().trim())
            , pVATNumber: ($("#txtCustomsClearanceAgentVATNumber").val() == null ? "" : $("#txtCustomsClearanceAgentVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtCustomsClearanceAgentBankName").val() == null ? "" : $("#txtCustomsClearanceAgentBankName").val().trim())
            , pBankAddress: ($("#txtCustomsClearanceAgentBankAddress").val() == null ? "" : $("#txtCustomsClearanceAgentBankAddress").val().trim())
            , pSwift: ($("#txtCustomsClearanceAgentSwift").val() == null ? "" : $("#txtCustomsClearanceAgentSwift").val().trim())
            , pBankAccountNumber: ($("#txtCustomsClearanceAgentBankAccountNumber").val() == null ? "" : $("#txtCustomsClearanceAgentBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtCustomsClearanceAgentIBANNumber").val() == null ? "" : $("#txtCustomsClearanceAgentIBANNumber").val().trim())
            , pAccountID: $("#slCustomsClearanceAgentAccount").val()
            , pSubAccountID: $("#slCustomsClearanceAgentSubAccount").val()
            , pCostCenterID: $("#slCustomsClearanceAgentCostCenter").val()
            , pSubAccountGroupID: $("#slCustomsClearanceAgentSubAccountGroup").val()
        }, pSaveandAddNew, "CustomsClearanceAgentModal", function () { CustomsClearanceAgents_LoadingWithPaging(); });
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            InsertUpdateFunction("form", "/api/CustomsClearanceAgents/Update", {
                pID: $("#hCustomsClearanceAgentID").val()
                , pPaymentTermID: ($('#slCustomsClearanceAgentPaymentTerms option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentPaymentTerms option:selected').val())
                , pCurrencyID: ($('#slCustomsClearanceAgentCurrencies option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentCurrencies option:selected').val())
                , pTaxeTypeID: ($('#slCustomsClearanceAgentTaxeTypes option:selected').val() == "" ? 0 : $('#slCustomsClearanceAgentTaxeTypes option:selected').val())
                , pCode: $("#txtCustomsClearanceAgentCode").val().trim()
                , pName: $("#txtCustomsClearanceAgentName").val().trim()
                , pLocalName: $("#txtCustomsClearanceAgentLocalName").val().trim()
                , pWebsite: ($("#txtCustomsClearanceAgentWebsite").val() == null ? "" : $("#txtCustomsClearanceAgentWebsite").val().trim())
                , pIsInactive: $("#cbCustomsClearanceAgentIsInactive").prop('checked')
                , pNotes: ($("#txtCustomsClearanceAgentNotes").val() == null ? "" : $("#txtCustomsClearanceAgentNotes").val().trim())
                , pVATNumber: ($("#txtCustomsClearanceAgentVATNumber").val() == null ? "" : $("#txtCustomsClearanceAgentVATNumber").val().trim())
                , pIsConsolidatedInvoice: $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked')
                , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                , pBankName: ($("#txtCustomsClearanceAgentBankName").val() == null ? "" : $("#txtCustomsClearanceAgentBankName").val().trim())
                , pBankAddress: ($("#txtCustomsClearanceAgentBankAddress").val() == null ? "" : $("#txtCustomsClearanceAgentBankAddress").val().trim())
                , pSwift: ($("#txtCustomsClearanceAgentSwift").val() == null ? "" : $("#txtCustomsClearanceAgentSwift").val().trim())
                , pBankAccountNumber: ($("#txtCustomsClearanceAgentBankAccountNumber").val() == null ? "" : $("#txtCustomsClearanceAgentBankAccountNumber").val().trim())
                , pIBANNumber: ($("#txtCustomsClearanceAgentIBANNumber").val() == null ? "" : $("#txtCustomsClearanceAgentIBANNumber").val().trim())
                , pAccountID: -1    //called from operations or quotations, so don't update ERP
                , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
            }, pSaveandAddNew, "CustomsClearanceAgentModal"
            , function () {
                CustomsClearanceAgents_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
function CustomsClearanceAgents_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/CustomsClearanceAgents/UnlockRecord",
            { pID: ($("#hCustomsClearanceAgentID").val() == "" ? 0 : $("#hCustomsClearanceAgentID").val()) },
            "CustomsClearanceAgentModal",
            function () { CustomsClearanceAgents_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            UnlockFunction("/api/CustomsClearanceAgents/UnlockRecord",
            { pID: ($("#hCustomsClearanceAgentID").val() == "" ? 0 : $("#hCustomsClearanceAgentID").val()) },
            "CustomsClearanceAgentModal",
            function () {
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
//function CustomsClearanceAgents_Delete(pID) {
//    DeleteListFunction("/api/CustomsClearanceAgents/DeleteByID", { "pID": pID }, function () { CustomsClearanceAgents_LoadingWithPaging(); });
//}
function CustomsClearanceAgents_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblCustomsClearanceAgents') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblCustomsClearanceAgents');
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
                            DeleteListFunction("/api/CustomsClearanceAgents/Delete", { "pCustomsClearanceAgentsIDs": GetAllSelectedIDsAsString('tblCustomsClearanceAgents') }, function () {
                                CustomsClearanceAgents_LoadingWithPaging(
                                    //this is callback in CustomsClearanceAgents_LoadingWithPaging
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
function CustomsClearanceAgents_FillControls(pID, pDontLoadTable) {
    //CustomsClearanceAgents_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/CustomsClearanceAgents/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    if (IsAccountingActive)
        $(".classAccountingOption").removeClass("hide");
    else
        $(".classAccountingOption").addClass("hide");
        var tr = $("tr[ID='" + pID + "']");
        debugger;
        $("#hCustomsClearanceAgentID").val(pID);

        $("#slCustomsClearanceAgentSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slCustomsClearanceAgentAccount', 'slCustomsClearanceAgentSubAccountGroup', 'slCustomsClearanceAgentSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());

        //FillSlSubAccount('slCustomsClearanceAgentSubAccount', 'slCustomsClearanceAgentAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();
        $("#slCustomsClearanceAgentSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

        $("#slCustomsClearanceAgentCostCenter").val($(tr).find("td.CostCenterID").text());

        if ($(tr).find("td.SubAccountID").text() == 0) {
            $("#slCustomsClearanceAgentAccount").removeAttr("disabled");
            $("#slCustomsClearanceAgentSubAccountGroup").removeAttr("disabled");
        }
        else {
            $("#slCustomsClearanceAgentAccount").attr("disabled", "disabled");
            $("#slCustomsClearanceAgentSubAccountGroup").attr("disabled", "disabled");
        }
        if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
            $("#txtCustomsClearanceAgentName").removeAttr("disabled");
            $("#txtCustomsClearanceAgentLocalName").removeAttr("disabled");
        }
        else {
            $("#txtCustomsClearanceAgentName").attr("disabled", "disabled");
            $("#txtCustomsClearanceAgentLocalName").attr("disabled", "disabled");
        }

        //the next 6 lines are to set the slCustomsClearanceAgentPaymentTerms, slCustomsClearanceAgentCurrencies and slCustomsClearanceAgentTaxeTypes to the value entered before
        var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
        CustomsClearanceAgent_PaymentTerms_GetList(pPaymentTermID, null);
        var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
        CustomsClearanceAgent_Currencies_GetList(pCurrencyID, null);
        var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
        CustomsClearanceAgent_TaxeTypes_GetList(pTaxeTypeID, null);

        //the next line is to get the CustomsClearanceAgent addresses and Contacts info (PartnerTypeID for CustomsClearanceAgents is 8)
        Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
        Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
        PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
        debugger;
        $("#tblUploadedFiles_CustomsClearanceAgents tbody").html("");
    
        $("#lblCustomsClearanceAgentShown").html(": " + $(tr).find("td.Name").text());
        $("#txtCustomsClearanceAgentCode").val($(tr).find("td.Code").text());
        $("#txtCustomsClearanceAgentName").val($(tr).find("td.Name").text());
        $("#txtCustomsClearanceAgentLocalName").val($(tr).find("td.LocalName").text());
        $("#txtCustomsClearanceAgentWebsite").val($(tr).find("td.Website").text());
        $("#btnCustomsClearanceAgentWebsiteVisitWebsite").attr('href', 'http://' + $("#txtCustomsClearanceAgentWebsite").val());
        $("#cbCustomsClearanceAgentIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
        $("#txtCustomsClearanceAgentNotes").val($(tr).find("td.Notes").text());
        $("#txtCustomsClearanceAgentVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbCustomsClearanceAgentIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val')).change();
    $("#txtTaxExemptFromDate").val($(tr).find("td.TaxExemptFromDate").text());
    $("#txtTaxExemptToDate").val($(tr).find("td.TaxExemptToDate").text());
        $("#txtCustomsClearanceAgentBankName").val($(tr).find("td.BankName").text());
        $("#txtCustomsClearanceAgentBankAddress").val($(tr).find("td.BankAddress").text());
        $("#txtCustomsClearanceAgentSwift").val($(tr).find("td.Swift").text());
        $("#txtCustomsClearanceAgentBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
        $("#txtCustomsClearanceAgentIBANNumber").val($(tr).find("td.IBANNumber").text());
        CustomsClearanceAgents_GeneralUpload_Initialise();
        
        //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
        //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
        if (pDontLoadTable != null && pDontLoadTable != undefined) {
            $("#btnSaveCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(false, pDontLoadTable);");
            $("#btnSaveandNewCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(true, pDontLoadTable);");
        }
        else {
            $("#btnSaveCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(false);");
            $("#btnSaveandNewCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Update(true);");
        }

        //to set the wizard to BasicData
        $("#stepsBasicDataCustomsClearanceAgent").parent().children().removeClass("active");
        $("#stepsBasicDataCustomsClearanceAgent").addClass("active");
        $("#BasicDataCustomsClearanceAgent").parent().children().removeClass("active");
        $("#BasicDataCustomsClearanceAgent").addClass("active");
        //to hide Contacts and Addresses tabs in case of partner is not saved yet
        CustomsClearanceAgents_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
function CustomsClearanceAgents_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtCustomsClearanceAgentCode", "txtCustomsClearanceAgentName", "txtCustomsClearanceAgentLocalName", "txtCustomsClearanceAgentWebsite", "txtCustomsClearanceAgentNotes", "txtCustomsClearanceAgentVATNumber", "txtCustomsClearanceAgentBankName", "txtCustomsClearanceAgentBankAddress", "txtCustomsClearanceAgentSwift", "txtCustomsClearanceAgentBankAccountNumber", "txtCustomsClearanceAgentIBANNumber"),
    //    new Array("slCustomsClearanceAgentPaymentTerms", "slCustomsClearanceAgentCurrencies", "slCustomsClearanceAgentTaxeTypes"), new Array("cbCustomsClearanceAgentIsInactive", "cbCustomsClearanceAgentIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $(".classAccountingOption").addClass("hide");
    $("#CustomsClearanceAgentModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#CustomsClearanceAgentModal").addClass("hide");" in Quotations.js
    ClearAll("#CustomsClearanceAgentModal", null);

    $("#slCustomsClearanceAgentAccount").removeAttr("disabled");
    $("#slCustomsClearanceAgentSubAccountGroup").removeAttr("disabled");

    $("#txtCustomsClearanceAgentName").removeAttr("disabled");
    $("#txtCustomsClearanceAgentLocalName").removeAttr("disabled");

    $("#slCustomsClearanceAgentAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');
    $("#slCustomsClearanceAgentSubAccount").attr("disabled", "disabled");
    $("#slCustomsClearanceAgentSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnCustomsClearanceAgentVisitWebsite").attr('href', 'http://');
    $("#bodyCustomsClearanceAgentAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyCustomsClearanceAgentPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyCustomsClearanceAgentContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    CustomsClearanceAgent_PaymentTerms_GetList(null, null);
    CustomsClearanceAgent_Currencies_GetList(null, null);
    CustomsClearanceAgent_TaxeTypes_GetList(null, null);
    //EOF for AddressModal
    debugger;

    //this 2nd flag in CustomsClearanceAgents_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Insert(false);");
        $("#btnSaveandNewCustomsClearanceAgent").attr("onclick", "CustomsClearanceAgents_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataCustomsClearanceAgent").parent().children().removeClass("active");
    $("#stepsBasicDataCustomsClearanceAgent").addClass("active");
    $("#BasicDataCustomsClearanceAgent").parent().children().removeClass("active");
    $("#BasicDataCustomsClearanceAgent").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    CustomsClearanceAgents_ShowHideTabs();
    ShowTaxExemptDate();
}
function CustomsClearanceAgents_SetWebSiteHref() {
    $("#btnCustomsClearanceAgentVisitWebsite").attr('href', 'http://' + $("#txtCustomsClearanceAgentWebsite").val());
}
function CustomsClearanceAgents_ShowHideTabs() {
    if ($("#txtCustomsClearanceAgentCode").val() == "") {
        $("#stepsContactsCustomsClearanceAgent").addClass('hide');
        $("#stepsAddressesCustomsClearanceAgent").addClass('hide');
        $("#stepsPartnersBanksCustomsClearanceAgent").addClass('hide');
    }
    else {
        $("#stepsContactsCustomsClearanceAgent").removeClass('hide');
        $("#stepsAddressesCustomsClearanceAgent").removeClass('hide');
        $("#stepsPartnersBanksCustomsClearanceAgent").removeClass('hide');
    }
}
function CustomsClearanceAgent_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slCustomsClearanceAgentPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
function CustomsClearanceAgent_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slCustomsClearanceAgentCurrencies", " WHERE 1=1 ORDER BY Code ");
}
function CustomsClearanceAgent_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slCustomsClearanceAgentTaxeTypes");
}
/////////////////////////////////////////////////////////////////////////////////////////////

//*********************************Uploaded Files***************************************//
function CustomsClearanceAgents_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_CustomsClearanceAgents";
    glbGeneralUploadFolderName = $("#hCustomsClearanceAgentID").val() == "" ? "" : $("#txtCustomsClearanceAgentName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//CustomsClearanceAgents//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/CustomsClearanceAgents/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_CustomsClearanceAgents";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_CustomsClearanceAgents";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_CustomsClearanceAgents";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//



//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function CustomsClearanceAgents_onFileSelected(event, pBtnName) {
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
                    CustomsClearanceAgents_ImportFromExcelFile(oJS, pBtnName);
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

function CustomsClearanceAgents_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing CustomsClearanceAgents Name List from DB
    var ExistingCustomsClearanceAgentsNameList;
    var ExistingCustomsClearanceAgentsNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/CustomsClearanceAgents/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingCustomsClearanceAgentsNameList = JSON.parse(pData[0]);
                ExistingCustomsClearanceAgentsNameArray = ExistingCustomsClearanceAgentsNameList.map(item => item.Name);


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
                        if (ExistingCustomsClearanceAgentsNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in CustomsClearanceAgents ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/CustomsClearanceAgents/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        CustomsClearanceAgents_LoadingWithPaging();
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
    if ($('#cbCustomsClearanceAgentIsConsolidatedInvoice').is(':checked')) {
        $('.TaxExempt').removeClass('hide');
    }
    else {
        $('.TaxExempt').addClass('hide');
        $('#txtTaxExemptFromDate,#txtTaxExemptToDate').val('');
    }
}