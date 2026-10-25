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
var intPartnerTypeID = 8;

function Suppliers_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Suppliers/LoadWithPaging";
    LoadView("/MasterData/Suppliers", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalSuppliers", "div-content", function () {
            if (IsAccountingActive) $(".classAccountingOption").removeClass("hide");
            else $(".classAccountingOption").addClass("hide");
            if (pDefaults.UnEditableCompanyName != "ALT" && pDefaults.UnEditableCompanyName != "EUR" && pDefaults.UnEditableCompanyName != "MES"
                 && pDefaults.UnEditableCompanyName != "GLO" && pDefaults.UnEditableCompanyName != "SAC") {
                $(".classHideForMESCOChildren").removeClass("hide");
            }
            if (pDefaults.UnEditableCompanyName == "COS")
                $("#txtSupplierVATNumber").attr("data-required", "true");

            if (pDefaults.UnEditableCompanyName == "LATT") {
                $("#txtFinance365Ref").prev().text("Organization Code");
                $("#txtFinance365Ref").parent().removeClass("hide");
                $("#slSupplierCreditorGroupID").attr("data-required", "true");
            }
            LoadSuppliersModalComboBoxes();
            $(".classHideOutsidePartners").removeClass("hide");
            CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
                , { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE 1=0", pOrderBy: "Name,Code" }
                , function (pData) {
                    var pClientGroup = pData[3];
                    var pSupplierGroup = pData[4];
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSupplierSubAccountGroup", pSupplierGroup, null);
                    $("#slSupplierSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                }
               , null);
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", function () {
            if (pDefaults.UnEditableCompanyName == "LATT") {
                $("#txtPrintedAs").parent().attr("style", "");
                $("#txtPrintedAs").prev().text("State");
            }
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalPartnersBanks", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10, function (pTabelRows) {
                Suppliers_BindTableRows(pTabelRows);
            });

        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { Suppliers_ClearAllControls(); },
        function () { Suppliers_DeleteList(); });
}
function Suppliers_BindTableRows(pSuppliers) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSuppliers");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSuppliers, function (i, item) {
        AppendRowtoTable("tblSuppliers",
            ("<tr ID='" + item.ID + "' ondblclick='Suppliers_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + item.LocalName + "</td>"
                    + "<td class='Website hide'>" + item.Website + "</td>"
                    + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='isAuthority hide'> <input type='checkbox' disabled='disabled' val='" + (item.isAuthority == true ? "true' checked='checked'" : "'") + " /></td>"

                    + "<td class='VATNumber hide'>" + item.VATNumber + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='Finance365Ref hide'>" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"
                    + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TaxExemptFromDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptFromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptFromDate))) + "</td>"
                + "<td class='TaxExemptToDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptToDate))) + "</td>"
                + "<td class='BankName hide'>" + item.BankName + "</td>"
                    + "<td class='BankAddress hide'>" + item.BankAddress + "</td>"
                    + "<td class='Swift hide'>" + item.Swift + "</td>"
                    + "<td class='BankAccountNumber hide'>" + item.BankAccountNumber + "</td>"
                    + "<td class='IBANNumber hide'>" + item.IBANNumber + "</td>"

                    + "<td class='BranchID hide' val='" + item.BranchID + "'>" + item.BranchID + "</td>"
                    + "<td class='SalesmanID hide' val='" + item.SalesmanID + "'>" + item.SalesmanID + "</td>"
                    + "<td class='CreditorGroupID hide' val='" + item.CreditorGroupID + "'>" + item.CreditorGroupID + "</td>"
                    + "<td class='CRM_Code hide' val='" + item.CRM_Code + "'>" + item.CRM_Code + "</td>"
                    + "<td class='PhonesAndFaxes hide'>" + item.PhonesAndFaxes + "</td>"

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                     + "<td class='Sites hide'>" + item.Sites + "</td>"
                    + "<td class='hide'><a href='#SupplierModal' data-toggle='modal' onclick='Suppliers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#btn-Delete").addClass("hide");
    }
    BindAllCheckboxonTable("tblSuppliers", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSuppliers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Suppliers_EditByDblClick(pID) {
    jQuery("#SupplierModal").modal("show");
    Suppliers_FillControls(pID);
}
function Suppliers_LoadingWithPaging() {
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

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Suppliers/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Suppliers_BindTableRows(pTabelRows); Suppliers_ClearAllControls(); });
    HighlightText("#tblSuppliers>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Suppliers_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var SelectSubAccount = $('#hReadySlOptions option[value="190"]').attr("OptionValue");//SelectSubAccount

    if ($("#txtSupplierVATNumber").val().trim() == "" && pDefaults.UnEditableCompanyName == "COS") {
        swal("Sorry", "Please, add VAT number");
        return;
    }
    if (SelectSubAccount == "true" && (SelectSubAccount != "undefined" || SelectSubAccount != null)) {
        if ($("#slSupplierSubAccountGroup").val() == "0" || $("#slSupplierAccount").val() == "0") {
            swal("Sorry", "Please, Select Group Or Account.");
        }
        else {
            if (!pDontReloadTable)
                InsertUpdateFunction("form", "/api/Suppliers/Insert", {
                    pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                    , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                    , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                    , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                    , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                    , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                    , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                    , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                    , pAccountID: $("#slSupplierAccount").val()
                    , pSubAccountID: $("#slSupplierSubAccount").val()
                    , pCostCenterID: $("#slSupplierCostCenter").val()
                    , pSubAccountGroupID: $("#slSupplierSubAccountGroup").val()
                }
                , pSaveandAddNew, "SupplierModal", function () { Suppliers_LoadingWithPaging(); });
            else
                if (pDontReloadTable == 3) // Called from OperationPartners
                    InsertUpdateFunction("form", "/api/Suppliers/Insert", {
                        pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                        , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                        , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                        , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                        , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                        , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                        , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                        , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                        , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
                    }, pSaveandAddNew, "SupplierModal"
                    , function () {
                        Suppliers_ClearAllControls(pDontReloadTable);
                        PartnerNames_GetList($('#slPartners option:selected').val(), null);
                    });
        }
    }
    else {
        if (!pDontReloadTable)
            InsertUpdateFunction("form", "/api/Suppliers/Insert", {
                pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                , pAccountID: $("#slSupplierAccount").val()
                , pSubAccountID: $("#slSupplierSubAccount").val()
                , pCostCenterID: $("#slSupplierCostCenter").val()
                , pSubAccountGroupID: $("#slSupplierSubAccountGroup").val()
                , pBranchID: CheckValueIsValidInput("#slSupplierBranchID") ? $("#slSupplierBranchID").val() : 0
                , pSalesmanID: CheckValueIsValidInput("#slSupplierSalesmanID") ? $("#slSupplierSalesmanID").val() : 0
                , pCreditorGroupID: CheckValueIsValidInput("#slSupplierCreditorGroupID") ? $("#slSupplierCreditorGroupID").val() : 0

                , pCountryID: CheckValueIsValidInput("#slCountries") ? $("#slCountries").val() : 0
                , pCityID: CheckValueIsValidInput("#slCities") ? $("#slCities").val() : 0
                , pAddressLine1: CheckValueIsValidInput("#txtStreetLine1") ? $("#txtStreetLine1").val() : "0"
                , pAddressLine2: CheckValueIsValidInput("#txtStreetLine2") ? $("#txtStreetLine2").val() : "0"
                , pZipCode: CheckValueIsValidInput("#txtZipCode") ? $("#txtZipCode").val() : "0"
                , pState: CheckValueIsValidInput("#txtPrintedAs") ? $("#txtPrintedAs").val() : "0"
                , pPhonesAndFaxes: CheckValueIsValidInput("#txtSupplierPhonesAndFaxes") ? $("#txtSupplierPhonesAndFaxes").val() : "0"
            }
                , pSaveandAddNew, "SupplierModal", function (pData) {
                    Suppliers_LoadingWithPaging();
                    if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
                        if (pData[2]) {
                            swal("Success", "GP Integrated Successfully");
                        } else {
                            swal("Integration Error", pData[3]);
                        }
                    }
                });
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                InsertUpdateFunction("form", "/api/Suppliers/Insert", {
                    pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: 0 /*generated automatically*/, pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                    , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                    , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                    , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                    , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                    , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                    , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                    , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                    , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
                }, pSaveandAddNew, "SupplierModal"
                , function () {
                    Suppliers_ClearAllControls(pDontReloadTable);
                    PartnerNames_GetList($('#slPartners option:selected').val(), null);
                });
    }
}
function Suppliers_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var SelectSubAccount = $('#hReadySlOptions option[value="190"]').attr("OptionValue");//SelectSubAccount

    if ($("#txtSupplierVATNumber").val().trim() == "" && pDefaults.UnEditableCompanyName == "COS") {
        swal("Sorry", "Please, add VAT number");
        return;
    }
    if (SelectSubAccount == "true" &&( SelectSubAccount != "undefined" || SelectSubAccount!=null))
    {
        if ($("#slSupplierSubAccountGroup").val() == "0" || $("#slSupplierAccount").val() == "0") {
            swal("Sorry", "Please, Select Group Or Account.");
        }
        else {
            if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
                InsertUpdateFunction("form", "/api/Suppliers/Update", {
                    pID: $("#hSupplierID").val(), pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: $("#txtSupplierCode").val().trim(), pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                    , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                    , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                    , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                    , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                    , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                    , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                    , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                    , pAccountID: $("#slSupplierAccount").val()
                    , pSubAccountID: $("#slSupplierSubAccount").val()
                    , pCostCenterID: $("#slSupplierCostCenter").val()
                    , pSubAccountGroupID: $("#slSupplierSubAccountGroup").val()
                }, pSaveandAddNew, "SupplierModal", function () { Suppliers_LoadingWithPaging(); });
            else
                if (pDontReloadTable == 3) // Called from OperationPartners
                    InsertUpdateFunction("form", "/api/Suppliers/Update", {
                        pID: $("#hSupplierID").val(), pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: $("#txtSupplierCode").val().trim(), pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                        , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                        , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                        , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                        , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                        , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                        , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                        , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                        , pAccountID: -1    //called from operations or quotations, so don't update ERP
                        , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                        , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                        , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
                    }, pSaveandAddNew, "SupplierModal"
                    , function () {
                        Suppliers_ClearAllControls(pDontReloadTable);
                        PartnerNames_GetList($('#slPartners option:selected').val(), null);
                    });
        }
    }
    else {
        if (!pDontReloadTable) { //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
            let SID = $("#hSupplierID").val();
            InsertUpdateFunction("form", "/api/Suppliers/Update", {
                pID: $("#hSupplierID").val(), pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: $("#txtSupplierCode").val().trim(), pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                , pAccountID: $("#slSupplierAccount").val()
                , pSubAccountID: $("#slSupplierSubAccount").val()
                , pCostCenterID: $("#slSupplierCostCenter").val()
                , pSubAccountGroupID: $("#slSupplierSubAccountGroup").val()
                , pBranchID: CheckValueIsValidInput("#slSupplierBranchID") ? $("#slSupplierBranchID").val() : 0
                , pSalesmanID: CheckValueIsValidInput("#slSupplierSalesmanID") ? $("#slSupplierSalesmanID").val() : 0
                , pCreditorGroupID: CheckValueIsValidInput("#slSupplierCreditorGroupID") ? $("#slSupplierCreditorGroupID").val() : 0
                , pCRM_Code: CheckValueIsValidInput("#txtSupplierCRM_Code") ? $("#txtSupplierCRM_Code").val() : "0"
                , pPhonesAndFaxes: CheckValueIsValidInput("#txtSupplierPhonesAndFaxes") ? $("#txtSupplierPhonesAndFaxes").val() : "0"
            }, pSaveandAddNew, "SupplierModal", function () {
                if (pDefaults.UnEditableCompanyName == "LATT") {
                    CallPOSTFunctionWithParameters("api/DynamicsGP/UpdateSupplier", SID, function (pData) {
                        if (pData.IsSuccess) {
                            swal("Success", "Integrated Successfully");
                        } else {
                            if (pData.Message != "")
                                swal("Sorry", pData.Message);
                        }
                    });
                }
                Suppliers_LoadingWithPaging();
            });
        }
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                InsertUpdateFunction("form", "/api/Suppliers/Update", {
                    pID: $("#hSupplierID").val(), pPaymentTermID: ($('#slSupplierPaymentTerms option:selected').val() == "" ? 0 : $('#slSupplierPaymentTerms option:selected').val()), pCurrencyID: ($('#slSupplierCurrencies option:selected').val() == "" ? 0 : $('#slSupplierCurrencies option:selected').val()), pTaxeTypeID: ($('#slSupplierTaxeTypes option:selected').val() == "" ? 0 : $('#slSupplierTaxeTypes option:selected').val()), pCode: $("#txtSupplierCode").val().trim(), pName: $("#txtSupplierName").val().trim(), pLocalName: $("#txtSupplierLocalName").val().trim(), pWebsite: ($("#txtSupplierWebsite").val() == null ? "" : $("#txtSupplierWebsite").val().trim()), pIsInactive: $("#cbSupplierIsInactive").prop('checked'), pisAuthority: $("#cbisAuthority").prop('checked')
                    , pNotes: ($("#txtSupplierNotes").val() == null ? "" : $("#txtSupplierNotes").val().trim())
                    , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
                    , pVATNumber: ($("#txtSupplierVATNumber").val() == null ? "" : $("#txtSupplierVATNumber").val().trim())
                    , pIsConsolidatedInvoice: $("#cbSupplierIsConsolidatedInvoice").prop('checked')
                    , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
                    , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
                    , pBankName: ($("#txtSupplierBankName").val() == null ? "" : $("#txtSupplierBankName").val().trim()), pBankAddress: ($("#txtSupplierBankAddress").val() == null ? "" : $("#txtSupplierBankAddress").val().trim()), pSwift: ($("#txtSupplierSwift").val() == null ? "" : $("#txtSupplierSwift").val().trim()), pBankAccountNumber: ($("#txtSupplierBankAccountNumber").val() == null ? "" : $("#txtSupplierBankAccountNumber").val().trim()), pIBANNumber: ($("#txtSupplierIBANNumber").val() == null ? "" : $("#txtSupplierIBANNumber").val().trim())
                    , pAccountID: -1    //called from operations or quotations, so don't update ERP
                    , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                    , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                    , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
                    , pBranchID: CheckValueIsValidInput("#slSupplierBranchID") ? $("#slSupplierBranchID").val() : 0
                    , pSalesmanID: CheckValueIsValidInput("#slSupplierSalesmanID") ? $("#slSupplierSalesmanID").val() : 0
                    , pCreditorGroupID: CheckValueIsValidInput("#slSupplierCreditorGroupID") ? $("#slSupplierCreditorGroupID").val() : 0
                    , pCRM_Code: CheckValueIsValidInput("#txtSupplierCRM_Code") ? $("#txtSupplierCRM_Code").val() : "0"
                }, pSaveandAddNew, "SupplierModal"
                , function () {
                    Suppliers_ClearAllControls(pDontReloadTable);
                    PartnerNames_GetList($('#slPartners option:selected').val(), null);
                });
    }
    
}
function Suppliers_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/Suppliers/UnlockRecord",
            { pID: ($("#hSupplierID").val() == "" ? 0 : $("#hSupplierID").val()) },
            "SupplierModal",
            function () { Suppliers_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 3) // Called from OperationPartners
            UnlockFunction("/api/Suppliers/UnlockRecord",
            { pID: ($("#hSupplierID").val() == "" ? 0 : $("#hSupplierID").val()) },
            "SupplierModal",
            function () {
                PartnerNames_GetList($('#slPartners option:selected').val(), null);
            });
}
//function Suppliers_Delete(pID) {
//    DeleteListFunction("/api/Suppliers/DeleteByID", { "pID": pID }, function () { Suppliers_LoadingWithPaging(); });
//}
function Suppliers_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSuppliers') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblSuppliers');
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
                            DeleteListFunction("/api/Suppliers/Delete", { "pSuppliersIDs": GetAllSelectedIDsAsString('tblSuppliers') }, function () {
                                Suppliers_LoadingWithPaging(
                                    //this is callback in Suppliers_LoadingWithPaging
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
function Suppliers_FillControls(pID, pDontLoadTable) {
    //Suppliers_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/Suppliers/CheckRow", { 'pID': pID }, function () {
        // Fill All Modal Controls
        var tr = $("tr[ID='" + pID + "']");
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
        $("#slSupplierCreditorGroupID").attr("disabled", "disabled");
        $("#btnCopyFromMainAddress").removeClass("hide");
        $("#btnAddressSave").removeClass("hide");
        $("#btnAddressSaveandNew").removeClass("hide");
        $("#slAddressTypes").parent().removeClass("hide");
    } else {
        $("#slSupplierCreditorGroupID").removeAttr("disabled");
    }
        $("#hSupplierID").val(pID);

        $("#slSupplierSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slSupplierAccount', 'slSupplierSubAccountGroup', 'slSupplierSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slSupplierAccount").val($(tr).find("td.AccountID").text());

        //FillSlSubAccount('slSupplierSubAccount', 'slSupplierAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();
        $("#slSupplierSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

        $("#slSupplierCostCenter").val($(tr).find("td.CostCenterID").text());

        let b = ($(tr).find("td.BranchID").text() == 0 ? "" : $(tr).find("td.BranchID").text());
        let c = ($(tr).find("td.CreditorGroupID").text() == 0 ? "" : $(tr).find("td.CreditorGroupID").text());
        let s = ($(tr).find("td.SalesmanID").text() == 0 ? "" : $(tr).find("td.SalesmanID").text());

        CallGETFunctionWithParameters("/api/Suppliers/LoadSuppliersModalComboBoxes", { pDummy: true }, function (pData) {
            FillListFromObject(b, 2, TranslateString("SelectFromMenu"), "slSupplierBranchID", pData[0], null);
            FillListFromObject(c, 2, TranslateString("SelectFromMenu"), "slSupplierCreditorGroupID", pData[1], null);
            FillListFromObject(s, 2, TranslateString("SelectFromMenu"), "slSupplierSalesmanID", pData[2], null);
        }, null, false);

        $("#txtSupplierCRM_Code").val($(tr).find("td.CRM_Code").text());

        if ($(tr).find("td.SubAccountID").text() == 0) {
            $("#slSupplierAccount").removeAttr("disabled");
            $("#slSupplierSubAccountGroup").removeAttr("disabled");
        }
        else {
            $("#slSupplierAccount").attr("disabled", "disabled");
            $("#slSupplierSubAccountGroup").attr("disabled", "disabled");
        }
        if ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0) {
            $("#txtSupplierName").removeAttr("disabled");
            $("#txtSupplierLocalName").removeAttr("disabled");
        }
        else {
            $("#txtSupplierName").attr("disabled", "disabled");
            $("#txtSupplierLocalName").attr("disabled", "disabled");
        }
        if (pDefaults.IsERP) {
            SupplierSL_SalesMan_LoadingWithPagingForModal(pID);
        }
        //the next 6 lines are to set the slSupplierPaymentTerms, slSupplierCurrencies and slSupplierTaxeTypes to the value entered before
        var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
        Supplier_PaymentTerms_GetList(pPaymentTermID, null);
        var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
        Supplier_Currencies_GetList(pCurrencyID, null);
        var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
        Supplier_TaxeTypes_GetList(pTaxeTypeID, null);

        //the next line is to get the Supplier addresses and Contacts info (PartnerTypeID for Suppliers is 8)
        Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
        Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
        PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
        debugger;
        $("#tblUploadedFiles_Suppliers tbody").html("");
    
        $("#lblSupplierShown").html(": " + $(tr).find("td.Name").text());
        $("#txtSupplierCode").val($(tr).find("td.Code").text());
        $("#txtSupplierName").val($(tr).find("td.Name").text());
        $("#txtSupplierLocalName").val($(tr).find("td.LocalName").text());
        $("#txtSupplierWebsite").val($(tr).find("td.Website").text());
        $("#btnSupplierVisitWebsite").attr('href', 'http://' + $("#txtSupplierWebsite").val());
    $("#cbSupplierIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#cbisAuthority").prop('checked', $(tr).find('td.isAuthority').find('input').attr('val'));

        $("#txtSupplierNotes").val($(tr).find("td.Notes").text());
        $("#txtSupplierVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbSupplierIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val')).change();
    $("#txtTaxExemptFromDate").val($(tr).find("td.TaxExemptFromDate").text());
    $("#txtTaxExemptToDate").val($(tr).find("td.TaxExemptToDate").text());
        $("#txtSupplierBankName").val($(tr).find("td.BankName").text());
        $("#txtSupplierBankAddress").val($(tr).find("td.BankAddress").text());
        $("#txtSupplierSwift").val($(tr).find("td.Swift").text());
        $("#txtSupplierBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
        $("#txtSupplierIBANNumber").val($(tr).find("td.IBANNumber").text());
        $("#txtSites").val($(tr).find("td.Sites").text());
        $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());
        $("#txtSupplierPhonesAndFaxes").val($(tr).find("td.PhonesAndFaxes").text() == "0" ? "" : $(tr).find("td.PhonesAndFaxes").text());

        Suppliers_GeneralUpload_Initialise();

        //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
        //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
        if (pDontLoadTable != null && pDontLoadTable != undefined) {
            $("#btnSaveSupplier").attr("onclick", "Suppliers_Update(false, pDontLoadTable);");
            $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Update(true, pDontLoadTable);");
        }
        else {
            $("#btnSaveSupplier").attr("onclick", "Suppliers_Update(false);");
            $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Update(true);");
        }

        //to set the wizard to BasicData
        $("#stepsBasicDataSupplier").parent().children().removeClass("active");
        $("#stepsBasicDataSupplier").addClass("active");
        $("#BasicDataSupplier").parent().children().removeClass("active");
        $("#BasicDataSupplier").addClass("active");
        //to hide Contacts and Addresses tabs in case of partner is not saved yet
        Suppliers_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
function Suppliers_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtSupplierCode", "txtSupplierName", "txtSupplierLocalName", "txtSupplierWebsite", "txtSupplierNotes", "txtSupplierVATNumber", "txtSupplierBankName", "txtSupplierBankAddress", "txtSupplierSwift", "txtSupplierBankAccountNumber", "txtSupplierIBANNumber"),
    //    new Array("slSupplierPaymentTerms", "slSupplierCurrencies", "slSupplierTaxeTypes"), new Array("cbSupplierIsInactive", "cbSupplierIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $("#SupplierModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#SupplierModal").addClass("hide");" in Quotations.js
    ClearAll("#SupplierModal", null);
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
        $("#slSupplierCreditorGroupID").removeAttr("disabled");
        $("#btnCopyFromMainAddress").addClass("hide");
        $("#btnAddressSave").addClass("hide");
        $("#btnAddressSaveandNew").addClass("hide");
        $("#slAddressTypes").parent().addClass("hide");
        PartnerTypeID = 0;
        Addresses_ClearAllControls();
    } else {
        $("#slSupplierCreditorGroupID").attr("disabled", "disabled");
    }
    
    $("#slSupplierAccount").removeAttr("disabled");
    $("#slSupplierSubAccountGroup").removeAttr("disabled");

    $("#slSupplierAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSupplierSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    $("#txtSupplierName").removeAttr("disabled");
    $("#txtSupplierLocalName").removeAttr("disabled");
    
    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnSupplierVisitWebsite").attr('href', 'http://');
    $("#bodySupplierAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodySupplierPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodySupplierContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    Supplier_PaymentTerms_GetList(null, null);
    Supplier_Currencies_GetList(null, null);
    Supplier_TaxeTypes_GetList(null, null);
    //EOF for AddressModal
    debugger;

    //this 2nd flag in Suppliers_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveSupplier").attr("onclick", "Suppliers_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Insert(true, " + pDontLoadTable + ");");
        LoadSuppliersModalComboBoxes();
    }
    else {
        $("#btnSaveSupplier").attr("onclick", "Suppliers_Insert(false);");
        $("#btnSaveandNewSupplier").attr("onclick", "Suppliers_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataSupplier").parent().children().removeClass("active");
    $("#stepsBasicDataSupplier").addClass("active");
    $("#BasicDataSupplier").parent().children().removeClass("active");
    $("#BasicDataSupplier").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Suppliers_ShowHideTabs();
    ShowTaxExemptDate();
}
function Suppliers_SetWebSiteHref() {
    $("#btnSupplierVisitWebsite").attr('href', 'http://' + $("#txtSupplierWebsite").val());
}
function Suppliers_ShowHideTabs() {
    if ($("#txtSupplierCode").val() == "") {
        $("#stepsContactsSupplier").addClass('hide');
        if (pDefaults.UnEditableCompanyName != "LATT" && pDefaults.UnEditableCompanyName != "LAT")
            $("#stepsAddressesSupplier").addClass('hide');
        $("#stepsPartnersBanksSupplier").addClass('hide');
        $("#stepsUploadFilesSupplier").addClass('hide');
        $(".classSL_SalesManOption").addClass("hide");
        $("#stepsSL_SalesMan").addClass('hide');
        //if (pDefaults.IsERP == false) {
        //    $(".classSL_SalesManOption").addClass("hide");
        //    $("#stepsSL_SalesMan").addClass('hide');

        //}
        //else {
        //    $(".classSL_SalesManOption").addClass("hide");
        //    $("#stepsSL_SalesMan").addClass('hide');
           

        //}
    }
    else {
        $("#stepsContactsSupplier").removeClass('hide');
        $("#stepsAddressesSupplier").removeClass('hide');
        $("#stepsPartnersBanksSupplier").removeClass('hide');
        if (glbCallingControl == "Suppliers")
            $("#stepsUploadFilesSupplier").removeClass('hide');

        if (pDefaults.IsERP == false) {
            $(".classSL_SalesManOption").addClass("hide");
            $("#stepsSL_SalesMan").addClass('hide');

        }
        else {
            $(".classSL_SalesManOption").removeClass("hide");
            $("#stepsSL_SalesMan").removeClass('hide');

        }
    }
    if ($("#hDefaultUnEditableCompanyName").val() == "GBL") {
        $(".classShowForGBL").removeClass("hide");
    }

}
function Supplier_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slSupplierPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
function Supplier_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slSupplierCurrencies", " WHERE 1=1 ORDER BY Code ");
}
function Supplier_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slSupplierTaxeTypes");
}
/////////////////////////////////////////////////////////////////////////////////////////////

//*********************************Uploaded Files***************************************//
function Suppliers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Suppliers";
    glbGeneralUploadFolderName = $("#hSupplierID").val() == "" ? "" : $("#txtSupplierName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Suppliers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Suppliers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Suppliers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Suppliers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Suppliers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
function SupplierSL_SalesMan_Insert(pSaveandAddNew) {
    debugger;
    if ($('#slSupplierSL_SalesMan').val() == "0" || $('#slSupplierSL_SalesMan').val() == "")
        swal("Sorry", "Please Choose SalesMan.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/SupplierSL_SalesMan/CheckIfItemFound",
            data: { pSalesManID: $("#slSupplierSL_SalesMan").val(), pSupplierID: $("#hSupplierID").val(), pID: -1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/SupplierSL_SalesMan/Insert"
                        , {
                            pSupplierID: $("#hSupplierID").val()
                            , psalesmanID: $('#slSupplierSL_SalesMan').val()
                            , pPercentage: $('#txtSupplierPercentage').val().trim() == "" ? "0" : $('#txtSupplierPercentage').val().trim()
                            , pIsDefault: $("#cbIsDefault").prop('checked')
                        }, pSaveandAddNew, "SupplierSL_SalesManModal"
                        , function () {
                            SupplierSL_SalesMan_LoadingWithPagingForModal($("#hSupplierID").val());
                            if (pSaveandAddNew)
                                SupplierSL_SalesMan_ClearAllControls();
                        });


                }
            }
        });
    }
}
function SupplierSL_SalesMan_Update(pSaveandAddNew) {
    debugger;
    if ($('#slSupplierSL_SalesMan').val() == "0" || $('#slSupplierSL_SalesMan').val() == "")
        swal("Sorry", "Please check dates order.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/SupplierSL_SalesMan/CheckIfItemFound",
            data: { pSalesManID: $("#slSupplierSL_SalesMan").val(), pSupplierID: $("#hSupplierID").val(), pID: $("#hSupplierSL_SalesManID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/SupplierSL_SalesMan/Update"
                        , {
                            pID: $("#hSupplierSL_SalesManID").val()
                            , pSupplierID: $("#hSupplierID").val()
                            , psalesmanID: $('#slSupplierSL_SalesMan').val()
                            , pPercentage: $('#txtSupplierPercentage').val().trim() == "" ? "0" : $('#txtSupplierPercentage').val().trim().toUpperCase()
                            , pIsDefault: $("#cbIsDefault").prop('checked')

                        }, pSaveandAddNew, "SupplierSL_SalesManModal"
                        , function () {
                            SupplierSL_SalesMan_LoadingWithPagingForModal($("#hSupplierID").val());
                            if (pSaveandAddNew)
                                SupplierSL_SalesMan_ClearAllControls();
                        });

                }
            }
        });


    }
}
function SupplierSL_SalesMan_Delete() {
    debugger;
    var pCustomerNetworkIDs = GetAllSelectedIDsAsString('tblSupplierSL_SalesMan');
    //Confirmation message to delete
    if (pCustomerNetworkIDs != "")
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
                DeleteListFunction("/api/SupplierSL_SalesMan/Delete", { "pSupplierSL_SalesManIDs": pCustomerNetworkIDs }, function () {
                    //CustomerNetwork_LoadAll($("#hAirlineID").val());
                    SupplierSL_SalesMan_LoadingWithPagingForModal($("#hID").val());
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}
function SupplierSL_SalesManLoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hSupplierID").val();
    strLoadWithPagingFunctionName = "/api/SupplierSL_SalesMan/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerNetwork_BindTableRows";
    var pWhereClause = " WHERE SupplierID = " + pID;
    pWhereClause += ($("#txtSupplierSL_SalesManSearch").val().trim() == "" || $("#txtSupplierSL_SalesManSearch").val() == undefined
        ? ""
        : " AND SalesMan LIKE '%" + $("#txtCustomerNetworkSearch").val().trim() + "%'");
    var pOrderBy = " SalesMan ";
    LoadWithPagingForModal("/api/SupplierSL_SalesMan/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            SupplierSL_SalesMan_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}
/**********************Customer Network****************************/
function SupplierSL_SalesMan_BindTableRows(pCustomerNetwork) {
    debugger;
    //ClearAllTableRows("tblCustomerNetwork");
    $("#tblSupplierSL_SalesMan tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomerNetwork, function (i, item) {
        AppendRowtoTable("tblSupplierSL_SalesMan",
            ("<tr ID='" + item.ID + "' ondblclick='SupplierSL_SalesMan_FillControls(" + item.ID + ");'>"
                //("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='SupplierID hide'>" + item.SupplierID + "</td>"
                + "<td class='salesmanID hide'>" + item.salesmanID + "</td>"
                + "<td class='SalesMan'>" + item.SalesMan + "</td>"
                + "<td class='Percentage'>" + item.Percentage + "</td>"

                + "<td class='isDefault'> <input type='checkbox' disabled='disabled' val='" + (item.isDefault == true ? "true' checked='checked'" : "'") + " /></td>"

                //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                + "<td class='hide'><a href='#SupplierSL_SalesManModal' data-toggle='modal' onclick='SupplierSL_SalesMan_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblSupplierSL_SalesMan", "ID", "cb-CheckAll-SupplierSL_SalesMan");
    CheckAllCheckbox("HeaderDeletetblSupplierSL_SalesManID");
    HighlightText("#tblSupplierSL_SalesMan>tbody>tr", $("#txtSupplierSL_SalesManSearch").val().trim());
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function SupplierSL_SalesMan_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Customers_BindTableRows";
}
function SupplierSL_SalesMan_ClearAllControls() {
    debugger;
    ClearAll("#SupplierSL_SalesManModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblSupplierSL_SalesManShown").html($("#lblCustomerShown").html());
    Supplier_SL_SalesMan_GetList(null, null);
    $("#btnSaveSupplierSL_SalesMan").attr("onclick", "SupplierSL_SalesMan_Insert(false);");
    $("#btnSaveandNewSupplierSL_SalesMan").attr("onclick", "SupplierSL_SalesMan_Insert(true);");

}
function SupplierSL_SalesMan_FillControls(pSupplierSL_SalesManID) {
    debugger;
    ClearAll("#SupplierSL_SalesManModal", null);
    jQuery("#SupplierSL_SalesManModal").modal("show");
    $("#hSupplierSL_SalesManID").val(pSupplierSL_SalesManID);
    var tr = $("#tblSupplierSL_SalesMan tbody tr[ID='" + pSupplierSL_SalesManID + "']");
    var psalesmanID = $(tr).find("td.salesmanID").text();
    $("#lblSupplierSL_SalesManShown").html($("#lblCustomerShown").html());
    Supplier_SL_SalesMan_GetList(psalesmanID, null);
    $("#txtSupplierPercentage").val($(tr).find("td.Percentage").text());
    $("#cbIsDefault").prop('checked', $(tr).find('td.isDefault').find('input').attr('val'));

    $("#btnSaveSupplierSL_SalesMan").attr("onclick", "SupplierSL_SalesMan_Update(false);");
    $("#btnSaveandNewSupplierSL_SalesMan").attr("onclick", "SupplierSL_SalesMan_Update(true);");
}
function SupplierSL_SalesMan_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hSupplierID").val();
    strLoadWithPagingFunctionName = "/api/SupplierSL_SalesMan/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "SupplierSL_SalesMan_BindTableRows";
    var pWhereClause = " WHERE SupplierID = " + pID;
    pWhereClause += ($("#txtSupplierSL_SalesManSearch").val().trim() == "" || $("#txtSupplierSL_SalesManSearch").val() == undefined
        ? ""
        : " AND SalesMan LIKE '%" + $("#txtSupplierSL_SalesManSearch").val().trim() + "%'");
    var pOrderBy = "SalesMan ";
    LoadWithPagingForModal("/api/SupplierSL_SalesMan/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            SupplierSL_SalesMan_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}
function Supplier_SL_SalesMan_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/SL_SalesMan/LoadAll", "Select SalesMan", "slSupplierSL_SalesMan", "where 1=1", null)
}



//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Suppliers_onFileSelected(event, pBtnName) {
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
                    Suppliers_ImportFromExcelFile(oJS, pBtnName);
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

function Suppliers_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Suppliers Name List from DB
    var ExistingSuppliersNameList;
    var ExistingSuppliersNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/Suppliers/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingSuppliersNameList = JSON.parse(pData[0]);
                ExistingSuppliersNameArray = ExistingSuppliersNameList.map(item => item.Name);


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
                        if (ExistingSuppliersNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Suppliers ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/Suppliers/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        Suppliers_LoadingWithPaging();
                    }, null);


                }



                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);




}
//******************************EOF Reading Excel Files***************************************//;

function LoadSuppliersModalComboBoxes() {
    debugger;
    CallGETFunctionWithParameters("/api/Suppliers/LoadSuppliersModalComboBoxes", {pDummy: true}, function (pData) {
        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSupplierBranchID", pData[0], null);
        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSupplierCreditorGroupID", pData[1], null);
        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slSupplierSalesmanID", pData[2], null);
    }, null);
}

function ShowTaxExemptDate() {
    if (pDefaults.UnEditableCompanyName != 'SSH')
        return;
    if ($('#cbSupplierIsConsolidatedInvoice').is(':checked')) {
        $('.TaxExempt').removeClass('hide');
    }
    else {
        $('.TaxExempt').addClass('hide');
        $('#txtTaxExemptFromDate,#txtTaxExemptToDate').val('');
    }
}