//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for AGENTS is 2
//PartnerTypeID for SHIPPING AGENTS is 3
//PartnerTypeID for CUSTOMS CLEARANCE AGENTS is 4
//PartnerTypeID for SHIPPINGLINES is 5 
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Customers Region ---------------------------------------------------------------
// Bind Customers Table Rows 
var intPartnerTypeID = 1;
var strSelectShipperOrConsigneeMessage = "Check whether the customer is a Shipper Or Consignee.";
function Customers_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
    LoadView("/MasterData/Customers", "div-content", function () {
        debugger;
        if (pDefaults.UnEditableCompanyName == "EF" || pDefaults.UnEditableCompanyName == "FPL") {
            $('#div-search-controls').addClass('hide');
            $('#srchControls').removeClass('hide');
        }
        else {
            $('#div-search-controls').removeClass('hide');
            $('#srchControls').addClass('hide');
        }
        if (pDefaults.UnEditableCompanyName == "MED") {
            $("#btn-ExportToExcel").removeClass("hide");
        }
        if (pDefaults.UnEditableCompanyName == "AKS") {
            $("#btn-ExportBlackList").removeClass("hide");
        }
   
        if (IsMESCOCompany) {
            $('#btn-refreshInvoicesVAT').removeClass('hide');
        }
        CallGETFunctionWithParameters("/api/SL_CustomerCategories/LoadWithPaging"
            , { pPageNumber: 1, pPageSize: 9999, pSearchKey: null }
            , function (pData) {
                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slFilterCustomerCategory", pData[0], null);
            }
            , null);
        LoadView("/MasterData/ModalCustomers", "div-content"
            , function () {
                $("#txt-Search").val("");
                $('#slOwner').css({ 'width': '100%' }).select2();

                if (pDefaults.UnEditableCompanyName == "ARK") {
                    $('.classShowForARK').removeClass('hide');
                }
                if (pDefaults.UnEditableCompanyName == "LATT") {
                    $("#txtcrmCode").prev().text("Client Number");
                    $("#txtFinance365Ref").prev().text("Organiztion Code");
                    $("#cbIsShipper").next().text(" Consignor");
                }
                if (pDefaults.UnEditableCompanyName == "PYR") {
                    $(".ShowForPYR").removeClass("hide");
                }
                if (pDefaults.UnEditableCompanyName == "AKS") {
                    $("#cbIsMustPay").parent().removeClass("hide");
                    $("#spMustPay").text("Blacklist");
                    $("#txtcrmCode").prev().text("Kinz Code");
                    $("#txtForeignExporterNo").prev().text("National ID");
                }
                LoadCustomersModalComboBoxes();

                if (pDefaults.UnEditableCompanyName != "ALT" && pDefaults.UnEditableCompanyName != "EUR" && pDefaults.UnEditableCompanyName != "MES"
                    && pDefaults.UnEditableCompanyName != "GLO" && pDefaults.UnEditableCompanyName != "SAC") {
                    $(".classHideForMESCOChildren").removeClass("hide");
                }
                if (IsAccountingActive)
                    $(".classAccountingOption").removeClass("hide");
                else
                    $(".classAccountingOption").addClass("hide");
                $(".classHideOutsidePartners").removeClass("hide");
                if (pDefaults.UnEditableCompanyName == "SAF") {
                    $("#btn-OperatorTankChargeModal").addClass("hide");
                    $(".classMandatoryForSAF").attr("data-required", "true");
                }
                else if (pDefaults.UnEditableCompanyName == "CAL")
                    $(".classShowForCAL").removeClass("hide");
                if (glbCallingControl == "Customers") {
                    $("#liGroupName").text("Master Data");
                    $("#liGroupName").attr("onclick", "LoadViews('Partners')");
                    $("#liTabName").text("Partners");
                    $("#liTabName").attr("onclick", "LoadViews('Partners')");
                    //$("#h3Allocation").text("Receivables Allocations"); $("#h3Allocation").addClass("static-text-primary");
                    //$("#h3ModalLblAllocationType").html("Receivables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-primary"></label>');
                    //$("#h3ModalLblAllocationType").addClass("static-text-primary");
                }
                else { //Warehousing
                    $("#liGroupName").text("Warehousing");
                    $("#liGroupName").attr("onclick", "LoadViews('Warehousing')");
                    $("#liTabName").text("Master Data");
                    $("#liTabName").attr("onclick", "LoadViews('Warehousing')");
                    //$("#h3Allocation").text("Payables Allocations"); $("#h3Allocation").addClass("static-text-danger");
                    //$("#h3ModalLblAllocationType").html("Payables Allocation" + '&nbsp;<label id="lblAllocationShown" purpose="dynamicLabel" class="static-text-danger"></label>');
                    //$("#h3ModalLblAllocationType").addClass("static-text-danger");
                }

                GetListWithNameAndWhereClause(0, '/api/Customers/LoadAll_Companies', 'Select Company', "slFilterCompany", ' WHERE ID <> 60 ORDER BY ID');

                if (IsMESCOCompany)
                    $('#lblBillingDetails').html('Collection Man');

                //$("#liAccountAllocationType").text($("#h3Allocation").text());
                CallGETFunctionWithParameters("/api/ChartOfAccounts/LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned"
                    , { pIsLoadArrayOfObjects: true, pLanguage: $("[id$='hf_ChangeLanguage']").val(), pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE 1=0", pOrderBy: "Name,Code" }
                    , function (pData) {

                        var pClientGroup = pData[3];
                        var pSupplierGroup = pData[4];
                        var pCreditLimit = pData[7];
                        FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slAccount", pData[0], null);
                        FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCostCenter", pData[2], null);
                        FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSubAccountGroup", pClientGroup, null);
                        FillListFromObject_ERP(null, 12/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slCreditLimit", pCreditLimit, null);
                        $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
                        $("#txtDate").val(getTodaysDateInddMMyyyyFormat());
                        if (pDefaults.UnEditableCompanyName == "SGL") {
                            debugger;
                            CallGETFunctionWithParameters("/api/Rates/LoadWithPaging"
                                , { pPageNumber: 1, pPageSize: 99999, pSearchKey: "" }
                                , function (pData) {
                                    var pRates = pData[0];
                                    FillListFromObject(null, 2, " Select Rate", "slRates", pData[0], null);
                                }, null);
                        }

                    }
                    , null);
                //    CallGETFunctionWithParameters("/api/Rates/LoadWithPaging"
                //, { pPageNumber: 1, pPageSize: 99999, pSearchKey: "" }
                //, function (pData) {
                //    var pRates = pData[0];
                //    FillListFromObject(null, 2, " Select Rate", "slRates", pData[0], null);

                //}
                //    , null);
            }
            , null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalAddresses", "div-content", function () {
            $("#txt-Search").val("");
            if (pDefaults.UnEditableCompanyName == "LATT") {
                $("#txtPrintedAs").parent().attr("style", "");
                $("#txtPrintedAs").prev().text("State");
            }
        }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalPartnersBanks", "div-content", function () { $("#txt-Search").val(""); }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalContacts", "div-content", function () { $("#txt-Search").val(""); }, null, null, true);//sherif: calling a partial view with only modal called from different places
        LoadView("/MasterData/ModalRates", "div-content", function () { $("#txt-Search").val(""); }, null, null, true);

        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Addresses.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/PartnersBanks.js');//sherif: to load the js file of the appended partial view
        $.getScript(strServerURL + '/Scripts/MasterData/Partners/Contacts.js');//sherif: to load the js file of the appended partial view
        //LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
        //    , function (pTabelRows) {
        //        debugger;
        //        Customers_BindTableRows(pTabelRows);
        //        //FillListFromObject(null, 2, " Select Rate", "slRates", pData[2], null);
        //    });
        Customers_LoadingWithPaging();
        if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapChildrenClass:not(.reversed)").reverseChildren();
    },
        function () { Customers_ClearAllControls(); },
        function () { Customers_DeleteList(); });
    if (pDefaults.UnEditableCompanyName == "TOP")
        $(".ShowForTopManagement").removeClass("hide");
    else
        $(".ShowForTopManagement").addClass("hide");

}
function Customers_BindTableRows(pCustomers) {
    debugger;
    if (glbCallingControl == "Customers")
        $("#hl-menu-MasterData").parent().addClass("active");
    else
        $("#hl-menu-Warehousing").parent().addClass("active");
    if (pDefaults.UnEditableCompanyName != "UNF") {
        $(".AccountUNF").addClass("hide");
    }
    ClearAllTableRows("tblCustomers");
    editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    
    $.each(pCustomers, function (i, item) {
        AppendRowtoTable("tblCustomers",
            ("<tr ID='" + item.ID + "' ondblclick='Customers_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + (pDefaults.UnEditableCompanyName == "TOP" ? ("<td class='CompanyName'>" + item.CompanyName + "</td>") : "")
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='Name'>" + item.Name + "</td>"
                + "<td class='LocalName'>" + (item.LocalName == 0 ? "" : item.LocalName) + "</td>"
                + "<td class='SalesMan showForNex hide'>" + (item.SalesmanName == 0 ? "" : item.SalesmanName) + "</td>"

                + "<td class='Website hide'>" + (item.Website == 0 ? "" : item.Website) + "</td>"
                + "<td class='CustomerEmail hide'>" + (item.Email == 0 ? "" : item.Email) + "</td>"
                + "<td class='PaymentTermID' val='" + item.PaymentTermID + "'>" + (item.PaymentTermID != 0 ? item.PaymentTermCode : "") + "</td>"
                + "<td class='IsConsignee hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsignee == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsShipper hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsShipper == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsInternalCustomer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsinternalCustomer == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsExternalCustomer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsExternal == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsRelatedCustomer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsRelated == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='VATNumber'>" + item.VATNumber + "</td>"
                + "<td class='BranchID hide' val='" + (item.BranchID == 0 ? "" : item.BranchID) + "'>" + item.BranchID + "</td>"
                + "<td class='DebitorGroupID hide' val='" + (item.DebitorGroupID == 0 ? "" : item.DebitorGroupID) + "'>" + item.DebitorGroupID + "</td>"
                + "<td class='CurrencyID hide' val='" + item.CurrencyID + "'>" + item.CurrencyCode + "</td>"
                + "<td class='SalesmanID hide' val='" + item.SalesmanID + "'>" + item.SalesmanName + "</td>"
                + "<td class='TaxeTypeID hide' val='" + item.TaxeTypeID + "'>" + item.TaxeTypeCode + "</td>"
                + "<td class='ForeignExporterNo hide'>" + item.ForeignExporterNo + "</td>"
                + "<td class='ForeignExporterCountryName hide' val='" + item.ForeignExporterCountryID + "'>" + item.ForeignExporterCountryID + "</td>"
                + "<td class='Notes hide'>" + item.Notes + "</td>"
                + "<td class='Address hide'>" + item.Address + "</td>"
                + "<td class='PhonesAndFaxes hide'>" + item.PhonesAndFaxes + "</td>"
                + "<td class='IsConsolidatedInvoice hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsConsolidatedInvoice == true ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='BankName hide'>" + item.BankName + "</td>"
                + "<td class='BankAddress hide'>" + item.BankAddress + "</td>"
                + "<td class='Swift hide'>" + item.Swift + "</td>"
                + "<td class='BankAccountNumber hide'>" + item.BankAccountNumber + "</td>"
                + "<td class='IBANNumber hide'>" + item.IBANNumber + "</td>"

                + "<td class='MainClient hide'>" + item.MainClientID + "</td>"
                + "<td class='CreationDate hide'>" + (IsMESCOCompany ? ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) : '') + "</td>"
                 
                + "<td class='AccountID hide'>" + item.AccountID + "</td>"
                + "<td class='SubAccountID hide'>" + item.SubAccountID + "</td>"
                + "<td class='SubAccountName hide'>" + (item.SubAccountName == 0 ? "" : item.SubAccountName) + "</td>"
                + "<td class='CostCenterID hide'>" + item.CostCenterID + "</td>"
                + "<td class='CostCenterName hide'>" + (item.CostCenterName == 0 ? "" : item.CostCenterName) + "</td>"
                + "<td class='SubAccountGroupID hide'>" + item.SubAccountGroupID + "</td>"
                + "<td class='OperationCount hide'>" + item.OperationCount + "</td>"
                + "<td class='PriceList hide'>" + item.LockingUserID + "</td>" // mostaa
                + "<td class='Sites hide'>" + item.Sites + "</td>"      
                + "<td class='CustomerUserID hide' val='" + item.CustomerUserID + "' >" + item.CustomerUserID + "</td>" // mostaa
                + "<td class='CustomerUserName hide' val='" + item.CustomerUserName + "'>" + item.CustomerUserName + "</td>" // mostaa
                + "<td class='IsMustPay hide' val='" + (item.IsMustPay == 0 ? false : true) + "'>" + " <input type='checkbox' disabled='disabled' " + (item.IsMustPay == 0 ? "" : "checked='checked'")  + " />" + "</td>" 
                + "<td class='IsInActiveUser' val='" + ((item.IsInActiveUser == false && item.CustomerUserID == 0) ? true : item.IsInActiveUser)  /*IN ACTIVE*/ + "'>" + " <input type='checkbox' disabled='disabled' " + (((item.IsInActiveUser == false && item.CustomerUserID == 0) || (item.IsInActiveUser == true)) ? "" : "checked='checked'") /*ACTIVE*/ + " />" + "</td>" // mostaa
                + "<td class='CustomerUserUserName ' val='" + item.CustomerUserUserName + "'>" + IsNull(item.CustomerUserUserName, "-") + "</td>" // mostaa
                + "<td class='SalesLeadID' val='" + item.SalesLeadID + "'> <input type='checkbox' disabled='disabled' val='" + (item.SalesLeadID != 0 ? "true' checked='checked'" : "'") + " /></td>"
                + "<td class='AccountName " + (pDefaults.UnEditableCompanyName !="UNF" ? "hide":"") +"'> "+(item.AccountName == 0 ? "" : item.AccountName)+"</td>"
                + "<td class='BillingDetails hide' val='" + item.BillingDetails + "' >" + item.BillingDetails + "</td>" // mostaa
                + "<td class='ShippingDetails hide' val='" + item.ShippingDetails + "' >" + item.ShippingDetails + "</td>" // mostaa
                + "<td class='crmCode hide' val='" + item.crmCode + "' >" + item.crmCode + "</td>"
                + "<td class='Finance365Ref hide' val='" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "' >" + (item.Finance365Ref == 0 ? "" : item.Finance365Ref) + "</td>"
                + "<td class='OriginalCMRbyPost hide' val='" + item.OriginalCMRbyPost + "' >" + item.OriginalCMRbyPost + "</td>" // mostaa
                + "<td class='CategoryID hide'>" + item.CategoryID + "</td>"

                + "<td class='CompanyName hide'>" + (item.CompanyName == 0 ? "" : item.CompanyName) + "</td>"
                + "<td class='SenderName hide'>" + (item.SenderName == 0 ? "" : item.SenderName) + "</td>"
                + "<td class='AccountNo hide'>" + (item.AccountNo == 0 ? "" : item.AccountNo) + "</td>"
                + "<td class='OwnerId hide'>" + (item.OwnerId == 0 ? "" : item.OwnerId) + "</td>"
                + "<td class='OwnerIds hide'>" + (item.OwnersIds == 0 ? "" : item.OwnersIds) + "</td>"
                + "<td class='Mobile hide' val='" + (item.mobile == "0" ? "" : item.mobile) + "' >" + (item.mobile == "0" ? "" : item.mobile) + "</td>" // mostaa
                + "<td class='PriceListName'>" + item.PriceListName + "</td>" // mostaa
                + (pDefaults.UnEditableCompanyName == "LATT" ? ("<td class='IsIntegrated'> <input type='checkbox' disabled='disabled' val='" + (item.IsIntegrated == 1 ? "true' checked='checked'" : "'") + " /></td>") : "")
                + "<td  class='PrintButton hide'>" + "<a class='btn btn-warning btn-sm  ' onclick='CustomerPrint(" + item.ID + ");'>" + "Print" + "</a>" + "</td>"
                + "<td  class='CrmButton " + (pDefaults.UnEditableCompanyName == "LATT" && item.DebitorGroupID > 0 ? "" : "hide") + "'>" + "<a class='btn btn-success btn-sm  ' onclick='getCustomerPayment(" + item.ID + ");'>" + "Get Payments" + "</a>" + "</td>"

                + "<td class='hide'><a href='#CustomerModal' data-toggle='modal' onclick='Customers_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    if (pDefaults.UnEditableCompanyName == "LATT") {
        $("#btn-Delete").addClass("hide");
        $('.IsMustPay').addClass("hide");
        $(".ShowForLATT").removeClass('hide');
    }
    BindAllCheckboxonTable("tblCustomers", "ID");
    CheckAllCheckbox("ID");
    if (pDefaults.UnEditableCompanyName == "TEU") { $(".PrintButton").removeClass('hide'); $(".ShowForTEU").removeClass('hide');  }
    HighlightText("#tblCustomers>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }



    if (pDefaults.UnEditableCompanyName == "NEX") {
        $(".showForNex").removeClass("hide");

    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });

    if (pDefaults.UnEditableCompanyName == "TOP")
        $(".ShowForTopManagement").removeClass("hide");
    else
        $(".ShowForTopManagement").addClass("hide");
}
function Customers_EditByDblClick(pID) {
    jQuery("#CustomerModal").modal("show");
    Customers_FillControls(pID);
}
function Customers_GetWhereClause() {
    var pWhereClause = 'Where 1 = 1';
    if (pDefaults.UnEditableCompanyName == "TOP" && $("#slFilterCompany").val() != "" && $("#slFilterCompany").val() != null) {
        pWhereClause += " AND CompanyID= " + $("#slFilterCompany").val()
    }
    switch ($("#slFilterCustomerType").val()) {
        case "Internal":
            pWhereClause += " AND IsInternalCustomer =1";
            break;
        case "External":
            pWhereClause += " AND IsExternal = 1";
            break;
        case "Related":
            pWhereClause += " AND IsRelated = 1";
            break;
    }
    switch ($("#slFilterCustomerKind").val()) {
        case "Consignee":
            pWhereClause += " AND IsConsignee=1";
            break;
        case "Shipper":
            pWhereClause += " AND IsShipper=1";
            break;
    }

    if ($("#txt-Search").val().trim() != "") {
        let pSearchKey = $("#txt-Search").val().trim();
        pWhereClause += " AND (Code LIKE N'%" + pSearchKey + "%' "
            + " OR Name LIKE N'%" + pSearchKey + "%' "
            + " OR VATNumber LIKE N'%" + pSearchKey + "%' "
            + " OR LocalName LIKE N'%" + pSearchKey + "%') "
    }
    if (pDefaults.UnEditableCompanyName == "NEX") {
        pWhereClause += " OR( SalesmanID in (select id from users where Name LIKE N'%" + $("#txt-Search").val().trim() + "%')) "

    }
    if ($('#slFilterCountry').val() > 0) {
        pWhereClause += " and ID in (select PartnerID from Addresses where PartnerTypeID=" + intPartnerTypeID + " and CountryID=" + $('#slFilterCountry').val() + ")";
        $('#slFilterCountry').val(-1).change();
    }
    if (CheckValueIsValidInput('#slFilterCustomerCategory')) {
        let cID = $('#slFilterCustomerCategory').val();
        pWhereClause += ` AND CategoryID=${cID} `;
    }

    //search controls
    if ($("#srchCode").val().trim() != "") {
        var vals = IsNull($("#srchCode").val(), '').split(',');
        pWhereClause += " and (Code ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR Code";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchCustomer").val().trim() != "") {
        var vals = IsNull($("#srchCustomer").val(), '').split(',');
        pWhereClause += " and (Name ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR Name";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchCustomerLocal").val().trim() != "") {
        var vals = IsNull($("#srchCustomerLocal").val(), '').split(',');
        pWhereClause += " and (LocalName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR LocalName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchCompany").val().trim() != "") {
        var vals = IsNull($("#srchCompany").val(), '').split(',');
        pWhereClause += " and (CompanyName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR CompanyName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchPayment").val().trim() != "") {
        var vals = IsNull($("#srchPayment").val(), '').split(',');
        pWhereClause += " and (PaymentTermCode ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR PaymentTermCode";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchIsInactive").is(':checked')) {
        pWhereClause += " and (IsInactive=1)";
    }
    if ($("#srchVAT").val().trim() != "") {
        var vals = IsNull($("#srchVAT").val(), '').split(',');
        pWhereClause += " and (VATNumber ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR VATNumber";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchIsActiveUser").is(':checked')) {
        pWhereClause += " and (IsNull(IsInActiveUser,0)=0)";
    }
    if ($("#srchUser").val().trim() != "") {
        var vals = IsNull($("#srchUser").val(), '').split(',');
        pWhereClause += " and (CustomerUserUserName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR CustomerUserUserName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchCRM").is(':checked')) {
        pWhereClause += " and (SalesLeadID>0)";
    }
    if ($("#srchAccount").val().trim() != "") {
        var vals = IsNull($("#srchAccount").val(), '').split(',');
        pWhereClause += " and (AccountName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR AccountName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchPrice").val().trim() != "") {
        var vals = IsNull($("#srchPrice").val(), '').split(',');
        pWhereClause += " and (PriceListName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR PriceListName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchNotes").val().trim() != "") {
        var vals = IsNull($("#srchNotes").val(), '').split(',');
        pWhereClause += " and (Notes ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR Notes";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    return pWhereClause;
}
function Customers_LoadingWithPaging() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    var pWhereClause = Customers_GetWhereClause();
    var pOrderBy = " ID ";
    var pControllerParameters = { pPageNumber: 1, pPageSize: $("#select-page-size option:selected").text(), pWhereClause: pWhereClause }
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Customers/LoadWithPagingWithWhereClause", pWhereClause, 1, 10
        , function (pData) {
            Customers_BindTableRows(pData);
            Customers_ClearAllControls();
        });

}
function Customers_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var selectedCustomerIdsArray = $("#slOwner").val();

    var selectedCustomerIds = selectedCustomerIdsArray && selectedCustomerIdsArray.length > 0
        ? selectedCustomerIdsArray.join(",")
        : "";
    if (pDefaults.UnEditableCompanyName == "COS"
        && (($("#slCustomerCategories option:selected").text() == "Company" && $("#txtVATNumber").val().length != 9)
            || ($("#slCustomerCategories option:selected").text() == "Personal" && $("#txtVATNumber").val().length != 14)
            //|| ($("#slCustomerCategories option:selected").text() == "External" && $("#txtVATNumber").val().length != 5)
        )
    )
        swal("Sorry", "VAT No length is 9 for Company / 14 for Personal.");
    else if (IsMESCOCompany && $('#slCustomerCategories').val() == '')
        swal("Sorry", "Please, Choose Customer Categories");
    else if (IsMESCOCompany && $("#txtVATNumber").val().trim() == "" &&   !$("#cbIgnoreVATNumberValidation").prop("checked"))
        swal("Sorry", "Please, Enter VAT Number");
    else if (pDefaults.UnEditableCompanyName == "BRS" && $("#txtCustomerAddress").val().trim() == "")
        swal("Sorry", "Please, Enter Customer Address");
    else if (pDefaults.UnEditableCompanyName == "UNF" && ($("#txtVATNumber").val().trim() == "" || $("#txtIBANNumber").val().trim() == "") && !$("#cbIgnoreVATNumberValidation").prop("checked"))
        swal("Sorry", "Please, enter VAT Number and Commercial Registration Number.");
    else if (($("#txtVATNumber").val().trim() == "" || $("#txtIBANNumber").val().trim() == "")
        && pDefaults.UnEditableCompanyName != "FRE" && pDefaults.UnEditableCompanyName != "SET"
        && pDefaults.UnEditableCompanyName != "GLS" && pDefaults.UnEditableCompanyName != "GLD"
        && pDefaults.UnEditableCompanyName != "PLA" && pDefaults.UnEditableCompanyName != "WAV"
        && pDefaults.UnEditableCompanyName != "CAL" && pDefaults.UnEditableCompanyName != "RNS"
        && pDefaults.UnEditableCompanyName != "STA" && pDefaults.UnEditableCompanyName != "NIL"
        && pDefaults.UnEditableCompanyName != "EXP" && pDefaults.UnEditableCompanyName != "EF"
        && pDefaults.UnEditableCompanyName != "UNF" && pDefaults.UnEditableCompanyName != "FPL" && pDefaults.UnEditableCompanyName != "TRI"
        && !IsMESCOCompany && $("#slCustomerCategories").val() != 3)
        swal("Sorry", "Please, enter VAT number and commercial registration number.");
    else if (!$("#cbIsConsignee").prop('checked') && !$("#cbIsShipper").prop('checked'))
        swal(strPlease, strSelectShipperOrConsigneeMessage, "warning");
    else if (!pDontReloadTable && IsNull($("#txtUserPassword").val(), "0") != "0" && IsNull($("#txtUserName").val(), "0") == "0") {
        swal("Sorry", "Please, insert user name (Can't have password without username)");
    }
    else if (!pDontReloadTable && IsNull($("#txtUserPassword").val(), "0") == "0" && IsNull($("#txtUserName").val(), "0") != "0") {
        swal("Sorry", "Please, insert user password");
    } else if(IsMESCOCompany && ($("#txtVATNumber").val().includes("/") ||
        $("#txtVATNumber").val().includes("-") ||
        $("#txtVATNumber").val().includes("."))) {
        swal("Sorry", "VAT Number Cannot Include / or - or .");
    }

    else if (!pDontReloadTable) { 
        var pParametersWithValues = {
            pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
            , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
            , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
            , pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val())
            , pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase())
            , pName: $("#txtName").val().trim()
            , pLocalName: $("#txtLocalName").val().trim()
            , pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim())
            , pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim())
            , pIsConsignee: $("#cbIsConsignee").prop('checked')
            , pIsShipper: $("#cbIsShipper").prop('checked')
            , pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
            , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
            , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
            , pIsMustPay: $("#cbIsMustPay").prop('checked')
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim())
            , pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked')
            , pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim())
            , pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim())
            , pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim())
            , pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim())
            , pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID: $("#slSubAccountGroup").val()
            , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
            , pUserName: $('#txtUserName').val()
            , pUserPassword: $('#txtUserPassword').val()
            , pIsActiveUser: $('#cbIsActiveUser').prop("checked")
            , pBillingDetails: $('#txtBillingDetails').val()
            , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
            , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
            , pCustomercrmCode: $('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()
            , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
            , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()
            , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
            , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())
            , pCompanyNameShipper: $('#txtCompanyNameShipper').val() == "" || $('#txtCompanyNameShipper').val() == null ? 0 : $('#txtCompanyNameShipper').val()
            , pSenderNameShipper: $('#txtSenderNameShipper').val() == "" || $('#txtSenderNameShipper').val() == null ? 0 : $('#txtSenderNameShipper').val()
            , pAccountNo: $('#txtAccountNo').val() == "" || $('#txtAccountNo').val() == null ? 0 : $('#txtAccountNo').val()
            , pMainClient: $("#slMainClients").val() == null || $("#slMainClients").val() == "" ? 0 : $("#slMainClients").val()
            , POwnerId: ($('#slOwner option:selected').val() == "" ? 0 : $('#slOwner option:selected').val())
            , pOwnersIDs: selectedCustomerIds
            , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
            , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0

            , pCountryID: CheckValueIsValidInput("#slCountries") ? $("#slCountries").val() : 0
            , pCityID: CheckValueIsValidInput("#slCities") ? $("#slCities").val() : 0
            , pAddressLine1: CheckValueIsValidInput("#txtStreetLine1") ? $("#txtStreetLine1").val() : "0"
            , pAddressLine2: CheckValueIsValidInput("#txtStreetLine2") ? $("#txtStreetLine2").val() : "0"
            , pZipCode: CheckValueIsValidInput("#txtZipCode") ? $("#txtZipCode").val() : "0"
            , pState: CheckValueIsValidInput("#txtPrintedAs") ? $("#txtPrintedAs").val() : "0"
            , pMobile: CheckValueIsValidInput("#slMobile") ? $("#slMobile").val() : "0"

        };
        if (pDefaults.UnEditableCompanyName == 'TEU') {
            pParametersWithValues.pOwnersIDs = $('#txtShippingInstructions').val() == null || $('#txtShippingInstructions').val() == "" ? "" : $('#txtShippingInstructions').val();
        }

        InsertUpdateFunction("form", "/api/Customers/Insert", pParametersWithValues, pSaveandAddNew, "CustomerModal",
            function (pData) {
                Customers_LoadingWithPaging();
                if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
                    if (pData[2]) {
                        swal("Success", "GP Integrated Successfully");
                    } else {
                        swal("Integration Error", pData[3]);
                    }
                }
            //to reload hReadySlCustomers
            CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                , { pWhereClauseWithMinimalColumns: "WHERE 1=1", pOrderBy: "Name" }
                , function (pData) {
                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], null);
                }
                , null);
            });
    }
    else //i am refilling shippers and consignees lists in adding new customer in Quotations to show updated name incase it is updated  //i dont want to reload the slshippers or slConsignees in quotations coz this is update not newAdd
        if (pDontReloadTable == 1) // Called from Quotations-Operations Modal
            InsertUpdateFunction("form", "/api/Customers/Insert", {
                pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null || $("#txtWebsite").val() == "" ? "0" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                , pIsInactive: $("#cbIsInactive").prop('checked')
                , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                , pAccountID: 0    //incase of insert and called from oper or quot initialise as 0
                , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
                , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                , pUserName: "0"
                , pUserPassword: "0"
                , pIsActiveUser: "false"
                , pBillingDetails: $('#txtBillingDetails').val()
                , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                , pCustomercrmCode: $('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()
                , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()
                , pMainClient: $("#slMainClients").val() == null || $("#slMainClients").val() == "" ? 0 : $("#slMainClients").val()
                , pIsMustPay: (pDefaults.UnEditableCompanyName == "AKS" ? false : true)
                , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())
                , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
                , pMobile: CheckValueIsValidInput("#slMobile") ? $("#slMobile").val() : "0"


            }, pSaveandAddNew, "CustomerModal"
                , function () {
                    if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);
                    //Shippers_GetList($('#slShippers option:selected').val(), null);
                    //Consignees_GetList($('#slConsignees option:selected').val(), null);
                    //to reload hReadySlCustomers
                    /*CallGETFunctionWithParameters("/api/Customers/GetTheLastAddCustomer"
                        , null

                        , function (pData) {
                            var customer = JSON.parse(pData[0]);
                            let x = $("<option>").val(customer.ID).text(customer.Name);
                            $("#hReadySlCustomers").append(x);
                            if (customer.IsConsignee == true && customer.IsShipper == true) {
                                let newOption = $("<option>").val(customer.ID).text(customer.Name);
                                $("#slConsignees").append(newOption);
                                $("#slConsignees").trigger("change");
                                newOption = $("<option>").val(customer.ID).text(customer.Name);
                                $("#slShippers").append(newOption);
                                $("#slShippers").trigger("change");
                            } else if (customer.IsConsignee == true) {
                                let newOption = $("<option>").val(customer.ID).text(customer.Name);
                                $("#slConsignees").append(newOption);
                                $("#slConsignees").trigger("change");
                            } else if (customer.IsShipper == true) {
                                let newOption = $("<option>").val(customer.ID).text(customer.Name);
                                $("#slShippers").append(newOption);
                                $("#slShippers").trigger("change");
                            }
                            
                            //FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0]
                            //    , function () {
                            //        var pShipperID = $('#slShippers option:selected').val();
                            //        var pShipperIDAir = $('#slShippersAir option:selected').val();
                            //        var pConsigneeID = $('#slConsignees option:selected').val();
                            //        var pConsigneeIDAir = $('#slConsigneesAir option:selected').val();
                            //        var pConsigneeID2 = $('#slConsignees2 option:selected').val();
                            //        var pNotifyID = $('#slNotify option:selected').val();
                            //        var pNotifyIDAir = $('#slNotifyAir option:selected').val();

                            //        $("#slShippers").html($("#hReadySlCustomers").html());
                            //        $("#slShippersAir").html($("#hReadySlCustomers").html());
                            //        if (pShipperID != 0 || pShipperID != undefined) {
                            //            $("#slShippers").val(pShipperID);
                            //            if (pShipperIDAir != undefined)
                            //            $("#slShippersAir").val(pShipperIDAir);
                            //        }
                            //        $("#slConsignees").html($("#hReadySlCustomers").html());
                            //        $("#slConsigneesAir").html($("#hReadySlCustomers").html());
                            //        if (pConsigneeID != 0 || pConsigneeID != undefined) {
                            //            $("#slConsignees").val(pConsigneeID);
                            //            if (pConsigneeIDAir != undefined)
                            //            $("#slConsigneesAir").val(pConsigneeIDAir);
                            //        }
                            //        $("#slConsignees2").html($("#hReadySlCustomers").html());
                            //        if (pConsigneeID2 != 0 || pConsigneeID2 != undefined)
                            //            $("#slConsignees2").val(pConsigneeID2);
                            //        $("#slNotify").html($("#hReadySlCustomers").html());
                            //        $("#slNotifyAir").html($("#hReadySlCustomers").html());
                            //        if (pNotifyID != 0 || pNotifyID != undefined) {
                            //            $("#slNotify").val(pNotifyID);
                            //            if (pNotifyIDAir != undefined)
                            //            $("#slNotifyAir").val(pNotifyIDAir);
                            //        }
                            //    });
                        }
                        , null);*/
                    //ShipperContacts_GetList($('#slShipperContacts option:selected').val(), $('#slShippers option:selected').val(), function () { QuotationsEdit_ShipperContactChanged(); });
                    //ConsigneeContacts_GetList($('#slConsigneeContacts option:selected').val(), $('#slConsignees option:selected').val(), function () { QuotationsEdit_ConsigneeContactChanged(); });
                });
        else
            if (pDontReloadTable == 2) // Called  QuotationsEdit
                InsertUpdateFunction("form", "/api/Customers/Insert", {
                    pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                    , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                    , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                    , pIsInactive: $("#cbIsInactive").prop('checked')
                    , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                    , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                    , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                    , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                    , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
                    , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                    , pUserName: "0"
                    , pUserPassword: "0"
                    , pIsActiveUser: "false"
                    , pIsMustPay: (pDefaults.UnEditableCompanyName == "AKS" ? false : true)
                    , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                    , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())

                    , pBillingDetails: $('#txtBillingDetails').val()
                    , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                    , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                    , pCustomercrmCode: $('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()
                    , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                    , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()
                    , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                    , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
                }, pSaveandAddNew, "CustomerModal"
                    , function () {
                        if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);

                        //Shippers_GetList($('#slShippers option:selected').val(), null);
                        //Consignees_GetList($('#slConsignees option:selected').val(), null);
                        //to reload hReadySlCustomers
                        CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                            , { pWhereClauseWithMinimalColumns: "WHERE 1=1", pOrderBy: "Name" }
                            , function (pData) {
                                FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0]
                                    , function () {
                                        $("#slShippers").html($("#hReadySlCustomers").html());
                                        if ($('#slShippers option:selected').val() != 0)
                                            $("#slShippers").val($('#slShippers option:selected').val());
                                        $("#slConsignees").html($("#hReadySlCustomers").html());
                                        if ($('#slConsignees option:selected').val() != 0)
                                            $("#slConsignees").val($('#slConsignees option:selected').val());
                                    });
                            }
                            , null);
                        //Notify_GetList($('#slNotify option:selected').val(), null);

                        ShipperContacts_GetList($('#slShipperContacts option:selected').val(), $('#slShippers option:selected').val(), function () {/* OperationsEdit_ShipperContactChanged(); */ });
                        ConsigneeContacts_GetList($('#slConsigneeContacts option:selected').val(), $('#slConsignees option:selected').val(), function () {/* OperationsEdit_ConsigneeContactChanged(); */ });
                        //NotifyContacts_GetList($('#slNotifyContacts option:selected').val(), $('#slNotify option:selected').val(), function () {/* OperationsEdit_NotifyContactChanged(); */ });

                    });

            else
                if (pDontReloadTable == 3) // Called from OperationPartners
                    InsertUpdateFunction("form", "/api/Customers/Insert", {
                        pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: ($("#txtCode").val().trim() == "" ? 0 : $("#txtCode").val().trim().toUpperCase()), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                        , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                        , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                        , pIsInactive: $("#cbIsInactive").prop('checked')
                        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                        , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                        , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                        , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                        , pAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pSubAccountID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pCostCenterID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pSubAccountGroupID: 0 //incase of insert and called from oper or quot initialise as 0
                        , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                        , pUserName: "0"
                        , pUserPassword: "0"
                        , pIsActiveUser: "false"
                        , pBillingDetails: $('#txtBillingDetails').val()
                        , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                        , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                        , pCustomercrmCode: $('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()
                        , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                        , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()
                        , pIsMustPay: (pDefaults.UnEditableCompanyName == "AKS" ? false : true)
                        , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                        , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())
                        , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                        , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0

                    }, pSaveandAddNew, "CustomerModal"
                        , function () {
                            debugger;
                            if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);
                            //PartnerNames_GetList($('#slPartners_Customers option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
                            //to reload hReadySlCustomers
                            CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                                , { pWhereClauseWithMinimalColumns: "WHERE 1=1", pOrderBy: "Name" }
                                , function (pData) {
                                    FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0]
                                        , function () {
                                            PartnerNames_GetList($('#slPartners_Customers option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
                                        });
                                }
                                , null);
                        });
}
function Customers_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var selectedCustomerIdsArray = $("#slOwner").val();

    var selectedCustomerIds = selectedCustomerIdsArray && selectedCustomerIdsArray.length > 0
        ? selectedCustomerIdsArray.join(",")
        : "";
    if ((pDefaults.UnEditableCompanyName == "COS" || IsMESCOCompany )
        && (($("#slCustomerCategories option:selected").text() == "Company" && $("#txtVATNumber").val().length != 9)
            || ($("#slCustomerCategories option:selected").text() == "Personal" && $("#txtVATNumber").val().length != 14)
            //|| ($("#slCustomerCategories option:selected").text() == "External" && $("#txtVATNumber").val().length != 5)
        )
    )
        swal("Sorry", "VAT No length is 9 for Company / 14 for Personal.");

    else if (IsMESCOCompany &&
        $("#txtVATNumber").val().trim() == "" &&
        !$("#cbIgnoreVATNumberValidation").prop("checked"))
        swal("Sorry", "Please, Enter VAT Number");
    else if (IsMESCOCompany && $('#slCustomerCategories').val() == '')
        swal("Sorry", "Please, Choose Customer Categories");
    else if (pDefaults.UnEditableCompanyName == "UNF" && ($("#txtVATNumber").val().trim() == "" || $("#txtIBANNumber").val().trim() == "") && !$("#cbIgnoreVATNumberValidation").prop("checked"))
        swal("Sorry", "Please, enter VAT Number and Commercial Registration Number.");
    else if (($("#txtVATNumber").val().trim() == "" || $("#txtIBANNumber").val().trim() == "")
        && pDefaults.UnEditableCompanyName != "FRE" && pDefaults.UnEditableCompanyName != "SET"
        && pDefaults.UnEditableCompanyName != "GLS" && pDefaults.UnEditableCompanyName != "GLD"
        && pDefaults.UnEditableCompanyName != "PLA" && pDefaults.UnEditableCompanyName != "WAV"
        && pDefaults.UnEditableCompanyName != "CAL" && pDefaults.UnEditableCompanyName != "RNS"
        && pDefaults.UnEditableCompanyName != "STA" && pDefaults.UnEditableCompanyName != "NIL"
        && pDefaults.UnEditableCompanyName != "UNF" && pDefaults.UnEditableCompanyName != "EXP"
        && pDefaults.UnEditableCompanyName != "EF" && pDefaults.UnEditableCompanyName != "FPL"
        && !IsMESCOCompany && $("#slCustomerCategories").val() != 3)
        swal("Sorry", "Please, enter VAT Number and Commercial Registration Number.");
    else if (!$("#cbIsConsignee").prop('checked') && !$("#cbIsShipper").prop('checked'))
        swal(strPlease, strSelectShipperOrConsigneeMessage, "warning");
    else if (!pDontReloadTable && IsNull($("#txtUserPassword").val(), "0") != "0" && IsNull($("#txtUserName").val(), "0") == "") {
        swal("Sorry", "Please, Insert User Name (Can't have password without username)");
    }
    else if (!pDontReloadTable && IsNull($("#hCustomerUserID").val(), "0") != "0" && IsNull($("#txtUserName").val(), IsNull($("#hOldCustomerUserName").val(), "0")) == "0") {

        swal("Sorry", "Please, Insert User Name (Can't have password without username)");
    }
    else if (!pDontReloadTable) {//normal call from itself (not from Quotations or Operations)
        let CID = $("#hID").val();
        var pParametersWithValues = {
            pID: $("#hID").val(), pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
            , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
            , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
            , pIsInactive: $("#cbIsInactive").prop('checked')
            , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
            , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
            , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
            , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
            , pAccountID: $("#slAccount").val()
            , pSubAccountID: $("#slSubAccount").val()
            , pCostCenterID: $("#slCostCenter").val()
            , pSubAccountGroupID:( $("#slSubAccountGroup").val() == null ? 0 : $("#slSubAccountGroup").val())
            , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
            , pUserID: IsNull($("#hCustomerUserID").val(), "0")
            , pUserName: IsNull($("#txtUserName").val(), IsNull($("#hOldCustomerUserName").val(), "0"))
            , pOldUserName: IsNull($("#hOldCustomerUserName").val(), "0")
            , pIsActiveUser: $('#cbIsActiveUser').is(':checked')
            , pOldIsInActiveUser: IsNull($("#cbOldIsActive").val(), "true")
            , pIsMustPay: $("#cbIsMustPay").prop('checked')
            , pPassword: IsNull($("#txtUserPassword").val(), "0")

            , pBillingDetails: $('#txtBillingDetails').val()
            , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
            , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
            , pCustomercrmCode: "0" /*$('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()*/
            , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
            , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()

            , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
            , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())

            , pCompanyNameShipper: $('#txtCompanyNameShipper').val() == "" || $('#txtCompanyNameShipper').val() == null ? 0 : $('#txtCompanyNameShipper').val()
            , pSenderNameShipper: $('#txtSenderNameShipper').val() == "" || $('#txtSenderNameShipper').val() == null ? 0 : $('#txtSenderNameShipper').val()
            , pAccountNo: $('#txtAccountNo').val() == "" || $('#txtAccountNo').val() == null ? 0 : $('#txtAccountNo').val()
            , pMainClientID: $("#slMainClients").val() == null || $("#slMainClients").val() == "" ? 0 : $("#slMainClients").val()
            , pOwnersIDs: selectedCustomerIds
            , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
            , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
            , pMobile: CheckValueIsValidInput("#slMobile") ? $("#slMobile").val() : "0"

        };
        if (pDefaults.UnEditableCompanyName == 'TEU') { pParametersWithValues.pOwnersIDs = $('#txtShippingInstructions').val() == null || $('#txtShippingInstructions').val() == "" ? "" : $('#txtShippingInstructions').val(); }
        if (IsMESCOCompany && CustomersCanDelete) {
            pParametersWithValues.pCreationDate = ConvertDateFormat($("#txtCustomerCreationDate").val());
        }
        InsertUpdateFunction("form", "/api/Customers/Update", pParametersWithValues, pSaveandAddNew, "CustomerModal", function () {
            if ($("#slCreditLimit").val() != "0") {
                CallGETFunctionWithParameters("/api/Customers/InsertCustomerLimit", { pcustomerLimitID: customerLimitID, pCustomerID: $("#hID").val(), pDefaultCurrencyID: $("#hDefaultCurrencyID").val(), pLimitID: $("#slCreditLimit").val(), pDate: ConvertDateFormat($('#txtDate').val()) }
                    , function (pData) {
                        debugger;

                    }, null);
            }

            if (pDefaults.UnEditableCompanyName == "LATT") {
                CallPOSTFunctionWithParameters("api/DynamicsGP/UpdateCustomer", CID , function (pData) {
                    if (pData.IsSuccess) {
                        swal("Success", "Integrated Successfully");
                    } else {
                        if (pData.Message != "")
                            swal("Sorry", pData.Message);
                    }
                });
            }

            Customers_LoadingWithPaging();

        });
  }  else //i am refilling shippers and consignees lists in adding new customer in Quotations or Operations to show updated name incase it is updated  //i dont want to reload the slshippers or slConsignees in quotations coz this is update not newAdd
        if (pDontReloadTable == 1) // Called from Quotations-Operations Modal
            InsertUpdateFunction("form", "/api/Customers/Update", {
                pID: $("#hID").val()
                , pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val())
                , pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val())
                , pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val())
                , pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val())
                , pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                , pIsInactive: $("#cbIsInactive").prop('checked')
                , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                , pAccountID: -1    //called from operations or quotations, so don't update ERP
                , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
                , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                , pUserID: "0"
                , pUserName: "0"
                , pOldUserName: "0"
                , pIsActiveUser: "false"
                , pOldIsInActiveUser: "false"
                , pPassword: "0"
                , pIsMustPay: $("#cbIsMustPay").prop('checked')
                , pBillingDetails: $('#txtBillingDetails').val()
                , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                , pCustomercrmCode: "0" /*$('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()*/
                , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()
                , pMainClientID: $("#slMainClients").val() == null || $("#slMainClients").val() == "" ? 0 : $("#slMainClients").val()

                , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())

                , pCompanyNameShipper: $('#txtCompanyNameShipper').val() == "" || $('#txtCompanyNameShipper').val() == null ? 0 : $('#txtCompanyNameShipper').val()
                , pSenderNameShipper: $('#txtSenderNameShipper').val() == "" || $('#txtSenderNameShipper').val() == null ? 0 : $('#txtSenderNameShipper').val()
                , pAccountNo: $('#txtAccountNo').val() == "" || $('#txtAccountNo').val() == null ? 0 : $('#txtAccountNo').val()
                , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
            }, pSaveandAddNew, "CustomerModal"
                , function () {
                    if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);
                    //Shippers_GetList($('#slShippers option:selected').val(), null);
                    //Consignees_GetList($('#slConsignees option:selected').val(), null);

                    //ShipperContacts_GetList($('#slShipperContacts option:selected').val(), $('#slShippers option:selected').val(), function () { QuotationsEdit_ShipperContactChanged(); });
                    //ConsigneeContacts_GetList($('#slConsigneeContacts option:selected').val(), $('#slConsignees option:selected').val(), function () { QuotationsEdit_ConsigneeContactChanged(); });
                    //PartnerNames_GetList($('#slPartners_Customers option:selected').val(), null);
                });
        else
            if (pDontReloadTable == 2)  // Called  QuotationsEdit
                InsertUpdateFunction("form", "/api/Customers/Update", {
                    pID: $("#hID").val(), pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                    , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                    , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                    , pIsInactive: $("#cbIsInactive").prop('checked')
                    , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                    , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                    , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                    , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                    , pAccountID: -1    //called from operations or quotations, so don't update ERP
                    , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                    , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                    , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
                    , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                    , pUserID: "0"
                    , pUserName: "0"
                    , pOldUserName: "0"
                    , pIsActiveUser: "false"
                    , pOldIsInActiveUser: "false"
                    , pPassword: "0"
                    , pIsMustPay: $("#cbIsMustPay").prop('checked')
                    , pBillingDetails: $('#txtBillingDetails').val()
                    , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                    , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                    , pCustomercrmCode: "0" /*$('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()*/
                    , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                    , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()

                    , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                    , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())

                    , pCompanyNameShipper: $('#txtCompanyNameShipper').val() == "" || $('#txtCompanyNameShipper').val() == null ? 0 : $('#txtCompanyNameShipper').val()
                    , pSenderNameShipper: $('#txtSenderNameShipper').val() == "" || $('#txtSenderNameShipper').val() == null ? 0 : $('#txtSenderNameShipper').val()
                    , pAccountNo: $('#txtAccountNo').val() == "" || $('#txtAccountNo').val() == null ? 0 : $('#txtAccountNo').val()
                    , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                    , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
                }, pSaveandAddNew, "CustomerModal"
                    , function () {
                        if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);
                        Shippers_GetList($('#slShippers option:selected').val(), null);
                        Consignees_GetList($('#slConsignees option:selected').val(), null);
                        //Notify_GetList($('#slNotify option:selected').val(), null);

                        ShipperContacts_GetList($('#slShipperContacts option:selected').val(), $('#slShippers option:selected').val(), function () { QuotationsEdit_ShipperContactChanged(0); });
                        ConsigneeContacts_GetList($('#slConsigneeContacts option:selected').val(), $('#slConsignees option:selected').val(), function () { QuotationsEdit_ConsigneeContactChanged(0); });
                        //NotifyContacts_GetList($('#slNotifyContacts option:selected').val(), $('#slNotify option:selected').val(), function () {/* OperationsEdit_NotifyContactChanged(); */ });
                        //PartnerNames_GetList($('#slPartners_Customers option:selected').val(), null);
                    });
            else
                if (pDontReloadTable == 3) // Called from OperationPartners
                        InsertUpdateFunction("form", "/api/Customers/Update", {
                        pID: $("#hID").val(), pPaymentTermID: ($('#slPaymentTerms option:selected').val() == "" ? 0 : $('#slPaymentTerms option:selected').val()), pCurrencyID: ($('#slCurrencies option:selected').val() == "" ? 0 : $('#slCurrencies option:selected').val()), pTaxeTypeID: ($('#slTaxeTypes option:selected').val() == "" ? 0 : $('#slTaxeTypes option:selected').val()), pSalesmanID: ($('#slSalesmen option:selected').val() == "" ? 0 : $('#slSalesmen option:selected').val()), pCode: $("#txtCode").val().trim(), pName: $("#txtName").val().trim(), pLocalName: $("#txtLocalName").val().trim(), pWebsite: ($("#txtWebsite").val() == null ? "" : $("#txtWebsite").val().trim()), pEmail: ($("#txtCustomerEmail").val() == null ? "" : $("#txtCustomerEmail").val().trim()), pIsConsignee: $("#cbIsConsignee").prop('checked'), pIsShipper: $("#cbIsShipper").prop('checked'), pIsInternalCustomer: $("#cbIsInternalCustomer").prop('checked')
                        , pIsExternal: $("#cbIsExternalCustomer").prop('checked')
                        , pIsRelated: $("#cbIsRelatedCustomer").prop('checked')
                        , pIsInactive: $("#cbIsInactive").prop('checked')
                        , pNotes: ($("#txtNotes").val() == null ? "" : $("#txtNotes").val().trim())
                        , pAddress: ($("#txtCustomerAddress").val() == null ? "" : $("#txtCustomerAddress").val().trim())
                        , pPhonesAndFaxes: ($("#txtCustomerPhonesAndFaxes").val() == null ? "" : $("#txtCustomerPhonesAndFaxes").val().trim())
                        , pVATNumber: ($("#txtVATNumber").val() == null ? "" : $("#txtVATNumber").val().trim()), pIsConsolidatedInvoice: $("#cbIsConsolidatedInvoice").prop('checked'), pBankName: ($("#txtBankName").val() == null ? "" : $("#txtBankName").val().trim()), pBankAddress: ($("#txtBankAddress").val() == null ? "" : $("#txtBankAddress").val().trim()), pSwift: ($("#txtSwift").val() == null ? "" : $("#txtSwift").val().trim()), pBankAccountNumber: ($("#txtBankAccountNumber").val() == null ? "" : $("#txtBankAccountNumber").val().trim()), pIBANNumber: ($("#txtIBANNumber").val() == null ? "" : $("#txtIBANNumber").val().trim())
                        , pAccountID: -1    //called from operations or quotations, so don't update ERP
                        , pSubAccountID: -1 //called from operations or quotations, so don't update ERP
                        , pCostCenterID: -1 //called from operations or quotations, so don't update ERP
                        , pSubAccountGroupID: -1 //called from operations or quotations, so don't update ERP
                        , pPriceList: $('#slPriceList').val() == "" || $('#slPriceList').val() == null ? 0 : $('#slPriceList').val()
                        , pUserID: "0"
                        , pUserName: "0"
                        , pOldUserName: "0"
                        , pIsActiveUser: "false"
                        , pOldIsInActiveUser: "false"
                        , pPassword: "0"
                        , pIsMustPay: $("#cbIsMustPay").prop('checked')
                        , pBillingDetails: $('#txtBillingDetails').val()
                        , pIsOriginalCMRbyPost: $('#cbIsOriginalCMRbyPost').is(':checked')
                        , pCustomerShippingDetails: $('#txtCustomerShippingDetails').val()
                        , pCustomercrmCode: "0" /*$('#txtcrmCode').val() == "" || $('#txtcrmCode').val() == null ? "0" : $('#txtcrmCode').val()*/
                        , pCustomerFinance365Ref: $('#txtFinance365Ref').val() == "" || $('#txtFinance365Ref').val() == null ? "0" : $('#txtFinance365Ref').val()
                        , pCategoryID: $('#slCustomerCategories').val() == "" || $('#slCustomerCategories').val() == null ? 0 : $('#slCustomerCategories').val()

                        , pForeignExporterNo: ($('#txtForeignExporterNo').val() == null || $('#txtForeignExporterNo').val() == "" ? 0 : $('#txtForeignExporterNo').val())
                        , pForeignExporterCountryID: ($('#slForeignExporterCountry').val() == null || $('#slForeignExporterCountry').val() == "" ? 0 : $('#slForeignExporterCountry').val())

                        , pCompanyNameShipper: $('#txtCompanyNameShipper').val() == "" || $('#txtCompanyNameShipper').val() == null ? 0 : $('#txtCompanyNameShipper').val()
                        , pSenderNameShipper: $('#txtSenderNameShipper').val() == "" || $('#txtSenderNameShipper').val() == null ? 0 : $('#txtSenderNameShipper').val()
                        , pAccountNo: $('#txtAccountNo').val() == "" || $('#txtAccountNo').val() == null ? 0 : $('#txtAccountNo').val()
                        , pBranchID: CheckValueIsValidInput("#slCustomerBranchID") ? $("#slCustomerBranchID").val() : 0
                        , pDebitorGroupID: CheckValueIsValidInput("#slCustomerDebitorGroupID") ? $("#slCustomerDebitorGroupID").val() : 0
                    }, pSaveandAddNew, "CustomerModal"
                        , function () {
                            if (pSaveandAddNew) Customers_ClearAllControls(pDontReloadTable);
                            PartnerNames_GetList($('#slPartners_Customers option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
                        });
}

function Customers_DeleteList() {
    debugger;
    if (GetAllSelectedIDsAsString('tblCustomers') != "") {

        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        var SubAccountsIDs = GetAllSelectedSubAccountIDsAsString('tblCustomers');
        CallGETFunctionWithParameters("/api/Customers/CheckIfSubAccountExistInAccounting"
            , { pSubAccountIDs: SubAccountsIDs }
            , function (NumberOfRecords) {
                if (NumberOfRecords != 0) {
                    swal(strSorry, "Can not delete because some records are connected to Accounting")
                } else {

                    // show delete message
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
                            DeleteListFunction("/api/Customers/Delete", { "pCustomersIDs": GetAllSelectedIDsAsString('tblCustomers') }, function () {
                                Customers_LoadingWithPaging(
                                    //this is callback in Customers_LoadingWithPaging
                                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                                );

                                CallGETFunctionWithParameters("/api/Customers/LoadAllWithMinimalColumns"
                                    , { pWhereClauseWithMinimalColumns: "WHERE 1=1", pOrderBy: "Name" }
                                    , function (pData) {
                                        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "hReadySlCustomers", pData[0], null);
                                    }
                                    , null);
                            });
                            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
                        });
                }
            }
            , null);



    }

}

