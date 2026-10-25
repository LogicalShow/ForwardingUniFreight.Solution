function PricingSettings_BindTableRows(pTabelRows) {
    debugger;
    $("#hl-menu-PricingModule").parent().addClass("active");
    ClearAllTableRows("tblPricingSettings");
    $.each(pTabelRows, function (i, item) {
        AppendRowtoTable("tblPricingSettings",
        ("<tr ID='" + item.ID + "' ondblclick='PricingSettings_EditByDblClick(" + item.ID + "," + item.ChargeTypeID + ");'>"
                    + "<td class='PricingSettingsID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                    + "<td class='ChargeTypeID' val='" + item.ChargeTypeID + "'>" + (pDefaults.UnEditableCompanyName == "GBL" ? (item.ChargeTypeName + " (" + item.ChargeTypeCode + ")") : item.ChargeTypeName) + "</td>"
                    + "<td class='hide'><a href='#PricingSettingsModal' data-toggle='modal' onclick='PricingSettings_FillControls(" + item.ID + "," + item.ChargeTypeID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ApplyPermissions();
    BindAllCheckboxonTable("tblPricingSettings", "PricingSettingsID", "cbPricingSettingsDeleteHeader");//Parameters(pTableName, pCheckBoxColumnClassName, pCheckBoxHeaderID)
    CheckAllCheckbox("HeaderDeletePricingID");
    //HighlightText("#tblPricingSettings>tbody>tr", $("#txt-Search").val().trim());
    if (showDeleteFailMessage) { //sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    $("#hl-homepage").on("click", function () { LoadViews("hl-homepage"); });
}
function PricingSettings_LoadingWithPaging() {
    debugger;
    var pWhereClause = PricingSettings_GetWhereClause();
    var pOrderBy = "ChargeTypeName";
    var pPageNumber = 1;
    var pPageSize = $('#select-page-size').val();
    var pControllerParameters = { pIsReturnObjectArrayForPricingSettings: false, pPricingTypeID: intPricingType, pPageNumber: pPageNumber, pPageSize: pPageSize, pWhereClause: pWhereClause, pOrderBy: pOrderBy }
    LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", strLoadWithPagingFunctionName, pWhereClause, pOrderBy, pPageNumber, pPageSize, pControllerParameters
        , function (pData) {
            PricingSettings_BindTableRows(JSON.parse(pData[0]));
        });
    //HighlightText("#tblPricing>tbody>tr", $("#txt-Search").val().trim());
}
function PricingSettings_GetWhereClause() {
    debugger;
    var pWhereClause = "WHERE PricingTypeID=" + $("#slPricingType").val();
    return pWhereClause;
}
function PricingSettings_EditByDblClick(pID, pChargeTypeID) {
    debugger;
    jQuery("#PricingSettingsModal").modal("show");
    PricingSettings_FillControls(pID, pChargeTypeID);
}
function PricingSettings_ClearAllControls() {
    debugger;
    ClearAll("#PricingSettingsModal");
    $("#slChargeType").val("");
    //GetListWithNameAndWhereClause(null, "/api/ChargeTypes/LoadAll", "<--Select-->", "slChargeType", "WHERE 1=1", null);
}
function PricingSettings_FillControls(pID, pChargeTypeID) {
    debugger;
    $("#hID").val(pID);
    $("#slChargeType").val(pChargeTypeID);
    //GetListWithNameAndWhereClause(pChargeTypeID, "/api/ChargeTypes/LoadAll", "<--Select-->", "slChargeType", "WHERE 1=1", null);
}
function PricingSettings_Save(pSaveandAddNew) {
    if ($("#slChargeType").val() == "")
        swal("Sorry", "Please, select charge.");
    else {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Pricing/PricingSettings_Insert", {
            pID: $("#hID").val() == "" ? 0 : $("#hID").val()
            , pPricingTypeID: $("#slPricingType").val()
            , pChargeTypeID: $("#slChargeType").val()
            //LoadWithPaging parameters
            , pWhereClausePricingSettings: PricingSettings_GetWhereClause()
            , pPageSize: $("#select-page-size").val()
            , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
            , pOrderBy: "ChargeTypeName"
        }
        , function (pData) {
            if (pData[0]) {
                PricingSettings_BindTableRows(JSON.parse(pData[1]));
                //$("#spn-total-count").text(parseInt($("#spn-total-count").text()) + 1);
                //$("#spn-last-page-row").text(parseInt($("#spn-last-page-row").text()) + 1);
                if (pSaveandAddNew)
                    PricingSettings_ClearAllControls();
                else
                    jQuery("#PricingSettingsModal").modal("hide");
                swal("Success", "Saved successfully.");
            }
            else
                swal("Sorry", "This charge is already selected.");
            FadePageCover(false);
        });
    }
}
function PricingSettings_DeleteList() {
    debugger;
    if (GetAllSelectedIDsAsString('tblPricingSettings') != "")
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
            FadePageCover(true);
            CallGETFunctionWithParameters("/api/Pricing/PricingSettings_Delete"
                , {
                    pPricingSettingsIDsDeleted: GetAllSelectedIDsAsString('tblPricingSettings')
                    , pWhereClausePricingSettings: PricingSettings_GetWhereClause() //"WHERE IsDeleted=0"
                    , pPageSize: $("#select-page-size").val()
                    , pPageNumber: $("#div-Pager li.active a").text() == "" ? 1 : $("#div-Pager li.active a").text()
                    , pOrderBy: "ID DESC"
                }
                , function (pData) {
                    if (!pData[0])
                        swal("Sorry", strDeleteFailMessage);
                    else {
                        swal("Success", "Deleted successfully.");
                    }
                    PricingSettings_BindTableRows(JSON.parse(pData[1]));
                    FadePageCover(false);
                });
        });
}
