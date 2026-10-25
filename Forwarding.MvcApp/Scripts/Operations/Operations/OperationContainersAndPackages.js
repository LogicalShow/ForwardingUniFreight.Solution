//this file is for both Packages and containers depending wether FCL or LCL, .......

//to bind enter key when focus on $('#txtSearch') to $("#btnsearch").click();
$('#txtOperationContainerAndPackagesSearch').on('keypress', function (args) {
    if (args.keyCode == 13) {
        $("#btn-OperationsContainerAndPackagesSearch").click();
        return false;
    }
});

function OperationContainersAndPackages_SubmenuTabClicked() {
    debugger;
    //if ($("#tblOperationContainersAndPackages tbody tr").length == 0) {
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "NAJ") {
        $("#txtLoadingDateFromOCAP").parent().removeClass("hide");
        $("#txtLoadingDateFromOCAP").prev().text("Gate IN Date");
    }
    if (pDefaults.UnEditableCompanyName == "NIL") {
        $(".showForNIL").removeClass("hide");
        $(".hideForNIL").addClass("hide");
    }
    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadWithWhereClause",
        {
            pPageNumber: 1
            , pPageSize: 999999
            , pWhereClause: "WHERE OperationID=" + ($("#hOperationID").val() == "" ? 0 : $("#hOperationID").val())
            , pOrderBy: "ID"
        }
        , function (pData) { OperationContainersAndPackages_BindTableRows(JSON.parse(pData[0])); FadePageCover(false); }
        , null);
    //GetListWithOpCodeAndHouseNoAndClientEmailAttr(null, "/api/Operations/LoadWithParameters", null, "slTransferContainerToOperation"
    //    , { pPageNumber: 1, pPageSize: 99999, pWhereClause: "WHERE (Code IS NOT NULL OR MasterOperationID IS NOT NULL) AND ShipmentType IN (1,3,5) AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0)", pOrderBy: "ID DESC" }
    //    , null);
    CallGETFunctionWithParameters("/api/Operations/LoadOperationsToRestoreInvoices"
        , { pPageSize: 99999, pWhereClauseToGetOperationsToRestoreInvoices: "WHERE EffectiveOperationCode IS NOT NULL AND ShipmentType IN (1,3,5) AND BLType <> 2 AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0)", pOrderBy: "ID DESC" }
        , function (pData) {
            FillListFromObject(null, 13, "<--Select-->", "slTransferContainerToOperation", pData[0], null);
        }
        , null);
    //}
    //if ($("#cbIsFCL").prop('checked'))
    //    $('#btn-SendAlarm').removeClass('hide');
    //else
    //    $('#btn-SendAlarm').addClass('hide');

    PurchaseItems_GetList(null, "slPurchaseItems", null);

    if (IsMESCOCompany) {
        $('#txtContainerNumber').attr("data-required", "true");
    } else {
        ValidationgContainerNumber('txtContainerNumber');
    }

    if (['MR'].includes(pDefaults.UnEditableCompanyName)) {
        $('.ShipperSeal, .Factory').removeClass('hide');
        var customerTxt = TranslateString('Customer');
        $('th.ShipperSeal').text(customerTxt);
        $('div.ShipperSeal label').text(customerTxt);
        $('div.ShipperSeal input').attr('placeholder', customerTxt);
    }
}
function OperationContainersAndPackages_DownloadLog() {
    debugger;

}
function OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages) {
    debugger;

    $("#txtPackagesContainerOrRoadNumber").val("");
    ClearAllTableRows("tblOperationContainersAndPackages");
    var downloadControlsText = " class='btn btn-xs btn-rounded btn-primary float-right' > <i class='fa fa-cloud-download' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Download Log" + "</span>";
    var copyControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-copy' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + "Copy" + "</span>";
    ShowHidettblOperationContainersAndPackagesHeaders();

    var transferControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Transfer") + "</span>";
    $.each(pOperationContainersAndPackages, function (i, item) {
        AppendRowtoTable("tblOperationContainersAndPackages",
            ("<tr ID='" + item.ID + "' " + (OEPac && $("#hIsOperationDisabled").val() == false ? ("ondblclick='OperationContainersAndPackages_EditByDblClick(" + item.ID + ");'") : "") + ">"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + ($("#hBLType").val() == constMasterBLType && $("#hShipmentType").val() != constConsolidationShipmentType ? "<td class='OperationConatainersAndPackagesHouseOperationCode'>" + (item.HouseOperationCode == 0 ? "" : item.HouseOperationCode) + "</td>" : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Container' val='" + item.ContainerTypeID + "'>" + item.ContainerTypeCode + "</td>") : "")
                //+ ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerNumber'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>") : "")
                + "<td class='ContainerNumber " + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? "" : "hide ") + "'>" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "</td>"
                + "<td class='TankOrFlexiNumber " + (/*$("#cbIsFlexi").prop('checked') ||*/ $("#cbIsTank").prop('checked') ? "" : "hide ") + "'>" + (item.TankOrFlexiNumber == 0 ? "" : item.TankOrFlexiNumber) + "</td>"
                + "<td class='ReturnDepot hide'>" + (item.ReturnDepot == 0 ? "" : item.ReturnDepot) + "</td>"

                + "<td class='LoadingDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.LoadingDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.LoadingDate))) + "</td>"
                + "<td class='ReturnDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReturnDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.ReturnDate))) + "</td>"
                + "<td class='TankCertExpiryDate hide'>" + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.TankCertExpiryDate)) < 1 ? "" : ConvertDateFormat(GetDateWithFormatMDY(item.TankCertExpiryDate))) + "</td>"
                + "<td class='IsPeriodicTest hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsPeriodicTest == true ? "true' checked='checked'" : "'") + " /></td>"

                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='CarrierSeal'>" + (item.CarrierSeal == 0 ? "" : item.CarrierSeal) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ShipperSeal hide'>" + (item.ShipperSeal == 0 ? "" : item.ShipperSeal) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Factory hide'>" + (item.Factory == 0 ? "" : item.Factory) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='TareWeight'>" + (item.TareWeight == 0 ? "" : item.TareWeight) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerVolume'>" + (item.Volume == 0 ? "" : item.Volume) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerNetWeight'>" + (item.NetWeight == 0 ? "" : item.NetWeight) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerNetWeightTON'>" + (item.NetWeightTON == 0 ? "" : item.NetWeightTON) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerGrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='ContainerGrossWeightTON'>" + (item.GrossWeightTON == 0 ? "" : item.GrossWeightTON) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='VGM'>" + (item.VGM == 0 ? "" : item.VGM) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IsReefer hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsReefer == true ? "true' checked='checked'" : "'") + " /></td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IsNOR hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsNOR == true ? "true' checked='checked'" : "'") + " /></td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IsSentToWarehouse hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsSentToWarehouse == true ? "true' checked='checked'" : "'") + " /></td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IsLoaded hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsLoaded == true ? "true' checked='checked'" : "'") + " /></td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='MinTemp hide'>" + item.MinTemp + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Humidity hide'>" + item.Humidity + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='Ventilation hide'>" + item.Ventilation + "</td>") : "")

                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='PurchaseItemID hide' val='" + item.PurchaseItemID + "'>" + (item.PurchaseItemName == 0 ? "" : item.PurchaseItemName) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='PackageTypeOnContainer hide' val='" + item.PackageTypeIDOnContainer + "'>" + (item.PackageTypeNameOnContainer == 0 ? "" : item.PackageTypeNameOnContainer) + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='NumberOfPackagesOnContainer hide'>" + item.NumberOfPackagesOnContainer + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='LotNumber hide'>" + (item.LotNumber == 0 ? "" : item.LotNumber) + "</td>") : "")

                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='MaxTemp hide'>" + item.MaxTemp + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IsIMO hide'> <input type='checkbox' disabled='disabled' val='" + (item.IsIMO == true ? "true' checked='checked'" : "'") + " /></td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='IMOClass hide'>" + item.IMOClass + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='UNNumber hide'>" + item.UNNumber + "</td>") : "")
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='FlashPoint hide'>" + item.FlashPoint + "</td>") : "")
                //+ ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? ("<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>") : "")
                + "<td class='DescriptionOfGoods hide'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                + "<td class='OperatorID hide'>" + item.OperatorID + "</td>"
                + "<td class='StatusID hide'>" + item.StatusID + "</td>"
                + "<td class='WarehouseID hide' val='" + item.WarehouseID+"'>" + item.WarehouseID + "</td>"

                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Package' val='" + item.PackageTypeID + "'>" + (item.PackageTypeName == 0 ? "" : item.PackageTypeName) + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Quantity'>" + item.Quantity + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Length'>" + item.Length + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Width'>" + item.Width + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Height'>" + item.Height + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='Volume'>" + item.Volume + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='VolumetricWeight'>" + item.VolumetricWeight + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='NetWeight'>" + item.NetWeight + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='NetWeightTON'>" + item.NetWeightTON + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='GrossWeight'>" + item.GrossWeight + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='GrossWeightTON'>" + item.GrossWeightTON + "</td>") : "")
                + ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked') ? ("<td class='ChargeableWeight'>" + item.ChargeableWeight + "</td>") : "")
                + "<td class='CargoGrossWeight hide'>" + item.CargoGrossWeight + "</td>"
                + "<td class='CargoVolume hide'>" + item.CargoVolume + "</td>"
                + "<td class='PackagesCopy " + (((pDefaults.UnEditableCompanyName == 'BED' || pDefaults.UnEditableCompanyName == 'TRGL') && (OAPac && ODPac && $("#hIsOperationDisabled").val() == false)) ? "" : "hide") + "'><a href='#' data-toggle='modal' onclick='Packages_OpenCopyModal(" + item.ID + ");' " + copyControlsText + "</a></td>"   // Made to show modal to copy a packages to BED company shown only for BED company (AhmedElgabry)
                + `<td class='hide'><a href='/api/OperationContainersAndPackages/GetLog?pID=${item.ID}&pTableName=vwOperationContainersAndPackages' target='_blank' ${downloadControlsText} </a></td>`
                + ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                    //? ("<td class='hide'><a href='#EditContainerModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
                ? ("<td class='" + (OAPac && ODPac && (pDefaults.UnEditableCompanyName !='UNF') && $("#hIsOperationDisabled").val() == false ? "" : "hide") + "'><a href='#' data-toggle='modal' onclick='OperationContainersAndPackages_TransferContainerModal(" + item.ID + "," + item.OperationID + ");' " + transferControlsText + "</a></td></tr>")
                    : ("<td class='hide'><a href='#EditPackageModal' data-toggle='modal' onclick='OperationContainersAndPackages_FillControls(" + item.ID + ");' " + editControlsText + "</a></td></tr>")
                )));
        //fill the Container Number in case of LCL or LTL and RoadNumber in cas of Air
        if (item.ContainerNumber != 0)
            $("#txtPackagesContainerOrRoadNumber").val(item.ContainerNumber);
        ShowHidettblOperationContainersAndPackagesHeaders();

    });
    //ApplyPermissions();
    if (OAPac && $("#hIsOperationDisabled").val() == false) { $("#btn-SelectContainersAndPackages").removeClass("hide"); $(".classSetCargoProperties").removeClass("hide"); } else { $("#btn-SelectContainersAndPackages").addClass("hide"); $(".classSetCargoProperties").addClass("hide"); }
    if (ODPac && $("#hIsOperationDisabled").val() == false) $("#btn-DeleteContainerOrPackage").removeClass("hide"); else $("#btn-DeleteContainerOrPackage").addClass("hide");
    if (ODPac && $("#hIsOperationDisabled").val() == false) $("#btn-DownloadLogContainerOrPackage").removeClass("hide"); else $("#btn-DownloadLogContainerOrPackage").addClass("hide");
    if (OAPac && $("#hIsOperationDisabled").val() == false && ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked'))) {
        $("#btnAddFromExcel-OperationContainersAndPackages").removeClass("hide");
    }
    else {
        $("#btnAddFromExcel").addClass("hide");
    }
    //************************************************************************* */
    if (pDefaults.UnEditableCompanyName == "MED" && pLoggedUser.DepartmentID == 1 && pOperationHeader_Global.OperationStageID == 65) {
        $("#btn-SelectContainersAndPackages").addClass("hide");
        $("#btn-DeleteContainerOrPackage").addClass("hide");
        $(".classSetCargoProperties").addClass("hide");
        $("#btn-DownloadLogContainerOrPackage").addClass("hide");
        $("#btnAddFromExcel-OperationContainersAndPackages").addClass("hide");
        $("#btn-ApproveFreight").addClass("hide"); 
    }
    //**************************************************************************** */
    BindAllCheckboxonTable("tblOperationContainersAndPackages", "ID", "cb-CheckAll-OperationContainersAndPackages");
    CheckAllCheckbox("HeaderDeleteOperationContainersAndPackagesID");
    //show/hide $("#btn-RemovePackages")
    var NumberOfContainersOrPackagesTableRows = $('#tblOperationContainersAndPackages tr').length - 1;//document.getElementById("tblOperationContainersAndPackages").getElementsByTagName("tr").length - 1;
    //if (//(NumberOfContainersOrPackagesTableRows == 1 && $("#hShipmentType").val() == constConsolidationShipmentType) //i am sure its master coz consol.
    //    //||
    //    ($("#hBLType").val() == constMasterBLType && $("#hShipmentType").val() != constConsolidationShipmentType && NumberOfContainersOrPackagesTableRows > 0))
    //    $("#btn-RemovePackages").removeClass("hide");
    //else
    //    $("#btn-RemovePackages").addClass("hide");

    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) {
        $("#btn-SelectContainersAndPackages").attr("data-target", "#EditContainerModal");
        $("#btn-SelectContainersAndPackages").attr("onclick", "OperationContainersAndPackages_ClearAllControls();");
    }
    else { //either Air or LCL or LTL
        $("#btn-SelectContainersAndPackages").attr("data-target", "#SelectContainersAndPackagesModal");
        $("#btn-SelectContainersAndPackages").attr("onclick", "OperationContainersAndPackages_GetAvailableContainersAndPackages();");
        $("#txtPackagesContainerOrRoadNumber").removeClass("hide");
        if (OEPac && $("#hIsOperationDisabled").val() == false)
            $("#btn-SaveContainerOrRoadNumber").removeClass("hide");
        ////fill the Container Number in case of LCL or LTL and RoadNumber in cas of Air
        //if (NumberOfContainersOrPackagesTableRows > 0)
        //    $("#txtPackagesContainerOrRoadNumber").val($("#tblOperationContainersAndPackages tr:nth(1) td.ContainerNumber").text());
        if ($("#cbIsAir").prop("checked")) {
            $("#btn-SaveContainerOrRoadNumber").text("Set Road No.");
            $("#txtPackagesContainerOrRoadNumber").attr("placeholder", "Road No.");
        }
        else { //this means LCL or LTL
            $("#btn-SaveContainerOrRoadNumber").text("Set Cont. No.");
            $("#txtPackagesContainerOrRoadNumber").attr("placeholder", "Cont. No.");
        }
    }
    //if (OEPac && $("#hIsOperationDisabled").val() == false && $("#hBLType").val() == constMasterBLType && !$("#cbIsConsolidation").prop('checked'))
    //    $("#btn-RebuildPackages").removeClass("hide");
    //else
    //    $("#btn-RebuildPackages").addClass("hide");

    HighlightText("#tblOperationContainersAndPackages>tbody>tr", $("#txtOperationContainerAndPackagesSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage);
        showDeleteFailMessage = false;
    }
    OperationContainersAndPackages_CalculateSummary();
    if (pDefaults.UnEditableCompanyName == "GBL" && $("#cbIsInland").prop("checked") && OVRec) {
        $("#tblReceivables tbody").html(""); $("#tblPayables tbody").html(""); //to reload changed quantities in Receivables
    }

    if (['MR'].includes(pDefaults.UnEditableCompanyName)) {
        $('.ShipperSeal, .Factory').removeClass('hide');
    }
    if (pDefaults.UnEditableCompanyName == "BED") {
        $(".PackagesCopy").removeClass("hide");
    }

    HideOperationActions();
        if (pDefaults.UnEditableCompanyName == 'NAJ') {

        $('#TareWeightHeader').addClass("hide");
        $('#VolumeHeader').addClass("hide");
        $('#NetWeightHeader').addClass("hide");
        $('#NetWeightTONHeader').addClass("hide");
        $('#GrossWeightTONHeader').addClass("hide");
        $('#VGMHeader').addClass("hide");
        $('#TareWeightHeader').addClass("hide");
       
            $('td.TareWeight').addClass('hide');
            $('td.ContainerVolume').addClass('hide');
            $('td.ContainerNetWeight').addClass('hide');
            $('td.ContainerNetWeightTON').addClass('hide');
            $('td.ContainerGrossWeightTON').addClass('hide');
            $('td.VGM').addClass('hide');
            $('td.TareWeight').addClass('hide');




    }
}
function ShowHidettblOperationContainersAndPackagesHeaders() {
    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) { //Container headers
        $("#stepsContainers").removeClass("hide"); // in the wizard header
        $("#ContainerTypeHeader").removeClass("hide");
        $("#ContainerNumberHeader").removeClass("hide");
        $("#CarrierSealHeader").removeClass("hide");
        //$("#ShipperSealHeader").removeClass("hide");
        $("#TareWeightHeader").removeClass("hide");
        $("#VGMHeader").removeClass("hide");
        //$("#NetWeightHeader").removeClass("hide");
        $(".classTransferToOperation").removeClass("hide");

        $("#PackageTypeHeader").addClass("hide");
        $("#LengthHeader").addClass("hide");
        $("#WidthHeader").addClass("hide");
        $("#HeightHeader").addClass("hide");
        //$("#VolumeHeader").addClass("hide");
        //$("#GrossWeightHeader").addClass("hide");
        $("#VolumetricWeightHeader").addClass("hide");
        $("#ChargeableWeightHeader").addClass("hide");
        $("#QuantityHeader").addClass("hide");
    }
    if ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) { //Package headers
        $("#stepsPackages").removeClass("hide"); // in the wizard header
        $("#ContainerTypeHeader").addClass("hide");
        $("#ContainerNumberHeader").addClass("hide");
        $("#CarrierSealHeader").addClass("hide");
        //$("#ShipperSealHeader").addClass("hide");
        $("#TareWeightHeader").addClass("hide");
        //$("#NetWeightHeader").addClass("hide");
        $("#VGMHeader").addClass("hide");

        $("#PackageTypeHeader").removeClass("hide");
        $("#LengthHeader").removeClass("hide");
        $("#WidthHeader").removeClass("hide");
        $("#HeightHeader").removeClass("hide");
        $("#VolumeHeader").removeClass("hide");
        $("#GrossWeightHeader").removeClass("hide");
        $("#VolumetricWeightHeader").removeClass("hide");
        $("#ChargeableWeightHeader").removeClass("hide");
        $("#QuantityHeader").removeClass("hide");
    }
    if ($("#cbIsTank").prop('checked')) {
        $("#TankOrFlexiNumberHeader").removeClass("hide");
    }
    if ($("#hBLType").val() == constMasterBLType && $("#hShipmentType").val() != constConsolidationShipmentType) //if master then show house header for packages
        $("#OperationContainersAndPackagesHouseHeader").removeClass("hide");
    else
        $("#OperationContainersAndPackagesHouseHeader").addClass("hide");
}
function OperationContainersAndPackages_EditByDblClick(pID) {
    debugger;

    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
        jQuery("#EditContainerModal").modal("show");
    else
        jQuery("#EditPackageModal").modal("show");
    OperationContainersAndPackages_FillControls(pID);

    debugger;

    if (pDefaults.UnEditableCompanyName == 'NAJ') {

        $('#txtNumberOfContainers').parent().addClass("hide");
        $('#txtTareWeight').parent().addClass("hide");
        $('#txtContainerVolume').parent().addClass("hide");
        $('#txtContainerNetWeight').parent().addClass("hide");
        $('#txtContainerNetWeightTON').parent().addClass("hide");
        $('#txtContainerGrossWeightTON').parent().addClass("hide");
        $('#txtVGM').parent().addClass("hide");
        $('#cbIsReefer').parent().addClass("hide");
        $('#slPurchaseItems').parent().addClass("hide");
        $('#slWarehouse').parent().addClass("hide");
        $('#cbIsSentToWarehouse').parent().addClass("hide");
        $('#cbIsTankLoaded').parent().addClass("hide");
        $('#txtLotNumber').parent().addClass("hide");
        $('#cbIsNOR').parent().parent().addClass("hide");
        $('#txtMinTemp').parent().parent().addClass("hide");
        $('#txtMaxTemp').parent().parent().addClass("hide");
        $('#txtHumidity').parent().parent().addClass("hide");
        $('#txtVentilation').parent().parent().addClass("hide");
        $('#cbIsIMO').parent().parent().addClass("hide");
        $('#slPackageTypesOnContainer').parent().removeClass("m-t-xs");






    }
}
//function OperationContainersAndPackages_LoadWithPagingWithWhereClause() {
//    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationContainersAndPackages/LoadWithWhereClause", " where OperationID = " + $("#hOperationID").val(), "ContainerTypeCode, ContainerNumber, PackageTypeName", 1, 1000, function (pTabelRows) { OperationContainersAndPackages_BindTableRows(pTabelRows); });
//}
function OperationContainersAndPackages_DeleteList(callback) {
    //update first to save the ContainerNumber or RoadNumber incase the row containing it is deleted
    if ($("#cbIsAir").prop("checked") || $("#cbIsLCL").prop("checked") || $("#cbIsBulk").prop("checked") || $("#cbIsLTL").prop("checked"))
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/SaveContainerOrRoadNumber", {
            pOperationID: $("#hOperationID").val()
            , pContainerNumber: $("#txtPackagesContainerOrRoadNumber").val() == "" ? 0 : $("#txtPackagesContainerOrRoadNumber").val().trim().toUpperCase()
        }, null);
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblOperationContainersAndPackages') != "")
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
                DeleteListFunction("/api/OperationContainersAndPackages/Delete"
                    , { "pOperationContainersAndPackagesIDs": GetAllSelectedIDsAsString('tblOperationContainersAndPackages') }
                    , function () {
                        //OperationContainersAndPackages_LoadWithPagingWithWhereClause();
                        OperationContainersAndPackages_Search();
                    });
            });


    //DeleteListFunction("/api/OperationContainersAndPackages/Delete", { "pOperationContainersAndPackagesIDs": GetAllSelectedIDsAsString('tblOperationContainersAndPackages') }, function () { LoadViews("OperationsEdit", null, $("#hOperationID").val()); });
}
function OperationContainersAndPackages_GetAvailableContainersAndPackages(callback) {
    debugger;
    var pStrFnName = (($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked'))
        ? "/api/PackageTypes/LoadAll"
        : "/api/ContainerTypes/LoadAll");
    var pDivName = "divSelectContainersAndPackages";
    var pCheckboxNameAttr = "cbSelectContainersAndPackages";
    var pWhereClause = "";
    pWhereClause += " WHERE IsInactive = 0 ";
    //the next 3 lines are used just incase of LCL, LTL or Air with packages
    pWhereClause += ($("#cbIsLCL").prop('checked') ? " AND IsOcean = 1 " : "")
    pWhereClause += ($("#cbIsLTL").prop('checked') ? " AND IsInland = 1 " : "")
    pWhereClause += ($("#cbIsAir").prop('checked') ? " AND IsAir = 1 " : "")

    pWhereClause += " AND ( Code LIKE '%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%' OR Name LIKE '%" + $("#txtSearchContainersAndPackages").val().trim().toUpperCase() + "%') ";

    ////the next lines are to exclude the already selected types
    //pWhereClause += (($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked'))
    //    ? " AND ID NOT IN (SELECT PackageTypeID from OperationContainersAndPackages "
    //    : " AND ID NOT IN (SELECT ContainerTypeID from OperationContainersAndPackages ");
    //pWhereClause += "  WHERE OperationID = " + $("#hOperationID").val() + ") ";

    pWhereClause += " ORDER BY Code ";
    GetListAsCheckboxes(pStrFnName, pWhereClause, pDivName, pCheckboxNameAttr
        , function () { HighlightText("#divSelectContainersAndPackages", $("#txtSearchContainersAndPackages").val().trim().toUpperCase()); });
    $("#btn-SearchContainersAndPackages").attr("onclick", "OperationContainersAndPackages_GetAvailableContainersAndPackages();");
    $("#btnSelectContainersAndPackagesApply").attr("onclick", "OperationContainersAndPackages_InsertFromCheckList(true);");
}
//called when pressing Apply in SelectContainersAndPackages Modal
function OperationContainersAndPackages_InsertFromCheckList(pSaveandAddNew) {
    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("cbSelectContainersAndPackages");//returns string array of IDs
    debugger;
    if (pSelectedIDs != "")
        InsertSelectedCheckboxItems("/api/OperationContainersAndPackages/InsertList"
            , { "pOperationID": $("#hOperationID").val(), "pSelectedIDs": pSelectedIDs, "pShipmentType": ($('input[name=cbShipmentType]:checked').val() == undefined ? 0 : $('input[name=cbShipmentType]:checked').val()), "pTransportType": $('input[name=cbTransportType]:checked').val() } //ShipmentType : 1-FCL 2-LCL 3-FTL 4-LTL
            , pSaveandAddNew
            , "SelectContainersAndPackagesModal" //pModalID
            , function () { OperationContainersAndPackages_GetAvailableContainersAndPackages(); }
            , function () {
                OperationContainersAndPackages_Search();
            });
}
//insert Container
function OperationContainersAndPackages_Insert(pSaveandAddNew) {
    debugger;
    if ($("#cbIsTank").prop("checked") && $("#txtTankOrFlexiNumber").val().trim() != ""
        && !$("#txtTankOrFlexiNumber").val().includes("_") && !$("#txtTankOrFlexiNumber").val().includes("/"))
        swal("Sorry", "Tank number must contain either (_) or (/)");
    else if (OperationContainersAndPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/OperationContainersAndPackages/Insert", {
            pOperationID: $("#hOperationID").val()
            , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
            , pNumberOfContainers: $("#txtNumberOfContainers").val().trim() //pNumberOfContainers(txtNumberOfContainers) is not saved in DB, its just to decide how many containers to be inserted; between 1 and 50
            , pPackageTypeID: 0 //Not used when inserting packages //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
            , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            , pVolume: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
                : ($("#txtVolume").val() == "" ? 0 : $("#txtVolume").val()))
            , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            , pNetWeight: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
                : ($("#txtNetWeight").val() == "" ? 0 : $("#txtNetWeight").val()))
            , pNetWeightTON: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
                : ($("#txtNetWeightTON").val() == "" ? 0 : $("#txtNetWeightTON").val()))
            , pGrossWeight: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
                : ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val()))
            , pGrossWeightTON: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
                : ($("#txtGrossWeightTON").val() == "" ? 0 : $("#txtGrossWeightTON").val()))
            , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            //, pQuantity: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ($("#txtContainersQuantity").val() == "" ? 0 : $("#txtContainersQuantity").val()) : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))
            , pQuantity: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? 0 : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))

            , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
            , pTankOrFlexiNumber: ($("#txtTankOrFlexiNumber").val() == "" ? 0 : $("#txtTankOrFlexiNumber").val().trim().toUpperCase())
            , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
            , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
            , pFactory: ($("#txtFactory").val() == "" ? 0 : $("#txtFactory").val().trim().toUpperCase())
            , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
            , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

            , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
            , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
            , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
            , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
            , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
            , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
            , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

            , pPurchaseItemID: ($("#slPurchaseItems").val() == "" ? 0 : $("#slPurchaseItems").val())
            , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" ? 0 : $("#slPackageTypesOnContainer").val())
            , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

            , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
            , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
            , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
            , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())
            , pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())
            , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())

            , pPlacedOnOCPID: 0
            , pIsSentToWarehouse: $('#cbIsSentToWarehouse').prop('checked')
            , pIsPeriodicTest: $("#cbIsPeriodicTest").prop("checked")
            , pIsLoaded: false

            , pLoadingDate: $("#txtLoadingDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtLoadingDateFromOCAP").val().trim().toUpperCase()
            , pReturnDate: $("#txtReturnDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtReturnDateFromOCAP").val().trim().toUpperCase()
            , pTankCertExpiryDate: $("#txtTankCertExpiryDate").val().trim() == "" ? "01/01/1900" : $("#txtTankCertExpiryDate").val().trim().toUpperCase()
            , pWarehouseID: $('#slWarehouse').val() > 0 ? $('#slWarehouse').val() : 0
        }, pSaveandAddNew
            , ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? "EditContainerModal" : "EditPackageModal") //Modal name
            , function (pData) {
                debugger;

                if ($("#cbIsOcean").prop("checked") && $('#cbIsSentToWarehouse').prop('checked') && $("#cbIsMaster").prop("checked") && ($("#cbIsConsolidation").prop("checked") || $("#cbIsFCL").prop("checked"))) {
                    ChangeAllContainersWarehouses($('#slWarehouse').val(),0);
                }
                if (pData[4] == true && pDefaults.UnEditableCompanyName == "UNF") {
                    swal("Sorry", "Can't Repeat Container Number in The Same Operation ");

                } else {
                swal("Success", "Saved successfully.");

                }
              

                pOperationHeader_Global.ContainerTypes = JSON.parse(pData[3]).ContainerTypes;
                OperationContainersAndPackages_BindTableRows(JSON.parse(pData[2]));
                OperationContainersAndPackages_FillLabels(JSON.parse(pData[3]));
                if (pSaveandAddNew) {
                    OperationContainersAndPackages_ClearAllControls();
                }
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
                    , {
                        pPageNumber: 1
                        , pPageSize: 999999
                        , pWhereClauseForTank: "WHERE OperationID=" + $("#hOperationID").val() + ($("#cbIsTank").prop("checked") ? " AND TankOrFlexiNumber IS NOT NULL AND TankOrFlexiNumber<>'' " : " AND ContainerNumber IS NOT NULL AND ContainerNumber<>'' ")
                        , pOrderBy: "TankOrFlexiNumber"
                    }
                    , function (pData_Tank) {
                        var pTank = pData_Tank[0];
                        if ($("#cbIsTank").prop("checked"))
                            FillListFromObject(null, 1, "<--Select Tank-->", "slSearchTankInPayables", pTank
                                , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
                        else FillListFromObject(null, 11, "<--Select Container-->", "slSearchTankInPayables", pTank
                            , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
                    }
                    , null);
            });
}
function OperationContainersAndPackages_Update(pSaveandAddNew) {
    debugger;
    if ($("#cbIsTank").prop("checked") && $("#txtTankOrFlexiNumber").val().trim() != ""
        && !$("#txtTankOrFlexiNumber").val().includes("_") && !$("#txtTankOrFlexiNumber").val().includes("/"))
        swal("Sorry", "Tank number must contain either (_) or (/)");
    else if (OperationContainersAndPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/OperationContainersAndPackages/Update", {
            pID: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? $("#hContainerID").val() : $("#hPackageID").val())
            , pOperationID: $("#hOperationID").val()
            , pContainerTypeID: ($("#slContainerTypes option:selected").val() == undefined ? 0 : $("#slContainerTypes option:selected").val())
            , pPackageTypeID: ($("#slPackageTypes").val() == "" ? 0 : $("#slPackageTypes").val()) //($("#txtPackageType").attr("PackageTypeID") == undefined ? 0 : $("#txtPackageType").attr("PackageTypeID"))
            , pLength: ($("#txtLength").val() == "" ? 0 : $("#txtLength").val())
            , pWidth: ($("#txtWidth").val() == "" ? 0 : $("#txtWidth").val())
            , pHeight: ($("#txtHeight").val() == "" ? 0 : $("#txtHeight").val())
            , pVolume: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerVolume").val() == "" ? 0 : $("#txtContainerVolume").val())
                : ($("#txtVolume").val() == "" ? 0 : $("#txtVolume").val()))
            , pVolumetricWeight: ($("#txtVolumetricWeight").val() == "" ? 0 : $("#txtVolumetricWeight").val())
            , pNetWeight: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerNetWeight").val() == "" ? 0 : $("#txtContainerNetWeight").val())
                : ($("#txtNetWeight").val() == "" ? 0 : $("#txtNetWeight").val()))
            , pNetWeightTON: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerNetWeightTON").val() == "" ? 0 : $("#txtContainerNetWeightTON").val())
                : ($("#txtNetWeightTON").val() == "" ? 0 : $("#txtNetWeightTON").val()))
            , pGrossWeight: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerGrossWeight").val() == "" ? 0 : $("#txtContainerGrossWeight").val())
                : ($("#txtGrossWeight").val() == "" ? 0 : $("#txtGrossWeight").val()))
            , pGrossWeightTON: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#txtContainerGrossWeightTON").val() == "" ? 0 : $("#txtContainerGrossWeightTON").val())
                : ($("#txtGrossWeightTON").val() == "" ? 0 : $("#txtGrossWeightTON").val()))
            , pChargeableWeight: ($("#txtChargeableWeight").val() == "" ? 0 : $("#txtChargeableWeight").val())
            //, pQuantity: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') ? ($("#txtContainersQuantity").val() == "" ? 0 : $("#txtContainersQuantity").val()) : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))
            , pQuantity: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? 0 : ($("#txtPackagesQuantity").val() == "" ? 0 : $("#txtPackagesQuantity").val()))

            , pContainerNumber: ($("#txtContainerNumber").val() == "" ? 0 : $("#txtContainerNumber").val().trim().toUpperCase())
            , pCarrierSeal: ($("#txtCarrierSeal").val() == "" ? 0 : $("#txtCarrierSeal").val().trim().toUpperCase())
            , pShipperSeal: ($("#txtShipperSeal").val() == "" ? 0 : $("#txtShipperSeal").val().trim().toUpperCase())
            , pFactory: ($("#txtFactory").val() == "" ? 0 : $("#txtFactory").val().trim().toUpperCase())
            , pTareWeight: ($("#txtTareWeight").val() == "" ? 0 : $("#txtTareWeight").val())
            , pVGM: ($("#txtVGM").val() == "" ? 0 : $("#txtVGM").val())

            , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
            , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
            , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
            , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
            , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
            , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
            , pLotNumber: ($("#txtLotNumber").val().trim() == "" ? 0 : $("#txtLotNumber").val().trim().toUpperCase())

            , pPurchaseItemID: ($("#slPurchaseItems").val() == "" || $("#slPurchaseItems").val() == null ? 0 : $("#slPurchaseItems").val())
            , pPackageTypeIDOnContainer: ($("#slPackageTypesOnContainer").val() == "" || $("#slPackageTypesOnContainer").val() == null ? 0 : $("#slPackageTypesOnContainer").val())
            , pNumberOfPackagesOnContainer: ($("#txtNumberOfPackagesOnContainer").val() == "" ? 0 : $("#txtNumberOfPackagesOnContainer").val())

            , pIsIMO: ($("#cbIsIMO").prop("checked") ? true : false)
            , pIMOClass: ($("#txtIMOClass").val() == "" ? 0 : $("#txtIMOClass").val())
            , pUNNumber: ($("#txtUNNumber").val() == "" ? 0 : $("#txtUNNumber").val())
            , pFlashPoint: ($("#txtFlashPoint").val() == "" ? 0 : $("#txtFlashPoint").val())

            //, pDescriptionOfGoods: ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim())
            , pDescriptionOfGoods: ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')
                ? ($("#divContainerGoodsDescription").val().trim() == "" ? 0 : $("#divContainerGoodsDescription").val().trim().toUpperCase())
                : ($("#txtPackageDescriptionOfGoods").val().trim() == "" ? 0 : $("#txtPackageDescriptionOfGoods").val().trim().toUpperCase()))
            , pOperatorID: $("#slOperator").val() == "" ? 0 : $("#slOperator").val()
            , pStatusID: $("#slStatusIDFromOCAP").val() == "" ? 0 : $("#slStatusIDFromOCAP").val()
            , pTankOrFlexiNumber: $("#txtTankOrFlexiNumber").val().trim() == "" ? 0 : $("#txtTankOrFlexiNumber").val().trim().toUpperCase()
            , pReturnDepot: $("#txtReturnDepot").val().trim() == "" ? 0 : $("#txtReturnDepot").val().trim().toUpperCase()
            , pIsSentToWarehouse: $("#cbIsSentToWarehouse").prop("checked")
            , pIsPeriodicTest: $("#cbIsPeriodicTest").prop("checked")
            , pIsLoaded: $("#cbIsTankLoaded").prop("checked")

            , pLoadingDate: $("#txtLoadingDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtLoadingDateFromOCAP").val().trim().toUpperCase()
            , pReturnDate: $("#txtReturnDateFromOCAP").val().trim() == "" ? "01/01/1900" : $("#txtReturnDateFromOCAP").val().trim().toUpperCase()
            , pTankCertExpiryDate: $("#txtTankCertExpiryDate").val().trim() == "" ? "01/01/1900" : $("#txtTankCertExpiryDate").val().trim().toUpperCase()
            , pWarehouseID: $('#slWarehouse').val() > 0 ? $('#slWarehouse').val() : 0
        }, pSaveandAddNew
            , ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked') ? "EditContainerModal" : "EditPackageModal") //Modal name
            , function (pData) {
                var pMessageReturned = pData[4];
                var pPayables = JSON.parse(pData[5]);
                var pReceivables = JSON.parse(pData[6]);
                var pOperationPartners = JSON.parse(pData[7]);
                var pIsrepeated = pData[8];
                if (pMessageReturned == "") {
                    swal("Success", "Saved successfully.");
                    if ($("#cbIsOcean").prop("checked") && $('#cbIsSentToWarehouse').prop('checked') && $("#cbIsMaster").prop("checked") && ($("#cbIsConsolidation").prop("checked") || $("#cbIsFCL").prop("checked"))) {
                        ChangeAllContainersWarehouses($('#slWarehouse').val(), $("#hContainerID").val());
                    }
                }
                else
                    swal("Sorry", pMessageReturned);
                if (pIsrepeated) {
                    FadePageCover(false);

                } else {
                OperationContainersAndPackages_BindTableRows(JSON.parse(pData[2]));
                OperationContainersAndPackages_FillLabels(JSON.parse(pData[3]));
                }
                if (pDefaults.UnEditableCompanyName == "GBL" && $("#cbIsInland").prop("checked") && OVRec) {
                    $("#tblReceivables tbody").html(""); $("#tblPayables tbody").html(""); //to reload changed quantities in Receivables
                }
                else {
                    Receivables_BindTableRows(pReceivables);
                    Payables_BindTableRows(pPayables);
                }
                OperationPartners_BindTableRows(pOperationPartners);
                if (pSaveandAddNew) {
                    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked'))
                        OperationContainersAndPackages_ClearAllControls();
                    else { //LCL
                        OperationContainersAndPackages_GetAvailableContainersAndPackages();
                        jQuery("#EditPackageModal").modal("hide");
                        jQuery("#SelectContainersAndPackagesModal").modal("show");
                    }
                }


                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadAllTanks"
                    , {
                        pPageNumber: 1
                        , pPageSize: 999999
                        , pWhereClauseForTank: "WHERE OperationID=" + $("#hOperationID").val() + ($("#cbIsTank").prop("checked") ? " AND TankOrFlexiNumber IS NOT NULL AND TankOrFlexiNumber<>'' " : " AND ContainerNumber IS NOT NULL AND ContainerNumber<>'' ")
                        , pOrderBy: "TankOrFlexiNumber"
                    }
                    , function (pData_Tank) {
                        var pTank = pData_Tank[0];
                        if ($("#cbIsTank").prop("checked"))
                            FillListFromObject(null, 1, "<--Select Tank-->", "slSearchTankInPayables", pTank
                                , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
                        else FillListFromObject(null, 11, "<--Select Container-->", "slSearchTankInPayables", pTank
                            , function () { $("#slSearchTankInReceivables").html($("#slSearchTankInPayables").html()); });
                    }
                    , null);

                FadePageCover(false);
            });
}
function OperationContainersAndPackages_Search() {
    debugger;
    var pSearchKey = $("#txtOperationContainerAndPackagesSearch").val().trim().toUpperCase();
    var pWhereClause = " WHERE OperationID = " + $("#hOperationID").val()
        + " AND  (ContainerTypeCode LIKE N'%" + pSearchKey + "%' "
        + " OR ContainerNumber LIKE N'%" + pSearchKey + "%' "
        + " OR PackageTypeName LIKE N'%" + pSearchKey + "%' "
        + " OR ShipperSeal LIKE N'%" + pSearchKey + "%' "
        + " OR Factory LIKE N'%" + pSearchKey + "%' "
        + " OR HouseOperationCode LIKE N'%" + pSearchKey + "%') "
    //var pParametersWithValues = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "ContainerTypeCode, ContainerNumber, PackageTypeName" };
    var pParametersWithValues = { pPageNumber: 1, pPageSize: 99999, pWhereClause: pWhereClause, pOrderBy: "ID", pOperationID: $("#hOperationID").val() };
    //LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/OperationContainersAndPackages/LoadWithWhereClause", pWhereClause, "ContainerTypeCode, ContainerNumber, PackageTypeName", 1, 1000, function (pTabelRows) { OperationContainersAndPackages_BindTableRows(pTabelRows); });
    FadePageCover(true);
    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Search"
        , pParametersWithValues
        , function (pData) {
            OperationContainersAndPackages_BindTableRows(JSON.parse(pData[0]));
            pOperationMasterOrDirect = JSON.parse(pData[2]);
            OperationContainersAndPackages_FillLabels(pOperationMasterOrDirect);
            pOperationHeader_Global.ContainerTypes = pOperationMasterOrDirect.ContainerTypes;
            FadePageCover(false);
        }, null);
}
function OperationContainersAndPackages_FillControls(pID) {
    debugger;
    if (pDefaults.UnEditableCompanyName == 'NAJ') {

        $('#txtNumberOfContainers').parent().addClass("hide");
        $('#txtTareWeight').parent().addClass("hide");
        $('#txtContainerVolume').parent().addClass("hide");
        $('#txtContainerNetWeight').parent().addClass("hide");
        $('#txtContainerNetWeightTON').parent().addClass("hide");
        $('#txtContainerGrossWeightTON').parent().addClass("hide");
        $('#txtVGM').parent().addClass("hide");
        $('#cbIsReefer').parent().addClass("hide");
        $('#slPurchaseItems').parent().addClass("hide");
        $('#slWarehouse').parent().addClass("hide");
        $('#cbIsSentToWarehouse').parent().addClass("hide");
        $('#cbIsTankLoaded').parent().addClass("hide");
        $('#txtLotNumber').parent().addClass("hide");
        $('#cbIsNOR').parent().parent().addClass("hide");
        $('#txtMinTemp').parent().parent().addClass("hide");
        $('#txtMaxTemp').parent().parent().addClass("hide");
        $('#txtHumidity').parent().parent().addClass("hide");
        $('#txtVentilation').parent().parent().addClass("hide");
        $('#cbIsIMO').parent().parent().addClass("hide");
        $('#slPackageTypesOnContainer').parent().removeClass("m-t-xs");






    }
    if ($("#cbIsOcean").prop("checked") && $("#cbIsMaster").prop("checked") && ($("#cbIsConsolidation").prop("checked") || $("#cbIsFCL").prop("checked"))) {
        let tr = $("#tblOperationContainersAndPackages tr[ID='" + pID + "']");
        let WarehouseID = $(tr).find("td.WarehouseID").attr('val');
        if (WarehouseID == 0) {
            $("#slWarehouse").prop("disabled", true);
            //$("#cbIsSentToWarehouse").prop("disabled", false);
            $("#cbIsSentToWarehouse").change(CbIsSentToWarehouseChanged);
        } else {
            $("#slWarehouse").prop("disabled", false);
            $("#cbIsSentToWarehouse").change(CbIsSentToWarehouseChanged);
        }
        CallGETFunctionWithParameters("api/OperationContainersAndPackages/CheckGateInStatus", { pOperationID: pOperationHeader_Global.ID, pDummy: false }, function (pData) {
            if (pData[0]) {
                $("#slWarehouse").prop("disabled", true);
                $("#cbIsSentToWarehouse").off("change");
                $("#cbIsSentToWarehouse").prop("disabled", true);
            } else {
                //$("#slWarehouse").prop("disabled", false);
                //$("#cbIsSentToWarehouse").prop("disabled", false);
            }
        }, null);
        
    }
    if (pDefaults.UnEditableCompanyName == "AGR") {
        CallGETFunctionWithParameters("/api/Packing/LoadPackingDetails", { pWhereClause: "where ST_PackingID in (select ID from ST_Packing where OperationID=" + pOperationHeader_Global.ID + ") AND ContainerID=" + pID }, function (pData) {
            if (JSON.parse(pData[0]).length > 0) {
                $("#txtContainerNumber").attr('disabled', 'disabled');
            } else {
                $("#txtContainerNumber").removeAttr('disabled');
            }
        }, null);
    }
    //$("#slWarehouse").attr("disabled", false);
    $("#btn-ApplyReeferPropertiesToAll").removeClass("hide");
    $("#divShipmentContainers").addClass("hide");
    var tr = $("#tblOperationContainersAndPackages tr[ID='" + pID + "']");
    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) {

        ClearAll("#EditContainerModal");
        $("#lblContainerShown").html(": " + $(tr).find("td.ContainerNumber").text());
        //$("#divContainerPackages").removeClass("hide");
        $("#btn-NewAddContainerPackage").removeAttr("disabled");

        var pContainerTypeID = $(tr).find("td.Container").attr('val');
        ContainerTypes_GetList(pContainerTypeID, null);
        var pWarehouseID = $(tr).find("td.WarehouseID").attr('val');
        if (pWarehouseID == 0) {
            $("#slWarehouse").prop("disabled", true);
            $("#cbIsSentToWarehouse").change(CbIsSentToWarehouseChanged);
        } else {
            $("#slWarehouse").prop("disabled", false);
            $("#cbIsSentToWarehouse").change(CbIsSentToWarehouseChanged);
        }
        Warehouse_GetList(pWarehouseID, null);
        var pPackageTypeIDOnContainer = $(tr).find("td.PackageTypeOnContainer").attr('val');
        PackageTypesOnContainer_GetList(pPackageTypeIDOnContainer, "slPackageTypesOnContainer", function () {
            $("#slPackageTypes").html($("#slPackageTypesOnContainer").html());
            $("#slPackageTypes").val("");
        });

        var pPurchaseItemID = $(tr).find("td.PurchaseItemID").attr('val');
        PurchaseItems_GetList(pPurchaseItemID, "slPurchaseItems", null);

        var pOperatorID = $(tr).find("td.OperatorID").text() == 0 ? "" : $(tr).find("td.OperatorID").text();
        if ($("#cbIsTank").prop("checked")) {
            //$("#slOperator").html($("#hReadySlCustomers").html());
            //$("#slOperator").val(pOperatorID);
            $(".classShowForTank").removeClass("hide");
            $("#slOperator").parent().removeClass("hide");
            CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
                , { pWhereClauseForCombo: "ORDER BY Name" }
                , function (pData) {
                    FillListFromObject(pOperatorID, 2, TranslateString("SelectFromMenu"), "slOperator", pData[0], null);
                }
                , null);
        }

        if ($("#cbIsTank").prop("checked") && $("#hDirectionType").val() == constImportDirectionType) {
            $(".classShowForTankImport").removeClass("hide");
        }
        if ($("#cbIsTank").prop("checked") && $("#hDirectionType").val() == constExportDirectionType) {
            $(".classShowForTankExport").removeClass("hide");
        }

        $("#txtTankOrFlexiNumber").val($(tr).find("td.TankOrFlexiNumber").text());
        $("#txtReturnDepot").val($(tr).find("td.ReturnDepot").text());
        $("#slStatusIDFromOCAP").val($(tr).find("td.StatusID").text() == 0 ? "" : $(tr).find("td.StatusID").text());

        $("#txtLoadingDateFromOCAP").val($(tr).find("td.LoadingDate").text());
        $("#txtReturnDateFromOCAP").val($(tr).find("td.ReturnDate").text());
        $("#txtTankCertExpiryDate").val($(tr).find("td.TankCertExpiryDate").text());

        $("#hContainerID").val(pID);
        $("#txtContainerNumber").val($(tr).find("td.ContainerNumber").text());
        $("#txtNumberOfContainers").attr("disabled", "disabled");
        $("#txtNumberOfContainers").val("N/A");
        $("#txtCarrierSeal").val($(tr).find("td.CarrierSeal").text());
        $("#txtShipperSeal").val($(tr).find("td.ShipperSeal").text());
        $("#txtFactory").val($(tr).find("td.Factory").text());
        $("#txtTareWeight").val($(tr).find("td.TareWeight").text());
        $("#txtVGM").val($(tr).find("td.VGM").text());
        $("#txtContainerNetWeight").val($(tr).find("td.ContainerNetWeight").text());
        $("#txtContainerNetWeightTON").val($(tr).find("td.ContainerNetWeightTON").text());
        $("#txtContainerVolume").val($(tr).find("td.ContainerVolume").text());
        $("#txtContainerGrossWeight").val($(tr).find("td.ContainerGrossWeight").text());
        $("#txtContainerGrossWeightTON").val($(tr).find("td.ContainerGrossWeightTON").text());
        $("#cbIsReefer").prop('checked', $(tr).find('td.IsReefer').find('input').attr('val'));
        $("#cbIsNOR").prop('checked', $(tr).find('td.IsNOR').find('input').attr('val'));
        $("#cbIsSentToWarehouse").prop('checked', $(tr).find('td.IsSentToWarehouse').find('input').attr('val'));
        $("#cbIsPeriodicTest").prop('checked', $(tr).find('td.IsPeriodicTest').find('input').attr('val'));
        $("#cbIsTankLoaded").prop('checked', $(tr).find('td.IsLoaded').find('input').attr('val'));

        $("#txtMinTemp").val($(tr).find("td.MinTemp").text());
        $("#txtMaxTemp").val($(tr).find("td.MaxTemp").text());
        $("#txtHumidity").val($(tr).find("td.Humidity").text());
        $("#txtVentilation").val($(tr).find("td.Ventilation").text());

        $("#txtLotNumber").val($(tr).find("td.LotNumber").text());
        $("#txtNumberOfPackagesOnContainer").val($(tr).find("td.NumberOfPackagesOnContainer").text());

        $("#cbIsIMO").prop('checked', $(tr).find('td.IsIMO').find('input').attr('val'));
        $("#txtIMOClass").val($(tr).find("td.IMOClass").text());
        $("#txtUNNumber").val($(tr).find("td.UNNumber").text());
        $("#txtFlashPoint").val($(tr).find("td.FlashPoint").text());
        $("#divContainerGoodsDescription").val($(tr).find("td.DescriptionOfGoods").text());
        EnableDisableReeferProprties();
        EnableDisableIMOProprties();
        //fill the ContainerPackages Table
        LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerPackages/LoadWithWhereClause"
            , " WHERE OperationContainersAndPackagesID = " + pID.toString(), " HouseOperationCode, PackageTypeName "
            , 1, 1000
            , function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
        $("#btn-NewAddContainerPackage").attr("onclick", "ContainerPackages_ClearAllControls(null," + $("#hOperationID").val() + ");");

        $("#btnSaveContainer").attr("onclick", "OperationContainersAndPackages_Update(false);");
        $("#btnSaveAndNewContainer").attr("onclick", "OperationContainersAndPackages_Update(true);");
    }
    else {

        ClearAll("#EditPackageModal");
        $("#lblPackageShown").html(": " + $(tr).find("td.Package").text());

        $("#txtNumberOfContainers").val("N/A");
        $("#hPackageID").val(pID);
        GetListWithNameAndWhereClause($(tr).find("td.Package").attr("val"), "/api/PackageTypes/LoadAll", TranslateString("SelectFromMenu"), "slPackageTypes", "WHERE 1=1", null);
        $("#txtLength").val($(tr).find("td.Length").text());
        $("#txtWidth").val($(tr).find("td.Width").text());
        $("#txtHeight").val($(tr).find("td.Height").text());
        $("#txtVolume").val($(tr).find("td.Volume").text());
        $("#txtNetWeight").val($(tr).find("td.NetWeight").text());
        $("#txtNetWeightTON").val($(tr).find("td.NetWeightTON").text());
        $("#txtGrossWeight").val($(tr).find("td.GrossWeight").text());
        $("#txtGrossWeightTON").val($(tr).find("td.GrossWeightTON").text());
        $("#txtChargeableWeight").val($(tr).find("td.ChargeableWeight").text());
        $("#txtVolumetricWeight").val($(tr).find("td.VolumetricWeight").text());
        $("#txtPackagesQuantity").val($(tr).find("td.Quantity").text());
        $("#txtPackageDescriptionOfGoods").val($(tr).find("td.DescriptionOfGoods").text());

        $("#btnSavePackage").attr("onclick", "OperationContainersAndPackages_Update(false);");
        $("#btnSaveAndNewPackage").attr("onclick", "OperationContainersAndPackages_Update(true);");
    }
    
    if (pDefaults.UnEditableCompanyName == "MES" && $('input[name=cbTransportType]:checked').val() == 1) {
        if ($('#txtCargoGrossWeight').val() > 0)
            $('#txtContainerGrossWeight').prop('disabled', true);
        else
            $('#txtContainerGrossWeight').prop('disabled', false);
        if ($('#txtCargoVolume').val() > 0)
            $('#txtContainerVolume').prop('disabled', true);
        else
            $('#txtContainerVolume').prop('disabled', false);
    }
}
function OperationContainersAndPackages_ClearAllControls(callback) {
    debugger;
        if (pDefaults.UnEditableCompanyName == 'NAJ')
        {

            $('#txtNumberOfContainers').parent().addClass("hide");
            $('#txtTareWeight').parent().addClass("hide");
            $('#txtContainerVolume').parent().addClass("hide");
            $('#txtContainerNetWeight').parent().addClass("hide");
            $('#txtContainerNetWeightTON').parent().addClass("hide");
            $('#txtContainerGrossWeightTON').parent().addClass("hide");
            $('#txtVGM').parent().addClass("hide");
            $('#cbIsReefer').parent().addClass("hide");
            $('#slPurchaseItems').parent().addClass("hide");
            $('#slWarehouse').parent().addClass("hide");
            $('#cbIsSentToWarehouse').parent().addClass("hide");
            $('#cbIsTankLoaded').parent().addClass("hide");
            $('#txtLotNumber').parent().addClass("hide");
            $('#cbIsNOR').parent().parent().addClass("hide");
            $('#txtMinTemp').parent().parent().addClass("hide");
            $('#txtMaxTemp').parent().parent().addClass("hide");
            $('#txtHumidity').parent().parent().addClass("hide");
            $('#txtVentilation').parent().parent().addClass("hide");
            $('#cbIsIMO').parent().parent().addClass("hide");
            $('#slPackageTypesOnContainer').parent().removeClass("m-t-xs");
           






        }
    $("#btn-ApplyReeferPropertiesToAll").removeClass("hide");
    $("#divShipmentContainers").addClass("hide");
    if ($("#cbIsMaster").prop("checked") && ($("#cbIsConsolidation").prop("checked") || $("#cbIsFCL").prop("checked"))) {
        $("#slWarehouse").prop("disabled", true);
        $("#cbIsSentToWarehouse").prop("disabled", false);
        $("#cbIsSentToWarehouse").change(CbIsSentToWarehouseChanged);

        CallGETFunctionWithParameters("api/OperationContainersAndPackages/CheckGateInStatus", { pOperationID: pOperationHeader_Global.ID, pDummy: false }, function (pData) {
            if (pData[0]) {
                if ($("#tblOperationContainersAndPackages tr td.WarehouseID[val!='0']").length > 0) {
                    let whID = $($("#tblOperationContainersAndPackages tr td.WarehouseID[val!='0']")[0]).attr('val');
                    $("#slWarehouse").prop("disabled", true);
                    GetListWithNameAndWhereClause(null, "/api/Warehouse/LoadWithWhereClause", "<--" + TranslateString("Select") + "-->", "slWarehouse", " Where id=" + whID, null);
                }
            } else {
                Warehouse_GetList(null, null);
                //$("#slWarehouse").prop("disabled", false);
                //$("#cbIsSentToWarehouse").prop("disabled", false);
            }
        }, null);
    } else {
        Warehouse_GetList(null, null);
    }

    if ($("#cbIsTank").prop("checked")) {
        //$(".classShowForTank").removeClass("hide");
        $("#slOperator").parent().addClass("hide"); //because not in Controller
        $(".classHideForFlexi").addClass("hide");
        $(".classDisableForFlexi").attr("disabled", "disabled");
        $("#spanFlexiLabel").text("Flexi");
        //CallGETFunctionWithParameters("/api/Agents/LoadAllForCombo"
        //    , { pWhereClauseForCombo: "ORDER BY Name" }
        //    , function (pData) {
        //        FillListFromObject(null, 2, TranslateString("SelectFromMenu"), "slOperator", pData[0], null);
        //    }
        //    , null);
    }
    else if ($("#cbIsFlexi").prop("checked")) {
        $(".classShowForTank").removeClass("hide");
        $("#spanFlexiLabel").text("Purchase.Inv");
    }

    if ($("#cbIsTank").prop("checked") && $("#hDirectionType").val() == constImportDirectionType) {
        $(".classShowForTankImport").removeClass("hide");
    }
    if ($("#cbIsTank").prop("checked") && $("#hDirectionType").val() == constExportDirectionType) {
        $(".classShowForTankExport").removeClass("hide");
    }

    if ($("#cbIsVehicle").prop('checked') || $("#cbIsFCL").prop('checked') || $("#cbIsFTL").prop('checked') || $("#cbIsConsolidation").prop('checked') || $("#cbIsFlexi").prop('checked') || $("#cbIsTank").prop('checked')) {
        ClearAll("#EditContainerModal");
        $("#txtNumberOfContainers").removeAttr("disabled");
        $("#txtNumberOfContainers").val("1");
        $("#tblContainerPackages > tbody").html(""); //Clear the ContainerPackages rows
        //$("#divContainerPackages").addClass("hide");
        $("#btn-NewAddContainerPackage").attr("disabled", "disabled");
        ContainerTypes_GetList(null, null);
        PackageTypesOnContainer_GetList(null, "slPackageTypesOnContainer", function () { $("#slPackageTypes").html($("#slPackageTypesOnContainer").html()); $("#slPackageTypes").val(""); });
        PurchaseItems_GetList(null, "slPurchaseItems", null);
        //$("#btnSaveContainer").attr("onclick", "OperationContainersAndPackages_Insert(true);");
        $("#btnSaveContainer").attr("onclick", "OperationContainersAndPackages_Insert(false);");
        $("#btnSaveAndNewContainer").attr("onclick", "OperationContainersAndPackages_Insert(true);");
    }
    else {
        ClearAll("#EditPackageModal");
        GetListWithNameAndWhereClause(null, "/api/PackageTypes/LoadAll", TranslateString("SelectFromMenu"), "slPackageTypes", "WHERE 1=1", null);
    }

    if (pDefaults.UnEditableCompanyName == "MES" && $('input[name=cbTransportType]:checked').val() == 1) {
        if ($('#txtCargoGrossWeight').val() > 0)
            $('#txtContainerGrossWeight').prop('disabled', true);
        else
            $('#txtContainerGrossWeight').prop('disabled', false);
        if ($('#txtCargoVolume').val() > 0)
            $('#txtContainerVolume').prop('disabled', true);
        else
            $('#txtContainerVolume').prop('disabled', false);
    }

    //Warehouse_GetList(null, null);
    if (callback != null && callback != undefined)
        callback();
}
function OperationContainersAndPackages_SaveContainerOrRoadNumber() {
    if ($("#tblOperationContainersAndPackages tr").length > 1) { //i am sure its LCL or LTL
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/SaveContainerOrRoadNumber", {
            pOperationID: $("#hOperationID").val()
            , pContainerNumber: $("#txtPackagesContainerOrRoadNumber").val() == "" ? 0 : $("#txtPackagesContainerOrRoadNumber").val().trim().toUpperCase()
        }
            , function () { FadePageCover(false); });
    }
    else
        swal(strSorry, "Add at least one package type first.");
}
function EnableDisableReeferProprties() {
    if (!$("#cbIsReefer").prop('checked')) { //if it's not reefer then  NOR(Non Operating Reefer) is disabled
        $("#cbIsNOR").attr("disabled", "disabled");
        $("#cbIsNOR").prop("checked", false);
    }
    else //reefer
        $("#cbIsNOR").removeAttr("disabled");

    if ($("#cbIsReefer").prop("checked") && !$("#cbIsNOR").prop('checked')) {
        $("#txtMinTemp").removeAttr("disabled");
        $("#txtMaxTemp").removeAttr("disabled");
        $("#txtHumidity").removeAttr("disabled");
        $("#txtVentilation").removeAttr("disabled");
    }
    else {
        $("#txtMinTemp").attr("disabled", "disabled");
        $("#txtMinTemp").val(0);
        $("#txtMaxTemp").attr("disabled", "disabled");
        $("#txtMaxTemp").val(0);
        $("#txtHumidity").attr("disabled", "disabled");
        $("#txtHumidity").val(0);
        $("#txtVentilation").attr("disabled", "disabled");
        $("#txtVentilation").val(0);
    }
}
function OperationContainersAndPackages_ApplyReeferPropertiesToAll() {
    debugger;
    swal({
        title: "Are you sure?",
        text: "The reefer properties will be applied to all existing containers on that operation.",
        //type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Re-Build",
        closeOnConfirm: true
    },
        //callback function in case of Confirm
        function () {
            FadePageCover(true);
            var pParametersWithValues = {
                pOperationIDToApplyReeferProperties: $("#hOperationID").val()
                , pIsReefer: ($("#cbIsReefer").prop("checked") ? true : false)
                , pIsNOR: ($("#cbIsNOR").prop("checked") ? true : false)
                , pMinTemp: ($("#txtMinTemp").val() == "" ? 0 : $("#txtMinTemp").val())
                , pMaxTemp: ($("#txtMaxTemp").val() == "" ? 0 : $("#txtMaxTemp").val())
                , pVentilation: ($("#txtVentilation").val() == "" ? 0 : $("#txtVentilation").val())
                , pHumidity: ($("#txtHumidity").val() == "" ? 0 : $("#txtHumidity").val())
            };
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ApplyReeferPropertiesToAll"
                , pParametersWithValues
                , function (pData) {
                    OperationContainersAndPackages_BindTableRows(JSON.parse(pData[0]));
                    FadePageCover(false);
                });
        });
}
function EnableDisableIMOProprties() {
    if ($("#cbIsIMO").prop("checked")) {
        $("#txtIMOClass").removeAttr("disabled");
        $("#txtUNNumber").removeAttr("disabled");
        $("#txtFlashPoint").removeAttr("disabled");
    }
    else {
        $("#txtIMOClass").attr("disabled", "disabled");
        $("#txtIMOClass").val(0);
        $("#txtUNNumber").attr("disabled", "disabled");
        $("#txtUNNumber").val(0);
        $("#txtFlashPoint").attr("disabled", "disabled");
        $("#txtFlashPoint").val(0);
    }
}
function CalculateVolume() {
    debugger;
    var _Volume = $("#txtLength").val() * $("#txtWidth").val() * $("#txtHeight").val() * $("#txtPackagesQuantity").val() / 1000000;
    if ($("#txtLength").val() != "" && $("#txtWidth").val() != "" && $("#txtHeight").val() != "" && $("#txtPackagesQuantity").val() != "") {
        $("#txtVolume").val(Math.round(100 * _Volume) / 100);
        //i am sure in the next 2 conditions that they are LCL or LTL  //if Ocean then no volumetric weight
        if ($("#cbIsAir").prop("checked")) {
            $("#txtVolumetricWeight").val((_Volume * 1000000 / intChgWtDividorAirConstant).toFixed(2));
            CalculateChargeableWeight();
        }
        if ($("#cbIsInland").prop("checked"))
            $("#txtVolumetricWeight").val((_Volume * 1000000 / intChgWtDividorInlandConstant).toFixed(2));
    }
    else {
        $("#txtVolume").val(0);
        $("#txtVolumetricWeight").val(0);
        if ($("#txtVolumetricWeight").val() == "" || $("#txtVolumetricWeight").val() == 0)
            $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
        else if ($("#txtGrossWeight").val() == "" || $("#txtGrossWeight").val() == 0)
            $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
        else
            $("#txtChargeableWeight").val(parseFloat($("#txtVolumetricWeight").val()) > parseFloat($("#txtGrossWeight").val())
                ? $("#txtVolumetricWeight").val()
                : $("#txtGrossWeight").val());
    }
}
function CalculateChargeableWeight() {
    debugger;
    if ($("#cbIsAir").prop("checked")) {
        $("#txtChargeableWeight").val(parseFloat($("#txtVolumetricWeight").val()) > parseFloat($("#txtGrossWeight").val())
            ? $("#txtVolumetricWeight").val()
            : $("#txtGrossWeight").val());
    }
}
function CalculateGrossWeight(ConvertToUnit) {
    debugger;
    if ($("#cbIsAir").prop("checked")) {
        if (ConvertToUnit == "TON")
            $("#txtGrossWeightTON").val(parseFloat($("#txtGrossWeight").val() / 1000));
        else if (ConvertToUnit == "KG")
            $("#txtGrossWeight").val(parseFloat($("#txtGrossWeightTON").val() * 1000));
    }
}
function GetCargoPropertiesFromMaster() {
    debugger;
    let pHouseID = $("#hShipmentID").val();
    CallGETFunctionWithParameters("api/OperationContainersAndPackages/GetCargoPropertiesFromMasterToHouse", { pHouseID: pHouseID },
        function (pData) {
            debugger;
            var MessageReturned = pData[0];
            if (MessageReturned == "") {
                swal("Success", "Saved successfully");
                jQuery("#CargoPropertiesModal").modal("hide");
            } else {
                swal("Warning","Save Failed")
            }
        })
}
function OperationContainersAndPackages_CalculateSummary() {
    debugger;
    var decTotalGrossWeight = 0;
    var decTotalVolume = 0;
    var decTotalVolumetricWeight = 0;
    var decTotalQuantity = 0; //used to fill both lblNumberOfPackages and lblQuantity

    if ($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked')) {
        $("#divPackagesSummary").removeClass("hide");
        //$(".GrossWeight").each(function () {
        //    var value = $(this).text();
        //    // add only if the value is number
        //    if (!isNaN(value) && value.length != 0) {
        //        decTotalGrossWeight += parseFloat(value);
        //    }
        //});
        //$(".Volume").each(function () {
        //    debugger;
        //    var value = $(this).text();
        //    // add only if the value is number
        //    if (!isNaN(value) && value.length != 0) {
        //        decTotalVolume += parseFloat(value);
        //    }
        //});
        //$(".VolumetricWeight").each(function () {
        //    var value = $(this).text();
        //    // add only if the value is number
        //    if (!isNaN(value) && value.length != 0) {
        //        decTotalVolumetricWeight += parseFloat(value);
        //    }
        //});
        //$(".Quantity").each(function () {
        //    var value = $(this).text();
        //    // add only if the value is number
        //    if (!isNaN(value) && value.length != 0) {
        //        decTotalQuantity += parseFloat(value);
        //    }
        //});
        //$("#lblTotalGrossWeight").html(": " + decTotalGrossWeight.toFixed(2).toString());
        //$("#lblTotalVolume").html(": " + decTotalVolume.toFixed(2).toString());
        //$("#lblTotalVolumetricWeight").html(": " + decTotalVolumetricWeight.toFixed(2).toString());
        //$("#lblChargeableWeight").html(": "
        //                                + (parseFloat($("#txtCargoChargeableWeight").val()) > 0
        //                                        ? parseFloat($("#txtCargoChargeableWeight").val()).toFixed(2)
        //                                        : (decTotalVolumetricWeight > decTotalGrossWeight ? decTotalVolumetricWeight.toFixed(2).toString() : decTotalGrossWeight.toFixed(2).toString())
        //                                   )
        //                               );
        //$("#lblTotalNumberOfPackages").html(": " + decTotalQuantity.toString());
    }
    else { //FCL or FTL
        $("#divContainersSummary").removeClass("hide");
        $("tblOperationContainersAndPackages tbody tr td.Quantity").each(function () {
            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length != 0) {
                decTotalQuantity += parseFloat(value);
            }
        });
        //$("#lblTotalNumberOfContainers").html(": " + decTotalQuantity.toString());
        //var NumberOfContainers = $('#tblOperationContainersAndPackages tr').length - 1;//document.getElementById("tblOperationContainersAndPackages").getElementsByTagName("tr").length - 1;
        //$("#lblTotalNumberOfContainers").html(": " + NumberOfContainers.toString());
    }
}
function OperationContainersAndPackages_FillLabels(pOperationMasterOrDirect) {
    debugger;
    $("#lblTotalGrossWeight").html(": " + pOperationMasterOrDirect.GrossWeightSum);
    $("#lblTotalVolume").html(": " + pOperationMasterOrDirect.VolumeSum);
    $("#lblChargeableWeight").html(": " + pOperationMasterOrDirect.ChargeableWeightSum);
    $("#lblTotalNumberOfPackages").html(": " + pOperationMasterOrDirect.NumberOfPackages);

    $("#lblTotalNumberOfContainers").html(": " + pOperationMasterOrDirect.ContainerTypes);
}
function OperationContainersAndPackages_ValidateProperties() {
    var isValid = true;
    if (!CheckDecimalPlacesAndNegativeSigns('txtLength') || !CheckDecimalPlacesAndNegativeSigns('txtWidth')
        || !CheckDecimalPlacesAndNegativeSigns('txtHeight') || !CheckDecimalPlacesAndNegativeSigns('txtGrossWeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtNetWeight') || !CheckDecimalPlacesAndNegativeSigns('txtVolumetricWeight')) {
        isValid = false;
        swal(strSorry, "Please, Check the numbers.");
    }
    //if ($("#txtContainerNumber").val().trim() != "" && $("#txtContainerNumber").val().toUpperCase().match("^[A-Z]{4}\[0-9]{7}$") == null) {
    //    isValid = false;
    //    swal(strSorry, "Container Number Format must be like 'ABCD1234567'");
    //}

    if (IsMESCOCompany && $("#txtContainerNumber").val().trim() != "") {
       

            var pParametersWithValues = { ContainerNumber: $("#txtContainerNumber").val().replace('-', '') };
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ContainerCheckNumber", pParametersWithValues,
                function (pData) {
                    debugger;
                    let MessageString = JSON.parse(pData[0]);
                    if (MessageString != "Valid") {
                        isValid = false;
                        swal(strSorry, "Sorry, Container number is invalid. Make sure the number is in this format 'ABCD1234567'");
                    }
                }
                , null, false);

    }

    if (!CheckDecimalPlacesAndNegativeSigns('txtTareWeight')) {
        isValid = false;
        swal(strSorry, "Please, Revise the tare weight.");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtVGM')) {
        isValid = false;
        swal(strSorry, "Please, Revise the VGM.");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtMinTemp')) {
        isValid = false;
        swal(strSorry, "Please, Revise the Min. Temperature.");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtMaxTemp')) {
        isValid = false;
        swal(strSorry, "Please, Revise the Max. Temperature.");
    }
    if (parseFloat($("#txtMinTemp").val()) > parseFloat($("#txtMaxTemp").val())) {
        isValid = false;
        swal(strSorry, "Please, Max. Temperature can not be less than Min Temperature.");
    }
    if ((!CheckDecimalPlacesAndNegativeSigns('txtIMOClass')) || $("#txtIMOClass").val().trim() != "" && ($("#txtIMOClass").val() < 0 || $("#txtIMOClass").val() > 9.9)) {
        isValid = false;
        swal(strSorry, "IMO Class must be between 0 and 9.9");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtHumidity')) {
        isValid = false;
        swal(strSorry, "Please, Revise the humidity.");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtVentilation')) {
        isValid = false;
        swal(strSorry, "Please, Revise the Ventilation.");
    }
    if (!CheckDecimalPlacesAndNegativeSigns('txtFlashPoint')) {
        isValid = false;
        swal(strSorry, "Please, Revise the flash point.");
    }
    if ($('#txtNumberOfContainers').val().trim() == "" || $('#txtNumberOfContainers').val().trim() < 1 || $('#txtNumberOfContainers').val().trim() > 50) {
        isValid = false;
        swal(strSorry, "Number of containers must be between 1 and 50.");
    }
    //check for packages quantity
    if (($("#cbIsLCL").prop('checked') || $("#cbIsBulk").prop('checked') || $("#cbIsLTL").prop('checked') || $("#cbIsAir").prop('checked'))
        && ($("#txtPackagesQuantity").val().trim() == "" || $("#txtPackagesQuantity").val().trim() < 1)) {
        isValid = false;
        swal(strSorry, "The Quantity must be greater than 0 !");
    }
    if ($('#cbIsSentToWarehouse').is(':checked') && !($('#slWarehouse').val() > 0)) {
        isValid = false;
        swal(strSorry, "Select a warehouse, please!");
    }
    return isValid;
}
function ContainerTypes_GetList(pID, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    //parameters: ID, strFnName, First Row in select list, select list name
    GetListWithCodeAndWhereClause(pID, "/api/ContainerTypes/LoadAll", TranslateString("Type"), "slContainerTypes", " Where 1 = 1 ORDER BY CODE ");
}
function PackageTypesOnContainer_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " Where 1=1 ";
    //the next 2 lines are to prevent selection of already selected packageTypes
    //pWhereClause += " AND ID NOT IN (SELECT PackageTypeID FROM ContainerPackages WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val() + ")";
    //pWhereClause += (pID == null || pID == undefined) ? "" : " OR ID = " + pID.toString(); //incase of editing(i.e. pID has value): to add the edited PackageType to the select list
    GetListWithNameAndWhereClause(pID, "/api/PackageTypes/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause, callback);
}
function PurchaseItems_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " Where 1=1 ";
    GetListWithNameAndWhereClause(pID, "/api/PurchaseItem/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause, callback);
}
function OperationContainersAndPackages_RebuildPackages() {
    debugger;
    var NumberOfTableRows = $('#tblOperationContainersAndPackages tr').length - 1;//document.getElementById("tblOperationContainersAndPackages").getElementsByTagName("tr").length - 1;
    if (parseInt($('#hNumberOfHousesConnected').val()) < 1)
        swal(strSorry, "No Houses is connected to this operation.");
    else
        if ($("#cbIsConsolidation").prop("checked") && NumberOfTableRows < 1)
            swal(strSorry, "Please, Add at least 1 container.");
        else {
            swal({
                title: "Are you sure?",
                text: "The Packages for Operation '" + $("#txtOperationCode").val() + "' will be Re-Built.",
                //type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, Re-Build",
                closeOnConfirm: true
            },
                //callback function in case of Confirm
                function () {
                    if (!$("#cbIsConsolidation").prop("checked")) { //this works with Master(FCL,FTL,LCL,LTL,Air) BUT NOT Consolidation Masters
                        var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("ConnectOrDisconnect");
                        CallGETFunctionWithParameters("/api/OperationContainersAndPackages/RebuildContainersAndPackages", { pIsRemoveHousePackages: false, pMasterOperationID: $("#hOperationID").val(), pHouseOperationsIDs: pSelectedIDs }
                            , function () {
                                OperationContainersAndPackages_Search();
                                Shipments_LoadAvailableShipments(); //to enable disable the Connect/Disconnect checkbox
                            });
                    }
                    else { //Consolidation Masters
                        //i am sure i have at least 1 container
                        if (NumberOfTableRows == 1) {//if just 1 container then add Automatically Connected House Packages to it
                            var pMasterOperationContainersAndPackagesID = $("#tblOperationContainersAndPackages tr:eq(1)").attr("id"); //i am sure i have 1 container so tr[1] is what i want (note: tr[0] is the header)
                            var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("ConnectOrDisconnect");
                            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/RebuildContainersAndPackages_Consolidation", { pMasterConsolidationOperationID: $("#hOperationID").val(), pMasterOperationContainersAndPackagesID: pMasterOperationContainersAndPackagesID, pHouseOperationsIDs: pSelectedIDs, pWhoIsCalling: 0 }  //pWhoIsCalling: refer to it in the controller before the api fn name
                                , function () {
                                    OperationContainersAndPackages_Search();
                                    Shipments_LoadAvailableShipments(); //to enable disable the Connect/Disconnect checkbox
                                });
                        }
                        else { //i have more than 1 container
                            debugger;
                            jQuery("#RebuildConsolidationModal").modal("show");
                            RebuildConsolidation_ClearAllControls();
                            RebuildConsolidation_LoadWithPaging();
                        }
                    }
                });
        }
}
function OperationContainersAndPackages_RemovePackages() {
    if (parseInt($('#hNumberOfHousesConnected').val()) < 1)
        swal(strSorry, "No Houses is connected to this operation.");
    else {
        swal({
            title: "Are you sure?",
            text: "The Packages of Connected Houses to Operation '" + $("#txtOperationCode").val() + "' will be Re-Removed.",
            //type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Remove",
            closeOnConfirm: true
        },
            //callback function in case of Confirm
            function () {
                if (!$("#cbIsConsolidation").prop("checked")) { //this works with Master(FCL,FTL,LCL,LTL,Air) BUT NOT Consolidation Masters
                    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("ConnectOrDisconnect");
                    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/RebuildContainersAndPackages", { pIsRemoveHousePackages: true, pMasterOperationID: $("#hOperationID").val(), pHouseOperationsIDs: pSelectedIDs }
                        , function () {
                            OperationContainersAndPackages_Search();
                            Shipments_LoadAvailableShipments(); //to enable disable the Connect/Disconnect checkbox
                        });
                }
                else { //Consolidation Masters
                    //this case wont be reached unless Consol. & 1 container
                    var pMasterOperationContainersAndPackagesID = 0;//coz i am removing all the connected house packages (1 Container)
                    var pSelectedIDs = GetAllSelectedIDsAsStringWithNameAttr("ConnectOrDisconnect"); //all the houses to remove their packages
                    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/RebuildContainersAndPackages_Consolidation", { pMasterConsolidationOperationID: $("#hOperationID").val(), pMasterOperationContainersAndPackagesID: pMasterOperationContainersAndPackagesID, pHouseOperationsIDs: pSelectedIDs, pWhoIsCalling: 0 }  //pWhoIsCalling: refer to it in the controller before the api fn name
                        , function () {
                            OperationContainersAndPackages_Search();
                        });
                }
            });
    }
}
function OperationContainersAndPackages_TransferContainerModal(pTransferredContainerID, pOriginalOperationID) {
    debugger;
    if ($("#slTransferContainerToOperation option").length < 2) {
        FadePageCover(true);
        CallGETFunctionWithParameters("/api/Operations/LoadOperationsToRestoreInvoices"
            , { pPageSize: 99999, pWhereClauseToGetOperationsToRestoreInvoices: "WHERE EffectiveOperationCode IS NOT NULL AND ShipmentType IN (1,3,5) AND OperationStageID NOT IN (" + ClosedQuoteAndOperStageID + "," + CancelledQuoteAndOperStageID + ") AND CreationDate > DATEADD(mm,DATEDIFF(mm,0,GETDATE())-12,0)", pOrderBy: "ID DESC" }
            , function (pData) {
                FillListFromObject(null, 13, "<--Select-->", "slTransferContainerToOperation", pData[0], function () { FadePageCover(false); });
            }
            , null);
    }
    $("#btnTransferContainerToOperation").attr("onclick", "OperationContainersAndPackages_TransferToOperation(" + pTransferredContainerID + "," + pOriginalOperationID + ");");
    jQuery("#TransferContainerModal").modal("show");
}
function OperationContainersAndPackages_TransferToOperation(pTransferredContainerID, pOriginalOperationID) {
    debugger;
    if ($("#slTransferContainerToOperation").val() == "")
        swal("", "Please, select an operation to transfer the container to it.");
    else {
        swal({
            title: "Are you sure?",
            text: "The container will be transferred.",
            type: "",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, transfer!",
            closeOnConfirm: true
        },
            function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pTransferredContainerID: pTransferredContainerID
                    , pOriginalOperationID: pOriginalOperationID
                    , pTransferToOperationID: $("#slTransferContainerToOperation").val()
                };
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/TransferContainer", pParametersWithValues
                    , function (pData) {
                        var _MessageReturned = pData[0];
                        if (_MessageReturned == "") {
                            OperationContainersAndPackages_Search();
                            swal("Success", "Transferred successfully.");
                            jQuery("#TransferContainerModal").modal("hide");
                        }
                        else {
                            swal("Sorry", _MessageReturned);
                            FadePageCover(false);
                        }
                    }
                    , null);
            });
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CargoProperties Fns////////////////////////////////////////////////////////////
//pOption 10:Master, 22:House

