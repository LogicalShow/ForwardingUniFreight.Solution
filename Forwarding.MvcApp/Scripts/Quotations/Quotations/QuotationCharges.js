function QuotationCharges_BindTableRows(pQuotationCharges) {
    ClearAllTableRows("tblQuotationCharges");
    
    debugger;
    //if (pDefaults.UnEditableCompanyName == "SAF")
    //    pQuotationCharges.sort((a, b) => (a.ID > b.ID) ? 1 : -1);
    //else
        pQuotationCharges.sort((a, b) => (a.ViewOrder >= b.ViewOrder) ? 1 : -1);
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    $.each(pQuotationCharges, function (i, item) {
        AppendRowtoTable("tblQuotationCharges",
        ("<tr ID='" + item.ID + "' " + (QECha ? ("ondblclick='QuotationCharges_EditByDblClick(" + item.ID + ");'") : "") + ">"
            + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
            //+ "<td class='Charge' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
            + "<td class='Charge' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeName + ((pDefaults.IsRepeatChargeTypeName ? "(" + item.ChargeTypeCode + ")" : "")) + "</td>"
            + "<td class='Measurement hide' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
            + "<td class='ContainerType hide' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeID == 0 ? "" : item.ContainerTypeCode) + "</td>"
            + "<td class='DemurrageDays hide'>" + (item.DemurrageDays == 0 ? "" : item.DemurrageDays) + "</td>"
            + "<td class='PackageType hide' val='" + item.PackageTypeID + "'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeName) + "</td>"
            + "<td class='CostQuantity'>" + item.CostQuantity + "</td>"
            + "<td class='CostPrice'>" + item.CostPrice + "</td>"
            + "<td class='AdditionalAmount hide'>" + item.AdditionalAmount + "</td>"
            + "<td class='CostAmount'>" + item.CostAmount + "</td>"
            + "<td class='CostCurrency' val='" + item.CostCurrencyID + "'>" + (item.CostCurrencyID == 0 ? "" : item.CostCurrencyCode) + "</td>"
            + "<td class='CostExchangeRate hide'>" + item.CostExchangeRate + "</td>"
            + "<td class='SaleQuantity hide'>" + item.SaleQuantity + "</td>"
            + "<td class='SalePrice'>" + item.SalePrice + "</td>"
            + "<td class='SaleAmount'>" + item.SaleAmount + "</td>"
            + "<td class='SaleCurrency' val='" + item.SaleCurrencyID + "'>" + (item.SaleCurrencyID == 0 ? "" : item.SaleCurrencyCode) + "</td>"
            + "<td class='POrC hide' val='" + item.POrC + "'>" + (item.POrC == 0 ? "" : item.POrCCode) + "</td>"
            + "<td class='BillTo_OperationPartnerTypeID hide' val='" + item.BillTo_OperationPartnerTypeID + "'>" + (item.BillTo_OperationPartnerTypeID == 0 ? "" : item.BillTo_OperationPartnerTypeID) + "</td>"
            + "<td class='BillTo hide' val='" + item.BillTo + "'>" + (item.BillTo == 0 ? "" : item.BillTo) + "</td>"
            + "<td class='SaleExchangeRate hide'>" + item.SaleExchangeRate + "</td>"
            + "<td class='OperationPartnerTypeID hide' val='" + item.OperationPartnerTypeID + "'>" + (item.OperationPartnerTypeID == 0 ? "" : item.OperationPartnerTypeCode) + "</td>"
            + "<td class='PartnerTypeID hide' val='" + item.PartnerTypeID + "'>" + (item.PartnerTypeID == 0 ? "" : item.PartnerTypeID) + "</td>"
            + "<td class='PartnerID ' val='" + item.PartnerSupplierID + "'>" + (item.PartnerSupplierID == 0 ? "" : item.PartnerSupplierName) + "</td>"
            + "<td class='SupplierSiteID hide' val='" + item.SupplierSiteID + "'>" + (item.SupplierSiteID == 0 ? "" : item.SupplierSiteID) + "</td>"
            + "<td class='ViewOrder'>" + item.ViewOrder + "</td>"
            + "<td class='Notes hide'>" + (item.Notes == 0 ? "" : item.Notes) + "</td>"
            + "<td class='HsCode hide'>" + (item.HsCode == "" ? "" : item.HsCode) + "</td>"
            + "<td class='CustomDuties hide'>" + item.CustomDuties + "</td>"
            + "<td class='WTH hide'>" + item.WTH + "</td>"
            + "<td class='BankFeeCharges hide'>" + item.BankFeeCharges + "</td>"
            + "<td class='commission hide'>" + item.commission + "</td>"

            + "<td class='classHideForAcceptedOrDeclined " + (glbCallingControl == "QuotationsEdit_Approval" || !QACha ? "hide" : "") + "'>"
                + "<a class='hide' href='#EditChargeModal' data-toggle='modal' onclick='QuotationCharges_FillControls(" + item.ID + ");' " + editControlsText + "</a>"
                + "<a " + (QACha ? "" : " disabled='disabled' ") + " href='#CopyChargeModal' data-toggle='modal' " + 'onclick="QuotationCharges_OpenCopyChargeModal(' + item.ID + ",'" + item.ChargeTypeName + "'" + ');" ' + copyControlsText + "</a>"
            + "</td></tr>"));
    });

    var _TotalSaleInSeparateCurrencies = CalculateSumOfArrayWithGroupBy(pQuotationCharges, "SaleAmount", "SaleCurrencyCode");
    var _TotalCostInSeparateCurrencies = CalculateSumOfArrayWithGroupBy(pQuotationCharges, "CostAmount", "CostCurrencyCode");
    $("#lblTotalSaleGroupedByCurrency").html(": " + _TotalSaleInSeparateCurrencies);
    $("#lblTotalCostGroupedByCurrency").html(": " + _TotalCostInSeparateCurrencies);

    //ApplyPermissions();
    if (QACha && glbCallingControl != "QuotationsEdit_Approval") { $("#btn-SelectCharges").removeClass("hide"); /*$("#btn-ApplyDefaultQuotationCharges").removeClass("hide");*/ $("#btn-ApplyTemplateQuotationCharges").removeClass("hide"); } else { $("#btn-SelectCharges").addClass("hide"); /*$("#btn-ApplyDefaultQuotationCharges").addClass("hide");*/ $("#btn-ApplyTemplateQuotationCharges").addClass("hide"); }
    if (QDCha && glbCallingControl != "QuotationsEdit_Approval") {
        $("#btn-DeleteQuotationCharge").removeClass("hide");
    } else {
        $("#btn-DeleteQuotationCharge").addClass("hide");
       
    }
    if (!QECha && pDefaults.UnEditableCompanyName == "MED")
        $("#btn-SendChargesAdded").prop("disabled", true);
    BindAllCheckboxonTable("tblQuotationCharges", "ID", "cb-CheckAll-QuotationCharges");
    CheckAllCheckbox("HeaderDeleteQuotationChargeID");
    HighlightText("#tblQuotationCharges>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    QuotationCharges_CalculateSummary();
    debugger;
    if (pDefaults.UnEditableCompanyName == "EVL") {
                if (!QuotationsCanDelete) {
                    $('#lblTotalCostGroupedByCurrency').addClass("hide");
                    $('#lblTotalCost').addClass("hide");
                    $('#lblProfit').addClass("hide");
                    $('#lblProfitUSD').addClass("hide");
                    $('#lblProfitEUR').addClass("hide");
                    $('#lblProfitGBP').addClass("hide");
                    $('#CostPrice_QuotationsTd').addClass("hide");
                    $('#CostAmount_QuotationsTd').addClass("hide");
                    $('#CostCur_QuotationsTd').addClass("hide");
                    $('.CostAmount').addClass("hide");
                    $('.CostPrice').addClass("hide");
                    $('.CostCurrency').addClass("hide");
                } else {
                    $('#lblTotalCostGroupedByCurrency').removeClass("hide");
                    $('#lblTotalCost').removeClass("hide");
                    $('#lblProfit').removeClass("hide");
                    $('#lblProfitUSD').removeClass("hide");
                    $('#lblProfitEUR').removeClass("hide");
                    $('#lblProfitGBP').removeClass("hide");
                    $('#CostPrice_QuotationsTd').removeClass("hide");
                    $('#CostAmount_QuotationsTd').removeClass("hide");
                    $('#CostCur_QuotationsTd').removeClass("hide");
                    $('.CostAmount').removeClass("hide");
                    $('.CostPrice').removeClass("hide");
                    $('.CostCurrency').removeClass("hide");
                }
    }
}
function QuotationCharges_EditByDblClick(pID) {
    jQuery("#EditChargeModal").modal("show");
    QuotationCharges_FillControls(pID);
}
function QuotationCharges_LoadWithPagingWithWhereClause(pCallback) { // i renamed the id of paging controls coz used in PricingCharges
    LoadWithPagingWithWhereClause("div-Pager-Rename", "select-page-size-Rename", "spn-first-page-row-Rename", "spn-last-page-row-Rename", "spn-total-count-Rename", "div-Text-Total-Rename", "/api/QuotationCharges/LoadWithWhereClause", " WHERE QuotationRouteID = " + $("#hQuotationRouteID").val(), 0, 1000,
        function (pTabelRows) {
            QuotationCharges_BindTableRows(pTabelRows);
            if (pCallback != null && pCallback != undefined)
                pCallback();
        });
}
function QuotationCharges_DeleteList(callback) {
    let pQuotationChargesIDs = GetAllSelectedIDsAsString('tblQuotationCharges');
    //Confirmation message to delete
    if (pQuotationChargesIDs != "")
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
            DeleteListFunction("/api/QuotationCharges/Delete"
                , { "pQuotationChargesIDs": pQuotationChargesIDs }
                , function () {
                    QuotationCharges_LoadWithPagingWithWhereClause();
                });
        });
    //DeleteListFunction("/api/QuotationCharges/Delete", { "pQuotationChargesIDs": GetAllSelectedIDsAsString('tblQuotationCharges') }, function () { LoadViews("QuotationsEdit", null, $("#hQuotationRouteID").val()); });
}
function QuotationCharges_ApplyDefaultQuotationCharges() {
    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save the route first.");
    else {
        swal({
            title: strAreYouSure,
            text: "The default charges will be applied.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            var pWhereClause = " WHERE ";
            pWhereClause += " IsDefaultInQuotation = 1 AND IsInactive = 0 ";
            pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
            pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
            pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
            debugger;
            CallGETFunctionWithParameters("/api/QuotationCharges/ApplyDefaultQuotationCharges"
                , { pQuotationRouteID: $("#hQuotationRouteID").val(), pWhereClause: pWhereClause }
                , function () {
                    QuotationCharges_LoadWithPagingWithWhereClause();
                });
        });
    }
}
function QuotationCharges_ApplyTemplateQuotationCharges() {
    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save the route first.");
    else if ($("#slQuotationEditTemplate").val() == "")
        swal("Sorry", "Please, select template.");
    else {
        swal({
            title: strAreYouSure,
            text: "The default template charges will be applied.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Apply!",
            closeOnConfirm: true
        },
        //callback function in case of success
        function () {
            debugger;
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/QuotationCharges/ApplyTemplateQuotationCharges"
                , { pQuotationRouteID: $("#hQuotationRouteID").val(), pTemplateID: $("#slQuotationEditTemplate").val() }
                , function (pData) {
                    if (pData[0]) {
                        var pQuotationCharges = JSON.parse(pData[1]);
                        QuotationCharges_BindTableRows(pQuotationCharges);
                    }
                    else
                        swal("Sorry", "Connection failed, please try again.");
                    FadePageCover(false);
                });
        });
    }
}
function QuotationCharges_GetAvailableCharges() {
    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save the route first.");
    else {
        FadePageCover(true);
        if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsLTL").prop("checked"))
            $("#lblShownOperationCode").html($("#lblPackageTypesInQuotationRouteFooter").html());
        else
            $("#lblShownOperationCode").html($("#lblContainerTypesInQuotationRouteFooter").html());
        jQuery("#SelectChargesModal").modal("show");
        var pStrFnName = "/api/ChargeTypes/LoadAll";
        var pDivName = "divSelectCharges";
        var pCheckboxNameAttr = "cbSelectCharges";
        var pWhereClause = "";
        $("#divSelectCharges").html("");
        pWhereClause += " WHERE IsInactive = 0 AND IsOperationChargeType=1 ";
        pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
        pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
        pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
        pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
        //pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from QuotationCharges ";
        //pWhereClause += "                WHERE QuotationRouteID = " + $("#hQuotationRouteID").val() + ") ";
        //GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        //    , function () {
        //        HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
        //        FadePageCover(false);
        //    }
        //    , 1/*pCodeOrName*/);
        GetListAsCheckboxesWithVariousParameters(pStrFnName, { pWhereClause: pWhereClause }, pDivName, pCheckboxNameAttr
        , function () {
            HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase());
            FadePageCover(false);
        }
        , pDefaults.UnEditableCompanyName == "MAR"
            ? 2
            : (pDefaults.IsRepeatChargeTypeName ? 3 : 1) //pCodeOrName
        , "col-sm-3"/*pColumnSize*/);

        $("#btn-SearchCharges").attr("onclick", "QuotationCharges_GetAvailableCharges();");
        $("#btnSelectChargesApply").attr("onclick", "QuotationCharges_Insert(true);");
    }
}
//function QuotationCharges_ClearAllControls(callback) {
//    ClearAll("#EditChargeModal");
//    if (callback != null && callback != undefined)
//        callback();
//}
function QuotationCharges_FillControls(pID) {
    debugger;
    var tr = $("#tblQuotationCharges tr[ID='" + pID + "']");
    ClearAll("#EditChargeModal");
    if (pDefaults.UnEditableCompanyName == "GBL") {
        $(".classShowForGBL").removeClass("hide");
        if ($(tr).find("td.SalePrice").text() > 0) {
            $("#txtCostQuantity").attr("disabled", "disabled");
            $("#txtCostPrice").attr("disabled", "disabled");
            $("#slChargeCostCurrency").attr("disabled", "disabled");
        }
        else {
            $("#txtCostQuantity").removeAttr("disabled");
            $("#txtCostPrice").removeAttr("disabled");
            $("#slChargeCostCurrency").removeAttr("disabled");
        }
    }
    if (pDefaults.UnEditableCompanyName == "QUO") {
        $(".ClsHsCode").removeClass("hide");
        $(".ClsCustomDuties").removeClass("hide");
        $(".ClsWTH").removeClass("hide");
        $(".ClsBankFeeCharges").removeClass("hide");
        $(".ClsCommission").removeClass("hide");
    }
    $("#hChargeID").val(pID);
    if ($("#slChargeCostCurrency").val() == null || $("#slChargeSaleCurrency").val() == null) {
        $("#slChargeCostCurrency").html($("#hReadySlCurrencies").html());
        $("#slChargeSaleCurrency").html($("#hReadySlCurrencies").html());
    }
    var pCostCurrencyID = $(tr).find("td.CostCurrency").attr('val');
    var pSaleCurrencyID = $(tr).find("td.SaleCurrency").attr('val');
    var pPOrC = $(tr).find("td.POrC").attr('val');
    var pBillTo_OperationPartnerTypeID = $(tr).find("td.BillTo_OperationPartnerTypeID").attr('val');
    var pBillTo = $(tr).find("td.BillTo").attr('val');
    var pContainerTypeID = $(tr).find("td.ContainerType").attr('val');
    var pPackageTypeID = $(tr).find("td.PackageType").attr('val');
    var pOperationPartnerTypeID = $(tr).find("td.OperationPartnerTypeID").attr('val');
    var pPartnerID = $(tr).find("td.PartnerID").attr('val');
    var pPartnerTypeID = $(tr).find("td.PartnerTypeID").attr('val');
    var pSupplierSiteID = $(tr).find("td.SupplierSiteID").attr('val');
    var pChargeTypeID = $(tr).find("td.Charge").attr('val');
    var pMeasurementID = $(tr).find("td.Measurement").attr('val');
    //QuotationChargeCurrency_GetList(pCurrencyID);
    if (pContainerTypeID == 0)
        $("#txtDemurrageDays").attr("disabled", "disabled");
    else
        $("#txtDemurrageDays").removeAttr("disabled");
    $("#lblChargeShown").html(": " + $(tr).find("td.Charge").text());
    if ($("#slChargeType option").length < 2 || $("#slCalculationType option").length < 2) {
        FadePageCover(true);
        var pWhereClause = "";
        pWhereClause += " WHERE IsInactive = 0 AND IsOperationChargeType=1 ";
        pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
        pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
        pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
        CallGETFunctionWithParameters("/api/ChargeTypes/LoadAll"
                        , { pWhereClause: pWhereClause }
                        , function (pData) {
                            var pChargeType = pData[0];
                            var pMeasurement = pData[1];
                            FillListFromObject(pChargeTypeID, (pDefaults.IsRepeatChargeTypeName ? 4 : 2), "<--Select-->", "slChargeType", pChargeType, null);
                            FillListFromObject(pMeasurementID, 1/*1-Code 2-Name*/, null, "slCalculationType", pMeasurement, null)
                            FadePageCover(false);
                        }
                        , null);
    }
    else {
        $("#slChargeType").val($(tr).find("td.Charge").attr('val') == 0 ? "" : $(tr).find("td.Charge").attr('val'));
        $("#slCalculationType").val(pMeasurementID == 0 ? "" : pMeasurementID);
    }
    //$("#txtCalculationType").val($(tr).find("td.Measurement").text());
    //$("#txtCalculationType").attr("MeasurementID", $(tr).find("td.Measurement").attr('val'));
    $("#txtCostQuantity").val($(tr).find("td.CostQuantity").text());
    $("#txtDemurrageDays").val($(tr).find("td.DemurrageDays").text());
    $("#txtCostPrice").val($(tr).find("td.CostPrice").text());
    $("#txtAdditionalAmount").val($(tr).find("td.AdditionalAmount").text());
    $("#txtCostAmount").val($(tr).find("td.CostAmount").text());
    $("#slChargeCostCurrency").val(pCostCurrencyID);
    $("#txtSaleQuantity").val($(tr).find("td.SaleQuantity").text());
    $("#txtSalePrice").val($(tr).find("td.SalePrice").text());
    $("#txtSaleAmount").val($(tr).find("td.SaleAmount").text());    
    $("#txtViewOrder").val($(tr).find("td.ViewOrder").text());
    $("#slChargeSaleCurrency").val(pSaleCurrencyID);
    $("#slChargePOrC").val(pPOrC == 0 ? "" : pPOrC);
    //$("#txtCustomDuties").val($(tr).find("td.CustomDuties").text());
    //$("#txtHsCode").val($(tr).find("td.HsCode").text());
    //$("#txtWTH").val($(tr).find("td.WTH").text());
    //$("#txtBankFeeCharges").val($(tr).find("td.BankFeeCharges").text());
    //$("#txtcommission").val($(tr).find("td.commission").text());




    if (pBillTo_OperationPartnerTypeID != 0 && pBillTo != 0)
        $("#slChargeBillTo option[value='" + pBillTo + "'][operationpartnertypeid='" + pBillTo_OperationPartnerTypeID + "']").prop("selected", true);

    $("#txtChargeNotes").val($(tr).find("td.Notes").text());

    if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) {
        $("#lblContainerType").removeClass("hide");
        $("#divDemurrage").removeClass("hide");
        $("#lblPackageType").addClass("hide");
        var pWhereClause = "";
        //pWhereClause += " WHERE ID IN (SELECT ContainerTypeID FROM QuotationContainersAndPackages ";
        //pWhereClause += " 			 Where QuotationRouteID = " + $("#hQuotationRouteID").val() + ")";
        //pWhereClause += " Where QuotationRouteID = " + $("#hQuotationRouteID").val();
        //pWhereClause += " ORDER BY ContainerTypeCode ";
        //debugger;
        //GetListWithContainerTypeCodeAndQuantityAttr(pContainerTypeID, "/api/QuotationContainersAndPackages/LoadAll", "Select ContainerType", "slContainerOrPackage", pWhereClause);
        pWhereClause = "ORDER BY Code";
        GetListWithCodeAndWhereClause(pContainerTypeID, "/api/ContainerTypes/LoadAll", "Select Container Type", "slContainerOrPackage", pWhereClause, null);
    }
    if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#lblContainerType").addClass("hide");
        $("#divDemurrage").addClass("hide");
        $("#lblPackageType").removeClass("hide");
        var pWhereClause = "";
        //pWhereClause += " WHERE ID IN (SELECT PackageTypeID FROM QuotationContainersAndPackages ";
        //pWhereClause += " 			 Where QuotationRouteID = " + $("#hQuotationRouteID").val() + ")";
        //pWhereClause += " Where QuotationRouteID = " + $("#hQuotationRouteID").val();
        //pWhereClause += " ORDER BY PackageTypeName ";
        //GetListWithPackageTypeNameAndQuantityAttr(pPackageTypeID, "/api/QuotationContainersAndPackages/LoadAll", "Select PackageType", "slContainerOrPackage", pWhereClause);
        pWhereClause = "ORDER BY Name";
        GetListWithNameAndWhereClause(pPackageTypeID, "/api/PackageTypes/LoadAll", "Select Package Type", "slContainerOrPackage", pWhereClause, null);
    }
    //OperationPartnerTypes_GetList(pOperationPartnerTypeID, function () { ChargeSupplier_GetList(pPartnerID); });
    $("#slChargeOperationPartnerTypes").val(pOperationPartnerTypeID == 0 ? "" : pOperationPartnerTypeID);
    QuotationCharges_PartnerTypeChanged(pPartnerTypeID, pPartnerID, pSupplierSiteID);

    $("#slContainerOrPackage").attr("onchange", "QuotationCharges_PackageOrContainerTypeChanged();");
    $("#btnSaveCharge").attr("onclick", "QuotationCharges_Update(false);");
}
//called when pressing Apply in SelectCharges Modal
function QuotationCharges_Insert(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/QuotationCharges/InsertList"
            , { "pQuotationRouteID": $("#hQuotationRouteID").val(), "pSelectedIDs": pSelectedIDs }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , function () { QuotationCharges_GetAvailableCharges(); }
            , function () {
                QuotationCharges_LoadWithPagingWithWhereClause();
            });
}
function QuotationCharges_Update(pSaveandAddNew) {
    debugger;
    //if (pDefaults.UnEditableCompanyName == "GBL" && $("#slChargSites").val() == "")
    //{
    //    swal(strSorry, "Choose Site", "warning");
    //}
    //else
    if (!($('#slChargeCostCurrency option:selected').attr('MasterDataExchangeRate') > 0)) {
        swal(strSorry, "Please, Register (" + $('#slChargeCostCurrency option:selected').text() +") Exchange Rate, Then Reload", "warning");
        return;
    }
    if (!($('#slChargeSaleCurrency option:selected').attr('MasterDataExchangeRate') > 0)) {
        swal(strSorry, "Please, Register (" + $('#slChargeSaleCurrency option:selected').text() + ") Exchange Rate, Then Reload", "warning");
        return;
    }
    if ($("#txtCostAmount").val() != "NaN" && $("#txtSaleAmount").val() != "NaN") //check that decimal doesn't contain 2 decimal pts
    {
        //if (parseFloat($("#txtCostAmount").val()) > parseFloat($("#txtSaleAmount").val()))
        //    swal(strSorry, strCheckPrices, "warning");
        //else
        InsertUpdateFunction("form", "/api/QuotationCharges/Update", {
            pID: $("#hChargeID").val()
            //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
            , pQuotationRouteID: $("#hQuotationRouteID").val()
            , pChargeTypeID: $("#slChargeType").val()
            , pMeasurementID: $("#slCalculationType").val() == "" ? 0 : $("#slCalculationType").val() //$("#txtCalculationType").attr("MeasurementID")
            , pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) && $('#slContainerOrPackage option:selected').val() != "")
                ? $('#slContainerOrPackage option:selected').val()
                : 0)
            , pDemurrageDays: ($("#txtDemurrageDays").val().trim() == "" ? 0 : $("#txtDemurrageDays").val().trim())
            , pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slContainerOrPackage option:selected').val() != "")
                ? $('#slContainerOrPackage option:selected').val()
                : 0)
            , pCostQuantity: ($("#txtCostQuantity").val().trim() == "" ? 0 : $("#txtCostQuantity").val().trim())
            , pCostPrice: ($("#txtCostPrice").val().trim() == "" ? 0 : $("#txtCostPrice").val().trim())
            , pCostAmount: ($("#txtCostAmount").val().trim() == "" ? 0 : $("#txtCostAmount").val().trim())
            , pAdditionalAmount: ($("#txtAdditionalAmount").val().trim() == "" ? 0 : $("#txtAdditionalAmount").val().trim())
            , pCostCurrencyID: ($('#slChargeCostCurrency option:selected').val() == "" ? 0 : $('#slChargeCostCurrency option:selected').val())
            , pCostExchangeRate: $('#slChargeCostCurrency option:selected').attr("MasterDataExchangeRate")
            , pSaleQuantity: ($("#txtSaleQuantity").val().trim() == "" ? 0 : $("#txtSaleQuantity").val().trim())
            , pSalePrice: ($("#txtSalePrice").val().trim() == "" ? 0 : $("#txtSalePrice").val().trim())
            , pSaleAmount: ($("#txtSaleAmount").val().trim() == "" ? 0 : $("#txtSaleAmount").val().trim())
            , pSaleCurrencyID: ($('#slChargeSaleCurrency option:selected').val() == "" ? 0 : $('#slChargeSaleCurrency option:selected').val())
            , pPOrC: ($('#slChargePOrC option:selected').val() == "" ? 0 : $('#slChargePOrC option:selected').val())
            , pBillTo_OperationPartnerTypeID: ($('#slChargeBillTo option:selected').val() == "" ? 0 : $('#slChargeBillTo option:selected').attr('operationpartnertypeid'))
            , pBillTo: ($('#slChargeBillTo option:selected').val() == "" ? 0 : $('#slChargeBillTo option:selected').val())
            , pSaleExchangeRate: $('#slChargeSaleCurrency option:selected').attr("MasterDataExchangeRate")

            , pOperationPartnerTypeID: ($("#slChargeSupplier").val() == "" ? 0 : $("#slChargeOperationPartnerTypes").val())
            , pPartnerTypeID: ($("#slChargeSupplier").val() == "" ? 0 : $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID"))
            , pPartnerID: $("#slChargeSupplier").val() == "" ? 0 : $("#slChargeSupplier").val()
            , pViewOrder: ($("#txtViewOrder").val().trim() == "" ? 0 : $("#txtViewOrder").val().trim())
            , pNotes: ($("#txtChargeNotes").val().trim() == "" ? "0" : $("#txtChargeNotes").val().trim().toUpperCase())
            , pSupplierSiteID: ($("#slChargSites").val() == "" ? 0 : $("#slChargSites").val())
            //, pHsCode: $("#txtHsCode").val()
            //, pCustomDuties: ($("#txtCustomDuties").val().trim() == "" ? 0 : $("#txtCustomDuties").val().trim())   
            //, pWTH: ($("#txtWTH").val().trim() == "" ? 0 : $("#txtWTH").val().trim())
            //, pBankFeeCharges: ($("#txtBankFeeCharges").val().trim() == "" ? 0 : $("#txtBankFeeCharges").val().trim())
            //, pcommission: ($("#txtcommission").val().trim() == "" ? 0 : $("#txtcommission").val().trim())

        }, pSaveandAddNew, "EditChargeModal", function () { QuotationCharges_LoadWithPagingWithWhereClause(); });
    } else
        swal(strSorry, strCheckEntries, "warning");
}
function QuotationCharges_OpenCopyChargeModal(pChargeIDToCopy, pChargeTypeName) {
    debugger;
    $("#txtNumberOfCopies").val("");
    $("#lblCopyChargeShown").html(": " + pChargeTypeName);
    $("#btnCopyCharge").attr("onclick", "QuotationCharges_Copy(" + pChargeIDToCopy + ")");
}
function QuotationCharges_Copy(pChargeIDToCopy) {
    if ($("#txtNumberOfCopies").val() == "" || $("#txtNumberOfCopies").val() > 10)
        swal("Sorry", "Please, enter number of copies and it must be less less than 10.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/QuotationCharges/CopyCharge"
            , { pChargeIDToCopy: pChargeIDToCopy, pNumberOfDuplicates: $("#txtNumberOfCopies").val() }
            , function (pData) {
                var pCharges = JSON.parse(pData[0]);
                QuotationCharges_BindTableRows(pCharges);
                swal("Success", "Saved successfully.");
                jQuery("#CopyChargeModal").modal("hide");
                FadePageCover(false);
            }
            , null);
    }
}
function QuotationCharges_PackageOrContainerTypeChanged() {
    debugger;
    if ($("#slContainerOrPackage").val() == "") {
        $("#txtDemurrageDays").val("");
        $("#txtDemurrageDays").attr("disabled", "disabled");
    }
    else
        $("#txtDemurrageDays").removeAttr("disabled");
    //if ($("#slContainerOrPackage option:selected").val() != "") {
    //    $("#txtCostQuantity").val($("#slContainerOrPackage option:selected").attr("Quantity"));
    //    //todo: get the number of packages or containers from the packages tab
    //    CalculateChargesCost();
    //}
}
function CalculateChargesCost() {
    debugger;
    $("#txtCostAmount").val($("#txtCostQuantity").val() * $("#txtCostPrice").val());
    $("#txtSaleAmount").val($("#txtCostQuantity").val() * $("#txtSalePrice").val());
}
function QuotationCharges_CalculateSummary() {
    debugger;
    var decTotalCost = 0;
    var decTotalSale = 0;
    var decProfit = 0;
    var decProfitPercentage = 0;
    $(".CostAmount").each(function () {
        var value = $(this).text();
        var valCostExchangeRate = $(this.parentElement.getElementsByClassName('CostExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalCost += parseFloat(value) * parseFloat(valCostExchangeRate);
        }
    });
    $(".SaleAmount").each(function () {
        var value = $(this).text();
        var valSaleExchangeRate = $(this.parentElement.getElementsByClassName('SaleExchangeRate')).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalSale += parseFloat(value) * parseFloat(valSaleExchangeRate);
        }
    });
    decProfit = decTotalSale - decTotalCost;
    decProfitPercentage = ((decProfit / decTotalCost) * 100).toFixed(2);
    $("#lblTotalCost").html(": " + decTotalCost.toFixed(4).toString() + " " + pDefaults.CurrencyCode);
    if (pDefaults.UnEditableCompanyName == "QUO") {
        $("#lblTotalCostVAT").removeClass("hide");
        $(".classShowForQUO").removeClass("hide");
        $("#lblTotalCostVAT").html(": " + (decTotalCost + decTotalCost * .14).toFixed(4).toString() + " " + pDefaults.CurrencyCode);
    }
    $("#lblTotalSale").html(": " + decTotalSale.toFixed(4).toString() + " " + pDefaults.CurrencyCode);
    $("#lblProfit").html(": " + decProfit.toFixed(4).toString() + " " + pDefaults.CurrencyCode + "(" + decProfitPercentage + "%)");
    $("#lblProfitUSD").html(": " + (decProfit / $("#hReadySlCurrencies :contains('USD')").attr("MasterDataExchangeRate")).toFixed(4).toString() + " USD");
    if ($("#hReadySlCurrencies :contains('EUR')").length > 0) {
        let val = (decProfit / $("#hReadySlCurrencies :contains('EUR')").attr("MasterDataExchangeRate")).toFixed(4).toString();
        if (!isNaN(val)) {
            $("#lblProfitEUR").html(": " + val + " EUR");
            $("#spProfitEUR").removeClass("hide");
        }
    }
    if ($("#hReadySlCurrencies :contains('GBP')").length > 0) {
        let val = (decProfit / $("#hReadySlCurrencies :contains('GBP')").attr("MasterDataExchangeRate")).toFixed(4).toString();
        if (!isNaN(val)) {
            $("#lblProfitGBP").html(": " + val + " GBP");
            $("#spProfitGBP").removeClass("hide");
        }
    }
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        $(".totalsCurr").addClass("hide");
    }
    if (pDefaults.UnEditableCompanyName == "AKS") {
        $(".totalsCurr").text('(' + pDefaults.CurrencyCode +')');
    }
    if (pDefaults.UnEditableCompanyName == "NTMU") {
        $(".totalsCurr").text('(' + pDefaults.CurrencyCode + ')');
    }
    if (decTotalSale <= decTotalCost) {
        $("#lblProfit").removeClass("static-text-primary");
        $("#lblProfit").addClass("static-text-danger");
        $("#lblProfitUSD").removeClass("static-text-primary");
        $("#lblProfitUSD").addClass("static-text-danger");
        $("#lblProfitEUR").removeClass("static-text-primary");
        $("#lblProfitEUR").addClass("static-text-danger");
        $("#lblProfitGBP").removeClass("static-text-primary");
        $("#lblProfitGBP").addClass("static-text-danger");
    }
    else {
        $("#lblProfit").addClass("static-text-primary");
        $("#lblProfit").removeClass("static-text-danger");
        $("#lblProfitUSD").addClass("static-text-primary");
        $("#lblProfitUSD").removeClass("static-text-danger");
        $("#lblProfitEUR").addClass("static-text-primary");
        $("#lblProfitEUR").removeClass("static-text-danger");
        $("#lblProfitGBP").addClass("static-text-primary");
        $("#lblProfitGBP").removeClass("static-text-danger");
    }
}
function ChargesConfirmation_GetAvailableUsers() {
    debugger;

    $("#CheckboxesListModal #txtSearchItems").val('');
    Receptionists_GetAvailableUsers(null, $('#hQuotationRouteCreatorID').val());
    $("#btnCheckboxesListApply").attr("onclick", "QuotationCharges_ChargesAddedMessage();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers(null," + $('#hQuotationRouteCreatorID').val()+");");
}
function QuotationCharges_ChargesAddedMessage() {
    debugger;
    var receiverIDs = [];
    $("#CheckboxesListModal input[type=checkbox]").each(function () {
        if ($(this).is(':checked'))
            receiverIDs.push($(this).val());
    });
    if ($("#hQuotationRouteID").val() == "") {
        swal("Sorry", "Please, save header first.");
        return;
    }
    if (receiverIDs.length == 0) {
        swal("Sorry", "Please, select receiver first.");
        return;
    }
    else {
        FadePageCover(true);
        var pSubject = "Charges added For Quot. " + $("#hQuotationCode").val();
        var pBody = "Quotation Code : " + $("#hQuotationCode").val() + "\n";
        pBody += "Client " + $("#lblClient").text() + "\n";
        pBody += "Service : " + $("#slMoveTypes option:selected").text() + "\n";
        pBody += "From : " + $("#slRoutingsPOLCountries option:selected").text() + " - " + $("#slRoutingsPOL option:selected").text() + "\n";
        pBody += "To : " + $("#slRoutingsPODCountries option:selected").text() + " - " + $("#slRoutingsPOD option:selected").text() + "\n";
        pBody += "Commodity : " + $("#slCommodities option:selected").text() + "\n";
        var pParametersWithValues = {
            pSubject: pSubject
            , pBody: pBody
            , pConfirmedQuotationRouteID: $("#hQuotationRouteID").val()
            , pReceiverIDs: receiverIDs.toString()
            , pActionID: 2
            , pActionName: 'ConfirmCharge'
        }
        CallGETFunctionWithParameters("/api/QuotationCharges/SendQuotationChargesMessage", pParametersWithValues
            , function (pData) {
                var _MessageReturned = pData[0];
                if (_MessageReturned == "")
                    swal("Success", "Confirmation sent.");
                else
                    swal("Sorry", _MessageReturned);
                FadePageCover(false);
            }
            , null);
    }
}
function QuotationCharges_PrintLog() {
    debugger;
    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save header first.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Quotations/QR_PrintChargesLog"
            , { pQuotationRouteIDToPrintChargesLog: $("#hQuotationRouteID").val() }
            , function (pData) {
                var pQuotationRouteHeader = JSON.parse(pData[0]);
                var pReportRows = JSON.parse(pData[1]);
                var pReportTitle = "Quotation Charges Log";

                var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();

                var mywindow = window.open('', '_blank');
                var ReportHTML = '';
                //<div style="width:500px;height:100px;border:1px solid #000;">This is a rectangle!</div>
                ReportHTML += '<html>';
                ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
                ReportHTML += '         <body style="background-color:white;">';
                ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
                ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

                ReportHTML += '             <div class="col-xs-12"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
                ReportHTML += '             <div class="col-xs-12"><b>Quotation :</b> ' + pQuotationRouteHeader.Code + '</div>';
                ////ReportHTML += '                 <section class="panel panel-default">';
                //ReportHTML += '                     <div class="table-responsive">';
                ReportHTML += '                         <div> &nbsp; </div>'
                //ReportHTML += '                         <table id="tblQuotationChargesLog" class="table table-striped text-sm table-hover b-t b-r b-b b-l print">';//remove t1 class to remove row numbers
                ReportHTML += '                         <table id="tblQuotationChargesLog" class="table table-striped text-sm table-bordered m-t-sm " style="border:solid #999 !important;">';//style="border:solid #000 !important;"
                ReportHTML += '                             <thead>';
                ReportHTML += '                                 <tr class="" style="font-size:95%;">';
                ReportHTML += '                                     <th>User</th>';
                //ReportHTML += '                                     <th>Log For</th>';
                ReportHTML += '                                     <th>Action</th>';
                ReportHTML += '                                     <th>Action Taken</th>';
                ReportHTML += '                                 </tr>';
                ReportHTML += '                             </thead>';
                ReportHTML += '                             <tbody>';
                //debugger;
                //$.each(JSON.parse(pReportRows), function (i, item) { debugger; });
                $.each((pReportRows), function (i, item) {
                    ReportHTML += '                                     <tr style="font-size:95%;">';
                    ReportHTML += '                                         <td>' + (item.UserName == 0 ? "" : item.UserName) + '</td>';
                    //ReportHTML += '                                         <td>' + (item.LogFor == constOperationLogForPay ? "Pay." : "Rec.") + '</td>';
                    ReportHTML += '                                         <td>' + (item.ActionType == 'I' ? "Insert"
                                                                                                : (item.ActionType == 'U' ? "Update" : "Delete")
                                                                                    ) + '</td>';
                    ReportHTML += '                                         <td>' + (item.ActionTaken == 0 ? "" : item.ActionTaken) + '</td>';
                    //ReportHTML += '                                         <td>' + item.CostAmountSubTotal.toFixed(2) + '</td>';
                    ReportHTML += '                                     </tr>';
                });
                ReportHTML += '                             </tbody>';
                ReportHTML += '                         </table>';
                //ReportHTML += '                     </div>';//of table-responsive
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
                mywindow.document.write(ReportHTML);
                mywindow.document.close();
                FadePageCover(false);
            }
            , null);
    }
}
/****************************************MultiEdit Fns***************************************/
function FillQuotationChargesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, pIsInsert, callback) {
    debugger;
    $.ajax({
        type: "GET",
        url: strServerURL + pStrFnName,
        data: { pWhereClause: pWhereClause },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (pData) {
            var pContainerType = pData[2];
            var pPackageType = pData[3];
            //Clear the div
            $("#" + pDivName).html("");
            var divData = ' <section class="panel panel-default m-l-n" style="overflow: scroll; width:auto; height: 350px;"> ';
            divData += '    <div class="table-responsive"> ';
            divData += '        <table id="' + ptblModalName + '" class="table table-striped b-t b-light text-sm  table-hover"> ';
            divData += '            <thead> ';
            divData += '            <tr> ';
            divData += '                <th id="HeaderSelectChargeTypesIDs" ' + (pIsInsert ? '>' : ' class="hide">');
            divData += '                </th> ';
            divData += '                <th>ChargeType</th> ';
            divData += '                <th class="hide">Calc.</th> ';
            divData += '                <th style="width:5%;">Qty</th> ';
            divData += '                <th>CostPrice</th> ';
            divData += '                <th>CostAmount</th> ';
            divData += '                <th>CostCur</th> ';
            divData += '                <th>CostEx.Rate</th> ';
            divData += '                <th class="hide">SaleQuantity</th> ';
            divData += '                <th>SalePrice</th> ';
            divData += '                <th>SaleAmount</th> ';
            divData += '                <th>SaleCur</th> ';
            divData += '                <th>P/C</th> ';
            divData += '                <th>Bill To</th> ';
            divData += '                <th>SaleEx.Rate</th> ';
            if (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')))
                divData += '                <th>Package</th> ';
            else
                divData += '                <th>Container.</th> ';
            divData += '                <th class="rounded-right hide"></th> ';
            divData += '            </tr> ';
            divData += '            </thead> ';
            divData += '            <tbody> ';
            // Bind Rows
            $.each(JSON.parse(pData[0]), function (i, item) {
                divData += "        <tr ID='" + item.ID + "'> ";
                divData += "            <td class='tblModalQuotationChargeID " + (pIsInsert ? " ' " : " hide '") + " > <input name='" + pCheckboxNameAttr + "' type='checkbox' value='" + item.ID + "' " + (pIsInsert ? "" : "checked='checked'") + "></td> ";
                //divData += "            <td class='tblModalQuotationCharge' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td> ";
                divData += "            <td class='tblModalQuotationCharge' val='" + item.ChargeTypeID + "' style='width:300px;'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td> ";
                divData += "            <td class='tblModalQuotationChargeMeasurement hide'> <select id='slTblModalQuotationChargeMeasurement" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'></select> </td> ";

                divData += "            <td class='tblModalQuotationChargeCostQuantity'> <input type='text' id='txtTblModalQuotationChargeCostQuantity" + item.ID + "' " + (pDefaults.UnEditableCompanyName == "GBL" && item.SalePrice > 0 ? " disabled " : "") + " class='form-control controlStyle' onchange='QuotationCharges_Row_CalculateCharges(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' maxlength='10' placeholder='0' value='1'/> </td> ";
                divData += "            <td class='tblModalQuotationChargeCostPrice'> <input type='text' id='txtTblModalQuotationChargeCostPrice" + item.ID + "' " + (pDefaults.UnEditableCompanyName == "GBL" && item.SalePrice > 0 ? " disabled " : "") + " class='form-control controlStyle classCostPriceField' onchange='QuotationCharges_Row_CalculateCharges(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                divData += "            <td class='tblModalQuotationChargeCostAmount'><input type='text' name='txtTblModalQuotationChargeCostAmount'  disabled='disabled' id='txtTblModalQuotationChargeCostAmount" + item.ID + "' class='form-control controlStyle' onchange='QuotationCharges_txtTblModalCostAmount_Changed(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                divData += "            <td class='tblModalQuotationChargeCostCurrency'> <select id='slQuotationChargeCostCurrency" + item.ID + "' " + (pDefaults.UnEditableCompanyName == "GBL" && item.SalePrice > 0 ? " disabled " : "") + " class='controlStyle classCostPriceField' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='QuotationCharges_txtTblModalCurrency_Changed(" + item.ID + "," + pIsInsert + ");' data-required='true'></select> </td> ";
                divData += "            <td class='tblModalQuotationChargeCostExchangeRate'><input type='text' name='txtTblModalQuotationChargeCostExchangeRate' id='txtTblModalQuotationChargeCostExchangeRate" + item.ID + "' class='form-control controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.CostCurrencyID || pDefaults.UnEditableCompanyName == "MED" ? "disabled" : "") + " /> </td> ";

                divData += "            <td class='tblModalQuotationChargeSaleQuantity hide'> <input type='text' id='txtTblModalQuotationChargeSaleQuantity" + item.ID + "' class='form-control controlStyle' onchange='QuotationCharges_Row_CalculateCharges(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' maxlength='10' placeholder='0' value='1'/> </td> ";
                divData += "            <td class='tblModalQuotationChargeSalePrice'> <input type='text' id='txtTblModalQuotationChargeSalePrice" + item.ID + "' class='form-control controlStyle classSalePriceField' onchange='QuotationCharges_Row_CalculateCharges(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                divData += "            <td class='tblModalQuotationChargeSaleAmount'><input type='text' name='txtTblModalQuotationChargeSaleAmount'  disabled='disabled' id='txtTblModalQuotationChargeSaleAmount" + item.ID + "' class='form-control controlStyle' onchange='QuotationCharges_txtTblModalSaleAmount_Changed(" + item.ID + "," + pIsInsert + ");' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' /> </td> ";
                divData += "            <td class='tblModalQuotationChargeSaleCurrency'> <select id='slQuotationChargeSaleCurrency" + item.ID + "' class='controlStyle classSalePriceField' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='QuotationCharges_txtTblModalCurrency_Changed(" + item.ID + "," + pIsInsert + ");' data-required='true'></select> </td> ";
                divData += "            <td class='tblModalQuotationChargePOrC'> <select id='slQuotationChargePOrC" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'></select> </td> ";
                divData += "            <td class='tblModalQuotationChargeBillTo'> <select id='slQuotationChargeBillTo" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'></select> </td> ";
                divData += "            <td class='tblModalQuotationChargeSaleExchangeRate'><input type='text' name='txtTblModalQuotationChargeSaleExchangeRate' id='txtTblModalQuotationChargeSaleExchangeRate" + item.ID + "' class='form-control controlStyle' data-type='float' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);'  data-required='false' maxlength='10' placeholder='0.00' " + ($("#hDefaultCurrencyID").val() == item.SaleCurrencyID || pDefaults.UnEditableCompanyName=="MED" ? "disabled" : "") + " /> </td> ";
                if (($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')))
                    divData += "            <td class='tblModalQuotationChargePackageType'> <select id='slTblModalQuotationChargePackageType" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'></select> </td> ";
                else
                    divData += "            <td class='tblModalQuotationChargeContainerType'> <select id='slTblModalQuotationChargeContainerType" + item.ID + "' class='controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='' data-required='false'></select> </td> ";
                divData += "        </tr> ";
            });
            divData += '            </tbody> ';
            divData += '        </table> ';
            divData += '    </div> ';
            divData += ' </section> ';
            $("#" + pDivName).append(divData);
            //to fill the controls after creating them in the previous loop
            $.each(JSON.parse(pData[0]), function (i, item) {
                debugger;
                //FillListFromObject(pID, pCodeOrName/*1-Code 2-Name*/, pStrFirstRow, pSlName, pData, callback)
                FillListFromObject(item.MeasurementID, 1/*1-Code 2-Name*/, null, "slTblModalQuotationChargeMeasurement" + item.ID, pData[1], null)
                FillListFromObject(item.PackageTypeID, 2/*1-Code 2-Name*/, "<--Select-->", "slTblModalQuotationChargePackageType" + item.ID, pPackageType, null)
                FillListFromObject(item.ContainerTypeID, 1/*1-Code 2-Name*/, "<--Select-->", "slTblModalQuotationChargeContainerType" + item.ID, pContainerType, null)
                $("#txtTblModalQuotationChargeCostQuantity" + item.ID).val(pIsInsert ? 1 : item.CostQuantity);
                $("#txtTblModalQuotationChargeCostPrice" + item.ID).val(item.CostPrice);
                $("#txtTblModalQuotationChargeCostAmount" + item.ID).val(item.CostAmount);

                $("#slQuotationChargeCostCurrency" + item.ID).html($("#hReadySlCurrencies").html());
                $("#slQuotationChargeCostCurrency" + item.ID).val(item.CostCurrencyID);
                $("#txtTblModalQuotationChargeCostExchangeRate" + item.ID).val(item.CostExchangeRate);

                $("#txtTblModalQuotationChargeSaleQuantity" + item.ID).val(pIsInsert ? 1 : item.SaleQuantity);
                $("#txtTblModalQuotationChargeSalePrice" + item.ID).val(item.SalePrice);
                $("#txtTblModalQuotationChargeSaleAmount" + item.ID).val(item.SaleAmount);

                $("#slQuotationChargeSaleCurrency" + item.ID).html($("#hReadySlCurrencies").html());
                $("#slQuotationChargeSaleCurrency" + item.ID).val(item.SaleCurrencyID);

                $("#slQuotationChargePOrC" + item.ID).html($("#slChargePOrC").html());
                $("#slQuotationChargePOrC" + item.ID).val(item.POrC == 0 ? "" : item.POrC);

                $("#slQuotationChargeBillTo" + item.ID).html($("#slChargeBillTo").html());
                if (item.BillTo_OperationPartnerTypeID != 0 && item.BillTo != 0)
                    $("#slQuotationChargeBillTo" + item.ID + " option[value='" + item.BillTo + "'][operationpartnertypeid='" + item.BillTo_OperationPartnerTypeID + "']").prop("selected", true);

                $("#txtTblModalQuotationChargeSaleExchangeRate" + item.ID).val(item.SaleExchangeRate);

            });
            //SetDatepickerFormat();//coz when adding datepicker dynamically i ve to rebind it
            if (callback != null && callback != undefined)
                callback();
        },
        error: function (jqXHR, exception) {
            swal("Sorry", "Please, press Ctrl+Shft+R, and if the problem persists contact your technical support! FillQuotationChargesModalTableControls in mainapp.master.js", "");
        }
    });
}
function QuotationCharges_UpdateList(pSaveandAddNew) {
    debugger;
    var pSelectedIDsToUpdate = GetAllSelectedIDsAsStringWithNameAttr("cbSelectQuotationCharges");//returns string array of IDs
    var pMeasurementIDList = "";
    var pQuantityList = "";
    var pCostPriceList = "";
    var pCostAmountList = "";
    var pCostExchangeRateList = "";
    var pCostCurrencyList = "";
    var pSalePriceList = "";
    var pSaleAmountList = "";
    var pSaleExchangeRateList = "";
    var pSaleCurrencyList = "";
    var pPOrCList = "";
    var pBillTo_OperationPartnerTypeIDList = "";
    var pBillToList = "";
    var pContainerTypeIDList = "";
    var pPackageTypeIDList = "";
    if (pSelectedIDsToUpdate != "") {
        var NumberOfSelectRows = pSelectedIDsToUpdate.split(',').length;
        for (i = 0; i < NumberOfSelectRows; i++) {
            var currentRowID = pSelectedIDsToUpdate.split(",")[i];

            pMeasurementIDList += ((pMeasurementIDList == "") ? "" : ",") + ($("#slTblModalQuotationChargeMeasurement" + currentRowID).val() == undefined || $("#slTblModalQuotationChargeMeasurement" + currentRowID).val() == "" ? 0 : $("#slTblModalQuotationChargeMeasurement" + currentRowID).val());
            pQuantityList += ((pQuantityList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeCostQuantity" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeCostQuantity" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeCostQuantity" + currentRowID).val());
            pCostPriceList += ((pCostPriceList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeCostPrice" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeCostPrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeCostPrice" + currentRowID).val());
            pCostAmountList += ((pCostAmountList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeCostAmount" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeCostAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeCostAmount" + currentRowID).val());
            pCostCurrencyList += ((pCostCurrencyList == "") ? "" : ",") + ($("#slQuotationChargeCostCurrency" + currentRowID).val() == undefined || $("#slQuotationChargeCostCurrency" + currentRowID).val() == "" ? 0 : $("#slQuotationChargeCostCurrency" + currentRowID).val());
            pCostExchangeRateList += ((pCostExchangeRateList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeCostExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeCostExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeCostExchangeRate" + currentRowID).val());
            pSalePriceList += ((pSalePriceList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeSalePrice" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeSalePrice" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeSalePrice" + currentRowID).val());
            pSaleAmountList += ((pSaleAmountList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeSaleAmount" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeSaleAmount" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeSaleAmount" + currentRowID).val());
            pSaleCurrencyList += ((pSaleCurrencyList == "") ? "" : ",") + ($("#slQuotationChargeSaleCurrency" + currentRowID).val() == undefined || $("#slQuotationChargeSaleCurrency" + currentRowID).val() == "" ? 0 : $("#slQuotationChargeSaleCurrency" + currentRowID).val());
            pPOrCList += ((pPOrCList == "") ? "" : ",") + ($("#slQuotationChargePOrC" + currentRowID).val() == undefined || $("#slQuotationChargePOrC" + currentRowID).val() == "" ? 0 : $("#slQuotationChargePOrC" + currentRowID).val());
            pBillTo_OperationPartnerTypeIDList += ((pBillTo_OperationPartnerTypeIDList == "") ? "" : ",") + ($("#slQuotationChargeBillTo" + currentRowID).val() == undefined || $("#slQuotationChargeBillTo" + currentRowID).val() == "" ? 0 : $("#slQuotationChargeBillTo" + currentRowID + " option:selected").attr('operationpartnertypeid'));
            pBillToList += ((pBillToList == "") ? "" : ",") + ($("#slQuotationChargeBillTo" + currentRowID).val() == undefined || $("#slQuotationChargeBillTo" + currentRowID).val() == "" ? 0 : $("#slQuotationChargeBillTo" + currentRowID).val());
            pSaleExchangeRateList += ((pSaleExchangeRateList == "") ? "" : ",") + ($("#txtTblModalQuotationChargeSaleExchangeRate" + currentRowID).val() == undefined || $("#txtTblModalQuotationChargeSaleExchangeRate" + currentRowID).val() == "" ? 0 : $("#txtTblModalQuotationChargeSaleExchangeRate" + currentRowID).val());
            pPackageTypeIDList += ((pPackageTypeIDList == "") ? "" : ",") + ($("#slTblModalQuotationChargePackageType" + currentRowID).val() == undefined || $("#slTblModalQuotationChargePackageType" + currentRowID).val() == "" ? 0 : $("#slTblModalQuotationChargePackageType" + currentRowID).val());
            pContainerTypeIDList += ((pContainerTypeIDList == "") ? "" : ",") + ($("#slTblModalQuotationChargeContainerType" + currentRowID).val() == undefined || $("#slTblModalQuotationChargeContainerType" + currentRowID).val() == "" ? 0 : $("#slTblModalQuotationChargeContainerType" + currentRowID).val());
        }
    }
    if (pSelectedIDsToUpdate != "") {
        FadePageCover(true);
        CallPOSTFunctionWithParameters("/api/QuotationCharges/UpdateList"
            , {
                pQuotationRouteID: $("#hQuotationRouteID").val()
                , pSelectedIDsToUpdate: pSelectedIDsToUpdate
                , pMeasurementIDList: pMeasurementIDList
                , pQuantityList: pQuantityList
                , pCostPriceList: pCostPriceList
                , pCostAmountList: pCostAmountList
                , pCostCurrencyList: pCostCurrencyList
                , pCostExchangeRateList: pCostExchangeRateList
                , pSalePriceList: pSalePriceList
                , pSaleAmountList: pSaleAmountList
                , pSaleCurrencyList: pSaleCurrencyList
                , pPOrCList: pPOrCList
                , pBillTo_OperationPartnerTypeIDList: pBillTo_OperationPartnerTypeIDList
                , pBillToList: pBillToList
                , pSaleExchangeRateList: pSaleExchangeRateList
                , pPackageTypeIDList: pPackageTypeIDList
                , pContainerTypeIDList: pContainerTypeIDList
            }
            , function (pData) {
                debugger;
                if (pData[0]) {
                    QuotationCharges_BindTableRows(JSON.parse(pData[1]));
                    jQuery("#SelectChargesModal").modal("hide");
                }
                else
                    swal("Sorry", "Connection failed, please try again later.");
                FadePageCover(false);
            }
            , null);
    }
}
function QuotationCharges_MultiRowEdit() {
    debugger;
    FadePageCover(true);
    $("#divSelectCharges").html(""); //to quickly empty

    $("#lblDirection_Quotation").html($("#lblDirection").text());
    $("#lblTransport_Quotation").html($("#lblTransport").text());
    $("#lblShipmentType_Quotation").html($("#lblShipmentType").text());
    $("#lblSalesman_Quotation").html($("#lblSalesman").text());
    $("#lblClient_Quotation").html($("#lblClient").text());
    $("#lblRouting_Quotation").html(": " + $("#slRoutingsPOL option:selected").text() + " > " + $("#slRoutingsPOD option:selected").text());
    $("#lblExpirationDate_Quotation").html(": " + $("#txtRoutingsExpirationDate").val());
    $("#h6ChargesHeader_Quotation").removeClass("hide");

    if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsLTL").prop("checked"))
        $("#lblShownOperationCode").html($("#lblPackageTypesInQuotationRouteFooter").html());
    else
        $("#lblShownOperationCode").html($("#lblContainerTypesInQuotationRouteFooter").html());
    var pStrFnName = "/api/QuotationCharges/LoadAll";
    var pDivName = "divSelectCharges";//div name to be filled
    var ptblModalName = "tblModalQuotationCharges";
    var pCheckboxNameAttr = "cbSelectQuotationCharges";
    var pWhereClause = "";
    pWhereClause += "                WHERE QuotationRouteID = " + $("#hQuotationRouteID").val() + " ";
    pWhereClause += " AND ( ChargeTypeCode LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR ChargeTypeName LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    //pWhereClause += "                ORDER BY ChargeTypeName ";

    FillQuotationChargesModalTableControls(pStrFnName, pWhereClause, pDivName, ptblModalName, pCheckboxNameAttr, false //pIsInsert
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); QuotationsEdit_SetPermissions(); FadePageCover(false); });

    $("#btn-SearchCharges").attr("onclick", "QuotationCharges_MultiRowEdit();");
    $("#btnSelectChargesApply").attr("onclick", "QuotationCharges_UpdateList(false);");
}
function QuotationCharges_Row_CalculateCharges(pRowID, pIsInsert) {
    var rowQuantity = $("#txtTblModalQuotationChargeCostQuantity" + pRowID).val();
    var rowCostPrice = $("#txtTblModalQuotationChargeCostPrice" + pRowID).val();
    var rowSalePrice = $("#txtTblModalQuotationChargeSalePrice" + pRowID).val();
    $("#txtTblModalQuotationChargeCostAmount" + pRowID).val(rowQuantity * rowCostPrice);
    $("#txtTblModalQuotationChargeSaleAmount" + pRowID).val(rowQuantity * rowSalePrice);
    //if (pIsInsert) //incase of insert check and uncheck the checkbox to in GetSelectedIDs incase of insert
    //    Payables_txtTblModalCostAmount_Changed(pRowID, pIsInsert);
}
function QuotationCharges_txtTblModalCurrency_Changed(pRowID, pIsInsert) {
    debugger;
    //if (pIsInsert) { //if not insert then all IDs will be updated
    $("#txtTblModalQuotationChargeCostExchangeRate" + pRowID).val($("#slQuotationChargeCostCurrency" + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slQuotationChargeCostCurrency" + pRowID).val() || pDefaults.UnEditableCompanyName == "MED")
        $("#txtTblModalQuotationChargeCostExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalQuotationChargeCostExchangeRate" + pRowID).removeAttr("disabled");

    $("#txtTblModalQuotationChargeSaleExchangeRate" + pRowID).val($("#slQuotationChargeSaleCurrency" + pRowID + " option:selected").attr("MasterDataExchangeRate"));
    if ($("#hDefaultCurrencyID").val() == $("#slQuotationChargeSaleCurrency" + pRowID).val() || pDefaults.UnEditableCompanyName=="MED")
        $("#txtTblModalQuotationChargeSaleExchangeRate" + pRowID).attr("disabled", "disabled");
    else
        $("#txtTblModalQuotationChargeSaleExchangeRate" + pRowID).removeAttr("disabled");
    //}
}
function QuotationCharges_PartnerTypeChanged(pPartnerTypeID, pPartnerID,pSupplierSiteID) {
    debugger;
    $("#slChargeSupplier").html("<option value=''>Select Supplier</option>");//to quickly empty
    if (pPartnerTypeID == 0)
        pPartnerTypeID = ($("#slChargeOperationPartnerTypes").val() == ""
                            ? pPartnerTypeID
                            : $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID"));
    if (pPartnerTypeID != 0) {
        if (pPartnerTypeID == constCustomerPartnerTypeID) {
            $("#slChargeSupplier").html($("#hReadySlCustomers").html());
        }
        else {
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/PartnersStatements/FillPartners", { pPartnerTypeID: pPartnerTypeID }
                , function (pData) {
                    FillListFromObject(pPartnerID, 2/*pCodeOrName*/, TranslateString("SelectFromMenu"), "slChargeSupplier", pData[0], null);
                    FadePageCover(false);
                }
                ,
                //null
                function(){
                    FillSupplierSites(pSupplierSiteID, 'slChargeOperationPartnerTypes', 'slChargeSupplier', 'slChargSites');
                }
               
                );
        }
    }
}
/****************************************EOF MultiEdit Fns***************************************/
/****************************************PricingCharges Fns***************************************/
function PricingCharges_BindTableRows(pPricing, pPricingCharge, pPricingTypeName) {
    debugger;
    //var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Copy") + "</span>";
    //var NotificationControlsText = " class='btn btn-xs btn-rounded btn-lightblue float-right' > <i class='fa fa-bell' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Notif." + "</span>";
    //$("#hl-menu-PricingModule").parent().siblings().removeClass("active");
    //$("#hl-menu-PricingModule").parent().addClass("active");
    ClearAllTableRows("tblPricing" + pPricingTypeName);
    $("#tblPricing" + pPricingTypeName + " thead tr").html("");
    $(".classShowFor" + pPricingTypeName).removeClass("hide");
    //$("#tblPricing" + pPricingTypeName + " thead tr").append('<th id="HeaderDeletePricingID"><input id="cbPricingDeleteHeader"' + pPricingTypeName + ' type="checkbox" /></th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th id="HeaderDeletePricingID"' + pPricingTypeName + '></th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th class="hide">Trans.</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>Supplier</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>POLCountry</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>POL</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>PODCountry</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>POD</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>Equip</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>Commodity</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>TT</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>Freq</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th class="">ValidFrom</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>ValidTo</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>Cur</th>');
    for (var i = 1 ; i <= $("#slPricingSettings" + pPricingTypeName + " option").length; i++) {
        $("#tblPricing" + pPricingTypeName + " thead tr").append('<th>' + $("#slPricingSettings" + pPricingTypeName + " :nth-child(" + i + ")").text() + '</th>');
    }
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th class="hide">Save</th>');
    $("#tblPricing" + pPricingTypeName + " thead tr").append('<th class="rounded-right hide"></th>');
    //maxPricingIDInTable = 0;
    $.each(pPricing, function (i, item) {
        //maxPricingIDInTable = (item.ID > maxPricingIDInTable ? item.ID : maxPricingIDInTable);
        var tr = "";
        //tr += "<tr ID='" + item.ID + "' ondblclick='Pricing_EditByDblClick(" + item.ID + ");' >";
        tr += "<tr ID='" + item.ID + "' style='font-size:110%;' " + (item.IsPricingRequest ? "class='text-primary'" : "") + ">";
        tr += "     <td class='IsInsert hide'> <input type='checkbox' id='IsInsert" + item.ID + "' /></td>";
        tr += "     <td class='PricingID'> <input name='namePricingSelect' type='checkbox' value='" + item.ID + "' /></td>";
        //tr += '     <td class="PricingTypeID " val=' + item.PricingTypeID + '><select id="slPricingType' + item.ID + '" class="controlStyle" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + item.ID + "','slSupplier" + item.ID + "'," + 0 + ');" data-required="false"></select></td>';
        tr += '     <td class="PricingTypeID hide" val=' + item.PricingTypeID + '><p id="cellPricingType' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'PricingType' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PricingTypeID == 0 ? "N/A" : item.PricingTypeCode) + '</p><select id="slPricingType' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_PricingTypeChanged(' + "'" + "slPricingType" + item.ID + "','slSupplier" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.PricingTypeID == 0 ? "" : item.PricingTypeID) + "></option>" + '</select></td>';
        tr += "     <td class='SupplierID' val='" + item.SupplierID + "'><p id='cellSupplier" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Supplier" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.SupplierID == 0 ? "N/A" : item.SupplierName) + "</p><select hide id='slSupplier" + item.ID + "' style='width:150px;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.SupplierID == 0 ? "" : item.SupplierID) + "></option>" + "</select></td>";
        tr += '     <td class="POLCountryID" val=' + item.POLCountryID + '><p id="cellPOLCountry' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POLCountry' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.POLCountryID == 0 ? "N/A" : item.POLCountryName) + '</p><select id="slPOLCountry' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPOLCountry" + item.ID + "','slPOL" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.POLCountryID == 0 ? "" : item.POLCountryID) + "></option>" + '</select></td>';
        tr += '     <td class="POLID" val=' + item.POLID + '><p id="cellPOL' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POL' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.POLID == 0 ? "N/A" : item.POLName) + '</p><select id="slPOL' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false">' + "<option value=" + (item.POLID == 0 ? "" : item.POLID) + "></option>" + '</select></td>';
        tr += '     <td class="PODCountryID" val=' + item.PODCountryID + '><p id="cellPODCountry' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'PODCountry' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PODCountryID == 0 ? "N/A" : item.PODCountryName) + '</p><select id="slPODCountry' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id); Pricing_FillPorts(' + "'" + "slPODCountry" + item.ID + "','slPOD" + item.ID + "'," + 0 + ');" data-required="false">' + "<option value=" + (item.PODCountryID == 0 ? "" : item.PODCountryID) + "></option>" + '</select></td>';
        tr += '     <td class="PODID" val=' + item.PODID + '><p id="cellPOD' + item.ID + '" ondblclick="Pricing_EnterEditModeForSL(' + "'" + 'POD' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (item.PODID == 0 ? "N/A" : item.PODName) + '</p><select id="slPOD' + item.ID + '" style="width:150px;" class="controlStyle hide" onfocus="DisableBackspaceKey(id);" onkeydown="DisableBackspaceKey(id);" onkeypress="DisableBackspaceKey(id);" onchange="Pricing_SetIsRowChanged(id);" data-required="false">' + "<option value=" + (item.PODID == 0 ? "" : item.PODID) + "></option>" + '</select></td>';
        tr += "     <td class='EquipmentID' val='" + item.EquipmentID + "'><p id='cellEquipment" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Equipment" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.EquipmentID == 0 ? "N/A" : item.ContainerTypeCode) + "</p><select hide id='slEquipment" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.EquipmentID == 0 ? "" : item.EquipmentID) + "></option>" + "</select></td>";
        tr += "     <td class='CommodityID' val='" + item.CommodityID + "'><p id='cellCommodity" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Commodity" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CommodityID == 0 ? "N/A" : item.CommodityName) + "</p><select hide id='slCommodity" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.CommodityID == 0 ? "" : item.CommodityID) + "></option>" + "</select></td>";
        tr += "     <td class='TransitTime'><p id='cellTransitTime" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "TransitTime" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.TransitTime) + "</p><input type='text' style='width:30px;' id='txtTransitTime" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.TransitTime + "' /> </td>";
        tr += "     <td class='Frequency'><p id='cellFrequency" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "Frequency" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.Frequency) + "</p><input type='text' style='width:30px;' id='txtFrequency" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.Frequency + "' /> </td>";
        tr += "     <td class='FrequencyNotes hide'><p id='cellFrequencyNotes" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "FrequencyNotes" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.FrequencyNotes == 0 ? " " : item.FrequencyNotes) + "</p><input type='text' style='width:30px;' id='txtFrequencyNotes" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.FrequencyNotes + "' /> </td>";
        tr += '     <td class="ValidFrom"><p id="cellValidFrom' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ValidFrom' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ValidFrom))) + '</p><input id="txtValidFrom' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ValidFrom)) + '" /></td>';
        tr += '     <td class="ValidTo"><p id="cellValidTo' + item.ID + '" ondblclick="Pricing_EnterEditModeForTxt(' + "'" + 'ValidTo' + "'," + item.ID + ',' + item.IsPricingRequest + ');">' + (ConvertDateFormat(GetDateWithFormatMDY(item.ValidTo))) + '</p><input id="txtValidTo' + item.ID + '" style="width:85px;height:100%;" readonly="readonly" type="text" onfocus="DisableEnterKey(id);" onkeypress="DisableEnterKey(id);" onchange="Pricing_SetIsRowChanged(id);" style="background-color:white; cursor:text;" class="input-sm datepicker-input form-control hide" data-date-format="dd/mm/yyyy" placeholder="Select Date" value="' + ConvertDateFormat(GetDateWithFormatMDY(item.ValidTo)) + '" /></td>';
        tr += "     <td class='CurrencyID' val='" + item.CurrencyID + "'><p id='cellCurrency" + item.ID + "' ondblclick='Pricing_EnterEditModeForSL(" + '"' + "Currency" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.CurrencyID == 0 ? "N/A" : item.CurrencyCode) + "</p><select hide id='slCurrency" + item.ID + "' style='width:auto;' class='controlStyle hide' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false'>" + "<option value=" + (item.CurrencyID == 0 ? "" : item.CurrencyID) + "></option>" + "</select></td>";

        for (var i = 1 ; i <= $("#slPricingSettings" + pPricingTypeName + " option").length; i++) {
            var pChargeTypeName = $("#slPricingSettings" + pPricingTypeName + " :nth-child(" + i + ")").text();
            var pChargeTypeID = $("#slPricingSettings" + pPricingTypeName + " :nth-child(" + i + ")").val();
            var pPricingChargeID = pPricingCharge.find(x => x.PricingID == item.ID && x.ChargeTypeID == pChargeTypeID) == undefined ? 0 : pPricingCharge.find(x => x.PricingID === item.ID && x.ChargeTypeID == pChargeTypeID).ID;
            var pCostPrice = pPricingCharge.find(x => x.PricingID == item.ID && x.ChargeTypeID == pChargeTypeID) == undefined ? 0 : pPricingCharge.find(x => x.PricingID === item.ID && x.ChargeTypeID == pChargeTypeID).CostPrice;
            //var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/\s/g, "").replace(/\//g, '').replace(/\\/g, '').replace(/&/g, '').replace(/%/g, '').replace(/\$/g, '').replace(/\(/g, '').replace(/\)/g, ''); //remove spaces,slashes,backslashes
            var pChargeTypeNameWithOnlyCharsAndNos = pChargeTypeName.replace(/[^\w]/g, '');
            tr += "     <td class='" + pChargeTypeNameWithOnlyCharsAndNos + "'><p id='cell" + pChargeTypeNameWithOnlyCharsAndNos + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + pChargeTypeNameWithOnlyCharsAndNos + '",' + item.ID + ");'>" + pCostPrice + "</p><input type='text' style='width:60px;' id='txt" + pChargeTypeNameWithOnlyCharsAndNos + item.ID + "' PricingChargeID=" + pPricingChargeID + " class='form-control controlStyle hide' data-type='number' onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + pCostPrice.toFixed(4) + "' /> </td>";
        }

        tr += "     <td class='Notes hide'><p id='cellNotes" + item.ID + "' ondblclick='Pricing_EnterEditModeForTxt(" + '"' + "Notes" + '",' + item.ID + "," + item.IsPricingRequest + ");'>" + (item.Notes == 0 ? " " : item.Notes) + "</p><input type='text' style='width:30px;' id='txtNotes" + item.ID + "' class='form-control controlStyle hide' data-type='number'  onkeypress='CheckValueIsInteger(id);' onfocus='CheckValueIsInteger(id);' onchange='Pricing_SetIsRowChanged(id);' data-required='false' value='" + item.Notes + "' /> </td>";
        tr += "     <td class='SelectedIDsToUpdate hide'> <input name='SelectedIDsToUpdate' id='SelectedIDsToUpdate" + item.ID + "' type='checkbox' value='" + item.ID + "' /></td>";
        tr += "     <td class='hide'>"
                        //+ (glbCallingControl == "PricingForm"
                        //    ? ("<a href='#' onclick='Pricing_CopyRow(" + item.ID + ");' " + copyControlsText + "</a>")
                        //    : ""
                        //  )
                        //+ ("<a href='#' onclick='Pricing_Notify(" + item.ID + ");' " + NotificationControlsText + "</a>")

                        ////+ "<a href='#'" + " onclick='Routings_UpdateOperationFromQuotation(" + item.ID + ");' " + createOperationControlsText + "</a>"
                  + "</td>";
        tr += "</tr>";
        AppendRowtoTable("tblPricing" + pPricingTypeName, tr
                    ////+ "<td class='hide'><a onclick='Rates_Logs_LoadWithPaging(" + item.ID + ");' " + LogsControlsText + "</a></td>"
                    ////+ ($("#hIsOperationDisabled").val() == false
                    ////    ? "<td class=''><a onclick='Rates_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                    ////    : "<td></td>")
                    ////+ "<td class=''><a onclick='Rates_Print(" + item.ID + ",3);' " + printControlsText + "</a></td>"
                    );
    });

    $.each(pPricing, function (i, item) {
        debugger;
        $("#slPricingType" + item.ID).html($("#slPricingType").html());
        $("#slPricingType" + item.ID).val(item.PricingTypeID == 0 ? "" : item.PricingTypeID);

        //$("#slSupplier" + item.ID).html($("#slSupplier").html());
        //$("#slSupplier" + item.ID).val(item.SupplierID == 0 ? "" : item.SupplierID);
        //$("#slSupplier" + item.ID).html("<option value=" + item.SupplierID + "></option>");

        //$("#slPOLCountry" + item.ID).html($("#slPOLCountry").html());
        //$("#slPOLCountry" + item.ID).val(item.POLCountryID == 0 ? "" : item.POLCountryID);
        //$("#slPODCountry" + item.ID).html($("#slPODCountry").html());
        //$("#slPODCountry" + item.ID).val(item.PODCountryID == 0 ? "" : item.PODCountryID);
        //$("#slEquipment" + item.ID).html($("#slEquipment").html());
        //$("#slEquipment" + item.ID).val(item.EquipmentID == 0 ? "" : item.EquipmentID);
        //$("#slCommodity" + item.ID).html($("#slCommodity").html());
        //$("#slCommodity" + item.ID).val(item.CommodityID == 0 ? "" : item.CommodityID);
        $("#slCurrency" + item.ID).html($("#hReadySlCurrencies").html()); //to get the exchangerate
        $("#slCurrency" + item.ID).val(item.CurrencyID == 0 ? "" : item.CurrencyID);
        //Pricing_PricingTypeChanged("slPricingType" + item.ID, "slSupplier" + item.ID, item.SupplierID);
        //Pricing_FillPorts("slPOLCountry" + item.ID, "slPOL" + item.ID, item.POLID);
        //Pricing_FillPorts("slPODCountry" + item.ID, "slPOD" + item.ID, item.PODID);

    });
    SetDatepickerFormat();
    //ApplyPermissions();
    //BindAllCheckboxonTable("tblPricing", "PricingID", "cbPricingDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    //CheckAllCheckbox("HeaderDeletePricingID");
    //HighlightText("#tblPricing>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PricingCharges_FillPricingChargesModal() {
    debugger;
    if ($("#cbIsOcean").prop("checked"))
        $("#slPricingType").val(constPricingOcean);
    else if ($("#cbIsAir").prop("checked"))
        $("#slPricingType").val(constPricingAir);
    else if ($("#cbIsInland").prop("checked"))
        $("#slPricingType").val(constPricingInland);
    $("#tblPricingOCEAN thead tr").html("");
    $("#tblPricingOCEAN tbody tr").html("");
    $("#tblPricingAIR thead tr").html("");
    $("#tblPricingAIR tbody tr").html("");
    $("#tblPricingINLAND thead tr").html("");
    $("#tblPricingINLAND tbody tr").html("");
    $("#tblPricingCUSTOMSCLEARANCE thead tr").html("");
    $("#tblPricingCUSTOMSCLEARANCE tbody tr").html("");

    $(".classShowForOCEAN").addClass("hide");
    $(".classShowForAir").addClass("hide");
    $(".classShowForInland").addClass("hide");
    $(".classShowForCustomsClearance").addClass("hide");

    if ($("#hQuotationRouteID").val() == "")
        swal("Sorry", "Please, save the route first.");
    else {
        ClearAllTableRows("tblPricing");
        $("#txtProfitAmount").val("");
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/QuotationCharges/FillPricingChargesModal"
            , { pPricingTypeID: $("#slPricingType").val(), pMoveTypeID: $("#slMoveTypes").val() == "" ? 0 : $("#slMoveTypes").val() }
            , function (pData) {
                var pContainerTypes = pData[0];
                var pTruckers = pData[1];
                var pPricingSettings = pData[2];
                var pMoveTypeID = pData[3] == null ? null : JSON.parse(pData[3]);

                var _PricingSettings = JSON.parse(pPricingSettings);
                var pPricingSettingsOcean = jQuery.grep(_PricingSettings, function (_PricingSettings) {
                    return _PricingSettings.PricingTypeID == constPricingOcean;
                });
                var pPricingSettingsAir = jQuery.grep(_PricingSettings, function (_PricingSettings) {
                    return _PricingSettings.PricingTypeID == constPricingAir;
                });
                var pPricingSettingsInland = jQuery.grep(_PricingSettings, function (_PricingSettings) {
                    return _PricingSettings.PricingTypeID == constPricingInland;
                });
                var pPricingSettingsCustomsClearance = jQuery.grep(_PricingSettings, function (_PricingSettings) {
                    return _PricingSettings.PricingTypeID == constPricingCustomsClearance;
                });

                if (pMoveTypeID != null) {
                    $("#cbIsServiceOcean").prop("checked", pMoveTypeID.IsOcean);
                    $("#cbIsServiceAir").prop("checked", pMoveTypeID.IsAir);
                    $("#cbIsServiceInland").prop("checked", pMoveTypeID.IsInland);
                    $("#cbIsServiceCustomsClearance").prop("checked", pMoveTypeID.IsCustomsClearance);
                }
                FillListFromObject(null, 1, "<--Select-->"/*"Select Container Type"*/, "slPricingEquipment", pContainerTypes, null);
                FillListFromObject(null, 2, "<--Select-->"/*"Select Container Type"*/, "slPricingSupplier", pTruckers, null);
                FillListFromObject(null, 10, null, "slPricingSettingsOCEAN", JSON.stringify(pPricingSettingsOcean), null);
                FillListFromObject(null, 10, null, "slPricingSettingsAIR", JSON.stringify(pPricingSettingsAir), null);
                FillListFromObject(null, 10, null, "slPricingSettingsINLAND", JSON.stringify(pPricingSettingsInland), null);
                FillListFromObject(null, 10, null, "slPricingSettingsCUSTOMSCLEARANCE", JSON.stringify(pPricingSettingsCustomsClearance), null);

                $("#slPricingPOLCountry").html($("#slRoutingsPOLCountries").html());
                $("#slPricingPOLCountry").val($("#slRoutingsPOLCountries").val());
                $("#slPricingPOL").html($("#slRoutingsPOL").html());

                $("#slPricingPODCountry").html($("#slRoutingsPODCountries").html());
                $("#slPricingPODCountry").val($("#slRoutingsPODCountries").val()); // to fix value
                $("#slPricingPOD").html($("#slRoutingsPOD").html());

                $("#slPricingCommodity").html($("#slCommodities").html());
                $("#slPricingCommodity").val($("#slCommodities").val()); // to fix value

                jQuery("#SelectPricingChargesModal").modal("show");
                $("#btnSelectPricingChargesApply").attr("onclick", "PricingCharges_AddSelectedCharges();");

                PricingCharges_LoadingWithPaging();
                //FadePageCover(false);
            }
            , null);

    }
}
function PricingCharges_LoadingWithPaging() {
    debugger;
    strBindTableRowsFunctionName = "PricingCharges_BindTableRows";
    var pWhereClause = PricingCharges_GetWhereClause();
    var pOrderBy = "SupplierName, ID DESC"; //"PricingTypeID, SupplierName, POLName, PODName";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsReturnObjectArray: false, pPricingTypeID: $("#slPricingType").val(), pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/QuotationCharges/Pricing_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned", pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            var pPricing = pData[0];
            var pPricingCharge = pData[1];

            var _Pricing = JSON.parse(pPricing);
            var pPricingOcean = jQuery.grep(_Pricing, function (_Pricing) {
                return _Pricing.PricingTypeID == constPricingOcean;
            });
            var pPricingAir = jQuery.grep(_Pricing, function (_Pricing) {
                return _Pricing.PricingTypeID == constPricingAir;
            });
            var pPricingInland = jQuery.grep(_Pricing, function (_Pricing) {
                return _Pricing.PricingTypeID == constPricingInland;
            });
            var pPricingCustomsClearance = jQuery.grep(_Pricing, function (_Pricing) {
                return _Pricing.PricingTypeID == constPricingCustomsClearance;
            });

            ClearAllTableRows("tblPricing" + "OCEAN");
            ClearAllTableRows("tblPricing" + "AIR");
            ClearAllTableRows("tblPricing" + "INLAND");
            ClearAllTableRows("tblPricing" + "CUSTOMSCLEARANCE");
            if (pPricingOcean.length > 0)
                PricingCharges_BindTableRows(pPricingOcean, JSON.parse(pPricingCharge), "OCEAN"); //called in LoadDataWithPaging() if paging
            if (pPricingAir.length > 0)
                PricingCharges_BindTableRows(pPricingAir, JSON.parse(pPricingCharge), "AIR"); //called in LoadDataWithPaging() if paging
            if (pPricingInland.length > 0)
                PricingCharges_BindTableRows(pPricingInland, JSON.parse(pPricingCharge), "INLAND"); //called in LoadDataWithPaging() if paging
            if (pPricingCustomsClearance.length > 0)
                PricingCharges_BindTableRows(pPricingCustomsClearance, JSON.parse(pPricingCharge), "CUSTOMSCLEARANCE"); //called in LoadDataWithPaging() if paging
        });
    //HighlightText("#tblPricing>tbody>tr", $("#txt-PricingSearch").val().trim());
}
function PricingCharges_GetWhereClause() {
    debugger;
    var pWhereClause = " WHERE 1=1 \n";
    pWhereClause += " AND ValidFrom<=GETDATE() AND ValidTo>=GETDATE() \n";
    if ($("#txt-PricingSearch").val().trim() != "") {
        pWhereClause += " AND (";
        pWhereClause += " SupplierName like N'%" + $("#txt-PricingSearch").val().trim() + "%' ";
        pWhereClause += " OR POLName like N'%" + $("#txt-PricingSearch").val().trim() + "%' ";
        pWhereClause += " OR PODName like N'%" + $("#txt-PricingSearch").val().trim() + "%' ";
        pWhereClause += ")" + " \n";
    }
    if ($("#cbIsImport").prop("checked") && $("#slConsignees").val() != "")
        pWhereClause += " AND (CustomerID IS NULL OR CustomerID=" + $("#slConsignees").val() + ")" + "\n";
    if (($("#cbIsExport").prop("checked") || $("#cbIsDomestic").prop("checked")) && $("#slShippers").val() != "")
        pWhereClause += " AND (CustomerID IS NULL OR CustomerID=" + $("#slShippers").val() + ")" + "\n";

    if (pDefaults.IsDepartmentOption && pDefaults.UnEditableCompanyName != "GBL") {
        pWhereClause += " AND PricingTypeID IN (0";
        if ($("#cbIsServiceOcean").prop("checked"))
            pWhereClause += "," + constPricingOcean;
        if ($("#cbIsServiceAir").prop("checked"))
            pWhereClause += "," + constPricingAir;
        if ($("#cbIsServiceInland").prop("checked"))
            pWhereClause += "," + constPricingInland;
        if ($("#cbIsServiceCustomsClearance").prop("checked"))
            pWhereClause += "," + constPricingCustomsClearance;
        pWhereClause += ")" + "\n";
    }
    else if ($("#slPricingType").val() != "" && $("#slPricingType").val() != 0) {
        pWhereClause += " AND PricingTypeID = N'" + $("#slPricingType").val() + "' " + " \n";
    }

    if ($("#slPricingSupplier").val() != "") {
        pWhereClause += $("#slPricingType").val() == constPricingOcean ? (" AND ShippingLineID = N'" + $("#slPricingSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingAir ? (" AND AirlineID = N'" + $("#slPricingSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingInland ? (" AND TruckerID = N'" + $("#slPricingSupplier").val() + "' ") : "";
        pWhereClause += $("#slPricingType").val() == constPricingCustomsClearance ? (" AND CCAID = N'" + $("#slPricingSupplier").val() + "' ") : "";
    }
    if ($("#slPricingPOLCountry").val() != "") {
        pWhereClause += " AND POLCountryID = N'" + $("#slPricingPOLCountry").val() + "' " + " \n";
    }
    if ($("#slPricingPODCountry").val() != "") {
        pWhereClause += " AND PODCountryID = N'" + $("#slPricingPODCountry").val() + "' " + " \n";
    }
    if ($("#slPricingPOL").val() != "") {
        pWhereClause += " AND POLID = N'" + $("#slPricingPOL").val() + "' " + " \n";
    }
    if ($("#slPricingPOD").val() != "") {
        pWhereClause += " AND PODID = N'" + $("#slPricingPOD").val() + "' " + " \n";
    }
    if ($("#slPricingEquipment").val() != "") {
        pWhereClause += " AND EquipmentID = N'" + $("#slPricingEquipment").val() + "' " + " \n";
    }
    if ($("#slPricingCommodity").val() != "") {
        pWhereClause += " AND CommodityID = N'" + $("#slPricingCommodity").val() + "' " + " \n";
    }
    return pWhereClause;
}
function Pricing_FillPorts(pCountryControlID, pPortControlID, pPortID) {
    debugger;
    if ($("#" + pCountryControlID).val() != "") {
        FadePageCover(true);
        GetListWithCodeAndNameAndWhereClause(pPortID, "/api/Ports/LoadAll", "<--Select-->", pPortControlID, " WHERE CountryID=" + $("#" + pCountryControlID).val(), function () { FadePageCover(false); });
    }
    else
        $("#" + pPortControlID).html("<option value=''><--Select--></option>");
}
function Pricing_PricingTypeChanged(pPricingTypeControlID, pSupplierControlID, pSupplierID) {
    debugger;
    var pFunctionName = "";
    var pWhereClause = "WHERE 1=1 ORDER BY Name";
    var pFirstRow = "<--Select-->";
    $("#tblPricingOCEAN thead tr").html("");
    $("#tblPricingOCEAN tbody tr").html("");
    $("#tblPricingAIR thead tr").html("");
    $("#tblPricingAIR tbody tr").html("");
    $("#tblPricingINLAND thead tr").html("");
    $("#tblPricingINLAND tbody tr").html("");
    $("#tblPricingCUSTOMSCLEARANCE thead tr").html("");
    $("#tblPricingCUSTOMSCLEARANCE tbody tr").html("");

    $(".classShowForOCEAN").addClass("hide");
    $(".classShowForAIR").addClass("hide");
    $(".classShowForINLAND").addClass("hide");
    $(".classShowForCUSTOMSCLEARANCE").addClass("hide");

    if ($("#" + pPricingTypeControlID).val() == "" || $("#" + pPricingTypeControlID).val() == 0)
        $("#" + pSupplierControlID).html("<option value=''>" + pFirstRow + "</option>");
    else {
        if ($("#" + pPricingTypeControlID).val() == constPricingOcean) {
            pFunctionName = "/api/ShippingLines/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingAir) {
            pFunctionName = "/api/Airlines/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingInland) {
            pFunctionName = "/api/Truckers/LoadAll";
        }
        else if ($("#" + pPricingTypeControlID).val() == constPricingCustomsClearance) {
            pFunctionName = "/api/CustomsClearanceAgents/LoadAll";
        }
        FadePageCover(true);
        //CallGETFunctionWithParameters("/api/Pricing/PricingSettings_LoadAll"
        //    , { pWhereClause: "WHERE PricingTypeID=" + $("#" + pPricingTypeControlID).val() }
        //    , function (pData) {
        //        FillListFromObject(null, 10, null, "slPricingSettings", pData[0], null);
        //    }
        //    , null)
        GetListWithNameAndWhereClause(pSupplierID, pFunctionName, pFirstRow, pSupplierControlID, pWhereClause, function () { FadePageCover(false); });
    }
}
function PricingCharges_AddSelectedCharges() {
    debugger;
    var pSelectedPricingIDs = GetAllSelectedIDsAsStringWithNameAttr("namePricingSelect"); //GetAllSelectedIDsAsString('tblPricing');
    if (pSelectedPricingIDs != "") {
        FadePageCover(true);
        var pParametersWithValues = {
            pQuotationRouteID: $("#hQuotationRouteID").val() == "" ? 0 : $("#hQuotationRouteID").val()
            , pSelectedPricingIDs: pSelectedPricingIDs
            , pProfitType: $("input[name=cbProfitType]:checked").val()
            , pProfitAmount: $("#txtProfitAmount").val().trim() == "" ? 0 : $("#txtProfitAmount").val().trim()
        }
        CallGETFunctionWithParameters("/api/QuotationCharges/AddSelectedPricingCharges"
            , pParametersWithValues
            , function (pData) {
                debugger;
                QuotationCharges_BindTableRows(JSON.parse(pData[0]));
                jQuery("#SelectPricingChargesModal").modal("hide");
                swal("Success", "Saved successfully.");
                FadePageCover(false);
            }
            , null);
    }
}
function Pricing_NewRow() {
    debugger;
}
function Pricing_EnterEditModeForSL(pControlID, pRowID, pIsPricingRequest) {
    debugger;
}
function Pricing_EnterEditModeForTxt(pControlID, pRowID, pIsPricingRequest) {
    debugger;
}
function PricingCharges_GetAvailableUsers() {
    debugger;
    $("#CheckboxesListModal #txtSearchItems").val('');
    Receptionists_GetAvailableUsers();
    $("#btnCheckboxesListApply").attr("onclick", "PricingCharges_SendRequest();");
    $("#btnCheckboxesListApply").html("<span class='glyphicon glyphicon-send'></span> Send");
    $("#btn-SearchItems").attr("onclick", "Receptionists_GetAvailableUsers();");
}
function PricingCharges_SendRequest() {
    debugger;
    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pAlarmReceiversIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);
    if (pAlarmReceiversIDs == "" && pDefaults.UnEditableCompanyName != "GBL") //if GBL send to all department members
        swal("Sorry", "You did not select any receivers.");
    else { //if no receivers are selected then send to default operations department
        FadePageCover(true);
        var pSubject = "Charges Request For Quot. " + $("#hQuotationCode").val();
        var pBody = "Quotation Code : " + $("#hQuotationCode").val() + "\n";
        pBody += "Client " + $("#lblClient").text() + "\n";
        pBody += "Service : " + $("#slMoveTypes option:selected").text() + "\n";
        pBody += "From : " + $("#slRoutingsPOLCountries option:selected").text() + " - " + $("#slRoutingsPOL option:selected").text() + "\n";
        pBody += "To : " + $("#slRoutingsPODCountries option:selected").text() + " - " + $("#slRoutingsPOD option:selected").text() + "\n";
        pBody += "Commodity : " + $("#slCommodities option:selected").text() + "\n";

        var pParametersWithValues = {
            pAlarmReceiversIDs: (pAlarmReceiversIDs == "" ? 0 : pAlarmReceiversIDs)
            , pSubject: pSubject
            , pBody: pBody
            , pQuotationRouteID: $("#hQuotationRouteID").val()
            ,pActionID:1
            ,pActionName:'RequestCharge'
        };
        CallGETFunctionWithParameters("/api/Quotations/SendPersonalAlarmWithMinimalData", pParametersWithValues
            , function (pData) {
                let pReturnedMessage = pData[0];
                let pMailMessageReturned = pData[1];
                if (pReturnedMessage != "")
                    swal("Sorry", pReturnedMessage);
                //else if (pMailMessageReturned != "")
                //    swal("Alarm sent, but email is not sent", pMailMessageReturned);
                else
                    swal("Success", "Sent successfully.");

                FadePageCover(false);
            }
            , null);
    }
}
/****************************************EOF PricingCharges Fns***************************************/

/****************************************SupplierPayable Fns***************************************/
//function OperationPartnerTypes_GetList(pID, callback) { //the first parameter is used in case of editing to set the code or name to its original value
//    var pWhereClause = "";
//    //pWhereClause = " WHERE ID NOT IN (SELECT OP.OperationPartnerTypeID From OperationPartners OP ";
//    //pWhereClause += " 					WHERE OP.OperationID = " + $('#hOperationID').val() + ")";
//    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too
//    //pWhereClause += " ORDER BY ViewOrder ";

//    ////only 1 shipper, 1 consignee, 1 agent BUT any no of other partners
//    //pWhereClause = " WHERE ID NOT IN (" + constShipperOperationPartnerTypeID + "," + constConsigneeOperationPartnerTypeID + "," + constAgentOperationPartnerTypeID + ")";
//    //pWhereClause += (pID != null && pID != undefined ? " OR ID = " + pID : ""); //this is fill so i need to retreive the edited type too

//    pWhereClause = " WHERE ID NOT IN (" + constExporterOperationPartnerTypeID + "," + constBookingPartyOperationPartnerTypeID + "," + constOwnerOperationPartnerTypeID + "," + const
OperationPartnerTypeID + "," + constNotify2OperationPartnerTypeID + "," + constImporterOperationPartnerTypeID + ")";
//    pWhereClause += " ORDER BY ViewOrder ";

//    GetListWithOperationPartnerTypesCodeAndWhereClauseAndPartnerTypeAttr(pID, "/api/NoAccessOperationPartnerTypes/LoadAll", "Select Partner Type", "slChargeOperationPartnerTypes", pWhereClause
//        , function () { //this callback inside the callback is to fill the slPartnerContacts
//            if (callback != null && callback != undefined)
//                callback();
//        });
//}
//function ChargeSupplier_GetList(pPartnerID) {
//    debugger;
//    if ($("#slChargeSupplier").val() == null) {
//        CallGETFunctionWithParameters("/api/AccPartners/LoadAll"
//            , { pWhereClause: " WHERE 1=1 ORDER BY PartnerTypeID, Name " }
//            , function (pData) {
//                FillListFromObject(null, 5/*pCodeOrName*/, "Select Supplier", "slChargeSupplier", pData[0]
//                    , function () {
//                        $("#slChargeSupplier").val("");
//                        $("#slChargeSupplier option").removeClass("hide");
//                        if ($("#slChargeOperationPartnerTypes").val() != "") //handle show all partners
//                            $("#slChargeSupplier option[PartnerTypeID!=" + $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID") + "][value!=''" + "]").addClass("hide");
//                        else
//                            $("#slChargeSupplier option[value!=''" + "]").addClass("hide");
//                        if (pPartnerID != null && pPartnerID != undefined && pPartnerID != 0 && $("#slChargeOperationPartnerTypes").val() != "")
//                            $("#slChargeSupplier").prop("selectedIndex", $("#slChargeSupplier option[PartnerTypeID=" + $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID") + "][value=" + pPartnerID + "]").index());
//                    }); /*function () { $("#slARFAirline").html($("#slARFSupplier").html()); $("#slARFAirline option[ServiceID!=" + constServiceAirlines + "][value!=''" + "]").addClass("hide"); }*/
//            }
//            , null);
//    }
//    else {
//        $("#slChargeSupplier").val("");
//        $("#slChargeSupplier option").removeClass("hide");
//        if ($("#slChargeOperationPartnerTypes").val() != "") //handle show all partners
//            $("#slChargeSupplier option[PartnerTypeID!=" + $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID") + "][value!=''" + "]").addClass("hide");
//        else
//            $("#slChargeSupplier option[value!=''" + "]").addClass("hide");
//        if (pPartnerID != null && pPartnerID != undefined && pPartnerID != 0 && $("#slChargeOperationPartnerTypes").val() != "")
//            $("#slChargeSupplier").prop("selectedIndex", $("#slChargeSupplier option[PartnerTypeID=" + $("#slChargeOperationPartnerTypes option:selected").attr("PartnerTypeID") + "][value=" + pPartnerID + "]").index());
//    }
//}

function ChargeCostCurrencyChanged() {
    debugger;
    let costCurr = $("#slChargeCostCurrency").val();
    $("#slChargeSaleCurrency").val(costCurr);
}