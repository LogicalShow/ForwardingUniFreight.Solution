//1: Excel File
//2: Excel File Without Formatting
//3: PDF File
//4: Rich Text Format Document
//5: Word Document

function WH_WarehouseStatisticsInit() {
    debugger;
    FadePageCover(true);
    if (pDefaults.UnEditableCompanyName == "UNF") {
        $(".classShowForUNF").removeClass("hide");
    }
    CallGETFunctionWithParameters("/api/WH_WarehouseStatistics/FillComboBoxs", null
        , function (pData) {

            debugger;

            FillListFromObject(null, 2, TranslateString("Select Creator"), "slCreator", pData[0], null);

            FillListFromObject(null, 2, TranslateString("Select Container Type"), "slContainerType", pData[1], null);
            FillListFromObject(null, 2, TranslateString("Select Warehouse"), "slWarehouse", pData[2], null);

            FillListFromObject(null, 2, TranslateString("Select Shipping Line"), "slShippingLine", pData[3], null);
            FillListFromObject(null, 2, TranslateString("Select Vessel"), "slVessel", pData[4], null);
            FillListFromObject(null, 2, TranslateString("Select Commodity"), "slCommodity", pData[5], null);


            $("#slConsignee").html($("#hReadySlCustomers").html());
            $("#slBookingParty").html($("#hReadySlCustomers").html());

        }
        , function () { FadePageCover(false); $("#hl-menu-ContainerFreightStation").parent().addClass("active"); });

    //$("#txtOpFromDate").val(getTodaysDateInddMMyyyyFormat());
    //$("#txtOpToDate").val(getTodaysDateInddMMyyyyFormat());
    //$("#txtEntryFromDate").val(getTodaysDateInddMMyyyyFormat());
    //$("#txtEntryToDate").val(getTodaysDateInddMMyyyyFormat());
    //$("#txtReleaseFromDate").val(getTodaysDateInddMMyyyyFormat());
    //$("#txtReleaseToDate").val(getTodaysDateInddMMyyyyFormat());

    $("#txtFromDateSelectOperations").val(getTodaysDateInddMMyyyyFormat());
    $("#txtToDateSelectOperations").val(getTodaysDateInddMMyyyyFormat());
}

function WH_WarehouseStatistics_Print(pOutputTo) {
    debugger;
    if (
        //($("#txtOpFromDate").val().trim() == "" || isValidDate($("#txtOpFromDate").val(), 1))
        //&& ($("#txtOpToDate").val().trim() == "" || isValidDate($("#txtOpToDate").val(), 1))
        //&&
        ($("#txtEntryFromDate").val().trim() == "" || isValidDate($("#txtEntryFromDate").val(), 1))
        && ($("#txtEntryToDate").val().trim() == "" || isValidDate($("#txtEntryToDate").val(), 1))
        && ($("#txtReleaseFromDate").val().trim() == "" || isValidDate($("#txtReleaseFromDate").val(), 1))
        && ($("#txtReleaseToDate").val().trim() == "" || isValidDate($("#txtReleaseToDate").val(), 1))
        ) {
        FadePageCover(true);
        var pWhereClause = WH_WarehouseStatistics_GetFilterWhereClause();

        var pParametersWithValues = {
            pWhereClause: pWhereClause

        };
        if ($("#slStatus").val() == "GateIn") {
            CallGETFunctionWithParameters("/api/WH_WarehouseStatistics/LoadData"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                    {
                        WH_WarehouseStatistics_DrawReport(data, pOutputTo);
                    }
                    else
                        swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                    FadePageCover(false);
                });
        }
        else if ($("#slStatus").val() == "NotGateIn") {
            CallGETFunctionWithParameters("/api/WH_WarehouseStatistics/LoadDataNotGateIn"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                    {
                        WH_WarehouseStatistics_DrawReport(data, pOutputTo);
                    }
                    else
                        swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                    FadePageCover(false);
                });
        }
        else if ($("#slStatus").val() == "All") {

            CallGETFunctionWithParameters("/api/WH_WarehouseStatistics/LoadDataSentToWarehouse"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                    {
                        WH_WarehouseStatistics_DrawReport(data, pOutputTo);
                    }
                    else
                        swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                    FadePageCover(false);
                });
        }
        else if ($("#slStatus").val() == "Released") {

            CallGETFunctionWithParameters("/api/WH_WarehouseStatistics/LoadDataReleased"
                , pParametersWithValues
                , function (data) {
                    if (data[0]) //pRecordsExist
                    {
                        WH_WarehouseStatistics_DrawReport(data, pOutputTo);
                    }
                    else
                        swal(strSorry, "Please, Refresh then try again and if the problem persists try another search criteria.");
                    FadePageCover(false);
                });
        }

    }
    else
        swal(strSorry, "Please make sure that date format is dd/MM/yyyy.");
}

