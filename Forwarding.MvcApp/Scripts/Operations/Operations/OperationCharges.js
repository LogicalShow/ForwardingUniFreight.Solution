function OperationCharges_BindTableRows(pOperationCharges) {
    ClearAllTableRows("tblOperationCharges");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pOperationCharges, function (i, item) {
        AppendRowtoTable("tblOperationCharges",
        ("<tr ID='" + item.ID + "' ondblclick='OperationCharges_EditByDblClick(" + item.ID + ");'>"
                    + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='Charge' val='" + item.ChargeTypeID + "'>" + item.ChargeTypeCode + " (" + item.ChargeTypeName + ")" + "</td>"
                    + "<td class='Measurement' val='" + item.MeasurementID + "'>" + (item.MeasurementID == 0 ? "" : item.MeasurementCode) + "</td>"
                    + "<td class='ContainerType hide' val='" + item.ContainerTypeID + "'>" + (item.ContainerTypeID == 0 ? "" : item.ContainerTypeCode) + "</td>"
                    + "<td class='PackageType hide' val='" + item.PackageTypeID + "'>" + (item.PackageTypeID == 0 ? "" : item.PackageTypeName) + "</td>"
                    + "<td class='Currency' val='" + item.CurrencyID + "'>" + (item.CurrencyID == 0 ? "" : item.CurrencyCode) + "</td>"
                    + "<td class='CostQuantity'>" + item.CostQuantity + "</td>"
                    + "<td class='CostPrice'>" + item.CostPrice + "</td>"
                    + "<td class='CostAmount'>" + item.CostAmount + "</td>"
                    + "<td class='SaleQuantity hide'>" + item.SaleQuantity + "</td>"
                    + "<td class='SalePrice'>" + item.SalePrice + "</td>"
                    + "<td class='SaleAmount'>" + item.SaleAmount + "</td>"
                    + "<td class='hide'><a href='#EditChargeModal' data-toggle='modal' onclick='OperationCharges_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>"));
    });
    //ApplyPermissions();
    BindAllCheckboxonTable("tblOperationCharges", "ID", "cb-CheckAll-OperationCharges");
    CheckAllCheckbox("HeaderDeleteOperationChargeID");
    HighlightText("#tblOperationCharges>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    OperationCharges_CalculateSummary();
}
function OperationCharges_EditByDblClick(pID) {
    jQuery("#EditChargeModal").modal("show");
    OperationCharges_FillControls(pID);
}
function OperationCharges_LoadWithPagingWithWhereClause() {
    LoadWithPagingWithWhereClause("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationCharges/LoadWithWhereClause", " where OperationID = " + $("#hOperationID").val(), 0, 1000, function (pTabelRows) { OperationCharges_BindTableRows(pTabelRows); });
}
function OperationCharges_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblOperationCharges') != "")
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
            DeleteListFunction("/api/OperationCharges/Delete"
                , { "pOperationChargesIDs": GetAllSelectedIDsAsString('tblOperationCharges') }
                , function () {
                    OperationCharges_LoadWithPagingWithWhereClause();
                });
        });
    //DeleteListFunction("/api/OperationCharges/Delete", { "pOperationChargesIDs": GetAllSelectedIDsAsString('tblOperationCharges') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function OperationCharges_ApplyDefaultOperationCharges() {
    swal({
        title: strAreYouSure,
        text: "The Default Charges For Operation '" + $("#hOperationCode").val() + "' Will Be Applied.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Apply!",
        closeOnConfirm: true
    },
    //callback function in case of success
    function () {
        var pWhereClause = " WHERE ";
        pWhereClause += " IsDefaultInOperations = 1 AND IsInactive = 0 ";
        pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
        pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
        pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
        debugger;
        CallGETFunctionWithParameters("/api/OperationCharges/ApplyDefaultOperationCharges"
            , { pOperationID: $("#hOperationID").val(), pWhereClause: pWhereClause }
            , function () {
                OperationCharges_LoadWithPagingWithWhereClause();
            });
    });
}
function OperationCharges_GetAvailableCharges() {
    var pStrFnName = "/api/ChargeTypes/LoadAll";
    var pDivName = "divSelectCharges";
    var pCheckboxNameAttr = "cbSelectCharges";
    var pWhereClause = "";
    pWhereClause += " WHERE IsInactive = 0 AND IsOperationChargeType=1 ";
    pWhereClause += ($("#cbIsOcean").prop('checked') == true ? " AND IsOcean = 1 " : "");
    pWhereClause += ($("#cbIsAir").prop('checked') == true ? " AND IsAir = 1 " : "");
    pWhereClause += ($("#cbIsInland").prop('checked') == true ? " AND IsInland = 1 " : "");
    pWhereClause += " AND ( Code LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%' OR Name LIKE N'%" + $("#txtSearchCharges").val().trim().toUpperCase() + "%') ";
    pWhereClause += " AND ID NOT IN (SELECT ChargeTypeID from OperationCharges ";
    pWhereClause += "                WHERE OperationID = " + $("#hOperationID").val() + ") ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () { HighlightText("#divSelectCharges", $("#txtSearchCharges").val().trim().toUpperCase()); }, 1/*pCodeOrName*/);
    $("#btn-SearchCharges").attr("onclick", "OperationCharges_GetAvailableCharges();");
    $("#btnSelectChargesApply").attr("onclick", "OperationCharges_Insert(true);");
}
//called when pressing Apply in SelectCharges Modal
function OperationCharges_Insert(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectCharges");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/OperationCharges/InsertList"
            , { "pOperationID": $("#hOperationID").val(), "pSelectedIDs": pSelectedIDs }
            , pSaveandAddNew
            , "SelectChargesModal" //pModalID
            , function () { OperationCharges_GetAvailableCharges(); }
            , function () {
                OperationCharges_LoadWithPagingWithWhereClause();
            });
}
function OperationCharges_Update(pSaveandAddNew) {
    debugger;
    if ($("#txtCostAmount").val() != "NaN" && $("#txtSaleAmount").val() != "NaN") //check that decimal doesn't contain 2 decimal pts
    {
        if (parseFloat($("#txtCostAmount").val()) > parseFloat($("#txtSaleAmount").val()))
            swal(strSorry, strCheckPrices, "warning");
        else
            InsertUpdateFunction("form", "/api/OperationCharges/Update", {
                pID: $("#hChargeID").val()
                //, pMeasurementID: $("#txtCalculationType").attr("MeasurementID")
                , pOperationID: $("#hOperationID").val()
                , pChargeTypeID: $("#txtChargeType").attr("ChargeTypeID")
                , pContainerTypeID: ((($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) && $('#slContainerOrPackage option:selected').val() != "")
                    ? $('#slContainerOrPackage option:selected').val()
                    : 0)
                , pPackageTypeID: ((($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) && $('#slContainerOrPackage option:selected').val() != "")
                    ? $('#slContainerOrPackage option:selected').val()
                    : 0)
                , pCurrencyID: ($('#slChargeCurrency option:selected').val() == "" ? 0 : $('#slChargeCurrency option:selected').val())
                , pCostQuantity: ($("#txtCostQuantity").val().trim() == "" ? 0 : $("#txtCostQuantity").val().trim())
                , pCostPrice: ($("#txtCostPrice").val().trim() == "" ? 0 : $("#txtCostPrice").val().trim())
                , pCostAmount: ($("#txtCostAmount").val().trim() == "" ? 0 : $("#txtCostAmount").val().trim())
                , pSaleQuantity: ($("#txtSaleQuantity").val().trim() == "" ? 0 : $("#txtSaleQuantity").val().trim())
                , pSalePrice: ($("#txtSalePrice").val().trim() == "" ? 0 : $("#txtSalePrice").val().trim())
                , pSaleAmount: ($("#txtSaleAmount").val().trim() == "" ? 0 : $("#txtSaleAmount").val().trim())
            }, pSaveandAddNew, "EditChargeModal", function () { OperationCharges_LoadWithPagingWithWhereClause(); });
    } else
        swal(strSorry, strCheckEntries, "warning");
}
function OperationCharges_FillControls(pID) {

    //OperationCharges_ClearAllControls();

    $("#hChargeID").val(pID);
    debugger;
    var tr = $("tr[ID='" + pID + "']");
    var pCurrencyID = $(tr).find("td.Currency").attr('val');
    var pContainerTypeID = $(tr).find("td.ContainerType").attr('val');
    var pPackageTypeID = $(tr).find("td.PackageType").attr('val');
    OperationChargeCurrency_GetList(pCurrencyID);

    $("#lblChargeShown").html(": " + $(tr).find("td.Charge").text());
    $("#txtChargeType").val($(tr).find("td.Charge").text());
    $("#txtChargeType").attr("ChargeTypeID", $(tr).find("td.Charge").attr("val"));
    $("#txtCalculationType").val($(tr).find("td.Measurement").text());
    $("#txtCostQuantity").val($(tr).find("td.CostQuantity").text());
    $("#txtCostPrice").val($(tr).find("td.CostPrice").text());
    $("#txtCostAmount").val($(tr).find("td.CostAmount").text());
    $("#txtSaleQuantity").val($(tr).find("td.SaleQuantity").text());
    $("#txtSalePrice").val($(tr).find("td.SalePrice").text());
    $("#txtSaleAmount").val($(tr).find("td.SaleAmount").text());

    if ($("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked')) {
        $("#lblContainerType").removeClass("hide");
        $("#lblPackageType").addClass("hide");
        var pWhereClause = "";
        //pWhereClause += " WHERE ID IN (SELECT ContainerTypeID FROM OperationContainersAndPackages ";
        //pWhereClause += " 			 Where OperationID = " + $("#hOperationID").val() + ")";
        pWhereClause += " Where OperationID = " + $("#hOperationID").val();
        debugger;
        var pControllerParameters = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "ContainerTypeCode" };
        GetListWithContainerTypeCodeAndQuantityAttr(pContainerTypeID, "/api/OperationContainersAndPackages/LoadWithWhereClause", "Select ContainerType", "slContainerOrPackage", pControllerParameters);
    }
    if ($("#cbIsLCL").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#lblContainerType").addClass("hide");
        $("#lblPackageType").removeClass("hide");
        var pWhereClause = "";
        //pWhereClause += " WHERE ID IN (SELECT PackageTypeID FROM OperationContainersAndPackages ";
        //pWhereClause += " 			 Where OperationID = " + $("#hOperationID").val() + ")";
        pWhereClause += " Where OperationID = " + $("#hOperationID").val();
        var pControllerParameters = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "PackageTypeName" };
        GetListWithPackageTypeNameAndQuantityAttr(pPackageTypeID, "/api/OperationContainersAndPackages/LoadWithWhereClause", "Select PackageType", "slContainerOrPackage", pControllerParameters);
    }
    $("#slContainerOrPackage").attr("onchange", "OperationCharges_PackageOrContainerTypeChanged();");
    $("#btnSaveCharge").attr("onclick", "OperationCharges_Update(false);");
}
function OperationCharges_ClearAllControls(callback) {
    ClearAll("#EditChargeModal");
    if (callback != null && callback != undefined)
        callback();
}
function OperationCharges_PackageOrContainerTypeChanged() {
    debugger;
    if ($("#slContainerOrPackage option:selected").val() != "") {
        $("#txtCostQuantity").val($("#slContainerOrPackage option:selected").attr("Quantity"));
        //todo: get the number of packages or containers from the packages tab
        CalculateChargesCost();
    }
}
function CalculateChargesCost() {
    debugger;
    $("#txtCostAmount").val($("#txtCostQuantity").val() * $("#txtCostPrice").val());
    $("#txtSaleAmount").val($("#txtCostQuantity").val() * $("#txtSalePrice").val());
}
function OperationCharges_CalculateSummary() {
    var decTotalCost = 0;
    var decTotalSale = 0;
    var decProfit = 0;
    $(".CostAmount").each(function () {
        var value = $(this).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalCost += parseFloat(value);
        }
    });
    $(".SaleAmount").each(function () {
        var value = $(this).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalSale += parseFloat(value);
        }
    });
    $("#lblTotalCost").html(": " + decTotalCost.toFixed(2).toString() + " USD");
    $("#lblTotalSale").html(": " + decTotalSale.toFixed(2).toString() + " USD");
    $("#lblProfit").html(": " + (decTotalSale - decTotalCost).toFixed(2).toString() + " USD");
}
function OperationChargeCurrency_GetList(pID) {
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListCurrencyWithCodeAndExchangeRateAttr(pID, "/api/Currencies/LoadAll", "Select Currency", "slChargeCurrency", " WHERE 1=1 ORDER BY Code ");
}
