//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for SalesmenS is 2
//PartnerTypeID for SHIPPING SalesmenS is 3
//PartnerTypeID for CUSTOMS CLEARANCE SalesmenS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Salesmen Region ---------------------------------------------------------------
// Bind Salesmen Table Rows
var intPartnerTypeID = 9;
function Salesmen_Initialize() { 
    debugger;
    strLoadWithPagingFunctionName = "/api/Salesmen/LoadWithPaging";
    LoadView("/MasterData/Salesmen", "div-content", function () {
        debugger;
        LoadView("/MasterData/ModalSalesmen", "div-content", function () {
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
                    var pClientAndSupplierGroup = pData[5];
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSalesmenAccount", pData[0], null);
                    FillListFromObject_ERP(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSalesmenCostCenter", pData[2], null);
                    FillListFromObject_ERP(null, OptionNameCodeAccount == "true" ? 4 : 3/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slSalesmenSubAccountGroup", pClientAndSupplierGroup, null);
                    $("#slSalesmenSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');
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
            , function (pTabelRows) { Salesmen_BindTableRows(pTabelRows); });
    },
        function () { Salesmen_ClearAllControls(); },
        function () { Salesmen_DeleteList(); });
}
function Salesmen_BindTableRows(pSalesmen) {
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblSalesmen");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSalesmen, function (i, item) {
        AppendRowtoTable("tblSalesmen",
            ("<tr ID='" + item.ID + "' ondblclick='Salesmen_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Code'>" + item.Code + "</td>"
                    + "<td class='Name'>" + item.NAME + "</td>"
                    + "<td class='LocalName'>" + (item.LocalName == "0" ? "" : item.LocalName) + "</td>"
                + (
                    IsMESCOCompany
                        ? ("<td class='crmCode hide'>" + (item.crmCode === "0" ? "" : item.crmCode) + "</td>")
                        : ""
                )

                    + "<td class='hide'><a href='#SalesmenModal' data-toggle='modal' onclick='Salesmen_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblSalesmen", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblSalesmen>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Salesmen_EditByDblClick(pID) {
    jQuery("#SalesmenModal").modal("show");
    Salesmen_FillControls(pID);
}
function Salesmen_LoadingWithPaging() {
    debugger;
    LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Salesmen/LoadWithPaging", $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Salesmen_BindTableRows(pTabelRows); Salesmen_ClearAllControls(); });
    HighlightText("#tblSalesmen>tbody>tr", $("#txt-Search").val().trim());
    //if (callbackForDeleteFail != null)
    //    callbackForDeleteFail();
}
function Salesmen_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable)
        InsertUpdateFunction("form", "/api/Salesmen/Insert", {
          
            pCode: $("#txtSalesmenCode").val().trim()/*generated automatically*/
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim() 
            , pCrmCode:""
           /* , pEmail: ($("#txtSalesmenEmail").val() == null ? "" : $("#txtSalesmenEmail").val().trim())*/
            
        }, pSaveandAddNew, "SalesmenModal", function () { Salesmen_LoadingWithPaging(); });
    else if (pDontReloadTable == 1) // Called from Modal Add Quotation/Operation 
        InsertUpdateFunction("form", "/api/Salesmen/Insert", {
           
             pCode: 0 /*generated automatically*/
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
            , pCrmCode: ""

           
           /* , pEmail: ($("#txtSalesmenEmail").val() == null ? "" : $("#txtSalesmenEmail").val().trim())*/
         
        }, pSaveandAddNew, "SalesmenModal"
        , function () {
            if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
            Salesmen_GetList($('#slSalesmen option:selected').val(), null);
        });
    else if (pDontReloadTable == 2) // Called from Edit Quotation
        InsertUpdateFunction("form", "/api/Salesmen/Insert", {
            pCode: $("#txtSalesmenCode").val().trim()
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim() 
            , pCrmCode: ""
          /*  , pEmail: ($("#txtSalesmenEmail").val() == null ? "" : $("#txtSalesmenEmail").val().trim())*/
        }, pSaveandAddNew, "SalesmenModal"
                , function () {
                    if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
                    Salesmen_GetList($('#slSalesmen option:selected').val(), null);
                    SalesmenContacts_GetList($('#slSalesmenContacts option:selected').val(), $('#slSalesmen option:selected').val(), function () { QuotationsEdit_SalesmenContactChanged(); });
                });
    else if (pDontReloadTable == 3) // Called from OperationPartners
        InsertUpdateFunction("form", "/api/Salesmen/Insert", {
            pCode: $("#txtSalesmenCode").val().trim()
           , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
            , pCrmCode: ""

           /* , pEmail: ($("#txtSalesmenEmail").val() == null ? "" : $("#txtSalesmenEmail").val().trim())*/
           
        }, pSaveandAddNew, "SalesmenModal"
            , function () {
                if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
                PartnerNames_GetList($('#slPartners option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
            });
}
function Salesmen_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or OperationsAdd or OperationPartners)
        InsertUpdateFunction("form", "/api/Salesmen/Update", {
            pID: $("#hSalesmenID").val()
            , pCode: $("#txtSalesmenCode").val().trim()
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
            , pcrmCode: ($('#txtSalesmenCrmCode').val() == "" || $('#txtSalesmenCrmCode').val() == null ? "0" : $('#txtSalesmenCrmCode').val())
           
        }, pSaveandAddNew, "SalesmenModal", function () { Salesmen_LoadingWithPaging(); });
    else if (pDontReloadTable == 1)  // Called from Modal Add Quotation/Operation
        InsertUpdateFunction("form", "/api/Salesmen/Update", {
            pID: $("#hSalesmenID").val()
            ,pCode: $("#txtSalesmenCode").val().trim()
           , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
        }, pSaveandAddNew, "SalesmenModal"
        , function () {
            if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
            Salesmen_GetList($('#slSalesmen option:selected').val(), null);
        });
    else if (pDontReloadTable == 2) // Called from Edit Quotation
        InsertUpdateFunction("form", "/api/Salesmen/Update", {
            pID: $("#hSalesmenID").val()
            , pCode: $("#txtSalesmenCode").val().trim()
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
        }, pSaveandAddNew, "SalesmenModal"
        , function () {
            if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
            Salesmen_GetList($('#slSalesmen option:selected').val(), null);
            SalesmenContacts_GetList($('#slSalesmenContacts option:selected').val(), $('#slSalesmen option:selected').val(), function () { QuotationsEdit_SalesmenContactChanged(); });
        });
    else if (pDontReloadTable == 3) // Called from OperationPartners
        InsertUpdateFunction("form", "/api/Salesmen/Update", {
            pID: $("#hSalesmenID").val(),
            pCode: $("#txtSalesmenCode").val().trim()
            , pName: $("#txtSalesmenName").val().trim()
            , pLocalName: $("#txtSalesmenLocalName").val().trim()
        }, pSaveandAddNew, "SalesmenModal"
        , function () {
            if (pSaveandAddNew) Salesmen_ClearAllControls(pDontReloadTable);
            PartnerNames_GetList($('#slPartners option:selected').val(), function () { PartnerContacts_GetList(null, null, null); });
        });
}
function Salesmen_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/Salesmen/UnlockRecord",
            { pID: ($("#hSalesmenID").val() == "" ? 0 : $("#hSalesmenID").val()) },
            "SalesmenModal",
            function () { Salesmen_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 2) // Called from Add New Operation
            UnlockFunction("/api/Salesmen/UnlockRecord",
            { pID: ($("#hSalesmenID").val() == "" ? 0 : $("#hSalesmenID").val()) },
            "SalesmenModal",
                    function () {
                        Salesmen_GetList($('#slSalesmen option:selected').val(), null);
                        SalesmenContacts_GetList($('#slSalesmenContacts option:selected').val(), $('#slSalesmen option:selected').val(), function () {/* OperationsEdit_SalesmenContactChanged(); */ });
                    });
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                UnlockFunction("/api/Salesmen/UnlockRecord",
                { pID: ($("#hSalesmenID").val() == "" ? 0 : $("#hSalesmenID").val()) },
                "SalesmenModal",
                function () {
                    PartnerNames_GetList($('#slPartners option:selected').val(), null);
                });
}
//function Salesmen_Delete(pID) {
//    DeleteListFunction("/api/Salesmen/DeleteByID", { "pID": pID }, function () { Salesmen_LoadingWithPaging(); });
//}
function Salesmen_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblSalesmen') == "") {
        // check if SubAccounts Exist in A_JVDetails and A_VoucherDetails
        swal(strSorry, "You must choose at Least One record to Delete")
    } 
                   
               else {
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
                            CallGETFunctionWithParameters("/api/Salesmen/Delete", { pSalesmenIDs: GetAllSelectedIDsAsString('tblSalesmen') },
                                function (data) {
                                    if (data) {
                                        swal("deleted Successfully");
                                        Salesmen_LoadingWithPaging();
                                    }
                                    else {
                                        swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
                                       
                                    }
                               
                            });
                            swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
                        });
      
                }
    }

