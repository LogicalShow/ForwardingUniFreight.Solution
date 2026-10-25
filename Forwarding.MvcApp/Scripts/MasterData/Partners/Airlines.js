//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Airlines Region ---------------------------------------------------------------
// Bind Airlines Table Rows
var intPartnerTypeID = 6;
function Airlines_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Airlines/LoadWithPaging";

    LoadView("/MasterData/Airlines", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalAirlines", "div-content", function () {
            if (pDefaults.UnEditableCompanyName == "SAF") {
                $(".classMandatoryForSAF").attr("data-required", "true");
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
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountGroup", pSupplierGroup, null);
                    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                }
               , null);
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalPartnersBanks", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalMAWBStock", "div-content", null, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalSelectCharges", "div-content", function () { $("#slPayableCurrency").html($("#hReadySlCurrencies").html()); $("#slReceivableCurrency").html($("#hReadySlCurrencies").html()); }, null, null, true);//sherif: calling a partial view with only modal called from different places
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/MAWBStock.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { Airlines_BindTableRows(pTabelRows); });

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { Airlines_ClearAllControls(); },
        function () { Airlines_DeleteList(); });
}
function Airlines_BindTableRows(pAirlines) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblAirlines");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pAirlines, function (i, item) {
        debugger;
        AppendRowtoTable("tblAirlines",
            ("<tr ID='" + item.ID + "' ondblclick='Airlines_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='ICAO'>" + (item.ICAO == 0 ? "" : item.ICAO) + "</td>"
                    + "<td class='Code'>" + (item.Code == 0 ? "" : item.Code) + "</td>" //code is the IATA Code
                    + "<td class='Prefix'>" + item.Prefix + "</td>"
                    + "<td class='AccountNumber hide'>" + (item.AccountNumber == 0 ? "" : item.AccountNumber) + "</td>"
                    + "<td class='Website hide'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
                    + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                    + "<td class='IsCheckDigit hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsCheckDigit == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsLimitedLength hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLimitedLength == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='VATNumber hide'>" + (item.VATNumber == 0 ? "" : item.VATNumber) + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + (item.TaxeTypeCode == 0 ? "" : item.TaxeTypeCode) + "</td>"
                    + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='crmCode hide'>" + (item.crmCode == 0 ? "" : item.crmCode) + "</td>"
                    + "<td class='Finance365Ref hide'>" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"
                    + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='TaxExemptFromDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptFromDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptFromDate))) + "</td>"
                + "<td class='TaxExemptToDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TaxExemptToDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TaxExemptToDate))) + "</td>"

                + "<td class='BankName hide'>" + (item.BankName == 0 ? "" : item.BankName) + "</td>"
                    + "<td class='BankAddress hide'>" + (item.BankAddress == 0 ? "" : item.BankAddress) + "</td>"
                    + "<td class='Swift hide'>" + (item.Swift == 0 ? "" : item.Swift) + "</td>"
                    + "<td class='BankAccountNumber hide'>" + (item.BankAccountNumber == 0 ? "" : item.BankAccountNumber) + "</td>"
                    + "<td class='IBANNumber hide'>" + (item.IBANNumber == 0 ? "" : item.IBANNumber) + "</td>"

                    + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                    + "<td class='AccountName hide'>" + (item.AccountName == 0 ? "" : item.AccountName) + "</td>"
                    + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                    + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                    + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                    + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                    + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                    + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                    + "<td class='hide'><a href='#AirlineModal' data-toggle='modal' onclick='Airlines_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblAirlines", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblAirlines>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Airlines_EditByDblClick(pID) {
    jQuery("#AirlineModal").modal("show");
    Airlines_FillControls(pID);
}
// Loading with data
function Airlines_LoadingWithPaging() {
    debugger;

    var pWhereClause = 'where 1=1';

    if ($("#txt-Search").val().trim() != "") {
        let pSearchKey = $("#txt-Search").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }

    if ($('#slFilterCountry').val() > 0) {
        pWhereClause += " and ID in (select PartnerID from Addresses where PartnerTypeID=" + intPartnerTypeID+" and CountryID=" + $('#slFilterCountry').val() + ")";
        $('#slFilterCountry').val(-1).change();
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Airlines/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Airlines_BindTableRows(pTabelRows); Airlines_ClearAllControls(); });
    HighlightText("#tblAirlines>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Airlines_Insert(pSaveandAddNew) {
    debugger;
    MAWBStock_ResetFunctionsNames();
    InsertUpdateFunction("form", "/api/Airlines/Insert"
        , {
            pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pCode: $("#txtCode").val().trim()
            , pICAO: $("#txtICAO").val().trim()
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pPrefix: $("#txtPrefix").val().trim()
            , pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim())
            , pAccountNumber: ($("#txtAccountNumber").val() == null ? "" : $("#txtAccountNumber").val().trim())
            , pIsCheckDigit: $("#cbIsCheckDigit").prop('checked')
            , pIsLimitedLength: $("#cbIsLimitedLength").prop('checked')
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pcrmCode: ($("#txtcrmCode").val() == null || $("#txtcrmCode").val() == "" ? "0" : $("#txtcrmCode").val().trim())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim())
            , pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim())
            , pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim())
            , pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
        }, pSaveandAddNew, "AirlineModal", function () { Airlines_LoadingWithPaging(); });
}
function Airlines_Update(pSaveandAddNew) {
    MAWBStock_ResetFunctionsNames();
    InsertUpdateFunction("form", "/api/Airlines/Update"
        , {
            pID: $("#hAirlineID").val()
            , pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
            , pCode: $("#txtCode").val().trim()
            , pICAO: $("#txtICAO").val().trim()
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pPrefix: $("#txtPrefix").val().trim()
            , pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim())
            , pAccountNumber: ($("#txtAccountNumber").val() == null ? "" : $("#txtAccountNumber").val().trim())
            , pIsCheckDigit: $("#cbIsCheckDigit").prop('checked')
            , pIsLimitedLength: $("#cbIsLimitedLength").prop('checked')
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pcrmCode: ($("#txtcrmCode").val() == null || $("#txtcrmCode").val() == "" ? "0" : $("#txtcrmCode").val().trim())
            , pFinance365Ref: ($("#txtFinance365Ref").val() == null || $("#txtFinance365Ref").val() == "" ? "0" : $("#txtFinance365Ref").val().trim())
            , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked')
            , pTaxExemptFromDate: ($("#txtTaxExemptFromDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptFromDate").val().trim()))
            , pTaxExemptToDate: ($("#txtTaxExemptToDate").val().trim() == "" ? "01/01/1900" : ConvertDateFormat($("#txtTaxExemptToDate").val().trim()))
            , pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim())
            , pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim())
            , pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim())
            , pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
        }, pSaveandAddNew, "AirlineModal", function () { Airlines_LoadingWithPaging(); });
}
function Airlines_UnlockRecord() {
    debugger;
    UnlockFunction("/api/Airlines/UnlockRecord",
        { pID: $("#hAirlineID").val() },
        "AirlineModal",
        function () { MAWBStock_ResetFunctionsNames(); Airlines_LoadingWithPaging(); }); //the callback function
}
//function Airlines_Delete(pID) {
//    DeleteListFunction("/api/Airlines/DeleteByID", { "pID": pID }, function () { Airlines_LoadingWithPaging(); });
//}
function Airlines_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblAirlines') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblAirlines');
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
                            DeleteListFunction("/api/Airlines/Delete", { "pAirlinesIDs": GetAllSelectedIDsAsString('tblAirlines') }, function () {
                                Airlines_LoadingWithPaging(
                                    //this is callback in Airlines_LoadingWithPaging
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
function Airlines_FillControls(pID) {
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

        $("#hAirlineID").val(pID);
        $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
        FillSlAccountFromGroup('slAccount', 'slSubAccountGroup', 'slSubAccount', $(tr).find("td.SubAccountGroupID").text(), $(tr).find("td.AccountID").text());
        //$("#slAccount").val($(tr).find("td.AccountID").text());

        //FillSlSubAccount('slSubAccount', 'slAccount', $(tr).find("td.SubAccountID").text(), $(tr).find("td.AccountID").text());
        var pSubAccountID = $(tr).find("td.SubAccountID").text();
        $("#slSubAccount").html('<option value=' + pSubAccountID + '>' + (pSubAccountID == 0 ? 'AUTO GENERATED' : $(tr).find("td.SubAccountName").text()) + '</option>');

        $("#slCostCenter").val($(tr).find("td.CostCenterID").text());

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

        $("#tblAirLinePayables tbody").html("");

        //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
        var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
        PaymentTerms_GetList(pPaymentTermID, null);
        var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
        Currencies_GetList(pCurrencyID, null);
        var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
        TaxeTypes_GetList(pTaxeTypeID, null);

        //the next line is to get the Airline addresses and Contacts info
        Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
        Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
        PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
        //MAWBStock_LoadAll(pID);
        MAWBStock_LoadingWithPagingForModal(pID);
        debugger;

        TypeOfStock_GetList(null, null);
        AirLinePayables_LoadWithPagingWithWhereClause(pID);
        $("#tblUploadedFiles_Airlines tbody").html("");

        $("#lblShown").html(": " + $(tr).find("td.Name").text());
        $("#txtICAO").val($(tr).find("td.ICAO").text());
        $("#txtCode").val($(tr).find("td.Code").text()); //holds the IATA Code
        $("#txtName").val($(tr).find("td.Name").text());
        $("#txtLocalName").val($(tr).find("td.LocalName").text());
        $("#txtPrefix").val($(tr).find("td.Prefix").text());
        $("#txtWebsite").val($(tr).find("td.Website").text());
        $("#txtAccountNumber").val($(tr).find("td.AccountNumber").text());
        $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
        $("#cbIsCheckDigit").prop('checked', $(tr).find('td.IsCheckDigit').find('input').attr('val'));
        $("#cbIsLimitedLength").prop('checked', $(tr).find('td.IsLimitedLength').find('input').attr('val'));
        $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
        $("#txtNotes").val($(tr).find("td.Notes").text());
        $("#txtcrmCode").val($(tr).find("td.crmCode").text());
        $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());
    $("#txtVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val')).change();
    $("#txtTaxExemptFromDate").val($(tr).find("td.TaxExemptFromDate").text());
    $("#txtTaxExemptToDate").val($(tr).find("td.TaxExemptToDate").text());
        $("#txtBankName").val($(tr).find("td.BankName").text());
        $("#txtBankAddress").val($(tr).find("td.BankAddress").text());
        $("#txtSwift").val($(tr).find("td.Swift").text());
        $("#txtBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
        $("#txtIBANNumber").val($(tr).find("td.IBANNumber").text());
        Airlines_GeneralUpload_Initialise();
        $("#btn-MAWBStockSearch").attr("onclick", "MAWBStock_LoadingWithPagingForModal(" + pID + ");");

        $("#btnSave").attr("onclick", "Airlines_Update(false);");
        $("#btnSaveandNew").attr("onclick", "Airlines_Update(true);");
        //to set the wizard to BasicData
        $("#stepsBasicData").parent().children().removeClass("active");
        $("#stepsBasicData").addClass("active");
        $("#BasicData").parent().children().removeClass("active");
        $("#BasicData").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet

    if (pDefaults.UnEditableCompanyName == "AKS") {
              $("#txtcrmCode").prev().text("Kinz Code");
        $("#txtFinance365Ref").prev().text("National ID");
        $("#txtcrmCode").parent().removeClass('hide');
        $("#txtcrmCode").removeAttr("disabled");

        $("#txtFinance365Ref").parent().removeClass('hide');
    }
        Airlines_ShowHideTabs();
}
function Airlines_ClearAllControls(callback) {
    //ClearAllControls(new Array("hAirlineID", "txtCode", "txtName", "txtLocalName", "txtWebsite", "txtNotes", "txtVATNumber", "txtBankName", "txtBankAddress", "txtSwift", "txtBankAccountNumber", "txtIBANNumber"),
    //    new Array("slPaymentTerms", "slCurrencies", "slTaxeTypes"), new Array("cbIsInactive", "cbIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    $(".classAccountingOption").addClass("hide");
    ClearAll("#AirlineModal", null);
    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnVisitWebsite").attr('href', 'http://');
    $("#bodyAirlineAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyAirlinePartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyAirlineContacts").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#tblAirLinePayables tbody").html("");

    //for AddressModal
    PaymentTerms_GetList(null, null);
    Currencies_GetList(null, null);
    TaxeTypes_GetList(null, null);
    //EOF for AddressModal
    debugger;

    $("#btnSave").attr("onclick", "Airlines_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "Airlines_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    if (pDefaults.UnEditableCompanyName == "AKS") {
        $("#txtcrmCode").prev().text("Kinz Code");
        $("#txtFinance365Ref").prev().text("National ID");
        $("#txtcrmCode").parent().removeClass('hide');
        $("#txtFinance365Ref").parent().removeClass('hide');
        $("#txtcrmCode").removeAttr("disabled");

    }
    Airlines_ShowHideTabs();
    ShowTaxExemptDate();
}
//Set the btnVisitWebsite href
function Airlines_SetWebSiteHref() {
    $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function Airlines_ShowHideTabs() {
    if ($("#txtCode").val() == "") {
        $("#stepsContacts").addClass('hide');
        $("#stepsAddresses").addClass('hide');
        $("#stepsMAWBStock").addClass('hide');
        $("#stepsPartnersBanks").addClass('hide');
    }
    else {
        $("#stepsContacts").removeClass('hide');
        $("#stepsAddresses").removeClass('hide');
        $("#stepsMAWBStock").removeClass('hide');
        $("#stepsPartnersBanks").removeClass('hide');
    }
}
// Fill PaymentTerms select box
function PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
// Fill Currencies select box
function Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slCurrencies", " WHERE 1=1 ORDER BY Code ");
}
// Fill TaxeTypes select box
function TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slTaxeTypes");
}

/////////////////////////////////////////////////////////////////////////////////////////////
function TypeOfStock_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    //GetListTypeOfStockWithNamsAttr(pID, "/api/TypeOfStock/TypeOfStock_LoadAll", "Select Type Of Stock", "SlSTypeOfStock", " WHERE 1=1 ORDER BY Code ", function () {
    GetListWithCodeAndWhereClause(pID, "/api/TypeOfStock/TypeOfStock_LoadAll", "Select Stock Type", "SlSTypeOfStock", " WHERE 1=1 ORDER BY Code ", function () {
        $("#slTypeOfStock").html($("#SlSTypeOfStock").html());
    });
}

/***************************For Venus(or air agents)****************************/
function AirPayables_BindTableRows(pPayables) {
    debugger;
    ClearAllTableRows("tblPayablesAWB");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var OtherChargesDueCarrier = 0;
    var TaxCode_SH = 0;
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblPayablesAWB",
        ("<tr ID='" + item.ID + "' " + ((OEPay || OEBLD) && $("#hIsOperationDisabled").val() == false && !item.IsApproved && item.AccNoteID == 0 ? (" ondblclick='AirPayables_EditByDblClick(" + item.ID + ");'") : "") + (item.IsApproved ? " class='text-primary' " : "") + ">"
                    + "<td class='PayableID'> <input " + (/*item.SupplierInvoiceNo == 0 &&*/ !item.IsApproved && item.AccNoteID == 0 ? "name='Delete'" : "disabled='disabled'") + " type='checkbox' value='" + item.ID + "'></td>"
                    //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + "</td>"
                    + "<td class='PayablePOrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
                    //the next line its PartnerSupplierID comes from table OperationPartners
                    + "<td class='PayableSupplier hide' val='" + item.SupplierOperationPartnerID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
                    //+ ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ("<td class='PayableUOM' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeCode == 0 ? "" : item.ContainerTypeCode) + "</td>") : "")
                    //+ ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='PayableUOM' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                    + "<td class='PayableUOM hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='PayableQuantity hide'>" + item.Quantity + "</td>"
                    + "<td class='PayableCostPrice'>" + item.CostPrice.toFixed(2) + "</td>"

                    + "<td class='PayableAmountWithoutVAT hide'>" + (item.AmountWithoutVAT == 0 ? "" : item.AmountWithoutVAT) + "</td>"
                    + "<td class='PayableTaxTypeID hide' val=" + item.TaxTypeID + ">" + (item.TaxTypeID == 0 ? "" : item.TaxTypeName) + "</td>"
                    + "<td class='PayableTaxPercentage hide'>" + item.TaxPercentage + "</td>"
                    + "<td class='PayableTaxAmount hide'>" + item.TaxAmount + "</td>"
                    + "<td class='PayableDiscountTypeID hide' val=" + item.DiscountTypeID + ">" + (item.DiscountTypeID == 0 ? "" : item.DiscountTypeName) + "</td>"
                    + "<td class='PayableDiscountPercentage hide'>" + item.DiscountPercentage + "</td>"
                    + "<td class='PayableDiscountAmount hide'>" + item.DiscountAmount + "</td>"

                    + "<td class='PayableCostAmount hide'>" + item.CostAmount.toFixed(2) + "</td>" //TotalAmount
                    + "<td class='PayableInitialSalePrice hide'>" + (item.InitialSalePrice == 0 ? "" : item.InitialSalePrice.toFixed(2)) + "</td>"
                    + "<td class='PayableSupplierInvoiceNo hide'>" + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + "</td>"
                    + "<td class='PayableSupplierReceiptNo hide'>" + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + "</td>"
                    + "<td class='PayableEntryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) : "") + "</td>"
                    + "<td class='PayableBillID hide' val='" + item.BillID + "'>" + (item.BillID == 0 ? "" : item.BillID) + "</td>"
                    + "<td class='PayableExchangeRate hide'>" + item.ExchangeRate.toFixed(2) + "</td>"
                    + "<td class='PayableCurrency hide' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='PayablePaidAmount hide'>" + item.PaidAmount + "</td>"
                    + "<td class='PayableCustodyID hide' val=" + item.CustodyID + ">" + (item.CustodyID == 0 ? "" : item.CustodyName) + "</td>"
                    + "<td class='PayableAccNote hide' val='" + item.AccNoteID + "'>" + (item.AccNoteID == 0 ? "" : item.AccNoteCode) + "</td>"
                    + "<td class='PayableOperation hide' val='" + item.OperationID + "'>" + (item.OperationID == 0 ? "" : item.OperationCode) + "</td>"
                    + "<td class='PayableNotes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
                    + "<td class='PayableCreatorName hide'>" + item.CreatorName + "</td>"
                    //+ "<td class='PayableCreationDate hide'>" + item.CreationDate + "</td>"
                    + "<td class='PayableCreationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.CreationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='PayableModificatorName hide'>" + item.ModificatorName + "</td>"
                    //+ "<td class='PayableModificationDate hide'>" + item.ModificationDate + "</td>"
                    + "<td class='PayableModificationDate hide'>" + "<span class='pull-left thumb-sm  calendar-icon-style'>"
                                              + " <i class='fa fa-calendar'></i>"
                                              //+ " <small class='text-muted'>" + ConvertDateFormat(GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + " <small>" + GetShownDate(FormattedTodaysDate, GetDateWithFormatMDY(item.ModificationDate)) + "</small>"
                                              + "</span>"
                                              + "</td>"
                    + "<td class='hide'><a href='#EditAWBPayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        OtherChargesDueCarrier = item.ChargeTypeCode.toUpperCase() == "SH" ? OtherChargesDueCarrier + 0 : OtherChargesDueCarrier + Number(item.CostPrice.toFixed(2));
        TaxCode_SH = item.ChargeTypeCode.toUpperCase() == "SH" ? TaxCode_SH + Number(item.CostPrice.toFixed(2)) : TaxCode_SH + 0;
    });
    $("#txtOtherChargesDueCarrier").val(OtherChargesDueCarrier);
    $("#txtTax").val(TaxCode_SH);
    //ApplyPermissions();
    if ((OAPay || OABLD) && $("#hIsOperationDisabled").val() == false) { $("#btn-AddAWBPayables").removeClass("hide");/* $("#btn-GenerateDefaultPayables").removeClass("hide");*/ /*$("#btn-GeneratePayablesFromQuotation").removeClass("hide");*/ }
    else { $("#btn-AddAWBPayables").addClass("hide"); /*$("#btn-GenerateDefaultPayables").addClass("hide");*/ /*$("#btn-GeneratePayablesFromQuotation").addClass("hide");*/ }
    if ((ODPay || ODBLD) && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteAWBPayable").removeClass("hide"); else $("#btn-DeleteAWBPayable").addClass("hide");
    /*if ((OEPay || OEBLD) && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");*/
    BindAllCheckboxonTable("tblPayablesAWB", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeleteAWBPayableID");
    HighlightText("#tblPayablesAWB>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function AirLinePayables_BindTableRows(pPayables) {
    debugger;
    ClearAllTableRows("tblAirLinePayables");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var OtherChargesDueCarrier = 0;
    var TaxCode_SH = 0;
    $.each(pPayables, function (i, item) {

        AppendRowtoTable("tblAirLinePayables",
        ("<tr ID='" + item.ID + "' " + (" ondblclick='AirLinePayables_EditByDblClick(" + item.ID + ");'") + (item.IsApproved ? " class='text-primary' " : "") + ">"
          + "<td class='PayableID'> <input " + ("name='Delete'") + " type='checkbox' value='" + item.ID + "'></td>"
        //+ "<td class='Payable' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
          + "<td class='ChargeTypeID' val='" + item.ChargeTypeID + "'>" + item.Name + "</td>"
          + "<td class='cbIsDefault'> <input type='checkbox' id='cbIsDefault" + item.ID + "' disabled='disabled' " + (item.IsDefault == true ? " checked='checked' " : "") + " /></td>"







                    + "<td class='hide'><a href='#EditAirLinePayableModal' data-toggle='modal' onclick='Payables_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });

    //ApplyPermissions();
    if ((OAPay || OABLD) && $("#hIsOperationDisabled").val() == false) { $("#btn-AddAWBPayables").removeClass("hide");/* $("#btn-GenerateDefaultPayables").removeClass("hide");*/ /*$("#btn-GeneratePayablesFromQuotation").removeClass("hide");*/ }
    else { $("#btn-AddAWBPayables").addClass("hide"); /*$("#btn-GenerateDefaultPayables").addClass("hide");*/ /*$("#btn-GeneratePayablesFromQuotation").addClass("hide");*/ }
    if ((ODPay || ODBLD) && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteAWBPayable").removeClass("hide"); else $("#btn-DeleteAWBPayable").addClass("hide");
    /*if ((OEPay || OEBLD) && $("#hIsOperationDisabled").val() == false) $("#btn-MultiRowEditPayables").removeClass("hide"); else $("#btn-MultiRowEditPayables").addClass("hide");*/
    BindAllCheckboxonTable("tblPayablesAWB", "PayableID", "cb-CheckAll-Payables");
    CheckAllCheckbox("HeaderDeleteAWBPayableID");
    HighlightText("#tblPayablesAWB>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    //Payables_CalculateSubtotals();
    //PayablesAndReceivables_CalculateSummary();
}
function AirPayables_EditByDblClick(pID) {
    jQuery("#EditAWBPayableModal").modal("show");
    AirPayables_FillControls(pID);
}
function AirLinePayables_EditByDblClick(pID) {
    jQuery("#EditAirLinePayableModal").modal("show");
    AirLinePayables_FillControls(pID);
}
function AirPayables_LoadWithPagingWithWhereClause(pOperationID) {
    var pWhereClause = " WHERE (OperationID = " + pOperationID + " OR MasterOperationID = " + pOperationID + ") ";// + " AND IsDeleted = 0 ";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payables/LoadWithWhereClause", pWhereClause, 0, 1000, function (pTabelRows) { AirPayables_BindTableRows(pTabelRows); });
}
function AirLinePayables_LoadWithPagingWithWhereClause(pAirLineId) {
    var pAirLineWhereClause = " WHERE (AirLineId = " + pAirLineId + ") ";// + " AND IsDeleted = 0 ";
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Payables/LoadAirLineWithWhereClause", pAirLineWhereClause, 0, 1000, function (pTabelRows) { AirLinePayables_BindTableRows(pTabelRows); });
}
function AirPayables_DeleteList() {//(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblPayablesAWB') != "")
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
            DeleteListFunction("/api/Payables/Delete"
                , { pPayablesIDs: GetAllSelectedIDsAsString('tblPayablesAWB'), pOperationID: $("#hOperationID").val() }
                , function () {
                    AirPayables_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
                    OperationPartners_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
                });
        });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function AirLinePayables_DeleteList() {//(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblAirLinePayables') != "")
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
            DeleteListFunction("/api/Payables/DeleteAirlinePayables"
                , { pAirPayablesIDs: GetAllSelectedIDsAsString('tblAirLinePayables') }
                , function () {
                    AirLinePayables_LoadWithPagingWithWhereClause($("#hAirlineID").val());
                });
        });
    //DeleteListFunction("/api/Payables/Delete", { "pPayablesIDs": GetAllSelectedIDsAsString('tblPayables') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function PayablesAir_GetAvailableCharges() {
    debugger;
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , 3/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "PayablesAir_InsertListWithoutValues(false);");

    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
}
function PayablesAirLine_GetAvailableCharges() {
    debugger;
    FadePageCover(true);
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    pWhereClause += " WHERE IsUsedInPayable = 1 AND IsInactive = 0 AND IsOperationChargeType=1 ";
    //pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    //pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    //pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from Payables ";
    //pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , 3/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "PayablesAirLine_InsertList();");

    //FillPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, true //pIsInsert
    //    , function () {
    //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
    //        $("#btnSelectChargesApply").attr("onclick", "Payables_InsertListWithValues(false);");
    //    });
    //$("#btn-SearchCharges").attr("onclick", "Payables_GetAvailableCharges();");
}
function PayablesAir_InsertListWithoutValues(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithoutValues"
            , { pOperationID: $("#hShipmentAirID").val(), pSelectedIDs: pSelectedIDs, pQuotationRouteID: 0, pOperationVehicleID: 0, pTruckingOrderID: 0 }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                AirPayables_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
            });
}
function PayablesAirLine_InsertList() {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertAirLineList"
            , { pAirLineId: $("#hAirlineID").val(), pSelectedIDs: pSelectedIDs }
            , false
            , "SelectChargesModal" //pModalID
            , null //function () { Payables_GetAvailableCharges(); }
            , function () {
                AirLinePayables_LoadWithPagingWithWhereClause($("#hAirlineID").val());
            });
}
function PayablesAir_InsertListWithValues(pSaveandAddNew) {
    debugger;
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    var pPOrCList = "";
    var pSupplierList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pCostPriceList = "";
    var pCostAmountList = "";
    var pInitialSalePriceList = "";
    var pSupplierInvoiceNumberList = "";
    var pSupplierReceiptNumberList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    if (pSelectedIDs != "") {
        debugger;
        var NumberOfSelectRows = pSelectedIDs.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDs.split(",")[i];

            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slPayablePOrC" + currentRowID).val() == undefined || $("#slPayablePOrC" + currentRowID).val() == "" ? 0 : $("#slPayablePOrC" + currentRowID).val());
            pSupplierList += ((pSupplierList == "") ? "" : ",") + ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ? 0 : $("#slPayableSupplier" + currentRowID).val());
            pUOMList += ((pUOMList == "") ? "" : ",") + ($("#slPayableUOM" + currentRowID).val() == undefined || $("#slPayableUOM" + currentRowID).val() == "" ? 0 : $("#slPayableUOM" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalPayableQuantity" + currentRowID).val() == undefined || $("#txtTblModalPayableQuantity" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableQuantity" + currentRowID).val());
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalPayableCostPrice" + currentRowID).val() == undefined || $("#txtTblModalPayableCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostPrice" + currentRowID).val());
            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + ($("#txtTblModalPayableCostAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostAmount" + currentRowID).val());
            pInitialSalePriceList += ((pInitialSalePriceList == "") ? "" : ",") + ($("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == undefined || $("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableInitialSalePrice" + currentRowID).val());
            pSupplierInvoiceNumberList += ((pSupplierInvoiceNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim().toUpperCase());
            pSupplierReceiptNumberList += ((pSupplierReceiptNumberList == "") ? "" : ",") + ($("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim().toUpperCase());
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") + ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableExchangeRate" + currentRowID).val());
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") + ($("#slPayableCurrency" + currentRowID).val() == undefined || $("#slPayableCurrency" + currentRowID).val() == "" ? 0 : $("#slPayableCurrency" + currentRowID).val());
        }
        debugger;
    }
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/Payables/InsertListWithValues"
            , {
                "pOperationID": $("#hShipmentAirID").val()
                , "pSelectedIDs": pSelectedIDs
                , "pPOrCList": pPOrCList
                , "pSupplierList": pSupplierList
                , "pUOMList": pUOMList
                , "pQuantityList": pQuantityList
                , "pCostPriceList": pCostPriceList
                , "pCostAmountList": pCostAmountList
                , "pInitialSalePriceList": pInitialSalePriceList
                , "pSupplierInvoiceNumberList": pSupplierInvoiceNumberList
                , "pSupplierReceiptNumberList": pSupplierReceiptNumberList
                , "pExchangeRateList": pExchangeRateList
                , "pCurrencyList": pCurrencyList
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , function () { PayablesAir_GetAvailableCharges(); }
            , function () {
                AirPayables_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
            });
}
function PayablesAir_Update(pSaveandAddNew) {
    //if (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
    //    swal(strSorry, strCheckDates);
    //else {
    InsertUpdateFunction("form", "/api/Payables/Update", {
        pSavedFrom: 0 //pSavedFrom=10 : saved from Operations
        , pOperationContainersAndPackagesID: $("#slPayableTank").val() == "" ? 0 : $("#slPayableTank").val()
        , pID: $("#hAirPayableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        , pOperationID: $("#hShipmentAirID").val()
        , pChargeTypeID: $("#txtAirPayableType").attr("ChargeTypeID")
        , pMeasurementID: /*$('#slPayableUOM option:selected').val() != ""
                ? $('#slPayableUOM option:selected').val():*/ 0
        //, pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
        //    ? $('#slPayableUOM option:selected').val()
        //    : 0)
        , pContainerTypeID: 0
        //, pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slPayableUOM option:selected').val() != "")
        //    ? $('#slPayableUOM option:selected').val()
        //    : 0)
        , pPOrC: /*($('#slPayablePOrC option:selected').val() == "" ?*/ 0 /*: $('#slPayablePOrC option:selected').val())*/
        , pSupplierOperationPartnerID: /*($('#slPayableSupplier option:selected').val() == "" ?*/ 0 /*: $('#slPayableSupplier option:selected').val())*/
        , pQuantity: /*($("#txtPayableQuantity").val().trim() == "" ?*/ 0 /*: $("#txtPayableQuantity").val().trim())*/
        , pCostPrice: ($("#txtAirPayableUnitPrice").val().trim() == "" ? 0 : $("#txtAirPayableUnitPrice").val().trim())

        , pAmountWithoutVAT: /*$("#txtPayableAmountWithoutVAT").val() == "" ?*/ 0 /*: $("#txtPayableAmountWithoutVAT").val()*/
        , pTaxTypeID: /*$("#slPayableTax").val() == "" ?*/ 0 /*: $("#slPayableTax").val()*/
        , pTaxPercentage: /*$("#txtPayableTaxPercentage").val() == "" ?*/ 0 /*: $("#txtPayableTaxPercentage").val()*/
        , pTaxAmount: /*$("#txtPayableTaxAmount").val() == "" ?*/ 0 /*: $("#txtPayableTaxAmount").val()*/
        , pDiscountTypeID: /*$("#slPayableDiscount").val() == "" ?*/ 0 /*: $("#slPayableDiscount").val()*/
        , pDiscountPercentage: /*$("#txtPayableDiscountPercentage").val() == "" ? */0 /*: $("#txtPayableDiscountPercentage").val()*/
        , pDiscountAmount: /*$("#txtPayableDiscountAmount").val() == "" ?*/ 0 /*: $("#txtPayableDiscountAmount").val()*/

        , pCostAmount: /*($("#txtPayableAmount").val().trim() == "" ? */0 /*: $("#txtPayableAmount").val().trim())*/
        , pInitialSalePrice: /*($("#txtPayableInitialSalePrice").val().trim() == "" ? */0 /*: $("#txtPayableInitialSalePrice").val().trim())*/
        , pSupplierInvoiceNo: /*($("#txtPayableSupplierInvoiceNo").val().trim() == "" ? */0 /*: $("#txtPayableSupplierInvoiceNo").val().trim().toUpperCase())*/
        , pSupplierReceiptNo: /*($("#txtPayableSupplierReceiptNo").val().trim() == "" ? */0 /*: $("#txtPayableSupplierReceiptNo").val().trim().toUpperCase())*/
        , pEntryDate: /*($("#txtPayableEntryDate").val().trim() == "" ?*/ "01/01/1900" /*: ConvertDateFormat($("#txtPayableEntryDate").val().trim()))*/
        , pBillID: /*($('#slPayableBill option:selected').val() == "" ?*/ 0 /*: $('#slPayableBill option:selected').val())*/
        , pExchangeRate: /*($("#txtPayableExchangeRate").val().trim() == "" ?*/ 0 /*: $("#txtPayableExchangeRate").val().trim())*/
        , pCurrencyID: /*($('#slPayableCurrency option:selected').val() == "" ?*/ 0 /*: $('#slPayableCurrency option:selected').val())*/
        , pNotes: $("#txtAirPayableNotes").val().toUpperCase().trim()
        //the next 2 parameters are to check uniqueness of supplier invoice No. in the controller
        , pPartnerTypeID: /*$('#slPayableSupplier option:selected').attr("PartnerTypeID") == "" ? */0 /*: $('#slPayableSupplier option:selected').attr("PartnerTypeID")*/
        , pPartnerID: /*$('#slPayableSupplier option:selected').attr("PartnerID") == "" ?*/ 0 /*: $('#slPayableSupplier option:selected').attr("PartnerID")*/
        , pPayableBillTo: 0
        , pSupplierSiteID: 0
        , pTruckingOrderID: 0
    }, pSaveandAddNew, "EditAWBPayableModal"
    , function (data) {
        AirPayables_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
        OperationPartners_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
        if (data[1] != "") //supplier invoice number uniqueness violated
            swal(strSorry, data[1]);
    });
    //}
}
function PayablesAirLine_Update(pSaveandAddNew) {
    //if (!isValidDate($("#txtPayableEntryDate").val().trim(), 1) && $("#txtPayableEntryDate").val().trim() != "")
    //    swal(strSorry, strCheckDates);
    //else {
    debugger;
    InsertUpdateFunction("form", "/api/Payables/UpdateAirLinePayable", {
        pID: $("#hAirLinePayableID").val()
        //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
        , pAirLineId: $("#hAirlineID").val()
        , pChargeTypeID: $("#txtAirLinePayableType").attr("ChargeTypeID")
        , pIsDefault: $("#cbIsDefault").prop('checked')
    }, pSaveandAddNew, "EditAirLinePayableModal"
    , function (data) {
        AirLinePayables_LoadWithPagingWithWhereClause($("#hAirlineID").val());
    });
    //}
}
function AirPayables_UpdateList(pSaveandAddNew) {
    var pSelectedPayablesIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectPayables");//returns string array of IDs
    var pPOrCList = "";
    var pSupplierList = "";
    var pUOMList = "";
    var pQuantityList = "";
    var pCostPriceList = "";

    var pAmountWithoutVATList = "";
    var pTaxTypeIDList = "";
    var pTaxPercentageList = "";
    var pTaxAmountList = "";
    var pDiscountTypeIDList = "";
    var pDiscountPercentageList = "";
    var pDiscountAmountList = "";

    var pCostAmountList = "";
    var pInitialSalePriceList = "";
    var pSupplierInvoiceNumberList = "";
    var pSupplierReceiptNumberList = "";
    var pIssueDateList = "";
    var pEntryDateList = "";
    var pExchangeRateList = "";
    var pCurrencyList = "";
    var pPartnerTypeIDList = "";//pPartnerTypeIDList,pPartnerIDList are to check uniqueness of supplier invoice No. in the controller
    var pPartnerIDList = "";
    var pNotesList = "";
    var pBillIDList = "";
    if (pSelectedPayablesIDsToUpdate != "") {
        var NumberOfSelectRows = pSelectedPayablesIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedPayablesIDsToUpdate.split(",")[i];

            pPOrCList += ((pPOrCList == "") ? "" : ",") +/* ($("#slPayablePOrC" + currentRowID).val() == undefined || $("#slPayablePOrC" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayablePOrC" + currentRowID).val())*/;
            pSupplierList += ((pSupplierList == "") ? "" : ",") +/* ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableSupplier" + currentRowID).val())*/;
            pUOMList += ((pUOMList == "") ? "" : ",") +/* ($("#slPayableUOM" + currentRowID).val() == undefined || $("#slPayableUOM" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableUOM" + currentRowID).val())*/;
            pQuantityList += ((pQuantityList == "") ? "" : ",") +/* ($("#txtTblModalPayableQuantity" + currentRowID).val() == undefined || $("#txtTblModalPayableQuantity" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableQuantity" + currentRowID).val())*/;
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalPayableCostPrice" + currentRowID).val() == undefined || $("#txtTblModalPayableCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalPayableCostPrice" + currentRowID).val());

            pAmountWithoutVATList += ((pAmountWithoutVATList == "") ? "" : ",") + /*($("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableCostAmountWithoutVAT" + currentRowID).val())*/;
            pTaxTypeIDList += ((pTaxTypeIDList == "") ? "" : ",") + /*($("#slPayableTax" + currentRowID).val() == undefined || $("#slPayableTax" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableTax" + currentRowID).val())*/;
            pTaxPercentageList += ((pTaxPercentageList == "") ? "" : ",") + /*($("#txtTblModalPayableTaxPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxPercentage" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableTaxPercentage" + currentRowID).val())*/;
            pTaxAmountList += ((pTaxAmountList == "") ? "" : ",") + /*($("#txtTblModalPayableTaxAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableTaxAmount" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableTaxAmount" + currentRowID).val())*/;
            pDiscountTypeIDList += ((pDiscountTypeIDList == "") ? "" : ",") + /*($("#slPayableDiscount" + currentRowID).val() == undefined || $("#slPayableDiscount" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableDiscount" + currentRowID).val())*/;
            pDiscountPercentageList += ((pDiscountPercentageList == "") ? "" : ",") + /*($("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountPercentage" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableDiscountPercentage" + currentRowID).val())*/;
            pDiscountAmountList += ((pDiscountAmountList == "") ? "" : ",") + /*($("#txtTblModalPayableDiscountAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableDiscountAmount" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableDiscountAmount" + currentRowID).val())*/;

            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + /*($("#txtTblModalPayableCostAmount" + currentRowID).val() == undefined || $("#txtTblModalPayableCostAmount" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableCostAmount" + currentRowID).val())*/;
            pInitialSalePriceList += ((pInitialSalePriceList == "") ? "" : ",") + /*($("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == undefined || $("#txtTblModalPayableInitialSalePrice" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableInitialSalePrice" + currentRowID).val())*/;
            pSupplierInvoiceNumberList += ((pSupplierInvoiceNumberList == "") ? "" : ",") + /*($("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim() == "" ?*/ 0 /*: $("#txtTblModalPayableSupplierInvoiceNo" + currentRowID).val().trim().toUpperCase())*/;
            pSupplierReceiptNumberList += ((pSupplierReceiptNumberList == "") ? "" : ",") + /*($("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val() == undefined || $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim() == "" ?*/ 0 /*: $("#txtTblModalPayableSupplierReceiptNo" + currentRowID).val().trim().toUpperCase())*/;
            pIssueDateList += ((pIssueDateList == "") ? "" : ",") +/* ($("#txtTblModalPayableIssueDate" + currentRowID).val() == undefined || $("#txtTblModalPayableIssueDate" + currentRowID).val().trim() == "" ?*/ "01/01/1900" /*: $("#txtTblModalPayableIssueDate" + currentRowID).val().trim())*/;
            pEntryDateList += ((pEntryDateList == "") ? "" : ",") +/* ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ?*/ "01/01/1900" /*: $("#txtTblModalPayableEntryDate" + currentRowID).val().trim())*/;
            //pEntryDateList += ((pEntryDateList == "") ? "" : ",") +/* ($("#txtTblModalPayableEntryDate" + currentRowID).val() == undefined || $("#txtTblModalPayableEntryDate" + currentRowID).val().trim() == "" ?*/ "" /*: ConvertDateFormat($("#txtTblModalPayableEntryDate" + currentRowID).val().trim()))*/;
            pExchangeRateList += ((pExchangeRateList == "") ? "" : ",") +/*  ($("#txtTblModalPayableExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalPayableExchangeRate" + currentRowID).val() == "" ?*/ 0 /*: $("#txtTblModalPayableExchangeRate" + currentRowID).val())*/;
            pCurrencyList += ((pCurrencyList == "") ? "" : ",") +/*  ($("#slPayableCurrency" + currentRowID).val() == undefined || $("#slPayableCurrency" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableCurrency" + currentRowID).val())*/;
            pPartnerTypeIDList += ((pPartnerTypeIDList == "") ? "" : ",") +/*  ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerTypeID"))*/;
            pPartnerIDList += ((pPartnerIDList == "") ? "" : ",") +/*  ($("#slPayableSupplier" + currentRowID).val() == undefined || $("#slPayableSupplier" + currentRowID).val() == "" ?*/ 0 /*: $("#slPayableSupplier" + currentRowID + " option:selected").attr("PartnerID"))*/;
            pNotesList += ((pNotesList == "") ? "" : ",") + ($("#txtTblModalPayableNotes" + currentRowID).val() == undefined || $("#txtTblModalPayableNotes" + currentRowID).val().trim() == "" ? 0 : $("#txtTblModalPayableNotes" + currentRowID).val().trim().toUpperCase());
            pBillIDList += ((pBillIDList == "") ? "" : ",") + "0";
        }
    }
    if (pSelectedPayablesIDsToUpdate != "")
        InsertSelectedCheckboxItems("/api/Payables/UpdateList"
            , {
                "pIsCalledFromOperations": true
                , "pSelectedPayablesIDsToUpdate": pSelectedPayablesIDsToUpdate
                , "pPOrCList": pPOrCList
                , "pSupplierList": pSupplierList
                , "pUOMList": pUOMList
                , "pQuantityList": pQuantityList
                , "pCostPriceList": pCostPriceList

                , "pAmountWithoutVATList": pAmountWithoutVATList
                , "pTaxTypeIDList": pTaxTypeIDList
                , "pTaxPercentageList": pTaxPercentageList
                , "pTaxAmountList": pTaxAmountList
                , "pDiscountTypeIDList": pDiscountTypeIDList
                , "pDiscountPercentageList": pDiscountPercentageList
                , "pDiscountAmountList": pDiscountAmountList

                , "pCostAmountList": pCostAmountList
                , "pInitialSalePriceList": pInitialSalePriceList
                , "pSupplierInvoiceNumberList": pSupplierInvoiceNumberList
                , "pSupplierReceiptNumberList": pSupplierReceiptNumberList
                , "pIssueDateList": pIssueDateList
                , "pEntryDateList": pEntryDateList
                , "pExchangeRateList": pExchangeRateList
                , "pCurrencyList": pCurrencyList
                , "pPartnerTypeIDList": pPartnerTypeIDList
                , "pPartnerIDList": pPartnerIDList
                , "pNotesList": pNotesList
                , "pBillIDList": pBillIDList
            }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , null//function () { Payables_GetAvailableCharges(); }
            , function (data) {
                debugger;
                AirPayables_LoadWithPagingWithWhereClause($("#hShipmentAirID").val());
                //OperationPartners_LoadWithPagingWithWhereClause($("#hOperationID").val());
                if (data[1] != "")
                    swal(strSorry, data[1]);
            });
}
/////////////////////////EOF Saving fns//////////////////////////////////
function AirPayables_FillControls(pID) {
    ClearAll("#EditAWBPayableModal");

    $("#hAirPayableID").val(pID);

    var tr = $("#tblPayablesAWB tr[ID='" + pID + "']");

    $("#txtAirPayableType").val($(tr).find("td.Payable").text());
    $("#txtAirPayableType").attr("ChargeTypeID", $(tr).find("td.Payable").attr("val"));
    $("#txtAirPayableUnitPrice").val(parseInt($(tr).find("td.PayableCostPrice").text()) == 0 ? "" : $(tr).find("td.PayableCostPrice").text());
    $("#txtAirPayableNotes").val($(tr).find("td.PayableNotes").text());

    $("#btnSaveAirPayable").attr("onclick", "PayablesAir_Update(false);");
}
function AirLinePayables_FillControls(pID) {
    debugger;
    ClearAll("#EditAirLinePayableModal");

    $("#hAirLinePayableID").val(pID);

    var tr = $("#tblAirLinePayables tr[ID='" + pID + "']");
    debugger;
    $("#txtAirLinePayableType").val($(tr).find("td.ChargeTypeID").text());
    $("#txtAirLinePayableType").attr("ChargeTypeID", $(tr).find("td.ChargeTypeID").attr("val"));
    $("#cbIsDefault").prop('checked', ($(tr).find('td.cbIsDefault input').is(':checked')));
    $("#btnSaveAirLinePayable").attr("onclick", "PayablesAirLine_Update(false);");
}
function AirPayables_MultiRowEdit() {
    debugger;
    var pStrFnName = "/api/Payables/LoadAll";  //var pStrFnName = "/api/Payables/LoadAllAir";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalPayables";
    var pCheckboxNameAttr = "cbSelectPayables";
    var pWhereClause = "";
    pWhereClause += "                WHERE OperationID = " + $("#hShipmentAirID").val();//+ " AND IsDeleted=0 AND AccNoteID IS NULL ";
    pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";

    FillAirPayablesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); });

    $("#btn-SearchCharges").attr("onclick", "AirPayables_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "AirPayables_UpdateList(false);");
}

//*********************************Uploaded Files***************************************//
function Airlines_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Airlines";
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Airlines//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Airlines/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Airlines";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Airlines";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Airlines";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//




//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Airlines_onFileSelected(event, pBtnName) {
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
                if (oJS.length > 0 && oJS[0].Prefix != undefined && oJS[0].Name != undefined) //if (sCSV != "")
                    Airlines_ImportFromExcelFile(oJS, pBtnName);
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

function Airlines_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Airlines Name List from DB
    var ExistingAirlinesNameList;
    var ExistingAirlinesNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/Airlines/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingAirlinesNameList = JSON.parse(pData[0]);
                ExistingAirlinesNameArray = ExistingAirlinesNameList.map(item => item.Name);


                FadePageCover(true);
                var pNameList = "";
                var pNameArray = [];
                var pLocalNameList = "";
                var pPrefixList = "";
                var pICAOList = "";
                var pIATACodeList = "";
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
                        if (ExistingAirlinesNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    pPrefixList += ((pPrefixList == "" ? "" : ",") +
                        (pDataRows[i].Prefix == undefined || pDataRows[i].Prefix.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Prefix.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pICAOList += ((pICAOList == "" ? "" : ",") +
                        (pDataRows[i].ICAO == undefined || pDataRows[i].ICAO.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ICAO.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pIATACodeList += ((pIATACodeList == "" ? "" : ",") +
                        (pDataRows[i].IATACode == undefined || pDataRows[i].IATACode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].IATACode.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCompanyList += ((pCompanyList == "" ? "" : ",") +
                        (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pPrefixList, pICAOList
                    , pIATACodeList, pCompanyList
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Airlines ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/Airlines/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        Airlines_LoadingWithPaging();
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
    if ($('#cbIsConsolidatedInvoice').is(':checked')) {
        $('.TaxExempt').removeClass('hide');
    }
    else {
        $('.TaxExempt').addClass('hide');
        $('#txtTaxExemptFromDate,#txtTaxExemptToDate').val('');
    }
}