function WH_WarehouseStatistics_GetFilterWhereClause() {
    debugger;
    //var pWhereClause = "";
    var pWhereClause = "WHERE 1 = 1 ";

    var pCreatorFilter = "";
    var pContainerTypeFilter = "";

    var pStorageLocationFilter = "";
    var pReleaseOrderNumberFilter = "";

    var pCertificateNumberFilter = "";
    var pCouponNumberFilter = "";
    var pMasterBLFilter = "";
    var pHouseNumberFilter = "";
    var pContainerNumberFilter = "";
    var pOperationNumberFilter = "";
    var pCommodityFilter = "";
    var pShippingLineFilter = "";
    var pVesselFilter = "";
    var pVoyageFilter = "";
    var pShipmentTypeFilter = "";

    var pCustomerFilter = "";

    var pOperationIDsFilter = "";
    var pBookingPartyFilter = "";
    var pWarehouseFilter = "";
    var pFromOpenDateFilter = "";
    var pToOpenDateFilter = "";
    var pEntryFromDateFilter = "";
    var pEntryToDateFilter = "";
    var pReleaseFromDateFilter = "";
    var pReleaseToDateFilter = "";

    var pCustomsSealNumber = "";
    var pCustomsCertificateNumber = "";


    var pModalName = "CheckboxesListModal";
    var pCheckboxNameAttr = "cbAddedItemID";
    var pSelectedItemsIDs = GetAllSelectedIDsAsStringWithNameAttr(pCheckboxNameAttr);


    pOperationNumberFilter = ($("#txtOperationNumber").val().trim() == "" ? "" : " OperationNumber LIKE N'%-" + $("#txtOperationNumber").val().trim() + "%'");
    if (pOperationNumberFilter != "")
        pWhereClause += " AND " + pOperationNumberFilter;

    pMasterBLFilter = ($("#txtMasterBL").val().trim() == "" ? "" : " MasterBL LIKE N'%" + $("#txtMasterBL").val().trim() + "%'");
    if (pMasterBLFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pMasterBLFilter;
    else
        if (pMasterBLFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pMasterBLFilter;

    pShipmentTypeFilter = ($("#slShipmentType").val() == "" ? "" : " ShipmentType = " + $("#slShipmentType").val());
    if (pShipmentTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pShipmentTypeFilter;
    else
        if (pShipmentTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pShipmentTypeFilter;

    pBookingPartyFilter = ($("#slBookingParty").val() == "" ? "" : " BookingPartyID = " + $("#slBookingParty").val());
    if (pBookingPartyFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pBookingPartyFilter;
    else
        if (pBookingPartyFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pBookingPartyFilter;

    pVesselFilter = ($("#slVessel").val() == "" ? "" : " VesselID = " + $("#slVessel").val());
    if (pVesselFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVesselFilter;
    else
        if (pVesselFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVesselFilter;


    pVoyageFilter = ($("#txtVoyageOrTruckNumber").val().trim() == "" ? "" : " VoyageOrTruckNumber LIKE N'%" + $("#txtVoyageOrTruckNumber").val().trim() + "%'");
    if (pVoyageFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pVoyageFilter;
    else
        if (pVoyageFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pVoyageFilter;


    pContainerNumberFilter = ($("#txtContainerNumber").val().trim() == "" ? "" : " ContainerNumber LIKE N'%" + $("#txtContainerNumber").val().trim() + "%'");
    if (pContainerNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pContainerNumberFilter;
    else
        if (pContainerNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pContainerNumberFilter;

    pContainerTypeFilter = ($("#slContainerType").val() == "" ? "" : " ContainerTypeID = " + $("#slContainerType").val());
    if (pContainerTypeFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pContainerTypeFilter;
    else
        if (pContainerTypeFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pContainerTypeFilter;

    pCommodityFilter = ($("#slCommodity").val() == "" ? "" : " CommodityID = " + $("#slCommodity").val());
    if (pCommodityFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCommodityFilter;
    else
        if (pCommodityFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCommodityFilter;

    pHouseNumberFilter = ($("#txtHouseNumber").val().trim() == "" ? "" : " HouseNumber = N'" + $("#txtHouseNumber").val().trim() + "'");
    if (pHouseNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pHouseNumberFilter;
    else
        if (pHouseNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pHouseNumberFilter;

    pCustomerFilter = ($("#slConsignee").val() == "" ? "" : " ConsigneeID = " + $("#slConsignee").val());
    if (pCustomerFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomerFilter;
    else
        if (pCustomerFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomerFilter;

    //pShippingLineFilter = ($("#slShippingLine").val() == "" ? "" : " ShippingLineID = " + $("#slShippingLine").val());
    //if (pShippingLineFilter != "" && pWhereClause != "")
    //    pWhereClause += " AND " + pShippingLineFilter;
    //else
    //    if (pShippingLineFilter != "" && pWhereClause == "")
    //        pWhereClause += " WHERE " + pShippingLineFilter;

    pWarehouseFilter = ($("#slWarehouse").val() == "" ? "" : " WarehouseID = " + $("#slWarehouse").val());
    if (pWarehouseFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pWarehouseFilter;
    else
        if (pWarehouseFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pWarehouseFilter;

    pStorageLocationFilter = ($("#txtStorageLocation").val().trim() == "" ? "" : " StorageLocation LIKE N'%" + $("#txtStorageLocation").val().trim() + "%'");
    if (pStorageLocationFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pStorageLocationFilter;
    else
        if (pStorageLocationFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pStorageLocationFilter;

    pReleaseOrderNumberFilter = ($("#txtReleaseOrderNumber").val().trim() == "" ? "" : " ReleaseOrderNumber LIKE N'%" + $("#txtReleaseOrderNumber").val().trim() + "%'");
    if (pReleaseOrderNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pReleaseOrderNumberFilter;
    else
        if (pReleaseOrderNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pReleaseOrderNumberFilter;

    pCertificateNumberFilter = ($("#txtCertificateNumber").val().trim() == "" ? "" : " CertificateNumber LIKE N'%" + $("#txtCertificateNumber").val().trim() + "%'");
    if (pCertificateNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCertificateNumberFilter;
    else
        if (pCertificateNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCertificateNumberFilter;

    pCouponNumberFilter = ($("#txtCouponNumber").val().trim() == "" ? "" : " CouponNumber LIKE N'%" + $("#txtCouponNumber").val().trim() + "%'");
    if (pCouponNumberFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pCouponNumberFilter;
    else
        if (pCouponNumberFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCouponNumberFilter;


    pCustomsSealNumber = ($("#txtCustomsSealNumber").val().trim() == "" ? "" : " CustomsSealNumber LIKE N'%" + $("#txtCustomsSealNumber").val().trim() + "%'");
    if (pCustomsSealNumber != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomsSealNumber;
    else
        if (pCustomsSealNumber != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomsSealNumber;

    pCustomsCertificateNumber = ($("#txtCustomsCertificateNumber").val().trim() == "" ? "" : " CustomsCertificateNumber LIKE N'%" + $("#txtCustomsCertificateNumber").val().trim() + "%'");
    if (pCustomsCertificateNumber != "" && pWhereClause != "")
        pWhereClause += " AND " + pCustomsCertificateNumber;
    else
        if (pCustomsCertificateNumber != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pCustomsCertificateNumber;


    ////2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    //if (isValidDate($("#txtOpFromDate").val().trim(), 1) && $("#txtOpFromDate").val().trim() != "") {
    //    pFromOpenDateFilter = " OperationIssueDate >= '" + GetDateWithFormatyyyyMMdd($("#txtOpFromDate").val().trim()) + "'";
    //    if (pFromOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pFromOpenDateFilter;
    //    else
    //        if (pFromOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pFromOpenDateFilter;
    //}
    ////2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    //if (isValidDate($("#txtOpToDate").val().trim(), 1) && $("#txtOpToDate").val().trim() != "") {
    //    pToOpenDateFilter = " CAST(OperationIssueDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtOpToDate").val().trim()) + "'";
    //    if (pToOpenDateFilter != "" && pWhereClause != "")
    //        pWhereClause += " AND " + pToOpenDateFilter;
    //    else
    //        if (pToOpenDateFilter != "" && pWhereClause == "")
    //            pWhereClause += " WHERE " + pToOpenDateFilter;
    //}

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtEntryFromDate").val().trim(), 1) && $("#txtEntryFromDate").val().trim() != "") {
        pEntryFromDateFilter = " EntryDate >= '" + GetDateWithFormatyyyyMMdd($("#txtEntryFromDate").val().trim()) + "'";
        if (pEntryFromDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pEntryFromDateFilter;
        else
            if (pEntryFromDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pEntryFromDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtEntryToDate").val().trim(), 1) && $("#txtEntryToDate").val().trim() != "") {
        pEntryToDateFilter = " CAST(EntryDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtEntryToDate").val().trim()) + "'";
        if (pEntryToDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pEntryToDateFilter;
        else
            if (pEntryToDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pEntryToDateFilter;
    }

    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtReleaseFromDate").val().trim(), 1) && $("#txtReleaseFromDate").val().trim() != "") {
        pReleaseFromDateFilter = " ReleasingDate >= '" + GetDateWithFormatyyyyMMdd($("#txtReleaseFromDate").val().trim()) + "'";
        if (pReleaseFromDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pReleaseFromDateFilter;
        else
            if (pReleaseFromDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pReleaseFromDateFilter;
    }
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtReleaseToDate").val().trim(), 1) && $("#txtReleaseToDate").val().trim() != "") {
        pReleaseToDateFilter = " CAST(ReleasingDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtReleaseToDate").val().trim()) + "'";
        if (pReleaseToDateFilter != "" && pWhereClause != "")
            pWhereClause += " AND " + pReleaseToDateFilter;
        else
            if (pReleaseToDateFilter != "" && pWhereClause == "")
                pWhereClause += " WHERE " + pReleaseToDateFilter;
    }


    pOperationIDsFilter = (pSelectedItemsIDs == "" ? "" : " OperationID IN (" + pSelectedItemsIDs + ")");
    if (pOperationIDsFilter != "" && pWhereClause != "")
        pWhereClause += " AND " + pOperationIDsFilter;
    else if (pOperationIDsFilter != "" && pWhereClause == "")
            pWhereClause += " WHERE " + pOperationIDsFilter;

    pFilterGrossWeight = ($("#txtFilterGrossWeight").val().trim() == "" ? "" : " GrossWeight = " + $("#txtFilterGrossWeight").val().trim() + " ");
    if (pFilterGrossWeight != "")
        pWhereClause += " AND " + pFilterGrossWeight;

    pFilterVolume = ($("#txtFilterVolume").val().trim() == "" ? "" : " Volume = " + $("#txtFilterVolume").val().trim() + " ");
    if (pFilterVolume != "")
        pWhereClause += " AND " + pFilterVolume;

    pWhereClause = (pWhereClause == "" ? " WHERE (1=1) " : pWhereClause);// + " ORDER BY ID DESC ";
    return pWhereClause;
}

function WH_WarehouseStatistics_SelectColumns() {
    jQuery("#ModalSelectColumns").modal("show");
}

function WH_WarehouseStatistics_SelectOperations() {
    jQuery("#CheckboxesListModal").modal("show");
}

function WH_WarehouseStatistics_ClearAllOperations() {
    $('input[name="cbAddedItemID"]').prop("checked", false);
}

function WH_WarehouseStatistics_FilterOperationsModal() {
    debugger;
    FadePageCover(true);
    var pWhereClause = "WHERE DirectionType = 1 \n";
    if ($("#txtSearchItems").val().trim() != "")
        pWhereClause += "AND SUBSTRING(Code,12,10)='" + $("#txtSearchItems").val().trim() + "' \n";
    //2nd parameter in isValidDate: 1-dd/mm/yyyy 2-mm/dd/yyyy
    if (isValidDate($("#txtFromDateSelectOperations").val().trim(), 1) && $("#txtFromDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND OpenDate >= '" + GetDateWithFormatyyyyMMdd($("#txtFromDateSelectOperations").val().trim()) + "'";
        $("#txtFromDate").val($("#txtFromDateSelectOperations").val());
    }
    if (isValidDate($("#txtToDateSelectOperations").val().trim(), 1) && $("#txtToDateSelectOperations").val().trim() != "") {
        pWhereClause += " AND CAST(OpenDate AS date) <= '" + GetDateWithFormatyyyyMMdd($("#txtToDateSelectOperations").val().trim()) + "'";
        $("#txtToDate").val($("#txtToDateSelectOperations").val());
    }

    GetListAsCheckboxesWithVariousParameters("/api/Operations/LoadAll"
        , { pWhereClause: pWhereClause }
        , "divCheckboxesList"
        , "cbAddedItemID"
        , function () { FadePageCover(false); }
        , 2
        , "col-sm-2");
}

function WH_WarehouseStatistics_DrawReport(data, pOutputTo) {
    debugger;
    var pReportRows = JSON.parse(data[1]);
    
    var pContainerTotals = data[3];
    var pReportTitle = "CFS Warehouse Statistics";
    var TodaysDateddMMyyyy = getTodaysDateInddMMyyyyFormat();
    var _BranchIDs = "";
    //for (var i = 1; i < ($("#slBranch option").length + 1) ; i++)
    //    _BranchIDs += _BranchIDs == "" ? $("#slBranch option:nth-child(" + (i) + ")").val() : ("," + $("#slBranch option:nth-child(" + (i) + ")").val());
    //var ArrBranchIDs = _BranchIDs.split(",");

    var pTablesHTML = "";

    pTablesHTML += '                         <table id="tblWH_WarehouseStatistics" class="table table-striped text-sm table-bordered  " style="border:solid #000 !important;">';//style="border-left:solid #999 !important;border-top:solid #999 !important;"
    pTablesHTML += '                             <thead>';
    pTablesHTML += '                                 <tr class="" style="font-size:90%;">';
    pTablesHTML += '                                        <th>OperationNo</th>';

    if ($("#cbMBL").prop("checked"))
        pTablesHTML += '                                     <th>MBL</th>';
    if ($("#cbContainerNumber").prop("checked"))
        pTablesHTML += '                                     <th>ContainerNumber</th>';
    if ($("#cbContainerType").prop("checked"))
        pTablesHTML += '                                     <th>ContainerType</th>';
    if ($("#cbBookingParty").prop("checked"))
        pTablesHTML += '                                     <th>BookingParty.</th>';
    if ($("#cbVessel").prop("checked"))
        pTablesHTML += '                                     <th>Vessel</th>';
    if ($("#cbVoy").prop("checked"))
        pTablesHTML += '                                     <th>Voy.</th>';
    if ($("#cbPOL").prop("checked"))
        pTablesHTML += '                                     <th>POL</th>';
    if ($("#cbPOD").prop("checked"))
        pTablesHTML += '                                     <th>POD</th>';
    if ($("#cbCommodity").prop("checked"))
        pTablesHTML += '                                     <th>Commodity</th>';
    if ($("#cbHBL").prop("checked"))
        pTablesHTML += '                                     <th>HouseNo</th>';
    if ($("#cbConsignee").prop("checked"))
        pTablesHTML += '                                     <th>Consignee</th>';
    if ($("#cbShipper").prop("checked"))
        pTablesHTML += '                                     <th>Shipper</th>';
    if ($("#cbStorageDays").prop("checked"))
        pTablesHTML += '                                     <th>Storage Days</th>';
    if ($("#cbAgentName").prop("checked"))
        pTablesHTML += '                                     <th>Agent Name</th>';
    if ($("#cbNetWeight").prop("checked"))
        pTablesHTML += '                                     <th >NetWeight</th>';
    if ($("#cbGrossWeight").prop("checked"))
        pTablesHTML += '                                     <th>GrossWeight</th>';
    if ($("#cbVolume").prop("checked"))
        pTablesHTML += '                                     <th>Volume</th>';
    if ($("#cbPackages").prop("checked"))
        pTablesHTML += '                                     <th>Packages</th>';
    if ($("#cbDescriptionOfGoods").prop("checked"))
        pTablesHTML += '                                     <th>DescriptionOfGoods</th>';
    if ($("#cbWarehouse").prop("checked"))
        pTablesHTML += '                                     <th>Warehouse</th>';
    if ($("#cbStorageLocation").prop("checked"))
        pTablesHTML += '                                     <th>StorageLocation</th>';
    if ($("#cbEntryDate").prop("checked"))
        pTablesHTML += '                                     <th>EntryDate</th>';
    if ($("#cbStorageEndDate").prop("checked"))
        pTablesHTML += '                                     <th>StorageEndDate</th>';
    if ($("#cbReleaseNo").prop("checked"))
        pTablesHTML += '                                     <th>Release Order No.</th>';
    if ($("#cbReleaseDate").prop("checked"))
        pTablesHTML += '                                     <th>ReleaseDate</th>';
    if ($("#cbCertificateNumber").prop("checked"))
        pTablesHTML += '                                     <th>CertificateNumber</th>';
    if ($("#cbCouponNumber").prop("checked"))
        pTablesHTML += '                                     <th>CouponNumber</th>';

    if ($("#cbCustomsSealNumber").prop("checked"))
        pTablesHTML += '                                     <th>Customs Seal</th>';
    if ($("#cbCustomsCertificateNumber").prop("checked"))
        pTablesHTML += '                                     <th>Customs Certificate No.</th>';
    if ($("#cbCustomsFeesAmount").prop("checked"))
        pTablesHTML += '                                     <th>Customs Fees</th>';
    if ($("#cbCustomsFeesVAT").prop("checked"))
        pTablesHTML += '                                     <th>Customs VAT</th>';
    if ($("#cbCustomsFeesTotal").prop("checked"))
        pTablesHTML += '                                     <th>Customs Total Fees</th>';
    if ($("#cbLine").prop("checked"))
        pTablesHTML += '                                     <th>Line</th>';
    if ($("#cbStatus").prop("checked"))
        pTablesHTML += '                                     <th>Status</th>';
    if ($("#cbPOrC").prop("checked"))
        pTablesHTML += '                                     <th>POrC</th>';
    if ($("#cbRoutingCode").prop("checked"))
        pTablesHTML += '                                     <th>Routing Code</th>';
    if ($("#cbSalesman").prop("checked"))
        pTablesHTML += '                                     <th>Salesman</th>';

    //if ($("#cbClient").prop("checked"))
    //    pTablesHTML += '                                     <th>Client</th>';
    //if ($("#cbDeliveryOrder").prop("checked"))
    //    pTablesHTML += '                                     <th>DeliveryOrder</th>';
    //if ($("#cbIsIMO").prop("checked"))
    //    pTablesHTML += '                                     <th>IsIMO</th>';
    //if ($("#cbInvoices").prop("checked"))
    //    pTablesHTML += '                                     <th>Invoices</th>';
    //if ($("#cbInvoiceDate").prop("checked"))
    //    pTablesHTML += '                                     <th>InvoiceDate</th>';
    //if ($("#cbCarrier").prop("checked"))
    //    pTablesHTML += '                                     <th>Carrier</th>';
    //if ($("#cbETA").prop("checked"))
    //    pTablesHTML += '                                     <th>ETA</th>';
    //if ($("#cbATA").prop("checked"))
    //    pTablesHTML += '                                     <th>ATA</th>';
    //if ($("#cbCreator").prop("checked"))
    //    pTablesHTML += '                                     <th>Creator</th>';
    //if ($("#cbReceivables").prop("checked"))
    //    pTablesHTML += '                                     <th>Receivables</th>';


    pTablesHTML += '                                 </tr>';
    pTablesHTML += '                             </thead>';
    pTablesHTML += '                             <tbody>';
    let count = 1;
    if (data[2]) count = 2;    //In Case of selecting Status = All data[1] will contain Packages in warehouse and data[2] will contain SentToWarehouse without GateIn packages
    for (let j = 1; j <= count; j++) {  //j=1 >> GateIn , j=2 >> Not GateIn
        $.each((JSON.parse(data[j])), function (i, item) {
            
            pTablesHTML += '                                     <tr style="font-size:90%;">';
            pTablesHTML += '                                             <td> ' + (item.OperationNumber == 0 ? "" : item.OperationNumber) + '</td>';
            if ($("#cbMBL").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.MasterBL == 0 ? "" : item.MasterBL) + '</td>';
            if ($("#cbContainerNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ContainerNumbers == 0 ? "" : item.ContainerNumbers) + '</td>';
            if ($("#cbContainerType").prop("checked")/* && item.ContainerTypes*/)
                pTablesHTML += '                                        <td>' + (item.ContainerTypes == 0 ? "" : item.ContainerTypes) + '</td>';
            //else if ($("#cbContainerType").prop("checked") && item.ContainerType)
            //    pTablesHTML += '                                        <td>' + (item.ContainerType == 0 ? "" : item.ContainerType) + '</td>';

            if ($("#cbBookingParty").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.BookingParty == 0 ? "" : item.BookingParty) + '</td>';
            if ($("#cbVessel").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.VesselName == 0 || item.VesselName == undefined ? "" : item.VesselName) + '</td>';
            if ($("#cbVoy").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.VoyageOrTruckNumber == 0 || item.VoyageOrTruckNumber == undefined ? "" : item.VoyageOrTruckNumber) + '</td>';
            if ($("#cbPOL").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.POLName == 0 ? "" : item.POLName) + '</td>';
            if ($("#cbPOD").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.PODName == 0 ? "" : item.PODName) + '</td>';
            if ($("#cbCommodity").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CommodityName == 0 ? "" : item.CommodityName) + '</td>';
            if ($("#cbHBL").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.HouseNumber == 0 ? "" : item.HouseNumber) + '</td>';
            if ($("#cbConsignee").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Consignee == 0 ? "" : item.Consignee) + '</td>';
            if ($("#cbShipper").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.ShipperName == 0 || item.ShipperName == undefined ? "" : item.ShipperName) + '</td>';
            if ($("#cbStorageDays").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.StorageDays == 0 || item.StorageDays == undefined ? "" : item.StorageDays) + '</td>';
            if ($("#cbAgentName").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.AgentName == 0 || item.AgentName == undefined ? "" : item.AgentName) + '</td>';
            if ($("#cbNetWeight").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.NetWeight == 0 ? "" : item.NetWeight) + '</td>';
            if ($("#cbGrossWeight").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.GrossWeight == 0 ? "" : item.GrossWeight) + '</td>';
            if ($("#cbVolume").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Volume == 0 ? "" : item.Volume) + '</td>';
            if ($("#cbPackages").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Packages) + '</td>';
            if ($("#cbDescriptionOfGoods").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.DescriptionOfGoods == 0 ? "" : item.DescriptionOfGoods) + '</td>';
            if ($("#cbWarehouse").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.WarehouseName == 0 || item.WarehouseName == undefined ? "" : item.WarehouseName) + '</td>';
            if ($("#cbStorageLocation").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.StorageLocation == 0 || item.StorageLocation == undefined ? "" : item.StorageLocation) + '</td>';
            if ($("#cbEntryDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.EntryDate)) < 1 ? "" : GetDateWithFormatMM_DDD_YYYY(item.EntryDate)) + '</td>';
            if ($("#cbStorageEndDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.StorageEndDate == undefined ? "01/01/1900" : item.ReleasingDate)) < 1 ? "" : GetDateWithFormatMM_DDD_YYYY(item.StorageEndDate == undefined ? "01/01/1900" : item.ReleasingDate)) + '</td>';
            if ($("#cbReleaseNo").prop("checked"))
                pTablesHTML += '                                         <td style="font-size:90%;text-align:left;">' + (item.ReleaseNumber == 0 || item.ReleaseNumber == undefined ? "" : item.ReleaseNumber.replace(/\,/g, "<br/>")) + '</td>';
            if ($("#cbReleaseDate").prop("checked"))
                pTablesHTML += '                                         <td>' + (Date.prototype.compareDates("01/01/1900", GetDateWithFormatMDY(item.ReleasingDate == undefined ? "01/01/1900" : item.ReleasingDate)) < 1 ? "" : GetDateWithFormatMM_DDD_YYYY(item.ReleasingDate == undefined ? "01/01/1900" : item.ReleasingDate)) + '</td>';
            
            if ($("#cbCertificateNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CertificationNumber == 0 ? "" : item.CertificationNumber) + '</td>';
            if ($("#cbCouponNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CouponNumber == 0 || item.CouponNumber == undefined ? "" : item.CouponNumber) + '</td>';

            if ($("#cbCustomsSealNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsSealNumber == 0 || item.CustomsSealNumber == undefined ? "" : item.CustomsSealNumber) + '</td>';
            if ($("#cbCustomsCertificateNumber").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsCertificateNumber == 0 || item.CustomsCertificateNumber == undefined ? "" : item.CustomsCertificateNumber) + '</td>';
            if ($("#cbCustomsFeesAmount").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsFeesAmount == 0 || item.CustomsFeesAmount == undefined ? "" : item.CustomsFeesAmount) + '</td>';
            if ($("#cbCustomsFeesVAT").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsFeesVAT == 0 || item.CustomsFeesVAT == undefined ? "" : item.CustomsFeesVAT) + '</td>';
            if ($("#cbCustomsFeesTotal").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.CustomsFeesTotal == 0 || item.CustomsFeesTotal == undefined ? "" : item.CustomsFeesTotal) + '</td>';
            if ($("#cbLine").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.LineName == 0 || item.LineName == undefined ? "" : item.LineName) + '</td>';
            if ($("#cbStatus").prop("checked") && (item.ReleaseNumber == 0 || item.ReleaseNumber == undefined))
                pTablesHTML += '                                         <td>Stored</td>';
                else
            if ($("#cbStatus").prop("checked"))
                pTablesHTML += '                                         <td>Released</td>';
            // pTablesHTML += '                                         <td class="hide ' + ('BranchID' + item.BranchID) + '">' + '' + '</td>';
            if ($("#cbPOrC").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.POrCCode == 0 ? "" : ("F" + item.POrCCode)) + '</td>';
            if ($("#cbRoutingCode").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Code == 0 ? "" : item.Code) + '</td>';
            if ($("#cbSalesman").prop("checked"))
                pTablesHTML += '                                         <td>' + (item.Salesman == 0 ? "" : item.Salesman) + '</td>';


            pTablesHTML += '                                     </tr>';
        });
        if (pOutputTo == "Excel") {
            pTablesHTML += '                                     <tr>';
            pTablesHTML += '                                         <td style="font-weight:bold;">Container Totals: ' + pContainerTotals + '</td>';
            if ($("#cbMBL").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbContainerNumber").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbContainerType").prop("checked"))
                pTablesHTML += '                                        <td></td>';
            if ($("#cbBookingParty").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbVessel").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbVoy").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbPOL").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbPOD").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCommodity").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbHBL").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbConsignee").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbShipper").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbStorageDays").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbAgentName").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbNetWeight").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbGrossWeight").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbVolume").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbPackages").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbDescriptionOfGoods").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbWarehouse").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbStorageLocation").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbEntryDate").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbStorageEndDate").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbReleaseNo").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbReleaseDate").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCertificateNumber").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCouponNumber").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCustomsSealNumber").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCustomsCertificateNumber").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCustomsFeesAmount").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCustomsFeesVAT").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbCustomsFeesTotal").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbLine").prop("checked"))
                pTablesHTML += '                                         <td></td>';
            if ($("#cbStatus").prop("checked") && j == 1)
                pTablesHTML += '                                         <td></td>';
            if ($("#cbStatus").prop("checked") && j == 2)
                pTablesHTML += '                                         <td></td>';
            pTablesHTML += '                                     </tr>';
        }
    }
    pTablesHTML += '                             </tbody>';
    pTablesHTML += '                         </table>';
    pTablesHTML += '                         <div>';
    pTablesHTML += '                            <div><b>Container Totals: ' + pContainerTotals + '</b></div>';
    pTablesHTML += '                         </div>';
    $("#hExportedTable").html(pTablesHTML); //in all cases i put the tables in hidden div so i select each table separately
    if (pOutputTo == "Excel") {
        var pBranchSummary = "";
        /********************************Adding Summary*************************************/
        //for (i = 0; i < ArrBranchIDs.length ; i++) {
        //    if ($("#tblWH_WarehouseStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
        //        pBranchSummary += $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + $("#tblWH_WarehouseStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " Operations" + "<br>";
        //}
        debugger;
        if (pOutputTo == "Excel") {
            var pExcelSummary = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Import:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Export:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Domestic:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Ocean:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType1").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Air:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType2").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Inland:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType3").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>" + pBranchSummary + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            //pExcelSummary += "<tr><td>Total:" + $("#tblWH_WarehouseStatistics tbody tr").find("td.classNotHouse").length + " operations" + "</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
        }
        ExportHtmlTableToCsv("tblWH_WarehouseStatistics", pReportTitle);
    }
    else {
        var mywindow = window.open('', '_blank');
        var ReportHTML = '';
        ReportHTML += '<html>';
        ReportHTML += '     <head><title>' + pReportTitle + '</title><link rel="stylesheet" href="/Content/CSS/app.v2.css" type="text/css" /></head>';
        ReportHTML += '         <body style="background-color:white; overflow-x: scroll;">';
        ReportHTML += '             <div class="col-xs-12 text-center"><img src="/Content/Images/CompanyHeader.jpg" alt="logo"/></div> </br>';
        ReportHTML += '             <div class="col-xs-12 text-center text-ul m-t-n"><h3>' + pReportTitle + '</h3></div> </br>';

        ReportHTML += '             <div class="col-xs-3"><b>Printed On :</b> ' + TodaysDateddMMyyyy + '</div>';
        //ReportHTML += '             <div class="col-xs-6"><b>Operation Date :</b> ' + ($("#txtOpFromDate").val() == "" && $("#txtOpToDate").val() == ""
        //                                                                            ? "All Dates"
        //                                                                            : ($("#txtOpFromDate").val() == "" ? "" : "From " + $("#txtOpFromDate").val() + " ") + ($("#txtOpToDate").val() == "" ? "" : "To " + $("#txtOpToDate").val())) + '</div>';
        //ReportHTML += '                         <div> &nbsp; </div>'

        ReportHTML += pTablesHTML;

        //ReportHTML += '             <div class="col-xs-4 hide"><b>Import :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType1").length + " Operations"
        //                                + '<br><b>Export :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType2").length + " Operations"
        //                                + '<br><b>Domestic :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.DirectionType3").length + " Operations"
        //                            + '</div>';

        //ReportHTML += '             <div class="col-xs-4 hide"><b>Ocean :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType1").length + " Operations"
        //                                + '<br><b>Air :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType2").length + " Operations"
        //                                + '<br><b>Inland :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.TransportType3").length + " Operations"
        //                            + '</div>';

        //ReportHTML += '             <div class="col-xs-4 hide">'
        //                                + ($("#cbGrossWeightSum").prop("checked") ? ('Total Gross :</b> ' + GetColumnSum("tblWH_WarehouseStatistics", "GrossWeightSum") + " KGM<br>") : "")
        //                                + ($("#cbNetWeightSum").prop("checked") ? ('Total Net :</b> ' + parseFloat(GetColumnSum("tblWH_WarehouseStatistics", "NetWeightSum")).toFixed(2) + " KGM<br>") : "")
        //                                + ($("#cbVolumeSum").prop("checked") ? ('<b>Total Vol :</b> ' + GetColumnSum("tblWH_WarehouseStatistics", "VolumeSum") + " CBM<br>") : "")
        //                                + ($("#cbChargeableWeightSum").prop("checked") ? ('<b>Total Chg.Wt :</b> ' + GetColumnSum("tblWH_WarehouseStatistics", "ChargeableWeightSum") + " <br>") : "")
        //                            + '</div>';

        //for (i = 0; i < ArrBranchIDs.length ; i++) {
        //    if ($("#tblWH_WarehouseStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length != 0)
        //        ReportHTML += '             <div class="col-xs-12" style="clear:both;"><b>' + $("#slBranch option[value=" + ArrBranchIDs[i] + "]").text() + " branch: " + '</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.BranchID" + ArrBranchIDs[i]).length + " B/Ls" + '</div>';
        //}
        // ReportHTML += '             <div class="col-xs-12 hide"><b>Total :</b> ' + $("#tblWH_WarehouseStatistics tbody tr").find("td.classNotHouse").length + " operations" + '</div>';

        ReportHTML += '         </body>';
        ReportHTML += '     <footer class="footer col-xs-12" style="width:100%; position:absolute; bottom:0;">';

        ReportHTML += '     </footer>';

        ReportHTML += '</html>';
        mywindow.document.write(ReportHTML);
        mywindow.document.close();
    }
}
function PrintBillsInspectionReport() {
    if ($("#slWarehouse").val() == "" || $("#slWarehouse").val() == null) {
        swal("Sorry", "Please select warehouse");
        return;
    } else {
        debugger;
        FadePageCover(true);
        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("warehouseName");
        arr_Values.push($('#slWarehouse option:selected').text());

        var pParametersWithValues =
        {
            query: "select * from BillsInspectionReport where WarehouseID=" + $('#slWarehouse').val()
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Bills Inspection Report"
            , pReportName: "BillsInspectionReport"
            , pReportType: "Print"
        };

        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        var win = window.open(url, "_blank");
        FadePageCover(false);
    }

}
function PrintCustomsBrokerDataReport() {
    if ($("#txtMarkingFromDate").val() == "" || $("#txtMarkingToDate").val() == "") {
        swal("Sorry", "Please select Marking from and to dates");
        return;
    } else {
        debugger;
        FadePageCover(true);
        var arr_Keys = new Array();
        var arr_Values = new Array();
        arr_Keys.push("datefrom","dateto");
        arr_Values.push($("#txtMarkingFromDate").val(), $("#txtMarkingToDate").val());

        var pParametersWithValues =
        {
            query: "select * from vwCustomsBrokerDataReport where MarkingDate between '" + GetDateWithFormatyyyyMMdd($("#txtMarkingFromDate").val()) + "' AND '" + GetDateWithFormatyyyyMMdd($("#txtMarkingToDate").val()) + "'"
            , arr_Keys: arr_Keys
            , arr_Values: arr_Values
            , pTitle: "Customs Broker Data Report"
            , pReportName: "CustomsBrokerDataReport"
            , pReportType: "Print"
        };

        var url = '/ReportMainClass/PrintReportQueryAndParams?pTitle="' + pParametersWithValues.pTitle + '"'
            + '&query=' + pParametersWithValues.query + ''
            + '&arr_Keys=' + pParametersWithValues.arr_Keys + ''
            + '&arr_Values=' + pParametersWithValues.arr_Values + ''
            + '&pReportName=' + pParametersWithValues.pReportName + ''
            + '&pReportType=' + pParametersWithValues.pReportType + '';

        var win = window.open(url, "_blank");
        FadePageCover(false);
    }
}