function Salesmen_FillControls(pID, pDontLoadTable) {
    if (IsAccountingActive)
        $(".classAccountingOption").removeClass("hide");
    else
        $(".classAccountingOption").addClass("hide");

    var tr = $("tr[ID='" + pID + "']");
    debugger;
    if (IsMESCOCompany)
        $("#txtcrmCode").parent().removeClass("hide");
        $("#labelCode").text("Finance 365 Ref");

    $("#hSalesmenID").val(pID);   
    debugger;

    $("#lblSalesmenShown").html(": " + $(tr).find("td.Name").text());
    $("#txtSalesmenCode").val($(tr).find("td.Code").text());
    $("#txtSalesmenName").val($(tr).find("td.Name").text());
    $("#txtSalesmenLocalName").val($(tr).find("td.LocalName").text());
    $("#txtSalesmenCrmCode").val($(tr).find("td.crmCode").text());
    Salesmen_GeneralUpload_Initialise();
    //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveSalesmen").attr("onclick", "Salesmen_Update(false, pDontLoadTable);");
        $("#btnSaveandNewSalesmen").attr("onclick", "Salesmen_Update(true, pDontLoadTable);");
    }
    else {
        $("#btnSaveSalesmen").attr("onclick", "Salesmen_Update(false);");
        $("#btnSaveandNewSalesmen").attr("onclick", "Salesmen_Update(true);");
    }
    Salesmen_ShowHideTabs();
}
function Salesmen_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtSalesmenCode", "txtSalesmenName", "txtSalesmenLocalName", "txtSalesmenWebsite", "txtSalesmenNotes", "txtSalesmenVATNumber", "txtSalesmenBankName", "txtSalesmenBankAddress", "txtSalesmenSwift", "txtSalesmenBankAccountNumber", "txtSalesmenIBANNumber"),
    //    new Array("slSalesmenPaymentTerms", "slSalesmenCurrencies", "slSalesmenTaxeTypes"), new Array("cbSalesmenIsInactive", "cbSalesmenIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $("#SalesmenModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#SalesmenModal").addClass("hide");" in Quotations.js
    $(".classAccountingOption").addClass("hide");
    ClearAll("#SalesmenModal", null);

    $("#slSalesmenAccount").removeAttr("disabled");
    $("#slSalesmenSubAccountGroup").removeAttr("disabled");
    $("#txtSalesmenName").removeAttr("disabled");
    $("#txtSalesmenLocalName").removeAttr("disabled");

    //$("#slSalesmenSubAccountGroup").val(0);
    $("#slSalesmenAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slSalesmenSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnSalesmenVisitWebsite").attr('href', 'http://');
    $("#bodySalesmenAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodySalesmenPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodySalesmenContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    Salesmen_PaymentTerms_GetList(null, null);
    Salesmen_Currencies_GetList(null, null);
    Salesmen_TaxeTypes_GetList(null, null);
    //Salesmen_Network_GetList(null, null);
    //EOF for AddressModal
    debugger;

    //this 2nd flag in Salesmens_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveSalesmen").attr("onclick", "Salesmen_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewSalesmen").attr("onclick", "Salesmen_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveSalesmen").attr("onclick", "Salesmen_Insert(false);");
        $("#btnSaveandNewSalesmen").attr("onclick", "Salesmen_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataSalesmen").parent().children().removeClass("active");
    $("#stepsBasicDataSalesmen").addClass("active");
    $("#BasicDataSalesmen").parent().children().removeClass("active");
    $("#BasicDataSalesmen").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Salesmen_ShowHideTabs();
}
function Salesmen_SetWebSiteHref() {
    $("#btnSalesmenVisitWebsite").attr('href', 'http://' + $("#txtSalesmenWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function Salesmen_ShowHideTabs() {
    if ($("#txtSalesmenCode").val() == "") {
        $("#stepsContactsSalesmen").addClass('hide');
        $("#stepsAddressesSalesmen").addClass('hide');
        $("#stepsPartnersBanksSalesmen").addClass('hide');
        $("#stepsSalesmenNetwork").addClass('hide');
    }
    else {
        $("#stepsContactsSalesmen").removeClass('hide');
        $("#stepsAddressesSalesmen").removeClass('hide');
        $("#stepsPartnersBanksSalesmen").removeClass('hide');
        $("#stepsSalesmenNetwork").removeClass('hide');
    }
}
// Fill PaymentTerms select box
function Salesmen_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slSalesmenPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
// Fill Currencies select box
function Salesmen_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slSalesmenCurrencies", " WHERE 1=1 ORDER BY Code ");
}
// Fill TaxeTypes select box
function Salesmen_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slSalesmenTaxeTypes");
}
function Salesmen_Network_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Network/LoadAll", "Select Network", "slSalesmenNetwork", "ORDER BY Name", null)
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
    if ($("#hSalesmenID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        $("#lblOperatorTankChargeShown").text(" : " + $("#txtSalesmenName").val());
        $("#tblOperatorTankCharge tbody tr").html("");
        FadePageCover(true);
        jQuery("#OperatorTankChargeModal").modal("show");
        var pParametersWithValues = {
            pWhereClauseOperatorTankCharge: "WHERE SalesmenID=" + $("#hSalesmenID").val() + " ORDER BY ChargeTypeName"
        };
        CallGETFunctionWithParameters("/api/Salesmen/OperatorTankCharge_LoadAll", pParametersWithValues
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
            , pSalesmenID: $("#hSalesmenID").val() == "" ? 0 : $("#hSalesmenID").val()
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
        CallGETFunctionWithParameters("/api/Salesmen/OperatorTankCharge_Save", pParametersWithValues
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
                    , pSalesmenID: $("#hSalesmenID").val()
                };
                FadePageCover(true);
                CallGETFunctionWithParameters("/api/Salesmen/OperatorTankCharge_DeleteList", pParametersWithValues
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
function Salesmen_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Salesmen";
    glbGeneralUploadFolderName = $("#hSalesmenID").val() == "" ? "" : $("#txtSalesmenName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Salesmen//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Salesmen/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Salesmen";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Salesmen";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Salesmen";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
/**********************Salesmen Network****************************/
function SalesmenNetwork_BindTableRows(pSalesmenNetwork) {
    debugger;
    //ClearAllTableRows("tblSalesmenNetwork");
    $("#tblSalesmenNetwork tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pSalesmenNetwork, function (i, item) {
        AppendRowtoTable("tblSalesmenNetwork",
        ("<tr ID='" + item.ID + "' ondblclick='SalesmenNetwork_FillControls(" + item.ID + ");'>"
        //("<tr ID='" + item.ID + "'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='SalesmenID hide'>" + item.SalesmenID + "</td>"
                    + "<td class='NetworkID hide'>" + item.NetworkID + "</td>"
                    + "<td class='NetworkName'>" + item.NetworkName + "</td>"
                    + "<td class='FromDate'>" + item.StringFromDate + "</td>"
                    + "<td class='ToDate'>" + item.StringToDate + "</td>"
                    //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                    + "<td class='Notes'>" + item.Notes + "</td>"
                    + "<td class='hide'><a href='#SalesmenNetworkModal' data-toggle='modal' onclick='SalesmenNetwork_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblSalesmenNetwork", "ID", "cb-CheckAll-SalesmenNetwork");
    CheckAllCheckbox("HeaderDeletetblSalesmenNetworkID");
    HighlightText("#tblSalesmenNetwork>tbody>tr", $("#txtSalesmenNetworkSearch").val().trim());
    strBindTableRowsFunctionName = "Salesmen_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function SalesmenNetwork_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hSalesmenID").val();
    strLoadWithPagingFunctionName = "/api/SalesmenNetwork/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "SalesmenNetwork_BindTableRows";
    var pWhereClause = " WHERE SalesmenID = " + pID;
    pWhereClause += ($("#txtSalesmenNetworkSearch").val().trim() == "" || $("#txtSalesmenNetworkSearch").val() == undefined
        ? ""
        : " AND NetworkName LIKE '%" + $("#txtSalesmenNetworkSearch").val().trim() + "%'");
    var pOrderBy = " NetworkName ";
    LoadWithPagingForModal("/api/SalesmenNetwork/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            SalesmenNetwork_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Salesmen/LoadWithPaging";
            //strBindTableRowsFunctionName = "Salesmen_BindTableRows";
    });

}
//to reset function names as in mainapp.master
function SalesmenNetwork_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Salesmen/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Salesmen_BindTableRows";
}
function SalesmenNetwork_ClearAllControls() {
    debugger;
    ClearAll("#SalesmenNetworkModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblSalesmenNetworkShown").html($("#lblSalesmenShown").html());
    Salesmen_Network_GetList(null, null);
    $("#txtSalesmenNetworkFromDate").val(_FormattedTodaysDate);
    $("#txtSalesmenNetworkToDate").val(_FormattedTodaysDate);

    $("#btnSaveSalesmenNetwork").attr("onclick", "SalesmenNetwork_Insert(false);");
    $("#btnSaveandNewSalesmenNetwork").attr("onclick", "SalesmenNetwork_Insert(true);");

}
function SalesmenNetwork_FillControls(pSalesmenNetworkID) {
    debugger;
    ClearAll("#SalesmenNetworkModal", null);
    jQuery("#SalesmenNetworkModal").modal("show");
    $("#hSalesmenNetworkID").val(pSalesmenNetworkID);
    var tr = $("#tblSalesmenNetwork tbody tr[ID='" + pSalesmenNetworkID + "']");
    var pNetworkID = $(tr).find("td.NetworkID").text();
    $("#lblSalesmenNetworkShown").html($("#lblSalesmenShown").html());
    Salesmen_Network_GetList(pNetworkID, null);
    $("#txtSalesmenNetworkFromDate").val($(tr).find("td.FromDate").text());
    $("#txtSalesmenNetworkToDate").val($(tr).find("td.ToDate").text());
    $("#txtSalesmenNetworkNotes").val($(tr).find("td.Notes").text());

    $("#btnSaveSalesmenNetwork").attr("onclick", "SalesmenNetwork_Update(false);");
    $("#btnSaveandNewSalesmenNetwork").attr("onclick", "SalesmenNetwork_Update(true);");
}
function SalesmenNetwork_Insert(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtSalesmenNetworkFromDate").val()), ConvertDateFormat($("#txtSalesmenNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/SalesmenNetwork/Insert"
            , {
                pSalesmenID: $('#hSalesmenID').val()
                , pNetworkID: $('#slSalesmenNetwork').val()
                , pFromDate: $('#txtSalesmenNetworkFromDate').val().trim() == "" ? "0" : $('#txtSalesmenNetworkFromDate').val()
                , pToDate: $('#txtSalesmenNetworkToDate').val().trim() == "" ? "0" : $('#txtSalesmenNetworkToDate').val()
                , pNotes: $('#txtSalesmenNetworkNotes').val().trim() == "" ? "0" : $('#txtSalesmenNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "SalesmenNetworkModal"
            , function () {
                SalesmenNetwork_LoadingWithPagingForModal($('#hSalesmenID').val());
                if (pSaveandAddNew)
                    SalesmenNetwork_ClearAllControls();
            });
    }
}
function SalesmenNetwork_Update(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtSalesmenNetworkFromDate").val()), ConvertDateFormat($("#txtSalesmenNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/SalesmenNetwork/Insert"
            , {
                pID: $("#hSalesmenNetworkID").val()
                , pSalesmenID: $('#hSalesmenID').val()
                , pNetworkID: $('#slSalesmenNetwork').val()
                , pFromDate: $('#txtSalesmenNetworkFromDate').val().trim() == "" ? "0" : $('#txtSalesmenNetworkFromDate').val()
                , pToDate: $('#txtSalesmenNetworkToDate').val().trim() == "" ? "0" : $('#txtSalesmenNetworkToDate').val()
                , pNotes: $('#txtSalesmenNetworkNotes').val().trim() == "" ? "0" : $('#txtSalesmenNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "SalesmenNetworkModal"
            , function () {
                SalesmenNetwork_LoadingWithPagingForModal($('#hSalesmenID').val());
                if (pSaveandAddNew)
                    SalesmenNetwork_ClearAllControls();
            });
    }
}
function SalesmenNetwork_Delete() {
    debugger;
    var pSalesmenNetworkIDs = GetAllSelectedIDsAsString('tblSalesmenNetwork');
    //Confirmation message to delete
    if (pSalesmenNetworkIDs != "")
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
            DeleteListFunction("/api/SalesmenNetwork/Delete", { "pSalesmenNetworkIDs": pSalesmenNetworkIDs }, function () {
                //SalesmenNetwork_LoadAll($("#hAirlineID").val());
                SalesmenNetwork_LoadingWithPagingForModal($("#hSalesmenID").val());
            });
            //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
        });
}


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Salesmen_onFileSelected(event, pBtnName) {
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
                    Salesmen_ImportFromExcelFile(oJS, pBtnName);
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

function Salesmen_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Salesmen Name List from DB
    var ExistingSalesmenNameList;
    var ExistingSalesmenNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/Salesmen/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
            , function (pData) {
                ExistingSalesmenNameList = JSON.parse(pData[0]);
                ExistingSalesmenNameArray = ExistingSalesmenNameList.map(item => item.Name);


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
                        if (ExistingSalesmenNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                    swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Salesmen ");
                    FadePageCover(false);
                } else if (IsNameExistsInExcel) {
                    swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                    FadePageCover(false);
                } else {
                    FadePageCover(true);
                    CallPOSTFunctionWithParameters("/api/Salesmen/InsertListFromExcel", pParametersWithValues, function (pData) {
                        let pReturnedMessage = pData[0];
                        if (pReturnedMessage == "")
                            swal("Success", "Saved Successfully.");
                        else
                            swal("", pReturnedMessage);
                        Salesmen_LoadingWithPaging();
                    }, null);


                }


                $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



                FadePageCover(false);
            }
            , null);



}
//******************************EOF Reading Excel Files***************************************//;