function Customers_CreateSalesLeadFromCustomers() {

    if (GetAllSelectedIDsAsString('tblCustomers') != "") {



        CallGETFunctionWithParameters("/api/Customers/CreateSalesLeadFromCustomers", { "pCustomersIDs": GetAllSelectedIDsAsString('tblCustomers') }, function (pData) {

            if (IsNull(pData[0], "0") != "0") {

                swal("Sorry", pData[0], "warning");
            }
            else {
                Customers_LoadingWithPaging(
                    //this is callback in Customers_LoadingWithPaging
                    //function() {swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");}
                );
                swal("Activated Successfully!");
            }



        });
    }
    else {


        swal("Please Select Customers ..");
    }
}




var customerLimitID = 0;
var slSubAccountGroup;
function Customers_FillControls(pID, pDontLoadTable) {
    //Customers_ClearAllControls(function () {
    //next line is to check if row is locked by another user
    //Check("/api/Customers/CheckRow", { 'pID': pID }, function () {
    // Fill All Modal Controls
    var tr = $("tr[ID='" + pID + "']");
    debugger;
    $("#hID").val(pID);
    $("#cbOldIsActive").val($(tr).find("td.IsInActiveUser").attr('val'));
    $("#cbIsMustPay").prop('checked',$(tr).find("td.IsMustPay").attr('val') == 'true' ? true : false);
    $("#hCustomerUserID").val($(tr).find("td.CustomerUserID").attr('val'));
    $("#hOldCustomerUserName").val($(tr).find("td.CustomerUserUserName").attr('val'));
    $('#txtUserName').val($(tr).find("td.CustomerUserUserName").attr('val'));
    $('#slMobile').val($(tr).find("td.Mobile").attr('val'));
    $('#cbIsActiveUser').prop('checked', ($(tr).find("td.IsInActiveUser").find('input').prop('checked')));
    $('#txtUserPassword').val("");
    // $(tr).find('td.IsShipper').find('input').attr('val')
    $("#slSubAccountGroup").val($(tr).find("td.SubAccountGroupID").text());
    slSubAccountGroup = $(tr).find("td.SubAccountGroupID").text();
    if (pDefaults.CompanyName == "EVLGERMANY")
        $("#txtCode").prop('disabled', false);
    $('#slCustomerBranchID').val($(tr).find("td.BranchID").attr('val'));
    $('#slCustomerDebitorGroupID').val($(tr).find("td.DebitorGroupID").attr('val'));

    if (IsMESCOCompany || pDefaults.UnEditableCompanyName == "LATT") {
        $("#txtcrmCode").parent().removeClass("hide");
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "AKS") {
        $("#txtcrmCode").parent().removeClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
        $("#btnCopyFromMainAddress").removeClass("hide");
        $("#btnAddressSave").removeClass("hide");
        $("#btnAddressSaveandNew").removeClass("hide");
        $("#slAddressTypes").parent().removeClass("hide");

    }

    if (IsMESCOCompany && CustomersCanDelete) {
        $("#txtCustomerCreationDate").parent().removeClass("hide");
        $("#txtCustomerCreationDate").val($(tr).find("td.CreationDate").text());
    }

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
    if ($(tr).find("td.IsExternal").find('input').prop('checked')
        || ($(tr).find("td.OperationCount").text() == 0 && $(tr).find("td.SubAccountID").text() == 0)) {
        $("#txtName").removeAttr("disabled");
        $("#txtLocalName").removeAttr("disabled");
    }
    else {
        $("#txtName").attr("disabled", "disabled");
        $("#txtLocalName").attr("disabled", "disabled");
    }
    //the next 6 lines are to set the slPaymentTerms, slCurrencies and slTaxeTypes to the value entered before
    var pSalesmanID = $(tr).find("td.SalesmanID").attr('val'); //store the val in a var to be re-entered in the select box
    Salesmen_GetList(pSalesmanID, null);
    var pPaymentTermID = $(tr).find("td.PaymentTermID").attr('val');
    PaymentTerms_GetList(pPaymentTermID, null);
    var pCurrencyID = $(tr).find("td.CurrencyID").attr('val');
    Currencies_GetList(pCurrencyID, null);
    var pTaxeTypeID = $(tr).find("td.TaxeTypeID").attr('val');
    TaxeTypes_GetList(pTaxeTypeID, null);
    var pPriceListID = $(tr).find("td.PriceList").text();
    if (pDefaults.UnEditableCompanyName != "GBL")
        PriceList_GetList(pPriceListID, null);

    var pCategoryID = $(tr).find("td.CategoryID").text();
    SL_CustomerCategories_GetList(pCategoryID, null);
    //the next line is to get the Customer addresses and Contacts info (PartnerTypeID for Customers is 8)
    Addresses_LoadWithPagingWithWhereClause(intPartnerTypeID);
    //CustomerRate_LoadWithPagingWithWhereClause(intPartnerTypeID);
    //*******
    PartnersBanks_LoadWithPagingWithWhereClause(intPartnerTypeID);
    //*******
    CustomerNetwork_LoadingWithPagingForModal(pID);
    CustomerSL_SalesMan_LoadingWithPagingForModal(pID);
    CustomerSL_Regions_LoadingWithPagingForModal(pID);
    GetListWithName($(tr).find("td.ForeignExporterCountryName").text(), "/api/Countries/LoadAll?pWhereClause=WHERE 1 = 1", "Select", "slForeignExporterCountry");
    GetListWithName($(tr).find("td.OwnerId").text(), "/api/Owners/LoadAll", "Select", "slOwner");

   

    Contacts_LoadWithPagingWithWhereClause(intPartnerTypeID);
    debugger;
    $("#tblUploadedFiles_Customers tbody").html("");

    $("#lblShown").html(": " + $(tr).find("td.Name").text());
    $("#txtCode").val($(tr).find("td.Code").text());
    $("#txtName").val($(tr).find("td.Name").text());
    $("#txtLocalName").val($(tr).find("td.LocalName").text());
    $("#txtWebsite").val($(tr).find("td.Website").text());
    $("#txtCustomerEmail").val($(tr).find("td.CustomerEmail").text());
    $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
    $("#cbIsConsignee").prop('checked', $(tr).find('td.IsConsignee').find('input').attr('val'));
    $("#cbIsShipper").prop('checked', $(tr).find('td.IsShipper').find('input').attr('val'));
    $("#cbIsInternalCustomer").prop('checked', $(tr).find('td.IsInternalCustomer').find('input').attr('val'));
    $("#cbIsExternalCustomer").prop('checked', $(tr).find('td.IsExternalCustomer').find('input').attr('val'));
    $("#cbIsRelatedCustomer").prop('checked', $(tr).find('td.IsRelatedCustomer').find('input').attr('val'));
    $("#cbIsInactive").prop('checked', $(tr).find('td.IsInactive').find('input').attr('val'));
    $("#txtNotes").val($(tr).find("td.Notes").text());
    $("#txtSites").val($(tr).find("td.Sites").text());
    $("#txtForeignExporterNo").val($(tr).find("td.ForeignExporterNo").text());



    $("#slMainClients").val($(tr).find("td.MainClient").text());
    $("#slOwner").val($(tr).find("td.OwnerId").text());
    if (pDefaults.UnEditableCompanyName == 'TEU')
        $('#txtShippingInstructions').val($(tr).find("td.OwnerIds").text());

    $("#slOwner").val($(tr).find("td.OwnerIds").text().split(",")).change();


    $("#cbIsOriginalCMRbyPost").prop('checked', ($(tr).find('td.OriginalCMRbyPost').text() == "true" ? true : false));
    $("#txtBillingDetails").val($(tr).find("td.BillingDetails").text());
    $("#txtCustomerShippingDetails").val($(tr).find("td.ShippingDetails").text());
    $("#txtcrmCode").val($(tr).find("td.crmCode").text());
    $("#txtFinance365Ref").val($(tr).find("td.Finance365Ref").text());

    $("#txtCompanyNameShipper").val($(tr).find("td.CompanyName").text());
    $("#txtSenderNameShipper").val($(tr).find("td.SenderName").text());
    $("#txtAccountNo").val($(tr).find("td.AccountNo").text());

    //////FILL LIMIT
    $("#txtDate").val(getTodaysDateInddMMyyyyFormat());
    var TotalLimit = 0;
    customerLimitID = 0;
    LimitID = 0;

    var pParametersWithValues =
    {
        pCustID: pID
    };
    CallGETFunctionWithParameters("/api/Customers/GetCustomerLimit", pParametersWithValues
        , function (pData) {
            debugger;
            if (pData.length > 0) {
                $.each(JSON.parse(pData), function (i, item) {
                    // TotalLimit += item.Limit
                    customerLimitID = item.ID;
                    LimitID = item.LimitID;
                    $("#slCreditLimit").val(item.LimitID);

                    $("#txtDate").val(GetDateFromServer(item.Date));
                    //get balance while change combo limit
                    if ($("#slCreditLimit").val() != "0") {
                        debugger;
                        $.getJSON("/api/Customers/getCustomerCreditLimitBalance", { pIsCust: 0, pCustomerID: $("#hID").val(), plimitID: $("#slCreditLimit").val() }, function (Result) {
                            if (Result.length > 0) {
                                debugger;
                                $("#txtBalance").val(Result)

                            }

                        });
                    }
                }
                );
            }
            // $("#slCreditLimit").val(LimitID.text());


        }
        , null);

    //$("#slCreditLimit").val(LimitID);
    //////////////////

    ////////////////////////
    $("#txtCustomerAddress").val($(tr).find("td.Address").text());
    $("#txtCustomerPhonesAndFaxes").val($(tr).find("td.PhonesAndFaxes").text());

    $("#txtVATNumber").val($(tr).find("td.VATNumber").text());
    $("#cbIsConsolidatedInvoice").prop('checked', $(tr).find('td.IsConsolidatedInvoice').find('input').attr('val'));
    $("#txtBankName").val($(tr).find("td.BankName").text());
    $("#txtBankAddress").val($(tr).find("td.BankAddress").text());
    $("#txtSwift").val($(tr).find("td.Swift").text());
    $("#txtBankAccountNumber").val($(tr).find("td.BankAccountNumber").text());
    $("#txtIBANNumber").val($(tr).find("td.IBANNumber").text());

    Customers_GeneralUpload_Initialise();

    //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSave").attr("onclick", "Customers_Update(false, pDontLoadTable);");
        $("#btnSaveandNew").attr("onclick", "Customers_Update(true, pDontLoadTable);");
    }
    else {
        $("#btnSave").attr("onclick", "Customers_Update(false);");
        $("#btnSaveandNew").attr("onclick", "Customers_Update(true);");
    }

    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Customers_ShowHideTabs();
    //}
    //, intPartnerTypeID);
    //});
    if (pDefaults.UnEditableCompanyName == 'TEU') {
        $('#txtFinance365Ref').parent().removeClass('hide');
        $('#txtFinance365Ref').parent().find("label").text("Invoicing Instructions");
        $('#txtFinance365Ref').attr("placeholder", "Invoicing Instructions");
        $('#txtFinance365Ref').attr("data-required", "false");

        $('#txtSwift').parent().removeClass('hide');
        $('#txtSwift').parent().find("label").text("Limit");
        $('#txtSwift').attr("placeholder", "Limit");
        $('#txtSwift').attr("data-required", "false");

        $('#txtBankAddress').parent().removeClass('hide');
        $('#txtBankAddress').parent().find("label").text("Duration");
        $('#txtBankAddress').attr("placeholder", "Duration");
        $('#txtBankAddress').attr("data-required", "false");

        $('#txtShippingInstructions').parent().removeClass('hide');
        $('#txtShippingInstructions').val($(tr).find("td.OwnerIds").text());

    }
    if ($("#txtcrmCode").val() == '0' && IsMESCOCompany) {
        $("#txtName").removeAttr("disabled");
        $("#txtLocalName").removeAttr("disabled");
    }
}
function LogCustomerCreditLimitModal() {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    var pID = $("#hID").val();
    var tr = $("tr[ID='" + pID + "']");

    $("#lblTaxeTypeCode").text($(tr).find("td.Name").text());
    strLoadWithPagingFunctionName = "/api/Customers/CustomerCreditLoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "LogCustomerCredit_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    var pOrderBy = " date DESC ";
    LoadWithPagingForModal(strLoadWithPagingFunctionName, pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim(), function (pTabelRows) {
        LogCustomerCredit_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
        //if ($("#txt-Search").val() != "" && $("#txt-Search").val() != undefined)
        //    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());
    });
}

