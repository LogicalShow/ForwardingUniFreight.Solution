//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document




$(document).ready(function () {
    debugger;
    if (pDefaults == undefined)
        LoadDefaults("/api/Defaults/LoadAll", "WHERE 1=1", function () { ServiceInvoiceReport_Print("PrintInReportBody", 1); });


    

});


function ServiceInvoiceReport_Initialize() {
    debugger;
    LoadView("/Reports/ServiceInvoiceReport", "div-content", function () {
        if (pDefaults.UnEditableCompanyName == "OCE" || pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "IST")
            $(".classShowForTank").removeClass("hide");

        

        CallGETFunctionWithParameters("/api/ServiceInvoiceReport/FillFilter", null
            , function (data) {
                debugger;
                FillListFromObject(null, 5, TranslateString("SelectFromMenu"), "slPartner", data[1], null);
                FillListFromObject(null, 1/*pCodeOrName*/, TranslateString("SelectFromMenu")/*"Select Pay. Type"*/, "slPartnerType", data[5], null);
                FillListFromObject(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu")/*"Select Pay. Type"*/, "slPOLCountries", data[6], null);
                FillListFromObject(null, 4/*pCodeOrName*/, TranslateString("SelectFromMenu")/*"Select Pay. Type"*/, "slPODCountries", data[6], null);
                $("#txtFromOpenDate").val("01/01/2000");
                $("#txtToOpenDate").val(getTodaysDateInddMMyyyyFormat());
                //-----------------------------------------------------------------
                $('#slPOLCountries').css({ 'width': '100%' }).select2();
                $('#slPODCountries').css({ 'width': '100%' }).select2();
                $('#slPOL').css({ 'width': '100%' }).select2();
                $('#slPOD').css({ 'width': '100%' }).select2();
                //-----------------------------------------------------------------
                $("div[tabindex='-1']").removeAttr('tabindex');
                
            }
            , function () { FadePageCover(false); $("#hl-menu-Reports").parent().addClass("active"); });
       
    });
}
function ServiceInvoiceReport_PrintOptions() {
    debugger;
    jQuery("#ModalSelectColumns").modal("show");
}
function POD_GetList(pID, pCountryID, pDontCallFillOtherSidePorts) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    debugger;
    //if (pID != undefined) {
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPODCountries option:selected').val() == null || $('#slPODCountries option:selected').val() == ""
            ? 0 : $('#slPODCountries option:selected').val());
    }
    if ($('input[name=cbTransportType]:checked').val() == 1)
        pWhereClause += " and IsOcean = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 2)
        pWhereClause += " and IsAir = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 3)
        pWhereClause += " and IsInland = 1 ";
    //if (pID != null)
    //    pWhereClause += " or ID=" + pID;
    pWhereClause += " order by Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POD", "slPOD", pWhereClause);
    ////in case of domestic set POLCountry = PODCountry
    //if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
    //    $('#slPOLCountries option[value=' + $('#slPODCountries option:selected').val() + ']').attr('selected', 'selected');
    //    if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
    //        POL_GetList(pID, $('#slPODCountries option:selected').val(), 1);
    //}
    //////to fill the Delivery address
    ////DeliveryCity_GetList(null, $('#slPODCountries option:selected').val());
    //DeliveryCity_GetList(null, pCountryID);
    //} //if (pID != undefined) {
}

function POL_GetList(pID, pCountryID, pDontCallFillOtherSidePorts, pCallback) {//pID is used in case of editing to set the code or name
    //parameters: ID, strFnName, First Row in select list, select list name, pWhereClause
    debugger;
    //if (pID != undefined) {
    var pWhereClause = "";
    if (pCountryID != null) //this means editing
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = " + pCountryID;
    }
    else //when changing the Country or Transport Type
    {
        pWhereClause = " where IsPort = 1 and IsInactive = 0 and CountryID = ";
        pWhereClause += ($('#slPOLCountries option:selected').val() == null || $('#slPOLCountries option:selected').val() == ""
            ? 0 : $('#slPOLCountries option:selected').val());
    }
    if ($('input[name=cbTransportType]:checked').val() == 1)
        pWhereClause += " and IsOcean = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 2)
        pWhereClause += " and IsAir = 1 ";
    if ($('input[name=cbTransportType]:checked').val() == 3)
        pWhereClause += " and IsInland = 1 ";
    //if (pID != null)
    //    pWhereClause += " or ID=" + pID;
    pWhereClause += " order by Name ";
    //GetListWithNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause);
    GetListWithCodeAndNameAndWhereClause(pID, "/api/Ports/LoadAll", "Select POL", "slPOL", pWhereClause
        , function () {
            if (pCallback != null && pCallback != undefined)
                pCallback();
        });
    ////in case of domestic set POLCountry = PODCountry
    //if ($('input[name=cbDirectionType]:checked').val() == 3 && pCountryID == null) {
    //    $('#slPODCountries option[value=' + $('#slPOLCountries option:selected').val() + ']').attr('selected', 'selected');
    //    if (pDontCallFillOtherSidePorts != 1) // if pDontCallFillOtherSidePorts ==1 then dont call the other port GetList to avoid open loop
    //        POD_GetList(pID, $('#slPOLCountries option:selected').val(), 1);
    //}
    ////to fill the pickup address
    ////PickupCity_GetList(null, $('#slPOLCountries option:selected').val());
    //PickupCity_GetList(null, pCountryID);
    //} //if (pID != undefined) {
}