function bindPlacedOnDetailsRows(tableRows) { //For Mesco Only
    ClearAllTableRows("tblPlacedOnDetails");
    $.each(tableRows, function (i, item) {
        AppendRowtoTable("tblPlacedOnDetails",
            ("<tr ID='" + item.ID + "'>"
                // Checkbox for ID
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                // Disabled HouseNumber input
                + "<td class='HouseNumber'><input id='txtHouseNumber" + item.ID + "' value='" + item.HouseNumber + "' type='text' class='form-control controlStyle' disabled /></td>"

                // Disabled ContainerNumber input
                + "<td class='ContainerNumber'><input id='txtContainerNumber" + item.ID + "' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' type='text' class='form-control controlStyle' disabled /></td>"

                // Editable GrossWeight input
                + "<td class='GrossWeight'><input id='txtGrossWeight" + item.ID + "' value='" + item.GrossWeight + "' type='text' class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /></td>"

                // Editable Volume input
                + "<td class='Volume'><input id='txtVolume" + item.ID + "' value='" + item.Volume + "' type='text' class='form-control controlStyle' data-type='number' onkeypress='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /></td>"

                + "</tr>"));
    });

}

function UpdatePlacedOnDetails() { // mesco only 
    debugger;
    $("#tblPlacedOnDetails tr").each(function () {
        var row = $(this);
        var pID = row.find(".ID input").val() == '' ? '0' : row.find(".ID input").val(); // Get ID from checkbox
        var pGrossWeight = row.find(".GrossWeight input").val() == '' ? '0' : row.find(".GrossWeight input").val(); // Get GrossWeight
        var pVolume = row.find(".Volume input").val() == '' ? '0' : row.find(".Volume input").val() ; // Get Volume

        // Ensure ID exists before making the API call
        if (pID) {
            var pParametersWithValues = {
                pID: pID,
                pGrossWeight: pGrossWeight,
                pVolume: pVolume
            };

            CallGETFunctionWithParameters("/api/Operations/updatePlacedOnDetails",
                pParametersWithValues
                , function (pData) {
                if (pData[0] == "") {
                    swal({
                        title: "Success",
                        text: "Placed On Details Saved Successfully.",
                        showCancelButton: false,
                        confirmButtonColor: "#65bd77",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    });
                } else {
                    swal("Sorry", pData[0]);
                }
            } ,null);
        }
    });
}