// Bind LogTaxesPercentages Table Rows
function LogCustomerCredit_BindTableRows(pLogTaxesPercentages) {
    debugger;
    //strLoadWithPagingFunctionName = "/api/LogTaxesPercentages/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    //strBindTableRowsFunctionName = "LogTaxesPercentages_BindTableRows";

    ClearAllTableRows("tblLogTaxesPercentages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pLogTaxesPercentages, function (i, item) {
        //jQuery.noConflict();
        AppendRowtoTable("tblLogTaxesPercentages",
            ("<tr ID='" + item.ID + "'>"
                //+ "<td class='LogTaxesPercentageID'> <input name='Delete' type='checkbox' value='" + item.LogTaxesPercentageID + "' /></td>"
                //+ "<td class='Code'>" + item.Code + "</td>"
                //+ "<td class='Name'>" + item.Name + "</td>"
                //+ "<td class='LocalName'>" + item.LocalName + "</td>"
                + "<td class='date'>" + ConvertDateFormat(GetDateWithFormatMDY(item.date)) + "</td>"
                + "<td class='CreditLimit'>" + item.CreditLimit + "</td></tr>"));
        //+ "<td class='Notes'>" + item.Notes + "</td>"
        //+ "<td class='IsInactive'> <input type='checkbox' disabled='disabled' val='" + (item.IsInactive == true ? "true' checked='checked'" : "'") + " /></td>"
        //+ "<td><a href='#LogTaxesPercentagesModal' data-toggle='modal' onclick='LogTaxesPercentages_LoadingWithPagingForModal(" + item.ID + ");' " + editLogTaxesPercentagesText + "</a></td>"
        //+ "<td><a href='#TaxeTypeModal' data-toggle='modal' onclick='TaxeTypes_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
        //+ "<td><a data-target='#TaxeTypeModal' data-toggle='modal' " + editControlsText + "</a></td></tr>"));
        debugger;
    });
    debugger;
    BindAllCheckboxonTable("tblLogTaxesPercentages", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblLogTaxesPercentages>tbody>tr", $("#txt-Search").val().trim());

}
function LogPercentages_ResetFunctionsNames() {
    //strLoadWithPagingFunctionName = "/api/TaxeTypes/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Customers_BindTableRows";
}
//IsNotify parameter is for mesco companies to know that the new added customer will be a notify --MustafaMahmoud
function Customers_ClearAllControls(pDontLoadTable,ShowIgnoreVATNumberCheckbox) {
    //ClearAllControls(new Array("hID", "txtCode", "txtName", "txtLocalName", "txtWebsite", "txtNotes", "txtVATNumber", "txtBankName", "txtBankAddress", "txtSwift", "txtBankAccountNumber", "txtIBANNumber"),
    //    new Array("slPaymentTerms", "slCurrencies", "slTaxeTypes"), new Array("cbIsInactive", "cbIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $("#CustomerModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#CustomerModal").addClass("hide");" in Quotations.js
    ClearAll("#CustomerModal", null);
    //if (ShowIgnoreVATNumberCheckbox && IsMESCOCompany)
    //    $("#cbIgnoreVATNumberValidation").parent().parent().removeClass("hide");
    //else {
    //    $("#cbIgnoreVATNumberValidation").prop("checked", false);
    //    $("#cbIgnoreVATNumberValidation").parent().parent().addClass("hide");
    //}
    if (pDefaults.UnEditableCompanyName == "UNF") {
        //$("#txtVATNumber").attr("data-required", "false");
        //$("#txtIBANNumber").attr("data-required", "false");
    }
    if (IsMESCOCompany) {
        $("#cbIgnoreVATNumberValidation").parent().parent().removeClass("hide");
        $("#txtFinance365Ref").parent().removeClass("hide");
    }
    else if (pDefaults.UnEditableCompanyName == "UNF" && CustomersCanDelete)
        $("#cbIgnoreVATNumberValidation").parent().parent().removeClass("hide");
    if (pDefaults.CompanyName == "EVLGERMANY" )
        $("#txtCode").prop('disabled',false);
    $("#cbOldIsActive").val("false");
    $("#hCustomerUserID").val("0");
    $("#hOldCustomerUserName").val("0");
    $('#txtUserName').val("0");
    $('#cbIsActiveUser').prop('checked', false);
    $('#txtUserPassword').val("");

    if (pDefaults.UnEditableCompanyName == "MED" && $('#hf_CanEdit').val() == '0') {
        $("#cbIsInternalCustomer").parent().addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "LATT" || pDefaults.UnEditableCompanyName == "LAT") {
        $("#btnCopyFromMainAddress").addClass("hide");
        $("#btnAddressSave").addClass("hide");
        $("#btnAddressSaveandNew").addClass("hide");
        $("#slAddressTypes").parent().addClass("hide");
        PartnerTypeID = 0;
        Addresses_ClearAllControls();
    }
    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");
    $("#txtName").removeAttr("disabled");
    $("#txtLocalName").removeAttr("disabled");

    $("#slAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    $("#slAccount").removeAttr("disabled");
    $("#slSubAccountGroup").removeAttr("disabled");

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnVisitWebsite").attr('href', 'http://');
    $("#bodyAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    //*****************************
    $("#bodyPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    //*****************************
    $('#slPriceList').val("0"); // Mostaa

    $('#slCustomerCategories').val("0"); // Mostaa
    GetListWithName(null, "/api/Countries/LoadAll", "Select", "slForeignExporterCountry", function () {
        $('#slFilterCountry').html($('#slForeignExporterCountry').html()).css({'width':'100%'}).select2();
    });
    GetListWithName(null, "/api/Owners/LoadAll?pWhereClause=WHERE 1 = 1", "Select", "slOwner");

    $("#bodyContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    Salesmen_GetList(null, null);
    PaymentTerms_GetList(null, null);
    Currencies_GetList(null, null);
    TaxeTypes_GetList(null, null);
    if (pDefaults.UnEditableCompanyName != "GBL")
        PriceList_GetList(null, null);

    SL_CustomerCategories_GetList(null, null);
    //EOF for AddressModal
    debugger;
    //this 2nd flag in Customers_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSave").attr("onclick", "Customers_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNew").attr("onclick", "Customers_Insert(true, " + pDontLoadTable + ");");
        LoadCustomersModalComboBoxes();
    }
    else {
        $("#btnSave").attr("onclick", "Customers_Insert(false);");
        $("#btnSaveandNew").attr("onclick", "Customers_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);
    $("#cbIsConsignee").prop('checked', true);
    $("#cbIsShipper").prop('checked', true);

    //if (callback != null && callback != undefined)
    //    callback();
    //to set the wizard to BasicData
    $("#stepsBasicData").parent().children().removeClass("active");
    $("#stepsBasicData").addClass("active");
    $("#BasicData").parent().children().removeClass("active");
    $("#BasicData").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Customers_ShowHideTabs();
    $("#slMainClients").html($("#hReadySlMainClients").html());
    if (pDefaults.UnEditableCompanyName == 'TEU') {
        $('#txtFinance365Ref').parent().removeClass('hide');
        $('#txtFinance365Ref').parent().find("label").text("Invoicing Instructions");
        $('#txtFinance365Ref').attr("placeholder", "Invoicing Instructions");
        $('#txtFinance365Ref').attr("data-required", "false");

        $('#txtSwift').parent().removeClass('hide');
        $('#txtSwift').parent().find("label").text("Limit");
        $('#txtSwift').attr("placeholder", "Limit");
        $('#txtSwift').attr("data-required", "false");

        $('#txtBankAddress').parent().removeClass('hide');
        $('#txtBankAddress').parent().find("label").text("Duration");
        $('#txtBankAddress').attr("placeholder", "Duration");
        $('#txtBankAddress').attr("data-required", "false");

        $('#txtShippingInstructions')
    }
}
function Customers_SetWebSiteHref() {
    $("#btnVisitWebsite").attr('href', 'http://' + $("#txtWebsite").val());
}
function Customers_ShowHideTabs() {
    debugger;
    if ($("#txtCode").val() == "") {
        $("#stepsContacts").addClass('hide');
        //$("#stepsAddresses").addClass('hide');
        $("#stepsPartnersBanks").addClass('hide');
        $("#stepsUploadFiles").addClass('hide');
        $("#stepsCreditLimit").addClass('hide');
        $("#stepsCustomerNetwork").addClass('hide');


        if (pDefaults.IsERP == false) {
            $(".classHideslSalesmenComb").removeClass("hide");
            $(".classSL_SalesManOption").addClass("hide");
            $("#stepsSL_SalesMan").addClass('hide');
            $("#stepsSL_Regions").addClass('hide');
            if (1 == 2) //(pDefaults.UnEditableCompanyName != "COS" && pDefaults.UnEditableCompanyName != "HOR")
                $(".classHideslCustomerCategoriesComb").addClass('hide');


        }
        else {
            $(".classSL_SalesManOption").addClass("hide");
            $(".classHideslSalesmenComb").addClass("hide");
            $("#stepsSL_SalesMan").addClass('hide');
            $("#stepsSL_Regions").addClass('hide');

            if (1 == 2) //(pDefaults.UnEditableCompanyName != "COS" && pDefaults.UnEditableCompanyName != "HOR")
                $(".classHideslCustomerCategoriesComb").addClass('hide');


        }

    }
    else {
        $("#stepsContacts").removeClass('hide');
        $("#stepsAddresses").removeClass('hide');
        $("#stepsPartnersBanks").removeClass('hide');
        $("#stepsCreditLimit").removeClass('hide');
        $("#stepsSL_SalesMan").removeClass('hide');
        if (pDefaults.IsERP == false) {
            $(".classHideslSalesmenComb").removeClass("hide");
            $(".classSL_SalesManOption").addClass("hide");
            $("#stepsSL_SalesMan").addClass('hide');
            $("#stepsSL_Regions").addClass('hide');

            if (1 == 2) //(pDefaults.UnEditableCompanyName != "COS" && pDefaults.UnEditableCompanyName != "HOR")
                $(".classHideslCustomerCategoriesComb").addClass('hide');


        }
        else {
            $(".classSL_SalesManOption").removeClass("hide");
            $(".classHideslSalesmenComb").addClass("hide");
            $("#stepsSL_SalesMan").removeClass('hide');
            $("#stepsSL_Regions").removeClass('hide');

            $(".classHideslCustomerCategoriesComb").removeClass('hide');


        }

        if (glbCallingControl == "Customers") {
            $("#stepsUploadFiles").removeClass('hide');
            $("#stepsCustomerNetwork").removeClass('hide');
        }

    }
    if ($("#hDefaultUnEditableCompanyName").val() == "GBL") {
        $(".classShowForGBL").removeClass("hide");
    }
}
function Salesmen_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    GetListWithNameAndWhereClause(pID, "/api/Users/LoadAll", "Select Salesman", "slSalesmen", "WHERE CustomerID IS NULL ORDER BY Name");
}
function PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
function Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slCurrencies", " WHERE 1=1 ORDER BY Code ");
}
function TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slTaxeTypes");
}
function Customer_Network_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Network/LoadAll", "Select Network", "slCustomerNetwork", "ORDER BY Name", null)
}
function Customer_SL_SalesMan_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/SL_SalesMan/LoadAll", "Select SalesMan", "slCustomerSL_SalesMan", "where 1=1", null)
}
function Customer_SL_Regions_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/SL_Regions/LoadAll", "Select Regions", "slCustomerSL_Regions", "where 1=1", null)
}
function PriceList_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    CallGETFunctionWithParameters("/api/I_PriceList/IntializeData"
        , { pID: "ORDER BY Name" }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slPriceList", pData[1], null);
        }
        , null);
}
function SL_CustomerCategories_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    debugger;
    CallGETFunctionWithParameters("/api/SL_CustomerCategories/LoadWithPaging"
        , { pPageNumber: 1, pPageSize: 9999, pSearchKey: null }
        , function (pData) {
            FillListFromObject(pID, 2, TranslateString("SelectFromMenu"), "slCustomerCategories", pData[0], null);
        }
        , null);
}