function cbCheckAllChargesTypesChanged() {
    debugger;
    //if ($("#cbCheckAllChargesTypes").prop("checked"))
    //    $("#divCbChargesTypes input[name=nameCbChargesTypes]").prop("checked", true);
    //else
    //    $("#divCbChargesTypes input[name=nameCbChargesTypes]").prop("checked", false);
}
function ServiceInvoiceReport_Print(pOutputTo, ReportType) {
    debugger;
    if (
        ($("#txtFromDate").val().trim() == "" || isValidDate($("#txtFromDate").val(), 1))
        && ($("#txtToDate").val().trim() == "" || isValidDate($("#txtToDate").val(), 1))
        && ($("#txtFromIssueDate").val().trim() == "" || isValidDate($("#txtFromIssueDate").val(), 1))
        && ($("#txtToIssueDate").val().trim() == "" || isValidDate($("#txtToIssueDate").val(), 1))
        && ($("#txtFromOpenDate").val().trim() == "" || isValidDate($("#txtFromOpenDate").val(), 1))
        && ($("#txtToOpenDate").val().trim() == "" || isValidDate($("#txtToOpenDate").val(), 1))
    ) {
        FadePageCover(true);
        var pWhereClause = ServiceInvoiceReport_GetFilterWhereClause(ReportType);
        var pWhereAccNote = ACCNotesReports_GetFilterWhereClause(ReportType);
        var pStrFunctionName = "";
        var pParametersWithValues = {};

        if ($("#cbOperationPayableAllocation").prop("checked"))
            pWhereClause = OperationPayableAllocationReports_GetFilterWhereClause();

        if (ReportType == "Form13") {
            pStrFunctionName = "/api/ServiceInvoiceReport/LoadData_Form13";
            pParametersWithValues = {
                pWhereClauseForm13: pWhereClause + " AND DirectionType=" + constExportDirectionType + " AND SupplierPartnerTypeID IN (" + constCustomsClearanceAgentPartnerTypeID + "," + constTruckerPartnerTypeID + ") AND SupplierInvoiceNo IS NOT NULL "
            };
        }
        else {
            pStrFunctionName = "/api/ServiceInvoiceReport/LoadData";
            pParametersWithValues = {
                pWhereClause: pWhereClause
                , pWhereAccNote: ($('#cbDebitNote').prop('checked') ? pWhereAccNote : "")
                , pGroupBySuppliers: $("#cbGroupBySuppliers").prop("checked")
                , pOperationPayableAllocation: $("#cbOperationPayableAllocation").prop("checked")
                , pIsAgingPerSupplier_AllCurrency: $("#cbAgingPerSupplier_AllCurrency").prop("checked")
            };
        }

        console.log(pStrFunctionName);
        CallGETFunctionWithParameters(pStrFunctionName
            , pParametersWithValues
            , function (data) {
                if (data[0]) {//pRecordsExist
                    if ($("#cbAgingPerSupplier_AllCurrency").prop("checked") || $("#cbAgingPerSupplier_AllCurrency_Minified").prop("checked"))
                        ServiceInvoiceReport_DrawReport_AgingPerSupplier_AllCurrency(data, pOutputTo, ReportType);
                    else if ($("#cbGroupBySuppliers").prop("checked"))
                        ServiceInvoiceReport_DrawReport_GroupBySuppliers(data, pOutputTo, ReportType);
                    else if ($("#cbOperationPayableAllocation").prop("checked"))
                        ServiceInvoiceReport_Allocation(data, pOutputTo, ReportType);
                    else
                        ServiceInvoiceReport_DrawReport(data, pOutputTo, ReportType);
                }
                else
                    swal(strSorry, "No records are found for that search criteria.");
                FadePageCover(false);
            });
    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}
function ServiceInvoiceReport_GetFilterWhereClause(ReportType) {
    let pWhereClause = "WHERE IsDeleted=0 ";
    if (ReportType == 3) { pWhereClause = " where 1=1 " }
    if (ReportType != 3 && ReportType != 2)
        pWhereClause += " AND AccNoteID IS NULL ";
    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pPartnerTypeFilter = "";
    var pPartnerFilter = "";
    var pBranchFilter = "";
    var pPayableStatusFilter = "";
    var pVATTypeFilter = "";
    var pDiscountTypeFilter = "";
    var pTxtSearchFilter = ""
    var pCurrencyFilter = "";
    var pChargeTypeFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";
    var pFromIssueDateFilter = "";
    var pToIssueDateFilter = "";
    var pApprovalStatue = "";
    var pPOLCountryFilter = "";
    var pPOLFilter = "";
    var pPODCountryFilter = "";
    var pPODFilter = "";
    //pWhereClause += ($("#cbIncludeUnApproved").prop("checked") ? "" : " AND IsApproved=1 ");
    if (pDefaults.UnEditableCompanyName == "GBL")
        pWhereClause += " AND SupplierInvoiceNo IS NOT NULL AND SupplierInvoiceNo<>'N/A' AND CostAmount>0 " + "\n";

    pDirectionFilter += ($("#lbl-filter-import").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 1 " : " OR DirectionType = 1 ") : "");
    pDirectionFilter += ($("#lbl-filter-export").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 2 " : " OR DirectionType = 2 ") : "");
    pDirectionFilter += ($("#lbl-filter-domestic").hasClass('active') ? (pDirectionFilter == "" ? " (DirectionType = 3 " : " OR DirectionType = 3 ") : "");
    pDirectionFilter += (pDirectionFilter == "" ? "" : ") ");

    pTransportFilter += ($("#lbl-filter-ocean").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 1 " : " OR TransportType = 1 ") : "");
    pTransportFilter += ($("#lbl-filter-air").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 2 " : " OR TransportType = 2 ") : "");
    pTransportFilter += ($("#lbl-filter-inland").hasClass('active') ? (pTransportFilter == "" ? " (TransportType = 3 " : " OR TransportType = 3 ") : "");
    pTransportFilter += (pTransportFilter == "" ? "" : ") ");

    pBLTypeFilter += ($("#lbl-filter-direct").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constDirectBLType : " OR BLType = " + constDirectBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-house").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constHouseBLType : " OR BLType = " + constHouseBLType) : "");
    pBLTypeFilter += ($("#lbl-filter-master").hasClass('active') ? (pBLTypeFilter == "" ? " (BLType = " + constMasterBLType : " OR BLType = " + constMasterBLType) : "");
    pBLTypeFilter += (pBLTypeFilter == "" ? "" : ") ");

    if (pDirectionFilter != "" && pTransportFilter == "")
        pWhereClause = " WHERE " + pDirectionFilter;
    else
        if (pDirectionFilter == "" && pTransportFilter != "")
            pWhereClause = " WHERE " + pTransportFilter;
        else
            if (pDirectionFilter != "" && pTransportFilter != "")
                pWhereClause = " WHERE " + pDirectionFilter + " AND " + pTransportFilter;

    if (pBLTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBLTypeFilter;
    else
        if (pBLTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBLTypeFilter;

    //pBranchFilter = ($("#slBranch").val() == "" ? "" : " BranchID = " + $("#slBranch").val());
    //if (pBranchFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pBranchFilter;
    //else
    //    if (pBranchFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pBranchFilter;



    pApprovalStatue += ($("#slApprovalStatus").val() == 10 ? " ( IsApproved=1 ) " : "");
    pApprovalStatue += ($("#slApprovalStatus").val() == 20 ? " ( IsApproved=0 )" : "");


    if (pApprovalStatue != "" && pWhereClause != "")
        pWhereClause += " AND " + pApprovalStatue;
    else
        if (pApprovalStatue != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pApprovalStatue;


    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerSupplierID = " + $("#slPartner").val()));
    if (pPartnerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerFilter;
    else
        if (pPartnerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerFilter;

    pPartnerTypeFilter = ($("#slPartnerType").val() == "" ? "" : (" SupplierPartnerTypeID = " + $("#slPartnerType").val()));
    if (pPartnerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerTypeFilter;
    else
        if (pPartnerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerTypeFilter;

    if (ReportType != 3) {


        pPOLCountryFilter = ($("#slPOLCountries").val() == "" ? "" : " POLCountryID = " + $("#slPOLCountries").val());
        if (pPOLCountryFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pPOLCountryFilter;
        else
            if (pPOLCountryFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pPOLCountryFilter;

        pPOLFilter = ($("#slPOL").val() == "" ? "" : " POL = " + $("#slPOL").val());
        if (pPOLFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pPOLFilter;
        else
            if (pPOLFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pPOLFilter;



        pPODCountryFilter = ($("#slPODCountries").val() == "" ? "" : " PODCountryID = " + $("#slPODCountries").val());
        if (pPODCountryFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pPODCountryFilter;
        else
            if (pPODCountryFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pPODCountryFilter;

        pPODFilter = ($("#slPOD").val() == "" ? "" : " POL = " + $("#slPOD").val());
        if (pPODFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pPODFilter;
        else
            if (pPODFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pPODFilter;

        pCurrencyFilter = ($("#slCurrency").val() == "" ? "" : " CurrencyID = " + $("#slCurrency").val());
        if (pCurrencyFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pCurrencyFilter;
        else
            if (pCurrencyFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pCurrencyFilter;

        //var cbChargesTypes = IsNull(($("#cbCheckAllChargesTypes").prop("checked") == true || !$("#cbGroupBySuppliers").prop("checked") ? "-1" : "" + GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes") + ""), "-1");
        let chargeTypeIDs = "";
        if (!$("#cbCheckAllChargesTypes").prop("checked")) //if select all 
            chargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
        //console.log('cbChargesTypes : ' + cbChargesTypes);
        if (chargeTypeIDs != "")
            pWhereClause += " AND ChargeTypeID in(" + chargeTypeIDs + ")";
        

        //pChargeTypeFilter = ($("#slChargeType").val() == "" ? "" : " ChargeTypeID = " + $("#slChargeType").val());
        //if (pChargeTypeFilter != "" && pWhereClause != "")
        //    pWhereClause += " AND " + pChargeTypeFilter;
        //else
        //    if (pChargeTypeFilter != "" && pWhereClause == "")
        //        pWhereClause += " WHERE " + pChargeTypeFilter;


        if ($("#slPayableStatus").val() == 10) //if UnPaid include Partially Paid
            pWhereClause += " AND PayableStatus IN (N'UnPaid', N'Partially Paid')" + " \n";
        else if ($("#slPayableStatus").val() != "")
            pWhereClause += " AND PayableStatus = N'" + $("#slPayableStatus option:selected").text() + "'" + " \n";

    }
    pVATTypeFilter = ($("#slVATType").val() == "" ? "" : " TaxTypeID = " + $("#slVATType").val());
    if (pVATTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVATTypeFilter;
    else
        if (pVATTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVATTypeFilter;

    pDiscountTypeFilter = ($("#slDiscountType").val() == "" ? "" : " DiscountTypeID = " + $("#slDiscountType").val());
    if (pDiscountTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pDiscountTypeFilter;
    else
        if (pDiscountTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pDiscountTypeFilter;



    if (ReportType != 3) {
        pTxtSearchFilter = ($("#txtSearch").val().trim() == "" ? "" : " (SupplierInvoiceNo=N'" + $("#txtSearch").val().trim() + "' OR SUBSTRING(OperationCode,12,20) = N'" + $("#txtSearch").val().trim() + "')");
        if (pTxtSearchFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pTxtSearchFilter;
        else
            if (pTxtSearchFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pTxtSearchFilter;

    }
    else {

        pTxtSearchFilter = ($("#txtSearch").val().trim() == "" ? "" : " (SupplierInvoiceNo=N'" + $("#txtSearch").val().trim() + "' OR SUBSTRING(OperationCode,12,20) = N'" + $("#txtSearch").val().trim() + "')");
        if (pTxtSearchFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pTxtSearchFilter;
        else
            if (pTxtSearchFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pTxtSearchFilter;
    }


    if ($("#cbWithoutVAT").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " TaxTypeID IS NULL ";
    else
        if ($("#cbWithoutVAT").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " TaxTypeID IS NULL ";

    if ($("#cbWithoutDiscount").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " DiscountTypeID IS NULL ";
    else
        if ($("#cbWithoutDiscount").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " DiscountTypeID IS NULL ";

    if ($("#slShippingLine").val() != "") {
        pWhereClause += " AND EXISTS (SELECT top 1 (1) FROM OperationPartners OP WHERE OP.OperationID = vwPayables.OperationID AND OP.ShippingLineID=" + $("#slShippingLine").val() + ")" + "\n";
    }

    if (ReportType != 3) {
        //EntryDate is the EntryDate
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
            pFromDateFilter = " (EntryDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
            if (pFromDateFilter != "" && pWhereClause != "")
                pWhereClause += " AND " + pFromDateFilter;
            else
                if (pFromDateFilter != "" && pWhereClause == "")
                    pWhereClause += " WHERE " + pFromDateFilter;
        }
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
            pToDateFilter = " EntryDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59')";
            if (pToDateFilter != "" && pWhereClause != "")
                pWhereClause += " AND " + pToDateFilter;
            else
                if (pToDateFilter != "" && pWhereClause == "")
                    pWhereClause += " WHERE " + pToDateFilter;
        }
    }
    //IssueDate is the IssueDate
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromIssueDate").val().trim(), 1) && $("#txtFromIssueDate").val().trim() != "") {
        pFromIssueDateFilter = " (IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromIssueDate").val().trim()) + "'";
        if (pFromIssueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromIssueDateFilter;
        else
            if (pFromIssueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromIssueDateFilter;
    }
    if (isValidDate($("#txtToIssueDate").val().trim(), 1) && $("#txtToIssueDate").val().trim() != "") {
        pToIssueDateFilter = " IssueDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToIssueDate").val().trim()) + " 23:59:59')";
        if (pToIssueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToIssueDateFilter;
        else
            if (pToIssueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToIssueDateFilter;
    }

    //OpenDate is the OpenDate
    if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "") {
        pFromOpenDateFilter = " (OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'";
        if (pFromOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromOpenDateFilter;
        else
            if (pFromOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromOpenDateFilter;
    }
    if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "") {
        pToOpenDateFilter = " OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + " 23:59:59')";
        if (pToOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToOpenDateFilter;
        else
            if (pToOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToOpenDateFilter;
    }

    //pPOL = ($("#slPOL option:selected").val() == "" ? "" : " POL = " + $("#slPOL option:selected").val());
    //if (pPOL != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOL;
    //else
    //    if (pPOL != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOL;
    //pPOD = ($("#slPOD option:selected").val() == "" ? "" : " POD = " + $("#slPOD option:selected").val());
    //if (pPOD != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pPOD;
    //else
    //    if (pPOD != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pPOD;

    //pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);

    if ($("#cbOfficial").prop("checked")) {
        pWhereClause += " AND " + " IsOfficial=1 ";
    }
    return pWhereClause;
}
function OperationPayableAllocationReports_GetFilterWhereClause(ReportType) {
    var pWhereClause = "WHERE 1=1 ";

    var pTransportFilter = "";
    var pDirectionFilter = "";
    var pBLTypeFilter = "";
    var pPartnerTypeFilter = "";
    var pPartnerFilter = "";
    var pBranchFilter = "";
    var pPayableStatusFilter = "";
    var pVATTypeFilter = "";
    var pDiscountTypeFilter = "";
    var pTxtSearchFilter = ""
    var pCurrencyFilter = "";
    var pChargeTypeFilter = "";
    var pFromDateFilter = "";
    var pToDateFilter = "";
    var pFromIssueDateFilter = "";
    var pToIssueDateFilter = "";
    var pApprovalStatue = "";
    var pPOLCountryFilter = "";
    var pPOLFilter = "";
    var pPODCountryFilter = "";
    var pPODFilter = "";

    pTxtSearchFilter = ($("#txtSearch").val().trim() == "" ? "" : " ( CodeSerial = N'" + $("#txtSearch").val().trim() + "')");
    if (pTxtSearchFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pTxtSearchFilter;
    else
        if (pTxtSearchFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pTxtSearchFilter;

    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val()));
    if (pPartnerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerFilter;
    else
        if (pPartnerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerFilter;

    pPartnerTypeFilter = ($("#slPartnerType").val() == "" ? "" : (" PartnerTypeID = " + $("#slPartnerType").val()));
    if (pPartnerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerTypeFilter;
    else
        if (pPartnerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerTypeFilter;


    //OpenDate is the OpenDate
    if (isValidDate($("#txtFromOpenDate").val().trim(), 1) && $("#txtFromOpenDate").val().trim() != "") {
        pFromOpenDateFilter = " (OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromOpenDate").val().trim()) + "'";
        if (pFromOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromOpenDateFilter;
        else
            if (pFromOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromOpenDateFilter;
    }
    if (isValidDate($("#txtToOpenDate").val().trim(), 1) && $("#txtToOpenDate").val().trim() != "") {
        pToOpenDateFilter = " OpenDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToOpenDate").val().trim()) + " 23:59:59')";
        if (pToOpenDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToOpenDateFilter;
        else
            if (pToOpenDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToOpenDateFilter;
    }


    return pWhereClause;
}
function ACCNotesReports_GetFilterWhereClause(ReportType) {
    var pWhereClause = "WHERE IsDeleted=0 AND  NoteType=90";



    var pTxtSearchFilter = "";

    var pFromDateFilter = "";
    var pToDateFilter = "";
    var pFromIssueDateFilter = "";
    var pToIssueDateFilter = "";
  
    var pDiscountTypeFilter = "";
    var pVATTypeFilter = "";
    var pPartnerTypeFilter = "";
    var pApprovalStatue = "";
    var pPartnerFilter = "";
    var pCurrencyFilter = "";

    pApprovalStatue += ($("#slApprovalStatus").val() == 10 ? " ( IsApproved=1 ) " : "");
    pApprovalStatue += ($("#slApprovalStatus").val() == 20 ? " ( IsApproved=0 )" : "");


    if (pApprovalStatue != "" && pWhereClause != "")
        pWhereClause += " AND " + pApprovalStatue;
    else
        if (pApprovalStatue != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pApprovalStatue;


    pPartnerFilter = ($("#slPartner").val() == "" ? "" : (" PartnerID = " + $("#slPartner").val()));
    if (pPartnerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerFilter;
    else
        if (pPartnerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerFilter;

    pPartnerTypeFilter = ($("#slPartnerType").val() == "" ? "" : (" PartnerTypeID = " + $("#slPartnerType").val()));
    if (pPartnerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pPartnerTypeFilter;
    else
        if (pPartnerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pPartnerTypeFilter;

    if (ReportType != 3) {
        pCurrencyFilter = ($("#slCurrency").val() == "" ? "" : " CurrencyID = " + $("#slCurrency").val());
        if (pCurrencyFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pCurrencyFilter;
        else
            if (pCurrencyFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pCurrencyFilter;

    }
    pVATTypeFilter = ($("#slVATType").val() == "" ? "" : " TaxTypeID = " + $("#slVATType").val());
    if (pVATTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVATTypeFilter;
    else
        if (pVATTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVATTypeFilter;

    pDiscountTypeFilter = ($("#slDiscountType").val() == "" ? "" : " DiscountTypeID = " + $("#slDiscountType").val());
    if (pDiscountTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pDiscountTypeFilter;
    else
        if (pDiscountTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pDiscountTypeFilter;


        pTxtSearchFilter = ($("#txtSearch").val().trim() == "" ? "" : " ( '  SUBSTRING(OperationCode,12,20) = N'" + $("#txtSearch").val().trim() + "')");
        if (pTxtSearchFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pTxtSearchFilter;
        else
            if (pTxtSearchFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pTxtSearchFilter;




    if ($("#cbWithoutVAT").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " TaxTypeID IS NULL ";
    else
        if ($("#cbWithoutVAT").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " TaxTypeID IS NULL ";

    if ($("#cbWithoutDiscount").prop("checked") && pWhereClause != "")
        pWhereClause += " AND " + " DiscountTypeID IS NULL ";
    else
        if ($("#cbWithoutDiscount").prop("checked") && pWhereClause == "")
            pWhereClause += " WHERE " + " DiscountTypeID IS NULL ";


        //EntryDate is the EntryDate
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromDate").val().trim(), 1) && $("#txtFromDate").val().trim() != "") {
            pFromDateFilter = " (CreationDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDate").val().trim()) + "'";
            if (pFromDateFilter != "" && pWhereClause != "")
                pWhereClause += " AND " + pFromDateFilter;
            else
                if (pFromDateFilter != "" && pWhereClause == "")
                    pWhereClause += " WHERE " + pFromDateFilter;
        }
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtToDate").val().trim(), 1) && $("#txtToDate").val().trim() != "") {
            pToDateFilter = " CreationDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToDate").val().trim()) + " 23:59:59')";
            if (pToDateFilter != "" && pWhereClause != "")
                pWhereClause += " AND " + pToDateFilter;
            else
                if (pToDateFilter != "" && pWhereClause == "")
                    pWhereClause += " WHERE " + pToDateFilter;
        }

    //IssueDate is the IssueDate
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromIssueDate").val().trim(), 1) && $("#txtFromIssueDate").val().trim() != "") {
        pFromIssueDateFilter = " (NoteDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromIssueDate").val().trim()) + "'";
        if (pFromIssueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pFromIssueDateFilter;
        else
            if (pFromIssueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pFromIssueDateFilter;
    }
    if (isValidDate($("#txtToIssueDate").val().trim(), 1) && $("#txtToIssueDate").val().trim() != "") {
        pToIssueDateFilter = " NoteDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToIssueDate").val().trim()) + " 23:59:59')";
        if (pToIssueDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pToIssueDateFilter;
        else
            if (pToIssueDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pToIssueDateFilter;
    }


    return pWhereClause;
}
function ServiceInvoiceReport_PartnerTypeChanged() {
    //debugger;
    //$("#slPartner").val("");
    //$("#slPartner option").removeClass("hide");
    //if ($("#slPartnerType").val() != "") //handle show all partners
    //    $("#slPartner option[PartnerTypeID!=" + $("#slPartnerType").val() + "][value!=''" + "]").addClass("hide");
    debugger;
    $("#slPartner").html("<option value=''>" + TranslateString("SelectFromMenu") + "</option>");//to quickly empty
    if ($("#slPartnerType").val() != "") {
        if ($("#slPartnerType").val() == constCustomerPartnerTypeID) {
            $("#slPartner").html($("#hReadySlCustomers").html());
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/ServiceInvoiceReport/FillPartners", { pPartnerTypeID: $("#slPartnerType").val() }
                , function (pData) {
                    FillListFromObject(null, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slPartner", pData[0], null);
                    FadePageCover(false);
                }
                , null);
        }
    }
}
function ServiceInvoiceReport_IncludeVATChanged() {
    if ($("#cbWithoutVAT").prop("checked")) {
        $("#divVATType").addClass("hide");
        $("#slVATType").val("");
    }
    else
        $("#divVATType").removeClass("hide");
    if ($("#cbWithoutDiscount").prop("checked")) {
        $("#divDiscountType").addClass("hide");
        $("#slDiscountType").val("");
    }
    else
        $("#divDiscountType").removeClass("hide");
}
var TodaysDate = new Date();
var FormattedTodaysDate = TodaysDate.toLocaleDateString();
function ServiceInvoiceReport_DrawReport(data, pOutputTo, ReportType) {
    debugger;
    console.log("pOutputTo : " + pOutputTo + " ReportType :" + ReportType);
    if (pOutputTo != "Email" && ReportType == "Form13") {
        debugger;
        var pOperationList = JSON.parse(data[1]);
        var pSupplierList = JSON.parse(data[2]);
        var pMaxTruckerColumns = data[3];
        var pMaxCCAColumns = data[4];
        var pReportTitle = "Form13 Report";

        var pTablesHTML = "";
        pTablesHTML += '                         <table id="tblForm13Report" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTablesHTML += '                                         <th>' + 'IST Number' + '</th>';
        pTablesHTML += '                                         <th>' + 'Shipper' + '</th>';
        for (var i = 0; i < pMaxTruckerColumns; i++) {
            pTablesHTML += '                                         <th>' + 'Trucker' + '</th>';
            pTablesHTML += '                                         <th>' + 'Trucker Inv' + '</th>';
        }
        for (var i = 0; i < pMaxCCAColumns; i++) {
            pTablesHTML += '                                         <th>' + 'Clearance Agent' + '</th>';
            pTablesHTML += '                                         <th>' + 'Clearance Inv' + '</th>';
        }
        pTablesHTML += '                                         <th>' + 'Form13' + '</th>';
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;
        var serial = 0;
        $.each((pOperationList), function (i, item) {
            pTablesHTML += '                                     <tr style="font-size:95%;">';
            pTablesHTML += '                                         <td>' + (item.OperationCode) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ShipperName == 0 ? "" : item.ShipperName) + '</td>';
            var pTruckerList = pSupplierList.filter(x => x.OperationID == item.OperationID && x.SupplierPartnerTypeID == constTruckerPartnerTypeID);
            for (var j = 0; j < pMaxTruckerColumns; j++) {
                if (j < pTruckerList.length) {
                    pTablesHTML += '                                         <td>' + (pTruckerList[j].PartnerSupplierName) + '</td>';
                    pTablesHTML += '                                         <td>' + (pTruckerList[j].SupplierInvoiceNo) + '</td>';
                }
                else {
                    pTablesHTML += '                                         <td>' + '</td>';
                    pTablesHTML += '                                         <td>' + '</td>';
                }
            }
            var pCCAList = pSupplierList.filter(x => x.OperationID == item.OperationID && x.SupplierPartnerTypeID == constCustomsClearanceAgentPartnerTypeID);
            for (var j = 0; j < pMaxCCAColumns; j++) {
                if (j < pCCAList.length) {
                    pTablesHTML += '                                         <td>' + (pCCAList[j].PartnerSupplierName) + '</td>';
                    pTablesHTML += '                                         <td>' + (pCCAList[j].SupplierInvoiceNo) + '</td>';
                }
                else {
                    pTablesHTML += '                                         <td>' + '</td>';
                    pTablesHTML += '                                         <td>' + '</td>';
                }
            }
            pTablesHTML += '                                         <td>' + (item.Form13Number) + '</td>';
            pTablesHTML += '                                     </tr>';

        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblForm13Report", "Form13");
        }
    } //if (pOutputTo != "Email" && ReportType == "Form13") {
    else if (pOutputTo != "Email" && ReportType == 2) { //form 41
        debugger;

        var pReportRows = pDefaults.UnEditableCompanyName =='TRM' ? JSON.parse(data[8]) : JSON.parse(data[2]);
        var pReportTitle = "Payables Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _TotalAmountWithoutVAT = "";
        var _TotalTaxAmount = "";
        var _TotalDiscountAmount = "";

        var pTablesHTML = "";
        pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';

        if (pDefaults.UnEditableCompanyName != 'TRM')
         pTablesHTML += '                                     <th>العملية</th>';

        pTablesHTML += '                                     <th>الفترة</th>';
        pTablesHTML += '                                     <th>السنة</th>';
        pTablesHTML += '                                     <th>رقم التسجيل</th>';
        pTablesHTML += '                                     <th>رقم الملف</th>';
        pTablesHTML += '                                     <th>كود المأمورية المختصة</th>';
        pTablesHTML += '                                     <th>تاريخ التعامل</th>';
        pTablesHTML += '                                     <th>طبيعة التعامل</th>';
        pTablesHTML += '                                     <th>القيمة الاجمالية للتعامل</th>';
        pTablesHTML += '                                     <th>نوع الخصم</th>';
        pTablesHTML += '                                     <th>القيمة الصافية للتعامل</th>';
        pTablesHTML += '                                     <th>نسبة الخصم علي الضريبة</th>';
        pTablesHTML += '                                     <th>المحصل لحساب الضريبة</th>';
        pTablesHTML += '                                     <th>اسم الممول</th>';
        pTablesHTML += '                                     <th>عنوان الممول</th>';
        pTablesHTML += '                                     <th>الرقم القومى</th>';
        pTablesHTML += '                                     <th>العملة</th>';

        //pTablesHTML += '                                     <th>Inv No.</th>';
        //pTablesHTML += '                                     <th>Bill To</th>';
        //pTablesHTML += '                                     <th>PartnerType</th>';
        //pTablesHTML += '                                     <th>OperationNo.</th>';
        //if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
        //    pTablesHTML += '                                     <th>OperState</th>';
        //    pTablesHTML += '                                     <th>Client</th>';
        //    pTablesHTML += '                                     <th>Salesman</th>';
        //}
        //pTablesHTML += '                                     <th>Charge</th>';
        //pTablesHTML += '                                     <th>Apprv</th>';
        //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //    pTablesHTML += '                                     <th>Amt w/o VAT</th>';
        //if (!$("#cbWithoutVAT").prop("checked"))
        //    pTablesHTML += '                                     <th>VAT</th>';
        //if (!$("#cbWithoutDiscount").prop("checked"))
        //    pTablesHTML += '                                     <th>WHT</th>';
        //pTablesHTML += '                                     <th>Total</th>';
        //pTablesHTML += '                                     <th>Cur.</th>';
        //pTablesHTML += '                                     <th>Paid</th>';
        //pTablesHTML += '                                     <th>Remaining</th>';
        //pTablesHTML += '                                     <th>IssueDate</th>';
        //pTablesHTML += '                                     <th>DueDate</th>';
        //pTablesHTML += '                                    <th>Payment Date</th>';
        //if ($("#cbAging").prop("checked")) {
        //    pTablesHTML += '                                 <th>0-30</th>';
        //    pTablesHTML += '                                 <th>31-60</th>';
        //    pTablesHTML += '                                 <th>61-90</th>';
        //    pTablesHTML += '                                 <th>Later</th>';
        //}

        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            var IssueDate = (GetDashedDate(ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)))).toString()
            var CurrencyNumber = 0;
            if ((item.CurrencyCode) == "EGP")
                CurrencyNumber = 1;
            if ((item.CurrencyCode) == "USD")
                CurrencyNumber = 2;
            if ((item.CurrencyCode) == "GBP")
                CurrencyNumber = 3;
            if ((item.CurrencyCode) == "EUR")
                CurrencyNumber = 4;
            if ((item.CurrencyCode) == "SAR")
                CurrencyNumber = 5;

            pTablesHTML += '                                     <tr style="font-size:95%;">';
          if(  pDefaults.UnEditableCompanyName != 'TRM')
              pTablesHTML += '                                         <td>' + (item.OperationCode) + '</td>';

            pTablesHTML += '                                         <td>' + (item.QuarterNumber) + '</td>';
            pTablesHTML += '                                         <td>' + (item.YearNumber) + '</td>';
            pTablesHTML += '                                         <td>' + (item.CommercialRegister) + '</td>';
            pTablesHTML += '                                         <td>' + (item.DocNo) + '</td>';
            pTablesHTML += '                                         <td>' + (item.CompetentTaxOfficeCode) + '</td>';
            //pTablesHTML += '                                         <td class="IssueDate">' + (GetDashedDate(ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)))).toString() + '</td>';
            pTablesHTML += '                                         <td class="IssueDate">' + ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) + '</td>';
            pTablesHTML += '                                         <td>' + (item.NatureOfDeal) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TotalCostDeal) + '</td>';
            pTablesHTML += '                                         <td>' + (item.DiscountType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.NetValueDeal) + '</td>';
            pTablesHTML += '                                         <td>' + (item.RateTaxDeduction) + '</td>';
            pTablesHTML += '                                         <td>' + (item.CalculatedForTaxes) + '</td>';
            pTablesHTML += '                                         <td>' + (item.PartnerSupplierName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.Address) + '</td>';
            pTablesHTML += '                                         <td>' + (item.IDcard) + '</td>';
            pTablesHTML += '                                         <td>' + CurrencyNumber + '</td>';
            pTablesHTML += '                                     </tr>';

        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately



        //var $table = $("#hExportedTable");
        //$table.table2excel({
        //    exclude: ".noExl",
        //    name: "sheet",
        //    //filename: "Form_41" + ".CSV (MS-DOS)", // do include extension
        //    filename: "Form_41" + ".csv",// (MS-DOS)", // do include extension
        //    preserveColors: false // set to true if you want background colors and font colors preserved
        //});

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", "Form 41");
        }
    } //else if (pOutputTo != "Email" && ReportType == 2) {
    else if (pOutputTo != "Email" && ReportType == 3) {//Purchase
        debugger;
        var pReportRows = JSON.parse(data[3]);
        var pReportTitle = "Payables Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _TotalAmountWithoutVAT = "";
        var _TotalTaxAmount = "";
        var _TotalDiscountAmount = "";

        var pTablesHTML = "";
        pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';

        pTablesHTML += '                                     <th> (نوع المستند (فاتورة 1/ إشعار إضافة 2/إشعار خصم 3/إذن إفراج 4</th>';
        pTablesHTML += '                                     <th> (نوع الضريبة (سلع عامة 1/سلع جدول 2</th>';
        pTablesHTML += '                                     <th> (نوع سلع الجدول (لايوجد 0/جدول أولا 1/جدول ثانيا 2</th>';
        pTablesHTML += '                                     <th> رقم الفاتورة</th>';
        pTablesHTML += '                                     <th> اسم المورد</th>';
        pTablesHTML += '                                     <th> رقم التسجيل الضريبي للعميل</th>';
        pTablesHTML += '                                     <th> رقم الملف الضريبي للعميل</th>';
        pTablesHTML += '                                     <th> العنوان</th>';
        pTablesHTML += '                                     <th> الرقم القومي</th>';
        pTablesHTML += '                                     <th> رقم الموبيل</th>';
        pTablesHTML += '                                     <th>تاريخ الفاتورة </th>';
        pTablesHTML += '                                     <th>إسم المنتج </th>';
        pTablesHTML += '                                     <th>كود المنتج </th>';
        pTablesHTML += '                                     <th>(نوع البيان (محلي 1/مستورد 2/تسويات 5</th>';
        pTablesHTML += '                                     <th> (نوع السلعة (سلع 3/خدمات 4/آلات ومعدات 5/أجزاء آلات 6/إعفاءات 7</th>';
        pTablesHTML += '                                     <th>وحدة قياس المنتج </th>';
        pTablesHTML += '                                     <th>سعر الوحدة </th>';
        pTablesHTML += '                                     <th>(%فئة الضريبة (14%/5 </th>';
        pTablesHTML += '                                     <th>كمية المنتج </th>';
        pTablesHTML += '                                     <th>المبلغ الصافي</th>';
        pTablesHTML += '                                     <th>قيمة الضريبة </th>';
        pTablesHTML += '                                     <th>إجمالي</th>';
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            pTablesHTML += '                                     <tr style="font-size:95%;">';
            pTablesHTML += '                                         <td>' + (item.DocumentType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.VatType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ProductTableType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.InvoiceNumber) + '</td>';
            pTablesHTML += '                                         <td>' + (item.SupplierName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.CommercialRegister) + '</td>';
            pTablesHTML += '                                         <td>' + (item.VatNo) + '</td>';
            pTablesHTML += '                                         <td>' + (item.Address) + '</td>';
            pTablesHTML += '                                         <td>' + (item.IDcard) + '</td>';
            pTablesHTML += '                                         <td>' + (item.PhoneNumber) + '</td>';
            pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.InvoiceDate)) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ProductName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ProductCode) + '</td>';
            pTablesHTML += '                                         <td>' + (item.StatementType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ProductType) + '</td>';
            pTablesHTML += '                                         <td>' + (item.Unit) + '</td>';
            pTablesHTML += '                                         <td>' + (item.UnitCost) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TaxClass) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ProductQty) + '</td>';
            pTablesHTML += '                                         <td>' + (item.CostAmount) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TaxAmount) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TotalAmount) + '</td>';
            pTablesHTML += '                                     </tr>';
        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", "Purchases");
        }

    }
    else if (pOutputTo != "Email") {
        debugger;
        var pReportRows = JSON.parse(data[1]);
        var pReportRowsNote = JSON.parse(data[4]);
        //var pPayablesCurrenciesSummary = data[2];
        //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
        //var pProfitCurrenciesSummary = data[4];
        //var pMarginSummary = data[5];

        var pReportTitle = "Payables Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _TotalAmountWithoutVAT = "";
        var _TotalTaxAmount = "";
        var _TotalDiscountAmount = "";
        var _OfficialTotalPaid = "";
        var _OfficialTotalRemaining = "";
        var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
        var _TotalRemaining = ""; // CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
        var _TotalCostAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "CostAmount", "CurrencyCode");

        var _TotalDebitAmount = "";
        if ($("#cbDebitNote").prop("checked"))
        {
            _TotalDebitAmount = CalculateSumOfArrayWithGroupBy(pReportRowsNote, "Amount", "CurrencyCode");
            _TotalRemaining = CalculateSumOf2ArrayWithGroupBy(pReportRows, pReportRowsNote, "RemainingAmount", "CurrencyCode");
        }
        else
            _TotalRemaining =  CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
        
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            _TotalAmountWithoutVAT = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        if (!$("#cbWithoutVAT").prop("checked"))
            _TotalTaxAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        if (!$("#cbWithoutDiscount").prop("checked"))
            _TotalDiscountAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "DiscountAmount", "CurrencyCode");

        if (!$("#cbWithoutDiscount").prop("checked")) {
            _OfficialTotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "OfficialAmountPaid", "CurrencyCode");
            _OfficialTotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "OfficialRemainingAmount", "CurrencyCode");
        }


        var pTablesHTML = "";
        //pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //pTablesHTML += '                                     <th class="hide">Ser.</th>';
        //pTablesHTML += '                                     <th>Branch</th>';
        pTablesHTML += '                                     <th>Inv.</th>';
        pTablesHTML += '                                     <th>Receipt</th>';
        pTablesHTML += '                                     <th>Bill To</th>';
        pTablesHTML += '                                     <th>PartnerType</th>';
        pTablesHTML += '                                     <th>Oper</th>';
        pTablesHTML += '                                     <th>House</th>';
        if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
            pTablesHTML += '                                     <th>OperState</th>';
            pTablesHTML += '                                     <th>Client</th>';
            pTablesHTML += '                                     <th>Salesman</th>';
        }
        pTablesHTML += '                                     <th>Charge</th>';
        pTablesHTML += '                                     <th>Apprv</th>';
        if (pDefaults.UnEditableCompanyName == "BED") {
            pTablesHTML += '                                     <th>Qty</th>';
            pTablesHTML += '                                     <th>U.Price</th>';
        }
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            pTablesHTML += '                                     <th>Estimated Amount</th>';
            pTablesHTML += '                                     <th>Amt w/o VAT</th>';
            pTablesHTML += '                                     <th>Difference</th>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            pTablesHTML += '                                     <th>VAT</th>';
            //pTablesHTML += '                                     <th>TaxType</th>';
        }
        if (!$("#cbWithoutDiscount").prop("checked"))
            pTablesHTML += '                                     <th>WHT</th>';
        pTablesHTML += '                                     <th>Total</th>';
        pTablesHTML += '                                     <th>Cur.</th>';
        //if (!IsAccountingActive) {
        pTablesHTML += '                                     <th>Paid</th>';
        pTablesHTML += '                                     <th>Remaining</th>';
        if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE")
            pTablesHTML += '                                     <th>Tank Number</th>';
        //}
        pTablesHTML += '                                     <th>IssueDate</th>';
        pTablesHTML += '                                     <th>DueDate</th>';

        pTablesHTML += '                                     <th>Payment Date</th>';
        if (pDefaults.UnEditableCompanyName == "TEU") {
            pTablesHTML += '                                     <th>ETA POD</th>';
            pTablesHTML += '                                     <th>ATA POD</th>';
        }
        pTablesHTML += '                                     <th>Ex.Rate</th>';
        pTablesHTML += '                                     <th>' + pDefaults.CurrencyCode + '</th>';
        if ($("#cbAging").prop("checked")) {
            pTablesHTML += '                                 <th>0-30</th>';
            pTablesHTML += '                                 <th>31-60</th>';
            pTablesHTML += '                                 <th>61-90</th>';
            pTablesHTML += '                                 <th>Later</th>';
        }
        if ($("#cbOfficial").prop("checked")) {
            pTablesHTML += '                                 <th>Official Paid</th>';
            pTablesHTML += '                                 <th>Official Remaining</th>';
        }
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;

        //add DebitNoteID 
        var resultDebitExists = [];
  
        //$.each(JSON.parse(data[3]), function (i, item) { debugger; });
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item.EntryDate), FormattedTodaysDate);
            if (item.CostAmount != 0) {
                //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                pTablesHTML += '                                     <tr style="font-size:95%;">';
                ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                pTablesHTML += '                                         <td>' + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + '</td>';
                pTablesHTML += '                                         <td>' + (item.SupplierReceiptNo == 0 ? "" : item.SupplierReceiptNo) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PartnerSupplierName == 0 ? "N/A" : item.PartnerSupplierName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PartnerTypeCode == 0 ? "N/A" : item.PartnerTypeCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "": item.HouseNumber) + '</td>';
                if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                    pTablesHTML += '                                         <td>' + (item.OperationStageName == 0 ? "" : item.OperationStageName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.ClientName == 0 ? "" : item.ClientName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item.Salesman == 0 ? "" : item.Salesman) + '</td>';
                }
                pTablesHTML += '                                         <td>' + item.ChargeTypeName + '</td>';
                //pTablesHTML += '                                         <td' + (item.PayableStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.PayableStatus == 0 ? "" : item.PayableStatus) + '</td>';
                pTablesHTML += '                                         <td' + (item.IsApproved ? ' class="text-primary" ' : '') + '>' + (item.IsApproved ? 'Yes' : 'No') + '</td>';
                if (pDefaults.UnEditableCompanyName == "BED") {
                    pTablesHTML += '                                         <td class="Quantity">' + item.Quantity.toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="CostPrice">' + item.CostPrice.toFixed(2) + '</td>';
                }
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    pTablesHTML += '                                         <td class="QuotationCost">' + (item.QuotationCost /* * item.Quantity*/).toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="">' + (item.AmountWithoutVAT - (item.QuotationCost /* * item.Quantity*/)).toFixed(2) + '</td>';

                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    pTablesHTML += '                                         <td class="TaxAmount">' + item.TaxAmount.toFixed(2) + '</td>';
                    //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                }
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTablesHTML += '                                         <td class="DiscountAmount">' + item.DiscountAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="CostAmount">' + item.CostAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                //if (!IsAccountingActive) {
                pTablesHTML += '                                         <td class="PaidAmount">' + item.PaidAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="RemainingAmount ' + (item.PayableStatus == "Paid" ? ' text-primary ' : ' text-danger ') + '">' + item.RemainingAmount.toFixed(2) + '</td>';

                if (pDefaults.UnEditableCompanyName == "CHM" || pDefaults.UnEditableCompanyName == "OCE")
                    pTablesHTML += '                                         <td class="TankNumber">' + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + '</td>';
                //}
                pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) + '</td>';
                pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item.EntryDate)) + '</td>';
                pTablesHTML += '                                        <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) : "") + '</td>';
                if (pDefaults.UnEditableCompanyName == "TEU") {
                    pTablesHTML += '                                        <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)) : "") + '</td>';
                    pTablesHTML += '                                        <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)) : "") + '</td>';
                }
                pTablesHTML += '                                         <td>' + (item.ExchangeRate).toFixed(2) + '</td>';
                pTablesHTML += '                                         <td>' + (item.CostAmount * item.ExchangeRate).toFixed(2) + '</td>';

                if ($("#cbAging").prop("checked")) {
                    pTablesHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTablesHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTablesHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item.RemainingAmount.toFixed(2) : '') + '</td>';
                    pTablesHTML += '                                     <td>' + (_AgingDays >= 90 ? (item.RemainingAmount).toFixed(2) : '') + '</td>';
                }
                if ($("#cbOfficial").prop("checked")) {
                    pTablesHTML += '                                         <td class="OfficialPaidAmount">' + item.OfficialAmountPaid.toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="OfficialRemainingAmount ' + '">' + (item.CostAmount.toFixed(2) - item.OfficialAmountPaid.toFixed(2)) + '</td>';

                }
                pTablesHTML += '                                     </tr>';

                var CurrentRows = pReportRowsNote.filter(x=> x.OperationID == item.OperationID);
                if ($('#cbDebitNote').prop('checked') && CurrentRows.length > 0) {
                    $.each((pReportRowsNote), function (k, item2) {
                       
                        var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item2.NoteDate), FormattedTodaysDate);
                        if (item2.OperationID == item.OperationID && $.inArray(item2.ID, resultDebitExists) == -1) {
                            resultDebitExists.push(item2.ID);

                            //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                            pTablesHTML += '                                     <tr style="font-size:95%;">';
                            ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                            //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.Code == 0 ? "" : item2.Code) + '</td>';
                            pTablesHTML += '                                         <td>' + "" + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.PartnerName == 0 ? "N/A" : item2.PartnerName) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.PartnerTypeCode == 0 ? "N/A" : item2.PartnerTypeCode) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.OperationCode == 0 ? item2.MasterOperationCode : item2.OperationCode) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.HouseNumber == 0 ? "" : item2.HouseNumber) + '</td>';
                            if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                                pTablesHTML += '                                         <td>' + "" + '</td>';
                                pTablesHTML += '                                         <td>' + "" + '</td>';
                                pTablesHTML += '                                         <td>' + "" + '</td>';
                            }
                            pTablesHTML += '                                         <td>' + "" + '</td>';
                            //pTablesHTML += '                                         <td' + (item.PayableStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.PayableStatus == 0 ? "" : item.PayableStatus) + '</td>';
                            pTablesHTML += '                                         <td' + (item2.IsApproved ? ' class="text-primary" ' : '') + '>' + (item2.IsApproved ? 'Yes' : 'No') + '</td>';
                            if (pDefaults.UnEditableCompanyName == "BED") {
                                pTablesHTML += '                                         <td class="Quantity">' + "" + '</td>';
                                pTablesHTML += '                                         <td class="CostPrice">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                            }
                            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                                pTablesHTML += '                                         <td class="QuotationCost">' + "0" + '</td>';
                                pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                                pTablesHTML += '                                         <td class="">' + (item2.AmountWithoutVAT).toFixed(2) * -1 + '</td>';

                            }

                            if (!$("#cbWithoutVAT").prop("checked")) {
                                pTablesHTML += '                                         <td class="TaxAmount">' + item2.TaxAmount.toFixed(2) * -1 + '</td>';
                                //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                            }
                            if (!$("#cbWithoutDiscount").prop("checked"))
                                pTablesHTML += '                                         <td class="DiscountAmount">' + item2.DiscountAmount.toFixed(2) * -1 + '</td>';
                            pTablesHTML += '                                         <td class="CostAmount">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                            pTablesHTML += '                                         <td>' + item2.CurrencyCode + '</td>';
                            //if (!IsAccountingActive) {
                            pTablesHTML += '                                         <td class="PaidAmount">' + item2.PaidAmount.toFixed(2) + '</td>';
                            pTablesHTML += '                                         <td class="RemainingAmount ' + "" + '">' + item2.RemainingAmount.toFixed(2) * -1 + '</td>';
                            //}
                            pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item2.NoteDate)) + '</td>';
                            pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item2.CreationDate)) + '</td>';
                            pTablesHTML += '                                        <td>' + "" + '</td>';
                            if (pDefaults.UnEditableCompanyName == "TEU") {
                                pTablesHTML += '                                        <td>' + "" + '</td>'; //ExpectedArrival
                                pTablesHTML += '                                        <td>' + "" + '</td>'; //ActualArrival
                            }
                            pTablesHTML += '                                         <td>' + (item2.ExchangeRate).toFixed(2) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.AmountWithoutVAT * item2.ExchangeRate).toFixed(2) * -1 + '</td>';

                            if ($("#cbAging").prop("checked")) {
                                pTablesHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                                pTablesHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                                pTablesHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                                pTablesHTML += '                                     <td>' + (_AgingDays >= 90 ? (item2.RemainingAmount).toFixed(2) : '') + '</td>';
                            }
                            if ($("#cbOfficial").prop("checked")) {
                                pTablesHTML += '                                         <td class="OfficialPaidAmount">' + "" + '</td>';
                                pTablesHTML += '                                         <td class="OfficialRemainingAmount ' + '">' + "" + '</td>';

                            }
                            pTablesHTML += '                                     </tr>';
                        }
                    });
                }
            }
        });

        if ($('#cbDebitNote').prop('checked') ) {
            $.each((pReportRowsNote), function (k, item2) {

                var _AgingDays = Date.prototype.compareDates(GetDateWithFormatMDY(item2.NoteDate), FormattedTodaysDate);
                if ( $.inArray(item2.ID, resultDebitExists) == -1) {
                    resultDebitExists.push(item2.ID);

                    //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                    pTablesHTML += '                                     <tr style="font-size:95%;">';
                    ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                    //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.Code == 0 ? "" : item2.Code) + '</td>';
                    pTablesHTML += '                                         <td>' + "" + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.PartnerName == 0 ? "N/A" : item2.PartnerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.PartnerTypeCode == 0 ? "N/A" : item2.PartnerTypeCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.OperationCode == 0 ? item2.MasterOperationCode : item2.OperationCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.HouseNumber == 0 ? "" : item2.HouseNumber) + '</td>';
                    if ($("#hDefaultUnEditableCompanyName").val() == "NIL") {
                        pTablesHTML += '                                         <td>' + "" + '</td>';
                        pTablesHTML += '                                         <td>' + "" + '</td>';
                        pTablesHTML += '                                         <td>' + "" + '</td>';
                    }
                    pTablesHTML += '                                         <td>' + "" + '</td>';
                    //pTablesHTML += '                                         <td' + (item.PayableStatus == "Paid" ? ' class="text-primary" ' : ' class="text-danger" ') + '>' + (item.PayableStatus == 0 ? "" : item.PayableStatus) + '</td>';
                    pTablesHTML += '                                         <td' + (item2.IsApproved ? ' class="text-primary" ' : '') + '>' + (item2.IsApproved ? 'Yes' : 'No') + '</td>';
                    if (pDefaults.UnEditableCompanyName == "BED") {
                        pTablesHTML += '                                         <td class="Quantity">' + "" + '</td>';
                        pTablesHTML += '                                         <td class="CostPrice">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                    }
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                        pTablesHTML += '                                         <td class="QuotationCost">' + "0" + '</td>';
                        pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                        pTablesHTML += '                                         <td class="">' + (item2.AmountWithoutVAT).toFixed(2) * -1 + '</td>';

                    }

                    if (!$("#cbWithoutVAT").prop("checked")) {
                        pTablesHTML += '                                         <td class="TaxAmount">' + item2.TaxAmount.toFixed(2) * -1 + '</td>';
                        //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                    }
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTablesHTML += '                                         <td class="DiscountAmount">' + item2.DiscountAmount.toFixed(2) * -1 + '</td>';
                    pTablesHTML += '                                         <td class="CostAmount">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                    pTablesHTML += '                                         <td>' + item2.CurrencyCode + '</td>';
                    //if (!IsAccountingActive) {
                    pTablesHTML += '                                         <td class="PaidAmount">' + item2.PaidAmount.toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="RemainingAmount ' + "" + '">' + item2.RemainingAmount.toFixed(2) * -1 + '</td>';
                    //}
                    pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item2.NoteDate)) + '</td>';
                    pTablesHTML += '                                         <td>' + ConvertDateFormat(GetDateWithFormatMDY(item2.CreationDate)) + '</td>';
                    pTablesHTML += '                                         <td>' + "" + '</td>';
                    if (pDefaults.UnEditableCompanyName == "TEU") {
                        pTablesHTML += '                                        <td>' + "" + '</td>'; //<td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ExpectedArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ExpectedArrival)) : "") + '</td>';
                        pTablesHTML += '                                        <td>' + "" + '</td>'; //<td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ActualArrival)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.ActualArrival)) : "") + '</td>';
                    }
                    pTablesHTML += '                                         <td>' + (item2.ExchangeRate).toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.AmountWithoutVAT * item2.ExchangeRate).toFixed(2) * -1 + '</td>';

                    if ($("#cbAging").prop("checked")) {
                        pTablesHTML += '                                     <td>' + (_AgingDays >= 0 && _AgingDays < 30 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTablesHTML += '                                     <td>' + (_AgingDays >= 30 && _AgingDays < 60 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTablesHTML += '                                     <td>' + (_AgingDays >= 60 && _AgingDays < 90 ? item2.RemainingAmount.toFixed(2) : '') + '</td>';
                        pTablesHTML += '                                     <td>' + (_AgingDays >= 90 ? (item2.RemainingAmount).toFixed(2) : '') + '</td>';
                    }
                    if ($("#cbOfficial").prop("checked")) {
                        pTablesHTML += '                                         <td class="OfficialPaidAmount">' + "" + '</td>';
                        pTablesHTML += '                                         <td class="OfficialRemainingAmount ' + '">' + "" + '</td>';

                    }
                    pTablesHTML += '                                     </tr>';
                }
            });
        }

        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total Amount W/O VAT is : ' + _TotalAmountWithoutVAT + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            if (!$("#cbWithoutVAT").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total VAT is : ' + _TotalTaxAmount + '</td>';
                pTableSummary += '                                         <td></td><td></td><td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            if (!$("#cbWithoutDiscount").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total WHT is : ' + _TotalDiscountAmount + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Amount is : ' + _TotalCostAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Debit is : ' + _TotalDebitAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';


            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Paid is : ' + _TotalPaid + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Remaining is : ' + _TotalRemaining + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            if ($("#cbOfficial").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total Official Paid is: ' + _OfficialTotalPaid + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';

                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total Official Remaining is: ' + _OfficialTotalRemaining + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }

            $("#tblServiceInvoiceReport" + " tbody").append(pTableSummary);


            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", "Payables Report");
        }
        else {
            var mywindow = null;
            if (pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Charge Type :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Pay. Status :</b> ' + $("#slPayableStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Due. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                ? "All Dates"
                : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += pTablesHTML;

            //ReportHTML += '                     </div>';//of table-responsive
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Amount W/O VAT : </b> ' + _TotalAmountWithoutVAT + '</div>';
            if (!$("#cbWithoutVAT").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total VAT is : </b> ' + _TotalTaxAmount + '</div>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total WHT is : </b> ' + _TotalDiscountAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Amount is : </b> ' + _TotalCostAmount + '</div>';
            if ($("#cbDebitNote").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Debit is : </b> ' + _TotalDebitAmount + '</div>';

            ReportHTML += '             <div class="col-xs-12"><b>Total Paid is : </b> ' + _TotalPaid + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Remaining is : </b> ' + _TotalRemaining + '</div>';
            if ($("#cbOfficial").prop("checked")) {
                ReportHTML += '             <div class="col-xs-12"><b>Total Official Paid is: </b> ' + _OfficialTotalPaid + '</div>';
                ReportHTML += '             <div class="col-xs-12"><b>Total Official Remaining is:  </b> ' + _OfficialTotalRemaining + '</div>';
            }
            ReportHTML += '             <div class="col-xs-12"><b>No of lines for the given criteria:</b> ' + serial + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody") {
                $("#ReportBody").html(ReportHTML);
            }
            else {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }

        }
    }
    else {
        SendAsEmail();
    }
}

function ServiceInvoiceReport_Allocation(data, pOutputTo, ReportType) {
    debugger;
    if (pOutputTo != "Email") {
        debugger;
        var pReportRows = JSON.parse(data[1]);
        var pReportRowsNote = JSON.parse(data[4]);
        //var pPayablesCurrenciesSummary = data[2];
        //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
        //var pProfitCurrenciesSummary = data[4];
        var pOperationPayablesAllocation = JSON.parse(data[5]); 

        var pReportTitle = "Payables Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();



        var pTablesHTML = "";
        pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';

        pTablesHTML += '                                     <th>Oper</th>';
        pTablesHTML += '                                     <th>Partner Type </th>';
        pTablesHTML += '                                     <th>Partner Name</th>';
        pTablesHTML += '                                     <th>Voucher Code</th>';
        pTablesHTML += '                                     <th>Total Voucher Amount</th>';
        pTablesHTML += '                                     <th>Total Payables Amount</th>';
        pTablesHTML += '                                     <th>Total Allocation Amount</th>';

        pTablesHTML += '                                     <th>Remain Allocation Amount</th>';
        pTablesHTML += '                                     <th>Remain Payables Amount</th>';

        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;

        //add DebitNoteID 
        var resultDebitExists = [];
        //Code, CodeSerial, OpenDate, PartnerID, PartnerName, PartnerTypeID, PartnerTypeName, VoucherCodes, TotalVoucherAmount, TotalAllocation, TotalPayables
        var serial = 0;
        $.each((pOperationPayablesAllocation), function (i, item) {
                pTablesHTML += '                                     <tr style="font-size:95%;">';
                ++serial; 
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? "N/A" : item.Code) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PartnerTypeName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.PartnerName) + '</td>';
                pTablesHTML += '                                         <td class="VoucherCodes">' + (item.VoucherCodes == 0 ? "N/A" : item.VoucherCodes) + '</td>';
                pTablesHTML += '                                         <td class="TotalVoucherAmount">' + item.TotalVoucherAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="TotalPayables">' + item.TotalPayables.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="TotalAllocation">' + item.TotalAllocation.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="RemainingAllocationAmount">' + ( item.TotalAllocation.toFixed(2)  - item.TotalPayables.toFixed(2) ) + '</td>';
                pTablesHTML += '                                         <td class="RemainingPayablesAmount">' + ( item.TotalVoucherAmount.toFixed(2) - item.TotalPayables.toFixed(2) ) + '</td>';
                pTablesHTML += '                                     </tr>';
        });

        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var fTotalVoucherAmount = GetColumnSum("tblServiceInvoiceReport", "TotalVoucherAmount");
        var fTotalPayables = GetColumnSum("tblServiceInvoiceReport", "TotalPayables");
        var fTotalAllocation = GetColumnSum("tblServiceInvoiceReport", "TotalAllocation");
        var fRemainingAllocationAmount = GetColumnSum("tblServiceInvoiceReport", "RemainingAllocationAmount");
        var fRemainingPayablesAmount = GetColumnSum("tblServiceInvoiceReport", "RemainingPayablesAmount");

        var pRowTotalsHTML = "";
        pRowTotalsHTML += '                                     <tr style="font-size:95%;">';
       if (pOutputTo != "Excel")
        pRowTotalsHTML += '                                         <td colspan=4>' + "Totals : " + '</td>';
        else
       {
           pRowTotalsHTML += '                                         <td>' + "Totals" + '</td>';
           pRowTotalsHTML += '                                         <td>' + "" + '</td>';
           pRowTotalsHTML += '                                         <td>' + "" + '</td>';
           pRowTotalsHTML += '                                         <td>' + "" + '</td>';
       }

        pRowTotalsHTML += '                                         <td>' + fTotalVoucherAmount + '</td>';
        pRowTotalsHTML += '                                         <td>' + fTotalPayables + '</td>';
        pRowTotalsHTML += '                                         <td>' + fTotalAllocation + '</td>';
        pRowTotalsHTML += '                                         <td>' + fRemainingAllocationAmount + '</td>';
        pRowTotalsHTML += '                                         <td>' + fRemainingPayablesAmount + '</td>';
        pRowTotalsHTML += '                                     </tr>';
        $("#tblServiceInvoiceReport tbody").append(pRowTotalsHTML);


        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            //pTableSummary += '                                     <tr style="font-size:95%;">';
            //pTableSummary += '                                         <td>Total Amount is : ' + _TotalCostAmount + '</td>';
            //pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //pTableSummary += '                                     </tr>';

            //pTableSummary += '                                     <tr style="font-size:95%;">';
            //pTableSummary += '                                         <td>Total Debit is : ' + _TotalDebitAmount + '</td>';
            //pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //pTableSummary += '                                     </tr>';


            //pTableSummary += '                                     <tr style="font-size:95%;">';
            //pTableSummary += '                                         <td>Total Paid is : ' + _TotalPaid + '</td>';
            //pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //pTableSummary += '                                     </tr>';

            //pTableSummary += '                                     <tr style="font-size:95%;">';
            //pTableSummary += '                                         <td>Total Remaining is : ' + _TotalRemaining + '</td>';
            //pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //pTableSummary += '                                     </tr>';



            $("#tblServiceInvoiceReport" + " tbody").append(pTableSummary);


            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", "Operation Payables Report");
        }
        else {
            var mywindow = null;
            if (pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';
            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Open. Date :</b> ' + ($("#txtFromOpenDate").val() == "" && $("#txtToOpenDate").val() == "" ? "All Dates"
                : ($("#txtFromOpenDate").val() == "" ? "" : "From " + $("#txtFromOpenDate").val() + " ") + ($("#txtToOpenDate").val() == "" ? "" : "To " + $("#txtToOpenDate").val())) + '</div>';
            ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += '             <table id="tblServiceInvoiceReport' + '" class="table table-striped text-sm  table-bordered" style="">';  //style="border:solid #000 !Important;" 
            ReportHTML += '             ' + $("#tblServiceInvoiceReport").html();
            ReportHTML += '             </table>';
         


            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody") {
                $("#ReportBody").html(ReportHTML);
            }
            else {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }

        }
    }

}

function ServiceInvoiceReport_DrawReport_GroupBySuppliers(data, pOutputTo, ReportType) {
    debugger;
    if (pOutputTo != "Email") {
        debugger;
        let pReportRows = JSON.parse(data[1]);
        let pReportRowsNote = JSON.parse(data[4]);
        //var pPayablesCurrenciesSummary = data[2];
        //var pReceivablesOrInvoicesCurrenciesSummary = data[3];
        //var pProfitCurrenciesSummary = data[4];
        //var pMarginSummary = data[5];

        let pReportTitle = "Payables Report";
        let TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        let _TotalAmountWithoutVAT = "";
        let _TotalTaxAmount = "";
        let _TotalDiscountAmount = "";
        let _OfficialTotalPaid = "";
        let _OfficialTotalRemaining = "";

        var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
        var _TotalRemaining = ""; // CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
        let _TotalCostAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "CostAmount", "CurrencyCode");

        let _TotalDebitAmount = "";
        if ($("#cbDebitNote").prop("checked"))
        {
            _TotalDebitAmount = CalculateSumOfArrayWithGroupBy(pReportRowsNote, "Amount", "CurrencyCode");
            _TotalRemaining = CalculateSumOf2ArrayWithGroupBy(pReportRows, pReportRowsNote, "RemainingAmount", "CurrencyCode");
        }
        else
            _TotalRemaining =  CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");
        
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            _TotalAmountWithoutVAT = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        if (!$("#cbWithoutVAT").prop("checked"))
            _TotalTaxAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        if (!$("#cbWithoutDiscount").prop("checked"))
            _TotalDiscountAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "DiscountAmount", "CurrencyCode");

        //if (!$("#cbWithoutDiscount").prop("checked")) {
        //    _OfficialTotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "OfficialAmountPaid", "CurrencyCode");
        //    _OfficialTotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "OfficialRemainingAmount", "CurrencyCode");
        //}


        var pTablesHTML = "";
        //pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        //pTablesHTML += '                                     <th class="hide">Ser.</th>';
        //pTablesHTML += '                                     <th>Branch</th>';
        pTablesHTML += '                                     <th>Bill To</th>';
        pTablesHTML += '                                     <th>Oper</th>';
        pTablesHTML += '                                     <th>House</th>';
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            //pTablesHTML += '                                     <th>Estimated Amount</th>';
            pTablesHTML += '                                     <th>Amt w/o VAT</th>';
            //pTablesHTML += '                                     <th>Difference</th>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            pTablesHTML += '                                     <th>VAT</th>';
            //pTablesHTML += '                                     <th>TaxType</th>';
        }
        if (!$("#cbWithoutDiscount").prop("checked"))
            pTablesHTML += '                                     <th>WHT</th>';
        pTablesHTML += '                                     <th>Total</th>';
        pTablesHTML += '                                     <th>Cur.</th>';
        pTablesHTML += '                                     <th>Paid</th>';
        pTablesHTML += '                                     <th>Remaining</th>';
        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;

        //add DebitNoteID 
        var resultDebitExists = [];
  
        //$.each(JSON.parse(data[3]), function (i, item) { debugger; });
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            if (item.CostAmount != 0) {
                //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                pTablesHTML += '                                     <tr style="font-size:95%;">';
                ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                pTablesHTML += '                                         <td>' + (item.PartnerSupplierName == 0 ? "N/A" : item.PartnerSupplierName) + '</td>';
                pTablesHTML += '                                         <td>' + (item.OperationCode == 0 ? item.MasterOperationCode : item.OperationCode) + '</td>';
                pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "": item.HouseNumber) + '</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    //pTablesHTML += '                                         <td class="QuotationCost">' + (item.QuotationCost /* * item.Quantity*/).toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item.AmountWithoutVAT.toFixed(2) + '</td>';
                    //pTablesHTML += '                                         <td class="">' + (item.AmountWithoutVAT - (item.QuotationCost /* * item.Quantity*/)).toFixed(2) + '</td>';

                }

                if (!$("#cbWithoutVAT").prop("checked")) {
                    pTablesHTML += '                                         <td class="TaxAmount">' + item.TaxAmount.toFixed(2) + '</td>';
                    //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                }
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTablesHTML += '                                         <td class="DiscountAmount">' + item.DiscountAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="CostAmount">' + item.CostAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
                pTablesHTML += '                                         <td class="PaidAmount">' + item.PaidAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                         <td class="RemainingAmount ' + (item.PayableStatus == "Paid" ? ' text-primary ' : ' text-danger ') + '">' + item.RemainingAmount.toFixed(2) + '</td>';
                pTablesHTML += '                                     </tr>';

                var CurrentRows = pReportRowsNote.filter(x=> x.OperationID == item.OperationID);
                if ($('#cbDebitNote').prop('checked') && CurrentRows.length > 0) {
                    $.each((pReportRowsNote), function (k, item2) {
                        if (item2.OperationID == item.OperationID && $.inArray(item2.ID, resultDebitExists) == -1) {
                            resultDebitExists.push(item2.ID);

                            //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                            pTablesHTML += '                                     <tr style="font-size:95%;">';
                            ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                            //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.PartnerName == 0 ? "N/A" : item2.PartnerName) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.OperationCode == 0 ? item2.MasterOperationCode : item2.OperationCode) + '</td>';
                            pTablesHTML += '                                         <td>' + (item2.HouseNumber == 0 ? "" : item2.HouseNumber) + '</td>';
                            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                                //pTablesHTML += '                                         <td class="QuotationCost">' + "0" + '</td>';
                                pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                                //pTablesHTML += '                                         <td class="">' + (item2.AmountWithoutVAT).toFixed(2) * -1 + '</td>';

                            }

                            if (!$("#cbWithoutVAT").prop("checked")) {
                                pTablesHTML += '                                         <td class="TaxAmount">' + item2.TaxAmount.toFixed(2) * -1 + '</td>';
                                //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                            }
                            if (!$("#cbWithoutDiscount").prop("checked"))
                                pTablesHTML += '                                         <td class="DiscountAmount">' + item2.DiscountAmount.toFixed(2) * -1 + '</td>';
                            pTablesHTML += '                                         <td class="CostAmount">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                            pTablesHTML += '                                         <td>' + item2.CurrencyCode + '</td>';
                            pTablesHTML += '                                         <td class="PaidAmount">' + item2.PaidAmount.toFixed(2) + '</td>';
                            pTablesHTML += '                                         <td class="RemainingAmount ' + "" + '">' + item2.RemainingAmount.toFixed(2) * -1 + '</td>';
                            pTablesHTML += '                                     </tr>';
                        }
                    });
                }
            }
        });

        if ($('#cbDebitNote').prop('checked') ) {
            $.each((pReportRowsNote), function (k, item2) {

                if ( $.inArray(item2.ID, resultDebitExists) == -1) {
                    resultDebitExists.push(item2.ID);

                    //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
                    pTablesHTML += '                                     <tr style="font-size:95%;">';
                    ++serial; //pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
                    //pTablesHTML += '                                         <td>' + item.BranchName + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.PartnerName == 0 ? "N/A" : item2.PartnerName) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.OperationCode == 0 ? item2.MasterOperationCode : item2.OperationCode) + '</td>';
                    pTablesHTML += '                                         <td>' + (item2.HouseNumber == 0 ? "" : item2.HouseNumber) + '</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                        //pTablesHTML += '                                         <td class="QuotationCost">' + "0" + '</td>';
                        pTablesHTML += '                                         <td class="AmountWithoutVAT">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                        //pTablesHTML += '                                         <td class="">' + (item2.AmountWithoutVAT).toFixed(2) * -1 + '</td>';

                    }

                    if (!$("#cbWithoutVAT").prop("checked")) {
                        pTablesHTML += '                                         <td class="TaxAmount">' + item2.TaxAmount.toFixed(2) * -1 + '</td>';
                        //pTablesHTML += '                                         <td class="TaxTypeName">' + (item.TaxTypeName == 0 ? "" : item.TaxTypeName) + '</td>';
                    }
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTablesHTML += '                                         <td class="DiscountAmount">' + item2.DiscountAmount.toFixed(2) * -1 + '</td>';
                    pTablesHTML += '                                         <td class="CostAmount">' + item2.AmountWithoutVAT.toFixed(2) * -1 + '</td>';
                    pTablesHTML += '                                         <td>' + item2.CurrencyCode + '</td>';
                    pTablesHTML += '                                         <td class="PaidAmount">' + item2.PaidAmount.toFixed(2) + '</td>';
                    pTablesHTML += '                                         <td class="RemainingAmount ' + "" + '">' + item2.RemainingAmount.toFixed(2) * -1 + '</td>';
                    pTablesHTML += '                                     </tr>';
                }
            });
        }

        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total Amount W/O VAT is : ' + _TotalAmountWithoutVAT + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            if (!$("#cbWithoutVAT").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total VAT is : ' + _TotalTaxAmount + '</td>';
                pTableSummary += '                                         <td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            if (!$("#cbWithoutDiscount").prop("checked")) {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>Total WHT is : ' + _TotalDiscountAmount + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Amount is : ' + _TotalCostAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Debit is : ' + _TotalDebitAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';


            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Paid is : ' + _TotalPaid + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Remaining is : ' + _TotalRemaining + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            //if ($("#cbOfficial").prop("checked")) {
            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>Total Official Paid is: ' + _OfficialTotalPaid + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';

            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>Total Official Remaining is: ' + _OfficialTotalRemaining + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td><td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';
            //}

            $("#tblServiceInvoiceReport" + " tbody").append(pTableSummary);


            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", "Payables Report");
        }
        else {
            var mywindow = null;
            if (pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Charge Type :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Pay. Status :</b> ' + $("#slPayableStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Due. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                ? "All Dates"
                : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += pTablesHTML;

            //ReportHTML += '                     </div>';//of table-responsive
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Amount W/O VAT : </b> ' + _TotalAmountWithoutVAT + '</div>';
            if (!$("#cbWithoutVAT").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total VAT is : </b> ' + _TotalTaxAmount + '</div>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total WHT is : </b> ' + _TotalDiscountAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Amount is : </b> ' + _TotalCostAmount + '</div>';
            if ($("#cbDebitNote").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Debit is : </b> ' + _TotalDebitAmount + '</div>';

            ReportHTML += '             <div class="col-xs-12"><b>Total Paid is : </b> ' + _TotalPaid + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Remaining is : </b> ' + _TotalRemaining + '</div>';
            //if ($("#cbOfficial").prop("checked")) {
            //    ReportHTML += '             <div class="col-xs-12"><b>Total Official Paid is: </b> ' + _OfficialTotalPaid + '</div>';
            //    ReportHTML += '             <div class="col-xs-12"><b>Total Official Remaining is:  </b> ' + _OfficialTotalRemaining + '</div>';
            //}
            ReportHTML += '             <div class="col-xs-12"><b>No of lines for the given criteria:</b> ' + serial + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody") {
                $("#ReportBody").html(ReportHTML);
            }
            else {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }

        }
    }
    else {
        SendAsEmail();
    }
}
function GetDashedDate(pDate) {
    return pDate.split('/')[0] + '-' + pDate.split('/')[1] + '-' + pDate.split('/')[2]
}
function ConvertDateFormat_Dashed(pDateToConvert) {
    if (pDateToConvert != "") {
        //if (isValidDate(pDateToConvert, 1)) { //the 2nd param is 1 coz its still in dd/mm/yyyy format(if correct format then convert)
        var ddmmyyy = (pDateToConvert.split('/')[1].length == 1 ? "0" + pDateToConvert.split('/')[1] : pDateToConvert.split('/')[1]) + "-"
            + (pDateToConvert.split('/')[0].length == 1 ? "0" + pDateToConvert.split('/')[0] : pDateToConvert.split('/')[0]) + "-"
            + pDateToConvert.split('/')[2];
        return ddmmyyy;
        //}
        //else
        //    return 0;
    }
    else
        return "1";
}
//function CalculateTotalCurrenciesSummaryFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < tempArray.length; i++) {
//        row = tempArray[i];
//        if (!temp[row.CurrencyCode]) {
//            temp[row.CurrencyCode] = row;
//        } else {
//            temp[row.CurrencyCode].CostAmount += row.CostAmount;
//            row.CostAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
//            //row.PaidAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
//            //row.RemainingAmount = 0; //to avoid duplication
//        }
//    }
//    var ArrResultTotals = [];
//    var pTotalSummary = "";
//    for (var prop in temp) {
//        ArrResultTotals.push(temp[prop]);
//        pTotalSummary += (pTotalSummary == "" ? (temp[prop].CostAmount.toFixed(2) + ' ' + prop) : (", " + temp[prop].CostAmount.toFixed(2) + " " + prop));
//    }
//    return pTotalSummary;
//}
//function CalculateAmountWithoutVATCurrenciesSummaryFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < tempArray.length; i++) {
//        row = tempArray[i];
//        if (!temp[row.CurrencyCode]) {
//            temp[row.CurrencyCode] = row;
//        } else {
//            temp[row.CurrencyCode].AmountWithoutVAT += row.AmountWithoutVAT;
//            row.AmountWithoutVAT = 0; //to avoid duplication
//            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
//            //row.PaidAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
//            //row.RemainingAmount = 0; //to avoid duplication
//        }
//    }
//    var ArrResultTotals = [];
//    var pTotalSummary = "";
//    for (var prop in temp) {
//        ArrResultTotals.push(temp[prop]);
//        pTotalSummary += (pTotalSummary == "" ? (temp[prop].AmountWithoutVAT.toFixed(2) + ' ' + prop) : (", " + temp[prop].AmountWithoutVAT.toFixed(2) + " " + prop));
//    }
//    return pTotalSummary;
//}
//function CalculateTaxAmountCurrenciesSummaryFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < tempArray.length; i++) {
//        row = tempArray[i];
//        if (!temp[row.CurrencyCode]) {
//            temp[row.CurrencyCode] = row;
//        } else {
//            temp[row.CurrencyCode].TaxAmount += row.TaxAmount;
//            row.TaxAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
//            //row.PaidAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
//            //row.RemainingAmount = 0; //to avoid duplication
//        }
//    }
//    var ArrResultTotals = [];
//    var pTotalSummary = "";
//    for (var prop in temp) {
//        ArrResultTotals.push(temp[prop]);
//        pTotalSummary += (pTotalSummary == "" ? (temp[prop].TaxAmount.toFixed(2) + ' ' + prop) : (", " + temp[prop].TaxAmount.toFixed(2) + " " + prop));
//    }
//    return pTotalSummary;
//}
//function CalculateDiscountAmountCurrenciesSummaryFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < tempArray.length; i++) {
//        row = tempArray[i];
//        if (!temp[row.CurrencyCode]) {
//            temp[row.CurrencyCode] = row;
//        } else {
//            temp[row.CurrencyCode].DiscountAmount += row.DiscountAmount;
//            row.DiscountAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].PaidAmount += row.PaidAmount;
//            //row.PaidAmount = 0; //to avoid duplication
//            //temp[row.CurrencyCode].RemainingAmount += row.RemainingAmount;
//            //row.RemainingAmount = 0; //to avoid duplication
//        }
//    }
//    var ArrResultTotals = [];
//    var pTotalSummary = "";
//    for (var prop in temp) {
//        ArrResultTotals.push(temp[prop]);
//        pTotalSummary += (pTotalSummary == "" ? (temp[prop].DiscountAmount.toFixed(2) + ' ' + prop) : (", " + temp[prop].DiscountAmount.toFixed(2) + " " + prop));
//    }
//    return pTotalSummary;
//}
//function CalculateTotalInDefaultCurrencyFromArray(pArray) {
//    debugger;
//    var temp = {};
//    var row = null;
//    var _TotalInDefaultCurrency = 0;
//    //tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
//    for (var i = 0; i < pArray.length; i++) {
//        row = pArray[i];
//        _TotalInDefaultCurrency += (row.CostAmount * row.ExchangeRate);
//    }
//    return (_TotalInDefaultCurrency.toFixed(2) + " " + pDefaults.CurrencyCode);
//}
var arr_Values = new Array();