function CargoProperties_FillControls(pOption, pNoDisplay) {
    debugger;


  
        if (pDefaults.UnEditableCompanyName == 'NAJ') {

            $('#txtCargoTareWeight').parent().addClass("hide");
            $('#txtCargoGrossWeightTON').parent().addClass("hide");
            $('#txtCargoVGM').parent().addClass("hide");
            $('#txtCargoNetWeight').parent().addClass("hide");
            $('#txtCargoNetWeightTON').parent().addClass("hide");
            $('#txtCargoVolume').parent().addClass("hide");
            $('#txtCargoVolumetricWeight').parent().addClass("hide");
            $('#txtCargoChargeableWeight').parent().addClass("hide");
            $('#txtContainerPackageHeight').parent().addClass("hide");
            $('#txtContainerPackageWidth').parent().addClass("hide");
            $('#txtContainerPackageLength').parent().addClass("hide");
            $('#btn-CalculateVGM').addClass("hide");
            $('#txtCargoNumberOfPackages').parent().find('label').text('No Of Vehicles');





        }




    if (IsMESCOCompany) {

        //$('#slCargoPlacedOnContainerMulti').on('change', ' PlacedOnSelect();');
        $('.showForMES').removeClass('hide');


    }


    
    //Enable GetGargoFromMaster for Master FCL Operations only in MescoCompanies 
    if (IsMESCOCompany && $("#hShipmentType").val() == "1" && $("#hBLType").val() == "3" && glbCallingControlInOperation == "Shipments")
        $("#btn-GetCargoPropertiesFromMaster").removeClass("hide");
    else
        $("#btn-GetCargoPropertiesFromMaster").addClass("hide");
    var pOperationCargoID = 0;
    if (pOption == 10) {
        $(".classHideForMaster").addClass("hide");
        pOperationCargoID = $("#hOperationID").val();
    }
    else if (pOption == 20) {
        $(".classHideForMaster").removeClass("hide");
        pOperationCargoID = $("#hShipmentID").val();
    }
    if (IsMESCOCompany && $("#cbIsOcean").prop("checked")) {
        $('#divShipmentPackageBtns').addClass('hide');
        $('#divShipmentPackage').addClass('hide');
    }
    if ((pOperationCargoID == "" && !IsMESCOCompany) || (IsMESCOCompany && pOperationCargoID == "" && !['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) // 1
        swal("Sorry", "Please, save house first.");
    else {

        if (IsMESCOCompany && pOperationCargoID != pOperationHeader_Global.ID && ['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode)) { // only for MESCO & House 2
            
            //Add new house Case
            if (pOperationCargoID == "") {
                debugger;
                $('#slCargoPlacedOnContainer').attr('multiple', '');

                ClearAllTableRows("tblPlacedOnDetails");
                FadePageCover(true);
                //ClearAll("#CargoPropertiesModal");
                if (pOperationCargoID == _firstHouseId)
                    $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
                else
                    $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
                jQuery("#CargoPropertiesModal").modal("show");
                $('#btn-SaveCargoProperties').attr('onclick', (IsMESCOCompany ? 'SetHouseStoreLocation()' : ''));
                $('#btn-SaveCargoProperties').attr('data-dismiss', 'modal');
                $('#btn-SaveCargoProperties').attr('aria-hidden', 'true');
                CallGETFunctionWithParameters("/api/PackageTypes/LoadAll", { pWhereClause: "where 1=1" }, function (pData) {
                    FillListFromObject($('#slCargoPackageTypes').val(), 2, "<--Select-->", "slCargoPackageTypes", pData[0], null);
                });
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadWithWhereClause", {
                    pWhereClause: "where OperationID = " + pOperationHeader_Global.ID,
                    pPageNumber: 1,
                    pPageSize: 50,
                    pOrderBy: "ID"
                }, function (pData) {
                    fillMultiListFromObject($('#slCargoPlacedOnContainerMulti').val(), "<--Select-->", "slCargoPlacedOnContainer", pData[0], function () {
                        
                        $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();
                        let x = $('#slCargoPlacedOnContainer').val();
                        if (x != null && x.length > 0) {
                            x[0] == '' ? x.shift() : '';
                        }
                        if (x != null) {
                            $('#slCargoPlacedOnContainerMulti').val(x).trigger('change');
                        }
                    });
                });

                

                FadePageCover(false);
            } else {
                // editing house Case
                debugger;
                $('#slCargoPlacedOnContainer').attr('multiple', '');
                $('#btn-SaveCargoProperties').attr('onclick', '');
                $('#btn-SaveCargoProperties').attr('data-dismiss', 'modal');
                $('#btn-SaveCargoProperties').attr('aria-hidden', 'true');
                ClearAll("#CargoPropertiesModal");
                if (pOperationCargoID == _firstHouseId)
                    $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
                else
                    $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
                if (!pNoDisplay) {
                    FadePageCover(true);
                    jQuery("#CargoPropertiesModal").modal("show");
                }
                var pParametersWithValues = {
                    pOperationIDForCargo: pOperationCargoID
                    , pMasterOperationID: $("#hOperationID").val() //to always containrs on master
                    , pOrderBy: "ID"
                };
                CallGETFunctionWithParameters("/api/Operations/LoadCargoProperties"
                    , pParametersWithValues
                    , function (pData) {
                        debugger;
                        $("#btn-SaveCargoProperties").attr("onclick", (IsMESCOCompany ? 'SetHouseStoreLocation()' : ''));
                        var pOperationHeader = JSON.parse(pData[0]);
                        var pOperationContainersAndPackages = pData[1];
                        var pPackageType = pData[2];
                        var pOperationContainersAndPackagesPlacedOn = JSON.parse(pData[3]);
                        var pPlacedOnDetails = JSON.parse(pData[4]);
                        FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "slCargoPackageTypes", pPackageType, null);

                        /*FillListFromObject((pOperationContainersAndPackagesPlacedOn.length > 0 ? pOperationContainersAndPackagesPlacedOn[0].OperationContainersAndPackagesID : null), 11, "<--Select-->", "slCargoPlacedOnContainer", pOperationContainersAndPackages, null);
                        $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();*/
                        let y = pOperationContainersAndPackagesPlacedOn.map(item => item.
                            OperationContainersAndPackagesID.toString());
                        
                            fillMultiListFromObject(y, "<--Select-->", "slCargoPlacedOnContainer", pData[1], function () {

                                $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();
                                let x = $('#slCargoPlacedOnContainer').val();
                                if (x != null && x.length > 0) {
                                    x[0] == '' ? x.shift() : '';
                                }
                                if (x != null) {
                                    $('#slCargoPlacedOnContainerMulti').val(x).trigger('change');
                                }
                            });
                        
                        $("#txtCargoTareWeight").val(pOperationHeader.TareWeight);
                        $("#txtCargoVolume").val(pOperationHeader.Volume);
                        $("#txtCargoNetWeight").val(pOperationHeader.NetWeight);
                        $("#txtCargoNetWeightTON").val(pOperationHeader.NetWeightTON);
                        $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
                        $("#txtCargoGrossWeightTON").val(pOperationHeader.GrossWeightTON);
                        $("#txtCargoVGM").val(pOperationHeader.VGM);
                        $("#txtCargoChargeableWeight").val(pOperationHeader.ChargeableWeight);
                        $("#txtCargoVolumetricWeight").val(pOperationHeader.VolumetricWeight);
                        $("#divCargoMarksAndNumbers").val(pOperationHeader.MarksAndNumbers == 0 ? "" : pOperationHeader.MarksAndNumbers);
                        $("#divCargoGoodsDescription").val(pOperationHeader.Description == 0 ? "" : pOperationHeader.Description);
                        $("#txtCargoNumberOfPackages").val(pOperationHeader.NumberOfPackages);
                        if (IsMESCOCompany)
                            bindPlacedOnDetailsRows(pPlacedOnDetails);
                        if (!pNoDisplay)
                        FadePageCover(false);
                    }
                    , null);

            }


        } else {
            // not mesco && pOperationCargoID not empty 4
            ClearAll("#CargoPropertiesModal");
            if (pOperationCargoID == _firstHouseId)
                $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
            else
                $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
            if (!pNoDisplay) {

            FadePageCover(true);
            jQuery("#CargoPropertiesModal").modal("show");
            }
            var pParametersWithValues = {
                pOperationIDForCargo: pOperationCargoID
                , pMasterOperationID: $("#hOperationID").val() //to always containrs on master
                , pOrderBy: "ID"
            };
            CallGETFunctionWithParameters("/api/Operations/LoadCargoProperties"
                , pParametersWithValues
                , function (pData) {
                    debugger;
                    $("#btn-SaveCargoProperties").attr("onclick", "CargoProperties_Save(" + pOperationCargoID + ");")
                    var pOperationHeader = JSON.parse(pData[0]);
                    var pOperationContainersAndPackages = JSON.parse(pData[1]);
                    var pPackageType = pData[2];
                    var pOperationContainersAndPackagesPlacedOn = JSON.parse(pData[3]);
                    var pPlacedOnDetails = JSON.parse(pData[4]);
                    if (pDefaults.UnEditableCompanyName == "NIL") {
                        $('#txtNotesNil').val(pOperationHeader.BusinessUnit);
                        $('#slPackagesStuffingInstructions').val(pOperationHeader.HouseParentID);
                    }
                    FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "slCargoPackageTypes", pPackageType, null);
                    
                    /*FillListFromObject((pOperationContainersAndPackagesPlacedOn.length > 0 ? pOperationContainersAndPackagesPlacedOn[0].OperationContainersAndPackagesID : null), 11, "<--Select-->", "slCargoPlacedOnContainer", pOperationContainersAndPackages, null);
                    $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();*/
                    let y = pOperationContainersAndPackagesPlacedOn.map(item => item.
                        OperationContainersAndPackagesID.toString());

                    fillMultiListFromObject(y, "<--Select-->", "slCargoPlacedOnContainer", pData[1], function () {
                        if (y.length == 0) {
                            $('#slCargoPlacedOnContainer').val("");
                        }
                        $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();
                        let x = $('#slCargoPlacedOnContainer').val();
                        if (x != null && x.length > 0) {
                            x[0] == '' ? x.shift() : '';
                        }
                        if (x != null) {
                            $('#slCargoPlacedOnContainerMulti').val(x).trigger('change');
                        }
                    });

                    $("#txtCargoTareWeight").val(pOperationHeader.TareWeight);
                    $("#txtCargoVolume").val(pOperationHeader.Volume);
                    $("#txtCargoNetWeight").val(pOperationHeader.NetWeight);
                    $("#txtCargoNetWeightTON").val(pOperationHeader.NetWeightTON);
                    $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
                    $("#txtCargoGrossWeightTON").val(pOperationHeader.GrossWeightTON);
                    $("#txtCargoVGM").val(pOperationHeader.VGM);
                    $("#txtCargoChargeableWeight").val(pOperationHeader.ChargeableWeight);
                    $("#txtCargoVolumetricWeight").val(pOperationHeader.VolumetricWeight);
                    $("#divCargoMarksAndNumbers").val(pOperationHeader.MarksAndNumbers == 0 ? "" : pOperationHeader.MarksAndNumbers);
                    $("#divCargoGoodsDescription").val(pOperationHeader.Description == 0 ? "" : pOperationHeader.Description);
                    $("#txtCargoNumberOfPackages").val(pOperationHeader.NumberOfPackages);
                    if (pDefaults.UnEditableCompanyName == "UNF" && pOperationContainersAndPackagesPlacedOn.length > 0) {
                        $("#spPlacedOnContainerNumber").parent().removeClass("hide");
                        $("#spPlacedOnCarrierSeal").parent().removeClass("hide");
                        let cID = pOperationContainersAndPackagesPlacedOn[0].OperationContainersAndPackagesID;
                        let OPC = pOperationContainersAndPackages.filter(item => item.ID == cID);

                        if (OPC.length > 0) {
                            $("#spPlacedOnContainerNumber").text(OPC[0].ContainerNumber);
                            $("#spPlacedOnCarrierSeal").text(OPC[0].CarrierSeal == 0 ? "" : OPC[0].CarrierSeal);
                        }
                    }
                    if (IsMESCOCompany)
                        bindPlacedOnDetailsRows(pPlacedOnDetails);
                    if (!pNoDisplay)
                    FadePageCover(false);
                }
                , null);
            if (pDefaults.UnEditableCompanyName == "BED") { $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide'); }
        }
    }






}
//******************************************************************************************** */
function VechileProperties_FillControls(pOption, pNoDisplay) {
    debugger;
    //Enable GetGargoFromMaster for Master FCL Operations only in MescoCompanies 
    if (IsMESCOCompany && $("#hShipmentType").val() == "1" && $("#hBLType").val() == "3" && glbCallingControlInOperation == "Shipments")
        $("#btn-GetCargoPropertiesFromMaster").removeClass("hide");
    else
        $("#btn-GetCargoPropertiesFromMaster").addClass("hide");
    var pOperationCargoID = 0;
    if (pOption == 10) {
        $(".classHideForMaster").addClass("hide");
        pOperationCargoID = $("#hOperationID").val();
    }
    else if (pOption == 20) {
        $(".classHideForMaster").removeClass("hide");
        pOperationCargoID = $("#hShipmentID").val();
    }
    if (IsMESCOCompany && $("#cbIsOcean").prop("checked")) {
        $('#divShipmentPackageBtns').addClass('hide');
        $('#divShipmentPackage').addClass('hide');
    }
    if ((pOperationCargoID == "" && !IsMESCOCompany) || (IsMESCOCompany && pOperationCargoID == "" && !['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) // 1
        swal("Sorry", "Please, save house first.");
    else {

        if (IsMESCOCompany && pOperationCargoID != pOperationHeader_Global.ID && ['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode)) { // only for MESCO & House 2
            function fillMultiListFromObject(pID, pStrFirstRow, pSlName, pData, callback) {
                ClearAllOptions(pSlName);
                debugger;
                var option = "";
                if (pStrFirstRow != "" && pStrFirstRow != null)
                    //option = '<option value="">' + pStrFirstRow + '</option>';
                    $.each(JSON.parse(pData), function (i, item) {
                        debugger;
                        if (pID != null && pID != undefined) //in case of editing
                            if (pID.includes(item.ID.toString()))
                                option += '<option value="' + item.ID + '" selected ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
                            else
                                option += '<option value="' + item.ID + '" ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
                        else
                            option += '<option value="' + item.ID + '" ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
                    });
                $("#" + pSlName).append(option);
                if (callback != null && callback != undefined)
                    callback();
            }
            //Add new house Case
            if (pOperationCargoID == "") {
                debugger;
                $('#slCargoPlacedOnContainer').attr('multiple', '');


                FadePageCover(true);
                //ClearAll("#CargoPropertiesModal");
                if (pOperationCargoID == _firstHouseId)
                    $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
                else
                    $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
                jQuery("#CargoPropertiesModal").modal("show");
                $('#btn-SaveCargoProperties').attr('onclick', (IsMESCOCompany ? 'SetHouseStoreLocation()' : ''));
                $('#btn-SaveCargoProperties').attr('data-dismiss', 'modal');
                $('#btn-SaveCargoProperties').attr('aria-hidden', 'true');
                CallGETFunctionWithParameters("/api/PackageTypes/LoadAll", { pWhereClause: "where 1=1" }, function (pData) {
                    FillListFromObject($('#slCargoPackageTypes').val(), 2, "<--Select-->", "slCargoPackageTypes", pData[0], null);
                });
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/LoadWithWhereClause", {
                    pWhereClause: "where OperationID = " + pOperationHeader_Global.ID,
                    pPageNumber: 1,
                    pPageSize: 50,
                    pOrderBy: "ID"
                }, function (pData) {
                    fillMultiListFromObject($('#slCargoPlacedOnContainerMulti').val(), "<--Select-->", "slCargoPlacedOnContainer", pData[0], function () {

                        $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();
                        let x = $('#slCargoPlacedOnContainer').val();
                        if (x != null && x.length > 0) {
                            x[0] == '' ? x.shift() : '';
                        }
                        if (x != null) {
                            $('#slCargoPlacedOnContainerMulti').val(x).trigger('change');
                        }
                    });
                });



                FadePageCover(false);
            } else {
                // editing house Case
                debugger;
                $('#slCargoPlacedOnContainer').attr('multiple', '');
                $('#btn-SaveCargoProperties').attr('onclick', '');
                $('#btn-SaveCargoProperties').attr('data-dismiss', 'modal');
                $('#btn-SaveCargoProperties').attr('aria-hidden', 'true');
                ClearAll("#CargoPropertiesModal");
                if (pOperationCargoID == _firstHouseId)
                    $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
                else
                    $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
                if (!pNoDisplay) {
                    FadePageCover(true);
                    jQuery("#VehiclePropertiesModal").modal("show");
                }
                var pParametersWithValues = {
                    pOperationIDForCargo: pOperationCargoID
                    , pMasterOperationID: $("#hOperationID").val() //to always containrs on master
                    , pOrderBy: "ID"
                };
                CallGETFunctionWithParameters("/api/Operations/LoadCargoProperties"
                    , pParametersWithValues
                    , function (pData) {
                        debugger;
                        $("#btn-SaveCargoProperties").attr("onclick", (IsMESCOCompany ? 'SetHouseStoreLocation()' : ''));
                        var pOperationHeader = JSON.parse(pData[0]);
                        var pOperationContainersAndPackages = pData[1];
                        var pPackageType = pData[2];
                        var pOperationContainersAndPackagesPlacedOn = JSON.parse(pData[3]);
                        FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "slCargoPackageTypes", pPackageType, null);

                        /*FillListFromObject((pOperationContainersAndPackagesPlacedOn.length > 0 ? pOperationContainersAndPackagesPlacedOn[0].OperationContainersAndPackagesID : null), 11, "<--Select-->", "slCargoPlacedOnContainer", pOperationContainersAndPackages, null);
                        $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();*/
                        let y = pOperationContainersAndPackagesPlacedOn.map(item => item.
                            OperationContainersAndPackagesID.toString());

                        fillMultiListFromObject(y, "<--Select-->", "slCargoPlacedOnContainer", pData[1], function () {

                            $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();
                            let x = $('#slCargoPlacedOnContainer').val();
                            if (x != null && x.length > 0) {
                                x[0] == '' ? x.shift() : '';
                            }
                            if (x != null) {
                                $('#slCargoPlacedOnContainerMulti').val(x).trigger('change');
                            }
                        });

                        $("#txtCargoTareWeight").val(pOperationHeader.TareWeight);
                        $("#txtCargoVolume").val(pOperationHeader.Volume);
                        $("#txtCargoNetWeight").val(pOperationHeader.NetWeight);
                        $("#txtCargoNetWeightTON").val(pOperationHeader.NetWeightTON);
                        $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
                        $("#txtCargoGrossWeightTON").val(pOperationHeader.GrossWeightTON);
                        $("#txtCargoVGM").val(pOperationHeader.VGM);
                        $("#txtCargoChargeableWeight").val(pOperationHeader.ChargeableWeight);
                        $("#txtCargoVolumetricWeight").val(pOperationHeader.VolumetricWeight);
                        $("#divCargoMarksAndNumbers").val(pOperationHeader.MarksAndNumbers == 0 ? "" : pOperationHeader.MarksAndNumbers);
                        $("#divCargoGoodsDescription").val(pOperationHeader.Description == 0 ? "" : pOperationHeader.Description);
                        $("#txtCargoNumberOfPackages").val(pOperationHeader.NumberOfPackages);
                        if (!pNoDisplay)
                            FadePageCover(false);
                    }
                    , null);

            }


        } else {
            // not mesco && pOperationCargoID not empty 4
            ClearAll("#VehiclePropertiesModal");
            if (pOperationCargoID == _firstHouseId)
                $('#btn-CopyPackagesFromMaster-Ocean').removeClass('hide');
            else
                $('#btn-CopyPackagesFromMaster-Ocean').addClass('hide');
            if (!pNoDisplay) {

                FadePageCover(true);
                jQuery("#VehiclePropertiesModal").modal("show");
            }
            var pParametersWithValues = {
                pOperationIDForCargo: pOperationCargoID
                , pMasterOperationID: $("#hOperationID").val() //to always containrs on master
                , pOrderBy: "ID"
            };
            GetListWithName(null, "/api/TRCK_EquipmentModel/LoadAll", "<--Select-->", "slEquipmentModel");
            CallGETFunctionWithParameters("/api/Operations/LoadCargoProperties"
                , pParametersWithValues
                , function (pData) {
                    debugger;
                    $("#btn-SaveCargoProperties").attr("onclick", "CargoProperties_Save(" + pOperationCargoID + ");")
                    var pOperationHeader = JSON.parse(pData[0]);
                    var pOperationContainersAndPackages = pData[1];
                    var pPackageType = pData[2];
                    var pOperationContainersAndPackagesPlacedOn = JSON.parse(pData[3]);
                    FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "slCargoPackageTypes", pPackageType, null);

                    FillListFromObject((pOperationContainersAndPackagesPlacedOn.length > 0 ? pOperationContainersAndPackagesPlacedOn[0].OperationContainersAndPackagesID : null), 11, "<--Select-->", "slCargoPlacedOnContainer", pOperationContainersAndPackages, null);
                    $('#slCargoPlacedOnContainerMulti').html($('#slCargoPlacedOnContainer').html()).css({ 'width': '100%' }).select2({ dropdownParent: $('#CargoPropertiesModal') }).val(-1).change();

                    $("#txtCargoTareWeight").val(pOperationHeader.TareWeight);
                    $("#txtCargoVolume").val(pOperationHeader.Volume);
                    $("#txtCargoNetWeight").val(pOperationHeader.NetWeight);
                    $("#txtCargoNetWeightTON").val(pOperationHeader.NetWeightTON);
                    $("#txtCargoGrossWeight").val(pOperationHeader.GrossWeight);
                    $("#txtCargoGrossWeightTON").val(pOperationHeader.GrossWeightTON);
                    $("#txtCargoVGM").val(pOperationHeader.VGM);
                    $("#txtCargoChargeableWeight").val(pOperationHeader.ChargeableWeight);
                    $("#txtCargoVolumetricWeight").val(pOperationHeader.VolumetricWeight);
                    $("#divCargoMarksAndNumbers").val(pOperationHeader.MarksAndNumbers == 0 ? "" : pOperationHeader.MarksAndNumbers);
                    $("#divCargoGoodsDescription").val(pOperationHeader.Description == 0 ? "" : pOperationHeader.Description);
                    $("#txtCargoNumberOfPackages").val(pOperationHeader.NumberOfPackages);
                    if (!pNoDisplay)
                        FadePageCover(false);
                }
                , null);

        }
    }

}
function AddVechileTochouse() {
    debugger;
    if ($("#slEquipmentModel").val() == "") {
        swal("SORRY", "Choose Equipment Model");
    }
    
    else {
        InsertUpdateFunction("form", "/api/TRCK_Equipments/Insert"
            , {
                pCode: 0 /*generated automatically*/
                , pName: ""
                , pLocalName: ""
                , pOriginCountryID: 0
                , pManufacturDate: ($("#txtManufacturDate").val() == "" ? "01/01/1900" : ConvertDateFormat($("#txtManufacturDate").val()))
                , pPlateNo: 0
                , pChassisNo: ($("#txtChassisNo").val() == null ? "" : $("#txtChassisNo").val().trim())
                , pLicenseNumber: 0
                , pLicenseNumberExpireDate: "01/01/1900"
                , pColor: 0
                , pLength: 0
                , pWidth: 0
                , pHeight: 0
                , pGrossWeight: 0
                , pAllowedWeight: 0
                , pNoOfPrimaryWheels: 0
                , pNoOfAdditionalWheels: 0
                , pAxeCount: 0
                , pExaminationExpireDate: "01/01/1900"
                , pInsuranceDate: "01/01/1900"
                , pWorkingDate: "01/01/1900"
                , pInsuranceBill: ""
                , pInsuranceCompanyID: 0
                , pTaxEndDate: "01/01/1900"
                , pEquipmentModelID: 0
                , pServiceCenterID: 0
                , pCompanyID: 0

                , pInsuranceValue: ""
                , pNotes: ""
                , pTrailerID: 0
                , pMotorNo: ($("#txtMotorNo").val() == null ? "" : $("#txtMotorNo").val().trim())

                , pIsInactive: false

                , pAccountID: 0
                , pSubAccountID: 0
                , pCostCenterID: 0
                , pSubAccountGroupID: 0
                , pFirstCounter: 0
                , pIDList: 0, pItemID: 0, pLastTruckCounter: 0, pDate: "01/01/1900", pDescription: ""
                , pSLHeadLeft1Out: "0"
                , pSLHeadLeft1IN: "0"
                , pSLHeadLeft2Out: "0"
                , pSLHeadLeft2IN: "0"
                , pSLHeadLeft3Out: "0"
                , pSLHeadLeft3IN: "0"
                , pSLHeadRight1Out: "0"
                , pSLHeadRight1IN: "0"
                , pSLHeadRight2Out: "0"
                , pSLHeadRight2IN: "0"
                , pSLHeadRight3Out: "0"
                , pSLHeadRight3IN: "0"
                , pSLTrailLeft1Out: "0"
                , pSLTrailLeft1IN: "0"
                , pSLTrailLeft2Out: "0"
                , pSLTrailLeft2IN: "0"
                , pSLTrailLeft3Out: "0"
                , pSLTrailLeft3IN: "0"
                , pSLTrailLeft4Out: "0"
                , pSLTrailLeft4IN: "0"
                , pSLTrailLeft5Out: "0"
                , pSLTrailLeft5IN: "0"
                , pSLTrailRight1Out: "0"
                , pSLTrailRight1IN: "0"
                , pSLTrailRight2Out: "0"
                , pSLTrailRight2IN: "0"
                , pSLTrailRight3Out: "0"
                , pSLTrailRight3IN: "0"
                , pSLTrailRight4Out: "0"
                , pSLTrailRight4IN: "0"
                , pSLTrailRight5Out: "0"
                , pSLTrailRight5IN: "0"
                , pNumberOfChambers: 0
                , pChambersVolumeInLiters: 0
                , pTankerEmptyWeight: 0
                , pOutlet: 0
                , pIsHeating: false
                , pIsHeatable: false
                , pIsEpump: false
                , pIsCompressor: false
                , pIsGroundOperated: false
                , pIsATP: false
                , pEquipmentTypeID: $("#slEquipmentType").val() == "" ? 0 : $("#slEquipmentType").val()
                , pEquipmentModelID: $("#slEquipmentModel").val() == "" ? 0 : $("#slEquipmentModel").val()
                , pNumberOfChairs: 0

                , pIsGPS: false
                , pModel: 0
                , pWheelSize: 0
                , pExchangePermission: $("#txtExchangePermission").val() == "" ? 0 : $("#txtExchangePermission").val()
                , pStoragePermission: $("#txtStoragePermission").val() == "" ? 0 : $("#txtStoragePermission").val()
                , pHouseId: $("#hShipmentID").val()


            }, null, null, function (pdata) {
                var _MessageReturned = pdata[0];
                if (_MessageReturned) {
                    swal("Success", "Saved successfully");
                    HouseVechiles_BindTableRows(JSON.parse(pdata[1]));
                }
                else {
                    swal("Error");
                }
            });
    }
    
}
//******************************************************************************************** */
function CargoProperties_Save(pOperationCargoID) {
    debugger;
    if ($("#txtCargoVolume").val().trim() != "" && parseFloat($("#txtCargoVolume").val()) > 100) {
        swal("Sorry", "Volume must be less than or equal to 100.");
        return;
    }
    FadePageCover(true);
    var pParametersWithValues = {
        pOperationID: pOperationCargoID
        , pTareWeight: $("#txtCargoTareWeight").val() == "" ? 0 : $("#txtCargoTareWeight").val()
        , pGrossWeight: $("#txtCargoGrossWeight").val() == "" ? 0 : $("#txtCargoGrossWeight").val()
        , pGrossWeightTON: $("#txtCargoGrossWeightTON").val() == "" ? 0 : $("#txtCargoGrossWeightTON").val()
        , pVGM: $("#txtCargoVGM").val() == "" ? 0 : $("#txtCargoVGM").val()
        , pNetWeight: $("#txtCargoNetWeight").val() == "" ? 0 : $("#txtCargoNetWeight").val()
        , pNetWeightTON: $("#txtCargoNetWeightTON").val() == "" ? 0 : $("#txtCargoNetWeightTON").val()
        , pVolume: $("#txtCargoVolume").val() == "" ? 0 : $("#txtCargoVolume").val()
        , pChargeableWeight: $("#txtCargoChargeableWeight").val() == "" ? 0 : $("#txtCargoChargeableWeight").val()
        , pVolumetricWeight: $("#txtCargoVolumetricWeight").val() == "" ? 0 : $("#txtCargoVolumetricWeight").val()
        , pNumberOfPackages: $("#txtCargoNumberOfPackages").val() == "" ? 0 : $("#txtCargoNumberOfPackages").val()
        , pPackageTypeID: $("#slCargoPackageTypes").val() == "" ? 0 : $("#slCargoPackageTypes").val()
        , pPlacedOnOperationContainersAndPackagesID: $("#slCargoPlacedOnContainer").val() == "" ? 0 : $("#slCargoPlacedOnContainer").val()
        , pPlacedOnOperationContainersAndPackagesIDS: IsNull($("#slCargoPlacedOnContainerMulti").val(), '0').toString()
        , pMarksAndNumbers: $("#divCargoMarksAndNumbers").val().trim() == "" ? 0 : $("#divCargoMarksAndNumbers").val().trim().toUpperCase()
        , pDescription: $("#divCargoGoodsDescription").val().trim() == "" ? 0 : $("#divCargoGoodsDescription").val().trim().toUpperCase()
        , pHouseParentID: $("#slPackagesStuffingInstructions").val() == null || $("#slPackagesStuffingInstructions").val() == "" || $("#slPackagesStuffingInstructions").val() == undefined ? 0 : $("#slPackagesStuffingInstructions").val()
        , pNotes: $("#txtNotesNil").val()
    };
    if (IsMESCOCompany && (['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) {
        pParametersWithValues.pPlacedOnOperationContainersAndPackagesID = $("#slCargoPlacedOnContainerMulti").val() == null || $("#slCargoPlacedOnContainerMulti").val().length == 0 ? 0 : parseInt($("#slCargoPlacedOnContainerMulti").val()[0]);
        //pParametersWithValues.pPlacedOnOperationContainersAndPackagesIDS = $("#slCargoPlacedOnContainerMulti").val() == null || $("#slCargoPlacedOnContainerMulti").val().length == 0 ? '0' : $("#slCargoPlacedOnContainerMulti").val()[0];
    } else {
        pParametersWithValues.pPlacedOnOperationContainersAndPackagesID = $("#slCargoPlacedOnContainerMulti").val() == null || $("#slCargoPlacedOnContainerMulti").val().length == 0 ? 0 : parseInt($("#slCargoPlacedOnContainerMulti").val()[0]);
        if (!($(".classHideForMaster.hide").length > 5)) {
            var placedOnIdArray = $('#slCargoPlacedOnContainerMulti').val() == null ? "0" : $('#slCargoPlacedOnContainerMulti').val();
            if (placedOnIdArray != 0)
            var pPlacedOnIDs = placedOnIdArray.join(", ");

            CallGETFunctionWithParameters("/api/Operations/UpdateContainersPlacedOn", { pShipmentID: $("#hShipmentID").val(), pOperationContainersAndPackagesID: $('#slCargoPlacedOnContainerMulti').val() == null ? "0" : $('#slCargoPlacedOnContainerMulti').val()[0], pPlacedOnIDs: pPlacedOnIDs  }, null, null, false);
        }
    }
    if (IsMESCOCompany)
        UpdatePlacedOnDetails();
    CallGETFunctionWithParameters("/api/OperationContainersAndPackages/CargoProperties_Save"
        , pParametersWithValues
        , function (pData) {
            var _MessageReturned = pData[0];
            var OtherHouseNumber = pData[3];
            if (_MessageReturned == "") {
                if (OtherHouseNumber != "" && !IsMESCOCompany) {
                    swal("Sorry", "Container not added because it is already connected to " + OtherHouseNumber);
                } else {
                    if (!IsMESCOCompany) {
                        swal("Success", "Saved successfully");
                    }
                }
                if (IsMESCOCompany && pOperationHeader_Global != null && (['CONSOL', 'LCL'].includes(pOperationHeader_Global.ShipmentTypeCode))) {
                    Shipments_LoadAvailableShipments();
                    GetListWithOpCodeAndHouseNoAndClientEmailAttr($("#hOperationID").val(), "/api/Operations/LoadWithParameters", null, "slDocsOutOperations"
                        , { pPageNumber: 1, pPageSize: 99999, pWhereClause: " WHERE ID = " + $("#hOperationID").val() + " OR MasterOperationID = " + $("#hOperationID").val(), pOrderBy: "HouseNumber" }
                        , function () { $("#slEditInvoiceOperations").html($("#slDocsOutOperations").html()); });
                    jQuery("#ShipmentModal").modal("hide");
                    $("#btnSaveShipment").attr("disabled", false);
                    swal("Success", "Saved successfully");
                }
                var pOperationMasterOrDirect = JSON.parse(pData[2]);
                jQuery("#CargoPropertiesModal").modal("hide");
                //if (parseFloat($("#txtCargoChargeableWeight").val()) != 0 && $("#txtCargoChargeableWeight").val() != "")
                //    $("#lblChargeableWeight").html(": " + parseFloat($("#txtCargoChargeableWeight").val()).toFixed(2));
                //else
                //    OperationContainersAndPackages_CalculateSummary();
                OperationContainersAndPackages_FillLabels(pOperationMasterOrDirect);
          
            }
            else {
                if (pDefaults.UnEditableCompanyName == "UNF") {
                    jQuery("#CargoPropertiesModal").modal("hide");
                }
                swal("Sorry", _MessageReturned);
            }
            FadePageCover(false);
        }
        , null);
}
function CargoProperties_CalculateVGM() {
    debugger;
    var pTareWeight = isNaN(parseFloat($("#txtCargoTareWeight").val())) ? 0 : parseFloat($("#txtCargoTareWeight").val());
    var pGrossWeight = isNaN(parseFloat($("#txtCargoGrossWeight").val())) ? 0 : parseFloat($("#txtCargoGrossWeight").val());
    $("#txtCargoVGM").val(pTareWeight + pGrossWeight);
}
function OperationContainersAndPackages_CalculateVGM(pTareWeightControl, pGrossWeightControl, pVGMControl) {
    debugger;
    var pTareWeight = isNaN(parseFloat($("#" + pTareWeightControl).val())) ? 0 : parseFloat($("#" + pTareWeightControl).val());
    var pGrossWeight = isNaN(parseFloat($("#" + pGrossWeightControl).val())) ? 0 : parseFloat($("#" + pGrossWeightControl).val());
    $("#" + pVGMControl).val(pTareWeight + pGrossWeight);
}

function ReeferDetails_FillControls() {
    debugger;
    if (pDefaults.UnEditableCompanyName == "AGR") {
        $("#RefeerGrossWeightTon").text("GrossWt(KG)");
        $("#RefeerNetWeightTon").text("NetWt(KG)");
    }
    ClearAll("#ReeferDetailsModal");
    FadePageCover(true);
    jQuery("#ReeferDetailsModal").modal("show");
    var pParametersWithValues = {
        pOperationID: $("#hOperationID").val()
    };
    CallGETFunctionWithParameters("/api/Operations/LoadReeferDetails"
        , pParametersWithValues
        , function (pData) {
            debugger;

            var FirstContainerData = JSON.parse(pData[0]);
            var AllContainersData = JSON.parse(pData[1]);

            //var pPackageType = pData[2];
            //FillListFromObject(pOperationHeader.PackageTypeID, 2, "<--Select-->", "hslPackageTypes", pPackageType, null);

            if (FirstContainerData.length > 0) {
                $("#cbIsReeferGeneral").prop("checked", FirstContainerData[0].IsReefer);
                $("#cbIsNORGeneral").prop("checked", FirstContainerData[0].IsNOR);
                $("#txtMinTempGeneral").val(FirstContainerData[0].MinTemp);
                $("#txtMaxTempGeneral").val(FirstContainerData[0].MaxTemp);
                $("#txtHumidityGeneral").val(FirstContainerData[0].Humidity);
                $("#txtVentilationGeneral").val(FirstContainerData[0].Ventilation);
            }
            EnableDisableReeferProprtiesGeneral();

            ReeferDetails_BindTableRows(AllContainersData);

            FadePageCover(false);
        }
        , null);

}
function ReeferDetails_BindTableRows(pOperationContainersAndPackages) {
    debugger;
    ClearAllTableRows("tblAllContainers");


    $.each(pOperationContainersAndPackages, function (i, item) {
        AppendRowtoTable("tblAllContainers",
            ("<tr ID='" + item.ID + "'>"
                //+ "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"
                + "<td class='ContainerNumber' style=''><input id='txtContainerNumber" + item.ID + "' value='" + (item.ContainerNumber == 0 ? "" : item.ContainerNumber) + "' type='text' style='text-transform: uppercase' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' /> </td>"
                + "<td class='PurchaseItemID' style='' val='" + item.PurchaseItemID + "'><select id='slPurchaseItemID" + item.ID + "' style='width:112%;' class='selectPurchaseItemID controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'> <option value=" + item.PurchaseItemID + "></option>" + "</select></td>"
                + "<td class='PackageTypeIDOnContainer' style='' val='" + item.PackageTypeIDOnContainer + "'><select id='slPackageTypeIDOnContainer" + item.ID + "' style='width:112%;' class='selectPackageTypeIDOnContainer controlStyle' onfocus='DisableBackspaceKey(id);' onkeydown='DisableBackspaceKey(id);' onkeypress='DisableBackspaceKey(id);' data-required='false'> <option value=" + item.PackageTypeIDOnContainer + "></option>" + "</select></td>"
                + "<td class='NumberOfPackagesOnContainer' style=''><input id='txtNumberOfPackagesOnContainer" + item.ID + "' value='" + item.NumberOfPackagesOnContainer + "' type='text' style='' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /> </td>"
                //+ "<td class='GrossWeightTON' style=''><input id='txtGrossWeightTON" + item.ID + "' value='" + item.GrossWeightTON + "' type='text' style='' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /> </td>"
                //+ "<td class='NetWeightTON' style=''><input id='txtNetWeightTON" + item.ID + "' value='" + item.NetWeightTON + "' type='text' style='' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /> </td>"
                + "<td class='GrossWeightTON' style=''><input id='txtGrossWeightTON" + item.ID + "' value='" + (pDefaults.UnEditableCompanyName == "AGR" ? (item.GrossWeightTON * 1000).toFixed(2) : item.GrossWeightTON) + "' type='text' style='' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /> </td>"
                + "<td class='NetWeightTON' style=''><input id='txtNetWeightTON" + item.ID + "' value='" + (pDefaults.UnEditableCompanyName == "AGR" ? (item.NetWeightTON * 1000).toFixed(2) : item.NetWeightTON)  + "' type='text' style='' class='form-control controlStyle' data-type='number'  onkeypress='CheckValueIsDecimal(id);' onfocus='CheckValueIsDecimal(id);' onblur='CheckDecimalFormat(id);' data-required='false' /> </td>"
                + "<td class='DescriptionOfGoods' style=''><input id='txtDescriptionOfGoods" + item.ID + "' value='" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "' type='text' style='' class='form-control controlStyle' onkeypress='DisableEnterKey(id);' onfocus='DisableEnterKey(id);' data-required='false' /> </td>"

                + "</tr>"));

        $("#slPurchaseItemID" + item.ID).html($("#slPurchaseItems").html());
        $("#slPurchaseItemID" + item.ID).css({ "width": "100%" }).select2();
        $("#slPurchaseItemID" + item.ID).val(item.PurchaseItemID == 0 ? "" : item.PurchaseItemID).trigger("change");

        $("#slPackageTypeIDOnContainer" + item.ID).html($("#slPackageTypes").html());
        $("#slPackageTypeIDOnContainer" + item.ID).css({ "width": "100%" }).select2();
        $("#slPackageTypeIDOnContainer" + item.ID).val(item.PackageTypeIDOnContainer == 0 ? "" : item.PackageTypeIDOnContainer).trigger("change");

    });
    $("div[tabindex='-1']").removeAttr('tabindex');

    //BindAllCheckboxonTable("tblOperationContainersAndPackages", "ID", "cb-CheckAll-OperationContainersAndPackages");
    //CheckAllCheckbox("HeaderDeleteOperationContainersAndPackagesID");


}
function EnableDisableReeferProprtiesGeneral() {
    if (!$("#cbIsReeferGeneral").prop('checked')) { //if it's not reefer then  NOR(Non Operating Reefer) is disabled
        $("#cbIsNORGeneral").attr("disabled", "disabled");
        $("#cbIsNORGeneral").prop("checked", false);
    }
    else //reefer
        $("#cbIsNORGeneral").removeAttr("disabled");

    if ($("#cbIsReeferGeneral").prop("checked") && !$("#cbIsNORGeneral").prop('checked')) {
        $("#txtMinTempGeneral").removeAttr("disabled");
        $("#txtMaxTempGeneral").removeAttr("disabled");
        $("#txtHumidityGeneral").removeAttr("disabled");
        $("#txtVentilationGeneral").removeAttr("disabled");
    }
    else {
        $("#txtMinTempGeneral").attr("disabled", "disabled");
        $("#txtMinTempGeneral").val(0);
        $("#txtMaxTempGeneral").attr("disabled", "disabled");
        $("#txtMaxTempGeneral").val(0);
        $("#txtHumidityGeneral").attr("disabled", "disabled");
        $("#txtHumidityGeneral").val(0);
        $("#txtVentilationGeneral").attr("disabled", "disabled");
        $("#txtVentilationGeneral").val(0);
    }
}
function ReeferDetails_Save() {
    debugger;

    var ContainerIDsList = "";
    var ContainerNumberList = "";
    var PurchaseItemIDList = "";
    var PackageTypeIDOnContainerList = "";
    var NumberOfPackagesOnContainerList = "";
    var GrossWeightTONList = "";
    var NetWeightTONList = "";
    var DescriptionOfGoodsList = "";
    $('#tblAllContainers tbody tr').each(function () {
        var rowId = $(this).attr('id');
        ContainerIDsList += (ContainerIDsList == "" ? "" : ",") + rowId
        ContainerNumberList += (ContainerNumberList == "" ? "" : ",") + ($("#txtContainerNumber" + rowId).val() == "" ? "0" : $("#txtContainerNumber" + rowId).val())
        PurchaseItemIDList += (PurchaseItemIDList == "" ? "" : ",") + ($("#slPurchaseItemID" + rowId).val() == "" ? "0" : $("#slPurchaseItemID" + rowId).val())
        PackageTypeIDOnContainerList += (PackageTypeIDOnContainerList == "" ? "" : ",") + ($("#slPackageTypeIDOnContainer" + rowId).val() == "" ? "0" : $("#slPackageTypeIDOnContainer" + rowId).val())
        NumberOfPackagesOnContainerList += (NumberOfPackagesOnContainerList == "" ? "" : ",") + ($("#txtNumberOfPackagesOnContainer" + rowId).val())
        //GrossWeightTONList += (GrossWeightTONList == "" ? "" : ",") + ($("#txtGrossWeightTON" + rowId).val())
        //NetWeightTONList += (NetWeightTONList == "" ? "" : ",") + ($("#txtNetWeightTON" + rowId).val())
        GrossWeightTONList += (GrossWeightTONList == "" ? "" : ",") + (pDefaults.UnEditableCompanyName == "AGR" ? ($("#txtGrossWeightTON" + rowId).val() / 1000) : ($("#txtGrossWeightTON" + rowId).val()))
        NetWeightTONList += (NetWeightTONList == "" ? "" : ",") + (pDefaults.UnEditableCompanyName == "AGR" ? ($("#txtNetWeightTON" + rowId).val() / 1000) : ($("#txtNetWeightTON" + rowId).val()))
        DescriptionOfGoodsList += (DescriptionOfGoodsList == "" ? "" : ",") + ($("#txtDescriptionOfGoods" + rowId).val() == "" ? "0" : $("#txtDescriptionOfGoods" + rowId).val())

    });

    var pParametersWithValues = {
        pOperationIDToApplyReeferProperties: $("#hOperationID").val()
        , pIsReefer: $("#cbIsReeferGeneral").prop("checked")
        , pIsNOR: $("#cbIsNORGeneral").prop("checked")
        , pMinTemp: ($("#txtMinTempGeneral").val() == "" ? 0 : $("#txtMinTempGeneral").val())
        , pMaxTemp: ($("#txtMaxTempGeneral").val() == "" ? 0 : $("#txtMaxTempGeneral").val())
        , pVentilation: ($("#txtVentilationGeneral").val() == "" ? 0 : $("#txtVentilationGeneral").val())
        , pHumidity: ($("#txtHumidityGeneral").val() == "" ? 0 : $("#txtHumidityGeneral").val())

        , ContainerIDsList: ContainerIDsList
        , ContainerNumberList: ContainerNumberList
        , PurchaseItemIDList: PurchaseItemIDList
        , PackageTypeIDOnContainerList: PackageTypeIDOnContainerList
        , NumberOfPackagesOnContainerList: NumberOfPackagesOnContainerList
        , GrossWeightTONList: GrossWeightTONList
        , NetWeightTONList: NetWeightTONList
        , DescriptionOfGoodsList: DescriptionOfGoodsList
    };

    FadePageCover(true);
    CallPOSTFunctionWithParameters("/api/OperationContainersAndPackages/ReeferDetails_Save"
        , pParametersWithValues
        , function (pData) {
            OperationContainersAndPackages_BindTableRows(JSON.parse(pData[0]));
            jQuery("#ReeferDetailsModal").modal("hide");
            FadePageCover(false);
        });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ContainerPackages Fns////////////////////////////////////////////////////////////
function ContainerPackages_BindTableRows(pContainerPackages) {
    ClearAllTableRows("tblContainerPackages");
    //editControlsText = " class='btn btn-xs btn-rounded btn-info float-right' > <i class='fa fa-pencil' style='padding-left: 5px;'></i> <span style='padding-right: 5px;'>" + TranslateString("Edit") + "</span>";
    $.each(pContainerPackages, function (i, item) {
        AppendRowtoTable("tblContainerPackages",
            ("<tr ID='" + item.ID + "' ondblclick='ContainerPackages_EditByDblClick(" + item.ID + "," + item.OperationID + ");'>"
                + "<td class='ID'> <input name='Delete' type='checkbox' value='" + item.ID + "' /></td>"

                + ($("#hBLType").val() == constMasterBLType ? "<td class='HouseOperationCode'>" + (item.HouseOperationCode == 0 ? "" : item.HouseOperationCode) + "</td>" : "")
                + "<td class='ContainerPackage' val='" + item.PackageTypeID + "'>" + item.PackageTypeName + "</td>"
                + "<td class='ContainerPackageQuantity'>" + item.Quantity + "</td>"
                + "<td class='ContainerPackageLength hide'>" + (item.Length == 0 ? "" : item.Length) + "</td>"
                + "<td class='ContainerPackageWidth hide'>" + (item.Width == 0 ? "" : item.Width) + "</td>"
                + "<td class='ContainerPackageHeight hide'>" + (item.Height == 0 ? "" : item.Height) + "</td>"
                + "<td class='ContainerPackageVolume'>" + (item.Volume == 0 ? "" : item.Volume) + "</td>"
                + "<td class='ContainerPackageVolumetricWeight hide'>" + (item.VolumetricWeight == 0 ? "" : item.VolumetricWeight) + "</td>"
                + "<td class='ContainerPackageNetWeight hide'>" + (item.NetWeight == 0 ? "" : item.NetWeight) + "</td>"
                + "<td class='ContainerPackageGrossWeight'>" + (item.GrossWeight == 0 ? "" : item.GrossWeight) + "</td>"
                + "<td class='ContainerPackageChargeableWeight hide'>" + (item.ChargeableWeight == 0 ? "" : item.ChargeableWeight) + "</td>"
                + "<td class='ContainerPackageDescriptionOfGoods'>" + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + "</td>"
                + "<td class='ContainerPackageMarksAndNumbers hide'>" + (item.MarksAndNumbers == 0 ? "" : item.MarksAndNumbers) + "</td>"

                + "<td class='hide'><a href='#EditContainerPackageModal' data-toggle='modal' onclick='ContainerPackages_FillControls(" + item.ID + "," + item.OperationID + ");' " + editControlsText + "</a></td></tr>"));
    });
    ShowHidettblContainerPackagesHeaders();
    //ApplyPermissions();
    BindAllCheckboxonTable("tblContainerPackages", "ID", "cb-CheckAll-ContainerPackages");
    CheckAllCheckbox("HeaderDeleteContainerPackagesID");
    HighlightText("#tblContainerPackages>tbody>tr", $("#txtContainerPackagesSearch").val().trim());
    if (showDeleteFailMessage) {//sherif: if deletion failed due to foreign key, then this message is shown
        swal(strSorry, strDeleteFailMessage, "warning");
        showDeleteFailMessage = false;
    }
    ContainerPackages_CalculateSummary();
}
function ShowHidettblContainerPackagesHeaders() {
    if ($("#hBLType").val() == constMasterBLType) //if master then show house header for packages
        $("#ContainerPackagesHouseCodeHeader").removeClass("hide");
    else
        $("#ContainerPackagesHouseCodeHeader").addClass("hide");
}
function ContainerPackages_EditByDblClick(pID, pOperationID) {
    jQuery("#EditContainerPackageModal").modal("show");
    ContainerPackages_FillControls(pID, pOperationID);
}
function ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy() {
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerPackages/LoadWithWhereClause", " WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val(), " HouseOperationCode, PackageTypeName ", 1, 1000, function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
}
function ContainerPackages_ClearAllControls(callback, pOperationID) {
    debugger;
    if ($("#hContainerID").val() == "")
        swal("Sorry", "Please, save container first.");
    else {
        ClearAll("#EditContainerPackageModal");
        ContainerPackageTypes_GetList(null, "slContainerPackageTypes", null);
        $("#txtContainerPackageQuantity").val(1);

        $("#btnSaveContainerPackage").attr("onclick", "ContainerPackages_Insert(false," + pOperationID + ");");
        $("#btnSaveAndNewContainerPackage").attr("onclick", "ContainerPackages_Insert(true," + pOperationID + ");");

        if (callback != null && callback != undefined)
            callback();
    }
}
function ContainerPackages_FillControls(pID, pOperationID) {

    ClearAll("#EditContainerPackageModal");
    debugger;
    var tr = $("#tblContainerPackages tr[ID='" + pID + "']");

    $("#lblContainerPackageShown").html(": " + $(tr).find("td.ContainerPackage").text());

    var pContainerPackageTypeID = $(tr).find("td.ContainerPackage").attr('val');
    ContainerPackageTypes_GetList(pContainerPackageTypeID, "slContainerPackageTypes", null);

    $("#hContainerPackageID").val(pID);

    $("#txtContainerPackageQuantity").val($(tr).find("td.ContainerPackageQuantity").text());
    $("#txtContainerPackageLength").val($(tr).find("td.ContainerPackageLength").text());
    $("#txtContainerPackageWidth").val($(tr).find("td.ContainerPackageWidth").text());
    $("#txtContainerPackageHeight").val($(tr).find("td.ContainerPackageHeight").text());
    $("#txtContainerPackageVolume").val($(tr).find("td.ContainerPackageVolume").text());
    $("#txtContainerPackageNetWeight").val($(tr).find("td.ContainerPackageNetWeight").text());
    $("#txtContainerPackageGrossWeight").val($(tr).find("td.ContainerPackageGrossWeight").text());
    $("#txtContainerPackageVolumetricWeight").val($(tr).find("td.ContainerPackageVolumetricWeight").text());
    $("#txtContainerPackageMarksAndNumbers").val($(tr).find("td.ContainerPackageMarksAndNumbers").text());
    $("#txtContainerPackageDescriptionOfGoods").val($(tr).find("td.ContainerPackageDescriptionOfGoods").text());

    $("#btnSaveContainerPackage").attr("onclick", "ContainerPackages_Update(false," + pOperationID + ");");
    $("#btnSaveAndNewContainerPackage").attr("onclick", "ContainerPackages_Update(true," + pOperationID + ");");
}
//insert ContainerPackage
function ContainerPackages_Insert(pSaveandAddNew, pOperationID) {
    debugger;
    if (ContainerPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/ContainerPackages/Insert", {
            pOperationID: pOperationID //$("#hOperationID").val()
            , pOperationContainersAndPackagesID: $("#hContainerID").val()
            , pPackageTypeID: ($("#slContainerPackageTypes option:selected").val() == "" ? 0 : $("#slContainerPackageTypes option:selected").val())
            , pQuantity: ($("#txtContainerPackageQuantity").val() == "" ? 0 : $("#txtContainerPackageQuantity").val())
            , pLength: ($("#txtContainerPackageLength").val() == "" ? 0 : $("#txtContainerPackageLength").val())
            , pWidth: ($("#txtContainerPackageWidth").val() == "" ? 0 : $("#txtContainerPackageWidth").val())
            , pHeight: ($("#txtContainerPackageHeight").val() == "" ? 0 : $("#txtContainerPackageHeight").val())
            , pVolume: ($("#txtContainerPackageVolume").val() == "" ? 0 : $("#txtContainerPackageVolume").val())
            , pNetWeight: ($("#txtContainerPackageNetWeight").val() == "" ? 0 : $("#txtContainerPackageNetWeight").val())
            , pGrossWeight: ($("#txtContainerPackageGrossWeight").val() == "" ? 0 : $("#txtContainerPackageGrossWeight").val())
            , pVolumetricWeight: ($("#txtContainerPackageVolumetricWeight").val() == "" ? 0 : $("#txtContainerPackageVolumetricWeight").val())
            //, pChargeableWeight: ($("#txtContainerPackageChargeableWeight").val() == "" ? 0 : $("#txtContainerPackageChargeableWeight").val())
            , pMarksAndNumbers: ($("#txtContainerPackageMarksAndNumbers").val().trim() == "" ? 0 : $("#txtContainerPackageMarksAndNumbers").val().trim().toUpperCase())
            , pDescriptionOfGoods: ($("#txtContainerPackageDescriptionOfGoods").val().trim() == "" ? 0 : $("#txtContainerPackageDescriptionOfGoods").val().trim().toUpperCase())
        }, pSaveandAddNew
            , "EditContainerPackageModal" //Modal name
            , function () {
                ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
                if (pSaveandAddNew)
                    ContainerPackages_ClearAllControls(null, pOperationID);
            });
}
function ContainerPackages_Update(pSaveandAddNew, pOperationID) {
    debugger;
    if (ContainerPackages_ValidateProperties())
        InsertUpdateFunction("form", "/api/ContainerPackages/Update", {
            pID: $("#hContainerPackageID").val()
            , pOperationID: pOperationID //$("#hOperationID").val()
            , pOperationContainersAndPackagesID: $("#hContainerID").val()
            , pPackageTypeID: ($("#slContainerPackageTypes option:selected").val() == "" ? 0 : $("#slContainerPackageTypes option:selected").val())
            , pQuantity: ($("#txtContainerPackageQuantity").val() == "" ? 0 : $("#txtContainerPackageQuantity").val())
            , pLength: ($("#txtContainerPackageLength").val() == "" ? 0 : $("#txtContainerPackageLength").val())
            , pWidth: ($("#txtContainerPackageWidth").val() == "" ? 0 : $("#txtContainerPackageWidth").val())
            , pHeight: ($("#txtContainerPackageHeight").val() == "" ? 0 : $("#txtContainerPackageHeight").val())
            , pVolume: ($("#txtContainerPackageVolume").val() == "" ? 0 : $("#txtContainerPackageVolume").val())
            , pNetWeight: ($("#txtContainerPackageNetWeight").val() == "" ? 0 : $("#txtContainerPackageNetWeight").val())
            , pGrossWeight: ($("#txtContainerPackageGrossWeight").val() == "" ? 0 : $("#txtContainerPackageGrossWeight").val())
            , pVolumetricWeight: ($("#txtContainerPackageVolumetricWeight").val() == "" ? 0 : $("#txtContainerPackageVolumetricWeight").val())
            //, pChargeableWeight: ($("#txtContainerPackageChargeableWeight").val() == "" ? 0 : $("#txtContainerPackageChargeableWeight").val())
            , pMarksAndNumbers: ($("#txtContainerPackageMarksAndNumbers").val().trim() == "" ? 0 : $("#txtContainerPackageMarksAndNumbers").val().trim().toUpperCase())
            , pDescriptionOfGoods: ($("#txtContainerPackageDescriptionOfGoods").val().trim() == "" ? 0 : $("#txtContainerPackageDescriptionOfGoods").val().trim().toUpperCase())
        }, pSaveandAddNew
            , "EditContainerPackageModal" //Modal name
            , function () {
                ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
                if (pSaveandAddNew)
                    ContainerPackages_ClearAllControls(null, pOperationID);
            });
}
function ContainerPackages_DeleteList(callback) {
    //Confirmation message to delete
    if (GetAllSelectedIDsAsString('tblContainerPackages') != "")
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
                DeleteListFunction("/api/ContainerPackages/Delete"
                    , { "pContainerPackagesIDs": GetAllSelectedIDsAsString('tblContainerPackages') }
                    , function () {
                        ContainerPackages_LoadWithPagingWithWhereClauseAndOrderBy();
                        if ($("#cbIsConsolidation").prop('checked'))
                            Shipments_LoadAvailableShipments();
                    });
            });
}
function ContainerPackages_Search() {
    debugger;
    var pSearchKey = $("#txtContainerPackagesSearch").val().trim().toUpperCase();
    var pWhereClause = " WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val()
        + " AND  (PackageTypeName LIKE '%" + pSearchKey + "%' "
        //+ " OR MarksAndNumbers LIKE '%" + pSearchKey + "%' "
        + " OR DescriptionOfGoods LIKE '%" + pSearchKey + "%') "
    var pOrderBy = " HouseOperationCode, PackageTypeName ";
    LoadWithPagingWithWhereClauseAndOrderBy("div-Pager", "select-page-size", "spn-first-page-row", "spn-last-page-row", "spn-total-count", "div-Text-Total", "/api/ContainerPackages/LoadWithWhereClause", pWhereClause, pOrderBy, 1, 1000, function (data) { ContainerPackages_BindTableRows(JSON.parse(data[0])/*pTabelRows*/); });
}
function ContainerPackageTypes_GetList(pID, pSlName, callback) {//the first parameter is used in case of editing to set the code or name to its original value
    var pWhereClause = " Where 1=1 ";
    //the next 2 lines are to prevent selection of already selected packageTypes
    //pWhereClause += " AND ID NOT IN (SELECT PackageTypeID FROM ContainerPackages WHERE OperationContainersAndPackagesID = " + $("#hContainerID").val() + ")";
    //pWhereClause += (pID == null || pID == undefined) ? "" : " OR ID = " + pID.toString(); //incase of editing(i.e. pID has value): to add the edited PackageType to the select list
    GetListWithNameAndWhereClause(pID, "/api/PackageTypes/LoadAll", TranslateString("SelectFromMenu"), pSlName, pWhereClause);
}
function ContainerPackages_CalculateSummary() {
    debugger;
    var decTotalContainerPackageSQuantity = 0;
    $(".ContainerPackageQuantity").each(function () {
        var value = $(this).text();
        // add only if the value is number
        if (!isNaN(value) && value.length != 0) {
            decTotalContainerPackageSQuantity += parseFloat(value);
        }
    });
    $("#lblTotalNumberOfContainerPackages").html(": " + decTotalContainerPackageSQuantity.toString());
}
function ContainerPackages_ValidateProperties() {
    var isValid = true;
    if (!CheckDecimalPlacesAndNegativeSigns('txtContainerPackageGrossWeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageVolume')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageLength')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageWidth')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageHeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageNetWeight')
        || !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageVolumetricWeight')
        //|| !CheckDecimalPlacesAndNegativeSigns('txtContainerPackageChargeableWeight')
    ) {
        isValid = false;
        swal(strSorry, "Please, Check the numbers.");
    }
    //check for packages quantity (NOT CONTAINER PACKAGE QUANTITY)
    if ($("#txtContainerPackageQuantity").val().trim() == "" || $("#txtContainerPackageQuantity").val().trim() < 1) {
        isValid = false;
        swal(strSorry, "The Quantity must be greater than 0 !");
    }
    return isValid;
}
function ContainerPackages_CalculateVolume() {
    debugger;
    if ($("#txtContainerPackageLength").val() != "" && $("#txtContainerPackageWidth").val() != "" && $("#txtContainerPackageHeight").val() != "" && $("#txtContainerPackageQuantity").val() != "") {
        $("#txtContainerPackageVolume").val((($("#txtContainerPackageLength").val() * $("#txtContainerPackageWidth").val() * $("#txtContainerPackageHeight").val() * $("#txtContainerPackageQuantity").val()) / 1000000).toFixed(2));
        ////if Ocean then no volumetric weight
        //if ($("#cbIsAir").prop("checked"))
        //    $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorAirConstant).toFixed(2));
        //if ($("#cbIsInland").prop("checked"))
        //    $("#txtVolumetricWeight").val(($("#txtVolume").val() * 1000000 / intChgWtDividorInlandConstant).toFixed(2));
        $("#txtContainerPackageVolumetricWeight").val(0); //This is Ocean so no volumetric
    }
    else {
        $("#txtContainerPackageVolume").val(0);
        $("#txtContainerPackageVolumetricWeight").val(0);
    }
    if ($("#txtVolumetricWeight").val() == "" || $("#txtVolumetricWeight").val() == 0)
        $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
    else if ($("#txtGrossWeight").val() == "" || $("#txtGrossWeight").val() == 0)
        $("#txtChargeableWeight").val($("#txtVolumetricWeight").val());
    else
        $("#txtChargeableWeight").val(parseFloat($("#txtVolumetricWeight").val()) > parseFloat($("#txtGrossWeight").val())
            ? $("#txtVolumetricWeight").val()
            : $("#txtGrossWeight").val());
}