//*********************************Uploaded Files***************************************//
function Customers_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Customers";
    glbGeneralUploadFolderName = $("#hID").val() == "" ? "" : $("#txtName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Customers//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Customers/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Customers";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Customers";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Customers";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
//get balance while change combo limit
function getCustomerCreditLimitBalance() {
    debugger;
    $.getJSON("/api/Customers/getCustomerCreditLimitBalance", { pIsCust: 1, pCustomerID: $("#hID").val(), plimitID: $("#slCreditLimit").val() }, function (Result) {
        if (Result.length > 0) {
            debugger;
            $("#txtBalance").val(Result)

        }
        else {
            $("#txtBalance").val("0")
        }

    });

}



function cbCheckAllCustomers_InvoiceAutomailChanged() {
    debugger;
    if ($("#cbCheckAllCustomers_InvoiceAutomail").prop("checked"))
        $("#divCbCustomers_InvoiceAutomail input[name=nameCbCustomers_InvoiceAutomail]").prop("checked", true);
    else
        $("#divCbCustomers_InvoiceAutomail input[name=nameCbCustomers_InvoiceAutomail]").prop("checked", false);
}
function cbCheckAllCustomers_AgingAutomailChanged() {
    debugger;
    if ($("#cbCheckAllCustomers_AgingAutomail").prop("checked"))
        $("#divCbCustomers_AgingAutomail input[name=nameCbCustomers_AgingAutomail]").prop("checked", true);
    else
        $("#divCbCustomers_AgingAutomail input[name=nameCbCustomers_AgingAutomail]").prop("checked", false);
}
function cbCheckAllCustomers_AccountStatementAutomailChanged() {
    debugger;
    if ($("#cbCheckAllCustomers_AccountStatement").prop("checked"))
        $("#divCbCustomers_AccountStatement input[name=nameCbCustomers_AccountStatement]").prop("checked", true);
    else
        $("#divCbCustomers_AccountStatement input[name=nameCbCustomers_AccountStatement]").prop("checked", false);
}

function SaveAutomailPlan(PeriodType) {
    debugger;
    var ReportName = $('.Automail-wizard li.active').attr('value');
    var CbName = "nameCbCustomers_" + ReportName + "";
    PostInsertUpdateFunction("CustomerAutomailPlan-form", "/api/Customers/SetAutomailPeriod", { pReportName: ReportName, pPeriodType: PeriodType, pCustomersIDs: GetAllSelectedIDsAsStringWithNameAttr(CbName) }

        , false, null, function () {
            LoadCustomers_Automail();
        }
    );
}

// Load For All Reports xxxxxxxxxxxxxxxxx
function LoadCustomers_Automail() {

    var ReportName = "";
    FadePageCover(true);
    debugger

    CallGETFunctionWithParameters("/api/Customers/LoadAutomailCustomers"
        ,
        {
            pCustomerName: $('#txtCustomerName_Automail').val(), pPeriodType: $('#slPeriodType_Automail').val()
        }
        , function (pData) {
            //FillDivWithCheckboxes_DynamicFiled1("divCbCustomers_Invoice", pData[0], "nameCbCustomers_Invoice", "Name", "EmailOptionInvoicesReport", null);
            //FillDivWithCheckboxes_DynamicFiled1("divCbCustomers_Aging", pData[1], "nameCbCustomers_Aging", "Name", "EmailOptionAging", null);
            FillDivWithCheckboxes_DynamicFiled1("divCbCustomers_AccountStatement", pData[2], "nameCbCustomers_AccountStatement", "Name", "EmailOptionPartnerStatement", null);
            FadePageCover(false);
        }
        , null);

    //GetAllSelectedIDsAsStringWithNameAttr("nameCbItems");
}


function FillDivWithCheckboxes_DynamicFiled1(pDivName, pData, pCheckboxNameAttr, FieldName, labelField, callback) {
    //Clear the div
    $("#" + pDivName).html("");
    var option = "";
    // Bind Data
    //option = '<section class="panel panel-default">';
    //option += '<header class="panel-heading">';
    //option += '</header>';
    $.each(JSON.parse(pData), function (i, item) {
        var label = "";
        if (IsNull(item[labelField], 0) == 10) {
            label = '<a href="#" data-toggle="modal" onclick="" class="btn btn-xs btn-rounded btn-lightblue float-right">  <span style="padding-right: 5px;"> Half Monthly </span></a>'
        }
        else if (IsNull(item[labelField], 0) == 20) {
            label = '<a href="#" data-toggle="modal" onclick="" class="btn btn-xs btn-rounded btn-warning float-right"> <span style="padding-right: 5px;"> Monthly </span></a>'

        }
        else if (IsNull(item[labelField], 0) == 70) {
            label = '<a href="#" data-toggle="modal" onclick="" class="btn btn-xs btn-rounded btn-warning float-right"> <span style="padding-right: 5px;"> Weekly </span></a>'

        }

        option += '<div class="swapCheckBoxesClass"> ';
        option += ' <input type="checkbox" name="' + pCheckboxNameAttr + '" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);"  value="' + item.ID + '" /> ';
        option += ' <label> ' + item[FieldName] + label;
        option += ' &nbsp;</label> </div>';
    });
    //option += '<footer class="panel-footer">';
    //option += "</footer>";
    //option += "</section>";
    $("#" + pDivName).append(option);
    if ($("[id$='hf_ChangeLanguage']").val() == "ar") $(".swapCheckBoxesClass:not(.reversed)").reverseChildren();
}







/**********************Customer Network****************************/
function CustomerNetwork_BindTableRows(pCustomerNetwork) {
    debugger;
    //ClearAllTableRows("tblCustomerNetwork");
    $("#tblCustomerNetwork tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomerNetwork, function (i, item) {
        AppendRowtoTable("tblCustomerNetwork",
            ("<tr ID='" + item.ID + "' ondblclick='CustomerNetwork_FillControls(" + item.ID + ");'>"
                //("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='NetworkID hide'>" + item.NetworkID + "</td>"
                + "<td class='NetworkName'>" + item.NetworkName + "</td>"
                + "<td class='FromDate'>" + item.StringFromDate + "</td>"
                + "<td class='ToDate'>" + item.StringToDate + "</td>"
                //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                + "<td class='Notes'>" + item.Notes + "</td>"
                + "<td class='hide'><a href='#CustomerNetworkModal' data-toggle='modal' onclick='CustomerNetwork_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomerNetwork", "ID", "cb-CheckAll-CustomerNetwork");
    CheckAllCheckbox("HeaderDeletetblCustomerNetworkID");
    HighlightText("#tblCustomerNetwork>tbody>tr", $("#txtCustomerNetworkSearch").val().trim());
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function CustomerNetwork_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hID").val();
    strLoadWithPagingFunctionName = "/api/CustomerNetwork/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerNetwork_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    pWhereClause += ($("#txtCustomerNetworkSearch").val().trim() == "" || $("#txtCustomerNetworkSearch").val() == undefined
        ? ""
        : " AND NetworkName LIKE '%" + $("#txtCustomerNetworkSearch").val().trim() + "%'");
    var pOrderBy = " NetworkName ";
    LoadWithPagingForModal("/api/CustomerNetwork/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            CustomerNetwork_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}
//to reset function names as in mainapp.master
function CustomerNetwork_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Customers_BindTableRows";
}
function CustomerNetwork_ClearAllControls() {
    debugger;
    ClearAll("#CustomerNetworkModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblCustomerNetworkShown").html($("#lblCustomerShown").html());
    Customer_Network_GetList(null, null);
    $("#txtCustomerNetworkFromDate").val(_FormattedTodaysDate);
    $("#txtCustomerNetworkToDate").val(_FormattedTodaysDate);

    $("#btnSaveCustomerNetwork").attr("onclick", "CustomerNetwork_Insert(false);");
    $("#btnSaveandNewCustomerNetwork").attr("onclick", "CustomerNetwork_Insert(true);");

}
function CustomerNetwork_FillControls(pCustomerNetworkID) {
    debugger;
    ClearAll("#CustomerNetworkModal", null);
    jQuery("#CustomerNetworkModal").modal("show");
    $("#hCustomerNetworkID").val(pCustomerNetworkID);
    var tr = $("#tblCustomerNetwork tbody tr[ID='" + pCustomerNetworkID + "']");
    var pNetworkID = $(tr).find("td.NetworkID").text();
    $("#lblCustomerNetworkShown").html($("#lblCustomerShown").html());
    Customer_Network_GetList(pNetworkID, null);
    $("#txtCustomerNetworkFromDate").val($(tr).find("td.FromDate").text());
    $("#txtCustomerNetworkToDate").val($(tr).find("td.ToDate").text());
    $("#txtCustomerNetworkNotes").val($(tr).find("td.Notes").text());

    $("#btnSaveCustomerNetwork").attr("onclick", "CustomerNetwork_Update(false);");
    $("#btnSaveandNewCustomerNetwork").attr("onclick", "CustomerNetwork_Update(true);");
}
function CustomerNetwork_Insert(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtCustomerNetworkFromDate").val()), ConvertDateFormat($("#txtCustomerNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/CustomerNetwork/Insert"
            , {
                pCustomerID: $('#hID').val()
                , pNetworkID: $('#slCustomerNetwork').val()
                , pFromDate: $('#txtCustomerNetworkFromDate').val().trim() == "" ? "0" : $('#txtCustomerNetworkFromDate').val()
                , pToDate: $('#txtCustomerNetworkToDate').val().trim() == "" ? "0" : $('#txtCustomerNetworkToDate').val()
                , pNotes: $('#txtCustomerNetworkNotes').val().trim() == "" ? "0" : $('#txtCustomerNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "CustomerNetworkModal"
            , function () {
                CustomerNetwork_LoadingWithPagingForModal($('#hID').val());
                if (pSaveandAddNew)
                    CustomerNetwork_ClearAllControls();
            });
    }
}
function CustomerNetwork_Update(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtCustomerNetworkFromDate").val()), ConvertDateFormat($("#txtCustomerNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/CustomerNetwork/Insert"
            , {
                pID: $("#hCustomerNetworkID").val()
                , pCustomerID: $('#hID').val()
                , pNetworkID: $('#slCustomerNetwork').val()
                , pFromDate: $('#txtCustomerNetworkFromDate').val().trim() == "" ? "0" : $('#txtCustomerNetworkFromDate').val()
                , pToDate: $('#txtCustomerNetworkToDate').val().trim() == "" ? "0" : $('#txtCustomerNetworkToDate').val()
                , pNotes: $('#txtCustomerNetworkNotes').val().trim() == "" ? "0" : $('#txtCustomerNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "CustomerNetworkModal"
            , function () {
                CustomerNetwork_LoadingWithPagingForModal($('#hID').val());
                if (pSaveandAddNew)
                    CustomerNetwork_ClearAllControls();
            });
    }
}
function CustomerNetwork_Delete() {
    debugger;
    var pCustomerNetworkIDs = GetAllSelectedIDsAsString('tblCustomerNetwork');
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
                DeleteListFunction("/api/CustomerNetwork/Delete", { "pCustomerNetworkIDs": pCustomerNetworkIDs }, function () {
                    //CustomerNetwork_LoadAll($("#hAirlineID").val());
                    CustomerNetwork_LoadingWithPagingForModal($("#hID").val());
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}


//function CustomerRates_Insert_Update(pSaveandAddNew) {
//    debugger;
//    InsertUpdateFunction("form", "/api/Rates/Insert_Update_CustomerRate"
//            , {
//                CustomerRateID: ($('#hCustomerRateID').val() == '' ? 0 : $('#hCustomerRateID').val()),
//                pCustomerID: $('#hID').val()
//                , pRateID: $('#slRates').val()
//                , pRateIsInActive: $('#RateIsInActive').prop('checked')

//            }, pSaveandAddNew, "RateModal"
//            , function () {
//                FadePageCover(false);
//                CustomerRates_LoadingWithPagingForModal($('#hID').val());
//                CustomerRates_ClearAllControls();
//                jQuery('#RateModal').modal('hide');
//            });

//}
//function CustomerRates_LoadingWithPagingForModal() {
//    debugger;
//    CallGETFunctionWithParameters("/api/Rates/LoadCustomerRates"
//         , { pCustomerID: $('#hID').val() }
//         , function (pData) {
//             debugger;
//             var pCustomerRates = JSON.parse(pData[0]);
//             CustomerRates_DisplayRates(pCustomerRates);
//             CustomerRates_ClearAllControls();
//         }
//             , null);
//}

//function CustomerRates_ClearAllControls() {
//    $('#slRates').val('');
//    $('#RateIsInActive').prop('checked', false);
//}

//function CustomerRates_DisplayRates(pTabelRows) {
//    debugger;
//    var strRates = "";
//    $.each(pTabelRows, function (i, item) {
//        strRates += ' <div contenteditable="false" id="RateTextData' + item.ID + '" class="textDiv col-sm-5" '
//             + ' IsInActive="' + item.IsInActive + '"'
//             + ' RateID="' + item.RateID + '"'
//             + ' RateName="' + item.RateName + '"'
//            + '"> ';
//        strRates += ' <a onclick="Rates_DeleteList(' + item.ID + ');" class="btn btn-xs btn-rounded btn-danger float-right"><i class="fa " style="padding-right:0px!Important;">X</i></a> ';
//        strRates += ' <a data-toggle="modal" data-target="#RateModal" onclick="Rates_FillControls(' + item.ID + ');" class="btn btn-xs btn-rounded btn-primary float-right"><i class="fa fa-pencil"></i></a> ';
//        strRates += "Rate : " + (item.RateName == '0' ? '' : item.RateName + ' </br> ');
//        strRates += "IsInActive : " + (item.IsInActive == '0' ? 'No' : 'YES' + ' </br> ');
//        strRates += ' </div> ';
//    });
//    $("#bodyRates").html(strRates);
//}
//function Rates_FillControls(pID) {
//    ClearAll("#RateModal", null);
//    $("#hCustomerRateID").val(pID);

//    debugger;
//    $("#lblContactShown").html(" : " + $("Div[ContactVal=" + pID + "]").attr('Name'));
//    var RateTextData_isinactive = $('#RateTextData' + pID + '').attr('isinactive') == 'false' ? false : true;
//    $('#RateIsInActive').prop('checked', RateTextData_isinactive);
//    //$('#RateTextData').attr('ratename');
//    $('#slRates').val($('#RateTextData' + pID + '').attr('RateID'));

//    $("#btnRateSave").attr("onclick", "CustomerRates_Insert_Update(false);");
//}
//function Rates_DeleteList(pID) {

//    debugger;
//    CallGETFunctionWithParameters("/api/Rates/DeleteLM_Customer_Rates"
// , { pCustomer_Rate_ID: pID }
// , function (pData) {
//     debugger;
//     CustomerRate_LoadWithPagingWithWhereClause($("#hID").val());
// }
//     , null);
//}
//function Rates_ClearAllControls() {
//    $('#hCustomerRateID').val(0);
//    ClearAll('#RateModal');
//    $("#btnRateSave").attr("onclick", "CustomerRates_Insert_Update(false);");
//}
//function CustomerRate_LoadWithPagingWithWhereClause(CustomerID) {
//    debugger;
//    CustomerRates_LoadingWithPagingForModal();
//}

function CustomerSL_SalesMan_Insert(pSaveandAddNew) {
    debugger;
    if ($('#slCustomerSL_SalesMan').val() == "0" || $('#slCustomerSL_SalesMan').val() == "")
        swal("Sorry", "Please Choose SalesMan.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/CustomerSL_SalesMan/CheckIfItemFound",
            data: { pSalesManID: $("#slCustomerSL_SalesMan").val(), pCustomerID: $('#hID').val(), pID: -1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/CustomerSL_SalesMan/Insert"
                        , {
                            pCustomerID: $('#hID').val()
                            , psalesmanID: $('#slCustomerSL_SalesMan').val()
                            , pPercentage: $('#txtCustomerPercentage').val().trim() == "" ? "0" : $('#txtCustomerPercentage').val().trim()
                            , pIsDefault: $("#cbIsDefault").prop('checked')
                        }, pSaveandAddNew, "CustomerSL_SalesManModal"
                        , function () {
                            CustomerSL_SalesMan_LoadingWithPagingForModal($('#hID').val());
                            if (pSaveandAddNew)
                                CustomerSL_SalesMan_ClearAllControls();
                        });


                }
            }
        });
    }
}
function CustomerSL_SalesMan_Update(pSaveandAddNew) {
    debugger;
    if ($('#slCustomerSL_SalesMan').val() == "0" || $('#slCustomerSL_SalesMan').val() == "")
        swal("Sorry", "Please check dates order.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/CustomerSL_SalesMan/CheckIfItemFound",
            data: { pSalesManID: $("#slCustomerSL_SalesMan").val(), pCustomerID: $('#hID').val(), pID: $("#hCustomerSL_SalesManID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/CustomerSL_SalesMan/Update"
                        , {
                            pID: $("#hCustomerSL_SalesManID").val()
                            , pCustomerID: $('#hID').val()
                            , psalesmanID: $('#slCustomerSL_SalesMan').val()
                            , pPercentage: $('#txtCustomerPercentage').val().trim() == "" ? "0" : $('#txtCustomerPercentage').val().trim()
                            , pIsDefault: $("#cbIsDefault").prop('checked')

                        }, pSaveandAddNew, "CustomerSL_SalesManModal"
                        , function () {
                            CustomerSL_SalesMan_LoadingWithPagingForModal($('#hID').val());
                            if (pSaveandAddNew)
                                CustomerSL_SalesMan_ClearAllControls();
                        });

                }
            }
        });


    }
}
function CustomerSL_SalesMan_Delete() {
    debugger;
    var pCustomerNetworkIDs = GetAllSelectedIDsAsString('tblCustomerSL_SalesMan');
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
                DeleteListFunction("/api/CustomerSL_SalesMan/Delete", { "pCustomerSL_SalesManIDs": pCustomerNetworkIDs }, function () {
                    //CustomerNetwork_LoadAll($("#hAirlineID").val());
                    CustomerSL_SalesMan_LoadingWithPagingForModal($("#hID").val());
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}
function CustomerSL_SalesManLoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hID").val();
    strLoadWithPagingFunctionName = "/api/CustomerSL_SalesMan/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerNetwork_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    pWhereClause += ($("#txtCustomerSL_SalesManSearch").val().trim() == "" || $("#txtCustomerSL_SalesManSearch").val() == undefined
        ? ""
        : " AND SalesMan LIKE '%" + $("#txtCustomerSL_SalesManSearch").val().trim() + "%'");
    var pOrderBy = " SalesMan ";
    LoadWithPagingForModal("/api/CustomerSL_SalesMan/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            CustomerSL_SalesMan_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}
/**********************Customer Network****************************/
function CustomerSL_SalesMan_BindTableRows(pCustomerNetwork) {
    debugger;
    //ClearAllTableRows("tblCustomerNetwork");
    $("#tblCustomerSL_SalesMan tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomerNetwork, function (i, item) {
        AppendRowtoTable("tblCustomerSL_SalesMan",
            ("<tr ID='" + item.ID + "' ondblclick='CustomerSL_SalesMan_FillControls(" + item.ID + ");'>"
                //("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='salesmanID hide'>" + item.salesmanID + "</td>"
                + "<td class='SalesMan'>" + item.SalesMan + "</td>"
                + "<td class='Percentage'>" + item.Percentage + "</td>"

                + "<td class='isDefault'> <input type='checkbox' disabled='disabled' val='" + (item.isDefault == true ? "true' checked='checked'" : "'") + " /></td>"

                //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                + "<td class='hide'><a href='#CustomerSL_SalesManModal' data-toggle='modal' onclick='CustomerSL_SalesMan_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomerSL_SalesMan", "ID", "cb-CheckAll-CustomerSL_SalesMan");
    CheckAllCheckbox("HeaderDeletetblCustomerSL_SalesManID");
    HighlightText("#tblCustomerSL_SalesMan>tbody>tr", $("#txtCustomerSL_SalesManSearch").val().trim());
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function CustomerSL_SalesMan_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Customers_BindTableRows";
}
function CustomerSL_SalesMan_ClearAllControls() {
    debugger;
    ClearAll("#CustomerSL_SalesManModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblCustomerSL_SalesManShown").html($("#lblCustomerShown").html());
    Customer_SL_SalesMan_GetList(null, null);
    Customer_SL_Regions_GetList(null, null);

    $("#btnSaveCustomerSL_SalesMan").attr("onclick", "CustomerSL_SalesMan_Insert(false);");
    $("#btnSaveandNewCustomerSL_SalesMan").attr("onclick", "CustomerSL_SalesMan_Insert(true);");

}
function CustomerSL_SalesMan_FillControls(pCustomerSL_SalesManID) {
    debugger;
    ClearAll("#CustomerSL_SalesManModal", null);
    jQuery("#CustomerSL_SalesManModal").modal("show");
    $("#hCustomerSL_SalesManID").val(pCustomerSL_SalesManID);
    var tr = $("#tblCustomerSL_SalesMan tbody tr[ID='" + pCustomerSL_SalesManID + "']");
    var psalesmanID = $(tr).find("td.salesmanID").text();
    $("#lblCustomerSL_SalesManShown").html($("#lblCustomerShown").html());
    Customer_SL_SalesMan_GetList(psalesmanID, null);
    $("#txtCustomerPercentage").val($(tr).find("td.Percentage").text());
    $("#cbIsDefault").prop('checked', $(tr).find('td.isDefault').find('input').attr('val'));

    $("#btnSaveCustomerSL_SalesMan").attr("onclick", "CustomerSL_SalesMan_Update(false);");
    $("#btnSaveandNewCustomerSL_SalesMan").attr("onclick", "CustomerSL_SalesMan_Update(true);");
}
function CustomerSL_SalesMan_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hID").val();
    strLoadWithPagingFunctionName = "/api/CustomerSL_SalesMan/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerSL_SalesMan_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    pWhereClause += ($("#txtCustomerSL_SalesManSearch").val().trim() == "" || $("#txtCustomerSL_SalesManSearch").val() == undefined
        ? ""
        : " AND SalesMan LIKE '%" + $("#txtCustomerSL_SalesManSearch").val().trim() + "%'");
    var pOrderBy = "SalesMan ";
    LoadWithPagingForModal("/api/CustomerSL_SalesMan/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            CustomerSL_SalesMan_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}



function CustomerSL_Regions_Insert(pSaveandAddNew) {
    debugger;
    if ($('#slCustomerSL_Regions').val() == "0" || $('#slCustomerSL_Regions').val() == "")
        swal("Sorry", "Please Choose Regions.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/CustomerSL_Regions/CheckIfItemFound",
            data: { pRegionsID: $("#slCustomerSL_Regions").val(), pCustomerID: $('#hID').val(), pID: -1 },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/CustomerSL_Regions/Insert"
                        , {
                            pCustomerID: $('#hID').val()
                            , pRegionsID: $('#slCustomerSL_Regions').val()
                            , pIsDefault: $("#cbIsDefaultRegions").prop('checked')
                        }, pSaveandAddNew, "CustomerSL_RegionsModal"
                        , function () {
                            CustomerSL_Regions_LoadingWithPagingForModal($('#hID').val());
                            if (pSaveandAddNew)
                                CustomerSL_Regions_ClearAllControls();
                        });


                }
            }
        });
    }
}
function CustomerSL_Regions_Update(pSaveandAddNew) {
    debugger;
    if ($('#slCustomerSL_Regions').val() == "0" || $('#slCustomerSL_Regions').val() == "")
        swal("Sorry", "Please Choose Regions.");
    else {
        $.ajax({
            type: "GET",
            url: "/api/CustomerSL_Regions/CheckIfItemFound",
            data: { pRegionsID: $("#slCustomerSL_Regions").val(), pCustomerID: $('#hID').val(), pID: $("#hCustomerSL_RegionsID").val() },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (pData) {
                if (pData == true) {
                    swal('Sorry', 'this item already exist', 'warning');
                    _Suceess = false;
                }
                else {
                    InsertUpdateFunction("form", "/api/CustomerSL_Regions/Update"
                        , {
                            pID: $("#hCustomerSL_RegionsID").val()
                            , pCustomerID: $('#hID').val()
                            , pRegionsID: $('#slCustomerSL_Regions').val()
                            , pIsDefault: $("#cbIsDefaultRegions").prop('checked')

                        }, pSaveandAddNew, "CustomerSL_RegionsModal"
                        , function () {
                            CustomerSL_Regions_LoadingWithPagingForModal($('#hID').val());
                            if (pSaveandAddNew)
                                CustomerSL_Regions_ClearAllControls();
                        });

                }
            }
        });


    }
}
function CustomerSL_Regions_Delete() {
    debugger;
    var pCustomerNetworkIDs = GetAllSelectedIDsAsString('tblCustomerSL_Regions');
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
                DeleteListFunction("/api/CustomerSL_Regions/Delete", { "pCustomerSL_RegionsIDs": pCustomerNetworkIDs }, function () {
                    //CustomerNetwork_LoadAll($("#hAirlineID").val());
                    CustomerSL_Regions_LoadingWithPagingForModal($("#hID").val());
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}
function CustomerSL_RegionsLoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hID").val();
    strLoadWithPagingFunctionName = "/api/CustomerSL_Regions/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerRegions_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    pWhereClause += ($("#txtCustomerSL_RegionsSearch").val().trim() == "" || $("#txtCustomerSL_RegionsSearch").val() == undefined
        ? ""
        : " AND Regions LIKE '%" + $("#txtCustomerSL_RegionsSearch").val().trim() + "%'");
    var pOrderBy = " SalesMan ";
    LoadWithPagingForModal("/api/CustomerSL_Regions/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            CustomerSL_SalesMan_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}
/**********************Customer Network****************************/
function CustomerSL_Regions_BindTableRows(pCustomerNetwork) {
    debugger;
    //ClearAllTableRows("tblCustomerNetwork");
    $("#tblCustomerSL_Regions tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pCustomerNetwork, function (i, item) {
        AppendRowtoTable("tblCustomerSL_Regions",
            ("<tr ID='" + item.ID + "' ondblclick='CustomerSL_Regions_FillControls(" + item.ID + ");'>"
                //("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CustomerID hide'>" + item.CustomerID + "</td>"
                + "<td class='RegionsID hide'>" + item.RegionsID + "</td>"
                + "<td class='Regions'>" + item.Regions + "</td>"

                + "<td class='isDefault'> <input type='checkbox' disabled='disabled' val='" + (item.isDefault == true ? "true' checked='checked'" : "'") + " /></td>"

                //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                + "<td class='hide'><a href='#CustomerSL_RegionsModal' data-toggle='modal' onclick='CustomerSL_Regions_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblCustomerSL_Regions", "ID", "cb-CheckAll-CustomerSL_Regions");
    CheckAllCheckbox("HeaderDeletetblCustomerSL_RegionsID");
    HighlightText("#tblCustomerSL_Regions>tbody>tr", $("#txtCustomerSL_RegionsSearch").val().trim());
    strBindTableRowsFunctionName = "Customers_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function CustomerSL_Regions_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Customers_BindTableRows";
}
function CustomerSL_Regions_ClearAllControls() {
    debugger;
    ClearAll("#CustomerSL_RegionsModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblCustomerSL_RegionsShown").html($("#lblCustomerShown").html());
    Customer_SL_Regions_GetList(null, null);
    $("#btnSaveCustomerSL_Regions").attr("onclick", "CustomerSL_Regions_Insert(false);");
    $("#btnSaveandNewCustomerSL_Regions").attr("onclick", "CustomerSL_Regions_Insert(true);");

}
function CustomerSL_Regions_FillControls(pCustomerSL_RegionsID) {
    debugger;
    ClearAll("#CustomerSL_RegionsModal", null);
    jQuery("#CustomerSL_RegionsModal").modal("show");
    $("#hCustomerSL_RegionsID").val(pCustomerSL_RegionsID);
    var tr = $("#tblCustomerSL_Regions tbody tr[ID='" + pCustomerSL_RegionsID + "']");
    var pRegionsID = $(tr).find("td.RegionsID").text();
    $("#lblCustomerSL_SalesManShown").html($("#lblCustomerShown").html());
    Customer_SL_Regions_GetList(pRegionsID, null);
    $("#cbIsDefaultRegions").prop('checked', $(tr).find('td.isDefault').find('input').attr('val'));

    $("#btnSaveCustomerSL_Regions").attr("onclick", "CustomerSL_Regions_Update(false);");
    $("#btnSaveandNewCustomerSL_Regions").attr("onclick", "CustomerSL_Regions_Update(true);");
}
function CustomerSL_Regions_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hID").val();
    strLoadWithPagingFunctionName = "/api/CustomerSL_Regions/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "CustomerSL_Regions_BindTableRows";
    var pWhereClause = " WHERE CustomerID = " + pID;
    pWhereClause += ($("#txtCustomerSL_RegionsSearch").val().trim() == "" || $("#txtCustomerSL_RegionsSearch").val() == undefined
        ? ""
        : " AND Regions LIKE '%" + $("#txtCustomerSL_RegionsSearch").val().trim() + "%'");
    var pOrderBy = "Regions ";
    LoadWithPagingForModal("/api/CustomerSL_Regions/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            CustomerSL_Regions_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Customers/LoadWithPaging";
            //strBindTableRowsFunctionName = "Customers_BindTableRows";
        });

}



//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Customers_onFileSelected(event, pBtnName) {
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
                if (oJS[0].ALT == undefined || oJS[0].EUR == undefined || oJS[0].MES == undefined || oJS[0].GLO == undefined || oJS[0].SAC == undefined) {
                    swal("Sorry", "Please, fill first row with 1 or 0 in Company Columns");
                    $("#" + pBtnName).val("");
                } else if (oJS.length > 0 && oJS[0].Name != undefined) { //if (sCSV != "")
                    Customers_ImportFromExcelFile(oJS, pBtnName);
                } else {
                    swal("Sorry", "Please, revise data and version of the file.");
                    $("#" + pBtnName).val("");
                }
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}

function Customers_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Customers Name List from DB
    var ExistingCustomersNameList; var ExistingCustomersNameArray;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;

    var ExistingCustomersNameALTList; var ExistingCustomersNameALTArray;
    var ExistingCustomersNameEURList; var ExistingCustomersNameEURArray;
    var ExistingCustomersNameMESList; var ExistingCustomersNameMESArray;
    var ExistingCustomersNameGLOList; var ExistingCustomersNameGLOArray;
    var ExistingCustomersNameSACList; var ExistingCustomersNameSACArray;

    var IsNameExistsInALTDB = false; var NameExistsInALTDBRowNo = 0;
    var IsNameExistsInEURDB = false; var NameExistsInEURDBRowNo = 0;
    var IsNameExistsInMESDB = false; var NameExistsInMESDBRowNo = 0;
    var IsNameExistsInGLODB = false; var NameExistsInGLODBRowNo = 0;
    var IsNameExistsInSACDB = false; var NameExistsInSACDBRowNo = 0;


    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    let CustomersLoadAllAPI = pDefaults.UnEditableCompanyName == "TOP" ? "LoadAllForTopManagement" : "LoadAll";

    CallGETFunctionWithParameters("/api/Customers/" + CustomersLoadAllAPI, {
        pWhereClause: " WHERE 1=1 "
    }
        , function (pData) {
            debugger;

            if (pDefaults.UnEditableCompanyName == "TOP") {
                ExistingCustomersNameALTList = JSON.parse(pData[0]);
                ExistingCustomersNameALTArray = ExistingCustomersNameALTList.map(item => item.Name);

                ExistingCustomersNameEURList = JSON.parse(pData[1]);
                ExistingCustomersNameEURArray = ExistingCustomersNameEURList.map(item => item.Name);

                ExistingCustomersNameMESList = JSON.parse(pData[2]);
                ExistingCustomersNameMESArray = ExistingCustomersNameMESList.map(item => item.Name);

                ExistingCustomersNameGLOList = JSON.parse(pData[3]);
                ExistingCustomersNameGLOArray = ExistingCustomersNameGLOList.map(item => item.Name);

                ExistingCustomersNameSACList = JSON.parse(pData[4]);
                ExistingCustomersNameSACArray = ExistingCustomersNameSACList.map(item => item.Name);

            } else {
                ExistingCustomersNameList = JSON.parse(pData[0]);
                ExistingCustomersNameArray = ExistingCustomersNameList.map(item => item.Name);
            }



            FadePageCover(true);
            var pNameList = "";
            var pNameArray = [];
            var pLocalNameList = "";
            var pAddressList = "";
            var pEmailList = "";
            var pPhonesAndFaxesList = "";
            var pVATNumberList = "";
            var pCommercialRegistrationList = "";
            //var pCompanyList = "";
            var pALTList = "";
            var pEURList = "";
            var pMESList = "";
            var pGLOList = "";
            var pSACList = "";

            for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space

                pNameList += ((pNameList == "" ? "" : ",") +
                    (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );

                if (pDataRows[i].Name == undefined || pDataRows[i].Name.replace(/[\, ]/g, ' ').trim() == "") {
                    IsNameEmpty = true;
                    NameEmptyRowNo = i + 1;
                } else {

                    if (pDefaults.UnEditableCompanyName == "TOP") {
                        // Check if Name Exists in ALT BD
                        if (ExistingCustomersNameALTArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) && pDataRows[i].ALT.replace(/[\, ]/g, ' ').toUpperCase().trim() == "1") {
                            IsNameExistsInALTDB = true; NameExistsInALTDBRowNo = i + 1;
                        }

                        // Check if Name Exists in EUR BD
                        if (ExistingCustomersNameEURArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) && pDataRows[i].EUR.replace(/[\, ]/g, ' ').toUpperCase().trim() == "1") {
                            IsNameExistsInEURDB = true; NameExistsInEURDBRowNo = i + 1;
                        }

                        // Check if Name Exists in MES BD
                        if (ExistingCustomersNameMESArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) && pDataRows[i].MES.replace(/[\, ]/g, ' ').toUpperCase().trim() == "1") {
                            IsNameExistsInMESDB = true; NameExistsInMESDBRowNo = i + 1;
                        }

                        // Check if Name Exists in GLO BD
                        if (ExistingCustomersNameGLOArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) && pDataRows[i].GLO.replace(/[\, ]/g, ' ').toUpperCase().trim() == "1") {
                            IsNameExistsInGLODB = true; NameExistsInGLODBRowNo = i + 1;
                        }

                        // Check if Name Exists in SAC BD
                        if (ExistingCustomersNameSACArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim()) && pDataRows[i].SAC.replace(/[\, ]/g, ' ').toUpperCase().trim() == "1") {
                            IsNameExistsInSACDB = true; NameExistsInSACDBRowNo = i + 1;
                        }

                    } else {
                        // Check if Name Exists in BD
                        if (ExistingCustomersNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
                            IsNameExistsInDB = true;
                            NameExistsInDBRowNo = i + 1;
                        }
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
                //pCompanyList += ((pCompanyList == "" ? "" : ",") +
                //    (pDataRows[i].Company == undefined || pDataRows[i].Company.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Company.replace(/[\, ]/g, ' ').toUpperCase().trim())
                //);
                pALTList += ((pALTList == "" ? "" : ",") +
                    (pDataRows[i].ALT == undefined || pDataRows[i].ALT.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ALT.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );
                pEURList += ((pEURList == "" ? "" : ",") +
                    (pDataRows[i].EUR == undefined || pDataRows[i].EUR.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].EUR.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );
                pMESList += ((pMESList == "" ? "" : ",") +
                    (pDataRows[i].MES == undefined || pDataRows[i].MES.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].MES.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );
                pGLOList += ((pGLOList == "" ? "" : ",") +
                    (pDataRows[i].GLO == undefined || pDataRows[i].GLO.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GLO.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );
                pSACList += ((pSACList == "" ? "" : ",") +
                    (pDataRows[i].SAC == undefined || pDataRows[i].SAC.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].SAC.replace(/[\, ]/g, ' ').toUpperCase().trim())
                );

            }
            var pParametersWithValues = {
                pNameList, pLocalNameList, pAddressList, pEmailList
                , pPhonesAndFaxesList, pVATNumberList, pCommercialRegistrationList//, pCompanyList
                , pALTList, pEURList, pMESList, pGLOList, pSACList
            };

            /******Start Check that Company Columns must be 1,0******/
            //var IsCompanyColumnValid = true; var CompanyNotValidRowNo = 0; var pCompanyArray = [];
            //if (pDefaults.UnEditableCompanyName == "TOP") {
            //    pCompanyArray = pCompanyList.split(",");
            //    for (let i = 0; i < pCompanyArray.length; i++) {
            //        if (pCompanyArray[i].toUpperCase() != "ALT" && pCompanyArray[i].toUpperCase() != "EUR" && pCompanyArray[i].toUpperCase() != "MES" && pCompanyArray[i].toUpperCase() != "GLO" && pCompanyArray[i].toUpperCase() != "SAC") {
            //            IsCompanyColumnValid = false;
            //            CompanyNotValidRowNo = i + 1;
            //        }
            //    }
            //}

            /****** ALT ******/
            var IsALTColumnValid = true; var ALTNotValidRowNo = 0; var pALTArray = [];
            if (pDefaults.UnEditableCompanyName == "TOP") {
                pALTArray = pALTList.split(",");
                for (let i = 0; i < pALTArray.length; i++) {
                    if (pALTArray[i].toUpperCase() != "1" && pALTArray[i].toUpperCase() != "0") {
                        IsALTColumnValid = false;
                        ALTNotValidRowNo = i + 1;
                    }
                }
            }
            /****** EUR ******/
            var IsEURColumnValid = true; var EURNotValidRowNo = 0; var pEURArray = [];
            if (pDefaults.UnEditableCompanyName == "TOP") {
                pEURArray = pEURList.split(",");
                for (let i = 0; i < pEURArray.length; i++) {
                    if (pEURArray[i].toUpperCase() != "1" && pEURArray[i].toUpperCase() != "0") {
                        IsEURColumnValid = false;
                        EURNotValidRowNo = i + 1;
                    }
                }
            }
            /****** MES ******/
            var IsMESColumnValid = true; var MESNotValidRowNo = 0; var pMESArray = [];
            if (pDefaults.UnEditableCompanyName == "TOP") {
                pMESArray = pMESList.split(",");
                for (let i = 0; i < pMESArray.length; i++) {
                    if (pMESArray[i].toUpperCase() != "1" && pMESArray[i].toUpperCase() != "0") {
                        IsMESColumnValid = false;
                        MESNotValidRowNo = i + 1;
                    }
                }
            }
            /****** GLO ******/
            var IsGLOColumnValid = true; var GLONotValidRowNo = 0; var pGLOArray = [];
            if (pDefaults.UnEditableCompanyName == "TOP") {
                pGLOArray = pGLOList.split(",");
                for (let i = 0; i < pGLOArray.length; i++) {
                    if (pGLOArray[i].toUpperCase() != "1" && pGLOArray[i].toUpperCase() != "0") {
                        IsGLOColumnValid = false;
                        GLONotValidRowNo = i + 1;
                    }
                }
            }
            /****** SAC ******/
            var IsSACColumnValid = true; var SACNotValidRowNo = 0; var pSACArray = [];
            if (pDefaults.UnEditableCompanyName == "TOP") {
                pSACArray = pSACList.split(",");
                for (let i = 0; i < pSACArray.length; i++) {
                    if (pSACArray[i].toUpperCase() != "1" && pSACArray[i].toUpperCase() != "0") {
                        IsSACColumnValid = false;
                        SACNotValidRowNo = i + 1;
                    }
                }
            }

            /******End Check that Company Columns must be 1,0******/



            //if (!IsCompanyColumnValid) {
            //    swal(strSorry, " Company in Row No. " + CompanyNotValidRowNo + " is Not Valid ");
            //    FadePageCover(false);
            //}
            if (!IsALTColumnValid) {
                swal(strSorry, " ALT Column in Row No. " + ALTNotValidRowNo + " is Not Valid, It can Only be 1, 0 or Empty ");
                FadePageCover(false);
            } else if (!IsEURColumnValid) {
                swal(strSorry, " EUR Column in Row No. " + EURNotValidRowNo + " is Not Valid, It can Only be 1, 0 or Empty ");
                FadePageCover(false);
            } else if (!IsMESColumnValid) {
                swal(strSorry, " MES Column in Row No. " + MESNotValidRowNo + " is Not Valid, It can Only be 1, 0 or Empty ");
                FadePageCover(false);
            } else if (!IsGLOColumnValid) {
                swal(strSorry, " GLO Column in Row No. " + GLONotValidRowNo + " is Not Valid, It can Only be 1, 0 or Empty ");
                FadePageCover(false);
            } else if (!IsSACColumnValid) {
                swal(strSorry, " SAC Column in Row No. " + SACNotValidRowNo + " is Not Valid, It can Only be 1, 0 or Empty ");
                FadePageCover(false);
            } else if (IsNameEmpty) {
                swal(strSorry, " Name in Row No. " + NameEmptyRowNo + " is Empty ");
                FadePageCover(false);
            } else if (IsNameExistsInDB) {
                swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInALTDB) {
                swal(strSorry, " Name in Row No. " + NameExistsInALTDBRowNo + " already exists in ALT Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInEURDB) {
                swal(strSorry, " Name in Row No. " + NameExistsInEURDBRowNo + " already exists in EUR Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInMESDB) {
                swal(strSorry, " Name in Row No. " + NameExistsInMESDBRowNo + " already exists in MES Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInGLODB) {
                swal(strSorry, " Name in Row No. " + NameExistsInGLODBRowNo + " already exists in GLO Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInSACDB) {
                swal(strSorry, " Name in Row No. " + NameExistsInSACDBRowNo + " already exists in SAC Customers ");
                FadePageCover(false);
            } else if (IsNameExistsInExcel) {
                swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                FadePageCover(false);
            } else {
                FadePageCover(true);
                CallPOSTFunctionWithParameters("/api/Customers/InsertListFromExcel", pParametersWithValues, function (pData) {
                    let pReturnedMessage = pData[0];
                    if (pReturnedMessage == "")
                        swal("Success", "Saved Successfully.");
                    else
                        swal("", pReturnedMessage);
                    Customers_LoadingWithPaging();
                }, null);

            }


            $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



        }
        , null);




}
//******************************EOF Reading Excel Files***************************************//;

function Customers_Print(pReportType) {
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("loggeduser");
    arr_Values.push($("#hLoggedUserNameNotLogin").val());

    var ReportName = "Rep_CustomersMasterData";
    var query = `SELECT * FROM vwCustomers WHERE 1=1 `;

    switch ($("#slFilterCustomerType").val()) {
        case "Internal":
            query += " AND IsInternalCustomer =1 ";
            break;
        case "External":
            query += " AND IsExternal = 1 ";
            break;
        case "Related":
            query += " AND IsRelated = 1 ";
            break;
    }
    if (CheckValueIsValidInput('#slFilterCountry')) {
        let cID = $('#slFilterCountry').val();
        query += ` AND ID IN (select PartnerID from Addresses where PartnerTypeID=1 and CountryID=${cID}) `;
    }
    switch ($("#slFilterCustomerKind").val()) {
        case "Consignee":
            query += " AND IsConsignee=1 ";
            break;
        case "Shipper":
            query += " AND IsShipper=1 ";
            break;
    }
    if (CheckValueIsValidInput('#slFilterCustomerCategory')) {
        let cID = $('#slFilterCustomerCategory').val();
        query += ` AND CategoryID=${cID} `;
    }


    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Customers Report"
        , pReportName: ReportName
        , pReportType: pReportType
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}
function LoadCustomersModalComboBoxes() {
    debugger;
    CallGETFunctionWithParameters("/api/Customers/LoadCustomersModalComboBoxes", {}, function (pData) {
        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomerBranchID", pData[0], null);
        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slCustomerDebitorGroupID", pData[1], null);
    }, null);
}

function CustomerPrint(CustomerID) {
    debugger;



    var arr_Keys = new Array();
    var arr_Values = new Array();
    arr_Keys.push("id");
    arr_Values.push(CustomerID);




    var pParametersWithValues =
    {
        arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "بيانات العميل"
        , pReportName: "CustomerTEU"
    };
    var win = window.open("", "_blank");
    var url = '/ReportMainClass/PrintReport?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + '';

    win.location = url;

}

function getCustomerPayment(pID) {
    debugger;
    if (pDefaults.UnEditableCompanyName != "LATT") {
        return;
    }

    FadePageCover(true);
    CallPOSTFunctionWithParameters("api/DynamicsGP/GetPayments", pID, function (gpData) {
        if (gpData.IsSuccess) {
            swal("Success", "Integrated Successfully");
            FadePageCover(false);
        } else {
            if (gpData.Message != "") {
                swal("Sorry", gpData.Message);
            } else {
                swal("Sorry", "Error");
            }
            FadePageCover(false);
        }
    });
}

function RefreshInvoicesVAT() {
    CallGETFunctionWithParameters("/api/Customers/RefreshInvoicesVATNumber"
        , {}
        , function (pData) {
            swal("Success", "Updated " + pData + " Invoice");
        }
        , null);
}
function Customers_Print_Blacklist(pReportType) {
    debugger;
    var arr_Keys = new Array();
    var arr_Values = new Array();

    arr_Keys.push("loggeduser");
    arr_Values.push($("#hLoggedUserNameNotLogin").val());

    var ReportName = "Rep_CustomersMasterData";
    var query = `SELECT * FROM vwCustomers WHERE ISNULL(IsMustPay,0)=1`;


    var pParametersWithValues =
    {
        query: query
        , arr_Keys: arr_Keys
        , arr_Values: arr_Values
        , pTitle: "Blacklist Customers Report"
        , pReportName: ReportName
        , pReportType: pReportType
    };

    var win = window.open("", "_blank");

    url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
        + '&query=' + pParametersWithValues.query + ''
        + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
        + '&arr_Values=' + pParametersWithValues.arr_Values + ''
        + '&pReportName=' + pParametersWithValues.pReportName + ''
        + '&pReportType=' + pParametersWithValues.pReportType + '';

    win.location = url;
}