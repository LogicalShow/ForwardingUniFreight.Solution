//PartnerTypeID for CUSTOMERS is 1
//PartnerTypeID for OwnersS is 2
//PartnerTypeID for SHIPPING OwnersS is 3
//PartnerTypeID for CUSTOMS CLEARANCE OwnersS is 4
//PartnerTypeID for SHIPPINGLINES is 5
//PartnerTypeID for AIRLINES is 6
//PartnerTypeID for TRUCKERS is 7
//PartnerTypeID for SUPPLIERS is 8

// Owners Region ---------------------------------------------------------------
// Bind Owners Table Rows
var intPartnerTypeID = 9;
function Owners_Initialize() {
    debugger;
    strLoadWithPagingFunctionName = "/api/Owners/LoadWithPaging";
    LoadView("/MasterData/Owners", "div-content", function () {
        debugger;
        $('#slOwnerCustomers').css({ 'width': '100%' }).select2();
        $('#slOwnerCustomers').html($('#hReadySlCustomers').html());
        $('#slOwnerCustomer').html($('#hReadySlCustomers').html());

        if (pDefaults.UnEditableCompanyName == "EF" || pDefaults.UnEditableCompanyName == "FPL") {
            $('#div-search-controls').addClass('hide');
            $('#srchControls').removeClass('hide');
        }
        else {
            $('#div-search-controls').removeClass('hide');
            $('#srchControls').addClass('hide');
        }
        LoadWithPaging("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, 0, 10
            , function (pTabelRows) { Owners_BindTableRows(pTabelRows); });
    },
        function () { Owners_ClearAllControls(); },
        function () { Owners_DeleteList(); });
}
function Owners_BindTableRows(pOwners) {
    debugger;
    $("#hl-menu-MasterData").parent().addClass("active");
    ClearAllTableRows("tblOwners");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOwners, function (i, item) {
        AppendRowtoTable("tblOwners",
            ("<tr ID='" + item.ID + "' ondblclick='Owners_EditByDblClick(" + item.ID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='CustomerName'>" + item.CustomerName + "</td>"
                + "<td class='CustomerLocalName'>" + item.CustomerLocalName + "</td>"
                + "<td class='Name'>" + item.Name + "</td>"
                + "<td class='LocalName'>" + (item.LocalName == "0" ? "" : item.LocalName) + "</td>"
                + "<td class='Code'>" + item.Code + "</td>"
                + "<td class='CustomerIds hide'>" + (item.CustomersIds == "0" ? "" : item.CustomersIds) + "</td>"
                + "<td class='CustomerId hide'>" + (item.CustomerId == "0" ? "" : item.CustomerId) + "</td>"


                + "<td class='hide'><a href='#OwnersModal' data-toggle='modal' onclick='Owners_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblOwners", "ID");
    CheckAllCheckbox("ID");
    HighlightText("#tblOwners>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function Owners_EditByDblClick(pID) {
    jQuery("#OwnersModal").modal("show");
    Owners_FillControls(pID);
}
function Owners_LoadingWithPaging() {
    debugger;
    var pWhereClause = "where 1=1\n";
    var srchTxt = $("#txt-Search").val().trim();
    if (srchTxt!= "") {
        pWhereClause += "AND CustomerName LIKE N'%" + srchTxt + "%'" + "\n";
        pWhereClause += "AND CustomerLocalName LIKE N'%" + srchTxt + "%'" + "\n";
        pWhereClause += "AND Name LIKE N'%" + srchTxt + "%'" + "\n";
        pWhereClause += "AND LocalName LIKE N'%" + srchTxt + "%'" + "\n";
        pWhereClause += "AND Code LIKE N'%" + srchTxt + "%'" + "\n";
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
        pWhereClause += " and (CustomerName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR CustomerName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchCustomerLocal").val().trim() != "") {
        var vals = IsNull($("#srchCustomerLocal").val(), '').split(',');
        pWhereClause += " and (CustomerLocalName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR CustomerLocalName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchOwner").val().trim() != "") {
        var vals = IsNull($("#srchOwner").val(), '').split(',');
        pWhereClause += " and (Name ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR Name";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }
    if ($("#srchOwnerLocal").val().trim() != "") {
        var vals = IsNull($("#srchOwnerLocal").val(), '').split(',');
        pWhereClause += " and (LocalName ";
        for (var i = 0; i < vals.length; i++) {
            if (i > 0)
                pWhereClause += " OR LocalName";
            pWhereClause += " Like N'%" + vals[i] + "%'";
        }
        pWhereClause += ")";
    }

    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/Owners/LoadWithPaging", pWhereClause, $("#div-Pager li.active a").text(), $('#select-page-size').val().trim(), function (pTabelRows) { Owners_BindTableRows(pTabelRows); Owners_ClearAllControls(); });
    HighlightText("#tblOwners>tbody>tr", $("#txt-Search").val().trim());

}
function Owners_Insert(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var selectedCustomerIdsArray = $("#slOwnerCustomers").val();

    var selectedCustomerIds = selectedCustomerIdsArray && selectedCustomerIdsArray.length > 0
        ? selectedCustomerIdsArray.join(",")
        : "";

    InsertUpdateFunction("form", "/api/Owners/Insert", {

         pName: $("#txtOwnersName").val().trim()
        , pLocalName: $("#txtOwnersLocalName").val().trim()
      /*  , pCustomerIds: selectedCustomerIds*/
        , pCustomerID: $("#slOwnerCustomer").val() == "" ? 0 : $("#slOwnerCustomer").val()
        /* , pEmail: ($("#txtOwnersEmail").val() == null ? "" : $("#txtOwnersEmail").val().trim())*/

    }, pSaveandAddNew, "OwnersModal", function () { Owners_LoadingWithPaging(); });
    debugger;
}
function Owners_Update(pSaveandAddNew, pDontReloadTable) {
    debugger;
    var selectedCustomerIdsArray = $("#slOwnerCustomers").val();

    var selectedCustomerIds = selectedCustomerIdsArray && selectedCustomerIdsArray.length > 0
        ? selectedCustomerIdsArray.join(",")
        : "";
    InsertUpdateFunction("form", "/api/Owners/Update", {

            pID: $("#hOwnersID").val()
            , pCode: $("#txtOwnersCode").val().trim()
            , pName: $("#txtOwnersName").val().trim()
            , pLocalName: $("#txtOwnersLocalName").val().trim()
            , pCustomerID: $("#slOwnerCustomer").val() == "" ? 0 : $("#slOwnerCustomer").val()

        }, pSaveandAddNew, "OwnersModal", function () { Owners_LoadingWithPaging(); });
    
}
function Owners_UnlockRecord(pDontReloadTable) {
    debugger;
    if (!pDontReloadTable) //normal call from itself (not from Quotations or Operations Add or OperationPartners)
        UnlockFunction("/api/Owners/UnlockRecord",
            { pID: ($("#hOwnersID").val() == "" ? 0 : $("#hOwnersID").val()) },
            "OwnersModal",
            function () { Owners_LoadingWithPaging(); }); //the callback function
    else
        if (pDontReloadTable == 2) // Called from Add New Operation
            UnlockFunction("/api/Owners/UnlockRecord",
                { pID: ($("#hOwnersID").val() == "" ? 0 : $("#hOwnersID").val()) },
                "OwnersModal",
                function () {
                    Owners_GetList($('#slOwners option:selected').val(), null);
                    OwnersContacts_GetList($('#slOwnersContacts option:selected').val(), $('#slOwners option:selected').val(), function () {/* OperationsEdit_OwnersContactChanged(); */ });
                });
        else
            if (pDontReloadTable == 3) // Called from OperationPartners
                UnlockFunction("/api/Owners/UnlockRecord",
                    { pID: ($("#hOwnersID").val() == "" ? 0 : $("#hOwnersID").val()) },
                    "OwnersModal",
                    function () {
                        PartnerNames_GetList($('#slPartners option:selected').val(), null);
                    });
}

function Owners_DeleteList() {
    debugger;
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblOwners') == "") {
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
                CallGETFunctionWithParameters("/api/Owners/Delete", { pOwnersIDs: GetAllSelectedIDsAsString('tblOwners') },
                    function (data) {
                        if (data) {
                            swal("deleted Successfully");
                            Owners_LoadingWithPaging();
                        }
                        else {
                            swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");

                        }

                    });
                swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });

    }
}