//*********************************Reading Excel Files***************************************//
//Must be saved as Excel 97-2003
function OperationContainersAndPackages_onFileSelected(event, pBtnName) {
    debugger;
    var selectedFile = event.target.files[0];
    if (selectedFile != undefined) { //to handle the case of not choosing a file
        var sFilename = selectedFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();
        var result = document.getElementById("hExtractedData");
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                //// Obtain The Current Row As CSV
                //var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                //$("#hExtractedData").val(sCSV);
                if (pDefaults.UnEditableCompanyName != "TRM") {
                    if (oJS.length > 0 && oJS[0].ContainerNumber != undefined) //if (sCSV != "")
                        OperationContainersAndPackages_ImportFromExcelFile(oJS, pBtnName);
                    else {
                        swal("Sorry", "Please, revise data and version of the file.");
                        $("#" + pBtnName).val("");
                    }
                }
                else {
                    if (oJS.length > 0 && (oJS[0].ContainerNumber != undefined || oJS[0].TankNumber != undefined)) //if (sCSV != "")
                        OperationContainersAndPackages_ImportFromExcelFile(oJS, pBtnName);
                    else {
                        swal("Sorry", "Please, revise data and version of the file.");
                        $("#" + pBtnName).val("");
                    }
                }
              
            });
        };
        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(selectedFile);
    }
}
function OperationContainersAndPackages_ImportFromExcelFile(pDataRows, pBtnName) {
    debugger;
    FadePageCover(true);
    var pContainerNumberList = "";
    var pContainerTypeCodeList = "";
    var pCarrierSealList = "";
    var pTareWeightList = "";
    var pVolumeList = "";
    var pNetWeightList = "";
    var pGrossWeightList = "";
    var pVGMList = "";
    var pDescriptionOfGoodsList = "";
    var pNumberOfPackagesList = "";
    var pPackageTypeList = "";
    var pTankNumberList = "";
    for (var i = 0; i < pDataRows.length; i++) { //replace '\', ' ', ',' with space
        pContainerNumberList += (pContainerNumberList == ""
            ? (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11))
            : ("," + (pDataRows[i].ContainerNumber == undefined || pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11)))
        );
        pTankNumberList += (pTankNumberList == ""
            ? (pDataRows[i].TankNumber == undefined || pDataRows[i].TankNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TankNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11))
            : ("," + (pDataRows[i].TankNumber == undefined || pDataRows[i].TankNumber.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TankNumber.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11)))
        );
        pContainerTypeCodeList += (pContainerTypeCodeList == ""
            ? (pDataRows[i].ContainerTypeCode == undefined || pDataRows[i].ContainerTypeCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerTypeCode.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11))
            : ("," + (pDataRows[i].ContainerTypeCode == undefined || pDataRows[i].ContainerTypeCode.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].ContainerTypeCode.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 11)))
        );
        pCarrierSealList += (pCarrierSealList == ""
            ? (pDataRows[i].CarrierSeal == undefined || pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 15))
            : ("," + (pDataRows[i].CarrierSeal == undefined || pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].CarrierSeal.replace(/[\, ]/g, ' ').toUpperCase().trim().slice(0, 15)))
        );
        pTareWeightList += (pTareWeightList == ""
            ? (pDataRows[i].TareWeight == undefined || pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].TareWeight == undefined || pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].TareWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pVolumeList += (pVolumeList == ""
            ? (pDataRows[i].Volume == undefined || pDataRows[i].Volume.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Volume.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].Volume == undefined || pDataRows[i].Volume.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].Volume.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pNetWeightList += (pNetWeightList == ""
            ? (pDataRows[i].NetWeight == undefined || pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].NetWeight == undefined || pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NetWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pGrossWeightList += (pGrossWeightList == ""
            ? (pDataRows[i].GrossWeight == undefined || pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].GrossWeight == undefined || pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].GrossWeight.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pVGMList += (pVGMList == ""
            ? (pDataRows[i].VGM == undefined || pDataRows[i].VGM.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VGM.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].VGM == undefined || pDataRows[i].VGM.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].VGM.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pDescriptionOfGoodsList += (pDescriptionOfGoodsList == ""
            ? (pDataRows[i].DescriptionOfGoods == undefined || pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].DescriptionOfGoods == undefined || pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].DescriptionOfGoods.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pNumberOfPackagesList += (pNumberOfPackagesList == ""
            ? (pDataRows[i].NumberOfPackages == undefined || pDataRows[i].NumberOfPackages.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NumberOfPackages.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].NumberOfPackages == undefined || pDataRows[i].NumberOfPackages.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].NumberOfPackages.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
        pPackageTypeList += (pPackageTypeList == ""
            ? (pDataRows[i].PackageType == undefined || pDataRows[i].PackageType.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PackageType.replace(/[\, ]/g, ' ').toUpperCase().trim())
            : ("," + (pDataRows[i].PackageType == undefined || pDataRows[i].PackageType.replace(/[\, ]/g, ' ').trim() == "" ? 0 : pDataRows[i].PackageType.replace(/[\, ]/g, ' ').toUpperCase().trim()))
        );
    }
    var pParametersWithValues = {
        pOperationID: $("#hOperationID").val()
        , pContainerNumberList: pContainerNumberList
        , pContainerTypeCodeList: pContainerTypeCodeList
        , pCarrierSealList: pCarrierSealList
        , pTareWeightList: pTareWeightList
        , pVolumeList: pVolumeList
        , pNetWeightList: pNetWeightList
        , pGrossWeightList: pGrossWeightList
        , pVGMList: pVGMList
        , pDescriptionOfGoodsList: pDescriptionOfGoodsList
        , pNumberOfPackagesList: pNumberOfPackagesList
        , pPackageTypeList: pPackageTypeList
        , pTankNumberList: pTankNumberList
    };
    CallPOSTFunctionWithParameters("/api/OperationContainersAndPackages/InsertListFromExcel", pParametersWithValues
        , function (pData) {
            if (pData[0]) {
                var pOperationContainersAndPackages = JSON.parse(pData[1]);
                swal("Success", "Saved Successfully.");
                OperationContainersAndPackages_BindTableRows(pOperationContainersAndPackages);
            }
            else {
                swal("Sorry", "Please, revise data and version of the file.");
            }
            FadePageCover(false);
        }
        , null);
    $("#" + pBtnName).val(""); //if removed the last selected file remains till unselected
}
//******************************EOF Reading Excel Files***************************************//