function SendAsEmail() {
    debugger;
    arr_Values = [];
    ReportName = "Payables Report";
    arr_Values.push($("#txtFromDate").val());
    arr_Values.push($("#txtToDate").val());
    arr_Values.push($("#txtFromIssueDate").val());
    arr_Values.push($("#txtToIssueDate").val());
    arr_Values.push($("#cbWithoutVAT").prop("checked"));
    arr_Values.push($("#cbWithoutDiscount").prop("checked"));
    arr_Values.push($("#cbAging").prop("checked"));
    arr_Values.push($("#lbl-filter-import").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-export").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-domestic").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-ocean").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-air").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-inland").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-direct").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-house").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#lbl-filter-master").hasClass('active') == true ? "active" : "InActive");
    arr_Values.push($("#txtSearch").val());
    arr_Values.push($("#slPartnerType").val());
    arr_Values.push($("#slPartnerType option:selected").text());
    arr_Values.push($("#slPartner").val());
    arr_Values.push($("#slPartner option:selected").text());
    arr_Values.push($("#slCurrency").val());
    arr_Values.push($("#slCurrency option:selected").text());
    arr_Values.push($("#slApprovalStatus").val());
    arr_Values.push($("#slApprovalStatus option:selected").text());
    arr_Values.push($("#slDiscountType").val());
    arr_Values.push($("#slDiscountType option:selected").text());
    arr_Values.push($("#slVATType").val());
    arr_Values.push($("#slVATType option:selected").text());
    arr_Values.push($("#slChargeType").val());
    arr_Values.push($("#slChargeType option:selected").text());
    arr_Values.push($("#slPayableStatus").val());
    arr_Values.push($("#slPayableStatus option:selected").text());

    var pParametersWithValues =
    {
        arr_Values: arr_Values
        , pTitle: "Payables Report"
        , pReportName: ReportName
    };

    //********************
    //***** For show Link Report Now
    //*********************
    //var win = window.open("", "_blank");
    //var url = '/GlobalReports/ViewPayablesReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    //win.location = url;
    //******

    //********************
    //***** For Send Email
    //*********************
    var url = '/GlobalReports/ViewPayablesReport?pTitle="' + pParametersWithValues.pTitle + '"' + '&arr_Values=' + pParametersWithValues.arr_Values + '  ' + '&pReportName=' + pParametersWithValues.pReportName + '';
    SendUrlEmail_General("Payables Report", $('#txtToEmail').val(), null, $('#btn-Email').attr('BaseUrl') + url, "Payables Report", null);
    //******


    FadePageCover(false);



}
/*****************************AgingPerClient**********************************/
function ServiceInvoiceReport_DrawReport_AgingPerSupplier_AllCurrency(data, pOutputTo, ReportType) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    //var pInvoiceItems = JSON.parse(data[2]);
    var pAgingPerSupplier = JSON.parse(data[6]);
    var pDistinctSuppliersList = JSON.parse(data[7]);

    var _TotalPaid = CalculateSumOfArrayWithGroupBy(pReportRows, "PaidAmount", "CurrencyCode");
    var _TotalRemaining = CalculateSumOfArrayWithGroupBy(pReportRows, "RemainingAmount", "CurrencyCode");

    var pReportTitle = "A/P Aging Summary (All Currencies)";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var pTableHTML = "";
    //var pBranchesList = document.getElementById("hReadySlBranches").options;
    debugger;
    pTableHTML += '                         <table id="tblServiceInvoiceReport' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
    pTableHTML += '                             <thead>';
    pTableHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
    pTableHTML += '                                     <th>Partner</th>';

    pTableHTML += '                                     <th>Total EGP</th>';
    pTableHTML += '                                     <th>Total EUR</th>';
    pTableHTML += '                                     <th>Total GBP</th>';
    pTableHTML += '                                     <th>Total USD</th>';
    if (!$("#cbAgingPerSupplier_AllCurrency_Minified").prop("checked")) {
        pTableHTML += '                                     <th>0-30 EGP</th>';
        pTableHTML += '                                     <th>0-30 EUR</th>';
        pTableHTML += '                                     <th>0-30 GBP</th>';
        pTableHTML += '                                     <th>0-30 USD</th>';

        pTableHTML += '                                     <th>31-60 EGP</th>';
        pTableHTML += '                                     <th>31-60 EUR</th>';
        pTableHTML += '                                     <th>31-60 GBP</th>';
        pTableHTML += '                                     <th>31-60 USD</th>';

        pTableHTML += '                                     <th>61-90 EGP</th>';
        pTableHTML += '                                     <th>61-90 EUR</th>';
        pTableHTML += '                                     <th>61-90 GBP</th>';
        pTableHTML += '                                     <th>61-90 USD</th>';

        pTableHTML += '                                     <th>Later EGP</th>';
        pTableHTML += '                                     <th>Later EUR</th>';
        pTableHTML += '                                     <th>Later GBP</th>';
        pTableHTML += '                                     <th>Later USD</th>';
    }
    pTableHTML += '                                     <th>Total OverDue EGP</th>';
    pTableHTML += '                                     <th>Total OverDue EUR</th>';
    pTableHTML += '                                     <th>Total OverDue GBP</th>';
    pTableHTML += '                                     <th>Total OverDue USD</th>';

    pTableHTML += '                                     <th>NotDue EGP</th>';
    pTableHTML += '                                     <th>NotDue EUR</th>';
    pTableHTML += '                                     <th>NotDue GBP</th>';
    pTableHTML += '                                     <th>NotDue USD</th>';
    pTableHTML += '                                 </tr>';
    pTableHTML += '                             </thead>';
    pTableHTML += '                             <tbody>';
    var serial = 0;
    for (var i = 0; i < pDistinctSuppliersList.length; i++) {
        var pGroupedReportRows = pAgingPerSupplier.filter(x => x.PartnerName == pDistinctSuppliersList[i].PartnerName);

        var pZeroToThirtyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _ZeroToThirtyEGP = GetArraySum(pZeroToThirtyEGPArray, "ZeroToThirty");
        var pZeroToThirtyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _ZeroToThirtyEUR = GetArraySum(pZeroToThirtyEURArray, "ZeroToThirty");
        var pZeroToThirtyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _ZeroToThirtyGBP = GetArraySum(pZeroToThirtyGBPArray, "ZeroToThirty");
        var pZeroToThirtyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _ZeroToThirtyUSD = GetArraySum(pZeroToThirtyUSDArray, "ZeroToThirty");

        var pThirtyOneToSixtyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _ThirtyOneToSixtyEGP = GetArraySum(pThirtyOneToSixtyEGPArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _ThirtyOneToSixtyEUR = GetArraySum(pThirtyOneToSixtyEURArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _ThirtyOneToSixtyGBP = GetArraySum(pThirtyOneToSixtyGBPArray, "ThirtyOneToSixty");
        var pThirtyOneToSixtyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _ThirtyOneToSixtyUSD = GetArraySum(pThirtyOneToSixtyUSDArray, "ThirtyOneToSixty");

        var pSixtyOneToNintyEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _SixtyOneToNintyEGP = GetArraySum(pSixtyOneToNintyEGPArray, "SixtyOneToNinty");
        var pSixtyOneToNintyEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _SixtyOneToNintyEUR = GetArraySum(pSixtyOneToNintyEURArray, "SixtyOneToNinty");
        var pSixtyOneToNintyGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _SixtyOneToNintyGBP = GetArraySum(pSixtyOneToNintyGBPArray, "SixtyOneToNinty");
        var pSixtyOneToNintyUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _SixtyOneToNintyUSD = GetArraySum(pSixtyOneToNintyUSDArray, "SixtyOneToNinty");

        var pLaterEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _LaterEGP = GetArraySum(pLaterEGPArray, "Later");
        var pLaterEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _LaterEUR = GetArraySum(pLaterEURArray, "Later");
        var pLaterGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _LaterGBP = GetArraySum(pLaterGBPArray, "Later");
        var pLaterUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _LaterUSD = GetArraySum(pLaterUSDArray, "Later");

        var pNotDueEGPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EGP");
        var _NotDueEGP = GetArraySum(pNotDueEGPArray, "NotDue");
        var pNotDueEURArray = pGroupedReportRows.filter(x => x.CurrencyCode == "EUR");
        var _NotDueEUR = GetArraySum(pNotDueEURArray, "NotDue");
        var pNotDueGBPArray = pGroupedReportRows.filter(x => x.CurrencyCode == "GBP");
        var _NotDueGBP = GetArraySum(pNotDueGBPArray, "NotDue");
        var pNotDueUSDArray = pGroupedReportRows.filter(x => x.CurrencyCode == "USD");
        var _NotDueUSD = GetArraySum(pNotDueUSDArray, "NotDue");

        var _TotalOverDueEGP = _ZeroToThirtyEGP + _ThirtyOneToSixtyEGP + _SixtyOneToNintyEGP + _LaterEGP;
        var _TotalOverDueEUR = _ZeroToThirtyEUR + _ThirtyOneToSixtyEUR + _SixtyOneToNintyEUR + _LaterEUR;
        var _TotalOverDueGBP = _ZeroToThirtyGBP + _ThirtyOneToSixtyGBP + _SixtyOneToNintyGBP + _LaterGBP;
        var _TotalOverDueUSD = _ZeroToThirtyUSD + _ThirtyOneToSixtyUSD + _SixtyOneToNintyUSD + _LaterUSD;

        var _TotalEGP = _TotalOverDueEGP + _NotDueEGP;
        var _TotalEUR = _TotalOverDueEUR + _NotDueEUR;
        var _TotalGBP = _TotalOverDueGBP + _NotDueGBP;
        var _TotalUSD = _TotalOverDueUSD + _NotDueUSD;
        ////Array.sort() works by looping through each item in the array and comparing it to the one after it based on some criteria you specify in your comparison function, if return is 1 then swap.
        //pGroupedReportRows.sort((a, b) => ((a.InvoiceTypeName >= b.InvoiceTypeName && a.InvoiceNumber > b.InvoiceNumber)
        //                                  ) ? 1 : -1);
        if (pGroupedReportRows.length > 0) {
            //pTableHTML += '                         <table id="tblServiceInvoiceReport" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
            //$.each((pGroupedReportRows), function (i, item) {
            pTableHTML += '                                     <tr style="font-size:95%;">';
            ++serial;
            //var _TotalVAT = item.VATFromItems; //item.Items5PercTaxAmount + item.Items10PercTaxAmount + item.Items14PercTaxAmount;
            //var _RowAmountWithoutVAT = (item.Amount - _TotalVAT + item.DiscountAmount).toFixed(2);
            //pTableHTML += '                                         <td class="hide">' + (++serial) + '</td>';
            //pTableHTML += '                                         <td class="hide">' + item.BranchName + '</td>';
            pTableHTML += '                                         <td>' + pGroupedReportRows[0].PartnerName + '</td>';

            pTableHTML += '                                         <td>' + _TotalEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalUSD.toFixed(2) + '</td>';

            if (!$("#cbAgingPerSupplier_AllCurrency_Minified").prop("checked")) {

                pTableHTML += '                                         <td>' + _ZeroToThirtyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ZeroToThirtyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _ThirtyOneToSixtyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _SixtyOneToNintyEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _SixtyOneToNintyUSD.toFixed(2) + '</td>';

                pTableHTML += '                                         <td>' + _LaterEGP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterEUR.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterGBP.toFixed(2) + '</td>';
                pTableHTML += '                                         <td>' + _LaterUSD.toFixed(2) + '</td>';
            }
            pTableHTML += '                                         <td>' + _TotalOverDueEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _TotalOverDueUSD.toFixed(2) + '</td>';

            pTableHTML += '                                         <td>' + _NotDueEGP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueEUR.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueGBP.toFixed(2) + '</td>';
            pTableHTML += '                                         <td>' + _NotDueUSD.toFixed(2) + '</td>';

            //});
        } //if (pGroupedReportRows.length > 0)
    } //for (var i = 0; i < pDistinctSuppliersList.length; i++)
    pTableHTML += '                             </tbody>';
    pTableHTML += '                         </table>';
    $("#hExportedTable").html(pTableHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        for (var i = 0; i < 1; i++) {
            var pGroupedReportRows = pReportRows;
            if (pGroupedReportRows.length > 0) {
                var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pGroupedReportRows, "CostAmount", "ExchangeRate");
                var pTotalSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "CostAmount", "CurrencyCode");
                var pTableSummary = "";
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
                    //var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pGroupedReportRows);
                    let pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");
                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL AMOUNT W/O VAT :</td>';
                    pTableSummary += '                                     <td>' + pAmountWithoutVATSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }
                if (!$("#cbWithoutVAT").prop("checked")) {
                    //var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "VATFromItems", "CurrencyCode");
                    let pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "TaxAmount", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL VAT :</td>';
                    pTableSummary += '                                     <td>' + pTaxAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                    pTableSummary += '                                 </tr>';
                }
                if (!$("#cbWithoutDiscount").prop("checked")) {
                    //var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pGroupedReportRows);
                    let pDiscountAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "DiscountAmount", "CurrencyCode");

                    pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                    pTableSummary += '                                     <td>' + 'TOTAL WHT :</td>';
                    pTableSummary += '                                     <td>' + pDiscountAmountSummary + '</td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    //pTableSummary += '                                     <td>Status</td>';
                    if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutVAT").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    if (!$("#cbWithoutDiscount").prop("checked"))
                        pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td>';
                    pTableSummary += '                                     <td></td><td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                }
                pTableSummary += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
                pTableSummary += '                                     <td>' + 'TOTAL :</td>';
                pTableSummary += '                                     <td>' + pTotalSummary + ' = (' + _TotalInDefaultCurrency + ')' + '</td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                //pTableSummary += '                                     <td>Status</td>';
                if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutVAT").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                if (!$("#cbWithoutDiscount").prop("checked"))
                    pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td></td>';
                pTableSummary += '                                     <td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
                pTableSummary += '                                 </tr>';
                $("#tblServiceInvoiceReport tbody").append(pTableSummary);
                ExportHtmlTableToCsv_RemovingCommasForNumbers("tblServiceInvoiceReport", 'Invoices');
            }
        }
    }
    else {
        var ReportHTML = '';
        //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
        //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Salesman :</b> ' + $("#slSalesman option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Type :</b> ' + $("#slInvoiceType option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Inv. Status :</b> ' + $("#slInvoiceStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
        ReportHTML += '             <div class="col-xs-6"><b>Inv. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                                                                                    ? "All Dates"
                                                                                    : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
        ////ReportHTML += '                 <section class="panel panel-default">';
        //ReportHTML += '                     <div class="table-responsive">';
        ReportHTML += '                     <div>&nbsp;</div>';
        var pGroupedReportRows = pReportRows;
        if (pGroupedReportRows.length > 0) {
            //ReportHTML += '     <hr style="width:100%;height:0px;border:.5px solid #000;">';

            ReportHTML += '                         <table id="tblServiceInvoiceReport' + '" class="table table-striped text-sm table-bordered print " style="border:1px solid #000 !important;">';//remove t1 class to remove row numbers
            ReportHTML += '                         ' + $("#tblServiceInvoiceReport").html();
            ReportHTML += '                         </table>';
        }

        debugger;
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            //var pAmountWithoutVATSummary = CalculateAmountWithoutVATCurrenciesSummaryFromArray_TaxOnItems(pReportRows);
            let pAmountWithoutVATSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "AmountWithoutVAT", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL AMOUNT W/O VAT :</u> </b> ' + pAmountWithoutVATSummary + '</div>';
        }
        if (!$("#cbWithoutVAT").prop("checked")) {
            var pTaxAmountSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL VAT :</u> </b> ' + pTaxAmountSummary + '</div>';
        }
        if (!$("#cbWithoutDiscount").prop("checked")) {
            //var pDiscountAmountSummary = CalculateDiscountAmountCurrenciesSummaryFromArray(pReportRows);
            let pDiscountAmountSummary = CalculateSumOfArrayWithGroupBy(pGroupedReportRows, "DiscountAmount", "CurrencyCode");
            ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u> TOTAL WHT :</u> </b> ' + pDiscountAmountSummary + '</div>';
        }
        var _TotalInDefaultCurrency = CalculateTotalInDefaultCurrencyFromArray(pReportRows, "CostAmount", "ExchangeRate");
        var pTotalSummary = CalculateSumOfArrayWithGroupBy(pReportRows, "CostAmount", "CurrencyCode");
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL AMOUNT :</u> </b> ' + pTotalSummary + ' =(' + _TotalInDefaultCurrency + ')' + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Paid :</u> </b> ' + _TotalPaid + '</div>';
        ReportHTML += '             <div class="col-xs-12 text-left m-l"><b><u>TOTAL Remaining :</u> </b> ' + _TotalRemaining + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
        ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
        //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
        //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
        //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        if (pOutputTo == "PrintInReportBody")
            $("#ReportBody").html(ReportHTML);
        else {
            var mywindow = window.open('', '_blank');
            mywindow.document.write(ReportHTML);
            mywindow.document.close();
        }
    }
}
/**************************Tank*****************************/
function Tank_GetWhereClause(pIsPayables) {
    debugger;
    if (pIsPayables) {
        var pWhereClause = "WHERE TankOrFlexiNumber IS NOT NULL AND ShipmentType=" + constTankShipmentType + " AND OperatorID IS NOT NULL \n";
        if ($("#slPartnerType").val() != "")
            pWhereClause += "AND SupplierPartnerTypeID = " + $("#slPartnerType").val() + " \n";
        if ($("#slPartner").val() != "")
            //pWhereClause += "AND OperatorID = " + $("#slPartner").val() + " \n";
            pWhereClause += "AND PartnerSupplierID = " + $("#slPartner").val() + " \n";

        //if ($("#slChargeType").val() != "")
        //    pWhereClause += "AND ChargeTypeID = " + $("#slChargeType").val() + " \n";
        if ($("#txtSearch").val().trim() != "")
            pWhereClause += "AND TankOrFlexiNumber = N'" + $("#txtSearch").val() + "'" + " \n";

        //IssueDate is the IssueDate
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromIssueDate").val().trim(), 1) && $("#txtFromIssueDate").val().trim() != "") {
            pWhereClause += "AND IssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromIssueDate").val().trim()) + "'" + " \n";
        }
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtToIssueDate").val().trim(), 1) && $("#txtToIssueDate").val().trim() != "")
            pWhereClause += "AND IssueDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToIssueDate").val().trim()) + "'" + " \n";

        let chargeTypeIDs = "";
        if (!$("#cbCheckAllChargesTypes").prop("checked")) //if select all 
            chargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
        if (chargeTypeIDs != "")
            pWhereClause += " AND ChargeTypeID in(" + chargeTypeIDs + ")";

        return pWhereClause;
    }
    else {
        var pWhereClause = "WHERE TankOrFlexiNumber IS NOT NULL AND ShipmentType=" + constTankShipmentType + " AND OperatorID IS NOT NULL  AND InvoiceID IS NOT NULL \n";
        if ($("#slPartner").val() != "")
            pWhereClause += "AND OperatorID = " + $("#slPartner").val() + " \n";
        //pWhereClause += "AND PartnerSupplierID = " + $("#slPartner").val() + " \n";
        //if ($("#slChargeType").val() != "")
        //    pWhereClause += "AND ChargeTypeID = " + $("#slChargeType").val() + " \n";
        if ($("#txtSearch").val().trim() != "")
            pWhereClause += "AND TankOrFlexiNumber = N'" + $("#txtSearch").val() + "'" + " \n";

        //IssueDate is the IssueDate
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtFromIssueDate").val().trim(), 1) && $("#txtFromIssueDate").val().trim() != "") {
            pWhereClause += "AND InvoiceDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromIssueDate").val().trim()) + "'" + " \n";
        }
        //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
        if (isValidDate($("#txtToIssueDate").val().trim(), 1) && $("#txtToIssueDate").val().trim() != "")
            pWhereClause += "AND InvoiceDate <= '" + GetDateWithFormatyyyyMMdd($("#txtToIssueDate").val().trim()) + "'" + " \n";

        let chargeTypeIDs = "";
        if (!$("#cbCheckAllChargesTypes").prop("checked")) //if select all 
            chargeTypeIDs = GetAllSelectedIDsAsStringWithNameAttr("nameCbChargesTypes");
        if (chargeTypeIDs != "")
            pWhereClause += " AND ChargeTypeID in(" + chargeTypeIDs + ")";

        return pWhereClause;
    }

}
function Tank_Print(pOutputTo, pIsPayables) {
    debugger;
    var pWhereClause = Tank_GetWhereClause(pIsPayables);
    var pParametersWithValues = {
        pWhereClause: pWhereClause
        , pIsPayables: pIsPayables
    };
    CallGETFunctionWithParameters("/api/ServiceInvoiceReport/LoadData_Tank"
        , pParametersWithValues
        , function (data) {
            if (data[0] && pIsPayables) //data[0]: pRecordsExist
                TankCost_DrawReport(data, pOutputTo);
            else if (data[0] && !pIsPayables) //data[0]: pRecordsExist
                TankRevenue_DrawReport(data, pOutputTo);
            else
                swal(strSorry, "No records are found for that search criteria.");
            FadePageCover(false);
        });
}
function TankCost_DrawReport(data, pOutputTo) {
    if (pOutputTo != "Email") {
        debugger;
        var pReportRows = JSON.parse(data[1]);

        var pReportTitle = "Tank Cost Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        var _TotalAmountWithoutVAT = "";
        var _TotalTaxAmount = "";
        var _TotalDiscountAmount = "";
        var _TotalCostAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "CostAmount", "CurrencyCode");
        if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
            _TotalAmountWithoutVAT = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        if (!$("#cbWithoutVAT").prop("checked"))
            _TotalTaxAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        if (!$("#cbWithoutDiscount").prop("checked"))
            _TotalDiscountAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "DiscountAmount", "CurrencyCode");

        var pTablesHTML = "";
        //pTablesHTML += '                         <table id="tblTankCost" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblTankCost" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTablesHTML += '                                     <th class="">Sr.</th>';
        pTablesHTML += '                                     <th class="">HB/L No.</th>';
        pTablesHTML += '                                     <th class="">OB/L No.</th>';
        pTablesHTML += '                                     <th class="">Service</th>';
        pTablesHTML += '                                     <th class="">Invoice No.</th>';
        pTablesHTML += '                                     <th class="">Tank Number</th>';
        pTablesHTML += '                                     <th class="">Amount</th>';
        pTablesHTML += '                                     <th class="">Cur</th>';

        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;
        //$.each(JSON.parse(data[3]), function (i, item) { debugger; });
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
            pTablesHTML += '                                     <tr style="font-size:95%;">';
            pTablesHTML += '                                         <td class="">' + (++serial) + '</td>';
            pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
            pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
            pTablesHTML += '                                         <td>' + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.SupplierInvoiceNo == 0 ? "" : item.SupplierInvoiceNo) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + '</td>';
            pTablesHTML += '                                         <td class="CostAmount">' + item.CostAmount.toFixed(2) + '</td>';
            pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
            //pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.PaymentDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.PaymentDate)) : "") + '</td>';
            pTablesHTML += '                                     </tr>';
        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/
            //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked")) {
            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>Total Amount W/O VAT is : ' + _TotalAmountWithoutVAT + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';
            //}
            //if (!$("#cbWithoutVAT").prop("checked")) {
            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>Total VAT is : ' + _TotalTaxAmount + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';
            //}
            //if (!$("#cbWithoutDiscount").prop("checked")) {
            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>Total WHT is : ' + _TotalDiscountAmount + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';
            //}

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Amount is : ' + _TotalCostAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            if ($("#slChargeType").val() != "") {
                pTableSummary += '                                     <tr style="font-size:95%;">';
                pTableSummary += '                                         <td>ChargeType : ' + $("#slChargeType option:selected").text() + '</td>';
                pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
                pTableSummary += '                                     </tr>';
            }
            $("#tblTankCost" + " tbody").append(pTableSummary);

            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTankCost", "Tank Cost");
        }
        else {
            var mywindow = null;
            if (pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Charge Type :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Pay. Status :</b> ' + $("#slPayableStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Due. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                ? "All Dates"
                : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += pTablesHTML;

            //ReportHTML += '                     </div>';//of table-responsive
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Amount W/O VAT : </b> ' + _TotalAmountWithoutVAT + '</div>';
            if (!$("#cbWithoutVAT").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total VAT is : </b> ' + _TotalTaxAmount + '</div>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total WHT is : </b> ' + _TotalDiscountAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Amount is : </b> ' + _TotalCostAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>No of lines for the given criteria:</b> ' + serial + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody") {
                $("#ReportBody").html(ReportHTML);
            }
            else {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }

        }
    }
    else {
        SendAsEmail();
    }
}
function TankRevenue_DrawReport(data, pOutputTo) {
    if (pOutputTo != "Email") {
        debugger;
        var pReportRows = JSON.parse(data[1]);

        var pReportTitle = "Tank Revenue Report";
        var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
        //var _TotalAmountWithoutVAT = "";
        //var _TotalTaxAmount = "";
        //var _TotalDiscountAmount = "";
        //var _TotalSaleAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "SaleAmount", "CurrencyCode");
        var _TotalSaleAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "SalesAmountAfterInvoiceTax", "CurrencyCode");
        //if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
        //    _TotalAmountWithoutVAT = CalculateSumOfArrayWithGroupBy(pReportRows, "AmountWithoutVAT", "CurrencyCode");
        //if (!$("#cbWithoutVAT").prop("checked"))
        //    _TotalTaxAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "TaxAmount", "CurrencyCode");
        //if (!$("#cbWithoutDiscount").prop("checked"))
        //    _TotalDiscountAmount = CalculateSumOfArrayWithGroupBy(pReportRows, "DiscountAmount", "CurrencyCode");

        var pTablesHTML = "";
        //pTablesHTML += '                         <table id="tblTankRevenue" class="table table-striped text-sm table-hover b-t b-r b-b b-l ">';//remove t1 class to remove row numbers
        pTablesHTML += '                         <table id="tblTankRevenue" class="table table-striped text-sm table-bordered print " style="border:solid #999 !important;">';//remove t1 class to remove row numbers
        pTablesHTML += '                             <thead>';
        pTablesHTML += '                                 <tr class="" style="background-color:whitesmoke;font-size:95%;">';
        pTablesHTML += '                                     <th class="">Sr.</th>';
        pTablesHTML += '                                     <th class="">Tank Number</th>';
        pTablesHTML += '                                     <th class="">Reference No</th>';
        pTablesHTML += '                                     <th class="">Tank Status</th>';
        pTablesHTML += '                                     <th class="">Service Date</th>';
        pTablesHTML += '                                     <th class="">Service</th>';
        pTablesHTML += '                                     <th class="">Place Of Service</th>';
        pTablesHTML += '                                     <th class="">Invoice No.</th>';
        pTablesHTML += '                                     <th class="">POL</th>';
        pTablesHTML += '                                     <th class="">POD</th>';
        pTablesHTML += '                                     <th class="">Amount</th>';
        pTablesHTML += '                                     <th class="">Cur</th>';

        pTablesHTML += '                                 </tr>';
        pTablesHTML += '                             </thead>';
        pTablesHTML += '                             <tbody>';
        debugger;
        //$.each(JSON.parse(data[3]), function (i, item) { debugger; });
        var serial = 0;
        $.each((pReportRows), function (i, item) {
            //pTablesHTML += '                                     <tr class="' + (item.Cargo == "Totals In Default Currency:" ? "font-bold text-ul" : "") + '" style="font-size:95%; ' + (item.Cargo == "Total:" ? "background-color: #f9f9f9;!Important" : "") + '">' + (item.Code == "Total" ? "<b>" : "");
            pTablesHTML += '                                     <tr style="font-size:95%;">';
            pTablesHTML += '                                         <td class="hide">' + (++serial) + '</td>';
            pTablesHTML += '                                         <td>' + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + '</td>';
            pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
            pTablesHTML += '                                         <td>' + (item.IsLoaded ? "Full" : "Empty") + '</td>';
            pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.IssueDate)) > 0 ? ConvertDateFormat(GetDateWithFormatMDY(item.IssueDate)) : "") + '</td>';
            pTablesHTML += '                                         <td>' + (item.ChargeTypeName == 0 ? "" : item.ChargeTypeName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.SupplierName == 0 ? "" : item.SupplierName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.InvoiceID == 0 ? "" : (item.InvoiceNumber + "/" + item.InvoiceYear)) + '</td>';
            pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
            pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
            pTablesHTML += '                                         <td class="SaleAmount">' + item.SalesAmountAfterInvoiceTax.toFixed(2) + '</td>'; //pTablesHTML += '                                         <td class="SaleAmount">' + item.SaleAmount.toFixed(2) + '</td>';
            pTablesHTML += '                                         <td>' + item.CurrencyCode + '</td>';
            pTablesHTML += '                                     </tr>';
        });
        pTablesHTML += '                             </tbody>';
        pTablesHTML += '                         </table>';
        $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately

        var pTableSummary = "";
        if (pOutputTo == "Excel") {
            /*********************Append table summaries*************************/

            pTableSummary += '                                     <tr style="font-size:95%;">';
            pTableSummary += '                                         <td>Total Amount is : ' + _TotalSaleAmount + '</td>';
            pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            pTableSummary += '                                     </tr>';

            //if ($("#slChargeType").val() != "") {
            //    pTableSummary += '                                     <tr style="font-size:95%;">';
            //    pTableSummary += '                                         <td>ChargeType : ' + $("#slChargeType option:selected").text() + '</td>';
            //    pTableSummary += '                                         <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> <td></td> <td></td> <td></td><td></td> ';
            //    pTableSummary += '                                     </tr>';
            //}
            $("#tblTankRevenue" + " tbody").append(pTableSummary);

            ExportHtmlTableToCsv_RemovingCommasForNumbers("tblTankRevenue", "Tank Revenue");
        }
        else {
            var mywindow = null;
            if (pOutputTo != "PrintInReportBody")
                mywindow = window.open('', '_blank');
            var ReportHTML = '';
            //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
            ReportHTML += '<html>';
            ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
            ReportHTML += '         <body style="background-color:white;">';
            ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
            ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

            ReportHTML += '             <div class="col-xs-4"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Transport Type :</b> ' + $("#divTransportFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Direction Type :</b> ' + $("#divDirectionFilter label.active").attr("title") + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>B/L Type :</b> ' + $("#divBLTypeFilter label.active").attr("title") + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner Type:</b> ' + $("#slPartnerType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Partner :</b> ' + $("#slPartner option:selected").text() + '</div>';
            //ReportHTML += '             <div class="col-xs-4"><b>Branch :</b> ' + $("#slBranch option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Currency :</b> ' + $("#slCurrency option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Charge Type :</b> ' + $("#slChargeType option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Pay. Status :</b> ' + $("#slPayableStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>Approval Status :</b> ' + $("#slApprovalStatus option:selected").text() + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>VAT Type :</b> ' + ($("#cbWithoutVAT").prop("checked") ? "W/O" : $("#slVATType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-4"><b>WHT :</b> ' + ($("#cbWithoutDiscount").prop("checked") ? "W/O" : $("#slDiscountType option:selected").text()) + '</div>';
            ReportHTML += '             <div class="col-xs-6"><b>Due. Date :</b> ' + ($("#txtFromDate").val() == "" && $("#txtToDate").val() == ""
                ? "All Dates"
                : ($("#txtFromDate").val() == "" ? "" : "From " + $("#txtFromDate").val() + " ") + ($("#txtToDate").val() == "" ? "" : "To " + $("#txtToDate").val())) + '</div>';
            ////ReportHTML += '                 <section class="panel panel-default">';
            //ReportHTML += '                     <div class="table-responsive">';
            ReportHTML += '                         <div> &nbsp; </div>'

            ReportHTML += pTablesHTML;

            //ReportHTML += '                     </div>';//of table-responsive
            if (!$("#cbWithoutVAT").prop("checked") || !$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total Amount W/O VAT : </b> ' + _TotalAmountWithoutVAT + '</div>';
            if (!$("#cbWithoutVAT").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total VAT is : </b> ' + _TotalTaxAmount + '</div>';
            if (!$("#cbWithoutDiscount").prop("checked"))
                ReportHTML += '             <div class="col-xs-12"><b>Total WHT is : </b> ' + _TotalDiscountAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>Total Amount is : </b> ' + _TotalCostAmount + '</div>';
            ReportHTML += '             <div class="col-xs-12"><b>No of lines for the given criteria:</b> ' + serial + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Payables Summary :</b> ' + pPayablesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Invoices Summary :</b> ' + pReceivablesOrInvoicesCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Summary :</b> ' + pProfitCurrenciesSummary + '</div>';
            //ReportHTML += '             <div class="col-xs-12"><b>Profit Margin :</b> ' + pMarginSummary + '%</div>';

            ReportHTML += '         </body>';
            ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';
            ////ReportHTML += '         <div class="row text-right m-r">الشركه خاضعه لنظام الدفعات المقدمه تطبيقا لأحكام الماده 62 من القانون رقم 91 لسنة 2005 و لا يجوز الخصم عليها</div>';
            //if ($("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.IsPrintISOCode input[type=checkbox]").prop("checked"))
            //    ReportHTML += '     <div class="row m-l">' + $("#tblDocsOut tr[id=" + pDocumentTypeID + "] td.ISOCode").text() + '</div>';
            //ReportHTML += '         <div class="row text-center"><img src="/Content/Images/CompanyFooter.jpg" alt="footer"/></div>';
            ReportHTML += '     </footer>';

            ReportHTML += '</html>';
            if (pOutputTo == "PrintInReportBody") {
                $("#ReportBody").html(ReportHTML);
            }
            else {
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
            }

        }
    }
    else {
        SendAsEmail();
    }
}
function CalculateSumOf2ArrayWithGroupBy(pArray , pArray2, pColumnNameToSum, pGroupBy) {
    debugger;
    var temp = {};
    var row = null;
    tempArray = JSON.parse(JSON.stringify(pArray)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray.length; i++) {
        row = tempArray[i];
        if (!temp[row[pGroupBy]]) {
            temp[row[pGroupBy]] = row;
        } else {
            temp[row[pGroupBy]][pColumnNameToSum] += row[pColumnNameToSum];
            row[pColumnNameToSum] = 0; //to avoid duplication
        }
    }

    tempArray2 = JSON.parse(JSON.stringify(pArray2)); //not to change the original Array so i make a copy
    for (var i = 0; i < tempArray2.length; i++) {
        row = tempArray2[i];
        if (!temp[row[pGroupBy]]) {
            temp[row[pGroupBy]] = row;
        } else {
            temp[row[pGroupBy]][pColumnNameToSum] -= row[pColumnNameToSum];
            row[pColumnNameToSum] = 0; //to avoid duplication
        }
    }

    var ArrResultTotals = [];
    var pTotalSummary = "";
    for (var prop in temp) {
        ArrResultTotals.push(temp[prop]);
        pTotalSummary += (pTotalSummary == "" ? (temp[prop][pColumnNameToSum].toFixed(2) + ' ' + prop) : (", " + temp[prop][pColumnNameToSum].toFixed(2) + " " + prop));
    }
    return pTotalSummary;
}