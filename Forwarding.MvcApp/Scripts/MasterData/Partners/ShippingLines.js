//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// ShippingLines Region ---------------------------------------------------------------
// Bind ShippingLines Table Rows
var intPartnerTypeID = 5;
function ShippingLines_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/ShippingLines/LoadWithPaging";
    LoadView("/MasterData/ShippingLines", "div-content", function () {
        LoadView("/MasterData/ModalShippingLines", "div-content", function () {
            
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

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) {
                ShippingLines_BindTableRows(pTabelRows);
            });

        GetListWithName(null, "/api/Countries/LoadAll", "Select", "slFilterCountry", function () {
            $('#slFilterCountry').css({ 'width': '100%' }).select2();
        });
    },
        function () { ShippingLines_ClearAllControls(); },
        function () { ShippingLines_DeleteList(); });
}
function ShippingLines_BindTableRows(pShippingLines) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblShippingLines");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pShippingLines, function (i, item) {
        AppendRowtoTable("tblShippingLines",
            ("<tr ID='" + item.ID + "' ondblclick='ShippingLines_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.Name + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                    + "<td class='Website hide'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
                    + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                    + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                    + "<td class='VATNumber hide'>" + (item.VATNumber == 0 ? "" : item.VATNumber) + "</td>"
                    + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + (item.CurrencyCode == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + (item.TaxeTypeCode == 0 ? "" : item.TaxeTypeCode) + "</td>"
                    + "<td class='Notes'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
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
                    + "<td class='hide'><a href='#ShippingLineModal' data-toggle='modal' onclick='ShippingLines_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblShippingLines", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblShippingLines>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function ShippingLines_EditByDblClick(pID) {
    jQuery("#ShippingLineModal").modal("show");
    ShippingLines_FillControls(pID);
}
function ShippingLines_LoadingWithPaging() {
    debugger;
    var pWhereClause = 'where 1=1';

    if ($("#txt-Search").val().trim() != "") {
        let pSearchKey = $("#txt-Search").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }

    if ($('#slFilterCountry').val() > 0) {
        pWhereClause += " and ID in (select PartnerID from Addresses where PartnerTypeID=5 and CountryID=" + $('#slFilterCountry').val() + ")";
        $('#slFilterCountry').val(-1).change();
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ShippingLines/LoadWithPagingWithWhereClause", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { ShippingLines_BindTableRows(pTabelRows); ShippingLines_ClearAllControls(); });
    HighlightText("#tblShippingLines>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function ShippingLines_Insert(pSaveandAddNew) {
    debugger;
    InsertUpdateFunction("form", "/api/ShippingLines/Insert", {
        pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
        , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
        , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
        , pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim())
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
    }, pSaveandAddNew, "ShippingLineModal", function () { ShippingLines_LoadingWithPaging(); });
}
function ShippingLines_Update(pSaveandAddNew) {
    InsertUpdateFunction("form", "/api/ShippingLines/Update", {
        pID: $("#hShippingLineID").val()
        , pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
        , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
        , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
        , pCode: $("#txtCode").val().trim()
        , pName: $("#txtName").val().trim()
        , pLocalName: $("#txtLocalName").val().trim()
        , pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim())
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
    }, pSaveandAddNew, "ShippingLineModal", function () { ShippingLines_LoadingWithPaging(); });
}
function ShippingLines_UnlockRecord() {
    debugger;
    UnlockFunction("/api/ShippingLines/UnlockRecord",
        { pID: $("#hShippingLineID").val() },
        "ShippingLineModal",
        function () { ShippingLines_LoadingWithPaging(); }); //the callback function
}
//function ShippingLines_Delete(pID) {
//    DeleteListFunction("/api/ShippingLines/DeleteByID", { "pID": pID }, function () { ShippingLines_LoadingWithPaging(); });
//}
function ShippingLines_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblShippingLines') != "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblShippingLines');
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
                            DeleteListFunction("/api/ShippingLines/Delete", { "pShippingLinesIDs": GetAllSelectedIDsAsString('tblShippingLines') }, function () {
                                ShippingLines_LoadingWithPaging(
                                    //this is callback in ShippingLines_LoadingWithPaging
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
function ShippingLines_FillControls(pID) {
    //ShippingLines_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/ShippingLines/CheckRow", { 'pID': pID }, function () {
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

        $("#hShippingLineID").val(pID);

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
        //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
        var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val'); //store the val in a var to be re-entered in the select box
        PaymentTerms_GetList(pPaymentTermID, null);
        var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
        Currencies_GetList(pCurrencyID, null);
        var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
        TaxeTypes_GetList(pTaxeTypeID, null);

        //the next line is to get the ShippingLine addresses and Contacts info
        Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
        Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
        PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
        debugger;
        $("#tblUploadedFiles_ShippingLines tbody").html("");

        $("#lblShown").html(": " + $(tr).find("td.Name").text());
        $("#txtCode").val($(tr).find("td.Code").text());
        $("#txtName").val($(tr).find("td.Name").text());
        $("#txtLocalName").val($(tr).find("td.LocalName").text());
        $("#txtWebsite").val($(tr).find("td.Website").text());
        $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
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

        ShippingLines_GeneralUpload_Initialise();

        $("#btnSave").attr("onclick", "ShippingLines_Update(false);");
        $("#btnSaveandNew").attr("onclick", "ShippingLines_Update(true);");
        //to set the wizard to BasicData
        $("#stepsBasicData").parent().children().removeClass("active");
        $("#stepsBasicData").addClass("active");
        $("#BasicData").parent().children().removeClass("active");
        $("#BasicData").addClass("active");
        //to hide Contacts and Addresses tabs in case of partner is not saved yet
        ShippingLines_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
}
function ShippingLines_ClearAllControls(callback) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtWebsite", "txtNotes", "txtVATNumber", "txtBankName", "txtBankAddress", "txtSwift", "txtBankAccountNumber", "txtIBANNumber"),
    //    new Array("slPaymentTerms", "slCurrencies", "slTaxeTypes"), new Array("cbIsInactive", "cbIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    if (IsMESCOCompany) {
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    $(".classAccountingOption").addClass("hide");
    ClearAll("#ShippingLineModal", null);

    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnVisitWebsite").attr('href', 'http://');
    $("#bodyShippingLineAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyShippingLinePartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyShippingLineContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    PaymentTerms_GetList(null, null);
    Currencies_GetList(null, null);
    TaxeTypes_GetList(null, null);
    //EOF for AddressModal
    debugger;

    $("#btnSave").attr("onclick", "ShippingLines_Insert(false);");
    $("#btnSaveandNew").attr("onclick", "ShippingLines_Insert(true);");
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    ShippingLines_ShowHideTabs();
    ShowTaxExemptDate();
}
//Set the btnVisitWebsite href
function ShippingLines_SetWebSiteHref() {
    $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function ShippingLines_ShowHideTabs() {
    if ($("#txtCode").val() == "") {
        $("#stepsContacts").addClass('hide');
        $("#stepsAddresses").addClass('hide');
        $("#stepsPartnersBanks").addClass('hide');
    }
    else {
        $("#stepsContacts").removeClass('hide');
        $("#stepsAddresses").removeClass('hide');
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

//*********************************Uploaded Files***************************************//
function ShippingLines_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_ShippingLines";
    glbGeneralUploadFolderName = $("#hShippingLineID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//ShippingLines//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/ShippingLines/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_ShippingLines";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_ShippingLines";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_ShippingLines";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function ShippingLines_onFileSelected(event, pBtnName) {
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
                if (oJS.length > 0 && oJS[0].SCAC_Code != undefined) //if (sCSV != "")
                    ShippingLines_ImportFromExcelFile(oJS, pBtnName);
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

function ShippingLines_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing ShippingLines Name List from DB
    var ExistingShippingLinesNameList;
    var ExistingShippingLinesNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/ShippingLines/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingShippingLinesNameList = JSON.parse(pData[0]);
                ExistingShippingLinesNameArray = ExistingShippingLinesNameList.map(item => item.Name);


                FadePageCover(true);
                var pSCAC_CodeList = "";
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
                        if (ExistingShippingLinesNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    pSCAC_CodeList += ((pSCAC_CodeList == "" ? "" : ",") +
                        (pDataRows[i].SCAC_Code == undefined || pDataRows[i].SCAC_Code.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].SCAC_Code.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );
                    pCompanyList += ((pCompanyList == "" ? "" : ",") +
                        (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                        );

                }
                var pParametersWithValues = {
                    pNameList, pLocalNameList, pSCAC_CodeList, pCompanyList
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Shipping Lines ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/ShippingLines/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        ShippingLines_LoadingWithPaging();
                        FadePageCover(false);
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