function Warehouse_GetList(pID, callback) {
    GetListWithNameAndWhereClause(pID, "/api/Warehouse/LoadWithWhereClause","<--"+ TranslateString("Select")+"-->", "slWarehouse", " Where 1 = 1 ",null);
}


function ValidationgContainerNumber(ControlID) {
    debugger;
    $("#" + ControlID + "").blur(function () {
        if ($("#" + ControlID + "").val().trim() != "") {
            var pParametersWithValues = { ContainerNumber: $("#" + ControlID + "").val().replace('-', '') };
            CallGETFunctionWithParameters("/api/OperationContainersAndPackages/ContainerCheckNumber", pParametersWithValues,
                function (pData) {
                    MessageString = JSON.parse(pData[0]);
                    if (MessageString == "InValid Number" || MessageString == "InValid" || MessageString == "InValid Length") {
                        swal({
                            title: "Tank CheckDigit!",
                            text: "Tank Number Is Not Valid, Keep Number anyway?",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Yes, Keep Number!",
                            closeOnConfirm: true
                        },
                            function (e) {
                                if (!e) {
                                    $("#" + ControlID + "").val("");
                                    //$("#" + ControlID + "").focus();
                                    setTimeout(function () { $("#" + ControlID + "").focus(); }, 100);
                                }
                            });
                    }
                }
                , null);
        }
        else {
            MessageBox("Warning", "Please insert tank number!!", "warning", false, "btn btn-lg btn-primary sweet-10", "Ok", true, function () { setTimeout(function () { $("#" + ControlID + "").focus(); }, 100); })
        }
    });
}