function Owners_FillControls(pID, pDontLoadTable) {
   
    var tr = $("tr[ID='" + pID + "']");
    debugger;
    var customerIdsString = $(tr).find("td.CustomerIds").text();
    var customerIdsArray = customerIdsString.split(',').map(function (id) {
        return parseInt(id,10);
    });
      
    $("#hOwnersID").val(pID);

    $("#lblOwnersShown").html(": " + $(tr).find("td.Name").text());
    $("#txtOwnersCode").val($(tr).find("td.Code").text());
    $("#txtOwnersName").val($(tr).find("td.Name").text());
    $("#txtOwnersLocalName").val($(tr).find("td.LocalName").text());
    $("#slOwnerCustomer").val($(tr).find("td.CustomerId").text());
    $("#slOwnerCustomers").val($(tr).find("td.CustomerIds").text().split(",")).change();
    Owners_GeneralUpload_Initialise();
    //this 2nd flag in Customers_Update is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveOwners").attr("onclick", "Owners_Update(false, pDontLoadTable);");
        $("#btnSaveandNewOwners").attr("onclick", "Owners_Update(true, pDontLoadTable);");
    }
    else {
        $("#btnSaveOwners").attr("onclick", "Owners_Update(false);");
        $("#btnSaveandNewOwners").attr("onclick", "Owners_Update(true);");
    }
    Owners_ShowHideTabs();
}
function Owners_ClearAllControls(pDontLoadTable, callback) {
    //ClearAllControls(new Array("hID", "txtOwnersCode", "txtOwnersName", "txtOwnersLocalName", "txtOwnersWebsite", "txtOwnersNotes", "txtOwnersVATNumber", "txtOwnersBankName", "txtOwnersBankAddress", "txtOwnersSwift", "txtOwnersBankAccountNumber", "txtOwnersIBANNumber"),
    //    new Array("slOwnersPaymentTerms", "slOwnersCurrencies", "slOwnersTaxeTypes"), new Array("cbOwnersIsInactive", "cbOwnersIsConsolidatedInvoice"));//an alternative fn is with abdelmawgood
    debugger;
    $("#OwnersModal").removeClass("hide");//i added this line here to handle the case of trying to edit empty shipper or consignee from Quotations or other places; to remember search for keyword "$("#OwnersModal").addClass("hide");" in Quotations.js
    $(".classAccountingOption").addClass("hide");
    ClearAll("#OwnersModal", null);

    $("#slOwnersAccount").removeAttr("disabled");
    $("#slOwnersSubAccountGroup").removeAttr("disabled");
    $("#txtOwnersName").removeAttr("disabled");
    $("#txtOwnersLocalName").removeAttr("disabled");

    //$("#slOwnersSubAccountGroup").val(0);
    $("#slOwnersAccount").html('<option value=0>' + TranslateString("SelectFromMenu") + '</option>');

    $("#slOwnersSubAccount").html('<option value=0>' + 'AUTO GENERATED' + '</option>');


    $('#slOwnerCustomers').val(null).trigger('change');

    //ClearAll("#Billing", null);
    //ClearAll("#Address-form", null);
    $("#btnOwnersVisitWebsite").attr('href', 'http://');
    $("#bodyOwnersAddresses").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyOwnersPartnersBanks").html(""); // sherif: i cleared it here coz its a textarea not an input
    $("#bodyOwnersContacts").html(""); // sherif: i cleared it here coz its a textarea not an input

    //for AddressModal
    Owners_PaymentTerms_GetList(null, null);
    Owners_Currencies_GetList(null, null);
    Owners_TaxeTypes_GetList(null, null);
    //Owners_Network_GetList(null, null);
    //EOF for AddressModal
    debugger;
    //GetListWithName(null, "/api/Customers/LoadAll", "Select", "slOwnerCustomers", function () {});


    //this 2nd flag in Ownerss_Insert is true when called from outside the form not to load the table
    //parameter in the next 2 lines are 1:Quotations call, 2:Operations call, 3:OperationPartners
    if (pDontLoadTable != null && pDontLoadTable != undefined) {
        $("#btnSaveOwners").attr("onclick", "Owners_Insert(false, " + pDontLoadTable + ");");
        $("#btnSaveandNewOwners").attr("onclick", "Owners_Insert(true, " + pDontLoadTable + ");");
    }
    else {
        $("#btnSaveOwners").attr("onclick", "Owners_Insert(false);");
        $("#btnSaveandNewOwners").attr("onclick", "Owners_Insert(true);");
    }
    $("#cb-CheckAll").prop('checked', false);

    if (callback != null && callback != undefined)
        callback();
    //to set the wizard to BasicData
    $("#stepsBasicDataOwners").parent().children().removeClass("active");
    $("#stepsBasicDataOwners").addClass("active");
    $("#BasicDataOwners").parent().children().removeClass("active");
    $("#BasicDataOwners").addClass("active");
    //to hide Contacts and Addresses tabs in case of partner is not saved yet
    Owners_ShowHideTabs();
}
function Owners_SetWebSiteHref() {
    $("#btnOwnersVisitWebsite").attr('href', 'http://' + $("#txtOwnersWebsite").val());
}
//to hide Contacts and Addresses tabs in case of partner is not saved yet
function Owners_ShowHideTabs() {
    if ($("#txtOwnersCode").val() == "") {
        $("#stepsContactsOwners").addClass('hide');
        $("#stepsAddressesOwners").addClass('hide');
        $("#stepsPartnersBanksOwners").addClass('hide');
        $("#stepsOwnersNetwork").addClass('hide');
    }
    else {
        $("#stepsContactsOwners").removeClass('hide');
        $("#stepsAddressesOwners").removeClass('hide');
        $("#stepsPartnersBanksOwners").removeClass('hide');
        $("#stepsOwnersNetwork").removeClass('hide');
    }
}
// Fill PaymentTerms select box
function Owners_PaymentTerms_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListPaymentTermWithCodeAndDaysAttr(pID, "/api/PaymentTerms/LoadAll", "Select PaymentTerm", "slOwnersPaymentTerms", " WHERE 1=1 ORDER BY Code ");
}
// Fill Currencies select box
function Owners_Currencies_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slOwnersCurrencies", " WHERE 1=1 ORDER BY Code ");
}
// Fill TaxeTypes select box
function Owners_TaxeTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCode(pID, "/api/TaxeTypes/LoadAll", "Select Tax Type", "slOwnersTaxeTypes");
}
function Owners_Network_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithNameAndWhereClause(pID, "/api/Network/LoadAll", "Select Network", "slOwnersNetwork", "ORDER BY Name", null)
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
    if ($("#hOwnersID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        $("#lblOperatorTankChargeShown").text(" : " + $("#txtOwnersName").val());
        $("#tblOperatorTankCharge tbody tr").html("");
        FadePageCover(true);
        jQuery("#OperatorTankChargeModal").modal("show");
        var pParametersWithValues = {
            pWhereClauseOperatorTankCharge: "WHERE OwnersID=" + $("#hOwnersID").val() + " ORDER BY ChargeTypeName"
        };
        CallGETFunctionWithParameters("/api/Owners/OperatorTankCharge_LoadAll", pParametersWithValues
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
            , pOwnersID: $("#hOwnersID").val() == "" ? 0 : $("#hOwnersID").val()
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
        CallGETFunctionWithParameters("/api/Owners/OperatorTankCharge_Save", pParametersWithValues
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
                        , pOwnersID: $("#hOwnersID").val()
                    };
                    FadePageCover(true);
                    CallGETFunctionWithParameters("/api/Owners/OperatorTankCharge_DeleteList", pParametersWithValues
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
function Owners_GeneralUpload_Initialise() {
    debugger;
    glbGeneralUploadModalName = ""; //if the upload is in a modal then is not opened
    glbGeneralUploadTableName = "tblUploadedFiles_Owners";
    glbGeneralUploadFolderName = $("#hOwnersID").val() == "" ? "" : $("#txtOwnersName").val().trim();
    glbGeneralUploadPath = "/DocsInFiles//Owners//";
    glbGeneralUploadRelativePath = "~/DocsInFiles/Owners/";
    glbGeneralUploadBtnUploadName = "inputFileUpload_Owners";
    glbTblTHSelectAllTagName = "HeaderDeleteUploadedFiles_Owners";
    glbTblInputSelectAllInputName = "cb-CheckAll-UploadedFiles_Owners";

    if (glbGeneralUploadFolderName != "")
        GeneralUpload_FillControls();
}
//*********************************EOF Uploaded Files***************************************//
/**********************Owners Network****************************/
function OwnersNetwork_BindTableRows(pOwnersNetwork) {
    debugger;
    //ClearAllTableRows("tblOwnersNetwork");
    $("#tblOwnersNetwork tbody tr").html("");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOwnersNetwork, function (i, item) {
        AppendRowtoTable("tblOwnersNetwork",
            ("<tr ID='" + item.ID + "' ondblclick='OwnersNetwork_FillControls(" + item.ID + ");'>"
                //("<tr ID='" + item.ID + "'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='OwnersID hide'>" + item.OwnersID + "</td>"
                + "<td class='NetworkID hide'>" + item.NetworkID + "</td>"
                + "<td class='NetworkName'>" + item.NetworkName + "</td>"
                + "<td class='FromDate'>" + item.StringFromDate + "</td>"
                + "<td class='ToDate'>" + item.StringToDate + "</td>"
                //+ "<td class='InsertionDate'>" + ConvertDateFormat(GetDateWithFormatMDY(item.CreationDate)) + "</td>"
                + "<td class='Notes'>" + item.Notes + "</td>"
                + "<td class='hide'><a href='#OwnersNetworkModal' data-toggle='modal' onclick='OwnersNetwork_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    debugger;
    ApplyPermissions();
    BindAllCheckboxonTable("tblOwnersNetwork", "ID", "cb-CheckAll-OwnersNetwork");
    CheckAllCheckbox("HeaderDeletetblOwnersNetworkID");
    HighlightText("#tblOwnersNetwork>tbody>tr", $("#txtOwnersNetworkSearch").val().trim());
    strBindTableRowsFunctionName = "Owners_BindTableRows";
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
}
function OwnersNetwork_LoadingWithPagingForModal(pID) {//pID = ID and it is the search key which will be used in the where clause
    debugger;
    if (pID == 0 || pID == undefined)
        pID = $("#hOwnersID").val();
    strLoadWithPagingFunctionName = "/api/OwnersNetwork/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "OwnersNetwork_BindTableRows";
    var pWhereClause = " WHERE OwnersID = " + pID;
    pWhereClause += ($("#txtOwnersNetworkSearch").val().trim() == "" || $("#txtOwnersNetworkSearch").val() == undefined
        ? ""
        : " AND NetworkName LIKE '%" + $("#txtOwnersNetworkSearch").val().trim() + "%'");
    var pOrderBy = " NetworkName ";
    LoadWithPagingForModal("/api/OwnersNetwork/LoadWithPaging", pWhereClause, pOrderBy, 1 /*($("#txt-Search").val() == "" ? $("#div-Pager li.active a").text() : 1)*/, $('#select-page-size').val().trim()
        , function (pTabelRows) {
            OwnersNetwork_BindTableRows(pTabelRows); //TaxeTypes_ClearAllControls();
            strLoadWithPagingFunctionName = "/api/Owners/LoadWithPaging";
            //strBindTableRowsFunctionName = "Owners_BindTableRows";
        });

}
//to reset function names as in mainapp.master
function OwnersNetwork_ResetFunctionsNames() {
    strLoadWithPagingFunctionName = "/api/Owners/LoadWithPaging";//sherif: to fix paging cz it calls whats related to the original table
    strBindTableRowsFunctionName = "Owners_BindTableRows";
}
function OwnersNetwork_ClearAllControls() {
    debugger;
    ClearAll("#OwnersNetworkModal", null);
    var _FormattedTodaysDate = getTodaysDateInddMMyyyyFormat();

    $("#lblOwnersNetworkShown").html($("#lblOwnersShown").html());
    Owners_Network_GetList(null, null);
    $("#txtOwnersNetworkFromDate").val(_FormattedTodaysDate);
    $("#txtOwnersNetworkToDate").val(_FormattedTodaysDate);

    $("#btnSaveOwnersNetwork").attr("onclick", "OwnersNetwork_Insert(false);");
    $("#btnSaveandNewOwnersNetwork").attr("onclick", "OwnersNetwork_Insert(true);");

}
function OwnersNetwork_FillControls(pOwnersNetworkID) {
    debugger;
    ClearAll("#OwnersNetworkModal", null);
    jQuery("#OwnersNetworkModal").modal("show");
    $("#hOwnersNetworkID").val(pOwnersNetworkID);
    var tr = $("#tblOwnersNetwork tbody tr[ID='" + pOwnersNetworkID + "']");
    var pNetworkID = $(tr).find("td.NetworkID").text();
    $("#lblOwnersNetworkShown").html($("#lblOwnersShown").html());
    Owners_Network_GetList(pNetworkID, null);
    $("#txtOwnersNetworkFromDate").val($(tr).find("td.FromDate").text());
    $("#txtOwnersNetworkToDate").val($(tr).find("td.ToDate").text());
    $("#txtOwnersNetworkNotes").val($(tr).find("td.Notes").text());

    $("#btnSaveOwnersNetwork").attr("onclick", "OwnersNetwork_Update(false);");
    $("#btnSaveandNewOwnersNetwork").attr("onclick", "OwnersNetwork_Update(true);");
}
function OwnersNetwork_Insert(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOwnersNetworkFromDate").val()), ConvertDateFormat($("#txtOwnersNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/OwnersNetwork/Insert"
            , {
                pOwnersID: $('#hOwnersID').val()
                , pNetworkID: $('#slOwnersNetwork').val()
                , pFromDate: $('#txtOwnersNetworkFromDate').val().trim() == "" ? "0" : $('#txtOwnersNetworkFromDate').val()
                , pToDate: $('#txtOwnersNetworkToDate').val().trim() == "" ? "0" : $('#txtOwnersNetworkToDate').val()
                , pNotes: $('#txtOwnersNetworkNotes').val().trim() == "" ? "0" : $('#txtOwnersNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "OwnersNetworkModal"
            , function () {
                OwnersNetwork_LoadingWithPagingForModal($('#hOwnersID').val());
                if (pSaveandAddNew)
                    OwnersNetwork_ClearAllControls();
            });
    }
}
function OwnersNetwork_Update(pSaveandAddNew) {
    debugger;
    if (Date.prototype.compareDates(ConvertDateFormat($("#txtOwnersNetworkFromDate").val()), ConvertDateFormat($("#txtOwnersNetworkToDate").val())) <= 0)
        swal("Sorry", "Please check dates order.");
    else {
        InsertUpdateFunction("form", "/api/OwnersNetwork/Insert"
            , {
                pID: $("#hOwnersNetworkID").val()
                , pOwnersID: $('#hOwnersID').val()
                , pNetworkID: $('#slOwnersNetwork').val()
                , pFromDate: $('#txtOwnersNetworkFromDate').val().trim() == "" ? "0" : $('#txtOwnersNetworkFromDate').val()
                , pToDate: $('#txtOwnersNetworkToDate').val().trim() == "" ? "0" : $('#txtOwnersNetworkToDate').val()
                , pNotes: $('#txtOwnersNetworkNotes').val().trim() == "" ? "0" : $('#txtOwnersNetworkNotes').val().trim().toUpperCase()
            }, pSaveandAddNew, "OwnersNetworkModal"
            , function () {
                OwnersNetwork_LoadingWithPagingForModal($('#hOwnersID').val());
                if (pSaveandAddNew)
                    OwnersNetwork_ClearAllControls();
            });
    }
}
function OwnersNetwork_Delete() {
    debugger;
    var pOwnersNetworkIDs = GetAllSelectedIDsAsString('tblOwnersNetwork');
    //Confirmation message to delete
    if (pOwnersNetworkIDs != "")
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
                DeleteListFunction("/api/OwnersNetwork/Delete", { "pOwnersNetworkIDs": pOwnersNetworkIDs }, function () {
                    //OwnersNetwork_LoadAll($("#hAirlineID").val());
                    OwnersNetwork_LoadingWithPagingForModal($("#hOwnersID").val());
                });
                //swal("Sorry", "Some or all of the selected records were not deleted because of dependencies existance.", "warning");
            });
}


//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function Owners_onFileSelected(event, pBtnName) {
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
                    Owners_ImportFromExcelFile(oJS, pBtnName);
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

function Owners_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    // get Existing Owners Name List from DB
    var ExistingOwnersNameList;
    var ExistingOwnersNameArray;
    var IsNameEmpty = false; var NameEmptyRowNo = 0;
    var IsNameExistsInDB = false; var NameExistsInDBRowNo = 0;
    var IsNameExistsInExcel = false; var NameExistsInExcelRowNo = 0;

    CallGETFunctionWithParameters("/api/Owners/LoadAll", {
        pWhereClause: " WHERE 1=1 "
    }
        , function (pData) {
            ExistingOwnersNameList = JSON.parse(pData[0]);
            ExistingOwnersNameArray = ExistingOwnersNameList.map(item => item.Name);


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
                    if (ExistingOwnersNameArray.includes(pDataRows[i].Name.replace(/[\, ]/g, ' ').toUpperCase().trim())) {
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
                swal(strSorry, " Name in Row No. " + NameExistsInDBRowNo + " already exists in Owners ");
                FadePageCover(false);
            } else if (IsNameExistsInExcel) {
                swal(strSorry, " Name in Row No. " + NameExistsInExcelRowNo + " is duplicate ");
                FadePageCover(false);
            } else {
                FadePageCover(true);
                CallPOSTFunctionWithParameters("/api/Owners/InsertListFromExcel", pParametersWithValues, function (pData) {
                    let pReturnedMessage = pData[0];
                    if (pReturnedMessage == "")
                        swal("Success", "Saved Successfully.");
                    else
                        swal("", pReturnedMessage);
                    Owners_LoadingWithPaging();
                }, null);


            }


            $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected



            FadePageCover(false);
        }
        , null);



}
//******************************EOF Reading Excel Files***************************************//;