function SetHouseStoreLocation() {
    $("#slStoreLocationBLDocuments").val($("#slCargoPlacedOnContainerMulti option:selected").first().attr("storelocationid"));
}
function CbIsSentToWarehouseChanged() {
    if ($('#cbIsSentToWarehouse').prop('checked')) {
        $("#slWarehouse").prop("disabled", false);
    } else {
        $("#slWarehouse").prop("disabled", true);
        $("#slWarehouse").val("");
    }
}
function ChangeAllContainersWarehouses(pWarehouseID, pContainerID) {
    debugger;
    CallGETFunctionWithParameters("api/OperationContainersAndPackages/ChangeAllContainersWareHouses", { pDummy: false, pOperationID: pOperationHeader_Global.ID, pWarehouseID: pWarehouseID, pContainerID: pContainerID }, function (pData) {
        if (!pData[0]) {
            swal("Sorry", pData[1]);
        }
        OperationContainersAndPackages_SubmenuTabClicked();
    }, null);
}

function fillMultiListFromObject(pID, pStrFirstRow, pSlName, pData, callback) {
    ClearAllOptions(pSlName);
    debugger;
    var option = "";
    if (pStrFirstRow != "" && pStrFirstRow != null)
        //option = '<option value="">' + pStrFirstRow + '</option>';
        $.each(JSON.parse(pData), function (i, item) {
            debugger;
            if (pID != null && pID != undefined) //in case of editing
                if (pID.includes(item.ID.toString()))
                    option += '<option value="' + item.ID + '" selected ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
                else
                    option += '<option value="' + item.ID + '" ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
            else
                option += '<option value="' + item.ID + '" ' + (pSlName == "slCargoPlacedOnContainer" ? "StoreLocationID=" + item.WarehouseID : "") + '>' + item.ContainerTypeCode + ": " + item.ContainerNumber + '</option>';
        });
    $("#" + pSlName).append(option);
    if (callback != null && callback != undefined)
        callback();
}
// function Made to get packages id and show modal copy a packages to BED company (AhmedElgabry)
function Packages_OpenCopyModal(pPackagesID) {
    debugger;
    var tr = $("#tblConnectedPackages tr[ID='" + pPackagesID + "']");
    //$("#lblCopyPackagesShown").html(": " + $(tr).find("td.HWB").text());
    //$("#cbIncludeReceivables").prop("checked", false);
    //$("#cbIncludePayables").prop("checked", false);
    $("#hPackagesToCopyID").val(pPackagesID);
    $("#txtPackagesNumberOfCopies").val(1);
    jQuery("#CopyPackagesModal").modal("show");
}

// function Made to call action to copy a packages to BED company (AhmedElgabry)
function Packages_Copy() {
    debugger;
    if ($("#txtPackagesNumberOfCopies").val() == "" || $("#txtPackagesNumberOfCopies").val() == 0)
        swal("Sorry", "Please, Enter number of copies.");
    else {
        swal({
            title: "Are you sure?"
            , text: $("#txtPackagesNumberOfCopies").val() + " copies will be created."
            //+ " Note: If exchange rate is not entered for any charge currency, then you have to add it manually in the operation.",
            , type: ""
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, Copy."
            , closeOnConfirm: true
        }
            , function () {
                FadePageCover(true);
                var pParametersWithValues = {
                    pPackagesToCopyID: $("#hPackagesToCopyID").val()
                    , pNumberOfCopies: $("#txtPackagesNumberOfCopies").val()
                };
                CallGETFunctionWithParameters("/api/OperationContainersAndPackages/Packages_Copy", pParametersWithValues
                    , function (pData) {
                        var pReturnedMessage = pData[0];
                        var pPackages = JSON.parse(pData[1]);
                        if (!pReturnedMessage)
                            swal("Sorry", pReturnedMessage);
                        else {
                            OperationContainersAndPackages_BindTableRows(pPackages);
                            jQuery("#CopyPackagesModal").modal("hide");
                        }
                        FadePageCover(false);
                    }
                    , null);
            });
    }
}


function PlacedOnSelect() {

    debugger; 

    //if(IsMESCOCompany)
    //swal("Please", "Please save to update Placed On Details Record.");

}